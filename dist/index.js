import { jsx as n, Fragment as x, jsxs as l } from "react/jsx-runtime";
import { useMemo as ta, useContext as ye, createContext as Ne, useState as g, useEffect as C, useCallback as te, useRef as _, useLayoutEffect as tt, useId as N, Fragment as na, isValidElement as Ir, Children as Mr } from "react";
import { createPortal as Br, flushSync as aa } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const pn = (e) => String(e).padStart(2, "0");
function tn(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${pn(t % 60)}s` : `${Math.floor(a / 60)}h ${pn(a % 60)}m`;
}
const jr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const t = jr.formatToParts(new Date(e)), a = (r) => {
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
function ra(e, t) {
  return `${e} / ${t}`;
}
const Pr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function qr(e) {
  return Pr.format(new Date(e));
}
const oa = Ne(/* @__PURE__ */ new Set());
function nT({ hidden: e, children: t }) {
  const a = ta(() => new Set(e), [e]);
  return /* @__PURE__ */ n(oa.Provider, { value: a, children: t });
}
function Or(e) {
  return !ye(oa).has(e);
}
function aT({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: Or(e) ? t : a });
}
const Dr = "(prefers-color-scheme: dark)";
function gn() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Dr) : null;
}
function Fr(e) {
  const [t, a] = g(() => {
    var r;
    return ((r = gn()) == null ? void 0 : r.matches) === !0;
  });
  return C(() => {
    const r = e ? gn() : null;
    if (!r) return;
    const o = () => a(r.matches);
    return o(), r.addEventListener("change", o), () => r.removeEventListener("change", o);
  }, [e]), t;
}
function Dt(e, t) {
  C(() => {
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function Hr(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function rT({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const o = Fr(e === "system");
  return Dt("data-theme", Hr(e, o)), Dt("data-accent", t), Dt("data-density", a), /* @__PURE__ */ n(x, { children: r });
}
const Wr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function zr(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function Kr(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function Gr(e, t, a, r) {
  return e.shiftKey ? zr(t, a) ? r : void 0 : document.activeElement === r || Kr(t) ? a : void 0;
}
function Ur(e, t, a) {
  const r = a[0], o = a[a.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = Gr(e, t, r, o);
  i && (e.preventDefault(), i.focus());
}
function Vr(e) {
  return { onKeyDown: te(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Wr));
      Ur(a, e.current, r);
    },
    [e]
  ) };
}
function oT(e, t = !0) {
  C(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [t, e]);
}
const yn = { ArrowUp: -1, ArrowDown: 1 }, Nn = { ArrowLeft: -1, ArrowRight: 1 }, Yr = (e, t, a) => Math.min(a, Math.max(t, e));
function Jr(e, t) {
  if (t !== "horizontal" && e in yn) return yn[e];
  if (t !== "vertical" && e in Nn) return Nn[e];
}
function Et({ orientation: e = "both" } = {}) {
  const [t, a] = g(0), r = _(/* @__PURE__ */ new Map()), o = _(!1);
  tt(() => {
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
      const w = Math.max(0, h.indexOf(t)), f = Jr(u.key, e);
      f !== void 0 ? (u.preventDefault(), s(h[Yr(w + f, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
const lT = (e, t, a) => {
  const r = new EventSource(e), o = (i) => a.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, iT = "0.2.0", sT = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Qr = [1, 2, 3, 4, 5, 6], la = [1, 2, 3], Xr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], cT = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], dT = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], B = {
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
    menuIcon: "var(--ward-width-menuIcon)"
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
    streamAvatar: "var(--ward-type-streamAvatar)"
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
function nn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function It(e) {
  return Qr.includes(e);
}
function ut(e) {
  return la.includes(e);
}
function Zr(e) {
  if (!It(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function uT(e) {
  if (!It(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const eo = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function to(e) {
  if (!It(e)) throw new Error("unvalidated stream step");
  return eo[e];
}
function kn(e) {
  return typeof e != "string" ? null : Xr.includes(e) ? e : null;
}
function no(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function ao(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function ro(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function oo(e, t, a) {
  const r = no(e);
  if (r === null) return null;
  const o = kn(a) ?? kn(r.type);
  return o === null ? null : { ...r, type: o, id: ao(r, t), at: ro(r) };
}
function lo(e, t) {
  return e >= be.staleAfter ? "stale" : e >= be.heartbeat && t === "live" ? "reconnecting" : null;
}
function io(e, t, a) {
  return e >= be.heartbeat && !t && a !== null;
}
function hT(e, t) {
  const [a, r] = g("reconnecting"), [o, i] = g(null), s = _(/* @__PURE__ */ new Map()), c = _(0), d = _(""), u = _(0), h = _(null), w = _(0), f = _(0), v = _(!1), T = _("reconnecting"), M = te((R) => {
    T.current = R, r(R);
  }, []), z = te(() => {
    c.current = Date.now();
  }, []), me = te((R) => {
    for (const [Y, ke] of s.current)
      (ke === "*" || R.itemKey === ke) && Y(R);
  }, []), re = te(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (R, Y, ke) => {
        const We = oo(R, Y, ke);
        We !== null && (We.id && (d.current = We.id), z(), v.current = !1, M("live"), i(We.at), me(We));
      },
      onOpen: () => {
        u.current = 0, v.current = !1, z(), M("live");
      },
      onError: () => {
        var Y;
        (Y = h.current) == null || Y.close(), h.current = null, v.current = !0, T.current !== "stale" && M("reconnecting");
        const R = Math.min(be.reconnectBase * 2 ** u.current, be.reconnectMax);
        u.current += 1, w.current = window.setTimeout(re, R);
      }
    });
  }, [me, M, z, t, e]), Ee = te((R) => {
    v.current = !0, R.close(), h.current = null, w.current = window.setTimeout(re, be.reconnectBase);
  }, [re]), Ye = te((R, Y) => (s.current.set(Y, R), () => {
    s.current.delete(Y);
  }), []);
  return C(() => (re(), f.current = window.setInterval(() => {
    const R = Date.now() - c.current, Y = lo(R, T.current);
    Y && M(Y);
    const ke = h.current;
    io(R, v.current, ke) && Ee(ke);
  }, be.tick), () => {
    var R;
    window.clearInterval(f.current), window.clearTimeout(w.current), v.current = !1, (R = h.current) == null || R.close(), h.current = null;
  }), [re, Ee, M]), { connection: a, lastEventAt: o, subscribe: Ye };
}
function an(e, t) {
  const a = new Date(e).getTime(), [r, o] = g(() => Date.now());
  return C(() => {
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
const so = { blue: "running", orange: "waiting", green: "done" };
function co() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function $n(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function bt(e, t) {
  const a = _(0), r = te((o) => {
    const i = o ?? t, s = e.current;
    s !== null && i !== void 0 && (co() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${so[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => $n(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => $n(s), be.flash)));
  }, [t, e]);
  return C(() => () => window.clearTimeout(a.current), []), t === void 0 ? (o) => r(o) : () => r(t);
}
const uo = "_root_1otpc_2", ho = {
  root: uo
};
function mo(e, t, a, r, o) {
  const i = [tn(t)];
  return e || i.push(`as of ${qr(a)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function Le({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const o = a !== "stale", i = an(e, o), s = (t == null ? void 0 : t.at) ?? e, c = mo(o, i, s, r, t);
  return /* @__PURE__ */ l("span", { className: `${ho.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const wo = "_app_1bnco_1", fo = "_side_1bnco_35", _o = "_sideTop_1bnco_46", vo = "_sideBody_1bnco_60", bo = "_iconRail_1bnco_99", po = "_railItem_1bnco_108", go = "_railIcon_1bnco_129", yo = "_railDot_1bnco_134", No = "_railLetter_1bnco_140", ko = "_main_1bnco_146", $o = "_rail_1bnco_108", Co = "_page_1bnco_168", So = "_headerRow_1bnco_191", Ro = "_sidebarToggle_1bnco_198", To = "_headerSlot_1bnco_203", xo = "_headerAction_1bnco_208", Lo = "_drawerSide_1bnco_213", Ao = "_root_1bnco_260", Eo = "_topbar_1bnco_267", Io = "_mark_1bnco_278", Mo = "_brand_1bnco_285", Bo = "_tagline_1bnco_291", jo = "_identity_1bnco_297", Po = "_tools_1bnco_298", qo = "_nav_1bnco_308", Oo = "_metadata_1bnco_315", Do = "_actor_1bnco_330", Fo = "_detail_1bnco_331", Ho = "_content_1bnco_376", Wo = "_toolsPanel_1bnco_392", zo = "_skip_1bnco_418", $ = {
  app: wo,
  side: fo,
  sideTop: _o,
  sideBody: vo,
  iconRail: bo,
  railItem: po,
  railIcon: go,
  railDot: yo,
  railLetter: No,
  main: ko,
  rail: $o,
  page: Co,
  headerRow: So,
  sidebarToggle: Ro,
  headerSlot: To,
  headerAction: xo,
  drawerSide: Lo,
  root: Ao,
  topbar: Eo,
  mark: Io,
  brand: Mo,
  tagline: Bo,
  identity: jo,
  tools: Po,
  nav: qo,
  metadata: Oo,
  actor: Do,
  detail: Fo,
  content: Ho,
  toolsPanel: Wo,
  skip: zo
};
function at(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const Ko = "_scope_1an6i_2", Go = {
  scope: Ko
}, ia = Ne(null);
function mT({ reason: e, actions: t = "disable", children: a }) {
  const r = N();
  return /* @__PURE__ */ l("fieldset", { disabled: !0, className: `${Go.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(ia.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Ae() {
  return ye(ia);
}
function Mt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : at(e, t.reasonId);
}
const Uo = "_btn_hrmlj_2", Vo = "_primary_hrmlj_14", Yo = "_destructive_hrmlj_25", Jo = "_secondary_hrmlj_35", Qo = "_ghost_hrmlj_40", Xo = "_overflow_hrmlj_49", Zo = "_sm_hrmlj_56", el = "_disabled_hrmlj_60", tl = "_withReason_hrmlj_68", nl = "_reason_hrmlj_74", et = {
  btn: Uo,
  primary: Vo,
  destructive: Yo,
  secondary: Jo,
  ghost: Qo,
  overflow: Xo,
  sm: Zo,
  disabled: el,
  withReason: tl,
  reason: nl
};
function al(e, t, a, r) {
  const o = t === "sm" ? [et.sm, "ward-btn--sm"] : [], i = a ? [et.disabled] : [];
  return [et.btn, et[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function rl(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function ol(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function ll(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function il(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function sl(e, t, a) {
  return il(e.describedBy, t && a);
}
function cl({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${et.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function dl(e) {
  return e.children ?? e.label;
}
function p(e) {
  var t;
  return ((t = Ae()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(ul, { ...e });
}
function ul(e) {
  const t = Ae();
  ol(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", o = !!(e.disabled || t), i = ll(e, t), s = N(), c = hl(i, t);
  return /* @__PURE__ */ l(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: al(a, r, o, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: o,
        title: i,
        "aria-describedby": sl(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...rl(a, e.controls),
        children: dl(e)
      }
    ),
    /* @__PURE__ */ n(cl, { id: s, reason: i, shown: c === sa })
  ] });
}
function hl(e, t) {
  return e && !t ? sa : na;
}
function sa({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${et.withReason} ward-btn-withReason`, children: e });
}
let rn = "none";
function ml(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (rn = "key");
}
typeof document < "u" && (document.addEventListener("keydown", ml, !0), document.addEventListener("pointerdown", () => {
  rn = "pointer";
}, !0));
function wl() {
  return rn === "key";
}
function ct(e) {
  const [t, a] = g(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return C(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const o = (s) => a(s.matches);
    return r.addEventListener("change", o), a(r.matches), () => r.removeEventListener("change", o);
  }, [e]), t;
}
const fl = "_scrim_1cawq_2", _l = "_drawer_1cawq_10", vl = "_sheet_1cawq_14", bl = "_modal_1cawq_18", pl = "_panel_1cawq_23", gl = "_start_1cawq_44", yl = "_header_1cawq_67", Nl = "_title_1cawq_75", kl = "_body_1cawq_79", $l = "_close_1cawq_106", Te = {
  scrim: fl,
  drawer: _l,
  sheet: vl,
  modal: bl,
  panel: pl,
  start: gl,
  header: yl,
  title: Nl,
  body: kl,
  close: $l
}, Cl = Ne(null), kt = [], $t = /* @__PURE__ */ new Map();
function Sl(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Rl(e, t) {
  let a = $t.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, $t.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function Tl(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !Sl(r) && Rl(e, r);
}
function xl(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (Tl(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function Ll(e) {
  for (const t of e.claims) {
    const a = $t.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), $t.delete(t)));
  }
}
function Al(e, t) {
  const a = { root: e, claims: [] };
  return kt.push(a), xl(a, t), a;
}
function El(e) {
  const t = kt.indexOf(e);
  t >= 0 && kt.splice(t, 1), Ll(e);
}
function Cn(e) {
  return e !== null && kt.at(-1) === e;
}
function Il(e, t, a) {
  const r = _(null), o = _(a);
  return o.current = a, C(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = Al(i, t);
    return r.current = c, () => {
      var u, h;
      const d = Cn(c);
      El(c), r.current = null, d && ((h = (u = o.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), te(() => Cn(r.current), []);
}
function Ml(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function Bl(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function jl({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("header", { className: `${Te.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Te.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Pl(e) {
  return `${Te.scrim} ${Te[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function ql(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Te.panel} ${Te[e]} ward-overlay-panel${a}${r}`;
}
function Ol(e) {
  const t = ye(Cl);
  return e ?? t ?? document.body;
}
function rt(e) {
  const t = _(null), a = _(null), r = N(), o = Ol(e.container), i = ct("(min-width: 768px)"), s = Ml(e.kind, i), c = Bl(e, r), d = Vr(a), [u] = g(wl), h = Il(t, o, e.returnFocusTo), w = te(() => {
    h() && e.onClose();
  }, [e.onClose, h]);
  return C(() => {
    var f;
    h() && ((f = a.current) == null || f.focus());
  }, [h]), C(() => {
    const f = (v) => {
      v.key === "Escape" && w();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [w]), Br(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: Pl(s),
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
            className: ql(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => h() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Te.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(jl, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Dl = /^([a-z][a-z0-9+.-]*):/i, Fl = /* @__PURE__ */ new Set(["http", "https"]), Hl = "#";
function Wl(e) {
  var r, o;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (o = (r = Dl.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : o.toLowerCase();
}
function W(e) {
  const t = Wl(e);
  return t === void 0 || Fl.has(t) ? e : Hl;
}
function zl(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function ca(e) {
  const t = zl(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function Kl(e, t) {
  C(() => {
    const a = e.current;
    if (!a) return;
    const r = () => ca(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const o = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [a, ...a.children]) o == null || o.observe(i);
    return r(), () => {
      a.removeEventListener("scroll", r), o == null || o.disconnect();
    };
  }, [e, t]);
}
function Gl(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, o = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : o > e.clientWidth - a ? e.scrollLeft + o - e.clientWidth + a : null;
}
function Ul(e, t, a) {
  tt(() => {
    const r = e.current, o = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !o) return;
    const i = Gl(r, o);
    i !== null && (r.scrollLeft = Math.max(0, i)), ca(r);
  }, [e, t, a]);
}
const Vl = "_row_11g8i_2", Yl = {
  row: Vl
};
function Jl(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function on({ label: e, children: t, count: a, as: r = "div", focusable: o = !0, rowRef: i, className: s, ...c }) {
  const d = _(null), u = i ?? d;
  return Kl(u, a), /* @__PURE__ */ n(r, { ref: u, className: [Yl.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Jl(o, r), ...c, children: t });
}
const Ql = "_icon_1ylqy_2", Xl = {
  icon: Ql
};
function ht({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: Xl.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function wT() {
  return /* @__PURE__ */ n(ht, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function fT() {
  return /* @__PURE__ */ l(ht, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function _T() {
  return /* @__PURE__ */ l(ht, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function vT() {
  return /* @__PURE__ */ n(ht, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Zl() {
  return /* @__PURE__ */ l(ht, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const da = "ward:sidebar-collapsed", ei = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function ti() {
  try {
    return window.localStorage.getItem(da) === "true";
  } catch {
    return !1;
  }
}
function ni(e) {
  try {
    window.localStorage.setItem(da, String(e));
  } catch {
  }
}
function ai(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function ri(e) {
  return e instanceof Element && e.closest(ei) !== null;
}
function oi(e) {
  return e.key === "[" && !ai(e) && !ri(e.target);
}
function li(e) {
  const [t, a] = g(ti), r = () => {
    ni(!t), a(!t);
  };
  return C(() => {
    if (!e) return;
    const o = (i) => {
      var c;
      if (!oi(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [e, t]), { collapsed: t, toggle: r };
}
function ii() {
  const e = ct("(max-width: 767.98px)"), t = ct("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function si(e) {
  const t = e === "phone", a = N(), r = _(null), [o, i] = g(!1);
  return o && !t && i(!1), { narrow: t, open: o, drawerId: a, slotRef: r, toggle: () => i(!o), close: () => i(!1) };
}
function ci({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ l("div", { className: $.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ n(p, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: $.headerSlot, children: e }),
    wa(t) && /* @__PURE__ */ n("span", { className: $.headerAction, children: t })
  ] }) : e;
}
function di(e, t) {
  C(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function ui({ sidebar: e, label: t, drawer: a }) {
  var o;
  if (di(a.open, a.close), !a.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(rt, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (o = a.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ n("div", { className: $.drawerSide, onClick: r, children: ua(e, !1) }) });
}
function hi(e) {
  const [t, a] = g(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function mi(e, t) {
  const a = li(e === "wide" && !t), r = hi(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function wi(e, t) {
  const a = mi(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return _i(e.collapsed, t);
  const r = a.collapsed, o = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: o, drawsStrip: !o && typeof e.sidebar == "function", toggle: a.toggle };
}
const fi = (e) => e.collapsed && e.drawsStrip;
function _i(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const Sn = (e) => e ? "" : void 0;
function ua(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ha({ fold: e }) {
  return /* @__PURE__ */ l(p, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(Zl, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function vi({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: $.sideTop, children: /* @__PURE__ */ n(ha, { fold: e }) });
}
const ma = Ne(null);
function bT() {
  const e = ye(ma);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(ha, { fold: e });
}
function bi({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": nn(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function pi({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: $.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ l("a", { className: $.railItem, href: W(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(bi, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function gi({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: o }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ l("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(vi, { fold: r, inSidebar: o && !i }),
    /* @__PURE__ */ n("div", { className: $.sideBody, hidden: i, children: ua(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(pi, { items: a ?? [], label: t })
  ] });
}
const wa = (e) => e != null;
function yi(e) {
  const { sidebar: t, header: a, action: r, children: o, rail: i, iconRail: s, pageFill: c } = e, d = wa(i), u = ii(), h = si(u), w = wi(e, u), f = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ l("div", { className: $.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": Sn(fi(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(ma.Provider, { value: w, children: /* @__PURE__ */ n(gi, { sidebar: t, label: f, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ l("main", { className: $.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(ci, { header: a, action: r, label: f, drawer: h }),
      /* @__PURE__ */ n("div", { className: $.page, "data-fill": Sn(c === !0), children: o })
    ] }),
    d && /* @__PURE__ */ n("div", { className: $.rail, children: i }),
    /* @__PURE__ */ n(ui, { sidebar: t, label: f, drawer: h })
  ] });
}
function Ni({ destinations: e, active: t }) {
  const a = _(null);
  return Ul(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(on, { as: "nav", rowRef: a, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: W(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function Vt({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function ki({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ l("span", { className: $.metadata, children: [
    /* @__PURE__ */ n(Vt, { value: e, className: $.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Vt, { value: t, className: $.detail })
  ] });
}
function $i() {
  const e = ct("(max-width: 767.98px)"), t = N(), a = _(null), [r, o] = g(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Ci({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: $.tools, children: /* @__PURE__ */ n(p, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: $.tools, children: e });
}
function Si({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: $.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function Ri(e) {
  return /* @__PURE__ */ l("header", { className: $.topbar, children: [
    /* @__PURE__ */ n("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Vt, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ n(Ni, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: $.identity, children: /* @__PURE__ */ n(ki, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Ci, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Ti(e) {
  const t = N(), a = $i();
  return /* @__PURE__ */ l("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: $.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Ri, { ...e, menu: a }),
    /* @__PURE__ */ n(Si, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: $.content, children: e.children })
  ] });
}
function xi(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function pT(e) {
  return xi(e) ? /* @__PURE__ */ n(yi, { ...e }) : /* @__PURE__ */ n(Ti, { ...e });
}
const Li = "_root_itg9o_2", Ai = "_row_itg9o_8", Ei = "_box_itg9o_14", Ii = "_label_itg9o_21", Mi = "_labelHidden_itg9o_26", Bi = "_lockedNote_itg9o_36", ji = "_consequence_itg9o_44", Pi = "_sample_itg9o_79", Be = {
  root: Li,
  row: Ai,
  box: Ei,
  label: Ii,
  labelHidden: Mi,
  lockedNote: Bi,
  consequence: ji,
  sample: Pi
};
function qi(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function Oi({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: t }) : null;
}
function Di({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Fi(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function Hi(e, t, a, r) {
  const o = e.consequence ? `${t}-note` : void 0, i = Fi(e, a, r), s = i ? `${t}-reason` : void 0, c = Mt(at(o, e.describedBy, s), r);
  return { noteId: o, reason: i, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? i } };
}
function Wi({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function zi({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function fa(e) {
  const t = N(), a = Ae(), r = qi(e, a), o = Hi(e, t, r.disabled, a);
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
        /* @__PURE__ */ n(Di, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(zi, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Wi, { id: o.reasonId, reason: o.reason }),
    /* @__PURE__ */ n(Oi, { id: o.noteId, text: e.consequence })
  ] });
}
const Ki = "_chip_pq6tb_2", Gi = {
  chip: Ki
}, Ui = {
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
function Vi(e, t) {
  if (e === "stream") return Yi(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = Ui[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function Yi(e) {
  if (!e || !ut(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = nn(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Gi.chip} ward-chip ward-chip--${e}`, style: Vi(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const Ji = "_clamp_zn74g_3", Rn = {
  clamp: Ji
};
function nt({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? Rn.clamp : `${Rn.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
function mt(e) {
  return typeof e == "number" && ut(e) ? e : null;
}
function ge(e, t) {
  const a = mt(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function Bt(e, t) {
  const a = mt(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const Qi = "_root_13eei_3", Xi = "_nav_13eei_8", Zi = "_list_13eei_16", es = "_item_13eei_24", ts = "_link_13eei_44", ns = "_sep_13eei_54", as = "_current_13eei_58", rs = "_chips_13eei_62", Me = {
  root: Qi,
  nav: Xi,
  list: Zi,
  item: es,
  link: ts,
  sep: ns,
  current: as,
  chips: rs
};
function os({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: Me.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${Me.link} ward-target`, href: W(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function ls({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: Me.root, children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ n("ol", { className: Me.list, children: e.map((r, o) => /* @__PURE__ */ l("li", { className: Me.item, children: [
      o > 0 ? /* @__PURE__ */ n("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(os, { step: r, isCurrent: a && o === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${Me.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function _a(e, t, a) {
  const r = _(a);
  r.current = a, C(() => {
    if (!e) return;
    const o = (i) => {
      var s;
      (s = t.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", o), () => document.removeEventListener("mousedown", o);
  }, [e, t]);
}
const is = 500;
function va(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function ba() {
  const e = _(""), t = _(void 0);
  return C(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, is), e.current);
}
const wt = 4;
function ss(e, t, a) {
  const r = Math.max(0, a - e.bottom - wt * 2), o = Math.max(0, e.top - wt * 2);
  return t <= r || r >= o ? { top: e.bottom + wt, maxHeight: r } : { top: e.top - wt - Math.min(t, o), maxHeight: o };
}
function cs(e, t, a, r) {
  const o = { start: e.left, end: e.right - t }, i = { start: o.start + t <= a, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, a - t));
}
function ds(e, t, a, r) {
  return { ...ss(e, t.height, a.height), left: cs(e, t.width, a.width, r) };
}
function pt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function us(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function hs(e, t, a) {
  const r = us(t, a);
  e.style.setProperty("--ward-anchor-width", pt(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const o = e.getBoundingClientRect(), i = document.documentElement;
  return { edges: r, box: o, view: { width: i.clientWidth, height: i.clientHeight } };
}
function ms(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, o) => r.scrollTop = a[o]);
}
function Tn(e, t, a, r) {
  const o = ms(e), i = hs(e, t, r), s = ds(i.edges, i.box, i.view, a);
  Object.assign(e.style, { left: pt(s.left - i.box.left), top: pt(s.top - i.box.top), maxHeight: pt(s.maxHeight) }), o();
}
function ws(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function pa(e, t, a = "start", r) {
  tt(() => {
    const o = t.current, i = e.current;
    if (!o || !i) return;
    const s = ws(o), c = () => Tn(o, i, a, r == null ? void 0 : r.current), d = (u) => {
      o.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), tt(() => {
    t.current && e.current && Tn(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const fs = "_root_1lgbn_2", _s = "_trigger_1lgbn_7", vs = "_value_1lgbn_47", bs = "_menu_1lgbn_65", ps = "_find_1lgbn_87", gs = "_list_1lgbn_103", ys = "_option_1lgbn_114", Ns = "_check_1lgbn_133", ks = "_empty_1lgbn_144", pe = {
  root: fs,
  trigger: _s,
  value: vs,
  menu: bs,
  find: ps,
  list: gs,
  option: ys,
  check: Ns,
  empty: ks
}, $s = 7;
function Cs(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function xn(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function Ss(e, t) {
  const [a, r] = g(e.defaultOpen === !0), [o, i] = g(""), [s, c] = g(() => xn(e.options, e.value)), d = (u) => {
    var h;
    aa(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: o,
    active: s,
    entries: Cs(e.options, o),
    findable: e.options.length > $s,
    show: () => {
      e.disabled || (i(""), c(xn(e.options, e.value)), r(!0));
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
function Rs(e, t) {
  const a = _(!1);
  return C(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function Ts(e) {
  const t = ba();
  return (a) => {
    const r = t(a), o = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    o >= 0 && e.to(o);
  };
}
function ga(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function xs(e) {
  return { ...ga(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function ya(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const o = t[r.key];
    if (!o) return a(r);
    r.preventDefault(), r.stopPropagation(), o();
  };
}
const Ls = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function As(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      Ls.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function Es({ entry: e, at: t, menu: a, ids: r, value: o }) {
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
function ln(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function Is({ menu: e, ids: t, focusRef: a }) {
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
      "aria-activedescendant": ln(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: ya(e, ga(e), () => {
      })
    }
  );
}
function Ms({ props: e, menu: t, ids: a, focusRef: r, trigger: o }) {
  const i = Ts(t), s = _(null);
  pa(o, s);
  const c = (d) => {
    va(d) && i(d.key);
  };
  return /* @__PURE__ */ l("div", { ref: s, className: pe.menu, children: [
    t.findable && /* @__PURE__ */ n(Is, { menu: t, ids: a, focusRef: r }),
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
        "aria-activedescendant": t.findable ? void 0 : ln(t, a),
        onKeyDown: ya(t, xs(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(Es, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: pe.empty, children: "No match" })
  ] });
}
function Bs(e, t) {
  const a = e.open ? ln(e, t) : void 0;
  C(() => {
    var r, o;
    a && ((o = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [a]);
}
function Na(...e) {
  return e.filter(Boolean).join(" ");
}
function js(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function Ps({ props: e, menu: t, ids: a, trigger: r, wantFocus: o }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ae()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: Na(pe.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": t.open,
      "aria-controls": t.open ? a.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": at(e["aria-describedby"], a.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...As(t, o),
      children: /* @__PURE__ */ n("span", { id: a.value, className: pe.value, "data-placeholder": i || void 0, children: js(e) })
    }
  );
}
function ka(e) {
  const t = Ae(), a = t ? { ...e, disabled: !0, "aria-describedby": Mt(e["aria-describedby"], t) } : e, r = N(), o = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = _(null), s = _(null), c = _(null), d = Ss(a, s), u = Rs(d.open, c);
  return _a(d.open, i, () => d.close(!1)), Bs(d, o), /* @__PURE__ */ l("div", { ref: i, className: Na(pe.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(Ps, { props: a, menu: d, ids: o, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(Ms, { props: a, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const qs = "_field_1ensj_2", Os = "_label_1ensj_8", Ds = "_labelHidden_1ensj_15", Fs = "_control_1ensj_25", Hs = "_mono_1ensj_45", Ws = "_area_1ensj_50", zs = "_invalid_1ensj_57", De = {
  field: qs,
  label: Os,
  labelHidden: Ds,
  control: Fs,
  mono: Hs,
  area: Ws,
  invalid: zs
}, Ks = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, $a = (e) => `${e}-label`;
function Gs({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? Ks : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function Us({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    ka,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": $a(t.id),
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
function Vs({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
const Ys = { input: Gs, select: Us, textarea: Vs };
function Js(e, t, a) {
  const r = Ys[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function Qs(e, t, a, r) {
  const o = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": o,
    "aria-describedby": Mt(at(o ? a : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function Xs(e) {
  const t = e.mono ? [De.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [De.area] : [];
  return [De.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function Zs(e) {
  return e ? `${De.label} ${De.labelHidden} ward-field-label` : `${De.label} ward-field-label`;
}
function P(e) {
  const t = N(), a = `${t}-msg`, r = Qs(e, t, a, Ae()), o = Xs(e);
  return /* @__PURE__ */ l("div", { className: `${De.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: $a(t), className: Zs(e.labelHidden), htmlFor: t, children: e.label }),
    Js(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${De.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const ec = "_root_sjvm0_2", tc = "_trigger_sjvm0_9", nc = "_ghost_sjvm0_27", ac = "_panel_sjvm0_46", rc = "_edged_sjvm0_67", oc = "_menu_sjvm0_73", lc = "_group_sjvm0_78", ic = "_heading_sjvm0_83", sc = "_item_sjvm0_89", cc = "_description_sjvm0_105", dc = "_large_sjvm0_109", uc = "_touch_sjvm0_113", hc = "_icon_sjvm0_117", mc = "_label_sjvm0_125", wc = "_text_sjvm0_130", fc = "_trailing_sjvm0_138", _c = "_check_sjvm0_144", vc = "_separator_sjvm0_183", bc = "_footer_sjvm0_189", pc = "_find_sjvm0_196", gc = "_findGlyph_sjvm0_208", yc = "_findInput_sjvm0_214", Nc = "_empty_sjvm0_230", L = {
  root: ec,
  trigger: tc,
  ghost: nc,
  panel: ac,
  edged: rc,
  menu: oc,
  group: lc,
  heading: ic,
  item: sc,
  description: cc,
  large: dc,
  touch: uc,
  icon: hc,
  label: mc,
  text: wc,
  trailing: fc,
  check: _c,
  separator: vc,
  footer: bc,
  find: pc,
  findGlyph: gc,
  findInput: yc,
  empty: Nc
}, Ca = Ne(null);
function kc(e, t) {
  const [a, r] = g({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (o) => r((i) => ({ open: !0, start: o, request: i.request + 1 })),
    close: (o) => {
      var i;
      aa(() => r((s) => ({ ...s, open: !1 }))), o && ((i = t.current) == null || i.focus());
    }
  };
}
const $c = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Cc(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = $c.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function sn(...e) {
  return e.filter(Boolean).join(" ");
}
function Sc(e, t = {}, a = "field") {
  const { ref: r, className: o, ...i } = t;
  return { ...i, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: sn(L.trigger, a === "ghost" ? L.ghost : void 0, o) };
}
function Sa(e) {
  const t = N(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = _(null), o = _(null), i = kc(e.defaultOpen === !0, o);
  return _a(i.open, r, () => i.close(!1)), /* @__PURE__ */ l("div", { ref: r, className: sn(L.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...Sc(o, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Cc(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(Ca.Provider, { value: { ...a, popup: i, button: o }, children: e.children })
  ] });
}
function Rc(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function Tc(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const xc = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function Lc(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function Ac(e, t) {
  return e === "separator" ? e : "items" in e ? Lc(e, t) : t(e) ? e : null;
}
function Ec(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function Ic(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (o) => o.label.toLowerCase().includes(a);
  return Ec(e.map((o) => Ac(o, r)).filter((o) => o !== null));
}
const Ra = (e, t) => (e % t + t) % t;
function Pe(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const o = Ra(t + a * r, e.length);
    if (!e[o].disabled) return o;
  }
  return -1;
}
const Mc = (e) => e.split("").every((t) => t === e[0]);
function Bc(e, t, a) {
  const r = Mc(a), o = r ? a[0] : a, i = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = Ra(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function jc(e) {
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
function Pc(e, t) {
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
function qc(e, t, a) {
  const r = ba(), o = Pc(e, t), i = (s) => {
    if (va(s)) {
      if (!a) return e.focus(Bc(e.items, e.current(), r(s.key)));
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
function Oc(e) {
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
function Dc(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? Pe(e, -1, 1) : t;
}
function Fc(e, t) {
  const { start: a, request: r } = t, o = _(e);
  o.current = e, C(() => {
    const { items: i, focus: s } = o.current;
    a && s(a === "first" ? Dc(i) : Pe(i, i.length, -1));
  }, [a, r]);
}
function Hc({ row: e, nav: t, popup: a }) {
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
const Wc = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function zc(e, t) {
  return Wc(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function Kc(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: L.label, children: e.label });
  return e.description ? /* @__PURE__ */ l("span", { className: L.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: L.description, children: e.description })
  ] }) : a;
}
function Gc() {
  return /* @__PURE__ */ n("svg", { className: L.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Ln(e, t) {
  return /* @__PURE__ */ l(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: L.icon, "aria-hidden": "true", children: e.icon }) : null,
    Kc(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: L.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(Gc, {}) : null
  ] });
}
function Ta(e) {
  const { item: t, at: a } = e.row, r = N(), o = {
    ref: (i) => {
      e.nav.refs.current[a] = i;
    },
    role: "menuitem",
    tabIndex: -1,
    className: L.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...zc(t, r),
    ...Hc(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: W(t.href), ...o, children: Ln(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...o, children: Ln(t, r) });
}
function Uc({ heading: e, rows: t, nav: a, popup: r }) {
  const o = N();
  return /* @__PURE__ */ l("div", { role: "group", "aria-labelledby": o, className: L.group, children: [
    /* @__PURE__ */ n("div", { id: o, className: L.heading, children: e }),
    t.map((i) => /* @__PURE__ */ n(Ta, { row: i, nav: a, popup: r }, i.at))
  ] });
}
function Vc({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: L.separator }) : e.kind === "group" ? /* @__PURE__ */ n(Uc, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(Ta, { row: e.row, nav: t, popup: a });
}
function Yc() {
  const e = ye(Ca);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Jc() {
  return /* @__PURE__ */ l("svg", { className: L.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function Qc(e, t) {
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
function Xc({ find: e, query: t, setQuery: a, input: r, nav: o, popup: i, menuId: s }) {
  const c = Qc(o, i), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ l("div", { className: L.find, children: [
    /* @__PURE__ */ n(Jc, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: L.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function Zc(e, t) {
  const [a, r] = g(""), o = _(null), i = t !== void 0 && xc(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = o.current) == null || d.focus();
  };
  return i ? { find: t, query: a, setQuery: r, input: o, toFind: s, entries: Ic(e, a) } : { query: a, setQuery: r, input: o, entries: e };
}
const ed = { regular: void 0, large: L.large, touch: L.touch }, td = (e, t) => sn(L.panel, e ? L.edged : void 0, ed[t]);
function nd({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: L.empty, children: e.empty ?? "No matches" });
}
function xa({ entries: e, footer: t, align: a = "start", find: r, edges: o, size: i = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = Yc(), h = _(null);
  pa(u, h, a, o);
  const w = Zc(e, r), f = Rc(w.entries), v = jc(f.flatMap(Tc).map((z) => z.item)), T = qc(v, s, w.toFind), M = Oc(s);
  return Fc(v, s), /* @__PURE__ */ l("div", { ref: h, className: td(o, i), ...M, children: [
    w.find && /* @__PURE__ */ n(Xc, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: v, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: L.menu, ...T, children: f.map((z, me) => /* @__PURE__ */ n(Vc, { block: z, nav: v, popup: s }, me)) }),
    /* @__PURE__ */ n(nd, { find: w.find, count: v.items.length }),
    t && /* @__PURE__ */ n("p", { className: L.footer, children: t })
  ] });
}
function ad(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function La(e, t) {
  C(() => {
    const a = e.current;
    t === "page" && a && !ad(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const rd = (e, t) => e.reduce((a, r) => a + r + t, -t);
function od({ room: e, widths: t, more: a, gap: r }, o) {
  const i = t.map((d, u) => u);
  if (rd(t, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([o]);
  let c = t[o] + r + a;
  for (const d of i)
    if (d !== o) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Ft = (e) => Number.parseFloat(e) || 0, An = (e) => e.getBoundingClientRect().width;
function ld(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Ft(a.paddingInlineStart) - Ft(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), An),
    more: r ? An(r) : 0,
    gap: Ft(a.columnGap)
  };
}
function id(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const sd = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function Aa(e, t, a, r = ':scope > [role="tab"]') {
  const [o, i] = g(null);
  return tt(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = ld(s, r);
      i((u) => sd(u, d) ? u : d);
    };
    return c(), id(s, c);
  }, [e, a, r]), o && od(o, t);
}
const cd = "_strip_jqyo6_2", dd = "_fits_jqyo6_19", ud = "_probe_jqyo6_27", hd = "_moreRoot_jqyo6_36", md = "_more_jqyo6_36", wd = "_tab_jqyo6_55", fd = "_count_jqyo6_91", Z = {
  strip: cd,
  fits: dd,
  probe: ud,
  moreRoot: hd,
  more: md,
  tab: wd,
  count: fd
}, Ea = "More";
function _d(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const Ia = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function Ma(e) {
  return `${Z.strip} ward-tabs ward-tabs--${e}`;
}
const vd = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function bd({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ l(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${Z.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      onClick: () => r(e.id),
      ...a,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ l(x, { children: [
          " ",
          /* @__PURE__ */ n("span", { className: Z.count, children: `· ${e.count}` })
        ] })
      ]
    }
  );
}
function pd(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((i) => i.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function gd({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(Sa, { label: Ea, className: Z.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: Z.more }, children: /* @__PURE__ */ n(xa, { align: "end", entries: e.map((r) => ({ label: Ia(r), onSelect: () => a(r.id) })) }) });
}
function yd(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : vd;
}
function gT({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: o }) {
  const i = Et({ orientation: "horizontal" }), s = _d(e, t);
  C(() => i.setActive(s), [i.setActive, s]);
  const c = _(null);
  La(c, o);
  const d = Aa(c, s, e.map(Ia).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ l("div", { ref: c, className: `${Ma(o)} ${Z.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(bd, { tab: h, active: t, place: yd(i, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${Z.more} ${Z.probe}`, children: Ea }),
    u.length > 0 && /* @__PURE__ */ n(gd, { tabs: u, trigger: i.itemProps(e.length), onPick: pd(c, a) })
  ] });
}
const En = 7, Ba = "More", Nd = ":scope > a", ja = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, kd = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function $d(e, t) {
  return !e || e.includes(t) ? {} : kd;
}
function Cd({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, className: `${Z.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ l(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: Z.count, children: `· ${e.count}` })
    ] })
  ] });
}
function Sd({ links: e }) {
  return /* @__PURE__ */ n(Sa, { label: Ba, className: Z.moreRoot, trigger: { className: Z.more }, children: /* @__PURE__ */ n(xa, { align: "end", entries: e.map((t) => ({ label: ja(t), href: t.href })) }) });
}
function yT({ links: e, active: t, label: a, level: r }) {
  if (e.length > En) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${En} — the set is fixed`);
  const o = _(null);
  La(o, r);
  const i = Math.max(0, e.findIndex((d) => d.id === t)), s = Aa(o, i, e.map(ja).join(`
`), Nd), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ l("nav", { ref: o, className: `${Ma(r)} ${Z.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(Cd, { link: d, current: d.id === t, place: $d(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${Z.more} ${Z.probe}`, children: Ba }),
    c.length > 0 && /* @__PURE__ */ n(Sd, { links: c })
  ] });
}
const Rd = "_root_v56ff_3", Td = "_segment_v56ff_9", In = {
  root: Rd,
  segment: Td
};
function Pa({ options: e, value: t, onChange: a, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Et({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return C(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${In.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: In.segment,
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
const xd = "_sidebar_s9o1j_3", Ld = "_brand_s9o1j_9", Ad = "_mark_s9o1j_17", Ed = "_word_s9o1j_24", Id = "_nav_s9o1j_30", Md = "_navItem_s9o1j_39", Bd = "_footLink_s9o1j_49", jd = "_group_s9o1j_58", Pd = "_groupName_s9o1j_65", qd = "_agents_s9o1j_81", Od = "_agent_s9o1j_81", Dd = "_root_s9o1j_96", Fd = "_agentTop_s9o1j_105", Hd = "_dot_s9o1j_112", Wd = "_agentName_s9o1j_124", zd = "_agentMeta_s9o1j_138", Kd = "_foot_s9o1j_49", Gd = "_footName_s9o1j_150", Ud = "_footLinks_s9o1j_157", Vd = "_linkBrand_s9o1j_184", Yd = "_label_s9o1j_205", Jd = "_note_s9o1j_210", Qd = "_footer_s9o1j_226", A = {
  sidebar: xd,
  brand: Ld,
  mark: Ad,
  word: Ed,
  nav: Id,
  navItem: Md,
  new: "_new_s9o1j_48",
  footLink: Bd,
  group: jd,
  groupName: Pd,
  agents: qd,
  agent: Od,
  root: Dd,
  agentTop: Fd,
  dot: Hd,
  agentName: Wd,
  agentMeta: zd,
  foot: Kd,
  footName: Gd,
  footLinks: Ud,
  linkBrand: Vd,
  label: Yd,
  note: Jd,
  footer: Qd
};
function Xd({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ l(
    "a",
    {
      className: A.agent,
      href: W(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ l("span", { className: A.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: A.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": nn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: A.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: A.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Zd({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: A.foot, children: [
    /* @__PURE__ */ n("span", { className: A.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: A.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${A.footLink} ward-target`, href: W(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function eu({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: o, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ l("nav", { className: A.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ l("div", { className: A.brand, children: [
      /* @__PURE__ */ n("span", { className: A.mark }),
      /* @__PURE__ */ n("span", { className: A.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: A.nav, children: t.map((s) => /* @__PURE__ */ n("a", { className: A.navItem, href: W(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ l("div", { className: A.group, children: [
      /* @__PURE__ */ l("span", { className: A.groupName, children: [
        a,
        " · ",
        ae(r.length)
      ] }),
      o && /* @__PURE__ */ n("a", { className: A.new, href: W(o.href), children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: A.agents, children: r.map((s) => /* @__PURE__ */ n(Xd, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(Zd, { shared: i })
  ] });
}
function tu(e) {
  return e.destinations ?? e.items ?? [];
}
function nu({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: A.linkBrand, children: e });
}
function au({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: A.footer, children: e });
}
function ru({ link: e, active: t }) {
  return /* @__PURE__ */ l("a", { href: W(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: A.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: A.note, children: e.note })
  ] });
}
function ou(e) {
  return /* @__PURE__ */ l("aside", { className: `${A.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(nu, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: tu(e).map((t) => /* @__PURE__ */ n(ru, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(au, { children: e.children })
  ] });
}
function lu(e) {
  return "agents" in e;
}
function NT(e) {
  return lu(e) ? /* @__PURE__ */ n(eu, { ...e }) : /* @__PURE__ */ n(ou, { ...e });
}
const iu = "_mark_wlgi8_3", su = {
  mark: iu
}, cu = { met: "✓", unmet: "", failed: "✕" };
function cn({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: su.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: cu[e]
    }
  );
}
const du = "_avatar_1t33a_3", uu = {
  avatar: du
};
function Ct(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function hu(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [Ct(e), ...[...t.slice(1)].map((r) => a + r)];
}
function mu(e, t) {
  const a = hu(e).find((o) => !t.has(o));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(Ct(e).charAt(0) + String(r)); ) r += 1;
  return Ct(e).charAt(0) + String(r);
}
function kT(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const o = mu(r, t);
    t.add(o), a.set(r, o);
  }
  return a;
}
function wu(e) {
  return e != null && ut(e) ? Zr(e) : void 0;
}
function $T({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: uu.avatar, "data-size": a, "aria-hidden": "true", style: wu(t), children: r ?? Ct(e) });
}
const fu = "_marker_br9fi_2", _u = {
  marker: fu
}, vu = {
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
}, bu = { running: " ward-running" };
function He({ size: e, kind: t, label: a }) {
  const r = { "--marker": vu[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${_u.marker} ward-marker ward-marker--${t}${bu[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const pu = "_root_ti0pq_2", gu = "_chip_ti0pq_11", yu = "_noCase_ti0pq_23", ft = {
  root: pu,
  chip: gu,
  noCase: yu
};
function Nu(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function dn({ connection: e, since: t, lastEventAt: a }) {
  const r = Nu(t, a), o = an(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${ft.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(He, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${ft.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: ft.noCase, children: tn(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${ft.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    he(r)
  ] });
}
const ku = "_root_yylks_2", $u = "_context_yylks_13", Cu = "_row_yylks_1", Su = "_heading_yylks_27", Ru = "_headingWrap_yylks_35", Tu = "_meta_yylks_41", xu = "_chips_yylks_49", Lu = "_title_yylks_56", Au = "_consequence_yylks_66", Eu = "_actionsWrap_yylks_73", Iu = "_actions_yylks_73", Mu = "_action_yylks_73", Bu = "_overflowPanel_yylks_102", ju = "_measureClip_yylks_113", Pu = "_measure_yylks_113", U = {
  root: ku,
  context: $u,
  row: Cu,
  heading: Su,
  headingWrap: Ru,
  meta: Tu,
  chips: xu,
  title: Lu,
  consequence: Au,
  actionsWrap: Eu,
  actions: Iu,
  action: Mu,
  overflowPanel: Bu,
  measureClip: ju,
  measure: Pu
};
function qu({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(nt, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function Ou({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function Du({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function Fu({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ l("div", { className: U.meta, children: [
    /* @__PURE__ */ n(Ou, { chips: e }),
    /* @__PURE__ */ n(Du, { consequence: t, consequenceHint: a })
  ] });
}
function Hu({ title: e, chips: t, consequence: a, consequenceHint: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: U.heading, children: [
    /* @__PURE__ */ n(qu, { title: e, density: o }),
    /* @__PURE__ */ n(Fu, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function Yt({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function Mn({ disclosure: e }) {
  return /* @__PURE__ */ n(p, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Wu({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: o }) {
  return a ? r ? /* @__PURE__ */ n(p, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(Mn, { disclosure: o }) : t ? [/* @__PURE__ */ n(Mn, { disclosure: o }, "more"), /* @__PURE__ */ n(Yt, { actions: e }, "actions")] : /* @__PURE__ */ n(Yt, { actions: e });
}
function zu(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function Ku({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(Yt, { actions: e }) });
}
function Gu(e, t) {
  const a = N(), [r, o] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: a, toggle: () => o(!i) }, close: () => {
    var d, u;
    o(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const Uu = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function Vu(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && Uu(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function Yu({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(ls, { path: e.path, current: e.current }) });
}
function Ju(...e) {
  return e.some((t) => t === null);
}
function Qu(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Xu(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + Qu(e);
}
function Zu(e, t, a, r, o) {
  if (o === 0 || Ju(t, a, r)) return !1;
  const [i, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - Xu(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function eh(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function th(e) {
  return Ir(e) && (e.type === "a" || typeof e.props.href == "string");
}
function nh(e, t) {
  return t.length === 0 && e.length === 1 && th(e[0]);
}
function ah(e, t) {
  const a = _(null), r = _(null), o = _(null), i = _(null), [s, c] = g(!1);
  return C(() => {
    const d = a.current;
    if (!eh(d)) return;
    const u = () => c(Zu(d, r.current, o.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: o, measureRef: i, collapsed: s && !t };
}
function rh({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ l("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(p, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] }) });
}
function oh({ connection: e }) {
  return e ? /* @__PURE__ */ n(dn, { connection: e.connection, since: e.since }) : null;
}
function CT({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: o, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: v, measureRef: T, collapsed: M } = ah(s, nh(s, c)), z = c.length > 0, { disclosure: me, close: re } = Gu(M || z, v), Ee = zu(c, s, M, u);
  return /* @__PURE__ */ l("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(Yu, { crumb: Vu(e, r, t) }),
    /* @__PURE__ */ l("div", { className: U.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: f, className: U.headingWrap, children: /* @__PURE__ */ n(Hu, { title: r, chips: a, consequence: o, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ l("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(oh, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: v, "data-ward-actions": !0, children: /* @__PURE__ */ n(Wu, { actions: s, hasMore: z, collapsed: M, onOverflow: u, disclosure: me }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Ku, { actions: Ee, disclosure: me, onEscape: re }),
    /* @__PURE__ */ n(rh, { actions: s, hasMore: z, measureRef: T })
  ] });
}
const lh = "_root_td96x_2", ih = "_body_td96x_16", Bn = {
  root: lh,
  body: ih
};
function ST({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${Bn.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: Bn.body, children: a }) });
}
const sh = "_root_bf1pc_2", ch = "_table_bf1pc_9", dh = "_caption_bf1pc_14", uh = "_series_bf1pc_23", hh = "_category_bf1pc_31", mh = "_cell_bf1pc_39", wh = "_track_bf1pc_45", fh = "_lane_bf1pc_52", _h = "_bar_bf1pc_56", vh = "_value_bf1pc_63", bh = "_swatch_bf1pc_70", ph = "_empty_bf1pc_78", X = {
  root: sh,
  table: ch,
  caption: dh,
  series: uh,
  category: hh,
  cell: mh,
  track: wh,
  lane: fh,
  bar: _h,
  value: vh,
  swatch: bh,
  empty: ph
}, gh = "—", jn = 6;
function yh(e, t) {
  if (t.length < 1 || t.length > jn)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${jn}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function Nh(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function qa(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function kh(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function $h({ value: e, top: t, step: a, format: r, missing: o }) {
  const i = kh(e, t), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ l("span", { className: X.track, children: [
    /* @__PURE__ */ n("span", { className: X.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${X.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: X.value, children: e === null ? o : r(e) })
  ] }) });
}
function Ch({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ l("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: X.swatch, "data-step": qa(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function Sh({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ l("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: X.caption, children: e }),
    /* @__PURE__ */ n("p", { className: X.empty, children: t })
  ] });
}
function Rh({ title: e, categories: t, series: a, top: r, format: o = ae, categoryHead: i = "Category", missing: s = gh }) {
  return /* @__PURE__ */ n("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ l("table", { className: X.table, children: [
    /* @__PURE__ */ n("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: X.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Ch, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: X.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n($h, { value: u.values[d], top: r, step: qa(h, a.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function RT(e) {
  yh(e.categories, e.series);
  const t = Nh(e.series);
  return t === 0 ? /* @__PURE__ */ n(Sh, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Rh, { ...e, top: t });
}
const Th = "_root_1bfqw_2", xh = "_figure_1bfqw_7", Lh = "_of_1bfqw_13", Ah = "_bar_1bfqw_18", Eh = "_rows_1bfqw_38", Ih = "_row_1bfqw_38", Mh = "_label_1bfqw_49", Bh = "_amount_1bfqw_54", Ie = {
  root: Th,
  figure: xh,
  of: Lh,
  bar: Ah,
  rows: Eh,
  row: Ih,
  label: Mh,
  amount: Bh
};
function jh({ spent: e, ceiling: t, breakdown: a }) {
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
const Ph = "_frame_f7bxz_2", qh = "_table_f7bxz_6", Oh = "_th_f7bxz_12", Dh = "_td_f7bxz_13", Fh = "_sort_f7bxz_53", Hh = "_row_f7bxz_65", Wh = "_empty_f7bxz_73", qe = {
  frame: Ph,
  table: qh,
  th: Oh,
  td: Dh,
  sort: Fh,
  row: Hh,
  empty: Wh
}, zh = { asc: "ascending", desc: "descending" };
function Kh(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return zh[t.direction];
}
function Gh(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: qe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function Uh(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Vh({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: qe.th,
      style: Uh(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Kh(e, t),
      children: Gh(e, a)
    }
  );
}
function Yh({ row: e, props: t }) {
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
function Jh({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: qe.head, children: t.map((w) => /* @__PURE__ */ n(Vh, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(Yh, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: o, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const Qh = "_list_v0s52_2", Xh = {
  list: Qh
};
function TT({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: Xh.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const Zh = "_label_1u62a_2", em = {
  label: Zh
};
function xT({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: em.label, children: t.header }) }, t.key)) }) });
}
const tm = "_stack_bp6a0_2", nm = {
  stack: tm
};
function LT({ children: e }) {
  return /* @__PURE__ */ n("span", { className: nm.stack, "data-ward-action-stack": "", children: e });
}
const am = "_set_1z0sq_2", rm = "_legend_1z0sq_7", om = "_row_1z0sq_15", lm = "_control_1z0sq_20", im = "_input_1z0sq_26", sm = "_label_1z0sq_31", cm = "_consequence_1z0sq_36", ze = {
  set: am,
  legend: rm,
  row: om,
  control: lm,
  input: im,
  label: sm,
  consequence: cm
};
function Oa({ legend: e, options: t, value: a, onChange: r, disabled: o, name: i, describedBy: s, variant: c }) {
  const d = N(), u = i ?? d;
  return /* @__PURE__ */ l("fieldset", { className: ze.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: ze.legend, children: e }),
    t.map((h) => {
      const w = `${u}-${h.value}`, f = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ l("div", { className: ze.row, children: [
        /* @__PURE__ */ l("span", { className: ze.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: ze.input,
              value: h.value,
              checked: a === h.value,
              disabled: o,
              "aria-describedby": at(f, s),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: w, className: ze.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: f, className: `${ze.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const dm = "_root_11gpw_2", um = "_head_11gpw_10", hm = "_note_11gpw_29", mm = "_index_11gpw_34", wm = "_dot_11gpw_38", fm = "_counter_11gpw_49", _m = "_trailing_11gpw_57", Ke = {
  root: dm,
  head: um,
  note: hm,
  index: mm,
  dot: wm,
  counter: fm,
  trailing: _m
};
function vm({ index: e }) {
  return e ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ke.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ke.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function bm({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ke.counter, "aria-hidden": "true", children: e }) : null;
}
function Pn({ title: e, index: t, note: a, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Ke.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Ke.head, children: [
      /* @__PURE__ */ n(vm, { index: t }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ke.note, children: a }),
    /* @__PURE__ */ n(bm, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ke.trailing, children: i })
  ] });
}
const pm = "_strip_c3x3u_2", gm = "_cell_c3x3u_7", ym = "_value_c3x3u_12", Nm = "_link_c3x3u_29", km = "_label_c3x3u_49", $m = "_tiles_c3x3u_101", Fe = {
  strip: pm,
  cell: gm,
  value: ym,
  link: Nm,
  label: km,
  tiles: $m
};
function Da(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((o) => o.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Fa = (e) => `${Fe.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Cm({ cell: e }) {
  return /* @__PURE__ */ l("div", { className: Fe.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: Fa(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${Fe.label} ward-stat-label`, children: e.label })
  ] });
}
function Sm({ cell: e, href: t }) {
  return /* @__PURE__ */ l("div", { className: Fe.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: Fa(e), title: e.hint, children: /* @__PURE__ */ l("a", { className: `${Fe.link} ward-stat-link`, href: W(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${Fe.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Ha = (e) => e.href === void 0 ? /* @__PURE__ */ n(Cm, { cell: e }, e.label) : /* @__PURE__ */ n(Sm, { cell: e, href: e.href }, e.label);
function jt({ cells: e, divided: t = !1 }) {
  return Da("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${Fe.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(Ha) });
}
const qn = 6;
function AT({ cells: e }) {
  Da("StatTiles", e, [1, 2 * qn]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, qn) };
  return /* @__PURE__ */ n("dl", { className: `${Fe.tiles} ward-stattiles`, style: t, children: e.map(Ha) });
}
const Rm = "_root_1eb1u_2", Tm = "_track_1eb1u_8", xm = "_thumb_1eb1u_46", Lm = "_labelHidden_1eb1u_64", Am = "_label_1eb1u_64", Em = "_lockedNote_1eb1u_84", Ge = {
  root: Rm,
  track: Tm,
  thumb: xm,
  labelHidden: Lm,
  label: Am,
  lockedNote: Em
};
function Im(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function Mm(e) {
  return e ? `${Ge.label} ${Ge.labelHidden}` : Ge.label;
}
function Bm(e, t, a) {
  return e && !t && a ? a : void 0;
}
function jm(e, t, a, r) {
  return { "aria-describedby": Mt(at(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function Pm({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ve({ label: e, checked: t, onChange: a, disabled: r, locked: o, describedBy: i, labelHidden: s, disabledReason: c }) {
  const d = N(), u = `${d}switch`, h = `${d}reason`, w = Ae(), { on: f, off: v } = Im(t, r, o, w !== null), T = Bm(v, w !== null, c);
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
        ...jm(h, i, w, T),
        className: `${Ge.track} ward-switch`,
        "data-on": f,
        "data-locked": o ? !0 : void 0,
        disabled: v,
        onClick: () => !v && (a == null ? void 0 : a(!f)),
        children: /* @__PURE__ */ n("span", { className: Ge.thumb })
      }
    ),
    /* @__PURE__ */ l("label", { id: d, htmlFor: u, className: Mm(s), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ge.lockedNote, children: "always on" })
    ] }),
    /* @__PURE__ */ n(Pm, { id: h, reason: T })
  ] });
}
const qm = "_bar_1vp69_2", Om = "_skip_1vp69_11", Dm = "_mark_1vp69_22", Fm = "_nav_1vp69_30", Hm = "_list_1vp69_34", Wm = "_select_1vp69_41", zm = "_selectTrigger_1vp69_45", Km = "_dest_1vp69_52", Gm = "_actor_1vp69_71", Um = "_actorMark_1vp69_84", Vm = "_actorLabel_1vp69_89", Ym = "_tagline_1vp69_108", se = {
  bar: qm,
  skip: Om,
  mark: Dm,
  nav: Fm,
  list: Hm,
  select: Wm,
  selectTrigger: zm,
  dest: Km,
  actor: Gm,
  actorMark: Um,
  actorLabel: Vm,
  tagline: Ym
};
function Jm(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function Qm(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function ET({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: o, onNavigate: i, skipTo: s = "main" }) {
  const c = Qm(r);
  return /* @__PURE__ */ l("header", { className: se.bar, children: [
    /* @__PURE__ */ n("a", { className: `${se.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: se.mark, children: e }),
    o && /* @__PURE__ */ n("span", { className: se.tagline, children: o }),
    /* @__PURE__ */ l("nav", { className: se.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: se.list, children: t.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${se.dest} ward-target`,
          href: W(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        ka,
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
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: Jm(c) })
    ] })
  ] });
}
const Xm = "_tree_zzoob_2", Zm = "_item_zzoob_6", ew = "_row_zzoob_10", tw = "_button_zzoob_22", St = {
  tree: Xm,
  item: Zm,
  row: ew,
  button: tw
}, Wa = Ne(null);
function nw({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Et({ orientation: "vertical" });
  return /* @__PURE__ */ n(Wa.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: St.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const aw = { ArrowRight: !0, ArrowLeft: !1 };
function On(e) {
  return e ? !0 : void 0;
}
function rw(e, t) {
  const a = aw[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function ow(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function lw(e) {
  const t = [St.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function iw(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function sw(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function cw(e) {
  return typeof e == "string" ? e : void 0;
}
function dw({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function uw({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function za(e) {
  const t = ye(Wa);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = iw(e);
  return /* @__PURE__ */ l("li", { className: St.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: lw(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": On(e.unresolved),
        "data-inherited": On(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${St.button} ward-treeitem-btn`,
            onClick: () => ow(e),
            onKeyDown: (r) => rw(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: sw(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: cw(e.label), children: e.label }),
              /* @__PURE__ */ n(dw, { value: e.detail }),
              /* @__PURE__ */ n(uw, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const hw = "_frame_10gwd_2", mw = "_subjectRail_10gwd_22", ww = "_subject_10gwd_22", fw = "_rail_10gwd_42", _w = "_record_10gwd_66", vw = "_recordBody_10gwd_71", bw = "_stageGrid_10gwd_120", pw = "_band_10gwd_134", gw = "_bandBody_10gwd_142", yw = "_bandActions_10gwd_147", Nw = "_scroller_10gwd_155", kw = "_board_10gwd_182", $w = "_lanes_10gwd_191", Cw = "_cardGrid_10gwd_225", ee = {
  frame: hw,
  subjectRail: mw,
  subject: ww,
  rail: fw,
  record: _w,
  recordBody: vw,
  stageGrid: bw,
  band: pw,
  bandBody: gw,
  bandActions: yw,
  scroller: Nw,
  board: kw,
  lanes: $w,
  cardGrid: Cw
};
function IT({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: ee.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function Dn(e) {
  return e ? "true" : void 0;
}
function MT({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: ee.subjectRail, "data-ward-subject-rail": a, "data-ruled": Dn(i), children: [
    /* @__PURE__ */ n("div", { className: ee.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ee.rail, "data-sticky": Dn(o), "aria-label": r, children: t })
  ] });
}
function BT({ title: e, children: t, note: a, trailing: r, pad: o = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(Pn, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ l("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(Pn, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: ee.recordBody, "data-pad": o, "data-measure": c, children: t })
  ] });
}
const Sw = "_form_1j8ub_2", Rw = "_fields_1j8ub_9", Tw = "_actions_1j8ub_19", Ht = {
  form: Sw,
  fields: Rw,
  actions: Tw
};
function jT({ label: e, children: t, actions: a, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: Ht.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ht.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: Ht.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function PT({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ l("section", { className: ee.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ee.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: ee.bandActions, children: t })
  ] });
}
const xw = "(max-width: 767.98px)";
function un({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(on, { className: ee.scroller, label: e, count: a ?? Mr.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function Lw({ lanes: e, label: t, laneLabel: a }) {
  const [r, o] = g(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ l("div", { className: ee.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(P, { kind: "select", label: a, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ n(un, { label: t, children: i == null ? void 0 : i.content })
  ] });
}
function Aw({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: ee.board, "data-ward-board": "", children: /* @__PURE__ */ n(un, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(na, { children: a.content }, a.id)) }) });
}
function qT({ children: e, label: t = "Workflow board", lanes: a, laneLabel: r = "Column" }) {
  const o = ct(xw);
  return a === void 0 ? /* @__PURE__ */ n(un, { label: t, children: e }) : o ? /* @__PURE__ */ n(Lw, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(Aw, { lanes: a, label: t });
}
function OT({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), i = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ n(on, { className: ee.stageGrid, label: a, count: o, "data-ward-stage-grid": "", "data-floor": r, style: i, children: t });
}
function DT({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${ee.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const Ew = "_block_6tv5x_3", Iw = "_sentence_6tv5x_10", Mw = "_meta_6tv5x_19", Bw = "_ways_6tv5x_24", jw = "_action_6tv5x_38", Pw = "_strip_6tv5x_42", qw = "_loading_6tv5x_61", Ow = "_label_6tv5x_69", Dw = "_counter_6tv5x_76", _e = {
  block: Ew,
  sentence: Iw,
  meta: Mw,
  ways: Bw,
  action: jw,
  strip: Pw,
  loading: qw,
  label: Ow,
  counter: Dw
};
function Fw({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(p, { onClick: e.onClick, children: e.label }) });
}
function Pt({ sentence: e, action: t, children: a, role: r = "status", tone: o, kind: i, ask: s }) {
  return /* @__PURE__ */ l("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ l("p", { className: _e.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ l(x, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(Fw, { action: t })
  ] });
}
function Hw(e) {
  return /* @__PURE__ */ n(Pt, { ...e, kind: "ward-emptystate" });
}
function FT({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(Pt, { sentence: e, action: a, children: /* @__PURE__ */ l("p", { className: _e.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function Ww({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${_e.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(p, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function HT({ ways: e, ...t }) {
  return /* @__PURE__ */ n(Pt, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(Ww, { ways: e }) });
}
function WT({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(Pt, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ l("p", { className: _e.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function zT({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ l("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function KT({ queued: e, since: t }) {
  return /* @__PURE__ */ l("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function GT({ label: e, startedAt: t }) {
  const a = _(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = g(!1);
  C(() => {
    const s = window.setTimeout(() => o(!0), be.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = an(a.current, r);
  return /* @__PURE__ */ l("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: _e.counter, children: tn(i) }) : null
  ] });
}
const zw = "_note_cigdt_2", Kw = {
  note: zw
};
function Gw({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ l("p", { className: Kw.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const Uw = "_card_k7btg_3", Vw = "_hit_k7btg_31", Yw = "_head_k7btg_44", Jw = "_title_k7btg_51", Qw = "_meta_k7btg_57", Xw = "_since_k7btg_66", Zw = "_sep_k7btg_76", ef = "_fields_k7btg_80", tf = "_field_k7btg_80", nf = "_last_k7btg_98", af = "_reason_k7btg_110", de = {
  card: Uw,
  hit: Vw,
  head: Yw,
  title: Jw,
  meta: Qw,
  since: Xw,
  sep: Zw,
  fields: ef,
  field: tf,
  last: nf,
  reason: af
}, rf = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function of(e, t, a) {
  const r = bt(e, "blue"), o = bt(e, "orange"), i = bt(e, "green"), s = _(/* @__PURE__ */ new Set());
  C(() => {
    if (!a) return;
    const c = { blue: r, orange: o, green: i };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = rf[d.type];
      u && c[u]();
    });
  }, [r, a, i, t, o]);
}
const lf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function sf(e, t) {
  return lf[t](e);
}
function cf({ item: e, connection: t }) {
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
function df({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ l("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function uf({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function hf({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: de.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: de.field, children: sf(e, a) }, a)) });
}
const Jt = (e) => e ? !0 : void 0;
function mf(e) {
  return { "--stream": ge(e.streamStep, "id") };
}
function wf(e, t, a) {
  e == null || e(t, a);
}
function ff(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function _f({ item: e, stale: t }) {
  var r, o;
  const a = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: de.last, "data-stale": Jt(t), children: a }) : null;
}
function qt(e) {
  const t = e.fields ?? [], a = e.item, r = _(null);
  of(r, a.key, e.feed);
  const o = ff(e.feed), i = mf(a);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: de.card,
      style: i,
      "data-selected": Jt(e.selected),
      "data-flagged": Jt(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: de.hit, onClick: (s) => wf(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(df, { item: a }),
        /* @__PURE__ */ n(nt, { as: "p", className: de.title, text: a.title }),
        /* @__PURE__ */ n(cf, { item: a, connection: o }),
        /* @__PURE__ */ n(uf, { reason: a.blockedReason }),
        /* @__PURE__ */ n(hf, { item: a, fields: t }),
        /* @__PURE__ */ n(_f, { item: a, stale: o === "stale" })
      ]
    }
  );
}
const vf = "_column_1j8bi_3", bf = "_head_1j8bi_21", pf = "_label_1j8bi_30", gf = "_count_1j8bi_39", yf = "_list_1j8bi_53", it = {
  column: vf,
  head: bf,
  label: pf,
  count: gf,
  list: yf
};
function Ka(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function Nf({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ l("div", { className: it.head, children: [
    /* @__PURE__ */ n("h2", { className: it.label, id: a, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ l("span", { className: it.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function kf(e) {
  return /* @__PURE__ */ n("div", { className: it.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      qt,
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
function $f({ column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), h = e.cap !== void 0 && t.length > e.cap, w = Ka(t, r);
  return /* @__PURE__ */ l("section", { className: it.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Nf, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(kf, { column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n(Gw, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const Cf = "_foot_cs4jr_2", Sf = "_note_cs4jr_13", Rf = "_link_cs4jr_19", Wt = {
  foot: Cf,
  note: Sf,
  link: Rf
};
function UT({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: Wt.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Wt.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Wt.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const Tf = "_head_1tfi5_3", xf = "_identity_1tfi5_12", Lf = "_titleRow_1tfi5_18", Af = "_title_1tfi5_18", Ef = "_key_1tfi5_35", If = "_rollup_1tfi5_45", Mf = "_tools_1tfi5_53", Bf = "_swatch_1tfi5_101", jf = "_mark_1tfi5_108", Se = {
  head: Tf,
  identity: xf,
  titleRow: Lf,
  title: Af,
  key: Ef,
  rollup: If,
  tools: Mf,
  swatch: Bf,
  mark: jf
}, Fn = "initials:";
function Pf(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function qf(e) {
  const t = [Pf(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function Of(e) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ l("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    qf(e)
  ] });
}
function Df(e) {
  return e.startsWith(Fn) ? e.slice(Fn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function Ff({ markRef: e, streamStep: t }) {
  const a = { "--stream": ge(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Se.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: Df(e) }) : /* @__PURE__ */ n("span", { className: Se.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Hf({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(P, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function VT({
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
        /* @__PURE__ */ n(Ff, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Se.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Se.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Se.rollup, "aria-live": "polite", children: Of(t) })
    ] }),
    /* @__PURE__ */ l("div", { className: Se.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Hf, { owners: o, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(p, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(dn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const Wf = "_head_1sejb_14", zf = "_line_1sejb_15", Kf = "_cHandle_1sejb_36", Gf = "_cName_1sejb_41", Uf = "_nameLine_1sejb_49", Vf = "_cLabel_1sejb_56", Yf = "_cCap_1sejb_61", Jf = "_cShown_1sejb_66", Qf = "_name_1sejb_49", Xf = "_noCap_1sejb_88", Zf = "_state_1sejb_102", e_ = "_handle_1sejb_111", t_ = "_sub_1sejb_137", q = {
  head: Wf,
  line: zf,
  cHandle: Kf,
  cName: Gf,
  nameLine: Uf,
  cLabel: Vf,
  cCap: Yf,
  cShown: Jf,
  name: Qf,
  noCap: Xf,
  state: Zf,
  handle: e_,
  sub: t_
}, n_ = "can't be hidden or collapsed", a_ = "terminal · counted, not a column", r_ = "A human gate is always shown, so people see what waits for them.", o_ = "A terminal stage is counted, not shown as a column.";
function YT() {
  return /* @__PURE__ */ l("div", { className: q.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: q.cHandle }),
    /* @__PURE__ */ n("span", { className: q.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: q.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: q.cShown, children: "Shown" })
  ] });
}
function l_(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function i_(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Hn(e) {
  return e.gate ? n_ : e.terminal ? a_ : i_(e.agentsMounted);
}
function s_(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function c_({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: q.cName, children: [
    /* @__PURE__ */ l("span", { className: q.nameLine, children: [
      /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Hn(e) && /* @__PURE__ */ n("span", { className: q.sub, children: Hn(e) })
  ] });
}
function d_(e) {
  return e === void 0 ? "" : String(e);
}
function u_(e) {
  return e === "" ? void 0 : Number(e);
}
function h_({ name: e, onReorder: t }) {
  const a = Ae();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ n("span", { className: q.cHandle }) : /* @__PURE__ */ n("span", { className: q.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: q.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && s_(r, t),
      children: "⠿"
    }
  ) });
}
function m_({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${q.cCap} ${q.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: q.cCap, children: /* @__PURE__ */ n(P, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: d_(t.cap), onChange: (r) => a({ ...t, cap: u_(r) }) }) });
}
function w_(e) {
  return e.gate ? r_ : e.terminal ? o_ : void 0;
}
function f_({ stage: e, config: t, onChange: a }) {
  const r = Ae() !== null, o = l_(e, t.shown), i = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ l("span", { className: q.cShown, children: [
    /* @__PURE__ */ n(Ve, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, disabledReason: w_(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: q.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!o.shown), children: o.state })
  ] });
}
function __(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function JT({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: q.line, "data-kind": __(e), children: [
    /* @__PURE__ */ n(h_, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(c_, { stage: e }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: /* @__PURE__ */ n(P, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (o) => a({ ...t, label: o }) }) }),
    /* @__PURE__ */ n(m_, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(f_, { stage: e, config: t, onChange: a })
  ] });
}
const v_ = "_body_8qsv9_2", b_ = "_head_8qsv9_9", p_ = "_summary_8qsv9_19", g_ = "_block_8qsv9_20", y_ = "_actionsBlock_8qsv9_21", N_ = "_title_8qsv9_41", k_ = "_note_8qsv9_46", $_ = "_k_8qsv9_51", C_ = "_kv_8qsv9_58", S_ = "_row_8qsv9_64", R_ = "_label_8qsv9_75", T_ = "_value_8qsv9_84", x_ = "_quote_8qsv9_90", L_ = "_actions_8qsv9_21", A_ = "_resolve_8qsv9_111", D = {
  body: v_,
  head: b_,
  summary: p_,
  block: g_,
  actionsBlock: y_,
  title: N_,
  note: k_,
  k: $_,
  kv: C_,
  row: S_,
  label: R_,
  value: T_,
  quote: x_,
  actions: L_,
  resolve: A_
};
function E_(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function I_(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function M_(e) {
  const t = mt(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function B_(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function j_(e, t, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Bt(M_(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...E_(e),
    ...B_(a),
    ...I_(e, t)
  ];
}
function P_({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: D.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: D.k, children: t }),
    e
  ] });
}
function q_(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function O_({ item: e, showKey: t }) {
  const a = q_(e);
  return !t && !a ? null : /* @__PURE__ */ l("div", { className: D.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function D_({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: D.block, children: [
    /* @__PURE__ */ n("p", { className: D.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: D.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: D.note, children: e.agentMeta })
  ] }) : null;
}
function QT({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: o, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = N(), w = j_(e, o, d);
  return /* @__PURE__ */ n(rt, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: D.body, children: [
    /* @__PURE__ */ n(O_, { item: e, showKey: u }),
    /* @__PURE__ */ l("div", { className: D.summary, children: [
      /* @__PURE__ */ n("h2", { className: D.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: D.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: D.kv, children: w.map(([f, v, T]) => /* @__PURE__ */ l("div", { className: D.row, children: [
      /* @__PURE__ */ n("dt", { className: D.label, children: f }),
      /* @__PURE__ */ n("dd", { className: D.value, children: v })
    ] }, T ?? f)) }),
    /* @__PURE__ */ n(D_, { item: e }),
    /* @__PURE__ */ l("div", { className: D.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: D.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: D.note, children: c })
    ] }),
    /* @__PURE__ */ n(P_, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const F_ = "_root_3azmy_2", H_ = "_list_3azmy_7", W_ = "_item_3azmy_12", z_ = "_box_3azmy_18", K_ = "_text_3azmy_23", G_ = "_note_3azmy_28", Je = {
  root: F_,
  list: H_,
  item: W_,
  box: z_,
  text: K_,
  note: G_
};
function Ot({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ l("div", { className: Je.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${Je.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${Je.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Je.box, children: /* @__PURE__ */ n(cn, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Je.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${Je.note} ward-checklist-note`, children: t })
  ] });
}
const U_ = "_rail_znbbp_2", V_ = "_k_znbbp_11", Y_ = "_head_znbbp_19", J_ = "_section_znbbp_25", Q_ = "_card_znbbp_39", X_ = "_strip_znbbp_46", Z_ = "_skeleton_znbbp_60", ev = "_skeletonLabel_znbbp_74", tv = "_bar_znbbp_80", nv = "_note_znbbp_89", fe = {
  rail: U_,
  k: V_,
  head: Y_,
  section: J_,
  card: Q_,
  strip: X_,
  skeleton: Z_,
  skeletonLabel: ev,
  bar: tv,
  note: nv
};
function av(e) {
  return (t) => e == null ? void 0 : e(t);
}
function zt({ title: e, children: t }) {
  return /* @__PURE__ */ l("section", { className: fe.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: fe.k, children: e }),
    t
  ] });
}
function rv({ column: e, count: t }) {
  return /* @__PURE__ */ l("div", { className: fe.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: fe.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: fe.bar, "aria-hidden": "true" }, r))
  ] });
}
function ov({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n($f, { column: o, items: t.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, o.id));
}
function lv(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(ov, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(rv, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function XT(e) {
  const t = av(e.onOpen), a = Ka(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: fe.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${fe.k} ${fe.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(zt, { title: "Card", children: /* @__PURE__ */ n("div", { className: fe.card, children: a && /* @__PURE__ */ n(qt, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ l(zt, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: fe.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(lv, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(zt, { title: "Effect of this config", children: /* @__PURE__ */ n(Ot, { items: e.effects, density: "compact" }) })
  ] });
}
function iv(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function sv(e) {
  return Math.ceil(e.length / 2);
}
function cv(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Ga(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function dv(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const o = Ga(e);
  o !== void 0 && a(o), r(cv(e.type));
}
function uv(e, t, a, r, o) {
  C(() => {
    if (e !== null)
      return e.subscribe(t, (i) => dv(i, a, r, o));
  }, [e, t, a, r, o]);
}
function hv(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function mv(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function wv(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function fv(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + B.height.card + " + " + B.height.cardRow + " * " + String(sv(t ?? [])) + ")"
  };
}
function _v(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function vv(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: le(e.cost) }) : null;
}
function bv(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function pv(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function gv(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function yv(e, t) {
  return t === void 0 ? e : iv(e, t.ref);
}
function Nv(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function dt(e) {
  return e === !0 ? "true" : void 0;
}
function Ua(e) {
  const t = e.item, a = t.run, r = a !== void 0, o = _(null), i = bt(o), s = _(/* @__PURE__ */ new Set()), [c, d] = g(hv(t));
  uv(e.feed, t.key, s, d, i);
  const u = mv(t, r), h = wv(t, a), w = fv(t, e.fields), f = gv(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...Nv(e),
      className: "ward-workcard",
      "data-flagged": dt(t.flagged),
      "data-selected": dt(e.selected),
      style: w,
      ref: yv(o, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        _v(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          vv(t, e.fields),
          bv(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          pv(a, c, e.connection, t.changedAt),
          f !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function kv({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function $v(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Cv(e, t, a) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function Sv(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(kv, { count: e.items.length, cap: e.column.cap });
}
function Rv(e, t) {
  return e.roving ?? t;
}
function Tv(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function xv(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    Ua,
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
function Lv(e) {
  const t = N(), a = Et({ orientation: "vertical" }), r = Rv(e, a), o = $v(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": dt(o), "data-gate": dt(e.column.gate), children: [
    Cv(e.column, e.items.length, t),
    Sv(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Tv(e, a), children: xv(e, r) })
  ] });
}
function Av(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function Ev(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(P, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function Iv(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(p, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function ZT(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Av(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      Ev(e),
      Iv(e.onConfigure),
      /* @__PURE__ */ n(dn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Mv(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Bv(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ve, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ve, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function jv(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(x, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function e2(e) {
  const t = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": dt(Mv(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Bv(e) }),
    /* @__PURE__ */ n(P, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(fa, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    jv(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function t2(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(Ua, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Lv, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function Pv(e, t) {
  const a = Ga(e);
  a !== void 0 && t(a);
}
function qv(e, t, a) {
  C(() => {
    if (e != null)
      return e.subscribe(t, (r) => Pv(r, a));
  }, [e, t, a]);
}
function Ov(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function Dv(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function Fv(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Hv(e, t) {
  return /* @__PURE__ */ l(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function n2(e) {
  var s;
  const t = e.item, a = t.run, [r, o] = g((s = t.run) == null ? void 0 : s.lastStep);
  qv(e.feed, t.key, o);
  const i = [...Ov(t), ...Dv(t)];
  return /* @__PURE__ */ l(rt, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Fv(a, r)
    ] }),
    Hv(t, e.actions)
  ] });
}
const Wv = "_card_1nkkx_3", zv = "_head_1nkkx_30", Kv = "_mark_1nkkx_38", Gv = "_name_1nkkx_50", Uv = "_chips_1nkkx_71", Vv = "_description_1nkkx_77", Yv = "_run_1nkkx_82", Jv = "_sep_1nkkx_91", Qv = "_facts_1nkkx_97", Xv = "_fact_1nkkx_97", Zv = "_factLabel_1nkkx_111", eb = "_factValue_1nkkx_115", ie = {
  card: Wv,
  head: zv,
  mark: Kv,
  name: Gv,
  chips: Uv,
  description: Vv,
  run: Yv,
  sep: Jv,
  facts: Qv,
  fact: Xv,
  factLabel: Zv,
  factValue: eb
}, tb = { live: "done", draft: "running", paused: "meta" };
function nb(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function ab({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: tb[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function rb({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function ob({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function lb({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ l("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function ib(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function sb({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: o, facts: i, className: s }) {
  const c = { "--stream": ge(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": d,
      className: nb(s),
      style: c,
      "data-selected": d,
      "data-paused": ib(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ l("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: W(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(rb, { description: e.description }),
        /* @__PURE__ */ n(ob, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(ab, { versions: e.versions }),
        /* @__PURE__ */ n(lb, { facts: i })
      ]
    }
  );
}
const cb = "_list_4dcyc_2", db = "_row_4dcyc_11", ub = "_head_4dcyc_23", hb = "_id_4dcyc_30", mb = "_lock_4dcyc_35", wb = "_reason_4dcyc_41", fb = "_remove_4dcyc_46", _b = "_clauses_4dcyc_50", vb = "_clause_4dcyc_50", bb = "_label_4dcyc_64", pb = "_cell_4dcyc_71", gb = "_value_4dcyc_76", ce = {
  list: cb,
  row: db,
  head: ub,
  id: hb,
  lock: mb,
  reason: wb,
  remove: fb,
  clauses: _b,
  clause: vb,
  label: bb,
  cell: pb,
  value: gb
}, Va = Ne(!1);
function a2({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(Va.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function yb({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(P, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => a(e.key, o) });
}
function Nb({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function kb({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ l("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Nb, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ l(p, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Wn(e, t) {
  return e.locked ? void 0 : t;
}
function r2({ rule: e, onChange: t, onRemove: a }) {
  if (!ye(Va)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Wn(e, t);
  return /* @__PURE__ */ l("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(kb, { rule: e, onRemove: Wn(e, a) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(yb, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const $b = "_ladder_1xdeh_2", Cb = "_cell_1xdeh_7", Sb = "_empty_1xdeh_26", Rb = "_name_1xdeh_34", Tb = "_holder_1xdeh_40", xb = "_request_1xdeh_46", Lb = "_swatches_1xdeh_51", Ab = "_swatch_1xdeh_51", Eb = "_tilesFrame_1xdeh_78", Ib = "_tiles_1xdeh_78", Mb = "_tile_1xdeh_78", Bb = "_bar_1xdeh_117", jb = "_hex_1xdeh_128", Pb = "_note_1xdeh_138", I = {
  ladder: $b,
  cell: Cb,
  empty: Sb,
  name: Rb,
  holder: Tb,
  request: xb,
  swatches: Lb,
  swatch: Ab,
  tilesFrame: Eb,
  tiles: Ib,
  tile: Mb,
  bar: Bb,
  hex: jb,
  note: Pb
}, o2 = "not validated yet, pending a CVD matrix and dark stepping";
function qb(e) {
  return e.reserved ? "reserved" : ut(e.step) ? "validated" : "partial";
}
function Ya(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Ob(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Db({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(He, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${I.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Fb(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function Hb(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const zn = (e) => String(e).padStart(2, "0");
function Wb(e, t, a) {
  return e === "reserved" ? "Reserved until revalidated" : a ? "yours" : t ?? Ya(e, void 0);
}
function zb({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${I.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${I.hex} ward-ladder-hex`, children: r ? `step ${zn(e)}` : to(e) }),
    /* @__PURE__ */ n("span", { className: `${I.note} ward-ladder-note`, children: r ? a : `Step ${zn(e)} · ${a}` })
  ] });
}
function Kb({ step: e, value: t, taken: a, onChange: r, presentation: o, disabled: i }) {
  const s = qb(e), c = Ya(s, a), d = c !== "free", u = d || i, h = t === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, v = `${w} · ${o === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": v, ...Hb(d, h, u), "data-validation": s, style: Ob(e, s), onClick: f, onKeyDown: (M) => Fb(M, f) }, label: v, name: w, holder: c, validation: s, note: Wb(s, a, h), step: e.step };
}
const Gb = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${I.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${I.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(zb, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${I.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Db, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${I.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${I.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Ub(e) {
  return Gb[e.presentation](Kb(e));
}
function Vb(e) {
  for (const t of e)
    if (!t.reserved && !It(t.step)) throw new Error("colour ladder renders token steps only");
}
function Yb() {
  return /* @__PURE__ */ l("div", { className: `${I.cell} ward-ladder-cell ${I.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${I.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${I.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${I.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Jb(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Qb = { list: I.ladder, swatches: I.swatches, tiles: I.tilesFrame };
function Xb() {
  return /* @__PURE__ */ l("div", { className: `${I.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${I.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${I.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${I.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Zb = { list: Yb, swatches: () => null, tiles: Xb };
function ep(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Ja(e) {
  const t = e.takenBy ?? {}, a = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Vb(e.steps);
  const r = Jb(e), o = Zb[r], i = /* @__PURE__ */ l(x, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(Ub, { step: s, value: e.value, taken: t[s.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...ep(e.disabled === !0), className: `${Qb[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: I.tiles, children: i }) : i });
}
const tp = "_rail_s06lm_2", np = "_section_s06lm_12", ap = "_sectionFlush_s06lm_22", rp = "_head_s06lm_26", op = "_headLabel_s06lm_34", lp = "_sample_s06lm_42", ip = "_sampleLabel_s06lm_47", sp = "_sampleTitle_s06lm_54", cp = "_sampleMeta_s06lm_59", dp = "_trace_s06lm_65", up = "_traceHead_s06lm_70", hp = "_steps_s06lm_78", mp = "_step_s06lm_78", wp = "_stepTitle_s06lm_97", fp = "_hollow_s06lm_107", _p = "_stepBody_s06lm_115", vp = "_stepDetail_s06lm_127", bp = "_publish_s06lm_132", pp = "_reason_s06lm_138", gp = "_note_s06lm_143", yp = "_reveal_s06lm_148", k = {
  rail: tp,
  section: np,
  sectionFlush: ap,
  head: rp,
  headLabel: op,
  sample: lp,
  sampleLabel: ip,
  sampleTitle: sp,
  sampleMeta: cp,
  trace: dp,
  traceHead: up,
  steps: hp,
  step: mp,
  stepTitle: wp,
  hollow: fp,
  stepBody: _p,
  stepDetail: vp,
  publish: bp,
  reason: pp,
  note: gp,
  reveal: yp
}, Kn = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Np = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, kp = { ok: "greenFill", finding: "orangeFill", action: "blue" }, $p = { notSimulated: "not simulated", running: "running" };
function Cp(e) {
  return e.presentation === "foundry";
}
function Sp(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const a = t.filter((r) => !r.met);
  return a.length > 0 ? `Publish is disabled: ${a.length} of ${t.length} gate conditions unmet: ${a[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Rp(e, t) {
  var r;
  const a = Np[e.status];
  return a !== void 0 ? a : ((r = t.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function Tp(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function xp(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Lp(e) {
  if (Tp(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Ap(e) {
  const [t, a] = g(!1);
  C(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Ep(e) {
  const t = $p[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(He, { size: 6, kind: kp[e.kind], label: e.kind });
}
function Ip(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Mp(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Bp(e) {
  const { step: t } = e;
  return /* @__PURE__ */ l(Ap, { kind: t.kind, children: [
    /* @__PURE__ */ n(Ep, { kind: t.kind }),
    /* @__PURE__ */ l("span", { className: k.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: k.stepTitle, children: t.title }),
      /* @__PURE__ */ n(Ip, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Mp, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function jp(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(ue(t)), a.join(" · ");
}
function Qa(e) {
  const t = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ n("p", { className: k.traceHead, id: t, children: jp(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: k.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(Bp, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function Pp(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ l("div", { className: `${k.sample} ${k.section}`, children: [
    /* @__PURE__ */ n("p", { className: k.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ l("p", { className: k.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ l("p", { className: k.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function qp(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function Op(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? ra(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: k.sectionFlush, children: /* @__PURE__ */ n(jt, { divided: !0, cells: t }) });
}
function Dp(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: ra(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function Fp(e) {
  const t = Dp(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ l("p", { className: k.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: k.sectionFlush, children: /* @__PURE__ */ n(jt, { divided: !0, cells: t }) });
}
function Xa(e) {
  const t = N();
  return e.reason !== null ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: `${k.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(p, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(p, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Hp(e) {
  return /* @__PURE__ */ l("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ n(Xa, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: k.note, children: e.note })
  ] });
}
function Wp(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ n(Xa, { reason: e.reason, onPublish: e.onPublish }) });
}
function Za(e) {
  return /* @__PURE__ */ l("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: Kn[e.run.status].role, label: Kn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function zp(e, t) {
  const [a, r] = g(e.steps);
  return C(() => r(e.steps), [e.steps]), C(() => {
    if (!((t == null ? void 0 : t.subscribe) === void 0 || e.status !== "running"))
      return t.subscribe("*", (o) => {
        (o.type === "run.step" || o.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: o.type === "run.finding" ? "finding" : "action", title: ((s = o.step) == null ? void 0 : s.label) ?? "step", detail: (c = o.step) == null ? void 0 : c.tool }];
        });
      });
  }, [t, e.status]), a;
}
function Kp(e) {
  var a;
  xp(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Za, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(Pp, { sample: e.run.sample }),
    /* @__PURE__ */ n(Qa, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(Op, { run: e.run }),
    /* @__PURE__ */ n("div", { className: k.section, children: /* @__PURE__ */ n(Ot, { items: e.checklist }) }),
    /* @__PURE__ */ n(Hp, { reason: Sp(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Gp(e) {
  var r;
  const t = zp(e.run, e.feed);
  Lp(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Za, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(qp, { sample: e.run.sample }),
    /* @__PURE__ */ n(Qa, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(Fp, { run: e.run }),
    /* @__PURE__ */ n("div", { className: k.section, children: /* @__PURE__ */ n(Ot, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Wp, { reason: Rp(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function l2(e) {
  return Cp(e) ? /* @__PURE__ */ n(Gp, { ...e }) : /* @__PURE__ */ n(Kp, { ...e });
}
const Up = "_list_142ip_3", Vp = "_row_142ip_9", Yp = "_condition_142ip_18", Jp = "_action_142ip_24", gt = {
  list: Up,
  row: Vp,
  condition: Yp,
  action: Jp
}, er = Ne(!1);
function i2({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(er.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: gt.list, "aria-label": t, children: e }) });
}
function s2({ rule: e }) {
  if (!ye(er)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: gt.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: gt.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: gt.action, children: e.then })
  ] });
}
const Qp = "_move_tmppt_3", Xp = {
  move: Qp
};
function Qt(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [o] = r.splice(t, 1);
  return r.splice(a, 0, o), r;
}
function tr(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function nr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function Gn(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function Zp(e) {
  return e === "up" ? "down" : "up";
}
function eg(e, t) {
  const a = Gn(e, t.id, t.direction) ?? Gn(e, t.id, Zp(t.direction));
  a == null || a.focus();
}
function ar() {
  const e = _(null), [t, a] = g(null), [r, o] = g("");
  return C(() => {
    e.current !== null && t !== null && eg(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), o(c);
  } };
}
function rr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Rt({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${Xp.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const tg = "_body_1jd1i_2", ng = "_title_1jd1i_8", ag = "_section_1jd1i_13", rg = "_legend_1jd1i_18", og = "_stages_1jd1i_26", lg = "_stage_1jd1i_26", ig = "_stageIndex_1jd1i_44", sg = "_stageName_1jd1i_50", cg = "_footer_1jd1i_59", dg = "_note_1jd1i_66", ug = "_reason_1jd1i_71", hg = "_actions_1jd1i_76", mg = "_webHead_1jd1i_83", wg = "_kicker_1jd1i_92", fg = "_webTitle_1jd1i_99", _g = "_webBody_1jd1i_105", vg = "_webSection_1jd1i_109", bg = "_sectionHead_1jd1i_121", pg = "_sectionNote_1jd1i_129", gg = "_formLabel_1jd1i_134", yg = "_identityRow_1jd1i_139", Ng = "_nameCell_1jd1i_145", kg = "_keyCell_1jd1i_150", $g = "_colourCell_1jd1i_154", Cg = "_colourStatus_1jd1i_161", Sg = "_webStages_1jd1i_166", Rg = "_webStageList_1jd1i_172", Tg = "_webStage_1jd1i_166", xg = "_webIndex_1jd1i_191", Lg = "_webStageName_1jd1i_196", Ag = "_webMoves_1jd1i_201", Eg = "_addStage_1jd1i_215", Ig = "_addStageButton_1jd1i_223", Mg = "_addStageNote_1jd1i_231", Bg = "_webFooter_1jd1i_236", jg = "_webFooterNotes_1jd1i_244", Pg = "_webNote_1jd1i_251", b = {
  body: tg,
  title: ng,
  section: ag,
  legend: rg,
  stages: og,
  stage: lg,
  stageIndex: ig,
  stageName: sg,
  footer: cg,
  note: dg,
  reason: ug,
  actions: hg,
  webHead: mg,
  kicker: wg,
  webTitle: fg,
  webBody: _g,
  webSection: vg,
  sectionHead: bg,
  sectionNote: pg,
  formLabel: gg,
  identityRow: yg,
  nameCell: Ng,
  keyCell: kg,
  colourCell: $g,
  colourStatus: Cg,
  webStages: Sg,
  webStageList: Rg,
  webStage: Tg,
  webIndex: xg,
  webStageName: Lg,
  webMoves: Ag,
  addStage: Eg,
  addStageButton: Ig,
  addStageNote: Mg,
  webFooter: Bg,
  webFooterNotes: jg,
  webNote: Pg
}, qg = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], or = "not in catalogue";
function Og(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${or}` }, ...a];
}
function Dg({ stage: e, index: t, catalogue: a, onName: r }) {
  const o = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(P, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${or}`;
  return /* @__PURE__ */ n(P, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: Og(a, e.name), invalid: i, onChange: r });
}
function lr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function Fg(e) {
  const t = _([]), a = _(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function Hg({ id: e, stage: t, index: a, total: r, catalogue: o, onReplace: i, onMove: s }) {
  const c = lr(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${b.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: b.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: b.webStageName, children: /* @__PURE__ */ n(Dg, { stage: t, index: a, catalogue: o, onName: (u) => i({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(P, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: qg, onChange: (u) => i({ ...t, kind: u }) }),
    /* @__PURE__ */ l("span", { className: b.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(Rt, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(Rt, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Wg({ stages: e, onChange: t, catalogue: a }) {
  const r = Fg(e.length), o = ar(), i = (c, d) => {
    const u = tr(c, d);
    r.current = Qt(r.current, c, u), o.moved({ id: r.current[u], direction: d }, nr(lr(e[c], c), u, e.length)), t(Qt(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ l("div", { className: b.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: b.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(Hg, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(rr, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: b.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: b.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: b.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const zg = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Kg = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Gg = "A new stream starts as a draft. Nothing runs on it until you publish it.", Ug = "Create is disabled: name the stream and give it a key first.", Vg = "reorder with the ↑ ↓ buttons · min 2";
function hn(e, t) {
  return !e.reserved && ut(e.step) && t[e.step] === void 0;
}
function Yg(e, t) {
  const a = e.find((r) => hn(r, t));
  return a ? a.step : 1;
}
function Jg({ stages: e, onMove: t }) {
  const a = ar(), r = (o, i) => {
    const s = tr(o, i);
    a.moved({ id: e[o].id, direction: i }, nr(e[o].name, s, e.length)), t(o, s);
  };
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: b.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: b.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: b.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: b.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(Rt, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(Rt, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(rr, { text: a.announcement })
  ] });
}
function Qg({ reason: e, onCreate: t, onDraft: a }) {
  const r = N();
  return /* @__PURE__ */ l("div", { className: b.footer, children: [
    /* @__PURE__ */ n("p", { className: b.note, children: Gg }),
    e && /* @__PURE__ */ n("p", { className: b.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: b.actions, children: [
      /* @__PURE__ */ n(p, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(p, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(p, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function Xg(e, t) {
  return e !== "" && t !== "" ? null : Ug;
}
function Zg(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: o = Kg, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [h, w] = g(""), [f, v] = g(""), [T, M] = g(t[0].value), [z, me] = g(() => Yg(a, r)), [re, Ee] = g(e.stages ?? zg), [Ye, R] = g(o[0].value), Y = { name: h, key: f, streamStep: z, owner: T, stages: re, policy: Ye }, ke = Xg(h, f);
  return /* @__PURE__ */ n(rt, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ l("div", { className: b.body, children: [
    /* @__PURE__ */ n("h2", { className: b.title, id: u, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: b.section, children: [
      /* @__PURE__ */ n("legend", { className: b.legend, children: "Identity" }),
      /* @__PURE__ */ n(P, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ n(P, { kind: "input", label: "Key", value: f, onChange: v, mono: !0 }),
      /* @__PURE__ */ n(P, { kind: "select", label: "Owner", value: T, onChange: M, options: t })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: b.section, children: [
      /* @__PURE__ */ n("legend", { className: b.legend, children: "Colour" }),
      /* @__PURE__ */ n(Ja, { label: "Stream colour", steps: a, value: z, onChange: me, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: b.section, children: [
      /* @__PURE__ */ n("legend", { className: b.legend, children: "Stages" }),
      /* @__PURE__ */ n(Jg, { stages: re, onMove: (We, Er) => Ee(Qt(re, We, Er)) })
    ] }),
    /* @__PURE__ */ n(Oa, { legend: "Loop policy", options: o, value: Ye, onChange: R }),
    /* @__PURE__ */ n(Qg, { reason: ke, onCreate: () => i(Y), onDraft: () => s(Y) })
  ] }) });
}
const ir = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], ey = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function ty(e, t, a, r, o, i) {
  var c;
  const s = ((c = ir.find((d) => d.value === o)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: i };
}
function ny(e, t) {
  return ay(e) && ry(e, t) && oy(e);
}
function ay(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function ry(e, t) {
  return e.colourStep === null || hn({ step: e.colourStep }, t);
}
function oy(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function ly(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : hn({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function iy({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: b.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: b.webNote, children: "Add a stage an agent can run on." });
}
function sy({ ready: e, draft: t, agentStage: a, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: b.webFooter, children: [
    /* @__PURE__ */ l("div", { className: b.webFooterNotes, children: [
      /* @__PURE__ */ n(iy, { stage: a }),
      !e && /* @__PURE__ */ n("p", { id: i, className: b.reason, children: ey })
    ] }),
    o && /* @__PURE__ */ n(p, { variant: "secondary", onClick: () => o(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(p, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ n(p, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function cy({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: b.webHead, children: [
    /* @__PURE__ */ n("span", { className: b.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: b.webTitle, children: "New stream" })
  ] });
}
function dy({ name: e, setName: t, streamKey: a, setKey: r, colour: o, owner: i }) {
  return /* @__PURE__ */ l("section", { className: b.webSection, children: [
    /* @__PURE__ */ n("h3", { className: b.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ l("div", { className: b.identityRow, children: [
      /* @__PURE__ */ n("div", { className: b.nameCell, children: /* @__PURE__ */ n(P, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ n("div", { className: b.keyCell, children: /* @__PURE__ */ n(P, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      o
    ] }),
    i
  ] });
}
function uy(e) {
  const t = N(), a = N(), r = e.takenBy ?? {}, [o, i] = g(""), [s, c] = g(""), [d, u] = g(e.owners[0] ?? ""), [h, w] = g(null), [f, v] = g("relay"), [T, M] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), z = ty(o, s, d, h, f, T), me = ny(z, r), re = T.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ee = /* @__PURE__ */ l("div", { className: b.colourCell, children: [
    /* @__PURE__ */ n("span", { className: b.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Ja, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ye = /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: b.colourStatus, "data-colour-status": "", children: ly(h, r) }),
    /* @__PURE__ */ n(P, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ l(rt, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(cy, { titleId: a }),
    /* @__PURE__ */ l("div", { className: b.webBody, children: [
      /* @__PURE__ */ n(dy, { name: o, setName: i, streamKey: s, setKey: c, colour: Ee, owner: Ye }),
      /* @__PURE__ */ l("section", { className: b.webSection, children: [
        /* @__PURE__ */ l("div", { className: b.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: b.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: b.sectionNote, children: Vg })
        ] }),
        /* @__PURE__ */ n(Wg, { stages: T, onChange: M })
      ] }),
      /* @__PURE__ */ n("section", { className: b.webSection, children: /* @__PURE__ */ n(Oa, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: ir, onChange: v }) }),
      /* @__PURE__ */ n(sy, { ready: me, draft: z, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function c2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(uy, { ...e }) : /* @__PURE__ */ n(Zg, { ...e });
}
const hy = "_row_bs8hc_2", my = "_cell_bs8hc_6", wy = "_condition_bs8hc_11", fy = "_action_bs8hc_18", _y = "_contract_bs8hc_24", vy = "_contractCondition_bs8hc_33", by = "_contractAction_bs8hc_39", ne = {
  row: hy,
  cell: my,
  condition: wy,
  action: fy,
  contract: _y,
  contractCondition: vy,
  contractAction: by
}, sr = ["advance", "block", "escalate", "requestReview"], Un = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Tt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function mn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ne.action, children: Un[e.then] }) : /* @__PURE__ */ n(
    P,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => t({ ...e, then: o }),
      options: sr.map((o) => ({ value: o, label: Un[o] }))
    }
  );
}
function py({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n("span", { className: ne.condition, title: Tt(e, r), children: Tt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: mn(e, t, a) })
  ] });
}
function gy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ l("td", { className: ne.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ne.condition, children: Tt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: mn(e, t, a) })
  ] });
}
function yy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: ne.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ne.contractCondition, children: Tt(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ne.contractAction, children: mn(e, t, a, !0) })
  ] });
}
const Ny = { two: gy, four: py, contract: yy };
function d2(e) {
  var a;
  if (!sr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = Ny[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const ky = "_column_g1uat_2", $y = "_head_g1uat_17", Cy = "_index_g1uat_23", Sy = "_name_g1uat_29", Ry = "_meta_g1uat_38", Ty = "_mono_g1uat_43", xy = "_gate_g1uat_50", Ly = "_reviewersLabel_g1uat_57", Ay = "_reviewers_g1uat_57", Ey = "_reviewer_g1uat_57", Iy = "_agents_g1uat_74", My = "_workflowColumn_g1uat_79", By = "_workflowHead_g1uat_96", jy = "_stageRow_g1uat_102", Py = "_stageLabel_g1uat_109", qy = "_workflowTitle_g1uat_116", Oy = "_workflowMeta_g1uat_122", Dy = "_workflowGate_g1uat_127", Fy = "_gateNote_g1uat_135", Hy = "_cardNote_g1uat_140", Wy = "_reviewerList_g1uat_145", zy = "_reviewerRow_g1uat_151", Ky = "_reviewerMark_g1uat_157", Gy = "_reviewerName_g1uat_167", Uy = "_terminalCard_g1uat_173", Vy = "_terminalCount_g1uat_182", Yy = "_workflowAgents_g1uat_188", Jy = "_mount_g1uat_194", S = {
  column: ky,
  head: $y,
  index: Cy,
  name: Sy,
  meta: Ry,
  mono: Ty,
  gate: xy,
  reviewersLabel: Ly,
  reviewers: Ay,
  reviewer: Ey,
  agents: Iy,
  workflowColumn: My,
  workflowHead: By,
  stageRow: jy,
  stageLabel: Py,
  workflowTitle: qy,
  workflowMeta: Oy,
  workflowGate: Dy,
  gateNote: Fy,
  cardNote: Hy,
  reviewerList: Wy,
  reviewerRow: zy,
  reviewerMark: Ky,
  reviewerName: Gy,
  terminalCard: Uy,
  terminalCount: Vy,
  workflowAgents: Yy,
  mount: Jy
}, Qy = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function wn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function cr(e) {
  return `${Math.round(e * 100)}%`;
}
function Xy({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: S.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: S.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: S.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: S.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(jt, { cells: [
      { value: cr(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function Zy({ stage: e }) {
  return /* @__PURE__ */ n(jt, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: wn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function eN({ stage: e, titleId: t }) {
  return /* @__PURE__ */ l("header", { className: S.head, children: [
    /* @__PURE__ */ n("span", { className: S.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: S.name, id: t, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: Qy[e.kind] })
  ] });
}
function tN({ stage: e }) {
  return /* @__PURE__ */ l("p", { className: S.meta, children: [
    /* @__PURE__ */ l("span", { className: S.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ l("span", { className: S.mono, children: [
      ue(e.medianWait),
      " median wait"
    ] })
  ] });
}
function nN({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(Xy, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(Zy, { stage: e }) : null;
}
function aN({ onMount: e }) {
  return e ? /* @__PURE__ */ n(p, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function rN({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const o = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: S.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(eN, { stage: e, titleId: o }),
    /* @__PURE__ */ n(tN, { stage: e }),
    /* @__PURE__ */ n(nN, { stage: e }),
    /* @__PURE__ */ n("div", { className: S.agents, children: t.map((s) => /* @__PURE__ */ n(sb, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(aN, { onMount: a })
  ] });
}
const oN = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function lN({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: S.reviewerList, children: e.map((t, a) => /* @__PURE__ */ l("li", { className: S.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: S.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: S.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function iN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: S.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: S.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ n(lN, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: S.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: cr(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function sN(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function cN({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: S.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: S.terminalCount, children: wn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: S.cardNote, children: sN(e.rolledBackThisWeek) })
  ] });
}
function dN(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function uN(e) {
  if (e.kind === "terminal") return `${wn(e.closedThisWeek)} this week`;
  const t = dN(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function hN({ stage: e, titleId: t }) {
  const a = oN[e.kind];
  return /* @__PURE__ */ l("header", { className: S.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: S.stageRow, children: [
      /* @__PURE__ */ l("span", { className: S.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: S.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: S.workflowMeta, children: uN(e) })
  ] });
}
function mN(e) {
  return e === "entry" || e === "agent";
}
function wN({ stage: e, onMount: t }) {
  return t === void 0 || !mN(e.kind) ? null : /* @__PURE__ */ n(p, { variant: "secondary", size: "sm", className: S.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Mount agent" });
}
function fN({ stage: e, agentCards: t, onMount: a }) {
  const r = N();
  return /* @__PURE__ */ l("section", { className: S.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(hN, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(iN, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(cN, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: S.workflowAgents, children: t }),
    /* @__PURE__ */ n(wN, { stage: e, onMount: a })
  ] });
}
function _N(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function u2(e) {
  return _N(e) ? /* @__PURE__ */ n(fN, { ...e }) : /* @__PURE__ */ n(rN, { ...e });
}
const vN = "_row_1tdra_6", bN = "_name_1tdra_12", pN = "_compactRow_1tdra_13", gN = "_compactName_1tdra_13", yN = "_cell_1tdra_30", NN = "_chain_1tdra_45", kN = "_owner_1tdra_51", $N = "_mono_1tdra_57", CN = "_compactCell_1tdra_79", SN = "_stack_1tdra_96", RN = "_stat_1tdra_103", TN = "_identityLine_1tdra_110", xN = "_identity_1tdra_110", LN = "_ownerLine_1tdra_140", AN = "_link_1tdra_160", EN = "_gateMark_1tdra_166", IN = "_emptyChain_1tdra_171", MN = "_arrow_1tdra_177", BN = "_muted_1tdra_182", jN = "_define_1tdra_187", PN = "_statValue_1tdra_194", qN = "_policyId_1tdra_200", ON = "_sub_1tdra_205", y = {
  row: vN,
  name: bN,
  compactRow: pN,
  compactName: gN,
  cell: yN,
  chain: NN,
  owner: kN,
  mono: $N,
  compactCell: CN,
  stack: SN,
  stat: RN,
  identityLine: TN,
  identity: xN,
  ownerLine: LN,
  link: AN,
  gateMark: EN,
  emptyChain: IN,
  arrow: MN,
  muted: BN,
  define: jN,
  statValue: PN,
  policyId: qN,
  sub: ON
};
function dr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function DN(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function FN(e) {
  return e === void 0 ? y.compactRow : `${y.compactRow} ${e}`;
}
function ur(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function HN(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${ur(e.members)}`;
}
function WN(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: y.compactCell, children: /* @__PURE__ */ l("span", { className: y.stack, children: [
    /* @__PURE__ */ l("span", { className: y.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${y.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${y.compactName} ward-rowlink ward-target`, href: W(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: y.ownerLine, children: HN(e) })
  ] }) });
}
function hr({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ l(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: y.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function zN(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = mt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function KN({ stages: e, streamStep: t }) {
  const a = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${y.chain} ward-chiprow`, children: e.map((o, i) => /* @__PURE__ */ l("span", { className: y.link, children: [
    /* @__PURE__ */ n(hr, { name: o.name, gate: o.gate === !0, look: zN(i, a, t), size: "tag" }),
    i === r ? null : /* @__PURE__ */ n("span", { className: y.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${i}`)) });
}
function GN(e) {
  return /* @__PURE__ */ n("td", { className: y.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ l("span", { className: y.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: y.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: y.define, children: "Define workflow" })
  ] }) : KN(e) });
}
function mr(e) {
  return e === void 0 ? void 0 : !0;
}
function Vn(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: y.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: y.muted, children: a }) : /* @__PURE__ */ l("span", { className: y.stat, children: [
    /* @__PURE__ */ n("span", { className: `${y.statValue} ward-stat-value`, title: r, "data-raised": mr(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: y.sub, children: t })
  ] }) });
}
function UN(e) {
  return /* @__PURE__ */ n("td", { className: y.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: y.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: y.stat, children: [
    /* @__PURE__ */ n("span", { className: y.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: y.sub, children: e.summary })
  ] }) });
}
function VN(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function YN({ stream: e, href: t, presentation: a }) {
  const r = FN(a.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, onClick: dr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ge(e.streamStep, "chip") }, children: [
    WN(e, t),
    GN(e),
    Vn(VN(e.agents), e.agents === void 0 ? void 0 : DN(e.agents), "—"),
    UN(e.policy),
    Vn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function JN(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function h2(e) {
  if (JN(e)) return YN(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ l("tr", { className: y.row, onClick: dr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ l("td", { className: y.cell, children: [
      /* @__PURE__ */ n("a", { className: `${y.name} ward-target`, href: W(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...Bt(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: y.cell, children: /* @__PURE__ */ n("span", { className: y.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: y.link, children: /* @__PURE__ */ n(hr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: y.cell, children: /* @__PURE__ */ l("span", { className: y.mono, children: [
      t.agents.live,
      " live · ",
      t.agents.draft,
      " draft · ",
      t.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ l("td", { className: y.cell, children: [
      /* @__PURE__ */ n("span", { className: y.owner, children: t.owner }),
      /* @__PURE__ */ n("span", { className: y.mono, children: ur(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: y.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: y.mono, title: t.inFlightHint, "data-raised": mr(t.inFlightHint), children: ae(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: y.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: y.mono, children: t.p50 === void 0 ? "" : ue(t.p50) }) })
  ] });
}
const QN = "_row_2u4ll_2", XN = "_name_2u4ll_16", ZN = "_scope_2u4ll_24", xt = {
  row: QN,
  name: XN,
  scope: ZN
};
function fn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function e1(e) {
  return e === void 0 ? `${xt.row} ward-toolrow` : `${xt.row} ward-toolrow ${e}`;
}
function t1(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function n1({ id: e, reasonId: t, tool: a, state: r, onChange: o }) {
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
function a1({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: fn(e) });
}
function r1({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${xt.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function o1(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function m2({ tool: e, onChange: t, presentation: a }) {
  const r = N(), o = N(), i = t1(e, a), s = o1(a);
  return /* @__PURE__ */ l(s, { className: e1(a == null ? void 0 : a.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(n1, { id: r, reasonId: o, tool: e, state: i, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${xt.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(r1, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(a1, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const l1 = "_strip_4ppv9_2", i1 = "_well_4ppv9_11", s1 = "_head_4ppv9_18", c1 = "_name_4ppv9_24", d1 = "_chart_4ppv9_32", u1 = "_segment_4ppv9_38", h1 = "_detailedChart_4ppv9_44", m1 = "_rail_4ppv9_57", w1 = "_section_4ppv9_63", f1 = "_label_4ppv9_74", _1 = "_note_4ppv9_91", V = {
  strip: l1,
  well: i1,
  head: s1,
  name: c1,
  chart: d1,
  segment: u1,
  detailedChart: h1,
  rail: m1,
  section: w1,
  label: f1,
  note: _1
}, v1 = "No item in flight to preview.", b1 = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", p1 = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Xt = [1, 2, 3, 4, 5, 6], Lt = 100;
function g1(e, t) {
  return t.has(e) ? ge(e, "id") : "var(--ward-color-line)";
}
function y1({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Xt.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: o * Lt,
      y: "0",
      width: Lt,
      height: "8",
      fill: g1(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function N1(e) {
  const t = e.slice(0, Xt.length);
  for (; t.length < Xt.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function k1({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${V.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, a) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(a * Lt),
        y: "0",
        width: String(Lt),
        height: "40",
        style: { fill: ge(t.streamStep, "chip") }
      },
      t.key + String(a)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((t, a) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(a))) })
  ] });
}
function wr(e) {
  return (t) => e == null ? void 0 : e(t);
}
function _t({ label: e, children: t }) {
  const a = N();
  return /* @__PURE__ */ l("section", { className: V.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: V.label, children: e }),
    t
  ] });
}
function $1({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: t ?? v1 }) : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(qt, { item: { ...e, streamStep: mt(a.streamStep) }, onOpen: wr(r), feed: null }) });
}
function C1({ draft: e }) {
  const t = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: V.head, style: t, children: [
    /* @__PURE__ */ n(He, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Bt(e.key, e.streamStep) })
  ] });
}
function S1(e) {
  const t = N1(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ l("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(_t, { label: "Board card", children: /* @__PURE__ */ n($1, { ...e, draft: a }) }),
    /* @__PURE__ */ n(_t, { label: "Streams index row", children: /* @__PURE__ */ n(C1, { draft: a }) }),
    /* @__PURE__ */ l(_t, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(k1, { identities: t }),
      /* @__PURE__ */ n("p", { className: V.note, children: b1 })
    ] }),
    /* @__PURE__ */ n(_t, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: p1 }) })
  ] });
}
function R1({ draft: e, sample: t, streams: a, onOpen: r }) {
  const o = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: V.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: V.head, children: [
      /* @__PURE__ */ n(He, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Bt(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(qt, { item: { ...t, streamStep: e.streamStep }, onOpen: wr(r) }) }),
    /* @__PURE__ */ n(y1, { draft: e, streams: a })
  ] });
}
function w2(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(S1, { ...e }) : /* @__PURE__ */ n(R1, { ...e });
}
const T1 = "_row_ixlg5_6", x1 = "_headCell_ixlg5_10", L1 = "_cell_ixlg5_11", A1 = "_name_ixlg5_23", E1 = "_consequence_ixlg5_29", I1 = "_governed_ixlg5_36", M1 = "_control_ixlg5_42", B1 = "_byRole_ixlg5_48", j1 = "_webControl_ixlg5_59", P1 = "_webConsequence_ixlg5_65", q1 = "_webGoverned_ixlg5_71", H = {
  row: T1,
  headCell: x1,
  cell: L1,
  name: A1,
  consequence: E1,
  governed: I1,
  control: M1,
  byRole: B1,
  webControl: j1,
  webConsequence: P1,
  webGoverned: q1
};
function O1({
  capability: e,
  cell: t,
  onChange: a
}) {
  return t.value === "byRole" ? /* @__PURE__ */ n("span", { className: H.byRole, children: "by role" }) : /* @__PURE__ */ l("span", { className: H.control, children: [
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
function D1({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ l("tr", { className: H.row, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: H.headCell, children: [
      /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: H.consequence, children: e.consequence }),
      /* @__PURE__ */ l("span", { className: H.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(O1, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function F1(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function H1({ name: e, cell: t, onChange: a }) {
  if (t.value === "byRole") return /* @__PURE__ */ n("span", { className: `${H.webControl} ${H.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Ve,
    {
      label: `${e} · step ${t.streamStep}`,
      checked: t.value === "on",
      disabled: a === void 0,
      onChange: (o) => a == null ? void 0 : a(t.streamStep, o ? "on" : "off")
    }
  );
  return t.value !== "pilot" ? r : /* @__PURE__ */ l("span", { className: `${H.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function W1({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ l("tr", { className: H.row, children: [
    /* @__PURE__ */ l("td", { className: H.cell, children: [
      /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${H.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(H1, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webGoverned} ward-cellmeta`, children: F1(e) }) })
  ] });
}
function f2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(W1, { ...e }) : /* @__PURE__ */ n(D1, { ...e });
}
const z1 = "_row_vv64h_2", K1 = "_cell_vv64h_6", G1 = "_name_vv64h_25", U1 = "_note_vv64h_30", V1 = "_webName_vv64h_41", Y1 = "_webMeta_vv64h_47", Q = {
  row: z1,
  cell: K1,
  name: G1,
  note: U1,
  webName: V1,
  webMeta: Y1
}, fr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function J1(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Q1({ component: e, onRestart: t }) {
  const a = N(), r = fr[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ l("tr", { className: Q.row, children: [
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { className: Q.name, children: e.name }) }),
    /* @__PURE__ */ l("td", { className: Q.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { id: a, className: Q.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, "data-align": "end", children: o ? /* @__PURE__ */ n(p, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ n(p, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function X1({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(p, { size: "sm", onClick: () => t(e.name), children: J1(e.state) });
}
function Z1({ component: e, onRestart: t }) {
  return /* @__PURE__ */ l("tr", { className: Q.row, children: [
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { className: `${Q.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { className: `${Q.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { ...fr[e.state] }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(X1, { component: e, onRestart: t }) })
  ] });
}
function _2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Z1, { ...e }) : /* @__PURE__ */ n(Q1, { ...e });
}
const ek = "_row_jcm5k_7", tk = "_cell_jcm5k_11", nk = "_next_jcm5k_28", ak = "_headCell_jcm5k_38", rk = "_webId_jcm5k_77", ok = "_webPurpose_jcm5k_83", lk = "_webMeta_jcm5k_91", ik = "_webUrgent_jcm5k_97", K = {
  row: ek,
  cell: tk,
  next: nk,
  headCell: ak,
  webId: rk,
  webPurpose: ok,
  webMeta: lk,
  webUrgent: ik
}, sk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, ck = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, _r = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], dk = Object.fromEntries(_r.map((e) => [e.key, e]));
function Qe({ column: e, children: t }) {
  const a = dk[e];
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
function v2() {
  return /* @__PURE__ */ n("tr", { children: _r.map((e) => /* @__PURE__ */ n(
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
function uk({ cred: e }) {
  const t = sk[e.state];
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n(Qe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Qe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Qe, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(Qe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: fn(e.cls) }) }),
    /* @__PURE__ */ n(Qe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Qe, { column: "next", children: /* @__PURE__ */ n("span", { className: K.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function hk({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${K.webMeta} ${K.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function mk({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(hk, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...ck[e.state] }) })
  ] });
}
function b2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(mk, { ...e }) : /* @__PURE__ */ n(uk, { ...e });
}
const wk = "_card_lpp45_2", fk = "_head_lpp45_11", _k = "_env_lpp45_18", vk = "_version_lpp45_25", bk = "_meta_lpp45_32", pk = "_webCard_lpp45_37", gk = "_webRow_lpp45_47", yk = "_webTitle_lpp45_55", Nk = "_webLine_lpp45_65", kk = "_webVersion_lpp45_72", $k = "_webMeta_lpp45_77", J = {
  card: wk,
  head: fk,
  env: _k,
  version: vk,
  meta: bk,
  webCard: pk,
  webRow: gk,
  webTitle: yk,
  webLine: Nk,
  webVersion: kk,
  webMeta: $k
}, Yn = { dev: "Dev", uat: "UAT", prod: "Prod" }, vr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function Ck({ env: e }) {
  const t = vr[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l("section", { className: J.card, "aria-label": Yn[e.env], children: [
    /* @__PURE__ */ l("div", { className: J.head, children: [
      /* @__PURE__ */ n("span", { className: J.env, children: Yn[e.env] }),
      /* @__PURE__ */ n(m, { role: t.role, label: t.label })
    ] }),
    /* @__PURE__ */ n("p", { className: J.version, children: e.version }),
    /* @__PURE__ */ l("p", { className: J.meta, children: [
      "deployed ",
      he(e.deployedAt)
    ] }),
    a && /* @__PURE__ */ n("p", { className: J.meta, children: a })
  ] });
}
function Sk(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function Rk(e) {
  return /* @__PURE__ */ l("article", { className: `${J.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${J.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${J.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...vr[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${J.version} ${J.webVersion} ${J.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${J.meta} ${J.webMeta} ${J.webLine} ward-cellmeta`, children: Sk(e) })
  ] });
}
function p2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Rk, { ...e }) : /* @__PURE__ */ n(Ck, { ...e });
}
const Tk = "_panel_1hmja_2", xk = "_line_1hmja_8", Lk = "_actions_1hmja_14", vt = {
  panel: Tk,
  line: xk,
  actions: Lk
};
function g2(e) {
  return /* @__PURE__ */ l("div", { className: vt.panel, children: [
    /* @__PURE__ */ n("p", { className: vt.line, children: e.status }),
    /* @__PURE__ */ n(P, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: vt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: vt.line, children: e.note ?? "" })
  ] });
}
const Ak = "_upload_13fcl_2", Ek = "_preview_13fcl_7", Ik = "_mark_13fcl_17", Mk = "_empty_13fcl_22", Bk = "_actions_13fcl_28", jk = "_input_13fcl_33", Pk = "_reasons_13fcl_41", qk = "_reason_13fcl_41", Ok = "_accepted_13fcl_57", oe = {
  upload: Ak,
  preview: Ek,
  mark: Ik,
  empty: Mk,
  actions: Bk,
  input: jk,
  reasons: Pk,
  reason: qk,
  accepted: Ok
}, br = 1.5, pr = 22, At = "script elements or event handlers", je = "links or external references", xe = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${br}px at ${pr}px`], Dk = [xe[1], xe[2], At, je], Fk = /* @__PURE__ */ new Map([
  ["image", xe[1]],
  ["text", xe[2]],
  ["tspan", xe[2]],
  ["textPath", xe[2]],
  ["script", At],
  ["foreignObject", At],
  ["a", je],
  ["use", je],
  ["style", je],
  ["feImage", je],
  ["set", je]
]), Hk = "http://www.w3.org/2000/svg", Wk = "http://www.w3.org/2000/xmlns/", zk = /* @__PURE__ */ new Set([
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
]), Kk = /* @__PURE__ */ new Set([
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
]), _n = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, Gk = /url\s*\(|['"\\]/i;
function Uk() {
  return { ok: !1, reasons: [xe[1]] };
}
function gr(e) {
  return e.namespaceURI === Hk;
}
function Vk(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && gr(t) ? t : null;
  } catch {
    return null;
  }
}
function Yk(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [xe[0]] : [];
}
function Jk(e) {
  return Fk.get(e.localName) ?? (e.localName.startsWith("animate") ? je : void 0);
}
function Qk(e) {
  return Gk.test(e.replace(_n, ""));
}
function Xk(e) {
  return /^on/i.test(e.localName) ? At : e.localName === "href" || Qk(e.value) ? je : void 0;
}
function Zk(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(Jk(a));
    for (const r of Array.from(a.attributes)) t.add(Xk(r));
  }
  return Dk.filter((a) => t.has(a));
}
function e$(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((o) => Number.isFinite(o) && o > 0), 0), r = a > 0 ? pr / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < br;
  }) ? [xe[3]] : [];
}
function t$(e) {
  if (e.namespaceURI === Wk) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (Kk.has(t) || t.startsWith("stroke"));
}
function n$(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && gr(t) && zk.has(t.localName);
}
function a$(e, t) {
  n$(t) ? t.nodeType === Node.ELEMENT_NODE && yr(t) : e.removeChild(t);
}
function yr(e) {
  for (const t of Array.from(e.attributes)) t$(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) a$(e, t);
  return e;
}
function r$(e) {
  return Array.from(e.matchAll(_n), (t) => t[2]).filter((t) => t !== "");
}
function o$(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function l$(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const i of r$(o.value)) a.has(i) || a.set(i, `${t}-${a.size}`);
  return a;
}
function i$(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(_n, (r, o, i) => {
      const s = t.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function s$(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = l$(a, t);
  for (const o of a) {
    const i = r.get(o.getAttribute("id") ?? "");
    i === void 0 ? o.removeAttribute("id") : o.setAttribute("id", i), i$(o, r);
  }
  return e;
}
function y2(e) {
  const t = Vk(e);
  if (t === null) return Uk();
  const a = [...Yk(t), ...Zk(t), ...e$(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(s$(yr(t), o$(e))) };
}
const c$ = "Mark accepted.", d$ = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, u$ = new Set(la.flatMap((e) => [ge(e, "id"), ge(e, "chip")]));
function h$(e) {
  return e !== void 0 && (d$.test(e) || u$.has(e)) ? e : void 0;
}
function m$({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: oe.preview, style: { "--mark": h$(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: oe.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: oe.empty }) });
}
function w$(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function f$(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function _$({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: oe.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("p", { className: oe.accepted, children: c$ }) }) : /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("ul", { className: oe.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: oe.reason, children: t }, t)) }) });
}
function v$({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(_$, { result: e }) : /* @__PURE__ */ n("p", { className: `${oe.result} ${w$(e, a)}`, role: "status", children: f$(e, a) });
}
function Jn(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function N2({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: o }) {
  const i = _(null), [s, c] = g(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ l("div", { className: oe.upload, children: [
    /* @__PURE__ */ n(m$, { current: e }),
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
      /* @__PURE__ */ n(p, { ...Jn(o), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(p, { ...Jn(o), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(v$, { result: s, presentation: r })
  ] });
}
const b$ = "_row_o3t6y_7", p$ = "_cell_o3t6y_11", g$ = "_head_o3t6y_28", y$ = "_name_o3t6y_34", N$ = "_pinned_o3t6y_42", k$ = "_headCell_o3t6y_49", $$ = "_webName_o3t6y_88", C$ = "_webMeta_o3t6y_95", S$ = "_webWarn_o3t6y_103", O = {
  row: b$,
  cell: p$,
  head: g$,
  name: y$,
  pinned: N$,
  headCell: k$,
  webName: $$,
  webMeta: C$,
  webWarn: S$
}, vn = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Nr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], R$ = Object.fromEntries(Nr.map((e) => [e.key, e]));
function T$(e, t) {
  return `mcp.${e}.${t}`;
}
function x$(e) {
  return Object.keys(vn).includes(e);
}
function L$(e) {
  return vn[e !== void 0 && x$(e) ? e : "unknown"];
}
function ot({ column: e, children: t }) {
  const a = R$[e];
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
function k2() {
  return /* @__PURE__ */ n("tr", { children: Nr.map((e) => /* @__PURE__ */ n(
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
function A$({ server: e }) {
  const t = vn[e.connection];
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ l(ot, { column: "name", children: [
      /* @__PURE__ */ l("span", { className: O.head, children: [
        /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: fn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ l("span", { className: O.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(ot, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(ot, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(ot, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(ot, { column: "tools", children: e.tools.map((a) => T$(e.name, a)).join(" · ") })
  ] });
}
function E$(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function I$(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function M$({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${O.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e });
}
function B$({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(p, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function j$({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(p, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function P$({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ l("td", { className: O.cell, children: [
      /* @__PURE__ */ n("span", { className: `${O.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: E$(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...I$(e) }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(M$, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...L$(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: O.cell, children: [
      /* @__PURE__ */ n(B$, { server: e, onRestart: t }),
      /* @__PURE__ */ n(j$, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function $2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(P$, { ...e }) : /* @__PURE__ */ n(A$, { ...e });
}
const q$ = "_row_1ibo7_2", O$ = "_headCell_1ibo7_14", D$ = "_cell_1ibo7_15", F$ = "_name_1ibo7_26", H$ = "_consequence_1ibo7_32", W$ = "_reason_1ibo7_38", z$ = "_value_1ibo7_44", K$ = "_webRow_1ibo7_60", G$ = "_webSetting_1ibo7_73", U$ = "_webName_1ibo7_81", V$ = "_webConsequence_1ibo7_89", Y$ = "_webControl_1ibo7_95", J$ = "_webState_1ibo7_109", Q$ = "_webChip_1ibo7_114", j = {
  row: q$,
  headCell: O$,
  cell: D$,
  name: F$,
  consequence: H$,
  reason: W$,
  value: z$,
  webRow: K$,
  webSetting: G$,
  webName: U$,
  webConsequence: V$,
  webControl: Y$,
  webState: J$,
  webChip: Q$
}, kr = 104, $r = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function X$({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ve, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(Pa, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: j.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function Z$({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = N(), i = $r[a], s = a === "locked";
  return /* @__PURE__ */ l("tr", { className: j.row, "data-inheritance": a, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: j.headCell, children: [
      /* @__PURE__ */ n("span", { className: j.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: j.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: j.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n(X$, { control: t, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: j.cell, style: { width: kr }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function Cr(e, t) {
  return String(e ?? t);
}
function e0(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function t0(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? Cr(e.value, "—");
}
function n0({ control: e, name: t, locked: a, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: j.webControl, children: [
    /* @__PURE__ */ n(Ve, { label: t, labelHidden: !0, checked: i, locked: a, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ n("span", { className: j.webState, "aria-hidden": "true", children: a || i ? "on" : "off" })
  ] });
}
function a0(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(n0, { ...e });
  const o = e0(t, a);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: j.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(Pa, { options: o, value: Cr(t.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${j.webControl} ${j.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: t0(t) });
}
function r0({ setting: e, control: t, inheritance: a, reason: r, onChange: o, renderControl: i }) {
  const s = N(), c = a === "locked";
  return /* @__PURE__ */ l("div", { className: `${j.row} ${j.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ l("span", { className: j.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${j.name} ${j.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: s, className: `${j.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: j.webControl, children: i(s) }) : /* @__PURE__ */ n(a0, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${j.webChip} ward-policy-chip`, style: { width: kr }, children: /* @__PURE__ */ n(m, { ...$r[a], size: "tag" }) })
  ] });
}
function C2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(r0, { ...e }) : /* @__PURE__ */ n(Z$, { ...e });
}
const o0 = "_label_h9m4w_7", l0 = "_name_h9m4w_15", i0 = "_column_h9m4w_24", s0 = "_webFrame_h9m4w_57", c0 = "_webHead_h9m4w_62", d0 = "_webHeadLabel_h9m4w_74", u0 = "_webLabel_h9m4w_117", h0 = "_webColumns_h9m4w_124", m0 = "_webGroup_h9m4w_130", w0 = "_webPeople_h9m4w_131", f0 = "_webVia_h9m4w_132", _0 = "_webMeta_h9m4w_161", G = {
  label: o0,
  name: l0,
  column: i0,
  webFrame: s0,
  webHead: c0,
  webHeadLabel: d0,
  webLabel: u0,
  webColumns: h0,
  webGroup: m0,
  webPeople: w0,
  webVia: f0,
  webMeta: _0
}, v0 = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, Kt = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Gt({ column: e, children: t }) {
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
function b0(e) {
  if (!e.matrixRole) return;
  const t = v0[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function p0({ node: e }) {
  const t = b0(e);
  return /* @__PURE__ */ l("span", { className: G.label, children: [
    /* @__PURE__ */ n("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ n(g0, { role: t, node: e }),
    /* @__PURE__ */ n(Gt, { column: Kt[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Gt, { column: Kt[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Gt, { column: Kt[2], children: e.requestedVia ?? "" })
  ] });
}
function g0({ role: e, node: t }) {
  return /* @__PURE__ */ l(x, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function y0({ index: e, depth: t, node: a, expanded: r, leaf: o, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    za,
    {
      index: e,
      depth: t,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(p0, { node: a }),
      children: s
    }
  );
}
function Ut({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function N0({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Ut, { className: `${G.webMeta} ${G.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Ut, { className: `${G.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Ut, { className: `${G.webMeta} ${G.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function k0() {
  return /* @__PURE__ */ l("div", { className: G.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: G.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: G.webColumns, children: [
      /* @__PURE__ */ n("span", { className: G.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: G.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: G.webVia, children: "Requested via" })
    ] })
  ] });
}
function $0({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function C0(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function S0({ rows: e, label: t }) {
  return /* @__PURE__ */ l("div", { className: G.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(k0, {}),
    /* @__PURE__ */ n(nw, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      za,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n($0, { row: a }),
        detail: /* @__PURE__ */ n(N0, { row: a }),
        expanded: C0(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function S2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(S0, { ...e }) : /* @__PURE__ */ n(y0, { ...e });
}
const R0 = "_runbook_b9agc_2", T0 = "_list_b9agc_7", x0 = "_step_b9agc_15", L0 = "_numeral_b9agc_21", A0 = "_body_b9agc_28", E0 = "_head_b9agc_34", I0 = "_title_b9agc_40", M0 = "_detail_b9agc_45", B0 = "_actions_b9agc_50", j0 = "_webList_b9agc_56", P0 = "_webStep_b9agc_60", q0 = "_webBody_b9agc_66", O0 = "_webTitle_b9agc_74", D0 = "_webDetail_b9agc_78", E = {
  runbook: R0,
  list: T0,
  step: x0,
  numeral: L0,
  body: A0,
  head: E0,
  title: I0,
  detail: M0,
  actions: B0,
  webList: j0,
  webStep: P0,
  webBody: q0,
  webTitle: O0,
  webDetail: D0
}, Sr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Rr(e) {
  return String(e + 1).padStart(2, "0");
}
function F0({ step: e, index: t, connection: a }) {
  const r = Sr[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: E.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: E.numeral, children: Rr(t) }),
    /* @__PURE__ */ l("span", { className: E.body, children: [
      /* @__PURE__ */ l("span", { className: E.head, children: [
        /* @__PURE__ */ n("span", { className: E.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        o && e.startedAt && /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ n("span", { className: E.detail, children: e.detail })
    ] })
  ] });
}
function H0({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: E.runbook, children: [
    /* @__PURE__ */ n("ol", { className: E.list, children: e.map((r, o) => /* @__PURE__ */ n(F0, { step: r, index: o, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: E.actions, children: t })
  ] });
}
function W0({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ l("li", { className: `${E.step} ${E.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${E.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Rr(t) }),
    /* @__PURE__ */ l("span", { className: `${E.body} ${E.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${E.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${E.title} ${E.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Sr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${E.detail} ${E.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function z0({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: E.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${E.list} ${E.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(W0, { step: r, index: o, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${E.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function R2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(z0, { ...e }) : /* @__PURE__ */ n(H0, { ...e });
}
const K0 = "_list_1gu6a_2", G0 = "_check_1gu6a_10", U0 = "_body_1gu6a_16", V0 = "_text_1gu6a_23", Y0 = "_pending_1gu6a_32", J0 = "_measured_1gu6a_37", Ze = {
  list: K0,
  check: G0,
  body: U0,
  text: V0,
  pending: Y0,
  measured: J0
};
function Q0(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function X0({ check: e }) {
  const t = Q0(e.passed);
  return /* @__PURE__ */ l("li", { className: `${Ze.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(cn, { state: t.state, label: t.label }),
    /* @__PURE__ */ l("span", { className: Ze.body, children: [
      /* @__PURE__ */ n("span", { className: Ze.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ l("span", { className: Ze.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: Ze.measured, children: e.measured })
  ] });
}
function T2({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Ze.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(X0, { check: t }, t.text)) });
}
const Z0 = "_root_4aacj_2", eC = "_list_4aacj_10", tC = "_line_4aacj_26", nC = "_at_4aacj_53", aC = "_text_4aacj_57", rC = "_foot_4aacj_61", oC = "_idle_4aacj_73", lC = "_caret_4aacj_81", iC = "_jump_4aacj_88", ve = {
  root: Z0,
  list: eC,
  line: tC,
  at: nC,
  text: aC,
  foot: rC,
  idle: oC,
  caret: lC,
  jump: iC
}, sC = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function bn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : sC.format(new Date(e));
}
const cC = { warn: "warning", ok: "ok" };
function dC({ kind: e }) {
  const t = cC[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function uC({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${bn(e)}` });
}
function hC({ connection: e, idleSince: t, last: a, children: r }) {
  const o = [t, a == null ? void 0 : a.at, ""].find(Boolean), i = {
    stale: `no new events as of ${bn(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${ve.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ve.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ve.idle, children: i }),
    /* @__PURE__ */ n(uC, { at: a == null ? void 0 : a.at }),
    r
  ] });
}
const mC = 8;
function wC(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > mC;
}
function fC({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const Tr = Ne(null);
function x2({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, o] = g(!1), i = ta(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(Tr.Provider, { value: i, children: a });
}
function _C() {
  const e = ye(Tr), [t, a] = g(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
function L2({ lines: e, connection: t, idleSince: a, label: r = "Live activity" }) {
  const o = _(null), [i, s] = g(0), [c, d] = _C(), [u, h] = g(!1), w = e.at(-1);
  C(() => {
    s(e.length);
  }, [e.length]), tt(() => {
    const v = o.current;
    v && !u && (v.scrollTop = v.scrollHeight);
  }, [e.length, u]);
  const f = () => {
    var M;
    const v = o.current;
    if (!v) return;
    const T = v.querySelectorAll("[data-consline-text]");
    (M = T.item(T.length - 1)) == null || M.focus(), h(!1);
  };
  return /* @__PURE__ */ l("div", { className: ve.root, children: [
    /* @__PURE__ */ n("ol", { className: ve.list, ref: o, "aria-live": c ? "polite" : "off", "aria-label": r, "data-empty": e.length === 0 || void 0, onScroll: (v) => h(wC(v.currentTarget)), children: e.map((v, T) => /* @__PURE__ */ l("li", { className: `${ve.line} ward-consline ward-reveal ward-consline--${v.kind}`, "data-kind": v.kind, "data-revealed": T < i, children: [
      /* @__PURE__ */ n("span", { className: ve.at, children: bn(v.at) }),
      /* @__PURE__ */ n(dC, { kind: v.kind }),
      /* @__PURE__ */ n("span", { className: ve.text, "data-consline-text": !0, tabIndex: -1, children: v.text })
    ] }, `${v.at}-${T}`)) }),
    /* @__PURE__ */ l(hC, { connection: t, idleSince: a, last: w, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ n(fC, { shown: u, onJump: f })
    ] })
  ] });
}
const vC = "_row_1k8wl_2", bC = "_head_1k8wl_14", pC = "_author_1k8wl_20", gC = "_eta_1k8wl_25", yC = "_edited_1k8wl_26", NC = "_body_1k8wl_32", kC = "_reason_1k8wl_37", $C = "_actions_1k8wl_42", Ce = {
  row: vC,
  head: bC,
  author: pC,
  eta: gC,
  edited: yC,
  body: NC,
  reason: kC,
  actions: $C
}, CC = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function SC(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function RC({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(p, { variant: "primary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(p, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(p, { variant: "ghost", size: "sm", onClick: a, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(p, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(p, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n(p, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(p, { variant: "secondary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(p, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function TC({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(p, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Ce.reason, id: t, children: e })
  ] });
}
function xC(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function LC(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(RC, { ...e }) : /* @__PURE__ */ n(TC, { reason: e.unavailable, reasonId: e.unavailableId });
}
function A2(e) {
  const { comment: t } = e;
  xC(e);
  const a = N(), r = `${a}-unavailable`, o = CC[t.delivery];
  return /* @__PURE__ */ l("div", { className: `${Ce.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: Ce.head, children: [
      /* @__PURE__ */ n("span", { className: Ce.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: Ce.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Ce.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Ce.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Ce.reason, id: a, children: SC(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Ce.actions, children: /* @__PURE__ */ n(LC, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const AC = "_root_rvhdw_2", EC = "_attach_rvhdw_11", IC = "_actions_rvhdw_17", MC = "_reply_rvhdw_23", BC = "_replyField_rvhdw_28", jC = "_send_rvhdw_54", PC = "_sendIcon_rvhdw_65", qC = "_sendsAs_rvhdw_75", Oe = {
  root: AC,
  attach: EC,
  actions: IC,
  reply: MC,
  replyField: BC,
  send: jC,
  sendIcon: PC,
  sendsAs: qC
};
function xr({ value: e, onChange: t }) {
  const [a, r] = g("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function OC() {
  return /* @__PURE__ */ n("svg", { className: Oe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function DC(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function FC(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [o, i] = xr(e), s = N(), c = () => {
    o.trim() !== "" && r(a, o);
  }, d = (u) => {
    DC(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ l("div", { className: Oe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: Oe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ n(P, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: o, onChange: i, describedBy: s }),
      /* @__PURE__ */ l(p, { variant: "primary", className: Oe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ n(OC, {}),
        /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Oe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function E2(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(FC, { ...e }) : /* @__PURE__ */ n(HC, { ...e });
}
function HC(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: o, onPost: i, onDraft: s } = e, [c, d] = xr(e);
  return /* @__PURE__ */ l("div", { className: Oe.root, children: [
    /* @__PURE__ */ n(P, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ l("div", { className: Oe.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(p, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    o && /* @__PURE__ */ n(
      fa,
      {
        label: `Requeue ${o.agent} after posting`,
        consequence: o.consequence,
        checked: o.checked,
        onChange: o.onChange
      }
    ),
    /* @__PURE__ */ l("div", { className: Oe.actions, children: [
      /* @__PURE__ */ n(p, { variant: "primary", onClick: () => i(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(p, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const WC = "_list_1yhks_2", zC = "_item_1yhks_6", KC = "_body_1yhks_22", GC = "_text_1yhks_28", UC = "_evidence_1yhks_37", VC = "_consequence_1yhks_49", YC = "_note_1yhks_54", Ue = {
  list: WC,
  item: zC,
  body: KC,
  text: GC,
  evidence: UC,
  consequence: VC,
  note: YC
};
function JC({ criterion: e }) {
  return /* @__PURE__ */ n(He, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Qn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function QC(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function XC({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Ue.body, children: [
    /* @__PURE__ */ n("span", { className: Ue.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(Qn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Ue.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(Qn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Ue.consequence, children: QC(e.why) })
    ] })
  ] });
}
function ZC({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Ue.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(JC, { criterion: e }),
    /* @__PURE__ */ n(XC, { criterion: e })
  ] });
}
function I2({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(ZC, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ n("p", { className: Ue.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const eS = "_list_dwhoz_2", tS = "_rung_dwhoz_6", nS = "_name_dwhoz_18", aS = "_actor_dwhoz_32", yt = {
  list: eS,
  rung: tS,
  name: nS,
  actor: aS
}, rS = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function oS({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = rS[e.state];
  return /* @__PURE__ */ l("li", { className: yt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: yt.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${yt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function M2({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${yt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(oS, { rung: t }, t.name)) });
}
const lS = "_sheet_pw37w_2", iS = "_title_pw37w_9", sS = "_stage_pw37w_15", cS = "_effects_pw37w_20", dS = "_effect_pw37w_20", uS = "_numeral_pw37w_31", hS = "_effectText_pw37w_38", mS = "_refusals_pw37w_43", wS = "_reasons_pw37w_52", fS = "_reason_pw37w_52", _S = "_actions_pw37w_62", we = {
  sheet: lS,
  title: iS,
  stage: sS,
  effects: cS,
  effect: dS,
  numeral: uS,
  effectText: hS,
  refusals: mS,
  reasons: wS,
  reason: fS,
  actions: _S
};
function vS({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(p, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(p, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function B2({ run: e, effects: t, refusals: a, cost: r, onRequeue: o, onClose: i, returnFocusTo: s }) {
  const c = N(), d = `${c}-refusal`, [u, h] = g(""), w = a.length > 0;
  return /* @__PURE__ */ n(rt, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ l("div", { className: we.sheet, children: [
    /* @__PURE__ */ l("h2", { className: we.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: we.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: we.effects, children: t.map((f, v) => /* @__PURE__ */ l("li", { className: we.effect, children: [
      /* @__PURE__ */ n("span", { className: we.numeral, children: String(v + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: we.effectText, children: f })
    ] }, f)) }),
    /* @__PURE__ */ n(
      jh,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(P, { kind: "textarea", label: "Note for the agent", value: u, onChange: h }),
    w && /* @__PURE__ */ l("div", { className: we.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: we.reasons, children: a.map((f, v) => /* @__PURE__ */ n("li", { className: we.reason, id: v === 0 ? d : void 0, children: f.reason }, f.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: we.actions, children: [
      /* @__PURE__ */ n(vS, { refused: w, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ n(p, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const bS = "_list_1laeg_2", pS = "_path_1laeg_7", gS = "_head_1laeg_21", yS = "_label_1laeg_28", NS = "_consequence_1laeg_35", lt = {
  list: bS,
  path: pS,
  head: gS,
  label: yS,
  consequence: NS
}, Zt = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Xn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Zn(e) {
  return e ? "primary" : "secondary";
}
function kS({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(p, { variant: Zn(t), size: "sm", onClick: () => a(e.kind), children: Zt[e.kind] }) : /* @__PURE__ */ n(p, { variant: Zn(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: Zt[e.kind] });
}
function $S({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: lt.path, "data-allowed": e.allowed, "data-role": Xn(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: lt.head, children: [
      /* @__PURE__ */ n("span", { className: lt.label, children: e.title ?? Zt[e.kind] }),
      /* @__PURE__ */ n(m, { role: Xn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: lt.consequence, children: e.consequence }),
    /* @__PURE__ */ n(kS, { path: e, primary: t, onChoose: a })
  ] });
}
function j2({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: lt.list, children: e.map((a, r) => /* @__PURE__ */ n($S, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const CS = "_list_1m7i0_2", SS = "_item_1m7i0_6", RS = "_node_1m7i0_18", TS = "_body_1m7i0_24", xS = "_head_1m7i0_30", LS = "_stage_1m7i0_36", AS = "_version_1m7i0_41", ES = "_sentence_1m7i0_49", IS = "_meta_1m7i0_54", Re = {
  list: CS,
  item: SS,
  node: RS,
  body: TS,
  head: xS,
  stage: LS,
  version: AS,
  sentence: ES,
  meta: IS
}, MS = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function BS({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: Re.head, children: [
    /* @__PURE__ */ n("span", { className: Re.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Re.version, title: e.version, children: e.version }) : null
  ] });
}
function jS({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${Re.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Re.node} ward-history-node`, children: /* @__PURE__ */ n(He, { size: 9, kind: MS[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${Re.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(BS, { entry: e }),
      /* @__PURE__ */ n("span", { className: Re.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${Re.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function P2({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Re.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(jS, { entry: t }, t.stage + String(a))) });
}
const PS = "_thread_1e70p_3", qS = "_turn_1e70p_8", OS = "_who_1e70p_27", DS = "_body_1e70p_32", Nt = {
  thread: PS,
  turn: qS,
  who: OS,
  body: DS
}, Lr = Ne(!1);
function q2({ children: e, density: t }) {
  return /* @__PURE__ */ n(Lr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${Nt.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function O2({ turn: e }) {
  if (!ye(Lr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${Nt.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${Nt.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${Nt.body} ward-chat-body`, children: e.body })
  ] });
}
const FS = "_list_yiolt_3", HS = "_row_yiolt_7", WS = "_label_yiolt_20", zS = "_n_yiolt_26", KS = "_cause_yiolt_33", st = {
  list: FS,
  row: HS,
  label: WS,
  n: zS,
  cause: KS
};
function GS(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const US = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function VS({ row: e, formatNumber: t }) {
  return GS(e), /* @__PURE__ */ l("li", { className: `${st.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(He, { size: 8, ...US[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: st.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${st.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(YS, { cause: e.cause })
  ] });
}
function YS({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${st.cause} ward-healthrow-cause`, children: e }) : null;
}
function D2({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${st.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(VS, { row: a, formatNumber: t }, a.label)) });
}
const JS = "_root_1jxwp_2", QS = {
  root: JS
};
function F2({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: QS.root, "data-density": o, children: [
    /* @__PURE__ */ n(Ot, { items: e, note: t, density: o }),
    /* @__PURE__ */ n(p, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const XS = "_row_dhbre_3", ZS = "_key_dhbre_13", eR = "_stack_dhbre_24", tR = "_value_dhbre_32", nR = "_evidence_dhbre_39", aR = "_mark_dhbre_47", Xe = {
  row: XS,
  key: ZS,
  stack: eR,
  value: tR,
  evidence: nR,
  mark: aR
};
function rR({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(cn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function H2({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(rR, { state: e.state }) })
  ] });
}
const oR = "_cell_gh2sd_2", lR = {
  cell: oR
}, iR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function sR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function cR(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function dR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: sR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function uR(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function W2({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  cR(e, a);
  const r = uR(e);
  return /* @__PURE__ */ n(
    Jh,
    {
      label: "Rejection routing",
      columns: iR,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: lR.cell, "data-norerun": o.noRerun ? !0 : void 0, children: dR(o, i) }),
      empty: t ?? /* @__PURE__ */ n(Hw, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const hR = "_row_1f2re_2", mR = "_title_1f2re_12", wR = "_turns_1f2re_18", fR = "_waiting_1f2re_19", _R = "_resolved_1f2re_20", vR = "_activity_1f2re_21", bR = "_cost_1f2re_28", pR = "_link_1f2re_29", gR = "_tableLink_1f2re_47", yR = "_tableRecord_1f2re_48", NR = "_tableRow_1f2re_59", kR = "_tableTitle_1f2re_71", $R = "_tableResolved_1f2re_76", CR = "_tableMeta_1f2re_87", SR = "_tableCost_1f2re_94", RR = "_tableActivity_1f2re_95", TR = "_tableState_1f2re_105", F = {
  row: hR,
  title: mR,
  turns: wR,
  waiting: fR,
  resolved: _R,
  activity: vR,
  cost: bR,
  link: pR,
  tableLink: gR,
  tableRecord: yR,
  tableRow: NR,
  tableTitle: kR,
  tableResolved: $R,
  tableMeta: CR,
  tableCost: SR,
  tableActivity: RR,
  tableState: TR
}, Ar = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function xR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function LR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function AR(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const ER = { duplicate: "Closed · duplicate" };
function IR({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(nt, { className: F.tableMeta, text: `waiting on ${e}` });
}
function MR({ value: e }) {
  return /* @__PURE__ */ n("td", { className: F.tableCost, children: e === void 0 ? null : le(e) });
}
function BR({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${F.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function jR({ session: e, href: t }) {
  const a = Ar[e.state];
  return /* @__PURE__ */ l("tr", { className: F.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: F.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${F.tableLink} ward-target`, href: W(t), children: /* @__PURE__ */ n(nt, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: F.tableMeta, children: LR(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: F.tableResolved, children: [
      AR(e.resolved),
      /* @__PURE__ */ n(IR, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(MR, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: F.tableActivity, children: xR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: F.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: ER[e.state] ?? a.label }),
      /* @__PURE__ */ n(BR, { link: e.link })
    ] }) })
  ] });
}
function PR({ session: e }) {
  const t = Ar[e.state];
  return /* @__PURE__ */ l("div", { className: F.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(nt, { className: F.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: F.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(nt, { className: F.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: F.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: F.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : le(e.cost) }),
    /* @__PURE__ */ n("span", { className: F.activity, children: he(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: F.link, href: W(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function z2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(jR, { session: e.session, href: e.href }) : /* @__PURE__ */ n(PR, { session: e.session });
}
const qR = "_block_1yy2v_3", OR = "_list_1yy2v_9", DR = "_line_1yy2v_14", en = {
  block: qR,
  list: OR,
  line: DR
}, FR = { warn: "warning", ok: "ok" };
function HR({ kind: e }) {
  const t = FR[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function WR({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${en.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(HR, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function K2({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${en.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: en.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(WR, { line: a }, `${r}-${a.text}`)) }) });
}
const zR = "_band_tt7hp_1", KR = "_head_tt7hp_8", GR = "_cell_tt7hp_19", UR = "_index_tt7hp_35", VR = "_title_tt7hp_42", YR = "_note_tt7hp_48", JR = "_cellTitle_tt7hp_53", QR = "_cellBody_tt7hp_58", XR = "_tag_tt7hp_64", $e = {
  band: zR,
  head: KR,
  cell: GR,
  index: UR,
  title: VR,
  note: YR,
  cellTitle: JR,
  cellBody: QR,
  tag: XR
}, ea = 4;
function G2({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== ea)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${ea}-cell grid`);
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
export {
  cT as ACCENT_PRESETS,
  LT as ActionStack,
  L2 as ActivityConsole,
  vT as AdminIcon,
  sb as AgentCard,
  pT as AppShell,
  w2 as AppearanceStrip,
  G2 as Band,
  RT as BarChart,
  $f as BoardColumn,
  UT as BoardFootnote,
  VT as BoardHeader,
  fT as BoardIcon,
  qT as BoardScroller,
  p as Btn,
  sT as CHIP_ROLES,
  _r as CREDENTIAL_COLUMNS,
  ST as Callout,
  f2 as CapabilityRow,
  DT as CardGrid,
  O2 as ChatMessage,
  fa as Checkbox,
  m as Chip,
  nt as ClampText,
  A2 as ClarificationRow,
  r2 as ClauseRuleRow,
  a2 as ClauseRules,
  Ja as ColourLadder,
  _2 as ComponentRow,
  E2 as Composer,
  JT as ConfigRow,
  YT as ConfigRowHead,
  dn as ConnectionMark,
  x2 as ConsoleAnnounceProvider,
  q2 as Conversation,
  jh as CostMeter,
  b2 as CredentialRow,
  v2 as CredentialRowHead,
  I2 as CriteriaList,
  ls as Crumb,
  dT as DENSITIES,
  D2 as DeliveryHealth,
  HT as DeniedState,
  mT as DisabledScope,
  l2 as DryRunRail,
  Hw as EmptyState,
  p2 as EnvCard,
  P as Field,
  FT as FilteredEmpty,
  jT as FormStack,
  Ot as GateChecklist,
  M2 as GateLadder,
  Jh as Grid,
  s2 as HandoffRuleRow,
  i2 as HandoffRules,
  wT as HomeIcon,
  QT as ItemDrawer,
  g2 as KeyPanel,
  Xr as LIVE_EVENT_TYPES,
  Lv as LegacyBoardColumn,
  ZT as LegacyBoardHeader,
  e2 as LegacyConfigRow,
  n2 as LegacyItemDrawer,
  kv as LegacyOverCapNote,
  t2 as LegacyPreviewRail,
  Ua as LegacyWorkCard,
  Le as LiveIndicator,
  WT as LoadFailed,
  GT as Loading,
  Nr as MCP_SERVER_COLUMNS,
  cn as Mark,
  N2 as MarkUpload,
  He as Marker,
  $2 as McpServerRow,
  k2 as McpServerRowHead,
  xa as Menu,
  Sa as MenuButton,
  c2 as NewStreamModal,
  Gw as OverCapNote,
  on as OverflowRow,
  rt as Overlay,
  o2 as PARTIAL_STEP_REASON,
  kr as POLICY_CHIP_WIDTH,
  IT as PageFrame,
  CT as PageHeader,
  TT as PlainList,
  C2 as PolicyRow,
  XT as PreviewRail,
  Kt as ROLE_MATRIX_COLUMNS,
  sr as RULE_ACTIONS,
  Oa as Radio,
  F2 as ReadyChecklist,
  BT as RecordSection,
  B2 as RequeueSheet,
  j2 as ResolveBlock,
  H2 as ResolvedFieldRow,
  S2 as RoleMatrixRow,
  W2 as RoutingTable,
  d2 as RuleRow,
  R2 as RunbookSteps,
  Qr as STREAM_STEPS,
  PT as SectionBand,
  Pn as SectionHeader,
  Pa as SegmentedControl,
  ka as Select,
  z2 as SessionRow,
  NT as Sidebar,
  bT as SidebarFoldButton,
  u2 as StageColumn,
  OT as StageGrid,
  P2 as StageHistory,
  Wg as StageListEditor,
  zT as StaleStrip,
  jt as StatStrip,
  AT as StatTiles,
  $T as StreamAvatar,
  h2 as StreamRow,
  _T as StudioIcon,
  MT as SubjectRail,
  Ve as Switch,
  yT as TabLinks,
  xT as TableHead,
  gT as Tabs,
  rT as ThemeProvider,
  m2 as ToolRow,
  ET as TopBar,
  nw as Tree,
  za as TreeRow,
  K2 as TypedInputBlock,
  Hl as UNSAFE_HREF,
  T2 as ValidationList,
  nT as VisibilityProvider,
  aT as Visible,
  iT as WARD_VERSION,
  qt as WorkCard,
  KT as WriteUnavailableStrip,
  xR as agoSince,
  qr as clock,
  ly as colourStatus,
  ae as count,
  ue as duration,
  tn as elapsed,
  lT as eventSourceTransport,
  It as isStreamStep,
  ut as isValidatedStreamStep,
  qb as ladderValidation,
  L$ as mcpConnectionChip,
  T$ as mcpToolName,
  le as money,
  be as ms,
  Ka as ordered,
  ra as ratio,
  J1 as restartLabel,
  W as safeHref,
  he as stamp,
  nn as stream,
  uT as streamChip,
  Bt as streamChipProps,
  ge as streamColour,
  to as streamHex,
  Ct as streamInitials,
  Zr as streamVars,
  kT as uniqueStreamInitials,
  pa as useAnchoredPanel,
  bt as useBorderFlash,
  Ae as useDisabledScope,
  Vr as useFocusTrap,
  hT as useLiveFeed,
  oT as useReturnFocus,
  Et as useRovingTabindex,
  an as useTicker,
  Or as useVisible,
  B as v,
  y2 as validateMark,
  mt as validatedStep,
  la as validatedStreamSteps
};
