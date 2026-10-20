import { jsx as n, Fragment as x, jsxs as l } from "react/jsx-runtime";
import { useMemo as va, useContext as ye, createContext as Ne, useState as p, useEffect as S, useCallback as te, useRef as _, useLayoutEffect as nt, useId as y, Fragment as ba, isValidElement as Jr, Children as Qr } from "react";
import { createPortal as Xr, flushSync as pa } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const In = (e) => String(e).padStart(2, "0");
function wn(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${In(t % 60)}s` : `${Math.floor(a / 60)}h ${In(a % 60)}m`;
}
const Zr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const t = Zr.formatToParts(new Date(e)), a = (r) => {
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
function ga(e, t) {
  return `${e} / ${t}`;
}
const eo = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function to(e) {
  return eo.format(new Date(e));
}
const ya = Ne(/* @__PURE__ */ new Set());
function yT({ hidden: e, children: t }) {
  const a = va(() => new Set(e), [e]);
  return /* @__PURE__ */ n(ya.Provider, { value: a, children: t });
}
function no(e) {
  return !ye(ya).has(e);
}
function NT({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: no(e) ? t : a });
}
const ao = "(prefers-color-scheme: dark)";
function Mn() {
  return typeof window.matchMedia == "function" ? window.matchMedia(ao) : null;
}
function ro(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = Mn()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? Mn() : null;
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
function oo(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function kT({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const o = ro(e === "system");
  return Ut("data-theme", oo(e, o)), Ut("data-accent", t), Ut("data-density", a), /* @__PURE__ */ n(x, { children: r });
}
const lo = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function io(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function so(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function co(e, t, a, r) {
  return e.shiftKey ? io(t, a) ? r : void 0 : document.activeElement === r || so(t) ? a : void 0;
}
function uo(e, t, a) {
  const r = a[0], o = a[a.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = co(e, t, r, o);
  i && (e.preventDefault(), i.focus());
}
function ho(e) {
  return { onKeyDown: te(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(lo));
      uo(a, e.current, r);
    },
    [e]
  ) };
}
function $T(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [t, e]);
}
const Bn = { ArrowUp: -1, ArrowDown: 1 }, jn = { ArrowLeft: -1, ArrowRight: 1 }, mo = (e, t, a) => Math.min(a, Math.max(t, e));
function wo(e, t) {
  if (t !== "horizontal" && e in Bn) return Bn[e];
  if (t !== "vertical" && e in jn) return jn[e];
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
      const w = Math.max(0, h.indexOf(t)), f = wo(u.key, e);
      f !== void 0 ? (u.preventDefault(), s(h[mo(w + f, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
const CT = (e, t, a) => {
  const r = new EventSource(e), o = (i) => a.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, ST = "0.2.0", RT = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], fo = [1, 2, 3, 4, 5, 6], Na = [1, 2, 3], _o = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], TT = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], xT = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], j = {
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
function fn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Ot(e) {
  return fo.includes(e);
}
function wt(e) {
  return Na.includes(e);
}
function vo(e) {
  if (!Ot(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function LT(e) {
  if (!Ot(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const bo = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function po(e) {
  if (!Ot(e)) throw new Error("unvalidated stream step");
  return bo[e];
}
function Pn(e) {
  return typeof e != "string" ? null : _o.includes(e) ? e : null;
}
function go(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function yo(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function No(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function ko(e, t, a) {
  const r = go(e);
  if (r === null) return null;
  const o = Pn(a) ?? Pn(r.type);
  return o === null ? null : { ...r, type: o, id: yo(r, t), at: No(r) };
}
function $o(e, t) {
  return e >= be.staleAfter ? "stale" : e >= be.heartbeat && t === "live" ? "reconnecting" : null;
}
function Co(e, t, a) {
  return e >= be.heartbeat && !t && a !== null;
}
function AT(e, t) {
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
        const ze = ko(T, J, ke);
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
    const T = Date.now() - c.current, J = $o(T, k.current);
    J && E(J);
    const ke = h.current;
    Co(T, N.current, ke) && Ee(ke);
  }, be.tick), () => {
    var T;
    window.clearInterval(f.current), window.clearTimeout(w.current), N.current = !1, (T = h.current) == null || T.close(), h.current = null;
  }), [re, Ee, E]), { connection: a, lastEventAt: o, subscribe: Ye };
}
function _n(e, t) {
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
const So = { blue: "running", orange: "waiting", green: "done" };
function Ro() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function qn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function Ct(e, t) {
  const a = _(0), r = te((o) => {
    const i = o ?? t, s = e.current;
    s !== null && i !== void 0 && (Ro() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${So[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => qn(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => qn(s), be.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (o) => r(o) : () => r(t);
}
const To = "_root_1otpc_2", xo = {
  root: To
};
function Lo(e, t, a, r, o) {
  const i = [wn(t)];
  return e || i.push(`as of ${to(a)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function Le({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const o = a !== "stale", i = _n(e, o), s = (t == null ? void 0 : t.at) ?? e, c = Lo(o, i, s, r, t);
  return /* @__PURE__ */ l("span", { className: `${xo.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const Ao = "_app_1bnco_1", Eo = "_side_1bnco_35", Io = "_sideTop_1bnco_46", Mo = "_sideBody_1bnco_60", Bo = "_iconRail_1bnco_99", jo = "_railItem_1bnco_108", Po = "_railIcon_1bnco_129", qo = "_railDot_1bnco_134", Ho = "_railLetter_1bnco_140", Oo = "_main_1bnco_146", Do = "_rail_1bnco_108", Fo = "_page_1bnco_168", zo = "_headerRow_1bnco_191", Wo = "_sidebarToggle_1bnco_198", Ko = "_headerSlot_1bnco_203", Go = "_headerAction_1bnco_208", Uo = "_drawerSide_1bnco_213", Vo = "_root_1bnco_260", Yo = "_topbar_1bnco_267", Jo = "_mark_1bnco_278", Qo = "_brand_1bnco_285", Xo = "_tagline_1bnco_291", Zo = "_identity_1bnco_297", el = "_tools_1bnco_298", tl = "_nav_1bnco_308", nl = "_metadata_1bnco_315", al = "_actor_1bnco_330", rl = "_detail_1bnco_331", ol = "_content_1bnco_376", ll = "_toolsPanel_1bnco_392", il = "_skip_1bnco_418", C = {
  app: Ao,
  side: Eo,
  sideTop: Io,
  sideBody: Mo,
  iconRail: Bo,
  railItem: jo,
  railIcon: Po,
  railDot: qo,
  railLetter: Ho,
  main: Oo,
  rail: Do,
  page: Fo,
  headerRow: zo,
  sidebarToggle: Wo,
  headerSlot: Ko,
  headerAction: Go,
  drawerSide: Uo,
  root: Vo,
  topbar: Yo,
  mark: Jo,
  brand: Qo,
  tagline: Xo,
  identity: Zo,
  tools: el,
  nav: tl,
  metadata: nl,
  actor: al,
  detail: rl,
  content: ol,
  toolsPanel: ll,
  skip: il
};
function rt(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const sl = "_scope_1an6i_2", cl = {
  scope: sl
}, ka = Ne(null);
function ET({ reason: e, actions: t = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ l("fieldset", { disabled: !0, className: `${cl.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(ka.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Ae() {
  return ye(ka);
}
function Dt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : rt(e, t.reasonId);
}
const dl = "_btn_hrmlj_2", ul = "_primary_hrmlj_14", hl = "_destructive_hrmlj_25", ml = "_secondary_hrmlj_35", wl = "_ghost_hrmlj_40", fl = "_overflow_hrmlj_49", _l = "_sm_hrmlj_56", vl = "_disabled_hrmlj_60", bl = "_withReason_hrmlj_68", pl = "_reason_hrmlj_74", tt = {
  btn: dl,
  primary: ul,
  destructive: hl,
  secondary: ml,
  ghost: wl,
  overflow: fl,
  sm: _l,
  disabled: vl,
  withReason: bl,
  reason: pl
};
function gl(e, t, a, r) {
  const o = t === "sm" ? [tt.sm, "ward-btn--sm"] : [], i = a ? [tt.disabled] : [];
  return [tt.btn, tt[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function yl(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Nl(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function kl(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function $l(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Cl(e, t, a) {
  return $l(e.describedBy, t && a);
}
function Sl({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${tt.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function Rl(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Ae()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(Tl, { ...e });
}
function Tl(e) {
  const t = Ae();
  Nl(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", o = !!(e.disabled || t), i = kl(e, t), s = y(), c = xl(i, t);
  return /* @__PURE__ */ l(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: gl(a, r, o, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: o,
        title: i,
        "aria-describedby": Cl(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...yl(a, e.controls),
        children: Rl(e)
      }
    ),
    /* @__PURE__ */ n(Sl, { id: s, reason: i, shown: c === $a })
  ] });
}
function xl(e, t) {
  return e && !t ? $a : ba;
}
function $a({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${tt.withReason} ward-btn-withReason`, children: e });
}
let vn = "none";
function Ll(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (vn = "key");
}
typeof document < "u" && (document.addEventListener("keydown", Ll, !0), document.addEventListener("pointerdown", () => {
  vn = "pointer";
}, !0));
function Al() {
  return vn === "key";
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
const El = "_scrim_1cawq_2", Il = "_drawer_1cawq_10", Ml = "_sheet_1cawq_14", Bl = "_modal_1cawq_18", jl = "_panel_1cawq_23", Pl = "_start_1cawq_44", ql = "_header_1cawq_67", Hl = "_title_1cawq_75", Ol = "_body_1cawq_79", Dl = "_close_1cawq_106", Te = {
  scrim: El,
  drawer: Il,
  sheet: Ml,
  modal: Bl,
  panel: jl,
  start: Pl,
  header: ql,
  title: Hl,
  body: Ol,
  close: Dl
}, Fl = Ne(null), Lt = [], At = /* @__PURE__ */ new Map();
function zl(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Wl(e, t) {
  let a = At.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, At.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function Kl(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !zl(r) && Wl(e, r);
}
function Gl(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (Kl(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function Ul(e) {
  for (const t of e.claims) {
    const a = At.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), At.delete(t)));
  }
}
function Vl(e, t) {
  const a = { root: e, claims: [] };
  return Lt.push(a), Gl(a, t), a;
}
function Yl(e) {
  const t = Lt.indexOf(e);
  t >= 0 && Lt.splice(t, 1), Ul(e);
}
function Hn(e) {
  return e !== null && Lt.at(-1) === e;
}
function Jl(e, t, a) {
  const r = _(null), o = _(a);
  return o.current = a, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = Vl(i, t);
    return r.current = c, () => {
      var u, h;
      const d = Hn(c);
      Yl(c), r.current = null, d && ((h = (u = o.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), te(() => Hn(r.current), []);
}
function Ql(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function Xl(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Zl({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("header", { className: `${Te.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Te.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function ei(e) {
  return `${Te.scrim} ${Te[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function ti(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Te.panel} ${Te[e]} ward-overlay-panel${a}${r}`;
}
function ni(e) {
  const t = ye(Fl);
  return e ?? t ?? document.body;
}
function ot(e) {
  const t = _(null), a = _(null), r = y(), o = ni(e.container), i = ht("(min-width: 768px)"), s = Ql(e.kind, i), c = Xl(e, r), d = ho(a), [u] = p(Al), h = Jl(t, o, e.returnFocusTo), w = te(() => {
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
  }, [w]), Xr(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: ei(s),
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
            className: ti(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => h() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Te.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Zl, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const ai = /^([a-z][a-z0-9+.-]*):/i, ri = /* @__PURE__ */ new Set(["http", "https"]), oi = "#";
function li(e) {
  var r, o;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (o = (r = ai.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : o.toLowerCase();
}
function A(e) {
  const t = li(e);
  return t === void 0 || ri.has(t) ? e : oi;
}
function ii(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function Ca(e) {
  const t = ii(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function si(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => Ca(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const o = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [a, ...a.children]) o == null || o.observe(i);
    return r(), () => {
      a.removeEventListener("scroll", r), o == null || o.disconnect();
    };
  }, [e, t]);
}
function ci(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, o = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : o > e.clientWidth - a ? e.scrollLeft + o - e.clientWidth + a : null;
}
function di(e, t, a) {
  nt(() => {
    const r = e.current, o = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !o) return;
    const i = ci(r, o);
    i !== null && (r.scrollLeft = Math.max(0, i)), Ca(r);
  }, [e, t, a]);
}
const ui = "_row_11g8i_2", hi = {
  row: ui
};
function mi(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function bn({ label: e, children: t, count: a, as: r = "div", focusable: o = !0, rowRef: i, className: s, ...c }) {
  const d = _(null), u = i ?? d;
  return si(u, a), /* @__PURE__ */ n(r, { ref: u, className: [hi.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...mi(o, r), ...c, children: t });
}
const wi = "_icon_1ylqy_2", fi = {
  icon: wi
};
function ft({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: fi.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function IT() {
  return /* @__PURE__ */ n(ft, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function MT() {
  return /* @__PURE__ */ l(ft, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function BT() {
  return /* @__PURE__ */ l(ft, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function jT() {
  return /* @__PURE__ */ n(ft, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function _i() {
  return /* @__PURE__ */ l(ft, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const Sa = "ward:sidebar-collapsed", vi = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function bi() {
  try {
    return window.localStorage.getItem(Sa) === "true";
  } catch {
    return !1;
  }
}
function pi(e) {
  try {
    window.localStorage.setItem(Sa, String(e));
  } catch {
  }
}
function gi(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function yi(e) {
  return e instanceof Element && e.closest(vi) !== null;
}
function Ni(e) {
  return e.key === "[" && !gi(e) && !yi(e.target);
}
function ki(e) {
  const [t, a] = p(bi), r = () => {
    pi(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const o = (i) => {
      var c;
      if (!Ni(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [e, t]), { collapsed: t, toggle: r };
}
function $i() {
  const e = ht("(max-width: 767.98px)"), t = ht("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function Ci(e) {
  const t = e === "phone", a = y(), r = _(null), [o, i] = p(!1);
  return o && !t && i(!1), { narrow: t, open: o, drawerId: a, slotRef: r, toggle: () => i(!o), close: () => i(!1) };
}
function Si({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ l("div", { className: C.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: C.headerSlot, children: e }),
    La(t) && /* @__PURE__ */ n("span", { className: C.headerAction, children: t })
  ] }) : e;
}
function Ri(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function Ti({ sidebar: e, label: t, drawer: a }) {
  var o;
  if (Ri(a.open, a.close), !a.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(ot, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (o = a.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ n("div", { className: C.drawerSide, onClick: r, children: Ra(e, !1) }) });
}
function xi(e) {
  const [t, a] = p(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function Li(e, t) {
  const a = ki(e === "wide" && !t), r = xi(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function Ai(e, t) {
  const a = Li(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return Ii(e.collapsed, t);
  const r = a.collapsed, o = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: o, drawsStrip: !o && typeof e.sidebar == "function", toggle: a.toggle };
}
const Ei = (e) => e.collapsed && e.drawsStrip;
function Ii(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const On = (e) => e ? "" : void 0;
function Ra(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ta({ fold: e }) {
  return /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(_i, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function Mi({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: C.sideTop, children: /* @__PURE__ */ n(Ta, { fold: e }) });
}
const xa = Ne(null);
function PT() {
  const e = ye(xa);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(Ta, { fold: e });
}
function Bi({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": fn(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function ji({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: C.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ l("a", { className: C.railItem, href: A(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(Bi, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function Pi({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: o }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ l("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(Mi, { fold: r, inSidebar: o && !i }),
    /* @__PURE__ */ n("div", { className: C.sideBody, hidden: i, children: Ra(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(ji, { items: a ?? [], label: t })
  ] });
}
const La = (e) => e != null;
function qi(e) {
  const { sidebar: t, header: a, action: r, children: o, rail: i, iconRail: s, pageFill: c } = e, d = La(i), u = $i(), h = Ci(u), w = Ai(e, u), f = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ l("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": On(Ei(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(xa.Provider, { value: w, children: /* @__PURE__ */ n(Pi, { sidebar: t, label: f, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ l("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(Si, { header: a, action: r, label: f, drawer: h }),
      /* @__PURE__ */ n("div", { className: C.page, "data-fill": On(c === !0), children: o })
    ] }),
    d && /* @__PURE__ */ n("div", { className: C.rail, children: i }),
    /* @__PURE__ */ n(Ti, { sidebar: t, label: f, drawer: h })
  ] });
}
function Hi({ destinations: e, active: t }) {
  const a = _(null);
  return di(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(bn, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: A(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function ln({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function Oi({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ l("span", { className: C.metadata, children: [
    /* @__PURE__ */ n(ln, { value: e, className: C.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(ln, { value: t, className: C.detail })
  ] });
}
function Di() {
  const e = ht("(max-width: 767.98px)"), t = y(), a = _(null), [r, o] = p(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Fi({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: C.tools, children: e });
}
function zi({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: C.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function Wi(e) {
  return /* @__PURE__ */ l("header", { className: C.topbar, children: [
    /* @__PURE__ */ n("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(ln, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ n(Hi, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: C.identity, children: /* @__PURE__ */ n(Oi, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Fi, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Ki(e) {
  const t = y(), a = Di();
  return /* @__PURE__ */ l("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: C.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Wi, { ...e, menu: a }),
    /* @__PURE__ */ n(zi, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: C.content, children: e.children })
  ] });
}
function Gi(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function qT(e) {
  return Gi(e) ? /* @__PURE__ */ n(qi, { ...e }) : /* @__PURE__ */ n(Ki, { ...e });
}
const Ui = "_root_itg9o_2", Vi = "_row_itg9o_8", Yi = "_box_itg9o_14", Ji = "_label_itg9o_21", Qi = "_labelHidden_itg9o_26", Xi = "_lockedNote_itg9o_36", Zi = "_consequence_itg9o_44", es = "_sample_itg9o_79", Be = {
  root: Ui,
  row: Vi,
  box: Yi,
  label: Ji,
  labelHidden: Qi,
  lockedNote: Xi,
  consequence: Zi,
  sample: es
};
function ts(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function ns({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: t }) : null;
}
function as({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function rs(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function os(e, t, a, r) {
  const o = e.consequence ? `${t}-note` : void 0, i = rs(e, a, r), s = i ? `${t}-reason` : void 0, c = Dt(rt(o, e.describedBy, s), r);
  return { noteId: o, reason: i, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? i } };
}
function ls({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function is({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function Aa(e) {
  const t = y(), a = Ae(), r = ts(e, a), o = os(e, t, r.disabled, a);
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
        /* @__PURE__ */ n(as, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(is, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(ls, { id: o.reasonId, reason: o.reason }),
    /* @__PURE__ */ n(ns, { id: o.noteId, text: e.consequence })
  ] });
}
const ss = "_chip_pq6tb_2", cs = {
  chip: ss
}, ds = {
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
function us(e, t) {
  if (e === "stream") return hs(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = ds[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function hs(e) {
  if (!e || !wt(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = fn(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${cs.chip} ward-chip ward-chip--${e}`, style: us(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const ms = "_clamp_zn74g_3", Dn = {
  clamp: ms
};
function at({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? Dn.clamp : `${Dn.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const ws = "_root_1btz3_2", fs = "_body_1btz3_10", _s = "_toggle_1btz3_24", Vt = {
  root: ws,
  body: fs,
  toggle: _s
};
function HT({ children: e, lines: t = 3, label: a }) {
  const [r, o] = p(!1), i = y();
  return /* @__PURE__ */ l("div", { className: Vt.root, children: [
    /* @__PURE__ */ n("div", { id: i, className: Vt.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: Vt.toggle, "aria-expanded": r, "aria-controls": i, onClick: () => o(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const vs = "_root_1a4s8_2", bs = "_words_1a4s8_16", ps = "_title_1a4s8_23", gs = "_actions_1a4s8_27", vt = {
  root: vs,
  words: bs,
  title: ps,
  actions: gs
};
function OT({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ l("section", { className: vt.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ l("div", { className: vt.words, children: [
      /* @__PURE__ */ n("strong", { className: vt.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: vt.actions, children: a })
  ] });
}
const ys = "_root_8zmpu_2", Ns = "_step_8zmpu_12", ks = "_dot_8zmpu_38", $s = "_label_8zmpu_51", it = {
  root: ys,
  step: Ns,
  dot: ks,
  label: $s
}, Cs = { done: ", done", now: ", current", next: "" };
function Ss({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ l("li", { className: it.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${it.dot} ward-running` : it.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: it.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: Cs[e.state] })
  ] });
}
function DT({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: it.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(Ss, { step: r, running: t }, r.label)) });
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
const Rs = "_root_13eei_3", Ts = "_nav_13eei_8", xs = "_list_13eei_16", Ls = "_item_13eei_24", As = "_link_13eei_44", Es = "_sep_13eei_54", Is = "_current_13eei_58", Ms = "_chips_13eei_62", Me = {
  root: Rs,
  nav: Ts,
  list: xs,
  item: Ls,
  link: As,
  sep: Es,
  current: Is,
  chips: Ms
};
function Bs({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: Me.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${Me.link} ward-target`, href: A(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function js({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: Me.root, children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ n("ol", { className: Me.list, children: e.map((r, o) => /* @__PURE__ */ l("li", { className: Me.item, children: [
      o > 0 ? /* @__PURE__ */ n("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(Bs, { step: r, isCurrent: a && o === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${Me.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function Ea(e, t, a) {
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
const Ps = 500;
function Ia(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function Ma() {
  const e = _(""), t = _(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, Ps), e.current);
}
const bt = 4;
function qs(e, t, a) {
  const r = Math.max(0, a - e.bottom - bt * 2), o = Math.max(0, e.top - bt * 2);
  return t <= r || r >= o ? { top: e.bottom + bt, maxHeight: r } : { top: e.top - bt - Math.min(t, o), maxHeight: o };
}
function Hs(e, t, a, r) {
  const o = { start: e.left, end: e.right - t }, i = { start: o.start + t <= a, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, a - t));
}
function Os(e, t, a, r) {
  return { ...qs(e, t.height, a.height), left: Hs(e, t.width, a.width, r) };
}
function St(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Ds(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function Fs(e, t, a) {
  const r = Ds(t, a);
  e.style.setProperty("--ward-anchor-width", St(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const o = e.getBoundingClientRect(), i = document.documentElement;
  return { edges: r, box: o, view: { width: i.clientWidth, height: i.clientHeight } };
}
function zs(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, o) => r.scrollTop = a[o]);
}
function Fn(e, t, a, r) {
  const o = zs(e), i = Fs(e, t, r), s = Os(i.edges, i.box, i.view, a);
  Object.assign(e.style, { left: St(s.left - i.box.left), top: St(s.top - i.box.top), maxHeight: St(s.maxHeight) }), o();
}
function Ws(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function Ba(e, t, a = "start", r) {
  nt(() => {
    const o = t.current, i = e.current;
    if (!o || !i) return;
    const s = Ws(o), c = () => Fn(o, i, a, r == null ? void 0 : r.current), d = (u) => {
      o.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), nt(() => {
    t.current && e.current && Fn(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const Ks = "_root_1lgbn_2", Gs = "_trigger_1lgbn_7", Us = "_value_1lgbn_47", Vs = "_menu_1lgbn_65", Ys = "_find_1lgbn_87", Js = "_list_1lgbn_103", Qs = "_option_1lgbn_114", Xs = "_check_1lgbn_133", Zs = "_empty_1lgbn_144", pe = {
  root: Ks,
  trigger: Gs,
  value: Us,
  menu: Vs,
  find: Ys,
  list: Js,
  option: Qs,
  check: Xs,
  empty: Zs
}, ec = 7;
function tc(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function zn(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function nc(e, t) {
  const [a, r] = p(e.defaultOpen === !0), [o, i] = p(""), [s, c] = p(() => zn(e.options, e.value)), d = (u) => {
    var h;
    pa(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: o,
    active: s,
    entries: tc(e.options, o),
    findable: e.options.length > ec,
    show: () => {
      e.disabled || (i(""), c(zn(e.options, e.value)), r(!0));
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
function ac(e, t) {
  const a = _(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function rc(e) {
  const t = Ma();
  return (a) => {
    const r = t(a), o = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    o >= 0 && e.to(o);
  };
}
function ja(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function oc(e) {
  return { ...ja(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function Pa(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const o = t[r.key];
    if (!o) return a(r);
    r.preventDefault(), r.stopPropagation(), o();
  };
}
const lc = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function ic(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      lc.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function sc({ entry: e, at: t, menu: a, ids: r, value: o }) {
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
function pn(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function cc({ menu: e, ids: t, focusRef: a }) {
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
      "aria-activedescendant": pn(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: Pa(e, ja(e), () => {
      })
    }
  );
}
function dc({ props: e, menu: t, ids: a, focusRef: r, trigger: o }) {
  const i = rc(t), s = _(null);
  Ba(o, s);
  const c = (d) => {
    Ia(d) && i(d.key);
  };
  return /* @__PURE__ */ l("div", { ref: s, className: pe.menu, children: [
    t.findable && /* @__PURE__ */ n(cc, { menu: t, ids: a, focusRef: r }),
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
        "aria-activedescendant": t.findable ? void 0 : pn(t, a),
        onKeyDown: Pa(t, oc(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(sc, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: pe.empty, children: "No match" })
  ] });
}
function uc(e, t) {
  const a = e.open ? pn(e, t) : void 0;
  S(() => {
    var r, o;
    a && ((o = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [a]);
}
function qa(...e) {
  return e.filter(Boolean).join(" ");
}
function hc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function mc({ props: e, menu: t, ids: a, trigger: r, wantFocus: o }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ae()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: qa(pe.trigger, e.triggerClassName),
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
      ...ic(t, o),
      children: /* @__PURE__ */ n("span", { id: a.value, className: pe.value, "data-placeholder": i || void 0, children: hc(e) })
    }
  );
}
function Ha(e) {
  const t = Ae(), a = t ? { ...e, disabled: !0, "aria-describedby": Dt(e["aria-describedby"], t) } : e, r = y(), o = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = _(null), s = _(null), c = _(null), d = nc(a, s), u = ac(d.open, c);
  return Ea(d.open, i, () => d.close(!1)), uc(d, o), /* @__PURE__ */ l("div", { ref: i, className: qa(pe.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(mc, { props: a, menu: d, ids: o, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(dc, { props: a, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const wc = "_field_1ensj_2", fc = "_label_1ensj_8", _c = "_labelHidden_1ensj_15", vc = "_control_1ensj_25", bc = "_mono_1ensj_45", pc = "_area_1ensj_50", gc = "_invalid_1ensj_57", Oe = {
  field: wc,
  label: fc,
  labelHidden: _c,
  control: vc,
  mono: bc,
  area: pc,
  invalid: gc
}, yc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, Oa = (e) => `${e}-label`;
function Nc({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? yc : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function kc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    Ha,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": Oa(t.id),
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
function $c({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
const Cc = { input: Nc, select: kc, textarea: $c };
function Sc(e, t, a) {
  const r = Cc[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function Rc(e, t, a, r) {
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
function Tc(e) {
  const t = e.mono ? [Oe.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [Oe.area] : [];
  return [Oe.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function xc(e) {
  return e ? `${Oe.label} ${Oe.labelHidden} ward-field-label` : `${Oe.label} ward-field-label`;
}
function q(e) {
  const t = y(), a = `${t}-msg`, r = Rc(e, t, a, Ae()), o = Tc(e);
  return /* @__PURE__ */ l("div", { className: `${Oe.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: Oa(t), className: xc(e.labelHidden), htmlFor: t, children: e.label }),
    Sc(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${Oe.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Lc = "_root_sjvm0_2", Ac = "_trigger_sjvm0_9", Ec = "_ghost_sjvm0_27", Ic = "_panel_sjvm0_46", Mc = "_edged_sjvm0_67", Bc = "_menu_sjvm0_73", jc = "_group_sjvm0_78", Pc = "_heading_sjvm0_83", qc = "_item_sjvm0_89", Hc = "_description_sjvm0_105", Oc = "_large_sjvm0_109", Dc = "_touch_sjvm0_113", Fc = "_icon_sjvm0_117", zc = "_label_sjvm0_125", Wc = "_text_sjvm0_130", Kc = "_trailing_sjvm0_138", Gc = "_check_sjvm0_144", Uc = "_separator_sjvm0_183", Vc = "_footer_sjvm0_189", Yc = "_find_sjvm0_196", Jc = "_findGlyph_sjvm0_208", Qc = "_findInput_sjvm0_214", Xc = "_empty_sjvm0_230", L = {
  root: Lc,
  trigger: Ac,
  ghost: Ec,
  panel: Ic,
  edged: Mc,
  menu: Bc,
  group: jc,
  heading: Pc,
  item: qc,
  description: Hc,
  large: Oc,
  touch: Dc,
  icon: Fc,
  label: zc,
  text: Wc,
  trailing: Kc,
  check: Gc,
  separator: Uc,
  footer: Vc,
  find: Yc,
  findGlyph: Jc,
  findInput: Qc,
  empty: Xc
}, Da = Ne(null);
function Zc(e, t) {
  const [a, r] = p({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (o) => r((i) => ({ open: !0, start: o, request: i.request + 1 })),
    close: (o) => {
      var i;
      pa(() => r((s) => ({ ...s, open: !1 }))), o && ((i = t.current) == null || i.focus());
    }
  };
}
const ed = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function td(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = ed.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function gn(...e) {
  return e.filter(Boolean).join(" ");
}
function nd(e, t = {}, a = "field") {
  const { ref: r, className: o, ...i } = t;
  return { ...i, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: gn(L.trigger, a === "ghost" ? L.ghost : void 0, o) };
}
function Fa(e) {
  const t = y(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = _(null), o = _(null), i = Zc(e.defaultOpen === !0, o);
  return Ea(i.open, r, () => i.close(!1)), /* @__PURE__ */ l("div", { ref: r, className: gn(L.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...nd(o, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...td(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(Da.Provider, { value: { ...a, popup: i, button: o }, children: e.children })
  ] });
}
function ad(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function rd(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const od = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function ld(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function id(e, t) {
  return e === "separator" ? e : "items" in e ? ld(e, t) : t(e) ? e : null;
}
function sd(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function cd(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (o) => o.label.toLowerCase().includes(a);
  return sd(e.map((o) => id(o, r)).filter((o) => o !== null));
}
const za = (e, t) => (e % t + t) % t;
function Pe(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const o = za(t + a * r, e.length);
    if (!e[o].disabled) return o;
  }
  return -1;
}
const dd = (e) => e.split("").every((t) => t === e[0]);
function ud(e, t, a) {
  const r = dd(a), o = r ? a[0] : a, i = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = za(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function hd(e) {
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
function md(e, t) {
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
function wd(e, t, a) {
  const r = Ma(), o = md(e, t), i = (s) => {
    if (Ia(s)) {
      if (!a) return e.focus(ud(e.items, e.current(), r(s.key)));
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
function fd(e) {
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
function _d(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? Pe(e, -1, 1) : t;
}
function vd(e, t) {
  const { start: a, request: r } = t, o = _(e);
  o.current = e, S(() => {
    const { items: i, focus: s } = o.current;
    a && s(a === "first" ? _d(i) : Pe(i, i.length, -1));
  }, [a, r]);
}
function bd({ row: e, nav: t, popup: a }) {
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
const pd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function gd(e, t) {
  return pd(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function yd(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: L.label, children: e.label });
  return e.description ? /* @__PURE__ */ l("span", { className: L.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: L.description, children: e.description })
  ] }) : a;
}
function Nd() {
  return /* @__PURE__ */ n("svg", { className: L.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Wn(e, t) {
  return /* @__PURE__ */ l(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: L.icon, "aria-hidden": "true", children: e.icon }) : null,
    yd(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: L.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(Nd, {}) : null
  ] });
}
function Wa(e) {
  const { item: t, at: a } = e.row, r = y(), o = {
    ref: (i) => {
      e.nav.refs.current[a] = i;
    },
    role: "menuitem",
    tabIndex: -1,
    className: L.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...gd(t, r),
    ...bd(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: A(t.href), ...o, children: Wn(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...o, children: Wn(t, r) });
}
function kd({ heading: e, rows: t, nav: a, popup: r }) {
  const o = y();
  return /* @__PURE__ */ l("div", { role: "group", "aria-labelledby": o, className: L.group, children: [
    /* @__PURE__ */ n("div", { id: o, className: L.heading, children: e }),
    t.map((i) => /* @__PURE__ */ n(Wa, { row: i, nav: a, popup: r }, i.at))
  ] });
}
function $d({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: L.separator }) : e.kind === "group" ? /* @__PURE__ */ n(kd, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(Wa, { row: e.row, nav: t, popup: a });
}
function Cd() {
  const e = ye(Da);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Sd() {
  return /* @__PURE__ */ l("svg", { className: L.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function Rd(e, t) {
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
function Td({ find: e, query: t, setQuery: a, input: r, nav: o, popup: i, menuId: s }) {
  const c = Rd(o, i), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ l("div", { className: L.find, children: [
    /* @__PURE__ */ n(Sd, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: L.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function xd(e, t) {
  const [a, r] = p(""), o = _(null), i = t !== void 0 && od(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = o.current) == null || d.focus();
  };
  return i ? { find: t, query: a, setQuery: r, input: o, toFind: s, entries: cd(e, a) } : { query: a, setQuery: r, input: o, entries: e };
}
const Ld = { regular: void 0, large: L.large, touch: L.touch }, Ad = (e, t) => gn(L.panel, e ? L.edged : void 0, Ld[t]);
function Ed({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: L.empty, children: e.empty ?? "No matches" });
}
function Ka({ entries: e, footer: t, align: a = "start", find: r, edges: o, size: i = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = Cd(), h = _(null);
  Ba(u, h, a, o);
  const w = xd(e, r), f = ad(w.entries), N = hd(f.flatMap(rd).map((H) => H.item)), k = wd(N, s, w.toFind), E = fd(s);
  return vd(N, s), /* @__PURE__ */ l("div", { ref: h, className: Ad(o, i), ...E, children: [
    w.find && /* @__PURE__ */ n(Td, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: L.menu, ...k, children: f.map((H, me) => /* @__PURE__ */ n($d, { block: H, nav: N, popup: s }, me)) }),
    /* @__PURE__ */ n(Ed, { find: w.find, count: N.items.length }),
    t && /* @__PURE__ */ n("p", { className: L.footer, children: t })
  ] });
}
function Id(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function Ga(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !Id(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const Md = (e, t) => e.reduce((a, r) => a + r + t, -t);
function Bd({ room: e, widths: t, more: a, gap: r }, o) {
  const i = t.map((d, u) => u);
  if (Md(t, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([o]);
  let c = t[o] + r + a;
  for (const d of i)
    if (d !== o) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Yt = (e) => Number.parseFloat(e) || 0, Kn = (e) => e.getBoundingClientRect().width;
function jd(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Yt(a.paddingInlineStart) - Yt(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), Kn),
    more: r ? Kn(r) : 0,
    gap: Yt(a.columnGap)
  };
}
function Pd(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const qd = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function Ua(e, t, a, r = ':scope > [role="tab"]') {
  const [o, i] = p(null);
  return nt(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = jd(s, r);
      i((u) => qd(u, d) ? u : d);
    };
    return c(), Pd(s, c);
  }, [e, a, r]), o && Bd(o, t);
}
const Hd = "_strip_1zvzj_2", Od = "_fits_1zvzj_19", Dd = "_probe_1zvzj_27", Fd = "_moreRoot_1zvzj_36", zd = "_more_1zvzj_36", Wd = "_tab_1zvzj_55", Kd = "_count_1zvzj_91", Gd = "_badge_1zvzj_97", Y = {
  strip: Hd,
  fits: Od,
  probe: Dd,
  moreRoot: Fd,
  more: zd,
  tab: Wd,
  count: Kd,
  badge: Gd
}, Va = "More";
function Ud(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const Gn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, yn = (e) => e.badge === void 0 ? Gn(e) : `${Gn(e)}, ${e.badge}`;
function Ya(e) {
  return `${Y.strip} ward-tabs ward-tabs--${e}`;
}
const Vd = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Yd({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ l(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${Y.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : yn(e),
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
function Jd(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((i) => i.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Qd({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(Fa, { label: Va, className: Y.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: Y.more }, children: /* @__PURE__ */ n(Ka, { align: "end", entries: e.map((r) => ({ label: yn(r), onSelect: () => a(r.id) })) }) });
}
function Xd(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : Vd;
}
function FT({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: o }) {
  const i = Ht({ orientation: "horizontal" }), s = Ud(e, t);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = _(null);
  Ga(c, o);
  const d = Ua(c, s, e.map(yn).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ l("div", { ref: c, className: `${Ya(o)} ${Y.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(Yd, { tab: h, active: t, place: Xd(i, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${Y.more} ${Y.probe}`, children: Va }),
    u.length > 0 && /* @__PURE__ */ n(Qd, { tabs: u, trigger: i.itemProps(e.length), onPick: Jd(c, a) })
  ] });
}
const Un = 7, Ja = "More", Zd = ":scope > a", Qa = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, eu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function tu(e, t) {
  return !e || e.includes(t) ? {} : eu;
}
function nu({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, className: `${Y.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ l(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
    ] })
  ] });
}
function au({ links: e }) {
  return /* @__PURE__ */ n(Fa, { label: Ja, className: Y.moreRoot, trigger: { className: Y.more }, children: /* @__PURE__ */ n(Ka, { align: "end", entries: e.map((t) => ({ label: Qa(t), href: t.href })) }) });
}
function zT({ links: e, active: t, label: a, level: r }) {
  if (e.length > Un) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${Un} — the set is fixed`);
  const o = _(null);
  Ga(o, r);
  const i = Math.max(0, e.findIndex((d) => d.id === t)), s = Ua(o, i, e.map(Qa).join(`
`), Zd), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ l("nav", { ref: o, className: `${Ya(r)} ${Y.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(nu, { link: d, current: d.id === t, place: tu(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${Y.more} ${Y.probe}`, children: Ja }),
    c.length > 0 && /* @__PURE__ */ n(au, { links: c })
  ] });
}
const ru = "_root_v56ff_3", ou = "_segment_v56ff_9", Vn = {
  root: ru,
  segment: ou
};
function Xa({ options: e, value: t, onChange: a, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Ht({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${Vn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: Vn.segment,
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
const lu = "_sidebar_s9o1j_3", iu = "_brand_s9o1j_9", su = "_mark_s9o1j_17", cu = "_word_s9o1j_24", du = "_nav_s9o1j_30", uu = "_navItem_s9o1j_39", hu = "_footLink_s9o1j_49", mu = "_group_s9o1j_58", wu = "_groupName_s9o1j_65", fu = "_agents_s9o1j_81", _u = "_agent_s9o1j_81", vu = "_root_s9o1j_96", bu = "_agentTop_s9o1j_105", pu = "_dot_s9o1j_112", gu = "_agentName_s9o1j_124", yu = "_agentMeta_s9o1j_138", Nu = "_foot_s9o1j_49", ku = "_footName_s9o1j_150", $u = "_footLinks_s9o1j_157", Cu = "_linkBrand_s9o1j_184", Su = "_label_s9o1j_205", Ru = "_note_s9o1j_210", Tu = "_footer_s9o1j_226", I = {
  sidebar: lu,
  brand: iu,
  mark: su,
  word: cu,
  nav: du,
  navItem: uu,
  new: "_new_s9o1j_48",
  footLink: hu,
  group: mu,
  groupName: wu,
  agents: fu,
  agent: _u,
  root: vu,
  agentTop: bu,
  dot: pu,
  agentName: gu,
  agentMeta: yu,
  foot: Nu,
  footName: ku,
  footLinks: $u,
  linkBrand: Cu,
  label: Su,
  note: Ru,
  footer: Tu
};
function xu({ agent: e }) {
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
              style: { "--dot": fn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: I.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: I.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Lu({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: I.foot, children: [
    /* @__PURE__ */ n("span", { className: I.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: I.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${I.footLink} ward-target`, href: A(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function Au({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: o, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: I.agents, children: r.map((s) => /* @__PURE__ */ n(xu, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(Lu, { shared: i })
  ] });
}
function Eu(e) {
  return e.destinations ?? e.items ?? [];
}
function Iu({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.linkBrand, children: e });
}
function Mu({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.footer, children: e });
}
function Bu({ link: e, active: t }) {
  return /* @__PURE__ */ l("a", { href: A(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: I.note, children: e.note })
  ] });
}
function ju(e) {
  return /* @__PURE__ */ l("aside", { className: `${I.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Iu, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Eu(e).map((t) => /* @__PURE__ */ n(Bu, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(Mu, { children: e.children })
  ] });
}
function Pu(e) {
  return "agents" in e;
}
function WT(e) {
  return Pu(e) ? /* @__PURE__ */ n(Au, { ...e }) : /* @__PURE__ */ n(ju, { ...e });
}
const qu = "_mark_wlgi8_3", Hu = {
  mark: qu
}, Ou = { met: "✓", unmet: "", failed: "✕" };
function Nn({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Hu.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: Ou[e]
    }
  );
}
const Du = "_avatar_1t33a_3", Fu = {
  avatar: Du
};
function Et(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function zu(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [Et(e), ...[...t.slice(1)].map((r) => a + r)];
}
function Wu(e, t) {
  const a = zu(e).find((o) => !t.has(o));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(Et(e).charAt(0) + String(r)); ) r += 1;
  return Et(e).charAt(0) + String(r);
}
function KT(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const o = Wu(r, t);
    t.add(o), a.set(r, o);
  }
  return a;
}
function Ku(e) {
  return e != null && wt(e) ? vo(e) : void 0;
}
function GT({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: Fu.avatar, "data-size": a, "aria-hidden": "true", style: Ku(t), children: r ?? Et(e) });
}
const Gu = "_marker_br9fi_2", Uu = {
  marker: Gu
}, Vu = {
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
}, Yu = { running: " ward-running" };
function Fe({ size: e, kind: t, label: a }) {
  const r = { "--marker": Vu[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Uu.marker} ward-marker ward-marker--${t}${Yu[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const Ju = "_root_ti0pq_2", Qu = "_chip_ti0pq_11", Xu = "_noCase_ti0pq_23", pt = {
  root: Ju,
  chip: Qu,
  noCase: Xu
};
function Zu(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function kn({ connection: e, since: t, lastEventAt: a }) {
  const r = Zu(t, a), o = _n(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${pt.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Fe, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${pt.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: pt.noCase, children: wn(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${pt.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    he(r)
  ] });
}
const eh = "_root_yylks_2", th = "_context_yylks_13", nh = "_row_yylks_1", ah = "_heading_yylks_27", rh = "_headingWrap_yylks_35", oh = "_meta_yylks_41", lh = "_chips_yylks_49", ih = "_title_yylks_56", sh = "_consequence_yylks_66", ch = "_actionsWrap_yylks_73", dh = "_actions_yylks_73", uh = "_action_yylks_73", hh = "_overflowPanel_yylks_102", mh = "_measureClip_yylks_113", wh = "_measure_yylks_113", U = {
  root: eh,
  context: th,
  row: nh,
  heading: ah,
  headingWrap: rh,
  meta: oh,
  chips: lh,
  title: ih,
  consequence: sh,
  actionsWrap: ch,
  actions: dh,
  action: uh,
  overflowPanel: hh,
  measureClip: mh,
  measure: wh
};
function fh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(at, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function _h({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function vh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function bh({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ l("div", { className: U.meta, children: [
    /* @__PURE__ */ n(_h, { chips: e }),
    /* @__PURE__ */ n(vh, { consequence: t, consequenceHint: a })
  ] });
}
function ph({ title: e, chips: t, consequence: a, consequenceHint: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: U.heading, children: [
    /* @__PURE__ */ n(fh, { title: e, density: o }),
    /* @__PURE__ */ n(bh, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function sn({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function Yn({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function gh({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: o }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(Yn, { disclosure: o }) : t ? [/* @__PURE__ */ n(Yn, { disclosure: o }, "more"), /* @__PURE__ */ n(sn, { actions: e }, "actions")] : /* @__PURE__ */ n(sn, { actions: e });
}
function yh(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function Nh({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(sn, { actions: e }) });
}
function kh(e, t) {
  const a = y(), [r, o] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: a, toggle: () => o(!i) }, close: () => {
    var d, u;
    o(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const $h = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function Ch(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && $h(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function Sh({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(js, { path: e.path, current: e.current }) });
}
function Rh(...e) {
  return e.some((t) => t === null);
}
function Th(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function xh(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + Th(e);
}
function Lh(e, t, a, r, o) {
  if (o === 0 || Rh(t, a, r)) return !1;
  const [i, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - xh(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Ah(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Eh(e) {
  return Jr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Ih(e, t) {
  return t.length === 0 && e.length === 1 && Eh(e[0]);
}
function Mh(e, t) {
  const a = _(null), r = _(null), o = _(null), i = _(null), [s, c] = p(!1);
  return S(() => {
    const d = a.current;
    if (!Ah(d)) return;
    const u = () => c(Lh(d, r.current, o.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: o, measureRef: i, collapsed: s && !t };
}
function Bh({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ l("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] }) });
}
function jh({ connection: e }) {
  return e ? /* @__PURE__ */ n(kn, { connection: e.connection, since: e.since }) : null;
}
function UT({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: o, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: N, measureRef: k, collapsed: E } = Mh(s, Ih(s, c)), H = c.length > 0, { disclosure: me, close: re } = kh(E || H, N), Ee = yh(c, s, E, u);
  return /* @__PURE__ */ l("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(Sh, { crumb: Ch(e, r, t) }),
    /* @__PURE__ */ l("div", { className: U.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: f, className: U.headingWrap, children: /* @__PURE__ */ n(ph, { title: r, chips: a, consequence: o, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ l("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(jh, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ n(gh, { actions: s, hasMore: H, collapsed: E, onOverflow: u, disclosure: me }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Nh, { actions: Ee, disclosure: me, onEscape: re }),
    /* @__PURE__ */ n(Bh, { actions: s, hasMore: H, measureRef: k })
  ] });
}
const Ph = "_root_td96x_2", qh = "_body_td96x_16", Jn = {
  root: Ph,
  body: qh
};
function VT({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${Jn.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: Jn.body, children: a }) });
}
const Hh = "_root_bf1pc_2", Oh = "_table_bf1pc_9", Dh = "_caption_bf1pc_14", Fh = "_series_bf1pc_23", zh = "_category_bf1pc_31", Wh = "_cell_bf1pc_39", Kh = "_track_bf1pc_45", Gh = "_lane_bf1pc_52", Uh = "_bar_bf1pc_56", Vh = "_value_bf1pc_63", Yh = "_swatch_bf1pc_70", Jh = "_empty_bf1pc_78", Z = {
  root: Hh,
  table: Oh,
  caption: Dh,
  series: Fh,
  category: zh,
  cell: Wh,
  track: Kh,
  lane: Gh,
  bar: Uh,
  value: Vh,
  swatch: Yh,
  empty: Jh
}, Qh = "—", Qn = 6;
function Xh(e, t) {
  if (t.length < 1 || t.length > Qn)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${Qn}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function Zh(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function Za(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function em(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function tm({ value: e, top: t, step: a, format: r, missing: o }) {
  const i = em(e, t), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ l("span", { className: Z.track, children: [
    /* @__PURE__ */ n("span", { className: Z.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${Z.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Z.value, children: e === null ? o : r(e) })
  ] }) });
}
function nm({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ l("th", { scope: "col", className: Z.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Z.swatch, "data-step": Za(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function am({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ l("section", { className: `${Z.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Z.empty, children: t })
  ] });
}
function rm({ title: e, categories: t, series: a, top: r, format: o = ae, categoryHead: i = "Category", missing: s = Qh }) {
  return /* @__PURE__ */ n("div", { className: `${Z.root} ward-barchart`, children: /* @__PURE__ */ l("table", { className: Z.table, children: [
    /* @__PURE__ */ n("caption", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Z.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(nm, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Z.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(tm, { value: u.values[d], top: r, step: Za(h, a.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function YT(e) {
  Xh(e.categories, e.series);
  const t = Zh(e.series);
  return t === 0 ? /* @__PURE__ */ n(am, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(rm, { ...e, top: t });
}
const om = "_root_1bfqw_2", lm = "_figure_1bfqw_7", im = "_of_1bfqw_13", sm = "_bar_1bfqw_18", cm = "_rows_1bfqw_38", dm = "_row_1bfqw_38", um = "_label_1bfqw_49", hm = "_amount_1bfqw_54", Ie = {
  root: om,
  figure: lm,
  of: im,
  bar: sm,
  rows: cm,
  row: dm,
  label: um,
  amount: hm
};
function mm({ spent: e, ceiling: t, breakdown: a }) {
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
const wm = "_frame_f7bxz_2", fm = "_table_f7bxz_6", _m = "_th_f7bxz_12", vm = "_td_f7bxz_13", bm = "_sort_f7bxz_53", pm = "_row_f7bxz_65", gm = "_empty_f7bxz_73", qe = {
  frame: wm,
  table: fm,
  th: _m,
  td: vm,
  sort: bm,
  row: pm,
  empty: gm
}, ym = { asc: "ascending", desc: "descending" };
function Nm(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return ym[t.direction];
}
function km(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: qe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function $m(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Cm({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: qe.th,
      style: $m(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Nm(e, t),
      children: km(e, a)
    }
  );
}
function Sm({ row: e, props: t }) {
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
function Rm({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: qe.head, children: t.map((w) => /* @__PURE__ */ n(Cm, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(Sm, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: o, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const Tm = "_list_v0s52_2", xm = {
  list: Tm
};
function Lm({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: xm.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const Am = "_label_1u62a_2", Em = {
  label: Am
};
function JT({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: Em.label, children: t.header }) }, t.key)) }) });
}
const Im = "_stack_bp6a0_2", Mm = {
  stack: Im
};
function QT({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Mm.stack, "data-ward-action-stack": "", children: e });
}
const Bm = "_set_1z0sq_2", jm = "_legend_1z0sq_7", Pm = "_row_1z0sq_15", qm = "_control_1z0sq_20", Hm = "_input_1z0sq_26", Om = "_label_1z0sq_31", Dm = "_consequence_1z0sq_36", We = {
  set: Bm,
  legend: jm,
  row: Pm,
  control: qm,
  input: Hm,
  label: Om,
  consequence: Dm
};
function er({ legend: e, options: t, value: a, onChange: r, disabled: o, name: i, describedBy: s, variant: c }) {
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
const Fm = "_root_11gpw_2", zm = "_head_11gpw_10", Wm = "_note_11gpw_29", Km = "_index_11gpw_34", Gm = "_dot_11gpw_38", Um = "_counter_11gpw_49", Vm = "_trailing_11gpw_57", Ke = {
  root: Fm,
  head: zm,
  note: Wm,
  index: Km,
  dot: Gm,
  counter: Um,
  trailing: Vm
};
function Ym({ index: e }) {
  return e ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ke.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ke.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Jm({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ke.counter, "aria-hidden": "true", children: e }) : null;
}
function Xn({ title: e, index: t, note: a, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Ke.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Ke.head, children: [
      /* @__PURE__ */ n(Ym, { index: t }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ke.note, children: a }),
    /* @__PURE__ */ n(Jm, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ke.trailing, children: i })
  ] });
}
const Qm = "_strip_c3x3u_2", Xm = "_cell_c3x3u_7", Zm = "_value_c3x3u_12", ew = "_link_c3x3u_29", tw = "_label_c3x3u_49", nw = "_tiles_c3x3u_101", De = {
  strip: Qm,
  cell: Xm,
  value: Zm,
  link: ew,
  label: tw,
  tiles: nw
};
function tr(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((o) => o.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const nr = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function aw({ cell: e }) {
  return /* @__PURE__ */ l("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: nr(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function rw({ cell: e, href: t }) {
  return /* @__PURE__ */ l("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: nr(e), title: e.hint, children: /* @__PURE__ */ l("a", { className: `${De.link} ward-stat-link`, href: A(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const ar = (e) => e.href === void 0 ? /* @__PURE__ */ n(aw, { cell: e }, e.label) : /* @__PURE__ */ n(rw, { cell: e, href: e.href }, e.label);
function zt({ cells: e, divided: t = !1 }) {
  return tr("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${De.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(ar) });
}
const Zn = 6;
function XT({ cells: e }) {
  tr("StatTiles", e, [1, 2 * Zn]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, Zn) };
  return /* @__PURE__ */ n("dl", { className: `${De.tiles} ward-stattiles`, style: t, children: e.map(ar) });
}
const ow = "_root_1eb1u_2", lw = "_track_1eb1u_8", iw = "_thumb_1eb1u_46", sw = "_labelHidden_1eb1u_64", cw = "_label_1eb1u_64", dw = "_lockedNote_1eb1u_84", Ge = {
  root: ow,
  track: lw,
  thumb: iw,
  labelHidden: sw,
  label: cw,
  lockedNote: dw
};
function uw(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function hw(e) {
  return e ? `${Ge.label} ${Ge.labelHidden}` : Ge.label;
}
function mw(e, t, a) {
  return e && !t && a ? a : void 0;
}
function ww(e, t, a, r) {
  return { "aria-describedby": Dt(rt(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function fw({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ve({ label: e, checked: t, onChange: a, disabled: r, locked: o, describedBy: i, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, w = Ae(), { on: f, off: N } = uw(t, r, o, w !== null), k = mw(N, w !== null, c);
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
        ...ww(h, i, w, k),
        className: `${Ge.track} ward-switch`,
        "data-on": f,
        "data-locked": o ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!f)),
        children: /* @__PURE__ */ n("span", { className: Ge.thumb })
      }
    ),
    /* @__PURE__ */ l("label", { id: d, htmlFor: u, className: hw(s), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ge.lockedNote, children: "always on" })
    ] }),
    /* @__PURE__ */ n(fw, { id: h, reason: k })
  ] });
}
const _w = "_bar_1vp69_2", vw = "_skip_1vp69_11", bw = "_mark_1vp69_22", pw = "_nav_1vp69_30", gw = "_list_1vp69_34", yw = "_select_1vp69_41", Nw = "_selectTrigger_1vp69_45", kw = "_dest_1vp69_52", $w = "_actor_1vp69_71", Cw = "_actorMark_1vp69_84", Sw = "_actorLabel_1vp69_89", Rw = "_tagline_1vp69_108", se = {
  bar: _w,
  skip: vw,
  mark: bw,
  nav: pw,
  list: gw,
  select: yw,
  selectTrigger: Nw,
  dest: kw,
  actor: $w,
  actorMark: Cw,
  actorLabel: Sw,
  tagline: Rw
};
function Tw(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function xw(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function ZT({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: o, onNavigate: i, skipTo: s = "main" }) {
  const c = xw(r);
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
        Ha,
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
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: Tw(c) })
    ] })
  ] });
}
const Lw = "_tree_zzoob_2", Aw = "_item_zzoob_6", Ew = "_row_zzoob_10", Iw = "_button_zzoob_22", It = {
  tree: Lw,
  item: Aw,
  row: Ew,
  button: Iw
}, rr = Ne(null);
function Mw({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Ht({ orientation: "vertical" });
  return /* @__PURE__ */ n(rr.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: It.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const Bw = { ArrowRight: !0, ArrowLeft: !1 };
function ea(e) {
  return e ? !0 : void 0;
}
function jw(e, t) {
  const a = Bw[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function Pw(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function qw(e) {
  const t = [It.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function Hw(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Ow(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Dw(e) {
  return typeof e == "string" ? e : void 0;
}
function Fw({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function zw({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function or(e) {
  const t = ye(rr);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = Hw(e);
  return /* @__PURE__ */ l("li", { className: It.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: qw(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": ea(e.unresolved),
        "data-inherited": ea(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${It.button} ward-treeitem-btn`,
            onClick: () => Pw(e),
            onKeyDown: (r) => jw(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Ow(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Dw(e.label), children: e.label }),
              /* @__PURE__ */ n(Fw, { value: e.detail }),
              /* @__PURE__ */ n(zw, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Ww = "_frame_gxspk_2", Kw = "_subjectRail_gxspk_22", Gw = "_subject_gxspk_22", Uw = "_rail_gxspk_42", Vw = "_record_gxspk_57", Yw = "_recordBody_gxspk_102", Jw = "_stageGrid_gxspk_157", Qw = "_band_gxspk_171", Xw = "_bandBody_gxspk_179", Zw = "_bandActions_gxspk_184", ef = "_scroller_gxspk_192", tf = "_board_gxspk_219", nf = "_lanes_gxspk_228", af = "_cardGrid_gxspk_262", ee = {
  frame: Ww,
  subjectRail: Kw,
  subject: Gw,
  rail: Uw,
  record: Vw,
  recordBody: Yw,
  stageGrid: Jw,
  band: Qw,
  bandBody: Xw,
  bandActions: Zw,
  scroller: ef,
  board: tf,
  lanes: nf,
  cardGrid: af
};
function ex({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: ee.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function ta(e) {
  return e ? "true" : void 0;
}
function tx({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: ee.subjectRail, "data-ward-subject-rail": a, "data-ruled": ta(i), children: [
    /* @__PURE__ */ n("div", { className: ee.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ee.rail, "data-sticky": ta(o), "aria-label": r, children: t })
  ] });
}
function nx({ title: e, children: t, note: a, trailing: r, pad: o = "block", label: i, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(Xn, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ l("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(Xn, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: ee.recordBody, "data-pad": o, "data-measure": c, children: t })
  ] });
}
const rf = "_form_1j8ub_2", of = "_fields_1j8ub_9", lf = "_actions_1j8ub_19", Jt = {
  form: rf,
  fields: of,
  actions: lf
};
function ax({ label: e, children: t, actions: a, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: Jt.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Jt.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: Jt.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function rx({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ l("section", { className: ee.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ee.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: ee.bandActions, children: t })
  ] });
}
const sf = "(max-width: 767.98px)";
function $n({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(bn, { className: ee.scroller, label: e, count: a ?? Qr.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function cf({ lanes: e, label: t, laneLabel: a }) {
  const [r, o] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ l("div", { className: ee.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(q, { kind: "select", label: a, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ n($n, { label: t, children: i == null ? void 0 : i.content })
  ] });
}
function df({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: ee.board, "data-ward-board": "", children: /* @__PURE__ */ n($n, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(ba, { children: a.content }, a.id)) }) });
}
function ox({ children: e, label: t = "Workflow board", lanes: a, laneLabel: r = "Column" }) {
  const o = ht(sf);
  return a === void 0 ? /* @__PURE__ */ n($n, { label: t, children: e }) : o ? /* @__PURE__ */ n(cf, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(df, { lanes: a, label: t });
}
function lx({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), i = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ n(bn, { className: ee.stageGrid, label: a, count: o, "data-ward-stage-grid": "", "data-floor": r, style: i, children: t });
}
function ix({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${ee.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const uf = "_block_6tv5x_3", hf = "_sentence_6tv5x_10", mf = "_meta_6tv5x_19", wf = "_ways_6tv5x_24", ff = "_action_6tv5x_38", _f = "_strip_6tv5x_42", vf = "_loading_6tv5x_61", bf = "_label_6tv5x_69", pf = "_counter_6tv5x_76", _e = {
  block: uf,
  sentence: hf,
  meta: mf,
  ways: wf,
  action: ff,
  strip: _f,
  loading: vf,
  label: bf,
  counter: pf
};
function gf({ action: e }) {
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
    /* @__PURE__ */ n(gf, { action: t })
  ] });
}
function yf(e) {
  return /* @__PURE__ */ n(Wt, { ...e, kind: "ward-emptystate" });
}
function sx({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(Wt, { sentence: e, action: a, children: /* @__PURE__ */ l("p", { className: _e.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function Nf({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${_e.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function cx({ ways: e, ...t }) {
  return /* @__PURE__ */ n(Wt, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(Nf, { ways: e }) });
}
function dx({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(Wt, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ l("p", { className: _e.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function ux({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ l("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function hx({ queued: e, since: t }) {
  return /* @__PURE__ */ l("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function mx({ label: e, startedAt: t }) {
  const a = _(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = p(!1);
  S(() => {
    const s = window.setTimeout(() => o(!0), be.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = _n(a.current, r);
  return /* @__PURE__ */ l("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: _e.counter, children: wn(i) }) : null
  ] });
}
const kf = "_note_cigdt_2", $f = {
  note: kf
};
function Cf({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ l("p", { className: $f.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const Sf = "_card_k7btg_3", Rf = "_hit_k7btg_31", Tf = "_head_k7btg_44", xf = "_title_k7btg_51", Lf = "_meta_k7btg_57", Af = "_since_k7btg_66", Ef = "_sep_k7btg_76", If = "_fields_k7btg_80", Mf = "_field_k7btg_80", Bf = "_last_k7btg_98", jf = "_reason_k7btg_110", de = {
  card: Sf,
  hit: Rf,
  head: Tf,
  title: xf,
  meta: Lf,
  since: Af,
  sep: Ef,
  fields: If,
  field: Mf,
  last: Bf,
  reason: jf
}, Pf = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function qf(e, t, a) {
  const r = Ct(e, "blue"), o = Ct(e, "orange"), i = Ct(e, "green"), s = _(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: o, green: i };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Pf[d.type];
      u && c[u]();
    });
  }, [r, a, i, t, o]);
}
const Hf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Of(e, t) {
  return Hf[t](e);
}
function Df({ item: e, connection: t }) {
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
function Ff({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ l("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function zf({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Wf({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: de.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: de.field, children: Of(e, a) }, a)) });
}
const cn = (e) => e ? !0 : void 0;
function Kf(e) {
  return { "--stream": ge(e.streamStep, "id") };
}
function Gf(e, t, a) {
  e == null || e(t, a);
}
function Uf(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Vf({ item: e, stale: t }) {
  var r, o;
  const a = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: de.last, "data-stale": cn(t), children: a }) : null;
}
function Kt(e) {
  const t = e.fields ?? [], a = e.item, r = _(null);
  qf(r, a.key, e.feed);
  const o = Uf(e.feed), i = Kf(a);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: de.card,
      style: i,
      "data-selected": cn(e.selected),
      "data-flagged": cn(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: de.hit, onClick: (s) => Gf(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(Ff, { item: a }),
        /* @__PURE__ */ n(at, { as: "p", className: de.title, text: a.title }),
        /* @__PURE__ */ n(Df, { item: a, connection: o }),
        /* @__PURE__ */ n(zf, { reason: a.blockedReason }),
        /* @__PURE__ */ n(Wf, { item: a, fields: t }),
        /* @__PURE__ */ n(Vf, { item: a, stale: o === "stale" })
      ]
    }
  );
}
const Yf = "_column_1j8bi_3", Jf = "_head_1j8bi_21", Qf = "_label_1j8bi_30", Xf = "_count_1j8bi_39", Zf = "_list_1j8bi_53", dt = {
  column: Yf,
  head: Jf,
  label: Qf,
  count: Xf,
  list: Zf
};
function lr(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function e_({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ l("div", { className: dt.head, children: [
    /* @__PURE__ */ n("h2", { className: dt.label, id: a, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ l("span", { className: dt.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function t_(e) {
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
function n_({ column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && t.length > e.cap, w = lr(t, r);
  return /* @__PURE__ */ l("section", { className: dt.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(e_, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(t_, { column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n(Cf, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const a_ = "_foot_cs4jr_2", r_ = "_note_cs4jr_13", o_ = "_link_cs4jr_19", Qt = {
  foot: a_,
  note: r_,
  link: o_
};
function wx({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: Qt.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Qt.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Qt.link} ward-target`, href: A(e), children: "Configure board" })
  ] });
}
const l_ = "_head_1tfi5_3", i_ = "_identity_1tfi5_12", s_ = "_titleRow_1tfi5_18", c_ = "_title_1tfi5_18", d_ = "_key_1tfi5_35", u_ = "_rollup_1tfi5_45", h_ = "_tools_1tfi5_53", m_ = "_swatch_1tfi5_101", w_ = "_mark_1tfi5_108", Se = {
  head: l_,
  identity: i_,
  titleRow: s_,
  title: c_,
  key: d_,
  rollup: u_,
  tools: h_,
  swatch: m_,
  mark: w_
}, na = "initials:";
function f_(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function __(e) {
  const t = [f_(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function v_(e) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ l("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    __(e)
  ] });
}
function b_(e) {
  return e.startsWith(na) ? e.slice(na.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function p_({ markRef: e, streamStep: t }) {
  const a = { "--stream": ge(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Se.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: b_(e) }) : /* @__PURE__ */ n("span", { className: Se.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function g_({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function fx({
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
        /* @__PURE__ */ n(p_, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Se.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Se.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Se.rollup, "aria-live": "polite", children: v_(t) })
    ] }),
    /* @__PURE__ */ l("div", { className: Se.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(g_, { owners: o, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(kn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const y_ = "_head_1sejb_14", N_ = "_line_1sejb_15", k_ = "_cHandle_1sejb_36", $_ = "_cName_1sejb_41", C_ = "_nameLine_1sejb_49", S_ = "_cLabel_1sejb_56", R_ = "_cCap_1sejb_61", T_ = "_cShown_1sejb_66", x_ = "_name_1sejb_49", L_ = "_noCap_1sejb_88", A_ = "_state_1sejb_102", E_ = "_handle_1sejb_111", I_ = "_sub_1sejb_137", O = {
  head: y_,
  line: N_,
  cHandle: k_,
  cName: $_,
  nameLine: C_,
  cLabel: S_,
  cCap: R_,
  cShown: T_,
  name: x_,
  noCap: L_,
  state: A_,
  handle: E_,
  sub: I_
}, M_ = "can't be hidden or collapsed", B_ = "terminal · counted, not a column", j_ = "A human gate is always shown, so people see what waits for them.", P_ = "A terminal stage is counted, not shown as a column.";
function _x() {
  return /* @__PURE__ */ l("div", { className: O.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: O.cHandle }),
    /* @__PURE__ */ n("span", { className: O.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: O.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: O.cShown, children: "Shown" })
  ] });
}
function q_(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function H_(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function aa(e) {
  return e.gate ? M_ : e.terminal ? B_ : H_(e.agentsMounted);
}
function O_(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function D_({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: O.cName, children: [
    /* @__PURE__ */ l("span", { className: O.nameLine, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    aa(e) && /* @__PURE__ */ n("span", { className: O.sub, children: aa(e) })
  ] });
}
function F_(e) {
  return e === void 0 ? "" : String(e);
}
function z_(e) {
  return e === "" ? void 0 : Number(e);
}
function W_({ name: e, onReorder: t }) {
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
      onKeyDown: (r) => !a && O_(r, t),
      children: "⠿"
    }
  ) });
}
function K_({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${O.cCap} ${O.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: O.cCap, children: /* @__PURE__ */ n(q, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: F_(t.cap), onChange: (r) => a({ ...t, cap: z_(r) }) }) });
}
function G_(e) {
  return e.gate ? j_ : e.terminal ? P_ : void 0;
}
function U_({ stage: e, config: t, onChange: a }) {
  const r = Ae() !== null, o = q_(e, t.shown), i = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ l("span", { className: O.cShown, children: [
    /* @__PURE__ */ n(Ve, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, disabledReason: G_(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: O.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!o.shown), children: o.state })
  ] });
}
function V_(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function vx({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: O.line, "data-kind": V_(e), children: [
    /* @__PURE__ */ n(W_, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(D_, { stage: e }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: /* @__PURE__ */ n(q, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (o) => a({ ...t, label: o }) }) }),
    /* @__PURE__ */ n(K_, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(U_, { stage: e, config: t, onChange: a })
  ] });
}
const Y_ = "_body_8qsv9_2", J_ = "_head_8qsv9_9", Q_ = "_summary_8qsv9_19", X_ = "_block_8qsv9_20", Z_ = "_actionsBlock_8qsv9_21", ev = "_title_8qsv9_41", tv = "_note_8qsv9_46", nv = "_k_8qsv9_51", av = "_kv_8qsv9_58", rv = "_row_8qsv9_64", ov = "_label_8qsv9_75", lv = "_value_8qsv9_84", iv = "_quote_8qsv9_90", sv = "_actions_8qsv9_21", cv = "_resolve_8qsv9_111", F = {
  body: Y_,
  head: J_,
  summary: Q_,
  block: X_,
  actionsBlock: Z_,
  title: ev,
  note: tv,
  k: nv,
  kv: av,
  row: rv,
  label: ov,
  value: lv,
  quote: iv,
  actions: sv,
  resolve: cv
};
function dv(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function uv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function hv(e) {
  const t = _t(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function mv(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function wv(e, t, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Ft(hv(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...dv(e),
    ...mv(a),
    ...uv(e, t)
  ];
}
function fv({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: F.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: F.k, children: t }),
    e
  ] });
}
function _v(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function vv({ item: e, showKey: t }) {
  const a = _v(e);
  return !t && !a ? null : /* @__PURE__ */ l("div", { className: F.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function bv({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: F.block, children: [
    /* @__PURE__ */ n("p", { className: F.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: F.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: F.note, children: e.agentMeta })
  ] }) : null;
}
function bx({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: o, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), w = wv(e, o, d);
  return /* @__PURE__ */ n(ot, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: F.body, children: [
    /* @__PURE__ */ n(vv, { item: e, showKey: u }),
    /* @__PURE__ */ l("div", { className: F.summary, children: [
      /* @__PURE__ */ n("h2", { className: F.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: F.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: F.kv, children: w.map(([f, N, k]) => /* @__PURE__ */ l("div", { className: F.row, children: [
      /* @__PURE__ */ n("dt", { className: F.label, children: f }),
      /* @__PURE__ */ n("dd", { className: F.value, children: N })
    ] }, k ?? f)) }),
    /* @__PURE__ */ n(bv, { item: e }),
    /* @__PURE__ */ l("div", { className: F.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: F.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: F.note, children: c })
    ] }),
    /* @__PURE__ */ n(fv, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const pv = "_root_3azmy_2", gv = "_list_3azmy_7", yv = "_item_3azmy_12", Nv = "_box_3azmy_18", kv = "_text_3azmy_23", $v = "_note_3azmy_28", Je = {
  root: pv,
  list: gv,
  item: yv,
  box: Nv,
  text: kv,
  note: $v
};
function Gt({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ l("div", { className: Je.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${Je.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${Je.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Je.box, children: /* @__PURE__ */ n(Nn, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Je.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${Je.note} ward-checklist-note`, children: t })
  ] });
}
const Cv = "_rail_znbbp_2", Sv = "_k_znbbp_11", Rv = "_head_znbbp_19", Tv = "_section_znbbp_25", xv = "_card_znbbp_39", Lv = "_strip_znbbp_46", Av = "_skeleton_znbbp_60", Ev = "_skeletonLabel_znbbp_74", Iv = "_bar_znbbp_80", Mv = "_note_znbbp_89", fe = {
  rail: Cv,
  k: Sv,
  head: Rv,
  section: Tv,
  card: xv,
  strip: Lv,
  skeleton: Av,
  skeletonLabel: Ev,
  bar: Iv,
  note: Mv
};
function Bv(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Xt({ title: e, children: t }) {
  return /* @__PURE__ */ l("section", { className: fe.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: fe.k, children: e }),
    t
  ] });
}
function jv({ column: e, count: t }) {
  return /* @__PURE__ */ l("div", { className: fe.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: fe.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: fe.bar, "aria-hidden": "true" }, r))
  ] });
}
function Pv({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(n_, { column: o, items: t.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, o.id));
}
function qv(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Pv, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(jv, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function px(e) {
  const t = Bv(e.onOpen), a = lr(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: fe.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${fe.k} ${fe.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Xt, { title: "Card", children: /* @__PURE__ */ n("div", { className: fe.card, children: a && /* @__PURE__ */ n(Kt, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ l(Xt, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: fe.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(qv, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Xt, { title: "Effect of this config", children: /* @__PURE__ */ n(Gt, { items: e.effects, density: "compact" }) })
  ] });
}
function Hv(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function Ov(e) {
  return Math.ceil(e.length / 2);
}
function Dv(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function ir(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Fv(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const o = ir(e);
  o !== void 0 && a(o), r(Dv(e.type));
}
function zv(e, t, a, r, o) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (i) => Fv(i, a, r, o));
  }, [e, t, a, r, o]);
}
function Wv(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Kv(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Gv(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Uv(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(Ov(t ?? [])) + ")"
  };
}
function Vv(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Yv(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: le(e.cost) }) : null;
}
function Jv(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Qv(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function Xv(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function Zv(e, t) {
  return t === void 0 ? e : Hv(e, t.ref);
}
function eb(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function mt(e) {
  return e === !0 ? "true" : void 0;
}
function sr(e) {
  const t = e.item, a = t.run, r = a !== void 0, o = _(null), i = Ct(o), s = _(/* @__PURE__ */ new Set()), [c, d] = p(Wv(t));
  zv(e.feed, t.key, s, d, i);
  const u = Kv(t, r), h = Gv(t, a), w = Uv(t, e.fields), f = Xv(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...eb(e),
      className: "ward-workcard",
      "data-flagged": mt(t.flagged),
      "data-selected": mt(e.selected),
      style: w,
      ref: Zv(o, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        Vv(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          Yv(t, e.fields),
          Jv(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          Qv(a, c, e.connection, t.changedAt),
          f !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function tb({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function nb(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function ab(e, t, a) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function rb(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(tb, { count: e.items.length, cap: e.column.cap });
}
function ob(e, t) {
  return e.roving ?? t;
}
function lb(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function ib(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    sr,
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
function sb(e) {
  const t = y(), a = Ht({ orientation: "vertical" }), r = ob(e, a), o = nb(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": mt(o), "data-gate": mt(e.column.gate), children: [
    ab(e.column, e.items.length, t),
    rb(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...lb(e, a), children: ib(e, r) })
  ] });
}
function cb(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function db(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function ub(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function gx(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: cb(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      db(e),
      ub(e.onConfigure),
      /* @__PURE__ */ n(kn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function hb(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function mb(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ve, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ve, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function wb(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(x, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function yx(e) {
  const t = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": mt(hb(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: mb(e) }),
    /* @__PURE__ */ n(q, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(Aa, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    wb(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function Nx(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(sr, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(sb, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function fb(e, t) {
  const a = ir(e);
  a !== void 0 && t(a);
}
function _b(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => fb(r, a));
  }, [e, t, a]);
}
function vb(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function bb(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function pb(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function gb(e, t) {
  return /* @__PURE__ */ l(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function kx(e) {
  var s;
  const t = e.item, a = t.run, [r, o] = p((s = t.run) == null ? void 0 : s.lastStep);
  _b(e.feed, t.key, o);
  const i = [...vb(t), ...bb(t)];
  return /* @__PURE__ */ l(ot, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      pb(a, r)
    ] }),
    gb(t, e.actions)
  ] });
}
const yb = "_card_1nkkx_3", Nb = "_head_1nkkx_30", kb = "_mark_1nkkx_38", $b = "_name_1nkkx_50", Cb = "_chips_1nkkx_71", Sb = "_description_1nkkx_77", Rb = "_run_1nkkx_82", Tb = "_sep_1nkkx_91", xb = "_facts_1nkkx_97", Lb = "_fact_1nkkx_97", Ab = "_factLabel_1nkkx_111", Eb = "_factValue_1nkkx_115", ie = {
  card: yb,
  head: Nb,
  mark: kb,
  name: $b,
  chips: Cb,
  description: Sb,
  run: Rb,
  sep: Tb,
  facts: xb,
  fact: Lb,
  factLabel: Ab,
  factValue: Eb
}, Ib = { live: "done", draft: "running", paused: "meta" };
function Mb(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function Bb({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: Ib[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function jb({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function Pb({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function qb({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ l("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function Hb(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Ob({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: o, facts: i, className: s }) {
  const c = { "--stream": ge(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": d,
      className: Mb(s),
      style: c,
      "data-selected": d,
      "data-paused": Hb(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ l("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: A(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(jb, { description: e.description }),
        /* @__PURE__ */ n(Pb, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Bb, { versions: e.versions }),
        /* @__PURE__ */ n(qb, { facts: i })
      ]
    }
  );
}
const Db = "_list_4dcyc_2", Fb = "_row_4dcyc_11", zb = "_head_4dcyc_23", Wb = "_id_4dcyc_30", Kb = "_lock_4dcyc_35", Gb = "_reason_4dcyc_41", Ub = "_remove_4dcyc_46", Vb = "_clauses_4dcyc_50", Yb = "_clause_4dcyc_50", Jb = "_label_4dcyc_64", Qb = "_cell_4dcyc_71", Xb = "_value_4dcyc_76", ce = {
  list: Db,
  row: Fb,
  head: zb,
  id: Wb,
  lock: Kb,
  reason: Gb,
  remove: Ub,
  clauses: Vb,
  clause: Yb,
  label: Jb,
  cell: Qb,
  value: Xb
}, cr = Ne(!1);
function $x({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(cr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function Zb({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(q, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => a(e.key, o) });
}
function ep({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function tp({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ l("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(ep, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function ra(e, t) {
  return e.locked ? void 0 : t;
}
function Cx({ rule: e, onChange: t, onRemove: a }) {
  if (!ye(cr)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = ra(e, t);
  return /* @__PURE__ */ l("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(tp, { rule: e, onRemove: ra(e, a) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(Zb, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const np = "_ladder_1xdeh_2", ap = "_cell_1xdeh_7", rp = "_empty_1xdeh_26", op = "_name_1xdeh_34", lp = "_holder_1xdeh_40", ip = "_request_1xdeh_46", sp = "_swatches_1xdeh_51", cp = "_swatch_1xdeh_51", dp = "_tilesFrame_1xdeh_78", up = "_tiles_1xdeh_78", hp = "_tile_1xdeh_78", mp = "_bar_1xdeh_117", wp = "_hex_1xdeh_128", fp = "_note_1xdeh_138", B = {
  ladder: np,
  cell: ap,
  empty: rp,
  name: op,
  holder: lp,
  request: ip,
  swatches: sp,
  swatch: cp,
  tilesFrame: dp,
  tiles: up,
  tile: hp,
  bar: mp,
  hex: wp,
  note: fp
}, Sx = "not validated yet, pending a CVD matrix and dark stepping";
function _p(e) {
  return e.reserved ? "reserved" : wt(e.step) ? "validated" : "partial";
}
function dr(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function vp(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function bp({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Fe, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${B.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function pp(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function gp(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const oa = (e) => String(e).padStart(2, "0");
function yp(e, t, a) {
  return e === "reserved" ? "Reserved until revalidated" : a ? "yours" : t ?? dr(e, void 0);
}
function Np({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${B.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.hex} ward-ladder-hex`, children: r ? `step ${oa(e)}` : po(e) }),
    /* @__PURE__ */ n("span", { className: `${B.note} ward-ladder-note`, children: r ? a : `Step ${oa(e)} · ${a}` })
  ] });
}
function kp({ step: e, value: t, taken: a, onChange: r, presentation: o, disabled: i }) {
  const s = _p(e), c = dr(s, a), d = c !== "free", u = d || i, h = t === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, N = `${w} · ${o === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...gp(d, h, u), "data-validation": s, style: vp(e, s), onClick: f, onKeyDown: (E) => pp(E, f) }, label: N, name: w, holder: c, validation: s, note: yp(s, a, h), step: e.step };
}
const $p = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${B.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${B.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Np, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${B.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(bp, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${B.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${B.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Cp(e) {
  return $p[e.presentation](kp(e));
}
function Sp(e) {
  for (const t of e)
    if (!t.reserved && !Ot(t.step)) throw new Error("colour ladder renders token steps only");
}
function Rp() {
  return /* @__PURE__ */ l("div", { className: `${B.cell} ward-ladder-cell ${B.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${B.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${B.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Tp(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const xp = { list: B.ladder, swatches: B.swatches, tiles: B.tilesFrame };
function Lp() {
  return /* @__PURE__ */ l("div", { className: `${B.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${B.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${B.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Ap = { list: Rp, swatches: () => null, tiles: Lp };
function Ep(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function ur(e) {
  const t = e.takenBy ?? {}, a = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Sp(e.steps);
  const r = Tp(e), o = Ap[r], i = /* @__PURE__ */ l(x, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(Cp, { step: s, value: e.value, taken: t[s.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Ep(e.disabled === !0), className: `${xp[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: B.tiles, children: i }) : i });
}
const Ip = "_rail_s06lm_2", Mp = "_section_s06lm_12", Bp = "_sectionFlush_s06lm_22", jp = "_head_s06lm_26", Pp = "_headLabel_s06lm_34", qp = "_sample_s06lm_42", Hp = "_sampleLabel_s06lm_47", Op = "_sampleTitle_s06lm_54", Dp = "_sampleMeta_s06lm_59", Fp = "_trace_s06lm_65", zp = "_traceHead_s06lm_70", Wp = "_steps_s06lm_78", Kp = "_step_s06lm_78", Gp = "_stepTitle_s06lm_97", Up = "_hollow_s06lm_107", Vp = "_stepBody_s06lm_115", Yp = "_stepDetail_s06lm_127", Jp = "_publish_s06lm_132", Qp = "_reason_s06lm_138", Xp = "_note_s06lm_143", Zp = "_reveal_s06lm_148", $ = {
  rail: Ip,
  section: Mp,
  sectionFlush: Bp,
  head: jp,
  headLabel: Pp,
  sample: qp,
  sampleLabel: Hp,
  sampleTitle: Op,
  sampleMeta: Dp,
  trace: Fp,
  traceHead: zp,
  steps: Wp,
  step: Kp,
  stepTitle: Gp,
  hollow: Up,
  stepBody: Vp,
  stepDetail: Yp,
  publish: Jp,
  reason: Qp,
  note: Xp,
  reveal: Zp
}, la = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, eg = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, tg = { ok: "greenFill", finding: "orangeFill", action: "blue" }, ng = { notSimulated: "not simulated", running: "running" };
function ag(e) {
  return e.presentation === "foundry";
}
function rg(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const a = t.filter((r) => !r.met);
  return a.length > 0 ? `Publish is disabled: ${a.length} of ${t.length} gate conditions unmet: ${a[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function og(e, t) {
  var r;
  const a = eg[e.status];
  return a !== void 0 ? a : ((r = t.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function lg(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function ig(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function sg(e) {
  if (lg(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function cg(e) {
  const [t, a] = p(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function dg(e) {
  const t = ng[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(Fe, { size: 6, kind: tg[e.kind], label: e.kind });
}
function ug(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function hg(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function mg(e) {
  const { step: t } = e;
  return /* @__PURE__ */ l(cg, { kind: t.kind, children: [
    /* @__PURE__ */ n(dg, { kind: t.kind }),
    /* @__PURE__ */ l("span", { className: $.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: $.stepTitle, children: t.title }),
      /* @__PURE__ */ n(ug, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(hg, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function wg(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(ue(t)), a.join(" · ");
}
function hr(e) {
  const t = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.traceHead, id: t, children: wg(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: $.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(mg, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function fg(e) {
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
function _g(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function vg(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? ga(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(zt, { divided: !0, cells: t }) });
}
function bg(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: ga(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function pg(e) {
  const t = bg(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ l("p", { className: $.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(zt, { divided: !0, cells: t }) });
}
function mr(e) {
  const t = y();
  return e.reason !== null ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: `${$.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function gg(e) {
  return /* @__PURE__ */ l("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ n(mr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: $.note, children: e.note })
  ] });
}
function yg(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ n(mr, { reason: e.reason, onPublish: e.onPublish }) });
}
function wr(e) {
  return /* @__PURE__ */ l("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: la[e.run.status].role, label: la[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Ng(e, t) {
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
function kg(e) {
  var a;
  ig(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(wr, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(fg, { sample: e.run.sample }),
    /* @__PURE__ */ n(hr, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(vg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Gt, { items: e.checklist }) }),
    /* @__PURE__ */ n(gg, { reason: rg(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function $g(e) {
  var r;
  const t = Ng(e.run, e.feed);
  sg(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(wr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(_g, { sample: e.run.sample }),
    /* @__PURE__ */ n(hr, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(pg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Gt, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(yg, { reason: og(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function Rx(e) {
  return ag(e) ? /* @__PURE__ */ n($g, { ...e }) : /* @__PURE__ */ n(kg, { ...e });
}
const Cg = "_list_142ip_3", Sg = "_row_142ip_9", Rg = "_condition_142ip_18", Tg = "_action_142ip_24", Rt = {
  list: Cg,
  row: Sg,
  condition: Rg,
  action: Tg
}, fr = Ne(!1);
function Tx({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(fr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: Rt.list, "aria-label": t, children: e }) });
}
function xx({ rule: e }) {
  if (!ye(fr)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: Rt.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: Rt.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: Rt.action, children: e.then })
  ] });
}
const xg = "_move_tmppt_3", Lg = {
  move: xg
};
function dn(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [o] = r.splice(t, 1);
  return r.splice(a, 0, o), r;
}
function _r(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function vr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function ia(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function Ag(e) {
  return e === "up" ? "down" : "up";
}
function Eg(e, t) {
  const a = ia(e, t.id, t.direction) ?? ia(e, t.id, Ag(t.direction));
  a == null || a.focus();
}
function br() {
  const e = _(null), [t, a] = p(null), [r, o] = p("");
  return S(() => {
    e.current !== null && t !== null && Eg(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), o(c);
  } };
}
function pr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Mt({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${Lg.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const Ig = "_body_1jd1i_2", Mg = "_title_1jd1i_8", Bg = "_section_1jd1i_13", jg = "_legend_1jd1i_18", Pg = "_stages_1jd1i_26", qg = "_stage_1jd1i_26", Hg = "_stageIndex_1jd1i_44", Og = "_stageName_1jd1i_50", Dg = "_footer_1jd1i_59", Fg = "_note_1jd1i_66", zg = "_reason_1jd1i_71", Wg = "_actions_1jd1i_76", Kg = "_webHead_1jd1i_83", Gg = "_kicker_1jd1i_92", Ug = "_webTitle_1jd1i_99", Vg = "_webBody_1jd1i_105", Yg = "_webSection_1jd1i_109", Jg = "_sectionHead_1jd1i_121", Qg = "_sectionNote_1jd1i_129", Xg = "_formLabel_1jd1i_134", Zg = "_identityRow_1jd1i_139", ey = "_nameCell_1jd1i_145", ty = "_keyCell_1jd1i_150", ny = "_colourCell_1jd1i_154", ay = "_colourStatus_1jd1i_161", ry = "_webStages_1jd1i_166", oy = "_webStageList_1jd1i_172", ly = "_webStage_1jd1i_166", iy = "_webIndex_1jd1i_191", sy = "_webStageName_1jd1i_196", cy = "_webMoves_1jd1i_201", dy = "_addStage_1jd1i_215", uy = "_addStageButton_1jd1i_223", hy = "_addStageNote_1jd1i_231", my = "_webFooter_1jd1i_236", wy = "_webFooterNotes_1jd1i_244", fy = "_webNote_1jd1i_251", v = {
  body: Ig,
  title: Mg,
  section: Bg,
  legend: jg,
  stages: Pg,
  stage: qg,
  stageIndex: Hg,
  stageName: Og,
  footer: Dg,
  note: Fg,
  reason: zg,
  actions: Wg,
  webHead: Kg,
  kicker: Gg,
  webTitle: Ug,
  webBody: Vg,
  webSection: Yg,
  sectionHead: Jg,
  sectionNote: Qg,
  formLabel: Xg,
  identityRow: Zg,
  nameCell: ey,
  keyCell: ty,
  colourCell: ny,
  colourStatus: ay,
  webStages: ry,
  webStageList: oy,
  webStage: ly,
  webIndex: iy,
  webStageName: sy,
  webMoves: cy,
  addStage: dy,
  addStageButton: uy,
  addStageNote: hy,
  webFooter: my,
  webFooterNotes: wy,
  webNote: fy
}, _y = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], gr = "not in catalogue";
function vy(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${gr}` }, ...a];
}
function by({ stage: e, index: t, catalogue: a, onName: r }) {
  const o = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(q, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${gr}`;
  return /* @__PURE__ */ n(q, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: vy(a, e.name), invalid: i, onChange: r });
}
function yr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function py(e) {
  const t = _([]), a = _(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function gy({ id: e, stage: t, index: a, total: r, catalogue: o, onReplace: i, onMove: s }) {
  const c = yr(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: v.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: v.webStageName, children: /* @__PURE__ */ n(by, { stage: t, index: a, catalogue: o, onName: (u) => i({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(q, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: _y, onChange: (u) => i({ ...t, kind: u }) }),
    /* @__PURE__ */ l("span", { className: v.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(Mt, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(Mt, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function yy({ stages: e, onChange: t, catalogue: a }) {
  const r = py(e.length), o = br(), i = (c, d) => {
    const u = _r(c, d);
    r.current = dn(r.current, c, u), o.moved({ id: r.current[u], direction: d }, vr(yr(e[c], c), u, e.length)), t(dn(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ l("div", { className: v.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(gy, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(pr, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: v.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Ny = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], ky = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], $y = "A new stream starts as a draft. Nothing runs on it until you publish it.", Cy = "Create is disabled: name the stream and give it a key first.", Sy = "reorder with the ↑ ↓ buttons · min 2";
function Cn(e, t) {
  return !e.reserved && wt(e.step) && t[e.step] === void 0;
}
function Ry(e, t) {
  const a = e.find((r) => Cn(r, t));
  return a ? a.step : 1;
}
function Ty({ stages: e, onMove: t }) {
  const a = br(), r = (o, i) => {
    const s = _r(o, i);
    a.moved({ id: e[o].id, direction: i }, vr(e[o].name, s, e.length)), t(o, s);
  };
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: v.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: v.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: v.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(Mt, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(Mt, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(pr, { text: a.announcement })
  ] });
}
function xy({ reason: e, onCreate: t, onDraft: a }) {
  const r = y();
  return /* @__PURE__ */ l("div", { className: v.footer, children: [
    /* @__PURE__ */ n("p", { className: v.note, children: $y }),
    e && /* @__PURE__ */ n("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: v.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function Ly(e, t) {
  return e !== "" && t !== "" ? null : Cy;
}
function Ay(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: o = ky, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = y(), [h, w] = p(""), [f, N] = p(""), [k, E] = p(t[0].value), [H, me] = p(() => Ry(a, r)), [re, Ee] = p(e.stages ?? Ny), [Ye, T] = p(o[0].value), J = { name: h, key: f, streamStep: H, owner: k, stages: re, policy: Ye }, ke = Ly(h, f);
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
      /* @__PURE__ */ n(ur, { label: "Stream colour", steps: a, value: H, onChange: me, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ n(Ty, { stages: re, onMove: (ze, Yr) => Ee(dn(re, ze, Yr)) })
    ] }),
    /* @__PURE__ */ n(er, { legend: "Loop policy", options: o, value: Ye, onChange: T }),
    /* @__PURE__ */ n(xy, { reason: ke, onCreate: () => i(J), onDraft: () => s(J) })
  ] }) });
}
const Nr = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Ey = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Iy(e, t, a, r, o, i) {
  var c;
  const s = ((c = Nr.find((d) => d.value === o)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: i };
}
function My(e, t) {
  return By(e) && jy(e, t) && Py(e);
}
function By(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function jy(e, t) {
  return e.colourStep === null || Cn({ step: e.colourStep }, t);
}
function Py(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function qy(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : Cn({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Hy({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function Oy({ ready: e, draft: t, agentStage: a, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: v.webFooter, children: [
    /* @__PURE__ */ l("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ n(Hy, { stage: a }),
      !e && /* @__PURE__ */ n("p", { id: i, className: v.reason, children: Ey })
    ] }),
    o && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => o(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Dy({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: v.webHead, children: [
    /* @__PURE__ */ n("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function Fy({ name: e, setName: t, streamKey: a, setKey: r, colour: o, owner: i }) {
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
function zy(e) {
  const t = y(), a = y(), r = e.takenBy ?? {}, [o, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [f, N] = p("relay"), [k, E] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), H = Iy(o, s, d, h, f, k), me = My(H, r), re = k.find((T) => T.kind === "agent" && T.name.trim() !== ""), Ee = /* @__PURE__ */ l("div", { className: v.colourCell, children: [
    /* @__PURE__ */ n("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(ur, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ye = /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: v.colourStatus, "data-colour-status": "", children: qy(h, r) }),
    /* @__PURE__ */ n(q, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((T) => ({ value: T, label: T })), onChange: u })
  ] });
  return /* @__PURE__ */ l(ot, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Dy, { titleId: a }),
    /* @__PURE__ */ l("div", { className: v.webBody, children: [
      /* @__PURE__ */ n(Fy, { name: o, setName: i, streamKey: s, setKey: c, colour: Ee, owner: Ye }),
      e.fields && /* @__PURE__ */ n("section", { className: v.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ l("section", { className: v.webSection, children: [
        /* @__PURE__ */ l("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: v.sectionNote, children: Sy })
        ] }),
        /* @__PURE__ */ n(yy, { stages: k, onChange: E })
      ] }),
      /* @__PURE__ */ n("section", { className: v.webSection, children: /* @__PURE__ */ n(er, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: Nr, onChange: N }) }),
      /* @__PURE__ */ n(Oy, { ready: me, draft: H, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function Lx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(zy, { ...e }) : /* @__PURE__ */ n(Ay, { ...e });
}
const Wy = "_row_bs8hc_2", Ky = "_cell_bs8hc_6", Gy = "_condition_bs8hc_11", Uy = "_action_bs8hc_18", Vy = "_contract_bs8hc_24", Yy = "_contractCondition_bs8hc_33", Jy = "_contractAction_bs8hc_39", ne = {
  row: Wy,
  cell: Ky,
  condition: Gy,
  action: Uy,
  contract: Vy,
  contractCondition: Yy,
  contractAction: Jy
}, kr = ["advance", "block", "escalate", "requestReview"], sa = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Bt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Sn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ne.action, children: sa[e.then] }) : /* @__PURE__ */ n(
    q,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => t({ ...e, then: o }),
      options: kr.map((o) => ({ value: o, label: sa[o] }))
    }
  );
}
function Qy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n("span", { className: ne.condition, title: Bt(e, r), children: Bt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: Sn(e, t, a) })
  ] });
}
function Xy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ l("td", { className: ne.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ne.condition, children: Bt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: Sn(e, t, a) })
  ] });
}
function Zy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: ne.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ne.contractCondition, children: Bt(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ne.contractAction, children: Sn(e, t, a, !0) })
  ] });
}
const eN = { two: Xy, four: Qy, contract: Zy };
function Ax(e) {
  var a;
  if (!kr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = eN[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const tN = "_column_g1uat_2", nN = "_head_g1uat_17", aN = "_index_g1uat_23", rN = "_name_g1uat_29", oN = "_meta_g1uat_38", lN = "_mono_g1uat_43", iN = "_gate_g1uat_50", sN = "_reviewersLabel_g1uat_57", cN = "_reviewers_g1uat_57", dN = "_reviewer_g1uat_57", uN = "_agents_g1uat_74", hN = "_workflowColumn_g1uat_79", mN = "_workflowHead_g1uat_96", wN = "_stageRow_g1uat_102", fN = "_stageLabel_g1uat_109", _N = "_workflowTitle_g1uat_116", vN = "_workflowMeta_g1uat_122", bN = "_workflowGate_g1uat_127", pN = "_gateNote_g1uat_135", gN = "_cardNote_g1uat_140", yN = "_reviewerList_g1uat_145", NN = "_reviewerRow_g1uat_151", kN = "_reviewerMark_g1uat_157", $N = "_reviewerName_g1uat_167", CN = "_terminalCard_g1uat_173", SN = "_terminalCount_g1uat_182", RN = "_workflowAgents_g1uat_188", TN = "_mount_g1uat_194", R = {
  column: tN,
  head: nN,
  index: aN,
  name: rN,
  meta: oN,
  mono: lN,
  gate: iN,
  reviewersLabel: sN,
  reviewers: cN,
  reviewer: dN,
  agents: uN,
  workflowColumn: hN,
  workflowHead: mN,
  stageRow: wN,
  stageLabel: fN,
  workflowTitle: _N,
  workflowMeta: vN,
  workflowGate: bN,
  gateNote: pN,
  cardNote: gN,
  reviewerList: yN,
  reviewerRow: NN,
  reviewerMark: kN,
  reviewerName: $N,
  terminalCard: CN,
  terminalCount: SN,
  workflowAgents: RN,
  mount: TN
}, xN = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function Rn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function $r(e) {
  return `${Math.round(e * 100)}%`;
}
function LN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(zt, { cells: [
      { value: $r(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function AN({ stage: e }) {
  return /* @__PURE__ */ n(zt, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: Rn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function EN({ stage: e, titleId: t }) {
  return /* @__PURE__ */ l("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: xN[e.kind] })
  ] });
}
function IN({ stage: e }) {
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
function MN({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(LN, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(AN, { stage: e }) : null;
}
function BN({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function jN({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const o = y(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: R.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(EN, { stage: e, titleId: o }),
    /* @__PURE__ */ n(IN, { stage: e }),
    /* @__PURE__ */ n(MN, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(Ob, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(BN, { onMount: a })
  ] });
}
const PN = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function qN({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ l("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function HN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: R.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ n(qN, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: $r(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function ON(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function DN({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: Rn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: ON(e.rolledBackThisWeek) })
  ] });
}
function FN(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function zN(e) {
  if (e.kind === "terminal") return `${Rn(e.closedThisWeek)} this week`;
  const t = FN(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function WN({ stage: e, titleId: t }) {
  const a = PN[e.kind];
  return /* @__PURE__ */ l("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: R.stageRow, children: [
      /* @__PURE__ */ l("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: zN(e) })
  ] });
}
function KN(e) {
  return e === "entry" || e === "agent";
}
function GN({ stage: e, onMount: t }) {
  return t === void 0 || !KN(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Mount agent" });
}
function UN({ stage: e, agentCards: t, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ l("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(WN, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(HN, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(DN, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(GN, { stage: e, onMount: a })
  ] });
}
function VN(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function Ex(e) {
  return VN(e) ? /* @__PURE__ */ n(UN, { ...e }) : /* @__PURE__ */ n(jN, { ...e });
}
const YN = "_row_1tdra_6", JN = "_name_1tdra_12", QN = "_compactRow_1tdra_13", XN = "_compactName_1tdra_13", ZN = "_cell_1tdra_30", e1 = "_chain_1tdra_45", t1 = "_owner_1tdra_51", n1 = "_mono_1tdra_57", a1 = "_compactCell_1tdra_79", r1 = "_stack_1tdra_96", o1 = "_stat_1tdra_103", l1 = "_identityLine_1tdra_110", i1 = "_identity_1tdra_110", s1 = "_ownerLine_1tdra_140", c1 = "_link_1tdra_160", d1 = "_gateMark_1tdra_166", u1 = "_emptyChain_1tdra_171", h1 = "_arrow_1tdra_177", m1 = "_muted_1tdra_182", w1 = "_define_1tdra_187", f1 = "_statValue_1tdra_194", _1 = "_policyId_1tdra_200", v1 = "_sub_1tdra_205", g = {
  row: YN,
  name: JN,
  compactRow: QN,
  compactName: XN,
  cell: ZN,
  chain: e1,
  owner: t1,
  mono: n1,
  compactCell: a1,
  stack: r1,
  stat: o1,
  identityLine: l1,
  identity: i1,
  ownerLine: s1,
  link: c1,
  gateMark: d1,
  emptyChain: u1,
  arrow: h1,
  muted: m1,
  define: w1,
  statValue: f1,
  policyId: _1,
  sub: v1
};
function Cr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function b1(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function p1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Sr(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function g1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Sr(e.members)}`;
}
function y1(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ l("span", { className: g.stack, children: [
    /* @__PURE__ */ l("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: A(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: g1(e) })
  ] }) });
}
function Rr({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ l(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function N1(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = _t(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function k1({ stages: e, streamStep: t }) {
  const a = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((o, i) => /* @__PURE__ */ l("span", { className: g.link, children: [
    /* @__PURE__ */ n(Rr, { name: o.name, gate: o.gate === !0, look: N1(i, a, t), size: "tag" }),
    i === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${i}`)) });
}
function $1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ l("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : k1(e) });
}
function Tr(e) {
  return e === void 0 ? void 0 : !0;
}
function ca(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Tr(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function C1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function S1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function R1({ stream: e, href: t, presentation: a }) {
  const r = p1(a.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, onClick: Cr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ge(e.streamStep, "chip") }, children: [
    y1(e, t),
    $1(e),
    ca(S1(e.agents), e.agents === void 0 ? void 0 : b1(e.agents), "—"),
    C1(e.policy),
    ca(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function T1(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function Ix(e) {
  if (T1(e)) return R1(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ l("tr", { className: g.row, onClick: Cr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ l("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: A(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...Ft(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(Rr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: g.mono, children: Sr(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": Tr(t.inFlightHint), children: ae(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : ue(t.p50) }) })
  ] });
}
const x1 = "_row_2u4ll_2", L1 = "_name_2u4ll_16", A1 = "_scope_2u4ll_24", jt = {
  row: x1,
  name: L1,
  scope: A1
};
function Tn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function E1(e) {
  return e === void 0 ? `${jt.row} ward-toolrow` : `${jt.row} ward-toolrow ${e}`;
}
function I1(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function M1({ id: e, reasonId: t, tool: a, state: r, onChange: o }) {
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
function B1({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: Tn(e) });
}
function j1({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${jt.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function P1(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function Mx({ tool: e, onChange: t, presentation: a }) {
  const r = y(), o = y(), i = I1(e, a), s = P1(a);
  return /* @__PURE__ */ l(s, { className: E1(a == null ? void 0 : a.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(M1, { id: r, reasonId: o, tool: e, state: i, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${jt.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(j1, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(B1, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const q1 = "_strip_4ppv9_2", H1 = "_well_4ppv9_11", O1 = "_head_4ppv9_18", D1 = "_name_4ppv9_24", F1 = "_chart_4ppv9_32", z1 = "_segment_4ppv9_38", W1 = "_detailedChart_4ppv9_44", K1 = "_rail_4ppv9_57", G1 = "_section_4ppv9_63", U1 = "_label_4ppv9_74", V1 = "_note_4ppv9_91", V = {
  strip: q1,
  well: H1,
  head: O1,
  name: D1,
  chart: F1,
  segment: z1,
  detailedChart: W1,
  rail: K1,
  section: G1,
  label: U1,
  note: V1
}, Y1 = "No item in flight to preview.", J1 = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Q1 = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", un = [1, 2, 3, 4, 5, 6], Pt = 100;
function X1(e, t) {
  return t.has(e) ? ge(e, "id") : "var(--ward-color-line)";
}
function Z1({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: un.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: o * Pt,
      y: "0",
      width: Pt,
      height: "8",
      fill: X1(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function ek(e) {
  const t = e.slice(0, un.length);
  for (; t.length < un.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function tk({ identities: e }) {
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
function xr(e) {
  return (t) => e == null ? void 0 : e(t);
}
function gt({ label: e, children: t }) {
  const a = y();
  return /* @__PURE__ */ l("section", { className: V.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: V.label, children: e }),
    t
  ] });
}
function nk({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: t ?? Y1 }) : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Kt, { item: { ...e, streamStep: _t(a.streamStep) }, onOpen: xr(r), feed: null }) });
}
function ak({ draft: e }) {
  const t = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: V.head, style: t, children: [
    /* @__PURE__ */ n(Fe, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Ft(e.key, e.streamStep) })
  ] });
}
function rk(e) {
  const t = ek(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ l("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(gt, { label: "Board card", children: /* @__PURE__ */ n(nk, { ...e, draft: a }) }),
    /* @__PURE__ */ n(gt, { label: "Streams index row", children: /* @__PURE__ */ n(ak, { draft: a }) }),
    /* @__PURE__ */ l(gt, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(tk, { identities: t }),
      /* @__PURE__ */ n("p", { className: V.note, children: J1 })
    ] }),
    /* @__PURE__ */ n(gt, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: Q1 }) })
  ] });
}
function ok({ draft: e, sample: t, streams: a, onOpen: r }) {
  const o = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: V.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: V.head, children: [
      /* @__PURE__ */ n(Fe, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Ft(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Kt, { item: { ...t, streamStep: e.streamStep }, onOpen: xr(r) }) }),
    /* @__PURE__ */ n(Z1, { draft: e, streams: a })
  ] });
}
function Bx(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(rk, { ...e }) : /* @__PURE__ */ n(ok, { ...e });
}
const lk = "_row_ixlg5_6", ik = "_headCell_ixlg5_10", sk = "_cell_ixlg5_11", ck = "_name_ixlg5_23", dk = "_consequence_ixlg5_29", uk = "_governed_ixlg5_36", hk = "_control_ixlg5_42", mk = "_byRole_ixlg5_48", wk = "_webControl_ixlg5_59", fk = "_webConsequence_ixlg5_65", _k = "_webGoverned_ixlg5_71", W = {
  row: lk,
  headCell: ik,
  cell: sk,
  name: ck,
  consequence: dk,
  governed: uk,
  control: hk,
  byRole: mk,
  webControl: wk,
  webConsequence: fk,
  webGoverned: _k
};
function vk({
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
function bk({ capability: e, cells: t, onChange: a }) {
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
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(vk, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function pk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function gk({ name: e, cell: t, onChange: a }) {
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
function yk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ l("tr", { className: W.row, children: [
    /* @__PURE__ */ l("td", { className: W.cell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${W.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(gk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webGoverned} ward-cellmeta`, children: pk(e) }) })
  ] });
}
function jx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(yk, { ...e }) : /* @__PURE__ */ n(bk, { ...e });
}
const Nk = "_row_vv64h_2", kk = "_cell_vv64h_6", $k = "_name_vv64h_25", Ck = "_note_vv64h_30", Sk = "_webName_vv64h_41", Rk = "_webMeta_vv64h_47", X = {
  row: Nk,
  cell: kk,
  name: $k,
  note: Ck,
  webName: Sk,
  webMeta: Rk
}, Lr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function Tk(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function xk({ component: e, onRestart: t }) {
  const a = y(), r = Lr[e.state], o = e.state === "drainFirst";
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
function Lk({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: Tk(e.state) });
}
function Ak({ component: e, onRestart: t }) {
  return /* @__PURE__ */ l("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { ...Lr[e.state] }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(Lk, { component: e, onRestart: t }) })
  ] });
}
function Px(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ak, { ...e }) : /* @__PURE__ */ n(xk, { ...e });
}
const Ek = "_row_jcm5k_7", Ik = "_cell_jcm5k_11", Mk = "_next_jcm5k_28", Bk = "_headCell_jcm5k_38", jk = "_webId_jcm5k_77", Pk = "_webPurpose_jcm5k_83", qk = "_webMeta_jcm5k_91", Hk = "_webUrgent_jcm5k_97", K = {
  row: Ek,
  cell: Ik,
  next: Mk,
  headCell: Bk,
  webId: jk,
  webPurpose: Pk,
  webMeta: qk,
  webUrgent: Hk
}, Ok = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, Dk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Ar = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Fk = Object.fromEntries(Ar.map((e) => [e.key, e]));
function Qe({ column: e, children: t }) {
  const a = Fk[e];
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
function qx() {
  return /* @__PURE__ */ n("tr", { children: Ar.map((e) => /* @__PURE__ */ n(
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
function zk({ cred: e }) {
  const t = Ok[e.state];
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n(Qe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Qe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Qe, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(Qe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Tn(e.cls) }) }),
    /* @__PURE__ */ n(Qe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Qe, { column: "next", children: /* @__PURE__ */ n("span", { className: K.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Wk({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${K.webMeta} ${K.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function Kk({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(Wk, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...Dk[e.state] }) })
  ] });
}
function Hx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Kk, { ...e }) : /* @__PURE__ */ n(zk, { ...e });
}
const Gk = "_card_lpp45_2", Uk = "_head_lpp45_11", Vk = "_env_lpp45_18", Yk = "_version_lpp45_25", Jk = "_meta_lpp45_32", Qk = "_webCard_lpp45_37", Xk = "_webRow_lpp45_47", Zk = "_webTitle_lpp45_55", e$ = "_webLine_lpp45_65", t$ = "_webVersion_lpp45_72", n$ = "_webMeta_lpp45_77", Q = {
  card: Gk,
  head: Uk,
  env: Vk,
  version: Yk,
  meta: Jk,
  webCard: Qk,
  webRow: Xk,
  webTitle: Zk,
  webLine: e$,
  webVersion: t$,
  webMeta: n$
}, da = { dev: "Dev", uat: "UAT", prod: "Prod" }, Er = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function a$({ env: e }) {
  const t = Er[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l("section", { className: Q.card, "aria-label": da[e.env], children: [
    /* @__PURE__ */ l("div", { className: Q.head, children: [
      /* @__PURE__ */ n("span", { className: Q.env, children: da[e.env] }),
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
function r$(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function o$(e) {
  return /* @__PURE__ */ l("article", { className: `${Q.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${Q.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Q.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Er[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Q.version} ${Q.webVersion} ${Q.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Q.meta} ${Q.webMeta} ${Q.webLine} ward-cellmeta`, children: r$(e) })
  ] });
}
function Ox(e) {
  return "presentation" in e ? /* @__PURE__ */ n(o$, { ...e }) : /* @__PURE__ */ n(a$, { ...e });
}
const l$ = "_panel_1hmja_2", i$ = "_line_1hmja_8", s$ = "_actions_1hmja_14", yt = {
  panel: l$,
  line: i$,
  actions: s$
};
function Dx(e) {
  return /* @__PURE__ */ l("div", { className: yt.panel, children: [
    /* @__PURE__ */ n("p", { className: yt.line, children: e.status }),
    /* @__PURE__ */ n(q, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: yt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: yt.line, children: e.note ?? "" })
  ] });
}
const c$ = "_upload_13fcl_2", d$ = "_preview_13fcl_7", u$ = "_mark_13fcl_17", h$ = "_empty_13fcl_22", m$ = "_actions_13fcl_28", w$ = "_input_13fcl_33", f$ = "_reasons_13fcl_41", _$ = "_reason_13fcl_41", v$ = "_accepted_13fcl_57", oe = {
  upload: c$,
  preview: d$,
  mark: u$,
  empty: h$,
  actions: m$,
  input: w$,
  reasons: f$,
  reason: _$,
  accepted: v$
}, Ir = 1.5, Mr = 22, qt = "script elements or event handlers", je = "links or external references", xe = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Ir}px at ${Mr}px`], b$ = [xe[1], xe[2], qt, je], p$ = /* @__PURE__ */ new Map([
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
]), g$ = "http://www.w3.org/2000/svg", y$ = "http://www.w3.org/2000/xmlns/", N$ = /* @__PURE__ */ new Set([
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
]), k$ = /* @__PURE__ */ new Set([
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
]), xn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, $$ = /url\s*\(|['"\\]/i;
function C$() {
  return { ok: !1, reasons: [xe[1]] };
}
function Br(e) {
  return e.namespaceURI === g$;
}
function S$(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && Br(t) ? t : null;
  } catch {
    return null;
  }
}
function R$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [xe[0]] : [];
}
function T$(e) {
  return p$.get(e.localName) ?? (e.localName.startsWith("animate") ? je : void 0);
}
function x$(e) {
  return $$.test(e.replace(xn, ""));
}
function L$(e) {
  return /^on/i.test(e.localName) ? qt : e.localName === "href" || x$(e.value) ? je : void 0;
}
function A$(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(T$(a));
    for (const r of Array.from(a.attributes)) t.add(L$(r));
  }
  return b$.filter((a) => t.has(a));
}
function E$(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((o) => Number.isFinite(o) && o > 0), 0), r = a > 0 ? Mr / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Ir;
  }) ? [xe[3]] : [];
}
function I$(e) {
  if (e.namespaceURI === y$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (k$.has(t) || t.startsWith("stroke"));
}
function M$(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && Br(t) && N$.has(t.localName);
}
function B$(e, t) {
  M$(t) ? t.nodeType === Node.ELEMENT_NODE && jr(t) : e.removeChild(t);
}
function jr(e) {
  for (const t of Array.from(e.attributes)) I$(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) B$(e, t);
  return e;
}
function j$(e) {
  return Array.from(e.matchAll(xn), (t) => t[2]).filter((t) => t !== "");
}
function P$(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function q$(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const i of j$(o.value)) a.has(i) || a.set(i, `${t}-${a.size}`);
  return a;
}
function H$(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(xn, (r, o, i) => {
      const s = t.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function O$(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = q$(a, t);
  for (const o of a) {
    const i = r.get(o.getAttribute("id") ?? "");
    i === void 0 ? o.removeAttribute("id") : o.setAttribute("id", i), H$(o, r);
  }
  return e;
}
function Fx(e) {
  const t = S$(e);
  if (t === null) return C$();
  const a = [...R$(t), ...A$(t), ...E$(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(O$(jr(t), P$(e))) };
}
const D$ = "Mark accepted.", F$ = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, z$ = new Set(Na.flatMap((e) => [ge(e, "id"), ge(e, "chip")]));
function W$(e) {
  return e !== void 0 && (F$.test(e) || z$.has(e)) ? e : void 0;
}
function K$({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: oe.preview, style: { "--mark": W$(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: oe.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: oe.empty }) });
}
function G$(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function U$(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function V$({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: oe.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("p", { className: oe.accepted, children: D$ }) }) : /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("ul", { className: oe.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: oe.reason, children: t }, t)) }) });
}
function Y$({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(V$, { result: e }) : /* @__PURE__ */ n("p", { className: `${oe.result} ${G$(e, a)}`, role: "status", children: U$(e, a) });
}
function ua(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function zx({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: o }) {
  const i = _(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ l("div", { className: oe.upload, children: [
    /* @__PURE__ */ n(K$, { current: e }),
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
      /* @__PURE__ */ n(b, { ...ua(o), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...ua(o), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(Y$, { result: s, presentation: r })
  ] });
}
const J$ = "_row_o3t6y_7", Q$ = "_cell_o3t6y_11", X$ = "_head_o3t6y_28", Z$ = "_name_o3t6y_34", e0 = "_pinned_o3t6y_42", t0 = "_headCell_o3t6y_49", n0 = "_webName_o3t6y_88", a0 = "_webMeta_o3t6y_95", r0 = "_webWarn_o3t6y_103", D = {
  row: J$,
  cell: Q$,
  head: X$,
  name: Z$,
  pinned: e0,
  headCell: t0,
  webName: n0,
  webMeta: a0,
  webWarn: r0
}, Ln = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Pr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], o0 = Object.fromEntries(Pr.map((e) => [e.key, e]));
function l0(e, t) {
  return `mcp.${e}.${t}`;
}
function i0(e) {
  return Object.keys(Ln).includes(e);
}
function s0(e) {
  return Ln[e !== void 0 && i0(e) ? e : "unknown"];
}
function lt({ column: e, children: t }) {
  const a = o0[e];
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
function Wx() {
  return /* @__PURE__ */ n("tr", { children: Pr.map((e) => /* @__PURE__ */ n(
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
function c0({ server: e }) {
  const t = Ln[e.connection];
  return /* @__PURE__ */ l("tr", { className: D.row, children: [
    /* @__PURE__ */ l(lt, { column: "name", children: [
      /* @__PURE__ */ l("span", { className: D.head, children: [
        /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Tn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ l("span", { className: D.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(lt, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(lt, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(lt, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(lt, { column: "tools", children: e.tools.map((a) => l0(e.name, a)).join(" · ") })
  ] });
}
function d0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function u0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function h0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${D.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e });
}
function m0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function w0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function f0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: D.row, children: [
    /* @__PURE__ */ l("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: `${D.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: d0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...u0(e) }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(h0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...s0(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: D.cell, children: [
      /* @__PURE__ */ n(m0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(w0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function Kx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(f0, { ...e }) : /* @__PURE__ */ n(c0, { ...e });
}
const _0 = "_row_1ibo7_2", v0 = "_headCell_1ibo7_14", b0 = "_cell_1ibo7_15", p0 = "_name_1ibo7_26", g0 = "_consequence_1ibo7_32", y0 = "_reason_1ibo7_38", N0 = "_value_1ibo7_44", k0 = "_webRow_1ibo7_60", $0 = "_webSetting_1ibo7_73", C0 = "_webName_1ibo7_81", S0 = "_webConsequence_1ibo7_89", R0 = "_webControl_1ibo7_95", T0 = "_webState_1ibo7_109", x0 = "_webChip_1ibo7_114", P = {
  row: _0,
  headCell: v0,
  cell: b0,
  name: p0,
  consequence: g0,
  reason: y0,
  value: N0,
  webRow: k0,
  webSetting: $0,
  webName: C0,
  webConsequence: S0,
  webControl: R0,
  webState: T0,
  webChip: x0
}, qr = 104, Hr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function L0({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ve, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(Xa, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: P.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function A0({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = y(), i = Hr[a], s = a === "locked";
  return /* @__PURE__ */ l("tr", { className: P.row, "data-inheritance": a, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: P.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(L0, { control: t, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: P.cell, style: { width: qr }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function Or(e, t) {
  return String(e ?? t);
}
function E0(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function I0(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? Or(e.value, "—");
}
function M0({ control: e, name: t, locked: a, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: P.webControl, children: [
    /* @__PURE__ */ n(Ve, { label: t, labelHidden: !0, checked: i, locked: a, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ n("span", { className: P.webState, "aria-hidden": "true", children: a || i ? "on" : "off" })
  ] });
}
function B0(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(M0, { ...e });
  const o = E0(t, a);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: P.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(Xa, { options: o, value: Or(t.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: I0(t) });
}
function j0({ setting: e, control: t, inheritance: a, reason: r, onChange: o, renderControl: i }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ l("div", { className: `${P.row} ${P.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ l("span", { className: P.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${P.name} ${P.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: s, className: `${P.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: P.webControl, children: i(s) }) : /* @__PURE__ */ n(B0, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${P.webChip} ward-policy-chip`, style: { width: qr }, children: /* @__PURE__ */ n(m, { ...Hr[a], size: "tag" }) })
  ] });
}
function Gx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(j0, { ...e }) : /* @__PURE__ */ n(A0, { ...e });
}
const P0 = "_label_h9m4w_7", q0 = "_name_h9m4w_15", H0 = "_column_h9m4w_24", O0 = "_webFrame_h9m4w_57", D0 = "_webHead_h9m4w_62", F0 = "_webHeadLabel_h9m4w_74", z0 = "_webLabel_h9m4w_117", W0 = "_webColumns_h9m4w_124", K0 = "_webGroup_h9m4w_130", G0 = "_webPeople_h9m4w_131", U0 = "_webVia_h9m4w_132", V0 = "_webMeta_h9m4w_161", G = {
  label: P0,
  name: q0,
  column: H0,
  webFrame: O0,
  webHead: D0,
  webHeadLabel: F0,
  webLabel: z0,
  webColumns: W0,
  webGroup: K0,
  webPeople: G0,
  webVia: U0,
  webMeta: V0
}, Y0 = {
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
function J0(e) {
  if (!e.matrixRole) return;
  const t = Y0[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function Q0({ node: e }) {
  const t = J0(e);
  return /* @__PURE__ */ l("span", { className: G.label, children: [
    /* @__PURE__ */ n("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ n(X0, { role: t, node: e }),
    /* @__PURE__ */ n(en, { column: Zt[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(en, { column: Zt[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(en, { column: Zt[2], children: e.requestedVia ?? "" })
  ] });
}
function X0({ role: e, node: t }) {
  return /* @__PURE__ */ l(x, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function Z0({ index: e, depth: t, node: a, expanded: r, leaf: o, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    or,
    {
      index: e,
      depth: t,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(Q0, { node: a }),
      children: s
    }
  );
}
function tn({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function eC({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(tn, { className: `${G.webMeta} ${G.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(tn, { className: `${G.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(tn, { className: `${G.webMeta} ${G.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function tC() {
  return /* @__PURE__ */ l("div", { className: G.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: G.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: G.webColumns, children: [
      /* @__PURE__ */ n("span", { className: G.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: G.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: G.webVia, children: "Requested via" })
    ] })
  ] });
}
function nC({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function aC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function rC({ rows: e, label: t }) {
  return /* @__PURE__ */ l("div", { className: G.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(tC, {}),
    /* @__PURE__ */ n(Mw, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      or,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(nC, { row: a }),
        detail: /* @__PURE__ */ n(eC, { row: a }),
        expanded: aC(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function Ux(e) {
  return "presentation" in e ? /* @__PURE__ */ n(rC, { ...e }) : /* @__PURE__ */ n(Z0, { ...e });
}
const oC = "_runbook_b9agc_2", lC = "_list_b9agc_7", iC = "_step_b9agc_15", sC = "_numeral_b9agc_21", cC = "_body_b9agc_28", dC = "_head_b9agc_34", uC = "_title_b9agc_40", hC = "_detail_b9agc_45", mC = "_actions_b9agc_50", wC = "_webList_b9agc_56", fC = "_webStep_b9agc_60", _C = "_webBody_b9agc_66", vC = "_webTitle_b9agc_74", bC = "_webDetail_b9agc_78", M = {
  runbook: oC,
  list: lC,
  step: iC,
  numeral: sC,
  body: cC,
  head: dC,
  title: uC,
  detail: hC,
  actions: mC,
  webList: wC,
  webStep: fC,
  webBody: _C,
  webTitle: vC,
  webDetail: bC
}, Dr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Fr(e) {
  return String(e + 1).padStart(2, "0");
}
function pC({ step: e, index: t, connection: a }) {
  const r = Dr[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: M.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: M.numeral, children: Fr(t) }),
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
function gC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: M.list, children: e.map((r, o) => /* @__PURE__ */ n(pC, { step: r, index: o, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: M.actions, children: t })
  ] });
}
function yC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ l("li", { className: `${M.step} ${M.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${M.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Fr(t) }),
    /* @__PURE__ */ l("span", { className: `${M.body} ${M.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${M.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${M.title} ${M.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Dr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${M.detail} ${M.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function NC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${M.list} ${M.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(yC, { step: r, index: o, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${M.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function Vx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(NC, { ...e }) : /* @__PURE__ */ n(gC, { ...e });
}
const kC = "_list_1gu6a_2", $C = "_check_1gu6a_10", CC = "_body_1gu6a_16", SC = "_text_1gu6a_23", RC = "_pending_1gu6a_32", TC = "_measured_1gu6a_37", et = {
  list: kC,
  check: $C,
  body: CC,
  text: SC,
  pending: RC,
  measured: TC
};
function xC(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function LC({ check: e }) {
  const t = xC(e.passed);
  return /* @__PURE__ */ l("li", { className: `${et.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Nn, { state: t.state, label: t.label }),
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
function Yx({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${et.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(LC, { check: t }, t.text)) });
}
const AC = "_root_y6bbq_2", EC = "_list_y6bbq_10", IC = "_line_y6bbq_32", MC = "_at_y6bbq_59", BC = "_text_y6bbq_63", jC = "_foot_y6bbq_67", PC = "_idle_y6bbq_79", qC = "_caret_y6bbq_87", HC = "_jump_y6bbq_94", ve = {
  root: AC,
  list: EC,
  line: IC,
  at: MC,
  text: BC,
  foot: jC,
  idle: PC,
  caret: qC,
  jump: HC
}, OC = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function An(e) {
  return Number.isNaN(Date.parse(e)) ? "" : OC.format(new Date(e));
}
const DC = { warn: "warning", ok: "ok" };
function FC({ kind: e }) {
  const t = DC[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function zC({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${An(e)}` });
}
function WC({ connection: e, idleSince: t, last: a, children: r }) {
  const o = [t, a == null ? void 0 : a.at, ""].find(Boolean), i = {
    stale: `no new events as of ${An(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${ve.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ve.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ve.idle, children: i }),
    /* @__PURE__ */ n(zC, { at: a == null ? void 0 : a.at }),
    r
  ] });
}
const KC = 8;
function GC(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > KC;
}
function UC({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const zr = Ne(null);
function Jx({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, o] = p(!1), i = va(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(zr.Provider, { value: i, children: a });
}
function VC() {
  const e = ye(zr), [t, a] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const YC = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function Qx({ lines: e, connection: t, idleSince: a, label: r = "Live activity", fixed: o }) {
  const i = _(null), [s, c] = p(0), [d, u] = VC(), [h, w] = p(!1), f = e.at(-1);
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
    /* @__PURE__ */ n("ol", { className: ve.list, ref: i, "aria-live": d ? "polite" : "off", "aria-label": r, ...YC(e.length, o), onScroll: (k) => w(GC(k.currentTarget)), children: e.map((k, E) => /* @__PURE__ */ l("li", { className: `${ve.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": E < s, children: [
      /* @__PURE__ */ n("span", { className: ve.at, children: An(k.at) }),
      /* @__PURE__ */ n(FC, { kind: k.kind }),
      /* @__PURE__ */ n("span", { className: ve.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${E}`)) }),
    /* @__PURE__ */ l(WC, { connection: t, idleSince: a, last: f, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(UC, { shown: h, onJump: N })
    ] })
  ] });
}
const JC = "_row_1k8wl_2", QC = "_head_1k8wl_14", XC = "_author_1k8wl_20", ZC = "_eta_1k8wl_25", eS = "_edited_1k8wl_26", tS = "_body_1k8wl_32", nS = "_reason_1k8wl_37", aS = "_actions_1k8wl_42", Ce = {
  row: JC,
  head: QC,
  author: XC,
  eta: ZC,
  edited: eS,
  body: tS,
  reason: nS,
  actions: aS
}, rS = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function oS(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function lS({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
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
function iS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Ce.reason, id: t, children: e })
  ] });
}
function sS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function cS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(lS, { ...e }) : /* @__PURE__ */ n(iS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function Xx(e) {
  const { comment: t } = e;
  sS(e);
  const a = y(), r = `${a}-unavailable`, o = rS[t.delivery];
  return /* @__PURE__ */ l("div", { className: `${Ce.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: Ce.head, children: [
      /* @__PURE__ */ n("span", { className: Ce.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: Ce.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Ce.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Ce.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Ce.reason, id: a, children: oS(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Ce.actions, children: /* @__PURE__ */ n(cS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const dS = "_root_rvhdw_2", uS = "_attach_rvhdw_11", hS = "_actions_rvhdw_17", mS = "_reply_rvhdw_23", wS = "_replyField_rvhdw_28", fS = "_send_rvhdw_54", _S = "_sendIcon_rvhdw_65", vS = "_sendsAs_rvhdw_75", He = {
  root: dS,
  attach: uS,
  actions: hS,
  reply: mS,
  replyField: wS,
  send: fS,
  sendIcon: _S,
  sendsAs: vS
};
function Wr({ value: e, onChange: t }) {
  const [a, r] = p("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function bS() {
  return /* @__PURE__ */ n("svg", { className: He.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function pS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function gS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [o, i] = Wr(e), s = y(), c = () => {
    o.trim() !== "" && r(a, o);
  }, d = (u) => {
    pS(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ l("div", { className: He.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: He.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ n(q, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: o, onChange: i, describedBy: s }),
      /* @__PURE__ */ l(b, { variant: "primary", className: He.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ n(bS, {}),
        /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: He.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function Zx(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(gS, { ...e }) : /* @__PURE__ */ n(yS, { ...e });
}
function yS(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: o, onPost: i, onDraft: s } = e, [c, d] = Wr(e);
  return /* @__PURE__ */ l("div", { className: He.root, children: [
    /* @__PURE__ */ n(q, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ l("div", { className: He.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    o && /* @__PURE__ */ n(
      Aa,
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
const NS = "_list_1yhks_2", kS = "_item_1yhks_6", $S = "_body_1yhks_22", CS = "_text_1yhks_28", SS = "_evidence_1yhks_37", RS = "_consequence_1yhks_49", TS = "_note_1yhks_54", Ue = {
  list: NS,
  item: kS,
  body: $S,
  text: CS,
  evidence: SS,
  consequence: RS,
  note: TS
};
function xS({ criterion: e }) {
  return /* @__PURE__ */ n(Fe, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function ha({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function LS(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function AS({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Ue.body, children: [
    /* @__PURE__ */ n("span", { className: Ue.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(ha, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Ue.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(ha, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Ue.consequence, children: LS(e.why) })
    ] })
  ] });
}
function ES({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Ue.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(xS, { criterion: e }),
    /* @__PURE__ */ n(AS, { criterion: e })
  ] });
}
function eL({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(ES, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ n("p", { className: Ue.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const IS = "_list_dwhoz_2", MS = "_rung_dwhoz_6", BS = "_name_dwhoz_18", jS = "_actor_dwhoz_32", Tt = {
  list: IS,
  rung: MS,
  name: BS,
  actor: jS
}, PS = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function qS({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = PS[e.state];
  return /* @__PURE__ */ l("li", { className: Tt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: Tt.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${Tt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function tL({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Tt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(qS, { rung: t }, t.name)) });
}
const HS = "_sheet_pw37w_2", OS = "_title_pw37w_9", DS = "_stage_pw37w_15", FS = "_effects_pw37w_20", zS = "_effect_pw37w_20", WS = "_numeral_pw37w_31", KS = "_effectText_pw37w_38", GS = "_refusals_pw37w_43", US = "_reasons_pw37w_52", VS = "_reason_pw37w_52", YS = "_actions_pw37w_62", we = {
  sheet: HS,
  title: OS,
  stage: DS,
  effects: FS,
  effect: zS,
  numeral: WS,
  effectText: KS,
  refusals: GS,
  reasons: US,
  reason: VS,
  actions: YS
};
function JS({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function nL({ run: e, effects: t, refusals: a, cost: r, onRequeue: o, onClose: i, returnFocusTo: s }) {
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
      mm,
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
      /* @__PURE__ */ n(JS, { refused: w, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ n(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const QS = "_list_1laeg_2", XS = "_path_1laeg_7", ZS = "_head_1laeg_21", eR = "_label_1laeg_28", tR = "_consequence_1laeg_35", st = {
  list: QS,
  path: XS,
  head: ZS,
  label: eR,
  consequence: tR
}, hn = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function ma(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function wa(e) {
  return e ? "primary" : "secondary";
}
function nR({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: wa(t), size: "sm", onClick: () => a(e.kind), children: hn[e.kind] }) : /* @__PURE__ */ n(b, { variant: wa(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: hn[e.kind] });
}
function aR({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: st.path, "data-allowed": e.allowed, "data-role": ma(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: st.head, children: [
      /* @__PURE__ */ n("span", { className: st.label, children: e.title ?? hn[e.kind] }),
      /* @__PURE__ */ n(m, { role: ma(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: st.consequence, children: e.consequence }),
    /* @__PURE__ */ n(nR, { path: e, primary: t, onChoose: a })
  ] });
}
function aL({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: st.list, children: e.map((a, r) => /* @__PURE__ */ n(aR, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const rR = "_list_1m7i0_2", oR = "_item_1m7i0_6", lR = "_node_1m7i0_18", iR = "_body_1m7i0_24", sR = "_head_1m7i0_30", cR = "_stage_1m7i0_36", dR = "_version_1m7i0_41", uR = "_sentence_1m7i0_49", hR = "_meta_1m7i0_54", Re = {
  list: rR,
  item: oR,
  node: lR,
  body: iR,
  head: sR,
  stage: cR,
  version: dR,
  sentence: uR,
  meta: hR
}, mR = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function wR({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: Re.head, children: [
    /* @__PURE__ */ n("span", { className: Re.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Re.version, title: e.version, children: e.version }) : null
  ] });
}
function fR({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${Re.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Re.node} ward-history-node`, children: /* @__PURE__ */ n(Fe, { size: 9, kind: mR[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${Re.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(wR, { entry: e }),
      /* @__PURE__ */ n("span", { className: Re.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${Re.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function rL({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Re.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(fR, { entry: t }, t.stage + String(a))) });
}
const _R = "_thread_1e70p_3", vR = "_turn_1e70p_8", bR = "_who_1e70p_27", pR = "_body_1e70p_32", xt = {
  thread: _R,
  turn: vR,
  who: bR,
  body: pR
}, Kr = Ne(!1);
function oL({ children: e, density: t }) {
  return /* @__PURE__ */ n(Kr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${xt.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function lL({ turn: e }) {
  if (!ye(Kr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${xt.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${xt.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${xt.body} ward-chat-body`, children: e.body })
  ] });
}
const gR = "_list_yiolt_3", yR = "_row_yiolt_7", NR = "_label_yiolt_20", kR = "_n_yiolt_26", $R = "_cause_yiolt_33", ut = {
  list: gR,
  row: yR,
  label: NR,
  n: kR,
  cause: $R
};
function CR(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const SR = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function RR({ row: e, formatNumber: t }) {
  return CR(e), /* @__PURE__ */ l("li", { className: `${ut.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Fe, { size: 8, ...SR[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: ut.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${ut.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(TR, { cause: e.cause })
  ] });
}
function TR({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${ut.cause} ward-healthrow-cause`, children: e }) : null;
}
function iL({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${ut.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(RR, { row: a, formatNumber: t }, a.label)) });
}
const xR = "_root_1jxwp_2", LR = {
  root: xR
};
function sL({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: LR.root, "data-density": o, children: [
    /* @__PURE__ */ n(Gt, { items: e, note: t, density: o }),
    /* @__PURE__ */ n(b, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const AR = "_row_dhbre_3", ER = "_key_dhbre_13", IR = "_stack_dhbre_24", MR = "_value_dhbre_32", BR = "_evidence_dhbre_39", jR = "_mark_dhbre_47", Xe = {
  row: AR,
  key: ER,
  stack: IR,
  value: MR,
  evidence: BR,
  mark: jR
};
function PR({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(Nn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function cL({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(PR, { state: e.state }) })
  ] });
}
const qR = "_cell_gh2sd_2", HR = {
  cell: qR
}, OR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function DR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function FR(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function zR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: DR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function WR(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function dL({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  FR(e, a);
  const r = WR(e);
  return /* @__PURE__ */ n(
    Rm,
    {
      label: "Rejection routing",
      columns: OR,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: HR.cell, "data-norerun": o.noRerun ? !0 : void 0, children: zR(o, i) }),
      empty: t ?? /* @__PURE__ */ n(yf, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const KR = "_row_1f2re_2", GR = "_title_1f2re_12", UR = "_turns_1f2re_18", VR = "_waiting_1f2re_19", YR = "_resolved_1f2re_20", JR = "_activity_1f2re_21", QR = "_cost_1f2re_28", XR = "_link_1f2re_29", ZR = "_tableLink_1f2re_47", e2 = "_tableRecord_1f2re_48", t2 = "_tableRow_1f2re_59", n2 = "_tableTitle_1f2re_71", a2 = "_tableResolved_1f2re_76", r2 = "_tableMeta_1f2re_87", o2 = "_tableCost_1f2re_94", l2 = "_tableActivity_1f2re_95", i2 = "_tableState_1f2re_105", z = {
  row: KR,
  title: GR,
  turns: UR,
  waiting: VR,
  resolved: YR,
  activity: JR,
  cost: QR,
  link: XR,
  tableLink: ZR,
  tableRecord: e2,
  tableRow: t2,
  tableTitle: n2,
  tableResolved: a2,
  tableMeta: r2,
  tableCost: o2,
  tableActivity: l2,
  tableState: i2
}, Gr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function s2(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function c2(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function d2(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const u2 = { duplicate: "Closed · duplicate" };
function h2({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(at, { className: z.tableMeta, text: `waiting on ${e}` });
}
function m2({ value: e }) {
  return /* @__PURE__ */ n("td", { className: z.tableCost, children: e === void 0 ? null : le(e) });
}
function w2({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${z.tableRecord} ward-target`, href: A(e.href), children: `→ ${e.key}` });
}
function f2({ session: e, href: t }) {
  const a = Gr[e.state];
  return /* @__PURE__ */ l("tr", { className: z.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: z.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${z.tableLink} ward-target`, href: A(t), children: /* @__PURE__ */ n(at, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: z.tableMeta, children: c2(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: z.tableResolved, children: [
      d2(e.resolved),
      /* @__PURE__ */ n(h2, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(m2, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: z.tableActivity, children: s2(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: z.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: u2[e.state] ?? a.label }),
      /* @__PURE__ */ n(w2, { link: e.link })
    ] }) })
  ] });
}
function _2({ session: e }) {
  const t = Gr[e.state];
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
function uL(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(f2, { session: e.session, href: e.href }) : /* @__PURE__ */ n(_2, { session: e.session });
}
const v2 = "_block_1yy2v_3", b2 = "_list_1yy2v_9", p2 = "_line_1yy2v_14", mn = {
  block: v2,
  list: b2,
  line: p2
}, g2 = { warn: "warning", ok: "ok" };
function y2({ kind: e }) {
  const t = g2[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function N2({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${mn.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(y2, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function hL({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${mn.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: mn.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(N2, { line: a }, `${r}-${a.text}`)) }) });
}
const k2 = "_band_tt7hp_1", $2 = "_head_tt7hp_8", C2 = "_cell_tt7hp_19", S2 = "_index_tt7hp_35", R2 = "_title_tt7hp_42", T2 = "_note_tt7hp_48", x2 = "_cellTitle_tt7hp_53", L2 = "_cellBody_tt7hp_58", A2 = "_tag_tt7hp_64", $e = {
  band: k2,
  head: $2,
  cell: C2,
  index: S2,
  title: R2,
  note: T2,
  cellTitle: x2,
  cellBody: L2,
  tag: A2
}, fa = 4;
function mL({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== fa)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${fa}-cell grid`);
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
const E2 = "_tag_1yuvz_2", I2 = "_link_1yuvz_14", nn = {
  tag: E2,
  link: I2
};
function wL({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: nn.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${nn.tag} ${nn.link}`, href: A(t), children: e });
}
const M2 = "_eyebrow_m8swv_2", B2 = "_link_m8swv_10", _a = {
  eyebrow: M2,
  link: B2
};
function Ur({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: _a.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${_a.link} ward-target`, href: A(t), children: e }) });
}
const j2 = "_figure_qz9i7_2", P2 = "_media_qz9i7_9", q2 = "_caption_qz9i7_35", an = {
  figure: j2,
  media: P2,
  caption: q2
};
function H2(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(x, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function fL(e) {
  return /* @__PURE__ */ l("figure", { className: an.figure, children: [
    /* @__PURE__ */ n("div", { className: an.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(H2, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: an.caption, children: e.caption })
  ] });
}
function En(e) {
  return `h${e}`;
}
function O2(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const D2 = "_prose_1fxb9_2", F2 = "_anchor_1fxb9_79", Vr = {
  prose: D2,
  anchor: F2
};
function _L({ children: e }) {
  return /* @__PURE__ */ n("div", { className: Vr.prose, children: e });
}
function vL({ level: e, children: t, id: a }) {
  const r = En(e), o = a ?? O2(t);
  return /* @__PURE__ */ l(r, { id: o, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${Vr.anchor} ward-target`, href: `#${o}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const z2 = "_list_176jq_2", W2 = "_pair_176jq_8", K2 = "_term_176jq_14", G2 = "_value_176jq_19", Nt = {
  list: z2,
  pair: W2,
  term: K2,
  value: G2
};
function bL({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: Nt.list, children: e.map((t) => /* @__PURE__ */ l("div", { className: Nt.pair, children: [
    /* @__PURE__ */ n("dt", { className: Nt.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: Nt.value, children: t.value })
  ] }, t.term)) });
}
const U2 = "_nav_sgeyg_2", V2 = "_item_sgeyg_6", Y2 = "_link_sgeyg_13", J2 = "_note_sgeyg_30", kt = {
  nav: U2,
  item: V2,
  link: Y2,
  note: J2
};
function pL({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: kt.nav, children: /* @__PURE__ */ n(Lm, { children: t.map((a) => /* @__PURE__ */ l("li", { className: kt.item, children: [
    /* @__PURE__ */ n("a", { className: `${kt.link} ward-target`, href: A(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: kt.note, children: a.note })
  ] }, a.href)) }) });
}
const Q2 = "_header_kelio_2", X2 = "_skip_kelio_14", Z2 = "_brand_kelio_39", eT = "_list_kelio_46", tT = "_link_kelio_56", Ze = {
  header: Q2,
  skip: X2,
  brand: Z2,
  list: eT,
  link: tT
};
function gL({ brand: e, links: t, current: a, homeHref: r = "/", mainId: o = "main", skipLabel: i = "Skip to content" }) {
  return /* @__PURE__ */ l("header", { className: Ze.header, children: [
    /* @__PURE__ */ n("a", { className: Ze.skip, href: `#${o}`, children: i }),
    /* @__PURE__ */ n("a", { className: `${Ze.brand} ward-target`, href: A(r), children: e }),
    /* @__PURE__ */ n("nav", { "aria-label": "Main", className: Ze.nav, children: /* @__PURE__ */ n("ul", { className: Ze.list, role: "list", children: t.map((s) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${Ze.link} ward-target`, href: A(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const nT = "_footer_1jb5e_2", aT = "_note_1jb5e_12", rT = "_list_1jb5e_18", oT = "_link_1jb5e_27", $t = {
  footer: nT,
  note: aT,
  list: rT,
  link: oT
};
function yL({ note: e, links: t = [], label: a = "Footer" }) {
  return /* @__PURE__ */ l("footer", { className: $t.footer, children: [
    /* @__PURE__ */ n("p", { className: $t.note, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("nav", { "aria-label": a, children: /* @__PURE__ */ n("ul", { className: $t.list, role: "list", children: t.map((r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${$t.link} ward-target`, href: A(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const lT = "_intro_13128_2", iT = "_title_13128_9", sT = "_lead_13128_17", rn = {
  intro: lT,
  title: iT,
  lead: sT
};
function NL({ title: e, eyebrow: t, eyebrowHref: a, lead: r, headingLevel: o = 1, children: i }) {
  const s = En(o);
  return /* @__PURE__ */ l("header", { className: rn.intro, children: [
    t === void 0 ? null : /* @__PURE__ */ n(Ur, { href: a, children: t }),
    /* @__PURE__ */ n(s, { className: rn.title, children: e }),
    r === void 0 ? null : /* @__PURE__ */ n("p", { className: rn.lead, children: r }),
    i
  ] });
}
const cT = "_section_u0k7p_2", dT = "_head_u0k7p_13", uT = "_titles_u0k7p_21", hT = "_title_u0k7p_21", mT = "_link_u0k7p_34", ct = {
  section: cT,
  head: dT,
  titles: uT,
  title: hT,
  link: mT
};
function wT({ title: e, headingId: t, eyebrow: a, link: r, headingLevel: o }) {
  const i = En(o);
  return /* @__PURE__ */ l("div", { className: ct.head, children: [
    /* @__PURE__ */ l("div", { className: ct.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ n(Ur, { children: a }),
      /* @__PURE__ */ n(i, { className: ct.title, id: t, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ n("a", { className: `${ct.link} ward-target`, href: A(r.href), children: r.label })
  ] });
}
function kL({ title: e, children: t, id: a, eyebrow: r, link: o, headingLevel: i = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ l("section", { className: ct.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ n(wT, { title: e, headingId: d, eyebrow: r, link: o, headingLevel: i }),
    t
  ] });
}
const fT = "_split_1ycaa_2", _T = "_main_1ycaa_10", vT = "_aside_1ycaa_15", on = {
  split: fT,
  main: _T,
  aside: vT
};
function $L({ children: e, aside: t, asideLabel: a }) {
  return /* @__PURE__ */ l("div", { className: on.split, children: [
    /* @__PURE__ */ n("div", { className: on.main, children: e }),
    /* @__PURE__ */ n("aside", { className: on.aside, "aria-label": a, children: t })
  ] });
}
export {
  TT as ACCENT_PRESETS,
  QT as ActionStack,
  Qx as ActivityConsole,
  jT as AdminIcon,
  Ob as AgentCard,
  qT as AppShell,
  Bx as AppearanceStrip,
  mL as Band,
  YT as BarChart,
  n_ as BoardColumn,
  wx as BoardFootnote,
  fx as BoardHeader,
  MT as BoardIcon,
  ox as BoardScroller,
  b as Btn,
  RT as CHIP_ROLES,
  Ar as CREDENTIAL_COLUMNS,
  VT as Callout,
  jx as CapabilityRow,
  ix as CardGrid,
  lL as ChatMessage,
  Aa as Checkbox,
  m as Chip,
  at as ClampText,
  Xx as ClarificationRow,
  Cx as ClauseRuleRow,
  $x as ClauseRules,
  ur as ColourLadder,
  Px as ComponentRow,
  Zx as Composer,
  vx as ConfigRow,
  _x as ConfigRowHead,
  kn as ConnectionMark,
  Jx as ConsoleAnnounceProvider,
  oL as Conversation,
  mm as CostMeter,
  Hx as CredentialRow,
  qx as CredentialRowHead,
  eL as CriteriaList,
  js as Crumb,
  xT as DENSITIES,
  iL as DeliveryHealth,
  cx as DeniedState,
  ET as DisabledScope,
  Rx as DryRunRail,
  yf as EmptyState,
  Ox as EnvCard,
  Ur as Eyebrow,
  bL as FactList,
  q as Field,
  fL as Figure,
  sx as FilteredEmpty,
  HT as FoldText,
  ax as FormStack,
  Gt as GateChecklist,
  tL as GateLadder,
  Rm as Grid,
  xx as HandoffRuleRow,
  Tx as HandoffRules,
  IT as HomeIcon,
  bx as ItemDrawer,
  Dx as KeyPanel,
  _o as LIVE_EVENT_TYPES,
  sb as LegacyBoardColumn,
  gx as LegacyBoardHeader,
  yx as LegacyConfigRow,
  kx as LegacyItemDrawer,
  tb as LegacyOverCapNote,
  Nx as LegacyPreviewRail,
  sr as LegacyWorkCard,
  pL as LinkList,
  Le as LiveIndicator,
  dx as LoadFailed,
  mx as Loading,
  Pr as MCP_SERVER_COLUMNS,
  Nn as Mark,
  zx as MarkUpload,
  Fe as Marker,
  Kx as McpServerRow,
  Wx as McpServerRowHead,
  Ka as Menu,
  Fa as MenuButton,
  Lx as NewStreamModal,
  Cf as OverCapNote,
  bn as OverflowRow,
  ot as Overlay,
  OT as OwedCard,
  Sx as PARTIAL_STEP_REASON,
  qr as POLICY_CHIP_WIDTH,
  ex as PageFrame,
  UT as PageHeader,
  NL as PageIntro,
  Lm as PlainList,
  Gx as PolicyRow,
  px as PreviewRail,
  _L as Prose,
  vL as ProseHeading,
  Zt as ROLE_MATRIX_COLUMNS,
  kr as RULE_ACTIONS,
  er as Radio,
  sL as ReadyChecklist,
  nx as RecordSection,
  nL as RequeueSheet,
  aL as ResolveBlock,
  cL as ResolvedFieldRow,
  Ux as RoleMatrixRow,
  dL as RoutingTable,
  Ax as RuleRow,
  Vx as RunbookSteps,
  fo as STREAM_STEPS,
  kL as Section,
  rx as SectionBand,
  Xn as SectionHeader,
  Xa as SegmentedControl,
  Ha as Select,
  uL as SessionRow,
  WT as Sidebar,
  PT as SidebarFoldButton,
  yL as SiteFooter,
  gL as SiteHeader,
  $L as SplitLayout,
  Ex as StageColumn,
  lx as StageGrid,
  rL as StageHistory,
  yy as StageListEditor,
  DT as StageSteps,
  ux as StaleStrip,
  zt as StatStrip,
  XT as StatTiles,
  GT as StreamAvatar,
  Ix as StreamRow,
  BT as StudioIcon,
  tx as SubjectRail,
  Ve as Switch,
  zT as TabLinks,
  JT as TableHead,
  FT as Tabs,
  wL as Tag,
  kT as ThemeProvider,
  Mx as ToolRow,
  ZT as TopBar,
  Mw as Tree,
  or as TreeRow,
  hL as TypedInputBlock,
  oi as UNSAFE_HREF,
  Yx as ValidationList,
  yT as VisibilityProvider,
  NT as Visible,
  ST as WARD_VERSION,
  Kt as WorkCard,
  hx as WriteUnavailableStrip,
  s2 as agoSince,
  to as clock,
  qy as colourStatus,
  ae as count,
  ue as duration,
  wn as elapsed,
  CT as eventSourceTransport,
  En as headingTag,
  Ot as isStreamStep,
  wt as isValidatedStreamStep,
  _p as ladderValidation,
  s0 as mcpConnectionChip,
  l0 as mcpToolName,
  le as money,
  be as ms,
  lr as ordered,
  ga as ratio,
  Tk as restartLabel,
  A as safeHref,
  O2 as slug,
  he as stamp,
  fn as stream,
  LT as streamChip,
  Ft as streamChipProps,
  ge as streamColour,
  po as streamHex,
  Et as streamInitials,
  vo as streamVars,
  KT as uniqueStreamInitials,
  Ba as useAnchoredPanel,
  Ct as useBorderFlash,
  Ae as useDisabledScope,
  ho as useFocusTrap,
  AT as useLiveFeed,
  $T as useReturnFocus,
  Ht as useRovingTabindex,
  _n as useTicker,
  no as useVisible,
  j as v,
  Fx as validateMark,
  _t as validatedStep,
  Na as validatedStreamSteps
};
