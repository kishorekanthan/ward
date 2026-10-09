import { jsx as n, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as Fn, useContext as Ee, createContext as Me, useCallback as Q, useEffect as R, useState as v, useRef as w, useLayoutEffect as Ya, useId as N, isValidElement as nr, Children as tr, Fragment as rr } from "react";
import { createPortal as lr, flushSync as zn } from "react-dom";
function ce(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const mn = (e) => String(e).padStart(2, "0");
function Xa(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${mn(a % 60)}s` : `${Math.floor(t / 60)}h ${mn(t % 60)}m`;
}
const or = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = or.formatToParts(new Date(e)), t = (r) => {
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
function Wn(e, a) {
  return `${e} / ${a}`;
}
const ir = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function sr(e) {
  return ir.format(new Date(e));
}
const Kn = Me(/* @__PURE__ */ new Set());
function b0({ hidden: e, children: a }) {
  const t = Fn(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Kn.Provider, { value: t, children: a });
}
function cr(e) {
  return !Ee(Kn).has(e);
}
function g0({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(T, { children: cr(e) ? a : t });
}
const dr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function ur(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function mr(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = ur(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function hr(e) {
  return { onKeyDown: Q(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(dr));
      mr(t, e.current, r);
    },
    [e]
  ) };
}
function p0(e, a = !0) {
  R(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const hn = { ArrowUp: -1, ArrowDown: 1 }, wn = { ArrowLeft: -1, ArrowRight: 1 }, wr = (e, a, t) => Math.min(t, Math.max(a, e));
function _r(e, a) {
  if (a !== "horizontal" && e in hn) return hn[e];
  if (a !== "vertical" && e in wn) return wn[e];
}
function Sa({ orientation: e = "both" } = {}) {
  const [a, t] = v(0), r = w(/* @__PURE__ */ new Map()), l = w(!1);
  Ya(() => {
    var g;
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const m = d[0], b = l.current;
    l.current = !1, t(m), b && ((g = r.current.get(m)) == null || g.focus());
  });
  const i = Q((d) => t(d), []), s = Q((d) => {
    var m;
    t(d), (m = r.current.get(d)) == null || m.focus();
  }, []), c = Q(
    (d) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const b = Math.max(0, m.indexOf(a)), g = _r(d.key, e);
      g !== void 0 ? (d.preventDefault(), s(m[wr(b + g, 0, m.length - 1)])) : d.key === "Home" ? (d.preventDefault(), s(m[0])) : d.key === "End" && (d.preventDefault(), s(m[m.length - 1]));
    },
    [a, s, e]
  ), u = Q(
    (d) => ({
      tabIndex: d === a ? 0 : -1,
      ref: (m) => {
        m ? r.current.set(d, m) : (r.current.delete(d), d === a && (l.current = !0));
      },
      onFocus: () => t(d),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: c }, itemProps: u, setActive: i };
}
const y0 = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, N0 = "0.2.0", k0 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], fr = [1, 2, 3, 4, 5, 6], Gn = [1, 2, 3], vr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], W = {
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
    runningTint: "var(--ward-color-runningTint)",
    accentTint: "var(--ward-color-accentTint)",
    console: "var(--ward-color-console)",
    consoleInk: "var(--ward-color-consoleInk)",
    consoleWarn: "var(--ward-color-consoleWarn)",
    consoleOk: "var(--ward-color-consoleOk)",
    consoleFaint: "var(--ward-color-consoleFaint)",
    overcapTint: "var(--ward-color-overcapTint)",
    scrim: "var(--ward-color-scrim)",
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
    series6: "var(--ward-color-series6)",
    selected: "var(--ward-color-selected)",
    link: "var(--ward-color-link)",
    focus: "var(--ward-color-focus)",
    sage: "var(--ward-color-sage)",
    sageTint: "var(--ward-color-sageTint)",
    sageInk: "var(--ward-color-sageInk)",
    peach: "var(--ward-color-peach)",
    peachTint: "var(--ward-color-peachTint)",
    peachInk: "var(--ward-color-peachInk)",
    running: "var(--ward-color-running)",
    waiting: "var(--ward-color-waiting)",
    waitingTint: "var(--ward-color-waitingTint)",
    waitingLine: "var(--ward-color-waitingLine)",
    done: "var(--ward-color-done)",
    doneTint: "var(--ward-color-doneTint)",
    danger: "var(--ward-color-danger)",
    dangerTint: "var(--ward-color-dangerTint)",
    chartBar: "var(--ward-color-chartBar)",
    chartLine: "var(--ward-color-chartLine)",
    chartIdeal: "var(--ward-color-chartIdeal)",
    laneTint: "var(--ward-color-laneTint)",
    gateLaneTint: "var(--ward-color-gateLaneTint)",
    hover: "var(--ward-color-hover)",
    blue: "var(--ward-color-blue)",
    blueSoft: "var(--ward-color-blueSoft)",
    accentPill: "var(--ward-color-accentPill)",
    green: "var(--ward-color-green)",
    greenFill: "var(--ward-color-greenFill)",
    orange: "var(--ward-color-orange)",
    orangeFill: "var(--ward-color-orangeFill)",
    amber: "var(--ward-color-amber)",
    warning: "var(--ward-color-warning)",
    warnInk: "var(--ward-color-warnInk)",
    warnSurface: "var(--ward-color-warnSurface)",
    warnLine: "var(--ward-color-warnLine)",
    red: "var(--ward-color-red)",
    destructive: "var(--ward-color-destructive)",
    deep: "var(--ward-color-deep)"
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
    },
    owed: {
      bg: "var(--ward-chip-owed-bg)",
      fg: "var(--ward-chip-owed-fg)",
      line: "var(--ward-chip-owed-line)"
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
    card: "var(--ward-pad-card)",
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
    lane: "var(--ward-gap-lane)",
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
    effects: "var(--ward-gap-effects)",
    sideInset: "var(--ward-gap-sideInset)"
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
    colourPick: "var(--ward-width-colourPick)",
    iconRail: "var(--ward-width-iconRail)"
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
    target: "var(--ward-height-target)",
    navIcon: "var(--ward-height-navIcon)"
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
  radiusPanel: "var(--ward-radius-panel)",
  border: "var(--ward-border)",
  underline: "var(--ward-underline)",
  focusOffset: "var(--ward-focus-offset)",
  focusRing: "var(--ward-focus-ring)",
  shadow: { overlay: "var(--ward-shadow-overlay)", card: "var(--ward-shadow-card)" },
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
    patience: "var(--ward-motion-patience)",
    running: "var(--ward-motion-running)"
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
  running: 1600,
  heartbeat: 15e3,
  poll: 15e3,
  reconnectMax: 3e4,
  staleAfter: 45e3,
  reconnectBase: 1e3,
  load: 800
};
function Ja(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Ra(e) {
  return fr.includes(e);
}
function Ta(e) {
  return Gn.includes(e);
}
function $0(e) {
  if (!Ra(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function C0(e) {
  if (!Ra(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const br = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function gr(e) {
  if (!Ra(e)) throw new Error("unvalidated stream step");
  return br[e];
}
function _n(e) {
  return typeof e != "string" ? null : vr.includes(e) ? e : null;
}
function pr(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function yr(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Nr(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function kr(e, a, t) {
  const r = pr(e);
  if (r === null) return null;
  const l = _n(t) ?? _n(r.type);
  return l === null ? null : { ...r, type: l, id: yr(r, a), at: Nr(r) };
}
function $r(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function Cr(e, a, t) {
  return e >= we.heartbeat && !a && t !== null;
}
function S0(e, a) {
  const [t, r] = v("reconnecting"), [l, i] = v(null), s = w(/* @__PURE__ */ new Map()), c = w(0), u = w(""), d = w(0), m = w(null), b = w(0), g = w(0), y = w(!1), I = w("reconnecting"), B = Q((S) => {
    I.current = S, r(S);
  }, []), oe = Q(() => {
    c.current = Date.now();
  }, []), Re = Q((S) => {
    for (const [G, be] of s.current)
      (be === "*" || S.itemKey === be) && G(S);
  }, []), ne = Q(() => {
    m.current = a(e, { lastEventId: u.current }, {
      onEvent: (S, G, be) => {
        const je = kr(S, G, be);
        je !== null && (je.id && (u.current = je.id), oe(), y.current = !1, B("live"), i(je.at), Re(je));
      },
      onOpen: () => {
        d.current = 0, y.current = !1, oe(), B("live");
      },
      onError: () => {
        var G;
        (G = m.current) == null || G.close(), m.current = null, y.current = !0, I.current !== "stale" && B("reconnecting");
        const S = Math.min(we.reconnectBase * 2 ** d.current, we.reconnectMax);
        d.current += 1, b.current = window.setTimeout(ne, S);
      }
    });
  }, [Re, B, oe, a, e]), Ke = Q((S) => {
    y.current = !0, S.close(), m.current = null, b.current = window.setTimeout(ne, we.reconnectBase);
  }, [ne]), Ge = Q((S, G) => (s.current.set(G, S), () => {
    s.current.delete(G);
  }), []);
  return R(() => (ne(), g.current = window.setInterval(() => {
    const S = Date.now() - c.current, G = $r(S, I.current);
    G && B(G);
    const be = m.current;
    Cr(S, y.current, be) && Ke(be);
  }, we.tick), () => {
    var S;
    window.clearInterval(g.current), window.clearTimeout(b.current), y.current = !1, (S = m.current) == null || S.close(), m.current = null;
  }), [ne, Ke, B]), { connection: t, lastEventAt: l, subscribe: Ge };
}
function Qa(e, a) {
  const t = new Date(e).getTime(), [r, l] = v(() => Date.now());
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
  }, [a, t]), Math.max(0, r - t);
}
const fn = { blue: "running", orange: "waiting", green: "done" };
function Sr() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function vn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ha(e, a) {
  const t = w(0), r = Q((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (Sr() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${fn[i]})`), s.style.setProperty("--flash", `var(--ward-color-${fn[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => vn(s), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => vn(s), we.flash)));
  }, [a, e]);
  return R(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Rr = "_root_1otpc_2", Tr = {
  root: Rr
};
function xr(e, a, t, r, l) {
  const i = [Xa(a)];
  return e || i.push(`as of ${sr(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Se({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = Qa(e, l), s = (a == null ? void 0 : a.at) ?? e, c = xr(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${Tr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const Lr = "_app_1m4se_1", Ar = "_side_1m4se_30", Ir = "_sideTop_1m4se_42", Er = "_sideBody_1m4se_56", Mr = "_iconRail_1m4se_67", Br = "_railItem_1m4se_76", jr = "_railIcon_1m4se_97", Pr = "_railDot_1m4se_102", qr = "_railLetter_1m4se_108", Dr = "_main_1m4se_113", Hr = "_rail_1m4se_76", Or = "_page_1m4se_131", Fr = "_headerRow_1m4se_140", zr = "_sidebarToggle_1m4se_147", Wr = "_headerSlot_1m4se_152", Kr = "_drawerSide_1m4se_157", Gr = "_root_1m4se_193", Ur = "_topbar_1m4se_200", Vr = "_mark_1m4se_211", Yr = "_brand_1m4se_218", Xr = "_tagline_1m4se_224", Jr = "_identity_1m4se_230", Qr = "_tools_1m4se_231", Zr = "_nav_1m4se_241", el = "_metadata_1m4se_248", al = "_actor_1m4se_263", nl = "_detail_1m4se_264", tl = "_content_1m4se_324", rl = "_toolsPanel_1m4se_340", ll = "_skip_1m4se_366", $ = {
  app: Lr,
  side: Ar,
  sideTop: Ir,
  sideBody: Er,
  iconRail: Mr,
  railItem: Br,
  railIcon: jr,
  railDot: Pr,
  railLetter: qr,
  main: Dr,
  rail: Hr,
  page: Or,
  headerRow: Fr,
  sidebarToggle: zr,
  headerSlot: Wr,
  drawerSide: Kr,
  root: Gr,
  topbar: Ur,
  mark: Vr,
  brand: Yr,
  tagline: Xr,
  identity: Jr,
  tools: Qr,
  nav: Zr,
  metadata: el,
  actor: al,
  detail: nl,
  content: tl,
  toolsPanel: rl,
  skip: ll
}, ol = "_btn_tzr89_2", il = "_primary_tzr89_14", sl = "_destructive_tzr89_25", cl = "_secondary_tzr89_35", dl = "_ghost_tzr89_40", ul = "_overflow_tzr89_49", ml = "_sm_tzr89_56", hl = "_disabled_tzr89_60", ca = {
  btn: ol,
  primary: il,
  destructive: sl,
  secondary: cl,
  ghost: dl,
  overflow: ul,
  sm: ml,
  disabled: hl
};
function wl(e, a, t, r) {
  const l = a === "sm" ? [ca.sm, "ward-btn--sm"] : [], i = t ? [ca.disabled] : [];
  return [ca.btn, ca[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function _l(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function fl(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function vl(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function bl(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function gl(e, a, t) {
  return bl(e.describedBy, a && t);
}
function pl({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function yl(e) {
  return e.children ?? e.label;
}
function f(e) {
  fl(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = vl(e), i = N();
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: wl(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": gl(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ..._l(a, e.controls),
        children: yl(e)
      }
    ),
    /* @__PURE__ */ n(pl, { id: i, reason: l })
  ] });
}
function xa(e) {
  const [a, t] = v(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return R(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (s) => t(s.matches);
    return r.addEventListener("change", l), t(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
const Nl = "_scrim_18idy_2", kl = "_drawer_18idy_10", $l = "_sheet_18idy_14", Cl = "_modal_18idy_18", Sl = "_panel_18idy_23", Rl = "_start_18idy_39", Tl = "_header_18idy_62", xl = "_title_18idy_70", Ll = "_body_18idy_74", Al = "_close_18idy_101", ke = {
  scrim: Nl,
  drawer: kl,
  sheet: $l,
  modal: Cl,
  panel: Sl,
  start: Rl,
  header: Tl,
  title: xl,
  body: Ll,
  close: Al
}, Il = Me(null), va = [], ba = /* @__PURE__ */ new Map();
function El(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Ml(e, a) {
  let t = ba.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ba.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Bl(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !El(r) && Ml(e, r);
}
function jl(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (Bl(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function Pl(e) {
  for (const a of e.claims) {
    const t = ba.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), ba.delete(a)));
  }
}
function ql(e, a) {
  const t = { root: e, claims: [] };
  return va.push(t), jl(t, a), t;
}
function Dl(e) {
  const a = va.indexOf(e);
  a >= 0 && va.splice(a, 1), Pl(e);
}
function bn(e) {
  return e !== null && va.at(-1) === e;
}
function Hl(e, a, t) {
  const r = w(null), l = w(t);
  return l.current = t, R(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = ql(i, a);
    return r.current = c, () => {
      var d, m;
      const u = bn(c);
      Dl(c), r.current = null, u && ((m = (d = l.current ?? s) == null ? void 0 : d.focus) == null || m.call(d));
    };
  }, [a]), Q(() => bn(r.current), []);
}
function Ol(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Fl(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function zl({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${ke.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("header", { className: `${ke.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${ke.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${ke.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Wl(e) {
  return `${ke.scrim} ${ke[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Kl(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ke.panel} ${ke[e]} ward-overlay-panel${t}${r}`;
}
function Gl(e) {
  const a = Ee(Il);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = w(null), t = w(null), r = N(), l = Gl(e.container), i = xa("(min-width: 768px)"), s = Ol(e.kind, i), c = Fl(e, r), u = hr(t), d = Hl(a, l, e.returnFocusTo), m = Q(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return R(() => {
    var b, g;
    d() && ((g = (b = t.current) == null ? void 0 : b.querySelector("button")) == null || g.focus());
  }, [d]), R(() => {
    const b = (g) => {
      g.key === "Escape" && m();
    };
    return document.addEventListener("keydown", b), () => document.removeEventListener("keydown", b);
  }, [m]), lr(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Wl(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: m,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: t,
            id: e.id,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": c.labelledBy,
            "aria-label": c.label,
            className: Kl(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (b) => b.stopPropagation(),
            onKeyDown: (b) => d() && u.onKeyDown(b),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${ke.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(zl, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Ul = /^([a-z][a-z0-9+.-]*):/i, Vl = /* @__PURE__ */ new Set(["http", "https"]), Yl = "#";
function Xl(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = Ul.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function O(e) {
  const a = Xl(e);
  return a === void 0 || Vl.has(a) ? e : Yl;
}
function Jl(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Un(e) {
  const a = Jl(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function oa(e, a, t) {
  R(() => {
    const r = e.current;
    if (!r) return;
    const l = () => {
      const s = Un(r);
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
function Ql(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function Za(e, a, t) {
  Ya(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(t)[a];
    if (!r || !l) return;
    const i = Ql(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), Un(r);
  }, [e, a, t]);
}
const Zl = "_icon_1ylqy_2", eo = {
  icon: Zl
};
function ia({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: eo.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function R0() {
  return /* @__PURE__ */ n(ia, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function T0() {
  return /* @__PURE__ */ o(ia, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function x0() {
  return /* @__PURE__ */ o(ia, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function L0() {
  return /* @__PURE__ */ n(ia, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function ao() {
  return /* @__PURE__ */ o(ia, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const Vn = "ward:sidebar-collapsed", no = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function to() {
  try {
    return window.localStorage.getItem(Vn) === "true";
  } catch {
    return !1;
  }
}
function ro(e) {
  try {
    window.localStorage.setItem(Vn, String(e));
  } catch {
  }
}
function lo(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function oo(e) {
  return e instanceof Element && e.closest(no) !== null;
}
function io(e) {
  return e.key === "[" && !lo(e) && !oo(e.target);
}
function so(e) {
  const [a, t] = v(to), r = () => {
    ro(!a), t(!a);
  };
  return R(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!io(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, a]), { collapsed: a, toggle: r };
}
function co() {
  const e = xa("(max-width: 791.98px)"), a = N(), t = w(null), [r, l] = v(!1);
  return r && !e && l(!1), { narrow: e, open: r, drawerId: a, slotRef: t, toggle: () => l(!r), close: () => l(!1) };
}
function uo({ header: e, label: a, drawer: t }) {
  return t.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: t.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function mo({ sidebar: e, label: a, drawer: t }) {
  var l;
  if (!t.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && t.close();
  };
  return /* @__PURE__ */ n(ea, { kind: "start", id: t.drawerId, title: a, flush: !0, onClose: t.close, returnFocusTo: (l = t.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ n("div", { className: $.drawerSide, onClick: r, children: e }) });
}
function ho(e, a) {
  const t = e !== void 0 && !a, { collapsed: r, toggle: l } = so(t);
  return { enabled: t, collapsed: t && r, toggle: l };
}
function wo({ fold: e }) {
  return e.enabled ? /* @__PURE__ */ n("div", { className: $.sideTop, children: /* @__PURE__ */ o(f, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(ao, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] }) }) : null;
}
function _o({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": Ja(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function fo({ items: e, label: a }) {
  return /* @__PURE__ */ n("nav", { className: $.iconRail, "aria-label": a, children: e.map((t) => /* @__PURE__ */ o("a", { className: $.railItem, href: O(t.href), title: t.label, "aria-current": t.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(_o, { item: t }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t.label })
  ] }, t.id)) });
}
function vo({ sidebar: e, label: a, iconRail: t, fold: r }) {
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(wo, { fold: r }),
    /* @__PURE__ */ n("div", { className: $.sideBody, hidden: r.collapsed, children: e }),
    r.collapsed && /* @__PURE__ */ n(fo, { items: t ?? [], label: a })
  ] });
}
function bo({ sidebar: e, header: a, children: t, rail: r, sidebarLabel: l, iconRail: i }) {
  const s = r != null, c = co(), u = ho(i, c.narrow), d = l ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(s), "data-collapsed": String(u.collapsed), children: [
    !c.narrow && /* @__PURE__ */ n(vo, { sidebar: e, label: d, iconRail: i, fold: u }),
    /* @__PURE__ */ o("main", { className: $.main, children: [
      /* @__PURE__ */ n(uo, { header: a, label: d, drawer: c }),
      /* @__PURE__ */ n("div", { className: $.page, children: t })
    ] }),
    s && /* @__PURE__ */ n("div", { className: $.rail, children: r }),
    /* @__PURE__ */ n(mo, { sidebar: e, label: d, drawer: c })
  ] });
}
function go({ destinations: e, active: a }) {
  const t = w(null);
  return oa(t, e.length), Za(t, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ n("nav", { ref: t, className: $.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ n("a", { href: O(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Fa({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function po({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ n(Fa, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Fa, { value: a, className: $.detail })
  ] });
}
function yo() {
  const e = xa("(max-width: 767.98px)"), a = N(), t = w(null), [r, l] = v(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = t.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function No({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: $.tools, children: /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: $.tools, children: e });
}
function ko({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const t = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: t, children: e });
}
function $o(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ n("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Fa, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ n(go, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: $.identity, children: /* @__PURE__ */ n(po, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(No, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Co(e) {
  const a = N(), t = yo();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n($o, { ...e, menu: t }),
    /* @__PURE__ */ n(ko, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: $.content, children: e.children })
  ] });
}
function So(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function A0(e) {
  return So(e) ? /* @__PURE__ */ n(bo, { ...e }) : /* @__PURE__ */ n(Co, { ...e });
}
function La(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Ro = "_root_197jc_2", To = "_row_197jc_8", xo = "_box_197jc_14", Lo = "_label_197jc_21", Ao = "_lockedNote_197jc_26", Io = "_consequence_197jc_34", Eo = "_sample_197jc_69", De = {
  root: Ro,
  row: To,
  box: xo,
  label: Lo,
  lockedNote: Ao,
  consequence: Io,
  sample: Eo
};
function Mo(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Bo({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${De.consequence} ward-check-consequence`, children: a }) : null;
}
function jo({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${De.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Po({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: De.sample, "aria-hidden": "true", children: e }) : null;
}
function Yn(e) {
  const a = N(), t = e.consequence ? `${a}-note` : void 0, r = Mo(e);
  return /* @__PURE__ */ o("div", { className: `${De.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: De.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${De.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (l) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, l.target.checked));
          },
          "aria-describedby": La(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: De.label, children: [
        e.label,
        /* @__PURE__ */ n(jo, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Po, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Bo, { id: t, text: e.consequence })
  ] });
}
const qo = "_chip_pq6tb_2", Do = {
  chip: qo
}, Ho = {
  gate: W.chip.gate,
  system: W.chip.system,
  write: W.chip.write,
  drift: W.chip.drift,
  done: W.chip.done,
  attention: W.chip.attention,
  failed: W.chip.failed,
  pending: W.chip.pending,
  running: W.chip.running,
  warn: W.chip.warn,
  meta: W.chip.meta,
  soft: W.chip.soft,
  quiet: W.chip.quiet,
  owed: W.chip.owed
};
function Oo(e, a) {
  if (e === "stream") return Fo(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = Ho[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function Fo(e) {
  if (!e || !Ta(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Ja(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Do.chip} ward-chip ward-chip--${e}`, style: Oo(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
const zo = "_clamp_zn74g_3", gn = {
  clamp: zo
};
function Ie({ text: e, as: a = "span", className: t }) {
  return /* @__PURE__ */ n(a, { className: t === void 0 ? gn.clamp : `${gn.clamp} ${t}`, "data-ward-clamp": "", title: e, children: e });
}
function sa(e) {
  return typeof e == "number" && Ta(e) ? e : null;
}
function ve(e, a) {
  const t = sa(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function Aa(e, a) {
  const t = sa(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const Wo = "_nav_8lufj_2", Ko = "_list_8lufj_8", Go = "_item_8lufj_15", Uo = "_link_8lufj_30", Vo = "_sep_8lufj_40", Yo = "_current_8lufj_44", Xo = "_chips_8lufj_48", Pe = {
  nav: Wo,
  list: Ko,
  item: Go,
  link: Uo,
  sep: Vo,
  current: Yo,
  chips: Xo
};
function Jo({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Pe.nav, children: [
    /* @__PURE__ */ n("ol", { className: Pe.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: Pe.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: Pe.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${Pe.link} ward-target`, href: O(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Pe.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Pe.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] }) });
}
function Xn(e, a, t) {
  const r = w(t);
  r.current = t, R(() => {
    if (!e) return;
    const l = (i) => {
      var s;
      (s = a.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, a]);
}
const Qo = 500;
function Jn(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function Qn() {
  const e = w(""), a = w(void 0);
  return R(() => () => clearTimeout(a.current), []), (t) => (clearTimeout(a.current), e.current += t.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, Qo), e.current);
}
const Zo = "_root_glrsq_2", ei = "_trigger_glrsq_7", ai = "_value_glrsq_32", ni = "_menu_glrsq_49", ti = "_find_glrsq_71", ri = "_list_glrsq_85", li = "_option_glrsq_95", oi = "_check_glrsq_114", ii = "_empty_glrsq_125", _e = {
  root: Zo,
  trigger: ei,
  value: ai,
  menu: ni,
  find: ti,
  list: ri,
  option: li,
  check: oi,
  empty: ii
}, si = 7;
function ci(e, a) {
  const t = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(t));
}
function pn(e, a) {
  return Math.max(0, e.findIndex((t) => t.value === a));
}
function di(e, a) {
  const [t, r] = v(e.defaultOpen === !0), [l, i] = v(""), [s, c] = v(() => pn(e.options, e.value)), u = (d) => {
    var m;
    zn(() => r(!1)), d && ((m = a.current) == null || m.focus());
  };
  return {
    open: t,
    query: l,
    active: s,
    entries: ci(e.options, l),
    findable: e.options.length > si,
    show: () => {
      e.disabled || (i(""), c(pn(e.options, e.value)), r(!0));
    },
    close: u,
    to: c,
    pick: (d) => {
      var m;
      d && d.option.value !== e.value && ((m = e.onChange) == null || m.call(e, d.option.value)), u(!0);
    },
    find: (d) => {
      i(d), c(0);
    }
  };
}
function ui(e, a) {
  const t = w(!1);
  return R(() => {
    var r;
    e && t.current && ((r = a.current) == null || r.focus()), t.current = !1;
  }), () => {
    t.current = !0;
  };
}
function mi(e) {
  const a = Qn();
  return (t) => {
    const r = a(t), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function Zn(e) {
  const a = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, a)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function hi(e) {
  return { ...Zn(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function et(e, a, t) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = a[r.key];
    if (!l) return t(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const wi = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function _i(e, a) {
  const t = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : t(),
    onKeyDown: (r) => {
      wi.has(r.key) && (r.preventDefault(), t());
    }
  };
}
function fi({ entry: e, at: a, menu: t, ids: r, value: l }) {
  return /* @__PURE__ */ o(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
      "data-active": a === t.active || void 0,
      className: _e.option,
      onMouseDown: (i) => i.preventDefault(),
      onMouseMove: () => t.to(a),
      onClick: () => t.pick(e),
      children: [
        /* @__PURE__ */ n("span", { className: _e.check, "aria-hidden": "true" }),
        /* @__PURE__ */ n("span", { className: _e.label, children: e.option.label })
      ]
    }
  );
}
function en(e, a) {
  const t = e.entries[e.active];
  return t ? a.option(t.index) : void 0;
}
function vi({ menu: e, ids: a, focusRef: t }) {
  return /* @__PURE__ */ n(
    "input",
    {
      ref: t,
      className: _e.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": a.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": en(e, a),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: et(e, Zn(e), () => {
      })
    }
  );
}
function bi({ props: e, menu: a, ids: t, focusRef: r }) {
  const l = mi(a), i = (s) => {
    Jn(s) && l(s.key);
  };
  return /* @__PURE__ */ o("div", { className: _e.menu, children: [
    a.findable && /* @__PURE__ */ n(vi, { menu: a, ids: t, focusRef: r }),
    /* @__PURE__ */ n(
      "ul",
      {
        ref: a.findable ? void 0 : r,
        id: t.list,
        role: "listbox",
        tabIndex: -1,
        className: _e.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": a.findable ? void 0 : en(a, t),
        onKeyDown: et(a, hi(a), i),
        children: a.entries.map((s, c) => /* @__PURE__ */ n(fi, { entry: s, at: c, menu: a, ids: t, value: e.value }, s.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ n("p", { className: _e.empty, children: "No match" })
  ] });
}
function gi(e, a) {
  const t = e.open ? en(e, a) : void 0;
  R(() => {
    var r, l;
    t && ((l = (r = document.getElementById(t)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [t]);
}
function at(...e) {
  return e.filter(Boolean).join(" ");
}
function pi(e) {
  var a;
  return ((a = e.options.find((t) => t.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function yi({ props: e, menu: a, ids: t, trigger: r, wantFocus: l }) {
  const i = !e.options.some((s) => s.value === e.value);
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: at(_e.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": a.open,
      "aria-controls": a.open ? t.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": La(e["aria-describedby"], t.value),
      "aria-invalid": e["aria-invalid"],
      disabled: e.disabled,
      ..._i(a, l),
      children: /* @__PURE__ */ n("span", { id: t.value, className: _e.value, "data-placeholder": i || void 0, children: pi(e) })
    }
  );
}
function nt(e) {
  const a = N(), t = { list: `${a}-list`, value: `${a}-value`, option: (u) => `${a}-option-${u}` }, r = w(null), l = w(null), i = w(null), s = di(e, l), c = ui(s.open, i);
  return Xn(s.open, r, () => s.close(!1)), gi(s, t), /* @__PURE__ */ o("div", { ref: r, className: at(_e.root, e.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(yi, { props: e, menu: s, ids: t, trigger: l, wantFocus: c }),
    e.name && /* @__PURE__ */ n("input", { type: "hidden", name: e.name, value: e.value }),
    s.open && /* @__PURE__ */ n(bi, { props: e, menu: s, ids: t, focusRef: i })
  ] });
}
const Ni = "_field_djnju_2", ki = "_label_djnju_8", $i = "_labelHidden_djnju_15", Ci = "_control_djnju_25", Si = "_mono_djnju_45", Ri = "_area_djnju_50", Ti = "_invalid_djnju_57", Ae = {
  field: Ni,
  label: ki,
  labelHidden: $i,
  control: Ci,
  mono: Si,
  area: Ri,
  invalid: Ti
}, xi = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, tt = (e) => `${e}-label`;
function Li({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? xi : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function Ai({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n(
    nt,
    {
      id: a.id,
      triggerClassName: t,
      "aria-labelledby": tt(a.id),
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
function Ii({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Ei = { input: Li, select: Ai, textarea: Ii };
function Mi(e, a, t) {
  const r = Ei[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Bi(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": La(r ? t : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function ji(e) {
  const a = e.mono ? [Ae.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Ae.area] : [];
  return [Ae.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Pi(e) {
  return e ? `${Ae.label} ${Ae.labelHidden} ward-field-label` : `${Ae.label} ward-field-label`;
}
function M(e) {
  const a = N(), t = `${a}-msg`, r = Bi(e, a, t), l = ji(e);
  return /* @__PURE__ */ o("div", { className: `${Ae.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: tt(a), className: Pi(e.labelHidden), htmlFor: a, children: e.label }),
    Mi(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Ae.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const qi = "_root_u4xjq_2", Di = "_trigger_u4xjq_9", Hi = "_panel_u4xjq_33", Oi = "_menu_u4xjq_56", Fi = "_group_u4xjq_61", zi = "_heading_u4xjq_66", Wi = "_item_u4xjq_72", Ki = "_separator_u4xjq_98", Gi = "_footer_u4xjq_104", Ce = {
  root: qi,
  trigger: Di,
  panel: Hi,
  menu: Oi,
  group: Fi,
  heading: zi,
  item: Wi,
  separator: Ki,
  footer: Gi
}, rt = Me(null);
function Ui(e, a) {
  const [t, r] = v({ open: e, start: null, request: 0 });
  return {
    ...t,
    show: (l) => r((i) => ({ open: !0, start: l, request: i.request + 1 })),
    close: (l) => {
      var i;
      zn(() => r((s) => ({ ...s, open: !1 }))), l && ((i = a.current) == null || i.focus());
    }
  };
}
const Vi = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Yi(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const t = Vi.get(a.key);
      t && (a.preventDefault(), e.show(t));
    },
    onKeyUp: (a) => {
      a.key === " " && a.preventDefault();
    }
  };
}
function Xi(...e) {
  return e.filter(Boolean).join(" ");
}
function I0(e) {
  const a = N(), t = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = w(null), l = w(null), i = Ui(e.defaultOpen === !0, l);
  return Xn(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: Xi(Ce.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ref: l,
        id: t.buttonId,
        type: "button",
        className: Ce.trigger,
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? t.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Yi(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(rt.Provider, { value: { ...t, popup: i }, children: e.children })
  ] });
}
function Ji(e) {
  let a = 0;
  const t = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(t) } : { kind: "item", row: t(r) });
}
function Qi(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const lt = (e, a) => (e % a + a) % a;
function Je(e, a, t) {
  for (let r = 1; r <= e.length; r++) {
    const l = lt(a + t * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const Zi = (e) => e.split("").every((a) => a === e[0]);
function es(e, a, t) {
  const r = Zi(t), l = r ? t[0] : t, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const u = lt(i + c, e.length);
    if (s(e[u])) return u;
  }
  return -1;
}
function as(e) {
  const a = w([]);
  return {
    items: e,
    refs: a,
    current: () => a.current.indexOf(document.activeElement),
    focus: (t) => {
      var r;
      return (r = a.current[t]) == null ? void 0 : r.focus();
    }
  };
}
function ns(e, a) {
  const { items: t } = e, r = () => {
    var l;
    return (l = e.refs.current[e.current()]) == null ? void 0 : l.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(Je(t, e.current(), 1))],
    ["ArrowUp", () => e.focus(Je(t, e.current(), -1))],
    ["Home", () => e.focus(Je(t, -1, 1))],
    ["End", () => e.focus(Je(t, t.length, -1))],
    ["Escape", () => a.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function ts(e, a) {
  const t = w(!1), r = Qn(), l = ns(e, a), i = (s) => {
    Jn(s) && e.focus(es(e.items, e.current(), r(s.key)));
  };
  return {
    onKeyDown: (s) => {
      s.key === "Tab" && (t.current = !0);
      const c = l.get(s.key);
      if (!c) return i(s);
      s.preventDefault(), s.stopPropagation(), c();
    },
    onKeyUp: (s) => {
      s.key === " " && s.preventDefault();
    },
    onBlur: () => {
      t.current && a.close(!1);
    }
  };
}
function rs(e, a) {
  const { start: t, request: r } = a, l = w(e);
  l.current = e, R(() => {
    const { items: i, focus: s } = l.current;
    t && s(t === "first" ? Je(i, -1, 1) : Je(i, i.length, -1));
  }, [t, r]);
}
function ls({ row: e, nav: a, popup: t }) {
  const { item: r, at: l } = e;
  return {
    onMouseDown: (i) => i.preventDefault(),
    onMouseMove: () => {
      !r.disabled && a.current() !== l && a.focus(l);
    },
    onClick: (i) => {
      var s;
      if (r.disabled) return i.preventDefault();
      (s = r.onSelect) == null || s.call(r), t.close(!0);
    }
  };
}
function ot(e) {
  const { item: a, at: t } = e.row, r = {
    ref: (l) => {
      e.nav.refs.current[t] = l;
    },
    role: "menuitem",
    tabIndex: -1,
    className: Ce.item,
    "aria-disabled": a.disabled ? "true" : void 0,
    ...ls(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ n("a", { href: O(a.href), ...r, children: a.label }) : /* @__PURE__ */ n("button", { type: "button", ...r, children: a.label });
}
function os({ heading: e, rows: a, nav: t, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: Ce.group, children: [
    /* @__PURE__ */ n("div", { id: l, className: Ce.heading, children: e }),
    a.map((i) => /* @__PURE__ */ n(ot, { row: i, nav: t, popup: r }, i.at))
  ] });
}
function is({ block: e, nav: a, popup: t }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: Ce.separator }) : e.kind === "group" ? /* @__PURE__ */ n(os, { heading: e.heading, rows: e.rows, nav: a, popup: t }) : /* @__PURE__ */ n(ot, { row: e.row, nav: a, popup: t });
}
function ss() {
  const e = Ee(rt);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function E0({ entries: e, footer: a, align: t = "start" }) {
  const { popup: r, menuId: l, buttonId: i } = ss(), s = Ji(e), c = as(s.flatMap(Qi).map((d) => d.item)), u = ts(c, r);
  return rs(c, r), /* @__PURE__ */ o("div", { className: Ce.panel, "data-align": t, children: [
    /* @__PURE__ */ n("div", { role: "menu", id: l, "aria-labelledby": i, className: Ce.menu, ...u, children: s.map((d, m) => /* @__PURE__ */ n(is, { block: d, nav: c, popup: r }, m)) }),
    a && /* @__PURE__ */ n("p", { className: Ce.footer, children: a })
  ] });
}
const cs = "_strip_1nfwi_2", ds = "_tab_1nfwi_32", us = "_count_1nfwi_68", ra = {
  strip: cs,
  tab: ds,
  count: us
}, ga = 7;
function ms(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function it(e) {
  return `${ra.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function M0({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > ga) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${ga} — the set is fixed`);
  const i = Sa({ orientation: "horizontal" }), s = ms(e, a);
  R(() => i.setActive(s), [i.setActive, s]);
  const c = w(null);
  return oa(c, e.length), Za(c, s, '[role="tab"]'), /* @__PURE__ */ n(
    "div",
    {
      ref: c,
      className: it(l),
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
          className: `${ra.tab} ward-tab`,
          "aria-selected": u.id === a,
          "aria-controls": `panel-${u.id}`,
          onClick: () => t(u.id),
          ...i.itemProps(d),
          children: [
            u.label,
            u.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: ra.count, children: `· ${u.count}` })
            ] })
          ]
        },
        u.id
      ))
    }
  );
}
function B0({ links: e, active: a, label: t, level: r = 1 }) {
  if (e.length > ga) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ga} — the set is fixed`);
  const l = w(null);
  return oa(l, e.length), Za(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ n("nav", { ref: l, className: it(r), "aria-label": t, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ra.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: ra.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const hs = "_root_v56ff_3", ws = "_segment_v56ff_9", yn = {
  root: hs,
  segment: ws
};
function st({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Sa({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((u) => u.value === a));
  return R(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${yn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: yn.segment,
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
const _s = "_sidebar_s9o1j_3", fs = "_brand_s9o1j_9", vs = "_mark_s9o1j_17", bs = "_word_s9o1j_24", gs = "_nav_s9o1j_30", ps = "_navItem_s9o1j_39", ys = "_footLink_s9o1j_49", Ns = "_group_s9o1j_58", ks = "_groupName_s9o1j_65", $s = "_agents_s9o1j_81", Cs = "_agent_s9o1j_81", Ss = "_root_s9o1j_96", Rs = "_agentTop_s9o1j_105", Ts = "_dot_s9o1j_112", xs = "_agentName_s9o1j_124", Ls = "_agentMeta_s9o1j_138", As = "_foot_s9o1j_49", Is = "_footName_s9o1j_150", Es = "_footLinks_s9o1j_157", Ms = "_linkBrand_s9o1j_184", Bs = "_label_s9o1j_205", js = "_note_s9o1j_210", Ps = "_footer_s9o1j_226", x = {
  sidebar: _s,
  brand: fs,
  mark: vs,
  word: bs,
  nav: gs,
  navItem: ps,
  new: "_new_s9o1j_48",
  footLink: ys,
  group: Ns,
  groupName: ks,
  agents: $s,
  agent: Cs,
  root: Ss,
  agentTop: Rs,
  dot: Ts,
  agentName: xs,
  agentMeta: Ls,
  foot: As,
  footName: Is,
  footLinks: Es,
  linkBrand: Ms,
  label: Bs,
  note: js,
  footer: Ps
};
function qs({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: x.agent,
      href: O(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: x.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: x.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": Ja(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: x.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: x.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Ds({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ n("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: `${x.footLink} ward-target`, href: O(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function Hs({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: x.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: x.brand, children: [
      /* @__PURE__ */ n("span", { className: x.mark }),
      /* @__PURE__ */ n("span", { className: x.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: x.nav, children: a.map((s) => /* @__PURE__ */ n("a", { className: x.navItem, href: O(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: x.group, children: [
      /* @__PURE__ */ o("span", { className: x.groupName, children: [
        t,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: x.new, href: O(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ n(qs, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(Ds, { shared: i })
  ] });
}
function Os(e) {
  return e.destinations ?? e.items ?? [];
}
function Fs({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: x.linkBrand, children: e });
}
function zs({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: x.footer, children: e });
}
function Ws({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: O(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: x.note, children: e.note })
  ] });
}
function Ks(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Fs, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Os(e).map((a) => /* @__PURE__ */ n(Ws, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(zs, { children: e.children })
  ] });
}
function Gs(e) {
  return "agents" in e;
}
function j0(e) {
  return Gs(e) ? /* @__PURE__ */ n(Hs, { ...e }) : /* @__PURE__ */ n(Ks, { ...e });
}
const Us = "_mark_wlgi8_3", Vs = {
  mark: Us
}, Ys = { met: "✓", unmet: "", failed: "✕" };
function an({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Vs.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Ys[e]
    }
  );
}
const Xs = "_marker_br9fi_2", Js = {
  marker: Xs
}, Qs = {
  stream: "var(--stream)",
  green: "var(--ward-color-done)",
  blue: "var(--ward-color-running)",
  orange: "var(--ward-color-waiting)",
  red: "var(--ward-color-danger)",
  amber: "var(--ward-color-waiting)",
  neutral: "var(--ward-color-faint)",
  greenFill: "var(--ward-color-done)",
  orangeFill: "var(--ward-color-waiting)",
  owed: "var(--ward-color-peach)",
  running: "var(--ward-color-running)",
  ok: "var(--ward-color-done)",
  finding: "var(--ward-color-waiting)",
  action: "var(--ward-color-text)",
  hollow: "var(--ward-color-faint)",
  attention: "var(--ward-color-waiting)",
  tick: "var(--ward-color-done)",
  box: "var(--ward-color-line2)"
}, Zs = { running: " ward-running" };
function Be({ size: e, kind: a, label: t }) {
  const r = { "--marker": Qs[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Js.marker} ward-marker ward-marker--${a}${Zs[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const ec = "_root_ti0pq_2", ac = "_chip_ti0pq_11", nc = "_noCase_ti0pq_23", da = {
  root: ec,
  chip: ac,
  noCase: nc
};
function tc(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function nn({ connection: e, since: a, lastEventAt: t }) {
  const r = tc(a, t), l = Qa(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${da.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Be, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${da.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: da.noCase, children: Xa(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${da.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    de(r)
  ] });
}
const rc = "_root_1cvxf_2", lc = "_context_1cvxf_12", oc = "_row_1cvxf_1", ic = "_heading_1cvxf_25", sc = "_headingWrap_1cvxf_33", cc = "_chips_1cvxf_38", dc = "_title_1cvxf_45", uc = "_consequence_1cvxf_55", mc = "_actionsWrap_1cvxf_62", hc = "_actions_1cvxf_62", wc = "_action_1cvxf_62", _c = "_overflowPanel_1cvxf_91", fc = "_measureClip_1cvxf_102", vc = "_measure_1cvxf_102", Y = {
  root: rc,
  context: lc,
  row: oc,
  heading: ic,
  headingWrap: sc,
  chips: cc,
  title: dc,
  consequence: uc,
  actionsWrap: mc,
  actions: hc,
  action: wc,
  overflowPanel: _c,
  measureClip: fc,
  measure: vc
};
function bc({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ n(Ie, { as: "h1", className: Y.title, text: e }) : /* @__PURE__ */ n("h1", { className: Y.title, children: e });
}
function gc({ title: e, consequence: a, consequenceHint: t, density: r }) {
  return /* @__PURE__ */ o("div", { className: Y.heading, children: [
    /* @__PURE__ */ n(bc, { title: e, density: r }),
    a && /* @__PURE__ */ n("p", { className: Y.consequence, title: t, children: a })
  ] });
}
function za({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: Y.action, "data-action": "", children: a }, t));
}
function Nn({ disclosure: e }) {
  return /* @__PURE__ */ n(f, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function pc({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(f, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(Nn, { disclosure: l }) : a ? [/* @__PURE__ */ n(Nn, { disclosure: l }, "more"), /* @__PURE__ */ n(za, { actions: e }, "actions")] : /* @__PURE__ */ n(za, { actions: e });
}
function yc(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Nc({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Y.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(za, { actions: e }) });
}
function kc(e, a) {
  const t = N(), [r, l] = v(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var u, d;
    l(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function $c({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Y.context, children: [
    /* @__PURE__ */ n(Jo, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Y.chips, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] });
}
function Cc(...e) {
  return e.some((a) => a === null);
}
function Sc(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Rc(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + Sc(e);
}
function Tc(e, a, t, r, l) {
  if (l === 0 || Cc(a, t, r)) return !1;
  const [i, s, c] = [a, t, r], u = Math.max(0, e.clientWidth - Rc(e, i));
  return c.offsetWidth > u || s.scrollWidth > s.clientWidth + 1;
}
function xc(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Lc(e) {
  return nr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Ac(e, a) {
  return a.length === 0 && e.length === 1 && Lc(e[0]);
}
function Ic(e, a) {
  const t = w(null), r = w(null), l = w(null), i = w(null), [s, c] = v(!1);
  return R(() => {
    const u = t.current;
    if (!xc(u)) return;
    const d = () => c(Tc(u, r.current, l.current, i.current, e.length)), m = new ResizeObserver(d);
    return m.observe(u), i.current && m.observe(i.current), d(), () => m.disconnect();
  }, [e]), { rowRef: t, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function Ec({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ n("div", { className: Y.measureClip, children: /* @__PURE__ */ o("div", { className: Y.measure, ref: t, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(f, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function Mc({ connection: e }) {
  return e ? /* @__PURE__ */ n(nn, { connection: e.connection, since: e.since }) : null;
}
function P0({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: u, density: d = "page" }) {
  const { rowRef: m, headingRef: b, actionsRef: g, measureRef: y, collapsed: I } = Ic(i, Ac(i, s)), B = s.length > 0, { disclosure: oe, close: Re } = kc(I || B, g), ne = yc(s, i, I, u);
  return /* @__PURE__ */ o("header", { className: Y.root, "data-density": d, children: [
    /* @__PURE__ */ n($c, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Y.row, ref: m, children: [
      /* @__PURE__ */ n("div", { ref: b, className: Y.headingWrap, children: /* @__PURE__ */ n(gc, { title: t, consequence: r, consequenceHint: l, density: d }) }),
      /* @__PURE__ */ o("div", { className: Y.actionsWrap, children: [
        /* @__PURE__ */ n(Mc, { connection: c }),
        /* @__PURE__ */ n("div", { className: Y.actions, ref: g, "data-ward-actions": !0, children: /* @__PURE__ */ n(pc, { actions: i, hasMore: B, collapsed: I, onOverflow: u, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Nc, { actions: ne, disclosure: oe, onEscape: Re }),
    /* @__PURE__ */ n(Ec, { actions: i, hasMore: B, measureRef: y })
  ] });
}
const Bc = "_root_td96x_2", jc = "_body_td96x_16", kn = {
  root: Bc,
  body: jc
};
function q0({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${kn.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ n("div", { className: kn.body, children: t }) });
}
const Pc = "_root_bf1pc_2", qc = "_table_bf1pc_9", Dc = "_caption_bf1pc_14", Hc = "_series_bf1pc_23", Oc = "_category_bf1pc_31", Fc = "_cell_bf1pc_39", zc = "_track_bf1pc_45", Wc = "_lane_bf1pc_52", Kc = "_bar_bf1pc_56", Gc = "_value_bf1pc_63", Uc = "_swatch_bf1pc_70", Vc = "_empty_bf1pc_78", X = {
  root: Pc,
  table: qc,
  caption: Dc,
  series: Hc,
  category: Oc,
  cell: Fc,
  track: zc,
  lane: Wc,
  bar: Kc,
  value: Gc,
  swatch: Uc,
  empty: Vc
}, Yc = "—", $n = 6;
function Xc(e, a) {
  if (a.length < 1 || a.length > $n)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${$n}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function Jc(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function ct(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Qc(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Zc({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = Qc(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ o("span", { className: X.track, children: [
    /* @__PURE__ */ n("span", { className: X.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${X.bar} ward-barchart-bar`, "data-step": t, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: X.value, children: e === null ? l : r(e) })
  ] }) });
}
function ed({ series: e }) {
  return /* @__PURE__ */ n(T, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: X.swatch, "data-step": ct(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function ad({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: X.caption, children: e }),
    /* @__PURE__ */ n("p", { className: X.empty, children: a })
  ] });
}
function nd({ title: e, categories: a, series: t, top: r, format: l = ae, categoryHead: i = "Category", missing: s = Yc }) {
  return /* @__PURE__ */ n("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: X.table, children: [
    /* @__PURE__ */ n("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: X.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(ed, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((c, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: X.category, children: c }),
      t.map((d, m) => /* @__PURE__ */ n(Zc, { value: d.values[u], top: r, step: ct(m, t.length), format: l, missing: s }, d.name))
    ] }, c)) })
  ] }) });
}
function D0(e) {
  Xc(e.categories, e.series);
  const a = Jc(e.series);
  return a === 0 ? /* @__PURE__ */ n(ad, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(nd, { ...e, top: a });
}
const td = "_root_1bfqw_2", rd = "_figure_1bfqw_7", ld = "_of_1bfqw_13", od = "_bar_1bfqw_18", id = "_rows_1bfqw_38", sd = "_row_1bfqw_38", cd = "_label_1bfqw_49", dd = "_amount_1bfqw_54", Te = {
  root: td,
  figure: rd,
  of: ld,
  bar: od,
  rows: id,
  row: sd,
  label: cd,
  amount: dd
};
function ud({ spent: e, ceiling: a, breakdown: t }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Te.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Te.figure} ward-stat-value`, children: [
      re(e),
      " ",
      /* @__PURE__ */ o("span", { className: Te.of, children: [
        "of ",
        re(a)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Te.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${re(e)} of ${re(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    t && /* @__PURE__ */ n("ul", { className: Te.rows, children: t.map((l) => /* @__PURE__ */ o("li", { className: `${Te.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Te.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: Te.amount, children: re(l.amount) })
    ] }, l.label)) })
  ] });
}
const md = "_frame_357zi_2", hd = "_table_357zi_6", wd = "_th_357zi_12", _d = "_td_357zi_13", fd = "_sort_357zi_48", vd = "_row_357zi_60", bd = "_empty_357zi_68", Le = {
  frame: md,
  table: hd,
  th: wd,
  td: _d,
  sort: fd,
  row: vd,
  empty: bd
}, gd = { asc: "ascending", desc: "descending" };
function pd(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return gd[a.direction];
}
function yd(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Le.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Nd(e) {
  return e === void 0 ? void 0 : { width: e };
}
function kd({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Le.th,
      style: Nd(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": pd(e, a),
      children: yd(e, t)
    }
  );
}
function $d({ row: e, props: a }) {
  const t = a.rowId(e), r = (a.lockedIds ?? []).includes(t);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: Le.row,
      "data-selected": t === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ n("td", { className: Le.td, "data-align": l.align, "data-mono": l.mono, "data-drop": l.dropPriority, children: a.renderCell(e, l.key) }, l.key))
    }
  );
}
function Cd({
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
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: Le.empty, children: d }) : /* @__PURE__ */ n("div", { className: Le.frame, children: /* @__PURE__ */ o("table", { className: Le.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Le.head, children: a.map((m) => /* @__PURE__ */ n(kd, { column: m, sort: c, onSort: u }, m.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((m) => /* @__PURE__ */ n($d, { row: m, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: u, empty: d } }, r(m))) })
  ] }) });
}
const Sd = "_list_v0s52_2", Rd = {
  list: Sd
};
function H0({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: Rd.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Td = "_label_1u62a_2", xd = {
  label: Td
};
function O0({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((a) => /* @__PURE__ */ n("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ n("span", { className: xd.label, children: a.header }) }, a.key)) }) });
}
const Ld = "_stack_bp6a0_2", Ad = {
  stack: Ld
};
function F0({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Ad.stack, "data-ward-action-stack": "", children: e });
}
const Id = "_set_1z0sq_2", Ed = "_legend_1z0sq_7", Md = "_row_1z0sq_15", Bd = "_control_1z0sq_20", jd = "_input_1z0sq_26", Pd = "_label_1z0sq_31", qd = "_consequence_1z0sq_36", qe = {
  set: Id,
  legend: Ed,
  row: Md,
  control: Bd,
  input: jd,
  label: Pd,
  consequence: qd
};
function dt({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const u = N(), d = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: qe.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: qe.legend, children: e }),
    a.map((m) => {
      const b = `${d}-${m.value}`, g = m.consequence ? `${b}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: qe.row, children: [
        /* @__PURE__ */ o("span", { className: qe.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: b,
              type: "radio",
              name: d,
              className: qe.input,
              value: m.value,
              checked: t === m.value,
              disabled: l,
              "aria-describedby": La(g, s),
              onChange: () => !l && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: b, className: qe.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ n("p", { id: g, className: `${qe.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const Dd = "_root_s12pg_2", Hd = "_head_s12pg_11", Od = "_note_s12pg_30", Fd = "_index_s12pg_35", zd = "_dot_s12pg_39", Wd = "_counter_s12pg_50", Kd = "_trailing_s12pg_58", He = {
  root: Dd,
  head: Hd,
  note: Od,
  index: Fd,
  dot: zd,
  counter: Wd,
  trailing: Kd
};
function Gd({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("span", { className: `${He.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: He.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ud({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: He.counter, "aria-hidden": "true", children: e }) : null;
}
function Cn({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${He.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: He.head, children: [
      /* @__PURE__ */ n(Gd, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: He.note, children: t }),
    /* @__PURE__ */ n(Ud, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: He.trailing, children: i })
  ] });
}
const Vd = "_strip_ww53x_2", Yd = "_cell_ww53x_7", Xd = "_value_ww53x_12", Jd = "_link_ww53x_29", Qd = "_label_ww53x_49", ze = {
  strip: Vd,
  cell: Yd,
  value: Xd,
  link: Jd,
  label: Qd
};
function Zd(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const ut = (e) => `${ze.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function eu({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: ze.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: ut(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${ze.label} ward-stat-label`, children: e.label })
  ] });
}
function au({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: ze.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: ut(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${ze.link} ward-stat-link`, href: O(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${ze.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Ia({ cells: e, divided: a = !1 }) {
  return Zd(e), /* @__PURE__ */ n("dl", { className: `${ze.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => t.href === void 0 ? /* @__PURE__ */ n(eu, { cell: t }, t.label) : /* @__PURE__ */ n(au, { cell: t, href: t.href }, t.label)) });
}
const nu = "_root_1eb1u_2", tu = "_track_1eb1u_8", ru = "_thumb_1eb1u_46", lu = "_labelHidden_1eb1u_64", ou = "_label_1eb1u_64", iu = "_lockedNote_1eb1u_84", Oe = {
  root: nu,
  track: tu,
  thumb: ru,
  labelHidden: lu,
  label: ou,
  lockedNote: iu
};
function su(e) {
  return e ? `${Oe.label} ${Oe.labelHidden}` : Oe.label;
}
function We({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), u = `${c}switch`, d = l ? !0 : a, m = r || l;
  return /* @__PURE__ */ o("span", { className: `${Oe.root} ward-switchrow`, children: [
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
        className: `${Oe.track} ward-switch`,
        "data-on": d,
        "data-locked": l ? !0 : void 0,
        disabled: m,
        onClick: () => !m && (t == null ? void 0 : t(!d)),
        children: /* @__PURE__ */ n("span", { className: Oe.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: u, className: su(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Oe.lockedNote, children: "always on" })
    ] })
  ] });
}
const cu = "_bar_1vp69_2", du = "_skip_1vp69_11", uu = "_mark_1vp69_22", mu = "_nav_1vp69_30", hu = "_list_1vp69_34", wu = "_select_1vp69_41", _u = "_selectTrigger_1vp69_45", fu = "_dest_1vp69_52", vu = "_actor_1vp69_71", bu = "_actorMark_1vp69_84", gu = "_actorLabel_1vp69_89", pu = "_tagline_1vp69_108", ie = {
  bar: cu,
  skip: du,
  mark: uu,
  nav: mu,
  list: hu,
  select: wu,
  selectTrigger: _u,
  dest: fu,
  actor: vu,
  actorMark: bu,
  actorLabel: gu,
  tagline: pu
};
function yu(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Nu(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function z0({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = Nu(r);
  return /* @__PURE__ */ o("header", { className: ie.bar, children: [
    /* @__PURE__ */ n("a", { className: `${ie.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: ie.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: ie.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: ie.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: ie.list, children: a.map((u) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${ie.dest} ward-target`,
          href: O(u.href),
          "aria-current": u.id === t ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ n(
        nt,
        {
          className: ie.select,
          triggerClassName: ie.selectTrigger,
          "aria-label": "Destination",
          value: t,
          options: a.map((u) => ({ value: u.id, label: u.label })),
          onChange: (u) => i == null ? void 0 : i(u)
        }
      )
    ] }),
    c && /* @__PURE__ */ o("span", { className: ie.actor, children: [
      /* @__PURE__ */ n("span", { className: ie.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: ie.actorMark, "aria-hidden": "true", children: yu(c) })
    ] })
  ] });
}
const ku = "_tree_zzoob_2", $u = "_item_zzoob_6", Cu = "_row_zzoob_10", Su = "_button_zzoob_22", pa = {
  tree: ku,
  item: $u,
  row: Cu,
  button: Su
}, mt = Me(null);
function Ru({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = Sa({ orientation: "vertical" });
  return /* @__PURE__ */ n(mt.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: pa.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const Tu = { ArrowRight: !0, ArrowLeft: !1 };
function Sn(e) {
  return e ? !0 : void 0;
}
function xu(e, a) {
  const t = Tu[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function Lu(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function Au(e) {
  const a = [pa.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Iu(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Eu(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Mu(e) {
  return typeof e == "string" ? e : void 0;
}
function Bu({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function ju({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function ht(e) {
  const a = Ee(mt);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = Iu(e);
  return /* @__PURE__ */ o("li", { className: pa.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Au(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": Sn(e.unresolved),
        "data-inherited": Sn(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${pa.button} ward-treeitem-btn`,
            onClick: () => Lu(e),
            onKeyDown: (r) => xu(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Eu(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Mu(e.label), children: e.label }),
              /* @__PURE__ */ n(Bu, { value: e.detail }),
              /* @__PURE__ */ n(ju, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Pu = "_frame_1fdh9_2", qu = "_subjectRail_1fdh9_22", Du = "_subject_1fdh9_22", Hu = "_rail_1fdh9_42", Ou = "_record_1fdh9_64", Fu = "_recordBody_1fdh9_69", zu = "_stageGrid_1fdh9_118", Wu = "_band_1fdh9_144", Ku = "_bandBody_1fdh9_153", Gu = "_bandActions_1fdh9_158", Uu = "_scroller_1fdh9_166", Vu = "_board_1fdh9_192", Yu = "_laneCount_1fdh9_200", Xu = "_lanes_1fdh9_210", J = {
  frame: Pu,
  subjectRail: qu,
  subject: Du,
  rail: Hu,
  record: Ou,
  recordBody: Fu,
  stageGrid: zu,
  band: Wu,
  bandBody: Ku,
  bandActions: Gu,
  scroller: Uu,
  board: Vu,
  laneCount: Yu,
  lanes: Xu
};
function W0({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: J.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function Rn(e) {
  return e ? "true" : void 0;
}
function K0({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: J.subjectRail, "data-ward-subject-rail": t, "data-ruled": Rn(i), children: [
    /* @__PURE__ */ n("div", { className: J.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: J.rail, "data-sticky": Rn(l), "aria-label": r, children: a })
  ] });
}
function G0({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: J.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(Cn, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: J.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(Cn, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: J.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Ju = "_form_1j8ub_2", Qu = "_fields_1j8ub_9", Zu = "_actions_1j8ub_19", ja = {
  form: Ju,
  fields: Qu,
  actions: Zu
};
function U0({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: ja.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: ja.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: ja.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function V0({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: J.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: J.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: J.bandActions, children: a })
  ] });
}
const em = "(max-width: 767.98px)";
function tn({ label: e, children: a, laneCount: t, onOverflow: r }) {
  const l = w(null);
  oa(l, t ?? tr.count(a), r);
  const i = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { ref: l, className: J.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function am({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = v(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: J.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(M, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(tn, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function nm({ lanes: e, label: a }) {
  const [t, r] = v(!1);
  return /* @__PURE__ */ o("div", { className: J.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: J.laneCount, "data-ward-board-lane-count": "", hidden: !t, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ n(tn, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ n(rr, { children: l.content }, l.id)) })
  ] });
}
function Y0({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = xa(em);
  return t === void 0 ? /* @__PURE__ */ n(tn, { label: a, children: e }) : l ? /* @__PURE__ */ n(am, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(nm, { lanes: t, label: a });
}
function X0({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = w(null), i = Math.max(e, 1);
  oa(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: J.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const tm = "_block_vmwmz_2", rm = "_sentence_vmwmz_15", lm = "_meta_vmwmz_20", om = "_action_vmwmz_25", im = "_strip_vmwmz_29", sm = "_loading_vmwmz_48", cm = "_label_vmwmz_56", dm = "_counter_vmwmz_63", fe = {
  block: tm,
  sentence: rm,
  meta: lm,
  action: om,
  strip: im,
  loading: sm,
  label: cm,
  counter: dm
};
function um({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: fe.action, children: /* @__PURE__ */ n(f, { onClick: e.onClick, children: e.label }) });
}
function Ea({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${fe.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: fe.sentence, children: e }),
    t,
    /* @__PURE__ */ n(um, { action: a })
  ] });
}
function mm(e) {
  return /* @__PURE__ */ n(Ea, { ...e, kind: "ward-emptystate" });
}
function J0({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(Ea, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function Q0(e) {
  return /* @__PURE__ */ n(Ea, { ...e });
}
function Z0({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(Ea, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function eS({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function aS({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function nS({ label: e, startedAt: a }) {
  const t = w(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = v(!1);
  R(() => {
    const s = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = Qa(t.current, r);
  return /* @__PURE__ */ o("div", { className: `${fe.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: fe.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: fe.counter, children: Xa(i) }) : null
  ] });
}
const hm = "_note_cigdt_2", wm = {
  note: hm
};
function _m({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: wm.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const fm = "_card_11u1w_3", vm = "_hit_11u1w_31", bm = "_head_11u1w_44", gm = "_title_11u1w_51", pm = "_meta_11u1w_56", ym = "_fields_11u1w_57", Nm = "_who_11u1w_70", km = "_sep_11u1w_74", $m = "_mono_11u1w_78", Cm = "_field_11u1w_57", Sm = "_last_11u1w_94", Rm = "_reason_11u1w_106", Z = {
  card: fm,
  hit: vm,
  head: bm,
  title: gm,
  meta: pm,
  fields: ym,
  who: Nm,
  sep: km,
  mono: $m,
  field: Cm,
  last: Sm,
  reason: Rm
}, Tm = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function xm(e, a, t) {
  const r = ha(e, "blue"), l = ha(e, "orange"), i = ha(e, "green"), s = w(/* @__PURE__ */ new Set());
  R(() => {
    if (!t) return;
    const c = { blue: r, orange: l, green: i };
    return t.subscribe(a, (u) => {
      if (s.current.has(u.id)) return;
      s.current.add(u.id);
      const d = Tm[u.type];
      d && c[d]();
    });
  }, [r, t, i, a, l]);
}
const Lm = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Am(e, a) {
  return Lm[a](e);
}
function Im({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: Z.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: Z.meta, children: [
    /* @__PURE__ */ n(Ie, { className: Z.who, text: `waits on ${e.run.agent}` }),
    t,
    /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: Z.meta, children: [
    /* @__PURE__ */ n(Ie, { className: Z.who, text: `waits on ${e.waitsOn}` }),
    t,
    /* @__PURE__ */ o("span", { className: Z.mono, children: [
      ce(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Em({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: Z.head, children: [
    e.flagged && /* @__PURE__ */ n(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function Mm({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: Z.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Bm({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: Z.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: Z.field, children: Am(e, t) }, t)) });
}
const Wa = (e) => e ? !0 : void 0;
function jm(e) {
  return { "--stream": ve(e.streamStep, "id") };
}
function Pm(e, a, t) {
  e == null || e(a, t);
}
function qm(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Dm({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: Z.last, "data-stale": Wa(a), children: t }) : null;
}
function Ma(e) {
  const a = e.fields ?? [], t = e.item, r = w(null);
  xm(r, t.key, e.feed);
  const l = qm(e.feed), i = jm(t);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: Z.card,
      style: i,
      "data-selected": Wa(e.selected),
      "data-flagged": Wa(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: Z.hit, onClick: (s) => Pm(e.onOpen, t.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(Em, { item: t }),
        /* @__PURE__ */ n(Ie, { as: "p", className: Z.title, text: t.title }),
        /* @__PURE__ */ n(Im, { item: t, connection: l }),
        /* @__PURE__ */ n(Mm, { reason: t.blockedReason }),
        /* @__PURE__ */ n(Bm, { item: t, fields: a }),
        /* @__PURE__ */ n(Dm, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const Hm = "_column_1j8bi_3", Om = "_head_1j8bi_21", Fm = "_label_1j8bi_30", zm = "_count_1j8bi_39", Wm = "_list_1j8bi_53", na = {
  column: Hm,
  head: Om,
  label: Fm,
  count: zm,
  list: Wm
};
function wt(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Km({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: na.head, children: [
    /* @__PURE__ */ n("h2", { className: na.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: na.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Gm(e) {
  return /* @__PURE__ */ n("div", { className: na.list, role: "list", children: e.rows.map((a, t) => {
    var r;
    return /* @__PURE__ */ n(
      Ma,
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
function Um({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: u }) {
  const d = N(), m = e.cap !== void 0 && a.length > e.cap, b = wt(a, r);
  return /* @__PURE__ */ o("section", { className: na.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(Km, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(Gm, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: b }),
    m && /* @__PURE__ */ n(_m, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Vm = "_foot_cs4jr_2", Ym = "_note_cs4jr_13", Xm = "_link_cs4jr_19", Pa = {
  foot: Vm,
  note: Ym,
  link: Xm
};
function tS({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Pa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Pa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Pa.link} ward-target`, href: O(e), children: "Configure board" })
  ] });
}
const Jm = "_head_1tfi5_3", Qm = "_identity_1tfi5_12", Zm = "_titleRow_1tfi5_18", eh = "_title_1tfi5_18", ah = "_key_1tfi5_35", nh = "_rollup_1tfi5_45", th = "_tools_1tfi5_53", rh = "_swatch_1tfi5_101", lh = "_mark_1tfi5_108", ye = {
  head: Jm,
  identity: Qm,
  titleRow: Zm,
  title: eh,
  key: ah,
  rollup: nh,
  tools: th,
  swatch: rh,
  mark: lh
}, Tn = "initials:";
function oh(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function ih(e) {
  const a = [oh(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function sh(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    ih(e)
  ] });
}
function ch(e) {
  return e.startsWith(Tn) ? e.slice(Tn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function dh({ markRef: e, streamStep: a }) {
  const t = { "--stream": ve(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${ye.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: ch(e) }) : /* @__PURE__ */ n("span", { className: ye.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function uh({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function rS({
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
  return /* @__PURE__ */ o("div", { className: ye.head, children: [
    /* @__PURE__ */ o("div", { className: ye.identity, children: [
      /* @__PURE__ */ o("div", { className: ye.titleRow, children: [
        /* @__PURE__ */ n(dh, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: ye.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: ye.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: ye.rollup, "aria-live": "polite", children: sh(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ye.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(uh, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(f, { onClick: c, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(nn, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const mh = "_head_1sejb_14", hh = "_line_1sejb_15", wh = "_cHandle_1sejb_36", _h = "_cName_1sejb_41", fh = "_nameLine_1sejb_49", vh = "_cLabel_1sejb_56", bh = "_cCap_1sejb_61", gh = "_cShown_1sejb_66", ph = "_name_1sejb_49", yh = "_noCap_1sejb_88", Nh = "_state_1sejb_102", kh = "_handle_1sejb_111", $h = "_sub_1sejb_137", P = {
  head: mh,
  line: hh,
  cHandle: wh,
  cName: _h,
  nameLine: fh,
  cLabel: vh,
  cCap: bh,
  cShown: gh,
  name: ph,
  noCap: yh,
  state: Nh,
  handle: kh,
  sub: $h
}, Ch = "can't be hidden or collapsed", Sh = "terminal · counted, not a column";
function lS() {
  return /* @__PURE__ */ o("div", { className: P.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: P.cHandle }),
    /* @__PURE__ */ n("span", { className: P.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: P.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: P.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: P.cShown, children: "Shown" })
  ] });
}
function Rh(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Th(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function xn(e) {
  return e.gate ? Ch : e.terminal ? Sh : Th(e.agentsMounted);
}
function xh(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Lh({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: P.cName, children: [
    /* @__PURE__ */ o("span", { className: P.nameLine, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    xn(e) && /* @__PURE__ */ n("span", { className: P.sub, children: xn(e) })
  ] });
}
function Ah(e) {
  return e === void 0 ? "" : String(e);
}
function Ih(e) {
  return e === "" ? void 0 : Number(e);
}
function Eh({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: P.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: P.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => xh(t, a),
      children: "⠿"
    }
  ) });
}
function Mh({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${P.cCap} ${P.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: P.cCap, children: /* @__PURE__ */ n(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Ah(a.cap), onChange: (r) => t({ ...a, cap: Ih(r) }) }) });
}
function Bh({ stage: e, config: a, onChange: t }) {
  const r = Rh(e, a.shown), l = e.gate || e.terminal, i = (s) => t({ ...a, shown: s });
  return /* @__PURE__ */ o("span", { className: P.cShown, children: [
    /* @__PURE__ */ n(We, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ n("span", { className: P.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function jh(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function oS({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: P.line, "data-kind": jh(e), children: [
    /* @__PURE__ */ n(Eh, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Lh, { stage: e }),
    /* @__PURE__ */ n("span", { className: P.cLabel, children: /* @__PURE__ */ n(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(Mh, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(Bh, { stage: e, config: a, onChange: t })
  ] });
}
const Ph = "_body_1a4f4_2", qh = "_head_1a4f4_9", Dh = "_summary_1a4f4_19", Hh = "_block_1a4f4_20", Oh = "_actionsBlock_1a4f4_21", Fh = "_title_1a4f4_41", zh = "_note_1a4f4_46", Wh = "_k_1a4f4_51", Kh = "_kv_1a4f4_58", Gh = "_row_1a4f4_64", Uh = "_label_1a4f4_75", Vh = "_value_1a4f4_84", Yh = "_quote_1a4f4_90", Xh = "_actions_1a4f4_21", Jh = "_resolve_1a4f4_103", q = {
  body: Ph,
  head: qh,
  summary: Dh,
  block: Hh,
  actionsBlock: Oh,
  title: Fh,
  note: zh,
  k: Wh,
  kv: Kh,
  row: Gh,
  label: Uh,
  value: Vh,
  quote: Yh,
  actions: Xh,
  resolve: Jh
};
function Qh(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Zh(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function ew(e) {
  const a = sa(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function aw(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(h, { ...Aa(ew(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Qh(e),
    ...Zh(e, a)
  ];
}
function nw({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: q.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: q.k, children: a }),
    e
  ] });
}
function tw({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: q.head, children: [
    /* @__PURE__ */ n(h, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function rw({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: q.block, children: [
    /* @__PURE__ */ n("p", { className: q.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: q.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: q.note, children: e.agentMeta })
  ] }) : null;
}
function iS({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const u = N(), d = aw(e, l);
  return /* @__PURE__ */ n(ea, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: q.body, children: [
    /* @__PURE__ */ n(tw, { item: e }),
    /* @__PURE__ */ o("div", { className: q.summary, children: [
      /* @__PURE__ */ n("h2", { className: q.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: q.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: q.kv, children: d.map(([m, b]) => /* @__PURE__ */ o("div", { className: q.row, children: [
      /* @__PURE__ */ n("dt", { className: q.label, children: m }),
      /* @__PURE__ */ n("dd", { className: q.value, children: b })
    ] }, m)) }),
    /* @__PURE__ */ n(rw, { item: e }),
    /* @__PURE__ */ o("div", { className: q.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: q.actions, children: a }),
      c && /* @__PURE__ */ n("p", { className: q.note, children: c })
    ] }),
    /* @__PURE__ */ n(nw, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const lw = "_root_3azmy_2", ow = "_list_3azmy_7", iw = "_item_3azmy_12", sw = "_box_3azmy_18", cw = "_text_3azmy_23", dw = "_note_3azmy_28", Ue = {
  root: lw,
  list: ow,
  item: iw,
  box: sw,
  text: cw,
  note: dw
};
function Ba({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ o("div", { className: Ue.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ue.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ue.box, children: /* @__PURE__ */ n(an, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Ue.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Ue.note} ward-checklist-note`, children: a })
  ] });
}
const uw = "_rail_znbbp_2", mw = "_k_znbbp_11", hw = "_head_znbbp_19", ww = "_section_znbbp_25", _w = "_card_znbbp_39", fw = "_strip_znbbp_46", vw = "_skeleton_znbbp_60", bw = "_skeletonLabel_znbbp_74", gw = "_bar_znbbp_80", pw = "_note_znbbp_89", me = {
  rail: uw,
  k: mw,
  head: hw,
  section: ww,
  card: _w,
  strip: fw,
  skeleton: vw,
  skeletonLabel: bw,
  bar: gw,
  note: pw
};
function yw(e) {
  return (a) => e == null ? void 0 : e(a);
}
function qa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: me.k, children: e }),
    a
  ] });
}
function Nw({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function kw({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(Um, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function $w(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(kw, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Nw, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function sS(e) {
  const a = yw(e.onOpen), t = wt(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(qa, { title: "Card", children: /* @__PURE__ */ n("div", { className: me.card, children: t && /* @__PURE__ */ n(Ma, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(qa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n($w, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(qa, { title: "Effect of this config", children: /* @__PURE__ */ n(Ba, { items: e.effects, density: "compact" }) })
  ] });
}
function Cw(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Sw(e) {
  return Math.ceil(e.length / 2);
}
function Rw(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function _t(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Tw(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = _t(e);
  l !== void 0 && t(l), r(Rw(e.type));
}
function xw(e, a, t, r, l) {
  R(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Tw(i, t, r, l));
  }, [e, a, t, r, l]);
}
function Lw(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Aw(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Iw(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Ew(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(Sw(a ?? [])) + ")"
  };
}
function Mw(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Bw(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(h, { role: "meta", label: re(e.cost) }) : null;
}
function jw(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(h, { role: "meta", label: e.jiraKey }) : null;
}
function Pw(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Se, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function qw(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function Dw(e, a) {
  return a === void 0 ? e : Cw(e, a.ref);
}
function Hw(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function la(e) {
  return e === !0 ? "true" : void 0;
}
function ft(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = w(null), i = ha(l), s = w(/* @__PURE__ */ new Set()), [c, u] = v(Lw(a));
  xw(e.feed, a.key, s, u, i);
  const d = Aw(a, r), m = Iw(a, t), b = Ew(a, e.fields), g = qw(a, t, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Hw(e),
      className: "ward-workcard",
      "data-flagged": la(a.flagged),
      "data-selected": la(e.selected),
      style: b,
      ref: Dw(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Mw(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(h, { role: d.role, label: d.label }),
          Bw(a, e.fields),
          jw(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Pw(t, c, e.connection, a.changedAt),
          g !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: g, children: g }) : null
        ] })
      ]
    }
  ) });
}
function Ow({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Fw(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function zw(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Ww(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Ow, { count: e.items.length, cap: e.column.cap });
}
function Kw(e, a) {
  return e.roving ?? a;
}
function Gw(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Uw(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    ft,
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
function Vw(e) {
  const a = N(), t = Sa({ orientation: "vertical" }), r = Kw(e, t), l = Fw(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": la(l), "data-gate": la(e.column.gate), children: [
    zw(e.column, e.items.length, a),
    Ww(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Gw(e, t), children: Uw(e, r) })
  ] });
}
function Yw(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function Xw(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Jw(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function cS(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Yw(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Xw(e),
      Jw(e.onConfigure),
      /* @__PURE__ */ n(nn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Qw(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Zw(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(We, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(We, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function e_(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ n(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function dS(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": la(Qw(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Zw(e) }),
    /* @__PURE__ */ n(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(Yn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    e_(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function uS(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(ft, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Vw, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function a_(e, a) {
  const t = _t(e);
  t !== void 0 && a(t);
}
function n_(e, a, t) {
  R(() => {
    if (e != null)
      return e.subscribe(a, (r) => a_(r, t));
  }, [e, a, t]);
}
function t_(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function r_(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function l_(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Se, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function o_(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function mS(e) {
  var s;
  const a = e.item, t = a.run, [r, l] = v((s = a.run) == null ? void 0 : s.lastStep);
  n_(e.feed, a.key, l);
  const i = [...t_(a), ...r_(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      l_(t, r)
    ] }),
    o_(a, e.actions)
  ] });
}
const i_ = "_card_54446_3", s_ = "_head_54446_30", c_ = "_mark_54446_38", d_ = "_name_54446_50", u_ = "_chips_54446_71", m_ = "_description_54446_77", h_ = "_run_54446_82", w_ = "_sep_54446_91", __ = "_facts_54446_96", f_ = "_fact_54446_96", v_ = "_factLabel_54446_109", b_ = "_factValue_54446_113", le = {
  card: i_,
  head: s_,
  mark: c_,
  name: d_,
  chips: u_,
  description: m_,
  run: h_,
  sep: w_,
  facts: __,
  fact: f_,
  factLabel: v_,
  factValue: b_
}, g_ = { live: "done", draft: "running", paused: "meta" };
function p_(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function y_({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ n(h, { role: g_[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function N_({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: le.description, children: e });
}
function k_({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Se, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function $_({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ n("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function C_(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function S_({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": ve(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: p_(s),
      style: c,
      "data-selected": u,
      "data-paused": C_(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ n("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${le.name} ward-rowlink ward-target`, href: O(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(N_, { description: e.description }),
        /* @__PURE__ */ n(k_, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(y_, { versions: e.versions }),
        /* @__PURE__ */ n($_, { facts: i })
      ]
    }
  );
}
const R_ = "_list_4dcyc_2", T_ = "_row_4dcyc_11", x_ = "_head_4dcyc_23", L_ = "_id_4dcyc_30", A_ = "_lock_4dcyc_35", I_ = "_reason_4dcyc_41", E_ = "_remove_4dcyc_46", M_ = "_clauses_4dcyc_50", B_ = "_clause_4dcyc_50", j_ = "_label_4dcyc_64", P_ = "_cell_4dcyc_71", q_ = "_value_4dcyc_76", se = {
  list: R_,
  row: T_,
  head: x_,
  id: L_,
  lock: A_,
  reason: I_,
  remove: E_,
  clauses: M_,
  clause: B_,
  label: j_,
  cell: P_,
  value: q_
}, vt = Me(!1);
function hS({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(vt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: se.list, "aria-label": a, children: e }) });
}
function D_({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: se.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function H_({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: se.lock, children: [
    /* @__PURE__ */ n(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: se.reason, children: e })
  ] });
}
function O_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: se.head, children: [
    /* @__PURE__ */ n("span", { className: se.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(H_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: se.remove, children: /* @__PURE__ */ o(f, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Ln(e, a) {
  return e.locked ? void 0 : a;
}
function wS({ rule: e, onChange: a, onRemove: t }) {
  if (!Ee(vt)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Ln(e, a);
  return /* @__PURE__ */ o("li", { className: se.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(O_, { rule: e, onRemove: Ln(e, t) }),
    /* @__PURE__ */ n("dl", { className: se.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: se.clause, children: [
      /* @__PURE__ */ n("dt", { className: se.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: se.cell, children: /* @__PURE__ */ n(D_, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const F_ = "_ladder_n8eeo_2", z_ = "_cell_n8eeo_7", W_ = "_empty_n8eeo_26", K_ = "_name_n8eeo_34", G_ = "_holder_n8eeo_40", U_ = "_request_n8eeo_46", V_ = "_swatches_n8eeo_51", Y_ = "_swatch_n8eeo_51", X_ = "_tilesFrame_n8eeo_78", J_ = "_tiles_n8eeo_78", Q_ = "_tile_n8eeo_78", Z_ = "_bar_n8eeo_117", ef = "_hex_n8eeo_128", af = "_note_n8eeo_138", A = {
  ladder: F_,
  cell: z_,
  empty: W_,
  name: K_,
  holder: G_,
  request: U_,
  swatches: V_,
  swatch: Y_,
  tilesFrame: X_,
  tiles: J_,
  tile: Q_,
  bar: Z_,
  hex: ef,
  note: af
}, _S = "not validated yet, pending a CVD matrix and dark stepping";
function nf(e) {
  return e.reserved ? "reserved" : Ta(e.step) ? "validated" : "partial";
}
function bt(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function tf(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function rf({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Be, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function lf(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function of(e, a, t) {
  return {
    "aria-checked": a,
    "aria-disabled": t || void 0,
    tabIndex: t ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const An = (e) => String(e).padStart(2, "0");
function sf(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? bt(e, void 0);
}
function cf({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${A.hex} ward-ladder-hex`, children: r ? `step ${An(e)}` : gr(e) }),
    /* @__PURE__ */ n("span", { className: `${A.note} ward-ladder-note`, children: r ? t : `Step ${An(e)} · ${t}` })
  ] });
}
function df({ step: e, value: a, taken: t, onChange: r, presentation: l, disabled: i }) {
  const s = nf(e), c = bt(s, t), u = c !== "free", d = u || i, m = a === e.step, b = e.name ?? `Step ${e.step}`, g = () => {
    d || r(e.step);
  }, y = `${b} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...of(u, m, d), "data-validation": s, style: tf(e, s), onClick: g, onKeyDown: (B) => lf(B, g) }, label: y, name: b, holder: c, validation: s, note: sf(s, t, m), step: e.step };
}
const uf = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${A.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${A.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(cf, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${A.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(rf, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${A.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${A.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function mf(e) {
  return uf[e.presentation](df(e));
}
function hf(e) {
  for (const a of e)
    if (!a.reserved && !Ra(a.step)) throw new Error("colour ladder renders token steps only");
}
function wf() {
  return /* @__PURE__ */ o("div", { className: `${A.cell} ward-ladder-cell ${A.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${A.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${A.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function _f(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const ff = { list: A.ladder, swatches: A.swatches, tiles: A.tilesFrame };
function vf() {
  return /* @__PURE__ */ o("div", { className: `${A.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${A.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${A.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const bf = { list: wf, swatches: () => null, tiles: vf };
function gf(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function gt(e) {
  const a = e.takenBy ?? {}, t = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  hf(e.steps);
  const r = _f(e), l = bf[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(mf, { step: s, value: e.value, taken: a[s.step], onChange: t, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...gf(e.disabled === !0), className: `${ff[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: A.tiles, children: i }) : i });
}
const pf = "_rail_s06lm_2", yf = "_section_s06lm_12", Nf = "_sectionFlush_s06lm_22", kf = "_head_s06lm_26", $f = "_headLabel_s06lm_34", Cf = "_sample_s06lm_42", Sf = "_sampleLabel_s06lm_47", Rf = "_sampleTitle_s06lm_54", Tf = "_sampleMeta_s06lm_59", xf = "_trace_s06lm_65", Lf = "_traceHead_s06lm_70", Af = "_steps_s06lm_78", If = "_step_s06lm_78", Ef = "_stepTitle_s06lm_97", Mf = "_hollow_s06lm_107", Bf = "_stepBody_s06lm_115", jf = "_stepDetail_s06lm_127", Pf = "_publish_s06lm_132", qf = "_reason_s06lm_138", Df = "_note_s06lm_143", Hf = "_reveal_s06lm_148", k = {
  rail: pf,
  section: yf,
  sectionFlush: Nf,
  head: kf,
  headLabel: $f,
  sample: Cf,
  sampleLabel: Sf,
  sampleTitle: Rf,
  sampleMeta: Tf,
  trace: xf,
  traceHead: Lf,
  steps: Af,
  step: If,
  stepTitle: Ef,
  hollow: Mf,
  stepBody: Bf,
  stepDetail: jf,
  publish: Pf,
  reason: qf,
  note: Df,
  reveal: Hf
}, In = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Of = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Ff = { ok: "greenFill", finding: "orangeFill", action: "blue" }, zf = { notSimulated: "not simulated", running: "running" };
function Wf(e) {
  return e.presentation === "foundry";
}
function Kf(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Gf(e, a) {
  var r;
  const t = Of[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Uf(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Vf(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Yf(e) {
  if (Uf(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Xf(e) {
  const [a, t] = v(!1);
  R(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Jf(e) {
  const a = zf[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Be, { size: 6, kind: Ff[e.kind], label: e.kind });
}
function Qf(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Zf(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function ev(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Xf, { kind: a.kind, children: [
    /* @__PURE__ */ n(Jf, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Qf, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Zf, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function av(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(ce(a)), t.join(" · ");
}
function pt(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ n("p", { className: k.traceHead, id: a, children: av(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(ev, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function nv(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ o("div", { className: `${k.sample} ${k.section}`, children: [
    /* @__PURE__ */ n("p", { className: k.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ o("p", { className: k.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ o("p", { className: k.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function tv(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function rv(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Wn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: k.sectionFlush, children: /* @__PURE__ */ n(Ia, { divided: !0, cells: a }) });
}
function lv(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Wn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function ov(e) {
  const a = lv(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: k.sectionFlush, children: /* @__PURE__ */ n(Ia, { divided: !0, cells: a }) });
}
function yt(e) {
  const a = N();
  return e.reason !== null ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("p", { className: `${k.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(f, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(f, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function iv(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ n(yt, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: k.note, children: e.note })
  ] });
}
function sv(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ n(yt, { reason: e.reason, onPublish: e.onPublish }) });
}
function Nt(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(h, { role: In[e.run.status].role, label: In[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function cv(e, a) {
  const [t, r] = v(e.steps);
  return R(() => r(e.steps), [e.steps]), R(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [a, e.status]), t;
}
function dv(e) {
  var t;
  Vf(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Nt, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(nv, { sample: e.run.sample }),
    /* @__PURE__ */ n(pt, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(rv, { run: e.run }),
    /* @__PURE__ */ n("div", { className: k.section, children: /* @__PURE__ */ n(Ba, { items: e.checklist }) }),
    /* @__PURE__ */ n(iv, { reason: Kf(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function uv(e) {
  var r;
  const a = cv(e.run, e.feed);
  Yf(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Nt, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(tv, { sample: e.run.sample }),
    /* @__PURE__ */ n(pt, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(ov, { run: e.run }),
    /* @__PURE__ */ n("div", { className: k.section, children: /* @__PURE__ */ n(Ba, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(sv, { reason: Gf(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function fS(e) {
  return Wf(e) ? /* @__PURE__ */ n(uv, { ...e }) : /* @__PURE__ */ n(dv, { ...e });
}
const mv = "_list_142ip_3", hv = "_row_142ip_9", wv = "_condition_142ip_18", _v = "_action_142ip_24", wa = {
  list: mv,
  row: hv,
  condition: wv,
  action: _v
}, kt = Me(!1);
function vS({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(kt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: wa.list, "aria-label": a, children: e }) });
}
function bS({ rule: e }) {
  if (!Ee(kt)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: wa.row, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: wa.condition, children: e.when }),
    /* @__PURE__ */ n(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: wa.action, children: e.then })
  ] });
}
const fv = "_move_tmppt_3", vv = {
  move: fv
};
function Ka(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(t, 0, l), r;
}
function $t(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Ct(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function En(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function bv(e) {
  return e === "up" ? "down" : "up";
}
function gv(e, a) {
  const t = En(e, a.id, a.direction) ?? En(e, a.id, bv(a.direction));
  t == null || t.focus();
}
function St() {
  const e = w(null), [a, t] = v(null), [r, l] = v("");
  return R(() => {
    e.current !== null && a !== null && gv(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    t(s), l(c);
  } };
}
function Rt({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ya({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${vv.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const pv = "_body_1jd1i_2", yv = "_title_1jd1i_8", Nv = "_section_1jd1i_13", kv = "_legend_1jd1i_18", $v = "_stages_1jd1i_26", Cv = "_stage_1jd1i_26", Sv = "_stageIndex_1jd1i_44", Rv = "_stageName_1jd1i_50", Tv = "_footer_1jd1i_59", xv = "_note_1jd1i_66", Lv = "_reason_1jd1i_71", Av = "_actions_1jd1i_76", Iv = "_webHead_1jd1i_83", Ev = "_kicker_1jd1i_92", Mv = "_webTitle_1jd1i_99", Bv = "_webBody_1jd1i_105", jv = "_webSection_1jd1i_109", Pv = "_sectionHead_1jd1i_121", qv = "_sectionNote_1jd1i_129", Dv = "_formLabel_1jd1i_134", Hv = "_identityRow_1jd1i_139", Ov = "_nameCell_1jd1i_145", Fv = "_keyCell_1jd1i_150", zv = "_colourCell_1jd1i_154", Wv = "_colourStatus_1jd1i_161", Kv = "_webStages_1jd1i_166", Gv = "_webStageList_1jd1i_172", Uv = "_webStage_1jd1i_166", Vv = "_webIndex_1jd1i_191", Yv = "_webStageName_1jd1i_196", Xv = "_webMoves_1jd1i_201", Jv = "_addStage_1jd1i_215", Qv = "_addStageButton_1jd1i_223", Zv = "_addStageNote_1jd1i_231", eb = "_webFooter_1jd1i_236", ab = "_webFooterNotes_1jd1i_244", nb = "_webNote_1jd1i_251", _ = {
  body: pv,
  title: yv,
  section: Nv,
  legend: kv,
  stages: $v,
  stage: Cv,
  stageIndex: Sv,
  stageName: Rv,
  footer: Tv,
  note: xv,
  reason: Lv,
  actions: Av,
  webHead: Iv,
  kicker: Ev,
  webTitle: Mv,
  webBody: Bv,
  webSection: jv,
  sectionHead: Pv,
  sectionNote: qv,
  formLabel: Dv,
  identityRow: Hv,
  nameCell: Ov,
  keyCell: Fv,
  colourCell: zv,
  colourStatus: Wv,
  webStages: Kv,
  webStageList: Gv,
  webStage: Uv,
  webIndex: Vv,
  webStageName: Yv,
  webMoves: Xv,
  addStage: Jv,
  addStageButton: Qv,
  addStageNote: Zv,
  webFooter: eb,
  webFooterNotes: ab,
  webNote: nb
}, tb = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Tt = "not in catalogue";
function rb(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${Tt}` }, ...t];
}
function lb({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Tt}`;
  return /* @__PURE__ */ n(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: rb(t, e.name), invalid: i, onChange: r });
}
function xt(e, a) {
  return e.name || `stage ${a + 1}`;
}
function ob(e) {
  const a = w([]), t = w(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function ib({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = xt(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${_.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: _.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: _.webStageName, children: /* @__PURE__ */ n(lb, { stage: a, index: t, catalogue: l, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(M, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: tb, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ o("span", { className: _.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ya, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      t < r - 1 && /* @__PURE__ */ n(ya, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function sb({ stages: e, onChange: a, catalogue: t }) {
  const r = ob(e.length), l = St(), i = (c, u) => {
    const d = $t(c, u);
    r.current = Ka(r.current, c, d), l.moved({ id: r.current[d], direction: u }, Ct(xt(e[c], c), d, e.length)), a(Ka(e, c, d));
  }, s = (c, u) => a(e.map((d, m) => m === c ? u : d));
  return /* @__PURE__ */ o("div", { className: _.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: _.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, u) => /* @__PURE__ */ n(ib, { id: r.current[u], stage: c, index: u, total: e.length, catalogue: t, onReplace: (d) => s(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(Rt, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: _.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: _.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: _.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const cb = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], db = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], ub = "A new stream starts as a draft. Nothing runs on it until you publish it.", mb = "Create is disabled: name the stream and give it a key first.", hb = "reorder with the ↑ ↓ buttons · min 2";
function rn(e, a) {
  return !e.reserved && Ta(e.step) && a[e.step] === void 0;
}
function wb(e, a) {
  const t = e.find((r) => rn(r, a));
  return t ? t.step : 1;
}
function _b({ stages: e, onMove: a }) {
  const t = St(), r = (l, i) => {
    const s = $t(l, i);
    t.moved({ id: e[l].id, direction: i }, Ct(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: _.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: _.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: _.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: _.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(h, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(ya, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ya, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(Rt, { text: t.announcement })
  ] });
}
function fb({ reason: e, onCreate: a, onDraft: t }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: _.footer, children: [
    /* @__PURE__ */ n("p", { className: _.note, children: ub }),
    e && /* @__PURE__ */ n("p", { className: _.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: _.actions, children: [
      /* @__PURE__ */ n(f, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(f, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function vb(e, a) {
  return e !== "" && a !== "" ? null : mb;
}
function bb(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = db, onCreate: i, onDraft: s, onClose: c, returnFocusTo: u } = e, d = N(), [m, b] = v(""), [g, y] = v(""), [I, B] = v(a[0].value), [oe, Re] = v(() => wb(t, r)), [ne, Ke] = v(e.stages ?? cb), [Ge, S] = v(l[0].value), G = { name: m, key: g, streamStep: oe, owner: I, stages: ne, policy: Ge }, be = vb(m, g);
  return /* @__PURE__ */ n(ea, { kind: "modal", labelledBy: d, onClose: c, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: _.body, children: [
    /* @__PURE__ */ n("h2", { className: _.title, id: d, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Identity" }),
      /* @__PURE__ */ n(M, { kind: "input", label: "Stream name", value: m, onChange: b }),
      /* @__PURE__ */ n(M, { kind: "input", label: "Key", value: g, onChange: y, mono: !0 }),
      /* @__PURE__ */ n(M, { kind: "select", label: "Owner", value: I, onChange: B, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Colour" }),
      /* @__PURE__ */ n(gt, { label: "Stream colour", steps: t, value: oe, onChange: Re, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Stages" }),
      /* @__PURE__ */ n(_b, { stages: ne, onMove: (je, ar) => Ke(Ka(ne, je, ar)) })
    ] }),
    /* @__PURE__ */ n(dt, { legend: "Loop policy", options: l, value: Ge, onChange: S }),
    /* @__PURE__ */ n(fb, { reason: be, onCreate: () => i(G), onDraft: () => s(G) })
  ] }) });
}
const Lt = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], gb = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function pb(e, a, t, r, l, i) {
  var c;
  const s = ((c = Lt.find((u) => u.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: s, stages: i };
}
function yb(e, a) {
  return Nb(e) && kb(e, a) && $b(e);
}
function Nb(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function kb(e, a) {
  return e.colourStep === null || rn({ step: e.colourStep }, a);
}
function $b(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Cb(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : rn({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Sb({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: _.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: _.webNote, children: "Add a stage an agent can run on." });
}
function Rb({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: _.webFooter, children: [
    /* @__PURE__ */ o("div", { className: _.webFooterNotes, children: [
      /* @__PURE__ */ n(Sb, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: _.reason, children: gb })
    ] }),
    l && /* @__PURE__ */ n(f, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(f, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Tb({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: _.webHead, children: [
    /* @__PURE__ */ n("span", { className: _.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: _.webTitle, children: "New stream" })
  ] });
}
function xb({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: _.webSection, children: [
    /* @__PURE__ */ n("h3", { className: _.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: _.identityRow, children: [
      /* @__PURE__ */ n("div", { className: _.nameCell, children: /* @__PURE__ */ n(M, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: _.keyCell, children: /* @__PURE__ */ n(M, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function Lb(e) {
  const a = N(), t = N(), r = e.takenBy ?? {}, [l, i] = v(""), [s, c] = v(""), [u, d] = v(e.owners[0] ?? ""), [m, b] = v(null), [g, y] = v("relay"), [I, B] = v([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = pb(l, s, u, m, g, I), Re = yb(oe, r), ne = I.find((S) => S.kind === "agent" && S.name.trim() !== ""), Ke = /* @__PURE__ */ o("div", { className: _.colourCell, children: [
    /* @__PURE__ */ n("span", { className: _.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(gt, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: b, takenBy: r })
  ] }), Ge = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("p", { className: _.colourStatus, "data-colour-status": "", children: Cb(m, r) }),
    /* @__PURE__ */ n(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map((S) => ({ value: S, label: S })), onChange: d })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Tb, { titleId: t }),
    /* @__PURE__ */ o("div", { className: _.webBody, children: [
      /* @__PURE__ */ n(xb, { name: l, setName: i, streamKey: s, setKey: c, colour: Ke, owner: Ge }),
      /* @__PURE__ */ o("section", { className: _.webSection, children: [
        /* @__PURE__ */ o("div", { className: _.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: _.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: _.sectionNote, children: hb })
        ] }),
        /* @__PURE__ */ n(sb, { stages: I, onChange: B })
      ] }),
      /* @__PURE__ */ n("section", { className: _.webSection, children: /* @__PURE__ */ n(dt, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: g, options: Lt, onChange: y }) }),
      /* @__PURE__ */ n(Rb, { ready: Re, draft: oe, agentStage: ne, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function gS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Lb, { ...e }) : /* @__PURE__ */ n(bb, { ...e });
}
const Ab = "_row_bs8hc_2", Ib = "_cell_bs8hc_6", Eb = "_condition_bs8hc_11", Mb = "_action_bs8hc_18", Bb = "_contract_bs8hc_24", jb = "_contractCondition_bs8hc_33", Pb = "_contractAction_bs8hc_39", ee = {
  row: Ab,
  cell: Ib,
  condition: Eb,
  action: Mb,
  contract: Bb,
  contractCondition: jb,
  contractAction: Pb
}, At = ["advance", "block", "escalate", "requestReview"], Mn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Na(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function ln(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: ee.action, children: Mn[e.then] }) : /* @__PURE__ */ n(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: At.map((l) => ({ value: l, label: Mn[l] }))
    }
  );
}
function qb({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: ee.row, children: [
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n("span", { className: ee.condition, title: Na(e, r), children: Na(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: ln(e, a, t) })
  ] });
}
function Db({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: ee.row, children: [
    /* @__PURE__ */ o("td", { className: ee.cell, children: [
      /* @__PURE__ */ n(h, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ee.condition, children: Na(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: ln(e, a, t) })
  ] });
}
function Hb({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: ee.contract, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ee.contractCondition, children: Na(e, r) }),
    /* @__PURE__ */ n(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ee.contractAction, children: ln(e, a, t, !0) })
  ] });
}
const Ob = { two: Db, four: qb, contract: Hb };
function pS(e) {
  var t;
  if (!At.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Ob[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const Fb = "_column_11id3_2", zb = "_head_11id3_17", Wb = "_index_11id3_23", Kb = "_name_11id3_29", Gb = "_meta_11id3_38", Ub = "_mono_11id3_43", Vb = "_gate_11id3_50", Yb = "_reviewersLabel_11id3_57", Xb = "_reviewers_11id3_57", Jb = "_reviewer_11id3_57", Qb = "_agents_11id3_74", Zb = "_workflowColumn_11id3_79", eg = "_workflowHead_11id3_96", ag = "_stageRow_11id3_102", ng = "_stageLabel_11id3_109", tg = "_workflowTitle_11id3_116", rg = "_workflowMeta_11id3_122", lg = "_workflowGate_11id3_127", og = "_gateNote_11id3_135", ig = "_cardNote_11id3_140", sg = "_reviewerList_11id3_145", cg = "_reviewerRow_11id3_151", dg = "_reviewerMark_11id3_157", ug = "_reviewerName_11id3_167", mg = "_terminalCard_11id3_173", hg = "_terminalCount_11id3_182", wg = "_workflowAgents_11id3_188", _g = "_mount_11id3_194", C = {
  column: Fb,
  head: zb,
  index: Wb,
  name: Kb,
  meta: Gb,
  mono: Ub,
  gate: Vb,
  reviewersLabel: Yb,
  reviewers: Xb,
  reviewer: Jb,
  agents: Qb,
  workflowColumn: Zb,
  workflowHead: eg,
  stageRow: ag,
  stageLabel: ng,
  workflowTitle: tg,
  workflowMeta: rg,
  workflowGate: lg,
  gateNote: og,
  cardNote: ig,
  reviewerList: sg,
  reviewerRow: cg,
  reviewerMark: dg,
  reviewerName: ug,
  terminalCard: mg,
  terminalCount: hg,
  workflowAgents: wg,
  mount: _g
}, fg = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function on(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function It(e) {
  return `${Math.round(e * 100)}%`;
}
function vg({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: C.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: C.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: C.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Ia, { cells: [
      { value: It(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function bg({ stage: e }) {
  return /* @__PURE__ */ n(Ia, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: on(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function gg({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: C.head, children: [
    /* @__PURE__ */ n("span", { className: C.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: C.name, id: a, children: e.name }),
    /* @__PURE__ */ n(h, { role: e.kind === "gate" ? "gate" : "soft", label: fg[e.kind] })
  ] });
}
function pg({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: C.meta, children: [
    /* @__PURE__ */ o("span", { className: C.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: C.mono, children: [
      ce(e.medianWait),
      " median wait"
    ] })
  ] });
}
function yg({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(vg, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(bg, { stage: e }) : null;
}
function Ng({ onMount: e }) {
  return e ? /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function kg({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: C.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(gg, { stage: e, titleId: l }),
    /* @__PURE__ */ n(pg, { stage: e }),
    /* @__PURE__ */ n(yg, { stage: e }),
    /* @__PURE__ */ n("div", { className: C.agents, children: a.map((s) => /* @__PURE__ */ n(S_, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(Ng, { onMount: t })
  ] });
}
const $g = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function Cg({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: C.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: C.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: C.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: C.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function Sg({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: C.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(Cg, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: C.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: It(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Rg(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Tg({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: C.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: C.terminalCount, children: on(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: C.cardNote, children: Rg(e.rolledBackThisWeek) })
  ] });
}
function xg(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Lg(e) {
  if (e.kind === "terminal") return `${on(e.closedThisWeek)} this week`;
  const a = xg(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Ag({ stage: e, titleId: a }) {
  const t = $g[e.kind];
  return /* @__PURE__ */ o("header", { className: C.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: C.stageRow, children: [
      /* @__PURE__ */ o("span", { className: C.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(h, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: C.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: C.workflowMeta, children: Lg(e) })
  ] });
}
function Ig(e) {
  return e === "entry" || e === "agent";
}
function Eg({ stage: e, onMount: a }) {
  return a === void 0 || !Ig(e.kind) ? null : /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", className: C.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Mg({ stage: e, agentCards: a, onMount: t }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: C.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Ag, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(Sg, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(Tg, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: C.workflowAgents, children: a }),
    /* @__PURE__ */ n(Eg, { stage: e, onMount: t })
  ] });
}
function Bg(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function yS(e) {
  return Bg(e) ? /* @__PURE__ */ n(Mg, { ...e }) : /* @__PURE__ */ n(kg, { ...e });
}
const jg = "_row_alabo_6", Pg = "_name_alabo_12", qg = "_compactRow_alabo_13", Dg = "_compactName_alabo_13", Hg = "_cell_alabo_30", Og = "_chain_alabo_45", Fg = "_owner_alabo_51", zg = "_mono_alabo_57", Wg = "_compactCell_alabo_79", Kg = "_stack_alabo_96", Gg = "_stat_alabo_103", Ug = "_identityLine_alabo_110", Vg = "_identity_alabo_110", Yg = "_ownerLine_alabo_137", Xg = "_link_alabo_150", Jg = "_gateMark_alabo_156", Qg = "_emptyChain_alabo_161", Zg = "_arrow_alabo_167", ep = "_muted_alabo_168", ap = "_define_alabo_173", np = "_statValue_alabo_180", tp = "_policyId_alabo_186", rp = "_sub_alabo_191", p = {
  row: jg,
  name: Pg,
  compactRow: qg,
  compactName: Dg,
  cell: Hg,
  chain: Og,
  owner: Fg,
  mono: zg,
  compactCell: Wg,
  stack: Kg,
  stat: Gg,
  identityLine: Ug,
  identity: Vg,
  ownerLine: Yg,
  link: Xg,
  gateMark: Jg,
  emptyChain: Qg,
  arrow: Zg,
  muted: ep,
  define: ap,
  statValue: np,
  policyId: tp,
  sub: rp
};
function Et(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function lp(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function op(e) {
  return e === void 0 ? p.compactRow : `${p.compactRow} ${e}`;
}
function Mt(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function ip(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Mt(e.members)}`;
}
function sp(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: p.compactCell, children: /* @__PURE__ */ o("span", { className: p.stack, children: [
    /* @__PURE__ */ o("span", { className: p.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${p.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${p.compactName} ward-rowlink ward-target`, href: O(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(h, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: p.ownerLine, children: ip(e) })
  ] }) });
}
function Bt({ name: e, gate: a, look: t, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ n("span", { className: p.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(h, { ...t, size: r, label: e }),
    a ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function cp(e, a, t) {
  if (e !== a) return { role: "soft" };
  const r = sa(t);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function dp({ stages: e, streamStep: a }) {
  const t = e.findIndex((r) => r.gate === !0);
  return /* @__PURE__ */ n("span", { className: `${p.chain} ward-chiprow`, children: e.map((r, l) => /* @__PURE__ */ o("span", { className: p.link, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: p.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(Bt, { name: r.name, gate: r.gate === !0, look: cp(l, t, a), size: "tag" })
  ] }, `${r.name}${l}`)) });
}
function up(e) {
  return /* @__PURE__ */ n("td", { className: p.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: p.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: p.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: p.define, children: "Define workflow" })
  ] }) : dp(e) });
}
function jt(e) {
  return e === void 0 ? void 0 : !0;
}
function Bn(e, a, t, r) {
  return /* @__PURE__ */ n("td", { className: p.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: p.muted, children: t }) : /* @__PURE__ */ o("span", { className: p.stat, children: [
    /* @__PURE__ */ n("span", { className: `${p.statValue} ward-stat-value`, title: r, "data-raised": jt(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: p.sub, children: a })
  ] }) });
}
function mp(e) {
  return /* @__PURE__ */ n("td", { className: p.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: p.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: p.stat, children: [
    /* @__PURE__ */ n("span", { className: p.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: p.sub, children: e.summary })
  ] }) });
}
function hp(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function wp({ stream: e, href: a, presentation: t }) {
  const r = op(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Et, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ve(e.streamStep, "chip") }, children: [
    sp(e, a),
    up(e),
    Bn(hp(e.agents), e.agents === void 0 ? void 0 : lp(e.agents), "—"),
    mp(e.policy),
    Bn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function _p(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function NS(e) {
  if (_p(e)) return wp(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: p.row, onClick: Et, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: p.cell, children: [
      /* @__PURE__ */ n("a", { className: `${p.name} ward-target`, href: O(t), children: a.name }),
      /* @__PURE__ */ n(h, { ...Aa(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ n(h, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: p.cell, children: /* @__PURE__ */ n("span", { className: p.chain, children: a.stages.map((r) => /* @__PURE__ */ n("span", { className: p.link, children: /* @__PURE__ */ n(Bt, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: p.cell, children: /* @__PURE__ */ o("span", { className: p.mono, children: [
      a.agents.live,
      " live · ",
      a.agents.draft,
      " draft · ",
      a.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ o("td", { className: p.cell, children: [
      /* @__PURE__ */ n("span", { className: p.owner, children: a.owner }),
      /* @__PURE__ */ n("span", { className: p.mono, children: Mt(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: p.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: p.mono, title: a.inFlightHint, "data-raised": jt(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: p.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: p.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const fp = "_row_2u4ll_2", vp = "_name_2u4ll_16", bp = "_scope_2u4ll_24", ka = {
  row: fp,
  name: vp,
  scope: bp
};
function sn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function gp(e) {
  return e === void 0 ? `${ka.row} ward-toolrow` : `${ka.row} ward-toolrow ${e}`;
}
function pp(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function yp({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function Np({ classification: e }) {
  return /* @__PURE__ */ n(h, { role: e === "write" ? "write" : "meta", label: sn(e) });
}
function kp({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${ka.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function $p(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function kS({ tool: e, onChange: a, presentation: t }) {
  const r = N(), l = N(), i = pp(e, t), s = $p(t);
  return /* @__PURE__ */ o(s, { className: gp(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(yp, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${ka.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(kp, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(Np, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const Cp = "_strip_4ppv9_2", Sp = "_well_4ppv9_11", Rp = "_head_4ppv9_18", Tp = "_name_4ppv9_24", xp = "_chart_4ppv9_32", Lp = "_segment_4ppv9_38", Ap = "_detailedChart_4ppv9_44", Ip = "_rail_4ppv9_57", Ep = "_section_4ppv9_63", Mp = "_label_4ppv9_74", Bp = "_note_4ppv9_91", K = {
  strip: Cp,
  well: Sp,
  head: Rp,
  name: Tp,
  chart: xp,
  segment: Lp,
  detailedChart: Ap,
  rail: Ip,
  section: Ep,
  label: Mp,
  note: Bp
}, jp = "No item in flight to preview.", Pp = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", qp = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Ga = [1, 2, 3, 4, 5, 6], $a = 100;
function Dp(e, a) {
  return a.has(e) ? ve(e, "id") : "var(--ward-color-line)";
}
function Hp({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: K.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ga.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: K.segment,
      x: l * $a,
      y: "0",
      width: $a,
      height: "8",
      fill: Dp(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Op(e) {
  const a = e.slice(0, Ga.length);
  for (; a.length < Ga.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Fp({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${K.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * $a),
        y: "0",
        width: String($a),
        height: "40",
        style: { fill: ve(a.streamStep, "chip") }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function Pt(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ua({ label: e, children: a }) {
  const t = N();
  return /* @__PURE__ */ o("section", { className: K.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: K.label, children: e }),
    a
  ] });
}
function zp({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: K.note, children: a ?? jp }) : /* @__PURE__ */ n("div", { className: K.well, children: /* @__PURE__ */ n(Ma, { item: { ...e, streamStep: sa(t.streamStep) }, onOpen: Pt(r), feed: null }) });
}
function Wp({ draft: e }) {
  const a = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: K.head, style: a, children: [
    /* @__PURE__ */ n(Be, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ n(h, { ...Aa(e.key, e.streamStep) })
  ] });
}
function Kp(e) {
  const a = Op(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: K.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ua, { label: "Board card", children: /* @__PURE__ */ n(zp, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ua, { label: "Streams index row", children: /* @__PURE__ */ n(Wp, { draft: t }) }),
    /* @__PURE__ */ o(ua, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(Fp, { identities: a }),
      /* @__PURE__ */ n("p", { className: K.note, children: Pp })
    ] }),
    /* @__PURE__ */ n(ua, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: K.note, children: qp }) })
  ] });
}
function Gp({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: K.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: K.head, children: [
      /* @__PURE__ */ n(Be, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: K.name, children: e.name }),
      /* @__PURE__ */ n(h, { ...Aa(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: K.well, children: /* @__PURE__ */ n(Ma, { item: { ...a, streamStep: e.streamStep }, onOpen: Pt(r) }) }),
    /* @__PURE__ */ n(Hp, { draft: e, streams: t })
  ] });
}
function $S(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Kp, { ...e }) : /* @__PURE__ */ n(Gp, { ...e });
}
const Up = "_row_ixlg5_6", Vp = "_headCell_ixlg5_10", Yp = "_cell_ixlg5_11", Xp = "_name_ixlg5_23", Jp = "_consequence_ixlg5_29", Qp = "_governed_ixlg5_36", Zp = "_control_ixlg5_42", ey = "_byRole_ixlg5_48", ay = "_webControl_ixlg5_59", ny = "_webConsequence_ixlg5_65", ty = "_webGoverned_ixlg5_71", H = {
  row: Up,
  headCell: Vp,
  cell: Yp,
  name: Xp,
  consequence: Jp,
  governed: Qp,
  control: Zp,
  byRole: ey,
  webControl: ay,
  webConsequence: ny,
  webGoverned: ty
};
function ry({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: H.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: H.control, children: [
    /* @__PURE__ */ n(
      We,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(h, { role: "running", label: "Pilot" })
  ] });
}
function ly({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: H.headCell, children: [
      /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: H.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: H.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(ry, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function oy(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function iy({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${H.webControl} ${H.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    We,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: t === void 0,
      onChange: (l) => t == null ? void 0 : t(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${H.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(h, { role: "running", label: "Pilot" }),
    r
  ] });
}
function sy({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ o("td", { className: H.cell, children: [
      /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${H.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(iy, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webGoverned} ward-cellmeta`, children: oy(e) }) })
  ] });
}
function CS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(sy, { ...e }) : /* @__PURE__ */ n(ly, { ...e });
}
const cy = "_row_vv64h_2", dy = "_cell_vv64h_6", uy = "_name_vv64h_25", my = "_note_vv64h_30", hy = "_webName_vv64h_41", wy = "_webMeta_vv64h_47", V = {
  row: cy,
  cell: dy,
  name: uy,
  note: my,
  webName: hy,
  webMeta: wy
}, qt = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function _y(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function fy({ component: e, onRestart: a }) {
  const t = N(), r = qt[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n("span", { className: V.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: V.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n(h, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n("span", { id: t, className: V.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: V.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(f, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function vy({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: _y(e.state) });
}
function by({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n("span", { className: `${V.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n("span", { className: `${V.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n(h, { ...qt[e.state] }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n(vy, { component: e, onRestart: a }) })
  ] });
}
function SS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(by, { ...e }) : /* @__PURE__ */ n(fy, { ...e });
}
const gy = "_row_jcm5k_7", py = "_cell_jcm5k_11", yy = "_next_jcm5k_28", Ny = "_headCell_jcm5k_38", ky = "_webId_jcm5k_77", $y = "_webPurpose_jcm5k_83", Cy = "_webMeta_jcm5k_91", Sy = "_webUrgent_jcm5k_97", F = {
  row: gy,
  cell: py,
  next: yy,
  headCell: Ny,
  webId: ky,
  webPurpose: $y,
  webMeta: Cy,
  webUrgent: Sy
}, Ry = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, Ty = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Dt = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], xy = Object.fromEntries(Dt.map((e) => [e.key, e]));
function Ve({ column: e, children: a }) {
  const t = xy[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: F.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function RS() {
  return /* @__PURE__ */ n("tr", { children: Dt.map((e) => /* @__PURE__ */ n(
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
function Ly({ cred: e }) {
  const a = Ry[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ n(Ve, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Ve, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Ve, { column: "state", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ve, { column: "cls", children: /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: sn(e.cls) }) }),
    /* @__PURE__ */ n(Ve, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Ve, { column: "next", children: /* @__PURE__ */ n("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Ay({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function Iy({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(Ay, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(h, { ...Ty[e.state] }) })
  ] });
}
function TS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Iy, { ...e }) : /* @__PURE__ */ n(Ly, { ...e });
}
const Ey = "_card_17zba_2", My = "_head_17zba_11", By = "_env_17zba_18", jy = "_version_17zba_25", Py = "_meta_17zba_32", qy = "_webCard_17zba_37", Dy = "_webRow_17zba_47", Hy = "_webTitle_17zba_55", Oy = "_webLine_17zba_65", Fy = "_webVersion_17zba_72", zy = "_webMeta_17zba_77", U = {
  card: Ey,
  head: My,
  env: By,
  version: jy,
  meta: Py,
  webCard: qy,
  webRow: Dy,
  webTitle: Hy,
  webLine: Oy,
  webVersion: Fy,
  webMeta: zy
}, jn = { dev: "Dev", uat: "UAT", prod: "Prod" }, Ht = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function Wy({ env: e }) {
  const a = Ht[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: U.card, "aria-label": jn[e.env], children: [
    /* @__PURE__ */ o("div", { className: U.head, children: [
      /* @__PURE__ */ n("span", { className: U.env, children: jn[e.env] }),
      /* @__PURE__ */ n(h, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ n("p", { className: U.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: U.meta, children: [
      "deployed ",
      de(e.deployedAt)
    ] }),
    t && /* @__PURE__ */ n("p", { className: U.meta, children: t })
  ] });
}
function Ky(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function Gy(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(h, { ...Ht[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: Ky(e) })
  ] });
}
function xS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Gy, { ...e }) : /* @__PURE__ */ n(Wy, { ...e });
}
const Uy = "_panel_1hmja_2", Vy = "_line_1hmja_8", Yy = "_actions_1hmja_14", ma = {
  panel: Uy,
  line: Vy,
  actions: Yy
};
function LS(e) {
  return /* @__PURE__ */ o("div", { className: ma.panel, children: [
    /* @__PURE__ */ n("p", { className: ma.line, children: e.status }),
    /* @__PURE__ */ n(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ma.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ma.line, children: e.note ?? "" })
  ] });
}
const Xy = "_upload_13fcl_2", Jy = "_preview_13fcl_7", Qy = "_mark_13fcl_17", Zy = "_empty_13fcl_22", eN = "_actions_13fcl_28", aN = "_input_13fcl_33", nN = "_reasons_13fcl_41", tN = "_reason_13fcl_41", rN = "_accepted_13fcl_57", te = {
  upload: Xy,
  preview: Jy,
  mark: Qy,
  empty: Zy,
  actions: eN,
  input: aN,
  reasons: nN,
  reason: tN,
  accepted: rN
}, Ot = 1.5, Ft = 22, Ca = "script elements or event handlers", xe = "links or external references", $e = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Ot}px at ${Ft}px`], lN = [$e[1], $e[2], Ca, xe], oN = /* @__PURE__ */ new Map([
  ["image", $e[1]],
  ["text", $e[2]],
  ["tspan", $e[2]],
  ["textPath", $e[2]],
  ["script", Ca],
  ["foreignObject", Ca],
  ["a", xe],
  ["use", xe],
  ["style", xe],
  ["feImage", xe],
  ["set", xe]
]), iN = "http://www.w3.org/2000/svg", sN = "http://www.w3.org/2000/xmlns/", cN = /* @__PURE__ */ new Set([
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
]), dN = /* @__PURE__ */ new Set([
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
]), cn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, uN = /url\s*\(|['"\\]/i;
function mN() {
  return { ok: !1, reasons: [$e[1]] };
}
function zt(e) {
  return e.namespaceURI === iN;
}
function hN(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && zt(a) ? a : null;
  } catch {
    return null;
  }
}
function wN(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [$e[0]] : [];
}
function _N(e) {
  return oN.get(e.localName) ?? (e.localName.startsWith("animate") ? xe : void 0);
}
function fN(e) {
  return uN.test(e.replace(cn, ""));
}
function vN(e) {
  return /^on/i.test(e.localName) ? Ca : e.localName === "href" || fN(e.value) ? xe : void 0;
}
function bN(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(_N(t));
    for (const r of Array.from(t.attributes)) a.add(vN(r));
  }
  return lN.filter((t) => a.has(t));
}
function gN(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? Ft / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Ot;
  }) ? [$e[3]] : [];
}
function pN(e) {
  if (e.namespaceURI === sN) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (dN.has(a) || a.startsWith("stroke"));
}
function yN(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && zt(a) && cN.has(a.localName);
}
function NN(e, a) {
  yN(a) ? a.nodeType === Node.ELEMENT_NODE && Wt(a) : e.removeChild(a);
}
function Wt(e) {
  for (const a of Array.from(e.attributes)) pN(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) NN(e, a);
  return e;
}
function kN(e) {
  return Array.from(e.matchAll(cn), (a) => a[2]).filter((a) => a !== "");
}
function $N(e) {
  let a = 2166136261;
  for (let t = 0; t < e.length; t += 1) a = Math.imul(a ^ e.charCodeAt(t), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function CN(e, a) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of kN(l.value)) t.has(i) || t.set(i, `${a}-${t.size}`);
  return t;
}
function SN(e, a) {
  for (const t of Array.from(e.attributes))
    t.value = t.value.replace(cn, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function RN(e, a) {
  const t = [e, ...Array.from(e.querySelectorAll("*"))], r = CN(t, a);
  for (const l of t) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), SN(l, r);
  }
  return e;
}
function AS(e) {
  const a = hN(e);
  if (a === null) return mN();
  const t = [...wN(a), ...bN(a), ...gN(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(RN(Wt(a), $N(e))) };
}
const TN = "Mark accepted.", xN = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, LN = new Set(Gn.flatMap((e) => [ve(e, "id"), ve(e, "chip")]));
function AN(e) {
  return e !== void 0 && (xN.test(e) || LN.has(e)) ? e : void 0;
}
function IN({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: te.preview, style: { "--mark": AN(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ n("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: te.empty }) });
}
function EN(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function MN(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function BN({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("p", { className: te.accepted, children: TN }) }) : /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: te.reason, children: a }, a)) }) });
}
function jN({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(BN, { result: e }) : /* @__PURE__ */ n("p", { className: `${te.result} ${EN(e, t)}`, role: "status", children: MN(e, t) });
}
function Pn(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function IS({ current: e, onUpload: a, onUseInitials: t, presentation: r, disabledReason: l }) {
  const i = w(null), [s, c] = v(null), u = (d) => {
    if (d === void 0) return;
    const m = a(d);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ n(IN, { current: e }),
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
            var m;
            return u((m = d.target.files) == null ? void 0 : m[0]);
          }
        }
      ),
      /* @__PURE__ */ n(f, { ...Pn(l), onClick: () => {
        var d;
        return (d = i.current) == null ? void 0 : d.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(f, { ...Pn(l), variant: "ghost", onClick: t, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(jN, { result: s, presentation: r })
  ] });
}
const PN = "_row_o3t6y_7", qN = "_cell_o3t6y_11", DN = "_head_o3t6y_28", HN = "_name_o3t6y_34", ON = "_pinned_o3t6y_42", FN = "_headCell_o3t6y_49", zN = "_webName_o3t6y_88", WN = "_webMeta_o3t6y_95", KN = "_webWarn_o3t6y_103", j = {
  row: PN,
  cell: qN,
  head: DN,
  name: HN,
  pinned: ON,
  headCell: FN,
  webName: zN,
  webMeta: WN,
  webWarn: KN
}, dn = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Kt = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], GN = Object.fromEntries(Kt.map((e) => [e.key, e]));
function UN(e, a) {
  return `mcp.${e}.${a}`;
}
function VN(e) {
  return Object.keys(dn).includes(e);
}
function YN(e) {
  return dn[e !== void 0 && VN(e) ? e : "unknown"];
}
function aa({ column: e, children: a }) {
  const t = GN[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: j.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function ES() {
  return /* @__PURE__ */ n("tr", { children: Kt.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: j.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function XN({ server: e }) {
  const a = dn[e.connection];
  return /* @__PURE__ */ o("tr", { className: j.row, children: [
    /* @__PURE__ */ o(aa, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: j.head, children: [
        /* @__PURE__ */ n("span", { className: j.name, children: e.name }),
        /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: sn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: j.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(aa, { column: "connection", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(aa, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(aa, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(aa, { column: "tools", children: e.tools.map((t) => UN(e.name, t)).join(" · ") })
  ] });
}
function JN(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function QN(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function ZN({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${j.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${j.webMeta} ward-cellmeta`, children: e });
}
function e1({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${j.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function a1({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(f, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function n1({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: j.row, children: [
    /* @__PURE__ */ o("td", { className: j.cell, children: [
      /* @__PURE__ */ n("span", { className: `${j.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${j.webMeta} ward-cellmeta`, children: JN(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n("span", { className: `${j.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n(h, { ...QN(e) }) }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n(ZN, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n(h, { ...YN(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: j.cell, children: [
      /* @__PURE__ */ n(e1, { server: e, onRestart: a }),
      /* @__PURE__ */ n(a1, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function MS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(n1, { ...e }) : /* @__PURE__ */ n(XN, { ...e });
}
const t1 = "_row_1ibo7_2", r1 = "_headCell_1ibo7_14", l1 = "_cell_1ibo7_15", o1 = "_name_1ibo7_26", i1 = "_consequence_1ibo7_32", s1 = "_reason_1ibo7_38", c1 = "_value_1ibo7_44", d1 = "_webRow_1ibo7_60", u1 = "_webSetting_1ibo7_73", m1 = "_webName_1ibo7_81", h1 = "_webConsequence_1ibo7_89", w1 = "_webControl_1ibo7_95", _1 = "_webState_1ibo7_109", f1 = "_webChip_1ibo7_114", E = {
  row: t1,
  headCell: r1,
  cell: l1,
  name: o1,
  consequence: i1,
  reason: s1,
  value: c1,
  webRow: d1,
  webSetting: u1,
  webName: m1,
  webConsequence: h1,
  webControl: w1,
  webState: _1,
  webChip: f1
}, Gt = 104, Ut = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function v1({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(We, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(st, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: E.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function b1({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = Ut[t], s = t === "locked";
  return /* @__PURE__ */ o("tr", { className: E.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: E.headCell, children: [
      /* @__PURE__ */ n("span", { className: E.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: E.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: E.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: E.cell, children: /* @__PURE__ */ n(v1, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: E.cell, style: { width: Gt }, children: /* @__PURE__ */ n(h, { role: i.role, label: i.label }) })
  ] });
}
function Vt(e, a) {
  return String(e ?? a);
}
function g1(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function p1(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Vt(e.value, "—");
}
function y1({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: E.webControl, children: [
    /* @__PURE__ */ n(We, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: E.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function N1(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(y1, { ...e });
  const l = g1(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: E.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(st, { options: l, value: Vt(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${E.webControl} ${E.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: p1(a) });
}
function k1({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${E.row} ${E.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: E.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${E.name} ${E.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${E.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: E.webControl, children: i(s) }) : /* @__PURE__ */ n(N1, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${E.webChip} ward-policy-chip`, style: { width: Gt }, children: /* @__PURE__ */ n(h, { ...Ut[t], size: "tag" }) })
  ] });
}
function BS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(k1, { ...e }) : /* @__PURE__ */ n(b1, { ...e });
}
const $1 = "_label_vm9hq_7", C1 = "_name_vm9hq_15", S1 = "_column_vm9hq_24", R1 = "_webFrame_vm9hq_57", T1 = "_webHead_vm9hq_62", x1 = "_webHeadLabel_vm9hq_74", L1 = "_webLabel_vm9hq_112", A1 = "_webColumns_vm9hq_119", I1 = "_webGroup_vm9hq_125", E1 = "_webPeople_vm9hq_126", M1 = "_webVia_vm9hq_127", B1 = "_webMeta_vm9hq_156", z = {
  label: $1,
  name: C1,
  column: S1,
  webFrame: R1,
  webHead: T1,
  webHeadLabel: x1,
  webLabel: L1,
  webColumns: A1,
  webGroup: I1,
  webPeople: E1,
  webVia: M1,
  webMeta: B1
}, j1 = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, Da = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Ha({ column: e, children: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: z.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function P1(e) {
  if (!e.matrixRole) return;
  const a = j1[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function q1({ node: e }) {
  const a = P1(e);
  return /* @__PURE__ */ o("span", { className: z.label, children: [
    /* @__PURE__ */ n("span", { className: z.name, children: e.name }),
    /* @__PURE__ */ n(D1, { role: a, node: e }),
    /* @__PURE__ */ n(Ha, { column: Da[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Ha, { column: Da[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Ha, { column: Da[2], children: e.requestedVia ?? "" })
  ] });
}
function D1({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ n(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ n(h, { role: "warn", label: "Unresolved" })
  ] });
}
function H1({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    ht,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(q1, { node: t }),
      children: s
    }
  );
}
function Oa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function O1({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Oa, { className: `${z.webMeta} ${z.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Oa, { className: `${z.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Oa, { className: `${z.webMeta} ${z.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function F1() {
  return /* @__PURE__ */ o("div", { className: z.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: z.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: z.webColumns, children: [
      /* @__PURE__ */ n("span", { className: z.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: z.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: z.webVia, children: "Requested via" })
    ] })
  ] });
}
function z1({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function W1(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function K1({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: z.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(F1, {}),
    /* @__PURE__ */ n(Ru, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      ht,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(z1, { row: t }),
        detail: /* @__PURE__ */ n(O1, { row: t }),
        expanded: W1(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function jS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(K1, { ...e }) : /* @__PURE__ */ n(H1, { ...e });
}
const G1 = "_runbook_b9agc_2", U1 = "_list_b9agc_7", V1 = "_step_b9agc_15", Y1 = "_numeral_b9agc_21", X1 = "_body_b9agc_28", J1 = "_head_b9agc_34", Q1 = "_title_b9agc_40", Z1 = "_detail_b9agc_45", ek = "_actions_b9agc_50", ak = "_webList_b9agc_56", nk = "_webStep_b9agc_60", tk = "_webBody_b9agc_66", rk = "_webTitle_b9agc_74", lk = "_webDetail_b9agc_78", L = {
  runbook: G1,
  list: U1,
  step: V1,
  numeral: Y1,
  body: X1,
  head: J1,
  title: Q1,
  detail: Z1,
  actions: ek,
  webList: ak,
  webStep: nk,
  webBody: tk,
  webTitle: rk,
  webDetail: lk
}, Yt = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Xt(e) {
  return String(e + 1).padStart(2, "0");
}
function ok({ step: e, index: a, connection: t }) {
  const r = Yt[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: L.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: L.numeral, children: Xt(a) }),
    /* @__PURE__ */ o("span", { className: L.body, children: [
      /* @__PURE__ */ o("span", { className: L.head, children: [
        /* @__PURE__ */ n("span", { className: L.title, children: e.title }),
        /* @__PURE__ */ n(h, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n(Se, { startedAt: e.startedAt, connection: t })
      ] }),
      /* @__PURE__ */ n("span", { className: L.detail, children: e.detail })
    ] })
  ] });
}
function ik({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ n("ol", { className: L.list, children: e.map((r, l) => /* @__PURE__ */ n(ok, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: L.actions, children: a })
  ] });
}
function sk({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${L.step} ${L.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${L.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Xt(a) }),
    /* @__PURE__ */ o("span", { className: `${L.body} ${L.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${L.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${L.title} ${L.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(h, { ...Yt[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Se, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${L.detail} ${L.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function ck({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${L.list} ${L.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(sk, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${L.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function PS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ck, { ...e }) : /* @__PURE__ */ n(ik, { ...e });
}
const dk = "_list_1gu6a_2", uk = "_check_1gu6a_10", mk = "_body_1gu6a_16", hk = "_text_1gu6a_23", wk = "_pending_1gu6a_32", _k = "_measured_1gu6a_37", Xe = {
  list: dk,
  check: uk,
  body: mk,
  text: hk,
  pending: wk,
  measured: _k
};
function fk(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function vk({ check: e }) {
  const a = fk(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Xe.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(an, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: Xe.body, children: [
      /* @__PURE__ */ n("span", { className: Xe.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Xe.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: Xe.measured, children: e.measured })
  ] });
}
function qS({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Xe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(vk, { check: a }, a.text)) });
}
const bk = "_root_a6xzy_2", gk = "_list_a6xzy_10", pk = "_line_a6xzy_21", yk = "_at_a6xzy_48", Nk = "_text_a6xzy_52", kk = "_foot_a6xzy_56", $k = "_idle_a6xzy_68", Ck = "_caret_a6xzy_76", Sk = "_jump_a6xzy_83", he = {
  root: bk,
  list: gk,
  line: pk,
  at: yk,
  text: Nk,
  foot: kk,
  idle: $k,
  caret: Ck,
  jump: Sk
}, Rk = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function un(e) {
  return Number.isNaN(Date.parse(e)) ? "" : Rk.format(new Date(e));
}
const Tk = { warn: "warning", ok: "ok" };
function xk({ kind: e }) {
  const a = Tk[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Lk({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${un(e)}` });
}
function Ak({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${un(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: he.idle, children: i }),
    /* @__PURE__ */ n(Lk, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const Ik = 8;
function Ek(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > Ik;
}
function Mk({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const Jt = Me(null);
function DS({ announce: e, onAnnounceChange: a, children: t }) {
  const [r, l] = v(!1), i = Fn(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ n(Jt.Provider, { value: i, children: t });
}
function Bk() {
  const e = Ee(Jt), [a, t] = v(!1);
  return e ? [e.announce, e.setAnnounce] : [a, t];
}
function HS({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = w(null), [i, s] = v(0), [c, u] = Bk(), [d, m] = v(!1), b = e.at(-1);
  R(() => {
    s(e.length);
  }, [e.length]), Ya(() => {
    const y = l.current;
    y && !d && (y.scrollTop = y.scrollHeight);
  }, [e.length, d]);
  const g = () => {
    var B;
    const y = l.current;
    if (!y) return;
    const I = y.querySelectorAll("[data-consline-text]");
    (B = I.item(I.length - 1)) == null || B.focus(), m(!1);
  };
  return /* @__PURE__ */ o("div", { className: he.root, children: [
    /* @__PURE__ */ n("ol", { className: he.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (y) => m(Ek(y.currentTarget)), children: e.map((y, I) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": I < i, children: [
      /* @__PURE__ */ n("span", { className: he.at, children: un(y.at) }),
      /* @__PURE__ */ n(xk, { kind: y.kind }),
      /* @__PURE__ */ n("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${I}`)) }),
    /* @__PURE__ */ o(Ak, { connection: a, idleSince: t, last: b, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => u(!c), children: "Read new events" }),
      /* @__PURE__ */ n(Mk, { shown: d, onJump: g })
    ] })
  ] });
}
const jk = "_row_1k8wl_2", Pk = "_head_1k8wl_14", qk = "_author_1k8wl_20", Dk = "_eta_1k8wl_25", Hk = "_edited_1k8wl_26", Ok = "_body_1k8wl_32", Fk = "_reason_1k8wl_37", zk = "_actions_1k8wl_42", pe = {
  row: jk,
  head: Pk,
  author: qk,
  eta: Dk,
  edited: Hk,
  body: Ok,
  reason: Fk,
  actions: zk
}, Wk = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function Kk(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function Gk({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function Uk({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: pe.reason, id: a, children: e })
  ] });
}
function Vk(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Yk(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(Gk, { ...e }) : /* @__PURE__ */ n(Uk, { reason: e.unavailable, reasonId: e.unavailableId });
}
function OS(e) {
  const { comment: a } = e;
  Vk(e);
  const t = N(), r = `${t}-unavailable`, l = Wk[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${pe.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: pe.head, children: [
      /* @__PURE__ */ n("span", { className: pe.author, children: a.author }),
      /* @__PURE__ */ n(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: pe.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: pe.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: pe.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: pe.reason, id: t, children: Kk(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: pe.actions, children: /* @__PURE__ */ n(Yk, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const Xk = "_root_c46wj_2", Jk = "_attach_c46wj_11", Qk = "_actions_c46wj_17", Zk = "_reply_c46wj_23", e$ = "_replyRow_c46wj_28", a$ = "_sendsAs_c46wj_42", Ze = {
  root: Xk,
  attach: Jk,
  actions: Qk,
  reply: Zk,
  replyRow: e$,
  sendsAs: a$
};
function Qt({ value: e, onChange: a }) {
  const [t, r] = v("");
  return e === void 0 ? [t, r] : [e, a ?? (() => {
  })];
}
function n$(e) {
  const { placeholder: a, asUser: t, onPost: r } = e, [l, i] = Qt(e), s = N();
  return /* @__PURE__ */ o("div", { className: Ze.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ze.replyRow, children: [
      /* @__PURE__ */ n(M, { variant: "reply", labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ n(f, { variant: "ghost", describedBy: s, onClick: () => r(t, l), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Ze.sendsAs, children: `Sends as ${t}.` })
  ] });
}
function FS(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(n$, { ...e }) : /* @__PURE__ */ n(t$, { ...e });
}
function t$(e) {
  const { placeholder: a, asUser: t, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, u] = Qt(e);
  return /* @__PURE__ */ o("div", { className: Ze.root, children: [
    /* @__PURE__ */ n(M, { kind: "textarea", label: a, value: c, onChange: u }),
    r && /* @__PURE__ */ o("div", { className: Ze.attach, children: [
      /* @__PURE__ */ n(h, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ n(
      Yn,
      {
        label: `Requeue ${l.agent} after posting`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Ze.actions, children: [
      /* @__PURE__ */ n(f, { variant: "primary", onClick: () => i(t, c), children: `Post as ${t}` }),
      s && /* @__PURE__ */ n(f, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const r$ = "_list_1yhks_2", l$ = "_item_1yhks_6", o$ = "_body_1yhks_22", i$ = "_text_1yhks_28", s$ = "_evidence_1yhks_37", c$ = "_consequence_1yhks_49", d$ = "_note_1yhks_54", Fe = {
  list: r$,
  item: l$,
  body: o$,
  text: i$,
  evidence: s$,
  consequence: c$,
  note: d$
};
function u$({ criterion: e }) {
  return /* @__PURE__ */ n(Be, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function qn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function m$(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function h$({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Fe.body, children: [
    /* @__PURE__ */ n("span", { className: Fe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ n(qn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Fe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ n(qn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Fe.consequence, children: m$(e.why) })
    ] })
  ] });
}
function w$({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Fe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(u$, { criterion: e }),
    /* @__PURE__ */ n(h$, { criterion: e })
  ] });
}
function zS({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Fe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(w$, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Fe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const _$ = "_list_dwhoz_2", f$ = "_rung_dwhoz_6", v$ = "_name_dwhoz_18", b$ = "_actor_dwhoz_32", _a = {
  list: _$,
  rung: f$,
  name: v$,
  actor: b$
}, g$ = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function p$({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = g$[e.state];
  return /* @__PURE__ */ o("li", { className: _a.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: _a.name, children: e.name }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${_a.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function WS({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${_a.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(p$, { rung: a }, a.name)) });
}
const y$ = "_sheet_pw37w_2", N$ = "_title_pw37w_9", k$ = "_stage_pw37w_15", $$ = "_effects_pw37w_20", C$ = "_effect_pw37w_20", S$ = "_numeral_pw37w_31", R$ = "_effectText_pw37w_38", T$ = "_refusals_pw37w_43", x$ = "_reasons_pw37w_52", L$ = "_reason_pw37w_52", A$ = "_actions_pw37w_62", ue = {
  sheet: y$,
  title: N$,
  stage: k$,
  effects: $$,
  effect: C$,
  numeral: S$,
  effectText: R$,
  refusals: T$,
  reasons: x$,
  reason: L$,
  actions: A$
};
function I$({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(f, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function KS({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = N(), u = `${c}-refusal`, [d, m] = v(""), b = t.length > 0;
  return /* @__PURE__ */ n(ea, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: ue.effects, children: a.map((g, y) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ n("span", { className: ue.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: ue.effectText, children: g })
    ] }, g)) }),
    /* @__PURE__ */ n(
      ud,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(M, { kind: "textarea", label: "Note for the agent", value: d, onChange: m }),
    b && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ n(h, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: ue.reasons, children: t.map((g, y) => /* @__PURE__ */ n("li", { className: ue.reason, id: y === 0 ? u : void 0, children: g.reason }, g.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ n(I$, { refused: b, reasonId: u, note: d, onRequeue: l }),
      /* @__PURE__ */ n(f, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const E$ = "_list_1rowi_2", M$ = "_path_1rowi_7", B$ = "_head_1rowi_21", j$ = "_label_1rowi_28", P$ = "_consequence_1rowi_35", q$ = "_ask_1rowi_36", Qe = {
  list: E$,
  path: M$,
  head: B$,
  label: j$,
  consequence: P$,
  ask: q$
}, Ua = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Dn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Hn(e) {
  return e ? "primary" : "secondary";
}
function D$({ path: e, primary: a, onChoose: t }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ n(f, { variant: Hn(a), size: "sm", onClick: () => t(e.kind), children: Ua[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(f, { variant: Hn(a), size: "sm", disabled: !0, describedBy: r, children: Ua[e.kind] }),
    /* @__PURE__ */ n("span", { className: Qe.ask, id: r, children: e.askInstead })
  ] });
}
function H$({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Qe.path, "data-allowed": e.allowed, "data-role": Dn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Qe.head, children: [
      /* @__PURE__ */ n("span", { className: Qe.label, children: e.title ?? Ua[e.kind] }),
      /* @__PURE__ */ n(h, { role: Dn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Qe.consequence, children: e.consequence }),
    /* @__PURE__ */ n(D$, { path: e, primary: a, onChoose: t })
  ] });
}
function GS({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Qe.list, children: e.map((t, r) => /* @__PURE__ */ n(H$, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const O$ = "_list_1m7i0_2", F$ = "_item_1m7i0_6", z$ = "_node_1m7i0_18", W$ = "_body_1m7i0_24", K$ = "_head_1m7i0_30", G$ = "_stage_1m7i0_36", U$ = "_version_1m7i0_41", V$ = "_sentence_1m7i0_49", Y$ = "_meta_1m7i0_54", Ne = {
  list: O$,
  item: F$,
  node: z$,
  body: W$,
  head: K$,
  stage: G$,
  version: U$,
  sentence: V$,
  meta: Y$
}, X$ = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function J$({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ne.head, children: [
    /* @__PURE__ */ n("span", { className: Ne.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Ne.version, title: e.version, children: e.version }) : null
  ] });
}
function Q$({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ne.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Ne.node} ward-history-node`, children: /* @__PURE__ */ n(Be, { size: 9, kind: X$[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ne.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(J$, { entry: e }),
      /* @__PURE__ */ n("span", { className: Ne.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ne.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function US({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Ne.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(Q$, { entry: a }, a.stage + String(t))) });
}
const Z$ = "_thread_1e70p_3", eC = "_turn_1e70p_8", aC = "_who_1e70p_27", nC = "_body_1e70p_32", fa = {
  thread: Z$,
  turn: eC,
  who: aC,
  body: nC
}, Zt = Me(!1);
function VS({ children: e, density: a }) {
  return /* @__PURE__ */ n(Zt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${fa.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function YS({ turn: e }) {
  if (!Ee(Zt)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${fa.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${fa.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${fa.body} ward-chat-body`, children: e.body })
  ] });
}
const tC = "_list_yiolt_3", rC = "_row_yiolt_7", lC = "_label_yiolt_20", oC = "_n_yiolt_26", iC = "_cause_yiolt_33", ta = {
  list: tC,
  row: rC,
  label: lC,
  n: oC,
  cause: iC
};
function sC(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const cC = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function dC({ row: e, formatNumber: a }) {
  return sC(e), /* @__PURE__ */ o("li", { className: `${ta.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Be, { size: 8, ...cC[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: ta.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${ta.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(uC, { cause: e.cause })
  ] });
}
function uC({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${ta.cause} ward-healthrow-cause`, children: e }) : null;
}
function XS({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${ta.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(dC, { row: t, formatNumber: a }, t.label)) });
}
const mC = "_root_1jxwp_2", hC = {
  root: mC
};
function JS({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: hC.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ba, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(f, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const wC = "_row_dhbre_3", _C = "_key_dhbre_13", fC = "_stack_dhbre_24", vC = "_value_dhbre_32", bC = "_evidence_dhbre_39", gC = "_mark_dhbre_47", Ye = {
  row: wC,
  key: _C,
  stack: fC,
  value: vC,
  evidence: bC,
  mark: gC
};
function pC({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(an, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function QS({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ye.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Ye.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ye.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Ye.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Ye.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Ye.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(pC, { state: e.state }) })
  ] });
}
const yC = "_cell_gh2sd_2", NC = {
  cell: yC
}, kC = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function $C(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function CC(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function SC(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: $C(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function RC(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function ZS({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  CC(e, t);
  const r = RC(e);
  return /* @__PURE__ */ n(
    Cd,
    {
      label: "Rejection routing",
      columns: kC,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: NC.cell, "data-norerun": l.noRerun ? !0 : void 0, children: SC(l, i) }),
      empty: a ?? /* @__PURE__ */ n(mm, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const TC = "_row_1f2re_2", xC = "_title_1f2re_12", LC = "_turns_1f2re_18", AC = "_waiting_1f2re_19", IC = "_resolved_1f2re_20", EC = "_activity_1f2re_21", MC = "_cost_1f2re_28", BC = "_link_1f2re_29", jC = "_tableLink_1f2re_47", PC = "_tableRecord_1f2re_48", qC = "_tableRow_1f2re_59", DC = "_tableTitle_1f2re_71", HC = "_tableResolved_1f2re_76", OC = "_tableMeta_1f2re_87", FC = "_tableCost_1f2re_94", zC = "_tableActivity_1f2re_95", WC = "_tableState_1f2re_105", D = {
  row: TC,
  title: xC,
  turns: LC,
  waiting: AC,
  resolved: IC,
  activity: EC,
  cost: MC,
  link: BC,
  tableLink: jC,
  tableRecord: PC,
  tableRow: qC,
  tableTitle: DC,
  tableResolved: HC,
  tableMeta: OC,
  tableCost: FC,
  tableActivity: zC,
  tableState: WC
}, er = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function KC(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function GC(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function UC(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const VC = { duplicate: "Closed · duplicate" };
function YC({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(Ie, { className: D.tableMeta, text: `waiting on ${e}` });
}
function XC({ value: e }) {
  return /* @__PURE__ */ n("td", { className: D.tableCost, children: e === void 0 ? null : re(e) });
}
function JC({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${D.tableRecord} ward-target`, href: O(e.href), children: `→ ${e.key}` });
}
function QC({ session: e, href: a }) {
  const t = er[e.state];
  return /* @__PURE__ */ o("tr", { className: D.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: D.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${D.tableLink} ward-target`, href: O(a), children: /* @__PURE__ */ n(Ie, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: D.tableMeta, children: GC(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: D.tableResolved, children: [
      UC(e.resolved),
      /* @__PURE__ */ n(YC, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(XC, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: D.tableActivity, children: KC(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: D.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(h, { role: t.role, label: VC[e.state] ?? t.label }),
      /* @__PURE__ */ n(JC, { link: e.link })
    ] }) })
  ] });
}
function ZC({ session: e }) {
  const a = er[e.state];
  return /* @__PURE__ */ o("div", { className: D.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(Ie, { className: D.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: D.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(Ie, { className: D.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: D.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: D.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : re(e.cost) }),
    /* @__PURE__ */ n("span", { className: D.activity, children: de(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: D.link, href: O(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function e2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(QC, { session: e.session, href: e.href }) : /* @__PURE__ */ n(ZC, { session: e.session });
}
const e0 = "_block_1yy2v_3", a0 = "_list_1yy2v_9", n0 = "_line_1yy2v_14", Va = {
  block: e0,
  list: a0,
  line: n0
}, t0 = { warn: "warning", ok: "ok" };
function r0({ kind: e }) {
  const a = t0[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function l0({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Va.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(r0, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function a2({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Va.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Va.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(l0, { line: t }, `${r}-${t.text}`)) }) });
}
const o0 = "_band_tt7hp_1", i0 = "_head_tt7hp_8", s0 = "_cell_tt7hp_19", c0 = "_index_tt7hp_35", d0 = "_title_tt7hp_42", u0 = "_note_tt7hp_48", m0 = "_cellTitle_tt7hp_53", h0 = "_cellBody_tt7hp_58", w0 = "_tag_tt7hp_64", ge = {
  band: o0,
  head: i0,
  cell: s0,
  index: c0,
  title: d0,
  note: u0,
  cellTitle: m0,
  cellBody: h0,
  tag: w0
}, On = 4;
function n2({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== On)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${On}-cell grid`);
  return /* @__PURE__ */ o("section", { className: ge.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: ge.head, children: [
      /* @__PURE__ */ n("span", { className: ge.index, children: e }),
      /* @__PURE__ */ n("span", { className: ge.title, children: a }),
      /* @__PURE__ */ n("span", { className: ge.note, children: t })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: ge.cell, children: [
      /* @__PURE__ */ n("span", { className: ge.cellTitle, children: l.title }),
      /* @__PURE__ */ n("span", { className: ge.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ n("span", { className: ge.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  F0 as ActionStack,
  HS as ActivityConsole,
  L0 as AdminIcon,
  S_ as AgentCard,
  A0 as AppShell,
  $S as AppearanceStrip,
  n2 as Band,
  D0 as BarChart,
  Um as BoardColumn,
  tS as BoardFootnote,
  rS as BoardHeader,
  T0 as BoardIcon,
  Y0 as BoardScroller,
  f as Btn,
  k0 as CHIP_ROLES,
  Dt as CREDENTIAL_COLUMNS,
  q0 as Callout,
  CS as CapabilityRow,
  YS as ChatMessage,
  Yn as Checkbox,
  h as Chip,
  Ie as ClampText,
  OS as ClarificationRow,
  wS as ClauseRuleRow,
  hS as ClauseRules,
  gt as ColourLadder,
  SS as ComponentRow,
  FS as Composer,
  oS as ConfigRow,
  lS as ConfigRowHead,
  nn as ConnectionMark,
  DS as ConsoleAnnounceProvider,
  VS as Conversation,
  ud as CostMeter,
  TS as CredentialRow,
  RS as CredentialRowHead,
  zS as CriteriaList,
  Jo as Crumb,
  XS as DeliveryHealth,
  Q0 as DeniedState,
  fS as DryRunRail,
  mm as EmptyState,
  xS as EnvCard,
  M as Field,
  J0 as FilteredEmpty,
  U0 as FormStack,
  Ba as GateChecklist,
  WS as GateLadder,
  Cd as Grid,
  bS as HandoffRuleRow,
  vS as HandoffRules,
  R0 as HomeIcon,
  iS as ItemDrawer,
  LS as KeyPanel,
  vr as LIVE_EVENT_TYPES,
  Vw as LegacyBoardColumn,
  cS as LegacyBoardHeader,
  dS as LegacyConfigRow,
  mS as LegacyItemDrawer,
  Ow as LegacyOverCapNote,
  uS as LegacyPreviewRail,
  ft as LegacyWorkCard,
  Se as LiveIndicator,
  Z0 as LoadFailed,
  nS as Loading,
  Kt as MCP_SERVER_COLUMNS,
  an as Mark,
  IS as MarkUpload,
  Be as Marker,
  MS as McpServerRow,
  ES as McpServerRowHead,
  E0 as Menu,
  I0 as MenuButton,
  gS as NewStreamModal,
  _m as OverCapNote,
  ea as Overlay,
  _S as PARTIAL_STEP_REASON,
  Gt as POLICY_CHIP_WIDTH,
  W0 as PageFrame,
  P0 as PageHeader,
  H0 as PlainList,
  BS as PolicyRow,
  sS as PreviewRail,
  Da as ROLE_MATRIX_COLUMNS,
  At as RULE_ACTIONS,
  dt as Radio,
  JS as ReadyChecklist,
  G0 as RecordSection,
  KS as RequeueSheet,
  GS as ResolveBlock,
  QS as ResolvedFieldRow,
  jS as RoleMatrixRow,
  ZS as RoutingTable,
  pS as RuleRow,
  PS as RunbookSteps,
  fr as STREAM_STEPS,
  V0 as SectionBand,
  Cn as SectionHeader,
  st as SegmentedControl,
  nt as Select,
  e2 as SessionRow,
  j0 as Sidebar,
  yS as StageColumn,
  X0 as StageGrid,
  US as StageHistory,
  sb as StageListEditor,
  eS as StaleStrip,
  Ia as StatStrip,
  NS as StreamRow,
  x0 as StudioIcon,
  K0 as SubjectRail,
  We as Switch,
  B0 as TabLinks,
  O0 as TableHead,
  M0 as Tabs,
  kS as ToolRow,
  z0 as TopBar,
  Ru as Tree,
  ht as TreeRow,
  a2 as TypedInputBlock,
  Yl as UNSAFE_HREF,
  qS as ValidationList,
  b0 as VisibilityProvider,
  g0 as Visible,
  N0 as WARD_VERSION,
  Ma as WorkCard,
  aS as WriteUnavailableStrip,
  KC as agoSince,
  sr as clock,
  Cb as colourStatus,
  ae as count,
  ce as duration,
  Xa as elapsed,
  y0 as eventSourceTransport,
  Ra as isStreamStep,
  Ta as isValidatedStreamStep,
  nf as ladderValidation,
  YN as mcpConnectionChip,
  UN as mcpToolName,
  re as money,
  we as ms,
  wt as ordered,
  Wn as ratio,
  _y as restartLabel,
  O as safeHref,
  de as stamp,
  Ja as stream,
  C0 as streamChip,
  Aa as streamChipProps,
  ve as streamColour,
  gr as streamHex,
  $0 as streamVars,
  ha as useBorderFlash,
  hr as useFocusTrap,
  S0 as useLiveFeed,
  p0 as useReturnFocus,
  Sa as useRovingTabindex,
  Qa as useTicker,
  cr as useVisible,
  W as v,
  AS as validateMark,
  sa as validatedStep,
  Gn as validatedStreamSteps
};
