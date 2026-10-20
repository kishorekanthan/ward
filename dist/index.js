import { jsx as n, Fragment as x, jsxs as l } from "react/jsx-runtime";
import { useMemo as _a, useContext as ye, createContext as Ne, useState as p, useEffect as S, useCallback as te, useRef as _, useLayoutEffect as nt, useId as y, Fragment as va, isValidElement as Yr, Children as Jr } from "react";
import { createPortal as Qr, flushSync as ba } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const En = (e) => String(e).padStart(2, "0");
function mn(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${En(t % 60)}s` : `${Math.floor(a / 60)}h ${En(a % 60)}m`;
}
const Xr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const t = Xr.formatToParts(new Date(e)), a = (r) => {
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
function pa(e, t) {
  return `${e} / ${t}`;
}
const Zr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function eo(e) {
  return Zr.format(new Date(e));
}
const ga = Ne(/* @__PURE__ */ new Set());
function vT({ hidden: e, children: t }) {
  const a = _a(() => new Set(e), [e]);
  return /* @__PURE__ */ n(ga.Provider, { value: a, children: t });
}
function to(e) {
  return !ye(ga).has(e);
}
function bT({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: to(e) ? t : a });
}
const no = "(prefers-color-scheme: dark)";
function In() {
  return typeof window.matchMedia == "function" ? window.matchMedia(no) : null;
}
function ao(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = In()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? In() : null;
    if (!r) return;
    const o = () => a(r.matches);
    return o(), r.addEventListener("change", o), () => r.removeEventListener("change", o);
  }, [e]), t;
}
function Ut(e, t) {
  S(() => {
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function ro(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function pT({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const o = ao(e === "system");
  return Ut("data-theme", ro(e, o)), Ut("data-accent", t), Ut("data-density", a), /* @__PURE__ */ n(x, { children: r });
}
const oo = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function lo(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function io(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function so(e, t, a, r) {
  return e.shiftKey ? lo(t, a) ? r : void 0 : document.activeElement === r || io(t) ? a : void 0;
}
function co(e, t, a) {
  const r = a[0], o = a[a.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = so(e, t, r, o);
  i && (e.preventDefault(), i.focus());
}
function uo(e) {
  return { onKeyDown: te(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(oo));
      co(a, e.current, r);
    },
    [e]
  ) };
}
function gT(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [t, e]);
}
const Mn = { ArrowUp: -1, ArrowDown: 1 }, Bn = { ArrowLeft: -1, ArrowRight: 1 }, ho = (e, t, a) => Math.min(a, Math.max(t, e));
function mo(e, t) {
  if (t !== "horizontal" && e in Mn) return Mn[e];
  if (t !== "vertical" && e in Bn) return Bn[e];
}
function Ht({ orientation: e = "both" } = {}) {
  const [t, a] = p(0), r = _(/* @__PURE__ */ new Map()), o = _(!1);
  nt(() => {
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
      const w = Math.max(0, h.indexOf(t)), f = mo(u.key, e);
      f !== void 0 ? (u.preventDefault(), s(h[ho(w + f, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
const yT = (e, t, a) => {
  const r = new EventSource(e), o = (i) => a.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, NT = "0.2.0", kT = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], wo = [1, 2, 3, 4, 5, 6], ya = [1, 2, 3], fo = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], $T = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], CT = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], j = {
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
    measure: "var(--ward-width-measure)"
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
function wn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Ot(e) {
  return wo.includes(e);
}
function wt(e) {
  return ya.includes(e);
}
function _o(e) {
  if (!Ot(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function ST(e) {
  if (!Ot(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const vo = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function bo(e) {
  if (!Ot(e)) throw new Error("unvalidated stream step");
  return vo[e];
}
function jn(e) {
  return typeof e != "string" ? null : fo.includes(e) ? e : null;
}
function po(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function go(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function yo(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function No(e, t, a) {
  const r = po(e);
  if (r === null) return null;
  const o = jn(a) ?? jn(r.type);
  return o === null ? null : { ...r, type: o, id: go(r, t), at: yo(r) };
}
function ko(e, t) {
  return e >= be.staleAfter ? "stale" : e >= be.heartbeat && t === "live" ? "reconnecting" : null;
}
function $o(e, t, a) {
  return e >= be.heartbeat && !t && a !== null;
}
function RT(e, t) {
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
        const ze = No(T, J, ke);
        ze !== null && (ze.id && (d.current = ze.id), H(), N.current = !1, E("live"), i(ze.at), me(ze));
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
  }, [me, E, H, t, e]), Ee = te((T) => {
    N.current = !0, T.close(), h.current = null, w.current = window.setTimeout(re, be.reconnectBase);
  }, [re]), Ye = te((T, J) => (s.current.set(J, T), () => {
    s.current.delete(J);
  }), []);
  return S(() => (re(), f.current = window.setInterval(() => {
    const T = Date.now() - c.current, J = ko(T, k.current);
    J && E(J);
    const ke = h.current;
    $o(T, N.current, ke) && Ee(ke);
  }, be.tick), () => {
    var T;
    window.clearInterval(f.current), window.clearTimeout(w.current), N.current = !1, (T = h.current) == null || T.close(), h.current = null;
  }), [re, Ee, E]), { connection: a, lastEventAt: o, subscribe: Ye };
}
function fn(e, t) {
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
const Co = { blue: "running", orange: "waiting", green: "done" };
function So() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Pn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function Ct(e, t) {
  const a = _(0), r = te((o) => {
    const i = o ?? t, s = e.current;
    s !== null && i !== void 0 && (So() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${Co[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => Pn(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => Pn(s), be.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (o) => r(o) : () => r(t);
}
const Ro = "_root_1otpc_2", To = {
  root: Ro
};
function xo(e, t, a, r, o) {
  const i = [mn(t)];
  return e || i.push(`as of ${eo(a)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function Le({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const o = a !== "stale", i = fn(e, o), s = (t == null ? void 0 : t.at) ?? e, c = xo(o, i, s, r, t);
  return /* @__PURE__ */ l("span", { className: `${To.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const Lo = "_app_1bnco_1", Ao = "_side_1bnco_35", Eo = "_sideTop_1bnco_46", Io = "_sideBody_1bnco_60", Mo = "_iconRail_1bnco_99", Bo = "_railItem_1bnco_108", jo = "_railIcon_1bnco_129", Po = "_railDot_1bnco_134", qo = "_railLetter_1bnco_140", Ho = "_main_1bnco_146", Oo = "_rail_1bnco_108", Do = "_page_1bnco_168", Fo = "_headerRow_1bnco_191", zo = "_sidebarToggle_1bnco_198", Wo = "_headerSlot_1bnco_203", Ko = "_headerAction_1bnco_208", Go = "_drawerSide_1bnco_213", Uo = "_root_1bnco_260", Vo = "_topbar_1bnco_267", Yo = "_mark_1bnco_278", Jo = "_brand_1bnco_285", Qo = "_tagline_1bnco_291", Xo = "_identity_1bnco_297", Zo = "_tools_1bnco_298", el = "_nav_1bnco_308", tl = "_metadata_1bnco_315", nl = "_actor_1bnco_330", al = "_detail_1bnco_331", rl = "_content_1bnco_376", ol = "_toolsPanel_1bnco_392", ll = "_skip_1bnco_418", C = {
  app: Lo,
  side: Ao,
  sideTop: Eo,
  sideBody: Io,
  iconRail: Mo,
  railItem: Bo,
  railIcon: jo,
  railDot: Po,
  railLetter: qo,
  main: Ho,
  rail: Oo,
  page: Do,
  headerRow: Fo,
  sidebarToggle: zo,
  headerSlot: Wo,
  headerAction: Ko,
  drawerSide: Go,
  root: Uo,
  topbar: Vo,
  mark: Yo,
  brand: Jo,
  tagline: Qo,
  identity: Xo,
  tools: Zo,
  nav: el,
  metadata: tl,
  actor: nl,
  detail: al,
  content: rl,
  toolsPanel: ol,
  skip: ll
};
function rt(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const il = "_scope_1an6i_2", sl = {
  scope: il
}, Na = Ne(null);
function TT({ reason: e, actions: t = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ l("fieldset", { disabled: !0, className: `${sl.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(Na.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Ae() {
  return ye(Na);
}
function Dt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : rt(e, t.reasonId);
}
const cl = "_btn_hrmlj_2", dl = "_primary_hrmlj_14", ul = "_destructive_hrmlj_25", hl = "_secondary_hrmlj_35", ml = "_ghost_hrmlj_40", wl = "_overflow_hrmlj_49", fl = "_sm_hrmlj_56", _l = "_disabled_hrmlj_60", vl = "_withReason_hrmlj_68", bl = "_reason_hrmlj_74", tt = {
  btn: cl,
  primary: dl,
  destructive: ul,
  secondary: hl,
  ghost: ml,
  overflow: wl,
  sm: fl,
  disabled: _l,
  withReason: vl,
  reason: bl
};
function pl(e, t, a, r) {
  const o = t === "sm" ? [tt.sm, "ward-btn--sm"] : [], i = a ? [tt.disabled] : [];
  return [tt.btn, tt[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function gl(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function yl(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Nl(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function kl(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function $l(e, t, a) {
  return kl(e.describedBy, t && a);
}
function Cl({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${tt.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function Sl(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Ae()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(Rl, { ...e });
}
function Rl(e) {
  const t = Ae();
  yl(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", o = !!(e.disabled || t), i = Nl(e, t), s = y(), c = Tl(i, t);
  return /* @__PURE__ */ l(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: pl(a, r, o, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: o,
        title: i,
        "aria-describedby": $l(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...gl(a, e.controls),
        children: Sl(e)
      }
    ),
    /* @__PURE__ */ n(Cl, { id: s, reason: i, shown: c === ka })
  ] });
}
function Tl(e, t) {
  return e && !t ? ka : va;
}
function ka({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${tt.withReason} ward-btn-withReason`, children: e });
}
let _n = "none";
function xl(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (_n = "key");
}
typeof document < "u" && (document.addEventListener("keydown", xl, !0), document.addEventListener("pointerdown", () => {
  _n = "pointer";
}, !0));
function Ll() {
  return _n === "key";
}
function ht(e) {
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
const Al = "_scrim_1cawq_2", El = "_drawer_1cawq_10", Il = "_sheet_1cawq_14", Ml = "_modal_1cawq_18", Bl = "_panel_1cawq_23", jl = "_start_1cawq_44", Pl = "_header_1cawq_67", ql = "_title_1cawq_75", Hl = "_body_1cawq_79", Ol = "_close_1cawq_106", Te = {
  scrim: Al,
  drawer: El,
  sheet: Il,
  modal: Ml,
  panel: Bl,
  start: jl,
  header: Pl,
  title: ql,
  body: Hl,
  close: Ol
}, Dl = Ne(null), Lt = [], At = /* @__PURE__ */ new Map();
function Fl(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function zl(e, t) {
  let a = At.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, At.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function Wl(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !Fl(r) && zl(e, r);
}
function Kl(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (Wl(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function Gl(e) {
  for (const t of e.claims) {
    const a = At.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), At.delete(t)));
  }
}
function Ul(e, t) {
  const a = { root: e, claims: [] };
  return Lt.push(a), Kl(a, t), a;
}
function Vl(e) {
  const t = Lt.indexOf(e);
  t >= 0 && Lt.splice(t, 1), Gl(e);
}
function qn(e) {
  return e !== null && Lt.at(-1) === e;
}
function Yl(e, t, a) {
  const r = _(null), o = _(a);
  return o.current = a, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = Ul(i, t);
    return r.current = c, () => {
      var u, h;
      const d = qn(c);
      Vl(c), r.current = null, d && ((h = (u = o.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), te(() => qn(r.current), []);
}
function Jl(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function Ql(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Xl({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("header", { className: `${Te.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Te.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Zl(e) {
  return `${Te.scrim} ${Te[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function ei(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Te.panel} ${Te[e]} ward-overlay-panel${a}${r}`;
}
function ti(e) {
  const t = ye(Dl);
  return e ?? t ?? document.body;
}
function ot(e) {
  const t = _(null), a = _(null), r = y(), o = ti(e.container), i = ht("(min-width: 768px)"), s = Jl(e.kind, i), c = Ql(e, r), d = uo(a), [u] = p(Ll), h = Yl(t, o, e.returnFocusTo), w = te(() => {
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
  }, [w]), Qr(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: Zl(s),
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
            className: ei(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => h() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Te.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Xl, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const ni = /^([a-z][a-z0-9+.-]*):/i, ai = /* @__PURE__ */ new Set(["http", "https"]), ri = "#";
function oi(e) {
  var r, o;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (o = (r = ni.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : o.toLowerCase();
}
function A(e) {
  const t = oi(e);
  return t === void 0 || ai.has(t) ? e : ri;
}
function li(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function $a(e) {
  const t = li(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function ii(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => $a(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const o = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [a, ...a.children]) o == null || o.observe(i);
    return r(), () => {
      a.removeEventListener("scroll", r), o == null || o.disconnect();
    };
  }, [e, t]);
}
function si(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, o = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : o > e.clientWidth - a ? e.scrollLeft + o - e.clientWidth + a : null;
}
function ci(e, t, a) {
  nt(() => {
    const r = e.current, o = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !o) return;
    const i = si(r, o);
    i !== null && (r.scrollLeft = Math.max(0, i)), $a(r);
  }, [e, t, a]);
}
const di = "_row_11g8i_2", ui = {
  row: di
};
function hi(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function vn({ label: e, children: t, count: a, as: r = "div", focusable: o = !0, rowRef: i, className: s, ...c }) {
  const d = _(null), u = i ?? d;
  return ii(u, a), /* @__PURE__ */ n(r, { ref: u, className: [ui.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...hi(o, r), ...c, children: t });
}
const mi = "_icon_1ylqy_2", wi = {
  icon: mi
};
function ft({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: wi.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function xT() {
  return /* @__PURE__ */ n(ft, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function LT() {
  return /* @__PURE__ */ l(ft, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function AT() {
  return /* @__PURE__ */ l(ft, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function ET() {
  return /* @__PURE__ */ n(ft, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function fi() {
  return /* @__PURE__ */ l(ft, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const Ca = "ward:sidebar-collapsed", _i = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function vi() {
  try {
    return window.localStorage.getItem(Ca) === "true";
  } catch {
    return !1;
  }
}
function bi(e) {
  try {
    window.localStorage.setItem(Ca, String(e));
  } catch {
  }
}
function pi(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function gi(e) {
  return e instanceof Element && e.closest(_i) !== null;
}
function yi(e) {
  return e.key === "[" && !pi(e) && !gi(e.target);
}
function Ni(e) {
  const [t, a] = p(vi), r = () => {
    bi(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const o = (i) => {
      var c;
      if (!yi(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [e, t]), { collapsed: t, toggle: r };
}
function ki() {
  const e = ht("(max-width: 767.98px)"), t = ht("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function $i(e) {
  const t = e === "phone", a = y(), r = _(null), [o, i] = p(!1);
  return o && !t && i(!1), { narrow: t, open: o, drawerId: a, slotRef: r, toggle: () => i(!o), close: () => i(!1) };
}
function Ci({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ l("div", { className: C.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: C.headerSlot, children: e }),
    xa(t) && /* @__PURE__ */ n("span", { className: C.headerAction, children: t })
  ] }) : e;
}
function Si(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function Ri({ sidebar: e, label: t, drawer: a }) {
  var o;
  if (Si(a.open, a.close), !a.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(ot, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (o = a.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ n("div", { className: C.drawerSide, onClick: r, children: Sa(e, !1) }) });
}
function Ti(e) {
  const [t, a] = p(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function xi(e, t) {
  const a = Ni(e === "wide" && !t), r = Ti(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function Li(e, t) {
  const a = xi(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return Ei(e.collapsed, t);
  const r = a.collapsed, o = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: o, drawsStrip: !o && typeof e.sidebar == "function", toggle: a.toggle };
}
const Ai = (e) => e.collapsed && e.drawsStrip;
function Ei(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const Hn = (e) => e ? "" : void 0;
function Sa(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ra({ fold: e }) {
  return /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(fi, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function Ii({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: C.sideTop, children: /* @__PURE__ */ n(Ra, { fold: e }) });
}
const Ta = Ne(null);
function IT() {
  const e = ye(Ta);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(Ra, { fold: e });
}
function Mi({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": wn(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Bi({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: C.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ l("a", { className: C.railItem, href: A(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(Mi, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function ji({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: o }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ l("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(Ii, { fold: r, inSidebar: o && !i }),
    /* @__PURE__ */ n("div", { className: C.sideBody, hidden: i, children: Sa(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(Bi, { items: a ?? [], label: t })
  ] });
}
const xa = (e) => e != null;
function Pi(e) {
  const { sidebar: t, header: a, action: r, children: o, rail: i, iconRail: s, pageFill: c } = e, d = xa(i), u = ki(), h = $i(u), w = Li(e, u), f = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ l("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": Hn(Ai(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(Ta.Provider, { value: w, children: /* @__PURE__ */ n(ji, { sidebar: t, label: f, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ l("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(Ci, { header: a, action: r, label: f, drawer: h }),
      /* @__PURE__ */ n("div", { className: C.page, "data-fill": Hn(c === !0), children: o })
    ] }),
    d && /* @__PURE__ */ n("div", { className: C.rail, children: i }),
    /* @__PURE__ */ n(Ri, { sidebar: t, label: f, drawer: h })
  ] });
}
function qi({ destinations: e, active: t }) {
  const a = _(null);
  return ci(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(vn, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: A(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function on({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function Hi({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ l("span", { className: C.metadata, children: [
    /* @__PURE__ */ n(on, { value: e, className: C.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(on, { value: t, className: C.detail })
  ] });
}
function Oi() {
  const e = ht("(max-width: 767.98px)"), t = y(), a = _(null), [r, o] = p(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Di({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: C.tools, children: e });
}
function Fi({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: C.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function zi(e) {
  return /* @__PURE__ */ l("header", { className: C.topbar, children: [
    /* @__PURE__ */ n("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(on, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ n(qi, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: C.identity, children: /* @__PURE__ */ n(Hi, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Di, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Wi(e) {
  const t = y(), a = Oi();
  return /* @__PURE__ */ l("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: C.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(zi, { ...e, menu: a }),
    /* @__PURE__ */ n(Fi, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: C.content, children: e.children })
  ] });
}
function Ki(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function MT(e) {
  return Ki(e) ? /* @__PURE__ */ n(Pi, { ...e }) : /* @__PURE__ */ n(Wi, { ...e });
}
const Gi = "_root_itg9o_2", Ui = "_row_itg9o_8", Vi = "_box_itg9o_14", Yi = "_label_itg9o_21", Ji = "_labelHidden_itg9o_26", Qi = "_lockedNote_itg9o_36", Xi = "_consequence_itg9o_44", Zi = "_sample_itg9o_79", Be = {
  root: Gi,
  row: Ui,
  box: Vi,
  label: Yi,
  labelHidden: Ji,
  lockedNote: Qi,
  consequence: Xi,
  sample: Zi
};
function es(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function ts({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: t }) : null;
}
function ns({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function as(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function rs(e, t, a, r) {
  const o = e.consequence ? `${t}-note` : void 0, i = as(e, a, r), s = i ? `${t}-reason` : void 0, c = Dt(rt(o, e.describedBy, s), r);
  return { noteId: o, reason: i, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? i } };
}
function os({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function ls({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function La(e) {
  const t = y(), a = Ae(), r = es(e, a), o = rs(e, t, r.disabled, a);
  return /* @__PURE__ */ l("div", { className: `${Be.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ l("span", { className: Be.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: t,
          type: "checkbox",
          className: `${Be.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (i) => {
            var s;
            return !r.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, i.target.checked));
          },
          ...o.input
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: t, className: e.labelHidden ? Be.labelHidden : Be.label, children: [
        e.label,
        /* @__PURE__ */ n(ns, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(ls, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(os, { id: o.reasonId, reason: o.reason }),
    /* @__PURE__ */ n(ts, { id: o.noteId, text: e.consequence })
  ] });
}
const is = "_chip_pq6tb_2", ss = {
  chip: is
}, cs = {
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
function ds(e, t) {
  if (e === "stream") return us(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = cs[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function us(e) {
  if (!e || !wt(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = wn(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${ss.chip} ward-chip ward-chip--${e}`, style: ds(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const hs = "_clamp_zn74g_3", On = {
  clamp: hs
};
function at({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? On.clamp : `${On.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const ms = "_root_1btz3_2", ws = "_body_1btz3_10", fs = "_toggle_1btz3_24", Vt = {
  root: ms,
  body: ws,
  toggle: fs
};
function BT({ children: e, lines: t = 3, label: a }) {
  const [r, o] = p(!1), i = y();
  return /* @__PURE__ */ l("div", { className: Vt.root, children: [
    /* @__PURE__ */ n("div", { id: i, className: Vt.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: Vt.toggle, "aria-expanded": r, "aria-controls": i, onClick: () => o(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const _s = "_root_1a4s8_2", vs = "_words_1a4s8_16", bs = "_title_1a4s8_23", ps = "_actions_1a4s8_27", vt = {
  root: _s,
  words: vs,
  title: bs,
  actions: ps
};
function jT({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ l("section", { className: vt.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ l("div", { className: vt.words, children: [
      /* @__PURE__ */ n("strong", { className: vt.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: vt.actions, children: a })
  ] });
}
const gs = "_root_8zmpu_2", ys = "_step_8zmpu_12", Ns = "_dot_8zmpu_38", ks = "_label_8zmpu_51", it = {
  root: gs,
  step: ys,
  dot: Ns,
  label: ks
}, $s = { done: ", done", now: ", current", next: "" };
function Cs({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ l("li", { className: it.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${it.dot} ward-running` : it.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: it.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: $s[e.state] })
  ] });
}
function PT({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: it.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(Cs, { step: r, running: t }, r.label)) });
}
function _t(e) {
  return typeof e == "number" && wt(e) ? e : null;
}
function ge(e, t) {
  const a = _t(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function Ft(e, t) {
  const a = _t(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const Ss = "_root_13eei_3", Rs = "_nav_13eei_8", Ts = "_list_13eei_16", xs = "_item_13eei_24", Ls = "_link_13eei_44", As = "_sep_13eei_54", Es = "_current_13eei_58", Is = "_chips_13eei_62", Me = {
  root: Ss,
  nav: Rs,
  list: Ts,
  item: xs,
  link: Ls,
  sep: As,
  current: Es,
  chips: Is
};
function Ms({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: Me.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${Me.link} ward-target`, href: A(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function Bs({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: Me.root, children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ n("ol", { className: Me.list, children: e.map((r, o) => /* @__PURE__ */ l("li", { className: Me.item, children: [
      o > 0 ? /* @__PURE__ */ n("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(Ms, { step: r, isCurrent: a && o === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${Me.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function Aa(e, t, a) {
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
const js = 500;
function Ea(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function Ia() {
  const e = _(""), t = _(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, js), e.current);
}
const bt = 4;
function Ps(e, t, a) {
  const r = Math.max(0, a - e.bottom - bt * 2), o = Math.max(0, e.top - bt * 2);
  return t <= r || r >= o ? { top: e.bottom + bt, maxHeight: r } : { top: e.top - bt - Math.min(t, o), maxHeight: o };
}
function qs(e, t, a, r) {
  const o = { start: e.left, end: e.right - t }, i = { start: o.start + t <= a, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, a - t));
}
function Hs(e, t, a, r) {
  return { ...Ps(e, t.height, a.height), left: qs(e, t.width, a.width, r) };
}
function St(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Os(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function Ds(e, t, a) {
  const r = Os(t, a);
  e.style.setProperty("--ward-anchor-width", St(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const o = e.getBoundingClientRect(), i = document.documentElement;
  return { edges: r, box: o, view: { width: i.clientWidth, height: i.clientHeight } };
}
function Fs(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, o) => r.scrollTop = a[o]);
}
function Dn(e, t, a, r) {
  const o = Fs(e), i = Ds(e, t, r), s = Hs(i.edges, i.box, i.view, a);
  Object.assign(e.style, { left: St(s.left - i.box.left), top: St(s.top - i.box.top), maxHeight: St(s.maxHeight) }), o();
}
function zs(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function Ma(e, t, a = "start", r) {
  nt(() => {
    const o = t.current, i = e.current;
    if (!o || !i) return;
    const s = zs(o), c = () => Dn(o, i, a, r == null ? void 0 : r.current), d = (u) => {
      o.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), nt(() => {
    t.current && e.current && Dn(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const Ws = "_root_1lgbn_2", Ks = "_trigger_1lgbn_7", Gs = "_value_1lgbn_47", Us = "_menu_1lgbn_65", Vs = "_find_1lgbn_87", Ys = "_list_1lgbn_103", Js = "_option_1lgbn_114", Qs = "_check_1lgbn_133", Xs = "_empty_1lgbn_144", pe = {
  root: Ws,
  trigger: Ks,
  value: Gs,
  menu: Us,
  find: Vs,
  list: Ys,
  option: Js,
  check: Qs,
  empty: Xs
}, Zs = 7;
function ec(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function Fn(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function tc(e, t) {
  const [a, r] = p(e.defaultOpen === !0), [o, i] = p(""), [s, c] = p(() => Fn(e.options, e.value)), d = (u) => {
    var h;
    ba(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: o,
    active: s,
    entries: ec(e.options, o),
    findable: e.options.length > Zs,
    show: () => {
      e.disabled || (i(""), c(Fn(e.options, e.value)), r(!0));
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
function nc(e, t) {
  const a = _(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function ac(e) {
  const t = Ia();
  return (a) => {
    const r = t(a), o = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    o >= 0 && e.to(o);
  };
}
function Ba(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function rc(e) {
  return { ...Ba(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function ja(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const o = t[r.key];
    if (!o) return a(r);
    r.preventDefault(), r.stopPropagation(), o();
  };
}
const oc = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function lc(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      oc.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function ic({ entry: e, at: t, menu: a, ids: r, value: o }) {
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
function bn(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function sc({ menu: e, ids: t, focusRef: a }) {
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
      "aria-activedescendant": bn(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: ja(e, Ba(e), () => {
      })
    }
  );
}
function cc({ props: e, menu: t, ids: a, focusRef: r, trigger: o }) {
  const i = ac(t), s = _(null);
  Ma(o, s);
  const c = (d) => {
    Ea(d) && i(d.key);
  };
  return /* @__PURE__ */ l("div", { ref: s, className: pe.menu, children: [
    t.findable && /* @__PURE__ */ n(sc, { menu: t, ids: a, focusRef: r }),
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
        "aria-activedescendant": t.findable ? void 0 : bn(t, a),
        onKeyDown: ja(t, rc(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(ic, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: pe.empty, children: "No match" })
  ] });
}
function dc(e, t) {
  const a = e.open ? bn(e, t) : void 0;
  S(() => {
    var r, o;
    a && ((o = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [a]);
}
function Pa(...e) {
  return e.filter(Boolean).join(" ");
}
function uc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function hc({ props: e, menu: t, ids: a, trigger: r, wantFocus: o }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ae()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: Pa(pe.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": t.open,
      "aria-controls": t.open ? a.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": rt(e["aria-describedby"], a.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...lc(t, o),
      children: /* @__PURE__ */ n("span", { id: a.value, className: pe.value, "data-placeholder": i || void 0, children: uc(e) })
    }
  );
}
function qa(e) {
  const t = Ae(), a = t ? { ...e, disabled: !0, "aria-describedby": Dt(e["aria-describedby"], t) } : e, r = y(), o = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = _(null), s = _(null), c = _(null), d = tc(a, s), u = nc(d.open, c);
  return Aa(d.open, i, () => d.close(!1)), dc(d, o), /* @__PURE__ */ l("div", { ref: i, className: Pa(pe.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(hc, { props: a, menu: d, ids: o, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(cc, { props: a, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const mc = "_field_1ensj_2", wc = "_label_1ensj_8", fc = "_labelHidden_1ensj_15", _c = "_control_1ensj_25", vc = "_mono_1ensj_45", bc = "_area_1ensj_50", pc = "_invalid_1ensj_57", Oe = {
  field: mc,
  label: wc,
  labelHidden: fc,
  control: _c,
  mono: vc,
  area: bc,
  invalid: pc
}, gc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, Ha = (e) => `${e}-label`;
function yc({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? gc : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function Nc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    qa,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": Ha(t.id),
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
function kc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
const $c = { input: yc, select: Nc, textarea: kc };
function Cc(e, t, a) {
  const r = $c[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function Sc(e, t, a, r) {
  const o = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": o,
    "aria-describedby": Dt(rt(o ? a : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function Rc(e) {
  const t = e.mono ? [Oe.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [Oe.area] : [];
  return [Oe.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function Tc(e) {
  return e ? `${Oe.label} ${Oe.labelHidden} ward-field-label` : `${Oe.label} ward-field-label`;
}
function q(e) {
  const t = y(), a = `${t}-msg`, r = Sc(e, t, a, Ae()), o = Rc(e);
  return /* @__PURE__ */ l("div", { className: `${Oe.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: Ha(t), className: Tc(e.labelHidden), htmlFor: t, children: e.label }),
    Cc(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${Oe.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const xc = "_root_sjvm0_2", Lc = "_trigger_sjvm0_9", Ac = "_ghost_sjvm0_27", Ec = "_panel_sjvm0_46", Ic = "_edged_sjvm0_67", Mc = "_menu_sjvm0_73", Bc = "_group_sjvm0_78", jc = "_heading_sjvm0_83", Pc = "_item_sjvm0_89", qc = "_description_sjvm0_105", Hc = "_large_sjvm0_109", Oc = "_touch_sjvm0_113", Dc = "_icon_sjvm0_117", Fc = "_label_sjvm0_125", zc = "_text_sjvm0_130", Wc = "_trailing_sjvm0_138", Kc = "_check_sjvm0_144", Gc = "_separator_sjvm0_183", Uc = "_footer_sjvm0_189", Vc = "_find_sjvm0_196", Yc = "_findGlyph_sjvm0_208", Jc = "_findInput_sjvm0_214", Qc = "_empty_sjvm0_230", L = {
  root: xc,
  trigger: Lc,
  ghost: Ac,
  panel: Ec,
  edged: Ic,
  menu: Mc,
  group: Bc,
  heading: jc,
  item: Pc,
  description: qc,
  large: Hc,
  touch: Oc,
  icon: Dc,
  label: Fc,
  text: zc,
  trailing: Wc,
  check: Kc,
  separator: Gc,
  footer: Uc,
  find: Vc,
  findGlyph: Yc,
  findInput: Jc,
  empty: Qc
}, Oa = Ne(null);
function Xc(e, t) {
  const [a, r] = p({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (o) => r((i) => ({ open: !0, start: o, request: i.request + 1 })),
    close: (o) => {
      var i;
      ba(() => r((s) => ({ ...s, open: !1 }))), o && ((i = t.current) == null || i.focus());
    }
  };
}
const Zc = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function ed(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = Zc.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function pn(...e) {
  return e.filter(Boolean).join(" ");
}
function td(e, t = {}, a = "field") {
  const { ref: r, className: o, ...i } = t;
  return { ...i, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: pn(L.trigger, a === "ghost" ? L.ghost : void 0, o) };
}
function Da(e) {
  const t = y(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = _(null), o = _(null), i = Xc(e.defaultOpen === !0, o);
  return Aa(i.open, r, () => i.close(!1)), /* @__PURE__ */ l("div", { ref: r, className: pn(L.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...td(o, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...ed(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(Oa.Provider, { value: { ...a, popup: i, button: o }, children: e.children })
  ] });
}
function nd(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function ad(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const rd = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function od(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function ld(e, t) {
  return e === "separator" ? e : "items" in e ? od(e, t) : t(e) ? e : null;
}
function id(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function sd(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (o) => o.label.toLowerCase().includes(a);
  return id(e.map((o) => ld(o, r)).filter((o) => o !== null));
}
const Fa = (e, t) => (e % t + t) % t;
function Pe(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const o = Fa(t + a * r, e.length);
    if (!e[o].disabled) return o;
  }
  return -1;
}
const cd = (e) => e.split("").every((t) => t === e[0]);
function dd(e, t, a) {
  const r = cd(a), o = r ? a[0] : a, i = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = Fa(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function ud(e) {
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
function hd(e, t) {
  const { items: a } = e, r = () => {
    var o;
    return (o = e.refs.current[e.current()]) == null ? void 0 : o.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(Pe(a, e.current(), 1))],
    ["ArrowUp", () => e.focus(Pe(a, e.current(), -1))],
    ["Home", () => e.focus(Pe(a, -1, 1))],
    ["End", () => e.focus(Pe(a, a.length, -1))],
    ["Escape", () => t.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function md(e, t, a) {
  const r = Ia(), o = hd(e, t), i = (s) => {
    if (Ea(s)) {
      if (!a) return e.focus(dd(e.items, e.current(), r(s.key)));
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
function wd(e) {
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
function fd(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? Pe(e, -1, 1) : t;
}
function _d(e, t) {
  const { start: a, request: r } = t, o = _(e);
  o.current = e, S(() => {
    const { items: i, focus: s } = o.current;
    a && s(a === "first" ? fd(i) : Pe(i, i.length, -1));
  }, [a, r]);
}
function vd({ row: e, nav: t, popup: a }) {
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
const bd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function pd(e, t) {
  return bd(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function gd(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: L.label, children: e.label });
  return e.description ? /* @__PURE__ */ l("span", { className: L.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: L.description, children: e.description })
  ] }) : a;
}
function yd() {
  return /* @__PURE__ */ n("svg", { className: L.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function zn(e, t) {
  return /* @__PURE__ */ l(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: L.icon, "aria-hidden": "true", children: e.icon }) : null,
    gd(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: L.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(yd, {}) : null
  ] });
}
function za(e) {
  const { item: t, at: a } = e.row, r = y(), o = {
    ref: (i) => {
      e.nav.refs.current[a] = i;
    },
    role: "menuitem",
    tabIndex: -1,
    className: L.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...pd(t, r),
    ...vd(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: A(t.href), ...o, children: zn(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...o, children: zn(t, r) });
}
function Nd({ heading: e, rows: t, nav: a, popup: r }) {
  const o = y();
  return /* @__PURE__ */ l("div", { role: "group", "aria-labelledby": o, className: L.group, children: [
    /* @__PURE__ */ n("div", { id: o, className: L.heading, children: e }),
    t.map((i) => /* @__PURE__ */ n(za, { row: i, nav: a, popup: r }, i.at))
  ] });
}
function kd({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: L.separator }) : e.kind === "group" ? /* @__PURE__ */ n(Nd, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(za, { row: e.row, nav: t, popup: a });
}
function $d() {
  const e = ye(Oa);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Cd() {
  return /* @__PURE__ */ l("svg", { className: L.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function Sd(e, t) {
  const a = () => Pe(e.items, -1, 1);
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(a())],
    ["ArrowUp", () => e.focus(Pe(e.items, e.items.length, -1))],
    ["Enter", () => {
      var r;
      return (r = e.refs.current[a()]) == null ? void 0 : r.click();
    }],
    ["Escape", () => t.close(!0)]
  ]);
}
function Rd({ find: e, query: t, setQuery: a, input: r, nav: o, popup: i, menuId: s }) {
  const c = Sd(o, i), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ l("div", { className: L.find, children: [
    /* @__PURE__ */ n(Cd, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: L.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function Td(e, t) {
  const [a, r] = p(""), o = _(null), i = t !== void 0 && rd(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = o.current) == null || d.focus();
  };
  return i ? { find: t, query: a, setQuery: r, input: o, toFind: s, entries: sd(e, a) } : { query: a, setQuery: r, input: o, entries: e };
}
const xd = { regular: void 0, large: L.large, touch: L.touch }, Ld = (e, t) => pn(L.panel, e ? L.edged : void 0, xd[t]);
function Ad({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: L.empty, children: e.empty ?? "No matches" });
}
function Wa({ entries: e, footer: t, align: a = "start", find: r, edges: o, size: i = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = $d(), h = _(null);
  Ma(u, h, a, o);
  const w = Td(e, r), f = nd(w.entries), N = ud(f.flatMap(ad).map((H) => H.item)), k = md(N, s, w.toFind), E = wd(s);
  return _d(N, s), /* @__PURE__ */ l("div", { ref: h, className: Ld(o, i), ...E, children: [
    w.find && /* @__PURE__ */ n(Rd, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: L.menu, ...k, children: f.map((H, me) => /* @__PURE__ */ n(kd, { block: H, nav: N, popup: s }, me)) }),
    /* @__PURE__ */ n(Ad, { find: w.find, count: N.items.length }),
    t && /* @__PURE__ */ n("p", { className: L.footer, children: t })
  ] });
}
function Ed(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function Ka(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !Ed(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const Id = (e, t) => e.reduce((a, r) => a + r + t, -t);
function Md({ room: e, widths: t, more: a, gap: r }, o) {
  const i = t.map((d, u) => u);
  if (Id(t, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([o]);
  let c = t[o] + r + a;
  for (const d of i)
    if (d !== o) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Yt = (e) => Number.parseFloat(e) || 0, Wn = (e) => e.getBoundingClientRect().width;
function Bd(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Yt(a.paddingInlineStart) - Yt(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), Wn),
    more: r ? Wn(r) : 0,
    gap: Yt(a.columnGap)
  };
}
function jd(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const Pd = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function Ga(e, t, a, r = ':scope > [role="tab"]') {
  const [o, i] = p(null);
  return nt(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = Bd(s, r);
      i((u) => Pd(u, d) ? u : d);
    };
    return c(), jd(s, c);
  }, [e, a, r]), o && Md(o, t);
}
const qd = "_strip_1zvzj_2", Hd = "_fits_1zvzj_19", Od = "_probe_1zvzj_27", Dd = "_moreRoot_1zvzj_36", Fd = "_more_1zvzj_36", zd = "_tab_1zvzj_55", Wd = "_count_1zvzj_91", Kd = "_badge_1zvzj_97", Y = {
  strip: qd,
  fits: Hd,
  probe: Od,
  moreRoot: Dd,
  more: Fd,
  tab: zd,
  count: Wd,
  badge: Kd
}, Ua = "More";
function Gd(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const Kn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, gn = (e) => e.badge === void 0 ? Kn(e) : `${Kn(e)}, ${e.badge}`;
function Va(e) {
  return `${Y.strip} ward-tabs ward-tabs--${e}`;
}
const Ud = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Vd({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ l(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${Y.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : gn(e),
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
function Yd(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((i) => i.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Jd({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(Da, { label: Ua, className: Y.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: Y.more }, children: /* @__PURE__ */ n(Wa, { align: "end", entries: e.map((r) => ({ label: gn(r), onSelect: () => a(r.id) })) }) });
}
function Qd(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : Ud;
}
function qT({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: o }) {
  const i = Ht({ orientation: "horizontal" }), s = Gd(e, t);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = _(null);
  Ka(c, o);
  const d = Ga(c, s, e.map(gn).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ l("div", { ref: c, className: `${Va(o)} ${Y.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(Vd, { tab: h, active: t, place: Qd(i, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${Y.more} ${Y.probe}`, children: Ua }),
    u.length > 0 && /* @__PURE__ */ n(Jd, { tabs: u, trigger: i.itemProps(e.length), onPick: Yd(c, a) })
  ] });
}
const Gn = 7, Ya = "More", Xd = ":scope > a", Ja = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Zd = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function eu(e, t) {
  return !e || e.includes(t) ? {} : Zd;
}
function tu({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, className: `${Y.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ l(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
    ] })
  ] });
}
function nu({ links: e }) {
  return /* @__PURE__ */ n(Da, { label: Ya, className: Y.moreRoot, trigger: { className: Y.more }, children: /* @__PURE__ */ n(Wa, { align: "end", entries: e.map((t) => ({ label: Ja(t), href: t.href })) }) });
}
function HT({ links: e, active: t, label: a, level: r }) {
  if (e.length > Gn) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${Gn} — the set is fixed`);
  const o = _(null);
  Ka(o, r);
  const i = Math.max(0, e.findIndex((d) => d.id === t)), s = Ga(o, i, e.map(Ja).join(`
`), Xd), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ l("nav", { ref: o, className: `${Va(r)} ${Y.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(tu, { link: d, current: d.id === t, place: eu(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${Y.more} ${Y.probe}`, children: Ya }),
    c.length > 0 && /* @__PURE__ */ n(nu, { links: c })
  ] });
}
const au = "_root_v56ff_3", ru = "_segment_v56ff_9", Un = {
  root: au,
  segment: ru
};
function Qa({ options: e, value: t, onChange: a, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Ht({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${Un.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: Un.segment,
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
const ou = "_sidebar_s9o1j_3", lu = "_brand_s9o1j_9", iu = "_mark_s9o1j_17", su = "_word_s9o1j_24", cu = "_nav_s9o1j_30", du = "_navItem_s9o1j_39", uu = "_footLink_s9o1j_49", hu = "_group_s9o1j_58", mu = "_groupName_s9o1j_65", wu = "_agents_s9o1j_81", fu = "_agent_s9o1j_81", _u = "_root_s9o1j_96", vu = "_agentTop_s9o1j_105", bu = "_dot_s9o1j_112", pu = "_agentName_s9o1j_124", gu = "_agentMeta_s9o1j_138", yu = "_foot_s9o1j_49", Nu = "_footName_s9o1j_150", ku = "_footLinks_s9o1j_157", $u = "_linkBrand_s9o1j_184", Cu = "_label_s9o1j_205", Su = "_note_s9o1j_210", Ru = "_footer_s9o1j_226", I = {
  sidebar: ou,
  brand: lu,
  mark: iu,
  word: su,
  nav: cu,
  navItem: du,
  new: "_new_s9o1j_48",
  footLink: uu,
  group: hu,
  groupName: mu,
  agents: wu,
  agent: fu,
  root: _u,
  agentTop: vu,
  dot: bu,
  agentName: pu,
  agentMeta: gu,
  foot: yu,
  footName: Nu,
  footLinks: ku,
  linkBrand: $u,
  label: Cu,
  note: Su,
  footer: Ru
};
function Tu({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ l(
    "a",
    {
      className: I.agent,
      href: A(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ l("span", { className: I.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: I.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": wn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: I.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: I.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function xu({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: I.foot, children: [
    /* @__PURE__ */ n("span", { className: I.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: I.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${I.footLink} ward-target`, href: A(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function Lu({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: o, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ l("nav", { className: I.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ l("div", { className: I.brand, children: [
      /* @__PURE__ */ n("span", { className: I.mark }),
      /* @__PURE__ */ n("span", { className: I.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: I.nav, children: t.map((s) => /* @__PURE__ */ n("a", { className: I.navItem, href: A(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ l("div", { className: I.group, children: [
      /* @__PURE__ */ l("span", { className: I.groupName, children: [
        a,
        " · ",
        ae(r.length)
      ] }),
      o && /* @__PURE__ */ n("a", { className: I.new, href: A(o.href), children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: I.agents, children: r.map((s) => /* @__PURE__ */ n(Tu, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(xu, { shared: i })
  ] });
}
function Au(e) {
  return e.destinations ?? e.items ?? [];
}
function Eu({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.linkBrand, children: e });
}
function Iu({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.footer, children: e });
}
function Mu({ link: e, active: t }) {
  return /* @__PURE__ */ l("a", { href: A(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: I.note, children: e.note })
  ] });
}
function Bu(e) {
  return /* @__PURE__ */ l("aside", { className: `${I.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Eu, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Au(e).map((t) => /* @__PURE__ */ n(Mu, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(Iu, { children: e.children })
  ] });
}
function ju(e) {
  return "agents" in e;
}
function OT(e) {
  return ju(e) ? /* @__PURE__ */ n(Lu, { ...e }) : /* @__PURE__ */ n(Bu, { ...e });
}
const Pu = "_mark_wlgi8_3", qu = {
  mark: Pu
}, Hu = { met: "✓", unmet: "", failed: "✕" };
function yn({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: qu.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: Hu[e]
    }
  );
}
const Ou = "_avatar_1t33a_3", Du = {
  avatar: Ou
};
function Et(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function Fu(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [Et(e), ...[...t.slice(1)].map((r) => a + r)];
}
function zu(e, t) {
  const a = Fu(e).find((o) => !t.has(o));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(Et(e).charAt(0) + String(r)); ) r += 1;
  return Et(e).charAt(0) + String(r);
}
function DT(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const o = zu(r, t);
    t.add(o), a.set(r, o);
  }
  return a;
}
function Wu(e) {
  return e != null && wt(e) ? _o(e) : void 0;
}
function FT({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: Du.avatar, "data-size": a, "aria-hidden": "true", style: Wu(t), children: r ?? Et(e) });
}
const Ku = "_marker_br9fi_2", Gu = {
  marker: Ku
}, Uu = {
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
}, Vu = { running: " ward-running" };
function Fe({ size: e, kind: t, label: a }) {
  const r = { "--marker": Uu[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Gu.marker} ward-marker ward-marker--${t}${Vu[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const Yu = "_root_ti0pq_2", Ju = "_chip_ti0pq_11", Qu = "_noCase_ti0pq_23", pt = {
  root: Yu,
  chip: Ju,
  noCase: Qu
};
function Xu(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Nn({ connection: e, since: t, lastEventAt: a }) {
  const r = Xu(t, a), o = fn(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${pt.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Fe, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${pt.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: pt.noCase, children: mn(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${pt.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    he(r)
  ] });
}
const Zu = "_root_yylks_2", eh = "_context_yylks_13", th = "_row_yylks_1", nh = "_heading_yylks_27", ah = "_headingWrap_yylks_35", rh = "_meta_yylks_41", oh = "_chips_yylks_49", lh = "_title_yylks_56", ih = "_consequence_yylks_66", sh = "_actionsWrap_yylks_73", ch = "_actions_yylks_73", dh = "_action_yylks_73", uh = "_overflowPanel_yylks_102", hh = "_measureClip_yylks_113", mh = "_measure_yylks_113", U = {
  root: Zu,
  context: eh,
  row: th,
  heading: nh,
  headingWrap: ah,
  meta: rh,
  chips: oh,
  title: lh,
  consequence: ih,
  actionsWrap: sh,
  actions: ch,
  action: dh,
  overflowPanel: uh,
  measureClip: hh,
  measure: mh
};
function wh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(at, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function fh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function _h({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function vh({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ l("div", { className: U.meta, children: [
    /* @__PURE__ */ n(fh, { chips: e }),
    /* @__PURE__ */ n(_h, { consequence: t, consequenceHint: a })
  ] });
}
function bh({ title: e, chips: t, consequence: a, consequenceHint: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: U.heading, children: [
    /* @__PURE__ */ n(wh, { title: e, density: o }),
    /* @__PURE__ */ n(vh, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function ln({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function Vn({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function ph({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: o }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(Vn, { disclosure: o }) : t ? [/* @__PURE__ */ n(Vn, { disclosure: o }, "more"), /* @__PURE__ */ n(ln, { actions: e }, "actions")] : /* @__PURE__ */ n(ln, { actions: e });
}
function gh(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function yh({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(ln, { actions: e }) });
}
function Nh(e, t) {
  const a = y(), [r, o] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: a, toggle: () => o(!i) }, close: () => {
    var d, u;
    o(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const kh = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function $h(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && kh(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function Ch({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(Bs, { path: e.path, current: e.current }) });
}
function Sh(...e) {
  return e.some((t) => t === null);
}
function Rh(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Th(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + Rh(e);
}
function xh(e, t, a, r, o) {
  if (o === 0 || Sh(t, a, r)) return !1;
  const [i, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - Th(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Lh(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Ah(e) {
  return Yr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Eh(e, t) {
  return t.length === 0 && e.length === 1 && Ah(e[0]);
}
function Ih(e, t) {
  const a = _(null), r = _(null), o = _(null), i = _(null), [s, c] = p(!1);
  return S(() => {
    const d = a.current;
    if (!Lh(d)) return;
    const u = () => c(xh(d, r.current, o.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: o, measureRef: i, collapsed: s && !t };
}
function Mh({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ l("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] }) });
}
function Bh({ connection: e }) {
  return e ? /* @__PURE__ */ n(Nn, { connection: e.connection, since: e.since }) : null;
}
function zT({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: o, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: N, measureRef: k, collapsed: E } = Ih(s, Eh(s, c)), H = c.length > 0, { disclosure: me, close: re } = Nh(E || H, N), Ee = gh(c, s, E, u);
  return /* @__PURE__ */ l("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(Ch, { crumb: $h(e, r, t) }),
    /* @__PURE__ */ l("div", { className: U.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: f, className: U.headingWrap, children: /* @__PURE__ */ n(bh, { title: r, chips: a, consequence: o, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ l("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(Bh, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ n(ph, { actions: s, hasMore: H, collapsed: E, onOverflow: u, disclosure: me }) })
      ] })
    ] }),
    /* @__PURE__ */ n(yh, { actions: Ee, disclosure: me, onEscape: re }),
    /* @__PURE__ */ n(Mh, { actions: s, hasMore: H, measureRef: k })
  ] });
}
const jh = "_root_td96x_2", Ph = "_body_td96x_16", Yn = {
  root: jh,
  body: Ph
};
function WT({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${Yn.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: Yn.body, children: a }) });
}
const qh = "_root_bf1pc_2", Hh = "_table_bf1pc_9", Oh = "_caption_bf1pc_14", Dh = "_series_bf1pc_23", Fh = "_category_bf1pc_31", zh = "_cell_bf1pc_39", Wh = "_track_bf1pc_45", Kh = "_lane_bf1pc_52", Gh = "_bar_bf1pc_56", Uh = "_value_bf1pc_63", Vh = "_swatch_bf1pc_70", Yh = "_empty_bf1pc_78", Z = {
  root: qh,
  table: Hh,
  caption: Oh,
  series: Dh,
  category: Fh,
  cell: zh,
  track: Wh,
  lane: Kh,
  bar: Gh,
  value: Uh,
  swatch: Vh,
  empty: Yh
}, Jh = "—", Jn = 6;
function Qh(e, t) {
  if (t.length < 1 || t.length > Jn)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${Jn}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function Xh(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function Xa(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function Zh(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function em({ value: e, top: t, step: a, format: r, missing: o }) {
  const i = Zh(e, t), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ l("span", { className: Z.track, children: [
    /* @__PURE__ */ n("span", { className: Z.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${Z.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Z.value, children: e === null ? o : r(e) })
  ] }) });
}
function tm({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ l("th", { scope: "col", className: Z.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Z.swatch, "data-step": Xa(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function nm({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ l("section", { className: `${Z.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Z.empty, children: t })
  ] });
}
function am({ title: e, categories: t, series: a, top: r, format: o = ae, categoryHead: i = "Category", missing: s = Jh }) {
  return /* @__PURE__ */ n("div", { className: `${Z.root} ward-barchart`, children: /* @__PURE__ */ l("table", { className: Z.table, children: [
    /* @__PURE__ */ n("caption", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Z.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(tm, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Z.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(em, { value: u.values[d], top: r, step: Xa(h, a.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function KT(e) {
  Qh(e.categories, e.series);
  const t = Xh(e.series);
  return t === 0 ? /* @__PURE__ */ n(nm, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(am, { ...e, top: t });
}
const rm = "_root_1bfqw_2", om = "_figure_1bfqw_7", lm = "_of_1bfqw_13", im = "_bar_1bfqw_18", sm = "_rows_1bfqw_38", cm = "_row_1bfqw_38", dm = "_label_1bfqw_49", um = "_amount_1bfqw_54", Ie = {
  root: rm,
  figure: om,
  of: lm,
  bar: im,
  rows: sm,
  row: cm,
  label: dm,
  amount: um
};
function hm({ spent: e, ceiling: t, breakdown: a }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ l("div", { className: `${Ie.root} ward-costmeter`, children: [
    /* @__PURE__ */ l("p", { className: `${Ie.figure} ward-stat-value`, children: [
      le(e),
      " ",
      /* @__PURE__ */ l("span", { className: Ie.of, children: [
        "of ",
        le(t)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Ie.bar} ward-costbar`,
        min: 0,
        max: t,
        value: e,
        "aria-valuetext": `${le(e)} of ${le(t)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    a && /* @__PURE__ */ n("ul", { className: Ie.rows, children: a.map((o) => /* @__PURE__ */ l("li", { className: `${Ie.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Ie.label, children: o.label }),
      /* @__PURE__ */ n("span", { className: Ie.amount, children: le(o.amount) })
    ] }, o.label)) })
  ] });
}
const mm = "_frame_f7bxz_2", wm = "_table_f7bxz_6", fm = "_th_f7bxz_12", _m = "_td_f7bxz_13", vm = "_sort_f7bxz_53", bm = "_row_f7bxz_65", pm = "_empty_f7bxz_73", qe = {
  frame: mm,
  table: wm,
  th: fm,
  td: _m,
  sort: vm,
  row: bm,
  empty: pm
}, gm = { asc: "ascending", desc: "descending" };
function ym(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return gm[t.direction];
}
function Nm(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: qe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function km(e) {
  return e === void 0 ? void 0 : { width: e };
}
function $m({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: qe.th,
      style: km(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ym(e, t),
      children: Nm(e, a)
    }
  );
}
function Cm({ row: e, props: t }) {
  const a = t.rowId(e), r = (t.lockedIds ?? []).includes(a);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: qe.row,
      "data-selected": a === t.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: t.columns.map((o) => /* @__PURE__ */ n(
        "td",
        {
          className: qe.td,
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
function Sm({
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
  return a.length === 0 ? /* @__PURE__ */ n("div", { className: qe.empty, children: u }) : /* @__PURE__ */ n("div", { className: qe.frame, "data-narrow": h, children: /* @__PURE__ */ l("table", { className: qe.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: qe.head, children: t.map((w) => /* @__PURE__ */ n($m, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(Cm, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: o, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const Rm = "_list_v0s52_2", Tm = {
  list: Rm
};
function xm({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: Tm.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const Lm = "_label_1u62a_2", Am = {
  label: Lm
};
function GT({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: Am.label, children: t.header }) }, t.key)) }) });
}
const Em = "_stack_bp6a0_2", Im = {
  stack: Em
};
function UT({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Im.stack, "data-ward-action-stack": "", children: e });
}
const Mm = "_set_1z0sq_2", Bm = "_legend_1z0sq_7", jm = "_row_1z0sq_15", Pm = "_control_1z0sq_20", qm = "_input_1z0sq_26", Hm = "_label_1z0sq_31", Om = "_consequence_1z0sq_36", We = {
  set: Mm,
  legend: Bm,
  row: jm,
  control: Pm,
  input: qm,
  label: Hm,
  consequence: Om
};
function Za({ legend: e, options: t, value: a, onChange: r, disabled: o, name: i, describedBy: s, variant: c }) {
  const d = y(), u = i ?? d;
  return /* @__PURE__ */ l("fieldset", { className: We.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: We.legend, children: e }),
    t.map((h) => {
      const w = `${u}-${h.value}`, f = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ l("div", { className: We.row, children: [
        /* @__PURE__ */ l("span", { className: We.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: We.input,
              value: h.value,
              checked: a === h.value,
              disabled: o,
              "aria-describedby": rt(f, s),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: w, className: We.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: f, className: `${We.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Dm = "_root_11gpw_2", Fm = "_head_11gpw_10", zm = "_note_11gpw_29", Wm = "_index_11gpw_34", Km = "_dot_11gpw_38", Gm = "_counter_11gpw_49", Um = "_trailing_11gpw_57", Ke = {
  root: Dm,
  head: Fm,
  note: zm,
  index: Wm,
  dot: Km,
  counter: Gm,
  trailing: Um
};
function Vm({ index: e }) {
  return e ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ke.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ke.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ym({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ke.counter, "aria-hidden": "true", children: e }) : null;
}
function Qn({ title: e, index: t, note: a, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Ke.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Ke.head, children: [
      /* @__PURE__ */ n(Vm, { index: t }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ke.note, children: a }),
    /* @__PURE__ */ n(Ym, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ke.trailing, children: i })
  ] });
}
const Jm = "_strip_c3x3u_2", Qm = "_cell_c3x3u_7", Xm = "_value_c3x3u_12", Zm = "_link_c3x3u_29", ew = "_label_c3x3u_49", tw = "_tiles_c3x3u_101", De = {
  strip: Jm,
  cell: Qm,
  value: Xm,
  link: Zm,
  label: ew,
  tiles: tw
};
function er(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((o) => o.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const tr = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function nw({ cell: e }) {
  return /* @__PURE__ */ l("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: tr(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function aw({ cell: e, href: t }) {
  return /* @__PURE__ */ l("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: tr(e), title: e.hint, children: /* @__PURE__ */ l("a", { className: `${De.link} ward-stat-link`, href: A(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const nr = (e) => e.href === void 0 ? /* @__PURE__ */ n(nw, { cell: e }, e.label) : /* @__PURE__ */ n(aw, { cell: e, href: e.href }, e.label);
function zt({ cells: e, divided: t = !1 }) {
  return er("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${De.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(nr) });
}
const Xn = 6;
function VT({ cells: e }) {
  er("StatTiles", e, [1, 2 * Xn]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, Xn) };
  return /* @__PURE__ */ n("dl", { className: `${De.tiles} ward-stattiles`, style: t, children: e.map(nr) });
}
const rw = "_root_1eb1u_2", ow = "_track_1eb1u_8", lw = "_thumb_1eb1u_46", iw = "_labelHidden_1eb1u_64", sw = "_label_1eb1u_64", cw = "_lockedNote_1eb1u_84", Ge = {
  root: rw,
  track: ow,
  thumb: lw,
  labelHidden: iw,
  label: sw,
  lockedNote: cw
};
function dw(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function uw(e) {
  return e ? `${Ge.label} ${Ge.labelHidden}` : Ge.label;
}
function hw(e, t, a) {
  return e && !t && a ? a : void 0;
}
function mw(e, t, a, r) {
  return { "aria-describedby": Dt(rt(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function ww({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ve({ label: e, checked: t, onChange: a, disabled: r, locked: o, describedBy: i, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, w = Ae(), { on: f, off: N } = dw(t, r, o, w !== null), k = hw(N, w !== null, c);
  return /* @__PURE__ */ l("span", { className: `${Ge.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": f,
        "aria-label": e,
        "aria-labelledby": d,
        ...mw(h, i, w, k),
        className: `${Ge.track} ward-switch`,
        "data-on": f,
        "data-locked": o ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!f)),
        children: /* @__PURE__ */ n("span", { className: Ge.thumb })
      }
    ),
    /* @__PURE__ */ l("label", { id: d, htmlFor: u, className: uw(s), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ge.lockedNote, children: "always on" })
    ] }),
    /* @__PURE__ */ n(ww, { id: h, reason: k })
  ] });
}
const fw = "_bar_1vp69_2", _w = "_skip_1vp69_11", vw = "_mark_1vp69_22", bw = "_nav_1vp69_30", pw = "_list_1vp69_34", gw = "_select_1vp69_41", yw = "_selectTrigger_1vp69_45", Nw = "_dest_1vp69_52", kw = "_actor_1vp69_71", $w = "_actorMark_1vp69_84", Cw = "_actorLabel_1vp69_89", Sw = "_tagline_1vp69_108", se = {
  bar: fw,
  skip: _w,
  mark: vw,
  nav: bw,
  list: pw,
  select: gw,
  selectTrigger: yw,
  dest: Nw,
  actor: kw,
  actorMark: $w,
  actorLabel: Cw,
  tagline: Sw
};
function Rw(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function Tw(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function YT({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: o, onNavigate: i, skipTo: s = "main" }) {
  const c = Tw(r);
  return /* @__PURE__ */ l("header", { className: se.bar, children: [
    /* @__PURE__ */ n("a", { className: `${se.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: se.mark, children: e }),
    o && /* @__PURE__ */ n("span", { className: se.tagline, children: o }),
    /* @__PURE__ */ l("nav", { className: se.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: se.list, children: t.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${se.dest} ward-target`,
          href: A(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        qa,
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
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: Rw(c) })
    ] })
  ] });
}
const xw = "_tree_zzoob_2", Lw = "_item_zzoob_6", Aw = "_row_zzoob_10", Ew = "_button_zzoob_22", It = {
  tree: xw,
  item: Lw,
  row: Aw,
  button: Ew
}, ar = Ne(null);
function Iw({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Ht({ orientation: "vertical" });
  return /* @__PURE__ */ n(ar.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: It.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const Mw = { ArrowRight: !0, ArrowLeft: !1 };
function Zn(e) {
  return e ? !0 : void 0;
}
function Bw(e, t) {
  const a = Mw[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function jw(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function Pw(e) {
  const t = [It.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function qw(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Hw(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Ow(e) {
  return typeof e == "string" ? e : void 0;
}
function Dw({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Fw({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function rr(e) {
  const t = ye(ar);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = qw(e);
  return /* @__PURE__ */ l("li", { className: It.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Pw(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": Zn(e.unresolved),
        "data-inherited": Zn(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${It.button} ward-treeitem-btn`,
            onClick: () => jw(e),
            onKeyDown: (r) => Bw(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Hw(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Ow(e.label), children: e.label }),
              /* @__PURE__ */ n(Dw, { value: e.detail }),
              /* @__PURE__ */ n(Fw, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const zw = "_frame_gxspk_2", Ww = "_subjectRail_gxspk_22", Kw = "_subject_gxspk_22", Gw = "_rail_gxspk_42", Uw = "_record_gxspk_57", Vw = "_recordBody_gxspk_102", Yw = "_stageGrid_gxspk_157", Jw = "_band_gxspk_171", Qw = "_bandBody_gxspk_179", Xw = "_bandActions_gxspk_184", Zw = "_scroller_gxspk_192", ef = "_board_gxspk_219", tf = "_lanes_gxspk_228", nf = "_cardGrid_gxspk_262", ee = {
  frame: zw,
  subjectRail: Ww,
  subject: Kw,
  rail: Gw,
  record: Uw,
  recordBody: Vw,
  stageGrid: Yw,
  band: Jw,
  bandBody: Qw,
  bandActions: Xw,
  scroller: Zw,
  board: ef,
  lanes: tf,
  cardGrid: nf
};
function JT({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: ee.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function ea(e) {
  return e ? "true" : void 0;
}
function QT({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: ee.subjectRail, "data-ward-subject-rail": a, "data-ruled": ea(i), children: [
    /* @__PURE__ */ n("div", { className: ee.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ee.rail, "data-sticky": ea(o), "aria-label": r, children: t })
  ] });
}
function XT({ title: e, children: t, note: a, trailing: r, pad: o = "block", label: i, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(Qn, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ l("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(Qn, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: ee.recordBody, "data-pad": o, "data-measure": c, children: t })
  ] });
}
const af = "_form_1j8ub_2", rf = "_fields_1j8ub_9", of = "_actions_1j8ub_19", Jt = {
  form: af,
  fields: rf,
  actions: of
};
function ZT({ label: e, children: t, actions: a, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: Jt.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Jt.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: Jt.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function ex({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ l("section", { className: ee.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ee.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: ee.bandActions, children: t })
  ] });
}
const lf = "(max-width: 767.98px)";
function kn({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(vn, { className: ee.scroller, label: e, count: a ?? Jr.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function sf({ lanes: e, label: t, laneLabel: a }) {
  const [r, o] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ l("div", { className: ee.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(q, { kind: "select", label: a, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ n(kn, { label: t, children: i == null ? void 0 : i.content })
  ] });
}
function cf({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: ee.board, "data-ward-board": "", children: /* @__PURE__ */ n(kn, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(va, { children: a.content }, a.id)) }) });
}
function tx({ children: e, label: t = "Workflow board", lanes: a, laneLabel: r = "Column" }) {
  const o = ht(lf);
  return a === void 0 ? /* @__PURE__ */ n(kn, { label: t, children: e }) : o ? /* @__PURE__ */ n(sf, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(cf, { lanes: a, label: t });
}
function nx({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), i = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ n(vn, { className: ee.stageGrid, label: a, count: o, "data-ward-stage-grid": "", "data-floor": r, style: i, children: t });
}
function ax({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${ee.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const df = "_block_6tv5x_3", uf = "_sentence_6tv5x_10", hf = "_meta_6tv5x_19", mf = "_ways_6tv5x_24", wf = "_action_6tv5x_38", ff = "_strip_6tv5x_42", _f = "_loading_6tv5x_61", vf = "_label_6tv5x_69", bf = "_counter_6tv5x_76", _e = {
  block: df,
  sentence: uf,
  meta: hf,
  ways: mf,
  action: wf,
  strip: ff,
  loading: _f,
  label: vf,
  counter: bf
};
function pf({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function Wt({ sentence: e, action: t, children: a, role: r = "status", tone: o, kind: i, ask: s }) {
  return /* @__PURE__ */ l("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ l("p", { className: _e.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ l(x, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(pf, { action: t })
  ] });
}
function gf(e) {
  return /* @__PURE__ */ n(Wt, { ...e, kind: "ward-emptystate" });
}
function rx({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(Wt, { sentence: e, action: a, children: /* @__PURE__ */ l("p", { className: _e.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function yf({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${_e.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function ox({ ways: e, ...t }) {
  return /* @__PURE__ */ n(Wt, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(yf, { ways: e }) });
}
function lx({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(Wt, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ l("p", { className: _e.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function ix({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ l("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function sx({ queued: e, since: t }) {
  return /* @__PURE__ */ l("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function cx({ label: e, startedAt: t }) {
  const a = _(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = p(!1);
  S(() => {
    const s = window.setTimeout(() => o(!0), be.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = fn(a.current, r);
  return /* @__PURE__ */ l("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: _e.counter, children: mn(i) }) : null
  ] });
}
const Nf = "_note_cigdt_2", kf = {
  note: Nf
};
function $f({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ l("p", { className: kf.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const Cf = "_card_k7btg_3", Sf = "_hit_k7btg_31", Rf = "_head_k7btg_44", Tf = "_title_k7btg_51", xf = "_meta_k7btg_57", Lf = "_since_k7btg_66", Af = "_sep_k7btg_76", Ef = "_fields_k7btg_80", If = "_field_k7btg_80", Mf = "_last_k7btg_98", Bf = "_reason_k7btg_110", de = {
  card: Cf,
  hit: Sf,
  head: Rf,
  title: Tf,
  meta: xf,
  since: Lf,
  sep: Af,
  fields: Ef,
  field: If,
  last: Mf,
  reason: Bf
}, jf = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Pf(e, t, a) {
  const r = Ct(e, "blue"), o = Ct(e, "orange"), i = Ct(e, "green"), s = _(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: o, green: i };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = jf[d.type];
      u && c[u]();
    });
  }, [r, a, i, t, o]);
}
const qf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Hf(e, t) {
  return qf[t](e);
}
function Of({ item: e, connection: t }) {
  const a = /* @__PURE__ */ n("span", { className: de.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ l("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    a,
    /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep })
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
function Df({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ l("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function Ff({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function zf({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: de.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: de.field, children: Hf(e, a) }, a)) });
}
const sn = (e) => e ? !0 : void 0;
function Wf(e) {
  return { "--stream": ge(e.streamStep, "id") };
}
function Kf(e, t, a) {
  e == null || e(t, a);
}
function Gf(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Uf({ item: e, stale: t }) {
  var r, o;
  const a = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: de.last, "data-stale": sn(t), children: a }) : null;
}
function Kt(e) {
  const t = e.fields ?? [], a = e.item, r = _(null);
  Pf(r, a.key, e.feed);
  const o = Gf(e.feed), i = Wf(a);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: de.card,
      style: i,
      "data-selected": sn(e.selected),
      "data-flagged": sn(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: de.hit, onClick: (s) => Kf(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(Df, { item: a }),
        /* @__PURE__ */ n(at, { as: "p", className: de.title, text: a.title }),
        /* @__PURE__ */ n(Of, { item: a, connection: o }),
        /* @__PURE__ */ n(Ff, { reason: a.blockedReason }),
        /* @__PURE__ */ n(zf, { item: a, fields: t }),
        /* @__PURE__ */ n(Uf, { item: a, stale: o === "stale" })
      ]
    }
  );
}
const Vf = "_column_1j8bi_3", Yf = "_head_1j8bi_21", Jf = "_label_1j8bi_30", Qf = "_count_1j8bi_39", Xf = "_list_1j8bi_53", dt = {
  column: Vf,
  head: Yf,
  label: Jf,
  count: Qf,
  list: Xf
};
function or(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function Zf({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ l("div", { className: dt.head, children: [
    /* @__PURE__ */ n("h2", { className: dt.label, id: a, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ l("span", { className: dt.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function e_(e) {
  return /* @__PURE__ */ n("div", { className: dt.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      Kt,
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
function t_({ column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && t.length > e.cap, w = or(t, r);
  return /* @__PURE__ */ l("section", { className: dt.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Zf, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(e_, { column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n($f, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const n_ = "_foot_cs4jr_2", a_ = "_note_cs4jr_13", r_ = "_link_cs4jr_19", Qt = {
  foot: n_,
  note: a_,
  link: r_
};
function dx({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: Qt.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Qt.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Qt.link} ward-target`, href: A(e), children: "Configure board" })
  ] });
}
const o_ = "_head_1tfi5_3", l_ = "_identity_1tfi5_12", i_ = "_titleRow_1tfi5_18", s_ = "_title_1tfi5_18", c_ = "_key_1tfi5_35", d_ = "_rollup_1tfi5_45", u_ = "_tools_1tfi5_53", h_ = "_swatch_1tfi5_101", m_ = "_mark_1tfi5_108", Se = {
  head: o_,
  identity: l_,
  titleRow: i_,
  title: s_,
  key: c_,
  rollup: d_,
  tools: u_,
  swatch: h_,
  mark: m_
}, ta = "initials:";
function w_(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function f_(e) {
  const t = [w_(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function __(e) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ l("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    f_(e)
  ] });
}
function v_(e) {
  return e.startsWith(ta) ? e.slice(ta.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function b_({ markRef: e, streamStep: t }) {
  const a = { "--stream": ge(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Se.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: v_(e) }) : /* @__PURE__ */ n("span", { className: Se.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function p_({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function ux({
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
        /* @__PURE__ */ n(b_, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Se.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Se.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Se.rollup, "aria-live": "polite", children: __(t) })
    ] }),
    /* @__PURE__ */ l("div", { className: Se.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(p_, { owners: o, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Nn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const g_ = "_head_1sejb_14", y_ = "_line_1sejb_15", N_ = "_cHandle_1sejb_36", k_ = "_cName_1sejb_41", $_ = "_nameLine_1sejb_49", C_ = "_cLabel_1sejb_56", S_ = "_cCap_1sejb_61", R_ = "_cShown_1sejb_66", T_ = "_name_1sejb_49", x_ = "_noCap_1sejb_88", L_ = "_state_1sejb_102", A_ = "_handle_1sejb_111", E_ = "_sub_1sejb_137", O = {
  head: g_,
  line: y_,
  cHandle: N_,
  cName: k_,
  nameLine: $_,
  cLabel: C_,
  cCap: S_,
  cShown: R_,
  name: T_,
  noCap: x_,
  state: L_,
  handle: A_,
  sub: E_
}, I_ = "can't be hidden or collapsed", M_ = "terminal · counted, not a column", B_ = "A human gate is always shown, so people see what waits for them.", j_ = "A terminal stage is counted, not shown as a column.";
function hx() {
  return /* @__PURE__ */ l("div", { className: O.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: O.cHandle }),
    /* @__PURE__ */ n("span", { className: O.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: O.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: O.cShown, children: "Shown" })
  ] });
}
function P_(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function q_(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function na(e) {
  return e.gate ? I_ : e.terminal ? M_ : q_(e.agentsMounted);
}
function H_(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function O_({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: O.cName, children: [
    /* @__PURE__ */ l("span", { className: O.nameLine, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    na(e) && /* @__PURE__ */ n("span", { className: O.sub, children: na(e) })
  ] });
}
function D_(e) {
  return e === void 0 ? "" : String(e);
}
function F_(e) {
  return e === "" ? void 0 : Number(e);
}
function z_({ name: e, onReorder: t }) {
  const a = Ae();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ n("span", { className: O.cHandle }) : /* @__PURE__ */ n("span", { className: O.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: O.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && H_(r, t),
      children: "⠿"
    }
  ) });
}
function W_({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${O.cCap} ${O.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: O.cCap, children: /* @__PURE__ */ n(q, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: D_(t.cap), onChange: (r) => a({ ...t, cap: F_(r) }) }) });
}
function K_(e) {
  return e.gate ? B_ : e.terminal ? j_ : void 0;
}
function G_({ stage: e, config: t, onChange: a }) {
  const r = Ae() !== null, o = P_(e, t.shown), i = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ l("span", { className: O.cShown, children: [
    /* @__PURE__ */ n(Ve, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, disabledReason: K_(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: O.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!o.shown), children: o.state })
  ] });
}
function U_(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function mx({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: O.line, "data-kind": U_(e), children: [
    /* @__PURE__ */ n(z_, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(O_, { stage: e }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: /* @__PURE__ */ n(q, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (o) => a({ ...t, label: o }) }) }),
    /* @__PURE__ */ n(W_, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(G_, { stage: e, config: t, onChange: a })
  ] });
}
const V_ = "_body_8qsv9_2", Y_ = "_head_8qsv9_9", J_ = "_summary_8qsv9_19", Q_ = "_block_8qsv9_20", X_ = "_actionsBlock_8qsv9_21", Z_ = "_title_8qsv9_41", ev = "_note_8qsv9_46", tv = "_k_8qsv9_51", nv = "_kv_8qsv9_58", av = "_row_8qsv9_64", rv = "_label_8qsv9_75", ov = "_value_8qsv9_84", lv = "_quote_8qsv9_90", iv = "_actions_8qsv9_21", sv = "_resolve_8qsv9_111", F = {
  body: V_,
  head: Y_,
  summary: J_,
  block: Q_,
  actionsBlock: X_,
  title: Z_,
  note: ev,
  k: tv,
  kv: nv,
  row: av,
  label: rv,
  value: ov,
  quote: lv,
  actions: iv,
  resolve: sv
};
function cv(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function dv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function uv(e) {
  const t = _t(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function hv(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function mv(e, t, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Ft(uv(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...cv(e),
    ...hv(a),
    ...dv(e, t)
  ];
}
function wv({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: F.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: F.k, children: t }),
    e
  ] });
}
function fv(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function _v({ item: e, showKey: t }) {
  const a = fv(e);
  return !t && !a ? null : /* @__PURE__ */ l("div", { className: F.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function vv({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: F.block, children: [
    /* @__PURE__ */ n("p", { className: F.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: F.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: F.note, children: e.agentMeta })
  ] }) : null;
}
function wx({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: o, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), w = mv(e, o, d);
  return /* @__PURE__ */ n(ot, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: F.body, children: [
    /* @__PURE__ */ n(_v, { item: e, showKey: u }),
    /* @__PURE__ */ l("div", { className: F.summary, children: [
      /* @__PURE__ */ n("h2", { className: F.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: F.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: F.kv, children: w.map(([f, N, k]) => /* @__PURE__ */ l("div", { className: F.row, children: [
      /* @__PURE__ */ n("dt", { className: F.label, children: f }),
      /* @__PURE__ */ n("dd", { className: F.value, children: N })
    ] }, k ?? f)) }),
    /* @__PURE__ */ n(vv, { item: e }),
    /* @__PURE__ */ l("div", { className: F.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: F.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: F.note, children: c })
    ] }),
    /* @__PURE__ */ n(wv, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const bv = "_root_3azmy_2", pv = "_list_3azmy_7", gv = "_item_3azmy_12", yv = "_box_3azmy_18", Nv = "_text_3azmy_23", kv = "_note_3azmy_28", Je = {
  root: bv,
  list: pv,
  item: gv,
  box: yv,
  text: Nv,
  note: kv
};
function Gt({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ l("div", { className: Je.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${Je.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${Je.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Je.box, children: /* @__PURE__ */ n(yn, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Je.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${Je.note} ward-checklist-note`, children: t })
  ] });
}
const $v = "_rail_znbbp_2", Cv = "_k_znbbp_11", Sv = "_head_znbbp_19", Rv = "_section_znbbp_25", Tv = "_card_znbbp_39", xv = "_strip_znbbp_46", Lv = "_skeleton_znbbp_60", Av = "_skeletonLabel_znbbp_74", Ev = "_bar_znbbp_80", Iv = "_note_znbbp_89", fe = {
  rail: $v,
  k: Cv,
  head: Sv,
  section: Rv,
  card: Tv,
  strip: xv,
  skeleton: Lv,
  skeletonLabel: Av,
  bar: Ev,
  note: Iv
};
function Mv(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Xt({ title: e, children: t }) {
  return /* @__PURE__ */ l("section", { className: fe.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: fe.k, children: e }),
    t
  ] });
}
function Bv({ column: e, count: t }) {
  return /* @__PURE__ */ l("div", { className: fe.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: fe.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: fe.bar, "aria-hidden": "true" }, r))
  ] });
}
function jv({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(t_, { column: o, items: t.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, o.id));
}
function Pv(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(jv, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(Bv, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function fx(e) {
  const t = Mv(e.onOpen), a = or(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: fe.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${fe.k} ${fe.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Xt, { title: "Card", children: /* @__PURE__ */ n("div", { className: fe.card, children: a && /* @__PURE__ */ n(Kt, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ l(Xt, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: fe.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Pv, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Xt, { title: "Effect of this config", children: /* @__PURE__ */ n(Gt, { items: e.effects, density: "compact" }) })
  ] });
}
function qv(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function Hv(e) {
  return Math.ceil(e.length / 2);
}
function Ov(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function lr(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Dv(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const o = lr(e);
  o !== void 0 && a(o), r(Ov(e.type));
}
function Fv(e, t, a, r, o) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (i) => Dv(i, a, r, o));
  }, [e, t, a, r, o]);
}
function zv(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Wv(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Kv(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Gv(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(Hv(t ?? [])) + ")"
  };
}
function Uv(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Vv(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: le(e.cost) }) : null;
}
function Yv(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Jv(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function Qv(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function Xv(e, t) {
  return t === void 0 ? e : qv(e, t.ref);
}
function Zv(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function mt(e) {
  return e === !0 ? "true" : void 0;
}
function ir(e) {
  const t = e.item, a = t.run, r = a !== void 0, o = _(null), i = Ct(o), s = _(/* @__PURE__ */ new Set()), [c, d] = p(zv(t));
  Fv(e.feed, t.key, s, d, i);
  const u = Wv(t, r), h = Kv(t, a), w = Gv(t, e.fields), f = Qv(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...Zv(e),
      className: "ward-workcard",
      "data-flagged": mt(t.flagged),
      "data-selected": mt(e.selected),
      style: w,
      ref: Xv(o, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        Uv(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          Vv(t, e.fields),
          Yv(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          Jv(a, c, e.connection, t.changedAt),
          f !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function eb({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function tb(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function nb(e, t, a) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function ab(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(eb, { count: e.items.length, cap: e.column.cap });
}
function rb(e, t) {
  return e.roving ?? t;
}
function ob(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function lb(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    ir,
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
function ib(e) {
  const t = y(), a = Ht({ orientation: "vertical" }), r = rb(e, a), o = tb(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": mt(o), "data-gate": mt(e.column.gate), children: [
    nb(e.column, e.items.length, t),
    ab(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...ob(e, a), children: lb(e, r) })
  ] });
}
function sb(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function cb(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function db(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function _x(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: sb(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      cb(e),
      db(e.onConfigure),
      /* @__PURE__ */ n(Nn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function ub(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function hb(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ve, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ve, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function mb(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(x, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function vx(e) {
  const t = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": mt(ub(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: hb(e) }),
    /* @__PURE__ */ n(q, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(La, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    mb(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function bx(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(ir, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(ib, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function wb(e, t) {
  const a = lr(e);
  a !== void 0 && t(a);
}
function fb(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => wb(r, a));
  }, [e, t, a]);
}
function _b(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function vb(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function bb(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function pb(e, t) {
  return /* @__PURE__ */ l(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function px(e) {
  var s;
  const t = e.item, a = t.run, [r, o] = p((s = t.run) == null ? void 0 : s.lastStep);
  fb(e.feed, t.key, o);
  const i = [..._b(t), ...vb(t)];
  return /* @__PURE__ */ l(ot, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      bb(a, r)
    ] }),
    pb(t, e.actions)
  ] });
}
const gb = "_card_1nkkx_3", yb = "_head_1nkkx_30", Nb = "_mark_1nkkx_38", kb = "_name_1nkkx_50", $b = "_chips_1nkkx_71", Cb = "_description_1nkkx_77", Sb = "_run_1nkkx_82", Rb = "_sep_1nkkx_91", Tb = "_facts_1nkkx_97", xb = "_fact_1nkkx_97", Lb = "_factLabel_1nkkx_111", Ab = "_factValue_1nkkx_115", ie = {
  card: gb,
  head: yb,
  mark: Nb,
  name: kb,
  chips: $b,
  description: Cb,
  run: Sb,
  sep: Rb,
  facts: Tb,
  fact: xb,
  factLabel: Lb,
  factValue: Ab
}, Eb = { live: "done", draft: "running", paused: "meta" };
function Ib(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function Mb({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: Eb[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function Bb({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function jb({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function Pb({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ l("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function qb(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Hb({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: o, facts: i, className: s }) {
  const c = { "--stream": ge(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": d,
      className: Ib(s),
      style: c,
      "data-selected": d,
      "data-paused": qb(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ l("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: A(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(Bb, { description: e.description }),
        /* @__PURE__ */ n(jb, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Mb, { versions: e.versions }),
        /* @__PURE__ */ n(Pb, { facts: i })
      ]
    }
  );
}
const Ob = "_list_4dcyc_2", Db = "_row_4dcyc_11", Fb = "_head_4dcyc_23", zb = "_id_4dcyc_30", Wb = "_lock_4dcyc_35", Kb = "_reason_4dcyc_41", Gb = "_remove_4dcyc_46", Ub = "_clauses_4dcyc_50", Vb = "_clause_4dcyc_50", Yb = "_label_4dcyc_64", Jb = "_cell_4dcyc_71", Qb = "_value_4dcyc_76", ce = {
  list: Ob,
  row: Db,
  head: Fb,
  id: zb,
  lock: Wb,
  reason: Kb,
  remove: Gb,
  clauses: Ub,
  clause: Vb,
  label: Yb,
  cell: Jb,
  value: Qb
}, sr = Ne(!1);
function gx({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(sr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function Xb({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(q, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => a(e.key, o) });
}
function Zb({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function ep({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ l("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Zb, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function aa(e, t) {
  return e.locked ? void 0 : t;
}
function yx({ rule: e, onChange: t, onRemove: a }) {
  if (!ye(sr)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = aa(e, t);
  return /* @__PURE__ */ l("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(ep, { rule: e, onRemove: aa(e, a) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(Xb, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const tp = "_ladder_1xdeh_2", np = "_cell_1xdeh_7", ap = "_empty_1xdeh_26", rp = "_name_1xdeh_34", op = "_holder_1xdeh_40", lp = "_request_1xdeh_46", ip = "_swatches_1xdeh_51", sp = "_swatch_1xdeh_51", cp = "_tilesFrame_1xdeh_78", dp = "_tiles_1xdeh_78", up = "_tile_1xdeh_78", hp = "_bar_1xdeh_117", mp = "_hex_1xdeh_128", wp = "_note_1xdeh_138", B = {
  ladder: tp,
  cell: np,
  empty: ap,
  name: rp,
  holder: op,
  request: lp,
  swatches: ip,
  swatch: sp,
  tilesFrame: cp,
  tiles: dp,
  tile: up,
  bar: hp,
  hex: mp,
  note: wp
}, Nx = "not validated yet, pending a CVD matrix and dark stepping";
function fp(e) {
  return e.reserved ? "reserved" : wt(e.step) ? "validated" : "partial";
}
function cr(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function _p(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function vp({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Fe, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${B.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function bp(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function pp(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const ra = (e) => String(e).padStart(2, "0");
function gp(e, t, a) {
  return e === "reserved" ? "Reserved until revalidated" : a ? "yours" : t ?? cr(e, void 0);
}
function yp({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${B.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.hex} ward-ladder-hex`, children: r ? `step ${ra(e)}` : bo(e) }),
    /* @__PURE__ */ n("span", { className: `${B.note} ward-ladder-note`, children: r ? a : `Step ${ra(e)} · ${a}` })
  ] });
}
function Np({ step: e, value: t, taken: a, onChange: r, presentation: o, disabled: i }) {
  const s = fp(e), c = cr(s, a), d = c !== "free", u = d || i, h = t === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, N = `${w} · ${o === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...pp(d, h, u), "data-validation": s, style: _p(e, s), onClick: f, onKeyDown: (E) => bp(E, f) }, label: N, name: w, holder: c, validation: s, note: gp(s, a, h), step: e.step };
}
const kp = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${B.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${B.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(yp, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${B.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(vp, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${B.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${B.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function $p(e) {
  return kp[e.presentation](Np(e));
}
function Cp(e) {
  for (const t of e)
    if (!t.reserved && !Ot(t.step)) throw new Error("colour ladder renders token steps only");
}
function Sp() {
  return /* @__PURE__ */ l("div", { className: `${B.cell} ward-ladder-cell ${B.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${B.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${B.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Rp(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Tp = { list: B.ladder, swatches: B.swatches, tiles: B.tilesFrame };
function xp() {
  return /* @__PURE__ */ l("div", { className: `${B.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${B.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${B.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Lp = { list: Sp, swatches: () => null, tiles: xp };
function Ap(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function dr(e) {
  const t = e.takenBy ?? {}, a = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Cp(e.steps);
  const r = Rp(e), o = Lp[r], i = /* @__PURE__ */ l(x, { children: [
    e.steps.map((s) => /* @__PURE__ */ n($p, { step: s, value: e.value, taken: t[s.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Ap(e.disabled === !0), className: `${Tp[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: B.tiles, children: i }) : i });
}
const Ep = "_rail_s06lm_2", Ip = "_section_s06lm_12", Mp = "_sectionFlush_s06lm_22", Bp = "_head_s06lm_26", jp = "_headLabel_s06lm_34", Pp = "_sample_s06lm_42", qp = "_sampleLabel_s06lm_47", Hp = "_sampleTitle_s06lm_54", Op = "_sampleMeta_s06lm_59", Dp = "_trace_s06lm_65", Fp = "_traceHead_s06lm_70", zp = "_steps_s06lm_78", Wp = "_step_s06lm_78", Kp = "_stepTitle_s06lm_97", Gp = "_hollow_s06lm_107", Up = "_stepBody_s06lm_115", Vp = "_stepDetail_s06lm_127", Yp = "_publish_s06lm_132", Jp = "_reason_s06lm_138", Qp = "_note_s06lm_143", Xp = "_reveal_s06lm_148", $ = {
  rail: Ep,
  section: Ip,
  sectionFlush: Mp,
  head: Bp,
  headLabel: jp,
  sample: Pp,
  sampleLabel: qp,
  sampleTitle: Hp,
  sampleMeta: Op,
  trace: Dp,
  traceHead: Fp,
  steps: zp,
  step: Wp,
  stepTitle: Kp,
  hollow: Gp,
  stepBody: Up,
  stepDetail: Vp,
  publish: Yp,
  reason: Jp,
  note: Qp,
  reveal: Xp
}, oa = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Zp = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, eg = { ok: "greenFill", finding: "orangeFill", action: "blue" }, tg = { notSimulated: "not simulated", running: "running" };
function ng(e) {
  return e.presentation === "foundry";
}
function ag(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const a = t.filter((r) => !r.met);
  return a.length > 0 ? `Publish is disabled: ${a.length} of ${t.length} gate conditions unmet: ${a[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function rg(e, t) {
  var r;
  const a = Zp[e.status];
  return a !== void 0 ? a : ((r = t.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function og(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function lg(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function ig(e) {
  if (og(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function sg(e) {
  const [t, a] = p(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function cg(e) {
  const t = tg[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(Fe, { size: 6, kind: eg[e.kind], label: e.kind });
}
function dg(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function ug(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function hg(e) {
  const { step: t } = e;
  return /* @__PURE__ */ l(sg, { kind: t.kind, children: [
    /* @__PURE__ */ n(cg, { kind: t.kind }),
    /* @__PURE__ */ l("span", { className: $.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: $.stepTitle, children: t.title }),
      /* @__PURE__ */ n(dg, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(ug, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function mg(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(ue(t)), a.join(" · ");
}
function ur(e) {
  const t = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.traceHead, id: t, children: mg(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: $.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(hg, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function wg(e) {
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
function fg(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function _g(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? pa(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(zt, { divided: !0, cells: t }) });
}
function vg(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: pa(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function bg(e) {
  const t = vg(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ l("p", { className: $.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(zt, { divided: !0, cells: t }) });
}
function hr(e) {
  const t = y();
  return e.reason !== null ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: `${$.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function pg(e) {
  return /* @__PURE__ */ l("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ n(hr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: $.note, children: e.note })
  ] });
}
function gg(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ n(hr, { reason: e.reason, onPublish: e.onPublish }) });
}
function mr(e) {
  return /* @__PURE__ */ l("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: oa[e.run.status].role, label: oa[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function yg(e, t) {
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
function Ng(e) {
  var a;
  lg(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(mr, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(wg, { sample: e.run.sample }),
    /* @__PURE__ */ n(ur, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(_g, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Gt, { items: e.checklist }) }),
    /* @__PURE__ */ n(pg, { reason: ag(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function kg(e) {
  var r;
  const t = yg(e.run, e.feed);
  ig(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(mr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(fg, { sample: e.run.sample }),
    /* @__PURE__ */ n(ur, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(bg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Gt, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(gg, { reason: rg(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function kx(e) {
  return ng(e) ? /* @__PURE__ */ n(kg, { ...e }) : /* @__PURE__ */ n(Ng, { ...e });
}
const $g = "_list_142ip_3", Cg = "_row_142ip_9", Sg = "_condition_142ip_18", Rg = "_action_142ip_24", Rt = {
  list: $g,
  row: Cg,
  condition: Sg,
  action: Rg
}, wr = Ne(!1);
function $x({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(wr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: Rt.list, "aria-label": t, children: e }) });
}
function Cx({ rule: e }) {
  if (!ye(wr)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: Rt.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: Rt.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: Rt.action, children: e.then })
  ] });
}
const Tg = "_move_tmppt_3", xg = {
  move: Tg
};
function cn(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [o] = r.splice(t, 1);
  return r.splice(a, 0, o), r;
}
function fr(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function _r(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function la(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function Lg(e) {
  return e === "up" ? "down" : "up";
}
function Ag(e, t) {
  const a = la(e, t.id, t.direction) ?? la(e, t.id, Lg(t.direction));
  a == null || a.focus();
}
function vr() {
  const e = _(null), [t, a] = p(null), [r, o] = p("");
  return S(() => {
    e.current !== null && t !== null && Ag(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), o(c);
  } };
}
function br({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Mt({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${xg.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const Eg = "_body_1jd1i_2", Ig = "_title_1jd1i_8", Mg = "_section_1jd1i_13", Bg = "_legend_1jd1i_18", jg = "_stages_1jd1i_26", Pg = "_stage_1jd1i_26", qg = "_stageIndex_1jd1i_44", Hg = "_stageName_1jd1i_50", Og = "_footer_1jd1i_59", Dg = "_note_1jd1i_66", Fg = "_reason_1jd1i_71", zg = "_actions_1jd1i_76", Wg = "_webHead_1jd1i_83", Kg = "_kicker_1jd1i_92", Gg = "_webTitle_1jd1i_99", Ug = "_webBody_1jd1i_105", Vg = "_webSection_1jd1i_109", Yg = "_sectionHead_1jd1i_121", Jg = "_sectionNote_1jd1i_129", Qg = "_formLabel_1jd1i_134", Xg = "_identityRow_1jd1i_139", Zg = "_nameCell_1jd1i_145", ey = "_keyCell_1jd1i_150", ty = "_colourCell_1jd1i_154", ny = "_colourStatus_1jd1i_161", ay = "_webStages_1jd1i_166", ry = "_webStageList_1jd1i_172", oy = "_webStage_1jd1i_166", ly = "_webIndex_1jd1i_191", iy = "_webStageName_1jd1i_196", sy = "_webMoves_1jd1i_201", cy = "_addStage_1jd1i_215", dy = "_addStageButton_1jd1i_223", uy = "_addStageNote_1jd1i_231", hy = "_webFooter_1jd1i_236", my = "_webFooterNotes_1jd1i_244", wy = "_webNote_1jd1i_251", v = {
  body: Eg,
  title: Ig,
  section: Mg,
  legend: Bg,
  stages: jg,
  stage: Pg,
  stageIndex: qg,
  stageName: Hg,
  footer: Og,
  note: Dg,
  reason: Fg,
  actions: zg,
  webHead: Wg,
  kicker: Kg,
  webTitle: Gg,
  webBody: Ug,
  webSection: Vg,
  sectionHead: Yg,
  sectionNote: Jg,
  formLabel: Qg,
  identityRow: Xg,
  nameCell: Zg,
  keyCell: ey,
  colourCell: ty,
  colourStatus: ny,
  webStages: ay,
  webStageList: ry,
  webStage: oy,
  webIndex: ly,
  webStageName: iy,
  webMoves: sy,
  addStage: cy,
  addStageButton: dy,
  addStageNote: uy,
  webFooter: hy,
  webFooterNotes: my,
  webNote: wy
}, fy = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], pr = "not in catalogue";
function _y(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${pr}` }, ...a];
}
function vy({ stage: e, index: t, catalogue: a, onName: r }) {
  const o = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(q, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${pr}`;
  return /* @__PURE__ */ n(q, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: _y(a, e.name), invalid: i, onChange: r });
}
function gr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function by(e) {
  const t = _([]), a = _(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function py({ id: e, stage: t, index: a, total: r, catalogue: o, onReplace: i, onMove: s }) {
  const c = gr(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: v.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: v.webStageName, children: /* @__PURE__ */ n(vy, { stage: t, index: a, catalogue: o, onName: (u) => i({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(q, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: fy, onChange: (u) => i({ ...t, kind: u }) }),
    /* @__PURE__ */ l("span", { className: v.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(Mt, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(Mt, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function gy({ stages: e, onChange: t, catalogue: a }) {
  const r = by(e.length), o = vr(), i = (c, d) => {
    const u = fr(c, d);
    r.current = cn(r.current, c, u), o.moved({ id: r.current[u], direction: d }, _r(gr(e[c], c), u, e.length)), t(cn(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ l("div", { className: v.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(py, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(br, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: v.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const yy = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Ny = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], ky = "A new stream starts as a draft. Nothing runs on it until you publish it.", $y = "Create is disabled: name the stream and give it a key first.", Cy = "reorder with the ↑ ↓ buttons · min 2";
function $n(e, t) {
  return !e.reserved && wt(e.step) && t[e.step] === void 0;
}
function Sy(e, t) {
  const a = e.find((r) => $n(r, t));
  return a ? a.step : 1;
}
function Ry({ stages: e, onMove: t }) {
  const a = vr(), r = (o, i) => {
    const s = fr(o, i);
    a.moved({ id: e[o].id, direction: i }, _r(e[o].name, s, e.length)), t(o, s);
  };
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: v.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: v.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: v.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(Mt, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(Mt, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(br, { text: a.announcement })
  ] });
}
function Ty({ reason: e, onCreate: t, onDraft: a }) {
  const r = y();
  return /* @__PURE__ */ l("div", { className: v.footer, children: [
    /* @__PURE__ */ n("p", { className: v.note, children: ky }),
    e && /* @__PURE__ */ n("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: v.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function xy(e, t) {
  return e !== "" && t !== "" ? null : $y;
}
function Ly(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: o = Ny, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = y(), [h, w] = p(""), [f, N] = p(""), [k, E] = p(t[0].value), [H, me] = p(() => Sy(a, r)), [re, Ee] = p(e.stages ?? yy), [Ye, T] = p(o[0].value), J = { name: h, key: f, streamStep: H, owner: k, stages: re, policy: Ye }, ke = xy(h, f);
  return /* @__PURE__ */ n(ot, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ l("div", { className: v.body, children: [
    /* @__PURE__ */ n("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ n(q, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ n(q, { kind: "input", label: "Key", value: f, onChange: N, mono: !0 }),
      /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: k, onChange: E, options: t })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ n(dr, { label: "Stream colour", steps: a, value: H, onChange: me, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ n(Ry, { stages: re, onMove: (ze, Vr) => Ee(cn(re, ze, Vr)) })
    ] }),
    /* @__PURE__ */ n(Za, { legend: "Loop policy", options: o, value: Ye, onChange: T }),
    /* @__PURE__ */ n(Ty, { reason: ke, onCreate: () => i(J), onDraft: () => s(J) })
  ] }) });
}
const yr = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Ay = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Ey(e, t, a, r, o, i) {
  var c;
  const s = ((c = yr.find((d) => d.value === o)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: i };
}
function Iy(e, t) {
  return My(e) && By(e, t) && jy(e);
}
function My(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function By(e, t) {
  return e.colourStep === null || $n({ step: e.colourStep }, t);
}
function jy(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function Py(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : $n({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function qy({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function Hy({ ready: e, draft: t, agentStage: a, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: v.webFooter, children: [
    /* @__PURE__ */ l("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ n(qy, { stage: a }),
      !e && /* @__PURE__ */ n("p", { id: i, className: v.reason, children: Ay })
    ] }),
    o && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => o(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Oy({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: v.webHead, children: [
    /* @__PURE__ */ n("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function Dy({ name: e, setName: t, streamKey: a, setKey: r, colour: o, owner: i }) {
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
function Fy(e) {
  const t = y(), a = y(), r = e.takenBy ?? {}, [o, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [f, N] = p("relay"), [k, E] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), H = Ey(o, s, d, h, f, k), me = Iy(H, r), re = k.find((T) => T.kind === "agent" && T.name.trim() !== ""), Ee = /* @__PURE__ */ l("div", { className: v.colourCell, children: [
    /* @__PURE__ */ n("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(dr, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ye = /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: v.colourStatus, "data-colour-status": "", children: Py(h, r) }),
    /* @__PURE__ */ n(q, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((T) => ({ value: T, label: T })), onChange: u })
  ] });
  return /* @__PURE__ */ l(ot, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Oy, { titleId: a }),
    /* @__PURE__ */ l("div", { className: v.webBody, children: [
      /* @__PURE__ */ n(Dy, { name: o, setName: i, streamKey: s, setKey: c, colour: Ee, owner: Ye }),
      e.fields && /* @__PURE__ */ n("section", { className: v.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ l("section", { className: v.webSection, children: [
        /* @__PURE__ */ l("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: v.sectionNote, children: Cy })
        ] }),
        /* @__PURE__ */ n(gy, { stages: k, onChange: E })
      ] }),
      /* @__PURE__ */ n("section", { className: v.webSection, children: /* @__PURE__ */ n(Za, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: yr, onChange: N }) }),
      /* @__PURE__ */ n(Hy, { ready: me, draft: H, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function Sx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Fy, { ...e }) : /* @__PURE__ */ n(Ly, { ...e });
}
const zy = "_row_bs8hc_2", Wy = "_cell_bs8hc_6", Ky = "_condition_bs8hc_11", Gy = "_action_bs8hc_18", Uy = "_contract_bs8hc_24", Vy = "_contractCondition_bs8hc_33", Yy = "_contractAction_bs8hc_39", ne = {
  row: zy,
  cell: Wy,
  condition: Ky,
  action: Gy,
  contract: Uy,
  contractCondition: Vy,
  contractAction: Yy
}, Nr = ["advance", "block", "escalate", "requestReview"], ia = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Bt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Cn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ne.action, children: ia[e.then] }) : /* @__PURE__ */ n(
    q,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => t({ ...e, then: o }),
      options: Nr.map((o) => ({ value: o, label: ia[o] }))
    }
  );
}
function Jy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n("span", { className: ne.condition, title: Bt(e, r), children: Bt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: Cn(e, t, a) })
  ] });
}
function Qy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ l("td", { className: ne.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ne.condition, children: Bt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: Cn(e, t, a) })
  ] });
}
function Xy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: ne.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ne.contractCondition, children: Bt(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ne.contractAction, children: Cn(e, t, a, !0) })
  ] });
}
const Zy = { two: Qy, four: Jy, contract: Xy };
function Rx(e) {
  var a;
  if (!Nr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = Zy[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const eN = "_column_g1uat_2", tN = "_head_g1uat_17", nN = "_index_g1uat_23", aN = "_name_g1uat_29", rN = "_meta_g1uat_38", oN = "_mono_g1uat_43", lN = "_gate_g1uat_50", iN = "_reviewersLabel_g1uat_57", sN = "_reviewers_g1uat_57", cN = "_reviewer_g1uat_57", dN = "_agents_g1uat_74", uN = "_workflowColumn_g1uat_79", hN = "_workflowHead_g1uat_96", mN = "_stageRow_g1uat_102", wN = "_stageLabel_g1uat_109", fN = "_workflowTitle_g1uat_116", _N = "_workflowMeta_g1uat_122", vN = "_workflowGate_g1uat_127", bN = "_gateNote_g1uat_135", pN = "_cardNote_g1uat_140", gN = "_reviewerList_g1uat_145", yN = "_reviewerRow_g1uat_151", NN = "_reviewerMark_g1uat_157", kN = "_reviewerName_g1uat_167", $N = "_terminalCard_g1uat_173", CN = "_terminalCount_g1uat_182", SN = "_workflowAgents_g1uat_188", RN = "_mount_g1uat_194", R = {
  column: eN,
  head: tN,
  index: nN,
  name: aN,
  meta: rN,
  mono: oN,
  gate: lN,
  reviewersLabel: iN,
  reviewers: sN,
  reviewer: cN,
  agents: dN,
  workflowColumn: uN,
  workflowHead: hN,
  stageRow: mN,
  stageLabel: wN,
  workflowTitle: fN,
  workflowMeta: _N,
  workflowGate: vN,
  gateNote: bN,
  cardNote: pN,
  reviewerList: gN,
  reviewerRow: yN,
  reviewerMark: NN,
  reviewerName: kN,
  terminalCard: $N,
  terminalCount: CN,
  workflowAgents: SN,
  mount: RN
}, TN = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function Sn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function kr(e) {
  return `${Math.round(e * 100)}%`;
}
function xN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(zt, { cells: [
      { value: kr(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function LN({ stage: e }) {
  return /* @__PURE__ */ n(zt, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: Sn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function AN({ stage: e, titleId: t }) {
  return /* @__PURE__ */ l("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: TN[e.kind] })
  ] });
}
function EN({ stage: e }) {
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
function IN({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(xN, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(LN, { stage: e }) : null;
}
function MN({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function BN({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const o = y(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: R.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(AN, { stage: e, titleId: o }),
    /* @__PURE__ */ n(EN, { stage: e }),
    /* @__PURE__ */ n(IN, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(Hb, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(MN, { onMount: a })
  ] });
}
const jN = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function PN({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ l("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function qN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: R.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ n(PN, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: kr(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function HN(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function ON({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: Sn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: HN(e.rolledBackThisWeek) })
  ] });
}
function DN(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function FN(e) {
  if (e.kind === "terminal") return `${Sn(e.closedThisWeek)} this week`;
  const t = DN(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function zN({ stage: e, titleId: t }) {
  const a = jN[e.kind];
  return /* @__PURE__ */ l("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: R.stageRow, children: [
      /* @__PURE__ */ l("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: FN(e) })
  ] });
}
function WN(e) {
  return e === "entry" || e === "agent";
}
function KN({ stage: e, onMount: t }) {
  return t === void 0 || !WN(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Mount agent" });
}
function GN({ stage: e, agentCards: t, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ l("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(zN, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(qN, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(ON, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(KN, { stage: e, onMount: a })
  ] });
}
function UN(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function Tx(e) {
  return UN(e) ? /* @__PURE__ */ n(GN, { ...e }) : /* @__PURE__ */ n(BN, { ...e });
}
const VN = "_row_1tdra_6", YN = "_name_1tdra_12", JN = "_compactRow_1tdra_13", QN = "_compactName_1tdra_13", XN = "_cell_1tdra_30", ZN = "_chain_1tdra_45", e1 = "_owner_1tdra_51", t1 = "_mono_1tdra_57", n1 = "_compactCell_1tdra_79", a1 = "_stack_1tdra_96", r1 = "_stat_1tdra_103", o1 = "_identityLine_1tdra_110", l1 = "_identity_1tdra_110", i1 = "_ownerLine_1tdra_140", s1 = "_link_1tdra_160", c1 = "_gateMark_1tdra_166", d1 = "_emptyChain_1tdra_171", u1 = "_arrow_1tdra_177", h1 = "_muted_1tdra_182", m1 = "_define_1tdra_187", w1 = "_statValue_1tdra_194", f1 = "_policyId_1tdra_200", _1 = "_sub_1tdra_205", g = {
  row: VN,
  name: YN,
  compactRow: JN,
  compactName: QN,
  cell: XN,
  chain: ZN,
  owner: e1,
  mono: t1,
  compactCell: n1,
  stack: a1,
  stat: r1,
  identityLine: o1,
  identity: l1,
  ownerLine: i1,
  link: s1,
  gateMark: c1,
  emptyChain: d1,
  arrow: u1,
  muted: h1,
  define: m1,
  statValue: w1,
  policyId: f1,
  sub: _1
};
function $r(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function v1(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function b1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Cr(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function p1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Cr(e.members)}`;
}
function g1(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ l("span", { className: g.stack, children: [
    /* @__PURE__ */ l("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: A(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: p1(e) })
  ] }) });
}
function Sr({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ l(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function y1(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = _t(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function N1({ stages: e, streamStep: t }) {
  const a = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((o, i) => /* @__PURE__ */ l("span", { className: g.link, children: [
    /* @__PURE__ */ n(Sr, { name: o.name, gate: o.gate === !0, look: y1(i, a, t), size: "tag" }),
    i === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${i}`)) });
}
function k1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ l("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : N1(e) });
}
function Rr(e) {
  return e === void 0 ? void 0 : !0;
}
function sa(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Rr(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function $1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function C1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function S1({ stream: e, href: t, presentation: a }) {
  const r = b1(a.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, onClick: $r, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ge(e.streamStep, "chip") }, children: [
    g1(e, t),
    k1(e),
    sa(C1(e.agents), e.agents === void 0 ? void 0 : v1(e.agents), "—"),
    $1(e.policy),
    sa(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function R1(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function xx(e) {
  if (R1(e)) return S1(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ l("tr", { className: g.row, onClick: $r, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ l("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: A(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...Ft(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(Sr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: g.mono, children: Cr(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": Rr(t.inFlightHint), children: ae(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : ue(t.p50) }) })
  ] });
}
const T1 = "_row_2u4ll_2", x1 = "_name_2u4ll_16", L1 = "_scope_2u4ll_24", jt = {
  row: T1,
  name: x1,
  scope: L1
};
function Rn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function A1(e) {
  return e === void 0 ? `${jt.row} ward-toolrow` : `${jt.row} ward-toolrow ${e}`;
}
function E1(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function I1({ id: e, reasonId: t, tool: a, state: r, onChange: o }) {
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
function M1({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: Rn(e) });
}
function B1({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${jt.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function j1(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function Lx({ tool: e, onChange: t, presentation: a }) {
  const r = y(), o = y(), i = E1(e, a), s = j1(a);
  return /* @__PURE__ */ l(s, { className: A1(a == null ? void 0 : a.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(I1, { id: r, reasonId: o, tool: e, state: i, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${jt.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(B1, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(M1, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const P1 = "_strip_4ppv9_2", q1 = "_well_4ppv9_11", H1 = "_head_4ppv9_18", O1 = "_name_4ppv9_24", D1 = "_chart_4ppv9_32", F1 = "_segment_4ppv9_38", z1 = "_detailedChart_4ppv9_44", W1 = "_rail_4ppv9_57", K1 = "_section_4ppv9_63", G1 = "_label_4ppv9_74", U1 = "_note_4ppv9_91", V = {
  strip: P1,
  well: q1,
  head: H1,
  name: O1,
  chart: D1,
  segment: F1,
  detailedChart: z1,
  rail: W1,
  section: K1,
  label: G1,
  note: U1
}, V1 = "No item in flight to preview.", Y1 = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", J1 = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", dn = [1, 2, 3, 4, 5, 6], Pt = 100;
function Q1(e, t) {
  return t.has(e) ? ge(e, "id") : "var(--ward-color-line)";
}
function X1({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: dn.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: o * Pt,
      y: "0",
      width: Pt,
      height: "8",
      fill: Q1(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Z1(e) {
  const t = e.slice(0, dn.length);
  for (; t.length < dn.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function ek({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${V.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, a) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(a * Pt),
        y: "0",
        width: String(Pt),
        height: "40",
        style: { fill: ge(t.streamStep, "chip") }
      },
      t.key + String(a)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((t, a) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(a))) })
  ] });
}
function Tr(e) {
  return (t) => e == null ? void 0 : e(t);
}
function gt({ label: e, children: t }) {
  const a = y();
  return /* @__PURE__ */ l("section", { className: V.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: V.label, children: e }),
    t
  ] });
}
function tk({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: t ?? V1 }) : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Kt, { item: { ...e, streamStep: _t(a.streamStep) }, onOpen: Tr(r), feed: null }) });
}
function nk({ draft: e }) {
  const t = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: V.head, style: t, children: [
    /* @__PURE__ */ n(Fe, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Ft(e.key, e.streamStep) })
  ] });
}
function ak(e) {
  const t = Z1(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ l("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(gt, { label: "Board card", children: /* @__PURE__ */ n(tk, { ...e, draft: a }) }),
    /* @__PURE__ */ n(gt, { label: "Streams index row", children: /* @__PURE__ */ n(nk, { draft: a }) }),
    /* @__PURE__ */ l(gt, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(ek, { identities: t }),
      /* @__PURE__ */ n("p", { className: V.note, children: Y1 })
    ] }),
    /* @__PURE__ */ n(gt, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: J1 }) })
  ] });
}
function rk({ draft: e, sample: t, streams: a, onOpen: r }) {
  const o = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: V.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: V.head, children: [
      /* @__PURE__ */ n(Fe, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Ft(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Kt, { item: { ...t, streamStep: e.streamStep }, onOpen: Tr(r) }) }),
    /* @__PURE__ */ n(X1, { draft: e, streams: a })
  ] });
}
function Ax(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(ak, { ...e }) : /* @__PURE__ */ n(rk, { ...e });
}
const ok = "_row_ixlg5_6", lk = "_headCell_ixlg5_10", ik = "_cell_ixlg5_11", sk = "_name_ixlg5_23", ck = "_consequence_ixlg5_29", dk = "_governed_ixlg5_36", uk = "_control_ixlg5_42", hk = "_byRole_ixlg5_48", mk = "_webControl_ixlg5_59", wk = "_webConsequence_ixlg5_65", fk = "_webGoverned_ixlg5_71", W = {
  row: ok,
  headCell: lk,
  cell: ik,
  name: sk,
  consequence: ck,
  governed: dk,
  control: uk,
  byRole: hk,
  webControl: mk,
  webConsequence: wk,
  webGoverned: fk
};
function _k({
  capability: e,
  cell: t,
  onChange: a
}) {
  return t.value === "byRole" ? /* @__PURE__ */ n("span", { className: W.byRole, children: "by role" }) : /* @__PURE__ */ l("span", { className: W.control, children: [
    /* @__PURE__ */ n(
      Ve,
      {
        label: `${e.name} · ${t.stream}`,
        checked: t.value !== "off",
        onChange: (r) => a(t.streamStep, r)
      }
    ),
    t.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "Pilot" })
  ] });
}
function vk({ capability: e, cells: t, onChange: a }) {
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
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(_k, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function bk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function pk({ name: e, cell: t, onChange: a }) {
  if (t.value === "byRole") return /* @__PURE__ */ n("span", { className: `${W.webControl} ${W.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Ve,
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
function gk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ l("tr", { className: W.row, children: [
    /* @__PURE__ */ l("td", { className: W.cell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${W.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(pk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webGoverned} ward-cellmeta`, children: bk(e) }) })
  ] });
}
function Ex(e) {
  return "presentation" in e ? /* @__PURE__ */ n(gk, { ...e }) : /* @__PURE__ */ n(vk, { ...e });
}
const yk = "_row_vv64h_2", Nk = "_cell_vv64h_6", kk = "_name_vv64h_25", $k = "_note_vv64h_30", Ck = "_webName_vv64h_41", Sk = "_webMeta_vv64h_47", X = {
  row: yk,
  cell: Nk,
  name: kk,
  note: $k,
  webName: Ck,
  webMeta: Sk
}, xr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function Rk(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Tk({ component: e, onRestart: t }) {
  const a = y(), r = xr[e.state], o = e.state === "drainFirst";
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
function xk({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: Rk(e.state) });
}
function Lk({ component: e, onRestart: t }) {
  return /* @__PURE__ */ l("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { ...xr[e.state] }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(xk, { component: e, onRestart: t }) })
  ] });
}
function Ix(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Lk, { ...e }) : /* @__PURE__ */ n(Tk, { ...e });
}
const Ak = "_row_jcm5k_7", Ek = "_cell_jcm5k_11", Ik = "_next_jcm5k_28", Mk = "_headCell_jcm5k_38", Bk = "_webId_jcm5k_77", jk = "_webPurpose_jcm5k_83", Pk = "_webMeta_jcm5k_91", qk = "_webUrgent_jcm5k_97", K = {
  row: Ak,
  cell: Ek,
  next: Ik,
  headCell: Mk,
  webId: Bk,
  webPurpose: jk,
  webMeta: Pk,
  webUrgent: qk
}, Hk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, Ok = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Lr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Dk = Object.fromEntries(Lr.map((e) => [e.key, e]));
function Qe({ column: e, children: t }) {
  const a = Dk[e];
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
function Mx() {
  return /* @__PURE__ */ n("tr", { children: Lr.map((e) => /* @__PURE__ */ n(
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
function Fk({ cred: e }) {
  const t = Hk[e.state];
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n(Qe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Qe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Qe, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(Qe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Rn(e.cls) }) }),
    /* @__PURE__ */ n(Qe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Qe, { column: "next", children: /* @__PURE__ */ n("span", { className: K.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function zk({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${K.webMeta} ${K.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function Wk({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(zk, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...Ok[e.state] }) })
  ] });
}
function Bx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Wk, { ...e }) : /* @__PURE__ */ n(Fk, { ...e });
}
const Kk = "_card_lpp45_2", Gk = "_head_lpp45_11", Uk = "_env_lpp45_18", Vk = "_version_lpp45_25", Yk = "_meta_lpp45_32", Jk = "_webCard_lpp45_37", Qk = "_webRow_lpp45_47", Xk = "_webTitle_lpp45_55", Zk = "_webLine_lpp45_65", e$ = "_webVersion_lpp45_72", t$ = "_webMeta_lpp45_77", Q = {
  card: Kk,
  head: Gk,
  env: Uk,
  version: Vk,
  meta: Yk,
  webCard: Jk,
  webRow: Qk,
  webTitle: Xk,
  webLine: Zk,
  webVersion: e$,
  webMeta: t$
}, ca = { dev: "Dev", uat: "UAT", prod: "Prod" }, Ar = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function n$({ env: e }) {
  const t = Ar[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l("section", { className: Q.card, "aria-label": ca[e.env], children: [
    /* @__PURE__ */ l("div", { className: Q.head, children: [
      /* @__PURE__ */ n("span", { className: Q.env, children: ca[e.env] }),
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
function a$(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function r$(e) {
  return /* @__PURE__ */ l("article", { className: `${Q.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${Q.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Q.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Ar[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Q.version} ${Q.webVersion} ${Q.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Q.meta} ${Q.webMeta} ${Q.webLine} ward-cellmeta`, children: a$(e) })
  ] });
}
function jx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(r$, { ...e }) : /* @__PURE__ */ n(n$, { ...e });
}
const o$ = "_panel_1hmja_2", l$ = "_line_1hmja_8", i$ = "_actions_1hmja_14", yt = {
  panel: o$,
  line: l$,
  actions: i$
};
function Px(e) {
  return /* @__PURE__ */ l("div", { className: yt.panel, children: [
    /* @__PURE__ */ n("p", { className: yt.line, children: e.status }),
    /* @__PURE__ */ n(q, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: yt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: yt.line, children: e.note ?? "" })
  ] });
}
const s$ = "_upload_13fcl_2", c$ = "_preview_13fcl_7", d$ = "_mark_13fcl_17", u$ = "_empty_13fcl_22", h$ = "_actions_13fcl_28", m$ = "_input_13fcl_33", w$ = "_reasons_13fcl_41", f$ = "_reason_13fcl_41", _$ = "_accepted_13fcl_57", oe = {
  upload: s$,
  preview: c$,
  mark: d$,
  empty: u$,
  actions: h$,
  input: m$,
  reasons: w$,
  reason: f$,
  accepted: _$
}, Er = 1.5, Ir = 22, qt = "script elements or event handlers", je = "links or external references", xe = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Er}px at ${Ir}px`], v$ = [xe[1], xe[2], qt, je], b$ = /* @__PURE__ */ new Map([
  ["image", xe[1]],
  ["text", xe[2]],
  ["tspan", xe[2]],
  ["textPath", xe[2]],
  ["script", qt],
  ["foreignObject", qt],
  ["a", je],
  ["use", je],
  ["style", je],
  ["feImage", je],
  ["set", je]
]), p$ = "http://www.w3.org/2000/svg", g$ = "http://www.w3.org/2000/xmlns/", y$ = /* @__PURE__ */ new Set([
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
]), N$ = /* @__PURE__ */ new Set([
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
]), Tn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, k$ = /url\s*\(|['"\\]/i;
function $$() {
  return { ok: !1, reasons: [xe[1]] };
}
function Mr(e) {
  return e.namespaceURI === p$;
}
function C$(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && Mr(t) ? t : null;
  } catch {
    return null;
  }
}
function S$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [xe[0]] : [];
}
function R$(e) {
  return b$.get(e.localName) ?? (e.localName.startsWith("animate") ? je : void 0);
}
function T$(e) {
  return k$.test(e.replace(Tn, ""));
}
function x$(e) {
  return /^on/i.test(e.localName) ? qt : e.localName === "href" || T$(e.value) ? je : void 0;
}
function L$(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(R$(a));
    for (const r of Array.from(a.attributes)) t.add(x$(r));
  }
  return v$.filter((a) => t.has(a));
}
function A$(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((o) => Number.isFinite(o) && o > 0), 0), r = a > 0 ? Ir / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Er;
  }) ? [xe[3]] : [];
}
function E$(e) {
  if (e.namespaceURI === g$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (N$.has(t) || t.startsWith("stroke"));
}
function I$(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && Mr(t) && y$.has(t.localName);
}
function M$(e, t) {
  I$(t) ? t.nodeType === Node.ELEMENT_NODE && Br(t) : e.removeChild(t);
}
function Br(e) {
  for (const t of Array.from(e.attributes)) E$(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) M$(e, t);
  return e;
}
function B$(e) {
  return Array.from(e.matchAll(Tn), (t) => t[2]).filter((t) => t !== "");
}
function j$(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function P$(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const i of B$(o.value)) a.has(i) || a.set(i, `${t}-${a.size}`);
  return a;
}
function q$(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(Tn, (r, o, i) => {
      const s = t.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function H$(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = P$(a, t);
  for (const o of a) {
    const i = r.get(o.getAttribute("id") ?? "");
    i === void 0 ? o.removeAttribute("id") : o.setAttribute("id", i), q$(o, r);
  }
  return e;
}
function qx(e) {
  const t = C$(e);
  if (t === null) return $$();
  const a = [...S$(t), ...L$(t), ...A$(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(H$(Br(t), j$(e))) };
}
const O$ = "Mark accepted.", D$ = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, F$ = new Set(ya.flatMap((e) => [ge(e, "id"), ge(e, "chip")]));
function z$(e) {
  return e !== void 0 && (D$.test(e) || F$.has(e)) ? e : void 0;
}
function W$({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: oe.preview, style: { "--mark": z$(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: oe.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: oe.empty }) });
}
function K$(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function G$(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function U$({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: oe.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("p", { className: oe.accepted, children: O$ }) }) : /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("ul", { className: oe.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: oe.reason, children: t }, t)) }) });
}
function V$({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(U$, { result: e }) : /* @__PURE__ */ n("p", { className: `${oe.result} ${K$(e, a)}`, role: "status", children: G$(e, a) });
}
function da(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function Hx({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: o }) {
  const i = _(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ l("div", { className: oe.upload, children: [
    /* @__PURE__ */ n(W$, { current: e }),
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
      /* @__PURE__ */ n(b, { ...da(o), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...da(o), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(V$, { result: s, presentation: r })
  ] });
}
const Y$ = "_row_o3t6y_7", J$ = "_cell_o3t6y_11", Q$ = "_head_o3t6y_28", X$ = "_name_o3t6y_34", Z$ = "_pinned_o3t6y_42", e0 = "_headCell_o3t6y_49", t0 = "_webName_o3t6y_88", n0 = "_webMeta_o3t6y_95", a0 = "_webWarn_o3t6y_103", D = {
  row: Y$,
  cell: J$,
  head: Q$,
  name: X$,
  pinned: Z$,
  headCell: e0,
  webName: t0,
  webMeta: n0,
  webWarn: a0
}, xn = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, jr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], r0 = Object.fromEntries(jr.map((e) => [e.key, e]));
function o0(e, t) {
  return `mcp.${e}.${t}`;
}
function l0(e) {
  return Object.keys(xn).includes(e);
}
function i0(e) {
  return xn[e !== void 0 && l0(e) ? e : "unknown"];
}
function lt({ column: e, children: t }) {
  const a = r0[e];
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
function Ox() {
  return /* @__PURE__ */ n("tr", { children: jr.map((e) => /* @__PURE__ */ n(
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
function s0({ server: e }) {
  const t = xn[e.connection];
  return /* @__PURE__ */ l("tr", { className: D.row, children: [
    /* @__PURE__ */ l(lt, { column: "name", children: [
      /* @__PURE__ */ l("span", { className: D.head, children: [
        /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Rn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ l("span", { className: D.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(lt, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(lt, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(lt, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(lt, { column: "tools", children: e.tools.map((a) => o0(e.name, a)).join(" · ") })
  ] });
}
function c0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function d0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function u0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${D.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e });
}
function h0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function m0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function w0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: D.row, children: [
    /* @__PURE__ */ l("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: `${D.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: c0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...d0(e) }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(u0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...i0(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: D.cell, children: [
      /* @__PURE__ */ n(h0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(m0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function Dx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(w0, { ...e }) : /* @__PURE__ */ n(s0, { ...e });
}
const f0 = "_row_1ibo7_2", _0 = "_headCell_1ibo7_14", v0 = "_cell_1ibo7_15", b0 = "_name_1ibo7_26", p0 = "_consequence_1ibo7_32", g0 = "_reason_1ibo7_38", y0 = "_value_1ibo7_44", N0 = "_webRow_1ibo7_60", k0 = "_webSetting_1ibo7_73", $0 = "_webName_1ibo7_81", C0 = "_webConsequence_1ibo7_89", S0 = "_webControl_1ibo7_95", R0 = "_webState_1ibo7_109", T0 = "_webChip_1ibo7_114", P = {
  row: f0,
  headCell: _0,
  cell: v0,
  name: b0,
  consequence: p0,
  reason: g0,
  value: y0,
  webRow: N0,
  webSetting: k0,
  webName: $0,
  webConsequence: C0,
  webControl: S0,
  webState: R0,
  webChip: T0
}, Pr = 104, qr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function x0({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ve, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(Qa, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: P.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function L0({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = y(), i = qr[a], s = a === "locked";
  return /* @__PURE__ */ l("tr", { className: P.row, "data-inheritance": a, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: P.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(x0, { control: t, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: P.cell, style: { width: Pr }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function Hr(e, t) {
  return String(e ?? t);
}
function A0(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function E0(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? Hr(e.value, "—");
}
function I0({ control: e, name: t, locked: a, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: P.webControl, children: [
    /* @__PURE__ */ n(Ve, { label: t, labelHidden: !0, checked: i, locked: a, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ n("span", { className: P.webState, "aria-hidden": "true", children: a || i ? "on" : "off" })
  ] });
}
function M0(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(I0, { ...e });
  const o = A0(t, a);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: P.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(Qa, { options: o, value: Hr(t.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: E0(t) });
}
function B0({ setting: e, control: t, inheritance: a, reason: r, onChange: o, renderControl: i }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ l("div", { className: `${P.row} ${P.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ l("span", { className: P.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${P.name} ${P.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: s, className: `${P.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: P.webControl, children: i(s) }) : /* @__PURE__ */ n(M0, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${P.webChip} ward-policy-chip`, style: { width: Pr }, children: /* @__PURE__ */ n(m, { ...qr[a], size: "tag" }) })
  ] });
}
function Fx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(B0, { ...e }) : /* @__PURE__ */ n(L0, { ...e });
}
const j0 = "_label_h9m4w_7", P0 = "_name_h9m4w_15", q0 = "_column_h9m4w_24", H0 = "_webFrame_h9m4w_57", O0 = "_webHead_h9m4w_62", D0 = "_webHeadLabel_h9m4w_74", F0 = "_webLabel_h9m4w_117", z0 = "_webColumns_h9m4w_124", W0 = "_webGroup_h9m4w_130", K0 = "_webPeople_h9m4w_131", G0 = "_webVia_h9m4w_132", U0 = "_webMeta_h9m4w_161", G = {
  label: j0,
  name: P0,
  column: q0,
  webFrame: H0,
  webHead: O0,
  webHeadLabel: D0,
  webLabel: F0,
  webColumns: z0,
  webGroup: W0,
  webPeople: K0,
  webVia: G0,
  webMeta: U0
}, V0 = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, Zt = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function en({ column: e, children: t }) {
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
function Y0(e) {
  if (!e.matrixRole) return;
  const t = V0[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function J0({ node: e }) {
  const t = Y0(e);
  return /* @__PURE__ */ l("span", { className: G.label, children: [
    /* @__PURE__ */ n("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ n(Q0, { role: t, node: e }),
    /* @__PURE__ */ n(en, { column: Zt[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(en, { column: Zt[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(en, { column: Zt[2], children: e.requestedVia ?? "" })
  ] });
}
function Q0({ role: e, node: t }) {
  return /* @__PURE__ */ l(x, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function X0({ index: e, depth: t, node: a, expanded: r, leaf: o, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    rr,
    {
      index: e,
      depth: t,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(J0, { node: a }),
      children: s
    }
  );
}
function tn({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function Z0({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(tn, { className: `${G.webMeta} ${G.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(tn, { className: `${G.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(tn, { className: `${G.webMeta} ${G.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function eC() {
  return /* @__PURE__ */ l("div", { className: G.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: G.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: G.webColumns, children: [
      /* @__PURE__ */ n("span", { className: G.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: G.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: G.webVia, children: "Requested via" })
    ] })
  ] });
}
function tC({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function nC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function aC({ rows: e, label: t }) {
  return /* @__PURE__ */ l("div", { className: G.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(eC, {}),
    /* @__PURE__ */ n(Iw, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      rr,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(tC, { row: a }),
        detail: /* @__PURE__ */ n(Z0, { row: a }),
        expanded: nC(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function zx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(aC, { ...e }) : /* @__PURE__ */ n(X0, { ...e });
}
const rC = "_runbook_b9agc_2", oC = "_list_b9agc_7", lC = "_step_b9agc_15", iC = "_numeral_b9agc_21", sC = "_body_b9agc_28", cC = "_head_b9agc_34", dC = "_title_b9agc_40", uC = "_detail_b9agc_45", hC = "_actions_b9agc_50", mC = "_webList_b9agc_56", wC = "_webStep_b9agc_60", fC = "_webBody_b9agc_66", _C = "_webTitle_b9agc_74", vC = "_webDetail_b9agc_78", M = {
  runbook: rC,
  list: oC,
  step: lC,
  numeral: iC,
  body: sC,
  head: cC,
  title: dC,
  detail: uC,
  actions: hC,
  webList: mC,
  webStep: wC,
  webBody: fC,
  webTitle: _C,
  webDetail: vC
}, Or = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Dr(e) {
  return String(e + 1).padStart(2, "0");
}
function bC({ step: e, index: t, connection: a }) {
  const r = Or[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: M.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: M.numeral, children: Dr(t) }),
    /* @__PURE__ */ l("span", { className: M.body, children: [
      /* @__PURE__ */ l("span", { className: M.head, children: [
        /* @__PURE__ */ n("span", { className: M.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        o && e.startedAt && /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ n("span", { className: M.detail, children: e.detail })
    ] })
  ] });
}
function pC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: M.list, children: e.map((r, o) => /* @__PURE__ */ n(bC, { step: r, index: o, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: M.actions, children: t })
  ] });
}
function gC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ l("li", { className: `${M.step} ${M.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${M.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Dr(t) }),
    /* @__PURE__ */ l("span", { className: `${M.body} ${M.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${M.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${M.title} ${M.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Or[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${M.detail} ${M.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function yC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${M.list} ${M.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(gC, { step: r, index: o, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${M.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function Wx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(yC, { ...e }) : /* @__PURE__ */ n(pC, { ...e });
}
const NC = "_list_1gu6a_2", kC = "_check_1gu6a_10", $C = "_body_1gu6a_16", CC = "_text_1gu6a_23", SC = "_pending_1gu6a_32", RC = "_measured_1gu6a_37", et = {
  list: NC,
  check: kC,
  body: $C,
  text: CC,
  pending: SC,
  measured: RC
};
function TC(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function xC({ check: e }) {
  const t = TC(e.passed);
  return /* @__PURE__ */ l("li", { className: `${et.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(yn, { state: t.state, label: t.label }),
    /* @__PURE__ */ l("span", { className: et.body, children: [
      /* @__PURE__ */ n("span", { className: et.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ l("span", { className: et.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: et.measured, children: e.measured })
  ] });
}
function Kx({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${et.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(xC, { check: t }, t.text)) });
}
const LC = "_root_y6bbq_2", AC = "_list_y6bbq_10", EC = "_line_y6bbq_32", IC = "_at_y6bbq_59", MC = "_text_y6bbq_63", BC = "_foot_y6bbq_67", jC = "_idle_y6bbq_79", PC = "_caret_y6bbq_87", qC = "_jump_y6bbq_94", ve = {
  root: LC,
  list: AC,
  line: EC,
  at: IC,
  text: MC,
  foot: BC,
  idle: jC,
  caret: PC,
  jump: qC
}, HC = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Ln(e) {
  return Number.isNaN(Date.parse(e)) ? "" : HC.format(new Date(e));
}
const OC = { warn: "warning", ok: "ok" };
function DC({ kind: e }) {
  const t = OC[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function FC({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Ln(e)}` });
}
function zC({ connection: e, idleSince: t, last: a, children: r }) {
  const o = [t, a == null ? void 0 : a.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Ln(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${ve.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ve.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ve.idle, children: i }),
    /* @__PURE__ */ n(FC, { at: a == null ? void 0 : a.at }),
    r
  ] });
}
const WC = 8;
function KC(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > WC;
}
function GC({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const Fr = Ne(null);
function Gx({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, o] = p(!1), i = _a(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(Fr.Provider, { value: i, children: a });
}
function UC() {
  const e = ye(Fr), [t, a] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const VC = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function Ux({ lines: e, connection: t, idleSince: a, label: r = "Live activity", fixed: o }) {
  const i = _(null), [s, c] = p(0), [d, u] = UC(), [h, w] = p(!1), f = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), nt(() => {
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
    /* @__PURE__ */ n("ol", { className: ve.list, ref: i, "aria-live": d ? "polite" : "off", "aria-label": r, ...VC(e.length, o), onScroll: (k) => w(KC(k.currentTarget)), children: e.map((k, E) => /* @__PURE__ */ l("li", { className: `${ve.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": E < s, children: [
      /* @__PURE__ */ n("span", { className: ve.at, children: Ln(k.at) }),
      /* @__PURE__ */ n(DC, { kind: k.kind }),
      /* @__PURE__ */ n("span", { className: ve.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${E}`)) }),
    /* @__PURE__ */ l(zC, { connection: t, idleSince: a, last: f, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(GC, { shown: h, onJump: N })
    ] })
  ] });
}
const YC = "_row_1k8wl_2", JC = "_head_1k8wl_14", QC = "_author_1k8wl_20", XC = "_eta_1k8wl_25", ZC = "_edited_1k8wl_26", eS = "_body_1k8wl_32", tS = "_reason_1k8wl_37", nS = "_actions_1k8wl_42", Ce = {
  row: YC,
  head: JC,
  author: QC,
  eta: XC,
  edited: ZC,
  body: eS,
  reason: tS,
  actions: nS
}, aS = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function rS(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function oS({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
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
function lS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Ce.reason, id: t, children: e })
  ] });
}
function iS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function sS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(oS, { ...e }) : /* @__PURE__ */ n(lS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function Vx(e) {
  const { comment: t } = e;
  iS(e);
  const a = y(), r = `${a}-unavailable`, o = aS[t.delivery];
  return /* @__PURE__ */ l("div", { className: `${Ce.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: Ce.head, children: [
      /* @__PURE__ */ n("span", { className: Ce.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: Ce.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Ce.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Ce.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Ce.reason, id: a, children: rS(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Ce.actions, children: /* @__PURE__ */ n(sS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const cS = "_root_rvhdw_2", dS = "_attach_rvhdw_11", uS = "_actions_rvhdw_17", hS = "_reply_rvhdw_23", mS = "_replyField_rvhdw_28", wS = "_send_rvhdw_54", fS = "_sendIcon_rvhdw_65", _S = "_sendsAs_rvhdw_75", He = {
  root: cS,
  attach: dS,
  actions: uS,
  reply: hS,
  replyField: mS,
  send: wS,
  sendIcon: fS,
  sendsAs: _S
};
function zr({ value: e, onChange: t }) {
  const [a, r] = p("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function vS() {
  return /* @__PURE__ */ n("svg", { className: He.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function bS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function pS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [o, i] = zr(e), s = y(), c = () => {
    o.trim() !== "" && r(a, o);
  }, d = (u) => {
    bS(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ l("div", { className: He.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: He.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ n(q, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: o, onChange: i, describedBy: s }),
      /* @__PURE__ */ l(b, { variant: "primary", className: He.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ n(vS, {}),
        /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: He.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function Yx(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(pS, { ...e }) : /* @__PURE__ */ n(gS, { ...e });
}
function gS(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: o, onPost: i, onDraft: s } = e, [c, d] = zr(e);
  return /* @__PURE__ */ l("div", { className: He.root, children: [
    /* @__PURE__ */ n(q, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ l("div", { className: He.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    o && /* @__PURE__ */ n(
      La,
      {
        label: `Requeue ${o.agent} after posting`,
        consequence: o.consequence,
        checked: o.checked,
        onChange: o.onChange
      }
    ),
    /* @__PURE__ */ l("div", { className: He.actions, children: [
      /* @__PURE__ */ n(b, { variant: "primary", onClick: () => i(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const yS = "_list_1yhks_2", NS = "_item_1yhks_6", kS = "_body_1yhks_22", $S = "_text_1yhks_28", CS = "_evidence_1yhks_37", SS = "_consequence_1yhks_49", RS = "_note_1yhks_54", Ue = {
  list: yS,
  item: NS,
  body: kS,
  text: $S,
  evidence: CS,
  consequence: SS,
  note: RS
};
function TS({ criterion: e }) {
  return /* @__PURE__ */ n(Fe, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function ua({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function xS(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function LS({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Ue.body, children: [
    /* @__PURE__ */ n("span", { className: Ue.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(ua, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Ue.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(ua, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Ue.consequence, children: xS(e.why) })
    ] })
  ] });
}
function AS({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Ue.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(TS, { criterion: e }),
    /* @__PURE__ */ n(LS, { criterion: e })
  ] });
}
function Jx({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(AS, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ n("p", { className: Ue.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const ES = "_list_dwhoz_2", IS = "_rung_dwhoz_6", MS = "_name_dwhoz_18", BS = "_actor_dwhoz_32", Tt = {
  list: ES,
  rung: IS,
  name: MS,
  actor: BS
}, jS = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function PS({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = jS[e.state];
  return /* @__PURE__ */ l("li", { className: Tt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: Tt.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${Tt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function Qx({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Tt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(PS, { rung: t }, t.name)) });
}
const qS = "_sheet_pw37w_2", HS = "_title_pw37w_9", OS = "_stage_pw37w_15", DS = "_effects_pw37w_20", FS = "_effect_pw37w_20", zS = "_numeral_pw37w_31", WS = "_effectText_pw37w_38", KS = "_refusals_pw37w_43", GS = "_reasons_pw37w_52", US = "_reason_pw37w_52", VS = "_actions_pw37w_62", we = {
  sheet: qS,
  title: HS,
  stage: OS,
  effects: DS,
  effect: FS,
  numeral: zS,
  effectText: WS,
  refusals: KS,
  reasons: GS,
  reason: US,
  actions: VS
};
function YS({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function Xx({ run: e, effects: t, refusals: a, cost: r, onRequeue: o, onClose: i, returnFocusTo: s }) {
  const c = y(), d = `${c}-refusal`, [u, h] = p(""), w = a.length > 0;
  return /* @__PURE__ */ n(ot, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ l("div", { className: we.sheet, children: [
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
      hm,
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
      /* @__PURE__ */ n(YS, { refused: w, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ n(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const JS = "_list_1laeg_2", QS = "_path_1laeg_7", XS = "_head_1laeg_21", ZS = "_label_1laeg_28", eR = "_consequence_1laeg_35", st = {
  list: JS,
  path: QS,
  head: XS,
  label: ZS,
  consequence: eR
}, un = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function ha(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function ma(e) {
  return e ? "primary" : "secondary";
}
function tR({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: ma(t), size: "sm", onClick: () => a(e.kind), children: un[e.kind] }) : /* @__PURE__ */ n(b, { variant: ma(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: un[e.kind] });
}
function nR({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: st.path, "data-allowed": e.allowed, "data-role": ha(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: st.head, children: [
      /* @__PURE__ */ n("span", { className: st.label, children: e.title ?? un[e.kind] }),
      /* @__PURE__ */ n(m, { role: ha(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: st.consequence, children: e.consequence }),
    /* @__PURE__ */ n(tR, { path: e, primary: t, onChoose: a })
  ] });
}
function Zx({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: st.list, children: e.map((a, r) => /* @__PURE__ */ n(nR, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const aR = "_list_1m7i0_2", rR = "_item_1m7i0_6", oR = "_node_1m7i0_18", lR = "_body_1m7i0_24", iR = "_head_1m7i0_30", sR = "_stage_1m7i0_36", cR = "_version_1m7i0_41", dR = "_sentence_1m7i0_49", uR = "_meta_1m7i0_54", Re = {
  list: aR,
  item: rR,
  node: oR,
  body: lR,
  head: iR,
  stage: sR,
  version: cR,
  sentence: dR,
  meta: uR
}, hR = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function mR({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: Re.head, children: [
    /* @__PURE__ */ n("span", { className: Re.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Re.version, title: e.version, children: e.version }) : null
  ] });
}
function wR({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${Re.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Re.node} ward-history-node`, children: /* @__PURE__ */ n(Fe, { size: 9, kind: hR[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${Re.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(mR, { entry: e }),
      /* @__PURE__ */ n("span", { className: Re.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${Re.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function eL({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Re.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(wR, { entry: t }, t.stage + String(a))) });
}
const fR = "_thread_1e70p_3", _R = "_turn_1e70p_8", vR = "_who_1e70p_27", bR = "_body_1e70p_32", xt = {
  thread: fR,
  turn: _R,
  who: vR,
  body: bR
}, Wr = Ne(!1);
function tL({ children: e, density: t }) {
  return /* @__PURE__ */ n(Wr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${xt.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function nL({ turn: e }) {
  if (!ye(Wr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${xt.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${xt.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${xt.body} ward-chat-body`, children: e.body })
  ] });
}
const pR = "_list_yiolt_3", gR = "_row_yiolt_7", yR = "_label_yiolt_20", NR = "_n_yiolt_26", kR = "_cause_yiolt_33", ut = {
  list: pR,
  row: gR,
  label: yR,
  n: NR,
  cause: kR
};
function $R(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const CR = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function SR({ row: e, formatNumber: t }) {
  return $R(e), /* @__PURE__ */ l("li", { className: `${ut.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Fe, { size: 8, ...CR[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: ut.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${ut.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(RR, { cause: e.cause })
  ] });
}
function RR({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${ut.cause} ward-healthrow-cause`, children: e }) : null;
}
function aL({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${ut.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(SR, { row: a, formatNumber: t }, a.label)) });
}
const TR = "_root_1jxwp_2", xR = {
  root: TR
};
function rL({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: xR.root, "data-density": o, children: [
    /* @__PURE__ */ n(Gt, { items: e, note: t, density: o }),
    /* @__PURE__ */ n(b, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const LR = "_row_dhbre_3", AR = "_key_dhbre_13", ER = "_stack_dhbre_24", IR = "_value_dhbre_32", MR = "_evidence_dhbre_39", BR = "_mark_dhbre_47", Xe = {
  row: LR,
  key: AR,
  stack: ER,
  value: IR,
  evidence: MR,
  mark: BR
};
function jR({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(yn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function oL({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(jR, { state: e.state }) })
  ] });
}
const PR = "_cell_gh2sd_2", qR = {
  cell: PR
}, HR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function OR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function DR(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function FR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: OR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function zR(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function lL({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  DR(e, a);
  const r = zR(e);
  return /* @__PURE__ */ n(
    Sm,
    {
      label: "Rejection routing",
      columns: HR,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: qR.cell, "data-norerun": o.noRerun ? !0 : void 0, children: FR(o, i) }),
      empty: t ?? /* @__PURE__ */ n(gf, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const WR = "_row_1f2re_2", KR = "_title_1f2re_12", GR = "_turns_1f2re_18", UR = "_waiting_1f2re_19", VR = "_resolved_1f2re_20", YR = "_activity_1f2re_21", JR = "_cost_1f2re_28", QR = "_link_1f2re_29", XR = "_tableLink_1f2re_47", ZR = "_tableRecord_1f2re_48", e2 = "_tableRow_1f2re_59", t2 = "_tableTitle_1f2re_71", n2 = "_tableResolved_1f2re_76", a2 = "_tableMeta_1f2re_87", r2 = "_tableCost_1f2re_94", o2 = "_tableActivity_1f2re_95", l2 = "_tableState_1f2re_105", z = {
  row: WR,
  title: KR,
  turns: GR,
  waiting: UR,
  resolved: VR,
  activity: YR,
  cost: JR,
  link: QR,
  tableLink: XR,
  tableRecord: ZR,
  tableRow: e2,
  tableTitle: t2,
  tableResolved: n2,
  tableMeta: a2,
  tableCost: r2,
  tableActivity: o2,
  tableState: l2
}, Kr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function i2(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function s2(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function c2(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const d2 = { duplicate: "Closed · duplicate" };
function u2({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(at, { className: z.tableMeta, text: `waiting on ${e}` });
}
function h2({ value: e }) {
  return /* @__PURE__ */ n("td", { className: z.tableCost, children: e === void 0 ? null : le(e) });
}
function m2({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${z.tableRecord} ward-target`, href: A(e.href), children: `→ ${e.key}` });
}
function w2({ session: e, href: t }) {
  const a = Kr[e.state];
  return /* @__PURE__ */ l("tr", { className: z.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: z.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${z.tableLink} ward-target`, href: A(t), children: /* @__PURE__ */ n(at, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: z.tableMeta, children: s2(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: z.tableResolved, children: [
      c2(e.resolved),
      /* @__PURE__ */ n(u2, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(h2, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: z.tableActivity, children: i2(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: z.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: d2[e.state] ?? a.label }),
      /* @__PURE__ */ n(m2, { link: e.link })
    ] }) })
  ] });
}
function f2({ session: e }) {
  const t = Kr[e.state];
  return /* @__PURE__ */ l("div", { className: z.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(at, { className: z.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: z.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(at, { className: z.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: z.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: z.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : le(e.cost) }),
    /* @__PURE__ */ n("span", { className: z.activity, children: he(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: z.link, href: A(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function iL(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(w2, { session: e.session, href: e.href }) : /* @__PURE__ */ n(f2, { session: e.session });
}
const _2 = "_block_1yy2v_3", v2 = "_list_1yy2v_9", b2 = "_line_1yy2v_14", hn = {
  block: _2,
  list: v2,
  line: b2
}, p2 = { warn: "warning", ok: "ok" };
function g2({ kind: e }) {
  const t = p2[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function y2({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${hn.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(g2, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function sL({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${hn.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: hn.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(y2, { line: a }, `${r}-${a.text}`)) }) });
}
const N2 = "_band_tt7hp_1", k2 = "_head_tt7hp_8", $2 = "_cell_tt7hp_19", C2 = "_index_tt7hp_35", S2 = "_title_tt7hp_42", R2 = "_note_tt7hp_48", T2 = "_cellTitle_tt7hp_53", x2 = "_cellBody_tt7hp_58", L2 = "_tag_tt7hp_64", $e = {
  band: N2,
  head: k2,
  cell: $2,
  index: C2,
  title: S2,
  note: R2,
  cellTitle: T2,
  cellBody: x2,
  tag: L2
}, wa = 4;
function cL({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== wa)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${wa}-cell grid`);
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
const A2 = "_tag_1yuvz_2", E2 = "_link_1yuvz_14", nn = {
  tag: A2,
  link: E2
};
function dL({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: nn.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${nn.tag} ${nn.link}`, href: A(t), children: e });
}
const I2 = "_eyebrow_m8swv_2", M2 = "_link_m8swv_10", fa = {
  eyebrow: I2,
  link: M2
};
function Gr({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: fa.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${fa.link} ward-target`, href: A(t), children: e }) });
}
const B2 = "_figure_qz9i7_2", j2 = "_media_qz9i7_9", P2 = "_caption_qz9i7_35", an = {
  figure: B2,
  media: j2,
  caption: P2
};
function q2(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(x, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function uL(e) {
  return /* @__PURE__ */ l("figure", { className: an.figure, children: [
    /* @__PURE__ */ n("div", { className: an.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(q2, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: an.caption, children: e.caption })
  ] });
}
function An(e) {
  return `h${e}`;
}
function H2(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const O2 = "_prose_1fxb9_2", D2 = "_anchor_1fxb9_79", Ur = {
  prose: O2,
  anchor: D2
};
function hL({ children: e }) {
  return /* @__PURE__ */ n("div", { className: Ur.prose, children: e });
}
function mL({ level: e, children: t, id: a }) {
  const r = An(e), o = a ?? H2(t);
  return /* @__PURE__ */ l(r, { id: o, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${Ur.anchor} ward-target`, href: `#${o}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const F2 = "_list_176jq_2", z2 = "_pair_176jq_8", W2 = "_term_176jq_14", K2 = "_value_176jq_19", Nt = {
  list: F2,
  pair: z2,
  term: W2,
  value: K2
};
function wL({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: Nt.list, children: e.map((t) => /* @__PURE__ */ l("div", { className: Nt.pair, children: [
    /* @__PURE__ */ n("dt", { className: Nt.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: Nt.value, children: t.value })
  ] }, t.term)) });
}
const G2 = "_nav_sgeyg_2", U2 = "_item_sgeyg_6", V2 = "_link_sgeyg_13", Y2 = "_note_sgeyg_30", kt = {
  nav: G2,
  item: U2,
  link: V2,
  note: Y2
};
function fL({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: kt.nav, children: /* @__PURE__ */ n(xm, { children: t.map((a) => /* @__PURE__ */ l("li", { className: kt.item, children: [
    /* @__PURE__ */ n("a", { className: `${kt.link} ward-target`, href: A(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: kt.note, children: a.note })
  ] }, a.href)) }) });
}
const J2 = "_header_kelio_2", Q2 = "_skip_kelio_14", X2 = "_brand_kelio_39", Z2 = "_list_kelio_46", eT = "_link_kelio_56", Ze = {
  header: J2,
  skip: Q2,
  brand: X2,
  list: Z2,
  link: eT
};
function _L({ brand: e, links: t, current: a, homeHref: r = "/", mainId: o = "main", skipLabel: i = "Skip to content" }) {
  return /* @__PURE__ */ l("header", { className: Ze.header, children: [
    /* @__PURE__ */ n("a", { className: Ze.skip, href: `#${o}`, children: i }),
    /* @__PURE__ */ n("a", { className: `${Ze.brand} ward-target`, href: A(r), children: e }),
    /* @__PURE__ */ n("nav", { "aria-label": "Main", className: Ze.nav, children: /* @__PURE__ */ n("ul", { className: Ze.list, role: "list", children: t.map((s) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${Ze.link} ward-target`, href: A(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const tT = "_footer_1jb5e_2", nT = "_note_1jb5e_12", aT = "_list_1jb5e_18", rT = "_link_1jb5e_27", $t = {
  footer: tT,
  note: nT,
  list: aT,
  link: rT
};
function vL({ note: e, links: t = [], label: a = "Footer" }) {
  return /* @__PURE__ */ l("footer", { className: $t.footer, children: [
    /* @__PURE__ */ n("p", { className: $t.note, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("nav", { "aria-label": a, children: /* @__PURE__ */ n("ul", { className: $t.list, role: "list", children: t.map((r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${$t.link} ward-target`, href: A(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const oT = "_intro_13128_2", lT = "_title_13128_9", iT = "_lead_13128_17", rn = {
  intro: oT,
  title: lT,
  lead: iT
};
function bL({ title: e, eyebrow: t, eyebrowHref: a, lead: r, headingLevel: o = 1, children: i }) {
  const s = An(o);
  return /* @__PURE__ */ l("header", { className: rn.intro, children: [
    t === void 0 ? null : /* @__PURE__ */ n(Gr, { href: a, children: t }),
    /* @__PURE__ */ n(s, { className: rn.title, children: e }),
    r === void 0 ? null : /* @__PURE__ */ n("p", { className: rn.lead, children: r }),
    i
  ] });
}
const sT = "_section_u0k7p_2", cT = "_head_u0k7p_13", dT = "_titles_u0k7p_21", uT = "_title_u0k7p_21", hT = "_link_u0k7p_34", ct = {
  section: sT,
  head: cT,
  titles: dT,
  title: uT,
  link: hT
};
function mT({ title: e, headingId: t, eyebrow: a, link: r, headingLevel: o }) {
  const i = An(o);
  return /* @__PURE__ */ l("div", { className: ct.head, children: [
    /* @__PURE__ */ l("div", { className: ct.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ n(Gr, { children: a }),
      /* @__PURE__ */ n(i, { className: ct.title, id: t, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ n("a", { className: `${ct.link} ward-target`, href: A(r.href), children: r.label })
  ] });
}
function pL({ title: e, children: t, id: a, eyebrow: r, link: o, headingLevel: i = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ l("section", { className: ct.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ n(mT, { title: e, headingId: d, eyebrow: r, link: o, headingLevel: i }),
    t
  ] });
}
export {
  $T as ACCENT_PRESETS,
  UT as ActionStack,
  Ux as ActivityConsole,
  ET as AdminIcon,
  Hb as AgentCard,
  MT as AppShell,
  Ax as AppearanceStrip,
  cL as Band,
  KT as BarChart,
  t_ as BoardColumn,
  dx as BoardFootnote,
  ux as BoardHeader,
  LT as BoardIcon,
  tx as BoardScroller,
  b as Btn,
  kT as CHIP_ROLES,
  Lr as CREDENTIAL_COLUMNS,
  WT as Callout,
  Ex as CapabilityRow,
  ax as CardGrid,
  nL as ChatMessage,
  La as Checkbox,
  m as Chip,
  at as ClampText,
  Vx as ClarificationRow,
  yx as ClauseRuleRow,
  gx as ClauseRules,
  dr as ColourLadder,
  Ix as ComponentRow,
  Yx as Composer,
  mx as ConfigRow,
  hx as ConfigRowHead,
  Nn as ConnectionMark,
  Gx as ConsoleAnnounceProvider,
  tL as Conversation,
  hm as CostMeter,
  Bx as CredentialRow,
  Mx as CredentialRowHead,
  Jx as CriteriaList,
  Bs as Crumb,
  CT as DENSITIES,
  aL as DeliveryHealth,
  ox as DeniedState,
  TT as DisabledScope,
  kx as DryRunRail,
  gf as EmptyState,
  jx as EnvCard,
  Gr as Eyebrow,
  wL as FactList,
  q as Field,
  uL as Figure,
  rx as FilteredEmpty,
  BT as FoldText,
  ZT as FormStack,
  Gt as GateChecklist,
  Qx as GateLadder,
  Sm as Grid,
  Cx as HandoffRuleRow,
  $x as HandoffRules,
  xT as HomeIcon,
  wx as ItemDrawer,
  Px as KeyPanel,
  fo as LIVE_EVENT_TYPES,
  ib as LegacyBoardColumn,
  _x as LegacyBoardHeader,
  vx as LegacyConfigRow,
  px as LegacyItemDrawer,
  eb as LegacyOverCapNote,
  bx as LegacyPreviewRail,
  ir as LegacyWorkCard,
  fL as LinkList,
  Le as LiveIndicator,
  lx as LoadFailed,
  cx as Loading,
  jr as MCP_SERVER_COLUMNS,
  yn as Mark,
  Hx as MarkUpload,
  Fe as Marker,
  Dx as McpServerRow,
  Ox as McpServerRowHead,
  Wa as Menu,
  Da as MenuButton,
  Sx as NewStreamModal,
  $f as OverCapNote,
  vn as OverflowRow,
  ot as Overlay,
  jT as OwedCard,
  Nx as PARTIAL_STEP_REASON,
  Pr as POLICY_CHIP_WIDTH,
  JT as PageFrame,
  zT as PageHeader,
  bL as PageIntro,
  xm as PlainList,
  Fx as PolicyRow,
  fx as PreviewRail,
  hL as Prose,
  mL as ProseHeading,
  Zt as ROLE_MATRIX_COLUMNS,
  Nr as RULE_ACTIONS,
  Za as Radio,
  rL as ReadyChecklist,
  XT as RecordSection,
  Xx as RequeueSheet,
  Zx as ResolveBlock,
  oL as ResolvedFieldRow,
  zx as RoleMatrixRow,
  lL as RoutingTable,
  Rx as RuleRow,
  Wx as RunbookSteps,
  wo as STREAM_STEPS,
  pL as Section,
  ex as SectionBand,
  Qn as SectionHeader,
  Qa as SegmentedControl,
  qa as Select,
  iL as SessionRow,
  OT as Sidebar,
  IT as SidebarFoldButton,
  vL as SiteFooter,
  _L as SiteHeader,
  Tx as StageColumn,
  nx as StageGrid,
  eL as StageHistory,
  gy as StageListEditor,
  PT as StageSteps,
  ix as StaleStrip,
  zt as StatStrip,
  VT as StatTiles,
  FT as StreamAvatar,
  xx as StreamRow,
  AT as StudioIcon,
  QT as SubjectRail,
  Ve as Switch,
  HT as TabLinks,
  GT as TableHead,
  qT as Tabs,
  dL as Tag,
  pT as ThemeProvider,
  Lx as ToolRow,
  YT as TopBar,
  Iw as Tree,
  rr as TreeRow,
  sL as TypedInputBlock,
  ri as UNSAFE_HREF,
  Kx as ValidationList,
  vT as VisibilityProvider,
  bT as Visible,
  NT as WARD_VERSION,
  Kt as WorkCard,
  sx as WriteUnavailableStrip,
  i2 as agoSince,
  eo as clock,
  Py as colourStatus,
  ae as count,
  ue as duration,
  mn as elapsed,
  yT as eventSourceTransport,
  An as headingTag,
  Ot as isStreamStep,
  wt as isValidatedStreamStep,
  fp as ladderValidation,
  i0 as mcpConnectionChip,
  o0 as mcpToolName,
  le as money,
  be as ms,
  or as ordered,
  pa as ratio,
  Rk as restartLabel,
  A as safeHref,
  H2 as slug,
  he as stamp,
  wn as stream,
  ST as streamChip,
  Ft as streamChipProps,
  ge as streamColour,
  bo as streamHex,
  Et as streamInitials,
  _o as streamVars,
  DT as uniqueStreamInitials,
  Ma as useAnchoredPanel,
  Ct as useBorderFlash,
  Ae as useDisabledScope,
  uo as useFocusTrap,
  RT as useLiveFeed,
  gT as useReturnFocus,
  Ht as useRovingTabindex,
  fn as useTicker,
  to as useVisible,
  j as v,
  qx as validateMark,
  _t as validatedStep,
  ya as validatedStreamSteps
};
