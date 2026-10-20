import { jsx as n, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as xa, useContext as Ne, createContext as ke, useState as p, useEffect as S, useCallback as te, useRef as f, useLayoutEffect as lt, useId as y, Fragment as La, isValidElement as _l, Children as Aa } from "react";
import { createPortal as fl, flushSync as Ea } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const Wn = (e) => String(e).padStart(2, "0");
function $n(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${Wn(t % 60)}s` : `${Math.floor(a / 60)}h ${Wn(a % 60)}m`;
}
const vl = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const t = vl.formatToParts(new Date(e)), a = (r) => {
    var l;
    return ((l = t.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
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
function Ia(e, t) {
  return `${e} / ${t}`;
}
const bl = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function pl(e) {
  return bl.format(new Date(e));
}
const Ma = ke(/* @__PURE__ */ new Set());
function Ux({ hidden: e, children: t }) {
  const a = xa(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Ma.Provider, { value: a, children: t });
}
function gl(e) {
  return !Ne(Ma).has(e);
}
function Vx({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(T, { children: gl(e) ? t : a });
}
const yl = "(prefers-color-scheme: dark)";
function Kn() {
  return typeof window.matchMedia == "function" ? window.matchMedia(yl) : null;
}
function Nl(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = Kn()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? Kn() : null;
    if (!r) return;
    const l = () => a(r.matches);
    return l(), r.addEventListener("change", l), () => r.removeEventListener("change", l);
  }, [e]), t;
}
function en(e, t) {
  S(() => {
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function kl(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function Jx({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const l = Nl(e === "system");
  return en("data-theme", kl(e, l)), en("data-accent", t), en("data-density", a), /* @__PURE__ */ n(T, { children: r });
}
const $l = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Cl(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function Sl(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function Rl(e, t, a, r) {
  return e.shiftKey ? Cl(t, a) ? r : void 0 : document.activeElement === r || Sl(t) ? a : void 0;
}
function Tl(e, t, a) {
  const r = a[0], l = a[a.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Rl(e, t, r, l);
  i && (e.preventDefault(), i.focus());
}
function xl(e) {
  return { onKeyDown: te(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll($l));
      Tl(a, e.current, r);
    },
    [e]
  ) };
}
function Yx(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [t, e]);
}
const Gn = { ArrowUp: -1, ArrowDown: 1 }, Un = { ArrowLeft: -1, ArrowRight: 1 }, Ll = (e, t, a) => Math.min(a, Math.max(t, e));
function Al(e, t) {
  if (t !== "horizontal" && e in Gn) return Gn[e];
  if (t !== "vertical" && e in Un) return Un[e];
}
function Kt({ orientation: e = "both" } = {}) {
  const [t, a] = p(0), r = f(/* @__PURE__ */ new Map()), l = f(!1);
  lt(() => {
    var _;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(t)) return;
    const h = u[0], w = l.current;
    l.current = !1, a(h), w && ((_ = r.current.get(h)) == null || _.focus());
  });
  const i = te((u) => a(u), []), s = te((u) => {
    var h;
    a(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = te(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(t)), _ = Al(u.key, e);
      _ !== void 0 ? (u.preventDefault(), s(h[Ll(w + _, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: i };
}
const Qx = (e, t, a) => {
  const r = new EventSource(e), l = (i) => a.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, Xx = "0.2.0", Zx = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], El = [1, 2, 3, 4, 5, 6], ja = [1, 2, 3], Il = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], eL = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], tL = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], B = {
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
function Cn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Gt(e) {
  return El.includes(e);
}
function bt(e) {
  return ja.includes(e);
}
function Ml(e) {
  if (!Gt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function nL(e) {
  if (!Gt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const jl = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Bl(e) {
  if (!Gt(e)) throw new Error("unvalidated stream step");
  return jl[e];
}
function Vn(e) {
  return typeof e != "string" ? null : Il.includes(e) ? e : null;
}
function Pl(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function ql(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function Hl(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Ol(e, t, a) {
  const r = Pl(e);
  if (r === null) return null;
  const l = Vn(a) ?? Vn(r.type);
  return l === null ? null : { ...r, type: l, id: ql(r, t), at: Hl(r) };
}
function Dl(e, t) {
  return e >= pe.staleAfter ? "stale" : e >= pe.heartbeat && t === "live" ? "reconnecting" : null;
}
function Fl(e, t, a) {
  return e >= pe.heartbeat && !t && a !== null;
}
function aL(e, t) {
  const [a, r] = p("reconnecting"), [l, i] = p(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), h = f(null), w = f(0), _ = f(0), N = f(!1), k = f("reconnecting"), E = te((L) => {
    k.current = L, r(L);
  }, []), H = te(() => {
    c.current = Date.now();
  }, []), me = te((L) => {
    for (const [Y, $e] of s.current)
      ($e === "*" || L.itemKey === $e) && Y(L);
  }, []), re = te(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (L, Y, $e) => {
        const Ge = Ol(L, Y, $e);
        Ge !== null && (Ge.id && (d.current = Ge.id), H(), N.current = !1, E("live"), i(Ge.at), me(Ge));
      },
      onOpen: () => {
        u.current = 0, N.current = !1, H(), E("live");
      },
      onError: () => {
        var Y;
        (Y = h.current) == null || Y.close(), h.current = null, N.current = !0, k.current !== "stale" && E("reconnecting");
        const L = Math.min(pe.reconnectBase * 2 ** u.current, pe.reconnectMax);
        u.current += 1, w.current = window.setTimeout(re, L);
      }
    });
  }, [me, E, H, t, e]), je = te((L) => {
    N.current = !0, L.close(), h.current = null, w.current = window.setTimeout(re, pe.reconnectBase);
  }, [re]), Xe = te((L, Y) => (s.current.set(Y, L), () => {
    s.current.delete(Y);
  }), []);
  return S(() => (re(), _.current = window.setInterval(() => {
    const L = Date.now() - c.current, Y = Dl(L, k.current);
    Y && E(Y);
    const $e = h.current;
    Fl(L, N.current, $e) && je($e);
  }, pe.tick), () => {
    var L;
    window.clearInterval(_.current), window.clearTimeout(w.current), N.current = !1, (L = h.current) == null || L.close(), h.current = null;
  }), [re, je, E]), { connection: a, lastEventAt: l, subscribe: Xe };
}
function Sn(e, t) {
  const a = new Date(e).getTime(), [r, l] = p(() => Date.now());
  return S(() => {
    if (!t) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    i();
    const s = window.setInterval(i, pe.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", i);
    };
  }, [t, a]), Math.max(0, r - a);
}
const zl = { blue: "running", orange: "waiting", green: "done" };
function Wl() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Jn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function At(e, t) {
  const a = f(0), r = te((l) => {
    const i = l ?? t, s = e.current;
    s !== null && i !== void 0 && (Wl() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${zl[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => Jn(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => Jn(s), pe.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (l) => r(l) : () => r(t);
}
const Kl = "_root_1otpc_2", Gl = {
  root: Kl
};
function Ul(e, t, a, r, l) {
  const i = [$n(t)];
  return e || i.push(`as of ${pl(a)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Ie({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const l = a !== "stale", i = Sn(e, l), s = (t == null ? void 0 : t.at) ?? e, c = Ul(l, i, s, r, t);
  return /* @__PURE__ */ o("span", { className: `${Gl.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const Vl = "_app_1bnco_1", Jl = "_side_1bnco_35", Yl = "_sideTop_1bnco_46", Ql = "_sideBody_1bnco_60", Xl = "_iconRail_1bnco_99", Zl = "_railItem_1bnco_108", eo = "_railIcon_1bnco_129", to = "_railDot_1bnco_134", no = "_railLetter_1bnco_140", ao = "_main_1bnco_146", ro = "_rail_1bnco_108", lo = "_page_1bnco_168", oo = "_headerRow_1bnco_191", io = "_sidebarToggle_1bnco_198", so = "_headerSlot_1bnco_203", co = "_headerAction_1bnco_208", uo = "_drawerSide_1bnco_213", ho = "_root_1bnco_260", mo = "_topbar_1bnco_267", wo = "_mark_1bnco_278", _o = "_brand_1bnco_285", fo = "_tagline_1bnco_291", vo = "_identity_1bnco_297", bo = "_tools_1bnco_298", po = "_nav_1bnco_308", go = "_metadata_1bnco_315", yo = "_actor_1bnco_330", No = "_detail_1bnco_331", ko = "_content_1bnco_376", $o = "_toolsPanel_1bnco_392", Co = "_skip_1bnco_418", C = {
  app: Vl,
  side: Jl,
  sideTop: Yl,
  sideBody: Ql,
  iconRail: Xl,
  railItem: Zl,
  railIcon: eo,
  railDot: to,
  railLetter: no,
  main: ao,
  rail: ro,
  page: lo,
  headerRow: oo,
  sidebarToggle: io,
  headerSlot: so,
  headerAction: co,
  drawerSide: uo,
  root: ho,
  topbar: mo,
  mark: wo,
  brand: _o,
  tagline: fo,
  identity: vo,
  tools: bo,
  nav: po,
  metadata: go,
  actor: yo,
  detail: No,
  content: ko,
  toolsPanel: $o,
  skip: Co
};
function it(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const So = "_scope_1an6i_2", Ro = {
  scope: So
}, Ba = ke(null);
function rL({ reason: e, actions: t = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${Ro.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(Ba.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Me() {
  return Ne(Ba);
}
function Ut(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : it(e, t.reasonId);
}
const To = "_btn_hrmlj_2", xo = "_primary_hrmlj_14", Lo = "_destructive_hrmlj_25", Ao = "_secondary_hrmlj_35", Eo = "_ghost_hrmlj_40", Io = "_overflow_hrmlj_49", Mo = "_sm_hrmlj_56", jo = "_disabled_hrmlj_60", Bo = "_withReason_hrmlj_68", Po = "_reason_hrmlj_74", rt = {
  btn: To,
  primary: xo,
  destructive: Lo,
  secondary: Ao,
  ghost: Eo,
  overflow: Io,
  sm: Mo,
  disabled: jo,
  withReason: Bo,
  reason: Po
};
function qo(e, t, a, r) {
  const l = t === "sm" ? [rt.sm, "ward-btn--sm"] : [], i = a ? [rt.disabled] : [];
  return [rt.btn, rt[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Ho(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Oo(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Do(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function Fo(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function zo(e, t, a) {
  return Fo(e.describedBy, t && a);
}
function Wo({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${rt.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function Ko(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Me()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(Go, { ...e });
}
function Go(e) {
  const t = Me();
  Oo(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || t), i = Do(e, t), s = y(), c = Uo(i, t);
  return /* @__PURE__ */ o(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: qo(a, r, l, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: l,
        title: i,
        "aria-describedby": zo(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Ho(a, e.controls),
        children: Ko(e)
      }
    ),
    /* @__PURE__ */ n(Wo, { id: s, reason: i, shown: c === Pa })
  ] });
}
function Uo(e, t) {
  return e && !t ? Pa : La;
}
function Pa({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${rt.withReason} ward-btn-withReason`, children: e });
}
let Rn = "none";
function Vo(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (Rn = "key");
}
typeof document < "u" && (document.addEventListener("keydown", Vo, !0), document.addEventListener("pointerdown", () => {
  Rn = "pointer";
}, !0));
function Jo() {
  return Rn === "key";
}
function ft(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (s) => a(s.matches);
    return r.addEventListener("change", l), a(r.matches), () => r.removeEventListener("change", l);
  }, [e]), t;
}
const Yo = "_scrim_1cawq_2", Qo = "_drawer_1cawq_10", Xo = "_sheet_1cawq_14", Zo = "_modal_1cawq_18", ei = "_panel_1cawq_23", ti = "_start_1cawq_44", ni = "_header_1cawq_67", ai = "_title_1cawq_75", ri = "_body_1cawq_79", li = "_close_1cawq_106", xe = {
  scrim: Yo,
  drawer: Qo,
  sheet: Xo,
  modal: Zo,
  panel: ei,
  start: ti,
  header: ni,
  title: ai,
  body: ri,
  close: li
}, oi = ke(null), Bt = [], Pt = /* @__PURE__ */ new Map();
function ii(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function si(e, t) {
  let a = Pt.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, Pt.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function ci(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !ii(r) && si(e, r);
}
function di(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (ci(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function ui(e) {
  for (const t of e.claims) {
    const a = Pt.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), Pt.delete(t)));
  }
}
function hi(e, t) {
  const a = { root: e, claims: [] };
  return Bt.push(a), di(a, t), a;
}
function mi(e) {
  const t = Bt.indexOf(e);
  t >= 0 && Bt.splice(t, 1), ui(e);
}
function Yn(e) {
  return e !== null && Bt.at(-1) === e;
}
function wi(e, t, a) {
  const r = f(null), l = f(a);
  return l.current = a, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = hi(i, t);
    return r.current = c, () => {
      var u, h;
      const d = Yn(c);
      mi(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), te(() => Yn(r.current), []);
}
function _i(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function fi(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function vi({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${xe.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("header", { className: `${xe.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${xe.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${xe.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function bi(e) {
  return `${xe.scrim} ${xe[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function pi(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${xe.panel} ${xe[e]} ward-overlay-panel${a}${r}`;
}
function gi(e) {
  const t = Ne(oi);
  return e ?? t ?? document.body;
}
function st(e) {
  const t = f(null), a = f(null), r = y(), l = gi(e.container), i = ft("(min-width: 768px)"), s = _i(e.kind, i), c = fi(e, r), d = xl(a), [u] = p(Jo), h = wi(t, l, e.returnFocusTo), w = te(() => {
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
  }, [w]), fl(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: bi(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: w,
        children: /* @__PURE__ */ o(
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
            className: pi(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => h() && d.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${xe.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(vi, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const yi = /^([a-z][a-z0-9+.-]*):/i, Ni = /* @__PURE__ */ new Set(["http", "https"]), ki = "#";
function $i(e) {
  var r, l;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (l = (r = yi.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function x(e) {
  const t = $i(e);
  return t === void 0 || Ni.has(t) ? e : ki;
}
function Ci(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function qa(e) {
  const t = Ci(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function Si(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => qa(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [a, ...a.children]) l == null || l.observe(i);
    return r(), () => {
      a.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, t]);
}
function Ri(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : l > e.clientWidth - a ? e.scrollLeft + l - e.clientWidth + a : null;
}
function Ti(e, t, a) {
  lt(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !l) return;
    const i = Ri(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), qa(r);
  }, [e, t, a]);
}
const xi = "_row_11g8i_2", Li = {
  row: xi
};
function Ai(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Tn({ label: e, children: t, count: a, as: r = "div", focusable: l = !0, rowRef: i, className: s, ...c }) {
  const d = f(null), u = i ?? d;
  return Si(u, a), /* @__PURE__ */ n(r, { ref: u, className: [Li.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Ai(l, r), ...c, children: t });
}
const Ei = "_icon_1ylqy_2", Ii = {
  icon: Ei
};
function pt({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: Ii.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function lL() {
  return /* @__PURE__ */ n(pt, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function oL() {
  return /* @__PURE__ */ o(pt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function iL() {
  return /* @__PURE__ */ o(pt, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function sL() {
  return /* @__PURE__ */ n(pt, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Mi() {
  return /* @__PURE__ */ o(pt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const Ha = "ward:sidebar-collapsed", ji = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Bi() {
  try {
    return window.localStorage.getItem(Ha) === "true";
  } catch {
    return !1;
  }
}
function Pi(e) {
  try {
    window.localStorage.setItem(Ha, String(e));
  } catch {
  }
}
function qi(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Hi(e) {
  return e instanceof Element && e.closest(ji) !== null;
}
function Oi(e) {
  return e.key === "[" && !qi(e) && !Hi(e.target);
}
function Di(e) {
  const [t, a] = p(Bi), r = () => {
    Pi(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!Oi(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, t]), { collapsed: t, toggle: r };
}
function Fi() {
  const e = ft("(max-width: 767.98px)"), t = ft("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function zi(e) {
  const t = e === "phone", a = y(), r = f(null), [l, i] = p(!1);
  return l && !t && i(!1), { narrow: t, open: l, drawerId: a, slotRef: r, toggle: () => i(!l), close: () => i(!1) };
}
function Wi({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ o("div", { className: C.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: C.headerSlot, children: e }),
    za(t) && /* @__PURE__ */ n("span", { className: C.headerAction, children: t })
  ] }) : e;
}
function Ki(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function Gi({ sidebar: e, label: t, drawer: a }) {
  var l;
  if (Ki(a.open, a.close), !a.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(st, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (l = a.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ n("div", { className: C.drawerSide, onClick: r, children: Oa(e, !1) }) });
}
function Ui(e) {
  const [t, a] = p(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function Vi(e, t) {
  const a = Di(e === "wide" && !t), r = Ui(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function Ji(e, t) {
  const a = Vi(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return Qi(e.collapsed, t);
  const r = a.collapsed, l = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: l, drawsStrip: !l && typeof e.sidebar == "function", toggle: a.toggle };
}
const Yi = (e) => e.collapsed && e.drawsStrip;
function Qi(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const Qn = (e) => e ? "" : void 0;
function Oa(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Da({ fold: e }) {
  return /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(Mi, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function Xi({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: C.sideTop, children: /* @__PURE__ */ n(Da, { fold: e }) });
}
const Fa = ke(null);
function cL() {
  const e = Ne(Fa);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(Da, { fold: e });
}
function Zi({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": Cn(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function es({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: C.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ o("a", { className: C.railItem, href: x(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(Zi, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function ts({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: l }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ o("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(Xi, { fold: r, inSidebar: l && !i }),
    /* @__PURE__ */ n("div", { className: C.sideBody, hidden: i, children: Oa(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(es, { items: a ?? [], label: t })
  ] });
}
const za = (e) => e != null;
function ns(e) {
  const { sidebar: t, header: a, action: r, children: l, rail: i, iconRail: s, pageFill: c } = e, d = za(i), u = Fi(), h = zi(u), w = Ji(e, u), _ = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ o("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": Qn(Yi(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(Fa.Provider, { value: w, children: /* @__PURE__ */ n(ts, { sidebar: t, label: _, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ o("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(Wi, { header: a, action: r, label: _, drawer: h }),
      /* @__PURE__ */ n("div", { className: C.page, "data-fill": Qn(c === !0), children: l })
    ] }),
    d && /* @__PURE__ */ n("div", { className: C.rail, children: i }),
    /* @__PURE__ */ n(Gi, { sidebar: t, label: _, drawer: h })
  ] });
}
function as({ destinations: e, active: t }) {
  const a = f(null);
  return Ti(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(Tn, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: x(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function wn({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function rs({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ o("span", { className: C.metadata, children: [
    /* @__PURE__ */ n(wn, { value: e, className: C.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(wn, { value: t, className: C.detail })
  ] });
}
function ls() {
  const e = ft("(max-width: 767.98px)"), t = y(), a = f(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function os({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: C.tools, children: e });
}
function is({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: C.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function ss(e) {
  return /* @__PURE__ */ o("header", { className: C.topbar, children: [
    /* @__PURE__ */ n("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(wn, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ n(as, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: C.identity, children: /* @__PURE__ */ n(rs, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(os, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function cs(e) {
  const t = y(), a = ls();
  return /* @__PURE__ */ o("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: C.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(ss, { ...e, menu: a }),
    /* @__PURE__ */ n(is, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: C.content, children: e.children })
  ] });
}
function ds(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function dL(e) {
  return ds(e) ? /* @__PURE__ */ n(ns, { ...e }) : /* @__PURE__ */ n(cs, { ...e });
}
const us = "_root_itg9o_2", hs = "_row_itg9o_8", ms = "_box_itg9o_14", ws = "_label_itg9o_21", _s = "_labelHidden_itg9o_26", fs = "_lockedNote_itg9o_36", vs = "_consequence_itg9o_44", bs = "_sample_itg9o_79", qe = {
  root: us,
  row: hs,
  box: ms,
  label: ws,
  labelHidden: _s,
  lockedNote: fs,
  consequence: vs,
  sample: bs
};
function ps(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function gs({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${qe.consequence} ward-check-consequence`, children: t }) : null;
}
function ys({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${qe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Ns(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function ks(e, t, a, r) {
  const l = e.consequence ? `${t}-note` : void 0, i = Ns(e, a, r), s = i ? `${t}-reason` : void 0, c = Ut(it(l, e.describedBy, s), r);
  return { noteId: l, reason: i, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? i } };
}
function $s({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Cs({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.sample, "aria-hidden": "true", children: e }) : null;
}
function Wa(e) {
  const t = y(), a = Me(), r = ps(e, a), l = ks(e, t, r.disabled, a);
  return /* @__PURE__ */ o("div", { className: `${qe.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: qe.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: t,
          type: "checkbox",
          className: `${qe.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (i) => {
            var s;
            return !r.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, i.target.checked));
          },
          ...l.input
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: t, className: e.labelHidden ? qe.labelHidden : qe.label, children: [
        e.label,
        /* @__PURE__ */ n(ys, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Cs, { text: e.sample })
    ] }),
    /* @__PURE__ */ n($s, { id: l.reasonId, reason: l.reason }),
    /* @__PURE__ */ n(gs, { id: l.noteId, text: e.consequence })
  ] });
}
const Ss = "_chip_pq6tb_2", Rs = {
  chip: Ss
}, Ts = {
  gate: B.chip.gate,
  system: B.chip.system,
  write: B.chip.write,
  drift: B.chip.drift,
  done: B.chip.done,
  attention: B.chip.attention,
  failed: B.chip.failed,
  pending: B.chip.pending,
  running: B.chip.running,
  warn: B.chip.warn,
  meta: B.chip.meta,
  soft: B.chip.soft,
  quiet: B.chip.quiet,
  owed: B.chip.owed,
  neutral: B.chip.quiet,
  info: B.chip.running,
  success: B.chip.done,
  warning: B.chip.attention,
  danger: B.chip.failed
};
function xs(e, t) {
  if (e === "stream") return Ls(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = Ts[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function Ls(e) {
  if (!e || !bt(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = Cn(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Rs.chip} ward-chip ward-chip--${e}`, style: xs(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const As = "_clamp_zn74g_3", Xn = {
  clamp: As
};
function ot({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? Xn.clamp : `${Xn.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const Es = "_root_1btz3_2", Is = "_body_1btz3_10", Ms = "_toggle_1btz3_24", tn = {
  root: Es,
  body: Is,
  toggle: Ms
};
function uL({ children: e, lines: t = 3, label: a }) {
  const [r, l] = p(!1), i = y();
  return /* @__PURE__ */ o("div", { className: tn.root, children: [
    /* @__PURE__ */ n("div", { id: i, className: tn.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: tn.toggle, "aria-expanded": r, "aria-controls": i, onClick: () => l(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const js = "_root_1a4s8_2", Bs = "_words_1a4s8_16", Ps = "_title_1a4s8_23", qs = "_actions_1a4s8_27", Nt = {
  root: js,
  words: Bs,
  title: Ps,
  actions: qs
};
function hL({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ o("section", { className: Nt.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ o("div", { className: Nt.words, children: [
      /* @__PURE__ */ n("strong", { className: Nt.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: Nt.actions, children: a })
  ] });
}
const Hs = "_root_8zmpu_2", Os = "_step_8zmpu_12", Ds = "_dot_8zmpu_38", Fs = "_label_8zmpu_51", ut = {
  root: Hs,
  step: Os,
  dot: Ds,
  label: Fs
}, zs = { done: ", done", now: ", current", next: "" };
function Ws({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ o("li", { className: ut.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${ut.dot} ward-running` : ut.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ut.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: zs[e.state] })
  ] });
}
function mL({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: ut.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(Ws, { step: r, running: t }, r.label)) });
}
function gt(e) {
  return typeof e == "number" && bt(e) ? e : null;
}
function ye(e, t) {
  const a = gt(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function Vt(e, t) {
  const a = gt(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const Ks = "_root_13eei_3", Gs = "_nav_13eei_8", Us = "_list_13eei_16", Vs = "_item_13eei_24", Js = "_link_13eei_44", Ys = "_sep_13eei_54", Qs = "_current_13eei_58", Xs = "_chips_13eei_62", Pe = {
  root: Ks,
  nav: Gs,
  list: Us,
  item: Vs,
  link: Js,
  sep: Ys,
  current: Qs,
  chips: Xs
};
function Zs({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: Pe.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${Pe.link} ward-target`, href: x(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function ec({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: Pe.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Pe.nav, children: [
    /* @__PURE__ */ n("ol", { className: Pe.list, children: e.map((r, l) => /* @__PURE__ */ o("li", { className: Pe.item, children: [
      l > 0 ? /* @__PURE__ */ n("span", { className: Pe.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(Zs, { step: r, isCurrent: a && l === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${Pe.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function Ka(e, t, a) {
  const r = f(a);
  r.current = a, S(() => {
    if (!e) return;
    const l = (i) => {
      var s;
      (s = t.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, t]);
}
const tc = 500;
function Ga(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function Ua() {
  const e = f(""), t = f(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, tc), e.current);
}
const kt = 4;
function nc(e, t, a) {
  const r = Math.max(0, a - e.bottom - kt * 2), l = Math.max(0, e.top - kt * 2);
  return t <= r || r >= l ? { top: e.bottom + kt, maxHeight: r } : { top: e.top - kt - Math.min(t, l), maxHeight: l };
}
function ac(e, t, a, r) {
  const l = { start: e.left, end: e.right - t }, i = { start: l.start + t <= a, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, a - t));
}
function rc(e, t, a, r) {
  return { ...nc(e, t.height, a.height), left: ac(e, t.width, a.width, r) };
}
function Et(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function lc(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function oc(e, t, a) {
  const r = lc(t, a);
  e.style.setProperty("--ward-anchor-width", Et(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const l = e.getBoundingClientRect(), i = document.documentElement;
  return { edges: r, box: l, view: { width: i.clientWidth, height: i.clientHeight } };
}
function ic(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, l) => r.scrollTop = a[l]);
}
function Zn(e, t, a, r) {
  const l = ic(e), i = oc(e, t, r), s = rc(i.edges, i.box, i.view, a);
  Object.assign(e.style, { left: Et(s.left - i.box.left), top: Et(s.top - i.box.top), maxHeight: Et(s.maxHeight) }), l();
}
function sc(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function Va(e, t, a = "start", r) {
  lt(() => {
    const l = t.current, i = e.current;
    if (!l || !i) return;
    const s = sc(l), c = () => Zn(l, i, a, r == null ? void 0 : r.current), d = (u) => {
      l.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), lt(() => {
    t.current && e.current && Zn(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const cc = "_root_1lgbn_2", dc = "_trigger_1lgbn_7", uc = "_value_1lgbn_47", hc = "_menu_1lgbn_65", mc = "_find_1lgbn_87", wc = "_list_1lgbn_103", _c = "_option_1lgbn_114", fc = "_check_1lgbn_133", vc = "_empty_1lgbn_144", ge = {
  root: cc,
  trigger: dc,
  value: uc,
  menu: hc,
  find: mc,
  list: wc,
  option: _c,
  check: fc,
  empty: vc
}, bc = 7;
function pc(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function ea(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function gc(e, t) {
  const [a, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => ea(e.options, e.value)), d = (u) => {
    var h;
    Ea(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: l,
    active: s,
    entries: pc(e.options, l),
    findable: e.options.length > bc,
    show: () => {
      e.disabled || (i(""), c(ea(e.options, e.value)), r(!0));
    },
    close: d,
    to: c,
    pick: (u) => {
      var h;
      u && u.option.value !== e.value && ((h = e.onChange) == null || h.call(e, u.option.value)), d(!0);
    },
    find: (u) => {
      i(u), c(0);
    }
  };
}
function yc(e, t) {
  const a = f(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function Nc(e) {
  const t = Ua();
  return (a) => {
    const r = t(a), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function Ja(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function kc(e) {
  return { ...Ja(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function Ya(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = t[r.key];
    if (!l) return a(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const $c = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Cc(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      $c.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function Sc({ entry: e, at: t, menu: a, ids: r, value: l }) {
  return /* @__PURE__ */ o(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
      "data-active": t === a.active || void 0,
      className: ge.option,
      onMouseDown: (i) => i.preventDefault(),
      onMouseMove: () => a.to(t),
      onClick: () => a.pick(e),
      children: [
        /* @__PURE__ */ n("span", { className: ge.check, "aria-hidden": "true" }),
        /* @__PURE__ */ n("span", { className: ge.label, children: e.option.label })
      ]
    }
  );
}
function xn(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function Rc({ menu: e, ids: t, focusRef: a }) {
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
      "aria-activedescendant": xn(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: Ya(e, Ja(e), () => {
      })
    }
  );
}
function Tc({ props: e, menu: t, ids: a, focusRef: r, trigger: l }) {
  const i = Nc(t), s = f(null);
  Va(l, s);
  const c = (d) => {
    Ga(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: ge.menu, children: [
    t.findable && /* @__PURE__ */ n(Rc, { menu: t, ids: a, focusRef: r }),
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
        "aria-activedescendant": t.findable ? void 0 : xn(t, a),
        onKeyDown: Ya(t, kc(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(Sc, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: ge.empty, children: "No match" })
  ] });
}
function xc(e, t) {
  const a = e.open ? xn(e, t) : void 0;
  S(() => {
    var r, l;
    a && ((l = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [a]);
}
function Qa(...e) {
  return e.filter(Boolean).join(" ");
}
function Lc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function Ac({ props: e, menu: t, ids: a, trigger: r, wantFocus: l }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Me()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: Qa(ge.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": t.open,
      "aria-controls": t.open ? a.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": it(e["aria-describedby"], a.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...Cc(t, l),
      children: /* @__PURE__ */ n("span", { id: a.value, className: ge.value, "data-placeholder": i || void 0, children: Lc(e) })
    }
  );
}
function Xa(e) {
  const t = Me(), a = t ? { ...e, disabled: !0, "aria-describedby": Ut(e["aria-describedby"], t) } : e, r = y(), l = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = f(null), s = f(null), c = f(null), d = gc(a, s), u = yc(d.open, c);
  return Ka(d.open, i, () => d.close(!1)), xc(d, l), /* @__PURE__ */ o("div", { ref: i, className: Qa(ge.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(Ac, { props: a, menu: d, ids: l, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(Tc, { props: a, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const Ec = "_field_1ensj_2", Ic = "_label_1ensj_8", Mc = "_labelHidden_1ensj_15", jc = "_control_1ensj_25", Bc = "_mono_1ensj_45", Pc = "_area_1ensj_50", qc = "_invalid_1ensj_57", ze = {
  field: Ec,
  label: Ic,
  labelHidden: Mc,
  control: jc,
  mono: Bc,
  area: Pc,
  invalid: qc
}, Hc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, Za = (e) => `${e}-label`;
function Oc({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? Hc : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function Dc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    Xa,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": Za(t.id),
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
function Fc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
const zc = { input: Oc, select: Dc, textarea: Fc };
function Wc(e, t, a) {
  const r = zc[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function Kc(e, t, a, r) {
  const l = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": l,
    "aria-describedby": Ut(it(l ? a : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function Gc(e) {
  const t = e.mono ? [ze.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [ze.area] : [];
  return [ze.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function Uc(e) {
  return e ? `${ze.label} ${ze.labelHidden} ward-field-label` : `${ze.label} ward-field-label`;
}
function q(e) {
  const t = y(), a = `${t}-msg`, r = Kc(e, t, a, Me()), l = Gc(e);
  return /* @__PURE__ */ o("div", { className: `${ze.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: Za(t), className: Uc(e.labelHidden), htmlFor: t, children: e.label }),
    Wc(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${ze.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Vc = "_root_sjvm0_2", Jc = "_trigger_sjvm0_9", Yc = "_ghost_sjvm0_27", Qc = "_panel_sjvm0_46", Xc = "_edged_sjvm0_67", Zc = "_menu_sjvm0_73", ed = "_group_sjvm0_78", td = "_heading_sjvm0_83", nd = "_item_sjvm0_89", ad = "_description_sjvm0_105", rd = "_large_sjvm0_109", ld = "_touch_sjvm0_113", od = "_icon_sjvm0_117", id = "_label_sjvm0_125", sd = "_text_sjvm0_130", cd = "_trailing_sjvm0_138", dd = "_check_sjvm0_144", ud = "_separator_sjvm0_183", hd = "_footer_sjvm0_189", md = "_find_sjvm0_196", wd = "_findGlyph_sjvm0_208", _d = "_findInput_sjvm0_214", fd = "_empty_sjvm0_230", A = {
  root: Vc,
  trigger: Jc,
  ghost: Yc,
  panel: Qc,
  edged: Xc,
  menu: Zc,
  group: ed,
  heading: td,
  item: nd,
  description: ad,
  large: rd,
  touch: ld,
  icon: od,
  label: id,
  text: sd,
  trailing: cd,
  check: dd,
  separator: ud,
  footer: hd,
  find: md,
  findGlyph: wd,
  findInput: _d,
  empty: fd
}, er = ke(null);
function vd(e, t) {
  const [a, r] = p({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (l) => r((i) => ({ open: !0, start: l, request: i.request + 1 })),
    close: (l) => {
      var i;
      Ea(() => r((s) => ({ ...s, open: !1 }))), l && ((i = t.current) == null || i.focus());
    }
  };
}
const bd = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function pd(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = bd.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function Ln(...e) {
  return e.filter(Boolean).join(" ");
}
function gd(e, t = {}, a = "field") {
  const { ref: r, className: l, ...i } = t;
  return { ...i, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: Ln(A.trigger, a === "ghost" ? A.ghost : void 0, l) };
}
function tr(e) {
  const t = y(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = f(null), l = f(null), i = vd(e.defaultOpen === !0, l);
  return Ka(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: Ln(A.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...gd(l, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...pd(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(er.Provider, { value: { ...a, popup: i, button: l }, children: e.children })
  ] });
}
function yd(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function Nd(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const kd = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function $d(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function Cd(e, t) {
  return e === "separator" ? e : "items" in e ? $d(e, t) : t(e) ? e : null;
}
function Sd(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function Rd(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (l) => l.label.toLowerCase().includes(a);
  return Sd(e.map((l) => Cd(l, r)).filter((l) => l !== null));
}
const nr = (e, t) => (e % t + t) % t;
function Oe(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const l = nr(t + a * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const Td = (e) => e.split("").every((t) => t === e[0]);
function xd(e, t, a) {
  const r = Td(a), l = r ? a[0] : a, i = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = nr(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function Ld(e) {
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
function Ad(e, t) {
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
function Ed(e, t, a) {
  const r = Ua(), l = Ad(e, t), i = (s) => {
    if (Ga(s)) {
      if (!a) return e.focus(xd(e.items, e.current(), r(s.key)));
      s.preventDefault(), a(s.key);
    }
  };
  return {
    onKeyDown: (s) => {
      const c = l.get(s.key);
      if (!c) return i(s);
      s.preventDefault(), s.stopPropagation(), c();
    },
    onKeyUp: (s) => {
      s.key === " " && s.preventDefault();
    }
  };
}
function Id(e) {
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
function Md(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? Oe(e, -1, 1) : t;
}
function jd(e, t) {
  const { start: a, request: r } = t, l = f(e);
  l.current = e, S(() => {
    const { items: i, focus: s } = l.current;
    a && s(a === "first" ? Md(i) : Oe(i, i.length, -1));
  }, [a, r]);
}
function Bd({ row: e, nav: t, popup: a }) {
  const { item: r, at: l } = e;
  return {
    onMouseDown: (i) => i.preventDefault(),
    onMouseMove: () => {
      !r.disabled && t.current() !== l && t.focus(l);
    },
    onClick: (i) => {
      var s;
      if (r.disabled) return i.preventDefault();
      (s = r.onSelect) == null || s.call(r), a.close(!0);
    }
  };
}
const Pd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function qd(e, t) {
  return Pd(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function Hd(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: A.label, children: e.label });
  return e.description ? /* @__PURE__ */ o("span", { className: A.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: A.description, children: e.description })
  ] }) : a;
}
function Od() {
  return /* @__PURE__ */ n("svg", { className: A.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function ta(e, t) {
  return /* @__PURE__ */ o(T, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: A.icon, "aria-hidden": "true", children: e.icon }) : null,
    Hd(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: A.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(Od, {}) : null
  ] });
}
function ar(e) {
  const { item: t, at: a } = e.row, r = y(), l = {
    ref: (i) => {
      e.nav.refs.current[a] = i;
    },
    role: "menuitem",
    tabIndex: -1,
    className: A.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...qd(t, r),
    ...Bd(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: x(t.href), ...l, children: ta(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...l, children: ta(t, r) });
}
function Dd({ heading: e, rows: t, nav: a, popup: r }) {
  const l = y();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: A.group, children: [
    /* @__PURE__ */ n("div", { id: l, className: A.heading, children: e }),
    t.map((i) => /* @__PURE__ */ n(ar, { row: i, nav: a, popup: r }, i.at))
  ] });
}
function Fd({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: A.separator }) : e.kind === "group" ? /* @__PURE__ */ n(Dd, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(ar, { row: e.row, nav: t, popup: a });
}
function zd() {
  const e = Ne(er);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Wd() {
  return /* @__PURE__ */ o("svg", { className: A.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function Kd(e, t) {
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
function Gd({ find: e, query: t, setQuery: a, input: r, nav: l, popup: i, menuId: s }) {
  const c = Kd(l, i), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ o("div", { className: A.find, children: [
    /* @__PURE__ */ n(Wd, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: A.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function Ud(e, t) {
  const [a, r] = p(""), l = f(null), i = t !== void 0 && kd(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = l.current) == null || d.focus();
  };
  return i ? { find: t, query: a, setQuery: r, input: l, toFind: s, entries: Rd(e, a) } : { query: a, setQuery: r, input: l, entries: e };
}
const Vd = { regular: void 0, large: A.large, touch: A.touch }, Jd = (e, t) => Ln(A.panel, e ? A.edged : void 0, Vd[t]);
function Yd({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: A.empty, children: e.empty ?? "No matches" });
}
function rr({ entries: e, footer: t, align: a = "start", find: r, edges: l, size: i = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = zd(), h = f(null);
  Va(u, h, a, l);
  const w = Ud(e, r), _ = yd(w.entries), N = Ld(_.flatMap(Nd).map((H) => H.item)), k = Ed(N, s, w.toFind), E = Id(s);
  return jd(N, s), /* @__PURE__ */ o("div", { ref: h, className: Jd(l, i), ...E, children: [
    w.find && /* @__PURE__ */ n(Gd, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: A.menu, ...k, children: _.map((H, me) => /* @__PURE__ */ n(Fd, { block: H, nav: N, popup: s }, me)) }),
    /* @__PURE__ */ n(Yd, { find: w.find, count: N.items.length }),
    t && /* @__PURE__ */ n("p", { className: A.footer, children: t })
  ] });
}
function Qd(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function lr(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !Qd(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const Xd = (e, t) => e.reduce((a, r) => a + r + t, -t);
function Zd({ room: e, widths: t, more: a, gap: r }, l) {
  const i = t.map((d, u) => u);
  if (Xd(t, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([l]);
  let c = t[l] + r + a;
  for (const d of i)
    if (d !== l) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const nn = (e) => Number.parseFloat(e) || 0, na = (e) => e.getBoundingClientRect().width;
function eu(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - nn(a.paddingInlineStart) - nn(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), na),
    more: r ? na(r) : 0,
    gap: nn(a.columnGap)
  };
}
function tu(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const nu = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function or(e, t, a, r = ':scope > [role="tab"]') {
  const [l, i] = p(null);
  return lt(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = eu(s, r);
      i((u) => nu(u, d) ? u : d);
    };
    return c(), tu(s, c);
  }, [e, a, r]), l && Zd(l, t);
}
const au = "_strip_1zvzj_2", ru = "_fits_1zvzj_19", lu = "_probe_1zvzj_27", ou = "_moreRoot_1zvzj_36", iu = "_more_1zvzj_36", su = "_tab_1zvzj_55", cu = "_count_1zvzj_91", du = "_badge_1zvzj_97", J = {
  strip: au,
  fits: ru,
  probe: lu,
  moreRoot: ou,
  more: iu,
  tab: su,
  count: cu,
  badge: du
}, ir = "More";
function uu(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const aa = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, An = (e) => e.badge === void 0 ? aa(e) : `${aa(e)}, ${e.badge}`;
function sr(e) {
  return `${J.strip} ward-tabs ward-tabs--${e}`;
}
const hu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function mu({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ o(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${J.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : An(e),
      onClick: () => r(e.id),
      ...a,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
          " ",
          /* @__PURE__ */ n("span", { className: J.count, children: `· ${e.count}` })
        ] }),
        e.badge === void 0 ? null : /* @__PURE__ */ n("span", { className: J.badge, children: e.badge })
      ]
    }
  );
}
function wu(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function _u({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(tr, { label: ir, className: J.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: J.more }, children: /* @__PURE__ */ n(rr, { align: "end", entries: e.map((r) => ({ label: An(r), onSelect: () => a(r.id) })) }) });
}
function fu(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : hu;
}
function wL({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: l }) {
  const i = Kt({ orientation: "horizontal" }), s = uu(e, t);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = f(null);
  lr(c, l);
  const d = or(c, s, e.map(An).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${sr(l)} ${J.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(mu, { tab: h, active: t, place: fu(i, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${A.trigger} ${J.more} ${J.probe}`, children: ir }),
    u.length > 0 && /* @__PURE__ */ n(_u, { tabs: u, trigger: i.itemProps(e.length), onPick: wu(c, a) })
  ] });
}
const ra = 7, cr = "More", vu = ":scope > a", dr = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, bu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function pu(e, t) {
  return !e || e.includes(t) ? {} : bu;
}
function gu({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ o("a", { href: e.href, className: `${J.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: J.count, children: `· ${e.count}` })
    ] })
  ] });
}
function yu({ links: e }) {
  return /* @__PURE__ */ n(tr, { label: cr, className: J.moreRoot, trigger: { className: J.more }, children: /* @__PURE__ */ n(rr, { align: "end", entries: e.map((t) => ({ label: dr(t), href: t.href })) }) });
}
function _L({ links: e, active: t, label: a, level: r }) {
  if (e.length > ra) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ra} — the set is fixed`);
  const l = f(null);
  lr(l, r);
  const i = Math.max(0, e.findIndex((d) => d.id === t)), s = or(l, i, e.map(dr).join(`
`), vu), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ o("nav", { ref: l, className: `${sr(r)} ${J.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(gu, { link: d, current: d.id === t, place: pu(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${A.trigger} ${J.more} ${J.probe}`, children: cr }),
    c.length > 0 && /* @__PURE__ */ n(yu, { links: c })
  ] });
}
const Nu = "_root_v56ff_3", ku = "_segment_v56ff_9", la = {
  root: Nu,
  segment: ku
};
function ur({ options: e, value: t, onChange: a, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Kt({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${la.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: la.segment,
      "aria-checked": d.value === t,
      disabled: l,
      "aria-describedby": i,
      onClick: () => a(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const $u = "_sidebar_s9o1j_3", Cu = "_brand_s9o1j_9", Su = "_mark_s9o1j_17", Ru = "_word_s9o1j_24", Tu = "_nav_s9o1j_30", xu = "_navItem_s9o1j_39", Lu = "_footLink_s9o1j_49", Au = "_group_s9o1j_58", Eu = "_groupName_s9o1j_65", Iu = "_agents_s9o1j_81", Mu = "_agent_s9o1j_81", ju = "_root_s9o1j_96", Bu = "_agentTop_s9o1j_105", Pu = "_dot_s9o1j_112", qu = "_agentName_s9o1j_124", Hu = "_agentMeta_s9o1j_138", Ou = "_foot_s9o1j_49", Du = "_footName_s9o1j_150", Fu = "_footLinks_s9o1j_157", zu = "_linkBrand_s9o1j_184", Wu = "_label_s9o1j_205", Ku = "_note_s9o1j_210", Gu = "_footer_s9o1j_226", I = {
  sidebar: $u,
  brand: Cu,
  mark: Su,
  word: Ru,
  nav: Tu,
  navItem: xu,
  new: "_new_s9o1j_48",
  footLink: Lu,
  group: Au,
  groupName: Eu,
  agents: Iu,
  agent: Mu,
  root: ju,
  agentTop: Bu,
  dot: Pu,
  agentName: qu,
  agentMeta: Hu,
  foot: Ou,
  footName: Du,
  footLinks: Fu,
  linkBrand: zu,
  label: Wu,
  note: Ku,
  footer: Gu
};
function Uu({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: I.agent,
      href: x(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: I.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: I.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": Cn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: I.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: I.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Vu({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: I.foot, children: [
    /* @__PURE__ */ n("span", { className: I.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: I.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${I.footLink} ward-target`, href: x(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function Ju({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: I.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: I.brand, children: [
      /* @__PURE__ */ n("span", { className: I.mark }),
      /* @__PURE__ */ n("span", { className: I.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: I.nav, children: t.map((s) => /* @__PURE__ */ n("a", { className: I.navItem, href: x(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: I.group, children: [
      /* @__PURE__ */ o("span", { className: I.groupName, children: [
        a,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: I.new, href: x(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: I.agents, children: r.map((s) => /* @__PURE__ */ n(Uu, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(Vu, { shared: i })
  ] });
}
function Yu(e) {
  return e.destinations ?? e.items ?? [];
}
function Qu({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.linkBrand, children: e });
}
function Xu({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.footer, children: e });
}
function Zu({ link: e, active: t }) {
  return /* @__PURE__ */ o("a", { href: x(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: I.note, children: e.note })
  ] });
}
function eh(e) {
  return /* @__PURE__ */ o("aside", { className: `${I.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Qu, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Yu(e).map((t) => /* @__PURE__ */ n(Zu, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(Xu, { children: e.children })
  ] });
}
function th(e) {
  return "agents" in e;
}
function fL(e) {
  return th(e) ? /* @__PURE__ */ n(Ju, { ...e }) : /* @__PURE__ */ n(eh, { ...e });
}
const nh = "_mark_wlgi8_3", ah = {
  mark: nh
}, rh = { met: "✓", unmet: "", failed: "✕" };
function En({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: ah.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: rh[e]
    }
  );
}
const lh = "_avatar_1t33a_3", oh = {
  avatar: lh
};
function qt(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function ih(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [qt(e), ...[...t.slice(1)].map((r) => a + r)];
}
function sh(e, t) {
  const a = ih(e).find((l) => !t.has(l));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(qt(e).charAt(0) + String(r)); ) r += 1;
  return qt(e).charAt(0) + String(r);
}
function vL(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const l = sh(r, t);
    t.add(l), a.set(r, l);
  }
  return a;
}
function ch(e) {
  return e != null && bt(e) ? Ml(e) : void 0;
}
function bL({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: oh.avatar, "data-size": a, "aria-hidden": "true", style: ch(t), children: r ?? qt(e) });
}
const dh = "_marker_br9fi_2", uh = {
  marker: dh
}, hh = {
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
}, mh = { running: " ward-running" };
function Ke({ size: e, kind: t, label: a }) {
  const r = { "--marker": hh[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${uh.marker} ward-marker ward-marker--${t}${mh[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const wh = "_root_ti0pq_2", _h = "_chip_ti0pq_11", fh = "_noCase_ti0pq_23", $t = {
  root: wh,
  chip: _h,
  noCase: fh
};
function vh(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function In({ connection: e, since: t, lastEventAt: a }) {
  const r = vh(t, a), l = Sn(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${$t.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Ke, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${$t.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: $t.noCase, children: $n(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${$t.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    he(r)
  ] });
}
const bh = "_root_yylks_2", ph = "_context_yylks_13", gh = "_row_yylks_1", yh = "_heading_yylks_27", Nh = "_headingWrap_yylks_35", kh = "_meta_yylks_41", $h = "_chips_yylks_49", Ch = "_title_yylks_56", Sh = "_consequence_yylks_66", Rh = "_actionsWrap_yylks_73", Th = "_actions_yylks_73", xh = "_action_yylks_73", Lh = "_overflowPanel_yylks_102", Ah = "_measureClip_yylks_113", Eh = "_measure_yylks_113", U = {
  root: bh,
  context: ph,
  row: gh,
  heading: yh,
  headingWrap: Nh,
  meta: kh,
  chips: $h,
  title: Ch,
  consequence: Sh,
  actionsWrap: Rh,
  actions: Th,
  action: xh,
  overflowPanel: Lh,
  measureClip: Ah,
  measure: Eh
};
function Ih({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(ot, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function Mh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function jh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function Bh({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ o("div", { className: U.meta, children: [
    /* @__PURE__ */ n(Mh, { chips: e }),
    /* @__PURE__ */ n(jh, { consequence: t, consequenceHint: a })
  ] });
}
function Ph({ title: e, chips: t, consequence: a, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: U.heading, children: [
    /* @__PURE__ */ n(Ih, { title: e, density: l }),
    /* @__PURE__ */ n(Bh, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function _n({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function oa({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function qh({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: l }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(oa, { disclosure: l }) : t ? [/* @__PURE__ */ n(oa, { disclosure: l }, "more"), /* @__PURE__ */ n(_n, { actions: e }, "actions")] : /* @__PURE__ */ n(_n, { actions: e });
}
function Hh(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function Oh({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(_n, { actions: e }) });
}
function Dh(e, t) {
  const a = y(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: a, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const Fh = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function zh(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && Fh(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function Wh({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(ec, { path: e.path, current: e.current }) });
}
function Kh(...e) {
  return e.some((t) => t === null);
}
function Gh(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Uh(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + Gh(e);
}
function Vh(e, t, a, r, l) {
  if (l === 0 || Kh(t, a, r)) return !1;
  const [i, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - Uh(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Jh(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Yh(e) {
  return _l(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Qh(e, t) {
  return t.length === 0 && e.length === 1 && Yh(e[0]);
}
function Xh(e, t) {
  const a = f(null), r = f(null), l = f(null), i = f(null), [s, c] = p(!1);
  return S(() => {
    const d = a.current;
    if (!Jh(d)) return;
    const u = () => c(Vh(d, r.current, l.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !t };
}
function Zh({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ o("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function em({ connection: e }) {
  return e ? /* @__PURE__ */ n(In, { connection: e.connection, since: e.since }) : null;
}
function pL({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: l, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: _, actionsRef: N, measureRef: k, collapsed: E } = Xh(s, Qh(s, c)), H = c.length > 0, { disclosure: me, close: re } = Dh(E || H, N), je = Hh(c, s, E, u);
  return /* @__PURE__ */ o("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(Wh, { crumb: zh(e, r, t) }),
    /* @__PURE__ */ o("div", { className: U.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: _, className: U.headingWrap, children: /* @__PURE__ */ n(Ph, { title: r, chips: a, consequence: l, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ o("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(em, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ n(qh, { actions: s, hasMore: H, collapsed: E, onOverflow: u, disclosure: me }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Oh, { actions: je, disclosure: me, onEscape: re }),
    /* @__PURE__ */ n(Zh, { actions: s, hasMore: H, measureRef: k })
  ] });
}
const tm = "_root_td96x_2", nm = "_body_td96x_16", ia = {
  root: tm,
  body: nm
};
function gL({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${ia.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: ia.body, children: a }) });
}
const am = "_root_bf1pc_2", rm = "_table_bf1pc_9", lm = "_caption_bf1pc_14", om = "_series_bf1pc_23", im = "_category_bf1pc_31", sm = "_cell_bf1pc_39", cm = "_track_bf1pc_45", dm = "_lane_bf1pc_52", um = "_bar_bf1pc_56", hm = "_value_bf1pc_63", mm = "_swatch_bf1pc_70", wm = "_empty_bf1pc_78", Z = {
  root: am,
  table: rm,
  caption: lm,
  series: om,
  category: im,
  cell: sm,
  track: cm,
  lane: dm,
  bar: um,
  value: hm,
  swatch: mm,
  empty: wm
}, _m = "—", sa = 6;
function fm(e, t) {
  if (t.length < 1 || t.length > sa)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${sa}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function vm(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function hr(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function bm(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function pm({ value: e, top: t, step: a, format: r, missing: l }) {
  const i = bm(e, t), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ o("span", { className: Z.track, children: [
    /* @__PURE__ */ n("span", { className: Z.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${Z.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Z.value, children: e === null ? l : r(e) })
  ] }) });
}
function gm({ series: e }) {
  return /* @__PURE__ */ n(T, { children: e.map((t, a) => /* @__PURE__ */ o("th", { scope: "col", className: Z.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Z.swatch, "data-step": hr(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function ym({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${Z.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Z.empty, children: t })
  ] });
}
function Nm({ title: e, categories: t, series: a, top: r, format: l = ae, categoryHead: i = "Category", missing: s = _m }) {
  return /* @__PURE__ */ n("div", { className: `${Z.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: Z.table, children: [
    /* @__PURE__ */ n("caption", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Z.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(gm, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Z.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(pm, { value: u.values[d], top: r, step: hr(h, a.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function yL(e) {
  fm(e.categories, e.series);
  const t = vm(e.series);
  return t === 0 ? /* @__PURE__ */ n(ym, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Nm, { ...e, top: t });
}
const km = "_root_1bfqw_2", $m = "_figure_1bfqw_7", Cm = "_of_1bfqw_13", Sm = "_bar_1bfqw_18", Rm = "_rows_1bfqw_38", Tm = "_row_1bfqw_38", xm = "_label_1bfqw_49", Lm = "_amount_1bfqw_54", Be = {
  root: km,
  figure: $m,
  of: Cm,
  bar: Sm,
  rows: Rm,
  row: Tm,
  label: xm,
  amount: Lm
};
function Am({ spent: e, ceiling: t, breakdown: a }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Be.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Be.figure} ward-stat-value`, children: [
      oe(e),
      " ",
      /* @__PURE__ */ o("span", { className: Be.of, children: [
        "of ",
        oe(t)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Be.bar} ward-costbar`,
        min: 0,
        max: t,
        value: e,
        "aria-valuetext": `${oe(e)} of ${oe(t)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    a && /* @__PURE__ */ n("ul", { className: Be.rows, children: a.map((l) => /* @__PURE__ */ o("li", { className: `${Be.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Be.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: Be.amount, children: oe(l.amount) })
    ] }, l.label)) })
  ] });
}
const Em = "_frame_f7bxz_2", Im = "_table_f7bxz_6", Mm = "_th_f7bxz_12", jm = "_td_f7bxz_13", Bm = "_sort_f7bxz_53", Pm = "_row_f7bxz_65", qm = "_empty_f7bxz_73", De = {
  frame: Em,
  table: Im,
  th: Mm,
  td: jm,
  sort: Bm,
  row: Pm,
  empty: qm
}, Hm = { asc: "ascending", desc: "descending" };
function Om(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return Hm[t.direction];
}
function Dm(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: De.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function Fm(e) {
  return e === void 0 ? void 0 : { width: e };
}
function zm({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: De.th,
      style: Fm(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Om(e, t),
      children: Dm(e, a)
    }
  );
}
function Wm({ row: e, props: t }) {
  const a = t.rowId(e), r = (t.lockedIds ?? []).includes(a);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: De.row,
      "data-selected": a === t.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: t.columns.map((l) => /* @__PURE__ */ n(
        "td",
        {
          className: De.td,
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
function Km({
  label: e,
  columns: t,
  rows: a,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u,
  narrow: h
}) {
  return a.length === 0 ? /* @__PURE__ */ n("div", { className: De.empty, children: u }) : /* @__PURE__ */ n("div", { className: De.frame, "data-narrow": h, children: /* @__PURE__ */ o("table", { className: De.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: De.head, children: t.map((w) => /* @__PURE__ */ n(zm, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(Wm, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const Gm = "_list_v0s52_2", Um = {
  list: Gm
};
function Vm({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: Um.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const Jm = "_label_1u62a_2", Ym = {
  label: Jm
};
function NL({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: Ym.label, children: t.header }) }, t.key)) }) });
}
const Qm = "_stack_bp6a0_2", Xm = {
  stack: Qm
};
function kL({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Xm.stack, "data-ward-action-stack": "", children: e });
}
const Zm = "_set_1z0sq_2", ew = "_legend_1z0sq_7", tw = "_row_1z0sq_15", nw = "_control_1z0sq_20", aw = "_input_1z0sq_26", rw = "_label_1z0sq_31", lw = "_consequence_1z0sq_36", Ue = {
  set: Zm,
  legend: ew,
  row: tw,
  control: nw,
  input: aw,
  label: rw,
  consequence: lw
};
function mr({ legend: e, options: t, value: a, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = y(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: Ue.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: Ue.legend, children: e }),
    t.map((h) => {
      const w = `${u}-${h.value}`, _ = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Ue.row, children: [
        /* @__PURE__ */ o("span", { className: Ue.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: Ue.input,
              value: h.value,
              checked: a === h.value,
              disabled: l,
              "aria-describedby": it(_, s),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: w, className: Ue.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: _, className: `${Ue.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const ow = "_root_11gpw_2", iw = "_head_11gpw_10", sw = "_note_11gpw_29", cw = "_index_11gpw_34", dw = "_dot_11gpw_38", uw = "_counter_11gpw_49", hw = "_trailing_11gpw_57", Ve = {
  root: ow,
  head: iw,
  note: sw,
  index: cw,
  dot: dw,
  counter: uw,
  trailing: hw
};
function mw({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("span", { className: `${Ve.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ve.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function ww({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ve.counter, "aria-hidden": "true", children: e }) : null;
}
function ca({ title: e, index: t, note: a, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Ve.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Ve.head, children: [
      /* @__PURE__ */ n(mw, { index: t }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ve.note, children: a }),
    /* @__PURE__ */ n(ww, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ve.trailing, children: i })
  ] });
}
const _w = "_strip_c3x3u_2", fw = "_cell_c3x3u_7", vw = "_value_c3x3u_12", bw = "_link_c3x3u_29", pw = "_label_c3x3u_49", gw = "_tiles_c3x3u_101", We = {
  strip: _w,
  cell: fw,
  value: vw,
  link: bw,
  label: pw,
  tiles: gw
};
function wr(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const _r = (e) => `${We.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function yw({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: We.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: _r(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${We.label} ward-stat-label`, children: e.label })
  ] });
}
function Nw({ cell: e, href: t }) {
  return /* @__PURE__ */ o("div", { className: We.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: _r(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${We.link} ward-stat-link`, href: x(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${We.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const fr = (e) => e.href === void 0 ? /* @__PURE__ */ n(yw, { cell: e }, e.label) : /* @__PURE__ */ n(Nw, { cell: e, href: e.href }, e.label);
function Jt({ cells: e, divided: t = !1 }) {
  return wr("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${We.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(fr) });
}
const da = 6;
function $L({ cells: e }) {
  wr("StatTiles", e, [1, 2 * da]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, da) };
  return /* @__PURE__ */ n("dl", { className: `${We.tiles} ward-stattiles`, style: t, children: e.map(fr) });
}
const kw = "_root_1eb1u_2", $w = "_track_1eb1u_8", Cw = "_thumb_1eb1u_46", Sw = "_labelHidden_1eb1u_64", Rw = "_label_1eb1u_64", Tw = "_lockedNote_1eb1u_84", Je = {
  root: kw,
  track: $w,
  thumb: Cw,
  labelHidden: Sw,
  label: Rw,
  lockedNote: Tw
};
function xw(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function Lw(e) {
  return e ? `${Je.label} ${Je.labelHidden}` : Je.label;
}
function Aw(e, t, a) {
  return e && !t && a ? a : void 0;
}
function Ew(e, t, a, r) {
  return { "aria-describedby": Ut(it(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function Iw({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Qe({ label: e, checked: t, onChange: a, disabled: r, locked: l, describedBy: i, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, w = Me(), { on: _, off: N } = xw(t, r, l, w !== null), k = Aw(N, w !== null, c);
  return /* @__PURE__ */ o("span", { className: `${Je.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": _,
        "aria-label": e,
        "aria-labelledby": d,
        ...Ew(h, i, w, k),
        className: `${Je.track} ward-switch`,
        "data-on": _,
        "data-locked": l ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!_)),
        children: /* @__PURE__ */ n("span", { className: Je.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: d, htmlFor: u, className: Lw(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Je.lockedNote, children: "always on" })
    ] }),
    /* @__PURE__ */ n(Iw, { id: h, reason: k })
  ] });
}
const Mw = "_bar_1vp69_2", jw = "_skip_1vp69_11", Bw = "_mark_1vp69_22", Pw = "_nav_1vp69_30", qw = "_list_1vp69_34", Hw = "_select_1vp69_41", Ow = "_selectTrigger_1vp69_45", Dw = "_dest_1vp69_52", Fw = "_actor_1vp69_71", zw = "_actorMark_1vp69_84", Ww = "_actorLabel_1vp69_89", Kw = "_tagline_1vp69_108", se = {
  bar: Mw,
  skip: jw,
  mark: Bw,
  nav: Pw,
  list: qw,
  select: Hw,
  selectTrigger: Ow,
  dest: Dw,
  actor: Fw,
  actorMark: zw,
  actorLabel: Ww,
  tagline: Kw
};
function Gw(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function Uw(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function CL({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = Uw(r);
  return /* @__PURE__ */ o("header", { className: se.bar, children: [
    /* @__PURE__ */ n("a", { className: `${se.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: se.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: se.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: se.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: se.list, children: t.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${se.dest} ward-target`,
          href: x(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        Xa,
        {
          className: se.select,
          triggerClassName: se.selectTrigger,
          "aria-label": "Destination",
          value: a,
          options: t.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => i == null ? void 0 : i(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ o("span", { className: se.actor, children: [
      /* @__PURE__ */ n("span", { className: se.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: Gw(c) })
    ] })
  ] });
}
const Vw = "_tree_zzoob_2", Jw = "_item_zzoob_6", Yw = "_row_zzoob_10", Qw = "_button_zzoob_22", Ht = {
  tree: Vw,
  item: Jw,
  row: Yw,
  button: Qw
}, vr = ke(null);
function Xw({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Kt({ orientation: "vertical" });
  return /* @__PURE__ */ n(vr.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: Ht.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const Zw = { ArrowRight: !0, ArrowLeft: !1 };
function ua(e) {
  return e ? !0 : void 0;
}
function e_(e, t) {
  const a = Zw[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function t_(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function n_(e) {
  const t = [Ht.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function a_(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function r_(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function l_(e) {
  return typeof e == "string" ? e : void 0;
}
function o_({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function i_({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function br(e) {
  const t = Ne(vr);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = a_(e);
  return /* @__PURE__ */ o("li", { className: Ht.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: n_(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": ua(e.unresolved),
        "data-inherited": ua(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${Ht.button} ward-treeitem-btn`,
            onClick: () => t_(e),
            onKeyDown: (r) => e_(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: r_(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: l_(e.label), children: e.label }),
              /* @__PURE__ */ n(o_, { value: e.detail }),
              /* @__PURE__ */ n(i_, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const s_ = "_frame_gxspk_2", c_ = "_subjectRail_gxspk_22", d_ = "_subject_gxspk_22", u_ = "_rail_gxspk_42", h_ = "_record_gxspk_57", m_ = "_recordBody_gxspk_102", w_ = "_stageGrid_gxspk_157", __ = "_band_gxspk_171", f_ = "_bandBody_gxspk_179", v_ = "_bandActions_gxspk_184", b_ = "_scroller_gxspk_192", p_ = "_board_gxspk_219", g_ = "_lanes_gxspk_228", y_ = "_cardGrid_gxspk_262", ee = {
  frame: s_,
  subjectRail: c_,
  subject: d_,
  rail: u_,
  record: h_,
  recordBody: m_,
  stageGrid: w_,
  band: __,
  bandBody: f_,
  bandActions: v_,
  scroller: b_,
  board: p_,
  lanes: g_,
  cardGrid: y_
};
function SL({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: ee.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function ha(e) {
  return e ? "true" : void 0;
}
function RL({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: ee.subjectRail, "data-ward-subject-rail": a, "data-ruled": ha(i), children: [
    /* @__PURE__ */ n("div", { className: ee.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ee.rail, "data-sticky": ha(l), "aria-label": r, children: t })
  ] });
}
function TL({ title: e, children: t, note: a, trailing: r, pad: l = "block", label: i, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(ca, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ o("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(ca, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: ee.recordBody, "data-pad": l, "data-measure": c, children: t })
  ] });
}
const N_ = "_form_1j8ub_2", k_ = "_fields_1j8ub_9", $_ = "_actions_1j8ub_19", an = {
  form: N_,
  fields: k_,
  actions: $_
};
function xL({ label: e, children: t, actions: a, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: an.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: an.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: an.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function LL({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ o("section", { className: ee.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ee.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: ee.bandActions, children: t })
  ] });
}
const C_ = "(max-width: 767.98px)";
function Mn({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(Tn, { className: ee.scroller, label: e, count: a ?? Aa.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function S_({ lanes: e, label: t, laneLabel: a }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: ee.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(q, { kind: "select", label: a, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Mn, { label: t, children: i == null ? void 0 : i.content })
  ] });
}
function R_({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: ee.board, "data-ward-board": "", children: /* @__PURE__ */ n(Mn, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(La, { children: a.content }, a.id)) }) });
}
function AL({ children: e, label: t = "Workflow board", lanes: a, laneLabel: r = "Column" }) {
  const l = ft(C_);
  return a === void 0 ? /* @__PURE__ */ n(Mn, { label: t, children: e }) : l ? /* @__PURE__ */ n(S_, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(R_, { lanes: a, label: t });
}
function EL({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), i = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ n(Tn, { className: ee.stageGrid, label: a, count: l, "data-ward-stage-grid": "", "data-floor": r, style: i, children: t });
}
function IL({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${ee.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const T_ = "_block_6tv5x_3", x_ = "_sentence_6tv5x_10", L_ = "_meta_6tv5x_19", A_ = "_ways_6tv5x_24", E_ = "_action_6tv5x_38", I_ = "_strip_6tv5x_42", M_ = "_loading_6tv5x_61", j_ = "_label_6tv5x_69", B_ = "_counter_6tv5x_76", ve = {
  block: T_,
  sentence: x_,
  meta: L_,
  ways: A_,
  action: E_,
  strip: I_,
  loading: M_,
  label: j_,
  counter: B_
};
function P_({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: ve.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function Yt({ sentence: e, action: t, children: a, role: r = "status", tone: l, kind: i, ask: s }) {
  return /* @__PURE__ */ o("div", { className: `${ve.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ o("p", { className: ve.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ o(T, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(P_, { action: t })
  ] });
}
function q_(e) {
  return /* @__PURE__ */ n(Yt, { ...e, kind: "ward-emptystate" });
}
function ML({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(Yt, { sentence: e, action: a, children: /* @__PURE__ */ o("p", { className: ve.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function H_({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${ve.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function jL({ ways: e, ...t }) {
  return /* @__PURE__ */ n(Yt, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(H_, { ways: e }) });
}
function BL({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(Yt, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ o("p", { className: ve.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function PL({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ o("div", { className: ve.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function qL({ queued: e, since: t }) {
  return /* @__PURE__ */ o("div", { className: ve.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function HL({ label: e, startedAt: t }) {
  const a = f(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  S(() => {
    const s = window.setTimeout(() => l(!0), pe.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = Sn(a.current, r);
  return /* @__PURE__ */ o("div", { className: `${ve.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: ve.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: ve.counter, children: $n(i) }) : null
  ] });
}
const O_ = "_note_cigdt_2", D_ = {
  note: O_
};
function F_({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ o("p", { className: D_.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const z_ = "_card_k7btg_3", W_ = "_hit_k7btg_31", K_ = "_head_k7btg_44", G_ = "_title_k7btg_51", U_ = "_meta_k7btg_57", V_ = "_since_k7btg_66", J_ = "_sep_k7btg_76", Y_ = "_fields_k7btg_80", Q_ = "_field_k7btg_80", X_ = "_last_k7btg_98", Z_ = "_reason_k7btg_110", de = {
  card: z_,
  hit: W_,
  head: K_,
  title: G_,
  meta: U_,
  since: V_,
  sep: J_,
  fields: Y_,
  field: Q_,
  last: X_,
  reason: Z_
}, ef = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function tf(e, t, a) {
  const r = At(e, "blue"), l = At(e, "orange"), i = At(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: l, green: i };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = ef[d.type];
      u && c[u]();
    });
  }, [r, a, i, t, l]);
}
const nf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : oe(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function af(e, t) {
  return nf[t](e);
}
function rf({ item: e, connection: t }) {
  const a = /* @__PURE__ */ n("span", { className: de.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ o("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    a,
    /* @__PURE__ */ n(Ie, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.waitsOn,
    a,
    /* @__PURE__ */ o("span", { className: de.since, children: [
      ue(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function lf({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function of({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function sf({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: de.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: de.field, children: af(e, a) }, a)) });
}
const fn = (e) => e ? !0 : void 0;
function cf(e) {
  return { "--stream": ye(e.streamStep, "id") };
}
function df(e, t, a) {
  e == null || e(t, a);
}
function uf(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function hf({ item: e, stale: t }) {
  var r, l;
  const a = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: de.last, "data-stale": fn(t), children: a }) : null;
}
function Qt(e) {
  const t = e.fields ?? [], a = e.item, r = f(null);
  tf(r, a.key, e.feed);
  const l = uf(e.feed), i = cf(a);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: de.card,
      style: i,
      "data-selected": fn(e.selected),
      "data-flagged": fn(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: de.hit, onClick: (s) => df(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(lf, { item: a }),
        /* @__PURE__ */ n(ot, { as: "p", className: de.title, text: a.title }),
        /* @__PURE__ */ n(rf, { item: a, connection: l }),
        /* @__PURE__ */ n(of, { reason: a.blockedReason }),
        /* @__PURE__ */ n(sf, { item: a, fields: t }),
        /* @__PURE__ */ n(hf, { item: a, stale: l === "stale" })
      ]
    }
  );
}
const mf = "_column_1j8bi_3", wf = "_head_1j8bi_21", _f = "_label_1j8bi_30", ff = "_count_1j8bi_39", vf = "_list_1j8bi_53", wt = {
  column: mf,
  head: wf,
  label: _f,
  count: ff,
  list: vf
};
function pr(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function bf({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ o("div", { className: wt.head, children: [
    /* @__PURE__ */ n("h2", { className: wt.label, id: a, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: wt.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function pf(e) {
  return /* @__PURE__ */ n("div", { className: wt.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      Qt,
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
function gf({ column: e, items: t, fields: a, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && t.length > e.cap, w = pr(t, r);
  return /* @__PURE__ */ o("section", { className: wt.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(bf, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(pf, { column: e, items: t, fields: a, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n(F_, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const yf = "_foot_cs4jr_2", Nf = "_note_cs4jr_13", kf = "_link_cs4jr_19", rn = {
  foot: yf,
  note: Nf,
  link: kf
};
function OL({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: rn.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: rn.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${rn.link} ward-target`, href: x(e), children: "Configure board" })
  ] });
}
const $f = "_head_1tfi5_3", Cf = "_identity_1tfi5_12", Sf = "_titleRow_1tfi5_18", Rf = "_title_1tfi5_18", Tf = "_key_1tfi5_35", xf = "_rollup_1tfi5_45", Lf = "_tools_1tfi5_53", Af = "_swatch_1tfi5_101", Ef = "_mark_1tfi5_108", Re = {
  head: $f,
  identity: Cf,
  titleRow: Sf,
  title: Rf,
  key: Tf,
  rollup: xf,
  tools: Lf,
  swatch: Af,
  mark: Ef
}, ma = "initials:";
function If(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Mf(e) {
  const t = [If(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function jf(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Mf(e)
  ] });
}
function Bf(e) {
  return e.startsWith(ma) ? e.slice(ma.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function Pf({ markRef: e, streamStep: t }) {
  const a = { "--stream": ye(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Re.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: Bf(e) }) : /* @__PURE__ */ n("span", { className: Re.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function qf({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function DL({
  stream: e,
  rollups: t,
  connection: a,
  lastEventAt: r,
  owners: l,
  owner: i,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ o("div", { className: Re.head, children: [
    /* @__PURE__ */ o("div", { className: Re.identity, children: [
      /* @__PURE__ */ o("div", { className: Re.titleRow, children: [
        /* @__PURE__ */ n(Pf, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Re.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Re.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Re.rollup, "aria-live": "polite", children: jf(t) })
    ] }),
    /* @__PURE__ */ o("div", { className: Re.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(qf, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(In, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const Hf = "_head_1sejb_14", Of = "_line_1sejb_15", Df = "_cHandle_1sejb_36", Ff = "_cName_1sejb_41", zf = "_nameLine_1sejb_49", Wf = "_cLabel_1sejb_56", Kf = "_cCap_1sejb_61", Gf = "_cShown_1sejb_66", Uf = "_name_1sejb_49", Vf = "_noCap_1sejb_88", Jf = "_state_1sejb_102", Yf = "_handle_1sejb_111", Qf = "_sub_1sejb_137", O = {
  head: Hf,
  line: Of,
  cHandle: Df,
  cName: Ff,
  nameLine: zf,
  cLabel: Wf,
  cCap: Kf,
  cShown: Gf,
  name: Uf,
  noCap: Vf,
  state: Jf,
  handle: Yf,
  sub: Qf
}, Xf = "can't be hidden or collapsed", Zf = "terminal · counted, not a column", ev = "A human gate is always shown, so people see what waits for them.", tv = "A terminal stage is counted, not shown as a column.";
function FL() {
  return /* @__PURE__ */ o("div", { className: O.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: O.cHandle }),
    /* @__PURE__ */ n("span", { className: O.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: O.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: O.cShown, children: "Shown" })
  ] });
}
function nv(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function av(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function wa(e) {
  return e.gate ? Xf : e.terminal ? Zf : av(e.agentsMounted);
}
function rv(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function lv({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: O.cName, children: [
    /* @__PURE__ */ o("span", { className: O.nameLine, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    wa(e) && /* @__PURE__ */ n("span", { className: O.sub, children: wa(e) })
  ] });
}
function ov(e) {
  return e === void 0 ? "" : String(e);
}
function iv(e) {
  return e === "" ? void 0 : Number(e);
}
function sv({ name: e, onReorder: t }) {
  const a = Me();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ n("span", { className: O.cHandle }) : /* @__PURE__ */ n("span", { className: O.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: O.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && rv(r, t),
      children: "⠿"
    }
  ) });
}
function cv({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${O.cCap} ${O.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: O.cCap, children: /* @__PURE__ */ n(q, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: ov(t.cap), onChange: (r) => a({ ...t, cap: iv(r) }) }) });
}
function dv(e) {
  return e.gate ? ev : e.terminal ? tv : void 0;
}
function uv({ stage: e, config: t, onChange: a }) {
  const r = Me() !== null, l = nv(e, t.shown), i = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ o("span", { className: O.cShown, children: [
    /* @__PURE__ */ n(Qe, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, disabledReason: dv(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: O.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function hv(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function zL({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: O.line, "data-kind": hv(e), children: [
    /* @__PURE__ */ n(sv, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(lv, { stage: e }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: /* @__PURE__ */ n(q, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (l) => a({ ...t, label: l }) }) }),
    /* @__PURE__ */ n(cv, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(uv, { stage: e, config: t, onChange: a })
  ] });
}
const mv = "_body_8qsv9_2", wv = "_head_8qsv9_9", _v = "_summary_8qsv9_19", fv = "_block_8qsv9_20", vv = "_actionsBlock_8qsv9_21", bv = "_title_8qsv9_41", pv = "_note_8qsv9_46", gv = "_k_8qsv9_51", yv = "_kv_8qsv9_58", Nv = "_row_8qsv9_64", kv = "_label_8qsv9_75", $v = "_value_8qsv9_84", Cv = "_quote_8qsv9_90", Sv = "_actions_8qsv9_21", Rv = "_resolve_8qsv9_111", F = {
  body: mv,
  head: wv,
  summary: _v,
  block: fv,
  actionsBlock: vv,
  title: bv,
  note: pv,
  k: gv,
  kv: yv,
  row: Nv,
  label: kv,
  value: $v,
  quote: Cv,
  actions: Sv,
  resolve: Rv
};
function Tv(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function xv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Ie, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Lv(e) {
  const t = gt(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function Av(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function Ev(e, t, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Vt(Lv(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Tv(e),
    ...Av(a),
    ...xv(e, t)
  ];
}
function Iv({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: F.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: F.k, children: t }),
    e
  ] });
}
function Mv(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function jv({ item: e, showKey: t }) {
  const a = Mv(e);
  return !t && !a ? null : /* @__PURE__ */ o("div", { className: F.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Bv({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: F.block, children: [
    /* @__PURE__ */ n("p", { className: F.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: F.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: F.note, children: e.agentMeta })
  ] }) : null;
}
function WL({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), w = Ev(e, l, d);
  return /* @__PURE__ */ n(st, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: F.body, children: [
    /* @__PURE__ */ n(jv, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: F.summary, children: [
      /* @__PURE__ */ n("h2", { className: F.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: F.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: F.kv, children: w.map(([_, N, k]) => /* @__PURE__ */ o("div", { className: F.row, children: [
      /* @__PURE__ */ n("dt", { className: F.label, children: _ }),
      /* @__PURE__ */ n("dd", { className: F.value, children: N })
    ] }, k ?? _)) }),
    /* @__PURE__ */ n(Bv, { item: e }),
    /* @__PURE__ */ o("div", { className: F.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: F.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: F.note, children: c })
    ] }),
    /* @__PURE__ */ n(Iv, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Pv = "_root_3azmy_2", qv = "_list_3azmy_7", Hv = "_item_3azmy_12", Ov = "_box_3azmy_18", Dv = "_text_3azmy_23", Fv = "_note_3azmy_28", Ze = {
  root: Pv,
  list: qv,
  item: Hv,
  box: Ov,
  text: Dv,
  note: Fv
};
function Xt({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ o("div", { className: Ze.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${Ze.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ze.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ze.box, children: /* @__PURE__ */ n(En, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Ze.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${Ze.note} ward-checklist-note`, children: t })
  ] });
}
const zv = "_rail_znbbp_2", Wv = "_k_znbbp_11", Kv = "_head_znbbp_19", Gv = "_section_znbbp_25", Uv = "_card_znbbp_39", Vv = "_strip_znbbp_46", Jv = "_skeleton_znbbp_60", Yv = "_skeletonLabel_znbbp_74", Qv = "_bar_znbbp_80", Xv = "_note_znbbp_89", _e = {
  rail: zv,
  k: Wv,
  head: Kv,
  section: Gv,
  card: Uv,
  strip: Vv,
  skeleton: Jv,
  skeletonLabel: Yv,
  bar: Qv,
  note: Xv
};
function Zv(e) {
  return (t) => e == null ? void 0 : e(t);
}
function ln({ title: e, children: t }) {
  return /* @__PURE__ */ o("section", { className: _e.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: _e.k, children: e }),
    t
  ] });
}
function eb({ column: e, count: t }) {
  return /* @__PURE__ */ o("div", { className: _e.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: _e.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: _e.bar, "aria-hidden": "true" }, r))
  ] });
}
function tb({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(gf, { column: l, items: t.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, l.id));
}
function nb(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(tb, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(eb, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function KL(e) {
  const t = Zv(e.onOpen), a = pr(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: _e.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${_e.k} ${_e.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(ln, { title: "Card", children: /* @__PURE__ */ n("div", { className: _e.card, children: a && /* @__PURE__ */ n(Qt, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ o(ln, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: _e.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(nb, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: _e.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(ln, { title: "Effect of this config", children: /* @__PURE__ */ n(Xt, { items: e.effects, density: "compact" }) })
  ] });
}
function ab(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function rb(e) {
  return Math.ceil(e.length / 2);
}
function lb(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function gr(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function ob(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const l = gr(e);
  l !== void 0 && a(l), r(lb(e.type));
}
function ib(e, t, a, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (i) => ob(i, a, r, l));
  }, [e, t, a, r, l]);
}
function sb(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function cb(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function db(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function ub(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + B.height.card + " + " + B.height.cardRow + " * " + String(rb(t ?? [])) + ")"
  };
}
function hb(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function mb(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: oe(e.cost) }) : null;
}
function wb(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function _b(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Ie, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function fb(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function vb(e, t) {
  return t === void 0 ? e : ab(e, t.ref);
}
function bb(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function vt(e) {
  return e === !0 ? "true" : void 0;
}
function yr(e) {
  const t = e.item, a = t.run, r = a !== void 0, l = f(null), i = At(l), s = f(/* @__PURE__ */ new Set()), [c, d] = p(sb(t));
  ib(e.feed, t.key, s, d, i);
  const u = cb(t, r), h = db(t, a), w = ub(t, e.fields), _ = fb(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...bb(e),
      className: "ward-workcard",
      "data-flagged": vt(t.flagged),
      "data-selected": vt(e.selected),
      style: w,
      ref: vb(l, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        hb(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          mb(t, e.fields),
          wb(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          _b(a, c, e.connection, t.changedAt),
          _ !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: _, children: _ }) : null
        ] })
      ]
    }
  ) });
}
function pb({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function gb(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function yb(e, t, a) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function Nb(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(pb, { count: e.items.length, cap: e.column.cap });
}
function kb(e, t) {
  return e.roving ?? t;
}
function $b(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function Cb(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    yr,
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
function Sb(e) {
  const t = y(), a = Kt({ orientation: "vertical" }), r = kb(e, a), l = gb(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": vt(l), "data-gate": vt(e.column.gate), children: [
    yb(e.column, e.items.length, t),
    Nb(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...$b(e, a), children: Cb(e, r) })
  ] });
}
function Rb(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function Tb(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function xb(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function GL(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Rb(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Tb(e),
      xb(e.onConfigure),
      /* @__PURE__ */ n(In, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Lb(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Ab(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Qe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Qe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function Eb(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function UL(e) {
  const t = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": vt(Lb(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Ab(e) }),
    /* @__PURE__ */ n(q, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(Wa, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Eb(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function VL(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(yr, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Sb, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function Ib(e, t) {
  const a = gr(e);
  a !== void 0 && t(a);
}
function Mb(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => Ib(r, a));
  }, [e, t, a]);
}
function jb(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function Bb(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", oe(e.cost)]), t;
}
function Pb(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Ie, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function qb(e, t) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function JL(e) {
  var s;
  const t = e.item, a = t.run, [r, l] = p((s = t.run) == null ? void 0 : s.lastStep);
  Mb(e.feed, t.key, l);
  const i = [...jb(t), ...Bb(t)];
  return /* @__PURE__ */ o(st, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Pb(a, r)
    ] }),
    qb(t, e.actions)
  ] });
}
const Hb = "_card_1nkkx_3", Ob = "_head_1nkkx_30", Db = "_mark_1nkkx_38", Fb = "_name_1nkkx_50", zb = "_chips_1nkkx_71", Wb = "_description_1nkkx_77", Kb = "_run_1nkkx_82", Gb = "_sep_1nkkx_91", Ub = "_facts_1nkkx_97", Vb = "_fact_1nkkx_97", Jb = "_factLabel_1nkkx_111", Yb = "_factValue_1nkkx_115", ie = {
  card: Hb,
  head: Ob,
  mark: Db,
  name: Fb,
  chips: zb,
  description: Wb,
  run: Kb,
  sep: Gb,
  facts: Ub,
  fact: Vb,
  factLabel: Jb,
  factValue: Yb
}, Qb = { live: "done", draft: "running", paused: "meta" };
function Xb(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function Zb({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: Qb[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function ep({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function tp({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Ie, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function np({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ o("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function ap(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function rp({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": ye(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: Xb(s),
      style: c,
      "data-selected": d,
      "data-paused": ap(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: x(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(ep, { description: e.description }),
        /* @__PURE__ */ n(tp, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(Zb, { versions: e.versions }),
        /* @__PURE__ */ n(np, { facts: i })
      ]
    }
  );
}
const lp = "_list_4dcyc_2", op = "_row_4dcyc_11", ip = "_head_4dcyc_23", sp = "_id_4dcyc_30", cp = "_lock_4dcyc_35", dp = "_reason_4dcyc_41", up = "_remove_4dcyc_46", hp = "_clauses_4dcyc_50", mp = "_clause_4dcyc_50", wp = "_label_4dcyc_64", _p = "_cell_4dcyc_71", fp = "_value_4dcyc_76", ce = {
  list: lp,
  row: op,
  head: ip,
  id: sp,
  lock: cp,
  reason: dp,
  remove: up,
  clauses: hp,
  clause: mp,
  label: wp,
  cell: _p,
  value: fp
}, Nr = ke(!1);
function YL({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(Nr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function vp({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(q, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => a(e.key, l) });
}
function bp({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function pp({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ o("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(bp, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function _a(e, t) {
  return e.locked ? void 0 : t;
}
function QL({ rule: e, onChange: t, onRemove: a }) {
  if (!Ne(Nr)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = _a(e, t);
  return /* @__PURE__ */ o("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(pp, { rule: e, onRemove: _a(e, a) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(vp, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const gp = "_ladder_1xdeh_2", yp = "_cell_1xdeh_7", Np = "_empty_1xdeh_26", kp = "_name_1xdeh_34", $p = "_holder_1xdeh_40", Cp = "_request_1xdeh_46", Sp = "_swatches_1xdeh_51", Rp = "_swatch_1xdeh_51", Tp = "_tilesFrame_1xdeh_78", xp = "_tiles_1xdeh_78", Lp = "_tile_1xdeh_78", Ap = "_bar_1xdeh_117", Ep = "_hex_1xdeh_128", Ip = "_note_1xdeh_138", j = {
  ladder: gp,
  cell: yp,
  empty: Np,
  name: kp,
  holder: $p,
  request: Cp,
  swatches: Sp,
  swatch: Rp,
  tilesFrame: Tp,
  tiles: xp,
  tile: Lp,
  bar: Ap,
  hex: Ep,
  note: Ip
}, XL = "not validated yet, pending a CVD matrix and dark stepping";
function Mp(e) {
  return e.reserved ? "reserved" : bt(e.step) ? "validated" : "partial";
}
function kr(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function jp(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Bp({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ke, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${j.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Pp(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function qp(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const fa = (e) => String(e).padStart(2, "0");
function Hp(e, t, a) {
  return e === "reserved" ? "Reserved until revalidated" : a ? "yours" : t ?? kr(e, void 0);
}
function Op({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("span", { className: `${j.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${j.hex} ward-ladder-hex`, children: r ? `step ${fa(e)}` : Bl(e) }),
    /* @__PURE__ */ n("span", { className: `${j.note} ward-ladder-note`, children: r ? a : `Step ${fa(e)} · ${a}` })
  ] });
}
function Dp({ step: e, value: t, taken: a, onChange: r, presentation: l, disabled: i }) {
  const s = Mp(e), c = kr(s, a), d = c !== "free", u = d || i, h = t === e.step, w = e.name ?? `Step ${e.step}`, _ = () => {
    u || r(e.step);
  }, N = `${w} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...qp(d, h, u), "data-validation": s, style: jp(e, s), onClick: _, onKeyDown: (E) => Pp(E, _) }, label: N, name: w, holder: c, validation: s, note: Hp(s, a, h), step: e.step };
}
const Fp = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${j.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${j.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Op, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${j.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Bp, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${j.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${j.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function zp(e) {
  return Fp[e.presentation](Dp(e));
}
function Wp(e) {
  for (const t of e)
    if (!t.reserved && !Gt(t.step)) throw new Error("colour ladder renders token steps only");
}
function Kp() {
  return /* @__PURE__ */ o("div", { className: `${j.cell} ward-ladder-cell ${j.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${j.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${j.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${j.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Gp(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Up = { list: j.ladder, swatches: j.swatches, tiles: j.tilesFrame };
function Vp() {
  return /* @__PURE__ */ o("div", { className: `${j.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${j.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${j.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${j.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Jp = { list: Kp, swatches: () => null, tiles: Vp };
function Yp(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function $r(e) {
  const t = e.takenBy ?? {}, a = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Wp(e.steps);
  const r = Gp(e), l = Jp[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(zp, { step: s, value: e.value, taken: t[s.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Yp(e.disabled === !0), className: `${Up[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: j.tiles, children: i }) : i });
}
const Qp = "_rail_s06lm_2", Xp = "_section_s06lm_12", Zp = "_sectionFlush_s06lm_22", eg = "_head_s06lm_26", tg = "_headLabel_s06lm_34", ng = "_sample_s06lm_42", ag = "_sampleLabel_s06lm_47", rg = "_sampleTitle_s06lm_54", lg = "_sampleMeta_s06lm_59", og = "_trace_s06lm_65", ig = "_traceHead_s06lm_70", sg = "_steps_s06lm_78", cg = "_step_s06lm_78", dg = "_stepTitle_s06lm_97", ug = "_hollow_s06lm_107", hg = "_stepBody_s06lm_115", mg = "_stepDetail_s06lm_127", wg = "_publish_s06lm_132", _g = "_reason_s06lm_138", fg = "_note_s06lm_143", vg = "_reveal_s06lm_148", $ = {
  rail: Qp,
  section: Xp,
  sectionFlush: Zp,
  head: eg,
  headLabel: tg,
  sample: ng,
  sampleLabel: ag,
  sampleTitle: rg,
  sampleMeta: lg,
  trace: og,
  traceHead: ig,
  steps: sg,
  step: cg,
  stepTitle: dg,
  hollow: ug,
  stepBody: hg,
  stepDetail: mg,
  publish: wg,
  reason: _g,
  note: fg,
  reveal: vg
}, va = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, bg = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, pg = { ok: "greenFill", finding: "orangeFill", action: "blue" }, gg = { notSimulated: "not simulated", running: "running" };
function yg(e) {
  return e.presentation === "foundry";
}
function Ng(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const a = t.filter((r) => !r.met);
  return a.length > 0 ? `Publish is disabled: ${a.length} of ${t.length} gate conditions unmet: ${a[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function kg(e, t) {
  var r;
  const a = bg[e.status];
  return a !== void 0 ? a : ((r = t.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function $g(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Cg(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Sg(e) {
  if ($g(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Rg(e) {
  const [t, a] = p(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Tg(e) {
  const t = gg[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(Ke, { size: 6, kind: pg[e.kind], label: e.kind });
}
function xg(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Lg(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Ie, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Ag(e) {
  const { step: t } = e;
  return /* @__PURE__ */ o(Rg, { kind: t.kind, children: [
    /* @__PURE__ */ n(Tg, { kind: t.kind }),
    /* @__PURE__ */ o("span", { className: $.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: $.stepTitle, children: t.title }),
      /* @__PURE__ */ n(xg, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Lg, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function Eg(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(ue(t)), a.join(" · ");
}
function Cr(e) {
  const t = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.traceHead, id: t, children: Eg(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: $.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(Ag, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function Ig(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ o("div", { className: `${$.sample} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ o("p", { className: $.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ o("p", { className: $.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function Mg(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function jg(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : oe(e.run.cost), label: "Cost" }, { value: e.run.turns ? Ia(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Jt, { divided: !0, cells: t }) });
}
function Bg(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: oe(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: Ia(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function Pg(e) {
  const t = Bg(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ o("p", { className: $.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Jt, { divided: !0, cells: t }) });
}
function Sr(e) {
  const t = y();
  return e.reason !== null ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("p", { className: `${$.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function qg(e) {
  return /* @__PURE__ */ o("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ n(Sr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: $.note, children: e.note })
  ] });
}
function Hg(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ n(Sr, { reason: e.reason, onPublish: e.onPublish }) });
}
function Rr(e) {
  return /* @__PURE__ */ o("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: va[e.run.status].role, label: va[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Ie, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Og(e, t) {
  const [a, r] = p(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((t == null ? void 0 : t.subscribe) === void 0 || e.status !== "running"))
      return t.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [t, e.status]), a;
}
function Dg(e) {
  var a;
  Cg(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Rr, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(Ig, { sample: e.run.sample }),
    /* @__PURE__ */ n(Cr, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(jg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Xt, { items: e.checklist }) }),
    /* @__PURE__ */ n(qg, { reason: Ng(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Fg(e) {
  var r;
  const t = Og(e.run, e.feed);
  Sg(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Rr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(Mg, { sample: e.run.sample }),
    /* @__PURE__ */ n(Cr, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(Pg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Xt, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Hg, { reason: kg(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function ZL(e) {
  return yg(e) ? /* @__PURE__ */ n(Fg, { ...e }) : /* @__PURE__ */ n(Dg, { ...e });
}
const zg = "_list_142ip_3", Wg = "_row_142ip_9", Kg = "_condition_142ip_18", Gg = "_action_142ip_24", It = {
  list: zg,
  row: Wg,
  condition: Kg,
  action: Gg
}, Tr = ke(!1);
function eA({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(Tr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: It.list, "aria-label": t, children: e }) });
}
function tA({ rule: e }) {
  if (!Ne(Tr)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: It.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: It.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: It.action, children: e.then })
  ] });
}
const Ug = "_move_tmppt_3", Vg = {
  move: Ug
};
function vn(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [l] = r.splice(t, 1);
  return r.splice(a, 0, l), r;
}
function xr(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function Lr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function ba(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function Jg(e) {
  return e === "up" ? "down" : "up";
}
function Yg(e, t) {
  const a = ba(e, t.id, t.direction) ?? ba(e, t.id, Jg(t.direction));
  a == null || a.focus();
}
function Ar() {
  const e = f(null), [t, a] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && t !== null && Yg(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), l(c);
  } };
}
function Er({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Ot({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${Vg.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const Qg = "_body_1jd1i_2", Xg = "_title_1jd1i_8", Zg = "_section_1jd1i_13", ey = "_legend_1jd1i_18", ty = "_stages_1jd1i_26", ny = "_stage_1jd1i_26", ay = "_stageIndex_1jd1i_44", ry = "_stageName_1jd1i_50", ly = "_footer_1jd1i_59", oy = "_note_1jd1i_66", iy = "_reason_1jd1i_71", sy = "_actions_1jd1i_76", cy = "_webHead_1jd1i_83", dy = "_kicker_1jd1i_92", uy = "_webTitle_1jd1i_99", hy = "_webBody_1jd1i_105", my = "_webSection_1jd1i_109", wy = "_sectionHead_1jd1i_121", _y = "_sectionNote_1jd1i_129", fy = "_formLabel_1jd1i_134", vy = "_identityRow_1jd1i_139", by = "_nameCell_1jd1i_145", py = "_keyCell_1jd1i_150", gy = "_colourCell_1jd1i_154", yy = "_colourStatus_1jd1i_161", Ny = "_webStages_1jd1i_166", ky = "_webStageList_1jd1i_172", $y = "_webStage_1jd1i_166", Cy = "_webIndex_1jd1i_191", Sy = "_webStageName_1jd1i_196", Ry = "_webMoves_1jd1i_201", Ty = "_addStage_1jd1i_215", xy = "_addStageButton_1jd1i_223", Ly = "_addStageNote_1jd1i_231", Ay = "_webFooter_1jd1i_236", Ey = "_webFooterNotes_1jd1i_244", Iy = "_webNote_1jd1i_251", v = {
  body: Qg,
  title: Xg,
  section: Zg,
  legend: ey,
  stages: ty,
  stage: ny,
  stageIndex: ay,
  stageName: ry,
  footer: ly,
  note: oy,
  reason: iy,
  actions: sy,
  webHead: cy,
  kicker: dy,
  webTitle: uy,
  webBody: hy,
  webSection: my,
  sectionHead: wy,
  sectionNote: _y,
  formLabel: fy,
  identityRow: vy,
  nameCell: by,
  keyCell: py,
  colourCell: gy,
  colourStatus: yy,
  webStages: Ny,
  webStageList: ky,
  webStage: $y,
  webIndex: Cy,
  webStageName: Sy,
  webMoves: Ry,
  addStage: Ty,
  addStageButton: xy,
  addStageNote: Ly,
  webFooter: Ay,
  webFooterNotes: Ey,
  webNote: Iy
}, My = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Ir = "not in catalogue";
function jy(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${Ir}` }, ...a];
}
function By({ stage: e, index: t, catalogue: a, onName: r }) {
  const l = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(q, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Ir}`;
  return /* @__PURE__ */ n(q, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: jy(a, e.name), invalid: i, onChange: r });
}
function Mr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function Py(e) {
  const t = f([]), a = f(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function qy({ id: e, stage: t, index: a, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Mr(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: v.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: v.webStageName, children: /* @__PURE__ */ n(By, { stage: t, index: a, catalogue: l, onName: (u) => i({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(q, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: My, onChange: (u) => i({ ...t, kind: u }) }),
    /* @__PURE__ */ o("span", { className: v.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(Ot, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(Ot, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Hy({ stages: e, onChange: t, catalogue: a }) {
  const r = Py(e.length), l = Ar(), i = (c, d) => {
    const u = xr(c, d);
    r.current = vn(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Lr(Mr(e[c], c), u, e.length)), t(vn(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: v.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(qy, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(Er, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: v.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Oy = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Dy = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Fy = "A new stream starts as a draft. Nothing runs on it until you publish it.", zy = "Create is disabled: name the stream and give it a key first.", Wy = "reorder with the ↑ ↓ buttons · min 2";
function jn(e, t) {
  return !e.reserved && bt(e.step) && t[e.step] === void 0;
}
function Ky(e, t) {
  const a = e.find((r) => jn(r, t));
  return a ? a.step : 1;
}
function Gy({ stages: e, onMove: t }) {
  const a = Ar(), r = (l, i) => {
    const s = xr(l, i);
    a.moved({ id: e[l].id, direction: i }, Lr(e[l].name, s, e.length)), t(l, s);
  };
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: v.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: v.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: v.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(Ot, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(Ot, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(Er, { text: a.announcement })
  ] });
}
function Uy({ reason: e, onCreate: t, onDraft: a }) {
  const r = y();
  return /* @__PURE__ */ o("div", { className: v.footer, children: [
    /* @__PURE__ */ n("p", { className: v.note, children: Fy }),
    e && /* @__PURE__ */ n("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: v.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function Vy(e, t) {
  return e !== "" && t !== "" ? null : zy;
}
function Jy(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: l = Dy, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = y(), [h, w] = p(""), [_, N] = p(""), [k, E] = p(t[0].value), [H, me] = p(() => Ky(a, r)), [re, je] = p(e.stages ?? Oy), [Xe, L] = p(l[0].value), Y = { name: h, key: _, streamStep: H, owner: k, stages: re, policy: Xe }, $e = Vy(h, _);
  return /* @__PURE__ */ n(st, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: v.body, children: [
    /* @__PURE__ */ n("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ n(q, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ n(q, { kind: "input", label: "Key", value: _, onChange: N, mono: !0 }),
      /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: k, onChange: E, options: t })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ n($r, { label: "Stream colour", steps: a, value: H, onChange: me, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ n(Gy, { stages: re, onMove: (Ge, wl) => je(vn(re, Ge, wl)) })
    ] }),
    /* @__PURE__ */ n(mr, { legend: "Loop policy", options: l, value: Xe, onChange: L }),
    /* @__PURE__ */ n(Uy, { reason: $e, onCreate: () => i(Y), onDraft: () => s(Y) })
  ] }) });
}
const jr = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Yy = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Qy(e, t, a, r, l, i) {
  var c;
  const s = ((c = jr.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: i };
}
function Xy(e, t) {
  return Zy(e) && eN(e, t) && tN(e);
}
function Zy(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function eN(e, t) {
  return e.colourStep === null || jn({ step: e.colourStep }, t);
}
function tN(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function nN(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : jn({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function aN({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function rN({ ready: e, draft: t, agentStage: a, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: v.webFooter, children: [
    /* @__PURE__ */ o("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ n(aN, { stage: a }),
      !e && /* @__PURE__ */ n("p", { id: i, className: v.reason, children: Yy })
    ] }),
    l && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => l(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function lN({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: v.webHead, children: [
    /* @__PURE__ */ n("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function oN({ name: e, setName: t, streamKey: a, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: v.webSection, children: [
    /* @__PURE__ */ n("h3", { className: v.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: v.identityRow, children: [
      /* @__PURE__ */ n("div", { className: v.nameCell, children: /* @__PURE__ */ n(q, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ n("div", { className: v.keyCell, children: /* @__PURE__ */ n(q, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function iN(e) {
  const t = y(), a = y(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [_, N] = p("relay"), [k, E] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), H = Qy(l, s, d, h, _, k), me = Xy(H, r), re = k.find((L) => L.kind === "agent" && L.name.trim() !== ""), je = /* @__PURE__ */ o("div", { className: v.colourCell, children: [
    /* @__PURE__ */ n("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ n($r, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Xe = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("p", { className: v.colourStatus, "data-colour-status": "", children: nN(h, r) }),
    /* @__PURE__ */ n(q, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((L) => ({ value: L, label: L })), onChange: u })
  ] });
  return /* @__PURE__ */ o(st, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(lN, { titleId: a }),
    /* @__PURE__ */ o("div", { className: v.webBody, children: [
      /* @__PURE__ */ n(oN, { name: l, setName: i, streamKey: s, setKey: c, colour: je, owner: Xe }),
      e.fields && /* @__PURE__ */ n("section", { className: v.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ o("section", { className: v.webSection, children: [
        /* @__PURE__ */ o("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: v.sectionNote, children: Wy })
        ] }),
        /* @__PURE__ */ n(Hy, { stages: k, onChange: E })
      ] }),
      /* @__PURE__ */ n("section", { className: v.webSection, children: /* @__PURE__ */ n(mr, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: _, options: jr, onChange: N }) }),
      /* @__PURE__ */ n(rN, { ready: me, draft: H, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function nA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(iN, { ...e }) : /* @__PURE__ */ n(Jy, { ...e });
}
const sN = "_row_bs8hc_2", cN = "_cell_bs8hc_6", dN = "_condition_bs8hc_11", uN = "_action_bs8hc_18", hN = "_contract_bs8hc_24", mN = "_contractCondition_bs8hc_33", wN = "_contractAction_bs8hc_39", ne = {
  row: sN,
  cell: cN,
  condition: dN,
  action: uN,
  contract: hN,
  contractCondition: mN,
  contractAction: wN
}, Br = ["advance", "block", "escalate", "requestReview"], pa = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Dt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Bn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ne.action, children: pa[e.then] }) : /* @__PURE__ */ n(
    q,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => t({ ...e, then: l }),
      options: Br.map((l) => ({ value: l, label: pa[l] }))
    }
  );
}
function _N({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: ne.row, children: [
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n("span", { className: ne.condition, title: Dt(e, r), children: Dt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: Bn(e, t, a) })
  ] });
}
function fN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: ne.row, children: [
    /* @__PURE__ */ o("td", { className: ne.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ne.condition, children: Dt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: Bn(e, t, a) })
  ] });
}
function vN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: ne.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ne.contractCondition, children: Dt(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ne.contractAction, children: Bn(e, t, a, !0) })
  ] });
}
const bN = { two: fN, four: _N, contract: vN };
function aA(e) {
  var a;
  if (!Br.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = bN[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const pN = "_column_g1uat_2", gN = "_head_g1uat_17", yN = "_index_g1uat_23", NN = "_name_g1uat_29", kN = "_meta_g1uat_38", $N = "_mono_g1uat_43", CN = "_gate_g1uat_50", SN = "_reviewersLabel_g1uat_57", RN = "_reviewers_g1uat_57", TN = "_reviewer_g1uat_57", xN = "_agents_g1uat_74", LN = "_workflowColumn_g1uat_79", AN = "_workflowHead_g1uat_96", EN = "_stageRow_g1uat_102", IN = "_stageLabel_g1uat_109", MN = "_workflowTitle_g1uat_116", jN = "_workflowMeta_g1uat_122", BN = "_workflowGate_g1uat_127", PN = "_gateNote_g1uat_135", qN = "_cardNote_g1uat_140", HN = "_reviewerList_g1uat_145", ON = "_reviewerRow_g1uat_151", DN = "_reviewerMark_g1uat_157", FN = "_reviewerName_g1uat_167", zN = "_terminalCard_g1uat_173", WN = "_terminalCount_g1uat_182", KN = "_workflowAgents_g1uat_188", GN = "_mount_g1uat_194", R = {
  column: pN,
  head: gN,
  index: yN,
  name: NN,
  meta: kN,
  mono: $N,
  gate: CN,
  reviewersLabel: SN,
  reviewers: RN,
  reviewer: TN,
  agents: xN,
  workflowColumn: LN,
  workflowHead: AN,
  stageRow: EN,
  stageLabel: IN,
  workflowTitle: MN,
  workflowMeta: jN,
  workflowGate: BN,
  gateNote: PN,
  cardNote: qN,
  reviewerList: HN,
  reviewerRow: ON,
  reviewerMark: DN,
  reviewerName: FN,
  terminalCard: zN,
  terminalCount: WN,
  workflowAgents: KN,
  mount: GN
}, UN = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function Pn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function Pr(e) {
  return `${Math.round(e * 100)}%`;
}
function VN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Jt, { cells: [
      { value: Pr(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function JN({ stage: e }) {
  return /* @__PURE__ */ n(Jt, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: Pn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function YN({ stage: e, titleId: t }) {
  return /* @__PURE__ */ o("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: UN[e.kind] })
  ] });
}
function QN({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: R.meta, children: [
    /* @__PURE__ */ o("span", { className: R.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: R.mono, children: [
      ue(e.medianWait),
      " median wait"
    ] })
  ] });
}
function XN({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(VN, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(JN, { stage: e }) : null;
}
function ZN({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function e1({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const l = y(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: R.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(YN, { stage: e, titleId: l }),
    /* @__PURE__ */ n(QN, { stage: e }),
    /* @__PURE__ */ n(XN, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(rp, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(ZN, { onMount: a })
  ] });
}
const t1 = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function n1({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ o("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function a1({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: R.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ n(n1, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: Pr(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function r1(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function l1({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: Pn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: r1(e.rolledBackThisWeek) })
  ] });
}
function o1(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function i1(e) {
  if (e.kind === "terminal") return `${Pn(e.closedThisWeek)} this week`;
  const t = o1(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function s1({ stage: e, titleId: t }) {
  const a = t1[e.kind];
  return /* @__PURE__ */ o("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: R.stageRow, children: [
      /* @__PURE__ */ o("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: i1(e) })
  ] });
}
function c1(e) {
  return e === "entry" || e === "agent";
}
function d1({ stage: e, onMount: t }) {
  return t === void 0 || !c1(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Mount agent" });
}
function u1({ stage: e, agentCards: t, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ o("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(s1, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(a1, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(l1, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(d1, { stage: e, onMount: a })
  ] });
}
function h1(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function rA(e) {
  return h1(e) ? /* @__PURE__ */ n(u1, { ...e }) : /* @__PURE__ */ n(e1, { ...e });
}
const m1 = "_row_1tdra_6", w1 = "_name_1tdra_12", _1 = "_compactRow_1tdra_13", f1 = "_compactName_1tdra_13", v1 = "_cell_1tdra_30", b1 = "_chain_1tdra_45", p1 = "_owner_1tdra_51", g1 = "_mono_1tdra_57", y1 = "_compactCell_1tdra_79", N1 = "_stack_1tdra_96", k1 = "_stat_1tdra_103", $1 = "_identityLine_1tdra_110", C1 = "_identity_1tdra_110", S1 = "_ownerLine_1tdra_140", R1 = "_link_1tdra_160", T1 = "_gateMark_1tdra_166", x1 = "_emptyChain_1tdra_171", L1 = "_arrow_1tdra_177", A1 = "_muted_1tdra_182", E1 = "_define_1tdra_187", I1 = "_statValue_1tdra_194", M1 = "_policyId_1tdra_200", j1 = "_sub_1tdra_205", g = {
  row: m1,
  name: w1,
  compactRow: _1,
  compactName: f1,
  cell: v1,
  chain: b1,
  owner: p1,
  mono: g1,
  compactCell: y1,
  stack: N1,
  stat: k1,
  identityLine: $1,
  identity: C1,
  ownerLine: S1,
  link: R1,
  gateMark: T1,
  emptyChain: x1,
  arrow: L1,
  muted: A1,
  define: E1,
  statValue: I1,
  policyId: M1,
  sub: j1
};
function qr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function B1(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function P1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Hr(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function q1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Hr(e.members)}`;
}
function H1(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: x(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: q1(e) })
  ] }) });
}
function Or({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function O1(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = gt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function D1({ stages: e, streamStep: t }) {
  const a = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ n(Or, { name: l.name, gate: l.gate === !0, look: O1(i, a, t), size: "tag" }),
    i === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function F1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : D1(e) });
}
function Dr(e) {
  return e === void 0 ? void 0 : !0;
}
function ga(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Dr(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function z1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function W1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function K1({ stream: e, href: t, presentation: a }) {
  const r = P1(a.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: qr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ye(e.streamStep, "chip") }, children: [
    H1(e, t),
    F1(e),
    ga(W1(e.agents), e.agents === void 0 ? void 0 : B1(e.agents), "—"),
    z1(e.policy),
    ga(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function G1(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function lA(e) {
  if (G1(e)) return K1(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: qr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: x(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...Vt(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(Or, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ o("span", { className: g.mono, children: [
      t.agents.live,
      " live · ",
      t.agents.draft,
      " draft · ",
      t.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ n("span", { className: g.owner, children: t.owner }),
      /* @__PURE__ */ n("span", { className: g.mono, children: Hr(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": Dr(t.inFlightHint), children: ae(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : ue(t.p50) }) })
  ] });
}
const U1 = "_row_2u4ll_2", V1 = "_name_2u4ll_16", J1 = "_scope_2u4ll_24", Ft = {
  row: U1,
  name: V1,
  scope: J1
};
function qn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Y1(e) {
  return e === void 0 ? `${Ft.row} ward-toolrow` : `${Ft.row} ward-toolrow ${e}`;
}
function Q1(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function X1({ id: e, reasonId: t, tool: a, state: r, onChange: l }) {
  return /* @__PURE__ */ n(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: a.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? t : void 0,
      onChange: (i) => {
        r.locked || l(i.target.checked);
      }
    }
  );
}
function Z1({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: qn(e) });
}
function ek({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${Ft.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function tk(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function oA({ tool: e, onChange: t, presentation: a }) {
  const r = y(), l = y(), i = Q1(e, a), s = tk(a);
  return /* @__PURE__ */ o(s, { className: Y1(a == null ? void 0 : a.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(X1, { id: r, reasonId: l, tool: e, state: i, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${Ft.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(ek, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(Z1, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const nk = "_strip_4ppv9_2", ak = "_well_4ppv9_11", rk = "_head_4ppv9_18", lk = "_name_4ppv9_24", ok = "_chart_4ppv9_32", ik = "_segment_4ppv9_38", sk = "_detailedChart_4ppv9_44", ck = "_rail_4ppv9_57", dk = "_section_4ppv9_63", uk = "_label_4ppv9_74", hk = "_note_4ppv9_91", V = {
  strip: nk,
  well: ak,
  head: rk,
  name: lk,
  chart: ok,
  segment: ik,
  detailedChart: sk,
  rail: ck,
  section: dk,
  label: uk,
  note: hk
}, mk = "No item in flight to preview.", wk = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", _k = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", bn = [1, 2, 3, 4, 5, 6], zt = 100;
function fk(e, t) {
  return t.has(e) ? ye(e, "id") : "var(--ward-color-line)";
}
function vk({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: bn.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: l * zt,
      y: "0",
      width: zt,
      height: "8",
      fill: fk(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function bk(e) {
  const t = e.slice(0, bn.length);
  for (; t.length < bn.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function pk({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${V.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, a) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(a * zt),
        y: "0",
        width: String(zt),
        height: "40",
        style: { fill: ye(t.streamStep, "chip") }
      },
      t.key + String(a)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((t, a) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(a))) })
  ] });
}
function Fr(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Ct({ label: e, children: t }) {
  const a = y();
  return /* @__PURE__ */ o("section", { className: V.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: V.label, children: e }),
    t
  ] });
}
function gk({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: t ?? mk }) : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Qt, { item: { ...e, streamStep: gt(a.streamStep) }, onOpen: Fr(r), feed: null }) });
}
function yk({ draft: e }) {
  const t = { "--stream": ye(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: V.head, style: t, children: [
    /* @__PURE__ */ n(Ke, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Vt(e.key, e.streamStep) })
  ] });
}
function Nk(e) {
  const t = bk(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ o("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(Ct, { label: "Board card", children: /* @__PURE__ */ n(gk, { ...e, draft: a }) }),
    /* @__PURE__ */ n(Ct, { label: "Streams index row", children: /* @__PURE__ */ n(yk, { draft: a }) }),
    /* @__PURE__ */ o(Ct, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(pk, { identities: t }),
      /* @__PURE__ */ n("p", { className: V.note, children: wk })
    ] }),
    /* @__PURE__ */ n(Ct, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: _k }) })
  ] });
}
function kk({ draft: e, sample: t, streams: a, onOpen: r }) {
  const l = { "--stream": ye(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: V.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: V.head, children: [
      /* @__PURE__ */ n(Ke, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Vt(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Qt, { item: { ...t, streamStep: e.streamStep }, onOpen: Fr(r) }) }),
    /* @__PURE__ */ n(vk, { draft: e, streams: a })
  ] });
}
function iA(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Nk, { ...e }) : /* @__PURE__ */ n(kk, { ...e });
}
const $k = "_row_ixlg5_6", Ck = "_headCell_ixlg5_10", Sk = "_cell_ixlg5_11", Rk = "_name_ixlg5_23", Tk = "_consequence_ixlg5_29", xk = "_governed_ixlg5_36", Lk = "_control_ixlg5_42", Ak = "_byRole_ixlg5_48", Ek = "_webControl_ixlg5_59", Ik = "_webConsequence_ixlg5_65", Mk = "_webGoverned_ixlg5_71", W = {
  row: $k,
  headCell: Ck,
  cell: Sk,
  name: Rk,
  consequence: Tk,
  governed: xk,
  control: Lk,
  byRole: Ak,
  webControl: Ek,
  webConsequence: Ik,
  webGoverned: Mk
};
function jk({
  capability: e,
  cell: t,
  onChange: a
}) {
  return t.value === "byRole" ? /* @__PURE__ */ n("span", { className: W.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: W.control, children: [
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
function Bk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ o("tr", { className: W.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: W.headCell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: W.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: W.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(jk, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function Pk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function qk({ name: e, cell: t, onChange: a }) {
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
  return t.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${W.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function Hk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ o("tr", { className: W.row, children: [
    /* @__PURE__ */ o("td", { className: W.cell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${W.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(qk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webGoverned} ward-cellmeta`, children: Pk(e) }) })
  ] });
}
function sA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Hk, { ...e }) : /* @__PURE__ */ n(Bk, { ...e });
}
const Ok = "_row_vv64h_2", Dk = "_cell_vv64h_6", Fk = "_name_vv64h_25", zk = "_note_vv64h_30", Wk = "_webName_vv64h_41", Kk = "_webMeta_vv64h_47", X = {
  row: Ok,
  cell: Dk,
  name: Fk,
  note: zk,
  webName: Wk,
  webMeta: Kk
}, zr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function Gk(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Uk({ component: e, onRestart: t }) {
  const a = y(), r = zr[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: X.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: X.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { id: a, className: X.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: X.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function Vk({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: Gk(e.state) });
}
function Jk({ component: e, onRestart: t }) {
  return /* @__PURE__ */ o("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { ...zr[e.state] }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(Vk, { component: e, onRestart: t }) })
  ] });
}
function cA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Jk, { ...e }) : /* @__PURE__ */ n(Uk, { ...e });
}
const Yk = "_row_jcm5k_7", Qk = "_cell_jcm5k_11", Xk = "_next_jcm5k_28", Zk = "_headCell_jcm5k_38", e$ = "_webId_jcm5k_77", t$ = "_webPurpose_jcm5k_83", n$ = "_webMeta_jcm5k_91", a$ = "_webUrgent_jcm5k_97", K = {
  row: Yk,
  cell: Qk,
  next: Xk,
  headCell: Zk,
  webId: e$,
  webPurpose: t$,
  webMeta: n$,
  webUrgent: a$
}, r$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, l$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Wr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], o$ = Object.fromEntries(Wr.map((e) => [e.key, e]));
function et({ column: e, children: t }) {
  const a = o$[e];
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
function dA() {
  return /* @__PURE__ */ n("tr", { children: Wr.map((e) => /* @__PURE__ */ n(
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
function i$({ cred: e }) {
  const t = r$[e.state];
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n(et, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(et, { column: "id", children: e.id }),
    /* @__PURE__ */ n(et, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(et, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: qn(e.cls) }) }),
    /* @__PURE__ */ n(et, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(et, { column: "next", children: /* @__PURE__ */ n("span", { className: K.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function s$({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${K.webMeta} ${K.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function c$({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(s$, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...l$[e.state] }) })
  ] });
}
function uA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(c$, { ...e }) : /* @__PURE__ */ n(i$, { ...e });
}
const d$ = "_card_lpp45_2", u$ = "_head_lpp45_11", h$ = "_env_lpp45_18", m$ = "_version_lpp45_25", w$ = "_meta_lpp45_32", _$ = "_webCard_lpp45_37", f$ = "_webRow_lpp45_47", v$ = "_webTitle_lpp45_55", b$ = "_webLine_lpp45_65", p$ = "_webVersion_lpp45_72", g$ = "_webMeta_lpp45_77", Q = {
  card: d$,
  head: u$,
  env: h$,
  version: m$,
  meta: w$,
  webCard: _$,
  webRow: f$,
  webTitle: v$,
  webLine: b$,
  webVersion: p$,
  webMeta: g$
}, ya = { dev: "Dev", uat: "UAT", prod: "Prod" }, Kr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function y$({ env: e }) {
  const t = Kr[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: Q.card, "aria-label": ya[e.env], children: [
    /* @__PURE__ */ o("div", { className: Q.head, children: [
      /* @__PURE__ */ n("span", { className: Q.env, children: ya[e.env] }),
      /* @__PURE__ */ n(m, { role: t.role, label: t.label })
    ] }),
    /* @__PURE__ */ n("p", { className: Q.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: Q.meta, children: [
      "deployed ",
      he(e.deployedAt)
    ] }),
    a && /* @__PURE__ */ n("p", { className: Q.meta, children: a })
  ] });
}
function N$(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function k$(e) {
  return /* @__PURE__ */ o("article", { className: `${Q.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${Q.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Q.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Kr[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Q.version} ${Q.webVersion} ${Q.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Q.meta} ${Q.webMeta} ${Q.webLine} ward-cellmeta`, children: N$(e) })
  ] });
}
function hA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(k$, { ...e }) : /* @__PURE__ */ n(y$, { ...e });
}
const $$ = "_panel_1hmja_2", C$ = "_line_1hmja_8", S$ = "_actions_1hmja_14", St = {
  panel: $$,
  line: C$,
  actions: S$
};
function mA(e) {
  return /* @__PURE__ */ o("div", { className: St.panel, children: [
    /* @__PURE__ */ n("p", { className: St.line, children: e.status }),
    /* @__PURE__ */ n(q, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: St.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: St.line, children: e.note ?? "" })
  ] });
}
const R$ = "_upload_13fcl_2", T$ = "_preview_13fcl_7", x$ = "_mark_13fcl_17", L$ = "_empty_13fcl_22", A$ = "_actions_13fcl_28", E$ = "_input_13fcl_33", I$ = "_reasons_13fcl_41", M$ = "_reason_13fcl_41", j$ = "_accepted_13fcl_57", le = {
  upload: R$,
  preview: T$,
  mark: x$,
  empty: L$,
  actions: A$,
  input: E$,
  reasons: I$,
  reason: M$,
  accepted: j$
}, Gr = 1.5, Ur = 22, Wt = "script elements or event handlers", He = "links or external references", Le = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Gr}px at ${Ur}px`], B$ = [Le[1], Le[2], Wt, He], P$ = /* @__PURE__ */ new Map([
  ["image", Le[1]],
  ["text", Le[2]],
  ["tspan", Le[2]],
  ["textPath", Le[2]],
  ["script", Wt],
  ["foreignObject", Wt],
  ["a", He],
  ["use", He],
  ["style", He],
  ["feImage", He],
  ["set", He]
]), q$ = "http://www.w3.org/2000/svg", H$ = "http://www.w3.org/2000/xmlns/", O$ = /* @__PURE__ */ new Set([
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
]), D$ = /* @__PURE__ */ new Set([
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
]), Hn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, F$ = /url\s*\(|['"\\]/i;
function z$() {
  return { ok: !1, reasons: [Le[1]] };
}
function Vr(e) {
  return e.namespaceURI === q$;
}
function W$(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && Vr(t) ? t : null;
  } catch {
    return null;
  }
}
function K$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [Le[0]] : [];
}
function G$(e) {
  return P$.get(e.localName) ?? (e.localName.startsWith("animate") ? He : void 0);
}
function U$(e) {
  return F$.test(e.replace(Hn, ""));
}
function V$(e) {
  return /^on/i.test(e.localName) ? Wt : e.localName === "href" || U$(e.value) ? He : void 0;
}
function J$(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(G$(a));
    for (const r of Array.from(a.attributes)) t.add(V$(r));
  }
  return B$.filter((a) => t.has(a));
}
function Y$(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((l) => Number.isFinite(l) && l > 0), 0), r = a > 0 ? Ur / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Gr;
  }) ? [Le[3]] : [];
}
function Q$(e) {
  if (e.namespaceURI === H$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (D$.has(t) || t.startsWith("stroke"));
}
function X$(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && Vr(t) && O$.has(t.localName);
}
function Z$(e, t) {
  X$(t) ? t.nodeType === Node.ELEMENT_NODE && Jr(t) : e.removeChild(t);
}
function Jr(e) {
  for (const t of Array.from(e.attributes)) Q$(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) Z$(e, t);
  return e;
}
function e0(e) {
  return Array.from(e.matchAll(Hn), (t) => t[2]).filter((t) => t !== "");
}
function t0(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function n0(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of e0(l.value)) a.has(i) || a.set(i, `${t}-${a.size}`);
  return a;
}
function a0(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(Hn, (r, l, i) => {
      const s = t.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function r0(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = n0(a, t);
  for (const l of a) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), a0(l, r);
  }
  return e;
}
function wA(e) {
  const t = W$(e);
  if (t === null) return z$();
  const a = [...K$(t), ...J$(t), ...Y$(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(r0(Jr(t), t0(e))) };
}
const l0 = "Mark accepted.", o0 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, i0 = new Set(ja.flatMap((e) => [ye(e, "id"), ye(e, "chip")]));
function s0(e) {
  return e !== void 0 && (o0.test(e) || i0.has(e)) ? e : void 0;
}
function c0({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: le.preview, style: { "--mark": s0(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: le.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: le.empty }) });
}
function d0(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function u0(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function h0({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: le.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: le.result, role: "status", children: /* @__PURE__ */ n("p", { className: le.accepted, children: l0 }) }) : /* @__PURE__ */ n("div", { className: le.result, role: "status", children: /* @__PURE__ */ n("ul", { className: le.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: le.reason, children: t }, t)) }) });
}
function m0({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(h0, { result: e }) : /* @__PURE__ */ n("p", { className: `${le.result} ${d0(e, a)}`, role: "status", children: u0(e, a) });
}
function Na(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function _A({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: l }) {
  const i = f(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ o("div", { className: le.upload, children: [
    /* @__PURE__ */ n(c0, { current: e }),
    /* @__PURE__ */ o("div", { className: le.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: i,
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
      /* @__PURE__ */ n(b, { ...Na(l), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...Na(l), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(m0, { result: s, presentation: r })
  ] });
}
const w0 = "_row_o3t6y_7", _0 = "_cell_o3t6y_11", f0 = "_head_o3t6y_28", v0 = "_name_o3t6y_34", b0 = "_pinned_o3t6y_42", p0 = "_headCell_o3t6y_49", g0 = "_webName_o3t6y_88", y0 = "_webMeta_o3t6y_95", N0 = "_webWarn_o3t6y_103", D = {
  row: w0,
  cell: _0,
  head: f0,
  name: v0,
  pinned: b0,
  headCell: p0,
  webName: g0,
  webMeta: y0,
  webWarn: N0
}, On = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Yr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], k0 = Object.fromEntries(Yr.map((e) => [e.key, e]));
function $0(e, t) {
  return `mcp.${e}.${t}`;
}
function C0(e) {
  return Object.keys(On).includes(e);
}
function S0(e) {
  return On[e !== void 0 && C0(e) ? e : "unknown"];
}
function ct({ column: e, children: t }) {
  const a = k0[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: D.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: t
    }
  );
}
function fA() {
  return /* @__PURE__ */ n("tr", { children: Yr.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: D.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function R0({ server: e }) {
  const t = On[e.connection];
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o(ct, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: D.head, children: [
        /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: qn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: D.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(ct, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(ct, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(ct, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(ct, { column: "tools", children: e.tools.map((a) => $0(e.name, a)).join(" · ") })
  ] });
}
function T0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function x0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function L0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${D.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e });
}
function A0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function E0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function I0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: `${D.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: T0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...x0(e) }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(L0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...S0(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ n(A0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(E0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function vA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(I0, { ...e }) : /* @__PURE__ */ n(R0, { ...e });
}
const M0 = "_row_1ibo7_2", j0 = "_headCell_1ibo7_14", B0 = "_cell_1ibo7_15", P0 = "_name_1ibo7_26", q0 = "_consequence_1ibo7_32", H0 = "_reason_1ibo7_38", O0 = "_value_1ibo7_44", D0 = "_webRow_1ibo7_60", F0 = "_webSetting_1ibo7_73", z0 = "_webName_1ibo7_81", W0 = "_webConsequence_1ibo7_89", K0 = "_webControl_1ibo7_95", G0 = "_webState_1ibo7_109", U0 = "_webChip_1ibo7_114", P = {
  row: M0,
  headCell: j0,
  cell: B0,
  name: P0,
  consequence: q0,
  reason: H0,
  value: O0,
  webRow: D0,
  webSetting: F0,
  webName: z0,
  webConsequence: W0,
  webControl: K0,
  webState: G0,
  webChip: U0
}, Qr = 104, Xr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function V0({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Qe, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(ur, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: P.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function J0({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = y(), i = Xr[a], s = a === "locked";
  return /* @__PURE__ */ o("tr", { className: P.row, "data-inheritance": a, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: P.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(V0, { control: t, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: P.cell, style: { width: Qr }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function Zr(e, t) {
  return String(e ?? t);
}
function Y0(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function Q0(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? Zr(e.value, "—");
}
function X0({ control: e, name: t, locked: a, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: P.webControl, children: [
    /* @__PURE__ */ n(Qe, { label: t, labelHidden: !0, checked: i, locked: a, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: P.webState, "aria-hidden": "true", children: a || i ? "on" : "off" })
  ] });
}
function Z0(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(X0, { ...e });
  const l = Y0(t, a);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: P.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(ur, { options: l, value: Zr(t.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: Q0(t) });
}
function eC({ setting: e, control: t, inheritance: a, reason: r, onChange: l, renderControl: i }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ o("div", { className: `${P.row} ${P.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ o("span", { className: P.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${P.name} ${P.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${P.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: P.webControl, children: i(s) }) : /* @__PURE__ */ n(Z0, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${P.webChip} ward-policy-chip`, style: { width: Qr }, children: /* @__PURE__ */ n(m, { ...Xr[a], size: "tag" }) })
  ] });
}
function bA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(eC, { ...e }) : /* @__PURE__ */ n(J0, { ...e });
}
const tC = "_label_h9m4w_7", nC = "_name_h9m4w_15", aC = "_column_h9m4w_24", rC = "_webFrame_h9m4w_57", lC = "_webHead_h9m4w_62", oC = "_webHeadLabel_h9m4w_74", iC = "_webLabel_h9m4w_117", sC = "_webColumns_h9m4w_124", cC = "_webGroup_h9m4w_130", dC = "_webPeople_h9m4w_131", uC = "_webVia_h9m4w_132", hC = "_webMeta_h9m4w_161", G = {
  label: tC,
  name: nC,
  column: aC,
  webFrame: rC,
  webHead: lC,
  webHeadLabel: oC,
  webLabel: iC,
  webColumns: sC,
  webGroup: cC,
  webPeople: dC,
  webVia: uC,
  webMeta: hC
}, mC = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, on = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function sn({ column: e, children: t }) {
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
function wC(e) {
  if (!e.matrixRole) return;
  const t = mC[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function _C({ node: e }) {
  const t = wC(e);
  return /* @__PURE__ */ o("span", { className: G.label, children: [
    /* @__PURE__ */ n("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ n(fC, { role: t, node: e }),
    /* @__PURE__ */ n(sn, { column: on[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(sn, { column: on[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(sn, { column: on[2], children: e.requestedVia ?? "" })
  ] });
}
function fC({ role: e, node: t }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function vC({ index: e, depth: t, node: a, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    br,
    {
      index: e,
      depth: t,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(_C, { node: a }),
      children: s
    }
  );
}
function cn({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function bC({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${G.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(cn, { className: `${G.webMeta} ${G.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(cn, { className: `${G.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(cn, { className: `${G.webMeta} ${G.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function pC() {
  return /* @__PURE__ */ o("div", { className: G.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: G.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: G.webColumns, children: [
      /* @__PURE__ */ n("span", { className: G.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: G.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: G.webVia, children: "Requested via" })
    ] })
  ] });
}
function gC({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${G.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function yC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function NC({ rows: e, label: t }) {
  return /* @__PURE__ */ o("div", { className: G.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(pC, {}),
    /* @__PURE__ */ n(Xw, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      br,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(gC, { row: a }),
        detail: /* @__PURE__ */ n(bC, { row: a }),
        expanded: yC(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function pA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(NC, { ...e }) : /* @__PURE__ */ n(vC, { ...e });
}
const kC = "_runbook_b9agc_2", $C = "_list_b9agc_7", CC = "_step_b9agc_15", SC = "_numeral_b9agc_21", RC = "_body_b9agc_28", TC = "_head_b9agc_34", xC = "_title_b9agc_40", LC = "_detail_b9agc_45", AC = "_actions_b9agc_50", EC = "_webList_b9agc_56", IC = "_webStep_b9agc_60", MC = "_webBody_b9agc_66", jC = "_webTitle_b9agc_74", BC = "_webDetail_b9agc_78", M = {
  runbook: kC,
  list: $C,
  step: CC,
  numeral: SC,
  body: RC,
  head: TC,
  title: xC,
  detail: LC,
  actions: AC,
  webList: EC,
  webStep: IC,
  webBody: MC,
  webTitle: jC,
  webDetail: BC
}, el = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function tl(e) {
  return String(e + 1).padStart(2, "0");
}
function PC({ step: e, index: t, connection: a }) {
  const r = el[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: M.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: M.numeral, children: tl(t) }),
    /* @__PURE__ */ o("span", { className: M.body, children: [
      /* @__PURE__ */ o("span", { className: M.head, children: [
        /* @__PURE__ */ n("span", { className: M.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n(Ie, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ n("span", { className: M.detail, children: e.detail })
    ] })
  ] });
}
function qC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ o("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: M.list, children: e.map((r, l) => /* @__PURE__ */ n(PC, { step: r, index: l, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: M.actions, children: t })
  ] });
}
function HC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ o("li", { className: `${M.step} ${M.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${M.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: tl(t) }),
    /* @__PURE__ */ o("span", { className: `${M.body} ${M.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${M.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${M.title} ${M.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...el[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Ie, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${M.detail} ${M.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function OC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ o("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${M.list} ${M.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(HC, { step: r, index: l, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${M.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function gA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(OC, { ...e }) : /* @__PURE__ */ n(qC, { ...e });
}
const DC = "_list_1gu6a_2", FC = "_check_1gu6a_10", zC = "_body_1gu6a_16", WC = "_text_1gu6a_23", KC = "_pending_1gu6a_32", GC = "_measured_1gu6a_37", at = {
  list: DC,
  check: FC,
  body: zC,
  text: WC,
  pending: KC,
  measured: GC
};
function UC(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function VC({ check: e }) {
  const t = UC(e.passed);
  return /* @__PURE__ */ o("li", { className: `${at.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(En, { state: t.state, label: t.label }),
    /* @__PURE__ */ o("span", { className: at.body, children: [
      /* @__PURE__ */ n("span", { className: at.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: at.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: at.measured, children: e.measured })
  ] });
}
function yA({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${at.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(VC, { check: t }, t.text)) });
}
const JC = "_root_y6bbq_2", YC = "_list_y6bbq_10", QC = "_line_y6bbq_32", XC = "_at_y6bbq_59", ZC = "_text_y6bbq_63", eS = "_foot_y6bbq_67", tS = "_idle_y6bbq_79", nS = "_caret_y6bbq_87", aS = "_jump_y6bbq_94", be = {
  root: JC,
  list: YC,
  line: QC,
  at: XC,
  text: ZC,
  foot: eS,
  idle: tS,
  caret: nS,
  jump: aS
}, rS = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Dn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : rS.format(new Date(e));
}
const lS = { warn: "warning", ok: "ok" };
function oS({ kind: e }) {
  const t = lS[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function iS({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Dn(e)}` });
}
function sS({ connection: e, idleSince: t, last: a, children: r }) {
  const l = [t, a == null ? void 0 : a.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Dn(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${be.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${be.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: be.idle, children: i }),
    /* @__PURE__ */ n(iS, { at: a == null ? void 0 : a.at }),
    r
  ] });
}
const cS = 8;
function dS(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > cS;
}
function uS({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${be.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const nl = ke(null);
function NA({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, l] = p(!1), i = xa(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(nl.Provider, { value: i, children: a });
}
function hS() {
  const e = Ne(nl), [t, a] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const mS = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function kA({ lines: e, connection: t, idleSince: a, label: r = "Live activity", fixed: l }) {
  const i = f(null), [s, c] = p(0), [d, u] = hS(), [h, w] = p(!1), _ = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), lt(() => {
    const k = i.current;
    k && !h && (k.scrollTop = k.scrollHeight);
  }, [e.length, h]);
  const N = () => {
    var H;
    const k = i.current;
    if (!k) return;
    const E = k.querySelectorAll("[data-consline-text]");
    (H = E.item(E.length - 1)) == null || H.focus(), w(!1);
  };
  return /* @__PURE__ */ o("div", { className: be.root, children: [
    /* @__PURE__ */ n("ol", { className: be.list, ref: i, "aria-live": d ? "polite" : "off", "aria-label": r, ...mS(e.length, l), onScroll: (k) => w(dS(k.currentTarget)), children: e.map((k, E) => /* @__PURE__ */ o("li", { className: `${be.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": E < s, children: [
      /* @__PURE__ */ n("span", { className: be.at, children: Dn(k.at) }),
      /* @__PURE__ */ n(oS, { kind: k.kind }),
      /* @__PURE__ */ n("span", { className: be.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${E}`)) }),
    /* @__PURE__ */ o(sS, { connection: t, idleSince: a, last: _, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${be.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(uS, { shown: h, onJump: N })
    ] })
  ] });
}
const wS = "_row_1k8wl_2", _S = "_head_1k8wl_14", fS = "_author_1k8wl_20", vS = "_eta_1k8wl_25", bS = "_edited_1k8wl_26", pS = "_body_1k8wl_32", gS = "_reason_1k8wl_37", yS = "_actions_1k8wl_42", Se = {
  row: wS,
  head: _S,
  author: fS,
  eta: vS,
  edited: bS,
  body: pS,
  reason: gS,
  actions: yS
}, NS = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function kS(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function $S({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function CS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Se.reason, id: t, children: e })
  ] });
}
function SS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function RS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n($S, { ...e }) : /* @__PURE__ */ n(CS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function $A(e) {
  const { comment: t } = e;
  SS(e);
  const a = y(), r = `${a}-unavailable`, l = NS[t.delivery];
  return /* @__PURE__ */ o("div", { className: `${Se.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Se.head, children: [
      /* @__PURE__ */ n("span", { className: Se.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: Se.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Se.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Se.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Se.reason, id: a, children: kS(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Se.actions, children: /* @__PURE__ */ n(RS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const TS = "_root_rvhdw_2", xS = "_attach_rvhdw_11", LS = "_actions_rvhdw_17", AS = "_reply_rvhdw_23", ES = "_replyField_rvhdw_28", IS = "_send_rvhdw_54", MS = "_sendIcon_rvhdw_65", jS = "_sendsAs_rvhdw_75", Fe = {
  root: TS,
  attach: xS,
  actions: LS,
  reply: AS,
  replyField: ES,
  send: IS,
  sendIcon: MS,
  sendsAs: jS
};
function al({ value: e, onChange: t }) {
  const [a, r] = p("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function BS() {
  return /* @__PURE__ */ n("svg", { className: Fe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function PS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function qS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [l, i] = al(e), s = y(), c = () => {
    l.trim() !== "" && r(a, l);
  }, d = (u) => {
    PS(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: Fe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Fe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ n(q, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: Fe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ n(BS, {}),
        /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Fe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function CA(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(qS, { ...e }) : /* @__PURE__ */ n(HS, { ...e });
}
function HS(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = al(e);
  return /* @__PURE__ */ o("div", { className: Fe.root, children: [
    /* @__PURE__ */ n(q, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: Fe.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ n(
      Wa,
      {
        label: `Requeue ${l.agent} after posting`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Fe.actions, children: [
      /* @__PURE__ */ n(b, { variant: "primary", onClick: () => i(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const OS = "_list_1yhks_2", DS = "_item_1yhks_6", FS = "_body_1yhks_22", zS = "_text_1yhks_28", WS = "_evidence_1yhks_37", KS = "_consequence_1yhks_49", GS = "_note_1yhks_54", Ye = {
  list: OS,
  item: DS,
  body: FS,
  text: zS,
  evidence: WS,
  consequence: KS,
  note: GS
};
function US({ criterion: e }) {
  return /* @__PURE__ */ n(Ke, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function ka({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function VS(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function JS({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Ye.body, children: [
    /* @__PURE__ */ n("span", { className: Ye.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ n(ka, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Ye.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ n(ka, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Ye.consequence, children: VS(e.why) })
    ] })
  ] });
}
function YS({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Ye.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(US, { criterion: e }),
    /* @__PURE__ */ n(JS, { criterion: e })
  ] });
}
function SA({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Ye.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(YS, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ n("p", { className: Ye.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const QS = "_list_dwhoz_2", XS = "_rung_dwhoz_6", ZS = "_name_dwhoz_18", e2 = "_actor_dwhoz_32", Mt = {
  list: QS,
  rung: XS,
  name: ZS,
  actor: e2
}, t2 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function n2({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = t2[e.state];
  return /* @__PURE__ */ o("li", { className: Mt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: Mt.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${Mt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function RA({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Mt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(n2, { rung: t }, t.name)) });
}
const a2 = "_sheet_pw37w_2", r2 = "_title_pw37w_9", l2 = "_stage_pw37w_15", o2 = "_effects_pw37w_20", i2 = "_effect_pw37w_20", s2 = "_numeral_pw37w_31", c2 = "_effectText_pw37w_38", d2 = "_refusals_pw37w_43", u2 = "_reasons_pw37w_52", h2 = "_reason_pw37w_52", m2 = "_actions_pw37w_62", we = {
  sheet: a2,
  title: r2,
  stage: l2,
  effects: o2,
  effect: i2,
  numeral: s2,
  effectText: c2,
  refusals: d2,
  reasons: u2,
  reason: h2,
  actions: m2
};
function w2({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function TA({ run: e, effects: t, refusals: a, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = y(), d = `${c}-refusal`, [u, h] = p(""), w = a.length > 0;
  return /* @__PURE__ */ n(st, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: we.sheet, children: [
    /* @__PURE__ */ o("h2", { className: we.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: we.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: we.effects, children: t.map((_, N) => /* @__PURE__ */ o("li", { className: we.effect, children: [
      /* @__PURE__ */ n("span", { className: we.numeral, children: String(N + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: we.effectText, children: _ })
    ] }, _)) }),
    /* @__PURE__ */ n(
      Am,
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
    w && /* @__PURE__ */ o("div", { className: we.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: we.reasons, children: a.map((_, N) => /* @__PURE__ */ n("li", { className: we.reason, id: N === 0 ? d : void 0, children: _.reason }, _.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: we.actions, children: [
      /* @__PURE__ */ n(w2, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const _2 = "_list_1laeg_2", f2 = "_path_1laeg_7", v2 = "_head_1laeg_21", b2 = "_label_1laeg_28", p2 = "_consequence_1laeg_35", ht = {
  list: _2,
  path: f2,
  head: v2,
  label: b2,
  consequence: p2
}, pn = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function $a(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Ca(e) {
  return e ? "primary" : "secondary";
}
function g2({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: Ca(t), size: "sm", onClick: () => a(e.kind), children: pn[e.kind] }) : /* @__PURE__ */ n(b, { variant: Ca(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: pn[e.kind] });
}
function y2({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: ht.path, "data-allowed": e.allowed, "data-role": $a(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: ht.head, children: [
      /* @__PURE__ */ n("span", { className: ht.label, children: e.title ?? pn[e.kind] }),
      /* @__PURE__ */ n(m, { role: $a(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: ht.consequence, children: e.consequence }),
    /* @__PURE__ */ n(g2, { path: e, primary: t, onChoose: a })
  ] });
}
function xA({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: ht.list, children: e.map((a, r) => /* @__PURE__ */ n(y2, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const N2 = "_list_1m7i0_2", k2 = "_item_1m7i0_6", $2 = "_node_1m7i0_18", C2 = "_body_1m7i0_24", S2 = "_head_1m7i0_30", R2 = "_stage_1m7i0_36", T2 = "_version_1m7i0_41", x2 = "_sentence_1m7i0_49", L2 = "_meta_1m7i0_54", Te = {
  list: N2,
  item: k2,
  node: $2,
  body: C2,
  head: S2,
  stage: R2,
  version: T2,
  sentence: x2,
  meta: L2
}, A2 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function E2({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Te.head, children: [
    /* @__PURE__ */ n("span", { className: Te.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Te.version, title: e.version, children: e.version }) : null
  ] });
}
function I2({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Te.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Te.node} ward-history-node`, children: /* @__PURE__ */ n(Ke, { size: 9, kind: A2[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Te.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(E2, { entry: e }),
      /* @__PURE__ */ n("span", { className: Te.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Te.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${oe(e.cost)}`
      ] })
    ] })
  ] });
}
function LA({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Te.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(I2, { entry: t }, t.stage + String(a))) });
}
const M2 = "_thread_1e70p_3", j2 = "_turn_1e70p_8", B2 = "_who_1e70p_27", P2 = "_body_1e70p_32", jt = {
  thread: M2,
  turn: j2,
  who: B2,
  body: P2
}, rl = ke(!1);
function AA({ children: e, density: t }) {
  return /* @__PURE__ */ n(rl.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${jt.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function EA({ turn: e }) {
  if (!Ne(rl)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${jt.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${jt.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${jt.body} ward-chat-body`, children: e.body })
  ] });
}
const q2 = "_list_yiolt_3", H2 = "_row_yiolt_7", O2 = "_label_yiolt_20", D2 = "_n_yiolt_26", F2 = "_cause_yiolt_33", _t = {
  list: q2,
  row: H2,
  label: O2,
  n: D2,
  cause: F2
};
function z2(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const W2 = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function K2({ row: e, formatNumber: t }) {
  return z2(e), /* @__PURE__ */ o("li", { className: `${_t.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ke, { size: 8, ...W2[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: _t.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${_t.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(G2, { cause: e.cause })
  ] });
}
function G2({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${_t.cause} ward-healthrow-cause`, children: e }) : null;
}
function IA({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${_t.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(K2, { row: a, formatNumber: t }, a.label)) });
}
const U2 = "_root_1jxwp_2", V2 = {
  root: U2
};
function MA({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: V2.root, "data-density": l, children: [
    /* @__PURE__ */ n(Xt, { items: e, note: t, density: l }),
    /* @__PURE__ */ n(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const J2 = "_row_dhbre_3", Y2 = "_key_dhbre_13", Q2 = "_stack_dhbre_24", X2 = "_value_dhbre_32", Z2 = "_evidence_dhbre_39", eR = "_mark_dhbre_47", tt = {
  row: J2,
  key: Y2,
  stack: Q2,
  value: X2,
  evidence: Z2,
  mark: eR
};
function tR({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(En, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function jA({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${tt.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${tt.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${tt.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${tt.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${tt.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${tt.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(tR, { state: e.state }) })
  ] });
}
const nR = "_cell_gh2sd_2", aR = {
  cell: nR
}, rR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function lR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function oR(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function iR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: lR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function sR(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function BA({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  oR(e, a);
  const r = sR(e);
  return /* @__PURE__ */ n(
    Km,
    {
      label: "Rejection routing",
      columns: rR,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: aR.cell, "data-norerun": l.noRerun ? !0 : void 0, children: iR(l, i) }),
      empty: t ?? /* @__PURE__ */ n(q_, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const cR = "_row_1f2re_2", dR = "_title_1f2re_12", uR = "_turns_1f2re_18", hR = "_waiting_1f2re_19", mR = "_resolved_1f2re_20", wR = "_activity_1f2re_21", _R = "_cost_1f2re_28", fR = "_link_1f2re_29", vR = "_tableLink_1f2re_47", bR = "_tableRecord_1f2re_48", pR = "_tableRow_1f2re_59", gR = "_tableTitle_1f2re_71", yR = "_tableResolved_1f2re_76", NR = "_tableMeta_1f2re_87", kR = "_tableCost_1f2re_94", $R = "_tableActivity_1f2re_95", CR = "_tableState_1f2re_105", z = {
  row: cR,
  title: dR,
  turns: uR,
  waiting: hR,
  resolved: mR,
  activity: wR,
  cost: _R,
  link: fR,
  tableLink: vR,
  tableRecord: bR,
  tableRow: pR,
  tableTitle: gR,
  tableResolved: yR,
  tableMeta: NR,
  tableCost: kR,
  tableActivity: $R,
  tableState: CR
}, ll = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function SR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function RR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function TR(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const xR = { duplicate: "Closed · duplicate" };
function LR({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(ot, { className: z.tableMeta, text: `waiting on ${e}` });
}
function AR({ value: e }) {
  return /* @__PURE__ */ n("td", { className: z.tableCost, children: e === void 0 ? null : oe(e) });
}
function ER({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${z.tableRecord} ward-target`, href: x(e.href), children: `→ ${e.key}` });
}
function IR({ session: e, href: t }) {
  const a = ll[e.state];
  return /* @__PURE__ */ o("tr", { className: z.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: z.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${z.tableLink} ward-target`, href: x(t), children: /* @__PURE__ */ n(ot, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: z.tableMeta, children: RR(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: z.tableResolved, children: [
      TR(e.resolved),
      /* @__PURE__ */ n(LR, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(AR, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: z.tableActivity, children: SR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: z.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: xR[e.state] ?? a.label }),
      /* @__PURE__ */ n(ER, { link: e.link })
    ] }) })
  ] });
}
function MR({ session: e }) {
  const t = ll[e.state];
  return /* @__PURE__ */ o("div", { className: z.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(ot, { className: z.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: z.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(ot, { className: z.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: z.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: z.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : oe(e.cost) }),
    /* @__PURE__ */ n("span", { className: z.activity, children: he(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: z.link, href: x(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function PA(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(IR, { session: e.session, href: e.href }) : /* @__PURE__ */ n(MR, { session: e.session });
}
const jR = "_block_1yy2v_3", BR = "_list_1yy2v_9", PR = "_line_1yy2v_14", gn = {
  block: jR,
  list: BR,
  line: PR
}, qR = { warn: "warning", ok: "ok" };
function HR({ kind: e }) {
  const t = qR[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function OR({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${gn.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(HR, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function qA({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${gn.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: gn.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(OR, { line: a }, `${r}-${a.text}`)) }) });
}
const DR = "_band_tt7hp_1", FR = "_head_tt7hp_8", zR = "_cell_tt7hp_19", WR = "_index_tt7hp_35", KR = "_title_tt7hp_42", GR = "_note_tt7hp_48", UR = "_cellTitle_tt7hp_53", VR = "_cellBody_tt7hp_58", JR = "_tag_tt7hp_64", Ce = {
  band: DR,
  head: FR,
  cell: zR,
  index: WR,
  title: KR,
  note: GR,
  cellTitle: UR,
  cellBody: VR,
  tag: JR
}, Sa = 4;
function HA({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== Sa)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Sa}-cell grid`);
  return /* @__PURE__ */ o("section", { className: Ce.band, "aria-label": `${e} ${t}`, children: [
    /* @__PURE__ */ o("div", { className: Ce.head, children: [
      /* @__PURE__ */ n("span", { className: Ce.index, children: e }),
      /* @__PURE__ */ n("span", { className: Ce.title, children: t }),
      /* @__PURE__ */ n("span", { className: Ce.note, children: a })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: Ce.cell, children: [
      /* @__PURE__ */ n("span", { className: Ce.cellTitle, children: l.title }),
      /* @__PURE__ */ n("span", { className: Ce.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ n("span", { className: Ce.tag, children: l.tag })
    ] }, l.title))
  ] });
}
const YR = "_tag_1yuvz_2", QR = "_link_1yuvz_14", dn = {
  tag: YR,
  link: QR
};
function ol({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: dn.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${dn.tag} ${dn.link}`, href: x(t), children: e });
}
const XR = "_eyebrow_m8swv_2", ZR = "_link_m8swv_10", Ra = {
  eyebrow: XR,
  link: ZR
};
function Zt({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: Ra.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${Ra.link} ward-target`, href: x(t), children: e }) });
}
const eT = "_figure_qz9i7_2", tT = "_media_qz9i7_9", nT = "_caption_qz9i7_35", un = {
  figure: eT,
  media: tT,
  caption: nT
};
function aT(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(T, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function yn(e) {
  return /* @__PURE__ */ o("figure", { className: un.figure, children: [
    /* @__PURE__ */ n("div", { className: un.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(aT, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: un.caption, children: e.caption })
  ] });
}
function yt(e) {
  return `h${e}`;
}
function rT(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const lT = "_prose_1fxb9_2", oT = "_anchor_1fxb9_79", il = {
  prose: lT,
  anchor: oT
};
function Nn({ children: e }) {
  return /* @__PURE__ */ n("div", { className: il.prose, children: e });
}
function OA({ level: e, children: t, id: a }) {
  const r = yt(e), l = a ?? rT(t);
  return /* @__PURE__ */ o(r, { id: l, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${il.anchor} ward-target`, href: `#${l}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const iT = "_list_176jq_2", sT = "_pair_176jq_8", cT = "_term_176jq_14", dT = "_value_176jq_19", Rt = {
  list: iT,
  pair: sT,
  term: cT,
  value: dT
};
function uT({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: Rt.list, children: e.map((t) => /* @__PURE__ */ o("div", { className: Rt.pair, children: [
    /* @__PURE__ */ n("dt", { className: Rt.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: Rt.value, children: t.value })
  ] }, t.term)) });
}
const hT = "_nav_sgeyg_2", mT = "_item_sgeyg_6", wT = "_link_sgeyg_13", _T = "_note_sgeyg_30", Tt = {
  nav: hT,
  item: mT,
  link: wT,
  note: _T
};
function fT({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: Tt.nav, children: /* @__PURE__ */ n(Vm, { children: t.map((a) => /* @__PURE__ */ o("li", { className: Tt.item, children: [
    /* @__PURE__ */ n("a", { className: `${Tt.link} ward-target`, href: x(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: Tt.note, children: a.note })
  ] }, a.href)) }) });
}
const vT = "_header_kelio_2", bT = "_skip_kelio_14", pT = "_brand_kelio_39", gT = "_list_kelio_46", yT = "_link_kelio_56", nt = {
  header: vT,
  skip: bT,
  brand: pT,
  list: gT,
  link: yT
};
function DA({ brand: e, links: t, current: a, homeHref: r = "/", mainId: l = "main", skipLabel: i = "Skip to content" }) {
  return /* @__PURE__ */ o("header", { className: nt.header, children: [
    /* @__PURE__ */ n("a", { className: nt.skip, href: `#${l}`, children: i }),
    /* @__PURE__ */ n("a", { className: `${nt.brand} ward-target`, href: x(r), children: e }),
    /* @__PURE__ */ n("nav", { "aria-label": "Main", className: nt.nav, children: /* @__PURE__ */ n("ul", { className: nt.list, role: "list", children: t.map((s) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${nt.link} ward-target`, href: x(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const NT = "_footer_1jb5e_2", kT = "_note_1jb5e_12", $T = "_list_1jb5e_18", CT = "_link_1jb5e_27", xt = {
  footer: NT,
  note: kT,
  list: $T,
  link: CT
};
function FA({ note: e, links: t = [], label: a = "Footer" }) {
  return /* @__PURE__ */ o("footer", { className: xt.footer, children: [
    /* @__PURE__ */ n("p", { className: xt.note, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("nav", { "aria-label": a, children: /* @__PURE__ */ n("ul", { className: xt.list, role: "list", children: t.map((r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${xt.link} ward-target`, href: x(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const ST = "_intro_13128_2", RT = "_title_13128_9", TT = "_lead_13128_17", hn = {
  intro: ST,
  title: RT,
  lead: TT
};
function Fn({ title: e, eyebrow: t, eyebrowHref: a, lead: r, headingLevel: l = 1, children: i }) {
  const s = yt(l);
  return /* @__PURE__ */ o("header", { className: hn.intro, children: [
    t === void 0 ? null : /* @__PURE__ */ n(Zt, { href: a, children: t }),
    /* @__PURE__ */ n(s, { className: hn.title, children: e }),
    r === void 0 ? null : /* @__PURE__ */ n("p", { className: hn.lead, children: r }),
    i
  ] });
}
const xT = "_section_u0k7p_2", LT = "_head_u0k7p_13", AT = "_titles_u0k7p_21", ET = "_title_u0k7p_21", IT = "_link_u0k7p_34", mt = {
  section: xT,
  head: LT,
  titles: AT,
  title: ET,
  link: IT
};
function MT({ title: e, headingId: t, eyebrow: a, link: r, headingLevel: l }) {
  const i = yt(l);
  return /* @__PURE__ */ o("div", { className: mt.head, children: [
    /* @__PURE__ */ o("div", { className: mt.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ n(Zt, { children: a }),
      /* @__PURE__ */ n(i, { className: mt.title, id: t, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ n("a", { className: `${mt.link} ward-target`, href: x(r.href), children: r.label })
  ] });
}
function zA({ title: e, children: t, id: a, eyebrow: r, link: l, headingLevel: i = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ o("section", { className: mt.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ n(MT, { title: e, headingId: d, eyebrow: r, link: l, headingLevel: i }),
    t
  ] });
}
const jT = "_split_1ycaa_2", BT = "_main_1ycaa_10", PT = "_aside_1ycaa_15", mn = {
  split: jT,
  main: BT,
  aside: PT
};
function qT({ children: e, aside: t, asideLabel: a }) {
  return /* @__PURE__ */ o("div", { className: mn.split, children: [
    /* @__PURE__ */ n("div", { className: mn.main, children: e }),
    /* @__PURE__ */ n("aside", { className: mn.aside, "aria-label": a, children: t })
  ] });
}
const HT = "_hero_ehbct_2", OT = "_text_ehbct_11", DT = "_visual_ehbct_23", FT = "_title_ehbct_28", zT = "_lead_ehbct_36", WT = "_actions_ehbct_42", KT = "_action_ehbct_42", GT = "_primary_ehbct_63", UT = "_secondary_ehbct_72", Ae = {
  hero: HT,
  text: OT,
  visual: DT,
  title: FT,
  lead: zT,
  actions: WT,
  action: KT,
  primary: GT,
  secondary: UT
};
function VT({ actions: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ n("div", { className: Ae.actions, children: e.map((t, a) => /* @__PURE__ */ n("a", { className: `${Ae.action} ${a === 0 ? Ae.primary : Ae.secondary}`, href: x(t.href), children: t.label }, t.href)) });
}
function JT({ title: e, eyebrow: t, lead: a, actions: r = [] }) {
  return /* @__PURE__ */ o("div", { className: Ae.text, children: [
    t === void 0 ? null : /* @__PURE__ */ n(Zt, { children: t }),
    /* @__PURE__ */ n("h1", { className: Ae.title, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("p", { className: Ae.lead, children: a }),
    /* @__PURE__ */ n(VT, { actions: r })
  ] });
}
function WA({ visual: e, ...t }) {
  return /* @__PURE__ */ o("div", { className: Ae.hero, "data-visual": e === void 0 ? "none" : "beside", children: [
    /* @__PURE__ */ n(JT, { ...t }),
    e === void 0 ? null : /* @__PURE__ */ n("div", { className: Ae.visual, children: e })
  ] });
}
const YT = "_chain_w2k2l_2", QT = "_step_w2k2l_12", XT = "_arrow_w2k2l_19", ZT = "_box_w2k2l_24", Lt = {
  chain: YT,
  step: QT,
  arrow: XT,
  box: ZT
};
function KA({ steps: e, label: t, animate: a }) {
  return /* @__PURE__ */ n("ol", { className: Lt.chain, "aria-label": t, "data-ward-animate": a ?? "", children: e.map((r, l) => /* @__PURE__ */ o("li", { className: Lt.step, style: { "--ward-step": l }, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: Lt.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n("span", { className: Lt.box, children: r })
  ] }, l)) });
}
const ex = "_card_1u2gr_2", tx = "_featured_1u2gr_20", nx = "_media_1u2gr_28", ax = "_body_1u2gr_32", rx = "_title_1u2gr_48", lx = "_link_1u2gr_60", ox = "_summary_1u2gr_78", ix = "_tags_1u2gr_84", sx = "_cta_1u2gr_90", fe = {
  card: ex,
  featured: tx,
  media: nx,
  body: ax,
  title: rx,
  link: lx,
  summary: ox,
  tags: ix,
  cta: sx
};
function sl({ media: e, ratio: t = "16/9" }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: fe.media, children: /* @__PURE__ */ n(yn, { ratio: t, children: e }) });
}
function cx({ href: e, title: t, headingLevel: a = 3 }) {
  const r = yt(a);
  return /* @__PURE__ */ n(r, { className: fe.title, children: /* @__PURE__ */ n("a", { className: fe.link, href: x(e), children: t }) });
}
function cl({ eyebrow: e, ...t }) {
  return /* @__PURE__ */ o(T, { children: [
    e === void 0 ? null : /* @__PURE__ */ n(Zt, { children: e }),
    /* @__PURE__ */ n(cx, { ...t })
  ] });
}
function dl({ summary: e, tags: t = [] }) {
  return /* @__PURE__ */ o(T, { children: [
    e === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.summary, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("span", { className: fe.tags, children: t.map((a) => /* @__PURE__ */ n(ol, { label: a }, a)) })
  ] });
}
function GA({ media: e, ratio: t, eyebrow: a, summary: r, tags: l, ...i }) {
  return /* @__PURE__ */ o("article", { className: fe.card, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(sl, { media: e, ratio: t }),
    /* @__PURE__ */ o("div", { className: fe.body, children: [
      /* @__PURE__ */ n(cl, { eyebrow: a, ...i }),
      /* @__PURE__ */ n(dl, { summary: r, tags: l })
    ] })
  ] });
}
function UA({ media: e, ratio: t, eyebrow: a, summary: r, tags: l, cta: i, ...s }) {
  return /* @__PURE__ */ o("article", { className: `${fe.card} ${fe.featured}`, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(sl, { media: e, ratio: t }),
    /* @__PURE__ */ o("div", { className: fe.body, children: [
      /* @__PURE__ */ n(cl, { eyebrow: a, ...s }),
      /* @__PURE__ */ n(dl, { summary: r, tags: l }),
      i === void 0 ? null : /* @__PURE__ */ o("span", { className: fe.cta, "aria-hidden": "true", children: [
        i,
        " →"
      ] })
    ] })
  ] });
}
const dx = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function ul(e) {
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : `${t.getUTCDate()} ${dx[t.getUTCMonth()]} ${t.getUTCFullYear()}`;
}
const ux = "_row_1peme_2", hx = "_title_1peme_15", mx = "_link_1peme_23", wx = "_meta_1peme_40", _x = "_summary_1peme_46", dt = {
  row: ux,
  title: hx,
  link: mx,
  meta: wx,
  summary: _x
};
function VA({ href: e, title: t, date: a, meta: r, summary: l, headingLevel: i = 3 }) {
  const s = yt(i);
  return /* @__PURE__ */ o("article", { className: dt.row, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(s, { className: dt.title, children: /* @__PURE__ */ n("a", { className: dt.link, href: x(e), children: t }) }),
    /* @__PURE__ */ o("p", { className: dt.meta, children: [
      /* @__PURE__ */ n("time", { dateTime: a, children: ul(a) }),
      r === void 0 ? null : ` · ${r}`
    ] }),
    l === void 0 ? null : /* @__PURE__ */ n("p", { className: dt.summary, children: l })
  ] });
}
const fx = "_list_dd8kj_2", vx = "_item_dd8kj_16", Ta = {
  list: fx,
  item: vx
};
function JA({ children: e, rules: t = !1, label: a }) {
  return /* @__PURE__ */ n("ul", { className: Ta.list, role: "list", "aria-label": a, "data-rules": t, children: Aa.toArray(e).map((r, l) => /* @__PURE__ */ n("li", { className: Ta.item, children: r }, l)) });
}
const bx = "_page_i3r2z_2", px = "_aside_i3r2z_8", gx = "_tags_i3r2z_13", zn = {
  page: bx,
  aside: px,
  tags: gx
};
function yx({ labels: e }) {
  return /* @__PURE__ */ n("span", { className: zn.tags, children: e.map((t) => /* @__PURE__ */ n(ol, { label: t }, t)) });
}
function Nx(e) {
  return e[1] !== void 0 && e[1].length > 0;
}
function kx(e) {
  return e.filter(Nx).map(([t, a]) => ({
    term: t,
    value: typeof a == "string" ? a : /* @__PURE__ */ n(yx, { labels: a })
  }));
}
function $x({ facts: e, links: t, linksLabel: a }) {
  return /* @__PURE__ */ o("div", { className: zn.aside, children: [
    e.length === 0 ? null : /* @__PURE__ */ n(uT, { facts: e }),
    t === void 0 || t.length === 0 ? null : /* @__PURE__ */ n(fT, { label: a, links: t })
  ] });
}
function hl({ facts: e, links: t = [], linksLabel: a, asideLabel: r, children: l }) {
  return e.length === 0 && t.length === 0 ? /* @__PURE__ */ n(Nn, { children: l }) : /* @__PURE__ */ n(qT, { asideLabel: r, aside: /* @__PURE__ */ n($x, { facts: e, links: t, linksLabel: a }), children: /* @__PURE__ */ n(Nn, { children: l }) });
}
function YA({ title: e, summary: t, children: a, eyebrow: r, eyebrowHref: l, role: i, period: s, focus: c, stack: d, related: u }) {
  const h = kx([
    ["Role", i],
    ["Period", s],
    ["Focus", c],
    ["Stack", d]
  ]);
  return /* @__PURE__ */ o("article", { className: zn.page, children: [
    /* @__PURE__ */ n(Fn, { title: e, lead: t, eyebrow: r, eyebrowHref: l }),
    /* @__PURE__ */ n(hl, { facts: h, links: u, linksLabel: "Related", asideLabel: "Case study facts", children: a })
  ] });
}
const Cx = "_page_1junb_2", Sx = "_source_1junb_8", Rx = "_shots_1junb_30", kn = {
  page: Cx,
  source: Sx,
  shots: Rx
};
function Tx({ shots: e, ratio: t }) {
  return e.length === 0 ? null : e.length === 1 ? /* @__PURE__ */ n(yn, { ...e[0], ratio: t }) : /* @__PURE__ */ n("ul", { className: kn.shots, role: "list", "aria-label": "Screenshots", children: e.map((a, r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(yn, { ...a, ratio: t }) }, r)) });
}
function QA(e) {
  const { title: t, summary: a, children: r, source: l, facts: i = [], screenshots: s = [], ratio: c = "16/9" } = e;
  return /* @__PURE__ */ o("article", { className: kn.page, children: [
    /* @__PURE__ */ n(Fn, { title: t, lead: a, eyebrow: e.eyebrow, eyebrowHref: e.eyebrowHref, children: /* @__PURE__ */ n("a", { className: kn.source, href: x(l.href), children: l.label }) }),
    /* @__PURE__ */ n(Tx, { shots: s, ratio: c }),
    /* @__PURE__ */ n(hl, { facts: i, linksLabel: "Links", asideLabel: "Project facts", children: r })
  ] });
}
function xx(e) {
  const t = [], a = [];
  for (const r of e) {
    const l = { ...r, children: [] };
    for (; a.length > 0 && a[a.length - 1].level >= r.level; ) a.pop();
    const i = a[a.length - 1];
    (i === void 0 ? t : i.children).push(l), a.push(l);
  }
  return t;
}
const Lx = "_article_drsu4_2", Ax = "_meta_drsu4_8", Ex = "_tldr_drsu4_14", Ix = "_tldrLabel_drsu4_21", Mx = "_tldrText_drsu4_27", jx = "_toc_drsu4_40", Bx = "_tocTitle_drsu4_44", Px = "_tocList_drsu4_50", qx = "_tocLink_drsu4_65", Ee = {
  article: Lx,
  meta: Ax,
  tldr: Ex,
  tldrLabel: Ix,
  tldrText: Mx,
  toc: jx,
  tocTitle: Bx,
  tocList: Px,
  tocLink: qx
};
function Hx({ date: e, minutes: t }) {
  return /* @__PURE__ */ o("p", { className: Ee.meta, children: [
    /* @__PURE__ */ n("time", { dateTime: e, children: ul(e) }),
    t === void 0 ? null : ` · ${t} min read`
  ] });
}
function Ox({ children: e }) {
  return /* @__PURE__ */ o("div", { className: Ee.tldr, role: "note", "aria-label": "TL;DR", children: [
    /* @__PURE__ */ n("p", { className: Ee.tldrLabel, children: "TL;DR" }),
    /* @__PURE__ */ n("div", { className: Ee.tldrText, children: e })
  ] });
}
function ml({ nodes: e }) {
  return /* @__PURE__ */ n("ol", { className: Ee.tocList, role: "list", children: e.map((t) => /* @__PURE__ */ o("li", { children: [
    /* @__PURE__ */ n("a", { className: `${Ee.tocLink} ward-target`, href: `#${t.id}`, children: t.text }),
    t.children.length === 0 ? null : /* @__PURE__ */ n(ml, { nodes: t.children })
  ] }, t.id)) });
}
function Dx({ headings: e }) {
  const t = y();
  return e.length === 0 ? null : /* @__PURE__ */ o("nav", { className: Ee.toc, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h2", { className: Ee.tocTitle, id: t, children: "On this page" }),
    /* @__PURE__ */ n(ml, { nodes: xx(e) })
  ] });
}
function XA({ title: e, date: t, children: a, minutes: r, tldr: l, headings: i = [], eyebrow: s, eyebrowHref: c }) {
  return /* @__PURE__ */ o("article", { className: Ee.article, children: [
    /* @__PURE__ */ n(Fn, { title: e, eyebrow: s, eyebrowHref: c, children: /* @__PURE__ */ n(Hx, { date: t, minutes: r }) }),
    l === void 0 ? null : /* @__PURE__ */ n(Ox, { children: l }),
    /* @__PURE__ */ n(Dx, { headings: i }),
    /* @__PURE__ */ n(Nn, { children: a })
  ] });
}
const Fx = 220;
function zx(e) {
  return e.replace(/<[^>]*>/g, " ").split(/\s+/).filter((a) => /[\p{L}\p{N}]/u.test(a)).length;
}
function ZA(e) {
  return Math.max(1, Math.ceil(zx(e) / Fx));
}
export {
  eL as ACCENT_PRESETS,
  kL as ActionStack,
  kA as ActivityConsole,
  sL as AdminIcon,
  rp as AgentCard,
  dL as AppShell,
  iA as AppearanceStrip,
  XA as Article,
  HA as Band,
  yL as BarChart,
  gf as BoardColumn,
  OL as BoardFootnote,
  DL as BoardHeader,
  oL as BoardIcon,
  AL as BoardScroller,
  b as Btn,
  Zx as CHIP_ROLES,
  Wr as CREDENTIAL_COLUMNS,
  gL as Callout,
  sA as CapabilityRow,
  IL as CardGrid,
  YA as CaseStudy,
  EA as ChatMessage,
  Wa as Checkbox,
  m as Chip,
  ot as ClampText,
  $A as ClarificationRow,
  QL as ClauseRuleRow,
  YL as ClauseRules,
  $r as ColourLadder,
  cA as ComponentRow,
  CA as Composer,
  zL as ConfigRow,
  FL as ConfigRowHead,
  In as ConnectionMark,
  NA as ConsoleAnnounceProvider,
  AA as Conversation,
  Am as CostMeter,
  uA as CredentialRow,
  dA as CredentialRowHead,
  SA as CriteriaList,
  ec as Crumb,
  tL as DENSITIES,
  IA as DeliveryHealth,
  jL as DeniedState,
  rL as DisabledScope,
  ZL as DryRunRail,
  q_ as EmptyState,
  hA as EnvCard,
  Zt as Eyebrow,
  uT as FactList,
  UA as FeaturedCard,
  q as Field,
  yn as Figure,
  ML as FilteredEmpty,
  KA as FlowChain,
  uL as FoldText,
  xL as FormStack,
  Xt as GateChecklist,
  RA as GateLadder,
  Km as Grid,
  tA as HandoffRuleRow,
  eA as HandoffRules,
  WA as Hero,
  lL as HomeIcon,
  WL as ItemDrawer,
  mA as KeyPanel,
  Il as LIVE_EVENT_TYPES,
  Sb as LegacyBoardColumn,
  GL as LegacyBoardHeader,
  UL as LegacyConfigRow,
  JL as LegacyItemDrawer,
  pb as LegacyOverCapNote,
  VL as LegacyPreviewRail,
  yr as LegacyWorkCard,
  fT as LinkList,
  Ie as LiveIndicator,
  BL as LoadFailed,
  HL as Loading,
  Yr as MCP_SERVER_COLUMNS,
  En as Mark,
  _A as MarkUpload,
  Ke as Marker,
  vA as McpServerRow,
  fA as McpServerRowHead,
  rr as Menu,
  tr as MenuButton,
  nA as NewStreamModal,
  F_ as OverCapNote,
  Tn as OverflowRow,
  st as Overlay,
  hL as OwedCard,
  XL as PARTIAL_STEP_REASON,
  Qr as POLICY_CHIP_WIDTH,
  SL as PageFrame,
  pL as PageHeader,
  Fn as PageIntro,
  Vm as PlainList,
  bA as PolicyRow,
  VA as PostRow,
  KL as PreviewRail,
  GA as ProjectCard,
  QA as ProjectPage,
  Nn as Prose,
  OA as ProseHeading,
  on as ROLE_MATRIX_COLUMNS,
  Br as RULE_ACTIONS,
  mr as Radio,
  MA as ReadyChecklist,
  TL as RecordSection,
  TA as RequeueSheet,
  xA as ResolveBlock,
  jA as ResolvedFieldRow,
  pA as RoleMatrixRow,
  BA as RoutingTable,
  aA as RuleRow,
  gA as RunbookSteps,
  El as STREAM_STEPS,
  zA as Section,
  LL as SectionBand,
  ca as SectionHeader,
  ur as SegmentedControl,
  Xa as Select,
  PA as SessionRow,
  fL as Sidebar,
  cL as SidebarFoldButton,
  FA as SiteFooter,
  DA as SiteHeader,
  qT as SplitLayout,
  rA as StageColumn,
  EL as StageGrid,
  LA as StageHistory,
  Hy as StageListEditor,
  mL as StageSteps,
  PL as StaleStrip,
  Jt as StatStrip,
  $L as StatTiles,
  bL as StreamAvatar,
  lA as StreamRow,
  iL as StudioIcon,
  RL as SubjectRail,
  Qe as Switch,
  _L as TabLinks,
  NL as TableHead,
  wL as Tabs,
  ol as Tag,
  JA as TextList,
  Jx as ThemeProvider,
  oA as ToolRow,
  CL as TopBar,
  Xw as Tree,
  br as TreeRow,
  qA as TypedInputBlock,
  ki as UNSAFE_HREF,
  yA as ValidationList,
  Ux as VisibilityProvider,
  Vx as Visible,
  Xx as WARD_VERSION,
  Qt as WorkCard,
  qL as WriteUnavailableStrip,
  SR as agoSince,
  pl as clock,
  nN as colourStatus,
  ae as count,
  ue as duration,
  $n as elapsed,
  Qx as eventSourceTransport,
  ul as formatDate,
  yt as headingTag,
  Gt as isStreamStep,
  bt as isValidatedStreamStep,
  Mp as ladderValidation,
  S0 as mcpConnectionChip,
  $0 as mcpToolName,
  oe as money,
  pe as ms,
  pr as ordered,
  Ia as ratio,
  ZA as readTime,
  Gk as restartLabel,
  x as safeHref,
  rT as slug,
  he as stamp,
  Cn as stream,
  nL as streamChip,
  Vt as streamChipProps,
  ye as streamColour,
  Bl as streamHex,
  qt as streamInitials,
  Ml as streamVars,
  vL as uniqueStreamInitials,
  Va as useAnchoredPanel,
  At as useBorderFlash,
  Me as useDisabledScope,
  xl as useFocusTrap,
  aL as useLiveFeed,
  Yx as useReturnFocus,
  Kt as useRovingTabindex,
  Sn as useTicker,
  gl as useVisible,
  B as v,
  wA as validateMark,
  gt as validatedStep,
  ja as validatedStreamSteps,
  zx as wordCount
};
