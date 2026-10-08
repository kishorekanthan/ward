import { jsx as n, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as Pn, useContext as De, createContext as We, useCallback as J, useEffect as R, useState as p, useRef as f, useLayoutEffect as Ga, useId as k, isValidElement as Kt, Children as Gt, Fragment as Ut } from "react";
import { flushSync as Vt, createPortal as Xt } from "react-dom";
function se(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const sn = (e) => String(e).padStart(2, "0");
function Ua(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${sn(a % 60)}s` : `${Math.floor(t / 60)}h ${sn(t % 60)}m`;
}
const Yt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = Yt.formatToParts(new Date(e)), t = (r) => {
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
function Hn(e, a) {
  return `${e} / ${a}`;
}
const Jt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Qt(e) {
  return Jt.format(new Date(e));
}
const Fn = We(/* @__PURE__ */ new Set());
function sC({ hidden: e, children: a }) {
  const t = Pn(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Fn.Provider, { value: t, children: a });
}
function Zt(e) {
  return !De(Fn).has(e);
}
function dC({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(S, { children: Zt(e) ? a : t });
}
const er = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function ar(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function nr(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = ar(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function tr(e) {
  return { onKeyDown: J(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(er));
      nr(t, e.current, r);
    },
    [e]
  ) };
}
function uC(e, a = !0) {
  R(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const dn = { ArrowUp: -1, ArrowDown: 1 }, un = { ArrowLeft: -1, ArrowRight: 1 }, rr = (e, a, t) => Math.min(t, Math.max(a, e));
function lr(e, a) {
  if (a !== "horizontal" && e in dn) return dn[e];
  if (a !== "vertical" && e in un) return un[e];
}
function ka({ orientation: e = "both" } = {}) {
  const [a, t] = p(0), r = f(/* @__PURE__ */ new Map()), l = f(!1);
  Ga(() => {
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
      const v = Math.max(0, m.indexOf(a)), b = lr(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(m[rr(v + b, 0, m.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(m[0])) : d.key === "End" && (d.preventDefault(), c(m[m.length - 1]));
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
const mC = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, hC = "0.2.0", wC = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], or = [1, 2, 3, 4, 5, 6], On = [1, 2, 3], ir = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], W = {
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
function Dn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function $a(e) {
  return or.includes(e);
}
function Ca(e) {
  return On.includes(e);
}
function _C(e) {
  if (!$a(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function fC(e) {
  if (!$a(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const cr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function sr(e) {
  if (!$a(e)) throw new Error("unvalidated stream step");
  return cr[e];
}
function mn(e) {
  return typeof e != "string" ? null : ir.includes(e) ? e : null;
}
function dr(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function ur(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function mr(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function hr(e, a, t) {
  const r = dr(e);
  if (r === null) return null;
  const l = mn(t) ?? mn(r.type);
  return l === null ? null : { ...r, type: l, id: ur(r, a), at: mr(r) };
}
function wr(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function _r(e, a, t) {
  return e >= we.heartbeat && !a && t !== null;
}
function vC(e, a) {
  const [t, r] = p("reconnecting"), [l, i] = p(null), c = f(/* @__PURE__ */ new Map()), s = f(0), u = f(""), d = f(0), m = f(null), v = f(0), b = f(0), y = f(!1), A = f("reconnecting"), B = J((C) => {
    A.current = C, r(C);
  }, []), oe = J(() => {
    s.current = Date.now();
  }, []), Se = J((C) => {
    for (const [K, be] of c.current)
      (be === "*" || C.itemKey === be) && K(C);
  }, []), ne = J(() => {
    m.current = a(e, { lastEventId: u.current }, {
      onEvent: (C, K, be) => {
        const Ie = hr(C, K, be);
        Ie !== null && (Ie.id && (u.current = Ie.id), oe(), y.current = !1, B("live"), i(Ie.at), Se(Ie));
      },
      onOpen: () => {
        d.current = 0, y.current = !1, oe(), B("live");
      },
      onError: () => {
        var K;
        (K = m.current) == null || K.close(), m.current = null, y.current = !0, A.current !== "stale" && B("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** d.current, we.reconnectMax);
        d.current += 1, v.current = window.setTimeout(ne, C);
      }
    });
  }, [Se, B, oe, a, e]), ze = J((C) => {
    y.current = !0, C.close(), m.current = null, v.current = window.setTimeout(ne, we.reconnectBase);
  }, [ne]), Ke = J((C, K) => (c.current.set(K, C), () => {
    c.current.delete(K);
  }), []);
  return R(() => (ne(), b.current = window.setInterval(() => {
    const C = Date.now() - s.current, K = wr(C, A.current);
    K && B(K);
    const be = m.current;
    _r(C, y.current, be) && ze(be);
  }, we.tick), () => {
    var C;
    window.clearInterval(b.current), window.clearTimeout(v.current), y.current = !1, (C = m.current) == null || C.close(), m.current = null;
  }), [ne, ze, B]), { connection: t, lastEventAt: l, subscribe: Ke };
}
function Va(e, a) {
  const t = new Date(e).getTime(), [r, l] = p(() => Date.now());
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
  }, [a, t]), Math.max(0, r - t);
}
const hn = { blue: "running", orange: "waiting", green: "done" };
function fr() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function wn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function da(e, a) {
  const t = f(0), r = J((l) => {
    const i = l ?? a, c = e.current;
    c !== null && i !== void 0 && (fr() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${hn[i]})`), c.style.setProperty("--flash", `var(--ward-color-${hn[i]})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => wn(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => wn(c), we.flash)));
  }, [a, e]);
  return R(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const vr = "_root_1otpc_2", br = {
  root: vr
};
function gr(e, a, t, r, l) {
  const i = [Ua(a)];
  return e || i.push(`as of ${Qt(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Ce({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = Va(e, l), c = (a == null ? void 0 : a.at) ?? e, s = gr(l, i, c, r, a);
  return /* @__PURE__ */ o("span", { className: `${br.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const pr = "_app_13ufi_1", yr = "_side_13ufi_18", Nr = "_main_13ufi_26", kr = "_rail_13ufi_33", $r = "_page_13ufi_40", Cr = "_root_13ufi_91", Sr = "_topbar_13ufi_98", Rr = "_mark_13ufi_109", Tr = "_brand_13ufi_116", xr = "_tagline_13ufi_122", Lr = "_identity_13ufi_128", Ar = "_tools_13ufi_129", Er = "_nav_13ufi_139", Ir = "_metadata_13ufi_146", Mr = "_actor_13ufi_161", Br = "_detail_13ufi_162", jr = "_content_13ufi_222", qr = "_toolsPanel_13ufi_238", Pr = "_skip_13ufi_264", M = {
  app: pr,
  side: yr,
  main: Nr,
  rail: kr,
  page: $r,
  root: Cr,
  topbar: Sr,
  mark: Rr,
  brand: Tr,
  tagline: xr,
  identity: Lr,
  tools: Ar,
  nav: Er,
  metadata: Ir,
  actor: Mr,
  detail: Br,
  content: jr,
  toolsPanel: qr,
  skip: Pr
}, Hr = "_btn_tzr89_2", Fr = "_primary_tzr89_14", Or = "_destructive_tzr89_25", Dr = "_secondary_tzr89_35", Wr = "_ghost_tzr89_40", zr = "_overflow_tzr89_49", Kr = "_sm_tzr89_56", Gr = "_disabled_tzr89_60", oa = {
  btn: Hr,
  primary: Fr,
  destructive: Or,
  secondary: Dr,
  ghost: Wr,
  overflow: zr,
  sm: Kr,
  disabled: Gr
};
function Ur(e, a, t, r) {
  const l = a === "sm" ? [oa.sm, "ward-btn--sm"] : [], i = t ? [oa.disabled] : [];
  return [oa.btn, oa[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Vr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Xr(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Yr(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function Jr(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Qr(e, a, t) {
  return Jr(e.describedBy, a && t);
}
function Zr({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function el(e) {
  return e.children ?? e.label;
}
function _(e) {
  Xr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = Yr(e), i = k();
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: Ur(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": Qr(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Vr(a, e.controls),
        children: el(e)
      }
    ),
    /* @__PURE__ */ n(Zr, { id: i, reason: l })
  ] });
}
const al = /^([a-z][a-z0-9+.-]*):/i, nl = /* @__PURE__ */ new Set(["http", "https"]), tl = "#";
function rl(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = al.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function z(e) {
  const a = rl(e);
  return a === void 0 || nl.has(a) ? e : tl;
}
function ll(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Wn(e) {
  const a = ll(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function ta(e, a, t) {
  R(() => {
    const r = e.current;
    if (!r) return;
    const l = () => {
      const c = Wn(r);
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
function ol(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function Xa(e, a, t) {
  Ga(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(t)[a];
    if (!r || !l) return;
    const i = ol(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), Wn(r);
  }, [e, a, t]);
}
function Ya(e) {
  const [a, t] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return R(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (c) => t(c.matches);
    return r.addEventListener("change", l), t(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function il({ sidebar: e, header: a, children: t, rail: r }) {
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
function cl({ destinations: e, active: a }) {
  const t = f(null);
  return ta(t, e.length), Xa(t, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ n("nav", { ref: t, className: M.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ n("a", { href: z(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Ha({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function sl({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ n(Ha, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Ha, { value: a, className: M.detail })
  ] });
}
function dl() {
  const e = Ya("(max-width: 767.98px)"), a = k(), t = f(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var c, s;
    l(!1), (s = (c = t.current) == null ? void 0 : c.querySelector("button")) == null || s.focus();
  } };
}
function ul({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: M.tools, children: /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: M.tools, children: e });
}
function ml({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const t = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: M.toolsPanel, hidden: !a.open, onKeyDown: t, children: e });
}
function hl(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ n("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Ha, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ n(cl, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: M.identity, children: /* @__PURE__ */ n(sl, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(ul, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function wl(e) {
  const a = k(), t = dl();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(hl, { ...e, menu: t }),
    /* @__PURE__ */ n(ml, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: M.content, children: e.children })
  ] });
}
function _l(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function bC(e) {
  return _l(e) ? /* @__PURE__ */ n(il, { ...e }) : /* @__PURE__ */ n(wl, { ...e });
}
function Sa(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const fl = "_root_197jc_2", vl = "_row_197jc_8", bl = "_box_197jc_14", gl = "_label_197jc_21", pl = "_lockedNote_197jc_26", yl = "_consequence_197jc_34", Nl = "_sample_197jc_69", je = {
  root: fl,
  row: vl,
  box: bl,
  label: gl,
  lockedNote: pl,
  consequence: yl,
  sample: Nl
};
function kl(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function $l({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${je.consequence} ward-check-consequence`, children: a }) : null;
}
function Cl({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${je.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Sl({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: je.sample, "aria-hidden": "true", children: e }) : null;
}
function zn(e) {
  const a = k(), t = e.consequence ? `${a}-note` : void 0, r = kl(e);
  return /* @__PURE__ */ o("div", { className: `${je.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: je.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${je.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (l) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, l.target.checked));
          },
          "aria-describedby": Sa(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: je.label, children: [
        e.label,
        /* @__PURE__ */ n(Cl, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Sl, { text: e.sample })
    ] }),
    /* @__PURE__ */ n($l, { id: t, text: e.consequence })
  ] });
}
const Rl = "_chip_pq6tb_2", Tl = {
  chip: Rl
}, xl = {
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
function Ll(e, a) {
  if (e === "stream") return Al(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = xl[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function Al(e) {
  if (!e || !Ca(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Dn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Tl.chip} ward-chip ward-chip--${e}`, style: Ll(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
const El = "_clamp_zn74g_3", _n = {
  clamp: El
};
function Ae({ text: e, as: a = "span", className: t }) {
  return /* @__PURE__ */ n(a, { className: t === void 0 ? _n.clamp : `${_n.clamp} ${t}`, "data-ward-clamp": "", title: e, children: e });
}
function ra(e) {
  return typeof e == "number" && Ca(e) ? e : null;
}
function ve(e, a) {
  const t = ra(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function Ra(e, a) {
  const t = ra(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const Il = "_nav_8lufj_2", Ml = "_list_8lufj_8", Bl = "_item_8lufj_15", jl = "_link_8lufj_30", ql = "_sep_8lufj_40", Pl = "_current_8lufj_44", Hl = "_chips_8lufj_48", Me = {
  nav: Il,
  list: Ml,
  item: Bl,
  link: jl,
  sep: ql,
  current: Pl,
  chips: Hl
};
function Fl({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ n("ol", { className: Me.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: Me.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${Me.link} ward-target`, href: z(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Me.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Me.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] }) });
}
const Ol = "_root_glrsq_2", Dl = "_trigger_glrsq_7", Wl = "_value_glrsq_32", zl = "_menu_glrsq_49", Kl = "_find_glrsq_71", Gl = "_list_glrsq_85", Ul = "_option_glrsq_95", Vl = "_check_glrsq_114", Xl = "_empty_glrsq_125", _e = {
  root: Ol,
  trigger: Dl,
  value: Wl,
  menu: zl,
  find: Kl,
  list: Gl,
  option: Ul,
  check: Vl,
  empty: Xl
}, Yl = 7, Jl = 500;
function Ql(e, a) {
  const t = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(t));
}
function fn(e, a) {
  return Math.max(0, e.findIndex((t) => t.value === a));
}
function Zl(e, a) {
  const [t, r] = p(e.defaultOpen === !0), [l, i] = p(""), [c, s] = p(() => fn(e.options, e.value)), u = (d) => {
    var m;
    Vt(() => r(!1)), d && ((m = a.current) == null || m.focus());
  };
  return {
    open: t,
    query: l,
    active: c,
    entries: Ql(e.options, l),
    findable: e.options.length > Yl,
    show: () => {
      e.disabled || (i(""), s(fn(e.options, e.value)), r(!0));
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
function eo(e, a, t) {
  const r = f(t);
  r.current = t, R(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      (c = a.current) != null && c.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, a]);
}
function ao(e, a) {
  const t = f(!1);
  return R(() => {
    var r;
    e && t.current && ((r = a.current) == null || r.focus()), t.current = !1;
  }), () => {
    t.current = !0;
  };
}
function no(e) {
  const a = f(""), t = f(void 0);
  return R(() => () => clearTimeout(t.current), []), (r) => {
    clearTimeout(t.current), a.current += r.toLowerCase(), t.current = setTimeout(() => {
      a.current = "";
    }, Jl);
    const l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(a.current));
    l >= 0 && e.to(l);
  };
}
function to(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function Kn(e) {
  const a = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, a)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function ro(e) {
  return { ...Kn(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function Gn(e, a, t) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = a[r.key];
    if (!l) return t(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const lo = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function oo(e, a) {
  const t = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : t(),
    onKeyDown: (r) => {
      lo.has(r.key) && (r.preventDefault(), t());
    }
  };
}
function io({ entry: e, at: a, menu: t, ids: r, value: l }) {
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
function Ja(e, a) {
  const t = e.entries[e.active];
  return t ? a.option(t.index) : void 0;
}
function co({ menu: e, ids: a, focusRef: t }) {
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
      "aria-activedescendant": Ja(e, a),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: Gn(e, Kn(e), () => {
      })
    }
  );
}
function so({ props: e, menu: a, ids: t, focusRef: r }) {
  const l = no(a), i = (c) => {
    to(c) && l(c.key);
  };
  return /* @__PURE__ */ o("div", { className: _e.menu, children: [
    a.findable && /* @__PURE__ */ n(co, { menu: a, ids: t, focusRef: r }),
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
        "aria-activedescendant": a.findable ? void 0 : Ja(a, t),
        onKeyDown: Gn(a, ro(a), i),
        children: a.entries.map((c, s) => /* @__PURE__ */ n(io, { entry: c, at: s, menu: a, ids: t, value: e.value }, c.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ n("p", { className: _e.empty, children: "No match" })
  ] });
}
function uo(e, a) {
  const t = e.open ? Ja(e, a) : void 0;
  R(() => {
    var r, l;
    t && ((l = (r = document.getElementById(t)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [t]);
}
function Un(...e) {
  return e.filter(Boolean).join(" ");
}
function mo(e) {
  var a;
  return ((a = e.options.find((t) => t.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function ho({ props: e, menu: a, ids: t, trigger: r, wantFocus: l }) {
  const i = !e.options.some((c) => c.value === e.value);
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: Un(_e.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": a.open,
      "aria-controls": a.open ? t.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": Sa(e["aria-describedby"], t.value),
      "aria-invalid": e["aria-invalid"],
      disabled: e.disabled,
      ...oo(a, l),
      children: /* @__PURE__ */ n("span", { id: t.value, className: _e.value, "data-placeholder": i || void 0, children: mo(e) })
    }
  );
}
function Vn(e) {
  const a = k(), t = { list: `${a}-list`, value: `${a}-value`, option: (u) => `${a}-option-${u}` }, r = f(null), l = f(null), i = f(null), c = Zl(e, l), s = ao(c.open, i);
  return eo(c.open, r, () => c.close(!1)), uo(c, t), /* @__PURE__ */ o("div", { ref: r, className: Un(_e.root, e.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(ho, { props: e, menu: c, ids: t, trigger: l, wantFocus: s }),
    e.name && /* @__PURE__ */ n("input", { type: "hidden", name: e.name, value: e.value }),
    c.open && /* @__PURE__ */ n(so, { props: e, menu: c, ids: t, focusRef: i })
  ] });
}
const wo = "_field_djnju_2", _o = "_label_djnju_8", fo = "_labelHidden_djnju_15", vo = "_control_djnju_25", bo = "_mono_djnju_45", go = "_area_djnju_50", po = "_invalid_djnju_57", Le = {
  field: wo,
  label: _o,
  labelHidden: fo,
  control: vo,
  mono: bo,
  area: go,
  invalid: po
}, yo = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, Xn = (e) => `${e}-label`;
function No({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? yo : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function ko({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n(
    Vn,
    {
      id: a.id,
      triggerClassName: t,
      "aria-labelledby": Xn(a.id),
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
function $o({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Co = { input: No, select: ko, textarea: $o };
function So(e, a, t) {
  const r = Co[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Ro(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Sa(r ? t : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function To(e) {
  const a = e.mono ? [Le.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Le.area] : [];
  return [Le.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function xo(e) {
  return e ? `${Le.label} ${Le.labelHidden} ward-field-label` : `${Le.label} ward-field-label`;
}
function I(e) {
  const a = k(), t = `${a}-msg`, r = Ro(e, a, t), l = To(e);
  return /* @__PURE__ */ o("div", { className: `${Le.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: Xn(a), className: xo(e.labelHidden), htmlFor: a, children: e.label }),
    So(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Le.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Lo = "_strip_1nfwi_2", Ao = "_tab_1nfwi_32", Eo = "_count_1nfwi_68", aa = {
  strip: Lo,
  tab: Ao,
  count: Eo
}, wa = 7;
function Io(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function Yn(e) {
  return `${aa.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function gC({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > wa) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${wa} — the set is fixed`);
  const i = ka({ orientation: "horizontal" }), c = Io(e, a);
  R(() => i.setActive(c), [i.setActive, c]);
  const s = f(null);
  return ta(s, e.length), Xa(s, c, '[role="tab"]'), /* @__PURE__ */ n(
    "div",
    {
      ref: s,
      className: Yn(l),
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
          onClick: () => t(u.id),
          ...i.itemProps(d),
          children: [
            u.label,
            u.count === void 0 ? null : /* @__PURE__ */ o(S, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: aa.count, children: `· ${u.count}` })
            ] })
          ]
        },
        u.id
      ))
    }
  );
}
function pC({ links: e, active: a, label: t, level: r = 1 }) {
  if (e.length > wa) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${wa} — the set is fixed`);
  const l = f(null);
  return ta(l, e.length), Xa(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ n("nav", { ref: l, className: Yn(r), "aria-label": t, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${aa.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(S, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: aa.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const Mo = "_root_v56ff_3", Bo = "_segment_v56ff_9", vn = {
  root: Mo,
  segment: Bo
};
function Jn({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = ka({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((u) => u.value === a));
  return R(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ n("div", { className: `${vn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: vn.segment,
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
const jo = "_sidebar_18gpx_3", qo = "_brand_18gpx_9", Po = "_mark_18gpx_17", Ho = "_word_18gpx_24", Fo = "_nav_18gpx_30", Oo = "_navItem_18gpx_39", Do = "_footLink_18gpx_49", Wo = "_group_18gpx_58", zo = "_groupName_18gpx_65", Ko = "_agents_18gpx_81", Go = "_agent_18gpx_81", Uo = "_root_18gpx_96", Vo = "_agentTop_18gpx_105", Xo = "_dot_18gpx_112", Yo = "_agentName_18gpx_124", Jo = "_agentMeta_18gpx_137", Qo = "_foot_18gpx_49", Zo = "_footName_18gpx_149", ei = "_footLinks_18gpx_156", ai = "_linkBrand_18gpx_183", ni = "_label_18gpx_204", ti = "_note_18gpx_209", ri = "_footer_18gpx_218", T = {
  sidebar: jo,
  brand: qo,
  mark: Po,
  word: Ho,
  nav: Fo,
  navItem: Oo,
  new: "_new_18gpx_48",
  footLink: Do,
  group: Wo,
  groupName: zo,
  agents: Ko,
  agent: Go,
  root: Uo,
  agentTop: Vo,
  dot: Xo,
  agentName: Yo,
  agentMeta: Jo,
  foot: Qo,
  footName: Zo,
  footLinks: ei,
  linkBrand: ai,
  label: ni,
  note: ti,
  footer: ri
};
function li({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: T.agent,
      href: z(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: T.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: T.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": Dn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: T.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: T.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function oi({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: T.foot, children: [
    /* @__PURE__ */ n("span", { className: T.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: T.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: `${T.footLink} ward-target`, href: z(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function ii({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: T.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: T.brand, children: [
      /* @__PURE__ */ n("span", { className: T.mark }),
      /* @__PURE__ */ n("span", { className: T.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: T.nav, children: a.map((c) => /* @__PURE__ */ n("a", { className: T.navItem, href: z(c.href), "aria-current": c.current === !0 ? "page" : void 0, children: c.label }, c.href)) }),
    /* @__PURE__ */ o("div", { className: T.group, children: [
      /* @__PURE__ */ o("span", { className: T.groupName, children: [
        t,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: T.new, href: z(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: T.agents, children: r.map((c) => /* @__PURE__ */ n(li, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(oi, { shared: i })
  ] });
}
function ci(e) {
  return e.destinations ?? e.items ?? [];
}
function si({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: T.linkBrand, children: e });
}
function di({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: T.footer, children: e });
}
function ui({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: z(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: T.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: T.note, children: e.note })
  ] });
}
function mi(e) {
  return /* @__PURE__ */ o("aside", { className: `${T.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(si, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: ci(e).map((a) => /* @__PURE__ */ n(ui, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(di, { children: e.children })
  ] });
}
function hi(e) {
  return "agents" in e;
}
function yC(e) {
  return hi(e) ? /* @__PURE__ */ n(ii, { ...e }) : /* @__PURE__ */ n(mi, { ...e });
}
const wi = "_mark_wlgi8_3", _i = {
  mark: wi
}, fi = { met: "✓", unmet: "", failed: "✕" };
function Qa({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: _i.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: fi[e]
    }
  );
}
const vi = "_marker_br9fi_2", bi = {
  marker: vi
}, gi = {
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
}, pi = { running: " ward-running" };
function Ee({ size: e, kind: a, label: t }) {
  const r = { "--marker": gi[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${bi.marker} ward-marker ward-marker--${a}${pi[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const yi = "_root_ti0pq_2", Ni = "_chip_ti0pq_11", ki = "_noCase_ti0pq_23", ia = {
  root: yi,
  chip: Ni,
  noCase: ki
};
function $i(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Za({ connection: e, since: a, lastEventAt: t }) {
  const r = $i(a, t), l = Va(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${ia.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Ee, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${ia.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: ia.noCase, children: Ua(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${ia.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    de(r)
  ] });
}
const Ci = "_root_ryrvl_2", Si = "_context_ryrvl_12", Ri = "_row_ryrvl_1", Ti = "_heading_ryrvl_25", xi = "_headingWrap_ryrvl_33", Li = "_chips_ryrvl_38", Ai = "_title_ryrvl_45", Ei = "_consequence_ryrvl_55", Ii = "_actionsWrap_ryrvl_62", Mi = "_actions_ryrvl_62", Bi = "_action_ryrvl_62", ji = "_overflowPanel_ryrvl_91", qi = "_measureClip_ryrvl_102", Pi = "_measure_ryrvl_102", V = {
  root: Ci,
  context: Si,
  row: Ri,
  heading: Ti,
  headingWrap: xi,
  chips: Li,
  title: Ai,
  consequence: Ei,
  actionsWrap: Ii,
  actions: Mi,
  action: Bi,
  overflowPanel: ji,
  measureClip: qi,
  measure: Pi
};
function Hi({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ n(Ae, { as: "h1", className: V.title, text: e }) : /* @__PURE__ */ n("h1", { className: V.title, children: e });
}
function Fi({ title: e, consequence: a, consequenceHint: t, density: r }) {
  return /* @__PURE__ */ o("div", { className: V.heading, children: [
    /* @__PURE__ */ n(Hi, { title: e, density: r }),
    a && /* @__PURE__ */ n("p", { className: V.consequence, title: t, children: a })
  ] });
}
function Fa({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: V.action, "data-action": "", children: a }, t));
}
function bn({ disclosure: e }) {
  return /* @__PURE__ */ n(_, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Oi({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(bn, { disclosure: l }) : a ? [/* @__PURE__ */ n(bn, { disclosure: l }, "more"), /* @__PURE__ */ n(Fa, { actions: e }, "actions")] : /* @__PURE__ */ n(Fa, { actions: e });
}
function Di(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Wi({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: V.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Fa, { actions: e }) });
}
function zi(e, a) {
  const t = k(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var u, d;
    l(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function Ki({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: V.context, children: [
    /* @__PURE__ */ n(Fl, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: V.chips, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] });
}
function Gi(...e) {
  return e.some((a) => a === null);
}
function Ui(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Vi(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + Ui(e);
}
function Xi(e, a, t, r, l) {
  if (l === 0 || Gi(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = Math.max(0, e.clientWidth - Vi(e, i));
  return s.offsetWidth > u || c.scrollWidth > c.clientWidth + 1;
}
function Yi(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Ji(e) {
  return Kt(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Qi(e, a) {
  return a.length === 0 && e.length === 1 && Ji(e[0]);
}
function Zi(e, a) {
  const t = f(null), r = f(null), l = f(null), i = f(null), [c, s] = p(!1);
  return R(() => {
    const u = t.current;
    if (!Yi(u)) return;
    const d = () => s(Xi(u, r.current, l.current, i.current, e.length)), m = new ResizeObserver(d);
    return m.observe(u), i.current && m.observe(i.current), d(), () => m.disconnect();
  }, [e]), { rowRef: t, headingRef: r, actionsRef: l, measureRef: i, collapsed: c && !a };
}
function ec({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ n("div", { className: V.measureClip, children: /* @__PURE__ */ o("div", { className: V.measure, ref: t, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function ac({ connection: e }) {
  return e ? /* @__PURE__ */ n(Za, { connection: e.connection, since: e.since }) : null;
}
function NC({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: c = [], connection: s, onOverflow: u, density: d = "page" }) {
  const { rowRef: m, headingRef: v, actionsRef: b, measureRef: y, collapsed: A } = Zi(i, Qi(i, c)), B = c.length > 0, { disclosure: oe, close: Se } = zi(A || B, b), ne = Di(c, i, A, u);
  return /* @__PURE__ */ o("header", { className: V.root, "data-density": d, children: [
    /* @__PURE__ */ n(Ki, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: V.row, ref: m, children: [
      /* @__PURE__ */ n("div", { ref: v, className: V.headingWrap, children: /* @__PURE__ */ n(Fi, { title: t, consequence: r, consequenceHint: l, density: d }) }),
      /* @__PURE__ */ o("div", { className: V.actionsWrap, children: [
        /* @__PURE__ */ n(ac, { connection: s }),
        /* @__PURE__ */ n("div", { className: V.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ n(Oi, { actions: i, hasMore: B, collapsed: A, onOverflow: u, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Wi, { actions: ne, disclosure: oe, onEscape: Se }),
    /* @__PURE__ */ n(ec, { actions: i, hasMore: B, measureRef: y })
  ] });
}
const nc = "_scrim_rn7fr_2", tc = "_drawer_rn7fr_10", rc = "_sheet_rn7fr_14", lc = "_modal_rn7fr_18", oc = "_panel_rn7fr_23", ic = "_header_rn7fr_54", cc = "_title_rn7fr_62", sc = "_body_rn7fr_66", dc = "_close_rn7fr_93", ke = {
  scrim: nc,
  drawer: tc,
  sheet: rc,
  modal: lc,
  panel: oc,
  header: ic,
  title: cc,
  body: sc,
  close: dc
}, uc = We(null), _a = [], fa = /* @__PURE__ */ new Map();
function mc(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function hc(e, a) {
  let t = fa.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, fa.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function wc(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !mc(r) && hc(e, r);
}
function _c(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (wc(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function fc(e) {
  for (const a of e.claims) {
    const t = fa.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), fa.delete(a)));
  }
}
function vc(e, a) {
  const t = { root: e, claims: [] };
  return _a.push(t), _c(t, a), t;
}
function bc(e) {
  const a = _a.indexOf(e);
  a >= 0 && _a.splice(a, 1), fc(e);
}
function gn(e) {
  return e !== null && _a.at(-1) === e;
}
function gc(e, a, t) {
  const r = f(null), l = f(t);
  return l.current = t, R(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = vc(i, a);
    return r.current = s, () => {
      var d, m;
      const u = gn(s);
      bc(s), r.current = null, u && ((m = (d = l.current ?? c) == null ? void 0 : d.focus) == null || m.call(d));
    };
  }, [a]), J(() => gn(r.current), []);
}
function pc(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function yc(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Nc({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${ke.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("header", { className: `${ke.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${ke.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${ke.body} ward-drawer-body`, children: e.children })
  ] });
}
function kc(e) {
  return `${ke.scrim} ${ke[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function $c(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ke.panel} ${ke[e]} ward-overlay-panel${t}${r}`;
}
function Cc(e) {
  const a = De(uc);
  return e ?? a ?? document.body;
}
function la(e) {
  const a = f(null), t = f(null), r = k(), l = Cc(e.container), i = Ya("(min-width: 768px)"), c = pc(e.kind, i), s = yc(e, r), u = tr(t), d = gc(a, l, e.returnFocusTo), m = J(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return R(() => {
    var v, b;
    d() && ((b = (v = t.current) == null ? void 0 : v.querySelector("button")) == null || b.focus());
  }, [d]), R(() => {
    const v = (b) => {
      b.key === "Escape" && m();
    };
    return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
  }, [m]), Xt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: kc(c),
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
            className: $c(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (v) => v.stopPropagation(),
            onKeyDown: (v) => d() && u.onKeyDown(v),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${ke.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Nc, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Sc = "_root_zu7qk_2", Rc = "_ticket_zu7qk_16", Tc = "_body_zu7qk_25", Ea = {
  root: Sc,
  ticket: Rc,
  body: Tc
};
function kC({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${Ea.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Ea.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Ea.body, children: t })
  ] });
}
const xc = "_root_bf1pc_2", Lc = "_table_bf1pc_9", Ac = "_caption_bf1pc_14", Ec = "_series_bf1pc_23", Ic = "_category_bf1pc_31", Mc = "_cell_bf1pc_39", Bc = "_track_bf1pc_45", jc = "_lane_bf1pc_52", qc = "_bar_bf1pc_56", Pc = "_value_bf1pc_63", Hc = "_swatch_bf1pc_70", Fc = "_empty_bf1pc_78", X = {
  root: xc,
  table: Lc,
  caption: Ac,
  series: Ec,
  category: Ic,
  cell: Mc,
  track: Bc,
  lane: jc,
  bar: qc,
  value: Pc,
  swatch: Hc,
  empty: Fc
}, Oc = "—", pn = 6;
function Dc(e, a) {
  if (a.length < 1 || a.length > pn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${pn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function Wc(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function Qn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function zc(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Kc({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = zc(e, a), c = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ o("span", { className: X.track, children: [
    /* @__PURE__ */ n("span", { className: X.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${X.bar} ward-barchart-bar`, "data-step": t, style: c, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: X.value, children: e === null ? l : r(e) })
  ] }) });
}
function Gc({ series: e }) {
  return /* @__PURE__ */ n(S, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: X.swatch, "data-step": Qn(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Uc({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: X.caption, children: e }),
    /* @__PURE__ */ n("p", { className: X.empty, children: a })
  ] });
}
function Vc({ title: e, categories: a, series: t, top: r, format: l = ae, categoryHead: i = "Category", missing: c = Oc }) {
  return /* @__PURE__ */ n("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: X.table, children: [
    /* @__PURE__ */ n("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: X.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Gc, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((s, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: X.category, children: s }),
      t.map((d, m) => /* @__PURE__ */ n(Kc, { value: d.values[u], top: r, step: Qn(m, t.length), format: l, missing: c }, d.name))
    ] }, s)) })
  ] }) });
}
function $C(e) {
  Dc(e.categories, e.series);
  const a = Wc(e.series);
  return a === 0 ? /* @__PURE__ */ n(Uc, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Vc, { ...e, top: a });
}
const Xc = "_root_1bfqw_2", Yc = "_figure_1bfqw_7", Jc = "_of_1bfqw_13", Qc = "_bar_1bfqw_18", Zc = "_rows_1bfqw_38", es = "_row_1bfqw_38", as = "_label_1bfqw_49", ns = "_amount_1bfqw_54", Re = {
  root: Xc,
  figure: Yc,
  of: Jc,
  bar: Qc,
  rows: Zc,
  row: es,
  label: as,
  amount: ns
};
function ts({ spent: e, ceiling: a, breakdown: t }) {
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
    /* @__PURE__ */ n(
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
    t && /* @__PURE__ */ n("ul", { className: Re.rows, children: t.map((l) => /* @__PURE__ */ o("li", { className: `${Re.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Re.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: Re.amount, children: re(l.amount) })
    ] }, l.label)) })
  ] });
}
const rs = "_frame_357zi_2", ls = "_table_357zi_6", os = "_th_357zi_12", is = "_td_357zi_13", cs = "_sort_357zi_48", ss = "_row_357zi_60", ds = "_empty_357zi_68", xe = {
  frame: rs,
  table: ls,
  th: os,
  td: is,
  sort: cs,
  row: ss,
  empty: ds
}, us = { asc: "ascending", desc: "descending" };
function ms(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return us[a.direction];
}
function hs(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: xe.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function ws(e) {
  return e === void 0 ? void 0 : { width: e };
}
function _s({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: xe.th,
      style: ws(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ms(e, a),
      children: hs(e, t)
    }
  );
}
function fs({ row: e, props: a }) {
  const t = a.rowId(e), r = (a.lockedIds ?? []).includes(t);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: xe.row,
      "data-selected": t === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ n("td", { className: xe.td, "data-align": l.align, "data-mono": l.mono, "data-drop": l.dropPriority, children: a.renderCell(e, l.key) }, l.key))
    }
  );
}
function vs({
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
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: xe.empty, children: d }) : /* @__PURE__ */ n("div", { className: xe.frame, children: /* @__PURE__ */ o("table", { className: xe.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: xe.head, children: a.map((m) => /* @__PURE__ */ n(_s, { column: m, sort: s, onSort: u }, m.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((m) => /* @__PURE__ */ n(fs, { row: m, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(m))) })
  ] }) });
}
const bs = "_list_v0s52_2", gs = {
  list: bs
};
function CC({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: gs.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const ps = "_label_1u62a_2", ys = {
  label: ps
};
function SC({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((a) => /* @__PURE__ */ n("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ n("span", { className: ys.label, children: a.header }) }, a.key)) }) });
}
const Ns = "_stack_bp6a0_2", ks = {
  stack: Ns
};
function RC({ children: e }) {
  return /* @__PURE__ */ n("span", { className: ks.stack, "data-ward-action-stack": "", children: e });
}
const $s = "_set_1z0sq_2", Cs = "_legend_1z0sq_7", Ss = "_row_1z0sq_15", Rs = "_control_1z0sq_20", Ts = "_input_1z0sq_26", xs = "_label_1z0sq_31", Ls = "_consequence_1z0sq_36", Be = {
  set: $s,
  legend: Cs,
  row: Ss,
  control: Rs,
  input: Ts,
  label: xs,
  consequence: Ls
};
function Zn({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: c, variant: s }) {
  const u = k(), d = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: Be.set, "data-variant": s, children: [
    /* @__PURE__ */ n("legend", { className: Be.legend, children: e }),
    a.map((m) => {
      const v = `${d}-${m.value}`, b = m.consequence ? `${v}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Be.row, children: [
        /* @__PURE__ */ o("span", { className: Be.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: v,
              type: "radio",
              name: d,
              className: Be.input,
              value: m.value,
              checked: t === m.value,
              disabled: l,
              "aria-describedby": Sa(b, c),
              onChange: () => !l && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: v, className: Be.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ n("p", { id: b, className: `${Be.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const As = "_root_5to6d_2", Es = "_head_5to6d_11", Is = "_note_5to6d_30", Ms = "_index_5to6d_35", Bs = "_dot_5to6d_39", js = "_counter_5to6d_50", qs = "_trailing_5to6d_58", qe = {
  root: As,
  head: Es,
  note: Is,
  index: Ms,
  dot: Bs,
  counter: js,
  trailing: qs
};
function Ps({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${qe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: qe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Hs({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.counter, "aria-hidden": "true", children: e }) : null;
}
function yn({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${qe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: qe.head, children: [
      /* @__PURE__ */ n(Ps, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: qe.note, children: t }),
    /* @__PURE__ */ n(Hs, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: qe.trailing, children: i })
  ] });
}
const Fs = "_strip_1eouv_2", Os = "_cell_1eouv_7", Ds = "_value_1eouv_12", Ws = "_link_1eouv_29", zs = "_label_1eouv_47", Fe = {
  strip: Fs,
  cell: Os,
  value: Ds,
  link: Ws,
  label: zs
};
function Ks(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const et = (e) => `${Fe.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Gs({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: Fe.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: et(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${Fe.label} ward-stat-label`, children: e.label })
  ] });
}
function Us({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: Fe.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: et(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${Fe.link} ward-stat-link`, href: z(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${Fe.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Ta({ cells: e, divided: a = !1 }) {
  return Ks(e), /* @__PURE__ */ n("dl", { className: `${Fe.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => t.href === void 0 ? /* @__PURE__ */ n(Gs, { cell: t }, t.label) : /* @__PURE__ */ n(Us, { cell: t, href: t.href }, t.label)) });
}
const Vs = "_root_1eb1u_2", Xs = "_track_1eb1u_8", Ys = "_thumb_1eb1u_46", Js = "_labelHidden_1eb1u_64", Qs = "_label_1eb1u_64", Zs = "_lockedNote_1eb1u_84", Pe = {
  root: Vs,
  track: Xs,
  thumb: Ys,
  labelHidden: Js,
  label: Qs,
  lockedNote: Zs
};
function ed(e) {
  return e ? `${Pe.label} ${Pe.labelHidden}` : Pe.label;
}
function Oe({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: c }) {
  const s = k(), u = `${s}switch`, d = l ? !0 : a, m = r || l;
  return /* @__PURE__ */ o("span", { className: `${Pe.root} ward-switchrow`, children: [
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
        className: `${Pe.track} ward-switch`,
        "data-on": d,
        "data-locked": l ? !0 : void 0,
        disabled: m,
        onClick: () => !m && (t == null ? void 0 : t(!d)),
        children: /* @__PURE__ */ n("span", { className: Pe.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: s, htmlFor: u, className: ed(c), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Pe.lockedNote, children: "always on" })
    ] })
  ] });
}
const ad = "_bar_1vp69_2", nd = "_skip_1vp69_11", td = "_mark_1vp69_22", rd = "_nav_1vp69_30", ld = "_list_1vp69_34", od = "_select_1vp69_41", id = "_selectTrigger_1vp69_45", cd = "_dest_1vp69_52", sd = "_actor_1vp69_71", dd = "_actorMark_1vp69_84", ud = "_actorLabel_1vp69_89", md = "_tagline_1vp69_108", ie = {
  bar: ad,
  skip: nd,
  mark: td,
  nav: rd,
  list: ld,
  select: od,
  selectTrigger: id,
  dest: cd,
  actor: sd,
  actorMark: dd,
  actorLabel: ud,
  tagline: md
};
function hd(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function wd(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function TC({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: c = "main" }) {
  const s = wd(r);
  return /* @__PURE__ */ o("header", { className: ie.bar, children: [
    /* @__PURE__ */ n("a", { className: `${ie.skip} ward-target`, href: `#${c}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: ie.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: ie.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: ie.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: ie.list, children: a.map((u) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${ie.dest} ward-target`,
          href: z(u.href),
          "aria-current": u.id === t ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ n(
        Vn,
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
      /* @__PURE__ */ n("span", { className: ie.actorMark, "aria-hidden": "true", children: hd(s) })
    ] })
  ] });
}
const _d = "_tree_u4w0j_2", fd = "_item_u4w0j_6", vd = "_row_u4w0j_10", bd = "_button_u4w0j_22", va = {
  tree: _d,
  item: fd,
  row: vd,
  button: bd
}, at = We(null);
function gd({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = ka({ orientation: "vertical" });
  return /* @__PURE__ */ n(at.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: va.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const pd = { ArrowRight: !0, ArrowLeft: !1 };
function Nn(e) {
  return e ? !0 : void 0;
}
function yd(e, a) {
  const t = pd[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function Nd(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function kd(e) {
  const a = [va.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function $d(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Cd(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Sd(e) {
  return typeof e == "string" ? e : void 0;
}
function Rd({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Td({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function nt(e) {
  const a = De(at);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = $d(e);
  return /* @__PURE__ */ o("li", { className: va.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: kd(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": Nn(e.unresolved),
        "data-inherited": Nn(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${va.button} ward-treeitem-btn`,
            onClick: () => Nd(e),
            onKeyDown: (r) => yd(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Cd(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Sd(e.label), children: e.label }),
              /* @__PURE__ */ n(Rd, { value: e.detail }),
              /* @__PURE__ */ n(Td, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const xd = "_frame_1fj9j_2", Ld = "_subjectRail_1fj9j_22", Ad = "_subject_1fj9j_22", Ed = "_rail_1fj9j_42", Id = "_record_1fj9j_64", Md = "_recordBody_1fj9j_69", Bd = "_stageGrid_1fj9j_118", jd = "_band_1fj9j_144", qd = "_bandBody_1fj9j_153", Pd = "_bandActions_1fj9j_158", Hd = "_scroller_1fj9j_166", Fd = "_board_1fj9j_192", Od = "_laneCount_1fj9j_200", Dd = "_lanes_1fj9j_210", Y = {
  frame: xd,
  subjectRail: Ld,
  subject: Ad,
  rail: Ed,
  record: Id,
  recordBody: Md,
  stageGrid: Bd,
  band: jd,
  bandBody: qd,
  bandActions: Pd,
  scroller: Hd,
  board: Fd,
  laneCount: Od,
  lanes: Dd
};
function xC({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: Y.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function kn(e) {
  return e ? "true" : void 0;
}
function LC({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Y.subjectRail, "data-ward-subject-rail": t, "data-ruled": kn(i), children: [
    /* @__PURE__ */ n("div", { className: Y.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: Y.rail, "data-sticky": kn(l), "aria-label": r, children: a })
  ] });
}
function AC({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: c, measure: s }) {
  return c === "inline" ? /* @__PURE__ */ n("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(yn, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(yn, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: Y.recordBody, "data-pad": l, "data-measure": s, children: a })
  ] });
}
const Wd = "_form_1j8ub_2", zd = "_fields_1j8ub_9", Kd = "_actions_1j8ub_19", Ia = {
  form: Wd,
  fields: zd,
  actions: Kd
};
function EC({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ia.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ia.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ia.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function IC({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: Y.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: Y.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: Y.bandActions, children: a })
  ] });
}
const Gd = "(max-width: 767.98px)";
function en({ label: e, children: a, laneCount: t, onOverflow: r }) {
  const l = f(null);
  ta(l, t ?? Gt.count(a), r);
  const i = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function Ud({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = p(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ o("div", { className: Y.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(I, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: l }),
    /* @__PURE__ */ n(en, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Vd({ lanes: e, label: a }) {
  const [t, r] = p(!1);
  return /* @__PURE__ */ o("div", { className: Y.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: Y.laneCount, "data-ward-board-lane-count": "", hidden: !t, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ n(en, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ n(Ut, { children: l.content }, l.id)) })
  ] });
}
function MC({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = Ya(Gd);
  return t === void 0 ? /* @__PURE__ */ n(en, { label: a, children: e }) : l ? /* @__PURE__ */ n(Ud, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Vd, { lanes: t, label: a });
}
function BC({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = f(null), i = Math.max(e, 1);
  ta(l, i);
  const c = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: c, children: a });
}
const Xd = "_block_fummk_2", Yd = "_sentence_fummk_15", Jd = "_meta_fummk_20", Qd = "_action_fummk_25", Zd = "_strip_fummk_29", eu = "_loading_fummk_48", au = "_label_fummk_56", nu = "_counter_fummk_63", fe = {
  block: Xd,
  sentence: Yd,
  meta: Jd,
  action: Qd,
  strip: Zd,
  loading: eu,
  label: au,
  counter: nu
};
function tu({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: fe.action, children: /* @__PURE__ */ n(_, { onClick: e.onClick, children: e.label }) });
}
function xa({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${fe.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: fe.sentence, children: e }),
    t,
    /* @__PURE__ */ n(tu, { action: a })
  ] });
}
function ru(e) {
  return /* @__PURE__ */ n(xa, { ...e, kind: "ward-emptystate" });
}
function jC({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(xa, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function qC(e) {
  return /* @__PURE__ */ n(xa, { ...e });
}
function PC({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(xa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function HC({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function FC({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function OC({ label: e, startedAt: a }) {
  const t = f(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  R(() => {
    const c = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = Va(t.current, r);
  return /* @__PURE__ */ o("div", { className: `${fe.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: fe.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: fe.counter, children: Ua(i) }) : null
  ] });
}
const lu = "_note_cigdt_2", ou = {
  note: lu
};
function iu({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: ou.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const cu = "_card_17y0p_2", su = "_hit_17y0p_29", du = "_head_17y0p_42", uu = "_title_17y0p_49", mu = "_meta_17y0p_54", hu = "_fields_17y0p_55", wu = "_who_17y0p_68", _u = "_sep_17y0p_72", fu = "_mono_17y0p_76", vu = "_field_17y0p_55", bu = "_last_17y0p_92", gu = "_reason_17y0p_104", Q = {
  card: cu,
  hit: su,
  head: du,
  title: uu,
  meta: mu,
  fields: hu,
  who: wu,
  sep: _u,
  mono: fu,
  field: vu,
  last: bu,
  reason: gu
}, pu = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function yu(e, a, t) {
  const r = da(e, "blue"), l = da(e, "orange"), i = da(e, "green"), c = f(/* @__PURE__ */ new Set());
  R(() => {
    if (!t) return;
    const s = { blue: r, orange: l, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = pu[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, l]);
}
const Nu = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function ku(e, a) {
  return Nu[a](e);
}
function $u({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: Q.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: Q.meta, children: [
    /* @__PURE__ */ n(Ae, { className: Q.who, text: `waits on ${e.run.agent}` }),
    t,
    /* @__PURE__ */ n(Ce, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: Q.meta, children: [
    /* @__PURE__ */ n(Ae, { className: Q.who, text: `waits on ${e.waitsOn}` }),
    t,
    /* @__PURE__ */ o("span", { className: Q.mono, children: [
      se(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Cu({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: Q.head, children: [
    e.flagged && /* @__PURE__ */ n(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function Su({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: Q.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Ru({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: Q.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: Q.field, children: ku(e, t) }, t)) });
}
const Oa = (e) => e ? !0 : void 0;
function Tu(e) {
  return { "--stream": ve(e.streamStep, "id") };
}
function xu(e, a, t) {
  e == null || e(a, t);
}
function Lu(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Au({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: Q.last, "data-stale": Oa(a), children: t }) : null;
}
function La(e) {
  const a = e.fields ?? [], t = e.item, r = f(null);
  yu(r, t.key, e.feed);
  const l = Lu(e.feed), i = Tu(t);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: Q.card,
      style: i,
      "data-selected": Oa(e.selected),
      "data-flagged": Oa(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: Q.hit, onClick: (c) => xu(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(Cu, { item: t }),
        /* @__PURE__ */ n(Ae, { as: "p", className: Q.title, text: t.title }),
        /* @__PURE__ */ n($u, { item: t, connection: l }),
        /* @__PURE__ */ n(Su, { reason: t.blockedReason }),
        /* @__PURE__ */ n(Ru, { item: t, fields: a }),
        /* @__PURE__ */ n(Au, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const Eu = "_column_ppaii_3", Iu = "_head_ppaii_24", Mu = "_label_ppaii_33", Bu = "_count_ppaii_42", ju = "_list_ppaii_56", Ze = {
  column: Eu,
  head: Iu,
  label: Mu,
  count: Bu,
  list: ju
};
function tt(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function qu({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Ze.head, children: [
    /* @__PURE__ */ n("h2", { className: Ze.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: Ze.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Pu(e) {
  return /* @__PURE__ */ n("div", { className: Ze.list, role: "list", children: e.rows.map((a, t) => {
    var r;
    return /* @__PURE__ */ n(
      La,
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
function Hu({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = k(), m = e.cap !== void 0 && a.length > e.cap, v = tt(a, r);
  return /* @__PURE__ */ o("section", { className: Ze.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(qu, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(Pu, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, rows: v }),
    m && /* @__PURE__ */ n(iu, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Fu = "_foot_cs4jr_2", Ou = "_note_cs4jr_13", Du = "_link_cs4jr_19", Ma = {
  foot: Fu,
  note: Ou,
  link: Du
};
function DC({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ma.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ma.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Ma.link} ward-target`, href: z(e), children: "Configure board" })
  ] });
}
const Wu = "_head_1lguu_3", zu = "_identity_1lguu_12", Ku = "_titleRow_1lguu_18", Gu = "_title_1lguu_18", Uu = "_key_1lguu_35", Vu = "_rollup_1lguu_45", Xu = "_tools_1lguu_53", Yu = "_swatch_1lguu_65", Ju = "_mark_1lguu_72", ye = {
  head: Wu,
  identity: zu,
  titleRow: Ku,
  title: Gu,
  key: Uu,
  rollup: Vu,
  tools: Xu,
  swatch: Yu,
  mark: Ju
}, $n = "initials:";
function Qu(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Zu(e) {
  const a = [Qu(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${se(e.p90)}`), a.join(" · ");
}
function em(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Zu(e)
  ] });
}
function am(e) {
  return e.startsWith($n) ? e.slice($n.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function nm({ markRef: e, streamStep: a }) {
  const t = { "--stream": ve(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${ye.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: am(e) }) : /* @__PURE__ */ n("span", { className: ye.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function tm({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(I, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function WC({
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
        /* @__PURE__ */ n(nm, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: ye.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: ye.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: ye.rollup, "aria-live": "polite", children: em(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ye.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(tm, { owners: l, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(_, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Za, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const rm = "_head_1sejb_14", lm = "_line_1sejb_15", om = "_cHandle_1sejb_36", im = "_cName_1sejb_41", cm = "_nameLine_1sejb_49", sm = "_cLabel_1sejb_56", dm = "_cCap_1sejb_61", um = "_cShown_1sejb_66", mm = "_name_1sejb_49", hm = "_noCap_1sejb_88", wm = "_state_1sejb_102", _m = "_handle_1sejb_111", fm = "_sub_1sejb_137", q = {
  head: rm,
  line: lm,
  cHandle: om,
  cName: im,
  nameLine: cm,
  cLabel: sm,
  cCap: dm,
  cShown: um,
  name: mm,
  noCap: hm,
  state: wm,
  handle: _m,
  sub: fm
}, vm = "can't be hidden or collapsed", bm = "terminal · counted, not a column";
function zC() {
  return /* @__PURE__ */ o("div", { className: q.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: q.cHandle }),
    /* @__PURE__ */ n("span", { className: q.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: q.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: q.cShown, children: "Shown" })
  ] });
}
function gm(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function pm(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Cn(e) {
  return e.gate ? vm : e.terminal ? bm : pm(e.agentsMounted);
}
function ym(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Nm({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: q.cName, children: [
    /* @__PURE__ */ o("span", { className: q.nameLine, children: [
      /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Cn(e) && /* @__PURE__ */ n("span", { className: q.sub, children: Cn(e) })
  ] });
}
function km(e) {
  return e === void 0 ? "" : String(e);
}
function $m(e) {
  return e === "" ? void 0 : Number(e);
}
function Cm({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: q.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: q.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => ym(t, a),
      children: "⠿"
    }
  ) });
}
function Sm({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${q.cCap} ${q.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: q.cCap, children: /* @__PURE__ */ n(I, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: km(a.cap), onChange: (r) => t({ ...a, cap: $m(r) }) }) });
}
function Rm({ stage: e, config: a, onChange: t }) {
  const r = gm(e, a.shown), l = e.gate || e.terminal, i = (c) => t({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: q.cShown, children: [
    /* @__PURE__ */ n(Oe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ n("span", { className: q.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function Tm(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function KC({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: q.line, "data-kind": Tm(e), children: [
    /* @__PURE__ */ n(Cm, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Nm, { stage: e }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: /* @__PURE__ */ n(I, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(Sm, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(Rm, { stage: e, config: a, onChange: t })
  ] });
}
const xm = "_body_1a4f4_2", Lm = "_head_1a4f4_9", Am = "_summary_1a4f4_19", Em = "_block_1a4f4_20", Im = "_actionsBlock_1a4f4_21", Mm = "_title_1a4f4_41", Bm = "_note_1a4f4_46", jm = "_k_1a4f4_51", qm = "_kv_1a4f4_58", Pm = "_row_1a4f4_64", Hm = "_label_1a4f4_75", Fm = "_value_1a4f4_84", Om = "_quote_1a4f4_90", Dm = "_actions_1a4f4_21", Wm = "_resolve_1a4f4_103", P = {
  body: xm,
  head: Lm,
  summary: Am,
  block: Em,
  actionsBlock: Im,
  title: Mm,
  note: Bm,
  k: jm,
  kv: qm,
  row: Pm,
  label: Hm,
  value: Fm,
  quote: Om,
  actions: Dm,
  resolve: Wm
};
function zm(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Km(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Ce, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Gm(e) {
  const a = ra(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function Um(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(h, { ...Ra(Gm(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...zm(e),
    ...Km(e, a)
  ];
}
function Vm({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: P.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: P.k, children: a }),
    e
  ] });
}
function Xm({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: P.head, children: [
    /* @__PURE__ */ n(h, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function Ym({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: P.block, children: [
    /* @__PURE__ */ n("p", { className: P.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: P.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: P.note, children: e.agentMeta })
  ] }) : null;
}
function GC({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = k(), d = Um(e, l);
  return /* @__PURE__ */ n(la, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: P.body, children: [
    /* @__PURE__ */ n(Xm, { item: e }),
    /* @__PURE__ */ o("div", { className: P.summary, children: [
      /* @__PURE__ */ n("h2", { className: P.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: P.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: P.kv, children: d.map(([m, v]) => /* @__PURE__ */ o("div", { className: P.row, children: [
      /* @__PURE__ */ n("dt", { className: P.label, children: m }),
      /* @__PURE__ */ n("dd", { className: P.value, children: v })
    ] }, m)) }),
    /* @__PURE__ */ n(Ym, { item: e }),
    /* @__PURE__ */ o("div", { className: P.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: P.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: P.note, children: s })
    ] }),
    /* @__PURE__ */ n(Vm, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Jm = "_root_3azmy_2", Qm = "_list_3azmy_7", Zm = "_item_3azmy_12", eh = "_box_3azmy_18", ah = "_text_3azmy_23", nh = "_note_3azmy_28", Ge = {
  root: Jm,
  list: Qm,
  item: Zm,
  box: eh,
  text: ah,
  note: nh
};
function Aa({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ o("div", { className: Ge.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Ge.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ge.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ge.box, children: /* @__PURE__ */ n(Qa, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Ge.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Ge.note} ward-checklist-note`, children: a })
  ] });
}
const th = "_rail_ke7ch_2", rh = "_k_ke7ch_11", lh = "_head_ke7ch_19", oh = "_section_ke7ch_25", ih = "_card_ke7ch_38", ch = "_strip_ke7ch_42", sh = "_skeleton_ke7ch_56", dh = "_skeletonLabel_ke7ch_70", uh = "_bar_ke7ch_76", mh = "_note_ke7ch_85", me = {
  rail: th,
  k: rh,
  head: lh,
  section: oh,
  card: ih,
  strip: ch,
  skeleton: sh,
  skeletonLabel: dh,
  bar: uh,
  note: mh
};
function hh(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ba({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: me.k, children: e }),
    a
  ] });
}
function wh({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function _h({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(Hu, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function fh(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(_h, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(wh, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function UC(e) {
  const a = hh(e.onOpen), t = tt(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ba, { title: "Card", children: /* @__PURE__ */ n("div", { className: me.card, children: t && /* @__PURE__ */ n(La, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ba, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(fh, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ba, { title: "Effect of this config", children: /* @__PURE__ */ n(Aa, { items: e.effects, density: "compact" }) })
  ] });
}
function vh(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function bh(e) {
  return Math.ceil(e.length / 2);
}
function gh(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function rt(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function ph(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = rt(e);
  l !== void 0 && t(l), r(gh(e.type));
}
function yh(e, a, t, r, l) {
  R(() => {
    if (e !== null)
      return e.subscribe(a, (i) => ph(i, t, r, l));
  }, [e, a, t, r, l]);
}
function Nh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function kh(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function $h(e, a) {
  return a !== void 0 ? se(e.timeInStage) + " · waits on " + a.agent : se(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Ch(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(bh(a ?? [])) + ")"
  };
}
function Sh(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Rh(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(h, { role: "meta", label: re(e.cost) }) : null;
}
function Th(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(h, { role: "meta", label: e.jiraKey }) : null;
}
function xh(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Ce, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function Lh(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function Ah(e, a) {
  return a === void 0 ? e : vh(e, a.ref);
}
function Eh(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function na(e) {
  return e === !0 ? "true" : void 0;
}
function lt(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = f(null), i = da(l), c = f(/* @__PURE__ */ new Set()), [s, u] = p(Nh(a));
  yh(e.feed, a.key, c, u, i);
  const d = kh(a, r), m = $h(a, t), v = Ch(a, e.fields), b = Lh(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Eh(e),
      className: "ward-workcard",
      "data-flagged": na(a.flagged),
      "data-selected": na(e.selected),
      style: v,
      ref: Ah(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Sh(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(h, { role: d.role, label: d.label }),
          Rh(a, e.fields),
          Th(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          xh(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function Ih({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Mh(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Bh(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function jh(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Ih, { count: e.items.length, cap: e.column.cap });
}
function qh(e, a) {
  return e.roving ?? a;
}
function Ph(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Hh(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    lt,
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
function Fh(e) {
  const a = k(), t = ka({ orientation: "vertical" }), r = qh(e, t), l = Mh(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": na(l), "data-gate": na(e.column.gate), children: [
    Bh(e.column, e.items.length, a),
    jh(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Ph(e, t), children: Hh(e, r) })
  ] });
}
function Oh(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + se(e.p50)), e.p90 !== void 0 && (a += " · p90 " + se(e.p90)), a;
}
function Dh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(I, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Wh(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function VC(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Oh(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Dh(e),
      Wh(e.onConfigure),
      /* @__PURE__ */ n(Za, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function zh(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Kh(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Oe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Oe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Gh(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ n(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function XC(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": na(zh(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Kh(e) }),
    /* @__PURE__ */ n(I, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(zn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Gh(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function YC(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(lt, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Fh, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Uh(e, a) {
  const t = rt(e);
  t !== void 0 && a(t);
}
function Vh(e, a, t) {
  R(() => {
    if (e != null)
      return e.subscribe(a, (r) => Uh(r, t));
  }, [e, a, t]);
}
function Xh(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Yh(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function Jh(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Ce, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Qh(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function JC(e) {
  var c;
  const a = e.item, t = a.run, [r, l] = p((c = a.run) == null ? void 0 : c.lastStep);
  Vh(e.feed, a.key, l);
  const i = [...Xh(a), ...Yh(a)];
  return /* @__PURE__ */ o(la, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      Jh(t, r)
    ] }),
    Qh(a, e.actions)
  ] });
}
const Zh = "_card_1iv4k_2", ew = "_head_1iv4k_28", aw = "_mark_1iv4k_36", nw = "_name_1iv4k_48", tw = "_chips_1iv4k_69", rw = "_description_1iv4k_75", lw = "_run_1iv4k_80", ow = "_sep_1iv4k_89", iw = "_facts_1iv4k_94", cw = "_fact_1iv4k_94", sw = "_factLabel_1iv4k_107", dw = "_factValue_1iv4k_111", le = {
  card: Zh,
  head: ew,
  mark: aw,
  name: nw,
  chips: tw,
  description: rw,
  run: lw,
  sep: ow,
  facts: iw,
  fact: cw,
  factLabel: sw,
  factValue: dw
}, uw = { live: "done", draft: "running", paused: "meta" };
function mw(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function hw({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ n(h, { role: uw[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function ww({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: le.description, children: e });
}
function _w({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Ce, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function fw({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ n("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function vw(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function bw({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: c }) {
  const s = { "--stream": ve(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: mw(c),
      style: s,
      "data-selected": u,
      "data-paused": vw(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ n("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${le.name} ward-rowlink ward-target`, href: z(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(ww, { description: e.description }),
        /* @__PURE__ */ n(_w, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(hw, { versions: e.versions }),
        /* @__PURE__ */ n(fw, { facts: i })
      ]
    }
  );
}
const gw = "_list_4dcyc_2", pw = "_row_4dcyc_11", yw = "_head_4dcyc_23", Nw = "_id_4dcyc_30", kw = "_lock_4dcyc_35", $w = "_reason_4dcyc_41", Cw = "_remove_4dcyc_46", Sw = "_clauses_4dcyc_50", Rw = "_clause_4dcyc_50", Tw = "_label_4dcyc_64", xw = "_cell_4dcyc_71", Lw = "_value_4dcyc_76", ce = {
  list: gw,
  row: pw,
  head: yw,
  id: Nw,
  lock: kw,
  reason: $w,
  remove: Cw,
  clauses: Sw,
  clause: Rw,
  label: Tw,
  cell: xw,
  value: Lw
}, ot = We(!1);
function QC({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(ot.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": a, children: e }) });
}
function Aw({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(I, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function Ew({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function Iw({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Ew, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Sn(e, a) {
  return e.locked ? void 0 : a;
}
function ZC({ rule: e, onChange: a, onRemove: t }) {
  if (!De(ot)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Sn(e, a);
  return /* @__PURE__ */ o("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Iw, { rule: e, onRemove: Sn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(Aw, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Mw = "_ladder_n8eeo_2", Bw = "_cell_n8eeo_7", jw = "_empty_n8eeo_26", qw = "_name_n8eeo_34", Pw = "_holder_n8eeo_40", Hw = "_request_n8eeo_46", Fw = "_swatches_n8eeo_51", Ow = "_swatch_n8eeo_51", Dw = "_tilesFrame_n8eeo_78", Ww = "_tiles_n8eeo_78", zw = "_tile_n8eeo_78", Kw = "_bar_n8eeo_117", Gw = "_hex_n8eeo_128", Uw = "_note_n8eeo_138", L = {
  ladder: Mw,
  cell: Bw,
  empty: jw,
  name: qw,
  holder: Pw,
  request: Hw,
  swatches: Fw,
  swatch: Ow,
  tilesFrame: Dw,
  tiles: Ww,
  tile: zw,
  bar: Kw,
  hex: Gw,
  note: Uw
}, e0 = "not validated yet, pending a CVD matrix and dark stepping";
function Vw(e) {
  return e.reserved ? "reserved" : Ca(e.step) ? "validated" : "partial";
}
function it(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Xw(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Yw({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ee, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Jw(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Qw(e, a, t) {
  return {
    "aria-checked": a,
    "aria-disabled": t || void 0,
    tabIndex: t ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Rn = (e) => String(e).padStart(2, "0");
function Zw(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? it(e, void 0);
}
function e_({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.hex} ward-ladder-hex`, children: r ? `step ${Rn(e)}` : sr(e) }),
    /* @__PURE__ */ n("span", { className: `${L.note} ward-ladder-note`, children: r ? t : `Step ${Rn(e)} · ${t}` })
  ] });
}
function a_({ step: e, value: a, taken: t, onChange: r, presentation: l, disabled: i }) {
  const c = Vw(e), s = it(c, t), u = s !== "free", d = u || i, m = a === e.step, v = e.name ?? `Step ${e.step}`, b = () => {
    d || r(e.step);
  }, y = `${v} · ${l === "tiles" && m ? "yours" : s}`;
  return { shared: { role: "radio", "aria-label": y, ...Qw(u, m, d), "data-validation": c, style: Xw(e, c), onClick: b, onKeyDown: (B) => Jw(B, b) }, label: y, name: v, holder: s, validation: c, note: Zw(c, t, m), step: e.step };
}
const n_ = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${L.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${L.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(e_, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${L.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Yw, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${L.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${L.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function t_(e) {
  return n_[e.presentation](a_(e));
}
function r_(e) {
  for (const a of e)
    if (!a.reserved && !$a(a.step)) throw new Error("colour ladder renders token steps only");
}
function l_() {
  return /* @__PURE__ */ o("div", { className: `${L.cell} ward-ladder-cell ${L.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${L.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function o_(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const i_ = { list: L.ladder, swatches: L.swatches, tiles: L.tilesFrame };
function c_() {
  return /* @__PURE__ */ o("div", { className: `${L.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${L.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const s_ = { list: l_, swatches: () => null, tiles: c_ };
function d_(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function ct(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  r_(e.steps);
  const r = o_(e), l = s_[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(t_, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r, disabled: e.disabled === !0 }, c.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...d_(e.disabled === !0), className: `${i_[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: L.tiles, children: i }) : i });
}
const u_ = "_rail_s06lm_2", m_ = "_section_s06lm_12", h_ = "_sectionFlush_s06lm_22", w_ = "_head_s06lm_26", __ = "_headLabel_s06lm_34", f_ = "_sample_s06lm_42", v_ = "_sampleLabel_s06lm_47", b_ = "_sampleTitle_s06lm_54", g_ = "_sampleMeta_s06lm_59", p_ = "_trace_s06lm_65", y_ = "_traceHead_s06lm_70", N_ = "_steps_s06lm_78", k_ = "_step_s06lm_78", $_ = "_stepTitle_s06lm_97", C_ = "_hollow_s06lm_107", S_ = "_stepBody_s06lm_115", R_ = "_stepDetail_s06lm_127", T_ = "_publish_s06lm_132", x_ = "_reason_s06lm_138", L_ = "_note_s06lm_143", A_ = "_reveal_s06lm_148", N = {
  rail: u_,
  section: m_,
  sectionFlush: h_,
  head: w_,
  headLabel: __,
  sample: f_,
  sampleLabel: v_,
  sampleTitle: b_,
  sampleMeta: g_,
  trace: p_,
  traceHead: y_,
  steps: N_,
  step: k_,
  stepTitle: $_,
  hollow: C_,
  stepBody: S_,
  stepDetail: R_,
  publish: T_,
  reason: x_,
  note: L_,
  reveal: A_
}, Tn = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, E_ = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, I_ = { ok: "greenFill", finding: "orangeFill", action: "blue" }, M_ = { notSimulated: "not simulated", running: "running" };
function B_(e) {
  return e.presentation === "foundry";
}
function j_(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function q_(e, a) {
  var r;
  const t = E_[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function P_(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function H_(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function F_(e) {
  if (P_(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function O_(e) {
  const [a, t] = p(!1);
  R(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${N.step} ${N.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function D_(e) {
  const a = M_[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: N.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Ee, { size: 6, kind: I_[e.kind], label: e.kind });
}
function W_(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: N.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function z_(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Ce, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function K_(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(O_, { kind: a.kind, children: [
    /* @__PURE__ */ n(D_, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: N.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: N.stepTitle, children: a.title }),
      /* @__PURE__ */ n(W_, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(z_, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function G_(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(se(a)), t.join(" · ");
}
function st(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${N.trace} ${N.section}`, children: [
    /* @__PURE__ */ n("p", { className: N.traceHead, id: a, children: G_(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: N.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(K_, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function U_(e) {
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
function V_(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${N.sampleMeta} ${N.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function X_(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Hn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: N.sectionFlush, children: /* @__PURE__ */ n(Ta, { divided: !0, cells: a }) });
}
function Y_(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Hn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function J_(e) {
  const a = Y_(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: N.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: N.sectionFlush, children: /* @__PURE__ */ n(Ta, { divided: !0, cells: a }) });
}
function dt(e) {
  const a = k();
  return e.reason !== null ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: `${N.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Q_(e) {
  return /* @__PURE__ */ o("div", { className: `${N.publish} ${N.section}`, children: [
    /* @__PURE__ */ n(dt, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: N.note, children: e.note })
  ] });
}
function Z_(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${N.publish} ${N.section}`, children: /* @__PURE__ */ n(dt, { reason: e.reason, onPublish: e.onPublish }) });
}
function ut(e) {
  return /* @__PURE__ */ o("div", { className: `${N.head} ${N.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: N.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(h, { role: Tn[e.run.status].role, label: Tn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Ce, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function ef(e, a) {
  const [t, r] = p(e.steps);
  return R(() => r(e.steps), [e.steps]), R(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var c, s;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((c = l.step) == null ? void 0 : c.label) ?? "step", detail: (s = l.step) == null ? void 0 : s.tool }];
        });
      });
  }, [a, e.status]), t;
}
function af(e) {
  var t;
  H_(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(ut, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(U_, { sample: e.run.sample }),
    /* @__PURE__ */ n(st, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(X_, { run: e.run }),
    /* @__PURE__ */ n("div", { className: N.section, children: /* @__PURE__ */ n(Aa, { items: e.checklist }) }),
    /* @__PURE__ */ n(Q_, { reason: j_(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function nf(e) {
  var r;
  const a = ef(e.run, e.feed);
  F_(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(ut, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(V_, { sample: e.run.sample }),
    /* @__PURE__ */ n(st, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(J_, { run: e.run }),
    /* @__PURE__ */ n("div", { className: N.section, children: /* @__PURE__ */ n(Aa, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Z_, { reason: q_(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function a0(e) {
  return B_(e) ? /* @__PURE__ */ n(nf, { ...e }) : /* @__PURE__ */ n(af, { ...e });
}
const tf = "_list_142ip_3", rf = "_row_142ip_9", lf = "_condition_142ip_18", of = "_action_142ip_24", ua = {
  list: tf,
  row: rf,
  condition: lf,
  action: of
}, mt = We(!1);
function n0({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(mt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ua.list, "aria-label": a, children: e }) });
}
function t0({ rule: e }) {
  if (!De(mt)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: ua.row, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ua.condition, children: e.when }),
    /* @__PURE__ */ n(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ua.action, children: e.then })
  ] });
}
const cf = "_move_tmppt_3", sf = {
  move: cf
};
function Da(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(t, 0, l), r;
}
function ht(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function wt(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function xn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function df(e) {
  return e === "up" ? "down" : "up";
}
function uf(e, a) {
  const t = xn(e, a.id, a.direction) ?? xn(e, a.id, df(a.direction));
  t == null || t.focus();
}
function _t() {
  const e = f(null), [a, t] = p(null), [r, l] = p("");
  return R(() => {
    e.current !== null && a !== null && uf(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), l(s);
  } };
}
function ft({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ba({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${sf.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const mf = "_body_1jd1i_2", hf = "_title_1jd1i_8", wf = "_section_1jd1i_13", _f = "_legend_1jd1i_18", ff = "_stages_1jd1i_26", vf = "_stage_1jd1i_26", bf = "_stageIndex_1jd1i_44", gf = "_stageName_1jd1i_50", pf = "_footer_1jd1i_59", yf = "_note_1jd1i_66", Nf = "_reason_1jd1i_71", kf = "_actions_1jd1i_76", $f = "_webHead_1jd1i_83", Cf = "_kicker_1jd1i_92", Sf = "_webTitle_1jd1i_99", Rf = "_webBody_1jd1i_105", Tf = "_webSection_1jd1i_109", xf = "_sectionHead_1jd1i_121", Lf = "_sectionNote_1jd1i_129", Af = "_formLabel_1jd1i_134", Ef = "_identityRow_1jd1i_139", If = "_nameCell_1jd1i_145", Mf = "_keyCell_1jd1i_150", Bf = "_colourCell_1jd1i_154", jf = "_colourStatus_1jd1i_161", qf = "_webStages_1jd1i_166", Pf = "_webStageList_1jd1i_172", Hf = "_webStage_1jd1i_166", Ff = "_webIndex_1jd1i_191", Of = "_webStageName_1jd1i_196", Df = "_webMoves_1jd1i_201", Wf = "_addStage_1jd1i_215", zf = "_addStageButton_1jd1i_223", Kf = "_addStageNote_1jd1i_231", Gf = "_webFooter_1jd1i_236", Uf = "_webFooterNotes_1jd1i_244", Vf = "_webNote_1jd1i_251", w = {
  body: mf,
  title: hf,
  section: wf,
  legend: _f,
  stages: ff,
  stage: vf,
  stageIndex: bf,
  stageName: gf,
  footer: pf,
  note: yf,
  reason: Nf,
  actions: kf,
  webHead: $f,
  kicker: Cf,
  webTitle: Sf,
  webBody: Rf,
  webSection: Tf,
  sectionHead: xf,
  sectionNote: Lf,
  formLabel: Af,
  identityRow: Ef,
  nameCell: If,
  keyCell: Mf,
  colourCell: Bf,
  colourStatus: jf,
  webStages: qf,
  webStageList: Pf,
  webStage: Hf,
  webIndex: Ff,
  webStageName: Of,
  webMoves: Df,
  addStage: Wf,
  addStageButton: zf,
  addStageNote: Kf,
  webFooter: Gf,
  webFooterNotes: Uf,
  webNote: Vf
}, Xf = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], vt = "not in catalogue";
function Yf(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${vt}` }, ...t];
}
function Jf({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(I, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${vt}`;
  return /* @__PURE__ */ n(I, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Yf(t, e.name), invalid: i, onChange: r });
}
function bt(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Qf(e) {
  const a = f([]), t = f(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Zf({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: c }) {
  const s = bt(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(Jf, { stage: a, index: t, catalogue: l, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(I, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: Xf, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ba, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(ba, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function ev({ stages: e, onChange: a, catalogue: t }) {
  const r = Qf(e.length), l = _t(), i = (s, u) => {
    const d = ht(s, u);
    r.current = Da(r.current, s, d), l.moved({ id: r.current[d], direction: u }, wt(bt(e[s], s), d, e.length)), a(Da(e, s, d));
  }, c = (s, u) => a(e.map((d, m) => m === s ? u : d));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ n(Zf, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: t, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(ft, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const av = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], nv = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], tv = "A new stream starts as a draft. Nothing runs on it until you publish it.", rv = "Create is disabled: name the stream and give it a key first.", lv = "reorder with the ↑ ↓ buttons · min 2";
function an(e, a) {
  return !e.reserved && Ca(e.step) && a[e.step] === void 0;
}
function ov(e, a) {
  const t = e.find((r) => an(r, a));
  return t ? t.step : 1;
}
function iv({ stages: e, onMove: a }) {
  const t = _t(), r = (l, i) => {
    const c = ht(l, i);
    t.moved({ id: e[l].id, direction: i }, wt(e[l].name, c, e.length)), a(l, c);
  };
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: w.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(h, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(ba, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ba, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(ft, { text: t.announcement })
  ] });
}
function cv({ reason: e, onCreate: a, onDraft: t }) {
  const r = k();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: tv }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(_, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function sv(e, a) {
  return e !== "" && a !== "" ? null : rv;
}
function dv(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = nv, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = k(), [m, v] = p(""), [b, y] = p(""), [A, B] = p(a[0].value), [oe, Se] = p(() => ov(t, r)), [ne, ze] = p(e.stages ?? av), [Ke, C] = p(l[0].value), K = { name: m, key: b, streamStep: oe, owner: A, stages: ne, policy: Ke }, be = sv(m, b);
  return /* @__PURE__ */ n(la, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(I, { kind: "input", label: "Stream name", value: m, onChange: v }),
      /* @__PURE__ */ n(I, { kind: "input", label: "Key", value: b, onChange: y, mono: !0 }),
      /* @__PURE__ */ n(I, { kind: "select", label: "Owner", value: A, onChange: B, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(ct, { label: "Stream colour", steps: t, value: oe, onChange: Se, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(iv, { stages: ne, onMove: (Ie, zt) => ze(Da(ne, Ie, zt)) })
    ] }),
    /* @__PURE__ */ n(Zn, { legend: "Loop policy", options: l, value: Ke, onChange: C }),
    /* @__PURE__ */ n(cv, { reason: be, onCreate: () => i(K), onDraft: () => c(K) })
  ] }) });
}
const gt = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], uv = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function mv(e, a, t, r, l, i) {
  var s;
  const c = ((s = gt.find((u) => u.value === l)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function hv(e, a) {
  return wv(e) && _v(e, a) && fv(e);
}
function wv(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function _v(e, a) {
  return e.colourStep === null || an({ step: e.colourStep }, a);
}
function fv(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function vv(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : an({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function bv({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function gv({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(bv, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: uv })
    ] }),
    l && /* @__PURE__ */ n(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function pv({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function yv({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: w.webSection, children: [
    /* @__PURE__ */ n("h3", { className: w.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: w.identityRow, children: [
      /* @__PURE__ */ n("div", { className: w.nameCell, children: /* @__PURE__ */ n(I, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: w.keyCell, children: /* @__PURE__ */ n(I, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function Nv(e) {
  const a = k(), t = k(), r = e.takenBy ?? {}, [l, i] = p(""), [c, s] = p(""), [u, d] = p(e.owners[0] ?? ""), [m, v] = p(null), [b, y] = p("relay"), [A, B] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = mv(l, c, u, m, b, A), Se = hv(oe, r), ne = A.find((C) => C.kind === "agent" && C.name.trim() !== ""), ze = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(ct, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: v, takenBy: r })
  ] }), Ke = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: vv(m, r) }),
    /* @__PURE__ */ n(I, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map((C) => ({ value: C, label: C })), onChange: d })
  ] });
  return /* @__PURE__ */ o(la, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(pv, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(yv, { name: l, setName: i, streamKey: c, setKey: s, colour: ze, owner: Ke }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: lv })
        ] }),
        /* @__PURE__ */ n(ev, { stages: A, onChange: B })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(Zn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: gt, onChange: y }) }),
      /* @__PURE__ */ n(gv, { ready: Se, draft: oe, agentStage: ne, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function r0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Nv, { ...e }) : /* @__PURE__ */ n(dv, { ...e });
}
const kv = "_row_bs8hc_2", $v = "_cell_bs8hc_6", Cv = "_condition_bs8hc_11", Sv = "_action_bs8hc_18", Rv = "_contract_bs8hc_24", Tv = "_contractCondition_bs8hc_33", xv = "_contractAction_bs8hc_39", Z = {
  row: kv,
  cell: $v,
  condition: Cv,
  action: Sv,
  contract: Rv,
  contractCondition: Tv,
  contractAction: xv
}, pt = ["advance", "block", "escalate", "requestReview"], Ln = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function ga(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function nn(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: Z.action, children: Ln[e.then] }) : /* @__PURE__ */ n(
    I,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: pt.map((l) => ({ value: l, label: Ln[l] }))
    }
  );
}
function Lv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ n("span", { className: Z.condition, title: ga(e, r), children: ga(e, r) }) }),
    /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: Z.cell, children: nn(e, a, t) })
  ] });
}
function Av({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ o("td", { className: Z.cell, children: [
      /* @__PURE__ */ n(h, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: Z.condition, children: ga(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: Z.cell, children: nn(e, a, t) })
  ] });
}
function Ev({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Z.contract, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: Z.contractCondition, children: ga(e, r) }),
    /* @__PURE__ */ n(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: Z.contractAction, children: nn(e, a, t, !0) })
  ] });
}
const Iv = { two: Av, four: Lv, contract: Ev };
function l0(e) {
  var t;
  if (!pt.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Iv[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const Mv = "_column_1xq6c_2", Bv = "_head_1xq6c_17", jv = "_index_1xq6c_23", qv = "_name_1xq6c_29", Pv = "_meta_1xq6c_38", Hv = "_mono_1xq6c_43", Fv = "_gate_1xq6c_50", Ov = "_reviewersLabel_1xq6c_57", Dv = "_reviewers_1xq6c_57", Wv = "_reviewer_1xq6c_57", zv = "_agents_1xq6c_74", Kv = "_workflowColumn_1xq6c_79", Gv = "_workflowHead_1xq6c_96", Uv = "_stageRow_1xq6c_102", Vv = "_stageLabel_1xq6c_109", Xv = "_workflowTitle_1xq6c_116", Yv = "_workflowMeta_1xq6c_122", Jv = "_workflowGate_1xq6c_127", Qv = "_gateNote_1xq6c_135", Zv = "_cardNote_1xq6c_140", eb = "_reviewerList_1xq6c_145", ab = "_reviewerRow_1xq6c_151", nb = "_reviewerMark_1xq6c_157", tb = "_reviewerName_1xq6c_167", rb = "_terminalCard_1xq6c_173", lb = "_terminalCount_1xq6c_182", ob = "_workflowAgents_1xq6c_188", ib = "_mount_1xq6c_194", $ = {
  column: Mv,
  head: Bv,
  index: jv,
  name: qv,
  meta: Pv,
  mono: Hv,
  gate: Fv,
  reviewersLabel: Ov,
  reviewers: Dv,
  reviewer: Wv,
  agents: zv,
  workflowColumn: Kv,
  workflowHead: Gv,
  stageRow: Uv,
  stageLabel: Vv,
  workflowTitle: Xv,
  workflowMeta: Yv,
  workflowGate: Jv,
  gateNote: Qv,
  cardNote: Zv,
  reviewerList: eb,
  reviewerRow: ab,
  reviewerMark: nb,
  reviewerName: tb,
  terminalCard: rb,
  terminalCount: lb,
  workflowAgents: ob,
  mount: ib
}, cb = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function tn(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function yt(e) {
  return `${Math.round(e * 100)}%`;
}
function sb({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: $.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: $.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: $.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: $.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Ta, { cells: [
      { value: yt(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function db({ stage: e }) {
  return /* @__PURE__ */ n(Ta, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: tn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function ub({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: $.head, children: [
    /* @__PURE__ */ n("span", { className: $.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: $.name, id: a, children: e.name }),
    /* @__PURE__ */ n(h, { role: e.kind === "gate" ? "gate" : "soft", label: cb[e.kind] })
  ] });
}
function mb({ stage: e }) {
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
function hb({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(sb, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(db, { stage: e }) : null;
}
function wb({ onMount: e }) {
  return e ? /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function _b({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: $.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(ub, { stage: e, titleId: l }),
    /* @__PURE__ */ n(mb, { stage: e }),
    /* @__PURE__ */ n(hb, { stage: e }),
    /* @__PURE__ */ n("div", { className: $.agents, children: a.map((c) => /* @__PURE__ */ n(bw, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(wb, { onMount: t })
  ] });
}
const fb = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function vb({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: $.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: $.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: $.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: $.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function bb({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: $.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: $.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(vb, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: $.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: yt(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function gb(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function pb({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: $.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: $.terminalCount, children: tn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: $.cardNote, children: gb(e.rolledBackThisWeek) })
  ] });
}
function yb(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Nb(e) {
  if (e.kind === "terminal") return `${tn(e.closedThisWeek)} this week`;
  const a = yb(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function kb({ stage: e, titleId: a }) {
  const t = fb[e.kind];
  return /* @__PURE__ */ o("header", { className: $.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: $.stageRow, children: [
      /* @__PURE__ */ o("span", { className: $.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(h, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: $.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: $.workflowMeta, children: Nb(e) })
  ] });
}
function $b(e) {
  return e === "entry" || e === "agent";
}
function Cb({ stage: e, onMount: a }) {
  return a === void 0 || !$b(e.kind) ? null : /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", className: $.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Sb({ stage: e, agentCards: a, onMount: t }) {
  const r = k();
  return /* @__PURE__ */ o("section", { className: $.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(kb, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(bb, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(pb, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: $.workflowAgents, children: a }),
    /* @__PURE__ */ n(Cb, { stage: e, onMount: t })
  ] });
}
function Rb(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function o0(e) {
  return Rb(e) ? /* @__PURE__ */ n(Sb, { ...e }) : /* @__PURE__ */ n(_b, { ...e });
}
const Tb = "_row_alabo_6", xb = "_name_alabo_12", Lb = "_compactRow_alabo_13", Ab = "_compactName_alabo_13", Eb = "_cell_alabo_30", Ib = "_chain_alabo_45", Mb = "_owner_alabo_51", Bb = "_mono_alabo_57", jb = "_compactCell_alabo_79", qb = "_stack_alabo_96", Pb = "_stat_alabo_103", Hb = "_identityLine_alabo_110", Fb = "_identity_alabo_110", Ob = "_ownerLine_alabo_137", Db = "_link_alabo_150", Wb = "_gateMark_alabo_156", zb = "_emptyChain_alabo_161", Kb = "_arrow_alabo_167", Gb = "_muted_alabo_168", Ub = "_define_alabo_173", Vb = "_statValue_alabo_180", Xb = "_policyId_alabo_186", Yb = "_sub_alabo_191", g = {
  row: Tb,
  name: xb,
  compactRow: Lb,
  compactName: Ab,
  cell: Eb,
  chain: Ib,
  owner: Mb,
  mono: Bb,
  compactCell: jb,
  stack: qb,
  stat: Pb,
  identityLine: Hb,
  identity: Fb,
  ownerLine: Ob,
  link: Db,
  gateMark: Wb,
  emptyChain: zb,
  arrow: Kb,
  muted: Gb,
  define: Ub,
  statValue: Vb,
  policyId: Xb,
  sub: Yb
};
function Nt(e) {
  var s;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i } = e, c = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i };
  (s = e.currentTarget.querySelector("a")) == null || s.dispatchEvent(new MouseEvent("click", c));
}
function Jb(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Qb(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function kt(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function Zb(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${kt(e.members)}`;
}
function eg(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: z(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(h, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: Zb(e) })
  ] }) });
}
function $t({ name: e, gate: a, look: t, size: r }) {
  return /* @__PURE__ */ o(S, { children: [
    a ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(h, { ...t, size: r, label: e }),
    a ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function ag(e, a, t) {
  if (e !== a) return { role: "soft" };
  const r = ra(t);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function ng({ stages: e, streamStep: a }) {
  const t = e.findIndex((r) => r.gate === !0);
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((r, l) => /* @__PURE__ */ o("span", { className: g.link, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n($t, { name: r.name, gate: r.gate === !0, look: ag(l, t, a), size: "tag" })
  ] }, `${r.name}${l}`)) });
}
function tg(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : ng(e) });
}
function Ct(e) {
  return e === void 0 ? void 0 : !0;
}
function An(e, a, t, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: t }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Ct(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: a })
  ] }) });
}
function rg(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function lg(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function og({ stream: e, href: a, presentation: t }) {
  const r = Qb(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Nt, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ve(e.streamStep, "chip") }, children: [
    eg(e, a),
    tg(e),
    An(lg(e.agents), e.agents === void 0 ? void 0 : Jb(e.agents), "—"),
    rg(e.policy),
    An(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function ig(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function i0(e) {
  if (ig(e)) return og(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: Nt, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: z(t), children: a.name }),
      /* @__PURE__ */ n(h, { ...Ra(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ n(h, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: a.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n($t, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: g.mono, children: kt(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: a.inFlightHint, "data-raised": Ct(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: a.p50 === void 0 ? "" : se(a.p50) }) })
  ] });
}
const cg = "_row_2u4ll_2", sg = "_name_2u4ll_16", dg = "_scope_2u4ll_24", pa = {
  row: cg,
  name: sg,
  scope: dg
};
function rn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function ug(e) {
  return e === void 0 ? `${pa.row} ward-toolrow` : `${pa.row} ward-toolrow ${e}`;
}
function mg(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function hg({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function wg({ classification: e }) {
  return /* @__PURE__ */ n(h, { role: e === "write" ? "write" : "meta", label: rn(e) });
}
function _g({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${pa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function fg(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function c0({ tool: e, onChange: a, presentation: t }) {
  const r = k(), l = k(), i = mg(e, t), c = fg(t);
  return /* @__PURE__ */ o(c, { className: ug(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(hg, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${pa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(_g, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(wg, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const vg = "_strip_1ay45_2", bg = "_head_1ay45_10", gg = "_name_1ay45_16", pg = "_chart_1ay45_24", yg = "_segment_1ay45_30", Ng = "_detailedChart_1ay45_36", kg = "_rail_1ay45_49", $g = "_section_1ay45_55", Cg = "_label_1ay45_66", Sg = "_note_1ay45_83", ee = {
  strip: vg,
  head: bg,
  name: gg,
  chart: pg,
  segment: yg,
  detailedChart: Ng,
  rail: kg,
  section: $g,
  label: Cg,
  note: Sg
}, Rg = "No item in flight to preview.", Tg = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", xg = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Wa = [1, 2, 3, 4, 5, 6], ya = 100;
function Lg(e, a) {
  return a.has(e) ? ve(e, "id") : "var(--ward-color-line)";
}
function Ag({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: ee.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Wa.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: ee.segment,
      x: l * ya,
      y: "0",
      width: ya,
      height: "8",
      fill: Lg(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Eg(e) {
  const a = e.slice(0, Wa.length);
  for (; a.length < Wa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Ig({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${ee.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * ya),
        y: "0",
        width: String(ya),
        height: "40",
        style: { fill: ve(a.streamStep, "chip") }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function St(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ca({ label: e, children: a }) {
  const t = k();
  return /* @__PURE__ */ o("section", { className: ee.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: ee.label, children: e }),
    a
  ] });
}
function Mg({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: ee.note, children: a ?? Rg }) : /* @__PURE__ */ n(La, { item: { ...e, streamStep: ra(t.streamStep) }, onOpen: St(r), feed: null });
}
function Bg({ draft: e }) {
  const a = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: ee.head, style: a, children: [
    /* @__PURE__ */ n(Ee, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
    /* @__PURE__ */ n(h, { ...Ra(e.key, e.streamStep) })
  ] });
}
function jg(e) {
  const a = Eg(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: ee.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ca, { label: "Board card", children: /* @__PURE__ */ n(Mg, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ca, { label: "Streams index row", children: /* @__PURE__ */ n(Bg, { draft: t }) }),
    /* @__PURE__ */ o(ca, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(Ig, { identities: a }),
      /* @__PURE__ */ n("p", { className: ee.note, children: Tg })
    ] }),
    /* @__PURE__ */ n(ca, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: ee.note, children: xg }) })
  ] });
}
function qg({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: ee.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: ee.head, children: [
      /* @__PURE__ */ n(Ee, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
      /* @__PURE__ */ n(h, { ...Ra(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n(La, { item: { ...a, streamStep: e.streamStep }, onOpen: St(r) }),
    /* @__PURE__ */ n(Ag, { draft: e, streams: t })
  ] });
}
function s0(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(jg, { ...e }) : /* @__PURE__ */ n(qg, { ...e });
}
const Pg = "_row_ixlg5_6", Hg = "_headCell_ixlg5_10", Fg = "_cell_ixlg5_11", Og = "_name_ixlg5_23", Dg = "_consequence_ixlg5_29", Wg = "_governed_ixlg5_36", zg = "_control_ixlg5_42", Kg = "_byRole_ixlg5_48", Gg = "_webControl_ixlg5_59", Ug = "_webConsequence_ixlg5_65", Vg = "_webGoverned_ixlg5_71", F = {
  row: Pg,
  headCell: Hg,
  cell: Fg,
  name: Og,
  consequence: Dg,
  governed: Wg,
  control: zg,
  byRole: Kg,
  webControl: Gg,
  webConsequence: Ug,
  webGoverned: Vg
};
function Xg({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: F.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: F.control, children: [
    /* @__PURE__ */ n(
      Oe,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(h, { role: "running", label: "Pilot" })
  ] });
}
function Yg({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: F.headCell, children: [
      /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: F.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: F.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(Xg, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Jg(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Qg({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${F.webControl} ${F.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Oe,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: t === void 0,
      onChange: (l) => t == null ? void 0 : t(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${F.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(h, { role: "running", label: "Pilot" }),
    r
  ] });
}
function Zg({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ o("td", { className: F.cell, children: [
      /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${F.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(Qg, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webGoverned} ward-cellmeta`, children: Jg(e) }) })
  ] });
}
function d0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Zg, { ...e }) : /* @__PURE__ */ n(Yg, { ...e });
}
const ep = "_row_vv64h_2", ap = "_cell_vv64h_6", np = "_name_vv64h_25", tp = "_note_vv64h_30", rp = "_webName_vv64h_41", lp = "_webMeta_vv64h_47", U = {
  row: ep,
  cell: ap,
  name: np,
  note: tp,
  webName: rp,
  webMeta: lp
}, Rt = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function op(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function ip({ component: e, onRestart: a }) {
  const t = k(), r = Rt[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: U.row, children: [
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n("span", { className: U.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: U.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(h, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n("span", { id: t, className: U.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: U.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(_, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function cp({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: op(e.state) });
}
function sp({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: U.row, children: [
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n("span", { className: `${U.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n("span", { className: `${U.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(h, { ...Rt[e.state] }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(cp, { component: e, onRestart: a }) })
  ] });
}
function u0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(sp, { ...e }) : /* @__PURE__ */ n(ip, { ...e });
}
const dp = "_row_jcm5k_7", up = "_cell_jcm5k_11", mp = "_next_jcm5k_28", hp = "_headCell_jcm5k_38", wp = "_webId_jcm5k_77", _p = "_webPurpose_jcm5k_83", fp = "_webMeta_jcm5k_91", vp = "_webUrgent_jcm5k_97", O = {
  row: dp,
  cell: up,
  next: mp,
  headCell: hp,
  webId: wp,
  webPurpose: _p,
  webMeta: fp,
  webUrgent: vp
}, bp = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, gp = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Tt = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], pp = Object.fromEntries(Tt.map((e) => [e.key, e]));
function Ue({ column: e, children: a }) {
  const t = pp[e];
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
function m0() {
  return /* @__PURE__ */ n("tr", { children: Tt.map((e) => /* @__PURE__ */ n(
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
function yp({ cred: e }) {
  const a = bp[e.state];
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ n(Ue, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Ue, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Ue, { column: "state", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ue, { column: "cls", children: /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: rn(e.cls) }) }),
    /* @__PURE__ */ n(Ue, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Ue, { column: "next", children: /* @__PURE__ */ n("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Np({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function kp({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(Np, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(h, { ...gp[e.state] }) })
  ] });
}
function h0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(kp, { ...e }) : /* @__PURE__ */ n(yp, { ...e });
}
const $p = "_card_17zba_2", Cp = "_head_17zba_11", Sp = "_env_17zba_18", Rp = "_version_17zba_25", Tp = "_meta_17zba_32", xp = "_webCard_17zba_37", Lp = "_webRow_17zba_47", Ap = "_webTitle_17zba_55", Ep = "_webLine_17zba_65", Ip = "_webVersion_17zba_72", Mp = "_webMeta_17zba_77", G = {
  card: $p,
  head: Cp,
  env: Sp,
  version: Rp,
  meta: Tp,
  webCard: xp,
  webRow: Lp,
  webTitle: Ap,
  webLine: Ep,
  webVersion: Ip,
  webMeta: Mp
}, En = { dev: "Dev", uat: "UAT", prod: "Prod" }, xt = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function Bp({ env: e }) {
  const a = xt[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: G.card, "aria-label": En[e.env], children: [
    /* @__PURE__ */ o("div", { className: G.head, children: [
      /* @__PURE__ */ n("span", { className: G.env, children: En[e.env] }),
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
function jp(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function qp(e) {
  return /* @__PURE__ */ o("article", { className: `${G.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${G.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${G.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(h, { ...xt[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${G.version} ${G.webVersion} ${G.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${G.meta} ${G.webMeta} ${G.webLine} ward-cellmeta`, children: jp(e) })
  ] });
}
function w0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(qp, { ...e }) : /* @__PURE__ */ n(Bp, { ...e });
}
const Pp = "_panel_1hmja_2", Hp = "_line_1hmja_8", Fp = "_actions_1hmja_14", sa = {
  panel: Pp,
  line: Hp,
  actions: Fp
};
function _0(e) {
  return /* @__PURE__ */ o("div", { className: sa.panel, children: [
    /* @__PURE__ */ n("p", { className: sa.line, children: e.status }),
    /* @__PURE__ */ n(I, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: sa.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: sa.line, children: e.note ?? "" })
  ] });
}
const Op = "_upload_13fcl_2", Dp = "_preview_13fcl_7", Wp = "_mark_13fcl_17", zp = "_empty_13fcl_22", Kp = "_actions_13fcl_28", Gp = "_input_13fcl_33", Up = "_reasons_13fcl_41", Vp = "_reason_13fcl_41", Xp = "_accepted_13fcl_57", te = {
  upload: Op,
  preview: Dp,
  mark: Wp,
  empty: zp,
  actions: Kp,
  input: Gp,
  reasons: Up,
  reason: Vp,
  accepted: Xp
}, Lt = 1.5, At = 22, Na = "script elements or event handlers", Te = "links or external references", $e = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Lt}px at ${At}px`], Yp = [$e[1], $e[2], Na, Te], Jp = /* @__PURE__ */ new Map([
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
]), Qp = "http://www.w3.org/2000/svg", Zp = "http://www.w3.org/2000/xmlns/", ey = /* @__PURE__ */ new Set([
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
]), ay = /* @__PURE__ */ new Set([
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
]), ln = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, ny = /url\s*\(|['"\\]/i;
function ty() {
  return { ok: !1, reasons: [$e[1]] };
}
function Et(e) {
  return e.namespaceURI === Qp;
}
function ry(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && Et(a) ? a : null;
  } catch {
    return null;
  }
}
function ly(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [$e[0]] : [];
}
function oy(e) {
  return Jp.get(e.localName) ?? (e.localName.startsWith("animate") ? Te : void 0);
}
function iy(e) {
  return ny.test(e.replace(ln, ""));
}
function cy(e) {
  return /^on/i.test(e.localName) ? Na : e.localName === "href" || iy(e.value) ? Te : void 0;
}
function sy(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(oy(t));
    for (const r of Array.from(t.attributes)) a.add(cy(r));
  }
  return Yp.filter((t) => a.has(t));
}
function dy(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? At / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Lt;
  }) ? [$e[3]] : [];
}
function uy(e) {
  if (e.namespaceURI === Zp) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (ay.has(a) || a.startsWith("stroke"));
}
function my(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && Et(a) && ey.has(a.localName);
}
function hy(e, a) {
  my(a) ? a.nodeType === Node.ELEMENT_NODE && It(a) : e.removeChild(a);
}
function It(e) {
  for (const a of Array.from(e.attributes)) uy(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) hy(e, a);
  return e;
}
function wy(e) {
  return Array.from(e.matchAll(ln), (a) => a[2]).filter((a) => a !== "");
}
function _y(e) {
  let a = 2166136261;
  for (let t = 0; t < e.length; t += 1) a = Math.imul(a ^ e.charCodeAt(t), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function fy(e, a) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of wy(l.value)) t.has(i) || t.set(i, `${a}-${t.size}`);
  return t;
}
function vy(e, a) {
  for (const t of Array.from(e.attributes))
    t.value = t.value.replace(ln, (r, l, i) => {
      const c = a.get(i);
      return c === void 0 ? r : r.replace(`#${i}`, `#${c}`);
    });
}
function by(e, a) {
  const t = [e, ...Array.from(e.querySelectorAll("*"))], r = fy(t, a);
  for (const l of t) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), vy(l, r);
  }
  return e;
}
function f0(e) {
  const a = ry(e);
  if (a === null) return ty();
  const t = [...ly(a), ...sy(a), ...dy(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(by(It(a), _y(e))) };
}
const gy = "Mark accepted.", py = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, yy = new Set(On.flatMap((e) => [ve(e, "id"), ve(e, "chip")]));
function Ny(e) {
  return e !== void 0 && (py.test(e) || yy.has(e)) ? e : void 0;
}
function ky({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: te.preview, style: { "--mark": Ny(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ n("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: te.empty }) });
}
function $y(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function Cy(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Sy({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("p", { className: te.accepted, children: gy }) }) : /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: te.reason, children: a }, a)) }) });
}
function Ry({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(Sy, { result: e }) : /* @__PURE__ */ n("p", { className: `${te.result} ${$y(e, t)}`, role: "status", children: Cy(e, t) });
}
function In(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function v0({ current: e, onUpload: a, onUseInitials: t, presentation: r, disabledReason: l }) {
  const i = f(null), [c, s] = p(null), u = (d) => {
    if (d === void 0) return;
    const m = a(d);
    m instanceof Promise ? m.then(s) : s(m);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ n(ky, { current: e }),
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
      /* @__PURE__ */ n(_, { ...In(l), onClick: () => {
        var d;
        return (d = i.current) == null ? void 0 : d.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(_, { ...In(l), variant: "ghost", onClick: t, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(Ry, { result: c, presentation: r })
  ] });
}
const Ty = "_row_o3t6y_7", xy = "_cell_o3t6y_11", Ly = "_head_o3t6y_28", Ay = "_name_o3t6y_34", Ey = "_pinned_o3t6y_42", Iy = "_headCell_o3t6y_49", My = "_webName_o3t6y_88", By = "_webMeta_o3t6y_95", jy = "_webWarn_o3t6y_103", j = {
  row: Ty,
  cell: xy,
  head: Ly,
  name: Ay,
  pinned: Ey,
  headCell: Iy,
  webName: My,
  webMeta: By,
  webWarn: jy
}, on = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Mt = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], qy = Object.fromEntries(Mt.map((e) => [e.key, e]));
function Py(e, a) {
  return `mcp.${e}.${a}`;
}
function Hy(e) {
  return Object.keys(on).includes(e);
}
function Fy(e) {
  return on[e !== void 0 && Hy(e) ? e : "unknown"];
}
function Qe({ column: e, children: a }) {
  const t = qy[e];
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
function b0() {
  return /* @__PURE__ */ n("tr", { children: Mt.map((e) => /* @__PURE__ */ n(
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
function Oy({ server: e }) {
  const a = on[e.connection];
  return /* @__PURE__ */ o("tr", { className: j.row, children: [
    /* @__PURE__ */ o(Qe, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: j.head, children: [
        /* @__PURE__ */ n("span", { className: j.name, children: e.name }),
        /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: rn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: j.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(Qe, { column: "connection", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Qe, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(Qe, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(Qe, { column: "tools", children: e.tools.map((t) => Py(e.name, t)).join(" · ") })
  ] });
}
function Dy(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Wy(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function zy({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${j.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${j.webMeta} ward-cellmeta`, children: e });
}
function Ky({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${j.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Gy({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function Uy({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: j.row, children: [
    /* @__PURE__ */ o("td", { className: j.cell, children: [
      /* @__PURE__ */ n("span", { className: `${j.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${j.webMeta} ward-cellmeta`, children: Dy(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n("span", { className: `${j.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n(h, { ...Wy(e) }) }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n(zy, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n(h, { ...Fy(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: j.cell, children: [
      /* @__PURE__ */ n(Ky, { server: e, onRestart: a }),
      /* @__PURE__ */ n(Gy, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function g0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Uy, { ...e }) : /* @__PURE__ */ n(Oy, { ...e });
}
const Vy = "_row_1ibo7_2", Xy = "_headCell_1ibo7_14", Yy = "_cell_1ibo7_15", Jy = "_name_1ibo7_26", Qy = "_consequence_1ibo7_32", Zy = "_reason_1ibo7_38", eN = "_value_1ibo7_44", aN = "_webRow_1ibo7_60", nN = "_webSetting_1ibo7_73", tN = "_webName_1ibo7_81", rN = "_webConsequence_1ibo7_89", lN = "_webControl_1ibo7_95", oN = "_webState_1ibo7_109", iN = "_webChip_1ibo7_114", E = {
  row: Vy,
  headCell: Xy,
  cell: Yy,
  name: Jy,
  consequence: Qy,
  reason: Zy,
  value: eN,
  webRow: aN,
  webSetting: nN,
  webName: tN,
  webConsequence: rN,
  webControl: lN,
  webState: oN,
  webChip: iN
}, Bt = 104, jt = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function cN({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Oe, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(Jn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: E.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function sN({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = k(), i = jt[t], c = t === "locked";
  return /* @__PURE__ */ o("tr", { className: E.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: E.headCell, children: [
      /* @__PURE__ */ n("span", { className: E.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: E.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: E.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: E.cell, children: /* @__PURE__ */ n(cN, { control: a, name: e.name, locked: c, describedBy: c ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: E.cell, style: { width: Bt }, children: /* @__PURE__ */ n(h, { role: i.role, label: i.label }) })
  ] });
}
function qt(e, a) {
  return String(e ?? a);
}
function dN(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function uN(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? qt(e.value, "—");
}
function mN({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: E.webControl, children: [
    /* @__PURE__ */ n(Oe, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => l == null ? void 0 : l(c) }),
    /* @__PURE__ */ n("span", { className: E.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function hN(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(mN, { ...e });
  const l = dN(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: E.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(Jn, { options: l, value: qt(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${E.webControl} ${E.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: uN(a) });
}
function wN({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const c = k(), s = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${E.row} ${E.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: E.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${E.name} ${E.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: c, className: `${E.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: E.webControl, children: i(c) }) : /* @__PURE__ */ n(hN, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${E.webChip} ward-policy-chip`, style: { width: Bt }, children: /* @__PURE__ */ n(h, { ...jt[t], size: "tag" }) })
  ] });
}
function p0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(wN, { ...e }) : /* @__PURE__ */ n(sN, { ...e });
}
const _N = "_label_17xa9_7", fN = "_name_17xa9_15", vN = "_column_17xa9_24", bN = "_webFrame_17xa9_57", gN = "_webHead_17xa9_62", pN = "_webHeadLabel_17xa9_74", yN = "_webLabel_17xa9_112", NN = "_webColumns_17xa9_119", kN = "_webGroup_17xa9_125", $N = "_webPeople_17xa9_126", CN = "_webVia_17xa9_127", SN = "_webMeta_17xa9_156", D = {
  label: _N,
  name: fN,
  column: vN,
  webFrame: bN,
  webHead: gN,
  webHeadLabel: pN,
  webLabel: yN,
  webColumns: NN,
  webGroup: kN,
  webPeople: $N,
  webVia: CN,
  webMeta: SN
}, RN = {
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
function qa({ column: e, children: a }) {
  return /* @__PURE__ */ n(
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
function TN(e) {
  if (!e.matrixRole) return;
  const a = RN[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function xN({ node: e }) {
  const a = TN(e);
  return /* @__PURE__ */ o("span", { className: D.label, children: [
    /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
    /* @__PURE__ */ n(LN, { role: a, node: e }),
    /* @__PURE__ */ n(qa, { column: ja[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(qa, { column: ja[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(qa, { column: ja[2], children: e.requestedVia ?? "" })
  ] });
}
function LN({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ n(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ n(h, { role: "warn", label: "Unresolved" })
  ] });
}
function AN({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    nt,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(xN, { node: t }),
      children: c
    }
  );
}
function Pa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function EN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${D.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Pa, { className: `${D.webMeta} ${D.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Pa, { className: `${D.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Pa, { className: `${D.webMeta} ${D.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function IN() {
  return /* @__PURE__ */ o("div", { className: D.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: D.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: D.webColumns, children: [
      /* @__PURE__ */ n("span", { className: D.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: D.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: D.webVia, children: "Requested via" })
    ] })
  ] });
}
function MN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${D.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function BN(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function jN({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: D.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(IN, {}),
    /* @__PURE__ */ n(gd, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      nt,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(MN, { row: t }),
        detail: /* @__PURE__ */ n(EN, { row: t }),
        expanded: BN(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function y0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(jN, { ...e }) : /* @__PURE__ */ n(AN, { ...e });
}
const qN = "_runbook_b9agc_2", PN = "_list_b9agc_7", HN = "_step_b9agc_15", FN = "_numeral_b9agc_21", ON = "_body_b9agc_28", DN = "_head_b9agc_34", WN = "_title_b9agc_40", zN = "_detail_b9agc_45", KN = "_actions_b9agc_50", GN = "_webList_b9agc_56", UN = "_webStep_b9agc_60", VN = "_webBody_b9agc_66", XN = "_webTitle_b9agc_74", YN = "_webDetail_b9agc_78", x = {
  runbook: qN,
  list: PN,
  step: HN,
  numeral: FN,
  body: ON,
  head: DN,
  title: WN,
  detail: zN,
  actions: KN,
  webList: GN,
  webStep: UN,
  webBody: VN,
  webTitle: XN,
  webDetail: YN
}, Pt = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Ht(e) {
  return String(e + 1).padStart(2, "0");
}
function JN({ step: e, index: a, connection: t }) {
  const r = Pt[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: x.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: x.numeral, children: Ht(a) }),
    /* @__PURE__ */ o("span", { className: x.body, children: [
      /* @__PURE__ */ o("span", { className: x.head, children: [
        /* @__PURE__ */ n("span", { className: x.title, children: e.title }),
        /* @__PURE__ */ n(h, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n(Ce, { startedAt: e.startedAt, connection: t })
      ] }),
      /* @__PURE__ */ n("span", { className: x.detail, children: e.detail })
    ] })
  ] });
}
function QN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: x.runbook, children: [
    /* @__PURE__ */ n("ol", { className: x.list, children: e.map((r, l) => /* @__PURE__ */ n(JN, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: x.actions, children: a })
  ] });
}
function ZN({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${x.step} ${x.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${x.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Ht(a) }),
    /* @__PURE__ */ o("span", { className: `${x.body} ${x.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${x.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${x.title} ${x.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(h, { ...Pt[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Ce, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${x.detail} ${x.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function ek({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: x.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${x.list} ${x.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(ZN, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${x.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function N0(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ek, { ...e }) : /* @__PURE__ */ n(QN, { ...e });
}
const ak = "_list_1gu6a_2", nk = "_check_1gu6a_10", tk = "_body_1gu6a_16", rk = "_text_1gu6a_23", lk = "_pending_1gu6a_32", ok = "_measured_1gu6a_37", Xe = {
  list: ak,
  check: nk,
  body: tk,
  text: rk,
  pending: lk,
  measured: ok
};
function ik(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function ck({ check: e }) {
  const a = ik(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Xe.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Qa, { state: a.state, label: a.label }),
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
function k0({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Xe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(ck, { check: a }, a.text)) });
}
const sk = "_root_a6xzy_2", dk = "_list_a6xzy_10", uk = "_line_a6xzy_21", mk = "_at_a6xzy_48", hk = "_text_a6xzy_52", wk = "_foot_a6xzy_56", _k = "_idle_a6xzy_68", fk = "_caret_a6xzy_76", vk = "_jump_a6xzy_83", he = {
  root: sk,
  list: dk,
  line: uk,
  at: mk,
  text: hk,
  foot: wk,
  idle: _k,
  caret: fk,
  jump: vk
}, bk = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function cn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : bk.format(new Date(e));
}
const gk = { warn: "warning", ok: "ok" };
function pk({ kind: e }) {
  const a = gk[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function yk({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${cn(e)}` });
}
function Nk({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${cn(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: he.idle, children: i }),
    /* @__PURE__ */ n(yk, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const kk = 8;
function $k(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > kk;
}
function Ck({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const Ft = We(null);
function $0({ announce: e, onAnnounceChange: a, children: t }) {
  const [r, l] = p(!1), i = Pn(() => ({
    announce: e ?? r,
    setAnnounce: (c) => {
      l(c), a == null || a(c);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ n(Ft.Provider, { value: i, children: t });
}
function Sk() {
  const e = De(Ft), [a, t] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, t];
}
function C0({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = f(null), [i, c] = p(0), [s, u] = Sk(), [d, m] = p(!1), v = e.at(-1);
  R(() => {
    c(e.length);
  }, [e.length]), Ga(() => {
    const y = l.current;
    y && !d && (y.scrollTop = y.scrollHeight);
  }, [e.length, d]);
  const b = () => {
    var B;
    const y = l.current;
    if (!y) return;
    const A = y.querySelectorAll("[data-consline-text]");
    (B = A.item(A.length - 1)) == null || B.focus(), m(!1);
  };
  return /* @__PURE__ */ o("div", { className: he.root, children: [
    /* @__PURE__ */ n("ol", { className: he.list, ref: l, "aria-live": s ? "polite" : "off", "aria-label": r, onScroll: (y) => m($k(y.currentTarget)), children: e.map((y, A) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": A < i, children: [
      /* @__PURE__ */ n("span", { className: he.at, children: cn(y.at) }),
      /* @__PURE__ */ n(pk, { kind: y.kind }),
      /* @__PURE__ */ n("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${A}`)) }),
    /* @__PURE__ */ o(Nk, { connection: a, idleSince: t, last: v, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": s, onClick: () => u(!s), children: "Read new events" }),
      /* @__PURE__ */ n(Ck, { shown: d, onJump: b })
    ] })
  ] });
}
const Rk = "_row_1k8wl_2", Tk = "_head_1k8wl_14", xk = "_author_1k8wl_20", Lk = "_eta_1k8wl_25", Ak = "_edited_1k8wl_26", Ek = "_body_1k8wl_32", Ik = "_reason_1k8wl_37", Mk = "_actions_1k8wl_42", pe = {
  row: Rk,
  head: Tk,
  author: xk,
  eta: Lk,
  edited: Ak,
  body: Ek,
  reason: Ik,
  actions: Mk
}, Bk = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function jk(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function qk({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function Pk({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: pe.reason, id: a, children: e })
  ] });
}
function Hk(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Fk(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(qk, { ...e }) : /* @__PURE__ */ n(Pk, { reason: e.unavailable, reasonId: e.unavailableId });
}
function S0(e) {
  const { comment: a } = e;
  Hk(e);
  const t = k(), r = `${t}-unavailable`, l = Bk[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${pe.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: pe.head, children: [
      /* @__PURE__ */ n("span", { className: pe.author, children: a.author }),
      /* @__PURE__ */ n(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: pe.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: pe.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: pe.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: pe.reason, id: t, children: jk(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: pe.actions, children: /* @__PURE__ */ n(Fk, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const Ok = "_root_c46wj_2", Dk = "_attach_c46wj_11", Wk = "_actions_c46wj_17", zk = "_reply_c46wj_23", Kk = "_replyRow_c46wj_28", Gk = "_sendsAs_c46wj_42", Je = {
  root: Ok,
  attach: Dk,
  actions: Wk,
  reply: zk,
  replyRow: Kk,
  sendsAs: Gk
};
function Ot({ value: e, onChange: a }) {
  const [t, r] = p("");
  return e === void 0 ? [t, r] : [e, a ?? (() => {
  })];
}
function Uk(e) {
  const { placeholder: a, asUser: t, onPost: r } = e, [l, i] = Ot(e), c = k();
  return /* @__PURE__ */ o("div", { className: Je.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Je.replyRow, children: [
      /* @__PURE__ */ n(I, { variant: "reply", labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: c }),
      /* @__PURE__ */ n(_, { variant: "ghost", describedBy: c, onClick: () => r(t, l), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: c, className: Je.sendsAs, children: `Sends as ${t}.` })
  ] });
}
function R0(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(Uk, { ...e }) : /* @__PURE__ */ n(Vk, { ...e });
}
function Vk(e) {
  const { placeholder: a, asUser: t, attachTo: r, requeueAfter: l, onPost: i, onDraft: c } = e, [s, u] = Ot(e);
  return /* @__PURE__ */ o("div", { className: Je.root, children: [
    /* @__PURE__ */ n(I, { kind: "textarea", label: a, value: s, onChange: u }),
    r && /* @__PURE__ */ o("div", { className: Je.attach, children: [
      /* @__PURE__ */ n(h, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ n(
      zn,
      {
        label: `Requeue ${l.agent} after posting`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Je.actions, children: [
      /* @__PURE__ */ n(_, { variant: "primary", onClick: () => i(t, s), children: `Post as ${t}` }),
      c && /* @__PURE__ */ n(_, { variant: "ghost", onClick: () => c(s), children: "Save draft" })
    ] })
  ] });
}
const Xk = "_list_1yhks_2", Yk = "_item_1yhks_6", Jk = "_body_1yhks_22", Qk = "_text_1yhks_28", Zk = "_evidence_1yhks_37", e1 = "_consequence_1yhks_49", a1 = "_note_1yhks_54", He = {
  list: Xk,
  item: Yk,
  body: Jk,
  text: Qk,
  evidence: Zk,
  consequence: e1,
  note: a1
};
function n1({ criterion: e }) {
  return /* @__PURE__ */ n(Ee, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Mn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function t1(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function r1({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: He.body, children: [
    /* @__PURE__ */ n("span", { className: He.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(Mn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: He.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(Mn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: He.consequence, children: t1(e.why) })
    ] })
  ] });
}
function l1({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: He.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(n1, { criterion: e }),
    /* @__PURE__ */ n(r1, { criterion: e })
  ] });
}
function T0({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${He.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(l1, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: He.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const o1 = "_list_dwhoz_2", i1 = "_rung_dwhoz_6", c1 = "_name_dwhoz_18", s1 = "_actor_dwhoz_32", ma = {
  list: o1,
  rung: i1,
  name: c1,
  actor: s1
}, d1 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function u1({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = d1[e.state];
  return /* @__PURE__ */ o("li", { className: ma.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ma.name, children: e.name }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ma.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function x0({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ma.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(u1, { rung: a }, a.name)) });
}
const m1 = "_sheet_pw37w_2", h1 = "_title_pw37w_9", w1 = "_stage_pw37w_15", _1 = "_effects_pw37w_20", f1 = "_effect_pw37w_20", v1 = "_numeral_pw37w_31", b1 = "_effectText_pw37w_38", g1 = "_refusals_pw37w_43", p1 = "_reasons_pw37w_52", y1 = "_reason_pw37w_52", N1 = "_actions_pw37w_62", ue = {
  sheet: m1,
  title: h1,
  stage: w1,
  effects: _1,
  effect: f1,
  numeral: v1,
  effectText: b1,
  refusals: g1,
  reasons: p1,
  reason: y1,
  actions: N1
};
function k1({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function L0({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: c }) {
  const s = k(), u = `${s}-refusal`, [d, m] = p(""), v = t.length > 0;
  return /* @__PURE__ */ n(la, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
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
      ts,
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
      /* @__PURE__ */ n(k1, { refused: v, reasonId: u, note: d, onRequeue: l }),
      /* @__PURE__ */ n(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const $1 = "_list_1rowi_2", C1 = "_path_1rowi_7", S1 = "_head_1rowi_21", R1 = "_label_1rowi_28", T1 = "_consequence_1rowi_35", x1 = "_ask_1rowi_36", Ye = {
  list: $1,
  path: C1,
  head: S1,
  label: R1,
  consequence: T1,
  ask: x1
}, za = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Bn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function jn(e) {
  return e ? "primary" : "secondary";
}
function L1({ path: e, primary: a, onChoose: t }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ n(_, { variant: jn(a), size: "sm", onClick: () => t(e.kind), children: za[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: jn(a), size: "sm", disabled: !0, describedBy: r, children: za[e.kind] }),
    /* @__PURE__ */ n("span", { className: Ye.ask, id: r, children: e.askInstead })
  ] });
}
function A1({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ye.path, "data-allowed": e.allowed, "data-role": Bn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ye.head, children: [
      /* @__PURE__ */ n("span", { className: Ye.label, children: e.title ?? za[e.kind] }),
      /* @__PURE__ */ n(h, { role: Bn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Ye.consequence, children: e.consequence }),
    /* @__PURE__ */ n(L1, { path: e, primary: a, onChoose: t })
  ] });
}
function A0({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Ye.list, children: e.map((t, r) => /* @__PURE__ */ n(A1, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const E1 = "_list_1m7i0_2", I1 = "_item_1m7i0_6", M1 = "_node_1m7i0_18", B1 = "_body_1m7i0_24", j1 = "_head_1m7i0_30", q1 = "_stage_1m7i0_36", P1 = "_version_1m7i0_41", H1 = "_sentence_1m7i0_49", F1 = "_meta_1m7i0_54", Ne = {
  list: E1,
  item: I1,
  node: M1,
  body: B1,
  head: j1,
  stage: q1,
  version: P1,
  sentence: H1,
  meta: F1
}, O1 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function D1({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ne.head, children: [
    /* @__PURE__ */ n("span", { className: Ne.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Ne.version, title: e.version, children: e.version }) : null
  ] });
}
function W1({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ne.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Ne.node} ward-history-node`, children: /* @__PURE__ */ n(Ee, { size: 9, kind: O1[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ne.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(D1, { entry: e }),
      /* @__PURE__ */ n("span", { className: Ne.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ne.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function E0({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Ne.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(W1, { entry: a }, a.stage + String(t))) });
}
const z1 = "_thread_1e70p_3", K1 = "_turn_1e70p_8", G1 = "_who_1e70p_27", U1 = "_body_1e70p_32", ha = {
  thread: z1,
  turn: K1,
  who: G1,
  body: U1
}, Dt = We(!1);
function I0({ children: e, density: a }) {
  return /* @__PURE__ */ n(Dt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ha.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function M0({ turn: e }) {
  if (!De(Dt)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ha.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ha.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${ha.body} ward-chat-body`, children: e.body })
  ] });
}
const V1 = "_list_yiolt_3", X1 = "_row_yiolt_7", Y1 = "_label_yiolt_20", J1 = "_n_yiolt_26", Q1 = "_cause_yiolt_33", ea = {
  list: V1,
  row: X1,
  label: Y1,
  n: J1,
  cause: Q1
};
function Z1(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const e$ = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function a$({ row: e, formatNumber: a }) {
  return Z1(e), /* @__PURE__ */ o("li", { className: `${ea.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ee, { size: 8, ...e$[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: ea.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${ea.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(n$, { cause: e.cause })
  ] });
}
function n$({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${ea.cause} ward-healthrow-cause`, children: e }) : null;
}
function B0({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${ea.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(a$, { row: t, formatNumber: a }, t.label)) });
}
const t$ = "_root_1jxwp_2", r$ = {
  root: t$
};
function j0({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: r$.root, "data-density": l, children: [
    /* @__PURE__ */ n(Aa, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const l$ = "_row_dhbre_3", o$ = "_key_dhbre_13", i$ = "_stack_dhbre_24", c$ = "_value_dhbre_32", s$ = "_evidence_dhbre_39", d$ = "_mark_dhbre_47", Ve = {
  row: l$,
  key: o$,
  stack: i$,
  value: c$,
  evidence: s$,
  mark: d$
};
function u$({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(Qa, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function q0({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ve.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Ve.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ve.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Ve.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Ve.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Ve.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(u$, { state: e.state }) })
  ] });
}
const m$ = "_cell_gh2sd_2", h$ = {
  cell: m$
}, w$ = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function _$(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function f$(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function v$(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: _$(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function b$(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function P0({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  f$(e, t);
  const r = b$(e);
  return /* @__PURE__ */ n(
    vs,
    {
      label: "Rejection routing",
      columns: w$,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: h$.cell, "data-norerun": l.noRerun ? !0 : void 0, children: v$(l, i) }),
      empty: a ?? /* @__PURE__ */ n(ru, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const g$ = "_row_1f2re_2", p$ = "_title_1f2re_12", y$ = "_turns_1f2re_18", N$ = "_waiting_1f2re_19", k$ = "_resolved_1f2re_20", $$ = "_activity_1f2re_21", C$ = "_cost_1f2re_28", S$ = "_link_1f2re_29", R$ = "_tableLink_1f2re_47", T$ = "_tableRecord_1f2re_48", x$ = "_tableRow_1f2re_59", L$ = "_tableTitle_1f2re_71", A$ = "_tableResolved_1f2re_76", E$ = "_tableMeta_1f2re_87", I$ = "_tableCost_1f2re_94", M$ = "_tableActivity_1f2re_95", B$ = "_tableState_1f2re_105", H = {
  row: g$,
  title: p$,
  turns: y$,
  waiting: N$,
  resolved: k$,
  activity: $$,
  cost: C$,
  link: S$,
  tableLink: R$,
  tableRecord: T$,
  tableRow: x$,
  tableTitle: L$,
  tableResolved: A$,
  tableMeta: E$,
  tableCost: I$,
  tableActivity: M$,
  tableState: B$
}, Wt = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function j$(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function q$(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function P$(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const H$ = { duplicate: "Closed · duplicate" };
function F$({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(Ae, { className: H.tableMeta, text: `waiting on ${e}` });
}
function O$({ value: e }) {
  return /* @__PURE__ */ n("td", { className: H.tableCost, children: e === void 0 ? null : re(e) });
}
function D$({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${H.tableRecord} ward-target`, href: z(e.href), children: `→ ${e.key}` });
}
function W$({ session: e, href: a }) {
  const t = Wt[e.state];
  return /* @__PURE__ */ o("tr", { className: H.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: H.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${H.tableLink} ward-target`, href: z(a), children: /* @__PURE__ */ n(Ae, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: H.tableMeta, children: q$(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: H.tableResolved, children: [
      P$(e.resolved),
      /* @__PURE__ */ n(F$, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(O$, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: H.tableActivity, children: j$(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: H.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(h, { role: t.role, label: H$[e.state] ?? t.label }),
      /* @__PURE__ */ n(D$, { link: e.link })
    ] }) })
  ] });
}
function z$({ session: e }) {
  const a = Wt[e.state];
  return /* @__PURE__ */ o("div", { className: H.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(Ae, { className: H.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: H.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(Ae, { className: H.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: H.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: H.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : re(e.cost) }),
    /* @__PURE__ */ n("span", { className: H.activity, children: de(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: H.link, href: z(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function H0(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(W$, { session: e.session, href: e.href }) : /* @__PURE__ */ n(z$, { session: e.session });
}
const K$ = "_block_1yy2v_3", G$ = "_list_1yy2v_9", U$ = "_line_1yy2v_14", Ka = {
  block: K$,
  list: G$,
  line: U$
}, V$ = { warn: "warning", ok: "ok" };
function X$({ kind: e }) {
  const a = V$[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Y$({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Ka.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(X$, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function F0({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Ka.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Ka.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(Y$, { line: t }, `${r}-${t.text}`)) }) });
}
const J$ = "_band_tt7hp_1", Q$ = "_head_tt7hp_8", Z$ = "_cell_tt7hp_19", eC = "_index_tt7hp_35", aC = "_title_tt7hp_42", nC = "_note_tt7hp_48", tC = "_cellTitle_tt7hp_53", rC = "_cellBody_tt7hp_58", lC = "_tag_tt7hp_64", ge = {
  band: J$,
  head: Q$,
  cell: Z$,
  index: eC,
  title: aC,
  note: nC,
  cellTitle: tC,
  cellBody: rC,
  tag: lC
}, qn = 4;
function O0({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== qn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${qn}-cell grid`);
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
  RC as ActionStack,
  C0 as ActivityConsole,
  bw as AgentCard,
  bC as AppShell,
  s0 as AppearanceStrip,
  O0 as Band,
  $C as BarChart,
  Hu as BoardColumn,
  DC as BoardFootnote,
  WC as BoardHeader,
  MC as BoardScroller,
  _ as Btn,
  wC as CHIP_ROLES,
  Tt as CREDENTIAL_COLUMNS,
  kC as Callout,
  d0 as CapabilityRow,
  M0 as ChatMessage,
  zn as Checkbox,
  h as Chip,
  Ae as ClampText,
  S0 as ClarificationRow,
  ZC as ClauseRuleRow,
  QC as ClauseRules,
  ct as ColourLadder,
  u0 as ComponentRow,
  R0 as Composer,
  KC as ConfigRow,
  zC as ConfigRowHead,
  Za as ConnectionMark,
  $0 as ConsoleAnnounceProvider,
  I0 as Conversation,
  ts as CostMeter,
  h0 as CredentialRow,
  m0 as CredentialRowHead,
  T0 as CriteriaList,
  Fl as Crumb,
  B0 as DeliveryHealth,
  qC as DeniedState,
  a0 as DryRunRail,
  ru as EmptyState,
  w0 as EnvCard,
  I as Field,
  jC as FilteredEmpty,
  EC as FormStack,
  Aa as GateChecklist,
  x0 as GateLadder,
  vs as Grid,
  t0 as HandoffRuleRow,
  n0 as HandoffRules,
  GC as ItemDrawer,
  _0 as KeyPanel,
  ir as LIVE_EVENT_TYPES,
  Fh as LegacyBoardColumn,
  VC as LegacyBoardHeader,
  XC as LegacyConfigRow,
  JC as LegacyItemDrawer,
  Ih as LegacyOverCapNote,
  YC as LegacyPreviewRail,
  lt as LegacyWorkCard,
  Ce as LiveIndicator,
  PC as LoadFailed,
  OC as Loading,
  Mt as MCP_SERVER_COLUMNS,
  Qa as Mark,
  v0 as MarkUpload,
  Ee as Marker,
  g0 as McpServerRow,
  b0 as McpServerRowHead,
  r0 as NewStreamModal,
  iu as OverCapNote,
  la as Overlay,
  e0 as PARTIAL_STEP_REASON,
  Bt as POLICY_CHIP_WIDTH,
  xC as PageFrame,
  NC as PageHeader,
  CC as PlainList,
  p0 as PolicyRow,
  UC as PreviewRail,
  ja as ROLE_MATRIX_COLUMNS,
  pt as RULE_ACTIONS,
  Zn as Radio,
  j0 as ReadyChecklist,
  AC as RecordSection,
  L0 as RequeueSheet,
  A0 as ResolveBlock,
  q0 as ResolvedFieldRow,
  y0 as RoleMatrixRow,
  P0 as RoutingTable,
  l0 as RuleRow,
  N0 as RunbookSteps,
  or as STREAM_STEPS,
  IC as SectionBand,
  yn as SectionHeader,
  Jn as SegmentedControl,
  Vn as Select,
  H0 as SessionRow,
  yC as Sidebar,
  o0 as StageColumn,
  BC as StageGrid,
  E0 as StageHistory,
  ev as StageListEditor,
  HC as StaleStrip,
  Ta as StatStrip,
  i0 as StreamRow,
  LC as SubjectRail,
  Oe as Switch,
  pC as TabLinks,
  SC as TableHead,
  gC as Tabs,
  c0 as ToolRow,
  TC as TopBar,
  gd as Tree,
  nt as TreeRow,
  F0 as TypedInputBlock,
  tl as UNSAFE_HREF,
  k0 as ValidationList,
  sC as VisibilityProvider,
  dC as Visible,
  hC as WARD_VERSION,
  La as WorkCard,
  FC as WriteUnavailableStrip,
  j$ as agoSince,
  Qt as clock,
  vv as colourStatus,
  ae as count,
  se as duration,
  Ua as elapsed,
  mC as eventSourceTransport,
  $a as isStreamStep,
  Ca as isValidatedStreamStep,
  Vw as ladderValidation,
  Fy as mcpConnectionChip,
  Py as mcpToolName,
  re as money,
  we as ms,
  tt as ordered,
  Hn as ratio,
  op as restartLabel,
  z as safeHref,
  de as stamp,
  Dn as stream,
  fC as streamChip,
  Ra as streamChipProps,
  ve as streamColour,
  sr as streamHex,
  _C as streamVars,
  da as useBorderFlash,
  tr as useFocusTrap,
  vC as useLiveFeed,
  uC as useReturnFocus,
  ka as useRovingTabindex,
  Va as useTicker,
  Zt as useVisible,
  W as v,
  f0 as validateMark,
  ra as validatedStep,
  On as validatedStreamSteps
};
