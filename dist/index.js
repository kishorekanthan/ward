import { jsx as n, Fragment as R, jsxs as o } from "react/jsx-runtime";
import { useMemo as On, useContext as Ie, createContext as Me, useCallback as J, useEffect as S, useState as p, useRef as w, useLayoutEffect as Va, useId as N, isValidElement as er, Children as ar, Fragment as nr } from "react";
import { createPortal as tr, flushSync as Hn } from "react-dom";
function ce(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const dn = (e) => String(e).padStart(2, "0");
function Xa(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${dn(a % 60)}s` : `${Math.floor(t / 60)}h ${dn(t % 60)}m`;
}
const rr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = rr.formatToParts(new Date(e)), t = (r) => {
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
function Fn(e, a) {
  return `${e} / ${a}`;
}
const lr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function or(e) {
  return lr.format(new Date(e));
}
const Wn = Me(/* @__PURE__ */ new Set());
function UC({ hidden: e, children: a }) {
  const t = On(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Wn.Provider, { value: t, children: a });
}
function ir(e) {
  return !Ie(Wn).has(e);
}
function VC({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(R, { children: ir(e) ? a : t });
}
const sr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function cr(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function dr(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = cr(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function ur(e) {
  return { onKeyDown: J(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(sr));
      dr(t, e.current, r);
    },
    [e]
  ) };
}
function XC(e, a = !0) {
  S(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const un = { ArrowUp: -1, ArrowDown: 1 }, mn = { ArrowLeft: -1, ArrowRight: 1 }, mr = (e, a, t) => Math.min(t, Math.max(a, e));
function hr(e, a) {
  if (a !== "horizontal" && e in un) return un[e];
  if (a !== "vertical" && e in mn) return mn[e];
}
function Ca({ orientation: e = "both" } = {}) {
  const [a, t] = p(0), r = w(/* @__PURE__ */ new Map()), l = w(!1);
  Va(() => {
    var b;
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const m = d[0], v = l.current;
    l.current = !1, t(m), v && ((b = r.current.get(m)) == null || b.focus());
  });
  const i = J((d) => t(d), []), s = J((d) => {
    var m;
    t(d), (m = r.current.get(d)) == null || m.focus();
  }, []), c = J(
    (d) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const v = Math.max(0, m.indexOf(a)), b = hr(d.key, e);
      b !== void 0 ? (d.preventDefault(), s(m[mr(v + b, 0, m.length - 1)])) : d.key === "Home" ? (d.preventDefault(), s(m[0])) : d.key === "End" && (d.preventDefault(), s(m[m.length - 1]));
    },
    [a, s, e]
  ), u = J(
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
const YC = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, JC = "0.2.0", QC = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], wr = [1, 2, 3, 4, 5, 6], zn = [1, 2, 3], _r = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], z = {
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
  focusRing: "var(--ward-focus-ring)",
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
function Kn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Sa(e) {
  return wr.includes(e);
}
function Ra(e) {
  return zn.includes(e);
}
function ZC(e) {
  if (!Sa(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function e0(e) {
  if (!Sa(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const fr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function vr(e) {
  if (!Sa(e)) throw new Error("unvalidated stream step");
  return fr[e];
}
function hn(e) {
  return typeof e != "string" ? null : _r.includes(e) ? e : null;
}
function br(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function gr(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function pr(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function yr(e, a, t) {
  const r = br(e);
  if (r === null) return null;
  const l = hn(t) ?? hn(r.type);
  return l === null ? null : { ...r, type: l, id: gr(r, a), at: pr(r) };
}
function Nr(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function kr(e, a, t) {
  return e >= we.heartbeat && !a && t !== null;
}
function a0(e, a) {
  const [t, r] = p("reconnecting"), [l, i] = p(null), s = w(/* @__PURE__ */ new Map()), c = w(0), u = w(""), d = w(0), m = w(null), v = w(0), b = w(0), y = w(!1), E = w("reconnecting"), j = J((C) => {
    E.current = C, r(C);
  }, []), oe = J(() => {
    c.current = Date.now();
  }, []), Re = J((C) => {
    for (const [K, be] of s.current)
      (be === "*" || C.itemKey === be) && K(C);
  }, []), ne = J(() => {
    m.current = a(e, { lastEventId: u.current }, {
      onEvent: (C, K, be) => {
        const qe = yr(C, K, be);
        qe !== null && (qe.id && (u.current = qe.id), oe(), y.current = !1, j("live"), i(qe.at), Re(qe));
      },
      onOpen: () => {
        d.current = 0, y.current = !1, oe(), j("live");
      },
      onError: () => {
        var K;
        (K = m.current) == null || K.close(), m.current = null, y.current = !0, E.current !== "stale" && j("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** d.current, we.reconnectMax);
        d.current += 1, v.current = window.setTimeout(ne, C);
      }
    });
  }, [Re, j, oe, a, e]), Ke = J((C) => {
    y.current = !0, C.close(), m.current = null, v.current = window.setTimeout(ne, we.reconnectBase);
  }, [ne]), Ge = J((C, K) => (s.current.set(K, C), () => {
    s.current.delete(K);
  }), []);
  return S(() => (ne(), b.current = window.setInterval(() => {
    const C = Date.now() - c.current, K = Nr(C, E.current);
    K && j(K);
    const be = m.current;
    kr(C, y.current, be) && Ke(be);
  }, we.tick), () => {
    var C;
    window.clearInterval(b.current), window.clearTimeout(v.current), y.current = !1, (C = m.current) == null || C.close(), m.current = null;
  }), [ne, Ke, j]), { connection: t, lastEventAt: l, subscribe: Ge };
}
function Ya(e, a) {
  const t = new Date(e).getTime(), [r, l] = p(() => Date.now());
  return S(() => {
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
const wn = { blue: "running", orange: "waiting", green: "done" };
function $r() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function _n(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ma(e, a) {
  const t = w(0), r = J((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && ($r() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${wn[i]})`), s.style.setProperty("--flash", `var(--ward-color-${wn[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => _n(s), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => _n(s), we.flash)));
  }, [a, e]);
  return S(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Cr = "_root_1otpc_2", Sr = {
  root: Cr
};
function Rr(e, a, t, r, l) {
  const i = [Xa(a)];
  return e || i.push(`as of ${or(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Se({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = Ya(e, l), s = (a == null ? void 0 : a.at) ?? e, c = Rr(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${Sr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const Tr = "_app_1l46g_1", xr = "_side_1l46g_20", Lr = "_main_1l46g_30", Ar = "_rail_1l46g_38", Er = "_page_1l46g_48", Ir = "_headerRow_1l46g_57", Mr = "_sidebarToggle_1l46g_64", jr = "_headerSlot_1l46g_69", qr = "_drawerSide_1l46g_74", Br = "_root_1l46g_108", Pr = "_topbar_1l46g_115", Dr = "_mark_1l46g_126", Or = "_brand_1l46g_133", Hr = "_tagline_1l46g_139", Fr = "_identity_1l46g_145", Wr = "_tools_1l46g_146", zr = "_nav_1l46g_156", Kr = "_metadata_1l46g_163", Gr = "_actor_1l46g_178", Ur = "_detail_1l46g_179", Vr = "_content_1l46g_239", Xr = "_toolsPanel_1l46g_255", Yr = "_skip_1l46g_281", x = {
  app: Tr,
  side: xr,
  main: Lr,
  rail: Ar,
  page: Er,
  headerRow: Ir,
  sidebarToggle: Mr,
  headerSlot: jr,
  drawerSide: qr,
  root: Br,
  topbar: Pr,
  mark: Dr,
  brand: Or,
  tagline: Hr,
  identity: Fr,
  tools: Wr,
  nav: zr,
  metadata: Kr,
  actor: Gr,
  detail: Ur,
  content: Vr,
  toolsPanel: Xr,
  skip: Yr
}, Jr = "_btn_tzr89_2", Qr = "_primary_tzr89_14", Zr = "_destructive_tzr89_25", el = "_secondary_tzr89_35", al = "_ghost_tzr89_40", nl = "_overflow_tzr89_49", tl = "_sm_tzr89_56", rl = "_disabled_tzr89_60", sa = {
  btn: Jr,
  primary: Qr,
  destructive: Zr,
  secondary: el,
  ghost: al,
  overflow: nl,
  sm: tl,
  disabled: rl
};
function ll(e, a, t, r) {
  const l = a === "sm" ? [sa.sm, "ward-btn--sm"] : [], i = t ? [sa.disabled] : [];
  return [sa.btn, sa[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function ol(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function il(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function sl(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function cl(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function dl(e, a, t) {
  return cl(e.describedBy, a && t);
}
function ul({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function ml(e) {
  return e.children ?? e.label;
}
function f(e) {
  il(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = sl(e), i = N();
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: ll(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": dl(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...ol(a, e.controls),
        children: ml(e)
      }
    ),
    /* @__PURE__ */ n(ul, { id: i, reason: l })
  ] });
}
function Ta(e) {
  const [a, t] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (s) => t(s.matches);
    return r.addEventListener("change", l), t(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
const hl = "_scrim_1p4r7_2", wl = "_drawer_1p4r7_10", _l = "_sheet_1p4r7_14", fl = "_modal_1p4r7_18", vl = "_panel_1p4r7_23", bl = "_start_1p4r7_39", gl = "_header_1p4r7_62", pl = "_title_1p4r7_70", yl = "_body_1p4r7_74", Nl = "_close_1p4r7_101", ke = {
  scrim: hl,
  drawer: wl,
  sheet: _l,
  modal: fl,
  panel: vl,
  start: bl,
  header: gl,
  title: pl,
  body: yl,
  close: Nl
}, kl = Me(null), fa = [], va = /* @__PURE__ */ new Map();
function $l(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Cl(e, a) {
  let t = va.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, va.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Sl(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !$l(r) && Cl(e, r);
}
function Rl(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (Sl(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function Tl(e) {
  for (const a of e.claims) {
    const t = va.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), va.delete(a)));
  }
}
function xl(e, a) {
  const t = { root: e, claims: [] };
  return fa.push(t), Rl(t, a), t;
}
function Ll(e) {
  const a = fa.indexOf(e);
  a >= 0 && fa.splice(a, 1), Tl(e);
}
function fn(e) {
  return e !== null && fa.at(-1) === e;
}
function Al(e, a, t) {
  const r = w(null), l = w(t);
  return l.current = t, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = xl(i, a);
    return r.current = c, () => {
      var d, m;
      const u = fn(c);
      Ll(c), r.current = null, u && ((m = (d = l.current ?? s) == null ? void 0 : d.focus) == null || m.call(d));
    };
  }, [a]), J(() => fn(r.current), []);
}
function El(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Il(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ml({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${ke.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("header", { className: `${ke.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${ke.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${ke.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function jl(e) {
  return `${ke.scrim} ${ke[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function ql(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ke.panel} ${ke[e]} ward-overlay-panel${t}${r}`;
}
function Bl(e) {
  const a = Ie(kl);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = w(null), t = w(null), r = N(), l = Bl(e.container), i = Ta("(min-width: 768px)"), s = El(e.kind, i), c = Il(e, r), u = ur(t), d = Al(a, l, e.returnFocusTo), m = J(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return S(() => {
    var v, b;
    d() && ((b = (v = t.current) == null ? void 0 : v.querySelector("button")) == null || b.focus());
  }, [d]), S(() => {
    const v = (b) => {
      b.key === "Escape" && m();
    };
    return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
  }, [m]), tr(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: jl(s),
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
            className: ql(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (v) => v.stopPropagation(),
            onKeyDown: (v) => d() && u.onKeyDown(v),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${ke.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Ml, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Pl = /^([a-z][a-z0-9+.-]*):/i, Dl = /* @__PURE__ */ new Set(["http", "https"]), Ol = "#";
function Hl(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = Pl.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = Hl(e);
  return a === void 0 || Dl.has(a) ? e : Ol;
}
function Fl(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Gn(e) {
  const a = Fl(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function oa(e, a, t) {
  S(() => {
    const r = e.current;
    if (!r) return;
    const l = () => {
      const s = Gn(r);
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
function Wl(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function Ja(e, a, t) {
  Va(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(t)[a];
    if (!r || !l) return;
    const i = Wl(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), Gn(r);
  }, [e, a, t]);
}
function zl() {
  const e = Ta("(max-width: 791.98px)"), a = N(), t = w(null), [r, l] = p(!1);
  return r && !e && l(!1), { narrow: e, open: r, drawerId: a, slotRef: t, toggle: () => l(!r), close: () => l(!1) };
}
function Kl({ header: e, label: a, drawer: t }) {
  return t.narrow ? /* @__PURE__ */ o("div", { className: x.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: t.slotRef, className: x.sidebarToggle, children: /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: x.headerSlot, children: e })
  ] }) : e;
}
function Gl({ sidebar: e, label: a, drawer: t }) {
  var l;
  if (!t.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && t.close();
  };
  return /* @__PURE__ */ n(ea, { kind: "start", id: t.drawerId, title: a, flush: !0, onClose: t.close, returnFocusTo: (l = t.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ n("div", { className: x.drawerSide, onClick: r, children: e }) });
}
function Ul({ sidebar: e, header: a, children: t, rail: r, sidebarLabel: l }) {
  const i = r != null, s = zl(), c = l ?? "Menu";
  return /* @__PURE__ */ o("div", { className: x.app, "data-rail": String(i), children: [
    !s.narrow && /* @__PURE__ */ n("div", { className: x.side, children: e }),
    /* @__PURE__ */ o("main", { className: x.main, children: [
      /* @__PURE__ */ n(Kl, { header: a, label: c, drawer: s }),
      /* @__PURE__ */ n("div", { className: x.page, children: t })
    ] }),
    i && /* @__PURE__ */ n("div", { className: x.rail, children: r }),
    /* @__PURE__ */ n(Gl, { sidebar: e, label: c, drawer: s })
  ] });
}
function Vl({ destinations: e, active: a }) {
  const t = w(null);
  return oa(t, e.length), Ja(t, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ n("nav", { ref: t, className: x.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ n("a", { href: W(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Ha({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Xl({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: x.metadata, children: [
    /* @__PURE__ */ n(Ha, { value: e, className: x.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Ha, { value: a, className: x.detail })
  ] });
}
function Yl() {
  const e = Ta("(max-width: 767.98px)"), a = N(), t = w(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = t.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Jl({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: x.tools, children: /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: x.tools, children: e });
}
function Ql({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const t = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: x.toolsPanel, hidden: !a.open, onKeyDown: t, children: e });
}
function Zl(e) {
  return /* @__PURE__ */ o("header", { className: x.topbar, children: [
    /* @__PURE__ */ n("span", { className: x.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: x.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Ha, { value: e.tagline, className: x.tagline }),
    /* @__PURE__ */ n(Vl, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: x.identity, children: /* @__PURE__ */ n(Xl, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Jl, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function eo(e) {
  const a = N(), t = Yl();
  return /* @__PURE__ */ o("div", { className: `${x.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: x.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Zl, { ...e, menu: t }),
    /* @__PURE__ */ n(Ql, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: x.content, children: e.children })
  ] });
}
function ao(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function n0(e) {
  return ao(e) ? /* @__PURE__ */ n(Ul, { ...e }) : /* @__PURE__ */ n(eo, { ...e });
}
function xa(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const no = "_root_197jc_2", to = "_row_197jc_8", ro = "_box_197jc_14", lo = "_label_197jc_21", oo = "_lockedNote_197jc_26", io = "_consequence_197jc_34", so = "_sample_197jc_69", De = {
  root: no,
  row: to,
  box: ro,
  label: lo,
  lockedNote: oo,
  consequence: io,
  sample: so
};
function co(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function uo({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${De.consequence} ward-check-consequence`, children: a }) : null;
}
function mo({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${De.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function ho({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: De.sample, "aria-hidden": "true", children: e }) : null;
}
function Un(e) {
  const a = N(), t = e.consequence ? `${a}-note` : void 0, r = co(e);
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
          "aria-describedby": xa(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: De.label, children: [
        e.label,
        /* @__PURE__ */ n(mo, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(ho, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(uo, { id: t, text: e.consequence })
  ] });
}
const wo = "_chip_pq6tb_2", _o = {
  chip: wo
}, fo = {
  gate: z.chip.gate,
  system: z.chip.system,
  write: z.chip.write,
  drift: z.chip.drift,
  done: z.chip.done,
  attention: z.chip.attention,
  failed: z.chip.failed,
  pending: z.chip.pending,
  running: z.chip.running,
  warn: z.chip.warn,
  meta: z.chip.meta,
  soft: z.chip.soft,
  quiet: z.chip.quiet,
  owed: z.chip.owed
};
function vo(e, a) {
  if (e === "stream") return bo(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = fo[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function bo(e) {
  if (!e || !Ra(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Kn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${_o.chip} ward-chip ward-chip--${e}`, style: vo(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
const go = "_clamp_zn74g_3", vn = {
  clamp: go
};
function Ee({ text: e, as: a = "span", className: t }) {
  return /* @__PURE__ */ n(a, { className: t === void 0 ? vn.clamp : `${vn.clamp} ${t}`, "data-ward-clamp": "", title: e, children: e });
}
function ia(e) {
  return typeof e == "number" && Ra(e) ? e : null;
}
function ve(e, a) {
  const t = ia(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function La(e, a) {
  const t = ia(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const po = "_nav_8lufj_2", yo = "_list_8lufj_8", No = "_item_8lufj_15", ko = "_link_8lufj_30", $o = "_sep_8lufj_40", Co = "_current_8lufj_44", So = "_chips_8lufj_48", Be = {
  nav: po,
  list: yo,
  item: No,
  link: ko,
  sep: $o,
  current: Co,
  chips: So
};
function Ro({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Be.nav, children: [
    /* @__PURE__ */ n("ol", { className: Be.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: Be.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: Be.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${Be.link} ward-target`, href: W(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Be.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Be.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] }) });
}
function Vn(e, a, t) {
  const r = w(t);
  r.current = t, S(() => {
    if (!e) return;
    const l = (i) => {
      var s;
      (s = a.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, a]);
}
const To = 500;
function Xn(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function Yn() {
  const e = w(""), a = w(void 0);
  return S(() => () => clearTimeout(a.current), []), (t) => (clearTimeout(a.current), e.current += t.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, To), e.current);
}
const xo = "_root_glrsq_2", Lo = "_trigger_glrsq_7", Ao = "_value_glrsq_32", Eo = "_menu_glrsq_49", Io = "_find_glrsq_71", Mo = "_list_glrsq_85", jo = "_option_glrsq_95", qo = "_check_glrsq_114", Bo = "_empty_glrsq_125", _e = {
  root: xo,
  trigger: Lo,
  value: Ao,
  menu: Eo,
  find: Io,
  list: Mo,
  option: jo,
  check: qo,
  empty: Bo
}, Po = 7;
function Do(e, a) {
  const t = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(t));
}
function bn(e, a) {
  return Math.max(0, e.findIndex((t) => t.value === a));
}
function Oo(e, a) {
  const [t, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => bn(e.options, e.value)), u = (d) => {
    var m;
    Hn(() => r(!1)), d && ((m = a.current) == null || m.focus());
  };
  return {
    open: t,
    query: l,
    active: s,
    entries: Do(e.options, l),
    findable: e.options.length > Po,
    show: () => {
      e.disabled || (i(""), c(bn(e.options, e.value)), r(!0));
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
function Ho(e, a) {
  const t = w(!1);
  return S(() => {
    var r;
    e && t.current && ((r = a.current) == null || r.focus()), t.current = !1;
  }), () => {
    t.current = !0;
  };
}
function Fo(e) {
  const a = Yn();
  return (t) => {
    const r = a(t), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function Jn(e) {
  const a = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, a)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Wo(e) {
  return { ...Jn(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function Qn(e, a, t) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = a[r.key];
    if (!l) return t(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const zo = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Ko(e, a) {
  const t = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : t(),
    onKeyDown: (r) => {
      zo.has(r.key) && (r.preventDefault(), t());
    }
  };
}
function Go({ entry: e, at: a, menu: t, ids: r, value: l }) {
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
function Qa(e, a) {
  const t = e.entries[e.active];
  return t ? a.option(t.index) : void 0;
}
function Uo({ menu: e, ids: a, focusRef: t }) {
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
      "aria-activedescendant": Qa(e, a),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: Qn(e, Jn(e), () => {
      })
    }
  );
}
function Vo({ props: e, menu: a, ids: t, focusRef: r }) {
  const l = Fo(a), i = (s) => {
    Xn(s) && l(s.key);
  };
  return /* @__PURE__ */ o("div", { className: _e.menu, children: [
    a.findable && /* @__PURE__ */ n(Uo, { menu: a, ids: t, focusRef: r }),
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
        "aria-activedescendant": a.findable ? void 0 : Qa(a, t),
        onKeyDown: Qn(a, Wo(a), i),
        children: a.entries.map((s, c) => /* @__PURE__ */ n(Go, { entry: s, at: c, menu: a, ids: t, value: e.value }, s.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ n("p", { className: _e.empty, children: "No match" })
  ] });
}
function Xo(e, a) {
  const t = e.open ? Qa(e, a) : void 0;
  S(() => {
    var r, l;
    t && ((l = (r = document.getElementById(t)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [t]);
}
function Zn(...e) {
  return e.filter(Boolean).join(" ");
}
function Yo(e) {
  var a;
  return ((a = e.options.find((t) => t.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function Jo({ props: e, menu: a, ids: t, trigger: r, wantFocus: l }) {
  const i = !e.options.some((s) => s.value === e.value);
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: Zn(_e.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": a.open,
      "aria-controls": a.open ? t.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": xa(e["aria-describedby"], t.value),
      "aria-invalid": e["aria-invalid"],
      disabled: e.disabled,
      ...Ko(a, l),
      children: /* @__PURE__ */ n("span", { id: t.value, className: _e.value, "data-placeholder": i || void 0, children: Yo(e) })
    }
  );
}
function et(e) {
  const a = N(), t = { list: `${a}-list`, value: `${a}-value`, option: (u) => `${a}-option-${u}` }, r = w(null), l = w(null), i = w(null), s = Oo(e, l), c = Ho(s.open, i);
  return Vn(s.open, r, () => s.close(!1)), Xo(s, t), /* @__PURE__ */ o("div", { ref: r, className: Zn(_e.root, e.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(Jo, { props: e, menu: s, ids: t, trigger: l, wantFocus: c }),
    e.name && /* @__PURE__ */ n("input", { type: "hidden", name: e.name, value: e.value }),
    s.open && /* @__PURE__ */ n(Vo, { props: e, menu: s, ids: t, focusRef: i })
  ] });
}
const Qo = "_field_djnju_2", Zo = "_label_djnju_8", ei = "_labelHidden_djnju_15", ai = "_control_djnju_25", ni = "_mono_djnju_45", ti = "_area_djnju_50", ri = "_invalid_djnju_57", Ae = {
  field: Qo,
  label: Zo,
  labelHidden: ei,
  control: ai,
  mono: ni,
  area: ti,
  invalid: ri
}, li = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, at = (e) => `${e}-label`;
function oi({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? li : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function ii({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n(
    et,
    {
      id: a.id,
      triggerClassName: t,
      "aria-labelledby": at(a.id),
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
function si({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const ci = { input: oi, select: ii, textarea: si };
function di(e, a, t) {
  const r = ci[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function ui(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": xa(r ? t : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function mi(e) {
  const a = e.mono ? [Ae.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Ae.area] : [];
  return [Ae.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function hi(e) {
  return e ? `${Ae.label} ${Ae.labelHidden} ward-field-label` : `${Ae.label} ward-field-label`;
}
function M(e) {
  const a = N(), t = `${a}-msg`, r = ui(e, a, t), l = mi(e);
  return /* @__PURE__ */ o("div", { className: `${Ae.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: at(a), className: hi(e.labelHidden), htmlFor: a, children: e.label }),
    di(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Ae.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const wi = "_root_u4xjq_2", _i = "_trigger_u4xjq_9", fi = "_panel_u4xjq_33", vi = "_menu_u4xjq_56", bi = "_group_u4xjq_61", gi = "_heading_u4xjq_66", pi = "_item_u4xjq_72", yi = "_separator_u4xjq_98", Ni = "_footer_u4xjq_104", Ce = {
  root: wi,
  trigger: _i,
  panel: fi,
  menu: vi,
  group: bi,
  heading: gi,
  item: pi,
  separator: yi,
  footer: Ni
}, nt = Me(null);
function ki(e, a) {
  const [t, r] = p({ open: e, start: null, request: 0 });
  return {
    ...t,
    show: (l) => r((i) => ({ open: !0, start: l, request: i.request + 1 })),
    close: (l) => {
      var i;
      Hn(() => r((s) => ({ ...s, open: !1 }))), l && ((i = a.current) == null || i.focus());
    }
  };
}
const $i = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Ci(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const t = $i.get(a.key);
      t && (a.preventDefault(), e.show(t));
    },
    onKeyUp: (a) => {
      a.key === " " && a.preventDefault();
    }
  };
}
function Si(...e) {
  return e.filter(Boolean).join(" ");
}
function t0(e) {
  const a = N(), t = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = w(null), l = w(null), i = ki(e.defaultOpen === !0, l);
  return Vn(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: Si(Ce.root, e.className), "data-ward-menu": "", children: [
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
        ...Ci(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(nt.Provider, { value: { ...t, popup: i }, children: e.children })
  ] });
}
function Ri(e) {
  let a = 0;
  const t = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(t) } : { kind: "item", row: t(r) });
}
function Ti(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const tt = (e, a) => (e % a + a) % a;
function Je(e, a, t) {
  for (let r = 1; r <= e.length; r++) {
    const l = tt(a + t * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const xi = (e) => e.split("").every((a) => a === e[0]);
function Li(e, a, t) {
  const r = xi(t), l = r ? t[0] : t, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const u = tt(i + c, e.length);
    if (s(e[u])) return u;
  }
  return -1;
}
function Ai(e) {
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
function Ei(e, a) {
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
function Ii(e, a) {
  const t = w(!1), r = Yn(), l = Ei(e, a), i = (s) => {
    Xn(s) && e.focus(Li(e.items, e.current(), r(s.key)));
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
function Mi(e, a) {
  const { start: t, request: r } = a, l = w(e);
  l.current = e, S(() => {
    const { items: i, focus: s } = l.current;
    t && s(t === "first" ? Je(i, -1, 1) : Je(i, i.length, -1));
  }, [t, r]);
}
function ji({ row: e, nav: a, popup: t }) {
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
function rt(e) {
  const { item: a, at: t } = e.row, r = {
    ref: (l) => {
      e.nav.refs.current[t] = l;
    },
    role: "menuitem",
    tabIndex: -1,
    className: Ce.item,
    "aria-disabled": a.disabled ? "true" : void 0,
    ...ji(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ n("a", { href: W(a.href), ...r, children: a.label }) : /* @__PURE__ */ n("button", { type: "button", ...r, children: a.label });
}
function qi({ heading: e, rows: a, nav: t, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: Ce.group, children: [
    /* @__PURE__ */ n("div", { id: l, className: Ce.heading, children: e }),
    a.map((i) => /* @__PURE__ */ n(rt, { row: i, nav: t, popup: r }, i.at))
  ] });
}
function Bi({ block: e, nav: a, popup: t }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: Ce.separator }) : e.kind === "group" ? /* @__PURE__ */ n(qi, { heading: e.heading, rows: e.rows, nav: a, popup: t }) : /* @__PURE__ */ n(rt, { row: e.row, nav: a, popup: t });
}
function Pi() {
  const e = Ie(nt);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function r0({ entries: e, footer: a, align: t = "start" }) {
  const { popup: r, menuId: l, buttonId: i } = Pi(), s = Ri(e), c = Ai(s.flatMap(Ti).map((d) => d.item)), u = Ii(c, r);
  return Mi(c, r), /* @__PURE__ */ o("div", { className: Ce.panel, "data-align": t, children: [
    /* @__PURE__ */ n("div", { role: "menu", id: l, "aria-labelledby": i, className: Ce.menu, ...u, children: s.map((d, m) => /* @__PURE__ */ n(Bi, { block: d, nav: c, popup: r }, m)) }),
    a && /* @__PURE__ */ n("p", { className: Ce.footer, children: a })
  ] });
}
const Di = "_strip_1nfwi_2", Oi = "_tab_1nfwi_32", Hi = "_count_1nfwi_68", ra = {
  strip: Di,
  tab: Oi,
  count: Hi
}, ba = 7;
function Fi(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function lt(e) {
  return `${ra.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function l0({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > ba) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${ba} — the set is fixed`);
  const i = Ca({ orientation: "horizontal" }), s = Fi(e, a);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = w(null);
  return oa(c, e.length), Ja(c, s, '[role="tab"]'), /* @__PURE__ */ n(
    "div",
    {
      ref: c,
      className: lt(l),
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
            u.count === void 0 ? null : /* @__PURE__ */ o(R, { children: [
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
function o0({ links: e, active: a, label: t, level: r = 1 }) {
  if (e.length > ba) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ba} — the set is fixed`);
  const l = w(null);
  return oa(l, e.length), Ja(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ n("nav", { ref: l, className: lt(r), "aria-label": t, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ra.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(R, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: ra.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const Wi = "_root_v56ff_3", zi = "_segment_v56ff_9", gn = {
  root: Wi,
  segment: zi
};
function ot({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Ca({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((u) => u.value === a));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${gn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: gn.segment,
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
const Ki = "_sidebar_121ja_3", Gi = "_brand_121ja_9", Ui = "_mark_121ja_17", Vi = "_word_121ja_24", Xi = "_nav_121ja_30", Yi = "_navItem_121ja_39", Ji = "_footLink_121ja_49", Qi = "_group_121ja_58", Zi = "_groupName_121ja_65", es = "_agents_121ja_81", as = "_agent_121ja_81", ns = "_root_121ja_96", ts = "_agentTop_121ja_105", rs = "_dot_121ja_112", ls = "_agentName_121ja_124", os = "_agentMeta_121ja_137", is = "_foot_121ja_49", ss = "_footName_121ja_149", cs = "_footLinks_121ja_156", ds = "_linkBrand_121ja_183", us = "_label_121ja_204", ms = "_note_121ja_209", hs = "_footer_121ja_218", T = {
  sidebar: Ki,
  brand: Gi,
  mark: Ui,
  word: Vi,
  nav: Xi,
  navItem: Yi,
  new: "_new_121ja_48",
  footLink: Ji,
  group: Qi,
  groupName: Zi,
  agents: es,
  agent: as,
  root: ns,
  agentTop: ts,
  dot: rs,
  agentName: ls,
  agentMeta: os,
  foot: is,
  footName: ss,
  footLinks: cs,
  linkBrand: ds,
  label: us,
  note: ms,
  footer: hs
};
function ws({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: T.agent,
      href: W(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: T.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: T.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": Kn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: T.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: T.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function _s({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: T.foot, children: [
    /* @__PURE__ */ n("span", { className: T.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: T.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: `${T.footLink} ward-target`, href: W(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function fs({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: T.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: T.brand, children: [
      /* @__PURE__ */ n("span", { className: T.mark }),
      /* @__PURE__ */ n("span", { className: T.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: T.nav, children: a.map((s) => /* @__PURE__ */ n("a", { className: T.navItem, href: W(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: T.group, children: [
      /* @__PURE__ */ o("span", { className: T.groupName, children: [
        t,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: T.new, href: W(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: T.agents, children: r.map((s) => /* @__PURE__ */ n(ws, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(_s, { shared: i })
  ] });
}
function vs(e) {
  return e.destinations ?? e.items ?? [];
}
function bs({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: T.linkBrand, children: e });
}
function gs({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: T.footer, children: e });
}
function ps({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: W(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: T.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: T.note, children: e.note })
  ] });
}
function ys(e) {
  return /* @__PURE__ */ o("aside", { className: `${T.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(bs, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: vs(e).map((a) => /* @__PURE__ */ n(ps, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(gs, { children: e.children })
  ] });
}
function Ns(e) {
  return "agents" in e;
}
function i0(e) {
  return Ns(e) ? /* @__PURE__ */ n(fs, { ...e }) : /* @__PURE__ */ n(ys, { ...e });
}
const ks = "_mark_wlgi8_3", $s = {
  mark: ks
}, Cs = { met: "✓", unmet: "", failed: "✕" };
function Za({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: $s.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Cs[e]
    }
  );
}
const Ss = "_marker_br9fi_2", Rs = {
  marker: Ss
}, Ts = {
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
}, xs = { running: " ward-running" };
function je({ size: e, kind: a, label: t }) {
  const r = { "--marker": Ts[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Rs.marker} ward-marker ward-marker--${a}${xs[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Ls = "_root_ti0pq_2", As = "_chip_ti0pq_11", Es = "_noCase_ti0pq_23", ca = {
  root: Ls,
  chip: As,
  noCase: Es
};
function Is(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function en({ connection: e, since: a, lastEventAt: t }) {
  const r = Is(a, t), l = Ya(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${ca.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(je, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${ca.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: ca.noCase, children: Xa(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${ca.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    de(r)
  ] });
}
const Ms = "_root_1cvxf_2", js = "_context_1cvxf_12", qs = "_row_1cvxf_1", Bs = "_heading_1cvxf_25", Ps = "_headingWrap_1cvxf_33", Ds = "_chips_1cvxf_38", Os = "_title_1cvxf_45", Hs = "_consequence_1cvxf_55", Fs = "_actionsWrap_1cvxf_62", Ws = "_actions_1cvxf_62", zs = "_action_1cvxf_62", Ks = "_overflowPanel_1cvxf_91", Gs = "_measureClip_1cvxf_102", Us = "_measure_1cvxf_102", V = {
  root: Ms,
  context: js,
  row: qs,
  heading: Bs,
  headingWrap: Ps,
  chips: Ds,
  title: Os,
  consequence: Hs,
  actionsWrap: Fs,
  actions: Ws,
  action: zs,
  overflowPanel: Ks,
  measureClip: Gs,
  measure: Us
};
function Vs({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ n(Ee, { as: "h1", className: V.title, text: e }) : /* @__PURE__ */ n("h1", { className: V.title, children: e });
}
function Xs({ title: e, consequence: a, consequenceHint: t, density: r }) {
  return /* @__PURE__ */ o("div", { className: V.heading, children: [
    /* @__PURE__ */ n(Vs, { title: e, density: r }),
    a && /* @__PURE__ */ n("p", { className: V.consequence, title: t, children: a })
  ] });
}
function Fa({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: V.action, "data-action": "", children: a }, t));
}
function pn({ disclosure: e }) {
  return /* @__PURE__ */ n(f, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Ys({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(f, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(pn, { disclosure: l }) : a ? [/* @__PURE__ */ n(pn, { disclosure: l }, "more"), /* @__PURE__ */ n(Fa, { actions: e }, "actions")] : /* @__PURE__ */ n(Fa, { actions: e });
}
function Js(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Qs({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: V.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Fa, { actions: e }) });
}
function Zs(e, a) {
  const t = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var u, d;
    l(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function ec({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: V.context, children: [
    /* @__PURE__ */ n(Ro, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: V.chips, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] });
}
function ac(...e) {
  return e.some((a) => a === null);
}
function nc(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function tc(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + nc(e);
}
function rc(e, a, t, r, l) {
  if (l === 0 || ac(a, t, r)) return !1;
  const [i, s, c] = [a, t, r], u = Math.max(0, e.clientWidth - tc(e, i));
  return c.offsetWidth > u || s.scrollWidth > s.clientWidth + 1;
}
function lc(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function oc(e) {
  return er(e) && (e.type === "a" || typeof e.props.href == "string");
}
function ic(e, a) {
  return a.length === 0 && e.length === 1 && oc(e[0]);
}
function sc(e, a) {
  const t = w(null), r = w(null), l = w(null), i = w(null), [s, c] = p(!1);
  return S(() => {
    const u = t.current;
    if (!lc(u)) return;
    const d = () => c(rc(u, r.current, l.current, i.current, e.length)), m = new ResizeObserver(d);
    return m.observe(u), i.current && m.observe(i.current), d(), () => m.disconnect();
  }, [e]), { rowRef: t, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function cc({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ n("div", { className: V.measureClip, children: /* @__PURE__ */ o("div", { className: V.measure, ref: t, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(f, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function dc({ connection: e }) {
  return e ? /* @__PURE__ */ n(en, { connection: e.connection, since: e.since }) : null;
}
function s0({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: u, density: d = "page" }) {
  const { rowRef: m, headingRef: v, actionsRef: b, measureRef: y, collapsed: E } = sc(i, ic(i, s)), j = s.length > 0, { disclosure: oe, close: Re } = Zs(E || j, b), ne = Js(s, i, E, u);
  return /* @__PURE__ */ o("header", { className: V.root, "data-density": d, children: [
    /* @__PURE__ */ n(ec, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: V.row, ref: m, children: [
      /* @__PURE__ */ n("div", { ref: v, className: V.headingWrap, children: /* @__PURE__ */ n(Xs, { title: t, consequence: r, consequenceHint: l, density: d }) }),
      /* @__PURE__ */ o("div", { className: V.actionsWrap, children: [
        /* @__PURE__ */ n(dc, { connection: c }),
        /* @__PURE__ */ n("div", { className: V.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ n(Ys, { actions: i, hasMore: j, collapsed: E, onOverflow: u, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Qs, { actions: ne, disclosure: oe, onEscape: Re }),
    /* @__PURE__ */ n(cc, { actions: i, hasMore: j, measureRef: y })
  ] });
}
const uc = "_root_td96x_2", mc = "_body_td96x_16", yn = {
  root: uc,
  body: mc
};
function c0({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${yn.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ n("div", { className: yn.body, children: t }) });
}
const hc = "_root_bf1pc_2", wc = "_table_bf1pc_9", _c = "_caption_bf1pc_14", fc = "_series_bf1pc_23", vc = "_category_bf1pc_31", bc = "_cell_bf1pc_39", gc = "_track_bf1pc_45", pc = "_lane_bf1pc_52", yc = "_bar_bf1pc_56", Nc = "_value_bf1pc_63", kc = "_swatch_bf1pc_70", $c = "_empty_bf1pc_78", X = {
  root: hc,
  table: wc,
  caption: _c,
  series: fc,
  category: vc,
  cell: bc,
  track: gc,
  lane: pc,
  bar: yc,
  value: Nc,
  swatch: kc,
  empty: $c
}, Cc = "—", Nn = 6;
function Sc(e, a) {
  if (a.length < 1 || a.length > Nn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${Nn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function Rc(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function it(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Tc(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function xc({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = Tc(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ o("span", { className: X.track, children: [
    /* @__PURE__ */ n("span", { className: X.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${X.bar} ward-barchart-bar`, "data-step": t, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: X.value, children: e === null ? l : r(e) })
  ] }) });
}
function Lc({ series: e }) {
  return /* @__PURE__ */ n(R, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: X.swatch, "data-step": it(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Ac({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: X.caption, children: e }),
    /* @__PURE__ */ n("p", { className: X.empty, children: a })
  ] });
}
function Ec({ title: e, categories: a, series: t, top: r, format: l = ae, categoryHead: i = "Category", missing: s = Cc }) {
  return /* @__PURE__ */ n("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: X.table, children: [
    /* @__PURE__ */ n("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: X.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Lc, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((c, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: X.category, children: c }),
      t.map((d, m) => /* @__PURE__ */ n(xc, { value: d.values[u], top: r, step: it(m, t.length), format: l, missing: s }, d.name))
    ] }, c)) })
  ] }) });
}
function d0(e) {
  Sc(e.categories, e.series);
  const a = Rc(e.series);
  return a === 0 ? /* @__PURE__ */ n(Ac, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Ec, { ...e, top: a });
}
const Ic = "_root_1bfqw_2", Mc = "_figure_1bfqw_7", jc = "_of_1bfqw_13", qc = "_bar_1bfqw_18", Bc = "_rows_1bfqw_38", Pc = "_row_1bfqw_38", Dc = "_label_1bfqw_49", Oc = "_amount_1bfqw_54", Te = {
  root: Ic,
  figure: Mc,
  of: jc,
  bar: qc,
  rows: Bc,
  row: Pc,
  label: Dc,
  amount: Oc
};
function Hc({ spent: e, ceiling: a, breakdown: t }) {
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
const Fc = "_frame_357zi_2", Wc = "_table_357zi_6", zc = "_th_357zi_12", Kc = "_td_357zi_13", Gc = "_sort_357zi_48", Uc = "_row_357zi_60", Vc = "_empty_357zi_68", Le = {
  frame: Fc,
  table: Wc,
  th: zc,
  td: Kc,
  sort: Gc,
  row: Uc,
  empty: Vc
}, Xc = { asc: "ascending", desc: "descending" };
function Yc(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return Xc[a.direction];
}
function Jc(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Le.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Qc(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Zc({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Le.th,
      style: Qc(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Yc(e, a),
      children: Jc(e, t)
    }
  );
}
function ed({ row: e, props: a }) {
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
function ad({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Le.head, children: a.map((m) => /* @__PURE__ */ n(Zc, { column: m, sort: c, onSort: u }, m.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((m) => /* @__PURE__ */ n(ed, { row: m, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: u, empty: d } }, r(m))) })
  ] }) });
}
const nd = "_list_v0s52_2", td = {
  list: nd
};
function u0({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: td.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const rd = "_label_1u62a_2", ld = {
  label: rd
};
function m0({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((a) => /* @__PURE__ */ n("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ n("span", { className: ld.label, children: a.header }) }, a.key)) }) });
}
const od = "_stack_bp6a0_2", id = {
  stack: od
};
function h0({ children: e }) {
  return /* @__PURE__ */ n("span", { className: id.stack, "data-ward-action-stack": "", children: e });
}
const sd = "_set_1z0sq_2", cd = "_legend_1z0sq_7", dd = "_row_1z0sq_15", ud = "_control_1z0sq_20", md = "_input_1z0sq_26", hd = "_label_1z0sq_31", wd = "_consequence_1z0sq_36", Pe = {
  set: sd,
  legend: cd,
  row: dd,
  control: ud,
  input: md,
  label: hd,
  consequence: wd
};
function st({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const u = N(), d = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: Pe.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: Pe.legend, children: e }),
    a.map((m) => {
      const v = `${d}-${m.value}`, b = m.consequence ? `${v}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Pe.row, children: [
        /* @__PURE__ */ o("span", { className: Pe.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: v,
              type: "radio",
              name: d,
              className: Pe.input,
              value: m.value,
              checked: t === m.value,
              disabled: l,
              "aria-describedby": xa(b, s),
              onChange: () => !l && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: v, className: Pe.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ n("p", { id: b, className: `${Pe.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const _d = "_root_s12pg_2", fd = "_head_s12pg_11", vd = "_note_s12pg_30", bd = "_index_s12pg_35", gd = "_dot_s12pg_39", pd = "_counter_s12pg_50", yd = "_trailing_s12pg_58", Oe = {
  root: _d,
  head: fd,
  note: vd,
  index: bd,
  dot: gd,
  counter: pd,
  trailing: yd
};
function Nd({ index: e }) {
  return e ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("span", { className: `${Oe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Oe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function kd({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Oe.counter, "aria-hidden": "true", children: e }) : null;
}
function kn({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Oe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Oe.head, children: [
      /* @__PURE__ */ n(Nd, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Oe.note, children: t }),
    /* @__PURE__ */ n(kd, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Oe.trailing, children: i })
  ] });
}
const $d = "_strip_1eouv_2", Cd = "_cell_1eouv_7", Sd = "_value_1eouv_12", Rd = "_link_1eouv_29", Td = "_label_1eouv_47", We = {
  strip: $d,
  cell: Cd,
  value: Sd,
  link: Rd,
  label: Td
};
function xd(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const ct = (e) => `${We.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Ld({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: We.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: ct(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${We.label} ward-stat-label`, children: e.label })
  ] });
}
function Ad({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: We.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: ct(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${We.link} ward-stat-link`, href: W(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${We.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Aa({ cells: e, divided: a = !1 }) {
  return xd(e), /* @__PURE__ */ n("dl", { className: `${We.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => t.href === void 0 ? /* @__PURE__ */ n(Ld, { cell: t }, t.label) : /* @__PURE__ */ n(Ad, { cell: t, href: t.href }, t.label)) });
}
const Ed = "_root_1eb1u_2", Id = "_track_1eb1u_8", Md = "_thumb_1eb1u_46", jd = "_labelHidden_1eb1u_64", qd = "_label_1eb1u_64", Bd = "_lockedNote_1eb1u_84", He = {
  root: Ed,
  track: Id,
  thumb: Md,
  labelHidden: jd,
  label: qd,
  lockedNote: Bd
};
function Pd(e) {
  return e ? `${He.label} ${He.labelHidden}` : He.label;
}
function ze({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), u = `${c}switch`, d = l ? !0 : a, m = r || l;
  return /* @__PURE__ */ o("span", { className: `${He.root} ward-switchrow`, children: [
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
        className: `${He.track} ward-switch`,
        "data-on": d,
        "data-locked": l ? !0 : void 0,
        disabled: m,
        onClick: () => !m && (t == null ? void 0 : t(!d)),
        children: /* @__PURE__ */ n("span", { className: He.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: u, className: Pd(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: He.lockedNote, children: "always on" })
    ] })
  ] });
}
const Dd = "_bar_1vp69_2", Od = "_skip_1vp69_11", Hd = "_mark_1vp69_22", Fd = "_nav_1vp69_30", Wd = "_list_1vp69_34", zd = "_select_1vp69_41", Kd = "_selectTrigger_1vp69_45", Gd = "_dest_1vp69_52", Ud = "_actor_1vp69_71", Vd = "_actorMark_1vp69_84", Xd = "_actorLabel_1vp69_89", Yd = "_tagline_1vp69_108", ie = {
  bar: Dd,
  skip: Od,
  mark: Hd,
  nav: Fd,
  list: Wd,
  select: zd,
  selectTrigger: Kd,
  dest: Gd,
  actor: Ud,
  actorMark: Vd,
  actorLabel: Xd,
  tagline: Yd
};
function Jd(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Qd(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function w0({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = Qd(r);
  return /* @__PURE__ */ o("header", { className: ie.bar, children: [
    /* @__PURE__ */ n("a", { className: `${ie.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: ie.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: ie.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: ie.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: ie.list, children: a.map((u) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${ie.dest} ward-target`,
          href: W(u.href),
          "aria-current": u.id === t ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ n(
        et,
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
      /* @__PURE__ */ n("span", { className: ie.actorMark, "aria-hidden": "true", children: Jd(c) })
    ] })
  ] });
}
const Zd = "_tree_zzoob_2", eu = "_item_zzoob_6", au = "_row_zzoob_10", nu = "_button_zzoob_22", ga = {
  tree: Zd,
  item: eu,
  row: au,
  button: nu
}, dt = Me(null);
function tu({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = Ca({ orientation: "vertical" });
  return /* @__PURE__ */ n(dt.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ga.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const ru = { ArrowRight: !0, ArrowLeft: !1 };
function $n(e) {
  return e ? !0 : void 0;
}
function lu(e, a) {
  const t = ru[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function ou(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function iu(e) {
  const a = [ga.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function su(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function cu(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function du(e) {
  return typeof e == "string" ? e : void 0;
}
function uu({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function mu({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function ut(e) {
  const a = Ie(dt);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = su(e);
  return /* @__PURE__ */ o("li", { className: ga.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: iu(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": $n(e.unresolved),
        "data-inherited": $n(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${ga.button} ward-treeitem-btn`,
            onClick: () => ou(e),
            onKeyDown: (r) => lu(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: cu(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: du(e.label), children: e.label }),
              /* @__PURE__ */ n(uu, { value: e.detail }),
              /* @__PURE__ */ n(mu, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const hu = "_frame_1fj9j_2", wu = "_subjectRail_1fj9j_22", _u = "_subject_1fj9j_22", fu = "_rail_1fj9j_42", vu = "_record_1fj9j_64", bu = "_recordBody_1fj9j_69", gu = "_stageGrid_1fj9j_118", pu = "_band_1fj9j_144", yu = "_bandBody_1fj9j_153", Nu = "_bandActions_1fj9j_158", ku = "_scroller_1fj9j_166", $u = "_board_1fj9j_192", Cu = "_laneCount_1fj9j_200", Su = "_lanes_1fj9j_210", Y = {
  frame: hu,
  subjectRail: wu,
  subject: _u,
  rail: fu,
  record: vu,
  recordBody: bu,
  stageGrid: gu,
  band: pu,
  bandBody: yu,
  bandActions: Nu,
  scroller: ku,
  board: $u,
  laneCount: Cu,
  lanes: Su
};
function _0({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: Y.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function Cn(e) {
  return e ? "true" : void 0;
}
function f0({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Y.subjectRail, "data-ward-subject-rail": t, "data-ruled": Cn(i), children: [
    /* @__PURE__ */ n("div", { className: Y.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: Y.rail, "data-sticky": Cn(l), "aria-label": r, children: a })
  ] });
}
function v0({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(kn, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(kn, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: Y.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Ru = "_form_1j8ub_2", Tu = "_fields_1j8ub_9", xu = "_actions_1j8ub_19", ja = {
  form: Ru,
  fields: Tu,
  actions: xu
};
function b0({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: ja.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: ja.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: ja.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function g0({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: Y.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: Y.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: Y.bandActions, children: a })
  ] });
}
const Lu = "(max-width: 767.98px)";
function an({ label: e, children: a, laneCount: t, onOverflow: r }) {
  const l = w(null);
  oa(l, t ?? ar.count(a), r);
  const i = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function Au({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Y.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(M, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(an, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Eu({ lanes: e, label: a }) {
  const [t, r] = p(!1);
  return /* @__PURE__ */ o("div", { className: Y.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: Y.laneCount, "data-ward-board-lane-count": "", hidden: !t, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ n(an, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ n(nr, { children: l.content }, l.id)) })
  ] });
}
function p0({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = Ta(Lu);
  return t === void 0 ? /* @__PURE__ */ n(an, { label: a, children: e }) : l ? /* @__PURE__ */ n(Au, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Eu, { lanes: t, label: a });
}
function y0({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = w(null), i = Math.max(e, 1);
  oa(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const Iu = "_block_vmwmz_2", Mu = "_sentence_vmwmz_15", ju = "_meta_vmwmz_20", qu = "_action_vmwmz_25", Bu = "_strip_vmwmz_29", Pu = "_loading_vmwmz_48", Du = "_label_vmwmz_56", Ou = "_counter_vmwmz_63", fe = {
  block: Iu,
  sentence: Mu,
  meta: ju,
  action: qu,
  strip: Bu,
  loading: Pu,
  label: Du,
  counter: Ou
};
function Hu({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: fe.action, children: /* @__PURE__ */ n(f, { onClick: e.onClick, children: e.label }) });
}
function Ea({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${fe.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: fe.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Hu, { action: a })
  ] });
}
function Fu(e) {
  return /* @__PURE__ */ n(Ea, { ...e, kind: "ward-emptystate" });
}
function N0({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(Ea, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function k0(e) {
  return /* @__PURE__ */ n(Ea, { ...e });
}
function $0({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(Ea, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function C0({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function S0({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function R0({ label: e, startedAt: a }) {
  const t = w(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  S(() => {
    const s = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = Ya(t.current, r);
  return /* @__PURE__ */ o("div", { className: `${fe.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: fe.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: fe.counter, children: Xa(i) }) : null
  ] });
}
const Wu = "_note_cigdt_2", zu = {
  note: Wu
};
function Ku({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: zu.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const Gu = "_card_17y0p_2", Uu = "_hit_17y0p_29", Vu = "_head_17y0p_42", Xu = "_title_17y0p_49", Yu = "_meta_17y0p_54", Ju = "_fields_17y0p_55", Qu = "_who_17y0p_68", Zu = "_sep_17y0p_72", em = "_mono_17y0p_76", am = "_field_17y0p_55", nm = "_last_17y0p_92", tm = "_reason_17y0p_104", Q = {
  card: Gu,
  hit: Uu,
  head: Vu,
  title: Xu,
  meta: Yu,
  fields: Ju,
  who: Qu,
  sep: Zu,
  mono: em,
  field: am,
  last: nm,
  reason: tm
}, rm = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function lm(e, a, t) {
  const r = ma(e, "blue"), l = ma(e, "orange"), i = ma(e, "green"), s = w(/* @__PURE__ */ new Set());
  S(() => {
    if (!t) return;
    const c = { blue: r, orange: l, green: i };
    return t.subscribe(a, (u) => {
      if (s.current.has(u.id)) return;
      s.current.add(u.id);
      const d = rm[u.type];
      d && c[d]();
    });
  }, [r, t, i, a, l]);
}
const om = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function im(e, a) {
  return om[a](e);
}
function sm({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: Q.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: Q.meta, children: [
    /* @__PURE__ */ n(Ee, { className: Q.who, text: `waits on ${e.run.agent}` }),
    t,
    /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: Q.meta, children: [
    /* @__PURE__ */ n(Ee, { className: Q.who, text: `waits on ${e.waitsOn}` }),
    t,
    /* @__PURE__ */ o("span", { className: Q.mono, children: [
      ce(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function cm({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: Q.head, children: [
    e.flagged && /* @__PURE__ */ n(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function dm({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: Q.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function um({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: Q.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: Q.field, children: im(e, t) }, t)) });
}
const Wa = (e) => e ? !0 : void 0;
function mm(e) {
  return { "--stream": ve(e.streamStep, "id") };
}
function hm(e, a, t) {
  e == null || e(a, t);
}
function wm(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function _m({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: Q.last, "data-stale": Wa(a), children: t }) : null;
}
function Ia(e) {
  const a = e.fields ?? [], t = e.item, r = w(null);
  lm(r, t.key, e.feed);
  const l = wm(e.feed), i = mm(t);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: Q.card,
      style: i,
      "data-selected": Wa(e.selected),
      "data-flagged": Wa(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: Q.hit, onClick: (s) => hm(e.onOpen, t.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(cm, { item: t }),
        /* @__PURE__ */ n(Ee, { as: "p", className: Q.title, text: t.title }),
        /* @__PURE__ */ n(sm, { item: t, connection: l }),
        /* @__PURE__ */ n(dm, { reason: t.blockedReason }),
        /* @__PURE__ */ n(um, { item: t, fields: a }),
        /* @__PURE__ */ n(_m, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const fm = "_column_ppaii_3", vm = "_head_ppaii_24", bm = "_label_ppaii_33", gm = "_count_ppaii_42", pm = "_list_ppaii_56", na = {
  column: fm,
  head: vm,
  label: bm,
  count: gm,
  list: pm
};
function mt(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function ym({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: na.head, children: [
    /* @__PURE__ */ n("h2", { className: na.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: na.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Nm(e) {
  return /* @__PURE__ */ n("div", { className: na.list, role: "list", children: e.rows.map((a, t) => {
    var r;
    return /* @__PURE__ */ n(
      Ia,
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
function km({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: u }) {
  const d = N(), m = e.cap !== void 0 && a.length > e.cap, v = mt(a, r);
  return /* @__PURE__ */ o("section", { className: na.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(ym, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(Nm, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: v }),
    m && /* @__PURE__ */ n(Ku, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const $m = "_foot_cs4jr_2", Cm = "_note_cs4jr_13", Sm = "_link_cs4jr_19", qa = {
  foot: $m,
  note: Cm,
  link: Sm
};
function T0({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: qa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: qa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${qa.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const Rm = "_head_1lguu_3", Tm = "_identity_1lguu_12", xm = "_titleRow_1lguu_18", Lm = "_title_1lguu_18", Am = "_key_1lguu_35", Em = "_rollup_1lguu_45", Im = "_tools_1lguu_53", Mm = "_swatch_1lguu_65", jm = "_mark_1lguu_72", ye = {
  head: Rm,
  identity: Tm,
  titleRow: xm,
  title: Lm,
  key: Am,
  rollup: Em,
  tools: Im,
  swatch: Mm,
  mark: jm
}, Sn = "initials:";
function qm(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Bm(e) {
  const a = [qm(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function Pm(e) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Bm(e)
  ] });
}
function Dm(e) {
  return e.startsWith(Sn) ? e.slice(Sn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Om({ markRef: e, streamStep: a }) {
  const t = { "--stream": ve(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${ye.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Dm(e) }) : /* @__PURE__ */ n("span", { className: ye.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Hm({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function x0({
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
        /* @__PURE__ */ n(Om, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: ye.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: ye.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: ye.rollup, "aria-live": "polite", children: Pm(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ye.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Hm, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(f, { onClick: c, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(en, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const Fm = "_head_1sejb_14", Wm = "_line_1sejb_15", zm = "_cHandle_1sejb_36", Km = "_cName_1sejb_41", Gm = "_nameLine_1sejb_49", Um = "_cLabel_1sejb_56", Vm = "_cCap_1sejb_61", Xm = "_cShown_1sejb_66", Ym = "_name_1sejb_49", Jm = "_noCap_1sejb_88", Qm = "_state_1sejb_102", Zm = "_handle_1sejb_111", eh = "_sub_1sejb_137", B = {
  head: Fm,
  line: Wm,
  cHandle: zm,
  cName: Km,
  nameLine: Gm,
  cLabel: Um,
  cCap: Vm,
  cShown: Xm,
  name: Ym,
  noCap: Jm,
  state: Qm,
  handle: Zm,
  sub: eh
}, ah = "can't be hidden or collapsed", nh = "terminal · counted, not a column";
function L0() {
  return /* @__PURE__ */ o("div", { className: B.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: B.cHandle }),
    /* @__PURE__ */ n("span", { className: B.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: B.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: B.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: B.cShown, children: "Shown" })
  ] });
}
function th(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function rh(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Rn(e) {
  return e.gate ? ah : e.terminal ? nh : rh(e.agentsMounted);
}
function lh(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function oh({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: B.cName, children: [
    /* @__PURE__ */ o("span", { className: B.nameLine, children: [
      /* @__PURE__ */ n("span", { className: B.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Rn(e) && /* @__PURE__ */ n("span", { className: B.sub, children: Rn(e) })
  ] });
}
function ih(e) {
  return e === void 0 ? "" : String(e);
}
function sh(e) {
  return e === "" ? void 0 : Number(e);
}
function ch({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: B.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: B.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => lh(t, a),
      children: "⠿"
    }
  ) });
}
function dh({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${B.cCap} ${B.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: B.cCap, children: /* @__PURE__ */ n(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: ih(a.cap), onChange: (r) => t({ ...a, cap: sh(r) }) }) });
}
function uh({ stage: e, config: a, onChange: t }) {
  const r = th(e, a.shown), l = e.gate || e.terminal, i = (s) => t({ ...a, shown: s });
  return /* @__PURE__ */ o("span", { className: B.cShown, children: [
    /* @__PURE__ */ n(ze, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ n("span", { className: B.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function mh(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function A0({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: B.line, "data-kind": mh(e), children: [
    /* @__PURE__ */ n(ch, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(oh, { stage: e }),
    /* @__PURE__ */ n("span", { className: B.cLabel, children: /* @__PURE__ */ n(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(dh, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(uh, { stage: e, config: a, onChange: t })
  ] });
}
const hh = "_body_1a4f4_2", wh = "_head_1a4f4_9", _h = "_summary_1a4f4_19", fh = "_block_1a4f4_20", vh = "_actionsBlock_1a4f4_21", bh = "_title_1a4f4_41", gh = "_note_1a4f4_46", ph = "_k_1a4f4_51", yh = "_kv_1a4f4_58", Nh = "_row_1a4f4_64", kh = "_label_1a4f4_75", $h = "_value_1a4f4_84", Ch = "_quote_1a4f4_90", Sh = "_actions_1a4f4_21", Rh = "_resolve_1a4f4_103", P = {
  body: hh,
  head: wh,
  summary: _h,
  block: fh,
  actionsBlock: vh,
  title: bh,
  note: gh,
  k: ph,
  kv: yh,
  row: Nh,
  label: kh,
  value: $h,
  quote: Ch,
  actions: Sh,
  resolve: Rh
};
function Th(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function xh(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Lh(e) {
  const a = ia(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function Ah(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(h, { ...La(Lh(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Th(e),
    ...xh(e, a)
  ];
}
function Eh({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: P.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: P.k, children: a }),
    e
  ] });
}
function Ih({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: P.head, children: [
    /* @__PURE__ */ n(h, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function Mh({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: P.block, children: [
    /* @__PURE__ */ n("p", { className: P.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: P.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: P.note, children: e.agentMeta })
  ] }) : null;
}
function E0({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const u = N(), d = Ah(e, l);
  return /* @__PURE__ */ n(ea, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: P.body, children: [
    /* @__PURE__ */ n(Ih, { item: e }),
    /* @__PURE__ */ o("div", { className: P.summary, children: [
      /* @__PURE__ */ n("h2", { className: P.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: P.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: P.kv, children: d.map(([m, v]) => /* @__PURE__ */ o("div", { className: P.row, children: [
      /* @__PURE__ */ n("dt", { className: P.label, children: m }),
      /* @__PURE__ */ n("dd", { className: P.value, children: v })
    ] }, m)) }),
    /* @__PURE__ */ n(Mh, { item: e }),
    /* @__PURE__ */ o("div", { className: P.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: P.actions, children: a }),
      c && /* @__PURE__ */ n("p", { className: P.note, children: c })
    ] }),
    /* @__PURE__ */ n(Eh, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const jh = "_root_3azmy_2", qh = "_list_3azmy_7", Bh = "_item_3azmy_12", Ph = "_box_3azmy_18", Dh = "_text_3azmy_23", Oh = "_note_3azmy_28", Ue = {
  root: jh,
  list: qh,
  item: Bh,
  box: Ph,
  text: Dh,
  note: Oh
};
function Ma({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ o("div", { className: Ue.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ue.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ue.box, children: /* @__PURE__ */ n(Za, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Ue.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Ue.note} ward-checklist-note`, children: a })
  ] });
}
const Hh = "_rail_ke7ch_2", Fh = "_k_ke7ch_11", Wh = "_head_ke7ch_19", zh = "_section_ke7ch_25", Kh = "_card_ke7ch_38", Gh = "_strip_ke7ch_42", Uh = "_skeleton_ke7ch_56", Vh = "_skeletonLabel_ke7ch_70", Xh = "_bar_ke7ch_76", Yh = "_note_ke7ch_85", me = {
  rail: Hh,
  k: Fh,
  head: Wh,
  section: zh,
  card: Kh,
  strip: Gh,
  skeleton: Uh,
  skeletonLabel: Vh,
  bar: Xh,
  note: Yh
};
function Jh(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ba({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: me.k, children: e }),
    a
  ] });
}
function Qh({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function Zh({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(km, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function ew(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Zh, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Qh, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function I0(e) {
  const a = Jh(e.onOpen), t = mt(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ba, { title: "Card", children: /* @__PURE__ */ n("div", { className: me.card, children: t && /* @__PURE__ */ n(Ia, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ba, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(ew, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ba, { title: "Effect of this config", children: /* @__PURE__ */ n(Ma, { items: e.effects, density: "compact" }) })
  ] });
}
function aw(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function nw(e) {
  return Math.ceil(e.length / 2);
}
function tw(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function ht(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function rw(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = ht(e);
  l !== void 0 && t(l), r(tw(e.type));
}
function lw(e, a, t, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => rw(i, t, r, l));
  }, [e, a, t, r, l]);
}
function ow(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function iw(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function sw(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function cw(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + z.height.card + " + " + z.height.cardRow + " * " + String(nw(a ?? [])) + ")"
  };
}
function dw(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function uw(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(h, { role: "meta", label: re(e.cost) }) : null;
}
function mw(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(h, { role: "meta", label: e.jiraKey }) : null;
}
function hw(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Se, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function ww(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function _w(e, a) {
  return a === void 0 ? e : aw(e, a.ref);
}
function fw(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function la(e) {
  return e === !0 ? "true" : void 0;
}
function wt(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = w(null), i = ma(l), s = w(/* @__PURE__ */ new Set()), [c, u] = p(ow(a));
  lw(e.feed, a.key, s, u, i);
  const d = iw(a, r), m = sw(a, t), v = cw(a, e.fields), b = ww(a, t, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...fw(e),
      className: "ward-workcard",
      "data-flagged": la(a.flagged),
      "data-selected": la(e.selected),
      style: v,
      ref: _w(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        dw(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(h, { role: d.role, label: d.label }),
          uw(a, e.fields),
          mw(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          hw(t, c, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function vw({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function bw(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function gw(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function pw(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(vw, { count: e.items.length, cap: e.column.cap });
}
function yw(e, a) {
  return e.roving ?? a;
}
function Nw(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function kw(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    wt,
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
function $w(e) {
  const a = N(), t = Ca({ orientation: "vertical" }), r = yw(e, t), l = bw(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": la(l), "data-gate": la(e.column.gate), children: [
    gw(e.column, e.items.length, a),
    pw(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Nw(e, t), children: kw(e, r) })
  ] });
}
function Cw(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function Sw(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Rw(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function M0(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Cw(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Sw(e),
      Rw(e.onConfigure),
      /* @__PURE__ */ n(en, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Tw(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function xw(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(ze, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(ze, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Lw(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(R, { children: [
    a > 0 ? /* @__PURE__ */ n(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function j0(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": la(Tw(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: xw(e) }),
    /* @__PURE__ */ n(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(Un, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Lw(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function q0(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(wt, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n($w, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Aw(e, a) {
  const t = ht(e);
  t !== void 0 && a(t);
}
function Ew(e, a, t) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => Aw(r, t));
  }, [e, a, t]);
}
function Iw(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Mw(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function jw(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Se, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function qw(e, a) {
  return /* @__PURE__ */ o(R, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function B0(e) {
  var s;
  const a = e.item, t = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  Ew(e.feed, a.key, l);
  const i = [...Iw(a), ...Mw(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      jw(t, r)
    ] }),
    qw(a, e.actions)
  ] });
}
const Bw = "_card_1iv4k_2", Pw = "_head_1iv4k_28", Dw = "_mark_1iv4k_36", Ow = "_name_1iv4k_48", Hw = "_chips_1iv4k_69", Fw = "_description_1iv4k_75", Ww = "_run_1iv4k_80", zw = "_sep_1iv4k_89", Kw = "_facts_1iv4k_94", Gw = "_fact_1iv4k_94", Uw = "_factLabel_1iv4k_107", Vw = "_factValue_1iv4k_111", le = {
  card: Bw,
  head: Pw,
  mark: Dw,
  name: Ow,
  chips: Hw,
  description: Fw,
  run: Ww,
  sep: zw,
  facts: Kw,
  fact: Gw,
  factLabel: Uw,
  factValue: Vw
}, Xw = { live: "done", draft: "running", paused: "meta" };
function Yw(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function Jw({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ n(h, { role: Xw[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function Qw({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: le.description, children: e });
}
function Zw({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Se, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function e_({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ n("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function a_(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function n_({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": ve(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: Yw(s),
      style: c,
      "data-selected": u,
      "data-paused": a_(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ n("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${le.name} ward-rowlink ward-target`, href: W(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(Qw, { description: e.description }),
        /* @__PURE__ */ n(Zw, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(Jw, { versions: e.versions }),
        /* @__PURE__ */ n(e_, { facts: i })
      ]
    }
  );
}
const t_ = "_list_4dcyc_2", r_ = "_row_4dcyc_11", l_ = "_head_4dcyc_23", o_ = "_id_4dcyc_30", i_ = "_lock_4dcyc_35", s_ = "_reason_4dcyc_41", c_ = "_remove_4dcyc_46", d_ = "_clauses_4dcyc_50", u_ = "_clause_4dcyc_50", m_ = "_label_4dcyc_64", h_ = "_cell_4dcyc_71", w_ = "_value_4dcyc_76", se = {
  list: t_,
  row: r_,
  head: l_,
  id: o_,
  lock: i_,
  reason: s_,
  remove: c_,
  clauses: d_,
  clause: u_,
  label: m_,
  cell: h_,
  value: w_
}, _t = Me(!1);
function P0({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(_t.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: se.list, "aria-label": a, children: e }) });
}
function __({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: se.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function f_({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: se.lock, children: [
    /* @__PURE__ */ n(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: se.reason, children: e })
  ] });
}
function v_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: se.head, children: [
    /* @__PURE__ */ n("span", { className: se.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(f_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: se.remove, children: /* @__PURE__ */ o(f, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Tn(e, a) {
  return e.locked ? void 0 : a;
}
function D0({ rule: e, onChange: a, onRemove: t }) {
  if (!Ie(_t)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Tn(e, a);
  return /* @__PURE__ */ o("li", { className: se.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(v_, { rule: e, onRemove: Tn(e, t) }),
    /* @__PURE__ */ n("dl", { className: se.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: se.clause, children: [
      /* @__PURE__ */ n("dt", { className: se.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: se.cell, children: /* @__PURE__ */ n(__, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const b_ = "_ladder_n8eeo_2", g_ = "_cell_n8eeo_7", p_ = "_empty_n8eeo_26", y_ = "_name_n8eeo_34", N_ = "_holder_n8eeo_40", k_ = "_request_n8eeo_46", $_ = "_swatches_n8eeo_51", C_ = "_swatch_n8eeo_51", S_ = "_tilesFrame_n8eeo_78", R_ = "_tiles_n8eeo_78", T_ = "_tile_n8eeo_78", x_ = "_bar_n8eeo_117", L_ = "_hex_n8eeo_128", A_ = "_note_n8eeo_138", A = {
  ladder: b_,
  cell: g_,
  empty: p_,
  name: y_,
  holder: N_,
  request: k_,
  swatches: $_,
  swatch: C_,
  tilesFrame: S_,
  tiles: R_,
  tile: T_,
  bar: x_,
  hex: L_,
  note: A_
}, O0 = "not validated yet, pending a CVD matrix and dark stepping";
function E_(e) {
  return e.reserved ? "reserved" : Ra(e.step) ? "validated" : "partial";
}
function ft(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function I_(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function M_({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(je, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function j_(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function q_(e, a, t) {
  return {
    "aria-checked": a,
    "aria-disabled": t || void 0,
    tabIndex: t ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const xn = (e) => String(e).padStart(2, "0");
function B_(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? ft(e, void 0);
}
function P_({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${A.hex} ward-ladder-hex`, children: r ? `step ${xn(e)}` : vr(e) }),
    /* @__PURE__ */ n("span", { className: `${A.note} ward-ladder-note`, children: r ? t : `Step ${xn(e)} · ${t}` })
  ] });
}
function D_({ step: e, value: a, taken: t, onChange: r, presentation: l, disabled: i }) {
  const s = E_(e), c = ft(s, t), u = c !== "free", d = u || i, m = a === e.step, v = e.name ?? `Step ${e.step}`, b = () => {
    d || r(e.step);
  }, y = `${v} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...q_(u, m, d), "data-validation": s, style: I_(e, s), onClick: b, onKeyDown: (j) => j_(j, b) }, label: y, name: v, holder: c, validation: s, note: B_(s, t, m), step: e.step };
}
const O_ = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${A.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${A.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(P_, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${A.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(M_, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${A.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${A.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function H_(e) {
  return O_[e.presentation](D_(e));
}
function F_(e) {
  for (const a of e)
    if (!a.reserved && !Sa(a.step)) throw new Error("colour ladder renders token steps only");
}
function W_() {
  return /* @__PURE__ */ o("div", { className: `${A.cell} ward-ladder-cell ${A.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${A.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${A.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function z_(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const K_ = { list: A.ladder, swatches: A.swatches, tiles: A.tilesFrame };
function G_() {
  return /* @__PURE__ */ o("div", { className: `${A.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${A.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${A.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const U_ = { list: W_, swatches: () => null, tiles: G_ };
function V_(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function vt(e) {
  const a = e.takenBy ?? {}, t = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  F_(e.steps);
  const r = z_(e), l = U_[r], i = /* @__PURE__ */ o(R, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(H_, { step: s, value: e.value, taken: a[s.step], onChange: t, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...V_(e.disabled === !0), className: `${K_[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: A.tiles, children: i }) : i });
}
const X_ = "_rail_s06lm_2", Y_ = "_section_s06lm_12", J_ = "_sectionFlush_s06lm_22", Q_ = "_head_s06lm_26", Z_ = "_headLabel_s06lm_34", ef = "_sample_s06lm_42", af = "_sampleLabel_s06lm_47", nf = "_sampleTitle_s06lm_54", tf = "_sampleMeta_s06lm_59", rf = "_trace_s06lm_65", lf = "_traceHead_s06lm_70", of = "_steps_s06lm_78", sf = "_step_s06lm_78", cf = "_stepTitle_s06lm_97", df = "_hollow_s06lm_107", uf = "_stepBody_s06lm_115", mf = "_stepDetail_s06lm_127", hf = "_publish_s06lm_132", wf = "_reason_s06lm_138", _f = "_note_s06lm_143", ff = "_reveal_s06lm_148", k = {
  rail: X_,
  section: Y_,
  sectionFlush: J_,
  head: Q_,
  headLabel: Z_,
  sample: ef,
  sampleLabel: af,
  sampleTitle: nf,
  sampleMeta: tf,
  trace: rf,
  traceHead: lf,
  steps: of,
  step: sf,
  stepTitle: cf,
  hollow: df,
  stepBody: uf,
  stepDetail: mf,
  publish: hf,
  reason: wf,
  note: _f,
  reveal: ff
}, Ln = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, vf = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, bf = { ok: "greenFill", finding: "orangeFill", action: "blue" }, gf = { notSimulated: "not simulated", running: "running" };
function pf(e) {
  return e.presentation === "foundry";
}
function yf(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Nf(e, a) {
  var r;
  const t = vf[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function kf(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function $f(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Cf(e) {
  if (kf(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Sf(e) {
  const [a, t] = p(!1);
  S(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Rf(e) {
  const a = gf[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(je, { size: 6, kind: bf[e.kind], label: e.kind });
}
function Tf(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function xf(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Lf(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Sf, { kind: a.kind, children: [
    /* @__PURE__ */ n(Rf, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Tf, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(xf, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Af(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(ce(a)), t.join(" · ");
}
function bt(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ n("p", { className: k.traceHead, id: a, children: Af(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Lf, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Ef(e) {
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
function If(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Mf(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Fn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: k.sectionFlush, children: /* @__PURE__ */ n(Aa, { divided: !0, cells: a }) });
}
function jf(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Fn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function qf(e) {
  const a = jf(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: k.sectionFlush, children: /* @__PURE__ */ n(Aa, { divided: !0, cells: a }) });
}
function gt(e) {
  const a = N();
  return e.reason !== null ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("p", { className: `${k.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(f, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(f, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Bf(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ n(gt, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: k.note, children: e.note })
  ] });
}
function Pf(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ n(gt, { reason: e.reason, onPublish: e.onPublish }) });
}
function pt(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(h, { role: Ln[e.run.status].role, label: Ln[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Df(e, a) {
  const [t, r] = p(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [a, e.status]), t;
}
function Of(e) {
  var t;
  $f(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(pt, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Ef, { sample: e.run.sample }),
    /* @__PURE__ */ n(bt, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Mf, { run: e.run }),
    /* @__PURE__ */ n("div", { className: k.section, children: /* @__PURE__ */ n(Ma, { items: e.checklist }) }),
    /* @__PURE__ */ n(Bf, { reason: yf(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Hf(e) {
  var r;
  const a = Df(e.run, e.feed);
  Cf(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(pt, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(If, { sample: e.run.sample }),
    /* @__PURE__ */ n(bt, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(qf, { run: e.run }),
    /* @__PURE__ */ n("div", { className: k.section, children: /* @__PURE__ */ n(Ma, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Pf, { reason: Nf(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function H0(e) {
  return pf(e) ? /* @__PURE__ */ n(Hf, { ...e }) : /* @__PURE__ */ n(Of, { ...e });
}
const Ff = "_list_142ip_3", Wf = "_row_142ip_9", zf = "_condition_142ip_18", Kf = "_action_142ip_24", ha = {
  list: Ff,
  row: Wf,
  condition: zf,
  action: Kf
}, yt = Me(!1);
function F0({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(yt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ha.list, "aria-label": a, children: e }) });
}
function W0({ rule: e }) {
  if (!Ie(yt)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: ha.row, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ha.condition, children: e.when }),
    /* @__PURE__ */ n(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ha.action, children: e.then })
  ] });
}
const Gf = "_move_tmppt_3", Uf = {
  move: Gf
};
function za(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(t, 0, l), r;
}
function Nt(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function kt(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function An(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function Vf(e) {
  return e === "up" ? "down" : "up";
}
function Xf(e, a) {
  const t = An(e, a.id, a.direction) ?? An(e, a.id, Vf(a.direction));
  t == null || t.focus();
}
function $t() {
  const e = w(null), [a, t] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && a !== null && Xf(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    t(s), l(c);
  } };
}
function Ct({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function pa({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${Uf.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Yf = "_body_1jd1i_2", Jf = "_title_1jd1i_8", Qf = "_section_1jd1i_13", Zf = "_legend_1jd1i_18", ev = "_stages_1jd1i_26", av = "_stage_1jd1i_26", nv = "_stageIndex_1jd1i_44", tv = "_stageName_1jd1i_50", rv = "_footer_1jd1i_59", lv = "_note_1jd1i_66", ov = "_reason_1jd1i_71", iv = "_actions_1jd1i_76", sv = "_webHead_1jd1i_83", cv = "_kicker_1jd1i_92", dv = "_webTitle_1jd1i_99", uv = "_webBody_1jd1i_105", mv = "_webSection_1jd1i_109", hv = "_sectionHead_1jd1i_121", wv = "_sectionNote_1jd1i_129", _v = "_formLabel_1jd1i_134", fv = "_identityRow_1jd1i_139", vv = "_nameCell_1jd1i_145", bv = "_keyCell_1jd1i_150", gv = "_colourCell_1jd1i_154", pv = "_colourStatus_1jd1i_161", yv = "_webStages_1jd1i_166", Nv = "_webStageList_1jd1i_172", kv = "_webStage_1jd1i_166", $v = "_webIndex_1jd1i_191", Cv = "_webStageName_1jd1i_196", Sv = "_webMoves_1jd1i_201", Rv = "_addStage_1jd1i_215", Tv = "_addStageButton_1jd1i_223", xv = "_addStageNote_1jd1i_231", Lv = "_webFooter_1jd1i_236", Av = "_webFooterNotes_1jd1i_244", Ev = "_webNote_1jd1i_251", _ = {
  body: Yf,
  title: Jf,
  section: Qf,
  legend: Zf,
  stages: ev,
  stage: av,
  stageIndex: nv,
  stageName: tv,
  footer: rv,
  note: lv,
  reason: ov,
  actions: iv,
  webHead: sv,
  kicker: cv,
  webTitle: dv,
  webBody: uv,
  webSection: mv,
  sectionHead: hv,
  sectionNote: wv,
  formLabel: _v,
  identityRow: fv,
  nameCell: vv,
  keyCell: bv,
  colourCell: gv,
  colourStatus: pv,
  webStages: yv,
  webStageList: Nv,
  webStage: kv,
  webIndex: $v,
  webStageName: Cv,
  webMoves: Sv,
  addStage: Rv,
  addStageButton: Tv,
  addStageNote: xv,
  webFooter: Lv,
  webFooterNotes: Av,
  webNote: Ev
}, Iv = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], St = "not in catalogue";
function Mv(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${St}` }, ...t];
}
function jv({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${St}`;
  return /* @__PURE__ */ n(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Mv(t, e.name), invalid: i, onChange: r });
}
function Rt(e, a) {
  return e.name || `stage ${a + 1}`;
}
function qv(e) {
  const a = w([]), t = w(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Bv({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Rt(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${_.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: _.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: _.webStageName, children: /* @__PURE__ */ n(jv, { stage: a, index: t, catalogue: l, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(M, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: Iv, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ o("span", { className: _.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(pa, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      t < r - 1 && /* @__PURE__ */ n(pa, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Pv({ stages: e, onChange: a, catalogue: t }) {
  const r = qv(e.length), l = $t(), i = (c, u) => {
    const d = Nt(c, u);
    r.current = za(r.current, c, d), l.moved({ id: r.current[d], direction: u }, kt(Rt(e[c], c), d, e.length)), a(za(e, c, d));
  }, s = (c, u) => a(e.map((d, m) => m === c ? u : d));
  return /* @__PURE__ */ o("div", { className: _.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: _.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, u) => /* @__PURE__ */ n(Bv, { id: r.current[u], stage: c, index: u, total: e.length, catalogue: t, onReplace: (d) => s(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(Ct, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: _.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: _.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: _.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Dv = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Ov = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Hv = "A new stream starts as a draft. Nothing runs on it until you publish it.", Fv = "Create is disabled: name the stream and give it a key first.", Wv = "reorder with the ↑ ↓ buttons · min 2";
function nn(e, a) {
  return !e.reserved && Ra(e.step) && a[e.step] === void 0;
}
function zv(e, a) {
  const t = e.find((r) => nn(r, a));
  return t ? t.step : 1;
}
function Kv({ stages: e, onMove: a }) {
  const t = $t(), r = (l, i) => {
    const s = Nt(l, i);
    t.moved({ id: e[l].id, direction: i }, kt(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: _.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: _.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: _.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: _.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(h, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(pa, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(pa, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(Ct, { text: t.announcement })
  ] });
}
function Gv({ reason: e, onCreate: a, onDraft: t }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: _.footer, children: [
    /* @__PURE__ */ n("p", { className: _.note, children: Hv }),
    e && /* @__PURE__ */ n("p", { className: _.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: _.actions, children: [
      /* @__PURE__ */ n(f, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(f, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Uv(e, a) {
  return e !== "" && a !== "" ? null : Fv;
}
function Vv(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = Ov, onCreate: i, onDraft: s, onClose: c, returnFocusTo: u } = e, d = N(), [m, v] = p(""), [b, y] = p(""), [E, j] = p(a[0].value), [oe, Re] = p(() => zv(t, r)), [ne, Ke] = p(e.stages ?? Dv), [Ge, C] = p(l[0].value), K = { name: m, key: b, streamStep: oe, owner: E, stages: ne, policy: Ge }, be = Uv(m, b);
  return /* @__PURE__ */ n(ea, { kind: "modal", labelledBy: d, onClose: c, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: _.body, children: [
    /* @__PURE__ */ n("h2", { className: _.title, id: d, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Identity" }),
      /* @__PURE__ */ n(M, { kind: "input", label: "Stream name", value: m, onChange: v }),
      /* @__PURE__ */ n(M, { kind: "input", label: "Key", value: b, onChange: y, mono: !0 }),
      /* @__PURE__ */ n(M, { kind: "select", label: "Owner", value: E, onChange: j, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Colour" }),
      /* @__PURE__ */ n(vt, { label: "Stream colour", steps: t, value: oe, onChange: Re, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Stages" }),
      /* @__PURE__ */ n(Kv, { stages: ne, onMove: (qe, Zt) => Ke(za(ne, qe, Zt)) })
    ] }),
    /* @__PURE__ */ n(st, { legend: "Loop policy", options: l, value: Ge, onChange: C }),
    /* @__PURE__ */ n(Gv, { reason: be, onCreate: () => i(K), onDraft: () => s(K) })
  ] }) });
}
const Tt = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Xv = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Yv(e, a, t, r, l, i) {
  var c;
  const s = ((c = Tt.find((u) => u.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: s, stages: i };
}
function Jv(e, a) {
  return Qv(e) && Zv(e, a) && eb(e);
}
function Qv(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Zv(e, a) {
  return e.colourStep === null || nn({ step: e.colourStep }, a);
}
function eb(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function ab(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : nn({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function nb({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: _.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: _.webNote, children: "Add a stage an agent can run on." });
}
function tb({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: _.webFooter, children: [
    /* @__PURE__ */ o("div", { className: _.webFooterNotes, children: [
      /* @__PURE__ */ n(nb, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: _.reason, children: Xv })
    ] }),
    l && /* @__PURE__ */ n(f, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(f, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function rb({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: _.webHead, children: [
    /* @__PURE__ */ n("span", { className: _.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: _.webTitle, children: "New stream" })
  ] });
}
function lb({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
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
function ob(e) {
  const a = N(), t = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [u, d] = p(e.owners[0] ?? ""), [m, v] = p(null), [b, y] = p("relay"), [E, j] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = Yv(l, s, u, m, b, E), Re = Jv(oe, r), ne = E.find((C) => C.kind === "agent" && C.name.trim() !== ""), Ke = /* @__PURE__ */ o("div", { className: _.colourCell, children: [
    /* @__PURE__ */ n("span", { className: _.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(vt, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: v, takenBy: r })
  ] }), Ge = /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("p", { className: _.colourStatus, "data-colour-status": "", children: ab(m, r) }),
    /* @__PURE__ */ n(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map((C) => ({ value: C, label: C })), onChange: d })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(rb, { titleId: t }),
    /* @__PURE__ */ o("div", { className: _.webBody, children: [
      /* @__PURE__ */ n(lb, { name: l, setName: i, streamKey: s, setKey: c, colour: Ke, owner: Ge }),
      /* @__PURE__ */ o("section", { className: _.webSection, children: [
        /* @__PURE__ */ o("div", { className: _.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: _.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: _.sectionNote, children: Wv })
        ] }),
        /* @__PURE__ */ n(Pv, { stages: E, onChange: j })
      ] }),
      /* @__PURE__ */ n("section", { className: _.webSection, children: /* @__PURE__ */ n(st, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Tt, onChange: y }) }),
      /* @__PURE__ */ n(tb, { ready: Re, draft: oe, agentStage: ne, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function z0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ob, { ...e }) : /* @__PURE__ */ n(Vv, { ...e });
}
const ib = "_row_bs8hc_2", sb = "_cell_bs8hc_6", cb = "_condition_bs8hc_11", db = "_action_bs8hc_18", ub = "_contract_bs8hc_24", mb = "_contractCondition_bs8hc_33", hb = "_contractAction_bs8hc_39", Z = {
  row: ib,
  cell: sb,
  condition: cb,
  action: db,
  contract: ub,
  contractCondition: mb,
  contractAction: hb
}, xt = ["advance", "block", "escalate", "requestReview"], En = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function ya(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function tn(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: Z.action, children: En[e.then] }) : /* @__PURE__ */ n(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: xt.map((l) => ({ value: l, label: En[l] }))
    }
  );
}
function wb({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ n("span", { className: Z.condition, title: ya(e, r), children: ya(e, r) }) }),
    /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: Z.cell, children: tn(e, a, t) })
  ] });
}
function _b({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ o("td", { className: Z.cell, children: [
      /* @__PURE__ */ n(h, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: Z.condition, children: ya(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: Z.cell, children: tn(e, a, t) })
  ] });
}
function fb({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Z.contract, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: Z.contractCondition, children: ya(e, r) }),
    /* @__PURE__ */ n(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: Z.contractAction, children: tn(e, a, t, !0) })
  ] });
}
const vb = { two: _b, four: wb, contract: fb };
function K0(e) {
  var t;
  if (!xt.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = vb[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const bb = "_column_1xq6c_2", gb = "_head_1xq6c_17", pb = "_index_1xq6c_23", yb = "_name_1xq6c_29", Nb = "_meta_1xq6c_38", kb = "_mono_1xq6c_43", $b = "_gate_1xq6c_50", Cb = "_reviewersLabel_1xq6c_57", Sb = "_reviewers_1xq6c_57", Rb = "_reviewer_1xq6c_57", Tb = "_agents_1xq6c_74", xb = "_workflowColumn_1xq6c_79", Lb = "_workflowHead_1xq6c_96", Ab = "_stageRow_1xq6c_102", Eb = "_stageLabel_1xq6c_109", Ib = "_workflowTitle_1xq6c_116", Mb = "_workflowMeta_1xq6c_122", jb = "_workflowGate_1xq6c_127", qb = "_gateNote_1xq6c_135", Bb = "_cardNote_1xq6c_140", Pb = "_reviewerList_1xq6c_145", Db = "_reviewerRow_1xq6c_151", Ob = "_reviewerMark_1xq6c_157", Hb = "_reviewerName_1xq6c_167", Fb = "_terminalCard_1xq6c_173", Wb = "_terminalCount_1xq6c_182", zb = "_workflowAgents_1xq6c_188", Kb = "_mount_1xq6c_194", $ = {
  column: bb,
  head: gb,
  index: pb,
  name: yb,
  meta: Nb,
  mono: kb,
  gate: $b,
  reviewersLabel: Cb,
  reviewers: Sb,
  reviewer: Rb,
  agents: Tb,
  workflowColumn: xb,
  workflowHead: Lb,
  stageRow: Ab,
  stageLabel: Eb,
  workflowTitle: Ib,
  workflowMeta: Mb,
  workflowGate: jb,
  gateNote: qb,
  cardNote: Bb,
  reviewerList: Pb,
  reviewerRow: Db,
  reviewerMark: Ob,
  reviewerName: Hb,
  terminalCard: Fb,
  terminalCount: Wb,
  workflowAgents: zb,
  mount: Kb
}, Gb = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function rn(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Lt(e) {
  return `${Math.round(e * 100)}%`;
}
function Ub({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: $.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: $.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: $.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: $.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Aa, { cells: [
      { value: Lt(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function Vb({ stage: e }) {
  return /* @__PURE__ */ n(Aa, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: rn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function Xb({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: $.head, children: [
    /* @__PURE__ */ n("span", { className: $.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: $.name, id: a, children: e.name }),
    /* @__PURE__ */ n(h, { role: e.kind === "gate" ? "gate" : "soft", label: Gb[e.kind] })
  ] });
}
function Yb({ stage: e }) {
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
function Jb({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(Ub, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(Vb, { stage: e }) : null;
}
function Qb({ onMount: e }) {
  return e ? /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Zb({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: $.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Xb, { stage: e, titleId: l }),
    /* @__PURE__ */ n(Yb, { stage: e }),
    /* @__PURE__ */ n(Jb, { stage: e }),
    /* @__PURE__ */ n("div", { className: $.agents, children: a.map((s) => /* @__PURE__ */ n(n_, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(Qb, { onMount: t })
  ] });
}
const eg = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function ag({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: $.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: $.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: $.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: $.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function ng({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: $.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: $.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(ag, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: $.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: Lt(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function tg(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function rg({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: $.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: $.terminalCount, children: rn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: $.cardNote, children: tg(e.rolledBackThisWeek) })
  ] });
}
function lg(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function og(e) {
  if (e.kind === "terminal") return `${rn(e.closedThisWeek)} this week`;
  const a = lg(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function ig({ stage: e, titleId: a }) {
  const t = eg[e.kind];
  return /* @__PURE__ */ o("header", { className: $.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: $.stageRow, children: [
      /* @__PURE__ */ o("span", { className: $.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(h, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: $.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: $.workflowMeta, children: og(e) })
  ] });
}
function sg(e) {
  return e === "entry" || e === "agent";
}
function cg({ stage: e, onMount: a }) {
  return a === void 0 || !sg(e.kind) ? null : /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", className: $.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function dg({ stage: e, agentCards: a, onMount: t }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: $.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(ig, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(ng, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(rg, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: $.workflowAgents, children: a }),
    /* @__PURE__ */ n(cg, { stage: e, onMount: t })
  ] });
}
function ug(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function G0(e) {
  return ug(e) ? /* @__PURE__ */ n(dg, { ...e }) : /* @__PURE__ */ n(Zb, { ...e });
}
const mg = "_row_alabo_6", hg = "_name_alabo_12", wg = "_compactRow_alabo_13", _g = "_compactName_alabo_13", fg = "_cell_alabo_30", vg = "_chain_alabo_45", bg = "_owner_alabo_51", gg = "_mono_alabo_57", pg = "_compactCell_alabo_79", yg = "_stack_alabo_96", Ng = "_stat_alabo_103", kg = "_identityLine_alabo_110", $g = "_identity_alabo_110", Cg = "_ownerLine_alabo_137", Sg = "_link_alabo_150", Rg = "_gateMark_alabo_156", Tg = "_emptyChain_alabo_161", xg = "_arrow_alabo_167", Lg = "_muted_alabo_168", Ag = "_define_alabo_173", Eg = "_statValue_alabo_180", Ig = "_policyId_alabo_186", Mg = "_sub_alabo_191", g = {
  row: mg,
  name: hg,
  compactRow: wg,
  compactName: _g,
  cell: fg,
  chain: vg,
  owner: bg,
  mono: gg,
  compactCell: pg,
  stack: yg,
  stat: Ng,
  identityLine: kg,
  identity: $g,
  ownerLine: Cg,
  link: Sg,
  gateMark: Rg,
  emptyChain: Tg,
  arrow: xg,
  muted: Lg,
  define: Ag,
  statValue: Eg,
  policyId: Ig,
  sub: Mg
};
function At(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function jg(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function qg(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Et(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function Bg(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Et(e.members)}`;
}
function Pg(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(h, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: Bg(e) })
  ] }) });
}
function It({ name: e, gate: a, look: t, size: r }) {
  return /* @__PURE__ */ o(R, { children: [
    a ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(h, { ...t, size: r, label: e }),
    a ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Dg(e, a, t) {
  if (e !== a) return { role: "soft" };
  const r = ia(t);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function Og({ stages: e, streamStep: a }) {
  const t = e.findIndex((r) => r.gate === !0);
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((r, l) => /* @__PURE__ */ o("span", { className: g.link, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(It, { name: r.name, gate: r.gate === !0, look: Dg(l, t, a), size: "tag" })
  ] }, `${r.name}${l}`)) });
}
function Hg(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : Og(e) });
}
function Mt(e) {
  return e === void 0 ? void 0 : !0;
}
function In(e, a, t, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: t }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Mt(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: a })
  ] }) });
}
function Fg(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function Wg(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function zg({ stream: e, href: a, presentation: t }) {
  const r = qg(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: At, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ve(e.streamStep, "chip") }, children: [
    Pg(e, a),
    Hg(e),
    In(Wg(e.agents), e.agents === void 0 ? void 0 : jg(e.agents), "—"),
    Fg(e.policy),
    In(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function Kg(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function U0(e) {
  if (Kg(e)) return zg(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: At, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: W(t), children: a.name }),
      /* @__PURE__ */ n(h, { ...La(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ n(h, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: a.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(It, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ o("span", { className: g.mono, children: [
      a.agents.live,
      " live · ",
      a.agents.draft,
      " draft · ",
      a.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ n("span", { className: g.owner, children: a.owner }),
      /* @__PURE__ */ n("span", { className: g.mono, children: Et(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: a.inFlightHint, "data-raised": Mt(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const Gg = "_row_2u4ll_2", Ug = "_name_2u4ll_16", Vg = "_scope_2u4ll_24", Na = {
  row: Gg,
  name: Ug,
  scope: Vg
};
function ln(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Xg(e) {
  return e === void 0 ? `${Na.row} ward-toolrow` : `${Na.row} ward-toolrow ${e}`;
}
function Yg(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Jg({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function Qg({ classification: e }) {
  return /* @__PURE__ */ n(h, { role: e === "write" ? "write" : "meta", label: ln(e) });
}
function Zg({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${Na.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function ep(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function V0({ tool: e, onChange: a, presentation: t }) {
  const r = N(), l = N(), i = Yg(e, t), s = ep(t);
  return /* @__PURE__ */ o(s, { className: Xg(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Jg, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${Na.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Zg, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(Qg, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const ap = "_strip_1ay45_2", np = "_head_1ay45_10", tp = "_name_1ay45_16", rp = "_chart_1ay45_24", lp = "_segment_1ay45_30", op = "_detailedChart_1ay45_36", ip = "_rail_1ay45_49", sp = "_section_1ay45_55", cp = "_label_1ay45_66", dp = "_note_1ay45_83", ee = {
  strip: ap,
  head: np,
  name: tp,
  chart: rp,
  segment: lp,
  detailedChart: op,
  rail: ip,
  section: sp,
  label: cp,
  note: dp
}, up = "No item in flight to preview.", mp = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", hp = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Ka = [1, 2, 3, 4, 5, 6], ka = 100;
function wp(e, a) {
  return a.has(e) ? ve(e, "id") : "var(--ward-color-line)";
}
function _p({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: ee.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ka.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: ee.segment,
      x: l * ka,
      y: "0",
      width: ka,
      height: "8",
      fill: wp(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function fp(e) {
  const a = e.slice(0, Ka.length);
  for (; a.length < Ka.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function vp({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${ee.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * ka),
        y: "0",
        width: String(ka),
        height: "40",
        style: { fill: ve(a.streamStep, "chip") }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function jt(e) {
  return (a) => e == null ? void 0 : e(a);
}
function da({ label: e, children: a }) {
  const t = N();
  return /* @__PURE__ */ o("section", { className: ee.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: ee.label, children: e }),
    a
  ] });
}
function bp({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: ee.note, children: a ?? up }) : /* @__PURE__ */ n(Ia, { item: { ...e, streamStep: ia(t.streamStep) }, onOpen: jt(r), feed: null });
}
function gp({ draft: e }) {
  const a = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: ee.head, style: a, children: [
    /* @__PURE__ */ n(je, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
    /* @__PURE__ */ n(h, { ...La(e.key, e.streamStep) })
  ] });
}
function pp(e) {
  const a = fp(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: ee.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(da, { label: "Board card", children: /* @__PURE__ */ n(bp, { ...e, draft: t }) }),
    /* @__PURE__ */ n(da, { label: "Streams index row", children: /* @__PURE__ */ n(gp, { draft: t }) }),
    /* @__PURE__ */ o(da, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(vp, { identities: a }),
      /* @__PURE__ */ n("p", { className: ee.note, children: mp })
    ] }),
    /* @__PURE__ */ n(da, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: ee.note, children: hp }) })
  ] });
}
function yp({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: ee.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: ee.head, children: [
      /* @__PURE__ */ n(je, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
      /* @__PURE__ */ n(h, { ...La(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n(Ia, { item: { ...a, streamStep: e.streamStep }, onOpen: jt(r) }),
    /* @__PURE__ */ n(_p, { draft: e, streams: t })
  ] });
}
function X0(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(pp, { ...e }) : /* @__PURE__ */ n(yp, { ...e });
}
const Np = "_row_ixlg5_6", kp = "_headCell_ixlg5_10", $p = "_cell_ixlg5_11", Cp = "_name_ixlg5_23", Sp = "_consequence_ixlg5_29", Rp = "_governed_ixlg5_36", Tp = "_control_ixlg5_42", xp = "_byRole_ixlg5_48", Lp = "_webControl_ixlg5_59", Ap = "_webConsequence_ixlg5_65", Ep = "_webGoverned_ixlg5_71", O = {
  row: Np,
  headCell: kp,
  cell: $p,
  name: Cp,
  consequence: Sp,
  governed: Rp,
  control: Tp,
  byRole: xp,
  webControl: Lp,
  webConsequence: Ap,
  webGoverned: Ep
};
function Ip({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: O.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: O.control, children: [
    /* @__PURE__ */ n(
      ze,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(h, { role: "running", label: "Pilot" })
  ] });
}
function Mp({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(Ip, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function jp(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function qp({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${O.webControl} ${O.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    ze,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: t === void 0,
      onChange: (l) => t == null ? void 0 : t(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${O.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(h, { role: "running", label: "Pilot" }),
    r
  ] });
}
function Bp({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o("td", { className: O.cell, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${O.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(qp, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webGoverned} ward-cellmeta`, children: jp(e) }) })
  ] });
}
function Y0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Bp, { ...e }) : /* @__PURE__ */ n(Mp, { ...e });
}
const Pp = "_row_vv64h_2", Dp = "_cell_vv64h_6", Op = "_name_vv64h_25", Hp = "_note_vv64h_30", Fp = "_webName_vv64h_41", Wp = "_webMeta_vv64h_47", U = {
  row: Pp,
  cell: Dp,
  name: Op,
  note: Hp,
  webName: Fp,
  webMeta: Wp
}, qt = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function zp(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Kp({ component: e, onRestart: a }) {
  const t = N(), r = qt[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: U.row, children: [
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n("span", { className: U.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: U.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(h, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n("span", { id: t, className: U.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: U.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(f, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function Gp({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: zp(e.state) });
}
function Up({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: U.row, children: [
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n("span", { className: `${U.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n("span", { className: `${U.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(h, { ...qt[e.state] }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(Gp, { component: e, onRestart: a }) })
  ] });
}
function J0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Up, { ...e }) : /* @__PURE__ */ n(Kp, { ...e });
}
const Vp = "_row_jcm5k_7", Xp = "_cell_jcm5k_11", Yp = "_next_jcm5k_28", Jp = "_headCell_jcm5k_38", Qp = "_webId_jcm5k_77", Zp = "_webPurpose_jcm5k_83", ey = "_webMeta_jcm5k_91", ay = "_webUrgent_jcm5k_97", H = {
  row: Vp,
  cell: Xp,
  next: Yp,
  headCell: Jp,
  webId: Qp,
  webPurpose: Zp,
  webMeta: ey,
  webUrgent: ay
}, ny = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, ty = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Bt = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], ry = Object.fromEntries(Bt.map((e) => [e.key, e]));
function Ve({ column: e, children: a }) {
  const t = ry[e];
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
function Q0() {
  return /* @__PURE__ */ n("tr", { children: Bt.map((e) => /* @__PURE__ */ n(
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
function ly({ cred: e }) {
  const a = ny[e.state];
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ n(Ve, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Ve, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Ve, { column: "state", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ve, { column: "cls", children: /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: ln(e.cls) }) }),
    /* @__PURE__ */ n(Ve, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Ve, { column: "next", children: /* @__PURE__ */ n("span", { className: H.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function oy({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${H.webMeta} ${H.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function iy({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(oy, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(h, { ...ty[e.state] }) })
  ] });
}
function Z0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(iy, { ...e }) : /* @__PURE__ */ n(ly, { ...e });
}
const sy = "_card_17zba_2", cy = "_head_17zba_11", dy = "_env_17zba_18", uy = "_version_17zba_25", my = "_meta_17zba_32", hy = "_webCard_17zba_37", wy = "_webRow_17zba_47", _y = "_webTitle_17zba_55", fy = "_webLine_17zba_65", vy = "_webVersion_17zba_72", by = "_webMeta_17zba_77", G = {
  card: sy,
  head: cy,
  env: dy,
  version: uy,
  meta: my,
  webCard: hy,
  webRow: wy,
  webTitle: _y,
  webLine: fy,
  webVersion: vy,
  webMeta: by
}, Mn = { dev: "Dev", uat: "UAT", prod: "Prod" }, Pt = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function gy({ env: e }) {
  const a = Pt[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: G.card, "aria-label": Mn[e.env], children: [
    /* @__PURE__ */ o("div", { className: G.head, children: [
      /* @__PURE__ */ n("span", { className: G.env, children: Mn[e.env] }),
      /* @__PURE__ */ n(h, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ n("p", { className: G.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: G.meta, children: [
      "deployed ",
      de(e.deployedAt)
    ] }),
    t && /* @__PURE__ */ n("p", { className: G.meta, children: t })
  ] });
}
function py(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function yy(e) {
  return /* @__PURE__ */ o("article", { className: `${G.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${G.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${G.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(h, { ...Pt[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${G.version} ${G.webVersion} ${G.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${G.meta} ${G.webMeta} ${G.webLine} ward-cellmeta`, children: py(e) })
  ] });
}
function eS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(yy, { ...e }) : /* @__PURE__ */ n(gy, { ...e });
}
const Ny = "_panel_1hmja_2", ky = "_line_1hmja_8", $y = "_actions_1hmja_14", ua = {
  panel: Ny,
  line: ky,
  actions: $y
};
function aS(e) {
  return /* @__PURE__ */ o("div", { className: ua.panel, children: [
    /* @__PURE__ */ n("p", { className: ua.line, children: e.status }),
    /* @__PURE__ */ n(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ua.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ua.line, children: e.note ?? "" })
  ] });
}
const Cy = "_upload_13fcl_2", Sy = "_preview_13fcl_7", Ry = "_mark_13fcl_17", Ty = "_empty_13fcl_22", xy = "_actions_13fcl_28", Ly = "_input_13fcl_33", Ay = "_reasons_13fcl_41", Ey = "_reason_13fcl_41", Iy = "_accepted_13fcl_57", te = {
  upload: Cy,
  preview: Sy,
  mark: Ry,
  empty: Ty,
  actions: xy,
  input: Ly,
  reasons: Ay,
  reason: Ey,
  accepted: Iy
}, Dt = 1.5, Ot = 22, $a = "script elements or event handlers", xe = "links or external references", $e = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Dt}px at ${Ot}px`], My = [$e[1], $e[2], $a, xe], jy = /* @__PURE__ */ new Map([
  ["image", $e[1]],
  ["text", $e[2]],
  ["tspan", $e[2]],
  ["textPath", $e[2]],
  ["script", $a],
  ["foreignObject", $a],
  ["a", xe],
  ["use", xe],
  ["style", xe],
  ["feImage", xe],
  ["set", xe]
]), qy = "http://www.w3.org/2000/svg", By = "http://www.w3.org/2000/xmlns/", Py = /* @__PURE__ */ new Set([
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
]), Dy = /* @__PURE__ */ new Set([
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
]), on = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, Oy = /url\s*\(|['"\\]/i;
function Hy() {
  return { ok: !1, reasons: [$e[1]] };
}
function Ht(e) {
  return e.namespaceURI === qy;
}
function Fy(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && Ht(a) ? a : null;
  } catch {
    return null;
  }
}
function Wy(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [$e[0]] : [];
}
function zy(e) {
  return jy.get(e.localName) ?? (e.localName.startsWith("animate") ? xe : void 0);
}
function Ky(e) {
  return Oy.test(e.replace(on, ""));
}
function Gy(e) {
  return /^on/i.test(e.localName) ? $a : e.localName === "href" || Ky(e.value) ? xe : void 0;
}
function Uy(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(zy(t));
    for (const r of Array.from(t.attributes)) a.add(Gy(r));
  }
  return My.filter((t) => a.has(t));
}
function Vy(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? Ot / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Dt;
  }) ? [$e[3]] : [];
}
function Xy(e) {
  if (e.namespaceURI === By) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (Dy.has(a) || a.startsWith("stroke"));
}
function Yy(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && Ht(a) && Py.has(a.localName);
}
function Jy(e, a) {
  Yy(a) ? a.nodeType === Node.ELEMENT_NODE && Ft(a) : e.removeChild(a);
}
function Ft(e) {
  for (const a of Array.from(e.attributes)) Xy(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) Jy(e, a);
  return e;
}
function Qy(e) {
  return Array.from(e.matchAll(on), (a) => a[2]).filter((a) => a !== "");
}
function Zy(e) {
  let a = 2166136261;
  for (let t = 0; t < e.length; t += 1) a = Math.imul(a ^ e.charCodeAt(t), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function eN(e, a) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of Qy(l.value)) t.has(i) || t.set(i, `${a}-${t.size}`);
  return t;
}
function aN(e, a) {
  for (const t of Array.from(e.attributes))
    t.value = t.value.replace(on, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function nN(e, a) {
  const t = [e, ...Array.from(e.querySelectorAll("*"))], r = eN(t, a);
  for (const l of t) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), aN(l, r);
  }
  return e;
}
function nS(e) {
  const a = Fy(e);
  if (a === null) return Hy();
  const t = [...Wy(a), ...Uy(a), ...Vy(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(nN(Ft(a), Zy(e))) };
}
const tN = "Mark accepted.", rN = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, lN = new Set(zn.flatMap((e) => [ve(e, "id"), ve(e, "chip")]));
function oN(e) {
  return e !== void 0 && (rN.test(e) || lN.has(e)) ? e : void 0;
}
function iN({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: te.preview, style: { "--mark": oN(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ n("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: te.empty }) });
}
function sN(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function cN(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function dN({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("p", { className: te.accepted, children: tN }) }) : /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: te.reason, children: a }, a)) }) });
}
function uN({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(dN, { result: e }) : /* @__PURE__ */ n("p", { className: `${te.result} ${sN(e, t)}`, role: "status", children: cN(e, t) });
}
function jn(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function tS({ current: e, onUpload: a, onUseInitials: t, presentation: r, disabledReason: l }) {
  const i = w(null), [s, c] = p(null), u = (d) => {
    if (d === void 0) return;
    const m = a(d);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ n(iN, { current: e }),
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
      /* @__PURE__ */ n(f, { ...jn(l), onClick: () => {
        var d;
        return (d = i.current) == null ? void 0 : d.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(f, { ...jn(l), variant: "ghost", onClick: t, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(uN, { result: s, presentation: r })
  ] });
}
const mN = "_row_o3t6y_7", hN = "_cell_o3t6y_11", wN = "_head_o3t6y_28", _N = "_name_o3t6y_34", fN = "_pinned_o3t6y_42", vN = "_headCell_o3t6y_49", bN = "_webName_o3t6y_88", gN = "_webMeta_o3t6y_95", pN = "_webWarn_o3t6y_103", q = {
  row: mN,
  cell: hN,
  head: wN,
  name: _N,
  pinned: fN,
  headCell: vN,
  webName: bN,
  webMeta: gN,
  webWarn: pN
}, sn = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Wt = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], yN = Object.fromEntries(Wt.map((e) => [e.key, e]));
function NN(e, a) {
  return `mcp.${e}.${a}`;
}
function kN(e) {
  return Object.keys(sn).includes(e);
}
function $N(e) {
  return sn[e !== void 0 && kN(e) ? e : "unknown"];
}
function aa({ column: e, children: a }) {
  const t = yN[e];
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
function rS() {
  return /* @__PURE__ */ n("tr", { children: Wt.map((e) => /* @__PURE__ */ n(
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
function CN({ server: e }) {
  const a = sn[e.connection];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o(aa, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: q.head, children: [
        /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
        /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: ln(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: q.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(aa, { column: "connection", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(aa, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(aa, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(aa, { column: "tools", children: e.tools.map((t) => NN(e.name, t)).join(" · ") })
  ] });
}
function SN(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function RN(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function TN({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function xN({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function LN({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(f, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function AN({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: SN(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(h, { ...RN(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(TN, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(h, { ...$N(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n(xN, { server: e, onRestart: a }),
      /* @__PURE__ */ n(LN, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function lS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(AN, { ...e }) : /* @__PURE__ */ n(CN, { ...e });
}
const EN = "_row_1ibo7_2", IN = "_headCell_1ibo7_14", MN = "_cell_1ibo7_15", jN = "_name_1ibo7_26", qN = "_consequence_1ibo7_32", BN = "_reason_1ibo7_38", PN = "_value_1ibo7_44", DN = "_webRow_1ibo7_60", ON = "_webSetting_1ibo7_73", HN = "_webName_1ibo7_81", FN = "_webConsequence_1ibo7_89", WN = "_webControl_1ibo7_95", zN = "_webState_1ibo7_109", KN = "_webChip_1ibo7_114", I = {
  row: EN,
  headCell: IN,
  cell: MN,
  name: jN,
  consequence: qN,
  reason: BN,
  value: PN,
  webRow: DN,
  webSetting: ON,
  webName: HN,
  webConsequence: FN,
  webControl: WN,
  webState: zN,
  webChip: KN
}, zt = 104, Kt = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function GN({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(ze, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(ot, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: I.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function UN({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = Kt[t], s = t === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: I.cell, children: /* @__PURE__ */ n(GN, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: I.cell, style: { width: zt }, children: /* @__PURE__ */ n(h, { role: i.role, label: i.label }) })
  ] });
}
function Gt(e, a) {
  return String(e ?? a);
}
function VN(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function XN(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Gt(e.value, "—");
}
function YN({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ n(ze, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: I.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function JN(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(YN, { ...e });
  const l = VN(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(ot, { options: l, value: Gt(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: XN(a) });
}
function QN({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ n(JN, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${I.webChip} ward-policy-chip`, style: { width: zt }, children: /* @__PURE__ */ n(h, { ...Kt[t], size: "tag" }) })
  ] });
}
function oS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(QN, { ...e }) : /* @__PURE__ */ n(UN, { ...e });
}
const ZN = "_label_vm9hq_7", e1 = "_name_vm9hq_15", a1 = "_column_vm9hq_24", n1 = "_webFrame_vm9hq_57", t1 = "_webHead_vm9hq_62", r1 = "_webHeadLabel_vm9hq_74", l1 = "_webLabel_vm9hq_112", o1 = "_webColumns_vm9hq_119", i1 = "_webGroup_vm9hq_125", s1 = "_webPeople_vm9hq_126", c1 = "_webVia_vm9hq_127", d1 = "_webMeta_vm9hq_156", F = {
  label: ZN,
  name: e1,
  column: a1,
  webFrame: n1,
  webHead: t1,
  webHeadLabel: r1,
  webLabel: l1,
  webColumns: o1,
  webGroup: i1,
  webPeople: s1,
  webVia: c1,
  webMeta: d1
}, u1 = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, Pa = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Da({ column: e, children: a }) {
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
function m1(e) {
  if (!e.matrixRole) return;
  const a = u1[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function h1({ node: e }) {
  const a = m1(e);
  return /* @__PURE__ */ o("span", { className: F.label, children: [
    /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
    /* @__PURE__ */ n(w1, { role: a, node: e }),
    /* @__PURE__ */ n(Da, { column: Pa[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Da, { column: Pa[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Da, { column: Pa[2], children: e.requestedVia ?? "" })
  ] });
}
function w1({ role: e, node: a }) {
  return /* @__PURE__ */ o(R, { children: [
    e && /* @__PURE__ */ n(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ n(h, { role: "warn", label: "Unresolved" })
  ] });
}
function _1({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    ut,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(h1, { node: t }),
      children: s
    }
  );
}
function Oa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function f1({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Oa, { className: `${F.webMeta} ${F.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Oa, { className: `${F.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Oa, { className: `${F.webMeta} ${F.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function v1() {
  return /* @__PURE__ */ o("div", { className: F.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: F.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: F.webColumns, children: [
      /* @__PURE__ */ n("span", { className: F.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: F.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: F.webVia, children: "Requested via" })
    ] })
  ] });
}
function b1({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function g1(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function p1({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: F.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(v1, {}),
    /* @__PURE__ */ n(tu, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      ut,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(b1, { row: t }),
        detail: /* @__PURE__ */ n(f1, { row: t }),
        expanded: g1(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function iS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(p1, { ...e }) : /* @__PURE__ */ n(_1, { ...e });
}
const y1 = "_runbook_b9agc_2", N1 = "_list_b9agc_7", k1 = "_step_b9agc_15", $1 = "_numeral_b9agc_21", C1 = "_body_b9agc_28", S1 = "_head_b9agc_34", R1 = "_title_b9agc_40", T1 = "_detail_b9agc_45", x1 = "_actions_b9agc_50", L1 = "_webList_b9agc_56", A1 = "_webStep_b9agc_60", E1 = "_webBody_b9agc_66", I1 = "_webTitle_b9agc_74", M1 = "_webDetail_b9agc_78", L = {
  runbook: y1,
  list: N1,
  step: k1,
  numeral: $1,
  body: C1,
  head: S1,
  title: R1,
  detail: T1,
  actions: x1,
  webList: L1,
  webStep: A1,
  webBody: E1,
  webTitle: I1,
  webDetail: M1
}, Ut = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Vt(e) {
  return String(e + 1).padStart(2, "0");
}
function j1({ step: e, index: a, connection: t }) {
  const r = Ut[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: L.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: L.numeral, children: Vt(a) }),
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
function q1({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ n("ol", { className: L.list, children: e.map((r, l) => /* @__PURE__ */ n(j1, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: L.actions, children: a })
  ] });
}
function B1({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${L.step} ${L.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${L.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Vt(a) }),
    /* @__PURE__ */ o("span", { className: `${L.body} ${L.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${L.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${L.title} ${L.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(h, { ...Ut[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Se, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${L.detail} ${L.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function P1({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${L.list} ${L.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(B1, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${L.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function sS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(P1, { ...e }) : /* @__PURE__ */ n(q1, { ...e });
}
const D1 = "_list_1gu6a_2", O1 = "_check_1gu6a_10", H1 = "_body_1gu6a_16", F1 = "_text_1gu6a_23", W1 = "_pending_1gu6a_32", z1 = "_measured_1gu6a_37", Ye = {
  list: D1,
  check: O1,
  body: H1,
  text: F1,
  pending: W1,
  measured: z1
};
function K1(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function G1({ check: e }) {
  const a = K1(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Ye.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Za, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: Ye.body, children: [
      /* @__PURE__ */ n("span", { className: Ye.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Ye.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: Ye.measured, children: e.measured })
  ] });
}
function cS({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Ye.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(G1, { check: a }, a.text)) });
}
const U1 = "_root_a6xzy_2", V1 = "_list_a6xzy_10", X1 = "_line_a6xzy_21", Y1 = "_at_a6xzy_48", J1 = "_text_a6xzy_52", Q1 = "_foot_a6xzy_56", Z1 = "_idle_a6xzy_68", ek = "_caret_a6xzy_76", ak = "_jump_a6xzy_83", he = {
  root: U1,
  list: V1,
  line: X1,
  at: Y1,
  text: J1,
  foot: Q1,
  idle: Z1,
  caret: ek,
  jump: ak
}, nk = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function cn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : nk.format(new Date(e));
}
const tk = { warn: "warning", ok: "ok" };
function rk({ kind: e }) {
  const a = tk[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function lk({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${cn(e)}` });
}
function ok({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${cn(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: he.idle, children: i }),
    /* @__PURE__ */ n(lk, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const ik = 8;
function sk(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > ik;
}
function ck({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const Xt = Me(null);
function dS({ announce: e, onAnnounceChange: a, children: t }) {
  const [r, l] = p(!1), i = On(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ n(Xt.Provider, { value: i, children: t });
}
function dk() {
  const e = Ie(Xt), [a, t] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, t];
}
function uS({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = w(null), [i, s] = p(0), [c, u] = dk(), [d, m] = p(!1), v = e.at(-1);
  S(() => {
    s(e.length);
  }, [e.length]), Va(() => {
    const y = l.current;
    y && !d && (y.scrollTop = y.scrollHeight);
  }, [e.length, d]);
  const b = () => {
    var j;
    const y = l.current;
    if (!y) return;
    const E = y.querySelectorAll("[data-consline-text]");
    (j = E.item(E.length - 1)) == null || j.focus(), m(!1);
  };
  return /* @__PURE__ */ o("div", { className: he.root, children: [
    /* @__PURE__ */ n("ol", { className: he.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (y) => m(sk(y.currentTarget)), children: e.map((y, E) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": E < i, children: [
      /* @__PURE__ */ n("span", { className: he.at, children: cn(y.at) }),
      /* @__PURE__ */ n(rk, { kind: y.kind }),
      /* @__PURE__ */ n("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${E}`)) }),
    /* @__PURE__ */ o(ok, { connection: a, idleSince: t, last: v, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => u(!c), children: "Read new events" }),
      /* @__PURE__ */ n(ck, { shown: d, onJump: b })
    ] })
  ] });
}
const uk = "_row_1k8wl_2", mk = "_head_1k8wl_14", hk = "_author_1k8wl_20", wk = "_eta_1k8wl_25", _k = "_edited_1k8wl_26", fk = "_body_1k8wl_32", vk = "_reason_1k8wl_37", bk = "_actions_1k8wl_42", pe = {
  row: uk,
  head: mk,
  author: hk,
  eta: wk,
  edited: _k,
  body: fk,
  reason: vk,
  actions: bk
}, gk = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function pk(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function yk({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function Nk({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: pe.reason, id: a, children: e })
  ] });
}
function kk(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function $k(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(yk, { ...e }) : /* @__PURE__ */ n(Nk, { reason: e.unavailable, reasonId: e.unavailableId });
}
function mS(e) {
  const { comment: a } = e;
  kk(e);
  const t = N(), r = `${t}-unavailable`, l = gk[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${pe.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: pe.head, children: [
      /* @__PURE__ */ n("span", { className: pe.author, children: a.author }),
      /* @__PURE__ */ n(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: pe.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: pe.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: pe.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: pe.reason, id: t, children: pk(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: pe.actions, children: /* @__PURE__ */ n($k, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const Ck = "_root_c46wj_2", Sk = "_attach_c46wj_11", Rk = "_actions_c46wj_17", Tk = "_reply_c46wj_23", xk = "_replyRow_c46wj_28", Lk = "_sendsAs_c46wj_42", Ze = {
  root: Ck,
  attach: Sk,
  actions: Rk,
  reply: Tk,
  replyRow: xk,
  sendsAs: Lk
};
function Yt({ value: e, onChange: a }) {
  const [t, r] = p("");
  return e === void 0 ? [t, r] : [e, a ?? (() => {
  })];
}
function Ak(e) {
  const { placeholder: a, asUser: t, onPost: r } = e, [l, i] = Yt(e), s = N();
  return /* @__PURE__ */ o("div", { className: Ze.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ze.replyRow, children: [
      /* @__PURE__ */ n(M, { variant: "reply", labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ n(f, { variant: "ghost", describedBy: s, onClick: () => r(t, l), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Ze.sendsAs, children: `Sends as ${t}.` })
  ] });
}
function hS(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(Ak, { ...e }) : /* @__PURE__ */ n(Ek, { ...e });
}
function Ek(e) {
  const { placeholder: a, asUser: t, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, u] = Yt(e);
  return /* @__PURE__ */ o("div", { className: Ze.root, children: [
    /* @__PURE__ */ n(M, { kind: "textarea", label: a, value: c, onChange: u }),
    r && /* @__PURE__ */ o("div", { className: Ze.attach, children: [
      /* @__PURE__ */ n(h, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ n(
      Un,
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
const Ik = "_list_1yhks_2", Mk = "_item_1yhks_6", jk = "_body_1yhks_22", qk = "_text_1yhks_28", Bk = "_evidence_1yhks_37", Pk = "_consequence_1yhks_49", Dk = "_note_1yhks_54", Fe = {
  list: Ik,
  item: Mk,
  body: jk,
  text: qk,
  evidence: Bk,
  consequence: Pk,
  note: Dk
};
function Ok({ criterion: e }) {
  return /* @__PURE__ */ n(je, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function qn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function Hk(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function Fk({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Fe.body, children: [
    /* @__PURE__ */ n("span", { className: Fe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ n(qn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Fe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ n(qn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Fe.consequence, children: Hk(e.why) })
    ] })
  ] });
}
function Wk({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Fe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(Ok, { criterion: e }),
    /* @__PURE__ */ n(Fk, { criterion: e })
  ] });
}
function wS({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Fe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Wk, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Fe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const zk = "_list_dwhoz_2", Kk = "_rung_dwhoz_6", Gk = "_name_dwhoz_18", Uk = "_actor_dwhoz_32", wa = {
  list: zk,
  rung: Kk,
  name: Gk,
  actor: Uk
}, Vk = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function Xk({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = Vk[e.state];
  return /* @__PURE__ */ o("li", { className: wa.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: wa.name, children: e.name }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${wa.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function _S({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${wa.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(Xk, { rung: a }, a.name)) });
}
const Yk = "_sheet_pw37w_2", Jk = "_title_pw37w_9", Qk = "_stage_pw37w_15", Zk = "_effects_pw37w_20", e$ = "_effect_pw37w_20", a$ = "_numeral_pw37w_31", n$ = "_effectText_pw37w_38", t$ = "_refusals_pw37w_43", r$ = "_reasons_pw37w_52", l$ = "_reason_pw37w_52", o$ = "_actions_pw37w_62", ue = {
  sheet: Yk,
  title: Jk,
  stage: Qk,
  effects: Zk,
  effect: e$,
  numeral: a$,
  effectText: n$,
  refusals: t$,
  reasons: r$,
  reason: l$,
  actions: o$
};
function i$({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(f, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function fS({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = N(), u = `${c}-refusal`, [d, m] = p(""), v = t.length > 0;
  return /* @__PURE__ */ n(ea, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: ue.effects, children: a.map((b, y) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ n("span", { className: ue.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: ue.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      Hc,
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
    v && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ n(h, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: ue.reasons, children: t.map((b, y) => /* @__PURE__ */ n("li", { className: ue.reason, id: y === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ n(i$, { refused: v, reasonId: u, note: d, onRequeue: l }),
      /* @__PURE__ */ n(f, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const s$ = "_list_1rowi_2", c$ = "_path_1rowi_7", d$ = "_head_1rowi_21", u$ = "_label_1rowi_28", m$ = "_consequence_1rowi_35", h$ = "_ask_1rowi_36", Qe = {
  list: s$,
  path: c$,
  head: d$,
  label: u$,
  consequence: m$,
  ask: h$
}, Ga = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Bn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Pn(e) {
  return e ? "primary" : "secondary";
}
function w$({ path: e, primary: a, onChoose: t }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ n(f, { variant: Pn(a), size: "sm", onClick: () => t(e.kind), children: Ga[e.kind] }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(f, { variant: Pn(a), size: "sm", disabled: !0, describedBy: r, children: Ga[e.kind] }),
    /* @__PURE__ */ n("span", { className: Qe.ask, id: r, children: e.askInstead })
  ] });
}
function _$({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Qe.path, "data-allowed": e.allowed, "data-role": Bn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Qe.head, children: [
      /* @__PURE__ */ n("span", { className: Qe.label, children: e.title ?? Ga[e.kind] }),
      /* @__PURE__ */ n(h, { role: Bn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Qe.consequence, children: e.consequence }),
    /* @__PURE__ */ n(w$, { path: e, primary: a, onChoose: t })
  ] });
}
function vS({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Qe.list, children: e.map((t, r) => /* @__PURE__ */ n(_$, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const f$ = "_list_1m7i0_2", v$ = "_item_1m7i0_6", b$ = "_node_1m7i0_18", g$ = "_body_1m7i0_24", p$ = "_head_1m7i0_30", y$ = "_stage_1m7i0_36", N$ = "_version_1m7i0_41", k$ = "_sentence_1m7i0_49", $$ = "_meta_1m7i0_54", Ne = {
  list: f$,
  item: v$,
  node: b$,
  body: g$,
  head: p$,
  stage: y$,
  version: N$,
  sentence: k$,
  meta: $$
}, C$ = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function S$({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ne.head, children: [
    /* @__PURE__ */ n("span", { className: Ne.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Ne.version, title: e.version, children: e.version }) : null
  ] });
}
function R$({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ne.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Ne.node} ward-history-node`, children: /* @__PURE__ */ n(je, { size: 9, kind: C$[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ne.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(S$, { entry: e }),
      /* @__PURE__ */ n("span", { className: Ne.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ne.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function bS({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Ne.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(R$, { entry: a }, a.stage + String(t))) });
}
const T$ = "_thread_1e70p_3", x$ = "_turn_1e70p_8", L$ = "_who_1e70p_27", A$ = "_body_1e70p_32", _a = {
  thread: T$,
  turn: x$,
  who: L$,
  body: A$
}, Jt = Me(!1);
function gS({ children: e, density: a }) {
  return /* @__PURE__ */ n(Jt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${_a.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function pS({ turn: e }) {
  if (!Ie(Jt)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${_a.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${_a.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${_a.body} ward-chat-body`, children: e.body })
  ] });
}
const E$ = "_list_yiolt_3", I$ = "_row_yiolt_7", M$ = "_label_yiolt_20", j$ = "_n_yiolt_26", q$ = "_cause_yiolt_33", ta = {
  list: E$,
  row: I$,
  label: M$,
  n: j$,
  cause: q$
};
function B$(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const P$ = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function D$({ row: e, formatNumber: a }) {
  return B$(e), /* @__PURE__ */ o("li", { className: `${ta.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(je, { size: 8, ...P$[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: ta.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${ta.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(O$, { cause: e.cause })
  ] });
}
function O$({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${ta.cause} ward-healthrow-cause`, children: e }) : null;
}
function yS({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${ta.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(D$, { row: t, formatNumber: a }, t.label)) });
}
const H$ = "_root_1jxwp_2", F$ = {
  root: H$
};
function NS({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: F$.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ma, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(f, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const W$ = "_row_dhbre_3", z$ = "_key_dhbre_13", K$ = "_stack_dhbre_24", G$ = "_value_dhbre_32", U$ = "_evidence_dhbre_39", V$ = "_mark_dhbre_47", Xe = {
  row: W$,
  key: z$,
  stack: K$,
  value: G$,
  evidence: U$,
  mark: V$
};
function X$({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(Za, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function kS({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(X$, { state: e.state }) })
  ] });
}
const Y$ = "_cell_gh2sd_2", J$ = {
  cell: Y$
}, Q$ = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function Z$(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function eC(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function aC(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: Z$(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function nC(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function $S({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  eC(e, t);
  const r = nC(e);
  return /* @__PURE__ */ n(
    ad,
    {
      label: "Rejection routing",
      columns: Q$,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: J$.cell, "data-norerun": l.noRerun ? !0 : void 0, children: aC(l, i) }),
      empty: a ?? /* @__PURE__ */ n(Fu, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const tC = "_row_1f2re_2", rC = "_title_1f2re_12", lC = "_turns_1f2re_18", oC = "_waiting_1f2re_19", iC = "_resolved_1f2re_20", sC = "_activity_1f2re_21", cC = "_cost_1f2re_28", dC = "_link_1f2re_29", uC = "_tableLink_1f2re_47", mC = "_tableRecord_1f2re_48", hC = "_tableRow_1f2re_59", wC = "_tableTitle_1f2re_71", _C = "_tableResolved_1f2re_76", fC = "_tableMeta_1f2re_87", vC = "_tableCost_1f2re_94", bC = "_tableActivity_1f2re_95", gC = "_tableState_1f2re_105", D = {
  row: tC,
  title: rC,
  turns: lC,
  waiting: oC,
  resolved: iC,
  activity: sC,
  cost: cC,
  link: dC,
  tableLink: uC,
  tableRecord: mC,
  tableRow: hC,
  tableTitle: wC,
  tableResolved: _C,
  tableMeta: fC,
  tableCost: vC,
  tableActivity: bC,
  tableState: gC
}, Qt = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function pC(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function yC(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function NC(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const kC = { duplicate: "Closed · duplicate" };
function $C({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(Ee, { className: D.tableMeta, text: `waiting on ${e}` });
}
function CC({ value: e }) {
  return /* @__PURE__ */ n("td", { className: D.tableCost, children: e === void 0 ? null : re(e) });
}
function SC({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${D.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function RC({ session: e, href: a }) {
  const t = Qt[e.state];
  return /* @__PURE__ */ o("tr", { className: D.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: D.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${D.tableLink} ward-target`, href: W(a), children: /* @__PURE__ */ n(Ee, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: D.tableMeta, children: yC(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: D.tableResolved, children: [
      NC(e.resolved),
      /* @__PURE__ */ n($C, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(CC, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: D.tableActivity, children: pC(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: D.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(h, { role: t.role, label: kC[e.state] ?? t.label }),
      /* @__PURE__ */ n(SC, { link: e.link })
    ] }) })
  ] });
}
function TC({ session: e }) {
  const a = Qt[e.state];
  return /* @__PURE__ */ o("div", { className: D.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(Ee, { className: D.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: D.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(Ee, { className: D.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: D.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: D.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : re(e.cost) }),
    /* @__PURE__ */ n("span", { className: D.activity, children: de(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: D.link, href: W(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function CS(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(RC, { session: e.session, href: e.href }) : /* @__PURE__ */ n(TC, { session: e.session });
}
const xC = "_block_1yy2v_3", LC = "_list_1yy2v_9", AC = "_line_1yy2v_14", Ua = {
  block: xC,
  list: LC,
  line: AC
}, EC = { warn: "warning", ok: "ok" };
function IC({ kind: e }) {
  const a = EC[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function MC({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Ua.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(IC, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function SS({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Ua.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Ua.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(MC, { line: t }, `${r}-${t.text}`)) }) });
}
const jC = "_band_tt7hp_1", qC = "_head_tt7hp_8", BC = "_cell_tt7hp_19", PC = "_index_tt7hp_35", DC = "_title_tt7hp_42", OC = "_note_tt7hp_48", HC = "_cellTitle_tt7hp_53", FC = "_cellBody_tt7hp_58", WC = "_tag_tt7hp_64", ge = {
  band: jC,
  head: qC,
  cell: BC,
  index: PC,
  title: DC,
  note: OC,
  cellTitle: HC,
  cellBody: FC,
  tag: WC
}, Dn = 4;
function RS({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== Dn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Dn}-cell grid`);
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
  h0 as ActionStack,
  uS as ActivityConsole,
  n_ as AgentCard,
  n0 as AppShell,
  X0 as AppearanceStrip,
  RS as Band,
  d0 as BarChart,
  km as BoardColumn,
  T0 as BoardFootnote,
  x0 as BoardHeader,
  p0 as BoardScroller,
  f as Btn,
  QC as CHIP_ROLES,
  Bt as CREDENTIAL_COLUMNS,
  c0 as Callout,
  Y0 as CapabilityRow,
  pS as ChatMessage,
  Un as Checkbox,
  h as Chip,
  Ee as ClampText,
  mS as ClarificationRow,
  D0 as ClauseRuleRow,
  P0 as ClauseRules,
  vt as ColourLadder,
  J0 as ComponentRow,
  hS as Composer,
  A0 as ConfigRow,
  L0 as ConfigRowHead,
  en as ConnectionMark,
  dS as ConsoleAnnounceProvider,
  gS as Conversation,
  Hc as CostMeter,
  Z0 as CredentialRow,
  Q0 as CredentialRowHead,
  wS as CriteriaList,
  Ro as Crumb,
  yS as DeliveryHealth,
  k0 as DeniedState,
  H0 as DryRunRail,
  Fu as EmptyState,
  eS as EnvCard,
  M as Field,
  N0 as FilteredEmpty,
  b0 as FormStack,
  Ma as GateChecklist,
  _S as GateLadder,
  ad as Grid,
  W0 as HandoffRuleRow,
  F0 as HandoffRules,
  E0 as ItemDrawer,
  aS as KeyPanel,
  _r as LIVE_EVENT_TYPES,
  $w as LegacyBoardColumn,
  M0 as LegacyBoardHeader,
  j0 as LegacyConfigRow,
  B0 as LegacyItemDrawer,
  vw as LegacyOverCapNote,
  q0 as LegacyPreviewRail,
  wt as LegacyWorkCard,
  Se as LiveIndicator,
  $0 as LoadFailed,
  R0 as Loading,
  Wt as MCP_SERVER_COLUMNS,
  Za as Mark,
  tS as MarkUpload,
  je as Marker,
  lS as McpServerRow,
  rS as McpServerRowHead,
  r0 as Menu,
  t0 as MenuButton,
  z0 as NewStreamModal,
  Ku as OverCapNote,
  ea as Overlay,
  O0 as PARTIAL_STEP_REASON,
  zt as POLICY_CHIP_WIDTH,
  _0 as PageFrame,
  s0 as PageHeader,
  u0 as PlainList,
  oS as PolicyRow,
  I0 as PreviewRail,
  Pa as ROLE_MATRIX_COLUMNS,
  xt as RULE_ACTIONS,
  st as Radio,
  NS as ReadyChecklist,
  v0 as RecordSection,
  fS as RequeueSheet,
  vS as ResolveBlock,
  kS as ResolvedFieldRow,
  iS as RoleMatrixRow,
  $S as RoutingTable,
  K0 as RuleRow,
  sS as RunbookSteps,
  wr as STREAM_STEPS,
  g0 as SectionBand,
  kn as SectionHeader,
  ot as SegmentedControl,
  et as Select,
  CS as SessionRow,
  i0 as Sidebar,
  G0 as StageColumn,
  y0 as StageGrid,
  bS as StageHistory,
  Pv as StageListEditor,
  C0 as StaleStrip,
  Aa as StatStrip,
  U0 as StreamRow,
  f0 as SubjectRail,
  ze as Switch,
  o0 as TabLinks,
  m0 as TableHead,
  l0 as Tabs,
  V0 as ToolRow,
  w0 as TopBar,
  tu as Tree,
  ut as TreeRow,
  SS as TypedInputBlock,
  Ol as UNSAFE_HREF,
  cS as ValidationList,
  UC as VisibilityProvider,
  VC as Visible,
  JC as WARD_VERSION,
  Ia as WorkCard,
  S0 as WriteUnavailableStrip,
  pC as agoSince,
  or as clock,
  ab as colourStatus,
  ae as count,
  ce as duration,
  Xa as elapsed,
  YC as eventSourceTransport,
  Sa as isStreamStep,
  Ra as isValidatedStreamStep,
  E_ as ladderValidation,
  $N as mcpConnectionChip,
  NN as mcpToolName,
  re as money,
  we as ms,
  mt as ordered,
  Fn as ratio,
  zp as restartLabel,
  W as safeHref,
  de as stamp,
  Kn as stream,
  e0 as streamChip,
  La as streamChipProps,
  ve as streamColour,
  vr as streamHex,
  ZC as streamVars,
  ma as useBorderFlash,
  ur as useFocusTrap,
  a0 as useLiveFeed,
  XC as useReturnFocus,
  Ca as useRovingTabindex,
  Ya as useTicker,
  ir as useVisible,
  z as v,
  nS as validateMark,
  ia as validatedStep,
  zn as validatedStreamSteps
};
