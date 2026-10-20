import { jsx as n, Fragment as x, jsxs as i } from "react/jsx-runtime";
import { useMemo as sa, useContext as ye, createContext as Ne, useState as p, useEffect as S, useCallback as te, useRef as _, useLayoutEffect as tt, useId as k, Fragment as ca, isValidElement as Or, Children as Dr } from "react";
import { createPortal as Fr, flushSync as da } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const $n = (e) => String(e).padStart(2, "0");
function on(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${$n(t % 60)}s` : `${Math.floor(a / 60)}h ${$n(a % 60)}m`;
}
const Hr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const t = Hr.formatToParts(new Date(e)), a = (r) => {
    var o;
    return ((o = t.find((l) => l.type === r)) == null ? void 0 : o.value) ?? "";
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
function ua(e, t) {
  return `${e} / ${t}`;
}
const Wr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function zr(e) {
  return Wr.format(new Date(e));
}
const ha = Ne(/* @__PURE__ */ new Set());
function R2({ hidden: e, children: t }) {
  const a = sa(() => new Set(e), [e]);
  return /* @__PURE__ */ n(ha.Provider, { value: a, children: t });
}
function Kr(e) {
  return !ye(ha).has(e);
}
function T2({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: Kr(e) ? t : a });
}
const Gr = "(prefers-color-scheme: dark)";
function Cn() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Gr) : null;
}
function Ur(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = Cn()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? Cn() : null;
    if (!r) return;
    const o = () => a(r.matches);
    return o(), r.addEventListener("change", o), () => r.removeEventListener("change", o);
  }, [e]), t;
}
function Ht(e, t) {
  S(() => {
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function Vr(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function x2({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const o = Ur(e === "system");
  return Ht("data-theme", Vr(e, o)), Ht("data-accent", t), Ht("data-density", a), /* @__PURE__ */ n(x, { children: r });
}
const Yr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Jr(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function Qr(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function Xr(e, t, a, r) {
  return e.shiftKey ? Jr(t, a) ? r : void 0 : document.activeElement === r || Qr(t) ? a : void 0;
}
function Zr(e, t, a) {
  const r = a[0], o = a[a.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const l = Xr(e, t, r, o);
  l && (e.preventDefault(), l.focus());
}
function eo(e) {
  return { onKeyDown: te(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Yr));
      Zr(a, e.current, r);
    },
    [e]
  ) };
}
function L2(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var o, l;
      (l = (o = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : o.focus) == null || l.call(o);
    };
  }, [t, e]);
}
const Sn = { ArrowUp: -1, ArrowDown: 1 }, Rn = { ArrowLeft: -1, ArrowRight: 1 }, to = (e, t, a) => Math.min(a, Math.max(t, e));
function no(e, t) {
  if (t !== "horizontal" && e in Sn) return Sn[e];
  if (t !== "vertical" && e in Rn) return Rn[e];
}
function Mt({ orientation: e = "both" } = {}) {
  const [t, a] = p(0), r = _(/* @__PURE__ */ new Map()), o = _(!1);
  tt(() => {
    var f;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(t)) return;
    const h = u[0], w = o.current;
    o.current = !1, a(h), w && ((f = r.current.get(h)) == null || f.focus());
  });
  const l = te((u) => a(u), []), s = te((u) => {
    var h;
    a(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = te(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(t)), f = no(u.key, e);
      f !== void 0 ? (u.preventDefault(), s(h[to(w + f, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: l };
}
const A2 = (e, t, a) => {
  const r = new EventSource(e), o = (l) => a.onEvent(l.data, l.lastEventId, l.type);
  r.onmessage = o;
  for (const l of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(l, o);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, E2 = "0.2.0", I2 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], ao = [1, 2, 3, 4, 5, 6], ma = [1, 2, 3], ro = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], M2 = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], B2 = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], B = {
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
    streamAvatar: "var(--ward-type-streamAvatar)",
    tagText: "var(--ward-type-tagText)",
    eyebrow: "var(--ward-type-eyebrow)",
    eyebrowTracking: "var(--ward-type-eyebrow-tracking)",
    eyebrowTransform: "var(--ward-type-eyebrow-transform)"
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
function ln(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Bt(e) {
  return ao.includes(e);
}
function ht(e) {
  return ma.includes(e);
}
function oo(e) {
  if (!Bt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function P2(e) {
  if (!Bt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const lo = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function io(e) {
  if (!Bt(e)) throw new Error("unvalidated stream step");
  return lo[e];
}
function Tn(e) {
  return typeof e != "string" ? null : ro.includes(e) ? e : null;
}
function so(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function co(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function uo(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function ho(e, t, a) {
  const r = so(e);
  if (r === null) return null;
  const o = Tn(a) ?? Tn(r.type);
  return o === null ? null : { ...r, type: o, id: co(r, t), at: uo(r) };
}
function mo(e, t) {
  return e >= be.staleAfter ? "stale" : e >= be.heartbeat && t === "live" ? "reconnecting" : null;
}
function wo(e, t, a) {
  return e >= be.heartbeat && !t && a !== null;
}
function j2(e, t) {
  const [a, r] = p("reconnecting"), [o, l] = p(null), s = _(/* @__PURE__ */ new Map()), c = _(0), d = _(""), u = _(0), h = _(null), w = _(0), f = _(0), y = _(!1), N = _("reconnecting"), A = te((T) => {
    N.current = T, r(T);
  }, []), q = te(() => {
    c.current = Date.now();
  }, []), me = te((T) => {
    for (const [J, ke] of s.current)
      (ke === "*" || T.itemKey === ke) && J(T);
  }, []), re = te(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (T, J, ke) => {
        const We = ho(T, J, ke);
        We !== null && (We.id && (d.current = We.id), q(), y.current = !1, A("live"), l(We.at), me(We));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, q(), A("live");
      },
      onError: () => {
        var J;
        (J = h.current) == null || J.close(), h.current = null, y.current = !0, N.current !== "stale" && A("reconnecting");
        const T = Math.min(be.reconnectBase * 2 ** u.current, be.reconnectMax);
        u.current += 1, w.current = window.setTimeout(re, T);
      }
    });
  }, [me, A, q, t, e]), Ee = te((T) => {
    y.current = !0, T.close(), h.current = null, w.current = window.setTimeout(re, be.reconnectBase);
  }, [re]), Ye = te((T, J) => (s.current.set(J, T), () => {
    s.current.delete(J);
  }), []);
  return S(() => (re(), f.current = window.setInterval(() => {
    const T = Date.now() - c.current, J = mo(T, N.current);
    J && A(J);
    const ke = h.current;
    wo(T, y.current, ke) && Ee(ke);
  }, be.tick), () => {
    var T;
    window.clearInterval(f.current), window.clearTimeout(w.current), y.current = !1, (T = h.current) == null || T.close(), h.current = null;
  }), [re, Ee, A]), { connection: a, lastEventAt: o, subscribe: Ye };
}
function sn(e, t) {
  const a = new Date(e).getTime(), [r, o] = p(() => Date.now());
  return S(() => {
    if (!t) return;
    const l = () => {
      document.visibilityState !== "hidden" && !document.hidden && o(Date.now());
    };
    l();
    const s = window.setInterval(l, be.tick);
    return document.addEventListener("visibilitychange", l), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", l);
    };
  }, [t, a]), Math.max(0, r - a);
}
const fo = { blue: "running", orange: "waiting", green: "done" };
function _o() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function xn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function gt(e, t) {
  const a = _(0), r = te((o) => {
    const l = o ?? t, s = e.current;
    s !== null && l !== void 0 && (_o() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${fo[l]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => xn(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => xn(s), be.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (o) => r(o) : () => r(t);
}
const vo = "_root_1otpc_2", bo = {
  root: vo
};
function po(e, t, a, r, o) {
  const l = [on(t)];
  return e || l.push(`as of ${zr(a)}`), r && l.push(`turn ${r[0]}/${r[1]}`), o && l.push(o.label), l;
}
function Le({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const o = a !== "stale", l = sn(e, o), s = (t == null ? void 0 : t.at) ?? e, c = po(o, l, s, r, t);
  return /* @__PURE__ */ i("span", { className: `${bo.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const go = "_app_1bnco_1", yo = "_side_1bnco_35", No = "_sideTop_1bnco_46", ko = "_sideBody_1bnco_60", $o = "_iconRail_1bnco_99", Co = "_railItem_1bnco_108", So = "_railIcon_1bnco_129", Ro = "_railDot_1bnco_134", To = "_railLetter_1bnco_140", xo = "_main_1bnco_146", Lo = "_rail_1bnco_108", Ao = "_page_1bnco_168", Eo = "_headerRow_1bnco_191", Io = "_sidebarToggle_1bnco_198", Mo = "_headerSlot_1bnco_203", Bo = "_headerAction_1bnco_208", Po = "_drawerSide_1bnco_213", jo = "_root_1bnco_260", qo = "_topbar_1bnco_267", Oo = "_mark_1bnco_278", Do = "_brand_1bnco_285", Fo = "_tagline_1bnco_291", Ho = "_identity_1bnco_297", Wo = "_tools_1bnco_298", zo = "_nav_1bnco_308", Ko = "_metadata_1bnco_315", Go = "_actor_1bnco_330", Uo = "_detail_1bnco_331", Vo = "_content_1bnco_376", Yo = "_toolsPanel_1bnco_392", Jo = "_skip_1bnco_418", C = {
  app: go,
  side: yo,
  sideTop: No,
  sideBody: ko,
  iconRail: $o,
  railItem: Co,
  railIcon: So,
  railDot: Ro,
  railLetter: To,
  main: xo,
  rail: Lo,
  page: Ao,
  headerRow: Eo,
  sidebarToggle: Io,
  headerSlot: Mo,
  headerAction: Bo,
  drawerSide: Po,
  root: jo,
  topbar: qo,
  mark: Oo,
  brand: Do,
  tagline: Fo,
  identity: Ho,
  tools: Wo,
  nav: zo,
  metadata: Ko,
  actor: Go,
  detail: Uo,
  content: Vo,
  toolsPanel: Yo,
  skip: Jo
};
function at(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const Qo = "_scope_1an6i_2", Xo = {
  scope: Qo
}, wa = Ne(null);
function q2({ reason: e, actions: t = "disable", children: a }) {
  const r = k();
  return /* @__PURE__ */ i("fieldset", { disabled: !0, className: `${Xo.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(wa.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Ae() {
  return ye(wa);
}
function Pt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : at(e, t.reasonId);
}
const Zo = "_btn_hrmlj_2", el = "_primary_hrmlj_14", tl = "_destructive_hrmlj_25", nl = "_secondary_hrmlj_35", al = "_ghost_hrmlj_40", rl = "_overflow_hrmlj_49", ol = "_sm_hrmlj_56", ll = "_disabled_hrmlj_60", il = "_withReason_hrmlj_68", sl = "_reason_hrmlj_74", et = {
  btn: Zo,
  primary: el,
  destructive: tl,
  secondary: nl,
  ghost: al,
  overflow: rl,
  sm: ol,
  disabled: ll,
  withReason: il,
  reason: sl
};
function cl(e, t, a, r) {
  const o = t === "sm" ? [et.sm, "ward-btn--sm"] : [], l = a ? [et.disabled] : [];
  return [et.btn, et[e], "ward-btn", `ward-btn--${e}`, ...o, ...l, r ?? ""].filter(Boolean).join(" ");
}
function dl(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function ul(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function hl(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function ml(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function wl(e, t, a) {
  return ml(e.describedBy, t && a);
}
function fl({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${et.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function _l(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Ae()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(vl, { ...e });
}
function vl(e) {
  const t = Ae();
  ul(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", o = !!(e.disabled || t), l = hl(e, t), s = k(), c = bl(l, t);
  return /* @__PURE__ */ i(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: cl(a, r, o, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: o,
        title: l,
        "aria-describedby": wl(e, l, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...dl(a, e.controls),
        children: _l(e)
      }
    ),
    /* @__PURE__ */ n(fl, { id: s, reason: l, shown: c === fa })
  ] });
}
function bl(e, t) {
  return e && !t ? fa : ca;
}
function fa({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${et.withReason} ward-btn-withReason`, children: e });
}
let cn = "none";
function pl(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (cn = "key");
}
typeof document < "u" && (document.addEventListener("keydown", pl, !0), document.addEventListener("pointerdown", () => {
  cn = "pointer";
}, !0));
function gl() {
  return cn === "key";
}
function dt(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var l;
    const r = (l = window.matchMedia) == null ? void 0 : l.call(window, e);
    if (!r) return;
    const o = (s) => a(s.matches);
    return r.addEventListener("change", o), a(r.matches), () => r.removeEventListener("change", o);
  }, [e]), t;
}
const yl = "_scrim_1cawq_2", Nl = "_drawer_1cawq_10", kl = "_sheet_1cawq_14", $l = "_modal_1cawq_18", Cl = "_panel_1cawq_23", Sl = "_start_1cawq_44", Rl = "_header_1cawq_67", Tl = "_title_1cawq_75", xl = "_body_1cawq_79", Ll = "_close_1cawq_106", Te = {
  scrim: yl,
  drawer: Nl,
  sheet: kl,
  modal: $l,
  panel: Cl,
  start: Sl,
  header: Rl,
  title: Tl,
  body: xl,
  close: Ll
}, Al = Ne(null), Ct = [], St = /* @__PURE__ */ new Map();
function El(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Il(e, t) {
  let a = St.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, St.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function Ml(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !El(r) && Il(e, r);
}
function Bl(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (Ml(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function Pl(e) {
  for (const t of e.claims) {
    const a = St.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), St.delete(t)));
  }
}
function jl(e, t) {
  const a = { root: e, claims: [] };
  return Ct.push(a), Bl(a, t), a;
}
function ql(e) {
  const t = Ct.indexOf(e);
  t >= 0 && Ct.splice(t, 1), Pl(e);
}
function Ln(e) {
  return e !== null && Ct.at(-1) === e;
}
function Ol(e, t, a) {
  const r = _(null), o = _(a);
  return o.current = a, S(() => {
    const l = e.current;
    if (!l) return;
    const s = document.activeElement, c = jl(l, t);
    return r.current = c, () => {
      var u, h;
      const d = Ln(c);
      ql(c), r.current = null, d && ((h = (u = o.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), te(() => Ln(r.current), []);
}
function Dl(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function Fl(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Hl({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("header", { className: `${Te.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Te.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Wl(e) {
  return `${Te.scrim} ${Te[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function zl(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Te.panel} ${Te[e]} ward-overlay-panel${a}${r}`;
}
function Kl(e) {
  const t = ye(Al);
  return e ?? t ?? document.body;
}
function rt(e) {
  const t = _(null), a = _(null), r = k(), o = Kl(e.container), l = dt("(min-width: 768px)"), s = Dl(e.kind, l), c = Fl(e, r), d = eo(a), [u] = p(gl), h = Ol(t, o, e.returnFocusTo), w = te(() => {
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
  }, [w]), Fr(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: Wl(s),
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
            className: zl(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => h() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Te.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Hl, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Gl = /^([a-z][a-z0-9+.-]*):/i, Ul = /* @__PURE__ */ new Set(["http", "https"]), Vl = "#";
function Yl(e) {
  var r, o;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (o = (r = Gl.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : o.toLowerCase();
}
function D(e) {
  const t = Yl(e);
  return t === void 0 || Ul.has(t) ? e : Vl;
}
function Jl(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function _a(e) {
  const t = Jl(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function Ql(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => _a(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const o = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const l of [a, ...a.children]) o == null || o.observe(l);
    return r(), () => {
      a.removeEventListener("scroll", r), o == null || o.disconnect();
    };
  }, [e, t]);
}
function Xl(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, o = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : o > e.clientWidth - a ? e.scrollLeft + o - e.clientWidth + a : null;
}
function Zl(e, t, a) {
  tt(() => {
    const r = e.current, o = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !o) return;
    const l = Xl(r, o);
    l !== null && (r.scrollLeft = Math.max(0, l)), _a(r);
  }, [e, t, a]);
}
const ei = "_row_11g8i_2", ti = {
  row: ei
};
function ni(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function dn({ label: e, children: t, count: a, as: r = "div", focusable: o = !0, rowRef: l, className: s, ...c }) {
  const d = _(null), u = l ?? d;
  return Ql(u, a), /* @__PURE__ */ n(r, { ref: u, className: [ti.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...ni(o, r), ...c, children: t });
}
const ai = "_icon_1ylqy_2", ri = {
  icon: ai
};
function mt({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: ri.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function O2() {
  return /* @__PURE__ */ n(mt, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function D2() {
  return /* @__PURE__ */ i(mt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function F2() {
  return /* @__PURE__ */ i(mt, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function H2() {
  return /* @__PURE__ */ n(mt, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function oi() {
  return /* @__PURE__ */ i(mt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const va = "ward:sidebar-collapsed", li = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function ii() {
  try {
    return window.localStorage.getItem(va) === "true";
  } catch {
    return !1;
  }
}
function si(e) {
  try {
    window.localStorage.setItem(va, String(e));
  } catch {
  }
}
function ci(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function di(e) {
  return e instanceof Element && e.closest(li) !== null;
}
function ui(e) {
  return e.key === "[" && !ci(e) && !di(e.target);
}
function hi(e) {
  const [t, a] = p(ii), r = () => {
    si(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const o = (l) => {
      var c;
      if (!ui(l)) return;
      const s = l.target instanceof Element ? l.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [e, t]), { collapsed: t, toggle: r };
}
function mi() {
  const e = dt("(max-width: 767.98px)"), t = dt("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function wi(e) {
  const t = e === "phone", a = k(), r = _(null), [o, l] = p(!1);
  return o && !t && l(!1), { narrow: t, open: o, drawerId: a, slotRef: r, toggle: () => l(!o), close: () => l(!1) };
}
function fi({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ i("div", { className: C.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: C.headerSlot, children: e }),
    ya(t) && /* @__PURE__ */ n("span", { className: C.headerAction, children: t })
  ] }) : e;
}
function _i(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function vi({ sidebar: e, label: t, drawer: a }) {
  var o;
  if (_i(a.open, a.close), !a.open) return null;
  const r = (l) => {
    l.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(rt, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (o = a.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ n("div", { className: C.drawerSide, onClick: r, children: ba(e, !1) }) });
}
function bi(e) {
  const [t, a] = p(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function pi(e, t) {
  const a = hi(e === "wide" && !t), r = bi(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function gi(e, t) {
  const a = pi(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return Ni(e.collapsed, t);
  const r = a.collapsed, o = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: o, drawsStrip: !o && typeof e.sidebar == "function", toggle: a.toggle };
}
const yi = (e) => e.collapsed && e.drawsStrip;
function Ni(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const An = (e) => e ? "" : void 0;
function ba(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function pa({ fold: e }) {
  return /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(oi, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function ki({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: C.sideTop, children: /* @__PURE__ */ n(pa, { fold: e }) });
}
const ga = Ne(null);
function W2() {
  const e = ye(ga);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(pa, { fold: e });
}
function $i({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": ln(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Ci({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: C.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ i("a", { className: C.railItem, href: D(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n($i, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function Si({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: o }) {
  const l = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ i("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(ki, { fold: r, inSidebar: o && !l }),
    /* @__PURE__ */ n("div", { className: C.sideBody, hidden: l, children: ba(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(Ci, { items: a ?? [], label: t })
  ] });
}
const ya = (e) => e != null;
function Ri(e) {
  const { sidebar: t, header: a, action: r, children: o, rail: l, iconRail: s, pageFill: c } = e, d = ya(l), u = mi(), h = wi(u), w = gi(e, u), f = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ i("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": An(yi(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(ga.Provider, { value: w, children: /* @__PURE__ */ n(Si, { sidebar: t, label: f, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ i("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(fi, { header: a, action: r, label: f, drawer: h }),
      /* @__PURE__ */ n("div", { className: C.page, "data-fill": An(c === !0), children: o })
    ] }),
    d && /* @__PURE__ */ n("div", { className: C.rail, children: l }),
    /* @__PURE__ */ n(vi, { sidebar: t, label: f, drawer: h })
  ] });
}
function Ti({ destinations: e, active: t }) {
  const a = _(null);
  return Zl(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(dn, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: D(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function Xt({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function xi({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ i("span", { className: C.metadata, children: [
    /* @__PURE__ */ n(Xt, { value: e, className: C.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Xt, { value: t, className: C.detail })
  ] });
}
function Li() {
  const e = dt("(max-width: 767.98px)"), t = k(), a = _(null), [r, o] = p(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Ai({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: C.tools, children: e });
}
function Ei({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: C.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function Ii(e) {
  return /* @__PURE__ */ i("header", { className: C.topbar, children: [
    /* @__PURE__ */ n("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Xt, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ n(Ti, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: C.identity, children: /* @__PURE__ */ n(xi, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Ai, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Mi(e) {
  const t = k(), a = Li();
  return /* @__PURE__ */ i("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: C.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Ii, { ...e, menu: a }),
    /* @__PURE__ */ n(Ei, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: C.content, children: e.children })
  ] });
}
function Bi(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function z2(e) {
  return Bi(e) ? /* @__PURE__ */ n(Ri, { ...e }) : /* @__PURE__ */ n(Mi, { ...e });
}
const Pi = "_root_itg9o_2", ji = "_row_itg9o_8", qi = "_box_itg9o_14", Oi = "_label_itg9o_21", Di = "_labelHidden_itg9o_26", Fi = "_lockedNote_itg9o_36", Hi = "_consequence_itg9o_44", Wi = "_sample_itg9o_79", Be = {
  root: Pi,
  row: ji,
  box: qi,
  label: Oi,
  labelHidden: Di,
  lockedNote: Fi,
  consequence: Hi,
  sample: Wi
};
function zi(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function Ki({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: t }) : null;
}
function Gi({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Ui(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function Vi(e, t, a, r) {
  const o = e.consequence ? `${t}-note` : void 0, l = Ui(e, a, r), s = l ? `${t}-reason` : void 0, c = Pt(at(o, e.describedBy, s), r);
  return { noteId: o, reason: l, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? l } };
}
function Yi({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ji({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function Na(e) {
  const t = k(), a = Ae(), r = zi(e, a), o = Vi(e, t, r.disabled, a);
  return /* @__PURE__ */ i("div", { className: `${Be.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ i("span", { className: Be.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: t,
          type: "checkbox",
          className: `${Be.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (l) => {
            var s;
            return !r.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, l.target.checked));
          },
          ...o.input
        }
      ),
      /* @__PURE__ */ i("label", { htmlFor: t, className: e.labelHidden ? Be.labelHidden : Be.label, children: [
        e.label,
        /* @__PURE__ */ n(Gi, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Ji, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Yi, { id: o.reasonId, reason: o.reason }),
    /* @__PURE__ */ n(Ki, { id: o.noteId, text: e.consequence })
  ] });
}
const Qi = "_chip_pq6tb_2", Xi = {
  chip: Qi
}, Zi = {
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
function es(e, t) {
  if (e === "stream") return ts(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = Zi[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function ts(e) {
  if (!e || !ht(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = ln(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Xi.chip} ward-chip ward-chip--${e}`, style: es(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const ns = "_clamp_zn74g_3", En = {
  clamp: ns
};
function nt({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? En.clamp : `${En.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const as = "_root_1btz3_2", rs = "_body_1btz3_10", os = "_toggle_1btz3_24", Wt = {
  root: as,
  body: rs,
  toggle: os
};
function K2({ children: e, lines: t = 3, label: a }) {
  const [r, o] = p(!1), l = k();
  return /* @__PURE__ */ i("div", { className: Wt.root, children: [
    /* @__PURE__ */ n("div", { id: l, className: Wt.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: Wt.toggle, "aria-expanded": r, "aria-controls": l, onClick: () => o(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const ls = "_root_1a4s8_2", is = "_words_1a4s8_16", ss = "_title_1a4s8_23", cs = "_actions_1a4s8_27", ft = {
  root: ls,
  words: is,
  title: ss,
  actions: cs
};
function G2({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ i("section", { className: ft.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ i("div", { className: ft.words, children: [
      /* @__PURE__ */ n("strong", { className: ft.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: ft.actions, children: a })
  ] });
}
const ds = "_root_8zmpu_2", us = "_step_8zmpu_12", hs = "_dot_8zmpu_38", ms = "_label_8zmpu_51", lt = {
  root: ds,
  step: us,
  dot: hs,
  label: ms
}, ws = { done: ", done", now: ", current", next: "" };
function fs({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ i("li", { className: lt.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${lt.dot} ward-running` : lt.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: lt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: ws[e.state] })
  ] });
}
function U2({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: lt.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(fs, { step: r, running: t }, r.label)) });
}
function wt(e) {
  return typeof e == "number" && ht(e) ? e : null;
}
function ge(e, t) {
  const a = wt(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function jt(e, t) {
  const a = wt(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const _s = "_root_13eei_3", vs = "_nav_13eei_8", bs = "_list_13eei_16", ps = "_item_13eei_24", gs = "_link_13eei_44", ys = "_sep_13eei_54", Ns = "_current_13eei_58", ks = "_chips_13eei_62", Me = {
  root: _s,
  nav: vs,
  list: bs,
  item: ps,
  link: gs,
  sep: ys,
  current: Ns,
  chips: ks
};
function $s({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: Me.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${Me.link} ward-target`, href: D(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function Cs({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: Me.root, children: /* @__PURE__ */ i("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ n("ol", { className: Me.list, children: e.map((r, o) => /* @__PURE__ */ i("li", { className: Me.item, children: [
      o > 0 ? /* @__PURE__ */ n("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n($s, { step: r, isCurrent: a && o === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${Me.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function ka(e, t, a) {
  const r = _(a);
  r.current = a, S(() => {
    if (!e) return;
    const o = (l) => {
      var s;
      (s = t.current) != null && s.contains(l.target) || r.current();
    };
    return document.addEventListener("mousedown", o), () => document.removeEventListener("mousedown", o);
  }, [e, t]);
}
const Ss = 500;
function $a(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function Ca() {
  const e = _(""), t = _(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, Ss), e.current);
}
const _t = 4;
function Rs(e, t, a) {
  const r = Math.max(0, a - e.bottom - _t * 2), o = Math.max(0, e.top - _t * 2);
  return t <= r || r >= o ? { top: e.bottom + _t, maxHeight: r } : { top: e.top - _t - Math.min(t, o), maxHeight: o };
}
function Ts(e, t, a, r) {
  const o = { start: e.left, end: e.right - t }, l = { start: o.start + t <= a, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = l[r] || !l[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, a - t));
}
function xs(e, t, a, r) {
  return { ...Rs(e, t.height, a.height), left: Ts(e, t.width, a.width, r) };
}
function yt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Ls(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function As(e, t, a) {
  const r = Ls(t, a);
  e.style.setProperty("--ward-anchor-width", yt(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const o = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: r, box: o, view: { width: l.clientWidth, height: l.clientHeight } };
}
function Es(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, o) => r.scrollTop = a[o]);
}
function In(e, t, a, r) {
  const o = Es(e), l = As(e, t, r), s = xs(l.edges, l.box, l.view, a);
  Object.assign(e.style, { left: yt(s.left - l.box.left), top: yt(s.top - l.box.top), maxHeight: yt(s.maxHeight) }), o();
}
function Is(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function Sa(e, t, a = "start", r) {
  tt(() => {
    const o = t.current, l = e.current;
    if (!o || !l) return;
    const s = Is(o), c = () => In(o, l, a, r == null ? void 0 : r.current), d = (u) => {
      o.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), tt(() => {
    t.current && e.current && In(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const Ms = "_root_1lgbn_2", Bs = "_trigger_1lgbn_7", Ps = "_value_1lgbn_47", js = "_menu_1lgbn_65", qs = "_find_1lgbn_87", Os = "_list_1lgbn_103", Ds = "_option_1lgbn_114", Fs = "_check_1lgbn_133", Hs = "_empty_1lgbn_144", pe = {
  root: Ms,
  trigger: Bs,
  value: Ps,
  menu: js,
  find: qs,
  list: Os,
  option: Ds,
  check: Fs,
  empty: Hs
}, Ws = 7;
function zs(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function Mn(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function Ks(e, t) {
  const [a, r] = p(e.defaultOpen === !0), [o, l] = p(""), [s, c] = p(() => Mn(e.options, e.value)), d = (u) => {
    var h;
    da(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: o,
    active: s,
    entries: zs(e.options, o),
    findable: e.options.length > Ws,
    show: () => {
      e.disabled || (l(""), c(Mn(e.options, e.value)), r(!0));
    },
    close: d,
    to: c,
    pick: (u) => {
      var h;
      u && u.option.value !== e.value && ((h = e.onChange) == null || h.call(e, u.option.value)), d(!0);
    },
    find: (u) => {
      l(u), c(0);
    }
  };
}
function Gs(e, t) {
  const a = _(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function Us(e) {
  const t = Ca();
  return (a) => {
    const r = t(a), o = e.entries.findIndex((l) => l.option.label.toLowerCase().startsWith(r));
    o >= 0 && e.to(o);
  };
}
function Ra(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Vs(e) {
  return { ...Ra(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function Ta(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const o = t[r.key];
    if (!o) return a(r);
    r.preventDefault(), r.stopPropagation(), o();
  };
}
const Ys = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Js(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      Ys.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function Qs({ entry: e, at: t, menu: a, ids: r, value: o }) {
  return /* @__PURE__ */ i(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === o,
      "data-active": t === a.active || void 0,
      className: pe.option,
      onMouseDown: (l) => l.preventDefault(),
      onMouseMove: () => a.to(t),
      onClick: () => a.pick(e),
      children: [
        /* @__PURE__ */ n("span", { className: pe.check, "aria-hidden": "true" }),
        /* @__PURE__ */ n("span", { className: pe.label, children: e.option.label })
      ]
    }
  );
}
function un(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function Xs({ menu: e, ids: t, focusRef: a }) {
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
      "aria-activedescendant": un(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: Ta(e, Ra(e), () => {
      })
    }
  );
}
function Zs({ props: e, menu: t, ids: a, focusRef: r, trigger: o }) {
  const l = Us(t), s = _(null);
  Sa(o, s);
  const c = (d) => {
    $a(d) && l(d.key);
  };
  return /* @__PURE__ */ i("div", { ref: s, className: pe.menu, children: [
    t.findable && /* @__PURE__ */ n(Xs, { menu: t, ids: a, focusRef: r }),
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
        "aria-activedescendant": t.findable ? void 0 : un(t, a),
        onKeyDown: Ta(t, Vs(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(Qs, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: pe.empty, children: "No match" })
  ] });
}
function ec(e, t) {
  const a = e.open ? un(e, t) : void 0;
  S(() => {
    var r, o;
    a && ((o = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [a]);
}
function xa(...e) {
  return e.filter(Boolean).join(" ");
}
function tc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function nc({ props: e, menu: t, ids: a, trigger: r, wantFocus: o }) {
  var c;
  const l = !e.options.some((d) => d.value === e.value), s = (c = Ae()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: xa(pe.trigger, e.triggerClassName),
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
      ...Js(t, o),
      children: /* @__PURE__ */ n("span", { id: a.value, className: pe.value, "data-placeholder": l || void 0, children: tc(e) })
    }
  );
}
function La(e) {
  const t = Ae(), a = t ? { ...e, disabled: !0, "aria-describedby": Pt(e["aria-describedby"], t) } : e, r = k(), o = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, l = _(null), s = _(null), c = _(null), d = Ks(a, s), u = Gs(d.open, c);
  return ka(d.open, l, () => d.close(!1)), ec(d, o), /* @__PURE__ */ i("div", { ref: l, className: xa(pe.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(nc, { props: a, menu: d, ids: o, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(Zs, { props: a, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const ac = "_field_1ensj_2", rc = "_label_1ensj_8", oc = "_labelHidden_1ensj_15", lc = "_control_1ensj_25", ic = "_mono_1ensj_45", sc = "_area_1ensj_50", cc = "_invalid_1ensj_57", De = {
  field: ac,
  label: rc,
  labelHidden: oc,
  control: lc,
  mono: ic,
  area: sc,
  invalid: cc
}, dc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, Aa = (e) => `${e}-label`;
function uc({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? dc : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function hc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    La,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": Aa(t.id),
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
function mc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
const wc = { input: uc, select: hc, textarea: mc };
function fc(e, t, a) {
  const r = wc[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function _c(e, t, a, r) {
  const o = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": o,
    "aria-describedby": Pt(at(o ? a : void 0, e.describedBy), r),
    onChange: (l) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, l.target.value);
    }
  };
}
function vc(e) {
  const t = e.mono ? [De.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [De.area] : [];
  return [De.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function bc(e) {
  return e ? `${De.label} ${De.labelHidden} ward-field-label` : `${De.label} ward-field-label`;
}
function j(e) {
  const t = k(), a = `${t}-msg`, r = _c(e, t, a, Ae()), o = vc(e);
  return /* @__PURE__ */ i("div", { className: `${De.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: Aa(t), className: bc(e.labelHidden), htmlFor: t, children: e.label }),
    fc(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${De.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const pc = "_root_sjvm0_2", gc = "_trigger_sjvm0_9", yc = "_ghost_sjvm0_27", Nc = "_panel_sjvm0_46", kc = "_edged_sjvm0_67", $c = "_menu_sjvm0_73", Cc = "_group_sjvm0_78", Sc = "_heading_sjvm0_83", Rc = "_item_sjvm0_89", Tc = "_description_sjvm0_105", xc = "_large_sjvm0_109", Lc = "_touch_sjvm0_113", Ac = "_icon_sjvm0_117", Ec = "_label_sjvm0_125", Ic = "_text_sjvm0_130", Mc = "_trailing_sjvm0_138", Bc = "_check_sjvm0_144", Pc = "_separator_sjvm0_183", jc = "_footer_sjvm0_189", qc = "_find_sjvm0_196", Oc = "_findGlyph_sjvm0_208", Dc = "_findInput_sjvm0_214", Fc = "_empty_sjvm0_230", L = {
  root: pc,
  trigger: gc,
  ghost: yc,
  panel: Nc,
  edged: kc,
  menu: $c,
  group: Cc,
  heading: Sc,
  item: Rc,
  description: Tc,
  large: xc,
  touch: Lc,
  icon: Ac,
  label: Ec,
  text: Ic,
  trailing: Mc,
  check: Bc,
  separator: Pc,
  footer: jc,
  find: qc,
  findGlyph: Oc,
  findInput: Dc,
  empty: Fc
}, Ea = Ne(null);
function Hc(e, t) {
  const [a, r] = p({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (o) => r((l) => ({ open: !0, start: o, request: l.request + 1 })),
    close: (o) => {
      var l;
      da(() => r((s) => ({ ...s, open: !1 }))), o && ((l = t.current) == null || l.focus());
    }
  };
}
const Wc = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function zc(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = Wc.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function hn(...e) {
  return e.filter(Boolean).join(" ");
}
function Kc(e, t = {}, a = "field") {
  const { ref: r, className: o, ...l } = t;
  return { ...l, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: hn(L.trigger, a === "ghost" ? L.ghost : void 0, o) };
}
function Ia(e) {
  const t = k(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = _(null), o = _(null), l = Hc(e.defaultOpen === !0, o);
  return ka(l.open, r, () => l.close(!1)), /* @__PURE__ */ i("div", { ref: r, className: hn(L.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...Kc(o, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": l.open,
        "aria-controls": l.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...zc(l),
        children: e.label
      }
    ),
    l.open && /* @__PURE__ */ n(Ea.Provider, { value: { ...a, popup: l, button: o }, children: e.children })
  ] });
}
function Gc(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function Uc(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const Vc = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function Yc(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function Jc(e, t) {
  return e === "separator" ? e : "items" in e ? Yc(e, t) : t(e) ? e : null;
}
function Qc(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function Xc(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (o) => o.label.toLowerCase().includes(a);
  return Qc(e.map((o) => Jc(o, r)).filter((o) => o !== null));
}
const Ma = (e, t) => (e % t + t) % t;
function je(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const o = Ma(t + a * r, e.length);
    if (!e[o].disabled) return o;
  }
  return -1;
}
const Zc = (e) => e.split("").every((t) => t === e[0]);
function ed(e, t, a) {
  const r = Zc(a), o = r ? a[0] : a, l = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = Ma(l + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function td(e) {
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
function nd(e, t) {
  const { items: a } = e, r = () => {
    var o;
    return (o = e.refs.current[e.current()]) == null ? void 0 : o.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(je(a, e.current(), 1))],
    ["ArrowUp", () => e.focus(je(a, e.current(), -1))],
    ["Home", () => e.focus(je(a, -1, 1))],
    ["End", () => e.focus(je(a, a.length, -1))],
    ["Escape", () => t.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function ad(e, t, a) {
  const r = Ca(), o = nd(e, t), l = (s) => {
    if ($a(s)) {
      if (!a) return e.focus(ed(e.items, e.current(), r(s.key)));
      s.preventDefault(), a(s.key);
    }
  };
  return {
    onKeyDown: (s) => {
      const c = o.get(s.key);
      if (!c) return l(s);
      s.preventDefault(), s.stopPropagation(), c();
    },
    onKeyUp: (s) => {
      s.key === " " && s.preventDefault();
    }
  };
}
function rd(e) {
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
function od(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? je(e, -1, 1) : t;
}
function ld(e, t) {
  const { start: a, request: r } = t, o = _(e);
  o.current = e, S(() => {
    const { items: l, focus: s } = o.current;
    a && s(a === "first" ? od(l) : je(l, l.length, -1));
  }, [a, r]);
}
function id({ row: e, nav: t, popup: a }) {
  const { item: r, at: o } = e;
  return {
    onMouseDown: (l) => l.preventDefault(),
    onMouseMove: () => {
      !r.disabled && t.current() !== o && t.focus(o);
    },
    onClick: (l) => {
      var s;
      if (r.disabled) return l.preventDefault();
      (s = r.onSelect) == null || s.call(r), a.close(!0);
    }
  };
}
const sd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function cd(e, t) {
  return sd(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function dd(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: L.label, children: e.label });
  return e.description ? /* @__PURE__ */ i("span", { className: L.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: L.description, children: e.description })
  ] }) : a;
}
function ud() {
  return /* @__PURE__ */ n("svg", { className: L.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Bn(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: L.icon, "aria-hidden": "true", children: e.icon }) : null,
    dd(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: L.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(ud, {}) : null
  ] });
}
function Ba(e) {
  const { item: t, at: a } = e.row, r = k(), o = {
    ref: (l) => {
      e.nav.refs.current[a] = l;
    },
    role: "menuitem",
    tabIndex: -1,
    className: L.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...cd(t, r),
    ...id(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: D(t.href), ...o, children: Bn(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...o, children: Bn(t, r) });
}
function hd({ heading: e, rows: t, nav: a, popup: r }) {
  const o = k();
  return /* @__PURE__ */ i("div", { role: "group", "aria-labelledby": o, className: L.group, children: [
    /* @__PURE__ */ n("div", { id: o, className: L.heading, children: e }),
    t.map((l) => /* @__PURE__ */ n(Ba, { row: l, nav: a, popup: r }, l.at))
  ] });
}
function md({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: L.separator }) : e.kind === "group" ? /* @__PURE__ */ n(hd, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(Ba, { row: e.row, nav: t, popup: a });
}
function wd() {
  const e = ye(Ea);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function fd() {
  return /* @__PURE__ */ i("svg", { className: L.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function _d(e, t) {
  const a = () => je(e.items, -1, 1);
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(a())],
    ["ArrowUp", () => e.focus(je(e.items, e.items.length, -1))],
    ["Enter", () => {
      var r;
      return (r = e.refs.current[a()]) == null ? void 0 : r.click();
    }],
    ["Escape", () => t.close(!0)]
  ]);
}
function vd({ find: e, query: t, setQuery: a, input: r, nav: o, popup: l, menuId: s }) {
  const c = _d(o, l), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ i("div", { className: L.find, children: [
    /* @__PURE__ */ n(fd, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: L.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function bd(e, t) {
  const [a, r] = p(""), o = _(null), l = t !== void 0 && Vc(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = o.current) == null || d.focus();
  };
  return l ? { find: t, query: a, setQuery: r, input: o, toFind: s, entries: Xc(e, a) } : { query: a, setQuery: r, input: o, entries: e };
}
const pd = { regular: void 0, large: L.large, touch: L.touch }, gd = (e, t) => hn(L.panel, e ? L.edged : void 0, pd[t]);
function yd({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: L.empty, children: e.empty ?? "No matches" });
}
function Pa({ entries: e, footer: t, align: a = "start", find: r, edges: o, size: l = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = wd(), h = _(null);
  Sa(u, h, a, o);
  const w = bd(e, r), f = Gc(w.entries), y = td(f.flatMap(Uc).map((q) => q.item)), N = ad(y, s, w.toFind), A = rd(s);
  return ld(y, s), /* @__PURE__ */ i("div", { ref: h, className: gd(o, l), ...A, children: [
    w.find && /* @__PURE__ */ n(vd, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: y, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: L.menu, ...N, children: f.map((q, me) => /* @__PURE__ */ n(md, { block: q, nav: y, popup: s }, me)) }),
    /* @__PURE__ */ n(yd, { find: w.find, count: y.items.length }),
    t && /* @__PURE__ */ n("p", { className: L.footer, children: t })
  ] });
}
function Nd(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function ja(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !Nd(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const kd = (e, t) => e.reduce((a, r) => a + r + t, -t);
function $d({ room: e, widths: t, more: a, gap: r }, o) {
  const l = t.map((d, u) => u);
  if (kd(t, r) <= e) return l;
  const s = /* @__PURE__ */ new Set([o]);
  let c = t[o] + r + a;
  for (const d of l)
    if (d !== o) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return l.filter((d) => s.has(d));
}
const zt = (e) => Number.parseFloat(e) || 0, Pn = (e) => e.getBoundingClientRect().width;
function Cd(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - zt(a.paddingInlineStart) - zt(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), Pn),
    more: r ? Pn(r) : 0,
    gap: zt(a.columnGap)
  };
}
function Sd(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const Rd = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function qa(e, t, a, r = ':scope > [role="tab"]') {
  const [o, l] = p(null);
  return tt(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = Cd(s, r);
      l((u) => Rd(u, d) ? u : d);
    };
    return c(), Sd(s, c);
  }, [e, a, r]), o && $d(o, t);
}
const Td = "_strip_1zvzj_2", xd = "_fits_1zvzj_19", Ld = "_probe_1zvzj_27", Ad = "_moreRoot_1zvzj_36", Ed = "_more_1zvzj_36", Id = "_tab_1zvzj_55", Md = "_count_1zvzj_91", Bd = "_badge_1zvzj_97", Y = {
  strip: Td,
  fits: xd,
  probe: Ld,
  moreRoot: Ad,
  more: Ed,
  tab: Id,
  count: Md,
  badge: Bd
}, Oa = "More";
function Pd(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const jn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, mn = (e) => e.badge === void 0 ? jn(e) : `${jn(e)}, ${e.badge}`;
function Da(e) {
  return `${Y.strip} ward-tabs ward-tabs--${e}`;
}
const jd = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function qd({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ i(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${Y.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : mn(e),
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
function Od(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((l) => l.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Dd({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(Ia, { label: Oa, className: Y.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: Y.more }, children: /* @__PURE__ */ n(Pa, { align: "end", entries: e.map((r) => ({ label: mn(r), onSelect: () => a(r.id) })) }) });
}
function Fd(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : jd;
}
function V2({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: o }) {
  const l = Mt({ orientation: "horizontal" }), s = Pd(e, t);
  S(() => l.setActive(s), [l.setActive, s]);
  const c = _(null);
  ja(c, o);
  const d = qa(c, s, e.map(mn).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ i("div", { ref: c, className: `${Da(o)} ${Y.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...l.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(qd, { tab: h, active: t, place: Fd(l, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${Y.more} ${Y.probe}`, children: Oa }),
    u.length > 0 && /* @__PURE__ */ n(Dd, { tabs: u, trigger: l.itemProps(e.length), onPick: Od(c, a) })
  ] });
}
const qn = 7, Fa = "More", Hd = ":scope > a", Ha = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Wd = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function zd(e, t) {
  return !e || e.includes(t) ? {} : Wd;
}
function Kd({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ i("a", { href: e.href, className: `${Y.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
    ] })
  ] });
}
function Gd({ links: e }) {
  return /* @__PURE__ */ n(Ia, { label: Fa, className: Y.moreRoot, trigger: { className: Y.more }, children: /* @__PURE__ */ n(Pa, { align: "end", entries: e.map((t) => ({ label: Ha(t), href: t.href })) }) });
}
function Y2({ links: e, active: t, label: a, level: r }) {
  if (e.length > qn) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${qn} — the set is fixed`);
  const o = _(null);
  ja(o, r);
  const l = Math.max(0, e.findIndex((d) => d.id === t)), s = qa(o, l, e.map(Ha).join(`
`), Hd), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ i("nav", { ref: o, className: `${Da(r)} ${Y.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(Kd, { link: d, current: d.id === t, place: zd(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${Y.more} ${Y.probe}`, children: Fa }),
    c.length > 0 && /* @__PURE__ */ n(Gd, { links: c })
  ] });
}
const Ud = "_root_v56ff_3", Vd = "_segment_v56ff_9", On = {
  root: Ud,
  segment: Vd
};
function Wa({ options: e, value: t, onChange: a, label: r = "Options", disabled: o = !1, describedBy: l }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Mt({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${On.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: On.segment,
      "aria-checked": d.value === t,
      disabled: o,
      "aria-describedby": l,
      onClick: () => a(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const Yd = "_sidebar_s9o1j_3", Jd = "_brand_s9o1j_9", Qd = "_mark_s9o1j_17", Xd = "_word_s9o1j_24", Zd = "_nav_s9o1j_30", eu = "_navItem_s9o1j_39", tu = "_footLink_s9o1j_49", nu = "_group_s9o1j_58", au = "_groupName_s9o1j_65", ru = "_agents_s9o1j_81", ou = "_agent_s9o1j_81", lu = "_root_s9o1j_96", iu = "_agentTop_s9o1j_105", su = "_dot_s9o1j_112", cu = "_agentName_s9o1j_124", du = "_agentMeta_s9o1j_138", uu = "_foot_s9o1j_49", hu = "_footName_s9o1j_150", mu = "_footLinks_s9o1j_157", wu = "_linkBrand_s9o1j_184", fu = "_label_s9o1j_205", _u = "_note_s9o1j_210", vu = "_footer_s9o1j_226", E = {
  sidebar: Yd,
  brand: Jd,
  mark: Qd,
  word: Xd,
  nav: Zd,
  navItem: eu,
  new: "_new_s9o1j_48",
  footLink: tu,
  group: nu,
  groupName: au,
  agents: ru,
  agent: ou,
  root: lu,
  agentTop: iu,
  dot: su,
  agentName: cu,
  agentMeta: du,
  foot: uu,
  footName: hu,
  footLinks: mu,
  linkBrand: wu,
  label: fu,
  note: _u,
  footer: vu
};
function bu({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ i(
    "a",
    {
      className: E.agent,
      href: D(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ i("span", { className: E.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: E.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": ln(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: E.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: E.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function pu({ shared: e }) {
  return e ? /* @__PURE__ */ i("div", { className: E.foot, children: [
    /* @__PURE__ */ n("span", { className: E.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: E.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${E.footLink} ward-target`, href: D(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function gu({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: o, shared: l }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ i("nav", { className: E.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ i("div", { className: E.brand, children: [
      /* @__PURE__ */ n("span", { className: E.mark }),
      /* @__PURE__ */ n("span", { className: E.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: E.nav, children: t.map((s) => /* @__PURE__ */ n("a", { className: E.navItem, href: D(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ i("div", { className: E.group, children: [
      /* @__PURE__ */ i("span", { className: E.groupName, children: [
        a,
        " · ",
        ae(r.length)
      ] }),
      o && /* @__PURE__ */ n("a", { className: E.new, href: D(o.href), children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: E.agents, children: r.map((s) => /* @__PURE__ */ n(bu, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(pu, { shared: l })
  ] });
}
function yu(e) {
  return e.destinations ?? e.items ?? [];
}
function Nu({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: E.linkBrand, children: e });
}
function ku({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: E.footer, children: e });
}
function $u({ link: e, active: t }) {
  return /* @__PURE__ */ i("a", { href: D(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: E.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: E.note, children: e.note })
  ] });
}
function Cu(e) {
  return /* @__PURE__ */ i("aside", { className: `${E.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Nu, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: yu(e).map((t) => /* @__PURE__ */ n($u, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(ku, { children: e.children })
  ] });
}
function Su(e) {
  return "agents" in e;
}
function J2(e) {
  return Su(e) ? /* @__PURE__ */ n(gu, { ...e }) : /* @__PURE__ */ n(Cu, { ...e });
}
const Ru = "_mark_wlgi8_3", Tu = {
  mark: Ru
}, xu = { met: "✓", unmet: "", failed: "✕" };
function wn({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Tu.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: xu[e]
    }
  );
}
const Lu = "_avatar_1t33a_3", Au = {
  avatar: Lu
};
function Rt(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function Eu(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [Rt(e), ...[...t.slice(1)].map((r) => a + r)];
}
function Iu(e, t) {
  const a = Eu(e).find((o) => !t.has(o));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(Rt(e).charAt(0) + String(r)); ) r += 1;
  return Rt(e).charAt(0) + String(r);
}
function Q2(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const o = Iu(r, t);
    t.add(o), a.set(r, o);
  }
  return a;
}
function Mu(e) {
  return e != null && ht(e) ? oo(e) : void 0;
}
function X2({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: Au.avatar, "data-size": a, "aria-hidden": "true", style: Mu(t), children: r ?? Rt(e) });
}
const Bu = "_marker_br9fi_2", Pu = {
  marker: Bu
}, ju = {
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
}, qu = { running: " ward-running" };
function He({ size: e, kind: t, label: a }) {
  const r = { "--marker": ju[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Pu.marker} ward-marker ward-marker--${t}${qu[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const Ou = "_root_ti0pq_2", Du = "_chip_ti0pq_11", Fu = "_noCase_ti0pq_23", vt = {
  root: Ou,
  chip: Du,
  noCase: Fu
};
function Hu(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function fn({ connection: e, since: t, lastEventAt: a }) {
  const r = Hu(t, a), o = sn(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ i("span", { className: `${vt.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(He, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ i("span", { className: `${vt.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: vt.noCase, children: on(o) })
  ] }) : /* @__PURE__ */ i("span", { className: `${vt.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    he(r)
  ] });
}
const Wu = "_root_yylks_2", zu = "_context_yylks_13", Ku = "_row_yylks_1", Gu = "_heading_yylks_27", Uu = "_headingWrap_yylks_35", Vu = "_meta_yylks_41", Yu = "_chips_yylks_49", Ju = "_title_yylks_56", Qu = "_consequence_yylks_66", Xu = "_actionsWrap_yylks_73", Zu = "_actions_yylks_73", eh = "_action_yylks_73", th = "_overflowPanel_yylks_102", nh = "_measureClip_yylks_113", ah = "_measure_yylks_113", U = {
  root: Wu,
  context: zu,
  row: Ku,
  heading: Gu,
  headingWrap: Uu,
  meta: Vu,
  chips: Yu,
  title: Ju,
  consequence: Qu,
  actionsWrap: Xu,
  actions: Zu,
  action: eh,
  overflowPanel: th,
  measureClip: nh,
  measure: ah
};
function rh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(nt, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function oh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function lh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function ih({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ i("div", { className: U.meta, children: [
    /* @__PURE__ */ n(oh, { chips: e }),
    /* @__PURE__ */ n(lh, { consequence: t, consequenceHint: a })
  ] });
}
function sh({ title: e, chips: t, consequence: a, consequenceHint: r, density: o }) {
  return /* @__PURE__ */ i("div", { className: U.heading, children: [
    /* @__PURE__ */ n(rh, { title: e, density: o }),
    /* @__PURE__ */ n(ih, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function Zt({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function Dn({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function ch({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: o }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(Dn, { disclosure: o }) : t ? [/* @__PURE__ */ n(Dn, { disclosure: o }, "more"), /* @__PURE__ */ n(Zt, { actions: e }, "actions")] : /* @__PURE__ */ n(Zt, { actions: e });
}
function dh(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function uh({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(Zt, { actions: e }) });
}
function hh(e, t) {
  const a = k(), [r, o] = p(!1), l = r && e;
  return { disclosure: { open: l, panelId: a, toggle: () => o(!l) }, close: () => {
    var d, u;
    o(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const mh = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function wh(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && mh(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function fh({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(Cs, { path: e.path, current: e.current }) });
}
function _h(...e) {
  return e.some((t) => t === null);
}
function vh(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function bh(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + vh(e);
}
function ph(e, t, a, r, o) {
  if (o === 0 || _h(t, a, r)) return !1;
  const [l, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - bh(e, l));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function gh(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function yh(e) {
  return Or(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Nh(e, t) {
  return t.length === 0 && e.length === 1 && yh(e[0]);
}
function kh(e, t) {
  const a = _(null), r = _(null), o = _(null), l = _(null), [s, c] = p(!1);
  return S(() => {
    const d = a.current;
    if (!gh(d)) return;
    const u = () => c(ph(d, r.current, o.current, l.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), l.current && h.observe(l.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: o, measureRef: l, collapsed: s && !t };
}
function $h({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ i("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] }) });
}
function Ch({ connection: e }) {
  return e ? /* @__PURE__ */ n(fn, { connection: e.connection, since: e.since }) : null;
}
function Z2({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: o, consequenceHint: l, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: y, measureRef: N, collapsed: A } = kh(s, Nh(s, c)), q = c.length > 0, { disclosure: me, close: re } = hh(A || q, y), Ee = dh(c, s, A, u);
  return /* @__PURE__ */ i("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(fh, { crumb: wh(e, r, t) }),
    /* @__PURE__ */ i("div", { className: U.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: f, className: U.headingWrap, children: /* @__PURE__ */ n(sh, { title: r, chips: a, consequence: o, consequenceHint: l, density: h }) }),
      /* @__PURE__ */ i("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(Ch, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: y, "data-ward-actions": !0, children: /* @__PURE__ */ n(ch, { actions: s, hasMore: q, collapsed: A, onOverflow: u, disclosure: me }) })
      ] })
    ] }),
    /* @__PURE__ */ n(uh, { actions: Ee, disclosure: me, onEscape: re }),
    /* @__PURE__ */ n($h, { actions: s, hasMore: q, measureRef: N })
  ] });
}
const Sh = "_root_td96x_2", Rh = "_body_td96x_16", Fn = {
  root: Sh,
  body: Rh
};
function eT({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${Fn.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: Fn.body, children: a }) });
}
const Th = "_root_bf1pc_2", xh = "_table_bf1pc_9", Lh = "_caption_bf1pc_14", Ah = "_series_bf1pc_23", Eh = "_category_bf1pc_31", Ih = "_cell_bf1pc_39", Mh = "_track_bf1pc_45", Bh = "_lane_bf1pc_52", Ph = "_bar_bf1pc_56", jh = "_value_bf1pc_63", qh = "_swatch_bf1pc_70", Oh = "_empty_bf1pc_78", Z = {
  root: Th,
  table: xh,
  caption: Lh,
  series: Ah,
  category: Eh,
  cell: Ih,
  track: Mh,
  lane: Bh,
  bar: Ph,
  value: jh,
  swatch: qh,
  empty: Oh
}, Dh = "—", Hn = 6;
function Fh(e, t) {
  if (t.length < 1 || t.length > Hn)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${Hn}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function Hh(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function za(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function Wh(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function zh({ value: e, top: t, step: a, format: r, missing: o }) {
  const l = Wh(e, t), s = { "--share": `${l}%` };
  return /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ i("span", { className: Z.track, children: [
    /* @__PURE__ */ n("span", { className: Z.lane, children: l > 0 ? /* @__PURE__ */ n("span", { className: `${Z.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Z.value, children: e === null ? o : r(e) })
  ] }) });
}
function Kh({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ i("th", { scope: "col", className: Z.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Z.swatch, "data-step": za(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function Gh({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ i("section", { className: `${Z.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Z.empty, children: t })
  ] });
}
function Uh({ title: e, categories: t, series: a, top: r, format: o = ae, categoryHead: l = "Category", missing: s = Dh }) {
  return /* @__PURE__ */ n("div", { className: `${Z.root} ward-barchart`, children: /* @__PURE__ */ i("table", { className: Z.table, children: [
    /* @__PURE__ */ n("caption", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Z.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: l }) }),
      /* @__PURE__ */ n(Kh, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Z.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(zh, { value: u.values[d], top: r, step: za(h, a.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function tT(e) {
  Fh(e.categories, e.series);
  const t = Hh(e.series);
  return t === 0 ? /* @__PURE__ */ n(Gh, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Uh, { ...e, top: t });
}
const Vh = "_root_1bfqw_2", Yh = "_figure_1bfqw_7", Jh = "_of_1bfqw_13", Qh = "_bar_1bfqw_18", Xh = "_rows_1bfqw_38", Zh = "_row_1bfqw_38", em = "_label_1bfqw_49", tm = "_amount_1bfqw_54", Ie = {
  root: Vh,
  figure: Yh,
  of: Jh,
  bar: Qh,
  rows: Xh,
  row: Zh,
  label: em,
  amount: tm
};
function nm({ spent: e, ceiling: t, breakdown: a }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ i("div", { className: `${Ie.root} ward-costmeter`, children: [
    /* @__PURE__ */ i("p", { className: `${Ie.figure} ward-stat-value`, children: [
      le(e),
      " ",
      /* @__PURE__ */ i("span", { className: Ie.of, children: [
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
    a && /* @__PURE__ */ n("ul", { className: Ie.rows, children: a.map((o) => /* @__PURE__ */ i("li", { className: `${Ie.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Ie.label, children: o.label }),
      /* @__PURE__ */ n("span", { className: Ie.amount, children: le(o.amount) })
    ] }, o.label)) })
  ] });
}
const am = "_frame_f7bxz_2", rm = "_table_f7bxz_6", om = "_th_f7bxz_12", lm = "_td_f7bxz_13", im = "_sort_f7bxz_53", sm = "_row_f7bxz_65", cm = "_empty_f7bxz_73", qe = {
  frame: am,
  table: rm,
  th: om,
  td: lm,
  sort: im,
  row: sm,
  empty: cm
}, dm = { asc: "ascending", desc: "descending" };
function um(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return dm[t.direction];
}
function hm(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: qe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function mm(e) {
  return e === void 0 ? void 0 : { width: e };
}
function wm({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: qe.th,
      style: mm(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": um(e, t),
      children: hm(e, a)
    }
  );
}
function fm({ row: e, props: t }) {
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
function _m({
  label: e,
  columns: t,
  rows: a,
  rowId: r,
  renderCell: o,
  selectedId: l,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u,
  narrow: h
}) {
  return a.length === 0 ? /* @__PURE__ */ n("div", { className: qe.empty, children: u }) : /* @__PURE__ */ n("div", { className: qe.frame, "data-narrow": h, children: /* @__PURE__ */ i("table", { className: qe.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: qe.head, children: t.map((w) => /* @__PURE__ */ n(wm, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(fm, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: o, selectedId: l, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const vm = "_list_v0s52_2", bm = {
  list: vm
};
function nT({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: bm.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const pm = "_label_1u62a_2", gm = {
  label: pm
};
function aT({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: gm.label, children: t.header }) }, t.key)) }) });
}
const ym = "_stack_bp6a0_2", Nm = {
  stack: ym
};
function rT({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Nm.stack, "data-ward-action-stack": "", children: e });
}
const km = "_set_1z0sq_2", $m = "_legend_1z0sq_7", Cm = "_row_1z0sq_15", Sm = "_control_1z0sq_20", Rm = "_input_1z0sq_26", Tm = "_label_1z0sq_31", xm = "_consequence_1z0sq_36", ze = {
  set: km,
  legend: $m,
  row: Cm,
  control: Sm,
  input: Rm,
  label: Tm,
  consequence: xm
};
function Ka({ legend: e, options: t, value: a, onChange: r, disabled: o, name: l, describedBy: s, variant: c }) {
  const d = k(), u = l ?? d;
  return /* @__PURE__ */ i("fieldset", { className: ze.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: ze.legend, children: e }),
    t.map((h) => {
      const w = `${u}-${h.value}`, f = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ i("div", { className: ze.row, children: [
        /* @__PURE__ */ i("span", { className: ze.control, children: [
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
const Lm = "_root_11gpw_2", Am = "_head_11gpw_10", Em = "_note_11gpw_29", Im = "_index_11gpw_34", Mm = "_dot_11gpw_38", Bm = "_counter_11gpw_49", Pm = "_trailing_11gpw_57", Ke = {
  root: Lm,
  head: Am,
  note: Em,
  index: Im,
  dot: Mm,
  counter: Bm,
  trailing: Pm
};
function jm({ index: e }) {
  return e ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ke.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ke.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function qm({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ke.counter, "aria-hidden": "true", children: e }) : null;
}
function Wn({ title: e, index: t, note: a, counter: r, kind: o = "micro", trailing: l }) {
  return /* @__PURE__ */ i("div", { className: `${Ke.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ i("h2", { className: Ke.head, children: [
      /* @__PURE__ */ n(jm, { index: t }),
      e,
      r && /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ke.note, children: a }),
    /* @__PURE__ */ n(qm, { counter: r }),
    l === void 0 ? null : /* @__PURE__ */ n("span", { className: Ke.trailing, children: l })
  ] });
}
const Om = "_strip_c3x3u_2", Dm = "_cell_c3x3u_7", Fm = "_value_c3x3u_12", Hm = "_link_c3x3u_29", Wm = "_label_c3x3u_49", zm = "_tiles_c3x3u_101", Fe = {
  strip: Om,
  cell: Dm,
  value: Fm,
  link: Hm,
  label: Wm,
  tiles: zm
};
function Ga(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((o) => o.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Ua = (e) => `${Fe.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Km({ cell: e }) {
  return /* @__PURE__ */ i("div", { className: Fe.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: Ua(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${Fe.label} ward-stat-label`, children: e.label })
  ] });
}
function Gm({ cell: e, href: t }) {
  return /* @__PURE__ */ i("div", { className: Fe.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: Ua(e), title: e.hint, children: /* @__PURE__ */ i("a", { className: `${Fe.link} ward-stat-link`, href: D(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${Fe.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Va = (e) => e.href === void 0 ? /* @__PURE__ */ n(Km, { cell: e }, e.label) : /* @__PURE__ */ n(Gm, { cell: e, href: e.href }, e.label);
function qt({ cells: e, divided: t = !1 }) {
  return Ga("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${Fe.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(Va) });
}
const zn = 6;
function oT({ cells: e }) {
  Ga("StatTiles", e, [1, 2 * zn]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, zn) };
  return /* @__PURE__ */ n("dl", { className: `${Fe.tiles} ward-stattiles`, style: t, children: e.map(Va) });
}
const Um = "_root_1eb1u_2", Vm = "_track_1eb1u_8", Ym = "_thumb_1eb1u_46", Jm = "_labelHidden_1eb1u_64", Qm = "_label_1eb1u_64", Xm = "_lockedNote_1eb1u_84", Ge = {
  root: Um,
  track: Vm,
  thumb: Ym,
  labelHidden: Jm,
  label: Qm,
  lockedNote: Xm
};
function Zm(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function ew(e) {
  return e ? `${Ge.label} ${Ge.labelHidden}` : Ge.label;
}
function tw(e, t, a) {
  return e && !t && a ? a : void 0;
}
function nw(e, t, a, r) {
  return { "aria-describedby": Pt(at(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function aw({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ve({ label: e, checked: t, onChange: a, disabled: r, locked: o, describedBy: l, labelHidden: s, disabledReason: c }) {
  const d = k(), u = `${d}switch`, h = `${d}reason`, w = Ae(), { on: f, off: y } = Zm(t, r, o, w !== null), N = tw(y, w !== null, c);
  return /* @__PURE__ */ i("span", { className: `${Ge.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": f,
        "aria-label": e,
        "aria-labelledby": d,
        ...nw(h, l, w, N),
        className: `${Ge.track} ward-switch`,
        "data-on": f,
        "data-locked": o ? !0 : void 0,
        disabled: y,
        onClick: () => !y && (a == null ? void 0 : a(!f)),
        children: /* @__PURE__ */ n("span", { className: Ge.thumb })
      }
    ),
    /* @__PURE__ */ i("label", { id: d, htmlFor: u, className: ew(s), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ge.lockedNote, children: "always on" })
    ] }),
    /* @__PURE__ */ n(aw, { id: h, reason: N })
  ] });
}
const rw = "_bar_1vp69_2", ow = "_skip_1vp69_11", lw = "_mark_1vp69_22", iw = "_nav_1vp69_30", sw = "_list_1vp69_34", cw = "_select_1vp69_41", dw = "_selectTrigger_1vp69_45", uw = "_dest_1vp69_52", hw = "_actor_1vp69_71", mw = "_actorMark_1vp69_84", ww = "_actorLabel_1vp69_89", fw = "_tagline_1vp69_108", se = {
  bar: rw,
  skip: ow,
  mark: lw,
  nav: iw,
  list: sw,
  select: cw,
  selectTrigger: dw,
  dest: uw,
  actor: hw,
  actorMark: mw,
  actorLabel: ww,
  tagline: fw
};
function _w(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function vw(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function lT({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: o, onNavigate: l, skipTo: s = "main" }) {
  const c = vw(r);
  return /* @__PURE__ */ i("header", { className: se.bar, children: [
    /* @__PURE__ */ n("a", { className: `${se.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: se.mark, children: e }),
    o && /* @__PURE__ */ n("span", { className: se.tagline, children: o }),
    /* @__PURE__ */ i("nav", { className: se.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: se.list, children: t.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${se.dest} ward-target`,
          href: D(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => l == null ? void 0 : l(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        La,
        {
          className: se.select,
          triggerClassName: se.selectTrigger,
          "aria-label": "Destination",
          value: a,
          options: t.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => l == null ? void 0 : l(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ i("span", { className: se.actor, children: [
      /* @__PURE__ */ n("span", { className: se.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: _w(c) })
    ] })
  ] });
}
const bw = "_tree_zzoob_2", pw = "_item_zzoob_6", gw = "_row_zzoob_10", yw = "_button_zzoob_22", Tt = {
  tree: bw,
  item: pw,
  row: gw,
  button: yw
}, Ya = Ne(null);
function Nw({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Mt({ orientation: "vertical" });
  return /* @__PURE__ */ n(Ya.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: Tt.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const kw = { ArrowRight: !0, ArrowLeft: !1 };
function Kn(e) {
  return e ? !0 : void 0;
}
function $w(e, t) {
  const a = kw[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function Cw(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function Sw(e) {
  const t = [Tt.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function Rw(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Tw(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function xw(e) {
  return typeof e == "string" ? e : void 0;
}
function Lw({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Aw({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Ja(e) {
  const t = ye(Ya);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = Rw(e);
  return /* @__PURE__ */ i("li", { className: Tt.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Sw(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": Kn(e.unresolved),
        "data-inherited": Kn(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: `${Tt.button} ward-treeitem-btn`,
            onClick: () => Cw(e),
            onKeyDown: (r) => $w(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Tw(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: xw(e.label), children: e.label }),
              /* @__PURE__ */ n(Lw, { value: e.detail }),
              /* @__PURE__ */ n(Aw, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Ew = "_frame_gxspk_2", Iw = "_subjectRail_gxspk_22", Mw = "_subject_gxspk_22", Bw = "_rail_gxspk_42", Pw = "_record_gxspk_57", jw = "_recordBody_gxspk_102", qw = "_stageGrid_gxspk_157", Ow = "_band_gxspk_171", Dw = "_bandBody_gxspk_179", Fw = "_bandActions_gxspk_184", Hw = "_scroller_gxspk_192", Ww = "_board_gxspk_219", zw = "_lanes_gxspk_228", Kw = "_cardGrid_gxspk_262", ee = {
  frame: Ew,
  subjectRail: Iw,
  subject: Mw,
  rail: Bw,
  record: Pw,
  recordBody: jw,
  stageGrid: qw,
  band: Ow,
  bandBody: Dw,
  bandActions: Fw,
  scroller: Hw,
  board: Ww,
  lanes: zw,
  cardGrid: Kw
};
function iT({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: ee.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function Gn(e) {
  return e ? "true" : void 0;
}
function sT({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: o, ruled: l }) {
  return /* @__PURE__ */ i("div", { className: ee.subjectRail, "data-ward-subject-rail": a, "data-ruled": Gn(l), children: [
    /* @__PURE__ */ n("div", { className: ee.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ee.rail, "data-sticky": Gn(o), "aria-label": r, children: t })
  ] });
}
function cT({ title: e, children: t, note: a, trailing: r, pad: o = "block", label: l, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: ee.record, "aria-label": l, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(Wn, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ i("section", { className: ee.record, "aria-label": l, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(Wn, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: ee.recordBody, "data-pad": o, "data-measure": c, children: t })
  ] });
}
const Gw = "_form_1j8ub_2", Uw = "_fields_1j8ub_9", Vw = "_actions_1j8ub_19", Kt = {
  form: Gw,
  fields: Uw,
  actions: Vw
};
function dT({ label: e, children: t, actions: a, onSubmit: r }) {
  const o = (l) => {
    l.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ i("form", { className: Kt.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Kt.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: Kt.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function uT({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ i("section", { className: ee.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ee.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: ee.bandActions, children: t })
  ] });
}
const Yw = "(max-width: 767.98px)";
function _n({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(dn, { className: ee.scroller, label: e, count: a ?? Dr.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function Jw({ lanes: e, label: t, laneLabel: a }) {
  const [r, o] = p(null), l = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ i("div", { className: ee.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(j, { kind: "select", label: a, value: (l == null ? void 0 : l.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ n(_n, { label: t, children: l == null ? void 0 : l.content })
  ] });
}
function Qw({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: ee.board, "data-ward-board": "", children: /* @__PURE__ */ n(_n, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(ca, { children: a.content }, a.id)) }) });
}
function hT({ children: e, label: t = "Workflow board", lanes: a, laneLabel: r = "Column" }) {
  const o = dt(Yw);
  return a === void 0 ? /* @__PURE__ */ n(_n, { label: t, children: e }) : o ? /* @__PURE__ */ n(Jw, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(Qw, { lanes: a, label: t });
}
function mT({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), l = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ n(dn, { className: ee.stageGrid, label: a, count: o, "data-ward-stage-grid": "", "data-floor": r, style: l, children: t });
}
function wT({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${ee.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const Xw = "_block_6tv5x_3", Zw = "_sentence_6tv5x_10", ef = "_meta_6tv5x_19", tf = "_ways_6tv5x_24", nf = "_action_6tv5x_38", af = "_strip_6tv5x_42", rf = "_loading_6tv5x_61", of = "_label_6tv5x_69", lf = "_counter_6tv5x_76", _e = {
  block: Xw,
  sentence: Zw,
  meta: ef,
  ways: tf,
  action: nf,
  strip: af,
  loading: rf,
  label: of,
  counter: lf
};
function sf({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function Ot({ sentence: e, action: t, children: a, role: r = "status", tone: o, kind: l, ask: s }) {
  return /* @__PURE__ */ i("div", { className: `${_e.block} ward-state${l === void 0 ? "" : ` ${l}`}`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ i("p", { className: _e.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ i(x, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(sf, { action: t })
  ] });
}
function cf(e) {
  return /* @__PURE__ */ n(Ot, { ...e, kind: "ward-emptystate" });
}
function fT({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(Ot, { sentence: e, action: a, children: /* @__PURE__ */ i("p", { className: _e.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function df({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${_e.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function _T({ ways: e, ...t }) {
  return /* @__PURE__ */ n(Ot, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(df, { ways: e }) });
}
function vT({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(Ot, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ i("p", { className: _e.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function bT({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ i("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function pT({ queued: e, since: t }) {
  return /* @__PURE__ */ i("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function gT({ label: e, startedAt: t }) {
  const a = _(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = p(!1);
  S(() => {
    const s = window.setTimeout(() => o(!0), be.load);
    return () => window.clearTimeout(s);
  }, []);
  const l = sn(a.current, r);
  return /* @__PURE__ */ i("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: _e.counter, children: on(l) }) : null
  ] });
}
const uf = "_note_cigdt_2", hf = {
  note: uf
};
function mf({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ i("p", { className: hf.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const wf = "_card_k7btg_3", ff = "_hit_k7btg_31", _f = "_head_k7btg_44", vf = "_title_k7btg_51", bf = "_meta_k7btg_57", pf = "_since_k7btg_66", gf = "_sep_k7btg_76", yf = "_fields_k7btg_80", Nf = "_field_k7btg_80", kf = "_last_k7btg_98", $f = "_reason_k7btg_110", de = {
  card: wf,
  hit: ff,
  head: _f,
  title: vf,
  meta: bf,
  since: pf,
  sep: gf,
  fields: yf,
  field: Nf,
  last: kf,
  reason: $f
}, Cf = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Sf(e, t, a) {
  const r = gt(e, "blue"), o = gt(e, "orange"), l = gt(e, "green"), s = _(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: o, green: l };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Cf[d.type];
      u && c[u]();
    });
  }, [r, a, l, t, o]);
}
const Rf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Tf(e, t) {
  return Rf[t](e);
}
function xf({ item: e, connection: t }) {
  const a = /* @__PURE__ */ n("span", { className: de.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ i("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    a,
    /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep })
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
function Lf({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ i("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function Af({ reason: e }) {
  return e ? /* @__PURE__ */ i("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Ef({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: de.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: de.field, children: Tf(e, a) }, a)) });
}
const en = (e) => e ? !0 : void 0;
function If(e) {
  return { "--stream": ge(e.streamStep, "id") };
}
function Mf(e, t, a) {
  e == null || e(t, a);
}
function Bf(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Pf({ item: e, stale: t }) {
  var r, o;
  const a = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: de.last, "data-stale": en(t), children: a }) : null;
}
function Dt(e) {
  const t = e.fields ?? [], a = e.item, r = _(null);
  Sf(r, a.key, e.feed);
  const o = Bf(e.feed), l = If(a);
  return /* @__PURE__ */ i(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: de.card,
      style: l,
      "data-selected": en(e.selected),
      "data-flagged": en(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: de.hit, onClick: (s) => Mf(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(Lf, { item: a }),
        /* @__PURE__ */ n(nt, { as: "p", className: de.title, text: a.title }),
        /* @__PURE__ */ n(xf, { item: a, connection: o }),
        /* @__PURE__ */ n(Af, { reason: a.blockedReason }),
        /* @__PURE__ */ n(Ef, { item: a, fields: t }),
        /* @__PURE__ */ n(Pf, { item: a, stale: o === "stale" })
      ]
    }
  );
}
const jf = "_column_1j8bi_3", qf = "_head_1j8bi_21", Of = "_label_1j8bi_30", Df = "_count_1j8bi_39", Ff = "_list_1j8bi_53", st = {
  column: jf,
  head: qf,
  label: Of,
  count: Df,
  list: Ff
};
function Qa(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function Hf({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ i("div", { className: st.head, children: [
    /* @__PURE__ */ n("h2", { className: st.label, id: a, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ i("span", { className: st.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Wf(e) {
  return /* @__PURE__ */ n("div", { className: st.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      Dt,
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
function zf({ column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: l, feed: s, roving: c, onKeyDown: d }) {
  const u = k(), h = e.cap !== void 0 && t.length > e.cap, w = Qa(t, r);
  return /* @__PURE__ */ i("section", { className: st.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Hf, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(Wf, { column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: l, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n(mf, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const Kf = "_foot_cs4jr_2", Gf = "_note_cs4jr_13", Uf = "_link_cs4jr_19", Gt = {
  foot: Kf,
  note: Gf,
  link: Uf
};
function yT({ configureHref: e }) {
  return /* @__PURE__ */ i("footer", { className: Gt.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Gt.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Gt.link} ward-target`, href: D(e), children: "Configure board" })
  ] });
}
const Vf = "_head_1tfi5_3", Yf = "_identity_1tfi5_12", Jf = "_titleRow_1tfi5_18", Qf = "_title_1tfi5_18", Xf = "_key_1tfi5_35", Zf = "_rollup_1tfi5_45", e_ = "_tools_1tfi5_53", t_ = "_swatch_1tfi5_101", n_ = "_mark_1tfi5_108", Se = {
  head: Vf,
  identity: Yf,
  titleRow: Jf,
  title: Qf,
  key: Xf,
  rollup: Zf,
  tools: e_,
  swatch: t_,
  mark: n_
}, Un = "initials:";
function a_(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function r_(e) {
  const t = [a_(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function o_(e) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ i("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    r_(e)
  ] });
}
function l_(e) {
  return e.startsWith(Un) ? e.slice(Un.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function i_({ markRef: e, streamStep: t }) {
  const a = { "--stream": ge(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Se.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: l_(e) }) : /* @__PURE__ */ n("span", { className: Se.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function s_({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(j, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function NT({
  stream: e,
  rollups: t,
  connection: a,
  lastEventAt: r,
  owners: o,
  owner: l,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ i("div", { className: Se.head, children: [
    /* @__PURE__ */ i("div", { className: Se.identity, children: [
      /* @__PURE__ */ i("div", { className: Se.titleRow, children: [
        /* @__PURE__ */ n(i_, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Se.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Se.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Se.rollup, "aria-live": "polite", children: o_(t) })
    ] }),
    /* @__PURE__ */ i("div", { className: Se.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(s_, { owners: o, owner: l, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(fn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const c_ = "_head_1sejb_14", d_ = "_line_1sejb_15", u_ = "_cHandle_1sejb_36", h_ = "_cName_1sejb_41", m_ = "_nameLine_1sejb_49", w_ = "_cLabel_1sejb_56", f_ = "_cCap_1sejb_61", __ = "_cShown_1sejb_66", v_ = "_name_1sejb_49", b_ = "_noCap_1sejb_88", p_ = "_state_1sejb_102", g_ = "_handle_1sejb_111", y_ = "_sub_1sejb_137", O = {
  head: c_,
  line: d_,
  cHandle: u_,
  cName: h_,
  nameLine: m_,
  cLabel: w_,
  cCap: f_,
  cShown: __,
  name: v_,
  noCap: b_,
  state: p_,
  handle: g_,
  sub: y_
}, N_ = "can't be hidden or collapsed", k_ = "terminal · counted, not a column", $_ = "A human gate is always shown, so people see what waits for them.", C_ = "A terminal stage is counted, not shown as a column.";
function kT() {
  return /* @__PURE__ */ i("div", { className: O.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: O.cHandle }),
    /* @__PURE__ */ n("span", { className: O.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: O.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: O.cShown, children: "Shown" })
  ] });
}
function S_(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function R_(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Vn(e) {
  return e.gate ? N_ : e.terminal ? k_ : R_(e.agentsMounted);
}
function T_(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function x_({ stage: e }) {
  return /* @__PURE__ */ i("span", { className: O.cName, children: [
    /* @__PURE__ */ i("span", { className: O.nameLine, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Vn(e) && /* @__PURE__ */ n("span", { className: O.sub, children: Vn(e) })
  ] });
}
function L_(e) {
  return e === void 0 ? "" : String(e);
}
function A_(e) {
  return e === "" ? void 0 : Number(e);
}
function E_({ name: e, onReorder: t }) {
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
      onKeyDown: (r) => !a && T_(r, t),
      children: "⠿"
    }
  ) });
}
function I_({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${O.cCap} ${O.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: O.cCap, children: /* @__PURE__ */ n(j, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: L_(t.cap), onChange: (r) => a({ ...t, cap: A_(r) }) }) });
}
function M_(e) {
  return e.gate ? $_ : e.terminal ? C_ : void 0;
}
function B_({ stage: e, config: t, onChange: a }) {
  const r = Ae() !== null, o = S_(e, t.shown), l = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ i("span", { className: O.cShown, children: [
    /* @__PURE__ */ n(Ve, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, disabledReason: M_(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: O.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && s(!o.shown), children: o.state })
  ] });
}
function P_(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function $T({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ i("div", { className: O.line, "data-kind": P_(e), children: [
    /* @__PURE__ */ n(E_, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(x_, { stage: e }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: /* @__PURE__ */ n(j, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (o) => a({ ...t, label: o }) }) }),
    /* @__PURE__ */ n(I_, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(B_, { stage: e, config: t, onChange: a })
  ] });
}
const j_ = "_body_8qsv9_2", q_ = "_head_8qsv9_9", O_ = "_summary_8qsv9_19", D_ = "_block_8qsv9_20", F_ = "_actionsBlock_8qsv9_21", H_ = "_title_8qsv9_41", W_ = "_note_8qsv9_46", z_ = "_k_8qsv9_51", K_ = "_kv_8qsv9_58", G_ = "_row_8qsv9_64", U_ = "_label_8qsv9_75", V_ = "_value_8qsv9_84", Y_ = "_quote_8qsv9_90", J_ = "_actions_8qsv9_21", Q_ = "_resolve_8qsv9_111", H = {
  body: j_,
  head: q_,
  summary: O_,
  block: D_,
  actionsBlock: F_,
  title: H_,
  note: W_,
  k: z_,
  kv: K_,
  row: G_,
  label: U_,
  value: V_,
  quote: Y_,
  actions: J_,
  resolve: Q_
};
function X_(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Z_(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function ev(e) {
  const t = wt(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function tv(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function nv(e, t, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...jt(ev(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...X_(e),
    ...tv(a),
    ...Z_(e, t)
  ];
}
function av({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ i("section", { className: H.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: H.k, children: t }),
    e
  ] });
}
function rv(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function ov({ item: e, showKey: t }) {
  const a = rv(e);
  return !t && !a ? null : /* @__PURE__ */ i("div", { className: H.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function lv({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ i("div", { className: H.block, children: [
    /* @__PURE__ */ n("p", { className: H.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: H.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: H.note, children: e.agentMeta })
  ] }) : null;
}
function CT({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: o, resolve: l, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = k(), w = nv(e, o, d);
  return /* @__PURE__ */ n(rt, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ i("div", { className: H.body, children: [
    /* @__PURE__ */ n(ov, { item: e, showKey: u }),
    /* @__PURE__ */ i("div", { className: H.summary, children: [
      /* @__PURE__ */ n("h2", { className: H.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: H.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: H.kv, children: w.map(([f, y, N]) => /* @__PURE__ */ i("div", { className: H.row, children: [
      /* @__PURE__ */ n("dt", { className: H.label, children: f }),
      /* @__PURE__ */ n("dd", { className: H.value, children: y })
    ] }, N ?? f)) }),
    /* @__PURE__ */ n(lv, { item: e }),
    /* @__PURE__ */ i("div", { className: H.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: H.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: H.note, children: c })
    ] }),
    /* @__PURE__ */ n(av, { resolve: l, label: s ?? "Ways out of this hold" })
  ] }) });
}
const iv = "_root_3azmy_2", sv = "_list_3azmy_7", cv = "_item_3azmy_12", dv = "_box_3azmy_18", uv = "_text_3azmy_23", hv = "_note_3azmy_28", Je = {
  root: iv,
  list: sv,
  item: cv,
  box: dv,
  text: uv,
  note: hv
};
function Ft({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ i("div", { className: Je.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${Je.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ i("li", { className: `${Je.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Je.box, children: /* @__PURE__ */ n(wn, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Je.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${Je.note} ward-checklist-note`, children: t })
  ] });
}
const mv = "_rail_znbbp_2", wv = "_k_znbbp_11", fv = "_head_znbbp_19", _v = "_section_znbbp_25", vv = "_card_znbbp_39", bv = "_strip_znbbp_46", pv = "_skeleton_znbbp_60", gv = "_skeletonLabel_znbbp_74", yv = "_bar_znbbp_80", Nv = "_note_znbbp_89", fe = {
  rail: mv,
  k: wv,
  head: fv,
  section: _v,
  card: vv,
  strip: bv,
  skeleton: pv,
  skeletonLabel: gv,
  bar: yv,
  note: Nv
};
function kv(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Ut({ title: e, children: t }) {
  return /* @__PURE__ */ i("section", { className: fe.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: fe.k, children: e }),
    t
  ] });
}
function $v({ column: e, count: t }) {
  return /* @__PURE__ */ i("div", { className: fe.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: fe.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: fe.bar, "aria-hidden": "true" }, r))
  ] });
}
function Cv({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(zf, { column: o, items: t.filter((l) => l.stage === o.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, o.id));
}
function Sv(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Cv, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n($v, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function ST(e) {
  const t = kv(e.onOpen), a = Qa(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ i("aside", { className: fe.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${fe.k} ${fe.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ut, { title: "Card", children: /* @__PURE__ */ n("div", { className: fe.card, children: a && /* @__PURE__ */ n(Dt, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ i(Ut, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: fe.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Sv, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ut, { title: "Effect of this config", children: /* @__PURE__ */ n(Ft, { items: e.effects, density: "compact" }) })
  ] });
}
function Rv(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function Tv(e) {
  return Math.ceil(e.length / 2);
}
function xv(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Xa(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Lv(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const o = Xa(e);
  o !== void 0 && a(o), r(xv(e.type));
}
function Av(e, t, a, r, o) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (l) => Lv(l, a, r, o));
  }, [e, t, a, r, o]);
}
function Ev(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Iv(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Mv(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Bv(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + B.height.card + " + " + B.height.cardRow + " * " + String(Tv(t ?? [])) + ")"
  };
}
function Pv(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function jv(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: le(e.cost) }) : null;
}
function qv(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Ov(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function Dv(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function Fv(e, t) {
  return t === void 0 ? e : Rv(e, t.ref);
}
function Hv(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ut(e) {
  return e === !0 ? "true" : void 0;
}
function Za(e) {
  const t = e.item, a = t.run, r = a !== void 0, o = _(null), l = gt(o), s = _(/* @__PURE__ */ new Set()), [c, d] = p(Ev(t));
  Av(e.feed, t.key, s, d, l);
  const u = Iv(t, r), h = Mv(t, a), w = Bv(t, e.fields), f = Dv(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      ...Hv(e),
      className: "ward-workcard",
      "data-flagged": ut(t.flagged),
      "data-selected": ut(e.selected),
      style: w,
      ref: Fv(o, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        Pv(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          jv(t, e.fields),
          qv(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ i("span", { className: "ward-workcard-lastrow", children: [
          Ov(a, c, e.connection, t.changedAt),
          f !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function Wv({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function zv(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Kv(e, t, a) {
  return /* @__PURE__ */ i("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function Gv(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Wv, { count: e.items.length, cap: e.column.cap });
}
function Uv(e, t) {
  return e.roving ?? t;
}
function Vv(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function Yv(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    Za,
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
function Jv(e) {
  const t = k(), a = Mt({ orientation: "vertical" }), r = Uv(e, a), o = zv(e);
  return /* @__PURE__ */ i("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": ut(o), "data-gate": ut(e.column.gate), children: [
    Kv(e.column, e.items.length, t),
    Gv(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Vv(e, a), children: Yv(e, r) })
  ] });
}
function Qv(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function Xv(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(j, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function Zv(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function RT(e) {
  return /* @__PURE__ */ i("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ i("div", { children: [
      /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Qv(e.rollups) })
    ] }),
    /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
      Xv(e),
      Zv(e.onConfigure),
      /* @__PURE__ */ n(fn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function eb(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function tb(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ve, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ve, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function nb(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ i(x, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function TT(e) {
  const t = e.stage;
  return /* @__PURE__ */ i("div", { className: "ward-configrow", "data-mandatory": ut(eb(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: tb(e) }),
    /* @__PURE__ */ n(j, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(Na, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    nb(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function xT(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ i("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(Za, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Jv, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ i("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function ab(e, t) {
  const a = Xa(e);
  a !== void 0 && t(a);
}
function rb(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => ab(r, a));
  }, [e, t, a]);
}
function ob(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function lb(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function ib(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function sb(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function LT(e) {
  var s;
  const t = e.item, a = t.run, [r, o] = p((s = t.run) == null ? void 0 : s.lastStep);
  rb(e.feed, t.key, o);
  const l = [...ob(t), ...lb(t)];
  return /* @__PURE__ */ i(rt, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ i("dl", { className: "ward-kv", children: [
      l.map((c) => /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      ib(a, r)
    ] }),
    sb(t, e.actions)
  ] });
}
const cb = "_card_1nkkx_3", db = "_head_1nkkx_30", ub = "_mark_1nkkx_38", hb = "_name_1nkkx_50", mb = "_chips_1nkkx_71", wb = "_description_1nkkx_77", fb = "_run_1nkkx_82", _b = "_sep_1nkkx_91", vb = "_facts_1nkkx_97", bb = "_fact_1nkkx_97", pb = "_factLabel_1nkkx_111", gb = "_factValue_1nkkx_115", ie = {
  card: cb,
  head: db,
  mark: ub,
  name: hb,
  chips: mb,
  description: wb,
  run: fb,
  sep: _b,
  facts: vb,
  fact: bb,
  factLabel: pb,
  factValue: gb
}, yb = { live: "done", draft: "running", paused: "meta" };
function Nb(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function kb({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: yb[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function $b({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function Cb({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ i("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function Sb({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ i("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function Rb(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Tb({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: o, facts: l, className: s }) {
  const c = { "--stream": ge(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ i(
    "article",
    {
      "aria-current": d,
      className: Nb(s),
      style: c,
      "data-selected": d,
      "data-paused": Rb(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ i("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: D(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n($b, { description: e.description }),
        /* @__PURE__ */ n(Cb, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(kb, { versions: e.versions }),
        /* @__PURE__ */ n(Sb, { facts: l })
      ]
    }
  );
}
const xb = "_list_4dcyc_2", Lb = "_row_4dcyc_11", Ab = "_head_4dcyc_23", Eb = "_id_4dcyc_30", Ib = "_lock_4dcyc_35", Mb = "_reason_4dcyc_41", Bb = "_remove_4dcyc_46", Pb = "_clauses_4dcyc_50", jb = "_clause_4dcyc_50", qb = "_label_4dcyc_64", Ob = "_cell_4dcyc_71", Db = "_value_4dcyc_76", ce = {
  list: xb,
  row: Lb,
  head: Ab,
  id: Eb,
  lock: Ib,
  reason: Mb,
  remove: Bb,
  clauses: Pb,
  clause: jb,
  label: qb,
  cell: Ob,
  value: Db
}, er = Ne(!1);
function AT({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(er.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function Fb({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(j, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => a(e.key, o) });
}
function Hb({ reason: e }) {
  return /* @__PURE__ */ i("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function Wb({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ i("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Hb, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Yn(e, t) {
  return e.locked ? void 0 : t;
}
function ET({ rule: e, onChange: t, onRemove: a }) {
  if (!ye(er)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Yn(e, t);
  return /* @__PURE__ */ i("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Wb, { rule: e, onRemove: Yn(e, a) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((o) => /* @__PURE__ */ i("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(Fb, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const zb = "_ladder_1xdeh_2", Kb = "_cell_1xdeh_7", Gb = "_empty_1xdeh_26", Ub = "_name_1xdeh_34", Vb = "_holder_1xdeh_40", Yb = "_request_1xdeh_46", Jb = "_swatches_1xdeh_51", Qb = "_swatch_1xdeh_51", Xb = "_tilesFrame_1xdeh_78", Zb = "_tiles_1xdeh_78", ep = "_tile_1xdeh_78", tp = "_bar_1xdeh_117", np = "_hex_1xdeh_128", ap = "_note_1xdeh_138", M = {
  ladder: zb,
  cell: Kb,
  empty: Gb,
  name: Ub,
  holder: Vb,
  request: Yb,
  swatches: Jb,
  swatch: Qb,
  tilesFrame: Xb,
  tiles: Zb,
  tile: ep,
  bar: tp,
  hex: np,
  note: ap
}, IT = "not validated yet, pending a CVD matrix and dark stepping";
function rp(e) {
  return e.reserved ? "reserved" : ht(e.step) ? "validated" : "partial";
}
function tr(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function op(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function lp({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(He, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${M.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function ip(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function sp(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Jn = (e) => String(e).padStart(2, "0");
function cp(e, t, a) {
  return e === "reserved" ? "Reserved until revalidated" : a ? "yours" : t ?? tr(e, void 0);
}
function dp({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${M.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${M.hex} ward-ladder-hex`, children: r ? `step ${Jn(e)}` : io(e) }),
    /* @__PURE__ */ n("span", { className: `${M.note} ward-ladder-note`, children: r ? a : `Step ${Jn(e)} · ${a}` })
  ] });
}
function up({ step: e, value: t, taken: a, onChange: r, presentation: o, disabled: l }) {
  const s = rp(e), c = tr(s, a), d = c !== "free", u = d || l, h = t === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, y = `${w} · ${o === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...sp(d, h, u), "data-validation": s, style: op(e, s), onClick: f, onKeyDown: (A) => ip(A, f) }, label: y, name: w, holder: c, validation: s, note: cp(s, a, h), step: e.step };
}
const hp = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${M.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${M.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(dp, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ i("span", { ...e.shared, className: `${M.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(lp, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${M.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${M.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function mp(e) {
  return hp[e.presentation](up(e));
}
function wp(e) {
  for (const t of e)
    if (!t.reserved && !Bt(t.step)) throw new Error("colour ladder renders token steps only");
}
function fp() {
  return /* @__PURE__ */ i("div", { className: `${M.cell} ward-ladder-cell ${M.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${M.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${M.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${M.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function _p(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const vp = { list: M.ladder, swatches: M.swatches, tiles: M.tilesFrame };
function bp() {
  return /* @__PURE__ */ i("div", { className: `${M.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${M.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${M.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${M.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const pp = { list: fp, swatches: () => null, tiles: bp };
function gp(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function nr(e) {
  const t = e.takenBy ?? {}, a = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  wp(e.steps);
  const r = _p(e), o = pp[r], l = /* @__PURE__ */ i(x, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(mp, { step: s, value: e.value, taken: t[s.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...gp(e.disabled === !0), className: `${vp[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: M.tiles, children: l }) : l });
}
const yp = "_rail_s06lm_2", Np = "_section_s06lm_12", kp = "_sectionFlush_s06lm_22", $p = "_head_s06lm_26", Cp = "_headLabel_s06lm_34", Sp = "_sample_s06lm_42", Rp = "_sampleLabel_s06lm_47", Tp = "_sampleTitle_s06lm_54", xp = "_sampleMeta_s06lm_59", Lp = "_trace_s06lm_65", Ap = "_traceHead_s06lm_70", Ep = "_steps_s06lm_78", Ip = "_step_s06lm_78", Mp = "_stepTitle_s06lm_97", Bp = "_hollow_s06lm_107", Pp = "_stepBody_s06lm_115", jp = "_stepDetail_s06lm_127", qp = "_publish_s06lm_132", Op = "_reason_s06lm_138", Dp = "_note_s06lm_143", Fp = "_reveal_s06lm_148", $ = {
  rail: yp,
  section: Np,
  sectionFlush: kp,
  head: $p,
  headLabel: Cp,
  sample: Sp,
  sampleLabel: Rp,
  sampleTitle: Tp,
  sampleMeta: xp,
  trace: Lp,
  traceHead: Ap,
  steps: Ep,
  step: Ip,
  stepTitle: Mp,
  hollow: Bp,
  stepBody: Pp,
  stepDetail: jp,
  publish: qp,
  reason: Op,
  note: Dp,
  reveal: Fp
}, Qn = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Hp = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Wp = { ok: "greenFill", finding: "orangeFill", action: "blue" }, zp = { notSimulated: "not simulated", running: "running" };
function Kp(e) {
  return e.presentation === "foundry";
}
function Gp(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const a = t.filter((r) => !r.met);
  return a.length > 0 ? `Publish is disabled: ${a.length} of ${t.length} gate conditions unmet: ${a[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Up(e, t) {
  var r;
  const a = Hp[e.status];
  return a !== void 0 ? a : ((r = t.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function Vp(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Yp(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Jp(e) {
  if (Vp(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Qp(e) {
  const [t, a] = p(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Xp(e) {
  const t = zp[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(He, { size: 6, kind: Wp[e.kind], label: e.kind });
}
function Zp(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ i("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function eg(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function tg(e) {
  const { step: t } = e;
  return /* @__PURE__ */ i(Qp, { kind: t.kind, children: [
    /* @__PURE__ */ n(Xp, { kind: t.kind }),
    /* @__PURE__ */ i("span", { className: $.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: $.stepTitle, children: t.title }),
      /* @__PURE__ */ n(Zp, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(eg, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function ng(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(ue(t)), a.join(" · ");
}
function ar(e) {
  const t = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ i("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.traceHead, id: t, children: ng(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: $.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(tg, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function ag(e) {
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
function rg(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function og(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? ua(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(qt, { divided: !0, cells: t }) });
}
function lg(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: ua(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function ig(e) {
  const t = lg(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ i("p", { className: $.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(qt, { divided: !0, cells: t }) });
}
function rr(e) {
  const t = k();
  return e.reason !== null ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("p", { className: `${$.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function sg(e) {
  return /* @__PURE__ */ i("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ n(rr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: $.note, children: e.note })
  ] });
}
function cg(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ n(rr, { reason: e.reason, onPublish: e.onPublish }) });
}
function or(e) {
  return /* @__PURE__ */ i("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: Qn[e.run.status].role, label: Qn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function dg(e, t) {
  const [a, r] = p(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((t == null ? void 0 : t.subscribe) === void 0 || e.status !== "running"))
      return t.subscribe("*", (o) => {
        (o.type === "run.step" || o.type === "run.finding") && r((l) => {
          var s, c;
          return [...l, { kind: o.type === "run.finding" ? "finding" : "action", title: ((s = o.step) == null ? void 0 : s.label) ?? "step", detail: (c = o.step) == null ? void 0 : c.tool }];
        });
      });
  }, [t, e.status]), a;
}
function ug(e) {
  var a;
  Yp(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(or, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(ag, { sample: e.run.sample }),
    /* @__PURE__ */ n(ar, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(og, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Ft, { items: e.checklist }) }),
    /* @__PURE__ */ n(sg, { reason: Gp(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function hg(e) {
  var r;
  const t = dg(e.run, e.feed);
  Jp(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(or, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(rg, { sample: e.run.sample }),
    /* @__PURE__ */ n(ar, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(ig, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Ft, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(cg, { reason: Up(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function MT(e) {
  return Kp(e) ? /* @__PURE__ */ n(hg, { ...e }) : /* @__PURE__ */ n(ug, { ...e });
}
const mg = "_list_142ip_3", wg = "_row_142ip_9", fg = "_condition_142ip_18", _g = "_action_142ip_24", Nt = {
  list: mg,
  row: wg,
  condition: fg,
  action: _g
}, lr = Ne(!1);
function BT({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(lr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: Nt.list, "aria-label": t, children: e }) });
}
function PT({ rule: e }) {
  if (!ye(lr)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ i("li", { className: Nt.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: Nt.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: Nt.action, children: e.then })
  ] });
}
const vg = "_move_tmppt_3", bg = {
  move: vg
};
function tn(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [o] = r.splice(t, 1);
  return r.splice(a, 0, o), r;
}
function ir(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function sr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function Xn(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function pg(e) {
  return e === "up" ? "down" : "up";
}
function gg(e, t) {
  const a = Xn(e, t.id, t.direction) ?? Xn(e, t.id, pg(t.direction));
  a == null || a.focus();
}
function cr() {
  const e = _(null), [t, a] = p(null), [r, o] = p("");
  return S(() => {
    e.current !== null && t !== null && gg(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), o(c);
  } };
}
function dr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function xt({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${bg.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const yg = "_body_1jd1i_2", Ng = "_title_1jd1i_8", kg = "_section_1jd1i_13", $g = "_legend_1jd1i_18", Cg = "_stages_1jd1i_26", Sg = "_stage_1jd1i_26", Rg = "_stageIndex_1jd1i_44", Tg = "_stageName_1jd1i_50", xg = "_footer_1jd1i_59", Lg = "_note_1jd1i_66", Ag = "_reason_1jd1i_71", Eg = "_actions_1jd1i_76", Ig = "_webHead_1jd1i_83", Mg = "_kicker_1jd1i_92", Bg = "_webTitle_1jd1i_99", Pg = "_webBody_1jd1i_105", jg = "_webSection_1jd1i_109", qg = "_sectionHead_1jd1i_121", Og = "_sectionNote_1jd1i_129", Dg = "_formLabel_1jd1i_134", Fg = "_identityRow_1jd1i_139", Hg = "_nameCell_1jd1i_145", Wg = "_keyCell_1jd1i_150", zg = "_colourCell_1jd1i_154", Kg = "_colourStatus_1jd1i_161", Gg = "_webStages_1jd1i_166", Ug = "_webStageList_1jd1i_172", Vg = "_webStage_1jd1i_166", Yg = "_webIndex_1jd1i_191", Jg = "_webStageName_1jd1i_196", Qg = "_webMoves_1jd1i_201", Xg = "_addStage_1jd1i_215", Zg = "_addStageButton_1jd1i_223", ey = "_addStageNote_1jd1i_231", ty = "_webFooter_1jd1i_236", ny = "_webFooterNotes_1jd1i_244", ay = "_webNote_1jd1i_251", v = {
  body: yg,
  title: Ng,
  section: kg,
  legend: $g,
  stages: Cg,
  stage: Sg,
  stageIndex: Rg,
  stageName: Tg,
  footer: xg,
  note: Lg,
  reason: Ag,
  actions: Eg,
  webHead: Ig,
  kicker: Mg,
  webTitle: Bg,
  webBody: Pg,
  webSection: jg,
  sectionHead: qg,
  sectionNote: Og,
  formLabel: Dg,
  identityRow: Fg,
  nameCell: Hg,
  keyCell: Wg,
  colourCell: zg,
  colourStatus: Kg,
  webStages: Gg,
  webStageList: Ug,
  webStage: Vg,
  webIndex: Yg,
  webStageName: Jg,
  webMoves: Qg,
  addStage: Xg,
  addStageButton: Zg,
  addStageNote: ey,
  webFooter: ty,
  webFooterNotes: ny,
  webNote: ay
}, ry = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], ur = "not in catalogue";
function oy(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${ur}` }, ...a];
}
function ly({ stage: e, index: t, catalogue: a, onName: r }) {
  const o = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(j, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const l = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${ur}`;
  return /* @__PURE__ */ n(j, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: oy(a, e.name), invalid: l, onChange: r });
}
function hr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function iy(e) {
  const t = _([]), a = _(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function sy({ id: e, stage: t, index: a, total: r, catalogue: o, onReplace: l, onMove: s }) {
  const c = hr(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ i("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: v.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: v.webStageName, children: /* @__PURE__ */ n(ly, { stage: t, index: a, catalogue: o, onName: (u) => l({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(j, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: ry, onChange: (u) => l({ ...t, kind: u }) }),
    /* @__PURE__ */ i("span", { className: v.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(xt, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(xt, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function cy({ stages: e, onChange: t, catalogue: a }) {
  const r = iy(e.length), o = cr(), l = (c, d) => {
    const u = ir(c, d);
    r.current = tn(r.current, c, u), o.moved({ id: r.current[u], direction: d }, sr(hr(e[c], c), u, e.length)), t(tn(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ i("div", { className: v.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(sy, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => l(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(dr, { text: o.announcement }),
    /* @__PURE__ */ i("p", { className: v.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const dy = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], uy = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], hy = "A new stream starts as a draft. Nothing runs on it until you publish it.", my = "Create is disabled: name the stream and give it a key first.", wy = "reorder with the ↑ ↓ buttons · min 2";
function vn(e, t) {
  return !e.reserved && ht(e.step) && t[e.step] === void 0;
}
function fy(e, t) {
  const a = e.find((r) => vn(r, t));
  return a ? a.step : 1;
}
function _y({ stages: e, onMove: t }) {
  const a = cr(), r = (o, l) => {
    const s = ir(o, l);
    a.moved({ id: e[o].id, direction: l }, sr(e[o].name, s, e.length)), t(o, s);
  };
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: v.stages, "aria-label": "Stages in order", children: e.map((o, l) => /* @__PURE__ */ i("li", { className: v.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: v.stageIndex, children: String(l + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: v.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
      l > 0 && /* @__PURE__ */ n(xt, { id: o.id, name: o.name, direction: "up", onMove: () => r(l, "up") }),
      l < e.length - 1 && /* @__PURE__ */ n(xt, { id: o.id, name: o.name, direction: "down", onMove: () => r(l, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(dr, { text: a.announcement })
  ] });
}
function vy({ reason: e, onCreate: t, onDraft: a }) {
  const r = k();
  return /* @__PURE__ */ i("div", { className: v.footer, children: [
    /* @__PURE__ */ n("p", { className: v.note, children: hy }),
    e && /* @__PURE__ */ n("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ i("div", { className: v.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function by(e, t) {
  return e !== "" && t !== "" ? null : my;
}
function py(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: o = uy, onCreate: l, onDraft: s, onClose: c, returnFocusTo: d } = e, u = k(), [h, w] = p(""), [f, y] = p(""), [N, A] = p(t[0].value), [q, me] = p(() => fy(a, r)), [re, Ee] = p(e.stages ?? dy), [Ye, T] = p(o[0].value), J = { name: h, key: f, streamStep: q, owner: N, stages: re, policy: Ye }, ke = by(h, f);
  return /* @__PURE__ */ n(rt, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ i("div", { className: v.body, children: [
    /* @__PURE__ */ n("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ i("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ n(j, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ n(j, { kind: "input", label: "Key", value: f, onChange: y, mono: !0 }),
      /* @__PURE__ */ n(j, { kind: "select", label: "Owner", value: N, onChange: A, options: t })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ n(nr, { label: "Stream colour", steps: a, value: q, onChange: me, takenBy: r })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ n(_y, { stages: re, onMove: (We, qr) => Ee(tn(re, We, qr)) })
    ] }),
    /* @__PURE__ */ n(Ka, { legend: "Loop policy", options: o, value: Ye, onChange: T }),
    /* @__PURE__ */ n(vy, { reason: ke, onCreate: () => l(J), onDraft: () => s(J) })
  ] }) });
}
const mr = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], gy = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function yy(e, t, a, r, o, l) {
  var c;
  const s = ((c = mr.find((d) => d.value === o)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: l };
}
function Ny(e, t) {
  return ky(e) && $y(e, t) && Cy(e);
}
function ky(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function $y(e, t) {
  return e.colourStep === null || vn({ step: e.colourStep }, t);
}
function Cy(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function Sy(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : vn({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Ry({ stage: e }) {
  return e ? /* @__PURE__ */ i("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function Ty({ ready: e, draft: t, agentStage: a, onCreate: r, onDraft: o, reasonId: l }) {
  return /* @__PURE__ */ i("div", { className: v.webFooter, children: [
    /* @__PURE__ */ i("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ n(Ry, { stage: a }),
      !e && /* @__PURE__ */ n("p", { id: l, className: v.reason, children: gy })
    ] }),
    o && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => o(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: l, children: "Create stream" })
  ] });
}
function xy({ titleId: e }) {
  return /* @__PURE__ */ i("header", { className: v.webHead, children: [
    /* @__PURE__ */ n("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function Ly({ name: e, setName: t, streamKey: a, setKey: r, colour: o, owner: l }) {
  return /* @__PURE__ */ i("section", { className: v.webSection, children: [
    /* @__PURE__ */ n("h3", { className: v.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ i("div", { className: v.identityRow, children: [
      /* @__PURE__ */ n("div", { className: v.nameCell, children: /* @__PURE__ */ n(j, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ n("div", { className: v.keyCell, children: /* @__PURE__ */ n(j, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      o
    ] }),
    l
  ] });
}
function Ay(e) {
  const t = k(), a = k(), r = e.takenBy ?? {}, [o, l] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [f, y] = p("relay"), [N, A] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), q = yy(o, s, d, h, f, N), me = Ny(q, r), re = N.find((T) => T.kind === "agent" && T.name.trim() !== ""), Ee = /* @__PURE__ */ i("div", { className: v.colourCell, children: [
    /* @__PURE__ */ n("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(nr, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ye = /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("p", { className: v.colourStatus, "data-colour-status": "", children: Sy(h, r) }),
    /* @__PURE__ */ n(j, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((T) => ({ value: T, label: T })), onChange: u })
  ] });
  return /* @__PURE__ */ i(rt, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(xy, { titleId: a }),
    /* @__PURE__ */ i("div", { className: v.webBody, children: [
      /* @__PURE__ */ n(Ly, { name: o, setName: l, streamKey: s, setKey: c, colour: Ee, owner: Ye }),
      e.fields && /* @__PURE__ */ n("section", { className: v.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ i("section", { className: v.webSection, children: [
        /* @__PURE__ */ i("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: v.sectionNote, children: wy })
        ] }),
        /* @__PURE__ */ n(cy, { stages: N, onChange: A })
      ] }),
      /* @__PURE__ */ n("section", { className: v.webSection, children: /* @__PURE__ */ n(Ka, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: mr, onChange: y }) }),
      /* @__PURE__ */ n(Ty, { ready: me, draft: q, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function jT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ay, { ...e }) : /* @__PURE__ */ n(py, { ...e });
}
const Ey = "_row_bs8hc_2", Iy = "_cell_bs8hc_6", My = "_condition_bs8hc_11", By = "_action_bs8hc_18", Py = "_contract_bs8hc_24", jy = "_contractCondition_bs8hc_33", qy = "_contractAction_bs8hc_39", ne = {
  row: Ey,
  cell: Iy,
  condition: My,
  action: By,
  contract: Py,
  contractCondition: jy,
  contractAction: qy
}, wr = ["advance", "block", "escalate", "requestReview"], Zn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Lt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function bn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ne.action, children: Zn[e.then] }) : /* @__PURE__ */ n(
    j,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => t({ ...e, then: o }),
      options: wr.map((o) => ({ value: o, label: Zn[o] }))
    }
  );
}
function Oy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ne.row, children: [
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n("span", { className: ne.condition, title: Lt(e, r), children: Lt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: bn(e, t, a) })
  ] });
}
function Dy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ne.row, children: [
    /* @__PURE__ */ i("td", { className: ne.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ne.condition, children: Lt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: bn(e, t, a) })
  ] });
}
function Fy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("li", { className: ne.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ne.contractCondition, children: Lt(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ne.contractAction, children: bn(e, t, a, !0) })
  ] });
}
const Hy = { two: Dy, four: Oy, contract: Fy };
function qT(e) {
  var a;
  if (!wr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = Hy[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const Wy = "_column_g1uat_2", zy = "_head_g1uat_17", Ky = "_index_g1uat_23", Gy = "_name_g1uat_29", Uy = "_meta_g1uat_38", Vy = "_mono_g1uat_43", Yy = "_gate_g1uat_50", Jy = "_reviewersLabel_g1uat_57", Qy = "_reviewers_g1uat_57", Xy = "_reviewer_g1uat_57", Zy = "_agents_g1uat_74", eN = "_workflowColumn_g1uat_79", tN = "_workflowHead_g1uat_96", nN = "_stageRow_g1uat_102", aN = "_stageLabel_g1uat_109", rN = "_workflowTitle_g1uat_116", oN = "_workflowMeta_g1uat_122", lN = "_workflowGate_g1uat_127", iN = "_gateNote_g1uat_135", sN = "_cardNote_g1uat_140", cN = "_reviewerList_g1uat_145", dN = "_reviewerRow_g1uat_151", uN = "_reviewerMark_g1uat_157", hN = "_reviewerName_g1uat_167", mN = "_terminalCard_g1uat_173", wN = "_terminalCount_g1uat_182", fN = "_workflowAgents_g1uat_188", _N = "_mount_g1uat_194", R = {
  column: Wy,
  head: zy,
  index: Ky,
  name: Gy,
  meta: Uy,
  mono: Vy,
  gate: Yy,
  reviewersLabel: Jy,
  reviewers: Qy,
  reviewer: Xy,
  agents: Zy,
  workflowColumn: eN,
  workflowHead: tN,
  stageRow: nN,
  stageLabel: aN,
  workflowTitle: rN,
  workflowMeta: oN,
  workflowGate: lN,
  gateNote: iN,
  cardNote: sN,
  reviewerList: cN,
  reviewerRow: dN,
  reviewerMark: uN,
  reviewerName: hN,
  terminalCard: mN,
  terminalCount: wN,
  workflowAgents: fN,
  mount: _N
}, vN = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function pn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function fr(e) {
  return `${Math.round(e * 100)}%`;
}
function bN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(qt, { cells: [
      { value: fr(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function pN({ stage: e }) {
  return /* @__PURE__ */ n(qt, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: pn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function gN({ stage: e, titleId: t }) {
  return /* @__PURE__ */ i("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: vN[e.kind] })
  ] });
}
function yN({ stage: e }) {
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
function NN({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(bN, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(pN, { stage: e }) : null;
}
function kN({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function $N({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const o = k(), l = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("section", { className: R.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(gN, { stage: e, titleId: o }),
    /* @__PURE__ */ n(yN, { stage: e }),
    /* @__PURE__ */ n(NN, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(Tb, { ...s, connection: l }, s.agent.id)) }),
    /* @__PURE__ */ n(kN, { onMount: a })
  ] });
}
const CN = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function SN({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ i("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function RN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ i("p", { className: R.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ n(SN, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ i("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: fr(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function TN(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function xN({ stage: e }) {
  return /* @__PURE__ */ i("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: pn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: TN(e.rolledBackThisWeek) })
  ] });
}
function LN(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function AN(e) {
  if (e.kind === "terminal") return `${pn(e.closedThisWeek)} this week`;
  const t = LN(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function EN({ stage: e, titleId: t }) {
  const a = CN[e.kind];
  return /* @__PURE__ */ i("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ i("span", { className: R.stageRow, children: [
      /* @__PURE__ */ i("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: AN(e) })
  ] });
}
function IN(e) {
  return e === "entry" || e === "agent";
}
function MN({ stage: e, onMount: t }) {
  return t === void 0 || !IN(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Mount agent" });
}
function BN({ stage: e, agentCards: t, onMount: a }) {
  const r = k();
  return /* @__PURE__ */ i("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(EN, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(RN, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(xN, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(MN, { stage: e, onMount: a })
  ] });
}
function PN(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function OT(e) {
  return PN(e) ? /* @__PURE__ */ n(BN, { ...e }) : /* @__PURE__ */ n($N, { ...e });
}
const jN = "_row_1tdra_6", qN = "_name_1tdra_12", ON = "_compactRow_1tdra_13", DN = "_compactName_1tdra_13", FN = "_cell_1tdra_30", HN = "_chain_1tdra_45", WN = "_owner_1tdra_51", zN = "_mono_1tdra_57", KN = "_compactCell_1tdra_79", GN = "_stack_1tdra_96", UN = "_stat_1tdra_103", VN = "_identityLine_1tdra_110", YN = "_identity_1tdra_110", JN = "_ownerLine_1tdra_140", QN = "_link_1tdra_160", XN = "_gateMark_1tdra_166", ZN = "_emptyChain_1tdra_171", e1 = "_arrow_1tdra_177", t1 = "_muted_1tdra_182", n1 = "_define_1tdra_187", a1 = "_statValue_1tdra_194", r1 = "_policyId_1tdra_200", o1 = "_sub_1tdra_205", g = {
  row: jN,
  name: qN,
  compactRow: ON,
  compactName: DN,
  cell: FN,
  chain: HN,
  owner: WN,
  mono: zN,
  compactCell: KN,
  stack: GN,
  stat: UN,
  identityLine: VN,
  identity: YN,
  ownerLine: JN,
  link: QN,
  gateMark: XN,
  emptyChain: ZN,
  arrow: e1,
  muted: t1,
  define: n1,
  statValue: a1,
  policyId: r1,
  sub: o1
};
function _r(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: l } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: l };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function l1(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function i1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function vr(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function s1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${vr(e.members)}`;
}
function c1(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ i("span", { className: g.stack, children: [
    /* @__PURE__ */ i("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: D(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: s1(e) })
  ] }) });
}
function br({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ i(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function d1(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = wt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function u1({ stages: e, streamStep: t }) {
  const a = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((o, l) => /* @__PURE__ */ i("span", { className: g.link, children: [
    /* @__PURE__ */ n(br, { name: o.name, gate: o.gate === !0, look: d1(l, a, t), size: "tag" }),
    l === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${l}`)) });
}
function h1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ i("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : u1(e) });
}
function pr(e) {
  return e === void 0 ? void 0 : !0;
}
function ea(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": pr(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function m1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function w1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function f1({ stream: e, href: t, presentation: a }) {
  const r = i1(a.className);
  return /* @__PURE__ */ i("tr", { className: `${r} ward-streamrow`, onClick: _r, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ge(e.streamStep, "chip") }, children: [
    c1(e, t),
    h1(e),
    ea(w1(e.agents), e.agents === void 0 ? void 0 : l1(e.agents), "—"),
    m1(e.policy),
    ea(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function _1(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function DT(e) {
  if (_1(e)) return f1(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ i("tr", { className: g.row, onClick: _r, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ i("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: D(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...jt(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(br, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: g.mono, children: vr(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": pr(t.inFlightHint), children: ae(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : ue(t.p50) }) })
  ] });
}
const v1 = "_row_2u4ll_2", b1 = "_name_2u4ll_16", p1 = "_scope_2u4ll_24", At = {
  row: v1,
  name: b1,
  scope: p1
};
function gn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function g1(e) {
  return e === void 0 ? `${At.row} ward-toolrow` : `${At.row} ward-toolrow ${e}`;
}
function y1(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function N1({ id: e, reasonId: t, tool: a, state: r, onChange: o }) {
  return /* @__PURE__ */ n(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: a.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? t : void 0,
      onChange: (l) => {
        r.locked || o(l.target.checked);
      }
    }
  );
}
function k1({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: gn(e) });
}
function $1({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${At.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function C1(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function FT({ tool: e, onChange: t, presentation: a }) {
  const r = k(), o = k(), l = y1(e, a), s = C1(a);
  return /* @__PURE__ */ i(s, { className: g1(a == null ? void 0 : a.className), "data-locked": l.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(N1, { id: r, reasonId: o, tool: e, state: l, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${At.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n($1, { tool: e, state: l, reasonId: o }),
    /* @__PURE__ */ n(k1, { classification: e.classification }),
    l.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const S1 = "_strip_4ppv9_2", R1 = "_well_4ppv9_11", T1 = "_head_4ppv9_18", x1 = "_name_4ppv9_24", L1 = "_chart_4ppv9_32", A1 = "_segment_4ppv9_38", E1 = "_detailedChart_4ppv9_44", I1 = "_rail_4ppv9_57", M1 = "_section_4ppv9_63", B1 = "_label_4ppv9_74", P1 = "_note_4ppv9_91", V = {
  strip: S1,
  well: R1,
  head: T1,
  name: x1,
  chart: L1,
  segment: A1,
  detailedChart: E1,
  rail: I1,
  section: M1,
  label: B1,
  note: P1
}, j1 = "No item in flight to preview.", q1 = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", O1 = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", nn = [1, 2, 3, 4, 5, 6], Et = 100;
function D1(e, t) {
  return t.has(e) ? ge(e, "id") : "var(--ward-color-line)";
}
function F1({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: nn.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: o * Et,
      y: "0",
      width: Et,
      height: "8",
      fill: D1(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function H1(e) {
  const t = e.slice(0, nn.length);
  for (; t.length < nn.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function W1({ identities: e }) {
  return /* @__PURE__ */ i("figure", { className: `${V.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, a) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(a * Et),
        y: "0",
        width: String(Et),
        height: "40",
        style: { fill: ge(t.streamStep, "chip") }
      },
      t.key + String(a)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((t, a) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(a))) })
  ] });
}
function gr(e) {
  return (t) => e == null ? void 0 : e(t);
}
function bt({ label: e, children: t }) {
  const a = k();
  return /* @__PURE__ */ i("section", { className: V.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: V.label, children: e }),
    t
  ] });
}
function z1({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: t ?? j1 }) : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Dt, { item: { ...e, streamStep: wt(a.streamStep) }, onOpen: gr(r), feed: null }) });
}
function K1({ draft: e }) {
  const t = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ i("p", { className: V.head, style: t, children: [
    /* @__PURE__ */ n(He, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...jt(e.key, e.streamStep) })
  ] });
}
function G1(e) {
  const t = H1(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ i("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(bt, { label: "Board card", children: /* @__PURE__ */ n(z1, { ...e, draft: a }) }),
    /* @__PURE__ */ n(bt, { label: "Streams index row", children: /* @__PURE__ */ n(K1, { draft: a }) }),
    /* @__PURE__ */ i(bt, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(W1, { identities: t }),
      /* @__PURE__ */ n("p", { className: V.note, children: q1 })
    ] }),
    /* @__PURE__ */ n(bt, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: O1 }) })
  ] });
}
function U1({ draft: e, sample: t, streams: a, onOpen: r }) {
  const o = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ i("section", { className: V.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ i("div", { className: V.head, children: [
      /* @__PURE__ */ n(He, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...jt(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Dt, { item: { ...t, streamStep: e.streamStep }, onOpen: gr(r) }) }),
    /* @__PURE__ */ n(F1, { draft: e, streams: a })
  ] });
}
function HT(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(G1, { ...e }) : /* @__PURE__ */ n(U1, { ...e });
}
const V1 = "_row_ixlg5_6", Y1 = "_headCell_ixlg5_10", J1 = "_cell_ixlg5_11", Q1 = "_name_ixlg5_23", X1 = "_consequence_ixlg5_29", Z1 = "_governed_ixlg5_36", ek = "_control_ixlg5_42", tk = "_byRole_ixlg5_48", nk = "_webControl_ixlg5_59", ak = "_webConsequence_ixlg5_65", rk = "_webGoverned_ixlg5_71", z = {
  row: V1,
  headCell: Y1,
  cell: J1,
  name: Q1,
  consequence: X1,
  governed: Z1,
  control: ek,
  byRole: tk,
  webControl: nk,
  webConsequence: ak,
  webGoverned: rk
};
function ok({
  capability: e,
  cell: t,
  onChange: a
}) {
  return t.value === "byRole" ? /* @__PURE__ */ n("span", { className: z.byRole, children: "by role" }) : /* @__PURE__ */ i("span", { className: z.control, children: [
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
function lk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: z.row, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: z.headCell, children: [
      /* @__PURE__ */ n("span", { className: z.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: z.consequence, children: e.consequence }),
      /* @__PURE__ */ i("span", { className: z.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(ok, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function ik(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function sk({ name: e, cell: t, onChange: a }) {
  if (t.value === "byRole") return /* @__PURE__ */ n("span", { className: `${z.webControl} ${z.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Ve,
    {
      label: `${e} · step ${t.streamStep}`,
      checked: t.value === "on",
      disabled: a === void 0,
      onChange: (o) => a == null ? void 0 : a(t.streamStep, o ? "on" : "off")
    }
  );
  return t.value !== "pilot" ? r : /* @__PURE__ */ i("span", { className: `${z.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function ck({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: z.row, children: [
    /* @__PURE__ */ i("td", { className: z.cell, children: [
      /* @__PURE__ */ n("span", { className: z.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${z.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(sk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webGoverned} ward-cellmeta`, children: ik(e) }) })
  ] });
}
function WT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ck, { ...e }) : /* @__PURE__ */ n(lk, { ...e });
}
const dk = "_row_vv64h_2", uk = "_cell_vv64h_6", hk = "_name_vv64h_25", mk = "_note_vv64h_30", wk = "_webName_vv64h_41", fk = "_webMeta_vv64h_47", X = {
  row: dk,
  cell: uk,
  name: hk,
  note: mk,
  webName: wk,
  webMeta: fk
}, yr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function _k(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function vk({ component: e, onRestart: t }) {
  const a = k(), r = yr[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ i("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: X.name, children: e.name }) }),
    /* @__PURE__ */ i("td", { className: X.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { id: a, className: X.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: X.cell, "data-align": "end", children: o ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function bk({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: _k(e.state) });
}
function pk({ component: e, onRestart: t }) {
  return /* @__PURE__ */ i("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { ...yr[e.state] }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(bk, { component: e, onRestart: t }) })
  ] });
}
function zT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(pk, { ...e }) : /* @__PURE__ */ n(vk, { ...e });
}
const gk = "_row_jcm5k_7", yk = "_cell_jcm5k_11", Nk = "_next_jcm5k_28", kk = "_headCell_jcm5k_38", $k = "_webId_jcm5k_77", Ck = "_webPurpose_jcm5k_83", Sk = "_webMeta_jcm5k_91", Rk = "_webUrgent_jcm5k_97", K = {
  row: gk,
  cell: yk,
  next: Nk,
  headCell: kk,
  webId: $k,
  webPurpose: Ck,
  webMeta: Sk,
  webUrgent: Rk
}, Tk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, xk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Nr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Lk = Object.fromEntries(Nr.map((e) => [e.key, e]));
function Qe({ column: e, children: t }) {
  const a = Lk[e];
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
function KT() {
  return /* @__PURE__ */ n("tr", { children: Nr.map((e) => /* @__PURE__ */ n(
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
function Ak({ cred: e }) {
  const t = Tk[e.state];
  return /* @__PURE__ */ i("tr", { className: K.row, children: [
    /* @__PURE__ */ n(Qe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Qe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Qe, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(Qe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: gn(e.cls) }) }),
    /* @__PURE__ */ n(Qe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Qe, { column: "next", children: /* @__PURE__ */ n("span", { className: K.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Ek({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${K.webMeta} ${K.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function Ik({ cred: e }) {
  return /* @__PURE__ */ i("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(Ek, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...xk[e.state] }) })
  ] });
}
function GT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ik, { ...e }) : /* @__PURE__ */ n(Ak, { ...e });
}
const Mk = "_card_lpp45_2", Bk = "_head_lpp45_11", Pk = "_env_lpp45_18", jk = "_version_lpp45_25", qk = "_meta_lpp45_32", Ok = "_webCard_lpp45_37", Dk = "_webRow_lpp45_47", Fk = "_webTitle_lpp45_55", Hk = "_webLine_lpp45_65", Wk = "_webVersion_lpp45_72", zk = "_webMeta_lpp45_77", Q = {
  card: Mk,
  head: Bk,
  env: Pk,
  version: jk,
  meta: qk,
  webCard: Ok,
  webRow: Dk,
  webTitle: Fk,
  webLine: Hk,
  webVersion: Wk,
  webMeta: zk
}, ta = { dev: "Dev", uat: "UAT", prod: "Prod" }, kr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function Kk({ env: e }) {
  const t = kr[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ i("section", { className: Q.card, "aria-label": ta[e.env], children: [
    /* @__PURE__ */ i("div", { className: Q.head, children: [
      /* @__PURE__ */ n("span", { className: Q.env, children: ta[e.env] }),
      /* @__PURE__ */ n(m, { role: t.role, label: t.label })
    ] }),
    /* @__PURE__ */ n("p", { className: Q.version, children: e.version }),
    /* @__PURE__ */ i("p", { className: Q.meta, children: [
      "deployed ",
      he(e.deployedAt)
    ] }),
    a && /* @__PURE__ */ n("p", { className: Q.meta, children: a })
  ] });
}
function Gk(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function Uk(e) {
  return /* @__PURE__ */ i("article", { className: `${Q.webCard} ward-envcard`, children: [
    /* @__PURE__ */ i("span", { className: `${Q.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Q.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...kr[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Q.version} ${Q.webVersion} ${Q.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Q.meta} ${Q.webMeta} ${Q.webLine} ward-cellmeta`, children: Gk(e) })
  ] });
}
function UT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Uk, { ...e }) : /* @__PURE__ */ n(Kk, { ...e });
}
const Vk = "_panel_1hmja_2", Yk = "_line_1hmja_8", Jk = "_actions_1hmja_14", pt = {
  panel: Vk,
  line: Yk,
  actions: Jk
};
function VT(e) {
  return /* @__PURE__ */ i("div", { className: pt.panel, children: [
    /* @__PURE__ */ n("p", { className: pt.line, children: e.status }),
    /* @__PURE__ */ n(j, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: pt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: pt.line, children: e.note ?? "" })
  ] });
}
const Qk = "_upload_13fcl_2", Xk = "_preview_13fcl_7", Zk = "_mark_13fcl_17", e$ = "_empty_13fcl_22", t$ = "_actions_13fcl_28", n$ = "_input_13fcl_33", a$ = "_reasons_13fcl_41", r$ = "_reason_13fcl_41", o$ = "_accepted_13fcl_57", oe = {
  upload: Qk,
  preview: Xk,
  mark: Zk,
  empty: e$,
  actions: t$,
  input: n$,
  reasons: a$,
  reason: r$,
  accepted: o$
}, $r = 1.5, Cr = 22, It = "script elements or event handlers", Pe = "links or external references", xe = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${$r}px at ${Cr}px`], l$ = [xe[1], xe[2], It, Pe], i$ = /* @__PURE__ */ new Map([
  ["image", xe[1]],
  ["text", xe[2]],
  ["tspan", xe[2]],
  ["textPath", xe[2]],
  ["script", It],
  ["foreignObject", It],
  ["a", Pe],
  ["use", Pe],
  ["style", Pe],
  ["feImage", Pe],
  ["set", Pe]
]), s$ = "http://www.w3.org/2000/svg", c$ = "http://www.w3.org/2000/xmlns/", d$ = /* @__PURE__ */ new Set([
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
]), u$ = /* @__PURE__ */ new Set([
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
]), yn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, h$ = /url\s*\(|['"\\]/i;
function m$() {
  return { ok: !1, reasons: [xe[1]] };
}
function Sr(e) {
  return e.namespaceURI === s$;
}
function w$(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && Sr(t) ? t : null;
  } catch {
    return null;
  }
}
function f$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [xe[0]] : [];
}
function _$(e) {
  return i$.get(e.localName) ?? (e.localName.startsWith("animate") ? Pe : void 0);
}
function v$(e) {
  return h$.test(e.replace(yn, ""));
}
function b$(e) {
  return /^on/i.test(e.localName) ? It : e.localName === "href" || v$(e.value) ? Pe : void 0;
}
function p$(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(_$(a));
    for (const r of Array.from(a.attributes)) t.add(b$(r));
  }
  return l$.filter((a) => t.has(a));
}
function g$(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((o) => Number.isFinite(o) && o > 0), 0), r = a > 0 ? Cr / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const l = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(l) && l * r < $r;
  }) ? [xe[3]] : [];
}
function y$(e) {
  if (e.namespaceURI === c$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (u$.has(t) || t.startsWith("stroke"));
}
function N$(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && Sr(t) && d$.has(t.localName);
}
function k$(e, t) {
  N$(t) ? t.nodeType === Node.ELEMENT_NODE && Rr(t) : e.removeChild(t);
}
function Rr(e) {
  for (const t of Array.from(e.attributes)) y$(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) k$(e, t);
  return e;
}
function $$(e) {
  return Array.from(e.matchAll(yn), (t) => t[2]).filter((t) => t !== "");
}
function C$(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function S$(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const l of $$(o.value)) a.has(l) || a.set(l, `${t}-${a.size}`);
  return a;
}
function R$(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(yn, (r, o, l) => {
      const s = t.get(l);
      return s === void 0 ? r : r.replace(`#${l}`, `#${s}`);
    });
}
function T$(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = S$(a, t);
  for (const o of a) {
    const l = r.get(o.getAttribute("id") ?? "");
    l === void 0 ? o.removeAttribute("id") : o.setAttribute("id", l), R$(o, r);
  }
  return e;
}
function YT(e) {
  const t = w$(e);
  if (t === null) return m$();
  const a = [...f$(t), ...p$(t), ...g$(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(T$(Rr(t), C$(e))) };
}
const x$ = "Mark accepted.", L$ = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, A$ = new Set(ma.flatMap((e) => [ge(e, "id"), ge(e, "chip")]));
function E$(e) {
  return e !== void 0 && (L$.test(e) || A$.has(e)) ? e : void 0;
}
function I$({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: oe.preview, style: { "--mark": E$(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: oe.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: oe.empty }) });
}
function M$(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function B$(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function P$({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: oe.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("p", { className: oe.accepted, children: x$ }) }) : /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("ul", { className: oe.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: oe.reason, children: t }, t)) }) });
}
function j$({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(P$, { result: e }) : /* @__PURE__ */ n("p", { className: `${oe.result} ${M$(e, a)}`, role: "status", children: B$(e, a) });
}
function na(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function JT({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: o }) {
  const l = _(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ i("div", { className: oe.upload, children: [
    /* @__PURE__ */ n(I$, { current: e }),
    /* @__PURE__ */ i("div", { className: oe.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: l,
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
      /* @__PURE__ */ n(b, { ...na(o), onClick: () => {
        var u;
        return (u = l.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...na(o), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(j$, { result: s, presentation: r })
  ] });
}
const q$ = "_row_o3t6y_7", O$ = "_cell_o3t6y_11", D$ = "_head_o3t6y_28", F$ = "_name_o3t6y_34", H$ = "_pinned_o3t6y_42", W$ = "_headCell_o3t6y_49", z$ = "_webName_o3t6y_88", K$ = "_webMeta_o3t6y_95", G$ = "_webWarn_o3t6y_103", F = {
  row: q$,
  cell: O$,
  head: D$,
  name: F$,
  pinned: H$,
  headCell: W$,
  webName: z$,
  webMeta: K$,
  webWarn: G$
}, Nn = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Tr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], U$ = Object.fromEntries(Tr.map((e) => [e.key, e]));
function V$(e, t) {
  return `mcp.${e}.${t}`;
}
function Y$(e) {
  return Object.keys(Nn).includes(e);
}
function J$(e) {
  return Nn[e !== void 0 && Y$(e) ? e : "unknown"];
}
function ot({ column: e, children: t }) {
  const a = U$[e];
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
function QT() {
  return /* @__PURE__ */ n("tr", { children: Tr.map((e) => /* @__PURE__ */ n(
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
function Q$({ server: e }) {
  const t = Nn[e.connection];
  return /* @__PURE__ */ i("tr", { className: F.row, children: [
    /* @__PURE__ */ i(ot, { column: "name", children: [
      /* @__PURE__ */ i("span", { className: F.head, children: [
        /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: gn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ i("span", { className: F.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(ot, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(ot, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(ot, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(ot, { column: "tools", children: e.tools.map((a) => V$(e.name, a)).join(" · ") })
  ] });
}
function X$(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Z$(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function e0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${F.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: e });
}
function t0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function n0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function a0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ i("tr", { className: F.row, children: [
    /* @__PURE__ */ i("td", { className: F.cell, children: [
      /* @__PURE__ */ n("span", { className: `${F.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: X$(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta ward-truncate`, title: o.map((l) => l.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(m, { ...Z$(e) }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(e0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(m, { ...J$(e.connection) }) }),
    /* @__PURE__ */ i("td", { className: F.cell, children: [
      /* @__PURE__ */ n(t0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(n0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function XT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(a0, { ...e }) : /* @__PURE__ */ n(Q$, { ...e });
}
const r0 = "_row_1ibo7_2", o0 = "_headCell_1ibo7_14", l0 = "_cell_1ibo7_15", i0 = "_name_1ibo7_26", s0 = "_consequence_1ibo7_32", c0 = "_reason_1ibo7_38", d0 = "_value_1ibo7_44", u0 = "_webRow_1ibo7_60", h0 = "_webSetting_1ibo7_73", m0 = "_webName_1ibo7_81", w0 = "_webConsequence_1ibo7_89", f0 = "_webControl_1ibo7_95", _0 = "_webState_1ibo7_109", v0 = "_webChip_1ibo7_114", P = {
  row: r0,
  headCell: o0,
  cell: l0,
  name: i0,
  consequence: s0,
  reason: c0,
  value: d0,
  webRow: u0,
  webSetting: h0,
  webName: m0,
  webConsequence: w0,
  webControl: f0,
  webState: _0,
  webChip: v0
}, xr = 104, Lr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function b0({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ve, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(Wa, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: P.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function p0({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = k(), l = Lr[a], s = a === "locked";
  return /* @__PURE__ */ i("tr", { className: P.row, "data-inheritance": a, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: P.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(b0, { control: t, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: P.cell, style: { width: xr }, children: /* @__PURE__ */ n(m, { role: l.role, label: l.label }) })
  ] });
}
function Ar(e, t) {
  return String(e ?? t);
}
function g0(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function y0(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? Ar(e.value, "—");
}
function N0({ control: e, name: t, locked: a, describedBy: r, onChange: o }) {
  const l = e.value === !0;
  return /* @__PURE__ */ i("span", { className: P.webControl, children: [
    /* @__PURE__ */ n(Ve, { label: t, labelHidden: !0, checked: l, locked: a, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ n("span", { className: P.webState, "aria-hidden": "true", children: a || l ? "on" : "off" })
  ] });
}
function k0(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(N0, { ...e });
  const o = g0(t, a);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: P.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(Wa, { options: o, value: Ar(t.value, ""), onChange: (l) => r == null ? void 0 : r(l) }) }) : /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: y0(t) });
}
function $0({ setting: e, control: t, inheritance: a, reason: r, onChange: o, renderControl: l }) {
  const s = k(), c = a === "locked";
  return /* @__PURE__ */ i("div", { className: `${P.row} ${P.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ i("span", { className: P.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${P.name} ${P.webName}`, children: e.name }),
      /* @__PURE__ */ i("p", { id: s, className: `${P.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    l ? /* @__PURE__ */ n("span", { className: P.webControl, children: l(s) }) : /* @__PURE__ */ n(k0, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${P.webChip} ward-policy-chip`, style: { width: xr }, children: /* @__PURE__ */ n(m, { ...Lr[a], size: "tag" }) })
  ] });
}
function ZT(e) {
  return "presentation" in e ? /* @__PURE__ */ n($0, { ...e }) : /* @__PURE__ */ n(p0, { ...e });
}
const C0 = "_label_h9m4w_7", S0 = "_name_h9m4w_15", R0 = "_column_h9m4w_24", T0 = "_webFrame_h9m4w_57", x0 = "_webHead_h9m4w_62", L0 = "_webHeadLabel_h9m4w_74", A0 = "_webLabel_h9m4w_117", E0 = "_webColumns_h9m4w_124", I0 = "_webGroup_h9m4w_130", M0 = "_webPeople_h9m4w_131", B0 = "_webVia_h9m4w_132", P0 = "_webMeta_h9m4w_161", G = {
  label: C0,
  name: S0,
  column: R0,
  webFrame: T0,
  webHead: x0,
  webHeadLabel: L0,
  webLabel: A0,
  webColumns: E0,
  webGroup: I0,
  webPeople: M0,
  webVia: B0,
  webMeta: P0
}, j0 = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, Vt = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Yt({ column: e, children: t }) {
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
function q0(e) {
  if (!e.matrixRole) return;
  const t = j0[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function O0({ node: e }) {
  const t = q0(e);
  return /* @__PURE__ */ i("span", { className: G.label, children: [
    /* @__PURE__ */ n("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ n(D0, { role: t, node: e }),
    /* @__PURE__ */ n(Yt, { column: Vt[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Yt, { column: Vt[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Yt, { column: Vt[2], children: e.requestedVia ?? "" })
  ] });
}
function D0({ role: e, node: t }) {
  return /* @__PURE__ */ i(x, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function F0({ index: e, depth: t, node: a, expanded: r, leaf: o, onToggle: l, children: s }) {
  return /* @__PURE__ */ n(
    Ja,
    {
      index: e,
      depth: t,
      leaf: o,
      expanded: r,
      onToggle: l,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(O0, { node: a }),
      children: s
    }
  );
}
function Jt({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function H0({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${G.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Jt, { className: `${G.webMeta} ${G.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Jt, { className: `${G.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Jt, { className: `${G.webMeta} ${G.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function W0() {
  return /* @__PURE__ */ i("div", { className: G.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: G.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ i("span", { className: G.webColumns, children: [
      /* @__PURE__ */ n("span", { className: G.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: G.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: G.webVia, children: "Requested via" })
    ] })
  ] });
}
function z0({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${G.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function K0(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function G0({ rows: e, label: t }) {
  return /* @__PURE__ */ i("div", { className: G.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(W0, {}),
    /* @__PURE__ */ n(Nw, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      Ja,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(z0, { row: a }),
        detail: /* @__PURE__ */ n(H0, { row: a }),
        expanded: K0(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function ex(e) {
  return "presentation" in e ? /* @__PURE__ */ n(G0, { ...e }) : /* @__PURE__ */ n(F0, { ...e });
}
const U0 = "_runbook_b9agc_2", V0 = "_list_b9agc_7", Y0 = "_step_b9agc_15", J0 = "_numeral_b9agc_21", Q0 = "_body_b9agc_28", X0 = "_head_b9agc_34", Z0 = "_title_b9agc_40", eC = "_detail_b9agc_45", tC = "_actions_b9agc_50", nC = "_webList_b9agc_56", aC = "_webStep_b9agc_60", rC = "_webBody_b9agc_66", oC = "_webTitle_b9agc_74", lC = "_webDetail_b9agc_78", I = {
  runbook: U0,
  list: V0,
  step: Y0,
  numeral: J0,
  body: Q0,
  head: X0,
  title: Z0,
  detail: eC,
  actions: tC,
  webList: nC,
  webStep: aC,
  webBody: rC,
  webTitle: oC,
  webDetail: lC
}, Er = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Ir(e) {
  return String(e + 1).padStart(2, "0");
}
function iC({ step: e, index: t, connection: a }) {
  const r = Er[e.state], o = e.state === "running";
  return /* @__PURE__ */ i("li", { className: I.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.numeral, children: Ir(t) }),
    /* @__PURE__ */ i("span", { className: I.body, children: [
      /* @__PURE__ */ i("span", { className: I.head, children: [
        /* @__PURE__ */ n("span", { className: I.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        o && e.startedAt && /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ n("span", { className: I.detail, children: e.detail })
    ] })
  ] });
}
function sC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: I.runbook, children: [
    /* @__PURE__ */ n("ol", { className: I.list, children: e.map((r, o) => /* @__PURE__ */ n(iC, { step: r, index: o, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: I.actions, children: t })
  ] });
}
function cC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ i("li", { className: `${I.step} ${I.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${I.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Ir(t) }),
    /* @__PURE__ */ i("span", { className: `${I.body} ${I.webBody}`, children: [
      /* @__PURE__ */ i("span", { className: `${I.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${I.title} ${I.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Er[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${I.detail} ${I.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function dC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: I.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${I.list} ${I.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(cC, { step: r, index: o, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${I.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function tx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(dC, { ...e }) : /* @__PURE__ */ n(sC, { ...e });
}
const uC = "_list_1gu6a_2", hC = "_check_1gu6a_10", mC = "_body_1gu6a_16", wC = "_text_1gu6a_23", fC = "_pending_1gu6a_32", _C = "_measured_1gu6a_37", Ze = {
  list: uC,
  check: hC,
  body: mC,
  text: wC,
  pending: fC,
  measured: _C
};
function vC(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function bC({ check: e }) {
  const t = vC(e.passed);
  return /* @__PURE__ */ i("li", { className: `${Ze.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(wn, { state: t.state, label: t.label }),
    /* @__PURE__ */ i("span", { className: Ze.body, children: [
      /* @__PURE__ */ n("span", { className: Ze.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ i("span", { className: Ze.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: Ze.measured, children: e.measured })
  ] });
}
function nx({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Ze.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(bC, { check: t }, t.text)) });
}
const pC = "_root_y6bbq_2", gC = "_list_y6bbq_10", yC = "_line_y6bbq_32", NC = "_at_y6bbq_59", kC = "_text_y6bbq_63", $C = "_foot_y6bbq_67", CC = "_idle_y6bbq_79", SC = "_caret_y6bbq_87", RC = "_jump_y6bbq_94", ve = {
  root: pC,
  list: gC,
  line: yC,
  at: NC,
  text: kC,
  foot: $C,
  idle: CC,
  caret: SC,
  jump: RC
}, TC = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function kn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : TC.format(new Date(e));
}
const xC = { warn: "warning", ok: "ok" };
function LC({ kind: e }) {
  const t = xC[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function AC({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${kn(e)}` });
}
function EC({ connection: e, idleSince: t, last: a, children: r }) {
  const o = [t, a == null ? void 0 : a.at, ""].find(Boolean), l = {
    stale: `no new events as of ${kn(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ i("p", { className: `${ve.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ve.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ve.idle, children: l }),
    /* @__PURE__ */ n(AC, { at: a == null ? void 0 : a.at }),
    r
  ] });
}
const IC = 8;
function MC(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > IC;
}
function BC({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const Mr = Ne(null);
function ax({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, o] = p(!1), l = sa(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(Mr.Provider, { value: l, children: a });
}
function PC() {
  const e = ye(Mr), [t, a] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const jC = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function rx({ lines: e, connection: t, idleSince: a, label: r = "Live activity", fixed: o }) {
  const l = _(null), [s, c] = p(0), [d, u] = PC(), [h, w] = p(!1), f = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), tt(() => {
    const N = l.current;
    N && !h && (N.scrollTop = N.scrollHeight);
  }, [e.length, h]);
  const y = () => {
    var q;
    const N = l.current;
    if (!N) return;
    const A = N.querySelectorAll("[data-consline-text]");
    (q = A.item(A.length - 1)) == null || q.focus(), w(!1);
  };
  return /* @__PURE__ */ i("div", { className: ve.root, children: [
    /* @__PURE__ */ n("ol", { className: ve.list, ref: l, "aria-live": d ? "polite" : "off", "aria-label": r, ...jC(e.length, o), onScroll: (N) => w(MC(N.currentTarget)), children: e.map((N, A) => /* @__PURE__ */ i("li", { className: `${ve.line} ward-consline ward-reveal ward-consline--${N.kind}`, "data-kind": N.kind, "data-revealed": A < s, children: [
      /* @__PURE__ */ n("span", { className: ve.at, children: kn(N.at) }),
      /* @__PURE__ */ n(LC, { kind: N.kind }),
      /* @__PURE__ */ n("span", { className: ve.text, "data-consline-text": !0, tabIndex: -1, children: N.text })
    ] }, `${N.at}-${A}`)) }),
    /* @__PURE__ */ i(EC, { connection: t, idleSince: a, last: f, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(BC, { shown: h, onJump: y })
    ] })
  ] });
}
const qC = "_row_1k8wl_2", OC = "_head_1k8wl_14", DC = "_author_1k8wl_20", FC = "_eta_1k8wl_25", HC = "_edited_1k8wl_26", WC = "_body_1k8wl_32", zC = "_reason_1k8wl_37", KC = "_actions_1k8wl_42", Ce = {
  row: qC,
  head: OC,
  author: DC,
  eta: FC,
  edited: HC,
  body: WC,
  reason: zC,
  actions: KC
}, GC = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function UC(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function VC({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: o, onViewOriginal: l }) {
  return e.delivery === "queued" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: l, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function YC({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Ce.reason, id: t, children: e })
  ] });
}
function JC(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function QC(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(VC, { ...e }) : /* @__PURE__ */ n(YC, { reason: e.unavailable, reasonId: e.unavailableId });
}
function ox(e) {
  const { comment: t } = e;
  JC(e);
  const a = k(), r = `${a}-unavailable`, o = GC[t.delivery];
  return /* @__PURE__ */ i("div", { className: `${Ce.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ i("div", { className: Ce.head, children: [
      /* @__PURE__ */ n("span", { className: Ce.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: Ce.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Ce.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Ce.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Ce.reason, id: a, children: UC(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Ce.actions, children: /* @__PURE__ */ n(QC, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const XC = "_root_rvhdw_2", ZC = "_attach_rvhdw_11", eS = "_actions_rvhdw_17", tS = "_reply_rvhdw_23", nS = "_replyField_rvhdw_28", aS = "_send_rvhdw_54", rS = "_sendIcon_rvhdw_65", oS = "_sendsAs_rvhdw_75", Oe = {
  root: XC,
  attach: ZC,
  actions: eS,
  reply: tS,
  replyField: nS,
  send: aS,
  sendIcon: rS,
  sendsAs: oS
};
function Br({ value: e, onChange: t }) {
  const [a, r] = p("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function lS() {
  return /* @__PURE__ */ n("svg", { className: Oe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function iS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function sS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [o, l] = Br(e), s = k(), c = () => {
    o.trim() !== "" && r(a, o);
  }, d = (u) => {
    iS(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ i("div", { className: Oe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ i("div", { className: Oe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ n(j, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: o, onChange: l, describedBy: s }),
      /* @__PURE__ */ i(b, { variant: "primary", className: Oe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ n(lS, {}),
        /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Oe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function lx(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(sS, { ...e }) : /* @__PURE__ */ n(cS, { ...e });
}
function cS(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: o, onPost: l, onDraft: s } = e, [c, d] = Br(e);
  return /* @__PURE__ */ i("div", { className: Oe.root, children: [
    /* @__PURE__ */ n(j, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ i("div", { className: Oe.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    o && /* @__PURE__ */ n(
      Na,
      {
        label: `Requeue ${o.agent} after posting`,
        consequence: o.consequence,
        checked: o.checked,
        onChange: o.onChange
      }
    ),
    /* @__PURE__ */ i("div", { className: Oe.actions, children: [
      /* @__PURE__ */ n(b, { variant: "primary", onClick: () => l(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const dS = "_list_1yhks_2", uS = "_item_1yhks_6", hS = "_body_1yhks_22", mS = "_text_1yhks_28", wS = "_evidence_1yhks_37", fS = "_consequence_1yhks_49", _S = "_note_1yhks_54", Ue = {
  list: dS,
  item: uS,
  body: hS,
  text: mS,
  evidence: wS,
  consequence: fS,
  note: _S
};
function vS({ criterion: e }) {
  return /* @__PURE__ */ n(He, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function aa({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function bS(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function pS({ criterion: e }) {
  return /* @__PURE__ */ i("span", { className: Ue.body, children: [
    /* @__PURE__ */ n("span", { className: Ue.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(aa, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Ue.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(aa, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Ue.consequence, children: bS(e.why) })
    ] })
  ] });
}
function gS({ criterion: e }) {
  return /* @__PURE__ */ i("li", { className: Ue.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(vS, { criterion: e }),
    /* @__PURE__ */ n(pS, { criterion: e })
  ] });
}
function ix({ criteria: e }) {
  return /* @__PURE__ */ i("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(gS, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ n("p", { className: Ue.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const yS = "_list_dwhoz_2", NS = "_rung_dwhoz_6", kS = "_name_dwhoz_18", $S = "_actor_dwhoz_32", kt = {
  list: yS,
  rung: NS,
  name: kS,
  actor: $S
}, CS = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function SS({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = CS[e.state];
  return /* @__PURE__ */ i("li", { className: kt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: kt.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${kt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function sx({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${kt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(SS, { rung: t }, t.name)) });
}
const RS = "_sheet_pw37w_2", TS = "_title_pw37w_9", xS = "_stage_pw37w_15", LS = "_effects_pw37w_20", AS = "_effect_pw37w_20", ES = "_numeral_pw37w_31", IS = "_effectText_pw37w_38", MS = "_refusals_pw37w_43", BS = "_reasons_pw37w_52", PS = "_reason_pw37w_52", jS = "_actions_pw37w_62", we = {
  sheet: RS,
  title: TS,
  stage: xS,
  effects: LS,
  effect: AS,
  numeral: ES,
  effectText: IS,
  refusals: MS,
  reasons: BS,
  reason: PS,
  actions: jS
};
function qS({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function cx({ run: e, effects: t, refusals: a, cost: r, onRequeue: o, onClose: l, returnFocusTo: s }) {
  const c = k(), d = `${c}-refusal`, [u, h] = p(""), w = a.length > 0;
  return /* @__PURE__ */ n(rt, { kind: "sheet", labelledBy: c, onClose: l, returnFocusTo: s, children: /* @__PURE__ */ i("div", { className: we.sheet, children: [
    /* @__PURE__ */ i("h2", { className: we.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: we.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: we.effects, children: t.map((f, y) => /* @__PURE__ */ i("li", { className: we.effect, children: [
      /* @__PURE__ */ n("span", { className: we.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: we.effectText, children: f })
    ] }, f)) }),
    /* @__PURE__ */ n(
      nm,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(j, { kind: "textarea", label: "Note for the agent", value: u, onChange: h }),
    w && /* @__PURE__ */ i("div", { className: we.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: we.reasons, children: a.map((f, y) => /* @__PURE__ */ n("li", { className: we.reason, id: y === 0 ? d : void 0, children: f.reason }, f.reason)) })
    ] }),
    /* @__PURE__ */ i("div", { className: we.actions, children: [
      /* @__PURE__ */ n(qS, { refused: w, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ n(b, { onClick: l, children: "Cancel" })
    ] })
  ] }) });
}
const OS = "_list_1laeg_2", DS = "_path_1laeg_7", FS = "_head_1laeg_21", HS = "_label_1laeg_28", WS = "_consequence_1laeg_35", it = {
  list: OS,
  path: DS,
  head: FS,
  label: HS,
  consequence: WS
}, an = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function ra(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function oa(e) {
  return e ? "primary" : "secondary";
}
function zS({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: oa(t), size: "sm", onClick: () => a(e.kind), children: an[e.kind] }) : /* @__PURE__ */ n(b, { variant: oa(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: an[e.kind] });
}
function KS({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ i("li", { className: it.path, "data-allowed": e.allowed, "data-role": ra(e.requiredRole), children: [
    /* @__PURE__ */ i("span", { className: it.head, children: [
      /* @__PURE__ */ n("span", { className: it.label, children: e.title ?? an[e.kind] }),
      /* @__PURE__ */ n(m, { role: ra(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: it.consequence, children: e.consequence }),
    /* @__PURE__ */ n(zS, { path: e, primary: t, onChoose: a })
  ] });
}
function dx({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: it.list, children: e.map((a, r) => /* @__PURE__ */ n(KS, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const GS = "_list_1m7i0_2", US = "_item_1m7i0_6", VS = "_node_1m7i0_18", YS = "_body_1m7i0_24", JS = "_head_1m7i0_30", QS = "_stage_1m7i0_36", XS = "_version_1m7i0_41", ZS = "_sentence_1m7i0_49", eR = "_meta_1m7i0_54", Re = {
  list: GS,
  item: US,
  node: VS,
  body: YS,
  head: JS,
  stage: QS,
  version: XS,
  sentence: ZS,
  meta: eR
}, tR = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function nR({ entry: e }) {
  return /* @__PURE__ */ i("span", { className: Re.head, children: [
    /* @__PURE__ */ n("span", { className: Re.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Re.version, title: e.version, children: e.version }) : null
  ] });
}
function aR({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ i("li", { className: `${Re.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Re.node} ward-history-node`, children: /* @__PURE__ */ n(He, { size: 9, kind: tR[e.state], label: e.state }) }),
    /* @__PURE__ */ i("span", { className: `${Re.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(nR, { entry: e }),
      /* @__PURE__ */ n("span", { className: Re.sentence, children: e.sentence }),
      /* @__PURE__ */ i("span", { className: `${Re.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function ux({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Re.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(aR, { entry: t }, t.stage + String(a))) });
}
const rR = "_thread_1e70p_3", oR = "_turn_1e70p_8", lR = "_who_1e70p_27", iR = "_body_1e70p_32", $t = {
  thread: rR,
  turn: oR,
  who: lR,
  body: iR
}, Pr = Ne(!1);
function hx({ children: e, density: t }) {
  return /* @__PURE__ */ n(Pr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${$t.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function mx({ turn: e }) {
  if (!ye(Pr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ i("li", { className: `${$t.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ i("span", { className: `${$t.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${$t.body} ward-chat-body`, children: e.body })
  ] });
}
const sR = "_list_yiolt_3", cR = "_row_yiolt_7", dR = "_label_yiolt_20", uR = "_n_yiolt_26", hR = "_cause_yiolt_33", ct = {
  list: sR,
  row: cR,
  label: dR,
  n: uR,
  cause: hR
};
function mR(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const wR = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function fR({ row: e, formatNumber: t }) {
  return mR(e), /* @__PURE__ */ i("li", { className: `${ct.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(He, { size: 8, ...wR[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: ct.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${ct.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(_R, { cause: e.cause })
  ] });
}
function _R({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${ct.cause} ward-healthrow-cause`, children: e }) : null;
}
function wx({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${ct.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(fR, { row: a, formatNumber: t }, a.label)) });
}
const vR = "_root_1jxwp_2", bR = {
  root: vR
};
function fx({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ i("div", { className: bR.root, "data-density": o, children: [
    /* @__PURE__ */ n(Ft, { items: e, note: t, density: o }),
    /* @__PURE__ */ n(b, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const pR = "_row_dhbre_3", gR = "_key_dhbre_13", yR = "_stack_dhbre_24", NR = "_value_dhbre_32", kR = "_evidence_dhbre_39", $R = "_mark_dhbre_47", Xe = {
  row: pR,
  key: gR,
  stack: yR,
  value: NR,
  evidence: kR,
  mark: $R
};
function CR({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(wn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function _x({ field: e }) {
  return /* @__PURE__ */ i("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ i("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(CR, { state: e.state }) })
  ] });
}
const SR = "_cell_gh2sd_2", RR = {
  cell: SR
}, TR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function xR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function LR(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function AR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: xR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function ER(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function vx({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  LR(e, a);
  const r = ER(e);
  return /* @__PURE__ */ n(
    _m,
    {
      label: "Rejection routing",
      columns: TR,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, l) => /* @__PURE__ */ n("span", { className: RR.cell, "data-norerun": o.noRerun ? !0 : void 0, children: AR(o, l) }),
      empty: t ?? /* @__PURE__ */ n(cf, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const IR = "_row_1f2re_2", MR = "_title_1f2re_12", BR = "_turns_1f2re_18", PR = "_waiting_1f2re_19", jR = "_resolved_1f2re_20", qR = "_activity_1f2re_21", OR = "_cost_1f2re_28", DR = "_link_1f2re_29", FR = "_tableLink_1f2re_47", HR = "_tableRecord_1f2re_48", WR = "_tableRow_1f2re_59", zR = "_tableTitle_1f2re_71", KR = "_tableResolved_1f2re_76", GR = "_tableMeta_1f2re_87", UR = "_tableCost_1f2re_94", VR = "_tableActivity_1f2re_95", YR = "_tableState_1f2re_105", W = {
  row: IR,
  title: MR,
  turns: BR,
  waiting: PR,
  resolved: jR,
  activity: qR,
  cost: OR,
  link: DR,
  tableLink: FR,
  tableRecord: HR,
  tableRow: WR,
  tableTitle: zR,
  tableResolved: KR,
  tableMeta: GR,
  tableCost: UR,
  tableActivity: VR,
  tableState: YR
}, jr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function JR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function QR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function XR(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const ZR = { duplicate: "Closed · duplicate" };
function e2({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(nt, { className: W.tableMeta, text: `waiting on ${e}` });
}
function t2({ value: e }) {
  return /* @__PURE__ */ n("td", { className: W.tableCost, children: e === void 0 ? null : le(e) });
}
function n2({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${W.tableRecord} ward-target`, href: D(e.href), children: `→ ${e.key}` });
}
function a2({ session: e, href: t }) {
  const a = jr[e.state];
  return /* @__PURE__ */ i("tr", { className: W.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ i("td", { className: W.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${W.tableLink} ward-target`, href: D(t), children: /* @__PURE__ */ n(nt, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: W.tableMeta, children: QR(e) })
    ] }),
    /* @__PURE__ */ i("td", { className: W.tableResolved, children: [
      XR(e.resolved),
      /* @__PURE__ */ n(e2, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(t2, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: W.tableActivity, children: JR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: W.tableState, children: /* @__PURE__ */ i("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: ZR[e.state] ?? a.label }),
      /* @__PURE__ */ n(n2, { link: e.link })
    ] }) })
  ] });
}
function r2({ session: e }) {
  const t = jr[e.state];
  return /* @__PURE__ */ i("div", { className: W.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(nt, { className: W.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: W.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(nt, { className: W.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: W.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: W.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : le(e.cost) }),
    /* @__PURE__ */ n("span", { className: W.activity, children: he(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: W.link, href: D(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function bx(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(a2, { session: e.session, href: e.href }) : /* @__PURE__ */ n(r2, { session: e.session });
}
const o2 = "_block_1yy2v_3", l2 = "_list_1yy2v_9", i2 = "_line_1yy2v_14", rn = {
  block: o2,
  list: l2,
  line: i2
}, s2 = { warn: "warning", ok: "ok" };
function c2({ kind: e }) {
  const t = s2[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function d2({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ i("li", { className: `${rn.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(c2, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function px({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${rn.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: rn.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(d2, { line: a }, `${r}-${a.text}`)) }) });
}
const u2 = "_band_tt7hp_1", h2 = "_head_tt7hp_8", m2 = "_cell_tt7hp_19", w2 = "_index_tt7hp_35", f2 = "_title_tt7hp_42", _2 = "_note_tt7hp_48", v2 = "_cellTitle_tt7hp_53", b2 = "_cellBody_tt7hp_58", p2 = "_tag_tt7hp_64", $e = {
  band: u2,
  head: h2,
  cell: m2,
  index: w2,
  title: f2,
  note: _2,
  cellTitle: v2,
  cellBody: b2,
  tag: p2
}, la = 4;
function gx({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== la)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${la}-cell grid`);
  return /* @__PURE__ */ i("section", { className: $e.band, "aria-label": `${e} ${t}`, children: [
    /* @__PURE__ */ i("div", { className: $e.head, children: [
      /* @__PURE__ */ n("span", { className: $e.index, children: e }),
      /* @__PURE__ */ n("span", { className: $e.title, children: t }),
      /* @__PURE__ */ n("span", { className: $e.note, children: a })
    ] }),
    r.map((o) => /* @__PURE__ */ i("div", { className: $e.cell, children: [
      /* @__PURE__ */ n("span", { className: $e.cellTitle, children: o.title }),
      /* @__PURE__ */ n("span", { className: $e.cellBody, children: o.body }),
      o.tag !== void 0 && /* @__PURE__ */ n("span", { className: $e.tag, children: o.tag })
    ] }, o.title))
  ] });
}
const g2 = "_tag_1yuvz_2", y2 = "_link_1yuvz_14", Qt = {
  tag: g2,
  link: y2
};
function yx({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: Qt.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${Qt.tag} ${Qt.link}`, href: D(t), children: e });
}
const N2 = "_eyebrow_m8swv_2", k2 = "_link_m8swv_10", ia = {
  eyebrow: N2,
  link: k2
};
function Nx({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: ia.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${ia.link} ward-target`, href: D(t), children: e }) });
}
export {
  M2 as ACCENT_PRESETS,
  rT as ActionStack,
  rx as ActivityConsole,
  H2 as AdminIcon,
  Tb as AgentCard,
  z2 as AppShell,
  HT as AppearanceStrip,
  gx as Band,
  tT as BarChart,
  zf as BoardColumn,
  yT as BoardFootnote,
  NT as BoardHeader,
  D2 as BoardIcon,
  hT as BoardScroller,
  b as Btn,
  I2 as CHIP_ROLES,
  Nr as CREDENTIAL_COLUMNS,
  eT as Callout,
  WT as CapabilityRow,
  wT as CardGrid,
  mx as ChatMessage,
  Na as Checkbox,
  m as Chip,
  nt as ClampText,
  ox as ClarificationRow,
  ET as ClauseRuleRow,
  AT as ClauseRules,
  nr as ColourLadder,
  zT as ComponentRow,
  lx as Composer,
  $T as ConfigRow,
  kT as ConfigRowHead,
  fn as ConnectionMark,
  ax as ConsoleAnnounceProvider,
  hx as Conversation,
  nm as CostMeter,
  GT as CredentialRow,
  KT as CredentialRowHead,
  ix as CriteriaList,
  Cs as Crumb,
  B2 as DENSITIES,
  wx as DeliveryHealth,
  _T as DeniedState,
  q2 as DisabledScope,
  MT as DryRunRail,
  cf as EmptyState,
  UT as EnvCard,
  Nx as Eyebrow,
  j as Field,
  fT as FilteredEmpty,
  K2 as FoldText,
  dT as FormStack,
  Ft as GateChecklist,
  sx as GateLadder,
  _m as Grid,
  PT as HandoffRuleRow,
  BT as HandoffRules,
  O2 as HomeIcon,
  CT as ItemDrawer,
  VT as KeyPanel,
  ro as LIVE_EVENT_TYPES,
  Jv as LegacyBoardColumn,
  RT as LegacyBoardHeader,
  TT as LegacyConfigRow,
  LT as LegacyItemDrawer,
  Wv as LegacyOverCapNote,
  xT as LegacyPreviewRail,
  Za as LegacyWorkCard,
  Le as LiveIndicator,
  vT as LoadFailed,
  gT as Loading,
  Tr as MCP_SERVER_COLUMNS,
  wn as Mark,
  JT as MarkUpload,
  He as Marker,
  XT as McpServerRow,
  QT as McpServerRowHead,
  Pa as Menu,
  Ia as MenuButton,
  jT as NewStreamModal,
  mf as OverCapNote,
  dn as OverflowRow,
  rt as Overlay,
  G2 as OwedCard,
  IT as PARTIAL_STEP_REASON,
  xr as POLICY_CHIP_WIDTH,
  iT as PageFrame,
  Z2 as PageHeader,
  nT as PlainList,
  ZT as PolicyRow,
  ST as PreviewRail,
  Vt as ROLE_MATRIX_COLUMNS,
  wr as RULE_ACTIONS,
  Ka as Radio,
  fx as ReadyChecklist,
  cT as RecordSection,
  cx as RequeueSheet,
  dx as ResolveBlock,
  _x as ResolvedFieldRow,
  ex as RoleMatrixRow,
  vx as RoutingTable,
  qT as RuleRow,
  tx as RunbookSteps,
  ao as STREAM_STEPS,
  uT as SectionBand,
  Wn as SectionHeader,
  Wa as SegmentedControl,
  La as Select,
  bx as SessionRow,
  J2 as Sidebar,
  W2 as SidebarFoldButton,
  OT as StageColumn,
  mT as StageGrid,
  ux as StageHistory,
  cy as StageListEditor,
  U2 as StageSteps,
  bT as StaleStrip,
  qt as StatStrip,
  oT as StatTiles,
  X2 as StreamAvatar,
  DT as StreamRow,
  F2 as StudioIcon,
  sT as SubjectRail,
  Ve as Switch,
  Y2 as TabLinks,
  aT as TableHead,
  V2 as Tabs,
  yx as Tag,
  x2 as ThemeProvider,
  FT as ToolRow,
  lT as TopBar,
  Nw as Tree,
  Ja as TreeRow,
  px as TypedInputBlock,
  Vl as UNSAFE_HREF,
  nx as ValidationList,
  R2 as VisibilityProvider,
  T2 as Visible,
  E2 as WARD_VERSION,
  Dt as WorkCard,
  pT as WriteUnavailableStrip,
  JR as agoSince,
  zr as clock,
  Sy as colourStatus,
  ae as count,
  ue as duration,
  on as elapsed,
  A2 as eventSourceTransport,
  Bt as isStreamStep,
  ht as isValidatedStreamStep,
  rp as ladderValidation,
  J$ as mcpConnectionChip,
  V$ as mcpToolName,
  le as money,
  be as ms,
  Qa as ordered,
  ua as ratio,
  _k as restartLabel,
  D as safeHref,
  he as stamp,
  ln as stream,
  P2 as streamChip,
  jt as streamChipProps,
  ge as streamColour,
  io as streamHex,
  Rt as streamInitials,
  oo as streamVars,
  Q2 as uniqueStreamInitials,
  Sa as useAnchoredPanel,
  gt as useBorderFlash,
  Ae as useDisabledScope,
  eo as useFocusTrap,
  j2 as useLiveFeed,
  L2 as useReturnFocus,
  Mt as useRovingTabindex,
  sn as useTicker,
  Kr as useVisible,
  B as v,
  YT as validateMark,
  wt as validatedStep,
  ma as validatedStreamSteps
};
