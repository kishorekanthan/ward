import { jsx as a, Fragment as R, jsxs as o } from "react/jsx-runtime";
import { useMemo as Qa, useContext as ge, createContext as ye, useState as p, useEffect as C, useCallback as Q, useRef as _, useLayoutEffect as tt, useId as N, isValidElement as Sr, Children as Rr, Fragment as Tr } from "react";
import { createPortal as xr, flushSync as Za } from "react-dom";
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
const Lr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ue(e) {
  const t = Lr.formatToParts(new Date(e)), n = (r) => {
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
const Ar = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Er(e) {
  return Ar.format(new Date(e));
}
const tn = ye(/* @__PURE__ */ new Set());
function dR({ hidden: e, children: t }) {
  const n = Qa(() => new Set(e), [e]);
  return /* @__PURE__ */ a(tn.Provider, { value: n, children: t });
}
function Ir(e) {
  return !ge(tn).has(e);
}
function uR({ id: e, children: t, fallback: n = null }) {
  return /* @__PURE__ */ a(R, { children: Ir(e) ? t : n });
}
const Mr = "(prefers-color-scheme: dark)";
function ba() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Mr) : null;
}
function Br(e) {
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
function Pr(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function hR({ theme: e, accent: t = "green", density: n = "comfortable", children: r }) {
  const l = Br(e === "system");
  return Ht("data-theme", Pr(e, l)), Ht("data-accent", t), Ht("data-density", n), /* @__PURE__ */ a(R, { children: r });
}
const qr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Or(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function jr(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function Dr(e, t, n, r) {
  return e.shiftKey ? Or(t, n) ? r : void 0 : document.activeElement === r || jr(t) ? n : void 0;
}
function Hr(e, t, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Dr(e, t, r, l);
  i && (e.preventDefault(), i.focus());
}
function Fr(e) {
  return { onKeyDown: Q(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(qr));
      Hr(n, e.current, r);
    },
    [e]
  ) };
}
function mR(e, t = !0) {
  C(() => {
    if (!t) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [t, e]);
}
const pa = { ArrowUp: -1, ArrowDown: 1 }, ga = { ArrowLeft: -1, ArrowRight: 1 }, Wr = (e, t, n) => Math.min(n, Math.max(t, e));
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
      f !== void 0 ? (u.preventDefault(), s(h[Wr(w + f, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
const wR = (e, t, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, fR = "0.2.0", _R = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Kr = [1, 2, 3, 4, 5, 6], an = [1, 2, 3], Gr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], vR = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], bR = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], z = {
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
  return Kr.includes(e);
}
function ct(e) {
  return an.includes(e);
}
function Ur(e) {
  if (!It(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function pR(e) {
  if (!It(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Vr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Yr(e) {
  if (!It(e)) throw new Error("unvalidated stream step");
  return Vr[e];
}
function ya(e) {
  return typeof e != "string" ? null : Gr.includes(e) ? e : null;
}
function Jr(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function Xr(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function Qr(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Zr(e, t, n) {
  const r = Jr(e);
  if (r === null) return null;
  const l = ya(n) ?? ya(r.type);
  return l === null ? null : { ...r, type: l, id: Xr(r, t), at: Qr(r) };
}
function el(e, t) {
  return e >= _e.staleAfter ? "stale" : e >= _e.heartbeat && t === "live" ? "reconnecting" : null;
}
function tl(e, t, n) {
  return e >= _e.heartbeat && !t && n !== null;
}
function gR(e, t) {
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
        const Fe = Zr(T, U, ke);
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
    const T = Date.now() - c.current, U = el(T, E.current);
    U && P(U);
    const ke = h.current;
    tl(T, y.current, ke) && Ee(ke);
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
const al = { blue: "running", orange: "waiting", green: "done" };
function nl() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Na(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function bt(e, t) {
  const n = _(0), r = Q((l) => {
    const i = l ?? t, s = e.current;
    s !== null && i !== void 0 && (nl() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${al[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => Na(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => Na(s), _e.flash)));
  }, [t, e]);
  return C(() => () => window.clearTimeout(n.current), []), t === void 0 ? (l) => r(l) : () => r(t);
}
const rl = "_root_1otpc_2", ll = {
  root: rl
};
function ol(e, t, n, r, l) {
  const i = [aa(t)];
  return e || i.push(`as of ${Er(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Le({ startedAt: e, lastEvent: t, connection: n, turn: r }) {
  const l = n !== "stale", i = ra(e, l), s = (t == null ? void 0 : t.at) ?? e, c = ol(l, i, s, r, t);
  return /* @__PURE__ */ o("span", { className: `${ll.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ a("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      ue(e)
    ] })
  ] });
}
const il = "_app_1bnco_1", sl = "_side_1bnco_35", cl = "_sideTop_1bnco_46", dl = "_sideBody_1bnco_60", ul = "_iconRail_1bnco_99", hl = "_railItem_1bnco_108", ml = "_railIcon_1bnco_129", wl = "_railDot_1bnco_134", fl = "_railLetter_1bnco_140", _l = "_main_1bnco_146", vl = "_rail_1bnco_108", bl = "_page_1bnco_168", pl = "_headerRow_1bnco_191", gl = "_sidebarToggle_1bnco_198", yl = "_headerSlot_1bnco_203", Nl = "_headerAction_1bnco_208", kl = "_drawerSide_1bnco_213", $l = "_root_1bnco_260", Cl = "_topbar_1bnco_267", Sl = "_mark_1bnco_278", Rl = "_brand_1bnco_285", Tl = "_tagline_1bnco_291", xl = "_identity_1bnco_297", Ll = "_tools_1bnco_298", Al = "_nav_1bnco_308", El = "_metadata_1bnco_315", Il = "_actor_1bnco_330", Ml = "_detail_1bnco_331", Bl = "_content_1bnco_376", Pl = "_toolsPanel_1bnco_392", ql = "_skip_1bnco_418", $ = {
  app: il,
  side: sl,
  sideTop: cl,
  sideBody: dl,
  iconRail: ul,
  railItem: hl,
  railIcon: ml,
  railDot: wl,
  railLetter: fl,
  main: _l,
  rail: vl,
  page: bl,
  headerRow: pl,
  sidebarToggle: gl,
  headerSlot: yl,
  headerAction: Nl,
  drawerSide: kl,
  root: $l,
  topbar: Cl,
  mark: Sl,
  brand: Rl,
  tagline: Tl,
  identity: xl,
  tools: Ll,
  nav: Al,
  metadata: El,
  actor: Il,
  detail: Ml,
  content: Bl,
  toolsPanel: Pl,
  skip: ql
};
function dt(...e) {
  const t = e.filter((n) => n !== void 0 && n !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const Ol = "_scope_1an6i_2", jl = {
  scope: Ol
}, nn = ye(null);
function yR({ reason: e, actions: t = "disable", children: n }) {
  const r = N();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${jl.scope} ward-disabled-scope`, children: [
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
const Dl = "_btn_tzr89_2", Hl = "_primary_tzr89_14", Fl = "_destructive_tzr89_25", Wl = "_secondary_tzr89_35", zl = "_ghost_tzr89_40", Kl = "_overflow_tzr89_49", Gl = "_sm_tzr89_56", Ul = "_disabled_tzr89_60", mt = {
  btn: Dl,
  primary: Hl,
  destructive: Fl,
  secondary: Wl,
  ghost: zl,
  overflow: Kl,
  sm: Gl,
  disabled: Ul
};
function Vl(e, t, n, r) {
  const l = t === "sm" ? [mt.sm, "ward-btn--sm"] : [], i = n ? [mt.disabled] : [];
  return [mt.btn, mt[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Yl(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Jl(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Xl(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function Ql(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Zl(e, t, n) {
  return Ql(e.describedBy, t && n);
}
function eo({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ a("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function to(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Ae()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ a(ao, { ...e });
}
function ao(e) {
  const t = Ae();
  Jl(e, t);
  const n = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || t), i = Xl(e, t), s = N();
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: e.type ?? "button",
        className: Vl(n, r, l, e.className),
        "data-ward-btn": n,
        "data-ward-size": r,
        disabled: l,
        title: i,
        "aria-describedby": Zl(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Yl(n, e.controls),
        children: to(e)
      }
    ),
    /* @__PURE__ */ a(eo, { id: s, reason: i })
  ] });
}
let la = "none";
function no(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (la = "key");
}
typeof document < "u" && (document.addEventListener("keydown", no, !0), document.addEventListener("pointerdown", () => {
  la = "pointer";
}, !0));
function ro() {
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
const lo = "_scrim_1cawq_2", oo = "_drawer_1cawq_10", io = "_sheet_1cawq_14", so = "_modal_1cawq_18", co = "_panel_1cawq_23", uo = "_start_1cawq_44", ho = "_header_1cawq_67", mo = "_title_1cawq_75", wo = "_body_1cawq_79", fo = "_close_1cawq_106", Te = {
  scrim: lo,
  drawer: oo,
  sheet: io,
  modal: so,
  panel: co,
  start: uo,
  header: ho,
  title: mo,
  body: wo,
  close: fo
}, _o = ye(null), kt = [], $t = /* @__PURE__ */ new Map();
function vo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function bo(e, t) {
  let n = $t.get(t);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, $t.set(t, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function po(e, t, n) {
  for (const r of Array.from(t.children))
    r !== n && !vo(r) && bo(e, r);
}
function go(e, t) {
  let n = null, r = t;
  for (; r; ) {
    if (po(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function yo(e) {
  for (const t of e.claims) {
    const n = $t.get(t);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || t.removeAttribute("inert"), $t.delete(t)));
  }
}
function No(e, t) {
  const n = { root: e, claims: [] };
  return kt.push(n), go(n, t), n;
}
function ko(e) {
  const t = kt.indexOf(e);
  t >= 0 && kt.splice(t, 1), yo(e);
}
function ka(e) {
  return e !== null && kt.at(-1) === e;
}
function $o(e, t, n) {
  const r = _(null), l = _(n);
  return l.current = n, C(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = No(i, t);
    return r.current = c, () => {
      var u, h;
      const d = ka(c);
      ko(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), Q(() => ka(r.current), []);
}
function Co(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function So(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ro({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ a("div", { className: `${Te.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("header", { className: `${Te.header} ward-drawer-head`, children: /* @__PURE__ */ a("h2", { className: `${Te.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ a("div", { className: `${Te.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function To(e) {
  return `${Te.scrim} ${Te[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function xo(e, t) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Te.panel} ${Te[e]} ward-overlay-panel${n}${r}`;
}
function Lo(e) {
  const t = ge(_o);
  return e ?? t ?? document.body;
}
function nt(e) {
  const t = _(null), n = _(null), r = N(), l = Lo(e.container), i = it("(min-width: 768px)"), s = Co(e.kind, i), c = So(e, r), d = Fr(n), [u] = p(ro), h = $o(t, l, e.returnFocusTo), w = Q(() => {
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
  }, [w]), xr(
    /* @__PURE__ */ a(
      "div",
      {
        ref: t,
        className: To(s),
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
            className: xo(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => h() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ a("button", { type: "button", className: `${Te.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ a(Ro, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Ao = /^([a-z][a-z0-9+.-]*):/i, Eo = /* @__PURE__ */ new Set(["http", "https"]), Io = "#";
function Mo(e) {
  var r, l;
  const t = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < t.length && t.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = Ao.exec(t.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function H(e) {
  const t = Mo(e);
  return t === void 0 || Eo.has(t) ? e : Io;
}
function Bo(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function rn(e) {
  const t = Bo(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function Po(e, t) {
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
function qo(e, t) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + t.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function ln(e, t, n) {
  tt(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[t];
    if (!r || !l) return;
    const i = qo(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), rn(r);
  }, [e, t, n]);
}
const Oo = "_row_160e9_2", jo = {
  row: Oo
};
function Do(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Bt({ label: e, children: t, count: n, as: r = "div", focusable: l = !0, rowRef: i, className: s, ...c }) {
  const d = _(null), u = i ?? d;
  return Po(u, n), /* @__PURE__ */ a(r, { ref: u, className: [jo.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Do(l, r), ...c, children: t });
}
const Ho = "_icon_1ylqy_2", Fo = {
  icon: Ho
};
function ut({ children: e }) {
  return /* @__PURE__ */ a("svg", { className: Fo.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function NR() {
  return /* @__PURE__ */ a(ut, { children: /* @__PURE__ */ a("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function kR() {
  return /* @__PURE__ */ o(ut, { children: [
    /* @__PURE__ */ a("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ a("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ a("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function $R() {
  return /* @__PURE__ */ o(ut, { children: [
    /* @__PURE__ */ a("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ a("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function CR() {
  return /* @__PURE__ */ a(ut, { children: /* @__PURE__ */ a("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Wo() {
  return /* @__PURE__ */ o(ut, { children: [
    /* @__PURE__ */ a("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ a("path", { d: "M9 4v16" })
  ] });
}
const on = "ward:sidebar-collapsed", zo = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Ko() {
  try {
    return window.localStorage.getItem(on) === "true";
  } catch {
    return !1;
  }
}
function Go(e) {
  try {
    window.localStorage.setItem(on, String(e));
  } catch {
  }
}
function Uo(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Vo(e) {
  return e instanceof Element && e.closest(zo) !== null;
}
function Yo(e) {
  return e.key === "[" && !Uo(e) && !Vo(e.target);
}
function Jo(e) {
  const [t, n] = p(Ko), r = () => {
    Go(!t), n(!t);
  };
  return C(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!Yo(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, t]), { collapsed: t, toggle: r };
}
function Xo() {
  const e = it("(max-width: 767.98px)"), t = it("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function Qo(e) {
  const t = e === "phone", n = N(), r = _(null), [l, i] = p(!1);
  return l && !t && i(!1), { narrow: t, open: l, drawerId: n, slotRef: r, toggle: () => i(!l), close: () => i(!1) };
}
function Zo({ header: e, action: t, label: n, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ a("span", { ref: r.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ a(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: n }) }),
    /* @__PURE__ */ a("div", { className: $.headerSlot, children: e }),
    un(t) && /* @__PURE__ */ a("span", { className: $.headerAction, children: t })
  ] }) : e;
}
function ei(e, t) {
  C(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function ti({ sidebar: e, label: t, drawer: n }) {
  var l;
  if (ei(n.open, n.close), !n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ a(nt, { kind: "start", id: n.drawerId, title: t, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ a("div", { className: $.drawerSide, onClick: r, children: sn(e, !1) }) });
}
function ai(e) {
  const [t, n] = p(!1);
  return t && e !== "medium" && n(!1), { open: t, toggle: () => n(!t) };
}
function ni(e, t) {
  const n = Jo(e === "wide" && !t), r = ai(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && n.collapsed, toggle: n.toggle };
}
function ri(e, t) {
  const n = ni(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return oi(e.collapsed, t);
  const r = n.collapsed, l = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: l, drawsStrip: !l && typeof e.sidebar == "function", toggle: n.toggle };
}
const li = (e) => e.collapsed && e.drawsStrip;
function oi(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const $a = (e) => e ? "" : void 0;
function sn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function cn({ fold: e }) {
  return /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ a(Wo, {}),
    /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function ii({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ a("div", { className: $.sideTop, children: /* @__PURE__ */ a(cn, { fold: e }) });
}
const dn = ye(null);
function SR() {
  const e = ge(dn);
  return e === null || !e.enabled ? null : /* @__PURE__ */ a(cn, { fold: e });
}
function si({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ a("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ a("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": na(e.streamStep).id } }) : /* @__PURE__ */ a("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function ci({ items: e, label: t }) {
  return /* @__PURE__ */ a("nav", { className: $.iconRail, "aria-label": t, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: H(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ a(si, { item: n }),
    /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function di({ sidebar: e, label: t, iconRail: n, fold: r, inSidebar: l }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ a(ii, { fold: r, inSidebar: l && !i }),
    /* @__PURE__ */ a("div", { className: $.sideBody, hidden: i, children: sn(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ a(ci, { items: n ?? [], label: t })
  ] });
}
const un = (e) => e != null;
function ui(e) {
  const { sidebar: t, header: n, action: r, children: l, rail: i, iconRail: s, pageFill: c } = e, d = un(i), u = Xo(), h = Qo(u), w = ri(e, u), f = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": $a(li(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ a(dn.Provider, { value: w, children: /* @__PURE__ */ a(di, { sidebar: t, label: f, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ o("main", { className: $.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ a(Zo, { header: n, action: r, label: f, drawer: h }),
      /* @__PURE__ */ a("div", { className: $.page, "data-fill": $a(c === !0), children: l })
    ] }),
    d && /* @__PURE__ */ a("div", { className: $.rail, children: i }),
    /* @__PURE__ */ a(ti, { sidebar: t, label: f, drawer: h })
  ] });
}
function hi({ destinations: e, active: t }) {
  const n = _(null);
  return ln(n, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ a(Bt, { as: "nav", rowRef: n, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ a("a", { href: H(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function Yt({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ a("span", { className: t, children: e });
}
function mi({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ a(Yt, { value: e, className: $.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ a("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ a(Yt, { value: t, className: $.detail })
  ] });
}
function wi() {
  const e = it("(max-width: 767.98px)"), t = N(), n = _(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: t, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function fi({ tools: e, toolsLabel: t, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ a("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ a(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ a("span", { className: $.tools, children: e });
}
function _i({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ a("div", { id: t.panelId, className: $.toolsPanel, hidden: !t.open, onKeyDown: n, children: e });
}
function vi(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ a("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ a("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ a(Yt, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ a(hi, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ a("span", { className: $.identity, children: /* @__PURE__ */ a(mi, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ a(fi, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function bi(e) {
  const t = N(), n = wi();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ a("a", { className: $.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ a(vi, { ...e, menu: n }),
    /* @__PURE__ */ a(_i, { tools: e.tools, menu: n }),
    /* @__PURE__ */ a("div", { id: t, className: $.content, children: e.children })
  ] });
}
function pi(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function RR(e) {
  return pi(e) ? /* @__PURE__ */ a(ui, { ...e }) : /* @__PURE__ */ a(bi, { ...e });
}
const gi = "_root_itg9o_2", yi = "_row_itg9o_8", Ni = "_box_itg9o_14", ki = "_label_itg9o_21", $i = "_labelHidden_itg9o_26", Ci = "_lockedNote_itg9o_36", Si = "_consequence_itg9o_44", Ri = "_sample_itg9o_79", Be = {
  root: gi,
  row: yi,
  box: Ni,
  label: ki,
  labelHidden: $i,
  lockedNote: Ci,
  consequence: Si,
  sample: Ri
};
function Ti(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function xi({ id: e, text: t }) {
  return t ? /* @__PURE__ */ a("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: t }) : null;
}
function Li({ locked: e }) {
  return e ? /* @__PURE__ */ a("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Ai({ text: e }) {
  return e ? /* @__PURE__ */ a("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function hn(e) {
  const t = N(), n = e.consequence ? `${t}-note` : void 0, r = Ae(), l = Ti(e, r);
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
        /* @__PURE__ */ a(Li, { locked: e.locked })
      ] }),
      /* @__PURE__ */ a(Ai, { text: e.sample })
    ] }),
    /* @__PURE__ */ a(xi, { id: n, text: e.consequence })
  ] });
}
const Ei = "_chip_pq6tb_2", Ii = {
  chip: Ei
}, Mi = {
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
function Bi(e, t) {
  if (e === "stream") return Pi(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = Mi[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function Pi(e) {
  if (!e || !ct(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = na(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: n, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ a("span", { className: `${Ii.chip} ward-chip ward-chip--${e}`, style: Bi(e, n), "data-ward-chip": e, "data-size": r, children: t });
}
const qi = "_clamp_zn74g_3", Ca = {
  clamp: qi
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
const Oi = "_root_13eei_3", ji = "_nav_13eei_8", Di = "_list_13eei_16", Hi = "_item_13eei_24", Fi = "_link_13eei_44", Wi = "_sep_13eei_54", zi = "_current_13eei_58", Ki = "_chips_13eei_62", Me = {
  root: Oi,
  nav: ji,
  list: Di,
  item: Hi,
  link: Fi,
  sep: Wi,
  current: zi,
  chips: Ki
};
function Gi({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ a("span", { className: Me.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ a("a", { className: `${Me.link} ward-target`, href: H(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ a("span", { title: e.label, children: e.label });
}
function Ui({ path: e, chips: t, current: n = !0 }) {
  return /* @__PURE__ */ a("div", { className: Me.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ a("ol", { className: Me.list, children: e.map((r, l) => /* @__PURE__ */ o("li", { className: Me.item, children: [
      l > 0 ? /* @__PURE__ */ a("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ a(Gi, { step: r, isCurrent: n && l === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ a("span", { className: `${Me.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ a(m, { ...r }, r.label)) }) : null
  ] }) });
}
function mn(e, t, n) {
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
const Vi = 500;
function wn(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function fn() {
  const e = _(""), t = _(void 0);
  return C(() => () => clearTimeout(t.current), []), (n) => (clearTimeout(t.current), e.current += n.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, Vi), e.current);
}
const wt = 4;
function Yi(e, t, n) {
  const r = Math.max(0, n - e.bottom - wt * 2), l = Math.max(0, e.top - wt * 2);
  return t <= r || r >= l ? { top: e.bottom + wt, maxHeight: r } : { top: e.top - wt - Math.min(t, l), maxHeight: l };
}
function Ji(e, t, n, r) {
  const l = { start: e.left, end: e.right - t }, i = { start: l.start + t <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - t));
}
function Xi(e, t, n, r) {
  return { ...Yi(e, t.height, n.height), left: Ji(e, t.width, n.width, r) };
}
function pt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Qi(e, t) {
  const n = t.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", pt(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function Zi(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = t.map((r) => r.scrollTop);
  return () => t.forEach((r, l) => r.scrollTop = n[l]);
}
function Sa(e, t, n) {
  const r = Zi(e), l = Qi(e, t), i = Xi(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: pt(i.left - l.box.left), top: pt(i.top - l.box.top), maxHeight: pt(i.maxHeight) }), r();
}
function es(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function _n(e, t, n = "start") {
  tt(() => {
    const r = t.current, l = e.current;
    if (!r || !l) return;
    const i = es(r), s = () => Sa(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, t, n]), tt(() => {
    t.current && e.current && Sa(t.current, e.current, n);
  });
}
const ts = "_root_1lgbn_2", as = "_trigger_1lgbn_7", ns = "_value_1lgbn_47", rs = "_menu_1lgbn_65", ls = "_find_1lgbn_87", os = "_list_1lgbn_103", is = "_option_1lgbn_114", ss = "_check_1lgbn_133", cs = "_empty_1lgbn_144", ve = {
  root: ts,
  trigger: as,
  value: ns,
  menu: rs,
  find: ls,
  list: os,
  option: is,
  check: ss,
  empty: cs
}, ds = 7;
function us(e, t) {
  const n = t.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function Ra(e, t) {
  return Math.max(0, e.findIndex((n) => n.value === t));
}
function hs(e, t) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => Ra(e.options, e.value)), d = (u) => {
    var h;
    Za(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: us(e.options, l),
    findable: e.options.length > ds,
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
function ms(e, t) {
  const n = _(!1);
  return C(() => {
    var r;
    e && n.current && ((r = t.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function ws(e) {
  const t = fn();
  return (n) => {
    const r = t(n), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function vn(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function fs(e) {
  return { ...vn(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function bn(e, t, n) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = t[r.key];
    if (!l) return n(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const _s = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function vs(e, t) {
  const n = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      _s.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function bs({ entry: e, at: t, menu: n, ids: r, value: l }) {
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
function ps({ menu: e, ids: t, focusRef: n }) {
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
      onKeyDown: bn(e, vn(e), () => {
      })
    }
  );
}
function gs({ props: e, menu: t, ids: n, focusRef: r, trigger: l }) {
  const i = ws(t), s = _(null);
  _n(l, s);
  const c = (d) => {
    wn(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: ve.menu, children: [
    t.findable && /* @__PURE__ */ a(ps, { menu: t, ids: n, focusRef: r }),
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
        onKeyDown: bn(t, fs(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ a(bs, { entry: d, at: u, menu: t, ids: n, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ a("p", { className: ve.empty, children: "No match" })
  ] });
}
function ys(e, t) {
  const n = e.open ? oa(e, t) : void 0;
  C(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function pn(...e) {
  return e.filter(Boolean).join(" ");
}
function Ns(e) {
  var t;
  return ((t = e.options.find((n) => n.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function ks({ props: e, menu: t, ids: n, trigger: r, wantFocus: l }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ae()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ a(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: pn(ve.trigger, e.triggerClassName),
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
      ...vs(t, l),
      children: /* @__PURE__ */ a("span", { id: n.value, className: ve.value, "data-placeholder": i || void 0, children: Ns(e) })
    }
  );
}
function gn(e) {
  const t = Ae(), n = t ? { ...e, disabled: !0, "aria-describedby": Mt(e["aria-describedby"], t) } : e, r = N(), l = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = _(null), s = _(null), c = _(null), d = hs(n, s), u = ms(d.open, c);
  return mn(d.open, i, () => d.close(!1)), ys(d, l), /* @__PURE__ */ o("div", { ref: i, className: pn(ve.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ a(ks, { props: n, menu: d, ids: l, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ a("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ a(gs, { props: n, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const $s = "_field_1ensj_2", Cs = "_label_1ensj_8", Ss = "_labelHidden_1ensj_15", Rs = "_control_1ensj_25", Ts = "_mono_1ensj_45", xs = "_area_1ensj_50", Ls = "_invalid_1ensj_57", je = {
  field: $s,
  label: Cs,
  labelHidden: Ss,
  control: Rs,
  mono: Ts,
  area: xs,
  invalid: Ls
}, As = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, yn = (e) => `${e}-label`;
function Es({ props: e, controlProps: t, cls: n }) {
  const r = e.secret ? As : {};
  return /* @__PURE__ */ a("input", { className: n, ...r, ...t });
}
function Is({ props: e, controlProps: t, cls: n }) {
  return /* @__PURE__ */ a(
    gn,
    {
      id: t.id,
      triggerClassName: n,
      "aria-labelledby": yn(t.id),
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
function Ms({ props: e, controlProps: t, cls: n }) {
  return /* @__PURE__ */ a("textarea", { className: n, rows: e.rows ?? 3, ...t });
}
const Bs = { input: Es, select: Is, textarea: Ms };
function Ps(e, t, n) {
  const r = Bs[e.kind ?? "input"];
  return /* @__PURE__ */ a(r, { props: e, controlProps: t, cls: n });
}
function qs(e, t, n, r) {
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
function Os(e) {
  const t = e.mono ? [je.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [je.area] : [];
  return [je.control, "ward-field-input", ...t, ...n].filter(Boolean).join(" ");
}
function js(e) {
  return e ? `${je.label} ${je.labelHidden} ward-field-label` : `${je.label} ward-field-label`;
}
function M(e) {
  const t = N(), n = `${t}-msg`, r = qs(e, t, n, Ae()), l = Os(e);
  return /* @__PURE__ */ o("div", { className: `${je.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ a("label", { id: yn(t), className: js(e.labelHidden), htmlFor: t, children: e.label }),
    Ps(e, r, l),
    e.invalid && /* @__PURE__ */ a("p", { id: n, className: `${je.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Ds = "_root_1waw7_2", Hs = "_trigger_1waw7_9", Fs = "_panel_1waw7_33", Ws = "_menu_1waw7_53", zs = "_group_1waw7_58", Ks = "_heading_1waw7_63", Gs = "_item_1waw7_69", Us = "_description_1waw7_84", Vs = "_marked_1waw7_93", Ys = "_check_1waw7_98", Js = "_separator_1waw7_123", Xs = "_footer_1waw7_129", ee = {
  root: Ds,
  trigger: Hs,
  panel: Fs,
  menu: Ws,
  group: zs,
  heading: Ks,
  item: Gs,
  description: Us,
  marked: Vs,
  check: Ys,
  separator: Js,
  footer: Xs
}, Nn = ye(null);
function Qs(e, t) {
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
const Zs = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function ec(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const n = Zs.get(t.key);
      n && (t.preventDefault(), e.show(n));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function kn(...e) {
  return e.filter(Boolean).join(" ");
}
function tc(e, t = {}) {
  const { ref: n, className: r, ...l } = t;
  return { ...l, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: kn(ee.trigger, r) };
}
function ac(e) {
  const t = N(), n = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = _(null), l = _(null), i = Qs(e.defaultOpen === !0, l);
  return mn(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: kn(ee.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ a(
      "button",
      {
        ...tc(l, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...ec(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ a(Nn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function nc(e) {
  let t = 0;
  const n = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function rc(e) {
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
const lc = (e) => e.split("").every((t) => t === e[0]);
function oc(e, t, n) {
  const r = lc(n), l = r ? n[0] : n, i = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = $n(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function ic(e) {
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
function sc(e, t) {
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
function cc(e, t) {
  const n = _(!1), r = fn(), l = sc(e, t), i = (s) => {
    wn(s) && e.focus(oc(e.items, e.current(), r(s.key)));
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
function dc(e) {
  const t = e.findIndex((n) => n.current && !n.disabled);
  return t === -1 ? Ze(e, -1, 1) : t;
}
function uc(e, t) {
  const { start: n, request: r } = t, l = _(e);
  l.current = e, C(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? dc(i) : Ze(i, i.length, -1));
  }, [n, r]);
}
function hc({ row: e, nav: t, popup: n }) {
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
function mc(e, t) {
  if (!e.description) return { aria: {}, content: e.label };
  const n = { "aria-labelledby": t + "-label", "aria-describedby": t + "-description" }, r = /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("span", { id: t + "-label", children: e.label }),
    /* @__PURE__ */ a("span", { id: t + "-description", className: ee.description, children: e.description })
  ] });
  return { aria: n, content: r };
}
function wc() {
  return /* @__PURE__ */ a("svg", { className: ee.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ a("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function fc(e, t, n) {
  return n ? { className: ee.item + " " + ee.marked, content: /* @__PURE__ */ o(R, { children: [
    e.current ? /* @__PURE__ */ a(wc, {}) : null,
    t
  ] }) } : { className: ee.item, content: t };
}
function Cn(e) {
  const { item: t, at: n } = e.row, r = mc(t, N()), l = fc(t, r.content, e.nav.items.some((s) => s.current)), i = {
    ref: (s) => {
      e.nav.refs.current[n] = s;
    },
    role: "menuitem",
    tabIndex: -1,
    className: l.className,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...r.aria,
    ...hc(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ a("a", { href: H(t.href), ...i, children: l.content }) : /* @__PURE__ */ a("button", { type: "button", ...i, children: l.content });
}
function _c({ heading: e, rows: t, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: ee.group, children: [
    /* @__PURE__ */ a("div", { id: l, className: ee.heading, children: e }),
    t.map((i) => /* @__PURE__ */ a(Cn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function vc({ block: e, nav: t, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ a("div", { role: "separator", className: ee.separator }) : e.kind === "group" ? /* @__PURE__ */ a(_c, { heading: e.heading, rows: e.rows, nav: t, popup: n }) : /* @__PURE__ */ a(Cn, { row: e.row, nav: t, popup: n });
}
function bc() {
  const e = ge(Nn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function pc({ entries: e, footer: t, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = bc(), c = _(null);
  _n(s, c, n);
  const d = nc(e), u = ic(d.flatMap(rc).map((w) => w.item)), h = cc(u, r);
  return uc(u, r), /* @__PURE__ */ o("div", { ref: c, className: ee.panel, children: [
    /* @__PURE__ */ a("div", { role: "menu", id: l, "aria-labelledby": i, className: ee.menu, ...h, children: d.map((w, f) => /* @__PURE__ */ a(vc, { block: w, nav: u, popup: r }, f)) }),
    t && /* @__PURE__ */ a("p", { className: ee.footer, children: t })
  ] });
}
function gc(e) {
  var n;
  return (((n = e.parentElement) == null ? void 0 : n.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function Sn(e, t) {
  C(() => {
    const n = e.current;
    t === "page" && n && !gc(n) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const yc = (e, t) => e.reduce((n, r) => n + r + t, -t);
function Nc({ room: e, widths: t, more: n, gap: r }, l) {
  const i = t.map((d, u) => u);
  if (yc(t, r) <= e) return i;
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
function kc(e) {
  const t = getComputedStyle(e), n = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Ft(t.paddingInlineStart) - Ft(t.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(':scope > [role="tab"]'), Ta),
    more: n ? Ta(n) : 0,
    gap: Ft(t.columnGap)
  };
}
function $c(e, t) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const Cc = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function Sc(e, t, n) {
  const [r, l] = p(null);
  return tt(() => {
    const i = e.current;
    if (!i) return;
    const s = () => {
      const c = kc(i);
      l((d) => Cc(d, c) ? d : c);
    };
    return s(), $c(i, s);
  }, [e, n]), r && Nc(r, t);
}
const Rc = "_strip_jqyo6_2", Tc = "_fits_jqyo6_19", xc = "_probe_jqyo6_27", Lc = "_moreRoot_jqyo6_36", Ac = "_more_jqyo6_36", Ec = "_tab_jqyo6_55", Ic = "_count_jqyo6_91", be = {
  strip: Rc,
  fits: Tc,
  probe: xc,
  moreRoot: Lc,
  more: Ac,
  tab: Ec,
  count: Ic
}, Rn = "More";
function Mc(e, t) {
  const n = e.findIndex((r) => r.id === t);
  return n < 0 ? 0 : n;
}
const Tn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function xn(e) {
  return `${be.strip} ward-tabs ward-tabs--${e}`;
}
const Bc = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Pc({ tab: e, active: t, place: n, onChange: r }) {
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
function qc(e, t) {
  return (n) => {
    t(n), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Oc({ tabs: e, trigger: t, onPick: n }) {
  return /* @__PURE__ */ a(ac, { label: Rn, className: be.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: be.more }, children: /* @__PURE__ */ a(pc, { align: "end", entries: e.map((r) => ({ label: Tn(r), onSelect: () => n(r.id) })) }) });
}
function jc(e, t, n) {
  return !t || t.includes(n) ? e.itemProps(n) : Bc;
}
function TR({ tabs: e, active: t, onChange: n, label: r = "Tabs", level: l }) {
  const i = Et({ orientation: "horizontal" }), s = Mc(e, t);
  C(() => i.setActive(s), [i.setActive, s]);
  const c = _(null);
  Sn(c, l);
  const d = Sc(c, s, e.map(Tn).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${xn(l)} ${be.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ a(Pc, { tab: h, active: t, place: jc(i, d, w), onChange: n }, h.id)),
    /* @__PURE__ */ a("span", { "aria-hidden": "true", "data-more-probe": "", className: `${ee.trigger} ${be.more} ${be.probe}`, children: Rn }),
    u.length > 0 && /* @__PURE__ */ a(Oc, { tabs: u, trigger: i.itemProps(e.length), onPick: qc(c, n) })
  ] });
}
const xa = 7;
function xR({ links: e, active: t, label: n, level: r }) {
  if (e.length > xa) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${xa} — the set is fixed`);
  const l = _(null);
  return Sn(l, r), ln(l, e.findIndex((i) => i.id === t), "a"), /* @__PURE__ */ a(Bt, { as: "nav", rowRef: l, className: xn(r), label: n, count: e.length, focusable: !1, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${be.tab} ward-tab`, "aria-current": i.id === t ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(R, { children: [
      " ",
      /* @__PURE__ */ a("span", { className: be.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const Dc = "_root_v56ff_3", Hc = "_segment_v56ff_9", La = {
  root: Dc,
  segment: Hc
};
function Ln({ options: e, value: t, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
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
const Fc = "_sidebar_s9o1j_3", Wc = "_brand_s9o1j_9", zc = "_mark_s9o1j_17", Kc = "_word_s9o1j_24", Gc = "_nav_s9o1j_30", Uc = "_navItem_s9o1j_39", Vc = "_footLink_s9o1j_49", Yc = "_group_s9o1j_58", Jc = "_groupName_s9o1j_65", Xc = "_agents_s9o1j_81", Qc = "_agent_s9o1j_81", Zc = "_root_s9o1j_96", ed = "_agentTop_s9o1j_105", td = "_dot_s9o1j_112", ad = "_agentName_s9o1j_124", nd = "_agentMeta_s9o1j_138", rd = "_foot_s9o1j_49", ld = "_footName_s9o1j_150", od = "_footLinks_s9o1j_157", id = "_linkBrand_s9o1j_184", sd = "_label_s9o1j_205", cd = "_note_s9o1j_210", dd = "_footer_s9o1j_226", x = {
  sidebar: Fc,
  brand: Wc,
  mark: zc,
  word: Kc,
  nav: Gc,
  navItem: Uc,
  new: "_new_s9o1j_48",
  footLink: Vc,
  group: Yc,
  groupName: Jc,
  agents: Xc,
  agent: Qc,
  root: Zc,
  agentTop: ed,
  dot: td,
  agentName: ad,
  agentMeta: nd,
  foot: rd,
  footName: ld,
  footLinks: od,
  linkBrand: id,
  label: sd,
  note: cd,
  footer: dd
};
function ud({ agent: e }) {
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
function hd({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ a("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ a("div", { className: x.footLinks, children: e.links.map((t) => /* @__PURE__ */ a("a", { className: `${x.footLink} ward-target`, href: H(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function md({ brand: e, nav: t, agentsHeading: n, agents: r, newAction: l, shared: i }) {
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
    /* @__PURE__ */ a("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ a(ud, { agent: s }, s.href)) }),
    /* @__PURE__ */ a(hd, { shared: i })
  ] });
}
function wd(e) {
  return e.destinations ?? e.items ?? [];
}
function fd({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("div", { className: x.linkBrand, children: e });
}
function _d({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("div", { className: x.footer, children: e });
}
function vd({ link: e, active: t }) {
  return /* @__PURE__ */ o("a", { href: H(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ a("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ a("span", { className: x.note, children: e.note })
  ] });
}
function bd(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ a(fd, { brand: e.brand }),
    /* @__PURE__ */ a("nav", { "aria-label": e.label ?? "Sidebar", children: wd(e).map((t) => /* @__PURE__ */ a(vd, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ a(_d, { children: e.children })
  ] });
}
function pd(e) {
  return "agents" in e;
}
function LR(e) {
  return pd(e) ? /* @__PURE__ */ a(md, { ...e }) : /* @__PURE__ */ a(bd, { ...e });
}
const gd = "_mark_wlgi8_3", yd = {
  mark: gd
}, Nd = { met: "✓", unmet: "", failed: "✕" };
function ia({ state: e, label: t }) {
  return /* @__PURE__ */ a(
    "span",
    {
      className: yd.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: Nd[e]
    }
  );
}
const kd = "_avatar_1t33a_3", $d = {
  avatar: kd
};
function Ct(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function Cd(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), n = t.charAt(0);
  return [Ct(e), ...[...t.slice(1)].map((r) => n + r)];
}
function Sd(e, t) {
  const n = Cd(e).find((l) => !t.has(l));
  if (n !== void 0) return n;
  let r = 2;
  for (; t.has(Ct(e).charAt(0) + String(r)); ) r += 1;
  return Ct(e).charAt(0) + String(r);
}
function AR(e) {
  const t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (n.has(r)) continue;
    const l = Sd(r, t);
    t.add(l), n.set(r, l);
  }
  return n;
}
function Rd(e) {
  return e != null && ct(e) ? Ur(e) : void 0;
}
function ER({ name: e, step: t, size: n = "md", initials: r }) {
  return /* @__PURE__ */ a("span", { className: $d.avatar, "data-size": n, "aria-hidden": "true", style: Rd(t), children: r ?? Ct(e) });
}
const Td = "_marker_br9fi_2", xd = {
  marker: Td
}, Ld = {
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
}, Ad = { running: " ward-running" };
function He({ size: e, kind: t, label: n }) {
  const r = { "--marker": Ld[t], width: e, height: e };
  return /* @__PURE__ */ a(
    "span",
    {
      className: `${xd.marker} ward-marker ward-marker--${t}${Ad[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const Ed = "_root_ti0pq_2", Id = "_chip_ti0pq_11", Md = "_noCase_ti0pq_23", ft = {
  root: Ed,
  chip: Id,
  noCase: Md
};
function Bd(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function sa({ connection: e, since: t, lastEventAt: n }) {
  const r = Bd(t, n), l = ra(r, e === "reconnecting");
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
const Pd = "_root_yylks_2", qd = "_context_yylks_13", Od = "_row_yylks_1", jd = "_heading_yylks_27", Dd = "_headingWrap_yylks_35", Hd = "_meta_yylks_41", Fd = "_chips_yylks_49", Wd = "_title_yylks_56", zd = "_consequence_yylks_66", Kd = "_actionsWrap_yylks_73", Gd = "_actions_yylks_73", Ud = "_action_yylks_73", Vd = "_overflowPanel_yylks_102", Yd = "_measureClip_yylks_113", Jd = "_measure_yylks_113", K = {
  root: Pd,
  context: qd,
  row: Od,
  heading: jd,
  headingWrap: Dd,
  meta: Hd,
  chips: Fd,
  title: Wd,
  consequence: zd,
  actionsWrap: Kd,
  actions: Gd,
  action: Ud,
  overflowPanel: Vd,
  measureClip: Yd,
  measure: Jd
};
function Xd({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ a(at, { as: "h1", className: K.title, text: e }) : /* @__PURE__ */ a("h1", { className: K.title, children: e });
}
function Qd({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ a("div", { className: K.chips, children: e.map((t) => /* @__PURE__ */ a(m, { ...t }, t.label)) }) : null;
}
function Zd({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ a("p", { className: K.consequence, title: t, children: e }) : null;
}
function eu({ chips: e = [], consequence: t, consequenceHint: n }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ o("div", { className: K.meta, children: [
    /* @__PURE__ */ a(Qd, { chips: e }),
    /* @__PURE__ */ a(Zd, { consequence: t, consequenceHint: n })
  ] });
}
function tu({ title: e, chips: t, consequence: n, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: K.heading, children: [
    /* @__PURE__ */ a(Xd, { title: e, density: l }),
    /* @__PURE__ */ a(eu, { chips: t, consequence: n, consequenceHint: r })
  ] });
}
function Jt({ actions: e }) {
  return e.map((t, n) => /* @__PURE__ */ a("span", { className: K.action, "data-action": "", children: t }, n));
}
function Aa({ disclosure: e }) {
  return /* @__PURE__ */ a(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function au({ actions: e, hasMore: t, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ a(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ a(Aa, { disclosure: l }) : t ? [/* @__PURE__ */ a(Aa, { disclosure: l }, "more"), /* @__PURE__ */ a(Jt, { actions: e }, "actions")] : /* @__PURE__ */ a(Jt, { actions: e });
}
function nu(e, t, n, r) {
  return n ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function ru({ actions: e, disclosure: t, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ a("div", { id: t.panelId, className: K.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ a(Jt, { actions: e }) });
}
function lu(e, t) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const ou = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function iu(e = [], t, n) {
  const r = e.at(-1);
  return r !== void 0 && ou(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: n !== !1 };
}
function su({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ a("div", { className: K.context, children: /* @__PURE__ */ a(Ui, { path: e.path, current: e.current }) });
}
function cu(...e) {
  return e.some((t) => t === null);
}
function du(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function uu(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + du(e);
}
function hu(e, t, n, r, l) {
  if (l === 0 || cu(t, n, r)) return !1;
  const [i, s, c] = [t, n, r], d = Math.max(0, e.clientWidth - uu(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function mu(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function wu(e) {
  return Sr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function fu(e, t) {
  return t.length === 0 && e.length === 1 && wu(e[0]);
}
function _u(e, t) {
  const n = _(null), r = _(null), l = _(null), i = _(null), [s, c] = p(!1);
  return C(() => {
    const d = n.current;
    if (!mu(d)) return;
    const u = () => c(hu(d, r.current, l.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !t };
}
function vu({ actions: e, hasMore: t, measureRef: n }) {
  return /* @__PURE__ */ a("div", { className: K.measureClip, children: /* @__PURE__ */ o("div", { className: K.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ a("span", { children: /* @__PURE__ */ a(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ a("span", { children: r }, l))
  ] }) });
}
function bu({ connection: e }) {
  return e ? /* @__PURE__ */ a(sa, { connection: e.connection, since: e.since }) : null;
}
function IR({ crumb: e, crumbCurrent: t, chips: n, title: r, consequence: l, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: y, measureRef: E, collapsed: P } = _u(s, fu(s, c)), ae = c.length > 0, { disclosure: Ne, close: ne } = lu(P || ae, y), Ee = nu(c, s, P, u);
  return /* @__PURE__ */ o("header", { className: K.root, "data-density": h, children: [
    /* @__PURE__ */ a(su, { crumb: iu(e, r, t) }),
    /* @__PURE__ */ o("div", { className: K.row, ref: w, children: [
      /* @__PURE__ */ a("div", { ref: f, className: K.headingWrap, children: /* @__PURE__ */ a(tu, { title: r, chips: n, consequence: l, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ o("div", { className: K.actionsWrap, children: [
        /* @__PURE__ */ a(bu, { connection: d }),
        /* @__PURE__ */ a("div", { className: K.actions, ref: y, "data-ward-actions": !0, children: /* @__PURE__ */ a(au, { actions: s, hasMore: ae, collapsed: P, onOverflow: u, disclosure: Ne }) })
      ] })
    ] }),
    /* @__PURE__ */ a(ru, { actions: Ee, disclosure: Ne, onEscape: ne }),
    /* @__PURE__ */ a(vu, { actions: s, hasMore: ae, measureRef: E })
  ] });
}
const pu = "_root_td96x_2", gu = "_body_td96x_16", Ea = {
  root: pu,
  body: gu
};
function MR({ variant: e = "info", ticket: t, children: n }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ a("aside", { className: `${Ea.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ a("div", { className: Ea.body, children: n }) });
}
const yu = "_root_bf1pc_2", Nu = "_table_bf1pc_9", ku = "_caption_bf1pc_14", $u = "_series_bf1pc_23", Cu = "_category_bf1pc_31", Su = "_cell_bf1pc_39", Ru = "_track_bf1pc_45", Tu = "_lane_bf1pc_52", xu = "_bar_bf1pc_56", Lu = "_value_bf1pc_63", Au = "_swatch_bf1pc_70", Eu = "_empty_bf1pc_78", J = {
  root: yu,
  table: Nu,
  caption: ku,
  series: $u,
  category: Cu,
  cell: Su,
  track: Ru,
  lane: Tu,
  bar: xu,
  value: Lu,
  swatch: Au,
  empty: Eu
}, Iu = "—", Ia = 6;
function Mu(e, t) {
  if (t.length < 1 || t.length > Ia)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${Ia}`);
  const n = t.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function Bu(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((n) => n ?? 0)));
}
function An(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function Pu(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function qu({ value: e, top: t, step: n, format: r, missing: l }) {
  const i = Pu(e, t), s = { "--share": `${i}%` };
  return /* @__PURE__ */ a("td", { className: J.cell, children: /* @__PURE__ */ o("span", { className: J.track, children: [
    /* @__PURE__ */ a("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ a("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ a("span", { className: J.value, children: e === null ? l : r(e) })
  ] }) });
}
function Ou({ series: e }) {
  return /* @__PURE__ */ a(R, { children: e.map((t, n) => /* @__PURE__ */ o("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ a("span", { className: J.swatch, "data-step": An(n, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function ju({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ a("p", { className: J.caption, children: e }),
    /* @__PURE__ */ a("p", { className: J.empty, children: t })
  ] });
}
function Du({ title: e, categories: t, series: n, top: r, format: l = te, categoryHead: i = "Category", missing: s = Iu }) {
  return /* @__PURE__ */ a("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: J.table, children: [
    /* @__PURE__ */ a("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ a("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ a("th", { scope: "col", className: J.series, children: /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ a(Ou, { series: n })
    ] }) }),
    /* @__PURE__ */ a("tbody", { children: t.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ a("th", { scope: "row", className: J.category, children: c }),
      n.map((u, h) => /* @__PURE__ */ a(qu, { value: u.values[d], top: r, step: An(h, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function BR(e) {
  Mu(e.categories, e.series);
  const t = Bu(e.series);
  return t === 0 ? /* @__PURE__ */ a(ju, { title: e.title, empty: e.empty }) : /* @__PURE__ */ a(Du, { ...e, top: t });
}
const Hu = "_root_1bfqw_2", Fu = "_figure_1bfqw_7", Wu = "_of_1bfqw_13", zu = "_bar_1bfqw_18", Ku = "_rows_1bfqw_38", Gu = "_row_1bfqw_38", Uu = "_label_1bfqw_49", Vu = "_amount_1bfqw_54", Ie = {
  root: Hu,
  figure: Fu,
  of: Wu,
  bar: zu,
  rows: Ku,
  row: Gu,
  label: Uu,
  amount: Vu
};
function Yu({ spent: e, ceiling: t, breakdown: n }) {
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
const Ju = "_frame_lmfp9_2", Xu = "_table_lmfp9_6", Qu = "_th_lmfp9_12", Zu = "_td_lmfp9_13", eh = "_sort_lmfp9_48", th = "_row_lmfp9_60", ah = "_empty_lmfp9_68", qe = {
  frame: Ju,
  table: Xu,
  th: Qu,
  td: Zu,
  sort: eh,
  row: th,
  empty: ah
}, nh = { asc: "ascending", desc: "descending" };
function rh(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return nh[t.direction];
}
function lh(e, t) {
  return e.sortable && t ? /* @__PURE__ */ a("button", { type: "button", className: qe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function oh(e) {
  return e === void 0 ? void 0 : { width: e };
}
function ih({ column: e, sort: t, onSort: n }) {
  return /* @__PURE__ */ a(
    "th",
    {
      scope: "col",
      className: qe.th,
      style: oh(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": rh(e, t),
      children: lh(e, n)
    }
  );
}
function sh({ row: e, props: t }) {
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
function ch({
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
    /* @__PURE__ */ a("thead", { children: /* @__PURE__ */ a("tr", { className: qe.head, children: t.map((w) => /* @__PURE__ */ a(ih, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ a("tbody", { children: n.map((w) => /* @__PURE__ */ a(sh, { row: w, props: { label: e, columns: t, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const dh = "_list_v0s52_2", uh = {
  list: dh
};
function PR({ children: e, label: t }) {
  return /* @__PURE__ */ a("ul", { className: uh.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const hh = "_label_1u62a_2", mh = {
  label: hh
};
function qR({ columns: e }) {
  return /* @__PURE__ */ a("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ a("tr", { children: e.map((t) => /* @__PURE__ */ a("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ a("span", { className: mh.label, children: t.header }) }, t.key)) }) });
}
const wh = "_stack_bp6a0_2", fh = {
  stack: wh
};
function OR({ children: e }) {
  return /* @__PURE__ */ a("span", { className: fh.stack, "data-ward-action-stack": "", children: e });
}
const _h = "_set_1z0sq_2", vh = "_legend_1z0sq_7", bh = "_row_1z0sq_15", ph = "_control_1z0sq_20", gh = "_input_1z0sq_26", yh = "_label_1z0sq_31", Nh = "_consequence_1z0sq_36", We = {
  set: _h,
  legend: vh,
  row: bh,
  control: ph,
  input: gh,
  label: yh,
  consequence: Nh
};
function En({ legend: e, options: t, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
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
const kh = "_root_11gpw_2", $h = "_head_11gpw_10", Ch = "_note_11gpw_29", Sh = "_index_11gpw_34", Rh = "_dot_11gpw_38", Th = "_counter_11gpw_49", xh = "_trailing_11gpw_57", ze = {
  root: kh,
  head: $h,
  note: Ch,
  index: Sh,
  dot: Rh,
  counter: Th,
  trailing: xh
};
function Lh({ index: e }) {
  return e ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("span", { className: `${ze.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ a("span", { className: ze.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ah({ counter: e }) {
  return e ? /* @__PURE__ */ a("span", { className: ze.counter, "aria-hidden": "true", children: e }) : null;
}
function Ma({ title: e, index: t, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${ze.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: ze.head, children: [
      /* @__PURE__ */ a(Lh, { index: t }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ a("span", { className: ze.note, children: n }),
    /* @__PURE__ */ a(Ah, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ a("span", { className: ze.trailing, children: i })
  ] });
}
const Eh = "_strip_c3x3u_2", Ih = "_cell_c3x3u_7", Mh = "_value_c3x3u_12", Bh = "_link_c3x3u_29", Ph = "_label_c3x3u_49", qh = "_tiles_c3x3u_101", De = {
  strip: Eh,
  cell: Ih,
  value: Mh,
  link: Bh,
  label: Ph,
  tiles: qh
};
function In(e, t, [n, r]) {
  if (t.length < n || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${n} to ${r}`);
  if (t.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Mn = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Oh({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ a("dd", { className: Mn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ a("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function jh({ cell: e, href: t }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ a("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ a("dd", { className: Mn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${De.link} ward-stat-link`, href: H(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ a("span", { children: e.value }),
      /* @__PURE__ */ a("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Bn = (e) => e.href === void 0 ? /* @__PURE__ */ a(Oh, { cell: e }, e.label) : /* @__PURE__ */ a(jh, { cell: e, href: e.href }, e.label);
function qt({ cells: e, divided: t = !1 }) {
  return In("StatStrip", e, [2, 4]), /* @__PURE__ */ a("dl", { className: `${De.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(Bn) });
}
const Ba = 6;
function jR({ cells: e }) {
  In("StatTiles", e, [1, 2 * Ba]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, Ba) };
  return /* @__PURE__ */ a("dl", { className: `${De.tiles} ward-stattiles`, style: t, children: e.map(Bn) });
}
const Dh = "_root_1eb1u_2", Hh = "_track_1eb1u_8", Fh = "_thumb_1eb1u_46", Wh = "_labelHidden_1eb1u_64", zh = "_label_1eb1u_64", Kh = "_lockedNote_1eb1u_84", Ke = {
  root: Dh,
  track: Hh,
  thumb: Fh,
  labelHidden: Wh,
  label: zh,
  lockedNote: Kh
};
function Gh(e, t, n, r) {
  return { on: n ? !0 : e, off: !!(t || n || r) };
}
function Uh(e) {
  return e ? `${Ke.label} ${Ke.labelHidden}` : Ke.label;
}
function Ue({ label: e, checked: t, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = Ae(), { on: h, off: w } = Gh(t, r, l, u !== null);
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
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: Uh(s), children: [
      e,
      l && /* @__PURE__ */ a("span", { className: Ke.lockedNote, children: "always on" })
    ] })
  ] });
}
const Vh = "_bar_1vp69_2", Yh = "_skip_1vp69_11", Jh = "_mark_1vp69_22", Xh = "_nav_1vp69_30", Qh = "_list_1vp69_34", Zh = "_select_1vp69_41", em = "_selectTrigger_1vp69_45", tm = "_dest_1vp69_52", am = "_actor_1vp69_71", nm = "_actorMark_1vp69_84", rm = "_actorLabel_1vp69_89", lm = "_tagline_1vp69_108", ie = {
  bar: Vh,
  skip: Yh,
  mark: Jh,
  nav: Xh,
  list: Qh,
  select: Zh,
  selectTrigger: em,
  dest: tm,
  actor: am,
  actorMark: nm,
  actorLabel: rm,
  tagline: lm
};
function om(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function im(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function DR({ wordmark: e = "Trellis", destinations: t, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = im(r);
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
        gn,
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
      /* @__PURE__ */ a("span", { className: ie.actorMark, "aria-hidden": "true", children: om(c) })
    ] })
  ] });
}
const sm = "_tree_zzoob_2", cm = "_item_zzoob_6", dm = "_row_zzoob_10", um = "_button_zzoob_22", St = {
  tree: sm,
  item: cm,
  row: dm,
  button: um
}, Pn = ye(null);
function hm({ label: e, children: t }) {
  const { containerProps: n, itemProps: r } = Et({ orientation: "vertical" });
  return /* @__PURE__ */ a(Pn.Provider, { value: r, children: /* @__PURE__ */ a("ul", { className: St.tree, role: "tree", "aria-label": e, ...n, children: t }) });
}
const mm = { ArrowRight: !0, ArrowLeft: !1 };
function Pa(e) {
  return e ? !0 : void 0;
}
function wm(e, t) {
  const n = mm[e.key];
  !t.leaf && t.onToggle && n !== void 0 && !!t.expanded !== n && t.onToggle();
}
function fm(e) {
  var t, n;
  e.leaf || (t = e.onToggle) == null || t.call(e), (n = e.onSelect) == null || n.call(e);
}
function _m(e) {
  const t = [St.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function vm(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function bm(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function pm(e) {
  return typeof e == "string" ? e : void 0;
}
function gm({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function ym({ unresolved: e, inherited: t }) {
  const n = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: n });
}
function qn(e) {
  const t = ge(Pn);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = vm(e);
  return /* @__PURE__ */ o("li", { className: St.item, role: "none", children: [
    /* @__PURE__ */ a(
      "div",
      {
        className: _m(e),
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
            onClick: () => fm(e),
            onKeyDown: (r) => wm(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ a("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: bm(e) }),
              /* @__PURE__ */ a("span", { className: "ward-truncate", title: pm(e.label), children: e.label }),
              /* @__PURE__ */ a(gm, { value: e.detail }),
              /* @__PURE__ */ a(ym, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ a("ul", { role: "group", children: e.children }) : null
  ] });
}
const Nm = "_frame_10gwd_2", km = "_subjectRail_10gwd_22", $m = "_subject_10gwd_22", Cm = "_rail_10gwd_42", Sm = "_record_10gwd_66", Rm = "_recordBody_10gwd_71", Tm = "_stageGrid_10gwd_120", xm = "_band_10gwd_134", Lm = "_bandBody_10gwd_142", Am = "_bandActions_10gwd_147", Em = "_scroller_10gwd_155", Im = "_board_10gwd_182", Mm = "_lanes_10gwd_191", Bm = "_cardGrid_10gwd_225", X = {
  frame: Nm,
  subjectRail: km,
  subject: $m,
  rail: Cm,
  record: Sm,
  recordBody: Rm,
  stageGrid: Tm,
  band: xm,
  bandBody: Lm,
  bandActions: Am,
  scroller: Em,
  board: Im,
  lanes: Mm,
  cardGrid: Bm
};
function HR({ children: e, as: t = "main", inset: n = "page" }) {
  return /* @__PURE__ */ a(t, { className: X.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function qa(e) {
  return e ? "true" : void 0;
}
function FR({ children: e, rail: t, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: X.subjectRail, "data-ward-subject-rail": n, "data-ruled": qa(i), children: [
    /* @__PURE__ */ a("div", { className: X.subject, children: e }),
    /* @__PURE__ */ a("aside", { className: X.rail, "data-sticky": qa(l), "aria-label": r, children: t })
  ] });
}
function WR({ title: e, children: t, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ a("section", { className: X.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ a(Ma, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ o("section", { className: X.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ a(Ma, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ a("div", { className: X.recordBody, "data-pad": l, "data-measure": c, children: t })
  ] });
}
const Pm = "_form_1j8ub_2", qm = "_fields_1j8ub_9", Om = "_actions_1j8ub_19", Wt = {
  form: Pm,
  fields: qm,
  actions: Om
};
function zR({ label: e, children: t, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Wt.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ a("div", { className: Wt.fields, children: t }),
    n == null ? null : /* @__PURE__ */ a("div", { className: Wt.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function KR({ children: e, actions: t, label: n }) {
  return /* @__PURE__ */ o("section", { className: X.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ a("div", { className: X.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ a("div", { className: X.bandActions, children: t })
  ] });
}
const jm = "(max-width: 767.98px)";
function ca({ label: e, children: t, laneCount: n }) {
  const r = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ a(Bt, { className: X.scroller, label: e, count: n ?? Rr.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function Dm({ lanes: e, label: t, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: X.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ a(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ a(ca, { label: t, children: i == null ? void 0 : i.content })
  ] });
}
function Hm({ lanes: e, label: t }) {
  return /* @__PURE__ */ a("div", { className: X.board, "data-ward-board": "", children: /* @__PURE__ */ a(ca, { label: t, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ a(Tr, { children: n.content }, n.id)) }) });
}
function GR({ children: e, label: t = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = it(jm);
  return n === void 0 ? /* @__PURE__ */ a(ca, { label: t, children: e }) : l ? /* @__PURE__ */ a(Dm, { lanes: n, label: t, laneLabel: r }) : /* @__PURE__ */ a(Hm, { lanes: n, label: t });
}
function UR({ columns: e, children: t, label: n = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), i = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ a(Bt, { className: X.stageGrid, label: n, count: l, "data-ward-stage-grid": "", "data-floor": r, style: i, children: t });
}
function VR({ children: e, label: t }) {
  return /* @__PURE__ */ a("div", { className: `${X.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const Fm = "_block_6tv5x_3", Wm = "_sentence_6tv5x_10", zm = "_meta_6tv5x_19", Km = "_ways_6tv5x_24", Gm = "_action_6tv5x_38", Um = "_strip_6tv5x_42", Vm = "_loading_6tv5x_61", Ym = "_label_6tv5x_69", Jm = "_counter_6tv5x_76", we = {
  block: Fm,
  sentence: Wm,
  meta: zm,
  ways: Km,
  action: Gm,
  strip: Um,
  loading: Vm,
  label: Ym,
  counter: Jm
};
function Xm({ action: e }) {
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
    /* @__PURE__ */ a(Xm, { action: t })
  ] });
}
function Qm(e) {
  return /* @__PURE__ */ a(Ot, { ...e, kind: "ward-emptystate" });
}
function YR({ sentence: e, total: t, action: n }) {
  return /* @__PURE__ */ a(Ot, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: we.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function Zm({ ways: e }) {
  return /* @__PURE__ */ a("div", { className: `${we.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ a(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function JR({ ways: e, ...t }) {
  return /* @__PURE__ */ a(Ot, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ a(Zm, { ways: e }) });
}
function XR({ sentence: e, at: t, onRetry: n }) {
  return /* @__PURE__ */ a(Ot, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: we.meta, children: [
    "failed at ",
    ue(t)
  ] }) });
}
function QR({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ o("div", { className: we.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ue(e),
    ". Showing snapshot from ",
    ue(t)
  ] });
}
function ZR({ queued: e, since: t }) {
  return /* @__PURE__ */ o("div", { className: we.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    ue(t)
  ] });
}
function e2({ label: e, startedAt: t }) {
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
const ew = "_note_cigdt_2", tw = {
  note: ew
};
function aw({ label: e, count: t, cap: n }) {
  return /* @__PURE__ */ o("p", { className: tw.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    n
  ] });
}
const nw = "_card_k7btg_3", rw = "_hit_k7btg_31", lw = "_head_k7btg_44", ow = "_title_k7btg_51", iw = "_meta_k7btg_57", sw = "_since_k7btg_66", cw = "_sep_k7btg_76", dw = "_fields_k7btg_80", uw = "_field_k7btg_80", hw = "_last_k7btg_98", mw = "_reason_k7btg_110", ce = {
  card: nw,
  hit: rw,
  head: lw,
  title: ow,
  meta: iw,
  since: sw,
  sep: cw,
  fields: dw,
  field: uw,
  last: hw,
  reason: mw
}, ww = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function fw(e, t, n) {
  const r = bt(e, "blue"), l = bt(e, "orange"), i = bt(e, "green"), s = _(/* @__PURE__ */ new Set());
  C(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = ww[d.type];
      u && c[u]();
    });
  }, [r, n, i, t, l]);
}
const _w = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function vw(e, t) {
  return _w[t](e);
}
function bw({ item: e, connection: t }) {
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
function pw({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: ce.head, children: [
    e.flagged && /* @__PURE__ */ a(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ a(m, { role: t.role, label: t.label })
  ] });
}
function gw({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: ce.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function yw({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ a("p", { className: ce.fields, children: t.map((n) => /* @__PURE__ */ a("span", { className: ce.field, children: vw(e, n) }, n)) });
}
const Xt = (e) => e ? !0 : void 0;
function Nw(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function kw(e, t, n) {
  e == null || e(t, n);
}
function $w(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Cw({ item: e, stale: t }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ a("p", { className: ce.last, "data-stale": Xt(t), children: n }) : null;
}
function jt(e) {
  const t = e.fields ?? [], n = e.item, r = _(null);
  fw(r, n.key, e.feed);
  const l = $w(e.feed), i = Nw(n);
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
        /* @__PURE__ */ a("button", { type: "button", className: ce.hit, onClick: (s) => kw(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ a(pw, { item: n }),
        /* @__PURE__ */ a(at, { as: "p", className: ce.title, text: n.title }),
        /* @__PURE__ */ a(bw, { item: n, connection: l }),
        /* @__PURE__ */ a(gw, { reason: n.blockedReason }),
        /* @__PURE__ */ a(yw, { item: n, fields: t }),
        /* @__PURE__ */ a(Cw, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const Sw = "_column_1j8bi_3", Rw = "_head_1j8bi_21", Tw = "_label_1j8bi_30", xw = "_count_1j8bi_39", Lw = "_list_1j8bi_53", lt = {
  column: Sw,
  head: Rw,
  label: Tw,
  count: xw,
  list: Lw
};
function On(e, t) {
  return [...e].sort((n, r) => t === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function Aw({ column: e, count: t, id: n }) {
  return /* @__PURE__ */ o("div", { className: lt.head, children: [
    /* @__PURE__ */ a("h2", { className: lt.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ a(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: lt.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Ew(e) {
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
function Iw({ column: e, items: t, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), h = e.cap !== void 0 && t.length > e.cap, w = On(t, r);
  return /* @__PURE__ */ o("section", { className: lt.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ a(Aw, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ a(Ew, { column: e, items: t, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ a(aw, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const Mw = "_foot_cs4jr_2", Bw = "_note_cs4jr_13", Pw = "_link_cs4jr_19", zt = {
  foot: Mw,
  note: Bw,
  link: Pw
};
function t2({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: zt.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ a("p", { className: zt.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ a("a", { className: `${zt.link} ward-target`, href: H(e), children: "Configure board" })
  ] });
}
const qw = "_head_1tfi5_3", Ow = "_identity_1tfi5_12", jw = "_titleRow_1tfi5_18", Dw = "_title_1tfi5_18", Hw = "_key_1tfi5_35", Fw = "_rollup_1tfi5_45", Ww = "_tools_1tfi5_53", zw = "_swatch_1tfi5_101", Kw = "_mark_1tfi5_108", Se = {
  head: qw,
  identity: Ow,
  titleRow: jw,
  title: Dw,
  key: Hw,
  rollup: Fw,
  tools: Ww,
  swatch: zw,
  mark: Kw
}, Oa = "initials:";
function Gw(e) {
  return e === void 0 ? "loaded this week unavailable" : `${te(e)} loaded this week`;
}
function Uw(e) {
  const t = [Gw(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${te(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${de(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${de(e.p90)}`), t.join(" · ");
}
function Vw(e) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      te(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Uw(e)
  ] });
}
function Yw(e) {
  return e.startsWith(Oa) ? e.slice(Oa.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function Jw({ markRef: e, streamStep: t }) {
  const n = { "--stream": pe(t, "id") };
  return e ? /* @__PURE__ */ a("span", { className: `${Se.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: Yw(e) }) : /* @__PURE__ */ a("span", { className: Se.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Xw({ owners: e, owner: t, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ a(M, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: n, options: e });
}
function a2({
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
        /* @__PURE__ */ a(Jw, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ a("h1", { className: Se.title, children: e.name }),
        /* @__PURE__ */ a("span", { className: Se.key, children: e.key })
      ] }),
      /* @__PURE__ */ a("p", { className: Se.rollup, "aria-live": "polite", children: Vw(t) })
    ] }),
    /* @__PURE__ */ o("div", { className: Se.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ a(Xw, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ a(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ a(sa, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const Qw = "_head_1sejb_14", Zw = "_line_1sejb_15", ef = "_cHandle_1sejb_36", tf = "_cName_1sejb_41", af = "_nameLine_1sejb_49", nf = "_cLabel_1sejb_56", rf = "_cCap_1sejb_61", lf = "_cShown_1sejb_66", of = "_name_1sejb_49", sf = "_noCap_1sejb_88", cf = "_state_1sejb_102", df = "_handle_1sejb_111", uf = "_sub_1sejb_137", B = {
  head: Qw,
  line: Zw,
  cHandle: ef,
  cName: tf,
  nameLine: af,
  cLabel: nf,
  cCap: rf,
  cShown: lf,
  name: of,
  noCap: sf,
  state: cf,
  handle: df,
  sub: uf
}, hf = "can't be hidden or collapsed", mf = "terminal · counted, not a column";
function n2() {
  return /* @__PURE__ */ o("div", { className: B.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ a("span", { className: B.cHandle }),
    /* @__PURE__ */ a("span", { className: B.cName, children: "Stage" }),
    /* @__PURE__ */ a("span", { className: B.cLabel, children: "Column label" }),
    /* @__PURE__ */ a("span", { className: B.cCap, children: "WIP cap" }),
    /* @__PURE__ */ a("span", { className: B.cShown, children: "Shown" })
  ] });
}
function wf(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function ff(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function ja(e) {
  return e.gate ? hf : e.terminal ? mf : ff(e.agentsMounted);
}
function _f(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function vf({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: B.cName, children: [
    /* @__PURE__ */ o("span", { className: B.nameLine, children: [
      /* @__PURE__ */ a("span", { className: B.name, children: e.name }),
      e.gate && /* @__PURE__ */ a(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    ja(e) && /* @__PURE__ */ a("span", { className: B.sub, children: ja(e) })
  ] });
}
function bf(e) {
  return e === void 0 ? "" : String(e);
}
function pf(e) {
  return e === "" ? void 0 : Number(e);
}
function gf({ name: e, onReorder: t }) {
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
      onKeyDown: (r) => !n && _f(r, t),
      children: "⠿"
    }
  ) });
}
function yf({ stage: e, config: t, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ a("span", { className: `${B.cCap} ${B.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ a("span", { className: B.cCap, children: /* @__PURE__ */ a(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: bf(t.cap), onChange: (r) => n({ ...t, cap: pf(r) }) }) });
}
function Nf({ stage: e, config: t, onChange: n }) {
  const r = Ae() !== null, l = wf(e, t.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...t, shown: c });
  return /* @__PURE__ */ o("span", { className: B.cShown, children: [
    /* @__PURE__ */ a(Ue, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ a("span", { className: B.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function kf(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function r2({ stage: e, config: t, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: B.line, "data-kind": kf(e), children: [
    /* @__PURE__ */ a(gf, { name: e.name, onReorder: r }),
    /* @__PURE__ */ a(vf, { stage: e }),
    /* @__PURE__ */ a("span", { className: B.cLabel, children: /* @__PURE__ */ a(M, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (l) => n({ ...t, label: l }) }) }),
    /* @__PURE__ */ a(yf, { stage: e, config: t, onChange: n }),
    /* @__PURE__ */ a(Nf, { stage: e, config: t, onChange: n })
  ] });
}
const $f = "_body_8qsv9_2", Cf = "_head_8qsv9_9", Sf = "_summary_8qsv9_19", Rf = "_block_8qsv9_20", Tf = "_actionsBlock_8qsv9_21", xf = "_title_8qsv9_41", Lf = "_note_8qsv9_46", Af = "_k_8qsv9_51", Ef = "_kv_8qsv9_58", If = "_row_8qsv9_64", Mf = "_label_8qsv9_75", Bf = "_value_8qsv9_84", Pf = "_quote_8qsv9_90", qf = "_actions_8qsv9_21", Of = "_resolve_8qsv9_111", O = {
  body: $f,
  head: Cf,
  summary: Sf,
  block: Rf,
  actionsBlock: Tf,
  title: xf,
  note: Lf,
  k: Af,
  kv: Ef,
  row: If,
  label: Mf,
  value: Bf,
  quote: Pf,
  actions: qf,
  resolve: Of
};
function jf(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Df(e, t) {
  if (!e.run) return [];
  const n = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ a(Le, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Hf(e) {
  const t = ht(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function Ff(e) {
  return (e ?? []).map((t, n) => [t.label, t.value, `fact-${n}`]);
}
function Wf(e, t, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ a(m, { ...Pt(Hf(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", de(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...jf(e),
    ...Ff(n),
    ...Df(e, t)
  ];
}
function zf({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: O.resolve, "aria-label": t, children: [
    /* @__PURE__ */ a("h3", { className: O.k, children: t }),
    e
  ] });
}
function Kf(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function Gf({ item: e, showKey: t }) {
  const n = Kf(e);
  return !t && !n ? null : /* @__PURE__ */ o("div", { className: O.head, children: [
    t && /* @__PURE__ */ a(m, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ a(m, { role: n.role, label: n.label })
  ] });
}
function Uf({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: O.block, children: [
    /* @__PURE__ */ a("p", { className: O.k, children: "What the agent says" }),
    /* @__PURE__ */ a("p", { className: O.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ a("p", { className: O.note, children: e.agentMeta })
  ] }) : null;
}
function l2({ item: e, actions: t, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = N(), w = Wf(e, l, d);
  return /* @__PURE__ */ a(nt, { kind: "drawer", labelledBy: h, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: O.body, children: [
    /* @__PURE__ */ a(Gf, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: O.summary, children: [
      /* @__PURE__ */ a("h2", { className: O.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ a("p", { className: O.note, children: e.summary })
    ] }),
    /* @__PURE__ */ a("dl", { className: O.kv, children: w.map(([f, y, E]) => /* @__PURE__ */ o("div", { className: O.row, children: [
      /* @__PURE__ */ a("dt", { className: O.label, children: f }),
      /* @__PURE__ */ a("dd", { className: O.value, children: y })
    ] }, E ?? f)) }),
    /* @__PURE__ */ a(Uf, { item: e }),
    /* @__PURE__ */ o("div", { className: O.actionsBlock, children: [
      /* @__PURE__ */ a("div", { className: O.actions, children: t }),
      c && /* @__PURE__ */ a("p", { className: O.note, children: c })
    ] }),
    /* @__PURE__ */ a(zf, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Vf = "_root_3azmy_2", Yf = "_list_3azmy_7", Jf = "_item_3azmy_12", Xf = "_box_3azmy_18", Qf = "_text_3azmy_23", Zf = "_note_3azmy_28", Ye = {
  root: Vf,
  list: Yf,
  item: Jf,
  box: Xf,
  text: Qf,
  note: Zf
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
const e_ = "_rail_znbbp_2", t_ = "_k_znbbp_11", a_ = "_head_znbbp_19", n_ = "_section_znbbp_25", r_ = "_card_znbbp_39", l_ = "_strip_znbbp_46", o_ = "_skeleton_znbbp_60", i_ = "_skeletonLabel_znbbp_74", s_ = "_bar_znbbp_80", c_ = "_note_znbbp_89", me = {
  rail: e_,
  k: t_,
  head: a_,
  section: n_,
  card: r_,
  strip: l_,
  skeleton: o_,
  skeletonLabel: i_,
  bar: s_,
  note: c_
};
function d_(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Kt({ title: e, children: t }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ a("h3", { className: me.k, children: e }),
    t
  ] });
}
function u_({ column: e, count: t }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ a("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (n, r) => /* @__PURE__ */ a("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function h_({ draft: e, sample: t, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ a(Iw, { column: l, items: t.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function m_(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ a(h_, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ a(u_, { column: t, count: e.sample.filter((n) => n.stage === t.id).length }, t.id));
}
function o2(e) {
  const t = d_(e.onOpen), n = On(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ a("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ a(Kt, { title: "Card", children: /* @__PURE__ */ a("div", { className: me.card, children: n && /* @__PURE__ */ a(jt, { item: n, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Kt, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ a("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ a(m_, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ a("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ a(Kt, { title: "Effect of this config", children: /* @__PURE__ */ a(Dt, { items: e.effects, density: "compact" }) })
  ] });
}
function w_(e, t) {
  return (n) => {
    e.current = n, t(n);
  };
}
function f_(e) {
  return Math.ceil(e.length / 2);
}
function __(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function jn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function v_(e, t, n, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const l = jn(e);
  l !== void 0 && n(l), r(__(e.type));
}
function b_(e, t, n, r, l) {
  C(() => {
    if (e !== null)
      return e.subscribe(t, (i) => v_(i, n, r, l));
  }, [e, t, n, r, l]);
}
function p_(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function g_(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function y_(e, t) {
  return t !== void 0 ? de(e.timeInStage) + " · waits on " + t.agent : de(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function N_(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + z.height.card + " + " + z.height.cardRow + " * " + String(f_(t ?? [])) + ")"
  };
}
function k_(e, t) {
  return /* @__PURE__ */ a("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function $_(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ a(m, { role: "meta", label: le(e.cost) }) : null;
}
function C_(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ a(m, { role: "meta", label: e.jiraKey }) : null;
}
function S_(e, t, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ a(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: n ?? "live", turn: e.turn });
}
function R_(e, t, n) {
  return t === void 0 ? e.finding ?? "" : n ?? "";
}
function T_(e, t) {
  return t === void 0 ? e : w_(e, t.ref);
}
function x_(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function st(e) {
  return e === !0 ? "true" : void 0;
}
function Dn(e) {
  const t = e.item, n = t.run, r = n !== void 0, l = _(null), i = bt(l), s = _(/* @__PURE__ */ new Set()), [c, d] = p(p_(t));
  b_(e.feed, t.key, s, d, i);
  const u = g_(t, r), h = y_(t, n), w = N_(t, e.fields), f = R_(t, n, c);
  return /* @__PURE__ */ a("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...x_(e),
      className: "ward-workcard",
      "data-flagged": st(t.flagged),
      "data-selected": st(e.selected),
      style: w,
      ref: T_(l, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        k_(t, e.fields),
        /* @__PURE__ */ a("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ a(m, { role: u.role, label: u.label }),
          $_(t, e.fields),
          C_(t, e.fields)
        ] }),
        /* @__PURE__ */ a("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          S_(n, c, e.connection, t.changedAt),
          f !== "" ? /* @__PURE__ */ a("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function L_({ count: e, cap: t }) {
  return /* @__PURE__ */ a("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function A_(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function E_(e, t, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ a("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ a(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ a(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function I_(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ a(L_, { count: e.items.length, cap: e.column.cap });
}
function M_(e, t) {
  return e.roving ?? t;
}
function B_(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function P_(e, t) {
  return e.items.map((n, r) => /* @__PURE__ */ a(
    Dn,
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
function q_(e) {
  const t = N(), n = Et({ orientation: "vertical" }), r = M_(e, n), l = A_(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": st(l), "data-gate": st(e.column.gate), children: [
    E_(e.column, e.items.length, t),
    I_(e, l),
    /* @__PURE__ */ a("ul", { role: "list", className: "ward-boardcol-list", ...B_(e, n), children: P_(e, r) })
  ] });
}
function O_(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + de(e.p50)), e.p90 !== void 0 && (t += " · p90 " + de(e.p90)), t;
}
function j_(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ a(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function D_(e) {
  return e === void 0 ? null : /* @__PURE__ */ a(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function i2(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ a(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ a(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ a("div", { className: "ward-rollup", "aria-live": "polite", children: O_(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      j_(e),
      D_(e.onConfigure),
      /* @__PURE__ */ a(sa, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function H_(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function F_(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ a(Ue, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ a(Ue, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function W_(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(R, { children: [
    t > 0 ? /* @__PURE__ */ a(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ a(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function s2(e) {
  const t = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": st(H_(t)), children: [
    /* @__PURE__ */ a("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ a("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ a("span", { children: F_(e) }),
    /* @__PURE__ */ a(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ a(hn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    W_(t),
    /* @__PURE__ */ a("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ a("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function c2(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ a(Dn, { item: t, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ a(q_, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
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
  const n = jn(e);
  n !== void 0 && t(n);
}
function K_(e, t, n) {
  C(() => {
    if (e != null)
      return e.subscribe(t, (r) => z_(r, n));
  }, [e, t, n]);
}
function G_(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function U_(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", de(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function V_(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ a("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ a(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Y_(e, t) {
  return /* @__PURE__ */ o(R, { children: [
    e.state !== void 0 ? /* @__PURE__ */ a(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ a("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ a("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function d2(e) {
  var s;
  const t = e.item, n = t.run, [r, l] = p((s = t.run) == null ? void 0 : s.lastStep);
  K_(e.feed, t.key, l);
  const i = [...G_(t), ...U_(t)];
  return /* @__PURE__ */ o(nt, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ a("dt", { children: c[0] }),
        /* @__PURE__ */ a("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      V_(n, r)
    ] }),
    Y_(t, e.actions)
  ] });
}
const J_ = "_card_1nkkx_3", X_ = "_head_1nkkx_30", Q_ = "_mark_1nkkx_38", Z_ = "_name_1nkkx_50", ev = "_chips_1nkkx_71", tv = "_description_1nkkx_77", av = "_run_1nkkx_82", nv = "_sep_1nkkx_91", rv = "_facts_1nkkx_97", lv = "_fact_1nkkx_97", ov = "_factLabel_1nkkx_111", iv = "_factValue_1nkkx_115", oe = {
  card: J_,
  head: X_,
  mark: Q_,
  name: Z_,
  chips: ev,
  description: tv,
  run: av,
  sep: nv,
  facts: rv,
  fact: lv,
  factLabel: ov,
  factValue: iv
}, sv = { live: "done", draft: "running", paused: "meta" };
function cv(e) {
  return e === void 0 ? oe.card : `${oe.card} ${e}`;
}
function dv({ versions: e }) {
  return /* @__PURE__ */ a("div", { className: oe.chips, children: e.map((t) => /* @__PURE__ */ a(m, { role: sv[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function uv({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("p", { className: oe.description, children: e });
}
function hv({ run: e, connection: t, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: oe.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ a("span", { className: oe.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ a(Le, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function mv({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ a("dl", { className: oe.facts, children: e.map((t) => /* @__PURE__ */ o("div", { className: oe.fact, children: [
    /* @__PURE__ */ a("dt", { className: oe.factLabel, children: t.label }),
    /* @__PURE__ */ a("dd", { className: oe.factValue, children: t.value })
  ] }, t.label)) });
}
function wv(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function fv({ agent: e, href: t, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: cv(s),
      style: c,
      "data-selected": d,
      "data-paused": wv(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: oe.head, children: [
          /* @__PURE__ */ a("span", { className: oe.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ a("a", { className: `${oe.name} ward-rowlink ward-target`, href: H(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ a(uv, { description: e.description }),
        /* @__PURE__ */ a(hv, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ a(dv, { versions: e.versions }),
        /* @__PURE__ */ a(mv, { facts: i })
      ]
    }
  );
}
const _v = "_list_4dcyc_2", vv = "_row_4dcyc_11", bv = "_head_4dcyc_23", pv = "_id_4dcyc_30", gv = "_lock_4dcyc_35", yv = "_reason_4dcyc_41", Nv = "_remove_4dcyc_46", kv = "_clauses_4dcyc_50", $v = "_clause_4dcyc_50", Cv = "_label_4dcyc_64", Sv = "_cell_4dcyc_71", Rv = "_value_4dcyc_76", se = {
  list: _v,
  row: vv,
  head: bv,
  id: pv,
  lock: gv,
  reason: yv,
  remove: Nv,
  clauses: kv,
  clause: $v,
  label: Cv,
  cell: Sv,
  value: Rv
}, Hn = ye(!1);
function u2({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ a(Hn.Provider, { value: !0, children: /* @__PURE__ */ a("ol", { className: se.list, "aria-label": t, children: e }) });
}
function Tv({ clause: e, ruleId: t, onChange: n }) {
  if (!n) return /* @__PURE__ */ a("span", { className: se.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ a(M, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function xv({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: se.lock, children: [
    /* @__PURE__ */ a(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ a("span", { className: se.reason, children: e })
  ] });
}
function Lv({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ o("span", { className: se.head, children: [
    /* @__PURE__ */ a("span", { className: se.id, children: e.id }),
    e.locked && /* @__PURE__ */ a(xv, { reason: e.lockedReason }),
    t && /* @__PURE__ */ a("span", { className: se.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Da(e, t) {
  return e.locked ? void 0 : t;
}
function h2({ rule: e, onChange: t, onRemove: n }) {
  if (!ge(Hn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Da(e, t);
  return /* @__PURE__ */ o("li", { className: se.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ a(Lv, { rule: e, onRemove: Da(e, n) }),
    /* @__PURE__ */ a("dl", { className: se.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: se.clause, children: [
      /* @__PURE__ */ a("dt", { className: se.label, children: l.label }),
      /* @__PURE__ */ a("dd", { className: se.cell, children: /* @__PURE__ */ a(Tv, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Av = "_ladder_1xdeh_2", Ev = "_cell_1xdeh_7", Iv = "_empty_1xdeh_26", Mv = "_name_1xdeh_34", Bv = "_holder_1xdeh_40", Pv = "_request_1xdeh_46", qv = "_swatches_1xdeh_51", Ov = "_swatch_1xdeh_51", jv = "_tilesFrame_1xdeh_78", Dv = "_tiles_1xdeh_78", Hv = "_tile_1xdeh_78", Fv = "_bar_1xdeh_117", Wv = "_hex_1xdeh_128", zv = "_note_1xdeh_138", A = {
  ladder: Av,
  cell: Ev,
  empty: Iv,
  name: Mv,
  holder: Bv,
  request: Pv,
  swatches: qv,
  swatch: Ov,
  tilesFrame: jv,
  tiles: Dv,
  tile: Hv,
  bar: Fv,
  hex: Wv,
  note: zv
}, m2 = "not validated yet, pending a CVD matrix and dark stepping";
function Kv(e) {
  return e.reserved ? "reserved" : ct(e.step) ? "validated" : "partial";
}
function Fn(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Gv(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Uv({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ a(He, { size: 14, kind: "stream" }) : /* @__PURE__ */ a("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Vv(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function Yv(e, t, n) {
  return {
    "aria-checked": t,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Ha = (e) => String(e).padStart(2, "0");
function Jv(e, t, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : t ?? Fn(e, void 0);
}
function Xv({ step: e, validation: t, note: n }) {
  const r = t === "reserved";
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ a("span", { className: `${A.hex} ward-ladder-hex`, children: r ? `step ${Ha(e)}` : Yr(e) }),
    /* @__PURE__ */ a("span", { className: `${A.note} ward-ladder-note`, children: r ? n : `Step ${Ha(e)} · ${n}` })
  ] });
}
function Qv({ step: e, value: t, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = Kv(e), c = Fn(s, n), d = c !== "free", u = d || i, h = t === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, y = `${w} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...Yv(d, h, u), "data-validation": s, style: Gv(e, s), onClick: f, onKeyDown: (P) => Vv(P, f) }, label: y, name: w, holder: c, validation: s, note: Jv(s, n, h), step: e.step };
}
const Zv = {
  swatches: (e) => /* @__PURE__ */ a("span", { ...e.shared, title: e.label, className: `${A.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ a("span", { ...e.shared, className: `${A.tile} ward-ladder-cell`, children: /* @__PURE__ */ a(Xv, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${A.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ a(Uv, { validation: e.validation }),
    /* @__PURE__ */ a("span", { className: `${A.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ a("span", { className: `${A.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function eb(e) {
  return Zv[e.presentation](Qv(e));
}
function tb(e) {
  for (const t of e)
    if (!t.reserved && !It(t.step)) throw new Error("colour ladder renders token steps only");
}
function ab() {
  return /* @__PURE__ */ o("div", { className: `${A.cell} ward-ladder-cell ${A.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ a("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ a("span", { className: `${A.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ a("span", { className: `${A.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function nb(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const rb = { list: A.ladder, swatches: A.swatches, tiles: A.tilesFrame };
function lb() {
  return /* @__PURE__ */ o("div", { className: `${A.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ a("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ a("span", { className: `${A.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ a("span", { className: `${A.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const ob = { list: ab, swatches: () => null, tiles: lb };
function ib(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Wn(e) {
  const t = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  tb(e.steps);
  const r = nb(e), l = ob[r], i = /* @__PURE__ */ o(R, { children: [
    e.steps.map((s) => /* @__PURE__ */ a(eb, { step: s, value: e.value, taken: t[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ a(l, {})
  ] });
  return /* @__PURE__ */ a("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...ib(e.disabled === !0), className: `${rb[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ a("div", { className: A.tiles, children: i }) : i });
}
const sb = "_rail_s06lm_2", cb = "_section_s06lm_12", db = "_sectionFlush_s06lm_22", ub = "_head_s06lm_26", hb = "_headLabel_s06lm_34", mb = "_sample_s06lm_42", wb = "_sampleLabel_s06lm_47", fb = "_sampleTitle_s06lm_54", _b = "_sampleMeta_s06lm_59", vb = "_trace_s06lm_65", bb = "_traceHead_s06lm_70", pb = "_steps_s06lm_78", gb = "_step_s06lm_78", yb = "_stepTitle_s06lm_97", Nb = "_hollow_s06lm_107", kb = "_stepBody_s06lm_115", $b = "_stepDetail_s06lm_127", Cb = "_publish_s06lm_132", Sb = "_reason_s06lm_138", Rb = "_note_s06lm_143", Tb = "_reveal_s06lm_148", k = {
  rail: sb,
  section: cb,
  sectionFlush: db,
  head: ub,
  headLabel: hb,
  sample: mb,
  sampleLabel: wb,
  sampleTitle: fb,
  sampleMeta: _b,
  trace: vb,
  traceHead: bb,
  steps: pb,
  step: gb,
  stepTitle: yb,
  hollow: Nb,
  stepBody: kb,
  stepDetail: $b,
  publish: Cb,
  reason: Sb,
  note: Rb,
  reveal: Tb
}, Fa = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, xb = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Lb = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Ab = { notSimulated: "not simulated", running: "running" };
function Eb(e) {
  return e.presentation === "foundry";
}
function Ib(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = t.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${t.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Mb(e, t) {
  var r;
  const n = xb[e.status];
  return n !== void 0 ? n : ((r = t.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Bb(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Pb(e, t) {
  if (t.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function qb(e) {
  if (Bb(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Ob(e) {
  const [t, n] = p(!1);
  C(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ a("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function jb(e) {
  const t = Ab[e.kind];
  return t !== void 0 ? /* @__PURE__ */ a("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ a(He, { size: 6, kind: Lb[e.kind], label: e.kind });
}
function Db(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Hb(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ a(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Fb(e) {
  const { step: t } = e;
  return /* @__PURE__ */ o(Ob, { kind: t.kind, children: [
    /* @__PURE__ */ a(jb, { kind: t.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ a("span", { className: k.stepTitle, children: t.title }),
      /* @__PURE__ */ a(Db, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ a(Hb, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function Wb(e, t) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && n.push(de(t)), n.join(" · ");
}
function zn(e) {
  const t = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ a("p", { className: k.traceHead, id: t, children: Wb(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ a("ol", { className: k.steps, "aria-labelledby": t, children: e.steps.map((n, r) => /* @__PURE__ */ a(Fb, { ...e, step: n }, n.title + String(r))) })
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
function Kb(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ue(e.sample.replayedFrom);
  return /* @__PURE__ */ a("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function Gb(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? en(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ a("div", { className: k.sectionFlush, children: /* @__PURE__ */ a(qt, { divided: !0, cells: t }) });
}
function Ub(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: en(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function Vb(e) {
  const t = Ub(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ a("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ a("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ a("div", { className: k.sectionFlush, children: /* @__PURE__ */ a(qt, { divided: !0, cells: t }) });
}
function Kn(e) {
  const t = N();
  return e.reason !== null ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("p", { className: `${k.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ a(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ a(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Yb(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ a(Kn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ a("p", { className: k.note, children: e.note })
  ] });
}
function Jb(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ a("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ a(Kn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Gn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ a("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ a(m, { role: Fa[e.run.status].role, label: Fa[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ a(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Xb(e, t) {
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
function Qb(e) {
  var n;
  Pb(e.run, e.checklist);
  const t = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ a(Gn, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ a(zb, { sample: e.run.sample }),
    /* @__PURE__ */ a(zn, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ a(Gb, { run: e.run }),
    /* @__PURE__ */ a("div", { className: k.section, children: /* @__PURE__ */ a(Dt, { items: e.checklist }) }),
    /* @__PURE__ */ a(Yb, { reason: Ib(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Zb(e) {
  var r;
  const t = Xb(e.run, e.feed);
  qb(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ a(Gn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ a(Kb, { sample: e.run.sample }),
    /* @__PURE__ */ a(zn, { run: e.run, steps: t, connection: n, foundry: !0 }),
    /* @__PURE__ */ a(Vb, { run: e.run }),
    /* @__PURE__ */ a("div", { className: k.section, children: /* @__PURE__ */ a(Dt, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ a(Jb, { reason: Mb(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function w2(e) {
  return Eb(e) ? /* @__PURE__ */ a(Zb, { ...e }) : /* @__PURE__ */ a(Qb, { ...e });
}
const ep = "_list_142ip_3", tp = "_row_142ip_9", ap = "_condition_142ip_18", np = "_action_142ip_24", gt = {
  list: ep,
  row: tp,
  condition: ap,
  action: np
}, Un = ye(!1);
function f2({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ a(Un.Provider, { value: !0, children: /* @__PURE__ */ a("ol", { className: gt.list, "aria-label": t, children: e }) });
}
function _2({ rule: e }) {
  if (!ge(Un)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: gt.row, children: [
    /* @__PURE__ */ a(m, { role: "system", label: "When" }),
    /* @__PURE__ */ a("span", { className: gt.condition, children: e.when }),
    /* @__PURE__ */ a(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ a("span", { className: gt.action, children: e.then })
  ] });
}
const rp = "_move_tmppt_3", lp = {
  move: rp
};
function Qt(e, t, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(t, 1);
  return r.splice(n, 0, l), r;
}
function Vn(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function Yn(e, t, n) {
  return `${e} moved to position ${t + 1} of ${n}.`;
}
function Wa(e, t, n) {
  return e.querySelector(`[data-move="${t}-${n}"]`);
}
function op(e) {
  return e === "up" ? "down" : "up";
}
function ip(e, t) {
  const n = Wa(e, t.id, t.direction) ?? Wa(e, t.id, op(t.direction));
  n == null || n.focus();
}
function Jn() {
  const e = _(null), [t, n] = p(null), [r, l] = p("");
  return C(() => {
    e.current !== null && t !== null && ip(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function Xn({ text: e }) {
  return /* @__PURE__ */ a("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Rt({ id: e, name: t, direction: n, onMove: r }) {
  return /* @__PURE__ */ a("button", { type: "button", className: `${lp.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${t} ${n}`, onClick: r, children: /* @__PURE__ */ a("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const sp = "_body_1jd1i_2", cp = "_title_1jd1i_8", dp = "_section_1jd1i_13", up = "_legend_1jd1i_18", hp = "_stages_1jd1i_26", mp = "_stage_1jd1i_26", wp = "_stageIndex_1jd1i_44", fp = "_stageName_1jd1i_50", _p = "_footer_1jd1i_59", vp = "_note_1jd1i_66", bp = "_reason_1jd1i_71", pp = "_actions_1jd1i_76", gp = "_webHead_1jd1i_83", yp = "_kicker_1jd1i_92", Np = "_webTitle_1jd1i_99", kp = "_webBody_1jd1i_105", $p = "_webSection_1jd1i_109", Cp = "_sectionHead_1jd1i_121", Sp = "_sectionNote_1jd1i_129", Rp = "_formLabel_1jd1i_134", Tp = "_identityRow_1jd1i_139", xp = "_nameCell_1jd1i_145", Lp = "_keyCell_1jd1i_150", Ap = "_colourCell_1jd1i_154", Ep = "_colourStatus_1jd1i_161", Ip = "_webStages_1jd1i_166", Mp = "_webStageList_1jd1i_172", Bp = "_webStage_1jd1i_166", Pp = "_webIndex_1jd1i_191", qp = "_webStageName_1jd1i_196", Op = "_webMoves_1jd1i_201", jp = "_addStage_1jd1i_215", Dp = "_addStageButton_1jd1i_223", Hp = "_addStageNote_1jd1i_231", Fp = "_webFooter_1jd1i_236", Wp = "_webFooterNotes_1jd1i_244", zp = "_webNote_1jd1i_251", v = {
  body: sp,
  title: cp,
  section: dp,
  legend: up,
  stages: hp,
  stage: mp,
  stageIndex: wp,
  stageName: fp,
  footer: _p,
  note: vp,
  reason: bp,
  actions: pp,
  webHead: gp,
  kicker: yp,
  webTitle: Np,
  webBody: kp,
  webSection: $p,
  sectionHead: Cp,
  sectionNote: Sp,
  formLabel: Rp,
  identityRow: Tp,
  nameCell: xp,
  keyCell: Lp,
  colourCell: Ap,
  colourStatus: Ep,
  webStages: Ip,
  webStageList: Mp,
  webStage: Bp,
  webIndex: Pp,
  webStageName: qp,
  webMoves: Op,
  addStage: jp,
  addStageButton: Dp,
  addStageNote: Hp,
  webFooter: Fp,
  webFooterNotes: Wp,
  webNote: zp
}, Kp = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Qn = "not in catalogue";
function Gp(e, t) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? n : [{ value: t, label: `${t || "(unnamed)"} · ${Qn}` }, ...n];
}
function Up({ stage: e, index: t, catalogue: n, onName: r }) {
  const l = `Stage ${t + 1} name`;
  if (!n) return /* @__PURE__ */ a(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Qn}`;
  return /* @__PURE__ */ a(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Gp(n, e.name), invalid: i, onChange: r });
}
function Zn(e, t) {
  return e.name || `stage ${t + 1}`;
}
function Vp(e) {
  const t = _([]), n = _(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${n.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function Yp({ id: e, stage: t, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Zn(t, n), d = t.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ a("span", { className: v.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ a("div", { className: v.webStageName, children: /* @__PURE__ */ a(Up, { stage: t, index: n, catalogue: l, onName: (u) => i({ ...t, name: u }) }) }),
    /* @__PURE__ */ a(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: t.kind, options: Kp, onChange: (u) => i({ ...t, kind: u }) }),
    /* @__PURE__ */ o("span", { className: v.webMoves, children: [
      n > 0 && /* @__PURE__ */ a(Rt, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ a(Rt, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Jp({ stages: e, onChange: t, catalogue: n }) {
  const r = Vp(e.length), l = Jn(), i = (c, d) => {
    const u = Vn(c, d);
    r.current = Qt(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Yn(Zn(e[c], c), u, e.length)), t(Qt(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: v.webStages, children: [
    /* @__PURE__ */ a("ol", { ref: l.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ a(Yp, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ a(Xn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: v.addStage, children: [
      /* @__PURE__ */ a("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ a("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Xp = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Qp = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Zp = "A new stream starts as a draft. Nothing runs on it until you publish it.", eg = "Create is disabled: name the stream and give it a key first.", tg = "reorder with the ↑ ↓ buttons · min 2";
function da(e, t) {
  return !e.reserved && ct(e.step) && t[e.step] === void 0;
}
function ag(e, t) {
  const n = e.find((r) => da(r, t));
  return n ? n.step : 1;
}
function ng({ stages: e, onMove: t }) {
  const n = Jn(), r = (l, i) => {
    const s = Vn(l, i);
    n.moved({ id: e[l].id, direction: i }, Yn(e[l].name, s, e.length)), t(l, s);
  };
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("ol", { ref: n.root, className: v.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: v.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ a("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ a("span", { className: v.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ a(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ a(Rt, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ a(Rt, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ a(Xn, { text: n.announcement })
  ] });
}
function rg({ reason: e, onCreate: t, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: v.footer, children: [
    /* @__PURE__ */ a("p", { className: v.note, children: Zp }),
    e && /* @__PURE__ */ a("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: v.actions, children: [
      /* @__PURE__ */ a(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ a(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ a(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function lg(e, t) {
  return e !== "" && t !== "" ? null : eg;
}
function og(e) {
  const { owners: t, ladder: n, takenBy: r = {}, policies: l = Qp, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [h, w] = p(""), [f, y] = p(""), [E, P] = p(t[0].value), [ae, Ne] = p(() => ag(n, r)), [ne, Ee] = p(e.stages ?? Xp), [Ve, T] = p(l[0].value), U = { name: h, key: f, streamStep: ae, owner: E, stages: ne, policy: Ve }, ke = lg(h, f);
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
      /* @__PURE__ */ a(Wn, { label: "Stream colour", steps: n, value: ae, onChange: Ne, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ a("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ a(ng, { stages: ne, onMove: (Fe, Cr) => Ee(Qt(ne, Fe, Cr)) })
    ] }),
    /* @__PURE__ */ a(En, { legend: "Loop policy", options: l, value: Ve, onChange: T }),
    /* @__PURE__ */ a(rg, { reason: ke, onCreate: () => i(U), onDraft: () => s(U) })
  ] }) });
}
const er = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], ig = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function sg(e, t, n, r, l, i) {
  var c;
  const s = ((c = er.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function cg(e, t) {
  return dg(e) && ug(e, t) && hg(e);
}
function dg(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function ug(e, t) {
  return e.colourStep === null || da({ step: e.colourStep }, t);
}
function hg(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function mg(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : da({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function wg({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ a("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ a("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function fg({ ready: e, draft: t, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: v.webFooter, children: [
    /* @__PURE__ */ o("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ a(wg, { stage: n }),
      !e && /* @__PURE__ */ a("p", { id: i, className: v.reason, children: ig })
    ] }),
    l && /* @__PURE__ */ a(b, { variant: "secondary", onClick: () => l(t), children: "Save draft" }),
    e ? /* @__PURE__ */ a(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ a(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function _g({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: v.webHead, children: [
    /* @__PURE__ */ a("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ a("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function vg({ name: e, setName: t, streamKey: n, setKey: r, colour: l, owner: i }) {
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
function bg(e) {
  const t = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [f, y] = p("relay"), [E, P] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), ae = sg(l, s, d, h, f, E), Ne = cg(ae, r), ne = E.find((T) => T.kind === "agent" && T.name.trim() !== ""), Ee = /* @__PURE__ */ o("div", { className: v.colourCell, children: [
    /* @__PURE__ */ a("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ a(Wn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ve = /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a("p", { className: v.colourStatus, "data-colour-status": "", children: mg(h, r) }),
    /* @__PURE__ */ a(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((T) => ({ value: T, label: T })), onChange: u })
  ] });
  return /* @__PURE__ */ o(nt, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ a(_g, { titleId: n }),
    /* @__PURE__ */ o("div", { className: v.webBody, children: [
      /* @__PURE__ */ a(vg, { name: l, setName: i, streamKey: s, setKey: c, colour: Ee, owner: Ve }),
      /* @__PURE__ */ o("section", { className: v.webSection, children: [
        /* @__PURE__ */ o("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ a("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ a("span", { className: v.sectionNote, children: tg })
        ] }),
        /* @__PURE__ */ a(Jp, { stages: E, onChange: P })
      ] }),
      /* @__PURE__ */ a("section", { className: v.webSection, children: /* @__PURE__ */ a(En, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: er, onChange: y }) }),
      /* @__PURE__ */ a(fg, { ready: Ne, draft: ae, agentStage: ne, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function v2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(bg, { ...e }) : /* @__PURE__ */ a(og, { ...e });
}
const pg = "_row_bs8hc_2", gg = "_cell_bs8hc_6", yg = "_condition_bs8hc_11", Ng = "_action_bs8hc_18", kg = "_contract_bs8hc_24", $g = "_contractCondition_bs8hc_33", Cg = "_contractAction_bs8hc_39", Z = {
  row: pg,
  cell: gg,
  condition: yg,
  action: Ng,
  contract: kg,
  contractCondition: $g,
  contractAction: Cg
}, tr = ["advance", "block", "escalate", "requestReview"], za = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Tt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function ua(e, t, n, r) {
  return n || !t ? /* @__PURE__ */ a("span", { className: Z.action, children: za[e.then] }) : /* @__PURE__ */ a(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => t({ ...e, then: l }),
      options: tr.map((l) => ({ value: l, label: za[l] }))
    }
  );
}
function Sg({ rule: e, onChange: t, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ a("td", { className: Z.cell, children: /* @__PURE__ */ a(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ a("td", { className: Z.cell, children: /* @__PURE__ */ a("span", { className: Z.condition, title: Tt(e, r), children: Tt(e, r) }) }),
    /* @__PURE__ */ a("td", { className: Z.cell, children: /* @__PURE__ */ a(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ a("td", { className: Z.cell, children: ua(e, t, n) })
  ] });
}
function Rg({ rule: e, onChange: t, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ o("td", { className: Z.cell, children: [
      /* @__PURE__ */ a(m, { role: "system", label: "When" }),
      /* @__PURE__ */ a("span", { className: Z.condition, children: Tt(e, r) })
    ] }),
    /* @__PURE__ */ a("td", { className: Z.cell, children: ua(e, t, n) })
  ] });
}
function Tg({ rule: e, onChange: t, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Z.contract, children: [
    /* @__PURE__ */ a(m, { role: "system", label: "When" }),
    /* @__PURE__ */ a("span", { className: Z.contractCondition, children: Tt(e, r) }),
    /* @__PURE__ */ a(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ a("span", { className: Z.contractAction, children: ua(e, t, n, !0) })
  ] });
}
const xg = { two: Rg, four: Sg, contract: Tg };
function b2(e) {
  var n;
  if (!tr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = xg[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ a(t, { ...e });
}
const Lg = "_column_g1uat_2", Ag = "_head_g1uat_17", Eg = "_index_g1uat_23", Ig = "_name_g1uat_29", Mg = "_meta_g1uat_38", Bg = "_mono_g1uat_43", Pg = "_gate_g1uat_50", qg = "_reviewersLabel_g1uat_57", Og = "_reviewers_g1uat_57", jg = "_reviewer_g1uat_57", Dg = "_agents_g1uat_74", Hg = "_workflowColumn_g1uat_79", Fg = "_workflowHead_g1uat_96", Wg = "_stageRow_g1uat_102", zg = "_stageLabel_g1uat_109", Kg = "_workflowTitle_g1uat_116", Gg = "_workflowMeta_g1uat_122", Ug = "_workflowGate_g1uat_127", Vg = "_gateNote_g1uat_135", Yg = "_cardNote_g1uat_140", Jg = "_reviewerList_g1uat_145", Xg = "_reviewerRow_g1uat_151", Qg = "_reviewerMark_g1uat_157", Zg = "_reviewerName_g1uat_167", ey = "_terminalCard_g1uat_173", ty = "_terminalCount_g1uat_182", ay = "_workflowAgents_g1uat_188", ny = "_mount_g1uat_194", S = {
  column: Lg,
  head: Ag,
  index: Eg,
  name: Ig,
  meta: Mg,
  mono: Bg,
  gate: Pg,
  reviewersLabel: qg,
  reviewers: Og,
  reviewer: jg,
  agents: Dg,
  workflowColumn: Hg,
  workflowHead: Fg,
  stageRow: Wg,
  stageLabel: zg,
  workflowTitle: Kg,
  workflowMeta: Gg,
  workflowGate: Ug,
  gateNote: Vg,
  cardNote: Yg,
  reviewerList: Jg,
  reviewerRow: Xg,
  reviewerMark: Qg,
  reviewerName: Zg,
  terminalCard: ey,
  terminalCount: ty,
  workflowAgents: ay,
  mount: ny
}, ry = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function ha(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function ar(e) {
  return `${Math.round(e * 100)}%`;
}
function ly({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: S.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ a("p", { className: S.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ a("ul", { className: S.reviewers, children: t.map((n) => /* @__PURE__ */ a("li", { className: S.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ a(qt, { cells: [
      { value: ar(e.gateShare), label: "Gate share" },
      { value: te(e.count), label: "In stage" }
    ] })
  ] });
}
function oy({ stage: e }) {
  return /* @__PURE__ */ a(qt, { cells: [
    { value: te(e.count), label: "In stage" },
    { value: ha(e.closedThisWeek, te), label: "Closed this week" }
  ] });
}
function iy({ stage: e, titleId: t }) {
  return /* @__PURE__ */ o("header", { className: S.head, children: [
    /* @__PURE__ */ a("span", { className: S.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ a("h3", { className: S.name, id: t, children: e.name }),
    /* @__PURE__ */ a(m, { role: e.kind === "gate" ? "gate" : "soft", label: ry[e.kind] })
  ] });
}
function sy({ stage: e }) {
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
function cy({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ a(ly, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ a(oy, { stage: e }) : null;
}
function dy({ onMount: e }) {
  return e ? /* @__PURE__ */ a(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function uy({ stage: e, agents: t = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: S.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ a(iy, { stage: e, titleId: l }),
    /* @__PURE__ */ a(sy, { stage: e }),
    /* @__PURE__ */ a(cy, { stage: e }),
    /* @__PURE__ */ a("div", { className: S.agents, children: t.map((s) => /* @__PURE__ */ a(fv, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ a(dy, { onMount: n })
  ] });
}
const hy = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function my({ reviewers: e }) {
  return /* @__PURE__ */ a("ul", { className: S.reviewerList, children: e.map((t, n) => /* @__PURE__ */ o("li", { className: S.reviewerRow, children: [
    /* @__PURE__ */ a("span", { className: S.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ a("span", { className: S.reviewerName, children: t.name })
  ] }, `${n}-${t.name}`)) });
}
function wy({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: S.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: S.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ a(my, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: S.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ a("span", { children: ar(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function fy(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function _y({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: S.terminalCard, children: [
    /* @__PURE__ */ a("span", { className: S.terminalCount, children: ha(e.closedThisWeek) }),
    /* @__PURE__ */ a("span", { className: S.cardNote, children: fy(e.rolledBackThisWeek) })
  ] });
}
function vy(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function by(e) {
  if (e.kind === "terminal") return `${ha(e.closedThisWeek)} this week`;
  const t = vy(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function py({ stage: e, titleId: t }) {
  const n = hy[e.kind];
  return /* @__PURE__ */ o("header", { className: S.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: S.stageRow, children: [
      /* @__PURE__ */ o("span", { className: S.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ a(m, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ a("h3", { id: t, className: S.workflowTitle, children: e.name }),
    /* @__PURE__ */ a("span", { className: S.workflowMeta, children: by(e) })
  ] });
}
function gy(e) {
  return e === "entry" || e === "agent";
}
function yy({ stage: e, onMount: t }) {
  return t === void 0 || !gy(e.kind) ? null : /* @__PURE__ */ a(b, { variant: "secondary", size: "sm", className: S.mount, onClick: () => t(e.index), children: "+ Mount agent" });
}
function Ny({ stage: e, agentCards: t, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: S.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ a(py, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ a(wy, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ a(_y, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ a("div", { className: S.workflowAgents, children: t }),
    /* @__PURE__ */ a(yy, { stage: e, onMount: n })
  ] });
}
function ky(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function p2(e) {
  return ky(e) ? /* @__PURE__ */ a(Ny, { ...e }) : /* @__PURE__ */ a(uy, { ...e });
}
const $y = "_row_1tdra_6", Cy = "_name_1tdra_12", Sy = "_compactRow_1tdra_13", Ry = "_compactName_1tdra_13", Ty = "_cell_1tdra_30", xy = "_chain_1tdra_45", Ly = "_owner_1tdra_51", Ay = "_mono_1tdra_57", Ey = "_compactCell_1tdra_79", Iy = "_stack_1tdra_96", My = "_stat_1tdra_103", By = "_identityLine_1tdra_110", Py = "_identity_1tdra_110", qy = "_ownerLine_1tdra_140", Oy = "_link_1tdra_160", jy = "_gateMark_1tdra_166", Dy = "_emptyChain_1tdra_171", Hy = "_arrow_1tdra_177", Fy = "_muted_1tdra_182", Wy = "_define_1tdra_187", zy = "_statValue_1tdra_194", Ky = "_policyId_1tdra_200", Gy = "_sub_1tdra_205", g = {
  row: $y,
  name: Cy,
  compactRow: Sy,
  compactName: Ry,
  cell: Ty,
  chain: xy,
  owner: Ly,
  mono: Ay,
  compactCell: Ey,
  stack: Iy,
  stat: My,
  identityLine: By,
  identity: Py,
  ownerLine: qy,
  link: Oy,
  gateMark: jy,
  emptyChain: Dy,
  arrow: Hy,
  muted: Fy,
  define: Wy,
  statValue: zy,
  policyId: Ky,
  sub: Gy
};
function nr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function Uy(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function Vy(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function rr(e) {
  return `${te(e)} ${e === 1 ? "member" : "members"}`;
}
function Yy(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${rr(e.members)}`;
}
function Jy(e, t) {
  const n = e.draft === !0;
  return /* @__PURE__ */ a("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ a("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ a("a", { className: `${g.compactName} ward-rowlink ward-target`, href: H(t), "data-draft": n, children: e.name }),
      /* @__PURE__ */ a(m, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ a("span", { className: g.ownerLine, children: Yy(e) })
  ] }) });
}
function lr({ name: e, gate: t, look: n, size: r }) {
  return /* @__PURE__ */ o(R, { children: [
    t ? /* @__PURE__ */ a("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ a(m, { ...n, size: r, label: e }),
    t ? /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Xy(e, t, n) {
  if (e !== t) return { role: "soft" };
  const r = ht(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function Qy({ stages: e, streamStep: t }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ a("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ a(lr, { name: l.name, gate: l.gate === !0, look: Xy(i, n, t), size: "tag" }),
    i === r ? null : /* @__PURE__ */ a("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function Zy(e) {
  return /* @__PURE__ */ a("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ a("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ a("span", { className: g.define, children: "Define workflow" })
  ] }) : Qy(e) });
}
function or(e) {
  return e === void 0 ? void 0 : !0;
}
function Ka(e, t, n, r) {
  return /* @__PURE__ */ a("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ a("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ a("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": or(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ a("span", { className: g.sub, children: t })
  ] }) });
}
function eN(e) {
  return /* @__PURE__ */ a("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ a("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ a("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ a("span", { className: g.sub, children: e.summary })
  ] }) });
}
function tN(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function aN({ stream: e, href: t, presentation: n }) {
  const r = Vy(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: nr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    Jy(e, t),
    Zy(e),
    Ka(tN(e.agents), e.agents === void 0 ? void 0 : Uy(e.agents), "—"),
    eN(e.policy),
    Ka(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function nN(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function g2(e) {
  if (nN(e)) return aN(e);
  const { stream: t, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: nr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ a("a", { className: `${g.name} ward-target`, href: H(n), children: t.name }),
      /* @__PURE__ */ a(m, { ...Pt(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ a(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ a("td", { className: g.cell, children: /* @__PURE__ */ a("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ a("span", { className: g.link, children: /* @__PURE__ */ a(lr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ a("span", { className: g.mono, children: rr(t.members) })
    ] }),
    /* @__PURE__ */ a("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ a("span", { className: g.mono, title: t.inFlightHint, "data-raised": or(t.inFlightHint), children: te(t.inFlight) }) }),
    /* @__PURE__ */ a("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ a("span", { className: g.mono, children: t.p50 === void 0 ? "" : de(t.p50) }) })
  ] });
}
const rN = "_row_2u4ll_2", lN = "_name_2u4ll_16", oN = "_scope_2u4ll_24", xt = {
  row: rN,
  name: lN,
  scope: oN
};
function ma(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function iN(e) {
  return e === void 0 ? `${xt.row} ward-toolrow` : `${xt.row} ward-toolrow ${e}`;
}
function sN(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function cN({ id: e, reasonId: t, tool: n, state: r, onChange: l }) {
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
function dN({ classification: e }) {
  return /* @__PURE__ */ a(m, { role: e === "write" ? "write" : "meta", label: ma(e) });
}
function uN({ tool: e, state: t, reasonId: n }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ a("span", { id: t.locked ? n : void 0, className: `${xt.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function hN(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function y2({ tool: e, onChange: t, presentation: n }) {
  const r = N(), l = N(), i = sN(e, n), s = hN(n);
  return /* @__PURE__ */ o(s, { className: iN(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ a(cN, { id: r, reasonId: l, tool: e, state: i, onChange: t }),
    /* @__PURE__ */ a("label", { htmlFor: r, className: `${xt.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ a(uN, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ a(dN, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ a(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const mN = "_strip_4ppv9_2", wN = "_well_4ppv9_11", fN = "_head_4ppv9_18", _N = "_name_4ppv9_24", vN = "_chart_4ppv9_32", bN = "_segment_4ppv9_38", pN = "_detailedChart_4ppv9_44", gN = "_rail_4ppv9_57", yN = "_section_4ppv9_63", NN = "_label_4ppv9_74", kN = "_note_4ppv9_91", G = {
  strip: mN,
  well: wN,
  head: fN,
  name: _N,
  chart: vN,
  segment: bN,
  detailedChart: pN,
  rail: gN,
  section: yN,
  label: NN,
  note: kN
}, $N = "No item in flight to preview.", CN = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", SN = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Zt = [1, 2, 3, 4, 5, 6], Lt = 100;
function RN(e, t) {
  return t.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function TN({ draft: e, streams: t }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ a("svg", { className: G.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Zt.map((r, l) => /* @__PURE__ */ a(
    "rect",
    {
      className: G.segment,
      x: l * Lt,
      y: "0",
      width: Lt,
      height: "8",
      fill: RN(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function xN(e) {
  const t = e.slice(0, Zt.length);
  for (; t.length < Zt.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function LN({ identities: e }) {
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
function ir(e) {
  return (t) => e == null ? void 0 : e(t);
}
function _t({ label: e, children: t }) {
  const n = N();
  return /* @__PURE__ */ o("section", { className: G.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ a("h4", { id: n, className: G.label, children: e }),
    t
  ] });
}
function AN({ sample: e, sampleEmpty: t, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ a("p", { className: G.note, children: t ?? $N }) : /* @__PURE__ */ a("div", { className: G.well, children: /* @__PURE__ */ a(jt, { item: { ...e, streamStep: ht(n.streamStep) }, onOpen: ir(r), feed: null }) });
}
function EN({ draft: e }) {
  const t = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: G.head, style: t, children: [
    /* @__PURE__ */ a(He, { size: 8, kind: "stream" }),
    /* @__PURE__ */ a("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ a(m, { ...Pt(e.key, e.streamStep) })
  ] });
}
function IN(e) {
  const t = xN(e.identities ?? [e.draft, ...e.streams]), n = t[0];
  return /* @__PURE__ */ o("div", { className: G.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ a(_t, { label: "Board card", children: /* @__PURE__ */ a(AN, { ...e, draft: n }) }),
    /* @__PURE__ */ a(_t, { label: "Streams index row", children: /* @__PURE__ */ a(EN, { draft: n }) }),
    /* @__PURE__ */ o(_t, { label: "Overview chart segment", children: [
      /* @__PURE__ */ a(LN, { identities: t }),
      /* @__PURE__ */ a("p", { className: G.note, children: CN })
    ] }),
    /* @__PURE__ */ a(_t, { label: "Not themeable", children: /* @__PURE__ */ a("p", { className: G.note, children: SN }) })
  ] });
}
function MN({ draft: e, sample: t, streams: n, onOpen: r }) {
  const l = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: G.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: G.head, children: [
      /* @__PURE__ */ a(He, { size: 8, kind: "stream" }),
      /* @__PURE__ */ a("span", { className: G.name, children: e.name }),
      /* @__PURE__ */ a(m, { ...Pt(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ a("div", { className: G.well, children: /* @__PURE__ */ a(jt, { item: { ...t, streamStep: e.streamStep }, onOpen: ir(r) }) }),
    /* @__PURE__ */ a(TN, { draft: e, streams: n })
  ] });
}
function N2(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ a(IN, { ...e }) : /* @__PURE__ */ a(MN, { ...e });
}
const BN = "_row_ixlg5_6", PN = "_headCell_ixlg5_10", qN = "_cell_ixlg5_11", ON = "_name_ixlg5_23", jN = "_consequence_ixlg5_29", DN = "_governed_ixlg5_36", HN = "_control_ixlg5_42", FN = "_byRole_ixlg5_48", WN = "_webControl_ixlg5_59", zN = "_webConsequence_ixlg5_65", KN = "_webGoverned_ixlg5_71", D = {
  row: BN,
  headCell: PN,
  cell: qN,
  name: ON,
  consequence: jN,
  governed: DN,
  control: HN,
  byRole: FN,
  webControl: WN,
  webConsequence: zN,
  webGoverned: KN
};
function GN({
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
function UN({ capability: e, cells: t, onChange: n }) {
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
    t.map((r) => /* @__PURE__ */ a("td", { className: D.cell, children: /* @__PURE__ */ a(GN, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function VN(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function YN({ name: e, cell: t, onChange: n }) {
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
function JN({ capability: e, cells: t, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ a("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ a("p", { className: `${D.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ a("td", { className: D.cell, children: /* @__PURE__ */ a(YN, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ a("td", { className: D.cell, children: /* @__PURE__ */ a("span", { className: `${D.webGoverned} ward-cellmeta`, children: VN(e) }) })
  ] });
}
function k2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(JN, { ...e }) : /* @__PURE__ */ a(UN, { ...e });
}
const XN = "_row_vv64h_2", QN = "_cell_vv64h_6", ZN = "_name_vv64h_25", e1 = "_note_vv64h_30", t1 = "_webName_vv64h_41", a1 = "_webMeta_vv64h_47", Y = {
  row: XN,
  cell: QN,
  name: ZN,
  note: e1,
  webName: t1,
  webMeta: a1
}, sr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function n1(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function r1({ component: e, onRestart: t }) {
  const n = N(), r = sr[e.state], l = e.state === "drainFirst";
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
function l1({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ a(b, { size: "sm", onClick: () => t(e.name), children: n1(e.state) });
}
function o1({ component: e, onRestart: t }) {
  return /* @__PURE__ */ o("tr", { className: Y.row, children: [
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a("span", { className: `${Y.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a("span", { className: `${Y.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a(m, { ...sr[e.state] }) }),
    /* @__PURE__ */ a("td", { className: Y.cell, children: /* @__PURE__ */ a(l1, { component: e, onRestart: t }) })
  ] });
}
function $2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(o1, { ...e }) : /* @__PURE__ */ a(r1, { ...e });
}
const i1 = "_row_jcm5k_7", s1 = "_cell_jcm5k_11", c1 = "_next_jcm5k_28", d1 = "_headCell_jcm5k_38", u1 = "_webId_jcm5k_77", h1 = "_webPurpose_jcm5k_83", m1 = "_webMeta_jcm5k_91", w1 = "_webUrgent_jcm5k_97", F = {
  row: i1,
  cell: s1,
  next: c1,
  headCell: d1,
  webId: u1,
  webPurpose: h1,
  webMeta: m1,
  webUrgent: w1
}, f1 = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, _1 = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, cr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], v1 = Object.fromEntries(cr.map((e) => [e.key, e]));
function Je({ column: e, children: t }) {
  const n = v1[e];
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
function C2() {
  return /* @__PURE__ */ a("tr", { children: cr.map((e) => /* @__PURE__ */ a(
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
function b1({ cred: e }) {
  const t = f1[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ a(Je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ a(Je, { column: "id", children: e.id }),
    /* @__PURE__ */ a(Je, { column: "state", children: /* @__PURE__ */ a(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ a(Je, { column: "cls", children: /* @__PURE__ */ a(m, { role: e.cls === "write" ? "write" : "meta", label: ma(e.cls) }) }),
    /* @__PURE__ */ a(Je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ a(Je, { column: "next", children: /* @__PURE__ */ a("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function p1({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ a("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ a("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function g1({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a(p1, { cred: e }) }),
    /* @__PURE__ */ a("td", { className: F.cell, children: /* @__PURE__ */ a(m, { ..._1[e.state] }) })
  ] });
}
function S2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(g1, { ...e }) : /* @__PURE__ */ a(b1, { ...e });
}
const y1 = "_card_lpp45_2", N1 = "_head_lpp45_11", k1 = "_env_lpp45_18", $1 = "_version_lpp45_25", C1 = "_meta_lpp45_32", S1 = "_webCard_lpp45_37", R1 = "_webRow_lpp45_47", T1 = "_webTitle_lpp45_55", x1 = "_webLine_lpp45_65", L1 = "_webVersion_lpp45_72", A1 = "_webMeta_lpp45_77", V = {
  card: y1,
  head: N1,
  env: k1,
  version: $1,
  meta: C1,
  webCard: S1,
  webRow: R1,
  webTitle: T1,
  webLine: x1,
  webVersion: L1,
  webMeta: A1
}, Ga = { dev: "Dev", uat: "UAT", prod: "Prod" }, dr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function E1({ env: e }) {
  const t = dr[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
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
function I1(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ue(e.deployedAt), t, e.ticket].filter((n) => n !== null).join(" · ");
}
function M1(e) {
  return /* @__PURE__ */ o("article", { className: `${V.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${V.webRow} ward-envrow`, children: [
      /* @__PURE__ */ a("span", { className: `${V.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ a(m, { ...dr[e.state] })
    ] }),
    /* @__PURE__ */ a("span", { className: `${V.version} ${V.webVersion} ${V.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ a("span", { className: `${V.meta} ${V.webMeta} ${V.webLine} ward-cellmeta`, children: I1(e) })
  ] });
}
function R2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(M1, { ...e }) : /* @__PURE__ */ a(E1, { ...e });
}
const B1 = "_panel_1hmja_2", P1 = "_line_1hmja_8", q1 = "_actions_1hmja_14", vt = {
  panel: B1,
  line: P1,
  actions: q1
};
function T2(e) {
  return /* @__PURE__ */ o("div", { className: vt.panel, children: [
    /* @__PURE__ */ a("p", { className: vt.line, children: e.status }),
    /* @__PURE__ */ a(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ a("div", { className: vt.actions, children: e.actions }),
    /* @__PURE__ */ a("p", { role: "status", className: vt.line, children: e.note ?? "" })
  ] });
}
const O1 = "_upload_13fcl_2", j1 = "_preview_13fcl_7", D1 = "_mark_13fcl_17", H1 = "_empty_13fcl_22", F1 = "_actions_13fcl_28", W1 = "_input_13fcl_33", z1 = "_reasons_13fcl_41", K1 = "_reason_13fcl_41", G1 = "_accepted_13fcl_57", re = {
  upload: O1,
  preview: j1,
  mark: D1,
  empty: H1,
  actions: F1,
  input: W1,
  reasons: z1,
  reason: K1,
  accepted: G1
}, ur = 1.5, hr = 22, At = "script elements or event handlers", Pe = "links or external references", xe = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${ur}px at ${hr}px`], U1 = [xe[1], xe[2], At, Pe], V1 = /* @__PURE__ */ new Map([
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
]), Y1 = "http://www.w3.org/2000/svg", J1 = "http://www.w3.org/2000/xmlns/", X1 = /* @__PURE__ */ new Set([
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
]), Q1 = /* @__PURE__ */ new Set([
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
]), wa = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, Z1 = /url\s*\(|['"\\]/i;
function ek() {
  return { ok: !1, reasons: [xe[1]] };
}
function mr(e) {
  return e.namespaceURI === Y1;
}
function tk(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && mr(t) ? t : null;
  } catch {
    return null;
  }
}
function ak(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [xe[0]] : [];
}
function nk(e) {
  return V1.get(e.localName) ?? (e.localName.startsWith("animate") ? Pe : void 0);
}
function rk(e) {
  return Z1.test(e.replace(wa, ""));
}
function lk(e) {
  return /^on/i.test(e.localName) ? At : e.localName === "href" || rk(e.value) ? Pe : void 0;
}
function ok(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(nk(n));
    for (const r of Array.from(n.attributes)) t.add(lk(r));
  }
  return U1.filter((n) => t.has(n));
}
function ik(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...t.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? hr / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < ur;
  }) ? [xe[3]] : [];
}
function sk(e) {
  if (e.namespaceURI === J1) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (Q1.has(t) || t.startsWith("stroke"));
}
function ck(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && mr(t) && X1.has(t.localName);
}
function dk(e, t) {
  ck(t) ? t.nodeType === Node.ELEMENT_NODE && wr(t) : e.removeChild(t);
}
function wr(e) {
  for (const t of Array.from(e.attributes)) sk(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) dk(e, t);
  return e;
}
function uk(e) {
  return Array.from(e.matchAll(wa), (t) => t[2]).filter((t) => t !== "");
}
function hk(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n += 1) t = Math.imul(t ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function mk(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of uk(l.value)) n.has(i) || n.set(i, `${t}-${n.size}`);
  return n;
}
function wk(e, t) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(wa, (r, l, i) => {
      const s = t.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function fk(e, t) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = mk(n, t);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), wk(l, r);
  }
  return e;
}
function x2(e) {
  const t = tk(e);
  if (t === null) return ek();
  const n = [...ak(t), ...ok(t), ...ik(t)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(fk(wr(t), hk(e))) };
}
const _k = "Mark accepted.", vk = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, bk = new Set(an.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function pk(e) {
  return e !== void 0 && (vk.test(e) || bk.has(e)) ? e : void 0;
}
function gk({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ a("div", { className: re.preview, style: { "--mark": pk(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ a("img", { className: re.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ a("span", { className: re.empty }) });
}
function yk(e, t) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[n];
}
function Nk(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function kk({ result: e }) {
  return e === null ? /* @__PURE__ */ a("div", { className: re.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ a("div", { className: re.result, role: "status", children: /* @__PURE__ */ a("p", { className: re.accepted, children: _k }) }) : /* @__PURE__ */ a("div", { className: re.result, role: "status", children: /* @__PURE__ */ a("ul", { className: re.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ a("li", { className: re.reason, children: t }, t)) }) });
}
function $k({ result: e, presentation: t }) {
  const n = t == null ? void 0 : t.status;
  return n === void 0 ? /* @__PURE__ */ a(kk, { result: e }) : /* @__PURE__ */ a("p", { className: `${re.result} ${yk(e, n)}`, role: "status", children: Nk(e, n) });
}
function Ua(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function L2({ current: e, onUpload: t, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = _(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ o("div", { className: re.upload, children: [
    /* @__PURE__ */ a(gk, { current: e }),
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
    /* @__PURE__ */ a($k, { result: s, presentation: r })
  ] });
}
const Ck = "_row_o3t6y_7", Sk = "_cell_o3t6y_11", Rk = "_head_o3t6y_28", Tk = "_name_o3t6y_34", xk = "_pinned_o3t6y_42", Lk = "_headCell_o3t6y_49", Ak = "_webName_o3t6y_88", Ek = "_webMeta_o3t6y_95", Ik = "_webWarn_o3t6y_103", q = {
  row: Ck,
  cell: Sk,
  head: Rk,
  name: Tk,
  pinned: xk,
  headCell: Lk,
  webName: Ak,
  webMeta: Ek,
  webWarn: Ik
}, fa = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, fr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Mk = Object.fromEntries(fr.map((e) => [e.key, e]));
function Bk(e, t) {
  return `mcp.${e}.${t}`;
}
function Pk(e) {
  return Object.keys(fa).includes(e);
}
function qk(e) {
  return fa[e !== void 0 && Pk(e) ? e : "unknown"];
}
function rt({ column: e, children: t }) {
  const n = Mk[e];
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
function A2() {
  return /* @__PURE__ */ a("tr", { children: fr.map((e) => /* @__PURE__ */ a(
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
function Ok({ server: e }) {
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
    /* @__PURE__ */ a(rt, { column: "tools", children: e.tools.map((n) => Bk(e.name, n)).join(" · ") })
  ] });
}
function jk(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Dk(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function Hk({ pinned: e }) {
  return e === null ? /* @__PURE__ */ a("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ a("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Fk({ server: e, onRestart: t }) {
  var n;
  return t === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ a("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ a(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function Wk({ name: e, pinned: t, onPin: n }) {
  return t !== null || n === void 0 ? null : /* @__PURE__ */ a(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function zk({ server: e, onRestart: t, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ a("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ a("span", { className: `${q.webMeta} ward-cellmeta`, children: jk(e) })
    ] }),
    /* @__PURE__ */ a("td", { className: q.cell, children: /* @__PURE__ */ a("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ a("td", { className: q.cell, children: /* @__PURE__ */ a(m, { ...Dk(e) }) }),
    /* @__PURE__ */ a("td", { className: q.cell, children: /* @__PURE__ */ a(Hk, { pinned: r }) }),
    /* @__PURE__ */ a("td", { className: q.cell, children: /* @__PURE__ */ a(m, { ...qk(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ a(Fk, { server: e, onRestart: t }),
      /* @__PURE__ */ a(Wk, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function E2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(zk, { ...e }) : /* @__PURE__ */ a(Ok, { ...e });
}
const Kk = "_row_1ibo7_2", Gk = "_headCell_1ibo7_14", Uk = "_cell_1ibo7_15", Vk = "_name_1ibo7_26", Yk = "_consequence_1ibo7_32", Jk = "_reason_1ibo7_38", Xk = "_value_1ibo7_44", Qk = "_webRow_1ibo7_60", Zk = "_webSetting_1ibo7_73", e$ = "_webName_1ibo7_81", t$ = "_webConsequence_1ibo7_89", a$ = "_webControl_1ibo7_95", n$ = "_webState_1ibo7_109", r$ = "_webChip_1ibo7_114", I = {
  row: Kk,
  headCell: Gk,
  cell: Uk,
  name: Vk,
  consequence: Yk,
  reason: Jk,
  value: Xk,
  webRow: Qk,
  webSetting: Zk,
  webName: e$,
  webConsequence: t$,
  webControl: a$,
  webState: n$,
  webChip: r$
}, _r = 104, vr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function l$({ control: e, name: t, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ a(Ue, { label: t, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ a(Ln, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ a("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function o$({ setting: e, control: t, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = vr[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ a("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ a("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ a("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ a("td", { className: I.cell, children: /* @__PURE__ */ a(l$, { control: t, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ a("td", { className: I.cell, style: { width: _r }, children: /* @__PURE__ */ a(m, { role: i.role, label: i.label }) })
  ] });
}
function br(e, t) {
  return String(e ?? t);
}
function i$(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function s$(e) {
  var n;
  const t = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? br(e.value, "—");
}
function c$({ control: e, name: t, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ a(Ue, { label: t, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ a("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function d$(e) {
  const { control: t, locked: n, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ a(c$, { ...e });
  const l = i$(t, n);
  return l !== void 0 ? /* @__PURE__ */ a("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ a(Ln, { options: l, value: br(t.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ a("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: s$(t) });
}
function u$({ setting: e, control: t, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ a("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ a("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ a(d$, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ a("span", { className: `${I.webChip} ward-policy-chip`, style: { width: _r }, children: /* @__PURE__ */ a(m, { ...vr[n], size: "tag" }) })
  ] });
}
function I2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(u$, { ...e }) : /* @__PURE__ */ a(o$, { ...e });
}
const h$ = "_label_h9m4w_7", m$ = "_name_h9m4w_15", w$ = "_column_h9m4w_24", f$ = "_webFrame_h9m4w_57", _$ = "_webHead_h9m4w_62", v$ = "_webHeadLabel_h9m4w_74", b$ = "_webLabel_h9m4w_117", p$ = "_webColumns_h9m4w_124", g$ = "_webGroup_h9m4w_130", y$ = "_webPeople_h9m4w_131", N$ = "_webVia_h9m4w_132", k$ = "_webMeta_h9m4w_161", W = {
  label: h$,
  name: m$,
  column: w$,
  webFrame: f$,
  webHead: _$,
  webHeadLabel: v$,
  webLabel: b$,
  webColumns: p$,
  webGroup: g$,
  webPeople: y$,
  webVia: N$,
  webMeta: k$
}, $$ = {
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
      className: W.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: t
    }
  );
}
function C$(e) {
  if (!e.matrixRole) return;
  const t = $$[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function S$({ node: e }) {
  const t = C$(e);
  return /* @__PURE__ */ o("span", { className: W.label, children: [
    /* @__PURE__ */ a("span", { className: W.name, children: e.name }),
    /* @__PURE__ */ a(R$, { role: t, node: e }),
    /* @__PURE__ */ a(Ut, { column: Gt[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ a(Ut, { column: Gt[1], children: e.people === void 0 ? "" : te(e.people) }),
    /* @__PURE__ */ a(Ut, { column: Gt[2], children: e.requestedVia ?? "" })
  ] });
}
function R$({ role: e, node: t }) {
  return /* @__PURE__ */ o(R, { children: [
    e && /* @__PURE__ */ a(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ a(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ a(m, { role: "warn", label: "Unresolved" })
  ] });
}
function T$({ index: e, depth: t, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ a(
    qn,
    {
      index: e,
      depth: t,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ a(S$, { node: n }),
      children: s
    }
  );
}
function Vt({ className: e, text: t }) {
  return /* @__PURE__ */ a("span", { className: e, title: t, children: t });
}
function x$({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${W.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ a(Vt, { className: `${W.webMeta} ${W.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ a(Vt, { className: `${W.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ a(Vt, { className: `${W.webMeta} ${W.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function L$() {
  return /* @__PURE__ */ o("div", { className: W.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ a("span", { className: W.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: W.webColumns, children: [
      /* @__PURE__ */ a("span", { className: W.webGroup, children: "AD group" }),
      /* @__PURE__ */ a("span", { className: W.webPeople, children: "People" }),
      /* @__PURE__ */ a("span", { className: W.webVia, children: "Requested via" })
    ] })
  ] });
}
function A$({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${W.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ a("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ a(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ a(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function E$(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function I$({ rows: e, label: t }) {
  return /* @__PURE__ */ o("div", { className: W.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ a(L$, {}),
    /* @__PURE__ */ a(hm, { label: t ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ a(
      qn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ a(A$, { row: n }),
        detail: /* @__PURE__ */ a(x$, { row: n }),
        expanded: E$(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function M2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(I$, { ...e }) : /* @__PURE__ */ a(T$, { ...e });
}
const M$ = "_runbook_b9agc_2", B$ = "_list_b9agc_7", P$ = "_step_b9agc_15", q$ = "_numeral_b9agc_21", O$ = "_body_b9agc_28", j$ = "_head_b9agc_34", D$ = "_title_b9agc_40", H$ = "_detail_b9agc_45", F$ = "_actions_b9agc_50", W$ = "_webList_b9agc_56", z$ = "_webStep_b9agc_60", K$ = "_webBody_b9agc_66", G$ = "_webTitle_b9agc_74", U$ = "_webDetail_b9agc_78", L = {
  runbook: M$,
  list: B$,
  step: P$,
  numeral: q$,
  body: O$,
  head: j$,
  title: D$,
  detail: H$,
  actions: F$,
  webList: W$,
  webStep: z$,
  webBody: K$,
  webTitle: G$,
  webDetail: U$
}, pr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function gr(e) {
  return String(e + 1).padStart(2, "0");
}
function V$({ step: e, index: t, connection: n }) {
  const r = pr[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: L.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ a("span", { className: L.numeral, children: gr(t) }),
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
function Y$({ steps: e, actions: t, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ a("ol", { className: L.list, children: e.map((r, l) => /* @__PURE__ */ a(V$, { step: r, index: l, connection: n }, r.title)) }),
    t && /* @__PURE__ */ a("div", { className: L.actions, children: t })
  ] });
}
function J$({ step: e, index: t, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${L.step} ${L.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ a("span", { className: `${L.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: gr(t) }),
    /* @__PURE__ */ o("span", { className: `${L.body} ${L.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${L.head} ward-envrow`, children: [
        /* @__PURE__ */ a("span", { className: `${L.title} ${L.webTitle}`, children: e.title }),
        /* @__PURE__ */ a(m, { ...pr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ a(Le, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ a("span", { className: `${L.detail} ${L.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function X$({ steps: e, actions: t, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ a("ol", { className: `${L.list} ${L.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ a(J$, { step: r, index: l, connection: n }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ a("span", { className: `${L.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function B2(e) {
  return "presentation" in e ? /* @__PURE__ */ a(X$, { ...e }) : /* @__PURE__ */ a(Y$, { ...e });
}
const Q$ = "_list_1gu6a_2", Z$ = "_check_1gu6a_10", e0 = "_body_1gu6a_16", t0 = "_text_1gu6a_23", a0 = "_pending_1gu6a_32", n0 = "_measured_1gu6a_37", Qe = {
  list: Q$,
  check: Z$,
  body: e0,
  text: t0,
  pending: a0,
  measured: n0
};
function r0(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function l0({ check: e }) {
  const t = r0(e.passed);
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
function P2({ checks: e }) {
  return /* @__PURE__ */ a("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ a(l0, { check: t }, t.text)) });
}
const o0 = "_root_4aacj_2", i0 = "_list_4aacj_10", s0 = "_line_4aacj_26", c0 = "_at_4aacj_53", d0 = "_text_4aacj_57", u0 = "_foot_4aacj_61", h0 = "_idle_4aacj_73", m0 = "_caret_4aacj_81", w0 = "_jump_4aacj_88", fe = {
  root: o0,
  list: i0,
  line: s0,
  at: c0,
  text: d0,
  foot: u0,
  idle: h0,
  caret: m0,
  jump: w0
}, f0 = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function _a(e) {
  return Number.isNaN(Date.parse(e)) ? "" : f0.format(new Date(e));
}
const _0 = { warn: "warning", ok: "ok" };
function v0({ kind: e }) {
  const t = _0[e];
  return t === void 0 ? null : /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: t });
}
function b0({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("span", { children: `last event ${_a(e)}` });
}
function p0({ connection: e, idleSince: t, last: n, children: r }) {
  const l = [t, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${_a(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${fe.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ a("span", { className: `${fe.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ a("span", { className: fe.idle, children: i }),
    /* @__PURE__ */ a(b0, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const g0 = 8;
function y0(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > g0;
}
function N0({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ a("button", { type: "button", className: `${fe.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const yr = ye(null);
function q2({ announce: e, onAnnounceChange: t, children: n }) {
  const [r, l] = p(!1), i = Qa(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ a(yr.Provider, { value: i, children: n });
}
function k0() {
  const e = ge(yr), [t, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [t, n];
}
function O2({ lines: e, connection: t, idleSince: n, label: r = "Live activity" }) {
  const l = _(null), [i, s] = p(0), [c, d] = k0(), [u, h] = p(!1), w = e.at(-1);
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
    /* @__PURE__ */ a("ol", { className: fe.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, "data-empty": e.length === 0 || void 0, onScroll: (y) => h(y0(y.currentTarget)), children: e.map((y, E) => /* @__PURE__ */ o("li", { className: `${fe.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": E < i, children: [
      /* @__PURE__ */ a("span", { className: fe.at, children: _a(y.at) }),
      /* @__PURE__ */ a(v0, { kind: y.kind }),
      /* @__PURE__ */ a("span", { className: fe.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${E}`)) }),
    /* @__PURE__ */ o(p0, { connection: t, idleSince: n, last: w, children: [
      /* @__PURE__ */ a("button", { type: "button", className: `${fe.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ a(N0, { shown: u, onJump: f })
    ] })
  ] });
}
const $0 = "_row_1k8wl_2", C0 = "_head_1k8wl_14", S0 = "_author_1k8wl_20", R0 = "_eta_1k8wl_25", T0 = "_edited_1k8wl_26", x0 = "_body_1k8wl_32", L0 = "_reason_1k8wl_37", A0 = "_actions_1k8wl_42", Ce = {
  row: $0,
  head: C0,
  author: S0,
  eta: R0,
  edited: T0,
  body: x0,
  reason: L0,
  actions: A0
}, E0 = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function I0(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function M0({ comment: e, reasonId: t, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function B0({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ a("span", { className: Ce.reason, id: t, children: e })
  ] });
}
function P0(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function q0(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ a(M0, { ...e }) : /* @__PURE__ */ a(B0, { reason: e.unavailable, reasonId: e.unavailableId });
}
function j2(e) {
  const { comment: t } = e;
  P0(e);
  const n = N(), r = `${n}-unavailable`, l = E0[t.delivery];
  return /* @__PURE__ */ o("div", { className: `${Ce.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Ce.head, children: [
      /* @__PURE__ */ a("span", { className: Ce.author, children: t.author }),
      /* @__PURE__ */ a(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ a("span", { className: Ce.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ a("span", { className: Ce.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ a("p", { className: Ce.body, children: t.body }),
    /* @__PURE__ */ a("p", { className: Ce.reason, id: n, children: I0(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ a("div", { className: Ce.actions, children: /* @__PURE__ */ a(q0, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const O0 = "_root_rvhdw_2", j0 = "_attach_rvhdw_11", D0 = "_actions_rvhdw_17", H0 = "_reply_rvhdw_23", F0 = "_replyField_rvhdw_28", W0 = "_send_rvhdw_54", z0 = "_sendIcon_rvhdw_65", K0 = "_sendsAs_rvhdw_75", Oe = {
  root: O0,
  attach: j0,
  actions: D0,
  reply: H0,
  replyField: F0,
  send: W0,
  sendIcon: z0,
  sendsAs: K0
};
function Nr({ value: e, onChange: t }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, t ?? (() => {
  })];
}
function G0() {
  return /* @__PURE__ */ a("svg", { className: Oe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ a("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function U0(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function V0(e) {
  const { placeholder: t, asUser: n, onPost: r } = e, [l, i] = Nr(e), s = N(), c = () => {
    l.trim() !== "" && r(n, l);
  }, d = (u) => {
    U0(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: Oe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Oe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ a(M, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: Oe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ a(G0, {}),
        /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ a("p", { id: s, className: Oe.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function D2(e) {
  return e.variant === "reply" ? /* @__PURE__ */ a(V0, { ...e }) : /* @__PURE__ */ a(Y0, { ...e });
}
function Y0(e) {
  const { placeholder: t, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = Nr(e);
  return /* @__PURE__ */ o("div", { className: Oe.root, children: [
    /* @__PURE__ */ a(M, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: Oe.attach, children: [
      /* @__PURE__ */ a(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ a(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ a(
      hn,
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
const J0 = "_list_1yhks_2", X0 = "_item_1yhks_6", Q0 = "_body_1yhks_22", Z0 = "_text_1yhks_28", eC = "_evidence_1yhks_37", tC = "_consequence_1yhks_49", aC = "_note_1yhks_54", Ge = {
  list: J0,
  item: X0,
  body: Q0,
  text: Z0,
  evidence: eC,
  consequence: tC,
  note: aC
};
function nC({ criterion: e }) {
  return /* @__PURE__ */ a(He, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Va({ text: e }) {
  return /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: e });
}
function rC(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function lC({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Ge.body, children: [
    /* @__PURE__ */ a("span", { className: Ge.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ a(Va, { text: " · " }),
      /* @__PURE__ */ a("code", { className: Ge.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ a(Va, { text: " · " }),
      /* @__PURE__ */ a("span", { className: Ge.consequence, children: rC(e.why) })
    ] })
  ] });
}
function oC({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Ge.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ a(nC, { criterion: e }),
    /* @__PURE__ */ a(lC, { criterion: e })
  ] });
}
function H2({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ a("ul", { className: `${Ge.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ a(oC, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ a("p", { className: Ge.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const iC = "_list_dwhoz_2", sC = "_rung_dwhoz_6", cC = "_name_dwhoz_18", dC = "_actor_dwhoz_32", yt = {
  list: iC,
  rung: sC,
  name: cC,
  actor: dC
}, uC = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function hC({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = uC[e.state];
  return /* @__PURE__ */ o("li", { className: yt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ a("span", { className: yt.name, children: e.name }),
    /* @__PURE__ */ a(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ a("span", { className: `${yt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function F2({ rungs: e }) {
  return /* @__PURE__ */ a("ol", { className: `${yt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ a(hC, { rung: t }, t.name)) });
}
const mC = "_sheet_pw37w_2", wC = "_title_pw37w_9", fC = "_stage_pw37w_15", _C = "_effects_pw37w_20", vC = "_effect_pw37w_20", bC = "_numeral_pw37w_31", pC = "_effectText_pw37w_38", gC = "_refusals_pw37w_43", yC = "_reasons_pw37w_52", NC = "_reason_pw37w_52", kC = "_actions_pw37w_62", he = {
  sheet: mC,
  title: wC,
  stage: fC,
  effects: _C,
  effect: vC,
  numeral: bC,
  effectText: pC,
  refusals: gC,
  reasons: yC,
  reason: NC,
  actions: kC
};
function $C({ refused: e, reasonId: t, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ a(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ a(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function W2({ run: e, effects: t, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
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
      Yu,
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
      /* @__PURE__ */ a($C, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ a(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const CC = "_list_ezew2_2", SC = "_path_ezew2_7", RC = "_head_ezew2_21", TC = "_label_ezew2_28", xC = "_consequence_ezew2_35", LC = "_ask_ezew2_36", et = {
  list: CC,
  path: SC,
  head: RC,
  label: TC,
  consequence: xC,
  ask: LC
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
function AC({ path: e, primary: t, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ a(b, { variant: Ja(t), size: "sm", onClick: () => n(e.kind), children: ea[e.kind] }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ a(b, { variant: Ja(t), size: "sm", disabled: !0, describedBy: r, children: ea[e.kind] }),
    /* @__PURE__ */ a("span", { className: et.ask, id: r, children: e.askInstead })
  ] });
}
function EC({ path: e, primary: t, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: et.path, "data-allowed": e.allowed, "data-role": Ya(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: et.head, children: [
      /* @__PURE__ */ a("span", { className: et.label, children: e.title ?? ea[e.kind] }),
      /* @__PURE__ */ a(m, { role: Ya(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ a("span", { className: et.consequence, children: e.consequence }),
    /* @__PURE__ */ a(AC, { path: e, primary: t, onChoose: n })
  ] });
}
function z2({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ a("ul", { className: et.list, children: e.map((n, r) => /* @__PURE__ */ a(EC, { path: n, primary: r === 0, onChoose: t }, n.kind)) });
}
const IC = "_list_1m7i0_2", MC = "_item_1m7i0_6", BC = "_node_1m7i0_18", PC = "_body_1m7i0_24", qC = "_head_1m7i0_30", OC = "_stage_1m7i0_36", jC = "_version_1m7i0_41", DC = "_sentence_1m7i0_49", HC = "_meta_1m7i0_54", Re = {
  list: IC,
  item: MC,
  node: BC,
  body: PC,
  head: qC,
  stage: OC,
  version: jC,
  sentence: DC,
  meta: HC
}, FC = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function WC({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Re.head, children: [
    /* @__PURE__ */ a("span", { className: Re.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ a("span", { className: Re.version, title: e.version, children: e.version }) : null
  ] });
}
function zC({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Re.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ a("span", { className: `${Re.node} ward-history-node`, children: /* @__PURE__ */ a(He, { size: 9, kind: FC[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Re.body} ward-history-stage`, children: [
      /* @__PURE__ */ a(WC, { entry: e }),
      /* @__PURE__ */ a("span", { className: Re.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Re.meta} ward-history-meta`, children: [
        `${ue(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function K2({ entries: e }) {
  return /* @__PURE__ */ a("ol", { className: `${Re.list} ward-history`, children: e.map((t, n) => /* @__PURE__ */ a(zC, { entry: t }, t.stage + String(n))) });
}
const KC = "_thread_1e70p_3", GC = "_turn_1e70p_8", UC = "_who_1e70p_27", VC = "_body_1e70p_32", Nt = {
  thread: KC,
  turn: GC,
  who: UC,
  body: VC
}, kr = ye(!1);
function G2({ children: e, density: t }) {
  return /* @__PURE__ */ a(kr.Provider, { value: !0, children: /* @__PURE__ */ a("ol", { className: `${Nt.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function U2({ turn: e }) {
  if (!ge(kr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${Nt.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${Nt.who} ward-chat-who`, children: [
      e.author,
      " · ",
      ue(e.at)
    ] }),
    /* @__PURE__ */ a("p", { className: `${Nt.body} ward-chat-body`, children: e.body })
  ] });
}
const YC = "_list_yiolt_3", JC = "_row_yiolt_7", XC = "_label_yiolt_20", QC = "_n_yiolt_26", ZC = "_cause_yiolt_33", ot = {
  list: YC,
  row: JC,
  label: XC,
  n: QC,
  cause: ZC
};
function eS(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const tS = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function aS({ row: e, formatNumber: t }) {
  return eS(e), /* @__PURE__ */ o("li", { className: `${ot.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ a(He, { size: 8, ...tS[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ a("span", { className: ot.label, children: e.label }),
    /* @__PURE__ */ a("span", { className: `${ot.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ a(nS, { cause: e.cause })
  ] });
}
function nS({ cause: e }) {
  return e ? /* @__PURE__ */ a("span", { className: `${ot.cause} ward-healthrow-cause`, children: e }) : null;
}
function V2({ rows: e, formatNumber: t = te }) {
  return /* @__PURE__ */ a("ul", { className: `${ot.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ a(aS, { row: n, formatNumber: t }, n.label)) });
}
const rS = "_root_1jxwp_2", lS = {
  root: rS
};
function Y2({ items: e, note: t, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: lS.root, "data-density": l, children: [
    /* @__PURE__ */ a(Dt, { items: e, note: t, density: l }),
    /* @__PURE__ */ a(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const oS = "_row_dhbre_3", iS = "_key_dhbre_13", sS = "_stack_dhbre_24", cS = "_value_dhbre_32", dS = "_evidence_dhbre_39", uS = "_mark_dhbre_47", Xe = {
  row: oS,
  key: iS,
  stack: sS,
  value: cS,
  evidence: dS,
  mark: uS
};
function hS({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ a(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ a(ia, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function J2({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ a("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ a("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ a("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ a("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ a(hS, { state: e.state }) })
  ] });
}
const mS = "_cell_gh2sd_2", wS = {
  cell: mS
}, fS = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function _S(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function vS(e, t) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (t && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function bS(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: _S(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function pS(e) {
  return e.map((t, n) => ({ ...t, id: t.id ?? String(n) }));
}
function X2({ rows: e, empty: t, requireNoRerunReason: n = !0 }) {
  vS(e, n);
  const r = pS(e);
  return /* @__PURE__ */ a(
    ch,
    {
      label: "Rejection routing",
      columns: fS,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ a("span", { className: wS.cell, "data-norerun": l.noRerun ? !0 : void 0, children: bS(l, i) }),
      empty: t ?? /* @__PURE__ */ a(Qm, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const gS = "_row_1f2re_2", yS = "_title_1f2re_12", NS = "_turns_1f2re_18", kS = "_waiting_1f2re_19", $S = "_resolved_1f2re_20", CS = "_activity_1f2re_21", SS = "_cost_1f2re_28", RS = "_link_1f2re_29", TS = "_tableLink_1f2re_47", xS = "_tableRecord_1f2re_48", LS = "_tableRow_1f2re_59", AS = "_tableTitle_1f2re_71", ES = "_tableResolved_1f2re_76", IS = "_tableMeta_1f2re_87", MS = "_tableCost_1f2re_94", BS = "_tableActivity_1f2re_95", PS = "_tableState_1f2re_105", j = {
  row: gS,
  title: yS,
  turns: NS,
  waiting: kS,
  resolved: $S,
  activity: CS,
  cost: SS,
  link: RS,
  tableLink: TS,
  tableRecord: xS,
  tableRow: LS,
  tableTitle: AS,
  tableResolved: ES,
  tableMeta: IS,
  tableCost: MS,
  tableActivity: BS,
  tableState: PS
}, $r = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function qS(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const n = Math.floor(t / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function OS(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function jS(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const DS = { duplicate: "Closed · duplicate" };
function HS({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a(at, { className: j.tableMeta, text: `waiting on ${e}` });
}
function FS({ value: e }) {
  return /* @__PURE__ */ a("td", { className: j.tableCost, children: e === void 0 ? null : le(e) });
}
function WS({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ a("a", { className: `${j.tableRecord} ward-target`, href: H(e.href), children: `→ ${e.key}` });
}
function zS({ session: e, href: t }) {
  const n = $r[e.state];
  return /* @__PURE__ */ o("tr", { className: j.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: j.tableTitle, children: [
      /* @__PURE__ */ a("a", { className: `${j.tableLink} ward-target`, href: H(t), children: /* @__PURE__ */ a(at, { text: e.title }) }),
      /* @__PURE__ */ a("span", { className: j.tableMeta, children: OS(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: j.tableResolved, children: [
      jS(e.resolved),
      /* @__PURE__ */ a(HS, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ a(FS, { value: e.cost }),
    /* @__PURE__ */ a("td", { className: j.tableActivity, children: qS(e.lastActivity) }),
    /* @__PURE__ */ a("td", { className: j.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ a(m, { role: n.role, label: DS[e.state] ?? n.label }),
      /* @__PURE__ */ a(WS, { link: e.link })
    ] }) })
  ] });
}
function KS({ session: e }) {
  const t = $r[e.state];
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
function Q2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ a(zS, { session: e.session, href: e.href }) : /* @__PURE__ */ a(KS, { session: e.session });
}
const GS = "_block_1yy2v_3", US = "_list_1yy2v_9", VS = "_line_1yy2v_14", ta = {
  block: GS,
  list: US,
  line: VS
}, YS = { warn: "warning", ok: "ok" };
function JS({ kind: e }) {
  const t = YS[e];
  return t === void 0 ? null : /* @__PURE__ */ a("span", { className: "ward-visually-hidden", children: t });
}
function XS({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${ta.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ a(JS, { kind: t }),
    /* @__PURE__ */ a("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function Z2({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ a("div", { className: `${ta.block} ward-typed`, children: /* @__PURE__ */ a("ol", { className: ta.list, "aria-label": t, children: e.map((n, r) => /* @__PURE__ */ a(XS, { line: n }, `${r}-${n.text}`)) }) });
}
const QS = "_band_tt7hp_1", ZS = "_head_tt7hp_8", eR = "_cell_tt7hp_19", tR = "_index_tt7hp_35", aR = "_title_tt7hp_42", nR = "_note_tt7hp_48", rR = "_cellTitle_tt7hp_53", lR = "_cellBody_tt7hp_58", oR = "_tag_tt7hp_64", $e = {
  band: QS,
  head: ZS,
  cell: eR,
  index: tR,
  title: aR,
  note: nR,
  cellTitle: rR,
  cellBody: lR,
  tag: oR
}, Xa = 4;
function eT({ index: e, title: t, note: n, cells: r }) {
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
  vR as ACCENT_PRESETS,
  OR as ActionStack,
  O2 as ActivityConsole,
  CR as AdminIcon,
  fv as AgentCard,
  RR as AppShell,
  N2 as AppearanceStrip,
  eT as Band,
  BR as BarChart,
  Iw as BoardColumn,
  t2 as BoardFootnote,
  a2 as BoardHeader,
  kR as BoardIcon,
  GR as BoardScroller,
  b as Btn,
  _R as CHIP_ROLES,
  cr as CREDENTIAL_COLUMNS,
  MR as Callout,
  k2 as CapabilityRow,
  VR as CardGrid,
  U2 as ChatMessage,
  hn as Checkbox,
  m as Chip,
  at as ClampText,
  j2 as ClarificationRow,
  h2 as ClauseRuleRow,
  u2 as ClauseRules,
  Wn as ColourLadder,
  $2 as ComponentRow,
  D2 as Composer,
  r2 as ConfigRow,
  n2 as ConfigRowHead,
  sa as ConnectionMark,
  q2 as ConsoleAnnounceProvider,
  G2 as Conversation,
  Yu as CostMeter,
  S2 as CredentialRow,
  C2 as CredentialRowHead,
  H2 as CriteriaList,
  Ui as Crumb,
  bR as DENSITIES,
  V2 as DeliveryHealth,
  JR as DeniedState,
  yR as DisabledScope,
  w2 as DryRunRail,
  Qm as EmptyState,
  R2 as EnvCard,
  M as Field,
  YR as FilteredEmpty,
  zR as FormStack,
  Dt as GateChecklist,
  F2 as GateLadder,
  ch as Grid,
  _2 as HandoffRuleRow,
  f2 as HandoffRules,
  NR as HomeIcon,
  l2 as ItemDrawer,
  T2 as KeyPanel,
  Gr as LIVE_EVENT_TYPES,
  q_ as LegacyBoardColumn,
  i2 as LegacyBoardHeader,
  s2 as LegacyConfigRow,
  d2 as LegacyItemDrawer,
  L_ as LegacyOverCapNote,
  c2 as LegacyPreviewRail,
  Dn as LegacyWorkCard,
  Le as LiveIndicator,
  XR as LoadFailed,
  e2 as Loading,
  fr as MCP_SERVER_COLUMNS,
  ia as Mark,
  L2 as MarkUpload,
  He as Marker,
  E2 as McpServerRow,
  A2 as McpServerRowHead,
  pc as Menu,
  ac as MenuButton,
  v2 as NewStreamModal,
  aw as OverCapNote,
  Bt as OverflowRow,
  nt as Overlay,
  m2 as PARTIAL_STEP_REASON,
  _r as POLICY_CHIP_WIDTH,
  HR as PageFrame,
  IR as PageHeader,
  PR as PlainList,
  I2 as PolicyRow,
  o2 as PreviewRail,
  Gt as ROLE_MATRIX_COLUMNS,
  tr as RULE_ACTIONS,
  En as Radio,
  Y2 as ReadyChecklist,
  WR as RecordSection,
  W2 as RequeueSheet,
  z2 as ResolveBlock,
  J2 as ResolvedFieldRow,
  M2 as RoleMatrixRow,
  X2 as RoutingTable,
  b2 as RuleRow,
  B2 as RunbookSteps,
  Kr as STREAM_STEPS,
  KR as SectionBand,
  Ma as SectionHeader,
  Ln as SegmentedControl,
  gn as Select,
  Q2 as SessionRow,
  LR as Sidebar,
  SR as SidebarFoldButton,
  p2 as StageColumn,
  UR as StageGrid,
  K2 as StageHistory,
  Jp as StageListEditor,
  QR as StaleStrip,
  qt as StatStrip,
  jR as StatTiles,
  ER as StreamAvatar,
  g2 as StreamRow,
  $R as StudioIcon,
  FR as SubjectRail,
  Ue as Switch,
  xR as TabLinks,
  qR as TableHead,
  TR as Tabs,
  hR as ThemeProvider,
  y2 as ToolRow,
  DR as TopBar,
  hm as Tree,
  qn as TreeRow,
  Z2 as TypedInputBlock,
  Io as UNSAFE_HREF,
  P2 as ValidationList,
  dR as VisibilityProvider,
  uR as Visible,
  fR as WARD_VERSION,
  jt as WorkCard,
  ZR as WriteUnavailableStrip,
  qS as agoSince,
  Er as clock,
  mg as colourStatus,
  te as count,
  de as duration,
  aa as elapsed,
  wR as eventSourceTransport,
  It as isStreamStep,
  ct as isValidatedStreamStep,
  Kv as ladderValidation,
  qk as mcpConnectionChip,
  Bk as mcpToolName,
  le as money,
  _e as ms,
  On as ordered,
  en as ratio,
  n1 as restartLabel,
  H as safeHref,
  ue as stamp,
  na as stream,
  pR as streamChip,
  Pt as streamChipProps,
  pe as streamColour,
  Yr as streamHex,
  Ct as streamInitials,
  Ur as streamVars,
  AR as uniqueStreamInitials,
  _n as useAnchoredPanel,
  bt as useBorderFlash,
  Ae as useDisabledScope,
  Fr as useFocusTrap,
  gR as useLiveFeed,
  mR as useReturnFocus,
  Et as useRovingTabindex,
  ra as useTicker,
  Ir as useVisible,
  z as v,
  x2 as validateMark,
  ht as validatedStep,
  an as validatedStreamSteps
};
