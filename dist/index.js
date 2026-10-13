import { jsx as a, Fragment as R, jsxs as o } from "react/jsx-runtime";
import { useMemo as Qa, useContext as ge, createContext as ye, useState as p, useEffect as C, useCallback as Q, useRef as _, useLayoutEffect as tt, useId as N, isValidElement as Cr, Children as Sr, Fragment as Rr } from "react";
import { createPortal as Tr, flushSync as Za } from "react-dom";
function de(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const n = Math.floor(e / 36e5);
  return n < 24 ? `${n}h ${t % 60}m` : `${Math.floor(n / 24)}d ${n % 24}h`;
}
const va = (e) => String(e).padStart(2, "0");
function aa(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const n = Math.floor(t / 60);
  return n < 60 ? `${n}m ${va(t % 60)}s` : `${Math.floor(n / 60)}h ${va(n % 60)}m`;
}
const xr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ue(e) {
  const t = xr.formatToParts(new Date(e)), n = (r) => {
    var l;
    return ((l = t.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${n("day")} ${n("month")} ${n("hour")}:${n("minute")}`;
}
function le(e) {
  return e > 0 && e < 5e-3 ? "<$0.01" : e < 10 ? e.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : `$${Math.round(e).toLocaleString("en-US")}`;
}
function te(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function en(e, t) {
  return `${e} / ${t}`;
}
const Lr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Ar(e) {
  return Lr.format(new Date(e));
}
const tn = ye(/* @__PURE__ */ new Set());
function cR({ hidden: e, children: t }) {
  const n = Qa(() => new Set(e), [e]);
  return /* @__PURE__ */ a(tn.Provider, { value: n, children: t });
}
function Er(e) {
  return !ge(tn).has(e);
}
function dR({ id: e, children: t, fallback: n = null }) {
  return /* @__PURE__ */ a(R, { children: Er(e) ? t : n });
}
const Ir = "(prefers-color-scheme: dark)";
function ba() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Ir) : null;
}
function Mr(e) {
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
function Ht(e, t) {
  C(() => {
    const n = document.documentElement;
    return n.setAttribute(e, t), () => n.removeAttribute(e);
  }, [e, t]);
}
function Br(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function uR({ theme: e, accent: t = "green", density: n = "comfortable", children: r }) {
  const l = Mr(e === "system");
  return Ht("data-theme", Br(e, l)), Ht("data-accent", t), Ht("data-density", n), /* @__PURE__ */ a(R, { children: r });
}
const Pr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function qr(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function Or(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function jr(e, t, n, r) {
  return e.shiftKey ? qr(t, n) ? r : void 0 : document.activeElement === r || Or(t) ? n : void 0;
}
function Dr(e, t, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = jr(e, t, r, l);
  i && (e.preventDefault(), i.focus());
}
function Hr(e) {
  return { onKeyDown: Q(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Pr));
      Dr(n, e.current, r);
    },
    [e]
  ) };
}
function hR(e, t = !0) {
  C(() => {
    if (!t) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [t, e]);
}
const pa = { ArrowUp: -1, ArrowDown: 1 }, ga = { ArrowLeft: -1, ArrowRight: 1 }, Fr = (e, t, n) => Math.min(n, Math.max(t, e));
function zr(e, t) {
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
  const i = Q((u) => n(u), []), s = Q((u) => {
    var h;
    n(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = Q(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(t)), f = zr(u.key, e);
      f !== void 0 ? (u.preventDefault(), s(h[Fr(w + f, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [t, s, e]
  ), d = Q(
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
const mR = (e, t, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, wR = "0.2.0", fR = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Wr = [1, 2, 3, 4, 5, 6], an = [1, 2, 3], Kr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], _R = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], vR = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], W = {
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
}, _e = {
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
function na(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function It(e) {
  return Wr.includes(e);
}
function ct(e) {
  return an.includes(e);
}
function Gr(e) {
  if (!It(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function bR(e) {
  if (!It(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Ur = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Vr(e) {
  if (!It(e)) throw new Error("unvalidated stream step");
  return Ur[e];
}
function ya(e) {
  return typeof e != "string" ? null : Kr.includes(e) ? e : null;
}
function Yr(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function Jr(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function Xr(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Qr(e, t, n) {
  const r = Yr(e);
  if (r === null) return null;
  const l = ya(n) ?? ya(r.type);
  return l === null ? null : { ...r, type: l, id: Jr(r, t), at: Xr(r) };
}
function Zr(e, t) {
  return e >= _e.staleAfter ? "stale" : e >= _e.heartbeat && t === "live" ? "reconnecting" : null;
}
function el(e, t, n) {
  return e >= _e.heartbeat && !t && n !== null;
}
function pR(e, t) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = _(/* @__PURE__ */ new Map()), c = _(0), d = _(""), u = _(0), h = _(null), w = _(0), f = _(0), y = _(!1), E = _("reconnecting"), P = Q((T) => {
    E.current = T, r(T);
  }, []), ae = Q(() => {
    c.current = Date.now();
  }, []), Ne = Q((T) => {
    for (const [U, ke] of s.current)
      (ke === "*" || T.itemKey === ke) && U(T);
  }, []), ne = Q(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (T, U, ke) => {
        const Fe = Qr(T, U, ke);
        Fe !== null && (Fe.id && (d.current = Fe.id), ae(), y.current = !1, P("live"), i(Fe.at), Ne(Fe));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, ae(), P("live");
      },
      onError: () => {
        var U;
        (U = h.current) == null || U.close(), h.current = null, y.current = !0, E.current !== "stale" && P("reconnecting");
        const T = Math.min(_e.reconnectBase * 2 ** u.current, _e.reconnectMax);
        u.current += 1, w.current = window.setTimeout(ne, T);
      }
    });
  }, [Ne, P, ae, t, e]), Ee = Q((T) => {
    y.current = !0, T.close(), h.current = null, w.current = window.setTimeout(ne, _e.reconnectBase);
  }, [ne]), Ve = Q((T, U) => (s.current.set(U, T), () => {
    s.current.delete(U);
  }), []);
  return C(() => (ne(), f.current = window.setInterval(() => {
    const T = Date.now() - c.current, U = Zr(T, E.current);
    U && P(U);
    const ke = h.current;
    el(T, y.current, ke) && Ee(ke);
  }, _e.tick), () => {
    var T;
    window.clearInterval(f.current), window.clearTimeout(w.current), y.current = !1, (T = h.current) == null || T.close(), h.current = null;
  }), [ne, Ee, P]), { connection: n, lastEventAt: l, subscribe: Ve };
}
function ra(e, t) {
  const n = new Date(e).getTime(), [r, l] = p(() => Date.now());
  return C(() => {
    if (!t) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    i();
    const s = window.setInterval(i, _e.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", i);
    };
  }, [t, n]), Math.max(0, r - n);
}
const tl = { blue: "running", orange: "waiting", green: "done" };
function al() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Na(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function bt(e, t) {
  const n = _(0), r = Q((l) => {
    const i = l ?? t, s = e.current;
    s !== null && i !== void 0 && (al() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${tl[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => Na(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => Na(s), _e.flash)));
  }, [t, e]);
  return C(() => () => window.clearTimeout(n.current), []), t === void 0 ? (l) => r(l) : () => r(t);
}
const nl = "_root_1otpc_2", rl = {
  root: nl
};
function ll(e, t, n, r, l) {
  const i = [aa(t)];
  return e || i.push(`as of ${Ar(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Le({ startedAt: e, lastEvent: t, connection: n, turn: r }) {
  const l = n !== "stale", i = ra(e, l), s = (t == null ? void 0 : t.at) ?? e, c = ll(l, i, s, r, t);
  return /* @__PURE__ */ o("span", { className: `${rl.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ a("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      ue(e)
    ] })
  ] });
}
const ol = "_app_1o4lz_1", il = "_side_1o4lz_35", sl = "_sideTop_1o4lz_46", cl = "_sideBody_1o4lz_60", dl = "_iconRail_1o4lz_99", ul = "_railItem_1o4lz_108", hl = "_railIcon_1o4lz_129", ml = "_railDot_1o4lz_134", wl = "_railLetter_1o4lz_140", fl = "_main_1o4lz_146", _l = "_rail_1o4lz_108", vl = "_page_1o4lz_168", bl = "_headerRow_1o4lz_191", pl = "_sidebarToggle_1o4lz_198", gl = "_headerSlot_1o4lz_203", yl = "_drawerSide_1o4lz_208", Nl = "_root_1o4lz_255", kl = "_topbar_1o4lz_262", $l = "_mark_1o4lz_273", Cl = "_brand_1o4lz_280", Sl = "_tagline_1o4lz_286", Rl = "_identity_1o4lz_292", Tl = "_tools_1o4lz_293", xl = "_nav_1o4lz_303", Ll = "_metadata_1o4lz_310", Al = "_actor_1o4lz_325", El = "_detail_1o4lz_326", Il = "_content_1o4lz_371", Ml = "_toolsPanel_1o4lz_387", Bl = "_skip_1o4lz_413", $ = {
  app: ol,
  side: il,
  sideTop: sl,
  sideBody: cl,
  iconRail: dl,
  railItem: ul,
  railIcon: hl,
  railDot: ml,
  railLetter: wl,
  main: fl,
  rail: _l,
  page: vl,
  headerRow: bl,
  sidebarToggle: pl,
  headerSlot: gl,
  drawerSide: yl,
  root: Nl,
  topbar: kl,
  mark: $l,
  brand: Cl,
  tagline: Sl,
  identity: Rl,
  tools: Tl,
  nav: xl,
  metadata: Ll,
  actor: Al,
  detail: El,
  content: Il,
  toolsPanel: Ml,
  skip: Bl
};
function dt(...e) {
  const t = e.filter((n) => n !== void 0 && n !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const Pl = "_scope_1an6i_2", ql = {
  scope: Pl
}, nn = ye(null);
function gR({ reason: e, actions: t = "disable", children: n }) {
  const r = N();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${ql.scope} ward-disabled-scope`, children: [
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
const Ol = "_btn_tzr89_2", jl = "_primary_tzr89_14", Dl = "_destructive_tzr89_25", Hl = "_secondary_tzr89_35", Fl = "_ghost_tzr89_40", zl = "_overflow_tzr89_49", Wl = "_sm_tzr89_56", Kl = "_disabled_tzr89_60", mt = {
  btn: Ol,
  primary: jl,
  destructive: Dl,
  secondary: Hl,
  ghost: Fl,
  overflow: zl,
  sm: Wl,
  disabled: Kl
};
function Gl(e, t, n, r) {
  const l = t === "sm" ? [mt.sm, "ward-btn--sm"] : [], i = n ? [mt.disabled] : [];
  return [mt.btn, mt[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Ul(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Vl(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Yl(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function Jl(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Xl(e, t, n) {
  return Jl(e.describedBy, t && n);
}
function Ql({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ a("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Zl(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Ae()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ a(eo, { ...e });
}
function eo(e) {
  const t = Ae();
  Vl(e, t);
  const n = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || t), i = Yl(e, t), s = N();
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: e.type ?? "button",
        className: Gl(n, r, l, e.className),
        "data-ward-btn": n,
        "data-ward-size": r,
        disabled: l,
        title: i,
        "aria-describedby": Xl(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Ul(n, e.controls),
        children: Zl(e)
      }
    ),
    /* @__PURE__ */ a(Ql, { id: s, reason: i })
  ] });
}
let la = "none";
function to(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (la = "key");
}
typeof document < "u" && (document.addEventListener("keydown", to, !0), document.addEventListener("pointerdown", () => {
  la = "pointer";
}, !0));
function ao() {
  return la === "key";
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
const no = "_scrim_1cawq_2", ro = "_drawer_1cawq_10", lo = "_sheet_1cawq_14", oo = "_modal_1cawq_18", io = "_panel_1cawq_23", so = "_start_1cawq_44", co = "_header_1cawq_67", uo = "_title_1cawq_75", ho = "_body_1cawq_79", mo = "_close_1cawq_106", Te = {
  scrim: no,
  drawer: ro,
  sheet: lo,
  modal: oo,
  panel: io,
  start: so,
  header: co,
  title: uo,
  body: ho,
  close: mo
}, wo = ye(null), kt = [], $t = /* @__PURE__ */ new Map();
function fo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function _o(e, t) {
  let n = $t.get(t);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, $t.set(t, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function vo(e, t, n) {
  for (const r of Array.from(t.children))
    r !== n && !fo(r) && _o(e, r);
}
function bo(e, t) {
  let n = null, r = t;
  for (; r; ) {
    if (vo(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function po(e) {
  for (const t of e.claims) {
    const n = $t.get(t);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || t.removeAttribute("inert"), $t.delete(t)));
  }
}
function go(e, t) {
  const n = { root: e, claims: [] };
  return kt.push(n), bo(n, t), n;
}
function yo(e) {
  const t = kt.indexOf(e);
  t >= 0 && kt.splice(t, 1), po(e);
}
function ka(e) {
  return e !== null && kt.at(-1) === e;
}
function No(e, t, n) {
  const r = _(null), l = _(n);
  return l.current = n, C(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = go(i, t);
    return r.current = c, () => {
      var u, h;
      const d = ka(c);
      yo(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), Q(() => ka(r.current), []);
}
function ko(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function $o(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Co({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ a("div", { className: `${Te.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("header", { className: `${Te.header} ward-drawer-head`, children: /* @__PURE__ */ a("h2", { className: `${Te.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ a("div", { className: `${Te.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function So(e) {
  return `${Te.scrim} ${Te[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Ro(e, t) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Te.panel} ${Te[e]} ward-overlay-panel${n}${r}`;
}
function To(e) {
  const t = ge(wo);
  return e ?? t ?? document.body;
}
function nt(e) {
  const t = _(null), n = _(null), r = N(), l = To(e.container), i = it("(min-width: 768px)"), s = ko(e.kind, i), c = $o(e, r), d = Hr(n), [u] = p(ao), h = No(t, l, e.returnFocusTo), w = Q(() => {
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
  }, [w]), Tr(
    /* @__PURE__ */ a(
      "div",
      {
        ref: t,
        className: So(s),
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
            className: Ro(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => h() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ a("button", { type: "button", className: `${Te.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ a(Co, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const xo = /^([a-z][a-z0-9+.-]*):/i, Lo = /* @__PURE__ */ new Set(["http", "https"]), Ao = "#";
function Eo(e) {
  var r, l;
  const t = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < t.length && t.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = xo.exec(t.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function H(e) {
  const t = Eo(e);
  return t === void 0 || Lo.has(t) ? e : Ao;
}
function Io(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function rn(e) {
  const t = Io(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function Mo(e, t) {
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
function Bo(e, t) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + t.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function ln(e, t, n) {
  tt(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[t];
    if (!r || !l) return;
    const i = Bo(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), rn(r);
  }, [e, t, n]);
}
const Po = "_row_160e9_2", qo = {
  row: Po
};
function Oo(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Bt({ label: e, children: t, count: n, as: r = "div", focusable: l = !0, rowRef: i, className: s, ...c }) {
  const d = _(null), u = i ?? d;
  return Mo(u, n), /* @__PURE__ */ a(r, { ref: u, className: [qo.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Oo(l, r), ...c, children: t });
}
const jo = "_icon_1ylqy_2", Do = {
  icon: jo
};
function ut({ children: e }) {
  return /* @__PURE__ */ a("svg", { className: Do.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function yR() {
  return /* @__PURE__ */ a(ut, { children: /* @__PURE__ */ a("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function NR() {
  return /* @__PURE__ */ o(ut, { children: [
    /* @__PURE__ */ a("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ a("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ a("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function kR() {
  return /* @__PURE__ */ o(ut, { children: [
    /* @__PURE__ */ a("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ a("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function $R() {
  return /* @__PURE__ */ a(ut, { children: /* @__PURE__ */ a("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Ho() {
  return /* @__PURE__ */ o(ut, { children: [
    /* @__PURE__ */ a("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ a("path", { d: "M9 4v16" })
  ] });
}
const on = "ward:sidebar-collapsed", Fo = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function zo() {
  try {
    return window.localStorage.getItem(on) === "true";
  } catch {
    return !1;
  }
}
function Wo(e) {
  try {
    window.localStorage.setItem(on, String(e));
  } catch {
  }
}
function Ko(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Go(e) {
  return e instanceof Element && e.closest(Fo) !== null;
}
function Uo(e) {
  return e.key === "[" && !Ko(e) && !Go(e.target);
}
function Vo(e) {
  const [t, n] = p(zo), r = () => {
    Wo(!t), n(!t);
  };
  return C(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!Uo(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, t]), { collapsed: t, toggle: r };
}
function Yo() {
  const e = it("(max-width: 767.98px)"), t = it("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function Jo(e) {
  const t = e === "phone", n = N(), r = _(null), [l, i] = p(!1);
  return l && !t && i(!1), { narrow: t, open: l, drawerId: n, slotRef: r, toggle: () => i(!l), close: () => i(!1) };
}
function Xo({ header: e, label: t, drawer: n }) {
  return n.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ a("span", { ref: n.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ a(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.drawerId, children: t }) }),
    /* @__PURE__ */ a("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function Qo(e, t) {
  C(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function Zo({ sidebar: e, label: t, drawer: n }) {
  var l;
  if (Qo(n.open, n.close), !n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ a(nt, { kind: "start", id: n.drawerId, title: t, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ a("div", { className: $.drawerSide, onClick: r, children: sn(e, !1) }) });
}
function ei(e) {
  const [t, n] = p(!1);
  return t && e !== "medium" && n(!1), { open: t, toggle: () => n(!t) };
}
function ti(e, t) {
  const n = Vo(e === "wide" && !t), r = ei(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && n.collapsed, toggle: n.toggle };
}
function ai(e, t) {
  const n = ti(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return ri(e.collapsed, t);
  const r = n.collapsed, l = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: l, drawsStrip: !l && typeof e.sidebar == "function", toggle: n.toggle };
}
const ni = (e) => e.collapsed && e.drawsStrip;
function ri(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const $a = (e) => e ? "" : void 0;
function sn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function cn({ fold: e }) {
  return /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ a(Ho, {}),
    /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function li({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ a("div", { className: $.sideTop, children: /* @__PURE__ */ a(cn, { fold: e }) });
}
const dn = ye(null);
function CR() {
  const e = ge(dn);
  return e === null || !e.enabled ? null : /* @__PURE__ */ a(cn, { fold: e });
}
function oi({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ a("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ a("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": na(e.streamStep).id } }) : /* @__PURE__ */ a("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function ii({ items: e, label: t }) {
  return /* @__PURE__ */ a("nav", { className: $.iconRail, "aria-label": t, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: H(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ a(oi, { item: n }),
    /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function si({ sidebar: e, label: t, iconRail: n, fold: r, inSidebar: l }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ a(li, { fold: r, inSidebar: l && !i }),
    /* @__PURE__ */ a("div", { className: $.sideBody, hidden: i, children: sn(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ a(ii, { items: n ?? [], label: t })
  ] });
}
const ci = (e) => e != null;
function di(e) {
  const { sidebar: t, header: n, children: r, rail: l, iconRail: i, pageFill: s } = e, c = ci(l), d = Yo(), u = Jo(d), h = ai(e, d), w = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(c), "data-collapsed": String(h.collapsed), "data-consumer-fold": $a(ni(h)), "data-band": d, children: [
    !u.narrow && /* @__PURE__ */ a(dn.Provider, { value: h, children: /* @__PURE__ */ a(si, { sidebar: t, label: w, iconRail: i, fold: h, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ o("main", { className: $.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ a(Xo, { header: n, label: w, drawer: u }),
      /* @__PURE__ */ a("div", { className: $.page, "data-fill": $a(s === !0), children: r })
    ] }),
    c && /* @__PURE__ */ a("div", { className: $.rail, children: l }),
    /* @__PURE__ */ a(Zo, { sidebar: t, label: w, drawer: u })
  ] });
}
function ui({ destinations: e, active: t }) {
  const n = _(null);
  return ln(n, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ a(Bt, { as: "nav", rowRef: n, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ a("a", { href: H(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function Yt({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ a("span", { className: t, children: e });
}
function hi({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ a(Yt, { value: e, className: $.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ a("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ a(Yt, { value: t, className: $.detail })
  ] });
}
function mi() {
  const e = it("(max-width: 767.98px)"), t = N(), n = _(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: t, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function wi({ tools: e, toolsLabel: t, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ a("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ a(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ a("span", { className: $.tools, children: e });
}
function fi({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ a("div", { id: t.panelId, className: $.toolsPanel, hidden: !t.open, onKeyDown: n, children: e });
}
function _i(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ a("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ a("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ a(Yt, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ a(ui, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ a("span", { className: $.identity, children: /* @__PURE__ */ a(hi, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ a(wi, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function vi(e) {
  const t = N(), n = mi();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ a("a", { className: $.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ a(_i, { ...e, menu: n }),
    /* @__PURE__ */ a(fi, { tools: e.tools, menu: n }),
    /* @__PURE__ */ a("div", { id: t, className: $.content, children: e.children })
  ] });
}
function bi(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function SR(e) {
  return bi(e) ? /* @__PURE__ */ a(di, { ...e }) : /* @__PURE__ */ a(vi, { ...e });
}
const pi = "_root_itg9o_2", gi = "_row_itg9o_8", yi = "_box_itg9o_14", Ni = "_label_itg9o_21", ki = "_labelHidden_itg9o_26", $i = "_lockedNote_itg9o_36", Ci = "_consequence_itg9o_44", Si = "_sample_itg9o_79", Be = {
  root: pi,
  row: gi,
  box: yi,
  label: Ni,
  labelHidden: ki,
  lockedNote: $i,
  consequence: Ci,
  sample: Si
};
function Ri(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function Ti({ id: e, text: t }) {
  return t ? /* @__PURE__ */ a("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: t }) : null;
}
function xi({ locked: e }) {
  return e ? /* @__PURE__ */ a("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Li({ text: e }) {
  return e ? /* @__PURE__ */ a("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function un(e) {
  const t = N(), n = e.consequence ? `${t}-note` : void 0, r = Ae(), l = Ri(e, r);
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
        /* @__PURE__ */ a(xi, { locked: e.locked })
      ] }),
      /* @__PURE__ */ a(Li, { text: e.sample })
    ] }),
    /* @__PURE__ */ a(Ti, { id: n, text: e.consequence })
  ] });
}
const Ai = "_chip_pq6tb_2", Ei = {
  chip: Ai
}, Ii = {
  gate: W.chip.gate,
  system: W.chip.system,
  write: W.chip.write,
  drift: W.chip.drift,
  done: W.chip.done,
  attention: W.chip.attention,
  failed: W.chip.failed,
  pending: W.chip.pending,
  running: W.chip.running,
  warn: W.chip.warn,
  meta: W.chip.meta,
  soft: W.chip.soft,
  quiet: W.chip.quiet,
  owed: W.chip.owed
};
function Mi(e, t) {
  if (e === "stream") return Bi(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = Ii[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function Bi(e) {
  if (!e || !ct(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = na(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: n, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ a("span", { className: `${Ei.chip} ward-chip ward-chip--${e}`, style: Mi(e, n), "data-ward-chip": e, "data-size": r, children: t });
}
const Pi = "_clamp_zn74g_3", Ca = {
  clamp: Pi
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
function Pt(e, t) {
  const n = ht(t);
  return n === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: n };
}
const qi = "_root_13eei_3", Oi = "_nav_13eei_8", ji = "_list_13eei_16", Di = "_item_13eei_24", Hi = "_link_13eei_44", Fi = "_sep_13eei_54", zi = "_current_13eei_58", Wi = "_chips_13eei_62", Me = {
  root: qi,
  nav: Oi,
  list: ji,
  item: Di,
  link: Hi,
  sep: Fi,
  current: zi,
  chips: Wi
};
function Ki({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ a("span", { className: Me.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ a("a", { className: `${Me.link} ward-target`, href: H(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ a("span", { title: e.label, children: e.label });
}
function Gi({ path: e, chips: t, current: n = !0 }) {
  return /* @__PURE__ */ a("div", { className: Me.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ a("ol", { className: Me.list, children: e.map((r, l) => /* @__PURE__ */ o("li", { className: Me.item, children: [
      l > 0 ? /* @__PURE__ */ a("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ a(Ki, { step: r, isCurrent: n && l === e.length - 1 })
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
const Ui = 500;
function mn(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function wn() {
  const e = _(""), t = _(void 0);
  return C(() => () => clearTimeout(t.current), []), (n) => (clearTimeout(t.current), e.current += n.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, Ui), e.current);
}
const wt = 4;
function Vi(e, t, n) {
  const r = Math.max(0, n - e.bottom - wt * 2), l = Math.max(0, e.top - wt * 2);
  return t <= r || r >= l ? { top: e.bottom + wt, maxHeight: r } : { top: e.top - wt - Math.min(t, l), maxHeight: l };
}
function Yi(e, t, n, r) {
  const l = { start: e.left, end: e.right - t }, i = { start: l.start + t <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - t));
}
function Ji(e, t, n, r) {
  return { ...Vi(e, t.height, n.height), left: Yi(e, t.width, n.width, r) };
}
function pt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Xi(e, t) {
  const n = t.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", pt(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function Qi(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = t.map((r) => r.scrollTop);
  return () => t.forEach((r, l) => r.scrollTop = n[l]);
}
function Sa(e, t, n) {
  const r = Qi(e), l = Xi(e, t), i = Ji(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: pt(i.left - l.box.left), top: pt(i.top - l.box.top), maxHeight: pt(i.maxHeight) }), r();
}
function Zi(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function fn(e, t, n = "start") {
  tt(() => {
    const r = t.current, l = e.current;
    if (!r || !l) return;
    const i = Zi(r), s = () => Sa(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, t, n]), tt(() => {
    t.current && e.current && Sa(t.current, e.current, n);
  });
}
const es = "_root_1lgbn_2", ts = "_trigger_1lgbn_7", as = "_value_1lgbn_47", ns = "_menu_1lgbn_65", rs = "_find_1lgbn_87", ls = "_list_1lgbn_103", os = "_option_1lgbn_114", is = "_check_1lgbn_133", ss = "_empty_1lgbn_144", ve = {
  root: es,
  trigger: ts,
  value: as,
  menu: ns,
  find: rs,
  list: ls,
  option: os,
  check: is,
  empty: ss
}, cs = 7;
function ds(e, t) {
  const n = t.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function Ra(e, t) {
  return Math.max(0, e.findIndex((n) => n.value === t));
}
function us(e, t) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => Ra(e.options, e.value)), d = (u) => {
    var h;
    Za(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: ds(e.options, l),
    findable: e.options.length > cs,
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
function hs(e, t) {
  const n = _(!1);
  return C(() => {
    var r;
    e && n.current && ((r = t.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function ms(e) {
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
function ws(e) {
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
const fs = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function _s(e, t) {
  const n = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      fs.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function vs({ entry: e, at: t, menu: n, ids: r, value: l }) {
  return /* @__PURE__ */ o(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
      "data-active": t === n.active || void 0,
      className: ve.option,
      onMouseDown: (i) => i.preventDefault(),
      onMouseMove: () => n.to(t),
      onClick: () => n.pick(e),
      children: [
        /* @__PURE__ */ a("span", { className: ve.check, "aria-hidden": "true" }),
        /* @__PURE__ */ a("span", { className: ve.label, children: e.option.label })
      ]
    }
  );
}
function oa(e, t) {
  const n = e.entries[e.active];
  return n ? t.option(n.index) : void 0;
}
function bs({ menu: e, ids: t, focusRef: n }) {
  return /* @__PURE__ */ a(
    "input",
    {
      ref: n,
      className: ve.find,
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
function ps({ props: e, menu: t, ids: n, focusRef: r, trigger: l }) {
  const i = ms(t), s = _(null);
  fn(l, s);
  const c = (d) => {
    mn(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: ve.menu, children: [
    t.findable && /* @__PURE__ */ a(bs, { menu: t, ids: n, focusRef: r }),
    /* @__PURE__ */ a(
      "ul",
      {
        ref: t.findable ? void 0 : r,
        id: n.list,
        role: "listbox",
        tabIndex: -1,
        className: ve.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": t.findable ? void 0 : oa(t, n),
        onKeyDown: vn(t, ws(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ a(vs, { entry: d, at: u, menu: t, ids: n, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ a("p", { className: ve.empty, children: "No match" })
  ] });
}
function gs(e, t) {
  const n = e.open ? oa(e, t) : void 0;
  C(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function bn(...e) {
  return e.filter(Boolean).join(" ");
}
function ys(e) {
  var t;
  return ((t = e.options.find((n) => n.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function Ns({ props: e, menu: t, ids: n, trigger: r, wantFocus: l }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ae()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ a(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: bn(ve.trigger, e.triggerClassName),
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
      ..._s(t, l),
      children: /* @__PURE__ */ a("span", { id: n.value, className: ve.value, "data-placeholder": i || void 0, children: ys(e) })
    }
  );
}
function pn(e) {
  const t = Ae(), n = t ? { ...e, disabled: !0, "aria-describedby": Mt(e["aria-describedby"], t) } : e, r = N(), l = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = _(null), s = _(null), c = _(null), d = us(n, s), u = hs(d.open, c);
  return hn(d.open, i, () => d.close(!1)), gs(d, l), /* @__PURE__ */ o("div", { ref: i, className: bn(ve.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ a(Ns, { props: n, menu: d, ids: l, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ a("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ a(ps, { props: n, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const ks = "_field_1ensj_2", $s = "_label_1ensj_8", Cs = "_labelHidden_1ensj_15", Ss = "_control_1ensj_25", Rs = "_mono_1ensj_45", Ts = "_area_1ensj_50", xs = "_invalid_1ensj_57", je = {
  field: ks,
  label: $s,
  labelHidden: Cs,
  control: Ss,
  mono: Rs,
  area: Ts,
  invalid: xs
}, Ls = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, gn = (e) => `${e}-label`;
function As({ props: e, controlProps: t, cls: n }) {
  const r = e.secret ? Ls : {};
  return /* @__PURE__ */ a("input", { className: n, ...r, ...t });
}
function Es({ props: e, controlProps: t, cls: n }) {
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
function Is({ props: e, controlProps: t, cls: n }) {
  return /* @__PURE__ */ a("textarea", { className: n, rows: e.rows ?? 3, ...t });
}
const Ms = { input: As, select: Es, textarea: Is };
function Bs(e, t, n) {
  const r = Ms[e.kind ?? "input"];
  return /* @__PURE__ */ a(r, { props: e, controlProps: t, cls: n });
}
function Ps(e, t, n, r) {
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
function qs(e) {
  const t = e.mono ? [je.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [je.area] : [];
  return [je.control, "ward-field-input", ...t, ...n].filter(Boolean).join(" ");
}
function Os(e) {
  return e ? `${je.label} ${je.labelHidden} ward-field-label` : `${je.label} ward-field-label`;
}
function M(e) {
  const t = N(), n = `${t}-msg`, r = Ps(e, t, n, Ae()), l = qs(e);
  return /* @__PURE__ */ o("div", { className: `${je.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ a("label", { id: gn(t), className: Os(e.labelHidden), htmlFor: t, children: e.label }),
    Bs(e, r, l),
    e.invalid && /* @__PURE__ */ a("p", { id: n, className: `${je.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const js = "_root_1waw7_2", Ds = "_trigger_1waw7_9", Hs = "_panel_1waw7_33", Fs = "_menu_1waw7_53", zs = "_group_1waw7_58", Ws = "_heading_1waw7_63", Ks = "_item_1waw7_69", Gs = "_description_1waw7_84", Us = "_marked_1waw7_93", Vs = "_check_1waw7_98", Ys = "_separator_1waw7_123", Js = "_footer_1waw7_129", ee = {
  root: js,
  trigger: Ds,
  panel: Hs,
  menu: Fs,
  group: zs,
  heading: Ws,
  item: Ks,
  description: Gs,
  marked: Us,
  check: Vs,
  separator: Ys,
  footer: Js
}, yn = ye(null);
function Xs(e, t) {
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
const Qs = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Zs(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const n = Qs.get(t.key);
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
function ec(e, t = {}) {
  const { ref: n, className: r, ...l } = t;
  return { ...l, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: Nn(ee.trigger, r) };
}
function tc(e) {
  const t = N(), n = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = _(null), l = _(null), i = Xs(e.defaultOpen === !0, l);
  return hn(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: Nn(ee.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ a(
      "button",
      {
        ...ec(l, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Zs(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ a(yn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function ac(e) {
  let t = 0;
  const n = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function nc(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const kn = (e, t) => (e % t + t) % t;
function Ze(e, t, n) {
  for (let r = 1; r <= e.length; r++) {
    const l = kn(t + n * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const rc = (e) => e.split("").every((t) => t === e[0]);
function lc(e, t, n) {
  const r = rc(n), l = r ? n[0] : n, i = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = kn(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function oc(e) {
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
function ic(e, t) {
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
function sc(e, t) {
  const n = _(!1), r = wn(), l = ic(e, t), i = (s) => {
    mn(s) && e.focus(lc(e.items, e.current(), r(s.key)));
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
function cc(e) {
  const t = e.findIndex((n) => n.current && !n.disabled);
  return t === -1 ? Ze(e, -1, 1) : t;
}
function dc(e, t) {
  const { start: n, request: r } = t, l = _(e);
  l.current = e, C(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? cc(i) : Ze(i, i.length, -1));
  }, [n, r]);
}
function uc({ row: e, nav: t, popup: n }) {
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
function hc(e, t) {
  if (!e.description) return { aria: {}, content: e.label };
  const n = { "aria-labelledby": t + "-label", "aria-describedby": t + "-description" }, r = /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("span", { id: t + "-label", children: e.label }),
    /* @__PURE__ */ a("span", { id: t + "-description", className: ee.description, children: e.description })
  ] });
  return { aria: n, content: r };
}
function mc() {
  return /* @__PURE__ */ a("svg", { className: ee.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ a("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function wc(e, t, n) {
  return n ? { className: ee.item + " " + ee.marked, content: /* @__PURE__ */ o(R, { children: [
    e.current ? /* @__PURE__ */ a(mc, {}) : null,
    t
  ] }) } : { className: ee.item, content: t };
}
function $n(e) {
  const { item: t, at: n } = e.row, r = hc(t, N()), l = wc(t, r.content, e.nav.items.some((s) => s.current)), i = {
    ref: (s) => {
      e.nav.refs.current[n] = s;
    },
    role: "menuitem",
    tabIndex: -1,
    className: l.className,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...r.aria,
    ...uc(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ a("a", { href: H(t.href), ...i, children: l.content }) : /* @__PURE__ */ a("button", { type: "button", ...i, children: l.content });
}
function fc({ heading: e, rows: t, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: ee.group, children: [
    /* @__PURE__ */ a("div", { id: l, className: ee.heading, children: e }),
    t.map((i) => /* @__PURE__ */ a($n, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function _c({ block: e, nav: t, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ a("div", { role: "separator", className: ee.separator }) : e.kind === "group" ? /* @__PURE__ */ a(fc, { heading: e.heading, rows: e.rows, nav: t, popup: n }) : /* @__PURE__ */ a($n, { row: e.row, nav: t, popup: n });
}
function vc() {
  const e = ge(yn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function bc({ entries: e, footer: t, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = vc(), c = _(null);
  fn(s, c, n);
  const d = ac(e), u = oc(d.flatMap(nc).map((w) => w.item)), h = sc(u, r);
  return dc(u, r), /* @__PURE__ */ o("div", { ref: c, className: ee.panel, children: [
    /* @__PURE__ */ a("div", { role: "menu", id: l, "aria-labelledby": i, className: ee.menu, ...h, children: d.map((w, f) => /* @__PURE__ */ a(_c, { block: w, nav: u, popup: r }, f)) }),
    t && /* @__PURE__ */ a("p", { className: ee.footer, children: t })
  ] });
}
function pc(e) {
  var n;
  return (((n = e.parentElement) == null ? void 0 : n.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function Cn(e, t) {
  C(() => {
    const n = e.current;
    t === "page" && n && !pc(n) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const gc = (e, t) => e.reduce((n, r) => n + r + t, -t);
function yc({ room: e, widths: t, more: n, gap: r }, l) {
  const i = t.map((d, u) => u);
  if (gc(t, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([l]);
  let c = t[l] + r + n;
  for (const d of i)
    if (d !== l) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Ft = (e) => Number.parseFloat(e) || 0, Ta = (e) => e.getBoundingClientRect().width;
function Nc(e) {
  const t = getComputedStyle(e), n = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Ft(t.paddingInlineStart) - Ft(t.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(':scope > [role="tab"]'), Ta),
    more: n ? Ta(n) : 0,
    gap: Ft(t.columnGap)
  };
}
function kc(e, t) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const $c = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function Cc(e, t, n) {
  const [r, l] = p(null);
  return tt(() => {
    const i = e.current;
    if (!i) return;
    const s = () => {
      const c = Nc(i);
      l((d) => $c(d, c) ? d : c);
    };
    return s(), kc(i, s);
  }, [e, n]), r && yc(r, t);
}
const Sc = "_strip_jqyo6_2", Rc = "_fits_jqyo6_19", Tc = "_probe_jqyo6_27", xc = "_moreRoot_jqyo6_36", Lc = "_more_jqyo6_36", Ac = "_tab_jqyo6_55", Ec = "_count_jqyo6_91", be = {
  strip: Sc,
  fits: Rc,
  probe: Tc,
  moreRoot: xc,
  more: Lc,
  tab: Ac,
  count: Ec
}, Sn = "More";
function Ic(e, t) {
  const n = e.findIndex((r) => r.id === t);
  return n < 0 ? 0 : n;
}
const Rn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function Tn(e) {
  return `${be.strip} ward-tabs ward-tabs--${e}`;
}
const Mc = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Bc({ tab: e, active: t, place: n, onChange: r }) {
  return /* @__PURE__ */ o(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${be.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      onClick: () => r(e.id),
      ...n,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ o(R, { children: [
          " ",
          /* @__PURE__ */ a("span", { className: be.count, children: `· ${e.count}` })
        ] })
      ]
    }
  );
}
function Pc(e, t) {
  return (n) => {
    t(n), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function qc({ tabs: e, trigger: t, onPick: n }) {
  return /* @__PURE__ */ a(tc, { label: Sn, className: be.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: be.more }, children: /* @__PURE__ */ a(bc, { align: "end", entries: e.map((r) => ({ label: Rn(r), onSelect: () => n(r.id) })) }) });
}
function Oc(e, t, n) {
  return !t || t.includes(n) ? e.itemProps(n) : Mc;
}
function RR({ tabs: e, active: t, onChange: n, label: r = "Tabs", level: l }) {
  const i = Et({ orientation: "horizontal" }), s = Ic(e, t);
  C(() => i.setActive(s), [i.setActive, s]);
  const c = _(null);
  Cn(c, l);
  const d = Cc(c, s, e.map(Rn).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${Tn(l)} ${be.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ a(Bc, { tab: h, active: t, place: Oc(i, d, w), onChange: n }, h.id)),
    /* @__PURE__ */ a("span", { "aria-hidden": "true", "data-more-probe": "", className: `${ee.trigger} ${be.more} ${be.probe}`, children: Sn }),
    u.length > 0 && /* @__PURE__ */ a(qc, { tabs: u, trigger: i.itemProps(e.length), onPick: Pc(c, n) })
  ] });
}
const xa = 7;
function TR({ links: e, active: t, label: n, level: r }) {
  if (e.length > xa) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${xa} — the set is fixed`);
  const l = _(null);
  return Cn(l, r), ln(l, e.findIndex((i) => i.id === t), "a"), /* @__PURE__ */ a(Bt, { as: "nav", rowRef: l, className: Tn(r), label: n, count: e.length, focusable: !1, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${be.tab} ward-tab`, "aria-current": i.id === t ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(R, { children: [
      " ",
      /* @__PURE__ */ a("span", { className: be.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const jc = "_root_v56ff_3", Dc = "_segment_v56ff_9", La = {
  root: jc,
  segment: Dc
};
function xn({ options: e, value: t, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
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
const Hc = "_sidebar_s9o1j_3", Fc = "_brand_s9o1j_9", zc = "_mark_s9o1j_17", Wc = "_word_s9o1j_24", Kc = "_nav_s9o1j_30", Gc = "_navItem_s9o1j_39", Uc = "_footLink_s9o1j_49", Vc = "_group_s9o1j_58", Yc = "_groupName_s9o1j_65", Jc = "_agents_s9o1j_81", Xc = "_agent_s9o1j_81", Qc = "_root_s9o1j_96", Zc = "_agentTop_s9o1j_105", ed = "_dot_s9o1j_112", td = "_agentName_s9o1j_124", ad = "_agentMeta_s9o1j_138", nd = "_foot_s9o1j_49", rd = "_footName_s9o1j_150", ld = "_footLinks_s9o1j_157", od = "_linkBrand_s9o1j_184", id = "_label_s9o1j_205", sd = "_note_s9o1j_210", cd = "_footer_s9o1j_226", x = {
  sidebar: Hc,
  brand: Fc,
  mark: zc,
  word: Wc,
  nav: Kc,
  navItem: Gc,
  new: "_new_s9o1j_48",
  footLink: Uc,
  group: Vc,
  groupName: Yc,
  agents: Jc,
  agent: Xc,
  root: Qc,
  agentTop: Zc,
  dot: ed,
  agentName: td,
  agentMeta: ad,
  foot: nd,
  footName: rd,
  footLinks: ld,
  linkBrand: od,
  label: id,
  note: sd,
  footer: cd
};
function dd({ agent: e }) {
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
              style: { "--dot": na(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ a("span", { className: x.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ a("span", { className: x.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function ud({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ a("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ a("div", { className: x.footLinks, children: e.links.map((t) => /* @__PURE__ */ a("a", { className: `${x.footLink} ward-target`, href: H(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function hd({ brand: e, nav: t, agentsHeading: n, agents: r, newAction: l, shared: i }) {
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
        te(r.length)
      ] }),
      l && /* @__PURE__ */ a("a", { className: x.new, href: H(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ a("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ a(dd, { agent: s }, s.href)) }),
    /* @__PURE__ */ a(ud, { shared: i })
  ] });
}
function md(e) {
  return e.destinations ?? e.items ?? [];
}
function wd({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("div", { className: x.linkBrand, children: e });
}
function fd({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("div", { className: x.footer, children: e });
}
function _d({ link: e, active: t }) {
  return /* @__PURE__ */ o("a", { href: H(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ a("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ a("span", { className: x.note, children: e.note })
  ] });
}
function vd(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ a(wd, { brand: e.brand }),
    /* @__PURE__ */ a("nav", { "aria-label": e.label ?? "Sidebar", children: md(e).map((t) => /* @__PURE__ */ a(_d, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ a(fd, { children: e.children })
  ] });
}
function bd(e) {
  return "agents" in e;
}
function xR(e) {
  return bd(e) ? /* @__PURE__ */ a(hd, { ...e }) : /* @__PURE__ */ a(vd, { ...e });
}
const pd = "_mark_wlgi8_3", gd = {
  mark: pd
}, yd = { met: "✓", unmet: "", failed: "✕" };
function ia({ state: e, label: t }) {
  return /* @__PURE__ */ a(
    "span",
    {
      className: gd.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: yd[e]
    }
  );
}
const Nd = "_avatar_1t33a_3", kd = {
  avatar: Nd
};
function Ct(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function $d(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), n = t.charAt(0);
  return [Ct(e), ...[...t.slice(1)].map((r) => n + r)];
}
function Cd(e, t) {
  const n = $d(e).find((l) => !t.has(l));
  if (n !== void 0) return n;
  let r = 2;
  for (; t.has(Ct(e).charAt(0) + String(r)); ) r += 1;
  return Ct(e).charAt(0) + String(r);
}
function LR(e) {
  const t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (n.has(r)) continue;
    const l = Cd(r, t);
    t.add(l), n.set(r, l);
  }
  return n;
}
function Sd(e) {
  return e != null && ct(e) ? Gr(e) : void 0;
}
function AR({ name: e, step: t, size: n = "md", initials: r }) {
  return /* @__PURE__ */ a("span", { className: kd.avatar, "data-size": n, "aria-hidden": "true", style: Sd(t), children: r ?? Ct(e) });
}
const Rd = "_marker_br9fi_2", Td = {
  marker: Rd
}, xd = {
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
}, Ld = { running: " ward-running" };
function He({ size: e, kind: t, label: n }) {
  const r = { "--marker": xd[t], width: e, height: e };
  return /* @__PURE__ */ a(
    "span",
    {
      className: `${Td.marker} ward-marker ward-marker--${t}${Ld[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const Ad = "_root_ti0pq_2", Ed = "_chip_ti0pq_11", Id = "_noCase_ti0pq_23", ft = {
  root: Ad,
  chip: Ed,
  noCase: Id
};
function Md(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function sa({ connection: e, since: t, lastEventAt: n }) {
  const r = Md(t, n), l = ra(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${ft.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ a(He, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${ft.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ a("span", { className: ft.noCase, children: aa(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${ft.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    ue(r)
  ] });
}
const Bd = "_root_yylks_2", Pd = "_context_yylks_13", qd = "_row_yylks_1", Od = "_heading_yylks_27", jd = "_headingWrap_yylks_35", Dd = "_meta_yylks_41", Hd = "_chips_yylks_49", Fd = "_title_yylks_56", zd = "_consequence_yylks_66", Wd = "_actionsWrap_yylks_73", Kd = "_actions_yylks_73", Gd = "_action_yylks_73", Ud = "_overflowPanel_yylks_102", Vd = "_measureClip_yylks_113", Yd = "_measure_yylks_113", K = {
  root: Bd,
  context: Pd,
  row: qd,
  heading: Od,
  headingWrap: jd,
  meta: Dd,
  chips: Hd,
  title: Fd,
  consequence: zd,
  actionsWrap: Wd,
  actions: Kd,
  action: Gd,
  overflowPanel: Ud,
  measureClip: Vd,
  measure: Yd
};
function Jd({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ a(at, { as: "h1", className: K.title, text: e }) : /* @__PURE__ */ a("h1", { className: K.title, children: e });
}
function Xd({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ a("div", { className: K.chips, children: e.map((t) => /* @__PURE__ */ a(m, { ...t }, t.label)) }) : null;
}
function Qd({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ a("p", { className: K.consequence, title: t, children: e }) : null;
}
function Zd({ chips: e = [], consequence: t, consequenceHint: n }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ o("div", { className: K.meta, children: [
    /* @__PURE__ */ a(Xd, { chips: e }),
    /* @__PURE__ */ a(Qd, { consequence: t, consequenceHint: n })
  ] });
}
function eu({ title: e, chips: t, consequence: n, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: K.heading, children: [
    /* @__PURE__ */ a(Jd, { title: e, density: l }),
    /* @__PURE__ */ a(Zd, { chips: t, consequence: n, consequenceHint: r })
  ] });
}
function Jt({ actions: e }) {
  return e.map((t, n) => /* @__PURE__ */ a("span", { className: K.action, "data-action": "", children: t }, n));
}
function Aa({ disclosure: e }) {
  return /* @__PURE__ */ a(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function tu({ actions: e, hasMore: t, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ a(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ a(Aa, { disclosure: l }) : t ? [/* @__PURE__ */ a(Aa, { disclosure: l }, "more"), /* @__PURE__ */ a(Jt, { actions: e }, "actions")] : /* @__PURE__ */ a(Jt, { actions: e });
}
function au(e, t, n, r) {
  return n ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function nu({ actions: e, disclosure: t, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ a("div", { id: t.panelId, className: K.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ a(Jt, { actions: e }) });
}
function ru(e, t) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const lu = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function ou(e = [], t, n) {
  const r = e.at(-1);
  return r !== void 0 && lu(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: n !== !1 };
}
function iu({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ a("div", { className: K.context, children: /* @__PURE__ */ a(Gi, { path: e.path, current: e.current }) });
}
function su(...e) {
  return e.some((t) => t === null);
}
function cu(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function du(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + cu(e);
}
function uu(e, t, n, r, l) {
  if (l === 0 || su(t, n, r)) return !1;
  const [i, s, c] = [t, n, r], d = Math.max(0, e.clientWidth - du(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function hu(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function mu(e) {
  return Cr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function wu(e, t) {
  return t.length === 0 && e.length === 1 && mu(e[0]);
}
function fu(e, t) {
  const n = _(null), r = _(null), l = _(null), i = _(null), [s, c] = p(!1);
  return C(() => {
    const d = n.current;
    if (!hu(d)) return;
    const u = () => c(uu(d, r.current, l.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !t };
}
function _u({ actions: e, hasMore: t, measureRef: n }) {
  return /* @__PURE__ */ a("div", { className: K.measureClip, children: /* @__PURE__ */ o("div", { className: K.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ a("span", { children: /* @__PURE__ */ a(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ a("span", { children: r }, l))
  ] }) });
}
function vu({ connection: e }) {
  return e ? /* @__PURE__ */ a(sa, { connection: e.connection, since: e.since }) : null;
}
function ER({ crumb: e, crumbCurrent: t, chips: n, title: r, consequence: l, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: y, measureRef: E, collapsed: P } = fu(s, wu(s, c)), ae = c.length > 0, { disclosure: Ne, close: ne } = ru(P || ae, y), Ee = au(c, s, P, u);
  return /* @__PURE__ */ o("header", { className: K.root, "data-density": h, children: [
    /* @__PURE__ */ a(iu, { crumb: ou(e, r, t) }),
    /* @__PURE__ */ o("div", { className: K.row, ref: w, children: [
      /* @__PURE__ */ a("div", { ref: f, className: K.headingWrap, children: /* @__PURE__ */ a(eu, { title: r, chips: n, consequence: l, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ o("div", { className: K.actionsWrap, children: [
        /* @__PURE__ */ a(vu, { connection: d }),
        /* @__PURE__ */ a("div", { className: K.actions, ref: y, "data-ward-actions": !0, children: /* @__PURE__ */ a(tu, { actions: s, hasMore: ae, collapsed: P, onOverflow: u, disclosure: Ne }) })
      ] })
    ] }),
    /* @__PURE__ */ a(nu, { actions: Ee, disclosure: Ne, onEscape: ne }),
    /* @__PURE__ */ a(_u, { actions: s, hasMore: ae, measureRef: E })
  ] });
}
const bu = "_root_td96x_2", pu = "_body_td96x_16", Ea = {
  root: bu,
  body: pu
};
function IR({ variant: e = "info", ticket: t, children: n }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ a("aside", { className: `${Ea.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ a("div", { className: Ea.body, children: n }) });
}
const gu = "_root_bf1pc_2", yu = "_table_bf1pc_9", Nu = "_caption_bf1pc_14", ku = "_series_bf1pc_23", $u = "_category_bf1pc_31", Cu = "_cell_bf1pc_39", Su = "_track_bf1pc_45", Ru = "_lane_bf1pc_52", Tu = "_bar_bf1pc_56", xu = "_value_bf1pc_63", Lu = "_swatch_bf1pc_70", Au = "_empty_bf1pc_78", J = {
  root: gu,
  table: yu,
  caption: Nu,
  series: ku,
  category: $u,
  cell: Cu,
  track: Su,
  lane: Ru,
  bar: Tu,
  value: xu,
  swatch: Lu,
  empty: Au
}, Eu = "—", Ia = 6;
function Iu(e, t) {
  if (t.length < 1 || t.length > Ia)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${Ia}`);
  const n = t.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function Mu(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((n) => n ?? 0)));
}
function Ln(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function Bu(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function Pu({ value: e, top: t, step: n, format: r, missing: l }) {
  const i = Bu(e, t), s = { "--share": `${i}%` };
  return /* @__PURE__ */ a("td", { className: J.cell, children: /* @__PURE__ */ o("span", { className: J.track, children: [
    /* @__PURE__ */ a("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ a("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ a("span", { className: J.value, children: e === null ? l : r(e) })
  ] }) });
}
function qu({ series: e }) {
  return /* @__PURE__ */ a(R, { children: e.map((t, n) => /* @__PURE__ */ o("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ a("span", { className: J.swatch, "data-step": Ln(n, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function Ou({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ a("p", { className: J.caption, children: e }),
    /* @__PURE__ */ a("p", { className: J.empty, children: t })
  ] });
}
function ju({ title: e, categories: t, series: n, top: r, format: l = te, categoryHead: i = "Category", missing: s = Eu }) {
  return /* @__PURE__ */ a("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: J.table, children: [
    /* @__PURE__ */ a("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ a("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ a("th", { scope: "col", className: J.series, children: /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ a(qu, { series: n })
    ] }) }),
    /* @__PURE__ */ a("tbody", { children: t.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ a("th", { scope: "row", className: J.category, children: c }),
      n.map((u, h) => /* @__PURE__ */ a(Pu, { value: u.values[d], top: r, step: Ln(h, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function MR(e) {
  Iu(e.categories, e.series);
  const t = Mu(e.series);
  return t === 0 ? /* @__PURE__ */ a(Ou, { title: e.title, empty: e.empty }) : /* @__PURE__ */ a(ju, { ...e, top: t });
}
const Du = "_root_1bfqw_2", Hu = "_figure_1bfqw_7", Fu = "_of_1bfqw_13", zu = "_bar_1bfqw_18", Wu = "_rows_1bfqw_38", Ku = "_row_1bfqw_38", Gu = "_label_1bfqw_49", Uu = "_amount_1bfqw_54", Ie = {
  root: Du,
  figure: Hu,
  of: Fu,
  bar: zu,
  rows: Wu,
  row: Ku,
  label: Gu,
  amount: Uu
};
function Vu({ spent: e, ceiling: t, breakdown: n }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Ie.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Ie.figure} ward-stat-value`, children: [
      le(e),
      " ",
      /* @__PURE__ */ o("span", { className: Ie.of, children: [
        "of ",
        le(t)
      ] })
    ] }),
    /* @__PURE__ */ a(
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
    n && /* @__PURE__ */ a("ul", { className: Ie.rows, children: n.map((l) => /* @__PURE__ */ o("li", { className: `${Ie.row} ward-costrow`, children: [
      /* @__PURE__ */ a("span", { className: Ie.label, children: l.label }),
      /* @__PURE__ */ a("span", { className: Ie.amount, children: le(l.amount) })
    ] }, l.label)) })
  ] });
}
const Yu = "_frame_lmfp9_2", Ju = "_table_lmfp9_6", Xu = "_th_lmfp9_12", Qu = "_td_lmfp9_13", Zu = "_sort_lmfp9_48", eh = "_row_lmfp9_60", th = "_empty_lmfp9_68", qe = {
  frame: Yu,
  table: Ju,
  th: Xu,
  td: Qu,
  sort: Zu,
  row: eh,
  empty: th
}, ah = { asc: "ascending", desc: "descending" };
function nh(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return ah[t.direction];
}
function rh(e, t) {
  return e.sortable && t ? /* @__PURE__ */ a("button", { type: "button", className: qe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function lh(e) {
  return e === void 0 ? void 0 : { width: e };
}
function oh({ column: e, sort: t, onSort: n }) {
  return /* @__PURE__ */ a(
    "th",
    {
      scope: "col",
      className: qe.th,
      style: lh(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": nh(e, t),
      children: rh(e, n)
    }
  );
}
function ih({ row: e, props: t }) {
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
function sh({
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
    /* @__PURE__ */ a("thead", { children: /* @__PURE__ */ a("tr", { className: qe.head, children: t.map((w) => /* @__PURE__ */ a(oh, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ a("tbody", { children: n.map((w) => /* @__PURE__ */ a(ih, { row: w, props: { label: e, columns: t, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const ch = "_list_v0s52_2", dh = {
  list: ch
};
function BR({ children: e, label: t }) {
  return /* @__PURE__ */ a("ul", { className: dh.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const uh = "_label_1u62a_2", hh = {
  label: uh
};
function PR({ columns: e }) {
  return /* @__PURE__ */ a("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ a("tr", { children: e.map((t) => /* @__PURE__ */ a("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ a("span", { className: hh.label, children: t.header }) }, t.key)) }) });
}
const mh = "_stack_bp6a0_2", wh = {
  stack: mh
};
function qR({ children: e }) {
  return /* @__PURE__ */ a("span", { className: wh.stack, "data-ward-action-stack": "", children: e });
}
const fh = "_set_1z0sq_2", _h = "_legend_1z0sq_7", vh = "_row_1z0sq_15", bh = "_control_1z0sq_20", ph = "_input_1z0sq_26", gh = "_label_1z0sq_31", yh = "_consequence_1z0sq_36", ze = {
  set: fh,
  legend: _h,
  row: vh,
  control: bh,
  input: ph,
  label: gh,
  consequence: yh
};
function An({ legend: e, options: t, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = N(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: ze.set, "data-variant": c, children: [
    /* @__PURE__ */ a("legend", { className: ze.legend, children: e }),
    t.map((h) => {
      const w = `${u}-${h.value}`, f = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: ze.row, children: [
        /* @__PURE__ */ o("span", { className: ze.control, children: [
          /* @__PURE__ */ a(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: ze.input,
              value: h.value,
              checked: n === h.value,
              disabled: l,
              "aria-describedby": dt(f, s),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ a("label", { htmlFor: w, className: ze.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ a("p", { id: f, className: `${ze.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Nh = "_root_11gpw_2", kh = "_head_11gpw_10", $h = "_note_11gpw_29", Ch = "_index_11gpw_34", Sh = "_dot_11gpw_38", Rh = "_counter_11gpw_49", Th = "_trailing_11gpw_57", We = {
  root: Nh,
  head: kh,
  note: $h,
  index: Ch,
  dot: Sh,
  counter: Rh,
  trailing: Th
};
function xh({ index: e }) {
  return e ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("span", { className: `${We.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ a("span", { className: We.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Lh({ counter: e }) {
  return e ? /* @__PURE__ */ a("span", { className: We.counter, "aria-hidden": "true", children: e }) : null;
}
function Ma({ title: e, index: t, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${We.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: We.head, children: [
      /* @__PURE__ */ a(xh, { index: t }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ a("span", { className: We.note, children: n }),
    /* @__PURE__ */ a(Lh, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ a("span", { className: We.trailing, children: i })
  ] });
}
const Ah = "_strip_c3x3u_2", Eh = "_cell_c3x3u_7", Ih = "_value_c3x3u_12", Mh = "_link_c3x3u_29", Bh = "_label_c3x3u_49", Ph = "_tiles_c3x3u_101", De = {
  strip: Ah,
  cell: Eh,
  value: Ih,
  link: Mh,
  label: Bh,
  tiles: Ph
};
function En(e, t, [n, r]) {
  if (t.length < n || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${n} to ${r}`);
  if (t.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const In = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function qh({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ a("dd", { className: In(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ a("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function Oh({ cell: e, href: t }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ a("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ a("dd", { className: In(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${De.link} ward-stat-link`, href: H(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ a("span", { children: e.value }),
      /* @__PURE__ */ a("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Mn = (e) => e.href === void 0 ? /* @__PURE__ */ a(qh, { cell: e }, e.label) : /* @__PURE__ */ a(Oh, { cell: e, href: e.href }, e.label);
function qt({ cells: e, divided: t = !1 }) {
  return En("StatStrip", e, [2, 4]), /* @__PURE__ */ a("dl", { className: `${De.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(Mn) });
}
const Ba = 6;
function OR({ cells: e }) {
  En("StatTiles", e, [1, 2 * Ba]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, Ba) };
  return /* @__PURE__ */ a("dl", { className: `${De.tiles} ward-stattiles`, style: t, children: e.map(Mn) });
}
const jh = "_root_1eb1u_2", Dh = "_track_1eb1u_8", Hh = "_thumb_1eb1u_46", Fh = "_labelHidden_1eb1u_64", zh = "_label_1eb1u_64", Wh = "_lockedNote_1eb1u_84", Ke = {
  root: jh,
  track: Dh,
  thumb: Hh,
  labelHidden: Fh,
  label: zh,
  lockedNote: Wh
};
function Kh(e, t, n, r) {
  return { on: n ? !0 : e, off: !!(t || n || r) };
}
function Gh(e) {
  return e ? `${Ke.label} ${Ke.labelHidden}` : Ke.label;
}
function Ue({ label: e, checked: t, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = Ae(), { on: h, off: w } = Kh(t, r, l, u !== null);
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
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: Gh(s), children: [
      e,
      l && /* @__PURE__ */ a("span", { className: Ke.lockedNote, children: "always on" })
    ] })
  ] });
}
const Uh = "_bar_1vp69_2", Vh = "_skip_1vp69_11", Yh = "_mark_1vp69_22", Jh = "_nav_1vp69_30", Xh = "_list_1vp69_34", Qh = "_select_1vp69_41", Zh = "_selectTrigger_1vp69_45", em = "_dest_1vp69_52", tm = "_actor_1vp69_71", am = "_actorMark_1vp69_84", nm = "_actorLabel_1vp69_89", rm = "_tagline_1vp69_108", ie = {
  bar: Uh,
  skip: Vh,
  mark: Yh,
  nav: Jh,
  list: Xh,
  select: Qh,
  selectTrigger: Zh,
  dest: em,
  actor: tm,
  actorMark: am,
  actorLabel: nm,
  tagline: rm
};
function lm(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function om(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function jR({ wordmark: e = "Trellis", destinations: t, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = om(r);
  return /* @__PURE__ */ o("header", { className: ie.bar, children: [
    /* @__PURE__ */ a("a", { className: `${ie.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ a("span", { className: ie.mark, children: e }),
    l && /* @__PURE__ */ a("span", { className: ie.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: ie.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ a("ul", { className: ie.list, children: t.map((d) => /* @__PURE__ */ a("li", { children: /* @__PURE__ */ a(
        "a",
        {
          className: `${ie.dest} ward-target`,
          href: H(d.href),
          "aria-current": d.id === n ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ a(
        pn,
        {
          className: ie.select,
          triggerClassName: ie.selectTrigger,
          "aria-label": "Destination",
          value: n,
          options: t.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => i == null ? void 0 : i(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ o("span", { className: ie.actor, children: [
      /* @__PURE__ */ a("span", { className: ie.actorLabel, children: c }),
      /* @__PURE__ */ a("span", { className: ie.actorMark, "aria-hidden": "true", children: lm(c) })
    ] })
  ] });
}
const im = "_tree_zzoob_2", sm = "_item_zzoob_6", cm = "_row_zzoob_10", dm = "_button_zzoob_22", St = {
  tree: im,
  item: sm,
  row: cm,
  button: dm
}, Bn = ye(null);
function um({ label: e, children: t }) {
  const { containerProps: n, itemProps: r } = Et({ orientation: "vertical" });
  return /* @__PURE__ */ a(Bn.Provider, { value: r, children: /* @__PURE__ */ a("ul", { className: St.tree, role: "tree", "aria-label": e, ...n, children: t }) });
}
const hm = { ArrowRight: !0, ArrowLeft: !1 };
function Pa(e) {
  return e ? !0 : void 0;
}
function mm(e, t) {
  const n = hm[e.key];
  !t.leaf && t.onToggle && n !== void 0 && !!t.expanded !== n && t.onToggle();
}
function wm(e) {
  var t, n;
  e.leaf || (t = e.onToggle) == null || t.call(e), (n = e.onSelect) == null || n.call(e);
}
function fm(e) {
  const t = [St.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function _m(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function vm(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function bm(e) {
  return typeof e == "string" ? e : void 0;
}
function pm({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function gm({ unresolved: e, inherited: t }) {
  const n = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: n });
}
function Pn(e) {
  const t = ge(Bn);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = _m(e);
  return /* @__PURE__ */ o("li", { className: St.item, role: "none", children: [
    /* @__PURE__ */ a(
      "div",
      {
        className: fm(e),
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
            onClick: () => wm(e),
            onKeyDown: (r) => mm(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ a("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: vm(e) }),
              /* @__PURE__ */ a("span", { className: "ward-truncate", title: bm(e.label), children: e.label }),
              /* @__PURE__ */ a(pm, { value: e.detail }),
              /* @__PURE__ */ a(gm, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ a("ul", { role: "group", children: e.children }) : null
  ] });
}
const ym = "_frame_10gwd_2", Nm = "_subjectRail_10gwd_22", km = "_subject_10gwd_22", $m = "_rail_10gwd_42", Cm = "_record_10gwd_66", Sm = "_recordBody_10gwd_71", Rm = "_stageGrid_10gwd_120", Tm = "_band_10gwd_134", xm = "_bandBody_10gwd_142", Lm = "_bandActions_10gwd_147", Am = "_scroller_10gwd_155", Em = "_board_10gwd_182", Im = "_lanes_10gwd_191", Mm = "_cardGrid_10gwd_225", X = {
  frame: ym,
  subjectRail: Nm,
  subject: km,
  rail: $m,
  record: Cm,
  recordBody: Sm,
  stageGrid: Rm,
  band: Tm,
  bandBody: xm,
  bandActions: Lm,
  scroller: Am,
  board: Em,
  lanes: Im,
  cardGrid: Mm
};
function DR({ children: e, as: t = "main", inset: n = "page" }) {
  return /* @__PURE__ */ a(t, { className: X.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function qa(e) {
  return e ? "true" : void 0;
}
function HR({ children: e, rail: t, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: X.subjectRail, "data-ward-subject-rail": n, "data-ruled": qa(i), children: [
    /* @__PURE__ */ a("div", { className: X.subject, children: e }),
    /* @__PURE__ */ a("aside", { className: X.rail, "data-sticky": qa(l), "aria-label": r, children: t })
  ] });
}
function FR({ title: e, children: t, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ a("section", { className: X.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ a(Ma, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ o("section", { className: X.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ a(Ma, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ a("div", { className: X.recordBody, "data-pad": l, "data-measure": c, children: t })
  ] });
}
const Bm = "_form_1j8ub_2", Pm = "_fields_1j8ub_9", qm = "_actions_1j8ub_19", zt = {
  form: Bm,
  fields: Pm,
  actions: qm
};
function zR({ label: e, children: t, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: zt.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ a("div", { className: zt.fields, children: t }),
    n == null ? null : /* @__PURE__ */ a("div", { className: zt.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function WR({ children: e, actions: t, label: n }) {
  return /* @__PURE__ */ o("section", { className: X.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ a("div", { className: X.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ a("div", { className: X.bandActions, children: t })
  ] });
}
const Om = "(max-width: 767.98px)";
function ca({ label: e, children: t, laneCount: n }) {
  const r = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ a(Bt, { className: X.scroller, label: e, count: n ?? Sr.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function jm({ lanes: e, label: t, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: X.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ a(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ a(ca, { label: t, children: i == null ? void 0 : i.content })
  ] });
}
function Dm({ lanes: e, label: t }) {
  return /* @__PURE__ */ a("div", { className: X.board, "data-ward-board": "", children: /* @__PURE__ */ a(ca, { label: t, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ a(Rr, { children: n.content }, n.id)) }) });
}
function KR({ children: e, label: t = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = it(Om);
  return n === void 0 ? /* @__PURE__ */ a(ca, { label: t, children: e }) : l ? /* @__PURE__ */ a(jm, { lanes: n, label: t, laneLabel: r }) : /* @__PURE__ */ a(Dm, { lanes: n, label: t });
}
function GR({ columns: e, children: t, label: n = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), i = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ a(Bt, { className: X.stageGrid, label: n, count: l, "data-ward-stage-grid": "", "data-floor": r, style: i, children: t });
}
function UR({ children: e, label: t }) {
  return /* @__PURE__ */ a("div", { className: `${X.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const Hm = "_block_6tv5x_3", Fm = "_sentence_6tv5x_10", zm = "_meta_6tv5x_19", Wm = "_ways_6tv5x_24", Km = "_action_6tv5x_38", Gm = "_strip_6tv5x_42", Um = "_loading_6tv5x_61", Vm = "_label_6tv5x_69", Ym = "_counter_6tv5x_76", we = {
  block: Hm,
  sentence: Fm,
  meta: zm,
  ways: Wm,
  action: Km,
  strip: Gm,
  loading: Um,
  label: Vm,
  counter: Ym
};
function Jm({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("span", { className: we.action, children: /* @__PURE__ */ a(b, { onClick: e.onClick, children: e.label }) });
}
function Ot({ sentence: e, action: t, children: n, role: r = "status", tone: l, kind: i, ask: s }) {
  return /* @__PURE__ */ o("div", { className: `${we.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ o("p", { className: we.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ o(R, { children: [
        " ",
        /* @__PURE__ */ a("strong", { children: s })
      ] })
    ] }),
    n,
    /* @__PURE__ */ a(Jm, { action: t })
  ] });
}
function Xm(e) {
  return /* @__PURE__ */ a(Ot, { ...e, kind: "ward-emptystate" });
}
function VR({ sentence: e, total: t, action: n }) {
  return /* @__PURE__ */ a(Ot, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: we.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function Qm({ ways: e }) {
  return /* @__PURE__ */ a("div", { className: `${we.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ a(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function YR({ ways: e, ...t }) {
  return /* @__PURE__ */ a(Ot, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ a(Qm, { ways: e }) });
}
function JR({ sentence: e, at: t, onRetry: n }) {
  return /* @__PURE__ */ a(Ot, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: we.meta, children: [
    "failed at ",
    ue(t)
  ] }) });
}
function XR({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ o("div", { className: we.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ue(e),
    ". Showing snapshot from ",
    ue(t)
  ] });
}
function QR({ queued: e, since: t }) {
  return /* @__PURE__ */ o("div", { className: we.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    ue(t)
  ] });
}
function ZR({ label: e, startedAt: t }) {
  const n = _(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  C(() => {
    const s = window.setTimeout(() => l(!0), _e.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = ra(n.current, r);
  return /* @__PURE__ */ o("div", { className: `${we.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ a("span", { className: we.label, children: e }),
    r ? /* @__PURE__ */ a("span", { className: we.counter, children: aa(i) }) : null
  ] });
}
const Zm = "_note_cigdt_2", ew = {
  note: Zm
};
function tw({ label: e, count: t, cap: n }) {
  return /* @__PURE__ */ o("p", { className: ew.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    n
  ] });
}
const aw = "_card_k7btg_3", nw = "_hit_k7btg_31", rw = "_head_k7btg_44", lw = "_title_k7btg_51", ow = "_meta_k7btg_57", iw = "_since_k7btg_66", sw = "_sep_k7btg_76", cw = "_fields_k7btg_80", dw = "_field_k7btg_80", uw = "_last_k7btg_98", hw = "_reason_k7btg_110", ce = {
  card: aw,
  hit: nw,
  head: rw,
  title: lw,
  meta: ow,
  since: iw,
  sep: sw,
  fields: cw,
  field: dw,
  last: uw,
  reason: hw
}, mw = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function ww(e, t, n) {
  const r = bt(e, "blue"), l = bt(e, "orange"), i = bt(e, "green"), s = _(/* @__PURE__ */ new Set());
  C(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = mw[d.type];
      u && c[u]();
    });
  }, [r, n, i, t, l]);
}
const fw = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function _w(e, t) {
  return fw[t](e);
}
function vw({ item: e, connection: t }) {
  const n = /* @__PURE__ */ a("span", { className: ce.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ o("p", { className: ce.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    n,
    /* @__PURE__ */ a(Le, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: ce.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.waitsOn,
    n,
    /* @__PURE__ */ o("span", { className: ce.since, children: [
      de(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function bw({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: ce.head, children: [
    e.flagged && /* @__PURE__ */ a(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ a(m, { role: t.role, label: t.label })
  ] });
}
function pw({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: ce.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function gw({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ a("p", { className: ce.fields, children: t.map((n) => /* @__PURE__ */ a("span", { className: ce.field, children: _w(e, n) }, n)) });
}
const Xt = (e) => e ? !0 : void 0;
function yw(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function Nw(e, t, n) {
  e == null || e(t, n);
}
function kw(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function $w({ item: e, stale: t }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ a("p", { className: ce.last, "data-stale": Xt(t), children: n }) : null;
}
function jt(e) {
  const t = e.fields ?? [], n = e.item, r = _(null);
  ww(r, n.key, e.feed);
  const l = kw(e.feed), i = yw(n);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": n.key,
      className: ce.card,
      style: i,
      "data-selected": Xt(e.selected),
      "data-flagged": Xt(n.flagged),
      children: [
        /* @__PURE__ */ a("button", { type: "button", className: ce.hit, onClick: (s) => Nw(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ a(bw, { item: n }),
        /* @__PURE__ */ a(at, { as: "p", className: ce.title, text: n.title }),
        /* @__PURE__ */ a(vw, { item: n, connection: l }),
        /* @__PURE__ */ a(pw, { reason: n.blockedReason }),
        /* @__PURE__ */ a(gw, { item: n, fields: t }),
        /* @__PURE__ */ a($w, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const Cw = "_column_1j8bi_3", Sw = "_head_1j8bi_21", Rw = "_label_1j8bi_30", Tw = "_count_1j8bi_39", xw = "_list_1j8bi_53", lt = {
  column: Cw,
  head: Sw,
  label: Rw,
  count: Tw,
  list: xw
};
function qn(e, t) {
  return [...e].sort((n, r) => t === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function Lw({ column: e, count: t, id: n }) {
  return /* @__PURE__ */ o("div", { className: lt.head, children: [
    /* @__PURE__ */ a("h2", { className: lt.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ a(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: lt.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Aw(e) {
  return /* @__PURE__ */ a("div", { className: lt.list, role: "list", children: e.rows.map((t, n) => {
    var r;
    return /* @__PURE__ */ a(
      jt,
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
function Ew({ column: e, items: t, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), h = e.cap !== void 0 && t.length > e.cap, w = qn(t, r);
  return /* @__PURE__ */ o("section", { className: lt.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ a(Lw, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ a(Aw, { column: e, items: t, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ a(tw, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const Iw = "_foot_cs4jr_2", Mw = "_note_cs4jr_13", Bw = "_link_cs4jr_19", Wt = {
  foot: Iw,
  note: Mw,
  link: Bw
};
function e2({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Wt.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ a("p", { className: Wt.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ a("a", { className: `${Wt.link} ward-target`, href: H(e), children: "Configure board" })
  ] });
}
const Pw = "_head_1tfi5_3", qw = "_identity_1tfi5_12", Ow = "_titleRow_1tfi5_18", jw = "_title_1tfi5_18", Dw = "_key_1tfi5_35", Hw = "_rollup_1tfi5_45", Fw = "_tools_1tfi5_53", zw = "_swatch_1tfi5_101", Ww = "_mark_1tfi5_108", Se = {
  head: Pw,
  identity: qw,
  titleRow: Ow,
  title: jw,
  key: Dw,
  rollup: Hw,
  tools: Fw,
  swatch: zw,
  mark: Ww
}, Oa = "initials:";
function Kw(e) {
  return e === void 0 ? "loaded this week unavailable" : `${te(e)} loaded this week`;
}
function Gw(e) {
  const t = [Kw(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${te(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${de(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${de(e.p90)}`), t.join(" · ");
}
function Uw(e) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      te(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Gw(e)
  ] });
}
function Vw(e) {
  return e.startsWith(Oa) ? e.slice(Oa.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function Yw({ markRef: e, streamStep: t }) {
  const n = { "--stream": pe(t, "id") };
  return e ? /* @__PURE__ */ a("span", { className: `${Se.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: Vw(e) }) : /* @__PURE__ */ a("span", { className: Se.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Jw({ owners: e, owner: t, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ a(M, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: n, options: e });
}
function t2({
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
        /* @__PURE__ */ a(Yw, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ a("h1", { className: Se.title, children: e.name }),
        /* @__PURE__ */ a("span", { className: Se.key, children: e.key })
      ] }),
      /* @__PURE__ */ a("p", { className: Se.rollup, "aria-live": "polite", children: Uw(t) })
    ] }),
    /* @__PURE__ */ o("div", { className: Se.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ a(Jw, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ a(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ a(sa, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const Xw = "_head_1sejb_14", Qw = "_line_1sejb_15", Zw = "_cHandle_1sejb_36", ef = "_cName_1sejb_41", tf = "_nameLine_1sejb_49", af = "_cLabel_1sejb_56", nf = "_cCap_1sejb_61", rf = "_cShown_1sejb_66", lf = "_name_1sejb_49", of = "_noCap_1sejb_88", sf = "_state_1sejb_102", cf = "_handle_1sejb_111", df = "_sub_1sejb_137", B = {
  head: Xw,
  line: Qw,
  cHandle: Zw,
  cName: ef,
  nameLine: tf,
  cLabel: af,
  cCap: nf,
  cShown: rf,
  name: lf,
  noCap: of,
  state: sf,
  handle: cf,
  sub: df
}, uf = "can't be hidden or collapsed", hf = "terminal · counted, not a column";
function a2() {
  return /* @__PURE__ */ o("div", { className: B.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ a("span", { className: B.cHandle }),
    /* @__PURE__ */ a("span", { className: B.cName, children: "Stage" }),
    /* @__PURE__ */ a("span", { className: B.cLabel, children: "Column label" }),
    /* @__PURE__ */ a("span", { className: B.cCap, children: "WIP cap" }),
    /* @__PURE__ */ a("span", { className: B.cShown, children: "Shown" })
  ] });
}
function mf(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function wf(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function ja(e) {
  return e.gate ? uf : e.terminal ? hf : wf(e.agentsMounted);
}
function ff(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function _f({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: B.cName, children: [
    /* @__PURE__ */ o("span", { className: B.nameLine, children: [
      /* @__PURE__ */ a("span", { className: B.name, children: e.name }),
      e.gate && /* @__PURE__ */ a(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    ja(e) && /* @__PURE__ */ a("span", { className: B.sub, children: ja(e) })
  ] });
}
function vf(e) {
  return e === void 0 ? "" : String(e);
}
function bf(e) {
  return e === "" ? void 0 : Number(e);
}
function pf({ name: e, onReorder: t }) {
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
      onKeyDown: (r) => !n && ff(r, t),
      children: "⠿"
    }
  ) });
}
function gf({ stage: e, config: t, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ a("span", { className: `${B.cCap} ${B.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ a("span", { className: B.cCap, children: /* @__PURE__ */ a(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: vf(t.cap), onChange: (r) => n({ ...t, cap: bf(r) }) }) });
}
function yf({ stage: e, config: t, onChange: n }) {
  const r = Ae() !== null, l = mf(e, t.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...t, shown: c });
  return /* @__PURE__ */ o("span", { className: B.cShown, children: [
    /* @__PURE__ */ a(Ue, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ a("span", { className: B.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function Nf(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function n2({ stage: e, config: t, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: B.line, "data-kind": Nf(e), children: [
    /* @__PURE__ */ a(pf, { name: e.name, onReorder: r }),
    /* @__PURE__ */ a(_f, { stage: e }),
    /* @__PURE__ */ a("span", { className: B.cLabel, children: /* @__PURE__ */ a(M, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (l) => n({ ...t, label: l }) }) }),
    /* @__PURE__ */ a(gf, { stage: e, config: t, onChange: n }),
    /* @__PURE__ */ a(yf, { stage: e, config: t, onChange: n })
  ] });
}
const kf = "_body_8qsv9_2", $f = "_head_8qsv9_9", Cf = "_summary_8qsv9_19", Sf = "_block_8qsv9_20", Rf = "_actionsBlock_8qsv9_21", Tf = "_title_8qsv9_41", xf = "_note_8qsv9_46", Lf = "_k_8qsv9_51", Af = "_kv_8qsv9_58", Ef = "_row_8qsv9_64", If = "_label_8qsv9_75", Mf = "_value_8qsv9_84", Bf = "_quote_8qsv9_90", Pf = "_actions_8qsv9_21", qf = "_resolve_8qsv9_111", O = {
  body: kf,
  head: $f,
  summary: Cf,
  block: Sf,
  actionsBlock: Rf,
  title: Tf,
  note: xf,
  k: Lf,
  kv: Af,
  row: Ef,
  label: If,
  value: Mf,
  quote: Bf,
  actions: Pf,
  resolve: qf
};
function Of(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function jf(e, t) {
  if (!e.run) return [];
  const n = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ a(Le, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Df(e) {
  const t = ht(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function Hf(e) {
  return (e ?? []).map((t, n) => [t.label, t.value, `fact-${n}`]);
}
function Ff(e, t, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ a(m, { ...Pt(Df(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", de(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Of(e),
    ...Hf(n),
    ...jf(e, t)
  ];
}
function zf({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: O.resolve, "aria-label": t, children: [
    /* @__PURE__ */ a("h3", { className: O.k, children: t }),
    e
  ] });
}
function Wf(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function Kf({ item: e, showKey: t }) {
  const n = Wf(e);
  return !t && !n ? null : /* @__PURE__ */ o("div", { className: O.head, children: [
    t && /* @__PURE__ */ a(m, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ a(m, { role: n.role, label: n.label })
  ] });
}
function Gf({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: O.block, children: [
    /* @__PURE__ */ a("p", { className: O.k, children: "What the agent says" }),
    /* @__PURE__ */ a("p", { className: O.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ a("p", { className: O.note, children: e.agentMeta })
  ] }) : null;
}
function r2({ item: e, actions: t, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = N(), w = Ff(e, l, d);
  return /* @__PURE__ */ a(nt, { kind: "drawer", labelledBy: h, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: O.body, children: [
    /* @__PURE__ */ a(Kf, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: O.summary, children: [
      /* @__PURE__ */ a("h2", { className: O.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ a("p", { className: O.note, children: e.summary })
    ] }),
    /* @__PURE__ */ a("dl", { className: O.kv, children: w.map(([f, y, E]) => /* @__PURE__ */ o("div", { className: O.row, children: [
      /* @__PURE__ */ a("dt", { className: O.label, children: f }),
      /* @__PURE__ */ a("dd", { className: O.value, children: y })
    ] }, E ?? f)) }),
    /* @__PURE__ */ a(Gf, { item: e }),
    /* @__PURE__ */ o("div", { className: O.actionsBlock, children: [
      /* @__PURE__ */ a("div", { className: O.actions, children: t }),
      c && /* @__PURE__ */ a("p", { className: O.note, children: c })
    ] }),
    /* @__PURE__ */ a(zf, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Uf = "_root_3azmy_2", Vf = "_list_3azmy_7", Yf = "_item_3azmy_12", Jf = "_box_3azmy_18", Xf = "_text_3azmy_23", Qf = "_note_3azmy_28", Ye = {
  root: Uf,
  list: Vf,
  item: Yf,
  box: Jf,
  text: Xf,
  note: Qf
};
function Dt({ items: e, note: t, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ye.root, "data-density": n, children: [
    /* @__PURE__ */ a("ul", { className: `${Ye.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ye.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ a("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ye.box, children: /* @__PURE__ */ a(ia, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ a("span", { className: Ye.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ a("p", { className: `${Ye.note} ward-checklist-note`, children: t })
  ] });
}
const Zf = "_rail_znbbp_2", e_ = "_k_znbbp_11", t_ = "_head_znbbp_19", a_ = "_section_znbbp_25", n_ = "_card_znbbp_39", r_ = "_strip_znbbp_46", l_ = "_skeleton_znbbp_60", o_ = "_skeletonLabel_znbbp_74", i_ = "_bar_znbbp_80", s_ = "_note_znbbp_89", me = {
  rail: Zf,
  k: e_,
  head: t_,
  section: a_,
  card: n_,
  strip: r_,
  skeleton: l_,
  skeletonLabel: o_,
  bar: i_,
  note: s_
};
function c_(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Kt({ title: e, children: t }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ a("h3", { className: me.k, children: e }),
    t
  ] });
}
function d_({ column: e, count: t }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ a("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (n, r) => /* @__PURE__ */ a("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function u_({ draft: e, sample: t, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ a(Ew, { column: l, items: t.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function h_(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ a(u_, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ a(d_, { column: t, count: e.sample.filter((n) => n.stage === t.id).length }, t.id));
}
function l2(e) {
  const t = c_(e.onOpen), n = qn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ a("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ a(Kt, { title: "Card", children: /* @__PURE__ */ a("div", { className: me.card, children: n && /* @__PURE__ */ a(jt, { item: n, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Kt, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ a("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ a(h_, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ a("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ a(Kt, { title: "Effect of this config", children: /* @__PURE__ */ a(Dt, { items: e.effects, density: "compact" }) })
  ] });
}
function m_(e, t) {
  return (n) => {
    e.current = n, t(n);
  };
}
function w_(e) {
  return Math.ceil(e.length / 2);
}
function f_(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function On(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function __(e, t, n, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const l = On(e);
  l !== void 0 && n(l), r(f_(e.type));
}
function v_(e, t, n, r, l) {
  C(() => {
    if (e !== null)
      return e.subscribe(t, (i) => __(i, n, r, l));
  }, [e, t, n, r, l]);
}
function b_(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function p_(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function g_(e, t) {
  return t !== void 0 ? de(e.timeInStage) + " · waits on " + t.agent : de(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function y_(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(w_(t ?? [])) + ")"
  };
}
function N_(e, t) {
  return /* @__PURE__ */ a("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function k_(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ a(m, { role: "meta", label: le(e.cost) }) : null;
}
function $_(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ a(m, { role: "meta", label: e.jiraKey }) : null;
}
function C_(e, t, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ a(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: n ?? "live", turn: e.turn });
}
function S_(e, t, n) {
  return t === void 0 ? e.finding ?? "" : n ?? "";
}
function R_(e, t) {
  return t === void 0 ? e : m_(e, t.ref);
}
function T_(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function st(e) {
  return e === !0 ? "true" : void 0;
}
function jn(e) {
  const t = e.item, n = t.run, r = n !== void 0, l = _(null), i = bt(l), s = _(/* @__PURE__ */ new Set()), [c, d] = p(b_(t));
  v_(e.feed, t.key, s, d, i);
  const u = p_(t, r), h = g_(t, n), w = y_(t, e.fields), f = S_(t, n, c);
  return /* @__PURE__ */ a("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...T_(e),
      className: "ward-workcard",
      "data-flagged": st(t.flagged),
      "data-selected": st(e.selected),
      style: w,
      ref: R_(l, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        N_(t, e.fields),
        /* @__PURE__ */ a("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ a(m, { role: u.role, label: u.label }),
          k_(t, e.fields),
          $_(t, e.fields)
        ] }),
        /* @__PURE__ */ a("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          C_(n, c, e.connection, t.changedAt),
          f !== "" ? /* @__PURE__ */ a("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function x_({ count: e, cap: t }) {
  return /* @__PURE__ */ a("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function L_(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function A_(e, t, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ a("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ a(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ a(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function E_(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ a(x_, { count: e.items.length, cap: e.column.cap });
}
function I_(e, t) {
  return e.roving ?? t;
}
function M_(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function B_(e, t) {
  return e.items.map((n, r) => /* @__PURE__ */ a(
    jn,
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
function P_(e) {
  const t = N(), n = Et({ orientation: "vertical" }), r = I_(e, n), l = L_(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": st(l), "data-gate": st(e.column.gate), children: [
    A_(e.column, e.items.length, t),
    E_(e, l),
    /* @__PURE__ */ a("ul", { role: "list", className: "ward-boardcol-list", ...M_(e, n), children: B_(e, r) })
  ] });
}
function q_(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + de(e.p50)), e.p90 !== void 0 && (t += " · p90 " + de(e.p90)), t;
}
function O_(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ a(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function j_(e) {
  return e === void 0 ? null : /* @__PURE__ */ a(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function o2(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ a(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ a(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ a("div", { className: "ward-rollup", "aria-live": "polite", children: q_(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      O_(e),
      j_(e.onConfigure),
      /* @__PURE__ */ a(sa, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function D_(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function H_(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ a(Ue, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ a(Ue, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function F_(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(R, { children: [
    t > 0 ? /* @__PURE__ */ a(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ a(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function i2(e) {
  const t = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": st(D_(t)), children: [
    /* @__PURE__ */ a("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ a("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ a("span", { children: H_(e) }),
    /* @__PURE__ */ a(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ a(un, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    F_(t),
    /* @__PURE__ */ a("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ a("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function s2(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ a(jn, { item: t, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ a(P_, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ a("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ a("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ a("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function z_(e, t) {
  const n = On(e);
  n !== void 0 && t(n);
}
function W_(e, t, n) {
  C(() => {
    if (e != null)
      return e.subscribe(t, (r) => z_(r, n));
  }, [e, t, n]);
}
function K_(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function G_(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", de(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function U_(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ a("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ a(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function V_(e, t) {
  return /* @__PURE__ */ o(R, { children: [
    e.state !== void 0 ? /* @__PURE__ */ a(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ a("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ a("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function c2(e) {
  var s;
  const t = e.item, n = t.run, [r, l] = p((s = t.run) == null ? void 0 : s.lastStep);
  W_(e.feed, t.key, l);
  const i = [...K_(t), ...G_(t)];
  return /* @__PURE__ */ o(nt, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ a("dt", { children: c[0] }),
        /* @__PURE__ */ a("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      U_(n, r)
    ] }),
    V_(t, e.actions)
  ] });
}
const Y_ = "_card_1nkkx_3", J_ = "_head_1nkkx_30", X_ = "_mark_1nkkx_38", Q_ = "_name_1nkkx_50", Z_ = "_chips_1nkkx_71", ev = "_description_1nkkx_77", tv = "_run_1nkkx_82", av = "_sep_1nkkx_91", nv = "_facts_1nkkx_97", rv = "_fact_1nkkx_97", lv = "_factLabel_1nkkx_111", ov = "_factValue_1nkkx_115", oe = {
  card: Y_,
  head: J_,
  mark: X_,
  name: Q_,
  chips: Z_,
  description: ev,
  run: tv,
  sep: av,
  facts: nv,
  fact: rv,
  factLabel: lv,
  factValue: ov
}, iv = { live: "done", draft: "running", paused: "meta" };
function sv(e) {
  return e === void 0 ? oe.card : `${oe.card} ${e}`;
}
function cv({ versions: e }) {
  return /* @__PURE__ */ a("div", { className: oe.chips, children: e.map((t) => /* @__PURE__ */ a(m, { role: iv[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function dv({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("p", { className: oe.description, children: e });
}
function uv({ run: e, connection: t, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: oe.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ a("span", { className: oe.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ a(Le, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function hv({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ a("dl", { className: oe.facts, children: e.map((t) => /* @__PURE__ */ o("div", { className: oe.fact, children: [
    /* @__PURE__ */ a("dt", { className: oe.factLabel, children: t.label }),
    /* @__PURE__ */ a("dd", { className: oe.factValue, children: t.value })
  ] }, t.label)) });
}
function mv(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function wv({ agent: e, href: t, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: sv(s),
      style: c,
      "data-selected": d,
      "data-paused": mv(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: oe.head, children: [
          /* @__PURE__ */ a("span", { className: oe.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ a("a", { className: `${oe.name} ward-rowlink ward-target`, href: H(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ a(dv, { description: e.description }),
        /* @__PURE__ */ a(uv, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ a(cv, { versions: e.versions }),
        /* @__PURE__ */ a(hv, { facts: i })
      ]
    }
  );
}
const fv = "_list_4dcyc_2", _v = "_row_4dcyc_11", vv = "_head_4dcyc_23", bv = "_id_4dcyc_30", pv = "_lock_4dcyc_35", gv = "_reason_4dcyc_41", yv = "_remove_4dcyc_46", Nv = "_clauses_4dcyc_50", kv = "_clause_4dcyc_50", $v = "_label_4dcyc_64", Cv = "_cell_4dcyc_71", Sv = "_value_4dcyc_76", se = {
  list: fv,
  row: _v,
  head: vv,
  id: bv,
  lock: pv,
  reason: gv,
  remove: yv,
  clauses: Nv,
  clause: kv,
  label: $v,
  cell: Cv,
  value: Sv
}, Dn = ye(!1);
function d2({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ a(Dn.Provider, { value: !0, children: /* @__PURE__ */ a("ol", { className: se.list, "aria-label": t, children: e }) });
}
function Rv({ clause: e, ruleId: t, onChange: n }) {
  if (!n) return /* @__PURE__ */ a("span", { className: se.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ a(M, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function Tv({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: se.lock, children: [
    /* @__PURE__ */ a(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ a("span", { className: se.reason, children: e })
  ] });
}
function xv({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ o("span", { className: se.head, children: [
    /* @__PURE__ */ a("span", { className: se.id, children: e.id }),
    e.locked && /* @__PURE__ */ a(Tv, { reason: e.lockedReason }),
    t && /* @__PURE__ */ a("span", { className: se.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Da(e, t) {
  return e.locked ? void 0 : t;
}
function u2({ rule: e, onChange: t, onRemove: n }) {
  if (!ge(Dn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Da(e, t);
  return /* @__PURE__ */ o("li", { className: se.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ a(xv, { rule: e, onRemove: Da(e, n) }),
    /* @__PURE__ */ a("dl", { className: se.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: se.clause, children: [
      /* @__PURE__ */ a("dt", { className: se.label, children: l.label }),
      /* @__PURE__ */ a("dd", { className: se.cell, children: /* @__PURE__ */ a(Rv, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Lv = "_ladder_1xdeh_2", Av = "_cell_1xdeh_7", Ev = "_empty_1xdeh_26", Iv = "_name_1xdeh_34", Mv = "_holder_1xdeh_40", Bv = "_request_1xdeh_46", Pv = "_swatches_1xdeh_51", qv = "_swatch_1xdeh_51", Ov = "_tilesFrame_1xdeh_78", jv = "_tiles_1xdeh_78", Dv = "_tile_1xdeh_78", Hv = "_bar_1xdeh_117", Fv = "_hex_1xdeh_128", zv = "_note_1xdeh_138", A = {
  ladder: Lv,
  cell: Av,
  empty: Ev,
  name: Iv,
  holder: Mv,
  request: Bv,
  swatches: Pv,
  swatch: qv,
  tilesFrame: Ov,
  tiles: jv,
  tile: Dv,
  bar: Hv,
  hex: Fv,
  note: zv
}, h2 = "not validated yet, pending a CVD matrix and dark stepping";
function Wv(e) {
  return e.reserved ? "reserved" : ct(e.step) ? "validated" : "partial";
}
function Hn(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Kv(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Gv({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ a(He, { size: 14, kind: "stream" }) : /* @__PURE__ */ a("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Uv(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function Vv(e, t, n) {
  return {
    "aria-checked": t,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Ha = (e) => String(e).padStart(2, "0");
function Yv(e, t, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : t ?? Hn(e, void 0);
}
function Jv({ step: e, validation: t, note: n }) {
  const r = t === "reserved";
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ a("span", { className: `${A.hex} ward-ladder-hex`, children: r ? `step ${Ha(e)}` : Vr(e) }),
    /* @__PURE__ */ a("span", { className: `${A.note} ward-ladder-note`, children: r ? n : `Step ${Ha(e)} · ${n}` })
  ] });
}
function Xv({ step: e, value: t, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = Wv(e), c = Hn(s, n), d = c !== "free", u = d || i, h = t === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, y = `${w} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...Vv(d, h, u), "data-validation": s, style: Kv(e, s), onClick: f, onKeyDown: (P) => Uv(P, f) }, label: y, name: w, holder: c, validation: s, note: Yv(s, n, h), step: e.step };
}
const Qv = {
  swatches: (e) => /* @__PURE__ */ a("span", { ...e.shared, title: e.label, className: `${A.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ a("span", { ...e.shared, className: `${A.tile} ward-ladder-cell`, children: /* @__PURE__ */ a(Jv, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${A.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ a(Gv, { validation: e.validation }),
    /* @__PURE__ */ a("span", { className: `${A.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ a("span", { className: `${A.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Zv(e) {
  return Qv[e.presentation](Xv(e));
}
function eb(e) {
  for (const t of e)
    if (!t.reserved && !It(t.step)) throw new Error("colour ladder renders token steps only");
}
function tb() {
  return /* @__PURE__ */ o("div", { className: `${A.cell} ward-ladder-cell ${A.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ a("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ a("span", { className: `${A.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ a("span", { className: `${A.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function ab(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const nb = { list: A.ladder, swatches: A.swatches, tiles: A.tilesFrame };
function rb() {
  return /* @__PURE__ */ o("div", { className: `${A.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ a("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ a("span", { className: `${A.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ a("span", { className: `${A.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const lb = { list: tb, swatches: () => null, tiles: rb };
function ob(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Fn(e) {
  const t = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  eb(e.steps);
  const r = ab(e), l = lb[r], i = /* @__PURE__ */ o(R, { children: [
    e.steps.map((s) => /* @__PURE__ */ a(Zv, { step: s, value: e.value, taken: t[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ a(l, {})
  ] });
  return /* @__PURE__ */ a("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...ob(e.disabled === !0), className: `${nb[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ a("div", { className: A.tiles, children: i }) : i });
}
const ib = "_rail_s06lm_2", sb = "_section_s06lm_12", cb = "_sectionFlush_s06lm_22", db = "_head_s06lm_26", ub = "_headLabel_s06lm_34", hb = "_sample_s06lm_42", mb = "_sampleLabel_s06lm_47", wb = "_sampleTitle_s06lm_54", fb = "_sampleMeta_s06lm_59", _b = "_trace_s06lm_65", vb = "_traceHead_s06lm_70", bb = "_steps_s06lm_78", pb = "_step_s06lm_78", gb = "_stepTitle_s06lm_97", yb = "_hollow_s06lm_107", Nb = "_stepBody_s06lm_115", kb = "_stepDetail_s06lm_127", $b = "_publish_s06lm_132", Cb = "_reason_s06lm_138", Sb = "_note_s06lm_143", Rb = "_reveal_s06lm_148", k = {
  rail: ib,
  section: sb,
  sectionFlush: cb,
  head: db,
  headLabel: ub,
  sample: hb,
  sampleLabel: mb,
  sampleTitle: wb,
  sampleMeta: fb,
  trace: _b,
  traceHead: vb,
  steps: bb,
  step: pb,
  stepTitle: gb,
  hollow: yb,
  stepBody: Nb,
  stepDetail: kb,
  publish: $b,
  reason: Cb,
  note: Sb,
  reveal: Rb
}, Fa = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Tb = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, xb = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Lb = { notSimulated: "not simulated", running: "running" };
function Ab(e) {
  return e.presentation === "foundry";
}
function Eb(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = t.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${t.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Ib(e, t) {
  var r;
  const n = Tb[e.status];
  return n !== void 0 ? n : ((r = t.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Mb(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Bb(e, t) {
  if (t.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Pb(e) {
  if (Mb(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function qb(e) {
  const [t, n] = p(!1);
  C(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ a("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Ob(e) {
  const t = Lb[e.kind];
  return t !== void 0 ? /* @__PURE__ */ a("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ a(He, { size: 6, kind: xb[e.kind], label: e.kind });
}
function jb(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Db(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ a(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Hb(e) {
  const { step: t } = e;
  return /* @__PURE__ */ o(qb, { kind: t.kind, children: [
    /* @__PURE__ */ a(Ob, { kind: t.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ a("span", { className: k.stepTitle, children: t.title }),
      /* @__PURE__ */ a(jb, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ a(Db, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function Fb(e, t) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && n.push(de(t)), n.join(" · ");
}
function zn(e) {
  const t = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ a("p", { className: k.traceHead, id: t, children: Fb(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ a("ol", { className: k.steps, "aria-labelledby": t, children: e.steps.map((n, r) => /* @__PURE__ */ a(Hb, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function zb(e) {
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
function Wb(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ue(e.sample.replayedFrom);
  return /* @__PURE__ */ a("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function Kb(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? en(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ a("div", { className: k.sectionFlush, children: /* @__PURE__ */ a(qt, { divided: !0, cells: t }) });
}
function Gb(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: en(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function Ub(e) {
  const t = Gb(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ a("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ a("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ a("div", { className: k.sectionFlush, children: /* @__PURE__ */ a(qt, { divided: !0, cells: t }) });
}
function Wn(e) {
  const t = N();
  return e.reason !== null ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("p", { className: `${k.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ a(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ a(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Vb(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ a(Wn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ a("p", { className: k.note, children: e.note })
  ] });
}
function Yb(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ a("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ a(Wn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Kn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ a("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ a(m, { role: Fa[e.run.status].role, label: Fa[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ a(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Jb(e, t) {
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
function Xb(e) {
  var n;
  Bb(e.run, e.checklist);
  const t = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ a(Kn, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ a(zb, { sample: e.run.sample }),
    /* @__PURE__ */ a(zn, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ a(Kb, { run: e.run }),
    /* @__PURE__ */ a("div", { className: k.section, children: /* @__PURE__ */ a(Dt, { items: e.checklist }) }),
    /* @__PURE__ */ a(Vb, { reason: Eb(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Qb(e) {
  var r;
  const t = Jb(e.run, e.feed);
  Pb(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ a(Kn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ a(Wb, { sample: e.run.sample }),
    /* @__PURE__ */ a(zn, { run: e.run, steps: t, connection: n, foundry: !0 }),
    /* @__PURE__ */ a(Ub, { run: e.run }),
    /* @__PURE__ */ a("div", { className: k.section, children: /* @__PURE__ */ a(Dt, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ a(Yb, { reason: Ib(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function m2(e) {
  return Ab(e) ? /* @__PURE__ */ a(Qb, { ...e }) : /* @__PURE__ */ a(Xb, { ...e });
}
const Zb = "_list_142ip_3", ep = "_row_142ip_9", tp = "_condition_142ip_18", ap = "_action_142ip_24", gt = {
  list: Zb,
  row: ep,
  condition: tp,
  action: ap
}, Gn = ye(!1);
function w2({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ a(Gn.Provider, { value: !0, children: /* @__PURE__ */ a("ol", { className: gt.list, "aria-label": t, children: e }) });
}
function f2({ rule: e }) {
  if (!ge(Gn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: gt.row, children: [
    /* @__PURE__ */ a(m, { role: "system", label: "When" }),
    /* @__PURE__ */ a("span", { className: gt.condition, children: e.when }),
    /* @__PURE__ */ a(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ a("span", { className: gt.action, children: e.then })
  ] });
}
const np = "_move_tmppt_3", rp = {
  move: np
};
function Qt(e, t, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(t, 1);
  return r.splice(n, 0, l), r;
}
function Un(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function Vn(e, t, n) {
  return `${e} moved to position ${t + 1} of ${n}.`;
}
function za(e, t, n) {
  return e.querySelector(`[data-move="${t}-${n}"]`);
}
function lp(e) {
  return e === "up" ? "down" : "up";
}
function op(e, t) {
  const n = za(e, t.id, t.direction) ?? za(e, t.id, lp(t.direction));
  n == null || n.focus();
}
function Yn() {
  const e = _(null), [t, n] = p(null), [r, l] = p("");
  return C(() => {
    e.current !== null && t !== null && op(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function Jn({ text: e }) {
  return /* @__PURE__ */ a("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Rt({ id: e, name: t, direction: n, onMove: r }) {
  return /* @__PURE__ */ a("button", { type: "button", className: `${rp.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${t} ${n}`, onClick: r, children: /* @__PURE__ */ a("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const ip = "_body_1jd1i_2", sp = "_title_1jd1i_8", cp = "_section_1jd1i_13", dp = "_legend_1jd1i_18", up = "_stages_1jd1i_26", hp = "_stage_1jd1i_26", mp = "_stageIndex_1jd1i_44", wp = "_stageName_1jd1i_50", fp = "_footer_1jd1i_59", _p = "_note_1jd1i_66", vp = "_reason_1jd1i_71", bp = "_actions_1jd1i_76", pp = "_webHead_1jd1i_83", gp = "_kicker_1jd1i_92", yp = "_webTitle_1jd1i_99", Np = "_webBody_1jd1i_105", kp = "_webSection_1jd1i_109", $p = "_sectionHead_1jd1i_121", Cp = "_sectionNote_1jd1i_129", Sp = "_formLabel_1jd1i_134", Rp = "_identityRow_1jd1i_139", Tp = "_nameCell_1jd1i_145", xp = "_keyCell_1jd1i_150", Lp = "_colourCell_1jd1i_154", Ap = "_colourStatus_1jd1i_161", Ep = "_webStages_1jd1i_166", Ip = "_webStageList_1jd1i_172", Mp = "_webStage_1jd1i_166", Bp = "_webIndex_1jd1i_191", Pp = "_webStageName_1jd1i_196", qp = "_webMoves_1jd1i_201", Op = "_addStage_1jd1i_215", jp = "_addStageButton_1jd1i_223", Dp = "_addStageNote_1jd1i_231", Hp = "_webFooter_1jd1i_236", Fp = "_webFooterNotes_1jd1i_244", zp = "_webNote_1jd1i_251", v = {
  body: ip,
  title: sp,
  section: cp,
  legend: dp,
  stages: up,
  stage: hp,
  stageIndex: mp,
  stageName: wp,
  footer: fp,
  note: _p,
  reason: vp,
  actions: bp,
  webHead: pp,
  kicker: gp,
  webTitle: yp,
  webBody: Np,
  webSection: kp,
  sectionHead: $p,
  sectionNote: Cp,
  formLabel: Sp,
  identityRow: Rp,
  nameCell: Tp,
  keyCell: xp,
  colourCell: Lp,
  colourStatus: Ap,
  webStages: Ep,
  webStageList: Ip,
  webStage: Mp,
  webIndex: Bp,
  webStageName: Pp,
  webMoves: qp,
  addStage: Op,
  addStageButton: jp,
  addStageNote: Dp,
  webFooter: Hp,
  webFooterNotes: Fp,
  webNote: zp
}, Wp = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Xn = "not in catalogue";
function Kp(e, t) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? n : [{ value: t, label: `${t || "(unnamed)"} · ${Xn}` }, ...n];
}
function Gp({ stage: e, index: t, catalogue: n, onName: r }) {
  const l = `Stage ${t + 1} name`;
  if (!n) return /* @__PURE__ */ a(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Xn}`;
  return /* @__PURE__ */ a(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Kp(n, e.name), invalid: i, onChange: r });
}
function Qn(e, t) {
  return e.name || `stage ${t + 1}`;
}
function Up(e) {
  const t = _([]), n = _(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${n.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function Vp({ id: e, stage: t, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Qn(t, n), d = t.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ a("span", { className: v.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ a("div", { className: v.webStageName, children: /* @__PURE__ */ a(Gp, { stage: t, index: n, catalogue: l, onName: (u) => i({ ...t, name: u }) }) }),
    /* @__PURE__ */ a(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: t.kind, options: Wp, onChange: (u) => i({ ...t, kind: u }) }),
    /* @__PURE__ */ o("span", { className: v.webMoves, children: [
      n > 0 && /* @__PURE__ */ a(Rt, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ a(Rt, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Yp({ stages: e, onChange: t, catalogue: n }) {
  const r = Up(e.length), l = Yn(), i = (c, d) => {
    const u = Un(c, d);
    r.current = Qt(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Vn(Qn(e[c], c), u, e.length)), t(Qt(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: v.webStages, children: [
    /* @__PURE__ */ a("ol", { ref: l.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ a(Vp, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ a(Jn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: v.addStage, children: [
      /* @__PURE__ */ a("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ a("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Jp = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Xp = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Qp = "A new stream starts as a draft. Nothing runs on it until you publish it.", Zp = "Create is disabled: name the stream and give it a key first.", eg = "reorder with the ↑ ↓ buttons · min 2";
function da(e, t) {
  return !e.reserved && ct(e.step) && t[e.step] === void 0;
}
function tg(e, t) {
  const n = e.find((r) => da(r, t));
  return n ? n.step : 1;
}
function ag({ stages: e, onMove: t }) {
  const n = Yn(), r = (l, i) => {
    const s = Un(l, i);
    n.moved({ id: e[l].id, direction: i }, Vn(e[l].name, s, e.length)), t(l, s);
  };
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("ol", { ref: n.root, className: v.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: v.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ a("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ a("span", { className: v.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ a(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ a(Rt, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ a(Rt, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ a(Jn, { text: n.announcement })
  ] });
}
function ng({ reason: e, onCreate: t, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: v.footer, children: [
    /* @__PURE__ */ a("p", { className: v.note, children: Qp }),
    e && /* @__PURE__ */ a("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: v.actions, children: [
      /* @__PURE__ */ a(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ a(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ a(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function rg(e, t) {
  return e !== "" && t !== "" ? null : Zp;
}
function lg(e) {
  const { owners: t, ladder: n, takenBy: r = {}, policies: l = Xp, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [h, w] = p(""), [f, y] = p(""), [E, P] = p(t[0].value), [ae, Ne] = p(() => tg(n, r)), [ne, Ee] = p(e.stages ?? Jp), [Ve, T] = p(l[0].value), U = { name: h, key: f, streamStep: ae, owner: E, stages: ne, policy: Ve }, ke = rg(h, f);
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
      /* @__PURE__ */ a(Fn, { label: "Stream colour", steps: n, value: ae, onChange: Ne, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ a("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ a(ag, { stages: ne, onMove: (Fe, $r) => Ee(Qt(ne, Fe, $r)) })
    ] }),
    /* @__PURE__ */ a(An, { legend: "Loop policy", options: l, value: Ve, onChange: T }),
    /* @__PURE__ */ a(ng, { reason: ke, onCreate: () => i(U), onDraft: () => s(U) })
  ] }) });
}
const Zn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], og = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function ig(e, t, n, r, l, i) {
  var c;
  const s = ((c = Zn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function sg(e, t) {
  return cg(e) && dg(e, t) && ug(e);
}
function cg(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function dg(e, t) {
  return e.colourStep === null || da({ step: e.colourStep }, t);
}
function ug(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function hg(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : da({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function mg({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ a("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ a("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function wg({ ready: e, draft: t, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: v.webFooter, children: [
    /* @__PURE__ */ o("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ a(mg, { stage: n }),
      !e && /* @__PURE__ */ a("p", { id: i, className: v.reason, children: og })
    ] }),
    l && /* @__PURE__ */ a(b, { variant: "secondary", onClick: () => l(t), children: "Save draft" }),
    e ? /* @__PURE__ */ a(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ a(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function fg({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: v.webHead, children: [
    /* @__PURE__ */ a("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ a("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function _g({ name: e, setName: t, streamKey: n, setKey: r, colour: l, owner: i }) {
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
function vg(e) {
  const t = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [f, y] = p("relay"), [E, P] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), ae = ig(l, s, d, h, f, E), Ne = sg(ae, r), ne = E.find((T) => T.kind === "agent" && T.name.trim() !== ""), Ee = /* @__PURE__ */ o("div", { className: v.colourCell, children: [
    /* @__PURE__ */ a("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ a(Fn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ve = /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("p", { className: v.colourStatus, "data-colour-status": "", children: hg(h, r) }),
    /* @__PURE__ */ a(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((T) => ({ value: T, label: T })), onChange: u })
  ] });
  return /* @__PURE__ */ o(nt, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ a(fg, { titleId: n }),
    /* @__PURE__ */ o("div", { className: v.webBody, children: [
      /* @__PURE__ */ a(_g, { name: l, setName: i, streamKey: s, setKey: c, colour: Ee, owner: Ve }),
      /* @__PURE__ */ o("section", { className: v.webSection, children: [
        /* @__PURE__ */ o("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ a("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ a("span", { className: v.sectionNote, children: eg })
        ] }),
        /* @__PURE__ */ a(Yp, { stages: E, onChange: P })
      ] }),
      /* @__PURE__ */ a("section", { className: v.webSection, children: /* @__PURE__ */ a(An, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: Zn, onChange: y }) }),
      /* @__PURE__ */ a(wg, { ready: Ne, draft: ae, agentStage: ne, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function _2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(vg, { ...e }) : /* @__PURE__ */ a(lg, { ...e });
}
const bg = "_row_bs8hc_2", pg = "_cell_bs8hc_6", gg = "_condition_bs8hc_11", yg = "_action_bs8hc_18", Ng = "_contract_bs8hc_24", kg = "_contractCondition_bs8hc_33", $g = "_contractAction_bs8hc_39", Z = {
  row: bg,
  cell: pg,
  condition: gg,
  action: yg,
  contract: Ng,
  contractCondition: kg,
  contractAction: $g
}, er = ["advance", "block", "escalate", "requestReview"], Wa = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Tt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function ua(e, t, n, r) {
  return n || !t ? /* @__PURE__ */ a("span", { className: Z.action, children: Wa[e.then] }) : /* @__PURE__ */ a(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => t({ ...e, then: l }),
      options: er.map((l) => ({ value: l, label: Wa[l] }))
    }
  );
}
function Cg({ rule: e, onChange: t, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ a("td", { className: Z.cell, children: /* @__PURE__ */ a(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ a("td", { className: Z.cell, children: /* @__PURE__ */ a("span", { className: Z.condition, title: Tt(e, r), children: Tt(e, r) }) }),
    /* @__PURE__ */ a("td", { className: Z.cell, children: /* @__PURE__ */ a(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ a("td", { className: Z.cell, children: ua(e, t, n) })
  ] });
}
function Sg({ rule: e, onChange: t, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ o("td", { className: Z.cell, children: [
      /* @__PURE__ */ a(m, { role: "system", label: "When" }),
      /* @__PURE__ */ a("span", { className: Z.condition, children: Tt(e, r) })
    ] }),
    /* @__PURE__ */ a("td", { className: Z.cell, children: ua(e, t, n) })
  ] });
}
function Rg({ rule: e, onChange: t, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Z.contract, children: [
    /* @__PURE__ */ a(m, { role: "system", label: "When" }),
    /* @__PURE__ */ a("span", { className: Z.contractCondition, children: Tt(e, r) }),
    /* @__PURE__ */ a(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ a("span", { className: Z.contractAction, children: ua(e, t, n, !0) })
  ] });
}
const Tg = { two: Sg, four: Cg, contract: Rg };
function v2(e) {
  var n;
  if (!er.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = Tg[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ a(t, { ...e });
}
const xg = "_column_g1uat_2", Lg = "_head_g1uat_17", Ag = "_index_g1uat_23", Eg = "_name_g1uat_29", Ig = "_meta_g1uat_38", Mg = "_mono_g1uat_43", Bg = "_gate_g1uat_50", Pg = "_reviewersLabel_g1uat_57", qg = "_reviewers_g1uat_57", Og = "_reviewer_g1uat_57", jg = "_agents_g1uat_74", Dg = "_workflowColumn_g1uat_79", Hg = "_workflowHead_g1uat_96", Fg = "_stageRow_g1uat_102", zg = "_stageLabel_g1uat_109", Wg = "_workflowTitle_g1uat_116", Kg = "_workflowMeta_g1uat_122", Gg = "_workflowGate_g1uat_127", Ug = "_gateNote_g1uat_135", Vg = "_cardNote_g1uat_140", Yg = "_reviewerList_g1uat_145", Jg = "_reviewerRow_g1uat_151", Xg = "_reviewerMark_g1uat_157", Qg = "_reviewerName_g1uat_167", Zg = "_terminalCard_g1uat_173", ey = "_terminalCount_g1uat_182", ty = "_workflowAgents_g1uat_188", ay = "_mount_g1uat_194", S = {
  column: xg,
  head: Lg,
  index: Ag,
  name: Eg,
  meta: Ig,
  mono: Mg,
  gate: Bg,
  reviewersLabel: Pg,
  reviewers: qg,
  reviewer: Og,
  agents: jg,
  workflowColumn: Dg,
  workflowHead: Hg,
  stageRow: Fg,
  stageLabel: zg,
  workflowTitle: Wg,
  workflowMeta: Kg,
  workflowGate: Gg,
  gateNote: Ug,
  cardNote: Vg,
  reviewerList: Yg,
  reviewerRow: Jg,
  reviewerMark: Xg,
  reviewerName: Qg,
  terminalCard: Zg,
  terminalCount: ey,
  workflowAgents: ty,
  mount: ay
}, ny = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function ha(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function tr(e) {
  return `${Math.round(e * 100)}%`;
}
function ry({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: S.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ a("p", { className: S.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ a("ul", { className: S.reviewers, children: t.map((n) => /* @__PURE__ */ a("li", { className: S.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ a(qt, { cells: [
      { value: tr(e.gateShare), label: "Gate share" },
      { value: te(e.count), label: "In stage" }
    ] })
  ] });
}
function ly({ stage: e }) {
  return /* @__PURE__ */ a(qt, { cells: [
    { value: te(e.count), label: "In stage" },
    { value: ha(e.closedThisWeek, te), label: "Closed this week" }
  ] });
}
function oy({ stage: e, titleId: t }) {
  return /* @__PURE__ */ o("header", { className: S.head, children: [
    /* @__PURE__ */ a("span", { className: S.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ a("h3", { className: S.name, id: t, children: e.name }),
    /* @__PURE__ */ a(m, { role: e.kind === "gate" ? "gate" : "soft", label: ny[e.kind] })
  ] });
}
function iy({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: S.meta, children: [
    /* @__PURE__ */ o("span", { className: S.mono, children: [
      te(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: S.mono, children: [
      de(e.medianWait),
      " median wait"
    ] })
  ] });
}
function sy({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ a(ry, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ a(ly, { stage: e }) : null;
}
function cy({ onMount: e }) {
  return e ? /* @__PURE__ */ a(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function dy({ stage: e, agents: t = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: S.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ a(oy, { stage: e, titleId: l }),
    /* @__PURE__ */ a(iy, { stage: e }),
    /* @__PURE__ */ a(sy, { stage: e }),
    /* @__PURE__ */ a("div", { className: S.agents, children: t.map((s) => /* @__PURE__ */ a(wv, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ a(cy, { onMount: n })
  ] });
}
const uy = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function hy({ reviewers: e }) {
  return /* @__PURE__ */ a("ul", { className: S.reviewerList, children: e.map((t, n) => /* @__PURE__ */ o("li", { className: S.reviewerRow, children: [
    /* @__PURE__ */ a("span", { className: S.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ a("span", { className: S.reviewerName, children: t.name })
  ] }, `${n}-${t.name}`)) });
}
function my({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: S.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: S.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ a(hy, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: S.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ a("span", { children: tr(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function wy(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function fy({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: S.terminalCard, children: [
    /* @__PURE__ */ a("span", { className: S.terminalCount, children: ha(e.closedThisWeek) }),
    /* @__PURE__ */ a("span", { className: S.cardNote, children: wy(e.rolledBackThisWeek) })
  ] });
}
function _y(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function vy(e) {
  if (e.kind === "terminal") return `${ha(e.closedThisWeek)} this week`;
  const t = _y(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function by({ stage: e, titleId: t }) {
  const n = uy[e.kind];
  return /* @__PURE__ */ o("header", { className: S.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: S.stageRow, children: [
      /* @__PURE__ */ o("span", { className: S.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ a(m, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ a("h3", { id: t, className: S.workflowTitle, children: e.name }),
    /* @__PURE__ */ a("span", { className: S.workflowMeta, children: vy(e) })
  ] });
}
function py(e) {
  return e === "entry" || e === "agent";
}
function gy({ stage: e, onMount: t }) {
  return t === void 0 || !py(e.kind) ? null : /* @__PURE__ */ a(b, { variant: "secondary", size: "sm", className: S.mount, onClick: () => t(e.index), children: "+ Mount agent" });
}
function yy({ stage: e, agentCards: t, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: S.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ a(by, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ a(my, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ a(fy, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ a("div", { className: S.workflowAgents, children: t }),
    /* @__PURE__ */ a(gy, { stage: e, onMount: n })
  ] });
}
function Ny(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function b2(e) {
  return Ny(e) ? /* @__PURE__ */ a(yy, { ...e }) : /* @__PURE__ */ a(dy, { ...e });
}
const ky = "_row_1tdra_6", $y = "_name_1tdra_12", Cy = "_compactRow_1tdra_13", Sy = "_compactName_1tdra_13", Ry = "_cell_1tdra_30", Ty = "_chain_1tdra_45", xy = "_owner_1tdra_51", Ly = "_mono_1tdra_57", Ay = "_compactCell_1tdra_79", Ey = "_stack_1tdra_96", Iy = "_stat_1tdra_103", My = "_identityLine_1tdra_110", By = "_identity_1tdra_110", Py = "_ownerLine_1tdra_140", qy = "_link_1tdra_160", Oy = "_gateMark_1tdra_166", jy = "_emptyChain_1tdra_171", Dy = "_arrow_1tdra_177", Hy = "_muted_1tdra_182", Fy = "_define_1tdra_187", zy = "_statValue_1tdra_194", Wy = "_policyId_1tdra_200", Ky = "_sub_1tdra_205", g = {
  row: ky,
  name: $y,
  compactRow: Cy,
  compactName: Sy,
  cell: Ry,
  chain: Ty,
  owner: xy,
  mono: Ly,
  compactCell: Ay,
  stack: Ey,
  stat: Iy,
  identityLine: My,
  identity: By,
  ownerLine: Py,
  link: qy,
  gateMark: Oy,
  emptyChain: jy,
  arrow: Dy,
  muted: Hy,
  define: Fy,
  statValue: zy,
  policyId: Wy,
  sub: Ky
};
function ar(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function Gy(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function Uy(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function nr(e) {
  return `${te(e)} ${e === 1 ? "member" : "members"}`;
}
function Vy(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${nr(e.members)}`;
}
function Yy(e, t) {
  const n = e.draft === !0;
  return /* @__PURE__ */ a("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ a("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ a("a", { className: `${g.compactName} ward-rowlink ward-target`, href: H(t), "data-draft": n, children: e.name }),
      /* @__PURE__ */ a(m, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ a("span", { className: g.ownerLine, children: Vy(e) })
  ] }) });
}
function rr({ name: e, gate: t, look: n, size: r }) {
  return /* @__PURE__ */ o(R, { children: [
    t ? /* @__PURE__ */ a("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ a(m, { ...n, size: r, label: e }),
    t ? /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Jy(e, t, n) {
  if (e !== t) return { role: "soft" };
  const r = ht(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function Xy({ stages: e, streamStep: t }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ a("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ a(rr, { name: l.name, gate: l.gate === !0, look: Jy(i, n, t), size: "tag" }),
    i === r ? null : /* @__PURE__ */ a("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function Qy(e) {
  return /* @__PURE__ */ a("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ a("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ a("span", { className: g.define, children: "Define workflow" })
  ] }) : Xy(e) });
}
function lr(e) {
  return e === void 0 ? void 0 : !0;
}
function Ka(e, t, n, r) {
  return /* @__PURE__ */ a("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ a("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ a("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": lr(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ a("span", { className: g.sub, children: t })
  ] }) });
}
function Zy(e) {
  return /* @__PURE__ */ a("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ a("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ a("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ a("span", { className: g.sub, children: e.summary })
  ] }) });
}
function eN(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function tN({ stream: e, href: t, presentation: n }) {
  const r = Uy(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: ar, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    Yy(e, t),
    Qy(e),
    Ka(eN(e.agents), e.agents === void 0 ? void 0 : Gy(e.agents), "—"),
    Zy(e.policy),
    Ka(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function aN(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function p2(e) {
  if (aN(e)) return tN(e);
  const { stream: t, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: ar, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ a("a", { className: `${g.name} ward-target`, href: H(n), children: t.name }),
      /* @__PURE__ */ a(m, { ...Pt(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ a(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ a("td", { className: g.cell, children: /* @__PURE__ */ a("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ a("span", { className: g.link, children: /* @__PURE__ */ a(rr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ a("span", { className: g.mono, children: nr(t.members) })
    ] }),
    /* @__PURE__ */ a("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ a("span", { className: g.mono, title: t.inFlightHint, "data-raised": lr(t.inFlightHint), children: te(t.inFlight) }) }),
    /* @__PURE__ */ a("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ a("span", { className: g.mono, children: t.p50 === void 0 ? "" : de(t.p50) }) })
  ] });
}
const nN = "_row_2u4ll_2", rN = "_name_2u4ll_16", lN = "_scope_2u4ll_24", xt = {
  row: nN,
  name: rN,
  scope: lN
};
function ma(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function oN(e) {
  return e === void 0 ? `${xt.row} ward-toolrow` : `${xt.row} ward-toolrow ${e}`;
}
function iN(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function sN({ id: e, reasonId: t, tool: n, state: r, onChange: l }) {
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
function cN({ classification: e }) {
  return /* @__PURE__ */ a(m, { role: e === "write" ? "write" : "meta", label: ma(e) });
}
function dN({ tool: e, state: t, reasonId: n }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ a("span", { id: t.locked ? n : void 0, className: `${xt.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function uN(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function g2({ tool: e, onChange: t, presentation: n }) {
  const r = N(), l = N(), i = iN(e, n), s = uN(n);
  return /* @__PURE__ */ o(s, { className: oN(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ a(sN, { id: r, reasonId: l, tool: e, state: i, onChange: t }),
    /* @__PURE__ */ a("label", { htmlFor: r, className: `${xt.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ a(dN, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ a(cN, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ a(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const hN = "_strip_4ppv9_2", mN = "_well_4ppv9_11", wN = "_head_4ppv9_18", fN = "_name_4ppv9_24", _N = "_chart_4ppv9_32", vN = "_segment_4ppv9_38", bN = "_detailedChart_4ppv9_44", pN = "_rail_4ppv9_57", gN = "_section_4ppv9_63", yN = "_label_4ppv9_74", NN = "_note_4ppv9_91", G = {
  strip: hN,
  well: mN,
  head: wN,
  name: fN,
  chart: _N,
  segment: vN,
  detailedChart: bN,
  rail: pN,
  section: gN,
  label: yN,
  note: NN
}, kN = "No item in flight to preview.", $N = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", CN = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Zt = [1, 2, 3, 4, 5, 6], Lt = 100;
function SN(e, t) {
  return t.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function RN({ draft: e, streams: t }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ a("svg", { className: G.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Zt.map((r, l) => /* @__PURE__ */ a(
    "rect",
    {
      className: G.segment,
      x: l * Lt,
      y: "0",
      width: Lt,
      height: "8",
      fill: SN(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function TN(e) {
  const t = e.slice(0, Zt.length);
  for (; t.length < Zt.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function xN({ identities: e }) {
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
function or(e) {
  return (t) => e == null ? void 0 : e(t);
}
function _t({ label: e, children: t }) {
  const n = N();
  return /* @__PURE__ */ o("section", { className: G.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ a("h4", { id: n, className: G.label, children: e }),
    t
  ] });
}
function LN({ sample: e, sampleEmpty: t, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ a("p", { className: G.note, children: t ?? kN }) : /* @__PURE__ */ a("div", { className: G.well, children: /* @__PURE__ */ a(jt, { item: { ...e, streamStep: ht(n.streamStep) }, onOpen: or(r), feed: null }) });
}
function AN({ draft: e }) {
  const t = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: G.head, style: t, children: [
    /* @__PURE__ */ a(He, { size: 8, kind: "stream" }),
    /* @__PURE__ */ a("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ a(m, { ...Pt(e.key, e.streamStep) })
  ] });
}
function EN(e) {
  const t = TN(e.identities ?? [e.draft, ...e.streams]), n = t[0];
  return /* @__PURE__ */ o("div", { className: G.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ a(_t, { label: "Board card", children: /* @__PURE__ */ a(LN, { ...e, draft: n }) }),
    /* @__PURE__ */ a(_t, { label: "Streams index row", children: /* @__PURE__ */ a(AN, { draft: n }) }),
    /* @__PURE__ */ o(_t, { label: "Overview chart segment", children: [
      /* @__PURE__ */ a(xN, { identities: t }),
      /* @__PURE__ */ a("p", { className: G.note, children: $N })
    ] }),
    /* @__PURE__ */ a(_t, { label: "Not themeable", children: /* @__PURE__ */ a("p", { className: G.note, children: CN }) })
  ] });
}
function IN({ draft: e, sample: t, streams: n, onOpen: r }) {
  const l = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: G.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: G.head, children: [
      /* @__PURE__ */ a(He, { size: 8, kind: "stream" }),
      /* @__PURE__ */ a("span", { className: G.name, children: e.name }),
      /* @__PURE__ */ a(m, { ...Pt(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ a("div", { className: G.well, children: /* @__PURE__ */ a(jt, { item: { ...t, streamStep: e.streamStep }, onOpen: or(r) }) }),
    /* @__PURE__ */ a(RN, { draft: e, streams: n })
  ] });
}
function y2(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ a(EN, { ...e }) : /* @__PURE__ */ a(IN, { ...e });
}
const MN = "_row_ixlg5_6", BN = "_headCell_ixlg5_10", PN = "_cell_ixlg5_11", qN = "_name_ixlg5_23", ON = "_consequence_ixlg5_29", jN = "_governed_ixlg5_36", DN = "_control_ixlg5_42", HN = "_byRole_ixlg5_48", FN = "_webControl_ixlg5_59", zN = "_webConsequence_ixlg5_65", WN = "_webGoverned_ixlg5_71", D = {
  row: MN,
  headCell: BN,
  cell: PN,
  name: qN,
  consequence: ON,
  governed: jN,
  control: DN,
  byRole: HN,
  webControl: FN,
  webConsequence: zN,
  webGoverned: WN
};
function KN({
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
function GN({ capability: e, cells: t, onChange: n }) {
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
    t.map((r) => /* @__PURE__ */ a("td", { className: D.cell, children: /* @__PURE__ */ a(KN, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function UN(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function VN({ name: e, cell: t, onChange: n }) {
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
function YN({ capability: e, cells: t, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ a("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ a("p", { className: `${D.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ a("td", { className: D.cell, children: /* @__PURE__ */ a(VN, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ a("td", { className: D.cell, children: /* @__PURE__ */ a("span", { className: `${D.webGoverned} ward-cellmeta`, children: UN(e) }) })
  ] });
}
function N2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(YN, { ...e }) : /* @__PURE__ */ a(GN, { ...e });
}
const JN = "_row_vv64h_2", XN = "_cell_vv64h_6", QN = "_name_vv64h_25", ZN = "_note_vv64h_30", e1 = "_webName_vv64h_41", t1 = "_webMeta_vv64h_47", Y = {
  row: JN,
  cell: XN,
  name: QN,
  note: ZN,
  webName: e1,
  webMeta: t1
}, ir = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function a1(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function n1({ component: e, onRestart: t }) {
  const n = N(), r = ir[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: Y.row, children: [
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a("span", { className: Y.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: Y.cell, "data-mono": "true", children: [
      te(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a("span", { id: n, className: Y.note, children: e.note }) }),
    /* @__PURE__ */ a("td", { className: Y.cell, "data-align": "end", children: l ? /* @__PURE__ */ a(b, { size: "sm", disabled: !0, describedBy: n, children: "Restart" }) : /* @__PURE__ */ a(b, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function r1({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ a(b, { size: "sm", onClick: () => t(e.name), children: a1(e.state) });
}
function l1({ component: e, onRestart: t }) {
  return /* @__PURE__ */ o("tr", { className: Y.row, children: [
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a("span", { className: `${Y.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a("span", { className: `${Y.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a(m, { ...ir[e.state] }) }),
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a(r1, { component: e, onRestart: t }) })
  ] });
}
function k2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(l1, { ...e }) : /* @__PURE__ */ a(n1, { ...e });
}
const o1 = "_row_jcm5k_7", i1 = "_cell_jcm5k_11", s1 = "_next_jcm5k_28", c1 = "_headCell_jcm5k_38", d1 = "_webId_jcm5k_77", u1 = "_webPurpose_jcm5k_83", h1 = "_webMeta_jcm5k_91", m1 = "_webUrgent_jcm5k_97", F = {
  row: o1,
  cell: i1,
  next: s1,
  headCell: c1,
  webId: d1,
  webPurpose: u1,
  webMeta: h1,
  webUrgent: m1
}, w1 = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, f1 = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, sr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], _1 = Object.fromEntries(sr.map((e) => [e.key, e]));
function Je({ column: e, children: t }) {
  const n = _1[e];
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
function $2() {
  return /* @__PURE__ */ a("tr", { children: sr.map((e) => /* @__PURE__ */ a(
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
function v1({ cred: e }) {
  const t = w1[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ a(Je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ a(Je, { column: "id", children: e.id }),
    /* @__PURE__ */ a(Je, { column: "state", children: /* @__PURE__ */ a(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ a(Je, { column: "cls", children: /* @__PURE__ */ a(m, { role: e.cls === "write" ? "write" : "meta", label: ma(e.cls) }) }),
    /* @__PURE__ */ a(Je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ a(Je, { column: "next", children: /* @__PURE__ */ a("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function b1({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ a("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ a("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function p1({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a(b1, { cred: e }) }),
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a(m, { ...f1[e.state] }) })
  ] });
}
function C2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(p1, { ...e }) : /* @__PURE__ */ a(v1, { ...e });
}
const g1 = "_card_lpp45_2", y1 = "_head_lpp45_11", N1 = "_env_lpp45_18", k1 = "_version_lpp45_25", $1 = "_meta_lpp45_32", C1 = "_webCard_lpp45_37", S1 = "_webRow_lpp45_47", R1 = "_webTitle_lpp45_55", T1 = "_webLine_lpp45_65", x1 = "_webVersion_lpp45_72", L1 = "_webMeta_lpp45_77", V = {
  card: g1,
  head: y1,
  env: N1,
  version: k1,
  meta: $1,
  webCard: C1,
  webRow: S1,
  webTitle: R1,
  webLine: T1,
  webVersion: x1,
  webMeta: L1
}, Ga = { dev: "Dev", uat: "UAT", prod: "Prod" }, cr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function A1({ env: e }) {
  const t = cr[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: V.card, "aria-label": Ga[e.env], children: [
    /* @__PURE__ */ o("div", { className: V.head, children: [
      /* @__PURE__ */ a("span", { className: V.env, children: Ga[e.env] }),
      /* @__PURE__ */ a(m, { role: t.role, label: t.label })
    ] }),
    /* @__PURE__ */ a("p", { className: V.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: V.meta, children: [
      "deployed ",
      ue(e.deployedAt)
    ] }),
    n && /* @__PURE__ */ a("p", { className: V.meta, children: n })
  ] });
}
function E1(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ue(e.deployedAt), t, e.ticket].filter((n) => n !== null).join(" · ");
}
function I1(e) {
  return /* @__PURE__ */ o("article", { className: `${V.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${V.webRow} ward-envrow`, children: [
      /* @__PURE__ */ a("span", { className: `${V.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ a(m, { ...cr[e.state] })
    ] }),
    /* @__PURE__ */ a("span", { className: `${V.version} ${V.webVersion} ${V.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ a("span", { className: `${V.meta} ${V.webMeta} ${V.webLine} ward-cellmeta`, children: E1(e) })
  ] });
}
function S2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(I1, { ...e }) : /* @__PURE__ */ a(A1, { ...e });
}
const M1 = "_panel_1hmja_2", B1 = "_line_1hmja_8", P1 = "_actions_1hmja_14", vt = {
  panel: M1,
  line: B1,
  actions: P1
};
function R2(e) {
  return /* @__PURE__ */ o("div", { className: vt.panel, children: [
    /* @__PURE__ */ a("p", { className: vt.line, children: e.status }),
    /* @__PURE__ */ a(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ a("div", { className: vt.actions, children: e.actions }),
    /* @__PURE__ */ a("p", { role: "status", className: vt.line, children: e.note ?? "" })
  ] });
}
const q1 = "_upload_13fcl_2", O1 = "_preview_13fcl_7", j1 = "_mark_13fcl_17", D1 = "_empty_13fcl_22", H1 = "_actions_13fcl_28", F1 = "_input_13fcl_33", z1 = "_reasons_13fcl_41", W1 = "_reason_13fcl_41", K1 = "_accepted_13fcl_57", re = {
  upload: q1,
  preview: O1,
  mark: j1,
  empty: D1,
  actions: H1,
  input: F1,
  reasons: z1,
  reason: W1,
  accepted: K1
}, dr = 1.5, ur = 22, At = "script elements or event handlers", Pe = "links or external references", xe = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${dr}px at ${ur}px`], G1 = [xe[1], xe[2], At, Pe], U1 = /* @__PURE__ */ new Map([
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
]), V1 = "http://www.w3.org/2000/svg", Y1 = "http://www.w3.org/2000/xmlns/", J1 = /* @__PURE__ */ new Set([
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
]), X1 = /* @__PURE__ */ new Set([
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
]), wa = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, Q1 = /url\s*\(|['"\\]/i;
function Z1() {
  return { ok: !1, reasons: [xe[1]] };
}
function hr(e) {
  return e.namespaceURI === V1;
}
function ek(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && hr(t) ? t : null;
  } catch {
    return null;
  }
}
function tk(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [xe[0]] : [];
}
function ak(e) {
  return U1.get(e.localName) ?? (e.localName.startsWith("animate") ? Pe : void 0);
}
function nk(e) {
  return Q1.test(e.replace(wa, ""));
}
function rk(e) {
  return /^on/i.test(e.localName) ? At : e.localName === "href" || nk(e.value) ? Pe : void 0;
}
function lk(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(ak(n));
    for (const r of Array.from(n.attributes)) t.add(rk(r));
  }
  return G1.filter((n) => t.has(n));
}
function ok(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...t.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? ur / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < dr;
  }) ? [xe[3]] : [];
}
function ik(e) {
  if (e.namespaceURI === Y1) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (X1.has(t) || t.startsWith("stroke"));
}
function sk(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && hr(t) && J1.has(t.localName);
}
function ck(e, t) {
  sk(t) ? t.nodeType === Node.ELEMENT_NODE && mr(t) : e.removeChild(t);
}
function mr(e) {
  for (const t of Array.from(e.attributes)) ik(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) ck(e, t);
  return e;
}
function dk(e) {
  return Array.from(e.matchAll(wa), (t) => t[2]).filter((t) => t !== "");
}
function uk(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n += 1) t = Math.imul(t ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function hk(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of dk(l.value)) n.has(i) || n.set(i, `${t}-${n.size}`);
  return n;
}
function mk(e, t) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(wa, (r, l, i) => {
      const s = t.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function wk(e, t) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = hk(n, t);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), mk(l, r);
  }
  return e;
}
function T2(e) {
  const t = ek(e);
  if (t === null) return Z1();
  const n = [...tk(t), ...lk(t), ...ok(t)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(wk(mr(t), uk(e))) };
}
const fk = "Mark accepted.", _k = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, vk = new Set(an.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function bk(e) {
  return e !== void 0 && (_k.test(e) || vk.has(e)) ? e : void 0;
}
function pk({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ a("div", { className: re.preview, style: { "--mark": bk(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ a("img", { className: re.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ a("span", { className: re.empty }) });
}
function gk(e, t) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[n];
}
function yk(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function Nk({ result: e }) {
  return e === null ? /* @__PURE__ */ a("div", { className: re.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ a("div", { className: re.result, role: "status", children: /* @__PURE__ */ a("p", { className: re.accepted, children: fk }) }) : /* @__PURE__ */ a("div", { className: re.result, role: "status", children: /* @__PURE__ */ a("ul", { className: re.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ a("li", { className: re.reason, children: t }, t)) }) });
}
function kk({ result: e, presentation: t }) {
  const n = t == null ? void 0 : t.status;
  return n === void 0 ? /* @__PURE__ */ a(Nk, { result: e }) : /* @__PURE__ */ a("p", { className: `${re.result} ${gk(e, n)}`, role: "status", children: yk(e, n) });
}
function Ua(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function x2({ current: e, onUpload: t, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = _(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ o("div", { className: re.upload, children: [
    /* @__PURE__ */ a(pk, { current: e }),
    /* @__PURE__ */ o("div", { className: re.actions, children: [
      /* @__PURE__ */ a(
        "input",
        {
          ref: i,
          className: re.input,
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
    /* @__PURE__ */ a(kk, { result: s, presentation: r })
  ] });
}
const $k = "_row_o3t6y_7", Ck = "_cell_o3t6y_11", Sk = "_head_o3t6y_28", Rk = "_name_o3t6y_34", Tk = "_pinned_o3t6y_42", xk = "_headCell_o3t6y_49", Lk = "_webName_o3t6y_88", Ak = "_webMeta_o3t6y_95", Ek = "_webWarn_o3t6y_103", q = {
  row: $k,
  cell: Ck,
  head: Sk,
  name: Rk,
  pinned: Tk,
  headCell: xk,
  webName: Lk,
  webMeta: Ak,
  webWarn: Ek
}, fa = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, wr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Ik = Object.fromEntries(wr.map((e) => [e.key, e]));
function Mk(e, t) {
  return `mcp.${e}.${t}`;
}
function Bk(e) {
  return Object.keys(fa).includes(e);
}
function Pk(e) {
  return fa[e !== void 0 && Bk(e) ? e : "unknown"];
}
function rt({ column: e, children: t }) {
  const n = Ik[e];
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
function L2() {
  return /* @__PURE__ */ a("tr", { children: wr.map((e) => /* @__PURE__ */ a(
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
function qk({ server: e }) {
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
    /* @__PURE__ */ a(rt, { column: "tools", children: e.tools.map((n) => Mk(e.name, n)).join(" · ") })
  ] });
}
function Ok(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function jk(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function Dk({ pinned: e }) {
  return e === null ? /* @__PURE__ */ a("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ a("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Hk({ server: e, onRestart: t }) {
  var n;
  return t === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ a("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ a(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function Fk({ name: e, pinned: t, onPin: n }) {
  return t !== null || n === void 0 ? null : /* @__PURE__ */ a(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function zk({ server: e, onRestart: t, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ a("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ a("span", { className: `${q.webMeta} ward-cellmeta`, children: Ok(e) })
    ] }),
    /* @__PURE__ */ a("td", { className: q.cell, children: /* @__PURE__ */ a("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ a("td", { className: q.cell, children: /* @__PURE__ */ a(m, { ...jk(e) }) }),
    /* @__PURE__ */ a("td", { className: q.cell, children: /* @__PURE__ */ a(Dk, { pinned: r }) }),
    /* @__PURE__ */ a("td", { className: q.cell, children: /* @__PURE__ */ a(m, { ...Pk(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ a(Hk, { server: e, onRestart: t }),
      /* @__PURE__ */ a(Fk, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function A2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(zk, { ...e }) : /* @__PURE__ */ a(qk, { ...e });
}
const Wk = "_row_1ibo7_2", Kk = "_headCell_1ibo7_14", Gk = "_cell_1ibo7_15", Uk = "_name_1ibo7_26", Vk = "_consequence_1ibo7_32", Yk = "_reason_1ibo7_38", Jk = "_value_1ibo7_44", Xk = "_webRow_1ibo7_60", Qk = "_webSetting_1ibo7_73", Zk = "_webName_1ibo7_81", e$ = "_webConsequence_1ibo7_89", t$ = "_webControl_1ibo7_95", a$ = "_webState_1ibo7_109", n$ = "_webChip_1ibo7_114", I = {
  row: Wk,
  headCell: Kk,
  cell: Gk,
  name: Uk,
  consequence: Vk,
  reason: Yk,
  value: Jk,
  webRow: Xk,
  webSetting: Qk,
  webName: Zk,
  webConsequence: e$,
  webControl: t$,
  webState: a$,
  webChip: n$
}, fr = 104, _r = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function r$({ control: e, name: t, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ a(Ue, { label: t, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ a(xn, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ a("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function l$({ setting: e, control: t, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = _r[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ a("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ a("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ a("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ a("td", { className: I.cell, children: /* @__PURE__ */ a(r$, { control: t, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ a("td", { className: I.cell, style: { width: fr }, children: /* @__PURE__ */ a(m, { role: i.role, label: i.label }) })
  ] });
}
function vr(e, t) {
  return String(e ?? t);
}
function o$(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function i$(e) {
  var n;
  const t = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? vr(e.value, "—");
}
function s$({ control: e, name: t, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ a(Ue, { label: t, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ a("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function c$(e) {
  const { control: t, locked: n, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ a(s$, { ...e });
  const l = o$(t, n);
  return l !== void 0 ? /* @__PURE__ */ a("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ a(xn, { options: l, value: vr(t.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ a("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: i$(t) });
}
function d$({ setting: e, control: t, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ a("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ a("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ a(c$, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ a("span", { className: `${I.webChip} ward-policy-chip`, style: { width: fr }, children: /* @__PURE__ */ a(m, { ..._r[n], size: "tag" }) })
  ] });
}
function E2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(d$, { ...e }) : /* @__PURE__ */ a(l$, { ...e });
}
const u$ = "_label_h9m4w_7", h$ = "_name_h9m4w_15", m$ = "_column_h9m4w_24", w$ = "_webFrame_h9m4w_57", f$ = "_webHead_h9m4w_62", _$ = "_webHeadLabel_h9m4w_74", v$ = "_webLabel_h9m4w_117", b$ = "_webColumns_h9m4w_124", p$ = "_webGroup_h9m4w_130", g$ = "_webPeople_h9m4w_131", y$ = "_webVia_h9m4w_132", N$ = "_webMeta_h9m4w_161", z = {
  label: u$,
  name: h$,
  column: m$,
  webFrame: w$,
  webHead: f$,
  webHeadLabel: _$,
  webLabel: v$,
  webColumns: b$,
  webGroup: p$,
  webPeople: g$,
  webVia: y$,
  webMeta: N$
}, k$ = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, Gt = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Ut({ column: e, children: t }) {
  return /* @__PURE__ */ a(
    "span",
    {
      className: z.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: t
    }
  );
}
function $$(e) {
  if (!e.matrixRole) return;
  const t = k$[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function C$({ node: e }) {
  const t = $$(e);
  return /* @__PURE__ */ o("span", { className: z.label, children: [
    /* @__PURE__ */ a("span", { className: z.name, children: e.name }),
    /* @__PURE__ */ a(S$, { role: t, node: e }),
    /* @__PURE__ */ a(Ut, { column: Gt[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ a(Ut, { column: Gt[1], children: e.people === void 0 ? "" : te(e.people) }),
    /* @__PURE__ */ a(Ut, { column: Gt[2], children: e.requestedVia ?? "" })
  ] });
}
function S$({ role: e, node: t }) {
  return /* @__PURE__ */ o(R, { children: [
    e && /* @__PURE__ */ a(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ a(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ a(m, { role: "warn", label: "Unresolved" })
  ] });
}
function R$({ index: e, depth: t, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ a(
    Pn,
    {
      index: e,
      depth: t,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ a(C$, { node: n }),
      children: s
    }
  );
}
function Vt({ className: e, text: t }) {
  return /* @__PURE__ */ a("span", { className: e, title: t, children: t });
}
function T$({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ a(Vt, { className: `${z.webMeta} ${z.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ a(Vt, { className: `${z.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ a(Vt, { className: `${z.webMeta} ${z.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function x$() {
  return /* @__PURE__ */ o("div", { className: z.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ a("span", { className: z.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: z.webColumns, children: [
      /* @__PURE__ */ a("span", { className: z.webGroup, children: "AD group" }),
      /* @__PURE__ */ a("span", { className: z.webPeople, children: "People" }),
      /* @__PURE__ */ a("span", { className: z.webVia, children: "Requested via" })
    ] })
  ] });
}
function L$({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ a("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ a(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ a(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function A$(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function E$({ rows: e, label: t }) {
  return /* @__PURE__ */ o("div", { className: z.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ a(x$, {}),
    /* @__PURE__ */ a(um, { label: t ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ a(
      Pn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ a(L$, { row: n }),
        detail: /* @__PURE__ */ a(T$, { row: n }),
        expanded: A$(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function I2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(E$, { ...e }) : /* @__PURE__ */ a(R$, { ...e });
}
const I$ = "_runbook_b9agc_2", M$ = "_list_b9agc_7", B$ = "_step_b9agc_15", P$ = "_numeral_b9agc_21", q$ = "_body_b9agc_28", O$ = "_head_b9agc_34", j$ = "_title_b9agc_40", D$ = "_detail_b9agc_45", H$ = "_actions_b9agc_50", F$ = "_webList_b9agc_56", z$ = "_webStep_b9agc_60", W$ = "_webBody_b9agc_66", K$ = "_webTitle_b9agc_74", G$ = "_webDetail_b9agc_78", L = {
  runbook: I$,
  list: M$,
  step: B$,
  numeral: P$,
  body: q$,
  head: O$,
  title: j$,
  detail: D$,
  actions: H$,
  webList: F$,
  webStep: z$,
  webBody: W$,
  webTitle: K$,
  webDetail: G$
}, br = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function pr(e) {
  return String(e + 1).padStart(2, "0");
}
function U$({ step: e, index: t, connection: n }) {
  const r = br[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: L.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ a("span", { className: L.numeral, children: pr(t) }),
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
function V$({ steps: e, actions: t, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ a("ol", { className: L.list, children: e.map((r, l) => /* @__PURE__ */ a(U$, { step: r, index: l, connection: n }, r.title)) }),
    t && /* @__PURE__ */ a("div", { className: L.actions, children: t })
  ] });
}
function Y$({ step: e, index: t, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${L.step} ${L.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ a("span", { className: `${L.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: pr(t) }),
    /* @__PURE__ */ o("span", { className: `${L.body} ${L.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${L.head} ward-envrow`, children: [
        /* @__PURE__ */ a("span", { className: `${L.title} ${L.webTitle}`, children: e.title }),
        /* @__PURE__ */ a(m, { ...br[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ a(Le, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ a("span", { className: `${L.detail} ${L.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function J$({ steps: e, actions: t, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ a("ol", { className: `${L.list} ${L.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ a(Y$, { step: r, index: l, connection: n }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ a("span", { className: `${L.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function M2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(J$, { ...e }) : /* @__PURE__ */ a(V$, { ...e });
}
const X$ = "_list_1gu6a_2", Q$ = "_check_1gu6a_10", Z$ = "_body_1gu6a_16", e0 = "_text_1gu6a_23", t0 = "_pending_1gu6a_32", a0 = "_measured_1gu6a_37", Qe = {
  list: X$,
  check: Q$,
  body: Z$,
  text: e0,
  pending: t0,
  measured: a0
};
function n0(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function r0({ check: e }) {
  const t = n0(e.passed);
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
function B2({ checks: e }) {
  return /* @__PURE__ */ a("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ a(r0, { check: t }, t.text)) });
}
const l0 = "_root_4aacj_2", o0 = "_list_4aacj_10", i0 = "_line_4aacj_26", s0 = "_at_4aacj_53", c0 = "_text_4aacj_57", d0 = "_foot_4aacj_61", u0 = "_idle_4aacj_73", h0 = "_caret_4aacj_81", m0 = "_jump_4aacj_88", fe = {
  root: l0,
  list: o0,
  line: i0,
  at: s0,
  text: c0,
  foot: d0,
  idle: u0,
  caret: h0,
  jump: m0
}, w0 = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function _a(e) {
  return Number.isNaN(Date.parse(e)) ? "" : w0.format(new Date(e));
}
const f0 = { warn: "warning", ok: "ok" };
function _0({ kind: e }) {
  const t = f0[e];
  return t === void 0 ? null : /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: t });
}
function v0({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("span", { children: `last event ${_a(e)}` });
}
function b0({ connection: e, idleSince: t, last: n, children: r }) {
  const l = [t, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${_a(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${fe.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ a("span", { className: `${fe.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ a("span", { className: fe.idle, children: i }),
    /* @__PURE__ */ a(v0, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const p0 = 8;
function g0(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > p0;
}
function y0({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ a("button", { type: "button", className: `${fe.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const gr = ye(null);
function P2({ announce: e, onAnnounceChange: t, children: n }) {
  const [r, l] = p(!1), i = Qa(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ a(gr.Provider, { value: i, children: n });
}
function N0() {
  const e = ge(gr), [t, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [t, n];
}
function q2({ lines: e, connection: t, idleSince: n, label: r = "Live activity" }) {
  const l = _(null), [i, s] = p(0), [c, d] = N0(), [u, h] = p(!1), w = e.at(-1);
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
  return /* @__PURE__ */ o("div", { className: fe.root, children: [
    /* @__PURE__ */ a("ol", { className: fe.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, "data-empty": e.length === 0 || void 0, onScroll: (y) => h(g0(y.currentTarget)), children: e.map((y, E) => /* @__PURE__ */ o("li", { className: `${fe.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": E < i, children: [
      /* @__PURE__ */ a("span", { className: fe.at, children: _a(y.at) }),
      /* @__PURE__ */ a(_0, { kind: y.kind }),
      /* @__PURE__ */ a("span", { className: fe.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${E}`)) }),
    /* @__PURE__ */ o(b0, { connection: t, idleSince: n, last: w, children: [
      /* @__PURE__ */ a("button", { type: "button", className: `${fe.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ a(y0, { shown: u, onJump: f })
    ] })
  ] });
}
const k0 = "_row_1k8wl_2", $0 = "_head_1k8wl_14", C0 = "_author_1k8wl_20", S0 = "_eta_1k8wl_25", R0 = "_edited_1k8wl_26", T0 = "_body_1k8wl_32", x0 = "_reason_1k8wl_37", L0 = "_actions_1k8wl_42", Ce = {
  row: k0,
  head: $0,
  author: C0,
  eta: S0,
  edited: R0,
  body: T0,
  reason: x0,
  actions: L0
}, A0 = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function E0(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function I0({ comment: e, reasonId: t, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function M0({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ a("span", { className: Ce.reason, id: t, children: e })
  ] });
}
function B0(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function P0(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ a(I0, { ...e }) : /* @__PURE__ */ a(M0, { reason: e.unavailable, reasonId: e.unavailableId });
}
function O2(e) {
  const { comment: t } = e;
  B0(e);
  const n = N(), r = `${n}-unavailable`, l = A0[t.delivery];
  return /* @__PURE__ */ o("div", { className: `${Ce.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Ce.head, children: [
      /* @__PURE__ */ a("span", { className: Ce.author, children: t.author }),
      /* @__PURE__ */ a(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ a("span", { className: Ce.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ a("span", { className: Ce.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ a("p", { className: Ce.body, children: t.body }),
    /* @__PURE__ */ a("p", { className: Ce.reason, id: n, children: E0(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ a("div", { className: Ce.actions, children: /* @__PURE__ */ a(P0, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const q0 = "_root_rvhdw_2", O0 = "_attach_rvhdw_11", j0 = "_actions_rvhdw_17", D0 = "_reply_rvhdw_23", H0 = "_replyField_rvhdw_28", F0 = "_send_rvhdw_54", z0 = "_sendIcon_rvhdw_65", W0 = "_sendsAs_rvhdw_75", Oe = {
  root: q0,
  attach: O0,
  actions: j0,
  reply: D0,
  replyField: H0,
  send: F0,
  sendIcon: z0,
  sendsAs: W0
};
function yr({ value: e, onChange: t }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, t ?? (() => {
  })];
}
function K0() {
  return /* @__PURE__ */ a("svg", { className: Oe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ a("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function G0(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function U0(e) {
  const { placeholder: t, asUser: n, onPost: r } = e, [l, i] = yr(e), s = N(), c = () => {
    l.trim() !== "" && r(n, l);
  }, d = (u) => {
    G0(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: Oe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Oe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ a(M, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: Oe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ a(K0, {}),
        /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ a("p", { id: s, className: Oe.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function j2(e) {
  return e.variant === "reply" ? /* @__PURE__ */ a(U0, { ...e }) : /* @__PURE__ */ a(V0, { ...e });
}
function V0(e) {
  const { placeholder: t, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = yr(e);
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
const Y0 = "_list_1yhks_2", J0 = "_item_1yhks_6", X0 = "_body_1yhks_22", Q0 = "_text_1yhks_28", Z0 = "_evidence_1yhks_37", eC = "_consequence_1yhks_49", tC = "_note_1yhks_54", Ge = {
  list: Y0,
  item: J0,
  body: X0,
  text: Q0,
  evidence: Z0,
  consequence: eC,
  note: tC
};
function aC({ criterion: e }) {
  return /* @__PURE__ */ a(He, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Va({ text: e }) {
  return /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: e });
}
function nC(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function rC({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Ge.body, children: [
    /* @__PURE__ */ a("span", { className: Ge.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ a(Va, { text: " · " }),
      /* @__PURE__ */ a("code", { className: Ge.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ a(Va, { text: " · " }),
      /* @__PURE__ */ a("span", { className: Ge.consequence, children: nC(e.why) })
    ] })
  ] });
}
function lC({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Ge.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ a(aC, { criterion: e }),
    /* @__PURE__ */ a(rC, { criterion: e })
  ] });
}
function D2({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ a("ul", { className: `${Ge.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ a(lC, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ a("p", { className: Ge.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const oC = "_list_dwhoz_2", iC = "_rung_dwhoz_6", sC = "_name_dwhoz_18", cC = "_actor_dwhoz_32", yt = {
  list: oC,
  rung: iC,
  name: sC,
  actor: cC
}, dC = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function uC({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = dC[e.state];
  return /* @__PURE__ */ o("li", { className: yt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ a("span", { className: yt.name, children: e.name }),
    /* @__PURE__ */ a(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ a("span", { className: `${yt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function H2({ rungs: e }) {
  return /* @__PURE__ */ a("ol", { className: `${yt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ a(uC, { rung: t }, t.name)) });
}
const hC = "_sheet_pw37w_2", mC = "_title_pw37w_9", wC = "_stage_pw37w_15", fC = "_effects_pw37w_20", _C = "_effect_pw37w_20", vC = "_numeral_pw37w_31", bC = "_effectText_pw37w_38", pC = "_refusals_pw37w_43", gC = "_reasons_pw37w_52", yC = "_reason_pw37w_52", NC = "_actions_pw37w_62", he = {
  sheet: hC,
  title: mC,
  stage: wC,
  effects: fC,
  effect: _C,
  numeral: vC,
  effectText: bC,
  refusals: pC,
  reasons: gC,
  reason: yC,
  actions: NC
};
function kC({ refused: e, reasonId: t, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ a(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ a(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function F2({ run: e, effects: t, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = N(), d = `${c}-refusal`, [u, h] = p(""), w = n.length > 0;
  return /* @__PURE__ */ a(nt, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: he.sheet, children: [
    /* @__PURE__ */ o("h2", { className: he.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ a("p", { className: he.stage, children: e.stage }),
    /* @__PURE__ */ a("ol", { className: he.effects, children: t.map((f, y) => /* @__PURE__ */ o("li", { className: he.effect, children: [
      /* @__PURE__ */ a("span", { className: he.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ a("span", { className: he.effectText, children: f })
    ] }, f)) }),
    /* @__PURE__ */ a(
      Vu,
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
    w && /* @__PURE__ */ o("div", { className: he.refusals, children: [
      /* @__PURE__ */ a(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ a("ul", { className: he.reasons, children: n.map((f, y) => /* @__PURE__ */ a("li", { className: he.reason, id: y === 0 ? d : void 0, children: f.reason }, f.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: he.actions, children: [
      /* @__PURE__ */ a(kC, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ a(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const $C = "_list_ezew2_2", CC = "_path_ezew2_7", SC = "_head_ezew2_21", RC = "_label_ezew2_28", TC = "_consequence_ezew2_35", xC = "_ask_ezew2_36", et = {
  list: $C,
  path: CC,
  head: SC,
  label: RC,
  consequence: TC,
  ask: xC
}, ea = {
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
function LC({ path: e, primary: t, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ a(b, { variant: Ja(t), size: "sm", onClick: () => n(e.kind), children: ea[e.kind] }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a(b, { variant: Ja(t), size: "sm", disabled: !0, describedBy: r, children: ea[e.kind] }),
    /* @__PURE__ */ a("span", { className: et.ask, id: r, children: e.askInstead })
  ] });
}
function AC({ path: e, primary: t, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: et.path, "data-allowed": e.allowed, "data-role": Ya(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: et.head, children: [
      /* @__PURE__ */ a("span", { className: et.label, children: e.title ?? ea[e.kind] }),
      /* @__PURE__ */ a(m, { role: Ya(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ a("span", { className: et.consequence, children: e.consequence }),
    /* @__PURE__ */ a(LC, { path: e, primary: t, onChoose: n })
  ] });
}
function z2({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ a("ul", { className: et.list, children: e.map((n, r) => /* @__PURE__ */ a(AC, { path: n, primary: r === 0, onChoose: t }, n.kind)) });
}
const EC = "_list_1m7i0_2", IC = "_item_1m7i0_6", MC = "_node_1m7i0_18", BC = "_body_1m7i0_24", PC = "_head_1m7i0_30", qC = "_stage_1m7i0_36", OC = "_version_1m7i0_41", jC = "_sentence_1m7i0_49", DC = "_meta_1m7i0_54", Re = {
  list: EC,
  item: IC,
  node: MC,
  body: BC,
  head: PC,
  stage: qC,
  version: OC,
  sentence: jC,
  meta: DC
}, HC = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function FC({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Re.head, children: [
    /* @__PURE__ */ a("span", { className: Re.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ a("span", { className: Re.version, title: e.version, children: e.version }) : null
  ] });
}
function zC({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Re.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ a("span", { className: `${Re.node} ward-history-node`, children: /* @__PURE__ */ a(He, { size: 9, kind: HC[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Re.body} ward-history-stage`, children: [
      /* @__PURE__ */ a(FC, { entry: e }),
      /* @__PURE__ */ a("span", { className: Re.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Re.meta} ward-history-meta`, children: [
        `${ue(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function W2({ entries: e }) {
  return /* @__PURE__ */ a("ol", { className: `${Re.list} ward-history`, children: e.map((t, n) => /* @__PURE__ */ a(zC, { entry: t }, t.stage + String(n))) });
}
const WC = "_thread_1e70p_3", KC = "_turn_1e70p_8", GC = "_who_1e70p_27", UC = "_body_1e70p_32", Nt = {
  thread: WC,
  turn: KC,
  who: GC,
  body: UC
}, Nr = ye(!1);
function K2({ children: e, density: t }) {
  return /* @__PURE__ */ a(Nr.Provider, { value: !0, children: /* @__PURE__ */ a("ol", { className: `${Nt.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function G2({ turn: e }) {
  if (!ge(Nr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${Nt.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${Nt.who} ward-chat-who`, children: [
      e.author,
      " · ",
      ue(e.at)
    ] }),
    /* @__PURE__ */ a("p", { className: `${Nt.body} ward-chat-body`, children: e.body })
  ] });
}
const VC = "_list_yiolt_3", YC = "_row_yiolt_7", JC = "_label_yiolt_20", XC = "_n_yiolt_26", QC = "_cause_yiolt_33", ot = {
  list: VC,
  row: YC,
  label: JC,
  n: XC,
  cause: QC
};
function ZC(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const eS = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function tS({ row: e, formatNumber: t }) {
  return ZC(e), /* @__PURE__ */ o("li", { className: `${ot.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ a(He, { size: 8, ...eS[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ a("span", { className: ot.label, children: e.label }),
    /* @__PURE__ */ a("span", { className: `${ot.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ a(aS, { cause: e.cause })
  ] });
}
function aS({ cause: e }) {
  return e ? /* @__PURE__ */ a("span", { className: `${ot.cause} ward-healthrow-cause`, children: e }) : null;
}
function U2({ rows: e, formatNumber: t = te }) {
  return /* @__PURE__ */ a("ul", { className: `${ot.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ a(tS, { row: n, formatNumber: t }, n.label)) });
}
const nS = "_root_1jxwp_2", rS = {
  root: nS
};
function V2({ items: e, note: t, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: rS.root, "data-density": l, children: [
    /* @__PURE__ */ a(Dt, { items: e, note: t, density: l }),
    /* @__PURE__ */ a(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const lS = "_row_dhbre_3", oS = "_key_dhbre_13", iS = "_stack_dhbre_24", sS = "_value_dhbre_32", cS = "_evidence_dhbre_39", dS = "_mark_dhbre_47", Xe = {
  row: lS,
  key: oS,
  stack: iS,
  value: sS,
  evidence: cS,
  mark: dS
};
function uS({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ a(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ a(ia, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function Y2({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ a("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ a("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ a("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ a("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ a(uS, { state: e.state }) })
  ] });
}
const hS = "_cell_gh2sd_2", mS = {
  cell: hS
}, wS = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function fS(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function _S(e, t) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (t && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function vS(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: fS(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function bS(e) {
  return e.map((t, n) => ({ ...t, id: t.id ?? String(n) }));
}
function J2({ rows: e, empty: t, requireNoRerunReason: n = !0 }) {
  _S(e, n);
  const r = bS(e);
  return /* @__PURE__ */ a(
    sh,
    {
      label: "Rejection routing",
      columns: wS,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ a("span", { className: mS.cell, "data-norerun": l.noRerun ? !0 : void 0, children: vS(l, i) }),
      empty: t ?? /* @__PURE__ */ a(Xm, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const pS = "_row_1f2re_2", gS = "_title_1f2re_12", yS = "_turns_1f2re_18", NS = "_waiting_1f2re_19", kS = "_resolved_1f2re_20", $S = "_activity_1f2re_21", CS = "_cost_1f2re_28", SS = "_link_1f2re_29", RS = "_tableLink_1f2re_47", TS = "_tableRecord_1f2re_48", xS = "_tableRow_1f2re_59", LS = "_tableTitle_1f2re_71", AS = "_tableResolved_1f2re_76", ES = "_tableMeta_1f2re_87", IS = "_tableCost_1f2re_94", MS = "_tableActivity_1f2re_95", BS = "_tableState_1f2re_105", j = {
  row: pS,
  title: gS,
  turns: yS,
  waiting: NS,
  resolved: kS,
  activity: $S,
  cost: CS,
  link: SS,
  tableLink: RS,
  tableRecord: TS,
  tableRow: xS,
  tableTitle: LS,
  tableResolved: AS,
  tableMeta: ES,
  tableCost: IS,
  tableActivity: MS,
  tableState: BS
}, kr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function PS(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const n = Math.floor(t / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function qS(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function OS(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const jS = { duplicate: "Closed · duplicate" };
function DS({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a(at, { className: j.tableMeta, text: `waiting on ${e}` });
}
function HS({ value: e }) {
  return /* @__PURE__ */ a("td", { className: j.tableCost, children: e === void 0 ? null : le(e) });
}
function FS({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("a", { className: `${j.tableRecord} ward-target`, href: H(e.href), children: `→ ${e.key}` });
}
function zS({ session: e, href: t }) {
  const n = kr[e.state];
  return /* @__PURE__ */ o("tr", { className: j.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: j.tableTitle, children: [
      /* @__PURE__ */ a("a", { className: `${j.tableLink} ward-target`, href: H(t), children: /* @__PURE__ */ a(at, { text: e.title }) }),
      /* @__PURE__ */ a("span", { className: j.tableMeta, children: qS(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: j.tableResolved, children: [
      OS(e.resolved),
      /* @__PURE__ */ a(DS, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ a(HS, { value: e.cost }),
    /* @__PURE__ */ a("td", { className: j.tableActivity, children: PS(e.lastActivity) }),
    /* @__PURE__ */ a("td", { className: j.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ a(m, { role: n.role, label: jS[e.state] ?? n.label }),
      /* @__PURE__ */ a(FS, { link: e.link })
    ] }) })
  ] });
}
function WS({ session: e }) {
  const t = kr[e.state];
  return /* @__PURE__ */ o("div", { className: j.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ a(at, { className: j.title, text: e.title }),
    /* @__PURE__ */ a("span", { className: j.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ a(at, { className: j.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ a("span", { className: j.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ a("span", { className: j.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : le(e.cost) }),
    /* @__PURE__ */ a("span", { className: j.activity, children: ue(e.lastActivity) }),
    e.link && /* @__PURE__ */ a("a", { className: j.link, href: H(e.link.href), children: e.link.key }),
    /* @__PURE__ */ a(m, { role: t.role, label: t.label })
  ] });
}
function X2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ a(zS, { session: e.session, href: e.href }) : /* @__PURE__ */ a(WS, { session: e.session });
}
const KS = "_block_1yy2v_3", GS = "_list_1yy2v_9", US = "_line_1yy2v_14", ta = {
  block: KS,
  list: GS,
  line: US
}, VS = { warn: "warning", ok: "ok" };
function YS({ kind: e }) {
  const t = VS[e];
  return t === void 0 ? null : /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: t });
}
function JS({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${ta.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ a(YS, { kind: t }),
    /* @__PURE__ */ a("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function Q2({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ a("div", { className: `${ta.block} ward-typed`, children: /* @__PURE__ */ a("ol", { className: ta.list, "aria-label": t, children: e.map((n, r) => /* @__PURE__ */ a(JS, { line: n }, `${r}-${n.text}`)) }) });
}
const XS = "_band_tt7hp_1", QS = "_head_tt7hp_8", ZS = "_cell_tt7hp_19", eR = "_index_tt7hp_35", tR = "_title_tt7hp_42", aR = "_note_tt7hp_48", nR = "_cellTitle_tt7hp_53", rR = "_cellBody_tt7hp_58", lR = "_tag_tt7hp_64", $e = {
  band: XS,
  head: QS,
  cell: ZS,
  index: eR,
  title: tR,
  note: aR,
  cellTitle: nR,
  cellBody: rR,
  tag: lR
}, Xa = 4;
function Z2({ index: e, title: t, note: n, cells: r }) {
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
  _R as ACCENT_PRESETS,
  qR as ActionStack,
  q2 as ActivityConsole,
  $R as AdminIcon,
  wv as AgentCard,
  SR as AppShell,
  y2 as AppearanceStrip,
  Z2 as Band,
  MR as BarChart,
  Ew as BoardColumn,
  e2 as BoardFootnote,
  t2 as BoardHeader,
  NR as BoardIcon,
  KR as BoardScroller,
  b as Btn,
  fR as CHIP_ROLES,
  sr as CREDENTIAL_COLUMNS,
  IR as Callout,
  N2 as CapabilityRow,
  UR as CardGrid,
  G2 as ChatMessage,
  un as Checkbox,
  m as Chip,
  at as ClampText,
  O2 as ClarificationRow,
  u2 as ClauseRuleRow,
  d2 as ClauseRules,
  Fn as ColourLadder,
  k2 as ComponentRow,
  j2 as Composer,
  n2 as ConfigRow,
  a2 as ConfigRowHead,
  sa as ConnectionMark,
  P2 as ConsoleAnnounceProvider,
  K2 as Conversation,
  Vu as CostMeter,
  C2 as CredentialRow,
  $2 as CredentialRowHead,
  D2 as CriteriaList,
  Gi as Crumb,
  vR as DENSITIES,
  U2 as DeliveryHealth,
  YR as DeniedState,
  gR as DisabledScope,
  m2 as DryRunRail,
  Xm as EmptyState,
  S2 as EnvCard,
  M as Field,
  VR as FilteredEmpty,
  zR as FormStack,
  Dt as GateChecklist,
  H2 as GateLadder,
  sh as Grid,
  f2 as HandoffRuleRow,
  w2 as HandoffRules,
  yR as HomeIcon,
  r2 as ItemDrawer,
  R2 as KeyPanel,
  Kr as LIVE_EVENT_TYPES,
  P_ as LegacyBoardColumn,
  o2 as LegacyBoardHeader,
  i2 as LegacyConfigRow,
  c2 as LegacyItemDrawer,
  x_ as LegacyOverCapNote,
  s2 as LegacyPreviewRail,
  jn as LegacyWorkCard,
  Le as LiveIndicator,
  JR as LoadFailed,
  ZR as Loading,
  wr as MCP_SERVER_COLUMNS,
  ia as Mark,
  x2 as MarkUpload,
  He as Marker,
  A2 as McpServerRow,
  L2 as McpServerRowHead,
  bc as Menu,
  tc as MenuButton,
  _2 as NewStreamModal,
  tw as OverCapNote,
  Bt as OverflowRow,
  nt as Overlay,
  h2 as PARTIAL_STEP_REASON,
  fr as POLICY_CHIP_WIDTH,
  DR as PageFrame,
  ER as PageHeader,
  BR as PlainList,
  E2 as PolicyRow,
  l2 as PreviewRail,
  Gt as ROLE_MATRIX_COLUMNS,
  er as RULE_ACTIONS,
  An as Radio,
  V2 as ReadyChecklist,
  FR as RecordSection,
  F2 as RequeueSheet,
  z2 as ResolveBlock,
  Y2 as ResolvedFieldRow,
  I2 as RoleMatrixRow,
  J2 as RoutingTable,
  v2 as RuleRow,
  M2 as RunbookSteps,
  Wr as STREAM_STEPS,
  WR as SectionBand,
  Ma as SectionHeader,
  xn as SegmentedControl,
  pn as Select,
  X2 as SessionRow,
  xR as Sidebar,
  CR as SidebarFoldButton,
  b2 as StageColumn,
  GR as StageGrid,
  W2 as StageHistory,
  Yp as StageListEditor,
  XR as StaleStrip,
  qt as StatStrip,
  OR as StatTiles,
  AR as StreamAvatar,
  p2 as StreamRow,
  kR as StudioIcon,
  HR as SubjectRail,
  Ue as Switch,
  TR as TabLinks,
  PR as TableHead,
  RR as Tabs,
  uR as ThemeProvider,
  g2 as ToolRow,
  jR as TopBar,
  um as Tree,
  Pn as TreeRow,
  Q2 as TypedInputBlock,
  Ao as UNSAFE_HREF,
  B2 as ValidationList,
  cR as VisibilityProvider,
  dR as Visible,
  wR as WARD_VERSION,
  jt as WorkCard,
  QR as WriteUnavailableStrip,
  PS as agoSince,
  Ar as clock,
  hg as colourStatus,
  te as count,
  de as duration,
  aa as elapsed,
  mR as eventSourceTransport,
  It as isStreamStep,
  ct as isValidatedStreamStep,
  Wv as ladderValidation,
  Pk as mcpConnectionChip,
  Mk as mcpToolName,
  le as money,
  _e as ms,
  qn as ordered,
  en as ratio,
  a1 as restartLabel,
  H as safeHref,
  ue as stamp,
  na as stream,
  bR as streamChip,
  Pt as streamChipProps,
  pe as streamColour,
  Vr as streamHex,
  Ct as streamInitials,
  Gr as streamVars,
  LR as uniqueStreamInitials,
  fn as useAnchoredPanel,
  bt as useBorderFlash,
  Ae as useDisabledScope,
  Hr as useFocusTrap,
  pR as useLiveFeed,
  hR as useReturnFocus,
  Et as useRovingTabindex,
  ra as useTicker,
  Er as useVisible,
  W as v,
  T2 as validateMark,
  ht as validatedStep,
  an as validatedStreamSteps
};
