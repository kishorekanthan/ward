import { jsx as n, Fragment as x, jsxs as l } from "react/jsx-runtime";
import { useMemo as ga, useContext as ye, createContext as Ne, useState as p, useEffect as S, useCallback as te, useRef as f, useLayoutEffect as at, useId as y, Fragment as ya, isValidElement as Xr, Children as Zr } from "react";
import { createPortal as eo, flushSync as Na } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const jn = (e) => String(e).padStart(2, "0");
function fn(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${jn(t % 60)}s` : `${Math.floor(a / 60)}h ${jn(a % 60)}m`;
}
const to = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const t = to.formatToParts(new Date(e)), a = (r) => {
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
function ka(e, t) {
  return `${e} / ${t}`;
}
const no = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function ao(e) {
  return no.format(new Date(e));
}
const $a = Ne(/* @__PURE__ */ new Set());
function qT({ hidden: e, children: t }) {
  const a = ga(() => new Set(e), [e]);
  return /* @__PURE__ */ n($a.Provider, { value: a, children: t });
}
function ro(e) {
  return !ye($a).has(e);
}
function HT({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: ro(e) ? t : a });
}
const oo = "(prefers-color-scheme: dark)";
function Pn() {
  return typeof window.matchMedia == "function" ? window.matchMedia(oo) : null;
}
function lo(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = Pn()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? Pn() : null;
    if (!r) return;
    const o = () => a(r.matches);
    return o(), r.addEventListener("change", o), () => r.removeEventListener("change", o);
  }, [e]), t;
}
function Yt(e, t) {
  S(() => {
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function io(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function OT({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const o = lo(e === "system");
  return Yt("data-theme", io(e, o)), Yt("data-accent", t), Yt("data-density", a), /* @__PURE__ */ n(x, { children: r });
}
const so = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function co(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function uo(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function ho(e, t, a, r) {
  return e.shiftKey ? co(t, a) ? r : void 0 : document.activeElement === r || uo(t) ? a : void 0;
}
function mo(e, t, a) {
  const r = a[0], o = a[a.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = ho(e, t, r, o);
  i && (e.preventDefault(), i.focus());
}
function wo(e) {
  return { onKeyDown: te(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(so));
      mo(a, e.current, r);
    },
    [e]
  ) };
}
function FT(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [t, e]);
}
const qn = { ArrowUp: -1, ArrowDown: 1 }, Hn = { ArrowLeft: -1, ArrowRight: 1 }, _o = (e, t, a) => Math.min(a, Math.max(t, e));
function fo(e, t) {
  if (t !== "horizontal" && e in qn) return qn[e];
  if (t !== "vertical" && e in Hn) return Hn[e];
}
function Ft({ orientation: e = "both" } = {}) {
  const [t, a] = p(0), r = f(/* @__PURE__ */ new Map()), o = f(!1);
  at(() => {
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
      const w = Math.max(0, h.indexOf(t)), _ = fo(u.key, e);
      _ !== void 0 ? (u.preventDefault(), s(h[_o(w + _, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
const DT = (e, t, a) => {
  const r = new EventSource(e), o = (i) => a.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, zT = "0.2.0", WT = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], vo = [1, 2, 3, 4, 5, 6], Ca = [1, 2, 3], bo = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], KT = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], GT = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], j = {
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
}, be = {
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
function vn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Dt(e) {
  return vo.includes(e);
}
function _t(e) {
  return Ca.includes(e);
}
function po(e) {
  if (!Dt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function UT(e) {
  if (!Dt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const go = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function yo(e) {
  if (!Dt(e)) throw new Error("unvalidated stream step");
  return go[e];
}
function On(e) {
  return typeof e != "string" ? null : bo.includes(e) ? e : null;
}
function No(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function ko(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function $o(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Co(e, t, a) {
  const r = No(e);
  if (r === null) return null;
  const o = On(a) ?? On(r.type);
  return o === null ? null : { ...r, type: o, id: ko(r, t), at: $o(r) };
}
function So(e, t) {
  return e >= be.staleAfter ? "stale" : e >= be.heartbeat && t === "live" ? "reconnecting" : null;
}
function Ro(e, t, a) {
  return e >= be.heartbeat && !t && a !== null;
}
function VT(e, t) {
  const [a, r] = p("reconnecting"), [o, i] = p(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), h = f(null), w = f(0), _ = f(0), N = f(!1), k = f("reconnecting"), E = te((T) => {
    k.current = T, r(T);
  }, []), H = te(() => {
    c.current = Date.now();
  }, []), me = te((T) => {
    for (const [J, ke] of s.current)
      (ke === "*" || T.itemKey === ke) && J(T);
  }, []), re = te(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (T, J, ke) => {
        const We = Co(T, J, ke);
        We !== null && (We.id && (d.current = We.id), H(), N.current = !1, E("live"), i(We.at), me(We));
      },
      onOpen: () => {
        u.current = 0, N.current = !1, H(), E("live");
      },
      onError: () => {
        var J;
        (J = h.current) == null || J.close(), h.current = null, N.current = !0, k.current !== "stale" && E("reconnecting");
        const T = Math.min(be.reconnectBase * 2 ** u.current, be.reconnectMax);
        u.current += 1, w.current = window.setTimeout(re, T);
      }
    });
  }, [me, E, H, t, e]), Ie = te((T) => {
    N.current = !0, T.close(), h.current = null, w.current = window.setTimeout(re, be.reconnectBase);
  }, [re]), Je = te((T, J) => (s.current.set(J, T), () => {
    s.current.delete(J);
  }), []);
  return S(() => (re(), _.current = window.setInterval(() => {
    const T = Date.now() - c.current, J = So(T, k.current);
    J && E(J);
    const ke = h.current;
    Ro(T, N.current, ke) && Ie(ke);
  }, be.tick), () => {
    var T;
    window.clearInterval(_.current), window.clearTimeout(w.current), N.current = !1, (T = h.current) == null || T.close(), h.current = null;
  }), [re, Ie, E]), { connection: a, lastEventAt: o, subscribe: Je };
}
function bn(e, t) {
  const a = new Date(e).getTime(), [r, o] = p(() => Date.now());
  return S(() => {
    if (!t) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && o(Date.now());
    };
    i();
    const s = window.setInterval(i, be.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", i);
    };
  }, [t, a]), Math.max(0, r - a);
}
const To = { blue: "running", orange: "waiting", green: "done" };
function xo() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Fn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function Rt(e, t) {
  const a = f(0), r = te((o) => {
    const i = o ?? t, s = e.current;
    s !== null && i !== void 0 && (xo() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${To[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => Fn(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => Fn(s), be.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (o) => r(o) : () => r(t);
}
const Lo = "_root_1otpc_2", Ao = {
  root: Lo
};
function Eo(e, t, a, r, o) {
  const i = [fn(t)];
  return e || i.push(`as of ${ao(a)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function Ae({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const o = a !== "stale", i = bn(e, o), s = (t == null ? void 0 : t.at) ?? e, c = Eo(o, i, s, r, t);
  return /* @__PURE__ */ l("span", { className: `${Ao.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const Io = "_app_1bnco_1", Mo = "_side_1bnco_35", Bo = "_sideTop_1bnco_46", jo = "_sideBody_1bnco_60", Po = "_iconRail_1bnco_99", qo = "_railItem_1bnco_108", Ho = "_railIcon_1bnco_129", Oo = "_railDot_1bnco_134", Fo = "_railLetter_1bnco_140", Do = "_main_1bnco_146", zo = "_rail_1bnco_108", Wo = "_page_1bnco_168", Ko = "_headerRow_1bnco_191", Go = "_sidebarToggle_1bnco_198", Uo = "_headerSlot_1bnco_203", Vo = "_headerAction_1bnco_208", Yo = "_drawerSide_1bnco_213", Jo = "_root_1bnco_260", Qo = "_topbar_1bnco_267", Xo = "_mark_1bnco_278", Zo = "_brand_1bnco_285", el = "_tagline_1bnco_291", tl = "_identity_1bnco_297", nl = "_tools_1bnco_298", al = "_nav_1bnco_308", rl = "_metadata_1bnco_315", ol = "_actor_1bnco_330", ll = "_detail_1bnco_331", il = "_content_1bnco_376", sl = "_toolsPanel_1bnco_392", cl = "_skip_1bnco_418", C = {
  app: Io,
  side: Mo,
  sideTop: Bo,
  sideBody: jo,
  iconRail: Po,
  railItem: qo,
  railIcon: Ho,
  railDot: Oo,
  railLetter: Fo,
  main: Do,
  rail: zo,
  page: Wo,
  headerRow: Ko,
  sidebarToggle: Go,
  headerSlot: Uo,
  headerAction: Vo,
  drawerSide: Yo,
  root: Jo,
  topbar: Qo,
  mark: Xo,
  brand: Zo,
  tagline: el,
  identity: tl,
  tools: nl,
  nav: al,
  metadata: rl,
  actor: ol,
  detail: ll,
  content: il,
  toolsPanel: sl,
  skip: cl
};
function ot(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const dl = "_scope_1an6i_2", ul = {
  scope: dl
}, Sa = Ne(null);
function YT({ reason: e, actions: t = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ l("fieldset", { disabled: !0, className: `${ul.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(Sa.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Ee() {
  return ye(Sa);
}
function zt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : ot(e, t.reasonId);
}
const hl = "_btn_hrmlj_2", ml = "_primary_hrmlj_14", wl = "_destructive_hrmlj_25", _l = "_secondary_hrmlj_35", fl = "_ghost_hrmlj_40", vl = "_overflow_hrmlj_49", bl = "_sm_hrmlj_56", pl = "_disabled_hrmlj_60", gl = "_withReason_hrmlj_68", yl = "_reason_hrmlj_74", nt = {
  btn: hl,
  primary: ml,
  destructive: wl,
  secondary: _l,
  ghost: fl,
  overflow: vl,
  sm: bl,
  disabled: pl,
  withReason: gl,
  reason: yl
};
function Nl(e, t, a, r) {
  const o = t === "sm" ? [nt.sm, "ward-btn--sm"] : [], i = a ? [nt.disabled] : [];
  return [nt.btn, nt[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function kl(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function $l(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Cl(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function Sl(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Rl(e, t, a) {
  return Sl(e.describedBy, t && a);
}
function Tl({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${nt.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function xl(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Ee()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(Ll, { ...e });
}
function Ll(e) {
  const t = Ee();
  $l(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", o = !!(e.disabled || t), i = Cl(e, t), s = y(), c = Al(i, t);
  return /* @__PURE__ */ l(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: Nl(a, r, o, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: o,
        title: i,
        "aria-describedby": Rl(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...kl(a, e.controls),
        children: xl(e)
      }
    ),
    /* @__PURE__ */ n(Tl, { id: s, reason: i, shown: c === Ra })
  ] });
}
function Al(e, t) {
  return e && !t ? Ra : ya;
}
function Ra({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${nt.withReason} ward-btn-withReason`, children: e });
}
let pn = "none";
function El(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (pn = "key");
}
typeof document < "u" && (document.addEventListener("keydown", El, !0), document.addEventListener("pointerdown", () => {
  pn = "pointer";
}, !0));
function Il() {
  return pn === "key";
}
function mt(e) {
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
const Ml = "_scrim_1cawq_2", Bl = "_drawer_1cawq_10", jl = "_sheet_1cawq_14", Pl = "_modal_1cawq_18", ql = "_panel_1cawq_23", Hl = "_start_1cawq_44", Ol = "_header_1cawq_67", Fl = "_title_1cawq_75", Dl = "_body_1cawq_79", zl = "_close_1cawq_106", Te = {
  scrim: Ml,
  drawer: Bl,
  sheet: jl,
  modal: Pl,
  panel: ql,
  start: Hl,
  header: Ol,
  title: Fl,
  body: Dl,
  close: zl
}, Wl = Ne(null), Et = [], It = /* @__PURE__ */ new Map();
function Kl(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Gl(e, t) {
  let a = It.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, It.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function Ul(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !Kl(r) && Gl(e, r);
}
function Vl(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (Ul(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function Yl(e) {
  for (const t of e.claims) {
    const a = It.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), It.delete(t)));
  }
}
function Jl(e, t) {
  const a = { root: e, claims: [] };
  return Et.push(a), Vl(a, t), a;
}
function Ql(e) {
  const t = Et.indexOf(e);
  t >= 0 && Et.splice(t, 1), Yl(e);
}
function Dn(e) {
  return e !== null && Et.at(-1) === e;
}
function Xl(e, t, a) {
  const r = f(null), o = f(a);
  return o.current = a, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = Jl(i, t);
    return r.current = c, () => {
      var u, h;
      const d = Dn(c);
      Ql(c), r.current = null, d && ((h = (u = o.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), te(() => Dn(r.current), []);
}
function Zl(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function ei(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function ti({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("header", { className: `${Te.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Te.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function ni(e) {
  return `${Te.scrim} ${Te[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function ai(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Te.panel} ${Te[e]} ward-overlay-panel${a}${r}`;
}
function ri(e) {
  const t = ye(Wl);
  return e ?? t ?? document.body;
}
function lt(e) {
  const t = f(null), a = f(null), r = y(), o = ri(e.container), i = mt("(min-width: 768px)"), s = Zl(e.kind, i), c = ei(e, r), d = wo(a), [u] = p(Il), h = Xl(t, o, e.returnFocusTo), w = te(() => {
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
  }, [w]), eo(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: ni(s),
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
            className: ai(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => h() && d.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Te.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(ti, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const oi = /^([a-z][a-z0-9+.-]*):/i, li = /* @__PURE__ */ new Set(["http", "https"]), ii = "#";
function si(e) {
  var r, o;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (o = (r = oi.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : o.toLowerCase();
}
function L(e) {
  const t = si(e);
  return t === void 0 || li.has(t) ? e : ii;
}
function ci(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function Ta(e) {
  const t = ci(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function di(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => Ta(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const o = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [a, ...a.children]) o == null || o.observe(i);
    return r(), () => {
      a.removeEventListener("scroll", r), o == null || o.disconnect();
    };
  }, [e, t]);
}
function ui(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, o = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : o > e.clientWidth - a ? e.scrollLeft + o - e.clientWidth + a : null;
}
function hi(e, t, a) {
  at(() => {
    const r = e.current, o = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !o) return;
    const i = ui(r, o);
    i !== null && (r.scrollLeft = Math.max(0, i)), Ta(r);
  }, [e, t, a]);
}
const mi = "_row_11g8i_2", wi = {
  row: mi
};
function _i(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function gn({ label: e, children: t, count: a, as: r = "div", focusable: o = !0, rowRef: i, className: s, ...c }) {
  const d = f(null), u = i ?? d;
  return di(u, a), /* @__PURE__ */ n(r, { ref: u, className: [wi.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ..._i(o, r), ...c, children: t });
}
const fi = "_icon_1ylqy_2", vi = {
  icon: fi
};
function ft({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: vi.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function JT() {
  return /* @__PURE__ */ n(ft, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function QT() {
  return /* @__PURE__ */ l(ft, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function XT() {
  return /* @__PURE__ */ l(ft, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function ZT() {
  return /* @__PURE__ */ n(ft, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function bi() {
  return /* @__PURE__ */ l(ft, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const xa = "ward:sidebar-collapsed", pi = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function gi() {
  try {
    return window.localStorage.getItem(xa) === "true";
  } catch {
    return !1;
  }
}
function yi(e) {
  try {
    window.localStorage.setItem(xa, String(e));
  } catch {
  }
}
function Ni(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function ki(e) {
  return e instanceof Element && e.closest(pi) !== null;
}
function $i(e) {
  return e.key === "[" && !Ni(e) && !ki(e.target);
}
function Ci(e) {
  const [t, a] = p(gi), r = () => {
    yi(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const o = (i) => {
      var c;
      if (!$i(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [e, t]), { collapsed: t, toggle: r };
}
function Si() {
  const e = mt("(max-width: 767.98px)"), t = mt("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function Ri(e) {
  const t = e === "phone", a = y(), r = f(null), [o, i] = p(!1);
  return o && !t && i(!1), { narrow: t, open: o, drawerId: a, slotRef: r, toggle: () => i(!o), close: () => i(!1) };
}
function Ti({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ l("div", { className: C.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: C.headerSlot, children: e }),
    Ia(t) && /* @__PURE__ */ n("span", { className: C.headerAction, children: t })
  ] }) : e;
}
function xi(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function Li({ sidebar: e, label: t, drawer: a }) {
  var o;
  if (xi(a.open, a.close), !a.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(lt, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (o = a.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ n("div", { className: C.drawerSide, onClick: r, children: La(e, !1) }) });
}
function Ai(e) {
  const [t, a] = p(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function Ei(e, t) {
  const a = Ci(e === "wide" && !t), r = Ai(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function Ii(e, t) {
  const a = Ei(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return Bi(e.collapsed, t);
  const r = a.collapsed, o = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: o, drawsStrip: !o && typeof e.sidebar == "function", toggle: a.toggle };
}
const Mi = (e) => e.collapsed && e.drawsStrip;
function Bi(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const zn = (e) => e ? "" : void 0;
function La(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Aa({ fold: e }) {
  return /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(bi, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function ji({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: C.sideTop, children: /* @__PURE__ */ n(Aa, { fold: e }) });
}
const Ea = Ne(null);
function ex() {
  const e = ye(Ea);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(Aa, { fold: e });
}
function Pi({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": vn(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function qi({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: C.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ l("a", { className: C.railItem, href: L(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(Pi, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function Hi({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: o }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ l("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(ji, { fold: r, inSidebar: o && !i }),
    /* @__PURE__ */ n("div", { className: C.sideBody, hidden: i, children: La(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(qi, { items: a ?? [], label: t })
  ] });
}
const Ia = (e) => e != null;
function Oi(e) {
  const { sidebar: t, header: a, action: r, children: o, rail: i, iconRail: s, pageFill: c } = e, d = Ia(i), u = Si(), h = Ri(u), w = Ii(e, u), _ = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ l("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": zn(Mi(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(Ea.Provider, { value: w, children: /* @__PURE__ */ n(Hi, { sidebar: t, label: _, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ l("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(Ti, { header: a, action: r, label: _, drawer: h }),
      /* @__PURE__ */ n("div", { className: C.page, "data-fill": zn(c === !0), children: o })
    ] }),
    d && /* @__PURE__ */ n("div", { className: C.rail, children: i }),
    /* @__PURE__ */ n(Li, { sidebar: t, label: _, drawer: h })
  ] });
}
function Fi({ destinations: e, active: t }) {
  const a = f(null);
  return hi(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(gn, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: L(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function cn({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function Di({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ l("span", { className: C.metadata, children: [
    /* @__PURE__ */ n(cn, { value: e, className: C.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(cn, { value: t, className: C.detail })
  ] });
}
function zi() {
  const e = mt("(max-width: 767.98px)"), t = y(), a = f(null), [r, o] = p(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Wi({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: C.tools, children: e });
}
function Ki({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: C.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function Gi(e) {
  return /* @__PURE__ */ l("header", { className: C.topbar, children: [
    /* @__PURE__ */ n("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(cn, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ n(Fi, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: C.identity, children: /* @__PURE__ */ n(Di, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Wi, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Ui(e) {
  const t = y(), a = zi();
  return /* @__PURE__ */ l("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: C.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Gi, { ...e, menu: a }),
    /* @__PURE__ */ n(Ki, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: C.content, children: e.children })
  ] });
}
function Vi(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function tx(e) {
  return Vi(e) ? /* @__PURE__ */ n(Oi, { ...e }) : /* @__PURE__ */ n(Ui, { ...e });
}
const Yi = "_root_itg9o_2", Ji = "_row_itg9o_8", Qi = "_box_itg9o_14", Xi = "_label_itg9o_21", Zi = "_labelHidden_itg9o_26", es = "_lockedNote_itg9o_36", ts = "_consequence_itg9o_44", ns = "_sample_itg9o_79", je = {
  root: Yi,
  row: Ji,
  box: Qi,
  label: Xi,
  labelHidden: Zi,
  lockedNote: es,
  consequence: ts,
  sample: ns
};
function as(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function rs({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${je.consequence} ward-check-consequence`, children: t }) : null;
}
function os({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${je.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function ls(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function is(e, t, a, r) {
  const o = e.consequence ? `${t}-note` : void 0, i = ls(e, a, r), s = i ? `${t}-reason` : void 0, c = zt(ot(o, e.describedBy, s), r);
  return { noteId: o, reason: i, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? i } };
}
function ss({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function cs({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: je.sample, "aria-hidden": "true", children: e }) : null;
}
function Ma(e) {
  const t = y(), a = Ee(), r = as(e, a), o = is(e, t, r.disabled, a);
  return /* @__PURE__ */ l("div", { className: `${je.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ l("span", { className: je.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: t,
          type: "checkbox",
          className: `${je.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (i) => {
            var s;
            return !r.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, i.target.checked));
          },
          ...o.input
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: t, className: e.labelHidden ? je.labelHidden : je.label, children: [
        e.label,
        /* @__PURE__ */ n(os, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(cs, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(ss, { id: o.reasonId, reason: o.reason }),
    /* @__PURE__ */ n(rs, { id: o.noteId, text: e.consequence })
  ] });
}
const ds = "_chip_pq6tb_2", us = {
  chip: ds
}, hs = {
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
function ms(e, t) {
  if (e === "stream") return ws(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = hs[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function ws(e) {
  if (!e || !_t(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = vn(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${us.chip} ward-chip ward-chip--${e}`, style: ms(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const _s = "_clamp_zn74g_3", Wn = {
  clamp: _s
};
function rt({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? Wn.clamp : `${Wn.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const fs = "_root_1btz3_2", vs = "_body_1btz3_10", bs = "_toggle_1btz3_24", Jt = {
  root: fs,
  body: vs,
  toggle: bs
};
function nx({ children: e, lines: t = 3, label: a }) {
  const [r, o] = p(!1), i = y();
  return /* @__PURE__ */ l("div", { className: Jt.root, children: [
    /* @__PURE__ */ n("div", { id: i, className: Jt.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: Jt.toggle, "aria-expanded": r, "aria-controls": i, onClick: () => o(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const ps = "_root_1a4s8_2", gs = "_words_1a4s8_16", ys = "_title_1a4s8_23", Ns = "_actions_1a4s8_27", bt = {
  root: ps,
  words: gs,
  title: ys,
  actions: Ns
};
function ax({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ l("section", { className: bt.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ l("div", { className: bt.words, children: [
      /* @__PURE__ */ n("strong", { className: bt.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: bt.actions, children: a })
  ] });
}
const ks = "_root_8zmpu_2", $s = "_step_8zmpu_12", Cs = "_dot_8zmpu_38", Ss = "_label_8zmpu_51", st = {
  root: ks,
  step: $s,
  dot: Cs,
  label: Ss
}, Rs = { done: ", done", now: ", current", next: "" };
function Ts({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ l("li", { className: st.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${st.dot} ward-running` : st.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: st.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: Rs[e.state] })
  ] });
}
function rx({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: st.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(Ts, { step: r, running: t }, r.label)) });
}
function vt(e) {
  return typeof e == "number" && _t(e) ? e : null;
}
function ge(e, t) {
  const a = vt(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function Wt(e, t) {
  const a = vt(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const xs = "_root_13eei_3", Ls = "_nav_13eei_8", As = "_list_13eei_16", Es = "_item_13eei_24", Is = "_link_13eei_44", Ms = "_sep_13eei_54", Bs = "_current_13eei_58", js = "_chips_13eei_62", Be = {
  root: xs,
  nav: Ls,
  list: As,
  item: Es,
  link: Is,
  sep: Ms,
  current: Bs,
  chips: js
};
function Ps({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: Be.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${Be.link} ward-target`, href: L(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function qs({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: Be.root, children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Be.nav, children: [
    /* @__PURE__ */ n("ol", { className: Be.list, children: e.map((r, o) => /* @__PURE__ */ l("li", { className: Be.item, children: [
      o > 0 ? /* @__PURE__ */ n("span", { className: Be.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(Ps, { step: r, isCurrent: a && o === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${Be.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function Ba(e, t, a) {
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
const Hs = 500;
function ja(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function Pa() {
  const e = f(""), t = f(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, Hs), e.current);
}
const pt = 4;
function Os(e, t, a) {
  const r = Math.max(0, a - e.bottom - pt * 2), o = Math.max(0, e.top - pt * 2);
  return t <= r || r >= o ? { top: e.bottom + pt, maxHeight: r } : { top: e.top - pt - Math.min(t, o), maxHeight: o };
}
function Fs(e, t, a, r) {
  const o = { start: e.left, end: e.right - t }, i = { start: o.start + t <= a, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, a - t));
}
function Ds(e, t, a, r) {
  return { ...Os(e, t.height, a.height), left: Fs(e, t.width, a.width, r) };
}
function Tt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function zs(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function Ws(e, t, a) {
  const r = zs(t, a);
  e.style.setProperty("--ward-anchor-width", Tt(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const o = e.getBoundingClientRect(), i = document.documentElement;
  return { edges: r, box: o, view: { width: i.clientWidth, height: i.clientHeight } };
}
function Ks(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, o) => r.scrollTop = a[o]);
}
function Kn(e, t, a, r) {
  const o = Ks(e), i = Ws(e, t, r), s = Ds(i.edges, i.box, i.view, a);
  Object.assign(e.style, { left: Tt(s.left - i.box.left), top: Tt(s.top - i.box.top), maxHeight: Tt(s.maxHeight) }), o();
}
function Gs(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function qa(e, t, a = "start", r) {
  at(() => {
    const o = t.current, i = e.current;
    if (!o || !i) return;
    const s = Gs(o), c = () => Kn(o, i, a, r == null ? void 0 : r.current), d = (u) => {
      o.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), at(() => {
    t.current && e.current && Kn(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const Us = "_root_1lgbn_2", Vs = "_trigger_1lgbn_7", Ys = "_value_1lgbn_47", Js = "_menu_1lgbn_65", Qs = "_find_1lgbn_87", Xs = "_list_1lgbn_103", Zs = "_option_1lgbn_114", ec = "_check_1lgbn_133", tc = "_empty_1lgbn_144", pe = {
  root: Us,
  trigger: Vs,
  value: Ys,
  menu: Js,
  find: Qs,
  list: Xs,
  option: Zs,
  check: ec,
  empty: tc
}, nc = 7;
function ac(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function Gn(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function rc(e, t) {
  const [a, r] = p(e.defaultOpen === !0), [o, i] = p(""), [s, c] = p(() => Gn(e.options, e.value)), d = (u) => {
    var h;
    Na(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: o,
    active: s,
    entries: ac(e.options, o),
    findable: e.options.length > nc,
    show: () => {
      e.disabled || (i(""), c(Gn(e.options, e.value)), r(!0));
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
function oc(e, t) {
  const a = f(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function lc(e) {
  const t = Pa();
  return (a) => {
    const r = t(a), o = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    o >= 0 && e.to(o);
  };
}
function Ha(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function ic(e) {
  return { ...Ha(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function Oa(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const o = t[r.key];
    if (!o) return a(r);
    r.preventDefault(), r.stopPropagation(), o();
  };
}
const sc = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function cc(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      sc.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function dc({ entry: e, at: t, menu: a, ids: r, value: o }) {
  return /* @__PURE__ */ l(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === o,
      "data-active": t === a.active || void 0,
      className: pe.option,
      onMouseDown: (i) => i.preventDefault(),
      onMouseMove: () => a.to(t),
      onClick: () => a.pick(e),
      children: [
        /* @__PURE__ */ n("span", { className: pe.check, "aria-hidden": "true" }),
        /* @__PURE__ */ n("span", { className: pe.label, children: e.option.label })
      ]
    }
  );
}
function yn(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function uc({ menu: e, ids: t, focusRef: a }) {
  return /* @__PURE__ */ n(
    "input",
    {
      ref: a,
      className: pe.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": t.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": yn(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: Oa(e, Ha(e), () => {
      })
    }
  );
}
function hc({ props: e, menu: t, ids: a, focusRef: r, trigger: o }) {
  const i = lc(t), s = f(null);
  qa(o, s);
  const c = (d) => {
    ja(d) && i(d.key);
  };
  return /* @__PURE__ */ l("div", { ref: s, className: pe.menu, children: [
    t.findable && /* @__PURE__ */ n(uc, { menu: t, ids: a, focusRef: r }),
    /* @__PURE__ */ n(
      "ul",
      {
        ref: t.findable ? void 0 : r,
        id: a.list,
        role: "listbox",
        tabIndex: -1,
        className: pe.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": t.findable ? void 0 : yn(t, a),
        onKeyDown: Oa(t, ic(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(dc, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: pe.empty, children: "No match" })
  ] });
}
function mc(e, t) {
  const a = e.open ? yn(e, t) : void 0;
  S(() => {
    var r, o;
    a && ((o = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [a]);
}
function Fa(...e) {
  return e.filter(Boolean).join(" ");
}
function wc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function _c({ props: e, menu: t, ids: a, trigger: r, wantFocus: o }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ee()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: Fa(pe.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": t.open,
      "aria-controls": t.open ? a.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": ot(e["aria-describedby"], a.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...cc(t, o),
      children: /* @__PURE__ */ n("span", { id: a.value, className: pe.value, "data-placeholder": i || void 0, children: wc(e) })
    }
  );
}
function Da(e) {
  const t = Ee(), a = t ? { ...e, disabled: !0, "aria-describedby": zt(e["aria-describedby"], t) } : e, r = y(), o = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = f(null), s = f(null), c = f(null), d = rc(a, s), u = oc(d.open, c);
  return Ba(d.open, i, () => d.close(!1)), mc(d, o), /* @__PURE__ */ l("div", { ref: i, className: Fa(pe.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(_c, { props: a, menu: d, ids: o, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(hc, { props: a, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const fc = "_field_1ensj_2", vc = "_label_1ensj_8", bc = "_labelHidden_1ensj_15", pc = "_control_1ensj_25", gc = "_mono_1ensj_45", yc = "_area_1ensj_50", Nc = "_invalid_1ensj_57", Fe = {
  field: fc,
  label: vc,
  labelHidden: bc,
  control: pc,
  mono: gc,
  area: yc,
  invalid: Nc
}, kc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, za = (e) => `${e}-label`;
function $c({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? kc : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function Cc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    Da,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": za(t.id),
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
function Sc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
const Rc = { input: $c, select: Cc, textarea: Sc };
function Tc(e, t, a) {
  const r = Rc[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function xc(e, t, a, r) {
  const o = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": o,
    "aria-describedby": zt(ot(o ? a : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function Lc(e) {
  const t = e.mono ? [Fe.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [Fe.area] : [];
  return [Fe.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function Ac(e) {
  return e ? `${Fe.label} ${Fe.labelHidden} ward-field-label` : `${Fe.label} ward-field-label`;
}
function q(e) {
  const t = y(), a = `${t}-msg`, r = xc(e, t, a, Ee()), o = Lc(e);
  return /* @__PURE__ */ l("div", { className: `${Fe.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: za(t), className: Ac(e.labelHidden), htmlFor: t, children: e.label }),
    Tc(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${Fe.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Ec = "_root_sjvm0_2", Ic = "_trigger_sjvm0_9", Mc = "_ghost_sjvm0_27", Bc = "_panel_sjvm0_46", jc = "_edged_sjvm0_67", Pc = "_menu_sjvm0_73", qc = "_group_sjvm0_78", Hc = "_heading_sjvm0_83", Oc = "_item_sjvm0_89", Fc = "_description_sjvm0_105", Dc = "_large_sjvm0_109", zc = "_touch_sjvm0_113", Wc = "_icon_sjvm0_117", Kc = "_label_sjvm0_125", Gc = "_text_sjvm0_130", Uc = "_trailing_sjvm0_138", Vc = "_check_sjvm0_144", Yc = "_separator_sjvm0_183", Jc = "_footer_sjvm0_189", Qc = "_find_sjvm0_196", Xc = "_findGlyph_sjvm0_208", Zc = "_findInput_sjvm0_214", ed = "_empty_sjvm0_230", A = {
  root: Ec,
  trigger: Ic,
  ghost: Mc,
  panel: Bc,
  edged: jc,
  menu: Pc,
  group: qc,
  heading: Hc,
  item: Oc,
  description: Fc,
  large: Dc,
  touch: zc,
  icon: Wc,
  label: Kc,
  text: Gc,
  trailing: Uc,
  check: Vc,
  separator: Yc,
  footer: Jc,
  find: Qc,
  findGlyph: Xc,
  findInput: Zc,
  empty: ed
}, Wa = Ne(null);
function td(e, t) {
  const [a, r] = p({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (o) => r((i) => ({ open: !0, start: o, request: i.request + 1 })),
    close: (o) => {
      var i;
      Na(() => r((s) => ({ ...s, open: !1 }))), o && ((i = t.current) == null || i.focus());
    }
  };
}
const nd = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function ad(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = nd.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function Nn(...e) {
  return e.filter(Boolean).join(" ");
}
function rd(e, t = {}, a = "field") {
  const { ref: r, className: o, ...i } = t;
  return { ...i, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: Nn(A.trigger, a === "ghost" ? A.ghost : void 0, o) };
}
function Ka(e) {
  const t = y(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = f(null), o = f(null), i = td(e.defaultOpen === !0, o);
  return Ba(i.open, r, () => i.close(!1)), /* @__PURE__ */ l("div", { ref: r, className: Nn(A.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...rd(o, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...ad(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(Wa.Provider, { value: { ...a, popup: i, button: o }, children: e.children })
  ] });
}
function od(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function ld(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const id = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function sd(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function cd(e, t) {
  return e === "separator" ? e : "items" in e ? sd(e, t) : t(e) ? e : null;
}
function dd(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function ud(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (o) => o.label.toLowerCase().includes(a);
  return dd(e.map((o) => cd(o, r)).filter((o) => o !== null));
}
const Ga = (e, t) => (e % t + t) % t;
function qe(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const o = Ga(t + a * r, e.length);
    if (!e[o].disabled) return o;
  }
  return -1;
}
const hd = (e) => e.split("").every((t) => t === e[0]);
function md(e, t, a) {
  const r = hd(a), o = r ? a[0] : a, i = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = Ga(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function wd(e) {
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
function _d(e, t) {
  const { items: a } = e, r = () => {
    var o;
    return (o = e.refs.current[e.current()]) == null ? void 0 : o.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(qe(a, e.current(), 1))],
    ["ArrowUp", () => e.focus(qe(a, e.current(), -1))],
    ["Home", () => e.focus(qe(a, -1, 1))],
    ["End", () => e.focus(qe(a, a.length, -1))],
    ["Escape", () => t.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function fd(e, t, a) {
  const r = Pa(), o = _d(e, t), i = (s) => {
    if (ja(s)) {
      if (!a) return e.focus(md(e.items, e.current(), r(s.key)));
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
function vd(e) {
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
function bd(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? qe(e, -1, 1) : t;
}
function pd(e, t) {
  const { start: a, request: r } = t, o = f(e);
  o.current = e, S(() => {
    const { items: i, focus: s } = o.current;
    a && s(a === "first" ? bd(i) : qe(i, i.length, -1));
  }, [a, r]);
}
function gd({ row: e, nav: t, popup: a }) {
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
const yd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function Nd(e, t) {
  return yd(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function kd(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: A.label, children: e.label });
  return e.description ? /* @__PURE__ */ l("span", { className: A.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: A.description, children: e.description })
  ] }) : a;
}
function $d() {
  return /* @__PURE__ */ n("svg", { className: A.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Un(e, t) {
  return /* @__PURE__ */ l(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: A.icon, "aria-hidden": "true", children: e.icon }) : null,
    kd(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: A.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n($d, {}) : null
  ] });
}
function Ua(e) {
  const { item: t, at: a } = e.row, r = y(), o = {
    ref: (i) => {
      e.nav.refs.current[a] = i;
    },
    role: "menuitem",
    tabIndex: -1,
    className: A.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...Nd(t, r),
    ...gd(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: L(t.href), ...o, children: Un(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...o, children: Un(t, r) });
}
function Cd({ heading: e, rows: t, nav: a, popup: r }) {
  const o = y();
  return /* @__PURE__ */ l("div", { role: "group", "aria-labelledby": o, className: A.group, children: [
    /* @__PURE__ */ n("div", { id: o, className: A.heading, children: e }),
    t.map((i) => /* @__PURE__ */ n(Ua, { row: i, nav: a, popup: r }, i.at))
  ] });
}
function Sd({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: A.separator }) : e.kind === "group" ? /* @__PURE__ */ n(Cd, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(Ua, { row: e.row, nav: t, popup: a });
}
function Rd() {
  const e = ye(Wa);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Td() {
  return /* @__PURE__ */ l("svg", { className: A.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function xd(e, t) {
  const a = () => qe(e.items, -1, 1);
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(a())],
    ["ArrowUp", () => e.focus(qe(e.items, e.items.length, -1))],
    ["Enter", () => {
      var r;
      return (r = e.refs.current[a()]) == null ? void 0 : r.click();
    }],
    ["Escape", () => t.close(!0)]
  ]);
}
function Ld({ find: e, query: t, setQuery: a, input: r, nav: o, popup: i, menuId: s }) {
  const c = xd(o, i), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ l("div", { className: A.find, children: [
    /* @__PURE__ */ n(Td, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: A.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function Ad(e, t) {
  const [a, r] = p(""), o = f(null), i = t !== void 0 && id(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = o.current) == null || d.focus();
  };
  return i ? { find: t, query: a, setQuery: r, input: o, toFind: s, entries: ud(e, a) } : { query: a, setQuery: r, input: o, entries: e };
}
const Ed = { regular: void 0, large: A.large, touch: A.touch }, Id = (e, t) => Nn(A.panel, e ? A.edged : void 0, Ed[t]);
function Md({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: A.empty, children: e.empty ?? "No matches" });
}
function Va({ entries: e, footer: t, align: a = "start", find: r, edges: o, size: i = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = Rd(), h = f(null);
  qa(u, h, a, o);
  const w = Ad(e, r), _ = od(w.entries), N = wd(_.flatMap(ld).map((H) => H.item)), k = fd(N, s, w.toFind), E = vd(s);
  return pd(N, s), /* @__PURE__ */ l("div", { ref: h, className: Id(o, i), ...E, children: [
    w.find && /* @__PURE__ */ n(Ld, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: A.menu, ...k, children: _.map((H, me) => /* @__PURE__ */ n(Sd, { block: H, nav: N, popup: s }, me)) }),
    /* @__PURE__ */ n(Md, { find: w.find, count: N.items.length }),
    t && /* @__PURE__ */ n("p", { className: A.footer, children: t })
  ] });
}
function Bd(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function Ya(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !Bd(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const jd = (e, t) => e.reduce((a, r) => a + r + t, -t);
function Pd({ room: e, widths: t, more: a, gap: r }, o) {
  const i = t.map((d, u) => u);
  if (jd(t, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([o]);
  let c = t[o] + r + a;
  for (const d of i)
    if (d !== o) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Qt = (e) => Number.parseFloat(e) || 0, Vn = (e) => e.getBoundingClientRect().width;
function qd(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Qt(a.paddingInlineStart) - Qt(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), Vn),
    more: r ? Vn(r) : 0,
    gap: Qt(a.columnGap)
  };
}
function Hd(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const Od = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function Ja(e, t, a, r = ':scope > [role="tab"]') {
  const [o, i] = p(null);
  return at(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = qd(s, r);
      i((u) => Od(u, d) ? u : d);
    };
    return c(), Hd(s, c);
  }, [e, a, r]), o && Pd(o, t);
}
const Fd = "_strip_1zvzj_2", Dd = "_fits_1zvzj_19", zd = "_probe_1zvzj_27", Wd = "_moreRoot_1zvzj_36", Kd = "_more_1zvzj_36", Gd = "_tab_1zvzj_55", Ud = "_count_1zvzj_91", Vd = "_badge_1zvzj_97", Y = {
  strip: Fd,
  fits: Dd,
  probe: zd,
  moreRoot: Wd,
  more: Kd,
  tab: Gd,
  count: Ud,
  badge: Vd
}, Qa = "More";
function Yd(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const Yn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, kn = (e) => e.badge === void 0 ? Yn(e) : `${Yn(e)}, ${e.badge}`;
function Xa(e) {
  return `${Y.strip} ward-tabs ward-tabs--${e}`;
}
const Jd = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Qd({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ l(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${Y.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : kn(e),
      onClick: () => r(e.id),
      ...a,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ l(x, { children: [
          " ",
          /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
        ] }),
        e.badge === void 0 ? null : /* @__PURE__ */ n("span", { className: Y.badge, children: e.badge })
      ]
    }
  );
}
function Xd(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((i) => i.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Zd({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(Ka, { label: Qa, className: Y.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: Y.more }, children: /* @__PURE__ */ n(Va, { align: "end", entries: e.map((r) => ({ label: kn(r), onSelect: () => a(r.id) })) }) });
}
function eu(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : Jd;
}
function ox({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: o }) {
  const i = Ft({ orientation: "horizontal" }), s = Yd(e, t);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = f(null);
  Ya(c, o);
  const d = Ja(c, s, e.map(kn).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ l("div", { ref: c, className: `${Xa(o)} ${Y.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(Qd, { tab: h, active: t, place: eu(i, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${A.trigger} ${Y.more} ${Y.probe}`, children: Qa }),
    u.length > 0 && /* @__PURE__ */ n(Zd, { tabs: u, trigger: i.itemProps(e.length), onPick: Xd(c, a) })
  ] });
}
const Jn = 7, Za = "More", tu = ":scope > a", er = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, nu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function au(e, t) {
  return !e || e.includes(t) ? {} : nu;
}
function ru({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, className: `${Y.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ l(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
    ] })
  ] });
}
function ou({ links: e }) {
  return /* @__PURE__ */ n(Ka, { label: Za, className: Y.moreRoot, trigger: { className: Y.more }, children: /* @__PURE__ */ n(Va, { align: "end", entries: e.map((t) => ({ label: er(t), href: t.href })) }) });
}
function lx({ links: e, active: t, label: a, level: r }) {
  if (e.length > Jn) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${Jn} — the set is fixed`);
  const o = f(null);
  Ya(o, r);
  const i = Math.max(0, e.findIndex((d) => d.id === t)), s = Ja(o, i, e.map(er).join(`
`), tu), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ l("nav", { ref: o, className: `${Xa(r)} ${Y.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(ru, { link: d, current: d.id === t, place: au(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${A.trigger} ${Y.more} ${Y.probe}`, children: Za }),
    c.length > 0 && /* @__PURE__ */ n(ou, { links: c })
  ] });
}
const lu = "_root_v56ff_3", iu = "_segment_v56ff_9", Qn = {
  root: lu,
  segment: iu
};
function tr({ options: e, value: t, onChange: a, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Ft({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${Qn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: Qn.segment,
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
const su = "_sidebar_s9o1j_3", cu = "_brand_s9o1j_9", du = "_mark_s9o1j_17", uu = "_word_s9o1j_24", hu = "_nav_s9o1j_30", mu = "_navItem_s9o1j_39", wu = "_footLink_s9o1j_49", _u = "_group_s9o1j_58", fu = "_groupName_s9o1j_65", vu = "_agents_s9o1j_81", bu = "_agent_s9o1j_81", pu = "_root_s9o1j_96", gu = "_agentTop_s9o1j_105", yu = "_dot_s9o1j_112", Nu = "_agentName_s9o1j_124", ku = "_agentMeta_s9o1j_138", $u = "_foot_s9o1j_49", Cu = "_footName_s9o1j_150", Su = "_footLinks_s9o1j_157", Ru = "_linkBrand_s9o1j_184", Tu = "_label_s9o1j_205", xu = "_note_s9o1j_210", Lu = "_footer_s9o1j_226", I = {
  sidebar: su,
  brand: cu,
  mark: du,
  word: uu,
  nav: hu,
  navItem: mu,
  new: "_new_s9o1j_48",
  footLink: wu,
  group: _u,
  groupName: fu,
  agents: vu,
  agent: bu,
  root: pu,
  agentTop: gu,
  dot: yu,
  agentName: Nu,
  agentMeta: ku,
  foot: $u,
  footName: Cu,
  footLinks: Su,
  linkBrand: Ru,
  label: Tu,
  note: xu,
  footer: Lu
};
function Au({ agent: e }) {
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
              style: { "--dot": vn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: I.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: I.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Eu({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: I.foot, children: [
    /* @__PURE__ */ n("span", { className: I.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: I.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${I.footLink} ward-target`, href: L(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function Iu({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: o, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: I.agents, children: r.map((s) => /* @__PURE__ */ n(Au, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(Eu, { shared: i })
  ] });
}
function Mu(e) {
  return e.destinations ?? e.items ?? [];
}
function Bu({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.linkBrand, children: e });
}
function ju({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.footer, children: e });
}
function Pu({ link: e, active: t }) {
  return /* @__PURE__ */ l("a", { href: L(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: I.note, children: e.note })
  ] });
}
function qu(e) {
  return /* @__PURE__ */ l("aside", { className: `${I.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Bu, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Mu(e).map((t) => /* @__PURE__ */ n(Pu, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(ju, { children: e.children })
  ] });
}
function Hu(e) {
  return "agents" in e;
}
function ix(e) {
  return Hu(e) ? /* @__PURE__ */ n(Iu, { ...e }) : /* @__PURE__ */ n(qu, { ...e });
}
const Ou = "_mark_wlgi8_3", Fu = {
  mark: Ou
}, Du = { met: "✓", unmet: "", failed: "✕" };
function $n({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Fu.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: Du[e]
    }
  );
}
const zu = "_avatar_1t33a_3", Wu = {
  avatar: zu
};
function Mt(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function Ku(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [Mt(e), ...[...t.slice(1)].map((r) => a + r)];
}
function Gu(e, t) {
  const a = Ku(e).find((o) => !t.has(o));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(Mt(e).charAt(0) + String(r)); ) r += 1;
  return Mt(e).charAt(0) + String(r);
}
function sx(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const o = Gu(r, t);
    t.add(o), a.set(r, o);
  }
  return a;
}
function Uu(e) {
  return e != null && _t(e) ? po(e) : void 0;
}
function cx({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: Wu.avatar, "data-size": a, "aria-hidden": "true", style: Uu(t), children: r ?? Mt(e) });
}
const Vu = "_marker_br9fi_2", Yu = {
  marker: Vu
}, Ju = {
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
}, Qu = { running: " ward-running" };
function ze({ size: e, kind: t, label: a }) {
  const r = { "--marker": Ju[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Yu.marker} ward-marker ward-marker--${t}${Qu[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const Xu = "_root_ti0pq_2", Zu = "_chip_ti0pq_11", eh = "_noCase_ti0pq_23", gt = {
  root: Xu,
  chip: Zu,
  noCase: eh
};
function th(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Cn({ connection: e, since: t, lastEventAt: a }) {
  const r = th(t, a), o = bn(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${gt.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(ze, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${gt.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: gt.noCase, children: fn(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${gt.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    he(r)
  ] });
}
const nh = "_root_yylks_2", ah = "_context_yylks_13", rh = "_row_yylks_1", oh = "_heading_yylks_27", lh = "_headingWrap_yylks_35", ih = "_meta_yylks_41", sh = "_chips_yylks_49", ch = "_title_yylks_56", dh = "_consequence_yylks_66", uh = "_actionsWrap_yylks_73", hh = "_actions_yylks_73", mh = "_action_yylks_73", wh = "_overflowPanel_yylks_102", _h = "_measureClip_yylks_113", fh = "_measure_yylks_113", U = {
  root: nh,
  context: ah,
  row: rh,
  heading: oh,
  headingWrap: lh,
  meta: ih,
  chips: sh,
  title: ch,
  consequence: dh,
  actionsWrap: uh,
  actions: hh,
  action: mh,
  overflowPanel: wh,
  measureClip: _h,
  measure: fh
};
function vh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(rt, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function bh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function ph({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function gh({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ l("div", { className: U.meta, children: [
    /* @__PURE__ */ n(bh, { chips: e }),
    /* @__PURE__ */ n(ph, { consequence: t, consequenceHint: a })
  ] });
}
function yh({ title: e, chips: t, consequence: a, consequenceHint: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: U.heading, children: [
    /* @__PURE__ */ n(vh, { title: e, density: o }),
    /* @__PURE__ */ n(gh, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function dn({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function Xn({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Nh({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: o }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(Xn, { disclosure: o }) : t ? [/* @__PURE__ */ n(Xn, { disclosure: o }, "more"), /* @__PURE__ */ n(dn, { actions: e }, "actions")] : /* @__PURE__ */ n(dn, { actions: e });
}
function kh(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function $h({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(dn, { actions: e }) });
}
function Ch(e, t) {
  const a = y(), [r, o] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: a, toggle: () => o(!i) }, close: () => {
    var d, u;
    o(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const Sh = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function Rh(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && Sh(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function Th({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(qs, { path: e.path, current: e.current }) });
}
function xh(...e) {
  return e.some((t) => t === null);
}
function Lh(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Ah(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + Lh(e);
}
function Eh(e, t, a, r, o) {
  if (o === 0 || xh(t, a, r)) return !1;
  const [i, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - Ah(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Ih(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Mh(e) {
  return Xr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Bh(e, t) {
  return t.length === 0 && e.length === 1 && Mh(e[0]);
}
function jh(e, t) {
  const a = f(null), r = f(null), o = f(null), i = f(null), [s, c] = p(!1);
  return S(() => {
    const d = a.current;
    if (!Ih(d)) return;
    const u = () => c(Eh(d, r.current, o.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: o, measureRef: i, collapsed: s && !t };
}
function Ph({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ l("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] }) });
}
function qh({ connection: e }) {
  return e ? /* @__PURE__ */ n(Cn, { connection: e.connection, since: e.since }) : null;
}
function dx({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: o, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: _, actionsRef: N, measureRef: k, collapsed: E } = jh(s, Bh(s, c)), H = c.length > 0, { disclosure: me, close: re } = Ch(E || H, N), Ie = kh(c, s, E, u);
  return /* @__PURE__ */ l("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(Th, { crumb: Rh(e, r, t) }),
    /* @__PURE__ */ l("div", { className: U.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: _, className: U.headingWrap, children: /* @__PURE__ */ n(yh, { title: r, chips: a, consequence: o, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ l("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(qh, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ n(Nh, { actions: s, hasMore: H, collapsed: E, onOverflow: u, disclosure: me }) })
      ] })
    ] }),
    /* @__PURE__ */ n($h, { actions: Ie, disclosure: me, onEscape: re }),
    /* @__PURE__ */ n(Ph, { actions: s, hasMore: H, measureRef: k })
  ] });
}
const Hh = "_root_td96x_2", Oh = "_body_td96x_16", Zn = {
  root: Hh,
  body: Oh
};
function ux({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${Zn.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: Zn.body, children: a }) });
}
const Fh = "_root_bf1pc_2", Dh = "_table_bf1pc_9", zh = "_caption_bf1pc_14", Wh = "_series_bf1pc_23", Kh = "_category_bf1pc_31", Gh = "_cell_bf1pc_39", Uh = "_track_bf1pc_45", Vh = "_lane_bf1pc_52", Yh = "_bar_bf1pc_56", Jh = "_value_bf1pc_63", Qh = "_swatch_bf1pc_70", Xh = "_empty_bf1pc_78", Z = {
  root: Fh,
  table: Dh,
  caption: zh,
  series: Wh,
  category: Kh,
  cell: Gh,
  track: Uh,
  lane: Vh,
  bar: Yh,
  value: Jh,
  swatch: Qh,
  empty: Xh
}, Zh = "—", ea = 6;
function em(e, t) {
  if (t.length < 1 || t.length > ea)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${ea}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function tm(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function nr(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function nm(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function am({ value: e, top: t, step: a, format: r, missing: o }) {
  const i = nm(e, t), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ l("span", { className: Z.track, children: [
    /* @__PURE__ */ n("span", { className: Z.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${Z.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Z.value, children: e === null ? o : r(e) })
  ] }) });
}
function rm({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ l("th", { scope: "col", className: Z.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Z.swatch, "data-step": nr(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function om({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ l("section", { className: `${Z.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Z.empty, children: t })
  ] });
}
function lm({ title: e, categories: t, series: a, top: r, format: o = ae, categoryHead: i = "Category", missing: s = Zh }) {
  return /* @__PURE__ */ n("div", { className: `${Z.root} ward-barchart`, children: /* @__PURE__ */ l("table", { className: Z.table, children: [
    /* @__PURE__ */ n("caption", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Z.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(rm, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Z.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(am, { value: u.values[d], top: r, step: nr(h, a.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function hx(e) {
  em(e.categories, e.series);
  const t = tm(e.series);
  return t === 0 ? /* @__PURE__ */ n(om, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(lm, { ...e, top: t });
}
const im = "_root_1bfqw_2", sm = "_figure_1bfqw_7", cm = "_of_1bfqw_13", dm = "_bar_1bfqw_18", um = "_rows_1bfqw_38", hm = "_row_1bfqw_38", mm = "_label_1bfqw_49", wm = "_amount_1bfqw_54", Me = {
  root: im,
  figure: sm,
  of: cm,
  bar: dm,
  rows: um,
  row: hm,
  label: mm,
  amount: wm
};
function _m({ spent: e, ceiling: t, breakdown: a }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ l("div", { className: `${Me.root} ward-costmeter`, children: [
    /* @__PURE__ */ l("p", { className: `${Me.figure} ward-stat-value`, children: [
      le(e),
      " ",
      /* @__PURE__ */ l("span", { className: Me.of, children: [
        "of ",
        le(t)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Me.bar} ward-costbar`,
        min: 0,
        max: t,
        value: e,
        "aria-valuetext": `${le(e)} of ${le(t)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    a && /* @__PURE__ */ n("ul", { className: Me.rows, children: a.map((o) => /* @__PURE__ */ l("li", { className: `${Me.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Me.label, children: o.label }),
      /* @__PURE__ */ n("span", { className: Me.amount, children: le(o.amount) })
    ] }, o.label)) })
  ] });
}
const fm = "_frame_f7bxz_2", vm = "_table_f7bxz_6", bm = "_th_f7bxz_12", pm = "_td_f7bxz_13", gm = "_sort_f7bxz_53", ym = "_row_f7bxz_65", Nm = "_empty_f7bxz_73", He = {
  frame: fm,
  table: vm,
  th: bm,
  td: pm,
  sort: gm,
  row: ym,
  empty: Nm
}, km = { asc: "ascending", desc: "descending" };
function $m(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return km[t.direction];
}
function Cm(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: He.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function Sm(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Rm({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: He.th,
      style: Sm(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": $m(e, t),
      children: Cm(e, a)
    }
  );
}
function Tm({ row: e, props: t }) {
  const a = t.rowId(e), r = (t.lockedIds ?? []).includes(a);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: He.row,
      "data-selected": a === t.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: t.columns.map((o) => /* @__PURE__ */ n(
        "td",
        {
          className: He.td,
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
function xm({
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
  return a.length === 0 ? /* @__PURE__ */ n("div", { className: He.empty, children: u }) : /* @__PURE__ */ n("div", { className: He.frame, "data-narrow": h, children: /* @__PURE__ */ l("table", { className: He.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: He.head, children: t.map((w) => /* @__PURE__ */ n(Rm, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(Tm, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: o, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const Lm = "_list_v0s52_2", Am = {
  list: Lm
};
function Em({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: Am.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const Im = "_label_1u62a_2", Mm = {
  label: Im
};
function mx({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: Mm.label, children: t.header }) }, t.key)) }) });
}
const Bm = "_stack_bp6a0_2", jm = {
  stack: Bm
};
function wx({ children: e }) {
  return /* @__PURE__ */ n("span", { className: jm.stack, "data-ward-action-stack": "", children: e });
}
const Pm = "_set_1z0sq_2", qm = "_legend_1z0sq_7", Hm = "_row_1z0sq_15", Om = "_control_1z0sq_20", Fm = "_input_1z0sq_26", Dm = "_label_1z0sq_31", zm = "_consequence_1z0sq_36", Ke = {
  set: Pm,
  legend: qm,
  row: Hm,
  control: Om,
  input: Fm,
  label: Dm,
  consequence: zm
};
function ar({ legend: e, options: t, value: a, onChange: r, disabled: o, name: i, describedBy: s, variant: c }) {
  const d = y(), u = i ?? d;
  return /* @__PURE__ */ l("fieldset", { className: Ke.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: Ke.legend, children: e }),
    t.map((h) => {
      const w = `${u}-${h.value}`, _ = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ l("div", { className: Ke.row, children: [
        /* @__PURE__ */ l("span", { className: Ke.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: Ke.input,
              value: h.value,
              checked: a === h.value,
              disabled: o,
              "aria-describedby": ot(_, s),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: w, className: Ke.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: _, className: `${Ke.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Wm = "_root_11gpw_2", Km = "_head_11gpw_10", Gm = "_note_11gpw_29", Um = "_index_11gpw_34", Vm = "_dot_11gpw_38", Ym = "_counter_11gpw_49", Jm = "_trailing_11gpw_57", Ge = {
  root: Wm,
  head: Km,
  note: Gm,
  index: Um,
  dot: Vm,
  counter: Ym,
  trailing: Jm
};
function Qm({ index: e }) {
  return e ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ge.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ge.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Xm({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ge.counter, "aria-hidden": "true", children: e }) : null;
}
function ta({ title: e, index: t, note: a, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Ge.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Ge.head, children: [
      /* @__PURE__ */ n(Qm, { index: t }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ge.note, children: a }),
    /* @__PURE__ */ n(Xm, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ge.trailing, children: i })
  ] });
}
const Zm = "_strip_c3x3u_2", ew = "_cell_c3x3u_7", tw = "_value_c3x3u_12", nw = "_link_c3x3u_29", aw = "_label_c3x3u_49", rw = "_tiles_c3x3u_101", De = {
  strip: Zm,
  cell: ew,
  value: tw,
  link: nw,
  label: aw,
  tiles: rw
};
function rr(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((o) => o.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const or = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function ow({ cell: e }) {
  return /* @__PURE__ */ l("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: or(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function lw({ cell: e, href: t }) {
  return /* @__PURE__ */ l("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: or(e), title: e.hint, children: /* @__PURE__ */ l("a", { className: `${De.link} ward-stat-link`, href: L(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const lr = (e) => e.href === void 0 ? /* @__PURE__ */ n(ow, { cell: e }, e.label) : /* @__PURE__ */ n(lw, { cell: e, href: e.href }, e.label);
function Kt({ cells: e, divided: t = !1 }) {
  return rr("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${De.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(lr) });
}
const na = 6;
function _x({ cells: e }) {
  rr("StatTiles", e, [1, 2 * na]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, na) };
  return /* @__PURE__ */ n("dl", { className: `${De.tiles} ward-stattiles`, style: t, children: e.map(lr) });
}
const iw = "_root_1eb1u_2", sw = "_track_1eb1u_8", cw = "_thumb_1eb1u_46", dw = "_labelHidden_1eb1u_64", uw = "_label_1eb1u_64", hw = "_lockedNote_1eb1u_84", Ue = {
  root: iw,
  track: sw,
  thumb: cw,
  labelHidden: dw,
  label: uw,
  lockedNote: hw
};
function mw(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function ww(e) {
  return e ? `${Ue.label} ${Ue.labelHidden}` : Ue.label;
}
function _w(e, t, a) {
  return e && !t && a ? a : void 0;
}
function fw(e, t, a, r) {
  return { "aria-describedby": zt(ot(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function vw({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ye({ label: e, checked: t, onChange: a, disabled: r, locked: o, describedBy: i, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, w = Ee(), { on: _, off: N } = mw(t, r, o, w !== null), k = _w(N, w !== null, c);
  return /* @__PURE__ */ l("span", { className: `${Ue.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": _,
        "aria-label": e,
        "aria-labelledby": d,
        ...fw(h, i, w, k),
        className: `${Ue.track} ward-switch`,
        "data-on": _,
        "data-locked": o ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!_)),
        children: /* @__PURE__ */ n("span", { className: Ue.thumb })
      }
    ),
    /* @__PURE__ */ l("label", { id: d, htmlFor: u, className: ww(s), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ue.lockedNote, children: "always on" })
    ] }),
    /* @__PURE__ */ n(vw, { id: h, reason: k })
  ] });
}
const bw = "_bar_1vp69_2", pw = "_skip_1vp69_11", gw = "_mark_1vp69_22", yw = "_nav_1vp69_30", Nw = "_list_1vp69_34", kw = "_select_1vp69_41", $w = "_selectTrigger_1vp69_45", Cw = "_dest_1vp69_52", Sw = "_actor_1vp69_71", Rw = "_actorMark_1vp69_84", Tw = "_actorLabel_1vp69_89", xw = "_tagline_1vp69_108", se = {
  bar: bw,
  skip: pw,
  mark: gw,
  nav: yw,
  list: Nw,
  select: kw,
  selectTrigger: $w,
  dest: Cw,
  actor: Sw,
  actorMark: Rw,
  actorLabel: Tw,
  tagline: xw
};
function Lw(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function Aw(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function fx({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: o, onNavigate: i, skipTo: s = "main" }) {
  const c = Aw(r);
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
        Da,
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
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: Lw(c) })
    ] })
  ] });
}
const Ew = "_tree_zzoob_2", Iw = "_item_zzoob_6", Mw = "_row_zzoob_10", Bw = "_button_zzoob_22", Bt = {
  tree: Ew,
  item: Iw,
  row: Mw,
  button: Bw
}, ir = Ne(null);
function jw({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Ft({ orientation: "vertical" });
  return /* @__PURE__ */ n(ir.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: Bt.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const Pw = { ArrowRight: !0, ArrowLeft: !1 };
function aa(e) {
  return e ? !0 : void 0;
}
function qw(e, t) {
  const a = Pw[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function Hw(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function Ow(e) {
  const t = [Bt.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function Fw(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Dw(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function zw(e) {
  return typeof e == "string" ? e : void 0;
}
function Ww({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Kw({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function sr(e) {
  const t = ye(ir);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = Fw(e);
  return /* @__PURE__ */ l("li", { className: Bt.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Ow(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": aa(e.unresolved),
        "data-inherited": aa(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${Bt.button} ward-treeitem-btn`,
            onClick: () => Hw(e),
            onKeyDown: (r) => qw(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Dw(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: zw(e.label), children: e.label }),
              /* @__PURE__ */ n(Ww, { value: e.detail }),
              /* @__PURE__ */ n(Kw, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Gw = "_frame_gxspk_2", Uw = "_subjectRail_gxspk_22", Vw = "_subject_gxspk_22", Yw = "_rail_gxspk_42", Jw = "_record_gxspk_57", Qw = "_recordBody_gxspk_102", Xw = "_stageGrid_gxspk_157", Zw = "_band_gxspk_171", e_ = "_bandBody_gxspk_179", t_ = "_bandActions_gxspk_184", n_ = "_scroller_gxspk_192", a_ = "_board_gxspk_219", r_ = "_lanes_gxspk_228", o_ = "_cardGrid_gxspk_262", ee = {
  frame: Gw,
  subjectRail: Uw,
  subject: Vw,
  rail: Yw,
  record: Jw,
  recordBody: Qw,
  stageGrid: Xw,
  band: Zw,
  bandBody: e_,
  bandActions: t_,
  scroller: n_,
  board: a_,
  lanes: r_,
  cardGrid: o_
};
function vx({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: ee.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function ra(e) {
  return e ? "true" : void 0;
}
function bx({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: ee.subjectRail, "data-ward-subject-rail": a, "data-ruled": ra(i), children: [
    /* @__PURE__ */ n("div", { className: ee.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ee.rail, "data-sticky": ra(o), "aria-label": r, children: t })
  ] });
}
function px({ title: e, children: t, note: a, trailing: r, pad: o = "block", label: i, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(ta, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ l("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(ta, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: ee.recordBody, "data-pad": o, "data-measure": c, children: t })
  ] });
}
const l_ = "_form_1j8ub_2", i_ = "_fields_1j8ub_9", s_ = "_actions_1j8ub_19", Xt = {
  form: l_,
  fields: i_,
  actions: s_
};
function gx({ label: e, children: t, actions: a, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: Xt.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Xt.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: Xt.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function yx({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ l("section", { className: ee.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ee.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: ee.bandActions, children: t })
  ] });
}
const c_ = "(max-width: 767.98px)";
function Sn({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(gn, { className: ee.scroller, label: e, count: a ?? Zr.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function d_({ lanes: e, label: t, laneLabel: a }) {
  const [r, o] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ l("div", { className: ee.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(q, { kind: "select", label: a, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ n(Sn, { label: t, children: i == null ? void 0 : i.content })
  ] });
}
function u_({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: ee.board, "data-ward-board": "", children: /* @__PURE__ */ n(Sn, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(ya, { children: a.content }, a.id)) }) });
}
function Nx({ children: e, label: t = "Workflow board", lanes: a, laneLabel: r = "Column" }) {
  const o = mt(c_);
  return a === void 0 ? /* @__PURE__ */ n(Sn, { label: t, children: e }) : o ? /* @__PURE__ */ n(d_, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(u_, { lanes: a, label: t });
}
function kx({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), i = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ n(gn, { className: ee.stageGrid, label: a, count: o, "data-ward-stage-grid": "", "data-floor": r, style: i, children: t });
}
function $x({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${ee.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const h_ = "_block_6tv5x_3", m_ = "_sentence_6tv5x_10", w_ = "_meta_6tv5x_19", __ = "_ways_6tv5x_24", f_ = "_action_6tv5x_38", v_ = "_strip_6tv5x_42", b_ = "_loading_6tv5x_61", p_ = "_label_6tv5x_69", g_ = "_counter_6tv5x_76", fe = {
  block: h_,
  sentence: m_,
  meta: w_,
  ways: __,
  action: f_,
  strip: v_,
  loading: b_,
  label: p_,
  counter: g_
};
function y_({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: fe.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function Gt({ sentence: e, action: t, children: a, role: r = "status", tone: o, kind: i, ask: s }) {
  return /* @__PURE__ */ l("div", { className: `${fe.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ l("p", { className: fe.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ l(x, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(y_, { action: t })
  ] });
}
function N_(e) {
  return /* @__PURE__ */ n(Gt, { ...e, kind: "ward-emptystate" });
}
function Cx({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(Gt, { sentence: e, action: a, children: /* @__PURE__ */ l("p", { className: fe.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function k_({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${fe.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function Sx({ ways: e, ...t }) {
  return /* @__PURE__ */ n(Gt, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(k_, { ways: e }) });
}
function Rx({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(Gt, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ l("p", { className: fe.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function Tx({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ l("div", { className: fe.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function xx({ queued: e, since: t }) {
  return /* @__PURE__ */ l("div", { className: fe.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function Lx({ label: e, startedAt: t }) {
  const a = f(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = p(!1);
  S(() => {
    const s = window.setTimeout(() => o(!0), be.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = bn(a.current, r);
  return /* @__PURE__ */ l("div", { className: `${fe.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: fe.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: fe.counter, children: fn(i) }) : null
  ] });
}
const $_ = "_note_cigdt_2", C_ = {
  note: $_
};
function S_({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ l("p", { className: C_.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const R_ = "_card_k7btg_3", T_ = "_hit_k7btg_31", x_ = "_head_k7btg_44", L_ = "_title_k7btg_51", A_ = "_meta_k7btg_57", E_ = "_since_k7btg_66", I_ = "_sep_k7btg_76", M_ = "_fields_k7btg_80", B_ = "_field_k7btg_80", j_ = "_last_k7btg_98", P_ = "_reason_k7btg_110", de = {
  card: R_,
  hit: T_,
  head: x_,
  title: L_,
  meta: A_,
  since: E_,
  sep: I_,
  fields: M_,
  field: B_,
  last: j_,
  reason: P_
}, q_ = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function H_(e, t, a) {
  const r = Rt(e, "blue"), o = Rt(e, "orange"), i = Rt(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: o, green: i };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = q_[d.type];
      u && c[u]();
    });
  }, [r, a, i, t, o]);
}
const O_ = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function F_(e, t) {
  return O_[t](e);
}
function D_({ item: e, connection: t }) {
  const a = /* @__PURE__ */ n("span", { className: de.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ l("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    a,
    /* @__PURE__ */ n(Ae, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep })
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
function z_({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ l("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function W_({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function K_({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: de.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: de.field, children: F_(e, a) }, a)) });
}
const un = (e) => e ? !0 : void 0;
function G_(e) {
  return { "--stream": ge(e.streamStep, "id") };
}
function U_(e, t, a) {
  e == null || e(t, a);
}
function V_(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Y_({ item: e, stale: t }) {
  var r, o;
  const a = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: de.last, "data-stale": un(t), children: a }) : null;
}
function Ut(e) {
  const t = e.fields ?? [], a = e.item, r = f(null);
  H_(r, a.key, e.feed);
  const o = V_(e.feed), i = G_(a);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: de.card,
      style: i,
      "data-selected": un(e.selected),
      "data-flagged": un(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: de.hit, onClick: (s) => U_(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(z_, { item: a }),
        /* @__PURE__ */ n(rt, { as: "p", className: de.title, text: a.title }),
        /* @__PURE__ */ n(D_, { item: a, connection: o }),
        /* @__PURE__ */ n(W_, { reason: a.blockedReason }),
        /* @__PURE__ */ n(K_, { item: a, fields: t }),
        /* @__PURE__ */ n(Y_, { item: a, stale: o === "stale" })
      ]
    }
  );
}
const J_ = "_column_1j8bi_3", Q_ = "_head_1j8bi_21", X_ = "_label_1j8bi_30", Z_ = "_count_1j8bi_39", ef = "_list_1j8bi_53", ut = {
  column: J_,
  head: Q_,
  label: X_,
  count: Z_,
  list: ef
};
function cr(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function tf({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ l("div", { className: ut.head, children: [
    /* @__PURE__ */ n("h2", { className: ut.label, id: a, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ l("span", { className: ut.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function nf(e) {
  return /* @__PURE__ */ n("div", { className: ut.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      Ut,
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
function af({ column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && t.length > e.cap, w = cr(t, r);
  return /* @__PURE__ */ l("section", { className: ut.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(tf, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(nf, { column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n(S_, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const rf = "_foot_cs4jr_2", of = "_note_cs4jr_13", lf = "_link_cs4jr_19", Zt = {
  foot: rf,
  note: of,
  link: lf
};
function Ax({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: Zt.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Zt.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Zt.link} ward-target`, href: L(e), children: "Configure board" })
  ] });
}
const sf = "_head_1tfi5_3", cf = "_identity_1tfi5_12", df = "_titleRow_1tfi5_18", uf = "_title_1tfi5_18", hf = "_key_1tfi5_35", mf = "_rollup_1tfi5_45", wf = "_tools_1tfi5_53", _f = "_swatch_1tfi5_101", ff = "_mark_1tfi5_108", Se = {
  head: sf,
  identity: cf,
  titleRow: df,
  title: uf,
  key: hf,
  rollup: mf,
  tools: wf,
  swatch: _f,
  mark: ff
}, oa = "initials:";
function vf(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function bf(e) {
  const t = [vf(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function pf(e) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ l("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    bf(e)
  ] });
}
function gf(e) {
  return e.startsWith(oa) ? e.slice(oa.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function yf({ markRef: e, streamStep: t }) {
  const a = { "--stream": ge(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Se.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: gf(e) }) : /* @__PURE__ */ n("span", { className: Se.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Nf({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function Ex({
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
  return /* @__PURE__ */ l("div", { className: Se.head, children: [
    /* @__PURE__ */ l("div", { className: Se.identity, children: [
      /* @__PURE__ */ l("div", { className: Se.titleRow, children: [
        /* @__PURE__ */ n(yf, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Se.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Se.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Se.rollup, "aria-live": "polite", children: pf(t) })
    ] }),
    /* @__PURE__ */ l("div", { className: Se.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Nf, { owners: o, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Cn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const kf = "_head_1sejb_14", $f = "_line_1sejb_15", Cf = "_cHandle_1sejb_36", Sf = "_cName_1sejb_41", Rf = "_nameLine_1sejb_49", Tf = "_cLabel_1sejb_56", xf = "_cCap_1sejb_61", Lf = "_cShown_1sejb_66", Af = "_name_1sejb_49", Ef = "_noCap_1sejb_88", If = "_state_1sejb_102", Mf = "_handle_1sejb_111", Bf = "_sub_1sejb_137", O = {
  head: kf,
  line: $f,
  cHandle: Cf,
  cName: Sf,
  nameLine: Rf,
  cLabel: Tf,
  cCap: xf,
  cShown: Lf,
  name: Af,
  noCap: Ef,
  state: If,
  handle: Mf,
  sub: Bf
}, jf = "can't be hidden or collapsed", Pf = "terminal · counted, not a column", qf = "A human gate is always shown, so people see what waits for them.", Hf = "A terminal stage is counted, not shown as a column.";
function Ix() {
  return /* @__PURE__ */ l("div", { className: O.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: O.cHandle }),
    /* @__PURE__ */ n("span", { className: O.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: O.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: O.cShown, children: "Shown" })
  ] });
}
function Of(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function Ff(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function la(e) {
  return e.gate ? jf : e.terminal ? Pf : Ff(e.agentsMounted);
}
function Df(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function zf({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: O.cName, children: [
    /* @__PURE__ */ l("span", { className: O.nameLine, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    la(e) && /* @__PURE__ */ n("span", { className: O.sub, children: la(e) })
  ] });
}
function Wf(e) {
  return e === void 0 ? "" : String(e);
}
function Kf(e) {
  return e === "" ? void 0 : Number(e);
}
function Gf({ name: e, onReorder: t }) {
  const a = Ee();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ n("span", { className: O.cHandle }) : /* @__PURE__ */ n("span", { className: O.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: O.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && Df(r, t),
      children: "⠿"
    }
  ) });
}
function Uf({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${O.cCap} ${O.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: O.cCap, children: /* @__PURE__ */ n(q, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Wf(t.cap), onChange: (r) => a({ ...t, cap: Kf(r) }) }) });
}
function Vf(e) {
  return e.gate ? qf : e.terminal ? Hf : void 0;
}
function Yf({ stage: e, config: t, onChange: a }) {
  const r = Ee() !== null, o = Of(e, t.shown), i = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ l("span", { className: O.cShown, children: [
    /* @__PURE__ */ n(Ye, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, disabledReason: Vf(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: O.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!o.shown), children: o.state })
  ] });
}
function Jf(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function Mx({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: O.line, "data-kind": Jf(e), children: [
    /* @__PURE__ */ n(Gf, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(zf, { stage: e }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: /* @__PURE__ */ n(q, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (o) => a({ ...t, label: o }) }) }),
    /* @__PURE__ */ n(Uf, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(Yf, { stage: e, config: t, onChange: a })
  ] });
}
const Qf = "_body_8qsv9_2", Xf = "_head_8qsv9_9", Zf = "_summary_8qsv9_19", ev = "_block_8qsv9_20", tv = "_actionsBlock_8qsv9_21", nv = "_title_8qsv9_41", av = "_note_8qsv9_46", rv = "_k_8qsv9_51", ov = "_kv_8qsv9_58", lv = "_row_8qsv9_64", iv = "_label_8qsv9_75", sv = "_value_8qsv9_84", cv = "_quote_8qsv9_90", dv = "_actions_8qsv9_21", uv = "_resolve_8qsv9_111", D = {
  body: Qf,
  head: Xf,
  summary: Zf,
  block: ev,
  actionsBlock: tv,
  title: nv,
  note: av,
  k: rv,
  kv: ov,
  row: lv,
  label: iv,
  value: sv,
  quote: cv,
  actions: dv,
  resolve: uv
};
function hv(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function mv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Ae, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function wv(e) {
  const t = vt(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function _v(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function fv(e, t, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Wt(wv(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...hv(e),
    ..._v(a),
    ...mv(e, t)
  ];
}
function vv({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: D.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: D.k, children: t }),
    e
  ] });
}
function bv(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function pv({ item: e, showKey: t }) {
  const a = bv(e);
  return !t && !a ? null : /* @__PURE__ */ l("div", { className: D.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function gv({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: D.block, children: [
    /* @__PURE__ */ n("p", { className: D.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: D.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: D.note, children: e.agentMeta })
  ] }) : null;
}
function Bx({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: o, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), w = fv(e, o, d);
  return /* @__PURE__ */ n(lt, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: D.body, children: [
    /* @__PURE__ */ n(pv, { item: e, showKey: u }),
    /* @__PURE__ */ l("div", { className: D.summary, children: [
      /* @__PURE__ */ n("h2", { className: D.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: D.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: D.kv, children: w.map(([_, N, k]) => /* @__PURE__ */ l("div", { className: D.row, children: [
      /* @__PURE__ */ n("dt", { className: D.label, children: _ }),
      /* @__PURE__ */ n("dd", { className: D.value, children: N })
    ] }, k ?? _)) }),
    /* @__PURE__ */ n(gv, { item: e }),
    /* @__PURE__ */ l("div", { className: D.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: D.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: D.note, children: c })
    ] }),
    /* @__PURE__ */ n(vv, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const yv = "_root_3azmy_2", Nv = "_list_3azmy_7", kv = "_item_3azmy_12", $v = "_box_3azmy_18", Cv = "_text_3azmy_23", Sv = "_note_3azmy_28", Qe = {
  root: yv,
  list: Nv,
  item: kv,
  box: $v,
  text: Cv,
  note: Sv
};
function Vt({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ l("div", { className: Qe.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${Qe.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Qe.box, children: /* @__PURE__ */ n($n, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Qe.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${Qe.note} ward-checklist-note`, children: t })
  ] });
}
const Rv = "_rail_znbbp_2", Tv = "_k_znbbp_11", xv = "_head_znbbp_19", Lv = "_section_znbbp_25", Av = "_card_znbbp_39", Ev = "_strip_znbbp_46", Iv = "_skeleton_znbbp_60", Mv = "_skeletonLabel_znbbp_74", Bv = "_bar_znbbp_80", jv = "_note_znbbp_89", _e = {
  rail: Rv,
  k: Tv,
  head: xv,
  section: Lv,
  card: Av,
  strip: Ev,
  skeleton: Iv,
  skeletonLabel: Mv,
  bar: Bv,
  note: jv
};
function Pv(e) {
  return (t) => e == null ? void 0 : e(t);
}
function en({ title: e, children: t }) {
  return /* @__PURE__ */ l("section", { className: _e.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: _e.k, children: e }),
    t
  ] });
}
function qv({ column: e, count: t }) {
  return /* @__PURE__ */ l("div", { className: _e.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: _e.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: _e.bar, "aria-hidden": "true" }, r))
  ] });
}
function Hv({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(af, { column: o, items: t.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, o.id));
}
function Ov(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Hv, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(qv, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function jx(e) {
  const t = Pv(e.onOpen), a = cr(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: _e.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${_e.k} ${_e.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(en, { title: "Card", children: /* @__PURE__ */ n("div", { className: _e.card, children: a && /* @__PURE__ */ n(Ut, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ l(en, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: _e.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Ov, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: _e.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(en, { title: "Effect of this config", children: /* @__PURE__ */ n(Vt, { items: e.effects, density: "compact" }) })
  ] });
}
function Fv(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function Dv(e) {
  return Math.ceil(e.length / 2);
}
function zv(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function dr(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Wv(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const o = dr(e);
  o !== void 0 && a(o), r(zv(e.type));
}
function Kv(e, t, a, r, o) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (i) => Wv(i, a, r, o));
  }, [e, t, a, r, o]);
}
function Gv(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Uv(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Vv(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Yv(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(Dv(t ?? [])) + ")"
  };
}
function Jv(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Qv(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: le(e.cost) }) : null;
}
function Xv(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Zv(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Ae, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function eb(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function tb(e, t) {
  return t === void 0 ? e : Fv(e, t.ref);
}
function nb(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function wt(e) {
  return e === !0 ? "true" : void 0;
}
function ur(e) {
  const t = e.item, a = t.run, r = a !== void 0, o = f(null), i = Rt(o), s = f(/* @__PURE__ */ new Set()), [c, d] = p(Gv(t));
  Kv(e.feed, t.key, s, d, i);
  const u = Uv(t, r), h = Vv(t, a), w = Yv(t, e.fields), _ = eb(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...nb(e),
      className: "ward-workcard",
      "data-flagged": wt(t.flagged),
      "data-selected": wt(e.selected),
      style: w,
      ref: tb(o, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        Jv(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          Qv(t, e.fields),
          Xv(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          Zv(a, c, e.connection, t.changedAt),
          _ !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: _, children: _ }) : null
        ] })
      ]
    }
  ) });
}
function ab({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function rb(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function ob(e, t, a) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function lb(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(ab, { count: e.items.length, cap: e.column.cap });
}
function ib(e, t) {
  return e.roving ?? t;
}
function sb(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function cb(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    ur,
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
function db(e) {
  const t = y(), a = Ft({ orientation: "vertical" }), r = ib(e, a), o = rb(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": wt(o), "data-gate": wt(e.column.gate), children: [
    ob(e.column, e.items.length, t),
    lb(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...sb(e, a), children: cb(e, r) })
  ] });
}
function ub(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function hb(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function mb(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function Px(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: ub(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      hb(e),
      mb(e.onConfigure),
      /* @__PURE__ */ n(Cn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function wb(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function _b(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ye, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ye, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function fb(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(x, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function qx(e) {
  const t = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": wt(wb(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: _b(e) }),
    /* @__PURE__ */ n(q, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(Ma, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    fb(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function Hx(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(ur, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(db, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function vb(e, t) {
  const a = dr(e);
  a !== void 0 && t(a);
}
function bb(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => vb(r, a));
  }, [e, t, a]);
}
function pb(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function gb(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function yb(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Ae, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Nb(e, t) {
  return /* @__PURE__ */ l(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function Ox(e) {
  var s;
  const t = e.item, a = t.run, [r, o] = p((s = t.run) == null ? void 0 : s.lastStep);
  bb(e.feed, t.key, o);
  const i = [...pb(t), ...gb(t)];
  return /* @__PURE__ */ l(lt, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      yb(a, r)
    ] }),
    Nb(t, e.actions)
  ] });
}
const kb = "_card_1nkkx_3", $b = "_head_1nkkx_30", Cb = "_mark_1nkkx_38", Sb = "_name_1nkkx_50", Rb = "_chips_1nkkx_71", Tb = "_description_1nkkx_77", xb = "_run_1nkkx_82", Lb = "_sep_1nkkx_91", Ab = "_facts_1nkkx_97", Eb = "_fact_1nkkx_97", Ib = "_factLabel_1nkkx_111", Mb = "_factValue_1nkkx_115", ie = {
  card: kb,
  head: $b,
  mark: Cb,
  name: Sb,
  chips: Rb,
  description: Tb,
  run: xb,
  sep: Lb,
  facts: Ab,
  fact: Eb,
  factLabel: Ib,
  factValue: Mb
}, Bb = { live: "done", draft: "running", paused: "meta" };
function jb(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function Pb({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: Bb[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function qb({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function Hb({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Ae, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function Ob({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ l("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function Fb(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Db({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: o, facts: i, className: s }) {
  const c = { "--stream": ge(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": d,
      className: jb(s),
      style: c,
      "data-selected": d,
      "data-paused": Fb(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ l("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: L(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(qb, { description: e.description }),
        /* @__PURE__ */ n(Hb, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Pb, { versions: e.versions }),
        /* @__PURE__ */ n(Ob, { facts: i })
      ]
    }
  );
}
const zb = "_list_4dcyc_2", Wb = "_row_4dcyc_11", Kb = "_head_4dcyc_23", Gb = "_id_4dcyc_30", Ub = "_lock_4dcyc_35", Vb = "_reason_4dcyc_41", Yb = "_remove_4dcyc_46", Jb = "_clauses_4dcyc_50", Qb = "_clause_4dcyc_50", Xb = "_label_4dcyc_64", Zb = "_cell_4dcyc_71", ep = "_value_4dcyc_76", ce = {
  list: zb,
  row: Wb,
  head: Kb,
  id: Gb,
  lock: Ub,
  reason: Vb,
  remove: Yb,
  clauses: Jb,
  clause: Qb,
  label: Xb,
  cell: Zb,
  value: ep
}, hr = Ne(!1);
function Fx({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(hr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function tp({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(q, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => a(e.key, o) });
}
function np({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function ap({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ l("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(np, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function ia(e, t) {
  return e.locked ? void 0 : t;
}
function Dx({ rule: e, onChange: t, onRemove: a }) {
  if (!ye(hr)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = ia(e, t);
  return /* @__PURE__ */ l("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(ap, { rule: e, onRemove: ia(e, a) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(tp, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const rp = "_ladder_1xdeh_2", op = "_cell_1xdeh_7", lp = "_empty_1xdeh_26", ip = "_name_1xdeh_34", sp = "_holder_1xdeh_40", cp = "_request_1xdeh_46", dp = "_swatches_1xdeh_51", up = "_swatch_1xdeh_51", hp = "_tilesFrame_1xdeh_78", mp = "_tiles_1xdeh_78", wp = "_tile_1xdeh_78", _p = "_bar_1xdeh_117", fp = "_hex_1xdeh_128", vp = "_note_1xdeh_138", B = {
  ladder: rp,
  cell: op,
  empty: lp,
  name: ip,
  holder: sp,
  request: cp,
  swatches: dp,
  swatch: up,
  tilesFrame: hp,
  tiles: mp,
  tile: wp,
  bar: _p,
  hex: fp,
  note: vp
}, zx = "not validated yet, pending a CVD matrix and dark stepping";
function bp(e) {
  return e.reserved ? "reserved" : _t(e.step) ? "validated" : "partial";
}
function mr(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function pp(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function gp({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(ze, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${B.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function yp(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function Np(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const sa = (e) => String(e).padStart(2, "0");
function kp(e, t, a) {
  return e === "reserved" ? "Reserved until revalidated" : a ? "yours" : t ?? mr(e, void 0);
}
function $p({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${B.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.hex} ward-ladder-hex`, children: r ? `step ${sa(e)}` : yo(e) }),
    /* @__PURE__ */ n("span", { className: `${B.note} ward-ladder-note`, children: r ? a : `Step ${sa(e)} · ${a}` })
  ] });
}
function Cp({ step: e, value: t, taken: a, onChange: r, presentation: o, disabled: i }) {
  const s = bp(e), c = mr(s, a), d = c !== "free", u = d || i, h = t === e.step, w = e.name ?? `Step ${e.step}`, _ = () => {
    u || r(e.step);
  }, N = `${w} · ${o === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...Np(d, h, u), "data-validation": s, style: pp(e, s), onClick: _, onKeyDown: (E) => yp(E, _) }, label: N, name: w, holder: c, validation: s, note: kp(s, a, h), step: e.step };
}
const Sp = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${B.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${B.tile} ward-ladder-cell`, children: /* @__PURE__ */ n($p, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${B.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(gp, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${B.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${B.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Rp(e) {
  return Sp[e.presentation](Cp(e));
}
function Tp(e) {
  for (const t of e)
    if (!t.reserved && !Dt(t.step)) throw new Error("colour ladder renders token steps only");
}
function xp() {
  return /* @__PURE__ */ l("div", { className: `${B.cell} ward-ladder-cell ${B.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${B.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${B.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Lp(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Ap = { list: B.ladder, swatches: B.swatches, tiles: B.tilesFrame };
function Ep() {
  return /* @__PURE__ */ l("div", { className: `${B.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${B.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${B.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Ip = { list: xp, swatches: () => null, tiles: Ep };
function Mp(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function wr(e) {
  const t = e.takenBy ?? {}, a = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Tp(e.steps);
  const r = Lp(e), o = Ip[r], i = /* @__PURE__ */ l(x, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(Rp, { step: s, value: e.value, taken: t[s.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Mp(e.disabled === !0), className: `${Ap[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: B.tiles, children: i }) : i });
}
const Bp = "_rail_s06lm_2", jp = "_section_s06lm_12", Pp = "_sectionFlush_s06lm_22", qp = "_head_s06lm_26", Hp = "_headLabel_s06lm_34", Op = "_sample_s06lm_42", Fp = "_sampleLabel_s06lm_47", Dp = "_sampleTitle_s06lm_54", zp = "_sampleMeta_s06lm_59", Wp = "_trace_s06lm_65", Kp = "_traceHead_s06lm_70", Gp = "_steps_s06lm_78", Up = "_step_s06lm_78", Vp = "_stepTitle_s06lm_97", Yp = "_hollow_s06lm_107", Jp = "_stepBody_s06lm_115", Qp = "_stepDetail_s06lm_127", Xp = "_publish_s06lm_132", Zp = "_reason_s06lm_138", eg = "_note_s06lm_143", tg = "_reveal_s06lm_148", $ = {
  rail: Bp,
  section: jp,
  sectionFlush: Pp,
  head: qp,
  headLabel: Hp,
  sample: Op,
  sampleLabel: Fp,
  sampleTitle: Dp,
  sampleMeta: zp,
  trace: Wp,
  traceHead: Kp,
  steps: Gp,
  step: Up,
  stepTitle: Vp,
  hollow: Yp,
  stepBody: Jp,
  stepDetail: Qp,
  publish: Xp,
  reason: Zp,
  note: eg,
  reveal: tg
}, ca = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, ng = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, ag = { ok: "greenFill", finding: "orangeFill", action: "blue" }, rg = { notSimulated: "not simulated", running: "running" };
function og(e) {
  return e.presentation === "foundry";
}
function lg(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const a = t.filter((r) => !r.met);
  return a.length > 0 ? `Publish is disabled: ${a.length} of ${t.length} gate conditions unmet: ${a[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function ig(e, t) {
  var r;
  const a = ng[e.status];
  return a !== void 0 ? a : ((r = t.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function sg(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function cg(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function dg(e) {
  if (sg(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function ug(e) {
  const [t, a] = p(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function hg(e) {
  const t = rg[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(ze, { size: 6, kind: ag[e.kind], label: e.kind });
}
function mg(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function wg(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Ae, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function _g(e) {
  const { step: t } = e;
  return /* @__PURE__ */ l(ug, { kind: t.kind, children: [
    /* @__PURE__ */ n(hg, { kind: t.kind }),
    /* @__PURE__ */ l("span", { className: $.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: $.stepTitle, children: t.title }),
      /* @__PURE__ */ n(mg, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(wg, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function fg(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(ue(t)), a.join(" · ");
}
function _r(e) {
  const t = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.traceHead, id: t, children: fg(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: $.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(_g, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function vg(e) {
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
function bg(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function pg(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? ka(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Kt, { divided: !0, cells: t }) });
}
function gg(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: ka(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function yg(e) {
  const t = gg(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ l("p", { className: $.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Kt, { divided: !0, cells: t }) });
}
function fr(e) {
  const t = y();
  return e.reason !== null ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: `${$.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Ng(e) {
  return /* @__PURE__ */ l("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ n(fr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: $.note, children: e.note })
  ] });
}
function kg(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ n(fr, { reason: e.reason, onPublish: e.onPublish }) });
}
function vr(e) {
  return /* @__PURE__ */ l("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: ca[e.run.status].role, label: ca[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Ae, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function $g(e, t) {
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
function Cg(e) {
  var a;
  cg(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(vr, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(vg, { sample: e.run.sample }),
    /* @__PURE__ */ n(_r, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(pg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Vt, { items: e.checklist }) }),
    /* @__PURE__ */ n(Ng, { reason: lg(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Sg(e) {
  var r;
  const t = $g(e.run, e.feed);
  dg(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(vr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(bg, { sample: e.run.sample }),
    /* @__PURE__ */ n(_r, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(yg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Vt, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(kg, { reason: ig(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function Wx(e) {
  return og(e) ? /* @__PURE__ */ n(Sg, { ...e }) : /* @__PURE__ */ n(Cg, { ...e });
}
const Rg = "_list_142ip_3", Tg = "_row_142ip_9", xg = "_condition_142ip_18", Lg = "_action_142ip_24", xt = {
  list: Rg,
  row: Tg,
  condition: xg,
  action: Lg
}, br = Ne(!1);
function Kx({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(br.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: xt.list, "aria-label": t, children: e }) });
}
function Gx({ rule: e }) {
  if (!ye(br)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: xt.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: xt.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: xt.action, children: e.then })
  ] });
}
const Ag = "_move_tmppt_3", Eg = {
  move: Ag
};
function hn(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [o] = r.splice(t, 1);
  return r.splice(a, 0, o), r;
}
function pr(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function gr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function da(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function Ig(e) {
  return e === "up" ? "down" : "up";
}
function Mg(e, t) {
  const a = da(e, t.id, t.direction) ?? da(e, t.id, Ig(t.direction));
  a == null || a.focus();
}
function yr() {
  const e = f(null), [t, a] = p(null), [r, o] = p("");
  return S(() => {
    e.current !== null && t !== null && Mg(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), o(c);
  } };
}
function Nr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function jt({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${Eg.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const Bg = "_body_1jd1i_2", jg = "_title_1jd1i_8", Pg = "_section_1jd1i_13", qg = "_legend_1jd1i_18", Hg = "_stages_1jd1i_26", Og = "_stage_1jd1i_26", Fg = "_stageIndex_1jd1i_44", Dg = "_stageName_1jd1i_50", zg = "_footer_1jd1i_59", Wg = "_note_1jd1i_66", Kg = "_reason_1jd1i_71", Gg = "_actions_1jd1i_76", Ug = "_webHead_1jd1i_83", Vg = "_kicker_1jd1i_92", Yg = "_webTitle_1jd1i_99", Jg = "_webBody_1jd1i_105", Qg = "_webSection_1jd1i_109", Xg = "_sectionHead_1jd1i_121", Zg = "_sectionNote_1jd1i_129", ey = "_formLabel_1jd1i_134", ty = "_identityRow_1jd1i_139", ny = "_nameCell_1jd1i_145", ay = "_keyCell_1jd1i_150", ry = "_colourCell_1jd1i_154", oy = "_colourStatus_1jd1i_161", ly = "_webStages_1jd1i_166", iy = "_webStageList_1jd1i_172", sy = "_webStage_1jd1i_166", cy = "_webIndex_1jd1i_191", dy = "_webStageName_1jd1i_196", uy = "_webMoves_1jd1i_201", hy = "_addStage_1jd1i_215", my = "_addStageButton_1jd1i_223", wy = "_addStageNote_1jd1i_231", _y = "_webFooter_1jd1i_236", fy = "_webFooterNotes_1jd1i_244", vy = "_webNote_1jd1i_251", v = {
  body: Bg,
  title: jg,
  section: Pg,
  legend: qg,
  stages: Hg,
  stage: Og,
  stageIndex: Fg,
  stageName: Dg,
  footer: zg,
  note: Wg,
  reason: Kg,
  actions: Gg,
  webHead: Ug,
  kicker: Vg,
  webTitle: Yg,
  webBody: Jg,
  webSection: Qg,
  sectionHead: Xg,
  sectionNote: Zg,
  formLabel: ey,
  identityRow: ty,
  nameCell: ny,
  keyCell: ay,
  colourCell: ry,
  colourStatus: oy,
  webStages: ly,
  webStageList: iy,
  webStage: sy,
  webIndex: cy,
  webStageName: dy,
  webMoves: uy,
  addStage: hy,
  addStageButton: my,
  addStageNote: wy,
  webFooter: _y,
  webFooterNotes: fy,
  webNote: vy
}, by = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], kr = "not in catalogue";
function py(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${kr}` }, ...a];
}
function gy({ stage: e, index: t, catalogue: a, onName: r }) {
  const o = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(q, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${kr}`;
  return /* @__PURE__ */ n(q, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: py(a, e.name), invalid: i, onChange: r });
}
function $r(e, t) {
  return e.name || `stage ${t + 1}`;
}
function yy(e) {
  const t = f([]), a = f(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function Ny({ id: e, stage: t, index: a, total: r, catalogue: o, onReplace: i, onMove: s }) {
  const c = $r(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: v.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: v.webStageName, children: /* @__PURE__ */ n(gy, { stage: t, index: a, catalogue: o, onName: (u) => i({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(q, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: by, onChange: (u) => i({ ...t, kind: u }) }),
    /* @__PURE__ */ l("span", { className: v.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(jt, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(jt, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function ky({ stages: e, onChange: t, catalogue: a }) {
  const r = yy(e.length), o = yr(), i = (c, d) => {
    const u = pr(c, d);
    r.current = hn(r.current, c, u), o.moved({ id: r.current[u], direction: d }, gr($r(e[c], c), u, e.length)), t(hn(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ l("div", { className: v.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(Ny, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(Nr, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: v.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const $y = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Cy = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Sy = "A new stream starts as a draft. Nothing runs on it until you publish it.", Ry = "Create is disabled: name the stream and give it a key first.", Ty = "reorder with the ↑ ↓ buttons · min 2";
function Rn(e, t) {
  return !e.reserved && _t(e.step) && t[e.step] === void 0;
}
function xy(e, t) {
  const a = e.find((r) => Rn(r, t));
  return a ? a.step : 1;
}
function Ly({ stages: e, onMove: t }) {
  const a = yr(), r = (o, i) => {
    const s = pr(o, i);
    a.moved({ id: e[o].id, direction: i }, gr(e[o].name, s, e.length)), t(o, s);
  };
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: v.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: v.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: v.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(jt, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(jt, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(Nr, { text: a.announcement })
  ] });
}
function Ay({ reason: e, onCreate: t, onDraft: a }) {
  const r = y();
  return /* @__PURE__ */ l("div", { className: v.footer, children: [
    /* @__PURE__ */ n("p", { className: v.note, children: Sy }),
    e && /* @__PURE__ */ n("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: v.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function Ey(e, t) {
  return e !== "" && t !== "" ? null : Ry;
}
function Iy(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: o = Cy, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = y(), [h, w] = p(""), [_, N] = p(""), [k, E] = p(t[0].value), [H, me] = p(() => xy(a, r)), [re, Ie] = p(e.stages ?? $y), [Je, T] = p(o[0].value), J = { name: h, key: _, streamStep: H, owner: k, stages: re, policy: Je }, ke = Ey(h, _);
  return /* @__PURE__ */ n(lt, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ l("div", { className: v.body, children: [
    /* @__PURE__ */ n("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ n(q, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ n(q, { kind: "input", label: "Key", value: _, onChange: N, mono: !0 }),
      /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: k, onChange: E, options: t })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ n(wr, { label: "Stream colour", steps: a, value: H, onChange: me, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ n(Ly, { stages: re, onMove: (We, Qr) => Ie(hn(re, We, Qr)) })
    ] }),
    /* @__PURE__ */ n(ar, { legend: "Loop policy", options: o, value: Je, onChange: T }),
    /* @__PURE__ */ n(Ay, { reason: ke, onCreate: () => i(J), onDraft: () => s(J) })
  ] }) });
}
const Cr = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], My = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function By(e, t, a, r, o, i) {
  var c;
  const s = ((c = Cr.find((d) => d.value === o)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: i };
}
function jy(e, t) {
  return Py(e) && qy(e, t) && Hy(e);
}
function Py(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function qy(e, t) {
  return e.colourStep === null || Rn({ step: e.colourStep }, t);
}
function Hy(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function Oy(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : Rn({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Fy({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function Dy({ ready: e, draft: t, agentStage: a, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: v.webFooter, children: [
    /* @__PURE__ */ l("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ n(Fy, { stage: a }),
      !e && /* @__PURE__ */ n("p", { id: i, className: v.reason, children: My })
    ] }),
    o && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => o(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function zy({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: v.webHead, children: [
    /* @__PURE__ */ n("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function Wy({ name: e, setName: t, streamKey: a, setKey: r, colour: o, owner: i }) {
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
function Ky(e) {
  const t = y(), a = y(), r = e.takenBy ?? {}, [o, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [_, N] = p("relay"), [k, E] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), H = By(o, s, d, h, _, k), me = jy(H, r), re = k.find((T) => T.kind === "agent" && T.name.trim() !== ""), Ie = /* @__PURE__ */ l("div", { className: v.colourCell, children: [
    /* @__PURE__ */ n("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(wr, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Je = /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: v.colourStatus, "data-colour-status": "", children: Oy(h, r) }),
    /* @__PURE__ */ n(q, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((T) => ({ value: T, label: T })), onChange: u })
  ] });
  return /* @__PURE__ */ l(lt, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(zy, { titleId: a }),
    /* @__PURE__ */ l("div", { className: v.webBody, children: [
      /* @__PURE__ */ n(Wy, { name: o, setName: i, streamKey: s, setKey: c, colour: Ie, owner: Je }),
      e.fields && /* @__PURE__ */ n("section", { className: v.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ l("section", { className: v.webSection, children: [
        /* @__PURE__ */ l("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: v.sectionNote, children: Ty })
        ] }),
        /* @__PURE__ */ n(ky, { stages: k, onChange: E })
      ] }),
      /* @__PURE__ */ n("section", { className: v.webSection, children: /* @__PURE__ */ n(ar, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: _, options: Cr, onChange: N }) }),
      /* @__PURE__ */ n(Dy, { ready: me, draft: H, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function Ux(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ky, { ...e }) : /* @__PURE__ */ n(Iy, { ...e });
}
const Gy = "_row_bs8hc_2", Uy = "_cell_bs8hc_6", Vy = "_condition_bs8hc_11", Yy = "_action_bs8hc_18", Jy = "_contract_bs8hc_24", Qy = "_contractCondition_bs8hc_33", Xy = "_contractAction_bs8hc_39", ne = {
  row: Gy,
  cell: Uy,
  condition: Vy,
  action: Yy,
  contract: Jy,
  contractCondition: Qy,
  contractAction: Xy
}, Sr = ["advance", "block", "escalate", "requestReview"], ua = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Pt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Tn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ne.action, children: ua[e.then] }) : /* @__PURE__ */ n(
    q,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => t({ ...e, then: o }),
      options: Sr.map((o) => ({ value: o, label: ua[o] }))
    }
  );
}
function Zy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n("span", { className: ne.condition, title: Pt(e, r), children: Pt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: Tn(e, t, a) })
  ] });
}
function eN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ l("td", { className: ne.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ne.condition, children: Pt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: Tn(e, t, a) })
  ] });
}
function tN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: ne.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ne.contractCondition, children: Pt(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ne.contractAction, children: Tn(e, t, a, !0) })
  ] });
}
const nN = { two: eN, four: Zy, contract: tN };
function Vx(e) {
  var a;
  if (!Sr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = nN[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const aN = "_column_g1uat_2", rN = "_head_g1uat_17", oN = "_index_g1uat_23", lN = "_name_g1uat_29", iN = "_meta_g1uat_38", sN = "_mono_g1uat_43", cN = "_gate_g1uat_50", dN = "_reviewersLabel_g1uat_57", uN = "_reviewers_g1uat_57", hN = "_reviewer_g1uat_57", mN = "_agents_g1uat_74", wN = "_workflowColumn_g1uat_79", _N = "_workflowHead_g1uat_96", fN = "_stageRow_g1uat_102", vN = "_stageLabel_g1uat_109", bN = "_workflowTitle_g1uat_116", pN = "_workflowMeta_g1uat_122", gN = "_workflowGate_g1uat_127", yN = "_gateNote_g1uat_135", NN = "_cardNote_g1uat_140", kN = "_reviewerList_g1uat_145", $N = "_reviewerRow_g1uat_151", CN = "_reviewerMark_g1uat_157", SN = "_reviewerName_g1uat_167", RN = "_terminalCard_g1uat_173", TN = "_terminalCount_g1uat_182", xN = "_workflowAgents_g1uat_188", LN = "_mount_g1uat_194", R = {
  column: aN,
  head: rN,
  index: oN,
  name: lN,
  meta: iN,
  mono: sN,
  gate: cN,
  reviewersLabel: dN,
  reviewers: uN,
  reviewer: hN,
  agents: mN,
  workflowColumn: wN,
  workflowHead: _N,
  stageRow: fN,
  stageLabel: vN,
  workflowTitle: bN,
  workflowMeta: pN,
  workflowGate: gN,
  gateNote: yN,
  cardNote: NN,
  reviewerList: kN,
  reviewerRow: $N,
  reviewerMark: CN,
  reviewerName: SN,
  terminalCard: RN,
  terminalCount: TN,
  workflowAgents: xN,
  mount: LN
}, AN = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function xn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function Rr(e) {
  return `${Math.round(e * 100)}%`;
}
function EN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Kt, { cells: [
      { value: Rr(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function IN({ stage: e }) {
  return /* @__PURE__ */ n(Kt, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: xn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function MN({ stage: e, titleId: t }) {
  return /* @__PURE__ */ l("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: AN[e.kind] })
  ] });
}
function BN({ stage: e }) {
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
function jN({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(EN, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(IN, { stage: e }) : null;
}
function PN({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function qN({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const o = y(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: R.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(MN, { stage: e, titleId: o }),
    /* @__PURE__ */ n(BN, { stage: e }),
    /* @__PURE__ */ n(jN, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(Db, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(PN, { onMount: a })
  ] });
}
const HN = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function ON({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ l("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function FN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: R.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ n(ON, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: Rr(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function DN(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function zN({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: xn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: DN(e.rolledBackThisWeek) })
  ] });
}
function WN(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function KN(e) {
  if (e.kind === "terminal") return `${xn(e.closedThisWeek)} this week`;
  const t = WN(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function GN({ stage: e, titleId: t }) {
  const a = HN[e.kind];
  return /* @__PURE__ */ l("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: R.stageRow, children: [
      /* @__PURE__ */ l("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: KN(e) })
  ] });
}
function UN(e) {
  return e === "entry" || e === "agent";
}
function VN({ stage: e, onMount: t }) {
  return t === void 0 || !UN(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Mount agent" });
}
function YN({ stage: e, agentCards: t, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ l("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(GN, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(FN, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(zN, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(VN, { stage: e, onMount: a })
  ] });
}
function JN(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function Yx(e) {
  return JN(e) ? /* @__PURE__ */ n(YN, { ...e }) : /* @__PURE__ */ n(qN, { ...e });
}
const QN = "_row_1tdra_6", XN = "_name_1tdra_12", ZN = "_compactRow_1tdra_13", e1 = "_compactName_1tdra_13", t1 = "_cell_1tdra_30", n1 = "_chain_1tdra_45", a1 = "_owner_1tdra_51", r1 = "_mono_1tdra_57", o1 = "_compactCell_1tdra_79", l1 = "_stack_1tdra_96", i1 = "_stat_1tdra_103", s1 = "_identityLine_1tdra_110", c1 = "_identity_1tdra_110", d1 = "_ownerLine_1tdra_140", u1 = "_link_1tdra_160", h1 = "_gateMark_1tdra_166", m1 = "_emptyChain_1tdra_171", w1 = "_arrow_1tdra_177", _1 = "_muted_1tdra_182", f1 = "_define_1tdra_187", v1 = "_statValue_1tdra_194", b1 = "_policyId_1tdra_200", p1 = "_sub_1tdra_205", g = {
  row: QN,
  name: XN,
  compactRow: ZN,
  compactName: e1,
  cell: t1,
  chain: n1,
  owner: a1,
  mono: r1,
  compactCell: o1,
  stack: l1,
  stat: i1,
  identityLine: s1,
  identity: c1,
  ownerLine: d1,
  link: u1,
  gateMark: h1,
  emptyChain: m1,
  arrow: w1,
  muted: _1,
  define: f1,
  statValue: v1,
  policyId: b1,
  sub: p1
};
function Tr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function g1(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function y1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function xr(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function N1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${xr(e.members)}`;
}
function k1(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ l("span", { className: g.stack, children: [
    /* @__PURE__ */ l("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: L(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: N1(e) })
  ] }) });
}
function Lr({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ l(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function $1(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = vt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function C1({ stages: e, streamStep: t }) {
  const a = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((o, i) => /* @__PURE__ */ l("span", { className: g.link, children: [
    /* @__PURE__ */ n(Lr, { name: o.name, gate: o.gate === !0, look: $1(i, a, t), size: "tag" }),
    i === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${i}`)) });
}
function S1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ l("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : C1(e) });
}
function Ar(e) {
  return e === void 0 ? void 0 : !0;
}
function ha(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Ar(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function R1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function T1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function x1({ stream: e, href: t, presentation: a }) {
  const r = y1(a.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, onClick: Tr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ge(e.streamStep, "chip") }, children: [
    k1(e, t),
    S1(e),
    ha(T1(e.agents), e.agents === void 0 ? void 0 : g1(e.agents), "—"),
    R1(e.policy),
    ha(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function L1(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function Jx(e) {
  if (L1(e)) return x1(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ l("tr", { className: g.row, onClick: Tr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ l("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: L(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...Wt(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(Lr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: g.mono, children: xr(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": Ar(t.inFlightHint), children: ae(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : ue(t.p50) }) })
  ] });
}
const A1 = "_row_2u4ll_2", E1 = "_name_2u4ll_16", I1 = "_scope_2u4ll_24", qt = {
  row: A1,
  name: E1,
  scope: I1
};
function Ln(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function M1(e) {
  return e === void 0 ? `${qt.row} ward-toolrow` : `${qt.row} ward-toolrow ${e}`;
}
function B1(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function j1({ id: e, reasonId: t, tool: a, state: r, onChange: o }) {
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
function P1({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: Ln(e) });
}
function q1({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${qt.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function H1(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function Qx({ tool: e, onChange: t, presentation: a }) {
  const r = y(), o = y(), i = B1(e, a), s = H1(a);
  return /* @__PURE__ */ l(s, { className: M1(a == null ? void 0 : a.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(j1, { id: r, reasonId: o, tool: e, state: i, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${qt.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(q1, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(P1, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const O1 = "_strip_4ppv9_2", F1 = "_well_4ppv9_11", D1 = "_head_4ppv9_18", z1 = "_name_4ppv9_24", W1 = "_chart_4ppv9_32", K1 = "_segment_4ppv9_38", G1 = "_detailedChart_4ppv9_44", U1 = "_rail_4ppv9_57", V1 = "_section_4ppv9_63", Y1 = "_label_4ppv9_74", J1 = "_note_4ppv9_91", V = {
  strip: O1,
  well: F1,
  head: D1,
  name: z1,
  chart: W1,
  segment: K1,
  detailedChart: G1,
  rail: U1,
  section: V1,
  label: Y1,
  note: J1
}, Q1 = "No item in flight to preview.", X1 = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Z1 = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", mn = [1, 2, 3, 4, 5, 6], Ht = 100;
function ek(e, t) {
  return t.has(e) ? ge(e, "id") : "var(--ward-color-line)";
}
function tk({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: mn.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: o * Ht,
      y: "0",
      width: Ht,
      height: "8",
      fill: ek(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function nk(e) {
  const t = e.slice(0, mn.length);
  for (; t.length < mn.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function ak({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${V.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, a) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(a * Ht),
        y: "0",
        width: String(Ht),
        height: "40",
        style: { fill: ge(t.streamStep, "chip") }
      },
      t.key + String(a)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((t, a) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(a))) })
  ] });
}
function Er(e) {
  return (t) => e == null ? void 0 : e(t);
}
function yt({ label: e, children: t }) {
  const a = y();
  return /* @__PURE__ */ l("section", { className: V.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: V.label, children: e }),
    t
  ] });
}
function rk({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: t ?? Q1 }) : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Ut, { item: { ...e, streamStep: vt(a.streamStep) }, onOpen: Er(r), feed: null }) });
}
function ok({ draft: e }) {
  const t = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: V.head, style: t, children: [
    /* @__PURE__ */ n(ze, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Wt(e.key, e.streamStep) })
  ] });
}
function lk(e) {
  const t = nk(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ l("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(yt, { label: "Board card", children: /* @__PURE__ */ n(rk, { ...e, draft: a }) }),
    /* @__PURE__ */ n(yt, { label: "Streams index row", children: /* @__PURE__ */ n(ok, { draft: a }) }),
    /* @__PURE__ */ l(yt, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(ak, { identities: t }),
      /* @__PURE__ */ n("p", { className: V.note, children: X1 })
    ] }),
    /* @__PURE__ */ n(yt, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: Z1 }) })
  ] });
}
function ik({ draft: e, sample: t, streams: a, onOpen: r }) {
  const o = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: V.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: V.head, children: [
      /* @__PURE__ */ n(ze, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Wt(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Ut, { item: { ...t, streamStep: e.streamStep }, onOpen: Er(r) }) }),
    /* @__PURE__ */ n(tk, { draft: e, streams: a })
  ] });
}
function Xx(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(lk, { ...e }) : /* @__PURE__ */ n(ik, { ...e });
}
const sk = "_row_ixlg5_6", ck = "_headCell_ixlg5_10", dk = "_cell_ixlg5_11", uk = "_name_ixlg5_23", hk = "_consequence_ixlg5_29", mk = "_governed_ixlg5_36", wk = "_control_ixlg5_42", _k = "_byRole_ixlg5_48", fk = "_webControl_ixlg5_59", vk = "_webConsequence_ixlg5_65", bk = "_webGoverned_ixlg5_71", W = {
  row: sk,
  headCell: ck,
  cell: dk,
  name: uk,
  consequence: hk,
  governed: mk,
  control: wk,
  byRole: _k,
  webControl: fk,
  webConsequence: vk,
  webGoverned: bk
};
function pk({
  capability: e,
  cell: t,
  onChange: a
}) {
  return t.value === "byRole" ? /* @__PURE__ */ n("span", { className: W.byRole, children: "by role" }) : /* @__PURE__ */ l("span", { className: W.control, children: [
    /* @__PURE__ */ n(
      Ye,
      {
        label: `${e.name} · ${t.stream}`,
        checked: t.value !== "off",
        onChange: (r) => a(t.streamStep, r)
      }
    ),
    t.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "Pilot" })
  ] });
}
function gk({ capability: e, cells: t, onChange: a }) {
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
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(pk, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function yk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Nk({ name: e, cell: t, onChange: a }) {
  if (t.value === "byRole") return /* @__PURE__ */ n("span", { className: `${W.webControl} ${W.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Ye,
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
function kk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ l("tr", { className: W.row, children: [
    /* @__PURE__ */ l("td", { className: W.cell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${W.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(Nk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webGoverned} ward-cellmeta`, children: yk(e) }) })
  ] });
}
function Zx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(kk, { ...e }) : /* @__PURE__ */ n(gk, { ...e });
}
const $k = "_row_vv64h_2", Ck = "_cell_vv64h_6", Sk = "_name_vv64h_25", Rk = "_note_vv64h_30", Tk = "_webName_vv64h_41", xk = "_webMeta_vv64h_47", X = {
  row: $k,
  cell: Ck,
  name: Sk,
  note: Rk,
  webName: Tk,
  webMeta: xk
}, Ir = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function Lk(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Ak({ component: e, onRestart: t }) {
  const a = y(), r = Ir[e.state], o = e.state === "drainFirst";
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
function Ek({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: Lk(e.state) });
}
function Ik({ component: e, onRestart: t }) {
  return /* @__PURE__ */ l("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { ...Ir[e.state] }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(Ek, { component: e, onRestart: t }) })
  ] });
}
function eL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ik, { ...e }) : /* @__PURE__ */ n(Ak, { ...e });
}
const Mk = "_row_jcm5k_7", Bk = "_cell_jcm5k_11", jk = "_next_jcm5k_28", Pk = "_headCell_jcm5k_38", qk = "_webId_jcm5k_77", Hk = "_webPurpose_jcm5k_83", Ok = "_webMeta_jcm5k_91", Fk = "_webUrgent_jcm5k_97", K = {
  row: Mk,
  cell: Bk,
  next: jk,
  headCell: Pk,
  webId: qk,
  webPurpose: Hk,
  webMeta: Ok,
  webUrgent: Fk
}, Dk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, zk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Mr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Wk = Object.fromEntries(Mr.map((e) => [e.key, e]));
function Xe({ column: e, children: t }) {
  const a = Wk[e];
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
function tL() {
  return /* @__PURE__ */ n("tr", { children: Mr.map((e) => /* @__PURE__ */ n(
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
function Kk({ cred: e }) {
  const t = Dk[e.state];
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n(Xe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Xe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Xe, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(Xe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Ln(e.cls) }) }),
    /* @__PURE__ */ n(Xe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Xe, { column: "next", children: /* @__PURE__ */ n("span", { className: K.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Gk({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${K.webMeta} ${K.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function Uk({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(Gk, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...zk[e.state] }) })
  ] });
}
function nL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Uk, { ...e }) : /* @__PURE__ */ n(Kk, { ...e });
}
const Vk = "_card_lpp45_2", Yk = "_head_lpp45_11", Jk = "_env_lpp45_18", Qk = "_version_lpp45_25", Xk = "_meta_lpp45_32", Zk = "_webCard_lpp45_37", e$ = "_webRow_lpp45_47", t$ = "_webTitle_lpp45_55", n$ = "_webLine_lpp45_65", a$ = "_webVersion_lpp45_72", r$ = "_webMeta_lpp45_77", Q = {
  card: Vk,
  head: Yk,
  env: Jk,
  version: Qk,
  meta: Xk,
  webCard: Zk,
  webRow: e$,
  webTitle: t$,
  webLine: n$,
  webVersion: a$,
  webMeta: r$
}, ma = { dev: "Dev", uat: "UAT", prod: "Prod" }, Br = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function o$({ env: e }) {
  const t = Br[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l("section", { className: Q.card, "aria-label": ma[e.env], children: [
    /* @__PURE__ */ l("div", { className: Q.head, children: [
      /* @__PURE__ */ n("span", { className: Q.env, children: ma[e.env] }),
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
function l$(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function i$(e) {
  return /* @__PURE__ */ l("article", { className: `${Q.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${Q.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Q.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Br[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Q.version} ${Q.webVersion} ${Q.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Q.meta} ${Q.webMeta} ${Q.webLine} ward-cellmeta`, children: l$(e) })
  ] });
}
function aL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(i$, { ...e }) : /* @__PURE__ */ n(o$, { ...e });
}
const s$ = "_panel_1hmja_2", c$ = "_line_1hmja_8", d$ = "_actions_1hmja_14", Nt = {
  panel: s$,
  line: c$,
  actions: d$
};
function rL(e) {
  return /* @__PURE__ */ l("div", { className: Nt.panel, children: [
    /* @__PURE__ */ n("p", { className: Nt.line, children: e.status }),
    /* @__PURE__ */ n(q, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: Nt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: Nt.line, children: e.note ?? "" })
  ] });
}
const u$ = "_upload_13fcl_2", h$ = "_preview_13fcl_7", m$ = "_mark_13fcl_17", w$ = "_empty_13fcl_22", _$ = "_actions_13fcl_28", f$ = "_input_13fcl_33", v$ = "_reasons_13fcl_41", b$ = "_reason_13fcl_41", p$ = "_accepted_13fcl_57", oe = {
  upload: u$,
  preview: h$,
  mark: m$,
  empty: w$,
  actions: _$,
  input: f$,
  reasons: v$,
  reason: b$,
  accepted: p$
}, jr = 1.5, Pr = 22, Ot = "script elements or event handlers", Pe = "links or external references", xe = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${jr}px at ${Pr}px`], g$ = [xe[1], xe[2], Ot, Pe], y$ = /* @__PURE__ */ new Map([
  ["image", xe[1]],
  ["text", xe[2]],
  ["tspan", xe[2]],
  ["textPath", xe[2]],
  ["script", Ot],
  ["foreignObject", Ot],
  ["a", Pe],
  ["use", Pe],
  ["style", Pe],
  ["feImage", Pe],
  ["set", Pe]
]), N$ = "http://www.w3.org/2000/svg", k$ = "http://www.w3.org/2000/xmlns/", $$ = /* @__PURE__ */ new Set([
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
]), C$ = /* @__PURE__ */ new Set([
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
]), An = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, S$ = /url\s*\(|['"\\]/i;
function R$() {
  return { ok: !1, reasons: [xe[1]] };
}
function qr(e) {
  return e.namespaceURI === N$;
}
function T$(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && qr(t) ? t : null;
  } catch {
    return null;
  }
}
function x$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [xe[0]] : [];
}
function L$(e) {
  return y$.get(e.localName) ?? (e.localName.startsWith("animate") ? Pe : void 0);
}
function A$(e) {
  return S$.test(e.replace(An, ""));
}
function E$(e) {
  return /^on/i.test(e.localName) ? Ot : e.localName === "href" || A$(e.value) ? Pe : void 0;
}
function I$(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(L$(a));
    for (const r of Array.from(a.attributes)) t.add(E$(r));
  }
  return g$.filter((a) => t.has(a));
}
function M$(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((o) => Number.isFinite(o) && o > 0), 0), r = a > 0 ? Pr / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < jr;
  }) ? [xe[3]] : [];
}
function B$(e) {
  if (e.namespaceURI === k$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (C$.has(t) || t.startsWith("stroke"));
}
function j$(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && qr(t) && $$.has(t.localName);
}
function P$(e, t) {
  j$(t) ? t.nodeType === Node.ELEMENT_NODE && Hr(t) : e.removeChild(t);
}
function Hr(e) {
  for (const t of Array.from(e.attributes)) B$(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) P$(e, t);
  return e;
}
function q$(e) {
  return Array.from(e.matchAll(An), (t) => t[2]).filter((t) => t !== "");
}
function H$(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function O$(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const i of q$(o.value)) a.has(i) || a.set(i, `${t}-${a.size}`);
  return a;
}
function F$(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(An, (r, o, i) => {
      const s = t.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function D$(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = O$(a, t);
  for (const o of a) {
    const i = r.get(o.getAttribute("id") ?? "");
    i === void 0 ? o.removeAttribute("id") : o.setAttribute("id", i), F$(o, r);
  }
  return e;
}
function oL(e) {
  const t = T$(e);
  if (t === null) return R$();
  const a = [...x$(t), ...I$(t), ...M$(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(D$(Hr(t), H$(e))) };
}
const z$ = "Mark accepted.", W$ = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, K$ = new Set(Ca.flatMap((e) => [ge(e, "id"), ge(e, "chip")]));
function G$(e) {
  return e !== void 0 && (W$.test(e) || K$.has(e)) ? e : void 0;
}
function U$({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: oe.preview, style: { "--mark": G$(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: oe.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: oe.empty }) });
}
function V$(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function Y$(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function J$({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: oe.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("p", { className: oe.accepted, children: z$ }) }) : /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("ul", { className: oe.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: oe.reason, children: t }, t)) }) });
}
function Q$({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(J$, { result: e }) : /* @__PURE__ */ n("p", { className: `${oe.result} ${V$(e, a)}`, role: "status", children: Y$(e, a) });
}
function wa(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function lL({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: o }) {
  const i = f(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ l("div", { className: oe.upload, children: [
    /* @__PURE__ */ n(U$, { current: e }),
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
      /* @__PURE__ */ n(b, { ...wa(o), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...wa(o), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(Q$, { result: s, presentation: r })
  ] });
}
const X$ = "_row_o3t6y_7", Z$ = "_cell_o3t6y_11", e0 = "_head_o3t6y_28", t0 = "_name_o3t6y_34", n0 = "_pinned_o3t6y_42", a0 = "_headCell_o3t6y_49", r0 = "_webName_o3t6y_88", o0 = "_webMeta_o3t6y_95", l0 = "_webWarn_o3t6y_103", F = {
  row: X$,
  cell: Z$,
  head: e0,
  name: t0,
  pinned: n0,
  headCell: a0,
  webName: r0,
  webMeta: o0,
  webWarn: l0
}, En = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Or = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], i0 = Object.fromEntries(Or.map((e) => [e.key, e]));
function s0(e, t) {
  return `mcp.${e}.${t}`;
}
function c0(e) {
  return Object.keys(En).includes(e);
}
function d0(e) {
  return En[e !== void 0 && c0(e) ? e : "unknown"];
}
function it({ column: e, children: t }) {
  const a = i0[e];
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
function iL() {
  return /* @__PURE__ */ n("tr", { children: Or.map((e) => /* @__PURE__ */ n(
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
function u0({ server: e }) {
  const t = En[e.connection];
  return /* @__PURE__ */ l("tr", { className: F.row, children: [
    /* @__PURE__ */ l(it, { column: "name", children: [
      /* @__PURE__ */ l("span", { className: F.head, children: [
        /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Ln(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ l("span", { className: F.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(it, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(it, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(it, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(it, { column: "tools", children: e.tools.map((a) => s0(e.name, a)).join(" · ") })
  ] });
}
function h0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function m0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function w0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${F.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: e });
}
function _0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function f0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function v0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: F.row, children: [
    /* @__PURE__ */ l("td", { className: F.cell, children: [
      /* @__PURE__ */ n("span", { className: `${F.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: h0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(m, { ...m0(e) }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(w0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(m, { ...d0(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: F.cell, children: [
      /* @__PURE__ */ n(_0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(f0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function sL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(v0, { ...e }) : /* @__PURE__ */ n(u0, { ...e });
}
const b0 = "_row_1ibo7_2", p0 = "_headCell_1ibo7_14", g0 = "_cell_1ibo7_15", y0 = "_name_1ibo7_26", N0 = "_consequence_1ibo7_32", k0 = "_reason_1ibo7_38", $0 = "_value_1ibo7_44", C0 = "_webRow_1ibo7_60", S0 = "_webSetting_1ibo7_73", R0 = "_webName_1ibo7_81", T0 = "_webConsequence_1ibo7_89", x0 = "_webControl_1ibo7_95", L0 = "_webState_1ibo7_109", A0 = "_webChip_1ibo7_114", P = {
  row: b0,
  headCell: p0,
  cell: g0,
  name: y0,
  consequence: N0,
  reason: k0,
  value: $0,
  webRow: C0,
  webSetting: S0,
  webName: R0,
  webConsequence: T0,
  webControl: x0,
  webState: L0,
  webChip: A0
}, Fr = 104, Dr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function E0({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ye, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(tr, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: P.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function I0({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = y(), i = Dr[a], s = a === "locked";
  return /* @__PURE__ */ l("tr", { className: P.row, "data-inheritance": a, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: P.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(E0, { control: t, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: P.cell, style: { width: Fr }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function zr(e, t) {
  return String(e ?? t);
}
function M0(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function B0(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? zr(e.value, "—");
}
function j0({ control: e, name: t, locked: a, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: P.webControl, children: [
    /* @__PURE__ */ n(Ye, { label: t, labelHidden: !0, checked: i, locked: a, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ n("span", { className: P.webState, "aria-hidden": "true", children: a || i ? "on" : "off" })
  ] });
}
function P0(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(j0, { ...e });
  const o = M0(t, a);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: P.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(tr, { options: o, value: zr(t.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: B0(t) });
}
function q0({ setting: e, control: t, inheritance: a, reason: r, onChange: o, renderControl: i }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ l("div", { className: `${P.row} ${P.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ l("span", { className: P.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${P.name} ${P.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: s, className: `${P.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: P.webControl, children: i(s) }) : /* @__PURE__ */ n(P0, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${P.webChip} ward-policy-chip`, style: { width: Fr }, children: /* @__PURE__ */ n(m, { ...Dr[a], size: "tag" }) })
  ] });
}
function cL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(q0, { ...e }) : /* @__PURE__ */ n(I0, { ...e });
}
const H0 = "_label_h9m4w_7", O0 = "_name_h9m4w_15", F0 = "_column_h9m4w_24", D0 = "_webFrame_h9m4w_57", z0 = "_webHead_h9m4w_62", W0 = "_webHeadLabel_h9m4w_74", K0 = "_webLabel_h9m4w_117", G0 = "_webColumns_h9m4w_124", U0 = "_webGroup_h9m4w_130", V0 = "_webPeople_h9m4w_131", Y0 = "_webVia_h9m4w_132", J0 = "_webMeta_h9m4w_161", G = {
  label: H0,
  name: O0,
  column: F0,
  webFrame: D0,
  webHead: z0,
  webHeadLabel: W0,
  webLabel: K0,
  webColumns: G0,
  webGroup: U0,
  webPeople: V0,
  webVia: Y0,
  webMeta: J0
}, Q0 = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, tn = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function nn({ column: e, children: t }) {
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
function X0(e) {
  if (!e.matrixRole) return;
  const t = Q0[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function Z0({ node: e }) {
  const t = X0(e);
  return /* @__PURE__ */ l("span", { className: G.label, children: [
    /* @__PURE__ */ n("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ n(eC, { role: t, node: e }),
    /* @__PURE__ */ n(nn, { column: tn[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(nn, { column: tn[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(nn, { column: tn[2], children: e.requestedVia ?? "" })
  ] });
}
function eC({ role: e, node: t }) {
  return /* @__PURE__ */ l(x, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function tC({ index: e, depth: t, node: a, expanded: r, leaf: o, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    sr,
    {
      index: e,
      depth: t,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(Z0, { node: a }),
      children: s
    }
  );
}
function an({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function nC({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(an, { className: `${G.webMeta} ${G.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(an, { className: `${G.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(an, { className: `${G.webMeta} ${G.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function aC() {
  return /* @__PURE__ */ l("div", { className: G.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: G.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: G.webColumns, children: [
      /* @__PURE__ */ n("span", { className: G.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: G.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: G.webVia, children: "Requested via" })
    ] })
  ] });
}
function rC({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function oC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function lC({ rows: e, label: t }) {
  return /* @__PURE__ */ l("div", { className: G.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(aC, {}),
    /* @__PURE__ */ n(jw, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      sr,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(rC, { row: a }),
        detail: /* @__PURE__ */ n(nC, { row: a }),
        expanded: oC(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function dL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(lC, { ...e }) : /* @__PURE__ */ n(tC, { ...e });
}
const iC = "_runbook_b9agc_2", sC = "_list_b9agc_7", cC = "_step_b9agc_15", dC = "_numeral_b9agc_21", uC = "_body_b9agc_28", hC = "_head_b9agc_34", mC = "_title_b9agc_40", wC = "_detail_b9agc_45", _C = "_actions_b9agc_50", fC = "_webList_b9agc_56", vC = "_webStep_b9agc_60", bC = "_webBody_b9agc_66", pC = "_webTitle_b9agc_74", gC = "_webDetail_b9agc_78", M = {
  runbook: iC,
  list: sC,
  step: cC,
  numeral: dC,
  body: uC,
  head: hC,
  title: mC,
  detail: wC,
  actions: _C,
  webList: fC,
  webStep: vC,
  webBody: bC,
  webTitle: pC,
  webDetail: gC
}, Wr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Kr(e) {
  return String(e + 1).padStart(2, "0");
}
function yC({ step: e, index: t, connection: a }) {
  const r = Wr[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: M.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: M.numeral, children: Kr(t) }),
    /* @__PURE__ */ l("span", { className: M.body, children: [
      /* @__PURE__ */ l("span", { className: M.head, children: [
        /* @__PURE__ */ n("span", { className: M.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        o && e.startedAt && /* @__PURE__ */ n(Ae, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ n("span", { className: M.detail, children: e.detail })
    ] })
  ] });
}
function NC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: M.list, children: e.map((r, o) => /* @__PURE__ */ n(yC, { step: r, index: o, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: M.actions, children: t })
  ] });
}
function kC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ l("li", { className: `${M.step} ${M.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${M.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Kr(t) }),
    /* @__PURE__ */ l("span", { className: `${M.body} ${M.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${M.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${M.title} ${M.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Wr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Ae, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${M.detail} ${M.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function $C({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${M.list} ${M.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(kC, { step: r, index: o, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${M.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function uL(e) {
  return "presentation" in e ? /* @__PURE__ */ n($C, { ...e }) : /* @__PURE__ */ n(NC, { ...e });
}
const CC = "_list_1gu6a_2", SC = "_check_1gu6a_10", RC = "_body_1gu6a_16", TC = "_text_1gu6a_23", xC = "_pending_1gu6a_32", LC = "_measured_1gu6a_37", tt = {
  list: CC,
  check: SC,
  body: RC,
  text: TC,
  pending: xC,
  measured: LC
};
function AC(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function EC({ check: e }) {
  const t = AC(e.passed);
  return /* @__PURE__ */ l("li", { className: `${tt.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n($n, { state: t.state, label: t.label }),
    /* @__PURE__ */ l("span", { className: tt.body, children: [
      /* @__PURE__ */ n("span", { className: tt.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ l("span", { className: tt.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: tt.measured, children: e.measured })
  ] });
}
function hL({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${tt.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(EC, { check: t }, t.text)) });
}
const IC = "_root_y6bbq_2", MC = "_list_y6bbq_10", BC = "_line_y6bbq_32", jC = "_at_y6bbq_59", PC = "_text_y6bbq_63", qC = "_foot_y6bbq_67", HC = "_idle_y6bbq_79", OC = "_caret_y6bbq_87", FC = "_jump_y6bbq_94", ve = {
  root: IC,
  list: MC,
  line: BC,
  at: jC,
  text: PC,
  foot: qC,
  idle: HC,
  caret: OC,
  jump: FC
}, DC = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function In(e) {
  return Number.isNaN(Date.parse(e)) ? "" : DC.format(new Date(e));
}
const zC = { warn: "warning", ok: "ok" };
function WC({ kind: e }) {
  const t = zC[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function KC({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${In(e)}` });
}
function GC({ connection: e, idleSince: t, last: a, children: r }) {
  const o = [t, a == null ? void 0 : a.at, ""].find(Boolean), i = {
    stale: `no new events as of ${In(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${ve.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ve.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ve.idle, children: i }),
    /* @__PURE__ */ n(KC, { at: a == null ? void 0 : a.at }),
    r
  ] });
}
const UC = 8;
function VC(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > UC;
}
function YC({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const Gr = Ne(null);
function mL({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, o] = p(!1), i = ga(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(Gr.Provider, { value: i, children: a });
}
function JC() {
  const e = ye(Gr), [t, a] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const QC = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function wL({ lines: e, connection: t, idleSince: a, label: r = "Live activity", fixed: o }) {
  const i = f(null), [s, c] = p(0), [d, u] = JC(), [h, w] = p(!1), _ = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), at(() => {
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
  return /* @__PURE__ */ l("div", { className: ve.root, children: [
    /* @__PURE__ */ n("ol", { className: ve.list, ref: i, "aria-live": d ? "polite" : "off", "aria-label": r, ...QC(e.length, o), onScroll: (k) => w(VC(k.currentTarget)), children: e.map((k, E) => /* @__PURE__ */ l("li", { className: `${ve.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": E < s, children: [
      /* @__PURE__ */ n("span", { className: ve.at, children: In(k.at) }),
      /* @__PURE__ */ n(WC, { kind: k.kind }),
      /* @__PURE__ */ n("span", { className: ve.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${E}`)) }),
    /* @__PURE__ */ l(GC, { connection: t, idleSince: a, last: _, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(YC, { shown: h, onJump: N })
    ] })
  ] });
}
const XC = "_row_1k8wl_2", ZC = "_head_1k8wl_14", eS = "_author_1k8wl_20", tS = "_eta_1k8wl_25", nS = "_edited_1k8wl_26", aS = "_body_1k8wl_32", rS = "_reason_1k8wl_37", oS = "_actions_1k8wl_42", Ce = {
  row: XC,
  head: ZC,
  author: eS,
  eta: tS,
  edited: nS,
  body: aS,
  reason: rS,
  actions: oS
}, lS = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function iS(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function sS({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function cS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Ce.reason, id: t, children: e })
  ] });
}
function dS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function uS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(sS, { ...e }) : /* @__PURE__ */ n(cS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function _L(e) {
  const { comment: t } = e;
  dS(e);
  const a = y(), r = `${a}-unavailable`, o = lS[t.delivery];
  return /* @__PURE__ */ l("div", { className: `${Ce.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: Ce.head, children: [
      /* @__PURE__ */ n("span", { className: Ce.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: Ce.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Ce.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Ce.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Ce.reason, id: a, children: iS(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Ce.actions, children: /* @__PURE__ */ n(uS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const hS = "_root_rvhdw_2", mS = "_attach_rvhdw_11", wS = "_actions_rvhdw_17", _S = "_reply_rvhdw_23", fS = "_replyField_rvhdw_28", vS = "_send_rvhdw_54", bS = "_sendIcon_rvhdw_65", pS = "_sendsAs_rvhdw_75", Oe = {
  root: hS,
  attach: mS,
  actions: wS,
  reply: _S,
  replyField: fS,
  send: vS,
  sendIcon: bS,
  sendsAs: pS
};
function Ur({ value: e, onChange: t }) {
  const [a, r] = p("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function gS() {
  return /* @__PURE__ */ n("svg", { className: Oe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function yS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function NS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [o, i] = Ur(e), s = y(), c = () => {
    o.trim() !== "" && r(a, o);
  }, d = (u) => {
    yS(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ l("div", { className: Oe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: Oe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ n(q, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: o, onChange: i, describedBy: s }),
      /* @__PURE__ */ l(b, { variant: "primary", className: Oe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ n(gS, {}),
        /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Oe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function fL(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(NS, { ...e }) : /* @__PURE__ */ n(kS, { ...e });
}
function kS(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: o, onPost: i, onDraft: s } = e, [c, d] = Ur(e);
  return /* @__PURE__ */ l("div", { className: Oe.root, children: [
    /* @__PURE__ */ n(q, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ l("div", { className: Oe.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    o && /* @__PURE__ */ n(
      Ma,
      {
        label: `Requeue ${o.agent} after posting`,
        consequence: o.consequence,
        checked: o.checked,
        onChange: o.onChange
      }
    ),
    /* @__PURE__ */ l("div", { className: Oe.actions, children: [
      /* @__PURE__ */ n(b, { variant: "primary", onClick: () => i(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const $S = "_list_1yhks_2", CS = "_item_1yhks_6", SS = "_body_1yhks_22", RS = "_text_1yhks_28", TS = "_evidence_1yhks_37", xS = "_consequence_1yhks_49", LS = "_note_1yhks_54", Ve = {
  list: $S,
  item: CS,
  body: SS,
  text: RS,
  evidence: TS,
  consequence: xS,
  note: LS
};
function AS({ criterion: e }) {
  return /* @__PURE__ */ n(ze, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function _a({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function ES(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function IS({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Ve.body, children: [
    /* @__PURE__ */ n("span", { className: Ve.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(_a, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Ve.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(_a, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Ve.consequence, children: ES(e.why) })
    ] })
  ] });
}
function MS({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Ve.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(AS, { criterion: e }),
    /* @__PURE__ */ n(IS, { criterion: e })
  ] });
}
function vL({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Ve.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(MS, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ n("p", { className: Ve.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const BS = "_list_dwhoz_2", jS = "_rung_dwhoz_6", PS = "_name_dwhoz_18", qS = "_actor_dwhoz_32", Lt = {
  list: BS,
  rung: jS,
  name: PS,
  actor: qS
}, HS = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function OS({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = HS[e.state];
  return /* @__PURE__ */ l("li", { className: Lt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: Lt.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${Lt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function bL({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Lt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(OS, { rung: t }, t.name)) });
}
const FS = "_sheet_pw37w_2", DS = "_title_pw37w_9", zS = "_stage_pw37w_15", WS = "_effects_pw37w_20", KS = "_effect_pw37w_20", GS = "_numeral_pw37w_31", US = "_effectText_pw37w_38", VS = "_refusals_pw37w_43", YS = "_reasons_pw37w_52", JS = "_reason_pw37w_52", QS = "_actions_pw37w_62", we = {
  sheet: FS,
  title: DS,
  stage: zS,
  effects: WS,
  effect: KS,
  numeral: GS,
  effectText: US,
  refusals: VS,
  reasons: YS,
  reason: JS,
  actions: QS
};
function XS({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function pL({ run: e, effects: t, refusals: a, cost: r, onRequeue: o, onClose: i, returnFocusTo: s }) {
  const c = y(), d = `${c}-refusal`, [u, h] = p(""), w = a.length > 0;
  return /* @__PURE__ */ n(lt, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ l("div", { className: we.sheet, children: [
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
      _m,
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
      /* @__PURE__ */ n(XS, { refused: w, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ n(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const ZS = "_list_1laeg_2", e2 = "_path_1laeg_7", t2 = "_head_1laeg_21", n2 = "_label_1laeg_28", a2 = "_consequence_1laeg_35", ct = {
  list: ZS,
  path: e2,
  head: t2,
  label: n2,
  consequence: a2
}, wn = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function fa(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function va(e) {
  return e ? "primary" : "secondary";
}
function r2({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: va(t), size: "sm", onClick: () => a(e.kind), children: wn[e.kind] }) : /* @__PURE__ */ n(b, { variant: va(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: wn[e.kind] });
}
function o2({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: ct.path, "data-allowed": e.allowed, "data-role": fa(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: ct.head, children: [
      /* @__PURE__ */ n("span", { className: ct.label, children: e.title ?? wn[e.kind] }),
      /* @__PURE__ */ n(m, { role: fa(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: ct.consequence, children: e.consequence }),
    /* @__PURE__ */ n(r2, { path: e, primary: t, onChoose: a })
  ] });
}
function gL({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: ct.list, children: e.map((a, r) => /* @__PURE__ */ n(o2, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const l2 = "_list_1m7i0_2", i2 = "_item_1m7i0_6", s2 = "_node_1m7i0_18", c2 = "_body_1m7i0_24", d2 = "_head_1m7i0_30", u2 = "_stage_1m7i0_36", h2 = "_version_1m7i0_41", m2 = "_sentence_1m7i0_49", w2 = "_meta_1m7i0_54", Re = {
  list: l2,
  item: i2,
  node: s2,
  body: c2,
  head: d2,
  stage: u2,
  version: h2,
  sentence: m2,
  meta: w2
}, _2 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function f2({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: Re.head, children: [
    /* @__PURE__ */ n("span", { className: Re.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Re.version, title: e.version, children: e.version }) : null
  ] });
}
function v2({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${Re.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Re.node} ward-history-node`, children: /* @__PURE__ */ n(ze, { size: 9, kind: _2[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${Re.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(f2, { entry: e }),
      /* @__PURE__ */ n("span", { className: Re.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${Re.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function yL({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Re.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(v2, { entry: t }, t.stage + String(a))) });
}
const b2 = "_thread_1e70p_3", p2 = "_turn_1e70p_8", g2 = "_who_1e70p_27", y2 = "_body_1e70p_32", At = {
  thread: b2,
  turn: p2,
  who: g2,
  body: y2
}, Vr = Ne(!1);
function NL({ children: e, density: t }) {
  return /* @__PURE__ */ n(Vr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${At.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function kL({ turn: e }) {
  if (!ye(Vr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${At.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${At.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${At.body} ward-chat-body`, children: e.body })
  ] });
}
const N2 = "_list_yiolt_3", k2 = "_row_yiolt_7", $2 = "_label_yiolt_20", C2 = "_n_yiolt_26", S2 = "_cause_yiolt_33", ht = {
  list: N2,
  row: k2,
  label: $2,
  n: C2,
  cause: S2
};
function R2(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const T2 = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function x2({ row: e, formatNumber: t }) {
  return R2(e), /* @__PURE__ */ l("li", { className: `${ht.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(ze, { size: 8, ...T2[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: ht.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${ht.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(L2, { cause: e.cause })
  ] });
}
function L2({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${ht.cause} ward-healthrow-cause`, children: e }) : null;
}
function $L({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${ht.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(x2, { row: a, formatNumber: t }, a.label)) });
}
const A2 = "_root_1jxwp_2", E2 = {
  root: A2
};
function CL({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: E2.root, "data-density": o, children: [
    /* @__PURE__ */ n(Vt, { items: e, note: t, density: o }),
    /* @__PURE__ */ n(b, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const I2 = "_row_dhbre_3", M2 = "_key_dhbre_13", B2 = "_stack_dhbre_24", j2 = "_value_dhbre_32", P2 = "_evidence_dhbre_39", q2 = "_mark_dhbre_47", Ze = {
  row: I2,
  key: M2,
  stack: B2,
  value: j2,
  evidence: P2,
  mark: q2
};
function H2({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n($n, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function SL({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Ze.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Ze.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Ze.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Ze.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Ze.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Ze.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(H2, { state: e.state }) })
  ] });
}
const O2 = "_cell_gh2sd_2", F2 = {
  cell: O2
}, D2 = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function z2(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function W2(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function K2(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: z2(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function G2(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function RL({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  W2(e, a);
  const r = G2(e);
  return /* @__PURE__ */ n(
    xm,
    {
      label: "Rejection routing",
      columns: D2,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: F2.cell, "data-norerun": o.noRerun ? !0 : void 0, children: K2(o, i) }),
      empty: t ?? /* @__PURE__ */ n(N_, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const U2 = "_row_1f2re_2", V2 = "_title_1f2re_12", Y2 = "_turns_1f2re_18", J2 = "_waiting_1f2re_19", Q2 = "_resolved_1f2re_20", X2 = "_activity_1f2re_21", Z2 = "_cost_1f2re_28", eR = "_link_1f2re_29", tR = "_tableLink_1f2re_47", nR = "_tableRecord_1f2re_48", aR = "_tableRow_1f2re_59", rR = "_tableTitle_1f2re_71", oR = "_tableResolved_1f2re_76", lR = "_tableMeta_1f2re_87", iR = "_tableCost_1f2re_94", sR = "_tableActivity_1f2re_95", cR = "_tableState_1f2re_105", z = {
  row: U2,
  title: V2,
  turns: Y2,
  waiting: J2,
  resolved: Q2,
  activity: X2,
  cost: Z2,
  link: eR,
  tableLink: tR,
  tableRecord: nR,
  tableRow: aR,
  tableTitle: rR,
  tableResolved: oR,
  tableMeta: lR,
  tableCost: iR,
  tableActivity: sR,
  tableState: cR
}, Yr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function dR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function uR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function hR(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const mR = { duplicate: "Closed · duplicate" };
function wR({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(rt, { className: z.tableMeta, text: `waiting on ${e}` });
}
function _R({ value: e }) {
  return /* @__PURE__ */ n("td", { className: z.tableCost, children: e === void 0 ? null : le(e) });
}
function fR({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${z.tableRecord} ward-target`, href: L(e.href), children: `→ ${e.key}` });
}
function vR({ session: e, href: t }) {
  const a = Yr[e.state];
  return /* @__PURE__ */ l("tr", { className: z.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: z.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${z.tableLink} ward-target`, href: L(t), children: /* @__PURE__ */ n(rt, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: z.tableMeta, children: uR(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: z.tableResolved, children: [
      hR(e.resolved),
      /* @__PURE__ */ n(wR, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(_R, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: z.tableActivity, children: dR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: z.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: mR[e.state] ?? a.label }),
      /* @__PURE__ */ n(fR, { link: e.link })
    ] }) })
  ] });
}
function bR({ session: e }) {
  const t = Yr[e.state];
  return /* @__PURE__ */ l("div", { className: z.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(rt, { className: z.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: z.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(rt, { className: z.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: z.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: z.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : le(e.cost) }),
    /* @__PURE__ */ n("span", { className: z.activity, children: he(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: z.link, href: L(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function TL(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(vR, { session: e.session, href: e.href }) : /* @__PURE__ */ n(bR, { session: e.session });
}
const pR = "_block_1yy2v_3", gR = "_list_1yy2v_9", yR = "_line_1yy2v_14", _n = {
  block: pR,
  list: gR,
  line: yR
}, NR = { warn: "warning", ok: "ok" };
function kR({ kind: e }) {
  const t = NR[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function $R({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${_n.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(kR, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function xL({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${_n.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: _n.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n($R, { line: a }, `${r}-${a.text}`)) }) });
}
const CR = "_band_tt7hp_1", SR = "_head_tt7hp_8", RR = "_cell_tt7hp_19", TR = "_index_tt7hp_35", xR = "_title_tt7hp_42", LR = "_note_tt7hp_48", AR = "_cellTitle_tt7hp_53", ER = "_cellBody_tt7hp_58", IR = "_tag_tt7hp_64", $e = {
  band: CR,
  head: SR,
  cell: RR,
  index: TR,
  title: xR,
  note: LR,
  cellTitle: AR,
  cellBody: ER,
  tag: IR
}, ba = 4;
function LL({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== ba)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${ba}-cell grid`);
  return /* @__PURE__ */ l("section", { className: $e.band, "aria-label": `${e} ${t}`, children: [
    /* @__PURE__ */ l("div", { className: $e.head, children: [
      /* @__PURE__ */ n("span", { className: $e.index, children: e }),
      /* @__PURE__ */ n("span", { className: $e.title, children: t }),
      /* @__PURE__ */ n("span", { className: $e.note, children: a })
    ] }),
    r.map((o) => /* @__PURE__ */ l("div", { className: $e.cell, children: [
      /* @__PURE__ */ n("span", { className: $e.cellTitle, children: o.title }),
      /* @__PURE__ */ n("span", { className: $e.cellBody, children: o.body }),
      o.tag !== void 0 && /* @__PURE__ */ n("span", { className: $e.tag, children: o.tag })
    ] }, o.title))
  ] });
}
const MR = "_tag_1yuvz_2", BR = "_link_1yuvz_14", rn = {
  tag: MR,
  link: BR
};
function AL({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: rn.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${rn.tag} ${rn.link}`, href: L(t), children: e });
}
const jR = "_eyebrow_m8swv_2", PR = "_link_m8swv_10", pa = {
  eyebrow: jR,
  link: PR
};
function Mn({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: pa.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${pa.link} ward-target`, href: L(t), children: e }) });
}
const qR = "_figure_qz9i7_2", HR = "_media_qz9i7_9", OR = "_caption_qz9i7_35", on = {
  figure: qR,
  media: HR,
  caption: OR
};
function FR(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(x, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function EL(e) {
  return /* @__PURE__ */ l("figure", { className: on.figure, children: [
    /* @__PURE__ */ n("div", { className: on.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(FR, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: on.caption, children: e.caption })
  ] });
}
function Bn(e) {
  return `h${e}`;
}
function DR(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const zR = "_prose_1fxb9_2", WR = "_anchor_1fxb9_79", Jr = {
  prose: zR,
  anchor: WR
};
function IL({ children: e }) {
  return /* @__PURE__ */ n("div", { className: Jr.prose, children: e });
}
function ML({ level: e, children: t, id: a }) {
  const r = Bn(e), o = a ?? DR(t);
  return /* @__PURE__ */ l(r, { id: o, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${Jr.anchor} ward-target`, href: `#${o}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const KR = "_list_176jq_2", GR = "_pair_176jq_8", UR = "_term_176jq_14", VR = "_value_176jq_19", kt = {
  list: KR,
  pair: GR,
  term: UR,
  value: VR
};
function BL({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: kt.list, children: e.map((t) => /* @__PURE__ */ l("div", { className: kt.pair, children: [
    /* @__PURE__ */ n("dt", { className: kt.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: kt.value, children: t.value })
  ] }, t.term)) });
}
const YR = "_nav_sgeyg_2", JR = "_item_sgeyg_6", QR = "_link_sgeyg_13", XR = "_note_sgeyg_30", $t = {
  nav: YR,
  item: JR,
  link: QR,
  note: XR
};
function jL({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: $t.nav, children: /* @__PURE__ */ n(Em, { children: t.map((a) => /* @__PURE__ */ l("li", { className: $t.item, children: [
    /* @__PURE__ */ n("a", { className: `${$t.link} ward-target`, href: L(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: $t.note, children: a.note })
  ] }, a.href)) }) });
}
const ZR = "_header_kelio_2", eT = "_skip_kelio_14", tT = "_brand_kelio_39", nT = "_list_kelio_46", aT = "_link_kelio_56", et = {
  header: ZR,
  skip: eT,
  brand: tT,
  list: nT,
  link: aT
};
function PL({ brand: e, links: t, current: a, homeHref: r = "/", mainId: o = "main", skipLabel: i = "Skip to content" }) {
  return /* @__PURE__ */ l("header", { className: et.header, children: [
    /* @__PURE__ */ n("a", { className: et.skip, href: `#${o}`, children: i }),
    /* @__PURE__ */ n("a", { className: `${et.brand} ward-target`, href: L(r), children: e }),
    /* @__PURE__ */ n("nav", { "aria-label": "Main", className: et.nav, children: /* @__PURE__ */ n("ul", { className: et.list, role: "list", children: t.map((s) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${et.link} ward-target`, href: L(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const rT = "_footer_1jb5e_2", oT = "_note_1jb5e_12", lT = "_list_1jb5e_18", iT = "_link_1jb5e_27", Ct = {
  footer: rT,
  note: oT,
  list: lT,
  link: iT
};
function qL({ note: e, links: t = [], label: a = "Footer" }) {
  return /* @__PURE__ */ l("footer", { className: Ct.footer, children: [
    /* @__PURE__ */ n("p", { className: Ct.note, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("nav", { "aria-label": a, children: /* @__PURE__ */ n("ul", { className: Ct.list, role: "list", children: t.map((r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${Ct.link} ward-target`, href: L(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const sT = "_intro_13128_2", cT = "_title_13128_9", dT = "_lead_13128_17", ln = {
  intro: sT,
  title: cT,
  lead: dT
};
function HL({ title: e, eyebrow: t, eyebrowHref: a, lead: r, headingLevel: o = 1, children: i }) {
  const s = Bn(o);
  return /* @__PURE__ */ l("header", { className: ln.intro, children: [
    t === void 0 ? null : /* @__PURE__ */ n(Mn, { href: a, children: t }),
    /* @__PURE__ */ n(s, { className: ln.title, children: e }),
    r === void 0 ? null : /* @__PURE__ */ n("p", { className: ln.lead, children: r }),
    i
  ] });
}
const uT = "_section_u0k7p_2", hT = "_head_u0k7p_13", mT = "_titles_u0k7p_21", wT = "_title_u0k7p_21", _T = "_link_u0k7p_34", dt = {
  section: uT,
  head: hT,
  titles: mT,
  title: wT,
  link: _T
};
function fT({ title: e, headingId: t, eyebrow: a, link: r, headingLevel: o }) {
  const i = Bn(o);
  return /* @__PURE__ */ l("div", { className: dt.head, children: [
    /* @__PURE__ */ l("div", { className: dt.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ n(Mn, { children: a }),
      /* @__PURE__ */ n(i, { className: dt.title, id: t, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ n("a", { className: `${dt.link} ward-target`, href: L(r.href), children: r.label })
  ] });
}
function OL({ title: e, children: t, id: a, eyebrow: r, link: o, headingLevel: i = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ l("section", { className: dt.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ n(fT, { title: e, headingId: d, eyebrow: r, link: o, headingLevel: i }),
    t
  ] });
}
const vT = "_split_1ycaa_2", bT = "_main_1ycaa_10", pT = "_aside_1ycaa_15", sn = {
  split: vT,
  main: bT,
  aside: pT
};
function FL({ children: e, aside: t, asideLabel: a }) {
  return /* @__PURE__ */ l("div", { className: sn.split, children: [
    /* @__PURE__ */ n("div", { className: sn.main, children: e }),
    /* @__PURE__ */ n("aside", { className: sn.aside, "aria-label": a, children: t })
  ] });
}
const gT = "_hero_ehbct_2", yT = "_text_ehbct_11", NT = "_visual_ehbct_23", kT = "_title_ehbct_28", $T = "_lead_ehbct_36", CT = "_actions_ehbct_42", ST = "_action_ehbct_42", RT = "_primary_ehbct_63", TT = "_secondary_ehbct_72", Le = {
  hero: gT,
  text: yT,
  visual: NT,
  title: kT,
  lead: $T,
  actions: CT,
  action: ST,
  primary: RT,
  secondary: TT
};
function xT({ actions: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ n("div", { className: Le.actions, children: e.map((t, a) => /* @__PURE__ */ n("a", { className: `${Le.action} ${a === 0 ? Le.primary : Le.secondary}`, href: L(t.href), children: t.label }, t.href)) });
}
function LT({ title: e, eyebrow: t, lead: a, actions: r = [] }) {
  return /* @__PURE__ */ l("div", { className: Le.text, children: [
    t === void 0 ? null : /* @__PURE__ */ n(Mn, { children: t }),
    /* @__PURE__ */ n("h1", { className: Le.title, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("p", { className: Le.lead, children: a }),
    /* @__PURE__ */ n(xT, { actions: r })
  ] });
}
function DL({ visual: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: Le.hero, "data-visual": e === void 0 ? "none" : "beside", children: [
    /* @__PURE__ */ n(LT, { ...t }),
    e === void 0 ? null : /* @__PURE__ */ n("div", { className: Le.visual, children: e })
  ] });
}
const AT = "_chain_w2k2l_2", ET = "_step_w2k2l_12", IT = "_arrow_w2k2l_19", MT = "_box_w2k2l_24", St = {
  chain: AT,
  step: ET,
  arrow: IT,
  box: MT
};
function zL({ steps: e, label: t, animate: a }) {
  return /* @__PURE__ */ n("ol", { className: St.chain, "aria-label": t, "data-ward-animate": a ?? "", children: e.map((r, o) => /* @__PURE__ */ l("li", { className: St.step, style: { "--ward-step": o }, children: [
    o === 0 ? null : /* @__PURE__ */ n("span", { className: St.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n("span", { className: St.box, children: r })
  ] }, o)) });
}
export {
  KT as ACCENT_PRESETS,
  wx as ActionStack,
  wL as ActivityConsole,
  ZT as AdminIcon,
  Db as AgentCard,
  tx as AppShell,
  Xx as AppearanceStrip,
  LL as Band,
  hx as BarChart,
  af as BoardColumn,
  Ax as BoardFootnote,
  Ex as BoardHeader,
  QT as BoardIcon,
  Nx as BoardScroller,
  b as Btn,
  WT as CHIP_ROLES,
  Mr as CREDENTIAL_COLUMNS,
  ux as Callout,
  Zx as CapabilityRow,
  $x as CardGrid,
  kL as ChatMessage,
  Ma as Checkbox,
  m as Chip,
  rt as ClampText,
  _L as ClarificationRow,
  Dx as ClauseRuleRow,
  Fx as ClauseRules,
  wr as ColourLadder,
  eL as ComponentRow,
  fL as Composer,
  Mx as ConfigRow,
  Ix as ConfigRowHead,
  Cn as ConnectionMark,
  mL as ConsoleAnnounceProvider,
  NL as Conversation,
  _m as CostMeter,
  nL as CredentialRow,
  tL as CredentialRowHead,
  vL as CriteriaList,
  qs as Crumb,
  GT as DENSITIES,
  $L as DeliveryHealth,
  Sx as DeniedState,
  YT as DisabledScope,
  Wx as DryRunRail,
  N_ as EmptyState,
  aL as EnvCard,
  Mn as Eyebrow,
  BL as FactList,
  q as Field,
  EL as Figure,
  Cx as FilteredEmpty,
  zL as FlowChain,
  nx as FoldText,
  gx as FormStack,
  Vt as GateChecklist,
  bL as GateLadder,
  xm as Grid,
  Gx as HandoffRuleRow,
  Kx as HandoffRules,
  DL as Hero,
  JT as HomeIcon,
  Bx as ItemDrawer,
  rL as KeyPanel,
  bo as LIVE_EVENT_TYPES,
  db as LegacyBoardColumn,
  Px as LegacyBoardHeader,
  qx as LegacyConfigRow,
  Ox as LegacyItemDrawer,
  ab as LegacyOverCapNote,
  Hx as LegacyPreviewRail,
  ur as LegacyWorkCard,
  jL as LinkList,
  Ae as LiveIndicator,
  Rx as LoadFailed,
  Lx as Loading,
  Or as MCP_SERVER_COLUMNS,
  $n as Mark,
  lL as MarkUpload,
  ze as Marker,
  sL as McpServerRow,
  iL as McpServerRowHead,
  Va as Menu,
  Ka as MenuButton,
  Ux as NewStreamModal,
  S_ as OverCapNote,
  gn as OverflowRow,
  lt as Overlay,
  ax as OwedCard,
  zx as PARTIAL_STEP_REASON,
  Fr as POLICY_CHIP_WIDTH,
  vx as PageFrame,
  dx as PageHeader,
  HL as PageIntro,
  Em as PlainList,
  cL as PolicyRow,
  jx as PreviewRail,
  IL as Prose,
  ML as ProseHeading,
  tn as ROLE_MATRIX_COLUMNS,
  Sr as RULE_ACTIONS,
  ar as Radio,
  CL as ReadyChecklist,
  px as RecordSection,
  pL as RequeueSheet,
  gL as ResolveBlock,
  SL as ResolvedFieldRow,
  dL as RoleMatrixRow,
  RL as RoutingTable,
  Vx as RuleRow,
  uL as RunbookSteps,
  vo as STREAM_STEPS,
  OL as Section,
  yx as SectionBand,
  ta as SectionHeader,
  tr as SegmentedControl,
  Da as Select,
  TL as SessionRow,
  ix as Sidebar,
  ex as SidebarFoldButton,
  qL as SiteFooter,
  PL as SiteHeader,
  FL as SplitLayout,
  Yx as StageColumn,
  kx as StageGrid,
  yL as StageHistory,
  ky as StageListEditor,
  rx as StageSteps,
  Tx as StaleStrip,
  Kt as StatStrip,
  _x as StatTiles,
  cx as StreamAvatar,
  Jx as StreamRow,
  XT as StudioIcon,
  bx as SubjectRail,
  Ye as Switch,
  lx as TabLinks,
  mx as TableHead,
  ox as Tabs,
  AL as Tag,
  OT as ThemeProvider,
  Qx as ToolRow,
  fx as TopBar,
  jw as Tree,
  sr as TreeRow,
  xL as TypedInputBlock,
  ii as UNSAFE_HREF,
  hL as ValidationList,
  qT as VisibilityProvider,
  HT as Visible,
  zT as WARD_VERSION,
  Ut as WorkCard,
  xx as WriteUnavailableStrip,
  dR as agoSince,
  ao as clock,
  Oy as colourStatus,
  ae as count,
  ue as duration,
  fn as elapsed,
  DT as eventSourceTransport,
  Bn as headingTag,
  Dt as isStreamStep,
  _t as isValidatedStreamStep,
  bp as ladderValidation,
  d0 as mcpConnectionChip,
  s0 as mcpToolName,
  le as money,
  be as ms,
  cr as ordered,
  ka as ratio,
  Lk as restartLabel,
  L as safeHref,
  DR as slug,
  he as stamp,
  vn as stream,
  UT as streamChip,
  Wt as streamChipProps,
  ge as streamColour,
  yo as streamHex,
  Mt as streamInitials,
  po as streamVars,
  sx as uniqueStreamInitials,
  qa as useAnchoredPanel,
  Rt as useBorderFlash,
  Ee as useDisabledScope,
  wo as useFocusTrap,
  VT as useLiveFeed,
  FT as useReturnFocus,
  Ft as useRovingTabindex,
  bn as useTicker,
  ro as useVisible,
  j as v,
  oL as validateMark,
  vt as validatedStep,
  Ca as validatedStreamSteps
};
