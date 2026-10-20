import { jsx as n, Fragment as T, jsxs as l } from "react/jsx-runtime";
import { useMemo as ya, useContext as Ne, createContext as ke, useState as p, useEffect as S, useCallback as te, useRef as f, useLayoutEffect as rt, useId as y, Fragment as Na, isValidElement as no, Children as ao } from "react";
import { createPortal as ro, flushSync as ka } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const Pn = (e) => String(e).padStart(2, "0");
function pn(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${Pn(t % 60)}s` : `${Math.floor(a / 60)}h ${Pn(a % 60)}m`;
}
const oo = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const t = oo.formatToParts(new Date(e)), a = (r) => {
    var o;
    return ((o = t.find((i) => i.type === r)) == null ? void 0 : o.value) ?? "";
  };
  return `${a("day")} ${a("month")} ${a("hour")}:${a("minute")}`;
}
function le(e) {
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
function $a(e, t) {
  return `${e} / ${t}`;
}
const lo = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function io(e) {
  return lo.format(new Date(e));
}
const Ca = ke(/* @__PURE__ */ new Set());
function ex({ hidden: e, children: t }) {
  const a = ya(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Ca.Provider, { value: a, children: t });
}
function so(e) {
  return !Ne(Ca).has(e);
}
function tx({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(T, { children: so(e) ? t : a });
}
const co = "(prefers-color-scheme: dark)";
function qn() {
  return typeof window.matchMedia == "function" ? window.matchMedia(co) : null;
}
function uo(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = qn()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? qn() : null;
    if (!r) return;
    const o = () => a(r.matches);
    return o(), r.addEventListener("change", o), () => r.removeEventListener("change", o);
  }, [e]), t;
}
function Xt(e, t) {
  S(() => {
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function ho(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function nx({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const o = uo(e === "system");
  return Xt("data-theme", ho(e, o)), Xt("data-accent", t), Xt("data-density", a), /* @__PURE__ */ n(T, { children: r });
}
const mo = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function wo(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function _o(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function fo(e, t, a, r) {
  return e.shiftKey ? wo(t, a) ? r : void 0 : document.activeElement === r || _o(t) ? a : void 0;
}
function vo(e, t, a) {
  const r = a[0], o = a[a.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = fo(e, t, r, o);
  i && (e.preventDefault(), i.focus());
}
function bo(e) {
  return { onKeyDown: te(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(mo));
      vo(a, e.current, r);
    },
    [e]
  ) };
}
function ax(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [t, e]);
}
const Hn = { ArrowUp: -1, ArrowDown: 1 }, On = { ArrowLeft: -1, ArrowRight: 1 }, po = (e, t, a) => Math.min(a, Math.max(t, e));
function go(e, t) {
  if (t !== "horizontal" && e in Hn) return Hn[e];
  if (t !== "vertical" && e in On) return On[e];
}
function Dt({ orientation: e = "both" } = {}) {
  const [t, a] = p(0), r = f(/* @__PURE__ */ new Map()), o = f(!1);
  rt(() => {
    var _;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(t)) return;
    const h = u[0], w = o.current;
    o.current = !1, a(h), w && ((_ = r.current.get(h)) == null || _.focus());
  });
  const i = te((u) => a(u), []), s = te((u) => {
    var h;
    a(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = te(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(t)), _ = go(u.key, e);
      _ !== void 0 ? (u.preventDefault(), s(h[po(w + _, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [t, s, e]
  ), d = te(
    (u) => ({
      tabIndex: u === t ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(u, h) : (r.current.delete(u), u === t && (o.current = !0));
      },
      onFocus: () => a(u),
      "data-ward-roving": !0
    }),
    [t]
  );
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: i };
}
const rx = (e, t, a) => {
  const r = new EventSource(e), o = (i) => a.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, ox = "0.2.0", lx = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], yo = [1, 2, 3, 4, 5, 6], Sa = [1, 2, 3], No = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], ix = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], sx = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], j = {
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
function gn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function zt(e) {
  return yo.includes(e);
}
function ft(e) {
  return Sa.includes(e);
}
function ko(e) {
  if (!zt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function cx(e) {
  if (!zt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const $o = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Co(e) {
  if (!zt(e)) throw new Error("unvalidated stream step");
  return $o[e];
}
function Fn(e) {
  return typeof e != "string" ? null : No.includes(e) ? e : null;
}
function So(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function Ro(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function To(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function xo(e, t, a) {
  const r = So(e);
  if (r === null) return null;
  const o = Fn(a) ?? Fn(r.type);
  return o === null ? null : { ...r, type: o, id: Ro(r, t), at: To(r) };
}
function Lo(e, t) {
  return e >= pe.staleAfter ? "stale" : e >= pe.heartbeat && t === "live" ? "reconnecting" : null;
}
function Ao(e, t, a) {
  return e >= pe.heartbeat && !t && a !== null;
}
function dx(e, t) {
  const [a, r] = p("reconnecting"), [o, i] = p(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), h = f(null), w = f(0), _ = f(0), N = f(!1), k = f("reconnecting"), E = te((x) => {
    k.current = x, r(x);
  }, []), H = te(() => {
    c.current = Date.now();
  }, []), me = te((x) => {
    for (const [J, $e] of s.current)
      ($e === "*" || x.itemKey === $e) && J(x);
  }, []), re = te(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (x, J, $e) => {
        const Ke = xo(x, J, $e);
        Ke !== null && (Ke.id && (d.current = Ke.id), H(), N.current = !1, E("live"), i(Ke.at), me(Ke));
      },
      onOpen: () => {
        u.current = 0, N.current = !1, H(), E("live");
      },
      onError: () => {
        var J;
        (J = h.current) == null || J.close(), h.current = null, N.current = !0, k.current !== "stale" && E("reconnecting");
        const x = Math.min(pe.reconnectBase * 2 ** u.current, pe.reconnectMax);
        u.current += 1, w.current = window.setTimeout(re, x);
      }
    });
  }, [me, E, H, t, e]), Me = te((x) => {
    N.current = !0, x.close(), h.current = null, w.current = window.setTimeout(re, pe.reconnectBase);
  }, [re]), Qe = te((x, J) => (s.current.set(J, x), () => {
    s.current.delete(J);
  }), []);
  return S(() => (re(), _.current = window.setInterval(() => {
    const x = Date.now() - c.current, J = Lo(x, k.current);
    J && E(J);
    const $e = h.current;
    Ao(x, N.current, $e) && Me($e);
  }, pe.tick), () => {
    var x;
    window.clearInterval(_.current), window.clearTimeout(w.current), N.current = !1, (x = h.current) == null || x.close(), h.current = null;
  }), [re, Me, E]), { connection: a, lastEventAt: o, subscribe: Qe };
}
function yn(e, t) {
  const a = new Date(e).getTime(), [r, o] = p(() => Date.now());
  return S(() => {
    if (!t) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && o(Date.now());
    };
    i();
    const s = window.setInterval(i, pe.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", i);
    };
  }, [t, a]), Math.max(0, r - a);
}
const Eo = { blue: "running", orange: "waiting", green: "done" };
function Io() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Dn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function Tt(e, t) {
  const a = f(0), r = te((o) => {
    const i = o ?? t, s = e.current;
    s !== null && i !== void 0 && (Io() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${Eo[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => Dn(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => Dn(s), pe.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (o) => r(o) : () => r(t);
}
const Mo = "_root_1otpc_2", Bo = {
  root: Mo
};
function jo(e, t, a, r, o) {
  const i = [pn(t)];
  return e || i.push(`as of ${io(a)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function Ee({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const o = a !== "stale", i = yn(e, o), s = (t == null ? void 0 : t.at) ?? e, c = jo(o, i, s, r, t);
  return /* @__PURE__ */ l("span", { className: `${Bo.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const Po = "_app_1bnco_1", qo = "_side_1bnco_35", Ho = "_sideTop_1bnco_46", Oo = "_sideBody_1bnco_60", Fo = "_iconRail_1bnco_99", Do = "_railItem_1bnco_108", zo = "_railIcon_1bnco_129", Wo = "_railDot_1bnco_134", Ko = "_railLetter_1bnco_140", Go = "_main_1bnco_146", Uo = "_rail_1bnco_108", Vo = "_page_1bnco_168", Yo = "_headerRow_1bnco_191", Jo = "_sidebarToggle_1bnco_198", Qo = "_headerSlot_1bnco_203", Xo = "_headerAction_1bnco_208", Zo = "_drawerSide_1bnco_213", el = "_root_1bnco_260", tl = "_topbar_1bnco_267", nl = "_mark_1bnco_278", al = "_brand_1bnco_285", rl = "_tagline_1bnco_291", ol = "_identity_1bnco_297", ll = "_tools_1bnco_298", il = "_nav_1bnco_308", sl = "_metadata_1bnco_315", cl = "_actor_1bnco_330", dl = "_detail_1bnco_331", ul = "_content_1bnco_376", hl = "_toolsPanel_1bnco_392", ml = "_skip_1bnco_418", C = {
  app: Po,
  side: qo,
  sideTop: Ho,
  sideBody: Oo,
  iconRail: Fo,
  railItem: Do,
  railIcon: zo,
  railDot: Wo,
  railLetter: Ko,
  main: Go,
  rail: Uo,
  page: Vo,
  headerRow: Yo,
  sidebarToggle: Jo,
  headerSlot: Qo,
  headerAction: Xo,
  drawerSide: Zo,
  root: el,
  topbar: tl,
  mark: nl,
  brand: al,
  tagline: rl,
  identity: ol,
  tools: ll,
  nav: il,
  metadata: sl,
  actor: cl,
  detail: dl,
  content: ul,
  toolsPanel: hl,
  skip: ml
};
function lt(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const wl = "_scope_1an6i_2", _l = {
  scope: wl
}, Ra = ke(null);
function ux({ reason: e, actions: t = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ l("fieldset", { disabled: !0, className: `${_l.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(Ra.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Ie() {
  return Ne(Ra);
}
function Wt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : lt(e, t.reasonId);
}
const fl = "_btn_hrmlj_2", vl = "_primary_hrmlj_14", bl = "_destructive_hrmlj_25", pl = "_secondary_hrmlj_35", gl = "_ghost_hrmlj_40", yl = "_overflow_hrmlj_49", Nl = "_sm_hrmlj_56", kl = "_disabled_hrmlj_60", $l = "_withReason_hrmlj_68", Cl = "_reason_hrmlj_74", at = {
  btn: fl,
  primary: vl,
  destructive: bl,
  secondary: pl,
  ghost: gl,
  overflow: yl,
  sm: Nl,
  disabled: kl,
  withReason: $l,
  reason: Cl
};
function Sl(e, t, a, r) {
  const o = t === "sm" ? [at.sm, "ward-btn--sm"] : [], i = a ? [at.disabled] : [];
  return [at.btn, at[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Rl(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Tl(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function xl(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function Ll(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Al(e, t, a) {
  return Ll(e.describedBy, t && a);
}
function El({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${at.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function Il(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Ie()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(Ml, { ...e });
}
function Ml(e) {
  const t = Ie();
  Tl(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", o = !!(e.disabled || t), i = xl(e, t), s = y(), c = Bl(i, t);
  return /* @__PURE__ */ l(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: Sl(a, r, o, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: o,
        title: i,
        "aria-describedby": Al(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Rl(a, e.controls),
        children: Il(e)
      }
    ),
    /* @__PURE__ */ n(El, { id: s, reason: i, shown: c === Ta })
  ] });
}
function Bl(e, t) {
  return e && !t ? Ta : Na;
}
function Ta({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${at.withReason} ward-btn-withReason`, children: e });
}
let Nn = "none";
function jl(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (Nn = "key");
}
typeof document < "u" && (document.addEventListener("keydown", jl, !0), document.addEventListener("pointerdown", () => {
  Nn = "pointer";
}, !0));
function Pl() {
  return Nn === "key";
}
function wt(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const o = (s) => a(s.matches);
    return r.addEventListener("change", o), a(r.matches), () => r.removeEventListener("change", o);
  }, [e]), t;
}
const ql = "_scrim_1cawq_2", Hl = "_drawer_1cawq_10", Ol = "_sheet_1cawq_14", Fl = "_modal_1cawq_18", Dl = "_panel_1cawq_23", zl = "_start_1cawq_44", Wl = "_header_1cawq_67", Kl = "_title_1cawq_75", Gl = "_body_1cawq_79", Ul = "_close_1cawq_106", xe = {
  scrim: ql,
  drawer: Hl,
  sheet: Ol,
  modal: Fl,
  panel: Dl,
  start: zl,
  header: Wl,
  title: Kl,
  body: Gl,
  close: Ul
}, Vl = ke(null), It = [], Mt = /* @__PURE__ */ new Map();
function Yl(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Jl(e, t) {
  let a = Mt.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, Mt.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function Ql(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !Yl(r) && Jl(e, r);
}
function Xl(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (Ql(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function Zl(e) {
  for (const t of e.claims) {
    const a = Mt.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), Mt.delete(t)));
  }
}
function ei(e, t) {
  const a = { root: e, claims: [] };
  return It.push(a), Xl(a, t), a;
}
function ti(e) {
  const t = It.indexOf(e);
  t >= 0 && It.splice(t, 1), Zl(e);
}
function zn(e) {
  return e !== null && It.at(-1) === e;
}
function ni(e, t, a) {
  const r = f(null), o = f(a);
  return o.current = a, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = ei(i, t);
    return r.current = c, () => {
      var u, h;
      const d = zn(c);
      ti(c), r.current = null, d && ((h = (u = o.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), te(() => zn(r.current), []);
}
function ai(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function ri(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function oi({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${xe.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("header", { className: `${xe.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${xe.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${xe.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function li(e) {
  return `${xe.scrim} ${xe[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function ii(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${xe.panel} ${xe[e]} ward-overlay-panel${a}${r}`;
}
function si(e) {
  const t = Ne(Vl);
  return e ?? t ?? document.body;
}
function it(e) {
  const t = f(null), a = f(null), r = y(), o = si(e.container), i = wt("(min-width: 768px)"), s = ai(e.kind, i), c = ri(e, r), d = bo(a), [u] = p(Pl), h = ni(t, o, e.returnFocusTo), w = te(() => {
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
  }, [w]), ro(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: li(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: w,
        children: /* @__PURE__ */ l(
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
            className: ii(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => h() && d.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${xe.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(oi, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const ci = /^([a-z][a-z0-9+.-]*):/i, di = /* @__PURE__ */ new Set(["http", "https"]), ui = "#";
function hi(e) {
  var r, o;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (o = (r = ci.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : o.toLowerCase();
}
function L(e) {
  const t = hi(e);
  return t === void 0 || di.has(t) ? e : ui;
}
function mi(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function xa(e) {
  const t = mi(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function wi(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => xa(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const o = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [a, ...a.children]) o == null || o.observe(i);
    return r(), () => {
      a.removeEventListener("scroll", r), o == null || o.disconnect();
    };
  }, [e, t]);
}
function _i(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, o = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : o > e.clientWidth - a ? e.scrollLeft + o - e.clientWidth + a : null;
}
function fi(e, t, a) {
  rt(() => {
    const r = e.current, o = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !o) return;
    const i = _i(r, o);
    i !== null && (r.scrollLeft = Math.max(0, i)), xa(r);
  }, [e, t, a]);
}
const vi = "_row_11g8i_2", bi = {
  row: vi
};
function pi(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function kn({ label: e, children: t, count: a, as: r = "div", focusable: o = !0, rowRef: i, className: s, ...c }) {
  const d = f(null), u = i ?? d;
  return wi(u, a), /* @__PURE__ */ n(r, { ref: u, className: [bi.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...pi(o, r), ...c, children: t });
}
const gi = "_icon_1ylqy_2", yi = {
  icon: gi
};
function vt({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: yi.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function hx() {
  return /* @__PURE__ */ n(vt, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function mx() {
  return /* @__PURE__ */ l(vt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function wx() {
  return /* @__PURE__ */ l(vt, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function _x() {
  return /* @__PURE__ */ n(vt, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Ni() {
  return /* @__PURE__ */ l(vt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const La = "ward:sidebar-collapsed", ki = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function $i() {
  try {
    return window.localStorage.getItem(La) === "true";
  } catch {
    return !1;
  }
}
function Ci(e) {
  try {
    window.localStorage.setItem(La, String(e));
  } catch {
  }
}
function Si(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Ri(e) {
  return e instanceof Element && e.closest(ki) !== null;
}
function Ti(e) {
  return e.key === "[" && !Si(e) && !Ri(e.target);
}
function xi(e) {
  const [t, a] = p($i), r = () => {
    Ci(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const o = (i) => {
      var c;
      if (!Ti(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [e, t]), { collapsed: t, toggle: r };
}
function Li() {
  const e = wt("(max-width: 767.98px)"), t = wt("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function Ai(e) {
  const t = e === "phone", a = y(), r = f(null), [o, i] = p(!1);
  return o && !t && i(!1), { narrow: t, open: o, drawerId: a, slotRef: r, toggle: () => i(!o), close: () => i(!1) };
}
function Ei({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ l("div", { className: C.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: C.headerSlot, children: e }),
    Ma(t) && /* @__PURE__ */ n("span", { className: C.headerAction, children: t })
  ] }) : e;
}
function Ii(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function Mi({ sidebar: e, label: t, drawer: a }) {
  var o;
  if (Ii(a.open, a.close), !a.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(it, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (o = a.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ n("div", { className: C.drawerSide, onClick: r, children: Aa(e, !1) }) });
}
function Bi(e) {
  const [t, a] = p(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function ji(e, t) {
  const a = xi(e === "wide" && !t), r = Bi(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function Pi(e, t) {
  const a = ji(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return Hi(e.collapsed, t);
  const r = a.collapsed, o = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: o, drawsStrip: !o && typeof e.sidebar == "function", toggle: a.toggle };
}
const qi = (e) => e.collapsed && e.drawsStrip;
function Hi(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const Wn = (e) => e ? "" : void 0;
function Aa(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ea({ fold: e }) {
  return /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(Ni, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function Oi({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: C.sideTop, children: /* @__PURE__ */ n(Ea, { fold: e }) });
}
const Ia = ke(null);
function fx() {
  const e = Ne(Ia);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(Ea, { fold: e });
}
function Fi({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": gn(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Di({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: C.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ l("a", { className: C.railItem, href: L(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(Fi, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function zi({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: o }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ l("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(Oi, { fold: r, inSidebar: o && !i }),
    /* @__PURE__ */ n("div", { className: C.sideBody, hidden: i, children: Aa(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(Di, { items: a ?? [], label: t })
  ] });
}
const Ma = (e) => e != null;
function Wi(e) {
  const { sidebar: t, header: a, action: r, children: o, rail: i, iconRail: s, pageFill: c } = e, d = Ma(i), u = Li(), h = Ai(u), w = Pi(e, u), _ = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ l("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": Wn(qi(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(Ia.Provider, { value: w, children: /* @__PURE__ */ n(zi, { sidebar: t, label: _, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ l("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(Ei, { header: a, action: r, label: _, drawer: h }),
      /* @__PURE__ */ n("div", { className: C.page, "data-fill": Wn(c === !0), children: o })
    ] }),
    d && /* @__PURE__ */ n("div", { className: C.rail, children: i }),
    /* @__PURE__ */ n(Mi, { sidebar: t, label: _, drawer: h })
  ] });
}
function Ki({ destinations: e, active: t }) {
  const a = f(null);
  return fi(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(kn, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: L(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function hn({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function Gi({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ l("span", { className: C.metadata, children: [
    /* @__PURE__ */ n(hn, { value: e, className: C.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(hn, { value: t, className: C.detail })
  ] });
}
function Ui() {
  const e = wt("(max-width: 767.98px)"), t = y(), a = f(null), [r, o] = p(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Vi({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: C.tools, children: e });
}
function Yi({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: C.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function Ji(e) {
  return /* @__PURE__ */ l("header", { className: C.topbar, children: [
    /* @__PURE__ */ n("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(hn, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ n(Ki, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: C.identity, children: /* @__PURE__ */ n(Gi, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Vi, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Qi(e) {
  const t = y(), a = Ui();
  return /* @__PURE__ */ l("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: C.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Ji, { ...e, menu: a }),
    /* @__PURE__ */ n(Yi, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: C.content, children: e.children })
  ] });
}
function Xi(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function vx(e) {
  return Xi(e) ? /* @__PURE__ */ n(Wi, { ...e }) : /* @__PURE__ */ n(Qi, { ...e });
}
const Zi = "_root_itg9o_2", es = "_row_itg9o_8", ts = "_box_itg9o_14", ns = "_label_itg9o_21", as = "_labelHidden_itg9o_26", rs = "_lockedNote_itg9o_36", os = "_consequence_itg9o_44", ls = "_sample_itg9o_79", Pe = {
  root: Zi,
  row: es,
  box: ts,
  label: ns,
  labelHidden: as,
  lockedNote: rs,
  consequence: os,
  sample: ls
};
function is(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function ss({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${Pe.consequence} ward-check-consequence`, children: t }) : null;
}
function cs({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Pe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function ds(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function us(e, t, a, r) {
  const o = e.consequence ? `${t}-note` : void 0, i = ds(e, a, r), s = i ? `${t}-reason` : void 0, c = Wt(lt(o, e.describedBy, s), r);
  return { noteId: o, reason: i, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? i } };
}
function hs({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function ms({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Pe.sample, "aria-hidden": "true", children: e }) : null;
}
function Ba(e) {
  const t = y(), a = Ie(), r = is(e, a), o = us(e, t, r.disabled, a);
  return /* @__PURE__ */ l("div", { className: `${Pe.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ l("span", { className: Pe.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: t,
          type: "checkbox",
          className: `${Pe.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (i) => {
            var s;
            return !r.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, i.target.checked));
          },
          ...o.input
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: t, className: e.labelHidden ? Pe.labelHidden : Pe.label, children: [
        e.label,
        /* @__PURE__ */ n(cs, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(ms, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(hs, { id: o.reasonId, reason: o.reason }),
    /* @__PURE__ */ n(ss, { id: o.noteId, text: e.consequence })
  ] });
}
const ws = "_chip_pq6tb_2", _s = {
  chip: ws
}, fs = {
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
function vs(e, t) {
  if (e === "stream") return bs(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = fs[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function bs(e) {
  if (!e || !ft(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = gn(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${_s.chip} ward-chip ward-chip--${e}`, style: vs(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const ps = "_clamp_zn74g_3", Kn = {
  clamp: ps
};
function ot({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? Kn.clamp : `${Kn.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const gs = "_root_1btz3_2", ys = "_body_1btz3_10", Ns = "_toggle_1btz3_24", Zt = {
  root: gs,
  body: ys,
  toggle: Ns
};
function bx({ children: e, lines: t = 3, label: a }) {
  const [r, o] = p(!1), i = y();
  return /* @__PURE__ */ l("div", { className: Zt.root, children: [
    /* @__PURE__ */ n("div", { id: i, className: Zt.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: Zt.toggle, "aria-expanded": r, "aria-controls": i, onClick: () => o(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const ks = "_root_1a4s8_2", $s = "_words_1a4s8_16", Cs = "_title_1a4s8_23", Ss = "_actions_1a4s8_27", pt = {
  root: ks,
  words: $s,
  title: Cs,
  actions: Ss
};
function px({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ l("section", { className: pt.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ l("div", { className: pt.words, children: [
      /* @__PURE__ */ n("strong", { className: pt.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: pt.actions, children: a })
  ] });
}
const Rs = "_root_8zmpu_2", Ts = "_step_8zmpu_12", xs = "_dot_8zmpu_38", Ls = "_label_8zmpu_51", ct = {
  root: Rs,
  step: Ts,
  dot: xs,
  label: Ls
}, As = { done: ", done", now: ", current", next: "" };
function Es({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ l("li", { className: ct.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${ct.dot} ward-running` : ct.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ct.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: As[e.state] })
  ] });
}
function gx({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: ct.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(Es, { step: r, running: t }, r.label)) });
}
function bt(e) {
  return typeof e == "number" && ft(e) ? e : null;
}
function ye(e, t) {
  const a = bt(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function Kt(e, t) {
  const a = bt(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const Is = "_root_13eei_3", Ms = "_nav_13eei_8", Bs = "_list_13eei_16", js = "_item_13eei_24", Ps = "_link_13eei_44", qs = "_sep_13eei_54", Hs = "_current_13eei_58", Os = "_chips_13eei_62", je = {
  root: Is,
  nav: Ms,
  list: Bs,
  item: js,
  link: Ps,
  sep: qs,
  current: Hs,
  chips: Os
};
function Fs({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: je.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${je.link} ward-target`, href: L(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function Ds({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: je.root, children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: je.nav, children: [
    /* @__PURE__ */ n("ol", { className: je.list, children: e.map((r, o) => /* @__PURE__ */ l("li", { className: je.item, children: [
      o > 0 ? /* @__PURE__ */ n("span", { className: je.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(Fs, { step: r, isCurrent: a && o === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${je.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function ja(e, t, a) {
  const r = f(a);
  r.current = a, S(() => {
    if (!e) return;
    const o = (i) => {
      var s;
      (s = t.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", o), () => document.removeEventListener("mousedown", o);
  }, [e, t]);
}
const zs = 500;
function Pa(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function qa() {
  const e = f(""), t = f(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, zs), e.current);
}
const gt = 4;
function Ws(e, t, a) {
  const r = Math.max(0, a - e.bottom - gt * 2), o = Math.max(0, e.top - gt * 2);
  return t <= r || r >= o ? { top: e.bottom + gt, maxHeight: r } : { top: e.top - gt - Math.min(t, o), maxHeight: o };
}
function Ks(e, t, a, r) {
  const o = { start: e.left, end: e.right - t }, i = { start: o.start + t <= a, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, a - t));
}
function Gs(e, t, a, r) {
  return { ...Ws(e, t.height, a.height), left: Ks(e, t.width, a.width, r) };
}
function xt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Us(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function Vs(e, t, a) {
  const r = Us(t, a);
  e.style.setProperty("--ward-anchor-width", xt(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const o = e.getBoundingClientRect(), i = document.documentElement;
  return { edges: r, box: o, view: { width: i.clientWidth, height: i.clientHeight } };
}
function Ys(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, o) => r.scrollTop = a[o]);
}
function Gn(e, t, a, r) {
  const o = Ys(e), i = Vs(e, t, r), s = Gs(i.edges, i.box, i.view, a);
  Object.assign(e.style, { left: xt(s.left - i.box.left), top: xt(s.top - i.box.top), maxHeight: xt(s.maxHeight) }), o();
}
function Js(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function Ha(e, t, a = "start", r) {
  rt(() => {
    const o = t.current, i = e.current;
    if (!o || !i) return;
    const s = Js(o), c = () => Gn(o, i, a, r == null ? void 0 : r.current), d = (u) => {
      o.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), rt(() => {
    t.current && e.current && Gn(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const Qs = "_root_1lgbn_2", Xs = "_trigger_1lgbn_7", Zs = "_value_1lgbn_47", ec = "_menu_1lgbn_65", tc = "_find_1lgbn_87", nc = "_list_1lgbn_103", ac = "_option_1lgbn_114", rc = "_check_1lgbn_133", oc = "_empty_1lgbn_144", ge = {
  root: Qs,
  trigger: Xs,
  value: Zs,
  menu: ec,
  find: tc,
  list: nc,
  option: ac,
  check: rc,
  empty: oc
}, lc = 7;
function ic(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function Un(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function sc(e, t) {
  const [a, r] = p(e.defaultOpen === !0), [o, i] = p(""), [s, c] = p(() => Un(e.options, e.value)), d = (u) => {
    var h;
    ka(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: o,
    active: s,
    entries: ic(e.options, o),
    findable: e.options.length > lc,
    show: () => {
      e.disabled || (i(""), c(Un(e.options, e.value)), r(!0));
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
function cc(e, t) {
  const a = f(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function dc(e) {
  const t = qa();
  return (a) => {
    const r = t(a), o = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    o >= 0 && e.to(o);
  };
}
function Oa(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function uc(e) {
  return { ...Oa(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function Fa(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const o = t[r.key];
    if (!o) return a(r);
    r.preventDefault(), r.stopPropagation(), o();
  };
}
const hc = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function mc(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      hc.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function wc({ entry: e, at: t, menu: a, ids: r, value: o }) {
  return /* @__PURE__ */ l(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === o,
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
function $n(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function _c({ menu: e, ids: t, focusRef: a }) {
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
      "aria-activedescendant": $n(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: Fa(e, Oa(e), () => {
      })
    }
  );
}
function fc({ props: e, menu: t, ids: a, focusRef: r, trigger: o }) {
  const i = dc(t), s = f(null);
  Ha(o, s);
  const c = (d) => {
    Pa(d) && i(d.key);
  };
  return /* @__PURE__ */ l("div", { ref: s, className: ge.menu, children: [
    t.findable && /* @__PURE__ */ n(_c, { menu: t, ids: a, focusRef: r }),
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
        "aria-activedescendant": t.findable ? void 0 : $n(t, a),
        onKeyDown: Fa(t, uc(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(wc, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: ge.empty, children: "No match" })
  ] });
}
function vc(e, t) {
  const a = e.open ? $n(e, t) : void 0;
  S(() => {
    var r, o;
    a && ((o = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [a]);
}
function Da(...e) {
  return e.filter(Boolean).join(" ");
}
function bc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function pc({ props: e, menu: t, ids: a, trigger: r, wantFocus: o }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ie()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: Da(ge.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": t.open,
      "aria-controls": t.open ? a.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": lt(e["aria-describedby"], a.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...mc(t, o),
      children: /* @__PURE__ */ n("span", { id: a.value, className: ge.value, "data-placeholder": i || void 0, children: bc(e) })
    }
  );
}
function za(e) {
  const t = Ie(), a = t ? { ...e, disabled: !0, "aria-describedby": Wt(e["aria-describedby"], t) } : e, r = y(), o = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = f(null), s = f(null), c = f(null), d = sc(a, s), u = cc(d.open, c);
  return ja(d.open, i, () => d.close(!1)), vc(d, o), /* @__PURE__ */ l("div", { ref: i, className: Da(ge.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(pc, { props: a, menu: d, ids: o, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(fc, { props: a, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const gc = "_field_1ensj_2", yc = "_label_1ensj_8", Nc = "_labelHidden_1ensj_15", kc = "_control_1ensj_25", $c = "_mono_1ensj_45", Cc = "_area_1ensj_50", Sc = "_invalid_1ensj_57", De = {
  field: gc,
  label: yc,
  labelHidden: Nc,
  control: kc,
  mono: $c,
  area: Cc,
  invalid: Sc
}, Rc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, Wa = (e) => `${e}-label`;
function Tc({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? Rc : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function xc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    za,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": Wa(t.id),
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
function Lc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
const Ac = { input: Tc, select: xc, textarea: Lc };
function Ec(e, t, a) {
  const r = Ac[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function Ic(e, t, a, r) {
  const o = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": o,
    "aria-describedby": Wt(lt(o ? a : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function Mc(e) {
  const t = e.mono ? [De.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [De.area] : [];
  return [De.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function Bc(e) {
  return e ? `${De.label} ${De.labelHidden} ward-field-label` : `${De.label} ward-field-label`;
}
function q(e) {
  const t = y(), a = `${t}-msg`, r = Ic(e, t, a, Ie()), o = Mc(e);
  return /* @__PURE__ */ l("div", { className: `${De.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: Wa(t), className: Bc(e.labelHidden), htmlFor: t, children: e.label }),
    Ec(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${De.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const jc = "_root_sjvm0_2", Pc = "_trigger_sjvm0_9", qc = "_ghost_sjvm0_27", Hc = "_panel_sjvm0_46", Oc = "_edged_sjvm0_67", Fc = "_menu_sjvm0_73", Dc = "_group_sjvm0_78", zc = "_heading_sjvm0_83", Wc = "_item_sjvm0_89", Kc = "_description_sjvm0_105", Gc = "_large_sjvm0_109", Uc = "_touch_sjvm0_113", Vc = "_icon_sjvm0_117", Yc = "_label_sjvm0_125", Jc = "_text_sjvm0_130", Qc = "_trailing_sjvm0_138", Xc = "_check_sjvm0_144", Zc = "_separator_sjvm0_183", ed = "_footer_sjvm0_189", td = "_find_sjvm0_196", nd = "_findGlyph_sjvm0_208", ad = "_findInput_sjvm0_214", rd = "_empty_sjvm0_230", A = {
  root: jc,
  trigger: Pc,
  ghost: qc,
  panel: Hc,
  edged: Oc,
  menu: Fc,
  group: Dc,
  heading: zc,
  item: Wc,
  description: Kc,
  large: Gc,
  touch: Uc,
  icon: Vc,
  label: Yc,
  text: Jc,
  trailing: Qc,
  check: Xc,
  separator: Zc,
  footer: ed,
  find: td,
  findGlyph: nd,
  findInput: ad,
  empty: rd
}, Ka = ke(null);
function od(e, t) {
  const [a, r] = p({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (o) => r((i) => ({ open: !0, start: o, request: i.request + 1 })),
    close: (o) => {
      var i;
      ka(() => r((s) => ({ ...s, open: !1 }))), o && ((i = t.current) == null || i.focus());
    }
  };
}
const ld = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function id(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = ld.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function Cn(...e) {
  return e.filter(Boolean).join(" ");
}
function sd(e, t = {}, a = "field") {
  const { ref: r, className: o, ...i } = t;
  return { ...i, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: Cn(A.trigger, a === "ghost" ? A.ghost : void 0, o) };
}
function Ga(e) {
  const t = y(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = f(null), o = f(null), i = od(e.defaultOpen === !0, o);
  return ja(i.open, r, () => i.close(!1)), /* @__PURE__ */ l("div", { ref: r, className: Cn(A.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...sd(o, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...id(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(Ka.Provider, { value: { ...a, popup: i, button: o }, children: e.children })
  ] });
}
function cd(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function dd(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const ud = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function hd(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function md(e, t) {
  return e === "separator" ? e : "items" in e ? hd(e, t) : t(e) ? e : null;
}
function wd(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function _d(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (o) => o.label.toLowerCase().includes(a);
  return wd(e.map((o) => md(o, r)).filter((o) => o !== null));
}
const Ua = (e, t) => (e % t + t) % t;
function He(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const o = Ua(t + a * r, e.length);
    if (!e[o].disabled) return o;
  }
  return -1;
}
const fd = (e) => e.split("").every((t) => t === e[0]);
function vd(e, t, a) {
  const r = fd(a), o = r ? a[0] : a, i = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = Ua(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function bd(e) {
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
function pd(e, t) {
  const { items: a } = e, r = () => {
    var o;
    return (o = e.refs.current[e.current()]) == null ? void 0 : o.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(He(a, e.current(), 1))],
    ["ArrowUp", () => e.focus(He(a, e.current(), -1))],
    ["Home", () => e.focus(He(a, -1, 1))],
    ["End", () => e.focus(He(a, a.length, -1))],
    ["Escape", () => t.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function gd(e, t, a) {
  const r = qa(), o = pd(e, t), i = (s) => {
    if (Pa(s)) {
      if (!a) return e.focus(vd(e.items, e.current(), r(s.key)));
      s.preventDefault(), a(s.key);
    }
  };
  return {
    onKeyDown: (s) => {
      const c = o.get(s.key);
      if (!c) return i(s);
      s.preventDefault(), s.stopPropagation(), c();
    },
    onKeyUp: (s) => {
      s.key === " " && s.preventDefault();
    }
  };
}
function yd(e) {
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
function Nd(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? He(e, -1, 1) : t;
}
function kd(e, t) {
  const { start: a, request: r } = t, o = f(e);
  o.current = e, S(() => {
    const { items: i, focus: s } = o.current;
    a && s(a === "first" ? Nd(i) : He(i, i.length, -1));
  }, [a, r]);
}
function $d({ row: e, nav: t, popup: a }) {
  const { item: r, at: o } = e;
  return {
    onMouseDown: (i) => i.preventDefault(),
    onMouseMove: () => {
      !r.disabled && t.current() !== o && t.focus(o);
    },
    onClick: (i) => {
      var s;
      if (r.disabled) return i.preventDefault();
      (s = r.onSelect) == null || s.call(r), a.close(!0);
    }
  };
}
const Cd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function Sd(e, t) {
  return Cd(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function Rd(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: A.label, children: e.label });
  return e.description ? /* @__PURE__ */ l("span", { className: A.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: A.description, children: e.description })
  ] }) : a;
}
function Td() {
  return /* @__PURE__ */ n("svg", { className: A.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Vn(e, t) {
  return /* @__PURE__ */ l(T, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: A.icon, "aria-hidden": "true", children: e.icon }) : null,
    Rd(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: A.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(Td, {}) : null
  ] });
}
function Va(e) {
  const { item: t, at: a } = e.row, r = y(), o = {
    ref: (i) => {
      e.nav.refs.current[a] = i;
    },
    role: "menuitem",
    tabIndex: -1,
    className: A.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...Sd(t, r),
    ...$d(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: L(t.href), ...o, children: Vn(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...o, children: Vn(t, r) });
}
function xd({ heading: e, rows: t, nav: a, popup: r }) {
  const o = y();
  return /* @__PURE__ */ l("div", { role: "group", "aria-labelledby": o, className: A.group, children: [
    /* @__PURE__ */ n("div", { id: o, className: A.heading, children: e }),
    t.map((i) => /* @__PURE__ */ n(Va, { row: i, nav: a, popup: r }, i.at))
  ] });
}
function Ld({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: A.separator }) : e.kind === "group" ? /* @__PURE__ */ n(xd, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(Va, { row: e.row, nav: t, popup: a });
}
function Ad() {
  const e = Ne(Ka);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Ed() {
  return /* @__PURE__ */ l("svg", { className: A.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function Id(e, t) {
  const a = () => He(e.items, -1, 1);
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(a())],
    ["ArrowUp", () => e.focus(He(e.items, e.items.length, -1))],
    ["Enter", () => {
      var r;
      return (r = e.refs.current[a()]) == null ? void 0 : r.click();
    }],
    ["Escape", () => t.close(!0)]
  ]);
}
function Md({ find: e, query: t, setQuery: a, input: r, nav: o, popup: i, menuId: s }) {
  const c = Id(o, i), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ l("div", { className: A.find, children: [
    /* @__PURE__ */ n(Ed, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: A.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function Bd(e, t) {
  const [a, r] = p(""), o = f(null), i = t !== void 0 && ud(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = o.current) == null || d.focus();
  };
  return i ? { find: t, query: a, setQuery: r, input: o, toFind: s, entries: _d(e, a) } : { query: a, setQuery: r, input: o, entries: e };
}
const jd = { regular: void 0, large: A.large, touch: A.touch }, Pd = (e, t) => Cn(A.panel, e ? A.edged : void 0, jd[t]);
function qd({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: A.empty, children: e.empty ?? "No matches" });
}
function Ya({ entries: e, footer: t, align: a = "start", find: r, edges: o, size: i = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = Ad(), h = f(null);
  Ha(u, h, a, o);
  const w = Bd(e, r), _ = cd(w.entries), N = bd(_.flatMap(dd).map((H) => H.item)), k = gd(N, s, w.toFind), E = yd(s);
  return kd(N, s), /* @__PURE__ */ l("div", { ref: h, className: Pd(o, i), ...E, children: [
    w.find && /* @__PURE__ */ n(Md, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: A.menu, ...k, children: _.map((H, me) => /* @__PURE__ */ n(Ld, { block: H, nav: N, popup: s }, me)) }),
    /* @__PURE__ */ n(qd, { find: w.find, count: N.items.length }),
    t && /* @__PURE__ */ n("p", { className: A.footer, children: t })
  ] });
}
function Hd(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function Ja(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !Hd(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const Od = (e, t) => e.reduce((a, r) => a + r + t, -t);
function Fd({ room: e, widths: t, more: a, gap: r }, o) {
  const i = t.map((d, u) => u);
  if (Od(t, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([o]);
  let c = t[o] + r + a;
  for (const d of i)
    if (d !== o) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const en = (e) => Number.parseFloat(e) || 0, Yn = (e) => e.getBoundingClientRect().width;
function Dd(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - en(a.paddingInlineStart) - en(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), Yn),
    more: r ? Yn(r) : 0,
    gap: en(a.columnGap)
  };
}
function zd(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const Wd = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function Qa(e, t, a, r = ':scope > [role="tab"]') {
  const [o, i] = p(null);
  return rt(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = Dd(s, r);
      i((u) => Wd(u, d) ? u : d);
    };
    return c(), zd(s, c);
  }, [e, a, r]), o && Fd(o, t);
}
const Kd = "_strip_1zvzj_2", Gd = "_fits_1zvzj_19", Ud = "_probe_1zvzj_27", Vd = "_moreRoot_1zvzj_36", Yd = "_more_1zvzj_36", Jd = "_tab_1zvzj_55", Qd = "_count_1zvzj_91", Xd = "_badge_1zvzj_97", Y = {
  strip: Kd,
  fits: Gd,
  probe: Ud,
  moreRoot: Vd,
  more: Yd,
  tab: Jd,
  count: Qd,
  badge: Xd
}, Xa = "More";
function Zd(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const Jn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Sn = (e) => e.badge === void 0 ? Jn(e) : `${Jn(e)}, ${e.badge}`;
function Za(e) {
  return `${Y.strip} ward-tabs ward-tabs--${e}`;
}
const eu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function tu({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ l(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${Y.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : Sn(e),
      onClick: () => r(e.id),
      ...a,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ l(T, { children: [
          " ",
          /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
        ] }),
        e.badge === void 0 ? null : /* @__PURE__ */ n("span", { className: Y.badge, children: e.badge })
      ]
    }
  );
}
function nu(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((i) => i.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function au({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(Ga, { label: Xa, className: Y.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: Y.more }, children: /* @__PURE__ */ n(Ya, { align: "end", entries: e.map((r) => ({ label: Sn(r), onSelect: () => a(r.id) })) }) });
}
function ru(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : eu;
}
function yx({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: o }) {
  const i = Dt({ orientation: "horizontal" }), s = Zd(e, t);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = f(null);
  Ja(c, o);
  const d = Qa(c, s, e.map(Sn).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ l("div", { ref: c, className: `${Za(o)} ${Y.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(tu, { tab: h, active: t, place: ru(i, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${A.trigger} ${Y.more} ${Y.probe}`, children: Xa }),
    u.length > 0 && /* @__PURE__ */ n(au, { tabs: u, trigger: i.itemProps(e.length), onPick: nu(c, a) })
  ] });
}
const Qn = 7, er = "More", ou = ":scope > a", tr = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, lu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function iu(e, t) {
  return !e || e.includes(t) ? {} : lu;
}
function su({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, className: `${Y.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ l(T, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
    ] })
  ] });
}
function cu({ links: e }) {
  return /* @__PURE__ */ n(Ga, { label: er, className: Y.moreRoot, trigger: { className: Y.more }, children: /* @__PURE__ */ n(Ya, { align: "end", entries: e.map((t) => ({ label: tr(t), href: t.href })) }) });
}
function Nx({ links: e, active: t, label: a, level: r }) {
  if (e.length > Qn) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${Qn} — the set is fixed`);
  const o = f(null);
  Ja(o, r);
  const i = Math.max(0, e.findIndex((d) => d.id === t)), s = Qa(o, i, e.map(tr).join(`
`), ou), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ l("nav", { ref: o, className: `${Za(r)} ${Y.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(su, { link: d, current: d.id === t, place: iu(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${A.trigger} ${Y.more} ${Y.probe}`, children: er }),
    c.length > 0 && /* @__PURE__ */ n(cu, { links: c })
  ] });
}
const du = "_root_v56ff_3", uu = "_segment_v56ff_9", Xn = {
  root: du,
  segment: uu
};
function nr({ options: e, value: t, onChange: a, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Dt({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${Xn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: Xn.segment,
      "aria-checked": d.value === t,
      disabled: o,
      "aria-describedby": i,
      onClick: () => a(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const hu = "_sidebar_s9o1j_3", mu = "_brand_s9o1j_9", wu = "_mark_s9o1j_17", _u = "_word_s9o1j_24", fu = "_nav_s9o1j_30", vu = "_navItem_s9o1j_39", bu = "_footLink_s9o1j_49", pu = "_group_s9o1j_58", gu = "_groupName_s9o1j_65", yu = "_agents_s9o1j_81", Nu = "_agent_s9o1j_81", ku = "_root_s9o1j_96", $u = "_agentTop_s9o1j_105", Cu = "_dot_s9o1j_112", Su = "_agentName_s9o1j_124", Ru = "_agentMeta_s9o1j_138", Tu = "_foot_s9o1j_49", xu = "_footName_s9o1j_150", Lu = "_footLinks_s9o1j_157", Au = "_linkBrand_s9o1j_184", Eu = "_label_s9o1j_205", Iu = "_note_s9o1j_210", Mu = "_footer_s9o1j_226", I = {
  sidebar: hu,
  brand: mu,
  mark: wu,
  word: _u,
  nav: fu,
  navItem: vu,
  new: "_new_s9o1j_48",
  footLink: bu,
  group: pu,
  groupName: gu,
  agents: yu,
  agent: Nu,
  root: ku,
  agentTop: $u,
  dot: Cu,
  agentName: Su,
  agentMeta: Ru,
  foot: Tu,
  footName: xu,
  footLinks: Lu,
  linkBrand: Au,
  label: Eu,
  note: Iu,
  footer: Mu
};
function Bu({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ l(
    "a",
    {
      className: I.agent,
      href: L(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ l("span", { className: I.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: I.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": gn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: I.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: I.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function ju({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: I.foot, children: [
    /* @__PURE__ */ n("span", { className: I.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: I.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${I.footLink} ward-target`, href: L(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function Pu({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: o, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ l("nav", { className: I.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ l("div", { className: I.brand, children: [
      /* @__PURE__ */ n("span", { className: I.mark }),
      /* @__PURE__ */ n("span", { className: I.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: I.nav, children: t.map((s) => /* @__PURE__ */ n("a", { className: I.navItem, href: L(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ l("div", { className: I.group, children: [
      /* @__PURE__ */ l("span", { className: I.groupName, children: [
        a,
        " · ",
        ae(r.length)
      ] }),
      o && /* @__PURE__ */ n("a", { className: I.new, href: L(o.href), children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: I.agents, children: r.map((s) => /* @__PURE__ */ n(Bu, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(ju, { shared: i })
  ] });
}
function qu(e) {
  return e.destinations ?? e.items ?? [];
}
function Hu({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.linkBrand, children: e });
}
function Ou({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.footer, children: e });
}
function Fu({ link: e, active: t }) {
  return /* @__PURE__ */ l("a", { href: L(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: I.note, children: e.note })
  ] });
}
function Du(e) {
  return /* @__PURE__ */ l("aside", { className: `${I.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Hu, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: qu(e).map((t) => /* @__PURE__ */ n(Fu, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(Ou, { children: e.children })
  ] });
}
function zu(e) {
  return "agents" in e;
}
function kx(e) {
  return zu(e) ? /* @__PURE__ */ n(Pu, { ...e }) : /* @__PURE__ */ n(Du, { ...e });
}
const Wu = "_mark_wlgi8_3", Ku = {
  mark: Wu
}, Gu = { met: "✓", unmet: "", failed: "✕" };
function Rn({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Ku.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: Gu[e]
    }
  );
}
const Uu = "_avatar_1t33a_3", Vu = {
  avatar: Uu
};
function Bt(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function Yu(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [Bt(e), ...[...t.slice(1)].map((r) => a + r)];
}
function Ju(e, t) {
  const a = Yu(e).find((o) => !t.has(o));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(Bt(e).charAt(0) + String(r)); ) r += 1;
  return Bt(e).charAt(0) + String(r);
}
function $x(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const o = Ju(r, t);
    t.add(o), a.set(r, o);
  }
  return a;
}
function Qu(e) {
  return e != null && ft(e) ? ko(e) : void 0;
}
function Cx({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: Vu.avatar, "data-size": a, "aria-hidden": "true", style: Qu(t), children: r ?? Bt(e) });
}
const Xu = "_marker_br9fi_2", Zu = {
  marker: Xu
}, eh = {
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
}, th = { running: " ward-running" };
function We({ size: e, kind: t, label: a }) {
  const r = { "--marker": eh[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Zu.marker} ward-marker ward-marker--${t}${th[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const nh = "_root_ti0pq_2", ah = "_chip_ti0pq_11", rh = "_noCase_ti0pq_23", yt = {
  root: nh,
  chip: ah,
  noCase: rh
};
function oh(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Tn({ connection: e, since: t, lastEventAt: a }) {
  const r = oh(t, a), o = yn(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${yt.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(We, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${yt.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: yt.noCase, children: pn(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${yt.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    he(r)
  ] });
}
const lh = "_root_yylks_2", ih = "_context_yylks_13", sh = "_row_yylks_1", ch = "_heading_yylks_27", dh = "_headingWrap_yylks_35", uh = "_meta_yylks_41", hh = "_chips_yylks_49", mh = "_title_yylks_56", wh = "_consequence_yylks_66", _h = "_actionsWrap_yylks_73", fh = "_actions_yylks_73", vh = "_action_yylks_73", bh = "_overflowPanel_yylks_102", ph = "_measureClip_yylks_113", gh = "_measure_yylks_113", U = {
  root: lh,
  context: ih,
  row: sh,
  heading: ch,
  headingWrap: dh,
  meta: uh,
  chips: hh,
  title: mh,
  consequence: wh,
  actionsWrap: _h,
  actions: fh,
  action: vh,
  overflowPanel: bh,
  measureClip: ph,
  measure: gh
};
function yh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(ot, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function Nh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function kh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function $h({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ l("div", { className: U.meta, children: [
    /* @__PURE__ */ n(Nh, { chips: e }),
    /* @__PURE__ */ n(kh, { consequence: t, consequenceHint: a })
  ] });
}
function Ch({ title: e, chips: t, consequence: a, consequenceHint: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: U.heading, children: [
    /* @__PURE__ */ n(yh, { title: e, density: o }),
    /* @__PURE__ */ n($h, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function mn({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function Zn({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Sh({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: o }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(Zn, { disclosure: o }) : t ? [/* @__PURE__ */ n(Zn, { disclosure: o }, "more"), /* @__PURE__ */ n(mn, { actions: e }, "actions")] : /* @__PURE__ */ n(mn, { actions: e });
}
function Rh(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function Th({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(mn, { actions: e }) });
}
function xh(e, t) {
  const a = y(), [r, o] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: a, toggle: () => o(!i) }, close: () => {
    var d, u;
    o(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const Lh = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function Ah(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && Lh(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function Eh({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(Ds, { path: e.path, current: e.current }) });
}
function Ih(...e) {
  return e.some((t) => t === null);
}
function Mh(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Bh(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + Mh(e);
}
function jh(e, t, a, r, o) {
  if (o === 0 || Ih(t, a, r)) return !1;
  const [i, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - Bh(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Ph(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function qh(e) {
  return no(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Hh(e, t) {
  return t.length === 0 && e.length === 1 && qh(e[0]);
}
function Oh(e, t) {
  const a = f(null), r = f(null), o = f(null), i = f(null), [s, c] = p(!1);
  return S(() => {
    const d = a.current;
    if (!Ph(d)) return;
    const u = () => c(jh(d, r.current, o.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: o, measureRef: i, collapsed: s && !t };
}
function Fh({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ l("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] }) });
}
function Dh({ connection: e }) {
  return e ? /* @__PURE__ */ n(Tn, { connection: e.connection, since: e.since }) : null;
}
function Sx({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: o, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: _, actionsRef: N, measureRef: k, collapsed: E } = Oh(s, Hh(s, c)), H = c.length > 0, { disclosure: me, close: re } = xh(E || H, N), Me = Rh(c, s, E, u);
  return /* @__PURE__ */ l("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(Eh, { crumb: Ah(e, r, t) }),
    /* @__PURE__ */ l("div", { className: U.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: _, className: U.headingWrap, children: /* @__PURE__ */ n(Ch, { title: r, chips: a, consequence: o, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ l("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(Dh, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ n(Sh, { actions: s, hasMore: H, collapsed: E, onOverflow: u, disclosure: me }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Th, { actions: Me, disclosure: me, onEscape: re }),
    /* @__PURE__ */ n(Fh, { actions: s, hasMore: H, measureRef: k })
  ] });
}
const zh = "_root_td96x_2", Wh = "_body_td96x_16", ea = {
  root: zh,
  body: Wh
};
function Rx({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${ea.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: ea.body, children: a }) });
}
const Kh = "_root_bf1pc_2", Gh = "_table_bf1pc_9", Uh = "_caption_bf1pc_14", Vh = "_series_bf1pc_23", Yh = "_category_bf1pc_31", Jh = "_cell_bf1pc_39", Qh = "_track_bf1pc_45", Xh = "_lane_bf1pc_52", Zh = "_bar_bf1pc_56", em = "_value_bf1pc_63", tm = "_swatch_bf1pc_70", nm = "_empty_bf1pc_78", Z = {
  root: Kh,
  table: Gh,
  caption: Uh,
  series: Vh,
  category: Yh,
  cell: Jh,
  track: Qh,
  lane: Xh,
  bar: Zh,
  value: em,
  swatch: tm,
  empty: nm
}, am = "—", ta = 6;
function rm(e, t) {
  if (t.length < 1 || t.length > ta)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${ta}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function om(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function ar(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function lm(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function im({ value: e, top: t, step: a, format: r, missing: o }) {
  const i = lm(e, t), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ l("span", { className: Z.track, children: [
    /* @__PURE__ */ n("span", { className: Z.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${Z.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Z.value, children: e === null ? o : r(e) })
  ] }) });
}
function sm({ series: e }) {
  return /* @__PURE__ */ n(T, { children: e.map((t, a) => /* @__PURE__ */ l("th", { scope: "col", className: Z.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Z.swatch, "data-step": ar(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function cm({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ l("section", { className: `${Z.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Z.empty, children: t })
  ] });
}
function dm({ title: e, categories: t, series: a, top: r, format: o = ae, categoryHead: i = "Category", missing: s = am }) {
  return /* @__PURE__ */ n("div", { className: `${Z.root} ward-barchart`, children: /* @__PURE__ */ l("table", { className: Z.table, children: [
    /* @__PURE__ */ n("caption", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Z.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(sm, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Z.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(im, { value: u.values[d], top: r, step: ar(h, a.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function Tx(e) {
  rm(e.categories, e.series);
  const t = om(e.series);
  return t === 0 ? /* @__PURE__ */ n(cm, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(dm, { ...e, top: t });
}
const um = "_root_1bfqw_2", hm = "_figure_1bfqw_7", mm = "_of_1bfqw_13", wm = "_bar_1bfqw_18", _m = "_rows_1bfqw_38", fm = "_row_1bfqw_38", vm = "_label_1bfqw_49", bm = "_amount_1bfqw_54", Be = {
  root: um,
  figure: hm,
  of: mm,
  bar: wm,
  rows: _m,
  row: fm,
  label: vm,
  amount: bm
};
function pm({ spent: e, ceiling: t, breakdown: a }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ l("div", { className: `${Be.root} ward-costmeter`, children: [
    /* @__PURE__ */ l("p", { className: `${Be.figure} ward-stat-value`, children: [
      le(e),
      " ",
      /* @__PURE__ */ l("span", { className: Be.of, children: [
        "of ",
        le(t)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Be.bar} ward-costbar`,
        min: 0,
        max: t,
        value: e,
        "aria-valuetext": `${le(e)} of ${le(t)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    a && /* @__PURE__ */ n("ul", { className: Be.rows, children: a.map((o) => /* @__PURE__ */ l("li", { className: `${Be.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Be.label, children: o.label }),
      /* @__PURE__ */ n("span", { className: Be.amount, children: le(o.amount) })
    ] }, o.label)) })
  ] });
}
const gm = "_frame_f7bxz_2", ym = "_table_f7bxz_6", Nm = "_th_f7bxz_12", km = "_td_f7bxz_13", $m = "_sort_f7bxz_53", Cm = "_row_f7bxz_65", Sm = "_empty_f7bxz_73", Oe = {
  frame: gm,
  table: ym,
  th: Nm,
  td: km,
  sort: $m,
  row: Cm,
  empty: Sm
}, Rm = { asc: "ascending", desc: "descending" };
function Tm(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return Rm[t.direction];
}
function xm(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: Oe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function Lm(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Am({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Oe.th,
      style: Lm(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Tm(e, t),
      children: xm(e, a)
    }
  );
}
function Em({ row: e, props: t }) {
  const a = t.rowId(e), r = (t.lockedIds ?? []).includes(a);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: Oe.row,
      "data-selected": a === t.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: t.columns.map((o) => /* @__PURE__ */ n(
        "td",
        {
          className: Oe.td,
          "data-align": o.align,
          "data-mono": o.mono,
          "data-drop": o.dropPriority,
          "data-label": t.narrow ? o.header : void 0,
          children: t.renderCell(e, o.key)
        },
        o.key
      ))
    }
  );
}
function Im({
  label: e,
  columns: t,
  rows: a,
  rowId: r,
  renderCell: o,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u,
  narrow: h
}) {
  return a.length === 0 ? /* @__PURE__ */ n("div", { className: Oe.empty, children: u }) : /* @__PURE__ */ n("div", { className: Oe.frame, "data-narrow": h, children: /* @__PURE__ */ l("table", { className: Oe.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Oe.head, children: t.map((w) => /* @__PURE__ */ n(Am, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(Em, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: o, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const Mm = "_list_v0s52_2", Bm = {
  list: Mm
};
function jm({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: Bm.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const Pm = "_label_1u62a_2", qm = {
  label: Pm
};
function xx({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: qm.label, children: t.header }) }, t.key)) }) });
}
const Hm = "_stack_bp6a0_2", Om = {
  stack: Hm
};
function Lx({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Om.stack, "data-ward-action-stack": "", children: e });
}
const Fm = "_set_1z0sq_2", Dm = "_legend_1z0sq_7", zm = "_row_1z0sq_15", Wm = "_control_1z0sq_20", Km = "_input_1z0sq_26", Gm = "_label_1z0sq_31", Um = "_consequence_1z0sq_36", Ge = {
  set: Fm,
  legend: Dm,
  row: zm,
  control: Wm,
  input: Km,
  label: Gm,
  consequence: Um
};
function rr({ legend: e, options: t, value: a, onChange: r, disabled: o, name: i, describedBy: s, variant: c }) {
  const d = y(), u = i ?? d;
  return /* @__PURE__ */ l("fieldset", { className: Ge.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: Ge.legend, children: e }),
    t.map((h) => {
      const w = `${u}-${h.value}`, _ = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ l("div", { className: Ge.row, children: [
        /* @__PURE__ */ l("span", { className: Ge.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: Ge.input,
              value: h.value,
              checked: a === h.value,
              disabled: o,
              "aria-describedby": lt(_, s),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: w, className: Ge.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: _, className: `${Ge.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Vm = "_root_11gpw_2", Ym = "_head_11gpw_10", Jm = "_note_11gpw_29", Qm = "_index_11gpw_34", Xm = "_dot_11gpw_38", Zm = "_counter_11gpw_49", ew = "_trailing_11gpw_57", Ue = {
  root: Vm,
  head: Ym,
  note: Jm,
  index: Qm,
  dot: Xm,
  counter: Zm,
  trailing: ew
};
function tw({ index: e }) {
  return e ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("span", { className: `${Ue.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ue.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function nw({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ue.counter, "aria-hidden": "true", children: e }) : null;
}
function na({ title: e, index: t, note: a, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Ue.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Ue.head, children: [
      /* @__PURE__ */ n(tw, { index: t }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ue.note, children: a }),
    /* @__PURE__ */ n(nw, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ue.trailing, children: i })
  ] });
}
const aw = "_strip_c3x3u_2", rw = "_cell_c3x3u_7", ow = "_value_c3x3u_12", lw = "_link_c3x3u_29", iw = "_label_c3x3u_49", sw = "_tiles_c3x3u_101", ze = {
  strip: aw,
  cell: rw,
  value: ow,
  link: lw,
  label: iw,
  tiles: sw
};
function or(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((o) => o.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const lr = (e) => `${ze.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function cw({ cell: e }) {
  return /* @__PURE__ */ l("div", { className: ze.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: lr(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${ze.label} ward-stat-label`, children: e.label })
  ] });
}
function dw({ cell: e, href: t }) {
  return /* @__PURE__ */ l("div", { className: ze.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: lr(e), title: e.hint, children: /* @__PURE__ */ l("a", { className: `${ze.link} ward-stat-link`, href: L(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${ze.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const ir = (e) => e.href === void 0 ? /* @__PURE__ */ n(cw, { cell: e }, e.label) : /* @__PURE__ */ n(dw, { cell: e, href: e.href }, e.label);
function Gt({ cells: e, divided: t = !1 }) {
  return or("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${ze.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(ir) });
}
const aa = 6;
function Ax({ cells: e }) {
  or("StatTiles", e, [1, 2 * aa]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, aa) };
  return /* @__PURE__ */ n("dl", { className: `${ze.tiles} ward-stattiles`, style: t, children: e.map(ir) });
}
const uw = "_root_1eb1u_2", hw = "_track_1eb1u_8", mw = "_thumb_1eb1u_46", ww = "_labelHidden_1eb1u_64", _w = "_label_1eb1u_64", fw = "_lockedNote_1eb1u_84", Ve = {
  root: uw,
  track: hw,
  thumb: mw,
  labelHidden: ww,
  label: _w,
  lockedNote: fw
};
function vw(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function bw(e) {
  return e ? `${Ve.label} ${Ve.labelHidden}` : Ve.label;
}
function pw(e, t, a) {
  return e && !t && a ? a : void 0;
}
function gw(e, t, a, r) {
  return { "aria-describedby": Wt(lt(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function yw({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Je({ label: e, checked: t, onChange: a, disabled: r, locked: o, describedBy: i, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, w = Ie(), { on: _, off: N } = vw(t, r, o, w !== null), k = pw(N, w !== null, c);
  return /* @__PURE__ */ l("span", { className: `${Ve.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": _,
        "aria-label": e,
        "aria-labelledby": d,
        ...gw(h, i, w, k),
        className: `${Ve.track} ward-switch`,
        "data-on": _,
        "data-locked": o ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!_)),
        children: /* @__PURE__ */ n("span", { className: Ve.thumb })
      }
    ),
    /* @__PURE__ */ l("label", { id: d, htmlFor: u, className: bw(s), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ve.lockedNote, children: "always on" })
    ] }),
    /* @__PURE__ */ n(yw, { id: h, reason: k })
  ] });
}
const Nw = "_bar_1vp69_2", kw = "_skip_1vp69_11", $w = "_mark_1vp69_22", Cw = "_nav_1vp69_30", Sw = "_list_1vp69_34", Rw = "_select_1vp69_41", Tw = "_selectTrigger_1vp69_45", xw = "_dest_1vp69_52", Lw = "_actor_1vp69_71", Aw = "_actorMark_1vp69_84", Ew = "_actorLabel_1vp69_89", Iw = "_tagline_1vp69_108", se = {
  bar: Nw,
  skip: kw,
  mark: $w,
  nav: Cw,
  list: Sw,
  select: Rw,
  selectTrigger: Tw,
  dest: xw,
  actor: Lw,
  actorMark: Aw,
  actorLabel: Ew,
  tagline: Iw
};
function Mw(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function Bw(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function Ex({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: o, onNavigate: i, skipTo: s = "main" }) {
  const c = Bw(r);
  return /* @__PURE__ */ l("header", { className: se.bar, children: [
    /* @__PURE__ */ n("a", { className: `${se.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: se.mark, children: e }),
    o && /* @__PURE__ */ n("span", { className: se.tagline, children: o }),
    /* @__PURE__ */ l("nav", { className: se.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: se.list, children: t.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${se.dest} ward-target`,
          href: L(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        za,
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
    c && /* @__PURE__ */ l("span", { className: se.actor, children: [
      /* @__PURE__ */ n("span", { className: se.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: Mw(c) })
    ] })
  ] });
}
const jw = "_tree_zzoob_2", Pw = "_item_zzoob_6", qw = "_row_zzoob_10", Hw = "_button_zzoob_22", jt = {
  tree: jw,
  item: Pw,
  row: qw,
  button: Hw
}, sr = ke(null);
function Ow({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Dt({ orientation: "vertical" });
  return /* @__PURE__ */ n(sr.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: jt.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const Fw = { ArrowRight: !0, ArrowLeft: !1 };
function ra(e) {
  return e ? !0 : void 0;
}
function Dw(e, t) {
  const a = Fw[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function zw(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function Ww(e) {
  const t = [jt.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function Kw(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Gw(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Uw(e) {
  return typeof e == "string" ? e : void 0;
}
function Vw({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Yw({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function cr(e) {
  const t = Ne(sr);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = Kw(e);
  return /* @__PURE__ */ l("li", { className: jt.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Ww(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": ra(e.unresolved),
        "data-inherited": ra(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${jt.button} ward-treeitem-btn`,
            onClick: () => zw(e),
            onKeyDown: (r) => Dw(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Gw(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Uw(e.label), children: e.label }),
              /* @__PURE__ */ n(Vw, { value: e.detail }),
              /* @__PURE__ */ n(Yw, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Jw = "_frame_gxspk_2", Qw = "_subjectRail_gxspk_22", Xw = "_subject_gxspk_22", Zw = "_rail_gxspk_42", e_ = "_record_gxspk_57", t_ = "_recordBody_gxspk_102", n_ = "_stageGrid_gxspk_157", a_ = "_band_gxspk_171", r_ = "_bandBody_gxspk_179", o_ = "_bandActions_gxspk_184", l_ = "_scroller_gxspk_192", i_ = "_board_gxspk_219", s_ = "_lanes_gxspk_228", c_ = "_cardGrid_gxspk_262", ee = {
  frame: Jw,
  subjectRail: Qw,
  subject: Xw,
  rail: Zw,
  record: e_,
  recordBody: t_,
  stageGrid: n_,
  band: a_,
  bandBody: r_,
  bandActions: o_,
  scroller: l_,
  board: i_,
  lanes: s_,
  cardGrid: c_
};
function Ix({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: ee.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function oa(e) {
  return e ? "true" : void 0;
}
function Mx({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: ee.subjectRail, "data-ward-subject-rail": a, "data-ruled": oa(i), children: [
    /* @__PURE__ */ n("div", { className: ee.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ee.rail, "data-sticky": oa(o), "aria-label": r, children: t })
  ] });
}
function Bx({ title: e, children: t, note: a, trailing: r, pad: o = "block", label: i, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(na, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ l("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(na, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: ee.recordBody, "data-pad": o, "data-measure": c, children: t })
  ] });
}
const d_ = "_form_1j8ub_2", u_ = "_fields_1j8ub_9", h_ = "_actions_1j8ub_19", tn = {
  form: d_,
  fields: u_,
  actions: h_
};
function jx({ label: e, children: t, actions: a, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: tn.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: tn.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: tn.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function Px({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ l("section", { className: ee.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ee.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: ee.bandActions, children: t })
  ] });
}
const m_ = "(max-width: 767.98px)";
function xn({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(kn, { className: ee.scroller, label: e, count: a ?? ao.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function w_({ lanes: e, label: t, laneLabel: a }) {
  const [r, o] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ l("div", { className: ee.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(q, { kind: "select", label: a, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ n(xn, { label: t, children: i == null ? void 0 : i.content })
  ] });
}
function __({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: ee.board, "data-ward-board": "", children: /* @__PURE__ */ n(xn, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(Na, { children: a.content }, a.id)) }) });
}
function qx({ children: e, label: t = "Workflow board", lanes: a, laneLabel: r = "Column" }) {
  const o = wt(m_);
  return a === void 0 ? /* @__PURE__ */ n(xn, { label: t, children: e }) : o ? /* @__PURE__ */ n(w_, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(__, { lanes: a, label: t });
}
function Hx({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), i = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ n(kn, { className: ee.stageGrid, label: a, count: o, "data-ward-stage-grid": "", "data-floor": r, style: i, children: t });
}
function Ox({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${ee.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const f_ = "_block_6tv5x_3", v_ = "_sentence_6tv5x_10", b_ = "_meta_6tv5x_19", p_ = "_ways_6tv5x_24", g_ = "_action_6tv5x_38", y_ = "_strip_6tv5x_42", N_ = "_loading_6tv5x_61", k_ = "_label_6tv5x_69", $_ = "_counter_6tv5x_76", ve = {
  block: f_,
  sentence: v_,
  meta: b_,
  ways: p_,
  action: g_,
  strip: y_,
  loading: N_,
  label: k_,
  counter: $_
};
function C_({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: ve.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function Ut({ sentence: e, action: t, children: a, role: r = "status", tone: o, kind: i, ask: s }) {
  return /* @__PURE__ */ l("div", { className: `${ve.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ l("p", { className: ve.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ l(T, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(C_, { action: t })
  ] });
}
function S_(e) {
  return /* @__PURE__ */ n(Ut, { ...e, kind: "ward-emptystate" });
}
function Fx({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(Ut, { sentence: e, action: a, children: /* @__PURE__ */ l("p", { className: ve.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function R_({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${ve.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function Dx({ ways: e, ...t }) {
  return /* @__PURE__ */ n(Ut, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(R_, { ways: e }) });
}
function zx({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(Ut, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ l("p", { className: ve.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function Wx({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ l("div", { className: ve.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function Kx({ queued: e, since: t }) {
  return /* @__PURE__ */ l("div", { className: ve.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function Gx({ label: e, startedAt: t }) {
  const a = f(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = p(!1);
  S(() => {
    const s = window.setTimeout(() => o(!0), pe.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = yn(a.current, r);
  return /* @__PURE__ */ l("div", { className: `${ve.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: ve.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: ve.counter, children: pn(i) }) : null
  ] });
}
const T_ = "_note_cigdt_2", x_ = {
  note: T_
};
function L_({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ l("p", { className: x_.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const A_ = "_card_k7btg_3", E_ = "_hit_k7btg_31", I_ = "_head_k7btg_44", M_ = "_title_k7btg_51", B_ = "_meta_k7btg_57", j_ = "_since_k7btg_66", P_ = "_sep_k7btg_76", q_ = "_fields_k7btg_80", H_ = "_field_k7btg_80", O_ = "_last_k7btg_98", F_ = "_reason_k7btg_110", de = {
  card: A_,
  hit: E_,
  head: I_,
  title: M_,
  meta: B_,
  since: j_,
  sep: P_,
  fields: q_,
  field: H_,
  last: O_,
  reason: F_
}, D_ = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function z_(e, t, a) {
  const r = Tt(e, "blue"), o = Tt(e, "orange"), i = Tt(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: o, green: i };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = D_[d.type];
      u && c[u]();
    });
  }, [r, a, i, t, o]);
}
const W_ = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function K_(e, t) {
  return W_[t](e);
}
function G_({ item: e, connection: t }) {
  const a = /* @__PURE__ */ n("span", { className: de.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ l("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    a,
    /* @__PURE__ */ n(Ee, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ l("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.waitsOn,
    a,
    /* @__PURE__ */ l("span", { className: de.since, children: [
      ue(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function U_({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ l("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function V_({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Y_({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: de.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: de.field, children: K_(e, a) }, a)) });
}
const wn = (e) => e ? !0 : void 0;
function J_(e) {
  return { "--stream": ye(e.streamStep, "id") };
}
function Q_(e, t, a) {
  e == null || e(t, a);
}
function X_(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Z_({ item: e, stale: t }) {
  var r, o;
  const a = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: de.last, "data-stale": wn(t), children: a }) : null;
}
function Vt(e) {
  const t = e.fields ?? [], a = e.item, r = f(null);
  z_(r, a.key, e.feed);
  const o = X_(e.feed), i = J_(a);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: de.card,
      style: i,
      "data-selected": wn(e.selected),
      "data-flagged": wn(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: de.hit, onClick: (s) => Q_(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(U_, { item: a }),
        /* @__PURE__ */ n(ot, { as: "p", className: de.title, text: a.title }),
        /* @__PURE__ */ n(G_, { item: a, connection: o }),
        /* @__PURE__ */ n(V_, { reason: a.blockedReason }),
        /* @__PURE__ */ n(Y_, { item: a, fields: t }),
        /* @__PURE__ */ n(Z_, { item: a, stale: o === "stale" })
      ]
    }
  );
}
const ef = "_column_1j8bi_3", tf = "_head_1j8bi_21", nf = "_label_1j8bi_30", af = "_count_1j8bi_39", rf = "_list_1j8bi_53", ht = {
  column: ef,
  head: tf,
  label: nf,
  count: af,
  list: rf
};
function dr(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function of({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ l("div", { className: ht.head, children: [
    /* @__PURE__ */ n("h2", { className: ht.label, id: a, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ l("span", { className: ht.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function lf(e) {
  return /* @__PURE__ */ n("div", { className: ht.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      Vt,
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
function sf({ column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && t.length > e.cap, w = dr(t, r);
  return /* @__PURE__ */ l("section", { className: ht.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(of, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(lf, { column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n(L_, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const cf = "_foot_cs4jr_2", df = "_note_cs4jr_13", uf = "_link_cs4jr_19", nn = {
  foot: cf,
  note: df,
  link: uf
};
function Ux({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: nn.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: nn.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${nn.link} ward-target`, href: L(e), children: "Configure board" })
  ] });
}
const hf = "_head_1tfi5_3", mf = "_identity_1tfi5_12", wf = "_titleRow_1tfi5_18", _f = "_title_1tfi5_18", ff = "_key_1tfi5_35", vf = "_rollup_1tfi5_45", bf = "_tools_1tfi5_53", pf = "_swatch_1tfi5_101", gf = "_mark_1tfi5_108", Re = {
  head: hf,
  identity: mf,
  titleRow: wf,
  title: _f,
  key: ff,
  rollup: vf,
  tools: bf,
  swatch: pf,
  mark: gf
}, la = "initials:";
function yf(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Nf(e) {
  const t = [yf(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function kf(e) {
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ l("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Nf(e)
  ] });
}
function $f(e) {
  return e.startsWith(la) ? e.slice(la.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function Cf({ markRef: e, streamStep: t }) {
  const a = { "--stream": ye(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Re.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: $f(e) }) : /* @__PURE__ */ n("span", { className: Re.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Sf({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function Vx({
  stream: e,
  rollups: t,
  connection: a,
  lastEventAt: r,
  owners: o,
  owner: i,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ l("div", { className: Re.head, children: [
    /* @__PURE__ */ l("div", { className: Re.identity, children: [
      /* @__PURE__ */ l("div", { className: Re.titleRow, children: [
        /* @__PURE__ */ n(Cf, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Re.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Re.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Re.rollup, "aria-live": "polite", children: kf(t) })
    ] }),
    /* @__PURE__ */ l("div", { className: Re.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Sf, { owners: o, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Tn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const Rf = "_head_1sejb_14", Tf = "_line_1sejb_15", xf = "_cHandle_1sejb_36", Lf = "_cName_1sejb_41", Af = "_nameLine_1sejb_49", Ef = "_cLabel_1sejb_56", If = "_cCap_1sejb_61", Mf = "_cShown_1sejb_66", Bf = "_name_1sejb_49", jf = "_noCap_1sejb_88", Pf = "_state_1sejb_102", qf = "_handle_1sejb_111", Hf = "_sub_1sejb_137", O = {
  head: Rf,
  line: Tf,
  cHandle: xf,
  cName: Lf,
  nameLine: Af,
  cLabel: Ef,
  cCap: If,
  cShown: Mf,
  name: Bf,
  noCap: jf,
  state: Pf,
  handle: qf,
  sub: Hf
}, Of = "can't be hidden or collapsed", Ff = "terminal · counted, not a column", Df = "A human gate is always shown, so people see what waits for them.", zf = "A terminal stage is counted, not shown as a column.";
function Yx() {
  return /* @__PURE__ */ l("div", { className: O.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: O.cHandle }),
    /* @__PURE__ */ n("span", { className: O.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: O.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: O.cShown, children: "Shown" })
  ] });
}
function Wf(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function Kf(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function ia(e) {
  return e.gate ? Of : e.terminal ? Ff : Kf(e.agentsMounted);
}
function Gf(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function Uf({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: O.cName, children: [
    /* @__PURE__ */ l("span", { className: O.nameLine, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    ia(e) && /* @__PURE__ */ n("span", { className: O.sub, children: ia(e) })
  ] });
}
function Vf(e) {
  return e === void 0 ? "" : String(e);
}
function Yf(e) {
  return e === "" ? void 0 : Number(e);
}
function Jf({ name: e, onReorder: t }) {
  const a = Ie();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ n("span", { className: O.cHandle }) : /* @__PURE__ */ n("span", { className: O.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: O.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && Gf(r, t),
      children: "⠿"
    }
  ) });
}
function Qf({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${O.cCap} ${O.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: O.cCap, children: /* @__PURE__ */ n(q, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Vf(t.cap), onChange: (r) => a({ ...t, cap: Yf(r) }) }) });
}
function Xf(e) {
  return e.gate ? Df : e.terminal ? zf : void 0;
}
function Zf({ stage: e, config: t, onChange: a }) {
  const r = Ie() !== null, o = Wf(e, t.shown), i = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ l("span", { className: O.cShown, children: [
    /* @__PURE__ */ n(Je, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, disabledReason: Xf(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: O.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!o.shown), children: o.state })
  ] });
}
function ev(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function Jx({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: O.line, "data-kind": ev(e), children: [
    /* @__PURE__ */ n(Jf, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Uf, { stage: e }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: /* @__PURE__ */ n(q, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (o) => a({ ...t, label: o }) }) }),
    /* @__PURE__ */ n(Qf, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(Zf, { stage: e, config: t, onChange: a })
  ] });
}
const tv = "_body_8qsv9_2", nv = "_head_8qsv9_9", av = "_summary_8qsv9_19", rv = "_block_8qsv9_20", ov = "_actionsBlock_8qsv9_21", lv = "_title_8qsv9_41", iv = "_note_8qsv9_46", sv = "_k_8qsv9_51", cv = "_kv_8qsv9_58", dv = "_row_8qsv9_64", uv = "_label_8qsv9_75", hv = "_value_8qsv9_84", mv = "_quote_8qsv9_90", wv = "_actions_8qsv9_21", _v = "_resolve_8qsv9_111", D = {
  body: tv,
  head: nv,
  summary: av,
  block: rv,
  actionsBlock: ov,
  title: lv,
  note: iv,
  k: sv,
  kv: cv,
  row: dv,
  label: uv,
  value: hv,
  quote: mv,
  actions: wv,
  resolve: _v
};
function fv(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function vv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Ee, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function bv(e) {
  const t = bt(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function pv(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function gv(e, t, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Kt(bv(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...fv(e),
    ...pv(a),
    ...vv(e, t)
  ];
}
function yv({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: D.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: D.k, children: t }),
    e
  ] });
}
function Nv(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function kv({ item: e, showKey: t }) {
  const a = Nv(e);
  return !t && !a ? null : /* @__PURE__ */ l("div", { className: D.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function $v({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: D.block, children: [
    /* @__PURE__ */ n("p", { className: D.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: D.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: D.note, children: e.agentMeta })
  ] }) : null;
}
function Qx({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: o, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), w = gv(e, o, d);
  return /* @__PURE__ */ n(it, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: D.body, children: [
    /* @__PURE__ */ n(kv, { item: e, showKey: u }),
    /* @__PURE__ */ l("div", { className: D.summary, children: [
      /* @__PURE__ */ n("h2", { className: D.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: D.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: D.kv, children: w.map(([_, N, k]) => /* @__PURE__ */ l("div", { className: D.row, children: [
      /* @__PURE__ */ n("dt", { className: D.label, children: _ }),
      /* @__PURE__ */ n("dd", { className: D.value, children: N })
    ] }, k ?? _)) }),
    /* @__PURE__ */ n($v, { item: e }),
    /* @__PURE__ */ l("div", { className: D.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: D.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: D.note, children: c })
    ] }),
    /* @__PURE__ */ n(yv, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Cv = "_root_3azmy_2", Sv = "_list_3azmy_7", Rv = "_item_3azmy_12", Tv = "_box_3azmy_18", xv = "_text_3azmy_23", Lv = "_note_3azmy_28", Xe = {
  root: Cv,
  list: Sv,
  item: Rv,
  box: Tv,
  text: xv,
  note: Lv
};
function Yt({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ l("div", { className: Xe.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${Xe.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${Xe.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Xe.box, children: /* @__PURE__ */ n(Rn, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Xe.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${Xe.note} ward-checklist-note`, children: t })
  ] });
}
const Av = "_rail_znbbp_2", Ev = "_k_znbbp_11", Iv = "_head_znbbp_19", Mv = "_section_znbbp_25", Bv = "_card_znbbp_39", jv = "_strip_znbbp_46", Pv = "_skeleton_znbbp_60", qv = "_skeletonLabel_znbbp_74", Hv = "_bar_znbbp_80", Ov = "_note_znbbp_89", _e = {
  rail: Av,
  k: Ev,
  head: Iv,
  section: Mv,
  card: Bv,
  strip: jv,
  skeleton: Pv,
  skeletonLabel: qv,
  bar: Hv,
  note: Ov
};
function Fv(e) {
  return (t) => e == null ? void 0 : e(t);
}
function an({ title: e, children: t }) {
  return /* @__PURE__ */ l("section", { className: _e.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: _e.k, children: e }),
    t
  ] });
}
function Dv({ column: e, count: t }) {
  return /* @__PURE__ */ l("div", { className: _e.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: _e.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: _e.bar, "aria-hidden": "true" }, r))
  ] });
}
function zv({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(sf, { column: o, items: t.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, o.id));
}
function Wv(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(zv, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(Dv, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function Xx(e) {
  const t = Fv(e.onOpen), a = dr(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: _e.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${_e.k} ${_e.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(an, { title: "Card", children: /* @__PURE__ */ n("div", { className: _e.card, children: a && /* @__PURE__ */ n(Vt, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ l(an, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: _e.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Wv, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: _e.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(an, { title: "Effect of this config", children: /* @__PURE__ */ n(Yt, { items: e.effects, density: "compact" }) })
  ] });
}
function Kv(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function Gv(e) {
  return Math.ceil(e.length / 2);
}
function Uv(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function ur(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Vv(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const o = ur(e);
  o !== void 0 && a(o), r(Uv(e.type));
}
function Yv(e, t, a, r, o) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (i) => Vv(i, a, r, o));
  }, [e, t, a, r, o]);
}
function Jv(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Qv(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Xv(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Zv(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(Gv(t ?? [])) + ")"
  };
}
function eb(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function tb(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: le(e.cost) }) : null;
}
function nb(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function ab(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Ee, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function rb(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function ob(e, t) {
  return t === void 0 ? e : Kv(e, t.ref);
}
function lb(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function _t(e) {
  return e === !0 ? "true" : void 0;
}
function hr(e) {
  const t = e.item, a = t.run, r = a !== void 0, o = f(null), i = Tt(o), s = f(/* @__PURE__ */ new Set()), [c, d] = p(Jv(t));
  Yv(e.feed, t.key, s, d, i);
  const u = Qv(t, r), h = Xv(t, a), w = Zv(t, e.fields), _ = rb(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...lb(e),
      className: "ward-workcard",
      "data-flagged": _t(t.flagged),
      "data-selected": _t(e.selected),
      style: w,
      ref: ob(o, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        eb(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          tb(t, e.fields),
          nb(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          ab(a, c, e.connection, t.changedAt),
          _ !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: _, children: _ }) : null
        ] })
      ]
    }
  ) });
}
function ib({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function sb(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function cb(e, t, a) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function db(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(ib, { count: e.items.length, cap: e.column.cap });
}
function ub(e, t) {
  return e.roving ?? t;
}
function hb(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function mb(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    hr,
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
function wb(e) {
  const t = y(), a = Dt({ orientation: "vertical" }), r = ub(e, a), o = sb(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": _t(o), "data-gate": _t(e.column.gate), children: [
    cb(e.column, e.items.length, t),
    db(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...hb(e, a), children: mb(e, r) })
  ] });
}
function _b(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function fb(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function vb(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function Zx(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: _b(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      fb(e),
      vb(e.onConfigure),
      /* @__PURE__ */ n(Tn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function bb(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function pb(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Je, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Je, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function gb(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(T, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function eL(e) {
  const t = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": _t(bb(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: pb(e) }),
    /* @__PURE__ */ n(q, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(Ba, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    gb(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function tL(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(hr, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(wb, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function yb(e, t) {
  const a = ur(e);
  a !== void 0 && t(a);
}
function Nb(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => yb(r, a));
  }, [e, t, a]);
}
function kb(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function $b(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function Cb(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Ee, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Sb(e, t) {
  return /* @__PURE__ */ l(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function nL(e) {
  var s;
  const t = e.item, a = t.run, [r, o] = p((s = t.run) == null ? void 0 : s.lastStep);
  Nb(e.feed, t.key, o);
  const i = [...kb(t), ...$b(t)];
  return /* @__PURE__ */ l(it, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Cb(a, r)
    ] }),
    Sb(t, e.actions)
  ] });
}
const Rb = "_card_1nkkx_3", Tb = "_head_1nkkx_30", xb = "_mark_1nkkx_38", Lb = "_name_1nkkx_50", Ab = "_chips_1nkkx_71", Eb = "_description_1nkkx_77", Ib = "_run_1nkkx_82", Mb = "_sep_1nkkx_91", Bb = "_facts_1nkkx_97", jb = "_fact_1nkkx_97", Pb = "_factLabel_1nkkx_111", qb = "_factValue_1nkkx_115", ie = {
  card: Rb,
  head: Tb,
  mark: xb,
  name: Lb,
  chips: Ab,
  description: Eb,
  run: Ib,
  sep: Mb,
  facts: Bb,
  fact: jb,
  factLabel: Pb,
  factValue: qb
}, Hb = { live: "done", draft: "running", paused: "meta" };
function Ob(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function Fb({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: Hb[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function Db({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function zb({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Ee, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function Wb({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ l("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function Kb(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Gb({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: o, facts: i, className: s }) {
  const c = { "--stream": ye(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": d,
      className: Ob(s),
      style: c,
      "data-selected": d,
      "data-paused": Kb(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ l("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: L(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(Db, { description: e.description }),
        /* @__PURE__ */ n(zb, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Fb, { versions: e.versions }),
        /* @__PURE__ */ n(Wb, { facts: i })
      ]
    }
  );
}
const Ub = "_list_4dcyc_2", Vb = "_row_4dcyc_11", Yb = "_head_4dcyc_23", Jb = "_id_4dcyc_30", Qb = "_lock_4dcyc_35", Xb = "_reason_4dcyc_41", Zb = "_remove_4dcyc_46", ep = "_clauses_4dcyc_50", tp = "_clause_4dcyc_50", np = "_label_4dcyc_64", ap = "_cell_4dcyc_71", rp = "_value_4dcyc_76", ce = {
  list: Ub,
  row: Vb,
  head: Yb,
  id: Jb,
  lock: Qb,
  reason: Xb,
  remove: Zb,
  clauses: ep,
  clause: tp,
  label: np,
  cell: ap,
  value: rp
}, mr = ke(!1);
function aL({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(mr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function op({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(q, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => a(e.key, o) });
}
function lp({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function ip({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ l("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(lp, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function sa(e, t) {
  return e.locked ? void 0 : t;
}
function rL({ rule: e, onChange: t, onRemove: a }) {
  if (!Ne(mr)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = sa(e, t);
  return /* @__PURE__ */ l("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(ip, { rule: e, onRemove: sa(e, a) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(op, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const sp = "_ladder_1xdeh_2", cp = "_cell_1xdeh_7", dp = "_empty_1xdeh_26", up = "_name_1xdeh_34", hp = "_holder_1xdeh_40", mp = "_request_1xdeh_46", wp = "_swatches_1xdeh_51", _p = "_swatch_1xdeh_51", fp = "_tilesFrame_1xdeh_78", vp = "_tiles_1xdeh_78", bp = "_tile_1xdeh_78", pp = "_bar_1xdeh_117", gp = "_hex_1xdeh_128", yp = "_note_1xdeh_138", B = {
  ladder: sp,
  cell: cp,
  empty: dp,
  name: up,
  holder: hp,
  request: mp,
  swatches: wp,
  swatch: _p,
  tilesFrame: fp,
  tiles: vp,
  tile: bp,
  bar: pp,
  hex: gp,
  note: yp
}, oL = "not validated yet, pending a CVD matrix and dark stepping";
function Np(e) {
  return e.reserved ? "reserved" : ft(e.step) ? "validated" : "partial";
}
function wr(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function kp(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function $p({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(We, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${B.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Cp(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function Sp(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const ca = (e) => String(e).padStart(2, "0");
function Rp(e, t, a) {
  return e === "reserved" ? "Reserved until revalidated" : a ? "yours" : t ?? wr(e, void 0);
}
function Tp({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("span", { className: `${B.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.hex} ward-ladder-hex`, children: r ? `step ${ca(e)}` : Co(e) }),
    /* @__PURE__ */ n("span", { className: `${B.note} ward-ladder-note`, children: r ? a : `Step ${ca(e)} · ${a}` })
  ] });
}
function xp({ step: e, value: t, taken: a, onChange: r, presentation: o, disabled: i }) {
  const s = Np(e), c = wr(s, a), d = c !== "free", u = d || i, h = t === e.step, w = e.name ?? `Step ${e.step}`, _ = () => {
    u || r(e.step);
  }, N = `${w} · ${o === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...Sp(d, h, u), "data-validation": s, style: kp(e, s), onClick: _, onKeyDown: (E) => Cp(E, _) }, label: N, name: w, holder: c, validation: s, note: Rp(s, a, h), step: e.step };
}
const Lp = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${B.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${B.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Tp, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${B.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n($p, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${B.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${B.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Ap(e) {
  return Lp[e.presentation](xp(e));
}
function Ep(e) {
  for (const t of e)
    if (!t.reserved && !zt(t.step)) throw new Error("colour ladder renders token steps only");
}
function Ip() {
  return /* @__PURE__ */ l("div", { className: `${B.cell} ward-ladder-cell ${B.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${B.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${B.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Mp(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Bp = { list: B.ladder, swatches: B.swatches, tiles: B.tilesFrame };
function jp() {
  return /* @__PURE__ */ l("div", { className: `${B.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${B.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${B.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Pp = { list: Ip, swatches: () => null, tiles: jp };
function qp(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function _r(e) {
  const t = e.takenBy ?? {}, a = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Ep(e.steps);
  const r = Mp(e), o = Pp[r], i = /* @__PURE__ */ l(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(Ap, { step: s, value: e.value, taken: t[s.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...qp(e.disabled === !0), className: `${Bp[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: B.tiles, children: i }) : i });
}
const Hp = "_rail_s06lm_2", Op = "_section_s06lm_12", Fp = "_sectionFlush_s06lm_22", Dp = "_head_s06lm_26", zp = "_headLabel_s06lm_34", Wp = "_sample_s06lm_42", Kp = "_sampleLabel_s06lm_47", Gp = "_sampleTitle_s06lm_54", Up = "_sampleMeta_s06lm_59", Vp = "_trace_s06lm_65", Yp = "_traceHead_s06lm_70", Jp = "_steps_s06lm_78", Qp = "_step_s06lm_78", Xp = "_stepTitle_s06lm_97", Zp = "_hollow_s06lm_107", eg = "_stepBody_s06lm_115", tg = "_stepDetail_s06lm_127", ng = "_publish_s06lm_132", ag = "_reason_s06lm_138", rg = "_note_s06lm_143", og = "_reveal_s06lm_148", $ = {
  rail: Hp,
  section: Op,
  sectionFlush: Fp,
  head: Dp,
  headLabel: zp,
  sample: Wp,
  sampleLabel: Kp,
  sampleTitle: Gp,
  sampleMeta: Up,
  trace: Vp,
  traceHead: Yp,
  steps: Jp,
  step: Qp,
  stepTitle: Xp,
  hollow: Zp,
  stepBody: eg,
  stepDetail: tg,
  publish: ng,
  reason: ag,
  note: rg,
  reveal: og
}, da = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, lg = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, ig = { ok: "greenFill", finding: "orangeFill", action: "blue" }, sg = { notSimulated: "not simulated", running: "running" };
function cg(e) {
  return e.presentation === "foundry";
}
function dg(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const a = t.filter((r) => !r.met);
  return a.length > 0 ? `Publish is disabled: ${a.length} of ${t.length} gate conditions unmet: ${a[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function ug(e, t) {
  var r;
  const a = lg[e.status];
  return a !== void 0 ? a : ((r = t.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function hg(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function mg(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function wg(e) {
  if (hg(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function _g(e) {
  const [t, a] = p(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function fg(e) {
  const t = sg[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(We, { size: 6, kind: ig[e.kind], label: e.kind });
}
function vg(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function bg(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Ee, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function pg(e) {
  const { step: t } = e;
  return /* @__PURE__ */ l(_g, { kind: t.kind, children: [
    /* @__PURE__ */ n(fg, { kind: t.kind }),
    /* @__PURE__ */ l("span", { className: $.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: $.stepTitle, children: t.title }),
      /* @__PURE__ */ n(vg, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(bg, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function gg(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(ue(t)), a.join(" · ");
}
function fr(e) {
  const t = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.traceHead, id: t, children: gg(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: $.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(pg, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function yg(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ l("div", { className: `${$.sample} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ l("p", { className: $.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ l("p", { className: $.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function Ng(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function kg(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? $a(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Gt, { divided: !0, cells: t }) });
}
function $g(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: $a(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function Cg(e) {
  const t = $g(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ l("p", { className: $.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Gt, { divided: !0, cells: t }) });
}
function vr(e) {
  const t = y();
  return e.reason !== null ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("p", { className: `${$.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Sg(e) {
  return /* @__PURE__ */ l("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ n(vr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: $.note, children: e.note })
  ] });
}
function Rg(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ n(vr, { reason: e.reason, onPublish: e.onPublish }) });
}
function br(e) {
  return /* @__PURE__ */ l("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: da[e.run.status].role, label: da[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Ee, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Tg(e, t) {
  const [a, r] = p(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((t == null ? void 0 : t.subscribe) === void 0 || e.status !== "running"))
      return t.subscribe("*", (o) => {
        (o.type === "run.step" || o.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: o.type === "run.finding" ? "finding" : "action", title: ((s = o.step) == null ? void 0 : s.label) ?? "step", detail: (c = o.step) == null ? void 0 : c.tool }];
        });
      });
  }, [t, e.status]), a;
}
function xg(e) {
  var a;
  mg(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(br, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(yg, { sample: e.run.sample }),
    /* @__PURE__ */ n(fr, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(kg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Yt, { items: e.checklist }) }),
    /* @__PURE__ */ n(Sg, { reason: dg(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Lg(e) {
  var r;
  const t = Tg(e.run, e.feed);
  wg(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(br, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(Ng, { sample: e.run.sample }),
    /* @__PURE__ */ n(fr, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(Cg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Yt, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Rg, { reason: ug(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function lL(e) {
  return cg(e) ? /* @__PURE__ */ n(Lg, { ...e }) : /* @__PURE__ */ n(xg, { ...e });
}
const Ag = "_list_142ip_3", Eg = "_row_142ip_9", Ig = "_condition_142ip_18", Mg = "_action_142ip_24", Lt = {
  list: Ag,
  row: Eg,
  condition: Ig,
  action: Mg
}, pr = ke(!1);
function iL({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(pr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: Lt.list, "aria-label": t, children: e }) });
}
function sL({ rule: e }) {
  if (!Ne(pr)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: Lt.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: Lt.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: Lt.action, children: e.then })
  ] });
}
const Bg = "_move_tmppt_3", jg = {
  move: Bg
};
function _n(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [o] = r.splice(t, 1);
  return r.splice(a, 0, o), r;
}
function gr(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function yr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function ua(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function Pg(e) {
  return e === "up" ? "down" : "up";
}
function qg(e, t) {
  const a = ua(e, t.id, t.direction) ?? ua(e, t.id, Pg(t.direction));
  a == null || a.focus();
}
function Nr() {
  const e = f(null), [t, a] = p(null), [r, o] = p("");
  return S(() => {
    e.current !== null && t !== null && qg(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), o(c);
  } };
}
function kr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Pt({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${jg.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const Hg = "_body_1jd1i_2", Og = "_title_1jd1i_8", Fg = "_section_1jd1i_13", Dg = "_legend_1jd1i_18", zg = "_stages_1jd1i_26", Wg = "_stage_1jd1i_26", Kg = "_stageIndex_1jd1i_44", Gg = "_stageName_1jd1i_50", Ug = "_footer_1jd1i_59", Vg = "_note_1jd1i_66", Yg = "_reason_1jd1i_71", Jg = "_actions_1jd1i_76", Qg = "_webHead_1jd1i_83", Xg = "_kicker_1jd1i_92", Zg = "_webTitle_1jd1i_99", ey = "_webBody_1jd1i_105", ty = "_webSection_1jd1i_109", ny = "_sectionHead_1jd1i_121", ay = "_sectionNote_1jd1i_129", ry = "_formLabel_1jd1i_134", oy = "_identityRow_1jd1i_139", ly = "_nameCell_1jd1i_145", iy = "_keyCell_1jd1i_150", sy = "_colourCell_1jd1i_154", cy = "_colourStatus_1jd1i_161", dy = "_webStages_1jd1i_166", uy = "_webStageList_1jd1i_172", hy = "_webStage_1jd1i_166", my = "_webIndex_1jd1i_191", wy = "_webStageName_1jd1i_196", _y = "_webMoves_1jd1i_201", fy = "_addStage_1jd1i_215", vy = "_addStageButton_1jd1i_223", by = "_addStageNote_1jd1i_231", py = "_webFooter_1jd1i_236", gy = "_webFooterNotes_1jd1i_244", yy = "_webNote_1jd1i_251", v = {
  body: Hg,
  title: Og,
  section: Fg,
  legend: Dg,
  stages: zg,
  stage: Wg,
  stageIndex: Kg,
  stageName: Gg,
  footer: Ug,
  note: Vg,
  reason: Yg,
  actions: Jg,
  webHead: Qg,
  kicker: Xg,
  webTitle: Zg,
  webBody: ey,
  webSection: ty,
  sectionHead: ny,
  sectionNote: ay,
  formLabel: ry,
  identityRow: oy,
  nameCell: ly,
  keyCell: iy,
  colourCell: sy,
  colourStatus: cy,
  webStages: dy,
  webStageList: uy,
  webStage: hy,
  webIndex: my,
  webStageName: wy,
  webMoves: _y,
  addStage: fy,
  addStageButton: vy,
  addStageNote: by,
  webFooter: py,
  webFooterNotes: gy,
  webNote: yy
}, Ny = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], $r = "not in catalogue";
function ky(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${$r}` }, ...a];
}
function $y({ stage: e, index: t, catalogue: a, onName: r }) {
  const o = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(q, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${$r}`;
  return /* @__PURE__ */ n(q, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: ky(a, e.name), invalid: i, onChange: r });
}
function Cr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function Cy(e) {
  const t = f([]), a = f(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function Sy({ id: e, stage: t, index: a, total: r, catalogue: o, onReplace: i, onMove: s }) {
  const c = Cr(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: v.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: v.webStageName, children: /* @__PURE__ */ n($y, { stage: t, index: a, catalogue: o, onName: (u) => i({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(q, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: Ny, onChange: (u) => i({ ...t, kind: u }) }),
    /* @__PURE__ */ l("span", { className: v.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(Pt, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(Pt, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Ry({ stages: e, onChange: t, catalogue: a }) {
  const r = Cy(e.length), o = Nr(), i = (c, d) => {
    const u = gr(c, d);
    r.current = _n(r.current, c, u), o.moved({ id: r.current[u], direction: d }, yr(Cr(e[c], c), u, e.length)), t(_n(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ l("div", { className: v.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(Sy, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(kr, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: v.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Ty = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], xy = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Ly = "A new stream starts as a draft. Nothing runs on it until you publish it.", Ay = "Create is disabled: name the stream and give it a key first.", Ey = "reorder with the ↑ ↓ buttons · min 2";
function Ln(e, t) {
  return !e.reserved && ft(e.step) && t[e.step] === void 0;
}
function Iy(e, t) {
  const a = e.find((r) => Ln(r, t));
  return a ? a.step : 1;
}
function My({ stages: e, onMove: t }) {
  const a = Nr(), r = (o, i) => {
    const s = gr(o, i);
    a.moved({ id: e[o].id, direction: i }, yr(e[o].name, s, e.length)), t(o, s);
  };
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: v.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: v.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: v.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(Pt, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(Pt, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(kr, { text: a.announcement })
  ] });
}
function By({ reason: e, onCreate: t, onDraft: a }) {
  const r = y();
  return /* @__PURE__ */ l("div", { className: v.footer, children: [
    /* @__PURE__ */ n("p", { className: v.note, children: Ly }),
    e && /* @__PURE__ */ n("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: v.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function jy(e, t) {
  return e !== "" && t !== "" ? null : Ay;
}
function Py(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: o = xy, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = y(), [h, w] = p(""), [_, N] = p(""), [k, E] = p(t[0].value), [H, me] = p(() => Iy(a, r)), [re, Me] = p(e.stages ?? Ty), [Qe, x] = p(o[0].value), J = { name: h, key: _, streamStep: H, owner: k, stages: re, policy: Qe }, $e = jy(h, _);
  return /* @__PURE__ */ n(it, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ l("div", { className: v.body, children: [
    /* @__PURE__ */ n("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ n(q, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ n(q, { kind: "input", label: "Key", value: _, onChange: N, mono: !0 }),
      /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: k, onChange: E, options: t })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ n(_r, { label: "Stream colour", steps: a, value: H, onChange: me, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ n(My, { stages: re, onMove: (Ke, to) => Me(_n(re, Ke, to)) })
    ] }),
    /* @__PURE__ */ n(rr, { legend: "Loop policy", options: o, value: Qe, onChange: x }),
    /* @__PURE__ */ n(By, { reason: $e, onCreate: () => i(J), onDraft: () => s(J) })
  ] }) });
}
const Sr = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], qy = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Hy(e, t, a, r, o, i) {
  var c;
  const s = ((c = Sr.find((d) => d.value === o)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: i };
}
function Oy(e, t) {
  return Fy(e) && Dy(e, t) && zy(e);
}
function Fy(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Dy(e, t) {
  return e.colourStep === null || Ln({ step: e.colourStep }, t);
}
function zy(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function Wy(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : Ln({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Ky({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function Gy({ ready: e, draft: t, agentStage: a, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: v.webFooter, children: [
    /* @__PURE__ */ l("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ n(Ky, { stage: a }),
      !e && /* @__PURE__ */ n("p", { id: i, className: v.reason, children: qy })
    ] }),
    o && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => o(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Uy({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: v.webHead, children: [
    /* @__PURE__ */ n("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function Vy({ name: e, setName: t, streamKey: a, setKey: r, colour: o, owner: i }) {
  return /* @__PURE__ */ l("section", { className: v.webSection, children: [
    /* @__PURE__ */ n("h3", { className: v.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ l("div", { className: v.identityRow, children: [
      /* @__PURE__ */ n("div", { className: v.nameCell, children: /* @__PURE__ */ n(q, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ n("div", { className: v.keyCell, children: /* @__PURE__ */ n(q, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      o
    ] }),
    i
  ] });
}
function Yy(e) {
  const t = y(), a = y(), r = e.takenBy ?? {}, [o, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [_, N] = p("relay"), [k, E] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), H = Hy(o, s, d, h, _, k), me = Oy(H, r), re = k.find((x) => x.kind === "agent" && x.name.trim() !== ""), Me = /* @__PURE__ */ l("div", { className: v.colourCell, children: [
    /* @__PURE__ */ n("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(_r, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Qe = /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("p", { className: v.colourStatus, "data-colour-status": "", children: Wy(h, r) }),
    /* @__PURE__ */ n(q, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((x) => ({ value: x, label: x })), onChange: u })
  ] });
  return /* @__PURE__ */ l(it, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Uy, { titleId: a }),
    /* @__PURE__ */ l("div", { className: v.webBody, children: [
      /* @__PURE__ */ n(Vy, { name: o, setName: i, streamKey: s, setKey: c, colour: Me, owner: Qe }),
      e.fields && /* @__PURE__ */ n("section", { className: v.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ l("section", { className: v.webSection, children: [
        /* @__PURE__ */ l("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: v.sectionNote, children: Ey })
        ] }),
        /* @__PURE__ */ n(Ry, { stages: k, onChange: E })
      ] }),
      /* @__PURE__ */ n("section", { className: v.webSection, children: /* @__PURE__ */ n(rr, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: _, options: Sr, onChange: N }) }),
      /* @__PURE__ */ n(Gy, { ready: me, draft: H, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function cL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Yy, { ...e }) : /* @__PURE__ */ n(Py, { ...e });
}
const Jy = "_row_bs8hc_2", Qy = "_cell_bs8hc_6", Xy = "_condition_bs8hc_11", Zy = "_action_bs8hc_18", eN = "_contract_bs8hc_24", tN = "_contractCondition_bs8hc_33", nN = "_contractAction_bs8hc_39", ne = {
  row: Jy,
  cell: Qy,
  condition: Xy,
  action: Zy,
  contract: eN,
  contractCondition: tN,
  contractAction: nN
}, Rr = ["advance", "block", "escalate", "requestReview"], ha = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function qt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function An(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ne.action, children: ha[e.then] }) : /* @__PURE__ */ n(
    q,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => t({ ...e, then: o }),
      options: Rr.map((o) => ({ value: o, label: ha[o] }))
    }
  );
}
function aN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n("span", { className: ne.condition, title: qt(e, r), children: qt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: An(e, t, a) })
  ] });
}
function rN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ l("td", { className: ne.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ne.condition, children: qt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: An(e, t, a) })
  ] });
}
function oN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: ne.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ne.contractCondition, children: qt(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ne.contractAction, children: An(e, t, a, !0) })
  ] });
}
const lN = { two: rN, four: aN, contract: oN };
function dL(e) {
  var a;
  if (!Rr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = lN[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const iN = "_column_g1uat_2", sN = "_head_g1uat_17", cN = "_index_g1uat_23", dN = "_name_g1uat_29", uN = "_meta_g1uat_38", hN = "_mono_g1uat_43", mN = "_gate_g1uat_50", wN = "_reviewersLabel_g1uat_57", _N = "_reviewers_g1uat_57", fN = "_reviewer_g1uat_57", vN = "_agents_g1uat_74", bN = "_workflowColumn_g1uat_79", pN = "_workflowHead_g1uat_96", gN = "_stageRow_g1uat_102", yN = "_stageLabel_g1uat_109", NN = "_workflowTitle_g1uat_116", kN = "_workflowMeta_g1uat_122", $N = "_workflowGate_g1uat_127", CN = "_gateNote_g1uat_135", SN = "_cardNote_g1uat_140", RN = "_reviewerList_g1uat_145", TN = "_reviewerRow_g1uat_151", xN = "_reviewerMark_g1uat_157", LN = "_reviewerName_g1uat_167", AN = "_terminalCard_g1uat_173", EN = "_terminalCount_g1uat_182", IN = "_workflowAgents_g1uat_188", MN = "_mount_g1uat_194", R = {
  column: iN,
  head: sN,
  index: cN,
  name: dN,
  meta: uN,
  mono: hN,
  gate: mN,
  reviewersLabel: wN,
  reviewers: _N,
  reviewer: fN,
  agents: vN,
  workflowColumn: bN,
  workflowHead: pN,
  stageRow: gN,
  stageLabel: yN,
  workflowTitle: NN,
  workflowMeta: kN,
  workflowGate: $N,
  gateNote: CN,
  cardNote: SN,
  reviewerList: RN,
  reviewerRow: TN,
  reviewerMark: xN,
  reviewerName: LN,
  terminalCard: AN,
  terminalCount: EN,
  workflowAgents: IN,
  mount: MN
}, BN = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function En(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function Tr(e) {
  return `${Math.round(e * 100)}%`;
}
function jN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Gt, { cells: [
      { value: Tr(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function PN({ stage: e }) {
  return /* @__PURE__ */ n(Gt, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: En(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function qN({ stage: e, titleId: t }) {
  return /* @__PURE__ */ l("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: BN[e.kind] })
  ] });
}
function HN({ stage: e }) {
  return /* @__PURE__ */ l("p", { className: R.meta, children: [
    /* @__PURE__ */ l("span", { className: R.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ l("span", { className: R.mono, children: [
      ue(e.medianWait),
      " median wait"
    ] })
  ] });
}
function ON({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(jN, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(PN, { stage: e }) : null;
}
function FN({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function DN({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const o = y(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: R.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(qN, { stage: e, titleId: o }),
    /* @__PURE__ */ n(HN, { stage: e }),
    /* @__PURE__ */ n(ON, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(Gb, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(FN, { onMount: a })
  ] });
}
const zN = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function WN({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ l("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function KN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: R.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ n(WN, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: Tr(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function GN(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function UN({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: En(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: GN(e.rolledBackThisWeek) })
  ] });
}
function VN(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function YN(e) {
  if (e.kind === "terminal") return `${En(e.closedThisWeek)} this week`;
  const t = VN(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function JN({ stage: e, titleId: t }) {
  const a = zN[e.kind];
  return /* @__PURE__ */ l("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: R.stageRow, children: [
      /* @__PURE__ */ l("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: YN(e) })
  ] });
}
function QN(e) {
  return e === "entry" || e === "agent";
}
function XN({ stage: e, onMount: t }) {
  return t === void 0 || !QN(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Mount agent" });
}
function ZN({ stage: e, agentCards: t, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ l("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(JN, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(KN, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(UN, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(XN, { stage: e, onMount: a })
  ] });
}
function e1(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function uL(e) {
  return e1(e) ? /* @__PURE__ */ n(ZN, { ...e }) : /* @__PURE__ */ n(DN, { ...e });
}
const t1 = "_row_1tdra_6", n1 = "_name_1tdra_12", a1 = "_compactRow_1tdra_13", r1 = "_compactName_1tdra_13", o1 = "_cell_1tdra_30", l1 = "_chain_1tdra_45", i1 = "_owner_1tdra_51", s1 = "_mono_1tdra_57", c1 = "_compactCell_1tdra_79", d1 = "_stack_1tdra_96", u1 = "_stat_1tdra_103", h1 = "_identityLine_1tdra_110", m1 = "_identity_1tdra_110", w1 = "_ownerLine_1tdra_140", _1 = "_link_1tdra_160", f1 = "_gateMark_1tdra_166", v1 = "_emptyChain_1tdra_171", b1 = "_arrow_1tdra_177", p1 = "_muted_1tdra_182", g1 = "_define_1tdra_187", y1 = "_statValue_1tdra_194", N1 = "_policyId_1tdra_200", k1 = "_sub_1tdra_205", g = {
  row: t1,
  name: n1,
  compactRow: a1,
  compactName: r1,
  cell: o1,
  chain: l1,
  owner: i1,
  mono: s1,
  compactCell: c1,
  stack: d1,
  stat: u1,
  identityLine: h1,
  identity: m1,
  ownerLine: w1,
  link: _1,
  gateMark: f1,
  emptyChain: v1,
  arrow: b1,
  muted: p1,
  define: g1,
  statValue: y1,
  policyId: N1,
  sub: k1
};
function xr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function $1(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function C1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Lr(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function S1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Lr(e.members)}`;
}
function R1(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ l("span", { className: g.stack, children: [
    /* @__PURE__ */ l("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: L(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: S1(e) })
  ] }) });
}
function Ar({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ l(T, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function T1(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = bt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function x1({ stages: e, streamStep: t }) {
  const a = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((o, i) => /* @__PURE__ */ l("span", { className: g.link, children: [
    /* @__PURE__ */ n(Ar, { name: o.name, gate: o.gate === !0, look: T1(i, a, t), size: "tag" }),
    i === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${i}`)) });
}
function L1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ l("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : x1(e) });
}
function Er(e) {
  return e === void 0 ? void 0 : !0;
}
function ma(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Er(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function A1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function E1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function I1({ stream: e, href: t, presentation: a }) {
  const r = C1(a.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, onClick: xr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ye(e.streamStep, "chip") }, children: [
    R1(e, t),
    L1(e),
    ma(E1(e.agents), e.agents === void 0 ? void 0 : $1(e.agents), "—"),
    A1(e.policy),
    ma(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function M1(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function hL(e) {
  if (M1(e)) return I1(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ l("tr", { className: g.row, onClick: xr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ l("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: L(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...Kt(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(Ar, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ l("span", { className: g.mono, children: [
      t.agents.live,
      " live · ",
      t.agents.draft,
      " draft · ",
      t.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ l("td", { className: g.cell, children: [
      /* @__PURE__ */ n("span", { className: g.owner, children: t.owner }),
      /* @__PURE__ */ n("span", { className: g.mono, children: Lr(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": Er(t.inFlightHint), children: ae(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : ue(t.p50) }) })
  ] });
}
const B1 = "_row_2u4ll_2", j1 = "_name_2u4ll_16", P1 = "_scope_2u4ll_24", Ht = {
  row: B1,
  name: j1,
  scope: P1
};
function In(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function q1(e) {
  return e === void 0 ? `${Ht.row} ward-toolrow` : `${Ht.row} ward-toolrow ${e}`;
}
function H1(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function O1({ id: e, reasonId: t, tool: a, state: r, onChange: o }) {
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
        r.locked || o(i.target.checked);
      }
    }
  );
}
function F1({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: In(e) });
}
function D1({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${Ht.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function z1(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function mL({ tool: e, onChange: t, presentation: a }) {
  const r = y(), o = y(), i = H1(e, a), s = z1(a);
  return /* @__PURE__ */ l(s, { className: q1(a == null ? void 0 : a.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(O1, { id: r, reasonId: o, tool: e, state: i, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${Ht.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(D1, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(F1, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const W1 = "_strip_4ppv9_2", K1 = "_well_4ppv9_11", G1 = "_head_4ppv9_18", U1 = "_name_4ppv9_24", V1 = "_chart_4ppv9_32", Y1 = "_segment_4ppv9_38", J1 = "_detailedChart_4ppv9_44", Q1 = "_rail_4ppv9_57", X1 = "_section_4ppv9_63", Z1 = "_label_4ppv9_74", ek = "_note_4ppv9_91", V = {
  strip: W1,
  well: K1,
  head: G1,
  name: U1,
  chart: V1,
  segment: Y1,
  detailedChart: J1,
  rail: Q1,
  section: X1,
  label: Z1,
  note: ek
}, tk = "No item in flight to preview.", nk = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", ak = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", fn = [1, 2, 3, 4, 5, 6], Ot = 100;
function rk(e, t) {
  return t.has(e) ? ye(e, "id") : "var(--ward-color-line)";
}
function ok({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: fn.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: o * Ot,
      y: "0",
      width: Ot,
      height: "8",
      fill: rk(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function lk(e) {
  const t = e.slice(0, fn.length);
  for (; t.length < fn.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function ik({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${V.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, a) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(a * Ot),
        y: "0",
        width: String(Ot),
        height: "40",
        style: { fill: ye(t.streamStep, "chip") }
      },
      t.key + String(a)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((t, a) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(a))) })
  ] });
}
function Ir(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Nt({ label: e, children: t }) {
  const a = y();
  return /* @__PURE__ */ l("section", { className: V.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: V.label, children: e }),
    t
  ] });
}
function sk({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: t ?? tk }) : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Vt, { item: { ...e, streamStep: bt(a.streamStep) }, onOpen: Ir(r), feed: null }) });
}
function ck({ draft: e }) {
  const t = { "--stream": ye(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: V.head, style: t, children: [
    /* @__PURE__ */ n(We, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Kt(e.key, e.streamStep) })
  ] });
}
function dk(e) {
  const t = lk(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ l("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(Nt, { label: "Board card", children: /* @__PURE__ */ n(sk, { ...e, draft: a }) }),
    /* @__PURE__ */ n(Nt, { label: "Streams index row", children: /* @__PURE__ */ n(ck, { draft: a }) }),
    /* @__PURE__ */ l(Nt, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(ik, { identities: t }),
      /* @__PURE__ */ n("p", { className: V.note, children: nk })
    ] }),
    /* @__PURE__ */ n(Nt, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: ak }) })
  ] });
}
function uk({ draft: e, sample: t, streams: a, onOpen: r }) {
  const o = { "--stream": ye(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: V.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: V.head, children: [
      /* @__PURE__ */ n(We, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Kt(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Vt, { item: { ...t, streamStep: e.streamStep }, onOpen: Ir(r) }) }),
    /* @__PURE__ */ n(ok, { draft: e, streams: a })
  ] });
}
function wL(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(dk, { ...e }) : /* @__PURE__ */ n(uk, { ...e });
}
const hk = "_row_ixlg5_6", mk = "_headCell_ixlg5_10", wk = "_cell_ixlg5_11", _k = "_name_ixlg5_23", fk = "_consequence_ixlg5_29", vk = "_governed_ixlg5_36", bk = "_control_ixlg5_42", pk = "_byRole_ixlg5_48", gk = "_webControl_ixlg5_59", yk = "_webConsequence_ixlg5_65", Nk = "_webGoverned_ixlg5_71", W = {
  row: hk,
  headCell: mk,
  cell: wk,
  name: _k,
  consequence: fk,
  governed: vk,
  control: bk,
  byRole: pk,
  webControl: gk,
  webConsequence: yk,
  webGoverned: Nk
};
function kk({
  capability: e,
  cell: t,
  onChange: a
}) {
  return t.value === "byRole" ? /* @__PURE__ */ n("span", { className: W.byRole, children: "by role" }) : /* @__PURE__ */ l("span", { className: W.control, children: [
    /* @__PURE__ */ n(
      Je,
      {
        label: `${e.name} · ${t.stream}`,
        checked: t.value !== "off",
        onChange: (r) => a(t.streamStep, r)
      }
    ),
    t.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "Pilot" })
  ] });
}
function $k({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ l("tr", { className: W.row, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: W.headCell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: W.consequence, children: e.consequence }),
      /* @__PURE__ */ l("span", { className: W.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(kk, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function Ck(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Sk({ name: e, cell: t, onChange: a }) {
  if (t.value === "byRole") return /* @__PURE__ */ n("span", { className: `${W.webControl} ${W.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Je,
    {
      label: `${e} · step ${t.streamStep}`,
      checked: t.value === "on",
      disabled: a === void 0,
      onChange: (o) => a == null ? void 0 : a(t.streamStep, o ? "on" : "off")
    }
  );
  return t.value !== "pilot" ? r : /* @__PURE__ */ l("span", { className: `${W.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function Rk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ l("tr", { className: W.row, children: [
    /* @__PURE__ */ l("td", { className: W.cell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${W.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(Sk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webGoverned} ward-cellmeta`, children: Ck(e) }) })
  ] });
}
function _L(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Rk, { ...e }) : /* @__PURE__ */ n($k, { ...e });
}
const Tk = "_row_vv64h_2", xk = "_cell_vv64h_6", Lk = "_name_vv64h_25", Ak = "_note_vv64h_30", Ek = "_webName_vv64h_41", Ik = "_webMeta_vv64h_47", X = {
  row: Tk,
  cell: xk,
  name: Lk,
  note: Ak,
  webName: Ek,
  webMeta: Ik
}, Mr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function Mk(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Bk({ component: e, onRestart: t }) {
  const a = y(), r = Mr[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ l("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: X.name, children: e.name }) }),
    /* @__PURE__ */ l("td", { className: X.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { id: a, className: X.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: X.cell, "data-align": "end", children: o ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function jk({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: Mk(e.state) });
}
function Pk({ component: e, onRestart: t }) {
  return /* @__PURE__ */ l("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { ...Mr[e.state] }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(jk, { component: e, onRestart: t }) })
  ] });
}
function fL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Pk, { ...e }) : /* @__PURE__ */ n(Bk, { ...e });
}
const qk = "_row_jcm5k_7", Hk = "_cell_jcm5k_11", Ok = "_next_jcm5k_28", Fk = "_headCell_jcm5k_38", Dk = "_webId_jcm5k_77", zk = "_webPurpose_jcm5k_83", Wk = "_webMeta_jcm5k_91", Kk = "_webUrgent_jcm5k_97", K = {
  row: qk,
  cell: Hk,
  next: Ok,
  headCell: Fk,
  webId: Dk,
  webPurpose: zk,
  webMeta: Wk,
  webUrgent: Kk
}, Gk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, Uk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Br = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Vk = Object.fromEntries(Br.map((e) => [e.key, e]));
function Ze({ column: e, children: t }) {
  const a = Vk[e];
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
function vL() {
  return /* @__PURE__ */ n("tr", { children: Br.map((e) => /* @__PURE__ */ n(
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
function Yk({ cred: e }) {
  const t = Gk[e.state];
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n(Ze, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Ze, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Ze, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(Ze, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: In(e.cls) }) }),
    /* @__PURE__ */ n(Ze, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Ze, { column: "next", children: /* @__PURE__ */ n("span", { className: K.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Jk({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${K.webMeta} ${K.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function Qk({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(Jk, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...Uk[e.state] }) })
  ] });
}
function bL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Qk, { ...e }) : /* @__PURE__ */ n(Yk, { ...e });
}
const Xk = "_card_lpp45_2", Zk = "_head_lpp45_11", e$ = "_env_lpp45_18", t$ = "_version_lpp45_25", n$ = "_meta_lpp45_32", a$ = "_webCard_lpp45_37", r$ = "_webRow_lpp45_47", o$ = "_webTitle_lpp45_55", l$ = "_webLine_lpp45_65", i$ = "_webVersion_lpp45_72", s$ = "_webMeta_lpp45_77", Q = {
  card: Xk,
  head: Zk,
  env: e$,
  version: t$,
  meta: n$,
  webCard: a$,
  webRow: r$,
  webTitle: o$,
  webLine: l$,
  webVersion: i$,
  webMeta: s$
}, wa = { dev: "Dev", uat: "UAT", prod: "Prod" }, jr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function c$({ env: e }) {
  const t = jr[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l("section", { className: Q.card, "aria-label": wa[e.env], children: [
    /* @__PURE__ */ l("div", { className: Q.head, children: [
      /* @__PURE__ */ n("span", { className: Q.env, children: wa[e.env] }),
      /* @__PURE__ */ n(m, { role: t.role, label: t.label })
    ] }),
    /* @__PURE__ */ n("p", { className: Q.version, children: e.version }),
    /* @__PURE__ */ l("p", { className: Q.meta, children: [
      "deployed ",
      he(e.deployedAt)
    ] }),
    a && /* @__PURE__ */ n("p", { className: Q.meta, children: a })
  ] });
}
function d$(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function u$(e) {
  return /* @__PURE__ */ l("article", { className: `${Q.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${Q.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Q.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...jr[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Q.version} ${Q.webVersion} ${Q.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Q.meta} ${Q.webMeta} ${Q.webLine} ward-cellmeta`, children: d$(e) })
  ] });
}
function pL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(u$, { ...e }) : /* @__PURE__ */ n(c$, { ...e });
}
const h$ = "_panel_1hmja_2", m$ = "_line_1hmja_8", w$ = "_actions_1hmja_14", kt = {
  panel: h$,
  line: m$,
  actions: w$
};
function gL(e) {
  return /* @__PURE__ */ l("div", { className: kt.panel, children: [
    /* @__PURE__ */ n("p", { className: kt.line, children: e.status }),
    /* @__PURE__ */ n(q, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: kt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: kt.line, children: e.note ?? "" })
  ] });
}
const _$ = "_upload_13fcl_2", f$ = "_preview_13fcl_7", v$ = "_mark_13fcl_17", b$ = "_empty_13fcl_22", p$ = "_actions_13fcl_28", g$ = "_input_13fcl_33", y$ = "_reasons_13fcl_41", N$ = "_reason_13fcl_41", k$ = "_accepted_13fcl_57", oe = {
  upload: _$,
  preview: f$,
  mark: v$,
  empty: b$,
  actions: p$,
  input: g$,
  reasons: y$,
  reason: N$,
  accepted: k$
}, Pr = 1.5, qr = 22, Ft = "script elements or event handlers", qe = "links or external references", Le = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Pr}px at ${qr}px`], $$ = [Le[1], Le[2], Ft, qe], C$ = /* @__PURE__ */ new Map([
  ["image", Le[1]],
  ["text", Le[2]],
  ["tspan", Le[2]],
  ["textPath", Le[2]],
  ["script", Ft],
  ["foreignObject", Ft],
  ["a", qe],
  ["use", qe],
  ["style", qe],
  ["feImage", qe],
  ["set", qe]
]), S$ = "http://www.w3.org/2000/svg", R$ = "http://www.w3.org/2000/xmlns/", T$ = /* @__PURE__ */ new Set([
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
]), x$ = /* @__PURE__ */ new Set([
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
]), Mn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, L$ = /url\s*\(|['"\\]/i;
function A$() {
  return { ok: !1, reasons: [Le[1]] };
}
function Hr(e) {
  return e.namespaceURI === S$;
}
function E$(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && Hr(t) ? t : null;
  } catch {
    return null;
  }
}
function I$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [Le[0]] : [];
}
function M$(e) {
  return C$.get(e.localName) ?? (e.localName.startsWith("animate") ? qe : void 0);
}
function B$(e) {
  return L$.test(e.replace(Mn, ""));
}
function j$(e) {
  return /^on/i.test(e.localName) ? Ft : e.localName === "href" || B$(e.value) ? qe : void 0;
}
function P$(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(M$(a));
    for (const r of Array.from(a.attributes)) t.add(j$(r));
  }
  return $$.filter((a) => t.has(a));
}
function q$(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((o) => Number.isFinite(o) && o > 0), 0), r = a > 0 ? qr / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Pr;
  }) ? [Le[3]] : [];
}
function H$(e) {
  if (e.namespaceURI === R$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (x$.has(t) || t.startsWith("stroke"));
}
function O$(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && Hr(t) && T$.has(t.localName);
}
function F$(e, t) {
  O$(t) ? t.nodeType === Node.ELEMENT_NODE && Or(t) : e.removeChild(t);
}
function Or(e) {
  for (const t of Array.from(e.attributes)) H$(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) F$(e, t);
  return e;
}
function D$(e) {
  return Array.from(e.matchAll(Mn), (t) => t[2]).filter((t) => t !== "");
}
function z$(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function W$(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const i of D$(o.value)) a.has(i) || a.set(i, `${t}-${a.size}`);
  return a;
}
function K$(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(Mn, (r, o, i) => {
      const s = t.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function G$(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = W$(a, t);
  for (const o of a) {
    const i = r.get(o.getAttribute("id") ?? "");
    i === void 0 ? o.removeAttribute("id") : o.setAttribute("id", i), K$(o, r);
  }
  return e;
}
function yL(e) {
  const t = E$(e);
  if (t === null) return A$();
  const a = [...I$(t), ...P$(t), ...q$(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(G$(Or(t), z$(e))) };
}
const U$ = "Mark accepted.", V$ = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Y$ = new Set(Sa.flatMap((e) => [ye(e, "id"), ye(e, "chip")]));
function J$(e) {
  return e !== void 0 && (V$.test(e) || Y$.has(e)) ? e : void 0;
}
function Q$({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: oe.preview, style: { "--mark": J$(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: oe.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: oe.empty }) });
}
function X$(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function Z$(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function e0({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: oe.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("p", { className: oe.accepted, children: U$ }) }) : /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("ul", { className: oe.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: oe.reason, children: t }, t)) }) });
}
function t0({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(e0, { result: e }) : /* @__PURE__ */ n("p", { className: `${oe.result} ${X$(e, a)}`, role: "status", children: Z$(e, a) });
}
function _a(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function NL({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: o }) {
  const i = f(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ l("div", { className: oe.upload, children: [
    /* @__PURE__ */ n(Q$, { current: e }),
    /* @__PURE__ */ l("div", { className: oe.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: i,
          className: oe.input,
          type: "file",
          accept: "image/svg+xml",
          "aria-label": "Mark file",
          disabled: o !== void 0,
          onChange: (u) => {
            var h;
            return d((h = u.target.files) == null ? void 0 : h[0]);
          }
        }
      ),
      /* @__PURE__ */ n(b, { ..._a(o), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ..._a(o), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(t0, { result: s, presentation: r })
  ] });
}
const n0 = "_row_o3t6y_7", a0 = "_cell_o3t6y_11", r0 = "_head_o3t6y_28", o0 = "_name_o3t6y_34", l0 = "_pinned_o3t6y_42", i0 = "_headCell_o3t6y_49", s0 = "_webName_o3t6y_88", c0 = "_webMeta_o3t6y_95", d0 = "_webWarn_o3t6y_103", F = {
  row: n0,
  cell: a0,
  head: r0,
  name: o0,
  pinned: l0,
  headCell: i0,
  webName: s0,
  webMeta: c0,
  webWarn: d0
}, Bn = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Fr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], u0 = Object.fromEntries(Fr.map((e) => [e.key, e]));
function h0(e, t) {
  return `mcp.${e}.${t}`;
}
function m0(e) {
  return Object.keys(Bn).includes(e);
}
function w0(e) {
  return Bn[e !== void 0 && m0(e) ? e : "unknown"];
}
function st({ column: e, children: t }) {
  const a = u0[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: F.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: t
    }
  );
}
function kL() {
  return /* @__PURE__ */ n("tr", { children: Fr.map((e) => /* @__PURE__ */ n(
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
function _0({ server: e }) {
  const t = Bn[e.connection];
  return /* @__PURE__ */ l("tr", { className: F.row, children: [
    /* @__PURE__ */ l(st, { column: "name", children: [
      /* @__PURE__ */ l("span", { className: F.head, children: [
        /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: In(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ l("span", { className: F.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(st, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(st, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(st, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(st, { column: "tools", children: e.tools.map((a) => h0(e.name, a)).join(" · ") })
  ] });
}
function f0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function v0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function b0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${F.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: e });
}
function p0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function g0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function y0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: F.row, children: [
    /* @__PURE__ */ l("td", { className: F.cell, children: [
      /* @__PURE__ */ n("span", { className: `${F.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: f0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(m, { ...v0(e) }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(b0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(m, { ...w0(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: F.cell, children: [
      /* @__PURE__ */ n(p0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(g0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function $L(e) {
  return "presentation" in e ? /* @__PURE__ */ n(y0, { ...e }) : /* @__PURE__ */ n(_0, { ...e });
}
const N0 = "_row_1ibo7_2", k0 = "_headCell_1ibo7_14", $0 = "_cell_1ibo7_15", C0 = "_name_1ibo7_26", S0 = "_consequence_1ibo7_32", R0 = "_reason_1ibo7_38", T0 = "_value_1ibo7_44", x0 = "_webRow_1ibo7_60", L0 = "_webSetting_1ibo7_73", A0 = "_webName_1ibo7_81", E0 = "_webConsequence_1ibo7_89", I0 = "_webControl_1ibo7_95", M0 = "_webState_1ibo7_109", B0 = "_webChip_1ibo7_114", P = {
  row: N0,
  headCell: k0,
  cell: $0,
  name: C0,
  consequence: S0,
  reason: R0,
  value: T0,
  webRow: x0,
  webSetting: L0,
  webName: A0,
  webConsequence: E0,
  webControl: I0,
  webState: M0,
  webChip: B0
}, Dr = 104, zr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function j0({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Je, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(nr, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: P.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function P0({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = y(), i = zr[a], s = a === "locked";
  return /* @__PURE__ */ l("tr", { className: P.row, "data-inheritance": a, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: P.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(j0, { control: t, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: P.cell, style: { width: Dr }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function Wr(e, t) {
  return String(e ?? t);
}
function q0(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function H0(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? Wr(e.value, "—");
}
function O0({ control: e, name: t, locked: a, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: P.webControl, children: [
    /* @__PURE__ */ n(Je, { label: t, labelHidden: !0, checked: i, locked: a, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ n("span", { className: P.webState, "aria-hidden": "true", children: a || i ? "on" : "off" })
  ] });
}
function F0(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(O0, { ...e });
  const o = q0(t, a);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: P.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(nr, { options: o, value: Wr(t.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: H0(t) });
}
function D0({ setting: e, control: t, inheritance: a, reason: r, onChange: o, renderControl: i }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ l("div", { className: `${P.row} ${P.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ l("span", { className: P.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${P.name} ${P.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: s, className: `${P.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: P.webControl, children: i(s) }) : /* @__PURE__ */ n(F0, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${P.webChip} ward-policy-chip`, style: { width: Dr }, children: /* @__PURE__ */ n(m, { ...zr[a], size: "tag" }) })
  ] });
}
function CL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(D0, { ...e }) : /* @__PURE__ */ n(P0, { ...e });
}
const z0 = "_label_h9m4w_7", W0 = "_name_h9m4w_15", K0 = "_column_h9m4w_24", G0 = "_webFrame_h9m4w_57", U0 = "_webHead_h9m4w_62", V0 = "_webHeadLabel_h9m4w_74", Y0 = "_webLabel_h9m4w_117", J0 = "_webColumns_h9m4w_124", Q0 = "_webGroup_h9m4w_130", X0 = "_webPeople_h9m4w_131", Z0 = "_webVia_h9m4w_132", eC = "_webMeta_h9m4w_161", G = {
  label: z0,
  name: W0,
  column: K0,
  webFrame: G0,
  webHead: U0,
  webHeadLabel: V0,
  webLabel: Y0,
  webColumns: J0,
  webGroup: Q0,
  webPeople: X0,
  webVia: Z0,
  webMeta: eC
}, tC = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, rn = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function on({ column: e, children: t }) {
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
function nC(e) {
  if (!e.matrixRole) return;
  const t = tC[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function aC({ node: e }) {
  const t = nC(e);
  return /* @__PURE__ */ l("span", { className: G.label, children: [
    /* @__PURE__ */ n("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ n(rC, { role: t, node: e }),
    /* @__PURE__ */ n(on, { column: rn[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(on, { column: rn[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(on, { column: rn[2], children: e.requestedVia ?? "" })
  ] });
}
function rC({ role: e, node: t }) {
  return /* @__PURE__ */ l(T, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function oC({ index: e, depth: t, node: a, expanded: r, leaf: o, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    cr,
    {
      index: e,
      depth: t,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(aC, { node: a }),
      children: s
    }
  );
}
function ln({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function lC({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(ln, { className: `${G.webMeta} ${G.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(ln, { className: `${G.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(ln, { className: `${G.webMeta} ${G.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function iC() {
  return /* @__PURE__ */ l("div", { className: G.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: G.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: G.webColumns, children: [
      /* @__PURE__ */ n("span", { className: G.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: G.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: G.webVia, children: "Requested via" })
    ] })
  ] });
}
function sC({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function cC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function dC({ rows: e, label: t }) {
  return /* @__PURE__ */ l("div", { className: G.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(iC, {}),
    /* @__PURE__ */ n(Ow, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      cr,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(sC, { row: a }),
        detail: /* @__PURE__ */ n(lC, { row: a }),
        expanded: cC(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function SL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(dC, { ...e }) : /* @__PURE__ */ n(oC, { ...e });
}
const uC = "_runbook_b9agc_2", hC = "_list_b9agc_7", mC = "_step_b9agc_15", wC = "_numeral_b9agc_21", _C = "_body_b9agc_28", fC = "_head_b9agc_34", vC = "_title_b9agc_40", bC = "_detail_b9agc_45", pC = "_actions_b9agc_50", gC = "_webList_b9agc_56", yC = "_webStep_b9agc_60", NC = "_webBody_b9agc_66", kC = "_webTitle_b9agc_74", $C = "_webDetail_b9agc_78", M = {
  runbook: uC,
  list: hC,
  step: mC,
  numeral: wC,
  body: _C,
  head: fC,
  title: vC,
  detail: bC,
  actions: pC,
  webList: gC,
  webStep: yC,
  webBody: NC,
  webTitle: kC,
  webDetail: $C
}, Kr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Gr(e) {
  return String(e + 1).padStart(2, "0");
}
function CC({ step: e, index: t, connection: a }) {
  const r = Kr[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: M.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: M.numeral, children: Gr(t) }),
    /* @__PURE__ */ l("span", { className: M.body, children: [
      /* @__PURE__ */ l("span", { className: M.head, children: [
        /* @__PURE__ */ n("span", { className: M.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        o && e.startedAt && /* @__PURE__ */ n(Ee, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ n("span", { className: M.detail, children: e.detail })
    ] })
  ] });
}
function SC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: M.list, children: e.map((r, o) => /* @__PURE__ */ n(CC, { step: r, index: o, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: M.actions, children: t })
  ] });
}
function RC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ l("li", { className: `${M.step} ${M.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${M.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Gr(t) }),
    /* @__PURE__ */ l("span", { className: `${M.body} ${M.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${M.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${M.title} ${M.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Kr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Ee, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${M.detail} ${M.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function TC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${M.list} ${M.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(RC, { step: r, index: o, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${M.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function RL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(TC, { ...e }) : /* @__PURE__ */ n(SC, { ...e });
}
const xC = "_list_1gu6a_2", LC = "_check_1gu6a_10", AC = "_body_1gu6a_16", EC = "_text_1gu6a_23", IC = "_pending_1gu6a_32", MC = "_measured_1gu6a_37", nt = {
  list: xC,
  check: LC,
  body: AC,
  text: EC,
  pending: IC,
  measured: MC
};
function BC(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function jC({ check: e }) {
  const t = BC(e.passed);
  return /* @__PURE__ */ l("li", { className: `${nt.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Rn, { state: t.state, label: t.label }),
    /* @__PURE__ */ l("span", { className: nt.body, children: [
      /* @__PURE__ */ n("span", { className: nt.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ l("span", { className: nt.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: nt.measured, children: e.measured })
  ] });
}
function TL({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${nt.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(jC, { check: t }, t.text)) });
}
const PC = "_root_y6bbq_2", qC = "_list_y6bbq_10", HC = "_line_y6bbq_32", OC = "_at_y6bbq_59", FC = "_text_y6bbq_63", DC = "_foot_y6bbq_67", zC = "_idle_y6bbq_79", WC = "_caret_y6bbq_87", KC = "_jump_y6bbq_94", be = {
  root: PC,
  list: qC,
  line: HC,
  at: OC,
  text: FC,
  foot: DC,
  idle: zC,
  caret: WC,
  jump: KC
}, GC = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function jn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : GC.format(new Date(e));
}
const UC = { warn: "warning", ok: "ok" };
function VC({ kind: e }) {
  const t = UC[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function YC({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${jn(e)}` });
}
function JC({ connection: e, idleSince: t, last: a, children: r }) {
  const o = [t, a == null ? void 0 : a.at, ""].find(Boolean), i = {
    stale: `no new events as of ${jn(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${be.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${be.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: be.idle, children: i }),
    /* @__PURE__ */ n(YC, { at: a == null ? void 0 : a.at }),
    r
  ] });
}
const QC = 8;
function XC(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > QC;
}
function ZC({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${be.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const Ur = ke(null);
function xL({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, o] = p(!1), i = ya(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(Ur.Provider, { value: i, children: a });
}
function eS() {
  const e = Ne(Ur), [t, a] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const tS = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function LL({ lines: e, connection: t, idleSince: a, label: r = "Live activity", fixed: o }) {
  const i = f(null), [s, c] = p(0), [d, u] = eS(), [h, w] = p(!1), _ = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), rt(() => {
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
  return /* @__PURE__ */ l("div", { className: be.root, children: [
    /* @__PURE__ */ n("ol", { className: be.list, ref: i, "aria-live": d ? "polite" : "off", "aria-label": r, ...tS(e.length, o), onScroll: (k) => w(XC(k.currentTarget)), children: e.map((k, E) => /* @__PURE__ */ l("li", { className: `${be.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": E < s, children: [
      /* @__PURE__ */ n("span", { className: be.at, children: jn(k.at) }),
      /* @__PURE__ */ n(VC, { kind: k.kind }),
      /* @__PURE__ */ n("span", { className: be.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${E}`)) }),
    /* @__PURE__ */ l(JC, { connection: t, idleSince: a, last: _, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${be.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(ZC, { shown: h, onJump: N })
    ] })
  ] });
}
const nS = "_row_1k8wl_2", aS = "_head_1k8wl_14", rS = "_author_1k8wl_20", oS = "_eta_1k8wl_25", lS = "_edited_1k8wl_26", iS = "_body_1k8wl_32", sS = "_reason_1k8wl_37", cS = "_actions_1k8wl_42", Se = {
  row: nS,
  head: aS,
  author: rS,
  eta: oS,
  edited: lS,
  body: iS,
  reason: sS,
  actions: cS
}, dS = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function uS(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function hS({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function mS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Se.reason, id: t, children: e })
  ] });
}
function wS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function _S(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(hS, { ...e }) : /* @__PURE__ */ n(mS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function AL(e) {
  const { comment: t } = e;
  wS(e);
  const a = y(), r = `${a}-unavailable`, o = dS[t.delivery];
  return /* @__PURE__ */ l("div", { className: `${Se.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: Se.head, children: [
      /* @__PURE__ */ n("span", { className: Se.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: Se.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Se.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Se.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Se.reason, id: a, children: uS(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Se.actions, children: /* @__PURE__ */ n(_S, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const fS = "_root_rvhdw_2", vS = "_attach_rvhdw_11", bS = "_actions_rvhdw_17", pS = "_reply_rvhdw_23", gS = "_replyField_rvhdw_28", yS = "_send_rvhdw_54", NS = "_sendIcon_rvhdw_65", kS = "_sendsAs_rvhdw_75", Fe = {
  root: fS,
  attach: vS,
  actions: bS,
  reply: pS,
  replyField: gS,
  send: yS,
  sendIcon: NS,
  sendsAs: kS
};
function Vr({ value: e, onChange: t }) {
  const [a, r] = p("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function $S() {
  return /* @__PURE__ */ n("svg", { className: Fe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function CS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function SS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [o, i] = Vr(e), s = y(), c = () => {
    o.trim() !== "" && r(a, o);
  }, d = (u) => {
    CS(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ l("div", { className: Fe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: Fe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ n(q, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: o, onChange: i, describedBy: s }),
      /* @__PURE__ */ l(b, { variant: "primary", className: Fe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ n($S, {}),
        /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Fe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function EL(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(SS, { ...e }) : /* @__PURE__ */ n(RS, { ...e });
}
function RS(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: o, onPost: i, onDraft: s } = e, [c, d] = Vr(e);
  return /* @__PURE__ */ l("div", { className: Fe.root, children: [
    /* @__PURE__ */ n(q, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ l("div", { className: Fe.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    o && /* @__PURE__ */ n(
      Ba,
      {
        label: `Requeue ${o.agent} after posting`,
        consequence: o.consequence,
        checked: o.checked,
        onChange: o.onChange
      }
    ),
    /* @__PURE__ */ l("div", { className: Fe.actions, children: [
      /* @__PURE__ */ n(b, { variant: "primary", onClick: () => i(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const TS = "_list_1yhks_2", xS = "_item_1yhks_6", LS = "_body_1yhks_22", AS = "_text_1yhks_28", ES = "_evidence_1yhks_37", IS = "_consequence_1yhks_49", MS = "_note_1yhks_54", Ye = {
  list: TS,
  item: xS,
  body: LS,
  text: AS,
  evidence: ES,
  consequence: IS,
  note: MS
};
function BS({ criterion: e }) {
  return /* @__PURE__ */ n(We, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function fa({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function jS(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function PS({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Ye.body, children: [
    /* @__PURE__ */ n("span", { className: Ye.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(T, { children: [
      /* @__PURE__ */ n(fa, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Ye.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(T, { children: [
      /* @__PURE__ */ n(fa, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Ye.consequence, children: jS(e.why) })
    ] })
  ] });
}
function qS({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Ye.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(BS, { criterion: e }),
    /* @__PURE__ */ n(PS, { criterion: e })
  ] });
}
function IL({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Ye.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(qS, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ n("p", { className: Ye.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const HS = "_list_dwhoz_2", OS = "_rung_dwhoz_6", FS = "_name_dwhoz_18", DS = "_actor_dwhoz_32", At = {
  list: HS,
  rung: OS,
  name: FS,
  actor: DS
}, zS = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function WS({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = zS[e.state];
  return /* @__PURE__ */ l("li", { className: At.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: At.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${At.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function ML({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${At.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(WS, { rung: t }, t.name)) });
}
const KS = "_sheet_pw37w_2", GS = "_title_pw37w_9", US = "_stage_pw37w_15", VS = "_effects_pw37w_20", YS = "_effect_pw37w_20", JS = "_numeral_pw37w_31", QS = "_effectText_pw37w_38", XS = "_refusals_pw37w_43", ZS = "_reasons_pw37w_52", e2 = "_reason_pw37w_52", t2 = "_actions_pw37w_62", we = {
  sheet: KS,
  title: GS,
  stage: US,
  effects: VS,
  effect: YS,
  numeral: JS,
  effectText: QS,
  refusals: XS,
  reasons: ZS,
  reason: e2,
  actions: t2
};
function n2({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function BL({ run: e, effects: t, refusals: a, cost: r, onRequeue: o, onClose: i, returnFocusTo: s }) {
  const c = y(), d = `${c}-refusal`, [u, h] = p(""), w = a.length > 0;
  return /* @__PURE__ */ n(it, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ l("div", { className: we.sheet, children: [
    /* @__PURE__ */ l("h2", { className: we.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: we.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: we.effects, children: t.map((_, N) => /* @__PURE__ */ l("li", { className: we.effect, children: [
      /* @__PURE__ */ n("span", { className: we.numeral, children: String(N + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: we.effectText, children: _ })
    ] }, _)) }),
    /* @__PURE__ */ n(
      pm,
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
    w && /* @__PURE__ */ l("div", { className: we.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: we.reasons, children: a.map((_, N) => /* @__PURE__ */ n("li", { className: we.reason, id: N === 0 ? d : void 0, children: _.reason }, _.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: we.actions, children: [
      /* @__PURE__ */ n(n2, { refused: w, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ n(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const a2 = "_list_1laeg_2", r2 = "_path_1laeg_7", o2 = "_head_1laeg_21", l2 = "_label_1laeg_28", i2 = "_consequence_1laeg_35", dt = {
  list: a2,
  path: r2,
  head: o2,
  label: l2,
  consequence: i2
}, vn = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function va(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function ba(e) {
  return e ? "primary" : "secondary";
}
function s2({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: ba(t), size: "sm", onClick: () => a(e.kind), children: vn[e.kind] }) : /* @__PURE__ */ n(b, { variant: ba(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: vn[e.kind] });
}
function c2({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: dt.path, "data-allowed": e.allowed, "data-role": va(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: dt.head, children: [
      /* @__PURE__ */ n("span", { className: dt.label, children: e.title ?? vn[e.kind] }),
      /* @__PURE__ */ n(m, { role: va(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: dt.consequence, children: e.consequence }),
    /* @__PURE__ */ n(s2, { path: e, primary: t, onChoose: a })
  ] });
}
function jL({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: dt.list, children: e.map((a, r) => /* @__PURE__ */ n(c2, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const d2 = "_list_1m7i0_2", u2 = "_item_1m7i0_6", h2 = "_node_1m7i0_18", m2 = "_body_1m7i0_24", w2 = "_head_1m7i0_30", _2 = "_stage_1m7i0_36", f2 = "_version_1m7i0_41", v2 = "_sentence_1m7i0_49", b2 = "_meta_1m7i0_54", Te = {
  list: d2,
  item: u2,
  node: h2,
  body: m2,
  head: w2,
  stage: _2,
  version: f2,
  sentence: v2,
  meta: b2
}, p2 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function g2({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: Te.head, children: [
    /* @__PURE__ */ n("span", { className: Te.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Te.version, title: e.version, children: e.version }) : null
  ] });
}
function y2({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${Te.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Te.node} ward-history-node`, children: /* @__PURE__ */ n(We, { size: 9, kind: p2[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${Te.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(g2, { entry: e }),
      /* @__PURE__ */ n("span", { className: Te.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${Te.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function PL({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Te.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(y2, { entry: t }, t.stage + String(a))) });
}
const N2 = "_thread_1e70p_3", k2 = "_turn_1e70p_8", $2 = "_who_1e70p_27", C2 = "_body_1e70p_32", Et = {
  thread: N2,
  turn: k2,
  who: $2,
  body: C2
}, Yr = ke(!1);
function qL({ children: e, density: t }) {
  return /* @__PURE__ */ n(Yr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${Et.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function HL({ turn: e }) {
  if (!Ne(Yr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${Et.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${Et.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${Et.body} ward-chat-body`, children: e.body })
  ] });
}
const S2 = "_list_yiolt_3", R2 = "_row_yiolt_7", T2 = "_label_yiolt_20", x2 = "_n_yiolt_26", L2 = "_cause_yiolt_33", mt = {
  list: S2,
  row: R2,
  label: T2,
  n: x2,
  cause: L2
};
function A2(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const E2 = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function I2({ row: e, formatNumber: t }) {
  return A2(e), /* @__PURE__ */ l("li", { className: `${mt.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(We, { size: 8, ...E2[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: mt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${mt.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(M2, { cause: e.cause })
  ] });
}
function M2({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${mt.cause} ward-healthrow-cause`, children: e }) : null;
}
function OL({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${mt.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(I2, { row: a, formatNumber: t }, a.label)) });
}
const B2 = "_root_1jxwp_2", j2 = {
  root: B2
};
function FL({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: j2.root, "data-density": o, children: [
    /* @__PURE__ */ n(Yt, { items: e, note: t, density: o }),
    /* @__PURE__ */ n(b, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const P2 = "_row_dhbre_3", q2 = "_key_dhbre_13", H2 = "_stack_dhbre_24", O2 = "_value_dhbre_32", F2 = "_evidence_dhbre_39", D2 = "_mark_dhbre_47", et = {
  row: P2,
  key: q2,
  stack: H2,
  value: O2,
  evidence: F2,
  mark: D2
};
function z2({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(Rn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function DL({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${et.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${et.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${et.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${et.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${et.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${et.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(z2, { state: e.state }) })
  ] });
}
const W2 = "_cell_gh2sd_2", K2 = {
  cell: W2
}, G2 = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function U2(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function V2(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function Y2(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: U2(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function J2(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function zL({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  V2(e, a);
  const r = J2(e);
  return /* @__PURE__ */ n(
    Im,
    {
      label: "Rejection routing",
      columns: G2,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: K2.cell, "data-norerun": o.noRerun ? !0 : void 0, children: Y2(o, i) }),
      empty: t ?? /* @__PURE__ */ n(S_, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const Q2 = "_row_1f2re_2", X2 = "_title_1f2re_12", Z2 = "_turns_1f2re_18", eR = "_waiting_1f2re_19", tR = "_resolved_1f2re_20", nR = "_activity_1f2re_21", aR = "_cost_1f2re_28", rR = "_link_1f2re_29", oR = "_tableLink_1f2re_47", lR = "_tableRecord_1f2re_48", iR = "_tableRow_1f2re_59", sR = "_tableTitle_1f2re_71", cR = "_tableResolved_1f2re_76", dR = "_tableMeta_1f2re_87", uR = "_tableCost_1f2re_94", hR = "_tableActivity_1f2re_95", mR = "_tableState_1f2re_105", z = {
  row: Q2,
  title: X2,
  turns: Z2,
  waiting: eR,
  resolved: tR,
  activity: nR,
  cost: aR,
  link: rR,
  tableLink: oR,
  tableRecord: lR,
  tableRow: iR,
  tableTitle: sR,
  tableResolved: cR,
  tableMeta: dR,
  tableCost: uR,
  tableActivity: hR,
  tableState: mR
}, Jr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function wR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function _R(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function fR(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const vR = { duplicate: "Closed · duplicate" };
function bR({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(ot, { className: z.tableMeta, text: `waiting on ${e}` });
}
function pR({ value: e }) {
  return /* @__PURE__ */ n("td", { className: z.tableCost, children: e === void 0 ? null : le(e) });
}
function gR({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${z.tableRecord} ward-target`, href: L(e.href), children: `→ ${e.key}` });
}
function yR({ session: e, href: t }) {
  const a = Jr[e.state];
  return /* @__PURE__ */ l("tr", { className: z.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: z.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${z.tableLink} ward-target`, href: L(t), children: /* @__PURE__ */ n(ot, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: z.tableMeta, children: _R(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: z.tableResolved, children: [
      fR(e.resolved),
      /* @__PURE__ */ n(bR, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(pR, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: z.tableActivity, children: wR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: z.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: vR[e.state] ?? a.label }),
      /* @__PURE__ */ n(gR, { link: e.link })
    ] }) })
  ] });
}
function NR({ session: e }) {
  const t = Jr[e.state];
  return /* @__PURE__ */ l("div", { className: z.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(ot, { className: z.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: z.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(ot, { className: z.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: z.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: z.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : le(e.cost) }),
    /* @__PURE__ */ n("span", { className: z.activity, children: he(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: z.link, href: L(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function WL(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(yR, { session: e.session, href: e.href }) : /* @__PURE__ */ n(NR, { session: e.session });
}
const kR = "_block_1yy2v_3", $R = "_list_1yy2v_9", CR = "_line_1yy2v_14", bn = {
  block: kR,
  list: $R,
  line: CR
}, SR = { warn: "warning", ok: "ok" };
function RR({ kind: e }) {
  const t = SR[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function TR({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${bn.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(RR, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function KL({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${bn.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: bn.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(TR, { line: a }, `${r}-${a.text}`)) }) });
}
const xR = "_band_tt7hp_1", LR = "_head_tt7hp_8", AR = "_cell_tt7hp_19", ER = "_index_tt7hp_35", IR = "_title_tt7hp_42", MR = "_note_tt7hp_48", BR = "_cellTitle_tt7hp_53", jR = "_cellBody_tt7hp_58", PR = "_tag_tt7hp_64", Ce = {
  band: xR,
  head: LR,
  cell: AR,
  index: ER,
  title: IR,
  note: MR,
  cellTitle: BR,
  cellBody: jR,
  tag: PR
}, pa = 4;
function GL({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== pa)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${pa}-cell grid`);
  return /* @__PURE__ */ l("section", { className: Ce.band, "aria-label": `${e} ${t}`, children: [
    /* @__PURE__ */ l("div", { className: Ce.head, children: [
      /* @__PURE__ */ n("span", { className: Ce.index, children: e }),
      /* @__PURE__ */ n("span", { className: Ce.title, children: t }),
      /* @__PURE__ */ n("span", { className: Ce.note, children: a })
    ] }),
    r.map((o) => /* @__PURE__ */ l("div", { className: Ce.cell, children: [
      /* @__PURE__ */ n("span", { className: Ce.cellTitle, children: o.title }),
      /* @__PURE__ */ n("span", { className: Ce.cellBody, children: o.body }),
      o.tag !== void 0 && /* @__PURE__ */ n("span", { className: Ce.tag, children: o.tag })
    ] }, o.title))
  ] });
}
const qR = "_tag_1yuvz_2", HR = "_link_1yuvz_14", sn = {
  tag: qR,
  link: HR
};
function OR({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: sn.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${sn.tag} ${sn.link}`, href: L(t), children: e });
}
const FR = "_eyebrow_m8swv_2", DR = "_link_m8swv_10", ga = {
  eyebrow: FR,
  link: DR
};
function Jt({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: ga.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${ga.link} ward-target`, href: L(t), children: e }) });
}
const zR = "_figure_qz9i7_2", WR = "_media_qz9i7_9", KR = "_caption_qz9i7_35", cn = {
  figure: zR,
  media: WR,
  caption: KR
};
function GR(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(T, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function UR(e) {
  return /* @__PURE__ */ l("figure", { className: cn.figure, children: [
    /* @__PURE__ */ n("div", { className: cn.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(GR, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: cn.caption, children: e.caption })
  ] });
}
function Qt(e) {
  return `h${e}`;
}
function VR(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const YR = "_prose_1fxb9_2", JR = "_anchor_1fxb9_79", Qr = {
  prose: YR,
  anchor: JR
};
function UL({ children: e }) {
  return /* @__PURE__ */ n("div", { className: Qr.prose, children: e });
}
function VL({ level: e, children: t, id: a }) {
  const r = Qt(e), o = a ?? VR(t);
  return /* @__PURE__ */ l(r, { id: o, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${Qr.anchor} ward-target`, href: `#${o}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const QR = "_list_176jq_2", XR = "_pair_176jq_8", ZR = "_term_176jq_14", eT = "_value_176jq_19", $t = {
  list: QR,
  pair: XR,
  term: ZR,
  value: eT
};
function YL({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: $t.list, children: e.map((t) => /* @__PURE__ */ l("div", { className: $t.pair, children: [
    /* @__PURE__ */ n("dt", { className: $t.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: $t.value, children: t.value })
  ] }, t.term)) });
}
const tT = "_nav_sgeyg_2", nT = "_item_sgeyg_6", aT = "_link_sgeyg_13", rT = "_note_sgeyg_30", Ct = {
  nav: tT,
  item: nT,
  link: aT,
  note: rT
};
function JL({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: Ct.nav, children: /* @__PURE__ */ n(jm, { children: t.map((a) => /* @__PURE__ */ l("li", { className: Ct.item, children: [
    /* @__PURE__ */ n("a", { className: `${Ct.link} ward-target`, href: L(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: Ct.note, children: a.note })
  ] }, a.href)) }) });
}
const oT = "_header_kelio_2", lT = "_skip_kelio_14", iT = "_brand_kelio_39", sT = "_list_kelio_46", cT = "_link_kelio_56", tt = {
  header: oT,
  skip: lT,
  brand: iT,
  list: sT,
  link: cT
};
function QL({ brand: e, links: t, current: a, homeHref: r = "/", mainId: o = "main", skipLabel: i = "Skip to content" }) {
  return /* @__PURE__ */ l("header", { className: tt.header, children: [
    /* @__PURE__ */ n("a", { className: tt.skip, href: `#${o}`, children: i }),
    /* @__PURE__ */ n("a", { className: `${tt.brand} ward-target`, href: L(r), children: e }),
    /* @__PURE__ */ n("nav", { "aria-label": "Main", className: tt.nav, children: /* @__PURE__ */ n("ul", { className: tt.list, role: "list", children: t.map((s) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${tt.link} ward-target`, href: L(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const dT = "_footer_1jb5e_2", uT = "_note_1jb5e_12", hT = "_list_1jb5e_18", mT = "_link_1jb5e_27", St = {
  footer: dT,
  note: uT,
  list: hT,
  link: mT
};
function XL({ note: e, links: t = [], label: a = "Footer" }) {
  return /* @__PURE__ */ l("footer", { className: St.footer, children: [
    /* @__PURE__ */ n("p", { className: St.note, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("nav", { "aria-label": a, children: /* @__PURE__ */ n("ul", { className: St.list, role: "list", children: t.map((r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${St.link} ward-target`, href: L(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const wT = "_intro_13128_2", _T = "_title_13128_9", fT = "_lead_13128_17", dn = {
  intro: wT,
  title: _T,
  lead: fT
};
function ZL({ title: e, eyebrow: t, eyebrowHref: a, lead: r, headingLevel: o = 1, children: i }) {
  const s = Qt(o);
  return /* @__PURE__ */ l("header", { className: dn.intro, children: [
    t === void 0 ? null : /* @__PURE__ */ n(Jt, { href: a, children: t }),
    /* @__PURE__ */ n(s, { className: dn.title, children: e }),
    r === void 0 ? null : /* @__PURE__ */ n("p", { className: dn.lead, children: r }),
    i
  ] });
}
const vT = "_section_u0k7p_2", bT = "_head_u0k7p_13", pT = "_titles_u0k7p_21", gT = "_title_u0k7p_21", yT = "_link_u0k7p_34", ut = {
  section: vT,
  head: bT,
  titles: pT,
  title: gT,
  link: yT
};
function NT({ title: e, headingId: t, eyebrow: a, link: r, headingLevel: o }) {
  const i = Qt(o);
  return /* @__PURE__ */ l("div", { className: ut.head, children: [
    /* @__PURE__ */ l("div", { className: ut.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ n(Jt, { children: a }),
      /* @__PURE__ */ n(i, { className: ut.title, id: t, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ n("a", { className: `${ut.link} ward-target`, href: L(r.href), children: r.label })
  ] });
}
function eA({ title: e, children: t, id: a, eyebrow: r, link: o, headingLevel: i = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ l("section", { className: ut.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ n(NT, { title: e, headingId: d, eyebrow: r, link: o, headingLevel: i }),
    t
  ] });
}
const kT = "_split_1ycaa_2", $T = "_main_1ycaa_10", CT = "_aside_1ycaa_15", un = {
  split: kT,
  main: $T,
  aside: CT
};
function tA({ children: e, aside: t, asideLabel: a }) {
  return /* @__PURE__ */ l("div", { className: un.split, children: [
    /* @__PURE__ */ n("div", { className: un.main, children: e }),
    /* @__PURE__ */ n("aside", { className: un.aside, "aria-label": a, children: t })
  ] });
}
const ST = "_hero_ehbct_2", RT = "_text_ehbct_11", TT = "_visual_ehbct_23", xT = "_title_ehbct_28", LT = "_lead_ehbct_36", AT = "_actions_ehbct_42", ET = "_action_ehbct_42", IT = "_primary_ehbct_63", MT = "_secondary_ehbct_72", Ae = {
  hero: ST,
  text: RT,
  visual: TT,
  title: xT,
  lead: LT,
  actions: AT,
  action: ET,
  primary: IT,
  secondary: MT
};
function BT({ actions: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ n("div", { className: Ae.actions, children: e.map((t, a) => /* @__PURE__ */ n("a", { className: `${Ae.action} ${a === 0 ? Ae.primary : Ae.secondary}`, href: L(t.href), children: t.label }, t.href)) });
}
function jT({ title: e, eyebrow: t, lead: a, actions: r = [] }) {
  return /* @__PURE__ */ l("div", { className: Ae.text, children: [
    t === void 0 ? null : /* @__PURE__ */ n(Jt, { children: t }),
    /* @__PURE__ */ n("h1", { className: Ae.title, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("p", { className: Ae.lead, children: a }),
    /* @__PURE__ */ n(BT, { actions: r })
  ] });
}
function nA({ visual: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: Ae.hero, "data-visual": e === void 0 ? "none" : "beside", children: [
    /* @__PURE__ */ n(jT, { ...t }),
    e === void 0 ? null : /* @__PURE__ */ n("div", { className: Ae.visual, children: e })
  ] });
}
const PT = "_chain_w2k2l_2", qT = "_step_w2k2l_12", HT = "_arrow_w2k2l_19", OT = "_box_w2k2l_24", Rt = {
  chain: PT,
  step: qT,
  arrow: HT,
  box: OT
};
function aA({ steps: e, label: t, animate: a }) {
  return /* @__PURE__ */ n("ol", { className: Rt.chain, "aria-label": t, "data-ward-animate": a ?? "", children: e.map((r, o) => /* @__PURE__ */ l("li", { className: Rt.step, style: { "--ward-step": o }, children: [
    o === 0 ? null : /* @__PURE__ */ n("span", { className: Rt.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n("span", { className: Rt.box, children: r })
  ] }, o)) });
}
const FT = "_card_1u2gr_2", DT = "_featured_1u2gr_20", zT = "_media_1u2gr_28", WT = "_body_1u2gr_32", KT = "_title_1u2gr_48", GT = "_link_1u2gr_60", UT = "_summary_1u2gr_78", VT = "_tags_1u2gr_84", YT = "_cta_1u2gr_90", fe = {
  card: FT,
  featured: DT,
  media: zT,
  body: WT,
  title: KT,
  link: GT,
  summary: UT,
  tags: VT,
  cta: YT
};
function Xr({ media: e, ratio: t = "16/9" }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: fe.media, children: /* @__PURE__ */ n(UR, { ratio: t, children: e }) });
}
function JT({ href: e, title: t, headingLevel: a = 3 }) {
  const r = Qt(a);
  return /* @__PURE__ */ n(r, { className: fe.title, children: /* @__PURE__ */ n("a", { className: fe.link, href: L(e), children: t }) });
}
function Zr({ eyebrow: e, ...t }) {
  return /* @__PURE__ */ l(T, { children: [
    e === void 0 ? null : /* @__PURE__ */ n(Jt, { children: e }),
    /* @__PURE__ */ n(JT, { ...t })
  ] });
}
function eo({ summary: e, tags: t = [] }) {
  return /* @__PURE__ */ l(T, { children: [
    e === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.summary, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("span", { className: fe.tags, children: t.map((a) => /* @__PURE__ */ n(OR, { label: a }, a)) })
  ] });
}
function rA({ media: e, ratio: t, eyebrow: a, summary: r, tags: o, ...i }) {
  return /* @__PURE__ */ l("article", { className: fe.card, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(Xr, { media: e, ratio: t }),
    /* @__PURE__ */ l("div", { className: fe.body, children: [
      /* @__PURE__ */ n(Zr, { eyebrow: a, ...i }),
      /* @__PURE__ */ n(eo, { summary: r, tags: o })
    ] })
  ] });
}
function oA({ media: e, ratio: t, eyebrow: a, summary: r, tags: o, cta: i, ...s }) {
  return /* @__PURE__ */ l("article", { className: `${fe.card} ${fe.featured}`, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(Xr, { media: e, ratio: t }),
    /* @__PURE__ */ l("div", { className: fe.body, children: [
      /* @__PURE__ */ n(Zr, { eyebrow: a, ...s }),
      /* @__PURE__ */ n(eo, { summary: r, tags: o }),
      i === void 0 ? null : /* @__PURE__ */ l("span", { className: fe.cta, "aria-hidden": "true", children: [
        i,
        " →"
      ] })
    ] })
  ] });
}
export {
  ix as ACCENT_PRESETS,
  Lx as ActionStack,
  LL as ActivityConsole,
  _x as AdminIcon,
  Gb as AgentCard,
  vx as AppShell,
  wL as AppearanceStrip,
  GL as Band,
  Tx as BarChart,
  sf as BoardColumn,
  Ux as BoardFootnote,
  Vx as BoardHeader,
  mx as BoardIcon,
  qx as BoardScroller,
  b as Btn,
  lx as CHIP_ROLES,
  Br as CREDENTIAL_COLUMNS,
  Rx as Callout,
  _L as CapabilityRow,
  Ox as CardGrid,
  HL as ChatMessage,
  Ba as Checkbox,
  m as Chip,
  ot as ClampText,
  AL as ClarificationRow,
  rL as ClauseRuleRow,
  aL as ClauseRules,
  _r as ColourLadder,
  fL as ComponentRow,
  EL as Composer,
  Jx as ConfigRow,
  Yx as ConfigRowHead,
  Tn as ConnectionMark,
  xL as ConsoleAnnounceProvider,
  qL as Conversation,
  pm as CostMeter,
  bL as CredentialRow,
  vL as CredentialRowHead,
  IL as CriteriaList,
  Ds as Crumb,
  sx as DENSITIES,
  OL as DeliveryHealth,
  Dx as DeniedState,
  ux as DisabledScope,
  lL as DryRunRail,
  S_ as EmptyState,
  pL as EnvCard,
  Jt as Eyebrow,
  YL as FactList,
  oA as FeaturedCard,
  q as Field,
  UR as Figure,
  Fx as FilteredEmpty,
  aA as FlowChain,
  bx as FoldText,
  jx as FormStack,
  Yt as GateChecklist,
  ML as GateLadder,
  Im as Grid,
  sL as HandoffRuleRow,
  iL as HandoffRules,
  nA as Hero,
  hx as HomeIcon,
  Qx as ItemDrawer,
  gL as KeyPanel,
  No as LIVE_EVENT_TYPES,
  wb as LegacyBoardColumn,
  Zx as LegacyBoardHeader,
  eL as LegacyConfigRow,
  nL as LegacyItemDrawer,
  ib as LegacyOverCapNote,
  tL as LegacyPreviewRail,
  hr as LegacyWorkCard,
  JL as LinkList,
  Ee as LiveIndicator,
  zx as LoadFailed,
  Gx as Loading,
  Fr as MCP_SERVER_COLUMNS,
  Rn as Mark,
  NL as MarkUpload,
  We as Marker,
  $L as McpServerRow,
  kL as McpServerRowHead,
  Ya as Menu,
  Ga as MenuButton,
  cL as NewStreamModal,
  L_ as OverCapNote,
  kn as OverflowRow,
  it as Overlay,
  px as OwedCard,
  oL as PARTIAL_STEP_REASON,
  Dr as POLICY_CHIP_WIDTH,
  Ix as PageFrame,
  Sx as PageHeader,
  ZL as PageIntro,
  jm as PlainList,
  CL as PolicyRow,
  Xx as PreviewRail,
  rA as ProjectCard,
  UL as Prose,
  VL as ProseHeading,
  rn as ROLE_MATRIX_COLUMNS,
  Rr as RULE_ACTIONS,
  rr as Radio,
  FL as ReadyChecklist,
  Bx as RecordSection,
  BL as RequeueSheet,
  jL as ResolveBlock,
  DL as ResolvedFieldRow,
  SL as RoleMatrixRow,
  zL as RoutingTable,
  dL as RuleRow,
  RL as RunbookSteps,
  yo as STREAM_STEPS,
  eA as Section,
  Px as SectionBand,
  na as SectionHeader,
  nr as SegmentedControl,
  za as Select,
  WL as SessionRow,
  kx as Sidebar,
  fx as SidebarFoldButton,
  XL as SiteFooter,
  QL as SiteHeader,
  tA as SplitLayout,
  uL as StageColumn,
  Hx as StageGrid,
  PL as StageHistory,
  Ry as StageListEditor,
  gx as StageSteps,
  Wx as StaleStrip,
  Gt as StatStrip,
  Ax as StatTiles,
  Cx as StreamAvatar,
  hL as StreamRow,
  wx as StudioIcon,
  Mx as SubjectRail,
  Je as Switch,
  Nx as TabLinks,
  xx as TableHead,
  yx as Tabs,
  OR as Tag,
  nx as ThemeProvider,
  mL as ToolRow,
  Ex as TopBar,
  Ow as Tree,
  cr as TreeRow,
  KL as TypedInputBlock,
  ui as UNSAFE_HREF,
  TL as ValidationList,
  ex as VisibilityProvider,
  tx as Visible,
  ox as WARD_VERSION,
  Vt as WorkCard,
  Kx as WriteUnavailableStrip,
  wR as agoSince,
  io as clock,
  Wy as colourStatus,
  ae as count,
  ue as duration,
  pn as elapsed,
  rx as eventSourceTransport,
  Qt as headingTag,
  zt as isStreamStep,
  ft as isValidatedStreamStep,
  Np as ladderValidation,
  w0 as mcpConnectionChip,
  h0 as mcpToolName,
  le as money,
  pe as ms,
  dr as ordered,
  $a as ratio,
  Mk as restartLabel,
  L as safeHref,
  VR as slug,
  he as stamp,
  gn as stream,
  cx as streamChip,
  Kt as streamChipProps,
  ye as streamColour,
  Co as streamHex,
  Bt as streamInitials,
  ko as streamVars,
  $x as uniqueStreamInitials,
  Ha as useAnchoredPanel,
  Tt as useBorderFlash,
  Ie as useDisabledScope,
  bo as useFocusTrap,
  dx as useLiveFeed,
  ax as useReturnFocus,
  Dt as useRovingTabindex,
  yn as useTicker,
  so as useVisible,
  j as v,
  yL as validateMark,
  bt as validatedStep,
  Sa as validatedStreamSteps
};
