import { jsx as n, Fragment as T, jsxs as l } from "react/jsx-runtime";
import { useMemo as ut, useContext as ze, createContext as Ge, useCallback as U, useEffect as A, useState as g, useRef as N, useLayoutEffect as ht, useId as k, Fragment as mt } from "react";
import { createPortal as wt } from "react-dom";
function re(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const Ya = (e) => String(e).padStart(2, "0");
function Oa(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${Ya(a % 60)}s` : `${Math.floor(t / 60)}h ${Ya(t % 60)}m`;
}
const _t = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function le(e) {
  const a = _t.formatToParts(new Date(e)), t = (r) => {
    var o;
    return ((o = a.find((i) => i.type === r)) == null ? void 0 : o.value) ?? "";
  };
  return `${t("day")} ${t("month")} ${t("hour")}:${t("minute")}`;
}
function ee(e) {
  return e > 0 && e < 5e-3 ? "<$0.01" : e < 10 ? e.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : `$${Math.round(e).toLocaleString("en-US")}`;
}
function J(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function gn(e, a) {
  return `${e} / ${a}`;
}
const vt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function ft(e) {
  return vt.format(new Date(e));
}
const Nn = Ge(/* @__PURE__ */ new Set());
function Kk({ hidden: e, children: a }) {
  const t = ut(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Nn.Provider, { value: t, children: a });
}
function bt(e) {
  return !ze(Nn).has(e);
}
function Uk({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(T, { children: bt(e) ? a : t });
}
const pt = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function gt(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function Nt(e, a, t) {
  const r = t[0], o = t[t.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = gt(e, a, r, o);
  i && (e.preventDefault(), i.focus());
}
function yt(e) {
  return { onKeyDown: U(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(pt));
      Nt(t, e.current, r);
    },
    [e]
  ) };
}
function Vk(e, a = !0) {
  A(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [a, e]);
}
const Xa = { ArrowUp: -1, ArrowDown: 1 }, Ja = { ArrowLeft: -1, ArrowRight: 1 }, kt = (e, a, t) => Math.min(t, Math.max(a, e));
function $t(e, a) {
  if (a !== "horizontal" && e in Xa) return Xa[e];
  if (a !== "vertical" && e in Ja) return Ja[e];
}
function _a({ orientation: e = "both" } = {}) {
  const [a, t] = g(0), r = N(/* @__PURE__ */ new Map()), o = N(!1);
  ht(() => {
    var b;
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const h = d[0], _ = o.current;
    o.current = !1, t(h), _ && ((b = r.current.get(h)) == null || b.focus());
  });
  const i = U((d) => t(d), []), c = U((d) => {
    var h;
    t(d), (h = r.current.get(d)) == null || h.focus();
  }, []), s = U(
    (d) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const _ = Math.max(0, h.indexOf(a)), b = $t(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(h[kt(_ + b, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(h[0])) : d.key === "End" && (d.preventDefault(), c(h[h.length - 1]));
    },
    [a, c, e]
  ), u = U(
    (d) => ({
      tabIndex: d === a ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(d, h) : (r.current.delete(d), d === a && (o.current = !0));
      },
      onFocus: () => t(d),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: s }, itemProps: u, setActive: i };
}
const Yk = (e, a, t) => {
  const r = new EventSource(e), o = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, Xk = "0.2.0", Jk = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], Ct = [1, 2, 3, 4, 5, 6], St = [1, 2, 3], Rt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], j = {
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
    skeletonBar: "var(--ward-height-skeletonBar)"
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
}, he = {
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
function yn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function va(e) {
  return Ct.includes(e);
}
function fa(e) {
  return St.includes(e);
}
function Qk(e) {
  if (!va(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function Zk(e) {
  if (!va(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Tt = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Lt(e) {
  if (!va(e)) throw new Error("unvalidated stream step");
  return Tt[e];
}
function Qa(e) {
  return typeof e != "string" ? null : Rt.includes(e) ? e : null;
}
function Et(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function xt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function At(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function qt(e, a, t) {
  const r = Et(e);
  if (r === null) return null;
  const o = Qa(t) ?? Qa(r.type);
  return o === null ? null : { ...r, type: o, id: xt(r, a), at: At(r) };
}
function It(e, a) {
  return e >= he.staleAfter ? "stale" : e >= he.heartbeat && a === "live" ? "reconnecting" : null;
}
function Mt(e, a, t) {
  return e >= he.heartbeat && !a && t !== null;
}
function e1(e, a) {
  const [t, r] = g("reconnecting"), [o, i] = g(null), c = N(/* @__PURE__ */ new Map()), s = N(0), u = N(""), d = N(0), h = N(null), _ = N(0), b = N(0), x = N(!1), K = N("reconnecting"), Q = U(($) => {
    K.current = $, r($);
  }, []), oe = U(() => {
    s.current = Date.now();
  }, []), ye = U(($) => {
    for (const [F, we] of c.current)
      (we === "*" || $.itemKey === we) && F($);
  }, []), ie = U(() => {
    h.current = a(e, { lastEventId: u.current }, {
      onEvent: ($, F, we) => {
        const Te = qt($, F, we);
        Te !== null && (Te.id && (u.current = Te.id), oe(), x.current = !1, Q("live"), i(Te.at), ye(Te));
      },
      onOpen: () => {
        d.current = 0, x.current = !1, oe(), Q("live");
      },
      onError: () => {
        var F;
        (F = h.current) == null || F.close(), h.current = null, x.current = !0, K.current !== "stale" && Q("reconnecting");
        const $ = Math.min(he.reconnectBase * 2 ** d.current, he.reconnectMax);
        d.current += 1, _.current = window.setTimeout(ie, $);
      }
    });
  }, [ye, Q, oe, a, e]), Be = U(($) => {
    x.current = !0, $.close(), h.current = null, _.current = window.setTimeout(ie, he.reconnectBase);
  }, [ie]), Pe = U(($, F) => (c.current.set(F, $), () => {
    c.current.delete(F);
  }), []);
  return A(() => (ie(), b.current = window.setInterval(() => {
    const $ = Date.now() - s.current, F = It($, K.current);
    F && Q(F);
    const we = h.current;
    Mt($, x.current, we) && Be(we);
  }, he.tick), () => {
    var $;
    window.clearInterval(b.current), window.clearTimeout(_.current), x.current = !1, ($ = h.current) == null || $.close(), h.current = null;
  }), [ie, Be, Q]), { connection: t, lastEventAt: o, subscribe: Pe };
}
function Ha(e, a) {
  const t = new Date(e).getTime(), [r, o] = g(() => Date.now());
  return A(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && o(Date.now());
    };
    i();
    const c = window.setInterval(i, he.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(c), document.removeEventListener("visibilitychange", i);
    };
  }, [a, t]), Math.max(0, r - t);
}
function Bt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Za(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ta(e, a) {
  const t = N(0), r = U((o) => {
    const i = o ?? a, c = e.current;
    c !== null && i !== void 0 && (Bt() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => Za(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => Za(c), he.flash)));
  }, [a, e]);
  return A(() => () => window.clearTimeout(t.current), []), a === void 0 ? (o) => r(o) : () => r(a);
}
const Pt = "_root_1otpc_2", Dt = {
  root: Pt
};
function Ot(e, a, t, r, o) {
  const i = [Oa(a)];
  return e || i.push(`as of ${ft(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function Ne({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const o = t !== "stale", i = Ha(e, o), c = (a == null ? void 0 : a.at) ?? e, s = Ot(o, i, c, r, a);
  return /* @__PURE__ */ l("span", { className: `${Dt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      le(e)
    ] })
  ] });
}
const Ht = "_app_bcfqb_1", Ft = "_side_bcfqb_18", jt = "_main_bcfqb_26", Wt = "_rail_bcfqb_33", zt = "_page_bcfqb_40", Gt = "_root_bcfqb_91", Kt = "_topbar_bcfqb_98", Ut = "_mark_bcfqb_109", Vt = "_brand_bcfqb_116", Yt = "_tagline_bcfqb_122", Xt = "_identity_bcfqb_128", Jt = "_tools_bcfqb_129", Qt = "_metadata_bcfqb_138", Zt = "_actor_bcfqb_153", er = "_detail_bcfqb_154", ar = "_nav_bcfqb_159", nr = "_content_bcfqb_194", tr = "_skip_bcfqb_217", D = {
  app: Ht,
  side: Ft,
  main: jt,
  rail: Wt,
  page: zt,
  root: Gt,
  topbar: Kt,
  mark: Ut,
  brand: Vt,
  tagline: Yt,
  identity: Xt,
  tools: Jt,
  metadata: Qt,
  actor: Zt,
  detail: er,
  nav: ar,
  content: nr,
  skip: tr
};
function rr({ sidebar: e, header: a, children: t, rail: r }) {
  const o = r != null;
  return /* @__PURE__ */ l("div", { className: D.app, "data-rail": o ? "true" : "false", children: [
    /* @__PURE__ */ n("div", { className: D.side, children: e }),
    /* @__PURE__ */ l("main", { className: D.main, children: [
      a,
      /* @__PURE__ */ n("div", { className: D.page, children: t })
    ] }),
    o && /* @__PURE__ */ n("div", { className: D.rail, children: r })
  ] });
}
function lr({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: D.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: t.href, "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function ia({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function or({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ l("span", { className: D.metadata, children: [
    /* @__PURE__ */ n(ia, { value: e, className: D.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(ia, { value: a, className: D.detail })
  ] });
}
function ir(e) {
  return /* @__PURE__ */ l("header", { className: D.topbar, children: [
    /* @__PURE__ */ n("span", { className: D.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: D.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(ia, { value: e.tagline, className: D.tagline }),
    /* @__PURE__ */ n(lr, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: D.identity, children: /* @__PURE__ */ n(or, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(ia, { value: e.tools, className: D.tools })
  ] });
}
function cr(e) {
  const a = k();
  return /* @__PURE__ */ l("div", { className: `${D.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: D.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(ir, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: D.content, children: e.children })
  ] });
}
function sr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function a1(e) {
  return sr(e) ? /* @__PURE__ */ n(rr, { ...e }) : /* @__PURE__ */ n(cr, { ...e });
}
const dr = "_btn_llheq_2", ur = "_primary_llheq_13", hr = "_secondary_llheq_23", mr = "_ghost_llheq_28", wr = "_overflow_llheq_37", _r = "_sm_llheq_44", vr = "_disabled_llheq_48", Ze = {
  btn: dr,
  primary: ur,
  secondary: hr,
  ghost: mr,
  overflow: wr,
  sm: _r,
  disabled: vr
};
function fr(e, a, t, r) {
  const o = a === "sm" ? [Ze.sm, "ward-btn--sm"] : [], i = t ? [Ze.disabled] : [];
  return [Ze.btn, Ze[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function br(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function pr(e) {
  if (e.disabled && !e.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}
function gr(e) {
  return e.children ?? e.label;
}
function v(e) {
  pr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1;
  return /* @__PURE__ */ n(
    "button",
    {
      type: e.type ?? "button",
      className: fr(a, t, r, e.className),
      "data-ward-btn": a,
      "data-ward-size": t,
      disabled: r,
      "aria-describedby": e.describedBy,
      onClick: e.onClick,
      "aria-expanded": e.expanded,
      "aria-controls": e.controls,
      ...br(a, e.controls),
      children: gr(e)
    }
  );
}
function Fa(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Nr = "_root_o4yib_2", yr = "_row_o4yib_8", kr = "_box_o4yib_14", $r = "_label_o4yib_21", Cr = "_lockedNote_o4yib_26", Sr = "_consequence_o4yib_34", Rr = "_sample_o4yib_69", xe = {
  root: Nr,
  row: yr,
  box: kr,
  label: $r,
  lockedNote: Cr,
  consequence: Sr,
  sample: Rr
};
function Tr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Lr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${xe.consequence} ward-check-consequence`, children: a }) : null;
}
function Er({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${xe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function xr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: xe.sample, "aria-hidden": "true", children: e }) : null;
}
function kn(e) {
  const a = k(), t = e.consequence ? `${a}-note` : void 0, r = Tr(e);
  return /* @__PURE__ */ l("div", { className: `${xe.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ l("span", { className: xe.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${xe.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (o) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, o.target.checked));
          },
          "aria-describedby": Fa(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: a, className: xe.label, children: [
        e.label,
        /* @__PURE__ */ n(Er, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(xr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Lr, { id: t, text: e.consequence })
  ] });
}
const Ar = "_chip_1073r_2", qr = {
  chip: Ar
}, Ir = {
  gate: j.chip.gate,
  system: j.chip.system,
  write: j.chip.write,
  drift: j.chip.drift,
  done: j.chip.done,
  attention: j.chip.attention,
  failed: j.chip.failed,
  pending: j.chip.pending,
  running: j.chip.running,
  warn: j.chip.warn,
  meta: j.chip.meta,
  soft: j.chip.soft,
  quiet: j.chip.quiet
};
function Mr(e, a) {
  if (e === "stream") return Br(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = Ir[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function Br(e) {
  if (!e || !fa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = yn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${qr.chip} ward-chip ward-chip--${e}`, style: Mr(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
function ba(e) {
  return typeof e == "number" && fa(e) ? e : null;
}
function Se(e, a) {
  const t = ba(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function pa(e, a) {
  const t = ba(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const Pr = "_nav_1mnou_2", Dr = "_list_1mnou_8", Or = "_item_1mnou_15", Hr = "_link_1mnou_25", Fr = "_sep_1mnou_35", jr = "_current_1mnou_39", Wr = "_chips_1mnou_43", Le = {
  nav: Pr,
  list: Dr,
  item: Or,
  link: Hr,
  sep: Fr,
  current: jr,
  chips: Wr
};
function zr({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Le.nav, children: [
    /* @__PURE__ */ n("ol", { className: Le.list, children: e.map((t, r) => /* @__PURE__ */ l("li", { className: Le.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: Le.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: Le.link, href: t.href, children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Le.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Le.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const Gr = "_field_fy549_2", Kr = "_label_fy549_8", Ur = "_labelHidden_fy549_15", Vr = "_control_fy549_25", Yr = "_mono_fy549_44", Xr = "_area_fy549_49", Jr = "_invalid_fy549_56", Ce = {
  field: Gr,
  label: Kr,
  labelHidden: Ur,
  control: Vr,
  mono: Yr,
  area: Xr,
  invalid: Jr
}, Qr = { type: "password", autoComplete: "off", spellCheck: !1 };
function Zr({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? Qr : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function el({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function al({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const nl = { input: Zr, select: el, textarea: al };
function tl(e, a, t) {
  const r = nl[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function rl(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Fa(r ? t : void 0, e.describedBy),
    onChange: (o) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, o.target.value);
    }
  };
}
function ll(e) {
  const a = e.mono ? [Ce.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Ce.area] : [];
  return [Ce.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function ol(e) {
  return e ? `${Ce.label} ${Ce.labelHidden} ward-field-label` : `${Ce.label} ward-field-label`;
}
function E(e) {
  const a = k(), t = `${a}-msg`, r = rl(e, a, t), o = ll(e);
  return /* @__PURE__ */ l("div", { className: `${Ce.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: ol(e.labelHidden), htmlFor: a, children: e.label }),
    tl(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Ce.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const il = "_strip_jwrf5_2", cl = "_tab_jwrf5_12", sl = "_count_jwrf5_35", xa = {
  strip: il,
  tab: cl,
  count: sl
}, en = 7;
function dl(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function ul(e) {
  return `${xa.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function n1({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: o = 1 }) {
  if (e.length > en) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${en} — the set is fixed`);
  const i = _a({ orientation: "horizontal" }), c = dl(e, a);
  return A(() => i.setActive(c), [i.setActive, c]), /* @__PURE__ */ n(
    "div",
    {
      className: ul(o),
      role: "tablist",
      "aria-label": r,
      "data-level": o,
      ...i.containerProps,
      children: e.map((s, u) => /* @__PURE__ */ l(
        "button",
        {
          id: `tab-${s.id}`,
          type: "button",
          role: "tab",
          className: `${xa.tab} ward-tab`,
          "aria-selected": s.id === a,
          "aria-controls": `panel-${s.id}`,
          onClick: () => t(s.id),
          ...i.itemProps(u),
          children: [
            s.label,
            s.count === void 0 ? null : /* @__PURE__ */ l(T, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: xa.count, children: `· ${s.count}` })
            ] })
          ]
        },
        s.id
      ))
    }
  );
}
const hl = "_root_jem6y_2", ml = "_segment_jem6y_7", an = {
  root: hl,
  segment: ml
};
function $n({ options: e, value: a, onChange: t, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = _a({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((u) => u.value === a));
  return A(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ n("div", { className: `${an.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: an.segment,
      "aria-checked": u.value === a,
      disabled: o,
      "aria-describedby": i,
      onClick: () => t(u.value),
      ...c.itemProps(d),
      children: u.label
    },
    u.value
  )) });
}
const wl = "_sidebar_1jywv_3", _l = "_brand_1jywv_9", vl = "_mark_1jywv_17", fl = "_word_1jywv_24", bl = "_nav_1jywv_30", pl = "_navItem_1jywv_38", gl = "_group_1jywv_50", Nl = "_groupName_1jywv_57", yl = "_agents_1jywv_70", kl = "_agent_1jywv_70", $l = "_agentTop_1jywv_88", Cl = "_dot_1jywv_95", Sl = "_agentName_1jywv_107", Rl = "_agentMeta_1jywv_120", Tl = "_foot_1jywv_126", Ll = "_footName_1jywv_132", El = "_footLinks_1jywv_139", xl = "_footLink_1jywv_139", Al = "_root_1jywv_153", ql = "_linkBrand_1jywv_162", Il = "_label_1jywv_183", Ml = "_note_1jywv_188", Bl = "_footer_1jywv_202", C = {
  sidebar: wl,
  brand: _l,
  mark: vl,
  word: fl,
  nav: bl,
  navItem: pl,
  group: gl,
  groupName: Nl,
  new: "_new_1jywv_64",
  agents: yl,
  agent: kl,
  agentTop: $l,
  dot: Cl,
  agentName: Sl,
  agentMeta: Rl,
  foot: Tl,
  footName: Ll,
  footLinks: El,
  footLink: xl,
  root: Al,
  linkBrand: ql,
  label: Il,
  note: Ml,
  footer: Bl
};
function Pl({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ l(
    "a",
    {
      className: C.agent,
      href: e.href,
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ l("span", { className: C.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: C.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": yn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: C.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: C.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Dl({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: a.href, children: a.label }, a.href)) })
  ] }) : null;
}
function Ol({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: o, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ l("nav", { className: C.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ l("div", { className: C.brand, children: [
      /* @__PURE__ */ n("span", { className: C.mark }),
      /* @__PURE__ */ n("span", { className: C.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: C.nav, children: a.map((c) => /* @__PURE__ */ n("a", { className: C.navItem, href: c.href, "aria-current": c.current === !0 ? "page" : void 0, children: c.label }, c.href)) }),
    /* @__PURE__ */ l("div", { className: C.group, children: [
      /* @__PURE__ */ l("span", { className: C.groupName, children: [
        t,
        " · ",
        J(r.length)
      ] }),
      o && /* @__PURE__ */ n("a", { className: C.new, href: o.href, children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(Pl, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(Dl, { shared: i })
  ] });
}
function Hl(e) {
  return e.destinations ?? e.items ?? [];
}
function Fl({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function jl({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function Wl({ link: e, active: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function zl(e) {
  return /* @__PURE__ */ l("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Fl, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Hl(e).map((a) => /* @__PURE__ */ n(Wl, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(jl, { children: e.children })
  ] });
}
function Gl(e) {
  return "agents" in e;
}
function t1(e) {
  return Gl(e) ? /* @__PURE__ */ n(Ol, { ...e }) : /* @__PURE__ */ n(zl, { ...e });
}
const Kl = "_mark_wlgi8_3", Ul = {
  mark: Kl
}, Vl = { met: "✓", unmet: "", failed: "✕" };
function ja({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Ul.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Vl[e]
    }
  );
}
const Yl = "_marker_br9fi_2", Xl = {
  marker: Yl
}, Jl = {
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
  attention: "var(--ward-color-amber)",
  tick: "var(--ward-color-green)",
  box: "var(--ward-color-line2)"
};
function Re({ size: e, kind: a, label: t }) {
  const r = { "--marker": Jl[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Xl.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Ql = "_root_ti0pq_2", Zl = "_chip_ti0pq_11", eo = "_noCase_ti0pq_23", ea = {
  root: Ql,
  chip: Zl,
  noCase: eo
};
function ao(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Wa({ connection: e, since: a, lastEventAt: t }) {
  const r = ao(a, t), o = Ha(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${ea.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Re, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${ea.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: ea.noCase, children: Oa(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${ea.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    le(r)
  ] });
}
const no = "_root_11rs7_2", to = "_context_11rs7_12", ro = "_row_11rs7_1", lo = "_heading_11rs7_25", oo = "_headingWrap_11rs7_33", io = "_chips_11rs7_38", co = "_title_11rs7_45", so = "_consequence_11rs7_54", uo = "_actionsWrap_11rs7_59", ho = "_actions_11rs7_59", mo = "_action_11rs7_59", wo = "_overflowPanel_11rs7_78", _o = "_measure_11rs7_88", ae = {
  root: no,
  context: to,
  row: ro,
  heading: lo,
  headingWrap: oo,
  chips: io,
  title: co,
  consequence: so,
  actionsWrap: uo,
  actions: ho,
  action: mo,
  overflowPanel: wo,
  measure: _o
};
function vo({ title: e, consequence: a }) {
  return /* @__PURE__ */ l("div", { className: ae.heading, children: [
    /* @__PURE__ */ n("h1", { className: ae.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: ae.consequence, children: a })
  ] });
}
function Aa({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: ae.action, "data-action": "", children: a }, t));
}
function nn({ disclosure: e }) {
  return /* @__PURE__ */ n(v, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function fo({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: o }) {
  return t ? r ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(nn, { disclosure: o }) : a ? [/* @__PURE__ */ n(nn, { disclosure: o }, "more"), /* @__PURE__ */ n(Aa, { actions: e }, "actions")] : /* @__PURE__ */ n(Aa, { actions: e });
}
function bo(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function po({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: ae.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Aa, { actions: e }) });
}
function go(e, a) {
  const t = k(), [r, o] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => o(!i) }, close: () => {
    var u, d;
    o(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function No({ crumb: e, chips: a }) {
  return /* @__PURE__ */ l("div", { className: ae.context, children: [
    /* @__PURE__ */ n(zr, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: ae.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function yo(...e) {
  return e.some((a) => a === null);
}
function ko(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function $o(e, a, t, r, o) {
  if (o === 0 || yo(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = ko(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function Co(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function So(e) {
  const a = N(null), t = N(null), r = N(null), o = N(null), [i, c] = g(!1);
  return A(() => {
    const s = a.current;
    if (!Co(s)) return;
    const u = () => c($o(s, t.current, r.current, o.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: o, collapsed: i };
}
function Ro({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ l("div", { className: ae.measure, ref: t, "aria-hidden": "true", children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(v, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] });
}
function To({ connection: e }) {
  return e ? /* @__PURE__ */ n(Wa, { connection: e.connection, since: e.since }) : null;
}
function r1({ crumb: e, chips: a, title: t, consequence: r, actions: o = [], more: i = [], connection: c, onOverflow: s, density: u = "page" }) {
  const { rowRef: d, headingRef: h, actionsRef: _, measureRef: b, collapsed: x } = So(o), K = i.length > 0, { disclosure: Q, close: oe } = go(x || K, _), ye = bo(i, o, x, s);
  return /* @__PURE__ */ l("header", { className: ae.root, "data-density": u, children: [
    /* @__PURE__ */ n(No, { crumb: e, chips: a }),
    /* @__PURE__ */ l("div", { className: ae.row, ref: d, children: [
      /* @__PURE__ */ n("div", { ref: h, className: ae.headingWrap, children: /* @__PURE__ */ n(vo, { title: t, consequence: r }) }),
      /* @__PURE__ */ l("div", { className: ae.actionsWrap, children: [
        /* @__PURE__ */ n(To, { connection: c }),
        /* @__PURE__ */ n("div", { className: ae.actions, ref: _, "data-ward-actions": !0, children: /* @__PURE__ */ n(fo, { actions: o, hasMore: K, collapsed: x, onOverflow: s, disclosure: Q }) })
      ] })
    ] }),
    /* @__PURE__ */ n(po, { actions: ye, disclosure: Q, onEscape: oe }),
    /* @__PURE__ */ n(Ro, { actions: o, hasMore: K, measureRef: b })
  ] });
}
function Cn(e) {
  const [a, t] = g(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return A(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const o = (c) => t(c.matches);
    return r.addEventListener("change", o), t(r.matches), () => r.removeEventListener("change", o);
  }, [e]), a;
}
const Lo = "_scrim_c7sqj_2", Eo = "_drawer_c7sqj_10", xo = "_sheet_c7sqj_14", Ao = "_modal_c7sqj_18", qo = "_panel_c7sqj_23", Io = "_header_c7sqj_51", Mo = "_title_c7sqj_59", Bo = "_body_c7sqj_63", Po = "_close_c7sqj_90", ge = {
  scrim: Lo,
  drawer: Eo,
  sheet: xo,
  modal: Ao,
  panel: qo,
  header: Io,
  title: Mo,
  body: Bo,
  close: Po
}, Do = Ge(null), ca = [], sa = /* @__PURE__ */ new Map();
function Oo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Ho(e, a) {
  let t = sa.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, sa.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Fo(e, a) {
  for (const t of Array.from(a.children))
    Oo(t) || Ho(e, t);
}
function jo(e) {
  for (const a of e.claims) {
    const t = sa.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), sa.delete(a)));
  }
}
function Wo(e, a) {
  const t = { root: e, claims: [] };
  return ca.push(t), Fo(t, a), t;
}
function zo(e) {
  const a = ca.indexOf(e);
  a >= 0 && ca.splice(a, 1), jo(e);
}
function tn(e) {
  return e !== null && ca.at(-1) === e;
}
function Go(e, a, t) {
  const r = N(null), o = N(t);
  return o.current = t, A(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = Wo(i, a);
    return r.current = s, () => {
      var d, h;
      const u = tn(s);
      zo(s), r.current = null, u && ((h = (d = o.current ?? c) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), U(() => tn(r.current), []);
}
function Ko(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Uo(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Vo({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${ge.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("header", { className: `${ge.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${ge.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${ge.body} ward-drawer-body`, children: e.children })
  ] });
}
function Yo(e) {
  return `${ge.scrim} ${ge[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Xo(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ge.panel} ${ge[e]} ward-overlay-panel${t}${r}`;
}
function Jo(e) {
  const a = ze(Do);
  return e ?? a ?? document.body;
}
function Qe(e) {
  const a = N(null), t = N(null), r = k(), o = Jo(e.container), i = Cn("(min-width: 768px)"), c = Ko(e.kind, i), s = Uo(e, r), u = yt(t), d = Go(a, o, e.returnFocusTo), h = U(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return A(() => {
    var _, b;
    d() && ((b = (_ = t.current) == null ? void 0 : _.querySelector("button")) == null || b.focus());
  }, [d]), A(() => {
    const _ = (b) => {
      b.key === "Escape" && h();
    };
    return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, [h]), wt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Yo(c),
        "data-ward-overlay-kind": c,
        "data-ward-overlay-root": "",
        onClick: h,
        children: /* @__PURE__ */ l(
          "div",
          {
            ref: t,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": s.labelledBy,
            "aria-label": s.label,
            className: Xo(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => d() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${ge.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Vo, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Qo = "_root_drrhx_2", Zo = "_ticket_drrhx_15", ei = "_body_drrhx_24", $a = {
  root: Qo,
  ticket: Zo,
  body: ei
};
function l1({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ l("aside", { className: `${$a.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${$a.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: $a.body, children: t })
  ] });
}
const ai = "_root_bf1pc_2", ni = "_table_bf1pc_9", ti = "_caption_bf1pc_14", ri = "_series_bf1pc_23", li = "_category_bf1pc_31", oi = "_cell_bf1pc_39", ii = "_track_bf1pc_45", ci = "_lane_bf1pc_52", si = "_bar_bf1pc_56", di = "_value_bf1pc_63", ui = "_swatch_bf1pc_70", hi = "_empty_bf1pc_78", z = {
  root: ai,
  table: ni,
  caption: ti,
  series: ri,
  category: li,
  cell: oi,
  track: ii,
  lane: ci,
  bar: si,
  value: di,
  swatch: ui,
  empty: hi
}, mi = "—", rn = 6;
function wi(e, a) {
  if (a.length < 1 || a.length > rn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${rn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function _i(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function Sn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function vi(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function fi({ value: e, top: a, step: t, format: r }) {
  const o = vi(e, a), i = { "--share": `${o}%` };
  return /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ l("span", { className: z.track, children: [
    /* @__PURE__ */ n("span", { className: z.lane, children: o > 0 ? /* @__PURE__ */ n("span", { className: `${z.bar} ward-barchart-bar`, "data-step": t, style: i, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: z.value, children: e === null ? mi : r(e) })
  ] }) });
}
function bi({ series: e }) {
  return /* @__PURE__ */ n(T, { children: e.map((a, t) => /* @__PURE__ */ l("th", { scope: "col", className: z.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: z.swatch, "data-step": Sn(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function o1({ title: e, categories: a, series: t, format: r = J, categoryHead: o = "Category", empty: i = "Nothing to chart yet." }) {
  wi(a, t);
  const c = _i(t);
  return c === 0 ? /* @__PURE__ */ l("section", { className: `${z.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: z.caption, children: e }),
    /* @__PURE__ */ n("p", { className: z.empty, children: i })
  ] }) : /* @__PURE__ */ n("div", { className: `${z.root} ward-barchart`, children: /* @__PURE__ */ l("table", { className: z.table, children: [
    /* @__PURE__ */ n("caption", { className: z.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: z.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: o }) }),
      /* @__PURE__ */ n(bi, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((s, u) => /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: z.category, children: s }),
      t.map((d, h) => /* @__PURE__ */ n(fi, { value: d.values[u], top: c, step: Sn(h, t.length), format: r }, d.name))
    ] }, s)) })
  ] }) });
}
const pi = "_root_1bfqw_2", gi = "_figure_1bfqw_7", Ni = "_of_1bfqw_13", yi = "_bar_1bfqw_18", ki = "_rows_1bfqw_38", $i = "_row_1bfqw_38", Ci = "_label_1bfqw_49", Si = "_amount_1bfqw_54", ke = {
  root: pi,
  figure: gi,
  of: Ni,
  bar: yi,
  rows: ki,
  row: $i,
  label: Ci,
  amount: Si
};
function Ri({ spent: e, ceiling: a, breakdown: t }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ l("div", { className: `${ke.root} ward-costmeter`, children: [
    /* @__PURE__ */ l("p", { className: `${ke.figure} ward-stat-value`, children: [
      ee(e),
      " ",
      /* @__PURE__ */ l("span", { className: ke.of, children: [
        "of ",
        ee(a)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${ke.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${ee(e)} of ${ee(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    t && /* @__PURE__ */ n("ul", { className: ke.rows, children: t.map((o) => /* @__PURE__ */ l("li", { className: `${ke.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: ke.label, children: o.label }),
      /* @__PURE__ */ n("span", { className: ke.amount, children: ee(o.amount) })
    ] }, o.label)) })
  ] });
}
const Ti = "_frame_mg2jl_2", Li = "_table_mg2jl_6", Ei = "_th_mg2jl_12", xi = "_td_mg2jl_13", Ai = "_sort_mg2jl_47", qi = "_row_mg2jl_53", Ii = "_empty_mg2jl_61", $e = {
  frame: Ti,
  table: Li,
  th: Ei,
  td: xi,
  sort: Ai,
  row: qi,
  empty: Ii
}, Mi = { asc: "ascending", desc: "descending" };
function Bi(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return Mi[a.direction];
}
function Pi(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: $e.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Di(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Oi({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: $e.th,
      style: Di(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Bi(e, a),
      children: Pi(e, t)
    }
  );
}
function Hi({ row: e, props: a }) {
  const t = a.rowId(e), r = (a.lockedIds ?? []).includes(t);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: $e.row,
      "data-selected": t === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((o) => /* @__PURE__ */ n("td", { className: $e.td, "data-align": o.align, "data-mono": o.mono, "data-drop": o.dropPriority, children: a.renderCell(e, o.key) }, o.key))
    }
  );
}
function Fi({
  label: e,
  columns: a,
  rows: t,
  rowId: r,
  renderCell: o,
  selectedId: i,
  lockedIds: c = [],
  sort: s,
  onSort: u,
  empty: d
}) {
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: $e.empty, children: d }) : /* @__PURE__ */ n("div", { className: $e.frame, children: /* @__PURE__ */ l("table", { className: $e.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: $e.head, children: a.map((h) => /* @__PURE__ */ n(Oi, { column: h, sort: s, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(Hi, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: o, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const ji = "_set_y5zy3_2", Wi = "_legend_y5zy3_7", zi = "_row_y5zy3_15", Gi = "_control_y5zy3_20", Ki = "_input_y5zy3_26", Ui = "_label_y5zy3_31", Vi = "_consequence_y5zy3_36", Ee = {
  set: ji,
  legend: Wi,
  row: zi,
  control: Gi,
  input: Ki,
  label: Ui,
  consequence: Vi
};
function Rn({ legend: e, options: a, value: t, onChange: r, disabled: o, name: i, describedBy: c, variant: s }) {
  const u = k(), d = i ?? u;
  return /* @__PURE__ */ l("fieldset", { className: Ee.set, "data-variant": s, children: [
    /* @__PURE__ */ n("legend", { className: Ee.legend, children: e }),
    a.map((h) => {
      const _ = `${d}-${h.value}`, b = h.consequence ? `${_}-note` : void 0;
      return /* @__PURE__ */ l("div", { className: Ee.row, children: [
        /* @__PURE__ */ l("span", { className: Ee.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: _,
              type: "radio",
              name: d,
              className: Ee.input,
              value: h.value,
              checked: t === h.value,
              disabled: o,
              "aria-describedby": Fa(b, c),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: _, className: Ee.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: b, className: `${Ee.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Yi = "_root_1h1ot_2", Xi = "_head_1h1ot_11", Ji = "_index_1h1ot_25", Qi = "_dot_1h1ot_29", Zi = "_note_1h1ot_34", ec = "_counter_1h1ot_40", ac = "_trailing_1h1ot_48", Ae = {
  root: Yi,
  head: Xi,
  index: Ji,
  dot: Qi,
  note: Zi,
  counter: ec,
  trailing: ac
};
function nc({ index: e }) {
  return e ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("span", { className: `${Ae.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ae.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function tc({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ae.counter, "aria-hidden": "true", children: e }) : null;
}
function rc({ title: e, index: a, note: t, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Ae.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Ae.head, children: [
      /* @__PURE__ */ n(nc, { index: a }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Ae.note, children: t }),
    /* @__PURE__ */ n(tc, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ae.trailing, children: i })
  ] });
}
const lc = "_strip_70eyc_2", oc = "_cell_70eyc_7", ic = "_value_70eyc_12", cc = "_link_70eyc_27", sc = "_label_70eyc_39", Ue = {
  strip: lc,
  cell: oc,
  value: ic,
  link: cc,
  label: sc
};
function dc(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function uc({ cell: e }) {
  return e.href === void 0 ? /* @__PURE__ */ n(T, { children: e.value }) : /* @__PURE__ */ n("a", { className: `${Ue.link} ward-stat-link`, href: e.href, "aria-label": `${e.label}: ${e.value}`, children: e.value });
}
function ga({ cells: e, divided: a = !1 }) {
  return dc(e), /* @__PURE__ */ n("dl", { className: `${Ue.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ l("div", { className: Ue.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Ue.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: /* @__PURE__ */ n(uc, { cell: t }) }),
    /* @__PURE__ */ n("dt", { className: `${Ue.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const hc = "_root_xk7sv_2", mc = "_track_xk7sv_8", wc = "_thumb_xk7sv_35", _c = "_labelHidden_xk7sv_53", vc = "_label_xk7sv_53", fc = "_lockedNote_xk7sv_68", qe = {
  root: hc,
  track: mc,
  thumb: wc,
  labelHidden: _c,
  label: vc,
  lockedNote: fc
};
function bc(e) {
  return e ? `${qe.label} ${qe.labelHidden}` : qe.label;
}
function Me({ label: e, checked: a, onChange: t, disabled: r, locked: o, describedBy: i, labelHidden: c }) {
  const s = k(), u = o ? !0 : a, d = r || o;
  return /* @__PURE__ */ l("span", { className: `${qe.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": u,
        "aria-label": e,
        "aria-labelledby": s,
        "aria-describedby": i,
        className: `${qe.track} ward-switch`,
        "data-on": u,
        "data-locked": o ? !0 : void 0,
        disabled: d,
        onClick: () => !d && (t == null ? void 0 : t(!u)),
        children: /* @__PURE__ */ n("span", { className: qe.thumb })
      }
    ),
    /* @__PURE__ */ l("span", { id: s, className: bc(c), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: qe.lockedNote, children: "always on" })
    ] })
  ] });
}
const pc = "_bar_1u2kl_2", gc = "_skip_1u2kl_11", Nc = "_mark_1u2kl_22", yc = "_nav_1u2kl_30", kc = "_list_1u2kl_34", $c = "_select_1u2kl_40", Cc = "_dest_1u2kl_47", Sc = "_actor_1u2kl_61", Rc = "_actorMark_1u2kl_74", Tc = "_actorLabel_1u2kl_79", Lc = "_tagline_1u2kl_98", ce = {
  bar: pc,
  skip: gc,
  mark: Nc,
  nav: yc,
  list: kc,
  select: $c,
  dest: Cc,
  actor: Sc,
  actorMark: Rc,
  actorLabel: Tc,
  tagline: Lc
};
function Ec(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function xc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function i1({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: o, onNavigate: i, skipTo: c = "main" }) {
  const s = xc(r);
  return /* @__PURE__ */ l("header", { className: ce.bar, children: [
    /* @__PURE__ */ n("a", { className: ce.skip, href: `#${c}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: ce.mark, children: e }),
    o && /* @__PURE__ */ n("span", { className: ce.tagline, children: o }),
    /* @__PURE__ */ l("nav", { className: ce.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: ce.list, children: a.map((u) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: ce.dest,
          href: u.href,
          "aria-current": u.id === t ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ n(
        "select",
        {
          className: ce.select,
          "aria-label": "Destination",
          value: t,
          onChange: (u) => i == null ? void 0 : i(u.target.value),
          children: a.map((u) => /* @__PURE__ */ n("option", { value: u.id, children: u.label }, u.id))
        }
      )
    ] }),
    s && /* @__PURE__ */ l("span", { className: ce.actor, children: [
      /* @__PURE__ */ n("span", { className: ce.actorLabel, children: s }),
      /* @__PURE__ */ n("span", { className: ce.actorMark, "aria-hidden": "true", children: Ec(s) })
    ] })
  ] });
}
const Ac = "_tree_1lyby_2", qc = "_item_1lyby_6", Ic = "_row_1lyby_10", Mc = "_button_1lyby_22", da = {
  tree: Ac,
  item: qc,
  row: Ic,
  button: Mc
}, Tn = Ge(null);
function Bc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = _a({ orientation: "vertical" });
  return /* @__PURE__ */ n(Tn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: da.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const Pc = { ArrowRight: !0, ArrowLeft: !1 };
function ln(e) {
  return e ? !0 : void 0;
}
function Dc(e, a) {
  const t = Pc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function Oc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function Hc(e) {
  const a = [da.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Fc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function jc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Wc(e) {
  return typeof e == "string" ? e : void 0;
}
function zc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Gc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function Ln(e) {
  const a = ze(Tn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = Fc(e);
  return /* @__PURE__ */ l("li", { className: da.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Hc(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": ln(e.unresolved),
        "data-inherited": ln(e.inherited),
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${da.button} ward-treeitem-btn`,
            onClick: () => Oc(e),
            onKeyDown: (r) => Dc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: jc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Wc(e.label), children: e.label }),
              /* @__PURE__ */ n(zc, { value: e.detail }),
              /* @__PURE__ */ n(Gc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Kc = "_frame_fdzvs_2", Uc = "_subjectRail_fdzvs_21", Vc = "_subject_fdzvs_21", Yc = "_rail_fdzvs_41", Xc = "_record_fdzvs_63", Jc = "_recordBody_fdzvs_68", Qc = "_band_fdzvs_111", Zc = "_bandBody_fdzvs_120", es = "_bandActions_fdzvs_125", as = "_scroller_fdzvs_133", ns = "_lanes_fdzvs_151", ue = {
  frame: Kc,
  subjectRail: Uc,
  subject: Vc,
  rail: Yc,
  record: Xc,
  recordBody: Jc,
  band: Qc,
  bandBody: Zc,
  bandActions: es,
  scroller: as,
  lanes: ns
};
function c1({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: ue.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function on(e) {
  return e ? "true" : void 0;
}
function s1({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: ue.subjectRail, "data-ward-subject-rail": t, "data-ruled": on(i), children: [
    /* @__PURE__ */ n("div", { className: ue.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ue.rail, "data-sticky": on(o), "aria-label": r, children: a })
  ] });
}
function d1({ title: e, children: a, note: t, trailing: r, pad: o = "block", label: i }) {
  return /* @__PURE__ */ l("section", { className: ue.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(rc, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: ue.recordBody, "data-pad": o, children: a })
  ] });
}
const ts = "_form_1j8ub_2", rs = "_fields_1j8ub_9", ls = "_actions_1j8ub_19", Ca = {
  form: ts,
  fields: rs,
  actions: ls
};
function u1({ label: e, children: a, actions: t, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: Ca.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ca.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ca.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function h1({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ l("section", { className: ue.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ue.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: ue.bandActions, children: a })
  ] });
}
const os = "(max-width: 767.98px)";
function qa({ label: e, children: a, laneCount: t }) {
  const r = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { className: ue.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: r, children: a });
}
function is({ lanes: e, label: a, laneLabel: t }) {
  const [r, o] = g(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ l("div", { className: ue.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(E, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: o }),
    /* @__PURE__ */ n(qa, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function m1({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const o = Cn(os);
  return t === void 0 ? /* @__PURE__ */ n(qa, { label: a, children: e }) : o ? /* @__PURE__ */ n(is, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(qa, { label: a, laneCount: t.length, children: t.map((i) => /* @__PURE__ */ n(mt, { children: i.content }, i.id)) });
}
const cs = "_block_1o5o7_2", ss = "_sentence_1o5o7_15", ds = "_meta_1o5o7_20", us = "_action_1o5o7_25", hs = "_strip_1o5o7_29", ms = "_loading_1o5o7_48", ws = "_label_1o5o7_56", _s = "_counter_1o5o7_63", me = {
  block: cs,
  sentence: ss,
  meta: ds,
  action: us,
  strip: hs,
  loading: ms,
  label: ws,
  counter: _s
};
function vs({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: me.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function Na({ sentence: e, action: a, children: t, role: r = "status", tone: o }) {
  return /* @__PURE__ */ l("div", { className: `${me.block} ward-state`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ n("p", { className: me.sentence, children: e }),
    t,
    /* @__PURE__ */ n(vs, { action: a })
  ] });
}
function fs(e) {
  return /* @__PURE__ */ n(Na, { ...e });
}
function w1({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(Na, { sentence: e, action: t, children: /* @__PURE__ */ l("p", { className: me.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function _1(e) {
  return /* @__PURE__ */ n(Na, { ...e });
}
function v1({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(Na, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ l("p", { className: me.meta, children: [
    "failed at ",
    le(a)
  ] }) });
}
function f1({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ l("div", { className: me.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    le(e),
    ". Showing snapshot from ",
    le(a)
  ] });
}
function b1({ queued: e, since: a }) {
  return /* @__PURE__ */ l("div", { className: me.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    le(a)
  ] });
}
function p1({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = g(!1);
  A(() => {
    const c = window.setTimeout(() => o(!0), he.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = Ha(t.current, r);
  return /* @__PURE__ */ l("div", { className: `${me.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: me.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: me.counter, children: Oa(i) }) : null
  ] });
}
const bs = "_note_tlubt_2", ps = {
  note: bs
};
function gs({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ l("p", { className: ps.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const Ns = "_card_12in3_2", ys = "_hit_12in3_23", ks = "_head_12in3_30", $s = "_title_12in3_36", Cs = "_meta_12in3_44", Ss = "_fields_12in3_45", Rs = "_who_12in3_58", Ts = "_sep_12in3_65", Ls = "_mono_12in3_69", Es = "_field_12in3_45", xs = "_last_12in3_84", As = "_reason_12in3_96", V = {
  card: Ns,
  hit: ys,
  head: ks,
  title: $s,
  meta: Cs,
  fields: Ss,
  who: Rs,
  sep: Ts,
  mono: Ls,
  field: Es,
  last: xs,
  reason: As
}, qs = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Is(e, a, t) {
  const r = ta(e, "blue"), o = ta(e, "orange"), i = ta(e, "green"), c = N(/* @__PURE__ */ new Set());
  A(() => {
    if (!t) return;
    const s = { blue: r, orange: o, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = qs[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, o]);
}
const Ms = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ee(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Bs(e, a) {
  return Ms[a](e);
}
function Ps({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: V.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ l("p", { className: V.meta, children: [
    /* @__PURE__ */ l("span", { className: V.who, children: [
      "waits on ",
      e.run.agent
    ] }),
    t,
    /* @__PURE__ */ n(Ne, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ l("p", { className: V.meta, children: [
    /* @__PURE__ */ l("span", { className: V.who, children: [
      "waits on ",
      e.waitsOn
    ] }),
    t,
    /* @__PURE__ */ l("span", { className: V.mono, children: [
      re(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Ds({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: V.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Os({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: V.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Hs({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: V.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: V.field, children: Bs(e, t) }, t)) });
}
const Ia = (e) => e ? !0 : void 0;
function Fs(e) {
  return { "--stream": Se(e.streamStep, "id") };
}
function js(e, a, t) {
  e == null || e(a, t);
}
function Ws(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function zs({ item: e, stale: a }) {
  var r, o;
  const t = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: V.last, "data-stale": Ia(a), children: t }) : null;
}
function ya(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  Is(r, t.key, e.feed);
  const o = Ws(e.feed), i = Fs(t);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: V.card,
      style: i,
      "data-selected": Ia(e.selected),
      "data-flagged": Ia(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: V.hit, onClick: (c) => js(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(Ds, { item: t }),
        /* @__PURE__ */ n("p", { className: V.title, children: t.title }),
        /* @__PURE__ */ n(Ps, { item: t, connection: o }),
        /* @__PURE__ */ n(Os, { reason: t.blockedReason }),
        /* @__PURE__ */ n(Hs, { item: t, fields: a }),
        /* @__PURE__ */ n(zs, { item: t, stale: o === "stale" })
      ]
    }
  );
}
const Gs = "_column_10sxg_3", Ks = "_head_10sxg_24", Us = "_label_10sxg_33", Vs = "_count_10sxg_42", Ys = "_list_10sxg_56", Ve = {
  column: Gs,
  head: Ks,
  label: Us,
  count: Vs,
  list: Ys
};
function En(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Xs({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ l("div", { className: Ve.head, children: [
    /* @__PURE__ */ n("h2", { className: Ve.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ l("span", { className: Ve.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Js(e) {
  return /* @__PURE__ */ n("div", { className: Ve.list, role: "list", children: e.rows.map((a, t) => {
    var r;
    return /* @__PURE__ */ n(
      ya,
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
function Qs({ column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = k(), h = e.cap !== void 0 && a.length > e.cap, _ = En(a, r);
  return /* @__PURE__ */ l("section", { className: Ve.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(Xs, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(Js, { column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, rows: _ }),
    h && /* @__PURE__ */ n(gs, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Zs = "_foot_8qg4p_2", ed = "_note_8qg4p_13", ad = "_link_8qg4p_19", Sa = {
  foot: Zs,
  note: ed,
  link: ad
};
function g1({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: Sa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Sa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: Sa.link, href: e, children: "Configure board" })
  ] });
}
const nd = "_head_1la6p_3", td = "_identity_1la6p_12", rd = "_titleRow_1la6p_18", ld = "_title_1la6p_18", od = "_key_1la6p_35", id = "_rollup_1la6p_45", cd = "_tools_1la6p_53", sd = "_swatch_1la6p_62", dd = "_mark_1la6p_69", fe = {
  head: nd,
  identity: td,
  titleRow: rd,
  title: ld,
  key: od,
  rollup: id,
  tools: cd,
  swatch: sd,
  mark: dd
}, cn = "initials:";
function ud(e) {
  return e === void 0 ? "loaded this week unavailable" : `${J(e)} loaded this week`;
}
function hd(e) {
  const a = [`${J(e.inFlight)} in flight`, ud(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${J(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${re(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${re(e.p90)}`), a.join(" · ");
}
function md(e) {
  return e.startsWith(cn) ? e.slice(cn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function wd({ markRef: e, streamStep: a }) {
  const t = { "--stream": Se(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${fe.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: md(e) }) : /* @__PURE__ */ n("span", { className: fe.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function _d({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(E, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function N1({
  stream: e,
  rollups: a,
  connection: t,
  lastEventAt: r,
  owners: o,
  owner: i,
  onOwnerChange: c,
  onConfigure: s,
  actions: u
}) {
  return /* @__PURE__ */ l("div", { className: fe.head, children: [
    /* @__PURE__ */ l("div", { className: fe.identity, children: [
      /* @__PURE__ */ l("div", { className: fe.titleRow, children: [
        /* @__PURE__ */ n(wd, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: fe.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: fe.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: fe.rollup, "aria-live": "polite", children: hd(a) })
    ] }),
    /* @__PURE__ */ l("div", { className: fe.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(_d, { owners: o, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(v, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Wa, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const vd = "_head_kabyh_11", fd = "_line_kabyh_12", bd = "_cHandle_kabyh_33", pd = "_cName_kabyh_38", gd = "_nameLine_kabyh_46", Nd = "_cLabel_kabyh_53", yd = "_cCap_kabyh_58", kd = "_cShown_kabyh_63", $d = "_name_kabyh_46", Cd = "_noCap_kabyh_85", Sd = "_state_kabyh_99", Rd = "_handle_kabyh_104", Td = "_sub_kabyh_118", I = {
  head: vd,
  line: fd,
  cHandle: bd,
  cName: pd,
  nameLine: gd,
  cLabel: Nd,
  cCap: yd,
  cShown: kd,
  name: $d,
  noCap: Cd,
  state: Sd,
  handle: Rd,
  sub: Td
}, Ld = "can't be hidden or collapsed", Ed = "terminal · counted, not a column";
function y1() {
  return /* @__PURE__ */ l("div", { className: I.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: I.cHandle }),
    /* @__PURE__ */ n("span", { className: I.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: I.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: I.cShown, children: "Shown" })
  ] });
}
function xd(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Ad(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function sn(e) {
  return e.gate ? Ld : e.terminal ? Ed : Ad(e.agentsMounted);
}
function qd(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Id({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: I.cName, children: [
    /* @__PURE__ */ l("span", { className: I.nameLine, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    sn(e) && /* @__PURE__ */ n("span", { className: I.sub, children: sn(e) })
  ] });
}
function Md(e) {
  return e === void 0 ? "" : String(e);
}
function Bd(e) {
  return e === "" ? void 0 : Number(e);
}
function Pd({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: I.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: I.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => qd(t, a),
      children: "⠿"
    }
  ) });
}
function Dd({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${I.cCap} ${I.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: I.cCap, children: /* @__PURE__ */ n(E, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Md(a.cap), onChange: (r) => t({ ...a, cap: Bd(r) }) }) });
}
function Od({ stage: e, config: a, onChange: t }) {
  const r = xd(e, a.shown);
  return /* @__PURE__ */ l("span", { className: I.cShown, children: [
    /* @__PURE__ */ n(Me, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (o) => t({ ...a, shown: o }) }),
    /* @__PURE__ */ n("span", { className: I.state, "aria-hidden": "true", children: r.state })
  ] });
}
function Hd(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function k1({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: I.line, "data-kind": Hd(e), children: [
    /* @__PURE__ */ n(Pd, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Id, { stage: e }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: /* @__PURE__ */ n(E, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (o) => t({ ...a, label: o }) }) }),
    /* @__PURE__ */ n(Dd, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(Od, { stage: e, config: a, onChange: t })
  ] });
}
const Fd = "_body_hn6d6_2", jd = "_head_hn6d6_9", Wd = "_summary_hn6d6_19", zd = "_block_hn6d6_20", Gd = "_actionsBlock_hn6d6_21", Kd = "_title_hn6d6_41", Ud = "_note_hn6d6_46", Vd = "_k_hn6d6_51", Yd = "_kv_hn6d6_58", Xd = "_row_hn6d6_64", Jd = "_label_hn6d6_75", Qd = "_value_hn6d6_84", Zd = "_quote_hn6d6_90", eu = "_actions_hn6d6_21", au = "_resolve_hn6d6_103", M = {
  body: Fd,
  head: jd,
  summary: Wd,
  block: zd,
  actionsBlock: Gd,
  title: Kd,
  note: Ud,
  k: Vd,
  kv: Yd,
  row: Xd,
  label: Jd,
  value: Qd,
  quote: Zd,
  actions: eu,
  resolve: au
};
function nu(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function tu(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Ne, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function ru(e) {
  const a = ba(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function lu(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...pa(ru(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", re(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...nu(e),
    ...tu(e, a)
  ];
}
function ou({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: M.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: M.k, children: a }),
    e
  ] });
}
function iu({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: M.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function cu({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: M.block, children: [
    /* @__PURE__ */ n("p", { className: M.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: M.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: M.note, children: e.agentMeta })
  ] }) : null;
}
function $1({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: o, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = k(), d = lu(e, o);
  return /* @__PURE__ */ n(Qe, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: M.body, children: [
    /* @__PURE__ */ n(iu, { item: e }),
    /* @__PURE__ */ l("div", { className: M.summary, children: [
      /* @__PURE__ */ n("h2", { className: M.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: M.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: M.kv, children: d.map(([h, _]) => /* @__PURE__ */ l("div", { className: M.row, children: [
      /* @__PURE__ */ n("dt", { className: M.label, children: h }),
      /* @__PURE__ */ n("dd", { className: M.value, children: _ })
    ] }, h)) }),
    /* @__PURE__ */ n(cu, { item: e }),
    /* @__PURE__ */ l("div", { className: M.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: M.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: M.note, children: s })
    ] }),
    /* @__PURE__ */ n(ou, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const su = "_root_3azmy_2", du = "_list_3azmy_7", uu = "_item_3azmy_12", hu = "_box_3azmy_18", mu = "_text_3azmy_23", wu = "_note_3azmy_28", De = {
  root: su,
  list: du,
  item: uu,
  box: hu,
  text: mu,
  note: wu
};
function ka({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ l("div", { className: De.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${De.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${De.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: De.box, children: /* @__PURE__ */ n(ja, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: De.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${De.note} ward-checklist-note`, children: a })
  ] });
}
const _u = "_rail_ke7ch_2", vu = "_k_ke7ch_11", fu = "_head_ke7ch_19", bu = "_section_ke7ch_25", pu = "_card_ke7ch_38", gu = "_strip_ke7ch_42", Nu = "_skeleton_ke7ch_56", yu = "_skeletonLabel_ke7ch_70", ku = "_bar_ke7ch_76", $u = "_note_ke7ch_85", de = {
  rail: _u,
  k: vu,
  head: fu,
  section: bu,
  card: pu,
  strip: gu,
  skeleton: Nu,
  skeletonLabel: yu,
  bar: ku,
  note: $u
};
function Cu(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ra({ title: e, children: a }) {
  return /* @__PURE__ */ l("section", { className: de.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: de.k, children: e }),
    a
  ] });
}
function Su({ column: e, count: a }) {
  return /* @__PURE__ */ l("div", { className: de.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: de.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: de.bar, "aria-hidden": "true" }, r))
  ] });
}
function Ru({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(Qs, { column: o, items: a.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, o.id));
}
function Tu(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Ru, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Su, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function C1(e) {
  const a = Cu(e.onOpen), t = En(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: de.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${de.k} ${de.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ra, { title: "Card", children: /* @__PURE__ */ n("div", { className: de.card, children: t && /* @__PURE__ */ n(ya, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ l(Ra, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: de.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Tu, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: de.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ra, { title: "Effect of this config", children: /* @__PURE__ */ n(ka, { items: e.effects, density: "compact" }) })
  ] });
}
function Lu(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Eu(e) {
  return Math.ceil(e.length / 2);
}
function xu(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function xn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Au(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const o = xn(e);
  o !== void 0 && t(o), r(xu(e.type));
}
function qu(e, a, t, r, o) {
  A(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Au(i, t, r, o));
  }, [e, a, t, r, o]);
}
function Iu(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Mu(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function Bu(e, a) {
  return a !== void 0 ? re(e.timeInStage) + " · waits on " + a.agent : re(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Pu(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(Eu(a ?? [])) + ")"
  };
}
function Du(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Ou(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: ee(e.cost) }) : null;
}
function Hu(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Fu(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Ne, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function ju(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function Wu(e, a) {
  return a === void 0 ? e : Lu(e, a.ref);
}
function zu(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Xe(e) {
  return e === !0 ? "true" : void 0;
}
function An(e) {
  const a = e.item, t = a.run, r = t !== void 0, o = N(null), i = ta(o), c = N(/* @__PURE__ */ new Set()), [s, u] = g(Iu(a));
  qu(e.feed, a.key, c, u, i);
  const d = Mu(a, r), h = Bu(a, t), _ = Pu(a, e.fields), b = ju(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...zu(e),
      className: "ward-workcard",
      "data-flagged": Xe(a.flagged),
      "data-selected": Xe(e.selected),
      style: _,
      ref: Wu(o, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Du(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: d.role, label: d.label }),
          Ou(a, e.fields),
          Hu(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          Fu(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function Gu({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Ku(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Uu(e, a, t) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Vu(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Gu, { count: e.items.length, cap: e.column.cap });
}
function Yu(e, a) {
  return e.roving ?? a;
}
function Xu(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Ju(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    An,
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
function Qu(e) {
  const a = k(), t = _a({ orientation: "vertical" }), r = Yu(e, t), o = Ku(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Xe(o), "data-gate": Xe(e.column.gate), children: [
    Uu(e.column, e.items.length, a),
    Vu(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Xu(e, t), children: Ju(e, r) })
  ] });
}
function Zu(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + re(e.p50)), e.p90 !== void 0 && (a += " · p90 " + re(e.p90)), a;
}
function eh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(E, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function ah(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function S1(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Zu(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      eh(e),
      ah(e.onConfigure),
      /* @__PURE__ */ n(Wa, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function nh(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function th(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Me, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Me, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function rh(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(T, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function R1(e) {
  const a = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": Xe(nh(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: th(e) }),
    /* @__PURE__ */ n(E, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(kn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    rh(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function T1(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(An, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Qu, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function lh(e, a) {
  const t = xn(e);
  t !== void 0 && a(t);
}
function oh(e, a, t) {
  A(() => {
    if (e != null)
      return e.subscribe(a, (r) => lh(r, t));
  }, [e, a, t]);
}
function ih(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function ch(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", re(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ee(e.cost)]), a;
}
function sh(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Ne, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function dh(e, a) {
  return /* @__PURE__ */ l(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function L1(e) {
  var c;
  const a = e.item, t = a.run, [r, o] = g((c = a.run) == null ? void 0 : c.lastStep);
  oh(e.feed, a.key, o);
  const i = [...ih(a), ...ch(a)];
  return /* @__PURE__ */ l(Qe, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      sh(t, r)
    ] }),
    dh(a, e.actions)
  ] });
}
const uh = "_card_hvxp7_2", hh = "_head_hvxp7_17", mh = "_mark_hvxp7_25", wh = "_name_hvxp7_37", _h = "_chips_hvxp7_48", vh = "_description_hvxp7_54", fh = "_run_hvxp7_59", bh = "_sep_hvxp7_68", ph = "_facts_hvxp7_73", gh = "_fact_hvxp7_73", Nh = "_factLabel_hvxp7_86", yh = "_factValue_hvxp7_90", ne = {
  card: uh,
  head: hh,
  mark: mh,
  name: wh,
  chips: _h,
  description: vh,
  run: fh,
  sep: bh,
  facts: ph,
  fact: gh,
  factLabel: Nh,
  factValue: yh
}, kh = { live: "done", draft: "running", paused: "meta" };
function $h(e) {
  return e === void 0 ? ne.card : `${ne.card} ${e}`;
}
function Ch({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ne.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: kh[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function Sh({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ne.description, children: e });
}
function Rh({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ne.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ne.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Ne, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Th({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ne.facts, children: e.map((a) => /* @__PURE__ */ l("div", { className: ne.fact, children: [
    /* @__PURE__ */ n("dt", { className: ne.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: ne.factValue, children: a.value })
  ] }, a.label)) });
}
function Lh(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Eh({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: o, facts: i, className: c }) {
  const s = { "--stream": Se(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": u,
      className: $h(c),
      style: s,
      "data-selected": u,
      "data-paused": Lh(e.versions),
      children: [
        /* @__PURE__ */ l("h3", { className: ne.head, children: [
          /* @__PURE__ */ n("span", { className: ne.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ne.name} ward-rowlink`, href: a, "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(Sh, { description: e.description }),
        /* @__PURE__ */ n(Rh, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Ch, { versions: e.versions }),
        /* @__PURE__ */ n(Th, { facts: i })
      ]
    }
  );
}
const xh = "_list_4dcyc_2", Ah = "_row_4dcyc_11", qh = "_head_4dcyc_23", Ih = "_id_4dcyc_30", Mh = "_lock_4dcyc_35", Bh = "_reason_4dcyc_41", Ph = "_remove_4dcyc_46", Dh = "_clauses_4dcyc_50", Oh = "_clause_4dcyc_50", Hh = "_label_4dcyc_64", Fh = "_cell_4dcyc_71", jh = "_value_4dcyc_76", te = {
  list: xh,
  row: Ah,
  head: qh,
  id: Ih,
  lock: Mh,
  reason: Bh,
  remove: Ph,
  clauses: Dh,
  clause: Oh,
  label: Hh,
  cell: Fh,
  value: jh
}, qn = Ge(!1);
function E1({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(qn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: te.list, "aria-label": a, children: e }) });
}
function Wh({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: te.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(E, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => t(e.key, o) });
}
function zh({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: te.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: te.reason, children: e })
  ] });
}
function Gh({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ l("span", { className: te.head, children: [
    /* @__PURE__ */ n("span", { className: te.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(zh, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: te.remove, children: /* @__PURE__ */ l(v, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function dn(e, a) {
  return e.locked ? void 0 : a;
}
function x1({ rule: e, onChange: a, onRemove: t }) {
  if (!ze(qn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = dn(e, a);
  return /* @__PURE__ */ l("li", { className: te.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Gh, { rule: e, onRemove: dn(e, t) }),
    /* @__PURE__ */ n("dl", { className: te.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: te.clause, children: [
      /* @__PURE__ */ n("dt", { className: te.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: te.cell, children: /* @__PURE__ */ n(Wh, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const Kh = "_ladder_wwnch_2", Uh = "_cell_wwnch_7", Vh = "_empty_wwnch_26", Yh = "_name_wwnch_34", Xh = "_holder_wwnch_40", Jh = "_request_wwnch_46", Qh = "_swatches_wwnch_51", Zh = "_swatch_wwnch_51", em = "_tilesFrame_wwnch_78", am = "_tiles_wwnch_78", nm = "_tile_wwnch_78", tm = "_bar_wwnch_117", rm = "_hex_wwnch_128", lm = "_note_wwnch_138", R = {
  ladder: Kh,
  cell: Uh,
  empty: Vh,
  name: Yh,
  holder: Xh,
  request: Jh,
  swatches: Qh,
  swatch: Zh,
  tilesFrame: em,
  tiles: am,
  tile: nm,
  bar: tm,
  hex: rm,
  note: lm
}, om = "not validated yet, pending a CVD matrix and dark stepping";
function im(e) {
  return e.reserved ? "reserved" : fa(e.step) ? "validated" : "partial";
}
function In(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function cm(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function sm({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Re, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function dm(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function um(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const un = (e) => String(e).padStart(2, "0");
function hm(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? In(e, void 0);
}
function mm({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: r ? `step ${un(e)}` : Lt(e) }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: r ? t : `Step ${un(e)} · ${t}` })
  ] });
}
function wm({ step: e, value: a, taken: t, onChange: r, presentation: o }) {
  const i = im(e), c = In(i, t), s = c !== "free", u = a === e.step, d = e.name ?? `Step ${e.step}`, h = () => {
    s || r(e.step);
  }, _ = `${d} · ${o === "tiles" && u ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": _, ...um(s, u), "data-validation": i, style: cm(e, i), onClick: h, onKeyDown: (x) => dm(x, h) }, label: _, name: d, holder: c, validation: i, note: hm(i, t, u), step: e.step };
}
const _m = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${R.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${R.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(mm, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${R.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(sm, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function vm(e) {
  return _m[e.presentation](wm(e));
}
function fm(e) {
  for (const a of e)
    if (!a.reserved && !va(a.step)) throw new Error("colour ladder renders token steps only");
}
function bm() {
  return /* @__PURE__ */ l("div", { className: `${R.cell} ward-ladder-cell ${R.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function pm(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const gm = { list: R.ladder, swatches: R.swatches, tiles: R.tilesFrame };
function Nm() {
  return /* @__PURE__ */ l("div", { className: `${R.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const ym = { list: bm, swatches: () => null, tiles: Nm };
function Mn(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  fm(e.steps);
  const r = pm(e), o = ym[r], i = /* @__PURE__ */ l(T, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(vm, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r }, c.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${gm[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: R.tiles, children: i }) : i });
}
const km = "_rail_1el2t_2", $m = "_section_1el2t_12", Cm = "_sectionFlush_1el2t_22", Sm = "_head_1el2t_26", Rm = "_headLabel_1el2t_34", Tm = "_sample_1el2t_42", Lm = "_sampleLabel_1el2t_47", Em = "_sampleTitle_1el2t_54", xm = "_sampleMeta_1el2t_59", Am = "_trace_1el2t_65", qm = "_traceHead_1el2t_70", Im = "_steps_1el2t_78", Mm = "_step_1el2t_78", Bm = "_stepTitle_1el2t_97", Pm = "_hollow_1el2t_107", Dm = "_stepBody_1el2t_115", Om = "_stepDetail_1el2t_127", Hm = "_publish_1el2t_132", Fm = "_reason_1el2t_138", jm = "_note_1el2t_143", Wm = "_reveal_1el2t_148", p = {
  rail: km,
  section: $m,
  sectionFlush: Cm,
  head: Sm,
  headLabel: Rm,
  sample: Tm,
  sampleLabel: Lm,
  sampleTitle: Em,
  sampleMeta: xm,
  trace: Am,
  traceHead: qm,
  steps: Im,
  step: Mm,
  stepTitle: Bm,
  hollow: Pm,
  stepBody: Dm,
  stepDetail: Om,
  publish: Hm,
  reason: Fm,
  note: jm,
  reveal: Wm
}, hn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, zm = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Gm = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Km = { notSimulated: "not simulated", running: "running" };
function Um(e) {
  return e.presentation === "foundry";
}
function Vm(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Ym(e, a) {
  var r;
  const t = zm[e.status];
  return t !== void 0 ? t : ((r = a.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function Xm(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Jm(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Qm(e) {
  if (Xm(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Zm(e) {
  const [a, t] = g(!1);
  A(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${p.step} ${p.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function ew(e) {
  const a = Km[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: p.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Re, { size: 6, kind: Gm[e.kind], label: e.kind });
}
function aw(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: p.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function nw(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Ne, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function tw(e) {
  const { step: a } = e;
  return /* @__PURE__ */ l(Zm, { kind: a.kind, children: [
    /* @__PURE__ */ n(ew, { kind: a.kind }),
    /* @__PURE__ */ l("span", { className: p.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stepTitle, children: a.title }),
      /* @__PURE__ */ n(aw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(nw, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function rw(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(re(a)), t.join(" · ");
}
function Bn(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${p.trace} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.traceHead, id: a, children: rw(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: p.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(tw, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function lw(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ l("div", { className: `${p.sample} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ l("p", { className: p.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ l("p", { className: p.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function ow(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + le(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${p.sampleMeta} ${p.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function iw(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ee(e.run.cost), label: "Cost" }, { value: e.run.turns ? gn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ga, { divided: !0, cells: a }) });
}
function cw(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ee(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: gn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function sw(e) {
  const a = cw(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ l("p", { className: p.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ga, { divided: !0, cells: a }) });
}
function Pn(e) {
  const a = k();
  return e.reason !== null ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("p", { className: `${p.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function dw(e) {
  return /* @__PURE__ */ l("div", { className: `${p.publish} ${p.section}`, children: [
    /* @__PURE__ */ n(Pn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: p.note, children: e.note })
  ] });
}
function uw(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${p.publish} ${p.section}`, children: /* @__PURE__ */ n(Pn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Dn(e) {
  return /* @__PURE__ */ l("div", { className: `${p.head} ${p.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: p.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: hn[e.run.status].role, label: hn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Ne, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function hw(e, a) {
  const [t, r] = g(e.steps);
  return A(() => r(e.steps), [e.steps]), A(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (o) => {
        (o.type === "run.step" || o.type === "run.finding") && r((i) => {
          var c, s;
          return [...i, { kind: o.type === "run.finding" ? "finding" : "action", title: ((c = o.step) == null ? void 0 : c.label) ?? "step", detail: (s = o.step) == null ? void 0 : s.tool }];
        });
      });
  }, [a, e.status]), t;
}
function mw(e) {
  var t;
  Jm(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Dn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(lw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Bn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(iw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(ka, { items: e.checklist }) }),
    /* @__PURE__ */ n(dw, { reason: Vm(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function ww(e) {
  var r;
  const a = hw(e.run, e.feed);
  Qm(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Dn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(ow, { sample: e.run.sample }),
    /* @__PURE__ */ n(Bn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(sw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(ka, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(uw, { reason: Ym(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function A1(e) {
  return Um(e) ? /* @__PURE__ */ n(ww, { ...e }) : /* @__PURE__ */ n(mw, { ...e });
}
const _w = "_list_142ip_3", vw = "_row_142ip_9", fw = "_condition_142ip_18", bw = "_action_142ip_24", ra = {
  list: _w,
  row: vw,
  condition: fw,
  action: bw
}, On = Ge(!1);
function q1({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(On.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ra.list, "aria-label": a, children: e }) });
}
function I1({ rule: e }) {
  if (!ze(On)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: ra.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: ra.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: ra.action, children: e.then })
  ] });
}
function Ma(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [o] = r.splice(a, 1);
  return r.splice(t, 0, o), r;
}
function Hn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Fn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function mn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function pw(e) {
  return e === "up" ? "down" : "up";
}
function gw(e, a) {
  const t = mn(e, a.id, a.direction) ?? mn(e, a.id, pw(a.direction));
  t == null || t.focus();
}
function jn() {
  const e = N(null), [a, t] = g(null), [r, o] = g("");
  return A(() => {
    e.current !== null && a !== null && gw(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), o(s);
  } };
}
function Wn({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ua({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Nw = "_body_1h15q_2", yw = "_title_1h15q_8", kw = "_section_1h15q_13", $w = "_legend_1h15q_18", Cw = "_stages_1h15q_26", Sw = "_stage_1h15q_26", Rw = "_stageIndex_1h15q_44", Tw = "_stageName_1h15q_50", Lw = "_footer_1h15q_59", Ew = "_note_1h15q_66", xw = "_reason_1h15q_71", Aw = "_actions_1h15q_76", qw = "_webHead_1h15q_83", Iw = "_kicker_1h15q_92", Mw = "_webTitle_1h15q_99", Bw = "_webBody_1h15q_105", Pw = "_webSection_1h15q_109", Dw = "_sectionHead_1h15q_121", Ow = "_sectionNote_1h15q_129", Hw = "_formLabel_1h15q_134", Fw = "_identityRow_1h15q_139", jw = "_nameCell_1h15q_145", Ww = "_keyCell_1h15q_150", zw = "_colourCell_1h15q_154", Gw = "_colourStatus_1h15q_161", Kw = "_webStages_1h15q_166", Uw = "_webStageList_1h15q_172", Vw = "_webStage_1h15q_166", Yw = "_webIndex_1h15q_191", Xw = "_webStageName_1h15q_196", Jw = "_webMoves_1h15q_201", Qw = "_addStage_1h15q_215", Zw = "_addStageButton_1h15q_223", e_ = "_addStageNote_1h15q_231", a_ = "_webFooter_1h15q_236", n_ = "_webFooterNotes_1h15q_244", t_ = "_webNote_1h15q_251", w = {
  body: Nw,
  title: yw,
  section: kw,
  legend: $w,
  stages: Cw,
  stage: Sw,
  stageIndex: Rw,
  stageName: Tw,
  footer: Lw,
  note: Ew,
  reason: xw,
  actions: Aw,
  webHead: qw,
  kicker: Iw,
  webTitle: Mw,
  webBody: Bw,
  webSection: Pw,
  sectionHead: Dw,
  sectionNote: Ow,
  formLabel: Hw,
  identityRow: Fw,
  nameCell: jw,
  keyCell: Ww,
  colourCell: zw,
  colourStatus: Gw,
  webStages: Kw,
  webStageList: Uw,
  webStage: Vw,
  webIndex: Yw,
  webStageName: Xw,
  webMoves: Jw,
  addStage: Qw,
  addStageButton: Zw,
  addStageNote: e_,
  webFooter: a_,
  webFooterNotes: n_,
  webNote: t_
}, r_ = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], zn = "not in catalogue";
function l_(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${zn}` }, ...t];
}
function o_({ stage: e, index: a, catalogue: t, onName: r }) {
  const o = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(E, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${zn}`;
  return /* @__PURE__ */ n(E, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: l_(t, e.name), invalid: i, onChange: r });
}
function Gn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function i_(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function c_({ id: e, stage: a, index: t, total: r, catalogue: o, onReplace: i, onMove: c }) {
  const s = Gn(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(o_, { stage: a, index: t, catalogue: o, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(E, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: r_, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ l("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ua, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(ua, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function s_({ stages: e, onChange: a, catalogue: t }) {
  const r = i_(e.length), o = jn(), i = (s, u) => {
    const d = Hn(s, u);
    r.current = Ma(r.current, s, d), o.moved({ id: r.current[d], direction: u }, Fn(Gn(e[s], s), d, e.length)), a(Ma(e, s, d));
  }, c = (s, u) => a(e.map((d, h) => h === s ? u : d));
  return /* @__PURE__ */ l("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ n(c_, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: t, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(Wn, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const d_ = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], u_ = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], h_ = "A new stream starts as a draft. Nothing runs on it until you publish it.", m_ = "Create is disabled: name the stream and give it a key first.", w_ = "reorder with the ↑ ↓ buttons · min 2";
function za(e, a) {
  return !e.reserved && fa(e.step) && a[e.step] === void 0;
}
function __(e, a) {
  const t = e.find((r) => za(r, a));
  return t ? t.step : 1;
}
function v_({ stages: e, onMove: a }) {
  const t = jn(), r = (o, i) => {
    const c = Hn(o, i);
    t.moved({ id: e[o].id, direction: i }, Fn(e[o].name, c, e.length)), a(o, c);
  };
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: w.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(ua, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ua, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(Wn, { text: t.announcement })
  ] });
}
function f_({ reason: e, onCreate: a, onDraft: t }) {
  const r = k();
  return /* @__PURE__ */ l("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: h_ }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function b_(e, a) {
  return e !== "" && a !== "" ? null : m_;
}
function p_(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: o = u_, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = k(), [h, _] = g(""), [b, x] = g(""), [K, Q] = g(a[0].value), [oe, ye] = g(() => __(t, r)), [ie, Be] = g(e.stages ?? d_), [Pe, $] = g(o[0].value), F = { name: h, key: b, streamStep: oe, owner: K, stages: ie, policy: Pe }, we = b_(h, b);
  return /* @__PURE__ */ n(Qe, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ l("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(E, { kind: "input", label: "Stream name", value: h, onChange: _ }),
      /* @__PURE__ */ n(E, { kind: "input", label: "Key", value: b, onChange: x, mono: !0 }),
      /* @__PURE__ */ n(E, { kind: "select", label: "Owner", value: K, onChange: Q, options: a })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(Mn, { label: "Stream colour", steps: t, value: oe, onChange: ye, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(v_, { stages: ie, onMove: (Te, dt) => Be(Ma(ie, Te, dt)) })
    ] }),
    /* @__PURE__ */ n(Rn, { legend: "Loop policy", options: o, value: Pe, onChange: $ }),
    /* @__PURE__ */ n(f_, { reason: we, onCreate: () => i(F), onDraft: () => c(F) })
  ] }) });
}
const Kn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], g_ = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function N_(e, a, t, r, o, i) {
  var s;
  const c = ((s = Kn.find((u) => u.value === o)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function y_(e, a) {
  return k_(e) && $_(e, a) && C_(e);
}
function k_(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function $_(e, a) {
  return e.colourStep !== null && za({ step: e.colourStep }, a);
}
function C_(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function S_(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${om}.` : za({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function R_({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function T_({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: w.webFooter, children: [
    /* @__PURE__ */ l("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(R_, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: g_ })
    ] }),
    o && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => o(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function L_({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function E_({ name: e, setName: a, streamKey: t, setKey: r, colour: o, owner: i }) {
  return /* @__PURE__ */ l("section", { className: w.webSection, children: [
    /* @__PURE__ */ n("h3", { className: w.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ l("div", { className: w.identityRow, children: [
      /* @__PURE__ */ n("div", { className: w.nameCell, children: /* @__PURE__ */ n(E, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: w.keyCell, children: /* @__PURE__ */ n(E, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      o
    ] }),
    i
  ] });
}
function x_(e) {
  const a = k(), t = k(), r = e.takenBy ?? {}, [o, i] = g(""), [c, s] = g(""), [u, d] = g(e.owners[0] ?? ""), [h, _] = g(null), [b, x] = g("relay"), [K, Q] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = N_(o, c, u, h, b, K), ye = y_(oe, r), ie = K.find(($) => $.kind === "agent" && $.name.trim() !== ""), Be = /* @__PURE__ */ l("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Mn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: _, takenBy: r })
  ] }), Pe = /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: S_(h, r) }),
    /* @__PURE__ */ n(E, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map(($) => ({ value: $, label: $ })), onChange: d })
  ] });
  return /* @__PURE__ */ l(Qe, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(L_, { titleId: t }),
    /* @__PURE__ */ l("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(E_, { name: o, setName: i, streamKey: c, setKey: s, colour: Be, owner: Pe }),
      /* @__PURE__ */ l("section", { className: w.webSection, children: [
        /* @__PURE__ */ l("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: w_ })
        ] }),
        /* @__PURE__ */ n(s_, { stages: K, onChange: Q })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(Rn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Kn, onChange: x }) }),
      /* @__PURE__ */ n(T_, { ready: ye, draft: oe, agentStage: ie, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function M1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(x_, { ...e }) : /* @__PURE__ */ n(p_, { ...e });
}
const A_ = "_row_bs8hc_2", q_ = "_cell_bs8hc_6", I_ = "_condition_bs8hc_11", M_ = "_action_bs8hc_18", B_ = "_contract_bs8hc_24", P_ = "_contractCondition_bs8hc_33", D_ = "_contractAction_bs8hc_39", Y = {
  row: A_,
  cell: q_,
  condition: I_,
  action: M_,
  contract: B_,
  contractCondition: P_,
  contractAction: D_
}, Un = ["advance", "block", "escalate", "requestReview"], wn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function ha(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Ga(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: Y.action, children: wn[e.then] }) : /* @__PURE__ */ n(
    E,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => a({ ...e, then: o }),
      options: Un.map((o) => ({ value: o, label: wn[o] }))
    }
  );
}
function O_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: Y.row, children: [
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n("span", { className: Y.condition, title: ha(e, r), children: ha(e, r) }) }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: Ga(e, a, t) })
  ] });
}
function H_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: Y.row, children: [
    /* @__PURE__ */ l("td", { className: Y.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: Y.condition, children: ha(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: Ga(e, a, t) })
  ] });
}
function F_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: Y.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: Y.contractCondition, children: ha(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: Y.contractAction, children: Ga(e, a, t, !0) })
  ] });
}
const j_ = { two: H_, four: O_, contract: F_ };
function B1(e) {
  var t;
  if (!Un.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = j_[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const W_ = "_column_lurgk_2", z_ = "_head_lurgk_17", G_ = "_index_lurgk_23", K_ = "_name_lurgk_29", U_ = "_meta_lurgk_38", V_ = "_mono_lurgk_43", Y_ = "_gate_lurgk_50", X_ = "_reviewersLabel_lurgk_57", J_ = "_reviewers_lurgk_57", Q_ = "_reviewer_lurgk_57", Z_ = "_agents_lurgk_74", ev = "_workflowColumn_lurgk_79", av = "_workflowHead_lurgk_96", nv = "_stageRow_lurgk_102", tv = "_stageLabel_lurgk_109", rv = "_workflowTitle_lurgk_116", lv = "_workflowMeta_lurgk_122", ov = "_workflowGate_lurgk_127", iv = "_gateNote_lurgk_135", cv = "_cardNote_lurgk_140", sv = "_reviewerList_lurgk_149", dv = "_reviewerRow_lurgk_155", uv = "_reviewerMark_lurgk_161", hv = "_reviewerName_lurgk_171", mv = "_terminalCard_lurgk_177", wv = "_terminalCount_lurgk_186", _v = "_workflowAgents_lurgk_192", vv = "_mount_lurgk_198", y = {
  column: W_,
  head: z_,
  index: G_,
  name: K_,
  meta: U_,
  mono: V_,
  gate: Y_,
  reviewersLabel: X_,
  reviewers: J_,
  reviewer: Q_,
  agents: Z_,
  workflowColumn: ev,
  workflowHead: av,
  stageRow: nv,
  stageLabel: tv,
  workflowTitle: rv,
  workflowMeta: lv,
  workflowGate: ov,
  gateNote: iv,
  cardNote: cv,
  reviewerList: sv,
  reviewerRow: dv,
  reviewerMark: uv,
  reviewerName: hv,
  terminalCard: mv,
  terminalCount: wv,
  workflowAgents: _v,
  mount: vv
}, fv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Ka(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Vn(e) {
  return `${Math.round(e * 100)}%`;
}
function bv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ga, { cells: [
      { value: Vn(e.gateShare), label: "Gate share", accent: "amber" },
      { value: J(e.count), label: "In stage" }
    ] })
  ] });
}
function pv({ stage: e }) {
  return /* @__PURE__ */ n(ga, { cells: [
    { value: J(e.count), label: "In stage" },
    { value: Ka(e.closedThisWeek, J), label: "Closed this week" }
  ] });
}
function gv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ l("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: fv[e.kind] })
  ] });
}
function Nv({ stage: e }) {
  return /* @__PURE__ */ l("p", { className: y.meta, children: [
    /* @__PURE__ */ l("span", { className: y.mono, children: [
      J(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ l("span", { className: y.mono, children: [
      re(e.medianWait),
      " median wait"
    ] })
  ] });
}
function yv({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(bv, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(pv, { stage: e }) : null;
}
function kv({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function $v({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const o = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: y.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(gv, { stage: e, titleId: o }),
    /* @__PURE__ */ n(Nv, { stage: e }),
    /* @__PURE__ */ n(yv, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(Eh, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(kv, { onMount: t })
  ] });
}
const Cv = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function Sv({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a, t) => /* @__PURE__ */ l("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function Rv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(Sv, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: Vn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Tv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Lv({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: Ka(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: Tv(e.rolledBackThisWeek) })
  ] });
}
function Ev(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function xv(e) {
  if (e.kind === "terminal") return `${Ka(e.closedThisWeek)} this week`;
  const a = Ev(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Av({ stage: e, titleId: a }) {
  const t = Cv[e.kind];
  return /* @__PURE__ */ l("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: y.stageRow, children: [
      /* @__PURE__ */ l("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: xv(e) })
  ] });
}
function qv(e) {
  return e === "entry" || e === "agent";
}
function Iv({ stage: e, onMount: a }) {
  return a === void 0 || !qv(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Mv({ stage: e, agentCards: a, onMount: t }) {
  const r = k();
  return /* @__PURE__ */ l("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Av, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(Rv, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(Lv, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(Iv, { stage: e, onMount: t })
  ] });
}
function Bv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function P1(e) {
  return Bv(e) ? /* @__PURE__ */ n(Mv, { ...e }) : /* @__PURE__ */ n($v, { ...e });
}
const Pv = "_row_ve78g_6", Dv = "_cell_ve78g_10", Ov = "_name_ve78g_19", Hv = "_chain_ve78g_26", Fv = "_owner_ve78g_32", jv = "_mono_ve78g_38", Wv = "_compactRow_ve78g_45", zv = "_compactCell_ve78g_54", Gv = "_stack_ve78g_71", Kv = "_stat_ve78g_78", Uv = "_identityLine_ve78g_85", Vv = "_identity_ve78g_85", Yv = "_compactName_ve78g_103", Xv = "_ownerLine_ve78g_117", Jv = "_link_ve78g_130", Qv = "_emptyChain_ve78g_136", Zv = "_arrow_ve78g_142", ef = "_muted_ve78g_143", af = "_define_ve78g_148", nf = "_statValue_ve78g_155", tf = "_policyId_ve78g_161", rf = "_sub_ve78g_166", f = {
  row: Pv,
  cell: Dv,
  name: Ov,
  chain: Hv,
  owner: Fv,
  mono: jv,
  compactRow: Wv,
  compactCell: zv,
  stack: Gv,
  stat: Kv,
  identityLine: Uv,
  identity: Vv,
  compactName: Yv,
  ownerLine: Xv,
  link: Jv,
  emptyChain: Qv,
  arrow: Zv,
  muted: ef,
  define: af,
  statValue: nf,
  policyId: tf,
  sub: rf
};
function lf(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function of(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function Yn(e) {
  return `${J(e)} ${e === 1 ? "member" : "members"}`;
}
function cf(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Yn(e.members)}`;
}
function sf(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ l("span", { className: f.stack, children: [
    /* @__PURE__ */ l("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: a, "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: cf(e) })
  ] }) });
}
function df(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ l("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(m, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function uf(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ l("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: a, children: "Define workflow" })
  ] }) : df(e) });
}
function _n(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function hf(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function mf(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function wf({ stream: e, href: a, presentation: t }) {
  const r = of(t.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Se(e.streamStep, "chip") }, children: [
    sf(e, a),
    uf(e.stages, a),
    _n(mf(e.agents), e.agents === void 0 ? void 0 : lf(e.agents), "—"),
    hf(e.policy),
    _n(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function _f(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function D1(e) {
  if (_f(e)) return wf(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ l("tr", { className: f.row, children: [
    /* @__PURE__ */ l("td", { className: f.cell, children: [
      /* @__PURE__ */ n("a", { className: f.name, href: t, children: a.name }),
      /* @__PURE__ */ n(m, { ...pa(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ n(m, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, children: /* @__PURE__ */ n("span", { className: f.chain, children: a.stages.map((r) => /* @__PURE__ */ n(m, { role: r.gate ? "gate" : "soft", label: r.name }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, children: /* @__PURE__ */ l("span", { className: f.mono, children: [
      a.agents.live,
      " live · ",
      a.agents.draft,
      " draft · ",
      a.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ l("td", { className: f.cell, children: [
      /* @__PURE__ */ n("span", { className: f.owner, children: a.owner }),
      /* @__PURE__ */ n("span", { className: f.mono, children: Yn(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: J(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : re(a.p50) }) })
  ] });
}
const vf = "_row_mdce7_2", ff = "_name_mdce7_16", bf = "_scope_mdce7_24", ma = {
  row: vf,
  name: ff,
  scope: bf
};
function pf(e) {
  return e === void 0 ? `${ma.row} ward-toolrow` : `${ma.row} ward-toolrow ${e}`;
}
function gf(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Nf({ id: e, reasonId: a, tool: t, state: r, onChange: o }) {
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
        r.locked || o(i.target.checked);
      }
    }
  );
}
function yf({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function kf({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${ma.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function $f(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function O1({ tool: e, onChange: a, presentation: t }) {
  const r = k(), o = k(), i = gf(e, t), c = $f(t);
  return /* @__PURE__ */ l(c, { className: pf(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Nf, { id: r, reasonId: o, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${ma.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(kf, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(yf, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const Cf = "_strip_1qtlf_2", Sf = "_head_1qtlf_10", Rf = "_name_1qtlf_16", Tf = "_chart_1qtlf_24", Lf = "_segment_1qtlf_30", Ef = "_detailedChart_1qtlf_36", xf = "_rail_1qtlf_49", Af = "_section_1qtlf_55", qf = "_label_1qtlf_66", If = "_note_1qtlf_83", X = {
  strip: Cf,
  head: Sf,
  name: Rf,
  chart: Tf,
  segment: Lf,
  detailedChart: Ef,
  rail: xf,
  section: Af,
  label: qf,
  note: If
}, Mf = "No item in flight to preview.", Bf = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Pf = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Ba = [1, 2, 3, 4, 5, 6], wa = 100;
function Df(e, a) {
  return a.has(e) ? Se(e, "id") : "var(--ward-color-line)";
}
function Of({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: X.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ba.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: X.segment,
      x: o * wa,
      y: "0",
      width: wa,
      height: "8",
      fill: Df(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Hf(e) {
  const a = e.slice(0, Ba.length);
  for (; a.length < Ba.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Ff({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${X.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * wa),
        y: "0",
        width: String(wa),
        height: "40",
        style: { fill: Se(a.streamStep, "chip") }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function Xn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function aa({ label: e, children: a }) {
  const t = k();
  return /* @__PURE__ */ l("section", { className: X.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: X.label, children: e }),
    a
  ] });
}
function jf({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: X.note, children: a ?? Mf }) : /* @__PURE__ */ n(ya, { item: { ...e, streamStep: ba(t.streamStep) }, onOpen: Xn(r), feed: null });
}
function Wf({ draft: e }) {
  const a = { "--stream": Se(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: X.head, style: a, children: [
    /* @__PURE__ */ n(Re, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: X.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...pa(e.key, e.streamStep) })
  ] });
}
function zf(e) {
  const a = Hf(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ l("div", { className: X.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(aa, { label: "Board card", children: /* @__PURE__ */ n(jf, { ...e, draft: t }) }),
    /* @__PURE__ */ n(aa, { label: "Streams index row", children: /* @__PURE__ */ n(Wf, { draft: t }) }),
    /* @__PURE__ */ l(aa, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(Ff, { identities: a }),
      /* @__PURE__ */ n("p", { className: X.note, children: Bf })
    ] }),
    /* @__PURE__ */ n(aa, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: X.note, children: Pf }) })
  ] });
}
function Gf({ draft: e, sample: a, streams: t, onOpen: r }) {
  const o = { "--stream": Se(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: X.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: X.head, children: [
      /* @__PURE__ */ n(Re, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: X.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...pa(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n(ya, { item: { ...a, streamStep: e.streamStep }, onOpen: Xn(r) }),
    /* @__PURE__ */ n(Of, { draft: e, streams: t })
  ] });
}
function H1(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(zf, { ...e }) : /* @__PURE__ */ n(Gf, { ...e });
}
const Kf = "_row_ixlg5_6", Uf = "_headCell_ixlg5_10", Vf = "_cell_ixlg5_11", Yf = "_name_ixlg5_23", Xf = "_consequence_ixlg5_29", Jf = "_governed_ixlg5_36", Qf = "_control_ixlg5_42", Zf = "_byRole_ixlg5_48", eb = "_webControl_ixlg5_59", ab = "_webConsequence_ixlg5_65", nb = "_webGoverned_ixlg5_71", P = {
  row: Kf,
  headCell: Uf,
  cell: Vf,
  name: Yf,
  consequence: Xf,
  governed: Jf,
  control: Qf,
  byRole: Zf,
  webControl: eb,
  webConsequence: ab,
  webGoverned: nb
};
function tb({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: P.byRole, children: "by role" }) : /* @__PURE__ */ l("span", { className: P.control, children: [
    /* @__PURE__ */ n(
      Me,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "PILOT" })
  ] });
}
function rb({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: P.row, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      /* @__PURE__ */ l("span", { className: P.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(tb, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function lb(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function ob({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Me,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: t === void 0,
      onChange: (o) => t == null ? void 0 : t(a.streamStep, o ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ l("span", { className: `${P.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "PILOT" }),
    r
  ] });
}
function ib({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: P.row, children: [
    /* @__PURE__ */ l("td", { className: P.cell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${P.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(ob, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webGoverned} ward-cellmeta`, children: lb(e) }) })
  ] });
}
function F1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ib, { ...e }) : /* @__PURE__ */ n(rb, { ...e });
}
const cb = "_row_vv64h_2", sb = "_cell_vv64h_6", db = "_name_vv64h_25", ub = "_note_vv64h_30", hb = "_webName_vv64h_41", mb = "_webMeta_vv64h_47", G = {
  row: cb,
  cell: sb,
  name: db,
  note: ub,
  webName: hb,
  webMeta: mb
}, Jn = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function wb(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function _b({ component: e, onRestart: a }) {
  const t = k(), r = Jn[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ l("tr", { className: G.row, children: [
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: G.name, children: e.name }) }),
    /* @__PURE__ */ l("td", { className: G.cell, "data-mono": "true", children: [
      J(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { id: t, className: G.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: G.cell, "data-align": "end", children: o ? /* @__PURE__ */ n(v, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function vb({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: wb(e.state) });
}
function fb({ component: e, onRestart: a }) {
  return /* @__PURE__ */ l("tr", { className: G.row, children: [
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: `${G.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: `${G.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(m, { ...Jn[e.state] }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(vb, { component: e, onRestart: a }) })
  ] });
}
function j1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(fb, { ...e }) : /* @__PURE__ */ n(_b, { ...e });
}
const bb = "_row_1f1gp_7", pb = "_cell_1f1gp_11", gb = "_next_1f1gp_28", Nb = "_headCell_1f1gp_38", yb = "_webId_1f1gp_77", kb = "_webPurpose_1f1gp_83", $b = "_webMeta_1f1gp_91", Cb = "_webUrgent_1f1gp_97", O = {
  row: bb,
  cell: pb,
  next: gb,
  headCell: Nb,
  webId: yb,
  webPurpose: kb,
  webMeta: $b,
  webUrgent: Cb
}, Sb = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, Rb = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, Qn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Tb = Object.fromEntries(Qn.map((e) => [e.key, e]));
function Oe({ column: e, children: a }) {
  const t = Tb[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: O.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function W1() {
  return /* @__PURE__ */ n("tr", { children: Qn.map((e) => /* @__PURE__ */ n(
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
function Lb({ cred: e }) {
  const a = Sb[e.state];
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n(Oe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Oe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Oe, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Oe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(Oe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Oe, { column: "next", children: /* @__PURE__ */ n("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Eb({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function xb({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(Eb, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...Rb[e.state] }) })
  ] });
}
function z1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(xb, { ...e }) : /* @__PURE__ */ n(Lb, { ...e });
}
const Ab = "_card_17zba_2", qb = "_head_17zba_11", Ib = "_env_17zba_18", Mb = "_version_17zba_25", Bb = "_meta_17zba_32", Pb = "_webCard_17zba_37", Db = "_webRow_17zba_47", Ob = "_webTitle_17zba_55", Hb = "_webLine_17zba_65", Fb = "_webVersion_17zba_72", jb = "_webMeta_17zba_77", W = {
  card: Ab,
  head: qb,
  env: Ib,
  version: Mb,
  meta: Bb,
  webCard: Pb,
  webRow: Db,
  webTitle: Ob,
  webLine: Hb,
  webVersion: Fb,
  webMeta: jb
}, Zn = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Wb({ env: e }) {
  const a = Zn[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l("section", { className: W.card, "aria-label": e.env.toUpperCase(), children: [
    /* @__PURE__ */ l("div", { className: W.head, children: [
      /* @__PURE__ */ n("span", { className: W.env, children: e.env.toUpperCase() }),
      /* @__PURE__ */ n(m, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ n("p", { className: W.version, children: e.version }),
    /* @__PURE__ */ l("p", { className: W.meta, children: [
      "deployed ",
      le(e.deployedAt)
    ] }),
    t && /* @__PURE__ */ n("p", { className: W.meta, children: t })
  ] });
}
function zb(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [le(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function Gb(e) {
  return /* @__PURE__ */ l("article", { className: `${W.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${W.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${W.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Zn[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${W.version} ${W.webVersion} ${W.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${W.meta} ${W.webMeta} ${W.webLine} ward-cellmeta`, children: zb(e) })
  ] });
}
function G1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Gb, { ...e }) : /* @__PURE__ */ n(Wb, { ...e });
}
const Kb = "_panel_1hmja_2", Ub = "_line_1hmja_8", Vb = "_actions_1hmja_14", na = {
  panel: Kb,
  line: Ub,
  actions: Vb
};
function K1(e) {
  return /* @__PURE__ */ l("div", { className: na.panel, children: [
    /* @__PURE__ */ n("p", { className: na.line, children: e.status }),
    /* @__PURE__ */ n(E, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: na.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: na.line, children: e.note ?? "" })
  ] });
}
const Yb = "_upload_erepj_2", Xb = "_preview_erepj_7", Jb = "_mark_erepj_17", Qb = "_empty_erepj_22", Zb = "_actions_erepj_28", ep = "_input_erepj_33", ap = "_reasons_erepj_41", np = "_reason_erepj_41", tp = "_accepted_erepj_57", Z = {
  upload: Yb,
  preview: Xb,
  mark: Jb,
  empty: Qb,
  actions: Zb,
  input: ep,
  reasons: ap,
  reason: np,
  accepted: tp
}, et = 1.5, at = 22, Je = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${et}px at ${at}px`];
function rp() {
  return { ok: !1, reasons: [Je[1]] };
}
function lp(e) {
  try {
    return new DOMParser().parseFromString(e, "image/svg+xml").querySelector("svg");
  } catch {
    return null;
  }
}
function op(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Je[0]] : [];
}
function ip(e, a) {
  const t = [];
  return e.querySelector("image") !== null && t.push(Je[1]), e.querySelector("text") !== null && t.push(Je[2]), (e.querySelector("script, foreignObject") !== null || /on[a-z]+\s*=/i.test(a)) && t.push("script elements or event handlers"), t;
}
function cp(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((o) => Number.isFinite(o) && o > 0), 0), r = t > 0 ? at / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < et;
  }) ? [Je[3]] : [];
}
function U1(e) {
  const a = lp(e);
  if (a === null) return rp();
  const t = [...op(a), ...ip(a, e), ...cp(a)];
  return t.length === 0 ? { ok: !0, svg: e } : { ok: !1, reasons: t };
}
const sp = "Mark accepted.";
function dp({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: Z.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: Z.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: Z.empty }) });
}
function up(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function hp(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function mp({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: Z.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: Z.result, role: "status", children: /* @__PURE__ */ n("p", { className: Z.accepted, children: sp }) }) : /* @__PURE__ */ n("div", { className: Z.result, role: "status", children: /* @__PURE__ */ n("ul", { className: Z.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: Z.reason, children: a }, a)) }) });
}
function wp({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(mp, { result: e }) : /* @__PURE__ */ n("p", { className: `${Z.result} ${up(e, t)}`, role: "status", children: hp(e, t) });
}
function V1({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const o = N(null), [i, c] = g(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ l("div", { className: Z.upload, children: [
    /* @__PURE__ */ n(dp, { current: e }),
    /* @__PURE__ */ l("div", { className: Z.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: o,
          className: Z.input,
          type: "file",
          accept: "image/svg+xml",
          "aria-label": "Mark file",
          onChange: (u) => {
            var d;
            return s((d = u.target.files) == null ? void 0 : d[0]);
          }
        }
      ),
      /* @__PURE__ */ n(v, { onClick: () => {
        var u;
        return (u = o.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(v, { variant: "ghost", onClick: t, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(wp, { result: i, presentation: r })
  ] });
}
const _p = "_row_1wp9s_7", vp = "_cell_1wp9s_11", fp = "_head_1wp9s_28", bp = "_name_1wp9s_34", pp = "_pinned_1wp9s_42", gp = "_headCell_1wp9s_49", Np = "_webName_1wp9s_88", yp = "_webMeta_1wp9s_95", kp = "_webWarn_1wp9s_103", q = {
  row: _p,
  cell: vp,
  head: fp,
  name: bp,
  pinned: pp,
  headCell: gp,
  webName: Np,
  webMeta: yp,
  webWarn: kp
}, Ua = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, nt = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], $p = Object.fromEntries(nt.map((e) => [e.key, e]));
function Cp(e, a) {
  return `mcp.${e}.${a}`;
}
function Sp(e) {
  return Object.keys(Ua).includes(e);
}
function Rp(e) {
  return Ua[e !== void 0 && Sp(e) ? e : "unknown"];
}
function Ke({ column: e, children: a }) {
  const t = $p[e];
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
function Y1() {
  return /* @__PURE__ */ n("tr", { children: nt.map((e) => /* @__PURE__ */ n(
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
function Tp({ server: e }) {
  const a = Ua[e.connection];
  return /* @__PURE__ */ l("tr", { className: q.row, children: [
    /* @__PURE__ */ l(Ke, { column: "name", children: [
      /* @__PURE__ */ l("span", { className: q.head, children: [
        /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() })
      ] }),
      e.pinned && /* @__PURE__ */ l("span", { className: q.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(Ke, { column: "connection", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ke, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(Ke, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(Ke, { column: "tools", children: e.tools.map((t) => Cp(e.name, t)).join(" · ") })
  ] });
}
function Lp(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Ep(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function xp({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Ap({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function qp({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function Ip({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: q.row, children: [
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: Lp(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Ep(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(xp, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Rp(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n(Ap, { server: e, onRestart: a }),
      /* @__PURE__ */ n(qp, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function X1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ip, { ...e }) : /* @__PURE__ */ n(Tp, { ...e });
}
const Mp = "_row_1h9nq_2", Bp = "_headCell_1h9nq_14", Pp = "_cell_1h9nq_15", Dp = "_name_1h9nq_26", Op = "_consequence_1h9nq_32", Hp = "_reason_1h9nq_38", Fp = "_value_1h9nq_44", jp = "_webRow_1h9nq_60", Wp = "_webSetting_1h9nq_71", zp = "_webName_1h9nq_79", Gp = "_webConsequence_1h9nq_87", Kp = "_webControl_1h9nq_93", Up = "_webState_1h9nq_106", Vp = "_webChip_1h9nq_111", L = {
  row: Mp,
  headCell: Bp,
  cell: Pp,
  name: Dp,
  consequence: Op,
  reason: Hp,
  value: Fp,
  webRow: jp,
  webSetting: Wp,
  webName: zp,
  webConsequence: Gp,
  webControl: Kp,
  webState: Up,
  webChip: Vp
}, tt = 104, rt = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function Yp({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Me, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n($n, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: L.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function Xp({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = k(), i = rt[t], c = t === "locked";
  return /* @__PURE__ */ l("tr", { className: L.row, "data-inheritance": t, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: L.headCell, children: [
      /* @__PURE__ */ n("span", { className: L.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: L.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: L.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n(Yp, { control: a, name: e.name, locked: c, describedBy: c ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: L.cell, style: { width: tt }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function lt(e, a) {
  return String(e ?? a);
}
function Jp(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Qp(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? lt(e.value, "—");
}
function Zp({ control: e, name: a, locked: t, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: L.webControl, children: [
    /* @__PURE__ */ n(Me, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => o == null ? void 0 : o(c) }),
    /* @__PURE__ */ n("span", { className: L.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function eg(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(Zp, { ...e });
  const o = Jp(a, t);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: L.webControl, "data-kind": "segment", children: /* @__PURE__ */ n($n, { options: o, value: lt(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${L.webControl} ${L.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: Qp(a) });
}
function ag({ setting: e, control: a, inheritance: t, reason: r, onChange: o, renderControl: i }) {
  const c = k(), s = t === "locked";
  return /* @__PURE__ */ l("div", { className: `${L.row} ${L.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ l("span", { className: L.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${L.name} ${L.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: c, className: `${L.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: L.webControl, children: i(c) }) : /* @__PURE__ */ n(eg, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${L.webChip} ward-policy-chip`, style: { width: tt }, children: /* @__PURE__ */ n(m, { ...rt[t], size: "tag" }) })
  ] });
}
function J1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ag, { ...e }) : /* @__PURE__ */ n(Xp, { ...e });
}
const ng = "_label_1o9za_7", tg = "_name_1o9za_15", rg = "_column_1o9za_24", lg = "_webFrame_1o9za_57", og = "_webHead_1o9za_62", ig = "_webHeadLabel_1o9za_74", cg = "_webLabel_1o9za_112", sg = "_webColumns_1o9za_119", dg = "_webGroup_1o9za_125", ug = "_webPeople_1o9za_126", hg = "_webVia_1o9za_127", mg = "_webMeta_1o9za_156", H = {
  label: ng,
  name: tg,
  column: rg,
  webFrame: lg,
  webHead: og,
  webHeadLabel: ig,
  webLabel: cg,
  webColumns: sg,
  webGroup: dg,
  webPeople: ug,
  webVia: hg,
  webMeta: mg
}, wg = {
  platformAdmin: { role: "gate", label: "PLATFORM ADMIN" },
  approver: { role: "running", label: "APPROVER" },
  streamAdmin: { role: "meta", label: "STREAM ADMIN" },
  member: { role: "meta", label: "MEMBER" },
  viewer: { role: "meta", label: "VIEWER" }
}, Ta = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function La({ column: e, children: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: H.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function _g(e) {
  if (!e.matrixRole) return;
  const a = wg[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function vg({ node: e }) {
  const a = _g(e);
  return /* @__PURE__ */ l("span", { className: H.label, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    /* @__PURE__ */ n(fg, { role: a, node: e }),
    /* @__PURE__ */ n(La, { column: Ta[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(La, { column: Ta[1], children: e.people === void 0 ? "" : J(e.people) }),
    /* @__PURE__ */ n(La, { column: Ta[2], children: e.requestedVia ?? "" })
  ] });
}
function fg({ role: e, node: a }) {
  return /* @__PURE__ */ l(T, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function bg({ index: e, depth: a, node: t, expanded: r, leaf: o, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    Ln,
    {
      index: e,
      depth: a,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(vg, { node: t }),
      children: c
    }
  );
}
function Ea({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function pg({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Ea, { className: `${H.webMeta} ${H.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Ea, { className: `${H.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Ea, { className: `${H.webMeta} ${H.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function gg() {
  return /* @__PURE__ */ l("div", { className: H.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: H.webColumns, children: [
      /* @__PURE__ */ n("span", { className: H.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: H.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: H.webVia, children: "Requested via" })
    ] })
  ] });
}
function Ng({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function yg(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function kg({ rows: e, label: a }) {
  return /* @__PURE__ */ l("div", { className: H.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(gg, {}),
    /* @__PURE__ */ n(Bc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      Ln,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(Ng, { row: t }),
        detail: /* @__PURE__ */ n(pg, { row: t }),
        expanded: yg(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function Q1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(kg, { ...e }) : /* @__PURE__ */ n(bg, { ...e });
}
const $g = "_runbook_b9agc_2", Cg = "_list_b9agc_7", Sg = "_step_b9agc_15", Rg = "_numeral_b9agc_21", Tg = "_body_b9agc_28", Lg = "_head_b9agc_34", Eg = "_title_b9agc_40", xg = "_detail_b9agc_45", Ag = "_actions_b9agc_50", qg = "_webList_b9agc_56", Ig = "_webStep_b9agc_60", Mg = "_webBody_b9agc_66", Bg = "_webTitle_b9agc_74", Pg = "_webDetail_b9agc_78", S = {
  runbook: $g,
  list: Cg,
  step: Sg,
  numeral: Rg,
  body: Tg,
  head: Lg,
  title: Eg,
  detail: xg,
  actions: Ag,
  webList: qg,
  webStep: Ig,
  webBody: Mg,
  webTitle: Bg,
  webDetail: Pg
}, ot = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function it(e) {
  return String(e + 1).padStart(2, "0");
}
function Dg({ step: e, index: a, connection: t }) {
  const r = ot[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: S.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.numeral, children: it(a) }),
    /* @__PURE__ */ l("span", { className: S.body, children: [
      /* @__PURE__ */ l("span", { className: S.head, children: [
        /* @__PURE__ */ n("span", { className: S.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        o && e.startedAt && /* @__PURE__ */ n(Ne, { startedAt: e.startedAt, connection: t })
      ] }),
      /* @__PURE__ */ n("span", { className: S.detail, children: e.detail })
    ] })
  ] });
}
function Og({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, o) => /* @__PURE__ */ n(Dg, { step: r, index: o, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function Hg({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ l("li", { className: `${S.step} ${S.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${S.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: it(a) }),
    /* @__PURE__ */ l("span", { className: `${S.body} ${S.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${S.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${S.title} ${S.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...ot[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Ne, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${S.detail} ${S.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function Fg({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(Hg, { step: r, index: o, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function Z1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Fg, { ...e }) : /* @__PURE__ */ n(Og, { ...e });
}
const jg = "_list_1gu6a_2", Wg = "_check_1gu6a_10", zg = "_body_1gu6a_16", Gg = "_text_1gu6a_23", Kg = "_pending_1gu6a_32", Ug = "_measured_1gu6a_37", Fe = {
  list: jg,
  check: Wg,
  body: zg,
  text: Gg,
  pending: Kg,
  measured: Ug
};
function Vg(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function Yg({ check: e }) {
  const a = Vg(e.passed);
  return /* @__PURE__ */ l("li", { className: `${Fe.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(ja, { state: a.state, label: a.label }),
    /* @__PURE__ */ l("span", { className: Fe.body, children: [
      /* @__PURE__ */ n("span", { className: Fe.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ l("span", { className: Fe.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: Fe.measured, children: e.measured })
  ] });
}
function e$({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Fe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Yg, { check: a }, a.text)) });
}
const Xg = "_root_16pdz_2", Jg = "_list_16pdz_9", Qg = "_line_16pdz_16", Zg = "_at_16pdz_43", eN = "_text_16pdz_47", aN = "_foot_16pdz_51", nN = "_idle_16pdz_62", tN = "_caret_16pdz_69", rN = "_jump_16pdz_76", be = {
  root: Xg,
  list: Jg,
  line: Qg,
  at: Zg,
  text: eN,
  foot: aN,
  idle: nN,
  caret: tN,
  jump: rN
}, lN = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Va(e) {
  return Number.isNaN(Date.parse(e)) ? "" : lN.format(new Date(e));
}
const oN = { warn: "warning", ok: "ok" };
function iN({ kind: e }) {
  const a = oN[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function cN({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Va(e)}` });
}
function sN({ connection: e, idleSince: a, last: t, children: r }) {
  const o = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Va(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${be.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${be.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: be.idle, children: i }),
    /* @__PURE__ */ n(cN, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function a$({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const o = N(null), [i, c] = g(0), s = e.at(-1);
  A(() => {
    c(e.length);
  }, [e.length]);
  const u = () => {
    var _;
    const d = o.current;
    if (!d) return;
    d.scrollTop = d.scrollHeight;
    const h = d.querySelectorAll("[data-consline-text]");
    (_ = h.item(h.length - 1)) == null || _.focus();
  };
  return /* @__PURE__ */ l("div", { className: be.root, children: [
    /* @__PURE__ */ n("ol", { className: be.list, ref: o, "aria-live": "off", "aria-label": r, children: e.map((d, h) => /* @__PURE__ */ l("li", { className: `${be.line} ward-consline ward-reveal ward-consline--${d.kind}`, "data-kind": d.kind, "data-revealed": h < i, children: [
      /* @__PURE__ */ n("span", { className: be.at, children: Va(d.at) }),
      /* @__PURE__ */ n(iN, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: be.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${h}`)) }),
    /* @__PURE__ */ n(sN, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${be.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const dN = "_row_11jhe_2", uN = "_head_11jhe_14", hN = "_author_11jhe_20", mN = "_eta_11jhe_25", wN = "_edited_11jhe_26", _N = "_body_11jhe_32", vN = "_reason_11jhe_37", fN = "_actions_11jhe_42", ve = {
  row: dN,
  head: uN,
  author: hN,
  eta: mN,
  edited: wN,
  body: _N,
  reason: vN,
  actions: fN
}, bN = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function pN(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function gN({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function NN({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: ve.reason, id: a, children: e })
  ] });
}
function yN(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function kN(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(gN, { ...e }) : /* @__PURE__ */ n(NN, { reason: e.unavailable, reasonId: e.unavailableId });
}
function n$(e) {
  const { comment: a } = e;
  yN(e);
  const t = k(), r = `${t}-unavailable`, o = bN[a.delivery];
  return /* @__PURE__ */ l("div", { className: `${ve.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: ve.head, children: [
      /* @__PURE__ */ n("span", { className: ve.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: ve.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: ve.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: ve.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: ve.reason, id: t, children: pN(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: ve.actions, children: /* @__PURE__ */ n(kN, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const $N = "_root_c46wj_2", CN = "_attach_c46wj_11", SN = "_actions_c46wj_17", RN = "_reply_c46wj_23", TN = "_replyRow_c46wj_28", LN = "_sendsAs_c46wj_42", We = {
  root: $N,
  attach: CN,
  actions: SN,
  reply: RN,
  replyRow: TN,
  sendsAs: LN
};
function EN({ placeholder: e, asUser: a, onPost: t }) {
  const [r, o] = g(""), i = k();
  return /* @__PURE__ */ l("div", { className: We.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: We.replyRow, children: [
      /* @__PURE__ */ n(E, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: o, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: We.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function t$(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(EN, { ...e }) : /* @__PURE__ */ n(xN, { ...e });
}
function xN({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: o, onDraft: i }) {
  const [c, s] = g("");
  return /* @__PURE__ */ l("div", { className: We.root, children: [
    /* @__PURE__ */ n(E, { kind: "textarea", label: e, value: c, onChange: s }),
    t && /* @__PURE__ */ l("div", { className: We.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      kn,
      {
        label: `Requeue ${r.agent} after posting`,
        consequence: r.consequence,
        checked: r.checked,
        onChange: r.onChange
      }
    ),
    /* @__PURE__ */ l("div", { className: We.actions, children: [
      /* @__PURE__ */ n(v, { variant: "primary", onClick: () => o(a, c), children: `Post as ${a}` }),
      i && /* @__PURE__ */ n(v, { variant: "ghost", onClick: () => i(c), children: "Save draft" })
    ] })
  ] });
}
const AN = "_list_1ih9e_2", qN = "_item_1ih9e_6", IN = "_body_1ih9e_22", MN = "_text_1ih9e_28", BN = "_evidence_1ih9e_37", PN = "_consequence_1ih9e_49", DN = "_note_1ih9e_54", Ie = {
  list: AN,
  item: qN,
  body: IN,
  text: MN,
  evidence: BN,
  consequence: PN,
  note: DN
};
function ON({ criterion: e }) {
  return /* @__PURE__ */ n(Re, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function vn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function HN(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function FN({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Ie.body, children: [
    /* @__PURE__ */ n("span", { className: Ie.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(T, { children: [
      /* @__PURE__ */ n(vn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Ie.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(T, { children: [
      /* @__PURE__ */ n(vn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Ie.consequence, children: HN(e.why) })
    ] })
  ] });
}
function jN({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Ie.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(ON, { criterion: e }),
    /* @__PURE__ */ n(FN, { criterion: e })
  ] });
}
function r$({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Ie.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(jN, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Ie.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const WN = "_list_dwhoz_2", zN = "_rung_dwhoz_6", GN = "_name_dwhoz_18", KN = "_actor_dwhoz_32", la = {
  list: WN,
  rung: zN,
  name: GN,
  actor: KN
}, UN = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function VN({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = UN[e.state];
  return /* @__PURE__ */ l("li", { className: la.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: la.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${la.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function l$({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${la.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(VN, { rung: a }, a.name)) });
}
const YN = "_sheet_1fqco_2", XN = "_title_1fqco_9", JN = "_stage_1fqco_15", QN = "_effects_1fqco_20", ZN = "_effect_1fqco_20", ey = "_numeral_1fqco_31", ay = "_effectText_1fqco_38", ny = "_refusals_1fqco_43", ty = "_reasons_1fqco_52", ry = "_reason_1fqco_52", ly = "_actions_1fqco_62", se = {
  sheet: YN,
  title: XN,
  stage: JN,
  effects: QN,
  effect: ZN,
  numeral: ey,
  effectText: ay,
  refusals: ny,
  reasons: ty,
  reason: ry,
  actions: ly
};
function oy({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function o$({ run: e, effects: a, refusals: t, cost: r, onRequeue: o, onClose: i, returnFocusTo: c }) {
  const s = k(), u = `${s}-refusal`, [d, h] = g(""), _ = t.length > 0;
  return /* @__PURE__ */ n(Qe, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ l("div", { className: se.sheet, children: [
    /* @__PURE__ */ l("h2", { className: se.title, id: s, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: se.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: se.effects, children: a.map((b, x) => /* @__PURE__ */ l("li", { className: se.effect, children: [
      /* @__PURE__ */ n("span", { className: se.numeral, children: String(x + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: se.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      Ri,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(E, { kind: "textarea", label: "Note for the agent", value: d, onChange: h }),
    _ && /* @__PURE__ */ l("div", { className: se.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: se.reasons, children: t.map((b, x) => /* @__PURE__ */ n("li", { className: se.reason, id: x === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: se.actions, children: [
      /* @__PURE__ */ n(oy, { refused: _, reasonId: u, note: d, onRequeue: o }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const iy = "_list_1hvqu_2", cy = "_path_1hvqu_7", sy = "_head_1hvqu_21", dy = "_label_1hvqu_28", uy = "_consequence_1hvqu_35", hy = "_ask_1hvqu_36", je = {
  list: iy,
  path: cy,
  head: sy,
  label: dy,
  consequence: uy,
  ask: hy
}, Pa = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function fn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function bn(e) {
  return e ? "primary" : "secondary";
}
function my({ path: e, primary: a, onChoose: t }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: bn(a), size: "sm", onClick: () => t(e.kind), children: Pa[e.kind] }) : /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(v, { variant: bn(a), size: "sm", disabled: !0, describedBy: r, children: Pa[e.kind] }),
    /* @__PURE__ */ n("span", { className: je.ask, id: r, children: e.askInstead })
  ] });
}
function wy({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: je.path, "data-allowed": e.allowed, "data-role": fn(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: je.head, children: [
      /* @__PURE__ */ n("span", { className: je.label, children: e.title ?? Pa[e.kind] }),
      /* @__PURE__ */ n(m, { role: fn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: je.consequence, children: e.consequence }),
    /* @__PURE__ */ n(my, { path: e, primary: a, onChoose: t })
  ] });
}
function i$({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: je.list, children: e.map((t, r) => /* @__PURE__ */ n(wy, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const _y = "_list_qjv4r_2", vy = "_item_qjv4r_6", fy = "_node_qjv4r_18", by = "_body_qjv4r_24", py = "_head_qjv4r_30", gy = "_stage_qjv4r_36", Ny = "_version_qjv4r_41", yy = "_sentence_qjv4r_49", ky = "_meta_qjv4r_54", pe = {
  list: _y,
  item: vy,
  node: fy,
  body: by,
  head: py,
  stage: gy,
  version: Ny,
  sentence: yy,
  meta: ky
}, $y = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function Cy({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: pe.head, children: [
    /* @__PURE__ */ n("span", { className: pe.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: pe.version, title: e.version, children: e.version }) : null
  ] });
}
function Sy({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${pe.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${pe.node} ward-history-node`, children: /* @__PURE__ */ n(Re, { size: 9, kind: $y[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${pe.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(Cy, { entry: e }),
      /* @__PURE__ */ n("span", { className: pe.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${pe.meta} ward-history-meta`, children: [
        `${le(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ee(e.cost)}`
      ] })
    ] })
  ] });
}
function c$({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${pe.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(Sy, { entry: a }, a.stage + String(t))) });
}
const Ry = "_thread_1kn6s_3", Ty = "_turn_1kn6s_8", Ly = "_who_1kn6s_27", Ey = "_body_1kn6s_32", oa = {
  thread: Ry,
  turn: Ty,
  who: Ly,
  body: Ey
}, ct = Ge(!1);
function s$({ children: e, density: a }) {
  return /* @__PURE__ */ n(ct.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${oa.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function d$({ turn: e }) {
  if (!ze(ct)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${oa.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${oa.who} ward-chat-who`, children: [
      e.author,
      " · ",
      le(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${oa.body} ward-chat-body`, children: e.body })
  ] });
}
const xy = "_list_1rt9c_3", Ay = "_row_1rt9c_7", qy = "_label_1rt9c_20", Iy = "_n_1rt9c_26", My = "_cause_1rt9c_33", Ye = {
  list: xy,
  row: Ay,
  label: qy,
  n: Iy,
  cause: My
};
function By(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Py = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function Dy({ row: e, formatNumber: a }) {
  return By(e), /* @__PURE__ */ l("li", { className: `${Ye.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Re, { size: 8, ...Py[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Ye.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Ye.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(Oy, { cause: e.cause })
  ] });
}
function Oy({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Ye.cause} ward-healthrow-cause`, children: e }) : null;
}
function u$({ rows: e, formatNumber: a = J }) {
  return /* @__PURE__ */ n("ul", { className: `${Ye.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(Dy, { row: t, formatNumber: a }, t.label)) });
}
const Hy = "_root_1jxwp_2", Fy = {
  root: Hy
};
function h$({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: Fy.root, "data-density": o, children: [
    /* @__PURE__ */ n(ka, { items: e, note: a, density: o }),
    /* @__PURE__ */ n(v, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const jy = "_row_dhbre_3", Wy = "_key_dhbre_13", zy = "_stack_dhbre_24", Gy = "_value_dhbre_32", Ky = "_evidence_dhbre_39", Uy = "_mark_dhbre_47", He = {
  row: jy,
  key: Wy,
  stack: zy,
  value: Gy,
  evidence: Ky,
  mark: Uy
};
function Vy({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(ja, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function m$({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${He.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${He.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${He.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${He.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${He.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${He.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(Vy, { state: e.state }) })
  ] });
}
const Yy = "_cell_1monp_2", Xy = {
  cell: Yy
}, Jy = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function Qy(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function Zy(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function ek(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: Qy(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function ak(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function w$({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  Zy(e, t);
  const r = ak(e);
  return /* @__PURE__ */ n(
    Fi,
    {
      label: "Rejection routing",
      columns: Jy,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: Xy.cell, "data-norerun": o.noRerun ? !0 : void 0, children: ek(o, i) }),
      empty: a ?? /* @__PURE__ */ n(fs, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const nk = "_row_ute8v_2", tk = "_title_ute8v_11", rk = "_turns_ute8v_20", lk = "_waiting_ute8v_21", ok = "_resolved_ute8v_22", ik = "_activity_ute8v_23", ck = "_cost_ute8v_29", sk = "_link_ute8v_30", dk = "_tableRow_ute8v_47", uk = "_tableTitle_ute8v_59", hk = "_tableResolved_ute8v_64", mk = "_tableLink_ute8v_68", wk = "_tableMeta_ute8v_83", _k = "_tableCost_ute8v_90", vk = "_tableActivity_ute8v_91", fk = "_tableState_ute8v_101", bk = "_tableRecord_ute8v_112", B = {
  row: nk,
  title: tk,
  turns: rk,
  waiting: lk,
  resolved: ok,
  activity: ik,
  cost: ck,
  link: sk,
  tableRow: dk,
  tableTitle: uk,
  tableResolved: hk,
  tableLink: mk,
  tableMeta: wk,
  tableCost: _k,
  tableActivity: vk,
  tableState: fk,
  tableRecord: bk
}, st = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function pk(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function gk(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function Nk(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const yk = { duplicate: "CLOSED · DUPLICATE" };
function kk({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: B.tableMeta, children: `waiting on ${e}` });
}
function $k({ value: e }) {
  return /* @__PURE__ */ n("td", { className: B.tableCost, children: e === void 0 ? null : ee(e) });
}
function Ck({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: B.tableRecord, href: e.href, children: `→ ${e.key}` });
}
function Sk({ session: e, href: a }) {
  const t = st[e.state];
  return /* @__PURE__ */ l("tr", { className: B.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: B.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: B.tableLink, href: a, children: e.title }),
      /* @__PURE__ */ n("span", { className: B.tableMeta, children: gk(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: B.tableResolved, children: [
      Nk(e.resolved),
      /* @__PURE__ */ n(kk, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n($k, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: B.tableActivity, children: pk(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: B.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: yk[e.state] ?? t.label }),
      /* @__PURE__ */ n(Ck, { link: e.link })
    ] }) })
  ] });
}
function Rk({ session: e }) {
  const a = st[e.state];
  return /* @__PURE__ */ l("div", { className: B.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: B.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: B.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: B.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: B.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: B.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : ee(e.cost) }),
    /* @__PURE__ */ n("span", { className: B.activity, children: le(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: B.link, href: e.link.href, children: e.link.key }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function _$(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(Sk, { session: e.session, href: e.href }) : /* @__PURE__ */ n(Rk, { session: e.session });
}
const Tk = "_block_1yy2v_3", Lk = "_list_1yy2v_9", Ek = "_line_1yy2v_14", Da = {
  block: Tk,
  list: Lk,
  line: Ek
}, xk = { warn: "warning", ok: "ok" };
function Ak({ kind: e }) {
  const a = xk[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function qk({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${Da.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(Ak, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function v$({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Da.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Da.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(qk, { line: t }, `${r}-${t.text}`)) }) });
}
const Ik = "_band_tt7hp_1", Mk = "_head_tt7hp_8", Bk = "_cell_tt7hp_19", Pk = "_index_tt7hp_35", Dk = "_title_tt7hp_42", Ok = "_note_tt7hp_48", Hk = "_cellTitle_tt7hp_53", Fk = "_cellBody_tt7hp_58", jk = "_tag_tt7hp_64", _e = {
  band: Ik,
  head: Mk,
  cell: Bk,
  index: Pk,
  title: Dk,
  note: Ok,
  cellTitle: Hk,
  cellBody: Fk,
  tag: jk
}, pn = 4;
function f$({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== pn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${pn}-cell grid`);
  return /* @__PURE__ */ l("section", { className: _e.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ l("div", { className: _e.head, children: [
      /* @__PURE__ */ n("span", { className: _e.index, children: e }),
      /* @__PURE__ */ n("span", { className: _e.title, children: a }),
      /* @__PURE__ */ n("span", { className: _e.note, children: t })
    ] }),
    r.map((o) => /* @__PURE__ */ l("div", { className: _e.cell, children: [
      /* @__PURE__ */ n("span", { className: _e.cellTitle, children: o.title }),
      /* @__PURE__ */ n("span", { className: _e.cellBody, children: o.body }),
      o.tag !== void 0 && /* @__PURE__ */ n("span", { className: _e.tag, children: o.tag })
    ] }, o.title))
  ] });
}
export {
  a$ as ActivityConsole,
  Eh as AgentCard,
  a1 as AppShell,
  H1 as AppearanceStrip,
  f$ as Band,
  o1 as BarChart,
  Qs as BoardColumn,
  g1 as BoardFootnote,
  N1 as BoardHeader,
  m1 as BoardScroller,
  v as Btn,
  Jk as CHIP_ROLES,
  Qn as CREDENTIAL_COLUMNS,
  l1 as Callout,
  F1 as CapabilityRow,
  d$ as ChatMessage,
  kn as Checkbox,
  m as Chip,
  n$ as ClarificationRow,
  x1 as ClauseRuleRow,
  E1 as ClauseRules,
  Mn as ColourLadder,
  j1 as ComponentRow,
  t$ as Composer,
  k1 as ConfigRow,
  y1 as ConfigRowHead,
  Wa as ConnectionMark,
  s$ as Conversation,
  Ri as CostMeter,
  z1 as CredentialRow,
  W1 as CredentialRowHead,
  r$ as CriteriaList,
  zr as Crumb,
  u$ as DeliveryHealth,
  _1 as DeniedState,
  A1 as DryRunRail,
  fs as EmptyState,
  G1 as EnvCard,
  E as Field,
  w1 as FilteredEmpty,
  u1 as FormStack,
  ka as GateChecklist,
  l$ as GateLadder,
  Fi as Grid,
  I1 as HandoffRuleRow,
  q1 as HandoffRules,
  $1 as ItemDrawer,
  K1 as KeyPanel,
  Rt as LIVE_EVENT_TYPES,
  Qu as LegacyBoardColumn,
  S1 as LegacyBoardHeader,
  R1 as LegacyConfigRow,
  L1 as LegacyItemDrawer,
  Gu as LegacyOverCapNote,
  T1 as LegacyPreviewRail,
  An as LegacyWorkCard,
  Ne as LiveIndicator,
  v1 as LoadFailed,
  p1 as Loading,
  nt as MCP_SERVER_COLUMNS,
  ja as Mark,
  V1 as MarkUpload,
  Re as Marker,
  X1 as McpServerRow,
  Y1 as McpServerRowHead,
  M1 as NewStreamModal,
  gs as OverCapNote,
  Qe as Overlay,
  om as PARTIAL_STEP_REASON,
  tt as POLICY_CHIP_WIDTH,
  c1 as PageFrame,
  r1 as PageHeader,
  J1 as PolicyRow,
  C1 as PreviewRail,
  Ta as ROLE_MATRIX_COLUMNS,
  Un as RULE_ACTIONS,
  Rn as Radio,
  h$ as ReadyChecklist,
  d1 as RecordSection,
  o$ as RequeueSheet,
  i$ as ResolveBlock,
  m$ as ResolvedFieldRow,
  Q1 as RoleMatrixRow,
  w$ as RoutingTable,
  B1 as RuleRow,
  Z1 as RunbookSteps,
  Ct as STREAM_STEPS,
  h1 as SectionBand,
  rc as SectionHeader,
  $n as SegmentedControl,
  _$ as SessionRow,
  t1 as Sidebar,
  P1 as StageColumn,
  c$ as StageHistory,
  s_ as StageListEditor,
  f1 as StaleStrip,
  ga as StatStrip,
  D1 as StreamRow,
  s1 as SubjectRail,
  Me as Switch,
  n1 as Tabs,
  O1 as ToolRow,
  i1 as TopBar,
  Bc as Tree,
  Ln as TreeRow,
  v$ as TypedInputBlock,
  e$ as ValidationList,
  Kk as VisibilityProvider,
  Uk as Visible,
  Xk as WARD_VERSION,
  ya as WorkCard,
  b1 as WriteUnavailableStrip,
  pk as agoSince,
  ft as clock,
  S_ as colourStatus,
  J as count,
  re as duration,
  Oa as elapsed,
  Yk as eventSourceTransport,
  va as isStreamStep,
  fa as isValidatedStreamStep,
  im as ladderValidation,
  Rp as mcpConnectionChip,
  Cp as mcpToolName,
  ee as money,
  he as ms,
  En as ordered,
  gn as ratio,
  wb as restartLabel,
  le as stamp,
  yn as stream,
  Zk as streamChip,
  pa as streamChipProps,
  Se as streamColour,
  Lt as streamHex,
  Qk as streamVars,
  ta as useBorderFlash,
  yt as useFocusTrap,
  e1 as useLiveFeed,
  Vk as useReturnFocus,
  _a as useRovingTabindex,
  Ha as useTicker,
  bt as useVisible,
  j as v,
  U1 as validateMark,
  ba as validatedStep,
  St as validatedStreamSteps
};
