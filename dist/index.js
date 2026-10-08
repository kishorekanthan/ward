import { jsx as t, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as Bt, useContext as je, createContext as We, useCallback as J, useEffect as R, useState as g, useRef as f, useLayoutEffect as Ga, useId as k, isValidElement as Wn, Children as zn, Fragment as Kn } from "react";
import { flushSync as Gn, createPortal as Un } from "react-dom";
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
const Vn = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = Vn.formatToParts(new Date(e)), n = (r) => {
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
const Xn = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Yn(e) {
  return Xn.format(new Date(e));
}
const Ht = We(/* @__PURE__ */ new Set());
function o0({ hidden: e, children: a }) {
  const n = Bt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Ht.Provider, { value: n, children: a });
}
function Jn(e) {
  return !je(Ht).has(e);
}
function i0({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(S, { children: Jn(e) ? a : n });
}
const Qn = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Zn(e, a, n, r) {
  return e.shiftKey ? document.activeElement === n ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? n : void 0;
}
function er(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Zn(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function ar(e) {
  return { onKeyDown: J(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Qn));
      er(n, e.current, r);
    },
    [e]
  ) };
}
function c0(e, a = !0) {
  R(() => {
    if (!a) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const st = { ArrowUp: -1, ArrowDown: 1 }, dt = { ArrowLeft: -1, ArrowRight: 1 }, tr = (e, a, n) => Math.min(n, Math.max(a, e));
function nr(e, a) {
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
      const v = Math.max(0, h.indexOf(a)), b = nr(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(h[tr(v + b, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(h[0])) : d.key === "End" && (d.preventDefault(), c(h[h.length - 1]));
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
const s0 = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, d0 = "0.2.0", u0 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], rr = [1, 2, 3, 4, 5, 6], Ft = [1, 2, 3], lr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], K = {
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
  return rr.includes(e);
}
function Ca(e) {
  return Ft.includes(e);
}
function h0(e) {
  if (!$a(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function m0(e) {
  if (!$a(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const or = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function ir(e) {
  if (!$a(e)) throw new Error("unvalidated stream step");
  return or[e];
}
function ut(e) {
  return typeof e != "string" ? null : lr.includes(e) ? e : null;
}
function cr(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function sr(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function dr(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function ur(e, a, n) {
  const r = cr(e);
  if (r === null) return null;
  const l = ut(n) ?? ut(r.type);
  return l === null ? null : { ...r, type: l, id: sr(r, a), at: dr(r) };
}
function hr(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function mr(e, a, n) {
  return e >= we.heartbeat && !a && n !== null;
}
function w0(e, a) {
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
        const Ie = ur(C, z, be);
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
    const C = Date.now() - s.current, z = hr(C, A.current);
    z && q(z);
    const be = h.current;
    mr(C, y.current, be) && ze(be);
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
function wr() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ht(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function da(e, a) {
  const n = f(0), r = J((l) => {
    const i = l ?? a, c = e.current;
    c !== null && i !== void 0 && (wr() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => ht(c), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => ht(c), we.flash)));
  }, [a, e]);
  return R(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const _r = "_root_1otpc_2", fr = {
  root: _r
};
function vr(e, a, n, r, l) {
  const i = [Ua(a)];
  return e || i.push(`as of ${Yn(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Ce({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = Va(e, l), c = (a == null ? void 0 : a.at) ?? e, s = vr(l, i, c, r, a);
  return /* @__PURE__ */ o("span", { className: `${fr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const br = "_app_k9nx2_1", pr = "_side_k9nx2_18", gr = "_main_k9nx2_26", yr = "_rail_k9nx2_33", Nr = "_page_k9nx2_40", kr = "_root_k9nx2_91", $r = "_topbar_k9nx2_98", Cr = "_mark_k9nx2_109", Sr = "_brand_k9nx2_116", Rr = "_tagline_k9nx2_122", Tr = "_identity_k9nx2_128", xr = "_tools_k9nx2_129", Lr = "_nav_k9nx2_139", Ar = "_metadata_k9nx2_146", Er = "_actor_k9nx2_161", Ir = "_detail_k9nx2_162", Mr = "_content_k9nx2_222", qr = "_toolsPanel_k9nx2_238", Br = "_skip_k9nx2_264", M = {
  app: br,
  side: pr,
  main: gr,
  rail: yr,
  page: Nr,
  root: kr,
  topbar: $r,
  mark: Cr,
  brand: Sr,
  tagline: Rr,
  identity: Tr,
  tools: xr,
  nav: Lr,
  metadata: Ar,
  actor: Er,
  detail: Ir,
  content: Mr,
  toolsPanel: qr,
  skip: Br
}, Pr = "_btn_1e06l_2", Hr = "_primary_1e06l_14", Fr = "_destructive_1e06l_25", Dr = "_secondary_1e06l_35", Or = "_ghost_1e06l_40", jr = "_overflow_1e06l_49", Wr = "_sm_1e06l_56", zr = "_disabled_1e06l_60", oa = {
  btn: Pr,
  primary: Hr,
  destructive: Fr,
  secondary: Dr,
  ghost: Or,
  overflow: jr,
  sm: Wr,
  disabled: zr
};
function Kr(e, a, n, r) {
  const l = a === "sm" ? [oa.sm, "ward-btn--sm"] : [], i = n ? [oa.disabled] : [];
  return [oa.btn, oa[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Gr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Ur(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Vr(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function Xr(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Yr(e, a, n) {
  return Xr(e.describedBy, a && n);
}
function Jr({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Qr(e) {
  return e.children ?? e.label;
}
function _(e) {
  Ur(e);
  const a = e.variant ?? "secondary", n = e.size ?? "md", r = e.disabled ?? !1, l = Vr(e), i = k();
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: Kr(a, n, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": n,
        disabled: r,
        title: l,
        "aria-describedby": Yr(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Gr(a, e.controls),
        children: Qr(e)
      }
    ),
    /* @__PURE__ */ t(Jr, { id: i, reason: l })
  ] });
}
const Zr = /^([a-z][a-z0-9+.-]*):/i, el = /* @__PURE__ */ new Set(["http", "https"]), al = "#";
function tl(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = Zr.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = tl(e);
  return a === void 0 || el.has(a) ? e : al;
}
function nl(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Ot(e) {
  const a = nl(e);
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
function rl(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function Xa(e, a, n) {
  Ga(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = rl(r, l);
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
function ll({ sidebar: e, header: a, children: n, rail: r }) {
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
function ol({ destinations: e, active: a }) {
  const n = f(null);
  return na(n, e.length), Xa(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t("nav", { ref: n, className: M.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ t("a", { href: W(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Fa({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function il({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ t(Fa, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Fa, { value: a, className: M.detail })
  ] });
}
function cl() {
  const e = Ya("(max-width: 767.98px)"), a = k(), n = f(null), [r, l] = g(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var c, s;
    l(!1), (s = (c = n.current) == null ? void 0 : c.querySelector("button")) == null || s.focus();
  } };
}
function sl({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: M.tools, children: /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: M.tools, children: e });
}
function dl({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: M.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function ul(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ t("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Fa, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ t(ol, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: M.identity, children: /* @__PURE__ */ t(il, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(sl, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function hl(e) {
  const a = k(), n = cl();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(ul, { ...e, menu: n }),
    /* @__PURE__ */ t(dl, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: M.content, children: e.children })
  ] });
}
function ml(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function _0(e) {
  return ml(e) ? /* @__PURE__ */ t(ll, { ...e }) : /* @__PURE__ */ t(hl, { ...e });
}
function Sa(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const wl = "_root_o4yib_2", _l = "_row_o4yib_8", fl = "_box_o4yib_14", vl = "_label_o4yib_21", bl = "_lockedNote_o4yib_26", pl = "_consequence_o4yib_34", gl = "_sample_o4yib_69", Be = {
  root: wl,
  row: _l,
  box: fl,
  label: vl,
  lockedNote: bl,
  consequence: pl,
  sample: gl
};
function yl(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Nl({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: a }) : null;
}
function kl({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function $l({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function jt(e) {
  const a = k(), n = e.consequence ? `${a}-note` : void 0, r = yl(e);
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
        /* @__PURE__ */ t(kl, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t($l, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(Nl, { id: n, text: e.consequence })
  ] });
}
const Cl = "_chip_pq6tb_2", Sl = {
  chip: Cl
}, Rl = {
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
function Tl(e, a) {
  if (e === "stream") return xl(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = Rl[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function xl(e) {
  if (!e || !Ca(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Dt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${Sl.chip} ward-chip ward-chip--${e}`, style: Tl(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const Ll = "_clamp_zn74g_3", mt = {
  clamp: Ll
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
const Al = "_nav_12vi0_2", El = "_list_12vi0_8", Il = "_item_12vi0_15", Ml = "_link_12vi0_30", ql = "_sep_12vi0_40", Bl = "_current_12vi0_44", Pl = "_chips_12vi0_48", Me = {
  nav: Al,
  list: El,
  item: Il,
  link: Ml,
  sep: ql,
  current: Bl,
  chips: Pl
};
function Hl({ path: e, chips: a }) {
  return /* @__PURE__ */ t("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ t("ol", { className: Me.list, children: e.map((n, r) => /* @__PURE__ */ o("li", { className: Me.item, children: [
      r > 0 ? /* @__PURE__ */ t("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${Me.link} ward-target`, href: W(n.href), children: n.label }) : n.label : /* @__PURE__ */ t("span", { className: Me.current, "aria-current": "page", children: n.label })
    ] }, n.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${Me.chips} ward-chiprow`, children: a.map((n) => /* @__PURE__ */ t(m, { ...n }, n.label)) }) : null
  ] }) });
}
const Fl = "_root_17xtp_2", Dl = "_trigger_17xtp_7", Ol = "_value_17xtp_32", jl = "_menu_17xtp_49", Wl = "_find_17xtp_71", zl = "_list_17xtp_85", Kl = "_option_17xtp_95", Gl = "_check_17xtp_114", Ul = "_empty_17xtp_125", _e = {
  root: Fl,
  trigger: Dl,
  value: Ol,
  menu: jl,
  find: Wl,
  list: zl,
  option: Kl,
  check: Gl,
  empty: Ul
}, Vl = 7, Xl = 500;
function Yl(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function wt(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function Jl(e, a) {
  const [n, r] = g(e.defaultOpen === !0), [l, i] = g(""), [c, s] = g(() => wt(e.options, e.value)), u = (d) => {
    var h;
    Gn(() => r(!1)), d && ((h = a.current) == null || h.focus());
  };
  return {
    open: n,
    query: l,
    active: c,
    entries: Yl(e.options, l),
    findable: e.options.length > Vl,
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
function Ql(e, a, n) {
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
function Zl(e, a) {
  const n = f(!1);
  return R(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function eo(e) {
  const a = f(""), n = f(void 0);
  return R(() => () => clearTimeout(n.current), []), (r) => {
    clearTimeout(n.current), a.current += r.toLowerCase(), n.current = setTimeout(() => {
      a.current = "";
    }, Xl);
    const l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(a.current));
    l >= 0 && e.to(l);
  };
}
function ao(e) {
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
function to(e) {
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
const no = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function ro(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      no.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function lo({ entry: e, at: a, menu: n, ids: r, value: l }) {
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
function oo({ menu: e, ids: a, focusRef: n }) {
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
function io({ props: e, menu: a, ids: n, focusRef: r }) {
  const l = eo(a), i = (c) => {
    ao(c) && l(c.key);
  };
  return /* @__PURE__ */ o("div", { className: _e.menu, children: [
    a.findable && /* @__PURE__ */ t(oo, { menu: a, ids: n, focusRef: r }),
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
        onKeyDown: zt(a, to(a), i),
        children: a.entries.map((c, s) => /* @__PURE__ */ t(lo, { entry: c, at: s, menu: a, ids: n, value: e.value }, c.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: _e.empty, children: "No match" })
  ] });
}
function co(e, a) {
  const n = e.open ? Ja(e, a) : void 0;
  R(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function Kt(...e) {
  return e.filter(Boolean).join(" ");
}
function so(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function uo({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
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
      ...ro(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: _e.value, "data-placeholder": i || void 0, children: so(e) })
    }
  );
}
function Gt(e) {
  const a = k(), n = { list: `${a}-list`, value: `${a}-value`, option: (u) => `${a}-option-${u}` }, r = f(null), l = f(null), i = f(null), c = Jl(e, l), s = Zl(c.open, i);
  return Ql(c.open, r, () => c.close(!1)), co(c, n), /* @__PURE__ */ o("div", { ref: r, className: Kt(_e.root, e.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(uo, { props: e, menu: c, ids: n, trigger: l, wantFocus: s }),
    e.name && /* @__PURE__ */ t("input", { type: "hidden", name: e.name, value: e.value }),
    c.open && /* @__PURE__ */ t(io, { props: e, menu: c, ids: n, focusRef: i })
  ] });
}
const ho = "_field_1yzn8_2", mo = "_label_1yzn8_8", wo = "_labelHidden_1yzn8_15", _o = "_control_1yzn8_25", fo = "_mono_1yzn8_45", vo = "_area_1yzn8_50", bo = "_invalid_1yzn8_57", Le = {
  field: ho,
  label: mo,
  labelHidden: wo,
  control: _o,
  mono: fo,
  area: vo,
  invalid: bo
}, po = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, Ut = (e) => `${e}-label`;
function go({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? po : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function yo({ props: e, controlProps: a, cls: n }) {
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
function No({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const ko = { input: go, select: yo, textarea: No };
function $o(e, a, n) {
  const r = ko[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function Co(e, a, n) {
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
function So(e) {
  const a = e.mono ? [Le.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [Le.area] : [];
  return [Le.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function Ro(e) {
  return e ? `${Le.label} ${Le.labelHidden} ward-field-label` : `${Le.label} ward-field-label`;
}
function I(e) {
  const a = k(), n = `${a}-msg`, r = Co(e, a, n), l = So(e);
  return /* @__PURE__ */ o("div", { className: `${Le.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: Ut(a), className: Ro(e.labelHidden), htmlFor: a, children: e.label }),
    $o(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${Le.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const To = "_strip_4moyw_2", xo = "_tab_4moyw_32", Lo = "_count_4moyw_68", aa = {
  strip: To,
  tab: xo,
  count: Lo
}, wa = 7;
function Ao(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
function Vt(e) {
  return `${aa.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function f0({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l = 1 }) {
  if (e.length > wa) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${wa} — the set is fixed`);
  const i = ka({ orientation: "horizontal" }), c = Ao(e, a);
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
function v0({ links: e, active: a, label: n, level: r = 1 }) {
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
const Eo = "_root_v56ff_3", Io = "_segment_v56ff_9", _t = {
  root: Eo,
  segment: Io
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
const Mo = "_sidebar_11008_3", qo = "_brand_11008_9", Bo = "_mark_11008_17", Po = "_word_11008_24", Ho = "_nav_11008_30", Fo = "_navItem_11008_39", Do = "_footLink_11008_49", Oo = "_group_11008_58", jo = "_groupName_11008_65", Wo = "_agents_11008_81", zo = "_agent_11008_81", Ko = "_root_11008_96", Go = "_agentTop_11008_105", Uo = "_dot_11008_112", Vo = "_agentName_11008_124", Xo = "_agentMeta_11008_137", Yo = "_foot_11008_49", Jo = "_footName_11008_149", Qo = "_footLinks_11008_156", Zo = "_linkBrand_11008_183", ei = "_label_11008_204", ai = "_note_11008_209", ti = "_footer_11008_218", T = {
  sidebar: Mo,
  brand: qo,
  mark: Bo,
  word: Po,
  nav: Ho,
  navItem: Fo,
  new: "_new_11008_48",
  footLink: Do,
  group: Oo,
  groupName: jo,
  agents: Wo,
  agent: zo,
  root: Ko,
  agentTop: Go,
  dot: Uo,
  agentName: Vo,
  agentMeta: Xo,
  foot: Yo,
  footName: Jo,
  footLinks: Qo,
  linkBrand: Zo,
  label: ei,
  note: ai,
  footer: ti
};
function ni({ agent: e }) {
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
function ri({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: T.foot, children: [
    /* @__PURE__ */ t("span", { className: T.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: T.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${T.footLink} ward-target`, href: W(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function li({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
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
    /* @__PURE__ */ t("ul", { className: T.agents, children: r.map((c) => /* @__PURE__ */ t(ni, { agent: c }, c.href)) }),
    /* @__PURE__ */ t(ri, { shared: i })
  ] });
}
function oi(e) {
  return e.destinations ?? e.items ?? [];
}
function ii({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: T.linkBrand, children: e });
}
function ci({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: T.footer, children: e });
}
function si({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: W(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: T.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: T.note, children: e.note })
  ] });
}
function di(e) {
  return /* @__PURE__ */ o("aside", { className: `${T.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(ii, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: oi(e).map((a) => /* @__PURE__ */ t(si, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(ci, { children: e.children })
  ] });
}
function ui(e) {
  return "agents" in e;
}
function b0(e) {
  return ui(e) ? /* @__PURE__ */ t(li, { ...e }) : /* @__PURE__ */ t(di, { ...e });
}
const hi = "_mark_wlgi8_3", mi = {
  mark: hi
}, wi = { met: "✓", unmet: "", failed: "✕" };
function Qa({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: mi.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: wi[e]
    }
  );
}
const _i = "_marker_br9fi_2", fi = {
  marker: _i
}, vi = {
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
  const r = { "--marker": vi[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${fi.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const bi = "_root_ti0pq_2", pi = "_chip_ti0pq_11", gi = "_noCase_ti0pq_23", ia = {
  root: bi,
  chip: pi,
  noCase: gi
};
function yi(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Za({ connection: e, since: a, lastEventAt: n }) {
  const r = yi(a, n), l = Va(r, e === "reconnecting");
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
const Ni = "_root_w7yld_2", ki = "_context_w7yld_12", $i = "_row_w7yld_1", Ci = "_heading_w7yld_25", Si = "_headingWrap_w7yld_33", Ri = "_chips_w7yld_38", Ti = "_title_w7yld_45", xi = "_consequence_w7yld_55", Li = "_actionsWrap_w7yld_62", Ai = "_actions_w7yld_62", Ei = "_action_w7yld_62", Ii = "_overflowPanel_w7yld_91", Mi = "_measureClip_w7yld_102", qi = "_measure_w7yld_102", V = {
  root: Ni,
  context: ki,
  row: $i,
  heading: Ci,
  headingWrap: Si,
  chips: Ri,
  title: Ti,
  consequence: xi,
  actionsWrap: Li,
  actions: Ai,
  action: Ei,
  overflowPanel: Ii,
  measureClip: Mi,
  measure: qi
};
function Bi({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(Ae, { as: "h1", className: V.title, text: e }) : /* @__PURE__ */ t("h1", { className: V.title, children: e });
}
function Pi({ title: e, consequence: a, consequenceHint: n, density: r }) {
  return /* @__PURE__ */ o("div", { className: V.heading, children: [
    /* @__PURE__ */ t(Bi, { title: e, density: r }),
    a && /* @__PURE__ */ t("p", { className: V.consequence, title: n, children: a })
  ] });
}
function Da({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: V.action, "data-action": "", children: a }, n));
}
function ft({ disclosure: e }) {
  return /* @__PURE__ */ t(_, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Hi({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(ft, { disclosure: l }) : a ? [/* @__PURE__ */ t(ft, { disclosure: l }, "more"), /* @__PURE__ */ t(Da, { actions: e }, "actions")] : /* @__PURE__ */ t(Da, { actions: e });
}
function Fi(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Di({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: V.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Da, { actions: e }) });
}
function Oi(e, a) {
  const n = k(), [r, l] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var u, d;
    l(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function ji({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: V.context, children: [
    /* @__PURE__ */ t(Hl, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: V.chips, children: a.map((n) => /* @__PURE__ */ t(m, { ...n }, n.label)) }) : null
  ] });
}
function Wi(...e) {
  return e.some((a) => a === null);
}
function zi(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Ki(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + zi(e);
}
function Gi(e, a, n, r, l) {
  if (l === 0 || Wi(a, n, r)) return !1;
  const [i, c, s] = [a, n, r], u = Math.max(0, e.clientWidth - Ki(e, i));
  return s.offsetWidth > u || c.scrollWidth > c.clientWidth + 1;
}
function Ui(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Vi(e) {
  return Wn(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Xi(e, a) {
  return a.length === 0 && e.length === 1 && Vi(e[0]);
}
function Yi(e, a) {
  const n = f(null), r = f(null), l = f(null), i = f(null), [c, s] = g(!1);
  return R(() => {
    const u = n.current;
    if (!Ui(u)) return;
    const d = () => s(Gi(u, r.current, l.current, i.current, e.length)), h = new ResizeObserver(d);
    return h.observe(u), i.current && h.observe(i.current), d(), () => h.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: c && !a };
}
function Ji({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: V.measureClip, children: /* @__PURE__ */ o("div", { className: V.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function Qi({ connection: e }) {
  return e ? /* @__PURE__ */ t(Za, { connection: e.connection, since: e.since }) : null;
}
function p0({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: c = [], connection: s, onOverflow: u, density: d = "page" }) {
  const { rowRef: h, headingRef: v, actionsRef: b, measureRef: y, collapsed: A } = Yi(i, Xi(i, c)), q = c.length > 0, { disclosure: oe, close: Se } = Oi(A || q, b), te = Fi(c, i, A, u);
  return /* @__PURE__ */ o("header", { className: V.root, "data-density": d, children: [
    /* @__PURE__ */ t(ji, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: V.row, ref: h, children: [
      /* @__PURE__ */ t("div", { ref: v, className: V.headingWrap, children: /* @__PURE__ */ t(Pi, { title: n, consequence: r, consequenceHint: l, density: d }) }),
      /* @__PURE__ */ o("div", { className: V.actionsWrap, children: [
        /* @__PURE__ */ t(Qi, { connection: s }),
        /* @__PURE__ */ t("div", { className: V.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ t(Hi, { actions: i, hasMore: q, collapsed: A, onOverflow: u, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ t(Di, { actions: te, disclosure: oe, onEscape: Se }),
    /* @__PURE__ */ t(Ji, { actions: i, hasMore: q, measureRef: y })
  ] });
}
const Zi = "_scrim_rn7fr_2", ec = "_drawer_rn7fr_10", ac = "_sheet_rn7fr_14", tc = "_modal_rn7fr_18", nc = "_panel_rn7fr_23", rc = "_header_rn7fr_54", lc = "_title_rn7fr_62", oc = "_body_rn7fr_66", ic = "_close_rn7fr_93", ke = {
  scrim: Zi,
  drawer: ec,
  sheet: ac,
  modal: tc,
  panel: nc,
  header: rc,
  title: lc,
  body: oc,
  close: ic
}, cc = We(null), _a = [], fa = /* @__PURE__ */ new Map();
function sc(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function dc(e, a) {
  let n = fa.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, fa.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function uc(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !sc(r) && dc(e, r);
}
function hc(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (uc(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function mc(e) {
  for (const a of e.claims) {
    const n = fa.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), fa.delete(a)));
  }
}
function wc(e, a) {
  const n = { root: e, claims: [] };
  return _a.push(n), hc(n, a), n;
}
function _c(e) {
  const a = _a.indexOf(e);
  a >= 0 && _a.splice(a, 1), mc(e);
}
function vt(e) {
  return e !== null && _a.at(-1) === e;
}
function fc(e, a, n) {
  const r = f(null), l = f(n);
  return l.current = n, R(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = wc(i, a);
    return r.current = s, () => {
      var d, h;
      const u = vt(s);
      _c(s), r.current = null, u && ((h = (d = l.current ?? c) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), J(() => vt(r.current), []);
}
function vc(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function bc(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function pc({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${ke.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("header", { className: `${ke.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${ke.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${ke.body} ward-drawer-body`, children: e.children })
  ] });
}
function gc(e) {
  return `${ke.scrim} ${ke[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function yc(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ke.panel} ${ke[e]} ward-overlay-panel${n}${r}`;
}
function Nc(e) {
  const a = je(cc);
  return e ?? a ?? document.body;
}
function la(e) {
  const a = f(null), n = f(null), r = k(), l = Nc(e.container), i = Ya("(min-width: 768px)"), c = vc(e.kind, i), s = bc(e, r), u = ar(n), d = fc(a, l, e.returnFocusTo), h = J(() => {
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
  }, [h]), Un(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: gc(c),
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
            className: yc(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (v) => v.stopPropagation(),
            onKeyDown: (v) => d() && u.onKeyDown(v),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${ke.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(pc, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const kc = "_root_tgu1l_2", $c = "_ticket_tgu1l_16", Cc = "_body_tgu1l_25", Ea = {
  root: kc,
  ticket: $c,
  body: Cc
};
function g0({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${Ea.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ t("span", { className: `${Ea.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ t("div", { className: Ea.body, children: n })
  ] });
}
const Sc = "_root_bf1pc_2", Rc = "_table_bf1pc_9", Tc = "_caption_bf1pc_14", xc = "_series_bf1pc_23", Lc = "_category_bf1pc_31", Ac = "_cell_bf1pc_39", Ec = "_track_bf1pc_45", Ic = "_lane_bf1pc_52", Mc = "_bar_bf1pc_56", qc = "_value_bf1pc_63", Bc = "_swatch_bf1pc_70", Pc = "_empty_bf1pc_78", X = {
  root: Sc,
  table: Rc,
  caption: Tc,
  series: xc,
  category: Lc,
  cell: Ac,
  track: Ec,
  lane: Ic,
  bar: Mc,
  value: qc,
  swatch: Bc,
  empty: Pc
}, Hc = "—", bt = 6;
function Fc(e, a) {
  if (a.length < 1 || a.length > bt)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${bt}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function Dc(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function Yt(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Oc(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function jc({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = Oc(e, a), c = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: X.cell, children: /* @__PURE__ */ o("span", { className: X.track, children: [
    /* @__PURE__ */ t("span", { className: X.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${X.bar} ward-barchart-bar`, "data-step": n, style: c, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: X.value, children: e === null ? l : r(e) })
  ] }) });
}
function Wc({ series: e }) {
  return /* @__PURE__ */ t(S, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: X.swatch, "data-step": Yt(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function zc({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: X.caption, children: e }),
    /* @__PURE__ */ t("p", { className: X.empty, children: a })
  ] });
}
function Kc({ title: e, categories: a, series: n, top: r, format: l = ae, categoryHead: i = "Category", missing: c = Hc }) {
  return /* @__PURE__ */ t("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: X.table, children: [
    /* @__PURE__ */ t("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: X.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(Wc, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((s, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: X.category, children: s }),
      n.map((d, h) => /* @__PURE__ */ t(jc, { value: d.values[u], top: r, step: Yt(h, n.length), format: l, missing: c }, d.name))
    ] }, s)) })
  ] }) });
}
function y0(e) {
  Fc(e.categories, e.series);
  const a = Dc(e.series);
  return a === 0 ? /* @__PURE__ */ t(zc, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(Kc, { ...e, top: a });
}
const Gc = "_root_1bfqw_2", Uc = "_figure_1bfqw_7", Vc = "_of_1bfqw_13", Xc = "_bar_1bfqw_18", Yc = "_rows_1bfqw_38", Jc = "_row_1bfqw_38", Qc = "_label_1bfqw_49", Zc = "_amount_1bfqw_54", Re = {
  root: Gc,
  figure: Uc,
  of: Vc,
  bar: Xc,
  rows: Yc,
  row: Jc,
  label: Qc,
  amount: Zc
};
function es({ spent: e, ceiling: a, breakdown: n }) {
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
const as = "_frame_uovfv_2", ts = "_table_uovfv_6", ns = "_th_uovfv_12", rs = "_td_uovfv_13", ls = "_sort_uovfv_48", os = "_row_uovfv_60", is = "_empty_uovfv_68", xe = {
  frame: as,
  table: ts,
  th: ns,
  td: rs,
  sort: ls,
  row: os,
  empty: is
}, cs = { asc: "ascending", desc: "descending" };
function ss(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return cs[a.direction];
}
function ds(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: xe.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function us(e) {
  return e === void 0 ? void 0 : { width: e };
}
function hs({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: xe.th,
      style: us(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ss(e, a),
      children: ds(e, n)
    }
  );
}
function ms({ row: e, props: a }) {
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
function ws({
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
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: xe.head, children: a.map((h) => /* @__PURE__ */ t(hs, { column: h, sort: s, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((h) => /* @__PURE__ */ t(ms, { row: h, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const _s = "_list_v0s52_2", fs = {
  list: _s
};
function N0({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: fs.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const vs = "_label_1u62a_2", bs = {
  label: vs
};
function k0({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: bs.label, children: a.header }) }, a.key)) }) });
}
const ps = "_stack_bp6a0_2", gs = {
  stack: ps
};
function $0({ children: e }) {
  return /* @__PURE__ */ t("span", { className: gs.stack, "data-ward-action-stack": "", children: e });
}
const ys = "_set_y5zy3_2", Ns = "_legend_y5zy3_7", ks = "_row_y5zy3_15", $s = "_control_y5zy3_20", Cs = "_input_y5zy3_26", Ss = "_label_y5zy3_31", Rs = "_consequence_y5zy3_36", qe = {
  set: ys,
  legend: Ns,
  row: ks,
  control: $s,
  input: Cs,
  label: Ss,
  consequence: Rs
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
const Ts = "_root_5to6d_2", xs = "_head_5to6d_11", Ls = "_note_5to6d_30", As = "_index_5to6d_35", Es = "_dot_5to6d_39", Is = "_counter_5to6d_50", Ms = "_trailing_5to6d_58", Pe = {
  root: Ts,
  head: xs,
  note: Ls,
  index: As,
  dot: Es,
  counter: Is,
  trailing: Ms
};
function qs({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("span", { className: `${Pe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: Pe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Bs({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Pe.counter, "aria-hidden": "true", children: e }) : null;
}
function pt({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Pe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Pe.head, children: [
      /* @__PURE__ */ t(qs, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: Pe.note, children: n }),
    /* @__PURE__ */ t(Bs, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: Pe.trailing, children: i })
  ] });
}
const Ps = "_strip_1foyq_2", Hs = "_cell_1foyq_7", Fs = "_value_1foyq_12", Ds = "_link_1foyq_29", Os = "_label_1foyq_47", De = {
  strip: Ps,
  cell: Hs,
  value: Fs,
  link: Ds,
  label: Os
};
function js(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const Qt = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Ws({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Qt(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function zs({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Qt(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${De.link} ward-stat-link`, href: W(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Ta({ cells: e, divided: a = !1 }) {
  return js(e), /* @__PURE__ */ t("dl", { className: `${De.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(Ws, { cell: n }, n.label) : /* @__PURE__ */ t(zs, { cell: n, href: n.href }, n.label)) });
}
const Ks = "_root_5jkzr_2", Gs = "_track_5jkzr_8", Us = "_thumb_5jkzr_46", Vs = "_labelHidden_5jkzr_64", Xs = "_label_5jkzr_64", Ys = "_lockedNote_5jkzr_84", He = {
  root: Ks,
  track: Gs,
  thumb: Us,
  labelHidden: Vs,
  label: Xs,
  lockedNote: Ys
};
function Js(e) {
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
    /* @__PURE__ */ o("label", { id: s, htmlFor: u, className: Js(c), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: He.lockedNote, children: "always on" })
    ] })
  ] });
}
const Qs = "_bar_1y1tp_2", Zs = "_skip_1y1tp_11", ed = "_mark_1y1tp_22", ad = "_nav_1y1tp_30", td = "_list_1y1tp_34", nd = "_select_1y1tp_41", rd = "_selectTrigger_1y1tp_45", ld = "_dest_1y1tp_52", od = "_actor_1y1tp_71", id = "_actorMark_1y1tp_84", cd = "_actorLabel_1y1tp_89", sd = "_tagline_1y1tp_108", ie = {
  bar: Qs,
  skip: Zs,
  mark: ed,
  nav: ad,
  list: td,
  select: nd,
  selectTrigger: rd,
  dest: ld,
  actor: od,
  actorMark: id,
  actorLabel: cd,
  tagline: sd
};
function dd(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function ud(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function C0({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: c = "main" }) {
  const s = ud(r);
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
      /* @__PURE__ */ t("span", { className: ie.actorMark, "aria-hidden": "true", children: dd(s) })
    ] })
  ] });
}
const hd = "_tree_1ite1_2", md = "_item_1ite1_6", wd = "_row_1ite1_10", _d = "_button_1ite1_22", va = {
  tree: hd,
  item: md,
  row: wd,
  button: _d
}, Zt = We(null);
function fd({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = ka({ orientation: "vertical" });
  return /* @__PURE__ */ t(Zt.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: va.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const vd = { ArrowRight: !0, ArrowLeft: !1 };
function gt(e) {
  return e ? !0 : void 0;
}
function bd(e, a) {
  const n = vd[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function pd(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function gd(e) {
  const a = [va.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function yd(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Nd(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function kd(e) {
  return typeof e == "string" ? e : void 0;
}
function $d({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Cd({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function en(e) {
  const a = je(Zt);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = yd(e);
  return /* @__PURE__ */ o("li", { className: va.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: gd(e),
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
            onClick: () => pd(e),
            onKeyDown: (r) => bd(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Nd(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: kd(e.label), children: e.label }),
              /* @__PURE__ */ t($d, { value: e.detail }),
              /* @__PURE__ */ t(Cd, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const Sd = "_frame_1fj9j_2", Rd = "_subjectRail_1fj9j_22", Td = "_subject_1fj9j_22", xd = "_rail_1fj9j_42", Ld = "_record_1fj9j_64", Ad = "_recordBody_1fj9j_69", Ed = "_stageGrid_1fj9j_118", Id = "_band_1fj9j_144", Md = "_bandBody_1fj9j_153", qd = "_bandActions_1fj9j_158", Bd = "_scroller_1fj9j_166", Pd = "_board_1fj9j_192", Hd = "_laneCount_1fj9j_200", Fd = "_lanes_1fj9j_210", Y = {
  frame: Sd,
  subjectRail: Rd,
  subject: Td,
  rail: xd,
  record: Ld,
  recordBody: Ad,
  stageGrid: Ed,
  band: Id,
  bandBody: Md,
  bandActions: qd,
  scroller: Bd,
  board: Pd,
  laneCount: Hd,
  lanes: Fd
};
function S0({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: Y.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function yt(e) {
  return e ? "true" : void 0;
}
function R0({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Y.subjectRail, "data-ward-subject-rail": n, "data-ruled": yt(i), children: [
    /* @__PURE__ */ t("div", { className: Y.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Y.rail, "data-sticky": yt(l), "aria-label": r, children: a })
  ] });
}
function T0({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: c, measure: s }) {
  return c === "inline" ? /* @__PURE__ */ t("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(pt, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(pt, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: Y.recordBody, "data-pad": l, "data-measure": s, children: a })
  ] });
}
const Dd = "_form_1j8ub_2", Od = "_fields_1j8ub_9", jd = "_actions_1j8ub_19", Ia = {
  form: Dd,
  fields: Od,
  actions: jd
};
function x0({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ia.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Ia.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Ia.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function L0({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: Y.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Y.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Y.bandActions, children: a })
  ] });
}
const Wd = "(max-width: 767.98px)";
function et({ label: e, children: a, laneCount: n, onOverflow: r }) {
  const l = f(null);
  na(l, n ?? zn.count(a), r);
  const i = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t("div", { ref: l, className: Y.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function zd({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = g(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ o("div", { className: Y.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(I, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: l }),
    /* @__PURE__ */ t(et, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Kd({ lanes: e, label: a }) {
  const [n, r] = g(!1);
  return /* @__PURE__ */ o("div", { className: Y.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: Y.laneCount, "data-ward-board-lane-count": "", hidden: !n, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ t(et, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ t(Kn, { children: l.content }, l.id)) })
  ] });
}
function A0({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = Ya(Wd);
  return n === void 0 ? /* @__PURE__ */ t(et, { label: a, children: e }) : l ? /* @__PURE__ */ t(zd, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(Kd, { lanes: n, label: a });
}
function E0({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = f(null), i = Math.max(e, 1);
  na(l, i);
  const c = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ t("div", { ref: l, className: Y.stageGrid, role: "region", "aria-label": n, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: c, children: a });
}
const Gd = "_block_1o5o7_2", Ud = "_sentence_1o5o7_15", Vd = "_meta_1o5o7_20", Xd = "_action_1o5o7_25", Yd = "_strip_1o5o7_29", Jd = "_loading_1o5o7_48", Qd = "_label_1o5o7_56", Zd = "_counter_1o5o7_63", fe = {
  block: Gd,
  sentence: Ud,
  meta: Vd,
  action: Xd,
  strip: Yd,
  loading: Jd,
  label: Qd,
  counter: Zd
};
function eu({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: fe.action, children: /* @__PURE__ */ t(_, { onClick: e.onClick, children: e.label }) });
}
function xa({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${fe.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: fe.sentence, children: e }),
    n,
    /* @__PURE__ */ t(eu, { action: a })
  ] });
}
function au(e) {
  return /* @__PURE__ */ t(xa, { ...e, kind: "ward-emptystate" });
}
function I0({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(xa, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function M0(e) {
  return /* @__PURE__ */ t(xa, { ...e });
}
function q0({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(xa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function B0({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function P0({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function H0({ label: e, startedAt: a }) {
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
const tu = "_note_tlubt_2", nu = {
  note: tu
};
function ru({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: nu.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const lu = "_card_13pd2_2", ou = "_hit_13pd2_29", iu = "_head_13pd2_42", cu = "_title_13pd2_49", su = "_meta_13pd2_54", du = "_fields_13pd2_55", uu = "_who_13pd2_68", hu = "_sep_13pd2_72", mu = "_mono_13pd2_76", wu = "_field_13pd2_55", _u = "_last_13pd2_92", fu = "_reason_13pd2_104", Q = {
  card: lu,
  hit: ou,
  head: iu,
  title: cu,
  meta: su,
  fields: du,
  who: uu,
  sep: hu,
  mono: mu,
  field: wu,
  last: _u,
  reason: fu
}, vu = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function bu(e, a, n) {
  const r = da(e, "blue"), l = da(e, "orange"), i = da(e, "green"), c = f(/* @__PURE__ */ new Set());
  R(() => {
    if (!n) return;
    const s = { blue: r, orange: l, green: i };
    return n.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = vu[u.type];
      d && s[d]();
    });
  }, [r, n, i, a, l]);
}
const pu = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function gu(e, a) {
  return pu[a](e);
}
function yu({ item: e, connection: a }) {
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
function Nu({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: Q.head, children: [
    e.flagged && /* @__PURE__ */ t(m, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function ku({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: Q.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function $u({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: Q.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: Q.field, children: gu(e, n) }, n)) });
}
const Oa = (e) => e ? !0 : void 0;
function Cu(e) {
  return { "--stream": ve(e.streamStep, "id") };
}
function Su(e, a, n) {
  e == null || e(a, n);
}
function Ru(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Tu({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: Q.last, "data-stale": Oa(a), children: n }) : null;
}
function La(e) {
  const a = e.fields ?? [], n = e.item, r = f(null);
  bu(r, n.key, e.feed);
  const l = Ru(e.feed), i = Cu(n);
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
        /* @__PURE__ */ t("button", { type: "button", className: Q.hit, onClick: (c) => Su(e.onOpen, n.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(Nu, { item: n }),
        /* @__PURE__ */ t(Ae, { as: "p", className: Q.title, text: n.title }),
        /* @__PURE__ */ t(yu, { item: n, connection: l }),
        /* @__PURE__ */ t(ku, { reason: n.blockedReason }),
        /* @__PURE__ */ t($u, { item: n, fields: a }),
        /* @__PURE__ */ t(Tu, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const xu = "_column_10sxg_3", Lu = "_head_10sxg_24", Au = "_label_10sxg_33", Eu = "_count_10sxg_42", Iu = "_list_10sxg_56", Ze = {
  column: xu,
  head: Lu,
  label: Au,
  count: Eu,
  list: Iu
};
function an(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function Mu({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: Ze.head, children: [
    /* @__PURE__ */ t("h2", { className: Ze.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: Ze.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function qu(e) {
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
function Bu({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = k(), h = e.cap !== void 0 && a.length > e.cap, v = an(a, r);
  return /* @__PURE__ */ o("section", { className: Ze.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ t(Mu, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ t(qu, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, rows: v }),
    h && /* @__PURE__ */ t(ru, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Pu = "_foot_1tnhe_2", Hu = "_note_1tnhe_13", Fu = "_link_1tnhe_19", Ma = {
  foot: Pu,
  note: Hu,
  link: Fu
};
function F0({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ma.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: Ma.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${Ma.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const Du = "_head_m60n1_3", Ou = "_identity_m60n1_12", ju = "_titleRow_m60n1_18", Wu = "_title_m60n1_18", zu = "_key_m60n1_35", Ku = "_rollup_m60n1_45", Gu = "_tools_m60n1_53", Uu = "_swatch_m60n1_65", Vu = "_mark_m60n1_72", ye = {
  head: Du,
  identity: Ou,
  titleRow: ju,
  title: Wu,
  key: zu,
  rollup: Ku,
  tools: Gu,
  swatch: Uu,
  mark: Vu
}, Nt = "initials:";
function Xu(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Yu(e) {
  const a = [Xu(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${se(e.p90)}`), a.join(" · ");
}
function Ju(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Yu(e)
  ] });
}
function Qu(e) {
  return e.startsWith(Nt) ? e.slice(Nt.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function Zu({ markRef: e, streamStep: a }) {
  const n = { "--stream": ve(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ye.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: Qu(e) }) : /* @__PURE__ */ t("span", { className: ye.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function eh({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(I, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function D0({
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
        /* @__PURE__ */ t(Zu, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ye.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ye.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ye.rollup, "aria-live": "polite", children: Ju(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ye.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(eh, { owners: l, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ t(_, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ t(Za, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const ah = "_head_16yf6_14", th = "_line_16yf6_15", nh = "_cHandle_16yf6_36", rh = "_cName_16yf6_41", lh = "_nameLine_16yf6_49", oh = "_cLabel_16yf6_56", ih = "_cCap_16yf6_61", ch = "_cShown_16yf6_66", sh = "_name_16yf6_49", dh = "_noCap_16yf6_88", uh = "_state_16yf6_102", hh = "_handle_16yf6_111", mh = "_sub_16yf6_137", P = {
  head: ah,
  line: th,
  cHandle: nh,
  cName: rh,
  nameLine: lh,
  cLabel: oh,
  cCap: ih,
  cShown: ch,
  name: sh,
  noCap: dh,
  state: uh,
  handle: hh,
  sub: mh
}, wh = "can't be hidden or collapsed", _h = "terminal · counted, not a column";
function O0() {
  return /* @__PURE__ */ o("div", { className: P.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: P.cHandle }),
    /* @__PURE__ */ t("span", { className: P.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: P.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: P.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: P.cShown, children: "Shown" })
  ] });
}
function fh(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function vh(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function kt(e) {
  return e.gate ? wh : e.terminal ? _h : vh(e.agentsMounted);
}
function bh(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function ph({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: P.cName, children: [
    /* @__PURE__ */ o("span", { className: P.nameLine, children: [
      /* @__PURE__ */ t("span", { className: P.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    kt(e) && /* @__PURE__ */ t("span", { className: P.sub, children: kt(e) })
  ] });
}
function gh(e) {
  return e === void 0 ? "" : String(e);
}
function yh(e) {
  return e === "" ? void 0 : Number(e);
}
function Nh({ name: e, onReorder: a }) {
  return /* @__PURE__ */ t("span", { className: P.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: P.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (n) => bh(n, a),
      children: "⠿"
    }
  ) });
}
function kh({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${P.cCap} ${P.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: P.cCap, children: /* @__PURE__ */ t(I, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: gh(a.cap), onChange: (r) => n({ ...a, cap: yh(r) }) }) });
}
function $h({ stage: e, config: a, onChange: n }) {
  const r = fh(e, a.shown), l = e.gate || e.terminal, i = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: P.cShown, children: [
    /* @__PURE__ */ t(Oe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ t("span", { className: P.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function Ch(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function j0({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: P.line, "data-kind": Ch(e), children: [
    /* @__PURE__ */ t(Nh, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(ph, { stage: e }),
    /* @__PURE__ */ t("span", { className: P.cLabel, children: /* @__PURE__ */ t(I, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(kh, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t($h, { stage: e, config: a, onChange: n })
  ] });
}
const Sh = "_body_hn6d6_2", Rh = "_head_hn6d6_9", Th = "_summary_hn6d6_19", xh = "_block_hn6d6_20", Lh = "_actionsBlock_hn6d6_21", Ah = "_title_hn6d6_41", Eh = "_note_hn6d6_46", Ih = "_k_hn6d6_51", Mh = "_kv_hn6d6_58", qh = "_row_hn6d6_64", Bh = "_label_hn6d6_75", Ph = "_value_hn6d6_84", Hh = "_quote_hn6d6_90", Fh = "_actions_hn6d6_21", Dh = "_resolve_hn6d6_103", H = {
  body: Sh,
  head: Rh,
  summary: Th,
  block: xh,
  actionsBlock: Lh,
  title: Ah,
  note: Eh,
  k: Ih,
  kv: Mh,
  row: qh,
  label: Bh,
  value: Ph,
  quote: Hh,
  actions: Fh,
  resolve: Dh
};
function Oh(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function jh(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(Ce, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Wh(e) {
  const a = ra(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function zh(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(m, { ...Ra(Wh(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Oh(e),
    ...jh(e, a)
  ];
}
function Kh({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: H.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: H.k, children: a }),
    e
  ] });
}
function Gh({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: H.head, children: [
    /* @__PURE__ */ t(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function Uh({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: H.block, children: [
    /* @__PURE__ */ t("p", { className: H.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: H.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: H.note, children: e.agentMeta })
  ] }) : null;
}
function W0({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = k(), d = zh(e, l);
  return /* @__PURE__ */ t(la, { kind: "drawer", labelledBy: u, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: H.body, children: [
    /* @__PURE__ */ t(Gh, { item: e }),
    /* @__PURE__ */ o("div", { className: H.summary, children: [
      /* @__PURE__ */ t("h2", { className: H.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: H.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: H.kv, children: d.map(([h, v]) => /* @__PURE__ */ o("div", { className: H.row, children: [
      /* @__PURE__ */ t("dt", { className: H.label, children: h }),
      /* @__PURE__ */ t("dd", { className: H.value, children: v })
    ] }, h)) }),
    /* @__PURE__ */ t(Uh, { item: e }),
    /* @__PURE__ */ o("div", { className: H.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: H.actions, children: a }),
      s && /* @__PURE__ */ t("p", { className: H.note, children: s })
    ] }),
    /* @__PURE__ */ t(Kh, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Vh = "_root_3azmy_2", Xh = "_list_3azmy_7", Yh = "_item_3azmy_12", Jh = "_box_3azmy_18", Qh = "_text_3azmy_23", Zh = "_note_3azmy_28", Ge = {
  root: Vh,
  list: Xh,
  item: Yh,
  box: Jh,
  text: Qh,
  note: Zh
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
const em = "_rail_ke7ch_2", am = "_k_ke7ch_11", tm = "_head_ke7ch_19", nm = "_section_ke7ch_25", rm = "_card_ke7ch_38", lm = "_strip_ke7ch_42", om = "_skeleton_ke7ch_56", im = "_skeletonLabel_ke7ch_70", cm = "_bar_ke7ch_76", sm = "_note_ke7ch_85", he = {
  rail: em,
  k: am,
  head: tm,
  section: nm,
  card: rm,
  strip: lm,
  skeleton: om,
  skeletonLabel: im,
  bar: cm,
  note: sm
};
function dm(e) {
  return (a) => e == null ? void 0 : e(a);
}
function qa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: he.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: he.k, children: e }),
    a
  ] });
}
function um({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: he.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: he.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: he.bar, "aria-hidden": "true" }, r))
  ] });
}
function hm({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(Bu, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function mm(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(hm, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(um, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function z0(e) {
  const a = dm(e.onOpen), n = an(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: he.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${he.k} ${he.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(qa, { title: "Card", children: /* @__PURE__ */ t("div", { className: he.card, children: n && /* @__PURE__ */ t(La, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(qa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: he.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(mm, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: he.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(qa, { title: "Effect of this config", children: /* @__PURE__ */ t(Aa, { items: e.effects, density: "compact" }) })
  ] });
}
function wm(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function _m(e) {
  return Math.ceil(e.length / 2);
}
function fm(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function tn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function vm(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = tn(e);
  l !== void 0 && n(l), r(fm(e.type));
}
function bm(e, a, n, r, l) {
  R(() => {
    if (e !== null)
      return e.subscribe(a, (i) => vm(i, n, r, l));
  }, [e, a, n, r, l]);
}
function pm(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function gm(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function ym(e, a) {
  return a !== void 0 ? se(e.timeInStage) + " · waits on " + a.agent : se(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Nm(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + K.height.card + " + " + K.height.cardRow + " * " + String(_m(a ?? [])) + ")"
  };
}
function km(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function $m(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(m, { role: "meta", label: re(e.cost) }) : null;
}
function Cm(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(m, { role: "meta", label: e.jiraKey }) : null;
}
function Sm(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(Ce, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function Rm(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function Tm(e, a) {
  return a === void 0 ? e : wm(e, a.ref);
}
function xm(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ta(e) {
  return e === !0 ? "true" : void 0;
}
function nn(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = f(null), i = da(l), c = f(/* @__PURE__ */ new Set()), [s, u] = g(pm(a));
  bm(e.feed, a.key, c, u, i);
  const d = gm(a, r), h = ym(a, n), v = Nm(a, e.fields), b = Rm(a, n, s);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...xm(e),
      className: "ward-workcard",
      "data-flagged": ta(a.flagged),
      "data-selected": ta(e.selected),
      style: v,
      ref: Tm(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        km(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(m, { role: d.role, label: d.label }),
          $m(a, e.fields),
          Cm(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Sm(n, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function Lm({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Am(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Em(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Im(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(Lm, { count: e.items.length, cap: e.column.cap });
}
function Mm(e, a) {
  return e.roving ?? a;
}
function qm(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Bm(e, a) {
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
function Pm(e) {
  const a = k(), n = ka({ orientation: "vertical" }), r = Mm(e, n), l = Am(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ta(l), "data-gate": ta(e.column.gate), children: [
    Em(e.column, e.items.length, a),
    Im(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...qm(e, n), children: Bm(e, r) })
  ] });
}
function Hm(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + se(e.p50)), e.p90 !== void 0 && (a += " · p90 " + se(e.p90)), a;
}
function Fm(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(I, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Dm(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function K0(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: Hm(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Fm(e),
      Dm(e.onConfigure),
      /* @__PURE__ */ t(Za, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Om(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function jm(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Oe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Oe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Wm(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ t(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function G0(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ta(Om(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: jm(e) }),
    /* @__PURE__ */ t(I, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(jt, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Wm(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function U0(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(nn, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(Pm, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function zm(e, a) {
  const n = tn(e);
  n !== void 0 && a(n);
}
function Km(e, a, n) {
  R(() => {
    if (e != null)
      return e.subscribe(a, (r) => zm(r, n));
  }, [e, a, n]);
}
function Gm(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Um(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function Vm(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(Ce, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Xm(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function V0(e) {
  var c;
  const a = e.item, n = a.run, [r, l] = g((c = a.run) == null ? void 0 : c.lastStep);
  Km(e.feed, a.key, l);
  const i = [...Gm(a), ...Um(a)];
  return /* @__PURE__ */ o(la, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: s[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      Vm(n, r)
    ] }),
    Xm(a, e.actions)
  ] });
}
const Ym = "_card_1u4a0_2", Jm = "_head_1u4a0_28", Qm = "_mark_1u4a0_36", Zm = "_name_1u4a0_48", ew = "_chips_1u4a0_69", aw = "_description_1u4a0_75", tw = "_run_1u4a0_80", nw = "_sep_1u4a0_89", rw = "_facts_1u4a0_94", lw = "_fact_1u4a0_94", ow = "_factLabel_1u4a0_107", iw = "_factValue_1u4a0_111", le = {
  card: Ym,
  head: Jm,
  mark: Qm,
  name: Zm,
  chips: ew,
  description: aw,
  run: tw,
  sep: nw,
  facts: rw,
  fact: lw,
  factLabel: ow,
  factValue: iw
}, cw = { live: "done", draft: "running", paused: "meta" };
function sw(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function dw({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ t(m, { role: cw[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function uw({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: le.description, children: e });
}
function hw({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(Ce, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function mw({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ t("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function ww(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function _w({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: c }) {
  const s = { "--stream": ve(e.streamStep, "id") }, u = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: sw(c),
      style: s,
      "data-selected": u,
      "data-paused": ww(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ t("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${le.name} ward-rowlink ward-target`, href: W(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ t(uw, { description: e.description }),
        /* @__PURE__ */ t(hw, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(dw, { versions: e.versions }),
        /* @__PURE__ */ t(mw, { facts: i })
      ]
    }
  );
}
const fw = "_list_4dcyc_2", vw = "_row_4dcyc_11", bw = "_head_4dcyc_23", pw = "_id_4dcyc_30", gw = "_lock_4dcyc_35", yw = "_reason_4dcyc_41", Nw = "_remove_4dcyc_46", kw = "_clauses_4dcyc_50", $w = "_clause_4dcyc_50", Cw = "_label_4dcyc_64", Sw = "_cell_4dcyc_71", Rw = "_value_4dcyc_76", ce = {
  list: fw,
  row: vw,
  head: bw,
  id: pw,
  lock: gw,
  reason: yw,
  remove: Nw,
  clauses: kw,
  clause: $w,
  label: Cw,
  cell: Sw,
  value: Rw
}, rn = We(!1);
function X0({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(rn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ce.list, "aria-label": a, children: e }) });
}
function Tw({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(I, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function xw({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ce.lock, children: [
    /* @__PURE__ */ t(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ce.reason, children: e })
  ] });
}
function Lw({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ce.head, children: [
    /* @__PURE__ */ t("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(xw, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ce.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function $t(e, a) {
  return e.locked ? void 0 : a;
}
function Y0({ rule: e, onChange: a, onRemove: n }) {
  if (!je(rn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = $t(e, a);
  return /* @__PURE__ */ o("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Lw, { rule: e, onRemove: $t(e, n) }),
    /* @__PURE__ */ t("dl", { className: ce.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ce.clause, children: [
      /* @__PURE__ */ t("dt", { className: ce.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ce.cell, children: /* @__PURE__ */ t(Tw, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Aw = "_ladder_j98f1_2", Ew = "_cell_j98f1_7", Iw = "_empty_j98f1_26", Mw = "_name_j98f1_34", qw = "_holder_j98f1_40", Bw = "_request_j98f1_46", Pw = "_swatches_j98f1_51", Hw = "_swatch_j98f1_51", Fw = "_tilesFrame_j98f1_78", Dw = "_tiles_j98f1_78", Ow = "_tile_j98f1_78", jw = "_bar_j98f1_117", Ww = "_hex_j98f1_128", zw = "_note_j98f1_138", L = {
  ladder: Aw,
  cell: Ew,
  empty: Iw,
  name: Mw,
  holder: qw,
  request: Bw,
  swatches: Pw,
  swatch: Hw,
  tilesFrame: Fw,
  tiles: Dw,
  tile: Ow,
  bar: jw,
  hex: Ww,
  note: zw
}, J0 = "not validated yet, pending a CVD matrix and dark stepping";
function Kw(e) {
  return e.reserved ? "reserved" : Ca(e.step) ? "validated" : "partial";
}
function ln(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Gw(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Uw({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(Ee, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Vw(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Xw(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Ct = (e) => String(e).padStart(2, "0");
function Yw(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? ln(e, void 0);
}
function Jw({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${L.hex} ward-ladder-hex`, children: r ? `step ${Ct(e)}` : ir(e) }),
    /* @__PURE__ */ t("span", { className: `${L.note} ward-ladder-note`, children: r ? n : `Step ${Ct(e)} · ${n}` })
  ] });
}
function Qw({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const c = Kw(e), s = ln(c, n), u = s !== "free", d = u || i, h = a === e.step, v = e.name ?? `Step ${e.step}`, b = () => {
    d || r(e.step);
  }, y = `${v} · ${l === "tiles" && h ? "yours" : s}`;
  return { shared: { role: "radio", "aria-label": y, ...Xw(u, h, d), "data-validation": c, style: Gw(e, c), onClick: b, onKeyDown: (q) => Vw(q, b) }, label: y, name: v, holder: s, validation: c, note: Yw(c, n, h), step: e.step };
}
const Zw = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${L.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${L.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(Jw, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${L.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(Uw, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${L.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${L.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function e_(e) {
  return Zw[e.presentation](Qw(e));
}
function a_(e) {
  for (const a of e)
    if (!a.reserved && !$a(a.step)) throw new Error("colour ladder renders token steps only");
}
function t_() {
  return /* @__PURE__ */ o("div", { className: `${L.cell} ward-ladder-cell ${L.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${L.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${L.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function n_(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const r_ = { list: L.ladder, swatches: L.swatches, tiles: L.tilesFrame };
function l_() {
  return /* @__PURE__ */ o("div", { className: `${L.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${L.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${L.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const o_ = { list: t_, swatches: () => null, tiles: l_ };
function i_(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function on(e) {
  const a = e.takenBy ?? {}, n = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  a_(e.steps);
  const r = n_(e), l = o_[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((c) => /* @__PURE__ */ t(e_, { step: c, value: e.value, taken: a[c.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, c.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...i_(e.disabled === !0), className: `${r_[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: L.tiles, children: i }) : i });
}
const c_ = "_rail_1el2t_2", s_ = "_section_1el2t_12", d_ = "_sectionFlush_1el2t_22", u_ = "_head_1el2t_26", h_ = "_headLabel_1el2t_34", m_ = "_sample_1el2t_42", w_ = "_sampleLabel_1el2t_47", __ = "_sampleTitle_1el2t_54", f_ = "_sampleMeta_1el2t_59", v_ = "_trace_1el2t_65", b_ = "_traceHead_1el2t_70", p_ = "_steps_1el2t_78", g_ = "_step_1el2t_78", y_ = "_stepTitle_1el2t_97", N_ = "_hollow_1el2t_107", k_ = "_stepBody_1el2t_115", $_ = "_stepDetail_1el2t_127", C_ = "_publish_1el2t_132", S_ = "_reason_1el2t_138", R_ = "_note_1el2t_143", T_ = "_reveal_1el2t_148", N = {
  rail: c_,
  section: s_,
  sectionFlush: d_,
  head: u_,
  headLabel: h_,
  sample: m_,
  sampleLabel: w_,
  sampleTitle: __,
  sampleMeta: f_,
  trace: v_,
  traceHead: b_,
  steps: p_,
  step: g_,
  stepTitle: y_,
  hollow: N_,
  stepBody: k_,
  stepDetail: $_,
  publish: C_,
  reason: S_,
  note: R_,
  reveal: T_
}, St = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, x_ = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, L_ = { ok: "greenFill", finding: "orangeFill", action: "blue" }, A_ = { notSimulated: "not simulated", running: "running" };
function E_(e) {
  return e.presentation === "foundry";
}
function I_(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function M_(e, a) {
  var r;
  const n = x_[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function q_(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function B_(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function P_(e) {
  if (q_(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function H_(e) {
  const [a, n] = g(!1);
  R(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${N.step} ${N.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function F_(e) {
  const a = A_[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: N.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(Ee, { size: 6, kind: L_[e.kind], label: e.kind });
}
function D_(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: N.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function O_(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(Ce, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function j_(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(H_, { kind: a.kind, children: [
    /* @__PURE__ */ t(F_, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: N.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: N.stepTitle, children: a.title }),
      /* @__PURE__ */ t(D_, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(O_, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function W_(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(se(a)), n.join(" · ");
}
function cn(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${N.trace} ${N.section}`, children: [
    /* @__PURE__ */ t("p", { className: N.traceHead, id: a, children: W_(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: N.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(j_, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function z_(e) {
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
function K_(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${N.sampleMeta} ${N.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function G_(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Pt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: N.sectionFlush, children: /* @__PURE__ */ t(Ta, { divided: !0, cells: a }) });
}
function U_(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Pt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function V_(e) {
  const a = U_(e.run);
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
function X_(e) {
  return /* @__PURE__ */ o("div", { className: `${N.publish} ${N.section}`, children: [
    /* @__PURE__ */ t(sn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: N.note, children: e.note })
  ] });
}
function Y_(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${N.publish} ${N.section}`, children: /* @__PURE__ */ t(sn, { reason: e.reason, onPublish: e.onPublish }) });
}
function dn(e) {
  return /* @__PURE__ */ o("div", { className: `${N.head} ${N.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: N.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(m, { role: St[e.run.status].role, label: St[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(Ce, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function J_(e, a) {
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
function Q_(e) {
  var n;
  B_(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(dn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(z_, { sample: e.run.sample }),
    /* @__PURE__ */ t(cn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(G_, { run: e.run }),
    /* @__PURE__ */ t("div", { className: N.section, children: /* @__PURE__ */ t(Aa, { items: e.checklist }) }),
    /* @__PURE__ */ t(X_, { reason: I_(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Z_(e) {
  var r;
  const a = J_(e.run, e.feed);
  P_(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(dn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(K_, { sample: e.run.sample }),
    /* @__PURE__ */ t(cn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(V_, { run: e.run }),
    /* @__PURE__ */ t("div", { className: N.section, children: /* @__PURE__ */ t(Aa, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(Y_, { reason: M_(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function Q0(e) {
  return E_(e) ? /* @__PURE__ */ t(Z_, { ...e }) : /* @__PURE__ */ t(Q_, { ...e });
}
const ef = "_list_142ip_3", af = "_row_142ip_9", tf = "_condition_142ip_18", nf = "_action_142ip_24", ua = {
  list: ef,
  row: af,
  condition: tf,
  action: nf
}, un = We(!1);
function Z0({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(un.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ua.list, "aria-label": a, children: e }) });
}
function eC({ rule: e }) {
  if (!je(un)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: ua.row, children: [
    /* @__PURE__ */ t(m, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: ua.condition, children: e.when }),
    /* @__PURE__ */ t(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: ua.action, children: e.then })
  ] });
}
const rf = "_move_tmppt_3", lf = {
  move: rf
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
function of(e) {
  return e === "up" ? "down" : "up";
}
function cf(e, a) {
  const n = Rt(e, a.id, a.direction) ?? Rt(e, a.id, of(a.direction));
  n == null || n.focus();
}
function wn() {
  const e = f(null), [a, n] = g(null), [r, l] = g("");
  return R(() => {
    e.current !== null && a !== null && cf(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    n(c), l(s);
  } };
}
function _n({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ba({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${lf.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const sf = "_body_1h15q_2", df = "_title_1h15q_8", uf = "_section_1h15q_13", hf = "_legend_1h15q_18", mf = "_stages_1h15q_26", wf = "_stage_1h15q_26", _f = "_stageIndex_1h15q_44", ff = "_stageName_1h15q_50", vf = "_footer_1h15q_59", bf = "_note_1h15q_66", pf = "_reason_1h15q_71", gf = "_actions_1h15q_76", yf = "_webHead_1h15q_83", Nf = "_kicker_1h15q_92", kf = "_webTitle_1h15q_99", $f = "_webBody_1h15q_105", Cf = "_webSection_1h15q_109", Sf = "_sectionHead_1h15q_121", Rf = "_sectionNote_1h15q_129", Tf = "_formLabel_1h15q_134", xf = "_identityRow_1h15q_139", Lf = "_nameCell_1h15q_145", Af = "_keyCell_1h15q_150", Ef = "_colourCell_1h15q_154", If = "_colourStatus_1h15q_161", Mf = "_webStages_1h15q_166", qf = "_webStageList_1h15q_172", Bf = "_webStage_1h15q_166", Pf = "_webIndex_1h15q_191", Hf = "_webStageName_1h15q_196", Ff = "_webMoves_1h15q_201", Df = "_addStage_1h15q_215", Of = "_addStageButton_1h15q_223", jf = "_addStageNote_1h15q_231", Wf = "_webFooter_1h15q_236", zf = "_webFooterNotes_1h15q_244", Kf = "_webNote_1h15q_251", w = {
  body: sf,
  title: df,
  section: uf,
  legend: hf,
  stages: mf,
  stage: wf,
  stageIndex: _f,
  stageName: ff,
  footer: vf,
  note: bf,
  reason: pf,
  actions: gf,
  webHead: yf,
  kicker: Nf,
  webTitle: kf,
  webBody: $f,
  webSection: Cf,
  sectionHead: Sf,
  sectionNote: Rf,
  formLabel: Tf,
  identityRow: xf,
  nameCell: Lf,
  keyCell: Af,
  colourCell: Ef,
  colourStatus: If,
  webStages: Mf,
  webStageList: qf,
  webStage: Bf,
  webIndex: Pf,
  webStageName: Hf,
  webMoves: Ff,
  addStage: Df,
  addStageButton: Of,
  addStageNote: jf,
  webFooter: Wf,
  webFooterNotes: zf,
  webNote: Kf
}, Gf = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], fn = "not in catalogue";
function Uf(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${fn}` }, ...n];
}
function Vf({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(I, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${fn}`;
  return /* @__PURE__ */ t(I, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Uf(n, e.name), invalid: i, onChange: r });
}
function vn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Xf(e) {
  const a = f([]), n = f(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Yf({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: c }) {
  const s = vn(a, n), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: w.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: w.webStageName, children: /* @__PURE__ */ t(Vf, { stage: a, index: n, catalogue: l, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ t(I, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: Gf, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      n > 0 && /* @__PURE__ */ t(ba, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      n < r - 1 && /* @__PURE__ */ t(ba, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function Jf({ stages: e, onChange: a, catalogue: n }) {
  const r = Xf(e.length), l = wn(), i = (s, u) => {
    const d = hn(s, u);
    r.current = ja(r.current, s, d), l.moved({ id: r.current[d], direction: u }, mn(vn(e[s], s), d, e.length)), a(ja(e, s, d));
  }, c = (s, u) => a(e.map((d, h) => h === s ? u : d));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ t(Yf, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: n, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ t(_n, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Qf = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Zf = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], ev = "A new stream starts as a draft. Nothing runs on it until you publish it.", av = "Create is disabled: name the stream and give it a key first.", tv = "reorder with the ↑ ↓ buttons · min 2";
function at(e, a) {
  return !e.reserved && Ca(e.step) && a[e.step] === void 0;
}
function nv(e, a) {
  const n = e.find((r) => at(r, a));
  return n ? n.step : 1;
}
function rv({ stages: e, onMove: a }) {
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
function lv({ reason: e, onCreate: a, onDraft: n }) {
  const r = k();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ t("p", { className: w.note, children: ev }),
    e && /* @__PURE__ */ t("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ t(_, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function ov(e, a) {
  return e !== "" && a !== "" ? null : av;
}
function iv(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = Zf, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = k(), [h, v] = g(""), [b, y] = g(""), [A, q] = g(a[0].value), [oe, Se] = g(() => nv(n, r)), [te, ze] = g(e.stages ?? Qf), [Ke, C] = g(l[0].value), z = { name: h, key: b, streamStep: oe, owner: A, stages: te, policy: Ke }, be = ov(h, b);
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
      /* @__PURE__ */ t(rv, { stages: te, onMove: (Ie, jn) => ze(ja(te, Ie, jn)) })
    ] }),
    /* @__PURE__ */ t(Jt, { legend: "Loop policy", options: l, value: Ke, onChange: C }),
    /* @__PURE__ */ t(lv, { reason: be, onCreate: () => i(z), onDraft: () => c(z) })
  ] }) });
}
const bn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], cv = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function sv(e, a, n, r, l, i) {
  var s;
  const c = ((s = bn.find((u) => u.value === l)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: c, stages: i };
}
function dv(e, a) {
  return uv(e) && hv(e, a) && mv(e);
}
function uv(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function hv(e, a) {
  return e.colourStep === null || at({ step: e.colourStep }, a);
}
function mv(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function wv(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : at({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function _v({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function fv({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ t(_v, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: w.reason, children: cv })
    ] }),
    l && /* @__PURE__ */ t(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function vv({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ t("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function bv({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
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
function pv(e) {
  const a = k(), n = k(), r = e.takenBy ?? {}, [l, i] = g(""), [c, s] = g(""), [u, d] = g(e.owners[0] ?? ""), [h, v] = g(null), [b, y] = g("relay"), [A, q] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = sv(l, c, u, h, b, A), Se = dv(oe, r), te = A.find((C) => C.kind === "agent" && C.name.trim() !== ""), ze = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ t("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(on, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: v, takenBy: r })
  ] }), Ke = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("p", { className: w.colourStatus, "data-colour-status": "", children: wv(h, r) }),
    /* @__PURE__ */ t(I, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map((C) => ({ value: C, label: C })), onChange: d })
  ] });
  return /* @__PURE__ */ o(la, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(vv, { titleId: n }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ t(bv, { name: l, setName: i, streamKey: c, setKey: s, colour: ze, owner: Ke }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: w.sectionNote, children: tv })
        ] }),
        /* @__PURE__ */ t(Jf, { stages: A, onChange: q })
      ] }),
      /* @__PURE__ */ t("section", { className: w.webSection, children: /* @__PURE__ */ t(Jt, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: bn, onChange: y }) }),
      /* @__PURE__ */ t(fv, { ready: Se, draft: oe, agentStage: te, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function aC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(pv, { ...e }) : /* @__PURE__ */ t(iv, { ...e });
}
const gv = "_row_bs8hc_2", yv = "_cell_bs8hc_6", Nv = "_condition_bs8hc_11", kv = "_action_bs8hc_18", $v = "_contract_bs8hc_24", Cv = "_contractCondition_bs8hc_33", Sv = "_contractAction_bs8hc_39", Z = {
  row: gv,
  cell: yv,
  condition: Nv,
  action: kv,
  contract: $v,
  contractCondition: Cv,
  contractAction: Sv
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
function Rv({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t("span", { className: Z.condition, title: pa(e, r), children: pa(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: tt(e, a, n) })
  ] });
}
function Tv({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ o("td", { className: Z.cell, children: [
      /* @__PURE__ */ t(m, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Z.condition, children: pa(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: tt(e, a, n) })
  ] });
}
function xv({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Z.contract, children: [
    /* @__PURE__ */ t(m, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Z.contractCondition, children: pa(e, r) }),
    /* @__PURE__ */ t(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Z.contractAction, children: tt(e, a, n, !0) })
  ] });
}
const Lv = { two: Tv, four: Rv, contract: xv };
function tC(e) {
  var n;
  if (!pn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Lv[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const Av = "_column_1tf9e_2", Ev = "_head_1tf9e_17", Iv = "_index_1tf9e_23", Mv = "_name_1tf9e_29", qv = "_meta_1tf9e_38", Bv = "_mono_1tf9e_43", Pv = "_gate_1tf9e_50", Hv = "_reviewersLabel_1tf9e_57", Fv = "_reviewers_1tf9e_57", Dv = "_reviewer_1tf9e_57", Ov = "_agents_1tf9e_74", jv = "_workflowColumn_1tf9e_79", Wv = "_workflowHead_1tf9e_96", zv = "_stageRow_1tf9e_102", Kv = "_stageLabel_1tf9e_109", Gv = "_workflowTitle_1tf9e_116", Uv = "_workflowMeta_1tf9e_122", Vv = "_workflowGate_1tf9e_127", Xv = "_gateNote_1tf9e_135", Yv = "_cardNote_1tf9e_140", Jv = "_reviewerList_1tf9e_145", Qv = "_reviewerRow_1tf9e_151", Zv = "_reviewerMark_1tf9e_157", eb = "_reviewerName_1tf9e_167", ab = "_terminalCard_1tf9e_173", tb = "_terminalCount_1tf9e_182", nb = "_workflowAgents_1tf9e_188", rb = "_mount_1tf9e_194", $ = {
  column: Av,
  head: Ev,
  index: Iv,
  name: Mv,
  meta: qv,
  mono: Bv,
  gate: Pv,
  reviewersLabel: Hv,
  reviewers: Fv,
  reviewer: Dv,
  agents: Ov,
  workflowColumn: jv,
  workflowHead: Wv,
  stageRow: zv,
  stageLabel: Kv,
  workflowTitle: Gv,
  workflowMeta: Uv,
  workflowGate: Vv,
  gateNote: Xv,
  cardNote: Yv,
  reviewerList: Jv,
  reviewerRow: Qv,
  reviewerMark: Zv,
  reviewerName: eb,
  terminalCard: ab,
  terminalCount: tb,
  workflowAgents: nb,
  mount: rb
}, lb = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function nt(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function gn(e) {
  return `${Math.round(e * 100)}%`;
}
function ob({ stage: e }) {
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
function ib({ stage: e }) {
  return /* @__PURE__ */ t(Ta, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: nt(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function cb({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: $.head, children: [
    /* @__PURE__ */ t("span", { className: $.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: $.name, id: a, children: e.name }),
    /* @__PURE__ */ t(m, { role: e.kind === "gate" ? "gate" : "soft", label: lb[e.kind] })
  ] });
}
function sb({ stage: e }) {
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
function db({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(ob, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(ib, { stage: e }) : null;
}
function ub({ onMount: e }) {
  return e ? /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function hb({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: $.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(cb, { stage: e, titleId: l }),
    /* @__PURE__ */ t(sb, { stage: e }),
    /* @__PURE__ */ t(db, { stage: e }),
    /* @__PURE__ */ t("div", { className: $.agents, children: a.map((c) => /* @__PURE__ */ t(_w, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ t(ub, { onMount: n })
  ] });
}
const mb = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function wb({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: $.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: $.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: $.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: $.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function _b({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: $.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: $.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(wb, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: $.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: gn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function fb(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function vb({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: $.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: $.terminalCount, children: nt(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: $.cardNote, children: fb(e.rolledBackThisWeek) })
  ] });
}
function bb(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function pb(e) {
  if (e.kind === "terminal") return `${nt(e.closedThisWeek)} this week`;
  const a = bb(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function gb({ stage: e, titleId: a }) {
  const n = mb[e.kind];
  return /* @__PURE__ */ o("header", { className: $.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: $.stageRow, children: [
      /* @__PURE__ */ o("span", { className: $.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(m, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: $.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: $.workflowMeta, children: pb(e) })
  ] });
}
function yb(e) {
  return e === "entry" || e === "agent";
}
function Nb({ stage: e, onMount: a }) {
  return a === void 0 || !yb(e.kind) ? null : /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", className: $.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function kb({ stage: e, agentCards: a, onMount: n }) {
  const r = k();
  return /* @__PURE__ */ o("section", { className: $.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(gb, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(_b, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(vb, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: $.workflowAgents, children: a }),
    /* @__PURE__ */ t(Nb, { stage: e, onMount: n })
  ] });
}
function $b(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function nC(e) {
  return $b(e) ? /* @__PURE__ */ t(kb, { ...e }) : /* @__PURE__ */ t(hb, { ...e });
}
const Cb = "_row_1jata_6", Sb = "_name_1jata_12", Rb = "_compactRow_1jata_13", Tb = "_compactName_1jata_13", xb = "_cell_1jata_30", Lb = "_chain_1jata_45", Ab = "_owner_1jata_51", Eb = "_mono_1jata_57", Ib = "_compactCell_1jata_79", Mb = "_stack_1jata_96", qb = "_stat_1jata_103", Bb = "_identityLine_1jata_110", Pb = "_identity_1jata_110", Hb = "_ownerLine_1jata_137", Fb = "_link_1jata_150", Db = "_gateMark_1jata_156", Ob = "_emptyChain_1jata_161", jb = "_arrow_1jata_167", Wb = "_muted_1jata_168", zb = "_define_1jata_173", Kb = "_statValue_1jata_180", Gb = "_policyId_1jata_186", Ub = "_sub_1jata_191", p = {
  row: Cb,
  name: Sb,
  compactRow: Rb,
  compactName: Tb,
  cell: xb,
  chain: Lb,
  owner: Ab,
  mono: Eb,
  compactCell: Ib,
  stack: Mb,
  stat: qb,
  identityLine: Bb,
  identity: Pb,
  ownerLine: Hb,
  link: Fb,
  gateMark: Db,
  emptyChain: Ob,
  arrow: jb,
  muted: Wb,
  define: zb,
  statValue: Kb,
  policyId: Gb,
  sub: Ub
};
function yn(e) {
  var s;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, c = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (s = e.currentTarget.querySelector("a")) == null || s.dispatchEvent(new MouseEvent("click", c));
}
function Vb(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Xb(e) {
  return e === void 0 ? p.compactRow : `${p.compactRow} ${e}`;
}
function Nn(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function Yb(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Nn(e.members)}`;
}
function Jb(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: p.compactCell, children: /* @__PURE__ */ o("span", { className: p.stack, children: [
    /* @__PURE__ */ o("span", { className: p.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${p.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${p.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(m, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: p.ownerLine, children: Yb(e) })
  ] }) });
}
function kn({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(S, { children: [
    a ? /* @__PURE__ */ t("span", { className: p.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(m, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Qb(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = ra(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function Zb({ stages: e, streamStep: a }) {
  const n = e.findIndex((r) => r.gate === !0);
  return /* @__PURE__ */ t("span", { className: `${p.chain} ward-chiprow`, children: e.map((r, l) => /* @__PURE__ */ o("span", { className: p.link, children: [
    l === 0 ? null : /* @__PURE__ */ t("span", { className: p.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ t(kn, { name: r.name, gate: r.gate === !0, look: Qb(l, n, a), size: "tag" })
  ] }, `${r.name}${l}`)) });
}
function ep(e) {
  return /* @__PURE__ */ t("td", { className: p.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: p.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: p.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: p.define, children: "Define workflow" })
  ] }) : Zb(e) });
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
function ap(e) {
  return /* @__PURE__ */ t("td", { className: p.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: p.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: p.stat, children: [
    /* @__PURE__ */ t("span", { className: p.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: p.sub, children: e.summary })
  ] }) });
}
function tp(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function np({ stream: e, href: a, presentation: n }) {
  const r = Xb(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: yn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ve(e.streamStep, "chip") }, children: [
    Jb(e, a),
    ep(e),
    xt(tp(e.agents), e.agents === void 0 ? void 0 : Vb(e.agents), "—"),
    ap(e.policy),
    xt(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function rp(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function rC(e) {
  if (rp(e)) return np(e);
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
const lp = "_row_mdce7_2", op = "_name_mdce7_16", ip = "_scope_mdce7_24", ga = {
  row: lp,
  name: op,
  scope: ip
};
function rt(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function cp(e) {
  return e === void 0 ? `${ga.row} ward-toolrow` : `${ga.row} ward-toolrow ${e}`;
}
function sp(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function dp({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function up({ classification: e }) {
  return /* @__PURE__ */ t(m, { role: e === "write" ? "write" : "meta", label: rt(e) });
}
function hp({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${ga.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function mp(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function lC({ tool: e, onChange: a, presentation: n }) {
  const r = k(), l = k(), i = sp(e, n), c = mp(n);
  return /* @__PURE__ */ o(c, { className: cp(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(dp, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${ga.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(hp, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(up, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const wp = "_strip_1qtlf_2", _p = "_head_1qtlf_10", fp = "_name_1qtlf_16", vp = "_chart_1qtlf_24", bp = "_segment_1qtlf_30", pp = "_detailedChart_1qtlf_36", gp = "_rail_1qtlf_49", yp = "_section_1qtlf_55", Np = "_label_1qtlf_66", kp = "_note_1qtlf_83", ee = {
  strip: wp,
  head: _p,
  name: fp,
  chart: vp,
  segment: bp,
  detailedChart: pp,
  rail: gp,
  section: yp,
  label: Np,
  note: kp
}, $p = "No item in flight to preview.", Cp = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Sp = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Wa = [1, 2, 3, 4, 5, 6], ya = 100;
function Rp(e, a) {
  return a.has(e) ? ve(e, "id") : "var(--ward-color-line)";
}
function Tp({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: ee.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Wa.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: ee.segment,
      x: l * ya,
      y: "0",
      width: ya,
      height: "8",
      fill: Rp(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function xp(e) {
  const a = e.slice(0, Wa.length);
  for (; a.length < Wa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Lp({ identities: e }) {
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
function Ap({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: ee.note, children: a ?? $p }) : /* @__PURE__ */ t(La, { item: { ...e, streamStep: ra(n.streamStep) }, onOpen: Cn(r), feed: null });
}
function Ep({ draft: e }) {
  const a = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: ee.head, style: a, children: [
    /* @__PURE__ */ t(Ee, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: ee.name, children: e.name }),
    /* @__PURE__ */ t(m, { ...Ra(e.key, e.streamStep) })
  ] });
}
function Ip(e) {
  const a = xp(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: ee.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(ca, { label: "Board card", children: /* @__PURE__ */ t(Ap, { ...e, draft: n }) }),
    /* @__PURE__ */ t(ca, { label: "Streams index row", children: /* @__PURE__ */ t(Ep, { draft: n }) }),
    /* @__PURE__ */ o(ca, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(Lp, { identities: a }),
      /* @__PURE__ */ t("p", { className: ee.note, children: Cp })
    ] }),
    /* @__PURE__ */ t(ca, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: ee.note, children: Sp }) })
  ] });
}
function Mp({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: ee.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: ee.head, children: [
      /* @__PURE__ */ t(Ee, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: ee.name, children: e.name }),
      /* @__PURE__ */ t(m, { ...Ra(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t(La, { item: { ...a, streamStep: e.streamStep }, onOpen: Cn(r) }),
    /* @__PURE__ */ t(Tp, { draft: e, streams: n })
  ] });
}
function oC(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(Ip, { ...e }) : /* @__PURE__ */ t(Mp, { ...e });
}
const qp = "_row_ixlg5_6", Bp = "_headCell_ixlg5_10", Pp = "_cell_ixlg5_11", Hp = "_name_ixlg5_23", Fp = "_consequence_ixlg5_29", Dp = "_governed_ixlg5_36", Op = "_control_ixlg5_42", jp = "_byRole_ixlg5_48", Wp = "_webControl_ixlg5_59", zp = "_webConsequence_ixlg5_65", Kp = "_webGoverned_ixlg5_71", D = {
  row: qp,
  headCell: Bp,
  cell: Pp,
  name: Hp,
  consequence: Fp,
  governed: Dp,
  control: Op,
  byRole: jp,
  webControl: Wp,
  webConsequence: zp,
  webGoverned: Kp
};
function Gp({
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
function Up({ capability: e, cells: a, onChange: n }) {
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
    a.map((r) => /* @__PURE__ */ t("td", { className: D.cell, children: /* @__PURE__ */ t(Gp, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function Vp(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Xp({ name: e, cell: a, onChange: n }) {
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
function Yp({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ t("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${D.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: D.cell, children: /* @__PURE__ */ t(Xp, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: D.cell, children: /* @__PURE__ */ t("span", { className: `${D.webGoverned} ward-cellmeta`, children: Vp(e) }) })
  ] });
}
function iC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Yp, { ...e }) : /* @__PURE__ */ t(Up, { ...e });
}
const Jp = "_row_vv64h_2", Qp = "_cell_vv64h_6", Zp = "_name_vv64h_25", eg = "_note_vv64h_30", ag = "_webName_vv64h_41", tg = "_webMeta_vv64h_47", U = {
  row: Jp,
  cell: Qp,
  name: Zp,
  note: eg,
  webName: ag,
  webMeta: tg
}, Sn = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function ng(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function rg({ component: e, onRestart: a }) {
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
function lg({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: ng(e.state) });
}
function og({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: U.row, children: [
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t("span", { className: `${U.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t("span", { className: `${U.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t(m, { ...Sn[e.state] }) }),
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t(lg, { component: e, onRestart: a }) })
  ] });
}
function cC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(og, { ...e }) : /* @__PURE__ */ t(rg, { ...e });
}
const ig = "_row_1f1gp_7", cg = "_cell_1f1gp_11", sg = "_next_1f1gp_28", dg = "_headCell_1f1gp_38", ug = "_webId_1f1gp_77", hg = "_webPurpose_1f1gp_83", mg = "_webMeta_1f1gp_91", wg = "_webUrgent_1f1gp_97", O = {
  row: ig,
  cell: cg,
  next: sg,
  headCell: dg,
  webId: ug,
  webPurpose: hg,
  webMeta: mg,
  webUrgent: wg
}, _g = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, fg = {
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
], vg = Object.fromEntries(Rn.map((e) => [e.key, e]));
function Ue({ column: e, children: a }) {
  const n = vg[e];
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
function sC() {
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
function bg({ cred: e }) {
  const a = _g[e.state];
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ t(Ue, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Ue, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Ue, { column: "state", children: /* @__PURE__ */ t(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Ue, { column: "cls", children: /* @__PURE__ */ t(m, { role: e.cls === "write" ? "write" : "meta", label: rt(e.cls) }) }),
    /* @__PURE__ */ t(Ue, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Ue, { column: "next", children: /* @__PURE__ */ t("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function pg({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function gg({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(pg, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(m, { ...fg[e.state] }) })
  ] });
}
function dC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(gg, { ...e }) : /* @__PURE__ */ t(bg, { ...e });
}
const yg = "_card_17zba_2", Ng = "_head_17zba_11", kg = "_env_17zba_18", $g = "_version_17zba_25", Cg = "_meta_17zba_32", Sg = "_webCard_17zba_37", Rg = "_webRow_17zba_47", Tg = "_webTitle_17zba_55", xg = "_webLine_17zba_65", Lg = "_webVersion_17zba_72", Ag = "_webMeta_17zba_77", G = {
  card: yg,
  head: Ng,
  env: kg,
  version: $g,
  meta: Cg,
  webCard: Sg,
  webRow: Rg,
  webTitle: Tg,
  webLine: xg,
  webVersion: Lg,
  webMeta: Ag
}, Lt = { dev: "Dev", uat: "UAT", prod: "Prod" }, Tn = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function Eg({ env: e }) {
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
function Ig(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function Mg(e) {
  return /* @__PURE__ */ o("article", { className: `${G.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${G.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${G.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(m, { ...Tn[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${G.version} ${G.webVersion} ${G.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${G.meta} ${G.webMeta} ${G.webLine} ward-cellmeta`, children: Ig(e) })
  ] });
}
function uC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Mg, { ...e }) : /* @__PURE__ */ t(Eg, { ...e });
}
const qg = "_panel_1hmja_2", Bg = "_line_1hmja_8", Pg = "_actions_1hmja_14", sa = {
  panel: qg,
  line: Bg,
  actions: Pg
};
function hC(e) {
  return /* @__PURE__ */ o("div", { className: sa.panel, children: [
    /* @__PURE__ */ t("p", { className: sa.line, children: e.status }),
    /* @__PURE__ */ t(I, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: sa.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: sa.line, children: e.note ?? "" })
  ] });
}
const Hg = "_upload_1vgt7_2", Fg = "_preview_1vgt7_7", Dg = "_mark_1vgt7_17", Og = "_empty_1vgt7_22", jg = "_actions_1vgt7_28", Wg = "_input_1vgt7_33", zg = "_reasons_1vgt7_41", Kg = "_reason_1vgt7_41", Gg = "_accepted_1vgt7_57", ne = {
  upload: Hg,
  preview: Fg,
  mark: Dg,
  empty: Og,
  actions: jg,
  input: Wg,
  reasons: zg,
  reason: Kg,
  accepted: Gg
}, xn = 1.5, Ln = 22, Na = "script elements or event handlers", Te = "links or external references", $e = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${xn}px at ${Ln}px`], Ug = [$e[1], $e[2], Na, Te], Vg = /* @__PURE__ */ new Map([
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
]), Xg = "http://www.w3.org/2000/svg", Yg = "http://www.w3.org/2000/xmlns/", Jg = /* @__PURE__ */ new Set([
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
]), Qg = /* @__PURE__ */ new Set([
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
]), lt = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, Zg = /url\s*\(|['"\\]/i;
function ey() {
  return { ok: !1, reasons: [$e[1]] };
}
function An(e) {
  return e.namespaceURI === Xg;
}
function ay(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && An(a) ? a : null;
  } catch {
    return null;
  }
}
function ty(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [$e[0]] : [];
}
function ny(e) {
  return Vg.get(e.localName) ?? (e.localName.startsWith("animate") ? Te : void 0);
}
function ry(e) {
  return Zg.test(e.replace(lt, ""));
}
function ly(e) {
  return /^on/i.test(e.localName) ? Na : e.localName === "href" || ry(e.value) ? Te : void 0;
}
function oy(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(ny(n));
    for (const r of Array.from(n.attributes)) a.add(ly(r));
  }
  return Ug.filter((n) => a.has(n));
}
function iy(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? Ln / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < xn;
  }) ? [$e[3]] : [];
}
function cy(e) {
  if (e.namespaceURI === Yg) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (Qg.has(a) || a.startsWith("stroke"));
}
function sy(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && An(a) && Jg.has(a.localName);
}
function dy(e, a) {
  sy(a) ? a.nodeType === Node.ELEMENT_NODE && En(a) : e.removeChild(a);
}
function En(e) {
  for (const a of Array.from(e.attributes)) cy(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) dy(e, a);
  return e;
}
function uy(e) {
  return Array.from(e.matchAll(lt), (a) => a[2]).filter((a) => a !== "");
}
function hy(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function my(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of uy(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function wy(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(lt, (r, l, i) => {
      const c = a.get(i);
      return c === void 0 ? r : r.replace(`#${i}`, `#${c}`);
    });
}
function _y(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = my(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), wy(l, r);
  }
  return e;
}
function mC(e) {
  const a = ay(e);
  if (a === null) return ey();
  const n = [...ty(a), ...oy(a), ...iy(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(_y(En(a), hy(e))) };
}
const fy = "Mark accepted.", vy = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, by = new Set(Ft.flatMap((e) => [ve(e, "id"), ve(e, "chip")]));
function py(e) {
  return e !== void 0 && (vy.test(e) || by.has(e)) ? e : void 0;
}
function gy({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: ne.preview, style: { "--mark": py(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: ne.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: ne.empty }) });
}
function yy(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function Ny(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function ky({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: ne.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("p", { className: ne.accepted, children: fy }) }) : /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("ul", { className: ne.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: ne.reason, children: a }, a)) }) });
}
function $y({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(ky, { result: e }) : /* @__PURE__ */ t("p", { className: `${ne.result} ${yy(e, n)}`, role: "status", children: Ny(e, n) });
}
function At(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function wC({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = f(null), [c, s] = g(null), u = (d) => {
    if (d === void 0) return;
    const h = a(d);
    h instanceof Promise ? h.then(s) : s(h);
  };
  return /* @__PURE__ */ o("div", { className: ne.upload, children: [
    /* @__PURE__ */ t(gy, { current: e }),
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
    /* @__PURE__ */ t($y, { result: c, presentation: r })
  ] });
}
const Cy = "_row_1wp9s_7", Sy = "_cell_1wp9s_11", Ry = "_head_1wp9s_28", Ty = "_name_1wp9s_34", xy = "_pinned_1wp9s_42", Ly = "_headCell_1wp9s_49", Ay = "_webName_1wp9s_88", Ey = "_webMeta_1wp9s_95", Iy = "_webWarn_1wp9s_103", B = {
  row: Cy,
  cell: Sy,
  head: Ry,
  name: Ty,
  pinned: xy,
  headCell: Ly,
  webName: Ay,
  webMeta: Ey,
  webWarn: Iy
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
], My = Object.fromEntries(In.map((e) => [e.key, e]));
function qy(e, a) {
  return `mcp.${e}.${a}`;
}
function By(e) {
  return Object.keys(ot).includes(e);
}
function Py(e) {
  return ot[e !== void 0 && By(e) ? e : "unknown"];
}
function Qe({ column: e, children: a }) {
  const n = My[e];
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
function _C() {
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
function Hy({ server: e }) {
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
    /* @__PURE__ */ t(Qe, { column: "tools", children: e.tools.map((n) => qy(e.name, n)).join(" · ") })
  ] });
}
function Fy(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Dy(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function Oy({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${B.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${B.webMeta} ward-cellmeta`, children: e });
}
function jy({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${B.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Wy({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(_, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function zy({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: B.row, children: [
    /* @__PURE__ */ o("td", { className: B.cell, children: [
      /* @__PURE__ */ t("span", { className: `${B.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${B.webMeta} ward-cellmeta`, children: Fy(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: B.cell, children: /* @__PURE__ */ t("span", { className: `${B.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: B.cell, children: /* @__PURE__ */ t(m, { ...Dy(e) }) }),
    /* @__PURE__ */ t("td", { className: B.cell, children: /* @__PURE__ */ t(Oy, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: B.cell, children: /* @__PURE__ */ t(m, { ...Py(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: B.cell, children: [
      /* @__PURE__ */ t(jy, { server: e, onRestart: a }),
      /* @__PURE__ */ t(Wy, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function fC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(zy, { ...e }) : /* @__PURE__ */ t(Hy, { ...e });
}
const Ky = "_row_60u3p_2", Gy = "_headCell_60u3p_14", Uy = "_cell_60u3p_15", Vy = "_name_60u3p_26", Xy = "_consequence_60u3p_32", Yy = "_reason_60u3p_38", Jy = "_value_60u3p_44", Qy = "_webRow_60u3p_60", Zy = "_webSetting_60u3p_73", eN = "_webName_60u3p_81", aN = "_webConsequence_60u3p_89", tN = "_webControl_60u3p_95", nN = "_webState_60u3p_109", rN = "_webChip_60u3p_114", E = {
  row: Ky,
  headCell: Gy,
  cell: Uy,
  name: Vy,
  consequence: Xy,
  reason: Yy,
  value: Jy,
  webRow: Qy,
  webSetting: Zy,
  webName: eN,
  webConsequence: aN,
  webControl: tN,
  webState: nN,
  webChip: rN
}, Mn = 104, qn = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function lN({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Oe, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(Xt, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: E.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function oN({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = k(), i = qn[n], c = n === "locked";
  return /* @__PURE__ */ o("tr", { className: E.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: E.headCell, children: [
      /* @__PURE__ */ t("span", { className: E.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: E.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: E.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: E.cell, children: /* @__PURE__ */ t(lN, { control: a, name: e.name, locked: c, describedBy: c ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: E.cell, style: { width: Mn }, children: /* @__PURE__ */ t(m, { role: i.role, label: i.label }) })
  ] });
}
function Bn(e, a) {
  return String(e ?? a);
}
function iN(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function cN(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Bn(e.value, "—");
}
function sN({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: E.webControl, children: [
    /* @__PURE__ */ t(Oe, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (c) => l == null ? void 0 : l(c) }),
    /* @__PURE__ */ t("span", { className: E.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function dN(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(sN, { ...e });
  const l = iN(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: E.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(Xt, { options: l, value: Bn(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${E.webControl} ${E.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: cN(a) });
}
function uN({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const c = k(), s = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${E.row} ${E.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: E.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${E.name} ${E.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: c, className: `${E.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: E.webControl, children: i(c) }) : /* @__PURE__ */ t(dN, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${E.webChip} ward-policy-chip`, style: { width: Mn }, children: /* @__PURE__ */ t(m, { ...qn[n], size: "tag" }) })
  ] });
}
function vC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(uN, { ...e }) : /* @__PURE__ */ t(oN, { ...e });
}
const hN = "_label_1o9za_7", mN = "_name_1o9za_15", wN = "_column_1o9za_24", _N = "_webFrame_1o9za_57", fN = "_webHead_1o9za_62", vN = "_webHeadLabel_1o9za_74", bN = "_webLabel_1o9za_112", pN = "_webColumns_1o9za_119", gN = "_webGroup_1o9za_125", yN = "_webPeople_1o9za_126", NN = "_webVia_1o9za_127", kN = "_webMeta_1o9za_156", j = {
  label: hN,
  name: mN,
  column: wN,
  webFrame: _N,
  webHead: fN,
  webHeadLabel: vN,
  webLabel: bN,
  webColumns: pN,
  webGroup: gN,
  webPeople: yN,
  webVia: NN,
  webMeta: kN
}, $N = {
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
function CN(e) {
  if (!e.matrixRole) return;
  const a = $N[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function SN({ node: e }) {
  const a = CN(e);
  return /* @__PURE__ */ o("span", { className: j.label, children: [
    /* @__PURE__ */ t("span", { className: j.name, children: e.name }),
    /* @__PURE__ */ t(RN, { role: a, node: e }),
    /* @__PURE__ */ t(Pa, { column: Ba[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Pa, { column: Ba[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ t(Pa, { column: Ba[2], children: e.requestedVia ?? "" })
  ] });
}
function RN({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ t(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(m, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(m, { role: "warn", label: "Unresolved" })
  ] });
}
function TN({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: c }) {
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
      label: /* @__PURE__ */ t(SN, { node: n }),
      children: c
    }
  );
}
function Ha({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function xN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${j.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ha, { className: `${j.webMeta} ${j.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ha, { className: `${j.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ha, { className: `${j.webMeta} ${j.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function LN() {
  return /* @__PURE__ */ o("div", { className: j.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: j.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: j.webColumns, children: [
      /* @__PURE__ */ t("span", { className: j.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: j.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: j.webVia, children: "Requested via" })
    ] })
  ] });
}
function AN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${j.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function EN(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function IN({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: j.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(LN, {}),
    /* @__PURE__ */ t(fd, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      en,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(AN, { row: n }),
        detail: /* @__PURE__ */ t(xN, { row: n }),
        expanded: EN(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function bC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(IN, { ...e }) : /* @__PURE__ */ t(TN, { ...e });
}
const MN = "_runbook_b9agc_2", qN = "_list_b9agc_7", BN = "_step_b9agc_15", PN = "_numeral_b9agc_21", HN = "_body_b9agc_28", FN = "_head_b9agc_34", DN = "_title_b9agc_40", ON = "_detail_b9agc_45", jN = "_actions_b9agc_50", WN = "_webList_b9agc_56", zN = "_webStep_b9agc_60", KN = "_webBody_b9agc_66", GN = "_webTitle_b9agc_74", UN = "_webDetail_b9agc_78", x = {
  runbook: MN,
  list: qN,
  step: BN,
  numeral: PN,
  body: HN,
  head: FN,
  title: DN,
  detail: ON,
  actions: jN,
  webList: WN,
  webStep: zN,
  webBody: KN,
  webTitle: GN,
  webDetail: UN
}, Pn = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Hn(e) {
  return String(e + 1).padStart(2, "0");
}
function VN({ step: e, index: a, connection: n }) {
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
function XN({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: x.runbook, children: [
    /* @__PURE__ */ t("ol", { className: x.list, children: e.map((r, l) => /* @__PURE__ */ t(VN, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: x.actions, children: a })
  ] });
}
function YN({ step: e, index: a, connection: n }) {
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
function JN({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: x.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${x.list} ${x.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(YN, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${x.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function pC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(JN, { ...e }) : /* @__PURE__ */ t(XN, { ...e });
}
const QN = "_list_1gu6a_2", ZN = "_check_1gu6a_10", e1 = "_body_1gu6a_16", a1 = "_text_1gu6a_23", t1 = "_pending_1gu6a_32", n1 = "_measured_1gu6a_37", Xe = {
  list: QN,
  check: ZN,
  body: e1,
  text: a1,
  pending: t1,
  measured: n1
};
function r1(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function l1({ check: e }) {
  const a = r1(e.passed);
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
function gC({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Xe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(l1, { check: a }, a.text)) });
}
const o1 = "_root_a6xzy_2", i1 = "_list_a6xzy_10", c1 = "_line_a6xzy_21", s1 = "_at_a6xzy_48", d1 = "_text_a6xzy_52", u1 = "_foot_a6xzy_56", h1 = "_idle_a6xzy_68", m1 = "_caret_a6xzy_76", w1 = "_jump_a6xzy_83", me = {
  root: o1,
  list: i1,
  line: c1,
  at: s1,
  text: d1,
  foot: u1,
  idle: h1,
  caret: m1,
  jump: w1
}, _1 = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function it(e) {
  return Number.isNaN(Date.parse(e)) ? "" : _1.format(new Date(e));
}
const f1 = { warn: "warning", ok: "ok" };
function v1({ kind: e }) {
  const a = f1[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function b1({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${it(e)}` });
}
function p1({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${it(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${me.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${me.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: me.idle, children: i }),
    /* @__PURE__ */ t(b1, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const g1 = 8;
function y1(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > g1;
}
function N1({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${me.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const Fn = We(null);
function yC({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = g(!1), i = Bt(() => ({
    announce: e ?? r,
    setAnnounce: (c) => {
      l(c), a == null || a(c);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(Fn.Provider, { value: i, children: n });
}
function k1() {
  const e = je(Fn), [a, n] = g(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function NC({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = f(null), [i, c] = g(0), [s, u] = k1(), [d, h] = g(!1), v = e.at(-1);
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
    /* @__PURE__ */ t("ol", { className: me.list, ref: l, "aria-live": s ? "polite" : "off", "aria-label": r, onScroll: (y) => h(y1(y.currentTarget)), children: e.map((y, A) => /* @__PURE__ */ o("li", { className: `${me.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": A < i, children: [
      /* @__PURE__ */ t("span", { className: me.at, children: it(y.at) }),
      /* @__PURE__ */ t(v1, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: me.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${A}`)) }),
    /* @__PURE__ */ o(p1, { connection: a, idleSince: n, last: v, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${me.jump} ward-consannounce`, "aria-pressed": s, onClick: () => u(!s), children: "Read new events" }),
      /* @__PURE__ */ t(N1, { shown: d, onJump: b })
    ] })
  ] });
}
const $1 = "_row_11jhe_2", C1 = "_head_11jhe_14", S1 = "_author_11jhe_20", R1 = "_eta_11jhe_25", T1 = "_edited_11jhe_26", x1 = "_body_11jhe_32", L1 = "_reason_11jhe_37", A1 = "_actions_11jhe_42", ge = {
  row: $1,
  head: C1,
  author: S1,
  eta: R1,
  edited: T1,
  body: x1,
  reason: L1,
  actions: A1
}, E1 = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function I1(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function M1({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function q1({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: ge.reason, id: a, children: e })
  ] });
}
function B1(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function P1(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(M1, { ...e }) : /* @__PURE__ */ t(q1, { reason: e.unavailable, reasonId: e.unavailableId });
}
function kC(e) {
  const { comment: a } = e;
  B1(e);
  const n = k(), r = `${n}-unavailable`, l = E1[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${ge.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: ge.head, children: [
      /* @__PURE__ */ t("span", { className: ge.author, children: a.author }),
      /* @__PURE__ */ t(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: ge.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: ge.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: ge.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: ge.reason, id: n, children: I1(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: ge.actions, children: /* @__PURE__ */ t(P1, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const H1 = "_root_c46wj_2", F1 = "_attach_c46wj_11", D1 = "_actions_c46wj_17", O1 = "_reply_c46wj_23", j1 = "_replyRow_c46wj_28", W1 = "_sendsAs_c46wj_42", Je = {
  root: H1,
  attach: F1,
  actions: D1,
  reply: O1,
  replyRow: j1,
  sendsAs: W1
};
function z1({ placeholder: e, asUser: a, onPost: n }) {
  const [r, l] = g(""), i = k();
  return /* @__PURE__ */ o("div", { className: Je.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Je.replyRow, children: [
      /* @__PURE__ */ t(I, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ t(_, { variant: "ghost", describedBy: i, onClick: () => n(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ t("p", { id: i, className: Je.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function $C(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(z1, { ...e }) : /* @__PURE__ */ t(K1, { ...e });
}
function K1({ placeholder: e, asUser: a, attachTo: n, requeueAfter: r, onPost: l, onDraft: i }) {
  const [c, s] = g("");
  return /* @__PURE__ */ o("div", { className: Je.root, children: [
    /* @__PURE__ */ t(I, { kind: "textarea", label: e, value: c, onChange: s }),
    n && /* @__PURE__ */ o("div", { className: Je.attach, children: [
      /* @__PURE__ */ t(m, { role: "soft", label: n.label }),
      /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: n.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ t(
      jt,
      {
        label: `Requeue ${r.agent} after posting`,
        consequence: r.consequence,
        checked: r.checked,
        onChange: r.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Je.actions, children: [
      /* @__PURE__ */ t(_, { variant: "primary", onClick: () => l(a, c), children: `Post as ${a}` }),
      i && /* @__PURE__ */ t(_, { variant: "ghost", onClick: () => i(c), children: "Save draft" })
    ] })
  ] });
}
const G1 = "_list_1ih9e_2", U1 = "_item_1ih9e_6", V1 = "_body_1ih9e_22", X1 = "_text_1ih9e_28", Y1 = "_evidence_1ih9e_37", J1 = "_consequence_1ih9e_49", Q1 = "_note_1ih9e_54", Fe = {
  list: G1,
  item: U1,
  body: V1,
  text: X1,
  evidence: Y1,
  consequence: J1,
  note: Q1
};
function Z1({ criterion: e }) {
  return /* @__PURE__ */ t(Ee, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Et({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function ek(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function ak({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Fe.body, children: [
    /* @__PURE__ */ t("span", { className: Fe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ t(Et, { text: " · " }),
      /* @__PURE__ */ t("code", { className: Fe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ t(Et, { text: " · " }),
      /* @__PURE__ */ t("span", { className: Fe.consequence, children: ek(e.why) })
    ] })
  ] });
}
function tk({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Fe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(Z1, { criterion: e }),
    /* @__PURE__ */ t(ak, { criterion: e })
  ] });
}
function CC({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${Fe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(tk, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: Fe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const nk = "_list_dwhoz_2", rk = "_rung_dwhoz_6", lk = "_name_dwhoz_18", ok = "_actor_dwhoz_32", ha = {
  list: nk,
  rung: rk,
  name: lk,
  actor: ok
}, ik = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function ck({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = ik[e.state];
  return /* @__PURE__ */ o("li", { className: ha.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ha.name, children: e.name }),
    /* @__PURE__ */ t(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ha.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function SC({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ha.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(ck, { rung: a }, a.name)) });
}
const sk = "_sheet_1fqco_2", dk = "_title_1fqco_9", uk = "_stage_1fqco_15", hk = "_effects_1fqco_20", mk = "_effect_1fqco_20", wk = "_numeral_1fqco_31", _k = "_effectText_1fqco_38", fk = "_refusals_1fqco_43", vk = "_reasons_1fqco_52", bk = "_reason_1fqco_52", pk = "_actions_1fqco_62", ue = {
  sheet: sk,
  title: dk,
  stage: uk,
  effects: hk,
  effect: mk,
  numeral: wk,
  effectText: _k,
  refusals: fk,
  reasons: vk,
  reason: bk,
  actions: pk
};
function gk({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(_, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function RC({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: c }) {
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
      es,
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
      /* @__PURE__ */ t(gk, { refused: v, reasonId: u, note: d, onRequeue: l }),
      /* @__PURE__ */ t(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const yk = "_list_1hvqu_2", Nk = "_path_1hvqu_7", kk = "_head_1hvqu_21", $k = "_label_1hvqu_28", Ck = "_consequence_1hvqu_35", Sk = "_ask_1hvqu_36", Ye = {
  list: yk,
  path: Nk,
  head: kk,
  label: $k,
  consequence: Ck,
  ask: Sk
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
function Rk({ path: e, primary: a, onChoose: n }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ t(_, { variant: Mt(a), size: "sm", onClick: () => n(e.kind), children: za[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(_, { variant: Mt(a), size: "sm", disabled: !0, describedBy: r, children: za[e.kind] }),
    /* @__PURE__ */ t("span", { className: Ye.ask, id: r, children: e.askInstead })
  ] });
}
function Tk({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ye.path, "data-allowed": e.allowed, "data-role": It(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ye.head, children: [
      /* @__PURE__ */ t("span", { className: Ye.label, children: e.title ?? za[e.kind] }),
      /* @__PURE__ */ t(m, { role: It(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: Ye.consequence, children: e.consequence }),
    /* @__PURE__ */ t(Rk, { path: e, primary: a, onChoose: n })
  ] });
}
function TC({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: Ye.list, children: e.map((n, r) => /* @__PURE__ */ t(Tk, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const xk = "_list_1nyt1_2", Lk = "_item_1nyt1_6", Ak = "_node_1nyt1_18", Ek = "_body_1nyt1_24", Ik = "_head_1nyt1_30", Mk = "_stage_1nyt1_36", qk = "_version_1nyt1_41", Bk = "_sentence_1nyt1_49", Pk = "_meta_1nyt1_54", Ne = {
  list: xk,
  item: Lk,
  node: Ak,
  body: Ek,
  head: Ik,
  stage: Mk,
  version: qk,
  sentence: Bk,
  meta: Pk
}, Hk = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function Fk({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ne.head, children: [
    /* @__PURE__ */ t("span", { className: Ne.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: Ne.version, title: e.version, children: e.version }) : null
  ] });
}
function Dk({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ne.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${Ne.node} ward-history-node`, children: /* @__PURE__ */ t(Ee, { size: 9, kind: Hk[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ne.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(Fk, { entry: e }),
      /* @__PURE__ */ t("span", { className: Ne.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ne.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function xC({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${Ne.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(Dk, { entry: a }, a.stage + String(n))) });
}
const Ok = "_thread_1kn6s_3", jk = "_turn_1kn6s_8", Wk = "_who_1kn6s_27", zk = "_body_1kn6s_32", ma = {
  thread: Ok,
  turn: jk,
  who: Wk,
  body: zk
}, Dn = We(!1);
function LC({ children: e, density: a }) {
  return /* @__PURE__ */ t(Dn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${ma.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function AC({ turn: e }) {
  if (!je(Dn)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ma.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ma.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${ma.body} ward-chat-body`, children: e.body })
  ] });
}
const Kk = "_list_1rt9c_3", Gk = "_row_1rt9c_7", Uk = "_label_1rt9c_20", Vk = "_n_1rt9c_26", Xk = "_cause_1rt9c_33", ea = {
  list: Kk,
  row: Gk,
  label: Uk,
  n: Vk,
  cause: Xk
};
function Yk(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Jk = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function Qk({ row: e, formatNumber: a }) {
  return Yk(e), /* @__PURE__ */ o("li", { className: `${ea.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(Ee, { size: 8, ...Jk[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: ea.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${ea.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(Zk, { cause: e.cause })
  ] });
}
function Zk({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${ea.cause} ward-healthrow-cause`, children: e }) : null;
}
function EC({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ t("ul", { className: `${ea.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(Qk, { row: n, formatNumber: a }, n.label)) });
}
const e$ = "_root_1jxwp_2", a$ = {
  root: e$
};
function IC({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: a$.root, "data-density": l, children: [
    /* @__PURE__ */ t(Aa, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const t$ = "_row_dhbre_3", n$ = "_key_dhbre_13", r$ = "_stack_dhbre_24", l$ = "_value_dhbre_32", o$ = "_evidence_dhbre_39", i$ = "_mark_dhbre_47", Ve = {
  row: t$,
  key: n$,
  stack: r$,
  value: l$,
  evidence: o$,
  mark: i$
};
function c$({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(Qa, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function MC({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ve.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Ve.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ve.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Ve.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Ve.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Ve.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(c$, { state: e.state }) })
  ] });
}
const s$ = "_cell_1monp_2", d$ = {
  cell: s$
}, u$ = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function h$(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function m$(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function w$(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: h$(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function _$(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function qC({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  m$(e, n);
  const r = _$(e);
  return /* @__PURE__ */ t(
    ws,
    {
      label: "Rejection routing",
      columns: u$,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: d$.cell, "data-norerun": l.noRerun ? !0 : void 0, children: w$(l, i) }),
      empty: a ?? /* @__PURE__ */ t(au, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const f$ = "_row_aureb_2", v$ = "_title_aureb_12", b$ = "_turns_aureb_18", p$ = "_waiting_aureb_19", g$ = "_resolved_aureb_20", y$ = "_activity_aureb_21", N$ = "_cost_aureb_28", k$ = "_link_aureb_29", $$ = "_tableLink_aureb_47", C$ = "_tableRecord_aureb_48", S$ = "_tableRow_aureb_59", R$ = "_tableTitle_aureb_71", T$ = "_tableResolved_aureb_76", x$ = "_tableMeta_aureb_91", L$ = "_tableCost_aureb_98", A$ = "_tableActivity_aureb_99", E$ = "_tableState_aureb_109", F = {
  row: f$,
  title: v$,
  turns: b$,
  waiting: p$,
  resolved: g$,
  activity: y$,
  cost: N$,
  link: k$,
  tableLink: $$,
  tableRecord: C$,
  tableRow: S$,
  tableTitle: R$,
  tableResolved: T$,
  tableMeta: x$,
  tableCost: L$,
  tableActivity: A$,
  tableState: E$
}, On = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function I$(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function M$(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function q$(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const B$ = { duplicate: "Closed · duplicate" };
function P$({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(Ae, { className: F.tableMeta, text: `waiting on ${e}` });
}
function H$({ value: e }) {
  return /* @__PURE__ */ t("td", { className: F.tableCost, children: e === void 0 ? null : re(e) });
}
function F$({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${F.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function D$({ session: e, href: a }) {
  const n = On[e.state];
  return /* @__PURE__ */ o("tr", { className: F.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: F.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${F.tableLink} ward-target`, href: W(a), children: /* @__PURE__ */ t(Ae, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: F.tableMeta, children: M$(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: F.tableResolved, children: [
      q$(e.resolved),
      /* @__PURE__ */ t(P$, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(H$, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: F.tableActivity, children: I$(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: F.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(m, { role: n.role, label: B$[e.state] ?? n.label }),
      /* @__PURE__ */ t(F$, { link: e.link })
    ] }) })
  ] });
}
function O$({ session: e }) {
  const a = On[e.state];
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
function BC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(D$, { session: e.session, href: e.href }) : /* @__PURE__ */ t(O$, { session: e.session });
}
const j$ = "_block_1yy2v_3", W$ = "_list_1yy2v_9", z$ = "_line_1yy2v_14", Ka = {
  block: j$,
  list: W$,
  line: z$
}, K$ = { warn: "warning", ok: "ok" };
function G$({ kind: e }) {
  const a = K$[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function U$({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Ka.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(G$, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function PC({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${Ka.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: Ka.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(U$, { line: n }, `${r}-${n.text}`)) }) });
}
const V$ = "_band_tt7hp_1", X$ = "_head_tt7hp_8", Y$ = "_cell_tt7hp_19", J$ = "_index_tt7hp_35", Q$ = "_title_tt7hp_42", Z$ = "_note_tt7hp_48", e0 = "_cellTitle_tt7hp_53", a0 = "_cellBody_tt7hp_58", t0 = "_tag_tt7hp_64", pe = {
  band: V$,
  head: X$,
  cell: Y$,
  index: J$,
  title: Q$,
  note: Z$,
  cellTitle: e0,
  cellBody: a0,
  tag: t0
}, qt = 4;
function HC({ index: e, title: a, note: n, cells: r }) {
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
  $0 as ActionStack,
  NC as ActivityConsole,
  _w as AgentCard,
  _0 as AppShell,
  oC as AppearanceStrip,
  HC as Band,
  y0 as BarChart,
  Bu as BoardColumn,
  F0 as BoardFootnote,
  D0 as BoardHeader,
  A0 as BoardScroller,
  _ as Btn,
  u0 as CHIP_ROLES,
  Rn as CREDENTIAL_COLUMNS,
  g0 as Callout,
  iC as CapabilityRow,
  AC as ChatMessage,
  jt as Checkbox,
  m as Chip,
  Ae as ClampText,
  kC as ClarificationRow,
  Y0 as ClauseRuleRow,
  X0 as ClauseRules,
  on as ColourLadder,
  cC as ComponentRow,
  $C as Composer,
  j0 as ConfigRow,
  O0 as ConfigRowHead,
  Za as ConnectionMark,
  yC as ConsoleAnnounceProvider,
  LC as Conversation,
  es as CostMeter,
  dC as CredentialRow,
  sC as CredentialRowHead,
  CC as CriteriaList,
  Hl as Crumb,
  EC as DeliveryHealth,
  M0 as DeniedState,
  Q0 as DryRunRail,
  au as EmptyState,
  uC as EnvCard,
  I as Field,
  I0 as FilteredEmpty,
  x0 as FormStack,
  Aa as GateChecklist,
  SC as GateLadder,
  ws as Grid,
  eC as HandoffRuleRow,
  Z0 as HandoffRules,
  W0 as ItemDrawer,
  hC as KeyPanel,
  lr as LIVE_EVENT_TYPES,
  Pm as LegacyBoardColumn,
  K0 as LegacyBoardHeader,
  G0 as LegacyConfigRow,
  V0 as LegacyItemDrawer,
  Lm as LegacyOverCapNote,
  U0 as LegacyPreviewRail,
  nn as LegacyWorkCard,
  Ce as LiveIndicator,
  q0 as LoadFailed,
  H0 as Loading,
  In as MCP_SERVER_COLUMNS,
  Qa as Mark,
  wC as MarkUpload,
  Ee as Marker,
  fC as McpServerRow,
  _C as McpServerRowHead,
  aC as NewStreamModal,
  ru as OverCapNote,
  la as Overlay,
  J0 as PARTIAL_STEP_REASON,
  Mn as POLICY_CHIP_WIDTH,
  S0 as PageFrame,
  p0 as PageHeader,
  N0 as PlainList,
  vC as PolicyRow,
  z0 as PreviewRail,
  Ba as ROLE_MATRIX_COLUMNS,
  pn as RULE_ACTIONS,
  Jt as Radio,
  IC as ReadyChecklist,
  T0 as RecordSection,
  RC as RequeueSheet,
  TC as ResolveBlock,
  MC as ResolvedFieldRow,
  bC as RoleMatrixRow,
  qC as RoutingTable,
  tC as RuleRow,
  pC as RunbookSteps,
  rr as STREAM_STEPS,
  L0 as SectionBand,
  pt as SectionHeader,
  Xt as SegmentedControl,
  Gt as Select,
  BC as SessionRow,
  b0 as Sidebar,
  nC as StageColumn,
  E0 as StageGrid,
  xC as StageHistory,
  Jf as StageListEditor,
  B0 as StaleStrip,
  Ta as StatStrip,
  rC as StreamRow,
  R0 as SubjectRail,
  Oe as Switch,
  v0 as TabLinks,
  k0 as TableHead,
  f0 as Tabs,
  lC as ToolRow,
  C0 as TopBar,
  fd as Tree,
  en as TreeRow,
  PC as TypedInputBlock,
  al as UNSAFE_HREF,
  gC as ValidationList,
  o0 as VisibilityProvider,
  i0 as Visible,
  d0 as WARD_VERSION,
  La as WorkCard,
  P0 as WriteUnavailableStrip,
  I$ as agoSince,
  Yn as clock,
  wv as colourStatus,
  ae as count,
  se as duration,
  Ua as elapsed,
  s0 as eventSourceTransport,
  $a as isStreamStep,
  Ca as isValidatedStreamStep,
  Kw as ladderValidation,
  Py as mcpConnectionChip,
  qy as mcpToolName,
  re as money,
  we as ms,
  an as ordered,
  Pt as ratio,
  ng as restartLabel,
  W as safeHref,
  de as stamp,
  Dt as stream,
  m0 as streamChip,
  Ra as streamChipProps,
  ve as streamColour,
  ir as streamHex,
  h0 as streamVars,
  da as useBorderFlash,
  ar as useFocusTrap,
  w0 as useLiveFeed,
  c0 as useReturnFocus,
  ka as useRovingTabindex,
  Va as useTicker,
  Jn as useVisible,
  K as v,
  mC as validateMark,
  ra as validatedStep,
  Ft as validatedStreamSteps
};
