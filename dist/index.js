import { jsx as n, Fragment as x, jsxs as i } from "react/jsx-runtime";
import { useMemo as Oa, useContext as Ne, createContext as ke, useState as v, useEffect as S, useCallback as Z, useRef as f, useLayoutEffect as Ye, useId as y, Fragment as qa, isValidElement as xl, Children as Ha } from "react";
import { createPortal as Tl, flushSync as Fa } from "react-dom";
function se(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const Yn = (e) => String(e).padStart(2, "0");
function Tn(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${Yn(t % 60)}s` : `${Math.floor(a / 60)}h ${Yn(a % 60)}m`;
}
const Ll = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function me(e) {
  const t = Ll.formatToParts(new Date(e)), a = (r) => {
    var l;
    return ((l = t.find((o) => o.type === r)) == null ? void 0 : l.value) ?? "";
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
function ne(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function za(e, t) {
  return `${e} / ${t}`;
}
const Ml = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Al(e) {
  return Ml.format(new Date(e));
}
const Wa = ke(/* @__PURE__ */ new Set());
function _L({ hidden: e, children: t }) {
  const a = Oa(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Wa.Provider, { value: a, children: t });
}
function Il(e) {
  return !Ne(Wa).has(e);
}
function wL({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: Il(e) ? t : a });
}
const El = "(prefers-color-scheme: dark)";
function Xn() {
  return typeof window.matchMedia == "function" ? window.matchMedia(El) : null;
}
function Bl(e) {
  const [t, a] = v(() => {
    var r;
    return ((r = Xn()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? Xn() : null;
    if (!r) return;
    const l = () => a(r.matches);
    return l(), r.addEventListener("change", l), () => r.removeEventListener("change", l);
  }, [e]), t;
}
function rn(e, t) {
  S(() => {
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function Pl(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function fL({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const l = Bl(e === "system");
  return rn("data-theme", Pl(e, l)), rn("data-accent", t), rn("data-density", a), /* @__PURE__ */ n(x, { children: r });
}
const jl = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Dl(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function Ol(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function ql(e, t, a, r) {
  return e.shiftKey ? Dl(t, a) ? r : void 0 : document.activeElement === r || Ol(t) ? a : void 0;
}
function Hl(e, t, a) {
  const r = a[0], l = a[a.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const o = ql(e, t, r, l);
  o && (e.preventDefault(), o.focus());
}
function Fl(e) {
  return { onKeyDown: Z(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(jl));
      Hl(a, e.current, r);
    },
    [e]
  ) };
}
function vL(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var l, o;
      (o = (l = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : l.focus) == null || o.call(l);
    };
  }, [t, e]);
}
const Qn = { ArrowUp: -1, ArrowDown: 1 }, Zn = { ArrowLeft: -1, ArrowRight: 1 }, zl = (e, t, a) => Math.min(a, Math.max(t, e));
function Wl(e, t) {
  if (t !== "horizontal" && e in Qn) return Qn[e];
  if (t !== "vertical" && e in Zn) return Zn[e];
}
function Jt({ orientation: e = "both" } = {}) {
  const [t, a] = v(0), r = f(/* @__PURE__ */ new Map()), l = f(!1);
  Ye(() => {
    var w;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(t)) return;
    const h = u[0], _ = l.current;
    l.current = !1, a(h), _ && ((w = r.current.get(h)) == null || w.focus());
  });
  const o = Z((u) => a(u), []), s = Z((u) => {
    var h;
    a(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = Z(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const _ = Math.max(0, h.indexOf(t)), w = Wl(u.key, e);
      w !== void 0 ? (u.preventDefault(), s(h[zl(_ + w, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [t, s, e]
  ), d = Z(
    (u) => ({
      tabIndex: u === t ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(u, h) : (r.current.delete(u), u === t && (l.current = !0));
      },
      onFocus: () => a(u),
      "data-ward-roving": !0
    }),
    [t]
  );
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: o };
}
const bL = (e, t, a) => {
  const r = new EventSource(e), l = (o) => a.onEvent(o.data, o.lastEventId, o.type);
  r.onmessage = l;
  for (const o of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(o, l);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, pL = "0.2.0", gL = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Kl = [1, 2, 3, 4, 5, 6], Ka = [1, 2, 3], Gl = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], yL = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], NL = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], P = {
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
}, pe = {
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
function Ln(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Yt(e) {
  return Kl.includes(e);
}
function gt(e) {
  return Ka.includes(e);
}
function Ul(e) {
  if (!Yt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function kL(e) {
  if (!Yt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Vl = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Jl(e) {
  if (!Yt(e)) throw new Error("unvalidated stream step");
  return Vl[e];
}
function ea(e) {
  return typeof e != "string" ? null : Gl.includes(e) ? e : null;
}
function Yl(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function Xl(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function Ql(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Zl(e, t, a) {
  const r = Yl(e);
  if (r === null) return null;
  const l = ea(a) ?? ea(r.type);
  return l === null ? null : { ...r, type: l, id: Xl(r, t), at: Ql(r) };
}
function eo(e, t) {
  return e >= pe.staleAfter ? "stale" : e >= pe.heartbeat && t === "live" ? "reconnecting" : null;
}
function to(e, t, a) {
  return e >= pe.heartbeat && !t && a !== null;
}
function $L(e, t) {
  const [a, r] = v("reconnecting"), [l, o] = v(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), h = f(null), _ = f(0), w = f(0), N = f(!1), k = f("reconnecting"), M = Z((A) => {
    k.current = A, r(A);
  }, []), D = Z(() => {
    c.current = Date.now();
  }, []), _e = Z((A) => {
    for (const [V, Ce] of s.current)
      (Ce === "*" || A.itemKey === Ce) && V(A);
  }, []), ae = Z(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (A, V, Ce) => {
        const Ke = Zl(A, V, Ce);
        Ke !== null && (Ke.id && (d.current = Ke.id), D(), N.current = !1, M("live"), o(Ke.at), _e(Ke));
      },
      onOpen: () => {
        u.current = 0, N.current = !1, D(), M("live");
      },
      onError: () => {
        var V;
        (V = h.current) == null || V.close(), h.current = null, N.current = !0, k.current !== "stale" && M("reconnecting");
        const A = Math.min(pe.reconnectBase * 2 ** u.current, pe.reconnectMax);
        u.current += 1, _.current = window.setTimeout(ae, A);
      }
    });
  }, [_e, M, D, t, e]), $e = Z((A) => {
    N.current = !0, A.close(), h.current = null, _.current = window.setTimeout(ae, pe.reconnectBase);
  }, [ae]), Qe = Z((A, V) => (s.current.set(V, A), () => {
    s.current.delete(V);
  }), []);
  return S(() => (ae(), w.current = window.setInterval(() => {
    const A = Date.now() - c.current, V = eo(A, k.current);
    V && M(V);
    const Ce = h.current;
    to(A, N.current, Ce) && $e(Ce);
  }, pe.tick), () => {
    var A;
    window.clearInterval(w.current), window.clearTimeout(_.current), N.current = !1, (A = h.current) == null || A.close(), h.current = null;
  }), [ae, $e, M]), { connection: a, lastEventAt: l, subscribe: Qe };
}
function Mn(e, t) {
  const a = new Date(e).getTime(), [r, l] = v(() => Date.now());
  return S(() => {
    if (!t) return;
    const o = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    o();
    const s = window.setInterval(o, pe.tick);
    return document.addEventListener("visibilitychange", o), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", o);
    };
  }, [t, a]), Math.max(0, r - a);
}
const no = { blue: "running", orange: "waiting", green: "done" };
function ao() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ta(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function It(e, t) {
  const a = f(0), r = Z((l) => {
    const o = l ?? t, s = e.current;
    s !== null && o !== void 0 && (ao() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${no[o]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => ta(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => ta(s), pe.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (l) => r(l) : () => r(t);
}
const ro = "_root_1otpc_2", lo = {
  root: ro
};
function oo(e, t, a, r, l) {
  const o = [Tn(t)];
  return e || o.push(`as of ${Al(a)}`), r && o.push(`turn ${r[0]}/${r[1]}`), l && o.push(l.label), o;
}
function Be({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const l = a !== "stale", o = Mn(e, l), s = (t == null ? void 0 : t.at) ?? e, c = oo(l, o, s, r, t);
  return /* @__PURE__ */ i("span", { className: `${lo.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
      "started ",
      me(e)
    ] })
  ] });
}
const io = "_app_1cc1p_1", so = "_side_1cc1p_35", co = "_sideTop_1cc1p_46", uo = "_sideBody_1cc1p_60", ho = "_foldSlot_1cc1p_86", mo = "_iconRail_1cc1p_110", _o = "_railItem_1cc1p_119", wo = "_railIcon_1cc1p_140", fo = "_railDot_1cc1p_145", vo = "_railLetter_1cc1p_151", bo = "_main_1cc1p_157", po = "_rail_1cc1p_119", go = "_page_1cc1p_179", yo = "_headerRow_1cc1p_202", No = "_sidebarToggle_1cc1p_209", ko = "_headerSlot_1cc1p_214", $o = "_headerAction_1cc1p_219", Co = "_drawerSide_1cc1p_224", So = "_root_1cc1p_271", Ro = "_topbar_1cc1p_278", xo = "_mark_1cc1p_289", To = "_brand_1cc1p_296", Lo = "_tagline_1cc1p_302", Mo = "_identity_1cc1p_308", Ao = "_tools_1cc1p_309", Io = "_nav_1cc1p_319", Eo = "_metadata_1cc1p_326", Bo = "_actor_1cc1p_341", Po = "_detail_1cc1p_342", jo = "_content_1cc1p_387", Do = "_toolsPanel_1cc1p_403", Oo = "_skip_1cc1p_429", $ = {
  app: io,
  side: so,
  sideTop: co,
  sideBody: uo,
  foldSlot: ho,
  iconRail: mo,
  railItem: _o,
  railIcon: wo,
  railDot: fo,
  railLetter: vo,
  main: bo,
  rail: po,
  page: go,
  headerRow: yo,
  sidebarToggle: No,
  headerSlot: ko,
  headerAction: $o,
  drawerSide: Co,
  root: So,
  topbar: Ro,
  mark: xo,
  brand: To,
  tagline: Lo,
  identity: Mo,
  tools: Ao,
  nav: Io,
  metadata: Eo,
  actor: Bo,
  detail: Po,
  content: jo,
  toolsPanel: Do,
  skip: Oo
};
function ct(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const qo = "_scope_1an6i_2", Ho = {
  scope: qo
}, Ga = ke(null);
function CL({ reason: e, actions: t = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ i("fieldset", { disabled: !0, className: `${Ho.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(Ga.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Pe() {
  return Ne(Ga);
}
function Xt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : ct(e, t.reasonId);
}
const Fo = "_btn_hrmlj_2", zo = "_primary_hrmlj_14", Wo = "_destructive_hrmlj_25", Ko = "_secondary_hrmlj_35", Go = "_ghost_hrmlj_40", Uo = "_overflow_hrmlj_49", Vo = "_sm_hrmlj_56", Jo = "_disabled_hrmlj_60", Yo = "_withReason_hrmlj_68", Xo = "_reason_hrmlj_74", rt = {
  btn: Fo,
  primary: zo,
  destructive: Wo,
  secondary: Ko,
  ghost: Go,
  overflow: Uo,
  sm: Vo,
  disabled: Jo,
  withReason: Yo,
  reason: Xo
};
function Qo(e, t, a, r) {
  const l = t === "sm" ? [rt.sm, "ward-btn--sm"] : [], o = a ? [rt.disabled] : [];
  return [rt.btn, rt[e], "ward-btn", `ward-btn--${e}`, ...l, ...o, r ?? ""].filter(Boolean).join(" ");
}
function Zo(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function ei(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function ti(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function ni(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function ai(e, t, a) {
  return ni(e.describedBy, t && a);
}
function ri({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${rt.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function li(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Pe()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(oi, { ...e });
}
function oi(e) {
  const t = Pe();
  ei(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || t), o = ti(e, t), s = y(), c = ii(o, t);
  return /* @__PURE__ */ i(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: Qo(a, r, l, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: l,
        title: o,
        "aria-describedby": ai(e, o, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Zo(a, e.controls),
        children: li(e)
      }
    ),
    /* @__PURE__ */ n(ri, { id: s, reason: o, shown: c === Ua })
  ] });
}
function ii(e, t) {
  return e && !t ? Ua : qa;
}
function Ua({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${rt.withReason} ward-btn-withReason`, children: e });
}
let An = "none";
function si(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (An = "key");
}
typeof document < "u" && (document.addEventListener("keydown", si, !0), document.addEventListener("pointerdown", () => {
  An = "pointer";
}, !0));
function ci() {
  return An === "key";
}
function bt(e) {
  const [t, a] = v(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var o;
    const r = (o = window.matchMedia) == null ? void 0 : o.call(window, e);
    if (!r) return;
    const l = (s) => a(s.matches);
    return r.addEventListener("change", l), a(r.matches), () => r.removeEventListener("change", l);
  }, [e]), t;
}
const di = "_scrim_1cawq_2", ui = "_drawer_1cawq_10", hi = "_sheet_1cawq_14", mi = "_modal_1cawq_18", _i = "_panel_1cawq_23", wi = "_start_1cawq_44", fi = "_header_1cawq_67", vi = "_title_1cawq_75", bi = "_body_1cawq_79", pi = "_close_1cawq_106", Me = {
  scrim: di,
  drawer: ui,
  sheet: hi,
  modal: mi,
  panel: _i,
  start: wi,
  header: fi,
  title: vi,
  body: bi,
  close: pi
}, gi = ke(null), Dt = [], Ot = /* @__PURE__ */ new Map();
function yi(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Ni(e, t) {
  let a = Ot.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, Ot.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function ki(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !yi(r) && Ni(e, r);
}
function $i(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (ki(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function Ci(e) {
  for (const t of e.claims) {
    const a = Ot.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), Ot.delete(t)));
  }
}
function Si(e, t) {
  const a = { root: e, claims: [] };
  return Dt.push(a), $i(a, t), a;
}
function Ri(e) {
  const t = Dt.indexOf(e);
  t >= 0 && Dt.splice(t, 1), Ci(e);
}
function na(e) {
  return e !== null && Dt.at(-1) === e;
}
function xi(e, t, a) {
  const r = f(null), l = f(a);
  return l.current = a, S(() => {
    const o = e.current;
    if (!o) return;
    const s = document.activeElement, c = Si(o, t);
    return r.current = c, () => {
      var u, h;
      const d = na(c);
      Ri(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), Z(() => na(r.current), []);
}
function Ti(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function Li(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Mi({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Me.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("header", { className: `${Me.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Me.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Me.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Ai(e) {
  return `${Me.scrim} ${Me[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Ii(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Me.panel} ${Me[e]} ward-overlay-panel${a}${r}`;
}
function Ei(e) {
  const t = Ne(gi);
  return e ?? t ?? document.body;
}
function dt(e) {
  const t = f(null), a = f(null), r = y(), l = Ei(e.container), o = bt("(min-width: 768px)"), s = Ti(e.kind, o), c = Li(e, r), d = Fl(a), [u] = v(ci), h = xi(t, l, e.returnFocusTo), _ = Z(() => {
    h() && e.onClose();
  }, [e.onClose, h]);
  return S(() => {
    var w;
    h() && ((w = a.current) == null || w.focus());
  }, [h]), S(() => {
    const w = (N) => {
      N.key === "Escape" && _();
    };
    return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
  }, [_]), Tl(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: Ai(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: _,
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
            className: Ii(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (w) => w.stopPropagation(),
            onKeyDown: (w) => h() && d.onKeyDown(w),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Me.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: _, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Mi, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Bi = /^([a-z][a-z0-9+.-]*):/i, Pi = /* @__PURE__ */ new Set(["http", "https", "mailto"]), ji = "#";
function Di(e) {
  var r, l;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (l = (r = Bi.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function T(e) {
  const t = Di(e);
  return t === void 0 || Pi.has(t) ? e : ji;
}
function Oi(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function Va(e) {
  const t = Oi(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function qi(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => Va(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const o of [a, ...a.children]) l == null || l.observe(o);
    return r(), () => {
      a.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, t]);
}
function Hi(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : l > e.clientWidth - a ? e.scrollLeft + l - e.clientWidth + a : null;
}
function Fi(e, t, a) {
  Ye(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !l) return;
    const o = Hi(r, l);
    o !== null && (r.scrollLeft = Math.max(0, o)), Va(r);
  }, [e, t, a]);
}
const zi = "_row_11g8i_2", Wi = {
  row: zi
};
function Ki(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function In({ label: e, children: t, count: a, as: r = "div", focusable: l = !0, rowRef: o, className: s, ...c }) {
  const d = f(null), u = o ?? d;
  return qi(u, a), /* @__PURE__ */ n(r, { ref: u, className: [Wi.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Ki(l, r), ...c, children: t });
}
const Gi = "_icon_1ylqy_2", Ui = {
  icon: Gi
};
function yt({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: Ui.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function SL() {
  return /* @__PURE__ */ n(yt, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function RL() {
  return /* @__PURE__ */ i(yt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function xL() {
  return /* @__PURE__ */ i(yt, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function TL() {
  return /* @__PURE__ */ n(yt, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Vi() {
  return /* @__PURE__ */ i(yt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const Ja = "ward:sidebar-collapsed", Ji = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Yi() {
  try {
    return window.localStorage.getItem(Ja) === "true";
  } catch {
    return !1;
  }
}
function Xi(e) {
  try {
    window.localStorage.setItem(Ja, String(e));
  } catch {
  }
}
function Qi(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Zi(e) {
  return e instanceof Element && e.closest(Ji) !== null;
}
function es(e) {
  return e.key === "[" && !Qi(e) && !Zi(e.target);
}
function ts(e) {
  const [t, a] = v(Yi), r = () => {
    Xi(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const l = (o) => {
      var c;
      if (!es(o)) return;
      const s = o.target instanceof Element ? o.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, t]), { collapsed: t, toggle: r };
}
function ns() {
  const e = bt("(max-width: 767.98px)"), t = bt("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function as(e) {
  const t = e === "phone", a = y(), r = f(null), [l, o] = v(!1);
  return l && !t && o(!1), { narrow: t, open: l, drawerId: a, slotRef: r, toggle: () => o(!l), close: () => o(!1) };
}
function rs({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ i("div", { className: $.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: $.headerSlot, children: e }),
    Za(t) && /* @__PURE__ */ n("span", { className: $.headerAction, children: t })
  ] }) : e;
}
function ls(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function os({ sidebar: e, label: t, drawer: a }) {
  var l;
  if (ls(a.open, a.close), !a.open) return null;
  const r = (o) => {
    o.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(dt, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (l = a.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ n("div", { className: $.drawerSide, onClick: r, children: Ya(e, !1) }) });
}
function is(e) {
  const [t, a] = v(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function ss(e, t) {
  const a = ts(e === "wide" && !t), r = is(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function cs(e, t) {
  const a = ss(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return us(e.collapsed, t);
  const r = a.collapsed, l = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: l, drawsStrip: !l && typeof e.sidebar == "function", toggle: a.toggle };
}
const ds = (e) => e.collapsed && e.drawsStrip;
function us(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const aa = (e) => e ? "" : void 0;
function Ya(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Xa({ fold: e }) {
  const t = e.collapsed ? "Expand sidebar" : "Collapse sidebar";
  return /* @__PURE__ */ n("span", { className: $.foldSlot, "data-ward-tip": t, children: /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(Vi, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t })
  ] }) });
}
function hs({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: $.sideTop, children: /* @__PURE__ */ n(Xa, { fold: e }) });
}
const Qa = ke(null);
function LL() {
  const e = Ne(Qa);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(Xa, { fold: e });
}
function ms({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": Ln(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function _s({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: $.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ i("a", { className: $.railItem, href: T(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(ms, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function ws({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: l }) {
  const o = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ i("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(hs, { fold: r, inSidebar: l && !o }),
    /* @__PURE__ */ n("div", { className: $.sideBody, hidden: o, children: Ya(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(_s, { items: a ?? [], label: t })
  ] });
}
const Za = (e) => e != null;
function fs(e) {
  const { sidebar: t, header: a, action: r, children: l, rail: o, iconRail: s, pageFill: c } = e, d = Za(o), u = ns(), h = as(u), _ = cs(e, u), w = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ i("div", { className: $.app, "data-rail": String(d), "data-collapsed": String(_.collapsed), "data-consumer-fold": aa(ds(_)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(Qa.Provider, { value: _, children: /* @__PURE__ */ n(ws, { sidebar: t, label: w, iconRail: s, fold: _, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ i("main", { className: $.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(rs, { header: a, action: r, label: w, drawer: h }),
      /* @__PURE__ */ n("div", { className: $.page, "data-fill": aa(c === !0), children: l })
    ] }),
    d && /* @__PURE__ */ n("div", { className: $.rail, children: o }),
    /* @__PURE__ */ n(os, { sidebar: t, label: w, drawer: h })
  ] });
}
function vs({ destinations: e, active: t }) {
  const a = f(null);
  return Fi(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(In, { as: "nav", rowRef: a, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: T(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function bn({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function bs({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ i("span", { className: $.metadata, children: [
    /* @__PURE__ */ n(bn, { value: e, className: $.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(bn, { value: t, className: $.detail })
  ] });
}
function ps() {
  const e = bt("(max-width: 767.98px)"), t = y(), a = f(null), [r, l] = v(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function gs({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: $.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: $.tools, children: e });
}
function ys({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: $.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function Ns(e) {
  return /* @__PURE__ */ i("header", { className: $.topbar, children: [
    /* @__PURE__ */ n("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(bn, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ n(vs, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: $.identity, children: /* @__PURE__ */ n(bs, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(gs, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function ks(e) {
  const t = y(), a = ps();
  return /* @__PURE__ */ i("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: $.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Ns, { ...e, menu: a }),
    /* @__PURE__ */ n(ys, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: $.content, children: e.children })
  ] });
}
function $s(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function ML(e) {
  return $s(e) ? /* @__PURE__ */ n(fs, { ...e }) : /* @__PURE__ */ n(ks, { ...e });
}
const Cs = "_root_itg9o_2", Ss = "_row_itg9o_8", Rs = "_box_itg9o_14", xs = "_label_itg9o_21", Ts = "_labelHidden_itg9o_26", Ls = "_consequence_itg9o_44", Ms = "_sample_itg9o_79", Ue = {
  root: Cs,
  row: Ss,
  box: Rs,
  label: xs,
  labelHidden: Ts,
  consequence: Ls,
  sample: Ms
};
function As(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function Is({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${Ue.consequence} ward-check-consequence`, children: t }) : null;
}
function Es(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function Bs(e, t, a, r) {
  const l = e.consequence ? `${t}-note` : void 0, o = Es(e, a, r), s = o ? `${t}-reason` : void 0, c = Xt(ct(l, e.describedBy, s), r);
  return { noteId: l, reason: o, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? o } };
}
function Ps({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function js({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ue.sample, "aria-hidden": "true", children: e }) : null;
}
function er(e) {
  const t = y(), a = Pe(), r = As(e, a), l = Bs(e, t, r.disabled, a);
  return /* @__PURE__ */ i("div", { className: `${Ue.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ i("span", { className: Ue.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: t,
          type: "checkbox",
          className: `${Ue.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (o) => {
            var s;
            return !r.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, o.target.checked));
          },
          ...l.input
        }
      ),
      /* @__PURE__ */ n("label", { htmlFor: t, className: e.labelHidden ? Ue.labelHidden : Ue.label, children: e.label }),
      /* @__PURE__ */ n(js, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Ps, { id: l.reasonId, reason: l.reason }),
    /* @__PURE__ */ n(Is, { id: l.noteId, text: e.consequence })
  ] });
}
const Ds = "_chip_pq6tb_2", Os = {
  chip: Ds
}, qs = {
  gate: P.chip.gate,
  system: P.chip.system,
  write: P.chip.write,
  drift: P.chip.drift,
  done: P.chip.done,
  attention: P.chip.attention,
  failed: P.chip.failed,
  pending: P.chip.pending,
  running: P.chip.running,
  warn: P.chip.warn,
  meta: P.chip.meta,
  soft: P.chip.soft,
  quiet: P.chip.quiet,
  owed: P.chip.owed,
  neutral: P.chip.quiet,
  info: P.chip.running,
  success: P.chip.done,
  warning: P.chip.attention,
  danger: P.chip.failed
};
function Hs(e, t) {
  if (e === "stream") return Fs(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = qs[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function Fs(e) {
  if (!e || !gt(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = Ln(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Os.chip} ward-chip ward-chip--${e}`, style: Hs(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const zs = "_clamp_zn74g_3", ra = {
  clamp: zs
};
function it({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? ra.clamp : `${ra.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const Ws = "_root_1btz3_2", Ks = "_body_1btz3_10", Gs = "_toggle_1btz3_24", ln = {
  root: Ws,
  body: Ks,
  toggle: Gs
};
function AL({ children: e, lines: t = 3, label: a }) {
  const [r, l] = v(!1), o = y();
  return /* @__PURE__ */ i("div", { className: ln.root, children: [
    /* @__PURE__ */ n("div", { id: o, className: ln.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: ln.toggle, "aria-expanded": r, "aria-controls": o, onClick: () => l(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const Us = "_root_1a4s8_2", Vs = "_words_1a4s8_16", Js = "_title_1a4s8_23", Ys = "_actions_1a4s8_27", $t = {
  root: Us,
  words: Vs,
  title: Js,
  actions: Ys
};
function IL({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ i("section", { className: $t.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ i("div", { className: $t.words, children: [
      /* @__PURE__ */ n("strong", { className: $t.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: $t.actions, children: a })
  ] });
}
const Xs = "_root_8zmpu_2", Qs = "_step_8zmpu_12", Zs = "_dot_8zmpu_38", ec = "_label_8zmpu_51", _t = {
  root: Xs,
  step: Qs,
  dot: Zs,
  label: ec
}, tc = { done: ", done", now: ", current", next: "" };
function nc({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ i("li", { className: _t.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${_t.dot} ward-running` : _t.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: _t.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: tc[e.state] })
  ] });
}
function EL({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: _t.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(nc, { step: r, running: t }, r.label)) });
}
function Qt(e) {
  return typeof e == "number" && gt(e) ? e : null;
}
function ye(e, t) {
  const a = Qt(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function En(e, t) {
  const a = Qt(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const ac = "_root_13eei_3", rc = "_nav_13eei_8", lc = "_list_13eei_16", oc = "_item_13eei_24", ic = "_link_13eei_44", sc = "_sep_13eei_54", cc = "_current_13eei_58", dc = "_chips_13eei_62", De = {
  root: ac,
  nav: rc,
  list: lc,
  item: oc,
  link: ic,
  sep: sc,
  current: cc,
  chips: dc
};
function uc({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: De.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${De.link} ward-target`, href: T(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function hc({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: De.root, children: /* @__PURE__ */ i("nav", { "aria-label": "Breadcrumb", className: De.nav, children: [
    /* @__PURE__ */ n("ol", { className: De.list, children: e.map((r, l) => /* @__PURE__ */ i("li", { className: De.item, children: [
      l > 0 ? /* @__PURE__ */ n("span", { className: De.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(uc, { step: r, isCurrent: a && l === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${De.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function tr(e, t, a) {
  const r = f(a);
  r.current = a, S(() => {
    if (!e) return;
    const l = (o) => {
      var s;
      (s = t.current) != null && s.contains(o.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, t]);
}
const mc = 500;
function nr(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function ar() {
  const e = f(""), t = f(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, mc), e.current);
}
const Ct = 4;
function _c(e, t, a) {
  const r = Math.max(0, a - e.bottom - Ct * 2), l = Math.max(0, e.top - Ct * 2);
  return t <= r || r >= l ? { top: e.bottom + Ct, maxHeight: r } : { top: e.top - Ct - Math.min(t, l), maxHeight: l };
}
function wc(e, t, a, r) {
  const l = { start: e.left, end: e.right - t }, o = { start: l.start + t <= a, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = o[r] || !o[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, a - t));
}
function fc(e, t, a, r) {
  return { ..._c(e, t.height, a.height), left: wc(e, t.width, a.width, r) };
}
function Et(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function vc(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function bc(e, t, a) {
  const r = vc(t, a);
  e.style.setProperty("--ward-anchor-width", Et(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const l = e.getBoundingClientRect(), o = document.documentElement;
  return { edges: r, box: l, view: { width: o.clientWidth, height: o.clientHeight } };
}
function pc(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, l) => r.scrollTop = a[l]);
}
function la(e, t, a, r) {
  const l = pc(e), o = bc(e, t, r), s = fc(o.edges, o.box, o.view, a);
  Object.assign(e.style, { left: Et(s.left - o.box.left), top: Et(s.top - o.box.top), maxHeight: Et(s.maxHeight) }), l();
}
function gc(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function rr(e, t, a = "start", r) {
  Ye(() => {
    const l = t.current, o = e.current;
    if (!l || !o) return;
    const s = gc(l), c = () => la(l, o, a, r == null ? void 0 : r.current), d = (u) => {
      l.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), Ye(() => {
    t.current && e.current && la(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const yc = "_root_1lgbn_2", Nc = "_trigger_1lgbn_7", kc = "_value_1lgbn_47", $c = "_menu_1lgbn_65", Cc = "_find_1lgbn_87", Sc = "_list_1lgbn_103", Rc = "_option_1lgbn_114", xc = "_check_1lgbn_133", Tc = "_empty_1lgbn_144", ge = {
  root: yc,
  trigger: Nc,
  value: kc,
  menu: $c,
  find: Cc,
  list: Sc,
  option: Rc,
  check: xc,
  empty: Tc
}, Lc = 7;
function Mc(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function oa(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function Ac(e, t) {
  const [a, r] = v(e.defaultOpen === !0), [l, o] = v(""), [s, c] = v(() => oa(e.options, e.value)), d = (u) => {
    var h;
    Fa(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: l,
    active: s,
    entries: Mc(e.options, l),
    findable: e.options.length > Lc,
    show: () => {
      e.disabled || (o(""), c(oa(e.options, e.value)), r(!0));
    },
    close: d,
    to: c,
    pick: (u) => {
      var h;
      u && u.option.value !== e.value && ((h = e.onChange) == null || h.call(e, u.option.value)), d(!0);
    },
    find: (u) => {
      o(u), c(0);
    }
  };
}
function Ic(e, t) {
  const a = f(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function Ec(e) {
  const t = ar();
  return (a) => {
    const r = t(a), l = e.entries.findIndex((o) => o.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function lr(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Bc(e) {
  return { ...lr(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function or(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = t[r.key];
    if (!l) return a(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const Pc = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function jc(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      Pc.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function Dc({ entry: e, at: t, menu: a, ids: r, value: l }) {
  return /* @__PURE__ */ i(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
      "data-active": t === a.active || void 0,
      className: ge.option,
      onMouseDown: (o) => o.preventDefault(),
      onMouseMove: () => a.to(t),
      onClick: () => a.pick(e),
      children: [
        /* @__PURE__ */ n("span", { className: ge.check, "aria-hidden": "true" }),
        /* @__PURE__ */ n("span", { className: ge.label, children: e.option.label })
      ]
    }
  );
}
function Bn(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function Oc({ menu: e, ids: t, focusRef: a }) {
  return /* @__PURE__ */ n(
    "input",
    {
      ref: a,
      className: ge.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": t.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": Bn(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: or(e, lr(e), () => {
      })
    }
  );
}
function qc({ props: e, menu: t, ids: a, focusRef: r, trigger: l }) {
  const o = Ec(t), s = f(null);
  rr(l, s);
  const c = (d) => {
    nr(d) && o(d.key);
  };
  return /* @__PURE__ */ i("div", { ref: s, className: ge.menu, children: [
    t.findable && /* @__PURE__ */ n(Oc, { menu: t, ids: a, focusRef: r }),
    /* @__PURE__ */ n(
      "ul",
      {
        ref: t.findable ? void 0 : r,
        id: a.list,
        role: "listbox",
        tabIndex: -1,
        className: ge.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": t.findable ? void 0 : Bn(t, a),
        onKeyDown: or(t, Bc(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(Dc, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: ge.empty, children: "No match" })
  ] });
}
function Hc(e, t) {
  const a = e.open ? Bn(e, t) : void 0;
  S(() => {
    var r, l;
    a && ((l = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [a]);
}
function ir(...e) {
  return e.filter(Boolean).join(" ");
}
function Fc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function zc({ props: e, menu: t, ids: a, trigger: r, wantFocus: l }) {
  var c;
  const o = !e.options.some((d) => d.value === e.value), s = (c = Pe()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: ir(ge.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": t.open,
      "aria-controls": t.open ? a.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": ct(e["aria-describedby"], a.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...jc(t, l),
      children: /* @__PURE__ */ n("span", { id: a.value, className: ge.value, "data-placeholder": o || void 0, children: Fc(e) })
    }
  );
}
function sr(e) {
  const t = Pe(), a = t ? { ...e, disabled: !0, "aria-describedby": Xt(e["aria-describedby"], t) } : e, r = y(), l = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, o = f(null), s = f(null), c = f(null), d = Ac(a, s), u = Ic(d.open, c);
  return tr(d.open, o, () => d.close(!1)), Hc(d, l), /* @__PURE__ */ i("div", { ref: o, className: ir(ge.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(zc, { props: a, menu: d, ids: l, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(qc, { props: a, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const Wc = "_field_1ensj_2", Kc = "_label_1ensj_8", Gc = "_labelHidden_1ensj_15", Uc = "_control_1ensj_25", Vc = "_mono_1ensj_45", Jc = "_area_1ensj_50", Yc = "_invalid_1ensj_57", Fe = {
  field: Wc,
  label: Kc,
  labelHidden: Gc,
  control: Uc,
  mono: Vc,
  area: Jc,
  invalid: Yc
}, Xc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, cr = (e) => `${e}-label`;
function Qc({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? Xc : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function Zc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    sr,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": cr(t.id),
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
function ed({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
function td({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, type: "date", min: e.min, max: e.max, ...t });
}
const nd = { input: Qc, select: Zc, textarea: ed, date: td };
function ad(e, t, a) {
  const r = nd[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function rd(e, t, a, r) {
  const l = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": l,
    "aria-describedby": Xt(ct(l ? a : void 0, e.describedBy), r),
    onChange: (o) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, o.target.value);
    }
  };
}
function ld(e) {
  const t = e.mono ? [Fe.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [Fe.area] : [];
  return [Fe.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function od(e) {
  return e ? `${Fe.label} ${Fe.labelHidden} ward-field-label` : `${Fe.label} ward-field-label`;
}
function E(e) {
  const t = y(), a = `${t}-msg`, r = rd(e, t, a, Pe()), l = ld(e);
  return /* @__PURE__ */ i("div", { className: `${Fe.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: cr(t), className: od(e.labelHidden), htmlFor: t, children: e.label }),
    ad(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${Fe.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const id = "_root_sjvm0_2", sd = "_trigger_sjvm0_9", cd = "_ghost_sjvm0_27", dd = "_panel_sjvm0_46", ud = "_edged_sjvm0_67", hd = "_menu_sjvm0_73", md = "_group_sjvm0_78", _d = "_heading_sjvm0_83", wd = "_item_sjvm0_89", fd = "_description_sjvm0_105", vd = "_large_sjvm0_109", bd = "_touch_sjvm0_113", pd = "_icon_sjvm0_117", gd = "_label_sjvm0_125", yd = "_text_sjvm0_130", Nd = "_trailing_sjvm0_138", kd = "_check_sjvm0_144", $d = "_separator_sjvm0_183", Cd = "_footer_sjvm0_189", Sd = "_find_sjvm0_196", Rd = "_findGlyph_sjvm0_208", xd = "_findInput_sjvm0_214", Td = "_empty_sjvm0_230", L = {
  root: id,
  trigger: sd,
  ghost: cd,
  panel: dd,
  edged: ud,
  menu: hd,
  group: md,
  heading: _d,
  item: wd,
  description: fd,
  large: vd,
  touch: bd,
  icon: pd,
  label: gd,
  text: yd,
  trailing: Nd,
  check: kd,
  separator: $d,
  footer: Cd,
  find: Sd,
  findGlyph: Rd,
  findInput: xd,
  empty: Td
}, dr = ke(null);
function Ld(e, t) {
  const [a, r] = v({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (l) => r((o) => ({ open: !0, start: l, request: o.request + 1 })),
    close: (l) => {
      var o;
      Fa(() => r((s) => ({ ...s, open: !1 }))), l && ((o = t.current) == null || o.focus());
    }
  };
}
const Md = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Ad(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = Md.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function Pn(...e) {
  return e.filter(Boolean).join(" ");
}
function Id(e, t = {}, a = "field") {
  const { ref: r, className: l, ...o } = t;
  return { ...o, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: Pn(L.trigger, a === "ghost" ? L.ghost : void 0, l) };
}
function ur(e) {
  const t = y(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = f(null), l = f(null), o = Ld(e.defaultOpen === !0, l);
  return tr(o.open, r, () => o.close(!1)), /* @__PURE__ */ i("div", { ref: r, className: Pn(L.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...Id(l, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": o.open,
        "aria-controls": o.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Ad(o),
        children: e.label
      }
    ),
    o.open && /* @__PURE__ */ n(dr.Provider, { value: { ...a, popup: o, button: l }, children: e.children })
  ] });
}
function Ed(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function Bd(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const Pd = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function jd(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function Dd(e, t) {
  return e === "separator" ? e : "items" in e ? jd(e, t) : t(e) ? e : null;
}
function Od(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function qd(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (l) => l.label.toLowerCase().includes(a);
  return Od(e.map((l) => Dd(l, r)).filter((l) => l !== null));
}
const hr = (e, t) => (e % t + t) % t;
function qe(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const l = hr(t + a * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const Hd = (e) => e.split("").every((t) => t === e[0]);
function Fd(e, t, a) {
  const r = Hd(a), l = r ? a[0] : a, o = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = hr(o + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function zd(e) {
  const t = f([]);
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
function Wd(e, t) {
  const { items: a } = e, r = () => {
    var l;
    return (l = e.refs.current[e.current()]) == null ? void 0 : l.click();
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
function Kd(e, t, a) {
  const r = ar(), l = Wd(e, t), o = (s) => {
    if (nr(s)) {
      if (!a) return e.focus(Fd(e.items, e.current(), r(s.key)));
      s.preventDefault(), a(s.key);
    }
  };
  return {
    onKeyDown: (s) => {
      const c = l.get(s.key);
      if (!c) return o(s);
      s.preventDefault(), s.stopPropagation(), c();
    },
    onKeyUp: (s) => {
      s.key === " " && s.preventDefault();
    }
  };
}
function Gd(e) {
  const t = f(!1);
  return {
    onKeyDown: (a) => {
      a.key === "Tab" && (t.current = !0);
    },
    onBlur: () => {
      t.current && e.close(!1);
    }
  };
}
function Ud(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? qe(e, -1, 1) : t;
}
function Vd(e, t) {
  const { start: a, request: r } = t, l = f(e);
  l.current = e, S(() => {
    const { items: o, focus: s } = l.current;
    a && s(a === "first" ? Ud(o) : qe(o, o.length, -1));
  }, [a, r]);
}
function Jd({ row: e, nav: t, popup: a }) {
  const { item: r, at: l } = e;
  return {
    onMouseDown: (o) => o.preventDefault(),
    onMouseMove: () => {
      !r.disabled && t.current() !== l && t.focus(l);
    },
    onClick: (o) => {
      var s;
      if (r.disabled) return o.preventDefault();
      (s = r.onSelect) == null || s.call(r), a.close(!0);
    }
  };
}
const Yd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function Xd(e, t) {
  return Yd(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function Qd(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: L.label, children: e.label });
  return e.description ? /* @__PURE__ */ i("span", { className: L.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: L.description, children: e.description })
  ] }) : a;
}
function Zd() {
  return /* @__PURE__ */ n("svg", { className: L.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function ia(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: L.icon, "aria-hidden": "true", children: e.icon }) : null,
    Qd(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: L.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(Zd, {}) : null
  ] });
}
function mr(e) {
  const { item: t, at: a } = e.row, r = y(), l = {
    ref: (o) => {
      e.nav.refs.current[a] = o;
    },
    role: "menuitem",
    tabIndex: -1,
    className: L.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...Xd(t, r),
    ...Jd(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: T(t.href), ...l, children: ia(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...l, children: ia(t, r) });
}
function eu({ heading: e, rows: t, nav: a, popup: r }) {
  const l = y();
  return /* @__PURE__ */ i("div", { role: "group", "aria-labelledby": l, className: L.group, children: [
    /* @__PURE__ */ n("div", { id: l, className: L.heading, children: e }),
    t.map((o) => /* @__PURE__ */ n(mr, { row: o, nav: a, popup: r }, o.at))
  ] });
}
function tu({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: L.separator }) : e.kind === "group" ? /* @__PURE__ */ n(eu, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(mr, { row: e.row, nav: t, popup: a });
}
function nu() {
  const e = Ne(dr);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function au() {
  return /* @__PURE__ */ i("svg", { className: L.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function ru(e, t) {
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
function lu({ find: e, query: t, setQuery: a, input: r, nav: l, popup: o, menuId: s }) {
  const c = ru(l, o), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ i("div", { className: L.find, children: [
    /* @__PURE__ */ n(au, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: L.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function ou(e, t) {
  const [a, r] = v(""), l = f(null), o = t !== void 0 && Pd(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = l.current) == null || d.focus();
  };
  return o ? { find: t, query: a, setQuery: r, input: l, toFind: s, entries: qd(e, a) } : { query: a, setQuery: r, input: l, entries: e };
}
const iu = { regular: void 0, large: L.large, touch: L.touch }, su = (e, t) => Pn(L.panel, e ? L.edged : void 0, iu[t]);
function cu({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: L.empty, children: e.empty ?? "No matches" });
}
function _r({ entries: e, footer: t, align: a = "start", find: r, edges: l, size: o = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = nu(), h = f(null);
  rr(u, h, a, l);
  const _ = ou(e, r), w = Ed(_.entries), N = zd(w.flatMap(Bd).map((D) => D.item)), k = Kd(N, s, _.toFind), M = Gd(s);
  return Vd(N, s), /* @__PURE__ */ i("div", { ref: h, className: su(l, o), ...M, children: [
    _.find && /* @__PURE__ */ n(lu, { find: _.find, query: _.query, setQuery: _.setQuery, input: _.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: L.menu, ...k, children: w.map((D, _e) => /* @__PURE__ */ n(tu, { block: D, nav: N, popup: s }, _e)) }),
    /* @__PURE__ */ n(cu, { find: _.find, count: N.items.length }),
    t && /* @__PURE__ */ n("p", { className: L.footer, children: t })
  ] });
}
function du(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function wr(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !du(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const uu = (e, t) => e.reduce((a, r) => a + r + t, -t);
function hu({ room: e, widths: t, more: a, gap: r }, l) {
  const o = t.map((d, u) => u);
  if (uu(t, r) <= e) return o;
  const s = /* @__PURE__ */ new Set([l]);
  let c = t[l] + r + a;
  for (const d of o)
    if (d !== l) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return o.filter((d) => s.has(d));
}
const on = (e) => Number.parseFloat(e) || 0, sa = (e) => e.getBoundingClientRect().width;
function mu(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - on(a.paddingInlineStart) - on(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), sa),
    more: r ? sa(r) : 0,
    gap: on(a.columnGap)
  };
}
function _u(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const wu = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function fr(e, t, a, r = ':scope > [role="tab"]') {
  const [l, o] = v(null);
  return Ye(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = mu(s, r);
      o((u) => wu(u, d) ? u : d);
    };
    return c(), _u(s, c);
  }, [e, a, r]), l && hu(l, t);
}
const fu = "_strip_1eynz_2", vu = "_fits_1eynz_19", bu = "_probe_1eynz_27", pu = "_moreRoot_1eynz_36", gu = "_more_1eynz_36", yu = "_tab_1eynz_55", Nu = "_count_1eynz_91", ku = "_badge_1eynz_97", U = {
  strip: fu,
  fits: vu,
  probe: bu,
  moreRoot: pu,
  more: gu,
  tab: yu,
  count: Nu,
  badge: ku
}, vr = "More";
function $u(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const ca = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, jn = (e) => e.badge === void 0 ? ca(e) : `${ca(e)}, ${e.badge}`;
function br(e) {
  return `${U.strip} ward-tabs ward-tabs--${e}`;
}
const Cu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Su({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ i(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${U.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : jn(e),
      onClick: () => r(e.id),
      ...a,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
          " ",
          /* @__PURE__ */ n("span", { className: U.count, children: `· ${e.count}` })
        ] }),
        e.badge === void 0 ? null : /* @__PURE__ */ n("span", { className: U.badge, children: e.badge })
      ]
    }
  );
}
function Ru(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((o) => o.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function xu({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(ur, { label: vr, className: U.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: U.more }, children: /* @__PURE__ */ n(_r, { align: "end", entries: e.map((r) => ({ label: jn(r), onSelect: () => a(r.id) })) }) });
}
function Tu(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : Cu;
}
function BL({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: l }) {
  const o = Jt({ orientation: "horizontal" }), s = $u(e, t);
  S(() => o.setActive(s), [o.setActive, s]);
  const c = f(null);
  wr(c, l);
  const d = fr(c, s, e.map(jn).join(`
`)), u = d ? e.filter((h, _) => !d.includes(_)) : [];
  return /* @__PURE__ */ i("div", { ref: c, className: `${br(l)} ${U.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...o.containerProps, children: [
    e.map((h, _) => /* @__PURE__ */ n(Su, { tab: h, active: t, place: Tu(o, d, _), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${U.more} ${U.probe}`, children: vr }),
    u.length > 0 && /* @__PURE__ */ n(xu, { tabs: u, trigger: o.itemProps(e.length), onPick: Ru(c, a) })
  ] });
}
const da = 7, pr = "More", Lu = ":scope > a", gr = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Mu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Au(e, t) {
  return !e || e.includes(t) ? {} : Mu;
}
function Iu({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ i("a", { href: e.href, className: `${U.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: U.count, children: `· ${e.count}` })
    ] })
  ] });
}
function Eu({ links: e }) {
  return /* @__PURE__ */ n(ur, { label: pr, className: U.moreRoot, trigger: { className: U.more }, children: /* @__PURE__ */ n(_r, { align: "end", entries: e.map((t) => ({ label: gr(t), href: t.href })) }) });
}
function PL({ links: e, active: t, label: a, level: r }) {
  if (e.length > da) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${da} — the set is fixed`);
  const l = f(null);
  wr(l, r);
  const o = Math.max(0, e.findIndex((d) => d.id === t)), s = fr(l, o, e.map(gr).join(`
`), Lu), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ i("nav", { ref: l, className: `${br(r)} ${U.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(Iu, { link: d, current: d.id === t, place: Au(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${U.more} ${U.probe}`, children: pr }),
    c.length > 0 && /* @__PURE__ */ n(Eu, { links: c })
  ] });
}
const Bu = "_root_v56ff_3", Pu = "_segment_v56ff_9", ua = {
  root: Bu,
  segment: Pu
};
function yr({ options: e, value: t, onChange: a, label: r = "Options", disabled: l = !1, describedBy: o }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Jt({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${ua.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: ua.segment,
      "aria-checked": d.value === t,
      disabled: l,
      "aria-describedby": o,
      onClick: () => a(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const ju = "_sidebar_s9o1j_3", Du = "_brand_s9o1j_9", Ou = "_mark_s9o1j_17", qu = "_word_s9o1j_24", Hu = "_nav_s9o1j_30", Fu = "_navItem_s9o1j_39", zu = "_footLink_s9o1j_49", Wu = "_group_s9o1j_58", Ku = "_groupName_s9o1j_65", Gu = "_agents_s9o1j_81", Uu = "_agent_s9o1j_81", Vu = "_root_s9o1j_96", Ju = "_agentTop_s9o1j_105", Yu = "_dot_s9o1j_112", Xu = "_agentName_s9o1j_124", Qu = "_agentMeta_s9o1j_138", Zu = "_foot_s9o1j_49", eh = "_footName_s9o1j_150", th = "_footLinks_s9o1j_157", nh = "_linkBrand_s9o1j_184", ah = "_label_s9o1j_205", rh = "_note_s9o1j_210", lh = "_footer_s9o1j_226", I = {
  sidebar: ju,
  brand: Du,
  mark: Ou,
  word: qu,
  nav: Hu,
  navItem: Fu,
  new: "_new_s9o1j_48",
  footLink: zu,
  group: Wu,
  groupName: Ku,
  agents: Gu,
  agent: Uu,
  root: Vu,
  agentTop: Ju,
  dot: Yu,
  agentName: Xu,
  agentMeta: Qu,
  foot: Zu,
  footName: eh,
  footLinks: th,
  linkBrand: nh,
  label: ah,
  note: rh,
  footer: lh
};
function oh({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ i(
    "a",
    {
      className: I.agent,
      href: T(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ i("span", { className: I.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: I.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": Ln(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: I.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: I.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function ih({ shared: e }) {
  return e ? /* @__PURE__ */ i("div", { className: I.foot, children: [
    /* @__PURE__ */ n("span", { className: I.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: I.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${I.footLink} ward-target`, href: T(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function sh({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: l, shared: o }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ i("nav", { className: I.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ i("div", { className: I.brand, children: [
      /* @__PURE__ */ n("span", { className: I.mark }),
      /* @__PURE__ */ n("span", { className: I.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: I.nav, children: t.map((s) => /* @__PURE__ */ n("a", { className: I.navItem, href: T(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ i("div", { className: I.group, children: [
      /* @__PURE__ */ i("span", { className: I.groupName, children: [
        a,
        " · ",
        ne(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: I.new, href: T(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: I.agents, children: r.map((s) => /* @__PURE__ */ n(oh, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(ih, { shared: o })
  ] });
}
function ch(e) {
  return e.destinations ?? e.items ?? [];
}
function dh({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.linkBrand, children: e });
}
function uh({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.footer, children: e });
}
function hh({ link: e, active: t }) {
  return /* @__PURE__ */ i("a", { href: T(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: I.note, children: e.note })
  ] });
}
function mh(e) {
  return /* @__PURE__ */ i("aside", { className: `${I.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(dh, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: ch(e).map((t) => /* @__PURE__ */ n(hh, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(uh, { children: e.children })
  ] });
}
function _h(e) {
  return "agents" in e;
}
function jL(e) {
  return _h(e) ? /* @__PURE__ */ n(sh, { ...e }) : /* @__PURE__ */ n(mh, { ...e });
}
const wh = "_mark_wlgi8_3", fh = {
  mark: wh
}, vh = { met: "✓", unmet: "", failed: "✕" };
function Dn({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: fh.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: vh[e]
    }
  );
}
const bh = "_avatar_1t33a_3", ph = {
  avatar: bh
};
function qt(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function gh(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [qt(e), ...[...t.slice(1)].map((r) => a + r)];
}
function yh(e, t) {
  const a = gh(e).find((l) => !t.has(l));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(qt(e).charAt(0) + String(r)); ) r += 1;
  return qt(e).charAt(0) + String(r);
}
function DL(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const l = yh(r, t);
    t.add(l), a.set(r, l);
  }
  return a;
}
function Nh(e) {
  return e != null && gt(e) ? Ul(e) : void 0;
}
function OL({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: ph.avatar, "data-size": a, "aria-hidden": "true", style: Nh(t), children: r ?? qt(e) });
}
const kh = "_marker_br9fi_2", $h = {
  marker: kh
}, Ch = {
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
}, Sh = { running: " ward-running" };
function We({ size: e, kind: t, label: a }) {
  const r = { "--marker": Ch[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${$h.marker} ward-marker ward-marker--${t}${Sh[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const Rh = "_root_ti0pq_2", xh = "_chip_ti0pq_11", Th = "_noCase_ti0pq_23", St = {
  root: Rh,
  chip: xh,
  noCase: Th
};
function Lh(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function On({ connection: e, since: t, lastEventAt: a }) {
  const r = Lh(t, a), l = Mn(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ i("span", { className: `${St.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(We, { size: 6, kind: "green" }),
    "Live"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ i("span", { className: `${St.chip} ward-connection`, role: "status", children: [
    "Reconnecting ·",
    " ",
    /* @__PURE__ */ n("span", { className: St.noCase, children: Tn(l) })
  ] }) : /* @__PURE__ */ i("span", { className: `${St.chip} ward-connection`, role: "status", children: [
    "Out of date · as of ",
    me(r)
  ] });
}
const Mh = "_root_yylks_2", Ah = "_context_yylks_13", Ih = "_row_yylks_1", Eh = "_heading_yylks_27", Bh = "_headingWrap_yylks_35", Ph = "_meta_yylks_41", jh = "_chips_yylks_49", Dh = "_title_yylks_56", Oh = "_consequence_yylks_66", qh = "_actionsWrap_yylks_73", Hh = "_actions_yylks_73", Fh = "_action_yylks_73", zh = "_overflowPanel_yylks_102", Wh = "_measureClip_yylks_113", Kh = "_measure_yylks_113", G = {
  root: Mh,
  context: Ah,
  row: Ih,
  heading: Eh,
  headingWrap: Bh,
  meta: Ph,
  chips: jh,
  title: Dh,
  consequence: Oh,
  actionsWrap: qh,
  actions: Hh,
  action: Fh,
  overflowPanel: zh,
  measureClip: Wh,
  measure: Kh
};
function Gh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(it, { as: "h1", className: G.title, text: e }) : /* @__PURE__ */ n("h1", { className: G.title, children: e });
}
function Uh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: G.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function Vh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: G.consequence, title: t, children: e }) : null;
}
function Jh({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ i("div", { className: G.meta, children: [
    /* @__PURE__ */ n(Uh, { chips: e }),
    /* @__PURE__ */ n(Vh, { consequence: t, consequenceHint: a })
  ] });
}
function Yh({ title: e, chips: t, consequence: a, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ i("div", { className: G.heading, children: [
    /* @__PURE__ */ n(Gh, { title: e, density: l }),
    /* @__PURE__ */ n(Jh, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function pn({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: G.action, "data-action": "", children: t }, a));
}
function ha({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Xh({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: l }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(ha, { disclosure: l }) : t ? [/* @__PURE__ */ n(ha, { disclosure: l }, "more"), /* @__PURE__ */ n(pn, { actions: e }, "actions")] : /* @__PURE__ */ n(pn, { actions: e });
}
function Qh(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function Zh({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: G.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(pn, { actions: e }) });
}
function em(e, t) {
  const a = y(), [r, l] = v(!1), o = r && e;
  return { disclosure: { open: o, panelId: a, toggle: () => l(!o) }, close: () => {
    var d, u;
    l(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const tm = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function nm(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && tm(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function am({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: G.context, children: /* @__PURE__ */ n(hc, { path: e.path, current: e.current }) });
}
function rm(...e) {
  return e.some((t) => t === null);
}
function lm(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function om(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + lm(e);
}
function im(e, t, a, r, l) {
  if (l === 0 || rm(t, a, r)) return !1;
  const [o, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - om(e, o));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function sm(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function cm(e) {
  return xl(e) && (e.type === "a" || typeof e.props.href == "string");
}
function dm(e, t) {
  return t.length === 0 && e.length === 1 && cm(e[0]);
}
function um(e, t) {
  const a = f(null), r = f(null), l = f(null), o = f(null), [s, c] = v(!1);
  return S(() => {
    const d = a.current;
    if (!sm(d)) return;
    const u = () => c(im(d, r.current, l.current, o.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), o.current && h.observe(o.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: l, measureRef: o, collapsed: s && !t };
}
function hm({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: G.measureClip, children: /* @__PURE__ */ i("div", { className: G.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function mm({ connection: e }) {
  return e ? /* @__PURE__ */ n(On, { connection: e.connection, since: e.since }) : null;
}
function qL({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: l, consequenceHint: o, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: _, headingRef: w, actionsRef: N, measureRef: k, collapsed: M } = um(s, dm(s, c)), D = c.length > 0, { disclosure: _e, close: ae } = em(M || D, N), $e = Qh(c, s, M, u);
  return /* @__PURE__ */ i("header", { className: G.root, "data-density": h, children: [
    /* @__PURE__ */ n(am, { crumb: nm(e, r, t) }),
    /* @__PURE__ */ i("div", { className: G.row, ref: _, children: [
      /* @__PURE__ */ n("div", { ref: w, className: G.headingWrap, children: /* @__PURE__ */ n(Yh, { title: r, chips: a, consequence: l, consequenceHint: o, density: h }) }),
      /* @__PURE__ */ i("div", { className: G.actionsWrap, children: [
        /* @__PURE__ */ n(mm, { connection: d }),
        /* @__PURE__ */ n("div", { className: G.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ n(Xh, { actions: s, hasMore: D, collapsed: M, onOverflow: u, disclosure: _e }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Zh, { actions: $e, disclosure: _e, onEscape: ae }),
    /* @__PURE__ */ n(hm, { actions: s, hasMore: D, measureRef: k })
  ] });
}
const _m = "_root_td96x_2", wm = "_body_td96x_16", ma = {
  root: _m,
  body: wm
};
function HL({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${ma.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: ma.body, children: a }) });
}
const fm = "_tip_1mtdy_2", vm = "_bubble_1mtdy_1", _a = {
  tip: fm,
  bubble: vm
}, ut = 16;
function bm(e, t, a) {
  return e < ut ? ut - e : t > a - ut ? Math.max(a - ut - t, ut - e) : 0;
}
function pm(e) {
  const t = f(null), [a, r] = v(0);
  return Ye(() => {
    const l = t.current;
    if (!e || l === null) {
      r(0);
      return;
    }
    const o = l.getBoundingClientRect();
    r((s) => s + bm(o.left, o.right, window.innerWidth));
  }, [e]), { bubble: t, style: { "--ward-tip-shift": `${a}px` } };
}
function FL({ label: e, text: t, align: a = "center" }) {
  const r = y(), [l, o] = v(!1), s = pm(l), c = (h) => {
    h.key !== "Escape" || !l || (h.stopPropagation(), o(!1));
  }, d = () => o(!0), u = () => o(!1);
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      className: `${_a.tip} ward-infotip`,
      "aria-label": `What ${e} counts`,
      "aria-describedby": r,
      "data-open": l ? "" : void 0,
      "data-align": a,
      onMouseEnter: d,
      onMouseLeave: u,
      onFocus: d,
      onBlur: u,
      onKeyDown: c,
      children: [
        /* @__PURE__ */ i("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": "true", children: [
          /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "9" }),
          /* @__PURE__ */ n("path", { d: "M12 11v5M12 8h.01" })
        ] }),
        /* @__PURE__ */ n("span", { className: _a.bubble, role: "tooltip", id: r, ref: s.bubble, style: s.style, children: t })
      ]
    }
  );
}
const gm = "_row_1jlay_2", ym = {
  row: gm
}, qn = "custom", Nm = [
  { value: "7d", label: "Last 7 days" },
  { value: "4w", label: "Last 4 weeks" },
  { value: "8w", label: "Last 8 weeks" },
  { value: "q", label: "This quarter" },
  { value: qn, label: "Custom range" }
], km = (e) => e.from !== "" && e.to !== "" && e.from <= e.to, $m = (e) => e.from !== "" && e.to !== "" && e.from > e.to, wa = { from: "", to: "" }, Cm = (e, t) => t === null && "preset" in e ? e.preset : qn;
function Sm({ range: e, today: t, setEnd: a }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(E, { kind: "date", label: "From", value: e.from, max: e.to || t, onChange: a("from"), invalid: $m(e) ? "The start is after the end." : void 0 }),
    /* @__PURE__ */ n(E, { kind: "date", label: "To", value: e.to, min: e.from || void 0, max: t, onChange: a("to") })
  ] });
}
function zL({ value: e, onChange: t, today: a }) {
  const [r, l] = v("from" in e ? e : null), o = (c) => {
    if (c === qn) return l(r ?? wa);
    l(null), t({ preset: c });
  }, s = (c) => (d) => {
    const u = { ...r ?? wa, [c]: d };
    l(u), km(u) && t(u);
  };
  return /* @__PURE__ */ i("div", { className: `${ym.row} ward-period`, children: [
    /* @__PURE__ */ n(E, { kind: "select", label: "Period", value: Cm(e, r), options: Nm, onChange: o }),
    r === null ? null : /* @__PURE__ */ n(Sm, { range: r, today: a, setEnd: s })
  ] });
}
const Rm = "_root_bf1pc_2", xm = "_table_bf1pc_9", Tm = "_caption_bf1pc_14", Lm = "_series_bf1pc_23", Mm = "_category_bf1pc_31", Am = "_cell_bf1pc_39", Im = "_track_bf1pc_45", Em = "_lane_bf1pc_52", Bm = "_bar_bf1pc_56", Pm = "_value_bf1pc_63", jm = "_swatch_bf1pc_70", Dm = "_empty_bf1pc_78", X = {
  root: Rm,
  table: xm,
  caption: Tm,
  series: Lm,
  category: Mm,
  cell: Am,
  track: Im,
  lane: Em,
  bar: Bm,
  value: Pm,
  swatch: jm,
  empty: Dm
}, Om = "—", fa = 6;
function qm(e, t) {
  if (t.length < 1 || t.length > fa)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${fa}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function Hm(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function Nr(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function Fm(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function zm({ value: e, top: t, step: a, format: r, missing: l }) {
  const o = Fm(e, t), s = { "--share": `${o}%` };
  return /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ i("span", { className: X.track, children: [
    /* @__PURE__ */ n("span", { className: X.lane, children: o > 0 ? /* @__PURE__ */ n("span", { className: `${X.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: X.value, children: e === null ? l : r(e) })
  ] }) });
}
function Wm({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ i("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: X.swatch, "data-step": Nr(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function Km({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ i("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: X.caption, children: e }),
    /* @__PURE__ */ n("p", { className: X.empty, children: t })
  ] });
}
function Gm({ title: e, categories: t, series: a, top: r, format: l = ne, categoryHead: o = "Category", missing: s = Om }) {
  return /* @__PURE__ */ n("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ i("table", { className: X.table, children: [
    /* @__PURE__ */ n("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: X.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: o }) }),
      /* @__PURE__ */ n(Wm, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: X.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(zm, { value: u.values[d], top: r, step: Nr(h, a.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function WL(e) {
  qm(e.categories, e.series);
  const t = Hm(e.series);
  return t === 0 ? /* @__PURE__ */ n(Km, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Gm, { ...e, top: t });
}
const Um = "_root_1bfqw_2", Vm = "_figure_1bfqw_7", Jm = "_of_1bfqw_13", Ym = "_bar_1bfqw_18", Xm = "_rows_1bfqw_38", Qm = "_row_1bfqw_38", Zm = "_label_1bfqw_49", e_ = "_amount_1bfqw_54", je = {
  root: Um,
  figure: Vm,
  of: Jm,
  bar: Ym,
  rows: Xm,
  row: Qm,
  label: Zm,
  amount: e_
};
function t_({ spent: e, ceiling: t, breakdown: a }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ i("div", { className: `${je.root} ward-costmeter`, children: [
    /* @__PURE__ */ i("p", { className: `${je.figure} ward-stat-value`, children: [
      le(e),
      " ",
      /* @__PURE__ */ i("span", { className: je.of, children: [
        "of ",
        le(t)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${je.bar} ward-costbar`,
        min: 0,
        max: t,
        value: e,
        "aria-valuetext": `${le(e)} of ${le(t)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    a && /* @__PURE__ */ n("ul", { className: je.rows, children: a.map((l) => /* @__PURE__ */ i("li", { className: `${je.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: je.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: je.amount, children: le(l.amount) })
    ] }, l.label)) })
  ] });
}
const n_ = "_frame_f7bxz_2", a_ = "_table_f7bxz_6", r_ = "_th_f7bxz_12", l_ = "_td_f7bxz_13", o_ = "_sort_f7bxz_53", i_ = "_row_f7bxz_65", s_ = "_empty_f7bxz_73", He = {
  frame: n_,
  table: a_,
  th: r_,
  td: l_,
  sort: o_,
  row: i_,
  empty: s_
}, c_ = { asc: "ascending", desc: "descending" };
function d_(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return c_[t.direction];
}
function u_(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: He.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function h_(e) {
  return e === void 0 ? void 0 : { width: e };
}
function m_({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: He.th,
      style: h_(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": d_(e, t),
      children: u_(e, a)
    }
  );
}
function __({ row: e, props: t }) {
  const a = t.rowId(e), r = (t.lockedIds ?? []).includes(a);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: He.row,
      "data-selected": a === t.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: t.columns.map((l) => /* @__PURE__ */ n(
        "td",
        {
          className: He.td,
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
function w_({
  label: e,
  columns: t,
  rows: a,
  rowId: r,
  renderCell: l,
  selectedId: o,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u,
  narrow: h
}) {
  return a.length === 0 ? /* @__PURE__ */ n("div", { className: He.empty, children: u }) : /* @__PURE__ */ n("div", { className: He.frame, "data-narrow": h, children: /* @__PURE__ */ i("table", { className: He.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: He.head, children: t.map((_) => /* @__PURE__ */ n(m_, { column: _, sort: c, onSort: d }, _.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((_) => /* @__PURE__ */ n(__, { row: _, props: { label: e, columns: t, rows: a, rowId: r, renderCell: l, selectedId: o, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(_))) })
  ] }) });
}
const f_ = "_list_v0s52_2", v_ = {
  list: f_
};
function b_({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: v_.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const p_ = "_label_1u62a_2", g_ = {
  label: p_
};
function KL({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: g_.label, children: t.header }) }, t.key)) }) });
}
const y_ = "_stack_bp6a0_2", N_ = {
  stack: y_
};
function GL({ children: e }) {
  return /* @__PURE__ */ n("span", { className: N_.stack, "data-ward-action-stack": "", children: e });
}
const k_ = "_set_1z0sq_2", $_ = "_legend_1z0sq_7", C_ = "_row_1z0sq_15", S_ = "_control_1z0sq_20", R_ = "_input_1z0sq_26", x_ = "_label_1z0sq_31", T_ = "_consequence_1z0sq_36", Ge = {
  set: k_,
  legend: $_,
  row: C_,
  control: S_,
  input: R_,
  label: x_,
  consequence: T_
};
function kr({ legend: e, options: t, value: a, onChange: r, disabled: l, name: o, describedBy: s, variant: c }) {
  const d = y(), u = o ?? d;
  return /* @__PURE__ */ i("fieldset", { className: Ge.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: Ge.legend, children: e }),
    t.map((h) => {
      const _ = `${u}-${h.value}`, w = h.consequence ? `${_}-note` : void 0;
      return /* @__PURE__ */ i("div", { className: Ge.row, children: [
        /* @__PURE__ */ i("span", { className: Ge.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: _,
              type: "radio",
              name: u,
              className: Ge.input,
              value: h.value,
              checked: a === h.value,
              disabled: l,
              "aria-describedby": ct(w, s),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: _, className: Ge.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: w, className: `${Ge.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const L_ = "_root_11gpw_2", M_ = "_head_11gpw_10", A_ = "_note_11gpw_29", I_ = "_index_11gpw_34", E_ = "_dot_11gpw_38", B_ = "_counter_11gpw_49", P_ = "_trailing_11gpw_57", Ve = {
  root: L_,
  head: M_,
  note: A_,
  index: I_,
  dot: E_,
  counter: B_,
  trailing: P_
};
function j_({ index: e }) {
  return e ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ve.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ve.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function D_({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ve.counter, "aria-hidden": "true", children: e }) : null;
}
function va({ title: e, index: t, note: a, counter: r, kind: l = "micro", trailing: o }) {
  return /* @__PURE__ */ i("div", { className: `${Ve.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ i("h2", { className: Ve.head, children: [
      /* @__PURE__ */ n(j_, { index: t }),
      e,
      r && /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ve.note, children: a }),
    /* @__PURE__ */ n(D_, { counter: r }),
    o === void 0 ? null : /* @__PURE__ */ n("span", { className: Ve.trailing, children: o })
  ] });
}
const O_ = "_strip_c3x3u_2", q_ = "_cell_c3x3u_7", H_ = "_value_c3x3u_12", F_ = "_link_c3x3u_29", z_ = "_label_c3x3u_49", W_ = "_tiles_c3x3u_101", ze = {
  strip: O_,
  cell: q_,
  value: H_,
  link: F_,
  label: z_,
  tiles: W_
};
function $r(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Cr = (e) => `${ze.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function K_({ cell: e }) {
  return /* @__PURE__ */ i("div", { className: ze.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: Cr(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${ze.label} ward-stat-label`, children: e.label })
  ] });
}
function G_({ cell: e, href: t }) {
  return /* @__PURE__ */ i("div", { className: ze.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: Cr(e), title: e.hint, children: /* @__PURE__ */ i("a", { className: `${ze.link} ward-stat-link`, href: T(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${ze.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Sr = (e) => e.href === void 0 ? /* @__PURE__ */ n(K_, { cell: e }, e.label) : /* @__PURE__ */ n(G_, { cell: e, href: e.href }, e.label);
function Zt({ cells: e, divided: t = !1 }) {
  return $r("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${ze.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(Sr) });
}
const ba = 6;
function UL({ cells: e }) {
  $r("StatTiles", e, [1, 2 * ba]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, ba) };
  return /* @__PURE__ */ n("dl", { className: `${ze.tiles} ward-stattiles`, style: t, children: e.map(Sr) });
}
const U_ = "_root_1eb1u_2", V_ = "_track_1eb1u_8", J_ = "_thumb_1eb1u_46", Y_ = "_labelHidden_1eb1u_64", X_ = "_label_1eb1u_64", ot = {
  root: U_,
  track: V_,
  thumb: J_,
  labelHidden: Y_,
  label: X_
};
function Q_(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function Z_(e) {
  return e ? `${ot.label} ${ot.labelHidden}` : ot.label;
}
function ew(e, t, a) {
  return e && !t && a ? a : void 0;
}
function tw(e, t, a, r) {
  return { "aria-describedby": Xt(ct(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function nw({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Xe({ label: e, checked: t, onChange: a, disabled: r, locked: l, describedBy: o, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, _ = Pe(), { on: w, off: N } = Q_(t, r, l, _ !== null), k = ew(N, _ !== null, c);
  return /* @__PURE__ */ i("span", { className: `${ot.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": w,
        "aria-label": e,
        "aria-labelledby": d,
        ...tw(h, o, _, k),
        className: `${ot.track} ward-switch`,
        "data-on": w,
        "data-locked": l ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!w)),
        children: /* @__PURE__ */ n("span", { className: ot.thumb })
      }
    ),
    /* @__PURE__ */ n("label", { id: d, htmlFor: u, className: Z_(s), children: e }),
    /* @__PURE__ */ n(nw, { id: h, reason: k })
  ] });
}
const aw = "_bar_1vp69_2", rw = "_skip_1vp69_11", lw = "_mark_1vp69_22", ow = "_nav_1vp69_30", iw = "_list_1vp69_34", sw = "_select_1vp69_41", cw = "_selectTrigger_1vp69_45", dw = "_dest_1vp69_52", uw = "_actor_1vp69_71", hw = "_actorMark_1vp69_84", mw = "_actorLabel_1vp69_89", _w = "_tagline_1vp69_108", ce = {
  bar: aw,
  skip: rw,
  mark: lw,
  nav: ow,
  list: iw,
  select: sw,
  selectTrigger: cw,
  dest: dw,
  actor: uw,
  actorMark: hw,
  actorLabel: mw,
  tagline: _w
};
function ww(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function fw(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function VL({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: l, onNavigate: o, skipTo: s = "main" }) {
  const c = fw(r);
  return /* @__PURE__ */ i("header", { className: ce.bar, children: [
    /* @__PURE__ */ n("a", { className: `${ce.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: ce.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: ce.tagline, children: l }),
    /* @__PURE__ */ i("nav", { className: ce.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: ce.list, children: t.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${ce.dest} ward-target`,
          href: T(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => o == null ? void 0 : o(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        sr,
        {
          className: ce.select,
          triggerClassName: ce.selectTrigger,
          "aria-label": "Destination",
          value: a,
          options: t.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => o == null ? void 0 : o(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ i("span", { className: ce.actor, children: [
      /* @__PURE__ */ n("span", { className: ce.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: ce.actorMark, "aria-hidden": "true", children: ww(c) })
    ] })
  ] });
}
const vw = "_tree_zzoob_2", bw = "_item_zzoob_6", pw = "_row_zzoob_10", gw = "_button_zzoob_22", Ht = {
  tree: vw,
  item: bw,
  row: pw,
  button: gw
}, Rr = ke(null);
function yw({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Jt({ orientation: "vertical" });
  return /* @__PURE__ */ n(Rr.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: Ht.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const Nw = { ArrowRight: !0, ArrowLeft: !1 };
function pa(e) {
  return e ? !0 : void 0;
}
function kw(e, t) {
  const a = Nw[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function $w(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function Cw(e) {
  const t = [Ht.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function Sw(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Rw(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function xw(e) {
  return typeof e == "string" ? e : void 0;
}
function Tw({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Lw({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function xr(e) {
  const t = Ne(Rr);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = Sw(e);
  return /* @__PURE__ */ i("li", { className: Ht.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Cw(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": pa(e.unresolved),
        "data-inherited": pa(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: `${Ht.button} ward-treeitem-btn`,
            onClick: () => $w(e),
            onKeyDown: (r) => kw(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Rw(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: xw(e.label), children: e.label }),
              /* @__PURE__ */ n(Tw, { value: e.detail }),
              /* @__PURE__ */ n(Lw, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Mw = "_frame_gxspk_2", Aw = "_subjectRail_gxspk_22", Iw = "_subject_gxspk_22", Ew = "_rail_gxspk_42", Bw = "_record_gxspk_57", Pw = "_recordBody_gxspk_102", jw = "_stageGrid_gxspk_157", Dw = "_band_gxspk_171", Ow = "_bandBody_gxspk_179", qw = "_bandActions_gxspk_184", Hw = "_scroller_gxspk_192", Fw = "_board_gxspk_219", zw = "_lanes_gxspk_228", Ww = "_cardGrid_gxspk_262", Q = {
  frame: Mw,
  subjectRail: Aw,
  subject: Iw,
  rail: Ew,
  record: Bw,
  recordBody: Pw,
  stageGrid: jw,
  band: Dw,
  bandBody: Ow,
  bandActions: qw,
  scroller: Hw,
  board: Fw,
  lanes: zw,
  cardGrid: Ww
};
function JL({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: Q.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function ga(e) {
  return e ? "true" : void 0;
}
function YL({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: l, ruled: o }) {
  return /* @__PURE__ */ i("div", { className: Q.subjectRail, "data-ward-subject-rail": a, "data-ruled": ga(o), children: [
    /* @__PURE__ */ n("div", { className: Q.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: Q.rail, "data-sticky": ga(l), "aria-label": r, children: t })
  ] });
}
function XL({ title: e, children: t, note: a, trailing: r, pad: l = "block", label: o, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: Q.record, "aria-label": o, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(va, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ i("section", { className: Q.record, "aria-label": o, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(va, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: Q.recordBody, "data-pad": l, "data-measure": c, children: t })
  ] });
}
const Kw = "_form_1j8ub_2", Gw = "_fields_1j8ub_9", Uw = "_actions_1j8ub_19", sn = {
  form: Kw,
  fields: Gw,
  actions: Uw
};
function QL({ label: e, children: t, actions: a, onSubmit: r }) {
  const l = (o) => {
    o.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ i("form", { className: sn.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: sn.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: sn.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function ZL({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ i("section", { className: Q.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: Q.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: Q.bandActions, children: t })
  ] });
}
const Vw = "(max-width: 767.98px)";
function Hn({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(In, { className: Q.scroller, label: e, count: a ?? Ha.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function Jw({ lanes: e, label: t, laneLabel: a }) {
  const [r, l] = v(null), o = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ i("div", { className: Q.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(E, { kind: "select", label: a, value: (o == null ? void 0 : o.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Hn, { label: t, children: o == null ? void 0 : o.content })
  ] });
}
function Yw({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: Q.board, "data-ward-board": "", children: /* @__PURE__ */ n(Hn, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(qa, { children: a.content }, a.id)) }) });
}
function e3({ children: e, label: t = "Board", lanes: a, laneLabel: r = "Column" }) {
  const l = bt(Vw);
  return a === void 0 ? /* @__PURE__ */ n(Hn, { label: t, children: e }) : l ? /* @__PURE__ */ n(Jw, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(Yw, { lanes: a, label: t });
}
function t3({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), o = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ n(In, { className: Q.stageGrid, label: a, count: l, "data-ward-stage-grid": "", "data-floor": r, style: o, children: t });
}
function n3({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${Q.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const Xw = "_block_6tv5x_3", Qw = "_sentence_6tv5x_10", Zw = "_meta_6tv5x_19", ef = "_ways_6tv5x_24", tf = "_action_6tv5x_38", nf = "_strip_6tv5x_42", af = "_loading_6tv5x_61", rf = "_label_6tv5x_69", lf = "_counter_6tv5x_76", ve = {
  block: Xw,
  sentence: Qw,
  meta: Zw,
  ways: ef,
  action: tf,
  strip: nf,
  loading: af,
  label: rf,
  counter: lf
};
function of({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: ve.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function en({ sentence: e, action: t, children: a, role: r = "status", tone: l, kind: o, ask: s }) {
  return /* @__PURE__ */ i("div", { className: `${ve.block} ward-state${o === void 0 ? "" : ` ${o}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ i("p", { className: ve.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ i(x, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(of, { action: t })
  ] });
}
function sf(e) {
  return /* @__PURE__ */ n(en, { ...e, kind: "ward-emptystate" });
}
function a3({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(en, { sentence: e, action: a, children: /* @__PURE__ */ i("p", { className: ve.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function cf({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${ve.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function r3({ ways: e, ...t }) {
  return /* @__PURE__ */ n(en, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(cf, { ways: e }) });
}
function l3({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(en, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ i("p", { className: ve.meta, children: [
    "failed at ",
    me(t)
  ] }) });
}
function o3({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ i("div", { className: ve.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    me(e),
    ". Showing snapshot from ",
    me(t)
  ] });
}
function i3({ queued: e, since: t }) {
  return /* @__PURE__ */ i("div", { className: ve.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    me(t)
  ] });
}
function s3({ label: e, startedAt: t }) {
  const a = f(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = v(!1);
  S(() => {
    const s = window.setTimeout(() => l(!0), pe.load);
    return () => window.clearTimeout(s);
  }, []);
  const o = Mn(a.current, r);
  return /* @__PURE__ */ i("div", { className: `${ve.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: ve.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: ve.counter, children: Tn(o) }) : null
  ] });
}
const df = "_note_cigdt_2", uf = {
  note: df
};
function hf({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ i("p", { className: uf.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const mf = "_card_k7btg_3", _f = "_hit_k7btg_31", wf = "_head_k7btg_44", ff = "_title_k7btg_51", vf = "_meta_k7btg_57", bf = "_since_k7btg_66", pf = "_sep_k7btg_76", gf = "_fields_k7btg_80", yf = "_field_k7btg_80", Nf = "_last_k7btg_98", kf = "_reason_k7btg_110", he = {
  card: mf,
  hit: _f,
  head: wf,
  title: ff,
  meta: vf,
  since: bf,
  sep: pf,
  fields: gf,
  field: yf,
  last: Nf,
  reason: kf
}, $f = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Cf(e, t, a) {
  const r = It(e, "blue"), l = It(e, "orange"), o = It(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: l, green: o };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = $f[d.type];
      u && c[u]();
    });
  }, [r, a, o, t, l]);
}
const Sf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Rf(e, t) {
  return Sf[t](e);
}
function xf({ item: e, connection: t }) {
  const a = /* @__PURE__ */ n("span", { className: he.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ i("p", { className: he.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    a,
    /* @__PURE__ */ n(Be, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ i("p", { className: he.meta, "data-ward-card-meta": "", children: [
    e.waitsOn && /* @__PURE__ */ i(x, { children: [
      "waits on ",
      e.waitsOn,
      a
    ] }),
    /* @__PURE__ */ i("span", { className: he.since, children: [
      se(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Tf({ item: e }) {
  const t = e.run ? { role: "running", label: "Running" } : e.state;
  return /* @__PURE__ */ i("div", { className: he.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Off plan" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function Lf({ reason: e }) {
  return e ? /* @__PURE__ */ i("p", { className: he.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Mf({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: he.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: he.field, children: Rf(e, a) }, a)) });
}
const gn = (e) => e ? !0 : void 0;
function Af(e) {
  return { "--stream": ye(e.streamStep, "id") };
}
function If(e, t, a) {
  e == null || e(t, a);
}
function Ef(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Bf({ item: e, stale: t }) {
  var r, l;
  const a = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: he.last, "data-stale": gn(t), children: a }) : null;
}
function tn(e) {
  const t = e.fields ?? [], a = e.item, r = f(null);
  Cf(r, a.key, e.feed);
  const l = Ef(e.feed), o = Af(a);
  return /* @__PURE__ */ i(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: he.card,
      style: o,
      "data-selected": gn(e.selected),
      "data-flagged": gn(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: he.hit, onClick: (s) => If(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(Tf, { item: a }),
        /* @__PURE__ */ n(it, { as: "p", className: he.title, text: a.title }),
        /* @__PURE__ */ n(xf, { item: a, connection: l }),
        /* @__PURE__ */ n(Lf, { reason: a.blockedReason }),
        /* @__PURE__ */ n(Mf, { item: a, fields: t }),
        /* @__PURE__ */ n(Bf, { item: a, stale: l === "stale" })
      ]
    }
  );
}
function Nt(e, t) {
  return e.trim().toLowerCase() === t.toLowerCase();
}
const Pf = "_column_1j8bi_3", jf = "_head_1j8bi_21", Df = "_label_1j8bi_30", Of = "_count_1j8bi_39", qf = "_list_1j8bi_53", ft = {
  column: Pf,
  head: jf,
  label: Df,
  count: Of,
  list: qf
};
function Tr(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function Hf({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ i("div", { className: ft.head, children: [
    /* @__PURE__ */ n("h2", { className: ft.label, id: a, title: e.label, children: e.label }),
    e.gate && !Nt(e.label, "Review") && /* @__PURE__ */ n(m, { role: "gate", label: "Review" }),
    /* @__PURE__ */ i("span", { className: ft.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Ff(e) {
  return /* @__PURE__ */ n("div", { className: ft.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      tn,
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
function zf({ column: e, items: t, fields: a, sort: r, onOpen: l, selectedKey: o, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && t.length > e.cap, _ = Tr(t, r);
  return /* @__PURE__ */ i("section", { className: ft.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Hf, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(Ff, { column: e, items: t, fields: a, sort: r, onOpen: l, selectedKey: o, feed: s, roving: c, rows: _ }),
    h && /* @__PURE__ */ n(hf, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const Wf = "_foot_cs4jr_2", Kf = "_note_cs4jr_13", Gf = "_link_cs4jr_19", cn = {
  foot: Wf,
  note: Kf,
  link: Gf
};
function c3({ configureHref: e }) {
  return /* @__PURE__ */ i("footer", { className: cn.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: cn.note, children: "Filters you set are not saved." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${cn.link} ward-target`, href: T(e), children: "Configure board" })
  ] });
}
const Uf = "_head_1tfi5_3", Vf = "_identity_1tfi5_12", Jf = "_titleRow_1tfi5_18", Yf = "_title_1tfi5_18", Xf = "_key_1tfi5_35", Qf = "_rollup_1tfi5_45", Zf = "_tools_1tfi5_53", ev = "_swatch_1tfi5_101", tv = "_mark_1tfi5_108", xe = {
  head: Uf,
  identity: Vf,
  titleRow: Jf,
  title: Yf,
  key: Xf,
  rollup: Qf,
  tools: Zf,
  swatch: ev,
  mark: tv
}, ya = "initials:";
function nv(e) {
  return e === void 0 ? "done this week unknown" : `${ne(e)} done this week`;
}
function av(e) {
  const t = [nv(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ne(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${se(e.p90)}`), t.join(" · ");
}
function rv(e) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ i("span", { title: e.inFlightHint, children: [
      ne(e.inFlight),
      " open"
    ] }),
    " · ",
    av(e)
  ] });
}
function lv(e) {
  return e.startsWith(ya) ? e.slice(ya.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function ov({ markRef: e, streamStep: t }) {
  const a = { "--stream": ye(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${xe.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: lv(e) }) : /* @__PURE__ */ n("span", { className: xe.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function iv({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(E, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function d3({
  stream: e,
  rollups: t,
  connection: a,
  lastEventAt: r,
  owners: l,
  owner: o,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ i("div", { className: xe.head, children: [
    /* @__PURE__ */ i("div", { className: xe.identity, children: [
      /* @__PURE__ */ i("div", { className: xe.titleRow, children: [
        /* @__PURE__ */ n(ov, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: xe.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: xe.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: xe.rollup, "aria-live": "polite", children: rv(t) })
    ] }),
    /* @__PURE__ */ i("div", { className: xe.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(iv, { owners: l, owner: o, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(On, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const sv = "_head_1sejb_14", cv = "_line_1sejb_15", dv = "_cHandle_1sejb_36", uv = "_cName_1sejb_41", hv = "_nameLine_1sejb_49", mv = "_cLabel_1sejb_56", _v = "_cCap_1sejb_61", wv = "_cShown_1sejb_66", fv = "_name_1sejb_49", vv = "_noCap_1sejb_88", bv = "_state_1sejb_102", pv = "_handle_1sejb_111", q = {
  head: sv,
  line: cv,
  cHandle: dv,
  cName: uv,
  nameLine: hv,
  cLabel: mv,
  cCap: _v,
  cShown: wv,
  name: fv,
  noCap: vv,
  state: bv,
  handle: pv
}, gv = "Review stages always show.", yv = "Done stages are counted, not shown.";
function u3() {
  return /* @__PURE__ */ i("div", { className: q.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: q.cHandle }),
    /* @__PURE__ */ n("span", { className: q.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: q.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: q.cShown, children: "Shown" })
  ] });
}
function Nv(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function kv(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function $v({ stage: e }) {
  return /* @__PURE__ */ n("span", { className: q.cName, children: /* @__PURE__ */ i("span", { className: q.nameLine, children: [
    /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
    e.gate && !Nt(e.name, "Review") && /* @__PURE__ */ n(m, { role: "gate", label: "Review", size: "tag" })
  ] }) });
}
function Cv(e) {
  return e === void 0 ? "" : String(e);
}
function Sv(e) {
  return e === "" ? void 0 : Number(e);
}
function Rv({ name: e, onReorder: t }) {
  const a = Pe();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ n("span", { className: q.cHandle }) : /* @__PURE__ */ n("span", { className: q.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: q.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && kv(r, t),
      children: "⠿"
    }
  ) });
}
function xv({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${q.cCap} ${q.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: q.cCap, children: /* @__PURE__ */ n(E, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Cv(t.cap), onChange: (r) => a({ ...t, cap: Sv(r) }) }) });
}
function Tv(e) {
  return e.gate ? gv : e.terminal ? yv : void 0;
}
function Lv({ stage: e, config: t, onChange: a }) {
  const r = Pe() !== null, l = Nv(e, t.shown), o = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ i("span", { className: q.cShown, children: [
    /* @__PURE__ */ n(Xe, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, disabledReason: Tv(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: q.state, "data-fixed": o || void 0, "aria-hidden": "true", onClick: () => !o && s(!l.shown), children: l.state })
  ] });
}
function Mv(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function h3({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ i("div", { className: q.line, "data-kind": Mv(e), children: [
    /* @__PURE__ */ n(Rv, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n($v, { stage: e }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: /* @__PURE__ */ n(E, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (l) => a({ ...t, label: l }) }) }),
    /* @__PURE__ */ n(xv, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(Lv, { stage: e, config: t, onChange: a })
  ] });
}
const Av = "_body_8qsv9_2", Iv = "_head_8qsv9_9", Ev = "_summary_8qsv9_19", Bv = "_block_8qsv9_20", Pv = "_actionsBlock_8qsv9_21", jv = "_title_8qsv9_41", Dv = "_note_8qsv9_46", Ov = "_k_8qsv9_51", qv = "_kv_8qsv9_58", Hv = "_row_8qsv9_64", Fv = "_label_8qsv9_75", zv = "_value_8qsv9_84", Wv = "_quote_8qsv9_90", Kv = "_actions_8qsv9_21", Gv = "_resolve_8qsv9_111", z = {
  body: Av,
  head: Iv,
  summary: Ev,
  block: Bv,
  actionsBlock: Pv,
  title: jv,
  note: Dv,
  k: Ov,
  kv: qv,
  row: Hv,
  label: Fv,
  value: zv,
  quote: Wv,
  actions: Kv,
  resolve: Gv
};
function Uv(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Vv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Be, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Jv(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function Yv(e, t, a) {
  return [
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Uv(e),
    ...Jv(a),
    ...Vv(e, t)
  ];
}
function Xv({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ i("section", { className: z.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: z.k, children: t }),
    e
  ] });
}
function Qv(e) {
  return e.run ? { role: "running", label: "Running" } : e.state;
}
function Zv({ item: e, showKey: t }) {
  const a = Qv(e);
  return !t && !a ? null : /* @__PURE__ */ i("div", { className: z.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function eb({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ i("div", { className: z.block, children: [
    /* @__PURE__ */ n("p", { className: z.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: z.note, children: e.agentMeta })
  ] }) : null;
}
function m3({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: l, resolve: o, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), _ = Yv(e, l, d);
  return /* @__PURE__ */ n(dt, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ i("div", { className: z.body, children: [
    /* @__PURE__ */ n(Zv, { item: e, showKey: u }),
    /* @__PURE__ */ i("div", { className: z.summary, children: [
      /* @__PURE__ */ n("h2", { className: z.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: z.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: z.kv, children: _.map(([w, N, k]) => /* @__PURE__ */ i("div", { className: z.row, children: [
      /* @__PURE__ */ n("dt", { className: z.label, children: w }),
      /* @__PURE__ */ n("dd", { className: z.value, children: N })
    ] }, k ?? w)) }),
    /* @__PURE__ */ n(eb, { item: e }),
    /* @__PURE__ */ i("div", { className: z.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: z.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: z.note, children: c })
    ] }),
    /* @__PURE__ */ n(Xv, { resolve: o, label: s ?? "Next steps" })
  ] }) });
}
const tb = "_root_3azmy_2", nb = "_list_3azmy_7", ab = "_item_3azmy_12", rb = "_box_3azmy_18", lb = "_text_3azmy_23", ob = "_note_3azmy_28", Ze = {
  root: tb,
  list: nb,
  item: ab,
  box: rb,
  text: lb,
  note: ob
};
function nn({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ i("div", { className: Ze.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${Ze.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ i("li", { className: `${Ze.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ze.box, children: /* @__PURE__ */ n(Dn, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Ze.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${Ze.note} ward-checklist-note`, children: t })
  ] });
}
const ib = "_rail_znbbp_2", sb = "_k_znbbp_11", cb = "_head_znbbp_19", db = "_section_znbbp_25", ub = "_card_znbbp_39", hb = "_strip_znbbp_46", mb = "_skeleton_znbbp_60", _b = "_skeletonLabel_znbbp_74", wb = "_bar_znbbp_80", fb = "_note_znbbp_89", de = {
  rail: ib,
  k: sb,
  head: cb,
  section: db,
  card: ub,
  strip: hb,
  skeleton: mb,
  skeletonLabel: _b,
  bar: wb,
  note: fb
};
function vb(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Lr({ title: e, children: t }) {
  return /* @__PURE__ */ i("section", { className: de.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: de.k, children: e }),
    t
  ] });
}
function bb({ effects: e }) {
  const t = e.filter((a) => !a.met);
  return t.length === 0 ? null : /* @__PURE__ */ n(Lr, { title: "Warnings", children: /* @__PURE__ */ n(nn, { items: t, density: "compact" }) });
}
function pb({ column: e, count: t }) {
  return /* @__PURE__ */ i("div", { className: de.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: de.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: de.bar, "aria-hidden": "true" }, r))
  ] });
}
function gb({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(zf, { column: l, items: t.filter((o) => o.stage === l.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, l.id));
}
function yb(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(gb, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(pb, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function _3(e) {
  const t = vb(e.onOpen), a = Tr(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ i("aside", { className: de.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${de.k} ${de.head}`, children: "Preview" }),
    /* @__PURE__ */ n("section", { className: de.section, "aria-label": "Card", children: /* @__PURE__ */ n("div", { className: de.card, children: a && /* @__PURE__ */ n(tn, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ i(Lr, { title: "Columns", children: [
      /* @__PURE__ */ n("div", { className: de.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(yb, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: de.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(bb, { effects: e.effects })
  ] });
}
function Nb(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function kb(e) {
  return Math.ceil(e.length / 2);
}
function $b(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Mr(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Cb(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const l = Mr(e);
  l !== void 0 && a(l), r($b(e.type));
}
function Sb(e, t, a, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (o) => Cb(o, a, r, l));
  }, [e, t, a, r, l]);
}
function Rb(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function xb(e, t) {
  return t ? { role: "running", label: "Running" } : e.state ?? { role: "pending", label: e.key };
}
function Tb(e, t) {
  return t !== void 0 ? se(e.timeInStage) + " · waits on " + t.agent : e.waitsOn ? se(e.timeInStage) + " · waits on " + e.waitsOn : se(e.timeInStage) + " in stage";
}
function Lb(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + P.height.card + " + " + P.height.cardRow + " * " + String(kb(t ?? [])) + ")"
  };
}
function Mb(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Ab(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: le(e.cost) }) : null;
}
function Ib(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Eb(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Be, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function Bb(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function Pb(e, t) {
  return t === void 0 ? e : Nb(e, t.ref);
}
function jb(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function pt(e) {
  return e === !0 ? "true" : void 0;
}
function Ar(e) {
  const t = e.item, a = t.run, r = a !== void 0, l = f(null), o = It(l), s = f(/* @__PURE__ */ new Set()), [c, d] = v(Rb(t));
  Sb(e.feed, t.key, s, d, o);
  const u = xb(t, r), h = Tb(t, a), _ = Lb(t, e.fields), w = Bb(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      ...jb(e),
      className: "ward-workcard",
      "data-flagged": pt(t.flagged),
      "data-selected": pt(e.selected),
      style: _,
      ref: Pb(l, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        Mb(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          Ab(t, e.fields),
          Ib(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ i("span", { className: "ward-workcard-lastrow", children: [
          Eb(a, c, e.connection, t.changedAt),
          w !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: w, children: w }) : null
        ] })
      ]
    }
  ) });
}
function Db({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function Ob(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function qb(e, t, a) {
  return /* @__PURE__ */ i("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Review" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function Hb(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Db, { count: e.items.length, cap: e.column.cap });
}
function Fb(e, t) {
  return e.roving ?? t;
}
function zb(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function Wb(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    Ar,
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
function Kb(e) {
  const t = y(), a = Jt({ orientation: "vertical" }), r = Fb(e, a), l = Ob(e);
  return /* @__PURE__ */ i("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": pt(l), "data-gate": pt(e.column.gate), children: [
    qb(e.column, e.items.length, t),
    Hb(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...zb(e, a), children: Wb(e, r) })
  ] });
}
function Gb(e) {
  let t = String(e.inFlight) + " open · " + String(e.loadedThisWeek) + " done this week · " + String(e.agentsWorking) + (e.agentsWorking === 1 ? " agent working" : " agents working");
  return e.p50 !== void 0 && (t += " · p50 " + se(e.p50)), e.p90 !== void 0 && (t += " · p90 " + se(e.p90)), t;
}
function Ub(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(E, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function Vb(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function w3(e) {
  return /* @__PURE__ */ i("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ i("div", { children: [
      /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Gb(e.rollups) })
    ] }),
    /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
      Ub(e),
      Vb(e.onConfigure),
      /* @__PURE__ */ n(On, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Jb(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Yb(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Xe, { label: e.stage.name, checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Xe, { label: e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function Xb(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ i(x, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + (t === 1 ? " agent" : " agents") }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Done" }) : null
  ] });
}
function f3(e) {
  const t = e.stage;
  return /* @__PURE__ */ i("div", { className: "ward-configrow", "data-mandatory": pt(Jb(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Yb(e) }),
    /* @__PURE__ */ n(E, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(er, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Xb(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function v3(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ i("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(Ar, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Kb, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ i("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function Qb(e, t) {
  const a = Mr(e);
  a !== void 0 && t(a);
}
function Zb(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => Qb(r, a));
  }, [e, t, a]);
}
function ep(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function tp(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function np(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Be, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function ap(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function b3(e) {
  var s;
  const t = e.item, a = t.run, [r, l] = v((s = t.run) == null ? void 0 : s.lastStep);
  Zb(e.feed, t.key, l);
  const o = [...ep(t), ...tp(t)];
  return /* @__PURE__ */ i(dt, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ i("dl", { className: "ward-kv", children: [
      o.map((c) => /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      np(a, r)
    ] }),
    ap(t, e.actions)
  ] });
}
const rp = "_card_1nkkx_3", lp = "_head_1nkkx_30", op = "_mark_1nkkx_38", ip = "_name_1nkkx_50", sp = "_chips_1nkkx_71", cp = "_description_1nkkx_77", dp = "_run_1nkkx_82", up = "_sep_1nkkx_91", hp = "_facts_1nkkx_97", mp = "_fact_1nkkx_97", _p = "_factLabel_1nkkx_111", wp = "_factValue_1nkkx_115", ie = {
  card: rp,
  head: lp,
  mark: op,
  name: ip,
  chips: sp,
  description: cp,
  run: dp,
  sep: up,
  facts: hp,
  fact: mp,
  factLabel: _p,
  factValue: wp
}, fp = { live: "done", draft: "running", paused: "meta" };
function vp(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function bp({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: fp[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function pp({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function gp({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ i("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Be, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function yp({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ i("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function Np(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function kp({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: l, facts: o, className: s }) {
  const c = { "--stream": ye(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ i(
    "article",
    {
      "aria-current": d,
      className: vp(s),
      style: c,
      "data-selected": d,
      "data-paused": Np(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ i("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: T(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(pp, { description: e.description }),
        /* @__PURE__ */ n(gp, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(bp, { versions: e.versions }),
        /* @__PURE__ */ n(yp, { facts: o })
      ]
    }
  );
}
const $p = "_list_4dcyc_2", Cp = "_row_4dcyc_11", Sp = "_head_4dcyc_23", Rp = "_id_4dcyc_30", xp = "_lock_4dcyc_35", Tp = "_reason_4dcyc_41", Lp = "_remove_4dcyc_46", Mp = "_clauses_4dcyc_50", Ap = "_clause_4dcyc_50", Ip = "_label_4dcyc_64", Ep = "_cell_4dcyc_71", Bp = "_value_4dcyc_76", ue = {
  list: $p,
  row: Cp,
  head: Sp,
  id: Rp,
  lock: xp,
  reason: Tp,
  remove: Lp,
  clauses: Mp,
  clause: Ap,
  label: Ip,
  cell: Ep,
  value: Bp
}, Ir = ke(!1);
function p3({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(Ir.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ue.list, "aria-label": t, children: e }) });
}
function Pp({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ue.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(E, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => a(e.key, l) });
}
function jp({ reason: e }) {
  return /* @__PURE__ */ i("span", { className: ue.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ue.reason, children: e })
  ] });
}
function Dp({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ i("span", { className: ue.head, children: [
    /* @__PURE__ */ n("span", { className: ue.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(jp, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ue.remove, children: /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Na(e, t) {
  return e.locked ? void 0 : t;
}
function g3({ rule: e, onChange: t, onRemove: a }) {
  if (!Ne(Ir)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Na(e, t);
  return /* @__PURE__ */ i("li", { className: ue.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Dp, { rule: e, onRemove: Na(e, a) }),
    /* @__PURE__ */ n("dl", { className: ue.clauses, children: e.clauses.map((l) => /* @__PURE__ */ i("div", { className: ue.clause, children: [
      /* @__PURE__ */ n("dt", { className: ue.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ue.cell, children: /* @__PURE__ */ n(Pp, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Op = "_ladder_1xdeh_2", qp = "_cell_1xdeh_7", Hp = "_empty_1xdeh_26", Fp = "_name_1xdeh_34", zp = "_holder_1xdeh_40", Wp = "_swatches_1xdeh_51", Kp = "_swatch_1xdeh_51", Gp = "_tilesFrame_1xdeh_78", Up = "_tiles_1xdeh_78", Vp = "_tile_1xdeh_78", Jp = "_bar_1xdeh_117", Yp = "_hex_1xdeh_128", Xp = "_note_1xdeh_138", oe = {
  ladder: Op,
  cell: qp,
  empty: Hp,
  name: Fp,
  holder: zp,
  swatches: Wp,
  swatch: Kp,
  tilesFrame: Gp,
  tiles: Up,
  tile: Vp,
  bar: Jp,
  hex: Yp,
  note: Xp
}, y3 = "Not available yet";
function Qp(e) {
  return e.reserved ? "reserved" : gt(e.step) ? "validated" : "partial";
}
function Er(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not available" : "free";
}
function Zp(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function eg({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(We, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${oe.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function tg(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function ng(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const ka = (e) => String(e).padStart(2, "0");
function ag(e, t, a) {
  return e === "reserved" ? "Reserved" : a ? "yours" : t ?? Er(e, void 0);
}
function rg({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${oe.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${oe.hex} ward-ladder-hex`, children: r ? `step ${ka(e)}` : Jl(e) }),
    /* @__PURE__ */ n("span", { className: `${oe.note} ward-ladder-note`, children: r ? a : `Step ${ka(e)} · ${a}` })
  ] });
}
function lg({ step: e, value: t, taken: a, onChange: r, presentation: l, disabled: o }) {
  const s = Qp(e), c = Er(s, a), d = c !== "free", u = d || o, h = t === e.step, _ = e.name ?? `Step ${e.step}`, w = () => {
    u || r(e.step);
  }, N = `${_} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...ng(d, h, u), "data-validation": s, style: Zp(e, s), onClick: w, onKeyDown: (M) => tg(M, w) }, label: N, name: _, holder: c, validation: s, note: ag(s, a, h), step: e.step };
}
const og = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${oe.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${oe.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(rg, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ i("span", { ...e.shared, className: `${oe.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(eg, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${oe.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${oe.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function ig(e) {
  return og[e.presentation](lg(e));
}
function sg(e) {
  for (const t of e)
    if (!t.reserved && !Yt(t.step)) throw new Error("colour ladder renders token steps only");
}
function cg(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const dg = { list: oe.ladder, swatches: oe.swatches, tiles: oe.tilesFrame };
function ug(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Br(e) {
  const t = e.takenBy ?? {}, a = (o) => {
    var s;
    (s = e.onChange) == null || s.call(e, o);
  };
  sg(e.steps);
  const r = cg(e), l = e.steps.map((o) => /* @__PURE__ */ n(ig, { step: o, value: e.value, taken: t[o.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, o.step));
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour", ...ug(e.disabled === !0), className: `${dg[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: oe.tiles, children: l }) : l });
}
const hg = "_rail_s06lm_2", mg = "_section_s06lm_12", _g = "_sectionFlush_s06lm_22", wg = "_head_s06lm_26", fg = "_headLabel_s06lm_34", vg = "_sample_s06lm_42", bg = "_sampleLabel_s06lm_47", pg = "_sampleTitle_s06lm_54", gg = "_sampleMeta_s06lm_59", yg = "_trace_s06lm_65", Ng = "_traceHead_s06lm_70", kg = "_steps_s06lm_78", $g = "_step_s06lm_78", Cg = "_stepTitle_s06lm_97", Sg = "_hollow_s06lm_107", Rg = "_stepBody_s06lm_115", xg = "_stepDetail_s06lm_127", Tg = "_publish_s06lm_132", Lg = "_reason_s06lm_138", Mg = "_note_s06lm_143", Ag = "_reveal_s06lm_148", C = {
  rail: hg,
  section: mg,
  sectionFlush: _g,
  head: wg,
  headLabel: fg,
  sample: vg,
  sampleLabel: bg,
  sampleTitle: pg,
  sampleMeta: gg,
  trace: yg,
  traceHead: Ng,
  steps: kg,
  step: $g,
  stepTitle: Cg,
  hollow: Sg,
  stepBody: Rg,
  stepDetail: xg,
  publish: Tg,
  reason: Lg,
  note: Mg,
  reveal: Ag
}, $a = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Ig = { running: "Dry run running.", notRun: "Run a dry run first.", failed: "Dry run failed." }, Eg = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Bg = { notSimulated: "not simulated", running: "running" };
function Pg(e) {
  return e.presentation === "foundry";
}
function jg(e, t) {
  if (e.status === "running") return "Wait for the dry run to finish.";
  const a = t.find((r) => !r.met);
  return a ? `Not ready: ${a.text}` : e.status === "passed" ? null : "Pass a dry run first.";
}
function Dg(e, t) {
  var r;
  const a = Ig[e.status];
  return a !== void 0 ? a : ((r = t.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Og(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function qg(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Hg(e) {
  if (Og(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Fg(e) {
  const [t, a] = v(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${C.step} ${C.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function zg(e) {
  const t = Bg[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: C.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(We, { size: 6, kind: Eg[e.kind], label: e.kind });
}
function Wg(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ i("span", { className: C.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Kg(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Be, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Gg(e) {
  const { step: t } = e;
  return /* @__PURE__ */ i(Fg, { kind: t.kind, children: [
    /* @__PURE__ */ n(zg, { kind: t.kind }),
    /* @__PURE__ */ i("span", { className: C.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: C.stepTitle, children: t.title }),
      /* @__PURE__ */ n(Wg, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Kg, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function Ug(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(se(t)), a.join(" · ");
}
function Pr(e) {
  const t = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ i("section", { className: `${C.trace} ${C.section}`, children: [
    /* @__PURE__ */ n("p", { className: C.traceHead, id: t, children: Ug(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: C.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(Gg, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function Vg(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ i("div", { className: `${C.sample} ${C.section}`, children: [
    /* @__PURE__ */ n("p", { className: C.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ i("p", { className: C.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ i("p", { className: C.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function Jg(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + me(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${C.sampleMeta} ${C.section} ward-dryrun-sample`, children: "Sample: " + e.sample.key + " · " + e.sample.title + t + ". Nothing saved." });
}
function Yg(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? za(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: C.sectionFlush, children: /* @__PURE__ */ n(Zt, { divided: !0, cells: t }) });
}
function Xg(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: za(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function Qg(e) {
  const t = Xg(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ i("p", { className: C.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: C.sectionFlush, children: /* @__PURE__ */ n(Zt, { divided: !0, cells: t }) });
}
function jr(e) {
  const t = y();
  return e.reason !== null ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("p", { className: `${C.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Zg(e) {
  return /* @__PURE__ */ i("div", { className: `${C.publish} ${C.section}`, children: [
    /* @__PURE__ */ n(jr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: C.note, children: e.note })
  ] });
}
function ey(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${C.publish} ${C.section}`, children: /* @__PURE__ */ n(jr, { reason: e.reason, onPublish: e.onPublish }) });
}
function Dr(e) {
  return /* @__PURE__ */ i("div", { className: `${C.head} ${C.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: C.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: $a[e.run.status].role, label: $a[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Be, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function ty(e, t) {
  const [a, r] = v(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((t == null ? void 0 : t.subscribe) === void 0 || e.status !== "running"))
      return t.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((o) => {
          var s, c;
          return [...o, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [t, e.status]), a;
}
function ny(e) {
  var a;
  qg(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${C.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Dr, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(Vg, { sample: e.run.sample }),
    /* @__PURE__ */ n(Pr, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(Yg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: C.section, children: /* @__PURE__ */ n(nn, { items: e.checklist }) }),
    /* @__PURE__ */ n(Zg, { reason: jg(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function ay(e) {
  var r;
  const t = ty(e.run, e.feed);
  Hg(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${C.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Dr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(Jg, { sample: e.run.sample }),
    /* @__PURE__ */ n(Pr, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(Qg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: C.section, children: /* @__PURE__ */ n(nn, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(ey, { reason: Dg(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function N3(e) {
  return Pg(e) ? /* @__PURE__ */ n(ay, { ...e }) : /* @__PURE__ */ n(ny, { ...e });
}
const ry = "_list_142ip_3", ly = "_row_142ip_9", oy = "_condition_142ip_18", iy = "_action_142ip_24", Bt = {
  list: ry,
  row: ly,
  condition: oy,
  action: iy
}, Or = ke(!1);
function k3({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(Or.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: Bt.list, "aria-label": t, children: e }) });
}
function $3({ rule: e }) {
  if (!Ne(Or)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ i("li", { className: Bt.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: Bt.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: Bt.action, children: e.then })
  ] });
}
const sy = "_move_tmppt_3", cy = {
  move: sy
};
function yn(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [l] = r.splice(t, 1);
  return r.splice(a, 0, l), r;
}
function qr(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function Hr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function Ca(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function dy(e) {
  return e === "up" ? "down" : "up";
}
function uy(e, t) {
  const a = Ca(e, t.id, t.direction) ?? Ca(e, t.id, dy(t.direction));
  a == null || a.focus();
}
function Fr() {
  const e = f(null), [t, a] = v(null), [r, l] = v("");
  return S(() => {
    e.current !== null && t !== null && uy(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), l(c);
  } };
}
function zr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Ft({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${cy.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const hy = "_body_1jd1i_2", my = "_title_1jd1i_8", _y = "_section_1jd1i_13", wy = "_legend_1jd1i_18", fy = "_stages_1jd1i_26", vy = "_stage_1jd1i_26", by = "_stageIndex_1jd1i_44", py = "_stageName_1jd1i_50", gy = "_footer_1jd1i_59", yy = "_note_1jd1i_66", Ny = "_reason_1jd1i_71", ky = "_actions_1jd1i_76", $y = "_webHead_1jd1i_83", Cy = "_kicker_1jd1i_92", Sy = "_webTitle_1jd1i_99", Ry = "_webBody_1jd1i_105", xy = "_webSection_1jd1i_109", Ty = "_sectionHead_1jd1i_121", Ly = "_sectionNote_1jd1i_129", My = "_formLabel_1jd1i_134", Ay = "_identityRow_1jd1i_139", Iy = "_nameCell_1jd1i_145", Ey = "_keyCell_1jd1i_150", By = "_colourCell_1jd1i_154", Py = "_colourStatus_1jd1i_161", jy = "_webStages_1jd1i_166", Dy = "_webStageList_1jd1i_172", Oy = "_webStage_1jd1i_166", qy = "_webIndex_1jd1i_191", Hy = "_webStageName_1jd1i_196", Fy = "_webMoves_1jd1i_201", zy = "_addStage_1jd1i_215", Wy = "_addStageButton_1jd1i_223", Ky = "_webFooter_1jd1i_236", Gy = "_webFooterNotes_1jd1i_244", Uy = "_webNote_1jd1i_251", p = {
  body: hy,
  title: my,
  section: _y,
  legend: wy,
  stages: fy,
  stage: vy,
  stageIndex: by,
  stageName: py,
  footer: gy,
  note: yy,
  reason: Ny,
  actions: ky,
  webHead: $y,
  kicker: Cy,
  webTitle: Sy,
  webBody: Ry,
  webSection: xy,
  sectionHead: Ty,
  sectionNote: Ly,
  formLabel: My,
  identityRow: Ay,
  nameCell: Iy,
  keyCell: Ey,
  colourCell: By,
  colourStatus: Py,
  webStages: jy,
  webStageList: Dy,
  webStage: Oy,
  webIndex: qy,
  webStageName: Hy,
  webMoves: Fy,
  addStage: zy,
  addStageButton: Wy,
  webFooter: Ky,
  webFooterNotes: Gy,
  webNote: Uy
}, Vy = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent" },
  { value: "gate", label: "review" },
  { value: "terminal", label: "done" }
], Wr = "not a known stage";
function Jy(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${Wr}` }, ...a];
}
function Yy({ stage: e, index: t, catalogue: a, onName: r }) {
  const l = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(E, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const o = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Wr}`;
  return /* @__PURE__ */ n(E, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Jy(a, e.name), invalid: o, onChange: r });
}
function Kr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function Xy(e) {
  const t = f([]), a = f(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function Qy({ id: e, stage: t, index: a, total: r, catalogue: l, onReplace: o, onMove: s }) {
  const c = Kr(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ i("li", { className: `${p.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: p.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: p.webStageName, children: /* @__PURE__ */ n(Yy, { stage: t, index: a, catalogue: l, onName: (u) => o({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(E, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: Vy, onChange: (u) => o({ ...t, kind: u }) }),
    /* @__PURE__ */ i("span", { className: p.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(Ft, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(Ft, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Zy({ stages: e, onChange: t, catalogue: a }) {
  const r = Xy(e.length), l = Fr(), o = (c, d) => {
    const u = qr(c, d);
    r.current = yn(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Hr(Kr(e[c], c), u, e.length)), t(yn(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ i("div", { className: p.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: p.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(Qy, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => o(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(zr, { text: l.announcement }),
    /* @__PURE__ */ n("p", { className: p.addStage, children: /* @__PURE__ */ n("button", { type: "button", className: p.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }) })
  ] });
}
const e1 = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
];
function t1({ stage: e }) {
  return e.gate && !Nt(e.name, "Review") ? /* @__PURE__ */ n(m, { role: "gate", label: "Review" }) : null;
}
const n1 = [
  { value: "advance", label: "Move on when all checks pass", consequence: "No one needs to approve." },
  { value: "review", label: "Hold every item for review", consequence: "Every item waits for a reviewer." },
  { value: "block", label: "Stop on any finding", consequence: "A finding holds the item until a person clears it." }
], Gr = "Nothing runs until you publish.", a1 = "Add a name and a key.", r1 = "At least 2 stages";
function Fn(e, t) {
  return !e.reserved && gt(e.step) && t[e.step] === void 0;
}
function l1(e, t) {
  const a = e.find((r) => Fn(r, t));
  return a ? a.step : 1;
}
function o1({ stages: e, onMove: t }) {
  const a = Fr(), r = (l, o) => {
    const s = qr(l, o);
    a.moved({ id: e[l].id, direction: o }, Hr(e[l].name, s, e.length)), t(l, s);
  };
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: p.stages, "aria-label": "Stages in order", children: e.map((l, o) => /* @__PURE__ */ i("li", { className: p.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stageIndex, children: String(o + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: p.stageName, children: l.name }),
      /* @__PURE__ */ n(t1, { stage: l }),
      o > 0 && /* @__PURE__ */ n(Ft, { id: l.id, name: l.name, direction: "up", onMove: () => r(o, "up") }),
      o < e.length - 1 && /* @__PURE__ */ n(Ft, { id: l.id, name: l.name, direction: "down", onMove: () => r(o, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(zr, { text: a.announcement })
  ] });
}
function i1({ reason: e, onCreate: t, onDraft: a }) {
  const r = y();
  return /* @__PURE__ */ i("div", { className: p.footer, children: [
    /* @__PURE__ */ n("p", { className: p.note, children: Gr }),
    e && /* @__PURE__ */ n("p", { className: p.reason, id: r, children: e }),
    /* @__PURE__ */ i("div", { className: p.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function s1(e, t) {
  return e !== "" && t !== "" ? null : a1;
}
function c1(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: l = n1, onCreate: o, onDraft: s, onClose: c, returnFocusTo: d } = e, u = y(), [h, _] = v(""), [w, N] = v(""), [k, M] = v(t[0].value), [D, _e] = v(() => l1(a, r)), [ae, $e] = v(e.stages ?? e1), [Qe, A] = v(l[0].value), V = { name: h, key: w, streamStep: D, owner: k, stages: ae, policy: Qe }, Ce = s1(h, w);
  return /* @__PURE__ */ n(dt, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ i("div", { className: p.body, children: [
    /* @__PURE__ */ n("h2", { className: p.title, id: u, children: "New stream" }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ n("legend", { className: p.legend, children: "Identity" }),
      /* @__PURE__ */ n(E, { kind: "input", label: "Name", value: h, onChange: _ }),
      /* @__PURE__ */ n(E, { kind: "input", label: "Key", value: w, onChange: N, mono: !0 }),
      /* @__PURE__ */ n(E, { kind: "select", label: "Owner", value: k, onChange: M, options: t })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ n("legend", { className: p.legend, children: "Colour" }),
      /* @__PURE__ */ n(Br, { label: "Colour", steps: a, value: D, onChange: _e, takenBy: r })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ n("legend", { className: p.legend, children: "Stages" }),
      /* @__PURE__ */ n(o1, { stages: ae, onMove: (Ke, Rl) => $e(yn(ae, Ke, Rl)) })
    ] }),
    /* @__PURE__ */ n(kr, { legend: "When items move on", options: l, value: Qe, onChange: A }),
    /* @__PURE__ */ n(i1, { reason: Ce, onCreate: () => o(V), onDraft: () => s(V) })
  ] }) });
}
const Ur = [
  { value: "relay", label: "Through Trellis (safe default)", consequence: "Agents never write to Foundry or Jira directly." },
  { value: "direct", label: "Directly, each agent approved", consequence: "A second admin approves each agent." },
  { value: "readonly", label: "Read only", consequence: "Agents can read and report only." }
], d1 = "Add a name, key, owner and two stages.";
function u1(e, t, a, r, l, o) {
  var c;
  const s = ((c = Ur.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: o };
}
function h1(e, t) {
  return m1(e) && _1(e, t) && w1(e);
}
function m1(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function _1(e, t) {
  return e.colourStep === null || Fn({ step: e.colourStep }, t);
}
function w1(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function f1(e, t) {
  if (e === null || Fn({ step: e }, t)) return "";
  const a = t[e];
  return a === void 0 ? `Colour ${e} is not available yet.` : `Colour ${e} is taken by ${a}.`;
}
function v1({ ready: e, draft: t, onCreate: a, onDraft: r, reasonId: l }) {
  return /* @__PURE__ */ i("div", { className: p.webFooter, children: [
    /* @__PURE__ */ i("div", { className: p.webFooterNotes, children: [
      /* @__PURE__ */ n("p", { className: p.webNote, children: Gr }),
      !e && /* @__PURE__ */ n("p", { id: l, className: p.reason, children: d1 })
    ] }),
    r && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => r(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => a(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: l, children: "Create stream" })
  ] });
}
function b1({ titleId: e }) {
  return /* @__PURE__ */ n("header", { className: p.webHead, children: /* @__PURE__ */ n("h2", { id: e, className: p.webTitle, children: "New stream" }) });
}
function p1({ name: e, setName: t, streamKey: a, setKey: r, colour: l, owner: o }) {
  return /* @__PURE__ */ i("section", { className: p.webSection, children: [
    /* @__PURE__ */ n("h3", { className: p.kicker, children: "Identity" }),
    /* @__PURE__ */ i("div", { className: p.identityRow, children: [
      /* @__PURE__ */ n("div", { className: p.nameCell, children: /* @__PURE__ */ n(E, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ n("div", { className: p.keyCell, children: /* @__PURE__ */ n(E, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      l
    ] }),
    o
  ] });
}
function g1(e) {
  const t = y(), a = y(), r = e.takenBy ?? {}, [l, o] = v(""), [s, c] = v(""), [d, u] = v(e.owners[0] ?? ""), [h, _] = v(null), [w, N] = v("relay"), [k, M] = v([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), D = u1(l, s, d, h, w, k), _e = h1(D, r), ae = /* @__PURE__ */ i("div", { className: p.colourCell, children: [
    /* @__PURE__ */ n("span", { className: p.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Br, { presentation: "swatches", label: "Colour", steps: e.ladder, value: h, onChange: _, takenBy: r })
  ] }), $e = f1(h, r), Qe = /* @__PURE__ */ i(x, { children: [
    $e && /* @__PURE__ */ n("p", { className: p.colourStatus, "data-colour-status": "", children: $e }),
    /* @__PURE__ */ n(E, { variant: "form", kind: "select", label: "Owner", value: d, options: e.owners.map((A) => ({ value: A, label: A })), onChange: u })
  ] });
  return /* @__PURE__ */ i(dt, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(b1, { titleId: a }),
    /* @__PURE__ */ i("div", { className: p.webBody, children: [
      /* @__PURE__ */ n(p1, { name: l, setName: o, streamKey: s, setKey: c, colour: ae, owner: Qe }),
      e.fields && /* @__PURE__ */ n("section", { className: p.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ i("section", { className: p.webSection, children: [
        /* @__PURE__ */ i("div", { className: p.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: p.kicker, children: "Stages" }),
          /* @__PURE__ */ n("span", { className: p.sectionNote, children: r1 })
        ] }),
        /* @__PURE__ */ n(Zy, { stages: k, onChange: M })
      ] }),
      /* @__PURE__ */ n("section", { className: p.webSection, children: /* @__PURE__ */ n(kr, { variant: "cards", legend: "How agents write", value: w, options: Ur, onChange: N }) }),
      /* @__PURE__ */ n(v1, { ready: _e, draft: D, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function C3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(g1, { ...e }) : /* @__PURE__ */ n(c1, { ...e });
}
const y1 = "_row_bs8hc_2", N1 = "_cell_bs8hc_6", k1 = "_condition_bs8hc_11", $1 = "_action_bs8hc_18", C1 = "_contract_bs8hc_24", S1 = "_contractCondition_bs8hc_33", R1 = "_contractAction_bs8hc_39", ee = {
  row: y1,
  cell: N1,
  condition: k1,
  action: $1,
  contract: C1,
  contractCondition: S1,
  contractAction: R1
}, Vr = ["advance", "block", "escalate", "requestReview"], Sa = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function zt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function zn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ee.action, children: Sa[e.then] }) : /* @__PURE__ */ n(
    E,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => t({ ...e, then: l }),
      options: Vr.map((l) => ({ value: l, label: Sa[l] }))
    }
  );
}
function x1({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ee.row, children: [
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n("span", { className: ee.condition, title: zt(e, r), children: zt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: zn(e, t, a) })
  ] });
}
function T1({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ee.row, children: [
    /* @__PURE__ */ i("td", { className: ee.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ee.condition, children: zt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: zn(e, t, a) })
  ] });
}
function L1({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("li", { className: ee.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ee.contractCondition, children: zt(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ee.contractAction, children: zn(e, t, a, !0) })
  ] });
}
const M1 = { two: T1, four: x1, contract: L1 };
function S3(e) {
  var a;
  if (!Vr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = M1[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const A1 = "_column_g1uat_2", I1 = "_head_g1uat_17", E1 = "_index_g1uat_23", B1 = "_name_g1uat_29", P1 = "_meta_g1uat_38", j1 = "_mono_g1uat_43", D1 = "_gate_g1uat_50", O1 = "_reviewersLabel_g1uat_57", q1 = "_reviewers_g1uat_57", H1 = "_reviewer_g1uat_57", F1 = "_agents_g1uat_74", z1 = "_workflowColumn_g1uat_79", W1 = "_workflowHead_g1uat_96", K1 = "_stageRow_g1uat_102", G1 = "_stageLabel_g1uat_109", U1 = "_workflowTitle_g1uat_116", V1 = "_workflowMeta_g1uat_122", J1 = "_workflowGate_g1uat_127", Y1 = "_gateNote_g1uat_135", X1 = "_cardNote_g1uat_140", Q1 = "_reviewerList_g1uat_145", Z1 = "_reviewerRow_g1uat_151", eN = "_reviewerMark_g1uat_157", tN = "_reviewerName_g1uat_167", nN = "_terminalCard_g1uat_173", aN = "_terminalCount_g1uat_182", rN = "_workflowAgents_g1uat_188", lN = "_mount_g1uat_194", R = {
  column: A1,
  head: I1,
  index: E1,
  name: B1,
  meta: P1,
  mono: j1,
  gate: D1,
  reviewersLabel: O1,
  reviewers: q1,
  reviewer: H1,
  agents: F1,
  workflowColumn: z1,
  workflowHead: W1,
  stageRow: K1,
  stageLabel: G1,
  workflowTitle: U1,
  workflowMeta: V1,
  workflowGate: J1,
  gateNote: Y1,
  cardNote: X1,
  reviewerList: Q1,
  reviewerRow: Z1,
  reviewerMark: eN,
  reviewerName: tN,
  terminalCard: nN,
  terminalCount: aN,
  workflowAgents: rN,
  mount: lN
}, Ra = { entry: "Entry", agent: "Agent", gate: "Review", terminal: "Done" };
function Wn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function Jr(e) {
  return `${Math.round(e * 100)}%`;
}
function oN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Zt, { cells: [
      { value: Jr(e.gateShare), label: "Held for review" },
      { value: ne(e.count), label: "In stage" }
    ] })
  ] });
}
function iN({ stage: e }) {
  return /* @__PURE__ */ n(Zt, { cells: [
    { value: ne(e.count), label: "In stage" },
    { value: Wn(e.closedThisWeek, ne), label: "Closed this week" }
  ] });
}
function sN({ stage: e, titleId: t }) {
  return /* @__PURE__ */ i("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    Nt(e.name, Ra[e.kind]) ? null : /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: Ra[e.kind] })
  ] });
}
function cN({ stage: e }) {
  return /* @__PURE__ */ i("p", { className: R.meta, children: [
    /* @__PURE__ */ i("span", { className: R.mono, children: [
      ne(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ i("span", { className: R.mono, children: [
      se(e.medianWait),
      " median wait"
    ] })
  ] });
}
function dN({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(oN, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(iN, { stage: e }) : null;
}
function uN({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Add an agent" }) : null;
}
function hN({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const l = y(), o = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("section", { className: R.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(sN, { stage: e, titleId: l }),
    /* @__PURE__ */ n(cN, { stage: e }),
    /* @__PURE__ */ n(dN, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(kp, { ...s, connection: o }, s.agent.id)) }),
    /* @__PURE__ */ n(uN, { onMount: a })
  ] });
}
const mN = {
  gate: { role: "gate", label: "Review" },
  terminal: { role: "quiet", label: "Done" }
};
function _N({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ i("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function wN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.gateNote, children: t.length === 0 ? "A person moves items on." : "Needs approval from:" }),
    t.length === 0 ? null : /* @__PURE__ */ n(_N, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ i("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: Jr(e.gateShare) }),
      " of time here"
    ] })
  ] });
}
function fN(e) {
  return e === void 0 ? "closed this week" : `closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function vN({ stage: e }) {
  return /* @__PURE__ */ i("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: Wn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: fN(e.rolledBackThisWeek) })
  ] });
}
function bN(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function pN(e) {
  if (e.kind === "terminal") return `${Wn(e.closedThisWeek)} this week`;
  const t = bN(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function gN({ stage: e, titleId: t }) {
  const a = mN[e.kind];
  return /* @__PURE__ */ i("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ i("span", { className: R.stageRow, children: [
      /* @__PURE__ */ i("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 || Nt(e.name, a.label) ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: pN(e) })
  ] });
}
function yN(e) {
  return e === "entry" || e === "agent";
}
function NN({ stage: e, onMount: t }) {
  return t === void 0 || !yN(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Add agent" });
}
function kN({ stage: e, agentCards: t, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ i("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(gN, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(wN, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(vN, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(NN, { stage: e, onMount: a })
  ] });
}
function $N(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function R3(e) {
  return $N(e) ? /* @__PURE__ */ n(kN, { ...e }) : /* @__PURE__ */ n(hN, { ...e });
}
const CN = "_row_1tdra_6", SN = "_name_1tdra_12", RN = "_compactRow_1tdra_13", xN = "_compactName_1tdra_13", TN = "_cell_1tdra_30", LN = "_chain_1tdra_45", MN = "_owner_1tdra_51", AN = "_mono_1tdra_57", IN = "_compactCell_1tdra_79", EN = "_stack_1tdra_96", BN = "_stat_1tdra_103", PN = "_identityLine_1tdra_110", jN = "_identity_1tdra_110", DN = "_ownerLine_1tdra_140", ON = "_link_1tdra_160", qN = "_gateMark_1tdra_166", HN = "_emptyChain_1tdra_171", FN = "_arrow_1tdra_177", zN = "_muted_1tdra_182", WN = "_define_1tdra_187", KN = "_statValue_1tdra_194", GN = "_policyId_1tdra_200", UN = "_sub_1tdra_205", g = {
  row: CN,
  name: SN,
  compactRow: RN,
  compactName: xN,
  cell: TN,
  chain: LN,
  owner: MN,
  mono: AN,
  compactCell: IN,
  stack: EN,
  stat: BN,
  identityLine: PN,
  identity: jN,
  ownerLine: DN,
  link: ON,
  gateMark: qN,
  emptyChain: HN,
  arrow: FN,
  muted: zN,
  define: WN,
  statValue: KN,
  policyId: GN,
  sub: UN
};
function Yr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: l, button: o } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: l, button: o };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function VN(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function JN(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Xr(e) {
  return `${ne(e)} ${e === 1 ? "member" : "members"}`;
}
function YN(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Xr(e.members)}`;
}
function XN(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ i("span", { className: g.stack, children: [
    /* @__PURE__ */ i("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: T(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: YN(e) })
  ] }) });
}
function Qr({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ i(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (review)" }) : null
  ] });
}
function QN(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = Qt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function ZN({ stages: e, streamStep: t }) {
  const a = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, o) => /* @__PURE__ */ i("span", { className: g.link, children: [
    /* @__PURE__ */ n(Qr, { name: l.name, gate: l.gate === !0, look: QN(o, a, t), size: "tag" }),
    o === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${o}`)) });
}
function ek(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ i("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : ZN(e) });
}
function Zr(e) {
  return e === void 0 ? void 0 : !0;
}
function xa(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Zr(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function tk(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function nk(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function ak({ stream: e, href: t, presentation: a }) {
  const r = JN(a.className);
  return /* @__PURE__ */ i("tr", { className: `${r} ward-streamrow`, onClick: Yr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ye(e.streamStep, "chip") }, children: [
    XN(e, t),
    ek(e),
    xa(nk(e.agents), e.agents === void 0 ? void 0 : VN(e.agents), "—"),
    tk(e.policy),
    xa(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function rk(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function x3(e) {
  if (rk(e)) return ak(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ i("tr", { className: g.row, onClick: Yr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ i("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: T(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...En(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(Qr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: g.mono, children: Xr(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": Zr(t.inFlightHint), children: ne(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : se(t.p50) }) })
  ] });
}
const lk = "_row_2u4ll_2", ok = "_name_2u4ll_16", ik = "_scope_2u4ll_24", Wt = {
  row: lk,
  name: ok,
  scope: ik
};
function Kn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function sk(e) {
  return e === void 0 ? `${Wt.row} ward-toolrow` : `${Wt.row} ward-toolrow ${e}`;
}
function ck(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "Locked by stream policy" };
}
function dk({ id: e, reasonId: t, tool: a, state: r, onChange: l }) {
  return /* @__PURE__ */ n(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: a.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? t : void 0,
      onChange: (o) => {
        r.locked || l(o.target.checked);
      }
    }
  );
}
function uk({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: Kn(e) });
}
function hk({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${Wt.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function mk(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function T3({ tool: e, onChange: t, presentation: a }) {
  const r = y(), l = y(), o = ck(e, a), s = mk(a);
  return /* @__PURE__ */ i(s, { className: sk(a == null ? void 0 : a.className), "data-locked": o.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(dk, { id: r, reasonId: l, tool: e, state: o, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${Wt.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(hk, { tool: e, state: o, reasonId: l }),
    /* @__PURE__ */ n(uk, { classification: e.classification }),
    o.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const _k = "_strip_4ppv9_2", wk = "_well_4ppv9_11", fk = "_head_4ppv9_18", vk = "_name_4ppv9_24", bk = "_chart_4ppv9_32", pk = "_segment_4ppv9_38", gk = "_detailedChart_4ppv9_44", yk = "_rail_4ppv9_57", Nk = "_section_4ppv9_63", kk = "_label_4ppv9_74", $k = "_note_4ppv9_91", te = {
  strip: _k,
  well: wk,
  head: fk,
  name: vk,
  chart: bk,
  segment: pk,
  detailedChart: gk,
  rail: yk,
  section: Nk,
  label: kk,
  note: $k
}, Ck = "Nothing to preview.", Nn = [1, 2, 3, 4, 5, 6], Kt = 100;
function Sk(e, t) {
  return t.has(e) ? ye(e, "id") : "var(--ward-color-line)";
}
function Rk({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: te.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Nn.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: te.segment,
      x: l * Kt,
      y: "0",
      width: Kt,
      height: "8",
      fill: Sk(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function xk(e) {
  const t = e.slice(0, Nn.length);
  for (; t.length < Nn.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function Tk({ identities: e }) {
  return /* @__PURE__ */ i("figure", { className: `${te.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, a) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(a * Kt),
        y: "0",
        width: String(Kt),
        height: "40",
        style: { fill: ye(t.streamStep, "chip") }
      },
      t.key + String(a)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((t, a) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(a))) })
  ] });
}
function el(e) {
  return (t) => e == null ? void 0 : e(t);
}
function dn({ label: e, children: t }) {
  const a = y();
  return /* @__PURE__ */ i("section", { className: te.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: te.label, children: e }),
    t
  ] });
}
function Lk({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: te.note, children: t ?? Ck }) : /* @__PURE__ */ n("div", { className: te.well, children: /* @__PURE__ */ n(tn, { item: { ...e, streamStep: Qt(a.streamStep) }, onOpen: el(r), feed: null }) });
}
function Mk({ draft: e }) {
  const t = { "--stream": ye(e.streamStep, "id") };
  return /* @__PURE__ */ i("p", { className: te.head, style: t, children: [
    /* @__PURE__ */ n(We, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: te.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...En(e.key, e.streamStep) })
  ] });
}
function Ak(e) {
  const t = xk(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ i("div", { className: te.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(dn, { label: "Board card", children: /* @__PURE__ */ n(Lk, { ...e, draft: a }) }),
    /* @__PURE__ */ n(dn, { label: "Streams index row", children: /* @__PURE__ */ n(Mk, { draft: a }) }),
    /* @__PURE__ */ n(dn, { label: "Overview chart segment", children: /* @__PURE__ */ n(Tk, { identities: t }) })
  ] });
}
function Ik({ draft: e, sample: t, streams: a, onOpen: r }) {
  const l = { "--stream": ye(e.streamStep, "id") };
  return /* @__PURE__ */ i("section", { className: te.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ i("div", { className: te.head, children: [
      /* @__PURE__ */ n(We, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: te.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...En(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: te.well, children: /* @__PURE__ */ n(tn, { item: { ...t, streamStep: e.streamStep }, onOpen: el(r) }) }),
    /* @__PURE__ */ n(Rk, { draft: e, streams: a })
  ] });
}
function L3(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Ak, { ...e }) : /* @__PURE__ */ n(Ik, { ...e });
}
const Ek = "_row_ixlg5_6", Bk = "_headCell_ixlg5_10", Pk = "_cell_ixlg5_11", jk = "_name_ixlg5_23", Dk = "_consequence_ixlg5_29", Ok = "_governed_ixlg5_36", qk = "_control_ixlg5_42", Hk = "_byRole_ixlg5_48", Fk = "_webControl_ixlg5_59", zk = "_webConsequence_ixlg5_65", Wk = "_webGoverned_ixlg5_71", F = {
  row: Ek,
  headCell: Bk,
  cell: Pk,
  name: jk,
  consequence: Dk,
  governed: Ok,
  control: qk,
  byRole: Hk,
  webControl: Fk,
  webConsequence: zk,
  webGoverned: Wk
};
function Kk({
  capability: e,
  cell: t,
  onChange: a
}) {
  return t.value === "byRole" ? /* @__PURE__ */ n("span", { className: F.byRole, children: "by role" }) : /* @__PURE__ */ i("span", { className: F.control, children: [
    /* @__PURE__ */ n(
      Xe,
      {
        label: `${e.name} · ${t.stream}`,
        checked: t.value !== "off",
        onChange: (r) => a(t.streamStep, r)
      }
    ),
    t.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "Pilot" })
  ] });
}
function Gk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: F.row, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: F.headCell, children: [
      /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: F.consequence, children: e.consequence }),
      /* @__PURE__ */ i("span", { className: F.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(Kk, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function Uk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Vk({ name: e, cell: t, onChange: a }) {
  if (t.value === "byRole") return /* @__PURE__ */ n("span", { className: `${F.webControl} ${F.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Xe,
    {
      label: `${e} · step ${t.streamStep}`,
      checked: t.value === "on",
      disabled: a === void 0,
      onChange: (l) => a == null ? void 0 : a(t.streamStep, l ? "on" : "off")
    }
  );
  return t.value !== "pilot" ? r : /* @__PURE__ */ i("span", { className: `${F.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function Jk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: F.row, children: [
    /* @__PURE__ */ i("td", { className: F.cell, children: [
      /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${F.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(Vk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webGoverned} ward-cellmeta`, children: Uk(e) }) })
  ] });
}
function M3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Jk, { ...e }) : /* @__PURE__ */ n(Gk, { ...e });
}
const Yk = "_row_vv64h_2", Xk = "_cell_vv64h_6", Qk = "_name_vv64h_25", Zk = "_note_vv64h_30", e$ = "_webName_vv64h_41", t$ = "_webMeta_vv64h_47", Y = {
  row: Yk,
  cell: Xk,
  name: Qk,
  note: Zk,
  webName: e$,
  webMeta: t$
}, tl = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function n$(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function a$({ component: e, onRestart: t }) {
  const a = y(), r = tl[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ i("tr", { className: Y.row, children: [
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n("span", { className: Y.name, children: e.name }) }),
    /* @__PURE__ */ i("td", { className: Y.cell, "data-mono": "true", children: [
      ne(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n("span", { id: a, className: Y.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: Y.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function r$({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: n$(e.state) });
}
function l$({ component: e, onRestart: t }) {
  return /* @__PURE__ */ i("tr", { className: Y.row, children: [
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n("span", { className: `${Y.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n("span", { className: `${Y.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n(m, { ...tl[e.state] }) }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n(r$, { component: e, onRestart: t }) })
  ] });
}
function A3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(l$, { ...e }) : /* @__PURE__ */ n(a$, { ...e });
}
const o$ = "_row_jcm5k_7", i$ = "_cell_jcm5k_11", s$ = "_next_jcm5k_28", c$ = "_headCell_jcm5k_38", d$ = "_webId_jcm5k_77", u$ = "_webPurpose_jcm5k_83", h$ = "_webMeta_jcm5k_91", m$ = "_webUrgent_jcm5k_97", W = {
  row: o$,
  cell: i$,
  next: s$,
  headCell: c$,
  webId: d$,
  webPurpose: u$,
  webMeta: h$,
  webUrgent: m$
}, _$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "Managed by sign-in provider" }
}, w$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, nl = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], f$ = Object.fromEntries(nl.map((e) => [e.key, e]));
function et({ column: e, children: t }) {
  const a = f$[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: W.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: t
    }
  );
}
function I3() {
  return /* @__PURE__ */ n("tr", { children: nl.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: W.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function v$({ cred: e }) {
  const t = _$[e.state];
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ n(et, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(et, { column: "id", children: e.id }),
    /* @__PURE__ */ n(et, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(et, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Kn(e.cls) }) }),
    /* @__PURE__ */ n(et, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(et, { column: "next", children: /* @__PURE__ */ n("span", { className: W.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function b$({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${W.webMeta} ${W.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function p$({ cred: e }) {
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(b$, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(m, { ...w$[e.state] }) })
  ] });
}
function E3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(p$, { ...e }) : /* @__PURE__ */ n(v$, { ...e });
}
const g$ = "_card_lpp45_2", y$ = "_head_lpp45_11", N$ = "_env_lpp45_18", k$ = "_version_lpp45_25", $$ = "_meta_lpp45_32", C$ = "_webCard_lpp45_37", S$ = "_webRow_lpp45_47", R$ = "_webTitle_lpp45_55", x$ = "_webLine_lpp45_65", T$ = "_webVersion_lpp45_72", L$ = "_webMeta_lpp45_77", J = {
  card: g$,
  head: y$,
  env: N$,
  version: k$,
  meta: $$,
  webCard: C$,
  webRow: S$,
  webTitle: R$,
  webLine: x$,
  webVersion: T$,
  webMeta: L$
}, Ta = { dev: "Dev", uat: "UAT", prod: "Prod" }, al = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function M$({ env: e }) {
  const t = al[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ i("section", { className: J.card, "aria-label": Ta[e.env], children: [
    /* @__PURE__ */ i("div", { className: J.head, children: [
      /* @__PURE__ */ n("span", { className: J.env, children: Ta[e.env] }),
      /* @__PURE__ */ n(m, { role: t.role, label: t.label })
    ] }),
    /* @__PURE__ */ n("p", { className: J.version, children: e.version }),
    /* @__PURE__ */ i("p", { className: J.meta, children: [
      "deployed ",
      me(e.deployedAt)
    ] }),
    a && /* @__PURE__ */ n("p", { className: J.meta, children: a })
  ] });
}
function A$(e) {
  const t = e.by !== void 0 ? `by ${e.by}` : null;
  return [me(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function I$(e) {
  return /* @__PURE__ */ i("article", { className: `${J.webCard} ward-envcard`, children: [
    /* @__PURE__ */ i("span", { className: `${J.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${J.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...al[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${J.version} ${J.webVersion} ${J.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${J.meta} ${J.webMeta} ${J.webLine} ward-cellmeta`, children: A$(e) })
  ] });
}
function B3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(I$, { ...e }) : /* @__PURE__ */ n(M$, { ...e });
}
const E$ = "_panel_1hmja_2", B$ = "_line_1hmja_8", P$ = "_actions_1hmja_14", Rt = {
  panel: E$,
  line: B$,
  actions: P$
};
function P3(e) {
  return /* @__PURE__ */ i("div", { className: Rt.panel, children: [
    /* @__PURE__ */ n("p", { className: Rt.line, children: e.status }),
    /* @__PURE__ */ n(E, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: Rt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: Rt.line, children: e.note ?? "" })
  ] });
}
const j$ = "_upload_13fcl_2", D$ = "_preview_13fcl_7", O$ = "_mark_13fcl_17", q$ = "_empty_13fcl_22", H$ = "_actions_13fcl_28", F$ = "_input_13fcl_33", z$ = "_reasons_13fcl_41", W$ = "_reason_13fcl_41", K$ = "_accepted_13fcl_57", re = {
  upload: j$,
  preview: D$,
  mark: O$,
  empty: q$,
  actions: H$,
  input: F$,
  reasons: z$,
  reason: W$,
  accepted: K$
}, rl = 1.5, ll = 22, Gt = "script elements or event handlers", Oe = "links or external references", Ae = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${rl}px at ${ll}px`], G$ = [Ae[1], Ae[2], Gt, Oe], U$ = /* @__PURE__ */ new Map([
  ["image", Ae[1]],
  ["text", Ae[2]],
  ["tspan", Ae[2]],
  ["textPath", Ae[2]],
  ["script", Gt],
  ["foreignObject", Gt],
  ["a", Oe],
  ["use", Oe],
  ["style", Oe],
  ["feImage", Oe],
  ["set", Oe]
]), V$ = "http://www.w3.org/2000/svg", J$ = "http://www.w3.org/2000/xmlns/", Y$ = /* @__PURE__ */ new Set([
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
]), X$ = /* @__PURE__ */ new Set([
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
]), Gn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, Q$ = /url\s*\(|['"\\]/i;
function Z$() {
  return { ok: !1, reasons: [Ae[1]] };
}
function ol(e) {
  return e.namespaceURI === V$;
}
function e0(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && ol(t) ? t : null;
  } catch {
    return null;
  }
}
function t0(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [Ae[0]] : [];
}
function n0(e) {
  return U$.get(e.localName) ?? (e.localName.startsWith("animate") ? Oe : void 0);
}
function a0(e) {
  return Q$.test(e.replace(Gn, ""));
}
function r0(e) {
  return /^on/i.test(e.localName) ? Gt : e.localName === "href" || a0(e.value) ? Oe : void 0;
}
function l0(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(n0(a));
    for (const r of Array.from(a.attributes)) t.add(r0(r));
  }
  return G$.filter((a) => t.has(a));
}
function o0(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((l) => Number.isFinite(l) && l > 0), 0), r = a > 0 ? ll / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const o = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(o) && o * r < rl;
  }) ? [Ae[3]] : [];
}
function i0(e) {
  if (e.namespaceURI === J$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (X$.has(t) || t.startsWith("stroke"));
}
function s0(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && ol(t) && Y$.has(t.localName);
}
function c0(e, t) {
  s0(t) ? t.nodeType === Node.ELEMENT_NODE && il(t) : e.removeChild(t);
}
function il(e) {
  for (const t of Array.from(e.attributes)) i0(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) c0(e, t);
  return e;
}
function d0(e) {
  return Array.from(e.matchAll(Gn), (t) => t[2]).filter((t) => t !== "");
}
function u0(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function h0(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const o of d0(l.value)) a.has(o) || a.set(o, `${t}-${a.size}`);
  return a;
}
function m0(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(Gn, (r, l, o) => {
      const s = t.get(o);
      return s === void 0 ? r : r.replace(`#${o}`, `#${s}`);
    });
}
function _0(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = h0(a, t);
  for (const l of a) {
    const o = r.get(l.getAttribute("id") ?? "");
    o === void 0 ? l.removeAttribute("id") : l.setAttribute("id", o), m0(l, r);
  }
  return e;
}
function j3(e) {
  const t = e0(e);
  if (t === null) return Z$();
  const a = [...t0(t), ...l0(t), ...o0(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(_0(il(t), u0(e))) };
}
const w0 = "Mark accepted.", f0 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, v0 = new Set(Ka.flatMap((e) => [ye(e, "id"), ye(e, "chip")]));
function b0(e) {
  return e !== void 0 && (f0.test(e) || v0.has(e)) ? e : void 0;
}
function p0({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: re.preview, style: { "--mark": b0(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: re.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: re.empty }) });
}
function g0(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function y0(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function N0({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: re.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: re.result, role: "status", children: /* @__PURE__ */ n("p", { className: re.accepted, children: w0 }) }) : /* @__PURE__ */ n("div", { className: re.result, role: "status", children: /* @__PURE__ */ n("ul", { className: re.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: re.reason, children: t }, t)) }) });
}
function k0({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(N0, { result: e }) : /* @__PURE__ */ n("p", { className: `${re.result} ${g0(e, a)}`, role: "status", children: y0(e, a) });
}
function La(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function D3({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: l }) {
  const o = f(null), [s, c] = v(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ i("div", { className: re.upload, children: [
    /* @__PURE__ */ n(p0, { current: e }),
    /* @__PURE__ */ i("div", { className: re.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: o,
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
      /* @__PURE__ */ n(b, { ...La(l), onClick: () => {
        var u;
        return (u = o.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...La(l), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(k0, { result: s, presentation: r })
  ] });
}
const $0 = "_row_o3t6y_7", C0 = "_cell_o3t6y_11", S0 = "_head_o3t6y_28", R0 = "_name_o3t6y_34", x0 = "_pinned_o3t6y_42", T0 = "_headCell_o3t6y_49", L0 = "_webName_o3t6y_88", M0 = "_webMeta_o3t6y_95", A0 = "_webWarn_o3t6y_103", O = {
  row: $0,
  cell: C0,
  head: S0,
  name: R0,
  pinned: x0,
  headCell: T0,
  webName: L0,
  webMeta: M0,
  webWarn: A0
}, Un = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, sl = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], I0 = Object.fromEntries(sl.map((e) => [e.key, e]));
function E0(e, t) {
  return `mcp.${e}.${t}`;
}
function B0(e) {
  return Object.keys(Un).includes(e);
}
function P0(e) {
  return Un[e !== void 0 && B0(e) ? e : "unknown"];
}
function ht({ column: e, children: t }) {
  const a = I0[e];
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
function O3() {
  return /* @__PURE__ */ n("tr", { children: sl.map((e) => /* @__PURE__ */ n(
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
function j0({ server: e }) {
  const t = Un[e.connection];
  return /* @__PURE__ */ i("tr", { className: O.row, children: [
    /* @__PURE__ */ i(ht, { column: "name", children: [
      /* @__PURE__ */ i("span", { className: O.head, children: [
        /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Kn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ i("span", { className: O.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(ht, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(ht, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(ht, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(ht, { column: "tools", children: e.tools.map((a) => E0(e.name, a)).join(" · ") })
  ] });
}
function D0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function O0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Can write" } : { role: "meta", label: "Read only" };
}
function q0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${O.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e });
}
function H0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: "Restart not set up" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function F0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function z0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ i("tr", { className: O.row, children: [
    /* @__PURE__ */ i("td", { className: O.cell, children: [
      /* @__PURE__ */ n("span", { className: `${O.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: D0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta ward-truncate`, title: l.map((o) => o.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...O0(e) }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(q0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...P0(e.connection) }) }),
    /* @__PURE__ */ i("td", { className: O.cell, children: [
      /* @__PURE__ */ n(H0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(F0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function q3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(z0, { ...e }) : /* @__PURE__ */ n(j0, { ...e });
}
const W0 = "_row_zgozg_2", K0 = "_headCell_zgozg_14", G0 = "_cell_zgozg_15", U0 = "_name_zgozg_26", V0 = "_consequence_zgozg_32", J0 = "_reason_zgozg_38", Y0 = "_value_zgozg_44", X0 = "_webRow_zgozg_69", Q0 = "_webSetting_zgozg_82", Z0 = "_webName_zgozg_90", eC = "_webConsequence_zgozg_98", tC = "_webControl_zgozg_104", nC = "_webState_zgozg_118", aC = "_webChip_zgozg_123", j = {
  row: W0,
  headCell: K0,
  cell: G0,
  name: U0,
  consequence: V0,
  reason: J0,
  value: Y0,
  webRow: X0,
  webSetting: Q0,
  webName: Z0,
  webConsequence: eC,
  webControl: tC,
  webState: nC,
  webChip: aC
}, cl = 104, dl = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function rC({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Xe, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(yr, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: j.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function lC({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = y(), o = dl[a], s = a === "locked";
  return /* @__PURE__ */ i("tr", { className: j.row, "data-inheritance": a, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: j.headCell, children: [
      /* @__PURE__ */ n("span", { className: j.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: j.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: j.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n(rC, { control: t, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: j.cell, style: { width: cl }, children: /* @__PURE__ */ n(m, { role: o.role, label: o.label }) })
  ] });
}
function ul(e, t) {
  return String(e ?? t);
}
function oC(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function iC(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? ul(e.value, "—");
}
function sC({ control: e, name: t, locked: a, describedBy: r, onChange: l }) {
  const o = e.value === !0;
  return /* @__PURE__ */ i("span", { className: j.webControl, children: [
    /* @__PURE__ */ n(Xe, { label: t, labelHidden: !0, checked: o, locked: a, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: j.webState, "aria-hidden": "true", children: a || o ? "on" : "off" })
  ] });
}
function cC(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(sC, { ...e });
  const l = oC(t, a);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: j.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(yr, { options: l, value: ul(t.value, ""), onChange: (o) => r == null ? void 0 : r(o) }) }) : /* @__PURE__ */ n("span", { className: `${j.webControl} ${j.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: iC(t) });
}
function dC({ setting: e, control: t, inheritance: a, reason: r, onChange: l, renderControl: o }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ i("div", { className: `${j.row} ${j.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ i("span", { className: j.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${j.name} ${j.webName}`, children: e.name }),
      /* @__PURE__ */ i("p", { id: s, className: `${j.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    o ? /* @__PURE__ */ n("span", { className: j.webControl, children: o(s) }) : /* @__PURE__ */ n(cC, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${j.webChip} ward-policy-chip`, style: { width: cl }, children: /* @__PURE__ */ n(m, { ...dl[a], size: "tag" }) })
  ] });
}
function H3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(dC, { ...e }) : /* @__PURE__ */ n(lC, { ...e });
}
const uC = "_label_1fzq1_7", hC = "_name_1fzq1_15", mC = "_column_1fzq1_24", _C = "_webFrame_1fzq1_57", wC = "_webHead_1fzq1_62", fC = "_webHeadLabel_1fzq1_74", vC = "_webLabel_1fzq1_118", bC = "_webColumns_1fzq1_125", pC = "_webGroup_1fzq1_131", gC = "_webPeople_1fzq1_132", yC = "_webVia_1fzq1_133", NC = "_webMeta_1fzq1_162", K = {
  label: uC,
  name: hC,
  column: mC,
  webFrame: _C,
  webHead: wC,
  webHeadLabel: fC,
  webLabel: vC,
  webColumns: bC,
  webGroup: pC,
  webPeople: gC,
  webVia: yC,
  webMeta: NC
}, kC = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, un = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function hn({ column: e, children: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: K.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: t
    }
  );
}
function $C(e) {
  if (!e.matrixRole) return;
  const t = kC[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function CC({ node: e }) {
  const t = $C(e);
  return /* @__PURE__ */ i("span", { className: K.label, children: [
    /* @__PURE__ */ n("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ n(SC, { role: t, node: e }),
    /* @__PURE__ */ n(hn, { column: un[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(hn, { column: un[1], children: e.people === void 0 ? "" : ne(e.people) }),
    /* @__PURE__ */ n(hn, { column: un[2], children: e.requestedVia ?? "" })
  ] });
}
function SC({ role: e, node: t }) {
  return /* @__PURE__ */ i(x, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function RC({ index: e, depth: t, node: a, expanded: r, leaf: l, onToggle: o, children: s }) {
  return /* @__PURE__ */ n(
    xr,
    {
      index: e,
      depth: t,
      leaf: l,
      expanded: r,
      onToggle: o,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(CC, { node: a }),
      children: s
    }
  );
}
function mn({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function xC({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${K.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(mn, { className: `${K.webMeta} ${K.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(mn, { className: `${K.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(mn, { className: `${K.webMeta} ${K.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function TC() {
  return /* @__PURE__ */ i("div", { className: K.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: K.webHeadLabel, children: "Who has which role" }),
    /* @__PURE__ */ i("span", { className: K.webColumns, children: [
      /* @__PURE__ */ n("span", { className: K.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: K.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: K.webVia, children: "Requested via" })
    ] })
  ] });
}
function LC({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${K.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "default" }) : null
  ] });
}
function MC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function AC({ rows: e, label: t }) {
  return /* @__PURE__ */ i("div", { className: K.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(TC, {}),
    /* @__PURE__ */ n(yw, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      xr,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(LC, { row: a }),
        detail: /* @__PURE__ */ n(xC, { row: a }),
        expanded: MC(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function F3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(AC, { ...e }) : /* @__PURE__ */ n(RC, { ...e });
}
const IC = "_runbook_b9agc_2", EC = "_list_b9agc_7", BC = "_step_b9agc_15", PC = "_numeral_b9agc_21", jC = "_body_b9agc_28", DC = "_head_b9agc_34", OC = "_title_b9agc_40", qC = "_detail_b9agc_45", HC = "_actions_b9agc_50", FC = "_webList_b9agc_56", zC = "_webStep_b9agc_60", WC = "_webBody_b9agc_66", KC = "_webTitle_b9agc_74", GC = "_webDetail_b9agc_78", B = {
  runbook: IC,
  list: EC,
  step: BC,
  numeral: PC,
  body: jC,
  head: DC,
  title: OC,
  detail: qC,
  actions: HC,
  webList: FC,
  webStep: zC,
  webBody: WC,
  webTitle: KC,
  webDetail: GC
}, hl = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function ml(e) {
  return String(e + 1).padStart(2, "0");
}
function UC({ step: e, index: t, connection: a }) {
  const r = hl[e.state], l = e.state === "running";
  return /* @__PURE__ */ i("li", { className: B.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: B.numeral, children: ml(t) }),
    /* @__PURE__ */ i("span", { className: B.body, children: [
      /* @__PURE__ */ i("span", { className: B.head, children: [
        /* @__PURE__ */ n("span", { className: B.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n(Be, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ n("span", { className: B.detail, children: e.detail })
    ] })
  ] });
}
function VC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: B.runbook, children: [
    /* @__PURE__ */ n("ol", { className: B.list, children: e.map((r, l) => /* @__PURE__ */ n(UC, { step: r, index: l, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: B.actions, children: t })
  ] });
}
function JC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ i("li", { className: `${B.step} ${B.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${B.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: ml(t) }),
    /* @__PURE__ */ i("span", { className: `${B.body} ${B.webBody}`, children: [
      /* @__PURE__ */ i("span", { className: `${B.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${B.title} ${B.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...hl[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Be, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${B.detail} ${B.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function YC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: B.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${B.list} ${B.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(JC, { step: r, index: l, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${B.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function z3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(YC, { ...e }) : /* @__PURE__ */ n(VC, { ...e });
}
const XC = "_list_1gu6a_2", QC = "_check_1gu6a_10", ZC = "_body_1gu6a_16", eS = "_text_1gu6a_23", tS = "_pending_1gu6a_32", nS = "_measured_1gu6a_37", at = {
  list: XC,
  check: QC,
  body: ZC,
  text: eS,
  pending: tS,
  measured: nS
};
function aS(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function rS({ check: e }) {
  const t = aS(e.passed);
  return /* @__PURE__ */ i("li", { className: `${at.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Dn, { state: t.state, label: t.label }),
    /* @__PURE__ */ i("span", { className: at.body, children: [
      /* @__PURE__ */ n("span", { className: at.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ i("span", { className: at.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: at.measured, children: e.measured })
  ] });
}
function W3({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${at.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(rS, { check: t }, t.text)) });
}
const lS = "_root_y6bbq_2", oS = "_list_y6bbq_10", iS = "_line_y6bbq_32", sS = "_at_y6bbq_59", cS = "_text_y6bbq_63", dS = "_foot_y6bbq_67", uS = "_idle_y6bbq_79", hS = "_caret_y6bbq_87", mS = "_jump_y6bbq_94", be = {
  root: lS,
  list: oS,
  line: iS,
  at: sS,
  text: cS,
  foot: dS,
  idle: uS,
  caret: hS,
  jump: mS
}, _S = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function kn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : _S.format(new Date(e));
}
const wS = { warn: "warning", ok: "ok" };
function fS({ kind: e }) {
  const t = wS[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function vS({ connection: e, idleSince: t, last: a }) {
  return e === "stale" ? /* @__PURE__ */ n("span", { className: be.idle, children: `Quiet since ${kn([t, a == null ? void 0 : a.at, ""].find(Boolean))}` }) : (a == null ? void 0 : a.at) === void 0 ? null : /* @__PURE__ */ n("span", { children: `Last event ${kn(a.at)}` });
}
function bS({ connection: e, idleSince: t, last: a, children: r }) {
  return /* @__PURE__ */ i("p", { className: `${be.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${be.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n(vS, { connection: e, idleSince: t, last: a }),
    r
  ] });
}
const pS = 8;
function gS(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > pS;
}
function yS({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${be.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const _l = ke(null);
function K3({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, l] = v(!1), o = Oa(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(_l.Provider, { value: o, children: a });
}
function NS() {
  const e = Ne(_l), [t, a] = v(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const kS = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function G3({ lines: e, connection: t, idleSince: a, label: r = "Activity", fixed: l }) {
  const o = f(null), [s, c] = v(0), [d, u] = NS(), [h, _] = v(!1), w = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), Ye(() => {
    const k = o.current;
    k && !h && (k.scrollTop = k.scrollHeight);
  }, [e.length, h]);
  const N = () => {
    var D;
    const k = o.current;
    if (!k) return;
    const M = k.querySelectorAll("[data-consline-text]");
    (D = M.item(M.length - 1)) == null || D.focus(), _(!1);
  };
  return /* @__PURE__ */ i("div", { className: be.root, children: [
    /* @__PURE__ */ n("ol", { className: be.list, ref: o, "aria-live": d ? "polite" : "off", "aria-label": r, ...kS(e.length, l), onScroll: (k) => _(gS(k.currentTarget)), children: e.map((k, M) => /* @__PURE__ */ i("li", { className: `${be.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": M < s, children: [
      /* @__PURE__ */ n("span", { className: be.at, children: kn(k.at) }),
      /* @__PURE__ */ n(fS, { kind: k.kind }),
      /* @__PURE__ */ n("span", { className: be.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${M}`)) }),
    /* @__PURE__ */ i(bS, { connection: t, idleSince: a, last: w, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${be.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(yS, { shown: h, onJump: N })
    ] })
  ] });
}
const $S = "_row_1k8wl_2", CS = "_head_1k8wl_14", SS = "_author_1k8wl_20", RS = "_eta_1k8wl_25", xS = "_edited_1k8wl_26", TS = "_body_1k8wl_32", LS = "_reason_1k8wl_37", MS = "_actions_1k8wl_42", Re = {
  row: $S,
  head: CS,
  author: SS,
  eta: RS,
  edited: xS,
  body: TS,
  reason: LS,
  actions: MS
}, AS = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function IS(e) {
  return {
    queued: "Not sent yet. Edits replace it.",
    delivered: `Sent. Edits show in ${e} as yours.`,
    retrying: "Sending. Cancel to edit.",
    failed: "Not sent. Resend or cancel."
  };
}
function ES({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: l, onViewOriginal: o }) {
  return e.delivery === "queued" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: o, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function BS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Re.reason, id: t, children: e })
  ] });
}
function PS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function jS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(ES, { ...e }) : /* @__PURE__ */ n(BS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function U3(e) {
  const { comment: t } = e;
  PS(e);
  const a = y(), r = `${a}-unavailable`, l = AS[t.delivery];
  return /* @__PURE__ */ i("div", { className: `${Re.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ i("div", { className: Re.head, children: [
      /* @__PURE__ */ n("span", { className: Re.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: Re.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Re.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Re.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Re.reason, id: a, children: IS(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Re.actions, children: /* @__PURE__ */ n(jS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const DS = "_root_lxbd7_2", OS = "_attach_lxbd7_11", qS = "_actions_lxbd7_17", HS = "_reply_lxbd7_23", FS = "_replyField_lxbd7_28", zS = "_send_lxbd7_54", WS = "_sendIcon_lxbd7_65", Je = {
  root: DS,
  attach: OS,
  actions: qS,
  reply: HS,
  replyField: FS,
  send: zS,
  sendIcon: WS
};
function wl({ value: e, onChange: t }) {
  const [a, r] = v("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function KS() {
  return /* @__PURE__ */ n("svg", { className: Je.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function GS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function US(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [l, o] = wl(e), s = () => {
    l.trim() !== "" && r(a, l);
  }, c = (d) => {
    GS(d) && (d.preventDefault(), s());
  };
  return /* @__PURE__ */ n("div", { className: Je.reply, "data-ward-composer": "reply", children: /* @__PURE__ */ i("div", { className: Je.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: c, children: [
    /* @__PURE__ */ n(E, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: l, onChange: o }),
    /* @__PURE__ */ i(b, { variant: "primary", className: Je.send, onClick: s, children: [
      /* @__PURE__ */ n(KS, {}),
      /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
    ] })
  ] }) });
}
function V3(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(US, { ...e }) : /* @__PURE__ */ n(VS, { ...e });
}
function VS(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: l, onPost: o, onDraft: s } = e, [c, d] = wl(e);
  return /* @__PURE__ */ i("div", { className: Je.root, children: [
    /* @__PURE__ */ n(E, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ i("div", { className: Je.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ n(
      er,
      {
        label: `Run ${l.agent} again after you post`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ i("div", { className: Je.actions, children: [
      /* @__PURE__ */ n(b, { variant: "primary", onClick: () => o(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const JS = "_list_1yhks_2", YS = "_item_1yhks_6", XS = "_body_1yhks_22", QS = "_text_1yhks_28", ZS = "_evidence_1yhks_37", e2 = "_consequence_1yhks_49", lt = {
  list: JS,
  item: YS,
  body: XS,
  text: QS,
  evidence: ZS,
  consequence: e2
};
function t2({ criterion: e }) {
  return /* @__PURE__ */ n(We, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Ma({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function n2({ criterion: e }) {
  return /* @__PURE__ */ i("span", { className: lt.body, children: [
    /* @__PURE__ */ n("span", { className: lt.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(Ma, { text: " · " }),
      /* @__PURE__ */ n("code", { className: lt.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met || !e.why ? null : /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(Ma, { text: " · " }),
      /* @__PURE__ */ n("span", { className: lt.consequence, children: e.why })
    ] })
  ] });
}
function a2({ criterion: e }) {
  return /* @__PURE__ */ i("li", { className: lt.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(t2, { criterion: e }),
    /* @__PURE__ */ n(n2, { criterion: e })
  ] });
}
function J3({ criteria: e }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n("ul", { className: `${lt.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(a2, { criterion: t }, t.text)) }) });
}
const r2 = "_list_dwhoz_2", l2 = "_rung_dwhoz_6", o2 = "_name_dwhoz_18", i2 = "_actor_dwhoz_32", Pt = {
  list: r2,
  rung: l2,
  name: o2,
  actor: i2
}, s2 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function c2({ rung: e }) {
  const t = s2[e.state];
  return /* @__PURE__ */ i("li", { className: Pt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: Pt.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${Pt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function Y3({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Pt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(c2, { rung: t }, t.name)) });
}
const d2 = "_sheet_pw37w_2", u2 = "_title_pw37w_9", h2 = "_stage_pw37w_15", m2 = "_effects_pw37w_20", _2 = "_effect_pw37w_20", w2 = "_numeral_pw37w_31", f2 = "_effectText_pw37w_38", v2 = "_refusals_pw37w_43", b2 = "_reasons_pw37w_52", p2 = "_reason_pw37w_52", g2 = "_actions_pw37w_62", we = {
  sheet: d2,
  title: u2,
  stage: h2,
  effects: m2,
  effect: _2,
  numeral: w2,
  effectText: f2,
  refusals: v2,
  reasons: b2,
  reason: p2,
  actions: g2
};
function y2({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function X3({ run: e, effects: t, refusals: a, cost: r, onRequeue: l, onClose: o, returnFocusTo: s }) {
  const c = y(), d = `${c}-refusal`, [u, h] = v(""), _ = a.length > 0;
  return /* @__PURE__ */ n(dt, { kind: "sheet", labelledBy: c, onClose: o, returnFocusTo: s, children: /* @__PURE__ */ i("div", { className: we.sheet, children: [
    /* @__PURE__ */ i("h2", { className: we.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: we.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: we.effects, children: t.map((w, N) => /* @__PURE__ */ i("li", { className: we.effect, children: [
      /* @__PURE__ */ n("span", { className: we.numeral, children: String(N + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: we.effectText, children: w })
    ] }, w)) }),
    /* @__PURE__ */ n(
      t_,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This run adds", amount: r.more },
          { label: "Total", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(E, { kind: "textarea", label: "Note", value: u, onChange: h }),
    _ && /* @__PURE__ */ i("div", { className: we.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: we.reasons, children: a.map((w, N) => /* @__PURE__ */ n("li", { className: we.reason, id: N === 0 ? d : void 0, children: w.reason }, w.reason)) })
    ] }),
    /* @__PURE__ */ i("div", { className: we.actions, children: [
      /* @__PURE__ */ n(y2, { refused: _, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(b, { onClick: o, children: "Cancel" })
    ] })
  ] }) });
}
const N2 = "_list_1laeg_2", k2 = "_path_1laeg_7", $2 = "_consequence_1laeg_35", $n = {
  list: N2,
  path: k2,
  consequence: $2
}, Aa = {
  clarify: "Ask a question",
  requeue: "Run again",
  override: "Override and advance"
};
function C2(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Ia(e) {
  return e ? "primary" : "secondary";
}
function S2({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: Ia(t), size: "sm", onClick: () => a(e.kind), children: Aa[e.kind] }) : /* @__PURE__ */ n(b, { variant: Ia(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: Aa[e.kind] });
}
function R2({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ i("li", { className: $n.path, "data-allowed": e.allowed, "data-role": C2(e.requiredRole), children: [
    /* @__PURE__ */ n("span", { className: $n.consequence, children: e.consequence }),
    /* @__PURE__ */ n(S2, { path: e, primary: t, onChoose: a })
  ] });
}
function Q3({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: $n.list, children: e.map((a, r) => /* @__PURE__ */ n(R2, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const x2 = "_list_1m7i0_2", T2 = "_item_1m7i0_6", L2 = "_node_1m7i0_18", M2 = "_body_1m7i0_24", A2 = "_head_1m7i0_30", I2 = "_stage_1m7i0_36", E2 = "_version_1m7i0_41", B2 = "_sentence_1m7i0_49", P2 = "_meta_1m7i0_54", Te = {
  list: x2,
  item: T2,
  node: L2,
  body: M2,
  head: A2,
  stage: I2,
  version: E2,
  sentence: B2,
  meta: P2
}, j2 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function D2({ entry: e }) {
  return /* @__PURE__ */ i("span", { className: Te.head, children: [
    /* @__PURE__ */ n("span", { className: Te.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Te.version, title: e.version, children: e.version }) : null
  ] });
}
function O2({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ i("li", { className: `${Te.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Te.node} ward-history-node`, children: /* @__PURE__ */ n(We, { size: 9, kind: j2[e.state], label: e.state }) }),
    /* @__PURE__ */ i("span", { className: `${Te.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(D2, { entry: e }),
      /* @__PURE__ */ n("span", { className: Te.sentence, children: e.sentence }),
      /* @__PURE__ */ i("span", { className: `${Te.meta} ward-history-meta`, children: [
        `${me(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function Z3({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Te.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(O2, { entry: t }, t.stage + String(a))) });
}
const q2 = "_thread_1e70p_3", H2 = "_turn_1e70p_8", F2 = "_who_1e70p_27", z2 = "_body_1e70p_32", jt = {
  thread: q2,
  turn: H2,
  who: F2,
  body: z2
}, fl = ke(!1);
function eM({ children: e, density: t }) {
  return /* @__PURE__ */ n(fl.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${jt.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function tM({ turn: e }) {
  if (!Ne(fl)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ i("li", { className: `${jt.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ i("span", { className: `${jt.who} ward-chat-who`, children: [
      e.author,
      " · ",
      me(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${jt.body} ward-chat-body`, children: e.body })
  ] });
}
const W2 = "_list_yiolt_3", K2 = "_row_yiolt_7", G2 = "_label_yiolt_20", U2 = "_n_yiolt_26", V2 = "_cause_yiolt_33", vt = {
  list: W2,
  row: K2,
  label: G2,
  n: U2,
  cause: V2
};
function J2(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Y2 = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function X2({ row: e, formatNumber: t }) {
  return J2(e), /* @__PURE__ */ i("li", { className: `${vt.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(We, { size: 8, ...Y2[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: vt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${vt.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(Q2, { cause: e.cause })
  ] });
}
function Q2({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${vt.cause} ward-healthrow-cause`, children: e }) : null;
}
function nM({ rows: e, formatNumber: t = ne }) {
  return /* @__PURE__ */ n("ul", { className: `${vt.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(X2, { row: a, formatNumber: t }, a.label)) });
}
const Z2 = "_root_1jxwp_2", eR = {
  root: Z2
};
function aM({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ i("div", { className: eR.root, "data-density": l, children: [
    /* @__PURE__ */ n(nn, { items: e, note: t, density: l }),
    /* @__PURE__ */ n(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const tR = "_row_dhbre_3", nR = "_key_dhbre_13", aR = "_stack_dhbre_24", rR = "_value_dhbre_32", lR = "_evidence_dhbre_39", oR = "_mark_dhbre_47", tt = {
  row: tR,
  key: nR,
  stack: aR,
  value: rR,
  evidence: lR,
  mark: oR
};
function iR({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Check" }) : /* @__PURE__ */ n(Dn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function rM({ field: e }) {
  return /* @__PURE__ */ i("li", { className: `${tt.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${tt.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ i("span", { className: `${tt.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${tt.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ i("span", { className: `${tt.evidence} ward-resfield-evidence`, title: e.evidence, children: [
        "Source: ",
        e.evidence
      ] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${tt.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(iR, { state: e.state }) })
  ] });
}
const sR = "_cell_gh2sd_2", cR = {
  cell: sR
}, dR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function uR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function hR(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function mR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: uR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function _R(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function lM({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  hR(e, a);
  const r = _R(e);
  return /* @__PURE__ */ n(
    w_,
    {
      label: "Rejection rules",
      columns: dR,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, o) => /* @__PURE__ */ n("span", { className: cR.cell, "data-norerun": l.noRerun ? !0 : void 0, children: mR(l, o) }),
      empty: t ?? /* @__PURE__ */ n(sf, { sentence: "No rejection rules yet." })
    }
  );
}
const wR = "_row_1f2re_2", fR = "_title_1f2re_12", vR = "_turns_1f2re_18", bR = "_waiting_1f2re_19", pR = "_resolved_1f2re_20", gR = "_activity_1f2re_21", yR = "_cost_1f2re_28", NR = "_link_1f2re_29", kR = "_tableLink_1f2re_47", $R = "_tableRecord_1f2re_48", CR = "_tableRow_1f2re_59", SR = "_tableTitle_1f2re_71", RR = "_tableResolved_1f2re_76", xR = "_tableMeta_1f2re_87", TR = "_tableCost_1f2re_94", LR = "_tableActivity_1f2re_95", MR = "_tableState_1f2re_105", H = {
  row: wR,
  title: fR,
  turns: vR,
  waiting: bR,
  resolved: pR,
  activity: gR,
  cost: yR,
  link: NR,
  tableLink: kR,
  tableRecord: $R,
  tableRow: CR,
  tableTitle: SR,
  tableResolved: RR,
  tableMeta: xR,
  tableCost: TR,
  tableActivity: LR,
  tableState: MR
}, vl = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function AR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function IR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function ER(e) {
  const t = e.join(", ");
  return t === "" ? "—" : t;
}
const BR = { duplicate: "Closed · duplicate" };
function PR({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(it, { className: H.tableMeta, text: `waiting on ${e}` });
}
function jR({ value: e }) {
  return /* @__PURE__ */ n("td", { className: H.tableCost, children: e === void 0 ? null : le(e) });
}
function DR({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${H.tableRecord} ward-target`, href: T(e.href), children: `→ ${e.key}` });
}
function OR({ session: e, href: t }) {
  const a = vl[e.state];
  return /* @__PURE__ */ i("tr", { className: H.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ i("td", { className: H.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${H.tableLink} ward-target`, href: T(t), children: /* @__PURE__ */ n(it, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: H.tableMeta, children: IR(e) })
    ] }),
    /* @__PURE__ */ i("td", { className: H.tableResolved, children: [
      ER(e.resolved),
      /* @__PURE__ */ n(PR, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(jR, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: H.tableActivity, children: AR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: H.tableState, children: /* @__PURE__ */ i("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: BR[e.state] ?? a.label }),
      /* @__PURE__ */ n(DR, { link: e.link })
    ] }) })
  ] });
}
function qR({ session: e }) {
  const t = vl[e.state];
  return /* @__PURE__ */ i("div", { className: H.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(it, { className: H.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: H.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(it, { className: H.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: H.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: H.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : le(e.cost) }),
    /* @__PURE__ */ n("span", { className: H.activity, children: me(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: H.link, href: T(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function oM(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(OR, { session: e.session, href: e.href }) : /* @__PURE__ */ n(qR, { session: e.session });
}
const HR = "_block_1yy2v_3", FR = "_list_1yy2v_9", zR = "_line_1yy2v_14", Cn = {
  block: HR,
  list: FR,
  line: zR
}, WR = { warn: "warning", ok: "ok" };
function KR({ kind: e }) {
  const t = WR[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function GR({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ i("li", { className: `${Cn.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(KR, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function iM({ lines: e, label: t = "Agent input" }) {
  return /* @__PURE__ */ n("div", { className: `${Cn.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Cn.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(GR, { line: a }, `${r}-${a.text}`)) }) });
}
const UR = "_band_tt7hp_1", VR = "_head_tt7hp_8", JR = "_cell_tt7hp_19", YR = "_index_tt7hp_35", XR = "_title_tt7hp_42", QR = "_note_tt7hp_48", ZR = "_cellTitle_tt7hp_53", ex = "_cellBody_tt7hp_58", tx = "_tag_tt7hp_64", Se = {
  band: UR,
  head: VR,
  cell: JR,
  index: YR,
  title: XR,
  note: QR,
  cellTitle: ZR,
  cellBody: ex,
  tag: tx
}, Ea = 4;
function sM({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== Ea)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Ea}-cell grid`);
  return /* @__PURE__ */ i("section", { className: Se.band, "aria-label": `${e} ${t}`, children: [
    /* @__PURE__ */ i("div", { className: Se.head, children: [
      /* @__PURE__ */ n("span", { className: Se.index, children: e }),
      /* @__PURE__ */ n("span", { className: Se.title, children: t }),
      /* @__PURE__ */ n("span", { className: Se.note, children: a })
    ] }),
    r.map((l) => /* @__PURE__ */ i("div", { className: Se.cell, children: [
      /* @__PURE__ */ n("span", { className: Se.cellTitle, children: l.title }),
      /* @__PURE__ */ n("span", { className: Se.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ n("span", { className: Se.tag, children: l.tag })
    ] }, l.title))
  ] });
}
const nx = "_tag_1yuvz_2", ax = "_link_1yuvz_14", _n = {
  tag: nx,
  link: ax
};
function bl({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: _n.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${_n.tag} ${_n.link}`, href: T(t), children: e });
}
const rx = "_eyebrow_m8swv_2", lx = "_link_m8swv_10", Ba = {
  eyebrow: rx,
  link: lx
};
function an({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: Ba.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${Ba.link} ward-target`, href: T(t), children: e }) });
}
const ox = "_figure_qz9i7_2", ix = "_media_qz9i7_9", sx = "_caption_qz9i7_35", wn = {
  figure: ox,
  media: ix,
  caption: sx
};
function cx(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(x, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function Sn(e) {
  return /* @__PURE__ */ i("figure", { className: wn.figure, children: [
    /* @__PURE__ */ n("div", { className: wn.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(cx, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: wn.caption, children: e.caption })
  ] });
}
function kt(e) {
  return `h${e}`;
}
function dx(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const ux = "_prose_1fxb9_2", hx = "_anchor_1fxb9_79", pl = {
  prose: ux,
  anchor: hx
};
function Rn({ children: e }) {
  return /* @__PURE__ */ n("div", { className: pl.prose, children: e });
}
function cM({ level: e, children: t, id: a }) {
  const r = kt(e), l = a ?? dx(t);
  return /* @__PURE__ */ i(r, { id: l, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${pl.anchor} ward-target`, href: `#${l}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const mx = "_list_176jq_2", _x = "_pair_176jq_8", wx = "_term_176jq_14", fx = "_value_176jq_19", xt = {
  list: mx,
  pair: _x,
  term: wx,
  value: fx
};
function vx({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: xt.list, children: e.map((t) => /* @__PURE__ */ i("div", { className: xt.pair, children: [
    /* @__PURE__ */ n("dt", { className: xt.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: xt.value, children: t.value })
  ] }, t.term)) });
}
const bx = "_nav_sgeyg_2", px = "_item_sgeyg_6", gx = "_link_sgeyg_13", yx = "_note_sgeyg_30", Tt = {
  nav: bx,
  item: px,
  link: gx,
  note: yx
};
function Nx({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: Tt.nav, children: /* @__PURE__ */ n(b_, { children: t.map((a) => /* @__PURE__ */ i("li", { className: Tt.item, children: [
    /* @__PURE__ */ n("a", { className: `${Tt.link} ward-target`, href: T(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: Tt.note, children: a.note })
  ] }, a.href)) }) });
}
const kx = "_header_kelio_2", $x = "_skip_kelio_14", Cx = "_brand_kelio_39", Sx = "_list_kelio_46", Rx = "_link_kelio_56", nt = {
  header: kx,
  skip: $x,
  brand: Cx,
  list: Sx,
  link: Rx
};
function dM({ brand: e, links: t, current: a, homeHref: r = "/", mainId: l = "main", skipLabel: o = "Skip to content" }) {
  return /* @__PURE__ */ i("header", { className: nt.header, children: [
    /* @__PURE__ */ n("a", { className: nt.skip, href: `#${l}`, children: o }),
    /* @__PURE__ */ n("a", { className: `${nt.brand} ward-target`, href: T(r), children: e }),
    /* @__PURE__ */ n("nav", { "aria-label": "Main", className: nt.nav, children: /* @__PURE__ */ n("ul", { className: nt.list, role: "list", children: t.map((s) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${nt.link} ward-target`, href: T(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const xx = "_footer_1jb5e_2", Tx = "_note_1jb5e_12", Lx = "_list_1jb5e_18", Mx = "_link_1jb5e_27", Lt = {
  footer: xx,
  note: Tx,
  list: Lx,
  link: Mx
};
function uM({ note: e, links: t = [], label: a = "Footer" }) {
  return /* @__PURE__ */ i("footer", { className: Lt.footer, children: [
    /* @__PURE__ */ n("p", { className: Lt.note, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("nav", { "aria-label": a, children: /* @__PURE__ */ n("ul", { className: Lt.list, role: "list", children: t.map((r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${Lt.link} ward-target`, href: T(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const Ax = "_intro_13128_2", Ix = "_title_13128_9", Ex = "_lead_13128_17", fn = {
  intro: Ax,
  title: Ix,
  lead: Ex
};
function Vn({ title: e, eyebrow: t, eyebrowHref: a, lead: r, headingLevel: l = 1, children: o }) {
  const s = kt(l);
  return /* @__PURE__ */ i("header", { className: fn.intro, children: [
    t === void 0 ? null : /* @__PURE__ */ n(an, { href: a, children: t }),
    /* @__PURE__ */ n(s, { className: fn.title, children: e }),
    r === void 0 ? null : /* @__PURE__ */ n("p", { className: fn.lead, children: r }),
    o
  ] });
}
const Bx = "_section_u0k7p_2", Px = "_head_u0k7p_13", jx = "_titles_u0k7p_21", Dx = "_title_u0k7p_21", Ox = "_link_u0k7p_34", wt = {
  section: Bx,
  head: Px,
  titles: jx,
  title: Dx,
  link: Ox
};
function qx({ title: e, headingId: t, eyebrow: a, link: r, headingLevel: l }) {
  const o = kt(l);
  return /* @__PURE__ */ i("div", { className: wt.head, children: [
    /* @__PURE__ */ i("div", { className: wt.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ n(an, { children: a }),
      /* @__PURE__ */ n(o, { className: wt.title, id: t, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ n("a", { className: `${wt.link} ward-target`, href: T(r.href), children: r.label })
  ] });
}
function hM({ title: e, children: t, id: a, eyebrow: r, link: l, headingLevel: o = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ i("section", { className: wt.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ n(qx, { title: e, headingId: d, eyebrow: r, link: l, headingLevel: o }),
    t
  ] });
}
const Hx = "_split_1ycaa_2", Fx = "_main_1ycaa_10", zx = "_aside_1ycaa_15", vn = {
  split: Hx,
  main: Fx,
  aside: zx
};
function Wx({ children: e, aside: t, asideLabel: a }) {
  return /* @__PURE__ */ i("div", { className: vn.split, children: [
    /* @__PURE__ */ n("div", { className: vn.main, children: e }),
    /* @__PURE__ */ n("aside", { className: vn.aside, "aria-label": a, children: t })
  ] });
}
const Kx = "_hero_ehbct_2", Gx = "_text_ehbct_11", Ux = "_visual_ehbct_23", Vx = "_title_ehbct_28", Jx = "_lead_ehbct_36", Yx = "_actions_ehbct_42", Xx = "_action_ehbct_42", Qx = "_primary_ehbct_63", Zx = "_secondary_ehbct_72", Ie = {
  hero: Kx,
  text: Gx,
  visual: Ux,
  title: Vx,
  lead: Jx,
  actions: Yx,
  action: Xx,
  primary: Qx,
  secondary: Zx
};
function eT({ actions: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ n("div", { className: Ie.actions, children: e.map((t, a) => /* @__PURE__ */ n("a", { className: `${Ie.action} ${a === 0 ? Ie.primary : Ie.secondary}`, href: T(t.href), children: t.label }, `${t.href}-${t.label}`)) });
}
function tT({ title: e, eyebrow: t, lead: a, actions: r = [] }) {
  return /* @__PURE__ */ i("div", { className: Ie.text, children: [
    t === void 0 ? null : /* @__PURE__ */ n(an, { children: t }),
    /* @__PURE__ */ n("h1", { className: Ie.title, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("p", { className: Ie.lead, children: a }),
    /* @__PURE__ */ n(eT, { actions: r })
  ] });
}
function mM({ visual: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: Ie.hero, "data-visual": e === void 0 ? "none" : "beside", children: [
    /* @__PURE__ */ n(tT, { ...t }),
    e === void 0 ? null : /* @__PURE__ */ n("div", { className: Ie.visual, children: e })
  ] });
}
const nT = "_chain_w2k2l_2", aT = "_step_w2k2l_12", rT = "_arrow_w2k2l_19", lT = "_box_w2k2l_24", Mt = {
  chain: nT,
  step: aT,
  arrow: rT,
  box: lT
};
function _M({ steps: e, label: t, animate: a }) {
  return /* @__PURE__ */ n("ol", { className: Mt.chain, "aria-label": t, "data-ward-animate": a ?? "", children: e.map((r, l) => /* @__PURE__ */ i("li", { className: Mt.step, style: { "--ward-step": l }, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: Mt.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n("span", { className: Mt.box, children: r })
  ] }, l)) });
}
const oT = "_card_1u2gr_2", iT = "_featured_1u2gr_20", sT = "_media_1u2gr_28", cT = "_body_1u2gr_32", dT = "_title_1u2gr_48", uT = "_link_1u2gr_60", hT = "_summary_1u2gr_78", mT = "_tags_1u2gr_84", _T = "_cta_1u2gr_90", fe = {
  card: oT,
  featured: iT,
  media: sT,
  body: cT,
  title: dT,
  link: uT,
  summary: hT,
  tags: mT,
  cta: _T
};
function gl({ media: e, ratio: t = "16/9" }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: fe.media, children: /* @__PURE__ */ n(Sn, { ratio: t, children: e }) });
}
function wT({ href: e, title: t, headingLevel: a = 3 }) {
  const r = kt(a);
  return /* @__PURE__ */ n(r, { className: fe.title, children: /* @__PURE__ */ n("a", { className: fe.link, href: T(e), children: t }) });
}
function yl({ eyebrow: e, ...t }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ n(an, { children: e }),
    /* @__PURE__ */ n(wT, { ...t })
  ] });
}
function Nl({ summary: e, tags: t = [] }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.summary, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("span", { className: fe.tags, children: t.map((a) => /* @__PURE__ */ n(bl, { label: a }, a)) })
  ] });
}
function wM({ media: e, ratio: t, eyebrow: a, summary: r, tags: l, ...o }) {
  return /* @__PURE__ */ i("article", { className: fe.card, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(gl, { media: e, ratio: t }),
    /* @__PURE__ */ i("div", { className: fe.body, children: [
      /* @__PURE__ */ n(yl, { eyebrow: a, ...o }),
      /* @__PURE__ */ n(Nl, { summary: r, tags: l })
    ] })
  ] });
}
function fM({ media: e, ratio: t, eyebrow: a, summary: r, tags: l, cta: o, ...s }) {
  return /* @__PURE__ */ i("article", { className: `${fe.card} ${fe.featured}`, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(gl, { media: e, ratio: t }),
    /* @__PURE__ */ i("div", { className: fe.body, children: [
      /* @__PURE__ */ n(yl, { eyebrow: a, ...s }),
      /* @__PURE__ */ n(Nl, { summary: r, tags: l }),
      o === void 0 ? null : /* @__PURE__ */ i("span", { className: fe.cta, "aria-hidden": "true", children: [
        o,
        " →"
      ] })
    ] })
  ] });
}
const fT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function kl(e) {
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : `${t.getUTCDate()} ${fT[t.getUTCMonth()]} ${t.getUTCFullYear()}`;
}
const vT = "_row_1peme_2", bT = "_title_1peme_15", pT = "_link_1peme_23", gT = "_meta_1peme_40", yT = "_summary_1peme_46", mt = {
  row: vT,
  title: bT,
  link: pT,
  meta: gT,
  summary: yT
};
function vM({ href: e, title: t, date: a, meta: r, summary: l, headingLevel: o = 3 }) {
  const s = kt(o);
  return /* @__PURE__ */ i("article", { className: mt.row, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(s, { className: mt.title, children: /* @__PURE__ */ n("a", { className: mt.link, href: T(e), children: t }) }),
    /* @__PURE__ */ i("p", { className: mt.meta, children: [
      /* @__PURE__ */ n("time", { dateTime: a, children: kl(a) }),
      r === void 0 ? null : ` · ${r}`
    ] }),
    l === void 0 ? null : /* @__PURE__ */ n("p", { className: mt.summary, children: l })
  ] });
}
const NT = "_list_dd8kj_2", kT = "_item_dd8kj_16", Pa = {
  list: NT,
  item: kT
};
function bM({ children: e, rules: t = !1, label: a }) {
  return /* @__PURE__ */ n("ul", { className: Pa.list, role: "list", "aria-label": a, "data-rules": t, children: Ha.toArray(e).map((r, l) => /* @__PURE__ */ n("li", { className: Pa.item, children: r }, l)) });
}
const $T = "_page_i3r2z_2", CT = "_aside_i3r2z_8", ST = "_tags_i3r2z_13", Jn = {
  page: $T,
  aside: CT,
  tags: ST
};
function RT({ labels: e }) {
  return /* @__PURE__ */ n("span", { className: Jn.tags, children: e.map((t) => /* @__PURE__ */ n(bl, { label: t }, t)) });
}
function xT(e) {
  return e[1] !== void 0 && e[1].length > 0;
}
function TT(e) {
  return e.filter(xT).map(([t, a]) => ({
    term: t,
    value: typeof a == "string" ? a : /* @__PURE__ */ n(RT, { labels: a })
  }));
}
function LT({ facts: e, links: t, linksLabel: a }) {
  return /* @__PURE__ */ i("div", { className: Jn.aside, children: [
    e.length === 0 ? null : /* @__PURE__ */ n(vx, { facts: e }),
    t === void 0 || t.length === 0 ? null : /* @__PURE__ */ n(Nx, { label: a, links: t })
  ] });
}
function $l({ facts: e, links: t = [], linksLabel: a, asideLabel: r, children: l }) {
  return e.length === 0 && t.length === 0 ? /* @__PURE__ */ n(Rn, { children: l }) : /* @__PURE__ */ n(Wx, { asideLabel: r, aside: /* @__PURE__ */ n(LT, { facts: e, links: t, linksLabel: a }), children: /* @__PURE__ */ n(Rn, { children: l }) });
}
function pM({ title: e, summary: t, children: a, eyebrow: r, eyebrowHref: l, role: o, period: s, focus: c, stack: d, related: u }) {
  const h = TT([
    ["Role", o],
    ["Period", s],
    ["Focus", c],
    ["Stack", d]
  ]);
  return /* @__PURE__ */ i("article", { className: Jn.page, children: [
    /* @__PURE__ */ n(Vn, { title: e, lead: t, eyebrow: r, eyebrowHref: l }),
    /* @__PURE__ */ n($l, { facts: h, links: u, linksLabel: "Related", asideLabel: "Case study facts", children: a })
  ] });
}
const MT = "_page_1junb_2", AT = "_source_1junb_8", IT = "_shots_1junb_30", xn = {
  page: MT,
  source: AT,
  shots: IT
};
function ET({ shots: e, ratio: t }) {
  return e.length === 0 ? null : e.length === 1 ? /* @__PURE__ */ n(Sn, { ...e[0], ratio: t }) : /* @__PURE__ */ n("ul", { className: xn.shots, role: "list", "aria-label": "Screenshots", children: e.map((a, r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(Sn, { ...a, ratio: t }) }, r)) });
}
function gM(e) {
  const { title: t, summary: a, children: r, source: l, facts: o = [], screenshots: s = [], ratio: c = "16/9" } = e;
  return /* @__PURE__ */ i("article", { className: xn.page, children: [
    /* @__PURE__ */ n(Vn, { title: t, lead: a, eyebrow: e.eyebrow, eyebrowHref: e.eyebrowHref, children: /* @__PURE__ */ n("a", { className: xn.source, href: T(l.href), children: l.label }) }),
    /* @__PURE__ */ n(ET, { shots: s, ratio: c }),
    /* @__PURE__ */ n($l, { facts: o, linksLabel: "Links", asideLabel: "Project facts", children: r })
  ] });
}
function BT(e) {
  const t = [], a = [];
  for (const r of e) {
    const l = { ...r, children: [] };
    for (; a.length > 0 && a[a.length - 1].level >= r.level; ) a.pop();
    const o = a[a.length - 1];
    (o === void 0 ? t : o.children).push(l), a.push(l);
  }
  return t;
}
const PT = "_article_drsu4_2", jT = "_meta_drsu4_8", DT = "_tldr_drsu4_14", OT = "_tldrLabel_drsu4_21", qT = "_tldrText_drsu4_27", HT = "_toc_drsu4_40", FT = "_tocTitle_drsu4_44", zT = "_tocList_drsu4_50", WT = "_tocLink_drsu4_65", Ee = {
  article: PT,
  meta: jT,
  tldr: DT,
  tldrLabel: OT,
  tldrText: qT,
  toc: HT,
  tocTitle: FT,
  tocList: zT,
  tocLink: WT
};
function KT({ date: e, minutes: t }) {
  return /* @__PURE__ */ i("p", { className: Ee.meta, children: [
    /* @__PURE__ */ n("time", { dateTime: e, children: kl(e) }),
    t === void 0 ? null : ` · ${t} min read`
  ] });
}
function GT({ children: e }) {
  return /* @__PURE__ */ i("div", { className: Ee.tldr, role: "note", "aria-label": "TL;DR", children: [
    /* @__PURE__ */ n("p", { className: Ee.tldrLabel, children: "TL;DR" }),
    /* @__PURE__ */ n("div", { className: Ee.tldrText, children: e })
  ] });
}
function Cl({ nodes: e }) {
  return /* @__PURE__ */ n("ol", { className: Ee.tocList, role: "list", children: e.map((t) => /* @__PURE__ */ i("li", { children: [
    /* @__PURE__ */ n("a", { className: `${Ee.tocLink} ward-target`, href: `#${t.id}`, children: t.text }),
    t.children.length === 0 ? null : /* @__PURE__ */ n(Cl, { nodes: t.children })
  ] }, t.id)) });
}
function UT({ headings: e }) {
  const t = y();
  return e.length === 0 ? null : /* @__PURE__ */ i("nav", { className: Ee.toc, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h2", { className: Ee.tocTitle, id: t, children: "On this page" }),
    /* @__PURE__ */ n(Cl, { nodes: BT(e) })
  ] });
}
function yM({ title: e, date: t, children: a, minutes: r, tldr: l, headings: o = [], eyebrow: s, eyebrowHref: c }) {
  return /* @__PURE__ */ i("article", { className: Ee.article, children: [
    /* @__PURE__ */ n(Vn, { title: e, eyebrow: s, eyebrowHref: c, children: /* @__PURE__ */ n(KT, { date: t, minutes: r }) }),
    l === void 0 ? null : /* @__PURE__ */ n(GT, { children: l }),
    /* @__PURE__ */ n(UT, { headings: o }),
    /* @__PURE__ */ n(Rn, { children: a })
  ] });
}
const VT = 220;
function JT(e) {
  return e.replace(/<[^>]*>/g, " ").split(/\s+/).filter((a) => /[\p{L}\p{N}]/u.test(a)).length;
}
function NM(e) {
  return Math.max(1, Math.ceil(JT(e) / VT));
}
const Ut = { w: 184, h: 96 }, st = { w: 152, h: 48 }, Vt = 16, At = (e) => Math.round(e * 10) / 10;
function Sl(e) {
  return { x: Vt + e.col * Ut.w, y: Vt + e.row * Ut.h, w: st.w, h: st.h };
}
function YT(e) {
  const t = Math.max(0, ...e.map((r) => r.col)), a = Math.max(0, ...e.map((r) => r.row));
  return { w: 2 * Vt + t * Ut.w + st.w, h: 2 * Vt + a * Ut.h + st.h };
}
function ja(e, t, a) {
  return Math.min(e.w / 2 / Math.abs(t), e.h / 2 / Math.abs(a));
}
function XT(e, t) {
  const a = e.x + e.w / 2, r = e.y + e.h / 2, l = t.x + t.w / 2 - a, o = t.y + t.h / 2 - r, s = ja(e, l, o), c = 1 - ja(t, l, o);
  return { x1: At(a + l * s), y1: At(r + o * s), x2: At(a + l * c), y2: At(r + o * c) };
}
function QT() {
  const [e, t] = v(!1);
  return S(() => {
    var l;
    const a = (l = window.matchMedia) == null ? void 0 : l.call(window, "(prefers-reduced-motion: no-preference)");
    if (!a) return;
    const r = (o) => t(o.matches);
    return t(a.matches), a.addEventListener("change", r), () => a.removeEventListener("change", r);
  }, []), e;
}
const ZT = "_diagram_76e4t_2", eL = "_label_76e4t_9", tL = "_svg_76e4t_14", nL = "_node_76e4t_20", aL = "_edge_76e4t_33", rL = "_arrow_76e4t_38", lL = "_controls_76e4t_63", oL = "_live_76e4t_70", iL = "_steps_76e4t_77", Le = {
  diagram: ZT,
  label: eL,
  svg: tL,
  node: nL,
  edge: aL,
  arrow: rL,
  controls: lL,
  live: oL,
  steps: iL
};
function sL({ nodes: e, edges: t, lit: a, marker: r }) {
  const l = new Map(e.map((o) => [o.id, Sl(o)]));
  return t.map((o) => {
    const s = l.get(o.from), c = l.get(o.to);
    if (s === void 0 || c === void 0) return null;
    const d = a(o.from) && a(o.to);
    return /* @__PURE__ */ n("line", { className: Le.edge, "data-active": d, ...XT(s, c), markerEnd: `url(#${r})` }, `${o.from}>${o.to}`);
  });
}
function cL({ nodes: e, lit: t }) {
  return e.map((a) => {
    const r = Sl(a);
    return /* @__PURE__ */ i("g", { className: Le.node, "data-active": t(a.id), "data-node": a.id, children: [
      /* @__PURE__ */ n("rect", { x: r.x, y: r.y, width: r.w, height: r.h, rx: "8" }),
      /* @__PURE__ */ n("text", { x: r.x + st.w / 2, y: r.y + st.h / 2, children: a.label })
    ] }, a.id);
  });
}
function Da({ label: e, to: t, count: a, go: r, status: l }) {
  return t < 0 || t >= a ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: l, children: e }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => r(t), children: e });
}
function dL({ at: e, count: t, text: a, go: r }) {
  const l = y();
  return /* @__PURE__ */ i("div", { className: Le.controls, children: [
    /* @__PURE__ */ n(Da, { label: "Back", to: e - 1, count: t, go: r, status: l }),
    /* @__PURE__ */ n(Da, { label: "Next", to: e + 1, count: t, go: r, status: l }),
    /* @__PURE__ */ n("p", { className: Le.live, id: l, "aria-live": "polite", children: `Step ${e + 1} of ${t}: ${a}` })
  ] });
}
function kM({ label: e, nodes: t, edges: a, steps: r }) {
  const l = QT() && r.length > 0, [o, s] = v(0), c = y(), d = (h) => l && r[o].nodes.includes(h), u = YT(t);
  return /* @__PURE__ */ i("figure", { className: Le.diagram, "data-live": l, "aria-labelledby": c, children: [
    /* @__PURE__ */ n("figcaption", { className: Le.label, id: c, children: e }),
    /* @__PURE__ */ i("svg", { className: Le.svg, viewBox: `0 0 ${u.w} ${u.h}`, width: u.w, height: u.h, "aria-hidden": "true", children: [
      /* @__PURE__ */ n("defs", { children: /* @__PURE__ */ n("marker", { id: `${c}-arrow`, viewBox: "0 0 8 8", refX: "7", refY: "4", markerWidth: "8", markerHeight: "8", markerUnits: "userSpaceOnUse", orient: "auto-start-reverse", children: /* @__PURE__ */ n("path", { className: Le.arrow, d: "M0 0 L8 4 L0 8 z" }) }) }),
      /* @__PURE__ */ n(sL, { nodes: t, edges: a, lit: d, marker: `${c}-arrow` }),
      /* @__PURE__ */ n(cL, { nodes: t, lit: d })
    ] }),
    l ? /* @__PURE__ */ n(dL, { at: o, count: r.length, text: r[o].text, go: s }) : null,
    /* @__PURE__ */ n("ol", { className: Le.steps, children: r.map((h, _) => /* @__PURE__ */ n("li", { "aria-current": l && _ === o ? "step" : void 0, children: h.text }, _)) })
  ] });
}
export {
  yL as ACCENT_PRESETS,
  GL as ActionStack,
  G3 as ActivityConsole,
  TL as AdminIcon,
  kp as AgentCard,
  kM as AnimatedDiagram,
  ML as AppShell,
  L3 as AppearanceStrip,
  yM as Article,
  sM as Band,
  WL as BarChart,
  zf as BoardColumn,
  c3 as BoardFootnote,
  d3 as BoardHeader,
  RL as BoardIcon,
  e3 as BoardScroller,
  b as Btn,
  gL as CHIP_ROLES,
  nl as CREDENTIAL_COLUMNS,
  HL as Callout,
  M3 as CapabilityRow,
  n3 as CardGrid,
  pM as CaseStudy,
  tM as ChatMessage,
  er as Checkbox,
  m as Chip,
  it as ClampText,
  U3 as ClarificationRow,
  g3 as ClauseRuleRow,
  p3 as ClauseRules,
  Br as ColourLadder,
  A3 as ComponentRow,
  V3 as Composer,
  h3 as ConfigRow,
  u3 as ConfigRowHead,
  On as ConnectionMark,
  K3 as ConsoleAnnounceProvider,
  eM as Conversation,
  t_ as CostMeter,
  E3 as CredentialRow,
  I3 as CredentialRowHead,
  J3 as CriteriaList,
  hc as Crumb,
  NL as DENSITIES,
  nM as DeliveryHealth,
  r3 as DeniedState,
  CL as DisabledScope,
  N3 as DryRunRail,
  sf as EmptyState,
  B3 as EnvCard,
  an as Eyebrow,
  vx as FactList,
  fM as FeaturedCard,
  E as Field,
  Sn as Figure,
  a3 as FilteredEmpty,
  _M as FlowChain,
  AL as FoldText,
  QL as FormStack,
  nn as GateChecklist,
  Y3 as GateLadder,
  w_ as Grid,
  $3 as HandoffRuleRow,
  k3 as HandoffRules,
  mM as Hero,
  SL as HomeIcon,
  FL as InfoTip,
  m3 as ItemDrawer,
  P3 as KeyPanel,
  Gl as LIVE_EVENT_TYPES,
  Kb as LegacyBoardColumn,
  w3 as LegacyBoardHeader,
  f3 as LegacyConfigRow,
  b3 as LegacyItemDrawer,
  Db as LegacyOverCapNote,
  v3 as LegacyPreviewRail,
  Ar as LegacyWorkCard,
  Nx as LinkList,
  Be as LiveIndicator,
  l3 as LoadFailed,
  s3 as Loading,
  sl as MCP_SERVER_COLUMNS,
  Dn as Mark,
  D3 as MarkUpload,
  We as Marker,
  q3 as McpServerRow,
  O3 as McpServerRowHead,
  _r as Menu,
  ur as MenuButton,
  C3 as NewStreamModal,
  hf as OverCapNote,
  In as OverflowRow,
  dt as Overlay,
  IL as OwedCard,
  y3 as PARTIAL_STEP_REASON,
  cl as POLICY_CHIP_WIDTH,
  JL as PageFrame,
  qL as PageHeader,
  Vn as PageIntro,
  zL as PeriodPicker,
  b_ as PlainList,
  H3 as PolicyRow,
  vM as PostRow,
  _3 as PreviewRail,
  wM as ProjectCard,
  gM as ProjectPage,
  Rn as Prose,
  cM as ProseHeading,
  un as ROLE_MATRIX_COLUMNS,
  Vr as RULE_ACTIONS,
  kr as Radio,
  aM as ReadyChecklist,
  XL as RecordSection,
  X3 as RequeueSheet,
  Q3 as ResolveBlock,
  rM as ResolvedFieldRow,
  F3 as RoleMatrixRow,
  lM as RoutingTable,
  S3 as RuleRow,
  z3 as RunbookSteps,
  Kl as STREAM_STEPS,
  hM as Section,
  ZL as SectionBand,
  va as SectionHeader,
  yr as SegmentedControl,
  sr as Select,
  oM as SessionRow,
  jL as Sidebar,
  LL as SidebarFoldButton,
  uM as SiteFooter,
  dM as SiteHeader,
  Wx as SplitLayout,
  R3 as StageColumn,
  t3 as StageGrid,
  Z3 as StageHistory,
  Zy as StageListEditor,
  EL as StageSteps,
  o3 as StaleStrip,
  Zt as StatStrip,
  UL as StatTiles,
  OL as StreamAvatar,
  x3 as StreamRow,
  xL as StudioIcon,
  YL as SubjectRail,
  Xe as Switch,
  PL as TabLinks,
  KL as TableHead,
  BL as Tabs,
  bl as Tag,
  bM as TextList,
  fL as ThemeProvider,
  T3 as ToolRow,
  VL as TopBar,
  yw as Tree,
  xr as TreeRow,
  iM as TypedInputBlock,
  ji as UNSAFE_HREF,
  W3 as ValidationList,
  _L as VisibilityProvider,
  wL as Visible,
  pL as WARD_VERSION,
  tn as WorkCard,
  i3 as WriteUnavailableStrip,
  AR as agoSince,
  Al as clock,
  f1 as colourStatus,
  ne as count,
  se as duration,
  Tn as elapsed,
  bL as eventSourceTransport,
  kl as formatDate,
  kt as headingTag,
  Yt as isStreamStep,
  gt as isValidatedStreamStep,
  Qp as ladderValidation,
  P0 as mcpConnectionChip,
  E0 as mcpToolName,
  le as money,
  pe as ms,
  Tr as ordered,
  za as ratio,
  NM as readTime,
  n$ as restartLabel,
  T as safeHref,
  dx as slug,
  me as stamp,
  Ln as stream,
  kL as streamChip,
  En as streamChipProps,
  ye as streamColour,
  Jl as streamHex,
  qt as streamInitials,
  Ul as streamVars,
  DL as uniqueStreamInitials,
  rr as useAnchoredPanel,
  It as useBorderFlash,
  Pe as useDisabledScope,
  Fl as useFocusTrap,
  $L as useLiveFeed,
  vL as useReturnFocus,
  Jt as useRovingTabindex,
  Mn as useTicker,
  Il as useVisible,
  P as v,
  j3 as validateMark,
  Qt as validatedStep,
  Ka as validatedStreamSteps,
  JT as wordCount
};
