import { jsx as n, Fragment as R, jsxs as o } from "react/jsx-runtime";
import { useMemo as Hn, useContext as Ie, createContext as Me, useCallback as J, useEffect as S, useState as p, useRef as w, useLayoutEffect as Va, useId as k, isValidElement as er, Children as ar, Fragment as nr } from "react";
import { flushSync as On, createPortal as tr } from "react-dom";
function se(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const un = (e) => String(e).padStart(2, "0");
function Xa(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${un(a % 60)}s` : `${Math.floor(t / 60)}h ${un(t % 60)}m`;
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
function HC({ hidden: e, children: a }) {
  const t = Hn(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Wn.Provider, { value: t, children: a });
}
function ir(e) {
  return !Ie(Wn).has(e);
}
function OC({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(R, { children: ir(e) ? a : t });
}
const cr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function sr(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function dr(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = sr(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function ur(e) {
  return { onKeyDown: J(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(cr));
      dr(t, e.current, r);
    },
    [e]
  ) };
}
function FC(e, a = !0) {
  S(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const mn = { ArrowUp: -1, ArrowDown: 1 }, hn = { ArrowLeft: -1, ArrowRight: 1 }, mr = (e, a, t) => Math.min(t, Math.max(a, e));
function hr(e, a) {
  if (a !== "horizontal" && e in mn) return mn[e];
  if (a !== "vertical" && e in hn) return hn[e];
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
  const i = J((d) => t(d), []), c = J((d) => {
    var m;
    t(d), (m = r.current.get(d)) == null || m.focus();
  }, []), s = J(
    (d) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const v = Math.max(0, m.indexOf(a)), b = hr(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(m[mr(v + b, 0, m.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(m[0])) : d.key === "End" && (d.preventDefault(), c(m[m.length - 1]));
    },
    [a, c, e]
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
  return { containerProps: { onKeyDown: s }, itemProps: u, setActive: i };
}
const WC = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, zC = "0.2.0", KC = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], wr = [1, 2, 3, 4, 5, 6], zn = [1, 2, 3], _r = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], z = {
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
function GC(e) {
  if (!Sa(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function UC(e) {
  if (!Sa(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const fr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function vr(e) {
  if (!Sa(e)) throw new Error("unvalidated stream step");
  return fr[e];
}
function wn(e) {
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
  const l = wn(t) ?? wn(r.type);
  return l === null ? null : { ...r, type: l, id: gr(r, a), at: pr(r) };
}
function Nr(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function kr(e, a, t) {
  return e >= we.heartbeat && !a && t !== null;
}
function VC(e, a) {
  const [t, r] = p("reconnecting"), [l, i] = p(null), c = w(/* @__PURE__ */ new Map()), s = w(0), u = w(""), d = w(0), m = w(null), v = w(0), b = w(0), y = w(!1), A = w("reconnecting"), j = J((C) => {
    A.current = C, r(C);
  }, []), oe = J(() => {
    s.current = Date.now();
  }, []), Re = J((C) => {
    for (const [K, be] of c.current)
      (be === "*" || C.itemKey === be) && K(C);
  }, []), ne = J(() => {
    m.current = a(e, { lastEventId: u.current }, {
      onEvent: (C, K, be) => {
        const Be = yr(C, K, be);
        Be !== null && (Be.id && (u.current = Be.id), oe(), y.current = !1, j("live"), i(Be.at), Re(Be));
      },
      onOpen: () => {
        d.current = 0, y.current = !1, oe(), j("live");
      },
      onError: () => {
        var K;
        (K = m.current) == null || K.close(), m.current = null, y.current = !0, A.current !== "stale" && j("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** d.current, we.reconnectMax);
        d.current += 1, v.current = window.setTimeout(ne, C);
      }
    });
  }, [Re, j, oe, a, e]), Ke = J((C) => {
    y.current = !0, C.close(), m.current = null, v.current = window.setTimeout(ne, we.reconnectBase);
  }, [ne]), Ge = J((C, K) => (c.current.set(K, C), () => {
    c.current.delete(K);
  }), []);
  return S(() => (ne(), b.current = window.setInterval(() => {
    const C = Date.now() - s.current, K = Nr(C, A.current);
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
    const c = window.setInterval(i, we.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(c), document.removeEventListener("visibilitychange", i);
    };
  }, [a, t]), Math.max(0, r - t);
}
const _n = { blue: "running", orange: "waiting", green: "done" };
function $r() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function fn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ma(e, a) {
  const t = w(0), r = J((l) => {
    const i = l ?? a, c = e.current;
    c !== null && i !== void 0 && ($r() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${_n[i]})`), c.style.setProperty("--flash", `var(--ward-color-${_n[i]})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => fn(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => fn(c), we.flash)));
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
  const l = t !== "stale", i = Ya(e, l), c = (a == null ? void 0 : a.at) ?? e, s = Rr(l, i, c, r, a);
  return /* @__PURE__ */ o("span", { className: `${Sr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const Tr = "_app_13ufi_1", xr = "_side_13ufi_18", Lr = "_main_13ufi_26", Ar = "_rail_13ufi_33", Er = "_page_13ufi_40", Ir = "_root_13ufi_91", Mr = "_topbar_13ufi_98", jr = "_mark_13ufi_109", Br = "_brand_13ufi_116", qr = "_tagline_13ufi_122", Pr = "_identity_13ufi_128", Dr = "_tools_13ufi_129", Hr = "_nav_13ufi_139", Or = "_metadata_13ufi_146", Fr = "_actor_13ufi_161", Wr = "_detail_13ufi_162", zr = "_content_13ufi_222", Kr = "_toolsPanel_13ufi_238", Gr = "_skip_13ufi_264", M = {
  app: Tr,
  side: xr,
  main: Lr,
  rail: Ar,
  page: Er,
  root: Ir,
  topbar: Mr,
  mark: jr,
  brand: Br,
  tagline: qr,
  identity: Pr,
  tools: Dr,
  nav: Hr,
  metadata: Or,
  actor: Fr,
  detail: Wr,
  content: zr,
  toolsPanel: Kr,
  skip: Gr
}, Ur = "_btn_tzr89_2", Vr = "_primary_tzr89_14", Xr = "_destructive_tzr89_25", Yr = "_secondary_tzr89_35", Jr = "_ghost_tzr89_40", Qr = "_overflow_tzr89_49", Zr = "_sm_tzr89_56", el = "_disabled_tzr89_60", ca = {
  btn: Ur,
  primary: Vr,
  destructive: Xr,
  secondary: Yr,
  ghost: Jr,
  overflow: Qr,
  sm: Zr,
  disabled: el
};
function al(e, a, t, r) {
  const l = a === "sm" ? [ca.sm, "ward-btn--sm"] : [], i = t ? [ca.disabled] : [];
  return [ca.btn, ca[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function nl(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function tl(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function rl(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function ll(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function ol(e, a, t) {
  return ll(e.describedBy, a && t);
}
function il({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function cl(e) {
  return e.children ?? e.label;
}
function f(e) {
  tl(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = rl(e), i = k();
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: al(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": ol(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...nl(a, e.controls),
        children: cl(e)
      }
    ),
    /* @__PURE__ */ n(il, { id: i, reason: l })
  ] });
}
const sl = /^([a-z][a-z0-9+.-]*):/i, dl = /* @__PURE__ */ new Set(["http", "https"]), ul = "#";
function ml(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = sl.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = ml(e);
  return a === void 0 || dl.has(a) ? e : ul;
}
function hl(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Gn(e) {
  const a = hl(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function la(e, a, t) {
  S(() => {
    const r = e.current;
    if (!r) return;
    const l = () => {
      const c = Gn(r);
      t == null || t(c.start || c.end);
    };
    r.addEventListener("scroll", l, { passive: !0 });
    const i = typeof ResizeObserver > "u" ? null : new ResizeObserver(l);
    for (const c of [r, ...r.children]) i == null || i.observe(c);
    return l(), () => {
      r.removeEventListener("scroll", l), i == null || i.disconnect();
    };
  }, [e, a, t]);
}
function wl(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function Ja(e, a, t) {
  Va(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(t)[a];
    if (!r || !l) return;
    const i = wl(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), Gn(r);
  }, [e, a, t]);
}
function Qa(e) {
  const [a, t] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (c) => t(c.matches);
    return r.addEventListener("change", l), t(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function _l({ sidebar: e, header: a, children: t, rail: r }) {
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
function fl({ destinations: e, active: a }) {
  const t = w(null);
  return la(t, e.length), Ja(t, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ n("nav", { ref: t, className: M.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ n("a", { href: W(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Oa({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function vl({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ n(Oa, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Oa, { value: a, className: M.detail })
  ] });
}
function bl() {
  const e = Qa("(max-width: 767.98px)"), a = k(), t = w(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var c, s;
    l(!1), (s = (c = t.current) == null ? void 0 : c.querySelector("button")) == null || s.focus();
  } };
}
function gl({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: M.tools, children: /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: M.tools, children: e });
}
function pl({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const t = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: M.toolsPanel, hidden: !a.open, onKeyDown: t, children: e });
}
function yl(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ n("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Oa, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ n(fl, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: M.identity, children: /* @__PURE__ */ n(vl, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(gl, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Nl(e) {
  const a = k(), t = bl();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(yl, { ...e, menu: t }),
    /* @__PURE__ */ n(pl, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: M.content, children: e.children })
  ] });
}
function kl(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function XC(e) {
  return kl(e) ? /* @__PURE__ */ n(_l, { ...e }) : /* @__PURE__ */ n(Nl, { ...e });
}
function Ta(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const $l = "_root_197jc_2", Cl = "_row_197jc_8", Sl = "_box_197jc_14", Rl = "_label_197jc_21", Tl = "_lockedNote_197jc_26", xl = "_consequence_197jc_34", Ll = "_sample_197jc_69", De = {
  root: $l,
  row: Cl,
  box: Sl,
  label: Rl,
  lockedNote: Tl,
  consequence: xl,
  sample: Ll
};
function Al(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function El({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${De.consequence} ward-check-consequence`, children: a }) : null;
}
function Il({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${De.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Ml({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: De.sample, "aria-hidden": "true", children: e }) : null;
}
function Un(e) {
  const a = k(), t = e.consequence ? `${a}-note` : void 0, r = Al(e);
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
          "aria-describedby": Ta(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: De.label, children: [
        e.label,
        /* @__PURE__ */ n(Il, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Ml, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(El, { id: t, text: e.consequence })
  ] });
}
const jl = "_chip_pq6tb_2", Bl = {
  chip: jl
}, ql = {
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
function Pl(e, a) {
  if (e === "stream") return Dl(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = ql[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function Dl(e) {
  if (!e || !Ra(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Kn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Bl.chip} ward-chip ward-chip--${e}`, style: Pl(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
const Hl = "_clamp_zn74g_3", vn = {
  clamp: Hl
};
function Ee({ text: e, as: a = "span", className: t }) {
  return /* @__PURE__ */ n(a, { className: t === void 0 ? vn.clamp : `${vn.clamp} ${t}`, "data-ward-clamp": "", title: e, children: e });
}
function oa(e) {
  return typeof e == "number" && Ra(e) ? e : null;
}
function ve(e, a) {
  const t = oa(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function xa(e, a) {
  const t = oa(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const Ol = "_nav_8lufj_2", Fl = "_list_8lufj_8", Wl = "_item_8lufj_15", zl = "_link_8lufj_30", Kl = "_sep_8lufj_40", Gl = "_current_8lufj_44", Ul = "_chips_8lufj_48", qe = {
  nav: Ol,
  list: Fl,
  item: Wl,
  link: zl,
  sep: Kl,
  current: Gl,
  chips: Ul
};
function Vl({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: qe.nav, children: [
    /* @__PURE__ */ n("ol", { className: qe.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: qe.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: qe.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${qe.link} ward-target`, href: W(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: qe.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${qe.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] }) });
}
function Vn(e, a, t) {
  const r = w(t);
  r.current = t, S(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      (c = a.current) != null && c.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, a]);
}
const Xl = 500;
function Xn(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function Yn() {
  const e = w(""), a = w(void 0);
  return S(() => () => clearTimeout(a.current), []), (t) => (clearTimeout(a.current), e.current += t.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, Xl), e.current);
}
const Yl = "_root_glrsq_2", Jl = "_trigger_glrsq_7", Ql = "_value_glrsq_32", Zl = "_menu_glrsq_49", eo = "_find_glrsq_71", ao = "_list_glrsq_85", no = "_option_glrsq_95", to = "_check_glrsq_114", ro = "_empty_glrsq_125", _e = {
  root: Yl,
  trigger: Jl,
  value: Ql,
  menu: Zl,
  find: eo,
  list: ao,
  option: no,
  check: to,
  empty: ro
}, lo = 7;
function oo(e, a) {
  const t = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(t));
}
function bn(e, a) {
  return Math.max(0, e.findIndex((t) => t.value === a));
}
function io(e, a) {
  const [t, r] = p(e.defaultOpen === !0), [l, i] = p(""), [c, s] = p(() => bn(e.options, e.value)), u = (d) => {
    var m;
    On(() => r(!1)), d && ((m = a.current) == null || m.focus());
  };
  return {
    open: t,
    query: l,
    active: c,
    entries: oo(e.options, l),
    findable: e.options.length > lo,
    show: () => {
      e.disabled || (i(""), s(bn(e.options, e.value)), r(!0));
    },
    close: u,
    to: s,
    pick: (d) => {
      var m;
      d && d.option.value !== e.value && ((m = e.onChange) == null || m.call(e, d.option.value)), u(!0);
    },
    find: (d) => {
      i(d), s(0);
    }
  };
}
function co(e, a) {
  const t = w(!1);
  return S(() => {
    var r;
    e && t.current && ((r = a.current) == null || r.focus()), t.current = !1;
  }), () => {
    t.current = !0;
  };
}
function so(e) {
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
function uo(e) {
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
const mo = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function ho(e, a) {
  const t = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : t(),
    onKeyDown: (r) => {
      mo.has(r.key) && (r.preventDefault(), t());
    }
  };
}
function wo({ entry: e, at: a, menu: t, ids: r, value: l }) {
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
function Za(e, a) {
  const t = e.entries[e.active];
  return t ? a.option(t.index) : void 0;
}
function _o({ menu: e, ids: a, focusRef: t }) {
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
      "aria-activedescendant": Za(e, a),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: Qn(e, Jn(e), () => {
      })
    }
  );
}
function fo({ props: e, menu: a, ids: t, focusRef: r }) {
  const l = so(a), i = (c) => {
    Xn(c) && l(c.key);
  };
  return /* @__PURE__ */ o("div", { className: _e.menu, children: [
    a.findable && /* @__PURE__ */ n(_o, { menu: a, ids: t, focusRef: r }),
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
        "aria-activedescendant": a.findable ? void 0 : Za(a, t),
        onKeyDown: Qn(a, uo(a), i),
        children: a.entries.map((c, s) => /* @__PURE__ */ n(wo, { entry: c, at: s, menu: a, ids: t, value: e.value }, c.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ n("p", { className: _e.empty, children: "No match" })
  ] });
}
function vo(e, a) {
  const t = e.open ? Za(e, a) : void 0;
  S(() => {
    var r, l;
    t && ((l = (r = document.getElementById(t)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [t]);
}
function Zn(...e) {
  return e.filter(Boolean).join(" ");
}
function bo(e) {
  var a;
  return ((a = e.options.find((t) => t.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function go({ props: e, menu: a, ids: t, trigger: r, wantFocus: l }) {
  const i = !e.options.some((c) => c.value === e.value);
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
      "aria-describedby": Ta(e["aria-describedby"], t.value),
      "aria-invalid": e["aria-invalid"],
      disabled: e.disabled,
      ...ho(a, l),
      children: /* @__PURE__ */ n("span", { id: t.value, className: _e.value, "data-placeholder": i || void 0, children: bo(e) })
    }
  );
}
function et(e) {
  const a = k(), t = { list: `${a}-list`, value: `${a}-value`, option: (u) => `${a}-option-${u}` }, r = w(null), l = w(null), i = w(null), c = io(e, l), s = co(c.open, i);
  return Vn(c.open, r, () => c.close(!1)), vo(c, t), /* @__PURE__ */ o("div", { ref: r, className: Zn(_e.root, e.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(go, { props: e, menu: c, ids: t, trigger: l, wantFocus: s }),
    e.name && /* @__PURE__ */ n("input", { type: "hidden", name: e.name, value: e.value }),
    c.open && /* @__PURE__ */ n(fo, { props: e, menu: c, ids: t, focusRef: i })
  ] });
}
const po = "_field_djnju_2", yo = "_label_djnju_8", No = "_labelHidden_djnju_15", ko = "_control_djnju_25", $o = "_mono_djnju_45", Co = "_area_djnju_50", So = "_invalid_djnju_57", Ae = {
  field: po,
  label: yo,
  labelHidden: No,
  control: ko,
  mono: $o,
  area: Co,
  invalid: So
}, Ro = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, at = (e) => `${e}-label`;
function To({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? Ro : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function xo({ props: e, controlProps: a, cls: t }) {
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
function Lo({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Ao = { input: To, select: xo, textarea: Lo };
function Eo(e, a, t) {
  const r = Ao[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Io(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Ta(r ? t : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function Mo(e) {
  const a = e.mono ? [Ae.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Ae.area] : [];
  return [Ae.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function jo(e) {
  return e ? `${Ae.label} ${Ae.labelHidden} ward-field-label` : `${Ae.label} ward-field-label`;
}
function I(e) {
  const a = k(), t = `${a}-msg`, r = Io(e, a, t), l = Mo(e);
  return /* @__PURE__ */ o("div", { className: `${Ae.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: at(a), className: jo(e.labelHidden), htmlFor: a, children: e.label }),
    Eo(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Ae.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Bo = "_root_1j7c6_2", qo = "_trigger_1j7c6_8", Po = "_panel_1j7c6_32", Do = "_menu_1j7c6_55", Ho = "_group_1j7c6_60", Oo = "_heading_1j7c6_65", Fo = "_item_1j7c6_71", Wo = "_separator_1j7c6_97", zo = "_footer_1j7c6_103", Ce = {
  root: Bo,
  trigger: qo,
  panel: Po,
  menu: Do,
  group: Ho,
  heading: Oo,
  item: Fo,
  separator: Wo,
  footer: zo
}, nt = Me(null);
function Ko(e, a) {
  const [t, r] = p({ open: e, start: null, request: 0 });
  return {
    ...t,
    show: (l) => r((i) => ({ open: !0, start: l, request: i.request + 1 })),
    close: (l) => {
      var i;
      On(() => r((c) => ({ ...c, open: !1 }))), l && ((i = a.current) == null || i.focus());
    }
  };
}
const Go = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Uo(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const t = Go.get(a.key);
      t && (a.preventDefault(), e.show(t));
    },
    onKeyUp: (a) => {
      a.key === " " && a.preventDefault();
    }
  };
}
function Vo(...e) {
  return e.filter(Boolean).join(" ");
}
function YC(e) {
  const a = k(), t = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = w(null), l = w(null), i = Ko(e.defaultOpen === !0, l);
  return Vn(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: Vo(Ce.root, e.className), "data-ward-menu": "", children: [
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
        ...Uo(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(nt.Provider, { value: { ...t, popup: i }, children: e.children })
  ] });
}
function Xo(e) {
  let a = 0;
  const t = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(t) } : { kind: "item", row: t(r) });
}
function Yo(e) {
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
const Jo = (e) => e.split("").every((a) => a === e[0]);
function Qo(e, a, t) {
  const r = Jo(t), l = r ? t[0] : t, i = r ? a : a - 1, c = (s) => !s.disabled && s.label.toLowerCase().startsWith(l);
  for (let s = 1; s <= e.length; s++) {
    const u = tt(i + s, e.length);
    if (c(e[u])) return u;
  }
  return -1;
}
function Zo(e) {
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
function ei(e, a) {
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
function ai(e, a) {
  const t = w(!1), r = Yn(), l = ei(e, a), i = (c) => {
    Xn(c) && e.focus(Qo(e.items, e.current(), r(c.key)));
  };
  return {
    onKeyDown: (c) => {
      c.key === "Tab" && (t.current = !0);
      const s = l.get(c.key);
      if (!s) return i(c);
      c.preventDefault(), c.stopPropagation(), s();
    },
    onKeyUp: (c) => {
      c.key === " " && c.preventDefault();
    },
    onBlur: () => {
      t.current && a.close(!1);
    }
  };
}
function ni(e, a) {
  const { start: t, request: r } = a, l = w(e);
  l.current = e, S(() => {
    const { items: i, focus: c } = l.current;
    t && c(t === "first" ? Je(i, -1, 1) : Je(i, i.length, -1));
  }, [t, r]);
}
function ti({ row: e, nav: a, popup: t }) {
  const { item: r, at: l } = e;
  return {
    onMouseDown: (i) => i.preventDefault(),
    onMouseMove: () => {
      !r.disabled && a.current() !== l && a.focus(l);
    },
    onClick: (i) => {
      var c;
      if (r.disabled) return i.preventDefault();
      (c = r.onSelect) == null || c.call(r), t.close(!0);
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
    ...ti(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ n("a", { href: W(a.href), ...r, children: a.label }) : /* @__PURE__ */ n("button", { type: "button", ...r, children: a.label });
}
function ri({ heading: e, rows: a, nav: t, popup: r }) {
  const l = k();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: Ce.group, children: [
    /* @__PURE__ */ n("div", { id: l, className: Ce.heading, children: e }),
    a.map((i) => /* @__PURE__ */ n(rt, { row: i, nav: t, popup: r }, i.at))
  ] });
}
function li({ block: e, nav: a, popup: t }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: Ce.separator }) : e.kind === "group" ? /* @__PURE__ */ n(ri, { heading: e.heading, rows: e.rows, nav: a, popup: t }) : /* @__PURE__ */ n(rt, { row: e.row, nav: a, popup: t });
}
function oi() {
  const e = Ie(nt);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function JC({ entries: e, footer: a, align: t = "start" }) {
  const { popup: r, menuId: l, buttonId: i } = oi(), c = Xo(e), s = Zo(c.flatMap(Yo).map((d) => d.item)), u = ai(s, r);
  return ni(s, r), /* @__PURE__ */ o("div", { className: Ce.panel, "data-align": t, children: [
    /* @__PURE__ */ n("div", { role: "menu", id: l, "aria-labelledby": i, className: Ce.menu, ...u, children: c.map((d, m) => /* @__PURE__ */ n(li, { block: d, nav: s, popup: r }, m)) }),
    a && /* @__PURE__ */ n("p", { className: Ce.footer, children: a })
  ] });
}
const ii = "_strip_1nfwi_2", ci = "_tab_1nfwi_32", si = "_count_1nfwi_68", ta = {
  strip: ii,
  tab: ci,
  count: si
}, fa = 7;
function di(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function lt(e) {
  return `${ta.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function QC({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > fa) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${fa} — the set is fixed`);
  const i = Ca({ orientation: "horizontal" }), c = di(e, a);
  S(() => i.setActive(c), [i.setActive, c]);
  const s = w(null);
  return la(s, e.length), Ja(s, c, '[role="tab"]'), /* @__PURE__ */ n(
    "div",
    {
      ref: s,
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
          className: `${ta.tab} ward-tab`,
          "aria-selected": u.id === a,
          "aria-controls": `panel-${u.id}`,
          onClick: () => t(u.id),
          ...i.itemProps(d),
          children: [
            u.label,
            u.count === void 0 ? null : /* @__PURE__ */ o(R, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: ta.count, children: `· ${u.count}` })
            ] })
          ]
        },
        u.id
      ))
    }
  );
}
function ZC({ links: e, active: a, label: t, level: r = 1 }) {
  if (e.length > fa) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${fa} — the set is fixed`);
  const l = w(null);
  return la(l, e.length), Ja(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ n("nav", { ref: l, className: lt(r), "aria-label": t, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ta.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(R, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: ta.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const ui = "_root_v56ff_3", mi = "_segment_v56ff_9", gn = {
  root: ui,
  segment: mi
};
function ot({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = Ca({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((u) => u.value === a));
  return S(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ n("div", { className: `${gn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: gn.segment,
      "aria-checked": u.value === a,
      disabled: l,
      "aria-describedby": i,
      onClick: () => t(u.value),
      ...c.itemProps(d),
      children: u.label
    },
    u.value
  )) });
}
const hi = "_sidebar_18gpx_3", wi = "_brand_18gpx_9", _i = "_mark_18gpx_17", fi = "_word_18gpx_24", vi = "_nav_18gpx_30", bi = "_navItem_18gpx_39", gi = "_footLink_18gpx_49", pi = "_group_18gpx_58", yi = "_groupName_18gpx_65", Ni = "_agents_18gpx_81", ki = "_agent_18gpx_81", $i = "_root_18gpx_96", Ci = "_agentTop_18gpx_105", Si = "_dot_18gpx_112", Ri = "_agentName_18gpx_124", Ti = "_agentMeta_18gpx_137", xi = "_foot_18gpx_49", Li = "_footName_18gpx_149", Ai = "_footLinks_18gpx_156", Ei = "_linkBrand_18gpx_183", Ii = "_label_18gpx_204", Mi = "_note_18gpx_209", ji = "_footer_18gpx_218", T = {
  sidebar: hi,
  brand: wi,
  mark: _i,
  word: fi,
  nav: vi,
  navItem: bi,
  new: "_new_18gpx_48",
  footLink: gi,
  group: pi,
  groupName: yi,
  agents: Ni,
  agent: ki,
  root: $i,
  agentTop: Ci,
  dot: Si,
  agentName: Ri,
  agentMeta: Ti,
  foot: xi,
  footName: Li,
  footLinks: Ai,
  linkBrand: Ei,
  label: Ii,
  note: Mi,
  footer: ji
};
function Bi({ agent: e }) {
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
function qi({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: T.foot, children: [
    /* @__PURE__ */ n("span", { className: T.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: T.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: `${T.footLink} ward-target`, href: W(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function Pi({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: T.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: T.brand, children: [
      /* @__PURE__ */ n("span", { className: T.mark }),
      /* @__PURE__ */ n("span", { className: T.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: T.nav, children: a.map((c) => /* @__PURE__ */ n("a", { className: T.navItem, href: W(c.href), "aria-current": c.current === !0 ? "page" : void 0, children: c.label }, c.href)) }),
    /* @__PURE__ */ o("div", { className: T.group, children: [
      /* @__PURE__ */ o("span", { className: T.groupName, children: [
        t,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: T.new, href: W(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: T.agents, children: r.map((c) => /* @__PURE__ */ n(Bi, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(qi, { shared: i })
  ] });
}
function Di(e) {
  return e.destinations ?? e.items ?? [];
}
function Hi({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: T.linkBrand, children: e });
}
function Oi({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: T.footer, children: e });
}
function Fi({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: W(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: T.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: T.note, children: e.note })
  ] });
}
function Wi(e) {
  return /* @__PURE__ */ o("aside", { className: `${T.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Hi, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Di(e).map((a) => /* @__PURE__ */ n(Fi, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(Oi, { children: e.children })
  ] });
}
function zi(e) {
  return "agents" in e;
}
function e0(e) {
  return zi(e) ? /* @__PURE__ */ n(Pi, { ...e }) : /* @__PURE__ */ n(Wi, { ...e });
}
const Ki = "_mark_wlgi8_3", Gi = {
  mark: Ki
}, Ui = { met: "✓", unmet: "", failed: "✕" };
function en({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Gi.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Ui[e]
    }
  );
}
const Vi = "_marker_br9fi_2", Xi = {
  marker: Vi
}, Yi = {
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
}, Ji = { running: " ward-running" };
function je({ size: e, kind: a, label: t }) {
  const r = { "--marker": Yi[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Xi.marker} ward-marker ward-marker--${a}${Ji[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Qi = "_root_ti0pq_2", Zi = "_chip_ti0pq_11", ec = "_noCase_ti0pq_23", sa = {
  root: Qi,
  chip: Zi,
  noCase: ec
};
function ac(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function an({ connection: e, since: a, lastEventAt: t }) {
  const r = ac(a, t), l = Ya(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${sa.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(je, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${sa.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: sa.noCase, children: Xa(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${sa.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    de(r)
  ] });
}
const nc = "_root_ryrvl_2", tc = "_context_ryrvl_12", rc = "_row_ryrvl_1", lc = "_heading_ryrvl_25", oc = "_headingWrap_ryrvl_33", ic = "_chips_ryrvl_38", cc = "_title_ryrvl_45", sc = "_consequence_ryrvl_55", dc = "_actionsWrap_ryrvl_62", uc = "_actions_ryrvl_62", mc = "_action_ryrvl_62", hc = "_overflowPanel_ryrvl_91", wc = "_measureClip_ryrvl_102", _c = "_measure_ryrvl_102", V = {
  root: nc,
  context: tc,
  row: rc,
  heading: lc,
  headingWrap: oc,
  chips: ic,
  title: cc,
  consequence: sc,
  actionsWrap: dc,
  actions: uc,
  action: mc,
  overflowPanel: hc,
  measureClip: wc,
  measure: _c
};
function fc({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ n(Ee, { as: "h1", className: V.title, text: e }) : /* @__PURE__ */ n("h1", { className: V.title, children: e });
}
function vc({ title: e, consequence: a, consequenceHint: t, density: r }) {
  return /* @__PURE__ */ o("div", { className: V.heading, children: [
    /* @__PURE__ */ n(fc, { title: e, density: r }),
    a && /* @__PURE__ */ n("p", { className: V.consequence, title: t, children: a })
  ] });
}
function Fa({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: V.action, "data-action": "", children: a }, t));
}
function pn({ disclosure: e }) {
  return /* @__PURE__ */ n(f, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function bc({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(f, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(pn, { disclosure: l }) : a ? [/* @__PURE__ */ n(pn, { disclosure: l }, "more"), /* @__PURE__ */ n(Fa, { actions: e }, "actions")] : /* @__PURE__ */ n(Fa, { actions: e });
}
function gc(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function pc({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: V.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Fa, { actions: e }) });
}
function yc(e, a) {
  const t = k(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var u, d;
    l(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function Nc({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: V.context, children: [
    /* @__PURE__ */ n(Vl, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: V.chips, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] });
}
function kc(...e) {
  return e.some((a) => a === null);
}
function $c(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Cc(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + $c(e);
}
function Sc(e, a, t, r, l) {
  if (l === 0 || kc(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = Math.max(0, e.clientWidth - Cc(e, i));
  return s.offsetWidth > u || c.scrollWidth > c.clientWidth + 1;
}
function Rc(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Tc(e) {
  return er(e) && (e.type === "a" || typeof e.props.href == "string");
}
function xc(e, a) {
  return a.length === 0 && e.length === 1 && Tc(e[0]);
}
function Lc(e, a) {
  const t = w(null), r = w(null), l = w(null), i = w(null), [c, s] = p(!1);
  return S(() => {
    const u = t.current;
    if (!Rc(u)) return;
    const d = () => s(Sc(u, r.current, l.current, i.current, e.length)), m = new ResizeObserver(d);
    return m.observe(u), i.current && m.observe(i.current), d(), () => m.disconnect();
  }, [e]), { rowRef: t, headingRef: r, actionsRef: l, measureRef: i, collapsed: c && !a };
}
function Ac({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ n("div", { className: V.measureClip, children: /* @__PURE__ */ o("div", { className: V.measure, ref: t, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(f, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function Ec({ connection: e }) {
  return e ? /* @__PURE__ */ n(an, { connection: e.connection, since: e.since }) : null;
}
function a0({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: c = [], connection: s, onOverflow: u, density: d = "page" }) {
  const { rowRef: m, headingRef: v, actionsRef: b, measureRef: y, collapsed: A } = Lc(i, xc(i, c)), j = c.length > 0, { disclosure: oe, close: Re } = yc(A || j, b), ne = gc(c, i, A, u);
  return /* @__PURE__ */ o("header", { className: V.root, "data-density": d, children: [
    /* @__PURE__ */ n(Nc, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: V.row, ref: m, children: [
      /* @__PURE__ */ n("div", { ref: v, className: V.headingWrap, children: /* @__PURE__ */ n(vc, { title: t, consequence: r, consequenceHint: l, density: d }) }),
      /* @__PURE__ */ o("div", { className: V.actionsWrap, children: [
        /* @__PURE__ */ n(Ec, { connection: s }),
        /* @__PURE__ */ n("div", { className: V.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ n(bc, { actions: i, hasMore: j, collapsed: A, onOverflow: u, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(pc, { actions: ne, disclosure: oe, onEscape: Re }),
    /* @__PURE__ */ n(Ac, { actions: i, hasMore: j, measureRef: y })
  ] });
}
const Ic = "_scrim_rn7fr_2", Mc = "_drawer_rn7fr_10", jc = "_sheet_rn7fr_14", Bc = "_modal_rn7fr_18", qc = "_panel_rn7fr_23", Pc = "_header_rn7fr_54", Dc = "_title_rn7fr_62", Hc = "_body_rn7fr_66", Oc = "_close_rn7fr_93", ke = {
  scrim: Ic,
  drawer: Mc,
  sheet: jc,
  modal: Bc,
  panel: qc,
  header: Pc,
  title: Dc,
  body: Hc,
  close: Oc
}, Fc = Me(null), va = [], ba = /* @__PURE__ */ new Map();
function Wc(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function zc(e, a) {
  let t = ba.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ba.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Kc(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !Wc(r) && zc(e, r);
}
function Gc(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (Kc(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function Uc(e) {
  for (const a of e.claims) {
    const t = ba.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), ba.delete(a)));
  }
}
function Vc(e, a) {
  const t = { root: e, claims: [] };
  return va.push(t), Gc(t, a), t;
}
function Xc(e) {
  const a = va.indexOf(e);
  a >= 0 && va.splice(a, 1), Uc(e);
}
function yn(e) {
  return e !== null && va.at(-1) === e;
}
function Yc(e, a, t) {
  const r = w(null), l = w(t);
  return l.current = t, S(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = Vc(i, a);
    return r.current = s, () => {
      var d, m;
      const u = yn(s);
      Xc(s), r.current = null, u && ((m = (d = l.current ?? c) == null ? void 0 : d.focus) == null || m.call(d));
    };
  }, [a]), J(() => yn(r.current), []);
}
function Jc(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Qc(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Zc({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${ke.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("header", { className: `${ke.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${ke.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${ke.body} ward-drawer-body`, children: e.children })
  ] });
}
function es(e) {
  return `${ke.scrim} ${ke[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function as(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ke.panel} ${ke[e]} ward-overlay-panel${t}${r}`;
}
function ns(e) {
  const a = Ie(Fc);
  return e ?? a ?? document.body;
}
function ia(e) {
  const a = w(null), t = w(null), r = k(), l = ns(e.container), i = Qa("(min-width: 768px)"), c = Jc(e.kind, i), s = Qc(e, r), u = ur(t), d = Yc(a, l, e.returnFocusTo), m = J(() => {
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
        className: es(c),
        "data-ward-overlay-kind": c,
        "data-ward-overlay-root": "",
        onClick: m,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: t,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": s.labelledBy,
            "aria-label": s.label,
            className: as(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (v) => v.stopPropagation(),
            onKeyDown: (v) => d() && u.onKeyDown(v),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${ke.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Zc, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const ts = "_root_zu7qk_2", rs = "_ticket_zu7qk_16", ls = "_body_zu7qk_25", Ma = {
  root: ts,
  ticket: rs,
  body: ls
};
function n0({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${Ma.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Ma.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Ma.body, children: t })
  ] });
}
const os = "_root_bf1pc_2", is = "_table_bf1pc_9", cs = "_caption_bf1pc_14", ss = "_series_bf1pc_23", ds = "_category_bf1pc_31", us = "_cell_bf1pc_39", ms = "_track_bf1pc_45", hs = "_lane_bf1pc_52", ws = "_bar_bf1pc_56", _s = "_value_bf1pc_63", fs = "_swatch_bf1pc_70", vs = "_empty_bf1pc_78", X = {
  root: os,
  table: is,
  caption: cs,
  series: ss,
  category: ds,
  cell: us,
  track: ms,
  lane: hs,
  bar: ws,
  value: _s,
  swatch: fs,
  empty: vs
}, bs = "—", Nn = 6;
function gs(e, a) {
  if (a.length < 1 || a.length > Nn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${Nn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function ps(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function it(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function ys(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Ns({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = ys(e, a), c = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ o("span", { className: X.track, children: [
    /* @__PURE__ */ n("span", { className: X.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${X.bar} ward-barchart-bar`, "data-step": t, style: c, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: X.value, children: e === null ? l : r(e) })
  ] }) });
}
function ks({ series: e }) {
  return /* @__PURE__ */ n(R, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: X.swatch, "data-step": it(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function $s({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: X.caption, children: e }),
    /* @__PURE__ */ n("p", { className: X.empty, children: a })
  ] });
}
function Cs({ title: e, categories: a, series: t, top: r, format: l = ae, categoryHead: i = "Category", missing: c = bs }) {
  return /* @__PURE__ */ n("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: X.table, children: [
    /* @__PURE__ */ n("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: X.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(ks, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((s, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: X.category, children: s }),
      t.map((d, m) => /* @__PURE__ */ n(Ns, { value: d.values[u], top: r, step: it(m, t.length), format: l, missing: c }, d.name))
    ] }, s)) })
  ] }) });
}
function t0(e) {
  gs(e.categories, e.series);
  const a = ps(e.series);
  return a === 0 ? /* @__PURE__ */ n($s, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Cs, { ...e, top: a });
}
const Ss = "_root_1bfqw_2", Rs = "_figure_1bfqw_7", Ts = "_of_1bfqw_13", xs = "_bar_1bfqw_18", Ls = "_rows_1bfqw_38", As = "_row_1bfqw_38", Es = "_label_1bfqw_49", Is = "_amount_1bfqw_54", Te = {
  root: Ss,
  figure: Rs,
  of: Ts,
  bar: xs,
  rows: Ls,
  row: As,
  label: Es,
  amount: Is
};
function Ms({ spent: e, ceiling: a, breakdown: t }) {
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
const js = "_frame_357zi_2", Bs = "_table_357zi_6", qs = "_th_357zi_12", Ps = "_td_357zi_13", Ds = "_sort_357zi_48", Hs = "_row_357zi_60", Os = "_empty_357zi_68", Le = {
  frame: js,
  table: Bs,
  th: qs,
  td: Ps,
  sort: Ds,
  row: Hs,
  empty: Os
}, Fs = { asc: "ascending", desc: "descending" };
function Ws(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return Fs[a.direction];
}
function zs(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Le.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Ks(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Gs({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Le.th,
      style: Ks(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Ws(e, a),
      children: zs(e, t)
    }
  );
}
function Us({ row: e, props: a }) {
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
function Vs({
  label: e,
  columns: a,
  rows: t,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: c = [],
  sort: s,
  onSort: u,
  empty: d
}) {
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: Le.empty, children: d }) : /* @__PURE__ */ n("div", { className: Le.frame, children: /* @__PURE__ */ o("table", { className: Le.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Le.head, children: a.map((m) => /* @__PURE__ */ n(Gs, { column: m, sort: s, onSort: u }, m.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((m) => /* @__PURE__ */ n(Us, { row: m, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(m))) })
  ] }) });
}
const Xs = "_list_v0s52_2", Ys = {
  list: Xs
};
function r0({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: Ys.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Js = "_label_1u62a_2", Qs = {
  label: Js
};
function l0({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((a) => /* @__PURE__ */ n("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ n("span", { className: Qs.label, children: a.header }) }, a.key)) }) });
}
const Zs = "_stack_bp6a0_2", ed = {
  stack: Zs
};
function o0({ children: e }) {
  return /* @__PURE__ */ n("span", { className: ed.stack, "data-ward-action-stack": "", children: e });
}
const ad = "_set_1z0sq_2", nd = "_legend_1z0sq_7", td = "_row_1z0sq_15", rd = "_control_1z0sq_20", ld = "_input_1z0sq_26", od = "_label_1z0sq_31", id = "_consequence_1z0sq_36", Pe = {
  set: ad,
  legend: nd,
  row: td,
  control: rd,
  input: ld,
  label: od,
  consequence: id
};
function ct({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: c, variant: s }) {
  const u = k(), d = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: Pe.set, "data-variant": s, children: [
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
              "aria-describedby": Ta(b, c),
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
const cd = "_root_5to6d_2", sd = "_head_5to6d_11", dd = "_note_5to6d_30", ud = "_index_5to6d_35", md = "_dot_5to6d_39", hd = "_counter_5to6d_50", wd = "_trailing_5to6d_58", He = {
  root: cd,
  head: sd,
  note: dd,
  index: ud,
  dot: md,
  counter: hd,
  trailing: wd
};
function _d({ index: e }) {
  return e ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("span", { className: `${He.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: He.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function fd({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: He.counter, "aria-hidden": "true", children: e }) : null;
}
function kn({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${He.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: He.head, children: [
      /* @__PURE__ */ n(_d, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: He.note, children: t }),
    /* @__PURE__ */ n(fd, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: He.trailing, children: i })
  ] });
}
const vd = "_strip_1eouv_2", bd = "_cell_1eouv_7", gd = "_value_1eouv_12", pd = "_link_1eouv_29", yd = "_label_1eouv_47", We = {
  strip: vd,
  cell: bd,
  value: gd,
  link: pd,
  label: yd
};
function Nd(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const st = (e) => `${We.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function kd({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: We.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: st(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${We.label} ward-stat-label`, children: e.label })
  ] });
}
function $d({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: We.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: st(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${We.link} ward-stat-link`, href: W(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${We.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function La({ cells: e, divided: a = !1 }) {
  return Nd(e), /* @__PURE__ */ n("dl", { className: `${We.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => t.href === void 0 ? /* @__PURE__ */ n(kd, { cell: t }, t.label) : /* @__PURE__ */ n($d, { cell: t, href: t.href }, t.label)) });
}
const Cd = "_root_1eb1u_2", Sd = "_track_1eb1u_8", Rd = "_thumb_1eb1u_46", Td = "_labelHidden_1eb1u_64", xd = "_label_1eb1u_64", Ld = "_lockedNote_1eb1u_84", Oe = {
  root: Cd,
  track: Sd,
  thumb: Rd,
  labelHidden: Td,
  label: xd,
  lockedNote: Ld
};
function Ad(e) {
  return e ? `${Oe.label} ${Oe.labelHidden}` : Oe.label;
}
function ze({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: c }) {
  const s = k(), u = `${s}switch`, d = l ? !0 : a, m = r || l;
  return /* @__PURE__ */ o("span", { className: `${Oe.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": d,
        "aria-label": e,
        "aria-labelledby": s,
        "aria-describedby": i,
        className: `${Oe.track} ward-switch`,
        "data-on": d,
        "data-locked": l ? !0 : void 0,
        disabled: m,
        onClick: () => !m && (t == null ? void 0 : t(!d)),
        children: /* @__PURE__ */ n("span", { className: Oe.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: s, htmlFor: u, className: Ad(c), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Oe.lockedNote, children: "always on" })
    ] })
  ] });
}
const Ed = "_bar_1vp69_2", Id = "_skip_1vp69_11", Md = "_mark_1vp69_22", jd = "_nav_1vp69_30", Bd = "_list_1vp69_34", qd = "_select_1vp69_41", Pd = "_selectTrigger_1vp69_45", Dd = "_dest_1vp69_52", Hd = "_actor_1vp69_71", Od = "_actorMark_1vp69_84", Fd = "_actorLabel_1vp69_89", Wd = "_tagline_1vp69_108", ie = {
  bar: Ed,
  skip: Id,
  mark: Md,
  nav: jd,
  list: Bd,
  select: qd,
  selectTrigger: Pd,
  dest: Dd,
  actor: Hd,
  actorMark: Od,
  actorLabel: Fd,
  tagline: Wd
};
function zd(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Kd(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function i0({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: c = "main" }) {
  const s = Kd(r);
  return /* @__PURE__ */ o("header", { className: ie.bar, children: [
    /* @__PURE__ */ n("a", { className: `${ie.skip} ward-target`, href: `#${c}`, children: "Skip to content" }),
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
    s && /* @__PURE__ */ o("span", { className: ie.actor, children: [
      /* @__PURE__ */ n("span", { className: ie.actorLabel, children: s }),
      /* @__PURE__ */ n("span", { className: ie.actorMark, "aria-hidden": "true", children: zd(s) })
    ] })
  ] });
}
const Gd = "_tree_u4w0j_2", Ud = "_item_u4w0j_6", Vd = "_row_u4w0j_10", Xd = "_button_u4w0j_22", ga = {
  tree: Gd,
  item: Ud,
  row: Vd,
  button: Xd
}, dt = Me(null);
function Yd({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = Ca({ orientation: "vertical" });
  return /* @__PURE__ */ n(dt.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ga.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const Jd = { ArrowRight: !0, ArrowLeft: !1 };
function $n(e) {
  return e ? !0 : void 0;
}
function Qd(e, a) {
  const t = Jd[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function Zd(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function eu(e) {
  const a = [ga.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function au(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function nu(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function tu(e) {
  return typeof e == "string" ? e : void 0;
}
function ru({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function lu({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function ut(e) {
  const a = Ie(dt);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = au(e);
  return /* @__PURE__ */ o("li", { className: ga.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: eu(e),
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
            onClick: () => Zd(e),
            onKeyDown: (r) => Qd(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: nu(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: tu(e.label), children: e.label }),
              /* @__PURE__ */ n(ru, { value: e.detail }),
              /* @__PURE__ */ n(lu, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const ou = "_frame_1fj9j_2", iu = "_subjectRail_1fj9j_22", cu = "_subject_1fj9j_22", su = "_rail_1fj9j_42", du = "_record_1fj9j_64", uu = "_recordBody_1fj9j_69", mu = "_stageGrid_1fj9j_118", hu = "_band_1fj9j_144", wu = "_bandBody_1fj9j_153", _u = "_bandActions_1fj9j_158", fu = "_scroller_1fj9j_166", vu = "_board_1fj9j_192", bu = "_laneCount_1fj9j_200", gu = "_lanes_1fj9j_210", Y = {
  frame: ou,
  subjectRail: iu,
  subject: cu,
  rail: su,
  record: du,
  recordBody: uu,
  stageGrid: mu,
  band: hu,
  bandBody: wu,
  bandActions: _u,
  scroller: fu,
  board: vu,
  laneCount: bu,
  lanes: gu
};
function c0({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: Y.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function Cn(e) {
  return e ? "true" : void 0;
}
function s0({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Y.subjectRail, "data-ward-subject-rail": t, "data-ruled": Cn(i), children: [
    /* @__PURE__ */ n("div", { className: Y.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: Y.rail, "data-sticky": Cn(l), "aria-label": r, children: a })
  ] });
}
function d0({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: c, measure: s }) {
  return c === "inline" ? /* @__PURE__ */ n("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(kn, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(kn, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: Y.recordBody, "data-pad": l, "data-measure": s, children: a })
  ] });
}
const pu = "_form_1j8ub_2", yu = "_fields_1j8ub_9", Nu = "_actions_1j8ub_19", ja = {
  form: pu,
  fields: yu,
  actions: Nu
};
function u0({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: ja.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: ja.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: ja.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function m0({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: Y.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: Y.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: Y.bandActions, children: a })
  ] });
}
const ku = "(max-width: 767.98px)";
function nn({ label: e, children: a, laneCount: t, onOverflow: r }) {
  const l = w(null);
  la(l, t ?? ar.count(a), r);
  const i = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function $u({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = p(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ o("div", { className: Y.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(I, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: l }),
    /* @__PURE__ */ n(nn, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Cu({ lanes: e, label: a }) {
  const [t, r] = p(!1);
  return /* @__PURE__ */ o("div", { className: Y.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: Y.laneCount, "data-ward-board-lane-count": "", hidden: !t, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ n(nn, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ n(nr, { children: l.content }, l.id)) })
  ] });
}
function h0({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = Qa(ku);
  return t === void 0 ? /* @__PURE__ */ n(nn, { label: a, children: e }) : l ? /* @__PURE__ */ n($u, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Cu, { lanes: t, label: a });
}
function w0({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = w(null), i = Math.max(e, 1);
  la(l, i);
  const c = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: c, children: a });
}
const Su = "_block_fummk_2", Ru = "_sentence_fummk_15", Tu = "_meta_fummk_20", xu = "_action_fummk_25", Lu = "_strip_fummk_29", Au = "_loading_fummk_48", Eu = "_label_fummk_56", Iu = "_counter_fummk_63", fe = {
  block: Su,
  sentence: Ru,
  meta: Tu,
  action: xu,
  strip: Lu,
  loading: Au,
  label: Eu,
  counter: Iu
};
function Mu({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: fe.action, children: /* @__PURE__ */ n(f, { onClick: e.onClick, children: e.label }) });
}
function Aa({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${fe.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: fe.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Mu, { action: a })
  ] });
}
function ju(e) {
  return /* @__PURE__ */ n(Aa, { ...e, kind: "ward-emptystate" });
}
function _0({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(Aa, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function f0(e) {
  return /* @__PURE__ */ n(Aa, { ...e });
}
function v0({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(Aa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function b0({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function g0({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function p0({ label: e, startedAt: a }) {
  const t = w(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  S(() => {
    const c = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = Ya(t.current, r);
  return /* @__PURE__ */ o("div", { className: `${fe.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: fe.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: fe.counter, children: Xa(i) }) : null
  ] });
}
const Bu = "_note_cigdt_2", qu = {
  note: Bu
};
function Pu({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: qu.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const Du = "_card_17y0p_2", Hu = "_hit_17y0p_29", Ou = "_head_17y0p_42", Fu = "_title_17y0p_49", Wu = "_meta_17y0p_54", zu = "_fields_17y0p_55", Ku = "_who_17y0p_68", Gu = "_sep_17y0p_72", Uu = "_mono_17y0p_76", Vu = "_field_17y0p_55", Xu = "_last_17y0p_92", Yu = "_reason_17y0p_104", Q = {
  card: Du,
  hit: Hu,
  head: Ou,
  title: Fu,
  meta: Wu,
  fields: zu,
  who: Ku,
  sep: Gu,
  mono: Uu,
  field: Vu,
  last: Xu,
  reason: Yu
}, Ju = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Qu(e, a, t) {
  const r = ma(e, "blue"), l = ma(e, "orange"), i = ma(e, "green"), c = w(/* @__PURE__ */ new Set());
  S(() => {
    if (!t) return;
    const s = { blue: r, orange: l, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = Ju[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, l]);
}
const Zu = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function em(e, a) {
  return Zu[a](e);
}
function am({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: Q.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: Q.meta, children: [
    /* @__PURE__ */ n(Ee, { className: Q.who, text: `waits on ${e.run.agent}` }),
    t,
    /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: Q.meta, children: [
    /* @__PURE__ */ n(Ee, { className: Q.who, text: `waits on ${e.waitsOn}` }),
    t,
    /* @__PURE__ */ o("span", { className: Q.mono, children: [
      se(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function nm({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: Q.head, children: [
    e.flagged && /* @__PURE__ */ n(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function tm({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: Q.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function rm({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: Q.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: Q.field, children: em(e, t) }, t)) });
}
const Wa = (e) => e ? !0 : void 0;
function lm(e) {
  return { "--stream": ve(e.streamStep, "id") };
}
function om(e, a, t) {
  e == null || e(a, t);
}
function im(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function cm({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: Q.last, "data-stale": Wa(a), children: t }) : null;
}
function Ea(e) {
  const a = e.fields ?? [], t = e.item, r = w(null);
  Qu(r, t.key, e.feed);
  const l = im(e.feed), i = lm(t);
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
        /* @__PURE__ */ n("button", { type: "button", className: Q.hit, onClick: (c) => om(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(nm, { item: t }),
        /* @__PURE__ */ n(Ee, { as: "p", className: Q.title, text: t.title }),
        /* @__PURE__ */ n(am, { item: t, connection: l }),
        /* @__PURE__ */ n(tm, { reason: t.blockedReason }),
        /* @__PURE__ */ n(rm, { item: t, fields: a }),
        /* @__PURE__ */ n(cm, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const sm = "_column_ppaii_3", dm = "_head_ppaii_24", um = "_label_ppaii_33", mm = "_count_ppaii_42", hm = "_list_ppaii_56", aa = {
  column: sm,
  head: dm,
  label: um,
  count: mm,
  list: hm
};
function mt(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function wm({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: aa.head, children: [
    /* @__PURE__ */ n("h2", { className: aa.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: aa.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function _m(e) {
  return /* @__PURE__ */ n("div", { className: aa.list, role: "list", children: e.rows.map((a, t) => {
    var r;
    return /* @__PURE__ */ n(
      Ea,
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
function fm({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = k(), m = e.cap !== void 0 && a.length > e.cap, v = mt(a, r);
  return /* @__PURE__ */ o("section", { className: aa.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(wm, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(_m, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, rows: v }),
    m && /* @__PURE__ */ n(Pu, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const vm = "_foot_cs4jr_2", bm = "_note_cs4jr_13", gm = "_link_cs4jr_19", Ba = {
  foot: vm,
  note: bm,
  link: gm
};
function y0({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ba.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ba.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Ba.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const pm = "_head_1lguu_3", ym = "_identity_1lguu_12", Nm = "_titleRow_1lguu_18", km = "_title_1lguu_18", $m = "_key_1lguu_35", Cm = "_rollup_1lguu_45", Sm = "_tools_1lguu_53", Rm = "_swatch_1lguu_65", Tm = "_mark_1lguu_72", ye = {
  head: pm,
  identity: ym,
  titleRow: Nm,
  title: km,
  key: $m,
  rollup: Cm,
  tools: Sm,
  swatch: Rm,
  mark: Tm
}, Sn = "initials:";
function xm(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Lm(e) {
  const a = [xm(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${se(e.p90)}`), a.join(" · ");
}
function Am(e) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Lm(e)
  ] });
}
function Em(e) {
  return e.startsWith(Sn) ? e.slice(Sn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Im({ markRef: e, streamStep: a }) {
  const t = { "--stream": ve(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${ye.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Em(e) }) : /* @__PURE__ */ n("span", { className: ye.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Mm({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(I, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function N0({
  stream: e,
  rollups: a,
  connection: t,
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
        /* @__PURE__ */ n(Im, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: ye.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: ye.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: ye.rollup, "aria-live": "polite", children: Am(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ye.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Mm, { owners: l, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(f, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(an, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const jm = "_head_1sejb_14", Bm = "_line_1sejb_15", qm = "_cHandle_1sejb_36", Pm = "_cName_1sejb_41", Dm = "_nameLine_1sejb_49", Hm = "_cLabel_1sejb_56", Om = "_cCap_1sejb_61", Fm = "_cShown_1sejb_66", Wm = "_name_1sejb_49", zm = "_noCap_1sejb_88", Km = "_state_1sejb_102", Gm = "_handle_1sejb_111", Um = "_sub_1sejb_137", q = {
  head: jm,
  line: Bm,
  cHandle: qm,
  cName: Pm,
  nameLine: Dm,
  cLabel: Hm,
  cCap: Om,
  cShown: Fm,
  name: Wm,
  noCap: zm,
  state: Km,
  handle: Gm,
  sub: Um
}, Vm = "can't be hidden or collapsed", Xm = "terminal · counted, not a column";
function k0() {
  return /* @__PURE__ */ o("div", { className: q.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: q.cHandle }),
    /* @__PURE__ */ n("span", { className: q.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: q.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: q.cShown, children: "Shown" })
  ] });
}
function Ym(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Jm(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Rn(e) {
  return e.gate ? Vm : e.terminal ? Xm : Jm(e.agentsMounted);
}
function Qm(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Zm({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: q.cName, children: [
    /* @__PURE__ */ o("span", { className: q.nameLine, children: [
      /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Rn(e) && /* @__PURE__ */ n("span", { className: q.sub, children: Rn(e) })
  ] });
}
function eh(e) {
  return e === void 0 ? "" : String(e);
}
function ah(e) {
  return e === "" ? void 0 : Number(e);
}
function nh({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: q.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: q.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => Qm(t, a),
      children: "⠿"
    }
  ) });
}
function th({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${q.cCap} ${q.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: q.cCap, children: /* @__PURE__ */ n(I, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: eh(a.cap), onChange: (r) => t({ ...a, cap: ah(r) }) }) });
}
function rh({ stage: e, config: a, onChange: t }) {
  const r = Ym(e, a.shown), l = e.gate || e.terminal, i = (c) => t({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: q.cShown, children: [
    /* @__PURE__ */ n(ze, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ n("span", { className: q.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function lh(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function $0({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: q.line, "data-kind": lh(e), children: [
    /* @__PURE__ */ n(nh, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Zm, { stage: e }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: /* @__PURE__ */ n(I, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(th, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(rh, { stage: e, config: a, onChange: t })
  ] });
}
const oh = "_body_1a4f4_2", ih = "_head_1a4f4_9", ch = "_summary_1a4f4_19", sh = "_block_1a4f4_20", dh = "_actionsBlock_1a4f4_21", uh = "_title_1a4f4_41", mh = "_note_1a4f4_46", hh = "_k_1a4f4_51", wh = "_kv_1a4f4_58", _h = "_row_1a4f4_64", fh = "_label_1a4f4_75", vh = "_value_1a4f4_84", bh = "_quote_1a4f4_90", gh = "_actions_1a4f4_21", ph = "_resolve_1a4f4_103", P = {
  body: oh,
  head: ih,
  summary: ch,
  block: sh,
  actionsBlock: dh,
  title: uh,
  note: mh,
  k: hh,
  kv: wh,
  row: _h,
  label: fh,
  value: vh,
  quote: bh,
  actions: gh,
  resolve: ph
};
function yh(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Nh(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function kh(e) {
  const a = oa(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function $h(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(h, { ...xa(kh(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...yh(e),
    ...Nh(e, a)
  ];
}
function Ch({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: P.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: P.k, children: a }),
    e
  ] });
}
function Sh({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: P.head, children: [
    /* @__PURE__ */ n(h, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function Rh({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: P.block, children: [
    /* @__PURE__ */ n("p", { className: P.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: P.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: P.note, children: e.agentMeta })
  ] }) : null;
}
function C0({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = k(), d = $h(e, l);
  return /* @__PURE__ */ n(ia, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: P.body, children: [
    /* @__PURE__ */ n(Sh, { item: e }),
    /* @__PURE__ */ o("div", { className: P.summary, children: [
      /* @__PURE__ */ n("h2", { className: P.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: P.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: P.kv, children: d.map(([m, v]) => /* @__PURE__ */ o("div", { className: P.row, children: [
      /* @__PURE__ */ n("dt", { className: P.label, children: m }),
      /* @__PURE__ */ n("dd", { className: P.value, children: v })
    ] }, m)) }),
    /* @__PURE__ */ n(Rh, { item: e }),
    /* @__PURE__ */ o("div", { className: P.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: P.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: P.note, children: s })
    ] }),
    /* @__PURE__ */ n(Ch, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Th = "_root_3azmy_2", xh = "_list_3azmy_7", Lh = "_item_3azmy_12", Ah = "_box_3azmy_18", Eh = "_text_3azmy_23", Ih = "_note_3azmy_28", Ue = {
  root: Th,
  list: xh,
  item: Lh,
  box: Ah,
  text: Eh,
  note: Ih
};
function Ia({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ o("div", { className: Ue.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ue.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ue.box, children: /* @__PURE__ */ n(en, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Ue.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Ue.note} ward-checklist-note`, children: a })
  ] });
}
const Mh = "_rail_ke7ch_2", jh = "_k_ke7ch_11", Bh = "_head_ke7ch_19", qh = "_section_ke7ch_25", Ph = "_card_ke7ch_38", Dh = "_strip_ke7ch_42", Hh = "_skeleton_ke7ch_56", Oh = "_skeletonLabel_ke7ch_70", Fh = "_bar_ke7ch_76", Wh = "_note_ke7ch_85", me = {
  rail: Mh,
  k: jh,
  head: Bh,
  section: qh,
  card: Ph,
  strip: Dh,
  skeleton: Hh,
  skeletonLabel: Oh,
  bar: Fh,
  note: Wh
};
function zh(e) {
  return (a) => e == null ? void 0 : e(a);
}
function qa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: me.k, children: e }),
    a
  ] });
}
function Kh({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function Gh({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(fm, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function Uh(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Gh, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Kh, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function S0(e) {
  const a = zh(e.onOpen), t = mt(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(qa, { title: "Card", children: /* @__PURE__ */ n("div", { className: me.card, children: t && /* @__PURE__ */ n(Ea, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(qa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Uh, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(qa, { title: "Effect of this config", children: /* @__PURE__ */ n(Ia, { items: e.effects, density: "compact" }) })
  ] });
}
function Vh(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Xh(e) {
  return Math.ceil(e.length / 2);
}
function Yh(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function ht(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Jh(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = ht(e);
  l !== void 0 && t(l), r(Yh(e.type));
}
function Qh(e, a, t, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Jh(i, t, r, l));
  }, [e, a, t, r, l]);
}
function Zh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function ew(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function aw(e, a) {
  return a !== void 0 ? se(e.timeInStage) + " · waits on " + a.agent : se(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function nw(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + z.height.card + " + " + z.height.cardRow + " * " + String(Xh(a ?? [])) + ")"
  };
}
function tw(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function rw(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(h, { role: "meta", label: re(e.cost) }) : null;
}
function lw(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(h, { role: "meta", label: e.jiraKey }) : null;
}
function ow(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Se, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function iw(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function cw(e, a) {
  return a === void 0 ? e : Vh(e, a.ref);
}
function sw(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ra(e) {
  return e === !0 ? "true" : void 0;
}
function wt(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = w(null), i = ma(l), c = w(/* @__PURE__ */ new Set()), [s, u] = p(Zh(a));
  Qh(e.feed, a.key, c, u, i);
  const d = ew(a, r), m = aw(a, t), v = nw(a, e.fields), b = iw(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...sw(e),
      className: "ward-workcard",
      "data-flagged": ra(a.flagged),
      "data-selected": ra(e.selected),
      style: v,
      ref: cw(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        tw(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(h, { role: d.role, label: d.label }),
          rw(a, e.fields),
          lw(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          ow(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function dw({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function uw(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function mw(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function hw(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(dw, { count: e.items.length, cap: e.column.cap });
}
function ww(e, a) {
  return e.roving ?? a;
}
function _w(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function fw(e, a) {
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
function vw(e) {
  const a = k(), t = Ca({ orientation: "vertical" }), r = ww(e, t), l = uw(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ra(l), "data-gate": ra(e.column.gate), children: [
    mw(e.column, e.items.length, a),
    hw(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ..._w(e, t), children: fw(e, r) })
  ] });
}
function bw(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + se(e.p50)), e.p90 !== void 0 && (a += " · p90 " + se(e.p90)), a;
}
function gw(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(I, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function pw(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function R0(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: bw(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      gw(e),
      pw(e.onConfigure),
      /* @__PURE__ */ n(an, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function yw(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Nw(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(ze, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(ze, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function kw(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(R, { children: [
    a > 0 ? /* @__PURE__ */ n(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function T0(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ra(yw(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Nw(e) }),
    /* @__PURE__ */ n(I, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(Un, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    kw(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function x0(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(wt, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(vw, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function $w(e, a) {
  const t = ht(e);
  t !== void 0 && a(t);
}
function Cw(e, a, t) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => $w(r, t));
  }, [e, a, t]);
}
function Sw(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Rw(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function Tw(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Se, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function xw(e, a) {
  return /* @__PURE__ */ o(R, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function L0(e) {
  var c;
  const a = e.item, t = a.run, [r, l] = p((c = a.run) == null ? void 0 : c.lastStep);
  Cw(e.feed, a.key, l);
  const i = [...Sw(a), ...Rw(a)];
  return /* @__PURE__ */ o(ia, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      Tw(t, r)
    ] }),
    xw(a, e.actions)
  ] });
}
const Lw = "_card_1iv4k_2", Aw = "_head_1iv4k_28", Ew = "_mark_1iv4k_36", Iw = "_name_1iv4k_48", Mw = "_chips_1iv4k_69", jw = "_description_1iv4k_75", Bw = "_run_1iv4k_80", qw = "_sep_1iv4k_89", Pw = "_facts_1iv4k_94", Dw = "_fact_1iv4k_94", Hw = "_factLabel_1iv4k_107", Ow = "_factValue_1iv4k_111", le = {
  card: Lw,
  head: Aw,
  mark: Ew,
  name: Iw,
  chips: Mw,
  description: jw,
  run: Bw,
  sep: qw,
  facts: Pw,
  fact: Dw,
  factLabel: Hw,
  factValue: Ow
}, Fw = { live: "done", draft: "running", paused: "meta" };
function Ww(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function zw({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ n(h, { role: Fw[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function Kw({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: le.description, children: e });
}
function Gw({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Se, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Uw({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ n("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function Vw(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Xw({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: c }) {
  const s = { "--stream": ve(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: Ww(c),
      style: s,
      "data-selected": u,
      "data-paused": Vw(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ n("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${le.name} ward-rowlink ward-target`, href: W(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(Kw, { description: e.description }),
        /* @__PURE__ */ n(Gw, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(zw, { versions: e.versions }),
        /* @__PURE__ */ n(Uw, { facts: i })
      ]
    }
  );
}
const Yw = "_list_4dcyc_2", Jw = "_row_4dcyc_11", Qw = "_head_4dcyc_23", Zw = "_id_4dcyc_30", e_ = "_lock_4dcyc_35", a_ = "_reason_4dcyc_41", n_ = "_remove_4dcyc_46", t_ = "_clauses_4dcyc_50", r_ = "_clause_4dcyc_50", l_ = "_label_4dcyc_64", o_ = "_cell_4dcyc_71", i_ = "_value_4dcyc_76", ce = {
  list: Yw,
  row: Jw,
  head: Qw,
  id: Zw,
  lock: e_,
  reason: a_,
  remove: n_,
  clauses: t_,
  clause: r_,
  label: l_,
  cell: o_,
  value: i_
}, _t = Me(!1);
function A0({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(_t.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": a, children: e }) });
}
function c_({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(I, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function s_({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function d_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(s_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ o(f, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Tn(e, a) {
  return e.locked ? void 0 : a;
}
function E0({ rule: e, onChange: a, onRemove: t }) {
  if (!Ie(_t)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Tn(e, a);
  return /* @__PURE__ */ o("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(d_, { rule: e, onRemove: Tn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(c_, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const u_ = "_ladder_n8eeo_2", m_ = "_cell_n8eeo_7", h_ = "_empty_n8eeo_26", w_ = "_name_n8eeo_34", __ = "_holder_n8eeo_40", f_ = "_request_n8eeo_46", v_ = "_swatches_n8eeo_51", b_ = "_swatch_n8eeo_51", g_ = "_tilesFrame_n8eeo_78", p_ = "_tiles_n8eeo_78", y_ = "_tile_n8eeo_78", N_ = "_bar_n8eeo_117", k_ = "_hex_n8eeo_128", $_ = "_note_n8eeo_138", L = {
  ladder: u_,
  cell: m_,
  empty: h_,
  name: w_,
  holder: __,
  request: f_,
  swatches: v_,
  swatch: b_,
  tilesFrame: g_,
  tiles: p_,
  tile: y_,
  bar: N_,
  hex: k_,
  note: $_
}, I0 = "not validated yet, pending a CVD matrix and dark stepping";
function C_(e) {
  return e.reserved ? "reserved" : Ra(e.step) ? "validated" : "partial";
}
function ft(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function S_(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function R_({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(je, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function T_(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function x_(e, a, t) {
  return {
    "aria-checked": a,
    "aria-disabled": t || void 0,
    tabIndex: t ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const xn = (e) => String(e).padStart(2, "0");
function L_(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? ft(e, void 0);
}
function A_({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.hex} ward-ladder-hex`, children: r ? `step ${xn(e)}` : vr(e) }),
    /* @__PURE__ */ n("span", { className: `${L.note} ward-ladder-note`, children: r ? t : `Step ${xn(e)} · ${t}` })
  ] });
}
function E_({ step: e, value: a, taken: t, onChange: r, presentation: l, disabled: i }) {
  const c = C_(e), s = ft(c, t), u = s !== "free", d = u || i, m = a === e.step, v = e.name ?? `Step ${e.step}`, b = () => {
    d || r(e.step);
  }, y = `${v} · ${l === "tiles" && m ? "yours" : s}`;
  return { shared: { role: "radio", "aria-label": y, ...x_(u, m, d), "data-validation": c, style: S_(e, c), onClick: b, onKeyDown: (j) => T_(j, b) }, label: y, name: v, holder: s, validation: c, note: L_(c, t, m), step: e.step };
}
const I_ = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${L.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${L.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(A_, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${L.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(R_, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${L.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${L.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function M_(e) {
  return I_[e.presentation](E_(e));
}
function j_(e) {
  for (const a of e)
    if (!a.reserved && !Sa(a.step)) throw new Error("colour ladder renders token steps only");
}
function B_() {
  return /* @__PURE__ */ o("div", { className: `${L.cell} ward-ladder-cell ${L.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${L.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function q_(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const P_ = { list: L.ladder, swatches: L.swatches, tiles: L.tilesFrame };
function D_() {
  return /* @__PURE__ */ o("div", { className: `${L.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${L.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const H_ = { list: B_, swatches: () => null, tiles: D_ };
function O_(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function vt(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  j_(e.steps);
  const r = q_(e), l = H_[r], i = /* @__PURE__ */ o(R, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(M_, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r, disabled: e.disabled === !0 }, c.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...O_(e.disabled === !0), className: `${P_[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: L.tiles, children: i }) : i });
}
const F_ = "_rail_s06lm_2", W_ = "_section_s06lm_12", z_ = "_sectionFlush_s06lm_22", K_ = "_head_s06lm_26", G_ = "_headLabel_s06lm_34", U_ = "_sample_s06lm_42", V_ = "_sampleLabel_s06lm_47", X_ = "_sampleTitle_s06lm_54", Y_ = "_sampleMeta_s06lm_59", J_ = "_trace_s06lm_65", Q_ = "_traceHead_s06lm_70", Z_ = "_steps_s06lm_78", ef = "_step_s06lm_78", af = "_stepTitle_s06lm_97", nf = "_hollow_s06lm_107", tf = "_stepBody_s06lm_115", rf = "_stepDetail_s06lm_127", lf = "_publish_s06lm_132", of = "_reason_s06lm_138", cf = "_note_s06lm_143", sf = "_reveal_s06lm_148", N = {
  rail: F_,
  section: W_,
  sectionFlush: z_,
  head: K_,
  headLabel: G_,
  sample: U_,
  sampleLabel: V_,
  sampleTitle: X_,
  sampleMeta: Y_,
  trace: J_,
  traceHead: Q_,
  steps: Z_,
  step: ef,
  stepTitle: af,
  hollow: nf,
  stepBody: tf,
  stepDetail: rf,
  publish: lf,
  reason: of,
  note: cf,
  reveal: sf
}, Ln = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, df = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, uf = { ok: "greenFill", finding: "orangeFill", action: "blue" }, mf = { notSimulated: "not simulated", running: "running" };
function hf(e) {
  return e.presentation === "foundry";
}
function wf(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function _f(e, a) {
  var r;
  const t = df[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function ff(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function vf(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function bf(e) {
  if (ff(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function gf(e) {
  const [a, t] = p(!1);
  S(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${N.step} ${N.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function pf(e) {
  const a = mf[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: N.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(je, { size: 6, kind: uf[e.kind], label: e.kind });
}
function yf(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: N.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Nf(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function kf(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(gf, { kind: a.kind, children: [
    /* @__PURE__ */ n(pf, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: N.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: N.stepTitle, children: a.title }),
      /* @__PURE__ */ n(yf, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Nf, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function $f(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(se(a)), t.join(" · ");
}
function bt(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${N.trace} ${N.section}`, children: [
    /* @__PURE__ */ n("p", { className: N.traceHead, id: a, children: $f(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: N.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(kf, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Cf(e) {
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
function Sf(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${N.sampleMeta} ${N.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Rf(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Fn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: N.sectionFlush, children: /* @__PURE__ */ n(La, { divided: !0, cells: a }) });
}
function Tf(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Fn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function xf(e) {
  const a = Tf(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: N.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: N.sectionFlush, children: /* @__PURE__ */ n(La, { divided: !0, cells: a }) });
}
function gt(e) {
  const a = k();
  return e.reason !== null ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("p", { className: `${N.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(f, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(f, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Lf(e) {
  return /* @__PURE__ */ o("div", { className: `${N.publish} ${N.section}`, children: [
    /* @__PURE__ */ n(gt, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: N.note, children: e.note })
  ] });
}
function Af(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${N.publish} ${N.section}`, children: /* @__PURE__ */ n(gt, { reason: e.reason, onPublish: e.onPublish }) });
}
function pt(e) {
  return /* @__PURE__ */ o("div", { className: `${N.head} ${N.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: N.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(h, { role: Ln[e.run.status].role, label: Ln[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Ef(e, a) {
  const [t, r] = p(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var c, s;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((c = l.step) == null ? void 0 : c.label) ?? "step", detail: (s = l.step) == null ? void 0 : s.tool }];
        });
      });
  }, [a, e.status]), t;
}
function If(e) {
  var t;
  vf(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(pt, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Cf, { sample: e.run.sample }),
    /* @__PURE__ */ n(bt, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Rf, { run: e.run }),
    /* @__PURE__ */ n("div", { className: N.section, children: /* @__PURE__ */ n(Ia, { items: e.checklist }) }),
    /* @__PURE__ */ n(Lf, { reason: wf(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Mf(e) {
  var r;
  const a = Ef(e.run, e.feed);
  bf(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(pt, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Sf, { sample: e.run.sample }),
    /* @__PURE__ */ n(bt, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(xf, { run: e.run }),
    /* @__PURE__ */ n("div", { className: N.section, children: /* @__PURE__ */ n(Ia, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Af, { reason: _f(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function M0(e) {
  return hf(e) ? /* @__PURE__ */ n(Mf, { ...e }) : /* @__PURE__ */ n(If, { ...e });
}
const jf = "_list_142ip_3", Bf = "_row_142ip_9", qf = "_condition_142ip_18", Pf = "_action_142ip_24", ha = {
  list: jf,
  row: Bf,
  condition: qf,
  action: Pf
}, yt = Me(!1);
function j0({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(yt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ha.list, "aria-label": a, children: e }) });
}
function B0({ rule: e }) {
  if (!Ie(yt)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: ha.row, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ha.condition, children: e.when }),
    /* @__PURE__ */ n(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ha.action, children: e.then })
  ] });
}
const Df = "_move_tmppt_3", Hf = {
  move: Df
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
function Of(e) {
  return e === "up" ? "down" : "up";
}
function Ff(e, a) {
  const t = An(e, a.id, a.direction) ?? An(e, a.id, Of(a.direction));
  t == null || t.focus();
}
function $t() {
  const e = w(null), [a, t] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && a !== null && Ff(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), l(s);
  } };
}
function Ct({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function pa({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${Hf.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Wf = "_body_1jd1i_2", zf = "_title_1jd1i_8", Kf = "_section_1jd1i_13", Gf = "_legend_1jd1i_18", Uf = "_stages_1jd1i_26", Vf = "_stage_1jd1i_26", Xf = "_stageIndex_1jd1i_44", Yf = "_stageName_1jd1i_50", Jf = "_footer_1jd1i_59", Qf = "_note_1jd1i_66", Zf = "_reason_1jd1i_71", ev = "_actions_1jd1i_76", av = "_webHead_1jd1i_83", nv = "_kicker_1jd1i_92", tv = "_webTitle_1jd1i_99", rv = "_webBody_1jd1i_105", lv = "_webSection_1jd1i_109", ov = "_sectionHead_1jd1i_121", iv = "_sectionNote_1jd1i_129", cv = "_formLabel_1jd1i_134", sv = "_identityRow_1jd1i_139", dv = "_nameCell_1jd1i_145", uv = "_keyCell_1jd1i_150", mv = "_colourCell_1jd1i_154", hv = "_colourStatus_1jd1i_161", wv = "_webStages_1jd1i_166", _v = "_webStageList_1jd1i_172", fv = "_webStage_1jd1i_166", vv = "_webIndex_1jd1i_191", bv = "_webStageName_1jd1i_196", gv = "_webMoves_1jd1i_201", pv = "_addStage_1jd1i_215", yv = "_addStageButton_1jd1i_223", Nv = "_addStageNote_1jd1i_231", kv = "_webFooter_1jd1i_236", $v = "_webFooterNotes_1jd1i_244", Cv = "_webNote_1jd1i_251", _ = {
  body: Wf,
  title: zf,
  section: Kf,
  legend: Gf,
  stages: Uf,
  stage: Vf,
  stageIndex: Xf,
  stageName: Yf,
  footer: Jf,
  note: Qf,
  reason: Zf,
  actions: ev,
  webHead: av,
  kicker: nv,
  webTitle: tv,
  webBody: rv,
  webSection: lv,
  sectionHead: ov,
  sectionNote: iv,
  formLabel: cv,
  identityRow: sv,
  nameCell: dv,
  keyCell: uv,
  colourCell: mv,
  colourStatus: hv,
  webStages: wv,
  webStageList: _v,
  webStage: fv,
  webIndex: vv,
  webStageName: bv,
  webMoves: gv,
  addStage: pv,
  addStageButton: yv,
  addStageNote: Nv,
  webFooter: kv,
  webFooterNotes: $v,
  webNote: Cv
}, Sv = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], St = "not in catalogue";
function Rv(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${St}` }, ...t];
}
function Tv({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(I, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${St}`;
  return /* @__PURE__ */ n(I, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Rv(t, e.name), invalid: i, onChange: r });
}
function Rt(e, a) {
  return e.name || `stage ${a + 1}`;
}
function xv(e) {
  const a = w([]), t = w(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Lv({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: c }) {
  const s = Rt(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${_.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: _.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: _.webStageName, children: /* @__PURE__ */ n(Tv, { stage: a, index: t, catalogue: l, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(I, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: Sv, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ o("span", { className: _.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(pa, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(pa, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function Av({ stages: e, onChange: a, catalogue: t }) {
  const r = xv(e.length), l = $t(), i = (s, u) => {
    const d = Nt(s, u);
    r.current = za(r.current, s, d), l.moved({ id: r.current[d], direction: u }, kt(Rt(e[s], s), d, e.length)), a(za(e, s, d));
  }, c = (s, u) => a(e.map((d, m) => m === s ? u : d));
  return /* @__PURE__ */ o("div", { className: _.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: _.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ n(Lv, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: t, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(Ct, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: _.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: _.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: _.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Ev = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Iv = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Mv = "A new stream starts as a draft. Nothing runs on it until you publish it.", jv = "Create is disabled: name the stream and give it a key first.", Bv = "reorder with the ↑ ↓ buttons · min 2";
function tn(e, a) {
  return !e.reserved && Ra(e.step) && a[e.step] === void 0;
}
function qv(e, a) {
  const t = e.find((r) => tn(r, a));
  return t ? t.step : 1;
}
function Pv({ stages: e, onMove: a }) {
  const t = $t(), r = (l, i) => {
    const c = Nt(l, i);
    t.moved({ id: e[l].id, direction: i }, kt(e[l].name, c, e.length)), a(l, c);
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
function Dv({ reason: e, onCreate: a, onDraft: t }) {
  const r = k();
  return /* @__PURE__ */ o("div", { className: _.footer, children: [
    /* @__PURE__ */ n("p", { className: _.note, children: Mv }),
    e && /* @__PURE__ */ n("p", { className: _.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: _.actions, children: [
      /* @__PURE__ */ n(f, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(f, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Hv(e, a) {
  return e !== "" && a !== "" ? null : jv;
}
function Ov(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = Iv, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = k(), [m, v] = p(""), [b, y] = p(""), [A, j] = p(a[0].value), [oe, Re] = p(() => qv(t, r)), [ne, Ke] = p(e.stages ?? Ev), [Ge, C] = p(l[0].value), K = { name: m, key: b, streamStep: oe, owner: A, stages: ne, policy: Ge }, be = Hv(m, b);
  return /* @__PURE__ */ n(ia, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: _.body, children: [
    /* @__PURE__ */ n("h2", { className: _.title, id: d, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Identity" }),
      /* @__PURE__ */ n(I, { kind: "input", label: "Stream name", value: m, onChange: v }),
      /* @__PURE__ */ n(I, { kind: "input", label: "Key", value: b, onChange: y, mono: !0 }),
      /* @__PURE__ */ n(I, { kind: "select", label: "Owner", value: A, onChange: j, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Colour" }),
      /* @__PURE__ */ n(vt, { label: "Stream colour", steps: t, value: oe, onChange: Re, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Stages" }),
      /* @__PURE__ */ n(Pv, { stages: ne, onMove: (Be, Zt) => Ke(za(ne, Be, Zt)) })
    ] }),
    /* @__PURE__ */ n(ct, { legend: "Loop policy", options: l, value: Ge, onChange: C }),
    /* @__PURE__ */ n(Dv, { reason: be, onCreate: () => i(K), onDraft: () => c(K) })
  ] }) });
}
const Tt = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Fv = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Wv(e, a, t, r, l, i) {
  var s;
  const c = ((s = Tt.find((u) => u.value === l)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function zv(e, a) {
  return Kv(e) && Gv(e, a) && Uv(e);
}
function Kv(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Gv(e, a) {
  return e.colourStep === null || tn({ step: e.colourStep }, a);
}
function Uv(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Vv(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : tn({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Xv({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: _.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: _.webNote, children: "Add a stage an agent can run on." });
}
function Yv({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: _.webFooter, children: [
    /* @__PURE__ */ o("div", { className: _.webFooterNotes, children: [
      /* @__PURE__ */ n(Xv, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: _.reason, children: Fv })
    ] }),
    l && /* @__PURE__ */ n(f, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(f, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Jv({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: _.webHead, children: [
    /* @__PURE__ */ n("span", { className: _.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: _.webTitle, children: "New stream" })
  ] });
}
function Qv({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: _.webSection, children: [
    /* @__PURE__ */ n("h3", { className: _.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: _.identityRow, children: [
      /* @__PURE__ */ n("div", { className: _.nameCell, children: /* @__PURE__ */ n(I, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: _.keyCell, children: /* @__PURE__ */ n(I, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function Zv(e) {
  const a = k(), t = k(), r = e.takenBy ?? {}, [l, i] = p(""), [c, s] = p(""), [u, d] = p(e.owners[0] ?? ""), [m, v] = p(null), [b, y] = p("relay"), [A, j] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = Wv(l, c, u, m, b, A), Re = zv(oe, r), ne = A.find((C) => C.kind === "agent" && C.name.trim() !== ""), Ke = /* @__PURE__ */ o("div", { className: _.colourCell, children: [
    /* @__PURE__ */ n("span", { className: _.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(vt, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: v, takenBy: r })
  ] }), Ge = /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("p", { className: _.colourStatus, "data-colour-status": "", children: Vv(m, r) }),
    /* @__PURE__ */ n(I, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map((C) => ({ value: C, label: C })), onChange: d })
  ] });
  return /* @__PURE__ */ o(ia, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Jv, { titleId: t }),
    /* @__PURE__ */ o("div", { className: _.webBody, children: [
      /* @__PURE__ */ n(Qv, { name: l, setName: i, streamKey: c, setKey: s, colour: Ke, owner: Ge }),
      /* @__PURE__ */ o("section", { className: _.webSection, children: [
        /* @__PURE__ */ o("div", { className: _.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: _.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: _.sectionNote, children: Bv })
        ] }),
        /* @__PURE__ */ n(Av, { stages: A, onChange: j })
      ] }),
      /* @__PURE__ */ n("section", { className: _.webSection, children: /* @__PURE__ */ n(ct, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Tt, onChange: y }) }),
      /* @__PURE__ */ n(Yv, { ready: Re, draft: oe, agentStage: ne, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function q0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Zv, { ...e }) : /* @__PURE__ */ n(Ov, { ...e });
}
const eb = "_row_bs8hc_2", ab = "_cell_bs8hc_6", nb = "_condition_bs8hc_11", tb = "_action_bs8hc_18", rb = "_contract_bs8hc_24", lb = "_contractCondition_bs8hc_33", ob = "_contractAction_bs8hc_39", Z = {
  row: eb,
  cell: ab,
  condition: nb,
  action: tb,
  contract: rb,
  contractCondition: lb,
  contractAction: ob
}, xt = ["advance", "block", "escalate", "requestReview"], En = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function ya(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function rn(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: Z.action, children: En[e.then] }) : /* @__PURE__ */ n(
    I,
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
function ib({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ n("span", { className: Z.condition, title: ya(e, r), children: ya(e, r) }) }),
    /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: Z.cell, children: rn(e, a, t) })
  ] });
}
function cb({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ o("td", { className: Z.cell, children: [
      /* @__PURE__ */ n(h, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: Z.condition, children: ya(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: Z.cell, children: rn(e, a, t) })
  ] });
}
function sb({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Z.contract, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: Z.contractCondition, children: ya(e, r) }),
    /* @__PURE__ */ n(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: Z.contractAction, children: rn(e, a, t, !0) })
  ] });
}
const db = { two: cb, four: ib, contract: sb };
function P0(e) {
  var t;
  if (!xt.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = db[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const ub = "_column_1xq6c_2", mb = "_head_1xq6c_17", hb = "_index_1xq6c_23", wb = "_name_1xq6c_29", _b = "_meta_1xq6c_38", fb = "_mono_1xq6c_43", vb = "_gate_1xq6c_50", bb = "_reviewersLabel_1xq6c_57", gb = "_reviewers_1xq6c_57", pb = "_reviewer_1xq6c_57", yb = "_agents_1xq6c_74", Nb = "_workflowColumn_1xq6c_79", kb = "_workflowHead_1xq6c_96", $b = "_stageRow_1xq6c_102", Cb = "_stageLabel_1xq6c_109", Sb = "_workflowTitle_1xq6c_116", Rb = "_workflowMeta_1xq6c_122", Tb = "_workflowGate_1xq6c_127", xb = "_gateNote_1xq6c_135", Lb = "_cardNote_1xq6c_140", Ab = "_reviewerList_1xq6c_145", Eb = "_reviewerRow_1xq6c_151", Ib = "_reviewerMark_1xq6c_157", Mb = "_reviewerName_1xq6c_167", jb = "_terminalCard_1xq6c_173", Bb = "_terminalCount_1xq6c_182", qb = "_workflowAgents_1xq6c_188", Pb = "_mount_1xq6c_194", $ = {
  column: ub,
  head: mb,
  index: hb,
  name: wb,
  meta: _b,
  mono: fb,
  gate: vb,
  reviewersLabel: bb,
  reviewers: gb,
  reviewer: pb,
  agents: yb,
  workflowColumn: Nb,
  workflowHead: kb,
  stageRow: $b,
  stageLabel: Cb,
  workflowTitle: Sb,
  workflowMeta: Rb,
  workflowGate: Tb,
  gateNote: xb,
  cardNote: Lb,
  reviewerList: Ab,
  reviewerRow: Eb,
  reviewerMark: Ib,
  reviewerName: Mb,
  terminalCard: jb,
  terminalCount: Bb,
  workflowAgents: qb,
  mount: Pb
}, Db = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function ln(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Lt(e) {
  return `${Math.round(e * 100)}%`;
}
function Hb({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: $.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: $.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: $.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: $.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(La, { cells: [
      { value: Lt(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function Ob({ stage: e }) {
  return /* @__PURE__ */ n(La, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: ln(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function Fb({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: $.head, children: [
    /* @__PURE__ */ n("span", { className: $.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: $.name, id: a, children: e.name }),
    /* @__PURE__ */ n(h, { role: e.kind === "gate" ? "gate" : "soft", label: Db[e.kind] })
  ] });
}
function Wb({ stage: e }) {
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
function zb({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(Hb, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(Ob, { stage: e }) : null;
}
function Kb({ onMount: e }) {
  return e ? /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Gb({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: $.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Fb, { stage: e, titleId: l }),
    /* @__PURE__ */ n(Wb, { stage: e }),
    /* @__PURE__ */ n(zb, { stage: e }),
    /* @__PURE__ */ n("div", { className: $.agents, children: a.map((c) => /* @__PURE__ */ n(Xw, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(Kb, { onMount: t })
  ] });
}
const Ub = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function Vb({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: $.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: $.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: $.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: $.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function Xb({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: $.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: $.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(Vb, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: $.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: Lt(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Yb(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Jb({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: $.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: $.terminalCount, children: ln(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: $.cardNote, children: Yb(e.rolledBackThisWeek) })
  ] });
}
function Qb(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Zb(e) {
  if (e.kind === "terminal") return `${ln(e.closedThisWeek)} this week`;
  const a = Qb(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function eg({ stage: e, titleId: a }) {
  const t = Ub[e.kind];
  return /* @__PURE__ */ o("header", { className: $.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: $.stageRow, children: [
      /* @__PURE__ */ o("span", { className: $.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(h, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: $.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: $.workflowMeta, children: Zb(e) })
  ] });
}
function ag(e) {
  return e === "entry" || e === "agent";
}
function ng({ stage: e, onMount: a }) {
  return a === void 0 || !ag(e.kind) ? null : /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", className: $.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function tg({ stage: e, agentCards: a, onMount: t }) {
  const r = k();
  return /* @__PURE__ */ o("section", { className: $.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(eg, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(Xb, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(Jb, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: $.workflowAgents, children: a }),
    /* @__PURE__ */ n(ng, { stage: e, onMount: t })
  ] });
}
function rg(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function D0(e) {
  return rg(e) ? /* @__PURE__ */ n(tg, { ...e }) : /* @__PURE__ */ n(Gb, { ...e });
}
const lg = "_row_alabo_6", og = "_name_alabo_12", ig = "_compactRow_alabo_13", cg = "_compactName_alabo_13", sg = "_cell_alabo_30", dg = "_chain_alabo_45", ug = "_owner_alabo_51", mg = "_mono_alabo_57", hg = "_compactCell_alabo_79", wg = "_stack_alabo_96", _g = "_stat_alabo_103", fg = "_identityLine_alabo_110", vg = "_identity_alabo_110", bg = "_ownerLine_alabo_137", gg = "_link_alabo_150", pg = "_gateMark_alabo_156", yg = "_emptyChain_alabo_161", Ng = "_arrow_alabo_167", kg = "_muted_alabo_168", $g = "_define_alabo_173", Cg = "_statValue_alabo_180", Sg = "_policyId_alabo_186", Rg = "_sub_alabo_191", g = {
  row: lg,
  name: og,
  compactRow: ig,
  compactName: cg,
  cell: sg,
  chain: dg,
  owner: ug,
  mono: mg,
  compactCell: hg,
  stack: wg,
  stat: _g,
  identityLine: fg,
  identity: vg,
  ownerLine: bg,
  link: gg,
  gateMark: pg,
  emptyChain: yg,
  arrow: Ng,
  muted: kg,
  define: $g,
  statValue: Cg,
  policyId: Sg,
  sub: Rg
};
function At(e) {
  var s;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i } = e, c = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i };
  (s = e.currentTarget.querySelector("a")) == null || s.dispatchEvent(new MouseEvent("click", c));
}
function Tg(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function xg(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Et(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function Lg(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Et(e.members)}`;
}
function Ag(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(h, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: Lg(e) })
  ] }) });
}
function It({ name: e, gate: a, look: t, size: r }) {
  return /* @__PURE__ */ o(R, { children: [
    a ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(h, { ...t, size: r, label: e }),
    a ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Eg(e, a, t) {
  if (e !== a) return { role: "soft" };
  const r = oa(t);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function Ig({ stages: e, streamStep: a }) {
  const t = e.findIndex((r) => r.gate === !0);
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((r, l) => /* @__PURE__ */ o("span", { className: g.link, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(It, { name: r.name, gate: r.gate === !0, look: Eg(l, t, a), size: "tag" })
  ] }, `${r.name}${l}`)) });
}
function Mg(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : Ig(e) });
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
function jg(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function Bg(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function qg({ stream: e, href: a, presentation: t }) {
  const r = xg(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: At, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ve(e.streamStep, "chip") }, children: [
    Ag(e, a),
    Mg(e),
    In(Bg(e.agents), e.agents === void 0 ? void 0 : Tg(e.agents), "—"),
    jg(e.policy),
    In(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function Pg(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function H0(e) {
  if (Pg(e)) return qg(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: At, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: W(t), children: a.name }),
      /* @__PURE__ */ n(h, { ...xa(a.key, a.streamStep) }),
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
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: a.p50 === void 0 ? "" : se(a.p50) }) })
  ] });
}
const Dg = "_row_2u4ll_2", Hg = "_name_2u4ll_16", Og = "_scope_2u4ll_24", Na = {
  row: Dg,
  name: Hg,
  scope: Og
};
function on(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Fg(e) {
  return e === void 0 ? `${Na.row} ward-toolrow` : `${Na.row} ward-toolrow ${e}`;
}
function Wg(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function zg({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function Kg({ classification: e }) {
  return /* @__PURE__ */ n(h, { role: e === "write" ? "write" : "meta", label: on(e) });
}
function Gg({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${Na.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Ug(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function O0({ tool: e, onChange: a, presentation: t }) {
  const r = k(), l = k(), i = Wg(e, t), c = Ug(t);
  return /* @__PURE__ */ o(c, { className: Fg(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(zg, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${Na.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Gg, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(Kg, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const Vg = "_strip_1ay45_2", Xg = "_head_1ay45_10", Yg = "_name_1ay45_16", Jg = "_chart_1ay45_24", Qg = "_segment_1ay45_30", Zg = "_detailedChart_1ay45_36", ep = "_rail_1ay45_49", ap = "_section_1ay45_55", np = "_label_1ay45_66", tp = "_note_1ay45_83", ee = {
  strip: Vg,
  head: Xg,
  name: Yg,
  chart: Jg,
  segment: Qg,
  detailedChart: Zg,
  rail: ep,
  section: ap,
  label: np,
  note: tp
}, rp = "No item in flight to preview.", lp = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", op = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Ka = [1, 2, 3, 4, 5, 6], ka = 100;
function ip(e, a) {
  return a.has(e) ? ve(e, "id") : "var(--ward-color-line)";
}
function cp({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: ee.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ka.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: ee.segment,
      x: l * ka,
      y: "0",
      width: ka,
      height: "8",
      fill: ip(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function sp(e) {
  const a = e.slice(0, Ka.length);
  for (; a.length < Ka.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function dp({ identities: e }) {
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
  const t = k();
  return /* @__PURE__ */ o("section", { className: ee.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: ee.label, children: e }),
    a
  ] });
}
function up({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: ee.note, children: a ?? rp }) : /* @__PURE__ */ n(Ea, { item: { ...e, streamStep: oa(t.streamStep) }, onOpen: jt(r), feed: null });
}
function mp({ draft: e }) {
  const a = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: ee.head, style: a, children: [
    /* @__PURE__ */ n(je, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
    /* @__PURE__ */ n(h, { ...xa(e.key, e.streamStep) })
  ] });
}
function hp(e) {
  const a = sp(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: ee.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(da, { label: "Board card", children: /* @__PURE__ */ n(up, { ...e, draft: t }) }),
    /* @__PURE__ */ n(da, { label: "Streams index row", children: /* @__PURE__ */ n(mp, { draft: t }) }),
    /* @__PURE__ */ o(da, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(dp, { identities: a }),
      /* @__PURE__ */ n("p", { className: ee.note, children: lp })
    ] }),
    /* @__PURE__ */ n(da, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: ee.note, children: op }) })
  ] });
}
function wp({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: ee.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: ee.head, children: [
      /* @__PURE__ */ n(je, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
      /* @__PURE__ */ n(h, { ...xa(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n(Ea, { item: { ...a, streamStep: e.streamStep }, onOpen: jt(r) }),
    /* @__PURE__ */ n(cp, { draft: e, streams: t })
  ] });
}
function F0(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(hp, { ...e }) : /* @__PURE__ */ n(wp, { ...e });
}
const _p = "_row_ixlg5_6", fp = "_headCell_ixlg5_10", vp = "_cell_ixlg5_11", bp = "_name_ixlg5_23", gp = "_consequence_ixlg5_29", pp = "_governed_ixlg5_36", yp = "_control_ixlg5_42", Np = "_byRole_ixlg5_48", kp = "_webControl_ixlg5_59", $p = "_webConsequence_ixlg5_65", Cp = "_webGoverned_ixlg5_71", H = {
  row: _p,
  headCell: fp,
  cell: vp,
  name: bp,
  consequence: gp,
  governed: pp,
  control: yp,
  byRole: Np,
  webControl: kp,
  webConsequence: $p,
  webGoverned: Cp
};
function Sp({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: H.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: H.control, children: [
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
function Rp({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(Sp, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Tp(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function xp({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${H.webControl} ${H.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    ze,
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
function Lp({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ o("td", { className: H.cell, children: [
      /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${H.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(xp, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webGoverned} ward-cellmeta`, children: Tp(e) }) })
  ] });
}
function W0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Lp, { ...e }) : /* @__PURE__ */ n(Rp, { ...e });
}
const Ap = "_row_vv64h_2", Ep = "_cell_vv64h_6", Ip = "_name_vv64h_25", Mp = "_note_vv64h_30", jp = "_webName_vv64h_41", Bp = "_webMeta_vv64h_47", U = {
  row: Ap,
  cell: Ep,
  name: Ip,
  note: Mp,
  webName: jp,
  webMeta: Bp
}, Bt = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function qp(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Pp({ component: e, onRestart: a }) {
  const t = k(), r = Bt[e.state], l = e.state === "drainFirst";
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
function Dp({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: qp(e.state) });
}
function Hp({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: U.row, children: [
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n("span", { className: `${U.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n("span", { className: `${U.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(h, { ...Bt[e.state] }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(Dp, { component: e, onRestart: a }) })
  ] });
}
function z0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Hp, { ...e }) : /* @__PURE__ */ n(Pp, { ...e });
}
const Op = "_row_jcm5k_7", Fp = "_cell_jcm5k_11", Wp = "_next_jcm5k_28", zp = "_headCell_jcm5k_38", Kp = "_webId_jcm5k_77", Gp = "_webPurpose_jcm5k_83", Up = "_webMeta_jcm5k_91", Vp = "_webUrgent_jcm5k_97", O = {
  row: Op,
  cell: Fp,
  next: Wp,
  headCell: zp,
  webId: Kp,
  webPurpose: Gp,
  webMeta: Up,
  webUrgent: Vp
}, Xp = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, Yp = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, qt = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Jp = Object.fromEntries(qt.map((e) => [e.key, e]));
function Ve({ column: e, children: a }) {
  const t = Jp[e];
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
function K0() {
  return /* @__PURE__ */ n("tr", { children: qt.map((e) => /* @__PURE__ */ n(
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
function Qp({ cred: e }) {
  const a = Xp[e.state];
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ n(Ve, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Ve, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Ve, { column: "state", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ve, { column: "cls", children: /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: on(e.cls) }) }),
    /* @__PURE__ */ n(Ve, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Ve, { column: "next", children: /* @__PURE__ */ n("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Zp({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function ey({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(Zp, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(h, { ...Yp[e.state] }) })
  ] });
}
function G0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ey, { ...e }) : /* @__PURE__ */ n(Qp, { ...e });
}
const ay = "_card_17zba_2", ny = "_head_17zba_11", ty = "_env_17zba_18", ry = "_version_17zba_25", ly = "_meta_17zba_32", oy = "_webCard_17zba_37", iy = "_webRow_17zba_47", cy = "_webTitle_17zba_55", sy = "_webLine_17zba_65", dy = "_webVersion_17zba_72", uy = "_webMeta_17zba_77", G = {
  card: ay,
  head: ny,
  env: ty,
  version: ry,
  meta: ly,
  webCard: oy,
  webRow: iy,
  webTitle: cy,
  webLine: sy,
  webVersion: dy,
  webMeta: uy
}, Mn = { dev: "Dev", uat: "UAT", prod: "Prod" }, Pt = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function my({ env: e }) {
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
function hy(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function wy(e) {
  return /* @__PURE__ */ o("article", { className: `${G.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${G.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${G.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(h, { ...Pt[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${G.version} ${G.webVersion} ${G.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${G.meta} ${G.webMeta} ${G.webLine} ward-cellmeta`, children: hy(e) })
  ] });
}
function U0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(wy, { ...e }) : /* @__PURE__ */ n(my, { ...e });
}
const _y = "_panel_1hmja_2", fy = "_line_1hmja_8", vy = "_actions_1hmja_14", ua = {
  panel: _y,
  line: fy,
  actions: vy
};
function V0(e) {
  return /* @__PURE__ */ o("div", { className: ua.panel, children: [
    /* @__PURE__ */ n("p", { className: ua.line, children: e.status }),
    /* @__PURE__ */ n(I, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ua.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ua.line, children: e.note ?? "" })
  ] });
}
const by = "_upload_13fcl_2", gy = "_preview_13fcl_7", py = "_mark_13fcl_17", yy = "_empty_13fcl_22", Ny = "_actions_13fcl_28", ky = "_input_13fcl_33", $y = "_reasons_13fcl_41", Cy = "_reason_13fcl_41", Sy = "_accepted_13fcl_57", te = {
  upload: by,
  preview: gy,
  mark: py,
  empty: yy,
  actions: Ny,
  input: ky,
  reasons: $y,
  reason: Cy,
  accepted: Sy
}, Dt = 1.5, Ht = 22, $a = "script elements or event handlers", xe = "links or external references", $e = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Dt}px at ${Ht}px`], Ry = [$e[1], $e[2], $a, xe], Ty = /* @__PURE__ */ new Map([
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
]), xy = "http://www.w3.org/2000/svg", Ly = "http://www.w3.org/2000/xmlns/", Ay = /* @__PURE__ */ new Set([
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
]), Ey = /* @__PURE__ */ new Set([
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
]), cn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, Iy = /url\s*\(|['"\\]/i;
function My() {
  return { ok: !1, reasons: [$e[1]] };
}
function Ot(e) {
  return e.namespaceURI === xy;
}
function jy(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && Ot(a) ? a : null;
  } catch {
    return null;
  }
}
function By(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [$e[0]] : [];
}
function qy(e) {
  return Ty.get(e.localName) ?? (e.localName.startsWith("animate") ? xe : void 0);
}
function Py(e) {
  return Iy.test(e.replace(cn, ""));
}
function Dy(e) {
  return /^on/i.test(e.localName) ? $a : e.localName === "href" || Py(e.value) ? xe : void 0;
}
function Hy(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(qy(t));
    for (const r of Array.from(t.attributes)) a.add(Dy(r));
  }
  return Ry.filter((t) => a.has(t));
}
function Oy(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? Ht / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Dt;
  }) ? [$e[3]] : [];
}
function Fy(e) {
  if (e.namespaceURI === Ly) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (Ey.has(a) || a.startsWith("stroke"));
}
function Wy(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && Ot(a) && Ay.has(a.localName);
}
function zy(e, a) {
  Wy(a) ? a.nodeType === Node.ELEMENT_NODE && Ft(a) : e.removeChild(a);
}
function Ft(e) {
  for (const a of Array.from(e.attributes)) Fy(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) zy(e, a);
  return e;
}
function Ky(e) {
  return Array.from(e.matchAll(cn), (a) => a[2]).filter((a) => a !== "");
}
function Gy(e) {
  let a = 2166136261;
  for (let t = 0; t < e.length; t += 1) a = Math.imul(a ^ e.charCodeAt(t), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function Uy(e, a) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of Ky(l.value)) t.has(i) || t.set(i, `${a}-${t.size}`);
  return t;
}
function Vy(e, a) {
  for (const t of Array.from(e.attributes))
    t.value = t.value.replace(cn, (r, l, i) => {
      const c = a.get(i);
      return c === void 0 ? r : r.replace(`#${i}`, `#${c}`);
    });
}
function Xy(e, a) {
  const t = [e, ...Array.from(e.querySelectorAll("*"))], r = Uy(t, a);
  for (const l of t) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), Vy(l, r);
  }
  return e;
}
function X0(e) {
  const a = jy(e);
  if (a === null) return My();
  const t = [...By(a), ...Hy(a), ...Oy(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(Xy(Ft(a), Gy(e))) };
}
const Yy = "Mark accepted.", Jy = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Qy = new Set(zn.flatMap((e) => [ve(e, "id"), ve(e, "chip")]));
function Zy(e) {
  return e !== void 0 && (Jy.test(e) || Qy.has(e)) ? e : void 0;
}
function eN({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: te.preview, style: { "--mark": Zy(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ n("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: te.empty }) });
}
function aN(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function nN(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function tN({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("p", { className: te.accepted, children: Yy }) }) : /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: te.reason, children: a }, a)) }) });
}
function rN({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(tN, { result: e }) : /* @__PURE__ */ n("p", { className: `${te.result} ${aN(e, t)}`, role: "status", children: nN(e, t) });
}
function jn(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function Y0({ current: e, onUpload: a, onUseInitials: t, presentation: r, disabledReason: l }) {
  const i = w(null), [c, s] = p(null), u = (d) => {
    if (d === void 0) return;
    const m = a(d);
    m instanceof Promise ? m.then(s) : s(m);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ n(eN, { current: e }),
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
    /* @__PURE__ */ n(rN, { result: c, presentation: r })
  ] });
}
const lN = "_row_o3t6y_7", oN = "_cell_o3t6y_11", iN = "_head_o3t6y_28", cN = "_name_o3t6y_34", sN = "_pinned_o3t6y_42", dN = "_headCell_o3t6y_49", uN = "_webName_o3t6y_88", mN = "_webMeta_o3t6y_95", hN = "_webWarn_o3t6y_103", B = {
  row: lN,
  cell: oN,
  head: iN,
  name: cN,
  pinned: sN,
  headCell: dN,
  webName: uN,
  webMeta: mN,
  webWarn: hN
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
], wN = Object.fromEntries(Wt.map((e) => [e.key, e]));
function _N(e, a) {
  return `mcp.${e}.${a}`;
}
function fN(e) {
  return Object.keys(sn).includes(e);
}
function vN(e) {
  return sn[e !== void 0 && fN(e) ? e : "unknown"];
}
function ea({ column: e, children: a }) {
  const t = wN[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: B.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function J0() {
  return /* @__PURE__ */ n("tr", { children: Wt.map((e) => /* @__PURE__ */ n(
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
function bN({ server: e }) {
  const a = sn[e.connection];
  return /* @__PURE__ */ o("tr", { className: B.row, children: [
    /* @__PURE__ */ o(ea, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: B.head, children: [
        /* @__PURE__ */ n("span", { className: B.name, children: e.name }),
        /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: on(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: B.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(ea, { column: "connection", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(ea, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(ea, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(ea, { column: "tools", children: e.tools.map((t) => _N(e.name, t)).join(" · ") })
  ] });
}
function gN(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function pN(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function yN({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${B.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${B.webMeta} ward-cellmeta`, children: e });
}
function NN({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${B.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function kN({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(f, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function $N({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: B.row, children: [
    /* @__PURE__ */ o("td", { className: B.cell, children: [
      /* @__PURE__ */ n("span", { className: `${B.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${B.webMeta} ward-cellmeta`, children: gN(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: B.cell, children: /* @__PURE__ */ n("span", { className: `${B.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: B.cell, children: /* @__PURE__ */ n(h, { ...pN(e) }) }),
    /* @__PURE__ */ n("td", { className: B.cell, children: /* @__PURE__ */ n(yN, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: B.cell, children: /* @__PURE__ */ n(h, { ...vN(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: B.cell, children: [
      /* @__PURE__ */ n(NN, { server: e, onRestart: a }),
      /* @__PURE__ */ n(kN, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function Q0(e) {
  return "presentation" in e ? /* @__PURE__ */ n($N, { ...e }) : /* @__PURE__ */ n(bN, { ...e });
}
const CN = "_row_1ibo7_2", SN = "_headCell_1ibo7_14", RN = "_cell_1ibo7_15", TN = "_name_1ibo7_26", xN = "_consequence_1ibo7_32", LN = "_reason_1ibo7_38", AN = "_value_1ibo7_44", EN = "_webRow_1ibo7_60", IN = "_webSetting_1ibo7_73", MN = "_webName_1ibo7_81", jN = "_webConsequence_1ibo7_89", BN = "_webControl_1ibo7_95", qN = "_webState_1ibo7_109", PN = "_webChip_1ibo7_114", E = {
  row: CN,
  headCell: SN,
  cell: RN,
  name: TN,
  consequence: xN,
  reason: LN,
  value: AN,
  webRow: EN,
  webSetting: IN,
  webName: MN,
  webConsequence: jN,
  webControl: BN,
  webState: qN,
  webChip: PN
}, zt = 104, Kt = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function DN({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(ze, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(ot, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: E.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function HN({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = k(), i = Kt[t], c = t === "locked";
  return /* @__PURE__ */ o("tr", { className: E.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: E.headCell, children: [
      /* @__PURE__ */ n("span", { className: E.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: E.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: E.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: E.cell, children: /* @__PURE__ */ n(DN, { control: a, name: e.name, locked: c, describedBy: c ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: E.cell, style: { width: zt }, children: /* @__PURE__ */ n(h, { role: i.role, label: i.label }) })
  ] });
}
function Gt(e, a) {
  return String(e ?? a);
}
function ON(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function FN(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Gt(e.value, "—");
}
function WN({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: E.webControl, children: [
    /* @__PURE__ */ n(ze, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => l == null ? void 0 : l(c) }),
    /* @__PURE__ */ n("span", { className: E.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function zN(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(WN, { ...e });
  const l = ON(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: E.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(ot, { options: l, value: Gt(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${E.webControl} ${E.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: FN(a) });
}
function KN({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const c = k(), s = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${E.row} ${E.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: E.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${E.name} ${E.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: c, className: `${E.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: E.webControl, children: i(c) }) : /* @__PURE__ */ n(zN, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${E.webChip} ward-policy-chip`, style: { width: zt }, children: /* @__PURE__ */ n(h, { ...Kt[t], size: "tag" }) })
  ] });
}
function Z0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(KN, { ...e }) : /* @__PURE__ */ n(HN, { ...e });
}
const GN = "_label_17xa9_7", UN = "_name_17xa9_15", VN = "_column_17xa9_24", XN = "_webFrame_17xa9_57", YN = "_webHead_17xa9_62", JN = "_webHeadLabel_17xa9_74", QN = "_webLabel_17xa9_112", ZN = "_webColumns_17xa9_119", ek = "_webGroup_17xa9_125", ak = "_webPeople_17xa9_126", nk = "_webVia_17xa9_127", tk = "_webMeta_17xa9_156", F = {
  label: GN,
  name: UN,
  column: VN,
  webFrame: XN,
  webHead: YN,
  webHeadLabel: JN,
  webLabel: QN,
  webColumns: ZN,
  webGroup: ek,
  webPeople: ak,
  webVia: nk,
  webMeta: tk
}, rk = {
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
function lk(e) {
  if (!e.matrixRole) return;
  const a = rk[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function ok({ node: e }) {
  const a = lk(e);
  return /* @__PURE__ */ o("span", { className: F.label, children: [
    /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
    /* @__PURE__ */ n(ik, { role: a, node: e }),
    /* @__PURE__ */ n(Da, { column: Pa[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Da, { column: Pa[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Da, { column: Pa[2], children: e.requestedVia ?? "" })
  ] });
}
function ik({ role: e, node: a }) {
  return /* @__PURE__ */ o(R, { children: [
    e && /* @__PURE__ */ n(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ n(h, { role: "warn", label: "Unresolved" })
  ] });
}
function ck({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: c }) {
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
      label: /* @__PURE__ */ n(ok, { node: t }),
      children: c
    }
  );
}
function Ha({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function sk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Ha, { className: `${F.webMeta} ${F.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Ha, { className: `${F.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Ha, { className: `${F.webMeta} ${F.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function dk() {
  return /* @__PURE__ */ o("div", { className: F.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: F.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: F.webColumns, children: [
      /* @__PURE__ */ n("span", { className: F.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: F.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: F.webVia, children: "Requested via" })
    ] })
  ] });
}
function uk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function mk(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function hk({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: F.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(dk, {}),
    /* @__PURE__ */ n(Yd, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      ut,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(uk, { row: t }),
        detail: /* @__PURE__ */ n(sk, { row: t }),
        expanded: mk(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function eS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(hk, { ...e }) : /* @__PURE__ */ n(ck, { ...e });
}
const wk = "_runbook_b9agc_2", _k = "_list_b9agc_7", fk = "_step_b9agc_15", vk = "_numeral_b9agc_21", bk = "_body_b9agc_28", gk = "_head_b9agc_34", pk = "_title_b9agc_40", yk = "_detail_b9agc_45", Nk = "_actions_b9agc_50", kk = "_webList_b9agc_56", $k = "_webStep_b9agc_60", Ck = "_webBody_b9agc_66", Sk = "_webTitle_b9agc_74", Rk = "_webDetail_b9agc_78", x = {
  runbook: wk,
  list: _k,
  step: fk,
  numeral: vk,
  body: bk,
  head: gk,
  title: pk,
  detail: yk,
  actions: Nk,
  webList: kk,
  webStep: $k,
  webBody: Ck,
  webTitle: Sk,
  webDetail: Rk
}, Ut = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Vt(e) {
  return String(e + 1).padStart(2, "0");
}
function Tk({ step: e, index: a, connection: t }) {
  const r = Ut[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: x.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: x.numeral, children: Vt(a) }),
    /* @__PURE__ */ o("span", { className: x.body, children: [
      /* @__PURE__ */ o("span", { className: x.head, children: [
        /* @__PURE__ */ n("span", { className: x.title, children: e.title }),
        /* @__PURE__ */ n(h, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n(Se, { startedAt: e.startedAt, connection: t })
      ] }),
      /* @__PURE__ */ n("span", { className: x.detail, children: e.detail })
    ] })
  ] });
}
function xk({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: x.runbook, children: [
    /* @__PURE__ */ n("ol", { className: x.list, children: e.map((r, l) => /* @__PURE__ */ n(Tk, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: x.actions, children: a })
  ] });
}
function Lk({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${x.step} ${x.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${x.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Vt(a) }),
    /* @__PURE__ */ o("span", { className: `${x.body} ${x.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${x.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${x.title} ${x.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(h, { ...Ut[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Se, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${x.detail} ${x.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function Ak({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: x.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${x.list} ${x.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(Lk, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${x.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function aS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ak, { ...e }) : /* @__PURE__ */ n(xk, { ...e });
}
const Ek = "_list_1gu6a_2", Ik = "_check_1gu6a_10", Mk = "_body_1gu6a_16", jk = "_text_1gu6a_23", Bk = "_pending_1gu6a_32", qk = "_measured_1gu6a_37", Ye = {
  list: Ek,
  check: Ik,
  body: Mk,
  text: jk,
  pending: Bk,
  measured: qk
};
function Pk(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function Dk({ check: e }) {
  const a = Pk(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Ye.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(en, { state: a.state, label: a.label }),
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
function nS({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Ye.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Dk, { check: a }, a.text)) });
}
const Hk = "_root_a6xzy_2", Ok = "_list_a6xzy_10", Fk = "_line_a6xzy_21", Wk = "_at_a6xzy_48", zk = "_text_a6xzy_52", Kk = "_foot_a6xzy_56", Gk = "_idle_a6xzy_68", Uk = "_caret_a6xzy_76", Vk = "_jump_a6xzy_83", he = {
  root: Hk,
  list: Ok,
  line: Fk,
  at: Wk,
  text: zk,
  foot: Kk,
  idle: Gk,
  caret: Uk,
  jump: Vk
}, Xk = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function dn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : Xk.format(new Date(e));
}
const Yk = { warn: "warning", ok: "ok" };
function Jk({ kind: e }) {
  const a = Yk[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Qk({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${dn(e)}` });
}
function Zk({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${dn(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: he.idle, children: i }),
    /* @__PURE__ */ n(Qk, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const e1 = 8;
function a1(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > e1;
}
function n1({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const Xt = Me(null);
function tS({ announce: e, onAnnounceChange: a, children: t }) {
  const [r, l] = p(!1), i = Hn(() => ({
    announce: e ?? r,
    setAnnounce: (c) => {
      l(c), a == null || a(c);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ n(Xt.Provider, { value: i, children: t });
}
function t1() {
  const e = Ie(Xt), [a, t] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, t];
}
function rS({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = w(null), [i, c] = p(0), [s, u] = t1(), [d, m] = p(!1), v = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), Va(() => {
    const y = l.current;
    y && !d && (y.scrollTop = y.scrollHeight);
  }, [e.length, d]);
  const b = () => {
    var j;
    const y = l.current;
    if (!y) return;
    const A = y.querySelectorAll("[data-consline-text]");
    (j = A.item(A.length - 1)) == null || j.focus(), m(!1);
  };
  return /* @__PURE__ */ o("div", { className: he.root, children: [
    /* @__PURE__ */ n("ol", { className: he.list, ref: l, "aria-live": s ? "polite" : "off", "aria-label": r, onScroll: (y) => m(a1(y.currentTarget)), children: e.map((y, A) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": A < i, children: [
      /* @__PURE__ */ n("span", { className: he.at, children: dn(y.at) }),
      /* @__PURE__ */ n(Jk, { kind: y.kind }),
      /* @__PURE__ */ n("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${A}`)) }),
    /* @__PURE__ */ o(Zk, { connection: a, idleSince: t, last: v, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": s, onClick: () => u(!s), children: "Read new events" }),
      /* @__PURE__ */ n(n1, { shown: d, onJump: b })
    ] })
  ] });
}
const r1 = "_row_1k8wl_2", l1 = "_head_1k8wl_14", o1 = "_author_1k8wl_20", i1 = "_eta_1k8wl_25", c1 = "_edited_1k8wl_26", s1 = "_body_1k8wl_32", d1 = "_reason_1k8wl_37", u1 = "_actions_1k8wl_42", pe = {
  row: r1,
  head: l1,
  author: o1,
  eta: i1,
  edited: c1,
  body: s1,
  reason: d1,
  actions: u1
}, m1 = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function h1(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function w1({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function _1({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: pe.reason, id: a, children: e })
  ] });
}
function f1(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function v1(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(w1, { ...e }) : /* @__PURE__ */ n(_1, { reason: e.unavailable, reasonId: e.unavailableId });
}
function lS(e) {
  const { comment: a } = e;
  f1(e);
  const t = k(), r = `${t}-unavailable`, l = m1[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${pe.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: pe.head, children: [
      /* @__PURE__ */ n("span", { className: pe.author, children: a.author }),
      /* @__PURE__ */ n(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: pe.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: pe.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: pe.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: pe.reason, id: t, children: h1(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: pe.actions, children: /* @__PURE__ */ n(v1, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const b1 = "_root_c46wj_2", g1 = "_attach_c46wj_11", p1 = "_actions_c46wj_17", y1 = "_reply_c46wj_23", N1 = "_replyRow_c46wj_28", k1 = "_sendsAs_c46wj_42", Ze = {
  root: b1,
  attach: g1,
  actions: p1,
  reply: y1,
  replyRow: N1,
  sendsAs: k1
};
function Yt({ value: e, onChange: a }) {
  const [t, r] = p("");
  return e === void 0 ? [t, r] : [e, a ?? (() => {
  })];
}
function $1(e) {
  const { placeholder: a, asUser: t, onPost: r } = e, [l, i] = Yt(e), c = k();
  return /* @__PURE__ */ o("div", { className: Ze.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ze.replyRow, children: [
      /* @__PURE__ */ n(I, { variant: "reply", labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: c }),
      /* @__PURE__ */ n(f, { variant: "ghost", describedBy: c, onClick: () => r(t, l), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: c, className: Ze.sendsAs, children: `Sends as ${t}.` })
  ] });
}
function oS(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n($1, { ...e }) : /* @__PURE__ */ n(C1, { ...e });
}
function C1(e) {
  const { placeholder: a, asUser: t, attachTo: r, requeueAfter: l, onPost: i, onDraft: c } = e, [s, u] = Yt(e);
  return /* @__PURE__ */ o("div", { className: Ze.root, children: [
    /* @__PURE__ */ n(I, { kind: "textarea", label: a, value: s, onChange: u }),
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
      /* @__PURE__ */ n(f, { variant: "primary", onClick: () => i(t, s), children: `Post as ${t}` }),
      c && /* @__PURE__ */ n(f, { variant: "ghost", onClick: () => c(s), children: "Save draft" })
    ] })
  ] });
}
const S1 = "_list_1yhks_2", R1 = "_item_1yhks_6", T1 = "_body_1yhks_22", x1 = "_text_1yhks_28", L1 = "_evidence_1yhks_37", A1 = "_consequence_1yhks_49", E1 = "_note_1yhks_54", Fe = {
  list: S1,
  item: R1,
  body: T1,
  text: x1,
  evidence: L1,
  consequence: A1,
  note: E1
};
function I1({ criterion: e }) {
  return /* @__PURE__ */ n(je, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Bn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function M1(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function j1({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Fe.body, children: [
    /* @__PURE__ */ n("span", { className: Fe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ n(Bn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Fe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ n(Bn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Fe.consequence, children: M1(e.why) })
    ] })
  ] });
}
function B1({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Fe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(I1, { criterion: e }),
    /* @__PURE__ */ n(j1, { criterion: e })
  ] });
}
function iS({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Fe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(B1, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Fe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const q1 = "_list_dwhoz_2", P1 = "_rung_dwhoz_6", D1 = "_name_dwhoz_18", H1 = "_actor_dwhoz_32", wa = {
  list: q1,
  rung: P1,
  name: D1,
  actor: H1
}, O1 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function F1({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = O1[e.state];
  return /* @__PURE__ */ o("li", { className: wa.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: wa.name, children: e.name }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${wa.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function cS({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${wa.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(F1, { rung: a }, a.name)) });
}
const W1 = "_sheet_pw37w_2", z1 = "_title_pw37w_9", K1 = "_stage_pw37w_15", G1 = "_effects_pw37w_20", U1 = "_effect_pw37w_20", V1 = "_numeral_pw37w_31", X1 = "_effectText_pw37w_38", Y1 = "_refusals_pw37w_43", J1 = "_reasons_pw37w_52", Q1 = "_reason_pw37w_52", Z1 = "_actions_pw37w_62", ue = {
  sheet: W1,
  title: z1,
  stage: K1,
  effects: G1,
  effect: U1,
  numeral: V1,
  effectText: X1,
  refusals: Y1,
  reasons: J1,
  reason: Q1,
  actions: Z1
};
function e$({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(f, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function sS({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: c }) {
  const s = k(), u = `${s}-refusal`, [d, m] = p(""), v = t.length > 0;
  return /* @__PURE__ */ n(ia, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: s, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: ue.effects, children: a.map((b, y) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ n("span", { className: ue.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: ue.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      Ms,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(I, { kind: "textarea", label: "Note for the agent", value: d, onChange: m }),
    v && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ n(h, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: ue.reasons, children: t.map((b, y) => /* @__PURE__ */ n("li", { className: ue.reason, id: y === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ n(e$, { refused: v, reasonId: u, note: d, onRequeue: l }),
      /* @__PURE__ */ n(f, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const a$ = "_list_1rowi_2", n$ = "_path_1rowi_7", t$ = "_head_1rowi_21", r$ = "_label_1rowi_28", l$ = "_consequence_1rowi_35", o$ = "_ask_1rowi_36", Qe = {
  list: a$,
  path: n$,
  head: t$,
  label: r$,
  consequence: l$,
  ask: o$
}, Ga = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function qn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Pn(e) {
  return e ? "primary" : "secondary";
}
function i$({ path: e, primary: a, onChoose: t }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ n(f, { variant: Pn(a), size: "sm", onClick: () => t(e.kind), children: Ga[e.kind] }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(f, { variant: Pn(a), size: "sm", disabled: !0, describedBy: r, children: Ga[e.kind] }),
    /* @__PURE__ */ n("span", { className: Qe.ask, id: r, children: e.askInstead })
  ] });
}
function c$({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Qe.path, "data-allowed": e.allowed, "data-role": qn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Qe.head, children: [
      /* @__PURE__ */ n("span", { className: Qe.label, children: e.title ?? Ga[e.kind] }),
      /* @__PURE__ */ n(h, { role: qn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Qe.consequence, children: e.consequence }),
    /* @__PURE__ */ n(i$, { path: e, primary: a, onChoose: t })
  ] });
}
function dS({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Qe.list, children: e.map((t, r) => /* @__PURE__ */ n(c$, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const s$ = "_list_1m7i0_2", d$ = "_item_1m7i0_6", u$ = "_node_1m7i0_18", m$ = "_body_1m7i0_24", h$ = "_head_1m7i0_30", w$ = "_stage_1m7i0_36", _$ = "_version_1m7i0_41", f$ = "_sentence_1m7i0_49", v$ = "_meta_1m7i0_54", Ne = {
  list: s$,
  item: d$,
  node: u$,
  body: m$,
  head: h$,
  stage: w$,
  version: _$,
  sentence: f$,
  meta: v$
}, b$ = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function g$({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ne.head, children: [
    /* @__PURE__ */ n("span", { className: Ne.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Ne.version, title: e.version, children: e.version }) : null
  ] });
}
function p$({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ne.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Ne.node} ward-history-node`, children: /* @__PURE__ */ n(je, { size: 9, kind: b$[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ne.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(g$, { entry: e }),
      /* @__PURE__ */ n("span", { className: Ne.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ne.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function uS({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Ne.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(p$, { entry: a }, a.stage + String(t))) });
}
const y$ = "_thread_1e70p_3", N$ = "_turn_1e70p_8", k$ = "_who_1e70p_27", $$ = "_body_1e70p_32", _a = {
  thread: y$,
  turn: N$,
  who: k$,
  body: $$
}, Jt = Me(!1);
function mS({ children: e, density: a }) {
  return /* @__PURE__ */ n(Jt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${_a.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function hS({ turn: e }) {
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
const C$ = "_list_yiolt_3", S$ = "_row_yiolt_7", R$ = "_label_yiolt_20", T$ = "_n_yiolt_26", x$ = "_cause_yiolt_33", na = {
  list: C$,
  row: S$,
  label: R$,
  n: T$,
  cause: x$
};
function L$(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const A$ = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function E$({ row: e, formatNumber: a }) {
  return L$(e), /* @__PURE__ */ o("li", { className: `${na.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(je, { size: 8, ...A$[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: na.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${na.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(I$, { cause: e.cause })
  ] });
}
function I$({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${na.cause} ward-healthrow-cause`, children: e }) : null;
}
function wS({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${na.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(E$, { row: t, formatNumber: a }, t.label)) });
}
const M$ = "_root_1jxwp_2", j$ = {
  root: M$
};
function _S({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: j$.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ia, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(f, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const B$ = "_row_dhbre_3", q$ = "_key_dhbre_13", P$ = "_stack_dhbre_24", D$ = "_value_dhbre_32", H$ = "_evidence_dhbre_39", O$ = "_mark_dhbre_47", Xe = {
  row: B$,
  key: q$,
  stack: P$,
  value: D$,
  evidence: H$,
  mark: O$
};
function F$({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(en, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function fS({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(F$, { state: e.state }) })
  ] });
}
const W$ = "_cell_gh2sd_2", z$ = {
  cell: W$
}, K$ = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function G$(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function U$(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function V$(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: G$(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function X$(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function vS({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  U$(e, t);
  const r = X$(e);
  return /* @__PURE__ */ n(
    Vs,
    {
      label: "Rejection routing",
      columns: K$,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: z$.cell, "data-norerun": l.noRerun ? !0 : void 0, children: V$(l, i) }),
      empty: a ?? /* @__PURE__ */ n(ju, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const Y$ = "_row_1f2re_2", J$ = "_title_1f2re_12", Q$ = "_turns_1f2re_18", Z$ = "_waiting_1f2re_19", eC = "_resolved_1f2re_20", aC = "_activity_1f2re_21", nC = "_cost_1f2re_28", tC = "_link_1f2re_29", rC = "_tableLink_1f2re_47", lC = "_tableRecord_1f2re_48", oC = "_tableRow_1f2re_59", iC = "_tableTitle_1f2re_71", cC = "_tableResolved_1f2re_76", sC = "_tableMeta_1f2re_87", dC = "_tableCost_1f2re_94", uC = "_tableActivity_1f2re_95", mC = "_tableState_1f2re_105", D = {
  row: Y$,
  title: J$,
  turns: Q$,
  waiting: Z$,
  resolved: eC,
  activity: aC,
  cost: nC,
  link: tC,
  tableLink: rC,
  tableRecord: lC,
  tableRow: oC,
  tableTitle: iC,
  tableResolved: cC,
  tableMeta: sC,
  tableCost: dC,
  tableActivity: uC,
  tableState: mC
}, Qt = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function hC(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function wC(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function _C(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const fC = { duplicate: "Closed · duplicate" };
function vC({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(Ee, { className: D.tableMeta, text: `waiting on ${e}` });
}
function bC({ value: e }) {
  return /* @__PURE__ */ n("td", { className: D.tableCost, children: e === void 0 ? null : re(e) });
}
function gC({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${D.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function pC({ session: e, href: a }) {
  const t = Qt[e.state];
  return /* @__PURE__ */ o("tr", { className: D.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: D.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${D.tableLink} ward-target`, href: W(a), children: /* @__PURE__ */ n(Ee, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: D.tableMeta, children: wC(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: D.tableResolved, children: [
      _C(e.resolved),
      /* @__PURE__ */ n(vC, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(bC, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: D.tableActivity, children: hC(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: D.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(h, { role: t.role, label: fC[e.state] ?? t.label }),
      /* @__PURE__ */ n(gC, { link: e.link })
    ] }) })
  ] });
}
function yC({ session: e }) {
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
function bS(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(pC, { session: e.session, href: e.href }) : /* @__PURE__ */ n(yC, { session: e.session });
}
const NC = "_block_1yy2v_3", kC = "_list_1yy2v_9", $C = "_line_1yy2v_14", Ua = {
  block: NC,
  list: kC,
  line: $C
}, CC = { warn: "warning", ok: "ok" };
function SC({ kind: e }) {
  const a = CC[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function RC({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Ua.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(SC, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function gS({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Ua.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Ua.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(RC, { line: t }, `${r}-${t.text}`)) }) });
}
const TC = "_band_tt7hp_1", xC = "_head_tt7hp_8", LC = "_cell_tt7hp_19", AC = "_index_tt7hp_35", EC = "_title_tt7hp_42", IC = "_note_tt7hp_48", MC = "_cellTitle_tt7hp_53", jC = "_cellBody_tt7hp_58", BC = "_tag_tt7hp_64", ge = {
  band: TC,
  head: xC,
  cell: LC,
  index: AC,
  title: EC,
  note: IC,
  cellTitle: MC,
  cellBody: jC,
  tag: BC
}, Dn = 4;
function pS({ index: e, title: a, note: t, cells: r }) {
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
  o0 as ActionStack,
  rS as ActivityConsole,
  Xw as AgentCard,
  XC as AppShell,
  F0 as AppearanceStrip,
  pS as Band,
  t0 as BarChart,
  fm as BoardColumn,
  y0 as BoardFootnote,
  N0 as BoardHeader,
  h0 as BoardScroller,
  f as Btn,
  KC as CHIP_ROLES,
  qt as CREDENTIAL_COLUMNS,
  n0 as Callout,
  W0 as CapabilityRow,
  hS as ChatMessage,
  Un as Checkbox,
  h as Chip,
  Ee as ClampText,
  lS as ClarificationRow,
  E0 as ClauseRuleRow,
  A0 as ClauseRules,
  vt as ColourLadder,
  z0 as ComponentRow,
  oS as Composer,
  $0 as ConfigRow,
  k0 as ConfigRowHead,
  an as ConnectionMark,
  tS as ConsoleAnnounceProvider,
  mS as Conversation,
  Ms as CostMeter,
  G0 as CredentialRow,
  K0 as CredentialRowHead,
  iS as CriteriaList,
  Vl as Crumb,
  wS as DeliveryHealth,
  f0 as DeniedState,
  M0 as DryRunRail,
  ju as EmptyState,
  U0 as EnvCard,
  I as Field,
  _0 as FilteredEmpty,
  u0 as FormStack,
  Ia as GateChecklist,
  cS as GateLadder,
  Vs as Grid,
  B0 as HandoffRuleRow,
  j0 as HandoffRules,
  C0 as ItemDrawer,
  V0 as KeyPanel,
  _r as LIVE_EVENT_TYPES,
  vw as LegacyBoardColumn,
  R0 as LegacyBoardHeader,
  T0 as LegacyConfigRow,
  L0 as LegacyItemDrawer,
  dw as LegacyOverCapNote,
  x0 as LegacyPreviewRail,
  wt as LegacyWorkCard,
  Se as LiveIndicator,
  v0 as LoadFailed,
  p0 as Loading,
  Wt as MCP_SERVER_COLUMNS,
  en as Mark,
  Y0 as MarkUpload,
  je as Marker,
  Q0 as McpServerRow,
  J0 as McpServerRowHead,
  JC as Menu,
  YC as MenuButton,
  q0 as NewStreamModal,
  Pu as OverCapNote,
  ia as Overlay,
  I0 as PARTIAL_STEP_REASON,
  zt as POLICY_CHIP_WIDTH,
  c0 as PageFrame,
  a0 as PageHeader,
  r0 as PlainList,
  Z0 as PolicyRow,
  S0 as PreviewRail,
  Pa as ROLE_MATRIX_COLUMNS,
  xt as RULE_ACTIONS,
  ct as Radio,
  _S as ReadyChecklist,
  d0 as RecordSection,
  sS as RequeueSheet,
  dS as ResolveBlock,
  fS as ResolvedFieldRow,
  eS as RoleMatrixRow,
  vS as RoutingTable,
  P0 as RuleRow,
  aS as RunbookSteps,
  wr as STREAM_STEPS,
  m0 as SectionBand,
  kn as SectionHeader,
  ot as SegmentedControl,
  et as Select,
  bS as SessionRow,
  e0 as Sidebar,
  D0 as StageColumn,
  w0 as StageGrid,
  uS as StageHistory,
  Av as StageListEditor,
  b0 as StaleStrip,
  La as StatStrip,
  H0 as StreamRow,
  s0 as SubjectRail,
  ze as Switch,
  ZC as TabLinks,
  l0 as TableHead,
  QC as Tabs,
  O0 as ToolRow,
  i0 as TopBar,
  Yd as Tree,
  ut as TreeRow,
  gS as TypedInputBlock,
  ul as UNSAFE_HREF,
  nS as ValidationList,
  HC as VisibilityProvider,
  OC as Visible,
  zC as WARD_VERSION,
  Ea as WorkCard,
  g0 as WriteUnavailableStrip,
  hC as agoSince,
  or as clock,
  Vv as colourStatus,
  ae as count,
  se as duration,
  Xa as elapsed,
  WC as eventSourceTransport,
  Sa as isStreamStep,
  Ra as isValidatedStreamStep,
  C_ as ladderValidation,
  vN as mcpConnectionChip,
  _N as mcpToolName,
  re as money,
  we as ms,
  mt as ordered,
  Fn as ratio,
  qp as restartLabel,
  W as safeHref,
  de as stamp,
  Kn as stream,
  UC as streamChip,
  xa as streamChipProps,
  ve as streamColour,
  vr as streamHex,
  GC as streamVars,
  ma as useBorderFlash,
  ur as useFocusTrap,
  VC as useLiveFeed,
  FC as useReturnFocus,
  Ca as useRovingTabindex,
  Ya as useTicker,
  ir as useVisible,
  z as v,
  X0 as validateMark,
  oa as validatedStep,
  zn as validatedStreamSteps
};
