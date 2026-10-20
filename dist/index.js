import { jsx as n, Fragment as x, jsxs as l } from "react/jsx-runtime";
import { useMemo as ma, useContext as ye, createContext as Ne, useState as p, useEffect as S, useCallback as te, useRef as _, useLayoutEffect as nt, useId as k, Fragment as wa, isValidElement as Kr, Children as Gr } from "react";
import { createPortal as Ur, flushSync as fa } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const xn = (e) => String(e).padStart(2, "0");
function un(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${xn(t % 60)}s` : `${Math.floor(a / 60)}h ${xn(a % 60)}m`;
}
const Vr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const t = Vr.formatToParts(new Date(e)), a = (r) => {
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
function _a(e, t) {
  return `${e} / ${t}`;
}
const Yr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Jr(e) {
  return Yr.format(new Date(e));
}
const va = Ne(/* @__PURE__ */ new Set());
function oT({ hidden: e, children: t }) {
  const a = ma(() => new Set(e), [e]);
  return /* @__PURE__ */ n(va.Provider, { value: a, children: t });
}
function Qr(e) {
  return !ye(va).has(e);
}
function lT({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: Qr(e) ? t : a });
}
const Xr = "(prefers-color-scheme: dark)";
function Ln() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Xr) : null;
}
function Zr(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = Ln()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? Ln() : null;
    if (!r) return;
    const o = () => a(r.matches);
    return o(), r.addEventListener("change", o), () => r.removeEventListener("change", o);
  }, [e]), t;
}
function Gt(e, t) {
  S(() => {
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function eo(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function iT({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const o = Zr(e === "system");
  return Gt("data-theme", eo(e, o)), Gt("data-accent", t), Gt("data-density", a), /* @__PURE__ */ n(x, { children: r });
}
const to = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function no(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function ao(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function ro(e, t, a, r) {
  return e.shiftKey ? no(t, a) ? r : void 0 : document.activeElement === r || ao(t) ? a : void 0;
}
function oo(e, t, a) {
  const r = a[0], o = a[a.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = ro(e, t, r, o);
  i && (e.preventDefault(), i.focus());
}
function lo(e) {
  return { onKeyDown: te(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(to));
      oo(a, e.current, r);
    },
    [e]
  ) };
}
function sT(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [t, e]);
}
const An = { ArrowUp: -1, ArrowDown: 1 }, En = { ArrowLeft: -1, ArrowRight: 1 }, io = (e, t, a) => Math.min(a, Math.max(t, e));
function so(e, t) {
  if (t !== "horizontal" && e in An) return An[e];
  if (t !== "vertical" && e in En) return En[e];
}
function qt({ orientation: e = "both" } = {}) {
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
      const w = Math.max(0, h.indexOf(t)), f = so(u.key, e);
      f !== void 0 ? (u.preventDefault(), s(h[io(w + f, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
const cT = (e, t, a) => {
  const r = new EventSource(e), o = (i) => a.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, dT = "0.2.0", uT = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], co = [1, 2, 3, 4, 5, 6], ba = [1, 2, 3], uo = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], hT = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], mT = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], j = {
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
    codeText: "var(--ward-type-codeText)"
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
function hn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Ot(e) {
  return co.includes(e);
}
function mt(e) {
  return ba.includes(e);
}
function ho(e) {
  if (!Ot(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function wT(e) {
  if (!Ot(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const mo = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function wo(e) {
  if (!Ot(e)) throw new Error("unvalidated stream step");
  return mo[e];
}
function In(e) {
  return typeof e != "string" ? null : uo.includes(e) ? e : null;
}
function fo(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function _o(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function vo(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function bo(e, t, a) {
  const r = fo(e);
  if (r === null) return null;
  const o = In(a) ?? In(r.type);
  return o === null ? null : { ...r, type: o, id: _o(r, t), at: vo(r) };
}
function po(e, t) {
  return e >= be.staleAfter ? "stale" : e >= be.heartbeat && t === "live" ? "reconnecting" : null;
}
function go(e, t, a) {
  return e >= be.heartbeat && !t && a !== null;
}
function fT(e, t) {
  const [a, r] = p("reconnecting"), [o, i] = p(null), s = _(/* @__PURE__ */ new Map()), c = _(0), d = _(""), u = _(0), h = _(null), w = _(0), f = _(0), y = _(!1), N = _("reconnecting"), A = te((T) => {
    N.current = T, r(T);
  }, []), O = te(() => {
    c.current = Date.now();
  }, []), me = te((T) => {
    for (const [J, ke] of s.current)
      (ke === "*" || T.itemKey === ke) && J(T);
  }, []), re = te(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (T, J, ke) => {
        const ze = bo(T, J, ke);
        ze !== null && (ze.id && (d.current = ze.id), O(), y.current = !1, A("live"), i(ze.at), me(ze));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, O(), A("live");
      },
      onError: () => {
        var J;
        (J = h.current) == null || J.close(), h.current = null, y.current = !0, N.current !== "stale" && A("reconnecting");
        const T = Math.min(be.reconnectBase * 2 ** u.current, be.reconnectMax);
        u.current += 1, w.current = window.setTimeout(re, T);
      }
    });
  }, [me, A, O, t, e]), Ee = te((T) => {
    y.current = !0, T.close(), h.current = null, w.current = window.setTimeout(re, be.reconnectBase);
  }, [re]), Ye = te((T, J) => (s.current.set(J, T), () => {
    s.current.delete(J);
  }), []);
  return S(() => (re(), f.current = window.setInterval(() => {
    const T = Date.now() - c.current, J = po(T, N.current);
    J && A(J);
    const ke = h.current;
    go(T, y.current, ke) && Ee(ke);
  }, be.tick), () => {
    var T;
    window.clearInterval(f.current), window.clearTimeout(w.current), y.current = !1, (T = h.current) == null || T.close(), h.current = null;
  }), [re, Ee, A]), { connection: a, lastEventAt: o, subscribe: Ye };
}
function mn(e, t) {
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
const yo = { blue: "running", orange: "waiting", green: "done" };
function No() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Mn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function $t(e, t) {
  const a = _(0), r = te((o) => {
    const i = o ?? t, s = e.current;
    s !== null && i !== void 0 && (No() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${yo[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => Mn(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => Mn(s), be.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (o) => r(o) : () => r(t);
}
const ko = "_root_1otpc_2", $o = {
  root: ko
};
function Co(e, t, a, r, o) {
  const i = [un(t)];
  return e || i.push(`as of ${Jr(a)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function Le({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const o = a !== "stale", i = mn(e, o), s = (t == null ? void 0 : t.at) ?? e, c = Co(o, i, s, r, t);
  return /* @__PURE__ */ l("span", { className: `${$o.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const So = "_app_1bnco_1", Ro = "_side_1bnco_35", To = "_sideTop_1bnco_46", xo = "_sideBody_1bnco_60", Lo = "_iconRail_1bnco_99", Ao = "_railItem_1bnco_108", Eo = "_railIcon_1bnco_129", Io = "_railDot_1bnco_134", Mo = "_railLetter_1bnco_140", Bo = "_main_1bnco_146", jo = "_rail_1bnco_108", Po = "_page_1bnco_168", qo = "_headerRow_1bnco_191", Oo = "_sidebarToggle_1bnco_198", Ho = "_headerSlot_1bnco_203", Do = "_headerAction_1bnco_208", Fo = "_drawerSide_1bnco_213", zo = "_root_1bnco_260", Wo = "_topbar_1bnco_267", Ko = "_mark_1bnco_278", Go = "_brand_1bnco_285", Uo = "_tagline_1bnco_291", Vo = "_identity_1bnco_297", Yo = "_tools_1bnco_298", Jo = "_nav_1bnco_308", Qo = "_metadata_1bnco_315", Xo = "_actor_1bnco_330", Zo = "_detail_1bnco_331", el = "_content_1bnco_376", tl = "_toolsPanel_1bnco_392", nl = "_skip_1bnco_418", C = {
  app: So,
  side: Ro,
  sideTop: To,
  sideBody: xo,
  iconRail: Lo,
  railItem: Ao,
  railIcon: Eo,
  railDot: Io,
  railLetter: Mo,
  main: Bo,
  rail: jo,
  page: Po,
  headerRow: qo,
  sidebarToggle: Oo,
  headerSlot: Ho,
  headerAction: Do,
  drawerSide: Fo,
  root: zo,
  topbar: Wo,
  mark: Ko,
  brand: Go,
  tagline: Uo,
  identity: Vo,
  tools: Yo,
  nav: Jo,
  metadata: Qo,
  actor: Xo,
  detail: Zo,
  content: el,
  toolsPanel: tl,
  skip: nl
};
function rt(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const al = "_scope_1an6i_2", rl = {
  scope: al
}, pa = Ne(null);
function _T({ reason: e, actions: t = "disable", children: a }) {
  const r = k();
  return /* @__PURE__ */ l("fieldset", { disabled: !0, className: `${rl.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(pa.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Ae() {
  return ye(pa);
}
function Ht(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : rt(e, t.reasonId);
}
const ol = "_btn_hrmlj_2", ll = "_primary_hrmlj_14", il = "_destructive_hrmlj_25", sl = "_secondary_hrmlj_35", cl = "_ghost_hrmlj_40", dl = "_overflow_hrmlj_49", ul = "_sm_hrmlj_56", hl = "_disabled_hrmlj_60", ml = "_withReason_hrmlj_68", wl = "_reason_hrmlj_74", tt = {
  btn: ol,
  primary: ll,
  destructive: il,
  secondary: sl,
  ghost: cl,
  overflow: dl,
  sm: ul,
  disabled: hl,
  withReason: ml,
  reason: wl
};
function fl(e, t, a, r) {
  const o = t === "sm" ? [tt.sm, "ward-btn--sm"] : [], i = a ? [tt.disabled] : [];
  return [tt.btn, tt[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function _l(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function vl(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function bl(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function pl(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function gl(e, t, a) {
  return pl(e.describedBy, t && a);
}
function yl({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${tt.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function Nl(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Ae()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(kl, { ...e });
}
function kl(e) {
  const t = Ae();
  vl(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", o = !!(e.disabled || t), i = bl(e, t), s = k(), c = $l(i, t);
  return /* @__PURE__ */ l(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: fl(a, r, o, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: o,
        title: i,
        "aria-describedby": gl(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ..._l(a, e.controls),
        children: Nl(e)
      }
    ),
    /* @__PURE__ */ n(yl, { id: s, reason: i, shown: c === ga })
  ] });
}
function $l(e, t) {
  return e && !t ? ga : wa;
}
function ga({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${tt.withReason} ward-btn-withReason`, children: e });
}
let wn = "none";
function Cl(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (wn = "key");
}
typeof document < "u" && (document.addEventListener("keydown", Cl, !0), document.addEventListener("pointerdown", () => {
  wn = "pointer";
}, !0));
function Sl() {
  return wn === "key";
}
function ut(e) {
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
const Rl = "_scrim_1cawq_2", Tl = "_drawer_1cawq_10", xl = "_sheet_1cawq_14", Ll = "_modal_1cawq_18", Al = "_panel_1cawq_23", El = "_start_1cawq_44", Il = "_header_1cawq_67", Ml = "_title_1cawq_75", Bl = "_body_1cawq_79", jl = "_close_1cawq_106", Te = {
  scrim: Rl,
  drawer: Tl,
  sheet: xl,
  modal: Ll,
  panel: Al,
  start: El,
  header: Il,
  title: Ml,
  body: Bl,
  close: jl
}, Pl = Ne(null), xt = [], Lt = /* @__PURE__ */ new Map();
function ql(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Ol(e, t) {
  let a = Lt.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, Lt.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function Hl(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !ql(r) && Ol(e, r);
}
function Dl(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (Hl(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function Fl(e) {
  for (const t of e.claims) {
    const a = Lt.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), Lt.delete(t)));
  }
}
function zl(e, t) {
  const a = { root: e, claims: [] };
  return xt.push(a), Dl(a, t), a;
}
function Wl(e) {
  const t = xt.indexOf(e);
  t >= 0 && xt.splice(t, 1), Fl(e);
}
function Bn(e) {
  return e !== null && xt.at(-1) === e;
}
function Kl(e, t, a) {
  const r = _(null), o = _(a);
  return o.current = a, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = zl(i, t);
    return r.current = c, () => {
      var u, h;
      const d = Bn(c);
      Wl(c), r.current = null, d && ((h = (u = o.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), te(() => Bn(r.current), []);
}
function Gl(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function Ul(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Vl({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("header", { className: `${Te.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Te.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Yl(e) {
  return `${Te.scrim} ${Te[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Jl(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Te.panel} ${Te[e]} ward-overlay-panel${a}${r}`;
}
function Ql(e) {
  const t = ye(Pl);
  return e ?? t ?? document.body;
}
function ot(e) {
  const t = _(null), a = _(null), r = k(), o = Ql(e.container), i = ut("(min-width: 768px)"), s = Gl(e.kind, i), c = Ul(e, r), d = lo(a), [u] = p(Sl), h = Kl(t, o, e.returnFocusTo), w = te(() => {
    h() && e.onClose();
  }, [e.onClose, h]);
  return S(() => {
    var f;
    h() && ((f = a.current) == null || f.focus());
  }, [h]), S(() => {
    const f = (y) => {
      y.key === "Escape" && w();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [w]), Ur(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: Yl(s),
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
            className: Jl(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => h() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Te.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Vl, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Xl = /^([a-z][a-z0-9+.-]*):/i, Zl = /* @__PURE__ */ new Set(["http", "https"]), ei = "#";
function ti(e) {
  var r, o;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (o = (r = Xl.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : o.toLowerCase();
}
function I(e) {
  const t = ti(e);
  return t === void 0 || Zl.has(t) ? e : ei;
}
function ni(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function ya(e) {
  const t = ni(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function ai(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => ya(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const o = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [a, ...a.children]) o == null || o.observe(i);
    return r(), () => {
      a.removeEventListener("scroll", r), o == null || o.disconnect();
    };
  }, [e, t]);
}
function ri(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, o = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : o > e.clientWidth - a ? e.scrollLeft + o - e.clientWidth + a : null;
}
function oi(e, t, a) {
  nt(() => {
    const r = e.current, o = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !o) return;
    const i = ri(r, o);
    i !== null && (r.scrollLeft = Math.max(0, i)), ya(r);
  }, [e, t, a]);
}
const li = "_row_11g8i_2", ii = {
  row: li
};
function si(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function fn({ label: e, children: t, count: a, as: r = "div", focusable: o = !0, rowRef: i, className: s, ...c }) {
  const d = _(null), u = i ?? d;
  return ai(u, a), /* @__PURE__ */ n(r, { ref: u, className: [ii.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...si(o, r), ...c, children: t });
}
const ci = "_icon_1ylqy_2", di = {
  icon: ci
};
function wt({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: di.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function vT() {
  return /* @__PURE__ */ n(wt, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function bT() {
  return /* @__PURE__ */ l(wt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function pT() {
  return /* @__PURE__ */ l(wt, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function gT() {
  return /* @__PURE__ */ n(wt, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function ui() {
  return /* @__PURE__ */ l(wt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const Na = "ward:sidebar-collapsed", hi = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function mi() {
  try {
    return window.localStorage.getItem(Na) === "true";
  } catch {
    return !1;
  }
}
function wi(e) {
  try {
    window.localStorage.setItem(Na, String(e));
  } catch {
  }
}
function fi(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function _i(e) {
  return e instanceof Element && e.closest(hi) !== null;
}
function vi(e) {
  return e.key === "[" && !fi(e) && !_i(e.target);
}
function bi(e) {
  const [t, a] = p(mi), r = () => {
    wi(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const o = (i) => {
      var c;
      if (!vi(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [e, t]), { collapsed: t, toggle: r };
}
function pi() {
  const e = ut("(max-width: 767.98px)"), t = ut("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function gi(e) {
  const t = e === "phone", a = k(), r = _(null), [o, i] = p(!1);
  return o && !t && i(!1), { narrow: t, open: o, drawerId: a, slotRef: r, toggle: () => i(!o), close: () => i(!1) };
}
function yi({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ l("div", { className: C.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: C.headerSlot, children: e }),
    Sa(t) && /* @__PURE__ */ n("span", { className: C.headerAction, children: t })
  ] }) : e;
}
function Ni(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function ki({ sidebar: e, label: t, drawer: a }) {
  var o;
  if (Ni(a.open, a.close), !a.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(ot, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (o = a.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ n("div", { className: C.drawerSide, onClick: r, children: ka(e, !1) }) });
}
function $i(e) {
  const [t, a] = p(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function Ci(e, t) {
  const a = bi(e === "wide" && !t), r = $i(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function Si(e, t) {
  const a = Ci(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return Ti(e.collapsed, t);
  const r = a.collapsed, o = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: o, drawsStrip: !o && typeof e.sidebar == "function", toggle: a.toggle };
}
const Ri = (e) => e.collapsed && e.drawsStrip;
function Ti(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const jn = (e) => e ? "" : void 0;
function ka(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function $a({ fold: e }) {
  return /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(ui, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function xi({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: C.sideTop, children: /* @__PURE__ */ n($a, { fold: e }) });
}
const Ca = Ne(null);
function yT() {
  const e = ye(Ca);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n($a, { fold: e });
}
function Li({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": hn(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Ai({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: C.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ l("a", { className: C.railItem, href: I(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(Li, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function Ei({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: o }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ l("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(xi, { fold: r, inSidebar: o && !i }),
    /* @__PURE__ */ n("div", { className: C.sideBody, hidden: i, children: ka(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(Ai, { items: a ?? [], label: t })
  ] });
}
const Sa = (e) => e != null;
function Ii(e) {
  const { sidebar: t, header: a, action: r, children: o, rail: i, iconRail: s, pageFill: c } = e, d = Sa(i), u = pi(), h = gi(u), w = Si(e, u), f = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ l("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": jn(Ri(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(Ca.Provider, { value: w, children: /* @__PURE__ */ n(Ei, { sidebar: t, label: f, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ l("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(yi, { header: a, action: r, label: f, drawer: h }),
      /* @__PURE__ */ n("div", { className: C.page, "data-fill": jn(c === !0), children: o })
    ] }),
    d && /* @__PURE__ */ n("div", { className: C.rail, children: i }),
    /* @__PURE__ */ n(ki, { sidebar: t, label: f, drawer: h })
  ] });
}
function Mi({ destinations: e, active: t }) {
  const a = _(null);
  return oi(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(fn, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: I(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function an({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function Bi({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ l("span", { className: C.metadata, children: [
    /* @__PURE__ */ n(an, { value: e, className: C.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(an, { value: t, className: C.detail })
  ] });
}
function ji() {
  const e = ut("(max-width: 767.98px)"), t = k(), a = _(null), [r, o] = p(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Pi({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: C.tools, children: e });
}
function qi({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: C.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function Oi(e) {
  return /* @__PURE__ */ l("header", { className: C.topbar, children: [
    /* @__PURE__ */ n("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(an, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ n(Mi, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: C.identity, children: /* @__PURE__ */ n(Bi, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Pi, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Hi(e) {
  const t = k(), a = ji();
  return /* @__PURE__ */ l("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: C.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Oi, { ...e, menu: a }),
    /* @__PURE__ */ n(qi, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: C.content, children: e.children })
  ] });
}
function Di(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function NT(e) {
  return Di(e) ? /* @__PURE__ */ n(Ii, { ...e }) : /* @__PURE__ */ n(Hi, { ...e });
}
const Fi = "_root_itg9o_2", zi = "_row_itg9o_8", Wi = "_box_itg9o_14", Ki = "_label_itg9o_21", Gi = "_labelHidden_itg9o_26", Ui = "_lockedNote_itg9o_36", Vi = "_consequence_itg9o_44", Yi = "_sample_itg9o_79", Be = {
  root: Fi,
  row: zi,
  box: Wi,
  label: Ki,
  labelHidden: Gi,
  lockedNote: Ui,
  consequence: Vi,
  sample: Yi
};
function Ji(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function Qi({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: t }) : null;
}
function Xi({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Zi(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function es(e, t, a, r) {
  const o = e.consequence ? `${t}-note` : void 0, i = Zi(e, a, r), s = i ? `${t}-reason` : void 0, c = Ht(rt(o, e.describedBy, s), r);
  return { noteId: o, reason: i, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? i } };
}
function ts({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function ns({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function Ra(e) {
  const t = k(), a = Ae(), r = Ji(e, a), o = es(e, t, r.disabled, a);
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
        /* @__PURE__ */ n(Xi, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(ns, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(ts, { id: o.reasonId, reason: o.reason }),
    /* @__PURE__ */ n(Qi, { id: o.noteId, text: e.consequence })
  ] });
}
const as = "_chip_pq6tb_2", rs = {
  chip: as
}, os = {
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
function ls(e, t) {
  if (e === "stream") return is(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = os[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function is(e) {
  if (!e || !mt(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = hn(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${rs.chip} ward-chip ward-chip--${e}`, style: ls(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const ss = "_clamp_zn74g_3", Pn = {
  clamp: ss
};
function at({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? Pn.clamp : `${Pn.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const cs = "_root_1btz3_2", ds = "_body_1btz3_10", us = "_toggle_1btz3_24", Ut = {
  root: cs,
  body: ds,
  toggle: us
};
function kT({ children: e, lines: t = 3, label: a }) {
  const [r, o] = p(!1), i = k();
  return /* @__PURE__ */ l("div", { className: Ut.root, children: [
    /* @__PURE__ */ n("div", { id: i, className: Ut.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: Ut.toggle, "aria-expanded": r, "aria-controls": i, onClick: () => o(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const hs = "_root_1a4s8_2", ms = "_words_1a4s8_16", ws = "_title_1a4s8_23", fs = "_actions_1a4s8_27", _t = {
  root: hs,
  words: ms,
  title: ws,
  actions: fs
};
function $T({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ l("section", { className: _t.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ l("div", { className: _t.words, children: [
      /* @__PURE__ */ n("strong", { className: _t.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: _t.actions, children: a })
  ] });
}
const _s = "_root_8zmpu_2", vs = "_step_8zmpu_12", bs = "_dot_8zmpu_38", ps = "_label_8zmpu_51", it = {
  root: _s,
  step: vs,
  dot: bs,
  label: ps
}, gs = { done: ", done", now: ", current", next: "" };
function ys({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ l("li", { className: it.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${it.dot} ward-running` : it.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: it.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: gs[e.state] })
  ] });
}
function CT({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: it.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(ys, { step: r, running: t }, r.label)) });
}
function ft(e) {
  return typeof e == "number" && mt(e) ? e : null;
}
function ge(e, t) {
  const a = ft(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function Dt(e, t) {
  const a = ft(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const Ns = "_root_13eei_3", ks = "_nav_13eei_8", $s = "_list_13eei_16", Cs = "_item_13eei_24", Ss = "_link_13eei_44", Rs = "_sep_13eei_54", Ts = "_current_13eei_58", xs = "_chips_13eei_62", Me = {
  root: Ns,
  nav: ks,
  list: $s,
  item: Cs,
  link: Ss,
  sep: Rs,
  current: Ts,
  chips: xs
};
function Ls({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: Me.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${Me.link} ward-target`, href: I(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function As({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: Me.root, children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ n("ol", { className: Me.list, children: e.map((r, o) => /* @__PURE__ */ l("li", { className: Me.item, children: [
      o > 0 ? /* @__PURE__ */ n("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(Ls, { step: r, isCurrent: a && o === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${Me.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function Ta(e, t, a) {
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
const Es = 500;
function xa(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function La() {
  const e = _(""), t = _(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, Es), e.current);
}
const vt = 4;
function Is(e, t, a) {
  const r = Math.max(0, a - e.bottom - vt * 2), o = Math.max(0, e.top - vt * 2);
  return t <= r || r >= o ? { top: e.bottom + vt, maxHeight: r } : { top: e.top - vt - Math.min(t, o), maxHeight: o };
}
function Ms(e, t, a, r) {
  const o = { start: e.left, end: e.right - t }, i = { start: o.start + t <= a, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, a - t));
}
function Bs(e, t, a, r) {
  return { ...Is(e, t.height, a.height), left: Ms(e, t.width, a.width, r) };
}
function Ct(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function js(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function Ps(e, t, a) {
  const r = js(t, a);
  e.style.setProperty("--ward-anchor-width", Ct(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const o = e.getBoundingClientRect(), i = document.documentElement;
  return { edges: r, box: o, view: { width: i.clientWidth, height: i.clientHeight } };
}
function qs(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, o) => r.scrollTop = a[o]);
}
function qn(e, t, a, r) {
  const o = qs(e), i = Ps(e, t, r), s = Bs(i.edges, i.box, i.view, a);
  Object.assign(e.style, { left: Ct(s.left - i.box.left), top: Ct(s.top - i.box.top), maxHeight: Ct(s.maxHeight) }), o();
}
function Os(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function Aa(e, t, a = "start", r) {
  nt(() => {
    const o = t.current, i = e.current;
    if (!o || !i) return;
    const s = Os(o), c = () => qn(o, i, a, r == null ? void 0 : r.current), d = (u) => {
      o.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), nt(() => {
    t.current && e.current && qn(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const Hs = "_root_1lgbn_2", Ds = "_trigger_1lgbn_7", Fs = "_value_1lgbn_47", zs = "_menu_1lgbn_65", Ws = "_find_1lgbn_87", Ks = "_list_1lgbn_103", Gs = "_option_1lgbn_114", Us = "_check_1lgbn_133", Vs = "_empty_1lgbn_144", pe = {
  root: Hs,
  trigger: Ds,
  value: Fs,
  menu: zs,
  find: Ws,
  list: Ks,
  option: Gs,
  check: Us,
  empty: Vs
}, Ys = 7;
function Js(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function On(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function Qs(e, t) {
  const [a, r] = p(e.defaultOpen === !0), [o, i] = p(""), [s, c] = p(() => On(e.options, e.value)), d = (u) => {
    var h;
    fa(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: o,
    active: s,
    entries: Js(e.options, o),
    findable: e.options.length > Ys,
    show: () => {
      e.disabled || (i(""), c(On(e.options, e.value)), r(!0));
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
function Xs(e, t) {
  const a = _(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function Zs(e) {
  const t = La();
  return (a) => {
    const r = t(a), o = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    o >= 0 && e.to(o);
  };
}
function Ea(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function ec(e) {
  return { ...Ea(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function Ia(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const o = t[r.key];
    if (!o) return a(r);
    r.preventDefault(), r.stopPropagation(), o();
  };
}
const tc = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function nc(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      tc.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function ac({ entry: e, at: t, menu: a, ids: r, value: o }) {
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
function _n(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function rc({ menu: e, ids: t, focusRef: a }) {
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
      "aria-activedescendant": _n(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: Ia(e, Ea(e), () => {
      })
    }
  );
}
function oc({ props: e, menu: t, ids: a, focusRef: r, trigger: o }) {
  const i = Zs(t), s = _(null);
  Aa(o, s);
  const c = (d) => {
    xa(d) && i(d.key);
  };
  return /* @__PURE__ */ l("div", { ref: s, className: pe.menu, children: [
    t.findable && /* @__PURE__ */ n(rc, { menu: t, ids: a, focusRef: r }),
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
        "aria-activedescendant": t.findable ? void 0 : _n(t, a),
        onKeyDown: Ia(t, ec(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(ac, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: pe.empty, children: "No match" })
  ] });
}
function lc(e, t) {
  const a = e.open ? _n(e, t) : void 0;
  S(() => {
    var r, o;
    a && ((o = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [a]);
}
function Ma(...e) {
  return e.filter(Boolean).join(" ");
}
function ic(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function sc({ props: e, menu: t, ids: a, trigger: r, wantFocus: o }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ae()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: Ma(pe.trigger, e.triggerClassName),
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
      ...nc(t, o),
      children: /* @__PURE__ */ n("span", { id: a.value, className: pe.value, "data-placeholder": i || void 0, children: ic(e) })
    }
  );
}
function Ba(e) {
  const t = Ae(), a = t ? { ...e, disabled: !0, "aria-describedby": Ht(e["aria-describedby"], t) } : e, r = k(), o = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = _(null), s = _(null), c = _(null), d = Qs(a, s), u = Xs(d.open, c);
  return Ta(d.open, i, () => d.close(!1)), lc(d, o), /* @__PURE__ */ l("div", { ref: i, className: Ma(pe.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(sc, { props: a, menu: d, ids: o, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(oc, { props: a, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const cc = "_field_1ensj_2", dc = "_label_1ensj_8", uc = "_labelHidden_1ensj_15", hc = "_control_1ensj_25", mc = "_mono_1ensj_45", wc = "_area_1ensj_50", fc = "_invalid_1ensj_57", He = {
  field: cc,
  label: dc,
  labelHidden: uc,
  control: hc,
  mono: mc,
  area: wc,
  invalid: fc
}, _c = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, ja = (e) => `${e}-label`;
function vc({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? _c : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function bc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    Ba,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": ja(t.id),
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
function pc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
const gc = { input: vc, select: bc, textarea: pc };
function yc(e, t, a) {
  const r = gc[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function Nc(e, t, a, r) {
  const o = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": o,
    "aria-describedby": Ht(rt(o ? a : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function kc(e) {
  const t = e.mono ? [He.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [He.area] : [];
  return [He.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function $c(e) {
  return e ? `${He.label} ${He.labelHidden} ward-field-label` : `${He.label} ward-field-label`;
}
function q(e) {
  const t = k(), a = `${t}-msg`, r = Nc(e, t, a, Ae()), o = kc(e);
  return /* @__PURE__ */ l("div", { className: `${He.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: ja(t), className: $c(e.labelHidden), htmlFor: t, children: e.label }),
    yc(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${He.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Cc = "_root_sjvm0_2", Sc = "_trigger_sjvm0_9", Rc = "_ghost_sjvm0_27", Tc = "_panel_sjvm0_46", xc = "_edged_sjvm0_67", Lc = "_menu_sjvm0_73", Ac = "_group_sjvm0_78", Ec = "_heading_sjvm0_83", Ic = "_item_sjvm0_89", Mc = "_description_sjvm0_105", Bc = "_large_sjvm0_109", jc = "_touch_sjvm0_113", Pc = "_icon_sjvm0_117", qc = "_label_sjvm0_125", Oc = "_text_sjvm0_130", Hc = "_trailing_sjvm0_138", Dc = "_check_sjvm0_144", Fc = "_separator_sjvm0_183", zc = "_footer_sjvm0_189", Wc = "_find_sjvm0_196", Kc = "_findGlyph_sjvm0_208", Gc = "_findInput_sjvm0_214", Uc = "_empty_sjvm0_230", L = {
  root: Cc,
  trigger: Sc,
  ghost: Rc,
  panel: Tc,
  edged: xc,
  menu: Lc,
  group: Ac,
  heading: Ec,
  item: Ic,
  description: Mc,
  large: Bc,
  touch: jc,
  icon: Pc,
  label: qc,
  text: Oc,
  trailing: Hc,
  check: Dc,
  separator: Fc,
  footer: zc,
  find: Wc,
  findGlyph: Kc,
  findInput: Gc,
  empty: Uc
}, Pa = Ne(null);
function Vc(e, t) {
  const [a, r] = p({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (o) => r((i) => ({ open: !0, start: o, request: i.request + 1 })),
    close: (o) => {
      var i;
      fa(() => r((s) => ({ ...s, open: !1 }))), o && ((i = t.current) == null || i.focus());
    }
  };
}
const Yc = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Jc(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = Yc.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function vn(...e) {
  return e.filter(Boolean).join(" ");
}
function Qc(e, t = {}, a = "field") {
  const { ref: r, className: o, ...i } = t;
  return { ...i, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: vn(L.trigger, a === "ghost" ? L.ghost : void 0, o) };
}
function qa(e) {
  const t = k(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = _(null), o = _(null), i = Vc(e.defaultOpen === !0, o);
  return Ta(i.open, r, () => i.close(!1)), /* @__PURE__ */ l("div", { ref: r, className: vn(L.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...Qc(o, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Jc(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(Pa.Provider, { value: { ...a, popup: i, button: o }, children: e.children })
  ] });
}
function Xc(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function Zc(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const ed = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function td(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function nd(e, t) {
  return e === "separator" ? e : "items" in e ? td(e, t) : t(e) ? e : null;
}
function ad(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function rd(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (o) => o.label.toLowerCase().includes(a);
  return ad(e.map((o) => nd(o, r)).filter((o) => o !== null));
}
const Oa = (e, t) => (e % t + t) % t;
function Pe(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const o = Oa(t + a * r, e.length);
    if (!e[o].disabled) return o;
  }
  return -1;
}
const od = (e) => e.split("").every((t) => t === e[0]);
function ld(e, t, a) {
  const r = od(a), o = r ? a[0] : a, i = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = Oa(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function id(e) {
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
function sd(e, t) {
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
function cd(e, t, a) {
  const r = La(), o = sd(e, t), i = (s) => {
    if (xa(s)) {
      if (!a) return e.focus(ld(e.items, e.current(), r(s.key)));
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
function dd(e) {
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
function ud(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? Pe(e, -1, 1) : t;
}
function hd(e, t) {
  const { start: a, request: r } = t, o = _(e);
  o.current = e, S(() => {
    const { items: i, focus: s } = o.current;
    a && s(a === "first" ? ud(i) : Pe(i, i.length, -1));
  }, [a, r]);
}
function md({ row: e, nav: t, popup: a }) {
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
const wd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function fd(e, t) {
  return wd(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function _d(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: L.label, children: e.label });
  return e.description ? /* @__PURE__ */ l("span", { className: L.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: L.description, children: e.description })
  ] }) : a;
}
function vd() {
  return /* @__PURE__ */ n("svg", { className: L.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Hn(e, t) {
  return /* @__PURE__ */ l(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: L.icon, "aria-hidden": "true", children: e.icon }) : null,
    _d(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: L.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(vd, {}) : null
  ] });
}
function Ha(e) {
  const { item: t, at: a } = e.row, r = k(), o = {
    ref: (i) => {
      e.nav.refs.current[a] = i;
    },
    role: "menuitem",
    tabIndex: -1,
    className: L.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...fd(t, r),
    ...md(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: I(t.href), ...o, children: Hn(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...o, children: Hn(t, r) });
}
function bd({ heading: e, rows: t, nav: a, popup: r }) {
  const o = k();
  return /* @__PURE__ */ l("div", { role: "group", "aria-labelledby": o, className: L.group, children: [
    /* @__PURE__ */ n("div", { id: o, className: L.heading, children: e }),
    t.map((i) => /* @__PURE__ */ n(Ha, { row: i, nav: a, popup: r }, i.at))
  ] });
}
function pd({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: L.separator }) : e.kind === "group" ? /* @__PURE__ */ n(bd, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(Ha, { row: e.row, nav: t, popup: a });
}
function gd() {
  const e = ye(Pa);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function yd() {
  return /* @__PURE__ */ l("svg", { className: L.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function Nd(e, t) {
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
function kd({ find: e, query: t, setQuery: a, input: r, nav: o, popup: i, menuId: s }) {
  const c = Nd(o, i), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ l("div", { className: L.find, children: [
    /* @__PURE__ */ n(yd, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: L.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function $d(e, t) {
  const [a, r] = p(""), o = _(null), i = t !== void 0 && ed(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = o.current) == null || d.focus();
  };
  return i ? { find: t, query: a, setQuery: r, input: o, toFind: s, entries: rd(e, a) } : { query: a, setQuery: r, input: o, entries: e };
}
const Cd = { regular: void 0, large: L.large, touch: L.touch }, Sd = (e, t) => vn(L.panel, e ? L.edged : void 0, Cd[t]);
function Rd({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: L.empty, children: e.empty ?? "No matches" });
}
function Da({ entries: e, footer: t, align: a = "start", find: r, edges: o, size: i = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = gd(), h = _(null);
  Aa(u, h, a, o);
  const w = $d(e, r), f = Xc(w.entries), y = id(f.flatMap(Zc).map((O) => O.item)), N = cd(y, s, w.toFind), A = dd(s);
  return hd(y, s), /* @__PURE__ */ l("div", { ref: h, className: Sd(o, i), ...A, children: [
    w.find && /* @__PURE__ */ n(kd, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: y, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: L.menu, ...N, children: f.map((O, me) => /* @__PURE__ */ n(pd, { block: O, nav: y, popup: s }, me)) }),
    /* @__PURE__ */ n(Rd, { find: w.find, count: y.items.length }),
    t && /* @__PURE__ */ n("p", { className: L.footer, children: t })
  ] });
}
function Td(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function Fa(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !Td(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const xd = (e, t) => e.reduce((a, r) => a + r + t, -t);
function Ld({ room: e, widths: t, more: a, gap: r }, o) {
  const i = t.map((d, u) => u);
  if (xd(t, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([o]);
  let c = t[o] + r + a;
  for (const d of i)
    if (d !== o) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Vt = (e) => Number.parseFloat(e) || 0, Dn = (e) => e.getBoundingClientRect().width;
function Ad(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Vt(a.paddingInlineStart) - Vt(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), Dn),
    more: r ? Dn(r) : 0,
    gap: Vt(a.columnGap)
  };
}
function Ed(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const Id = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function za(e, t, a, r = ':scope > [role="tab"]') {
  const [o, i] = p(null);
  return nt(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = Ad(s, r);
      i((u) => Id(u, d) ? u : d);
    };
    return c(), Ed(s, c);
  }, [e, a, r]), o && Ld(o, t);
}
const Md = "_strip_1zvzj_2", Bd = "_fits_1zvzj_19", jd = "_probe_1zvzj_27", Pd = "_moreRoot_1zvzj_36", qd = "_more_1zvzj_36", Od = "_tab_1zvzj_55", Hd = "_count_1zvzj_91", Dd = "_badge_1zvzj_97", Y = {
  strip: Md,
  fits: Bd,
  probe: jd,
  moreRoot: Pd,
  more: qd,
  tab: Od,
  count: Hd,
  badge: Dd
}, Wa = "More";
function Fd(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const Fn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, bn = (e) => e.badge === void 0 ? Fn(e) : `${Fn(e)}, ${e.badge}`;
function Ka(e) {
  return `${Y.strip} ward-tabs ward-tabs--${e}`;
}
const zd = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Wd({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ l(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${Y.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : bn(e),
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
function Kd(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((i) => i.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Gd({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(qa, { label: Wa, className: Y.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: Y.more }, children: /* @__PURE__ */ n(Da, { align: "end", entries: e.map((r) => ({ label: bn(r), onSelect: () => a(r.id) })) }) });
}
function Ud(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : zd;
}
function ST({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: o }) {
  const i = qt({ orientation: "horizontal" }), s = Fd(e, t);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = _(null);
  Fa(c, o);
  const d = za(c, s, e.map(bn).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ l("div", { ref: c, className: `${Ka(o)} ${Y.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(Wd, { tab: h, active: t, place: Ud(i, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${Y.more} ${Y.probe}`, children: Wa }),
    u.length > 0 && /* @__PURE__ */ n(Gd, { tabs: u, trigger: i.itemProps(e.length), onPick: Kd(c, a) })
  ] });
}
const zn = 7, Ga = "More", Vd = ":scope > a", Ua = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Yd = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Jd(e, t) {
  return !e || e.includes(t) ? {} : Yd;
}
function Qd({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, className: `${Y.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ l(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
    ] })
  ] });
}
function Xd({ links: e }) {
  return /* @__PURE__ */ n(qa, { label: Ga, className: Y.moreRoot, trigger: { className: Y.more }, children: /* @__PURE__ */ n(Da, { align: "end", entries: e.map((t) => ({ label: Ua(t), href: t.href })) }) });
}
function RT({ links: e, active: t, label: a, level: r }) {
  if (e.length > zn) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${zn} — the set is fixed`);
  const o = _(null);
  Fa(o, r);
  const i = Math.max(0, e.findIndex((d) => d.id === t)), s = za(o, i, e.map(Ua).join(`
`), Vd), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ l("nav", { ref: o, className: `${Ka(r)} ${Y.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(Qd, { link: d, current: d.id === t, place: Jd(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${Y.more} ${Y.probe}`, children: Ga }),
    c.length > 0 && /* @__PURE__ */ n(Xd, { links: c })
  ] });
}
const Zd = "_root_v56ff_3", eu = "_segment_v56ff_9", Wn = {
  root: Zd,
  segment: eu
};
function Va({ options: e, value: t, onChange: a, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = qt({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${Wn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: Wn.segment,
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
const tu = "_sidebar_s9o1j_3", nu = "_brand_s9o1j_9", au = "_mark_s9o1j_17", ru = "_word_s9o1j_24", ou = "_nav_s9o1j_30", lu = "_navItem_s9o1j_39", iu = "_footLink_s9o1j_49", su = "_group_s9o1j_58", cu = "_groupName_s9o1j_65", du = "_agents_s9o1j_81", uu = "_agent_s9o1j_81", hu = "_root_s9o1j_96", mu = "_agentTop_s9o1j_105", wu = "_dot_s9o1j_112", fu = "_agentName_s9o1j_124", _u = "_agentMeta_s9o1j_138", vu = "_foot_s9o1j_49", bu = "_footName_s9o1j_150", pu = "_footLinks_s9o1j_157", gu = "_linkBrand_s9o1j_184", yu = "_label_s9o1j_205", Nu = "_note_s9o1j_210", ku = "_footer_s9o1j_226", E = {
  sidebar: tu,
  brand: nu,
  mark: au,
  word: ru,
  nav: ou,
  navItem: lu,
  new: "_new_s9o1j_48",
  footLink: iu,
  group: su,
  groupName: cu,
  agents: du,
  agent: uu,
  root: hu,
  agentTop: mu,
  dot: wu,
  agentName: fu,
  agentMeta: _u,
  foot: vu,
  footName: bu,
  footLinks: pu,
  linkBrand: gu,
  label: yu,
  note: Nu,
  footer: ku
};
function $u({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ l(
    "a",
    {
      className: E.agent,
      href: I(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ l("span", { className: E.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: E.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": hn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: E.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: E.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Cu({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: E.foot, children: [
    /* @__PURE__ */ n("span", { className: E.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: E.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${E.footLink} ward-target`, href: I(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function Su({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: o, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ l("nav", { className: E.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ l("div", { className: E.brand, children: [
      /* @__PURE__ */ n("span", { className: E.mark }),
      /* @__PURE__ */ n("span", { className: E.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: E.nav, children: t.map((s) => /* @__PURE__ */ n("a", { className: E.navItem, href: I(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ l("div", { className: E.group, children: [
      /* @__PURE__ */ l("span", { className: E.groupName, children: [
        a,
        " · ",
        ae(r.length)
      ] }),
      o && /* @__PURE__ */ n("a", { className: E.new, href: I(o.href), children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: E.agents, children: r.map((s) => /* @__PURE__ */ n($u, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(Cu, { shared: i })
  ] });
}
function Ru(e) {
  return e.destinations ?? e.items ?? [];
}
function Tu({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: E.linkBrand, children: e });
}
function xu({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: E.footer, children: e });
}
function Lu({ link: e, active: t }) {
  return /* @__PURE__ */ l("a", { href: I(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: E.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: E.note, children: e.note })
  ] });
}
function Au(e) {
  return /* @__PURE__ */ l("aside", { className: `${E.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Tu, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Ru(e).map((t) => /* @__PURE__ */ n(Lu, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(xu, { children: e.children })
  ] });
}
function Eu(e) {
  return "agents" in e;
}
function TT(e) {
  return Eu(e) ? /* @__PURE__ */ n(Su, { ...e }) : /* @__PURE__ */ n(Au, { ...e });
}
const Iu = "_mark_wlgi8_3", Mu = {
  mark: Iu
}, Bu = { met: "✓", unmet: "", failed: "✕" };
function pn({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Mu.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: Bu[e]
    }
  );
}
const ju = "_avatar_1t33a_3", Pu = {
  avatar: ju
};
function At(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function qu(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [At(e), ...[...t.slice(1)].map((r) => a + r)];
}
function Ou(e, t) {
  const a = qu(e).find((o) => !t.has(o));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(At(e).charAt(0) + String(r)); ) r += 1;
  return At(e).charAt(0) + String(r);
}
function xT(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const o = Ou(r, t);
    t.add(o), a.set(r, o);
  }
  return a;
}
function Hu(e) {
  return e != null && mt(e) ? ho(e) : void 0;
}
function LT({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: Pu.avatar, "data-size": a, "aria-hidden": "true", style: Hu(t), children: r ?? At(e) });
}
const Du = "_marker_br9fi_2", Fu = {
  marker: Du
}, zu = {
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
}, Wu = { running: " ward-running" };
function Fe({ size: e, kind: t, label: a }) {
  const r = { "--marker": zu[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Fu.marker} ward-marker ward-marker--${t}${Wu[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const Ku = "_root_ti0pq_2", Gu = "_chip_ti0pq_11", Uu = "_noCase_ti0pq_23", bt = {
  root: Ku,
  chip: Gu,
  noCase: Uu
};
function Vu(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function gn({ connection: e, since: t, lastEventAt: a }) {
  const r = Vu(t, a), o = mn(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${bt.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Fe, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${bt.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: bt.noCase, children: un(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${bt.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    he(r)
  ] });
}
const Yu = "_root_yylks_2", Ju = "_context_yylks_13", Qu = "_row_yylks_1", Xu = "_heading_yylks_27", Zu = "_headingWrap_yylks_35", eh = "_meta_yylks_41", th = "_chips_yylks_49", nh = "_title_yylks_56", ah = "_consequence_yylks_66", rh = "_actionsWrap_yylks_73", oh = "_actions_yylks_73", lh = "_action_yylks_73", ih = "_overflowPanel_yylks_102", sh = "_measureClip_yylks_113", ch = "_measure_yylks_113", U = {
  root: Yu,
  context: Ju,
  row: Qu,
  heading: Xu,
  headingWrap: Zu,
  meta: eh,
  chips: th,
  title: nh,
  consequence: ah,
  actionsWrap: rh,
  actions: oh,
  action: lh,
  overflowPanel: ih,
  measureClip: sh,
  measure: ch
};
function dh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(at, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function uh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function hh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function mh({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ l("div", { className: U.meta, children: [
    /* @__PURE__ */ n(uh, { chips: e }),
    /* @__PURE__ */ n(hh, { consequence: t, consequenceHint: a })
  ] });
}
function wh({ title: e, chips: t, consequence: a, consequenceHint: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: U.heading, children: [
    /* @__PURE__ */ n(dh, { title: e, density: o }),
    /* @__PURE__ */ n(mh, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function rn({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function Kn({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function fh({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: o }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(Kn, { disclosure: o }) : t ? [/* @__PURE__ */ n(Kn, { disclosure: o }, "more"), /* @__PURE__ */ n(rn, { actions: e }, "actions")] : /* @__PURE__ */ n(rn, { actions: e });
}
function _h(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function vh({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(rn, { actions: e }) });
}
function bh(e, t) {
  const a = k(), [r, o] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: a, toggle: () => o(!i) }, close: () => {
    var d, u;
    o(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const ph = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function gh(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && ph(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function yh({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(As, { path: e.path, current: e.current }) });
}
function Nh(...e) {
  return e.some((t) => t === null);
}
function kh(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function $h(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + kh(e);
}
function Ch(e, t, a, r, o) {
  if (o === 0 || Nh(t, a, r)) return !1;
  const [i, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - $h(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Sh(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Rh(e) {
  return Kr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Th(e, t) {
  return t.length === 0 && e.length === 1 && Rh(e[0]);
}
function xh(e, t) {
  const a = _(null), r = _(null), o = _(null), i = _(null), [s, c] = p(!1);
  return S(() => {
    const d = a.current;
    if (!Sh(d)) return;
    const u = () => c(Ch(d, r.current, o.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: o, measureRef: i, collapsed: s && !t };
}
function Lh({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ l("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] }) });
}
function Ah({ connection: e }) {
  return e ? /* @__PURE__ */ n(gn, { connection: e.connection, since: e.since }) : null;
}
function AT({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: o, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: y, measureRef: N, collapsed: A } = xh(s, Th(s, c)), O = c.length > 0, { disclosure: me, close: re } = bh(A || O, y), Ee = _h(c, s, A, u);
  return /* @__PURE__ */ l("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(yh, { crumb: gh(e, r, t) }),
    /* @__PURE__ */ l("div", { className: U.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: f, className: U.headingWrap, children: /* @__PURE__ */ n(wh, { title: r, chips: a, consequence: o, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ l("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(Ah, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: y, "data-ward-actions": !0, children: /* @__PURE__ */ n(fh, { actions: s, hasMore: O, collapsed: A, onOverflow: u, disclosure: me }) })
      ] })
    ] }),
    /* @__PURE__ */ n(vh, { actions: Ee, disclosure: me, onEscape: re }),
    /* @__PURE__ */ n(Lh, { actions: s, hasMore: O, measureRef: N })
  ] });
}
const Eh = "_root_td96x_2", Ih = "_body_td96x_16", Gn = {
  root: Eh,
  body: Ih
};
function ET({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${Gn.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: Gn.body, children: a }) });
}
const Mh = "_root_bf1pc_2", Bh = "_table_bf1pc_9", jh = "_caption_bf1pc_14", Ph = "_series_bf1pc_23", qh = "_category_bf1pc_31", Oh = "_cell_bf1pc_39", Hh = "_track_bf1pc_45", Dh = "_lane_bf1pc_52", Fh = "_bar_bf1pc_56", zh = "_value_bf1pc_63", Wh = "_swatch_bf1pc_70", Kh = "_empty_bf1pc_78", Z = {
  root: Mh,
  table: Bh,
  caption: jh,
  series: Ph,
  category: qh,
  cell: Oh,
  track: Hh,
  lane: Dh,
  bar: Fh,
  value: zh,
  swatch: Wh,
  empty: Kh
}, Gh = "—", Un = 6;
function Uh(e, t) {
  if (t.length < 1 || t.length > Un)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${Un}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function Vh(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function Ya(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function Yh(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function Jh({ value: e, top: t, step: a, format: r, missing: o }) {
  const i = Yh(e, t), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ l("span", { className: Z.track, children: [
    /* @__PURE__ */ n("span", { className: Z.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${Z.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Z.value, children: e === null ? o : r(e) })
  ] }) });
}
function Qh({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ l("th", { scope: "col", className: Z.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Z.swatch, "data-step": Ya(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function Xh({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ l("section", { className: `${Z.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Z.empty, children: t })
  ] });
}
function Zh({ title: e, categories: t, series: a, top: r, format: o = ae, categoryHead: i = "Category", missing: s = Gh }) {
  return /* @__PURE__ */ n("div", { className: `${Z.root} ward-barchart`, children: /* @__PURE__ */ l("table", { className: Z.table, children: [
    /* @__PURE__ */ n("caption", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Z.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Qh, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Z.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(Jh, { value: u.values[d], top: r, step: Ya(h, a.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function IT(e) {
  Uh(e.categories, e.series);
  const t = Vh(e.series);
  return t === 0 ? /* @__PURE__ */ n(Xh, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Zh, { ...e, top: t });
}
const em = "_root_1bfqw_2", tm = "_figure_1bfqw_7", nm = "_of_1bfqw_13", am = "_bar_1bfqw_18", rm = "_rows_1bfqw_38", om = "_row_1bfqw_38", lm = "_label_1bfqw_49", im = "_amount_1bfqw_54", Ie = {
  root: em,
  figure: tm,
  of: nm,
  bar: am,
  rows: rm,
  row: om,
  label: lm,
  amount: im
};
function sm({ spent: e, ceiling: t, breakdown: a }) {
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
const cm = "_frame_f7bxz_2", dm = "_table_f7bxz_6", um = "_th_f7bxz_12", hm = "_td_f7bxz_13", mm = "_sort_f7bxz_53", wm = "_row_f7bxz_65", fm = "_empty_f7bxz_73", qe = {
  frame: cm,
  table: dm,
  th: um,
  td: hm,
  sort: mm,
  row: wm,
  empty: fm
}, _m = { asc: "ascending", desc: "descending" };
function vm(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return _m[t.direction];
}
function bm(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: qe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function pm(e) {
  return e === void 0 ? void 0 : { width: e };
}
function gm({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: qe.th,
      style: pm(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": vm(e, t),
      children: bm(e, a)
    }
  );
}
function ym({ row: e, props: t }) {
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
function Nm({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: qe.head, children: t.map((w) => /* @__PURE__ */ n(gm, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(ym, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: o, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const km = "_list_v0s52_2", $m = {
  list: km
};
function Cm({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: $m.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const Sm = "_label_1u62a_2", Rm = {
  label: Sm
};
function MT({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: Rm.label, children: t.header }) }, t.key)) }) });
}
const Tm = "_stack_bp6a0_2", xm = {
  stack: Tm
};
function BT({ children: e }) {
  return /* @__PURE__ */ n("span", { className: xm.stack, "data-ward-action-stack": "", children: e });
}
const Lm = "_set_1z0sq_2", Am = "_legend_1z0sq_7", Em = "_row_1z0sq_15", Im = "_control_1z0sq_20", Mm = "_input_1z0sq_26", Bm = "_label_1z0sq_31", jm = "_consequence_1z0sq_36", We = {
  set: Lm,
  legend: Am,
  row: Em,
  control: Im,
  input: Mm,
  label: Bm,
  consequence: jm
};
function Ja({ legend: e, options: t, value: a, onChange: r, disabled: o, name: i, describedBy: s, variant: c }) {
  const d = k(), u = i ?? d;
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
const Pm = "_root_11gpw_2", qm = "_head_11gpw_10", Om = "_note_11gpw_29", Hm = "_index_11gpw_34", Dm = "_dot_11gpw_38", Fm = "_counter_11gpw_49", zm = "_trailing_11gpw_57", Ke = {
  root: Pm,
  head: qm,
  note: Om,
  index: Hm,
  dot: Dm,
  counter: Fm,
  trailing: zm
};
function Wm({ index: e }) {
  return e ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ke.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ke.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Km({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ke.counter, "aria-hidden": "true", children: e }) : null;
}
function Vn({ title: e, index: t, note: a, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Ke.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Ke.head, children: [
      /* @__PURE__ */ n(Wm, { index: t }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ke.note, children: a }),
    /* @__PURE__ */ n(Km, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ke.trailing, children: i })
  ] });
}
const Gm = "_strip_c3x3u_2", Um = "_cell_c3x3u_7", Vm = "_value_c3x3u_12", Ym = "_link_c3x3u_29", Jm = "_label_c3x3u_49", Qm = "_tiles_c3x3u_101", De = {
  strip: Gm,
  cell: Um,
  value: Vm,
  link: Ym,
  label: Jm,
  tiles: Qm
};
function Qa(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((o) => o.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Xa = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Xm({ cell: e }) {
  return /* @__PURE__ */ l("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: Xa(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function Zm({ cell: e, href: t }) {
  return /* @__PURE__ */ l("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: Xa(e), title: e.hint, children: /* @__PURE__ */ l("a", { className: `${De.link} ward-stat-link`, href: I(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Za = (e) => e.href === void 0 ? /* @__PURE__ */ n(Xm, { cell: e }, e.label) : /* @__PURE__ */ n(Zm, { cell: e, href: e.href }, e.label);
function Ft({ cells: e, divided: t = !1 }) {
  return Qa("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${De.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(Za) });
}
const Yn = 6;
function jT({ cells: e }) {
  Qa("StatTiles", e, [1, 2 * Yn]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, Yn) };
  return /* @__PURE__ */ n("dl", { className: `${De.tiles} ward-stattiles`, style: t, children: e.map(Za) });
}
const ew = "_root_1eb1u_2", tw = "_track_1eb1u_8", nw = "_thumb_1eb1u_46", aw = "_labelHidden_1eb1u_64", rw = "_label_1eb1u_64", ow = "_lockedNote_1eb1u_84", Ge = {
  root: ew,
  track: tw,
  thumb: nw,
  labelHidden: aw,
  label: rw,
  lockedNote: ow
};
function lw(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function iw(e) {
  return e ? `${Ge.label} ${Ge.labelHidden}` : Ge.label;
}
function sw(e, t, a) {
  return e && !t && a ? a : void 0;
}
function cw(e, t, a, r) {
  return { "aria-describedby": Ht(rt(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function dw({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ve({ label: e, checked: t, onChange: a, disabled: r, locked: o, describedBy: i, labelHidden: s, disabledReason: c }) {
  const d = k(), u = `${d}switch`, h = `${d}reason`, w = Ae(), { on: f, off: y } = lw(t, r, o, w !== null), N = sw(y, w !== null, c);
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
        ...cw(h, i, w, N),
        className: `${Ge.track} ward-switch`,
        "data-on": f,
        "data-locked": o ? !0 : void 0,
        disabled: y,
        onClick: () => !y && (a == null ? void 0 : a(!f)),
        children: /* @__PURE__ */ n("span", { className: Ge.thumb })
      }
    ),
    /* @__PURE__ */ l("label", { id: d, htmlFor: u, className: iw(s), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ge.lockedNote, children: "always on" })
    ] }),
    /* @__PURE__ */ n(dw, { id: h, reason: N })
  ] });
}
const uw = "_bar_1vp69_2", hw = "_skip_1vp69_11", mw = "_mark_1vp69_22", ww = "_nav_1vp69_30", fw = "_list_1vp69_34", _w = "_select_1vp69_41", vw = "_selectTrigger_1vp69_45", bw = "_dest_1vp69_52", pw = "_actor_1vp69_71", gw = "_actorMark_1vp69_84", yw = "_actorLabel_1vp69_89", Nw = "_tagline_1vp69_108", se = {
  bar: uw,
  skip: hw,
  mark: mw,
  nav: ww,
  list: fw,
  select: _w,
  selectTrigger: vw,
  dest: bw,
  actor: pw,
  actorMark: gw,
  actorLabel: yw,
  tagline: Nw
};
function kw(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function $w(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function PT({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: o, onNavigate: i, skipTo: s = "main" }) {
  const c = $w(r);
  return /* @__PURE__ */ l("header", { className: se.bar, children: [
    /* @__PURE__ */ n("a", { className: `${se.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: se.mark, children: e }),
    o && /* @__PURE__ */ n("span", { className: se.tagline, children: o }),
    /* @__PURE__ */ l("nav", { className: se.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: se.list, children: t.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${se.dest} ward-target`,
          href: I(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        Ba,
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
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: kw(c) })
    ] })
  ] });
}
const Cw = "_tree_zzoob_2", Sw = "_item_zzoob_6", Rw = "_row_zzoob_10", Tw = "_button_zzoob_22", Et = {
  tree: Cw,
  item: Sw,
  row: Rw,
  button: Tw
}, er = Ne(null);
function xw({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = qt({ orientation: "vertical" });
  return /* @__PURE__ */ n(er.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: Et.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const Lw = { ArrowRight: !0, ArrowLeft: !1 };
function Jn(e) {
  return e ? !0 : void 0;
}
function Aw(e, t) {
  const a = Lw[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function Ew(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function Iw(e) {
  const t = [Et.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function Mw(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Bw(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function jw(e) {
  return typeof e == "string" ? e : void 0;
}
function Pw({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function qw({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function tr(e) {
  const t = ye(er);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = Mw(e);
  return /* @__PURE__ */ l("li", { className: Et.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Iw(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": Jn(e.unresolved),
        "data-inherited": Jn(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${Et.button} ward-treeitem-btn`,
            onClick: () => Ew(e),
            onKeyDown: (r) => Aw(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Bw(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: jw(e.label), children: e.label }),
              /* @__PURE__ */ n(Pw, { value: e.detail }),
              /* @__PURE__ */ n(qw, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Ow = "_frame_gxspk_2", Hw = "_subjectRail_gxspk_22", Dw = "_subject_gxspk_22", Fw = "_rail_gxspk_42", zw = "_record_gxspk_57", Ww = "_recordBody_gxspk_102", Kw = "_stageGrid_gxspk_157", Gw = "_band_gxspk_171", Uw = "_bandBody_gxspk_179", Vw = "_bandActions_gxspk_184", Yw = "_scroller_gxspk_192", Jw = "_board_gxspk_219", Qw = "_lanes_gxspk_228", Xw = "_cardGrid_gxspk_262", ee = {
  frame: Ow,
  subjectRail: Hw,
  subject: Dw,
  rail: Fw,
  record: zw,
  recordBody: Ww,
  stageGrid: Kw,
  band: Gw,
  bandBody: Uw,
  bandActions: Vw,
  scroller: Yw,
  board: Jw,
  lanes: Qw,
  cardGrid: Xw
};
function qT({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: ee.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function Qn(e) {
  return e ? "true" : void 0;
}
function OT({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: ee.subjectRail, "data-ward-subject-rail": a, "data-ruled": Qn(i), children: [
    /* @__PURE__ */ n("div", { className: ee.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ee.rail, "data-sticky": Qn(o), "aria-label": r, children: t })
  ] });
}
function HT({ title: e, children: t, note: a, trailing: r, pad: o = "block", label: i, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(Vn, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ l("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(Vn, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: ee.recordBody, "data-pad": o, "data-measure": c, children: t })
  ] });
}
const Zw = "_form_1j8ub_2", ef = "_fields_1j8ub_9", tf = "_actions_1j8ub_19", Yt = {
  form: Zw,
  fields: ef,
  actions: tf
};
function DT({ label: e, children: t, actions: a, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: Yt.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Yt.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: Yt.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function FT({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ l("section", { className: ee.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ee.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: ee.bandActions, children: t })
  ] });
}
const nf = "(max-width: 767.98px)";
function yn({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(fn, { className: ee.scroller, label: e, count: a ?? Gr.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function af({ lanes: e, label: t, laneLabel: a }) {
  const [r, o] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ l("div", { className: ee.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(q, { kind: "select", label: a, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ n(yn, { label: t, children: i == null ? void 0 : i.content })
  ] });
}
function rf({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: ee.board, "data-ward-board": "", children: /* @__PURE__ */ n(yn, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(wa, { children: a.content }, a.id)) }) });
}
function zT({ children: e, label: t = "Workflow board", lanes: a, laneLabel: r = "Column" }) {
  const o = ut(nf);
  return a === void 0 ? /* @__PURE__ */ n(yn, { label: t, children: e }) : o ? /* @__PURE__ */ n(af, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(rf, { lanes: a, label: t });
}
function WT({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), i = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ n(fn, { className: ee.stageGrid, label: a, count: o, "data-ward-stage-grid": "", "data-floor": r, style: i, children: t });
}
function KT({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${ee.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const of = "_block_6tv5x_3", lf = "_sentence_6tv5x_10", sf = "_meta_6tv5x_19", cf = "_ways_6tv5x_24", df = "_action_6tv5x_38", uf = "_strip_6tv5x_42", hf = "_loading_6tv5x_61", mf = "_label_6tv5x_69", wf = "_counter_6tv5x_76", _e = {
  block: of,
  sentence: lf,
  meta: sf,
  ways: cf,
  action: df,
  strip: uf,
  loading: hf,
  label: mf,
  counter: wf
};
function ff({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function zt({ sentence: e, action: t, children: a, role: r = "status", tone: o, kind: i, ask: s }) {
  return /* @__PURE__ */ l("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ l("p", { className: _e.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ l(x, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(ff, { action: t })
  ] });
}
function _f(e) {
  return /* @__PURE__ */ n(zt, { ...e, kind: "ward-emptystate" });
}
function GT({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(zt, { sentence: e, action: a, children: /* @__PURE__ */ l("p", { className: _e.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function vf({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${_e.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function UT({ ways: e, ...t }) {
  return /* @__PURE__ */ n(zt, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(vf, { ways: e }) });
}
function VT({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(zt, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ l("p", { className: _e.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function YT({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ l("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function JT({ queued: e, since: t }) {
  return /* @__PURE__ */ l("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function QT({ label: e, startedAt: t }) {
  const a = _(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = p(!1);
  S(() => {
    const s = window.setTimeout(() => o(!0), be.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = mn(a.current, r);
  return /* @__PURE__ */ l("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: _e.counter, children: un(i) }) : null
  ] });
}
const bf = "_note_cigdt_2", pf = {
  note: bf
};
function gf({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ l("p", { className: pf.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const yf = "_card_k7btg_3", Nf = "_hit_k7btg_31", kf = "_head_k7btg_44", $f = "_title_k7btg_51", Cf = "_meta_k7btg_57", Sf = "_since_k7btg_66", Rf = "_sep_k7btg_76", Tf = "_fields_k7btg_80", xf = "_field_k7btg_80", Lf = "_last_k7btg_98", Af = "_reason_k7btg_110", de = {
  card: yf,
  hit: Nf,
  head: kf,
  title: $f,
  meta: Cf,
  since: Sf,
  sep: Rf,
  fields: Tf,
  field: xf,
  last: Lf,
  reason: Af
}, Ef = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function If(e, t, a) {
  const r = $t(e, "blue"), o = $t(e, "orange"), i = $t(e, "green"), s = _(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: o, green: i };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Ef[d.type];
      u && c[u]();
    });
  }, [r, a, i, t, o]);
}
const Mf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Bf(e, t) {
  return Mf[t](e);
}
function jf({ item: e, connection: t }) {
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
function Pf({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ l("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function qf({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Of({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: de.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: de.field, children: Bf(e, a) }, a)) });
}
const on = (e) => e ? !0 : void 0;
function Hf(e) {
  return { "--stream": ge(e.streamStep, "id") };
}
function Df(e, t, a) {
  e == null || e(t, a);
}
function Ff(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function zf({ item: e, stale: t }) {
  var r, o;
  const a = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: de.last, "data-stale": on(t), children: a }) : null;
}
function Wt(e) {
  const t = e.fields ?? [], a = e.item, r = _(null);
  If(r, a.key, e.feed);
  const o = Ff(e.feed), i = Hf(a);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: de.card,
      style: i,
      "data-selected": on(e.selected),
      "data-flagged": on(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: de.hit, onClick: (s) => Df(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(Pf, { item: a }),
        /* @__PURE__ */ n(at, { as: "p", className: de.title, text: a.title }),
        /* @__PURE__ */ n(jf, { item: a, connection: o }),
        /* @__PURE__ */ n(qf, { reason: a.blockedReason }),
        /* @__PURE__ */ n(Of, { item: a, fields: t }),
        /* @__PURE__ */ n(zf, { item: a, stale: o === "stale" })
      ]
    }
  );
}
const Wf = "_column_1j8bi_3", Kf = "_head_1j8bi_21", Gf = "_label_1j8bi_30", Uf = "_count_1j8bi_39", Vf = "_list_1j8bi_53", ct = {
  column: Wf,
  head: Kf,
  label: Gf,
  count: Uf,
  list: Vf
};
function nr(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function Yf({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ l("div", { className: ct.head, children: [
    /* @__PURE__ */ n("h2", { className: ct.label, id: a, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ l("span", { className: ct.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Jf(e) {
  return /* @__PURE__ */ n("div", { className: ct.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      Wt,
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
function Qf({ column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = k(), h = e.cap !== void 0 && t.length > e.cap, w = nr(t, r);
  return /* @__PURE__ */ l("section", { className: ct.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Yf, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(Jf, { column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n(gf, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const Xf = "_foot_cs4jr_2", Zf = "_note_cs4jr_13", e_ = "_link_cs4jr_19", Jt = {
  foot: Xf,
  note: Zf,
  link: e_
};
function XT({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: Jt.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Jt.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Jt.link} ward-target`, href: I(e), children: "Configure board" })
  ] });
}
const t_ = "_head_1tfi5_3", n_ = "_identity_1tfi5_12", a_ = "_titleRow_1tfi5_18", r_ = "_title_1tfi5_18", o_ = "_key_1tfi5_35", l_ = "_rollup_1tfi5_45", i_ = "_tools_1tfi5_53", s_ = "_swatch_1tfi5_101", c_ = "_mark_1tfi5_108", Se = {
  head: t_,
  identity: n_,
  titleRow: a_,
  title: r_,
  key: o_,
  rollup: l_,
  tools: i_,
  swatch: s_,
  mark: c_
}, Xn = "initials:";
function d_(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function u_(e) {
  const t = [d_(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function h_(e) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ l("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    u_(e)
  ] });
}
function m_(e) {
  return e.startsWith(Xn) ? e.slice(Xn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function w_({ markRef: e, streamStep: t }) {
  const a = { "--stream": ge(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Se.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: m_(e) }) : /* @__PURE__ */ n("span", { className: Se.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function f_({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function ZT({
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
        /* @__PURE__ */ n(w_, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Se.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Se.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Se.rollup, "aria-live": "polite", children: h_(t) })
    ] }),
    /* @__PURE__ */ l("div", { className: Se.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(f_, { owners: o, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(gn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const __ = "_head_1sejb_14", v_ = "_line_1sejb_15", b_ = "_cHandle_1sejb_36", p_ = "_cName_1sejb_41", g_ = "_nameLine_1sejb_49", y_ = "_cLabel_1sejb_56", N_ = "_cCap_1sejb_61", k_ = "_cShown_1sejb_66", $_ = "_name_1sejb_49", C_ = "_noCap_1sejb_88", S_ = "_state_1sejb_102", R_ = "_handle_1sejb_111", T_ = "_sub_1sejb_137", H = {
  head: __,
  line: v_,
  cHandle: b_,
  cName: p_,
  nameLine: g_,
  cLabel: y_,
  cCap: N_,
  cShown: k_,
  name: $_,
  noCap: C_,
  state: S_,
  handle: R_,
  sub: T_
}, x_ = "can't be hidden or collapsed", L_ = "terminal · counted, not a column", A_ = "A human gate is always shown, so people see what waits for them.", E_ = "A terminal stage is counted, not shown as a column.";
function ex() {
  return /* @__PURE__ */ l("div", { className: H.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.cHandle }),
    /* @__PURE__ */ n("span", { className: H.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: H.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: H.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: H.cShown, children: "Shown" })
  ] });
}
function I_(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function M_(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Zn(e) {
  return e.gate ? x_ : e.terminal ? L_ : M_(e.agentsMounted);
}
function B_(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function j_({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: H.cName, children: [
    /* @__PURE__ */ l("span", { className: H.nameLine, children: [
      /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Zn(e) && /* @__PURE__ */ n("span", { className: H.sub, children: Zn(e) })
  ] });
}
function P_(e) {
  return e === void 0 ? "" : String(e);
}
function q_(e) {
  return e === "" ? void 0 : Number(e);
}
function O_({ name: e, onReorder: t }) {
  const a = Ae();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ n("span", { className: H.cHandle }) : /* @__PURE__ */ n("span", { className: H.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: H.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && B_(r, t),
      children: "⠿"
    }
  ) });
}
function H_({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${H.cCap} ${H.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: H.cCap, children: /* @__PURE__ */ n(q, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: P_(t.cap), onChange: (r) => a({ ...t, cap: q_(r) }) }) });
}
function D_(e) {
  return e.gate ? A_ : e.terminal ? E_ : void 0;
}
function F_({ stage: e, config: t, onChange: a }) {
  const r = Ae() !== null, o = I_(e, t.shown), i = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ l("span", { className: H.cShown, children: [
    /* @__PURE__ */ n(Ve, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, disabledReason: D_(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: H.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!o.shown), children: o.state })
  ] });
}
function z_(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function tx({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: H.line, "data-kind": z_(e), children: [
    /* @__PURE__ */ n(O_, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(j_, { stage: e }),
    /* @__PURE__ */ n("span", { className: H.cLabel, children: /* @__PURE__ */ n(q, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (o) => a({ ...t, label: o }) }) }),
    /* @__PURE__ */ n(H_, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(F_, { stage: e, config: t, onChange: a })
  ] });
}
const W_ = "_body_8qsv9_2", K_ = "_head_8qsv9_9", G_ = "_summary_8qsv9_19", U_ = "_block_8qsv9_20", V_ = "_actionsBlock_8qsv9_21", Y_ = "_title_8qsv9_41", J_ = "_note_8qsv9_46", Q_ = "_k_8qsv9_51", X_ = "_kv_8qsv9_58", Z_ = "_row_8qsv9_64", ev = "_label_8qsv9_75", tv = "_value_8qsv9_84", nv = "_quote_8qsv9_90", av = "_actions_8qsv9_21", rv = "_resolve_8qsv9_111", F = {
  body: W_,
  head: K_,
  summary: G_,
  block: U_,
  actionsBlock: V_,
  title: Y_,
  note: J_,
  k: Q_,
  kv: X_,
  row: Z_,
  label: ev,
  value: tv,
  quote: nv,
  actions: av,
  resolve: rv
};
function ov(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function lv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function iv(e) {
  const t = ft(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function sv(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function cv(e, t, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Dt(iv(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...ov(e),
    ...sv(a),
    ...lv(e, t)
  ];
}
function dv({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: F.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: F.k, children: t }),
    e
  ] });
}
function uv(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function hv({ item: e, showKey: t }) {
  const a = uv(e);
  return !t && !a ? null : /* @__PURE__ */ l("div", { className: F.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function mv({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: F.block, children: [
    /* @__PURE__ */ n("p", { className: F.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: F.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: F.note, children: e.agentMeta })
  ] }) : null;
}
function nx({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: o, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = k(), w = cv(e, o, d);
  return /* @__PURE__ */ n(ot, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: F.body, children: [
    /* @__PURE__ */ n(hv, { item: e, showKey: u }),
    /* @__PURE__ */ l("div", { className: F.summary, children: [
      /* @__PURE__ */ n("h2", { className: F.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: F.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: F.kv, children: w.map(([f, y, N]) => /* @__PURE__ */ l("div", { className: F.row, children: [
      /* @__PURE__ */ n("dt", { className: F.label, children: f }),
      /* @__PURE__ */ n("dd", { className: F.value, children: y })
    ] }, N ?? f)) }),
    /* @__PURE__ */ n(mv, { item: e }),
    /* @__PURE__ */ l("div", { className: F.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: F.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: F.note, children: c })
    ] }),
    /* @__PURE__ */ n(dv, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const wv = "_root_3azmy_2", fv = "_list_3azmy_7", _v = "_item_3azmy_12", vv = "_box_3azmy_18", bv = "_text_3azmy_23", pv = "_note_3azmy_28", Je = {
  root: wv,
  list: fv,
  item: _v,
  box: vv,
  text: bv,
  note: pv
};
function Kt({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ l("div", { className: Je.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${Je.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${Je.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Je.box, children: /* @__PURE__ */ n(pn, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Je.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${Je.note} ward-checklist-note`, children: t })
  ] });
}
const gv = "_rail_znbbp_2", yv = "_k_znbbp_11", Nv = "_head_znbbp_19", kv = "_section_znbbp_25", $v = "_card_znbbp_39", Cv = "_strip_znbbp_46", Sv = "_skeleton_znbbp_60", Rv = "_skeletonLabel_znbbp_74", Tv = "_bar_znbbp_80", xv = "_note_znbbp_89", fe = {
  rail: gv,
  k: yv,
  head: Nv,
  section: kv,
  card: $v,
  strip: Cv,
  skeleton: Sv,
  skeletonLabel: Rv,
  bar: Tv,
  note: xv
};
function Lv(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Qt({ title: e, children: t }) {
  return /* @__PURE__ */ l("section", { className: fe.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: fe.k, children: e }),
    t
  ] });
}
function Av({ column: e, count: t }) {
  return /* @__PURE__ */ l("div", { className: fe.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: fe.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: fe.bar, "aria-hidden": "true" }, r))
  ] });
}
function Ev({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(Qf, { column: o, items: t.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, o.id));
}
function Iv(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Ev, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(Av, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function ax(e) {
  const t = Lv(e.onOpen), a = nr(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: fe.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${fe.k} ${fe.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Qt, { title: "Card", children: /* @__PURE__ */ n("div", { className: fe.card, children: a && /* @__PURE__ */ n(Wt, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ l(Qt, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: fe.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Iv, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Qt, { title: "Effect of this config", children: /* @__PURE__ */ n(Kt, { items: e.effects, density: "compact" }) })
  ] });
}
function Mv(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function Bv(e) {
  return Math.ceil(e.length / 2);
}
function jv(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function ar(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Pv(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const o = ar(e);
  o !== void 0 && a(o), r(jv(e.type));
}
function qv(e, t, a, r, o) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (i) => Pv(i, a, r, o));
  }, [e, t, a, r, o]);
}
function Ov(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Hv(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Dv(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Fv(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(Bv(t ?? [])) + ")"
  };
}
function zv(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Wv(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: le(e.cost) }) : null;
}
function Kv(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Gv(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function Uv(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function Vv(e, t) {
  return t === void 0 ? e : Mv(e, t.ref);
}
function Yv(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ht(e) {
  return e === !0 ? "true" : void 0;
}
function rr(e) {
  const t = e.item, a = t.run, r = a !== void 0, o = _(null), i = $t(o), s = _(/* @__PURE__ */ new Set()), [c, d] = p(Ov(t));
  qv(e.feed, t.key, s, d, i);
  const u = Hv(t, r), h = Dv(t, a), w = Fv(t, e.fields), f = Uv(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...Yv(e),
      className: "ward-workcard",
      "data-flagged": ht(t.flagged),
      "data-selected": ht(e.selected),
      style: w,
      ref: Vv(o, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        zv(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          Wv(t, e.fields),
          Kv(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          Gv(a, c, e.connection, t.changedAt),
          f !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function Jv({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function Qv(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Xv(e, t, a) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function Zv(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Jv, { count: e.items.length, cap: e.column.cap });
}
function eb(e, t) {
  return e.roving ?? t;
}
function tb(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function nb(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    rr,
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
function ab(e) {
  const t = k(), a = qt({ orientation: "vertical" }), r = eb(e, a), o = Qv(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": ht(o), "data-gate": ht(e.column.gate), children: [
    Xv(e.column, e.items.length, t),
    Zv(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...tb(e, a), children: nb(e, r) })
  ] });
}
function rb(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function ob(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function lb(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function rx(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: rb(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      ob(e),
      lb(e.onConfigure),
      /* @__PURE__ */ n(gn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function ib(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function sb(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ve, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ve, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function cb(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(x, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function ox(e) {
  const t = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": ht(ib(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: sb(e) }),
    /* @__PURE__ */ n(q, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(Ra, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    cb(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function lx(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(rr, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(ab, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function db(e, t) {
  const a = ar(e);
  a !== void 0 && t(a);
}
function ub(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => db(r, a));
  }, [e, t, a]);
}
function hb(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function mb(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function wb(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function fb(e, t) {
  return /* @__PURE__ */ l(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function ix(e) {
  var s;
  const t = e.item, a = t.run, [r, o] = p((s = t.run) == null ? void 0 : s.lastStep);
  ub(e.feed, t.key, o);
  const i = [...hb(t), ...mb(t)];
  return /* @__PURE__ */ l(ot, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      wb(a, r)
    ] }),
    fb(t, e.actions)
  ] });
}
const _b = "_card_1nkkx_3", vb = "_head_1nkkx_30", bb = "_mark_1nkkx_38", pb = "_name_1nkkx_50", gb = "_chips_1nkkx_71", yb = "_description_1nkkx_77", Nb = "_run_1nkkx_82", kb = "_sep_1nkkx_91", $b = "_facts_1nkkx_97", Cb = "_fact_1nkkx_97", Sb = "_factLabel_1nkkx_111", Rb = "_factValue_1nkkx_115", ie = {
  card: _b,
  head: vb,
  mark: bb,
  name: pb,
  chips: gb,
  description: yb,
  run: Nb,
  sep: kb,
  facts: $b,
  fact: Cb,
  factLabel: Sb,
  factValue: Rb
}, Tb = { live: "done", draft: "running", paused: "meta" };
function xb(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function Lb({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: Tb[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function Ab({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function Eb({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function Ib({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ l("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function Mb(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Bb({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: o, facts: i, className: s }) {
  const c = { "--stream": ge(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": d,
      className: xb(s),
      style: c,
      "data-selected": d,
      "data-paused": Mb(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ l("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: I(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(Ab, { description: e.description }),
        /* @__PURE__ */ n(Eb, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Lb, { versions: e.versions }),
        /* @__PURE__ */ n(Ib, { facts: i })
      ]
    }
  );
}
const jb = "_list_4dcyc_2", Pb = "_row_4dcyc_11", qb = "_head_4dcyc_23", Ob = "_id_4dcyc_30", Hb = "_lock_4dcyc_35", Db = "_reason_4dcyc_41", Fb = "_remove_4dcyc_46", zb = "_clauses_4dcyc_50", Wb = "_clause_4dcyc_50", Kb = "_label_4dcyc_64", Gb = "_cell_4dcyc_71", Ub = "_value_4dcyc_76", ce = {
  list: jb,
  row: Pb,
  head: qb,
  id: Ob,
  lock: Hb,
  reason: Db,
  remove: Fb,
  clauses: zb,
  clause: Wb,
  label: Kb,
  cell: Gb,
  value: Ub
}, or = Ne(!1);
function sx({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(or.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function Vb({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(q, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => a(e.key, o) });
}
function Yb({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function Jb({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ l("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Yb, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function ea(e, t) {
  return e.locked ? void 0 : t;
}
function cx({ rule: e, onChange: t, onRemove: a }) {
  if (!ye(or)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = ea(e, t);
  return /* @__PURE__ */ l("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Jb, { rule: e, onRemove: ea(e, a) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(Vb, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const Qb = "_ladder_1xdeh_2", Xb = "_cell_1xdeh_7", Zb = "_empty_1xdeh_26", ep = "_name_1xdeh_34", tp = "_holder_1xdeh_40", np = "_request_1xdeh_46", ap = "_swatches_1xdeh_51", rp = "_swatch_1xdeh_51", op = "_tilesFrame_1xdeh_78", lp = "_tiles_1xdeh_78", ip = "_tile_1xdeh_78", sp = "_bar_1xdeh_117", cp = "_hex_1xdeh_128", dp = "_note_1xdeh_138", B = {
  ladder: Qb,
  cell: Xb,
  empty: Zb,
  name: ep,
  holder: tp,
  request: np,
  swatches: ap,
  swatch: rp,
  tilesFrame: op,
  tiles: lp,
  tile: ip,
  bar: sp,
  hex: cp,
  note: dp
}, dx = "not validated yet, pending a CVD matrix and dark stepping";
function up(e) {
  return e.reserved ? "reserved" : mt(e.step) ? "validated" : "partial";
}
function lr(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function hp(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function mp({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Fe, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${B.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function wp(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function fp(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const ta = (e) => String(e).padStart(2, "0");
function _p(e, t, a) {
  return e === "reserved" ? "Reserved until revalidated" : a ? "yours" : t ?? lr(e, void 0);
}
function vp({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${B.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.hex} ward-ladder-hex`, children: r ? `step ${ta(e)}` : wo(e) }),
    /* @__PURE__ */ n("span", { className: `${B.note} ward-ladder-note`, children: r ? a : `Step ${ta(e)} · ${a}` })
  ] });
}
function bp({ step: e, value: t, taken: a, onChange: r, presentation: o, disabled: i }) {
  const s = up(e), c = lr(s, a), d = c !== "free", u = d || i, h = t === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, y = `${w} · ${o === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...fp(d, h, u), "data-validation": s, style: hp(e, s), onClick: f, onKeyDown: (A) => wp(A, f) }, label: y, name: w, holder: c, validation: s, note: _p(s, a, h), step: e.step };
}
const pp = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${B.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${B.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(vp, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${B.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(mp, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${B.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${B.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function gp(e) {
  return pp[e.presentation](bp(e));
}
function yp(e) {
  for (const t of e)
    if (!t.reserved && !Ot(t.step)) throw new Error("colour ladder renders token steps only");
}
function Np() {
  return /* @__PURE__ */ l("div", { className: `${B.cell} ward-ladder-cell ${B.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${B.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${B.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function kp(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const $p = { list: B.ladder, swatches: B.swatches, tiles: B.tilesFrame };
function Cp() {
  return /* @__PURE__ */ l("div", { className: `${B.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${B.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${B.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Sp = { list: Np, swatches: () => null, tiles: Cp };
function Rp(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function ir(e) {
  const t = e.takenBy ?? {}, a = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  yp(e.steps);
  const r = kp(e), o = Sp[r], i = /* @__PURE__ */ l(x, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(gp, { step: s, value: e.value, taken: t[s.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Rp(e.disabled === !0), className: `${$p[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: B.tiles, children: i }) : i });
}
const Tp = "_rail_s06lm_2", xp = "_section_s06lm_12", Lp = "_sectionFlush_s06lm_22", Ap = "_head_s06lm_26", Ep = "_headLabel_s06lm_34", Ip = "_sample_s06lm_42", Mp = "_sampleLabel_s06lm_47", Bp = "_sampleTitle_s06lm_54", jp = "_sampleMeta_s06lm_59", Pp = "_trace_s06lm_65", qp = "_traceHead_s06lm_70", Op = "_steps_s06lm_78", Hp = "_step_s06lm_78", Dp = "_stepTitle_s06lm_97", Fp = "_hollow_s06lm_107", zp = "_stepBody_s06lm_115", Wp = "_stepDetail_s06lm_127", Kp = "_publish_s06lm_132", Gp = "_reason_s06lm_138", Up = "_note_s06lm_143", Vp = "_reveal_s06lm_148", $ = {
  rail: Tp,
  section: xp,
  sectionFlush: Lp,
  head: Ap,
  headLabel: Ep,
  sample: Ip,
  sampleLabel: Mp,
  sampleTitle: Bp,
  sampleMeta: jp,
  trace: Pp,
  traceHead: qp,
  steps: Op,
  step: Hp,
  stepTitle: Dp,
  hollow: Fp,
  stepBody: zp,
  stepDetail: Wp,
  publish: Kp,
  reason: Gp,
  note: Up,
  reveal: Vp
}, na = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Yp = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Jp = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Qp = { notSimulated: "not simulated", running: "running" };
function Xp(e) {
  return e.presentation === "foundry";
}
function Zp(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const a = t.filter((r) => !r.met);
  return a.length > 0 ? `Publish is disabled: ${a.length} of ${t.length} gate conditions unmet: ${a[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function eg(e, t) {
  var r;
  const a = Yp[e.status];
  return a !== void 0 ? a : ((r = t.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function tg(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function ng(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function ag(e) {
  if (tg(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function rg(e) {
  const [t, a] = p(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function og(e) {
  const t = Qp[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(Fe, { size: 6, kind: Jp[e.kind], label: e.kind });
}
function lg(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function ig(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function sg(e) {
  const { step: t } = e;
  return /* @__PURE__ */ l(rg, { kind: t.kind, children: [
    /* @__PURE__ */ n(og, { kind: t.kind }),
    /* @__PURE__ */ l("span", { className: $.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: $.stepTitle, children: t.title }),
      /* @__PURE__ */ n(lg, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(ig, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function cg(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(ue(t)), a.join(" · ");
}
function sr(e) {
  const t = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.traceHead, id: t, children: cg(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: $.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(sg, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function dg(e) {
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
function ug(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function hg(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? _a(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Ft, { divided: !0, cells: t }) });
}
function mg(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: _a(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function wg(e) {
  const t = mg(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ l("p", { className: $.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Ft, { divided: !0, cells: t }) });
}
function cr(e) {
  const t = k();
  return e.reason !== null ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: `${$.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function fg(e) {
  return /* @__PURE__ */ l("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ n(cr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: $.note, children: e.note })
  ] });
}
function _g(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ n(cr, { reason: e.reason, onPublish: e.onPublish }) });
}
function dr(e) {
  return /* @__PURE__ */ l("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: na[e.run.status].role, label: na[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function vg(e, t) {
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
function bg(e) {
  var a;
  ng(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(dr, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(dg, { sample: e.run.sample }),
    /* @__PURE__ */ n(sr, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(hg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Kt, { items: e.checklist }) }),
    /* @__PURE__ */ n(fg, { reason: Zp(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function pg(e) {
  var r;
  const t = vg(e.run, e.feed);
  ag(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(dr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(ug, { sample: e.run.sample }),
    /* @__PURE__ */ n(sr, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(wg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Kt, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(_g, { reason: eg(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function ux(e) {
  return Xp(e) ? /* @__PURE__ */ n(pg, { ...e }) : /* @__PURE__ */ n(bg, { ...e });
}
const gg = "_list_142ip_3", yg = "_row_142ip_9", Ng = "_condition_142ip_18", kg = "_action_142ip_24", St = {
  list: gg,
  row: yg,
  condition: Ng,
  action: kg
}, ur = Ne(!1);
function hx({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(ur.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: St.list, "aria-label": t, children: e }) });
}
function mx({ rule: e }) {
  if (!ye(ur)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: St.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: St.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: St.action, children: e.then })
  ] });
}
const $g = "_move_tmppt_3", Cg = {
  move: $g
};
function ln(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [o] = r.splice(t, 1);
  return r.splice(a, 0, o), r;
}
function hr(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function mr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function aa(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function Sg(e) {
  return e === "up" ? "down" : "up";
}
function Rg(e, t) {
  const a = aa(e, t.id, t.direction) ?? aa(e, t.id, Sg(t.direction));
  a == null || a.focus();
}
function wr() {
  const e = _(null), [t, a] = p(null), [r, o] = p("");
  return S(() => {
    e.current !== null && t !== null && Rg(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), o(c);
  } };
}
function fr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function It({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${Cg.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const Tg = "_body_1jd1i_2", xg = "_title_1jd1i_8", Lg = "_section_1jd1i_13", Ag = "_legend_1jd1i_18", Eg = "_stages_1jd1i_26", Ig = "_stage_1jd1i_26", Mg = "_stageIndex_1jd1i_44", Bg = "_stageName_1jd1i_50", jg = "_footer_1jd1i_59", Pg = "_note_1jd1i_66", qg = "_reason_1jd1i_71", Og = "_actions_1jd1i_76", Hg = "_webHead_1jd1i_83", Dg = "_kicker_1jd1i_92", Fg = "_webTitle_1jd1i_99", zg = "_webBody_1jd1i_105", Wg = "_webSection_1jd1i_109", Kg = "_sectionHead_1jd1i_121", Gg = "_sectionNote_1jd1i_129", Ug = "_formLabel_1jd1i_134", Vg = "_identityRow_1jd1i_139", Yg = "_nameCell_1jd1i_145", Jg = "_keyCell_1jd1i_150", Qg = "_colourCell_1jd1i_154", Xg = "_colourStatus_1jd1i_161", Zg = "_webStages_1jd1i_166", ey = "_webStageList_1jd1i_172", ty = "_webStage_1jd1i_166", ny = "_webIndex_1jd1i_191", ay = "_webStageName_1jd1i_196", ry = "_webMoves_1jd1i_201", oy = "_addStage_1jd1i_215", ly = "_addStageButton_1jd1i_223", iy = "_addStageNote_1jd1i_231", sy = "_webFooter_1jd1i_236", cy = "_webFooterNotes_1jd1i_244", dy = "_webNote_1jd1i_251", v = {
  body: Tg,
  title: xg,
  section: Lg,
  legend: Ag,
  stages: Eg,
  stage: Ig,
  stageIndex: Mg,
  stageName: Bg,
  footer: jg,
  note: Pg,
  reason: qg,
  actions: Og,
  webHead: Hg,
  kicker: Dg,
  webTitle: Fg,
  webBody: zg,
  webSection: Wg,
  sectionHead: Kg,
  sectionNote: Gg,
  formLabel: Ug,
  identityRow: Vg,
  nameCell: Yg,
  keyCell: Jg,
  colourCell: Qg,
  colourStatus: Xg,
  webStages: Zg,
  webStageList: ey,
  webStage: ty,
  webIndex: ny,
  webStageName: ay,
  webMoves: ry,
  addStage: oy,
  addStageButton: ly,
  addStageNote: iy,
  webFooter: sy,
  webFooterNotes: cy,
  webNote: dy
}, uy = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], _r = "not in catalogue";
function hy(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${_r}` }, ...a];
}
function my({ stage: e, index: t, catalogue: a, onName: r }) {
  const o = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(q, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${_r}`;
  return /* @__PURE__ */ n(q, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: hy(a, e.name), invalid: i, onChange: r });
}
function vr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function wy(e) {
  const t = _([]), a = _(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function fy({ id: e, stage: t, index: a, total: r, catalogue: o, onReplace: i, onMove: s }) {
  const c = vr(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: v.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: v.webStageName, children: /* @__PURE__ */ n(my, { stage: t, index: a, catalogue: o, onName: (u) => i({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(q, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: uy, onChange: (u) => i({ ...t, kind: u }) }),
    /* @__PURE__ */ l("span", { className: v.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(It, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(It, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function _y({ stages: e, onChange: t, catalogue: a }) {
  const r = wy(e.length), o = wr(), i = (c, d) => {
    const u = hr(c, d);
    r.current = ln(r.current, c, u), o.moved({ id: r.current[u], direction: d }, mr(vr(e[c], c), u, e.length)), t(ln(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ l("div", { className: v.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(fy, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(fr, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: v.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const vy = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], by = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], py = "A new stream starts as a draft. Nothing runs on it until you publish it.", gy = "Create is disabled: name the stream and give it a key first.", yy = "reorder with the ↑ ↓ buttons · min 2";
function Nn(e, t) {
  return !e.reserved && mt(e.step) && t[e.step] === void 0;
}
function Ny(e, t) {
  const a = e.find((r) => Nn(r, t));
  return a ? a.step : 1;
}
function ky({ stages: e, onMove: t }) {
  const a = wr(), r = (o, i) => {
    const s = hr(o, i);
    a.moved({ id: e[o].id, direction: i }, mr(e[o].name, s, e.length)), t(o, s);
  };
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: v.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: v.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: v.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(It, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(It, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(fr, { text: a.announcement })
  ] });
}
function $y({ reason: e, onCreate: t, onDraft: a }) {
  const r = k();
  return /* @__PURE__ */ l("div", { className: v.footer, children: [
    /* @__PURE__ */ n("p", { className: v.note, children: py }),
    e && /* @__PURE__ */ n("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: v.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function Cy(e, t) {
  return e !== "" && t !== "" ? null : gy;
}
function Sy(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: o = by, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = k(), [h, w] = p(""), [f, y] = p(""), [N, A] = p(t[0].value), [O, me] = p(() => Ny(a, r)), [re, Ee] = p(e.stages ?? vy), [Ye, T] = p(o[0].value), J = { name: h, key: f, streamStep: O, owner: N, stages: re, policy: Ye }, ke = Cy(h, f);
  return /* @__PURE__ */ n(ot, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ l("div", { className: v.body, children: [
    /* @__PURE__ */ n("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ n(q, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ n(q, { kind: "input", label: "Key", value: f, onChange: y, mono: !0 }),
      /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: N, onChange: A, options: t })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ n(ir, { label: "Stream colour", steps: a, value: O, onChange: me, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ n(ky, { stages: re, onMove: (ze, Wr) => Ee(ln(re, ze, Wr)) })
    ] }),
    /* @__PURE__ */ n(Ja, { legend: "Loop policy", options: o, value: Ye, onChange: T }),
    /* @__PURE__ */ n($y, { reason: ke, onCreate: () => i(J), onDraft: () => s(J) })
  ] }) });
}
const br = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Ry = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Ty(e, t, a, r, o, i) {
  var c;
  const s = ((c = br.find((d) => d.value === o)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: i };
}
function xy(e, t) {
  return Ly(e) && Ay(e, t) && Ey(e);
}
function Ly(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Ay(e, t) {
  return e.colourStep === null || Nn({ step: e.colourStep }, t);
}
function Ey(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function Iy(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : Nn({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function My({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function By({ ready: e, draft: t, agentStage: a, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: v.webFooter, children: [
    /* @__PURE__ */ l("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ n(My, { stage: a }),
      !e && /* @__PURE__ */ n("p", { id: i, className: v.reason, children: Ry })
    ] }),
    o && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => o(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function jy({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: v.webHead, children: [
    /* @__PURE__ */ n("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function Py({ name: e, setName: t, streamKey: a, setKey: r, colour: o, owner: i }) {
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
function qy(e) {
  const t = k(), a = k(), r = e.takenBy ?? {}, [o, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [f, y] = p("relay"), [N, A] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), O = Ty(o, s, d, h, f, N), me = xy(O, r), re = N.find((T) => T.kind === "agent" && T.name.trim() !== ""), Ee = /* @__PURE__ */ l("div", { className: v.colourCell, children: [
    /* @__PURE__ */ n("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(ir, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ye = /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: v.colourStatus, "data-colour-status": "", children: Iy(h, r) }),
    /* @__PURE__ */ n(q, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((T) => ({ value: T, label: T })), onChange: u })
  ] });
  return /* @__PURE__ */ l(ot, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(jy, { titleId: a }),
    /* @__PURE__ */ l("div", { className: v.webBody, children: [
      /* @__PURE__ */ n(Py, { name: o, setName: i, streamKey: s, setKey: c, colour: Ee, owner: Ye }),
      e.fields && /* @__PURE__ */ n("section", { className: v.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ l("section", { className: v.webSection, children: [
        /* @__PURE__ */ l("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: v.sectionNote, children: yy })
        ] }),
        /* @__PURE__ */ n(_y, { stages: N, onChange: A })
      ] }),
      /* @__PURE__ */ n("section", { className: v.webSection, children: /* @__PURE__ */ n(Ja, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: br, onChange: y }) }),
      /* @__PURE__ */ n(By, { ready: me, draft: O, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function wx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(qy, { ...e }) : /* @__PURE__ */ n(Sy, { ...e });
}
const Oy = "_row_bs8hc_2", Hy = "_cell_bs8hc_6", Dy = "_condition_bs8hc_11", Fy = "_action_bs8hc_18", zy = "_contract_bs8hc_24", Wy = "_contractCondition_bs8hc_33", Ky = "_contractAction_bs8hc_39", ne = {
  row: Oy,
  cell: Hy,
  condition: Dy,
  action: Fy,
  contract: zy,
  contractCondition: Wy,
  contractAction: Ky
}, pr = ["advance", "block", "escalate", "requestReview"], ra = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Mt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function kn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ne.action, children: ra[e.then] }) : /* @__PURE__ */ n(
    q,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => t({ ...e, then: o }),
      options: pr.map((o) => ({ value: o, label: ra[o] }))
    }
  );
}
function Gy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n("span", { className: ne.condition, title: Mt(e, r), children: Mt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: kn(e, t, a) })
  ] });
}
function Uy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ l("td", { className: ne.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ne.condition, children: Mt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: kn(e, t, a) })
  ] });
}
function Vy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: ne.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ne.contractCondition, children: Mt(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ne.contractAction, children: kn(e, t, a, !0) })
  ] });
}
const Yy = { two: Uy, four: Gy, contract: Vy };
function fx(e) {
  var a;
  if (!pr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = Yy[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const Jy = "_column_g1uat_2", Qy = "_head_g1uat_17", Xy = "_index_g1uat_23", Zy = "_name_g1uat_29", eN = "_meta_g1uat_38", tN = "_mono_g1uat_43", nN = "_gate_g1uat_50", aN = "_reviewersLabel_g1uat_57", rN = "_reviewers_g1uat_57", oN = "_reviewer_g1uat_57", lN = "_agents_g1uat_74", iN = "_workflowColumn_g1uat_79", sN = "_workflowHead_g1uat_96", cN = "_stageRow_g1uat_102", dN = "_stageLabel_g1uat_109", uN = "_workflowTitle_g1uat_116", hN = "_workflowMeta_g1uat_122", mN = "_workflowGate_g1uat_127", wN = "_gateNote_g1uat_135", fN = "_cardNote_g1uat_140", _N = "_reviewerList_g1uat_145", vN = "_reviewerRow_g1uat_151", bN = "_reviewerMark_g1uat_157", pN = "_reviewerName_g1uat_167", gN = "_terminalCard_g1uat_173", yN = "_terminalCount_g1uat_182", NN = "_workflowAgents_g1uat_188", kN = "_mount_g1uat_194", R = {
  column: Jy,
  head: Qy,
  index: Xy,
  name: Zy,
  meta: eN,
  mono: tN,
  gate: nN,
  reviewersLabel: aN,
  reviewers: rN,
  reviewer: oN,
  agents: lN,
  workflowColumn: iN,
  workflowHead: sN,
  stageRow: cN,
  stageLabel: dN,
  workflowTitle: uN,
  workflowMeta: hN,
  workflowGate: mN,
  gateNote: wN,
  cardNote: fN,
  reviewerList: _N,
  reviewerRow: vN,
  reviewerMark: bN,
  reviewerName: pN,
  terminalCard: gN,
  terminalCount: yN,
  workflowAgents: NN,
  mount: kN
}, $N = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function $n(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function gr(e) {
  return `${Math.round(e * 100)}%`;
}
function CN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Ft, { cells: [
      { value: gr(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function SN({ stage: e }) {
  return /* @__PURE__ */ n(Ft, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: $n(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function RN({ stage: e, titleId: t }) {
  return /* @__PURE__ */ l("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: $N[e.kind] })
  ] });
}
function TN({ stage: e }) {
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
function xN({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(CN, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(SN, { stage: e }) : null;
}
function LN({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function AN({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const o = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: R.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(RN, { stage: e, titleId: o }),
    /* @__PURE__ */ n(TN, { stage: e }),
    /* @__PURE__ */ n(xN, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(Bb, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(LN, { onMount: a })
  ] });
}
const EN = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function IN({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ l("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function MN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: R.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ n(IN, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: gr(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function BN(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function jN({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: $n(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: BN(e.rolledBackThisWeek) })
  ] });
}
function PN(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function qN(e) {
  if (e.kind === "terminal") return `${$n(e.closedThisWeek)} this week`;
  const t = PN(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function ON({ stage: e, titleId: t }) {
  const a = EN[e.kind];
  return /* @__PURE__ */ l("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: R.stageRow, children: [
      /* @__PURE__ */ l("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: qN(e) })
  ] });
}
function HN(e) {
  return e === "entry" || e === "agent";
}
function DN({ stage: e, onMount: t }) {
  return t === void 0 || !HN(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Mount agent" });
}
function FN({ stage: e, agentCards: t, onMount: a }) {
  const r = k();
  return /* @__PURE__ */ l("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(ON, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(MN, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(jN, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(DN, { stage: e, onMount: a })
  ] });
}
function zN(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function _x(e) {
  return zN(e) ? /* @__PURE__ */ n(FN, { ...e }) : /* @__PURE__ */ n(AN, { ...e });
}
const WN = "_row_1tdra_6", KN = "_name_1tdra_12", GN = "_compactRow_1tdra_13", UN = "_compactName_1tdra_13", VN = "_cell_1tdra_30", YN = "_chain_1tdra_45", JN = "_owner_1tdra_51", QN = "_mono_1tdra_57", XN = "_compactCell_1tdra_79", ZN = "_stack_1tdra_96", e1 = "_stat_1tdra_103", t1 = "_identityLine_1tdra_110", n1 = "_identity_1tdra_110", a1 = "_ownerLine_1tdra_140", r1 = "_link_1tdra_160", o1 = "_gateMark_1tdra_166", l1 = "_emptyChain_1tdra_171", i1 = "_arrow_1tdra_177", s1 = "_muted_1tdra_182", c1 = "_define_1tdra_187", d1 = "_statValue_1tdra_194", u1 = "_policyId_1tdra_200", h1 = "_sub_1tdra_205", g = {
  row: WN,
  name: KN,
  compactRow: GN,
  compactName: UN,
  cell: VN,
  chain: YN,
  owner: JN,
  mono: QN,
  compactCell: XN,
  stack: ZN,
  stat: e1,
  identityLine: t1,
  identity: n1,
  ownerLine: a1,
  link: r1,
  gateMark: o1,
  emptyChain: l1,
  arrow: i1,
  muted: s1,
  define: c1,
  statValue: d1,
  policyId: u1,
  sub: h1
};
function yr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function m1(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function w1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Nr(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function f1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Nr(e.members)}`;
}
function _1(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ l("span", { className: g.stack, children: [
    /* @__PURE__ */ l("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: I(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: f1(e) })
  ] }) });
}
function kr({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ l(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function v1(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = ft(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function b1({ stages: e, streamStep: t }) {
  const a = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((o, i) => /* @__PURE__ */ l("span", { className: g.link, children: [
    /* @__PURE__ */ n(kr, { name: o.name, gate: o.gate === !0, look: v1(i, a, t), size: "tag" }),
    i === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${i}`)) });
}
function p1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ l("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : b1(e) });
}
function $r(e) {
  return e === void 0 ? void 0 : !0;
}
function oa(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": $r(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function g1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function y1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function N1({ stream: e, href: t, presentation: a }) {
  const r = w1(a.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, onClick: yr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ge(e.streamStep, "chip") }, children: [
    _1(e, t),
    p1(e),
    oa(y1(e.agents), e.agents === void 0 ? void 0 : m1(e.agents), "—"),
    g1(e.policy),
    oa(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function k1(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function vx(e) {
  if (k1(e)) return N1(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ l("tr", { className: g.row, onClick: yr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ l("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: I(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...Dt(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(kr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: g.mono, children: Nr(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": $r(t.inFlightHint), children: ae(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : ue(t.p50) }) })
  ] });
}
const $1 = "_row_2u4ll_2", C1 = "_name_2u4ll_16", S1 = "_scope_2u4ll_24", Bt = {
  row: $1,
  name: C1,
  scope: S1
};
function Cn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function R1(e) {
  return e === void 0 ? `${Bt.row} ward-toolrow` : `${Bt.row} ward-toolrow ${e}`;
}
function T1(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function x1({ id: e, reasonId: t, tool: a, state: r, onChange: o }) {
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
function L1({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: Cn(e) });
}
function A1({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${Bt.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function E1(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function bx({ tool: e, onChange: t, presentation: a }) {
  const r = k(), o = k(), i = T1(e, a), s = E1(a);
  return /* @__PURE__ */ l(s, { className: R1(a == null ? void 0 : a.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(x1, { id: r, reasonId: o, tool: e, state: i, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${Bt.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(A1, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(L1, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const I1 = "_strip_4ppv9_2", M1 = "_well_4ppv9_11", B1 = "_head_4ppv9_18", j1 = "_name_4ppv9_24", P1 = "_chart_4ppv9_32", q1 = "_segment_4ppv9_38", O1 = "_detailedChart_4ppv9_44", H1 = "_rail_4ppv9_57", D1 = "_section_4ppv9_63", F1 = "_label_4ppv9_74", z1 = "_note_4ppv9_91", V = {
  strip: I1,
  well: M1,
  head: B1,
  name: j1,
  chart: P1,
  segment: q1,
  detailedChart: O1,
  rail: H1,
  section: D1,
  label: F1,
  note: z1
}, W1 = "No item in flight to preview.", K1 = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", G1 = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", sn = [1, 2, 3, 4, 5, 6], jt = 100;
function U1(e, t) {
  return t.has(e) ? ge(e, "id") : "var(--ward-color-line)";
}
function V1({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: sn.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: o * jt,
      y: "0",
      width: jt,
      height: "8",
      fill: U1(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Y1(e) {
  const t = e.slice(0, sn.length);
  for (; t.length < sn.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function J1({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${V.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, a) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(a * jt),
        y: "0",
        width: String(jt),
        height: "40",
        style: { fill: ge(t.streamStep, "chip") }
      },
      t.key + String(a)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((t, a) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(a))) })
  ] });
}
function Cr(e) {
  return (t) => e == null ? void 0 : e(t);
}
function pt({ label: e, children: t }) {
  const a = k();
  return /* @__PURE__ */ l("section", { className: V.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: V.label, children: e }),
    t
  ] });
}
function Q1({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: t ?? W1 }) : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Wt, { item: { ...e, streamStep: ft(a.streamStep) }, onOpen: Cr(r), feed: null }) });
}
function X1({ draft: e }) {
  const t = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: V.head, style: t, children: [
    /* @__PURE__ */ n(Fe, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Dt(e.key, e.streamStep) })
  ] });
}
function Z1(e) {
  const t = Y1(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ l("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(pt, { label: "Board card", children: /* @__PURE__ */ n(Q1, { ...e, draft: a }) }),
    /* @__PURE__ */ n(pt, { label: "Streams index row", children: /* @__PURE__ */ n(X1, { draft: a }) }),
    /* @__PURE__ */ l(pt, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(J1, { identities: t }),
      /* @__PURE__ */ n("p", { className: V.note, children: K1 })
    ] }),
    /* @__PURE__ */ n(pt, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: G1 }) })
  ] });
}
function ek({ draft: e, sample: t, streams: a, onOpen: r }) {
  const o = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: V.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: V.head, children: [
      /* @__PURE__ */ n(Fe, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Dt(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Wt, { item: { ...t, streamStep: e.streamStep }, onOpen: Cr(r) }) }),
    /* @__PURE__ */ n(V1, { draft: e, streams: a })
  ] });
}
function px(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Z1, { ...e }) : /* @__PURE__ */ n(ek, { ...e });
}
const tk = "_row_ixlg5_6", nk = "_headCell_ixlg5_10", ak = "_cell_ixlg5_11", rk = "_name_ixlg5_23", ok = "_consequence_ixlg5_29", lk = "_governed_ixlg5_36", ik = "_control_ixlg5_42", sk = "_byRole_ixlg5_48", ck = "_webControl_ixlg5_59", dk = "_webConsequence_ixlg5_65", uk = "_webGoverned_ixlg5_71", W = {
  row: tk,
  headCell: nk,
  cell: ak,
  name: rk,
  consequence: ok,
  governed: lk,
  control: ik,
  byRole: sk,
  webControl: ck,
  webConsequence: dk,
  webGoverned: uk
};
function hk({
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
function mk({ capability: e, cells: t, onChange: a }) {
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
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(hk, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function wk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function fk({ name: e, cell: t, onChange: a }) {
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
function _k({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ l("tr", { className: W.row, children: [
    /* @__PURE__ */ l("td", { className: W.cell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${W.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(fk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webGoverned} ward-cellmeta`, children: wk(e) }) })
  ] });
}
function gx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(_k, { ...e }) : /* @__PURE__ */ n(mk, { ...e });
}
const vk = "_row_vv64h_2", bk = "_cell_vv64h_6", pk = "_name_vv64h_25", gk = "_note_vv64h_30", yk = "_webName_vv64h_41", Nk = "_webMeta_vv64h_47", X = {
  row: vk,
  cell: bk,
  name: pk,
  note: gk,
  webName: yk,
  webMeta: Nk
}, Sr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function kk(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function $k({ component: e, onRestart: t }) {
  const a = k(), r = Sr[e.state], o = e.state === "drainFirst";
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
function Ck({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: kk(e.state) });
}
function Sk({ component: e, onRestart: t }) {
  return /* @__PURE__ */ l("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { ...Sr[e.state] }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(Ck, { component: e, onRestart: t }) })
  ] });
}
function yx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Sk, { ...e }) : /* @__PURE__ */ n($k, { ...e });
}
const Rk = "_row_jcm5k_7", Tk = "_cell_jcm5k_11", xk = "_next_jcm5k_28", Lk = "_headCell_jcm5k_38", Ak = "_webId_jcm5k_77", Ek = "_webPurpose_jcm5k_83", Ik = "_webMeta_jcm5k_91", Mk = "_webUrgent_jcm5k_97", K = {
  row: Rk,
  cell: Tk,
  next: xk,
  headCell: Lk,
  webId: Ak,
  webPurpose: Ek,
  webMeta: Ik,
  webUrgent: Mk
}, Bk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, jk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Rr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Pk = Object.fromEntries(Rr.map((e) => [e.key, e]));
function Qe({ column: e, children: t }) {
  const a = Pk[e];
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
function Nx() {
  return /* @__PURE__ */ n("tr", { children: Rr.map((e) => /* @__PURE__ */ n(
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
function qk({ cred: e }) {
  const t = Bk[e.state];
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n(Qe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Qe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Qe, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(Qe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Cn(e.cls) }) }),
    /* @__PURE__ */ n(Qe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Qe, { column: "next", children: /* @__PURE__ */ n("span", { className: K.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Ok({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${K.webMeta} ${K.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function Hk({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(Ok, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...jk[e.state] }) })
  ] });
}
function kx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Hk, { ...e }) : /* @__PURE__ */ n(qk, { ...e });
}
const Dk = "_card_lpp45_2", Fk = "_head_lpp45_11", zk = "_env_lpp45_18", Wk = "_version_lpp45_25", Kk = "_meta_lpp45_32", Gk = "_webCard_lpp45_37", Uk = "_webRow_lpp45_47", Vk = "_webTitle_lpp45_55", Yk = "_webLine_lpp45_65", Jk = "_webVersion_lpp45_72", Qk = "_webMeta_lpp45_77", Q = {
  card: Dk,
  head: Fk,
  env: zk,
  version: Wk,
  meta: Kk,
  webCard: Gk,
  webRow: Uk,
  webTitle: Vk,
  webLine: Yk,
  webVersion: Jk,
  webMeta: Qk
}, la = { dev: "Dev", uat: "UAT", prod: "Prod" }, Tr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function Xk({ env: e }) {
  const t = Tr[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l("section", { className: Q.card, "aria-label": la[e.env], children: [
    /* @__PURE__ */ l("div", { className: Q.head, children: [
      /* @__PURE__ */ n("span", { className: Q.env, children: la[e.env] }),
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
function Zk(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function e$(e) {
  return /* @__PURE__ */ l("article", { className: `${Q.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${Q.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Q.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Tr[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Q.version} ${Q.webVersion} ${Q.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Q.meta} ${Q.webMeta} ${Q.webLine} ward-cellmeta`, children: Zk(e) })
  ] });
}
function $x(e) {
  return "presentation" in e ? /* @__PURE__ */ n(e$, { ...e }) : /* @__PURE__ */ n(Xk, { ...e });
}
const t$ = "_panel_1hmja_2", n$ = "_line_1hmja_8", a$ = "_actions_1hmja_14", gt = {
  panel: t$,
  line: n$,
  actions: a$
};
function Cx(e) {
  return /* @__PURE__ */ l("div", { className: gt.panel, children: [
    /* @__PURE__ */ n("p", { className: gt.line, children: e.status }),
    /* @__PURE__ */ n(q, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: gt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: gt.line, children: e.note ?? "" })
  ] });
}
const r$ = "_upload_13fcl_2", o$ = "_preview_13fcl_7", l$ = "_mark_13fcl_17", i$ = "_empty_13fcl_22", s$ = "_actions_13fcl_28", c$ = "_input_13fcl_33", d$ = "_reasons_13fcl_41", u$ = "_reason_13fcl_41", h$ = "_accepted_13fcl_57", oe = {
  upload: r$,
  preview: o$,
  mark: l$,
  empty: i$,
  actions: s$,
  input: c$,
  reasons: d$,
  reason: u$,
  accepted: h$
}, xr = 1.5, Lr = 22, Pt = "script elements or event handlers", je = "links or external references", xe = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${xr}px at ${Lr}px`], m$ = [xe[1], xe[2], Pt, je], w$ = /* @__PURE__ */ new Map([
  ["image", xe[1]],
  ["text", xe[2]],
  ["tspan", xe[2]],
  ["textPath", xe[2]],
  ["script", Pt],
  ["foreignObject", Pt],
  ["a", je],
  ["use", je],
  ["style", je],
  ["feImage", je],
  ["set", je]
]), f$ = "http://www.w3.org/2000/svg", _$ = "http://www.w3.org/2000/xmlns/", v$ = /* @__PURE__ */ new Set([
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
]), b$ = /* @__PURE__ */ new Set([
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
]), Sn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, p$ = /url\s*\(|['"\\]/i;
function g$() {
  return { ok: !1, reasons: [xe[1]] };
}
function Ar(e) {
  return e.namespaceURI === f$;
}
function y$(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && Ar(t) ? t : null;
  } catch {
    return null;
  }
}
function N$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [xe[0]] : [];
}
function k$(e) {
  return w$.get(e.localName) ?? (e.localName.startsWith("animate") ? je : void 0);
}
function $$(e) {
  return p$.test(e.replace(Sn, ""));
}
function C$(e) {
  return /^on/i.test(e.localName) ? Pt : e.localName === "href" || $$(e.value) ? je : void 0;
}
function S$(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(k$(a));
    for (const r of Array.from(a.attributes)) t.add(C$(r));
  }
  return m$.filter((a) => t.has(a));
}
function R$(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((o) => Number.isFinite(o) && o > 0), 0), r = a > 0 ? Lr / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < xr;
  }) ? [xe[3]] : [];
}
function T$(e) {
  if (e.namespaceURI === _$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (b$.has(t) || t.startsWith("stroke"));
}
function x$(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && Ar(t) && v$.has(t.localName);
}
function L$(e, t) {
  x$(t) ? t.nodeType === Node.ELEMENT_NODE && Er(t) : e.removeChild(t);
}
function Er(e) {
  for (const t of Array.from(e.attributes)) T$(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) L$(e, t);
  return e;
}
function A$(e) {
  return Array.from(e.matchAll(Sn), (t) => t[2]).filter((t) => t !== "");
}
function E$(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function I$(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const i of A$(o.value)) a.has(i) || a.set(i, `${t}-${a.size}`);
  return a;
}
function M$(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(Sn, (r, o, i) => {
      const s = t.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function B$(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = I$(a, t);
  for (const o of a) {
    const i = r.get(o.getAttribute("id") ?? "");
    i === void 0 ? o.removeAttribute("id") : o.setAttribute("id", i), M$(o, r);
  }
  return e;
}
function Sx(e) {
  const t = y$(e);
  if (t === null) return g$();
  const a = [...N$(t), ...S$(t), ...R$(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(B$(Er(t), E$(e))) };
}
const j$ = "Mark accepted.", P$ = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, q$ = new Set(ba.flatMap((e) => [ge(e, "id"), ge(e, "chip")]));
function O$(e) {
  return e !== void 0 && (P$.test(e) || q$.has(e)) ? e : void 0;
}
function H$({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: oe.preview, style: { "--mark": O$(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: oe.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: oe.empty }) });
}
function D$(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function F$(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function z$({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: oe.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("p", { className: oe.accepted, children: j$ }) }) : /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("ul", { className: oe.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: oe.reason, children: t }, t)) }) });
}
function W$({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(z$, { result: e }) : /* @__PURE__ */ n("p", { className: `${oe.result} ${D$(e, a)}`, role: "status", children: F$(e, a) });
}
function ia(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function Rx({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: o }) {
  const i = _(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ l("div", { className: oe.upload, children: [
    /* @__PURE__ */ n(H$, { current: e }),
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
      /* @__PURE__ */ n(b, { ...ia(o), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...ia(o), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(W$, { result: s, presentation: r })
  ] });
}
const K$ = "_row_o3t6y_7", G$ = "_cell_o3t6y_11", U$ = "_head_o3t6y_28", V$ = "_name_o3t6y_34", Y$ = "_pinned_o3t6y_42", J$ = "_headCell_o3t6y_49", Q$ = "_webName_o3t6y_88", X$ = "_webMeta_o3t6y_95", Z$ = "_webWarn_o3t6y_103", D = {
  row: K$,
  cell: G$,
  head: U$,
  name: V$,
  pinned: Y$,
  headCell: J$,
  webName: Q$,
  webMeta: X$,
  webWarn: Z$
}, Rn = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Ir = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], e0 = Object.fromEntries(Ir.map((e) => [e.key, e]));
function t0(e, t) {
  return `mcp.${e}.${t}`;
}
function n0(e) {
  return Object.keys(Rn).includes(e);
}
function a0(e) {
  return Rn[e !== void 0 && n0(e) ? e : "unknown"];
}
function lt({ column: e, children: t }) {
  const a = e0[e];
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
function Tx() {
  return /* @__PURE__ */ n("tr", { children: Ir.map((e) => /* @__PURE__ */ n(
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
function r0({ server: e }) {
  const t = Rn[e.connection];
  return /* @__PURE__ */ l("tr", { className: D.row, children: [
    /* @__PURE__ */ l(lt, { column: "name", children: [
      /* @__PURE__ */ l("span", { className: D.head, children: [
        /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Cn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ l("span", { className: D.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(lt, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(lt, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(lt, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(lt, { column: "tools", children: e.tools.map((a) => t0(e.name, a)).join(" · ") })
  ] });
}
function o0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function l0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function i0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${D.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e });
}
function s0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function c0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function d0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: D.row, children: [
    /* @__PURE__ */ l("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: `${D.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: o0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...l0(e) }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(i0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...a0(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: D.cell, children: [
      /* @__PURE__ */ n(s0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(c0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function xx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(d0, { ...e }) : /* @__PURE__ */ n(r0, { ...e });
}
const u0 = "_row_1ibo7_2", h0 = "_headCell_1ibo7_14", m0 = "_cell_1ibo7_15", w0 = "_name_1ibo7_26", f0 = "_consequence_1ibo7_32", _0 = "_reason_1ibo7_38", v0 = "_value_1ibo7_44", b0 = "_webRow_1ibo7_60", p0 = "_webSetting_1ibo7_73", g0 = "_webName_1ibo7_81", y0 = "_webConsequence_1ibo7_89", N0 = "_webControl_1ibo7_95", k0 = "_webState_1ibo7_109", $0 = "_webChip_1ibo7_114", P = {
  row: u0,
  headCell: h0,
  cell: m0,
  name: w0,
  consequence: f0,
  reason: _0,
  value: v0,
  webRow: b0,
  webSetting: p0,
  webName: g0,
  webConsequence: y0,
  webControl: N0,
  webState: k0,
  webChip: $0
}, Mr = 104, Br = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function C0({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ve, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(Va, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: P.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function S0({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = k(), i = Br[a], s = a === "locked";
  return /* @__PURE__ */ l("tr", { className: P.row, "data-inheritance": a, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: P.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(C0, { control: t, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: P.cell, style: { width: Mr }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function jr(e, t) {
  return String(e ?? t);
}
function R0(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function T0(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? jr(e.value, "—");
}
function x0({ control: e, name: t, locked: a, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: P.webControl, children: [
    /* @__PURE__ */ n(Ve, { label: t, labelHidden: !0, checked: i, locked: a, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ n("span", { className: P.webState, "aria-hidden": "true", children: a || i ? "on" : "off" })
  ] });
}
function L0(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(x0, { ...e });
  const o = R0(t, a);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: P.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(Va, { options: o, value: jr(t.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: T0(t) });
}
function A0({ setting: e, control: t, inheritance: a, reason: r, onChange: o, renderControl: i }) {
  const s = k(), c = a === "locked";
  return /* @__PURE__ */ l("div", { className: `${P.row} ${P.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ l("span", { className: P.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${P.name} ${P.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: s, className: `${P.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: P.webControl, children: i(s) }) : /* @__PURE__ */ n(L0, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${P.webChip} ward-policy-chip`, style: { width: Mr }, children: /* @__PURE__ */ n(m, { ...Br[a], size: "tag" }) })
  ] });
}
function Lx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(A0, { ...e }) : /* @__PURE__ */ n(S0, { ...e });
}
const E0 = "_label_h9m4w_7", I0 = "_name_h9m4w_15", M0 = "_column_h9m4w_24", B0 = "_webFrame_h9m4w_57", j0 = "_webHead_h9m4w_62", P0 = "_webHeadLabel_h9m4w_74", q0 = "_webLabel_h9m4w_117", O0 = "_webColumns_h9m4w_124", H0 = "_webGroup_h9m4w_130", D0 = "_webPeople_h9m4w_131", F0 = "_webVia_h9m4w_132", z0 = "_webMeta_h9m4w_161", G = {
  label: E0,
  name: I0,
  column: M0,
  webFrame: B0,
  webHead: j0,
  webHeadLabel: P0,
  webLabel: q0,
  webColumns: O0,
  webGroup: H0,
  webPeople: D0,
  webVia: F0,
  webMeta: z0
}, W0 = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, Xt = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Zt({ column: e, children: t }) {
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
function K0(e) {
  if (!e.matrixRole) return;
  const t = W0[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function G0({ node: e }) {
  const t = K0(e);
  return /* @__PURE__ */ l("span", { className: G.label, children: [
    /* @__PURE__ */ n("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ n(U0, { role: t, node: e }),
    /* @__PURE__ */ n(Zt, { column: Xt[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Zt, { column: Xt[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Zt, { column: Xt[2], children: e.requestedVia ?? "" })
  ] });
}
function U0({ role: e, node: t }) {
  return /* @__PURE__ */ l(x, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function V0({ index: e, depth: t, node: a, expanded: r, leaf: o, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    tr,
    {
      index: e,
      depth: t,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(G0, { node: a }),
      children: s
    }
  );
}
function en({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function Y0({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(en, { className: `${G.webMeta} ${G.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(en, { className: `${G.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(en, { className: `${G.webMeta} ${G.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function J0() {
  return /* @__PURE__ */ l("div", { className: G.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: G.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: G.webColumns, children: [
      /* @__PURE__ */ n("span", { className: G.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: G.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: G.webVia, children: "Requested via" })
    ] })
  ] });
}
function Q0({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function X0(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Z0({ rows: e, label: t }) {
  return /* @__PURE__ */ l("div", { className: G.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(J0, {}),
    /* @__PURE__ */ n(xw, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      tr,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(Q0, { row: a }),
        detail: /* @__PURE__ */ n(Y0, { row: a }),
        expanded: X0(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function Ax(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Z0, { ...e }) : /* @__PURE__ */ n(V0, { ...e });
}
const eC = "_runbook_b9agc_2", tC = "_list_b9agc_7", nC = "_step_b9agc_15", aC = "_numeral_b9agc_21", rC = "_body_b9agc_28", oC = "_head_b9agc_34", lC = "_title_b9agc_40", iC = "_detail_b9agc_45", sC = "_actions_b9agc_50", cC = "_webList_b9agc_56", dC = "_webStep_b9agc_60", uC = "_webBody_b9agc_66", hC = "_webTitle_b9agc_74", mC = "_webDetail_b9agc_78", M = {
  runbook: eC,
  list: tC,
  step: nC,
  numeral: aC,
  body: rC,
  head: oC,
  title: lC,
  detail: iC,
  actions: sC,
  webList: cC,
  webStep: dC,
  webBody: uC,
  webTitle: hC,
  webDetail: mC
}, Pr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function qr(e) {
  return String(e + 1).padStart(2, "0");
}
function wC({ step: e, index: t, connection: a }) {
  const r = Pr[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: M.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: M.numeral, children: qr(t) }),
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
function fC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: M.list, children: e.map((r, o) => /* @__PURE__ */ n(wC, { step: r, index: o, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: M.actions, children: t })
  ] });
}
function _C({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ l("li", { className: `${M.step} ${M.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${M.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: qr(t) }),
    /* @__PURE__ */ l("span", { className: `${M.body} ${M.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${M.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${M.title} ${M.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Pr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${M.detail} ${M.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function vC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${M.list} ${M.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(_C, { step: r, index: o, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${M.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function Ex(e) {
  return "presentation" in e ? /* @__PURE__ */ n(vC, { ...e }) : /* @__PURE__ */ n(fC, { ...e });
}
const bC = "_list_1gu6a_2", pC = "_check_1gu6a_10", gC = "_body_1gu6a_16", yC = "_text_1gu6a_23", NC = "_pending_1gu6a_32", kC = "_measured_1gu6a_37", et = {
  list: bC,
  check: pC,
  body: gC,
  text: yC,
  pending: NC,
  measured: kC
};
function $C(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function CC({ check: e }) {
  const t = $C(e.passed);
  return /* @__PURE__ */ l("li", { className: `${et.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(pn, { state: t.state, label: t.label }),
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
function Ix({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${et.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(CC, { check: t }, t.text)) });
}
const SC = "_root_y6bbq_2", RC = "_list_y6bbq_10", TC = "_line_y6bbq_32", xC = "_at_y6bbq_59", LC = "_text_y6bbq_63", AC = "_foot_y6bbq_67", EC = "_idle_y6bbq_79", IC = "_caret_y6bbq_87", MC = "_jump_y6bbq_94", ve = {
  root: SC,
  list: RC,
  line: TC,
  at: xC,
  text: LC,
  foot: AC,
  idle: EC,
  caret: IC,
  jump: MC
}, BC = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Tn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : BC.format(new Date(e));
}
const jC = { warn: "warning", ok: "ok" };
function PC({ kind: e }) {
  const t = jC[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function qC({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Tn(e)}` });
}
function OC({ connection: e, idleSince: t, last: a, children: r }) {
  const o = [t, a == null ? void 0 : a.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Tn(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${ve.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ve.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ve.idle, children: i }),
    /* @__PURE__ */ n(qC, { at: a == null ? void 0 : a.at }),
    r
  ] });
}
const HC = 8;
function DC(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > HC;
}
function FC({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const Or = Ne(null);
function Mx({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, o] = p(!1), i = ma(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(Or.Provider, { value: i, children: a });
}
function zC() {
  const e = ye(Or), [t, a] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const WC = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function Bx({ lines: e, connection: t, idleSince: a, label: r = "Live activity", fixed: o }) {
  const i = _(null), [s, c] = p(0), [d, u] = zC(), [h, w] = p(!1), f = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), nt(() => {
    const N = i.current;
    N && !h && (N.scrollTop = N.scrollHeight);
  }, [e.length, h]);
  const y = () => {
    var O;
    const N = i.current;
    if (!N) return;
    const A = N.querySelectorAll("[data-consline-text]");
    (O = A.item(A.length - 1)) == null || O.focus(), w(!1);
  };
  return /* @__PURE__ */ l("div", { className: ve.root, children: [
    /* @__PURE__ */ n("ol", { className: ve.list, ref: i, "aria-live": d ? "polite" : "off", "aria-label": r, ...WC(e.length, o), onScroll: (N) => w(DC(N.currentTarget)), children: e.map((N, A) => /* @__PURE__ */ l("li", { className: `${ve.line} ward-consline ward-reveal ward-consline--${N.kind}`, "data-kind": N.kind, "data-revealed": A < s, children: [
      /* @__PURE__ */ n("span", { className: ve.at, children: Tn(N.at) }),
      /* @__PURE__ */ n(PC, { kind: N.kind }),
      /* @__PURE__ */ n("span", { className: ve.text, "data-consline-text": !0, tabIndex: -1, children: N.text })
    ] }, `${N.at}-${A}`)) }),
    /* @__PURE__ */ l(OC, { connection: t, idleSince: a, last: f, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(FC, { shown: h, onJump: y })
    ] })
  ] });
}
const KC = "_row_1k8wl_2", GC = "_head_1k8wl_14", UC = "_author_1k8wl_20", VC = "_eta_1k8wl_25", YC = "_edited_1k8wl_26", JC = "_body_1k8wl_32", QC = "_reason_1k8wl_37", XC = "_actions_1k8wl_42", Ce = {
  row: KC,
  head: GC,
  author: UC,
  eta: VC,
  edited: YC,
  body: JC,
  reason: QC,
  actions: XC
}, ZC = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function eS(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function tS({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
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
function nS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Ce.reason, id: t, children: e })
  ] });
}
function aS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function rS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(tS, { ...e }) : /* @__PURE__ */ n(nS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function jx(e) {
  const { comment: t } = e;
  aS(e);
  const a = k(), r = `${a}-unavailable`, o = ZC[t.delivery];
  return /* @__PURE__ */ l("div", { className: `${Ce.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: Ce.head, children: [
      /* @__PURE__ */ n("span", { className: Ce.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: Ce.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Ce.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Ce.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Ce.reason, id: a, children: eS(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Ce.actions, children: /* @__PURE__ */ n(rS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const oS = "_root_rvhdw_2", lS = "_attach_rvhdw_11", iS = "_actions_rvhdw_17", sS = "_reply_rvhdw_23", cS = "_replyField_rvhdw_28", dS = "_send_rvhdw_54", uS = "_sendIcon_rvhdw_65", hS = "_sendsAs_rvhdw_75", Oe = {
  root: oS,
  attach: lS,
  actions: iS,
  reply: sS,
  replyField: cS,
  send: dS,
  sendIcon: uS,
  sendsAs: hS
};
function Hr({ value: e, onChange: t }) {
  const [a, r] = p("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function mS() {
  return /* @__PURE__ */ n("svg", { className: Oe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function wS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function fS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [o, i] = Hr(e), s = k(), c = () => {
    o.trim() !== "" && r(a, o);
  }, d = (u) => {
    wS(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ l("div", { className: Oe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: Oe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ n(q, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: o, onChange: i, describedBy: s }),
      /* @__PURE__ */ l(b, { variant: "primary", className: Oe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ n(mS, {}),
        /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Oe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function Px(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(fS, { ...e }) : /* @__PURE__ */ n(_S, { ...e });
}
function _S(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: o, onPost: i, onDraft: s } = e, [c, d] = Hr(e);
  return /* @__PURE__ */ l("div", { className: Oe.root, children: [
    /* @__PURE__ */ n(q, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ l("div", { className: Oe.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    o && /* @__PURE__ */ n(
      Ra,
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
const vS = "_list_1yhks_2", bS = "_item_1yhks_6", pS = "_body_1yhks_22", gS = "_text_1yhks_28", yS = "_evidence_1yhks_37", NS = "_consequence_1yhks_49", kS = "_note_1yhks_54", Ue = {
  list: vS,
  item: bS,
  body: pS,
  text: gS,
  evidence: yS,
  consequence: NS,
  note: kS
};
function $S({ criterion: e }) {
  return /* @__PURE__ */ n(Fe, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function sa({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function CS(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function SS({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Ue.body, children: [
    /* @__PURE__ */ n("span", { className: Ue.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(sa, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Ue.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(sa, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Ue.consequence, children: CS(e.why) })
    ] })
  ] });
}
function RS({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Ue.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n($S, { criterion: e }),
    /* @__PURE__ */ n(SS, { criterion: e })
  ] });
}
function qx({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(RS, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ n("p", { className: Ue.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const TS = "_list_dwhoz_2", xS = "_rung_dwhoz_6", LS = "_name_dwhoz_18", AS = "_actor_dwhoz_32", Rt = {
  list: TS,
  rung: xS,
  name: LS,
  actor: AS
}, ES = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function IS({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = ES[e.state];
  return /* @__PURE__ */ l("li", { className: Rt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: Rt.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${Rt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function Ox({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Rt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(IS, { rung: t }, t.name)) });
}
const MS = "_sheet_pw37w_2", BS = "_title_pw37w_9", jS = "_stage_pw37w_15", PS = "_effects_pw37w_20", qS = "_effect_pw37w_20", OS = "_numeral_pw37w_31", HS = "_effectText_pw37w_38", DS = "_refusals_pw37w_43", FS = "_reasons_pw37w_52", zS = "_reason_pw37w_52", WS = "_actions_pw37w_62", we = {
  sheet: MS,
  title: BS,
  stage: jS,
  effects: PS,
  effect: qS,
  numeral: OS,
  effectText: HS,
  refusals: DS,
  reasons: FS,
  reason: zS,
  actions: WS
};
function KS({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function Hx({ run: e, effects: t, refusals: a, cost: r, onRequeue: o, onClose: i, returnFocusTo: s }) {
  const c = k(), d = `${c}-refusal`, [u, h] = p(""), w = a.length > 0;
  return /* @__PURE__ */ n(ot, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ l("div", { className: we.sheet, children: [
    /* @__PURE__ */ l("h2", { className: we.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: we.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: we.effects, children: t.map((f, y) => /* @__PURE__ */ l("li", { className: we.effect, children: [
      /* @__PURE__ */ n("span", { className: we.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: we.effectText, children: f })
    ] }, f)) }),
    /* @__PURE__ */ n(
      sm,
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
      /* @__PURE__ */ n("ul", { className: we.reasons, children: a.map((f, y) => /* @__PURE__ */ n("li", { className: we.reason, id: y === 0 ? d : void 0, children: f.reason }, f.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: we.actions, children: [
      /* @__PURE__ */ n(KS, { refused: w, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ n(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const GS = "_list_1laeg_2", US = "_path_1laeg_7", VS = "_head_1laeg_21", YS = "_label_1laeg_28", JS = "_consequence_1laeg_35", st = {
  list: GS,
  path: US,
  head: VS,
  label: YS,
  consequence: JS
}, cn = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function ca(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function da(e) {
  return e ? "primary" : "secondary";
}
function QS({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: da(t), size: "sm", onClick: () => a(e.kind), children: cn[e.kind] }) : /* @__PURE__ */ n(b, { variant: da(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: cn[e.kind] });
}
function XS({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: st.path, "data-allowed": e.allowed, "data-role": ca(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: st.head, children: [
      /* @__PURE__ */ n("span", { className: st.label, children: e.title ?? cn[e.kind] }),
      /* @__PURE__ */ n(m, { role: ca(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: st.consequence, children: e.consequence }),
    /* @__PURE__ */ n(QS, { path: e, primary: t, onChoose: a })
  ] });
}
function Dx({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: st.list, children: e.map((a, r) => /* @__PURE__ */ n(XS, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const ZS = "_list_1m7i0_2", eR = "_item_1m7i0_6", tR = "_node_1m7i0_18", nR = "_body_1m7i0_24", aR = "_head_1m7i0_30", rR = "_stage_1m7i0_36", oR = "_version_1m7i0_41", lR = "_sentence_1m7i0_49", iR = "_meta_1m7i0_54", Re = {
  list: ZS,
  item: eR,
  node: tR,
  body: nR,
  head: aR,
  stage: rR,
  version: oR,
  sentence: lR,
  meta: iR
}, sR = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function cR({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: Re.head, children: [
    /* @__PURE__ */ n("span", { className: Re.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Re.version, title: e.version, children: e.version }) : null
  ] });
}
function dR({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${Re.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Re.node} ward-history-node`, children: /* @__PURE__ */ n(Fe, { size: 9, kind: sR[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${Re.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(cR, { entry: e }),
      /* @__PURE__ */ n("span", { className: Re.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${Re.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function Fx({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Re.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(dR, { entry: t }, t.stage + String(a))) });
}
const uR = "_thread_1e70p_3", hR = "_turn_1e70p_8", mR = "_who_1e70p_27", wR = "_body_1e70p_32", Tt = {
  thread: uR,
  turn: hR,
  who: mR,
  body: wR
}, Dr = Ne(!1);
function zx({ children: e, density: t }) {
  return /* @__PURE__ */ n(Dr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${Tt.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function Wx({ turn: e }) {
  if (!ye(Dr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${Tt.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${Tt.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${Tt.body} ward-chat-body`, children: e.body })
  ] });
}
const fR = "_list_yiolt_3", _R = "_row_yiolt_7", vR = "_label_yiolt_20", bR = "_n_yiolt_26", pR = "_cause_yiolt_33", dt = {
  list: fR,
  row: _R,
  label: vR,
  n: bR,
  cause: pR
};
function gR(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const yR = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function NR({ row: e, formatNumber: t }) {
  return gR(e), /* @__PURE__ */ l("li", { className: `${dt.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Fe, { size: 8, ...yR[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: dt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${dt.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(kR, { cause: e.cause })
  ] });
}
function kR({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${dt.cause} ward-healthrow-cause`, children: e }) : null;
}
function Kx({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${dt.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(NR, { row: a, formatNumber: t }, a.label)) });
}
const $R = "_root_1jxwp_2", CR = {
  root: $R
};
function Gx({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: CR.root, "data-density": o, children: [
    /* @__PURE__ */ n(Kt, { items: e, note: t, density: o }),
    /* @__PURE__ */ n(b, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const SR = "_row_dhbre_3", RR = "_key_dhbre_13", TR = "_stack_dhbre_24", xR = "_value_dhbre_32", LR = "_evidence_dhbre_39", AR = "_mark_dhbre_47", Xe = {
  row: SR,
  key: RR,
  stack: TR,
  value: xR,
  evidence: LR,
  mark: AR
};
function ER({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(pn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function Ux({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(ER, { state: e.state }) })
  ] });
}
const IR = "_cell_gh2sd_2", MR = {
  cell: IR
}, BR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function jR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function PR(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function qR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: jR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function OR(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function Vx({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  PR(e, a);
  const r = OR(e);
  return /* @__PURE__ */ n(
    Nm,
    {
      label: "Rejection routing",
      columns: BR,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: MR.cell, "data-norerun": o.noRerun ? !0 : void 0, children: qR(o, i) }),
      empty: t ?? /* @__PURE__ */ n(_f, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const HR = "_row_1f2re_2", DR = "_title_1f2re_12", FR = "_turns_1f2re_18", zR = "_waiting_1f2re_19", WR = "_resolved_1f2re_20", KR = "_activity_1f2re_21", GR = "_cost_1f2re_28", UR = "_link_1f2re_29", VR = "_tableLink_1f2re_47", YR = "_tableRecord_1f2re_48", JR = "_tableRow_1f2re_59", QR = "_tableTitle_1f2re_71", XR = "_tableResolved_1f2re_76", ZR = "_tableMeta_1f2re_87", e2 = "_tableCost_1f2re_94", t2 = "_tableActivity_1f2re_95", n2 = "_tableState_1f2re_105", z = {
  row: HR,
  title: DR,
  turns: FR,
  waiting: zR,
  resolved: WR,
  activity: KR,
  cost: GR,
  link: UR,
  tableLink: VR,
  tableRecord: YR,
  tableRow: JR,
  tableTitle: QR,
  tableResolved: XR,
  tableMeta: ZR,
  tableCost: e2,
  tableActivity: t2,
  tableState: n2
}, Fr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function a2(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function r2(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function o2(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const l2 = { duplicate: "Closed · duplicate" };
function i2({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(at, { className: z.tableMeta, text: `waiting on ${e}` });
}
function s2({ value: e }) {
  return /* @__PURE__ */ n("td", { className: z.tableCost, children: e === void 0 ? null : le(e) });
}
function c2({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${z.tableRecord} ward-target`, href: I(e.href), children: `→ ${e.key}` });
}
function d2({ session: e, href: t }) {
  const a = Fr[e.state];
  return /* @__PURE__ */ l("tr", { className: z.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: z.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${z.tableLink} ward-target`, href: I(t), children: /* @__PURE__ */ n(at, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: z.tableMeta, children: r2(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: z.tableResolved, children: [
      o2(e.resolved),
      /* @__PURE__ */ n(i2, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(s2, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: z.tableActivity, children: a2(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: z.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: l2[e.state] ?? a.label }),
      /* @__PURE__ */ n(c2, { link: e.link })
    ] }) })
  ] });
}
function u2({ session: e }) {
  const t = Fr[e.state];
  return /* @__PURE__ */ l("div", { className: z.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(at, { className: z.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: z.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(at, { className: z.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: z.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: z.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : le(e.cost) }),
    /* @__PURE__ */ n("span", { className: z.activity, children: he(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: z.link, href: I(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function Yx(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(d2, { session: e.session, href: e.href }) : /* @__PURE__ */ n(u2, { session: e.session });
}
const h2 = "_block_1yy2v_3", m2 = "_list_1yy2v_9", w2 = "_line_1yy2v_14", dn = {
  block: h2,
  list: m2,
  line: w2
}, f2 = { warn: "warning", ok: "ok" };
function _2({ kind: e }) {
  const t = f2[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function v2({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${dn.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(_2, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function Jx({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${dn.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: dn.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(v2, { line: a }, `${r}-${a.text}`)) }) });
}
const b2 = "_band_tt7hp_1", p2 = "_head_tt7hp_8", g2 = "_cell_tt7hp_19", y2 = "_index_tt7hp_35", N2 = "_title_tt7hp_42", k2 = "_note_tt7hp_48", $2 = "_cellTitle_tt7hp_53", C2 = "_cellBody_tt7hp_58", S2 = "_tag_tt7hp_64", $e = {
  band: b2,
  head: p2,
  cell: g2,
  index: y2,
  title: N2,
  note: k2,
  cellTitle: $2,
  cellBody: C2,
  tag: S2
}, ua = 4;
function Qx({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== ua)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${ua}-cell grid`);
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
const R2 = "_tag_1yuvz_2", T2 = "_link_1yuvz_14", tn = {
  tag: R2,
  link: T2
};
function Xx({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: tn.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${tn.tag} ${tn.link}`, href: I(t), children: e });
}
const x2 = "_eyebrow_m8swv_2", L2 = "_link_m8swv_10", ha = {
  eyebrow: x2,
  link: L2
};
function Zx({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: ha.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${ha.link} ward-target`, href: I(t), children: e }) });
}
const A2 = "_figure_qz9i7_2", E2 = "_media_qz9i7_9", I2 = "_caption_qz9i7_35", nn = {
  figure: A2,
  media: E2,
  caption: I2
};
function M2(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(x, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function eL(e) {
  return /* @__PURE__ */ l("figure", { className: nn.figure, children: [
    /* @__PURE__ */ n("div", { className: nn.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(M2, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: nn.caption, children: e.caption })
  ] });
}
function B2(e) {
  return `h${e}`;
}
function j2(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const P2 = "_prose_1fxb9_2", q2 = "_anchor_1fxb9_79", zr = {
  prose: P2,
  anchor: q2
};
function tL({ children: e }) {
  return /* @__PURE__ */ n("div", { className: zr.prose, children: e });
}
function nL({ level: e, children: t, id: a }) {
  const r = B2(e), o = a ?? j2(t);
  return /* @__PURE__ */ l(r, { id: o, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${zr.anchor} ward-target`, href: `#${o}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const O2 = "_list_176jq_2", H2 = "_pair_176jq_8", D2 = "_term_176jq_14", F2 = "_value_176jq_19", yt = {
  list: O2,
  pair: H2,
  term: D2,
  value: F2
};
function aL({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: yt.list, children: e.map((t) => /* @__PURE__ */ l("div", { className: yt.pair, children: [
    /* @__PURE__ */ n("dt", { className: yt.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: yt.value, children: t.value })
  ] }, t.term)) });
}
const z2 = "_nav_sgeyg_2", W2 = "_item_sgeyg_6", K2 = "_link_sgeyg_13", G2 = "_note_sgeyg_30", Nt = {
  nav: z2,
  item: W2,
  link: K2,
  note: G2
};
function rL({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: Nt.nav, children: /* @__PURE__ */ n(Cm, { children: t.map((a) => /* @__PURE__ */ l("li", { className: Nt.item, children: [
    /* @__PURE__ */ n("a", { className: `${Nt.link} ward-target`, href: I(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: Nt.note, children: a.note })
  ] }, a.href)) }) });
}
const U2 = "_header_kelio_2", V2 = "_skip_kelio_14", Y2 = "_brand_kelio_39", J2 = "_list_kelio_46", Q2 = "_link_kelio_56", Ze = {
  header: U2,
  skip: V2,
  brand: Y2,
  list: J2,
  link: Q2
};
function oL({ brand: e, links: t, current: a, homeHref: r = "/", mainId: o = "main", skipLabel: i = "Skip to content" }) {
  return /* @__PURE__ */ l("header", { className: Ze.header, children: [
    /* @__PURE__ */ n("a", { className: Ze.skip, href: `#${o}`, children: i }),
    /* @__PURE__ */ n("a", { className: `${Ze.brand} ward-target`, href: I(r), children: e }),
    /* @__PURE__ */ n("nav", { "aria-label": "Main", className: Ze.nav, children: /* @__PURE__ */ n("ul", { className: Ze.list, role: "list", children: t.map((s) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${Ze.link} ward-target`, href: I(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const X2 = "_footer_1jb5e_2", Z2 = "_note_1jb5e_12", eT = "_list_1jb5e_18", tT = "_link_1jb5e_27", kt = {
  footer: X2,
  note: Z2,
  list: eT,
  link: tT
};
function lL({ note: e, links: t = [], label: a = "Footer" }) {
  return /* @__PURE__ */ l("footer", { className: kt.footer, children: [
    /* @__PURE__ */ n("p", { className: kt.note, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("nav", { "aria-label": a, children: /* @__PURE__ */ n("ul", { className: kt.list, role: "list", children: t.map((r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${kt.link} ward-target`, href: I(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
export {
  hT as ACCENT_PRESETS,
  BT as ActionStack,
  Bx as ActivityConsole,
  gT as AdminIcon,
  Bb as AgentCard,
  NT as AppShell,
  px as AppearanceStrip,
  Qx as Band,
  IT as BarChart,
  Qf as BoardColumn,
  XT as BoardFootnote,
  ZT as BoardHeader,
  bT as BoardIcon,
  zT as BoardScroller,
  b as Btn,
  uT as CHIP_ROLES,
  Rr as CREDENTIAL_COLUMNS,
  ET as Callout,
  gx as CapabilityRow,
  KT as CardGrid,
  Wx as ChatMessage,
  Ra as Checkbox,
  m as Chip,
  at as ClampText,
  jx as ClarificationRow,
  cx as ClauseRuleRow,
  sx as ClauseRules,
  ir as ColourLadder,
  yx as ComponentRow,
  Px as Composer,
  tx as ConfigRow,
  ex as ConfigRowHead,
  gn as ConnectionMark,
  Mx as ConsoleAnnounceProvider,
  zx as Conversation,
  sm as CostMeter,
  kx as CredentialRow,
  Nx as CredentialRowHead,
  qx as CriteriaList,
  As as Crumb,
  mT as DENSITIES,
  Kx as DeliveryHealth,
  UT as DeniedState,
  _T as DisabledScope,
  ux as DryRunRail,
  _f as EmptyState,
  $x as EnvCard,
  Zx as Eyebrow,
  aL as FactList,
  q as Field,
  eL as Figure,
  GT as FilteredEmpty,
  kT as FoldText,
  DT as FormStack,
  Kt as GateChecklist,
  Ox as GateLadder,
  Nm as Grid,
  mx as HandoffRuleRow,
  hx as HandoffRules,
  vT as HomeIcon,
  nx as ItemDrawer,
  Cx as KeyPanel,
  uo as LIVE_EVENT_TYPES,
  ab as LegacyBoardColumn,
  rx as LegacyBoardHeader,
  ox as LegacyConfigRow,
  ix as LegacyItemDrawer,
  Jv as LegacyOverCapNote,
  lx as LegacyPreviewRail,
  rr as LegacyWorkCard,
  rL as LinkList,
  Le as LiveIndicator,
  VT as LoadFailed,
  QT as Loading,
  Ir as MCP_SERVER_COLUMNS,
  pn as Mark,
  Rx as MarkUpload,
  Fe as Marker,
  xx as McpServerRow,
  Tx as McpServerRowHead,
  Da as Menu,
  qa as MenuButton,
  wx as NewStreamModal,
  gf as OverCapNote,
  fn as OverflowRow,
  ot as Overlay,
  $T as OwedCard,
  dx as PARTIAL_STEP_REASON,
  Mr as POLICY_CHIP_WIDTH,
  qT as PageFrame,
  AT as PageHeader,
  Cm as PlainList,
  Lx as PolicyRow,
  ax as PreviewRail,
  tL as Prose,
  nL as ProseHeading,
  Xt as ROLE_MATRIX_COLUMNS,
  pr as RULE_ACTIONS,
  Ja as Radio,
  Gx as ReadyChecklist,
  HT as RecordSection,
  Hx as RequeueSheet,
  Dx as ResolveBlock,
  Ux as ResolvedFieldRow,
  Ax as RoleMatrixRow,
  Vx as RoutingTable,
  fx as RuleRow,
  Ex as RunbookSteps,
  co as STREAM_STEPS,
  FT as SectionBand,
  Vn as SectionHeader,
  Va as SegmentedControl,
  Ba as Select,
  Yx as SessionRow,
  TT as Sidebar,
  yT as SidebarFoldButton,
  lL as SiteFooter,
  oL as SiteHeader,
  _x as StageColumn,
  WT as StageGrid,
  Fx as StageHistory,
  _y as StageListEditor,
  CT as StageSteps,
  YT as StaleStrip,
  Ft as StatStrip,
  jT as StatTiles,
  LT as StreamAvatar,
  vx as StreamRow,
  pT as StudioIcon,
  OT as SubjectRail,
  Ve as Switch,
  RT as TabLinks,
  MT as TableHead,
  ST as Tabs,
  Xx as Tag,
  iT as ThemeProvider,
  bx as ToolRow,
  PT as TopBar,
  xw as Tree,
  tr as TreeRow,
  Jx as TypedInputBlock,
  ei as UNSAFE_HREF,
  Ix as ValidationList,
  oT as VisibilityProvider,
  lT as Visible,
  dT as WARD_VERSION,
  Wt as WorkCard,
  JT as WriteUnavailableStrip,
  a2 as agoSince,
  Jr as clock,
  Iy as colourStatus,
  ae as count,
  ue as duration,
  un as elapsed,
  cT as eventSourceTransport,
  B2 as headingTag,
  Ot as isStreamStep,
  mt as isValidatedStreamStep,
  up as ladderValidation,
  a0 as mcpConnectionChip,
  t0 as mcpToolName,
  le as money,
  be as ms,
  nr as ordered,
  _a as ratio,
  kk as restartLabel,
  I as safeHref,
  j2 as slug,
  he as stamp,
  hn as stream,
  wT as streamChip,
  Dt as streamChipProps,
  ge as streamColour,
  wo as streamHex,
  At as streamInitials,
  ho as streamVars,
  xT as uniqueStreamInitials,
  Aa as useAnchoredPanel,
  $t as useBorderFlash,
  Ae as useDisabledScope,
  lo as useFocusTrap,
  fT as useLiveFeed,
  sT as useReturnFocus,
  qt as useRovingTabindex,
  mn as useTicker,
  Qr as useVisible,
  j as v,
  Sx as validateMark,
  ft as validatedStep,
  ba as validatedStreamSteps
};
