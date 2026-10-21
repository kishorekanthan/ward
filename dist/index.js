import { jsx as n, Fragment as x, jsxs as i } from "react/jsx-runtime";
import { useMemo as ja, useContext as Ne, createContext as ke, useState as b, useEffect as S, useCallback as te, useRef as f, useLayoutEffect as ot, useId as y, Fragment as Pa, isValidElement as kl, Children as qa } from "react";
import { createPortal as $l, flushSync as Ha } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const Yn = (e) => String(e).padStart(2, "0");
function Tn(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${Yn(t % 60)}s` : `${Math.floor(a / 60)}h ${Yn(a % 60)}m`;
}
const Cl = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const t = Cl.formatToParts(new Date(e)), a = (r) => {
    var l;
    return ((l = t.find((o) => o.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${a("day")} ${a("month")} ${a("hour")}:${a("minute")}`;
}
function oe(e) {
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
function Da(e, t) {
  return `${e} / ${t}`;
}
const Sl = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Rl(e) {
  return Sl.format(new Date(e));
}
const Oa = ke(/* @__PURE__ */ new Set());
function fL({ hidden: e, children: t }) {
  const a = ja(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Oa.Provider, { value: a, children: t });
}
function xl(e) {
  return !Ne(Oa).has(e);
}
function vL({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: xl(e) ? t : a });
}
const Tl = "(prefers-color-scheme: dark)";
function Jn() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Tl) : null;
}
function Ll(e) {
  const [t, a] = b(() => {
    var r;
    return ((r = Jn()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? Jn() : null;
    if (!r) return;
    const l = () => a(r.matches);
    return l(), r.addEventListener("change", l), () => r.removeEventListener("change", l);
  }, [e]), t;
}
function ln(e, t) {
  S(() => {
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function Al(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function bL({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const l = Ll(e === "system");
  return ln("data-theme", Al(e, l)), ln("data-accent", t), ln("data-density", a), /* @__PURE__ */ n(x, { children: r });
}
const El = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Il(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function Ml(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function Bl(e, t, a, r) {
  return e.shiftKey ? Il(t, a) ? r : void 0 : document.activeElement === r || Ml(t) ? a : void 0;
}
function jl(e, t, a) {
  const r = a[0], l = a[a.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const o = Bl(e, t, r, l);
  o && (e.preventDefault(), o.focus());
}
function Pl(e) {
  return { onKeyDown: te(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(El));
      jl(a, e.current, r);
    },
    [e]
  ) };
}
function pL(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var l, o;
      (o = (l = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : l.focus) == null || o.call(l);
    };
  }, [t, e]);
}
const Xn = { ArrowUp: -1, ArrowDown: 1 }, Qn = { ArrowLeft: -1, ArrowRight: 1 }, ql = (e, t, a) => Math.min(a, Math.max(t, e));
function Hl(e, t) {
  if (t !== "horizontal" && e in Xn) return Xn[e];
  if (t !== "vertical" && e in Qn) return Qn[e];
}
function Jt({ orientation: e = "both" } = {}) {
  const [t, a] = b(0), r = f(/* @__PURE__ */ new Map()), l = f(!1);
  ot(() => {
    var _;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(t)) return;
    const h = u[0], w = l.current;
    l.current = !1, a(h), w && ((_ = r.current.get(h)) == null || _.focus());
  });
  const o = te((u) => a(u), []), s = te((u) => {
    var h;
    a(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = te(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(t)), _ = Hl(u.key, e);
      _ !== void 0 ? (u.preventDefault(), s(h[ql(w + _, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [t, s, e]
  ), d = te(
    (u) => ({
      tabIndex: u === t ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(u, h) : (r.current.delete(u), u === t && (l.current = !0));
      },
      onFocus: () => a(u),
      "data-ward-roving": !0
    }),
    [t]
  );
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: o };
}
const gL = (e, t, a) => {
  const r = new EventSource(e), l = (o) => a.onEvent(o.data, o.lastEventId, o.type);
  r.onmessage = l;
  for (const o of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(o, l);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, yL = "0.2.0", NL = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Dl = [1, 2, 3, 4, 5, 6], Fa = [1, 2, 3], Ol = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], kL = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], $L = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], j = {
  color: {
    bg: "var(--ward-color-bg)",
    ground: "var(--ward-color-ground)",
    surface: "var(--ward-color-surface)",
    surface2: "var(--ward-color-surface2)",
    line: "var(--ward-color-line)",
    line2: "var(--ward-color-line2)",
    edge: "var(--ward-color-edge)",
    panelEdge: "var(--ward-color-panelEdge)",
    inset: "var(--ward-color-inset)",
    insetEdge: "var(--ward-color-insetEdge)",
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
    tableHead: "var(--ward-color-tableHead)",
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
    s8: "var(--ward-space-8)",
    s9: "var(--ward-space-9)",
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
    gridCell: "var(--ward-pad-gridCell)",
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
    matrixRow: "var(--ward-pad-matrixRow)",
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
    streamChainMin: "var(--ward-width-streamChainMin)",
    colourPick: "var(--ward-width-colourPick)",
    iconRail: "var(--ward-width-iconRail)",
    menuIcon: "var(--ward-width-menuIcon)",
    measure: "var(--ward-width-measure)",
    splitMain: "var(--ward-width-splitMain)"
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
    navIcon: "var(--ward-height-navIcon)",
    streamAvatar: "var(--ward-height-streamAvatar)",
    streamAvatarLg: "var(--ward-height-streamAvatarLg)"
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
    personName: "var(--ward-type-personName)",
    rowText: "var(--ward-type-rowText)",
    rowTextStrong: "var(--ward-type-rowTextStrong)",
    streamAvatar: "var(--ward-type-streamAvatar)",
    tagText: "var(--ward-type-tagText)",
    eyebrow: "var(--ward-type-eyebrow)",
    eyebrowTracking: "var(--ward-type-eyebrow-tracking)",
    eyebrowTransform: "var(--ward-type-eyebrow-transform)",
    caption: "var(--ward-type-caption)",
    proseH2: "var(--ward-type-proseH2)",
    proseH3: "var(--ward-type-proseH3)",
    proseH4: "var(--ward-type-proseH4)",
    codeText: "var(--ward-type-codeText)",
    lead: "var(--ward-type-lead)"
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
}, pe = {
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
function Ln(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Xt(e) {
  return Dl.includes(e);
}
function gt(e) {
  return Fa.includes(e);
}
function Fl(e) {
  if (!Xt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function CL(e) {
  if (!Xt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const zl = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Wl(e) {
  if (!Xt(e)) throw new Error("unvalidated stream step");
  return zl[e];
}
function Zn(e) {
  return typeof e != "string" ? null : Ol.includes(e) ? e : null;
}
function Kl(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function Gl(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function Ul(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Vl(e, t, a) {
  const r = Kl(e);
  if (r === null) return null;
  const l = Zn(a) ?? Zn(r.type);
  return l === null ? null : { ...r, type: l, id: Gl(r, t), at: Ul(r) };
}
function Yl(e, t) {
  return e >= pe.staleAfter ? "stale" : e >= pe.heartbeat && t === "live" ? "reconnecting" : null;
}
function Jl(e, t, a) {
  return e >= pe.heartbeat && !t && a !== null;
}
function SL(e, t) {
  const [a, r] = b("reconnecting"), [l, o] = b(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), h = f(null), w = f(0), _ = f(0), N = f(!1), k = f("reconnecting"), E = te((L) => {
    k.current = L, r(L);
  }, []), H = te(() => {
    c.current = Date.now();
  }, []), me = te((L) => {
    for (const [J, $e] of s.current)
      ($e === "*" || L.itemKey === $e) && J(L);
  }, []), re = te(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (L, J, $e) => {
        const Ue = Vl(L, J, $e);
        Ue !== null && (Ue.id && (d.current = Ue.id), H(), N.current = !1, E("live"), o(Ue.at), me(Ue));
      },
      onOpen: () => {
        u.current = 0, N.current = !1, H(), E("live");
      },
      onError: () => {
        var J;
        (J = h.current) == null || J.close(), h.current = null, N.current = !0, k.current !== "stale" && E("reconnecting");
        const L = Math.min(pe.reconnectBase * 2 ** u.current, pe.reconnectMax);
        u.current += 1, w.current = window.setTimeout(re, L);
      }
    });
  }, [me, E, H, t, e]), je = te((L) => {
    N.current = !0, L.close(), h.current = null, w.current = window.setTimeout(re, pe.reconnectBase);
  }, [re]), Ze = te((L, J) => (s.current.set(J, L), () => {
    s.current.delete(J);
  }), []);
  return S(() => (re(), _.current = window.setInterval(() => {
    const L = Date.now() - c.current, J = Yl(L, k.current);
    J && E(J);
    const $e = h.current;
    Jl(L, N.current, $e) && je($e);
  }, pe.tick), () => {
    var L;
    window.clearInterval(_.current), window.clearTimeout(w.current), N.current = !1, (L = h.current) == null || L.close(), h.current = null;
  }), [re, je, E]), { connection: a, lastEventAt: l, subscribe: Ze };
}
function An(e, t) {
  const a = new Date(e).getTime(), [r, l] = b(() => Date.now());
  return S(() => {
    if (!t) return;
    const o = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    o();
    const s = window.setInterval(o, pe.tick);
    return document.addEventListener("visibilitychange", o), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", o);
    };
  }, [t, a]), Math.max(0, r - a);
}
const Xl = { blue: "running", orange: "waiting", green: "done" };
function Ql() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ea(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function Mt(e, t) {
  const a = f(0), r = te((l) => {
    const o = l ?? t, s = e.current;
    s !== null && o !== void 0 && (Ql() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${Xl[o]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => ea(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => ea(s), pe.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (l) => r(l) : () => r(t);
}
const Zl = "_root_1otpc_2", eo = {
  root: Zl
};
function to(e, t, a, r, l) {
  const o = [Tn(t)];
  return e || o.push(`as of ${Rl(a)}`), r && o.push(`turn ${r[0]}/${r[1]}`), l && o.push(l.label), o;
}
function Me({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const l = a !== "stale", o = An(e, l), s = (t == null ? void 0 : t.at) ?? e, c = to(l, o, s, r, t);
  return /* @__PURE__ */ i("span", { className: `${eo.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const no = "_app_1bnco_1", ao = "_side_1bnco_35", ro = "_sideTop_1bnco_46", lo = "_sideBody_1bnco_60", oo = "_iconRail_1bnco_99", io = "_railItem_1bnco_108", so = "_railIcon_1bnco_129", co = "_railDot_1bnco_134", uo = "_railLetter_1bnco_140", ho = "_main_1bnco_146", mo = "_rail_1bnco_108", wo = "_page_1bnco_168", _o = "_headerRow_1bnco_191", fo = "_sidebarToggle_1bnco_198", vo = "_headerSlot_1bnco_203", bo = "_headerAction_1bnco_208", po = "_drawerSide_1bnco_213", go = "_root_1bnco_260", yo = "_topbar_1bnco_267", No = "_mark_1bnco_278", ko = "_brand_1bnco_285", $o = "_tagline_1bnco_291", Co = "_identity_1bnco_297", So = "_tools_1bnco_298", Ro = "_nav_1bnco_308", xo = "_metadata_1bnco_315", To = "_actor_1bnco_330", Lo = "_detail_1bnco_331", Ao = "_content_1bnco_376", Eo = "_toolsPanel_1bnco_392", Io = "_skip_1bnco_418", C = {
  app: no,
  side: ao,
  sideTop: ro,
  sideBody: lo,
  iconRail: oo,
  railItem: io,
  railIcon: so,
  railDot: co,
  railLetter: uo,
  main: ho,
  rail: mo,
  page: wo,
  headerRow: _o,
  sidebarToggle: fo,
  headerSlot: vo,
  headerAction: bo,
  drawerSide: po,
  root: go,
  topbar: yo,
  mark: No,
  brand: ko,
  tagline: $o,
  identity: Co,
  tools: So,
  nav: Ro,
  metadata: xo,
  actor: To,
  detail: Lo,
  content: Ao,
  toolsPanel: Eo,
  skip: Io
};
function ct(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const Mo = "_scope_1an6i_2", Bo = {
  scope: Mo
}, za = ke(null);
function RL({ reason: e, actions: t = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ i("fieldset", { disabled: !0, className: `${Bo.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(za.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Be() {
  return Ne(za);
}
function Qt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : ct(e, t.reasonId);
}
const jo = "_btn_hrmlj_2", Po = "_primary_hrmlj_14", qo = "_destructive_hrmlj_25", Ho = "_secondary_hrmlj_35", Do = "_ghost_hrmlj_40", Oo = "_overflow_hrmlj_49", Fo = "_sm_hrmlj_56", zo = "_disabled_hrmlj_60", Wo = "_withReason_hrmlj_68", Ko = "_reason_hrmlj_74", lt = {
  btn: jo,
  primary: Po,
  destructive: qo,
  secondary: Ho,
  ghost: Do,
  overflow: Oo,
  sm: Fo,
  disabled: zo,
  withReason: Wo,
  reason: Ko
};
function Go(e, t, a, r) {
  const l = t === "sm" ? [lt.sm, "ward-btn--sm"] : [], o = a ? [lt.disabled] : [];
  return [lt.btn, lt[e], "ward-btn", `ward-btn--${e}`, ...l, ...o, r ?? ""].filter(Boolean).join(" ");
}
function Uo(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Vo(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Yo(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function Jo(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Xo(e, t, a) {
  return Jo(e.describedBy, t && a);
}
function Qo({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${lt.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function Zo(e) {
  return e.children ?? e.label;
}
function v(e) {
  var t;
  return ((t = Be()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(ei, { ...e });
}
function ei(e) {
  const t = Be();
  Vo(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || t), o = Yo(e, t), s = y(), c = ti(o, t);
  return /* @__PURE__ */ i(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: Go(a, r, l, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: l,
        title: o,
        "aria-describedby": Xo(e, o, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Uo(a, e.controls),
        children: Zo(e)
      }
    ),
    /* @__PURE__ */ n(Qo, { id: s, reason: o, shown: c === Wa })
  ] });
}
function ti(e, t) {
  return e && !t ? Wa : Pa;
}
function Wa({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${lt.withReason} ward-btn-withReason`, children: e });
}
let En = "none";
function ni(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (En = "key");
}
typeof document < "u" && (document.addEventListener("keydown", ni, !0), document.addEventListener("pointerdown", () => {
  En = "pointer";
}, !0));
function ai() {
  return En === "key";
}
function bt(e) {
  const [t, a] = b(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var o;
    const r = (o = window.matchMedia) == null ? void 0 : o.call(window, e);
    if (!r) return;
    const l = (s) => a(s.matches);
    return r.addEventListener("change", l), a(r.matches), () => r.removeEventListener("change", l);
  }, [e]), t;
}
const ri = "_scrim_1cawq_2", li = "_drawer_1cawq_10", oi = "_sheet_1cawq_14", ii = "_modal_1cawq_18", si = "_panel_1cawq_23", ci = "_start_1cawq_44", di = "_header_1cawq_67", ui = "_title_1cawq_75", hi = "_body_1cawq_79", mi = "_close_1cawq_106", Le = {
  scrim: ri,
  drawer: li,
  sheet: oi,
  modal: ii,
  panel: si,
  start: ci,
  header: di,
  title: ui,
  body: hi,
  close: mi
}, wi = ke(null), Ht = [], Dt = /* @__PURE__ */ new Map();
function _i(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function fi(e, t) {
  let a = Dt.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, Dt.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function vi(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !_i(r) && fi(e, r);
}
function bi(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (vi(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function pi(e) {
  for (const t of e.claims) {
    const a = Dt.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), Dt.delete(t)));
  }
}
function gi(e, t) {
  const a = { root: e, claims: [] };
  return Ht.push(a), bi(a, t), a;
}
function yi(e) {
  const t = Ht.indexOf(e);
  t >= 0 && Ht.splice(t, 1), pi(e);
}
function ta(e) {
  return e !== null && Ht.at(-1) === e;
}
function Ni(e, t, a) {
  const r = f(null), l = f(a);
  return l.current = a, S(() => {
    const o = e.current;
    if (!o) return;
    const s = document.activeElement, c = gi(o, t);
    return r.current = c, () => {
      var u, h;
      const d = ta(c);
      yi(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), te(() => ta(r.current), []);
}
function ki(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function $i(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ci({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Le.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("header", { className: `${Le.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Le.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Le.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Si(e) {
  return `${Le.scrim} ${Le[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Ri(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Le.panel} ${Le[e]} ward-overlay-panel${a}${r}`;
}
function xi(e) {
  const t = Ne(wi);
  return e ?? t ?? document.body;
}
function dt(e) {
  const t = f(null), a = f(null), r = y(), l = xi(e.container), o = bt("(min-width: 768px)"), s = ki(e.kind, o), c = $i(e, r), d = Pl(a), [u] = b(ai), h = Ni(t, l, e.returnFocusTo), w = te(() => {
    h() && e.onClose();
  }, [e.onClose, h]);
  return S(() => {
    var _;
    h() && ((_ = a.current) == null || _.focus());
  }, [h]), S(() => {
    const _ = (N) => {
      N.key === "Escape" && w();
    };
    return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, [w]), $l(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: Si(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: w,
        children: /* @__PURE__ */ i(
          "div",
          {
            ref: a,
            id: e.id,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": c.labelledBy,
            "aria-label": c.label,
            tabIndex: -1,
            "data-focus-ring": u || void 0,
            className: Ri(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => h() && d.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Le.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Ci, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Ti = /^([a-z][a-z0-9+.-]*):/i, Li = /* @__PURE__ */ new Set(["http", "https", "mailto"]), Ai = "#";
function Ei(e) {
  var r, l;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (l = (r = Ti.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function T(e) {
  const t = Ei(e);
  return t === void 0 || Li.has(t) ? e : Ai;
}
function Ii(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function Ka(e) {
  const t = Ii(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function Mi(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => Ka(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const o of [a, ...a.children]) l == null || l.observe(o);
    return r(), () => {
      a.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, t]);
}
function Bi(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : l > e.clientWidth - a ? e.scrollLeft + l - e.clientWidth + a : null;
}
function ji(e, t, a) {
  ot(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !l) return;
    const o = Bi(r, l);
    o !== null && (r.scrollLeft = Math.max(0, o)), Ka(r);
  }, [e, t, a]);
}
const Pi = "_row_11g8i_2", qi = {
  row: Pi
};
function Hi(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function In({ label: e, children: t, count: a, as: r = "div", focusable: l = !0, rowRef: o, className: s, ...c }) {
  const d = f(null), u = o ?? d;
  return Mi(u, a), /* @__PURE__ */ n(r, { ref: u, className: [qi.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Hi(l, r), ...c, children: t });
}
const Di = "_icon_1ylqy_2", Oi = {
  icon: Di
};
function yt({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: Oi.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function xL() {
  return /* @__PURE__ */ n(yt, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function TL() {
  return /* @__PURE__ */ i(yt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function LL() {
  return /* @__PURE__ */ i(yt, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function AL() {
  return /* @__PURE__ */ n(yt, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Fi() {
  return /* @__PURE__ */ i(yt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const Ga = "ward:sidebar-collapsed", zi = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Wi() {
  try {
    return window.localStorage.getItem(Ga) === "true";
  } catch {
    return !1;
  }
}
function Ki(e) {
  try {
    window.localStorage.setItem(Ga, String(e));
  } catch {
  }
}
function Gi(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Ui(e) {
  return e instanceof Element && e.closest(zi) !== null;
}
function Vi(e) {
  return e.key === "[" && !Gi(e) && !Ui(e.target);
}
function Yi(e) {
  const [t, a] = b(Wi), r = () => {
    Ki(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const l = (o) => {
      var c;
      if (!Vi(o)) return;
      const s = o.target instanceof Element ? o.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, t]), { collapsed: t, toggle: r };
}
function Ji() {
  const e = bt("(max-width: 767.98px)"), t = bt("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function Xi(e) {
  const t = e === "phone", a = y(), r = f(null), [l, o] = b(!1);
  return l && !t && o(!1), { narrow: t, open: l, drawerId: a, slotRef: r, toggle: () => o(!l), close: () => o(!1) };
}
function Qi({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ i("div", { className: C.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: C.headerSlot, children: e }),
    Ja(t) && /* @__PURE__ */ n("span", { className: C.headerAction, children: t })
  ] }) : e;
}
function Zi(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function es({ sidebar: e, label: t, drawer: a }) {
  var l;
  if (Zi(a.open, a.close), !a.open) return null;
  const r = (o) => {
    o.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(dt, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (l = a.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ n("div", { className: C.drawerSide, onClick: r, children: Ua(e, !1) }) });
}
function ts(e) {
  const [t, a] = b(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function ns(e, t) {
  const a = Yi(e === "wide" && !t), r = ts(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function as(e, t) {
  const a = ns(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return ls(e.collapsed, t);
  const r = a.collapsed, l = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: l, drawsStrip: !l && typeof e.sidebar == "function", toggle: a.toggle };
}
const rs = (e) => e.collapsed && e.drawsStrip;
function ls(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const na = (e) => e ? "" : void 0;
function Ua(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Va({ fold: e }) {
  return /* @__PURE__ */ i(v, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(Fi, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function os({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: C.sideTop, children: /* @__PURE__ */ n(Va, { fold: e }) });
}
const Ya = ke(null);
function EL() {
  const e = Ne(Ya);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(Va, { fold: e });
}
function is({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": Ln(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function ss({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: C.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ i("a", { className: C.railItem, href: T(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(is, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function cs({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: l }) {
  const o = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ i("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(os, { fold: r, inSidebar: l && !o }),
    /* @__PURE__ */ n("div", { className: C.sideBody, hidden: o, children: Ua(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(ss, { items: a ?? [], label: t })
  ] });
}
const Ja = (e) => e != null;
function ds(e) {
  const { sidebar: t, header: a, action: r, children: l, rail: o, iconRail: s, pageFill: c } = e, d = Ja(o), u = Ji(), h = Xi(u), w = as(e, u), _ = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ i("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": na(rs(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(Ya.Provider, { value: w, children: /* @__PURE__ */ n(cs, { sidebar: t, label: _, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ i("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(Qi, { header: a, action: r, label: _, drawer: h }),
      /* @__PURE__ */ n("div", { className: C.page, "data-fill": na(c === !0), children: l })
    ] }),
    d && /* @__PURE__ */ n("div", { className: C.rail, children: o }),
    /* @__PURE__ */ n(es, { sidebar: t, label: _, drawer: h })
  ] });
}
function us({ destinations: e, active: t }) {
  const a = f(null);
  return ji(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(In, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: T(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function pn({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function hs({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ i("span", { className: C.metadata, children: [
    /* @__PURE__ */ n(pn, { value: e, className: C.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(pn, { value: t, className: C.detail })
  ] });
}
function ms() {
  const e = bt("(max-width: 767.98px)"), t = y(), a = f(null), [r, l] = b(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function ws({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: C.tools, children: e });
}
function _s({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: C.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function fs(e) {
  return /* @__PURE__ */ i("header", { className: C.topbar, children: [
    /* @__PURE__ */ n("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(pn, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ n(us, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: C.identity, children: /* @__PURE__ */ n(hs, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(ws, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function vs(e) {
  const t = y(), a = ms();
  return /* @__PURE__ */ i("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: C.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(fs, { ...e, menu: a }),
    /* @__PURE__ */ n(_s, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: C.content, children: e.children })
  ] });
}
function bs(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function IL(e) {
  return bs(e) ? /* @__PURE__ */ n(ds, { ...e }) : /* @__PURE__ */ n(vs, { ...e });
}
const ps = "_root_itg9o_2", gs = "_row_itg9o_8", ys = "_box_itg9o_14", Ns = "_label_itg9o_21", ks = "_labelHidden_itg9o_26", $s = "_lockedNote_itg9o_36", Cs = "_consequence_itg9o_44", Ss = "_sample_itg9o_79", He = {
  root: ps,
  row: gs,
  box: ys,
  label: Ns,
  labelHidden: ks,
  lockedNote: $s,
  consequence: Cs,
  sample: Ss
};
function Rs(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function xs({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${He.consequence} ward-check-consequence`, children: t }) : null;
}
function Ts({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${He.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Ls(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function As(e, t, a, r) {
  const l = e.consequence ? `${t}-note` : void 0, o = Ls(e, a, r), s = o ? `${t}-reason` : void 0, c = Qt(ct(l, e.describedBy, s), r);
  return { noteId: l, reason: o, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? o } };
}
function Es({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Is({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: He.sample, "aria-hidden": "true", children: e }) : null;
}
function Xa(e) {
  const t = y(), a = Be(), r = Rs(e, a), l = As(e, t, r.disabled, a);
  return /* @__PURE__ */ i("div", { className: `${He.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ i("span", { className: He.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: t,
          type: "checkbox",
          className: `${He.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (o) => {
            var s;
            return !r.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, o.target.checked));
          },
          ...l.input
        }
      ),
      /* @__PURE__ */ i("label", { htmlFor: t, className: e.labelHidden ? He.labelHidden : He.label, children: [
        e.label,
        /* @__PURE__ */ n(Ts, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Is, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Es, { id: l.reasonId, reason: l.reason }),
    /* @__PURE__ */ n(xs, { id: l.noteId, text: e.consequence })
  ] });
}
const Ms = "_chip_pq6tb_2", Bs = {
  chip: Ms
}, js = {
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
  quiet: j.chip.quiet,
  owed: j.chip.owed,
  neutral: j.chip.quiet,
  info: j.chip.running,
  success: j.chip.done,
  warning: j.chip.attention,
  danger: j.chip.failed
};
function Ps(e, t) {
  if (e === "stream") return qs(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = js[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function qs(e) {
  if (!e || !gt(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = Ln(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Bs.chip} ward-chip ward-chip--${e}`, style: Ps(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const Hs = "_clamp_zn74g_3", aa = {
  clamp: Hs
};
function it({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? aa.clamp : `${aa.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const Ds = "_root_1btz3_2", Os = "_body_1btz3_10", Fs = "_toggle_1btz3_24", on = {
  root: Ds,
  body: Os,
  toggle: Fs
};
function ML({ children: e, lines: t = 3, label: a }) {
  const [r, l] = b(!1), o = y();
  return /* @__PURE__ */ i("div", { className: on.root, children: [
    /* @__PURE__ */ n("div", { id: o, className: on.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: on.toggle, "aria-expanded": r, "aria-controls": o, onClick: () => l(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const zs = "_root_1a4s8_2", Ws = "_words_1a4s8_16", Ks = "_title_1a4s8_23", Gs = "_actions_1a4s8_27", $t = {
  root: zs,
  words: Ws,
  title: Ks,
  actions: Gs
};
function BL({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ i("section", { className: $t.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ i("div", { className: $t.words, children: [
      /* @__PURE__ */ n("strong", { className: $t.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: $t.actions, children: a })
  ] });
}
const Us = "_root_8zmpu_2", Vs = "_step_8zmpu_12", Ys = "_dot_8zmpu_38", Js = "_label_8zmpu_51", mt = {
  root: Us,
  step: Vs,
  dot: Ys,
  label: Js
}, Xs = { done: ", done", now: ", current", next: "" };
function Qs({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ i("li", { className: mt.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${mt.dot} ward-running` : mt.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: mt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: Xs[e.state] })
  ] });
}
function jL({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: mt.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(Qs, { step: r, running: t }, r.label)) });
}
function Nt(e) {
  return typeof e == "number" && gt(e) ? e : null;
}
function ye(e, t) {
  const a = Nt(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function Zt(e, t) {
  const a = Nt(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const Zs = "_root_13eei_3", ec = "_nav_13eei_8", tc = "_list_13eei_16", nc = "_item_13eei_24", ac = "_link_13eei_44", rc = "_sep_13eei_54", lc = "_current_13eei_58", oc = "_chips_13eei_62", qe = {
  root: Zs,
  nav: ec,
  list: tc,
  item: nc,
  link: ac,
  sep: rc,
  current: lc,
  chips: oc
};
function ic({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: qe.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${qe.link} ward-target`, href: T(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function sc({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: qe.root, children: /* @__PURE__ */ i("nav", { "aria-label": "Breadcrumb", className: qe.nav, children: [
    /* @__PURE__ */ n("ol", { className: qe.list, children: e.map((r, l) => /* @__PURE__ */ i("li", { className: qe.item, children: [
      l > 0 ? /* @__PURE__ */ n("span", { className: qe.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(ic, { step: r, isCurrent: a && l === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${qe.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function Qa(e, t, a) {
  const r = f(a);
  r.current = a, S(() => {
    if (!e) return;
    const l = (o) => {
      var s;
      (s = t.current) != null && s.contains(o.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, t]);
}
const cc = 500;
function Za(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function er() {
  const e = f(""), t = f(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, cc), e.current);
}
const Ct = 4;
function dc(e, t, a) {
  const r = Math.max(0, a - e.bottom - Ct * 2), l = Math.max(0, e.top - Ct * 2);
  return t <= r || r >= l ? { top: e.bottom + Ct, maxHeight: r } : { top: e.top - Ct - Math.min(t, l), maxHeight: l };
}
function uc(e, t, a, r) {
  const l = { start: e.left, end: e.right - t }, o = { start: l.start + t <= a, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = o[r] || !o[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, a - t));
}
function hc(e, t, a, r) {
  return { ...dc(e, t.height, a.height), left: uc(e, t.width, a.width, r) };
}
function Bt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function mc(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function wc(e, t, a) {
  const r = mc(t, a);
  e.style.setProperty("--ward-anchor-width", Bt(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const l = e.getBoundingClientRect(), o = document.documentElement;
  return { edges: r, box: l, view: { width: o.clientWidth, height: o.clientHeight } };
}
function _c(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, l) => r.scrollTop = a[l]);
}
function ra(e, t, a, r) {
  const l = _c(e), o = wc(e, t, r), s = hc(o.edges, o.box, o.view, a);
  Object.assign(e.style, { left: Bt(s.left - o.box.left), top: Bt(s.top - o.box.top), maxHeight: Bt(s.maxHeight) }), l();
}
function fc(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function tr(e, t, a = "start", r) {
  ot(() => {
    const l = t.current, o = e.current;
    if (!l || !o) return;
    const s = fc(l), c = () => ra(l, o, a, r == null ? void 0 : r.current), d = (u) => {
      l.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), ot(() => {
    t.current && e.current && ra(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const vc = "_root_1lgbn_2", bc = "_trigger_1lgbn_7", pc = "_value_1lgbn_47", gc = "_menu_1lgbn_65", yc = "_find_1lgbn_87", Nc = "_list_1lgbn_103", kc = "_option_1lgbn_114", $c = "_check_1lgbn_133", Cc = "_empty_1lgbn_144", ge = {
  root: vc,
  trigger: bc,
  value: pc,
  menu: gc,
  find: yc,
  list: Nc,
  option: kc,
  check: $c,
  empty: Cc
}, Sc = 7;
function Rc(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function la(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function xc(e, t) {
  const [a, r] = b(e.defaultOpen === !0), [l, o] = b(""), [s, c] = b(() => la(e.options, e.value)), d = (u) => {
    var h;
    Ha(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: l,
    active: s,
    entries: Rc(e.options, l),
    findable: e.options.length > Sc,
    show: () => {
      e.disabled || (o(""), c(la(e.options, e.value)), r(!0));
    },
    close: d,
    to: c,
    pick: (u) => {
      var h;
      u && u.option.value !== e.value && ((h = e.onChange) == null || h.call(e, u.option.value)), d(!0);
    },
    find: (u) => {
      o(u), c(0);
    }
  };
}
function Tc(e, t) {
  const a = f(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function Lc(e) {
  const t = er();
  return (a) => {
    const r = t(a), l = e.entries.findIndex((o) => o.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function nr(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Ac(e) {
  return { ...nr(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function ar(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = t[r.key];
    if (!l) return a(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const Ec = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Ic(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      Ec.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function Mc({ entry: e, at: t, menu: a, ids: r, value: l }) {
  return /* @__PURE__ */ i(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
      "data-active": t === a.active || void 0,
      className: ge.option,
      onMouseDown: (o) => o.preventDefault(),
      onMouseMove: () => a.to(t),
      onClick: () => a.pick(e),
      children: [
        /* @__PURE__ */ n("span", { className: ge.check, "aria-hidden": "true" }),
        /* @__PURE__ */ n("span", { className: ge.label, children: e.option.label })
      ]
    }
  );
}
function Mn(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function Bc({ menu: e, ids: t, focusRef: a }) {
  return /* @__PURE__ */ n(
    "input",
    {
      ref: a,
      className: ge.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": t.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": Mn(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: ar(e, nr(e), () => {
      })
    }
  );
}
function jc({ props: e, menu: t, ids: a, focusRef: r, trigger: l }) {
  const o = Lc(t), s = f(null);
  tr(l, s);
  const c = (d) => {
    Za(d) && o(d.key);
  };
  return /* @__PURE__ */ i("div", { ref: s, className: ge.menu, children: [
    t.findable && /* @__PURE__ */ n(Bc, { menu: t, ids: a, focusRef: r }),
    /* @__PURE__ */ n(
      "ul",
      {
        ref: t.findable ? void 0 : r,
        id: a.list,
        role: "listbox",
        tabIndex: -1,
        className: ge.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": t.findable ? void 0 : Mn(t, a),
        onKeyDown: ar(t, Ac(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(Mc, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: ge.empty, children: "No match" })
  ] });
}
function Pc(e, t) {
  const a = e.open ? Mn(e, t) : void 0;
  S(() => {
    var r, l;
    a && ((l = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [a]);
}
function rr(...e) {
  return e.filter(Boolean).join(" ");
}
function qc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function Hc({ props: e, menu: t, ids: a, trigger: r, wantFocus: l }) {
  var c;
  const o = !e.options.some((d) => d.value === e.value), s = (c = Be()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: rr(ge.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": t.open,
      "aria-controls": t.open ? a.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": ct(e["aria-describedby"], a.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...Ic(t, l),
      children: /* @__PURE__ */ n("span", { id: a.value, className: ge.value, "data-placeholder": o || void 0, children: qc(e) })
    }
  );
}
function lr(e) {
  const t = Be(), a = t ? { ...e, disabled: !0, "aria-describedby": Qt(e["aria-describedby"], t) } : e, r = y(), l = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, o = f(null), s = f(null), c = f(null), d = xc(a, s), u = Tc(d.open, c);
  return Qa(d.open, o, () => d.close(!1)), Pc(d, l), /* @__PURE__ */ i("div", { ref: o, className: rr(ge.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(Hc, { props: a, menu: d, ids: l, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(jc, { props: a, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const Dc = "_field_1ensj_2", Oc = "_label_1ensj_8", Fc = "_labelHidden_1ensj_15", zc = "_control_1ensj_25", Wc = "_mono_1ensj_45", Kc = "_area_1ensj_50", Gc = "_invalid_1ensj_57", We = {
  field: Dc,
  label: Oc,
  labelHidden: Fc,
  control: zc,
  mono: Wc,
  area: Kc,
  invalid: Gc
}, Uc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, or = (e) => `${e}-label`;
function Vc({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? Uc : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function Yc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    lr,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": or(t.id),
      "aria-invalid": t["aria-invalid"],
      "aria-describedby": t["aria-describedby"],
      value: e.value,
      options: e.options ?? [],
      disabled: t.disabled,
      placeholder: e.placeholder,
      onChange: e.onChange,
      size: e.variant === "toolbar" ? "md" : void 0
    }
  );
}
function Jc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
const Xc = { input: Vc, select: Yc, textarea: Jc };
function Qc(e, t, a) {
  const r = Xc[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function Zc(e, t, a, r) {
  const l = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": l,
    "aria-describedby": Qt(ct(l ? a : void 0, e.describedBy), r),
    onChange: (o) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, o.target.value);
    }
  };
}
function ed(e) {
  const t = e.mono ? [We.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [We.area] : [];
  return [We.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function td(e) {
  return e ? `${We.label} ${We.labelHidden} ward-field-label` : `${We.label} ward-field-label`;
}
function q(e) {
  const t = y(), a = `${t}-msg`, r = Zc(e, t, a, Be()), l = ed(e);
  return /* @__PURE__ */ i("div", { className: `${We.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: or(t), className: td(e.labelHidden), htmlFor: t, children: e.label }),
    Qc(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${We.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const nd = "_root_sjvm0_2", ad = "_trigger_sjvm0_9", rd = "_ghost_sjvm0_27", ld = "_panel_sjvm0_46", od = "_edged_sjvm0_67", id = "_menu_sjvm0_73", sd = "_group_sjvm0_78", cd = "_heading_sjvm0_83", dd = "_item_sjvm0_89", ud = "_description_sjvm0_105", hd = "_large_sjvm0_109", md = "_touch_sjvm0_113", wd = "_icon_sjvm0_117", _d = "_label_sjvm0_125", fd = "_text_sjvm0_130", vd = "_trailing_sjvm0_138", bd = "_check_sjvm0_144", pd = "_separator_sjvm0_183", gd = "_footer_sjvm0_189", yd = "_find_sjvm0_196", Nd = "_findGlyph_sjvm0_208", kd = "_findInput_sjvm0_214", $d = "_empty_sjvm0_230", A = {
  root: nd,
  trigger: ad,
  ghost: rd,
  panel: ld,
  edged: od,
  menu: id,
  group: sd,
  heading: cd,
  item: dd,
  description: ud,
  large: hd,
  touch: md,
  icon: wd,
  label: _d,
  text: fd,
  trailing: vd,
  check: bd,
  separator: pd,
  footer: gd,
  find: yd,
  findGlyph: Nd,
  findInput: kd,
  empty: $d
}, ir = ke(null);
function Cd(e, t) {
  const [a, r] = b({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (l) => r((o) => ({ open: !0, start: l, request: o.request + 1 })),
    close: (l) => {
      var o;
      Ha(() => r((s) => ({ ...s, open: !1 }))), l && ((o = t.current) == null || o.focus());
    }
  };
}
const Sd = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Rd(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = Sd.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function Bn(...e) {
  return e.filter(Boolean).join(" ");
}
function xd(e, t = {}, a = "field") {
  const { ref: r, className: l, ...o } = t;
  return { ...o, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: Bn(A.trigger, a === "ghost" ? A.ghost : void 0, l) };
}
function sr(e) {
  const t = y(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = f(null), l = f(null), o = Cd(e.defaultOpen === !0, l);
  return Qa(o.open, r, () => o.close(!1)), /* @__PURE__ */ i("div", { ref: r, className: Bn(A.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...xd(l, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": o.open,
        "aria-controls": o.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Rd(o),
        children: e.label
      }
    ),
    o.open && /* @__PURE__ */ n(ir.Provider, { value: { ...a, popup: o, button: l }, children: e.children })
  ] });
}
function Td(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function Ld(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const Ad = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function Ed(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function Id(e, t) {
  return e === "separator" ? e : "items" in e ? Ed(e, t) : t(e) ? e : null;
}
function Md(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function Bd(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (l) => l.label.toLowerCase().includes(a);
  return Md(e.map((l) => Id(l, r)).filter((l) => l !== null));
}
const cr = (e, t) => (e % t + t) % t;
function Oe(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const l = cr(t + a * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const jd = (e) => e.split("").every((t) => t === e[0]);
function Pd(e, t, a) {
  const r = jd(a), l = r ? a[0] : a, o = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = cr(o + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function qd(e) {
  const t = f([]);
  return t.current.length = e.length, {
    items: e,
    refs: t,
    current: () => t.current.indexOf(document.activeElement),
    focus: (a) => {
      var r;
      return (r = t.current[a]) == null ? void 0 : r.focus();
    }
  };
}
function Hd(e, t) {
  const { items: a } = e, r = () => {
    var l;
    return (l = e.refs.current[e.current()]) == null ? void 0 : l.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(Oe(a, e.current(), 1))],
    ["ArrowUp", () => e.focus(Oe(a, e.current(), -1))],
    ["Home", () => e.focus(Oe(a, -1, 1))],
    ["End", () => e.focus(Oe(a, a.length, -1))],
    ["Escape", () => t.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function Dd(e, t, a) {
  const r = er(), l = Hd(e, t), o = (s) => {
    if (Za(s)) {
      if (!a) return e.focus(Pd(e.items, e.current(), r(s.key)));
      s.preventDefault(), a(s.key);
    }
  };
  return {
    onKeyDown: (s) => {
      const c = l.get(s.key);
      if (!c) return o(s);
      s.preventDefault(), s.stopPropagation(), c();
    },
    onKeyUp: (s) => {
      s.key === " " && s.preventDefault();
    }
  };
}
function Od(e) {
  const t = f(!1);
  return {
    onKeyDown: (a) => {
      a.key === "Tab" && (t.current = !0);
    },
    onBlur: () => {
      t.current && e.close(!1);
    }
  };
}
function Fd(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? Oe(e, -1, 1) : t;
}
function zd(e, t) {
  const { start: a, request: r } = t, l = f(e);
  l.current = e, S(() => {
    const { items: o, focus: s } = l.current;
    a && s(a === "first" ? Fd(o) : Oe(o, o.length, -1));
  }, [a, r]);
}
function Wd({ row: e, nav: t, popup: a }) {
  const { item: r, at: l } = e;
  return {
    onMouseDown: (o) => o.preventDefault(),
    onMouseMove: () => {
      !r.disabled && t.current() !== l && t.focus(l);
    },
    onClick: (o) => {
      var s;
      if (r.disabled) return o.preventDefault();
      (s = r.onSelect) == null || s.call(r), a.close(!0);
    }
  };
}
const Kd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function Gd(e, t) {
  return Kd(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function Ud(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: A.label, children: e.label });
  return e.description ? /* @__PURE__ */ i("span", { className: A.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: A.description, children: e.description })
  ] }) : a;
}
function Vd() {
  return /* @__PURE__ */ n("svg", { className: A.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function oa(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: A.icon, "aria-hidden": "true", children: e.icon }) : null,
    Ud(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: A.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(Vd, {}) : null
  ] });
}
function dr(e) {
  const { item: t, at: a } = e.row, r = y(), l = {
    ref: (o) => {
      e.nav.refs.current[a] = o;
    },
    role: "menuitem",
    tabIndex: -1,
    className: A.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...Gd(t, r),
    ...Wd(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: T(t.href), ...l, children: oa(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...l, children: oa(t, r) });
}
function Yd({ heading: e, rows: t, nav: a, popup: r }) {
  const l = y();
  return /* @__PURE__ */ i("div", { role: "group", "aria-labelledby": l, className: A.group, children: [
    /* @__PURE__ */ n("div", { id: l, className: A.heading, children: e }),
    t.map((o) => /* @__PURE__ */ n(dr, { row: o, nav: a, popup: r }, o.at))
  ] });
}
function Jd({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: A.separator }) : e.kind === "group" ? /* @__PURE__ */ n(Yd, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(dr, { row: e.row, nav: t, popup: a });
}
function Xd() {
  const e = Ne(ir);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Qd() {
  return /* @__PURE__ */ i("svg", { className: A.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function Zd(e, t) {
  const a = () => Oe(e.items, -1, 1);
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(a())],
    ["ArrowUp", () => e.focus(Oe(e.items, e.items.length, -1))],
    ["Enter", () => {
      var r;
      return (r = e.refs.current[a()]) == null ? void 0 : r.click();
    }],
    ["Escape", () => t.close(!0)]
  ]);
}
function eu({ find: e, query: t, setQuery: a, input: r, nav: l, popup: o, menuId: s }) {
  const c = Zd(l, o), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ i("div", { className: A.find, children: [
    /* @__PURE__ */ n(Qd, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: A.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function tu(e, t) {
  const [a, r] = b(""), l = f(null), o = t !== void 0 && Ad(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = l.current) == null || d.focus();
  };
  return o ? { find: t, query: a, setQuery: r, input: l, toFind: s, entries: Bd(e, a) } : { query: a, setQuery: r, input: l, entries: e };
}
const nu = { regular: void 0, large: A.large, touch: A.touch }, au = (e, t) => Bn(A.panel, e ? A.edged : void 0, nu[t]);
function ru({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: A.empty, children: e.empty ?? "No matches" });
}
function ur({ entries: e, footer: t, align: a = "start", find: r, edges: l, size: o = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = Xd(), h = f(null);
  tr(u, h, a, l);
  const w = tu(e, r), _ = Td(w.entries), N = qd(_.flatMap(Ld).map((H) => H.item)), k = Dd(N, s, w.toFind), E = Od(s);
  return zd(N, s), /* @__PURE__ */ i("div", { ref: h, className: au(l, o), ...E, children: [
    w.find && /* @__PURE__ */ n(eu, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: A.menu, ...k, children: _.map((H, me) => /* @__PURE__ */ n(Jd, { block: H, nav: N, popup: s }, me)) }),
    /* @__PURE__ */ n(ru, { find: w.find, count: N.items.length }),
    t && /* @__PURE__ */ n("p", { className: A.footer, children: t })
  ] });
}
function lu(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function hr(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !lu(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const ou = (e, t) => e.reduce((a, r) => a + r + t, -t);
function iu({ room: e, widths: t, more: a, gap: r }, l) {
  const o = t.map((d, u) => u);
  if (ou(t, r) <= e) return o;
  const s = /* @__PURE__ */ new Set([l]);
  let c = t[l] + r + a;
  for (const d of o)
    if (d !== l) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return o.filter((d) => s.has(d));
}
const sn = (e) => Number.parseFloat(e) || 0, ia = (e) => e.getBoundingClientRect().width;
function su(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - sn(a.paddingInlineStart) - sn(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), ia),
    more: r ? ia(r) : 0,
    gap: sn(a.columnGap)
  };
}
function cu(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const du = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function mr(e, t, a, r = ':scope > [role="tab"]') {
  const [l, o] = b(null);
  return ot(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = su(s, r);
      o((u) => du(u, d) ? u : d);
    };
    return c(), cu(s, c);
  }, [e, a, r]), l && iu(l, t);
}
const uu = "_strip_1zvzj_2", hu = "_fits_1zvzj_19", mu = "_probe_1zvzj_27", wu = "_moreRoot_1zvzj_36", _u = "_more_1zvzj_36", fu = "_tab_1zvzj_55", vu = "_count_1zvzj_91", bu = "_badge_1zvzj_97", Y = {
  strip: uu,
  fits: hu,
  probe: mu,
  moreRoot: wu,
  more: _u,
  tab: fu,
  count: vu,
  badge: bu
}, wr = "More";
function pu(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const sa = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, jn = (e) => e.badge === void 0 ? sa(e) : `${sa(e)}, ${e.badge}`;
function _r(e) {
  return `${Y.strip} ward-tabs ward-tabs--${e}`;
}
const gu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function yu({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ i(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${Y.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : jn(e),
      onClick: () => r(e.id),
      ...a,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
          " ",
          /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
        ] }),
        e.badge === void 0 ? null : /* @__PURE__ */ n("span", { className: Y.badge, children: e.badge })
      ]
    }
  );
}
function Nu(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((o) => o.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function ku({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(sr, { label: wr, className: Y.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: Y.more }, children: /* @__PURE__ */ n(ur, { align: "end", entries: e.map((r) => ({ label: jn(r), onSelect: () => a(r.id) })) }) });
}
function $u(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : gu;
}
function PL({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: l }) {
  const o = Jt({ orientation: "horizontal" }), s = pu(e, t);
  S(() => o.setActive(s), [o.setActive, s]);
  const c = f(null);
  hr(c, l);
  const d = mr(c, s, e.map(jn).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ i("div", { ref: c, className: `${_r(l)} ${Y.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...o.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(yu, { tab: h, active: t, place: $u(o, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${A.trigger} ${Y.more} ${Y.probe}`, children: wr }),
    u.length > 0 && /* @__PURE__ */ n(ku, { tabs: u, trigger: o.itemProps(e.length), onPick: Nu(c, a) })
  ] });
}
const ca = 7, fr = "More", Cu = ":scope > a", vr = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Su = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Ru(e, t) {
  return !e || e.includes(t) ? {} : Su;
}
function xu({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ i("a", { href: e.href, className: `${Y.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
    ] })
  ] });
}
function Tu({ links: e }) {
  return /* @__PURE__ */ n(sr, { label: fr, className: Y.moreRoot, trigger: { className: Y.more }, children: /* @__PURE__ */ n(ur, { align: "end", entries: e.map((t) => ({ label: vr(t), href: t.href })) }) });
}
function qL({ links: e, active: t, label: a, level: r }) {
  if (e.length > ca) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ca} — the set is fixed`);
  const l = f(null);
  hr(l, r);
  const o = Math.max(0, e.findIndex((d) => d.id === t)), s = mr(l, o, e.map(vr).join(`
`), Cu), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ i("nav", { ref: l, className: `${_r(r)} ${Y.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(xu, { link: d, current: d.id === t, place: Ru(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${A.trigger} ${Y.more} ${Y.probe}`, children: fr }),
    c.length > 0 && /* @__PURE__ */ n(Tu, { links: c })
  ] });
}
const Lu = "_root_v56ff_3", Au = "_segment_v56ff_9", da = {
  root: Lu,
  segment: Au
};
function br({ options: e, value: t, onChange: a, label: r = "Options", disabled: l = !1, describedBy: o }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Jt({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${da.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: da.segment,
      "aria-checked": d.value === t,
      disabled: l,
      "aria-describedby": o,
      onClick: () => a(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const Eu = "_sidebar_s9o1j_3", Iu = "_brand_s9o1j_9", Mu = "_mark_s9o1j_17", Bu = "_word_s9o1j_24", ju = "_nav_s9o1j_30", Pu = "_navItem_s9o1j_39", qu = "_footLink_s9o1j_49", Hu = "_group_s9o1j_58", Du = "_groupName_s9o1j_65", Ou = "_agents_s9o1j_81", Fu = "_agent_s9o1j_81", zu = "_root_s9o1j_96", Wu = "_agentTop_s9o1j_105", Ku = "_dot_s9o1j_112", Gu = "_agentName_s9o1j_124", Uu = "_agentMeta_s9o1j_138", Vu = "_foot_s9o1j_49", Yu = "_footName_s9o1j_150", Ju = "_footLinks_s9o1j_157", Xu = "_linkBrand_s9o1j_184", Qu = "_label_s9o1j_205", Zu = "_note_s9o1j_210", eh = "_footer_s9o1j_226", I = {
  sidebar: Eu,
  brand: Iu,
  mark: Mu,
  word: Bu,
  nav: ju,
  navItem: Pu,
  new: "_new_s9o1j_48",
  footLink: qu,
  group: Hu,
  groupName: Du,
  agents: Ou,
  agent: Fu,
  root: zu,
  agentTop: Wu,
  dot: Ku,
  agentName: Gu,
  agentMeta: Uu,
  foot: Vu,
  footName: Yu,
  footLinks: Ju,
  linkBrand: Xu,
  label: Qu,
  note: Zu,
  footer: eh
};
function th({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ i(
    "a",
    {
      className: I.agent,
      href: T(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ i("span", { className: I.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: I.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": Ln(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: I.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: I.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function nh({ shared: e }) {
  return e ? /* @__PURE__ */ i("div", { className: I.foot, children: [
    /* @__PURE__ */ n("span", { className: I.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: I.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${I.footLink} ward-target`, href: T(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function ah({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: l, shared: o }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ i("nav", { className: I.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ i("div", { className: I.brand, children: [
      /* @__PURE__ */ n("span", { className: I.mark }),
      /* @__PURE__ */ n("span", { className: I.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: I.nav, children: t.map((s) => /* @__PURE__ */ n("a", { className: I.navItem, href: T(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ i("div", { className: I.group, children: [
      /* @__PURE__ */ i("span", { className: I.groupName, children: [
        a,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: I.new, href: T(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: I.agents, children: r.map((s) => /* @__PURE__ */ n(th, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(nh, { shared: o })
  ] });
}
function rh(e) {
  return e.destinations ?? e.items ?? [];
}
function lh({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.linkBrand, children: e });
}
function oh({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.footer, children: e });
}
function ih({ link: e, active: t }) {
  return /* @__PURE__ */ i("a", { href: T(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: I.note, children: e.note })
  ] });
}
function sh(e) {
  return /* @__PURE__ */ i("aside", { className: `${I.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(lh, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: rh(e).map((t) => /* @__PURE__ */ n(ih, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(oh, { children: e.children })
  ] });
}
function ch(e) {
  return "agents" in e;
}
function HL(e) {
  return ch(e) ? /* @__PURE__ */ n(ah, { ...e }) : /* @__PURE__ */ n(sh, { ...e });
}
const dh = "_mark_wlgi8_3", uh = {
  mark: dh
}, hh = { met: "✓", unmet: "", failed: "✕" };
function Pn({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: uh.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: hh[e]
    }
  );
}
const mh = "_avatar_1t33a_3", wh = {
  avatar: mh
};
function Ot(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function _h(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [Ot(e), ...[...t.slice(1)].map((r) => a + r)];
}
function fh(e, t) {
  const a = _h(e).find((l) => !t.has(l));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(Ot(e).charAt(0) + String(r)); ) r += 1;
  return Ot(e).charAt(0) + String(r);
}
function DL(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const l = fh(r, t);
    t.add(l), a.set(r, l);
  }
  return a;
}
function vh(e) {
  return e != null && gt(e) ? Fl(e) : void 0;
}
function OL({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: wh.avatar, "data-size": a, "aria-hidden": "true", style: vh(t), children: r ?? Ot(e) });
}
const bh = "_marker_br9fi_2", ph = {
  marker: bh
}, gh = {
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
}, yh = { running: " ward-running" };
function Ge({ size: e, kind: t, label: a }) {
  const r = { "--marker": gh[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${ph.marker} ward-marker ward-marker--${t}${yh[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const Nh = "_root_ti0pq_2", kh = "_chip_ti0pq_11", $h = "_noCase_ti0pq_23", St = {
  root: Nh,
  chip: kh,
  noCase: $h
};
function Ch(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function qn({ connection: e, since: t, lastEventAt: a }) {
  const r = Ch(t, a), l = An(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ i("span", { className: `${St.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Ge, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ i("span", { className: `${St.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: St.noCase, children: Tn(l) })
  ] }) : /* @__PURE__ */ i("span", { className: `${St.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    he(r)
  ] });
}
const Sh = "_root_yylks_2", Rh = "_context_yylks_13", xh = "_row_yylks_1", Th = "_heading_yylks_27", Lh = "_headingWrap_yylks_35", Ah = "_meta_yylks_41", Eh = "_chips_yylks_49", Ih = "_title_yylks_56", Mh = "_consequence_yylks_66", Bh = "_actionsWrap_yylks_73", jh = "_actions_yylks_73", Ph = "_action_yylks_73", qh = "_overflowPanel_yylks_102", Hh = "_measureClip_yylks_113", Dh = "_measure_yylks_113", U = {
  root: Sh,
  context: Rh,
  row: xh,
  heading: Th,
  headingWrap: Lh,
  meta: Ah,
  chips: Eh,
  title: Ih,
  consequence: Mh,
  actionsWrap: Bh,
  actions: jh,
  action: Ph,
  overflowPanel: qh,
  measureClip: Hh,
  measure: Dh
};
function Oh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(it, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function Fh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function zh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function Wh({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ i("div", { className: U.meta, children: [
    /* @__PURE__ */ n(Fh, { chips: e }),
    /* @__PURE__ */ n(zh, { consequence: t, consequenceHint: a })
  ] });
}
function Kh({ title: e, chips: t, consequence: a, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ i("div", { className: U.heading, children: [
    /* @__PURE__ */ n(Oh, { title: e, density: l }),
    /* @__PURE__ */ n(Wh, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function gn({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function ua({ disclosure: e }) {
  return /* @__PURE__ */ n(v, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Gh({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: l }) {
  return a ? r ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(ua, { disclosure: l }) : t ? [/* @__PURE__ */ n(ua, { disclosure: l }, "more"), /* @__PURE__ */ n(gn, { actions: e }, "actions")] : /* @__PURE__ */ n(gn, { actions: e });
}
function Uh(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function Vh({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(gn, { actions: e }) });
}
function Yh(e, t) {
  const a = y(), [r, l] = b(!1), o = r && e;
  return { disclosure: { open: o, panelId: a, toggle: () => l(!o) }, close: () => {
    var d, u;
    l(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const Jh = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function Xh(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && Jh(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function Qh({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(sc, { path: e.path, current: e.current }) });
}
function Zh(...e) {
  return e.some((t) => t === null);
}
function em(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function tm(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + em(e);
}
function nm(e, t, a, r, l) {
  if (l === 0 || Zh(t, a, r)) return !1;
  const [o, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - tm(e, o));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function am(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function rm(e) {
  return kl(e) && (e.type === "a" || typeof e.props.href == "string");
}
function lm(e, t) {
  return t.length === 0 && e.length === 1 && rm(e[0]);
}
function om(e, t) {
  const a = f(null), r = f(null), l = f(null), o = f(null), [s, c] = b(!1);
  return S(() => {
    const d = a.current;
    if (!am(d)) return;
    const u = () => c(nm(d, r.current, l.current, o.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), o.current && h.observe(o.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: l, measureRef: o, collapsed: s && !t };
}
function im({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ i("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(v, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function sm({ connection: e }) {
  return e ? /* @__PURE__ */ n(qn, { connection: e.connection, since: e.since }) : null;
}
function FL({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: l, consequenceHint: o, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: _, actionsRef: N, measureRef: k, collapsed: E } = om(s, lm(s, c)), H = c.length > 0, { disclosure: me, close: re } = Yh(E || H, N), je = Uh(c, s, E, u);
  return /* @__PURE__ */ i("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(Qh, { crumb: Xh(e, r, t) }),
    /* @__PURE__ */ i("div", { className: U.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: _, className: U.headingWrap, children: /* @__PURE__ */ n(Kh, { title: r, chips: a, consequence: l, consequenceHint: o, density: h }) }),
      /* @__PURE__ */ i("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(sm, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ n(Gh, { actions: s, hasMore: H, collapsed: E, onOverflow: u, disclosure: me }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Vh, { actions: je, disclosure: me, onEscape: re }),
    /* @__PURE__ */ n(im, { actions: s, hasMore: H, measureRef: k })
  ] });
}
const cm = "_root_td96x_2", dm = "_body_td96x_16", ha = {
  root: cm,
  body: dm
};
function zL({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${ha.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: ha.body, children: a }) });
}
const um = "_root_bf1pc_2", hm = "_table_bf1pc_9", mm = "_caption_bf1pc_14", wm = "_series_bf1pc_23", _m = "_category_bf1pc_31", fm = "_cell_bf1pc_39", vm = "_track_bf1pc_45", bm = "_lane_bf1pc_52", pm = "_bar_bf1pc_56", gm = "_value_bf1pc_63", ym = "_swatch_bf1pc_70", Nm = "_empty_bf1pc_78", Z = {
  root: um,
  table: hm,
  caption: mm,
  series: wm,
  category: _m,
  cell: fm,
  track: vm,
  lane: bm,
  bar: pm,
  value: gm,
  swatch: ym,
  empty: Nm
}, km = "—", ma = 6;
function $m(e, t) {
  if (t.length < 1 || t.length > ma)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${ma}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function Cm(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function pr(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function Sm(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function Rm({ value: e, top: t, step: a, format: r, missing: l }) {
  const o = Sm(e, t), s = { "--share": `${o}%` };
  return /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ i("span", { className: Z.track, children: [
    /* @__PURE__ */ n("span", { className: Z.lane, children: o > 0 ? /* @__PURE__ */ n("span", { className: `${Z.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Z.value, children: e === null ? l : r(e) })
  ] }) });
}
function xm({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ i("th", { scope: "col", className: Z.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Z.swatch, "data-step": pr(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function Tm({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ i("section", { className: `${Z.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Z.empty, children: t })
  ] });
}
function Lm({ title: e, categories: t, series: a, top: r, format: l = ae, categoryHead: o = "Category", missing: s = km }) {
  return /* @__PURE__ */ n("div", { className: `${Z.root} ward-barchart`, children: /* @__PURE__ */ i("table", { className: Z.table, children: [
    /* @__PURE__ */ n("caption", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Z.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: o }) }),
      /* @__PURE__ */ n(xm, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Z.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(Rm, { value: u.values[d], top: r, step: pr(h, a.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function WL(e) {
  $m(e.categories, e.series);
  const t = Cm(e.series);
  return t === 0 ? /* @__PURE__ */ n(Tm, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Lm, { ...e, top: t });
}
const Am = "_root_1bfqw_2", Em = "_figure_1bfqw_7", Im = "_of_1bfqw_13", Mm = "_bar_1bfqw_18", Bm = "_rows_1bfqw_38", jm = "_row_1bfqw_38", Pm = "_label_1bfqw_49", qm = "_amount_1bfqw_54", Pe = {
  root: Am,
  figure: Em,
  of: Im,
  bar: Mm,
  rows: Bm,
  row: jm,
  label: Pm,
  amount: qm
};
function Hm({ spent: e, ceiling: t, breakdown: a }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ i("div", { className: `${Pe.root} ward-costmeter`, children: [
    /* @__PURE__ */ i("p", { className: `${Pe.figure} ward-stat-value`, children: [
      oe(e),
      " ",
      /* @__PURE__ */ i("span", { className: Pe.of, children: [
        "of ",
        oe(t)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Pe.bar} ward-costbar`,
        min: 0,
        max: t,
        value: e,
        "aria-valuetext": `${oe(e)} of ${oe(t)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    a && /* @__PURE__ */ n("ul", { className: Pe.rows, children: a.map((l) => /* @__PURE__ */ i("li", { className: `${Pe.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Pe.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: Pe.amount, children: oe(l.amount) })
    ] }, l.label)) })
  ] });
}
const Dm = "_frame_f7bxz_2", Om = "_table_f7bxz_6", Fm = "_th_f7bxz_12", zm = "_td_f7bxz_13", Wm = "_sort_f7bxz_53", Km = "_row_f7bxz_65", Gm = "_empty_f7bxz_73", Fe = {
  frame: Dm,
  table: Om,
  th: Fm,
  td: zm,
  sort: Wm,
  row: Km,
  empty: Gm
}, Um = { asc: "ascending", desc: "descending" };
function Vm(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return Um[t.direction];
}
function Ym(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: Fe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function Jm(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Xm({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Fe.th,
      style: Jm(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Vm(e, t),
      children: Ym(e, a)
    }
  );
}
function Qm({ row: e, props: t }) {
  const a = t.rowId(e), r = (t.lockedIds ?? []).includes(a);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: Fe.row,
      "data-selected": a === t.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: t.columns.map((l) => /* @__PURE__ */ n(
        "td",
        {
          className: Fe.td,
          "data-align": l.align,
          "data-mono": l.mono,
          "data-drop": l.dropPriority,
          "data-label": t.narrow ? l.header : void 0,
          children: t.renderCell(e, l.key)
        },
        l.key
      ))
    }
  );
}
function Zm({
  label: e,
  columns: t,
  rows: a,
  rowId: r,
  renderCell: l,
  selectedId: o,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u,
  narrow: h
}) {
  return a.length === 0 ? /* @__PURE__ */ n("div", { className: Fe.empty, children: u }) : /* @__PURE__ */ n("div", { className: Fe.frame, "data-narrow": h, children: /* @__PURE__ */ i("table", { className: Fe.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Fe.head, children: t.map((w) => /* @__PURE__ */ n(Xm, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(Qm, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: l, selectedId: o, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const ew = "_list_v0s52_2", tw = {
  list: ew
};
function nw({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: tw.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const aw = "_label_1u62a_2", rw = {
  label: aw
};
function KL({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: rw.label, children: t.header }) }, t.key)) }) });
}
const lw = "_stack_bp6a0_2", ow = {
  stack: lw
};
function GL({ children: e }) {
  return /* @__PURE__ */ n("span", { className: ow.stack, "data-ward-action-stack": "", children: e });
}
const iw = "_set_1z0sq_2", sw = "_legend_1z0sq_7", cw = "_row_1z0sq_15", dw = "_control_1z0sq_20", uw = "_input_1z0sq_26", hw = "_label_1z0sq_31", mw = "_consequence_1z0sq_36", Ve = {
  set: iw,
  legend: sw,
  row: cw,
  control: dw,
  input: uw,
  label: hw,
  consequence: mw
};
function gr({ legend: e, options: t, value: a, onChange: r, disabled: l, name: o, describedBy: s, variant: c }) {
  const d = y(), u = o ?? d;
  return /* @__PURE__ */ i("fieldset", { className: Ve.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: Ve.legend, children: e }),
    t.map((h) => {
      const w = `${u}-${h.value}`, _ = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ i("div", { className: Ve.row, children: [
        /* @__PURE__ */ i("span", { className: Ve.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: Ve.input,
              value: h.value,
              checked: a === h.value,
              disabled: l,
              "aria-describedby": ct(_, s),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: w, className: Ve.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: _, className: `${Ve.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const ww = "_root_11gpw_2", _w = "_head_11gpw_10", fw = "_note_11gpw_29", vw = "_index_11gpw_34", bw = "_dot_11gpw_38", pw = "_counter_11gpw_49", gw = "_trailing_11gpw_57", Ye = {
  root: ww,
  head: _w,
  note: fw,
  index: vw,
  dot: bw,
  counter: pw,
  trailing: gw
};
function yw({ index: e }) {
  return e ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ye.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ye.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Nw({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ye.counter, "aria-hidden": "true", children: e }) : null;
}
function wa({ title: e, index: t, note: a, counter: r, kind: l = "micro", trailing: o }) {
  return /* @__PURE__ */ i("div", { className: `${Ye.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ i("h2", { className: Ye.head, children: [
      /* @__PURE__ */ n(yw, { index: t }),
      e,
      r && /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ye.note, children: a }),
    /* @__PURE__ */ n(Nw, { counter: r }),
    o === void 0 ? null : /* @__PURE__ */ n("span", { className: Ye.trailing, children: o })
  ] });
}
const kw = "_strip_c3x3u_2", $w = "_cell_c3x3u_7", Cw = "_value_c3x3u_12", Sw = "_link_c3x3u_29", Rw = "_label_c3x3u_49", xw = "_tiles_c3x3u_101", Ke = {
  strip: kw,
  cell: $w,
  value: Cw,
  link: Sw,
  label: Rw,
  tiles: xw
};
function yr(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Nr = (e) => `${Ke.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Tw({ cell: e }) {
  return /* @__PURE__ */ i("div", { className: Ke.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: Nr(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${Ke.label} ward-stat-label`, children: e.label })
  ] });
}
function Lw({ cell: e, href: t }) {
  return /* @__PURE__ */ i("div", { className: Ke.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: Nr(e), title: e.hint, children: /* @__PURE__ */ i("a", { className: `${Ke.link} ward-stat-link`, href: T(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${Ke.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const kr = (e) => e.href === void 0 ? /* @__PURE__ */ n(Tw, { cell: e }, e.label) : /* @__PURE__ */ n(Lw, { cell: e, href: e.href }, e.label);
function en({ cells: e, divided: t = !1 }) {
  return yr("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${Ke.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(kr) });
}
const _a = 6;
function UL({ cells: e }) {
  yr("StatTiles", e, [1, 2 * _a]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, _a) };
  return /* @__PURE__ */ n("dl", { className: `${Ke.tiles} ward-stattiles`, style: t, children: e.map(kr) });
}
const Aw = "_root_1eb1u_2", Ew = "_track_1eb1u_8", Iw = "_thumb_1eb1u_46", Mw = "_labelHidden_1eb1u_64", Bw = "_label_1eb1u_64", jw = "_lockedNote_1eb1u_84", Je = {
  root: Aw,
  track: Ew,
  thumb: Iw,
  labelHidden: Mw,
  label: Bw,
  lockedNote: jw
};
function Pw(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function qw(e) {
  return e ? `${Je.label} ${Je.labelHidden}` : Je.label;
}
function Hw(e, t, a) {
  return e && !t && a ? a : void 0;
}
function Dw(e, t, a, r) {
  return { "aria-describedby": Qt(ct(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function Ow({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Qe({ label: e, checked: t, onChange: a, disabled: r, locked: l, describedBy: o, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, w = Be(), { on: _, off: N } = Pw(t, r, l, w !== null), k = Hw(N, w !== null, c);
  return /* @__PURE__ */ i("span", { className: `${Je.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": _,
        "aria-label": e,
        "aria-labelledby": d,
        ...Dw(h, o, w, k),
        className: `${Je.track} ward-switch`,
        "data-on": _,
        "data-locked": l ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!_)),
        children: /* @__PURE__ */ n("span", { className: Je.thumb })
      }
    ),
    /* @__PURE__ */ i("label", { id: d, htmlFor: u, className: qw(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Je.lockedNote, children: "always on" })
    ] }),
    /* @__PURE__ */ n(Ow, { id: h, reason: k })
  ] });
}
const Fw = "_bar_1vp69_2", zw = "_skip_1vp69_11", Ww = "_mark_1vp69_22", Kw = "_nav_1vp69_30", Gw = "_list_1vp69_34", Uw = "_select_1vp69_41", Vw = "_selectTrigger_1vp69_45", Yw = "_dest_1vp69_52", Jw = "_actor_1vp69_71", Xw = "_actorMark_1vp69_84", Qw = "_actorLabel_1vp69_89", Zw = "_tagline_1vp69_108", se = {
  bar: Fw,
  skip: zw,
  mark: Ww,
  nav: Kw,
  list: Gw,
  select: Uw,
  selectTrigger: Vw,
  dest: Yw,
  actor: Jw,
  actorMark: Xw,
  actorLabel: Qw,
  tagline: Zw
};
function e_(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function t_(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function VL({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: l, onNavigate: o, skipTo: s = "main" }) {
  const c = t_(r);
  return /* @__PURE__ */ i("header", { className: se.bar, children: [
    /* @__PURE__ */ n("a", { className: `${se.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: se.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: se.tagline, children: l }),
    /* @__PURE__ */ i("nav", { className: se.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: se.list, children: t.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${se.dest} ward-target`,
          href: T(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => o == null ? void 0 : o(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        lr,
        {
          className: se.select,
          triggerClassName: se.selectTrigger,
          "aria-label": "Destination",
          value: a,
          options: t.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => o == null ? void 0 : o(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ i("span", { className: se.actor, children: [
      /* @__PURE__ */ n("span", { className: se.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: e_(c) })
    ] })
  ] });
}
const n_ = "_tree_zzoob_2", a_ = "_item_zzoob_6", r_ = "_row_zzoob_10", l_ = "_button_zzoob_22", Ft = {
  tree: n_,
  item: a_,
  row: r_,
  button: l_
}, $r = ke(null);
function o_({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Jt({ orientation: "vertical" });
  return /* @__PURE__ */ n($r.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: Ft.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const i_ = { ArrowRight: !0, ArrowLeft: !1 };
function fa(e) {
  return e ? !0 : void 0;
}
function s_(e, t) {
  const a = i_[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function c_(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function d_(e) {
  const t = [Ft.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function u_(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function h_(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function m_(e) {
  return typeof e == "string" ? e : void 0;
}
function w_({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function __({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Cr(e) {
  const t = Ne($r);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = u_(e);
  return /* @__PURE__ */ i("li", { className: Ft.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: d_(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": fa(e.unresolved),
        "data-inherited": fa(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: `${Ft.button} ward-treeitem-btn`,
            onClick: () => c_(e),
            onKeyDown: (r) => s_(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: h_(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: m_(e.label), children: e.label }),
              /* @__PURE__ */ n(w_, { value: e.detail }),
              /* @__PURE__ */ n(__, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const f_ = "_frame_gxspk_2", v_ = "_subjectRail_gxspk_22", b_ = "_subject_gxspk_22", p_ = "_rail_gxspk_42", g_ = "_record_gxspk_57", y_ = "_recordBody_gxspk_102", N_ = "_stageGrid_gxspk_157", k_ = "_band_gxspk_171", $_ = "_bandBody_gxspk_179", C_ = "_bandActions_gxspk_184", S_ = "_scroller_gxspk_192", R_ = "_board_gxspk_219", x_ = "_lanes_gxspk_228", T_ = "_cardGrid_gxspk_262", ee = {
  frame: f_,
  subjectRail: v_,
  subject: b_,
  rail: p_,
  record: g_,
  recordBody: y_,
  stageGrid: N_,
  band: k_,
  bandBody: $_,
  bandActions: C_,
  scroller: S_,
  board: R_,
  lanes: x_,
  cardGrid: T_
};
function YL({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: ee.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function va(e) {
  return e ? "true" : void 0;
}
function JL({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: l, ruled: o }) {
  return /* @__PURE__ */ i("div", { className: ee.subjectRail, "data-ward-subject-rail": a, "data-ruled": va(o), children: [
    /* @__PURE__ */ n("div", { className: ee.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ee.rail, "data-sticky": va(l), "aria-label": r, children: t })
  ] });
}
function XL({ title: e, children: t, note: a, trailing: r, pad: l = "block", label: o, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: ee.record, "aria-label": o, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(wa, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ i("section", { className: ee.record, "aria-label": o, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(wa, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: ee.recordBody, "data-pad": l, "data-measure": c, children: t })
  ] });
}
const L_ = "_form_1j8ub_2", A_ = "_fields_1j8ub_9", E_ = "_actions_1j8ub_19", cn = {
  form: L_,
  fields: A_,
  actions: E_
};
function QL({ label: e, children: t, actions: a, onSubmit: r }) {
  const l = (o) => {
    o.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ i("form", { className: cn.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: cn.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: cn.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function ZL({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ i("section", { className: ee.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ee.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: ee.bandActions, children: t })
  ] });
}
const I_ = "(max-width: 767.98px)";
function Hn({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(In, { className: ee.scroller, label: e, count: a ?? qa.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function M_({ lanes: e, label: t, laneLabel: a }) {
  const [r, l] = b(null), o = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ i("div", { className: ee.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(q, { kind: "select", label: a, value: (o == null ? void 0 : o.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Hn, { label: t, children: o == null ? void 0 : o.content })
  ] });
}
function B_({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: ee.board, "data-ward-board": "", children: /* @__PURE__ */ n(Hn, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(Pa, { children: a.content }, a.id)) }) });
}
function eA({ children: e, label: t = "Workflow board", lanes: a, laneLabel: r = "Column" }) {
  const l = bt(I_);
  return a === void 0 ? /* @__PURE__ */ n(Hn, { label: t, children: e }) : l ? /* @__PURE__ */ n(M_, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(B_, { lanes: a, label: t });
}
function tA({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), o = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ n(In, { className: ee.stageGrid, label: a, count: l, "data-ward-stage-grid": "", "data-floor": r, style: o, children: t });
}
function nA({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${ee.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const j_ = "_block_6tv5x_3", P_ = "_sentence_6tv5x_10", q_ = "_meta_6tv5x_19", H_ = "_ways_6tv5x_24", D_ = "_action_6tv5x_38", O_ = "_strip_6tv5x_42", F_ = "_loading_6tv5x_61", z_ = "_label_6tv5x_69", W_ = "_counter_6tv5x_76", ve = {
  block: j_,
  sentence: P_,
  meta: q_,
  ways: H_,
  action: D_,
  strip: O_,
  loading: F_,
  label: z_,
  counter: W_
};
function K_({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: ve.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function tn({ sentence: e, action: t, children: a, role: r = "status", tone: l, kind: o, ask: s }) {
  return /* @__PURE__ */ i("div", { className: `${ve.block} ward-state${o === void 0 ? "" : ` ${o}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ i("p", { className: ve.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ i(x, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(K_, { action: t })
  ] });
}
function G_(e) {
  return /* @__PURE__ */ n(tn, { ...e, kind: "ward-emptystate" });
}
function aA({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(tn, { sentence: e, action: a, children: /* @__PURE__ */ i("p", { className: ve.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function U_({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${ve.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(v, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function rA({ ways: e, ...t }) {
  return /* @__PURE__ */ n(tn, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(U_, { ways: e }) });
}
function lA({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(tn, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ i("p", { className: ve.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function oA({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ i("div", { className: ve.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function iA({ queued: e, since: t }) {
  return /* @__PURE__ */ i("div", { className: ve.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function sA({ label: e, startedAt: t }) {
  const a = f(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = b(!1);
  S(() => {
    const s = window.setTimeout(() => l(!0), pe.load);
    return () => window.clearTimeout(s);
  }, []);
  const o = An(a.current, r);
  return /* @__PURE__ */ i("div", { className: `${ve.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: ve.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: ve.counter, children: Tn(o) }) : null
  ] });
}
const V_ = "_note_cigdt_2", Y_ = {
  note: V_
};
function J_({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ i("p", { className: Y_.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const X_ = "_card_k7btg_3", Q_ = "_hit_k7btg_31", Z_ = "_head_k7btg_44", ef = "_title_k7btg_51", tf = "_meta_k7btg_57", nf = "_since_k7btg_66", af = "_sep_k7btg_76", rf = "_fields_k7btg_80", lf = "_field_k7btg_80", of = "_last_k7btg_98", sf = "_reason_k7btg_110", de = {
  card: X_,
  hit: Q_,
  head: Z_,
  title: ef,
  meta: tf,
  since: nf,
  sep: af,
  fields: rf,
  field: lf,
  last: of,
  reason: sf
}, cf = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function df(e, t, a) {
  const r = Mt(e, "blue"), l = Mt(e, "orange"), o = Mt(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: l, green: o };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = cf[d.type];
      u && c[u]();
    });
  }, [r, a, o, t, l]);
}
const uf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : oe(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function hf(e, t) {
  return uf[t](e);
}
function mf({ item: e, connection: t }) {
  const a = /* @__PURE__ */ n("span", { className: de.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ i("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    a,
    /* @__PURE__ */ n(Me, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ i("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.waitsOn,
    a,
    /* @__PURE__ */ i("span", { className: de.since, children: [
      ue(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function wf({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ i("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function _f({ reason: e }) {
  return e ? /* @__PURE__ */ i("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function ff({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: de.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: de.field, children: hf(e, a) }, a)) });
}
const yn = (e) => e ? !0 : void 0;
function vf(e) {
  return { "--stream": ye(e.streamStep, "id") };
}
function bf(e, t, a) {
  e == null || e(t, a);
}
function pf(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function gf({ item: e, stale: t }) {
  var r, l;
  const a = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: de.last, "data-stale": yn(t), children: a }) : null;
}
function nn(e) {
  const t = e.fields ?? [], a = e.item, r = f(null);
  df(r, a.key, e.feed);
  const l = pf(e.feed), o = vf(a);
  return /* @__PURE__ */ i(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: de.card,
      style: o,
      "data-selected": yn(e.selected),
      "data-flagged": yn(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: de.hit, onClick: (s) => bf(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(wf, { item: a }),
        /* @__PURE__ */ n(it, { as: "p", className: de.title, text: a.title }),
        /* @__PURE__ */ n(mf, { item: a, connection: l }),
        /* @__PURE__ */ n(_f, { reason: a.blockedReason }),
        /* @__PURE__ */ n(ff, { item: a, fields: t }),
        /* @__PURE__ */ n(gf, { item: a, stale: l === "stale" })
      ]
    }
  );
}
const yf = "_column_1j8bi_3", Nf = "_head_1j8bi_21", kf = "_label_1j8bi_30", $f = "_count_1j8bi_39", Cf = "_list_1j8bi_53", ft = {
  column: yf,
  head: Nf,
  label: kf,
  count: $f,
  list: Cf
};
function Sr(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function Sf({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ i("div", { className: ft.head, children: [
    /* @__PURE__ */ n("h2", { className: ft.label, id: a, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ i("span", { className: ft.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Rf(e) {
  return /* @__PURE__ */ n("div", { className: ft.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      nn,
      {
        item: t,
        fields: e.fields,
        onOpen: e.onOpen,
        selected: t.key === e.selectedKey,
        feed: e.feed,
        rovingProps: (r = e.roving) == null ? void 0 : r.itemProps(e.roving.base + a),
        inList: !0
      },
      t.key
    );
  }) });
}
function xf({ column: e, items: t, fields: a, sort: r, onOpen: l, selectedKey: o, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && t.length > e.cap, w = Sr(t, r);
  return /* @__PURE__ */ i("section", { className: ft.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Sf, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(Rf, { column: e, items: t, fields: a, sort: r, onOpen: l, selectedKey: o, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n(J_, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const Tf = "_foot_cs4jr_2", Lf = "_note_cs4jr_13", Af = "_link_cs4jr_19", dn = {
  foot: Tf,
  note: Lf,
  link: Af
};
function cA({ configureHref: e }) {
  return /* @__PURE__ */ i("footer", { className: dn.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: dn.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${dn.link} ward-target`, href: T(e), children: "Configure board" })
  ] });
}
const Ef = "_head_1tfi5_3", If = "_identity_1tfi5_12", Mf = "_titleRow_1tfi5_18", Bf = "_title_1tfi5_18", jf = "_key_1tfi5_35", Pf = "_rollup_1tfi5_45", qf = "_tools_1tfi5_53", Hf = "_swatch_1tfi5_101", Df = "_mark_1tfi5_108", Re = {
  head: Ef,
  identity: If,
  titleRow: Mf,
  title: Bf,
  key: jf,
  rollup: Pf,
  tools: qf,
  swatch: Hf,
  mark: Df
}, ba = "initials:";
function Of(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Ff(e) {
  const t = [Of(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function zf(e) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ i("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Ff(e)
  ] });
}
function Wf(e) {
  return e.startsWith(ba) ? e.slice(ba.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function Kf({ markRef: e, streamStep: t }) {
  const a = { "--stream": ye(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Re.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: Wf(e) }) : /* @__PURE__ */ n("span", { className: Re.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Gf({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function dA({
  stream: e,
  rollups: t,
  connection: a,
  lastEventAt: r,
  owners: l,
  owner: o,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ i("div", { className: Re.head, children: [
    /* @__PURE__ */ i("div", { className: Re.identity, children: [
      /* @__PURE__ */ i("div", { className: Re.titleRow, children: [
        /* @__PURE__ */ n(Kf, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Re.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Re.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Re.rollup, "aria-live": "polite", children: zf(t) })
    ] }),
    /* @__PURE__ */ i("div", { className: Re.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Gf, { owners: l, owner: o, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(v, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(qn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const Uf = "_head_1sejb_14", Vf = "_line_1sejb_15", Yf = "_cHandle_1sejb_36", Jf = "_cName_1sejb_41", Xf = "_nameLine_1sejb_49", Qf = "_cLabel_1sejb_56", Zf = "_cCap_1sejb_61", ev = "_cShown_1sejb_66", tv = "_name_1sejb_49", nv = "_noCap_1sejb_88", av = "_state_1sejb_102", rv = "_handle_1sejb_111", lv = "_sub_1sejb_137", D = {
  head: Uf,
  line: Vf,
  cHandle: Yf,
  cName: Jf,
  nameLine: Xf,
  cLabel: Qf,
  cCap: Zf,
  cShown: ev,
  name: tv,
  noCap: nv,
  state: av,
  handle: rv,
  sub: lv
}, ov = "can't be hidden or collapsed", iv = "terminal · counted, not a column", sv = "A human gate is always shown, so people see what waits for them.", cv = "A terminal stage is counted, not shown as a column.";
function uA() {
  return /* @__PURE__ */ i("div", { className: D.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: D.cHandle }),
    /* @__PURE__ */ n("span", { className: D.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: D.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: D.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: D.cShown, children: "Shown" })
  ] });
}
function dv(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function uv(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function pa(e) {
  return e.gate ? ov : e.terminal ? iv : uv(e.agentsMounted);
}
function hv(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function mv({ stage: e }) {
  return /* @__PURE__ */ i("span", { className: D.cName, children: [
    /* @__PURE__ */ i("span", { className: D.nameLine, children: [
      /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    pa(e) && /* @__PURE__ */ n("span", { className: D.sub, children: pa(e) })
  ] });
}
function wv(e) {
  return e === void 0 ? "" : String(e);
}
function _v(e) {
  return e === "" ? void 0 : Number(e);
}
function fv({ name: e, onReorder: t }) {
  const a = Be();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ n("span", { className: D.cHandle }) : /* @__PURE__ */ n("span", { className: D.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: D.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && hv(r, t),
      children: "⠿"
    }
  ) });
}
function vv({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${D.cCap} ${D.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: D.cCap, children: /* @__PURE__ */ n(q, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: wv(t.cap), onChange: (r) => a({ ...t, cap: _v(r) }) }) });
}
function bv(e) {
  return e.gate ? sv : e.terminal ? cv : void 0;
}
function pv({ stage: e, config: t, onChange: a }) {
  const r = Be() !== null, l = dv(e, t.shown), o = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ i("span", { className: D.cShown, children: [
    /* @__PURE__ */ n(Qe, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, disabledReason: bv(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: D.state, "data-fixed": o || void 0, "aria-hidden": "true", onClick: () => !o && s(!l.shown), children: l.state })
  ] });
}
function gv(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function hA({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ i("div", { className: D.line, "data-kind": gv(e), children: [
    /* @__PURE__ */ n(fv, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(mv, { stage: e }),
    /* @__PURE__ */ n("span", { className: D.cLabel, children: /* @__PURE__ */ n(q, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (l) => a({ ...t, label: l }) }) }),
    /* @__PURE__ */ n(vv, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(pv, { stage: e, config: t, onChange: a })
  ] });
}
const yv = "_body_8qsv9_2", Nv = "_head_8qsv9_9", kv = "_summary_8qsv9_19", $v = "_block_8qsv9_20", Cv = "_actionsBlock_8qsv9_21", Sv = "_title_8qsv9_41", Rv = "_note_8qsv9_46", xv = "_k_8qsv9_51", Tv = "_kv_8qsv9_58", Lv = "_row_8qsv9_64", Av = "_label_8qsv9_75", Ev = "_value_8qsv9_84", Iv = "_quote_8qsv9_90", Mv = "_actions_8qsv9_21", Bv = "_resolve_8qsv9_111", F = {
  body: yv,
  head: Nv,
  summary: kv,
  block: $v,
  actionsBlock: Cv,
  title: Sv,
  note: Rv,
  k: xv,
  kv: Tv,
  row: Lv,
  label: Av,
  value: Ev,
  quote: Iv,
  actions: Mv,
  resolve: Bv
};
function jv(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Pv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Me, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function qv(e) {
  const t = Nt(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function Hv(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function Dv(e, t, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Zt(qv(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...jv(e),
    ...Hv(a),
    ...Pv(e, t)
  ];
}
function Ov({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ i("section", { className: F.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: F.k, children: t }),
    e
  ] });
}
function Fv(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function zv({ item: e, showKey: t }) {
  const a = Fv(e);
  return !t && !a ? null : /* @__PURE__ */ i("div", { className: F.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Wv({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ i("div", { className: F.block, children: [
    /* @__PURE__ */ n("p", { className: F.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: F.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: F.note, children: e.agentMeta })
  ] }) : null;
}
function mA({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: l, resolve: o, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), w = Dv(e, l, d);
  return /* @__PURE__ */ n(dt, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ i("div", { className: F.body, children: [
    /* @__PURE__ */ n(zv, { item: e, showKey: u }),
    /* @__PURE__ */ i("div", { className: F.summary, children: [
      /* @__PURE__ */ n("h2", { className: F.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: F.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: F.kv, children: w.map(([_, N, k]) => /* @__PURE__ */ i("div", { className: F.row, children: [
      /* @__PURE__ */ n("dt", { className: F.label, children: _ }),
      /* @__PURE__ */ n("dd", { className: F.value, children: N })
    ] }, k ?? _)) }),
    /* @__PURE__ */ n(Wv, { item: e }),
    /* @__PURE__ */ i("div", { className: F.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: F.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: F.note, children: c })
    ] }),
    /* @__PURE__ */ n(Ov, { resolve: o, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Kv = "_root_3azmy_2", Gv = "_list_3azmy_7", Uv = "_item_3azmy_12", Vv = "_box_3azmy_18", Yv = "_text_3azmy_23", Jv = "_note_3azmy_28", et = {
  root: Kv,
  list: Gv,
  item: Uv,
  box: Vv,
  text: Yv,
  note: Jv
};
function an({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ i("div", { className: et.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${et.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ i("li", { className: `${et.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: et.box, children: /* @__PURE__ */ n(Pn, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: et.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${et.note} ward-checklist-note`, children: t })
  ] });
}
const Xv = "_rail_znbbp_2", Qv = "_k_znbbp_11", Zv = "_head_znbbp_19", eb = "_section_znbbp_25", tb = "_card_znbbp_39", nb = "_strip_znbbp_46", ab = "_skeleton_znbbp_60", rb = "_skeletonLabel_znbbp_74", lb = "_bar_znbbp_80", ob = "_note_znbbp_89", _e = {
  rail: Xv,
  k: Qv,
  head: Zv,
  section: eb,
  card: tb,
  strip: nb,
  skeleton: ab,
  skeletonLabel: rb,
  bar: lb,
  note: ob
};
function ib(e) {
  return (t) => e == null ? void 0 : e(t);
}
function un({ title: e, children: t }) {
  return /* @__PURE__ */ i("section", { className: _e.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: _e.k, children: e }),
    t
  ] });
}
function sb({ column: e, count: t }) {
  return /* @__PURE__ */ i("div", { className: _e.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: _e.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: _e.bar, "aria-hidden": "true" }, r))
  ] });
}
function cb({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(xf, { column: l, items: t.filter((o) => o.stage === l.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, l.id));
}
function db(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(cb, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(sb, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function wA(e) {
  const t = ib(e.onOpen), a = Sr(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ i("aside", { className: _e.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${_e.k} ${_e.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(un, { title: "Card", children: /* @__PURE__ */ n("div", { className: _e.card, children: a && /* @__PURE__ */ n(nn, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ i(un, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: _e.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(db, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: _e.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(un, { title: "Effect of this config", children: /* @__PURE__ */ n(an, { items: e.effects, density: "compact" }) })
  ] });
}
function ub(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function hb(e) {
  return Math.ceil(e.length / 2);
}
function mb(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Rr(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function wb(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const l = Rr(e);
  l !== void 0 && a(l), r(mb(e.type));
}
function _b(e, t, a, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (o) => wb(o, a, r, l));
  }, [e, t, a, r, l]);
}
function fb(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function vb(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function bb(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function pb(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(hb(t ?? [])) + ")"
  };
}
function gb(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function yb(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: oe(e.cost) }) : null;
}
function Nb(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function kb(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Me, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function $b(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function Cb(e, t) {
  return t === void 0 ? e : ub(e, t.ref);
}
function Sb(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function pt(e) {
  return e === !0 ? "true" : void 0;
}
function xr(e) {
  const t = e.item, a = t.run, r = a !== void 0, l = f(null), o = Mt(l), s = f(/* @__PURE__ */ new Set()), [c, d] = b(fb(t));
  _b(e.feed, t.key, s, d, o);
  const u = vb(t, r), h = bb(t, a), w = pb(t, e.fields), _ = $b(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      ...Sb(e),
      className: "ward-workcard",
      "data-flagged": pt(t.flagged),
      "data-selected": pt(e.selected),
      style: w,
      ref: Cb(l, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        gb(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          yb(t, e.fields),
          Nb(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ i("span", { className: "ward-workcard-lastrow", children: [
          kb(a, c, e.connection, t.changedAt),
          _ !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: _, children: _ }) : null
        ] })
      ]
    }
  ) });
}
function Rb({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function xb(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Tb(e, t, a) {
  return /* @__PURE__ */ i("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function Lb(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Rb, { count: e.items.length, cap: e.column.cap });
}
function Ab(e, t) {
  return e.roving ?? t;
}
function Eb(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function Ib(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    xr,
    {
      item: a,
      fields: e.fields,
      onOpen: e.onOpen,
      selected: a.key === e.selectedKey,
      feed: e.feed,
      connection: e.connection,
      rovingItem: t.itemProps(r)
    },
    a.key
  ));
}
function Mb(e) {
  const t = y(), a = Jt({ orientation: "vertical" }), r = Ab(e, a), l = xb(e);
  return /* @__PURE__ */ i("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": pt(l), "data-gate": pt(e.column.gate), children: [
    Tb(e.column, e.items.length, t),
    Lb(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Eb(e, a), children: Ib(e, r) })
  ] });
}
function Bb(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function jb(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function Pb(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function _A(e) {
  return /* @__PURE__ */ i("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ i("div", { children: [
      /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Bb(e.rollups) })
    ] }),
    /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
      jb(e),
      Pb(e.onConfigure),
      /* @__PURE__ */ n(qn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function qb(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Hb(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Qe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Qe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function Db(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ i(x, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function fA(e) {
  const t = e.stage;
  return /* @__PURE__ */ i("div", { className: "ward-configrow", "data-mandatory": pt(qb(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Hb(e) }),
    /* @__PURE__ */ n(q, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(Xa, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Db(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function vA(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ i("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(xr, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Mb, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ i("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function Ob(e, t) {
  const a = Rr(e);
  a !== void 0 && t(a);
}
function Fb(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => Ob(r, a));
  }, [e, t, a]);
}
function zb(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function Wb(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", oe(e.cost)]), t;
}
function Kb(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Me, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Gb(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function bA(e) {
  var s;
  const t = e.item, a = t.run, [r, l] = b((s = t.run) == null ? void 0 : s.lastStep);
  Fb(e.feed, t.key, l);
  const o = [...zb(t), ...Wb(t)];
  return /* @__PURE__ */ i(dt, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ i("dl", { className: "ward-kv", children: [
      o.map((c) => /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Kb(a, r)
    ] }),
    Gb(t, e.actions)
  ] });
}
const Ub = "_card_1nkkx_3", Vb = "_head_1nkkx_30", Yb = "_mark_1nkkx_38", Jb = "_name_1nkkx_50", Xb = "_chips_1nkkx_71", Qb = "_description_1nkkx_77", Zb = "_run_1nkkx_82", ep = "_sep_1nkkx_91", tp = "_facts_1nkkx_97", np = "_fact_1nkkx_97", ap = "_factLabel_1nkkx_111", rp = "_factValue_1nkkx_115", ie = {
  card: Ub,
  head: Vb,
  mark: Yb,
  name: Jb,
  chips: Xb,
  description: Qb,
  run: Zb,
  sep: ep,
  facts: tp,
  fact: np,
  factLabel: ap,
  factValue: rp
}, lp = { live: "done", draft: "running", paused: "meta" };
function op(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function ip({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: lp[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function sp({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function cp({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ i("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Me, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function dp({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ i("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function up(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function hp({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: l, facts: o, className: s }) {
  const c = { "--stream": ye(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ i(
    "article",
    {
      "aria-current": d,
      className: op(s),
      style: c,
      "data-selected": d,
      "data-paused": up(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ i("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: T(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(sp, { description: e.description }),
        /* @__PURE__ */ n(cp, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(ip, { versions: e.versions }),
        /* @__PURE__ */ n(dp, { facts: o })
      ]
    }
  );
}
const mp = "_list_4dcyc_2", wp = "_row_4dcyc_11", _p = "_head_4dcyc_23", fp = "_id_4dcyc_30", vp = "_lock_4dcyc_35", bp = "_reason_4dcyc_41", pp = "_remove_4dcyc_46", gp = "_clauses_4dcyc_50", yp = "_clause_4dcyc_50", Np = "_label_4dcyc_64", kp = "_cell_4dcyc_71", $p = "_value_4dcyc_76", ce = {
  list: mp,
  row: wp,
  head: _p,
  id: fp,
  lock: vp,
  reason: bp,
  remove: pp,
  clauses: gp,
  clause: yp,
  label: Np,
  cell: kp,
  value: $p
}, Tr = ke(!1);
function pA({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(Tr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function Cp({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(q, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => a(e.key, l) });
}
function Sp({ reason: e }) {
  return /* @__PURE__ */ i("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function Rp({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ i("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Sp, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ i(v, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function ga(e, t) {
  return e.locked ? void 0 : t;
}
function gA({ rule: e, onChange: t, onRemove: a }) {
  if (!Ne(Tr)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = ga(e, t);
  return /* @__PURE__ */ i("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Rp, { rule: e, onRemove: ga(e, a) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((l) => /* @__PURE__ */ i("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(Cp, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const xp = "_ladder_1xdeh_2", Tp = "_cell_1xdeh_7", Lp = "_empty_1xdeh_26", Ap = "_name_1xdeh_34", Ep = "_holder_1xdeh_40", Ip = "_request_1xdeh_46", Mp = "_swatches_1xdeh_51", Bp = "_swatch_1xdeh_51", jp = "_tilesFrame_1xdeh_78", Pp = "_tiles_1xdeh_78", qp = "_tile_1xdeh_78", Hp = "_bar_1xdeh_117", Dp = "_hex_1xdeh_128", Op = "_note_1xdeh_138", B = {
  ladder: xp,
  cell: Tp,
  empty: Lp,
  name: Ap,
  holder: Ep,
  request: Ip,
  swatches: Mp,
  swatch: Bp,
  tilesFrame: jp,
  tiles: Pp,
  tile: qp,
  bar: Hp,
  hex: Dp,
  note: Op
}, yA = "not validated yet, pending a CVD matrix and dark stepping";
function Fp(e) {
  return e.reserved ? "reserved" : gt(e.step) ? "validated" : "partial";
}
function Lr(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function zp(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Wp({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ge, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${B.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Kp(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function Gp(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const ya = (e) => String(e).padStart(2, "0");
function Up(e, t, a) {
  return e === "reserved" ? "Reserved until revalidated" : a ? "yours" : t ?? Lr(e, void 0);
}
function Vp({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${B.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.hex} ward-ladder-hex`, children: r ? `step ${ya(e)}` : Wl(e) }),
    /* @__PURE__ */ n("span", { className: `${B.note} ward-ladder-note`, children: r ? a : `Step ${ya(e)} · ${a}` })
  ] });
}
function Yp({ step: e, value: t, taken: a, onChange: r, presentation: l, disabled: o }) {
  const s = Fp(e), c = Lr(s, a), d = c !== "free", u = d || o, h = t === e.step, w = e.name ?? `Step ${e.step}`, _ = () => {
    u || r(e.step);
  }, N = `${w} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...Gp(d, h, u), "data-validation": s, style: zp(e, s), onClick: _, onKeyDown: (E) => Kp(E, _) }, label: N, name: w, holder: c, validation: s, note: Up(s, a, h), step: e.step };
}
const Jp = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${B.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${B.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Vp, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ i("span", { ...e.shared, className: `${B.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Wp, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${B.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${B.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Xp(e) {
  return Jp[e.presentation](Yp(e));
}
function Qp(e) {
  for (const t of e)
    if (!t.reserved && !Xt(t.step)) throw new Error("colour ladder renders token steps only");
}
function Zp() {
  return /* @__PURE__ */ i("div", { className: `${B.cell} ward-ladder-cell ${B.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${B.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${B.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function eg(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const tg = { list: B.ladder, swatches: B.swatches, tiles: B.tilesFrame };
function ng() {
  return /* @__PURE__ */ i("div", { className: `${B.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${B.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${B.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const ag = { list: Zp, swatches: () => null, tiles: ng };
function rg(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Ar(e) {
  const t = e.takenBy ?? {}, a = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Qp(e.steps);
  const r = eg(e), l = ag[r], o = /* @__PURE__ */ i(x, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(Xp, { step: s, value: e.value, taken: t[s.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...rg(e.disabled === !0), className: `${tg[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: B.tiles, children: o }) : o });
}
const lg = "_rail_s06lm_2", og = "_section_s06lm_12", ig = "_sectionFlush_s06lm_22", sg = "_head_s06lm_26", cg = "_headLabel_s06lm_34", dg = "_sample_s06lm_42", ug = "_sampleLabel_s06lm_47", hg = "_sampleTitle_s06lm_54", mg = "_sampleMeta_s06lm_59", wg = "_trace_s06lm_65", _g = "_traceHead_s06lm_70", fg = "_steps_s06lm_78", vg = "_step_s06lm_78", bg = "_stepTitle_s06lm_97", pg = "_hollow_s06lm_107", gg = "_stepBody_s06lm_115", yg = "_stepDetail_s06lm_127", Ng = "_publish_s06lm_132", kg = "_reason_s06lm_138", $g = "_note_s06lm_143", Cg = "_reveal_s06lm_148", $ = {
  rail: lg,
  section: og,
  sectionFlush: ig,
  head: sg,
  headLabel: cg,
  sample: dg,
  sampleLabel: ug,
  sampleTitle: hg,
  sampleMeta: mg,
  trace: wg,
  traceHead: _g,
  steps: fg,
  step: vg,
  stepTitle: bg,
  hollow: pg,
  stepBody: gg,
  stepDetail: yg,
  publish: Ng,
  reason: kg,
  note: $g,
  reveal: Cg
}, Na = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Sg = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Rg = { ok: "greenFill", finding: "orangeFill", action: "blue" }, xg = { notSimulated: "not simulated", running: "running" };
function Tg(e) {
  return e.presentation === "foundry";
}
function Lg(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const a = t.filter((r) => !r.met);
  return a.length > 0 ? `Publish is disabled: ${a.length} of ${t.length} gate conditions unmet: ${a[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Ag(e, t) {
  var r;
  const a = Sg[e.status];
  return a !== void 0 ? a : ((r = t.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Eg(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Ig(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Mg(e) {
  if (Eg(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Bg(e) {
  const [t, a] = b(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function jg(e) {
  const t = xg[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(Ge, { size: 6, kind: Rg[e.kind], label: e.kind });
}
function Pg(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ i("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function qg(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Me, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Hg(e) {
  const { step: t } = e;
  return /* @__PURE__ */ i(Bg, { kind: t.kind, children: [
    /* @__PURE__ */ n(jg, { kind: t.kind }),
    /* @__PURE__ */ i("span", { className: $.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: $.stepTitle, children: t.title }),
      /* @__PURE__ */ n(Pg, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(qg, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function Dg(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(ue(t)), a.join(" · ");
}
function Er(e) {
  const t = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ i("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.traceHead, id: t, children: Dg(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: $.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(Hg, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function Og(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ i("div", { className: `${$.sample} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ i("p", { className: $.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ i("p", { className: $.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function Fg(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function zg(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : oe(e.run.cost), label: "Cost" }, { value: e.run.turns ? Da(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(en, { divided: !0, cells: t }) });
}
function Wg(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: oe(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: Da(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function Kg(e) {
  const t = Wg(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ i("p", { className: $.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(en, { divided: !0, cells: t }) });
}
function Ir(e) {
  const t = y();
  return e.reason !== null ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("p", { className: `${$.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Gg(e) {
  return /* @__PURE__ */ i("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ n(Ir, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: $.note, children: e.note })
  ] });
}
function Ug(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ n(Ir, { reason: e.reason, onPublish: e.onPublish }) });
}
function Mr(e) {
  return /* @__PURE__ */ i("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: Na[e.run.status].role, label: Na[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Me, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Vg(e, t) {
  const [a, r] = b(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((t == null ? void 0 : t.subscribe) === void 0 || e.status !== "running"))
      return t.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((o) => {
          var s, c;
          return [...o, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [t, e.status]), a;
}
function Yg(e) {
  var a;
  Ig(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Mr, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(Og, { sample: e.run.sample }),
    /* @__PURE__ */ n(Er, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(zg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(an, { items: e.checklist }) }),
    /* @__PURE__ */ n(Gg, { reason: Lg(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Jg(e) {
  var r;
  const t = Vg(e.run, e.feed);
  Mg(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Mr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(Fg, { sample: e.run.sample }),
    /* @__PURE__ */ n(Er, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(Kg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(an, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Ug, { reason: Ag(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function NA(e) {
  return Tg(e) ? /* @__PURE__ */ n(Jg, { ...e }) : /* @__PURE__ */ n(Yg, { ...e });
}
const Xg = "_list_142ip_3", Qg = "_row_142ip_9", Zg = "_condition_142ip_18", ey = "_action_142ip_24", jt = {
  list: Xg,
  row: Qg,
  condition: Zg,
  action: ey
}, Br = ke(!1);
function kA({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(Br.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: jt.list, "aria-label": t, children: e }) });
}
function $A({ rule: e }) {
  if (!Ne(Br)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ i("li", { className: jt.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: jt.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: jt.action, children: e.then })
  ] });
}
const ty = "_move_tmppt_3", ny = {
  move: ty
};
function Nn(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [l] = r.splice(t, 1);
  return r.splice(a, 0, l), r;
}
function jr(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function Pr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function ka(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function ay(e) {
  return e === "up" ? "down" : "up";
}
function ry(e, t) {
  const a = ka(e, t.id, t.direction) ?? ka(e, t.id, ay(t.direction));
  a == null || a.focus();
}
function qr() {
  const e = f(null), [t, a] = b(null), [r, l] = b("");
  return S(() => {
    e.current !== null && t !== null && ry(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), l(c);
  } };
}
function Hr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function zt({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${ny.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const ly = "_body_1jd1i_2", oy = "_title_1jd1i_8", iy = "_section_1jd1i_13", sy = "_legend_1jd1i_18", cy = "_stages_1jd1i_26", dy = "_stage_1jd1i_26", uy = "_stageIndex_1jd1i_44", hy = "_stageName_1jd1i_50", my = "_footer_1jd1i_59", wy = "_note_1jd1i_66", _y = "_reason_1jd1i_71", fy = "_actions_1jd1i_76", vy = "_webHead_1jd1i_83", by = "_kicker_1jd1i_92", py = "_webTitle_1jd1i_99", gy = "_webBody_1jd1i_105", yy = "_webSection_1jd1i_109", Ny = "_sectionHead_1jd1i_121", ky = "_sectionNote_1jd1i_129", $y = "_formLabel_1jd1i_134", Cy = "_identityRow_1jd1i_139", Sy = "_nameCell_1jd1i_145", Ry = "_keyCell_1jd1i_150", xy = "_colourCell_1jd1i_154", Ty = "_colourStatus_1jd1i_161", Ly = "_webStages_1jd1i_166", Ay = "_webStageList_1jd1i_172", Ey = "_webStage_1jd1i_166", Iy = "_webIndex_1jd1i_191", My = "_webStageName_1jd1i_196", By = "_webMoves_1jd1i_201", jy = "_addStage_1jd1i_215", Py = "_addStageButton_1jd1i_223", qy = "_addStageNote_1jd1i_231", Hy = "_webFooter_1jd1i_236", Dy = "_webFooterNotes_1jd1i_244", Oy = "_webNote_1jd1i_251", p = {
  body: ly,
  title: oy,
  section: iy,
  legend: sy,
  stages: cy,
  stage: dy,
  stageIndex: uy,
  stageName: hy,
  footer: my,
  note: wy,
  reason: _y,
  actions: fy,
  webHead: vy,
  kicker: by,
  webTitle: py,
  webBody: gy,
  webSection: yy,
  sectionHead: Ny,
  sectionNote: ky,
  formLabel: $y,
  identityRow: Cy,
  nameCell: Sy,
  keyCell: Ry,
  colourCell: xy,
  colourStatus: Ty,
  webStages: Ly,
  webStageList: Ay,
  webStage: Ey,
  webIndex: Iy,
  webStageName: My,
  webMoves: By,
  addStage: jy,
  addStageButton: Py,
  addStageNote: qy,
  webFooter: Hy,
  webFooterNotes: Dy,
  webNote: Oy
}, Fy = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Dr = "not in catalogue";
function zy(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${Dr}` }, ...a];
}
function Wy({ stage: e, index: t, catalogue: a, onName: r }) {
  const l = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(q, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const o = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Dr}`;
  return /* @__PURE__ */ n(q, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: zy(a, e.name), invalid: o, onChange: r });
}
function Or(e, t) {
  return e.name || `stage ${t + 1}`;
}
function Ky(e) {
  const t = f([]), a = f(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function Gy({ id: e, stage: t, index: a, total: r, catalogue: l, onReplace: o, onMove: s }) {
  const c = Or(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ i("li", { className: `${p.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: p.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: p.webStageName, children: /* @__PURE__ */ n(Wy, { stage: t, index: a, catalogue: l, onName: (u) => o({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(q, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: Fy, onChange: (u) => o({ ...t, kind: u }) }),
    /* @__PURE__ */ i("span", { className: p.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(zt, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(zt, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Uy({ stages: e, onChange: t, catalogue: a }) {
  const r = Ky(e.length), l = qr(), o = (c, d) => {
    const u = jr(c, d);
    r.current = Nn(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Pr(Or(e[c], c), u, e.length)), t(Nn(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ i("div", { className: p.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: p.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(Gy, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => o(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(Hr, { text: l.announcement }),
    /* @__PURE__ */ i("p", { className: p.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: p.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: p.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Vy = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Yy = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Jy = "A new stream starts as a draft. Nothing runs on it until you publish it.", Xy = "Create is disabled: name the stream and give it a key first.", Qy = "reorder with the ↑ ↓ buttons · min 2";
function Dn(e, t) {
  return !e.reserved && gt(e.step) && t[e.step] === void 0;
}
function Zy(e, t) {
  const a = e.find((r) => Dn(r, t));
  return a ? a.step : 1;
}
function eN({ stages: e, onMove: t }) {
  const a = qr(), r = (l, o) => {
    const s = jr(l, o);
    a.moved({ id: e[l].id, direction: o }, Pr(e[l].name, s, e.length)), t(l, s);
  };
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: p.stages, "aria-label": "Stages in order", children: e.map((l, o) => /* @__PURE__ */ i("li", { className: p.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stageIndex, children: String(o + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: p.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
      o > 0 && /* @__PURE__ */ n(zt, { id: l.id, name: l.name, direction: "up", onMove: () => r(o, "up") }),
      o < e.length - 1 && /* @__PURE__ */ n(zt, { id: l.id, name: l.name, direction: "down", onMove: () => r(o, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(Hr, { text: a.announcement })
  ] });
}
function tN({ reason: e, onCreate: t, onDraft: a }) {
  const r = y();
  return /* @__PURE__ */ i("div", { className: p.footer, children: [
    /* @__PURE__ */ n("p", { className: p.note, children: Jy }),
    e && /* @__PURE__ */ n("p", { className: p.reason, id: r, children: e }),
    /* @__PURE__ */ i("div", { className: p.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function nN(e, t) {
  return e !== "" && t !== "" ? null : Xy;
}
function aN(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: l = Yy, onCreate: o, onDraft: s, onClose: c, returnFocusTo: d } = e, u = y(), [h, w] = b(""), [_, N] = b(""), [k, E] = b(t[0].value), [H, me] = b(() => Zy(a, r)), [re, je] = b(e.stages ?? Vy), [Ze, L] = b(l[0].value), J = { name: h, key: _, streamStep: H, owner: k, stages: re, policy: Ze }, $e = nN(h, _);
  return /* @__PURE__ */ n(dt, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ i("div", { className: p.body, children: [
    /* @__PURE__ */ n("h2", { className: p.title, id: u, children: "New stream" }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ n("legend", { className: p.legend, children: "Identity" }),
      /* @__PURE__ */ n(q, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ n(q, { kind: "input", label: "Key", value: _, onChange: N, mono: !0 }),
      /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: k, onChange: E, options: t })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ n("legend", { className: p.legend, children: "Colour" }),
      /* @__PURE__ */ n(Ar, { label: "Stream colour", steps: a, value: H, onChange: me, takenBy: r })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ n("legend", { className: p.legend, children: "Stages" }),
      /* @__PURE__ */ n(eN, { stages: re, onMove: (Ue, Nl) => je(Nn(re, Ue, Nl)) })
    ] }),
    /* @__PURE__ */ n(gr, { legend: "Loop policy", options: l, value: Ze, onChange: L }),
    /* @__PURE__ */ n(tN, { reason: $e, onCreate: () => o(J), onDraft: () => s(J) })
  ] }) });
}
const Fr = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], rN = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function lN(e, t, a, r, l, o) {
  var c;
  const s = ((c = Fr.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: o };
}
function oN(e, t) {
  return iN(e) && sN(e, t) && cN(e);
}
function iN(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function sN(e, t) {
  return e.colourStep === null || Dn({ step: e.colourStep }, t);
}
function cN(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function dN(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : Dn({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function uN({ stage: e }) {
  return e ? /* @__PURE__ */ i("p", { className: p.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: p.webNote, children: "Add a stage an agent can run on." });
}
function hN({ ready: e, draft: t, agentStage: a, onCreate: r, onDraft: l, reasonId: o }) {
  return /* @__PURE__ */ i("div", { className: p.webFooter, children: [
    /* @__PURE__ */ i("div", { className: p.webFooterNotes, children: [
      /* @__PURE__ */ n(uN, { stage: a }),
      !e && /* @__PURE__ */ n("p", { id: o, className: p.reason, children: rN })
    ] }),
    l && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => l(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: o, children: "Create stream" })
  ] });
}
function mN({ titleId: e }) {
  return /* @__PURE__ */ i("header", { className: p.webHead, children: [
    /* @__PURE__ */ n("span", { className: p.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: p.webTitle, children: "New stream" })
  ] });
}
function wN({ name: e, setName: t, streamKey: a, setKey: r, colour: l, owner: o }) {
  return /* @__PURE__ */ i("section", { className: p.webSection, children: [
    /* @__PURE__ */ n("h3", { className: p.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ i("div", { className: p.identityRow, children: [
      /* @__PURE__ */ n("div", { className: p.nameCell, children: /* @__PURE__ */ n(q, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ n("div", { className: p.keyCell, children: /* @__PURE__ */ n(q, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      l
    ] }),
    o
  ] });
}
function _N(e) {
  const t = y(), a = y(), r = e.takenBy ?? {}, [l, o] = b(""), [s, c] = b(""), [d, u] = b(e.owners[0] ?? ""), [h, w] = b(null), [_, N] = b("relay"), [k, E] = b([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), H = lN(l, s, d, h, _, k), me = oN(H, r), re = k.find((L) => L.kind === "agent" && L.name.trim() !== ""), je = /* @__PURE__ */ i("div", { className: p.colourCell, children: [
    /* @__PURE__ */ n("span", { className: p.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Ar, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ze = /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("p", { className: p.colourStatus, "data-colour-status": "", children: dN(h, r) }),
    /* @__PURE__ */ n(q, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((L) => ({ value: L, label: L })), onChange: u })
  ] });
  return /* @__PURE__ */ i(dt, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(mN, { titleId: a }),
    /* @__PURE__ */ i("div", { className: p.webBody, children: [
      /* @__PURE__ */ n(wN, { name: l, setName: o, streamKey: s, setKey: c, colour: je, owner: Ze }),
      e.fields && /* @__PURE__ */ n("section", { className: p.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ i("section", { className: p.webSection, children: [
        /* @__PURE__ */ i("div", { className: p.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: p.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: p.sectionNote, children: Qy })
        ] }),
        /* @__PURE__ */ n(Uy, { stages: k, onChange: E })
      ] }),
      /* @__PURE__ */ n("section", { className: p.webSection, children: /* @__PURE__ */ n(gr, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: _, options: Fr, onChange: N }) }),
      /* @__PURE__ */ n(hN, { ready: me, draft: H, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function CA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(_N, { ...e }) : /* @__PURE__ */ n(aN, { ...e });
}
const fN = "_row_bs8hc_2", vN = "_cell_bs8hc_6", bN = "_condition_bs8hc_11", pN = "_action_bs8hc_18", gN = "_contract_bs8hc_24", yN = "_contractCondition_bs8hc_33", NN = "_contractAction_bs8hc_39", ne = {
  row: fN,
  cell: vN,
  condition: bN,
  action: pN,
  contract: gN,
  contractCondition: yN,
  contractAction: NN
}, zr = ["advance", "block", "escalate", "requestReview"], $a = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Wt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function On(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ne.action, children: $a[e.then] }) : /* @__PURE__ */ n(
    q,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => t({ ...e, then: l }),
      options: zr.map((l) => ({ value: l, label: $a[l] }))
    }
  );
}
function kN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ne.row, children: [
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n("span", { className: ne.condition, title: Wt(e, r), children: Wt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: On(e, t, a) })
  ] });
}
function $N({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ne.row, children: [
    /* @__PURE__ */ i("td", { className: ne.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ne.condition, children: Wt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: On(e, t, a) })
  ] });
}
function CN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("li", { className: ne.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ne.contractCondition, children: Wt(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ne.contractAction, children: On(e, t, a, !0) })
  ] });
}
const SN = { two: $N, four: kN, contract: CN };
function SA(e) {
  var a;
  if (!zr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = SN[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const RN = "_column_g1uat_2", xN = "_head_g1uat_17", TN = "_index_g1uat_23", LN = "_name_g1uat_29", AN = "_meta_g1uat_38", EN = "_mono_g1uat_43", IN = "_gate_g1uat_50", MN = "_reviewersLabel_g1uat_57", BN = "_reviewers_g1uat_57", jN = "_reviewer_g1uat_57", PN = "_agents_g1uat_74", qN = "_workflowColumn_g1uat_79", HN = "_workflowHead_g1uat_96", DN = "_stageRow_g1uat_102", ON = "_stageLabel_g1uat_109", FN = "_workflowTitle_g1uat_116", zN = "_workflowMeta_g1uat_122", WN = "_workflowGate_g1uat_127", KN = "_gateNote_g1uat_135", GN = "_cardNote_g1uat_140", UN = "_reviewerList_g1uat_145", VN = "_reviewerRow_g1uat_151", YN = "_reviewerMark_g1uat_157", JN = "_reviewerName_g1uat_167", XN = "_terminalCard_g1uat_173", QN = "_terminalCount_g1uat_182", ZN = "_workflowAgents_g1uat_188", e1 = "_mount_g1uat_194", R = {
  column: RN,
  head: xN,
  index: TN,
  name: LN,
  meta: AN,
  mono: EN,
  gate: IN,
  reviewersLabel: MN,
  reviewers: BN,
  reviewer: jN,
  agents: PN,
  workflowColumn: qN,
  workflowHead: HN,
  stageRow: DN,
  stageLabel: ON,
  workflowTitle: FN,
  workflowMeta: zN,
  workflowGate: WN,
  gateNote: KN,
  cardNote: GN,
  reviewerList: UN,
  reviewerRow: VN,
  reviewerMark: YN,
  reviewerName: JN,
  terminalCard: XN,
  terminalCount: QN,
  workflowAgents: ZN,
  mount: e1
}, t1 = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function Fn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function Wr(e) {
  return `${Math.round(e * 100)}%`;
}
function n1({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(en, { cells: [
      { value: Wr(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function a1({ stage: e }) {
  return /* @__PURE__ */ n(en, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: Fn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function r1({ stage: e, titleId: t }) {
  return /* @__PURE__ */ i("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: t1[e.kind] })
  ] });
}
function l1({ stage: e }) {
  return /* @__PURE__ */ i("p", { className: R.meta, children: [
    /* @__PURE__ */ i("span", { className: R.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ i("span", { className: R.mono, children: [
      ue(e.medianWait),
      " median wait"
    ] })
  ] });
}
function o1({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(n1, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(a1, { stage: e }) : null;
}
function i1({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function s1({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const l = y(), o = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("section", { className: R.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(r1, { stage: e, titleId: l }),
    /* @__PURE__ */ n(l1, { stage: e }),
    /* @__PURE__ */ n(o1, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(hp, { ...s, connection: o }, s.agent.id)) }),
    /* @__PURE__ */ n(i1, { onMount: a })
  ] });
}
const c1 = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function d1({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ i("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function u1({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ i("p", { className: R.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ n(d1, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ i("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: Wr(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function h1(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function m1({ stage: e }) {
  return /* @__PURE__ */ i("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: Fn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: h1(e.rolledBackThisWeek) })
  ] });
}
function w1(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function _1(e) {
  if (e.kind === "terminal") return `${Fn(e.closedThisWeek)} this week`;
  const t = w1(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function f1({ stage: e, titleId: t }) {
  const a = c1[e.kind];
  return /* @__PURE__ */ i("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ i("span", { className: R.stageRow, children: [
      /* @__PURE__ */ i("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: _1(e) })
  ] });
}
function v1(e) {
  return e === "entry" || e === "agent";
}
function b1({ stage: e, onMount: t }) {
  return t === void 0 || !v1(e.kind) ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Mount agent" });
}
function p1({ stage: e, agentCards: t, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ i("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(f1, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(u1, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(m1, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(b1, { stage: e, onMount: a })
  ] });
}
function g1(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function RA(e) {
  return g1(e) ? /* @__PURE__ */ n(p1, { ...e }) : /* @__PURE__ */ n(s1, { ...e });
}
const y1 = "_row_1tdra_6", N1 = "_name_1tdra_12", k1 = "_compactRow_1tdra_13", $1 = "_compactName_1tdra_13", C1 = "_cell_1tdra_30", S1 = "_chain_1tdra_45", R1 = "_owner_1tdra_51", x1 = "_mono_1tdra_57", T1 = "_compactCell_1tdra_79", L1 = "_stack_1tdra_96", A1 = "_stat_1tdra_103", E1 = "_identityLine_1tdra_110", I1 = "_identity_1tdra_110", M1 = "_ownerLine_1tdra_140", B1 = "_link_1tdra_160", j1 = "_gateMark_1tdra_166", P1 = "_emptyChain_1tdra_171", q1 = "_arrow_1tdra_177", H1 = "_muted_1tdra_182", D1 = "_define_1tdra_187", O1 = "_statValue_1tdra_194", F1 = "_policyId_1tdra_200", z1 = "_sub_1tdra_205", g = {
  row: y1,
  name: N1,
  compactRow: k1,
  compactName: $1,
  cell: C1,
  chain: S1,
  owner: R1,
  mono: x1,
  compactCell: T1,
  stack: L1,
  stat: A1,
  identityLine: E1,
  identity: I1,
  ownerLine: M1,
  link: B1,
  gateMark: j1,
  emptyChain: P1,
  arrow: q1,
  muted: H1,
  define: D1,
  statValue: O1,
  policyId: F1,
  sub: z1
};
function Kr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: l, button: o } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: l, button: o };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function W1(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function K1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Gr(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function G1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Gr(e.members)}`;
}
function U1(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ i("span", { className: g.stack, children: [
    /* @__PURE__ */ i("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: T(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: G1(e) })
  ] }) });
}
function Ur({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ i(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function V1(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = Nt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function Y1({ stages: e, streamStep: t }) {
  const a = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, o) => /* @__PURE__ */ i("span", { className: g.link, children: [
    /* @__PURE__ */ n(Ur, { name: l.name, gate: l.gate === !0, look: V1(o, a, t), size: "tag" }),
    o === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${o}`)) });
}
function J1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ i("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : Y1(e) });
}
function Vr(e) {
  return e === void 0 ? void 0 : !0;
}
function Ca(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Vr(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function X1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function Q1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Z1({ stream: e, href: t, presentation: a }) {
  const r = K1(a.className);
  return /* @__PURE__ */ i("tr", { className: `${r} ward-streamrow`, onClick: Kr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ye(e.streamStep, "chip") }, children: [
    U1(e, t),
    J1(e),
    Ca(Q1(e.agents), e.agents === void 0 ? void 0 : W1(e.agents), "—"),
    X1(e.policy),
    Ca(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function ek(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function xA(e) {
  if (ek(e)) return Z1(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ i("tr", { className: g.row, onClick: Kr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ i("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: T(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...Zt(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(Ur, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ i("span", { className: g.mono, children: [
      t.agents.live,
      " live · ",
      t.agents.draft,
      " draft · ",
      t.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ i("td", { className: g.cell, children: [
      /* @__PURE__ */ n("span", { className: g.owner, children: t.owner }),
      /* @__PURE__ */ n("span", { className: g.mono, children: Gr(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": Vr(t.inFlightHint), children: ae(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : ue(t.p50) }) })
  ] });
}
const tk = "_row_2u4ll_2", nk = "_name_2u4ll_16", ak = "_scope_2u4ll_24", Kt = {
  row: tk,
  name: nk,
  scope: ak
};
function zn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function rk(e) {
  return e === void 0 ? `${Kt.row} ward-toolrow` : `${Kt.row} ward-toolrow ${e}`;
}
function lk(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function ok({ id: e, reasonId: t, tool: a, state: r, onChange: l }) {
  return /* @__PURE__ */ n(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: a.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? t : void 0,
      onChange: (o) => {
        r.locked || l(o.target.checked);
      }
    }
  );
}
function ik({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: zn(e) });
}
function sk({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${Kt.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function ck(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function TA({ tool: e, onChange: t, presentation: a }) {
  const r = y(), l = y(), o = lk(e, a), s = ck(a);
  return /* @__PURE__ */ i(s, { className: rk(a == null ? void 0 : a.className), "data-locked": o.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(ok, { id: r, reasonId: l, tool: e, state: o, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${Kt.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(sk, { tool: e, state: o, reasonId: l }),
    /* @__PURE__ */ n(ik, { classification: e.classification }),
    o.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const dk = "_strip_4ppv9_2", uk = "_well_4ppv9_11", hk = "_head_4ppv9_18", mk = "_name_4ppv9_24", wk = "_chart_4ppv9_32", _k = "_segment_4ppv9_38", fk = "_detailedChart_4ppv9_44", vk = "_rail_4ppv9_57", bk = "_section_4ppv9_63", pk = "_label_4ppv9_74", gk = "_note_4ppv9_91", V = {
  strip: dk,
  well: uk,
  head: hk,
  name: mk,
  chart: wk,
  segment: _k,
  detailedChart: fk,
  rail: vk,
  section: bk,
  label: pk,
  note: gk
}, yk = "No item in flight to preview.", Nk = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", kk = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", kn = [1, 2, 3, 4, 5, 6], Gt = 100;
function $k(e, t) {
  return t.has(e) ? ye(e, "id") : "var(--ward-color-line)";
}
function Ck({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: kn.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: l * Gt,
      y: "0",
      width: Gt,
      height: "8",
      fill: $k(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Sk(e) {
  const t = e.slice(0, kn.length);
  for (; t.length < kn.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function Rk({ identities: e }) {
  return /* @__PURE__ */ i("figure", { className: `${V.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, a) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(a * Gt),
        y: "0",
        width: String(Gt),
        height: "40",
        style: { fill: ye(t.streamStep, "chip") }
      },
      t.key + String(a)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((t, a) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(a))) })
  ] });
}
function Yr(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Rt({ label: e, children: t }) {
  const a = y();
  return /* @__PURE__ */ i("section", { className: V.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: V.label, children: e }),
    t
  ] });
}
function xk({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: t ?? yk }) : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(nn, { item: { ...e, streamStep: Nt(a.streamStep) }, onOpen: Yr(r), feed: null }) });
}
function Tk({ draft: e }) {
  const t = { "--stream": ye(e.streamStep, "id") };
  return /* @__PURE__ */ i("p", { className: V.head, style: t, children: [
    /* @__PURE__ */ n(Ge, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Zt(e.key, e.streamStep) })
  ] });
}
function Lk(e) {
  const t = Sk(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ i("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(Rt, { label: "Board card", children: /* @__PURE__ */ n(xk, { ...e, draft: a }) }),
    /* @__PURE__ */ n(Rt, { label: "Streams index row", children: /* @__PURE__ */ n(Tk, { draft: a }) }),
    /* @__PURE__ */ i(Rt, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(Rk, { identities: t }),
      /* @__PURE__ */ n("p", { className: V.note, children: Nk })
    ] }),
    /* @__PURE__ */ n(Rt, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: kk }) })
  ] });
}
function Ak({ draft: e, sample: t, streams: a, onOpen: r }) {
  const l = { "--stream": ye(e.streamStep, "id") };
  return /* @__PURE__ */ i("section", { className: V.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ i("div", { className: V.head, children: [
      /* @__PURE__ */ n(Ge, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Zt(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(nn, { item: { ...t, streamStep: e.streamStep }, onOpen: Yr(r) }) }),
    /* @__PURE__ */ n(Ck, { draft: e, streams: a })
  ] });
}
function LA(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Lk, { ...e }) : /* @__PURE__ */ n(Ak, { ...e });
}
const Ek = "_row_ixlg5_6", Ik = "_headCell_ixlg5_10", Mk = "_cell_ixlg5_11", Bk = "_name_ixlg5_23", jk = "_consequence_ixlg5_29", Pk = "_governed_ixlg5_36", qk = "_control_ixlg5_42", Hk = "_byRole_ixlg5_48", Dk = "_webControl_ixlg5_59", Ok = "_webConsequence_ixlg5_65", Fk = "_webGoverned_ixlg5_71", W = {
  row: Ek,
  headCell: Ik,
  cell: Mk,
  name: Bk,
  consequence: jk,
  governed: Pk,
  control: qk,
  byRole: Hk,
  webControl: Dk,
  webConsequence: Ok,
  webGoverned: Fk
};
function zk({
  capability: e,
  cell: t,
  onChange: a
}) {
  return t.value === "byRole" ? /* @__PURE__ */ n("span", { className: W.byRole, children: "by role" }) : /* @__PURE__ */ i("span", { className: W.control, children: [
    /* @__PURE__ */ n(
      Qe,
      {
        label: `${e.name} · ${t.stream}`,
        checked: t.value !== "off",
        onChange: (r) => a(t.streamStep, r)
      }
    ),
    t.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "Pilot" })
  ] });
}
function Wk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: W.headCell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: W.consequence, children: e.consequence }),
      /* @__PURE__ */ i("span", { className: W.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(zk, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function Kk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Gk({ name: e, cell: t, onChange: a }) {
  if (t.value === "byRole") return /* @__PURE__ */ n("span", { className: `${W.webControl} ${W.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Qe,
    {
      label: `${e} · step ${t.streamStep}`,
      checked: t.value === "on",
      disabled: a === void 0,
      onChange: (l) => a == null ? void 0 : a(t.streamStep, l ? "on" : "off")
    }
  );
  return t.value !== "pilot" ? r : /* @__PURE__ */ i("span", { className: `${W.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function Uk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ i("td", { className: W.cell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${W.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(Gk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webGoverned} ward-cellmeta`, children: Kk(e) }) })
  ] });
}
function AA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Uk, { ...e }) : /* @__PURE__ */ n(Wk, { ...e });
}
const Vk = "_row_vv64h_2", Yk = "_cell_vv64h_6", Jk = "_name_vv64h_25", Xk = "_note_vv64h_30", Qk = "_webName_vv64h_41", Zk = "_webMeta_vv64h_47", Q = {
  row: Vk,
  cell: Yk,
  name: Jk,
  note: Xk,
  webName: Qk,
  webMeta: Zk
}, Jr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function e$(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function t$({ component: e, onRestart: t }) {
  const a = y(), r = Jr[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ i("tr", { className: Q.row, children: [
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { className: Q.name, children: e.name }) }),
    /* @__PURE__ */ i("td", { className: Q.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { id: a, className: Q.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(v, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function n$({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e.name), children: e$(e.state) });
}
function a$({ component: e, onRestart: t }) {
  return /* @__PURE__ */ i("tr", { className: Q.row, children: [
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { className: `${Q.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { className: `${Q.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { ...Jr[e.state] }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(n$, { component: e, onRestart: t }) })
  ] });
}
function EA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(a$, { ...e }) : /* @__PURE__ */ n(t$, { ...e });
}
const r$ = "_row_jcm5k_7", l$ = "_cell_jcm5k_11", o$ = "_next_jcm5k_28", i$ = "_headCell_jcm5k_38", s$ = "_webId_jcm5k_77", c$ = "_webPurpose_jcm5k_83", d$ = "_webMeta_jcm5k_91", u$ = "_webUrgent_jcm5k_97", K = {
  row: r$,
  cell: l$,
  next: o$,
  headCell: i$,
  webId: s$,
  webPurpose: c$,
  webMeta: d$,
  webUrgent: u$
}, h$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, m$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Xr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], w$ = Object.fromEntries(Xr.map((e) => [e.key, e]));
function tt({ column: e, children: t }) {
  const a = w$[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: K.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: t
    }
  );
}
function IA() {
  return /* @__PURE__ */ n("tr", { children: Xr.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: K.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function _$({ cred: e }) {
  const t = h$[e.state];
  return /* @__PURE__ */ i("tr", { className: K.row, children: [
    /* @__PURE__ */ n(tt, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(tt, { column: "id", children: e.id }),
    /* @__PURE__ */ n(tt, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(tt, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: zn(e.cls) }) }),
    /* @__PURE__ */ n(tt, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(tt, { column: "next", children: /* @__PURE__ */ n("span", { className: K.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function f$({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${K.webMeta} ${K.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function v$({ cred: e }) {
  return /* @__PURE__ */ i("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(f$, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...m$[e.state] }) })
  ] });
}
function MA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(v$, { ...e }) : /* @__PURE__ */ n(_$, { ...e });
}
const b$ = "_card_lpp45_2", p$ = "_head_lpp45_11", g$ = "_env_lpp45_18", y$ = "_version_lpp45_25", N$ = "_meta_lpp45_32", k$ = "_webCard_lpp45_37", $$ = "_webRow_lpp45_47", C$ = "_webTitle_lpp45_55", S$ = "_webLine_lpp45_65", R$ = "_webVersion_lpp45_72", x$ = "_webMeta_lpp45_77", X = {
  card: b$,
  head: p$,
  env: g$,
  version: y$,
  meta: N$,
  webCard: k$,
  webRow: $$,
  webTitle: C$,
  webLine: S$,
  webVersion: R$,
  webMeta: x$
}, Sa = { dev: "Dev", uat: "UAT", prod: "Prod" }, Qr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function T$({ env: e }) {
  const t = Qr[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ i("section", { className: X.card, "aria-label": Sa[e.env], children: [
    /* @__PURE__ */ i("div", { className: X.head, children: [
      /* @__PURE__ */ n("span", { className: X.env, children: Sa[e.env] }),
      /* @__PURE__ */ n(m, { role: t.role, label: t.label })
    ] }),
    /* @__PURE__ */ n("p", { className: X.version, children: e.version }),
    /* @__PURE__ */ i("p", { className: X.meta, children: [
      "deployed ",
      he(e.deployedAt)
    ] }),
    a && /* @__PURE__ */ n("p", { className: X.meta, children: a })
  ] });
}
function L$(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function A$(e) {
  return /* @__PURE__ */ i("article", { className: `${X.webCard} ward-envcard`, children: [
    /* @__PURE__ */ i("span", { className: `${X.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${X.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Qr[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${X.version} ${X.webVersion} ${X.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${X.meta} ${X.webMeta} ${X.webLine} ward-cellmeta`, children: L$(e) })
  ] });
}
function BA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(A$, { ...e }) : /* @__PURE__ */ n(T$, { ...e });
}
const E$ = "_panel_1hmja_2", I$ = "_line_1hmja_8", M$ = "_actions_1hmja_14", xt = {
  panel: E$,
  line: I$,
  actions: M$
};
function jA(e) {
  return /* @__PURE__ */ i("div", { className: xt.panel, children: [
    /* @__PURE__ */ n("p", { className: xt.line, children: e.status }),
    /* @__PURE__ */ n(q, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: xt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: xt.line, children: e.note ?? "" })
  ] });
}
const B$ = "_upload_13fcl_2", j$ = "_preview_13fcl_7", P$ = "_mark_13fcl_17", q$ = "_empty_13fcl_22", H$ = "_actions_13fcl_28", D$ = "_input_13fcl_33", O$ = "_reasons_13fcl_41", F$ = "_reason_13fcl_41", z$ = "_accepted_13fcl_57", le = {
  upload: B$,
  preview: j$,
  mark: P$,
  empty: q$,
  actions: H$,
  input: D$,
  reasons: O$,
  reason: F$,
  accepted: z$
}, Zr = 1.5, el = 22, Ut = "script elements or event handlers", De = "links or external references", Ae = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Zr}px at ${el}px`], W$ = [Ae[1], Ae[2], Ut, De], K$ = /* @__PURE__ */ new Map([
  ["image", Ae[1]],
  ["text", Ae[2]],
  ["tspan", Ae[2]],
  ["textPath", Ae[2]],
  ["script", Ut],
  ["foreignObject", Ut],
  ["a", De],
  ["use", De],
  ["style", De],
  ["feImage", De],
  ["set", De]
]), G$ = "http://www.w3.org/2000/svg", U$ = "http://www.w3.org/2000/xmlns/", V$ = /* @__PURE__ */ new Set([
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
]), Y$ = /* @__PURE__ */ new Set([
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
]), Wn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, J$ = /url\s*\(|['"\\]/i;
function X$() {
  return { ok: !1, reasons: [Ae[1]] };
}
function tl(e) {
  return e.namespaceURI === G$;
}
function Q$(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && tl(t) ? t : null;
  } catch {
    return null;
  }
}
function Z$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [Ae[0]] : [];
}
function e0(e) {
  return K$.get(e.localName) ?? (e.localName.startsWith("animate") ? De : void 0);
}
function t0(e) {
  return J$.test(e.replace(Wn, ""));
}
function n0(e) {
  return /^on/i.test(e.localName) ? Ut : e.localName === "href" || t0(e.value) ? De : void 0;
}
function a0(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(e0(a));
    for (const r of Array.from(a.attributes)) t.add(n0(r));
  }
  return W$.filter((a) => t.has(a));
}
function r0(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((l) => Number.isFinite(l) && l > 0), 0), r = a > 0 ? el / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const o = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(o) && o * r < Zr;
  }) ? [Ae[3]] : [];
}
function l0(e) {
  if (e.namespaceURI === U$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (Y$.has(t) || t.startsWith("stroke"));
}
function o0(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && tl(t) && V$.has(t.localName);
}
function i0(e, t) {
  o0(t) ? t.nodeType === Node.ELEMENT_NODE && nl(t) : e.removeChild(t);
}
function nl(e) {
  for (const t of Array.from(e.attributes)) l0(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) i0(e, t);
  return e;
}
function s0(e) {
  return Array.from(e.matchAll(Wn), (t) => t[2]).filter((t) => t !== "");
}
function c0(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function d0(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const o of s0(l.value)) a.has(o) || a.set(o, `${t}-${a.size}`);
  return a;
}
function u0(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(Wn, (r, l, o) => {
      const s = t.get(o);
      return s === void 0 ? r : r.replace(`#${o}`, `#${s}`);
    });
}
function h0(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = d0(a, t);
  for (const l of a) {
    const o = r.get(l.getAttribute("id") ?? "");
    o === void 0 ? l.removeAttribute("id") : l.setAttribute("id", o), u0(l, r);
  }
  return e;
}
function PA(e) {
  const t = Q$(e);
  if (t === null) return X$();
  const a = [...Z$(t), ...a0(t), ...r0(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(h0(nl(t), c0(e))) };
}
const m0 = "Mark accepted.", w0 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, _0 = new Set(Fa.flatMap((e) => [ye(e, "id"), ye(e, "chip")]));
function f0(e) {
  return e !== void 0 && (w0.test(e) || _0.has(e)) ? e : void 0;
}
function v0({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: le.preview, style: { "--mark": f0(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: le.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: le.empty }) });
}
function b0(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function p0(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function g0({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: le.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: le.result, role: "status", children: /* @__PURE__ */ n("p", { className: le.accepted, children: m0 }) }) : /* @__PURE__ */ n("div", { className: le.result, role: "status", children: /* @__PURE__ */ n("ul", { className: le.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: le.reason, children: t }, t)) }) });
}
function y0({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(g0, { result: e }) : /* @__PURE__ */ n("p", { className: `${le.result} ${b0(e, a)}`, role: "status", children: p0(e, a) });
}
function Ra(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function qA({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: l }) {
  const o = f(null), [s, c] = b(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ i("div", { className: le.upload, children: [
    /* @__PURE__ */ n(v0, { current: e }),
    /* @__PURE__ */ i("div", { className: le.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: o,
          className: le.input,
          type: "file",
          accept: "image/svg+xml",
          "aria-label": "Mark file",
          disabled: l !== void 0,
          onChange: (u) => {
            var h;
            return d((h = u.target.files) == null ? void 0 : h[0]);
          }
        }
      ),
      /* @__PURE__ */ n(v, { ...Ra(l), onClick: () => {
        var u;
        return (u = o.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(v, { ...Ra(l), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(y0, { result: s, presentation: r })
  ] });
}
const N0 = "_row_o3t6y_7", k0 = "_cell_o3t6y_11", $0 = "_head_o3t6y_28", C0 = "_name_o3t6y_34", S0 = "_pinned_o3t6y_42", R0 = "_headCell_o3t6y_49", x0 = "_webName_o3t6y_88", T0 = "_webMeta_o3t6y_95", L0 = "_webWarn_o3t6y_103", O = {
  row: N0,
  cell: k0,
  head: $0,
  name: C0,
  pinned: S0,
  headCell: R0,
  webName: x0,
  webMeta: T0,
  webWarn: L0
}, Kn = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, al = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], A0 = Object.fromEntries(al.map((e) => [e.key, e]));
function E0(e, t) {
  return `mcp.${e}.${t}`;
}
function I0(e) {
  return Object.keys(Kn).includes(e);
}
function M0(e) {
  return Kn[e !== void 0 && I0(e) ? e : "unknown"];
}
function ut({ column: e, children: t }) {
  const a = A0[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: O.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: t
    }
  );
}
function HA() {
  return /* @__PURE__ */ n("tr", { children: al.map((e) => /* @__PURE__ */ n(
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
function B0({ server: e }) {
  const t = Kn[e.connection];
  return /* @__PURE__ */ i("tr", { className: O.row, children: [
    /* @__PURE__ */ i(ut, { column: "name", children: [
      /* @__PURE__ */ i("span", { className: O.head, children: [
        /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: zn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ i("span", { className: O.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(ut, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(ut, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(ut, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(ut, { column: "tools", children: e.tools.map((a) => E0(e.name, a)).join(" · ") })
  ] });
}
function j0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function P0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function q0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${O.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e });
}
function H0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function D0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function O0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ i("tr", { className: O.row, children: [
    /* @__PURE__ */ i("td", { className: O.cell, children: [
      /* @__PURE__ */ n("span", { className: `${O.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: j0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta ward-truncate`, title: l.map((o) => o.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...P0(e) }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(q0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...M0(e.connection) }) }),
    /* @__PURE__ */ i("td", { className: O.cell, children: [
      /* @__PURE__ */ n(H0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(D0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function DA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(O0, { ...e }) : /* @__PURE__ */ n(B0, { ...e });
}
const F0 = "_row_1ibo7_2", z0 = "_headCell_1ibo7_14", W0 = "_cell_1ibo7_15", K0 = "_name_1ibo7_26", G0 = "_consequence_1ibo7_32", U0 = "_reason_1ibo7_38", V0 = "_value_1ibo7_44", Y0 = "_webRow_1ibo7_60", J0 = "_webSetting_1ibo7_73", X0 = "_webName_1ibo7_81", Q0 = "_webConsequence_1ibo7_89", Z0 = "_webControl_1ibo7_95", eC = "_webState_1ibo7_109", tC = "_webChip_1ibo7_114", P = {
  row: F0,
  headCell: z0,
  cell: W0,
  name: K0,
  consequence: G0,
  reason: U0,
  value: V0,
  webRow: Y0,
  webSetting: J0,
  webName: X0,
  webConsequence: Q0,
  webControl: Z0,
  webState: eC,
  webChip: tC
}, rl = 104, ll = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function nC({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Qe, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(br, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: P.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function aC({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = y(), o = ll[a], s = a === "locked";
  return /* @__PURE__ */ i("tr", { className: P.row, "data-inheritance": a, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: P.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(nC, { control: t, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: P.cell, style: { width: rl }, children: /* @__PURE__ */ n(m, { role: o.role, label: o.label }) })
  ] });
}
function ol(e, t) {
  return String(e ?? t);
}
function rC(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function lC(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? ol(e.value, "—");
}
function oC({ control: e, name: t, locked: a, describedBy: r, onChange: l }) {
  const o = e.value === !0;
  return /* @__PURE__ */ i("span", { className: P.webControl, children: [
    /* @__PURE__ */ n(Qe, { label: t, labelHidden: !0, checked: o, locked: a, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: P.webState, "aria-hidden": "true", children: a || o ? "on" : "off" })
  ] });
}
function iC(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(oC, { ...e });
  const l = rC(t, a);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: P.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(br, { options: l, value: ol(t.value, ""), onChange: (o) => r == null ? void 0 : r(o) }) }) : /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: lC(t) });
}
function sC({ setting: e, control: t, inheritance: a, reason: r, onChange: l, renderControl: o }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ i("div", { className: `${P.row} ${P.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ i("span", { className: P.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${P.name} ${P.webName}`, children: e.name }),
      /* @__PURE__ */ i("p", { id: s, className: `${P.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    o ? /* @__PURE__ */ n("span", { className: P.webControl, children: o(s) }) : /* @__PURE__ */ n(iC, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${P.webChip} ward-policy-chip`, style: { width: rl }, children: /* @__PURE__ */ n(m, { ...ll[a], size: "tag" }) })
  ] });
}
function OA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(sC, { ...e }) : /* @__PURE__ */ n(aC, { ...e });
}
const cC = "_label_h9m4w_7", dC = "_name_h9m4w_15", uC = "_column_h9m4w_24", hC = "_webFrame_h9m4w_57", mC = "_webHead_h9m4w_62", wC = "_webHeadLabel_h9m4w_74", _C = "_webLabel_h9m4w_117", fC = "_webColumns_h9m4w_124", vC = "_webGroup_h9m4w_130", bC = "_webPeople_h9m4w_131", pC = "_webVia_h9m4w_132", gC = "_webMeta_h9m4w_161", G = {
  label: cC,
  name: dC,
  column: uC,
  webFrame: hC,
  webHead: mC,
  webHeadLabel: wC,
  webLabel: _C,
  webColumns: fC,
  webGroup: vC,
  webPeople: bC,
  webVia: pC,
  webMeta: gC
}, yC = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, hn = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function mn({ column: e, children: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: G.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: t
    }
  );
}
function NC(e) {
  if (!e.matrixRole) return;
  const t = yC[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function kC({ node: e }) {
  const t = NC(e);
  return /* @__PURE__ */ i("span", { className: G.label, children: [
    /* @__PURE__ */ n("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ n($C, { role: t, node: e }),
    /* @__PURE__ */ n(mn, { column: hn[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(mn, { column: hn[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(mn, { column: hn[2], children: e.requestedVia ?? "" })
  ] });
}
function $C({ role: e, node: t }) {
  return /* @__PURE__ */ i(x, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function CC({ index: e, depth: t, node: a, expanded: r, leaf: l, onToggle: o, children: s }) {
  return /* @__PURE__ */ n(
    Cr,
    {
      index: e,
      depth: t,
      leaf: l,
      expanded: r,
      onToggle: o,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(kC, { node: a }),
      children: s
    }
  );
}
function wn({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function SC({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${G.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(wn, { className: `${G.webMeta} ${G.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(wn, { className: `${G.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(wn, { className: `${G.webMeta} ${G.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function RC() {
  return /* @__PURE__ */ i("div", { className: G.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: G.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ i("span", { className: G.webColumns, children: [
      /* @__PURE__ */ n("span", { className: G.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: G.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: G.webVia, children: "Requested via" })
    ] })
  ] });
}
function xC({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${G.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function TC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function LC({ rows: e, label: t }) {
  return /* @__PURE__ */ i("div", { className: G.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(RC, {}),
    /* @__PURE__ */ n(o_, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      Cr,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(xC, { row: a }),
        detail: /* @__PURE__ */ n(SC, { row: a }),
        expanded: TC(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function FA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(LC, { ...e }) : /* @__PURE__ */ n(CC, { ...e });
}
const AC = "_runbook_b9agc_2", EC = "_list_b9agc_7", IC = "_step_b9agc_15", MC = "_numeral_b9agc_21", BC = "_body_b9agc_28", jC = "_head_b9agc_34", PC = "_title_b9agc_40", qC = "_detail_b9agc_45", HC = "_actions_b9agc_50", DC = "_webList_b9agc_56", OC = "_webStep_b9agc_60", FC = "_webBody_b9agc_66", zC = "_webTitle_b9agc_74", WC = "_webDetail_b9agc_78", M = {
  runbook: AC,
  list: EC,
  step: IC,
  numeral: MC,
  body: BC,
  head: jC,
  title: PC,
  detail: qC,
  actions: HC,
  webList: DC,
  webStep: OC,
  webBody: FC,
  webTitle: zC,
  webDetail: WC
}, il = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function sl(e) {
  return String(e + 1).padStart(2, "0");
}
function KC({ step: e, index: t, connection: a }) {
  const r = il[e.state], l = e.state === "running";
  return /* @__PURE__ */ i("li", { className: M.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: M.numeral, children: sl(t) }),
    /* @__PURE__ */ i("span", { className: M.body, children: [
      /* @__PURE__ */ i("span", { className: M.head, children: [
        /* @__PURE__ */ n("span", { className: M.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n(Me, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ n("span", { className: M.detail, children: e.detail })
    ] })
  ] });
}
function GC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: M.list, children: e.map((r, l) => /* @__PURE__ */ n(KC, { step: r, index: l, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: M.actions, children: t })
  ] });
}
function UC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ i("li", { className: `${M.step} ${M.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${M.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: sl(t) }),
    /* @__PURE__ */ i("span", { className: `${M.body} ${M.webBody}`, children: [
      /* @__PURE__ */ i("span", { className: `${M.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${M.title} ${M.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...il[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Me, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${M.detail} ${M.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function VC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${M.list} ${M.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(UC, { step: r, index: l, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${M.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function zA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(VC, { ...e }) : /* @__PURE__ */ n(GC, { ...e });
}
const YC = "_list_1gu6a_2", JC = "_check_1gu6a_10", XC = "_body_1gu6a_16", QC = "_text_1gu6a_23", ZC = "_pending_1gu6a_32", eS = "_measured_1gu6a_37", rt = {
  list: YC,
  check: JC,
  body: XC,
  text: QC,
  pending: ZC,
  measured: eS
};
function tS(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function nS({ check: e }) {
  const t = tS(e.passed);
  return /* @__PURE__ */ i("li", { className: `${rt.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Pn, { state: t.state, label: t.label }),
    /* @__PURE__ */ i("span", { className: rt.body, children: [
      /* @__PURE__ */ n("span", { className: rt.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ i("span", { className: rt.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: rt.measured, children: e.measured })
  ] });
}
function WA({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${rt.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(nS, { check: t }, t.text)) });
}
const aS = "_root_y6bbq_2", rS = "_list_y6bbq_10", lS = "_line_y6bbq_32", oS = "_at_y6bbq_59", iS = "_text_y6bbq_63", sS = "_foot_y6bbq_67", cS = "_idle_y6bbq_79", dS = "_caret_y6bbq_87", uS = "_jump_y6bbq_94", be = {
  root: aS,
  list: rS,
  line: lS,
  at: oS,
  text: iS,
  foot: sS,
  idle: cS,
  caret: dS,
  jump: uS
}, hS = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Gn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : hS.format(new Date(e));
}
const mS = { warn: "warning", ok: "ok" };
function wS({ kind: e }) {
  const t = mS[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function _S({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Gn(e)}` });
}
function fS({ connection: e, idleSince: t, last: a, children: r }) {
  const l = [t, a == null ? void 0 : a.at, ""].find(Boolean), o = {
    stale: `no new events as of ${Gn(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ i("p", { className: `${be.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${be.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: be.idle, children: o }),
    /* @__PURE__ */ n(_S, { at: a == null ? void 0 : a.at }),
    r
  ] });
}
const vS = 8;
function bS(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > vS;
}
function pS({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${be.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const cl = ke(null);
function KA({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, l] = b(!1), o = ja(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(cl.Provider, { value: o, children: a });
}
function gS() {
  const e = Ne(cl), [t, a] = b(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const yS = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function GA({ lines: e, connection: t, idleSince: a, label: r = "Live activity", fixed: l }) {
  const o = f(null), [s, c] = b(0), [d, u] = gS(), [h, w] = b(!1), _ = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), ot(() => {
    const k = o.current;
    k && !h && (k.scrollTop = k.scrollHeight);
  }, [e.length, h]);
  const N = () => {
    var H;
    const k = o.current;
    if (!k) return;
    const E = k.querySelectorAll("[data-consline-text]");
    (H = E.item(E.length - 1)) == null || H.focus(), w(!1);
  };
  return /* @__PURE__ */ i("div", { className: be.root, children: [
    /* @__PURE__ */ n("ol", { className: be.list, ref: o, "aria-live": d ? "polite" : "off", "aria-label": r, ...yS(e.length, l), onScroll: (k) => w(bS(k.currentTarget)), children: e.map((k, E) => /* @__PURE__ */ i("li", { className: `${be.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": E < s, children: [
      /* @__PURE__ */ n("span", { className: be.at, children: Gn(k.at) }),
      /* @__PURE__ */ n(wS, { kind: k.kind }),
      /* @__PURE__ */ n("span", { className: be.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${E}`)) }),
    /* @__PURE__ */ i(fS, { connection: t, idleSince: a, last: _, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${be.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(pS, { shown: h, onJump: N })
    ] })
  ] });
}
const NS = "_row_1k8wl_2", kS = "_head_1k8wl_14", $S = "_author_1k8wl_20", CS = "_eta_1k8wl_25", SS = "_edited_1k8wl_26", RS = "_body_1k8wl_32", xS = "_reason_1k8wl_37", TS = "_actions_1k8wl_42", Se = {
  row: NS,
  head: kS,
  author: $S,
  eta: CS,
  edited: SS,
  body: RS,
  reason: xS,
  actions: TS
}, LS = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function AS(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function ES({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: l, onViewOriginal: o }) {
  return e.delivery === "queued" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: a, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: o, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function IS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Se.reason, id: t, children: e })
  ] });
}
function MS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function BS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(ES, { ...e }) : /* @__PURE__ */ n(IS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function UA(e) {
  const { comment: t } = e;
  MS(e);
  const a = y(), r = `${a}-unavailable`, l = LS[t.delivery];
  return /* @__PURE__ */ i("div", { className: `${Se.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ i("div", { className: Se.head, children: [
      /* @__PURE__ */ n("span", { className: Se.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: Se.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Se.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Se.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Se.reason, id: a, children: AS(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Se.actions, children: /* @__PURE__ */ n(BS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const jS = "_root_rvhdw_2", PS = "_attach_rvhdw_11", qS = "_actions_rvhdw_17", HS = "_reply_rvhdw_23", DS = "_replyField_rvhdw_28", OS = "_send_rvhdw_54", FS = "_sendIcon_rvhdw_65", zS = "_sendsAs_rvhdw_75", ze = {
  root: jS,
  attach: PS,
  actions: qS,
  reply: HS,
  replyField: DS,
  send: OS,
  sendIcon: FS,
  sendsAs: zS
};
function dl({ value: e, onChange: t }) {
  const [a, r] = b("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function WS() {
  return /* @__PURE__ */ n("svg", { className: ze.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function KS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function GS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [l, o] = dl(e), s = y(), c = () => {
    l.trim() !== "" && r(a, l);
  }, d = (u) => {
    KS(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ i("div", { className: ze.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ i("div", { className: ze.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ n(q, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: l, onChange: o, describedBy: s }),
      /* @__PURE__ */ i(v, { variant: "primary", className: ze.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ n(WS, {}),
        /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: ze.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function VA(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(GS, { ...e }) : /* @__PURE__ */ n(US, { ...e });
}
function US(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: l, onPost: o, onDraft: s } = e, [c, d] = dl(e);
  return /* @__PURE__ */ i("div", { className: ze.root, children: [
    /* @__PURE__ */ n(q, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ i("div", { className: ze.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ n(
      Xa,
      {
        label: `Requeue ${l.agent} after posting`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ i("div", { className: ze.actions, children: [
      /* @__PURE__ */ n(v, { variant: "primary", onClick: () => o(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(v, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const VS = "_list_1yhks_2", YS = "_item_1yhks_6", JS = "_body_1yhks_22", XS = "_text_1yhks_28", QS = "_evidence_1yhks_37", ZS = "_consequence_1yhks_49", e2 = "_note_1yhks_54", Xe = {
  list: VS,
  item: YS,
  body: JS,
  text: XS,
  evidence: QS,
  consequence: ZS,
  note: e2
};
function t2({ criterion: e }) {
  return /* @__PURE__ */ n(Ge, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function xa({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function n2(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function a2({ criterion: e }) {
  return /* @__PURE__ */ i("span", { className: Xe.body, children: [
    /* @__PURE__ */ n("span", { className: Xe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(xa, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Xe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(xa, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Xe.consequence, children: n2(e.why) })
    ] })
  ] });
}
function r2({ criterion: e }) {
  return /* @__PURE__ */ i("li", { className: Xe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(t2, { criterion: e }),
    /* @__PURE__ */ n(a2, { criterion: e })
  ] });
}
function YA({ criteria: e }) {
  return /* @__PURE__ */ i("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Xe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(r2, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ n("p", { className: Xe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const l2 = "_list_dwhoz_2", o2 = "_rung_dwhoz_6", i2 = "_name_dwhoz_18", s2 = "_actor_dwhoz_32", Pt = {
  list: l2,
  rung: o2,
  name: i2,
  actor: s2
}, c2 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function d2({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = c2[e.state];
  return /* @__PURE__ */ i("li", { className: Pt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: Pt.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${Pt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function JA({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Pt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(d2, { rung: t }, t.name)) });
}
const u2 = "_sheet_pw37w_2", h2 = "_title_pw37w_9", m2 = "_stage_pw37w_15", w2 = "_effects_pw37w_20", _2 = "_effect_pw37w_20", f2 = "_numeral_pw37w_31", v2 = "_effectText_pw37w_38", b2 = "_refusals_pw37w_43", p2 = "_reasons_pw37w_52", g2 = "_reason_pw37w_52", y2 = "_actions_pw37w_62", we = {
  sheet: u2,
  title: h2,
  stage: m2,
  effects: w2,
  effect: _2,
  numeral: f2,
  effectText: v2,
  refusals: b2,
  reasons: p2,
  reason: g2,
  actions: y2
};
function N2({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function XA({ run: e, effects: t, refusals: a, cost: r, onRequeue: l, onClose: o, returnFocusTo: s }) {
  const c = y(), d = `${c}-refusal`, [u, h] = b(""), w = a.length > 0;
  return /* @__PURE__ */ n(dt, { kind: "sheet", labelledBy: c, onClose: o, returnFocusTo: s, children: /* @__PURE__ */ i("div", { className: we.sheet, children: [
    /* @__PURE__ */ i("h2", { className: we.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: we.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: we.effects, children: t.map((_, N) => /* @__PURE__ */ i("li", { className: we.effect, children: [
      /* @__PURE__ */ n("span", { className: we.numeral, children: String(N + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: we.effectText, children: _ })
    ] }, _)) }),
    /* @__PURE__ */ n(
      Hm,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(q, { kind: "textarea", label: "Note for the agent", value: u, onChange: h }),
    w && /* @__PURE__ */ i("div", { className: we.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: we.reasons, children: a.map((_, N) => /* @__PURE__ */ n("li", { className: we.reason, id: N === 0 ? d : void 0, children: _.reason }, _.reason)) })
    ] }),
    /* @__PURE__ */ i("div", { className: we.actions, children: [
      /* @__PURE__ */ n(N2, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(v, { onClick: o, children: "Cancel" })
    ] })
  ] }) });
}
const k2 = "_list_1laeg_2", $2 = "_path_1laeg_7", C2 = "_head_1laeg_21", S2 = "_label_1laeg_28", R2 = "_consequence_1laeg_35", wt = {
  list: k2,
  path: $2,
  head: C2,
  label: S2,
  consequence: R2
}, $n = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Ta(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function La(e) {
  return e ? "primary" : "secondary";
}
function x2({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(v, { variant: La(t), size: "sm", onClick: () => a(e.kind), children: $n[e.kind] }) : /* @__PURE__ */ n(v, { variant: La(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: $n[e.kind] });
}
function T2({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ i("li", { className: wt.path, "data-allowed": e.allowed, "data-role": Ta(e.requiredRole), children: [
    /* @__PURE__ */ i("span", { className: wt.head, children: [
      /* @__PURE__ */ n("span", { className: wt.label, children: e.title ?? $n[e.kind] }),
      /* @__PURE__ */ n(m, { role: Ta(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: wt.consequence, children: e.consequence }),
    /* @__PURE__ */ n(x2, { path: e, primary: t, onChoose: a })
  ] });
}
function QA({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: wt.list, children: e.map((a, r) => /* @__PURE__ */ n(T2, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const L2 = "_list_1m7i0_2", A2 = "_item_1m7i0_6", E2 = "_node_1m7i0_18", I2 = "_body_1m7i0_24", M2 = "_head_1m7i0_30", B2 = "_stage_1m7i0_36", j2 = "_version_1m7i0_41", P2 = "_sentence_1m7i0_49", q2 = "_meta_1m7i0_54", xe = {
  list: L2,
  item: A2,
  node: E2,
  body: I2,
  head: M2,
  stage: B2,
  version: j2,
  sentence: P2,
  meta: q2
}, H2 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function D2({ entry: e }) {
  return /* @__PURE__ */ i("span", { className: xe.head, children: [
    /* @__PURE__ */ n("span", { className: xe.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: xe.version, title: e.version, children: e.version }) : null
  ] });
}
function O2({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ i("li", { className: `${xe.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${xe.node} ward-history-node`, children: /* @__PURE__ */ n(Ge, { size: 9, kind: H2[e.state], label: e.state }) }),
    /* @__PURE__ */ i("span", { className: `${xe.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(D2, { entry: e }),
      /* @__PURE__ */ n("span", { className: xe.sentence, children: e.sentence }),
      /* @__PURE__ */ i("span", { className: `${xe.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${oe(e.cost)}`
      ] })
    ] })
  ] });
}
function ZA({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${xe.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(O2, { entry: t }, t.stage + String(a))) });
}
const F2 = "_thread_1e70p_3", z2 = "_turn_1e70p_8", W2 = "_who_1e70p_27", K2 = "_body_1e70p_32", qt = {
  thread: F2,
  turn: z2,
  who: W2,
  body: K2
}, ul = ke(!1);
function e3({ children: e, density: t }) {
  return /* @__PURE__ */ n(ul.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${qt.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function t3({ turn: e }) {
  if (!Ne(ul)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ i("li", { className: `${qt.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ i("span", { className: `${qt.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${qt.body} ward-chat-body`, children: e.body })
  ] });
}
const G2 = "_list_yiolt_3", U2 = "_row_yiolt_7", V2 = "_label_yiolt_20", Y2 = "_n_yiolt_26", J2 = "_cause_yiolt_33", vt = {
  list: G2,
  row: U2,
  label: V2,
  n: Y2,
  cause: J2
};
function X2(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Q2 = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function Z2({ row: e, formatNumber: t }) {
  return X2(e), /* @__PURE__ */ i("li", { className: `${vt.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ge, { size: 8, ...Q2[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: vt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${vt.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(eR, { cause: e.cause })
  ] });
}
function eR({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${vt.cause} ward-healthrow-cause`, children: e }) : null;
}
function n3({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${vt.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Z2, { row: a, formatNumber: t }, a.label)) });
}
const tR = "_root_1jxwp_2", nR = {
  root: tR
};
function a3({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ i("div", { className: nR.root, "data-density": l, children: [
    /* @__PURE__ */ n(an, { items: e, note: t, density: l }),
    /* @__PURE__ */ n(v, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const aR = "_row_dhbre_3", rR = "_key_dhbre_13", lR = "_stack_dhbre_24", oR = "_value_dhbre_32", iR = "_evidence_dhbre_39", sR = "_mark_dhbre_47", nt = {
  row: aR,
  key: rR,
  stack: lR,
  value: oR,
  evidence: iR,
  mark: sR
};
function cR({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(Pn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function r3({ field: e }) {
  return /* @__PURE__ */ i("li", { className: `${nt.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${nt.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ i("span", { className: `${nt.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${nt.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${nt.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${nt.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(cR, { state: e.state }) })
  ] });
}
const dR = "_cell_gh2sd_2", uR = {
  cell: dR
}, hR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function mR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function wR(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function _R(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: mR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function fR(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function l3({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  wR(e, a);
  const r = fR(e);
  return /* @__PURE__ */ n(
    Zm,
    {
      label: "Rejection routing",
      columns: hR,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, o) => /* @__PURE__ */ n("span", { className: uR.cell, "data-norerun": l.noRerun ? !0 : void 0, children: _R(l, o) }),
      empty: t ?? /* @__PURE__ */ n(G_, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const vR = "_row_1f2re_2", bR = "_title_1f2re_12", pR = "_turns_1f2re_18", gR = "_waiting_1f2re_19", yR = "_resolved_1f2re_20", NR = "_activity_1f2re_21", kR = "_cost_1f2re_28", $R = "_link_1f2re_29", CR = "_tableLink_1f2re_47", SR = "_tableRecord_1f2re_48", RR = "_tableRow_1f2re_59", xR = "_tableTitle_1f2re_71", TR = "_tableResolved_1f2re_76", LR = "_tableMeta_1f2re_87", AR = "_tableCost_1f2re_94", ER = "_tableActivity_1f2re_95", IR = "_tableState_1f2re_105", z = {
  row: vR,
  title: bR,
  turns: pR,
  waiting: gR,
  resolved: yR,
  activity: NR,
  cost: kR,
  link: $R,
  tableLink: CR,
  tableRecord: SR,
  tableRow: RR,
  tableTitle: xR,
  tableResolved: TR,
  tableMeta: LR,
  tableCost: AR,
  tableActivity: ER,
  tableState: IR
}, hl = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function MR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function BR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function jR(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const PR = { duplicate: "Closed · duplicate" };
function qR({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(it, { className: z.tableMeta, text: `waiting on ${e}` });
}
function HR({ value: e }) {
  return /* @__PURE__ */ n("td", { className: z.tableCost, children: e === void 0 ? null : oe(e) });
}
function DR({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${z.tableRecord} ward-target`, href: T(e.href), children: `→ ${e.key}` });
}
function OR({ session: e, href: t }) {
  const a = hl[e.state];
  return /* @__PURE__ */ i("tr", { className: z.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ i("td", { className: z.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${z.tableLink} ward-target`, href: T(t), children: /* @__PURE__ */ n(it, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: z.tableMeta, children: BR(e) })
    ] }),
    /* @__PURE__ */ i("td", { className: z.tableResolved, children: [
      jR(e.resolved),
      /* @__PURE__ */ n(qR, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(HR, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: z.tableActivity, children: MR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: z.tableState, children: /* @__PURE__ */ i("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: PR[e.state] ?? a.label }),
      /* @__PURE__ */ n(DR, { link: e.link })
    ] }) })
  ] });
}
function FR({ session: e }) {
  const t = hl[e.state];
  return /* @__PURE__ */ i("div", { className: z.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(it, { className: z.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: z.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(it, { className: z.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: z.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: z.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : oe(e.cost) }),
    /* @__PURE__ */ n("span", { className: z.activity, children: he(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: z.link, href: T(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function o3(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(OR, { session: e.session, href: e.href }) : /* @__PURE__ */ n(FR, { session: e.session });
}
const zR = "_block_1yy2v_3", WR = "_list_1yy2v_9", KR = "_line_1yy2v_14", Cn = {
  block: zR,
  list: WR,
  line: KR
}, GR = { warn: "warning", ok: "ok" };
function UR({ kind: e }) {
  const t = GR[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function VR({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ i("li", { className: `${Cn.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(UR, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function i3({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Cn.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Cn.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(VR, { line: a }, `${r}-${a.text}`)) }) });
}
const YR = "_band_tt7hp_1", JR = "_head_tt7hp_8", XR = "_cell_tt7hp_19", QR = "_index_tt7hp_35", ZR = "_title_tt7hp_42", ex = "_note_tt7hp_48", tx = "_cellTitle_tt7hp_53", nx = "_cellBody_tt7hp_58", ax = "_tag_tt7hp_64", Ce = {
  band: YR,
  head: JR,
  cell: XR,
  index: QR,
  title: ZR,
  note: ex,
  cellTitle: tx,
  cellBody: nx,
  tag: ax
}, Aa = 4;
function s3({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== Aa)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Aa}-cell grid`);
  return /* @__PURE__ */ i("section", { className: Ce.band, "aria-label": `${e} ${t}`, children: [
    /* @__PURE__ */ i("div", { className: Ce.head, children: [
      /* @__PURE__ */ n("span", { className: Ce.index, children: e }),
      /* @__PURE__ */ n("span", { className: Ce.title, children: t }),
      /* @__PURE__ */ n("span", { className: Ce.note, children: a })
    ] }),
    r.map((l) => /* @__PURE__ */ i("div", { className: Ce.cell, children: [
      /* @__PURE__ */ n("span", { className: Ce.cellTitle, children: l.title }),
      /* @__PURE__ */ n("span", { className: Ce.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ n("span", { className: Ce.tag, children: l.tag })
    ] }, l.title))
  ] });
}
const rx = "_tag_1yuvz_2", lx = "_link_1yuvz_14", _n = {
  tag: rx,
  link: lx
};
function ml({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: _n.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${_n.tag} ${_n.link}`, href: T(t), children: e });
}
const ox = "_eyebrow_m8swv_2", ix = "_link_m8swv_10", Ea = {
  eyebrow: ox,
  link: ix
};
function rn({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: Ea.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${Ea.link} ward-target`, href: T(t), children: e }) });
}
const sx = "_figure_qz9i7_2", cx = "_media_qz9i7_9", dx = "_caption_qz9i7_35", fn = {
  figure: sx,
  media: cx,
  caption: dx
};
function ux(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(x, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function Sn(e) {
  return /* @__PURE__ */ i("figure", { className: fn.figure, children: [
    /* @__PURE__ */ n("div", { className: fn.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(ux, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: fn.caption, children: e.caption })
  ] });
}
function kt(e) {
  return `h${e}`;
}
function hx(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const mx = "_prose_1fxb9_2", wx = "_anchor_1fxb9_79", wl = {
  prose: mx,
  anchor: wx
};
function Rn({ children: e }) {
  return /* @__PURE__ */ n("div", { className: wl.prose, children: e });
}
function c3({ level: e, children: t, id: a }) {
  const r = kt(e), l = a ?? hx(t);
  return /* @__PURE__ */ i(r, { id: l, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${wl.anchor} ward-target`, href: `#${l}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const _x = "_list_176jq_2", fx = "_pair_176jq_8", vx = "_term_176jq_14", bx = "_value_176jq_19", Tt = {
  list: _x,
  pair: fx,
  term: vx,
  value: bx
};
function px({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: Tt.list, children: e.map((t) => /* @__PURE__ */ i("div", { className: Tt.pair, children: [
    /* @__PURE__ */ n("dt", { className: Tt.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: Tt.value, children: t.value })
  ] }, t.term)) });
}
const gx = "_nav_sgeyg_2", yx = "_item_sgeyg_6", Nx = "_link_sgeyg_13", kx = "_note_sgeyg_30", Lt = {
  nav: gx,
  item: yx,
  link: Nx,
  note: kx
};
function $x({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: Lt.nav, children: /* @__PURE__ */ n(nw, { children: t.map((a) => /* @__PURE__ */ i("li", { className: Lt.item, children: [
    /* @__PURE__ */ n("a", { className: `${Lt.link} ward-target`, href: T(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: Lt.note, children: a.note })
  ] }, a.href)) }) });
}
const Cx = "_header_kelio_2", Sx = "_skip_kelio_14", Rx = "_brand_kelio_39", xx = "_list_kelio_46", Tx = "_link_kelio_56", at = {
  header: Cx,
  skip: Sx,
  brand: Rx,
  list: xx,
  link: Tx
};
function d3({ brand: e, links: t, current: a, homeHref: r = "/", mainId: l = "main", skipLabel: o = "Skip to content" }) {
  return /* @__PURE__ */ i("header", { className: at.header, children: [
    /* @__PURE__ */ n("a", { className: at.skip, href: `#${l}`, children: o }),
    /* @__PURE__ */ n("a", { className: `${at.brand} ward-target`, href: T(r), children: e }),
    /* @__PURE__ */ n("nav", { "aria-label": "Main", className: at.nav, children: /* @__PURE__ */ n("ul", { className: at.list, role: "list", children: t.map((s) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${at.link} ward-target`, href: T(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const Lx = "_footer_1jb5e_2", Ax = "_note_1jb5e_12", Ex = "_list_1jb5e_18", Ix = "_link_1jb5e_27", At = {
  footer: Lx,
  note: Ax,
  list: Ex,
  link: Ix
};
function u3({ note: e, links: t = [], label: a = "Footer" }) {
  return /* @__PURE__ */ i("footer", { className: At.footer, children: [
    /* @__PURE__ */ n("p", { className: At.note, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("nav", { "aria-label": a, children: /* @__PURE__ */ n("ul", { className: At.list, role: "list", children: t.map((r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${At.link} ward-target`, href: T(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const Mx = "_intro_13128_2", Bx = "_title_13128_9", jx = "_lead_13128_17", vn = {
  intro: Mx,
  title: Bx,
  lead: jx
};
function Un({ title: e, eyebrow: t, eyebrowHref: a, lead: r, headingLevel: l = 1, children: o }) {
  const s = kt(l);
  return /* @__PURE__ */ i("header", { className: vn.intro, children: [
    t === void 0 ? null : /* @__PURE__ */ n(rn, { href: a, children: t }),
    /* @__PURE__ */ n(s, { className: vn.title, children: e }),
    r === void 0 ? null : /* @__PURE__ */ n("p", { className: vn.lead, children: r }),
    o
  ] });
}
const Px = "_section_u0k7p_2", qx = "_head_u0k7p_13", Hx = "_titles_u0k7p_21", Dx = "_title_u0k7p_21", Ox = "_link_u0k7p_34", _t = {
  section: Px,
  head: qx,
  titles: Hx,
  title: Dx,
  link: Ox
};
function Fx({ title: e, headingId: t, eyebrow: a, link: r, headingLevel: l }) {
  const o = kt(l);
  return /* @__PURE__ */ i("div", { className: _t.head, children: [
    /* @__PURE__ */ i("div", { className: _t.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ n(rn, { children: a }),
      /* @__PURE__ */ n(o, { className: _t.title, id: t, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ n("a", { className: `${_t.link} ward-target`, href: T(r.href), children: r.label })
  ] });
}
function h3({ title: e, children: t, id: a, eyebrow: r, link: l, headingLevel: o = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ i("section", { className: _t.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ n(Fx, { title: e, headingId: d, eyebrow: r, link: l, headingLevel: o }),
    t
  ] });
}
const zx = "_split_1ycaa_2", Wx = "_main_1ycaa_10", Kx = "_aside_1ycaa_15", bn = {
  split: zx,
  main: Wx,
  aside: Kx
};
function Gx({ children: e, aside: t, asideLabel: a }) {
  return /* @__PURE__ */ i("div", { className: bn.split, children: [
    /* @__PURE__ */ n("div", { className: bn.main, children: e }),
    /* @__PURE__ */ n("aside", { className: bn.aside, "aria-label": a, children: t })
  ] });
}
const Ux = "_hero_ehbct_2", Vx = "_text_ehbct_11", Yx = "_visual_ehbct_23", Jx = "_title_ehbct_28", Xx = "_lead_ehbct_36", Qx = "_actions_ehbct_42", Zx = "_action_ehbct_42", eT = "_primary_ehbct_63", tT = "_secondary_ehbct_72", Ee = {
  hero: Ux,
  text: Vx,
  visual: Yx,
  title: Jx,
  lead: Xx,
  actions: Qx,
  action: Zx,
  primary: eT,
  secondary: tT
};
function nT({ actions: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ n("div", { className: Ee.actions, children: e.map((t, a) => /* @__PURE__ */ n("a", { className: `${Ee.action} ${a === 0 ? Ee.primary : Ee.secondary}`, href: T(t.href), children: t.label }, `${t.href}-${t.label}`)) });
}
function aT({ title: e, eyebrow: t, lead: a, actions: r = [] }) {
  return /* @__PURE__ */ i("div", { className: Ee.text, children: [
    t === void 0 ? null : /* @__PURE__ */ n(rn, { children: t }),
    /* @__PURE__ */ n("h1", { className: Ee.title, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("p", { className: Ee.lead, children: a }),
    /* @__PURE__ */ n(nT, { actions: r })
  ] });
}
function m3({ visual: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: Ee.hero, "data-visual": e === void 0 ? "none" : "beside", children: [
    /* @__PURE__ */ n(aT, { ...t }),
    e === void 0 ? null : /* @__PURE__ */ n("div", { className: Ee.visual, children: e })
  ] });
}
const rT = "_chain_w2k2l_2", lT = "_step_w2k2l_12", oT = "_arrow_w2k2l_19", iT = "_box_w2k2l_24", Et = {
  chain: rT,
  step: lT,
  arrow: oT,
  box: iT
};
function w3({ steps: e, label: t, animate: a }) {
  return /* @__PURE__ */ n("ol", { className: Et.chain, "aria-label": t, "data-ward-animate": a ?? "", children: e.map((r, l) => /* @__PURE__ */ i("li", { className: Et.step, style: { "--ward-step": l }, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: Et.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n("span", { className: Et.box, children: r })
  ] }, l)) });
}
const sT = "_card_1u2gr_2", cT = "_featured_1u2gr_20", dT = "_media_1u2gr_28", uT = "_body_1u2gr_32", hT = "_title_1u2gr_48", mT = "_link_1u2gr_60", wT = "_summary_1u2gr_78", _T = "_tags_1u2gr_84", fT = "_cta_1u2gr_90", fe = {
  card: sT,
  featured: cT,
  media: dT,
  body: uT,
  title: hT,
  link: mT,
  summary: wT,
  tags: _T,
  cta: fT
};
function _l({ media: e, ratio: t = "16/9" }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: fe.media, children: /* @__PURE__ */ n(Sn, { ratio: t, children: e }) });
}
function vT({ href: e, title: t, headingLevel: a = 3 }) {
  const r = kt(a);
  return /* @__PURE__ */ n(r, { className: fe.title, children: /* @__PURE__ */ n("a", { className: fe.link, href: T(e), children: t }) });
}
function fl({ eyebrow: e, ...t }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ n(rn, { children: e }),
    /* @__PURE__ */ n(vT, { ...t })
  ] });
}
function vl({ summary: e, tags: t = [] }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.summary, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("span", { className: fe.tags, children: t.map((a) => /* @__PURE__ */ n(ml, { label: a }, a)) })
  ] });
}
function _3({ media: e, ratio: t, eyebrow: a, summary: r, tags: l, ...o }) {
  return /* @__PURE__ */ i("article", { className: fe.card, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(_l, { media: e, ratio: t }),
    /* @__PURE__ */ i("div", { className: fe.body, children: [
      /* @__PURE__ */ n(fl, { eyebrow: a, ...o }),
      /* @__PURE__ */ n(vl, { summary: r, tags: l })
    ] })
  ] });
}
function f3({ media: e, ratio: t, eyebrow: a, summary: r, tags: l, cta: o, ...s }) {
  return /* @__PURE__ */ i("article", { className: `${fe.card} ${fe.featured}`, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(_l, { media: e, ratio: t }),
    /* @__PURE__ */ i("div", { className: fe.body, children: [
      /* @__PURE__ */ n(fl, { eyebrow: a, ...s }),
      /* @__PURE__ */ n(vl, { summary: r, tags: l }),
      o === void 0 ? null : /* @__PURE__ */ i("span", { className: fe.cta, "aria-hidden": "true", children: [
        o,
        " →"
      ] })
    ] })
  ] });
}
const bT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function bl(e) {
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : `${t.getUTCDate()} ${bT[t.getUTCMonth()]} ${t.getUTCFullYear()}`;
}
const pT = "_row_1peme_2", gT = "_title_1peme_15", yT = "_link_1peme_23", NT = "_meta_1peme_40", kT = "_summary_1peme_46", ht = {
  row: pT,
  title: gT,
  link: yT,
  meta: NT,
  summary: kT
};
function v3({ href: e, title: t, date: a, meta: r, summary: l, headingLevel: o = 3 }) {
  const s = kt(o);
  return /* @__PURE__ */ i("article", { className: ht.row, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(s, { className: ht.title, children: /* @__PURE__ */ n("a", { className: ht.link, href: T(e), children: t }) }),
    /* @__PURE__ */ i("p", { className: ht.meta, children: [
      /* @__PURE__ */ n("time", { dateTime: a, children: bl(a) }),
      r === void 0 ? null : ` · ${r}`
    ] }),
    l === void 0 ? null : /* @__PURE__ */ n("p", { className: ht.summary, children: l })
  ] });
}
const $T = "_list_dd8kj_2", CT = "_item_dd8kj_16", Ia = {
  list: $T,
  item: CT
};
function b3({ children: e, rules: t = !1, label: a }) {
  return /* @__PURE__ */ n("ul", { className: Ia.list, role: "list", "aria-label": a, "data-rules": t, children: qa.toArray(e).map((r, l) => /* @__PURE__ */ n("li", { className: Ia.item, children: r }, l)) });
}
const ST = "_page_i3r2z_2", RT = "_aside_i3r2z_8", xT = "_tags_i3r2z_13", Vn = {
  page: ST,
  aside: RT,
  tags: xT
};
function TT({ labels: e }) {
  return /* @__PURE__ */ n("span", { className: Vn.tags, children: e.map((t) => /* @__PURE__ */ n(ml, { label: t }, t)) });
}
function LT(e) {
  return e[1] !== void 0 && e[1].length > 0;
}
function AT(e) {
  return e.filter(LT).map(([t, a]) => ({
    term: t,
    value: typeof a == "string" ? a : /* @__PURE__ */ n(TT, { labels: a })
  }));
}
function ET({ facts: e, links: t, linksLabel: a }) {
  return /* @__PURE__ */ i("div", { className: Vn.aside, children: [
    e.length === 0 ? null : /* @__PURE__ */ n(px, { facts: e }),
    t === void 0 || t.length === 0 ? null : /* @__PURE__ */ n($x, { label: a, links: t })
  ] });
}
function pl({ facts: e, links: t = [], linksLabel: a, asideLabel: r, children: l }) {
  return e.length === 0 && t.length === 0 ? /* @__PURE__ */ n(Rn, { children: l }) : /* @__PURE__ */ n(Gx, { asideLabel: r, aside: /* @__PURE__ */ n(ET, { facts: e, links: t, linksLabel: a }), children: /* @__PURE__ */ n(Rn, { children: l }) });
}
function p3({ title: e, summary: t, children: a, eyebrow: r, eyebrowHref: l, role: o, period: s, focus: c, stack: d, related: u }) {
  const h = AT([
    ["Role", o],
    ["Period", s],
    ["Focus", c],
    ["Stack", d]
  ]);
  return /* @__PURE__ */ i("article", { className: Vn.page, children: [
    /* @__PURE__ */ n(Un, { title: e, lead: t, eyebrow: r, eyebrowHref: l }),
    /* @__PURE__ */ n(pl, { facts: h, links: u, linksLabel: "Related", asideLabel: "Case study facts", children: a })
  ] });
}
const IT = "_page_1junb_2", MT = "_source_1junb_8", BT = "_shots_1junb_30", xn = {
  page: IT,
  source: MT,
  shots: BT
};
function jT({ shots: e, ratio: t }) {
  return e.length === 0 ? null : e.length === 1 ? /* @__PURE__ */ n(Sn, { ...e[0], ratio: t }) : /* @__PURE__ */ n("ul", { className: xn.shots, role: "list", "aria-label": "Screenshots", children: e.map((a, r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(Sn, { ...a, ratio: t }) }, r)) });
}
function g3(e) {
  const { title: t, summary: a, children: r, source: l, facts: o = [], screenshots: s = [], ratio: c = "16/9" } = e;
  return /* @__PURE__ */ i("article", { className: xn.page, children: [
    /* @__PURE__ */ n(Un, { title: t, lead: a, eyebrow: e.eyebrow, eyebrowHref: e.eyebrowHref, children: /* @__PURE__ */ n("a", { className: xn.source, href: T(l.href), children: l.label }) }),
    /* @__PURE__ */ n(jT, { shots: s, ratio: c }),
    /* @__PURE__ */ n(pl, { facts: o, linksLabel: "Links", asideLabel: "Project facts", children: r })
  ] });
}
function PT(e) {
  const t = [], a = [];
  for (const r of e) {
    const l = { ...r, children: [] };
    for (; a.length > 0 && a[a.length - 1].level >= r.level; ) a.pop();
    const o = a[a.length - 1];
    (o === void 0 ? t : o.children).push(l), a.push(l);
  }
  return t;
}
const qT = "_article_drsu4_2", HT = "_meta_drsu4_8", DT = "_tldr_drsu4_14", OT = "_tldrLabel_drsu4_21", FT = "_tldrText_drsu4_27", zT = "_toc_drsu4_40", WT = "_tocTitle_drsu4_44", KT = "_tocList_drsu4_50", GT = "_tocLink_drsu4_65", Ie = {
  article: qT,
  meta: HT,
  tldr: DT,
  tldrLabel: OT,
  tldrText: FT,
  toc: zT,
  tocTitle: WT,
  tocList: KT,
  tocLink: GT
};
function UT({ date: e, minutes: t }) {
  return /* @__PURE__ */ i("p", { className: Ie.meta, children: [
    /* @__PURE__ */ n("time", { dateTime: e, children: bl(e) }),
    t === void 0 ? null : ` · ${t} min read`
  ] });
}
function VT({ children: e }) {
  return /* @__PURE__ */ i("div", { className: Ie.tldr, role: "note", "aria-label": "TL;DR", children: [
    /* @__PURE__ */ n("p", { className: Ie.tldrLabel, children: "TL;DR" }),
    /* @__PURE__ */ n("div", { className: Ie.tldrText, children: e })
  ] });
}
function gl({ nodes: e }) {
  return /* @__PURE__ */ n("ol", { className: Ie.tocList, role: "list", children: e.map((t) => /* @__PURE__ */ i("li", { children: [
    /* @__PURE__ */ n("a", { className: `${Ie.tocLink} ward-target`, href: `#${t.id}`, children: t.text }),
    t.children.length === 0 ? null : /* @__PURE__ */ n(gl, { nodes: t.children })
  ] }, t.id)) });
}
function YT({ headings: e }) {
  const t = y();
  return e.length === 0 ? null : /* @__PURE__ */ i("nav", { className: Ie.toc, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h2", { className: Ie.tocTitle, id: t, children: "On this page" }),
    /* @__PURE__ */ n(gl, { nodes: PT(e) })
  ] });
}
function y3({ title: e, date: t, children: a, minutes: r, tldr: l, headings: o = [], eyebrow: s, eyebrowHref: c }) {
  return /* @__PURE__ */ i("article", { className: Ie.article, children: [
    /* @__PURE__ */ n(Un, { title: e, eyebrow: s, eyebrowHref: c, children: /* @__PURE__ */ n(UT, { date: t, minutes: r }) }),
    l === void 0 ? null : /* @__PURE__ */ n(VT, { children: l }),
    /* @__PURE__ */ n(YT, { headings: o }),
    /* @__PURE__ */ n(Rn, { children: a })
  ] });
}
const JT = 220;
function XT(e) {
  return e.replace(/<[^>]*>/g, " ").split(/\s+/).filter((a) => /[\p{L}\p{N}]/u.test(a)).length;
}
function N3(e) {
  return Math.max(1, Math.ceil(XT(e) / JT));
}
const Vt = { w: 184, h: 96 }, st = { w: 152, h: 48 }, Yt = 16, It = (e) => Math.round(e * 10) / 10;
function yl(e) {
  return { x: Yt + e.col * Vt.w, y: Yt + e.row * Vt.h, w: st.w, h: st.h };
}
function QT(e) {
  const t = Math.max(0, ...e.map((r) => r.col)), a = Math.max(0, ...e.map((r) => r.row));
  return { w: 2 * Yt + t * Vt.w + st.w, h: 2 * Yt + a * Vt.h + st.h };
}
function Ma(e, t, a) {
  return Math.min(e.w / 2 / Math.abs(t), e.h / 2 / Math.abs(a));
}
function ZT(e, t) {
  const a = e.x + e.w / 2, r = e.y + e.h / 2, l = t.x + t.w / 2 - a, o = t.y + t.h / 2 - r, s = Ma(e, l, o), c = 1 - Ma(t, l, o);
  return { x1: It(a + l * s), y1: It(r + o * s), x2: It(a + l * c), y2: It(r + o * c) };
}
function eL() {
  const [e, t] = b(!1);
  return S(() => {
    var l;
    const a = (l = window.matchMedia) == null ? void 0 : l.call(window, "(prefers-reduced-motion: no-preference)");
    if (!a) return;
    const r = (o) => t(o.matches);
    return t(a.matches), a.addEventListener("change", r), () => a.removeEventListener("change", r);
  }, []), e;
}
const tL = "_diagram_76e4t_2", nL = "_label_76e4t_9", aL = "_svg_76e4t_14", rL = "_node_76e4t_20", lL = "_edge_76e4t_33", oL = "_arrow_76e4t_38", iL = "_controls_76e4t_63", sL = "_live_76e4t_70", cL = "_steps_76e4t_77", Te = {
  diagram: tL,
  label: nL,
  svg: aL,
  node: rL,
  edge: lL,
  arrow: oL,
  controls: iL,
  live: sL,
  steps: cL
};
function dL({ nodes: e, edges: t, lit: a, marker: r }) {
  const l = new Map(e.map((o) => [o.id, yl(o)]));
  return t.map((o) => {
    const s = l.get(o.from), c = l.get(o.to);
    if (s === void 0 || c === void 0) return null;
    const d = a(o.from) && a(o.to);
    return /* @__PURE__ */ n("line", { className: Te.edge, "data-active": d, ...ZT(s, c), markerEnd: `url(#${r})` }, `${o.from}>${o.to}`);
  });
}
function uL({ nodes: e, lit: t }) {
  return e.map((a) => {
    const r = yl(a);
    return /* @__PURE__ */ i("g", { className: Te.node, "data-active": t(a.id), "data-node": a.id, children: [
      /* @__PURE__ */ n("rect", { x: r.x, y: r.y, width: r.w, height: r.h, rx: "8" }),
      /* @__PURE__ */ n("text", { x: r.x + st.w / 2, y: r.y + st.h / 2, children: a.label })
    ] }, a.id);
  });
}
function Ba({ label: e, to: t, count: a, go: r, status: l }) {
  return t < 0 || t >= a ? /* @__PURE__ */ n(v, { size: "sm", disabled: !0, describedBy: l, children: e }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => r(t), children: e });
}
function hL({ at: e, count: t, text: a, go: r }) {
  const l = y();
  return /* @__PURE__ */ i("div", { className: Te.controls, children: [
    /* @__PURE__ */ n(Ba, { label: "Back", to: e - 1, count: t, go: r, status: l }),
    /* @__PURE__ */ n(Ba, { label: "Next", to: e + 1, count: t, go: r, status: l }),
    /* @__PURE__ */ n("p", { className: Te.live, id: l, "aria-live": "polite", children: `Step ${e + 1} of ${t}: ${a}` })
  ] });
}
function k3({ label: e, nodes: t, edges: a, steps: r }) {
  const l = eL() && r.length > 0, [o, s] = b(0), c = y(), d = (h) => l && r[o].nodes.includes(h), u = QT(t);
  return /* @__PURE__ */ i("figure", { className: Te.diagram, "data-live": l, "aria-labelledby": c, children: [
    /* @__PURE__ */ n("figcaption", { className: Te.label, id: c, children: e }),
    /* @__PURE__ */ i("svg", { className: Te.svg, viewBox: `0 0 ${u.w} ${u.h}`, width: u.w, height: u.h, "aria-hidden": "true", children: [
      /* @__PURE__ */ n("defs", { children: /* @__PURE__ */ n("marker", { id: `${c}-arrow`, viewBox: "0 0 8 8", refX: "7", refY: "4", markerWidth: "8", markerHeight: "8", markerUnits: "userSpaceOnUse", orient: "auto-start-reverse", children: /* @__PURE__ */ n("path", { className: Te.arrow, d: "M0 0 L8 4 L0 8 z" }) }) }),
      /* @__PURE__ */ n(dL, { nodes: t, edges: a, lit: d, marker: `${c}-arrow` }),
      /* @__PURE__ */ n(uL, { nodes: t, lit: d })
    ] }),
    l ? /* @__PURE__ */ n(hL, { at: o, count: r.length, text: r[o].text, go: s }) : null,
    /* @__PURE__ */ n("ol", { className: Te.steps, children: r.map((h, w) => /* @__PURE__ */ n("li", { "aria-current": l && w === o ? "step" : void 0, children: h.text }, w)) })
  ] });
}
export {
  kL as ACCENT_PRESETS,
  GL as ActionStack,
  GA as ActivityConsole,
  AL as AdminIcon,
  hp as AgentCard,
  k3 as AnimatedDiagram,
  IL as AppShell,
  LA as AppearanceStrip,
  y3 as Article,
  s3 as Band,
  WL as BarChart,
  xf as BoardColumn,
  cA as BoardFootnote,
  dA as BoardHeader,
  TL as BoardIcon,
  eA as BoardScroller,
  v as Btn,
  NL as CHIP_ROLES,
  Xr as CREDENTIAL_COLUMNS,
  zL as Callout,
  AA as CapabilityRow,
  nA as CardGrid,
  p3 as CaseStudy,
  t3 as ChatMessage,
  Xa as Checkbox,
  m as Chip,
  it as ClampText,
  UA as ClarificationRow,
  gA as ClauseRuleRow,
  pA as ClauseRules,
  Ar as ColourLadder,
  EA as ComponentRow,
  VA as Composer,
  hA as ConfigRow,
  uA as ConfigRowHead,
  qn as ConnectionMark,
  KA as ConsoleAnnounceProvider,
  e3 as Conversation,
  Hm as CostMeter,
  MA as CredentialRow,
  IA as CredentialRowHead,
  YA as CriteriaList,
  sc as Crumb,
  $L as DENSITIES,
  n3 as DeliveryHealth,
  rA as DeniedState,
  RL as DisabledScope,
  NA as DryRunRail,
  G_ as EmptyState,
  BA as EnvCard,
  rn as Eyebrow,
  px as FactList,
  f3 as FeaturedCard,
  q as Field,
  Sn as Figure,
  aA as FilteredEmpty,
  w3 as FlowChain,
  ML as FoldText,
  QL as FormStack,
  an as GateChecklist,
  JA as GateLadder,
  Zm as Grid,
  $A as HandoffRuleRow,
  kA as HandoffRules,
  m3 as Hero,
  xL as HomeIcon,
  mA as ItemDrawer,
  jA as KeyPanel,
  Ol as LIVE_EVENT_TYPES,
  Mb as LegacyBoardColumn,
  _A as LegacyBoardHeader,
  fA as LegacyConfigRow,
  bA as LegacyItemDrawer,
  Rb as LegacyOverCapNote,
  vA as LegacyPreviewRail,
  xr as LegacyWorkCard,
  $x as LinkList,
  Me as LiveIndicator,
  lA as LoadFailed,
  sA as Loading,
  al as MCP_SERVER_COLUMNS,
  Pn as Mark,
  qA as MarkUpload,
  Ge as Marker,
  DA as McpServerRow,
  HA as McpServerRowHead,
  ur as Menu,
  sr as MenuButton,
  CA as NewStreamModal,
  J_ as OverCapNote,
  In as OverflowRow,
  dt as Overlay,
  BL as OwedCard,
  yA as PARTIAL_STEP_REASON,
  rl as POLICY_CHIP_WIDTH,
  YL as PageFrame,
  FL as PageHeader,
  Un as PageIntro,
  nw as PlainList,
  OA as PolicyRow,
  v3 as PostRow,
  wA as PreviewRail,
  _3 as ProjectCard,
  g3 as ProjectPage,
  Rn as Prose,
  c3 as ProseHeading,
  hn as ROLE_MATRIX_COLUMNS,
  zr as RULE_ACTIONS,
  gr as Radio,
  a3 as ReadyChecklist,
  XL as RecordSection,
  XA as RequeueSheet,
  QA as ResolveBlock,
  r3 as ResolvedFieldRow,
  FA as RoleMatrixRow,
  l3 as RoutingTable,
  SA as RuleRow,
  zA as RunbookSteps,
  Dl as STREAM_STEPS,
  h3 as Section,
  ZL as SectionBand,
  wa as SectionHeader,
  br as SegmentedControl,
  lr as Select,
  o3 as SessionRow,
  HL as Sidebar,
  EL as SidebarFoldButton,
  u3 as SiteFooter,
  d3 as SiteHeader,
  Gx as SplitLayout,
  RA as StageColumn,
  tA as StageGrid,
  ZA as StageHistory,
  Uy as StageListEditor,
  jL as StageSteps,
  oA as StaleStrip,
  en as StatStrip,
  UL as StatTiles,
  OL as StreamAvatar,
  xA as StreamRow,
  LL as StudioIcon,
  JL as SubjectRail,
  Qe as Switch,
  qL as TabLinks,
  KL as TableHead,
  PL as Tabs,
  ml as Tag,
  b3 as TextList,
  bL as ThemeProvider,
  TA as ToolRow,
  VL as TopBar,
  o_ as Tree,
  Cr as TreeRow,
  i3 as TypedInputBlock,
  Ai as UNSAFE_HREF,
  WA as ValidationList,
  fL as VisibilityProvider,
  vL as Visible,
  yL as WARD_VERSION,
  nn as WorkCard,
  iA as WriteUnavailableStrip,
  MR as agoSince,
  Rl as clock,
  dN as colourStatus,
  ae as count,
  ue as duration,
  Tn as elapsed,
  gL as eventSourceTransport,
  bl as formatDate,
  kt as headingTag,
  Xt as isStreamStep,
  gt as isValidatedStreamStep,
  Fp as ladderValidation,
  M0 as mcpConnectionChip,
  E0 as mcpToolName,
  oe as money,
  pe as ms,
  Sr as ordered,
  Da as ratio,
  N3 as readTime,
  e$ as restartLabel,
  T as safeHref,
  hx as slug,
  he as stamp,
  Ln as stream,
  CL as streamChip,
  Zt as streamChipProps,
  ye as streamColour,
  Wl as streamHex,
  Ot as streamInitials,
  Fl as streamVars,
  DL as uniqueStreamInitials,
  tr as useAnchoredPanel,
  Mt as useBorderFlash,
  Be as useDisabledScope,
  Pl as useFocusTrap,
  SL as useLiveFeed,
  pL as useReturnFocus,
  Jt as useRovingTabindex,
  An as useTicker,
  xl as useVisible,
  j as v,
  PA as validateMark,
  Nt as validatedStep,
  Fa as validatedStreamSteps,
  XT as wordCount
};
