import { jsx as a, Fragment as R, jsxs as o } from "react/jsx-runtime";
import { useMemo as Qa, useContext as ge, createContext as ye, useState as p, useEffect as C, useCallback as ee, useRef as _, useLayoutEffect as tt, useId as N, isValidElement as Lr, Children as Ar, Fragment as Er } from "react";
import { createPortal as Ir, flushSync as Za } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const n = Math.floor(e / 36e5);
  return n < 24 ? `${n}h ${t % 60}m` : `${Math.floor(n / 24)}d ${n % 24}h`;
}
const va = (e) => String(e).padStart(2, "0");
function ta(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const n = Math.floor(t / 60);
  return n < 60 ? `${n}m ${va(t % 60)}s` : `${Math.floor(n / 60)}h ${va(n % 60)}m`;
}
const Mr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const t = Mr.formatToParts(new Date(e)), n = (r) => {
    var l;
    return ((l = t.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${n("day")} ${n("month")} ${n("hour")}:${n("minute")}`;
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
function en(e, t) {
  return `${e} / ${t}`;
}
const Br = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Pr(e) {
  return Br.format(new Date(e));
}
const tn = ye(/* @__PURE__ */ new Set());
function vR({ hidden: e, children: t }) {
  const n = Qa(() => new Set(e), [e]);
  return /* @__PURE__ */ a(tn.Provider, { value: n, children: t });
}
function qr(e) {
  return !ge(tn).has(e);
}
function bR({ id: e, children: t, fallback: n = null }) {
  return /* @__PURE__ */ a(R, { children: qr(e) ? t : n });
}
const Or = "(prefers-color-scheme: dark)";
function ba() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Or) : null;
}
function jr(e) {
  const [t, n] = p(() => {
    var r;
    return ((r = ba()) == null ? void 0 : r.matches) === !0;
  });
  return C(() => {
    const r = e ? ba() : null;
    if (!r) return;
    const l = () => n(r.matches);
    return l(), r.addEventListener("change", l), () => r.removeEventListener("change", l);
  }, [e]), t;
}
function Dt(e, t) {
  C(() => {
    const n = document.documentElement;
    return n.setAttribute(e, t), () => n.removeAttribute(e);
  }, [e, t]);
}
function Dr(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function pR({ theme: e, accent: t = "green", density: n = "comfortable", children: r }) {
  const l = jr(e === "system");
  return Dt("data-theme", Dr(e, l)), Dt("data-accent", t), Dt("data-density", n), /* @__PURE__ */ a(R, { children: r });
}
const Hr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Fr(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function Wr(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function zr(e, t, n, r) {
  return e.shiftKey ? Fr(t, n) ? r : void 0 : document.activeElement === r || Wr(t) ? n : void 0;
}
function Kr(e, t, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = zr(e, t, r, l);
  i && (e.preventDefault(), i.focus());
}
function Gr(e) {
  return { onKeyDown: ee(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Hr));
      Kr(n, e.current, r);
    },
    [e]
  ) };
}
function gR(e, t = !0) {
  C(() => {
    if (!t) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [t, e]);
}
const pa = { ArrowUp: -1, ArrowDown: 1 }, ga = { ArrowLeft: -1, ArrowRight: 1 }, Ur = (e, t, n) => Math.min(n, Math.max(t, e));
function Vr(e, t) {
  if (t !== "horizontal" && e in pa) return pa[e];
  if (t !== "vertical" && e in ga) return ga[e];
}
function Et({ orientation: e = "both" } = {}) {
  const [t, n] = p(0), r = _(/* @__PURE__ */ new Map()), l = _(!1);
  tt(() => {
    var f;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(t)) return;
    const h = u[0], w = l.current;
    l.current = !1, n(h), w && ((f = r.current.get(h)) == null || f.focus());
  });
  const i = ee((u) => n(u), []), s = ee((u) => {
    var h;
    n(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = ee(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(t)), f = Vr(u.key, e);
      f !== void 0 ? (u.preventDefault(), s(h[Ur(w + f, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [t, s, e]
  ), d = ee(
    (u) => ({
      tabIndex: u === t ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(u, h) : (r.current.delete(u), u === t && (l.current = !0));
      },
      onFocus: () => n(u),
      "data-ward-roving": !0
    }),
    [t]
  );
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: i };
}
const yR = (e, t, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, NR = "0.2.0", kR = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Yr = [1, 2, 3, 4, 5, 6], an = [1, 2, 3], Jr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], $R = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], CR = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], z = {
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
    iconRail: "var(--ward-width-iconRail)"
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
}, ve = {
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
function aa(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function It(e) {
  return Yr.includes(e);
}
function ct(e) {
  return an.includes(e);
}
function Xr(e) {
  if (!It(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function SR(e) {
  if (!It(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Qr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Zr(e) {
  if (!It(e)) throw new Error("unvalidated stream step");
  return Qr[e];
}
function ya(e) {
  return typeof e != "string" ? null : Jr.includes(e) ? e : null;
}
function el(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function tl(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function al(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function nl(e, t, n) {
  const r = el(e);
  if (r === null) return null;
  const l = ya(n) ?? ya(r.type);
  return l === null ? null : { ...r, type: l, id: tl(r, t), at: al(r) };
}
function rl(e, t) {
  return e >= ve.staleAfter ? "stale" : e >= ve.heartbeat && t === "live" ? "reconnecting" : null;
}
function ll(e, t, n) {
  return e >= ve.heartbeat && !t && n !== null;
}
function RR(e, t) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = _(/* @__PURE__ */ new Map()), c = _(0), d = _(""), u = _(0), h = _(null), w = _(0), f = _(0), y = _(!1), E = _("reconnecting"), P = ee((T) => {
    E.current = T, r(T);
  }, []), ne = ee(() => {
    c.current = Date.now();
  }, []), Ne = ee((T) => {
    for (const [U, ke] of s.current)
      (ke === "*" || T.itemKey === ke) && U(T);
  }, []), re = ee(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (T, U, ke) => {
        const Fe = nl(T, U, ke);
        Fe !== null && (Fe.id && (d.current = Fe.id), ne(), y.current = !1, P("live"), i(Fe.at), Ne(Fe));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, ne(), P("live");
      },
      onError: () => {
        var U;
        (U = h.current) == null || U.close(), h.current = null, y.current = !0, E.current !== "stale" && P("reconnecting");
        const T = Math.min(ve.reconnectBase * 2 ** u.current, ve.reconnectMax);
        u.current += 1, w.current = window.setTimeout(re, T);
      }
    });
  }, [Ne, P, ne, t, e]), Ee = ee((T) => {
    y.current = !0, T.close(), h.current = null, w.current = window.setTimeout(re, ve.reconnectBase);
  }, [re]), Ve = ee((T, U) => (s.current.set(U, T), () => {
    s.current.delete(U);
  }), []);
  return C(() => (re(), f.current = window.setInterval(() => {
    const T = Date.now() - c.current, U = rl(T, E.current);
    U && P(U);
    const ke = h.current;
    ll(T, y.current, ke) && Ee(ke);
  }, ve.tick), () => {
    var T;
    window.clearInterval(f.current), window.clearTimeout(w.current), y.current = !1, (T = h.current) == null || T.close(), h.current = null;
  }), [re, Ee, P]), { connection: n, lastEventAt: l, subscribe: Ve };
}
function na(e, t) {
  const n = new Date(e).getTime(), [r, l] = p(() => Date.now());
  return C(() => {
    if (!t) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    i();
    const s = window.setInterval(i, ve.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", i);
    };
  }, [t, n]), Math.max(0, r - n);
}
const ol = { blue: "running", orange: "waiting", green: "done" };
function il() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Na(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function bt(e, t) {
  const n = _(0), r = ee((l) => {
    const i = l ?? t, s = e.current;
    s !== null && i !== void 0 && (il() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${ol[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => Na(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => Na(s), ve.flash)));
  }, [t, e]);
  return C(() => () => window.clearTimeout(n.current), []), t === void 0 ? (l) => r(l) : () => r(t);
}
const sl = "_root_1otpc_2", cl = {
  root: sl
};
function dl(e, t, n, r, l) {
  const i = [ta(t)];
  return e || i.push(`as of ${Pr(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Le({ startedAt: e, lastEvent: t, connection: n, turn: r }) {
  const l = n !== "stale", i = na(e, l), s = (t == null ? void 0 : t.at) ?? e, c = dl(l, i, s, r, t);
  return /* @__PURE__ */ o("span", { className: `${cl.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ a("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const ul = "_app_1bnco_1", hl = "_side_1bnco_35", ml = "_sideTop_1bnco_46", wl = "_sideBody_1bnco_60", fl = "_iconRail_1bnco_99", _l = "_railItem_1bnco_108", vl = "_railIcon_1bnco_129", bl = "_railDot_1bnco_134", pl = "_railLetter_1bnco_140", gl = "_main_1bnco_146", yl = "_rail_1bnco_108", Nl = "_page_1bnco_168", kl = "_headerRow_1bnco_191", $l = "_sidebarToggle_1bnco_198", Cl = "_headerSlot_1bnco_203", Sl = "_headerAction_1bnco_208", Rl = "_drawerSide_1bnco_213", Tl = "_root_1bnco_260", xl = "_topbar_1bnco_267", Ll = "_mark_1bnco_278", Al = "_brand_1bnco_285", El = "_tagline_1bnco_291", Il = "_identity_1bnco_297", Ml = "_tools_1bnco_298", Bl = "_nav_1bnco_308", Pl = "_metadata_1bnco_315", ql = "_actor_1bnco_330", Ol = "_detail_1bnco_331", jl = "_content_1bnco_376", Dl = "_toolsPanel_1bnco_392", Hl = "_skip_1bnco_418", $ = {
  app: ul,
  side: hl,
  sideTop: ml,
  sideBody: wl,
  iconRail: fl,
  railItem: _l,
  railIcon: vl,
  railDot: bl,
  railLetter: pl,
  main: gl,
  rail: yl,
  page: Nl,
  headerRow: kl,
  sidebarToggle: $l,
  headerSlot: Cl,
  headerAction: Sl,
  drawerSide: Rl,
  root: Tl,
  topbar: xl,
  mark: Ll,
  brand: Al,
  tagline: El,
  identity: Il,
  tools: Ml,
  nav: Bl,
  metadata: Pl,
  actor: ql,
  detail: Ol,
  content: jl,
  toolsPanel: Dl,
  skip: Hl
};
function dt(...e) {
  const t = e.filter((n) => n !== void 0 && n !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const Fl = "_scope_1an6i_2", Wl = {
  scope: Fl
}, nn = ye(null);
function TR({ reason: e, actions: t = "disable", children: n }) {
  const r = N();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${Wl.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ a("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ a(nn.Provider, { value: { reason: e, reasonId: r, actions: t }, children: n })
  ] });
}
function Ae() {
  return ge(nn);
}
function Mt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : dt(e, t.reasonId);
}
const zl = "_btn_tzr89_2", Kl = "_primary_tzr89_14", Gl = "_destructive_tzr89_25", Ul = "_secondary_tzr89_35", Vl = "_ghost_tzr89_40", Yl = "_overflow_tzr89_49", Jl = "_sm_tzr89_56", Xl = "_disabled_tzr89_60", mt = {
  btn: zl,
  primary: Kl,
  destructive: Gl,
  secondary: Ul,
  ghost: Vl,
  overflow: Yl,
  sm: Jl,
  disabled: Xl
};
function Ql(e, t, n, r) {
  const l = t === "sm" ? [mt.sm, "ward-btn--sm"] : [], i = n ? [mt.disabled] : [];
  return [mt.btn, mt[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Zl(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function eo(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function to(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function ao(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function no(e, t, n) {
  return ao(e.describedBy, t && n);
}
function ro({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ a("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function lo(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Ae()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ a(oo, { ...e });
}
function oo(e) {
  const t = Ae();
  eo(e, t);
  const n = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || t), i = to(e, t), s = N();
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: e.type ?? "button",
        className: Ql(n, r, l, e.className),
        "data-ward-btn": n,
        "data-ward-size": r,
        disabled: l,
        title: i,
        "aria-describedby": no(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Zl(n, e.controls),
        children: lo(e)
      }
    ),
    /* @__PURE__ */ a(ro, { id: s, reason: i })
  ] });
}
let ra = "none";
function io(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (ra = "key");
}
typeof document < "u" && (document.addEventListener("keydown", io, !0), document.addEventListener("pointerdown", () => {
  ra = "pointer";
}, !0));
function so() {
  return ra === "key";
}
function it(e) {
  const [t, n] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return C(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (s) => n(s.matches);
    return r.addEventListener("change", l), n(r.matches), () => r.removeEventListener("change", l);
  }, [e]), t;
}
const co = "_scrim_1cawq_2", uo = "_drawer_1cawq_10", ho = "_sheet_1cawq_14", mo = "_modal_1cawq_18", wo = "_panel_1cawq_23", fo = "_start_1cawq_44", _o = "_header_1cawq_67", vo = "_title_1cawq_75", bo = "_body_1cawq_79", po = "_close_1cawq_106", Te = {
  scrim: co,
  drawer: uo,
  sheet: ho,
  modal: mo,
  panel: wo,
  start: fo,
  header: _o,
  title: vo,
  body: bo,
  close: po
}, go = ye(null), kt = [], $t = /* @__PURE__ */ new Map();
function yo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function No(e, t) {
  let n = $t.get(t);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, $t.set(t, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function ko(e, t, n) {
  for (const r of Array.from(t.children))
    r !== n && !yo(r) && No(e, r);
}
function $o(e, t) {
  let n = null, r = t;
  for (; r; ) {
    if (ko(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function Co(e) {
  for (const t of e.claims) {
    const n = $t.get(t);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || t.removeAttribute("inert"), $t.delete(t)));
  }
}
function So(e, t) {
  const n = { root: e, claims: [] };
  return kt.push(n), $o(n, t), n;
}
function Ro(e) {
  const t = kt.indexOf(e);
  t >= 0 && kt.splice(t, 1), Co(e);
}
function ka(e) {
  return e !== null && kt.at(-1) === e;
}
function To(e, t, n) {
  const r = _(null), l = _(n);
  return l.current = n, C(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = So(i, t);
    return r.current = c, () => {
      var u, h;
      const d = ka(c);
      Ro(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), ee(() => ka(r.current), []);
}
function xo(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function Lo(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ao({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ a("div", { className: `${Te.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("header", { className: `${Te.header} ward-drawer-head`, children: /* @__PURE__ */ a("h2", { className: `${Te.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ a("div", { className: `${Te.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Eo(e) {
  return `${Te.scrim} ${Te[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Io(e, t) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Te.panel} ${Te[e]} ward-overlay-panel${n}${r}`;
}
function Mo(e) {
  const t = ge(go);
  return e ?? t ?? document.body;
}
function nt(e) {
  const t = _(null), n = _(null), r = N(), l = Mo(e.container), i = it("(min-width: 768px)"), s = xo(e.kind, i), c = Lo(e, r), d = Gr(n), [u] = p(so), h = To(t, l, e.returnFocusTo), w = ee(() => {
    h() && e.onClose();
  }, [e.onClose, h]);
  return C(() => {
    var f;
    h() && ((f = n.current) == null || f.focus());
  }, [h]), C(() => {
    const f = (y) => {
      y.key === "Escape" && w();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [w]), Ir(
    /* @__PURE__ */ a(
      "div",
      {
        ref: t,
        className: Eo(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: w,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: n,
            id: e.id,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": c.labelledBy,
            "aria-label": c.label,
            tabIndex: -1,
            "data-focus-ring": u || void 0,
            className: Io(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => h() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ a("button", { type: "button", className: `${Te.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ a(Ao, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Bo = /^([a-z][a-z0-9+.-]*):/i, Po = /* @__PURE__ */ new Set(["http", "https"]), qo = "#";
function Oo(e) {
  var r, l;
  const t = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < t.length && t.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = Bo.exec(t.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function H(e) {
  const t = Oo(e);
  return t === void 0 || Po.has(t) ? e : qo;
}
function jo(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function rn(e) {
  const t = jo(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function Do(e, t) {
  C(() => {
    const n = e.current;
    if (!n) return;
    const r = () => rn(n);
    n.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [n, ...n.children]) l == null || l.observe(i);
    return r(), () => {
      n.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, t]);
}
function Ho(e, t) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + t.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function Fo(e, t, n) {
  tt(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[t];
    if (!r || !l) return;
    const i = Ho(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), rn(r);
  }, [e, t, n]);
}
const Wo = "_row_11g8i_2", zo = {
  row: Wo
};
function Ko(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function la({ label: e, children: t, count: n, as: r = "div", focusable: l = !0, rowRef: i, className: s, ...c }) {
  const d = _(null), u = i ?? d;
  return Do(u, n), /* @__PURE__ */ a(r, { ref: u, className: [zo.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Ko(l, r), ...c, children: t });
}
const Go = "_icon_1ylqy_2", Uo = {
  icon: Go
};
function ut({ children: e }) {
  return /* @__PURE__ */ a("svg", { className: Uo.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function xR() {
  return /* @__PURE__ */ a(ut, { children: /* @__PURE__ */ a("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function LR() {
  return /* @__PURE__ */ o(ut, { children: [
    /* @__PURE__ */ a("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ a("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ a("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function AR() {
  return /* @__PURE__ */ o(ut, { children: [
    /* @__PURE__ */ a("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ a("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function ER() {
  return /* @__PURE__ */ a(ut, { children: /* @__PURE__ */ a("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Vo() {
  return /* @__PURE__ */ o(ut, { children: [
    /* @__PURE__ */ a("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ a("path", { d: "M9 4v16" })
  ] });
}
const ln = "ward:sidebar-collapsed", Yo = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Jo() {
  try {
    return window.localStorage.getItem(ln) === "true";
  } catch {
    return !1;
  }
}
function Xo(e) {
  try {
    window.localStorage.setItem(ln, String(e));
  } catch {
  }
}
function Qo(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Zo(e) {
  return e instanceof Element && e.closest(Yo) !== null;
}
function ei(e) {
  return e.key === "[" && !Qo(e) && !Zo(e.target);
}
function ti(e) {
  const [t, n] = p(Jo), r = () => {
    Xo(!t), n(!t);
  };
  return C(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!ei(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, t]), { collapsed: t, toggle: r };
}
function ai() {
  const e = it("(max-width: 767.98px)"), t = it("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function ni(e) {
  const t = e === "phone", n = N(), r = _(null), [l, i] = p(!1);
  return l && !t && i(!1), { narrow: t, open: l, drawerId: n, slotRef: r, toggle: () => i(!l), close: () => i(!1) };
}
function ri({ header: e, action: t, label: n, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ a("span", { ref: r.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ a(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: n }) }),
    /* @__PURE__ */ a("div", { className: $.headerSlot, children: e }),
    dn(t) && /* @__PURE__ */ a("span", { className: $.headerAction, children: t })
  ] }) : e;
}
function li(e, t) {
  C(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function oi({ sidebar: e, label: t, drawer: n }) {
  var l;
  if (li(n.open, n.close), !n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ a(nt, { kind: "start", id: n.drawerId, title: t, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ a("div", { className: $.drawerSide, onClick: r, children: on(e, !1) }) });
}
function ii(e) {
  const [t, n] = p(!1);
  return t && e !== "medium" && n(!1), { open: t, toggle: () => n(!t) };
}
function si(e, t) {
  const n = ti(e === "wide" && !t), r = ii(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && n.collapsed, toggle: n.toggle };
}
function ci(e, t) {
  const n = si(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return ui(e.collapsed, t);
  const r = n.collapsed, l = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: l, drawsStrip: !l && typeof e.sidebar == "function", toggle: n.toggle };
}
const di = (e) => e.collapsed && e.drawsStrip;
function ui(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const $a = (e) => e ? "" : void 0;
function on(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function sn({ fold: e }) {
  return /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ a(Vo, {}),
    /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function hi({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ a("div", { className: $.sideTop, children: /* @__PURE__ */ a(sn, { fold: e }) });
}
const cn = ye(null);
function IR() {
  const e = ge(cn);
  return e === null || !e.enabled ? null : /* @__PURE__ */ a(sn, { fold: e });
}
function mi({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ a("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ a("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": aa(e.streamStep).id } }) : /* @__PURE__ */ a("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function wi({ items: e, label: t }) {
  return /* @__PURE__ */ a("nav", { className: $.iconRail, "aria-label": t, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: H(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ a(mi, { item: n }),
    /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function fi({ sidebar: e, label: t, iconRail: n, fold: r, inSidebar: l }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ a(hi, { fold: r, inSidebar: l && !i }),
    /* @__PURE__ */ a("div", { className: $.sideBody, hidden: i, children: on(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ a(wi, { items: n ?? [], label: t })
  ] });
}
const dn = (e) => e != null;
function _i(e) {
  const { sidebar: t, header: n, action: r, children: l, rail: i, iconRail: s, pageFill: c } = e, d = dn(i), u = ai(), h = ni(u), w = ci(e, u), f = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": $a(di(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ a(cn.Provider, { value: w, children: /* @__PURE__ */ a(fi, { sidebar: t, label: f, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ o("main", { className: $.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ a(ri, { header: n, action: r, label: f, drawer: h }),
      /* @__PURE__ */ a("div", { className: $.page, "data-fill": $a(c === !0), children: l })
    ] }),
    d && /* @__PURE__ */ a("div", { className: $.rail, children: i }),
    /* @__PURE__ */ a(oi, { sidebar: t, label: f, drawer: h })
  ] });
}
function vi({ destinations: e, active: t }) {
  const n = _(null);
  return Fo(n, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ a(la, { as: "nav", rowRef: n, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ a("a", { href: H(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function Vt({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ a("span", { className: t, children: e });
}
function bi({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ a(Vt, { value: e, className: $.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ a("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ a(Vt, { value: t, className: $.detail })
  ] });
}
function pi() {
  const e = it("(max-width: 767.98px)"), t = N(), n = _(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: t, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function gi({ tools: e, toolsLabel: t, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ a("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ a(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ a("span", { className: $.tools, children: e });
}
function yi({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ a("div", { id: t.panelId, className: $.toolsPanel, hidden: !t.open, onKeyDown: n, children: e });
}
function Ni(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ a("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ a("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ a(Vt, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ a(vi, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ a("span", { className: $.identity, children: /* @__PURE__ */ a(bi, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ a(gi, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function ki(e) {
  const t = N(), n = pi();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ a("a", { className: $.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ a(Ni, { ...e, menu: n }),
    /* @__PURE__ */ a(yi, { tools: e.tools, menu: n }),
    /* @__PURE__ */ a("div", { id: t, className: $.content, children: e.children })
  ] });
}
function $i(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function MR(e) {
  return $i(e) ? /* @__PURE__ */ a(_i, { ...e }) : /* @__PURE__ */ a(ki, { ...e });
}
const Ci = "_root_itg9o_2", Si = "_row_itg9o_8", Ri = "_box_itg9o_14", Ti = "_label_itg9o_21", xi = "_labelHidden_itg9o_26", Li = "_lockedNote_itg9o_36", Ai = "_consequence_itg9o_44", Ei = "_sample_itg9o_79", Be = {
  root: Ci,
  row: Si,
  box: Ri,
  label: Ti,
  labelHidden: xi,
  lockedNote: Li,
  consequence: Ai,
  sample: Ei
};
function Ii(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function Mi({ id: e, text: t }) {
  return t ? /* @__PURE__ */ a("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: t }) : null;
}
function Bi({ locked: e }) {
  return e ? /* @__PURE__ */ a("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Pi({ text: e }) {
  return e ? /* @__PURE__ */ a("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function un(e) {
  const t = N(), n = e.consequence ? `${t}-note` : void 0, r = Ae(), l = Ii(e, r);
  return /* @__PURE__ */ o("div", { className: `${Be.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: Be.row, children: [
      /* @__PURE__ */ a(
        "input",
        {
          id: t,
          type: "checkbox",
          className: `${Be.box} ward-field-option`,
          checked: l.checked,
          disabled: l.disabled,
          onChange: (i) => {
            var s;
            return !l.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, i.target.checked));
          },
          "aria-describedby": Mt(dt(n, e.describedBy), r),
          title: r == null ? void 0 : r.reason
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: t, className: e.labelHidden ? Be.labelHidden : Be.label, children: [
        e.label,
        /* @__PURE__ */ a(Bi, { locked: e.locked })
      ] }),
      /* @__PURE__ */ a(Pi, { text: e.sample })
    ] }),
    /* @__PURE__ */ a(Mi, { id: n, text: e.consequence })
  ] });
}
const qi = "_chip_pq6tb_2", Oi = {
  chip: qi
}, ji = {
  gate: z.chip.gate,
  system: z.chip.system,
  write: z.chip.write,
  drift: z.chip.drift,
  done: z.chip.done,
  attention: z.chip.attention,
  failed: z.chip.failed,
  pending: z.chip.pending,
  running: z.chip.running,
  warn: z.chip.warn,
  meta: z.chip.meta,
  soft: z.chip.soft,
  quiet: z.chip.quiet,
  owed: z.chip.owed
};
function Di(e, t) {
  if (e === "stream") return Hi(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = ji[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function Hi(e) {
  if (!e || !ct(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = aa(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: n, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ a("span", { className: `${Oi.chip} ward-chip ward-chip--${e}`, style: Di(e, n), "data-ward-chip": e, "data-size": r, children: t });
}
const Fi = "_clamp_zn74g_3", Ca = {
  clamp: Fi
};
function at({ text: e, as: t = "span", className: n }) {
  return /* @__PURE__ */ a(t, { className: n === void 0 ? Ca.clamp : `${Ca.clamp} ${n}`, "data-ward-clamp": "", title: e, children: e });
}
function ht(e) {
  return typeof e == "number" && ct(e) ? e : null;
}
function pe(e, t) {
  const n = ht(e);
  return n === null ? "var(--ward-color-line2)" : `var(--ward-stream-${n}-${t})`;
}
function Bt(e, t) {
  const n = ht(t);
  return n === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: n };
}
const Wi = "_root_13eei_3", zi = "_nav_13eei_8", Ki = "_list_13eei_16", Gi = "_item_13eei_24", Ui = "_link_13eei_44", Vi = "_sep_13eei_54", Yi = "_current_13eei_58", Ji = "_chips_13eei_62", Me = {
  root: Wi,
  nav: zi,
  list: Ki,
  item: Gi,
  link: Ui,
  sep: Vi,
  current: Yi,
  chips: Ji
};
function Xi({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ a("span", { className: Me.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ a("a", { className: `${Me.link} ward-target`, href: H(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ a("span", { title: e.label, children: e.label });
}
function Qi({ path: e, chips: t, current: n = !0 }) {
  return /* @__PURE__ */ a("div", { className: Me.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ a("ol", { className: Me.list, children: e.map((r, l) => /* @__PURE__ */ o("li", { className: Me.item, children: [
      l > 0 ? /* @__PURE__ */ a("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ a(Xi, { step: r, isCurrent: n && l === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ a("span", { className: `${Me.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ a(m, { ...r }, r.label)) }) : null
  ] }) });
}
function hn(e, t, n) {
  const r = _(n);
  r.current = n, C(() => {
    if (!e) return;
    const l = (i) => {
      var s;
      (s = t.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, t]);
}
const Zi = 500;
function mn(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function wn() {
  const e = _(""), t = _(void 0);
  return C(() => () => clearTimeout(t.current), []), (n) => (clearTimeout(t.current), e.current += n.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, Zi), e.current);
}
const wt = 4;
function es(e, t, n) {
  const r = Math.max(0, n - e.bottom - wt * 2), l = Math.max(0, e.top - wt * 2);
  return t <= r || r >= l ? { top: e.bottom + wt, maxHeight: r } : { top: e.top - wt - Math.min(t, l), maxHeight: l };
}
function ts(e, t, n, r) {
  const l = { start: e.left, end: e.right - t }, i = { start: l.start + t <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - t));
}
function as(e, t, n, r) {
  return { ...es(e, t.height, n.height), left: ts(e, t.width, n.width, r) };
}
function pt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function ns(e, t) {
  const n = t.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", pt(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function rs(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = t.map((r) => r.scrollTop);
  return () => t.forEach((r, l) => r.scrollTop = n[l]);
}
function Sa(e, t, n) {
  const r = rs(e), l = ns(e, t), i = as(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: pt(i.left - l.box.left), top: pt(i.top - l.box.top), maxHeight: pt(i.maxHeight) }), r();
}
function ls(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function fn(e, t, n = "start") {
  tt(() => {
    const r = t.current, l = e.current;
    if (!r || !l) return;
    const i = ls(r), s = () => Sa(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, t, n]), tt(() => {
    t.current && e.current && Sa(t.current, e.current, n);
  });
}
const os = "_root_1lgbn_2", is = "_trigger_1lgbn_7", ss = "_value_1lgbn_47", cs = "_menu_1lgbn_65", ds = "_find_1lgbn_87", us = "_list_1lgbn_103", hs = "_option_1lgbn_114", ms = "_check_1lgbn_133", ws = "_empty_1lgbn_144", be = {
  root: os,
  trigger: is,
  value: ss,
  menu: cs,
  find: ds,
  list: us,
  option: hs,
  check: ms,
  empty: ws
}, fs = 7;
function _s(e, t) {
  const n = t.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function Ra(e, t) {
  return Math.max(0, e.findIndex((n) => n.value === t));
}
function vs(e, t) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => Ra(e.options, e.value)), d = (u) => {
    var h;
    Za(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: _s(e.options, l),
    findable: e.options.length > fs,
    show: () => {
      e.disabled || (i(""), c(Ra(e.options, e.value)), r(!0));
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
function bs(e, t) {
  const n = _(!1);
  return C(() => {
    var r;
    e && n.current && ((r = t.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function ps(e) {
  const t = wn();
  return (n) => {
    const r = t(n), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function _n(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function gs(e) {
  return { ..._n(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function vn(e, t, n) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = t[r.key];
    if (!l) return n(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const ys = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Ns(e, t) {
  const n = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      ys.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function ks({ entry: e, at: t, menu: n, ids: r, value: l }) {
  return /* @__PURE__ */ o(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
      "data-active": t === n.active || void 0,
      className: be.option,
      onMouseDown: (i) => i.preventDefault(),
      onMouseMove: () => n.to(t),
      onClick: () => n.pick(e),
      children: [
        /* @__PURE__ */ a("span", { className: be.check, "aria-hidden": "true" }),
        /* @__PURE__ */ a("span", { className: be.label, children: e.option.label })
      ]
    }
  );
}
function oa(e, t) {
  const n = e.entries[e.active];
  return n ? t.option(n.index) : void 0;
}
function $s({ menu: e, ids: t, focusRef: n }) {
  return /* @__PURE__ */ a(
    "input",
    {
      ref: n,
      className: be.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": t.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": oa(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: vn(e, _n(e), () => {
      })
    }
  );
}
function Cs({ props: e, menu: t, ids: n, focusRef: r, trigger: l }) {
  const i = ps(t), s = _(null);
  fn(l, s);
  const c = (d) => {
    mn(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: be.menu, children: [
    t.findable && /* @__PURE__ */ a($s, { menu: t, ids: n, focusRef: r }),
    /* @__PURE__ */ a(
      "ul",
      {
        ref: t.findable ? void 0 : r,
        id: n.list,
        role: "listbox",
        tabIndex: -1,
        className: be.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": t.findable ? void 0 : oa(t, n),
        onKeyDown: vn(t, gs(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ a(ks, { entry: d, at: u, menu: t, ids: n, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ a("p", { className: be.empty, children: "No match" })
  ] });
}
function Ss(e, t) {
  const n = e.open ? oa(e, t) : void 0;
  C(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function bn(...e) {
  return e.filter(Boolean).join(" ");
}
function Rs(e) {
  var t;
  return ((t = e.options.find((n) => n.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function Ts({ props: e, menu: t, ids: n, trigger: r, wantFocus: l }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ae()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ a(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: bn(be.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": t.open,
      "aria-controls": t.open ? n.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": dt(e["aria-describedby"], n.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...Ns(t, l),
      children: /* @__PURE__ */ a("span", { id: n.value, className: be.value, "data-placeholder": i || void 0, children: Rs(e) })
    }
  );
}
function pn(e) {
  const t = Ae(), n = t ? { ...e, disabled: !0, "aria-describedby": Mt(e["aria-describedby"], t) } : e, r = N(), l = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = _(null), s = _(null), c = _(null), d = vs(n, s), u = bs(d.open, c);
  return hn(d.open, i, () => d.close(!1)), Ss(d, l), /* @__PURE__ */ o("div", { ref: i, className: bn(be.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ a(Ts, { props: n, menu: d, ids: l, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ a("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ a(Cs, { props: n, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const xs = "_field_1ensj_2", Ls = "_label_1ensj_8", As = "_labelHidden_1ensj_15", Es = "_control_1ensj_25", Is = "_mono_1ensj_45", Ms = "_area_1ensj_50", Bs = "_invalid_1ensj_57", je = {
  field: xs,
  label: Ls,
  labelHidden: As,
  control: Es,
  mono: Is,
  area: Ms,
  invalid: Bs
}, Ps = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, gn = (e) => `${e}-label`;
function qs({ props: e, controlProps: t, cls: n }) {
  const r = e.secret ? Ps : {};
  return /* @__PURE__ */ a("input", { className: n, ...r, ...t });
}
function Os({ props: e, controlProps: t, cls: n }) {
  return /* @__PURE__ */ a(
    pn,
    {
      id: t.id,
      triggerClassName: n,
      "aria-labelledby": gn(t.id),
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
function js({ props: e, controlProps: t, cls: n }) {
  return /* @__PURE__ */ a("textarea", { className: n, rows: e.rows ?? 3, ...t });
}
const Ds = { input: qs, select: Os, textarea: js };
function Hs(e, t, n) {
  const r = Ds[e.kind ?? "input"];
  return /* @__PURE__ */ a(r, { props: e, controlProps: t, cls: n });
}
function Fs(e, t, n, r) {
  const l = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": l,
    "aria-describedby": Mt(dt(l ? n : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function Ws(e) {
  const t = e.mono ? [je.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [je.area] : [];
  return [je.control, "ward-field-input", ...t, ...n].filter(Boolean).join(" ");
}
function zs(e) {
  return e ? `${je.label} ${je.labelHidden} ward-field-label` : `${je.label} ward-field-label`;
}
function M(e) {
  const t = N(), n = `${t}-msg`, r = Fs(e, t, n, Ae()), l = Ws(e);
  return /* @__PURE__ */ o("div", { className: `${je.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ a("label", { id: gn(t), className: zs(e.labelHidden), htmlFor: t, children: e.label }),
    Hs(e, r, l),
    e.invalid && /* @__PURE__ */ a("p", { id: n, className: `${je.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Ks = "_root_1waw7_2", Gs = "_trigger_1waw7_9", Us = "_panel_1waw7_33", Vs = "_menu_1waw7_53", Ys = "_group_1waw7_58", Js = "_heading_1waw7_63", Xs = "_item_1waw7_69", Qs = "_description_1waw7_84", Zs = "_marked_1waw7_93", ec = "_check_1waw7_98", tc = "_separator_1waw7_123", ac = "_footer_1waw7_129", X = {
  root: Ks,
  trigger: Gs,
  panel: Us,
  menu: Vs,
  group: Ys,
  heading: Js,
  item: Xs,
  description: Qs,
  marked: Zs,
  check: ec,
  separator: tc,
  footer: ac
}, yn = ye(null);
function nc(e, t) {
  const [n, r] = p({ open: e, start: null, request: 0 });
  return {
    ...n,
    show: (l) => r((i) => ({ open: !0, start: l, request: i.request + 1 })),
    close: (l) => {
      var i;
      Za(() => r((s) => ({ ...s, open: !1 }))), l && ((i = t.current) == null || i.focus());
    }
  };
}
const rc = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function lc(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const n = rc.get(t.key);
      n && (t.preventDefault(), e.show(n));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function Nn(...e) {
  return e.filter(Boolean).join(" ");
}
function oc(e, t = {}) {
  const { ref: n, className: r, ...l } = t;
  return { ...l, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: Nn(X.trigger, r) };
}
function kn(e) {
  const t = N(), n = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = _(null), l = _(null), i = nc(e.defaultOpen === !0, l);
  return hn(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: Nn(X.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ a(
      "button",
      {
        ...oc(l, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...lc(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ a(yn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function ic(e) {
  let t = 0;
  const n = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function sc(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const $n = (e, t) => (e % t + t) % t;
function Ze(e, t, n) {
  for (let r = 1; r <= e.length; r++) {
    const l = $n(t + n * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const cc = (e) => e.split("").every((t) => t === e[0]);
function dc(e, t, n) {
  const r = cc(n), l = r ? n[0] : n, i = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = $n(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function uc(e) {
  const t = _([]);
  return {
    items: e,
    refs: t,
    current: () => t.current.indexOf(document.activeElement),
    focus: (n) => {
      var r;
      return (r = t.current[n]) == null ? void 0 : r.focus();
    }
  };
}
function hc(e, t) {
  const { items: n } = e, r = () => {
    var l;
    return (l = e.refs.current[e.current()]) == null ? void 0 : l.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(Ze(n, e.current(), 1))],
    ["ArrowUp", () => e.focus(Ze(n, e.current(), -1))],
    ["Home", () => e.focus(Ze(n, -1, 1))],
    ["End", () => e.focus(Ze(n, n.length, -1))],
    ["Escape", () => t.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function mc(e, t) {
  const n = _(!1), r = wn(), l = hc(e, t), i = (s) => {
    mn(s) && e.focus(dc(e.items, e.current(), r(s.key)));
  };
  return {
    onKeyDown: (s) => {
      s.key === "Tab" && (n.current = !0);
      const c = l.get(s.key);
      if (!c) return i(s);
      s.preventDefault(), s.stopPropagation(), c();
    },
    onKeyUp: (s) => {
      s.key === " " && s.preventDefault();
    },
    onBlur: () => {
      n.current && t.close(!1);
    }
  };
}
function wc(e) {
  const t = e.findIndex((n) => n.current && !n.disabled);
  return t === -1 ? Ze(e, -1, 1) : t;
}
function fc(e, t) {
  const { start: n, request: r } = t, l = _(e);
  l.current = e, C(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? wc(i) : Ze(i, i.length, -1));
  }, [n, r]);
}
function _c({ row: e, nav: t, popup: n }) {
  const { item: r, at: l } = e;
  return {
    onMouseDown: (i) => i.preventDefault(),
    onMouseMove: () => {
      !r.disabled && t.current() !== l && t.focus(l);
    },
    onClick: (i) => {
      var s;
      if (r.disabled) return i.preventDefault();
      (s = r.onSelect) == null || s.call(r), n.close(!0);
    }
  };
}
function vc(e, t) {
  if (!e.description) return { aria: {}, content: e.label };
  const n = { "aria-labelledby": t + "-label", "aria-describedby": t + "-description" }, r = /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("span", { id: t + "-label", children: e.label }),
    /* @__PURE__ */ a("span", { id: t + "-description", className: X.description, children: e.description })
  ] });
  return { aria: n, content: r };
}
function bc() {
  return /* @__PURE__ */ a("svg", { className: X.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ a("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function pc(e, t, n) {
  return n ? { className: X.item + " " + X.marked, content: /* @__PURE__ */ o(R, { children: [
    e.current ? /* @__PURE__ */ a(bc, {}) : null,
    t
  ] }) } : { className: X.item, content: t };
}
function Cn(e) {
  const { item: t, at: n } = e.row, r = vc(t, N()), l = pc(t, r.content, e.nav.items.some((s) => s.current)), i = {
    ref: (s) => {
      e.nav.refs.current[n] = s;
    },
    role: "menuitem",
    tabIndex: -1,
    className: l.className,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...r.aria,
    ..._c(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ a("a", { href: H(t.href), ...i, children: l.content }) : /* @__PURE__ */ a("button", { type: "button", ...i, children: l.content });
}
function gc({ heading: e, rows: t, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: X.group, children: [
    /* @__PURE__ */ a("div", { id: l, className: X.heading, children: e }),
    t.map((i) => /* @__PURE__ */ a(Cn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function yc({ block: e, nav: t, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ a("div", { role: "separator", className: X.separator }) : e.kind === "group" ? /* @__PURE__ */ a(gc, { heading: e.heading, rows: e.rows, nav: t, popup: n }) : /* @__PURE__ */ a(Cn, { row: e.row, nav: t, popup: n });
}
function Nc() {
  const e = ge(yn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Sn({ entries: e, footer: t, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = Nc(), c = _(null);
  fn(s, c, n);
  const d = ic(e), u = uc(d.flatMap(sc).map((w) => w.item)), h = mc(u, r);
  return fc(u, r), /* @__PURE__ */ o("div", { ref: c, className: X.panel, children: [
    /* @__PURE__ */ a("div", { role: "menu", id: l, "aria-labelledby": i, className: X.menu, ...h, children: d.map((w, f) => /* @__PURE__ */ a(yc, { block: w, nav: u, popup: r }, f)) }),
    t && /* @__PURE__ */ a("p", { className: X.footer, children: t })
  ] });
}
function kc(e) {
  var n;
  return (((n = e.parentElement) == null ? void 0 : n.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function Rn(e, t) {
  C(() => {
    const n = e.current;
    t === "page" && n && !kc(n) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const $c = (e, t) => e.reduce((n, r) => n + r + t, -t);
function Cc({ room: e, widths: t, more: n, gap: r }, l) {
  const i = t.map((d, u) => u);
  if ($c(t, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([l]);
  let c = t[l] + r + n;
  for (const d of i)
    if (d !== l) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Ht = (e) => Number.parseFloat(e) || 0, Ta = (e) => e.getBoundingClientRect().width;
function Sc(e, t) {
  const n = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Ht(n.paddingInlineStart) - Ht(n.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), Ta),
    more: r ? Ta(r) : 0,
    gap: Ht(n.columnGap)
  };
}
function Rc(e, t) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const Tc = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function Tn(e, t, n, r = ':scope > [role="tab"]') {
  const [l, i] = p(null);
  return tt(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = Sc(s, r);
      i((u) => Tc(u, d) ? u : d);
    };
    return c(), Rc(s, c);
  }, [e, n, r]), l && Cc(l, t);
}
const xc = "_strip_jqyo6_2", Lc = "_fits_jqyo6_19", Ac = "_probe_jqyo6_27", Ec = "_moreRoot_jqyo6_36", Ic = "_more_jqyo6_36", Mc = "_tab_jqyo6_55", Bc = "_count_jqyo6_91", Q = {
  strip: xc,
  fits: Lc,
  probe: Ac,
  moreRoot: Ec,
  more: Ic,
  tab: Mc,
  count: Bc
}, xn = "More";
function Pc(e, t) {
  const n = e.findIndex((r) => r.id === t);
  return n < 0 ? 0 : n;
}
const Ln = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function An(e) {
  return `${Q.strip} ward-tabs ward-tabs--${e}`;
}
const qc = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Oc({ tab: e, active: t, place: n, onChange: r }) {
  return /* @__PURE__ */ o(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${Q.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      onClick: () => r(e.id),
      ...n,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ o(R, { children: [
          " ",
          /* @__PURE__ */ a("span", { className: Q.count, children: `· ${e.count}` })
        ] })
      ]
    }
  );
}
function jc(e, t) {
  return (n) => {
    t(n), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Dc({ tabs: e, trigger: t, onPick: n }) {
  return /* @__PURE__ */ a(kn, { label: xn, className: Q.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: Q.more }, children: /* @__PURE__ */ a(Sn, { align: "end", entries: e.map((r) => ({ label: Ln(r), onSelect: () => n(r.id) })) }) });
}
function Hc(e, t, n) {
  return !t || t.includes(n) ? e.itemProps(n) : qc;
}
function BR({ tabs: e, active: t, onChange: n, label: r = "Tabs", level: l }) {
  const i = Et({ orientation: "horizontal" }), s = Pc(e, t);
  C(() => i.setActive(s), [i.setActive, s]);
  const c = _(null);
  Rn(c, l);
  const d = Tn(c, s, e.map(Ln).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${An(l)} ${Q.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ a(Oc, { tab: h, active: t, place: Hc(i, d, w), onChange: n }, h.id)),
    /* @__PURE__ */ a("span", { "aria-hidden": "true", "data-more-probe": "", className: `${X.trigger} ${Q.more} ${Q.probe}`, children: xn }),
    u.length > 0 && /* @__PURE__ */ a(Dc, { tabs: u, trigger: i.itemProps(e.length), onPick: jc(c, n) })
  ] });
}
const xa = 7, En = "More", Fc = ":scope > a", In = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Wc = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function zc(e, t) {
  return !e || e.includes(t) ? {} : Wc;
}
function Kc({ link: e, current: t, place: n }) {
  return /* @__PURE__ */ o("a", { href: e.href, className: `${Q.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...n, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ o(R, { children: [
      " ",
      /* @__PURE__ */ a("span", { className: Q.count, children: `· ${e.count}` })
    ] })
  ] });
}
function Gc({ links: e }) {
  return /* @__PURE__ */ a(kn, { label: En, className: Q.moreRoot, trigger: { className: Q.more }, children: /* @__PURE__ */ a(Sn, { align: "end", entries: e.map((t) => ({ label: In(t), href: t.href })) }) });
}
function PR({ links: e, active: t, label: n, level: r }) {
  if (e.length > xa) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${xa} — the set is fixed`);
  const l = _(null);
  Rn(l, r);
  const i = Math.max(0, e.findIndex((d) => d.id === t)), s = Tn(l, i, e.map(In).join(`
`), Fc), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ o("nav", { ref: l, className: `${An(r)} ${Q.fits}`, "aria-label": n, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ a(Kc, { link: d, current: d.id === t, place: zc(s, u) }, d.id)),
    /* @__PURE__ */ a("span", { "aria-hidden": "true", "data-more-probe": "", className: `${X.trigger} ${Q.more} ${Q.probe}`, children: En }),
    c.length > 0 && /* @__PURE__ */ a(Gc, { links: c })
  ] });
}
const Uc = "_root_v56ff_3", Vc = "_segment_v56ff_9", La = {
  root: Uc,
  segment: Vc
};
function Mn({ options: e, value: t, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Et({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return C(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ a("div", { className: `${La.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      role: "radio",
      className: La.segment,
      "aria-checked": d.value === t,
      disabled: l,
      "aria-describedby": i,
      onClick: () => n(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const Yc = "_sidebar_s9o1j_3", Jc = "_brand_s9o1j_9", Xc = "_mark_s9o1j_17", Qc = "_word_s9o1j_24", Zc = "_nav_s9o1j_30", ed = "_navItem_s9o1j_39", td = "_footLink_s9o1j_49", ad = "_group_s9o1j_58", nd = "_groupName_s9o1j_65", rd = "_agents_s9o1j_81", ld = "_agent_s9o1j_81", od = "_root_s9o1j_96", id = "_agentTop_s9o1j_105", sd = "_dot_s9o1j_112", cd = "_agentName_s9o1j_124", dd = "_agentMeta_s9o1j_138", ud = "_foot_s9o1j_49", hd = "_footName_s9o1j_150", md = "_footLinks_s9o1j_157", wd = "_linkBrand_s9o1j_184", fd = "_label_s9o1j_205", _d = "_note_s9o1j_210", vd = "_footer_s9o1j_226", x = {
  sidebar: Yc,
  brand: Jc,
  mark: Xc,
  word: Qc,
  nav: Zc,
  navItem: ed,
  new: "_new_s9o1j_48",
  footLink: td,
  group: ad,
  groupName: nd,
  agents: rd,
  agent: ld,
  root: od,
  agentTop: id,
  dot: sd,
  agentName: cd,
  agentMeta: dd,
  foot: ud,
  footName: hd,
  footLinks: md,
  linkBrand: wd,
  label: fd,
  note: _d,
  footer: vd
};
function bd({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ a("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: x.agent,
      href: H(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: x.agentTop, children: [
          /* @__PURE__ */ a(
            "span",
            {
              className: x.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": aa(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ a("span", { className: x.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ a("span", { className: x.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function pd({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ a("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ a("div", { className: x.footLinks, children: e.links.map((t) => /* @__PURE__ */ a("a", { className: `${x.footLink} ward-target`, href: H(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function gd({ brand: e, nav: t, agentsHeading: n, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: x.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: x.brand, children: [
      /* @__PURE__ */ a("span", { className: x.mark }),
      /* @__PURE__ */ a("span", { className: x.word, children: e })
    ] }),
    /* @__PURE__ */ a("div", { className: x.nav, children: t.map((s) => /* @__PURE__ */ a("a", { className: x.navItem, href: H(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: x.group, children: [
      /* @__PURE__ */ o("span", { className: x.groupName, children: [
        n,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ a("a", { className: x.new, href: H(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ a("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ a(bd, { agent: s }, s.href)) }),
    /* @__PURE__ */ a(pd, { shared: i })
  ] });
}
function yd(e) {
  return e.destinations ?? e.items ?? [];
}
function Nd({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("div", { className: x.linkBrand, children: e });
}
function kd({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("div", { className: x.footer, children: e });
}
function $d({ link: e, active: t }) {
  return /* @__PURE__ */ o("a", { href: H(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ a("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ a("span", { className: x.note, children: e.note })
  ] });
}
function Cd(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ a(Nd, { brand: e.brand }),
    /* @__PURE__ */ a("nav", { "aria-label": e.label ?? "Sidebar", children: yd(e).map((t) => /* @__PURE__ */ a($d, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ a(kd, { children: e.children })
  ] });
}
function Sd(e) {
  return "agents" in e;
}
function qR(e) {
  return Sd(e) ? /* @__PURE__ */ a(gd, { ...e }) : /* @__PURE__ */ a(Cd, { ...e });
}
const Rd = "_mark_wlgi8_3", Td = {
  mark: Rd
}, xd = { met: "✓", unmet: "", failed: "✕" };
function ia({ state: e, label: t }) {
  return /* @__PURE__ */ a(
    "span",
    {
      className: Td.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: xd[e]
    }
  );
}
const Ld = "_avatar_1t33a_3", Ad = {
  avatar: Ld
};
function Ct(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function Ed(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), n = t.charAt(0);
  return [Ct(e), ...[...t.slice(1)].map((r) => n + r)];
}
function Id(e, t) {
  const n = Ed(e).find((l) => !t.has(l));
  if (n !== void 0) return n;
  let r = 2;
  for (; t.has(Ct(e).charAt(0) + String(r)); ) r += 1;
  return Ct(e).charAt(0) + String(r);
}
function OR(e) {
  const t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (n.has(r)) continue;
    const l = Id(r, t);
    t.add(l), n.set(r, l);
  }
  return n;
}
function Md(e) {
  return e != null && ct(e) ? Xr(e) : void 0;
}
function jR({ name: e, step: t, size: n = "md", initials: r }) {
  return /* @__PURE__ */ a("span", { className: Ad.avatar, "data-size": n, "aria-hidden": "true", style: Md(t), children: r ?? Ct(e) });
}
const Bd = "_marker_br9fi_2", Pd = {
  marker: Bd
}, qd = {
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
}, Od = { running: " ward-running" };
function He({ size: e, kind: t, label: n }) {
  const r = { "--marker": qd[t], width: e, height: e };
  return /* @__PURE__ */ a(
    "span",
    {
      className: `${Pd.marker} ward-marker ward-marker--${t}${Od[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const jd = "_root_ti0pq_2", Dd = "_chip_ti0pq_11", Hd = "_noCase_ti0pq_23", ft = {
  root: jd,
  chip: Dd,
  noCase: Hd
};
function Fd(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function sa({ connection: e, since: t, lastEventAt: n }) {
  const r = Fd(t, n), l = na(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${ft.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ a(He, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${ft.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ a("span", { className: ft.noCase, children: ta(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${ft.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    he(r)
  ] });
}
const Wd = "_root_yylks_2", zd = "_context_yylks_13", Kd = "_row_yylks_1", Gd = "_heading_yylks_27", Ud = "_headingWrap_yylks_35", Vd = "_meta_yylks_41", Yd = "_chips_yylks_49", Jd = "_title_yylks_56", Xd = "_consequence_yylks_66", Qd = "_actionsWrap_yylks_73", Zd = "_actions_yylks_73", eu = "_action_yylks_73", tu = "_overflowPanel_yylks_102", au = "_measureClip_yylks_113", nu = "_measure_yylks_113", K = {
  root: Wd,
  context: zd,
  row: Kd,
  heading: Gd,
  headingWrap: Ud,
  meta: Vd,
  chips: Yd,
  title: Jd,
  consequence: Xd,
  actionsWrap: Qd,
  actions: Zd,
  action: eu,
  overflowPanel: tu,
  measureClip: au,
  measure: nu
};
function ru({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ a(at, { as: "h1", className: K.title, text: e }) : /* @__PURE__ */ a("h1", { className: K.title, children: e });
}
function lu({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ a("div", { className: K.chips, children: e.map((t) => /* @__PURE__ */ a(m, { ...t }, t.label)) }) : null;
}
function ou({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ a("p", { className: K.consequence, title: t, children: e }) : null;
}
function iu({ chips: e = [], consequence: t, consequenceHint: n }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ o("div", { className: K.meta, children: [
    /* @__PURE__ */ a(lu, { chips: e }),
    /* @__PURE__ */ a(ou, { consequence: t, consequenceHint: n })
  ] });
}
function su({ title: e, chips: t, consequence: n, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: K.heading, children: [
    /* @__PURE__ */ a(ru, { title: e, density: l }),
    /* @__PURE__ */ a(iu, { chips: t, consequence: n, consequenceHint: r })
  ] });
}
function Yt({ actions: e }) {
  return e.map((t, n) => /* @__PURE__ */ a("span", { className: K.action, "data-action": "", children: t }, n));
}
function Aa({ disclosure: e }) {
  return /* @__PURE__ */ a(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function cu({ actions: e, hasMore: t, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ a(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ a(Aa, { disclosure: l }) : t ? [/* @__PURE__ */ a(Aa, { disclosure: l }, "more"), /* @__PURE__ */ a(Yt, { actions: e }, "actions")] : /* @__PURE__ */ a(Yt, { actions: e });
}
function du(e, t, n, r) {
  return n ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function uu({ actions: e, disclosure: t, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ a("div", { id: t.panelId, className: K.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ a(Yt, { actions: e }) });
}
function hu(e, t) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const mu = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function wu(e = [], t, n) {
  const r = e.at(-1);
  return r !== void 0 && mu(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: n !== !1 };
}
function fu({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ a("div", { className: K.context, children: /* @__PURE__ */ a(Qi, { path: e.path, current: e.current }) });
}
function _u(...e) {
  return e.some((t) => t === null);
}
function vu(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function bu(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + vu(e);
}
function pu(e, t, n, r, l) {
  if (l === 0 || _u(t, n, r)) return !1;
  const [i, s, c] = [t, n, r], d = Math.max(0, e.clientWidth - bu(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function gu(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function yu(e) {
  return Lr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Nu(e, t) {
  return t.length === 0 && e.length === 1 && yu(e[0]);
}
function ku(e, t) {
  const n = _(null), r = _(null), l = _(null), i = _(null), [s, c] = p(!1);
  return C(() => {
    const d = n.current;
    if (!gu(d)) return;
    const u = () => c(pu(d, r.current, l.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !t };
}
function $u({ actions: e, hasMore: t, measureRef: n }) {
  return /* @__PURE__ */ a("div", { className: K.measureClip, children: /* @__PURE__ */ o("div", { className: K.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ a("span", { children: /* @__PURE__ */ a(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ a("span", { children: r }, l))
  ] }) });
}
function Cu({ connection: e }) {
  return e ? /* @__PURE__ */ a(sa, { connection: e.connection, since: e.since }) : null;
}
function DR({ crumb: e, crumbCurrent: t, chips: n, title: r, consequence: l, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: y, measureRef: E, collapsed: P } = ku(s, Nu(s, c)), ne = c.length > 0, { disclosure: Ne, close: re } = hu(P || ne, y), Ee = du(c, s, P, u);
  return /* @__PURE__ */ o("header", { className: K.root, "data-density": h, children: [
    /* @__PURE__ */ a(fu, { crumb: wu(e, r, t) }),
    /* @__PURE__ */ o("div", { className: K.row, ref: w, children: [
      /* @__PURE__ */ a("div", { ref: f, className: K.headingWrap, children: /* @__PURE__ */ a(su, { title: r, chips: n, consequence: l, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ o("div", { className: K.actionsWrap, children: [
        /* @__PURE__ */ a(Cu, { connection: d }),
        /* @__PURE__ */ a("div", { className: K.actions, ref: y, "data-ward-actions": !0, children: /* @__PURE__ */ a(cu, { actions: s, hasMore: ne, collapsed: P, onOverflow: u, disclosure: Ne }) })
      ] })
    ] }),
    /* @__PURE__ */ a(uu, { actions: Ee, disclosure: Ne, onEscape: re }),
    /* @__PURE__ */ a($u, { actions: s, hasMore: ne, measureRef: E })
  ] });
}
const Su = "_root_td96x_2", Ru = "_body_td96x_16", Ea = {
  root: Su,
  body: Ru
};
function HR({ variant: e = "info", ticket: t, children: n }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ a("aside", { className: `${Ea.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ a("div", { className: Ea.body, children: n }) });
}
const Tu = "_root_bf1pc_2", xu = "_table_bf1pc_9", Lu = "_caption_bf1pc_14", Au = "_series_bf1pc_23", Eu = "_category_bf1pc_31", Iu = "_cell_bf1pc_39", Mu = "_track_bf1pc_45", Bu = "_lane_bf1pc_52", Pu = "_bar_bf1pc_56", qu = "_value_bf1pc_63", Ou = "_swatch_bf1pc_70", ju = "_empty_bf1pc_78", J = {
  root: Tu,
  table: xu,
  caption: Lu,
  series: Au,
  category: Eu,
  cell: Iu,
  track: Mu,
  lane: Bu,
  bar: Pu,
  value: qu,
  swatch: Ou,
  empty: ju
}, Du = "—", Ia = 6;
function Hu(e, t) {
  if (t.length < 1 || t.length > Ia)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${Ia}`);
  const n = t.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function Fu(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((n) => n ?? 0)));
}
function Bn(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function Wu(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function zu({ value: e, top: t, step: n, format: r, missing: l }) {
  const i = Wu(e, t), s = { "--share": `${i}%` };
  return /* @__PURE__ */ a("td", { className: J.cell, children: /* @__PURE__ */ o("span", { className: J.track, children: [
    /* @__PURE__ */ a("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ a("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ a("span", { className: J.value, children: e === null ? l : r(e) })
  ] }) });
}
function Ku({ series: e }) {
  return /* @__PURE__ */ a(R, { children: e.map((t, n) => /* @__PURE__ */ o("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ a("span", { className: J.swatch, "data-step": Bn(n, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function Gu({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ a("p", { className: J.caption, children: e }),
    /* @__PURE__ */ a("p", { className: J.empty, children: t })
  ] });
}
function Uu({ title: e, categories: t, series: n, top: r, format: l = ae, categoryHead: i = "Category", missing: s = Du }) {
  return /* @__PURE__ */ a("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: J.table, children: [
    /* @__PURE__ */ a("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ a("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ a("th", { scope: "col", className: J.series, children: /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ a(Ku, { series: n })
    ] }) }),
    /* @__PURE__ */ a("tbody", { children: t.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ a("th", { scope: "row", className: J.category, children: c }),
      n.map((u, h) => /* @__PURE__ */ a(zu, { value: u.values[d], top: r, step: Bn(h, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function FR(e) {
  Hu(e.categories, e.series);
  const t = Fu(e.series);
  return t === 0 ? /* @__PURE__ */ a(Gu, { title: e.title, empty: e.empty }) : /* @__PURE__ */ a(Uu, { ...e, top: t });
}
const Vu = "_root_1bfqw_2", Yu = "_figure_1bfqw_7", Ju = "_of_1bfqw_13", Xu = "_bar_1bfqw_18", Qu = "_rows_1bfqw_38", Zu = "_row_1bfqw_38", eh = "_label_1bfqw_49", th = "_amount_1bfqw_54", Ie = {
  root: Vu,
  figure: Yu,
  of: Ju,
  bar: Xu,
  rows: Qu,
  row: Zu,
  label: eh,
  amount: th
};
function ah({ spent: e, ceiling: t, breakdown: n }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Ie.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Ie.figure} ward-stat-value`, children: [
      oe(e),
      " ",
      /* @__PURE__ */ o("span", { className: Ie.of, children: [
        "of ",
        oe(t)
      ] })
    ] }),
    /* @__PURE__ */ a(
      "meter",
      {
        className: `${Ie.bar} ward-costbar`,
        min: 0,
        max: t,
        value: e,
        "aria-valuetext": `${oe(e)} of ${oe(t)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    n && /* @__PURE__ */ a("ul", { className: Ie.rows, children: n.map((l) => /* @__PURE__ */ o("li", { className: `${Ie.row} ward-costrow`, children: [
      /* @__PURE__ */ a("span", { className: Ie.label, children: l.label }),
      /* @__PURE__ */ a("span", { className: Ie.amount, children: oe(l.amount) })
    ] }, l.label)) })
  ] });
}
const nh = "_frame_lmfp9_2", rh = "_table_lmfp9_6", lh = "_th_lmfp9_12", oh = "_td_lmfp9_13", ih = "_sort_lmfp9_48", sh = "_row_lmfp9_60", ch = "_empty_lmfp9_68", qe = {
  frame: nh,
  table: rh,
  th: lh,
  td: oh,
  sort: ih,
  row: sh,
  empty: ch
}, dh = { asc: "ascending", desc: "descending" };
function uh(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return dh[t.direction];
}
function hh(e, t) {
  return e.sortable && t ? /* @__PURE__ */ a("button", { type: "button", className: qe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function mh(e) {
  return e === void 0 ? void 0 : { width: e };
}
function wh({ column: e, sort: t, onSort: n }) {
  return /* @__PURE__ */ a(
    "th",
    {
      scope: "col",
      className: qe.th,
      style: mh(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": uh(e, t),
      children: hh(e, n)
    }
  );
}
function fh({ row: e, props: t }) {
  const n = t.rowId(e), r = (t.lockedIds ?? []).includes(n);
  return /* @__PURE__ */ a(
    "tr",
    {
      className: qe.row,
      "data-selected": n === t.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: t.columns.map((l) => /* @__PURE__ */ a(
        "td",
        {
          className: qe.td,
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
function _h({
  label: e,
  columns: t,
  rows: n,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u,
  narrow: h
}) {
  return n.length === 0 ? /* @__PURE__ */ a("div", { className: qe.empty, children: u }) : /* @__PURE__ */ a("div", { className: qe.frame, "data-narrow": h, children: /* @__PURE__ */ o("table", { className: qe.table, "aria-label": e, children: [
    /* @__PURE__ */ a("thead", { children: /* @__PURE__ */ a("tr", { className: qe.head, children: t.map((w) => /* @__PURE__ */ a(wh, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ a("tbody", { children: n.map((w) => /* @__PURE__ */ a(fh, { row: w, props: { label: e, columns: t, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const vh = "_list_v0s52_2", bh = {
  list: vh
};
function WR({ children: e, label: t }) {
  return /* @__PURE__ */ a("ul", { className: bh.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const ph = "_label_1u62a_2", gh = {
  label: ph
};
function zR({ columns: e }) {
  return /* @__PURE__ */ a("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ a("tr", { children: e.map((t) => /* @__PURE__ */ a("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ a("span", { className: gh.label, children: t.header }) }, t.key)) }) });
}
const yh = "_stack_bp6a0_2", Nh = {
  stack: yh
};
function KR({ children: e }) {
  return /* @__PURE__ */ a("span", { className: Nh.stack, "data-ward-action-stack": "", children: e });
}
const kh = "_set_1z0sq_2", $h = "_legend_1z0sq_7", Ch = "_row_1z0sq_15", Sh = "_control_1z0sq_20", Rh = "_input_1z0sq_26", Th = "_label_1z0sq_31", xh = "_consequence_1z0sq_36", We = {
  set: kh,
  legend: $h,
  row: Ch,
  control: Sh,
  input: Rh,
  label: Th,
  consequence: xh
};
function Pn({ legend: e, options: t, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = N(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: We.set, "data-variant": c, children: [
    /* @__PURE__ */ a("legend", { className: We.legend, children: e }),
    t.map((h) => {
      const w = `${u}-${h.value}`, f = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: We.row, children: [
        /* @__PURE__ */ o("span", { className: We.control, children: [
          /* @__PURE__ */ a(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: We.input,
              value: h.value,
              checked: n === h.value,
              disabled: l,
              "aria-describedby": dt(f, s),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ a("label", { htmlFor: w, className: We.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ a("p", { id: f, className: `${We.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Lh = "_root_11gpw_2", Ah = "_head_11gpw_10", Eh = "_note_11gpw_29", Ih = "_index_11gpw_34", Mh = "_dot_11gpw_38", Bh = "_counter_11gpw_49", Ph = "_trailing_11gpw_57", ze = {
  root: Lh,
  head: Ah,
  note: Eh,
  index: Ih,
  dot: Mh,
  counter: Bh,
  trailing: Ph
};
function qh({ index: e }) {
  return e ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("span", { className: `${ze.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ a("span", { className: ze.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Oh({ counter: e }) {
  return e ? /* @__PURE__ */ a("span", { className: ze.counter, "aria-hidden": "true", children: e }) : null;
}
function Ma({ title: e, index: t, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${ze.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: ze.head, children: [
      /* @__PURE__ */ a(qh, { index: t }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ a("span", { className: ze.note, children: n }),
    /* @__PURE__ */ a(Oh, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ a("span", { className: ze.trailing, children: i })
  ] });
}
const jh = "_strip_c3x3u_2", Dh = "_cell_c3x3u_7", Hh = "_value_c3x3u_12", Fh = "_link_c3x3u_29", Wh = "_label_c3x3u_49", zh = "_tiles_c3x3u_101", De = {
  strip: jh,
  cell: Dh,
  value: Hh,
  link: Fh,
  label: Wh,
  tiles: zh
};
function qn(e, t, [n, r]) {
  if (t.length < n || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${n} to ${r}`);
  if (t.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const On = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Kh({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ a("dd", { className: On(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ a("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function Gh({ cell: e, href: t }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ a("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ a("dd", { className: On(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${De.link} ward-stat-link`, href: H(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ a("span", { children: e.value }),
      /* @__PURE__ */ a("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const jn = (e) => e.href === void 0 ? /* @__PURE__ */ a(Kh, { cell: e }, e.label) : /* @__PURE__ */ a(Gh, { cell: e, href: e.href }, e.label);
function Pt({ cells: e, divided: t = !1 }) {
  return qn("StatStrip", e, [2, 4]), /* @__PURE__ */ a("dl", { className: `${De.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(jn) });
}
const Ba = 6;
function GR({ cells: e }) {
  qn("StatTiles", e, [1, 2 * Ba]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, Ba) };
  return /* @__PURE__ */ a("dl", { className: `${De.tiles} ward-stattiles`, style: t, children: e.map(jn) });
}
const Uh = "_root_1eb1u_2", Vh = "_track_1eb1u_8", Yh = "_thumb_1eb1u_46", Jh = "_labelHidden_1eb1u_64", Xh = "_label_1eb1u_64", Qh = "_lockedNote_1eb1u_84", Ke = {
  root: Uh,
  track: Vh,
  thumb: Yh,
  labelHidden: Jh,
  label: Xh,
  lockedNote: Qh
};
function Zh(e, t, n, r) {
  return { on: n ? !0 : e, off: !!(t || n || r) };
}
function em(e) {
  return e ? `${Ke.label} ${Ke.labelHidden}` : Ke.label;
}
function Ue({ label: e, checked: t, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = Ae(), { on: h, off: w } = Zh(t, r, l, u !== null);
  return /* @__PURE__ */ o("span", { className: `${Ke.root} ward-switchrow`, children: [
    /* @__PURE__ */ a(
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
        className: `${Ke.track} ward-switch`,
        "data-on": h,
        "data-locked": l ? !0 : void 0,
        disabled: w,
        onClick: () => !w && (n == null ? void 0 : n(!h)),
        children: /* @__PURE__ */ a("span", { className: Ke.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: em(s), children: [
      e,
      l && /* @__PURE__ */ a("span", { className: Ke.lockedNote, children: "always on" })
    ] })
  ] });
}
const tm = "_bar_1vp69_2", am = "_skip_1vp69_11", nm = "_mark_1vp69_22", rm = "_nav_1vp69_30", lm = "_list_1vp69_34", om = "_select_1vp69_41", im = "_selectTrigger_1vp69_45", sm = "_dest_1vp69_52", cm = "_actor_1vp69_71", dm = "_actorMark_1vp69_84", um = "_actorLabel_1vp69_89", hm = "_tagline_1vp69_108", se = {
  bar: tm,
  skip: am,
  mark: nm,
  nav: rm,
  list: lm,
  select: om,
  selectTrigger: im,
  dest: sm,
  actor: cm,
  actorMark: dm,
  actorLabel: um,
  tagline: hm
};
function mm(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function wm(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function UR({ wordmark: e = "Trellis", destinations: t, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = wm(r);
  return /* @__PURE__ */ o("header", { className: se.bar, children: [
    /* @__PURE__ */ a("a", { className: `${se.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ a("span", { className: se.mark, children: e }),
    l && /* @__PURE__ */ a("span", { className: se.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: se.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ a("ul", { className: se.list, children: t.map((d) => /* @__PURE__ */ a("li", { children: /* @__PURE__ */ a(
        "a",
        {
          className: `${se.dest} ward-target`,
          href: H(d.href),
          "aria-current": d.id === n ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ a(
        pn,
        {
          className: se.select,
          triggerClassName: se.selectTrigger,
          "aria-label": "Destination",
          value: n,
          options: t.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => i == null ? void 0 : i(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ o("span", { className: se.actor, children: [
      /* @__PURE__ */ a("span", { className: se.actorLabel, children: c }),
      /* @__PURE__ */ a("span", { className: se.actorMark, "aria-hidden": "true", children: mm(c) })
    ] })
  ] });
}
const fm = "_tree_zzoob_2", _m = "_item_zzoob_6", vm = "_row_zzoob_10", bm = "_button_zzoob_22", St = {
  tree: fm,
  item: _m,
  row: vm,
  button: bm
}, Dn = ye(null);
function pm({ label: e, children: t }) {
  const { containerProps: n, itemProps: r } = Et({ orientation: "vertical" });
  return /* @__PURE__ */ a(Dn.Provider, { value: r, children: /* @__PURE__ */ a("ul", { className: St.tree, role: "tree", "aria-label": e, ...n, children: t }) });
}
const gm = { ArrowRight: !0, ArrowLeft: !1 };
function Pa(e) {
  return e ? !0 : void 0;
}
function ym(e, t) {
  const n = gm[e.key];
  !t.leaf && t.onToggle && n !== void 0 && !!t.expanded !== n && t.onToggle();
}
function Nm(e) {
  var t, n;
  e.leaf || (t = e.onToggle) == null || t.call(e), (n = e.onSelect) == null || n.call(e);
}
function km(e) {
  const t = [St.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function $m(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Cm(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Sm(e) {
  return typeof e == "string" ? e : void 0;
}
function Rm({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Tm({ unresolved: e, inherited: t }) {
  const n = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: n });
}
function Hn(e) {
  const t = ge(Dn);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = $m(e);
  return /* @__PURE__ */ o("li", { className: St.item, role: "none", children: [
    /* @__PURE__ */ a(
      "div",
      {
        className: km(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": n,
        "data-depth": e.depth,
        "data-unresolved": Pa(e.unresolved),
        "data-inherited": Pa(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${St.button} ward-treeitem-btn`,
            onClick: () => Nm(e),
            onKeyDown: (r) => ym(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ a("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Cm(e) }),
              /* @__PURE__ */ a("span", { className: "ward-truncate", title: Sm(e.label), children: e.label }),
              /* @__PURE__ */ a(Rm, { value: e.detail }),
              /* @__PURE__ */ a(Tm, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ a("ul", { role: "group", children: e.children }) : null
  ] });
}
const xm = "_frame_10gwd_2", Lm = "_subjectRail_10gwd_22", Am = "_subject_10gwd_22", Em = "_rail_10gwd_42", Im = "_record_10gwd_66", Mm = "_recordBody_10gwd_71", Bm = "_stageGrid_10gwd_120", Pm = "_band_10gwd_134", qm = "_bandBody_10gwd_142", Om = "_bandActions_10gwd_147", jm = "_scroller_10gwd_155", Dm = "_board_10gwd_182", Hm = "_lanes_10gwd_191", Fm = "_cardGrid_10gwd_225", Z = {
  frame: xm,
  subjectRail: Lm,
  subject: Am,
  rail: Em,
  record: Im,
  recordBody: Mm,
  stageGrid: Bm,
  band: Pm,
  bandBody: qm,
  bandActions: Om,
  scroller: jm,
  board: Dm,
  lanes: Hm,
  cardGrid: Fm
};
function VR({ children: e, as: t = "main", inset: n = "page" }) {
  return /* @__PURE__ */ a(t, { className: Z.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function qa(e) {
  return e ? "true" : void 0;
}
function YR({ children: e, rail: t, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Z.subjectRail, "data-ward-subject-rail": n, "data-ruled": qa(i), children: [
    /* @__PURE__ */ a("div", { className: Z.subject, children: e }),
    /* @__PURE__ */ a("aside", { className: Z.rail, "data-sticky": qa(l), "aria-label": r, children: t })
  ] });
}
function JR({ title: e, children: t, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ a("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ a(Ma, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ a(Ma, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ a("div", { className: Z.recordBody, "data-pad": l, "data-measure": c, children: t })
  ] });
}
const Wm = "_form_1j8ub_2", zm = "_fields_1j8ub_9", Km = "_actions_1j8ub_19", Ft = {
  form: Wm,
  fields: zm,
  actions: Km
};
function XR({ label: e, children: t, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ft.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ a("div", { className: Ft.fields, children: t }),
    n == null ? null : /* @__PURE__ */ a("div", { className: Ft.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function QR({ children: e, actions: t, label: n }) {
  return /* @__PURE__ */ o("section", { className: Z.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ a("div", { className: Z.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ a("div", { className: Z.bandActions, children: t })
  ] });
}
const Gm = "(max-width: 767.98px)";
function ca({ label: e, children: t, laneCount: n }) {
  const r = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ a(la, { className: Z.scroller, label: e, count: n ?? Ar.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function Um({ lanes: e, label: t, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Z.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ a(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ a(ca, { label: t, children: i == null ? void 0 : i.content })
  ] });
}
function Vm({ lanes: e, label: t }) {
  return /* @__PURE__ */ a("div", { className: Z.board, "data-ward-board": "", children: /* @__PURE__ */ a(ca, { label: t, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ a(Er, { children: n.content }, n.id)) }) });
}
function ZR({ children: e, label: t = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = it(Gm);
  return n === void 0 ? /* @__PURE__ */ a(ca, { label: t, children: e }) : l ? /* @__PURE__ */ a(Um, { lanes: n, label: t, laneLabel: r }) : /* @__PURE__ */ a(Vm, { lanes: n, label: t });
}
function eT({ columns: e, children: t, label: n = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), i = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ a(la, { className: Z.stageGrid, label: n, count: l, "data-ward-stage-grid": "", "data-floor": r, style: i, children: t });
}
function tT({ children: e, label: t }) {
  return /* @__PURE__ */ a("div", { className: `${Z.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const Ym = "_block_6tv5x_3", Jm = "_sentence_6tv5x_10", Xm = "_meta_6tv5x_19", Qm = "_ways_6tv5x_24", Zm = "_action_6tv5x_38", ew = "_strip_6tv5x_42", tw = "_loading_6tv5x_61", aw = "_label_6tv5x_69", nw = "_counter_6tv5x_76", fe = {
  block: Ym,
  sentence: Jm,
  meta: Xm,
  ways: Qm,
  action: Zm,
  strip: ew,
  loading: tw,
  label: aw,
  counter: nw
};
function rw({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("span", { className: fe.action, children: /* @__PURE__ */ a(b, { onClick: e.onClick, children: e.label }) });
}
function qt({ sentence: e, action: t, children: n, role: r = "status", tone: l, kind: i, ask: s }) {
  return /* @__PURE__ */ o("div", { className: `${fe.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ o("p", { className: fe.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ o(R, { children: [
        " ",
        /* @__PURE__ */ a("strong", { children: s })
      ] })
    ] }),
    n,
    /* @__PURE__ */ a(rw, { action: t })
  ] });
}
function lw(e) {
  return /* @__PURE__ */ a(qt, { ...e, kind: "ward-emptystate" });
}
function aT({ sentence: e, total: t, action: n }) {
  return /* @__PURE__ */ a(qt, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function ow({ ways: e }) {
  return /* @__PURE__ */ a("div", { className: `${fe.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ a(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function nT({ ways: e, ...t }) {
  return /* @__PURE__ */ a(qt, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ a(ow, { ways: e }) });
}
function rT({ sentence: e, at: t, onRetry: n }) {
  return /* @__PURE__ */ a(qt, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function lT({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function oT({ queued: e, since: t }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function iT({ label: e, startedAt: t }) {
  const n = _(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  C(() => {
    const s = window.setTimeout(() => l(!0), ve.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = na(n.current, r);
  return /* @__PURE__ */ o("div", { className: `${fe.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ a("span", { className: fe.label, children: e }),
    r ? /* @__PURE__ */ a("span", { className: fe.counter, children: ta(i) }) : null
  ] });
}
const iw = "_note_cigdt_2", sw = {
  note: iw
};
function cw({ label: e, count: t, cap: n }) {
  return /* @__PURE__ */ o("p", { className: sw.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    n
  ] });
}
const dw = "_card_k7btg_3", uw = "_hit_k7btg_31", hw = "_head_k7btg_44", mw = "_title_k7btg_51", ww = "_meta_k7btg_57", fw = "_since_k7btg_66", _w = "_sep_k7btg_76", vw = "_fields_k7btg_80", bw = "_field_k7btg_80", pw = "_last_k7btg_98", gw = "_reason_k7btg_110", de = {
  card: dw,
  hit: uw,
  head: hw,
  title: mw,
  meta: ww,
  since: fw,
  sep: _w,
  fields: vw,
  field: bw,
  last: pw,
  reason: gw
}, yw = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Nw(e, t, n) {
  const r = bt(e, "blue"), l = bt(e, "orange"), i = bt(e, "green"), s = _(/* @__PURE__ */ new Set());
  C(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = yw[d.type];
      u && c[u]();
    });
  }, [r, n, i, t, l]);
}
const kw = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : oe(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function $w(e, t) {
  return kw[t](e);
}
function Cw({ item: e, connection: t }) {
  const n = /* @__PURE__ */ a("span", { className: de.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ o("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    n,
    /* @__PURE__ */ a(Le, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.waitsOn,
    n,
    /* @__PURE__ */ o("span", { className: de.since, children: [
      ue(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Sw({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ a(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ a(m, { role: t.role, label: t.label })
  ] });
}
function Rw({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Tw({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ a("p", { className: de.fields, children: t.map((n) => /* @__PURE__ */ a("span", { className: de.field, children: $w(e, n) }, n)) });
}
const Jt = (e) => e ? !0 : void 0;
function xw(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function Lw(e, t, n) {
  e == null || e(t, n);
}
function Aw(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Ew({ item: e, stale: t }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ a("p", { className: de.last, "data-stale": Jt(t), children: n }) : null;
}
function Ot(e) {
  const t = e.fields ?? [], n = e.item, r = _(null);
  Nw(r, n.key, e.feed);
  const l = Aw(e.feed), i = xw(n);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": n.key,
      className: de.card,
      style: i,
      "data-selected": Jt(e.selected),
      "data-flagged": Jt(n.flagged),
      children: [
        /* @__PURE__ */ a("button", { type: "button", className: de.hit, onClick: (s) => Lw(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ a(Sw, { item: n }),
        /* @__PURE__ */ a(at, { as: "p", className: de.title, text: n.title }),
        /* @__PURE__ */ a(Cw, { item: n, connection: l }),
        /* @__PURE__ */ a(Rw, { reason: n.blockedReason }),
        /* @__PURE__ */ a(Tw, { item: n, fields: t }),
        /* @__PURE__ */ a(Ew, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const Iw = "_column_1j8bi_3", Mw = "_head_1j8bi_21", Bw = "_label_1j8bi_30", Pw = "_count_1j8bi_39", qw = "_list_1j8bi_53", lt = {
  column: Iw,
  head: Mw,
  label: Bw,
  count: Pw,
  list: qw
};
function Fn(e, t) {
  return [...e].sort((n, r) => t === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function Ow({ column: e, count: t, id: n }) {
  return /* @__PURE__ */ o("div", { className: lt.head, children: [
    /* @__PURE__ */ a("h2", { className: lt.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ a(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: lt.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function jw(e) {
  return /* @__PURE__ */ a("div", { className: lt.list, role: "list", children: e.rows.map((t, n) => {
    var r;
    return /* @__PURE__ */ a(
      Ot,
      {
        item: t,
        fields: e.fields,
        onOpen: e.onOpen,
        selected: t.key === e.selectedKey,
        feed: e.feed,
        rovingProps: (r = e.roving) == null ? void 0 : r.itemProps(e.roving.base + n),
        inList: !0
      },
      t.key
    );
  }) });
}
function Dw({ column: e, items: t, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), h = e.cap !== void 0 && t.length > e.cap, w = Fn(t, r);
  return /* @__PURE__ */ o("section", { className: lt.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ a(Ow, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ a(jw, { column: e, items: t, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ a(cw, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const Hw = "_foot_cs4jr_2", Fw = "_note_cs4jr_13", Ww = "_link_cs4jr_19", Wt = {
  foot: Hw,
  note: Fw,
  link: Ww
};
function sT({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Wt.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ a("p", { className: Wt.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ a("a", { className: `${Wt.link} ward-target`, href: H(e), children: "Configure board" })
  ] });
}
const zw = "_head_1tfi5_3", Kw = "_identity_1tfi5_12", Gw = "_titleRow_1tfi5_18", Uw = "_title_1tfi5_18", Vw = "_key_1tfi5_35", Yw = "_rollup_1tfi5_45", Jw = "_tools_1tfi5_53", Xw = "_swatch_1tfi5_101", Qw = "_mark_1tfi5_108", Se = {
  head: zw,
  identity: Kw,
  titleRow: Gw,
  title: Uw,
  key: Vw,
  rollup: Yw,
  tools: Jw,
  swatch: Xw,
  mark: Qw
}, Oa = "initials:";
function Zw(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function ef(e) {
  const t = [Zw(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function tf(e) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    ef(e)
  ] });
}
function af(e) {
  return e.startsWith(Oa) ? e.slice(Oa.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function nf({ markRef: e, streamStep: t }) {
  const n = { "--stream": pe(t, "id") };
  return e ? /* @__PURE__ */ a("span", { className: `${Se.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: af(e) }) : /* @__PURE__ */ a("span", { className: Se.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function rf({ owners: e, owner: t, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ a(M, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: n, options: e });
}
function cT({
  stream: e,
  rollups: t,
  connection: n,
  lastEventAt: r,
  owners: l,
  owner: i,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ o("div", { className: Se.head, children: [
    /* @__PURE__ */ o("div", { className: Se.identity, children: [
      /* @__PURE__ */ o("div", { className: Se.titleRow, children: [
        /* @__PURE__ */ a(nf, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ a("h1", { className: Se.title, children: e.name }),
        /* @__PURE__ */ a("span", { className: Se.key, children: e.key })
      ] }),
      /* @__PURE__ */ a("p", { className: Se.rollup, "aria-live": "polite", children: tf(t) })
    ] }),
    /* @__PURE__ */ o("div", { className: Se.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ a(rf, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ a(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ a(sa, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const lf = "_head_1sejb_14", of = "_line_1sejb_15", sf = "_cHandle_1sejb_36", cf = "_cName_1sejb_41", df = "_nameLine_1sejb_49", uf = "_cLabel_1sejb_56", hf = "_cCap_1sejb_61", mf = "_cShown_1sejb_66", wf = "_name_1sejb_49", ff = "_noCap_1sejb_88", _f = "_state_1sejb_102", vf = "_handle_1sejb_111", bf = "_sub_1sejb_137", B = {
  head: lf,
  line: of,
  cHandle: sf,
  cName: cf,
  nameLine: df,
  cLabel: uf,
  cCap: hf,
  cShown: mf,
  name: wf,
  noCap: ff,
  state: _f,
  handle: vf,
  sub: bf
}, pf = "can't be hidden or collapsed", gf = "terminal · counted, not a column";
function dT() {
  return /* @__PURE__ */ o("div", { className: B.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ a("span", { className: B.cHandle }),
    /* @__PURE__ */ a("span", { className: B.cName, children: "Stage" }),
    /* @__PURE__ */ a("span", { className: B.cLabel, children: "Column label" }),
    /* @__PURE__ */ a("span", { className: B.cCap, children: "WIP cap" }),
    /* @__PURE__ */ a("span", { className: B.cShown, children: "Shown" })
  ] });
}
function yf(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function Nf(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function ja(e) {
  return e.gate ? pf : e.terminal ? gf : Nf(e.agentsMounted);
}
function kf(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function $f({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: B.cName, children: [
    /* @__PURE__ */ o("span", { className: B.nameLine, children: [
      /* @__PURE__ */ a("span", { className: B.name, children: e.name }),
      e.gate && /* @__PURE__ */ a(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    ja(e) && /* @__PURE__ */ a("span", { className: B.sub, children: ja(e) })
  ] });
}
function Cf(e) {
  return e === void 0 ? "" : String(e);
}
function Sf(e) {
  return e === "" ? void 0 : Number(e);
}
function Rf({ name: e, onReorder: t }) {
  const n = Ae();
  return (n == null ? void 0 : n.actions) === "hide" ? /* @__PURE__ */ a("span", { className: B.cHandle }) : /* @__PURE__ */ a("span", { className: B.cHandle, children: /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: B.handle,
      "aria-label": `Reorder ${e}`,
      disabled: n !== null,
      title: n == null ? void 0 : n.reason,
      "aria-describedby": n == null ? void 0 : n.reasonId,
      onKeyDown: (r) => !n && kf(r, t),
      children: "⠿"
    }
  ) });
}
function Tf({ stage: e, config: t, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ a("span", { className: `${B.cCap} ${B.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ a("span", { className: B.cCap, children: /* @__PURE__ */ a(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Cf(t.cap), onChange: (r) => n({ ...t, cap: Sf(r) }) }) });
}
function xf({ stage: e, config: t, onChange: n }) {
  const r = Ae() !== null, l = yf(e, t.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...t, shown: c });
  return /* @__PURE__ */ o("span", { className: B.cShown, children: [
    /* @__PURE__ */ a(Ue, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ a("span", { className: B.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function Lf(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function uT({ stage: e, config: t, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: B.line, "data-kind": Lf(e), children: [
    /* @__PURE__ */ a(Rf, { name: e.name, onReorder: r }),
    /* @__PURE__ */ a($f, { stage: e }),
    /* @__PURE__ */ a("span", { className: B.cLabel, children: /* @__PURE__ */ a(M, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (l) => n({ ...t, label: l }) }) }),
    /* @__PURE__ */ a(Tf, { stage: e, config: t, onChange: n }),
    /* @__PURE__ */ a(xf, { stage: e, config: t, onChange: n })
  ] });
}
const Af = "_body_8qsv9_2", Ef = "_head_8qsv9_9", If = "_summary_8qsv9_19", Mf = "_block_8qsv9_20", Bf = "_actionsBlock_8qsv9_21", Pf = "_title_8qsv9_41", qf = "_note_8qsv9_46", Of = "_k_8qsv9_51", jf = "_kv_8qsv9_58", Df = "_row_8qsv9_64", Hf = "_label_8qsv9_75", Ff = "_value_8qsv9_84", Wf = "_quote_8qsv9_90", zf = "_actions_8qsv9_21", Kf = "_resolve_8qsv9_111", O = {
  body: Af,
  head: Ef,
  summary: If,
  block: Mf,
  actionsBlock: Bf,
  title: Pf,
  note: qf,
  k: Of,
  kv: jf,
  row: Df,
  label: Hf,
  value: Ff,
  quote: Wf,
  actions: zf,
  resolve: Kf
};
function Gf(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Uf(e, t) {
  if (!e.run) return [];
  const n = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ a(Le, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Vf(e) {
  const t = ht(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function Yf(e) {
  return (e ?? []).map((t, n) => [t.label, t.value, `fact-${n}`]);
}
function Jf(e, t, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ a(m, { ...Bt(Vf(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Gf(e),
    ...Yf(n),
    ...Uf(e, t)
  ];
}
function Xf({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: O.resolve, "aria-label": t, children: [
    /* @__PURE__ */ a("h3", { className: O.k, children: t }),
    e
  ] });
}
function Qf(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function Zf({ item: e, showKey: t }) {
  const n = Qf(e);
  return !t && !n ? null : /* @__PURE__ */ o("div", { className: O.head, children: [
    t && /* @__PURE__ */ a(m, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ a(m, { role: n.role, label: n.label })
  ] });
}
function e_({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: O.block, children: [
    /* @__PURE__ */ a("p", { className: O.k, children: "What the agent says" }),
    /* @__PURE__ */ a("p", { className: O.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ a("p", { className: O.note, children: e.agentMeta })
  ] }) : null;
}
function hT({ item: e, actions: t, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = N(), w = Jf(e, l, d);
  return /* @__PURE__ */ a(nt, { kind: "drawer", labelledBy: h, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: O.body, children: [
    /* @__PURE__ */ a(Zf, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: O.summary, children: [
      /* @__PURE__ */ a("h2", { className: O.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ a("p", { className: O.note, children: e.summary })
    ] }),
    /* @__PURE__ */ a("dl", { className: O.kv, children: w.map(([f, y, E]) => /* @__PURE__ */ o("div", { className: O.row, children: [
      /* @__PURE__ */ a("dt", { className: O.label, children: f }),
      /* @__PURE__ */ a("dd", { className: O.value, children: y })
    ] }, E ?? f)) }),
    /* @__PURE__ */ a(e_, { item: e }),
    /* @__PURE__ */ o("div", { className: O.actionsBlock, children: [
      /* @__PURE__ */ a("div", { className: O.actions, children: t }),
      c && /* @__PURE__ */ a("p", { className: O.note, children: c })
    ] }),
    /* @__PURE__ */ a(Xf, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const t_ = "_root_3azmy_2", a_ = "_list_3azmy_7", n_ = "_item_3azmy_12", r_ = "_box_3azmy_18", l_ = "_text_3azmy_23", o_ = "_note_3azmy_28", Ye = {
  root: t_,
  list: a_,
  item: n_,
  box: r_,
  text: l_,
  note: o_
};
function jt({ items: e, note: t, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ye.root, "data-density": n, children: [
    /* @__PURE__ */ a("ul", { className: `${Ye.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ye.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ a("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ye.box, children: /* @__PURE__ */ a(ia, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ a("span", { className: Ye.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ a("p", { className: `${Ye.note} ward-checklist-note`, children: t })
  ] });
}
const i_ = "_rail_znbbp_2", s_ = "_k_znbbp_11", c_ = "_head_znbbp_19", d_ = "_section_znbbp_25", u_ = "_card_znbbp_39", h_ = "_strip_znbbp_46", m_ = "_skeleton_znbbp_60", w_ = "_skeletonLabel_znbbp_74", f_ = "_bar_znbbp_80", __ = "_note_znbbp_89", we = {
  rail: i_,
  k: s_,
  head: c_,
  section: d_,
  card: u_,
  strip: h_,
  skeleton: m_,
  skeletonLabel: w_,
  bar: f_,
  note: __
};
function v_(e) {
  return (t) => e == null ? void 0 : e(t);
}
function zt({ title: e, children: t }) {
  return /* @__PURE__ */ o("section", { className: we.section, "aria-label": e, children: [
    /* @__PURE__ */ a("h3", { className: we.k, children: e }),
    t
  ] });
}
function b_({ column: e, count: t }) {
  return /* @__PURE__ */ o("div", { className: we.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ a("span", { className: we.skeletonLabel, children: e.label }),
    /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (n, r) => /* @__PURE__ */ a("span", { className: we.bar, "aria-hidden": "true" }, r))
  ] });
}
function p_({ draft: e, sample: t, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ a(Dw, { column: l, items: t.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function g_(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ a(p_, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ a(b_, { column: t, count: e.sample.filter((n) => n.stage === t.id).length }, t.id));
}
function mT(e) {
  const t = v_(e.onOpen), n = Fn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: we.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ a("h2", { className: `${we.k} ${we.head}`, children: "Live preview" }),
    /* @__PURE__ */ a(zt, { title: "Card", children: /* @__PURE__ */ a("div", { className: we.card, children: n && /* @__PURE__ */ a(Ot, { item: n, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ o(zt, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ a("div", { className: we.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ a(g_, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ a("p", { className: we.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ a(zt, { title: "Effect of this config", children: /* @__PURE__ */ a(jt, { items: e.effects, density: "compact" }) })
  ] });
}
function y_(e, t) {
  return (n) => {
    e.current = n, t(n);
  };
}
function N_(e) {
  return Math.ceil(e.length / 2);
}
function k_(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Wn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function $_(e, t, n, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const l = Wn(e);
  l !== void 0 && n(l), r(k_(e.type));
}
function C_(e, t, n, r, l) {
  C(() => {
    if (e !== null)
      return e.subscribe(t, (i) => $_(i, n, r, l));
  }, [e, t, n, r, l]);
}
function S_(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function R_(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function T_(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function x_(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + z.height.card + " + " + z.height.cardRow + " * " + String(N_(t ?? [])) + ")"
  };
}
function L_(e, t) {
  return /* @__PURE__ */ a("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function A_(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ a(m, { role: "meta", label: oe(e.cost) }) : null;
}
function E_(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ a(m, { role: "meta", label: e.jiraKey }) : null;
}
function I_(e, t, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ a(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: n ?? "live", turn: e.turn });
}
function M_(e, t, n) {
  return t === void 0 ? e.finding ?? "" : n ?? "";
}
function B_(e, t) {
  return t === void 0 ? e : y_(e, t.ref);
}
function P_(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function st(e) {
  return e === !0 ? "true" : void 0;
}
function zn(e) {
  const t = e.item, n = t.run, r = n !== void 0, l = _(null), i = bt(l), s = _(/* @__PURE__ */ new Set()), [c, d] = p(S_(t));
  C_(e.feed, t.key, s, d, i);
  const u = R_(t, r), h = T_(t, n), w = x_(t, e.fields), f = M_(t, n, c);
  return /* @__PURE__ */ a("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...P_(e),
      className: "ward-workcard",
      "data-flagged": st(t.flagged),
      "data-selected": st(e.selected),
      style: w,
      ref: B_(l, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        L_(t, e.fields),
        /* @__PURE__ */ a("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ a(m, { role: u.role, label: u.label }),
          A_(t, e.fields),
          E_(t, e.fields)
        ] }),
        /* @__PURE__ */ a("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          I_(n, c, e.connection, t.changedAt),
          f !== "" ? /* @__PURE__ */ a("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function q_({ count: e, cap: t }) {
  return /* @__PURE__ */ a("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function O_(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function j_(e, t, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ a("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ a(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ a(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function D_(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ a(q_, { count: e.items.length, cap: e.column.cap });
}
function H_(e, t) {
  return e.roving ?? t;
}
function F_(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function W_(e, t) {
  return e.items.map((n, r) => /* @__PURE__ */ a(
    zn,
    {
      item: n,
      fields: e.fields,
      onOpen: e.onOpen,
      selected: n.key === e.selectedKey,
      feed: e.feed,
      connection: e.connection,
      rovingItem: t.itemProps(r)
    },
    n.key
  ));
}
function z_(e) {
  const t = N(), n = Et({ orientation: "vertical" }), r = H_(e, n), l = O_(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": st(l), "data-gate": st(e.column.gate), children: [
    j_(e.column, e.items.length, t),
    D_(e, l),
    /* @__PURE__ */ a("ul", { role: "list", className: "ward-boardcol-list", ...F_(e, n), children: W_(e, r) })
  ] });
}
function K_(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function G_(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ a(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function U_(e) {
  return e === void 0 ? null : /* @__PURE__ */ a(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function wT(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ a(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ a(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ a("div", { className: "ward-rollup", "aria-live": "polite", children: K_(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      G_(e),
      U_(e.onConfigure),
      /* @__PURE__ */ a(sa, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function V_(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Y_(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ a(Ue, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ a(Ue, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function J_(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(R, { children: [
    t > 0 ? /* @__PURE__ */ a(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ a(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function fT(e) {
  const t = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": st(V_(t)), children: [
    /* @__PURE__ */ a("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ a("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ a("span", { children: Y_(e) }),
    /* @__PURE__ */ a(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ a(un, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    J_(t),
    /* @__PURE__ */ a("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ a("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function _T(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ a(zn, { item: t, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ a(z_, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ a("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ a("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ a("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function X_(e, t) {
  const n = Wn(e);
  n !== void 0 && t(n);
}
function Q_(e, t, n) {
  C(() => {
    if (e != null)
      return e.subscribe(t, (r) => X_(r, n));
  }, [e, t, n]);
}
function Z_(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function ev(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", oe(e.cost)]), t;
}
function tv(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ a("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ a(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function av(e, t) {
  return /* @__PURE__ */ o(R, { children: [
    e.state !== void 0 ? /* @__PURE__ */ a(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ a("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ a("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function vT(e) {
  var s;
  const t = e.item, n = t.run, [r, l] = p((s = t.run) == null ? void 0 : s.lastStep);
  Q_(e.feed, t.key, l);
  const i = [...Z_(t), ...ev(t)];
  return /* @__PURE__ */ o(nt, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ a("dt", { children: c[0] }),
        /* @__PURE__ */ a("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      tv(n, r)
    ] }),
    av(t, e.actions)
  ] });
}
const nv = "_card_1nkkx_3", rv = "_head_1nkkx_30", lv = "_mark_1nkkx_38", ov = "_name_1nkkx_50", iv = "_chips_1nkkx_71", sv = "_description_1nkkx_77", cv = "_run_1nkkx_82", dv = "_sep_1nkkx_91", uv = "_facts_1nkkx_97", hv = "_fact_1nkkx_97", mv = "_factLabel_1nkkx_111", wv = "_factValue_1nkkx_115", ie = {
  card: nv,
  head: rv,
  mark: lv,
  name: ov,
  chips: iv,
  description: sv,
  run: cv,
  sep: dv,
  facts: uv,
  fact: hv,
  factLabel: mv,
  factValue: wv
}, fv = { live: "done", draft: "running", paused: "meta" };
function _v(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function vv({ versions: e }) {
  return /* @__PURE__ */ a("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ a(m, { role: fv[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function bv({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("p", { className: ie.description, children: e });
}
function pv({ run: e, connection: t, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ a("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ a(Le, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function gv({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ a("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ o("div", { className: ie.fact, children: [
    /* @__PURE__ */ a("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ a("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function yv(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Nv({ agent: e, href: t, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: _v(s),
      style: c,
      "data-selected": d,
      "data-paused": yv(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: ie.head, children: [
          /* @__PURE__ */ a("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ a("a", { className: `${ie.name} ward-rowlink ward-target`, href: H(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ a(bv, { description: e.description }),
        /* @__PURE__ */ a(pv, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ a(vv, { versions: e.versions }),
        /* @__PURE__ */ a(gv, { facts: i })
      ]
    }
  );
}
const kv = "_list_4dcyc_2", $v = "_row_4dcyc_11", Cv = "_head_4dcyc_23", Sv = "_id_4dcyc_30", Rv = "_lock_4dcyc_35", Tv = "_reason_4dcyc_41", xv = "_remove_4dcyc_46", Lv = "_clauses_4dcyc_50", Av = "_clause_4dcyc_50", Ev = "_label_4dcyc_64", Iv = "_cell_4dcyc_71", Mv = "_value_4dcyc_76", ce = {
  list: kv,
  row: $v,
  head: Cv,
  id: Sv,
  lock: Rv,
  reason: Tv,
  remove: xv,
  clauses: Lv,
  clause: Av,
  label: Ev,
  cell: Iv,
  value: Mv
}, Kn = ye(!1);
function bT({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ a(Kn.Provider, { value: !0, children: /* @__PURE__ */ a("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function Bv({ clause: e, ruleId: t, onChange: n }) {
  if (!n) return /* @__PURE__ */ a("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ a(M, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function Pv({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ce.lock, children: [
    /* @__PURE__ */ a(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ a("span", { className: ce.reason, children: e })
  ] });
}
function qv({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ o("span", { className: ce.head, children: [
    /* @__PURE__ */ a("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ a(Pv, { reason: e.lockedReason }),
    t && /* @__PURE__ */ a("span", { className: ce.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Da(e, t) {
  return e.locked ? void 0 : t;
}
function pT({ rule: e, onChange: t, onRemove: n }) {
  if (!ge(Kn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Da(e, t);
  return /* @__PURE__ */ o("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ a(qv, { rule: e, onRemove: Da(e, n) }),
    /* @__PURE__ */ a("dl", { className: ce.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ce.clause, children: [
      /* @__PURE__ */ a("dt", { className: ce.label, children: l.label }),
      /* @__PURE__ */ a("dd", { className: ce.cell, children: /* @__PURE__ */ a(Bv, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Ov = "_ladder_1xdeh_2", jv = "_cell_1xdeh_7", Dv = "_empty_1xdeh_26", Hv = "_name_1xdeh_34", Fv = "_holder_1xdeh_40", Wv = "_request_1xdeh_46", zv = "_swatches_1xdeh_51", Kv = "_swatch_1xdeh_51", Gv = "_tilesFrame_1xdeh_78", Uv = "_tiles_1xdeh_78", Vv = "_tile_1xdeh_78", Yv = "_bar_1xdeh_117", Jv = "_hex_1xdeh_128", Xv = "_note_1xdeh_138", A = {
  ladder: Ov,
  cell: jv,
  empty: Dv,
  name: Hv,
  holder: Fv,
  request: Wv,
  swatches: zv,
  swatch: Kv,
  tilesFrame: Gv,
  tiles: Uv,
  tile: Vv,
  bar: Yv,
  hex: Jv,
  note: Xv
}, gT = "not validated yet, pending a CVD matrix and dark stepping";
function Qv(e) {
  return e.reserved ? "reserved" : ct(e.step) ? "validated" : "partial";
}
function Gn(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Zv(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function eb({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ a(He, { size: 14, kind: "stream" }) : /* @__PURE__ */ a("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function tb(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function ab(e, t, n) {
  return {
    "aria-checked": t,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Ha = (e) => String(e).padStart(2, "0");
function nb(e, t, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : t ?? Gn(e, void 0);
}
function rb({ step: e, validation: t, note: n }) {
  const r = t === "reserved";
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ a("span", { className: `${A.hex} ward-ladder-hex`, children: r ? `step ${Ha(e)}` : Zr(e) }),
    /* @__PURE__ */ a("span", { className: `${A.note} ward-ladder-note`, children: r ? n : `Step ${Ha(e)} · ${n}` })
  ] });
}
function lb({ step: e, value: t, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = Qv(e), c = Gn(s, n), d = c !== "free", u = d || i, h = t === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, y = `${w} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...ab(d, h, u), "data-validation": s, style: Zv(e, s), onClick: f, onKeyDown: (P) => tb(P, f) }, label: y, name: w, holder: c, validation: s, note: nb(s, n, h), step: e.step };
}
const ob = {
  swatches: (e) => /* @__PURE__ */ a("span", { ...e.shared, title: e.label, className: `${A.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ a("span", { ...e.shared, className: `${A.tile} ward-ladder-cell`, children: /* @__PURE__ */ a(rb, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${A.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ a(eb, { validation: e.validation }),
    /* @__PURE__ */ a("span", { className: `${A.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ a("span", { className: `${A.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function ib(e) {
  return ob[e.presentation](lb(e));
}
function sb(e) {
  for (const t of e)
    if (!t.reserved && !It(t.step)) throw new Error("colour ladder renders token steps only");
}
function cb() {
  return /* @__PURE__ */ o("div", { className: `${A.cell} ward-ladder-cell ${A.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ a("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ a("span", { className: `${A.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ a("span", { className: `${A.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function db(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const ub = { list: A.ladder, swatches: A.swatches, tiles: A.tilesFrame };
function hb() {
  return /* @__PURE__ */ o("div", { className: `${A.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ a("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ a("span", { className: `${A.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ a("span", { className: `${A.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const mb = { list: cb, swatches: () => null, tiles: hb };
function wb(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Un(e) {
  const t = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  sb(e.steps);
  const r = db(e), l = mb[r], i = /* @__PURE__ */ o(R, { children: [
    e.steps.map((s) => /* @__PURE__ */ a(ib, { step: s, value: e.value, taken: t[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ a(l, {})
  ] });
  return /* @__PURE__ */ a("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...wb(e.disabled === !0), className: `${ub[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ a("div", { className: A.tiles, children: i }) : i });
}
const fb = "_rail_s06lm_2", _b = "_section_s06lm_12", vb = "_sectionFlush_s06lm_22", bb = "_head_s06lm_26", pb = "_headLabel_s06lm_34", gb = "_sample_s06lm_42", yb = "_sampleLabel_s06lm_47", Nb = "_sampleTitle_s06lm_54", kb = "_sampleMeta_s06lm_59", $b = "_trace_s06lm_65", Cb = "_traceHead_s06lm_70", Sb = "_steps_s06lm_78", Rb = "_step_s06lm_78", Tb = "_stepTitle_s06lm_97", xb = "_hollow_s06lm_107", Lb = "_stepBody_s06lm_115", Ab = "_stepDetail_s06lm_127", Eb = "_publish_s06lm_132", Ib = "_reason_s06lm_138", Mb = "_note_s06lm_143", Bb = "_reveal_s06lm_148", k = {
  rail: fb,
  section: _b,
  sectionFlush: vb,
  head: bb,
  headLabel: pb,
  sample: gb,
  sampleLabel: yb,
  sampleTitle: Nb,
  sampleMeta: kb,
  trace: $b,
  traceHead: Cb,
  steps: Sb,
  step: Rb,
  stepTitle: Tb,
  hollow: xb,
  stepBody: Lb,
  stepDetail: Ab,
  publish: Eb,
  reason: Ib,
  note: Mb,
  reveal: Bb
}, Fa = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Pb = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, qb = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Ob = { notSimulated: "not simulated", running: "running" };
function jb(e) {
  return e.presentation === "foundry";
}
function Db(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = t.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${t.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Hb(e, t) {
  var r;
  const n = Pb[e.status];
  return n !== void 0 ? n : ((r = t.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Fb(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Wb(e, t) {
  if (t.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function zb(e) {
  if (Fb(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Kb(e) {
  const [t, n] = p(!1);
  C(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ a("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Gb(e) {
  const t = Ob[e.kind];
  return t !== void 0 ? /* @__PURE__ */ a("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ a(He, { size: 6, kind: qb[e.kind], label: e.kind });
}
function Ub(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Vb(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ a(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Yb(e) {
  const { step: t } = e;
  return /* @__PURE__ */ o(Kb, { kind: t.kind, children: [
    /* @__PURE__ */ a(Gb, { kind: t.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ a("span", { className: k.stepTitle, children: t.title }),
      /* @__PURE__ */ a(Ub, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ a(Vb, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function Jb(e, t) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && n.push(ue(t)), n.join(" · ");
}
function Vn(e) {
  const t = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ a("p", { className: k.traceHead, id: t, children: Jb(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ a("ol", { className: k.steps, "aria-labelledby": t, children: e.steps.map((n, r) => /* @__PURE__ */ a(Yb, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function Xb(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ o("div", { className: `${k.sample} ${k.section}`, children: [
    /* @__PURE__ */ a("p", { className: k.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ o("p", { className: k.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ o("p", { className: k.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function Qb(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ a("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function Zb(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : oe(e.run.cost), label: "Cost" }, { value: e.run.turns ? en(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ a("div", { className: k.sectionFlush, children: /* @__PURE__ */ a(Pt, { divided: !0, cells: t }) });
}
function ep(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: oe(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: en(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function tp(e) {
  const t = ep(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ a("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ a("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ a("div", { className: k.sectionFlush, children: /* @__PURE__ */ a(Pt, { divided: !0, cells: t }) });
}
function Yn(e) {
  const t = N();
  return e.reason !== null ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("p", { className: `${k.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ a(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ a(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function ap(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ a(Yn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ a("p", { className: k.note, children: e.note })
  ] });
}
function np(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ a("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ a(Yn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Jn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ a("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ a(m, { role: Fa[e.run.status].role, label: Fa[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ a(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function rp(e, t) {
  const [n, r] = p(e.steps);
  return C(() => r(e.steps), [e.steps]), C(() => {
    if (!((t == null ? void 0 : t.subscribe) === void 0 || e.status !== "running"))
      return t.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [t, e.status]), n;
}
function lp(e) {
  var n;
  Wb(e.run, e.checklist);
  const t = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ a(Jn, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ a(Xb, { sample: e.run.sample }),
    /* @__PURE__ */ a(Vn, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ a(Zb, { run: e.run }),
    /* @__PURE__ */ a("div", { className: k.section, children: /* @__PURE__ */ a(jt, { items: e.checklist }) }),
    /* @__PURE__ */ a(ap, { reason: Db(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function op(e) {
  var r;
  const t = rp(e.run, e.feed);
  zb(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ a(Jn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ a(Qb, { sample: e.run.sample }),
    /* @__PURE__ */ a(Vn, { run: e.run, steps: t, connection: n, foundry: !0 }),
    /* @__PURE__ */ a(tp, { run: e.run }),
    /* @__PURE__ */ a("div", { className: k.section, children: /* @__PURE__ */ a(jt, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ a(np, { reason: Hb(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function yT(e) {
  return jb(e) ? /* @__PURE__ */ a(op, { ...e }) : /* @__PURE__ */ a(lp, { ...e });
}
const ip = "_list_142ip_3", sp = "_row_142ip_9", cp = "_condition_142ip_18", dp = "_action_142ip_24", gt = {
  list: ip,
  row: sp,
  condition: cp,
  action: dp
}, Xn = ye(!1);
function NT({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ a(Xn.Provider, { value: !0, children: /* @__PURE__ */ a("ol", { className: gt.list, "aria-label": t, children: e }) });
}
function kT({ rule: e }) {
  if (!ge(Xn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: gt.row, children: [
    /* @__PURE__ */ a(m, { role: "system", label: "When" }),
    /* @__PURE__ */ a("span", { className: gt.condition, children: e.when }),
    /* @__PURE__ */ a(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ a("span", { className: gt.action, children: e.then })
  ] });
}
const up = "_move_tmppt_3", hp = {
  move: up
};
function Xt(e, t, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(t, 1);
  return r.splice(n, 0, l), r;
}
function Qn(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function Zn(e, t, n) {
  return `${e} moved to position ${t + 1} of ${n}.`;
}
function Wa(e, t, n) {
  return e.querySelector(`[data-move="${t}-${n}"]`);
}
function mp(e) {
  return e === "up" ? "down" : "up";
}
function wp(e, t) {
  const n = Wa(e, t.id, t.direction) ?? Wa(e, t.id, mp(t.direction));
  n == null || n.focus();
}
function er() {
  const e = _(null), [t, n] = p(null), [r, l] = p("");
  return C(() => {
    e.current !== null && t !== null && wp(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function tr({ text: e }) {
  return /* @__PURE__ */ a("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Rt({ id: e, name: t, direction: n, onMove: r }) {
  return /* @__PURE__ */ a("button", { type: "button", className: `${hp.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${t} ${n}`, onClick: r, children: /* @__PURE__ */ a("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const fp = "_body_1jd1i_2", _p = "_title_1jd1i_8", vp = "_section_1jd1i_13", bp = "_legend_1jd1i_18", pp = "_stages_1jd1i_26", gp = "_stage_1jd1i_26", yp = "_stageIndex_1jd1i_44", Np = "_stageName_1jd1i_50", kp = "_footer_1jd1i_59", $p = "_note_1jd1i_66", Cp = "_reason_1jd1i_71", Sp = "_actions_1jd1i_76", Rp = "_webHead_1jd1i_83", Tp = "_kicker_1jd1i_92", xp = "_webTitle_1jd1i_99", Lp = "_webBody_1jd1i_105", Ap = "_webSection_1jd1i_109", Ep = "_sectionHead_1jd1i_121", Ip = "_sectionNote_1jd1i_129", Mp = "_formLabel_1jd1i_134", Bp = "_identityRow_1jd1i_139", Pp = "_nameCell_1jd1i_145", qp = "_keyCell_1jd1i_150", Op = "_colourCell_1jd1i_154", jp = "_colourStatus_1jd1i_161", Dp = "_webStages_1jd1i_166", Hp = "_webStageList_1jd1i_172", Fp = "_webStage_1jd1i_166", Wp = "_webIndex_1jd1i_191", zp = "_webStageName_1jd1i_196", Kp = "_webMoves_1jd1i_201", Gp = "_addStage_1jd1i_215", Up = "_addStageButton_1jd1i_223", Vp = "_addStageNote_1jd1i_231", Yp = "_webFooter_1jd1i_236", Jp = "_webFooterNotes_1jd1i_244", Xp = "_webNote_1jd1i_251", v = {
  body: fp,
  title: _p,
  section: vp,
  legend: bp,
  stages: pp,
  stage: gp,
  stageIndex: yp,
  stageName: Np,
  footer: kp,
  note: $p,
  reason: Cp,
  actions: Sp,
  webHead: Rp,
  kicker: Tp,
  webTitle: xp,
  webBody: Lp,
  webSection: Ap,
  sectionHead: Ep,
  sectionNote: Ip,
  formLabel: Mp,
  identityRow: Bp,
  nameCell: Pp,
  keyCell: qp,
  colourCell: Op,
  colourStatus: jp,
  webStages: Dp,
  webStageList: Hp,
  webStage: Fp,
  webIndex: Wp,
  webStageName: zp,
  webMoves: Kp,
  addStage: Gp,
  addStageButton: Up,
  addStageNote: Vp,
  webFooter: Yp,
  webFooterNotes: Jp,
  webNote: Xp
}, Qp = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], ar = "not in catalogue";
function Zp(e, t) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? n : [{ value: t, label: `${t || "(unnamed)"} · ${ar}` }, ...n];
}
function eg({ stage: e, index: t, catalogue: n, onName: r }) {
  const l = `Stage ${t + 1} name`;
  if (!n) return /* @__PURE__ */ a(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${ar}`;
  return /* @__PURE__ */ a(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Zp(n, e.name), invalid: i, onChange: r });
}
function nr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function tg(e) {
  const t = _([]), n = _(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${n.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function ag({ id: e, stage: t, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = nr(t, n), d = t.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ a("span", { className: v.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ a("div", { className: v.webStageName, children: /* @__PURE__ */ a(eg, { stage: t, index: n, catalogue: l, onName: (u) => i({ ...t, name: u }) }) }),
    /* @__PURE__ */ a(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: t.kind, options: Qp, onChange: (u) => i({ ...t, kind: u }) }),
    /* @__PURE__ */ o("span", { className: v.webMoves, children: [
      n > 0 && /* @__PURE__ */ a(Rt, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ a(Rt, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function ng({ stages: e, onChange: t, catalogue: n }) {
  const r = tg(e.length), l = er(), i = (c, d) => {
    const u = Qn(c, d);
    r.current = Xt(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Zn(nr(e[c], c), u, e.length)), t(Xt(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: v.webStages, children: [
    /* @__PURE__ */ a("ol", { ref: l.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ a(ag, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ a(tr, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: v.addStage, children: [
      /* @__PURE__ */ a("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ a("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const rg = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], lg = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], og = "A new stream starts as a draft. Nothing runs on it until you publish it.", ig = "Create is disabled: name the stream and give it a key first.", sg = "reorder with the ↑ ↓ buttons · min 2";
function da(e, t) {
  return !e.reserved && ct(e.step) && t[e.step] === void 0;
}
function cg(e, t) {
  const n = e.find((r) => da(r, t));
  return n ? n.step : 1;
}
function dg({ stages: e, onMove: t }) {
  const n = er(), r = (l, i) => {
    const s = Qn(l, i);
    n.moved({ id: e[l].id, direction: i }, Zn(e[l].name, s, e.length)), t(l, s);
  };
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("ol", { ref: n.root, className: v.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: v.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ a("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ a("span", { className: v.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ a(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ a(Rt, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ a(Rt, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ a(tr, { text: n.announcement })
  ] });
}
function ug({ reason: e, onCreate: t, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: v.footer, children: [
    /* @__PURE__ */ a("p", { className: v.note, children: og }),
    e && /* @__PURE__ */ a("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: v.actions, children: [
      /* @__PURE__ */ a(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ a(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ a(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function hg(e, t) {
  return e !== "" && t !== "" ? null : ig;
}
function mg(e) {
  const { owners: t, ladder: n, takenBy: r = {}, policies: l = lg, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [h, w] = p(""), [f, y] = p(""), [E, P] = p(t[0].value), [ne, Ne] = p(() => cg(n, r)), [re, Ee] = p(e.stages ?? rg), [Ve, T] = p(l[0].value), U = { name: h, key: f, streamStep: ne, owner: E, stages: re, policy: Ve }, ke = hg(h, f);
  return /* @__PURE__ */ a(nt, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: v.body, children: [
    /* @__PURE__ */ a("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ a("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ a(M, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ a(M, { kind: "input", label: "Key", value: f, onChange: y, mono: !0 }),
      /* @__PURE__ */ a(M, { kind: "select", label: "Owner", value: E, onChange: P, options: t })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ a("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ a(Un, { label: "Stream colour", steps: n, value: ne, onChange: Ne, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ a("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ a(dg, { stages: re, onMove: (Fe, xr) => Ee(Xt(re, Fe, xr)) })
    ] }),
    /* @__PURE__ */ a(Pn, { legend: "Loop policy", options: l, value: Ve, onChange: T }),
    /* @__PURE__ */ a(ug, { reason: ke, onCreate: () => i(U), onDraft: () => s(U) })
  ] }) });
}
const rr = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], wg = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function fg(e, t, n, r, l, i) {
  var c;
  const s = ((c = rr.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function _g(e, t) {
  return vg(e) && bg(e, t) && pg(e);
}
function vg(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function bg(e, t) {
  return e.colourStep === null || da({ step: e.colourStep }, t);
}
function pg(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function gg(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : da({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function yg({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ a("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ a("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function Ng({ ready: e, draft: t, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: v.webFooter, children: [
    /* @__PURE__ */ o("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ a(yg, { stage: n }),
      !e && /* @__PURE__ */ a("p", { id: i, className: v.reason, children: wg })
    ] }),
    l && /* @__PURE__ */ a(b, { variant: "secondary", onClick: () => l(t), children: "Save draft" }),
    e ? /* @__PURE__ */ a(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ a(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function kg({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: v.webHead, children: [
    /* @__PURE__ */ a("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ a("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function $g({ name: e, setName: t, streamKey: n, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: v.webSection, children: [
    /* @__PURE__ */ a("h3", { className: v.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: v.identityRow, children: [
      /* @__PURE__ */ a("div", { className: v.nameCell, children: /* @__PURE__ */ a(M, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ a("div", { className: v.keyCell, children: /* @__PURE__ */ a(M, { variant: "form", label: "Key", value: n, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function Cg(e) {
  const t = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [f, y] = p("relay"), [E, P] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), ne = fg(l, s, d, h, f, E), Ne = _g(ne, r), re = E.find((T) => T.kind === "agent" && T.name.trim() !== ""), Ee = /* @__PURE__ */ o("div", { className: v.colourCell, children: [
    /* @__PURE__ */ a("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ a(Un, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ve = /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("p", { className: v.colourStatus, "data-colour-status": "", children: gg(h, r) }),
    /* @__PURE__ */ a(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((T) => ({ value: T, label: T })), onChange: u })
  ] });
  return /* @__PURE__ */ o(nt, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ a(kg, { titleId: n }),
    /* @__PURE__ */ o("div", { className: v.webBody, children: [
      /* @__PURE__ */ a($g, { name: l, setName: i, streamKey: s, setKey: c, colour: Ee, owner: Ve }),
      /* @__PURE__ */ o("section", { className: v.webSection, children: [
        /* @__PURE__ */ o("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ a("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ a("span", { className: v.sectionNote, children: sg })
        ] }),
        /* @__PURE__ */ a(ng, { stages: E, onChange: P })
      ] }),
      /* @__PURE__ */ a("section", { className: v.webSection, children: /* @__PURE__ */ a(Pn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: rr, onChange: y }) }),
      /* @__PURE__ */ a(Ng, { ready: Ne, draft: ne, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function $T(e) {
  return "presentation" in e ? /* @__PURE__ */ a(Cg, { ...e }) : /* @__PURE__ */ a(mg, { ...e });
}
const Sg = "_row_bs8hc_2", Rg = "_cell_bs8hc_6", Tg = "_condition_bs8hc_11", xg = "_action_bs8hc_18", Lg = "_contract_bs8hc_24", Ag = "_contractCondition_bs8hc_33", Eg = "_contractAction_bs8hc_39", te = {
  row: Sg,
  cell: Rg,
  condition: Tg,
  action: xg,
  contract: Lg,
  contractCondition: Ag,
  contractAction: Eg
}, lr = ["advance", "block", "escalate", "requestReview"], za = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Tt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function ua(e, t, n, r) {
  return n || !t ? /* @__PURE__ */ a("span", { className: te.action, children: za[e.then] }) : /* @__PURE__ */ a(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => t({ ...e, then: l }),
      options: lr.map((l) => ({ value: l, label: za[l] }))
    }
  );
}
function Ig({ rule: e, onChange: t, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: te.row, children: [
    /* @__PURE__ */ a("td", { className: te.cell, children: /* @__PURE__ */ a(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ a("td", { className: te.cell, children: /* @__PURE__ */ a("span", { className: te.condition, title: Tt(e, r), children: Tt(e, r) }) }),
    /* @__PURE__ */ a("td", { className: te.cell, children: /* @__PURE__ */ a(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ a("td", { className: te.cell, children: ua(e, t, n) })
  ] });
}
function Mg({ rule: e, onChange: t, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: te.row, children: [
    /* @__PURE__ */ o("td", { className: te.cell, children: [
      /* @__PURE__ */ a(m, { role: "system", label: "When" }),
      /* @__PURE__ */ a("span", { className: te.condition, children: Tt(e, r) })
    ] }),
    /* @__PURE__ */ a("td", { className: te.cell, children: ua(e, t, n) })
  ] });
}
function Bg({ rule: e, onChange: t, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: te.contract, children: [
    /* @__PURE__ */ a(m, { role: "system", label: "When" }),
    /* @__PURE__ */ a("span", { className: te.contractCondition, children: Tt(e, r) }),
    /* @__PURE__ */ a(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ a("span", { className: te.contractAction, children: ua(e, t, n, !0) })
  ] });
}
const Pg = { two: Mg, four: Ig, contract: Bg };
function CT(e) {
  var n;
  if (!lr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = Pg[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ a(t, { ...e });
}
const qg = "_column_g1uat_2", Og = "_head_g1uat_17", jg = "_index_g1uat_23", Dg = "_name_g1uat_29", Hg = "_meta_g1uat_38", Fg = "_mono_g1uat_43", Wg = "_gate_g1uat_50", zg = "_reviewersLabel_g1uat_57", Kg = "_reviewers_g1uat_57", Gg = "_reviewer_g1uat_57", Ug = "_agents_g1uat_74", Vg = "_workflowColumn_g1uat_79", Yg = "_workflowHead_g1uat_96", Jg = "_stageRow_g1uat_102", Xg = "_stageLabel_g1uat_109", Qg = "_workflowTitle_g1uat_116", Zg = "_workflowMeta_g1uat_122", ey = "_workflowGate_g1uat_127", ty = "_gateNote_g1uat_135", ay = "_cardNote_g1uat_140", ny = "_reviewerList_g1uat_145", ry = "_reviewerRow_g1uat_151", ly = "_reviewerMark_g1uat_157", oy = "_reviewerName_g1uat_167", iy = "_terminalCard_g1uat_173", sy = "_terminalCount_g1uat_182", cy = "_workflowAgents_g1uat_188", dy = "_mount_g1uat_194", S = {
  column: qg,
  head: Og,
  index: jg,
  name: Dg,
  meta: Hg,
  mono: Fg,
  gate: Wg,
  reviewersLabel: zg,
  reviewers: Kg,
  reviewer: Gg,
  agents: Ug,
  workflowColumn: Vg,
  workflowHead: Yg,
  stageRow: Jg,
  stageLabel: Xg,
  workflowTitle: Qg,
  workflowMeta: Zg,
  workflowGate: ey,
  gateNote: ty,
  cardNote: ay,
  reviewerList: ny,
  reviewerRow: ry,
  reviewerMark: ly,
  reviewerName: oy,
  terminalCard: iy,
  terminalCount: sy,
  workflowAgents: cy,
  mount: dy
}, uy = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function ha(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function or(e) {
  return `${Math.round(e * 100)}%`;
}
function hy({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: S.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ a("p", { className: S.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ a("ul", { className: S.reviewers, children: t.map((n) => /* @__PURE__ */ a("li", { className: S.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ a(Pt, { cells: [
      { value: or(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function my({ stage: e }) {
  return /* @__PURE__ */ a(Pt, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: ha(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function wy({ stage: e, titleId: t }) {
  return /* @__PURE__ */ o("header", { className: S.head, children: [
    /* @__PURE__ */ a("span", { className: S.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ a("h3", { className: S.name, id: t, children: e.name }),
    /* @__PURE__ */ a(m, { role: e.kind === "gate" ? "gate" : "soft", label: uy[e.kind] })
  ] });
}
function fy({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: S.meta, children: [
    /* @__PURE__ */ o("span", { className: S.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: S.mono, children: [
      ue(e.medianWait),
      " median wait"
    ] })
  ] });
}
function _y({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ a(hy, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ a(my, { stage: e }) : null;
}
function vy({ onMount: e }) {
  return e ? /* @__PURE__ */ a(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function by({ stage: e, agents: t = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: S.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ a(wy, { stage: e, titleId: l }),
    /* @__PURE__ */ a(fy, { stage: e }),
    /* @__PURE__ */ a(_y, { stage: e }),
    /* @__PURE__ */ a("div", { className: S.agents, children: t.map((s) => /* @__PURE__ */ a(Nv, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ a(vy, { onMount: n })
  ] });
}
const py = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function gy({ reviewers: e }) {
  return /* @__PURE__ */ a("ul", { className: S.reviewerList, children: e.map((t, n) => /* @__PURE__ */ o("li", { className: S.reviewerRow, children: [
    /* @__PURE__ */ a("span", { className: S.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ a("span", { className: S.reviewerName, children: t.name })
  ] }, `${n}-${t.name}`)) });
}
function yy({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: S.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: S.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ a(gy, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: S.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ a("span", { children: or(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Ny(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function ky({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: S.terminalCard, children: [
    /* @__PURE__ */ a("span", { className: S.terminalCount, children: ha(e.closedThisWeek) }),
    /* @__PURE__ */ a("span", { className: S.cardNote, children: Ny(e.rolledBackThisWeek) })
  ] });
}
function $y(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Cy(e) {
  if (e.kind === "terminal") return `${ha(e.closedThisWeek)} this week`;
  const t = $y(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function Sy({ stage: e, titleId: t }) {
  const n = py[e.kind];
  return /* @__PURE__ */ o("header", { className: S.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: S.stageRow, children: [
      /* @__PURE__ */ o("span", { className: S.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ a(m, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ a("h3", { id: t, className: S.workflowTitle, children: e.name }),
    /* @__PURE__ */ a("span", { className: S.workflowMeta, children: Cy(e) })
  ] });
}
function Ry(e) {
  return e === "entry" || e === "agent";
}
function Ty({ stage: e, onMount: t }) {
  return t === void 0 || !Ry(e.kind) ? null : /* @__PURE__ */ a(b, { variant: "secondary", size: "sm", className: S.mount, onClick: () => t(e.index), children: "+ Mount agent" });
}
function xy({ stage: e, agentCards: t, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: S.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ a(Sy, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ a(yy, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ a(ky, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ a("div", { className: S.workflowAgents, children: t }),
    /* @__PURE__ */ a(Ty, { stage: e, onMount: n })
  ] });
}
function Ly(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function ST(e) {
  return Ly(e) ? /* @__PURE__ */ a(xy, { ...e }) : /* @__PURE__ */ a(by, { ...e });
}
const Ay = "_row_1tdra_6", Ey = "_name_1tdra_12", Iy = "_compactRow_1tdra_13", My = "_compactName_1tdra_13", By = "_cell_1tdra_30", Py = "_chain_1tdra_45", qy = "_owner_1tdra_51", Oy = "_mono_1tdra_57", jy = "_compactCell_1tdra_79", Dy = "_stack_1tdra_96", Hy = "_stat_1tdra_103", Fy = "_identityLine_1tdra_110", Wy = "_identity_1tdra_110", zy = "_ownerLine_1tdra_140", Ky = "_link_1tdra_160", Gy = "_gateMark_1tdra_166", Uy = "_emptyChain_1tdra_171", Vy = "_arrow_1tdra_177", Yy = "_muted_1tdra_182", Jy = "_define_1tdra_187", Xy = "_statValue_1tdra_194", Qy = "_policyId_1tdra_200", Zy = "_sub_1tdra_205", g = {
  row: Ay,
  name: Ey,
  compactRow: Iy,
  compactName: My,
  cell: By,
  chain: Py,
  owner: qy,
  mono: Oy,
  compactCell: jy,
  stack: Dy,
  stat: Hy,
  identityLine: Fy,
  identity: Wy,
  ownerLine: zy,
  link: Ky,
  gateMark: Gy,
  emptyChain: Uy,
  arrow: Vy,
  muted: Yy,
  define: Jy,
  statValue: Xy,
  policyId: Qy,
  sub: Zy
};
function ir(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function eN(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function tN(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function sr(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function aN(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${sr(e.members)}`;
}
function nN(e, t) {
  const n = e.draft === !0;
  return /* @__PURE__ */ a("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ a("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ a("a", { className: `${g.compactName} ward-rowlink ward-target`, href: H(t), "data-draft": n, children: e.name }),
      /* @__PURE__ */ a(m, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ a("span", { className: g.ownerLine, children: aN(e) })
  ] }) });
}
function cr({ name: e, gate: t, look: n, size: r }) {
  return /* @__PURE__ */ o(R, { children: [
    t ? /* @__PURE__ */ a("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ a(m, { ...n, size: r, label: e }),
    t ? /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function rN(e, t, n) {
  if (e !== t) return { role: "soft" };
  const r = ht(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function lN({ stages: e, streamStep: t }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ a("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ a(cr, { name: l.name, gate: l.gate === !0, look: rN(i, n, t), size: "tag" }),
    i === r ? null : /* @__PURE__ */ a("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function oN(e) {
  return /* @__PURE__ */ a("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ a("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ a("span", { className: g.define, children: "Define workflow" })
  ] }) : lN(e) });
}
function dr(e) {
  return e === void 0 ? void 0 : !0;
}
function Ka(e, t, n, r) {
  return /* @__PURE__ */ a("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ a("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ a("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": dr(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ a("span", { className: g.sub, children: t })
  ] }) });
}
function iN(e) {
  return /* @__PURE__ */ a("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ a("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ a("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ a("span", { className: g.sub, children: e.summary })
  ] }) });
}
function sN(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function cN({ stream: e, href: t, presentation: n }) {
  const r = tN(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: ir, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    nN(e, t),
    oN(e),
    Ka(sN(e.agents), e.agents === void 0 ? void 0 : eN(e.agents), "—"),
    iN(e.policy),
    Ka(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function dN(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function RT(e) {
  if (dN(e)) return cN(e);
  const { stream: t, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: ir, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ a("a", { className: `${g.name} ward-target`, href: H(n), children: t.name }),
      /* @__PURE__ */ a(m, { ...Bt(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ a(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ a("td", { className: g.cell, children: /* @__PURE__ */ a("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ a("span", { className: g.link, children: /* @__PURE__ */ a(cr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ a("td", { className: g.cell, children: /* @__PURE__ */ o("span", { className: g.mono, children: [
      t.agents.live,
      " live · ",
      t.agents.draft,
      " draft · ",
      t.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ a("span", { className: g.owner, children: t.owner }),
      /* @__PURE__ */ a("span", { className: g.mono, children: sr(t.members) })
    ] }),
    /* @__PURE__ */ a("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ a("span", { className: g.mono, title: t.inFlightHint, "data-raised": dr(t.inFlightHint), children: ae(t.inFlight) }) }),
    /* @__PURE__ */ a("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ a("span", { className: g.mono, children: t.p50 === void 0 ? "" : ue(t.p50) }) })
  ] });
}
const uN = "_row_2u4ll_2", hN = "_name_2u4ll_16", mN = "_scope_2u4ll_24", xt = {
  row: uN,
  name: hN,
  scope: mN
};
function ma(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function wN(e) {
  return e === void 0 ? `${xt.row} ward-toolrow` : `${xt.row} ward-toolrow ${e}`;
}
function fN(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function _N({ id: e, reasonId: t, tool: n, state: r, onChange: l }) {
  return /* @__PURE__ */ a(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: n.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? t : void 0,
      onChange: (i) => {
        r.locked || l(i.target.checked);
      }
    }
  );
}
function vN({ classification: e }) {
  return /* @__PURE__ */ a(m, { role: e === "write" ? "write" : "meta", label: ma(e) });
}
function bN({ tool: e, state: t, reasonId: n }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ a("span", { id: t.locked ? n : void 0, className: `${xt.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function pN(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function TT({ tool: e, onChange: t, presentation: n }) {
  const r = N(), l = N(), i = fN(e, n), s = pN(n);
  return /* @__PURE__ */ o(s, { className: wN(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ a(_N, { id: r, reasonId: l, tool: e, state: i, onChange: t }),
    /* @__PURE__ */ a("label", { htmlFor: r, className: `${xt.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ a(bN, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ a(vN, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ a(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const gN = "_strip_4ppv9_2", yN = "_well_4ppv9_11", NN = "_head_4ppv9_18", kN = "_name_4ppv9_24", $N = "_chart_4ppv9_32", CN = "_segment_4ppv9_38", SN = "_detailedChart_4ppv9_44", RN = "_rail_4ppv9_57", TN = "_section_4ppv9_63", xN = "_label_4ppv9_74", LN = "_note_4ppv9_91", G = {
  strip: gN,
  well: yN,
  head: NN,
  name: kN,
  chart: $N,
  segment: CN,
  detailedChart: SN,
  rail: RN,
  section: TN,
  label: xN,
  note: LN
}, AN = "No item in flight to preview.", EN = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", IN = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Qt = [1, 2, 3, 4, 5, 6], Lt = 100;
function MN(e, t) {
  return t.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function BN({ draft: e, streams: t }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ a("svg", { className: G.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Qt.map((r, l) => /* @__PURE__ */ a(
    "rect",
    {
      className: G.segment,
      x: l * Lt,
      y: "0",
      width: Lt,
      height: "8",
      fill: MN(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function PN(e) {
  const t = e.slice(0, Qt.length);
  for (; t.length < Qt.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function qN({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${G.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ a("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, n) => /* @__PURE__ */ a(
      "rect",
      {
        x: String(n * Lt),
        y: "0",
        width: String(Lt),
        height: "40",
        style: { fill: pe(t.streamStep, "chip") }
      },
      t.key + String(n)
    )) }),
    /* @__PURE__ */ a("figcaption", { className: "ward-seglabels", children: e.map((t, n) => /* @__PURE__ */ a("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(n))) })
  ] });
}
function ur(e) {
  return (t) => e == null ? void 0 : e(t);
}
function _t({ label: e, children: t }) {
  const n = N();
  return /* @__PURE__ */ o("section", { className: G.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ a("h4", { id: n, className: G.label, children: e }),
    t
  ] });
}
function ON({ sample: e, sampleEmpty: t, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ a("p", { className: G.note, children: t ?? AN }) : /* @__PURE__ */ a("div", { className: G.well, children: /* @__PURE__ */ a(Ot, { item: { ...e, streamStep: ht(n.streamStep) }, onOpen: ur(r), feed: null }) });
}
function jN({ draft: e }) {
  const t = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: G.head, style: t, children: [
    /* @__PURE__ */ a(He, { size: 8, kind: "stream" }),
    /* @__PURE__ */ a("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ a(m, { ...Bt(e.key, e.streamStep) })
  ] });
}
function DN(e) {
  const t = PN(e.identities ?? [e.draft, ...e.streams]), n = t[0];
  return /* @__PURE__ */ o("div", { className: G.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ a(_t, { label: "Board card", children: /* @__PURE__ */ a(ON, { ...e, draft: n }) }),
    /* @__PURE__ */ a(_t, { label: "Streams index row", children: /* @__PURE__ */ a(jN, { draft: n }) }),
    /* @__PURE__ */ o(_t, { label: "Overview chart segment", children: [
      /* @__PURE__ */ a(qN, { identities: t }),
      /* @__PURE__ */ a("p", { className: G.note, children: EN })
    ] }),
    /* @__PURE__ */ a(_t, { label: "Not themeable", children: /* @__PURE__ */ a("p", { className: G.note, children: IN }) })
  ] });
}
function HN({ draft: e, sample: t, streams: n, onOpen: r }) {
  const l = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: G.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: G.head, children: [
      /* @__PURE__ */ a(He, { size: 8, kind: "stream" }),
      /* @__PURE__ */ a("span", { className: G.name, children: e.name }),
      /* @__PURE__ */ a(m, { ...Bt(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ a("div", { className: G.well, children: /* @__PURE__ */ a(Ot, { item: { ...t, streamStep: e.streamStep }, onOpen: ur(r) }) }),
    /* @__PURE__ */ a(BN, { draft: e, streams: n })
  ] });
}
function xT(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ a(DN, { ...e }) : /* @__PURE__ */ a(HN, { ...e });
}
const FN = "_row_ixlg5_6", WN = "_headCell_ixlg5_10", zN = "_cell_ixlg5_11", KN = "_name_ixlg5_23", GN = "_consequence_ixlg5_29", UN = "_governed_ixlg5_36", VN = "_control_ixlg5_42", YN = "_byRole_ixlg5_48", JN = "_webControl_ixlg5_59", XN = "_webConsequence_ixlg5_65", QN = "_webGoverned_ixlg5_71", D = {
  row: FN,
  headCell: WN,
  cell: zN,
  name: KN,
  consequence: GN,
  governed: UN,
  control: VN,
  byRole: YN,
  webControl: JN,
  webConsequence: XN,
  webGoverned: QN
};
function ZN({
  capability: e,
  cell: t,
  onChange: n
}) {
  return t.value === "byRole" ? /* @__PURE__ */ a("span", { className: D.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: D.control, children: [
    /* @__PURE__ */ a(
      Ue,
      {
        label: `${e.name} · ${t.stream}`,
        checked: t.value !== "off",
        onChange: (r) => n(t.streamStep, r)
      }
    ),
    t.value === "pilot" && /* @__PURE__ */ a(m, { role: "running", label: "Pilot" })
  ] });
}
function e1({ capability: e, cells: t, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: D.headCell, children: [
      /* @__PURE__ */ a("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ a("span", { className: D.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: D.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    t.map((r) => /* @__PURE__ */ a("td", { className: D.cell, children: /* @__PURE__ */ a(ZN, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function t1(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function a1({ name: e, cell: t, onChange: n }) {
  if (t.value === "byRole") return /* @__PURE__ */ a("span", { className: `${D.webControl} ${D.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ a(
    Ue,
    {
      label: `${e} · step ${t.streamStep}`,
      checked: t.value === "on",
      disabled: n === void 0,
      onChange: (l) => n == null ? void 0 : n(t.streamStep, l ? "on" : "off")
    }
  );
  return t.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${D.webControl} ward-envrow`, children: [
    /* @__PURE__ */ a(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function n1({ capability: e, cells: t, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ a("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ a("p", { className: `${D.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ a("td", { className: D.cell, children: /* @__PURE__ */ a(a1, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ a("td", { className: D.cell, children: /* @__PURE__ */ a("span", { className: `${D.webGoverned} ward-cellmeta`, children: t1(e) }) })
  ] });
}
function LT(e) {
  return "presentation" in e ? /* @__PURE__ */ a(n1, { ...e }) : /* @__PURE__ */ a(e1, { ...e });
}
const r1 = "_row_vv64h_2", l1 = "_cell_vv64h_6", o1 = "_name_vv64h_25", i1 = "_note_vv64h_30", s1 = "_webName_vv64h_41", c1 = "_webMeta_vv64h_47", Y = {
  row: r1,
  cell: l1,
  name: o1,
  note: i1,
  webName: s1,
  webMeta: c1
}, hr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function d1(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function u1({ component: e, onRestart: t }) {
  const n = N(), r = hr[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: Y.row, children: [
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a("span", { className: Y.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: Y.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a("span", { id: n, className: Y.note, children: e.note }) }),
    /* @__PURE__ */ a("td", { className: Y.cell, "data-align": "end", children: l ? /* @__PURE__ */ a(b, { size: "sm", disabled: !0, describedBy: n, children: "Restart" }) : /* @__PURE__ */ a(b, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function h1({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ a(b, { size: "sm", onClick: () => t(e.name), children: d1(e.state) });
}
function m1({ component: e, onRestart: t }) {
  return /* @__PURE__ */ o("tr", { className: Y.row, children: [
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a("span", { className: `${Y.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a("span", { className: `${Y.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a(m, { ...hr[e.state] }) }),
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a(h1, { component: e, onRestart: t }) })
  ] });
}
function AT(e) {
  return "presentation" in e ? /* @__PURE__ */ a(m1, { ...e }) : /* @__PURE__ */ a(u1, { ...e });
}
const w1 = "_row_jcm5k_7", f1 = "_cell_jcm5k_11", _1 = "_next_jcm5k_28", v1 = "_headCell_jcm5k_38", b1 = "_webId_jcm5k_77", p1 = "_webPurpose_jcm5k_83", g1 = "_webMeta_jcm5k_91", y1 = "_webUrgent_jcm5k_97", F = {
  row: w1,
  cell: f1,
  next: _1,
  headCell: v1,
  webId: b1,
  webPurpose: p1,
  webMeta: g1,
  webUrgent: y1
}, N1 = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, k1 = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, mr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], $1 = Object.fromEntries(mr.map((e) => [e.key, e]));
function Je({ column: e, children: t }) {
  const n = $1[e];
  return /* @__PURE__ */ a(
    "td",
    {
      className: F.cell,
      style: n.width ? { width: n.width } : void 0,
      "data-drop": n.dropPriority,
      "data-mono": n.mono,
      children: t
    }
  );
}
function ET() {
  return /* @__PURE__ */ a("tr", { children: mr.map((e) => /* @__PURE__ */ a(
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
function C1({ cred: e }) {
  const t = N1[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ a(Je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ a(Je, { column: "id", children: e.id }),
    /* @__PURE__ */ a(Je, { column: "state", children: /* @__PURE__ */ a(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ a(Je, { column: "cls", children: /* @__PURE__ */ a(m, { role: e.cls === "write" ? "write" : "meta", label: ma(e.cls) }) }),
    /* @__PURE__ */ a(Je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ a(Je, { column: "next", children: /* @__PURE__ */ a("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function S1({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ a("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ a("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function R1({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a(S1, { cred: e }) }),
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a(m, { ...k1[e.state] }) })
  ] });
}
function IT(e) {
  return "presentation" in e ? /* @__PURE__ */ a(R1, { ...e }) : /* @__PURE__ */ a(C1, { ...e });
}
const T1 = "_card_lpp45_2", x1 = "_head_lpp45_11", L1 = "_env_lpp45_18", A1 = "_version_lpp45_25", E1 = "_meta_lpp45_32", I1 = "_webCard_lpp45_37", M1 = "_webRow_lpp45_47", B1 = "_webTitle_lpp45_55", P1 = "_webLine_lpp45_65", q1 = "_webVersion_lpp45_72", O1 = "_webMeta_lpp45_77", V = {
  card: T1,
  head: x1,
  env: L1,
  version: A1,
  meta: E1,
  webCard: I1,
  webRow: M1,
  webTitle: B1,
  webLine: P1,
  webVersion: q1,
  webMeta: O1
}, Ga = { dev: "Dev", uat: "UAT", prod: "Prod" }, wr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function j1({ env: e }) {
  const t = wr[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: V.card, "aria-label": Ga[e.env], children: [
    /* @__PURE__ */ o("div", { className: V.head, children: [
      /* @__PURE__ */ a("span", { className: V.env, children: Ga[e.env] }),
      /* @__PURE__ */ a(m, { role: t.role, label: t.label })
    ] }),
    /* @__PURE__ */ a("p", { className: V.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: V.meta, children: [
      "deployed ",
      he(e.deployedAt)
    ] }),
    n && /* @__PURE__ */ a("p", { className: V.meta, children: n })
  ] });
}
function D1(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((n) => n !== null).join(" · ");
}
function H1(e) {
  return /* @__PURE__ */ o("article", { className: `${V.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${V.webRow} ward-envrow`, children: [
      /* @__PURE__ */ a("span", { className: `${V.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ a(m, { ...wr[e.state] })
    ] }),
    /* @__PURE__ */ a("span", { className: `${V.version} ${V.webVersion} ${V.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ a("span", { className: `${V.meta} ${V.webMeta} ${V.webLine} ward-cellmeta`, children: D1(e) })
  ] });
}
function MT(e) {
  return "presentation" in e ? /* @__PURE__ */ a(H1, { ...e }) : /* @__PURE__ */ a(j1, { ...e });
}
const F1 = "_panel_1hmja_2", W1 = "_line_1hmja_8", z1 = "_actions_1hmja_14", vt = {
  panel: F1,
  line: W1,
  actions: z1
};
function BT(e) {
  return /* @__PURE__ */ o("div", { className: vt.panel, children: [
    /* @__PURE__ */ a("p", { className: vt.line, children: e.status }),
    /* @__PURE__ */ a(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ a("div", { className: vt.actions, children: e.actions }),
    /* @__PURE__ */ a("p", { role: "status", className: vt.line, children: e.note ?? "" })
  ] });
}
const K1 = "_upload_13fcl_2", G1 = "_preview_13fcl_7", U1 = "_mark_13fcl_17", V1 = "_empty_13fcl_22", Y1 = "_actions_13fcl_28", J1 = "_input_13fcl_33", X1 = "_reasons_13fcl_41", Q1 = "_reason_13fcl_41", Z1 = "_accepted_13fcl_57", le = {
  upload: K1,
  preview: G1,
  mark: U1,
  empty: V1,
  actions: Y1,
  input: J1,
  reasons: X1,
  reason: Q1,
  accepted: Z1
}, fr = 1.5, _r = 22, At = "script elements or event handlers", Pe = "links or external references", xe = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${fr}px at ${_r}px`], ek = [xe[1], xe[2], At, Pe], tk = /* @__PURE__ */ new Map([
  ["image", xe[1]],
  ["text", xe[2]],
  ["tspan", xe[2]],
  ["textPath", xe[2]],
  ["script", At],
  ["foreignObject", At],
  ["a", Pe],
  ["use", Pe],
  ["style", Pe],
  ["feImage", Pe],
  ["set", Pe]
]), ak = "http://www.w3.org/2000/svg", nk = "http://www.w3.org/2000/xmlns/", rk = /* @__PURE__ */ new Set([
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
]), lk = /* @__PURE__ */ new Set([
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
]), wa = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, ok = /url\s*\(|['"\\]/i;
function ik() {
  return { ok: !1, reasons: [xe[1]] };
}
function vr(e) {
  return e.namespaceURI === ak;
}
function sk(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && vr(t) ? t : null;
  } catch {
    return null;
  }
}
function ck(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [xe[0]] : [];
}
function dk(e) {
  return tk.get(e.localName) ?? (e.localName.startsWith("animate") ? Pe : void 0);
}
function uk(e) {
  return ok.test(e.replace(wa, ""));
}
function hk(e) {
  return /^on/i.test(e.localName) ? At : e.localName === "href" || uk(e.value) ? Pe : void 0;
}
function mk(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(dk(n));
    for (const r of Array.from(n.attributes)) t.add(hk(r));
  }
  return ek.filter((n) => t.has(n));
}
function wk(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...t.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? _r / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < fr;
  }) ? [xe[3]] : [];
}
function fk(e) {
  if (e.namespaceURI === nk) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (lk.has(t) || t.startsWith("stroke"));
}
function _k(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && vr(t) && rk.has(t.localName);
}
function vk(e, t) {
  _k(t) ? t.nodeType === Node.ELEMENT_NODE && br(t) : e.removeChild(t);
}
function br(e) {
  for (const t of Array.from(e.attributes)) fk(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) vk(e, t);
  return e;
}
function bk(e) {
  return Array.from(e.matchAll(wa), (t) => t[2]).filter((t) => t !== "");
}
function pk(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n += 1) t = Math.imul(t ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function gk(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of bk(l.value)) n.has(i) || n.set(i, `${t}-${n.size}`);
  return n;
}
function yk(e, t) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(wa, (r, l, i) => {
      const s = t.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function Nk(e, t) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = gk(n, t);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), yk(l, r);
  }
  return e;
}
function PT(e) {
  const t = sk(e);
  if (t === null) return ik();
  const n = [...ck(t), ...mk(t), ...wk(t)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(Nk(br(t), pk(e))) };
}
const kk = "Mark accepted.", $k = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Ck = new Set(an.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function Sk(e) {
  return e !== void 0 && ($k.test(e) || Ck.has(e)) ? e : void 0;
}
function Rk({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ a("div", { className: le.preview, style: { "--mark": Sk(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ a("img", { className: le.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ a("span", { className: le.empty }) });
}
function Tk(e, t) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[n];
}
function xk(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function Lk({ result: e }) {
  return e === null ? /* @__PURE__ */ a("div", { className: le.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ a("div", { className: le.result, role: "status", children: /* @__PURE__ */ a("p", { className: le.accepted, children: kk }) }) : /* @__PURE__ */ a("div", { className: le.result, role: "status", children: /* @__PURE__ */ a("ul", { className: le.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ a("li", { className: le.reason, children: t }, t)) }) });
}
function Ak({ result: e, presentation: t }) {
  const n = t == null ? void 0 : t.status;
  return n === void 0 ? /* @__PURE__ */ a(Lk, { result: e }) : /* @__PURE__ */ a("p", { className: `${le.result} ${Tk(e, n)}`, role: "status", children: xk(e, n) });
}
function Ua(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function qT({ current: e, onUpload: t, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = _(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ o("div", { className: le.upload, children: [
    /* @__PURE__ */ a(Rk, { current: e }),
    /* @__PURE__ */ o("div", { className: le.actions, children: [
      /* @__PURE__ */ a(
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
      /* @__PURE__ */ a(b, { ...Ua(l), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ a(b, { ...Ua(l), variant: "ghost", onClick: n, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ a(Ak, { result: s, presentation: r })
  ] });
}
const Ek = "_row_o3t6y_7", Ik = "_cell_o3t6y_11", Mk = "_head_o3t6y_28", Bk = "_name_o3t6y_34", Pk = "_pinned_o3t6y_42", qk = "_headCell_o3t6y_49", Ok = "_webName_o3t6y_88", jk = "_webMeta_o3t6y_95", Dk = "_webWarn_o3t6y_103", q = {
  row: Ek,
  cell: Ik,
  head: Mk,
  name: Bk,
  pinned: Pk,
  headCell: qk,
  webName: Ok,
  webMeta: jk,
  webWarn: Dk
}, fa = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, pr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Hk = Object.fromEntries(pr.map((e) => [e.key, e]));
function Fk(e, t) {
  return `mcp.${e}.${t}`;
}
function Wk(e) {
  return Object.keys(fa).includes(e);
}
function zk(e) {
  return fa[e !== void 0 && Wk(e) ? e : "unknown"];
}
function rt({ column: e, children: t }) {
  const n = Hk[e];
  return /* @__PURE__ */ a(
    "td",
    {
      className: q.cell,
      style: n.width ? { width: n.width } : void 0,
      "data-drop": n.dropPriority,
      "data-mono": n.mono,
      children: t
    }
  );
}
function OT() {
  return /* @__PURE__ */ a("tr", { children: pr.map((e) => /* @__PURE__ */ a(
    "th",
    {
      scope: "col",
      className: q.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function Kk({ server: e }) {
  const t = fa[e.connection];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o(rt, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: q.head, children: [
        /* @__PURE__ */ a("span", { className: q.name, children: e.name }),
        /* @__PURE__ */ a(m, { role: e.cls === "write" ? "write" : "meta", label: ma(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: q.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ a(rt, { column: "connection", children: /* @__PURE__ */ a(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ a(rt, { column: "transport", children: e.transport }),
    /* @__PURE__ */ a(rt, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ a(rt, { column: "tools", children: e.tools.map((n) => Fk(e.name, n)).join(" · ") })
  ] });
}
function Gk(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Uk(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function Vk({ pinned: e }) {
  return e === null ? /* @__PURE__ */ a("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ a("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Yk({ server: e, onRestart: t }) {
  var n;
  return t === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ a("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ a(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function Jk({ name: e, pinned: t, onPin: n }) {
  return t !== null || n === void 0 ? null : /* @__PURE__ */ a(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function Xk({ server: e, onRestart: t, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ a("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ a("span", { className: `${q.webMeta} ward-cellmeta`, children: Gk(e) })
    ] }),
    /* @__PURE__ */ a("td", { className: q.cell, children: /* @__PURE__ */ a("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ a("td", { className: q.cell, children: /* @__PURE__ */ a(m, { ...Uk(e) }) }),
    /* @__PURE__ */ a("td", { className: q.cell, children: /* @__PURE__ */ a(Vk, { pinned: r }) }),
    /* @__PURE__ */ a("td", { className: q.cell, children: /* @__PURE__ */ a(m, { ...zk(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ a(Yk, { server: e, onRestart: t }),
      /* @__PURE__ */ a(Jk, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function jT(e) {
  return "presentation" in e ? /* @__PURE__ */ a(Xk, { ...e }) : /* @__PURE__ */ a(Kk, { ...e });
}
const Qk = "_row_1ibo7_2", Zk = "_headCell_1ibo7_14", e$ = "_cell_1ibo7_15", t$ = "_name_1ibo7_26", a$ = "_consequence_1ibo7_32", n$ = "_reason_1ibo7_38", r$ = "_value_1ibo7_44", l$ = "_webRow_1ibo7_60", o$ = "_webSetting_1ibo7_73", i$ = "_webName_1ibo7_81", s$ = "_webConsequence_1ibo7_89", c$ = "_webControl_1ibo7_95", d$ = "_webState_1ibo7_109", u$ = "_webChip_1ibo7_114", I = {
  row: Qk,
  headCell: Zk,
  cell: e$,
  name: t$,
  consequence: a$,
  reason: n$,
  value: r$,
  webRow: l$,
  webSetting: o$,
  webName: i$,
  webConsequence: s$,
  webControl: c$,
  webState: d$,
  webChip: u$
}, gr = 104, yr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function h$({ control: e, name: t, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ a(Ue, { label: t, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ a(Mn, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ a("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function m$({ setting: e, control: t, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = yr[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ a("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ a("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ a("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ a("td", { className: I.cell, children: /* @__PURE__ */ a(h$, { control: t, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ a("td", { className: I.cell, style: { width: gr }, children: /* @__PURE__ */ a(m, { role: i.role, label: i.label }) })
  ] });
}
function Nr(e, t) {
  return String(e ?? t);
}
function w$(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function f$(e) {
  var n;
  const t = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? Nr(e.value, "—");
}
function _$({ control: e, name: t, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ a(Ue, { label: t, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ a("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function v$(e) {
  const { control: t, locked: n, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ a(_$, { ...e });
  const l = w$(t, n);
  return l !== void 0 ? /* @__PURE__ */ a("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ a(Mn, { options: l, value: Nr(t.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ a("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: f$(t) });
}
function b$({ setting: e, control: t, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ a("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ a("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ a(v$, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ a("span", { className: `${I.webChip} ward-policy-chip`, style: { width: gr }, children: /* @__PURE__ */ a(m, { ...yr[n], size: "tag" }) })
  ] });
}
function DT(e) {
  return "presentation" in e ? /* @__PURE__ */ a(b$, { ...e }) : /* @__PURE__ */ a(m$, { ...e });
}
const p$ = "_label_h9m4w_7", g$ = "_name_h9m4w_15", y$ = "_column_h9m4w_24", N$ = "_webFrame_h9m4w_57", k$ = "_webHead_h9m4w_62", $$ = "_webHeadLabel_h9m4w_74", C$ = "_webLabel_h9m4w_117", S$ = "_webColumns_h9m4w_124", R$ = "_webGroup_h9m4w_130", T$ = "_webPeople_h9m4w_131", x$ = "_webVia_h9m4w_132", L$ = "_webMeta_h9m4w_161", W = {
  label: p$,
  name: g$,
  column: y$,
  webFrame: N$,
  webHead: k$,
  webHeadLabel: $$,
  webLabel: C$,
  webColumns: S$,
  webGroup: R$,
  webPeople: T$,
  webVia: x$,
  webMeta: L$
}, A$ = {
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
  return /* @__PURE__ */ a(
    "span",
    {
      className: W.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: t
    }
  );
}
function E$(e) {
  if (!e.matrixRole) return;
  const t = A$[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function I$({ node: e }) {
  const t = E$(e);
  return /* @__PURE__ */ o("span", { className: W.label, children: [
    /* @__PURE__ */ a("span", { className: W.name, children: e.name }),
    /* @__PURE__ */ a(M$, { role: t, node: e }),
    /* @__PURE__ */ a(Gt, { column: Kt[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ a(Gt, { column: Kt[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ a(Gt, { column: Kt[2], children: e.requestedVia ?? "" })
  ] });
}
function M$({ role: e, node: t }) {
  return /* @__PURE__ */ o(R, { children: [
    e && /* @__PURE__ */ a(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ a(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ a(m, { role: "warn", label: "Unresolved" })
  ] });
}
function B$({ index: e, depth: t, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ a(
    Hn,
    {
      index: e,
      depth: t,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ a(I$, { node: n }),
      children: s
    }
  );
}
function Ut({ className: e, text: t }) {
  return /* @__PURE__ */ a("span", { className: e, title: t, children: t });
}
function P$({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${W.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ a(Ut, { className: `${W.webMeta} ${W.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ a(Ut, { className: `${W.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ a(Ut, { className: `${W.webMeta} ${W.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function q$() {
  return /* @__PURE__ */ o("div", { className: W.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ a("span", { className: W.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: W.webColumns, children: [
      /* @__PURE__ */ a("span", { className: W.webGroup, children: "AD group" }),
      /* @__PURE__ */ a("span", { className: W.webPeople, children: "People" }),
      /* @__PURE__ */ a("span", { className: W.webVia, children: "Requested via" })
    ] })
  ] });
}
function O$({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${W.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ a("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ a(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ a(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function j$(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function D$({ rows: e, label: t }) {
  return /* @__PURE__ */ o("div", { className: W.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ a(q$, {}),
    /* @__PURE__ */ a(pm, { label: t ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ a(
      Hn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ a(O$, { row: n }),
        detail: /* @__PURE__ */ a(P$, { row: n }),
        expanded: j$(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function HT(e) {
  return "presentation" in e ? /* @__PURE__ */ a(D$, { ...e }) : /* @__PURE__ */ a(B$, { ...e });
}
const H$ = "_runbook_b9agc_2", F$ = "_list_b9agc_7", W$ = "_step_b9agc_15", z$ = "_numeral_b9agc_21", K$ = "_body_b9agc_28", G$ = "_head_b9agc_34", U$ = "_title_b9agc_40", V$ = "_detail_b9agc_45", Y$ = "_actions_b9agc_50", J$ = "_webList_b9agc_56", X$ = "_webStep_b9agc_60", Q$ = "_webBody_b9agc_66", Z$ = "_webTitle_b9agc_74", e0 = "_webDetail_b9agc_78", L = {
  runbook: H$,
  list: F$,
  step: W$,
  numeral: z$,
  body: K$,
  head: G$,
  title: U$,
  detail: V$,
  actions: Y$,
  webList: J$,
  webStep: X$,
  webBody: Q$,
  webTitle: Z$,
  webDetail: e0
}, kr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function $r(e) {
  return String(e + 1).padStart(2, "0");
}
function t0({ step: e, index: t, connection: n }) {
  const r = kr[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: L.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ a("span", { className: L.numeral, children: $r(t) }),
    /* @__PURE__ */ o("span", { className: L.body, children: [
      /* @__PURE__ */ o("span", { className: L.head, children: [
        /* @__PURE__ */ a("span", { className: L.title, children: e.title }),
        /* @__PURE__ */ a(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ a(Le, { startedAt: e.startedAt, connection: n })
      ] }),
      /* @__PURE__ */ a("span", { className: L.detail, children: e.detail })
    ] })
  ] });
}
function a0({ steps: e, actions: t, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ a("ol", { className: L.list, children: e.map((r, l) => /* @__PURE__ */ a(t0, { step: r, index: l, connection: n }, r.title)) }),
    t && /* @__PURE__ */ a("div", { className: L.actions, children: t })
  ] });
}
function n0({ step: e, index: t, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${L.step} ${L.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ a("span", { className: `${L.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: $r(t) }),
    /* @__PURE__ */ o("span", { className: `${L.body} ${L.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${L.head} ward-envrow`, children: [
        /* @__PURE__ */ a("span", { className: `${L.title} ${L.webTitle}`, children: e.title }),
        /* @__PURE__ */ a(m, { ...kr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ a(Le, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ a("span", { className: `${L.detail} ${L.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function r0({ steps: e, actions: t, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ a("ol", { className: `${L.list} ${L.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ a(n0, { step: r, index: l, connection: n }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ a("span", { className: `${L.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function FT(e) {
  return "presentation" in e ? /* @__PURE__ */ a(r0, { ...e }) : /* @__PURE__ */ a(a0, { ...e });
}
const l0 = "_list_1gu6a_2", o0 = "_check_1gu6a_10", i0 = "_body_1gu6a_16", s0 = "_text_1gu6a_23", c0 = "_pending_1gu6a_32", d0 = "_measured_1gu6a_37", Qe = {
  list: l0,
  check: o0,
  body: i0,
  text: s0,
  pending: c0,
  measured: d0
};
function u0(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function h0({ check: e }) {
  const t = u0(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Qe.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ a(ia, { state: t.state, label: t.label }),
    /* @__PURE__ */ o("span", { className: Qe.body, children: [
      /* @__PURE__ */ a("span", { className: Qe.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Qe.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ a("span", { className: Qe.measured, children: e.measured })
  ] });
}
function WT({ checks: e }) {
  return /* @__PURE__ */ a("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ a(h0, { check: t }, t.text)) });
}
const m0 = "_root_4aacj_2", w0 = "_list_4aacj_10", f0 = "_line_4aacj_26", _0 = "_at_4aacj_53", v0 = "_text_4aacj_57", b0 = "_foot_4aacj_61", p0 = "_idle_4aacj_73", g0 = "_caret_4aacj_81", y0 = "_jump_4aacj_88", _e = {
  root: m0,
  list: w0,
  line: f0,
  at: _0,
  text: v0,
  foot: b0,
  idle: p0,
  caret: g0,
  jump: y0
}, N0 = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function _a(e) {
  return Number.isNaN(Date.parse(e)) ? "" : N0.format(new Date(e));
}
const k0 = { warn: "warning", ok: "ok" };
function $0({ kind: e }) {
  const t = k0[e];
  return t === void 0 ? null : /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: t });
}
function C0({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("span", { children: `last event ${_a(e)}` });
}
function S0({ connection: e, idleSince: t, last: n, children: r }) {
  const l = [t, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${_a(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${_e.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ a("span", { className: `${_e.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ a("span", { className: _e.idle, children: i }),
    /* @__PURE__ */ a(C0, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const R0 = 8;
function T0(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > R0;
}
function x0({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ a("button", { type: "button", className: `${_e.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const Cr = ye(null);
function zT({ announce: e, onAnnounceChange: t, children: n }) {
  const [r, l] = p(!1), i = Qa(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ a(Cr.Provider, { value: i, children: n });
}
function L0() {
  const e = ge(Cr), [t, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [t, n];
}
function KT({ lines: e, connection: t, idleSince: n, label: r = "Live activity" }) {
  const l = _(null), [i, s] = p(0), [c, d] = L0(), [u, h] = p(!1), w = e.at(-1);
  C(() => {
    s(e.length);
  }, [e.length]), tt(() => {
    const y = l.current;
    y && !u && (y.scrollTop = y.scrollHeight);
  }, [e.length, u]);
  const f = () => {
    var P;
    const y = l.current;
    if (!y) return;
    const E = y.querySelectorAll("[data-consline-text]");
    (P = E.item(E.length - 1)) == null || P.focus(), h(!1);
  };
  return /* @__PURE__ */ o("div", { className: _e.root, children: [
    /* @__PURE__ */ a("ol", { className: _e.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, "data-empty": e.length === 0 || void 0, onScroll: (y) => h(T0(y.currentTarget)), children: e.map((y, E) => /* @__PURE__ */ o("li", { className: `${_e.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": E < i, children: [
      /* @__PURE__ */ a("span", { className: _e.at, children: _a(y.at) }),
      /* @__PURE__ */ a($0, { kind: y.kind }),
      /* @__PURE__ */ a("span", { className: _e.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${E}`)) }),
    /* @__PURE__ */ o(S0, { connection: t, idleSince: n, last: w, children: [
      /* @__PURE__ */ a("button", { type: "button", className: `${_e.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ a(x0, { shown: u, onJump: f })
    ] })
  ] });
}
const A0 = "_row_1k8wl_2", E0 = "_head_1k8wl_14", I0 = "_author_1k8wl_20", M0 = "_eta_1k8wl_25", B0 = "_edited_1k8wl_26", P0 = "_body_1k8wl_32", q0 = "_reason_1k8wl_37", O0 = "_actions_1k8wl_42", Ce = {
  row: A0,
  head: E0,
  author: I0,
  eta: M0,
  edited: B0,
  body: P0,
  reason: q0,
  actions: O0
}, j0 = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function D0(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function H0({ comment: e, reasonId: t, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a(b, { variant: "primary", size: "sm", onClick: n, children: "Edit" }),
    /* @__PURE__ */ a(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a(b, { variant: "ghost", size: "sm", onClick: n, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ a(b, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ a(b, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a(b, { variant: "secondary", size: "sm", onClick: n, children: "Edit" }),
    /* @__PURE__ */ a(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function F0({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ a("span", { className: Ce.reason, id: t, children: e })
  ] });
}
function W0(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function z0(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ a(H0, { ...e }) : /* @__PURE__ */ a(F0, { reason: e.unavailable, reasonId: e.unavailableId });
}
function GT(e) {
  const { comment: t } = e;
  W0(e);
  const n = N(), r = `${n}-unavailable`, l = j0[t.delivery];
  return /* @__PURE__ */ o("div", { className: `${Ce.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Ce.head, children: [
      /* @__PURE__ */ a("span", { className: Ce.author, children: t.author }),
      /* @__PURE__ */ a(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ a("span", { className: Ce.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ a("span", { className: Ce.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ a("p", { className: Ce.body, children: t.body }),
    /* @__PURE__ */ a("p", { className: Ce.reason, id: n, children: D0(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ a("div", { className: Ce.actions, children: /* @__PURE__ */ a(z0, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const K0 = "_root_rvhdw_2", G0 = "_attach_rvhdw_11", U0 = "_actions_rvhdw_17", V0 = "_reply_rvhdw_23", Y0 = "_replyField_rvhdw_28", J0 = "_send_rvhdw_54", X0 = "_sendIcon_rvhdw_65", Q0 = "_sendsAs_rvhdw_75", Oe = {
  root: K0,
  attach: G0,
  actions: U0,
  reply: V0,
  replyField: Y0,
  send: J0,
  sendIcon: X0,
  sendsAs: Q0
};
function Sr({ value: e, onChange: t }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, t ?? (() => {
  })];
}
function Z0() {
  return /* @__PURE__ */ a("svg", { className: Oe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ a("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function eC(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function tC(e) {
  const { placeholder: t, asUser: n, onPost: r } = e, [l, i] = Sr(e), s = N(), c = () => {
    l.trim() !== "" && r(n, l);
  }, d = (u) => {
    eC(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: Oe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Oe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ a(M, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: Oe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ a(Z0, {}),
        /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ a("p", { id: s, className: Oe.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function UT(e) {
  return e.variant === "reply" ? /* @__PURE__ */ a(tC, { ...e }) : /* @__PURE__ */ a(aC, { ...e });
}
function aC(e) {
  const { placeholder: t, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = Sr(e);
  return /* @__PURE__ */ o("div", { className: Oe.root, children: [
    /* @__PURE__ */ a(M, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: Oe.attach, children: [
      /* @__PURE__ */ a(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ a(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ a(
      un,
      {
        label: `Requeue ${l.agent} after posting`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Oe.actions, children: [
      /* @__PURE__ */ a(b, { variant: "primary", onClick: () => i(n, c), children: `Post as ${n}` }),
      s && /* @__PURE__ */ a(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const nC = "_list_1yhks_2", rC = "_item_1yhks_6", lC = "_body_1yhks_22", oC = "_text_1yhks_28", iC = "_evidence_1yhks_37", sC = "_consequence_1yhks_49", cC = "_note_1yhks_54", Ge = {
  list: nC,
  item: rC,
  body: lC,
  text: oC,
  evidence: iC,
  consequence: sC,
  note: cC
};
function dC({ criterion: e }) {
  return /* @__PURE__ */ a(He, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Va({ text: e }) {
  return /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: e });
}
function uC(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function hC({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Ge.body, children: [
    /* @__PURE__ */ a("span", { className: Ge.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ a(Va, { text: " · " }),
      /* @__PURE__ */ a("code", { className: Ge.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ a(Va, { text: " · " }),
      /* @__PURE__ */ a("span", { className: Ge.consequence, children: uC(e.why) })
    ] })
  ] });
}
function mC({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Ge.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ a(dC, { criterion: e }),
    /* @__PURE__ */ a(hC, { criterion: e })
  ] });
}
function VT({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ a("ul", { className: `${Ge.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ a(mC, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ a("p", { className: Ge.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const wC = "_list_dwhoz_2", fC = "_rung_dwhoz_6", _C = "_name_dwhoz_18", vC = "_actor_dwhoz_32", yt = {
  list: wC,
  rung: fC,
  name: _C,
  actor: vC
}, bC = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function pC({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = bC[e.state];
  return /* @__PURE__ */ o("li", { className: yt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ a("span", { className: yt.name, children: e.name }),
    /* @__PURE__ */ a(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ a("span", { className: `${yt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function YT({ rungs: e }) {
  return /* @__PURE__ */ a("ol", { className: `${yt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ a(pC, { rung: t }, t.name)) });
}
const gC = "_sheet_pw37w_2", yC = "_title_pw37w_9", NC = "_stage_pw37w_15", kC = "_effects_pw37w_20", $C = "_effect_pw37w_20", CC = "_numeral_pw37w_31", SC = "_effectText_pw37w_38", RC = "_refusals_pw37w_43", TC = "_reasons_pw37w_52", xC = "_reason_pw37w_52", LC = "_actions_pw37w_62", me = {
  sheet: gC,
  title: yC,
  stage: NC,
  effects: kC,
  effect: $C,
  numeral: CC,
  effectText: SC,
  refusals: RC,
  reasons: TC,
  reason: xC,
  actions: LC
};
function AC({ refused: e, reasonId: t, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ a(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ a(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function JT({ run: e, effects: t, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = N(), d = `${c}-refusal`, [u, h] = p(""), w = n.length > 0;
  return /* @__PURE__ */ a(nt, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: me.sheet, children: [
    /* @__PURE__ */ o("h2", { className: me.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ a("p", { className: me.stage, children: e.stage }),
    /* @__PURE__ */ a("ol", { className: me.effects, children: t.map((f, y) => /* @__PURE__ */ o("li", { className: me.effect, children: [
      /* @__PURE__ */ a("span", { className: me.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ a("span", { className: me.effectText, children: f })
    ] }, f)) }),
    /* @__PURE__ */ a(
      ah,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ a(M, { kind: "textarea", label: "Note for the agent", value: u, onChange: h }),
    w && /* @__PURE__ */ o("div", { className: me.refusals, children: [
      /* @__PURE__ */ a(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ a("ul", { className: me.reasons, children: n.map((f, y) => /* @__PURE__ */ a("li", { className: me.reason, id: y === 0 ? d : void 0, children: f.reason }, f.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: me.actions, children: [
      /* @__PURE__ */ a(AC, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ a(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const EC = "_list_ezew2_2", IC = "_path_ezew2_7", MC = "_head_ezew2_21", BC = "_label_ezew2_28", PC = "_consequence_ezew2_35", qC = "_ask_ezew2_36", et = {
  list: EC,
  path: IC,
  head: MC,
  label: BC,
  consequence: PC,
  ask: qC
}, Zt = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Ya(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Ja(e) {
  return e ? "primary" : "secondary";
}
function OC({ path: e, primary: t, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ a(b, { variant: Ja(t), size: "sm", onClick: () => n(e.kind), children: Zt[e.kind] }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a(b, { variant: Ja(t), size: "sm", disabled: !0, describedBy: r, children: Zt[e.kind] }),
    /* @__PURE__ */ a("span", { className: et.ask, id: r, children: e.askInstead })
  ] });
}
function jC({ path: e, primary: t, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: et.path, "data-allowed": e.allowed, "data-role": Ya(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: et.head, children: [
      /* @__PURE__ */ a("span", { className: et.label, children: e.title ?? Zt[e.kind] }),
      /* @__PURE__ */ a(m, { role: Ya(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ a("span", { className: et.consequence, children: e.consequence }),
    /* @__PURE__ */ a(OC, { path: e, primary: t, onChoose: n })
  ] });
}
function XT({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ a("ul", { className: et.list, children: e.map((n, r) => /* @__PURE__ */ a(jC, { path: n, primary: r === 0, onChoose: t }, n.kind)) });
}
const DC = "_list_1m7i0_2", HC = "_item_1m7i0_6", FC = "_node_1m7i0_18", WC = "_body_1m7i0_24", zC = "_head_1m7i0_30", KC = "_stage_1m7i0_36", GC = "_version_1m7i0_41", UC = "_sentence_1m7i0_49", VC = "_meta_1m7i0_54", Re = {
  list: DC,
  item: HC,
  node: FC,
  body: WC,
  head: zC,
  stage: KC,
  version: GC,
  sentence: UC,
  meta: VC
}, YC = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function JC({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Re.head, children: [
    /* @__PURE__ */ a("span", { className: Re.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ a("span", { className: Re.version, title: e.version, children: e.version }) : null
  ] });
}
function XC({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Re.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ a("span", { className: `${Re.node} ward-history-node`, children: /* @__PURE__ */ a(He, { size: 9, kind: YC[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Re.body} ward-history-stage`, children: [
      /* @__PURE__ */ a(JC, { entry: e }),
      /* @__PURE__ */ a("span", { className: Re.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Re.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${oe(e.cost)}`
      ] })
    ] })
  ] });
}
function QT({ entries: e }) {
  return /* @__PURE__ */ a("ol", { className: `${Re.list} ward-history`, children: e.map((t, n) => /* @__PURE__ */ a(XC, { entry: t }, t.stage + String(n))) });
}
const QC = "_thread_1e70p_3", ZC = "_turn_1e70p_8", eS = "_who_1e70p_27", tS = "_body_1e70p_32", Nt = {
  thread: QC,
  turn: ZC,
  who: eS,
  body: tS
}, Rr = ye(!1);
function ZT({ children: e, density: t }) {
  return /* @__PURE__ */ a(Rr.Provider, { value: !0, children: /* @__PURE__ */ a("ol", { className: `${Nt.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function e2({ turn: e }) {
  if (!ge(Rr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${Nt.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${Nt.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ a("p", { className: `${Nt.body} ward-chat-body`, children: e.body })
  ] });
}
const aS = "_list_yiolt_3", nS = "_row_yiolt_7", rS = "_label_yiolt_20", lS = "_n_yiolt_26", oS = "_cause_yiolt_33", ot = {
  list: aS,
  row: nS,
  label: rS,
  n: lS,
  cause: oS
};
function iS(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const sS = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function cS({ row: e, formatNumber: t }) {
  return iS(e), /* @__PURE__ */ o("li", { className: `${ot.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ a(He, { size: 8, ...sS[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ a("span", { className: ot.label, children: e.label }),
    /* @__PURE__ */ a("span", { className: `${ot.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ a(dS, { cause: e.cause })
  ] });
}
function dS({ cause: e }) {
  return e ? /* @__PURE__ */ a("span", { className: `${ot.cause} ward-healthrow-cause`, children: e }) : null;
}
function t2({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ a("ul", { className: `${ot.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ a(cS, { row: n, formatNumber: t }, n.label)) });
}
const uS = "_root_1jxwp_2", hS = {
  root: uS
};
function a2({ items: e, note: t, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: hS.root, "data-density": l, children: [
    /* @__PURE__ */ a(jt, { items: e, note: t, density: l }),
    /* @__PURE__ */ a(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const mS = "_row_dhbre_3", wS = "_key_dhbre_13", fS = "_stack_dhbre_24", _S = "_value_dhbre_32", vS = "_evidence_dhbre_39", bS = "_mark_dhbre_47", Xe = {
  row: mS,
  key: wS,
  stack: fS,
  value: _S,
  evidence: vS,
  mark: bS
};
function pS({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ a(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ a(ia, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function n2({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ a("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ a("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ a("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ a("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ a(pS, { state: e.state }) })
  ] });
}
const gS = "_cell_gh2sd_2", yS = {
  cell: gS
}, NS = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function kS(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function $S(e, t) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (t && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function CS(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: kS(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function SS(e) {
  return e.map((t, n) => ({ ...t, id: t.id ?? String(n) }));
}
function r2({ rows: e, empty: t, requireNoRerunReason: n = !0 }) {
  $S(e, n);
  const r = SS(e);
  return /* @__PURE__ */ a(
    _h,
    {
      label: "Rejection routing",
      columns: NS,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ a("span", { className: yS.cell, "data-norerun": l.noRerun ? !0 : void 0, children: CS(l, i) }),
      empty: t ?? /* @__PURE__ */ a(lw, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const RS = "_row_1f2re_2", TS = "_title_1f2re_12", xS = "_turns_1f2re_18", LS = "_waiting_1f2re_19", AS = "_resolved_1f2re_20", ES = "_activity_1f2re_21", IS = "_cost_1f2re_28", MS = "_link_1f2re_29", BS = "_tableLink_1f2re_47", PS = "_tableRecord_1f2re_48", qS = "_tableRow_1f2re_59", OS = "_tableTitle_1f2re_71", jS = "_tableResolved_1f2re_76", DS = "_tableMeta_1f2re_87", HS = "_tableCost_1f2re_94", FS = "_tableActivity_1f2re_95", WS = "_tableState_1f2re_105", j = {
  row: RS,
  title: TS,
  turns: xS,
  waiting: LS,
  resolved: AS,
  activity: ES,
  cost: IS,
  link: MS,
  tableLink: BS,
  tableRecord: PS,
  tableRow: qS,
  tableTitle: OS,
  tableResolved: jS,
  tableMeta: DS,
  tableCost: HS,
  tableActivity: FS,
  tableState: WS
}, Tr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function zS(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const n = Math.floor(t / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function KS(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function GS(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const US = { duplicate: "Closed · duplicate" };
function VS({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a(at, { className: j.tableMeta, text: `waiting on ${e}` });
}
function YS({ value: e }) {
  return /* @__PURE__ */ a("td", { className: j.tableCost, children: e === void 0 ? null : oe(e) });
}
function JS({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("a", { className: `${j.tableRecord} ward-target`, href: H(e.href), children: `→ ${e.key}` });
}
function XS({ session: e, href: t }) {
  const n = Tr[e.state];
  return /* @__PURE__ */ o("tr", { className: j.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: j.tableTitle, children: [
      /* @__PURE__ */ a("a", { className: `${j.tableLink} ward-target`, href: H(t), children: /* @__PURE__ */ a(at, { text: e.title }) }),
      /* @__PURE__ */ a("span", { className: j.tableMeta, children: KS(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: j.tableResolved, children: [
      GS(e.resolved),
      /* @__PURE__ */ a(VS, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ a(YS, { value: e.cost }),
    /* @__PURE__ */ a("td", { className: j.tableActivity, children: zS(e.lastActivity) }),
    /* @__PURE__ */ a("td", { className: j.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ a(m, { role: n.role, label: US[e.state] ?? n.label }),
      /* @__PURE__ */ a(JS, { link: e.link })
    ] }) })
  ] });
}
function QS({ session: e }) {
  const t = Tr[e.state];
  return /* @__PURE__ */ o("div", { className: j.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ a(at, { className: j.title, text: e.title }),
    /* @__PURE__ */ a("span", { className: j.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ a(at, { className: j.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ a("span", { className: j.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ a("span", { className: j.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : oe(e.cost) }),
    /* @__PURE__ */ a("span", { className: j.activity, children: he(e.lastActivity) }),
    e.link && /* @__PURE__ */ a("a", { className: j.link, href: H(e.link.href), children: e.link.key }),
    /* @__PURE__ */ a(m, { role: t.role, label: t.label })
  ] });
}
function l2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ a(XS, { session: e.session, href: e.href }) : /* @__PURE__ */ a(QS, { session: e.session });
}
const ZS = "_block_1yy2v_3", eR = "_list_1yy2v_9", tR = "_line_1yy2v_14", ea = {
  block: ZS,
  list: eR,
  line: tR
}, aR = { warn: "warning", ok: "ok" };
function nR({ kind: e }) {
  const t = aR[e];
  return t === void 0 ? null : /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: t });
}
function rR({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${ea.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ a(nR, { kind: t }),
    /* @__PURE__ */ a("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function o2({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ a("div", { className: `${ea.block} ward-typed`, children: /* @__PURE__ */ a("ol", { className: ea.list, "aria-label": t, children: e.map((n, r) => /* @__PURE__ */ a(rR, { line: n }, `${r}-${n.text}`)) }) });
}
const lR = "_band_tt7hp_1", oR = "_head_tt7hp_8", iR = "_cell_tt7hp_19", sR = "_index_tt7hp_35", cR = "_title_tt7hp_42", dR = "_note_tt7hp_48", uR = "_cellTitle_tt7hp_53", hR = "_cellBody_tt7hp_58", mR = "_tag_tt7hp_64", $e = {
  band: lR,
  head: oR,
  cell: iR,
  index: sR,
  title: cR,
  note: dR,
  cellTitle: uR,
  cellBody: hR,
  tag: mR
}, Xa = 4;
function i2({ index: e, title: t, note: n, cells: r }) {
  if (r.length !== Xa)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Xa}-cell grid`);
  return /* @__PURE__ */ o("section", { className: $e.band, "aria-label": `${e} ${t}`, children: [
    /* @__PURE__ */ o("div", { className: $e.head, children: [
      /* @__PURE__ */ a("span", { className: $e.index, children: e }),
      /* @__PURE__ */ a("span", { className: $e.title, children: t }),
      /* @__PURE__ */ a("span", { className: $e.note, children: n })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: $e.cell, children: [
      /* @__PURE__ */ a("span", { className: $e.cellTitle, children: l.title }),
      /* @__PURE__ */ a("span", { className: $e.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ a("span", { className: $e.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  $R as ACCENT_PRESETS,
  KR as ActionStack,
  KT as ActivityConsole,
  ER as AdminIcon,
  Nv as AgentCard,
  MR as AppShell,
  xT as AppearanceStrip,
  i2 as Band,
  FR as BarChart,
  Dw as BoardColumn,
  sT as BoardFootnote,
  cT as BoardHeader,
  LR as BoardIcon,
  ZR as BoardScroller,
  b as Btn,
  kR as CHIP_ROLES,
  mr as CREDENTIAL_COLUMNS,
  HR as Callout,
  LT as CapabilityRow,
  tT as CardGrid,
  e2 as ChatMessage,
  un as Checkbox,
  m as Chip,
  at as ClampText,
  GT as ClarificationRow,
  pT as ClauseRuleRow,
  bT as ClauseRules,
  Un as ColourLadder,
  AT as ComponentRow,
  UT as Composer,
  uT as ConfigRow,
  dT as ConfigRowHead,
  sa as ConnectionMark,
  zT as ConsoleAnnounceProvider,
  ZT as Conversation,
  ah as CostMeter,
  IT as CredentialRow,
  ET as CredentialRowHead,
  VT as CriteriaList,
  Qi as Crumb,
  CR as DENSITIES,
  t2 as DeliveryHealth,
  nT as DeniedState,
  TR as DisabledScope,
  yT as DryRunRail,
  lw as EmptyState,
  MT as EnvCard,
  M as Field,
  aT as FilteredEmpty,
  XR as FormStack,
  jt as GateChecklist,
  YT as GateLadder,
  _h as Grid,
  kT as HandoffRuleRow,
  NT as HandoffRules,
  xR as HomeIcon,
  hT as ItemDrawer,
  BT as KeyPanel,
  Jr as LIVE_EVENT_TYPES,
  z_ as LegacyBoardColumn,
  wT as LegacyBoardHeader,
  fT as LegacyConfigRow,
  vT as LegacyItemDrawer,
  q_ as LegacyOverCapNote,
  _T as LegacyPreviewRail,
  zn as LegacyWorkCard,
  Le as LiveIndicator,
  rT as LoadFailed,
  iT as Loading,
  pr as MCP_SERVER_COLUMNS,
  ia as Mark,
  qT as MarkUpload,
  He as Marker,
  jT as McpServerRow,
  OT as McpServerRowHead,
  Sn as Menu,
  kn as MenuButton,
  $T as NewStreamModal,
  cw as OverCapNote,
  la as OverflowRow,
  nt as Overlay,
  gT as PARTIAL_STEP_REASON,
  gr as POLICY_CHIP_WIDTH,
  VR as PageFrame,
  DR as PageHeader,
  WR as PlainList,
  DT as PolicyRow,
  mT as PreviewRail,
  Kt as ROLE_MATRIX_COLUMNS,
  lr as RULE_ACTIONS,
  Pn as Radio,
  a2 as ReadyChecklist,
  JR as RecordSection,
  JT as RequeueSheet,
  XT as ResolveBlock,
  n2 as ResolvedFieldRow,
  HT as RoleMatrixRow,
  r2 as RoutingTable,
  CT as RuleRow,
  FT as RunbookSteps,
  Yr as STREAM_STEPS,
  QR as SectionBand,
  Ma as SectionHeader,
  Mn as SegmentedControl,
  pn as Select,
  l2 as SessionRow,
  qR as Sidebar,
  IR as SidebarFoldButton,
  ST as StageColumn,
  eT as StageGrid,
  QT as StageHistory,
  ng as StageListEditor,
  lT as StaleStrip,
  Pt as StatStrip,
  GR as StatTiles,
  jR as StreamAvatar,
  RT as StreamRow,
  AR as StudioIcon,
  YR as SubjectRail,
  Ue as Switch,
  PR as TabLinks,
  zR as TableHead,
  BR as Tabs,
  pR as ThemeProvider,
  TT as ToolRow,
  UR as TopBar,
  pm as Tree,
  Hn as TreeRow,
  o2 as TypedInputBlock,
  qo as UNSAFE_HREF,
  WT as ValidationList,
  vR as VisibilityProvider,
  bR as Visible,
  NR as WARD_VERSION,
  Ot as WorkCard,
  oT as WriteUnavailableStrip,
  zS as agoSince,
  Pr as clock,
  gg as colourStatus,
  ae as count,
  ue as duration,
  ta as elapsed,
  yR as eventSourceTransport,
  It as isStreamStep,
  ct as isValidatedStreamStep,
  Qv as ladderValidation,
  zk as mcpConnectionChip,
  Fk as mcpToolName,
  oe as money,
  ve as ms,
  Fn as ordered,
  en as ratio,
  d1 as restartLabel,
  H as safeHref,
  he as stamp,
  aa as stream,
  SR as streamChip,
  Bt as streamChipProps,
  pe as streamColour,
  Zr as streamHex,
  Ct as streamInitials,
  Xr as streamVars,
  OR as uniqueStreamInitials,
  fn as useAnchoredPanel,
  bt as useBorderFlash,
  Ae as useDisabledScope,
  Gr as useFocusTrap,
  RR as useLiveFeed,
  gR as useReturnFocus,
  Et as useRovingTabindex,
  na as useTicker,
  qr as useVisible,
  z as v,
  PT as validateMark,
  ht as validatedStep,
  an as validatedStreamSteps
};
