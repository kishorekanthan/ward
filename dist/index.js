import { jsx as n, Fragment as R, jsxs as o } from "react/jsx-runtime";
import { useMemo as Hn, useContext as Ie, createContext as Me, useCallback as J, useEffect as S, useState as p, useRef as w, useLayoutEffect as Ua, useId as k, isValidElement as er, Children as ar, Fragment as nr } from "react";
import { flushSync as On, createPortal as tr } from "react-dom";
function ce(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const dn = (e) => String(e).padStart(2, "0");
function Va(e) {
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
function DC({ hidden: e, children: a }) {
  const t = Hn(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Wn.Provider, { value: t, children: a });
}
function ir(e) {
  return !Ie(Wn).has(e);
}
function HC({ id: e, children: a, fallback: t = null }) {
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
function OC(e, a = !0) {
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
  Ua(() => {
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
const FC = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, WC = "0.2.0", zC = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], wr = [1, 2, 3, 4, 5, 6], zn = [1, 2, 3], _r = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], z = {
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
function KC(e) {
  if (!Sa(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function GC(e) {
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
function UC(e, a) {
  const [t, r] = p("reconnecting"), [l, i] = p(null), s = w(/* @__PURE__ */ new Map()), c = w(0), u = w(""), d = w(0), m = w(null), v = w(0), b = w(0), y = w(!1), A = w("reconnecting"), q = J((C) => {
    A.current = C, r(C);
  }, []), oe = J(() => {
    c.current = Date.now();
  }, []), Re = J((C) => {
    for (const [K, be] of s.current)
      (be === "*" || C.itemKey === be) && K(C);
  }, []), ne = J(() => {
    m.current = a(e, { lastEventId: u.current }, {
      onEvent: (C, K, be) => {
        const Be = yr(C, K, be);
        Be !== null && (Be.id && (u.current = Be.id), oe(), y.current = !1, q("live"), i(Be.at), Re(Be));
      },
      onOpen: () => {
        d.current = 0, y.current = !1, oe(), q("live");
      },
      onError: () => {
        var K;
        (K = m.current) == null || K.close(), m.current = null, y.current = !0, A.current !== "stale" && q("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** d.current, we.reconnectMax);
        d.current += 1, v.current = window.setTimeout(ne, C);
      }
    });
  }, [Re, q, oe, a, e]), Ke = J((C) => {
    y.current = !0, C.close(), m.current = null, v.current = window.setTimeout(ne, we.reconnectBase);
  }, [ne]), Ge = J((C, K) => (s.current.set(K, C), () => {
    s.current.delete(K);
  }), []);
  return S(() => (ne(), b.current = window.setInterval(() => {
    const C = Date.now() - c.current, K = Nr(C, A.current);
    K && q(K);
    const be = m.current;
    kr(C, y.current, be) && Ke(be);
  }, we.tick), () => {
    var C;
    window.clearInterval(b.current), window.clearTimeout(v.current), y.current = !1, (C = m.current) == null || C.close(), m.current = null;
  }), [ne, Ke, q]), { connection: t, lastEventAt: l, subscribe: Ge };
}
function Xa(e, a) {
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
  const i = [Va(a)];
  return e || i.push(`as of ${or(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Se({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = Xa(e, l), s = (a == null ? void 0 : a.at) ?? e, c = Rr(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${Sr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const Tr = "_app_13ufi_1", xr = "_side_13ufi_18", Lr = "_main_13ufi_26", Ar = "_rail_13ufi_33", Er = "_page_13ufi_40", Ir = "_root_13ufi_91", Mr = "_topbar_13ufi_98", qr = "_mark_13ufi_109", Br = "_brand_13ufi_116", jr = "_tagline_13ufi_122", Pr = "_identity_13ufi_128", Dr = "_tools_13ufi_129", Hr = "_nav_13ufi_139", Or = "_metadata_13ufi_146", Fr = "_actor_13ufi_161", Wr = "_detail_13ufi_162", zr = "_content_13ufi_222", Kr = "_toolsPanel_13ufi_238", Gr = "_skip_13ufi_264", M = {
  app: Tr,
  side: xr,
  main: Lr,
  rail: Ar,
  page: Er,
  root: Ir,
  topbar: Mr,
  mark: qr,
  brand: Br,
  tagline: jr,
  identity: Pr,
  tools: Dr,
  nav: Hr,
  metadata: Or,
  actor: Fr,
  detail: Wr,
  content: zr,
  toolsPanel: Kr,
  skip: Gr
}, Ur = "_btn_tzr89_2", Vr = "_primary_tzr89_14", Xr = "_destructive_tzr89_25", Yr = "_secondary_tzr89_35", Jr = "_ghost_tzr89_40", Qr = "_overflow_tzr89_49", Zr = "_sm_tzr89_56", el = "_disabled_tzr89_60", sa = {
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
  const l = a === "sm" ? [sa.sm, "ward-btn--sm"] : [], i = t ? [sa.disabled] : [];
  return [sa.btn, sa[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
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
function sl(e) {
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
        children: sl(e)
      }
    ),
    /* @__PURE__ */ n(il, { id: i, reason: l })
  ] });
}
const cl = /^([a-z][a-z0-9+.-]*):/i, dl = /* @__PURE__ */ new Set(["http", "https"]), ul = "#";
function ml(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = cl.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
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
function wl(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function Ya(e, a, t) {
  Ua(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(t)[a];
    if (!r || !l) return;
    const i = wl(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), Gn(r);
  }, [e, a, t]);
}
function Ja(e) {
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
  return la(t, e.length), Ya(t, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ n("nav", { ref: t, className: M.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ n("a", { href: W(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Ha({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function vl({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ n(Ha, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Ha, { value: a, className: M.detail })
  ] });
}
function bl() {
  const e = Ja("(max-width: 767.98px)"), a = k(), t = w(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = t.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
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
    /* @__PURE__ */ n(Ha, { value: e.tagline, className: M.tagline }),
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
function VC(e) {
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
const ql = "_chip_pq6tb_2", Bl = {
  chip: ql
}, jl = {
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
  const t = jl[e];
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
const Hl = "_clamp_zn74g_3", fn = {
  clamp: Hl
};
function Ee({ text: e, as: a = "span", className: t }) {
  return /* @__PURE__ */ n(a, { className: t === void 0 ? fn.clamp : `${fn.clamp} ${t}`, "data-ward-clamp": "", title: e, children: e });
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
const Ol = "_nav_8lufj_2", Fl = "_list_8lufj_8", Wl = "_item_8lufj_15", zl = "_link_8lufj_30", Kl = "_sep_8lufj_40", Gl = "_current_8lufj_44", Ul = "_chips_8lufj_48", je = {
  nav: Ol,
  list: Fl,
  item: Wl,
  link: zl,
  sep: Kl,
  current: Gl,
  chips: Ul
};
function Vl({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: je.nav, children: [
    /* @__PURE__ */ n("ol", { className: je.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: je.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: je.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${je.link} ward-target`, href: W(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: je.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${je.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
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
function vn(e, a) {
  return Math.max(0, e.findIndex((t) => t.value === a));
}
function io(e, a) {
  const [t, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => vn(e.options, e.value)), u = (d) => {
    var m;
    On(() => r(!1)), d && ((m = a.current) == null || m.focus());
  };
  return {
    open: t,
    query: l,
    active: s,
    entries: oo(e.options, l),
    findable: e.options.length > lo,
    show: () => {
      e.disabled || (i(""), c(vn(e.options, e.value)), r(!0));
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
function so(e, a) {
  const t = w(!1);
  return S(() => {
    var r;
    e && t.current && ((r = a.current) == null || r.focus()), t.current = !1;
  }), () => {
    t.current = !0;
  };
}
function co(e) {
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
function Qa(e, a) {
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
function fo({ props: e, menu: a, ids: t, focusRef: r }) {
  const l = co(a), i = (s) => {
    Xn(s) && l(s.key);
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
        "aria-activedescendant": a.findable ? void 0 : Qa(a, t),
        onKeyDown: Qn(a, uo(a), i),
        children: a.entries.map((s, c) => /* @__PURE__ */ n(wo, { entry: s, at: c, menu: a, ids: t, value: e.value }, s.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ n("p", { className: _e.empty, children: "No match" })
  ] });
}
function vo(e, a) {
  const t = e.open ? Qa(e, a) : void 0;
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
      "aria-describedby": Ta(e["aria-describedby"], t.value),
      "aria-invalid": e["aria-invalid"],
      disabled: e.disabled,
      ...ho(a, l),
      children: /* @__PURE__ */ n("span", { id: t.value, className: _e.value, "data-placeholder": i || void 0, children: bo(e) })
    }
  );
}
function et(e) {
  const a = k(), t = { list: `${a}-list`, value: `${a}-value`, option: (u) => `${a}-option-${u}` }, r = w(null), l = w(null), i = w(null), s = io(e, l), c = so(s.open, i);
  return Vn(s.open, r, () => s.close(!1)), vo(s, t), /* @__PURE__ */ o("div", { ref: r, className: Zn(_e.root, e.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(go, { props: e, menu: s, ids: t, trigger: l, wantFocus: c }),
    e.name && /* @__PURE__ */ n("input", { type: "hidden", name: e.name, value: e.value }),
    s.open && /* @__PURE__ */ n(fo, { props: e, menu: s, ids: t, focusRef: i })
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
function qo(e) {
  return e ? `${Ae.label} ${Ae.labelHidden} ward-field-label` : `${Ae.label} ward-field-label`;
}
function I(e) {
  const a = k(), t = `${a}-msg`, r = Io(e, a, t), l = Mo(e);
  return /* @__PURE__ */ o("div", { className: `${Ae.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: at(a), className: qo(e.labelHidden), htmlFor: a, children: e.label }),
    Eo(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Ae.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Bo = "_root_u4xjq_2", jo = "_trigger_u4xjq_9", Po = "_panel_u4xjq_33", Do = "_menu_u4xjq_56", Ho = "_group_u4xjq_61", Oo = "_heading_u4xjq_66", Fo = "_item_u4xjq_72", Wo = "_separator_u4xjq_98", zo = "_footer_u4xjq_104", Ce = {
  root: Bo,
  trigger: jo,
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
      On(() => r((s) => ({ ...s, open: !1 }))), l && ((i = a.current) == null || i.focus());
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
function XC(e) {
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
  const r = Jo(t), l = r ? t[0] : t, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const u = tt(i + c, e.length);
    if (s(e[u])) return u;
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
  const t = w(!1), r = Yn(), l = ei(e, a), i = (s) => {
    Xn(s) && e.focus(Qo(e.items, e.current(), r(s.key)));
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
function ni(e, a) {
  const { start: t, request: r } = a, l = w(e);
  l.current = e, S(() => {
    const { items: i, focus: s } = l.current;
    t && s(t === "first" ? Je(i, -1, 1) : Je(i, i.length, -1));
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
function YC({ entries: e, footer: a, align: t = "start" }) {
  const { popup: r, menuId: l, buttonId: i } = oi(), s = Xo(e), c = Zo(s.flatMap(Yo).map((d) => d.item)), u = ai(c, r);
  return ni(c, r), /* @__PURE__ */ o("div", { className: Ce.panel, "data-align": t, children: [
    /* @__PURE__ */ n("div", { role: "menu", id: l, "aria-labelledby": i, className: Ce.menu, ...u, children: s.map((d, m) => /* @__PURE__ */ n(li, { block: d, nav: c, popup: r }, m)) }),
    a && /* @__PURE__ */ n("p", { className: Ce.footer, children: a })
  ] });
}
const ii = "_strip_1nfwi_2", si = "_tab_1nfwi_32", ci = "_count_1nfwi_68", ta = {
  strip: ii,
  tab: si,
  count: ci
}, fa = 7;
function di(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function lt(e) {
  return `${ta.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function JC({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > fa) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${fa} — the set is fixed`);
  const i = Ca({ orientation: "horizontal" }), s = di(e, a);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = w(null);
  return la(c, e.length), Ya(c, s, '[role="tab"]'), /* @__PURE__ */ n(
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
function QC({ links: e, active: a, label: t, level: r = 1 }) {
  if (e.length > fa) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${fa} — the set is fixed`);
  const l = w(null);
  return la(l, e.length), Ya(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ n("nav", { ref: l, className: lt(r), "aria-label": t, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ta.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(R, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: ta.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const ui = "_root_v56ff_3", mi = "_segment_v56ff_9", bn = {
  root: ui,
  segment: mi
};
function ot({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Ca({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((u) => u.value === a));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${bn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: bn.segment,
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
const hi = "_sidebar_18gpx_3", wi = "_brand_18gpx_9", _i = "_mark_18gpx_17", fi = "_word_18gpx_24", vi = "_nav_18gpx_30", bi = "_navItem_18gpx_39", gi = "_footLink_18gpx_49", pi = "_group_18gpx_58", yi = "_groupName_18gpx_65", Ni = "_agents_18gpx_81", ki = "_agent_18gpx_81", $i = "_root_18gpx_96", Ci = "_agentTop_18gpx_105", Si = "_dot_18gpx_112", Ri = "_agentName_18gpx_124", Ti = "_agentMeta_18gpx_137", xi = "_foot_18gpx_49", Li = "_footName_18gpx_149", Ai = "_footLinks_18gpx_156", Ei = "_linkBrand_18gpx_183", Ii = "_label_18gpx_204", Mi = "_note_18gpx_209", qi = "_footer_18gpx_218", T = {
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
  footer: qi
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
function ji({ shared: e }) {
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
    /* @__PURE__ */ n("div", { className: T.nav, children: a.map((s) => /* @__PURE__ */ n("a", { className: T.navItem, href: W(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: T.group, children: [
      /* @__PURE__ */ o("span", { className: T.groupName, children: [
        t,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: T.new, href: W(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: T.agents, children: r.map((s) => /* @__PURE__ */ n(Bi, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(ji, { shared: i })
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
function ZC(e) {
  return zi(e) ? /* @__PURE__ */ n(Pi, { ...e }) : /* @__PURE__ */ n(Wi, { ...e });
}
const Ki = "_mark_wlgi8_3", Gi = {
  mark: Ki
}, Ui = { met: "✓", unmet: "", failed: "✕" };
function Za({ state: e, label: a }) {
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
function qe({ size: e, kind: a, label: t }) {
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
const Qi = "_root_ti0pq_2", Zi = "_chip_ti0pq_11", es = "_noCase_ti0pq_23", ca = {
  root: Qi,
  chip: Zi,
  noCase: es
};
function as(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function en({ connection: e, since: a, lastEventAt: t }) {
  const r = as(a, t), l = Xa(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${ca.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(qe, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${ca.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: ca.noCase, children: Va(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${ca.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    de(r)
  ] });
}
const ns = "_root_ryrvl_2", ts = "_context_ryrvl_12", rs = "_row_ryrvl_1", ls = "_heading_ryrvl_25", os = "_headingWrap_ryrvl_33", is = "_chips_ryrvl_38", ss = "_title_ryrvl_45", cs = "_consequence_ryrvl_55", ds = "_actionsWrap_ryrvl_62", us = "_actions_ryrvl_62", ms = "_action_ryrvl_62", hs = "_overflowPanel_ryrvl_91", ws = "_measureClip_ryrvl_102", _s = "_measure_ryrvl_102", V = {
  root: ns,
  context: ts,
  row: rs,
  heading: ls,
  headingWrap: os,
  chips: is,
  title: ss,
  consequence: cs,
  actionsWrap: ds,
  actions: us,
  action: ms,
  overflowPanel: hs,
  measureClip: ws,
  measure: _s
};
function fs({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ n(Ee, { as: "h1", className: V.title, text: e }) : /* @__PURE__ */ n("h1", { className: V.title, children: e });
}
function vs({ title: e, consequence: a, consequenceHint: t, density: r }) {
  return /* @__PURE__ */ o("div", { className: V.heading, children: [
    /* @__PURE__ */ n(fs, { title: e, density: r }),
    a && /* @__PURE__ */ n("p", { className: V.consequence, title: t, children: a })
  ] });
}
function Oa({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: V.action, "data-action": "", children: a }, t));
}
function gn({ disclosure: e }) {
  return /* @__PURE__ */ n(f, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function bs({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(f, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(gn, { disclosure: l }) : a ? [/* @__PURE__ */ n(gn, { disclosure: l }, "more"), /* @__PURE__ */ n(Oa, { actions: e }, "actions")] : /* @__PURE__ */ n(Oa, { actions: e });
}
function gs(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function ps({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: V.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Oa, { actions: e }) });
}
function ys(e, a) {
  const t = k(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var u, d;
    l(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function Ns({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: V.context, children: [
    /* @__PURE__ */ n(Vl, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: V.chips, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] });
}
function ks(...e) {
  return e.some((a) => a === null);
}
function $s(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Cs(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + $s(e);
}
function Ss(e, a, t, r, l) {
  if (l === 0 || ks(a, t, r)) return !1;
  const [i, s, c] = [a, t, r], u = Math.max(0, e.clientWidth - Cs(e, i));
  return c.offsetWidth > u || s.scrollWidth > s.clientWidth + 1;
}
function Rs(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Ts(e) {
  return er(e) && (e.type === "a" || typeof e.props.href == "string");
}
function xs(e, a) {
  return a.length === 0 && e.length === 1 && Ts(e[0]);
}
function Ls(e, a) {
  const t = w(null), r = w(null), l = w(null), i = w(null), [s, c] = p(!1);
  return S(() => {
    const u = t.current;
    if (!Rs(u)) return;
    const d = () => c(Ss(u, r.current, l.current, i.current, e.length)), m = new ResizeObserver(d);
    return m.observe(u), i.current && m.observe(i.current), d(), () => m.disconnect();
  }, [e]), { rowRef: t, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function As({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ n("div", { className: V.measureClip, children: /* @__PURE__ */ o("div", { className: V.measure, ref: t, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(f, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function Es({ connection: e }) {
  return e ? /* @__PURE__ */ n(en, { connection: e.connection, since: e.since }) : null;
}
function e0({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: u, density: d = "page" }) {
  const { rowRef: m, headingRef: v, actionsRef: b, measureRef: y, collapsed: A } = Ls(i, xs(i, s)), q = s.length > 0, { disclosure: oe, close: Re } = ys(A || q, b), ne = gs(s, i, A, u);
  return /* @__PURE__ */ o("header", { className: V.root, "data-density": d, children: [
    /* @__PURE__ */ n(Ns, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: V.row, ref: m, children: [
      /* @__PURE__ */ n("div", { ref: v, className: V.headingWrap, children: /* @__PURE__ */ n(vs, { title: t, consequence: r, consequenceHint: l, density: d }) }),
      /* @__PURE__ */ o("div", { className: V.actionsWrap, children: [
        /* @__PURE__ */ n(Es, { connection: c }),
        /* @__PURE__ */ n("div", { className: V.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ n(bs, { actions: i, hasMore: q, collapsed: A, onOverflow: u, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(ps, { actions: ne, disclosure: oe, onEscape: Re }),
    /* @__PURE__ */ n(As, { actions: i, hasMore: q, measureRef: y })
  ] });
}
const Is = "_scrim_rn7fr_2", Ms = "_drawer_rn7fr_10", qs = "_sheet_rn7fr_14", Bs = "_modal_rn7fr_18", js = "_panel_rn7fr_23", Ps = "_header_rn7fr_54", Ds = "_title_rn7fr_62", Hs = "_body_rn7fr_66", Os = "_close_rn7fr_93", ke = {
  scrim: Is,
  drawer: Ms,
  sheet: qs,
  modal: Bs,
  panel: js,
  header: Ps,
  title: Ds,
  body: Hs,
  close: Os
}, Fs = Me(null), va = [], ba = /* @__PURE__ */ new Map();
function Ws(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function zs(e, a) {
  let t = ba.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ba.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Ks(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !Ws(r) && zs(e, r);
}
function Gs(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (Ks(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function Us(e) {
  for (const a of e.claims) {
    const t = ba.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), ba.delete(a)));
  }
}
function Vs(e, a) {
  const t = { root: e, claims: [] };
  return va.push(t), Gs(t, a), t;
}
function Xs(e) {
  const a = va.indexOf(e);
  a >= 0 && va.splice(a, 1), Us(e);
}
function pn(e) {
  return e !== null && va.at(-1) === e;
}
function Ys(e, a, t) {
  const r = w(null), l = w(t);
  return l.current = t, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = Vs(i, a);
    return r.current = c, () => {
      var d, m;
      const u = pn(c);
      Xs(c), r.current = null, u && ((m = (d = l.current ?? s) == null ? void 0 : d.focus) == null || m.call(d));
    };
  }, [a]), J(() => pn(r.current), []);
}
function Js(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Qs(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Zs({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${ke.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("header", { className: `${ke.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${ke.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${ke.body} ward-drawer-body`, children: e.children })
  ] });
}
function ec(e) {
  return `${ke.scrim} ${ke[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function ac(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ke.panel} ${ke[e]} ward-overlay-panel${t}${r}`;
}
function nc(e) {
  const a = Ie(Fs);
  return e ?? a ?? document.body;
}
function ia(e) {
  const a = w(null), t = w(null), r = k(), l = nc(e.container), i = Ja("(min-width: 768px)"), s = Js(e.kind, i), c = Qs(e, r), u = ur(t), d = Ys(a, l, e.returnFocusTo), m = J(() => {
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
        className: ec(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: m,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: t,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": c.labelledBy,
            "aria-label": c.label,
            className: ac(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (v) => v.stopPropagation(),
            onKeyDown: (v) => d() && u.onKeyDown(v),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${ke.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Zs, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const tc = "_root_td96x_2", rc = "_body_td96x_16", yn = {
  root: tc,
  body: rc
};
function a0({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${yn.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ n("div", { className: yn.body, children: t }) });
}
const lc = "_root_bf1pc_2", oc = "_table_bf1pc_9", ic = "_caption_bf1pc_14", sc = "_series_bf1pc_23", cc = "_category_bf1pc_31", dc = "_cell_bf1pc_39", uc = "_track_bf1pc_45", mc = "_lane_bf1pc_52", hc = "_bar_bf1pc_56", wc = "_value_bf1pc_63", _c = "_swatch_bf1pc_70", fc = "_empty_bf1pc_78", X = {
  root: lc,
  table: oc,
  caption: ic,
  series: sc,
  category: cc,
  cell: dc,
  track: uc,
  lane: mc,
  bar: hc,
  value: wc,
  swatch: _c,
  empty: fc
}, vc = "—", Nn = 6;
function bc(e, a) {
  if (a.length < 1 || a.length > Nn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${Nn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function gc(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function it(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function pc(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function yc({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = pc(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ o("span", { className: X.track, children: [
    /* @__PURE__ */ n("span", { className: X.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${X.bar} ward-barchart-bar`, "data-step": t, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: X.value, children: e === null ? l : r(e) })
  ] }) });
}
function Nc({ series: e }) {
  return /* @__PURE__ */ n(R, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: X.swatch, "data-step": it(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function kc({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: X.caption, children: e }),
    /* @__PURE__ */ n("p", { className: X.empty, children: a })
  ] });
}
function $c({ title: e, categories: a, series: t, top: r, format: l = ae, categoryHead: i = "Category", missing: s = vc }) {
  return /* @__PURE__ */ n("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: X.table, children: [
    /* @__PURE__ */ n("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: X.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Nc, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((c, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: X.category, children: c }),
      t.map((d, m) => /* @__PURE__ */ n(yc, { value: d.values[u], top: r, step: it(m, t.length), format: l, missing: s }, d.name))
    ] }, c)) })
  ] }) });
}
function n0(e) {
  bc(e.categories, e.series);
  const a = gc(e.series);
  return a === 0 ? /* @__PURE__ */ n(kc, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n($c, { ...e, top: a });
}
const Cc = "_root_1bfqw_2", Sc = "_figure_1bfqw_7", Rc = "_of_1bfqw_13", Tc = "_bar_1bfqw_18", xc = "_rows_1bfqw_38", Lc = "_row_1bfqw_38", Ac = "_label_1bfqw_49", Ec = "_amount_1bfqw_54", Te = {
  root: Cc,
  figure: Sc,
  of: Rc,
  bar: Tc,
  rows: xc,
  row: Lc,
  label: Ac,
  amount: Ec
};
function Ic({ spent: e, ceiling: a, breakdown: t }) {
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
const Mc = "_frame_357zi_2", qc = "_table_357zi_6", Bc = "_th_357zi_12", jc = "_td_357zi_13", Pc = "_sort_357zi_48", Dc = "_row_357zi_60", Hc = "_empty_357zi_68", Le = {
  frame: Mc,
  table: qc,
  th: Bc,
  td: jc,
  sort: Pc,
  row: Dc,
  empty: Hc
}, Oc = { asc: "ascending", desc: "descending" };
function Fc(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return Oc[a.direction];
}
function Wc(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Le.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function zc(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Kc({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Le.th,
      style: zc(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Fc(e, a),
      children: Wc(e, t)
    }
  );
}
function Gc({ row: e, props: a }) {
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
function Uc({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Le.head, children: a.map((m) => /* @__PURE__ */ n(Kc, { column: m, sort: c, onSort: u }, m.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((m) => /* @__PURE__ */ n(Gc, { row: m, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: u, empty: d } }, r(m))) })
  ] }) });
}
const Vc = "_list_v0s52_2", Xc = {
  list: Vc
};
function t0({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: Xc.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Yc = "_label_1u62a_2", Jc = {
  label: Yc
};
function r0({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((a) => /* @__PURE__ */ n("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ n("span", { className: Jc.label, children: a.header }) }, a.key)) }) });
}
const Qc = "_stack_bp6a0_2", Zc = {
  stack: Qc
};
function l0({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Zc.stack, "data-ward-action-stack": "", children: e });
}
const ed = "_set_1z0sq_2", ad = "_legend_1z0sq_7", nd = "_row_1z0sq_15", td = "_control_1z0sq_20", rd = "_input_1z0sq_26", ld = "_label_1z0sq_31", od = "_consequence_1z0sq_36", Pe = {
  set: ed,
  legend: ad,
  row: nd,
  control: td,
  input: rd,
  label: ld,
  consequence: od
};
function st({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const u = k(), d = i ?? u;
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
              "aria-describedby": Ta(b, s),
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
const id = "_root_5to6d_2", sd = "_head_5to6d_11", cd = "_note_5to6d_30", dd = "_index_5to6d_35", ud = "_dot_5to6d_39", md = "_counter_5to6d_50", hd = "_trailing_5to6d_58", He = {
  root: id,
  head: sd,
  note: cd,
  index: dd,
  dot: ud,
  counter: md,
  trailing: hd
};
function wd({ index: e }) {
  return e ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("span", { className: `${He.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: He.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function _d({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: He.counter, "aria-hidden": "true", children: e }) : null;
}
function kn({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${He.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: He.head, children: [
      /* @__PURE__ */ n(wd, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: He.note, children: t }),
    /* @__PURE__ */ n(_d, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: He.trailing, children: i })
  ] });
}
const fd = "_strip_1eouv_2", vd = "_cell_1eouv_7", bd = "_value_1eouv_12", gd = "_link_1eouv_29", pd = "_label_1eouv_47", We = {
  strip: fd,
  cell: vd,
  value: bd,
  link: gd,
  label: pd
};
function yd(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const ct = (e) => `${We.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Nd({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: We.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: ct(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${We.label} ward-stat-label`, children: e.label })
  ] });
}
function kd({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: We.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: ct(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${We.link} ward-stat-link`, href: W(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${We.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function La({ cells: e, divided: a = !1 }) {
  return yd(e), /* @__PURE__ */ n("dl", { className: `${We.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => t.href === void 0 ? /* @__PURE__ */ n(Nd, { cell: t }, t.label) : /* @__PURE__ */ n(kd, { cell: t, href: t.href }, t.label)) });
}
const $d = "_root_1eb1u_2", Cd = "_track_1eb1u_8", Sd = "_thumb_1eb1u_46", Rd = "_labelHidden_1eb1u_64", Td = "_label_1eb1u_64", xd = "_lockedNote_1eb1u_84", Oe = {
  root: $d,
  track: Cd,
  thumb: Sd,
  labelHidden: Rd,
  label: Td,
  lockedNote: xd
};
function Ld(e) {
  return e ? `${Oe.label} ${Oe.labelHidden}` : Oe.label;
}
function ze({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = k(), u = `${c}switch`, d = l ? !0 : a, m = r || l;
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
    /* @__PURE__ */ o("label", { id: c, htmlFor: u, className: Ld(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Oe.lockedNote, children: "always on" })
    ] })
  ] });
}
const Ad = "_bar_1vp69_2", Ed = "_skip_1vp69_11", Id = "_mark_1vp69_22", Md = "_nav_1vp69_30", qd = "_list_1vp69_34", Bd = "_select_1vp69_41", jd = "_selectTrigger_1vp69_45", Pd = "_dest_1vp69_52", Dd = "_actor_1vp69_71", Hd = "_actorMark_1vp69_84", Od = "_actorLabel_1vp69_89", Fd = "_tagline_1vp69_108", ie = {
  bar: Ad,
  skip: Ed,
  mark: Id,
  nav: Md,
  list: qd,
  select: Bd,
  selectTrigger: jd,
  dest: Pd,
  actor: Dd,
  actorMark: Hd,
  actorLabel: Od,
  tagline: Fd
};
function Wd(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function zd(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function o0({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = zd(r);
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
      /* @__PURE__ */ n("span", { className: ie.actorMark, "aria-hidden": "true", children: Wd(c) })
    ] })
  ] });
}
const Kd = "_tree_zzoob_2", Gd = "_item_zzoob_6", Ud = "_row_zzoob_10", Vd = "_button_zzoob_22", ga = {
  tree: Kd,
  item: Gd,
  row: Ud,
  button: Vd
}, dt = Me(null);
function Xd({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = Ca({ orientation: "vertical" });
  return /* @__PURE__ */ n(dt.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ga.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const Yd = { ArrowRight: !0, ArrowLeft: !1 };
function $n(e) {
  return e ? !0 : void 0;
}
function Jd(e, a) {
  const t = Yd[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function Qd(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function Zd(e) {
  const a = [ga.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function eu(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function au(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function nu(e) {
  return typeof e == "string" ? e : void 0;
}
function tu({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function ru({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function ut(e) {
  const a = Ie(dt);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = eu(e);
  return /* @__PURE__ */ o("li", { className: ga.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Zd(e),
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
            onClick: () => Qd(e),
            onKeyDown: (r) => Jd(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: au(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: nu(e.label), children: e.label }),
              /* @__PURE__ */ n(tu, { value: e.detail }),
              /* @__PURE__ */ n(ru, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const lu = "_frame_1fj9j_2", ou = "_subjectRail_1fj9j_22", iu = "_subject_1fj9j_22", su = "_rail_1fj9j_42", cu = "_record_1fj9j_64", du = "_recordBody_1fj9j_69", uu = "_stageGrid_1fj9j_118", mu = "_band_1fj9j_144", hu = "_bandBody_1fj9j_153", wu = "_bandActions_1fj9j_158", _u = "_scroller_1fj9j_166", fu = "_board_1fj9j_192", vu = "_laneCount_1fj9j_200", bu = "_lanes_1fj9j_210", Y = {
  frame: lu,
  subjectRail: ou,
  subject: iu,
  rail: su,
  record: cu,
  recordBody: du,
  stageGrid: uu,
  band: mu,
  bandBody: hu,
  bandActions: wu,
  scroller: _u,
  board: fu,
  laneCount: vu,
  lanes: bu
};
function i0({ children: e, as: a = "main", inset: t = "page" }) {
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
function c0({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(kn, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(kn, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: Y.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const gu = "_form_1j8ub_2", pu = "_fields_1j8ub_9", yu = "_actions_1j8ub_19", Ma = {
  form: gu,
  fields: pu,
  actions: yu
};
function d0({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ma.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ma.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ma.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function u0({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: Y.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: Y.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: Y.bandActions, children: a })
  ] });
}
const Nu = "(max-width: 767.98px)";
function an({ label: e, children: a, laneCount: t, onOverflow: r }) {
  const l = w(null);
  la(l, t ?? ar.count(a), r);
  const i = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function ku({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Y.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(I, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(an, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function $u({ lanes: e, label: a }) {
  const [t, r] = p(!1);
  return /* @__PURE__ */ o("div", { className: Y.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: Y.laneCount, "data-ward-board-lane-count": "", hidden: !t, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ n(an, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ n(nr, { children: l.content }, l.id)) })
  ] });
}
function m0({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = Ja(Nu);
  return t === void 0 ? /* @__PURE__ */ n(an, { label: a, children: e }) : l ? /* @__PURE__ */ n(ku, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n($u, { lanes: t, label: a });
}
function h0({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = w(null), i = Math.max(e, 1);
  la(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const Cu = "_block_vmwmz_2", Su = "_sentence_vmwmz_15", Ru = "_meta_vmwmz_20", Tu = "_action_vmwmz_25", xu = "_strip_vmwmz_29", Lu = "_loading_vmwmz_48", Au = "_label_vmwmz_56", Eu = "_counter_vmwmz_63", fe = {
  block: Cu,
  sentence: Su,
  meta: Ru,
  action: Tu,
  strip: xu,
  loading: Lu,
  label: Au,
  counter: Eu
};
function Iu({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: fe.action, children: /* @__PURE__ */ n(f, { onClick: e.onClick, children: e.label }) });
}
function Aa({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${fe.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: fe.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Iu, { action: a })
  ] });
}
function Mu(e) {
  return /* @__PURE__ */ n(Aa, { ...e, kind: "ward-emptystate" });
}
function w0({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(Aa, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function _0(e) {
  return /* @__PURE__ */ n(Aa, { ...e });
}
function f0({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(Aa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function v0({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function b0({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function g0({ label: e, startedAt: a }) {
  const t = w(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  S(() => {
    const s = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = Xa(t.current, r);
  return /* @__PURE__ */ o("div", { className: `${fe.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: fe.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: fe.counter, children: Va(i) }) : null
  ] });
}
const qu = "_note_cigdt_2", Bu = {
  note: qu
};
function ju({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: Bu.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const Pu = "_card_17y0p_2", Du = "_hit_17y0p_29", Hu = "_head_17y0p_42", Ou = "_title_17y0p_49", Fu = "_meta_17y0p_54", Wu = "_fields_17y0p_55", zu = "_who_17y0p_68", Ku = "_sep_17y0p_72", Gu = "_mono_17y0p_76", Uu = "_field_17y0p_55", Vu = "_last_17y0p_92", Xu = "_reason_17y0p_104", Q = {
  card: Pu,
  hit: Du,
  head: Hu,
  title: Ou,
  meta: Fu,
  fields: Wu,
  who: zu,
  sep: Ku,
  mono: Gu,
  field: Uu,
  last: Vu,
  reason: Xu
}, Yu = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Ju(e, a, t) {
  const r = ma(e, "blue"), l = ma(e, "orange"), i = ma(e, "green"), s = w(/* @__PURE__ */ new Set());
  S(() => {
    if (!t) return;
    const c = { blue: r, orange: l, green: i };
    return t.subscribe(a, (u) => {
      if (s.current.has(u.id)) return;
      s.current.add(u.id);
      const d = Yu[u.type];
      d && c[d]();
    });
  }, [r, t, i, a, l]);
}
const Qu = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Zu(e, a) {
  return Qu[a](e);
}
function em({ item: e, connection: a }) {
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
function am({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: Q.head, children: [
    e.flagged && /* @__PURE__ */ n(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function nm({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: Q.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function tm({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: Q.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: Q.field, children: Zu(e, t) }, t)) });
}
const Fa = (e) => e ? !0 : void 0;
function rm(e) {
  return { "--stream": ve(e.streamStep, "id") };
}
function lm(e, a, t) {
  e == null || e(a, t);
}
function om(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function im({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: Q.last, "data-stale": Fa(a), children: t }) : null;
}
function Ea(e) {
  const a = e.fields ?? [], t = e.item, r = w(null);
  Ju(r, t.key, e.feed);
  const l = om(e.feed), i = rm(t);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: Q.card,
      style: i,
      "data-selected": Fa(e.selected),
      "data-flagged": Fa(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: Q.hit, onClick: (s) => lm(e.onOpen, t.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(am, { item: t }),
        /* @__PURE__ */ n(Ee, { as: "p", className: Q.title, text: t.title }),
        /* @__PURE__ */ n(em, { item: t, connection: l }),
        /* @__PURE__ */ n(nm, { reason: t.blockedReason }),
        /* @__PURE__ */ n(tm, { item: t, fields: a }),
        /* @__PURE__ */ n(im, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const sm = "_column_ppaii_3", cm = "_head_ppaii_24", dm = "_label_ppaii_33", um = "_count_ppaii_42", mm = "_list_ppaii_56", aa = {
  column: sm,
  head: cm,
  label: dm,
  count: um,
  list: mm
};
function mt(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function hm({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: aa.head, children: [
    /* @__PURE__ */ n("h2", { className: aa.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: aa.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function wm(e) {
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
function _m({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: u }) {
  const d = k(), m = e.cap !== void 0 && a.length > e.cap, v = mt(a, r);
  return /* @__PURE__ */ o("section", { className: aa.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(hm, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(wm, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: v }),
    m && /* @__PURE__ */ n(ju, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const fm = "_foot_cs4jr_2", vm = "_note_cs4jr_13", bm = "_link_cs4jr_19", qa = {
  foot: fm,
  note: vm,
  link: bm
};
function p0({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: qa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: qa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${qa.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const gm = "_head_1lguu_3", pm = "_identity_1lguu_12", ym = "_titleRow_1lguu_18", Nm = "_title_1lguu_18", km = "_key_1lguu_35", $m = "_rollup_1lguu_45", Cm = "_tools_1lguu_53", Sm = "_swatch_1lguu_65", Rm = "_mark_1lguu_72", ye = {
  head: gm,
  identity: pm,
  titleRow: ym,
  title: Nm,
  key: km,
  rollup: $m,
  tools: Cm,
  swatch: Sm,
  mark: Rm
}, Sn = "initials:";
function Tm(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function xm(e) {
  const a = [Tm(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function Lm(e) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    xm(e)
  ] });
}
function Am(e) {
  return e.startsWith(Sn) ? e.slice(Sn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Em({ markRef: e, streamStep: a }) {
  const t = { "--stream": ve(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${ye.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Am(e) }) : /* @__PURE__ */ n("span", { className: ye.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Im({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(I, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function y0({
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
        /* @__PURE__ */ n(Em, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: ye.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: ye.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: ye.rollup, "aria-live": "polite", children: Lm(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ye.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Im, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(f, { onClick: c, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(en, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const Mm = "_head_1sejb_14", qm = "_line_1sejb_15", Bm = "_cHandle_1sejb_36", jm = "_cName_1sejb_41", Pm = "_nameLine_1sejb_49", Dm = "_cLabel_1sejb_56", Hm = "_cCap_1sejb_61", Om = "_cShown_1sejb_66", Fm = "_name_1sejb_49", Wm = "_noCap_1sejb_88", zm = "_state_1sejb_102", Km = "_handle_1sejb_111", Gm = "_sub_1sejb_137", j = {
  head: Mm,
  line: qm,
  cHandle: Bm,
  cName: jm,
  nameLine: Pm,
  cLabel: Dm,
  cCap: Hm,
  cShown: Om,
  name: Fm,
  noCap: Wm,
  state: zm,
  handle: Km,
  sub: Gm
}, Um = "can't be hidden or collapsed", Vm = "terminal · counted, not a column";
function N0() {
  return /* @__PURE__ */ o("div", { className: j.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: j.cHandle }),
    /* @__PURE__ */ n("span", { className: j.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: j.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: j.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: j.cShown, children: "Shown" })
  ] });
}
function Xm(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Ym(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Rn(e) {
  return e.gate ? Um : e.terminal ? Vm : Ym(e.agentsMounted);
}
function Jm(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Qm({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: j.cName, children: [
    /* @__PURE__ */ o("span", { className: j.nameLine, children: [
      /* @__PURE__ */ n("span", { className: j.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Rn(e) && /* @__PURE__ */ n("span", { className: j.sub, children: Rn(e) })
  ] });
}
function Zm(e) {
  return e === void 0 ? "" : String(e);
}
function eh(e) {
  return e === "" ? void 0 : Number(e);
}
function ah({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: j.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: j.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => Jm(t, a),
      children: "⠿"
    }
  ) });
}
function nh({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${j.cCap} ${j.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: j.cCap, children: /* @__PURE__ */ n(I, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Zm(a.cap), onChange: (r) => t({ ...a, cap: eh(r) }) }) });
}
function th({ stage: e, config: a, onChange: t }) {
  const r = Xm(e, a.shown), l = e.gate || e.terminal, i = (s) => t({ ...a, shown: s });
  return /* @__PURE__ */ o("span", { className: j.cShown, children: [
    /* @__PURE__ */ n(ze, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ n("span", { className: j.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function rh(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function k0({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: j.line, "data-kind": rh(e), children: [
    /* @__PURE__ */ n(ah, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Qm, { stage: e }),
    /* @__PURE__ */ n("span", { className: j.cLabel, children: /* @__PURE__ */ n(I, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(nh, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(th, { stage: e, config: a, onChange: t })
  ] });
}
const lh = "_body_1a4f4_2", oh = "_head_1a4f4_9", ih = "_summary_1a4f4_19", sh = "_block_1a4f4_20", ch = "_actionsBlock_1a4f4_21", dh = "_title_1a4f4_41", uh = "_note_1a4f4_46", mh = "_k_1a4f4_51", hh = "_kv_1a4f4_58", wh = "_row_1a4f4_64", _h = "_label_1a4f4_75", fh = "_value_1a4f4_84", vh = "_quote_1a4f4_90", bh = "_actions_1a4f4_21", gh = "_resolve_1a4f4_103", P = {
  body: lh,
  head: oh,
  summary: ih,
  block: sh,
  actionsBlock: ch,
  title: dh,
  note: uh,
  k: mh,
  kv: hh,
  row: wh,
  label: _h,
  value: fh,
  quote: vh,
  actions: bh,
  resolve: gh
};
function ph(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function yh(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Nh(e) {
  const a = oa(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function kh(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(h, { ...xa(Nh(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...ph(e),
    ...yh(e, a)
  ];
}
function $h({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: P.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: P.k, children: a }),
    e
  ] });
}
function Ch({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: P.head, children: [
    /* @__PURE__ */ n(h, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function Sh({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: P.block, children: [
    /* @__PURE__ */ n("p", { className: P.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: P.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: P.note, children: e.agentMeta })
  ] }) : null;
}
function $0({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const u = k(), d = kh(e, l);
  return /* @__PURE__ */ n(ia, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: P.body, children: [
    /* @__PURE__ */ n(Ch, { item: e }),
    /* @__PURE__ */ o("div", { className: P.summary, children: [
      /* @__PURE__ */ n("h2", { className: P.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: P.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: P.kv, children: d.map(([m, v]) => /* @__PURE__ */ o("div", { className: P.row, children: [
      /* @__PURE__ */ n("dt", { className: P.label, children: m }),
      /* @__PURE__ */ n("dd", { className: P.value, children: v })
    ] }, m)) }),
    /* @__PURE__ */ n(Sh, { item: e }),
    /* @__PURE__ */ o("div", { className: P.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: P.actions, children: a }),
      c && /* @__PURE__ */ n("p", { className: P.note, children: c })
    ] }),
    /* @__PURE__ */ n($h, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Rh = "_root_3azmy_2", Th = "_list_3azmy_7", xh = "_item_3azmy_12", Lh = "_box_3azmy_18", Ah = "_text_3azmy_23", Eh = "_note_3azmy_28", Ue = {
  root: Rh,
  list: Th,
  item: xh,
  box: Lh,
  text: Ah,
  note: Eh
};
function Ia({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ o("div", { className: Ue.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ue.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ue.box, children: /* @__PURE__ */ n(Za, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Ue.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Ue.note} ward-checklist-note`, children: a })
  ] });
}
const Ih = "_rail_ke7ch_2", Mh = "_k_ke7ch_11", qh = "_head_ke7ch_19", Bh = "_section_ke7ch_25", jh = "_card_ke7ch_38", Ph = "_strip_ke7ch_42", Dh = "_skeleton_ke7ch_56", Hh = "_skeletonLabel_ke7ch_70", Oh = "_bar_ke7ch_76", Fh = "_note_ke7ch_85", me = {
  rail: Ih,
  k: Mh,
  head: qh,
  section: Bh,
  card: jh,
  strip: Ph,
  skeleton: Dh,
  skeletonLabel: Hh,
  bar: Oh,
  note: Fh
};
function Wh(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ba({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: me.k, children: e }),
    a
  ] });
}
function zh({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function Kh({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(_m, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function Gh(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Kh, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(zh, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function C0(e) {
  const a = Wh(e.onOpen), t = mt(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ba, { title: "Card", children: /* @__PURE__ */ n("div", { className: me.card, children: t && /* @__PURE__ */ n(Ea, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ba, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Gh, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ba, { title: "Effect of this config", children: /* @__PURE__ */ n(Ia, { items: e.effects, density: "compact" }) })
  ] });
}
function Uh(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Vh(e) {
  return Math.ceil(e.length / 2);
}
function Xh(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function ht(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Yh(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = ht(e);
  l !== void 0 && t(l), r(Xh(e.type));
}
function Jh(e, a, t, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Yh(i, t, r, l));
  }, [e, a, t, r, l]);
}
function Qh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Zh(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function ew(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function aw(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + z.height.card + " + " + z.height.cardRow + " * " + String(Vh(a ?? [])) + ")"
  };
}
function nw(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function tw(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(h, { role: "meta", label: re(e.cost) }) : null;
}
function rw(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(h, { role: "meta", label: e.jiraKey }) : null;
}
function lw(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Se, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function ow(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function iw(e, a) {
  return a === void 0 ? e : Uh(e, a.ref);
}
function sw(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ra(e) {
  return e === !0 ? "true" : void 0;
}
function wt(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = w(null), i = ma(l), s = w(/* @__PURE__ */ new Set()), [c, u] = p(Qh(a));
  Jh(e.feed, a.key, s, u, i);
  const d = Zh(a, r), m = ew(a, t), v = aw(a, e.fields), b = ow(a, t, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...sw(e),
      className: "ward-workcard",
      "data-flagged": ra(a.flagged),
      "data-selected": ra(e.selected),
      style: v,
      ref: iw(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        nw(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(h, { role: d.role, label: d.label }),
          tw(a, e.fields),
          rw(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          lw(t, c, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function cw({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function dw(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function uw(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function mw(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(cw, { count: e.items.length, cap: e.column.cap });
}
function hw(e, a) {
  return e.roving ?? a;
}
function ww(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function _w(e, a) {
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
function fw(e) {
  const a = k(), t = Ca({ orientation: "vertical" }), r = hw(e, t), l = dw(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ra(l), "data-gate": ra(e.column.gate), children: [
    uw(e.column, e.items.length, a),
    mw(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...ww(e, t), children: _w(e, r) })
  ] });
}
function vw(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function bw(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(I, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function gw(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function S0(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: vw(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      bw(e),
      gw(e.onConfigure),
      /* @__PURE__ */ n(en, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function pw(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function yw(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(ze, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(ze, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Nw(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(R, { children: [
    a > 0 ? /* @__PURE__ */ n(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function R0(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ra(pw(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: yw(e) }),
    /* @__PURE__ */ n(I, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(Un, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Nw(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function T0(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(wt, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(fw, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function kw(e, a) {
  const t = ht(e);
  t !== void 0 && a(t);
}
function $w(e, a, t) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => kw(r, t));
  }, [e, a, t]);
}
function Cw(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Sw(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function Rw(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Se, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Tw(e, a) {
  return /* @__PURE__ */ o(R, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function x0(e) {
  var s;
  const a = e.item, t = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  $w(e.feed, a.key, l);
  const i = [...Cw(a), ...Sw(a)];
  return /* @__PURE__ */ o(ia, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Rw(t, r)
    ] }),
    Tw(a, e.actions)
  ] });
}
const xw = "_card_1iv4k_2", Lw = "_head_1iv4k_28", Aw = "_mark_1iv4k_36", Ew = "_name_1iv4k_48", Iw = "_chips_1iv4k_69", Mw = "_description_1iv4k_75", qw = "_run_1iv4k_80", Bw = "_sep_1iv4k_89", jw = "_facts_1iv4k_94", Pw = "_fact_1iv4k_94", Dw = "_factLabel_1iv4k_107", Hw = "_factValue_1iv4k_111", le = {
  card: xw,
  head: Lw,
  mark: Aw,
  name: Ew,
  chips: Iw,
  description: Mw,
  run: qw,
  sep: Bw,
  facts: jw,
  fact: Pw,
  factLabel: Dw,
  factValue: Hw
}, Ow = { live: "done", draft: "running", paused: "meta" };
function Fw(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function Ww({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ n(h, { role: Ow[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function zw({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: le.description, children: e });
}
function Kw({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Se, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Gw({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ n("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function Uw(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Vw({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": ve(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: Fw(s),
      style: c,
      "data-selected": u,
      "data-paused": Uw(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ n("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${le.name} ward-rowlink ward-target`, href: W(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(zw, { description: e.description }),
        /* @__PURE__ */ n(Kw, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(Ww, { versions: e.versions }),
        /* @__PURE__ */ n(Gw, { facts: i })
      ]
    }
  );
}
const Xw = "_list_4dcyc_2", Yw = "_row_4dcyc_11", Jw = "_head_4dcyc_23", Qw = "_id_4dcyc_30", Zw = "_lock_4dcyc_35", e_ = "_reason_4dcyc_41", a_ = "_remove_4dcyc_46", n_ = "_clauses_4dcyc_50", t_ = "_clause_4dcyc_50", r_ = "_label_4dcyc_64", l_ = "_cell_4dcyc_71", o_ = "_value_4dcyc_76", se = {
  list: Xw,
  row: Yw,
  head: Jw,
  id: Qw,
  lock: Zw,
  reason: e_,
  remove: a_,
  clauses: n_,
  clause: t_,
  label: r_,
  cell: l_,
  value: o_
}, _t = Me(!1);
function L0({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(_t.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: se.list, "aria-label": a, children: e }) });
}
function i_({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: se.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(I, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function s_({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: se.lock, children: [
    /* @__PURE__ */ n(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: se.reason, children: e })
  ] });
}
function c_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: se.head, children: [
    /* @__PURE__ */ n("span", { className: se.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(s_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: se.remove, children: /* @__PURE__ */ o(f, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Tn(e, a) {
  return e.locked ? void 0 : a;
}
function A0({ rule: e, onChange: a, onRemove: t }) {
  if (!Ie(_t)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Tn(e, a);
  return /* @__PURE__ */ o("li", { className: se.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(c_, { rule: e, onRemove: Tn(e, t) }),
    /* @__PURE__ */ n("dl", { className: se.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: se.clause, children: [
      /* @__PURE__ */ n("dt", { className: se.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: se.cell, children: /* @__PURE__ */ n(i_, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const d_ = "_ladder_n8eeo_2", u_ = "_cell_n8eeo_7", m_ = "_empty_n8eeo_26", h_ = "_name_n8eeo_34", w_ = "_holder_n8eeo_40", __ = "_request_n8eeo_46", f_ = "_swatches_n8eeo_51", v_ = "_swatch_n8eeo_51", b_ = "_tilesFrame_n8eeo_78", g_ = "_tiles_n8eeo_78", p_ = "_tile_n8eeo_78", y_ = "_bar_n8eeo_117", N_ = "_hex_n8eeo_128", k_ = "_note_n8eeo_138", L = {
  ladder: d_,
  cell: u_,
  empty: m_,
  name: h_,
  holder: w_,
  request: __,
  swatches: f_,
  swatch: v_,
  tilesFrame: b_,
  tiles: g_,
  tile: p_,
  bar: y_,
  hex: N_,
  note: k_
}, E0 = "not validated yet, pending a CVD matrix and dark stepping";
function $_(e) {
  return e.reserved ? "reserved" : Ra(e.step) ? "validated" : "partial";
}
function ft(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function C_(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function S_({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(qe, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function R_(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function T_(e, a, t) {
  return {
    "aria-checked": a,
    "aria-disabled": t || void 0,
    tabIndex: t ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const xn = (e) => String(e).padStart(2, "0");
function x_(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? ft(e, void 0);
}
function L_({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.hex} ward-ladder-hex`, children: r ? `step ${xn(e)}` : vr(e) }),
    /* @__PURE__ */ n("span", { className: `${L.note} ward-ladder-note`, children: r ? t : `Step ${xn(e)} · ${t}` })
  ] });
}
function A_({ step: e, value: a, taken: t, onChange: r, presentation: l, disabled: i }) {
  const s = $_(e), c = ft(s, t), u = c !== "free", d = u || i, m = a === e.step, v = e.name ?? `Step ${e.step}`, b = () => {
    d || r(e.step);
  }, y = `${v} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...T_(u, m, d), "data-validation": s, style: C_(e, s), onClick: b, onKeyDown: (q) => R_(q, b) }, label: y, name: v, holder: c, validation: s, note: x_(s, t, m), step: e.step };
}
const E_ = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${L.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${L.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(L_, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${L.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(S_, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${L.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${L.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function I_(e) {
  return E_[e.presentation](A_(e));
}
function M_(e) {
  for (const a of e)
    if (!a.reserved && !Sa(a.step)) throw new Error("colour ladder renders token steps only");
}
function q_() {
  return /* @__PURE__ */ o("div", { className: `${L.cell} ward-ladder-cell ${L.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${L.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function B_(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const j_ = { list: L.ladder, swatches: L.swatches, tiles: L.tilesFrame };
function P_() {
  return /* @__PURE__ */ o("div", { className: `${L.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${L.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const D_ = { list: q_, swatches: () => null, tiles: P_ };
function H_(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function vt(e) {
  const a = e.takenBy ?? {}, t = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  M_(e.steps);
  const r = B_(e), l = D_[r], i = /* @__PURE__ */ o(R, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(I_, { step: s, value: e.value, taken: a[s.step], onChange: t, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...H_(e.disabled === !0), className: `${j_[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: L.tiles, children: i }) : i });
}
const O_ = "_rail_s06lm_2", F_ = "_section_s06lm_12", W_ = "_sectionFlush_s06lm_22", z_ = "_head_s06lm_26", K_ = "_headLabel_s06lm_34", G_ = "_sample_s06lm_42", U_ = "_sampleLabel_s06lm_47", V_ = "_sampleTitle_s06lm_54", X_ = "_sampleMeta_s06lm_59", Y_ = "_trace_s06lm_65", J_ = "_traceHead_s06lm_70", Q_ = "_steps_s06lm_78", Z_ = "_step_s06lm_78", ef = "_stepTitle_s06lm_97", af = "_hollow_s06lm_107", nf = "_stepBody_s06lm_115", tf = "_stepDetail_s06lm_127", rf = "_publish_s06lm_132", lf = "_reason_s06lm_138", of = "_note_s06lm_143", sf = "_reveal_s06lm_148", N = {
  rail: O_,
  section: F_,
  sectionFlush: W_,
  head: z_,
  headLabel: K_,
  sample: G_,
  sampleLabel: U_,
  sampleTitle: V_,
  sampleMeta: X_,
  trace: Y_,
  traceHead: J_,
  steps: Q_,
  step: Z_,
  stepTitle: ef,
  hollow: af,
  stepBody: nf,
  stepDetail: tf,
  publish: rf,
  reason: lf,
  note: of,
  reveal: sf
}, Ln = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, cf = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, df = { ok: "greenFill", finding: "orangeFill", action: "blue" }, uf = { notSimulated: "not simulated", running: "running" };
function mf(e) {
  return e.presentation === "foundry";
}
function hf(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function wf(e, a) {
  var r;
  const t = cf[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function _f(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function ff(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function vf(e) {
  if (_f(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function bf(e) {
  const [a, t] = p(!1);
  S(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${N.step} ${N.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function gf(e) {
  const a = uf[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: N.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(qe, { size: 6, kind: df[e.kind], label: e.kind });
}
function pf(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: N.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function yf(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Nf(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(bf, { kind: a.kind, children: [
    /* @__PURE__ */ n(gf, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: N.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: N.stepTitle, children: a.title }),
      /* @__PURE__ */ n(pf, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(yf, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function kf(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(ce(a)), t.join(" · ");
}
function bt(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${N.trace} ${N.section}`, children: [
    /* @__PURE__ */ n("p", { className: N.traceHead, id: a, children: kf(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: N.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Nf, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function $f(e) {
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
function Cf(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${N.sampleMeta} ${N.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Sf(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Fn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: N.sectionFlush, children: /* @__PURE__ */ n(La, { divided: !0, cells: a }) });
}
function Rf(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Fn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Tf(e) {
  const a = Rf(e.run);
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
function xf(e) {
  return /* @__PURE__ */ o("div", { className: `${N.publish} ${N.section}`, children: [
    /* @__PURE__ */ n(gt, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: N.note, children: e.note })
  ] });
}
function Lf(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${N.publish} ${N.section}`, children: /* @__PURE__ */ n(gt, { reason: e.reason, onPublish: e.onPublish }) });
}
function pt(e) {
  return /* @__PURE__ */ o("div", { className: `${N.head} ${N.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: N.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(h, { role: Ln[e.run.status].role, label: Ln[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Af(e, a) {
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
function Ef(e) {
  var t;
  ff(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(pt, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n($f, { sample: e.run.sample }),
    /* @__PURE__ */ n(bt, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Sf, { run: e.run }),
    /* @__PURE__ */ n("div", { className: N.section, children: /* @__PURE__ */ n(Ia, { items: e.checklist }) }),
    /* @__PURE__ */ n(xf, { reason: hf(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function If(e) {
  var r;
  const a = Af(e.run, e.feed);
  vf(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(pt, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Cf, { sample: e.run.sample }),
    /* @__PURE__ */ n(bt, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Tf, { run: e.run }),
    /* @__PURE__ */ n("div", { className: N.section, children: /* @__PURE__ */ n(Ia, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Lf, { reason: wf(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function I0(e) {
  return mf(e) ? /* @__PURE__ */ n(If, { ...e }) : /* @__PURE__ */ n(Ef, { ...e });
}
const Mf = "_list_142ip_3", qf = "_row_142ip_9", Bf = "_condition_142ip_18", jf = "_action_142ip_24", ha = {
  list: Mf,
  row: qf,
  condition: Bf,
  action: jf
}, yt = Me(!1);
function M0({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(yt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ha.list, "aria-label": a, children: e }) });
}
function q0({ rule: e }) {
  if (!Ie(yt)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: ha.row, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ha.condition, children: e.when }),
    /* @__PURE__ */ n(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ha.action, children: e.then })
  ] });
}
const Pf = "_move_tmppt_3", Df = {
  move: Pf
};
function Wa(e, a, t) {
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
function Hf(e) {
  return e === "up" ? "down" : "up";
}
function Of(e, a) {
  const t = An(e, a.id, a.direction) ?? An(e, a.id, Hf(a.direction));
  t == null || t.focus();
}
function $t() {
  const e = w(null), [a, t] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && a !== null && Of(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    t(s), l(c);
  } };
}
function Ct({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function pa({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${Df.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Ff = "_body_1jd1i_2", Wf = "_title_1jd1i_8", zf = "_section_1jd1i_13", Kf = "_legend_1jd1i_18", Gf = "_stages_1jd1i_26", Uf = "_stage_1jd1i_26", Vf = "_stageIndex_1jd1i_44", Xf = "_stageName_1jd1i_50", Yf = "_footer_1jd1i_59", Jf = "_note_1jd1i_66", Qf = "_reason_1jd1i_71", Zf = "_actions_1jd1i_76", ev = "_webHead_1jd1i_83", av = "_kicker_1jd1i_92", nv = "_webTitle_1jd1i_99", tv = "_webBody_1jd1i_105", rv = "_webSection_1jd1i_109", lv = "_sectionHead_1jd1i_121", ov = "_sectionNote_1jd1i_129", iv = "_formLabel_1jd1i_134", sv = "_identityRow_1jd1i_139", cv = "_nameCell_1jd1i_145", dv = "_keyCell_1jd1i_150", uv = "_colourCell_1jd1i_154", mv = "_colourStatus_1jd1i_161", hv = "_webStages_1jd1i_166", wv = "_webStageList_1jd1i_172", _v = "_webStage_1jd1i_166", fv = "_webIndex_1jd1i_191", vv = "_webStageName_1jd1i_196", bv = "_webMoves_1jd1i_201", gv = "_addStage_1jd1i_215", pv = "_addStageButton_1jd1i_223", yv = "_addStageNote_1jd1i_231", Nv = "_webFooter_1jd1i_236", kv = "_webFooterNotes_1jd1i_244", $v = "_webNote_1jd1i_251", _ = {
  body: Ff,
  title: Wf,
  section: zf,
  legend: Kf,
  stages: Gf,
  stage: Uf,
  stageIndex: Vf,
  stageName: Xf,
  footer: Yf,
  note: Jf,
  reason: Qf,
  actions: Zf,
  webHead: ev,
  kicker: av,
  webTitle: nv,
  webBody: tv,
  webSection: rv,
  sectionHead: lv,
  sectionNote: ov,
  formLabel: iv,
  identityRow: sv,
  nameCell: cv,
  keyCell: dv,
  colourCell: uv,
  colourStatus: mv,
  webStages: hv,
  webStageList: wv,
  webStage: _v,
  webIndex: fv,
  webStageName: vv,
  webMoves: bv,
  addStage: gv,
  addStageButton: pv,
  addStageNote: yv,
  webFooter: Nv,
  webFooterNotes: kv,
  webNote: $v
}, Cv = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], St = "not in catalogue";
function Sv(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${St}` }, ...t];
}
function Rv({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(I, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${St}`;
  return /* @__PURE__ */ n(I, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Sv(t, e.name), invalid: i, onChange: r });
}
function Rt(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Tv(e) {
  const a = w([]), t = w(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function xv({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Rt(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${_.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: _.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: _.webStageName, children: /* @__PURE__ */ n(Rv, { stage: a, index: t, catalogue: l, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(I, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: Cv, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ o("span", { className: _.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(pa, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      t < r - 1 && /* @__PURE__ */ n(pa, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Lv({ stages: e, onChange: a, catalogue: t }) {
  const r = Tv(e.length), l = $t(), i = (c, u) => {
    const d = Nt(c, u);
    r.current = Wa(r.current, c, d), l.moved({ id: r.current[d], direction: u }, kt(Rt(e[c], c), d, e.length)), a(Wa(e, c, d));
  }, s = (c, u) => a(e.map((d, m) => m === c ? u : d));
  return /* @__PURE__ */ o("div", { className: _.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: _.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, u) => /* @__PURE__ */ n(xv, { id: r.current[u], stage: c, index: u, total: e.length, catalogue: t, onReplace: (d) => s(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(Ct, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: _.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: _.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: _.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Av = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Ev = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Iv = "A new stream starts as a draft. Nothing runs on it until you publish it.", Mv = "Create is disabled: name the stream and give it a key first.", qv = "reorder with the ↑ ↓ buttons · min 2";
function nn(e, a) {
  return !e.reserved && Ra(e.step) && a[e.step] === void 0;
}
function Bv(e, a) {
  const t = e.find((r) => nn(r, a));
  return t ? t.step : 1;
}
function jv({ stages: e, onMove: a }) {
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
function Pv({ reason: e, onCreate: a, onDraft: t }) {
  const r = k();
  return /* @__PURE__ */ o("div", { className: _.footer, children: [
    /* @__PURE__ */ n("p", { className: _.note, children: Iv }),
    e && /* @__PURE__ */ n("p", { className: _.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: _.actions, children: [
      /* @__PURE__ */ n(f, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(f, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Dv(e, a) {
  return e !== "" && a !== "" ? null : Mv;
}
function Hv(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = Ev, onCreate: i, onDraft: s, onClose: c, returnFocusTo: u } = e, d = k(), [m, v] = p(""), [b, y] = p(""), [A, q] = p(a[0].value), [oe, Re] = p(() => Bv(t, r)), [ne, Ke] = p(e.stages ?? Av), [Ge, C] = p(l[0].value), K = { name: m, key: b, streamStep: oe, owner: A, stages: ne, policy: Ge }, be = Dv(m, b);
  return /* @__PURE__ */ n(ia, { kind: "modal", labelledBy: d, onClose: c, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: _.body, children: [
    /* @__PURE__ */ n("h2", { className: _.title, id: d, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Identity" }),
      /* @__PURE__ */ n(I, { kind: "input", label: "Stream name", value: m, onChange: v }),
      /* @__PURE__ */ n(I, { kind: "input", label: "Key", value: b, onChange: y, mono: !0 }),
      /* @__PURE__ */ n(I, { kind: "select", label: "Owner", value: A, onChange: q, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Colour" }),
      /* @__PURE__ */ n(vt, { label: "Stream colour", steps: t, value: oe, onChange: Re, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Stages" }),
      /* @__PURE__ */ n(jv, { stages: ne, onMove: (Be, Zt) => Ke(Wa(ne, Be, Zt)) })
    ] }),
    /* @__PURE__ */ n(st, { legend: "Loop policy", options: l, value: Ge, onChange: C }),
    /* @__PURE__ */ n(Pv, { reason: be, onCreate: () => i(K), onDraft: () => s(K) })
  ] }) });
}
const Tt = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Ov = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Fv(e, a, t, r, l, i) {
  var c;
  const s = ((c = Tt.find((u) => u.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: s, stages: i };
}
function Wv(e, a) {
  return zv(e) && Kv(e, a) && Gv(e);
}
function zv(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Kv(e, a) {
  return e.colourStep === null || nn({ step: e.colourStep }, a);
}
function Gv(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Uv(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : nn({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Vv({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: _.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: _.webNote, children: "Add a stage an agent can run on." });
}
function Xv({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: _.webFooter, children: [
    /* @__PURE__ */ o("div", { className: _.webFooterNotes, children: [
      /* @__PURE__ */ n(Vv, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: _.reason, children: Ov })
    ] }),
    l && /* @__PURE__ */ n(f, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(f, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Yv({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: _.webHead, children: [
    /* @__PURE__ */ n("span", { className: _.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: _.webTitle, children: "New stream" })
  ] });
}
function Jv({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
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
function Qv(e) {
  const a = k(), t = k(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [u, d] = p(e.owners[0] ?? ""), [m, v] = p(null), [b, y] = p("relay"), [A, q] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = Fv(l, s, u, m, b, A), Re = Wv(oe, r), ne = A.find((C) => C.kind === "agent" && C.name.trim() !== ""), Ke = /* @__PURE__ */ o("div", { className: _.colourCell, children: [
    /* @__PURE__ */ n("span", { className: _.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(vt, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: v, takenBy: r })
  ] }), Ge = /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("p", { className: _.colourStatus, "data-colour-status": "", children: Uv(m, r) }),
    /* @__PURE__ */ n(I, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map((C) => ({ value: C, label: C })), onChange: d })
  ] });
  return /* @__PURE__ */ o(ia, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Yv, { titleId: t }),
    /* @__PURE__ */ o("div", { className: _.webBody, children: [
      /* @__PURE__ */ n(Jv, { name: l, setName: i, streamKey: s, setKey: c, colour: Ke, owner: Ge }),
      /* @__PURE__ */ o("section", { className: _.webSection, children: [
        /* @__PURE__ */ o("div", { className: _.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: _.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: _.sectionNote, children: qv })
        ] }),
        /* @__PURE__ */ n(Lv, { stages: A, onChange: q })
      ] }),
      /* @__PURE__ */ n("section", { className: _.webSection, children: /* @__PURE__ */ n(st, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Tt, onChange: y }) }),
      /* @__PURE__ */ n(Xv, { ready: Re, draft: oe, agentStage: ne, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function B0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Qv, { ...e }) : /* @__PURE__ */ n(Hv, { ...e });
}
const Zv = "_row_bs8hc_2", eb = "_cell_bs8hc_6", ab = "_condition_bs8hc_11", nb = "_action_bs8hc_18", tb = "_contract_bs8hc_24", rb = "_contractCondition_bs8hc_33", lb = "_contractAction_bs8hc_39", Z = {
  row: Zv,
  cell: eb,
  condition: ab,
  action: nb,
  contract: tb,
  contractCondition: rb,
  contractAction: lb
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
function ob({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ n("span", { className: Z.condition, title: ya(e, r), children: ya(e, r) }) }),
    /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: Z.cell, children: tn(e, a, t) })
  ] });
}
function ib({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ o("td", { className: Z.cell, children: [
      /* @__PURE__ */ n(h, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: Z.condition, children: ya(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: Z.cell, children: tn(e, a, t) })
  ] });
}
function sb({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Z.contract, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: Z.contractCondition, children: ya(e, r) }),
    /* @__PURE__ */ n(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: Z.contractAction, children: tn(e, a, t, !0) })
  ] });
}
const cb = { two: ib, four: ob, contract: sb };
function j0(e) {
  var t;
  if (!xt.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = cb[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const db = "_column_1xq6c_2", ub = "_head_1xq6c_17", mb = "_index_1xq6c_23", hb = "_name_1xq6c_29", wb = "_meta_1xq6c_38", _b = "_mono_1xq6c_43", fb = "_gate_1xq6c_50", vb = "_reviewersLabel_1xq6c_57", bb = "_reviewers_1xq6c_57", gb = "_reviewer_1xq6c_57", pb = "_agents_1xq6c_74", yb = "_workflowColumn_1xq6c_79", Nb = "_workflowHead_1xq6c_96", kb = "_stageRow_1xq6c_102", $b = "_stageLabel_1xq6c_109", Cb = "_workflowTitle_1xq6c_116", Sb = "_workflowMeta_1xq6c_122", Rb = "_workflowGate_1xq6c_127", Tb = "_gateNote_1xq6c_135", xb = "_cardNote_1xq6c_140", Lb = "_reviewerList_1xq6c_145", Ab = "_reviewerRow_1xq6c_151", Eb = "_reviewerMark_1xq6c_157", Ib = "_reviewerName_1xq6c_167", Mb = "_terminalCard_1xq6c_173", qb = "_terminalCount_1xq6c_182", Bb = "_workflowAgents_1xq6c_188", jb = "_mount_1xq6c_194", $ = {
  column: db,
  head: ub,
  index: mb,
  name: hb,
  meta: wb,
  mono: _b,
  gate: fb,
  reviewersLabel: vb,
  reviewers: bb,
  reviewer: gb,
  agents: pb,
  workflowColumn: yb,
  workflowHead: Nb,
  stageRow: kb,
  stageLabel: $b,
  workflowTitle: Cb,
  workflowMeta: Sb,
  workflowGate: Rb,
  gateNote: Tb,
  cardNote: xb,
  reviewerList: Lb,
  reviewerRow: Ab,
  reviewerMark: Eb,
  reviewerName: Ib,
  terminalCard: Mb,
  terminalCount: qb,
  workflowAgents: Bb,
  mount: jb
}, Pb = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function rn(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Lt(e) {
  return `${Math.round(e * 100)}%`;
}
function Db({ stage: e }) {
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
function Hb({ stage: e }) {
  return /* @__PURE__ */ n(La, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: rn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function Ob({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: $.head, children: [
    /* @__PURE__ */ n("span", { className: $.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: $.name, id: a, children: e.name }),
    /* @__PURE__ */ n(h, { role: e.kind === "gate" ? "gate" : "soft", label: Pb[e.kind] })
  ] });
}
function Fb({ stage: e }) {
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
function Wb({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(Db, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(Hb, { stage: e }) : null;
}
function zb({ onMount: e }) {
  return e ? /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Kb({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: $.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Ob, { stage: e, titleId: l }),
    /* @__PURE__ */ n(Fb, { stage: e }),
    /* @__PURE__ */ n(Wb, { stage: e }),
    /* @__PURE__ */ n("div", { className: $.agents, children: a.map((s) => /* @__PURE__ */ n(Vw, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(zb, { onMount: t })
  ] });
}
const Gb = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function Ub({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: $.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: $.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: $.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: $.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function Vb({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: $.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: $.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(Ub, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: $.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: Lt(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Xb(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Yb({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: $.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: $.terminalCount, children: rn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: $.cardNote, children: Xb(e.rolledBackThisWeek) })
  ] });
}
function Jb(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Qb(e) {
  if (e.kind === "terminal") return `${rn(e.closedThisWeek)} this week`;
  const a = Jb(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Zb({ stage: e, titleId: a }) {
  const t = Gb[e.kind];
  return /* @__PURE__ */ o("header", { className: $.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: $.stageRow, children: [
      /* @__PURE__ */ o("span", { className: $.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(h, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: $.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: $.workflowMeta, children: Qb(e) })
  ] });
}
function eg(e) {
  return e === "entry" || e === "agent";
}
function ag({ stage: e, onMount: a }) {
  return a === void 0 || !eg(e.kind) ? null : /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", className: $.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function ng({ stage: e, agentCards: a, onMount: t }) {
  const r = k();
  return /* @__PURE__ */ o("section", { className: $.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Zb, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(Vb, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(Yb, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: $.workflowAgents, children: a }),
    /* @__PURE__ */ n(ag, { stage: e, onMount: t })
  ] });
}
function tg(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function P0(e) {
  return tg(e) ? /* @__PURE__ */ n(ng, { ...e }) : /* @__PURE__ */ n(Kb, { ...e });
}
const rg = "_row_alabo_6", lg = "_name_alabo_12", og = "_compactRow_alabo_13", ig = "_compactName_alabo_13", sg = "_cell_alabo_30", cg = "_chain_alabo_45", dg = "_owner_alabo_51", ug = "_mono_alabo_57", mg = "_compactCell_alabo_79", hg = "_stack_alabo_96", wg = "_stat_alabo_103", _g = "_identityLine_alabo_110", fg = "_identity_alabo_110", vg = "_ownerLine_alabo_137", bg = "_link_alabo_150", gg = "_gateMark_alabo_156", pg = "_emptyChain_alabo_161", yg = "_arrow_alabo_167", Ng = "_muted_alabo_168", kg = "_define_alabo_173", $g = "_statValue_alabo_180", Cg = "_policyId_alabo_186", Sg = "_sub_alabo_191", g = {
  row: rg,
  name: lg,
  compactRow: og,
  compactName: ig,
  cell: sg,
  chain: cg,
  owner: dg,
  mono: ug,
  compactCell: mg,
  stack: hg,
  stat: wg,
  identityLine: _g,
  identity: fg,
  ownerLine: vg,
  link: bg,
  gateMark: gg,
  emptyChain: pg,
  arrow: yg,
  muted: Ng,
  define: kg,
  statValue: $g,
  policyId: Cg,
  sub: Sg
};
function At(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function Rg(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Tg(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Et(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function xg(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Et(e.members)}`;
}
function Lg(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(h, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: xg(e) })
  ] }) });
}
function It({ name: e, gate: a, look: t, size: r }) {
  return /* @__PURE__ */ o(R, { children: [
    a ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(h, { ...t, size: r, label: e }),
    a ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Ag(e, a, t) {
  if (e !== a) return { role: "soft" };
  const r = oa(t);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function Eg({ stages: e, streamStep: a }) {
  const t = e.findIndex((r) => r.gate === !0);
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((r, l) => /* @__PURE__ */ o("span", { className: g.link, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(It, { name: r.name, gate: r.gate === !0, look: Ag(l, t, a), size: "tag" })
  ] }, `${r.name}${l}`)) });
}
function Ig(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : Eg(e) });
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
function Mg(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function qg(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Bg({ stream: e, href: a, presentation: t }) {
  const r = Tg(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: At, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ve(e.streamStep, "chip") }, children: [
    Lg(e, a),
    Ig(e),
    In(qg(e.agents), e.agents === void 0 ? void 0 : Rg(e.agents), "—"),
    Mg(e.policy),
    In(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function jg(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function D0(e) {
  if (jg(e)) return Bg(e);
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
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const Pg = "_row_2u4ll_2", Dg = "_name_2u4ll_16", Hg = "_scope_2u4ll_24", Na = {
  row: Pg,
  name: Dg,
  scope: Hg
};
function ln(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Og(e) {
  return e === void 0 ? `${Na.row} ward-toolrow` : `${Na.row} ward-toolrow ${e}`;
}
function Fg(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Wg({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function zg({ classification: e }) {
  return /* @__PURE__ */ n(h, { role: e === "write" ? "write" : "meta", label: ln(e) });
}
function Kg({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${Na.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Gg(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function H0({ tool: e, onChange: a, presentation: t }) {
  const r = k(), l = k(), i = Fg(e, t), s = Gg(t);
  return /* @__PURE__ */ o(s, { className: Og(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Wg, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${Na.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Kg, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(zg, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const Ug = "_strip_1ay45_2", Vg = "_head_1ay45_10", Xg = "_name_1ay45_16", Yg = "_chart_1ay45_24", Jg = "_segment_1ay45_30", Qg = "_detailedChart_1ay45_36", Zg = "_rail_1ay45_49", ep = "_section_1ay45_55", ap = "_label_1ay45_66", np = "_note_1ay45_83", ee = {
  strip: Ug,
  head: Vg,
  name: Xg,
  chart: Yg,
  segment: Jg,
  detailedChart: Qg,
  rail: Zg,
  section: ep,
  label: ap,
  note: np
}, tp = "No item in flight to preview.", rp = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", lp = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", za = [1, 2, 3, 4, 5, 6], ka = 100;
function op(e, a) {
  return a.has(e) ? ve(e, "id") : "var(--ward-color-line)";
}
function ip({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: ee.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: za.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: ee.segment,
      x: l * ka,
      y: "0",
      width: ka,
      height: "8",
      fill: op(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function sp(e) {
  const a = e.slice(0, za.length);
  for (; a.length < za.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function cp({ identities: e }) {
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
function qt(e) {
  return (a) => e == null ? void 0 : e(a);
}
function da({ label: e, children: a }) {
  const t = k();
  return /* @__PURE__ */ o("section", { className: ee.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: ee.label, children: e }),
    a
  ] });
}
function dp({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: ee.note, children: a ?? tp }) : /* @__PURE__ */ n(Ea, { item: { ...e, streamStep: oa(t.streamStep) }, onOpen: qt(r), feed: null });
}
function up({ draft: e }) {
  const a = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: ee.head, style: a, children: [
    /* @__PURE__ */ n(qe, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
    /* @__PURE__ */ n(h, { ...xa(e.key, e.streamStep) })
  ] });
}
function mp(e) {
  const a = sp(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: ee.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(da, { label: "Board card", children: /* @__PURE__ */ n(dp, { ...e, draft: t }) }),
    /* @__PURE__ */ n(da, { label: "Streams index row", children: /* @__PURE__ */ n(up, { draft: t }) }),
    /* @__PURE__ */ o(da, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(cp, { identities: a }),
      /* @__PURE__ */ n("p", { className: ee.note, children: rp })
    ] }),
    /* @__PURE__ */ n(da, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: ee.note, children: lp }) })
  ] });
}
function hp({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: ee.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: ee.head, children: [
      /* @__PURE__ */ n(qe, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
      /* @__PURE__ */ n(h, { ...xa(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n(Ea, { item: { ...a, streamStep: e.streamStep }, onOpen: qt(r) }),
    /* @__PURE__ */ n(ip, { draft: e, streams: t })
  ] });
}
function O0(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(mp, { ...e }) : /* @__PURE__ */ n(hp, { ...e });
}
const wp = "_row_ixlg5_6", _p = "_headCell_ixlg5_10", fp = "_cell_ixlg5_11", vp = "_name_ixlg5_23", bp = "_consequence_ixlg5_29", gp = "_governed_ixlg5_36", pp = "_control_ixlg5_42", yp = "_byRole_ixlg5_48", Np = "_webControl_ixlg5_59", kp = "_webConsequence_ixlg5_65", $p = "_webGoverned_ixlg5_71", H = {
  row: wp,
  headCell: _p,
  cell: fp,
  name: vp,
  consequence: bp,
  governed: gp,
  control: pp,
  byRole: yp,
  webControl: Np,
  webConsequence: kp,
  webGoverned: $p
};
function Cp({
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
function Sp({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(Cp, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Rp(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Tp({ name: e, cell: a, onChange: t }) {
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
function xp({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ o("td", { className: H.cell, children: [
      /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${H.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(Tp, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webGoverned} ward-cellmeta`, children: Rp(e) }) })
  ] });
}
function F0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(xp, { ...e }) : /* @__PURE__ */ n(Sp, { ...e });
}
const Lp = "_row_vv64h_2", Ap = "_cell_vv64h_6", Ep = "_name_vv64h_25", Ip = "_note_vv64h_30", Mp = "_webName_vv64h_41", qp = "_webMeta_vv64h_47", U = {
  row: Lp,
  cell: Ap,
  name: Ep,
  note: Ip,
  webName: Mp,
  webMeta: qp
}, Bt = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function Bp(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function jp({ component: e, onRestart: a }) {
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
function Pp({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: Bp(e.state) });
}
function Dp({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: U.row, children: [
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n("span", { className: `${U.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n("span", { className: `${U.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(h, { ...Bt[e.state] }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(Pp, { component: e, onRestart: a }) })
  ] });
}
function W0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Dp, { ...e }) : /* @__PURE__ */ n(jp, { ...e });
}
const Hp = "_row_jcm5k_7", Op = "_cell_jcm5k_11", Fp = "_next_jcm5k_28", Wp = "_headCell_jcm5k_38", zp = "_webId_jcm5k_77", Kp = "_webPurpose_jcm5k_83", Gp = "_webMeta_jcm5k_91", Up = "_webUrgent_jcm5k_97", O = {
  row: Hp,
  cell: Op,
  next: Fp,
  headCell: Wp,
  webId: zp,
  webPurpose: Kp,
  webMeta: Gp,
  webUrgent: Up
}, Vp = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, Xp = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, jt = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Yp = Object.fromEntries(jt.map((e) => [e.key, e]));
function Ve({ column: e, children: a }) {
  const t = Yp[e];
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
function z0() {
  return /* @__PURE__ */ n("tr", { children: jt.map((e) => /* @__PURE__ */ n(
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
function Jp({ cred: e }) {
  const a = Vp[e.state];
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ n(Ve, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Ve, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Ve, { column: "state", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ve, { column: "cls", children: /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: ln(e.cls) }) }),
    /* @__PURE__ */ n(Ve, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Ve, { column: "next", children: /* @__PURE__ */ n("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Qp({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function Zp({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(Qp, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(h, { ...Xp[e.state] }) })
  ] });
}
function K0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Zp, { ...e }) : /* @__PURE__ */ n(Jp, { ...e });
}
const ey = "_card_17zba_2", ay = "_head_17zba_11", ny = "_env_17zba_18", ty = "_version_17zba_25", ry = "_meta_17zba_32", ly = "_webCard_17zba_37", oy = "_webRow_17zba_47", iy = "_webTitle_17zba_55", sy = "_webLine_17zba_65", cy = "_webVersion_17zba_72", dy = "_webMeta_17zba_77", G = {
  card: ey,
  head: ay,
  env: ny,
  version: ty,
  meta: ry,
  webCard: ly,
  webRow: oy,
  webTitle: iy,
  webLine: sy,
  webVersion: cy,
  webMeta: dy
}, Mn = { dev: "Dev", uat: "UAT", prod: "Prod" }, Pt = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function uy({ env: e }) {
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
function my(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function hy(e) {
  return /* @__PURE__ */ o("article", { className: `${G.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${G.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${G.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(h, { ...Pt[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${G.version} ${G.webVersion} ${G.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${G.meta} ${G.webMeta} ${G.webLine} ward-cellmeta`, children: my(e) })
  ] });
}
function G0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(hy, { ...e }) : /* @__PURE__ */ n(uy, { ...e });
}
const wy = "_panel_1hmja_2", _y = "_line_1hmja_8", fy = "_actions_1hmja_14", ua = {
  panel: wy,
  line: _y,
  actions: fy
};
function U0(e) {
  return /* @__PURE__ */ o("div", { className: ua.panel, children: [
    /* @__PURE__ */ n("p", { className: ua.line, children: e.status }),
    /* @__PURE__ */ n(I, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ua.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ua.line, children: e.note ?? "" })
  ] });
}
const vy = "_upload_13fcl_2", by = "_preview_13fcl_7", gy = "_mark_13fcl_17", py = "_empty_13fcl_22", yy = "_actions_13fcl_28", Ny = "_input_13fcl_33", ky = "_reasons_13fcl_41", $y = "_reason_13fcl_41", Cy = "_accepted_13fcl_57", te = {
  upload: vy,
  preview: by,
  mark: gy,
  empty: py,
  actions: yy,
  input: Ny,
  reasons: ky,
  reason: $y,
  accepted: Cy
}, Dt = 1.5, Ht = 22, $a = "script elements or event handlers", xe = "links or external references", $e = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Dt}px at ${Ht}px`], Sy = [$e[1], $e[2], $a, xe], Ry = /* @__PURE__ */ new Map([
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
]), Ty = "http://www.w3.org/2000/svg", xy = "http://www.w3.org/2000/xmlns/", Ly = /* @__PURE__ */ new Set([
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
]), Ay = /* @__PURE__ */ new Set([
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
]), on = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, Ey = /url\s*\(|['"\\]/i;
function Iy() {
  return { ok: !1, reasons: [$e[1]] };
}
function Ot(e) {
  return e.namespaceURI === Ty;
}
function My(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && Ot(a) ? a : null;
  } catch {
    return null;
  }
}
function qy(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [$e[0]] : [];
}
function By(e) {
  return Ry.get(e.localName) ?? (e.localName.startsWith("animate") ? xe : void 0);
}
function jy(e) {
  return Ey.test(e.replace(on, ""));
}
function Py(e) {
  return /^on/i.test(e.localName) ? $a : e.localName === "href" || jy(e.value) ? xe : void 0;
}
function Dy(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(By(t));
    for (const r of Array.from(t.attributes)) a.add(Py(r));
  }
  return Sy.filter((t) => a.has(t));
}
function Hy(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? Ht / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Dt;
  }) ? [$e[3]] : [];
}
function Oy(e) {
  if (e.namespaceURI === xy) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (Ay.has(a) || a.startsWith("stroke"));
}
function Fy(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && Ot(a) && Ly.has(a.localName);
}
function Wy(e, a) {
  Fy(a) ? a.nodeType === Node.ELEMENT_NODE && Ft(a) : e.removeChild(a);
}
function Ft(e) {
  for (const a of Array.from(e.attributes)) Oy(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) Wy(e, a);
  return e;
}
function zy(e) {
  return Array.from(e.matchAll(on), (a) => a[2]).filter((a) => a !== "");
}
function Ky(e) {
  let a = 2166136261;
  for (let t = 0; t < e.length; t += 1) a = Math.imul(a ^ e.charCodeAt(t), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function Gy(e, a) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of zy(l.value)) t.has(i) || t.set(i, `${a}-${t.size}`);
  return t;
}
function Uy(e, a) {
  for (const t of Array.from(e.attributes))
    t.value = t.value.replace(on, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function Vy(e, a) {
  const t = [e, ...Array.from(e.querySelectorAll("*"))], r = Gy(t, a);
  for (const l of t) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), Uy(l, r);
  }
  return e;
}
function V0(e) {
  const a = My(e);
  if (a === null) return Iy();
  const t = [...qy(a), ...Dy(a), ...Hy(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(Vy(Ft(a), Ky(e))) };
}
const Xy = "Mark accepted.", Yy = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Jy = new Set(zn.flatMap((e) => [ve(e, "id"), ve(e, "chip")]));
function Qy(e) {
  return e !== void 0 && (Yy.test(e) || Jy.has(e)) ? e : void 0;
}
function Zy({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: te.preview, style: { "--mark": Qy(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ n("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: te.empty }) });
}
function eN(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function aN(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function nN({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("p", { className: te.accepted, children: Xy }) }) : /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: te.reason, children: a }, a)) }) });
}
function tN({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(nN, { result: e }) : /* @__PURE__ */ n("p", { className: `${te.result} ${eN(e, t)}`, role: "status", children: aN(e, t) });
}
function qn(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function X0({ current: e, onUpload: a, onUseInitials: t, presentation: r, disabledReason: l }) {
  const i = w(null), [s, c] = p(null), u = (d) => {
    if (d === void 0) return;
    const m = a(d);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ n(Zy, { current: e }),
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
      /* @__PURE__ */ n(f, { ...qn(l), onClick: () => {
        var d;
        return (d = i.current) == null ? void 0 : d.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(f, { ...qn(l), variant: "ghost", onClick: t, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(tN, { result: s, presentation: r })
  ] });
}
const rN = "_row_o3t6y_7", lN = "_cell_o3t6y_11", oN = "_head_o3t6y_28", iN = "_name_o3t6y_34", sN = "_pinned_o3t6y_42", cN = "_headCell_o3t6y_49", dN = "_webName_o3t6y_88", uN = "_webMeta_o3t6y_95", mN = "_webWarn_o3t6y_103", B = {
  row: rN,
  cell: lN,
  head: oN,
  name: iN,
  pinned: sN,
  headCell: cN,
  webName: dN,
  webMeta: uN,
  webWarn: mN
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
], hN = Object.fromEntries(Wt.map((e) => [e.key, e]));
function wN(e, a) {
  return `mcp.${e}.${a}`;
}
function _N(e) {
  return Object.keys(sn).includes(e);
}
function fN(e) {
  return sn[e !== void 0 && _N(e) ? e : "unknown"];
}
function ea({ column: e, children: a }) {
  const t = hN[e];
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
function Y0() {
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
function vN({ server: e }) {
  const a = sn[e.connection];
  return /* @__PURE__ */ o("tr", { className: B.row, children: [
    /* @__PURE__ */ o(ea, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: B.head, children: [
        /* @__PURE__ */ n("span", { className: B.name, children: e.name }),
        /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: ln(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: B.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(ea, { column: "connection", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(ea, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(ea, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(ea, { column: "tools", children: e.tools.map((t) => wN(e.name, t)).join(" · ") })
  ] });
}
function bN(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function gN(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function pN({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${B.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${B.webMeta} ward-cellmeta`, children: e });
}
function yN({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${B.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function NN({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(f, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function kN({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: B.row, children: [
    /* @__PURE__ */ o("td", { className: B.cell, children: [
      /* @__PURE__ */ n("span", { className: `${B.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${B.webMeta} ward-cellmeta`, children: bN(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: B.cell, children: /* @__PURE__ */ n("span", { className: `${B.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: B.cell, children: /* @__PURE__ */ n(h, { ...gN(e) }) }),
    /* @__PURE__ */ n("td", { className: B.cell, children: /* @__PURE__ */ n(pN, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: B.cell, children: /* @__PURE__ */ n(h, { ...fN(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: B.cell, children: [
      /* @__PURE__ */ n(yN, { server: e, onRestart: a }),
      /* @__PURE__ */ n(NN, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function J0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(kN, { ...e }) : /* @__PURE__ */ n(vN, { ...e });
}
const $N = "_row_1ibo7_2", CN = "_headCell_1ibo7_14", SN = "_cell_1ibo7_15", RN = "_name_1ibo7_26", TN = "_consequence_1ibo7_32", xN = "_reason_1ibo7_38", LN = "_value_1ibo7_44", AN = "_webRow_1ibo7_60", EN = "_webSetting_1ibo7_73", IN = "_webName_1ibo7_81", MN = "_webConsequence_1ibo7_89", qN = "_webControl_1ibo7_95", BN = "_webState_1ibo7_109", jN = "_webChip_1ibo7_114", E = {
  row: $N,
  headCell: CN,
  cell: SN,
  name: RN,
  consequence: TN,
  reason: xN,
  value: LN,
  webRow: AN,
  webSetting: EN,
  webName: IN,
  webConsequence: MN,
  webControl: qN,
  webState: BN,
  webChip: jN
}, zt = 104, Kt = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function PN({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(ze, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(ot, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: E.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function DN({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = k(), i = Kt[t], s = t === "locked";
  return /* @__PURE__ */ o("tr", { className: E.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: E.headCell, children: [
      /* @__PURE__ */ n("span", { className: E.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: E.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: E.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: E.cell, children: /* @__PURE__ */ n(PN, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: E.cell, style: { width: zt }, children: /* @__PURE__ */ n(h, { role: i.role, label: i.label }) })
  ] });
}
function Gt(e, a) {
  return String(e ?? a);
}
function HN(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function ON(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Gt(e.value, "—");
}
function FN({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: E.webControl, children: [
    /* @__PURE__ */ n(ze, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: E.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function WN(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(FN, { ...e });
  const l = HN(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: E.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(ot, { options: l, value: Gt(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${E.webControl} ${E.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: ON(a) });
}
function zN({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const s = k(), c = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${E.row} ${E.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: E.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${E.name} ${E.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${E.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: E.webControl, children: i(s) }) : /* @__PURE__ */ n(WN, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${E.webChip} ward-policy-chip`, style: { width: zt }, children: /* @__PURE__ */ n(h, { ...Kt[t], size: "tag" }) })
  ] });
}
function Q0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(zN, { ...e }) : /* @__PURE__ */ n(DN, { ...e });
}
const KN = "_label_vm9hq_7", GN = "_name_vm9hq_15", UN = "_column_vm9hq_24", VN = "_webFrame_vm9hq_57", XN = "_webHead_vm9hq_62", YN = "_webHeadLabel_vm9hq_74", JN = "_webLabel_vm9hq_112", QN = "_webColumns_vm9hq_119", ZN = "_webGroup_vm9hq_125", ek = "_webPeople_vm9hq_126", ak = "_webVia_vm9hq_127", nk = "_webMeta_vm9hq_156", F = {
  label: KN,
  name: GN,
  column: UN,
  webFrame: VN,
  webHead: XN,
  webHeadLabel: YN,
  webLabel: JN,
  webColumns: QN,
  webGroup: ZN,
  webPeople: ek,
  webVia: ak,
  webMeta: nk
}, tk = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, ja = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Pa({ column: e, children: a }) {
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
function rk(e) {
  if (!e.matrixRole) return;
  const a = tk[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function lk({ node: e }) {
  const a = rk(e);
  return /* @__PURE__ */ o("span", { className: F.label, children: [
    /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
    /* @__PURE__ */ n(ok, { role: a, node: e }),
    /* @__PURE__ */ n(Pa, { column: ja[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Pa, { column: ja[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Pa, { column: ja[2], children: e.requestedVia ?? "" })
  ] });
}
function ok({ role: e, node: a }) {
  return /* @__PURE__ */ o(R, { children: [
    e && /* @__PURE__ */ n(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ n(h, { role: "warn", label: "Unresolved" })
  ] });
}
function ik({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: s }) {
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
      label: /* @__PURE__ */ n(lk, { node: t }),
      children: s
    }
  );
}
function Da({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function sk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Da, { className: `${F.webMeta} ${F.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Da, { className: `${F.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Da, { className: `${F.webMeta} ${F.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function ck() {
  return /* @__PURE__ */ o("div", { className: F.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: F.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: F.webColumns, children: [
      /* @__PURE__ */ n("span", { className: F.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: F.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: F.webVia, children: "Requested via" })
    ] })
  ] });
}
function dk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function uk(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function mk({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: F.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(ck, {}),
    /* @__PURE__ */ n(Xd, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      ut,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(dk, { row: t }),
        detail: /* @__PURE__ */ n(sk, { row: t }),
        expanded: uk(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function Z0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(mk, { ...e }) : /* @__PURE__ */ n(ik, { ...e });
}
const hk = "_runbook_b9agc_2", wk = "_list_b9agc_7", _k = "_step_b9agc_15", fk = "_numeral_b9agc_21", vk = "_body_b9agc_28", bk = "_head_b9agc_34", gk = "_title_b9agc_40", pk = "_detail_b9agc_45", yk = "_actions_b9agc_50", Nk = "_webList_b9agc_56", kk = "_webStep_b9agc_60", $k = "_webBody_b9agc_66", Ck = "_webTitle_b9agc_74", Sk = "_webDetail_b9agc_78", x = {
  runbook: hk,
  list: wk,
  step: _k,
  numeral: fk,
  body: vk,
  head: bk,
  title: gk,
  detail: pk,
  actions: yk,
  webList: Nk,
  webStep: kk,
  webBody: $k,
  webTitle: Ck,
  webDetail: Sk
}, Ut = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Vt(e) {
  return String(e + 1).padStart(2, "0");
}
function Rk({ step: e, index: a, connection: t }) {
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
function Tk({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: x.runbook, children: [
    /* @__PURE__ */ n("ol", { className: x.list, children: e.map((r, l) => /* @__PURE__ */ n(Rk, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: x.actions, children: a })
  ] });
}
function xk({ step: e, index: a, connection: t }) {
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
function Lk({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: x.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${x.list} ${x.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(xk, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${x.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function eS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Lk, { ...e }) : /* @__PURE__ */ n(Tk, { ...e });
}
const Ak = "_list_1gu6a_2", Ek = "_check_1gu6a_10", Ik = "_body_1gu6a_16", Mk = "_text_1gu6a_23", qk = "_pending_1gu6a_32", Bk = "_measured_1gu6a_37", Ye = {
  list: Ak,
  check: Ek,
  body: Ik,
  text: Mk,
  pending: qk,
  measured: Bk
};
function jk(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function Pk({ check: e }) {
  const a = jk(e.passed);
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
function aS({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Ye.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Pk, { check: a }, a.text)) });
}
const Dk = "_root_a6xzy_2", Hk = "_list_a6xzy_10", Ok = "_line_a6xzy_21", Fk = "_at_a6xzy_48", Wk = "_text_a6xzy_52", zk = "_foot_a6xzy_56", Kk = "_idle_a6xzy_68", Gk = "_caret_a6xzy_76", Uk = "_jump_a6xzy_83", he = {
  root: Dk,
  list: Hk,
  line: Ok,
  at: Fk,
  text: Wk,
  foot: zk,
  idle: Kk,
  caret: Gk,
  jump: Uk
}, Vk = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function cn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : Vk.format(new Date(e));
}
const Xk = { warn: "warning", ok: "ok" };
function Yk({ kind: e }) {
  const a = Xk[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Jk({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${cn(e)}` });
}
function Qk({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${cn(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: he.idle, children: i }),
    /* @__PURE__ */ n(Jk, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const Zk = 8;
function e1(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > Zk;
}
function a1({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const Xt = Me(null);
function nS({ announce: e, onAnnounceChange: a, children: t }) {
  const [r, l] = p(!1), i = Hn(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ n(Xt.Provider, { value: i, children: t });
}
function n1() {
  const e = Ie(Xt), [a, t] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, t];
}
function tS({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = w(null), [i, s] = p(0), [c, u] = n1(), [d, m] = p(!1), v = e.at(-1);
  S(() => {
    s(e.length);
  }, [e.length]), Ua(() => {
    const y = l.current;
    y && !d && (y.scrollTop = y.scrollHeight);
  }, [e.length, d]);
  const b = () => {
    var q;
    const y = l.current;
    if (!y) return;
    const A = y.querySelectorAll("[data-consline-text]");
    (q = A.item(A.length - 1)) == null || q.focus(), m(!1);
  };
  return /* @__PURE__ */ o("div", { className: he.root, children: [
    /* @__PURE__ */ n("ol", { className: he.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (y) => m(e1(y.currentTarget)), children: e.map((y, A) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": A < i, children: [
      /* @__PURE__ */ n("span", { className: he.at, children: cn(y.at) }),
      /* @__PURE__ */ n(Yk, { kind: y.kind }),
      /* @__PURE__ */ n("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${A}`)) }),
    /* @__PURE__ */ o(Qk, { connection: a, idleSince: t, last: v, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => u(!c), children: "Read new events" }),
      /* @__PURE__ */ n(a1, { shown: d, onJump: b })
    ] })
  ] });
}
const t1 = "_row_1k8wl_2", r1 = "_head_1k8wl_14", l1 = "_author_1k8wl_20", o1 = "_eta_1k8wl_25", i1 = "_edited_1k8wl_26", s1 = "_body_1k8wl_32", c1 = "_reason_1k8wl_37", d1 = "_actions_1k8wl_42", pe = {
  row: t1,
  head: r1,
  author: l1,
  eta: o1,
  edited: i1,
  body: s1,
  reason: c1,
  actions: d1
}, u1 = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function m1(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function h1({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function w1({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: pe.reason, id: a, children: e })
  ] });
}
function _1(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function f1(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(h1, { ...e }) : /* @__PURE__ */ n(w1, { reason: e.unavailable, reasonId: e.unavailableId });
}
function rS(e) {
  const { comment: a } = e;
  _1(e);
  const t = k(), r = `${t}-unavailable`, l = u1[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${pe.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: pe.head, children: [
      /* @__PURE__ */ n("span", { className: pe.author, children: a.author }),
      /* @__PURE__ */ n(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: pe.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: pe.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: pe.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: pe.reason, id: t, children: m1(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: pe.actions, children: /* @__PURE__ */ n(f1, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const v1 = "_root_c46wj_2", b1 = "_attach_c46wj_11", g1 = "_actions_c46wj_17", p1 = "_reply_c46wj_23", y1 = "_replyRow_c46wj_28", N1 = "_sendsAs_c46wj_42", Ze = {
  root: v1,
  attach: b1,
  actions: g1,
  reply: p1,
  replyRow: y1,
  sendsAs: N1
};
function Yt({ value: e, onChange: a }) {
  const [t, r] = p("");
  return e === void 0 ? [t, r] : [e, a ?? (() => {
  })];
}
function k1(e) {
  const { placeholder: a, asUser: t, onPost: r } = e, [l, i] = Yt(e), s = k();
  return /* @__PURE__ */ o("div", { className: Ze.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ze.replyRow, children: [
      /* @__PURE__ */ n(I, { variant: "reply", labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ n(f, { variant: "ghost", describedBy: s, onClick: () => r(t, l), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Ze.sendsAs, children: `Sends as ${t}.` })
  ] });
}
function lS(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(k1, { ...e }) : /* @__PURE__ */ n($1, { ...e });
}
function $1(e) {
  const { placeholder: a, asUser: t, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, u] = Yt(e);
  return /* @__PURE__ */ o("div", { className: Ze.root, children: [
    /* @__PURE__ */ n(I, { kind: "textarea", label: a, value: c, onChange: u }),
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
const C1 = "_list_1yhks_2", S1 = "_item_1yhks_6", R1 = "_body_1yhks_22", T1 = "_text_1yhks_28", x1 = "_evidence_1yhks_37", L1 = "_consequence_1yhks_49", A1 = "_note_1yhks_54", Fe = {
  list: C1,
  item: S1,
  body: R1,
  text: T1,
  evidence: x1,
  consequence: L1,
  note: A1
};
function E1({ criterion: e }) {
  return /* @__PURE__ */ n(qe, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Bn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function I1(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function M1({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Fe.body, children: [
    /* @__PURE__ */ n("span", { className: Fe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ n(Bn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Fe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ n(Bn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Fe.consequence, children: I1(e.why) })
    ] })
  ] });
}
function q1({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Fe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(E1, { criterion: e }),
    /* @__PURE__ */ n(M1, { criterion: e })
  ] });
}
function oS({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Fe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(q1, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Fe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const B1 = "_list_dwhoz_2", j1 = "_rung_dwhoz_6", P1 = "_name_dwhoz_18", D1 = "_actor_dwhoz_32", wa = {
  list: B1,
  rung: j1,
  name: P1,
  actor: D1
}, H1 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function O1({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = H1[e.state];
  return /* @__PURE__ */ o("li", { className: wa.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: wa.name, children: e.name }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${wa.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function iS({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${wa.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(O1, { rung: a }, a.name)) });
}
const F1 = "_sheet_pw37w_2", W1 = "_title_pw37w_9", z1 = "_stage_pw37w_15", K1 = "_effects_pw37w_20", G1 = "_effect_pw37w_20", U1 = "_numeral_pw37w_31", V1 = "_effectText_pw37w_38", X1 = "_refusals_pw37w_43", Y1 = "_reasons_pw37w_52", J1 = "_reason_pw37w_52", Q1 = "_actions_pw37w_62", ue = {
  sheet: F1,
  title: W1,
  stage: z1,
  effects: K1,
  effect: G1,
  numeral: U1,
  effectText: V1,
  refusals: X1,
  reasons: Y1,
  reason: J1,
  actions: Q1
};
function Z1({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(f, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function sS({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = k(), u = `${c}-refusal`, [d, m] = p(""), v = t.length > 0;
  return /* @__PURE__ */ n(ia, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
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
      Ic,
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
      /* @__PURE__ */ n(Z1, { refused: v, reasonId: u, note: d, onRequeue: l }),
      /* @__PURE__ */ n(f, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const e$ = "_list_1rowi_2", a$ = "_path_1rowi_7", n$ = "_head_1rowi_21", t$ = "_label_1rowi_28", r$ = "_consequence_1rowi_35", l$ = "_ask_1rowi_36", Qe = {
  list: e$,
  path: a$,
  head: n$,
  label: t$,
  consequence: r$,
  ask: l$
}, Ka = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function jn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Pn(e) {
  return e ? "primary" : "secondary";
}
function o$({ path: e, primary: a, onChoose: t }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ n(f, { variant: Pn(a), size: "sm", onClick: () => t(e.kind), children: Ka[e.kind] }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(f, { variant: Pn(a), size: "sm", disabled: !0, describedBy: r, children: Ka[e.kind] }),
    /* @__PURE__ */ n("span", { className: Qe.ask, id: r, children: e.askInstead })
  ] });
}
function i$({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Qe.path, "data-allowed": e.allowed, "data-role": jn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Qe.head, children: [
      /* @__PURE__ */ n("span", { className: Qe.label, children: e.title ?? Ka[e.kind] }),
      /* @__PURE__ */ n(h, { role: jn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Qe.consequence, children: e.consequence }),
    /* @__PURE__ */ n(o$, { path: e, primary: a, onChoose: t })
  ] });
}
function cS({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Qe.list, children: e.map((t, r) => /* @__PURE__ */ n(i$, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const s$ = "_list_1m7i0_2", c$ = "_item_1m7i0_6", d$ = "_node_1m7i0_18", u$ = "_body_1m7i0_24", m$ = "_head_1m7i0_30", h$ = "_stage_1m7i0_36", w$ = "_version_1m7i0_41", _$ = "_sentence_1m7i0_49", f$ = "_meta_1m7i0_54", Ne = {
  list: s$,
  item: c$,
  node: d$,
  body: u$,
  head: m$,
  stage: h$,
  version: w$,
  sentence: _$,
  meta: f$
}, v$ = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function b$({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ne.head, children: [
    /* @__PURE__ */ n("span", { className: Ne.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Ne.version, title: e.version, children: e.version }) : null
  ] });
}
function g$({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ne.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Ne.node} ward-history-node`, children: /* @__PURE__ */ n(qe, { size: 9, kind: v$[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ne.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(b$, { entry: e }),
      /* @__PURE__ */ n("span", { className: Ne.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ne.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function dS({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Ne.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(g$, { entry: a }, a.stage + String(t))) });
}
const p$ = "_thread_1e70p_3", y$ = "_turn_1e70p_8", N$ = "_who_1e70p_27", k$ = "_body_1e70p_32", _a = {
  thread: p$,
  turn: y$,
  who: N$,
  body: k$
}, Jt = Me(!1);
function uS({ children: e, density: a }) {
  return /* @__PURE__ */ n(Jt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${_a.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function mS({ turn: e }) {
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
const $$ = "_list_yiolt_3", C$ = "_row_yiolt_7", S$ = "_label_yiolt_20", R$ = "_n_yiolt_26", T$ = "_cause_yiolt_33", na = {
  list: $$,
  row: C$,
  label: S$,
  n: R$,
  cause: T$
};
function x$(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const L$ = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function A$({ row: e, formatNumber: a }) {
  return x$(e), /* @__PURE__ */ o("li", { className: `${na.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(qe, { size: 8, ...L$[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: na.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${na.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(E$, { cause: e.cause })
  ] });
}
function E$({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${na.cause} ward-healthrow-cause`, children: e }) : null;
}
function hS({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${na.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(A$, { row: t, formatNumber: a }, t.label)) });
}
const I$ = "_root_1jxwp_2", M$ = {
  root: I$
};
function wS({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: M$.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ia, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(f, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const q$ = "_row_dhbre_3", B$ = "_key_dhbre_13", j$ = "_stack_dhbre_24", P$ = "_value_dhbre_32", D$ = "_evidence_dhbre_39", H$ = "_mark_dhbre_47", Xe = {
  row: q$,
  key: B$,
  stack: j$,
  value: P$,
  evidence: D$,
  mark: H$
};
function O$({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(Za, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function _S({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(O$, { state: e.state }) })
  ] });
}
const F$ = "_cell_gh2sd_2", W$ = {
  cell: F$
}, z$ = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function K$(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function G$(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function U$(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: K$(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function V$(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function fS({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  G$(e, t);
  const r = V$(e);
  return /* @__PURE__ */ n(
    Uc,
    {
      label: "Rejection routing",
      columns: z$,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: W$.cell, "data-norerun": l.noRerun ? !0 : void 0, children: U$(l, i) }),
      empty: a ?? /* @__PURE__ */ n(Mu, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const X$ = "_row_1f2re_2", Y$ = "_title_1f2re_12", J$ = "_turns_1f2re_18", Q$ = "_waiting_1f2re_19", Z$ = "_resolved_1f2re_20", eC = "_activity_1f2re_21", aC = "_cost_1f2re_28", nC = "_link_1f2re_29", tC = "_tableLink_1f2re_47", rC = "_tableRecord_1f2re_48", lC = "_tableRow_1f2re_59", oC = "_tableTitle_1f2re_71", iC = "_tableResolved_1f2re_76", sC = "_tableMeta_1f2re_87", cC = "_tableCost_1f2re_94", dC = "_tableActivity_1f2re_95", uC = "_tableState_1f2re_105", D = {
  row: X$,
  title: Y$,
  turns: J$,
  waiting: Q$,
  resolved: Z$,
  activity: eC,
  cost: aC,
  link: nC,
  tableLink: tC,
  tableRecord: rC,
  tableRow: lC,
  tableTitle: oC,
  tableResolved: iC,
  tableMeta: sC,
  tableCost: cC,
  tableActivity: dC,
  tableState: uC
}, Qt = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function mC(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function hC(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function wC(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const _C = { duplicate: "Closed · duplicate" };
function fC({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(Ee, { className: D.tableMeta, text: `waiting on ${e}` });
}
function vC({ value: e }) {
  return /* @__PURE__ */ n("td", { className: D.tableCost, children: e === void 0 ? null : re(e) });
}
function bC({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${D.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function gC({ session: e, href: a }) {
  const t = Qt[e.state];
  return /* @__PURE__ */ o("tr", { className: D.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: D.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${D.tableLink} ward-target`, href: W(a), children: /* @__PURE__ */ n(Ee, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: D.tableMeta, children: hC(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: D.tableResolved, children: [
      wC(e.resolved),
      /* @__PURE__ */ n(fC, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(vC, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: D.tableActivity, children: mC(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: D.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(h, { role: t.role, label: _C[e.state] ?? t.label }),
      /* @__PURE__ */ n(bC, { link: e.link })
    ] }) })
  ] });
}
function pC({ session: e }) {
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
function vS(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(gC, { session: e.session, href: e.href }) : /* @__PURE__ */ n(pC, { session: e.session });
}
const yC = "_block_1yy2v_3", NC = "_list_1yy2v_9", kC = "_line_1yy2v_14", Ga = {
  block: yC,
  list: NC,
  line: kC
}, $C = { warn: "warning", ok: "ok" };
function CC({ kind: e }) {
  const a = $C[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function SC({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Ga.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(CC, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function bS({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Ga.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Ga.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(SC, { line: t }, `${r}-${t.text}`)) }) });
}
const RC = "_band_tt7hp_1", TC = "_head_tt7hp_8", xC = "_cell_tt7hp_19", LC = "_index_tt7hp_35", AC = "_title_tt7hp_42", EC = "_note_tt7hp_48", IC = "_cellTitle_tt7hp_53", MC = "_cellBody_tt7hp_58", qC = "_tag_tt7hp_64", ge = {
  band: RC,
  head: TC,
  cell: xC,
  index: LC,
  title: AC,
  note: EC,
  cellTitle: IC,
  cellBody: MC,
  tag: qC
}, Dn = 4;
function gS({ index: e, title: a, note: t, cells: r }) {
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
  l0 as ActionStack,
  tS as ActivityConsole,
  Vw as AgentCard,
  VC as AppShell,
  O0 as AppearanceStrip,
  gS as Band,
  n0 as BarChart,
  _m as BoardColumn,
  p0 as BoardFootnote,
  y0 as BoardHeader,
  m0 as BoardScroller,
  f as Btn,
  zC as CHIP_ROLES,
  jt as CREDENTIAL_COLUMNS,
  a0 as Callout,
  F0 as CapabilityRow,
  mS as ChatMessage,
  Un as Checkbox,
  h as Chip,
  Ee as ClampText,
  rS as ClarificationRow,
  A0 as ClauseRuleRow,
  L0 as ClauseRules,
  vt as ColourLadder,
  W0 as ComponentRow,
  lS as Composer,
  k0 as ConfigRow,
  N0 as ConfigRowHead,
  en as ConnectionMark,
  nS as ConsoleAnnounceProvider,
  uS as Conversation,
  Ic as CostMeter,
  K0 as CredentialRow,
  z0 as CredentialRowHead,
  oS as CriteriaList,
  Vl as Crumb,
  hS as DeliveryHealth,
  _0 as DeniedState,
  I0 as DryRunRail,
  Mu as EmptyState,
  G0 as EnvCard,
  I as Field,
  w0 as FilteredEmpty,
  d0 as FormStack,
  Ia as GateChecklist,
  iS as GateLadder,
  Uc as Grid,
  q0 as HandoffRuleRow,
  M0 as HandoffRules,
  $0 as ItemDrawer,
  U0 as KeyPanel,
  _r as LIVE_EVENT_TYPES,
  fw as LegacyBoardColumn,
  S0 as LegacyBoardHeader,
  R0 as LegacyConfigRow,
  x0 as LegacyItemDrawer,
  cw as LegacyOverCapNote,
  T0 as LegacyPreviewRail,
  wt as LegacyWorkCard,
  Se as LiveIndicator,
  f0 as LoadFailed,
  g0 as Loading,
  Wt as MCP_SERVER_COLUMNS,
  Za as Mark,
  X0 as MarkUpload,
  qe as Marker,
  J0 as McpServerRow,
  Y0 as McpServerRowHead,
  YC as Menu,
  XC as MenuButton,
  B0 as NewStreamModal,
  ju as OverCapNote,
  ia as Overlay,
  E0 as PARTIAL_STEP_REASON,
  zt as POLICY_CHIP_WIDTH,
  i0 as PageFrame,
  e0 as PageHeader,
  t0 as PlainList,
  Q0 as PolicyRow,
  C0 as PreviewRail,
  ja as ROLE_MATRIX_COLUMNS,
  xt as RULE_ACTIONS,
  st as Radio,
  wS as ReadyChecklist,
  c0 as RecordSection,
  sS as RequeueSheet,
  cS as ResolveBlock,
  _S as ResolvedFieldRow,
  Z0 as RoleMatrixRow,
  fS as RoutingTable,
  j0 as RuleRow,
  eS as RunbookSteps,
  wr as STREAM_STEPS,
  u0 as SectionBand,
  kn as SectionHeader,
  ot as SegmentedControl,
  et as Select,
  vS as SessionRow,
  ZC as Sidebar,
  P0 as StageColumn,
  h0 as StageGrid,
  dS as StageHistory,
  Lv as StageListEditor,
  v0 as StaleStrip,
  La as StatStrip,
  D0 as StreamRow,
  s0 as SubjectRail,
  ze as Switch,
  QC as TabLinks,
  r0 as TableHead,
  JC as Tabs,
  H0 as ToolRow,
  o0 as TopBar,
  Xd as Tree,
  ut as TreeRow,
  bS as TypedInputBlock,
  ul as UNSAFE_HREF,
  aS as ValidationList,
  DC as VisibilityProvider,
  HC as Visible,
  WC as WARD_VERSION,
  Ea as WorkCard,
  b0 as WriteUnavailableStrip,
  mC as agoSince,
  or as clock,
  Uv as colourStatus,
  ae as count,
  ce as duration,
  Va as elapsed,
  FC as eventSourceTransport,
  Sa as isStreamStep,
  Ra as isValidatedStreamStep,
  $_ as ladderValidation,
  fN as mcpConnectionChip,
  wN as mcpToolName,
  re as money,
  we as ms,
  mt as ordered,
  Fn as ratio,
  Bp as restartLabel,
  W as safeHref,
  de as stamp,
  Kn as stream,
  GC as streamChip,
  xa as streamChipProps,
  ve as streamColour,
  vr as streamHex,
  KC as streamVars,
  ma as useBorderFlash,
  ur as useFocusTrap,
  UC as useLiveFeed,
  OC as useReturnFocus,
  Ca as useRovingTabindex,
  Xa as useTicker,
  ir as useVisible,
  z as v,
  V0 as validateMark,
  oa as validatedStep,
  zn as validatedStreamSteps
};
