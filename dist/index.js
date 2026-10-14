import { jsx as n, Fragment as T, jsxs as l } from "react/jsx-runtime";
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
function UR({ hidden: e, children: t }) {
  const a = ta(() => new Set(e), [e]);
  return /* @__PURE__ */ n(oa.Provider, { value: a, children: t });
}
function Or(e) {
  return !ye(oa).has(e);
}
function VR({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(T, { children: Or(e) ? t : a });
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
function YR({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const o = Fr(e === "system");
  return Dt("data-theme", Hr(e, o)), Dt("data-accent", t), Dt("data-density", a), /* @__PURE__ */ n(T, { children: r });
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
function JR(e, t = !0) {
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
const QR = (e, t, a) => {
  const r = new EventSource(e), o = (i) => a.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, XR = "0.2.0", ZR = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Qr = [1, 2, 3, 4, 5, 6], la = [1, 2, 3], Xr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], eT = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], tT = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], B = {
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
function dt(e) {
  return la.includes(e);
}
function Zr(e) {
  if (!It(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function nT(e) {
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
function aT(e, t) {
  const [a, r] = g("reconnecting"), [o, i] = g(null), s = _(/* @__PURE__ */ new Map()), c = _(0), d = _(""), u = _(0), h = _(null), w = _(0), f = _(0), p = _(!1), A = _("reconnecting"), M = te((R) => {
    A.current = R, r(R);
  }, []), z = te(() => {
    c.current = Date.now();
  }, []), me = te((R) => {
    for (const [Y, ke] of s.current)
      (ke === "*" || R.itemKey === ke) && Y(R);
  }, []), re = te(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (R, Y, ke) => {
        const We = oo(R, Y, ke);
        We !== null && (We.id && (d.current = We.id), z(), p.current = !1, M("live"), i(We.at), me(We));
      },
      onOpen: () => {
        u.current = 0, p.current = !1, z(), M("live");
      },
      onError: () => {
        var Y;
        (Y = h.current) == null || Y.close(), h.current = null, p.current = !0, A.current !== "stale" && M("reconnecting");
        const R = Math.min(be.reconnectBase * 2 ** u.current, be.reconnectMax);
        u.current += 1, w.current = window.setTimeout(re, R);
      }
    });
  }, [me, M, z, t, e]), Ee = te((R) => {
    p.current = !0, R.close(), h.current = null, w.current = window.setTimeout(re, be.reconnectBase);
  }, [re]), Ye = te((R, Y) => (s.current.set(Y, R), () => {
    s.current.delete(Y);
  }), []);
  return C(() => (re(), f.current = window.setInterval(() => {
    const R = Date.now() - c.current, Y = lo(R, A.current);
    Y && M(Y);
    const ke = h.current;
    io(R, p.current, ke) && Ee(ke);
  }, be.tick), () => {
    var R;
    window.clearInterval(f.current), window.clearTimeout(w.current), p.current = !1, (R = h.current) == null || R.close(), h.current = null;
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
function ut(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const Ko = "_scope_1an6i_2", Go = {
  scope: Ko
}, ia = Ne(null);
function rT({ reason: e, actions: t = "disable", children: a }) {
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
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : ut(e, t.reasonId);
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
function b(e) {
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
function st(e) {
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
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(T, { children: [
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
function at(e) {
  const t = _(null), a = _(null), r = N(), o = Ol(e.container), i = st("(min-width: 768px)"), s = Ml(e.kind, i), c = Bl(e, r), d = Vr(a), [u] = g(wl), h = Il(t, o, e.returnFocusTo), w = te(() => {
    h() && e.onClose();
  }, [e.onClose, h]);
  return C(() => {
    var f;
    h() && ((f = a.current) == null || f.focus());
  }, [h]), C(() => {
    const f = (p) => {
      p.key === "Escape" && w();
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
function oT() {
  return /* @__PURE__ */ n(ht, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function lT() {
  return /* @__PURE__ */ l(ht, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function iT() {
  return /* @__PURE__ */ l(ht, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function sT() {
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
  const e = st("(max-width: 767.98px)"), t = st("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function si(e) {
  const t = e === "phone", a = N(), r = _(null), [o, i] = g(!1);
  return o && !t && i(!1), { narrow: t, open: o, drawerId: a, slotRef: r, toggle: () => i(!o), close: () => i(!1) };
}
function ci({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ l("div", { className: $.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
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
  return /* @__PURE__ */ n(at, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (o = a.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ n("div", { className: $.drawerSide, onClick: r, children: ua(e, !1) }) });
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
  return /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(Zl, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function vi({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: $.sideTop, children: /* @__PURE__ */ n(ha, { fold: e }) });
}
const ma = Ne(null);
function cT() {
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
  const e = st("(max-width: 767.98px)"), t = N(), a = _(null), [r, o] = g(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Ci({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: $.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: $.tools, children: e });
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
function dT(e) {
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
function Fi({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function fa(e) {
  const t = N(), a = e.consequence ? `${t}-note` : void 0, r = Ae(), o = qi(e, r);
  return /* @__PURE__ */ l("div", { className: `${Be.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ l("span", { className: Be.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: t,
          type: "checkbox",
          className: `${Be.box} ward-field-option`,
          checked: o.checked,
          disabled: o.disabled,
          onChange: (i) => {
            var s;
            return !o.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, i.target.checked));
          },
          "aria-describedby": Mt(ut(a, e.describedBy), r),
          title: r == null ? void 0 : r.reason
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: t, className: e.labelHidden ? Be.labelHidden : Be.label, children: [
        e.label,
        /* @__PURE__ */ n(Di, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Fi, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Oi, { id: a, text: e.consequence })
  ] });
}
const Hi = "_chip_pq6tb_2", Wi = {
  chip: Hi
}, zi = {
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
function Ki(e, t) {
  if (e === "stream") return Gi(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = zi[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function Gi(e) {
  if (!e || !dt(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = nn(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Wi.chip} ward-chip ward-chip--${e}`, style: Ki(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const Ui = "_clamp_zn74g_3", Rn = {
  clamp: Ui
};
function nt({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? Rn.clamp : `${Rn.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
function mt(e) {
  return typeof e == "number" && dt(e) ? e : null;
}
function ge(e, t) {
  const a = mt(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function Bt(e, t) {
  const a = mt(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const Vi = "_root_13eei_3", Yi = "_nav_13eei_8", Ji = "_list_13eei_16", Qi = "_item_13eei_24", Xi = "_link_13eei_44", Zi = "_sep_13eei_54", es = "_current_13eei_58", ts = "_chips_13eei_62", Me = {
  root: Vi,
  nav: Yi,
  list: Ji,
  item: Qi,
  link: Xi,
  sep: Zi,
  current: es,
  chips: ts
};
function ns({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: Me.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${Me.link} ward-target`, href: W(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function as({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: Me.root, children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ n("ol", { className: Me.list, children: e.map((r, o) => /* @__PURE__ */ l("li", { className: Me.item, children: [
      o > 0 ? /* @__PURE__ */ n("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(ns, { step: r, isCurrent: a && o === e.length - 1 })
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
const rs = 500;
function va(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function ba() {
  const e = _(""), t = _(void 0);
  return C(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, rs), e.current);
}
const wt = 4;
function os(e, t, a) {
  const r = Math.max(0, a - e.bottom - wt * 2), o = Math.max(0, e.top - wt * 2);
  return t <= r || r >= o ? { top: e.bottom + wt, maxHeight: r } : { top: e.top - wt - Math.min(t, o), maxHeight: o };
}
function ls(e, t, a, r) {
  const o = { start: e.left, end: e.right - t }, i = { start: o.start + t <= a, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, a - t));
}
function is(e, t, a, r) {
  return { ...os(e, t.height, a.height), left: ls(e, t.width, a.width, r) };
}
function pt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function ss(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function cs(e, t, a) {
  const r = ss(t, a);
  e.style.setProperty("--ward-anchor-width", pt(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const o = e.getBoundingClientRect(), i = document.documentElement;
  return { edges: r, box: o, view: { width: i.clientWidth, height: i.clientHeight } };
}
function ds(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, o) => r.scrollTop = a[o]);
}
function Tn(e, t, a, r) {
  const o = ds(e), i = cs(e, t, r), s = is(i.edges, i.box, i.view, a);
  Object.assign(e.style, { left: pt(s.left - i.box.left), top: pt(s.top - i.box.top), maxHeight: pt(s.maxHeight) }), o();
}
function us(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function pa(e, t, a = "start", r) {
  tt(() => {
    const o = t.current, i = e.current;
    if (!o || !i) return;
    const s = us(o), c = () => Tn(o, i, a, r == null ? void 0 : r.current), d = (u) => {
      o.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), tt(() => {
    t.current && e.current && Tn(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const hs = "_root_1lgbn_2", ms = "_trigger_1lgbn_7", ws = "_value_1lgbn_47", fs = "_menu_1lgbn_65", _s = "_find_1lgbn_87", vs = "_list_1lgbn_103", bs = "_option_1lgbn_114", ps = "_check_1lgbn_133", gs = "_empty_1lgbn_144", pe = {
  root: hs,
  trigger: ms,
  value: ws,
  menu: fs,
  find: _s,
  list: vs,
  option: bs,
  check: ps,
  empty: gs
}, ys = 7;
function Ns(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function xn(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function ks(e, t) {
  const [a, r] = g(e.defaultOpen === !0), [o, i] = g(""), [s, c] = g(() => xn(e.options, e.value)), d = (u) => {
    var h;
    aa(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: o,
    active: s,
    entries: Ns(e.options, o),
    findable: e.options.length > ys,
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
function $s(e, t) {
  const a = _(!1);
  return C(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function Cs(e) {
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
function Ss(e) {
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
const Rs = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Ts(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      Rs.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function xs({ entry: e, at: t, menu: a, ids: r, value: o }) {
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
function Ls({ menu: e, ids: t, focusRef: a }) {
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
function As({ props: e, menu: t, ids: a, focusRef: r, trigger: o }) {
  const i = Cs(t), s = _(null);
  pa(o, s);
  const c = (d) => {
    va(d) && i(d.key);
  };
  return /* @__PURE__ */ l("div", { ref: s, className: pe.menu, children: [
    t.findable && /* @__PURE__ */ n(Ls, { menu: t, ids: a, focusRef: r }),
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
        onKeyDown: ya(t, Ss(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(xs, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: pe.empty, children: "No match" })
  ] });
}
function Es(e, t) {
  const a = e.open ? ln(e, t) : void 0;
  C(() => {
    var r, o;
    a && ((o = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [a]);
}
function Na(...e) {
  return e.filter(Boolean).join(" ");
}
function Is(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function Ms({ props: e, menu: t, ids: a, trigger: r, wantFocus: o }) {
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
      "aria-describedby": ut(e["aria-describedby"], a.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...Ts(t, o),
      children: /* @__PURE__ */ n("span", { id: a.value, className: pe.value, "data-placeholder": i || void 0, children: Is(e) })
    }
  );
}
function ka(e) {
  const t = Ae(), a = t ? { ...e, disabled: !0, "aria-describedby": Mt(e["aria-describedby"], t) } : e, r = N(), o = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = _(null), s = _(null), c = _(null), d = ks(a, s), u = $s(d.open, c);
  return _a(d.open, i, () => d.close(!1)), Es(d, o), /* @__PURE__ */ l("div", { ref: i, className: Na(pe.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(Ms, { props: a, menu: d, ids: o, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(As, { props: a, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const Bs = "_field_1ensj_2", js = "_label_1ensj_8", Ps = "_labelHidden_1ensj_15", qs = "_control_1ensj_25", Os = "_mono_1ensj_45", Ds = "_area_1ensj_50", Fs = "_invalid_1ensj_57", De = {
  field: Bs,
  label: js,
  labelHidden: Ps,
  control: qs,
  mono: Os,
  area: Ds,
  invalid: Fs
}, Hs = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, $a = (e) => `${e}-label`;
function Ws({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? Hs : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function zs({ props: e, controlProps: t, cls: a }) {
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
function Ks({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
const Gs = { input: Ws, select: zs, textarea: Ks };
function Us(e, t, a) {
  const r = Gs[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function Vs(e, t, a, r) {
  const o = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": o,
    "aria-describedby": Mt(ut(o ? a : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function Ys(e) {
  const t = e.mono ? [De.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [De.area] : [];
  return [De.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function Js(e) {
  return e ? `${De.label} ${De.labelHidden} ward-field-label` : `${De.label} ward-field-label`;
}
function P(e) {
  const t = N(), a = `${t}-msg`, r = Vs(e, t, a, Ae()), o = Ys(e);
  return /* @__PURE__ */ l("div", { className: `${De.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: $a(t), className: Js(e.labelHidden), htmlFor: t, children: e.label }),
    Us(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${De.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Qs = "_root_sjvm0_2", Xs = "_trigger_sjvm0_9", Zs = "_ghost_sjvm0_27", ec = "_panel_sjvm0_46", tc = "_edged_sjvm0_67", nc = "_menu_sjvm0_73", ac = "_group_sjvm0_78", rc = "_heading_sjvm0_83", oc = "_item_sjvm0_89", lc = "_description_sjvm0_105", ic = "_large_sjvm0_109", sc = "_touch_sjvm0_113", cc = "_icon_sjvm0_117", dc = "_label_sjvm0_125", uc = "_text_sjvm0_130", hc = "_trailing_sjvm0_138", mc = "_check_sjvm0_144", wc = "_separator_sjvm0_183", fc = "_footer_sjvm0_189", _c = "_find_sjvm0_196", vc = "_findGlyph_sjvm0_208", bc = "_findInput_sjvm0_214", pc = "_empty_sjvm0_230", x = {
  root: Qs,
  trigger: Xs,
  ghost: Zs,
  panel: ec,
  edged: tc,
  menu: nc,
  group: ac,
  heading: rc,
  item: oc,
  description: lc,
  large: ic,
  touch: sc,
  icon: cc,
  label: dc,
  text: uc,
  trailing: hc,
  check: mc,
  separator: wc,
  footer: fc,
  find: _c,
  findGlyph: vc,
  findInput: bc,
  empty: pc
}, Ca = Ne(null);
function gc(e, t) {
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
const yc = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Nc(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = yc.get(t.key);
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
function kc(e, t = {}, a = "field") {
  const { ref: r, className: o, ...i } = t;
  return { ...i, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: sn(x.trigger, a === "ghost" ? x.ghost : void 0, o) };
}
function Sa(e) {
  const t = N(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = _(null), o = _(null), i = gc(e.defaultOpen === !0, o);
  return _a(i.open, r, () => i.close(!1)), /* @__PURE__ */ l("div", { ref: r, className: sn(x.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...kc(o, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Nc(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(Ca.Provider, { value: { ...a, popup: i, button: o }, children: e.children })
  ] });
}
function $c(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function Cc(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const Sc = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function Rc(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function Tc(e, t) {
  return e === "separator" ? e : "items" in e ? Rc(e, t) : t(e) ? e : null;
}
function xc(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function Lc(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (o) => o.label.toLowerCase().includes(a);
  return xc(e.map((o) => Tc(o, r)).filter((o) => o !== null));
}
const Ra = (e, t) => (e % t + t) % t;
function Pe(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const o = Ra(t + a * r, e.length);
    if (!e[o].disabled) return o;
  }
  return -1;
}
const Ac = (e) => e.split("").every((t) => t === e[0]);
function Ec(e, t, a) {
  const r = Ac(a), o = r ? a[0] : a, i = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = Ra(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function Ic(e) {
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
function Mc(e, t) {
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
function Bc(e, t, a) {
  const r = ba(), o = Mc(e, t), i = (s) => {
    if (va(s)) {
      if (!a) return e.focus(Ec(e.items, e.current(), r(s.key)));
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
function jc(e) {
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
function Pc(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? Pe(e, -1, 1) : t;
}
function qc(e, t) {
  const { start: a, request: r } = t, o = _(e);
  o.current = e, C(() => {
    const { items: i, focus: s } = o.current;
    a && s(a === "first" ? Pc(i) : Pe(i, i.length, -1));
  }, [a, r]);
}
function Oc({ row: e, nav: t, popup: a }) {
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
const Dc = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function Fc(e, t) {
  return Dc(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function Hc(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: x.label, children: e.label });
  return e.description ? /* @__PURE__ */ l("span", { className: x.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: x.description, children: e.description })
  ] }) : a;
}
function Wc() {
  return /* @__PURE__ */ n("svg", { className: x.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Ln(e, t) {
  return /* @__PURE__ */ l(T, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: x.icon, "aria-hidden": "true", children: e.icon }) : null,
    Hc(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: x.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(Wc, {}) : null
  ] });
}
function Ta(e) {
  const { item: t, at: a } = e.row, r = N(), o = {
    ref: (i) => {
      e.nav.refs.current[a] = i;
    },
    role: "menuitem",
    tabIndex: -1,
    className: x.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...Fc(t, r),
    ...Oc(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: W(t.href), ...o, children: Ln(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...o, children: Ln(t, r) });
}
function zc({ heading: e, rows: t, nav: a, popup: r }) {
  const o = N();
  return /* @__PURE__ */ l("div", { role: "group", "aria-labelledby": o, className: x.group, children: [
    /* @__PURE__ */ n("div", { id: o, className: x.heading, children: e }),
    t.map((i) => /* @__PURE__ */ n(Ta, { row: i, nav: a, popup: r }, i.at))
  ] });
}
function Kc({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: x.separator }) : e.kind === "group" ? /* @__PURE__ */ n(zc, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(Ta, { row: e.row, nav: t, popup: a });
}
function Gc() {
  const e = ye(Ca);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Uc() {
  return /* @__PURE__ */ l("svg", { className: x.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function Vc(e, t) {
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
function Yc({ find: e, query: t, setQuery: a, input: r, nav: o, popup: i, menuId: s }) {
  const c = Vc(o, i), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ l("div", { className: x.find, children: [
    /* @__PURE__ */ n(Uc, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: x.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function Jc(e, t) {
  const [a, r] = g(""), o = _(null), i = t !== void 0 && Sc(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = o.current) == null || d.focus();
  };
  return i ? { find: t, query: a, setQuery: r, input: o, toFind: s, entries: Lc(e, a) } : { query: a, setQuery: r, input: o, entries: e };
}
const Qc = { regular: void 0, large: x.large, touch: x.touch }, Xc = (e, t) => sn(x.panel, e ? x.edged : void 0, Qc[t]);
function Zc({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: x.empty, children: e.empty ?? "No matches" });
}
function xa({ entries: e, footer: t, align: a = "start", find: r, edges: o, size: i = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = Gc(), h = _(null);
  pa(u, h, a, o);
  const w = Jc(e, r), f = $c(w.entries), p = Ic(f.flatMap(Cc).map((z) => z.item)), A = Bc(p, s, w.toFind), M = jc(s);
  return qc(p, s), /* @__PURE__ */ l("div", { ref: h, className: Xc(o, i), ...M, children: [
    w.find && /* @__PURE__ */ n(Yc, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: p, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: x.menu, ...A, children: f.map((z, me) => /* @__PURE__ */ n(Kc, { block: z, nav: p, popup: s }, me)) }),
    /* @__PURE__ */ n(Zc, { find: w.find, count: p.items.length }),
    t && /* @__PURE__ */ n("p", { className: x.footer, children: t })
  ] });
}
function ed(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function La(e, t) {
  C(() => {
    const a = e.current;
    t === "page" && a && !ed(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const td = (e, t) => e.reduce((a, r) => a + r + t, -t);
function nd({ room: e, widths: t, more: a, gap: r }, o) {
  const i = t.map((d, u) => u);
  if (td(t, r) <= e) return i;
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
function ad(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Ft(a.paddingInlineStart) - Ft(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), An),
    more: r ? An(r) : 0,
    gap: Ft(a.columnGap)
  };
}
function rd(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const od = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function Aa(e, t, a, r = ':scope > [role="tab"]') {
  const [o, i] = g(null);
  return tt(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = ad(s, r);
      i((u) => od(u, d) ? u : d);
    };
    return c(), rd(s, c);
  }, [e, a, r]), o && nd(o, t);
}
const ld = "_strip_jqyo6_2", id = "_fits_jqyo6_19", sd = "_probe_jqyo6_27", cd = "_moreRoot_jqyo6_36", dd = "_more_jqyo6_36", ud = "_tab_jqyo6_55", hd = "_count_jqyo6_91", Z = {
  strip: ld,
  fits: id,
  probe: sd,
  moreRoot: cd,
  more: dd,
  tab: ud,
  count: hd
}, Ea = "More";
function md(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const Ia = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function Ma(e) {
  return `${Z.strip} ward-tabs ward-tabs--${e}`;
}
const wd = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function fd({ tab: e, active: t, place: a, onChange: r }) {
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
        e.count === void 0 ? null : /* @__PURE__ */ l(T, { children: [
          " ",
          /* @__PURE__ */ n("span", { className: Z.count, children: `· ${e.count}` })
        ] })
      ]
    }
  );
}
function _d(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((i) => i.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function vd({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(Sa, { label: Ea, className: Z.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: Z.more }, children: /* @__PURE__ */ n(xa, { align: "end", entries: e.map((r) => ({ label: Ia(r), onSelect: () => a(r.id) })) }) });
}
function bd(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : wd;
}
function uT({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: o }) {
  const i = Et({ orientation: "horizontal" }), s = md(e, t);
  C(() => i.setActive(s), [i.setActive, s]);
  const c = _(null);
  La(c, o);
  const d = Aa(c, s, e.map(Ia).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ l("div", { ref: c, className: `${Ma(o)} ${Z.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(fd, { tab: h, active: t, place: bd(i, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${x.trigger} ${Z.more} ${Z.probe}`, children: Ea }),
    u.length > 0 && /* @__PURE__ */ n(vd, { tabs: u, trigger: i.itemProps(e.length), onPick: _d(c, a) })
  ] });
}
const En = 7, Ba = "More", pd = ":scope > a", ja = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, gd = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function yd(e, t) {
  return !e || e.includes(t) ? {} : gd;
}
function Nd({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, className: `${Z.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ l(T, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: Z.count, children: `· ${e.count}` })
    ] })
  ] });
}
function kd({ links: e }) {
  return /* @__PURE__ */ n(Sa, { label: Ba, className: Z.moreRoot, trigger: { className: Z.more }, children: /* @__PURE__ */ n(xa, { align: "end", entries: e.map((t) => ({ label: ja(t), href: t.href })) }) });
}
function hT({ links: e, active: t, label: a, level: r }) {
  if (e.length > En) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${En} — the set is fixed`);
  const o = _(null);
  La(o, r);
  const i = Math.max(0, e.findIndex((d) => d.id === t)), s = Aa(o, i, e.map(ja).join(`
`), pd), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ l("nav", { ref: o, className: `${Ma(r)} ${Z.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(Nd, { link: d, current: d.id === t, place: yd(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${x.trigger} ${Z.more} ${Z.probe}`, children: Ba }),
    c.length > 0 && /* @__PURE__ */ n(kd, { links: c })
  ] });
}
const $d = "_root_v56ff_3", Cd = "_segment_v56ff_9", In = {
  root: $d,
  segment: Cd
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
const Sd = "_sidebar_s9o1j_3", Rd = "_brand_s9o1j_9", Td = "_mark_s9o1j_17", xd = "_word_s9o1j_24", Ld = "_nav_s9o1j_30", Ad = "_navItem_s9o1j_39", Ed = "_footLink_s9o1j_49", Id = "_group_s9o1j_58", Md = "_groupName_s9o1j_65", Bd = "_agents_s9o1j_81", jd = "_agent_s9o1j_81", Pd = "_root_s9o1j_96", qd = "_agentTop_s9o1j_105", Od = "_dot_s9o1j_112", Dd = "_agentName_s9o1j_124", Fd = "_agentMeta_s9o1j_138", Hd = "_foot_s9o1j_49", Wd = "_footName_s9o1j_150", zd = "_footLinks_s9o1j_157", Kd = "_linkBrand_s9o1j_184", Gd = "_label_s9o1j_205", Ud = "_note_s9o1j_210", Vd = "_footer_s9o1j_226", L = {
  sidebar: Sd,
  brand: Rd,
  mark: Td,
  word: xd,
  nav: Ld,
  navItem: Ad,
  new: "_new_s9o1j_48",
  footLink: Ed,
  group: Id,
  groupName: Md,
  agents: Bd,
  agent: jd,
  root: Pd,
  agentTop: qd,
  dot: Od,
  agentName: Dd,
  agentMeta: Fd,
  foot: Hd,
  footName: Wd,
  footLinks: zd,
  linkBrand: Kd,
  label: Gd,
  note: Ud,
  footer: Vd
};
function Yd({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ l(
    "a",
    {
      className: L.agent,
      href: W(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ l("span", { className: L.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: L.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": nn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: L.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: L.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Jd({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: L.foot, children: [
    /* @__PURE__ */ n("span", { className: L.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: L.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${L.footLink} ward-target`, href: W(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function Qd({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: o, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ l("nav", { className: L.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ l("div", { className: L.brand, children: [
      /* @__PURE__ */ n("span", { className: L.mark }),
      /* @__PURE__ */ n("span", { className: L.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: L.nav, children: t.map((s) => /* @__PURE__ */ n("a", { className: L.navItem, href: W(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ l("div", { className: L.group, children: [
      /* @__PURE__ */ l("span", { className: L.groupName, children: [
        a,
        " · ",
        ae(r.length)
      ] }),
      o && /* @__PURE__ */ n("a", { className: L.new, href: W(o.href), children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: L.agents, children: r.map((s) => /* @__PURE__ */ n(Yd, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(Jd, { shared: i })
  ] });
}
function Xd(e) {
  return e.destinations ?? e.items ?? [];
}
function Zd({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: L.linkBrand, children: e });
}
function eu({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: L.footer, children: e });
}
function tu({ link: e, active: t }) {
  return /* @__PURE__ */ l("a", { href: W(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: L.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: L.note, children: e.note })
  ] });
}
function nu(e) {
  return /* @__PURE__ */ l("aside", { className: `${L.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Zd, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Xd(e).map((t) => /* @__PURE__ */ n(tu, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(eu, { children: e.children })
  ] });
}
function au(e) {
  return "agents" in e;
}
function mT(e) {
  return au(e) ? /* @__PURE__ */ n(Qd, { ...e }) : /* @__PURE__ */ n(nu, { ...e });
}
const ru = "_mark_wlgi8_3", ou = {
  mark: ru
}, lu = { met: "✓", unmet: "", failed: "✕" };
function cn({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: ou.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: lu[e]
    }
  );
}
const iu = "_avatar_1t33a_3", su = {
  avatar: iu
};
function Ct(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function cu(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [Ct(e), ...[...t.slice(1)].map((r) => a + r)];
}
function du(e, t) {
  const a = cu(e).find((o) => !t.has(o));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(Ct(e).charAt(0) + String(r)); ) r += 1;
  return Ct(e).charAt(0) + String(r);
}
function wT(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const o = du(r, t);
    t.add(o), a.set(r, o);
  }
  return a;
}
function uu(e) {
  return e != null && dt(e) ? Zr(e) : void 0;
}
function fT({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: su.avatar, "data-size": a, "aria-hidden": "true", style: uu(t), children: r ?? Ct(e) });
}
const hu = "_marker_br9fi_2", mu = {
  marker: hu
}, wu = {
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
}, fu = { running: " ward-running" };
function He({ size: e, kind: t, label: a }) {
  const r = { "--marker": wu[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${mu.marker} ward-marker ward-marker--${t}${fu[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const _u = "_root_ti0pq_2", vu = "_chip_ti0pq_11", bu = "_noCase_ti0pq_23", ft = {
  root: _u,
  chip: vu,
  noCase: bu
};
function pu(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function dn({ connection: e, since: t, lastEventAt: a }) {
  const r = pu(t, a), o = an(r, e === "reconnecting");
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
const gu = "_root_yylks_2", yu = "_context_yylks_13", Nu = "_row_yylks_1", ku = "_heading_yylks_27", $u = "_headingWrap_yylks_35", Cu = "_meta_yylks_41", Su = "_chips_yylks_49", Ru = "_title_yylks_56", Tu = "_consequence_yylks_66", xu = "_actionsWrap_yylks_73", Lu = "_actions_yylks_73", Au = "_action_yylks_73", Eu = "_overflowPanel_yylks_102", Iu = "_measureClip_yylks_113", Mu = "_measure_yylks_113", U = {
  root: gu,
  context: yu,
  row: Nu,
  heading: ku,
  headingWrap: $u,
  meta: Cu,
  chips: Su,
  title: Ru,
  consequence: Tu,
  actionsWrap: xu,
  actions: Lu,
  action: Au,
  overflowPanel: Eu,
  measureClip: Iu,
  measure: Mu
};
function Bu({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(nt, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function ju({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function Pu({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function qu({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ l("div", { className: U.meta, children: [
    /* @__PURE__ */ n(ju, { chips: e }),
    /* @__PURE__ */ n(Pu, { consequence: t, consequenceHint: a })
  ] });
}
function Ou({ title: e, chips: t, consequence: a, consequenceHint: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: U.heading, children: [
    /* @__PURE__ */ n(Bu, { title: e, density: o }),
    /* @__PURE__ */ n(qu, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function Yt({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function Mn({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Du({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: o }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(Mn, { disclosure: o }) : t ? [/* @__PURE__ */ n(Mn, { disclosure: o }, "more"), /* @__PURE__ */ n(Yt, { actions: e }, "actions")] : /* @__PURE__ */ n(Yt, { actions: e });
}
function Fu(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function Hu({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(Yt, { actions: e }) });
}
function Wu(e, t) {
  const a = N(), [r, o] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: a, toggle: () => o(!i) }, close: () => {
    var d, u;
    o(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const zu = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function Ku(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && zu(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function Gu({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(as, { path: e.path, current: e.current }) });
}
function Uu(...e) {
  return e.some((t) => t === null);
}
function Vu(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Yu(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + Vu(e);
}
function Ju(e, t, a, r, o) {
  if (o === 0 || Uu(t, a, r)) return !1;
  const [i, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - Yu(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Qu(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Xu(e) {
  return Ir(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Zu(e, t) {
  return t.length === 0 && e.length === 1 && Xu(e[0]);
}
function eh(e, t) {
  const a = _(null), r = _(null), o = _(null), i = _(null), [s, c] = g(!1);
  return C(() => {
    const d = a.current;
    if (!Qu(d)) return;
    const u = () => c(Ju(d, r.current, o.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: o, measureRef: i, collapsed: s && !t };
}
function th({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ l("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] }) });
}
function nh({ connection: e }) {
  return e ? /* @__PURE__ */ n(dn, { connection: e.connection, since: e.since }) : null;
}
function _T({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: o, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: p, measureRef: A, collapsed: M } = eh(s, Zu(s, c)), z = c.length > 0, { disclosure: me, close: re } = Wu(M || z, p), Ee = Fu(c, s, M, u);
  return /* @__PURE__ */ l("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(Gu, { crumb: Ku(e, r, t) }),
    /* @__PURE__ */ l("div", { className: U.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: f, className: U.headingWrap, children: /* @__PURE__ */ n(Ou, { title: r, chips: a, consequence: o, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ l("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(nh, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: p, "data-ward-actions": !0, children: /* @__PURE__ */ n(Du, { actions: s, hasMore: z, collapsed: M, onOverflow: u, disclosure: me }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Hu, { actions: Ee, disclosure: me, onEscape: re }),
    /* @__PURE__ */ n(th, { actions: s, hasMore: z, measureRef: A })
  ] });
}
const ah = "_root_td96x_2", rh = "_body_td96x_16", Bn = {
  root: ah,
  body: rh
};
function vT({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${Bn.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: Bn.body, children: a }) });
}
const oh = "_root_bf1pc_2", lh = "_table_bf1pc_9", ih = "_caption_bf1pc_14", sh = "_series_bf1pc_23", ch = "_category_bf1pc_31", dh = "_cell_bf1pc_39", uh = "_track_bf1pc_45", hh = "_lane_bf1pc_52", mh = "_bar_bf1pc_56", wh = "_value_bf1pc_63", fh = "_swatch_bf1pc_70", _h = "_empty_bf1pc_78", X = {
  root: oh,
  table: lh,
  caption: ih,
  series: sh,
  category: ch,
  cell: dh,
  track: uh,
  lane: hh,
  bar: mh,
  value: wh,
  swatch: fh,
  empty: _h
}, vh = "—", jn = 6;
function bh(e, t) {
  if (t.length < 1 || t.length > jn)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${jn}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function ph(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function qa(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function gh(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function yh({ value: e, top: t, step: a, format: r, missing: o }) {
  const i = gh(e, t), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ l("span", { className: X.track, children: [
    /* @__PURE__ */ n("span", { className: X.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${X.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: X.value, children: e === null ? o : r(e) })
  ] }) });
}
function Nh({ series: e }) {
  return /* @__PURE__ */ n(T, { children: e.map((t, a) => /* @__PURE__ */ l("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: X.swatch, "data-step": qa(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function kh({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ l("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: X.caption, children: e }),
    /* @__PURE__ */ n("p", { className: X.empty, children: t })
  ] });
}
function $h({ title: e, categories: t, series: a, top: r, format: o = ae, categoryHead: i = "Category", missing: s = vh }) {
  return /* @__PURE__ */ n("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ l("table", { className: X.table, children: [
    /* @__PURE__ */ n("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: X.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Nh, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: X.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(yh, { value: u.values[d], top: r, step: qa(h, a.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function bT(e) {
  bh(e.categories, e.series);
  const t = ph(e.series);
  return t === 0 ? /* @__PURE__ */ n(kh, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n($h, { ...e, top: t });
}
const Ch = "_root_1bfqw_2", Sh = "_figure_1bfqw_7", Rh = "_of_1bfqw_13", Th = "_bar_1bfqw_18", xh = "_rows_1bfqw_38", Lh = "_row_1bfqw_38", Ah = "_label_1bfqw_49", Eh = "_amount_1bfqw_54", Ie = {
  root: Ch,
  figure: Sh,
  of: Rh,
  bar: Th,
  rows: xh,
  row: Lh,
  label: Ah,
  amount: Eh
};
function Ih({ spent: e, ceiling: t, breakdown: a }) {
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
const Mh = "_frame_f7bxz_2", Bh = "_table_f7bxz_6", jh = "_th_f7bxz_12", Ph = "_td_f7bxz_13", qh = "_sort_f7bxz_53", Oh = "_row_f7bxz_65", Dh = "_empty_f7bxz_73", qe = {
  frame: Mh,
  table: Bh,
  th: jh,
  td: Ph,
  sort: qh,
  row: Oh,
  empty: Dh
}, Fh = { asc: "ascending", desc: "descending" };
function Hh(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return Fh[t.direction];
}
function Wh(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: qe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function zh(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Kh({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: qe.th,
      style: zh(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Hh(e, t),
      children: Wh(e, a)
    }
  );
}
function Gh({ row: e, props: t }) {
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
function Uh({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: qe.head, children: t.map((w) => /* @__PURE__ */ n(Kh, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(Gh, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: o, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const Vh = "_list_v0s52_2", Yh = {
  list: Vh
};
function pT({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: Yh.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const Jh = "_label_1u62a_2", Qh = {
  label: Jh
};
function gT({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: Qh.label, children: t.header }) }, t.key)) }) });
}
const Xh = "_stack_bp6a0_2", Zh = {
  stack: Xh
};
function yT({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Zh.stack, "data-ward-action-stack": "", children: e });
}
const em = "_set_1z0sq_2", tm = "_legend_1z0sq_7", nm = "_row_1z0sq_15", am = "_control_1z0sq_20", rm = "_input_1z0sq_26", om = "_label_1z0sq_31", lm = "_consequence_1z0sq_36", ze = {
  set: em,
  legend: tm,
  row: nm,
  control: am,
  input: rm,
  label: om,
  consequence: lm
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
              "aria-describedby": ut(f, s),
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
const im = "_root_11gpw_2", sm = "_head_11gpw_10", cm = "_note_11gpw_29", dm = "_index_11gpw_34", um = "_dot_11gpw_38", hm = "_counter_11gpw_49", mm = "_trailing_11gpw_57", Ke = {
  root: im,
  head: sm,
  note: cm,
  index: dm,
  dot: um,
  counter: hm,
  trailing: mm
};
function wm({ index: e }) {
  return e ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("span", { className: `${Ke.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ke.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function fm({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ke.counter, "aria-hidden": "true", children: e }) : null;
}
function Pn({ title: e, index: t, note: a, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Ke.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Ke.head, children: [
      /* @__PURE__ */ n(wm, { index: t }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ke.note, children: a }),
    /* @__PURE__ */ n(fm, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ke.trailing, children: i })
  ] });
}
const _m = "_strip_c3x3u_2", vm = "_cell_c3x3u_7", bm = "_value_c3x3u_12", pm = "_link_c3x3u_29", gm = "_label_c3x3u_49", ym = "_tiles_c3x3u_101", Fe = {
  strip: _m,
  cell: vm,
  value: bm,
  link: pm,
  label: gm,
  tiles: ym
};
function Da(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((o) => o.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Fa = (e) => `${Fe.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Nm({ cell: e }) {
  return /* @__PURE__ */ l("div", { className: Fe.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: Fa(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${Fe.label} ward-stat-label`, children: e.label })
  ] });
}
function km({ cell: e, href: t }) {
  return /* @__PURE__ */ l("div", { className: Fe.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: Fa(e), title: e.hint, children: /* @__PURE__ */ l("a", { className: `${Fe.link} ward-stat-link`, href: W(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${Fe.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Ha = (e) => e.href === void 0 ? /* @__PURE__ */ n(Nm, { cell: e }, e.label) : /* @__PURE__ */ n(km, { cell: e, href: e.href }, e.label);
function jt({ cells: e, divided: t = !1 }) {
  return Da("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${Fe.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(Ha) });
}
const qn = 6;
function NT({ cells: e }) {
  Da("StatTiles", e, [1, 2 * qn]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, qn) };
  return /* @__PURE__ */ n("dl", { className: `${Fe.tiles} ward-stattiles`, style: t, children: e.map(Ha) });
}
const $m = "_root_1eb1u_2", Cm = "_track_1eb1u_8", Sm = "_thumb_1eb1u_46", Rm = "_labelHidden_1eb1u_64", Tm = "_label_1eb1u_64", xm = "_lockedNote_1eb1u_84", Ge = {
  root: $m,
  track: Cm,
  thumb: Sm,
  labelHidden: Rm,
  label: Tm,
  lockedNote: xm
};
function Lm(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function Am(e) {
  return e ? `${Ge.label} ${Ge.labelHidden}` : Ge.label;
}
function Ve({ label: e, checked: t, onChange: a, disabled: r, locked: o, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = Ae(), { on: h, off: w } = Lm(t, r, o, u !== null);
  return /* @__PURE__ */ l("span", { className: `${Ge.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: d,
        role: "switch",
        "aria-checked": h,
        "aria-label": e,
        "aria-labelledby": c,
        "aria-describedby": Mt(i, u),
        title: u == null ? void 0 : u.reason,
        className: `${Ge.track} ward-switch`,
        "data-on": h,
        "data-locked": o ? !0 : void 0,
        disabled: w,
        onClick: () => !w && (a == null ? void 0 : a(!h)),
        children: /* @__PURE__ */ n("span", { className: Ge.thumb })
      }
    ),
    /* @__PURE__ */ l("label", { id: c, htmlFor: d, className: Am(s), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ge.lockedNote, children: "always on" })
    ] })
  ] });
}
const Em = "_bar_1vp69_2", Im = "_skip_1vp69_11", Mm = "_mark_1vp69_22", Bm = "_nav_1vp69_30", jm = "_list_1vp69_34", Pm = "_select_1vp69_41", qm = "_selectTrigger_1vp69_45", Om = "_dest_1vp69_52", Dm = "_actor_1vp69_71", Fm = "_actorMark_1vp69_84", Hm = "_actorLabel_1vp69_89", Wm = "_tagline_1vp69_108", se = {
  bar: Em,
  skip: Im,
  mark: Mm,
  nav: Bm,
  list: jm,
  select: Pm,
  selectTrigger: qm,
  dest: Om,
  actor: Dm,
  actorMark: Fm,
  actorLabel: Hm,
  tagline: Wm
};
function zm(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function Km(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function kT({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: o, onNavigate: i, skipTo: s = "main" }) {
  const c = Km(r);
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
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: zm(c) })
    ] })
  ] });
}
const Gm = "_tree_zzoob_2", Um = "_item_zzoob_6", Vm = "_row_zzoob_10", Ym = "_button_zzoob_22", St = {
  tree: Gm,
  item: Um,
  row: Vm,
  button: Ym
}, Wa = Ne(null);
function Jm({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Et({ orientation: "vertical" });
  return /* @__PURE__ */ n(Wa.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: St.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const Qm = { ArrowRight: !0, ArrowLeft: !1 };
function On(e) {
  return e ? !0 : void 0;
}
function Xm(e, t) {
  const a = Qm[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function Zm(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function ew(e) {
  const t = [St.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function tw(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function nw(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function aw(e) {
  return typeof e == "string" ? e : void 0;
}
function rw({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function ow({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function za(e) {
  const t = ye(Wa);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = tw(e);
  return /* @__PURE__ */ l("li", { className: St.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: ew(e),
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
            onClick: () => Zm(e),
            onKeyDown: (r) => Xm(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: nw(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: aw(e.label), children: e.label }),
              /* @__PURE__ */ n(rw, { value: e.detail }),
              /* @__PURE__ */ n(ow, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const lw = "_frame_10gwd_2", iw = "_subjectRail_10gwd_22", sw = "_subject_10gwd_22", cw = "_rail_10gwd_42", dw = "_record_10gwd_66", uw = "_recordBody_10gwd_71", hw = "_stageGrid_10gwd_120", mw = "_band_10gwd_134", ww = "_bandBody_10gwd_142", fw = "_bandActions_10gwd_147", _w = "_scroller_10gwd_155", vw = "_board_10gwd_182", bw = "_lanes_10gwd_191", pw = "_cardGrid_10gwd_225", ee = {
  frame: lw,
  subjectRail: iw,
  subject: sw,
  rail: cw,
  record: dw,
  recordBody: uw,
  stageGrid: hw,
  band: mw,
  bandBody: ww,
  bandActions: fw,
  scroller: _w,
  board: vw,
  lanes: bw,
  cardGrid: pw
};
function $T({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: ee.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function Dn(e) {
  return e ? "true" : void 0;
}
function CT({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: ee.subjectRail, "data-ward-subject-rail": a, "data-ruled": Dn(i), children: [
    /* @__PURE__ */ n("div", { className: ee.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ee.rail, "data-sticky": Dn(o), "aria-label": r, children: t })
  ] });
}
function ST({ title: e, children: t, note: a, trailing: r, pad: o = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(Pn, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ l("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(Pn, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: ee.recordBody, "data-pad": o, "data-measure": c, children: t })
  ] });
}
const gw = "_form_1j8ub_2", yw = "_fields_1j8ub_9", Nw = "_actions_1j8ub_19", Ht = {
  form: gw,
  fields: yw,
  actions: Nw
};
function RT({ label: e, children: t, actions: a, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: Ht.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ht.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: Ht.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function TT({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ l("section", { className: ee.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ee.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: ee.bandActions, children: t })
  ] });
}
const kw = "(max-width: 767.98px)";
function un({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(on, { className: ee.scroller, label: e, count: a ?? Mr.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function $w({ lanes: e, label: t, laneLabel: a }) {
  const [r, o] = g(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ l("div", { className: ee.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(P, { kind: "select", label: a, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ n(un, { label: t, children: i == null ? void 0 : i.content })
  ] });
}
function Cw({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: ee.board, "data-ward-board": "", children: /* @__PURE__ */ n(un, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(na, { children: a.content }, a.id)) }) });
}
function xT({ children: e, label: t = "Workflow board", lanes: a, laneLabel: r = "Column" }) {
  const o = st(kw);
  return a === void 0 ? /* @__PURE__ */ n(un, { label: t, children: e }) : o ? /* @__PURE__ */ n($w, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(Cw, { lanes: a, label: t });
}
function LT({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), i = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ n(on, { className: ee.stageGrid, label: a, count: o, "data-ward-stage-grid": "", "data-floor": r, style: i, children: t });
}
function AT({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${ee.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const Sw = "_block_6tv5x_3", Rw = "_sentence_6tv5x_10", Tw = "_meta_6tv5x_19", xw = "_ways_6tv5x_24", Lw = "_action_6tv5x_38", Aw = "_strip_6tv5x_42", Ew = "_loading_6tv5x_61", Iw = "_label_6tv5x_69", Mw = "_counter_6tv5x_76", _e = {
  block: Sw,
  sentence: Rw,
  meta: Tw,
  ways: xw,
  action: Lw,
  strip: Aw,
  loading: Ew,
  label: Iw,
  counter: Mw
};
function Bw({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function Pt({ sentence: e, action: t, children: a, role: r = "status", tone: o, kind: i, ask: s }) {
  return /* @__PURE__ */ l("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ l("p", { className: _e.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ l(T, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(Bw, { action: t })
  ] });
}
function jw(e) {
  return /* @__PURE__ */ n(Pt, { ...e, kind: "ward-emptystate" });
}
function ET({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(Pt, { sentence: e, action: a, children: /* @__PURE__ */ l("p", { className: _e.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function Pw({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${_e.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function IT({ ways: e, ...t }) {
  return /* @__PURE__ */ n(Pt, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(Pw, { ways: e }) });
}
function MT({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(Pt, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ l("p", { className: _e.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function BT({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ l("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function jT({ queued: e, since: t }) {
  return /* @__PURE__ */ l("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function PT({ label: e, startedAt: t }) {
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
const qw = "_note_cigdt_2", Ow = {
  note: qw
};
function Dw({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ l("p", { className: Ow.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const Fw = "_card_k7btg_3", Hw = "_hit_k7btg_31", Ww = "_head_k7btg_44", zw = "_title_k7btg_51", Kw = "_meta_k7btg_57", Gw = "_since_k7btg_66", Uw = "_sep_k7btg_76", Vw = "_fields_k7btg_80", Yw = "_field_k7btg_80", Jw = "_last_k7btg_98", Qw = "_reason_k7btg_110", de = {
  card: Fw,
  hit: Hw,
  head: Ww,
  title: zw,
  meta: Kw,
  since: Gw,
  sep: Uw,
  fields: Vw,
  field: Yw,
  last: Jw,
  reason: Qw
}, Xw = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Zw(e, t, a) {
  const r = bt(e, "blue"), o = bt(e, "orange"), i = bt(e, "green"), s = _(/* @__PURE__ */ new Set());
  C(() => {
    if (!a) return;
    const c = { blue: r, orange: o, green: i };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Xw[d.type];
      u && c[u]();
    });
  }, [r, a, i, t, o]);
}
const ef = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function tf(e, t) {
  return ef[t](e);
}
function nf({ item: e, connection: t }) {
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
function af({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ l("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function rf({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function of({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: de.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: de.field, children: tf(e, a) }, a)) });
}
const Jt = (e) => e ? !0 : void 0;
function lf(e) {
  return { "--stream": ge(e.streamStep, "id") };
}
function sf(e, t, a) {
  e == null || e(t, a);
}
function cf(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function df({ item: e, stale: t }) {
  var r, o;
  const a = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: de.last, "data-stale": Jt(t), children: a }) : null;
}
function qt(e) {
  const t = e.fields ?? [], a = e.item, r = _(null);
  Zw(r, a.key, e.feed);
  const o = cf(e.feed), i = lf(a);
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
        /* @__PURE__ */ n("button", { type: "button", className: de.hit, onClick: (s) => sf(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(af, { item: a }),
        /* @__PURE__ */ n(nt, { as: "p", className: de.title, text: a.title }),
        /* @__PURE__ */ n(nf, { item: a, connection: o }),
        /* @__PURE__ */ n(rf, { reason: a.blockedReason }),
        /* @__PURE__ */ n(of, { item: a, fields: t }),
        /* @__PURE__ */ n(df, { item: a, stale: o === "stale" })
      ]
    }
  );
}
const uf = "_column_1j8bi_3", hf = "_head_1j8bi_21", mf = "_label_1j8bi_30", wf = "_count_1j8bi_39", ff = "_list_1j8bi_53", lt = {
  column: uf,
  head: hf,
  label: mf,
  count: wf,
  list: ff
};
function Ka(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function _f({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ l("div", { className: lt.head, children: [
    /* @__PURE__ */ n("h2", { className: lt.label, id: a, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ l("span", { className: lt.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function vf(e) {
  return /* @__PURE__ */ n("div", { className: lt.list, role: "list", children: e.rows.map((t, a) => {
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
function bf({ column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), h = e.cap !== void 0 && t.length > e.cap, w = Ka(t, r);
  return /* @__PURE__ */ l("section", { className: lt.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(_f, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(vf, { column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n(Dw, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const pf = "_foot_cs4jr_2", gf = "_note_cs4jr_13", yf = "_link_cs4jr_19", Wt = {
  foot: pf,
  note: gf,
  link: yf
};
function qT({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: Wt.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Wt.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Wt.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const Nf = "_head_1tfi5_3", kf = "_identity_1tfi5_12", $f = "_titleRow_1tfi5_18", Cf = "_title_1tfi5_18", Sf = "_key_1tfi5_35", Rf = "_rollup_1tfi5_45", Tf = "_tools_1tfi5_53", xf = "_swatch_1tfi5_101", Lf = "_mark_1tfi5_108", Se = {
  head: Nf,
  identity: kf,
  titleRow: $f,
  title: Cf,
  key: Sf,
  rollup: Rf,
  tools: Tf,
  swatch: xf,
  mark: Lf
}, Fn = "initials:";
function Af(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Ef(e) {
  const t = [Af(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function If(e) {
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ l("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Ef(e)
  ] });
}
function Mf(e) {
  return e.startsWith(Fn) ? e.slice(Fn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function Bf({ markRef: e, streamStep: t }) {
  const a = { "--stream": ge(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Se.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: Mf(e) }) : /* @__PURE__ */ n("span", { className: Se.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function jf({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(P, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function OT({
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
        /* @__PURE__ */ n(Bf, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Se.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Se.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Se.rollup, "aria-live": "polite", children: If(t) })
    ] }),
    /* @__PURE__ */ l("div", { className: Se.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(jf, { owners: o, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(dn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const Pf = "_head_1sejb_14", qf = "_line_1sejb_15", Of = "_cHandle_1sejb_36", Df = "_cName_1sejb_41", Ff = "_nameLine_1sejb_49", Hf = "_cLabel_1sejb_56", Wf = "_cCap_1sejb_61", zf = "_cShown_1sejb_66", Kf = "_name_1sejb_49", Gf = "_noCap_1sejb_88", Uf = "_state_1sejb_102", Vf = "_handle_1sejb_111", Yf = "_sub_1sejb_137", q = {
  head: Pf,
  line: qf,
  cHandle: Of,
  cName: Df,
  nameLine: Ff,
  cLabel: Hf,
  cCap: Wf,
  cShown: zf,
  name: Kf,
  noCap: Gf,
  state: Uf,
  handle: Vf,
  sub: Yf
}, Jf = "can't be hidden or collapsed", Qf = "terminal · counted, not a column";
function DT() {
  return /* @__PURE__ */ l("div", { className: q.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: q.cHandle }),
    /* @__PURE__ */ n("span", { className: q.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: q.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: q.cShown, children: "Shown" })
  ] });
}
function Xf(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function Zf(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Hn(e) {
  return e.gate ? Jf : e.terminal ? Qf : Zf(e.agentsMounted);
}
function e_(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function t_({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: q.cName, children: [
    /* @__PURE__ */ l("span", { className: q.nameLine, children: [
      /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Hn(e) && /* @__PURE__ */ n("span", { className: q.sub, children: Hn(e) })
  ] });
}
function n_(e) {
  return e === void 0 ? "" : String(e);
}
function a_(e) {
  return e === "" ? void 0 : Number(e);
}
function r_({ name: e, onReorder: t }) {
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
      onKeyDown: (r) => !a && e_(r, t),
      children: "⠿"
    }
  ) });
}
function o_({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${q.cCap} ${q.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: q.cCap, children: /* @__PURE__ */ n(P, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: n_(t.cap), onChange: (r) => a({ ...t, cap: a_(r) }) }) });
}
function l_({ stage: e, config: t, onChange: a }) {
  const r = Ae() !== null, o = Xf(e, t.shown), i = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ l("span", { className: q.cShown, children: [
    /* @__PURE__ */ n(Ve, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ n("span", { className: q.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!o.shown), children: o.state })
  ] });
}
function i_(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function FT({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: q.line, "data-kind": i_(e), children: [
    /* @__PURE__ */ n(r_, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(t_, { stage: e }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: /* @__PURE__ */ n(P, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (o) => a({ ...t, label: o }) }) }),
    /* @__PURE__ */ n(o_, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(l_, { stage: e, config: t, onChange: a })
  ] });
}
const s_ = "_body_8qsv9_2", c_ = "_head_8qsv9_9", d_ = "_summary_8qsv9_19", u_ = "_block_8qsv9_20", h_ = "_actionsBlock_8qsv9_21", m_ = "_title_8qsv9_41", w_ = "_note_8qsv9_46", f_ = "_k_8qsv9_51", __ = "_kv_8qsv9_58", v_ = "_row_8qsv9_64", b_ = "_label_8qsv9_75", p_ = "_value_8qsv9_84", g_ = "_quote_8qsv9_90", y_ = "_actions_8qsv9_21", N_ = "_resolve_8qsv9_111", D = {
  body: s_,
  head: c_,
  summary: d_,
  block: u_,
  actionsBlock: h_,
  title: m_,
  note: w_,
  k: f_,
  kv: __,
  row: v_,
  label: b_,
  value: p_,
  quote: g_,
  actions: y_,
  resolve: N_
};
function k_(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function $_(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function C_(e) {
  const t = mt(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function S_(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function R_(e, t, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Bt(C_(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...k_(e),
    ...S_(a),
    ...$_(e, t)
  ];
}
function T_({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: D.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: D.k, children: t }),
    e
  ] });
}
function x_(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function L_({ item: e, showKey: t }) {
  const a = x_(e);
  return !t && !a ? null : /* @__PURE__ */ l("div", { className: D.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function A_({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: D.block, children: [
    /* @__PURE__ */ n("p", { className: D.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: D.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: D.note, children: e.agentMeta })
  ] }) : null;
}
function HT({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: o, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = N(), w = R_(e, o, d);
  return /* @__PURE__ */ n(at, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: D.body, children: [
    /* @__PURE__ */ n(L_, { item: e, showKey: u }),
    /* @__PURE__ */ l("div", { className: D.summary, children: [
      /* @__PURE__ */ n("h2", { className: D.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: D.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: D.kv, children: w.map(([f, p, A]) => /* @__PURE__ */ l("div", { className: D.row, children: [
      /* @__PURE__ */ n("dt", { className: D.label, children: f }),
      /* @__PURE__ */ n("dd", { className: D.value, children: p })
    ] }, A ?? f)) }),
    /* @__PURE__ */ n(A_, { item: e }),
    /* @__PURE__ */ l("div", { className: D.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: D.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: D.note, children: c })
    ] }),
    /* @__PURE__ */ n(T_, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const E_ = "_root_3azmy_2", I_ = "_list_3azmy_7", M_ = "_item_3azmy_12", B_ = "_box_3azmy_18", j_ = "_text_3azmy_23", P_ = "_note_3azmy_28", Je = {
  root: E_,
  list: I_,
  item: M_,
  box: B_,
  text: j_,
  note: P_
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
const q_ = "_rail_znbbp_2", O_ = "_k_znbbp_11", D_ = "_head_znbbp_19", F_ = "_section_znbbp_25", H_ = "_card_znbbp_39", W_ = "_strip_znbbp_46", z_ = "_skeleton_znbbp_60", K_ = "_skeletonLabel_znbbp_74", G_ = "_bar_znbbp_80", U_ = "_note_znbbp_89", fe = {
  rail: q_,
  k: O_,
  head: D_,
  section: F_,
  card: H_,
  strip: W_,
  skeleton: z_,
  skeletonLabel: K_,
  bar: G_,
  note: U_
};
function V_(e) {
  return (t) => e == null ? void 0 : e(t);
}
function zt({ title: e, children: t }) {
  return /* @__PURE__ */ l("section", { className: fe.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: fe.k, children: e }),
    t
  ] });
}
function Y_({ column: e, count: t }) {
  return /* @__PURE__ */ l("div", { className: fe.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: fe.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: fe.bar, "aria-hidden": "true" }, r))
  ] });
}
function J_({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(bf, { column: o, items: t.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, o.id));
}
function Q_(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(J_, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(Y_, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function WT(e) {
  const t = V_(e.onOpen), a = Ka(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: fe.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${fe.k} ${fe.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(zt, { title: "Card", children: /* @__PURE__ */ n("div", { className: fe.card, children: a && /* @__PURE__ */ n(qt, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ l(zt, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: fe.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Q_, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(zt, { title: "Effect of this config", children: /* @__PURE__ */ n(Ot, { items: e.effects, density: "compact" }) })
  ] });
}
function X_(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function Z_(e) {
  return Math.ceil(e.length / 2);
}
function ev(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Ga(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function tv(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const o = Ga(e);
  o !== void 0 && a(o), r(ev(e.type));
}
function nv(e, t, a, r, o) {
  C(() => {
    if (e !== null)
      return e.subscribe(t, (i) => tv(i, a, r, o));
  }, [e, t, a, r, o]);
}
function av(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function rv(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function ov(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function lv(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + B.height.card + " + " + B.height.cardRow + " * " + String(Z_(t ?? [])) + ")"
  };
}
function iv(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function sv(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: le(e.cost) }) : null;
}
function cv(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function dv(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function uv(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function hv(e, t) {
  return t === void 0 ? e : X_(e, t.ref);
}
function mv(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ct(e) {
  return e === !0 ? "true" : void 0;
}
function Ua(e) {
  const t = e.item, a = t.run, r = a !== void 0, o = _(null), i = bt(o), s = _(/* @__PURE__ */ new Set()), [c, d] = g(av(t));
  nv(e.feed, t.key, s, d, i);
  const u = rv(t, r), h = ov(t, a), w = lv(t, e.fields), f = uv(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...mv(e),
      className: "ward-workcard",
      "data-flagged": ct(t.flagged),
      "data-selected": ct(e.selected),
      style: w,
      ref: hv(o, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        iv(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          sv(t, e.fields),
          cv(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          dv(a, c, e.connection, t.changedAt),
          f !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function wv({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function fv(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function _v(e, t, a) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function vv(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(wv, { count: e.items.length, cap: e.column.cap });
}
function bv(e, t) {
  return e.roving ?? t;
}
function pv(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function gv(e, t) {
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
function yv(e) {
  const t = N(), a = Et({ orientation: "vertical" }), r = bv(e, a), o = fv(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": ct(o), "data-gate": ct(e.column.gate), children: [
    _v(e.column, e.items.length, t),
    vv(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...pv(e, a), children: gv(e, r) })
  ] });
}
function Nv(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function kv(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(P, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function $v(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function zT(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Nv(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      kv(e),
      $v(e.onConfigure),
      /* @__PURE__ */ n(dn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Cv(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Sv(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ve, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ve, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function Rv(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(T, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function KT(e) {
  const t = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": ct(Cv(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Sv(e) }),
    /* @__PURE__ */ n(P, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(fa, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Rv(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function GT(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(Ua, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(yv, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function Tv(e, t) {
  const a = Ga(e);
  a !== void 0 && t(a);
}
function xv(e, t, a) {
  C(() => {
    if (e != null)
      return e.subscribe(t, (r) => Tv(r, a));
  }, [e, t, a]);
}
function Lv(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function Av(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function Ev(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Iv(e, t) {
  return /* @__PURE__ */ l(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function UT(e) {
  var s;
  const t = e.item, a = t.run, [r, o] = g((s = t.run) == null ? void 0 : s.lastStep);
  xv(e.feed, t.key, o);
  const i = [...Lv(t), ...Av(t)];
  return /* @__PURE__ */ l(at, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Ev(a, r)
    ] }),
    Iv(t, e.actions)
  ] });
}
const Mv = "_card_1nkkx_3", Bv = "_head_1nkkx_30", jv = "_mark_1nkkx_38", Pv = "_name_1nkkx_50", qv = "_chips_1nkkx_71", Ov = "_description_1nkkx_77", Dv = "_run_1nkkx_82", Fv = "_sep_1nkkx_91", Hv = "_facts_1nkkx_97", Wv = "_fact_1nkkx_97", zv = "_factLabel_1nkkx_111", Kv = "_factValue_1nkkx_115", ie = {
  card: Mv,
  head: Bv,
  mark: jv,
  name: Pv,
  chips: qv,
  description: Ov,
  run: Dv,
  sep: Fv,
  facts: Hv,
  fact: Wv,
  factLabel: zv,
  factValue: Kv
}, Gv = { live: "done", draft: "running", paused: "meta" };
function Uv(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function Vv({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: Gv[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function Yv({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function Jv({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function Qv({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ l("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function Xv(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Zv({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: o, facts: i, className: s }) {
  const c = { "--stream": ge(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": d,
      className: Uv(s),
      style: c,
      "data-selected": d,
      "data-paused": Xv(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ l("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: W(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(Yv, { description: e.description }),
        /* @__PURE__ */ n(Jv, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Vv, { versions: e.versions }),
        /* @__PURE__ */ n(Qv, { facts: i })
      ]
    }
  );
}
const eb = "_list_4dcyc_2", tb = "_row_4dcyc_11", nb = "_head_4dcyc_23", ab = "_id_4dcyc_30", rb = "_lock_4dcyc_35", ob = "_reason_4dcyc_41", lb = "_remove_4dcyc_46", ib = "_clauses_4dcyc_50", sb = "_clause_4dcyc_50", cb = "_label_4dcyc_64", db = "_cell_4dcyc_71", ub = "_value_4dcyc_76", ce = {
  list: eb,
  row: tb,
  head: nb,
  id: ab,
  lock: rb,
  reason: ob,
  remove: lb,
  clauses: ib,
  clause: sb,
  label: cb,
  cell: db,
  value: ub
}, Va = Ne(!1);
function VT({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(Va.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function hb({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(P, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => a(e.key, o) });
}
function mb({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function wb({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ l("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(mb, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Wn(e, t) {
  return e.locked ? void 0 : t;
}
function YT({ rule: e, onChange: t, onRemove: a }) {
  if (!ye(Va)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Wn(e, t);
  return /* @__PURE__ */ l("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(wb, { rule: e, onRemove: Wn(e, a) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(hb, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const fb = "_ladder_1xdeh_2", _b = "_cell_1xdeh_7", vb = "_empty_1xdeh_26", bb = "_name_1xdeh_34", pb = "_holder_1xdeh_40", gb = "_request_1xdeh_46", yb = "_swatches_1xdeh_51", Nb = "_swatch_1xdeh_51", kb = "_tilesFrame_1xdeh_78", $b = "_tiles_1xdeh_78", Cb = "_tile_1xdeh_78", Sb = "_bar_1xdeh_117", Rb = "_hex_1xdeh_128", Tb = "_note_1xdeh_138", I = {
  ladder: fb,
  cell: _b,
  empty: vb,
  name: bb,
  holder: pb,
  request: gb,
  swatches: yb,
  swatch: Nb,
  tilesFrame: kb,
  tiles: $b,
  tile: Cb,
  bar: Sb,
  hex: Rb,
  note: Tb
}, JT = "not validated yet, pending a CVD matrix and dark stepping";
function xb(e) {
  return e.reserved ? "reserved" : dt(e.step) ? "validated" : "partial";
}
function Ya(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Lb(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Ab({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(He, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${I.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Eb(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function Ib(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const zn = (e) => String(e).padStart(2, "0");
function Mb(e, t, a) {
  return e === "reserved" ? "Reserved until revalidated" : a ? "yours" : t ?? Ya(e, void 0);
}
function Bb({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("span", { className: `${I.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${I.hex} ward-ladder-hex`, children: r ? `step ${zn(e)}` : to(e) }),
    /* @__PURE__ */ n("span", { className: `${I.note} ward-ladder-note`, children: r ? a : `Step ${zn(e)} · ${a}` })
  ] });
}
function jb({ step: e, value: t, taken: a, onChange: r, presentation: o, disabled: i }) {
  const s = xb(e), c = Ya(s, a), d = c !== "free", u = d || i, h = t === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, p = `${w} · ${o === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": p, ...Ib(d, h, u), "data-validation": s, style: Lb(e, s), onClick: f, onKeyDown: (M) => Eb(M, f) }, label: p, name: w, holder: c, validation: s, note: Mb(s, a, h), step: e.step };
}
const Pb = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${I.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${I.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Bb, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${I.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Ab, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${I.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${I.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function qb(e) {
  return Pb[e.presentation](jb(e));
}
function Ob(e) {
  for (const t of e)
    if (!t.reserved && !It(t.step)) throw new Error("colour ladder renders token steps only");
}
function Db() {
  return /* @__PURE__ */ l("div", { className: `${I.cell} ward-ladder-cell ${I.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${I.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${I.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${I.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Fb(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Hb = { list: I.ladder, swatches: I.swatches, tiles: I.tilesFrame };
function Wb() {
  return /* @__PURE__ */ l("div", { className: `${I.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${I.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${I.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${I.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const zb = { list: Db, swatches: () => null, tiles: Wb };
function Kb(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Ja(e) {
  const t = e.takenBy ?? {}, a = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Ob(e.steps);
  const r = Fb(e), o = zb[r], i = /* @__PURE__ */ l(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(qb, { step: s, value: e.value, taken: t[s.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Kb(e.disabled === !0), className: `${Hb[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: I.tiles, children: i }) : i });
}
const Gb = "_rail_s06lm_2", Ub = "_section_s06lm_12", Vb = "_sectionFlush_s06lm_22", Yb = "_head_s06lm_26", Jb = "_headLabel_s06lm_34", Qb = "_sample_s06lm_42", Xb = "_sampleLabel_s06lm_47", Zb = "_sampleTitle_s06lm_54", ep = "_sampleMeta_s06lm_59", tp = "_trace_s06lm_65", np = "_traceHead_s06lm_70", ap = "_steps_s06lm_78", rp = "_step_s06lm_78", op = "_stepTitle_s06lm_97", lp = "_hollow_s06lm_107", ip = "_stepBody_s06lm_115", sp = "_stepDetail_s06lm_127", cp = "_publish_s06lm_132", dp = "_reason_s06lm_138", up = "_note_s06lm_143", hp = "_reveal_s06lm_148", k = {
  rail: Gb,
  section: Ub,
  sectionFlush: Vb,
  head: Yb,
  headLabel: Jb,
  sample: Qb,
  sampleLabel: Xb,
  sampleTitle: Zb,
  sampleMeta: ep,
  trace: tp,
  traceHead: np,
  steps: ap,
  step: rp,
  stepTitle: op,
  hollow: lp,
  stepBody: ip,
  stepDetail: sp,
  publish: cp,
  reason: dp,
  note: up,
  reveal: hp
}, Kn = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, mp = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, wp = { ok: "greenFill", finding: "orangeFill", action: "blue" }, fp = { notSimulated: "not simulated", running: "running" };
function _p(e) {
  return e.presentation === "foundry";
}
function vp(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const a = t.filter((r) => !r.met);
  return a.length > 0 ? `Publish is disabled: ${a.length} of ${t.length} gate conditions unmet: ${a[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function bp(e, t) {
  var r;
  const a = mp[e.status];
  return a !== void 0 ? a : ((r = t.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function pp(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function gp(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function yp(e) {
  if (pp(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Np(e) {
  const [t, a] = g(!1);
  C(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function kp(e) {
  const t = fp[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(He, { size: 6, kind: wp[e.kind], label: e.kind });
}
function $p(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Cp(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Sp(e) {
  const { step: t } = e;
  return /* @__PURE__ */ l(Np, { kind: t.kind, children: [
    /* @__PURE__ */ n(kp, { kind: t.kind }),
    /* @__PURE__ */ l("span", { className: k.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: k.stepTitle, children: t.title }),
      /* @__PURE__ */ n($p, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Cp, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function Rp(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(ue(t)), a.join(" · ");
}
function Qa(e) {
  const t = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ n("p", { className: k.traceHead, id: t, children: Rp(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: k.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(Sp, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function Tp(e) {
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
function xp(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function Lp(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? ra(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: k.sectionFlush, children: /* @__PURE__ */ n(jt, { divided: !0, cells: t }) });
}
function Ap(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: ra(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function Ep(e) {
  const t = Ap(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ l("p", { className: k.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: k.sectionFlush, children: /* @__PURE__ */ n(jt, { divided: !0, cells: t }) });
}
function Xa(e) {
  const t = N();
  return e.reason !== null ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("p", { className: `${k.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Ip(e) {
  return /* @__PURE__ */ l("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ n(Xa, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: k.note, children: e.note })
  ] });
}
function Mp(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ n(Xa, { reason: e.reason, onPublish: e.onPublish }) });
}
function Za(e) {
  return /* @__PURE__ */ l("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: Kn[e.run.status].role, label: Kn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Bp(e, t) {
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
function jp(e) {
  var a;
  gp(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Za, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(Tp, { sample: e.run.sample }),
    /* @__PURE__ */ n(Qa, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(Lp, { run: e.run }),
    /* @__PURE__ */ n("div", { className: k.section, children: /* @__PURE__ */ n(Ot, { items: e.checklist }) }),
    /* @__PURE__ */ n(Ip, { reason: vp(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Pp(e) {
  var r;
  const t = Bp(e.run, e.feed);
  yp(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Za, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(xp, { sample: e.run.sample }),
    /* @__PURE__ */ n(Qa, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(Ep, { run: e.run }),
    /* @__PURE__ */ n("div", { className: k.section, children: /* @__PURE__ */ n(Ot, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Mp, { reason: bp(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function QT(e) {
  return _p(e) ? /* @__PURE__ */ n(Pp, { ...e }) : /* @__PURE__ */ n(jp, { ...e });
}
const qp = "_list_142ip_3", Op = "_row_142ip_9", Dp = "_condition_142ip_18", Fp = "_action_142ip_24", gt = {
  list: qp,
  row: Op,
  condition: Dp,
  action: Fp
}, er = Ne(!1);
function XT({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(er.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: gt.list, "aria-label": t, children: e }) });
}
function ZT({ rule: e }) {
  if (!ye(er)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: gt.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: gt.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: gt.action, children: e.then })
  ] });
}
const Hp = "_move_tmppt_3", Wp = {
  move: Hp
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
function zp(e) {
  return e === "up" ? "down" : "up";
}
function Kp(e, t) {
  const a = Gn(e, t.id, t.direction) ?? Gn(e, t.id, zp(t.direction));
  a == null || a.focus();
}
function ar() {
  const e = _(null), [t, a] = g(null), [r, o] = g("");
  return C(() => {
    e.current !== null && t !== null && Kp(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), o(c);
  } };
}
function rr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Rt({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${Wp.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const Gp = "_body_1jd1i_2", Up = "_title_1jd1i_8", Vp = "_section_1jd1i_13", Yp = "_legend_1jd1i_18", Jp = "_stages_1jd1i_26", Qp = "_stage_1jd1i_26", Xp = "_stageIndex_1jd1i_44", Zp = "_stageName_1jd1i_50", eg = "_footer_1jd1i_59", tg = "_note_1jd1i_66", ng = "_reason_1jd1i_71", ag = "_actions_1jd1i_76", rg = "_webHead_1jd1i_83", og = "_kicker_1jd1i_92", lg = "_webTitle_1jd1i_99", ig = "_webBody_1jd1i_105", sg = "_webSection_1jd1i_109", cg = "_sectionHead_1jd1i_121", dg = "_sectionNote_1jd1i_129", ug = "_formLabel_1jd1i_134", hg = "_identityRow_1jd1i_139", mg = "_nameCell_1jd1i_145", wg = "_keyCell_1jd1i_150", fg = "_colourCell_1jd1i_154", _g = "_colourStatus_1jd1i_161", vg = "_webStages_1jd1i_166", bg = "_webStageList_1jd1i_172", pg = "_webStage_1jd1i_166", gg = "_webIndex_1jd1i_191", yg = "_webStageName_1jd1i_196", Ng = "_webMoves_1jd1i_201", kg = "_addStage_1jd1i_215", $g = "_addStageButton_1jd1i_223", Cg = "_addStageNote_1jd1i_231", Sg = "_webFooter_1jd1i_236", Rg = "_webFooterNotes_1jd1i_244", Tg = "_webNote_1jd1i_251", v = {
  body: Gp,
  title: Up,
  section: Vp,
  legend: Yp,
  stages: Jp,
  stage: Qp,
  stageIndex: Xp,
  stageName: Zp,
  footer: eg,
  note: tg,
  reason: ng,
  actions: ag,
  webHead: rg,
  kicker: og,
  webTitle: lg,
  webBody: ig,
  webSection: sg,
  sectionHead: cg,
  sectionNote: dg,
  formLabel: ug,
  identityRow: hg,
  nameCell: mg,
  keyCell: wg,
  colourCell: fg,
  colourStatus: _g,
  webStages: vg,
  webStageList: bg,
  webStage: pg,
  webIndex: gg,
  webStageName: yg,
  webMoves: Ng,
  addStage: kg,
  addStageButton: $g,
  addStageNote: Cg,
  webFooter: Sg,
  webFooterNotes: Rg,
  webNote: Tg
}, xg = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], or = "not in catalogue";
function Lg(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${or}` }, ...a];
}
function Ag({ stage: e, index: t, catalogue: a, onName: r }) {
  const o = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(P, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${or}`;
  return /* @__PURE__ */ n(P, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: Lg(a, e.name), invalid: i, onChange: r });
}
function lr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function Eg(e) {
  const t = _([]), a = _(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function Ig({ id: e, stage: t, index: a, total: r, catalogue: o, onReplace: i, onMove: s }) {
  const c = lr(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: v.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: v.webStageName, children: /* @__PURE__ */ n(Ag, { stage: t, index: a, catalogue: o, onName: (u) => i({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(P, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: xg, onChange: (u) => i({ ...t, kind: u }) }),
    /* @__PURE__ */ l("span", { className: v.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(Rt, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(Rt, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Mg({ stages: e, onChange: t, catalogue: a }) {
  const r = Eg(e.length), o = ar(), i = (c, d) => {
    const u = tr(c, d);
    r.current = Qt(r.current, c, u), o.moved({ id: r.current[u], direction: d }, nr(lr(e[c], c), u, e.length)), t(Qt(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ l("div", { className: v.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(Ig, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(rr, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: v.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Bg = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], jg = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Pg = "A new stream starts as a draft. Nothing runs on it until you publish it.", qg = "Create is disabled: name the stream and give it a key first.", Og = "reorder with the ↑ ↓ buttons · min 2";
function hn(e, t) {
  return !e.reserved && dt(e.step) && t[e.step] === void 0;
}
function Dg(e, t) {
  const a = e.find((r) => hn(r, t));
  return a ? a.step : 1;
}
function Fg({ stages: e, onMove: t }) {
  const a = ar(), r = (o, i) => {
    const s = tr(o, i);
    a.moved({ id: e[o].id, direction: i }, nr(e[o].name, s, e.length)), t(o, s);
  };
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: v.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: v.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: v.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(Rt, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(Rt, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(rr, { text: a.announcement })
  ] });
}
function Hg({ reason: e, onCreate: t, onDraft: a }) {
  const r = N();
  return /* @__PURE__ */ l("div", { className: v.footer, children: [
    /* @__PURE__ */ n("p", { className: v.note, children: Pg }),
    e && /* @__PURE__ */ n("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: v.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function Wg(e, t) {
  return e !== "" && t !== "" ? null : qg;
}
function zg(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: o = jg, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [h, w] = g(""), [f, p] = g(""), [A, M] = g(t[0].value), [z, me] = g(() => Dg(a, r)), [re, Ee] = g(e.stages ?? Bg), [Ye, R] = g(o[0].value), Y = { name: h, key: f, streamStep: z, owner: A, stages: re, policy: Ye }, ke = Wg(h, f);
  return /* @__PURE__ */ n(at, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ l("div", { className: v.body, children: [
    /* @__PURE__ */ n("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ n(P, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ n(P, { kind: "input", label: "Key", value: f, onChange: p, mono: !0 }),
      /* @__PURE__ */ n(P, { kind: "select", label: "Owner", value: A, onChange: M, options: t })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ n(Ja, { label: "Stream colour", steps: a, value: z, onChange: me, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ n(Fg, { stages: re, onMove: (We, Er) => Ee(Qt(re, We, Er)) })
    ] }),
    /* @__PURE__ */ n(Oa, { legend: "Loop policy", options: o, value: Ye, onChange: R }),
    /* @__PURE__ */ n(Hg, { reason: ke, onCreate: () => i(Y), onDraft: () => s(Y) })
  ] }) });
}
const ir = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Kg = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Gg(e, t, a, r, o, i) {
  var c;
  const s = ((c = ir.find((d) => d.value === o)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: i };
}
function Ug(e, t) {
  return Vg(e) && Yg(e, t) && Jg(e);
}
function Vg(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Yg(e, t) {
  return e.colourStep === null || hn({ step: e.colourStep }, t);
}
function Jg(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function Qg(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : hn({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Xg({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function Zg({ ready: e, draft: t, agentStage: a, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: v.webFooter, children: [
    /* @__PURE__ */ l("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ n(Xg, { stage: a }),
      !e && /* @__PURE__ */ n("p", { id: i, className: v.reason, children: Kg })
    ] }),
    o && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => o(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function ey({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: v.webHead, children: [
    /* @__PURE__ */ n("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function ty({ name: e, setName: t, streamKey: a, setKey: r, colour: o, owner: i }) {
  return /* @__PURE__ */ l("section", { className: v.webSection, children: [
    /* @__PURE__ */ n("h3", { className: v.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ l("div", { className: v.identityRow, children: [
      /* @__PURE__ */ n("div", { className: v.nameCell, children: /* @__PURE__ */ n(P, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ n("div", { className: v.keyCell, children: /* @__PURE__ */ n(P, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      o
    ] }),
    i
  ] });
}
function ny(e) {
  const t = N(), a = N(), r = e.takenBy ?? {}, [o, i] = g(""), [s, c] = g(""), [d, u] = g(e.owners[0] ?? ""), [h, w] = g(null), [f, p] = g("relay"), [A, M] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), z = Gg(o, s, d, h, f, A), me = Ug(z, r), re = A.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ee = /* @__PURE__ */ l("div", { className: v.colourCell, children: [
    /* @__PURE__ */ n("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Ja, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ye = /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("p", { className: v.colourStatus, "data-colour-status": "", children: Qg(h, r) }),
    /* @__PURE__ */ n(P, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ l(at, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(ey, { titleId: a }),
    /* @__PURE__ */ l("div", { className: v.webBody, children: [
      /* @__PURE__ */ n(ty, { name: o, setName: i, streamKey: s, setKey: c, colour: Ee, owner: Ye }),
      /* @__PURE__ */ l("section", { className: v.webSection, children: [
        /* @__PURE__ */ l("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: v.sectionNote, children: Og })
        ] }),
        /* @__PURE__ */ n(Mg, { stages: A, onChange: M })
      ] }),
      /* @__PURE__ */ n("section", { className: v.webSection, children: /* @__PURE__ */ n(Oa, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: ir, onChange: p }) }),
      /* @__PURE__ */ n(Zg, { ready: me, draft: z, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function e2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ny, { ...e }) : /* @__PURE__ */ n(zg, { ...e });
}
const ay = "_row_bs8hc_2", ry = "_cell_bs8hc_6", oy = "_condition_bs8hc_11", ly = "_action_bs8hc_18", iy = "_contract_bs8hc_24", sy = "_contractCondition_bs8hc_33", cy = "_contractAction_bs8hc_39", ne = {
  row: ay,
  cell: ry,
  condition: oy,
  action: ly,
  contract: iy,
  contractCondition: sy,
  contractAction: cy
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
function dy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n("span", { className: ne.condition, title: Tt(e, r), children: Tt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: mn(e, t, a) })
  ] });
}
function uy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ l("td", { className: ne.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ne.condition, children: Tt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: mn(e, t, a) })
  ] });
}
function hy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: ne.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ne.contractCondition, children: Tt(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ne.contractAction, children: mn(e, t, a, !0) })
  ] });
}
const my = { two: uy, four: dy, contract: hy };
function t2(e) {
  var a;
  if (!sr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = my[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const wy = "_column_g1uat_2", fy = "_head_g1uat_17", _y = "_index_g1uat_23", vy = "_name_g1uat_29", by = "_meta_g1uat_38", py = "_mono_g1uat_43", gy = "_gate_g1uat_50", yy = "_reviewersLabel_g1uat_57", Ny = "_reviewers_g1uat_57", ky = "_reviewer_g1uat_57", $y = "_agents_g1uat_74", Cy = "_workflowColumn_g1uat_79", Sy = "_workflowHead_g1uat_96", Ry = "_stageRow_g1uat_102", Ty = "_stageLabel_g1uat_109", xy = "_workflowTitle_g1uat_116", Ly = "_workflowMeta_g1uat_122", Ay = "_workflowGate_g1uat_127", Ey = "_gateNote_g1uat_135", Iy = "_cardNote_g1uat_140", My = "_reviewerList_g1uat_145", By = "_reviewerRow_g1uat_151", jy = "_reviewerMark_g1uat_157", Py = "_reviewerName_g1uat_167", qy = "_terminalCard_g1uat_173", Oy = "_terminalCount_g1uat_182", Dy = "_workflowAgents_g1uat_188", Fy = "_mount_g1uat_194", S = {
  column: wy,
  head: fy,
  index: _y,
  name: vy,
  meta: by,
  mono: py,
  gate: gy,
  reviewersLabel: yy,
  reviewers: Ny,
  reviewer: ky,
  agents: $y,
  workflowColumn: Cy,
  workflowHead: Sy,
  stageRow: Ry,
  stageLabel: Ty,
  workflowTitle: xy,
  workflowMeta: Ly,
  workflowGate: Ay,
  gateNote: Ey,
  cardNote: Iy,
  reviewerList: My,
  reviewerRow: By,
  reviewerMark: jy,
  reviewerName: Py,
  terminalCard: qy,
  terminalCount: Oy,
  workflowAgents: Dy,
  mount: Fy
}, Hy = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function wn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function cr(e) {
  return `${Math.round(e * 100)}%`;
}
function Wy({ stage: e }) {
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
function zy({ stage: e }) {
  return /* @__PURE__ */ n(jt, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: wn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function Ky({ stage: e, titleId: t }) {
  return /* @__PURE__ */ l("header", { className: S.head, children: [
    /* @__PURE__ */ n("span", { className: S.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: S.name, id: t, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: Hy[e.kind] })
  ] });
}
function Gy({ stage: e }) {
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
function Uy({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(Wy, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(zy, { stage: e }) : null;
}
function Vy({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Yy({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const o = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: S.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Ky, { stage: e, titleId: o }),
    /* @__PURE__ */ n(Gy, { stage: e }),
    /* @__PURE__ */ n(Uy, { stage: e }),
    /* @__PURE__ */ n("div", { className: S.agents, children: t.map((s) => /* @__PURE__ */ n(Zv, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(Vy, { onMount: a })
  ] });
}
const Jy = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function Qy({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: S.reviewerList, children: e.map((t, a) => /* @__PURE__ */ l("li", { className: S.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: S.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: S.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function Xy({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: S.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: S.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ n(Qy, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: S.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: cr(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Zy(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function eN({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: S.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: S.terminalCount, children: wn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: S.cardNote, children: Zy(e.rolledBackThisWeek) })
  ] });
}
function tN(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function nN(e) {
  if (e.kind === "terminal") return `${wn(e.closedThisWeek)} this week`;
  const t = tN(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function aN({ stage: e, titleId: t }) {
  const a = Jy[e.kind];
  return /* @__PURE__ */ l("header", { className: S.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: S.stageRow, children: [
      /* @__PURE__ */ l("span", { className: S.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: S.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: S.workflowMeta, children: nN(e) })
  ] });
}
function rN(e) {
  return e === "entry" || e === "agent";
}
function oN({ stage: e, onMount: t }) {
  return t === void 0 || !rN(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: S.mount, onClick: () => t(e.index), children: "+ Mount agent" });
}
function lN({ stage: e, agentCards: t, onMount: a }) {
  const r = N();
  return /* @__PURE__ */ l("section", { className: S.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(aN, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(Xy, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(eN, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: S.workflowAgents, children: t }),
    /* @__PURE__ */ n(oN, { stage: e, onMount: a })
  ] });
}
function iN(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function n2(e) {
  return iN(e) ? /* @__PURE__ */ n(lN, { ...e }) : /* @__PURE__ */ n(Yy, { ...e });
}
const sN = "_row_1tdra_6", cN = "_name_1tdra_12", dN = "_compactRow_1tdra_13", uN = "_compactName_1tdra_13", hN = "_cell_1tdra_30", mN = "_chain_1tdra_45", wN = "_owner_1tdra_51", fN = "_mono_1tdra_57", _N = "_compactCell_1tdra_79", vN = "_stack_1tdra_96", bN = "_stat_1tdra_103", pN = "_identityLine_1tdra_110", gN = "_identity_1tdra_110", yN = "_ownerLine_1tdra_140", NN = "_link_1tdra_160", kN = "_gateMark_1tdra_166", $N = "_emptyChain_1tdra_171", CN = "_arrow_1tdra_177", SN = "_muted_1tdra_182", RN = "_define_1tdra_187", TN = "_statValue_1tdra_194", xN = "_policyId_1tdra_200", LN = "_sub_1tdra_205", y = {
  row: sN,
  name: cN,
  compactRow: dN,
  compactName: uN,
  cell: hN,
  chain: mN,
  owner: wN,
  mono: fN,
  compactCell: _N,
  stack: vN,
  stat: bN,
  identityLine: pN,
  identity: gN,
  ownerLine: yN,
  link: NN,
  gateMark: kN,
  emptyChain: $N,
  arrow: CN,
  muted: SN,
  define: RN,
  statValue: TN,
  policyId: xN,
  sub: LN
};
function dr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function AN(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function EN(e) {
  return e === void 0 ? y.compactRow : `${y.compactRow} ${e}`;
}
function ur(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function IN(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${ur(e.members)}`;
}
function MN(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: y.compactCell, children: /* @__PURE__ */ l("span", { className: y.stack, children: [
    /* @__PURE__ */ l("span", { className: y.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${y.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${y.compactName} ward-rowlink ward-target`, href: W(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: y.ownerLine, children: IN(e) })
  ] }) });
}
function hr({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ l(T, { children: [
    t ? /* @__PURE__ */ n("span", { className: y.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function BN(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = mt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function jN({ stages: e, streamStep: t }) {
  const a = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${y.chain} ward-chiprow`, children: e.map((o, i) => /* @__PURE__ */ l("span", { className: y.link, children: [
    /* @__PURE__ */ n(hr, { name: o.name, gate: o.gate === !0, look: BN(i, a, t), size: "tag" }),
    i === r ? null : /* @__PURE__ */ n("span", { className: y.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${i}`)) });
}
function PN(e) {
  return /* @__PURE__ */ n("td", { className: y.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ l("span", { className: y.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: y.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: y.define, children: "Define workflow" })
  ] }) : jN(e) });
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
function qN(e) {
  return /* @__PURE__ */ n("td", { className: y.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: y.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: y.stat, children: [
    /* @__PURE__ */ n("span", { className: y.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: y.sub, children: e.summary })
  ] }) });
}
function ON(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function DN({ stream: e, href: t, presentation: a }) {
  const r = EN(a.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, onClick: dr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ge(e.streamStep, "chip") }, children: [
    MN(e, t),
    PN(e),
    Vn(ON(e.agents), e.agents === void 0 ? void 0 : AN(e.agents), "—"),
    qN(e.policy),
    Vn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function FN(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function a2(e) {
  if (FN(e)) return DN(e);
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
const HN = "_row_2u4ll_2", WN = "_name_2u4ll_16", zN = "_scope_2u4ll_24", xt = {
  row: HN,
  name: WN,
  scope: zN
};
function fn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function KN(e) {
  return e === void 0 ? `${xt.row} ward-toolrow` : `${xt.row} ward-toolrow ${e}`;
}
function GN(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function UN({ id: e, reasonId: t, tool: a, state: r, onChange: o }) {
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
function VN({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: fn(e) });
}
function YN({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${xt.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function JN(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function r2({ tool: e, onChange: t, presentation: a }) {
  const r = N(), o = N(), i = GN(e, a), s = JN(a);
  return /* @__PURE__ */ l(s, { className: KN(a == null ? void 0 : a.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(UN, { id: r, reasonId: o, tool: e, state: i, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${xt.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(YN, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(VN, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const QN = "_strip_4ppv9_2", XN = "_well_4ppv9_11", ZN = "_head_4ppv9_18", e1 = "_name_4ppv9_24", t1 = "_chart_4ppv9_32", n1 = "_segment_4ppv9_38", a1 = "_detailedChart_4ppv9_44", r1 = "_rail_4ppv9_57", o1 = "_section_4ppv9_63", l1 = "_label_4ppv9_74", i1 = "_note_4ppv9_91", V = {
  strip: QN,
  well: XN,
  head: ZN,
  name: e1,
  chart: t1,
  segment: n1,
  detailedChart: a1,
  rail: r1,
  section: o1,
  label: l1,
  note: i1
}, s1 = "No item in flight to preview.", c1 = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", d1 = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Xt = [1, 2, 3, 4, 5, 6], Lt = 100;
function u1(e, t) {
  return t.has(e) ? ge(e, "id") : "var(--ward-color-line)";
}
function h1({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Xt.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: o * Lt,
      y: "0",
      width: Lt,
      height: "8",
      fill: u1(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function m1(e) {
  const t = e.slice(0, Xt.length);
  for (; t.length < Xt.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function w1({ identities: e }) {
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
function f1({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: t ?? s1 }) : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(qt, { item: { ...e, streamStep: mt(a.streamStep) }, onOpen: wr(r), feed: null }) });
}
function _1({ draft: e }) {
  const t = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: V.head, style: t, children: [
    /* @__PURE__ */ n(He, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Bt(e.key, e.streamStep) })
  ] });
}
function v1(e) {
  const t = m1(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ l("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(_t, { label: "Board card", children: /* @__PURE__ */ n(f1, { ...e, draft: a }) }),
    /* @__PURE__ */ n(_t, { label: "Streams index row", children: /* @__PURE__ */ n(_1, { draft: a }) }),
    /* @__PURE__ */ l(_t, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(w1, { identities: t }),
      /* @__PURE__ */ n("p", { className: V.note, children: c1 })
    ] }),
    /* @__PURE__ */ n(_t, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: d1 }) })
  ] });
}
function b1({ draft: e, sample: t, streams: a, onOpen: r }) {
  const o = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: V.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: V.head, children: [
      /* @__PURE__ */ n(He, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Bt(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(qt, { item: { ...t, streamStep: e.streamStep }, onOpen: wr(r) }) }),
    /* @__PURE__ */ n(h1, { draft: e, streams: a })
  ] });
}
function o2(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(v1, { ...e }) : /* @__PURE__ */ n(b1, { ...e });
}
const p1 = "_row_ixlg5_6", g1 = "_headCell_ixlg5_10", y1 = "_cell_ixlg5_11", N1 = "_name_ixlg5_23", k1 = "_consequence_ixlg5_29", $1 = "_governed_ixlg5_36", C1 = "_control_ixlg5_42", S1 = "_byRole_ixlg5_48", R1 = "_webControl_ixlg5_59", T1 = "_webConsequence_ixlg5_65", x1 = "_webGoverned_ixlg5_71", H = {
  row: p1,
  headCell: g1,
  cell: y1,
  name: N1,
  consequence: k1,
  governed: $1,
  control: C1,
  byRole: S1,
  webControl: R1,
  webConsequence: T1,
  webGoverned: x1
};
function L1({
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
function A1({ capability: e, cells: t, onChange: a }) {
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
    t.map((r) => /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(L1, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function E1(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function I1({ name: e, cell: t, onChange: a }) {
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
function M1({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ l("tr", { className: H.row, children: [
    /* @__PURE__ */ l("td", { className: H.cell, children: [
      /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${H.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(I1, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webGoverned} ward-cellmeta`, children: E1(e) }) })
  ] });
}
function l2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(M1, { ...e }) : /* @__PURE__ */ n(A1, { ...e });
}
const B1 = "_row_vv64h_2", j1 = "_cell_vv64h_6", P1 = "_name_vv64h_25", q1 = "_note_vv64h_30", O1 = "_webName_vv64h_41", D1 = "_webMeta_vv64h_47", Q = {
  row: B1,
  cell: j1,
  name: P1,
  note: q1,
  webName: O1,
  webMeta: D1
}, fr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function F1(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function H1({ component: e, onRestart: t }) {
  const a = N(), r = fr[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ l("tr", { className: Q.row, children: [
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { className: Q.name, children: e.name }) }),
    /* @__PURE__ */ l("td", { className: Q.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { id: a, className: Q.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, "data-align": "end", children: o ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function W1({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: F1(e.state) });
}
function z1({ component: e, onRestart: t }) {
  return /* @__PURE__ */ l("tr", { className: Q.row, children: [
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { className: `${Q.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { className: `${Q.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { ...fr[e.state] }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(W1, { component: e, onRestart: t }) })
  ] });
}
function i2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(z1, { ...e }) : /* @__PURE__ */ n(H1, { ...e });
}
const K1 = "_row_jcm5k_7", G1 = "_cell_jcm5k_11", U1 = "_next_jcm5k_28", V1 = "_headCell_jcm5k_38", Y1 = "_webId_jcm5k_77", J1 = "_webPurpose_jcm5k_83", Q1 = "_webMeta_jcm5k_91", X1 = "_webUrgent_jcm5k_97", K = {
  row: K1,
  cell: G1,
  next: U1,
  headCell: V1,
  webId: Y1,
  webPurpose: J1,
  webMeta: Q1,
  webUrgent: X1
}, Z1 = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, ek = {
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
], tk = Object.fromEntries(_r.map((e) => [e.key, e]));
function Qe({ column: e, children: t }) {
  const a = tk[e];
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
function s2() {
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
function nk({ cred: e }) {
  const t = Z1[e.state];
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n(Qe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Qe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Qe, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(Qe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: fn(e.cls) }) }),
    /* @__PURE__ */ n(Qe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Qe, { column: "next", children: /* @__PURE__ */ n("span", { className: K.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function ak({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${K.webMeta} ${K.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function rk({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(ak, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...ek[e.state] }) })
  ] });
}
function c2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(rk, { ...e }) : /* @__PURE__ */ n(nk, { ...e });
}
const ok = "_card_lpp45_2", lk = "_head_lpp45_11", ik = "_env_lpp45_18", sk = "_version_lpp45_25", ck = "_meta_lpp45_32", dk = "_webCard_lpp45_37", uk = "_webRow_lpp45_47", hk = "_webTitle_lpp45_55", mk = "_webLine_lpp45_65", wk = "_webVersion_lpp45_72", fk = "_webMeta_lpp45_77", J = {
  card: ok,
  head: lk,
  env: ik,
  version: sk,
  meta: ck,
  webCard: dk,
  webRow: uk,
  webTitle: hk,
  webLine: mk,
  webVersion: wk,
  webMeta: fk
}, Yn = { dev: "Dev", uat: "UAT", prod: "Prod" }, vr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function _k({ env: e }) {
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
function vk(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function bk(e) {
  return /* @__PURE__ */ l("article", { className: `${J.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${J.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${J.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...vr[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${J.version} ${J.webVersion} ${J.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${J.meta} ${J.webMeta} ${J.webLine} ward-cellmeta`, children: vk(e) })
  ] });
}
function d2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(bk, { ...e }) : /* @__PURE__ */ n(_k, { ...e });
}
const pk = "_panel_1hmja_2", gk = "_line_1hmja_8", yk = "_actions_1hmja_14", vt = {
  panel: pk,
  line: gk,
  actions: yk
};
function u2(e) {
  return /* @__PURE__ */ l("div", { className: vt.panel, children: [
    /* @__PURE__ */ n("p", { className: vt.line, children: e.status }),
    /* @__PURE__ */ n(P, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: vt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: vt.line, children: e.note ?? "" })
  ] });
}
const Nk = "_upload_13fcl_2", kk = "_preview_13fcl_7", $k = "_mark_13fcl_17", Ck = "_empty_13fcl_22", Sk = "_actions_13fcl_28", Rk = "_input_13fcl_33", Tk = "_reasons_13fcl_41", xk = "_reason_13fcl_41", Lk = "_accepted_13fcl_57", oe = {
  upload: Nk,
  preview: kk,
  mark: $k,
  empty: Ck,
  actions: Sk,
  input: Rk,
  reasons: Tk,
  reason: xk,
  accepted: Lk
}, br = 1.5, pr = 22, At = "script elements or event handlers", je = "links or external references", xe = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${br}px at ${pr}px`], Ak = [xe[1], xe[2], At, je], Ek = /* @__PURE__ */ new Map([
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
]), Ik = "http://www.w3.org/2000/svg", Mk = "http://www.w3.org/2000/xmlns/", Bk = /* @__PURE__ */ new Set([
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
]), jk = /* @__PURE__ */ new Set([
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
]), _n = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, Pk = /url\s*\(|['"\\]/i;
function qk() {
  return { ok: !1, reasons: [xe[1]] };
}
function gr(e) {
  return e.namespaceURI === Ik;
}
function Ok(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && gr(t) ? t : null;
  } catch {
    return null;
  }
}
function Dk(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [xe[0]] : [];
}
function Fk(e) {
  return Ek.get(e.localName) ?? (e.localName.startsWith("animate") ? je : void 0);
}
function Hk(e) {
  return Pk.test(e.replace(_n, ""));
}
function Wk(e) {
  return /^on/i.test(e.localName) ? At : e.localName === "href" || Hk(e.value) ? je : void 0;
}
function zk(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(Fk(a));
    for (const r of Array.from(a.attributes)) t.add(Wk(r));
  }
  return Ak.filter((a) => t.has(a));
}
function Kk(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((o) => Number.isFinite(o) && o > 0), 0), r = a > 0 ? pr / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < br;
  }) ? [xe[3]] : [];
}
function Gk(e) {
  if (e.namespaceURI === Mk) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (jk.has(t) || t.startsWith("stroke"));
}
function Uk(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && gr(t) && Bk.has(t.localName);
}
function Vk(e, t) {
  Uk(t) ? t.nodeType === Node.ELEMENT_NODE && yr(t) : e.removeChild(t);
}
function yr(e) {
  for (const t of Array.from(e.attributes)) Gk(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) Vk(e, t);
  return e;
}
function Yk(e) {
  return Array.from(e.matchAll(_n), (t) => t[2]).filter((t) => t !== "");
}
function Jk(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function Qk(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const i of Yk(o.value)) a.has(i) || a.set(i, `${t}-${a.size}`);
  return a;
}
function Xk(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(_n, (r, o, i) => {
      const s = t.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function Zk(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = Qk(a, t);
  for (const o of a) {
    const i = r.get(o.getAttribute("id") ?? "");
    i === void 0 ? o.removeAttribute("id") : o.setAttribute("id", i), Xk(o, r);
  }
  return e;
}
function h2(e) {
  const t = Ok(e);
  if (t === null) return qk();
  const a = [...Dk(t), ...zk(t), ...Kk(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(Zk(yr(t), Jk(e))) };
}
const e$ = "Mark accepted.", t$ = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, n$ = new Set(la.flatMap((e) => [ge(e, "id"), ge(e, "chip")]));
function a$(e) {
  return e !== void 0 && (t$.test(e) || n$.has(e)) ? e : void 0;
}
function r$({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: oe.preview, style: { "--mark": a$(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: oe.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: oe.empty }) });
}
function o$(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function l$(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function i$({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: oe.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("p", { className: oe.accepted, children: e$ }) }) : /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("ul", { className: oe.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: oe.reason, children: t }, t)) }) });
}
function s$({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(i$, { result: e }) : /* @__PURE__ */ n("p", { className: `${oe.result} ${o$(e, a)}`, role: "status", children: l$(e, a) });
}
function Jn(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function m2({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: o }) {
  const i = _(null), [s, c] = g(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ l("div", { className: oe.upload, children: [
    /* @__PURE__ */ n(r$, { current: e }),
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
      /* @__PURE__ */ n(b, { ...Jn(o), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...Jn(o), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(s$, { result: s, presentation: r })
  ] });
}
const c$ = "_row_o3t6y_7", d$ = "_cell_o3t6y_11", u$ = "_head_o3t6y_28", h$ = "_name_o3t6y_34", m$ = "_pinned_o3t6y_42", w$ = "_headCell_o3t6y_49", f$ = "_webName_o3t6y_88", _$ = "_webMeta_o3t6y_95", v$ = "_webWarn_o3t6y_103", O = {
  row: c$,
  cell: d$,
  head: u$,
  name: h$,
  pinned: m$,
  headCell: w$,
  webName: f$,
  webMeta: _$,
  webWarn: v$
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
], b$ = Object.fromEntries(Nr.map((e) => [e.key, e]));
function p$(e, t) {
  return `mcp.${e}.${t}`;
}
function g$(e) {
  return Object.keys(vn).includes(e);
}
function y$(e) {
  return vn[e !== void 0 && g$(e) ? e : "unknown"];
}
function rt({ column: e, children: t }) {
  const a = b$[e];
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
function w2() {
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
function N$({ server: e }) {
  const t = vn[e.connection];
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ l(rt, { column: "name", children: [
      /* @__PURE__ */ l("span", { className: O.head, children: [
        /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: fn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ l("span", { className: O.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(rt, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(rt, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(rt, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(rt, { column: "tools", children: e.tools.map((a) => p$(e.name, a)).join(" · ") })
  ] });
}
function k$(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function $$(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function C$({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${O.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e });
}
function S$({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function R$({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function T$({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ l("td", { className: O.cell, children: [
      /* @__PURE__ */ n("span", { className: `${O.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: k$(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...$$(e) }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(C$, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...y$(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: O.cell, children: [
      /* @__PURE__ */ n(S$, { server: e, onRestart: t }),
      /* @__PURE__ */ n(R$, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function f2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(T$, { ...e }) : /* @__PURE__ */ n(N$, { ...e });
}
const x$ = "_row_1ibo7_2", L$ = "_headCell_1ibo7_14", A$ = "_cell_1ibo7_15", E$ = "_name_1ibo7_26", I$ = "_consequence_1ibo7_32", M$ = "_reason_1ibo7_38", B$ = "_value_1ibo7_44", j$ = "_webRow_1ibo7_60", P$ = "_webSetting_1ibo7_73", q$ = "_webName_1ibo7_81", O$ = "_webConsequence_1ibo7_89", D$ = "_webControl_1ibo7_95", F$ = "_webState_1ibo7_109", H$ = "_webChip_1ibo7_114", j = {
  row: x$,
  headCell: L$,
  cell: A$,
  name: E$,
  consequence: I$,
  reason: M$,
  value: B$,
  webRow: j$,
  webSetting: P$,
  webName: q$,
  webConsequence: O$,
  webControl: D$,
  webState: F$,
  webChip: H$
}, kr = 104, $r = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function W$({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ve, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(Pa, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: j.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function z$({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = N(), i = $r[a], s = a === "locked";
  return /* @__PURE__ */ l("tr", { className: j.row, "data-inheritance": a, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: j.headCell, children: [
      /* @__PURE__ */ n("span", { className: j.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: j.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: j.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n(W$, { control: t, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: j.cell, style: { width: kr }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function Cr(e, t) {
  return String(e ?? t);
}
function K$(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function G$(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? Cr(e.value, "—");
}
function U$({ control: e, name: t, locked: a, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: j.webControl, children: [
    /* @__PURE__ */ n(Ve, { label: t, labelHidden: !0, checked: i, locked: a, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ n("span", { className: j.webState, "aria-hidden": "true", children: a || i ? "on" : "off" })
  ] });
}
function V$(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(U$, { ...e });
  const o = K$(t, a);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: j.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(Pa, { options: o, value: Cr(t.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${j.webControl} ${j.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: G$(t) });
}
function Y$({ setting: e, control: t, inheritance: a, reason: r, onChange: o, renderControl: i }) {
  const s = N(), c = a === "locked";
  return /* @__PURE__ */ l("div", { className: `${j.row} ${j.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ l("span", { className: j.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${j.name} ${j.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: s, className: `${j.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: j.webControl, children: i(s) }) : /* @__PURE__ */ n(V$, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${j.webChip} ward-policy-chip`, style: { width: kr }, children: /* @__PURE__ */ n(m, { ...$r[a], size: "tag" }) })
  ] });
}
function _2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Y$, { ...e }) : /* @__PURE__ */ n(z$, { ...e });
}
const J$ = "_label_h9m4w_7", Q$ = "_name_h9m4w_15", X$ = "_column_h9m4w_24", Z$ = "_webFrame_h9m4w_57", e0 = "_webHead_h9m4w_62", t0 = "_webHeadLabel_h9m4w_74", n0 = "_webLabel_h9m4w_117", a0 = "_webColumns_h9m4w_124", r0 = "_webGroup_h9m4w_130", o0 = "_webPeople_h9m4w_131", l0 = "_webVia_h9m4w_132", i0 = "_webMeta_h9m4w_161", G = {
  label: J$,
  name: Q$,
  column: X$,
  webFrame: Z$,
  webHead: e0,
  webHeadLabel: t0,
  webLabel: n0,
  webColumns: a0,
  webGroup: r0,
  webPeople: o0,
  webVia: l0,
  webMeta: i0
}, s0 = {
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
function c0(e) {
  if (!e.matrixRole) return;
  const t = s0[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function d0({ node: e }) {
  const t = c0(e);
  return /* @__PURE__ */ l("span", { className: G.label, children: [
    /* @__PURE__ */ n("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ n(u0, { role: t, node: e }),
    /* @__PURE__ */ n(Gt, { column: Kt[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Gt, { column: Kt[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Gt, { column: Kt[2], children: e.requestedVia ?? "" })
  ] });
}
function u0({ role: e, node: t }) {
  return /* @__PURE__ */ l(T, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function h0({ index: e, depth: t, node: a, expanded: r, leaf: o, onToggle: i, children: s }) {
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
      label: /* @__PURE__ */ n(d0, { node: a }),
      children: s
    }
  );
}
function Ut({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function m0({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Ut, { className: `${G.webMeta} ${G.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Ut, { className: `${G.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Ut, { className: `${G.webMeta} ${G.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function w0() {
  return /* @__PURE__ */ l("div", { className: G.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: G.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: G.webColumns, children: [
      /* @__PURE__ */ n("span", { className: G.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: G.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: G.webVia, children: "Requested via" })
    ] })
  ] });
}
function f0({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function _0(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function v0({ rows: e, label: t }) {
  return /* @__PURE__ */ l("div", { className: G.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(w0, {}),
    /* @__PURE__ */ n(Jm, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      za,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(f0, { row: a }),
        detail: /* @__PURE__ */ n(m0, { row: a }),
        expanded: _0(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function v2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(v0, { ...e }) : /* @__PURE__ */ n(h0, { ...e });
}
const b0 = "_runbook_b9agc_2", p0 = "_list_b9agc_7", g0 = "_step_b9agc_15", y0 = "_numeral_b9agc_21", N0 = "_body_b9agc_28", k0 = "_head_b9agc_34", $0 = "_title_b9agc_40", C0 = "_detail_b9agc_45", S0 = "_actions_b9agc_50", R0 = "_webList_b9agc_56", T0 = "_webStep_b9agc_60", x0 = "_webBody_b9agc_66", L0 = "_webTitle_b9agc_74", A0 = "_webDetail_b9agc_78", E = {
  runbook: b0,
  list: p0,
  step: g0,
  numeral: y0,
  body: N0,
  head: k0,
  title: $0,
  detail: C0,
  actions: S0,
  webList: R0,
  webStep: T0,
  webBody: x0,
  webTitle: L0,
  webDetail: A0
}, Sr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Rr(e) {
  return String(e + 1).padStart(2, "0");
}
function E0({ step: e, index: t, connection: a }) {
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
function I0({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: E.runbook, children: [
    /* @__PURE__ */ n("ol", { className: E.list, children: e.map((r, o) => /* @__PURE__ */ n(E0, { step: r, index: o, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: E.actions, children: t })
  ] });
}
function M0({ step: e, index: t, connection: a }) {
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
function B0({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: E.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${E.list} ${E.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(M0, { step: r, index: o, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${E.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function b2(e) {
  return "presentation" in e ? /* @__PURE__ */ n(B0, { ...e }) : /* @__PURE__ */ n(I0, { ...e });
}
const j0 = "_list_1gu6a_2", P0 = "_check_1gu6a_10", q0 = "_body_1gu6a_16", O0 = "_text_1gu6a_23", D0 = "_pending_1gu6a_32", F0 = "_measured_1gu6a_37", Ze = {
  list: j0,
  check: P0,
  body: q0,
  text: O0,
  pending: D0,
  measured: F0
};
function H0(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function W0({ check: e }) {
  const t = H0(e.passed);
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
function p2({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Ze.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(W0, { check: t }, t.text)) });
}
const z0 = "_root_4aacj_2", K0 = "_list_4aacj_10", G0 = "_line_4aacj_26", U0 = "_at_4aacj_53", V0 = "_text_4aacj_57", Y0 = "_foot_4aacj_61", J0 = "_idle_4aacj_73", Q0 = "_caret_4aacj_81", X0 = "_jump_4aacj_88", ve = {
  root: z0,
  list: K0,
  line: G0,
  at: U0,
  text: V0,
  foot: Y0,
  idle: J0,
  caret: Q0,
  jump: X0
}, Z0 = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function bn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : Z0.format(new Date(e));
}
const eC = { warn: "warning", ok: "ok" };
function tC({ kind: e }) {
  const t = eC[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function nC({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${bn(e)}` });
}
function aC({ connection: e, idleSince: t, last: a, children: r }) {
  const o = [t, a == null ? void 0 : a.at, ""].find(Boolean), i = {
    stale: `no new events as of ${bn(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${ve.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ve.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ve.idle, children: i }),
    /* @__PURE__ */ n(nC, { at: a == null ? void 0 : a.at }),
    r
  ] });
}
const rC = 8;
function oC(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > rC;
}
function lC({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const Tr = Ne(null);
function g2({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, o] = g(!1), i = ta(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(Tr.Provider, { value: i, children: a });
}
function iC() {
  const e = ye(Tr), [t, a] = g(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
function y2({ lines: e, connection: t, idleSince: a, label: r = "Live activity" }) {
  const o = _(null), [i, s] = g(0), [c, d] = iC(), [u, h] = g(!1), w = e.at(-1);
  C(() => {
    s(e.length);
  }, [e.length]), tt(() => {
    const p = o.current;
    p && !u && (p.scrollTop = p.scrollHeight);
  }, [e.length, u]);
  const f = () => {
    var M;
    const p = o.current;
    if (!p) return;
    const A = p.querySelectorAll("[data-consline-text]");
    (M = A.item(A.length - 1)) == null || M.focus(), h(!1);
  };
  return /* @__PURE__ */ l("div", { className: ve.root, children: [
    /* @__PURE__ */ n("ol", { className: ve.list, ref: o, "aria-live": c ? "polite" : "off", "aria-label": r, "data-empty": e.length === 0 || void 0, onScroll: (p) => h(oC(p.currentTarget)), children: e.map((p, A) => /* @__PURE__ */ l("li", { className: `${ve.line} ward-consline ward-reveal ward-consline--${p.kind}`, "data-kind": p.kind, "data-revealed": A < i, children: [
      /* @__PURE__ */ n("span", { className: ve.at, children: bn(p.at) }),
      /* @__PURE__ */ n(tC, { kind: p.kind }),
      /* @__PURE__ */ n("span", { className: ve.text, "data-consline-text": !0, tabIndex: -1, children: p.text })
    ] }, `${p.at}-${A}`)) }),
    /* @__PURE__ */ l(aC, { connection: t, idleSince: a, last: w, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ n(lC, { shown: u, onJump: f })
    ] })
  ] });
}
const sC = "_row_1k8wl_2", cC = "_head_1k8wl_14", dC = "_author_1k8wl_20", uC = "_eta_1k8wl_25", hC = "_edited_1k8wl_26", mC = "_body_1k8wl_32", wC = "_reason_1k8wl_37", fC = "_actions_1k8wl_42", Ce = {
  row: sC,
  head: cC,
  author: dC,
  eta: uC,
  edited: hC,
  body: mC,
  reason: wC,
  actions: fC
}, _C = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function vC(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function bC({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
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
function pC({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Ce.reason, id: t, children: e })
  ] });
}
function gC(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function yC(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(bC, { ...e }) : /* @__PURE__ */ n(pC, { reason: e.unavailable, reasonId: e.unavailableId });
}
function N2(e) {
  const { comment: t } = e;
  gC(e);
  const a = N(), r = `${a}-unavailable`, o = _C[t.delivery];
  return /* @__PURE__ */ l("div", { className: `${Ce.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: Ce.head, children: [
      /* @__PURE__ */ n("span", { className: Ce.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: Ce.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Ce.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Ce.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Ce.reason, id: a, children: vC(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Ce.actions, children: /* @__PURE__ */ n(yC, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const NC = "_root_rvhdw_2", kC = "_attach_rvhdw_11", $C = "_actions_rvhdw_17", CC = "_reply_rvhdw_23", SC = "_replyField_rvhdw_28", RC = "_send_rvhdw_54", TC = "_sendIcon_rvhdw_65", xC = "_sendsAs_rvhdw_75", Oe = {
  root: NC,
  attach: kC,
  actions: $C,
  reply: CC,
  replyField: SC,
  send: RC,
  sendIcon: TC,
  sendsAs: xC
};
function xr({ value: e, onChange: t }) {
  const [a, r] = g("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function LC() {
  return /* @__PURE__ */ n("svg", { className: Oe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function AC(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function EC(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [o, i] = xr(e), s = N(), c = () => {
    o.trim() !== "" && r(a, o);
  }, d = (u) => {
    AC(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ l("div", { className: Oe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: Oe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ n(P, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: o, onChange: i, describedBy: s }),
      /* @__PURE__ */ l(b, { variant: "primary", className: Oe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ n(LC, {}),
        /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Oe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function k2(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(EC, { ...e }) : /* @__PURE__ */ n(IC, { ...e });
}
function IC(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: o, onPost: i, onDraft: s } = e, [c, d] = xr(e);
  return /* @__PURE__ */ l("div", { className: Oe.root, children: [
    /* @__PURE__ */ n(P, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ l("div", { className: Oe.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
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
      /* @__PURE__ */ n(b, { variant: "primary", onClick: () => i(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const MC = "_list_1yhks_2", BC = "_item_1yhks_6", jC = "_body_1yhks_22", PC = "_text_1yhks_28", qC = "_evidence_1yhks_37", OC = "_consequence_1yhks_49", DC = "_note_1yhks_54", Ue = {
  list: MC,
  item: BC,
  body: jC,
  text: PC,
  evidence: qC,
  consequence: OC,
  note: DC
};
function FC({ criterion: e }) {
  return /* @__PURE__ */ n(He, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Qn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function HC(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function WC({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Ue.body, children: [
    /* @__PURE__ */ n("span", { className: Ue.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(T, { children: [
      /* @__PURE__ */ n(Qn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Ue.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(T, { children: [
      /* @__PURE__ */ n(Qn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Ue.consequence, children: HC(e.why) })
    ] })
  ] });
}
function zC({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Ue.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(FC, { criterion: e }),
    /* @__PURE__ */ n(WC, { criterion: e })
  ] });
}
function $2({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(zC, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ n("p", { className: Ue.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const KC = "_list_dwhoz_2", GC = "_rung_dwhoz_6", UC = "_name_dwhoz_18", VC = "_actor_dwhoz_32", yt = {
  list: KC,
  rung: GC,
  name: UC,
  actor: VC
}, YC = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function JC({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = YC[e.state];
  return /* @__PURE__ */ l("li", { className: yt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: yt.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${yt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function C2({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${yt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(JC, { rung: t }, t.name)) });
}
const QC = "_sheet_pw37w_2", XC = "_title_pw37w_9", ZC = "_stage_pw37w_15", eS = "_effects_pw37w_20", tS = "_effect_pw37w_20", nS = "_numeral_pw37w_31", aS = "_effectText_pw37w_38", rS = "_refusals_pw37w_43", oS = "_reasons_pw37w_52", lS = "_reason_pw37w_52", iS = "_actions_pw37w_62", we = {
  sheet: QC,
  title: XC,
  stage: ZC,
  effects: eS,
  effect: tS,
  numeral: nS,
  effectText: aS,
  refusals: rS,
  reasons: oS,
  reason: lS,
  actions: iS
};
function sS({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function S2({ run: e, effects: t, refusals: a, cost: r, onRequeue: o, onClose: i, returnFocusTo: s }) {
  const c = N(), d = `${c}-refusal`, [u, h] = g(""), w = a.length > 0;
  return /* @__PURE__ */ n(at, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ l("div", { className: we.sheet, children: [
    /* @__PURE__ */ l("h2", { className: we.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: we.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: we.effects, children: t.map((f, p) => /* @__PURE__ */ l("li", { className: we.effect, children: [
      /* @__PURE__ */ n("span", { className: we.numeral, children: String(p + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: we.effectText, children: f })
    ] }, f)) }),
    /* @__PURE__ */ n(
      Ih,
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
      /* @__PURE__ */ n("ul", { className: we.reasons, children: a.map((f, p) => /* @__PURE__ */ n("li", { className: we.reason, id: p === 0 ? d : void 0, children: f.reason }, f.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: we.actions, children: [
      /* @__PURE__ */ n(sS, { refused: w, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ n(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const cS = "_list_1laeg_2", dS = "_path_1laeg_7", uS = "_head_1laeg_21", hS = "_label_1laeg_28", mS = "_consequence_1laeg_35", ot = {
  list: cS,
  path: dS,
  head: uS,
  label: hS,
  consequence: mS
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
function wS({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: Zn(t), size: "sm", onClick: () => a(e.kind), children: Zt[e.kind] }) : /* @__PURE__ */ n(b, { variant: Zn(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: Zt[e.kind] });
}
function fS({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: ot.path, "data-allowed": e.allowed, "data-role": Xn(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: ot.head, children: [
      /* @__PURE__ */ n("span", { className: ot.label, children: e.title ?? Zt[e.kind] }),
      /* @__PURE__ */ n(m, { role: Xn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: ot.consequence, children: e.consequence }),
    /* @__PURE__ */ n(wS, { path: e, primary: t, onChoose: a })
  ] });
}
function R2({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: ot.list, children: e.map((a, r) => /* @__PURE__ */ n(fS, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const _S = "_list_1m7i0_2", vS = "_item_1m7i0_6", bS = "_node_1m7i0_18", pS = "_body_1m7i0_24", gS = "_head_1m7i0_30", yS = "_stage_1m7i0_36", NS = "_version_1m7i0_41", kS = "_sentence_1m7i0_49", $S = "_meta_1m7i0_54", Re = {
  list: _S,
  item: vS,
  node: bS,
  body: pS,
  head: gS,
  stage: yS,
  version: NS,
  sentence: kS,
  meta: $S
}, CS = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function SS({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: Re.head, children: [
    /* @__PURE__ */ n("span", { className: Re.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Re.version, title: e.version, children: e.version }) : null
  ] });
}
function RS({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${Re.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Re.node} ward-history-node`, children: /* @__PURE__ */ n(He, { size: 9, kind: CS[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${Re.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(SS, { entry: e }),
      /* @__PURE__ */ n("span", { className: Re.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${Re.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function T2({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Re.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(RS, { entry: t }, t.stage + String(a))) });
}
const TS = "_thread_1e70p_3", xS = "_turn_1e70p_8", LS = "_who_1e70p_27", AS = "_body_1e70p_32", Nt = {
  thread: TS,
  turn: xS,
  who: LS,
  body: AS
}, Lr = Ne(!1);
function x2({ children: e, density: t }) {
  return /* @__PURE__ */ n(Lr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${Nt.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function L2({ turn: e }) {
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
const ES = "_list_yiolt_3", IS = "_row_yiolt_7", MS = "_label_yiolt_20", BS = "_n_yiolt_26", jS = "_cause_yiolt_33", it = {
  list: ES,
  row: IS,
  label: MS,
  n: BS,
  cause: jS
};
function PS(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const qS = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function OS({ row: e, formatNumber: t }) {
  return PS(e), /* @__PURE__ */ l("li", { className: `${it.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(He, { size: 8, ...qS[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: it.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${it.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(DS, { cause: e.cause })
  ] });
}
function DS({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${it.cause} ward-healthrow-cause`, children: e }) : null;
}
function A2({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${it.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(OS, { row: a, formatNumber: t }, a.label)) });
}
const FS = "_root_1jxwp_2", HS = {
  root: FS
};
function E2({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: HS.root, "data-density": o, children: [
    /* @__PURE__ */ n(Ot, { items: e, note: t, density: o }),
    /* @__PURE__ */ n(b, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const WS = "_row_dhbre_3", zS = "_key_dhbre_13", KS = "_stack_dhbre_24", GS = "_value_dhbre_32", US = "_evidence_dhbre_39", VS = "_mark_dhbre_47", Xe = {
  row: WS,
  key: zS,
  stack: KS,
  value: GS,
  evidence: US,
  mark: VS
};
function YS({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(cn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function I2({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(YS, { state: e.state }) })
  ] });
}
const JS = "_cell_gh2sd_2", QS = {
  cell: JS
}, XS = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function ZS(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function eR(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function tR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: ZS(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function nR(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function M2({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  eR(e, a);
  const r = nR(e);
  return /* @__PURE__ */ n(
    Uh,
    {
      label: "Rejection routing",
      columns: XS,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: QS.cell, "data-norerun": o.noRerun ? !0 : void 0, children: tR(o, i) }),
      empty: t ?? /* @__PURE__ */ n(jw, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const aR = "_row_1f2re_2", rR = "_title_1f2re_12", oR = "_turns_1f2re_18", lR = "_waiting_1f2re_19", iR = "_resolved_1f2re_20", sR = "_activity_1f2re_21", cR = "_cost_1f2re_28", dR = "_link_1f2re_29", uR = "_tableLink_1f2re_47", hR = "_tableRecord_1f2re_48", mR = "_tableRow_1f2re_59", wR = "_tableTitle_1f2re_71", fR = "_tableResolved_1f2re_76", _R = "_tableMeta_1f2re_87", vR = "_tableCost_1f2re_94", bR = "_tableActivity_1f2re_95", pR = "_tableState_1f2re_105", F = {
  row: aR,
  title: rR,
  turns: oR,
  waiting: lR,
  resolved: iR,
  activity: sR,
  cost: cR,
  link: dR,
  tableLink: uR,
  tableRecord: hR,
  tableRow: mR,
  tableTitle: wR,
  tableResolved: fR,
  tableMeta: _R,
  tableCost: vR,
  tableActivity: bR,
  tableState: pR
}, Ar = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function gR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function yR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function NR(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const kR = { duplicate: "Closed · duplicate" };
function $R({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(nt, { className: F.tableMeta, text: `waiting on ${e}` });
}
function CR({ value: e }) {
  return /* @__PURE__ */ n("td", { className: F.tableCost, children: e === void 0 ? null : le(e) });
}
function SR({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${F.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function RR({ session: e, href: t }) {
  const a = Ar[e.state];
  return /* @__PURE__ */ l("tr", { className: F.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: F.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${F.tableLink} ward-target`, href: W(t), children: /* @__PURE__ */ n(nt, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: F.tableMeta, children: yR(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: F.tableResolved, children: [
      NR(e.resolved),
      /* @__PURE__ */ n($R, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(CR, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: F.tableActivity, children: gR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: F.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: kR[e.state] ?? a.label }),
      /* @__PURE__ */ n(SR, { link: e.link })
    ] }) })
  ] });
}
function TR({ session: e }) {
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
function B2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(RR, { session: e.session, href: e.href }) : /* @__PURE__ */ n(TR, { session: e.session });
}
const xR = "_block_1yy2v_3", LR = "_list_1yy2v_9", AR = "_line_1yy2v_14", en = {
  block: xR,
  list: LR,
  line: AR
}, ER = { warn: "warning", ok: "ok" };
function IR({ kind: e }) {
  const t = ER[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function MR({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${en.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(IR, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function j2({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${en.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: en.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(MR, { line: a }, `${r}-${a.text}`)) }) });
}
const BR = "_band_tt7hp_1", jR = "_head_tt7hp_8", PR = "_cell_tt7hp_19", qR = "_index_tt7hp_35", OR = "_title_tt7hp_42", DR = "_note_tt7hp_48", FR = "_cellTitle_tt7hp_53", HR = "_cellBody_tt7hp_58", WR = "_tag_tt7hp_64", $e = {
  band: BR,
  head: jR,
  cell: PR,
  index: qR,
  title: OR,
  note: DR,
  cellTitle: FR,
  cellBody: HR,
  tag: WR
}, ea = 4;
function P2({ index: e, title: t, note: a, cells: r }) {
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
  eT as ACCENT_PRESETS,
  yT as ActionStack,
  y2 as ActivityConsole,
  sT as AdminIcon,
  Zv as AgentCard,
  dT as AppShell,
  o2 as AppearanceStrip,
  P2 as Band,
  bT as BarChart,
  bf as BoardColumn,
  qT as BoardFootnote,
  OT as BoardHeader,
  lT as BoardIcon,
  xT as BoardScroller,
  b as Btn,
  ZR as CHIP_ROLES,
  _r as CREDENTIAL_COLUMNS,
  vT as Callout,
  l2 as CapabilityRow,
  AT as CardGrid,
  L2 as ChatMessage,
  fa as Checkbox,
  m as Chip,
  nt as ClampText,
  N2 as ClarificationRow,
  YT as ClauseRuleRow,
  VT as ClauseRules,
  Ja as ColourLadder,
  i2 as ComponentRow,
  k2 as Composer,
  FT as ConfigRow,
  DT as ConfigRowHead,
  dn as ConnectionMark,
  g2 as ConsoleAnnounceProvider,
  x2 as Conversation,
  Ih as CostMeter,
  c2 as CredentialRow,
  s2 as CredentialRowHead,
  $2 as CriteriaList,
  as as Crumb,
  tT as DENSITIES,
  A2 as DeliveryHealth,
  IT as DeniedState,
  rT as DisabledScope,
  QT as DryRunRail,
  jw as EmptyState,
  d2 as EnvCard,
  P as Field,
  ET as FilteredEmpty,
  RT as FormStack,
  Ot as GateChecklist,
  C2 as GateLadder,
  Uh as Grid,
  ZT as HandoffRuleRow,
  XT as HandoffRules,
  oT as HomeIcon,
  HT as ItemDrawer,
  u2 as KeyPanel,
  Xr as LIVE_EVENT_TYPES,
  yv as LegacyBoardColumn,
  zT as LegacyBoardHeader,
  KT as LegacyConfigRow,
  UT as LegacyItemDrawer,
  wv as LegacyOverCapNote,
  GT as LegacyPreviewRail,
  Ua as LegacyWorkCard,
  Le as LiveIndicator,
  MT as LoadFailed,
  PT as Loading,
  Nr as MCP_SERVER_COLUMNS,
  cn as Mark,
  m2 as MarkUpload,
  He as Marker,
  f2 as McpServerRow,
  w2 as McpServerRowHead,
  xa as Menu,
  Sa as MenuButton,
  e2 as NewStreamModal,
  Dw as OverCapNote,
  on as OverflowRow,
  at as Overlay,
  JT as PARTIAL_STEP_REASON,
  kr as POLICY_CHIP_WIDTH,
  $T as PageFrame,
  _T as PageHeader,
  pT as PlainList,
  _2 as PolicyRow,
  WT as PreviewRail,
  Kt as ROLE_MATRIX_COLUMNS,
  sr as RULE_ACTIONS,
  Oa as Radio,
  E2 as ReadyChecklist,
  ST as RecordSection,
  S2 as RequeueSheet,
  R2 as ResolveBlock,
  I2 as ResolvedFieldRow,
  v2 as RoleMatrixRow,
  M2 as RoutingTable,
  t2 as RuleRow,
  b2 as RunbookSteps,
  Qr as STREAM_STEPS,
  TT as SectionBand,
  Pn as SectionHeader,
  Pa as SegmentedControl,
  ka as Select,
  B2 as SessionRow,
  mT as Sidebar,
  cT as SidebarFoldButton,
  n2 as StageColumn,
  LT as StageGrid,
  T2 as StageHistory,
  Mg as StageListEditor,
  BT as StaleStrip,
  jt as StatStrip,
  NT as StatTiles,
  fT as StreamAvatar,
  a2 as StreamRow,
  iT as StudioIcon,
  CT as SubjectRail,
  Ve as Switch,
  hT as TabLinks,
  gT as TableHead,
  uT as Tabs,
  YR as ThemeProvider,
  r2 as ToolRow,
  kT as TopBar,
  Jm as Tree,
  za as TreeRow,
  j2 as TypedInputBlock,
  Hl as UNSAFE_HREF,
  p2 as ValidationList,
  UR as VisibilityProvider,
  VR as Visible,
  XR as WARD_VERSION,
  qt as WorkCard,
  jT as WriteUnavailableStrip,
  gR as agoSince,
  qr as clock,
  Qg as colourStatus,
  ae as count,
  ue as duration,
  tn as elapsed,
  QR as eventSourceTransport,
  It as isStreamStep,
  dt as isValidatedStreamStep,
  xb as ladderValidation,
  y$ as mcpConnectionChip,
  p$ as mcpToolName,
  le as money,
  be as ms,
  Ka as ordered,
  ra as ratio,
  F1 as restartLabel,
  W as safeHref,
  he as stamp,
  nn as stream,
  nT as streamChip,
  Bt as streamChipProps,
  ge as streamColour,
  to as streamHex,
  Ct as streamInitials,
  Zr as streamVars,
  wT as uniqueStreamInitials,
  pa as useAnchoredPanel,
  bt as useBorderFlash,
  Ae as useDisabledScope,
  Vr as useFocusTrap,
  aT as useLiveFeed,
  JR as useReturnFocus,
  Et as useRovingTabindex,
  an as useTicker,
  Or as useVisible,
  B as v,
  h2 as validateMark,
  mt as validatedStep,
  la as validatedStreamSteps
};
