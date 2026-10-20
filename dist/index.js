import { jsx as n, Fragment as x, jsxs as l } from "react/jsx-runtime";
import { useMemo as pa, useContext as ye, createContext as Ne, useState as p, useEffect as S, useCallback as te, useRef as _, useLayoutEffect as at, useId as y, Fragment as ga, isValidElement as Qr, Children as Xr } from "react";
import { createPortal as Zr, flushSync as ya } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const Bn = (e) => String(e).padStart(2, "0");
function fn(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${Bn(t % 60)}s` : `${Math.floor(a / 60)}h ${Bn(a % 60)}m`;
}
const eo = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const t = eo.formatToParts(new Date(e)), a = (r) => {
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
function Na(e, t) {
  return `${e} / ${t}`;
}
const to = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function no(e) {
  return to.format(new Date(e));
}
const ka = Ne(/* @__PURE__ */ new Set());
function IT({ hidden: e, children: t }) {
  const a = pa(() => new Set(e), [e]);
  return /* @__PURE__ */ n(ka.Provider, { value: a, children: t });
}
function ao(e) {
  return !ye(ka).has(e);
}
function MT({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: ao(e) ? t : a });
}
const ro = "(prefers-color-scheme: dark)";
function jn() {
  return typeof window.matchMedia == "function" ? window.matchMedia(ro) : null;
}
function oo(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = jn()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? jn() : null;
    if (!r) return;
    const o = () => a(r.matches);
    return o(), r.addEventListener("change", o), () => r.removeEventListener("change", o);
  }, [e]), t;
}
function Vt(e, t) {
  S(() => {
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function lo(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function BT({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const o = oo(e === "system");
  return Vt("data-theme", lo(e, o)), Vt("data-accent", t), Vt("data-density", a), /* @__PURE__ */ n(x, { children: r });
}
const io = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function so(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function co(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function uo(e, t, a, r) {
  return e.shiftKey ? so(t, a) ? r : void 0 : document.activeElement === r || co(t) ? a : void 0;
}
function ho(e, t, a) {
  const r = a[0], o = a[a.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = uo(e, t, r, o);
  i && (e.preventDefault(), i.focus());
}
function mo(e) {
  return { onKeyDown: te(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(io));
      ho(a, e.current, r);
    },
    [e]
  ) };
}
function jT(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [t, e]);
}
const Pn = { ArrowUp: -1, ArrowDown: 1 }, qn = { ArrowLeft: -1, ArrowRight: 1 }, wo = (e, t, a) => Math.min(a, Math.max(t, e));
function fo(e, t) {
  if (t !== "horizontal" && e in Pn) return Pn[e];
  if (t !== "vertical" && e in qn) return qn[e];
}
function Ot({ orientation: e = "both" } = {}) {
  const [t, a] = p(0), r = _(/* @__PURE__ */ new Map()), o = _(!1);
  at(() => {
    var f;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(t)) return;
    const h = u[0], w = o.current;
    o.current = !1, a(h), w && ((f = r.current.get(h)) == null || f.focus());
  });
  const i = te((u) => a(u), []), s = te((u) => {
    var h;
    a(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = te(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(t)), f = fo(u.key, e);
      f !== void 0 ? (u.preventDefault(), s(h[wo(w + f, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
const PT = (e, t, a) => {
  const r = new EventSource(e), o = (i) => a.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, qT = "0.2.0", HT = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], _o = [1, 2, 3, 4, 5, 6], $a = [1, 2, 3], vo = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], OT = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], DT = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], j = {
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
function _n(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Dt(e) {
  return _o.includes(e);
}
function ft(e) {
  return $a.includes(e);
}
function bo(e) {
  if (!Dt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function FT(e) {
  if (!Dt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const po = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function go(e) {
  if (!Dt(e)) throw new Error("unvalidated stream step");
  return po[e];
}
function Hn(e) {
  return typeof e != "string" ? null : vo.includes(e) ? e : null;
}
function yo(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function No(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function ko(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function $o(e, t, a) {
  const r = yo(e);
  if (r === null) return null;
  const o = Hn(a) ?? Hn(r.type);
  return o === null ? null : { ...r, type: o, id: No(r, t), at: ko(r) };
}
function Co(e, t) {
  return e >= be.staleAfter ? "stale" : e >= be.heartbeat && t === "live" ? "reconnecting" : null;
}
function So(e, t, a) {
  return e >= be.heartbeat && !t && a !== null;
}
function zT(e, t) {
  const [a, r] = p("reconnecting"), [o, i] = p(null), s = _(/* @__PURE__ */ new Map()), c = _(0), d = _(""), u = _(0), h = _(null), w = _(0), f = _(0), N = _(!1), k = _("reconnecting"), E = te((T) => {
    k.current = T, r(T);
  }, []), H = te(() => {
    c.current = Date.now();
  }, []), me = te((T) => {
    for (const [J, ke] of s.current)
      (ke === "*" || T.itemKey === ke) && J(T);
  }, []), re = te(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (T, J, ke) => {
        const We = $o(T, J, ke);
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
  return S(() => (re(), f.current = window.setInterval(() => {
    const T = Date.now() - c.current, J = Co(T, k.current);
    J && E(J);
    const ke = h.current;
    So(T, N.current, ke) && Ie(ke);
  }, be.tick), () => {
    var T;
    window.clearInterval(f.current), window.clearTimeout(w.current), N.current = !1, (T = h.current) == null || T.close(), h.current = null;
  }), [re, Ie, E]), { connection: a, lastEventAt: o, subscribe: Je };
}
function vn(e, t) {
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
const Ro = { blue: "running", orange: "waiting", green: "done" };
function To() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function On(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function St(e, t) {
  const a = _(0), r = te((o) => {
    const i = o ?? t, s = e.current;
    s !== null && i !== void 0 && (To() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${Ro[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => On(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => On(s), be.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (o) => r(o) : () => r(t);
}
const xo = "_root_1otpc_2", Lo = {
  root: xo
};
function Ao(e, t, a, r, o) {
  const i = [fn(t)];
  return e || i.push(`as of ${no(a)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function Ae({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const o = a !== "stale", i = vn(e, o), s = (t == null ? void 0 : t.at) ?? e, c = Ao(o, i, s, r, t);
  return /* @__PURE__ */ l("span", { className: `${Lo.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const Eo = "_app_1bnco_1", Io = "_side_1bnco_35", Mo = "_sideTop_1bnco_46", Bo = "_sideBody_1bnco_60", jo = "_iconRail_1bnco_99", Po = "_railItem_1bnco_108", qo = "_railIcon_1bnco_129", Ho = "_railDot_1bnco_134", Oo = "_railLetter_1bnco_140", Do = "_main_1bnco_146", Fo = "_rail_1bnco_108", zo = "_page_1bnco_168", Wo = "_headerRow_1bnco_191", Ko = "_sidebarToggle_1bnco_198", Go = "_headerSlot_1bnco_203", Uo = "_headerAction_1bnco_208", Vo = "_drawerSide_1bnco_213", Yo = "_root_1bnco_260", Jo = "_topbar_1bnco_267", Qo = "_mark_1bnco_278", Xo = "_brand_1bnco_285", Zo = "_tagline_1bnco_291", el = "_identity_1bnco_297", tl = "_tools_1bnco_298", nl = "_nav_1bnco_308", al = "_metadata_1bnco_315", rl = "_actor_1bnco_330", ol = "_detail_1bnco_331", ll = "_content_1bnco_376", il = "_toolsPanel_1bnco_392", sl = "_skip_1bnco_418", C = {
  app: Eo,
  side: Io,
  sideTop: Mo,
  sideBody: Bo,
  iconRail: jo,
  railItem: Po,
  railIcon: qo,
  railDot: Ho,
  railLetter: Oo,
  main: Do,
  rail: Fo,
  page: zo,
  headerRow: Wo,
  sidebarToggle: Ko,
  headerSlot: Go,
  headerAction: Uo,
  drawerSide: Vo,
  root: Yo,
  topbar: Jo,
  mark: Qo,
  brand: Xo,
  tagline: Zo,
  identity: el,
  tools: tl,
  nav: nl,
  metadata: al,
  actor: rl,
  detail: ol,
  content: ll,
  toolsPanel: il,
  skip: sl
};
function ot(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const cl = "_scope_1an6i_2", dl = {
  scope: cl
}, Ca = Ne(null);
function WT({ reason: e, actions: t = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ l("fieldset", { disabled: !0, className: `${dl.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(Ca.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Ee() {
  return ye(Ca);
}
function Ft(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : ot(e, t.reasonId);
}
const ul = "_btn_hrmlj_2", hl = "_primary_hrmlj_14", ml = "_destructive_hrmlj_25", wl = "_secondary_hrmlj_35", fl = "_ghost_hrmlj_40", _l = "_overflow_hrmlj_49", vl = "_sm_hrmlj_56", bl = "_disabled_hrmlj_60", pl = "_withReason_hrmlj_68", gl = "_reason_hrmlj_74", nt = {
  btn: ul,
  primary: hl,
  destructive: ml,
  secondary: wl,
  ghost: fl,
  overflow: _l,
  sm: vl,
  disabled: bl,
  withReason: pl,
  reason: gl
};
function yl(e, t, a, r) {
  const o = t === "sm" ? [nt.sm, "ward-btn--sm"] : [], i = a ? [nt.disabled] : [];
  return [nt.btn, nt[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Nl(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function kl(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function $l(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function Cl(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Sl(e, t, a) {
  return Cl(e.describedBy, t && a);
}
function Rl({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${nt.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function Tl(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Ee()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(xl, { ...e });
}
function xl(e) {
  const t = Ee();
  kl(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", o = !!(e.disabled || t), i = $l(e, t), s = y(), c = Ll(i, t);
  return /* @__PURE__ */ l(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: yl(a, r, o, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: o,
        title: i,
        "aria-describedby": Sl(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Nl(a, e.controls),
        children: Tl(e)
      }
    ),
    /* @__PURE__ */ n(Rl, { id: s, reason: i, shown: c === Sa })
  ] });
}
function Ll(e, t) {
  return e && !t ? Sa : ga;
}
function Sa({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${nt.withReason} ward-btn-withReason`, children: e });
}
let bn = "none";
function Al(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (bn = "key");
}
typeof document < "u" && (document.addEventListener("keydown", Al, !0), document.addEventListener("pointerdown", () => {
  bn = "pointer";
}, !0));
function El() {
  return bn === "key";
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
const Il = "_scrim_1cawq_2", Ml = "_drawer_1cawq_10", Bl = "_sheet_1cawq_14", jl = "_modal_1cawq_18", Pl = "_panel_1cawq_23", ql = "_start_1cawq_44", Hl = "_header_1cawq_67", Ol = "_title_1cawq_75", Dl = "_body_1cawq_79", Fl = "_close_1cawq_106", Te = {
  scrim: Il,
  drawer: Ml,
  sheet: Bl,
  modal: jl,
  panel: Pl,
  start: ql,
  header: Hl,
  title: Ol,
  body: Dl,
  close: Fl
}, zl = Ne(null), At = [], Et = /* @__PURE__ */ new Map();
function Wl(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Kl(e, t) {
  let a = Et.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, Et.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function Gl(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !Wl(r) && Kl(e, r);
}
function Ul(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (Gl(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function Vl(e) {
  for (const t of e.claims) {
    const a = Et.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), Et.delete(t)));
  }
}
function Yl(e, t) {
  const a = { root: e, claims: [] };
  return At.push(a), Ul(a, t), a;
}
function Jl(e) {
  const t = At.indexOf(e);
  t >= 0 && At.splice(t, 1), Vl(e);
}
function Dn(e) {
  return e !== null && At.at(-1) === e;
}
function Ql(e, t, a) {
  const r = _(null), o = _(a);
  return o.current = a, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = Yl(i, t);
    return r.current = c, () => {
      var u, h;
      const d = Dn(c);
      Jl(c), r.current = null, d && ((h = (u = o.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), te(() => Dn(r.current), []);
}
function Xl(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function Zl(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function ei({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("header", { className: `${Te.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Te.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function ti(e) {
  return `${Te.scrim} ${Te[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function ni(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Te.panel} ${Te[e]} ward-overlay-panel${a}${r}`;
}
function ai(e) {
  const t = ye(zl);
  return e ?? t ?? document.body;
}
function lt(e) {
  const t = _(null), a = _(null), r = y(), o = ai(e.container), i = mt("(min-width: 768px)"), s = Xl(e.kind, i), c = Zl(e, r), d = mo(a), [u] = p(El), h = Ql(t, o, e.returnFocusTo), w = te(() => {
    h() && e.onClose();
  }, [e.onClose, h]);
  return S(() => {
    var f;
    h() && ((f = a.current) == null || f.focus());
  }, [h]), S(() => {
    const f = (N) => {
      N.key === "Escape" && w();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [w]), Zr(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: ti(s),
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
            className: ni(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => h() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Te.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(ei, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const ri = /^([a-z][a-z0-9+.-]*):/i, oi = /* @__PURE__ */ new Set(["http", "https"]), li = "#";
function ii(e) {
  var r, o;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (o = (r = ri.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : o.toLowerCase();
}
function L(e) {
  const t = ii(e);
  return t === void 0 || oi.has(t) ? e : li;
}
function si(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function Ra(e) {
  const t = si(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function ci(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => Ra(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const o = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [a, ...a.children]) o == null || o.observe(i);
    return r(), () => {
      a.removeEventListener("scroll", r), o == null || o.disconnect();
    };
  }, [e, t]);
}
function di(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, o = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : o > e.clientWidth - a ? e.scrollLeft + o - e.clientWidth + a : null;
}
function ui(e, t, a) {
  at(() => {
    const r = e.current, o = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !o) return;
    const i = di(r, o);
    i !== null && (r.scrollLeft = Math.max(0, i)), Ra(r);
  }, [e, t, a]);
}
const hi = "_row_11g8i_2", mi = {
  row: hi
};
function wi(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function pn({ label: e, children: t, count: a, as: r = "div", focusable: o = !0, rowRef: i, className: s, ...c }) {
  const d = _(null), u = i ?? d;
  return ci(u, a), /* @__PURE__ */ n(r, { ref: u, className: [mi.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...wi(o, r), ...c, children: t });
}
const fi = "_icon_1ylqy_2", _i = {
  icon: fi
};
function _t({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: _i.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function KT() {
  return /* @__PURE__ */ n(_t, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function GT() {
  return /* @__PURE__ */ l(_t, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function UT() {
  return /* @__PURE__ */ l(_t, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function VT() {
  return /* @__PURE__ */ n(_t, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function vi() {
  return /* @__PURE__ */ l(_t, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const Ta = "ward:sidebar-collapsed", bi = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function pi() {
  try {
    return window.localStorage.getItem(Ta) === "true";
  } catch {
    return !1;
  }
}
function gi(e) {
  try {
    window.localStorage.setItem(Ta, String(e));
  } catch {
  }
}
function yi(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Ni(e) {
  return e instanceof Element && e.closest(bi) !== null;
}
function ki(e) {
  return e.key === "[" && !yi(e) && !Ni(e.target);
}
function $i(e) {
  const [t, a] = p(pi), r = () => {
    gi(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const o = (i) => {
      var c;
      if (!ki(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [e, t]), { collapsed: t, toggle: r };
}
function Ci() {
  const e = mt("(max-width: 767.98px)"), t = mt("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function Si(e) {
  const t = e === "phone", a = y(), r = _(null), [o, i] = p(!1);
  return o && !t && i(!1), { narrow: t, open: o, drawerId: a, slotRef: r, toggle: () => i(!o), close: () => i(!1) };
}
function Ri({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ l("div", { className: C.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: C.headerSlot, children: e }),
    Ea(t) && /* @__PURE__ */ n("span", { className: C.headerAction, children: t })
  ] }) : e;
}
function Ti(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function xi({ sidebar: e, label: t, drawer: a }) {
  var o;
  if (Ti(a.open, a.close), !a.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(lt, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (o = a.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ n("div", { className: C.drawerSide, onClick: r, children: xa(e, !1) }) });
}
function Li(e) {
  const [t, a] = p(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function Ai(e, t) {
  const a = $i(e === "wide" && !t), r = Li(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function Ei(e, t) {
  const a = Ai(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return Mi(e.collapsed, t);
  const r = a.collapsed, o = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: o, drawsStrip: !o && typeof e.sidebar == "function", toggle: a.toggle };
}
const Ii = (e) => e.collapsed && e.drawsStrip;
function Mi(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const Fn = (e) => e ? "" : void 0;
function xa(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function La({ fold: e }) {
  return /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(vi, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function Bi({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: C.sideTop, children: /* @__PURE__ */ n(La, { fold: e }) });
}
const Aa = Ne(null);
function YT() {
  const e = ye(Aa);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(La, { fold: e });
}
function ji({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": _n(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Pi({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: C.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ l("a", { className: C.railItem, href: L(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(ji, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function qi({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: o }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ l("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(Bi, { fold: r, inSidebar: o && !i }),
    /* @__PURE__ */ n("div", { className: C.sideBody, hidden: i, children: xa(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(Pi, { items: a ?? [], label: t })
  ] });
}
const Ea = (e) => e != null;
function Hi(e) {
  const { sidebar: t, header: a, action: r, children: o, rail: i, iconRail: s, pageFill: c } = e, d = Ea(i), u = Ci(), h = Si(u), w = Ei(e, u), f = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ l("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": Fn(Ii(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(Aa.Provider, { value: w, children: /* @__PURE__ */ n(qi, { sidebar: t, label: f, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ l("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(Ri, { header: a, action: r, label: f, drawer: h }),
      /* @__PURE__ */ n("div", { className: C.page, "data-fill": Fn(c === !0), children: o })
    ] }),
    d && /* @__PURE__ */ n("div", { className: C.rail, children: i }),
    /* @__PURE__ */ n(xi, { sidebar: t, label: f, drawer: h })
  ] });
}
function Oi({ destinations: e, active: t }) {
  const a = _(null);
  return ui(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(pn, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: L(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function sn({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function Di({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ l("span", { className: C.metadata, children: [
    /* @__PURE__ */ n(sn, { value: e, className: C.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(sn, { value: t, className: C.detail })
  ] });
}
function Fi() {
  const e = mt("(max-width: 767.98px)"), t = y(), a = _(null), [r, o] = p(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function zi({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: C.tools, children: e });
}
function Wi({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: C.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function Ki(e) {
  return /* @__PURE__ */ l("header", { className: C.topbar, children: [
    /* @__PURE__ */ n("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(sn, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ n(Oi, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: C.identity, children: /* @__PURE__ */ n(Di, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(zi, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Gi(e) {
  const t = y(), a = Fi();
  return /* @__PURE__ */ l("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: C.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Ki, { ...e, menu: a }),
    /* @__PURE__ */ n(Wi, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: C.content, children: e.children })
  ] });
}
function Ui(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function JT(e) {
  return Ui(e) ? /* @__PURE__ */ n(Hi, { ...e }) : /* @__PURE__ */ n(Gi, { ...e });
}
const Vi = "_root_itg9o_2", Yi = "_row_itg9o_8", Ji = "_box_itg9o_14", Qi = "_label_itg9o_21", Xi = "_labelHidden_itg9o_26", Zi = "_lockedNote_itg9o_36", es = "_consequence_itg9o_44", ts = "_sample_itg9o_79", je = {
  root: Vi,
  row: Yi,
  box: Ji,
  label: Qi,
  labelHidden: Xi,
  lockedNote: Zi,
  consequence: es,
  sample: ts
};
function ns(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function as({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${je.consequence} ward-check-consequence`, children: t }) : null;
}
function rs({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${je.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function os(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function ls(e, t, a, r) {
  const o = e.consequence ? `${t}-note` : void 0, i = os(e, a, r), s = i ? `${t}-reason` : void 0, c = Ft(ot(o, e.describedBy, s), r);
  return { noteId: o, reason: i, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? i } };
}
function is({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function ss({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: je.sample, "aria-hidden": "true", children: e }) : null;
}
function Ia(e) {
  const t = y(), a = Ee(), r = ns(e, a), o = ls(e, t, r.disabled, a);
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
        /* @__PURE__ */ n(rs, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(ss, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(is, { id: o.reasonId, reason: o.reason }),
    /* @__PURE__ */ n(as, { id: o.noteId, text: e.consequence })
  ] });
}
const cs = "_chip_pq6tb_2", ds = {
  chip: cs
}, us = {
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
function hs(e, t) {
  if (e === "stream") return ms(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = us[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function ms(e) {
  if (!e || !ft(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = _n(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${ds.chip} ward-chip ward-chip--${e}`, style: hs(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const ws = "_clamp_zn74g_3", zn = {
  clamp: ws
};
function rt({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? zn.clamp : `${zn.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const fs = "_root_1btz3_2", _s = "_body_1btz3_10", vs = "_toggle_1btz3_24", Yt = {
  root: fs,
  body: _s,
  toggle: vs
};
function QT({ children: e, lines: t = 3, label: a }) {
  const [r, o] = p(!1), i = y();
  return /* @__PURE__ */ l("div", { className: Yt.root, children: [
    /* @__PURE__ */ n("div", { id: i, className: Yt.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: Yt.toggle, "aria-expanded": r, "aria-controls": i, onClick: () => o(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const bs = "_root_1a4s8_2", ps = "_words_1a4s8_16", gs = "_title_1a4s8_23", ys = "_actions_1a4s8_27", bt = {
  root: bs,
  words: ps,
  title: gs,
  actions: ys
};
function XT({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ l("section", { className: bt.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ l("div", { className: bt.words, children: [
      /* @__PURE__ */ n("strong", { className: bt.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: bt.actions, children: a })
  ] });
}
const Ns = "_root_8zmpu_2", ks = "_step_8zmpu_12", $s = "_dot_8zmpu_38", Cs = "_label_8zmpu_51", st = {
  root: Ns,
  step: ks,
  dot: $s,
  label: Cs
}, Ss = { done: ", done", now: ", current", next: "" };
function Rs({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ l("li", { className: st.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${st.dot} ward-running` : st.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: st.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: Ss[e.state] })
  ] });
}
function ZT({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: st.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(Rs, { step: r, running: t }, r.label)) });
}
function vt(e) {
  return typeof e == "number" && ft(e) ? e : null;
}
function ge(e, t) {
  const a = vt(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function zt(e, t) {
  const a = vt(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const Ts = "_root_13eei_3", xs = "_nav_13eei_8", Ls = "_list_13eei_16", As = "_item_13eei_24", Es = "_link_13eei_44", Is = "_sep_13eei_54", Ms = "_current_13eei_58", Bs = "_chips_13eei_62", Be = {
  root: Ts,
  nav: xs,
  list: Ls,
  item: As,
  link: Es,
  sep: Is,
  current: Ms,
  chips: Bs
};
function js({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: Be.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${Be.link} ward-target`, href: L(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function Ps({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: Be.root, children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Be.nav, children: [
    /* @__PURE__ */ n("ol", { className: Be.list, children: e.map((r, o) => /* @__PURE__ */ l("li", { className: Be.item, children: [
      o > 0 ? /* @__PURE__ */ n("span", { className: Be.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(js, { step: r, isCurrent: a && o === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${Be.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function Ma(e, t, a) {
  const r = _(a);
  r.current = a, S(() => {
    if (!e) return;
    const o = (i) => {
      var s;
      (s = t.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", o), () => document.removeEventListener("mousedown", o);
  }, [e, t]);
}
const qs = 500;
function Ba(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function ja() {
  const e = _(""), t = _(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, qs), e.current);
}
const pt = 4;
function Hs(e, t, a) {
  const r = Math.max(0, a - e.bottom - pt * 2), o = Math.max(0, e.top - pt * 2);
  return t <= r || r >= o ? { top: e.bottom + pt, maxHeight: r } : { top: e.top - pt - Math.min(t, o), maxHeight: o };
}
function Os(e, t, a, r) {
  const o = { start: e.left, end: e.right - t }, i = { start: o.start + t <= a, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, a - t));
}
function Ds(e, t, a, r) {
  return { ...Hs(e, t.height, a.height), left: Os(e, t.width, a.width, r) };
}
function Rt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Fs(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function zs(e, t, a) {
  const r = Fs(t, a);
  e.style.setProperty("--ward-anchor-width", Rt(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const o = e.getBoundingClientRect(), i = document.documentElement;
  return { edges: r, box: o, view: { width: i.clientWidth, height: i.clientHeight } };
}
function Ws(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, o) => r.scrollTop = a[o]);
}
function Wn(e, t, a, r) {
  const o = Ws(e), i = zs(e, t, r), s = Ds(i.edges, i.box, i.view, a);
  Object.assign(e.style, { left: Rt(s.left - i.box.left), top: Rt(s.top - i.box.top), maxHeight: Rt(s.maxHeight) }), o();
}
function Ks(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function Pa(e, t, a = "start", r) {
  at(() => {
    const o = t.current, i = e.current;
    if (!o || !i) return;
    const s = Ks(o), c = () => Wn(o, i, a, r == null ? void 0 : r.current), d = (u) => {
      o.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), at(() => {
    t.current && e.current && Wn(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const Gs = "_root_1lgbn_2", Us = "_trigger_1lgbn_7", Vs = "_value_1lgbn_47", Ys = "_menu_1lgbn_65", Js = "_find_1lgbn_87", Qs = "_list_1lgbn_103", Xs = "_option_1lgbn_114", Zs = "_check_1lgbn_133", ec = "_empty_1lgbn_144", pe = {
  root: Gs,
  trigger: Us,
  value: Vs,
  menu: Ys,
  find: Js,
  list: Qs,
  option: Xs,
  check: Zs,
  empty: ec
}, tc = 7;
function nc(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function Kn(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function ac(e, t) {
  const [a, r] = p(e.defaultOpen === !0), [o, i] = p(""), [s, c] = p(() => Kn(e.options, e.value)), d = (u) => {
    var h;
    ya(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: o,
    active: s,
    entries: nc(e.options, o),
    findable: e.options.length > tc,
    show: () => {
      e.disabled || (i(""), c(Kn(e.options, e.value)), r(!0));
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
function rc(e, t) {
  const a = _(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function oc(e) {
  const t = ja();
  return (a) => {
    const r = t(a), o = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    o >= 0 && e.to(o);
  };
}
function qa(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function lc(e) {
  return { ...qa(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function Ha(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const o = t[r.key];
    if (!o) return a(r);
    r.preventDefault(), r.stopPropagation(), o();
  };
}
const ic = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function sc(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      ic.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function cc({ entry: e, at: t, menu: a, ids: r, value: o }) {
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
function gn(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function dc({ menu: e, ids: t, focusRef: a }) {
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
      "aria-activedescendant": gn(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: Ha(e, qa(e), () => {
      })
    }
  );
}
function uc({ props: e, menu: t, ids: a, focusRef: r, trigger: o }) {
  const i = oc(t), s = _(null);
  Pa(o, s);
  const c = (d) => {
    Ba(d) && i(d.key);
  };
  return /* @__PURE__ */ l("div", { ref: s, className: pe.menu, children: [
    t.findable && /* @__PURE__ */ n(dc, { menu: t, ids: a, focusRef: r }),
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
        "aria-activedescendant": t.findable ? void 0 : gn(t, a),
        onKeyDown: Ha(t, lc(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(cc, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: pe.empty, children: "No match" })
  ] });
}
function hc(e, t) {
  const a = e.open ? gn(e, t) : void 0;
  S(() => {
    var r, o;
    a && ((o = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [a]);
}
function Oa(...e) {
  return e.filter(Boolean).join(" ");
}
function mc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function wc({ props: e, menu: t, ids: a, trigger: r, wantFocus: o }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ee()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: Oa(pe.trigger, e.triggerClassName),
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
      ...sc(t, o),
      children: /* @__PURE__ */ n("span", { id: a.value, className: pe.value, "data-placeholder": i || void 0, children: mc(e) })
    }
  );
}
function Da(e) {
  const t = Ee(), a = t ? { ...e, disabled: !0, "aria-describedby": Ft(e["aria-describedby"], t) } : e, r = y(), o = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = _(null), s = _(null), c = _(null), d = ac(a, s), u = rc(d.open, c);
  return Ma(d.open, i, () => d.close(!1)), hc(d, o), /* @__PURE__ */ l("div", { ref: i, className: Oa(pe.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(wc, { props: a, menu: d, ids: o, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(uc, { props: a, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const fc = "_field_1ensj_2", _c = "_label_1ensj_8", vc = "_labelHidden_1ensj_15", bc = "_control_1ensj_25", pc = "_mono_1ensj_45", gc = "_area_1ensj_50", yc = "_invalid_1ensj_57", De = {
  field: fc,
  label: _c,
  labelHidden: vc,
  control: bc,
  mono: pc,
  area: gc,
  invalid: yc
}, Nc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, Fa = (e) => `${e}-label`;
function kc({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? Nc : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function $c({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    Da,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": Fa(t.id),
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
function Cc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
const Sc = { input: kc, select: $c, textarea: Cc };
function Rc(e, t, a) {
  const r = Sc[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function Tc(e, t, a, r) {
  const o = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": o,
    "aria-describedby": Ft(ot(o ? a : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function xc(e) {
  const t = e.mono ? [De.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [De.area] : [];
  return [De.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function Lc(e) {
  return e ? `${De.label} ${De.labelHidden} ward-field-label` : `${De.label} ward-field-label`;
}
function q(e) {
  const t = y(), a = `${t}-msg`, r = Tc(e, t, a, Ee()), o = xc(e);
  return /* @__PURE__ */ l("div", { className: `${De.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: Fa(t), className: Lc(e.labelHidden), htmlFor: t, children: e.label }),
    Rc(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${De.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Ac = "_root_sjvm0_2", Ec = "_trigger_sjvm0_9", Ic = "_ghost_sjvm0_27", Mc = "_panel_sjvm0_46", Bc = "_edged_sjvm0_67", jc = "_menu_sjvm0_73", Pc = "_group_sjvm0_78", qc = "_heading_sjvm0_83", Hc = "_item_sjvm0_89", Oc = "_description_sjvm0_105", Dc = "_large_sjvm0_109", Fc = "_touch_sjvm0_113", zc = "_icon_sjvm0_117", Wc = "_label_sjvm0_125", Kc = "_text_sjvm0_130", Gc = "_trailing_sjvm0_138", Uc = "_check_sjvm0_144", Vc = "_separator_sjvm0_183", Yc = "_footer_sjvm0_189", Jc = "_find_sjvm0_196", Qc = "_findGlyph_sjvm0_208", Xc = "_findInput_sjvm0_214", Zc = "_empty_sjvm0_230", A = {
  root: Ac,
  trigger: Ec,
  ghost: Ic,
  panel: Mc,
  edged: Bc,
  menu: jc,
  group: Pc,
  heading: qc,
  item: Hc,
  description: Oc,
  large: Dc,
  touch: Fc,
  icon: zc,
  label: Wc,
  text: Kc,
  trailing: Gc,
  check: Uc,
  separator: Vc,
  footer: Yc,
  find: Jc,
  findGlyph: Qc,
  findInput: Xc,
  empty: Zc
}, za = Ne(null);
function ed(e, t) {
  const [a, r] = p({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (o) => r((i) => ({ open: !0, start: o, request: i.request + 1 })),
    close: (o) => {
      var i;
      ya(() => r((s) => ({ ...s, open: !1 }))), o && ((i = t.current) == null || i.focus());
    }
  };
}
const td = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function nd(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = td.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function yn(...e) {
  return e.filter(Boolean).join(" ");
}
function ad(e, t = {}, a = "field") {
  const { ref: r, className: o, ...i } = t;
  return { ...i, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: yn(A.trigger, a === "ghost" ? A.ghost : void 0, o) };
}
function Wa(e) {
  const t = y(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = _(null), o = _(null), i = ed(e.defaultOpen === !0, o);
  return Ma(i.open, r, () => i.close(!1)), /* @__PURE__ */ l("div", { ref: r, className: yn(A.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...ad(o, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...nd(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(za.Provider, { value: { ...a, popup: i, button: o }, children: e.children })
  ] });
}
function rd(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function od(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const ld = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function id(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function sd(e, t) {
  return e === "separator" ? e : "items" in e ? id(e, t) : t(e) ? e : null;
}
function cd(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function dd(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (o) => o.label.toLowerCase().includes(a);
  return cd(e.map((o) => sd(o, r)).filter((o) => o !== null));
}
const Ka = (e, t) => (e % t + t) % t;
function qe(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const o = Ka(t + a * r, e.length);
    if (!e[o].disabled) return o;
  }
  return -1;
}
const ud = (e) => e.split("").every((t) => t === e[0]);
function hd(e, t, a) {
  const r = ud(a), o = r ? a[0] : a, i = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = Ka(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function md(e) {
  const t = _([]);
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
function wd(e, t) {
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
  const r = ja(), o = wd(e, t), i = (s) => {
    if (Ba(s)) {
      if (!a) return e.focus(hd(e.items, e.current(), r(s.key)));
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
function _d(e) {
  const t = _(!1);
  return {
    onKeyDown: (a) => {
      a.key === "Tab" && (t.current = !0);
    },
    onBlur: () => {
      t.current && e.close(!1);
    }
  };
}
function vd(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? qe(e, -1, 1) : t;
}
function bd(e, t) {
  const { start: a, request: r } = t, o = _(e);
  o.current = e, S(() => {
    const { items: i, focus: s } = o.current;
    a && s(a === "first" ? vd(i) : qe(i, i.length, -1));
  }, [a, r]);
}
function pd({ row: e, nav: t, popup: a }) {
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
const gd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function yd(e, t) {
  return gd(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function Nd(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: A.label, children: e.label });
  return e.description ? /* @__PURE__ */ l("span", { className: A.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: A.description, children: e.description })
  ] }) : a;
}
function kd() {
  return /* @__PURE__ */ n("svg", { className: A.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Gn(e, t) {
  return /* @__PURE__ */ l(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: A.icon, "aria-hidden": "true", children: e.icon }) : null,
    Nd(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: A.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(kd, {}) : null
  ] });
}
function Ga(e) {
  const { item: t, at: a } = e.row, r = y(), o = {
    ref: (i) => {
      e.nav.refs.current[a] = i;
    },
    role: "menuitem",
    tabIndex: -1,
    className: A.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...yd(t, r),
    ...pd(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: L(t.href), ...o, children: Gn(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...o, children: Gn(t, r) });
}
function $d({ heading: e, rows: t, nav: a, popup: r }) {
  const o = y();
  return /* @__PURE__ */ l("div", { role: "group", "aria-labelledby": o, className: A.group, children: [
    /* @__PURE__ */ n("div", { id: o, className: A.heading, children: e }),
    t.map((i) => /* @__PURE__ */ n(Ga, { row: i, nav: a, popup: r }, i.at))
  ] });
}
function Cd({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: A.separator }) : e.kind === "group" ? /* @__PURE__ */ n($d, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(Ga, { row: e.row, nav: t, popup: a });
}
function Sd() {
  const e = ye(za);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Rd() {
  return /* @__PURE__ */ l("svg", { className: A.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function Td(e, t) {
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
function xd({ find: e, query: t, setQuery: a, input: r, nav: o, popup: i, menuId: s }) {
  const c = Td(o, i), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ l("div", { className: A.find, children: [
    /* @__PURE__ */ n(Rd, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: A.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function Ld(e, t) {
  const [a, r] = p(""), o = _(null), i = t !== void 0 && ld(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = o.current) == null || d.focus();
  };
  return i ? { find: t, query: a, setQuery: r, input: o, toFind: s, entries: dd(e, a) } : { query: a, setQuery: r, input: o, entries: e };
}
const Ad = { regular: void 0, large: A.large, touch: A.touch }, Ed = (e, t) => yn(A.panel, e ? A.edged : void 0, Ad[t]);
function Id({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: A.empty, children: e.empty ?? "No matches" });
}
function Ua({ entries: e, footer: t, align: a = "start", find: r, edges: o, size: i = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = Sd(), h = _(null);
  Pa(u, h, a, o);
  const w = Ld(e, r), f = rd(w.entries), N = md(f.flatMap(od).map((H) => H.item)), k = fd(N, s, w.toFind), E = _d(s);
  return bd(N, s), /* @__PURE__ */ l("div", { ref: h, className: Ed(o, i), ...E, children: [
    w.find && /* @__PURE__ */ n(xd, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: A.menu, ...k, children: f.map((H, me) => /* @__PURE__ */ n(Cd, { block: H, nav: N, popup: s }, me)) }),
    /* @__PURE__ */ n(Id, { find: w.find, count: N.items.length }),
    t && /* @__PURE__ */ n("p", { className: A.footer, children: t })
  ] });
}
function Md(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function Va(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !Md(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const Bd = (e, t) => e.reduce((a, r) => a + r + t, -t);
function jd({ room: e, widths: t, more: a, gap: r }, o) {
  const i = t.map((d, u) => u);
  if (Bd(t, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([o]);
  let c = t[o] + r + a;
  for (const d of i)
    if (d !== o) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Jt = (e) => Number.parseFloat(e) || 0, Un = (e) => e.getBoundingClientRect().width;
function Pd(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Jt(a.paddingInlineStart) - Jt(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), Un),
    more: r ? Un(r) : 0,
    gap: Jt(a.columnGap)
  };
}
function qd(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const Hd = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function Ya(e, t, a, r = ':scope > [role="tab"]') {
  const [o, i] = p(null);
  return at(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = Pd(s, r);
      i((u) => Hd(u, d) ? u : d);
    };
    return c(), qd(s, c);
  }, [e, a, r]), o && jd(o, t);
}
const Od = "_strip_1zvzj_2", Dd = "_fits_1zvzj_19", Fd = "_probe_1zvzj_27", zd = "_moreRoot_1zvzj_36", Wd = "_more_1zvzj_36", Kd = "_tab_1zvzj_55", Gd = "_count_1zvzj_91", Ud = "_badge_1zvzj_97", Y = {
  strip: Od,
  fits: Dd,
  probe: Fd,
  moreRoot: zd,
  more: Wd,
  tab: Kd,
  count: Gd,
  badge: Ud
}, Ja = "More";
function Vd(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const Vn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Nn = (e) => e.badge === void 0 ? Vn(e) : `${Vn(e)}, ${e.badge}`;
function Qa(e) {
  return `${Y.strip} ward-tabs ward-tabs--${e}`;
}
const Yd = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Jd({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ l(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${Y.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : Nn(e),
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
function Qd(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((i) => i.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Xd({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(Wa, { label: Ja, className: Y.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: Y.more }, children: /* @__PURE__ */ n(Ua, { align: "end", entries: e.map((r) => ({ label: Nn(r), onSelect: () => a(r.id) })) }) });
}
function Zd(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : Yd;
}
function ex({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: o }) {
  const i = Ot({ orientation: "horizontal" }), s = Vd(e, t);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = _(null);
  Va(c, o);
  const d = Ya(c, s, e.map(Nn).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ l("div", { ref: c, className: `${Qa(o)} ${Y.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(Jd, { tab: h, active: t, place: Zd(i, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${A.trigger} ${Y.more} ${Y.probe}`, children: Ja }),
    u.length > 0 && /* @__PURE__ */ n(Xd, { tabs: u, trigger: i.itemProps(e.length), onPick: Qd(c, a) })
  ] });
}
const Yn = 7, Xa = "More", eu = ":scope > a", Za = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, tu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function nu(e, t) {
  return !e || e.includes(t) ? {} : tu;
}
function au({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, className: `${Y.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ l(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
    ] })
  ] });
}
function ru({ links: e }) {
  return /* @__PURE__ */ n(Wa, { label: Xa, className: Y.moreRoot, trigger: { className: Y.more }, children: /* @__PURE__ */ n(Ua, { align: "end", entries: e.map((t) => ({ label: Za(t), href: t.href })) }) });
}
function tx({ links: e, active: t, label: a, level: r }) {
  if (e.length > Yn) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${Yn} — the set is fixed`);
  const o = _(null);
  Va(o, r);
  const i = Math.max(0, e.findIndex((d) => d.id === t)), s = Ya(o, i, e.map(Za).join(`
`), eu), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ l("nav", { ref: o, className: `${Qa(r)} ${Y.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(au, { link: d, current: d.id === t, place: nu(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${A.trigger} ${Y.more} ${Y.probe}`, children: Xa }),
    c.length > 0 && /* @__PURE__ */ n(ru, { links: c })
  ] });
}
const ou = "_root_v56ff_3", lu = "_segment_v56ff_9", Jn = {
  root: ou,
  segment: lu
};
function er({ options: e, value: t, onChange: a, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Ot({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${Jn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: Jn.segment,
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
const iu = "_sidebar_s9o1j_3", su = "_brand_s9o1j_9", cu = "_mark_s9o1j_17", du = "_word_s9o1j_24", uu = "_nav_s9o1j_30", hu = "_navItem_s9o1j_39", mu = "_footLink_s9o1j_49", wu = "_group_s9o1j_58", fu = "_groupName_s9o1j_65", _u = "_agents_s9o1j_81", vu = "_agent_s9o1j_81", bu = "_root_s9o1j_96", pu = "_agentTop_s9o1j_105", gu = "_dot_s9o1j_112", yu = "_agentName_s9o1j_124", Nu = "_agentMeta_s9o1j_138", ku = "_foot_s9o1j_49", $u = "_footName_s9o1j_150", Cu = "_footLinks_s9o1j_157", Su = "_linkBrand_s9o1j_184", Ru = "_label_s9o1j_205", Tu = "_note_s9o1j_210", xu = "_footer_s9o1j_226", I = {
  sidebar: iu,
  brand: su,
  mark: cu,
  word: du,
  nav: uu,
  navItem: hu,
  new: "_new_s9o1j_48",
  footLink: mu,
  group: wu,
  groupName: fu,
  agents: _u,
  agent: vu,
  root: bu,
  agentTop: pu,
  dot: gu,
  agentName: yu,
  agentMeta: Nu,
  foot: ku,
  footName: $u,
  footLinks: Cu,
  linkBrand: Su,
  label: Ru,
  note: Tu,
  footer: xu
};
function Lu({ agent: e }) {
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
              style: { "--dot": _n(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: I.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: I.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Au({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: I.foot, children: [
    /* @__PURE__ */ n("span", { className: I.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: I.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${I.footLink} ward-target`, href: L(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function Eu({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: o, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: I.agents, children: r.map((s) => /* @__PURE__ */ n(Lu, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(Au, { shared: i })
  ] });
}
function Iu(e) {
  return e.destinations ?? e.items ?? [];
}
function Mu({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.linkBrand, children: e });
}
function Bu({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.footer, children: e });
}
function ju({ link: e, active: t }) {
  return /* @__PURE__ */ l("a", { href: L(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: I.note, children: e.note })
  ] });
}
function Pu(e) {
  return /* @__PURE__ */ l("aside", { className: `${I.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Mu, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Iu(e).map((t) => /* @__PURE__ */ n(ju, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(Bu, { children: e.children })
  ] });
}
function qu(e) {
  return "agents" in e;
}
function nx(e) {
  return qu(e) ? /* @__PURE__ */ n(Eu, { ...e }) : /* @__PURE__ */ n(Pu, { ...e });
}
const Hu = "_mark_wlgi8_3", Ou = {
  mark: Hu
}, Du = { met: "✓", unmet: "", failed: "✕" };
function kn({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Ou.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: Du[e]
    }
  );
}
const Fu = "_avatar_1t33a_3", zu = {
  avatar: Fu
};
function It(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function Wu(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [It(e), ...[...t.slice(1)].map((r) => a + r)];
}
function Ku(e, t) {
  const a = Wu(e).find((o) => !t.has(o));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(It(e).charAt(0) + String(r)); ) r += 1;
  return It(e).charAt(0) + String(r);
}
function ax(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const o = Ku(r, t);
    t.add(o), a.set(r, o);
  }
  return a;
}
function Gu(e) {
  return e != null && ft(e) ? bo(e) : void 0;
}
function rx({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: zu.avatar, "data-size": a, "aria-hidden": "true", style: Gu(t), children: r ?? It(e) });
}
const Uu = "_marker_br9fi_2", Vu = {
  marker: Uu
}, Yu = {
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
}, Ju = { running: " ward-running" };
function ze({ size: e, kind: t, label: a }) {
  const r = { "--marker": Yu[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Vu.marker} ward-marker ward-marker--${t}${Ju[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const Qu = "_root_ti0pq_2", Xu = "_chip_ti0pq_11", Zu = "_noCase_ti0pq_23", gt = {
  root: Qu,
  chip: Xu,
  noCase: Zu
};
function eh(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function $n({ connection: e, since: t, lastEventAt: a }) {
  const r = eh(t, a), o = vn(r, e === "reconnecting");
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
const th = "_root_yylks_2", nh = "_context_yylks_13", ah = "_row_yylks_1", rh = "_heading_yylks_27", oh = "_headingWrap_yylks_35", lh = "_meta_yylks_41", ih = "_chips_yylks_49", sh = "_title_yylks_56", ch = "_consequence_yylks_66", dh = "_actionsWrap_yylks_73", uh = "_actions_yylks_73", hh = "_action_yylks_73", mh = "_overflowPanel_yylks_102", wh = "_measureClip_yylks_113", fh = "_measure_yylks_113", U = {
  root: th,
  context: nh,
  row: ah,
  heading: rh,
  headingWrap: oh,
  meta: lh,
  chips: ih,
  title: sh,
  consequence: ch,
  actionsWrap: dh,
  actions: uh,
  action: hh,
  overflowPanel: mh,
  measureClip: wh,
  measure: fh
};
function _h({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(rt, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function vh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function bh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function ph({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ l("div", { className: U.meta, children: [
    /* @__PURE__ */ n(vh, { chips: e }),
    /* @__PURE__ */ n(bh, { consequence: t, consequenceHint: a })
  ] });
}
function gh({ title: e, chips: t, consequence: a, consequenceHint: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: U.heading, children: [
    /* @__PURE__ */ n(_h, { title: e, density: o }),
    /* @__PURE__ */ n(ph, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function cn({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function Qn({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function yh({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: o }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(Qn, { disclosure: o }) : t ? [/* @__PURE__ */ n(Qn, { disclosure: o }, "more"), /* @__PURE__ */ n(cn, { actions: e }, "actions")] : /* @__PURE__ */ n(cn, { actions: e });
}
function Nh(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function kh({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(cn, { actions: e }) });
}
function $h(e, t) {
  const a = y(), [r, o] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: a, toggle: () => o(!i) }, close: () => {
    var d, u;
    o(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const Ch = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function Sh(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && Ch(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function Rh({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(Ps, { path: e.path, current: e.current }) });
}
function Th(...e) {
  return e.some((t) => t === null);
}
function xh(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Lh(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + xh(e);
}
function Ah(e, t, a, r, o) {
  if (o === 0 || Th(t, a, r)) return !1;
  const [i, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - Lh(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Eh(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Ih(e) {
  return Qr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Mh(e, t) {
  return t.length === 0 && e.length === 1 && Ih(e[0]);
}
function Bh(e, t) {
  const a = _(null), r = _(null), o = _(null), i = _(null), [s, c] = p(!1);
  return S(() => {
    const d = a.current;
    if (!Eh(d)) return;
    const u = () => c(Ah(d, r.current, o.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: o, measureRef: i, collapsed: s && !t };
}
function jh({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ l("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] }) });
}
function Ph({ connection: e }) {
  return e ? /* @__PURE__ */ n($n, { connection: e.connection, since: e.since }) : null;
}
function ox({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: o, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: N, measureRef: k, collapsed: E } = Bh(s, Mh(s, c)), H = c.length > 0, { disclosure: me, close: re } = $h(E || H, N), Ie = Nh(c, s, E, u);
  return /* @__PURE__ */ l("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(Rh, { crumb: Sh(e, r, t) }),
    /* @__PURE__ */ l("div", { className: U.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: f, className: U.headingWrap, children: /* @__PURE__ */ n(gh, { title: r, chips: a, consequence: o, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ l("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(Ph, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ n(yh, { actions: s, hasMore: H, collapsed: E, onOverflow: u, disclosure: me }) })
      ] })
    ] }),
    /* @__PURE__ */ n(kh, { actions: Ie, disclosure: me, onEscape: re }),
    /* @__PURE__ */ n(jh, { actions: s, hasMore: H, measureRef: k })
  ] });
}
const qh = "_root_td96x_2", Hh = "_body_td96x_16", Xn = {
  root: qh,
  body: Hh
};
function lx({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${Xn.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: Xn.body, children: a }) });
}
const Oh = "_root_bf1pc_2", Dh = "_table_bf1pc_9", Fh = "_caption_bf1pc_14", zh = "_series_bf1pc_23", Wh = "_category_bf1pc_31", Kh = "_cell_bf1pc_39", Gh = "_track_bf1pc_45", Uh = "_lane_bf1pc_52", Vh = "_bar_bf1pc_56", Yh = "_value_bf1pc_63", Jh = "_swatch_bf1pc_70", Qh = "_empty_bf1pc_78", Z = {
  root: Oh,
  table: Dh,
  caption: Fh,
  series: zh,
  category: Wh,
  cell: Kh,
  track: Gh,
  lane: Uh,
  bar: Vh,
  value: Yh,
  swatch: Jh,
  empty: Qh
}, Xh = "—", Zn = 6;
function Zh(e, t) {
  if (t.length < 1 || t.length > Zn)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${Zn}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function em(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function tr(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function tm(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function nm({ value: e, top: t, step: a, format: r, missing: o }) {
  const i = tm(e, t), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ l("span", { className: Z.track, children: [
    /* @__PURE__ */ n("span", { className: Z.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${Z.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Z.value, children: e === null ? o : r(e) })
  ] }) });
}
function am({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ l("th", { scope: "col", className: Z.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Z.swatch, "data-step": tr(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function rm({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ l("section", { className: `${Z.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Z.empty, children: t })
  ] });
}
function om({ title: e, categories: t, series: a, top: r, format: o = ae, categoryHead: i = "Category", missing: s = Xh }) {
  return /* @__PURE__ */ n("div", { className: `${Z.root} ward-barchart`, children: /* @__PURE__ */ l("table", { className: Z.table, children: [
    /* @__PURE__ */ n("caption", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Z.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(am, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Z.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(nm, { value: u.values[d], top: r, step: tr(h, a.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function ix(e) {
  Zh(e.categories, e.series);
  const t = em(e.series);
  return t === 0 ? /* @__PURE__ */ n(rm, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(om, { ...e, top: t });
}
const lm = "_root_1bfqw_2", im = "_figure_1bfqw_7", sm = "_of_1bfqw_13", cm = "_bar_1bfqw_18", dm = "_rows_1bfqw_38", um = "_row_1bfqw_38", hm = "_label_1bfqw_49", mm = "_amount_1bfqw_54", Me = {
  root: lm,
  figure: im,
  of: sm,
  bar: cm,
  rows: dm,
  row: um,
  label: hm,
  amount: mm
};
function wm({ spent: e, ceiling: t, breakdown: a }) {
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
const fm = "_frame_f7bxz_2", _m = "_table_f7bxz_6", vm = "_th_f7bxz_12", bm = "_td_f7bxz_13", pm = "_sort_f7bxz_53", gm = "_row_f7bxz_65", ym = "_empty_f7bxz_73", He = {
  frame: fm,
  table: _m,
  th: vm,
  td: bm,
  sort: pm,
  row: gm,
  empty: ym
}, Nm = { asc: "ascending", desc: "descending" };
function km(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return Nm[t.direction];
}
function $m(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: He.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function Cm(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Sm({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: He.th,
      style: Cm(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": km(e, t),
      children: $m(e, a)
    }
  );
}
function Rm({ row: e, props: t }) {
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
function Tm({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: He.head, children: t.map((w) => /* @__PURE__ */ n(Sm, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(Rm, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: o, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const xm = "_list_v0s52_2", Lm = {
  list: xm
};
function Am({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: Lm.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const Em = "_label_1u62a_2", Im = {
  label: Em
};
function sx({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: Im.label, children: t.header }) }, t.key)) }) });
}
const Mm = "_stack_bp6a0_2", Bm = {
  stack: Mm
};
function cx({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Bm.stack, "data-ward-action-stack": "", children: e });
}
const jm = "_set_1z0sq_2", Pm = "_legend_1z0sq_7", qm = "_row_1z0sq_15", Hm = "_control_1z0sq_20", Om = "_input_1z0sq_26", Dm = "_label_1z0sq_31", Fm = "_consequence_1z0sq_36", Ke = {
  set: jm,
  legend: Pm,
  row: qm,
  control: Hm,
  input: Om,
  label: Dm,
  consequence: Fm
};
function nr({ legend: e, options: t, value: a, onChange: r, disabled: o, name: i, describedBy: s, variant: c }) {
  const d = y(), u = i ?? d;
  return /* @__PURE__ */ l("fieldset", { className: Ke.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: Ke.legend, children: e }),
    t.map((h) => {
      const w = `${u}-${h.value}`, f = h.consequence ? `${w}-note` : void 0;
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
              "aria-describedby": ot(f, s),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: w, className: Ke.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: f, className: `${Ke.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const zm = "_root_11gpw_2", Wm = "_head_11gpw_10", Km = "_note_11gpw_29", Gm = "_index_11gpw_34", Um = "_dot_11gpw_38", Vm = "_counter_11gpw_49", Ym = "_trailing_11gpw_57", Ge = {
  root: zm,
  head: Wm,
  note: Km,
  index: Gm,
  dot: Um,
  counter: Vm,
  trailing: Ym
};
function Jm({ index: e }) {
  return e ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ge.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ge.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Qm({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ge.counter, "aria-hidden": "true", children: e }) : null;
}
function ea({ title: e, index: t, note: a, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Ge.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Ge.head, children: [
      /* @__PURE__ */ n(Jm, { index: t }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ge.note, children: a }),
    /* @__PURE__ */ n(Qm, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ge.trailing, children: i })
  ] });
}
const Xm = "_strip_c3x3u_2", Zm = "_cell_c3x3u_7", ew = "_value_c3x3u_12", tw = "_link_c3x3u_29", nw = "_label_c3x3u_49", aw = "_tiles_c3x3u_101", Fe = {
  strip: Xm,
  cell: Zm,
  value: ew,
  link: tw,
  label: nw,
  tiles: aw
};
function ar(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((o) => o.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const rr = (e) => `${Fe.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function rw({ cell: e }) {
  return /* @__PURE__ */ l("div", { className: Fe.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: rr(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${Fe.label} ward-stat-label`, children: e.label })
  ] });
}
function ow({ cell: e, href: t }) {
  return /* @__PURE__ */ l("div", { className: Fe.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: rr(e), title: e.hint, children: /* @__PURE__ */ l("a", { className: `${Fe.link} ward-stat-link`, href: L(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${Fe.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const or = (e) => e.href === void 0 ? /* @__PURE__ */ n(rw, { cell: e }, e.label) : /* @__PURE__ */ n(ow, { cell: e, href: e.href }, e.label);
function Wt({ cells: e, divided: t = !1 }) {
  return ar("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${Fe.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(or) });
}
const ta = 6;
function dx({ cells: e }) {
  ar("StatTiles", e, [1, 2 * ta]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, ta) };
  return /* @__PURE__ */ n("dl", { className: `${Fe.tiles} ward-stattiles`, style: t, children: e.map(or) });
}
const lw = "_root_1eb1u_2", iw = "_track_1eb1u_8", sw = "_thumb_1eb1u_46", cw = "_labelHidden_1eb1u_64", dw = "_label_1eb1u_64", uw = "_lockedNote_1eb1u_84", Ue = {
  root: lw,
  track: iw,
  thumb: sw,
  labelHidden: cw,
  label: dw,
  lockedNote: uw
};
function hw(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function mw(e) {
  return e ? `${Ue.label} ${Ue.labelHidden}` : Ue.label;
}
function ww(e, t, a) {
  return e && !t && a ? a : void 0;
}
function fw(e, t, a, r) {
  return { "aria-describedby": Ft(ot(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function _w({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ye({ label: e, checked: t, onChange: a, disabled: r, locked: o, describedBy: i, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, w = Ee(), { on: f, off: N } = hw(t, r, o, w !== null), k = ww(N, w !== null, c);
  return /* @__PURE__ */ l("span", { className: `${Ue.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": f,
        "aria-label": e,
        "aria-labelledby": d,
        ...fw(h, i, w, k),
        className: `${Ue.track} ward-switch`,
        "data-on": f,
        "data-locked": o ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!f)),
        children: /* @__PURE__ */ n("span", { className: Ue.thumb })
      }
    ),
    /* @__PURE__ */ l("label", { id: d, htmlFor: u, className: mw(s), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ue.lockedNote, children: "always on" })
    ] }),
    /* @__PURE__ */ n(_w, { id: h, reason: k })
  ] });
}
const vw = "_bar_1vp69_2", bw = "_skip_1vp69_11", pw = "_mark_1vp69_22", gw = "_nav_1vp69_30", yw = "_list_1vp69_34", Nw = "_select_1vp69_41", kw = "_selectTrigger_1vp69_45", $w = "_dest_1vp69_52", Cw = "_actor_1vp69_71", Sw = "_actorMark_1vp69_84", Rw = "_actorLabel_1vp69_89", Tw = "_tagline_1vp69_108", se = {
  bar: vw,
  skip: bw,
  mark: pw,
  nav: gw,
  list: yw,
  select: Nw,
  selectTrigger: kw,
  dest: $w,
  actor: Cw,
  actorMark: Sw,
  actorLabel: Rw,
  tagline: Tw
};
function xw(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function Lw(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function ux({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: o, onNavigate: i, skipTo: s = "main" }) {
  const c = Lw(r);
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
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: xw(c) })
    ] })
  ] });
}
const Aw = "_tree_zzoob_2", Ew = "_item_zzoob_6", Iw = "_row_zzoob_10", Mw = "_button_zzoob_22", Mt = {
  tree: Aw,
  item: Ew,
  row: Iw,
  button: Mw
}, lr = Ne(null);
function Bw({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Ot({ orientation: "vertical" });
  return /* @__PURE__ */ n(lr.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: Mt.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const jw = { ArrowRight: !0, ArrowLeft: !1 };
function na(e) {
  return e ? !0 : void 0;
}
function Pw(e, t) {
  const a = jw[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function qw(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function Hw(e) {
  const t = [Mt.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function Ow(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Dw(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Fw(e) {
  return typeof e == "string" ? e : void 0;
}
function zw({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Ww({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function ir(e) {
  const t = ye(lr);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = Ow(e);
  return /* @__PURE__ */ l("li", { className: Mt.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Hw(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": na(e.unresolved),
        "data-inherited": na(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${Mt.button} ward-treeitem-btn`,
            onClick: () => qw(e),
            onKeyDown: (r) => Pw(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Dw(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Fw(e.label), children: e.label }),
              /* @__PURE__ */ n(zw, { value: e.detail }),
              /* @__PURE__ */ n(Ww, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Kw = "_frame_gxspk_2", Gw = "_subjectRail_gxspk_22", Uw = "_subject_gxspk_22", Vw = "_rail_gxspk_42", Yw = "_record_gxspk_57", Jw = "_recordBody_gxspk_102", Qw = "_stageGrid_gxspk_157", Xw = "_band_gxspk_171", Zw = "_bandBody_gxspk_179", ef = "_bandActions_gxspk_184", tf = "_scroller_gxspk_192", nf = "_board_gxspk_219", af = "_lanes_gxspk_228", rf = "_cardGrid_gxspk_262", ee = {
  frame: Kw,
  subjectRail: Gw,
  subject: Uw,
  rail: Vw,
  record: Yw,
  recordBody: Jw,
  stageGrid: Qw,
  band: Xw,
  bandBody: Zw,
  bandActions: ef,
  scroller: tf,
  board: nf,
  lanes: af,
  cardGrid: rf
};
function hx({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: ee.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function aa(e) {
  return e ? "true" : void 0;
}
function mx({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: ee.subjectRail, "data-ward-subject-rail": a, "data-ruled": aa(i), children: [
    /* @__PURE__ */ n("div", { className: ee.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ee.rail, "data-sticky": aa(o), "aria-label": r, children: t })
  ] });
}
function wx({ title: e, children: t, note: a, trailing: r, pad: o = "block", label: i, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(ea, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ l("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(ea, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: ee.recordBody, "data-pad": o, "data-measure": c, children: t })
  ] });
}
const of = "_form_1j8ub_2", lf = "_fields_1j8ub_9", sf = "_actions_1j8ub_19", Qt = {
  form: of,
  fields: lf,
  actions: sf
};
function fx({ label: e, children: t, actions: a, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: Qt.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Qt.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: Qt.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function _x({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ l("section", { className: ee.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ee.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: ee.bandActions, children: t })
  ] });
}
const cf = "(max-width: 767.98px)";
function Cn({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(pn, { className: ee.scroller, label: e, count: a ?? Xr.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function df({ lanes: e, label: t, laneLabel: a }) {
  const [r, o] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ l("div", { className: ee.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(q, { kind: "select", label: a, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ n(Cn, { label: t, children: i == null ? void 0 : i.content })
  ] });
}
function uf({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: ee.board, "data-ward-board": "", children: /* @__PURE__ */ n(Cn, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(ga, { children: a.content }, a.id)) }) });
}
function vx({ children: e, label: t = "Workflow board", lanes: a, laneLabel: r = "Column" }) {
  const o = mt(cf);
  return a === void 0 ? /* @__PURE__ */ n(Cn, { label: t, children: e }) : o ? /* @__PURE__ */ n(df, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(uf, { lanes: a, label: t });
}
function bx({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), i = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ n(pn, { className: ee.stageGrid, label: a, count: o, "data-ward-stage-grid": "", "data-floor": r, style: i, children: t });
}
function px({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${ee.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const hf = "_block_6tv5x_3", mf = "_sentence_6tv5x_10", wf = "_meta_6tv5x_19", ff = "_ways_6tv5x_24", _f = "_action_6tv5x_38", vf = "_strip_6tv5x_42", bf = "_loading_6tv5x_61", pf = "_label_6tv5x_69", gf = "_counter_6tv5x_76", _e = {
  block: hf,
  sentence: mf,
  meta: wf,
  ways: ff,
  action: _f,
  strip: vf,
  loading: bf,
  label: pf,
  counter: gf
};
function yf({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function Kt({ sentence: e, action: t, children: a, role: r = "status", tone: o, kind: i, ask: s }) {
  return /* @__PURE__ */ l("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ l("p", { className: _e.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ l(x, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(yf, { action: t })
  ] });
}
function Nf(e) {
  return /* @__PURE__ */ n(Kt, { ...e, kind: "ward-emptystate" });
}
function gx({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(Kt, { sentence: e, action: a, children: /* @__PURE__ */ l("p", { className: _e.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function kf({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${_e.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function yx({ ways: e, ...t }) {
  return /* @__PURE__ */ n(Kt, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(kf, { ways: e }) });
}
function Nx({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(Kt, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ l("p", { className: _e.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function kx({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ l("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function $x({ queued: e, since: t }) {
  return /* @__PURE__ */ l("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function Cx({ label: e, startedAt: t }) {
  const a = _(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = p(!1);
  S(() => {
    const s = window.setTimeout(() => o(!0), be.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = vn(a.current, r);
  return /* @__PURE__ */ l("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: _e.counter, children: fn(i) }) : null
  ] });
}
const $f = "_note_cigdt_2", Cf = {
  note: $f
};
function Sf({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ l("p", { className: Cf.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const Rf = "_card_k7btg_3", Tf = "_hit_k7btg_31", xf = "_head_k7btg_44", Lf = "_title_k7btg_51", Af = "_meta_k7btg_57", Ef = "_since_k7btg_66", If = "_sep_k7btg_76", Mf = "_fields_k7btg_80", Bf = "_field_k7btg_80", jf = "_last_k7btg_98", Pf = "_reason_k7btg_110", de = {
  card: Rf,
  hit: Tf,
  head: xf,
  title: Lf,
  meta: Af,
  since: Ef,
  sep: If,
  fields: Mf,
  field: Bf,
  last: jf,
  reason: Pf
}, qf = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Hf(e, t, a) {
  const r = St(e, "blue"), o = St(e, "orange"), i = St(e, "green"), s = _(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: o, green: i };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = qf[d.type];
      u && c[u]();
    });
  }, [r, a, i, t, o]);
}
const Of = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Df(e, t) {
  return Of[t](e);
}
function Ff({ item: e, connection: t }) {
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
function zf({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ l("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function Wf({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Kf({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: de.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: de.field, children: Df(e, a) }, a)) });
}
const dn = (e) => e ? !0 : void 0;
function Gf(e) {
  return { "--stream": ge(e.streamStep, "id") };
}
function Uf(e, t, a) {
  e == null || e(t, a);
}
function Vf(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Yf({ item: e, stale: t }) {
  var r, o;
  const a = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: de.last, "data-stale": dn(t), children: a }) : null;
}
function Gt(e) {
  const t = e.fields ?? [], a = e.item, r = _(null);
  Hf(r, a.key, e.feed);
  const o = Vf(e.feed), i = Gf(a);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: de.card,
      style: i,
      "data-selected": dn(e.selected),
      "data-flagged": dn(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: de.hit, onClick: (s) => Uf(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(zf, { item: a }),
        /* @__PURE__ */ n(rt, { as: "p", className: de.title, text: a.title }),
        /* @__PURE__ */ n(Ff, { item: a, connection: o }),
        /* @__PURE__ */ n(Wf, { reason: a.blockedReason }),
        /* @__PURE__ */ n(Kf, { item: a, fields: t }),
        /* @__PURE__ */ n(Yf, { item: a, stale: o === "stale" })
      ]
    }
  );
}
const Jf = "_column_1j8bi_3", Qf = "_head_1j8bi_21", Xf = "_label_1j8bi_30", Zf = "_count_1j8bi_39", e_ = "_list_1j8bi_53", ut = {
  column: Jf,
  head: Qf,
  label: Xf,
  count: Zf,
  list: e_
};
function sr(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function t_({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ l("div", { className: ut.head, children: [
    /* @__PURE__ */ n("h2", { className: ut.label, id: a, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ l("span", { className: ut.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function n_(e) {
  return /* @__PURE__ */ n("div", { className: ut.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      Gt,
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
function a_({ column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && t.length > e.cap, w = sr(t, r);
  return /* @__PURE__ */ l("section", { className: ut.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(t_, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(n_, { column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n(Sf, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const r_ = "_foot_cs4jr_2", o_ = "_note_cs4jr_13", l_ = "_link_cs4jr_19", Xt = {
  foot: r_,
  note: o_,
  link: l_
};
function Sx({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: Xt.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Xt.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Xt.link} ward-target`, href: L(e), children: "Configure board" })
  ] });
}
const i_ = "_head_1tfi5_3", s_ = "_identity_1tfi5_12", c_ = "_titleRow_1tfi5_18", d_ = "_title_1tfi5_18", u_ = "_key_1tfi5_35", h_ = "_rollup_1tfi5_45", m_ = "_tools_1tfi5_53", w_ = "_swatch_1tfi5_101", f_ = "_mark_1tfi5_108", Se = {
  head: i_,
  identity: s_,
  titleRow: c_,
  title: d_,
  key: u_,
  rollup: h_,
  tools: m_,
  swatch: w_,
  mark: f_
}, ra = "initials:";
function __(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function v_(e) {
  const t = [__(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function b_(e) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ l("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    v_(e)
  ] });
}
function p_(e) {
  return e.startsWith(ra) ? e.slice(ra.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function g_({ markRef: e, streamStep: t }) {
  const a = { "--stream": ge(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Se.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: p_(e) }) : /* @__PURE__ */ n("span", { className: Se.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function y_({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function Rx({
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
        /* @__PURE__ */ n(g_, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Se.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Se.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Se.rollup, "aria-live": "polite", children: b_(t) })
    ] }),
    /* @__PURE__ */ l("div", { className: Se.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(y_, { owners: o, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n($n, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const N_ = "_head_1sejb_14", k_ = "_line_1sejb_15", $_ = "_cHandle_1sejb_36", C_ = "_cName_1sejb_41", S_ = "_nameLine_1sejb_49", R_ = "_cLabel_1sejb_56", T_ = "_cCap_1sejb_61", x_ = "_cShown_1sejb_66", L_ = "_name_1sejb_49", A_ = "_noCap_1sejb_88", E_ = "_state_1sejb_102", I_ = "_handle_1sejb_111", M_ = "_sub_1sejb_137", O = {
  head: N_,
  line: k_,
  cHandle: $_,
  cName: C_,
  nameLine: S_,
  cLabel: R_,
  cCap: T_,
  cShown: x_,
  name: L_,
  noCap: A_,
  state: E_,
  handle: I_,
  sub: M_
}, B_ = "can't be hidden or collapsed", j_ = "terminal · counted, not a column", P_ = "A human gate is always shown, so people see what waits for them.", q_ = "A terminal stage is counted, not shown as a column.";
function Tx() {
  return /* @__PURE__ */ l("div", { className: O.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: O.cHandle }),
    /* @__PURE__ */ n("span", { className: O.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: O.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: O.cShown, children: "Shown" })
  ] });
}
function H_(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function O_(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function oa(e) {
  return e.gate ? B_ : e.terminal ? j_ : O_(e.agentsMounted);
}
function D_(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function F_({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: O.cName, children: [
    /* @__PURE__ */ l("span", { className: O.nameLine, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    oa(e) && /* @__PURE__ */ n("span", { className: O.sub, children: oa(e) })
  ] });
}
function z_(e) {
  return e === void 0 ? "" : String(e);
}
function W_(e) {
  return e === "" ? void 0 : Number(e);
}
function K_({ name: e, onReorder: t }) {
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
      onKeyDown: (r) => !a && D_(r, t),
      children: "⠿"
    }
  ) });
}
function G_({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${O.cCap} ${O.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: O.cCap, children: /* @__PURE__ */ n(q, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: z_(t.cap), onChange: (r) => a({ ...t, cap: W_(r) }) }) });
}
function U_(e) {
  return e.gate ? P_ : e.terminal ? q_ : void 0;
}
function V_({ stage: e, config: t, onChange: a }) {
  const r = Ee() !== null, o = H_(e, t.shown), i = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ l("span", { className: O.cShown, children: [
    /* @__PURE__ */ n(Ye, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, disabledReason: U_(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: O.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!o.shown), children: o.state })
  ] });
}
function Y_(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function xx({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: O.line, "data-kind": Y_(e), children: [
    /* @__PURE__ */ n(K_, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(F_, { stage: e }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: /* @__PURE__ */ n(q, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (o) => a({ ...t, label: o }) }) }),
    /* @__PURE__ */ n(G_, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(V_, { stage: e, config: t, onChange: a })
  ] });
}
const J_ = "_body_8qsv9_2", Q_ = "_head_8qsv9_9", X_ = "_summary_8qsv9_19", Z_ = "_block_8qsv9_20", ev = "_actionsBlock_8qsv9_21", tv = "_title_8qsv9_41", nv = "_note_8qsv9_46", av = "_k_8qsv9_51", rv = "_kv_8qsv9_58", ov = "_row_8qsv9_64", lv = "_label_8qsv9_75", iv = "_value_8qsv9_84", sv = "_quote_8qsv9_90", cv = "_actions_8qsv9_21", dv = "_resolve_8qsv9_111", F = {
  body: J_,
  head: Q_,
  summary: X_,
  block: Z_,
  actionsBlock: ev,
  title: tv,
  note: nv,
  k: av,
  kv: rv,
  row: ov,
  label: lv,
  value: iv,
  quote: sv,
  actions: cv,
  resolve: dv
};
function uv(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function hv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Ae, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function mv(e) {
  const t = vt(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function wv(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function fv(e, t, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...zt(mv(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...uv(e),
    ...wv(a),
    ...hv(e, t)
  ];
}
function _v({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: F.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: F.k, children: t }),
    e
  ] });
}
function vv(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function bv({ item: e, showKey: t }) {
  const a = vv(e);
  return !t && !a ? null : /* @__PURE__ */ l("div", { className: F.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function pv({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: F.block, children: [
    /* @__PURE__ */ n("p", { className: F.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: F.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: F.note, children: e.agentMeta })
  ] }) : null;
}
function Lx({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: o, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), w = fv(e, o, d);
  return /* @__PURE__ */ n(lt, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: F.body, children: [
    /* @__PURE__ */ n(bv, { item: e, showKey: u }),
    /* @__PURE__ */ l("div", { className: F.summary, children: [
      /* @__PURE__ */ n("h2", { className: F.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: F.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: F.kv, children: w.map(([f, N, k]) => /* @__PURE__ */ l("div", { className: F.row, children: [
      /* @__PURE__ */ n("dt", { className: F.label, children: f }),
      /* @__PURE__ */ n("dd", { className: F.value, children: N })
    ] }, k ?? f)) }),
    /* @__PURE__ */ n(pv, { item: e }),
    /* @__PURE__ */ l("div", { className: F.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: F.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: F.note, children: c })
    ] }),
    /* @__PURE__ */ n(_v, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const gv = "_root_3azmy_2", yv = "_list_3azmy_7", Nv = "_item_3azmy_12", kv = "_box_3azmy_18", $v = "_text_3azmy_23", Cv = "_note_3azmy_28", Qe = {
  root: gv,
  list: yv,
  item: Nv,
  box: kv,
  text: $v,
  note: Cv
};
function Ut({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ l("div", { className: Qe.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${Qe.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Qe.box, children: /* @__PURE__ */ n(kn, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Qe.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${Qe.note} ward-checklist-note`, children: t })
  ] });
}
const Sv = "_rail_znbbp_2", Rv = "_k_znbbp_11", Tv = "_head_znbbp_19", xv = "_section_znbbp_25", Lv = "_card_znbbp_39", Av = "_strip_znbbp_46", Ev = "_skeleton_znbbp_60", Iv = "_skeletonLabel_znbbp_74", Mv = "_bar_znbbp_80", Bv = "_note_znbbp_89", fe = {
  rail: Sv,
  k: Rv,
  head: Tv,
  section: xv,
  card: Lv,
  strip: Av,
  skeleton: Ev,
  skeletonLabel: Iv,
  bar: Mv,
  note: Bv
};
function jv(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Zt({ title: e, children: t }) {
  return /* @__PURE__ */ l("section", { className: fe.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: fe.k, children: e }),
    t
  ] });
}
function Pv({ column: e, count: t }) {
  return /* @__PURE__ */ l("div", { className: fe.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: fe.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: fe.bar, "aria-hidden": "true" }, r))
  ] });
}
function qv({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(a_, { column: o, items: t.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, o.id));
}
function Hv(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(qv, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(Pv, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function Ax(e) {
  const t = jv(e.onOpen), a = sr(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: fe.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${fe.k} ${fe.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Zt, { title: "Card", children: /* @__PURE__ */ n("div", { className: fe.card, children: a && /* @__PURE__ */ n(Gt, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ l(Zt, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: fe.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Hv, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Zt, { title: "Effect of this config", children: /* @__PURE__ */ n(Ut, { items: e.effects, density: "compact" }) })
  ] });
}
function Ov(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function Dv(e) {
  return Math.ceil(e.length / 2);
}
function Fv(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function cr(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function zv(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const o = cr(e);
  o !== void 0 && a(o), r(Fv(e.type));
}
function Wv(e, t, a, r, o) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (i) => zv(i, a, r, o));
  }, [e, t, a, r, o]);
}
function Kv(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Gv(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Uv(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Vv(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(Dv(t ?? [])) + ")"
  };
}
function Yv(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Jv(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: le(e.cost) }) : null;
}
function Qv(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Xv(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Ae, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function Zv(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function eb(e, t) {
  return t === void 0 ? e : Ov(e, t.ref);
}
function tb(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function wt(e) {
  return e === !0 ? "true" : void 0;
}
function dr(e) {
  const t = e.item, a = t.run, r = a !== void 0, o = _(null), i = St(o), s = _(/* @__PURE__ */ new Set()), [c, d] = p(Kv(t));
  Wv(e.feed, t.key, s, d, i);
  const u = Gv(t, r), h = Uv(t, a), w = Vv(t, e.fields), f = Zv(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...tb(e),
      className: "ward-workcard",
      "data-flagged": wt(t.flagged),
      "data-selected": wt(e.selected),
      style: w,
      ref: eb(o, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        Yv(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          Jv(t, e.fields),
          Qv(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          Xv(a, c, e.connection, t.changedAt),
          f !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function nb({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function ab(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function rb(e, t, a) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function ob(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(nb, { count: e.items.length, cap: e.column.cap });
}
function lb(e, t) {
  return e.roving ?? t;
}
function ib(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function sb(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    dr,
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
function cb(e) {
  const t = y(), a = Ot({ orientation: "vertical" }), r = lb(e, a), o = ab(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": wt(o), "data-gate": wt(e.column.gate), children: [
    rb(e.column, e.items.length, t),
    ob(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...ib(e, a), children: sb(e, r) })
  ] });
}
function db(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function ub(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function hb(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function Ex(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: db(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      ub(e),
      hb(e.onConfigure),
      /* @__PURE__ */ n($n, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function mb(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function wb(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ye, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ye, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function fb(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(x, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function Ix(e) {
  const t = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": wt(mb(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: wb(e) }),
    /* @__PURE__ */ n(q, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(Ia, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    fb(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function Mx(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(dr, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(cb, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function _b(e, t) {
  const a = cr(e);
  a !== void 0 && t(a);
}
function vb(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => _b(r, a));
  }, [e, t, a]);
}
function bb(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function pb(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function gb(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Ae, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function yb(e, t) {
  return /* @__PURE__ */ l(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function Bx(e) {
  var s;
  const t = e.item, a = t.run, [r, o] = p((s = t.run) == null ? void 0 : s.lastStep);
  vb(e.feed, t.key, o);
  const i = [...bb(t), ...pb(t)];
  return /* @__PURE__ */ l(lt, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      gb(a, r)
    ] }),
    yb(t, e.actions)
  ] });
}
const Nb = "_card_1nkkx_3", kb = "_head_1nkkx_30", $b = "_mark_1nkkx_38", Cb = "_name_1nkkx_50", Sb = "_chips_1nkkx_71", Rb = "_description_1nkkx_77", Tb = "_run_1nkkx_82", xb = "_sep_1nkkx_91", Lb = "_facts_1nkkx_97", Ab = "_fact_1nkkx_97", Eb = "_factLabel_1nkkx_111", Ib = "_factValue_1nkkx_115", ie = {
  card: Nb,
  head: kb,
  mark: $b,
  name: Cb,
  chips: Sb,
  description: Rb,
  run: Tb,
  sep: xb,
  facts: Lb,
  fact: Ab,
  factLabel: Eb,
  factValue: Ib
}, Mb = { live: "done", draft: "running", paused: "meta" };
function Bb(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function jb({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: Mb[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function Pb({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function qb({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Ae, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function Hb({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ l("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function Ob(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Db({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: o, facts: i, className: s }) {
  const c = { "--stream": ge(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": d,
      className: Bb(s),
      style: c,
      "data-selected": d,
      "data-paused": Ob(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ l("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: L(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(Pb, { description: e.description }),
        /* @__PURE__ */ n(qb, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(jb, { versions: e.versions }),
        /* @__PURE__ */ n(Hb, { facts: i })
      ]
    }
  );
}
const Fb = "_list_4dcyc_2", zb = "_row_4dcyc_11", Wb = "_head_4dcyc_23", Kb = "_id_4dcyc_30", Gb = "_lock_4dcyc_35", Ub = "_reason_4dcyc_41", Vb = "_remove_4dcyc_46", Yb = "_clauses_4dcyc_50", Jb = "_clause_4dcyc_50", Qb = "_label_4dcyc_64", Xb = "_cell_4dcyc_71", Zb = "_value_4dcyc_76", ce = {
  list: Fb,
  row: zb,
  head: Wb,
  id: Kb,
  lock: Gb,
  reason: Ub,
  remove: Vb,
  clauses: Yb,
  clause: Jb,
  label: Qb,
  cell: Xb,
  value: Zb
}, ur = Ne(!1);
function jx({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(ur.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function ep({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(q, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => a(e.key, o) });
}
function tp({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function np({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ l("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(tp, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function la(e, t) {
  return e.locked ? void 0 : t;
}
function Px({ rule: e, onChange: t, onRemove: a }) {
  if (!ye(ur)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = la(e, t);
  return /* @__PURE__ */ l("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(np, { rule: e, onRemove: la(e, a) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(ep, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const ap = "_ladder_1xdeh_2", rp = "_cell_1xdeh_7", op = "_empty_1xdeh_26", lp = "_name_1xdeh_34", ip = "_holder_1xdeh_40", sp = "_request_1xdeh_46", cp = "_swatches_1xdeh_51", dp = "_swatch_1xdeh_51", up = "_tilesFrame_1xdeh_78", hp = "_tiles_1xdeh_78", mp = "_tile_1xdeh_78", wp = "_bar_1xdeh_117", fp = "_hex_1xdeh_128", _p = "_note_1xdeh_138", B = {
  ladder: ap,
  cell: rp,
  empty: op,
  name: lp,
  holder: ip,
  request: sp,
  swatches: cp,
  swatch: dp,
  tilesFrame: up,
  tiles: hp,
  tile: mp,
  bar: wp,
  hex: fp,
  note: _p
}, qx = "not validated yet, pending a CVD matrix and dark stepping";
function vp(e) {
  return e.reserved ? "reserved" : ft(e.step) ? "validated" : "partial";
}
function hr(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function bp(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function pp({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(ze, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${B.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function gp(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function yp(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const ia = (e) => String(e).padStart(2, "0");
function Np(e, t, a) {
  return e === "reserved" ? "Reserved until revalidated" : a ? "yours" : t ?? hr(e, void 0);
}
function kp({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${B.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.hex} ward-ladder-hex`, children: r ? `step ${ia(e)}` : go(e) }),
    /* @__PURE__ */ n("span", { className: `${B.note} ward-ladder-note`, children: r ? a : `Step ${ia(e)} · ${a}` })
  ] });
}
function $p({ step: e, value: t, taken: a, onChange: r, presentation: o, disabled: i }) {
  const s = vp(e), c = hr(s, a), d = c !== "free", u = d || i, h = t === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, N = `${w} · ${o === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...yp(d, h, u), "data-validation": s, style: bp(e, s), onClick: f, onKeyDown: (E) => gp(E, f) }, label: N, name: w, holder: c, validation: s, note: Np(s, a, h), step: e.step };
}
const Cp = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${B.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${B.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(kp, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${B.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(pp, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${B.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${B.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Sp(e) {
  return Cp[e.presentation]($p(e));
}
function Rp(e) {
  for (const t of e)
    if (!t.reserved && !Dt(t.step)) throw new Error("colour ladder renders token steps only");
}
function Tp() {
  return /* @__PURE__ */ l("div", { className: `${B.cell} ward-ladder-cell ${B.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${B.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${B.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function xp(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Lp = { list: B.ladder, swatches: B.swatches, tiles: B.tilesFrame };
function Ap() {
  return /* @__PURE__ */ l("div", { className: `${B.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${B.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${B.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Ep = { list: Tp, swatches: () => null, tiles: Ap };
function Ip(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function mr(e) {
  const t = e.takenBy ?? {}, a = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Rp(e.steps);
  const r = xp(e), o = Ep[r], i = /* @__PURE__ */ l(x, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(Sp, { step: s, value: e.value, taken: t[s.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Ip(e.disabled === !0), className: `${Lp[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: B.tiles, children: i }) : i });
}
const Mp = "_rail_s06lm_2", Bp = "_section_s06lm_12", jp = "_sectionFlush_s06lm_22", Pp = "_head_s06lm_26", qp = "_headLabel_s06lm_34", Hp = "_sample_s06lm_42", Op = "_sampleLabel_s06lm_47", Dp = "_sampleTitle_s06lm_54", Fp = "_sampleMeta_s06lm_59", zp = "_trace_s06lm_65", Wp = "_traceHead_s06lm_70", Kp = "_steps_s06lm_78", Gp = "_step_s06lm_78", Up = "_stepTitle_s06lm_97", Vp = "_hollow_s06lm_107", Yp = "_stepBody_s06lm_115", Jp = "_stepDetail_s06lm_127", Qp = "_publish_s06lm_132", Xp = "_reason_s06lm_138", Zp = "_note_s06lm_143", eg = "_reveal_s06lm_148", $ = {
  rail: Mp,
  section: Bp,
  sectionFlush: jp,
  head: Pp,
  headLabel: qp,
  sample: Hp,
  sampleLabel: Op,
  sampleTitle: Dp,
  sampleMeta: Fp,
  trace: zp,
  traceHead: Wp,
  steps: Kp,
  step: Gp,
  stepTitle: Up,
  hollow: Vp,
  stepBody: Yp,
  stepDetail: Jp,
  publish: Qp,
  reason: Xp,
  note: Zp,
  reveal: eg
}, sa = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, tg = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, ng = { ok: "greenFill", finding: "orangeFill", action: "blue" }, ag = { notSimulated: "not simulated", running: "running" };
function rg(e) {
  return e.presentation === "foundry";
}
function og(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const a = t.filter((r) => !r.met);
  return a.length > 0 ? `Publish is disabled: ${a.length} of ${t.length} gate conditions unmet: ${a[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function lg(e, t) {
  var r;
  const a = tg[e.status];
  return a !== void 0 ? a : ((r = t.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function ig(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function sg(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function cg(e) {
  if (ig(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function dg(e) {
  const [t, a] = p(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function ug(e) {
  const t = ag[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(ze, { size: 6, kind: ng[e.kind], label: e.kind });
}
function hg(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function mg(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Ae, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function wg(e) {
  const { step: t } = e;
  return /* @__PURE__ */ l(dg, { kind: t.kind, children: [
    /* @__PURE__ */ n(ug, { kind: t.kind }),
    /* @__PURE__ */ l("span", { className: $.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: $.stepTitle, children: t.title }),
      /* @__PURE__ */ n(hg, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(mg, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function fg(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(ue(t)), a.join(" · ");
}
function wr(e) {
  const t = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.traceHead, id: t, children: fg(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: $.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(wg, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function _g(e) {
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
function vg(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function bg(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? Na(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Wt, { divided: !0, cells: t }) });
}
function pg(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: Na(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function gg(e) {
  const t = pg(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ l("p", { className: $.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Wt, { divided: !0, cells: t }) });
}
function fr(e) {
  const t = y();
  return e.reason !== null ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: `${$.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function yg(e) {
  return /* @__PURE__ */ l("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ n(fr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: $.note, children: e.note })
  ] });
}
function Ng(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ n(fr, { reason: e.reason, onPublish: e.onPublish }) });
}
function _r(e) {
  return /* @__PURE__ */ l("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: sa[e.run.status].role, label: sa[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Ae, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function kg(e, t) {
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
function $g(e) {
  var a;
  sg(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(_r, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(_g, { sample: e.run.sample }),
    /* @__PURE__ */ n(wr, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(bg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Ut, { items: e.checklist }) }),
    /* @__PURE__ */ n(yg, { reason: og(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Cg(e) {
  var r;
  const t = kg(e.run, e.feed);
  cg(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(_r, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(vg, { sample: e.run.sample }),
    /* @__PURE__ */ n(wr, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(gg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Ut, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Ng, { reason: lg(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function Hx(e) {
  return rg(e) ? /* @__PURE__ */ n(Cg, { ...e }) : /* @__PURE__ */ n($g, { ...e });
}
const Sg = "_list_142ip_3", Rg = "_row_142ip_9", Tg = "_condition_142ip_18", xg = "_action_142ip_24", Tt = {
  list: Sg,
  row: Rg,
  condition: Tg,
  action: xg
}, vr = Ne(!1);
function Ox({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(vr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: Tt.list, "aria-label": t, children: e }) });
}
function Dx({ rule: e }) {
  if (!ye(vr)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: Tt.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: Tt.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: Tt.action, children: e.then })
  ] });
}
const Lg = "_move_tmppt_3", Ag = {
  move: Lg
};
function un(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [o] = r.splice(t, 1);
  return r.splice(a, 0, o), r;
}
function br(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function pr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function ca(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function Eg(e) {
  return e === "up" ? "down" : "up";
}
function Ig(e, t) {
  const a = ca(e, t.id, t.direction) ?? ca(e, t.id, Eg(t.direction));
  a == null || a.focus();
}
function gr() {
  const e = _(null), [t, a] = p(null), [r, o] = p("");
  return S(() => {
    e.current !== null && t !== null && Ig(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), o(c);
  } };
}
function yr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Bt({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${Ag.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const Mg = "_body_1jd1i_2", Bg = "_title_1jd1i_8", jg = "_section_1jd1i_13", Pg = "_legend_1jd1i_18", qg = "_stages_1jd1i_26", Hg = "_stage_1jd1i_26", Og = "_stageIndex_1jd1i_44", Dg = "_stageName_1jd1i_50", Fg = "_footer_1jd1i_59", zg = "_note_1jd1i_66", Wg = "_reason_1jd1i_71", Kg = "_actions_1jd1i_76", Gg = "_webHead_1jd1i_83", Ug = "_kicker_1jd1i_92", Vg = "_webTitle_1jd1i_99", Yg = "_webBody_1jd1i_105", Jg = "_webSection_1jd1i_109", Qg = "_sectionHead_1jd1i_121", Xg = "_sectionNote_1jd1i_129", Zg = "_formLabel_1jd1i_134", ey = "_identityRow_1jd1i_139", ty = "_nameCell_1jd1i_145", ny = "_keyCell_1jd1i_150", ay = "_colourCell_1jd1i_154", ry = "_colourStatus_1jd1i_161", oy = "_webStages_1jd1i_166", ly = "_webStageList_1jd1i_172", iy = "_webStage_1jd1i_166", sy = "_webIndex_1jd1i_191", cy = "_webStageName_1jd1i_196", dy = "_webMoves_1jd1i_201", uy = "_addStage_1jd1i_215", hy = "_addStageButton_1jd1i_223", my = "_addStageNote_1jd1i_231", wy = "_webFooter_1jd1i_236", fy = "_webFooterNotes_1jd1i_244", _y = "_webNote_1jd1i_251", v = {
  body: Mg,
  title: Bg,
  section: jg,
  legend: Pg,
  stages: qg,
  stage: Hg,
  stageIndex: Og,
  stageName: Dg,
  footer: Fg,
  note: zg,
  reason: Wg,
  actions: Kg,
  webHead: Gg,
  kicker: Ug,
  webTitle: Vg,
  webBody: Yg,
  webSection: Jg,
  sectionHead: Qg,
  sectionNote: Xg,
  formLabel: Zg,
  identityRow: ey,
  nameCell: ty,
  keyCell: ny,
  colourCell: ay,
  colourStatus: ry,
  webStages: oy,
  webStageList: ly,
  webStage: iy,
  webIndex: sy,
  webStageName: cy,
  webMoves: dy,
  addStage: uy,
  addStageButton: hy,
  addStageNote: my,
  webFooter: wy,
  webFooterNotes: fy,
  webNote: _y
}, vy = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Nr = "not in catalogue";
function by(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${Nr}` }, ...a];
}
function py({ stage: e, index: t, catalogue: a, onName: r }) {
  const o = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(q, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Nr}`;
  return /* @__PURE__ */ n(q, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: by(a, e.name), invalid: i, onChange: r });
}
function kr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function gy(e) {
  const t = _([]), a = _(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function yy({ id: e, stage: t, index: a, total: r, catalogue: o, onReplace: i, onMove: s }) {
  const c = kr(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: v.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: v.webStageName, children: /* @__PURE__ */ n(py, { stage: t, index: a, catalogue: o, onName: (u) => i({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(q, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: vy, onChange: (u) => i({ ...t, kind: u }) }),
    /* @__PURE__ */ l("span", { className: v.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(Bt, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(Bt, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Ny({ stages: e, onChange: t, catalogue: a }) {
  const r = gy(e.length), o = gr(), i = (c, d) => {
    const u = br(c, d);
    r.current = un(r.current, c, u), o.moved({ id: r.current[u], direction: d }, pr(kr(e[c], c), u, e.length)), t(un(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ l("div", { className: v.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(yy, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(yr, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: v.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const ky = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], $y = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Cy = "A new stream starts as a draft. Nothing runs on it until you publish it.", Sy = "Create is disabled: name the stream and give it a key first.", Ry = "reorder with the ↑ ↓ buttons · min 2";
function Sn(e, t) {
  return !e.reserved && ft(e.step) && t[e.step] === void 0;
}
function Ty(e, t) {
  const a = e.find((r) => Sn(r, t));
  return a ? a.step : 1;
}
function xy({ stages: e, onMove: t }) {
  const a = gr(), r = (o, i) => {
    const s = br(o, i);
    a.moved({ id: e[o].id, direction: i }, pr(e[o].name, s, e.length)), t(o, s);
  };
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: v.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: v.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: v.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(Bt, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(Bt, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(yr, { text: a.announcement })
  ] });
}
function Ly({ reason: e, onCreate: t, onDraft: a }) {
  const r = y();
  return /* @__PURE__ */ l("div", { className: v.footer, children: [
    /* @__PURE__ */ n("p", { className: v.note, children: Cy }),
    e && /* @__PURE__ */ n("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: v.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function Ay(e, t) {
  return e !== "" && t !== "" ? null : Sy;
}
function Ey(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: o = $y, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = y(), [h, w] = p(""), [f, N] = p(""), [k, E] = p(t[0].value), [H, me] = p(() => Ty(a, r)), [re, Ie] = p(e.stages ?? ky), [Je, T] = p(o[0].value), J = { name: h, key: f, streamStep: H, owner: k, stages: re, policy: Je }, ke = Ay(h, f);
  return /* @__PURE__ */ n(lt, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ l("div", { className: v.body, children: [
    /* @__PURE__ */ n("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ n(q, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ n(q, { kind: "input", label: "Key", value: f, onChange: N, mono: !0 }),
      /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: k, onChange: E, options: t })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ n(mr, { label: "Stream colour", steps: a, value: H, onChange: me, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ n(xy, { stages: re, onMove: (We, Jr) => Ie(un(re, We, Jr)) })
    ] }),
    /* @__PURE__ */ n(nr, { legend: "Loop policy", options: o, value: Je, onChange: T }),
    /* @__PURE__ */ n(Ly, { reason: ke, onCreate: () => i(J), onDraft: () => s(J) })
  ] }) });
}
const $r = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Iy = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function My(e, t, a, r, o, i) {
  var c;
  const s = ((c = $r.find((d) => d.value === o)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: i };
}
function By(e, t) {
  return jy(e) && Py(e, t) && qy(e);
}
function jy(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Py(e, t) {
  return e.colourStep === null || Sn({ step: e.colourStep }, t);
}
function qy(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function Hy(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : Sn({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Oy({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function Dy({ ready: e, draft: t, agentStage: a, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: v.webFooter, children: [
    /* @__PURE__ */ l("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ n(Oy, { stage: a }),
      !e && /* @__PURE__ */ n("p", { id: i, className: v.reason, children: Iy })
    ] }),
    o && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => o(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Fy({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: v.webHead, children: [
    /* @__PURE__ */ n("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function zy({ name: e, setName: t, streamKey: a, setKey: r, colour: o, owner: i }) {
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
function Wy(e) {
  const t = y(), a = y(), r = e.takenBy ?? {}, [o, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [f, N] = p("relay"), [k, E] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), H = My(o, s, d, h, f, k), me = By(H, r), re = k.find((T) => T.kind === "agent" && T.name.trim() !== ""), Ie = /* @__PURE__ */ l("div", { className: v.colourCell, children: [
    /* @__PURE__ */ n("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(mr, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Je = /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: v.colourStatus, "data-colour-status": "", children: Hy(h, r) }),
    /* @__PURE__ */ n(q, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((T) => ({ value: T, label: T })), onChange: u })
  ] });
  return /* @__PURE__ */ l(lt, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Fy, { titleId: a }),
    /* @__PURE__ */ l("div", { className: v.webBody, children: [
      /* @__PURE__ */ n(zy, { name: o, setName: i, streamKey: s, setKey: c, colour: Ie, owner: Je }),
      e.fields && /* @__PURE__ */ n("section", { className: v.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ l("section", { className: v.webSection, children: [
        /* @__PURE__ */ l("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: v.sectionNote, children: Ry })
        ] }),
        /* @__PURE__ */ n(Ny, { stages: k, onChange: E })
      ] }),
      /* @__PURE__ */ n("section", { className: v.webSection, children: /* @__PURE__ */ n(nr, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: $r, onChange: N }) }),
      /* @__PURE__ */ n(Dy, { ready: me, draft: H, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function Fx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Wy, { ...e }) : /* @__PURE__ */ n(Ey, { ...e });
}
const Ky = "_row_bs8hc_2", Gy = "_cell_bs8hc_6", Uy = "_condition_bs8hc_11", Vy = "_action_bs8hc_18", Yy = "_contract_bs8hc_24", Jy = "_contractCondition_bs8hc_33", Qy = "_contractAction_bs8hc_39", ne = {
  row: Ky,
  cell: Gy,
  condition: Uy,
  action: Vy,
  contract: Yy,
  contractCondition: Jy,
  contractAction: Qy
}, Cr = ["advance", "block", "escalate", "requestReview"], da = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function jt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Rn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ne.action, children: da[e.then] }) : /* @__PURE__ */ n(
    q,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => t({ ...e, then: o }),
      options: Cr.map((o) => ({ value: o, label: da[o] }))
    }
  );
}
function Xy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n("span", { className: ne.condition, title: jt(e, r), children: jt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: Rn(e, t, a) })
  ] });
}
function Zy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ l("td", { className: ne.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ne.condition, children: jt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: Rn(e, t, a) })
  ] });
}
function eN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: ne.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ne.contractCondition, children: jt(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ne.contractAction, children: Rn(e, t, a, !0) })
  ] });
}
const tN = { two: Zy, four: Xy, contract: eN };
function zx(e) {
  var a;
  if (!Cr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = tN[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const nN = "_column_g1uat_2", aN = "_head_g1uat_17", rN = "_index_g1uat_23", oN = "_name_g1uat_29", lN = "_meta_g1uat_38", iN = "_mono_g1uat_43", sN = "_gate_g1uat_50", cN = "_reviewersLabel_g1uat_57", dN = "_reviewers_g1uat_57", uN = "_reviewer_g1uat_57", hN = "_agents_g1uat_74", mN = "_workflowColumn_g1uat_79", wN = "_workflowHead_g1uat_96", fN = "_stageRow_g1uat_102", _N = "_stageLabel_g1uat_109", vN = "_workflowTitle_g1uat_116", bN = "_workflowMeta_g1uat_122", pN = "_workflowGate_g1uat_127", gN = "_gateNote_g1uat_135", yN = "_cardNote_g1uat_140", NN = "_reviewerList_g1uat_145", kN = "_reviewerRow_g1uat_151", $N = "_reviewerMark_g1uat_157", CN = "_reviewerName_g1uat_167", SN = "_terminalCard_g1uat_173", RN = "_terminalCount_g1uat_182", TN = "_workflowAgents_g1uat_188", xN = "_mount_g1uat_194", R = {
  column: nN,
  head: aN,
  index: rN,
  name: oN,
  meta: lN,
  mono: iN,
  gate: sN,
  reviewersLabel: cN,
  reviewers: dN,
  reviewer: uN,
  agents: hN,
  workflowColumn: mN,
  workflowHead: wN,
  stageRow: fN,
  stageLabel: _N,
  workflowTitle: vN,
  workflowMeta: bN,
  workflowGate: pN,
  gateNote: gN,
  cardNote: yN,
  reviewerList: NN,
  reviewerRow: kN,
  reviewerMark: $N,
  reviewerName: CN,
  terminalCard: SN,
  terminalCount: RN,
  workflowAgents: TN,
  mount: xN
}, LN = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function Tn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function Sr(e) {
  return `${Math.round(e * 100)}%`;
}
function AN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Wt, { cells: [
      { value: Sr(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function EN({ stage: e }) {
  return /* @__PURE__ */ n(Wt, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: Tn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function IN({ stage: e, titleId: t }) {
  return /* @__PURE__ */ l("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: LN[e.kind] })
  ] });
}
function MN({ stage: e }) {
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
function BN({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(AN, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(EN, { stage: e }) : null;
}
function jN({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function PN({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const o = y(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: R.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(IN, { stage: e, titleId: o }),
    /* @__PURE__ */ n(MN, { stage: e }),
    /* @__PURE__ */ n(BN, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(Db, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(jN, { onMount: a })
  ] });
}
const qN = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function HN({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ l("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function ON({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: R.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ n(HN, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: Sr(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function DN(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function FN({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: Tn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: DN(e.rolledBackThisWeek) })
  ] });
}
function zN(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function WN(e) {
  if (e.kind === "terminal") return `${Tn(e.closedThisWeek)} this week`;
  const t = zN(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function KN({ stage: e, titleId: t }) {
  const a = qN[e.kind];
  return /* @__PURE__ */ l("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: R.stageRow, children: [
      /* @__PURE__ */ l("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: WN(e) })
  ] });
}
function GN(e) {
  return e === "entry" || e === "agent";
}
function UN({ stage: e, onMount: t }) {
  return t === void 0 || !GN(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Mount agent" });
}
function VN({ stage: e, agentCards: t, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ l("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(KN, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(ON, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(FN, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(UN, { stage: e, onMount: a })
  ] });
}
function YN(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function Wx(e) {
  return YN(e) ? /* @__PURE__ */ n(VN, { ...e }) : /* @__PURE__ */ n(PN, { ...e });
}
const JN = "_row_1tdra_6", QN = "_name_1tdra_12", XN = "_compactRow_1tdra_13", ZN = "_compactName_1tdra_13", e1 = "_cell_1tdra_30", t1 = "_chain_1tdra_45", n1 = "_owner_1tdra_51", a1 = "_mono_1tdra_57", r1 = "_compactCell_1tdra_79", o1 = "_stack_1tdra_96", l1 = "_stat_1tdra_103", i1 = "_identityLine_1tdra_110", s1 = "_identity_1tdra_110", c1 = "_ownerLine_1tdra_140", d1 = "_link_1tdra_160", u1 = "_gateMark_1tdra_166", h1 = "_emptyChain_1tdra_171", m1 = "_arrow_1tdra_177", w1 = "_muted_1tdra_182", f1 = "_define_1tdra_187", _1 = "_statValue_1tdra_194", v1 = "_policyId_1tdra_200", b1 = "_sub_1tdra_205", g = {
  row: JN,
  name: QN,
  compactRow: XN,
  compactName: ZN,
  cell: e1,
  chain: t1,
  owner: n1,
  mono: a1,
  compactCell: r1,
  stack: o1,
  stat: l1,
  identityLine: i1,
  identity: s1,
  ownerLine: c1,
  link: d1,
  gateMark: u1,
  emptyChain: h1,
  arrow: m1,
  muted: w1,
  define: f1,
  statValue: _1,
  policyId: v1,
  sub: b1
};
function Rr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function p1(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function g1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Tr(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function y1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Tr(e.members)}`;
}
function N1(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ l("span", { className: g.stack, children: [
    /* @__PURE__ */ l("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: L(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: y1(e) })
  ] }) });
}
function xr({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ l(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function k1(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = vt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function $1({ stages: e, streamStep: t }) {
  const a = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((o, i) => /* @__PURE__ */ l("span", { className: g.link, children: [
    /* @__PURE__ */ n(xr, { name: o.name, gate: o.gate === !0, look: k1(i, a, t), size: "tag" }),
    i === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${i}`)) });
}
function C1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ l("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : $1(e) });
}
function Lr(e) {
  return e === void 0 ? void 0 : !0;
}
function ua(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Lr(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function S1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function R1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function T1({ stream: e, href: t, presentation: a }) {
  const r = g1(a.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, onClick: Rr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ge(e.streamStep, "chip") }, children: [
    N1(e, t),
    C1(e),
    ua(R1(e.agents), e.agents === void 0 ? void 0 : p1(e.agents), "—"),
    S1(e.policy),
    ua(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function x1(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function Kx(e) {
  if (x1(e)) return T1(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ l("tr", { className: g.row, onClick: Rr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ l("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: L(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...zt(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(xr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: g.mono, children: Tr(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": Lr(t.inFlightHint), children: ae(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : ue(t.p50) }) })
  ] });
}
const L1 = "_row_2u4ll_2", A1 = "_name_2u4ll_16", E1 = "_scope_2u4ll_24", Pt = {
  row: L1,
  name: A1,
  scope: E1
};
function xn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function I1(e) {
  return e === void 0 ? `${Pt.row} ward-toolrow` : `${Pt.row} ward-toolrow ${e}`;
}
function M1(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function B1({ id: e, reasonId: t, tool: a, state: r, onChange: o }) {
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
function j1({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: xn(e) });
}
function P1({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${Pt.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function q1(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function Gx({ tool: e, onChange: t, presentation: a }) {
  const r = y(), o = y(), i = M1(e, a), s = q1(a);
  return /* @__PURE__ */ l(s, { className: I1(a == null ? void 0 : a.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(B1, { id: r, reasonId: o, tool: e, state: i, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${Pt.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(P1, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(j1, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const H1 = "_strip_4ppv9_2", O1 = "_well_4ppv9_11", D1 = "_head_4ppv9_18", F1 = "_name_4ppv9_24", z1 = "_chart_4ppv9_32", W1 = "_segment_4ppv9_38", K1 = "_detailedChart_4ppv9_44", G1 = "_rail_4ppv9_57", U1 = "_section_4ppv9_63", V1 = "_label_4ppv9_74", Y1 = "_note_4ppv9_91", V = {
  strip: H1,
  well: O1,
  head: D1,
  name: F1,
  chart: z1,
  segment: W1,
  detailedChart: K1,
  rail: G1,
  section: U1,
  label: V1,
  note: Y1
}, J1 = "No item in flight to preview.", Q1 = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", X1 = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", hn = [1, 2, 3, 4, 5, 6], qt = 100;
function Z1(e, t) {
  return t.has(e) ? ge(e, "id") : "var(--ward-color-line)";
}
function ek({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: hn.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: o * qt,
      y: "0",
      width: qt,
      height: "8",
      fill: Z1(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function tk(e) {
  const t = e.slice(0, hn.length);
  for (; t.length < hn.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function nk({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${V.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, a) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(a * qt),
        y: "0",
        width: String(qt),
        height: "40",
        style: { fill: ge(t.streamStep, "chip") }
      },
      t.key + String(a)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((t, a) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(a))) })
  ] });
}
function Ar(e) {
  return (t) => e == null ? void 0 : e(t);
}
function yt({ label: e, children: t }) {
  const a = y();
  return /* @__PURE__ */ l("section", { className: V.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: V.label, children: e }),
    t
  ] });
}
function ak({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: t ?? J1 }) : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Gt, { item: { ...e, streamStep: vt(a.streamStep) }, onOpen: Ar(r), feed: null }) });
}
function rk({ draft: e }) {
  const t = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: V.head, style: t, children: [
    /* @__PURE__ */ n(ze, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...zt(e.key, e.streamStep) })
  ] });
}
function ok(e) {
  const t = tk(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ l("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(yt, { label: "Board card", children: /* @__PURE__ */ n(ak, { ...e, draft: a }) }),
    /* @__PURE__ */ n(yt, { label: "Streams index row", children: /* @__PURE__ */ n(rk, { draft: a }) }),
    /* @__PURE__ */ l(yt, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(nk, { identities: t }),
      /* @__PURE__ */ n("p", { className: V.note, children: Q1 })
    ] }),
    /* @__PURE__ */ n(yt, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: X1 }) })
  ] });
}
function lk({ draft: e, sample: t, streams: a, onOpen: r }) {
  const o = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: V.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: V.head, children: [
      /* @__PURE__ */ n(ze, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...zt(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Gt, { item: { ...t, streamStep: e.streamStep }, onOpen: Ar(r) }) }),
    /* @__PURE__ */ n(ek, { draft: e, streams: a })
  ] });
}
function Ux(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(ok, { ...e }) : /* @__PURE__ */ n(lk, { ...e });
}
const ik = "_row_ixlg5_6", sk = "_headCell_ixlg5_10", ck = "_cell_ixlg5_11", dk = "_name_ixlg5_23", uk = "_consequence_ixlg5_29", hk = "_governed_ixlg5_36", mk = "_control_ixlg5_42", wk = "_byRole_ixlg5_48", fk = "_webControl_ixlg5_59", _k = "_webConsequence_ixlg5_65", vk = "_webGoverned_ixlg5_71", W = {
  row: ik,
  headCell: sk,
  cell: ck,
  name: dk,
  consequence: uk,
  governed: hk,
  control: mk,
  byRole: wk,
  webControl: fk,
  webConsequence: _k,
  webGoverned: vk
};
function bk({
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
function pk({ capability: e, cells: t, onChange: a }) {
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
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(bk, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function gk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function yk({ name: e, cell: t, onChange: a }) {
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
function Nk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ l("tr", { className: W.row, children: [
    /* @__PURE__ */ l("td", { className: W.cell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${W.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(yk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webGoverned} ward-cellmeta`, children: gk(e) }) })
  ] });
}
function Vx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Nk, { ...e }) : /* @__PURE__ */ n(pk, { ...e });
}
const kk = "_row_vv64h_2", $k = "_cell_vv64h_6", Ck = "_name_vv64h_25", Sk = "_note_vv64h_30", Rk = "_webName_vv64h_41", Tk = "_webMeta_vv64h_47", X = {
  row: kk,
  cell: $k,
  name: Ck,
  note: Sk,
  webName: Rk,
  webMeta: Tk
}, Er = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function xk(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Lk({ component: e, onRestart: t }) {
  const a = y(), r = Er[e.state], o = e.state === "drainFirst";
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
function Ak({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: xk(e.state) });
}
function Ek({ component: e, onRestart: t }) {
  return /* @__PURE__ */ l("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { ...Er[e.state] }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(Ak, { component: e, onRestart: t }) })
  ] });
}
function Yx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ek, { ...e }) : /* @__PURE__ */ n(Lk, { ...e });
}
const Ik = "_row_jcm5k_7", Mk = "_cell_jcm5k_11", Bk = "_next_jcm5k_28", jk = "_headCell_jcm5k_38", Pk = "_webId_jcm5k_77", qk = "_webPurpose_jcm5k_83", Hk = "_webMeta_jcm5k_91", Ok = "_webUrgent_jcm5k_97", K = {
  row: Ik,
  cell: Mk,
  next: Bk,
  headCell: jk,
  webId: Pk,
  webPurpose: qk,
  webMeta: Hk,
  webUrgent: Ok
}, Dk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, Fk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Ir = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], zk = Object.fromEntries(Ir.map((e) => [e.key, e]));
function Xe({ column: e, children: t }) {
  const a = zk[e];
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
function Jx() {
  return /* @__PURE__ */ n("tr", { children: Ir.map((e) => /* @__PURE__ */ n(
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
function Wk({ cred: e }) {
  const t = Dk[e.state];
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n(Xe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Xe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Xe, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(Xe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: xn(e.cls) }) }),
    /* @__PURE__ */ n(Xe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Xe, { column: "next", children: /* @__PURE__ */ n("span", { className: K.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Kk({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${K.webMeta} ${K.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function Gk({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(Kk, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...Fk[e.state] }) })
  ] });
}
function Qx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Gk, { ...e }) : /* @__PURE__ */ n(Wk, { ...e });
}
const Uk = "_card_lpp45_2", Vk = "_head_lpp45_11", Yk = "_env_lpp45_18", Jk = "_version_lpp45_25", Qk = "_meta_lpp45_32", Xk = "_webCard_lpp45_37", Zk = "_webRow_lpp45_47", e$ = "_webTitle_lpp45_55", t$ = "_webLine_lpp45_65", n$ = "_webVersion_lpp45_72", a$ = "_webMeta_lpp45_77", Q = {
  card: Uk,
  head: Vk,
  env: Yk,
  version: Jk,
  meta: Qk,
  webCard: Xk,
  webRow: Zk,
  webTitle: e$,
  webLine: t$,
  webVersion: n$,
  webMeta: a$
}, ha = { dev: "Dev", uat: "UAT", prod: "Prod" }, Mr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function r$({ env: e }) {
  const t = Mr[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l("section", { className: Q.card, "aria-label": ha[e.env], children: [
    /* @__PURE__ */ l("div", { className: Q.head, children: [
      /* @__PURE__ */ n("span", { className: Q.env, children: ha[e.env] }),
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
function o$(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function l$(e) {
  return /* @__PURE__ */ l("article", { className: `${Q.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${Q.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Q.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Mr[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Q.version} ${Q.webVersion} ${Q.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Q.meta} ${Q.webMeta} ${Q.webLine} ward-cellmeta`, children: o$(e) })
  ] });
}
function Xx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(l$, { ...e }) : /* @__PURE__ */ n(r$, { ...e });
}
const i$ = "_panel_1hmja_2", s$ = "_line_1hmja_8", c$ = "_actions_1hmja_14", Nt = {
  panel: i$,
  line: s$,
  actions: c$
};
function Zx(e) {
  return /* @__PURE__ */ l("div", { className: Nt.panel, children: [
    /* @__PURE__ */ n("p", { className: Nt.line, children: e.status }),
    /* @__PURE__ */ n(q, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: Nt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: Nt.line, children: e.note ?? "" })
  ] });
}
const d$ = "_upload_13fcl_2", u$ = "_preview_13fcl_7", h$ = "_mark_13fcl_17", m$ = "_empty_13fcl_22", w$ = "_actions_13fcl_28", f$ = "_input_13fcl_33", _$ = "_reasons_13fcl_41", v$ = "_reason_13fcl_41", b$ = "_accepted_13fcl_57", oe = {
  upload: d$,
  preview: u$,
  mark: h$,
  empty: m$,
  actions: w$,
  input: f$,
  reasons: _$,
  reason: v$,
  accepted: b$
}, Br = 1.5, jr = 22, Ht = "script elements or event handlers", Pe = "links or external references", xe = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Br}px at ${jr}px`], p$ = [xe[1], xe[2], Ht, Pe], g$ = /* @__PURE__ */ new Map([
  ["image", xe[1]],
  ["text", xe[2]],
  ["tspan", xe[2]],
  ["textPath", xe[2]],
  ["script", Ht],
  ["foreignObject", Ht],
  ["a", Pe],
  ["use", Pe],
  ["style", Pe],
  ["feImage", Pe],
  ["set", Pe]
]), y$ = "http://www.w3.org/2000/svg", N$ = "http://www.w3.org/2000/xmlns/", k$ = /* @__PURE__ */ new Set([
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
]), $$ = /* @__PURE__ */ new Set([
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
]), Ln = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, C$ = /url\s*\(|['"\\]/i;
function S$() {
  return { ok: !1, reasons: [xe[1]] };
}
function Pr(e) {
  return e.namespaceURI === y$;
}
function R$(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && Pr(t) ? t : null;
  } catch {
    return null;
  }
}
function T$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [xe[0]] : [];
}
function x$(e) {
  return g$.get(e.localName) ?? (e.localName.startsWith("animate") ? Pe : void 0);
}
function L$(e) {
  return C$.test(e.replace(Ln, ""));
}
function A$(e) {
  return /^on/i.test(e.localName) ? Ht : e.localName === "href" || L$(e.value) ? Pe : void 0;
}
function E$(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(x$(a));
    for (const r of Array.from(a.attributes)) t.add(A$(r));
  }
  return p$.filter((a) => t.has(a));
}
function I$(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((o) => Number.isFinite(o) && o > 0), 0), r = a > 0 ? jr / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Br;
  }) ? [xe[3]] : [];
}
function M$(e) {
  if (e.namespaceURI === N$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && ($$.has(t) || t.startsWith("stroke"));
}
function B$(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && Pr(t) && k$.has(t.localName);
}
function j$(e, t) {
  B$(t) ? t.nodeType === Node.ELEMENT_NODE && qr(t) : e.removeChild(t);
}
function qr(e) {
  for (const t of Array.from(e.attributes)) M$(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) j$(e, t);
  return e;
}
function P$(e) {
  return Array.from(e.matchAll(Ln), (t) => t[2]).filter((t) => t !== "");
}
function q$(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function H$(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const i of P$(o.value)) a.has(i) || a.set(i, `${t}-${a.size}`);
  return a;
}
function O$(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(Ln, (r, o, i) => {
      const s = t.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function D$(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = H$(a, t);
  for (const o of a) {
    const i = r.get(o.getAttribute("id") ?? "");
    i === void 0 ? o.removeAttribute("id") : o.setAttribute("id", i), O$(o, r);
  }
  return e;
}
function eL(e) {
  const t = R$(e);
  if (t === null) return S$();
  const a = [...T$(t), ...E$(t), ...I$(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(D$(qr(t), q$(e))) };
}
const F$ = "Mark accepted.", z$ = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, W$ = new Set($a.flatMap((e) => [ge(e, "id"), ge(e, "chip")]));
function K$(e) {
  return e !== void 0 && (z$.test(e) || W$.has(e)) ? e : void 0;
}
function G$({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: oe.preview, style: { "--mark": K$(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: oe.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: oe.empty }) });
}
function U$(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function V$(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function Y$({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: oe.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("p", { className: oe.accepted, children: F$ }) }) : /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("ul", { className: oe.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: oe.reason, children: t }, t)) }) });
}
function J$({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(Y$, { result: e }) : /* @__PURE__ */ n("p", { className: `${oe.result} ${U$(e, a)}`, role: "status", children: V$(e, a) });
}
function ma(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function tL({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: o }) {
  const i = _(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ l("div", { className: oe.upload, children: [
    /* @__PURE__ */ n(G$, { current: e }),
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
      /* @__PURE__ */ n(b, { ...ma(o), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...ma(o), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(J$, { result: s, presentation: r })
  ] });
}
const Q$ = "_row_o3t6y_7", X$ = "_cell_o3t6y_11", Z$ = "_head_o3t6y_28", e0 = "_name_o3t6y_34", t0 = "_pinned_o3t6y_42", n0 = "_headCell_o3t6y_49", a0 = "_webName_o3t6y_88", r0 = "_webMeta_o3t6y_95", o0 = "_webWarn_o3t6y_103", D = {
  row: Q$,
  cell: X$,
  head: Z$,
  name: e0,
  pinned: t0,
  headCell: n0,
  webName: a0,
  webMeta: r0,
  webWarn: o0
}, An = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Hr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], l0 = Object.fromEntries(Hr.map((e) => [e.key, e]));
function i0(e, t) {
  return `mcp.${e}.${t}`;
}
function s0(e) {
  return Object.keys(An).includes(e);
}
function c0(e) {
  return An[e !== void 0 && s0(e) ? e : "unknown"];
}
function it({ column: e, children: t }) {
  const a = l0[e];
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
function nL() {
  return /* @__PURE__ */ n("tr", { children: Hr.map((e) => /* @__PURE__ */ n(
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
function d0({ server: e }) {
  const t = An[e.connection];
  return /* @__PURE__ */ l("tr", { className: D.row, children: [
    /* @__PURE__ */ l(it, { column: "name", children: [
      /* @__PURE__ */ l("span", { className: D.head, children: [
        /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: xn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ l("span", { className: D.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(it, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(it, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(it, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(it, { column: "tools", children: e.tools.map((a) => i0(e.name, a)).join(" · ") })
  ] });
}
function u0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function h0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function m0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${D.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e });
}
function w0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function f0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function _0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: D.row, children: [
    /* @__PURE__ */ l("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: `${D.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: u0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...h0(e) }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...c0(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: D.cell, children: [
      /* @__PURE__ */ n(w0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(f0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function aL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(_0, { ...e }) : /* @__PURE__ */ n(d0, { ...e });
}
const v0 = "_row_1ibo7_2", b0 = "_headCell_1ibo7_14", p0 = "_cell_1ibo7_15", g0 = "_name_1ibo7_26", y0 = "_consequence_1ibo7_32", N0 = "_reason_1ibo7_38", k0 = "_value_1ibo7_44", $0 = "_webRow_1ibo7_60", C0 = "_webSetting_1ibo7_73", S0 = "_webName_1ibo7_81", R0 = "_webConsequence_1ibo7_89", T0 = "_webControl_1ibo7_95", x0 = "_webState_1ibo7_109", L0 = "_webChip_1ibo7_114", P = {
  row: v0,
  headCell: b0,
  cell: p0,
  name: g0,
  consequence: y0,
  reason: N0,
  value: k0,
  webRow: $0,
  webSetting: C0,
  webName: S0,
  webConsequence: R0,
  webControl: T0,
  webState: x0,
  webChip: L0
}, Or = 104, Dr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function A0({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ye, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(er, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: P.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function E0({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = y(), i = Dr[a], s = a === "locked";
  return /* @__PURE__ */ l("tr", { className: P.row, "data-inheritance": a, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: P.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(A0, { control: t, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: P.cell, style: { width: Or }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function Fr(e, t) {
  return String(e ?? t);
}
function I0(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function M0(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? Fr(e.value, "—");
}
function B0({ control: e, name: t, locked: a, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: P.webControl, children: [
    /* @__PURE__ */ n(Ye, { label: t, labelHidden: !0, checked: i, locked: a, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ n("span", { className: P.webState, "aria-hidden": "true", children: a || i ? "on" : "off" })
  ] });
}
function j0(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(B0, { ...e });
  const o = I0(t, a);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: P.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(er, { options: o, value: Fr(t.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: M0(t) });
}
function P0({ setting: e, control: t, inheritance: a, reason: r, onChange: o, renderControl: i }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ l("div", { className: `${P.row} ${P.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ l("span", { className: P.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${P.name} ${P.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: s, className: `${P.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: P.webControl, children: i(s) }) : /* @__PURE__ */ n(j0, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${P.webChip} ward-policy-chip`, style: { width: Or }, children: /* @__PURE__ */ n(m, { ...Dr[a], size: "tag" }) })
  ] });
}
function rL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(P0, { ...e }) : /* @__PURE__ */ n(E0, { ...e });
}
const q0 = "_label_h9m4w_7", H0 = "_name_h9m4w_15", O0 = "_column_h9m4w_24", D0 = "_webFrame_h9m4w_57", F0 = "_webHead_h9m4w_62", z0 = "_webHeadLabel_h9m4w_74", W0 = "_webLabel_h9m4w_117", K0 = "_webColumns_h9m4w_124", G0 = "_webGroup_h9m4w_130", U0 = "_webPeople_h9m4w_131", V0 = "_webVia_h9m4w_132", Y0 = "_webMeta_h9m4w_161", G = {
  label: q0,
  name: H0,
  column: O0,
  webFrame: D0,
  webHead: F0,
  webHeadLabel: z0,
  webLabel: W0,
  webColumns: K0,
  webGroup: G0,
  webPeople: U0,
  webVia: V0,
  webMeta: Y0
}, J0 = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, en = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function tn({ column: e, children: t }) {
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
function Q0(e) {
  if (!e.matrixRole) return;
  const t = J0[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function X0({ node: e }) {
  const t = Q0(e);
  return /* @__PURE__ */ l("span", { className: G.label, children: [
    /* @__PURE__ */ n("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ n(Z0, { role: t, node: e }),
    /* @__PURE__ */ n(tn, { column: en[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(tn, { column: en[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(tn, { column: en[2], children: e.requestedVia ?? "" })
  ] });
}
function Z0({ role: e, node: t }) {
  return /* @__PURE__ */ l(x, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function eC({ index: e, depth: t, node: a, expanded: r, leaf: o, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    ir,
    {
      index: e,
      depth: t,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(X0, { node: a }),
      children: s
    }
  );
}
function nn({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function tC({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(nn, { className: `${G.webMeta} ${G.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(nn, { className: `${G.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(nn, { className: `${G.webMeta} ${G.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function nC() {
  return /* @__PURE__ */ l("div", { className: G.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: G.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: G.webColumns, children: [
      /* @__PURE__ */ n("span", { className: G.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: G.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: G.webVia, children: "Requested via" })
    ] })
  ] });
}
function aC({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function rC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function oC({ rows: e, label: t }) {
  return /* @__PURE__ */ l("div", { className: G.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(nC, {}),
    /* @__PURE__ */ n(Bw, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      ir,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(aC, { row: a }),
        detail: /* @__PURE__ */ n(tC, { row: a }),
        expanded: rC(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function oL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(oC, { ...e }) : /* @__PURE__ */ n(eC, { ...e });
}
const lC = "_runbook_b9agc_2", iC = "_list_b9agc_7", sC = "_step_b9agc_15", cC = "_numeral_b9agc_21", dC = "_body_b9agc_28", uC = "_head_b9agc_34", hC = "_title_b9agc_40", mC = "_detail_b9agc_45", wC = "_actions_b9agc_50", fC = "_webList_b9agc_56", _C = "_webStep_b9agc_60", vC = "_webBody_b9agc_66", bC = "_webTitle_b9agc_74", pC = "_webDetail_b9agc_78", M = {
  runbook: lC,
  list: iC,
  step: sC,
  numeral: cC,
  body: dC,
  head: uC,
  title: hC,
  detail: mC,
  actions: wC,
  webList: fC,
  webStep: _C,
  webBody: vC,
  webTitle: bC,
  webDetail: pC
}, zr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Wr(e) {
  return String(e + 1).padStart(2, "0");
}
function gC({ step: e, index: t, connection: a }) {
  const r = zr[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: M.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: M.numeral, children: Wr(t) }),
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
function yC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: M.list, children: e.map((r, o) => /* @__PURE__ */ n(gC, { step: r, index: o, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: M.actions, children: t })
  ] });
}
function NC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ l("li", { className: `${M.step} ${M.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${M.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Wr(t) }),
    /* @__PURE__ */ l("span", { className: `${M.body} ${M.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${M.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${M.title} ${M.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...zr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Ae, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${M.detail} ${M.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function kC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${M.list} ${M.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(NC, { step: r, index: o, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${M.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function lL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(kC, { ...e }) : /* @__PURE__ */ n(yC, { ...e });
}
const $C = "_list_1gu6a_2", CC = "_check_1gu6a_10", SC = "_body_1gu6a_16", RC = "_text_1gu6a_23", TC = "_pending_1gu6a_32", xC = "_measured_1gu6a_37", tt = {
  list: $C,
  check: CC,
  body: SC,
  text: RC,
  pending: TC,
  measured: xC
};
function LC(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function AC({ check: e }) {
  const t = LC(e.passed);
  return /* @__PURE__ */ l("li", { className: `${tt.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(kn, { state: t.state, label: t.label }),
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
function iL({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${tt.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(AC, { check: t }, t.text)) });
}
const EC = "_root_y6bbq_2", IC = "_list_y6bbq_10", MC = "_line_y6bbq_32", BC = "_at_y6bbq_59", jC = "_text_y6bbq_63", PC = "_foot_y6bbq_67", qC = "_idle_y6bbq_79", HC = "_caret_y6bbq_87", OC = "_jump_y6bbq_94", ve = {
  root: EC,
  list: IC,
  line: MC,
  at: BC,
  text: jC,
  foot: PC,
  idle: qC,
  caret: HC,
  jump: OC
}, DC = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function En(e) {
  return Number.isNaN(Date.parse(e)) ? "" : DC.format(new Date(e));
}
const FC = { warn: "warning", ok: "ok" };
function zC({ kind: e }) {
  const t = FC[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function WC({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${En(e)}` });
}
function KC({ connection: e, idleSince: t, last: a, children: r }) {
  const o = [t, a == null ? void 0 : a.at, ""].find(Boolean), i = {
    stale: `no new events as of ${En(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${ve.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ve.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ve.idle, children: i }),
    /* @__PURE__ */ n(WC, { at: a == null ? void 0 : a.at }),
    r
  ] });
}
const GC = 8;
function UC(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > GC;
}
function VC({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const Kr = Ne(null);
function sL({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, o] = p(!1), i = pa(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(Kr.Provider, { value: i, children: a });
}
function YC() {
  const e = ye(Kr), [t, a] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const JC = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function cL({ lines: e, connection: t, idleSince: a, label: r = "Live activity", fixed: o }) {
  const i = _(null), [s, c] = p(0), [d, u] = YC(), [h, w] = p(!1), f = e.at(-1);
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
    /* @__PURE__ */ n("ol", { className: ve.list, ref: i, "aria-live": d ? "polite" : "off", "aria-label": r, ...JC(e.length, o), onScroll: (k) => w(UC(k.currentTarget)), children: e.map((k, E) => /* @__PURE__ */ l("li", { className: `${ve.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": E < s, children: [
      /* @__PURE__ */ n("span", { className: ve.at, children: En(k.at) }),
      /* @__PURE__ */ n(zC, { kind: k.kind }),
      /* @__PURE__ */ n("span", { className: ve.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${E}`)) }),
    /* @__PURE__ */ l(KC, { connection: t, idleSince: a, last: f, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(VC, { shown: h, onJump: N })
    ] })
  ] });
}
const QC = "_row_1k8wl_2", XC = "_head_1k8wl_14", ZC = "_author_1k8wl_20", eS = "_eta_1k8wl_25", tS = "_edited_1k8wl_26", nS = "_body_1k8wl_32", aS = "_reason_1k8wl_37", rS = "_actions_1k8wl_42", Ce = {
  row: QC,
  head: XC,
  author: ZC,
  eta: eS,
  edited: tS,
  body: nS,
  reason: aS,
  actions: rS
}, oS = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function lS(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function iS({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
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
function sS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Ce.reason, id: t, children: e })
  ] });
}
function cS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function dS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(iS, { ...e }) : /* @__PURE__ */ n(sS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function dL(e) {
  const { comment: t } = e;
  cS(e);
  const a = y(), r = `${a}-unavailable`, o = oS[t.delivery];
  return /* @__PURE__ */ l("div", { className: `${Ce.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: Ce.head, children: [
      /* @__PURE__ */ n("span", { className: Ce.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: Ce.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Ce.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Ce.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Ce.reason, id: a, children: lS(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Ce.actions, children: /* @__PURE__ */ n(dS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const uS = "_root_rvhdw_2", hS = "_attach_rvhdw_11", mS = "_actions_rvhdw_17", wS = "_reply_rvhdw_23", fS = "_replyField_rvhdw_28", _S = "_send_rvhdw_54", vS = "_sendIcon_rvhdw_65", bS = "_sendsAs_rvhdw_75", Oe = {
  root: uS,
  attach: hS,
  actions: mS,
  reply: wS,
  replyField: fS,
  send: _S,
  sendIcon: vS,
  sendsAs: bS
};
function Gr({ value: e, onChange: t }) {
  const [a, r] = p("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function pS() {
  return /* @__PURE__ */ n("svg", { className: Oe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function gS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function yS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [o, i] = Gr(e), s = y(), c = () => {
    o.trim() !== "" && r(a, o);
  }, d = (u) => {
    gS(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ l("div", { className: Oe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: Oe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ n(q, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: o, onChange: i, describedBy: s }),
      /* @__PURE__ */ l(b, { variant: "primary", className: Oe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ n(pS, {}),
        /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Oe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function uL(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(yS, { ...e }) : /* @__PURE__ */ n(NS, { ...e });
}
function NS(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: o, onPost: i, onDraft: s } = e, [c, d] = Gr(e);
  return /* @__PURE__ */ l("div", { className: Oe.root, children: [
    /* @__PURE__ */ n(q, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ l("div", { className: Oe.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    o && /* @__PURE__ */ n(
      Ia,
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
const kS = "_list_1yhks_2", $S = "_item_1yhks_6", CS = "_body_1yhks_22", SS = "_text_1yhks_28", RS = "_evidence_1yhks_37", TS = "_consequence_1yhks_49", xS = "_note_1yhks_54", Ve = {
  list: kS,
  item: $S,
  body: CS,
  text: SS,
  evidence: RS,
  consequence: TS,
  note: xS
};
function LS({ criterion: e }) {
  return /* @__PURE__ */ n(ze, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function wa({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function AS(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function ES({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Ve.body, children: [
    /* @__PURE__ */ n("span", { className: Ve.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(wa, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Ve.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(wa, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Ve.consequence, children: AS(e.why) })
    ] })
  ] });
}
function IS({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Ve.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(LS, { criterion: e }),
    /* @__PURE__ */ n(ES, { criterion: e })
  ] });
}
function hL({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Ve.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(IS, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ n("p", { className: Ve.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const MS = "_list_dwhoz_2", BS = "_rung_dwhoz_6", jS = "_name_dwhoz_18", PS = "_actor_dwhoz_32", xt = {
  list: MS,
  rung: BS,
  name: jS,
  actor: PS
}, qS = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function HS({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = qS[e.state];
  return /* @__PURE__ */ l("li", { className: xt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: xt.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${xt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function mL({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${xt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(HS, { rung: t }, t.name)) });
}
const OS = "_sheet_pw37w_2", DS = "_title_pw37w_9", FS = "_stage_pw37w_15", zS = "_effects_pw37w_20", WS = "_effect_pw37w_20", KS = "_numeral_pw37w_31", GS = "_effectText_pw37w_38", US = "_refusals_pw37w_43", VS = "_reasons_pw37w_52", YS = "_reason_pw37w_52", JS = "_actions_pw37w_62", we = {
  sheet: OS,
  title: DS,
  stage: FS,
  effects: zS,
  effect: WS,
  numeral: KS,
  effectText: GS,
  refusals: US,
  reasons: VS,
  reason: YS,
  actions: JS
};
function QS({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function wL({ run: e, effects: t, refusals: a, cost: r, onRequeue: o, onClose: i, returnFocusTo: s }) {
  const c = y(), d = `${c}-refusal`, [u, h] = p(""), w = a.length > 0;
  return /* @__PURE__ */ n(lt, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ l("div", { className: we.sheet, children: [
    /* @__PURE__ */ l("h2", { className: we.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: we.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: we.effects, children: t.map((f, N) => /* @__PURE__ */ l("li", { className: we.effect, children: [
      /* @__PURE__ */ n("span", { className: we.numeral, children: String(N + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: we.effectText, children: f })
    ] }, f)) }),
    /* @__PURE__ */ n(
      wm,
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
      /* @__PURE__ */ n("ul", { className: we.reasons, children: a.map((f, N) => /* @__PURE__ */ n("li", { className: we.reason, id: N === 0 ? d : void 0, children: f.reason }, f.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: we.actions, children: [
      /* @__PURE__ */ n(QS, { refused: w, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ n(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const XS = "_list_1laeg_2", ZS = "_path_1laeg_7", e2 = "_head_1laeg_21", t2 = "_label_1laeg_28", n2 = "_consequence_1laeg_35", ct = {
  list: XS,
  path: ZS,
  head: e2,
  label: t2,
  consequence: n2
}, mn = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function fa(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function _a(e) {
  return e ? "primary" : "secondary";
}
function a2({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: _a(t), size: "sm", onClick: () => a(e.kind), children: mn[e.kind] }) : /* @__PURE__ */ n(b, { variant: _a(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: mn[e.kind] });
}
function r2({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: ct.path, "data-allowed": e.allowed, "data-role": fa(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: ct.head, children: [
      /* @__PURE__ */ n("span", { className: ct.label, children: e.title ?? mn[e.kind] }),
      /* @__PURE__ */ n(m, { role: fa(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: ct.consequence, children: e.consequence }),
    /* @__PURE__ */ n(a2, { path: e, primary: t, onChoose: a })
  ] });
}
function fL({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: ct.list, children: e.map((a, r) => /* @__PURE__ */ n(r2, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const o2 = "_list_1m7i0_2", l2 = "_item_1m7i0_6", i2 = "_node_1m7i0_18", s2 = "_body_1m7i0_24", c2 = "_head_1m7i0_30", d2 = "_stage_1m7i0_36", u2 = "_version_1m7i0_41", h2 = "_sentence_1m7i0_49", m2 = "_meta_1m7i0_54", Re = {
  list: o2,
  item: l2,
  node: i2,
  body: s2,
  head: c2,
  stage: d2,
  version: u2,
  sentence: h2,
  meta: m2
}, w2 = {
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
function _2({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${Re.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Re.node} ward-history-node`, children: /* @__PURE__ */ n(ze, { size: 9, kind: w2[e.state], label: e.state }) }),
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
function _L({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Re.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(_2, { entry: t }, t.stage + String(a))) });
}
const v2 = "_thread_1e70p_3", b2 = "_turn_1e70p_8", p2 = "_who_1e70p_27", g2 = "_body_1e70p_32", Lt = {
  thread: v2,
  turn: b2,
  who: p2,
  body: g2
}, Ur = Ne(!1);
function vL({ children: e, density: t }) {
  return /* @__PURE__ */ n(Ur.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${Lt.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function bL({ turn: e }) {
  if (!ye(Ur)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${Lt.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${Lt.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${Lt.body} ward-chat-body`, children: e.body })
  ] });
}
const y2 = "_list_yiolt_3", N2 = "_row_yiolt_7", k2 = "_label_yiolt_20", $2 = "_n_yiolt_26", C2 = "_cause_yiolt_33", ht = {
  list: y2,
  row: N2,
  label: k2,
  n: $2,
  cause: C2
};
function S2(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const R2 = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function T2({ row: e, formatNumber: t }) {
  return S2(e), /* @__PURE__ */ l("li", { className: `${ht.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(ze, { size: 8, ...R2[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: ht.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${ht.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(x2, { cause: e.cause })
  ] });
}
function x2({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${ht.cause} ward-healthrow-cause`, children: e }) : null;
}
function pL({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${ht.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(T2, { row: a, formatNumber: t }, a.label)) });
}
const L2 = "_root_1jxwp_2", A2 = {
  root: L2
};
function gL({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: A2.root, "data-density": o, children: [
    /* @__PURE__ */ n(Ut, { items: e, note: t, density: o }),
    /* @__PURE__ */ n(b, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const E2 = "_row_dhbre_3", I2 = "_key_dhbre_13", M2 = "_stack_dhbre_24", B2 = "_value_dhbre_32", j2 = "_evidence_dhbre_39", P2 = "_mark_dhbre_47", Ze = {
  row: E2,
  key: I2,
  stack: M2,
  value: B2,
  evidence: j2,
  mark: P2
};
function q2({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(kn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function yL({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Ze.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Ze.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Ze.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Ze.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Ze.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Ze.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(q2, { state: e.state }) })
  ] });
}
const H2 = "_cell_gh2sd_2", O2 = {
  cell: H2
}, D2 = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function F2(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function z2(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function W2(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: F2(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function K2(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function NL({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  z2(e, a);
  const r = K2(e);
  return /* @__PURE__ */ n(
    Tm,
    {
      label: "Rejection routing",
      columns: D2,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: O2.cell, "data-norerun": o.noRerun ? !0 : void 0, children: W2(o, i) }),
      empty: t ?? /* @__PURE__ */ n(Nf, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const G2 = "_row_1f2re_2", U2 = "_title_1f2re_12", V2 = "_turns_1f2re_18", Y2 = "_waiting_1f2re_19", J2 = "_resolved_1f2re_20", Q2 = "_activity_1f2re_21", X2 = "_cost_1f2re_28", Z2 = "_link_1f2re_29", eR = "_tableLink_1f2re_47", tR = "_tableRecord_1f2re_48", nR = "_tableRow_1f2re_59", aR = "_tableTitle_1f2re_71", rR = "_tableResolved_1f2re_76", oR = "_tableMeta_1f2re_87", lR = "_tableCost_1f2re_94", iR = "_tableActivity_1f2re_95", sR = "_tableState_1f2re_105", z = {
  row: G2,
  title: U2,
  turns: V2,
  waiting: Y2,
  resolved: J2,
  activity: Q2,
  cost: X2,
  link: Z2,
  tableLink: eR,
  tableRecord: tR,
  tableRow: nR,
  tableTitle: aR,
  tableResolved: rR,
  tableMeta: oR,
  tableCost: lR,
  tableActivity: iR,
  tableState: sR
}, Vr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function cR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function dR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function uR(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const hR = { duplicate: "Closed · duplicate" };
function mR({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(rt, { className: z.tableMeta, text: `waiting on ${e}` });
}
function wR({ value: e }) {
  return /* @__PURE__ */ n("td", { className: z.tableCost, children: e === void 0 ? null : le(e) });
}
function fR({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${z.tableRecord} ward-target`, href: L(e.href), children: `→ ${e.key}` });
}
function _R({ session: e, href: t }) {
  const a = Vr[e.state];
  return /* @__PURE__ */ l("tr", { className: z.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: z.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${z.tableLink} ward-target`, href: L(t), children: /* @__PURE__ */ n(rt, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: z.tableMeta, children: dR(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: z.tableResolved, children: [
      uR(e.resolved),
      /* @__PURE__ */ n(mR, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(wR, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: z.tableActivity, children: cR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: z.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: hR[e.state] ?? a.label }),
      /* @__PURE__ */ n(fR, { link: e.link })
    ] }) })
  ] });
}
function vR({ session: e }) {
  const t = Vr[e.state];
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
function kL(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(_R, { session: e.session, href: e.href }) : /* @__PURE__ */ n(vR, { session: e.session });
}
const bR = "_block_1yy2v_3", pR = "_list_1yy2v_9", gR = "_line_1yy2v_14", wn = {
  block: bR,
  list: pR,
  line: gR
}, yR = { warn: "warning", ok: "ok" };
function NR({ kind: e }) {
  const t = yR[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function kR({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${wn.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(NR, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function $L({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${wn.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: wn.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(kR, { line: a }, `${r}-${a.text}`)) }) });
}
const $R = "_band_tt7hp_1", CR = "_head_tt7hp_8", SR = "_cell_tt7hp_19", RR = "_index_tt7hp_35", TR = "_title_tt7hp_42", xR = "_note_tt7hp_48", LR = "_cellTitle_tt7hp_53", AR = "_cellBody_tt7hp_58", ER = "_tag_tt7hp_64", $e = {
  band: $R,
  head: CR,
  cell: SR,
  index: RR,
  title: TR,
  note: xR,
  cellTitle: LR,
  cellBody: AR,
  tag: ER
}, va = 4;
function CL({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== va)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${va}-cell grid`);
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
const IR = "_tag_1yuvz_2", MR = "_link_1yuvz_14", an = {
  tag: IR,
  link: MR
};
function SL({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: an.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${an.tag} ${an.link}`, href: L(t), children: e });
}
const BR = "_eyebrow_m8swv_2", jR = "_link_m8swv_10", ba = {
  eyebrow: BR,
  link: jR
};
function In({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: ba.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${ba.link} ward-target`, href: L(t), children: e }) });
}
const PR = "_figure_qz9i7_2", qR = "_media_qz9i7_9", HR = "_caption_qz9i7_35", rn = {
  figure: PR,
  media: qR,
  caption: HR
};
function OR(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(x, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function RL(e) {
  return /* @__PURE__ */ l("figure", { className: rn.figure, children: [
    /* @__PURE__ */ n("div", { className: rn.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(OR, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: rn.caption, children: e.caption })
  ] });
}
function Mn(e) {
  return `h${e}`;
}
function DR(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const FR = "_prose_1fxb9_2", zR = "_anchor_1fxb9_79", Yr = {
  prose: FR,
  anchor: zR
};
function TL({ children: e }) {
  return /* @__PURE__ */ n("div", { className: Yr.prose, children: e });
}
function xL({ level: e, children: t, id: a }) {
  const r = Mn(e), o = a ?? DR(t);
  return /* @__PURE__ */ l(r, { id: o, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${Yr.anchor} ward-target`, href: `#${o}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const WR = "_list_176jq_2", KR = "_pair_176jq_8", GR = "_term_176jq_14", UR = "_value_176jq_19", kt = {
  list: WR,
  pair: KR,
  term: GR,
  value: UR
};
function LL({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: kt.list, children: e.map((t) => /* @__PURE__ */ l("div", { className: kt.pair, children: [
    /* @__PURE__ */ n("dt", { className: kt.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: kt.value, children: t.value })
  ] }, t.term)) });
}
const VR = "_nav_sgeyg_2", YR = "_item_sgeyg_6", JR = "_link_sgeyg_13", QR = "_note_sgeyg_30", $t = {
  nav: VR,
  item: YR,
  link: JR,
  note: QR
};
function AL({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: $t.nav, children: /* @__PURE__ */ n(Am, { children: t.map((a) => /* @__PURE__ */ l("li", { className: $t.item, children: [
    /* @__PURE__ */ n("a", { className: `${$t.link} ward-target`, href: L(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: $t.note, children: a.note })
  ] }, a.href)) }) });
}
const XR = "_header_kelio_2", ZR = "_skip_kelio_14", eT = "_brand_kelio_39", tT = "_list_kelio_46", nT = "_link_kelio_56", et = {
  header: XR,
  skip: ZR,
  brand: eT,
  list: tT,
  link: nT
};
function EL({ brand: e, links: t, current: a, homeHref: r = "/", mainId: o = "main", skipLabel: i = "Skip to content" }) {
  return /* @__PURE__ */ l("header", { className: et.header, children: [
    /* @__PURE__ */ n("a", { className: et.skip, href: `#${o}`, children: i }),
    /* @__PURE__ */ n("a", { className: `${et.brand} ward-target`, href: L(r), children: e }),
    /* @__PURE__ */ n("nav", { "aria-label": "Main", className: et.nav, children: /* @__PURE__ */ n("ul", { className: et.list, role: "list", children: t.map((s) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${et.link} ward-target`, href: L(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const aT = "_footer_1jb5e_2", rT = "_note_1jb5e_12", oT = "_list_1jb5e_18", lT = "_link_1jb5e_27", Ct = {
  footer: aT,
  note: rT,
  list: oT,
  link: lT
};
function IL({ note: e, links: t = [], label: a = "Footer" }) {
  return /* @__PURE__ */ l("footer", { className: Ct.footer, children: [
    /* @__PURE__ */ n("p", { className: Ct.note, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("nav", { "aria-label": a, children: /* @__PURE__ */ n("ul", { className: Ct.list, role: "list", children: t.map((r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${Ct.link} ward-target`, href: L(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const iT = "_intro_13128_2", sT = "_title_13128_9", cT = "_lead_13128_17", on = {
  intro: iT,
  title: sT,
  lead: cT
};
function ML({ title: e, eyebrow: t, eyebrowHref: a, lead: r, headingLevel: o = 1, children: i }) {
  const s = Mn(o);
  return /* @__PURE__ */ l("header", { className: on.intro, children: [
    t === void 0 ? null : /* @__PURE__ */ n(In, { href: a, children: t }),
    /* @__PURE__ */ n(s, { className: on.title, children: e }),
    r === void 0 ? null : /* @__PURE__ */ n("p", { className: on.lead, children: r }),
    i
  ] });
}
const dT = "_section_u0k7p_2", uT = "_head_u0k7p_13", hT = "_titles_u0k7p_21", mT = "_title_u0k7p_21", wT = "_link_u0k7p_34", dt = {
  section: dT,
  head: uT,
  titles: hT,
  title: mT,
  link: wT
};
function fT({ title: e, headingId: t, eyebrow: a, link: r, headingLevel: o }) {
  const i = Mn(o);
  return /* @__PURE__ */ l("div", { className: dt.head, children: [
    /* @__PURE__ */ l("div", { className: dt.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ n(In, { children: a }),
      /* @__PURE__ */ n(i, { className: dt.title, id: t, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ n("a", { className: `${dt.link} ward-target`, href: L(r.href), children: r.label })
  ] });
}
function BL({ title: e, children: t, id: a, eyebrow: r, link: o, headingLevel: i = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ l("section", { className: dt.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ n(fT, { title: e, headingId: d, eyebrow: r, link: o, headingLevel: i }),
    t
  ] });
}
const _T = "_split_1ycaa_2", vT = "_main_1ycaa_10", bT = "_aside_1ycaa_15", ln = {
  split: _T,
  main: vT,
  aside: bT
};
function jL({ children: e, aside: t, asideLabel: a }) {
  return /* @__PURE__ */ l("div", { className: ln.split, children: [
    /* @__PURE__ */ n("div", { className: ln.main, children: e }),
    /* @__PURE__ */ n("aside", { className: ln.aside, "aria-label": a, children: t })
  ] });
}
const pT = "_hero_ehbct_2", gT = "_text_ehbct_11", yT = "_visual_ehbct_23", NT = "_title_ehbct_28", kT = "_lead_ehbct_36", $T = "_actions_ehbct_42", CT = "_action_ehbct_42", ST = "_primary_ehbct_63", RT = "_secondary_ehbct_72", Le = {
  hero: pT,
  text: gT,
  visual: yT,
  title: NT,
  lead: kT,
  actions: $T,
  action: CT,
  primary: ST,
  secondary: RT
};
function TT({ actions: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ n("div", { className: Le.actions, children: e.map((t, a) => /* @__PURE__ */ n("a", { className: `${Le.action} ${a === 0 ? Le.primary : Le.secondary}`, href: L(t.href), children: t.label }, t.href)) });
}
function xT({ title: e, eyebrow: t, lead: a, actions: r = [] }) {
  return /* @__PURE__ */ l("div", { className: Le.text, children: [
    t === void 0 ? null : /* @__PURE__ */ n(In, { children: t }),
    /* @__PURE__ */ n("h1", { className: Le.title, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("p", { className: Le.lead, children: a }),
    /* @__PURE__ */ n(TT, { actions: r })
  ] });
}
function PL({ visual: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: Le.hero, "data-visual": e === void 0 ? "none" : "beside", children: [
    /* @__PURE__ */ n(xT, { ...t }),
    e === void 0 ? null : /* @__PURE__ */ n("div", { className: Le.visual, children: e })
  ] });
}
export {
  OT as ACCENT_PRESETS,
  cx as ActionStack,
  cL as ActivityConsole,
  VT as AdminIcon,
  Db as AgentCard,
  JT as AppShell,
  Ux as AppearanceStrip,
  CL as Band,
  ix as BarChart,
  a_ as BoardColumn,
  Sx as BoardFootnote,
  Rx as BoardHeader,
  GT as BoardIcon,
  vx as BoardScroller,
  b as Btn,
  HT as CHIP_ROLES,
  Ir as CREDENTIAL_COLUMNS,
  lx as Callout,
  Vx as CapabilityRow,
  px as CardGrid,
  bL as ChatMessage,
  Ia as Checkbox,
  m as Chip,
  rt as ClampText,
  dL as ClarificationRow,
  Px as ClauseRuleRow,
  jx as ClauseRules,
  mr as ColourLadder,
  Yx as ComponentRow,
  uL as Composer,
  xx as ConfigRow,
  Tx as ConfigRowHead,
  $n as ConnectionMark,
  sL as ConsoleAnnounceProvider,
  vL as Conversation,
  wm as CostMeter,
  Qx as CredentialRow,
  Jx as CredentialRowHead,
  hL as CriteriaList,
  Ps as Crumb,
  DT as DENSITIES,
  pL as DeliveryHealth,
  yx as DeniedState,
  WT as DisabledScope,
  Hx as DryRunRail,
  Nf as EmptyState,
  Xx as EnvCard,
  In as Eyebrow,
  LL as FactList,
  q as Field,
  RL as Figure,
  gx as FilteredEmpty,
  QT as FoldText,
  fx as FormStack,
  Ut as GateChecklist,
  mL as GateLadder,
  Tm as Grid,
  Dx as HandoffRuleRow,
  Ox as HandoffRules,
  PL as Hero,
  KT as HomeIcon,
  Lx as ItemDrawer,
  Zx as KeyPanel,
  vo as LIVE_EVENT_TYPES,
  cb as LegacyBoardColumn,
  Ex as LegacyBoardHeader,
  Ix as LegacyConfigRow,
  Bx as LegacyItemDrawer,
  nb as LegacyOverCapNote,
  Mx as LegacyPreviewRail,
  dr as LegacyWorkCard,
  AL as LinkList,
  Ae as LiveIndicator,
  Nx as LoadFailed,
  Cx as Loading,
  Hr as MCP_SERVER_COLUMNS,
  kn as Mark,
  tL as MarkUpload,
  ze as Marker,
  aL as McpServerRow,
  nL as McpServerRowHead,
  Ua as Menu,
  Wa as MenuButton,
  Fx as NewStreamModal,
  Sf as OverCapNote,
  pn as OverflowRow,
  lt as Overlay,
  XT as OwedCard,
  qx as PARTIAL_STEP_REASON,
  Or as POLICY_CHIP_WIDTH,
  hx as PageFrame,
  ox as PageHeader,
  ML as PageIntro,
  Am as PlainList,
  rL as PolicyRow,
  Ax as PreviewRail,
  TL as Prose,
  xL as ProseHeading,
  en as ROLE_MATRIX_COLUMNS,
  Cr as RULE_ACTIONS,
  nr as Radio,
  gL as ReadyChecklist,
  wx as RecordSection,
  wL as RequeueSheet,
  fL as ResolveBlock,
  yL as ResolvedFieldRow,
  oL as RoleMatrixRow,
  NL as RoutingTable,
  zx as RuleRow,
  lL as RunbookSteps,
  _o as STREAM_STEPS,
  BL as Section,
  _x as SectionBand,
  ea as SectionHeader,
  er as SegmentedControl,
  Da as Select,
  kL as SessionRow,
  nx as Sidebar,
  YT as SidebarFoldButton,
  IL as SiteFooter,
  EL as SiteHeader,
  jL as SplitLayout,
  Wx as StageColumn,
  bx as StageGrid,
  _L as StageHistory,
  Ny as StageListEditor,
  ZT as StageSteps,
  kx as StaleStrip,
  Wt as StatStrip,
  dx as StatTiles,
  rx as StreamAvatar,
  Kx as StreamRow,
  UT as StudioIcon,
  mx as SubjectRail,
  Ye as Switch,
  tx as TabLinks,
  sx as TableHead,
  ex as Tabs,
  SL as Tag,
  BT as ThemeProvider,
  Gx as ToolRow,
  ux as TopBar,
  Bw as Tree,
  ir as TreeRow,
  $L as TypedInputBlock,
  li as UNSAFE_HREF,
  iL as ValidationList,
  IT as VisibilityProvider,
  MT as Visible,
  qT as WARD_VERSION,
  Gt as WorkCard,
  $x as WriteUnavailableStrip,
  cR as agoSince,
  no as clock,
  Hy as colourStatus,
  ae as count,
  ue as duration,
  fn as elapsed,
  PT as eventSourceTransport,
  Mn as headingTag,
  Dt as isStreamStep,
  ft as isValidatedStreamStep,
  vp as ladderValidation,
  c0 as mcpConnectionChip,
  i0 as mcpToolName,
  le as money,
  be as ms,
  sr as ordered,
  Na as ratio,
  xk as restartLabel,
  L as safeHref,
  DR as slug,
  he as stamp,
  _n as stream,
  FT as streamChip,
  zt as streamChipProps,
  ge as streamColour,
  go as streamHex,
  It as streamInitials,
  bo as streamVars,
  ax as uniqueStreamInitials,
  Pa as useAnchoredPanel,
  St as useBorderFlash,
  Ee as useDisabledScope,
  mo as useFocusTrap,
  zT as useLiveFeed,
  jT as useReturnFocus,
  Ot as useRovingTabindex,
  vn as useTicker,
  ao as useVisible,
  j as v,
  eL as validateMark,
  vt as validatedStep,
  $a as validatedStreamSteps
};
