import { jsx as t, Fragment as x, jsxs as i } from "react/jsx-runtime";
import { useMemo as Pa, useContext as Ne, createContext as ke, useState as b, useEffect as S, useCallback as Z, useRef as f, useLayoutEffect as on, useId as y, Fragment as ja, isValidElement as $l, Children as Da } from "react";
import { createPortal as Cl, flushSync as Ha } from "react-dom";
function ce(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const n = Math.floor(e / 6e4);
  if (n < 60) return `${n}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${n % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const Ut = (e) => String(e).padStart(2, "0");
function Rt(e) {
  const n = Math.floor(Math.max(0, e) / 1e3);
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${Ut(n % 60)}s` : `${Math.floor(a / 60)}h ${Ut(a % 60)}m`;
}
const Sl = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function me(e) {
  const n = Sl.formatToParts(new Date(e)), a = (r) => {
    var l;
    return ((l = n.find((o) => o.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${a("day")} ${a("month")} ${a("hour")}:${a("minute")}`;
}
function oe(e) {
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
function qa(e, n) {
  return `${e} / ${n}`;
}
const Rl = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function xl(e) {
  return Rl.format(new Date(e));
}
const Oa = ke(/* @__PURE__ */ new Set());
function YT({ hidden: e, children: n }) {
  const a = Pa(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Oa.Provider, { value: a, children: n });
}
function Tl(e) {
  return !Ne(Oa).has(e);
}
function XT({ id: e, children: n, fallback: a = null }) {
  return /* @__PURE__ */ t(x, { children: Tl(e) ? n : a });
}
const Ll = "(prefers-color-scheme: dark)";
function Vt() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Ll) : null;
}
function Al(e) {
  const [n, a] = b(() => {
    var r;
    return ((r = Vt()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? Vt() : null;
    if (!r) return;
    const l = () => a(r.matches);
    return l(), r.addEventListener("change", l), () => r.removeEventListener("change", l);
  }, [e]), n;
}
function at(e, n) {
  S(() => {
    const a = document.documentElement;
    return a.setAttribute(e, n), () => a.removeAttribute(e);
  }, [e, n]);
}
function Il(e, n) {
  return e !== "system" ? e : n ? "dark" : "light";
}
function QT({ theme: e, accent: n = "green", density: a = "comfortable", children: r }) {
  const l = Al(e === "system");
  return at("data-theme", Il(e, l)), at("data-accent", n), at("data-density", a), /* @__PURE__ */ t(x, { children: r });
}
const Ml = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function El(e, n) {
  return document.activeElement === n || document.activeElement === e;
}
function Bl(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function Pl(e, n, a, r) {
  return e.shiftKey ? El(n, a) ? r : void 0 : document.activeElement === r || Bl(n) ? a : void 0;
}
function jl(e, n, a) {
  const r = a[0], l = a[a.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const o = Pl(e, n, r, l);
  o && (e.preventDefault(), o.focus());
}
function Dl(e) {
  return { onKeyDown: Z(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Ml));
      jl(a, e.current, r);
    },
    [e]
  ) };
}
function ZT(e, n = !0) {
  S(() => {
    if (!n) return;
    const a = document.activeElement;
    return () => {
      var l, o;
      (o = (l = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : l.focus) == null || o.call(l);
    };
  }, [n, e]);
}
const Jt = { ArrowUp: -1, ArrowDown: 1 }, Yt = { ArrowLeft: -1, ArrowRight: 1 }, Hl = (e, n, a) => Math.min(a, Math.max(n, e));
function ql(e, n) {
  if (n !== "horizontal" && e in Jt) return Jt[e];
  if (n !== "vertical" && e in Yt) return Yt[e];
}
function Vn({ orientation: e = "both" } = {}) {
  const [n, a] = b(0), r = f(/* @__PURE__ */ new Map()), l = f(!1);
  on(() => {
    var _;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(n)) return;
    const h = u[0], w = l.current;
    l.current = !1, a(h), w && ((_ = r.current.get(h)) == null || _.focus());
  });
  const o = Z((u) => a(u), []), s = Z((u) => {
    var h;
    a(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = Z(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(n)), _ = ql(u.key, e);
      _ !== void 0 ? (u.preventDefault(), s(h[Hl(w + _, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [n, s, e]
  ), d = Z(
    (u) => ({
      tabIndex: u === n ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(u, h) : (r.current.delete(u), u === n && (l.current = !0));
      },
      onFocus: () => a(u),
      "data-ward-roving": !0
    }),
    [n]
  );
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: o };
}
const eL = (e, n, a) => {
  const r = new EventSource(e), l = (o) => a.onEvent(o.data, o.lastEventId, o.type);
  r.onmessage = l;
  for (const o of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(o, l);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, nL = "0.2.0", tL = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Ol = [1, 2, 3, 4, 5, 6], Fa = [1, 2, 3], Fl = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], aL = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], rL = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], B = {
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
function xt(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Jn(e) {
  return Ol.includes(e);
}
function gn(e) {
  return Fa.includes(e);
}
function zl(e) {
  if (!Jn(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function lL(e) {
  if (!Jn(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Wl = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Kl(e) {
  if (!Jn(e)) throw new Error("unvalidated stream step");
  return Wl[e];
}
function Xt(e) {
  return typeof e != "string" ? null : Fl.includes(e) ? e : null;
}
function Gl(e) {
  try {
    const n = JSON.parse(e);
    return typeof n == "object" && n !== null ? n : null;
  } catch {
    return null;
  }
}
function Ul(e, n) {
  return n !== "" ? n : typeof e.id == "string" ? e.id : "";
}
function Vl(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Jl(e, n, a) {
  const r = Gl(e);
  if (r === null) return null;
  const l = Xt(a) ?? Xt(r.type);
  return l === null ? null : { ...r, type: l, id: Ul(r, n), at: Vl(r) };
}
function Yl(e, n) {
  return e >= pe.staleAfter ? "stale" : e >= pe.heartbeat && n === "live" ? "reconnecting" : null;
}
function Xl(e, n, a) {
  return e >= pe.heartbeat && !n && a !== null;
}
function oL(e, n) {
  const [a, r] = b("reconnecting"), [l, o] = b(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), h = f(null), w = f(0), _ = f(0), N = f(!1), k = f("reconnecting"), A = Z((E) => {
    k.current = E, r(E);
  }, []), D = Z(() => {
    c.current = Date.now();
  }, []), we = Z((E) => {
    for (const [V, $e] of s.current)
      ($e === "*" || E.itemKey === $e) && V(E);
  }, []), ae = Z(() => {
    h.current = n(e, { lastEventId: d.current }, {
      onEvent: (E, V, $e) => {
        const Ue = Jl(E, V, $e);
        Ue !== null && (Ue.id && (d.current = Ue.id), D(), N.current = !1, A("live"), o(Ue.at), we(Ue));
      },
      onOpen: () => {
        u.current = 0, N.current = !1, D(), A("live");
      },
      onError: () => {
        var V;
        (V = h.current) == null || V.close(), h.current = null, N.current = !0, k.current !== "stale" && A("reconnecting");
        const E = Math.min(pe.reconnectBase * 2 ** u.current, pe.reconnectMax);
        u.current += 1, w.current = window.setTimeout(ae, E);
      }
    });
  }, [we, A, D, n, e]), Pe = Z((E) => {
    N.current = !0, E.close(), h.current = null, w.current = window.setTimeout(ae, pe.reconnectBase);
  }, [ae]), Ge = Z((E, V) => (s.current.set(V, E), () => {
    s.current.delete(V);
  }), []);
  return S(() => (ae(), _.current = window.setInterval(() => {
    const E = Date.now() - c.current, V = Yl(E, k.current);
    V && A(V);
    const $e = h.current;
    Xl(E, N.current, $e) && Pe($e);
  }, pe.tick), () => {
    var E;
    window.clearInterval(_.current), window.clearTimeout(w.current), N.current = !1, (E = h.current) == null || E.close(), h.current = null;
  }), [ae, Pe, A]), { connection: a, lastEventAt: l, subscribe: Ge };
}
function Tt(e, n) {
  const a = new Date(e).getTime(), [r, l] = b(() => Date.now());
  return S(() => {
    if (!n) return;
    const o = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    o();
    const s = window.setInterval(o, pe.tick);
    return document.addEventListener("visibilitychange", o), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", o);
    };
  }, [n, a]), Math.max(0, r - a);
}
const Ql = { blue: "running", orange: "waiting", green: "done" };
function Zl() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Qt(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function In(e, n) {
  const a = f(0), r = Z((l) => {
    const o = l ?? n, s = e.current;
    s !== null && o !== void 0 && (Zl() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${Ql[o]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => Qt(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => Qt(s), pe.flash)));
  }, [n, e]);
  return S(() => () => window.clearTimeout(a.current), []), n === void 0 ? (l) => r(l) : () => r(n);
}
const eo = "_root_1otpc_2", no = {
  root: eo
};
function to(e, n, a, r, l) {
  const o = [Rt(n)];
  return e || o.push(`as of ${xl(a)}`), r && o.push(`turn ${r[0]}/${r[1]}`), l && o.push(l.label), o;
}
function Ee({ startedAt: e, lastEvent: n, connection: a, turn: r }) {
  const l = a !== "stale", o = Tt(e, l), s = (n == null ? void 0 : n.at) ?? e, c = to(l, o, s, r, n);
  return /* @__PURE__ */ i("span", { className: `${no.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
      "started ",
      me(e)
    ] })
  ] });
}
const ao = "_app_1bnco_1", ro = "_side_1bnco_35", lo = "_sideTop_1bnco_46", oo = "_sideBody_1bnco_60", io = "_iconRail_1bnco_99", so = "_railItem_1bnco_108", co = "_railIcon_1bnco_129", uo = "_railDot_1bnco_134", ho = "_railLetter_1bnco_140", mo = "_main_1bnco_146", wo = "_rail_1bnco_108", _o = "_page_1bnco_168", fo = "_headerRow_1bnco_191", vo = "_sidebarToggle_1bnco_198", bo = "_headerSlot_1bnco_203", po = "_headerAction_1bnco_208", go = "_drawerSide_1bnco_213", yo = "_root_1bnco_260", No = "_topbar_1bnco_267", ko = "_mark_1bnco_278", $o = "_brand_1bnco_285", Co = "_tagline_1bnco_291", So = "_identity_1bnco_297", Ro = "_tools_1bnco_298", xo = "_nav_1bnco_308", To = "_metadata_1bnco_315", Lo = "_actor_1bnco_330", Ao = "_detail_1bnco_331", Io = "_content_1bnco_376", Mo = "_toolsPanel_1bnco_392", Eo = "_skip_1bnco_418", C = {
  app: ao,
  side: ro,
  sideTop: lo,
  sideBody: oo,
  iconRail: io,
  railItem: so,
  railIcon: co,
  railDot: uo,
  railLetter: ho,
  main: mo,
  rail: wo,
  page: _o,
  headerRow: fo,
  sidebarToggle: vo,
  headerSlot: bo,
  headerAction: po,
  drawerSide: go,
  root: yo,
  topbar: No,
  mark: ko,
  brand: $o,
  tagline: Co,
  identity: So,
  tools: Ro,
  nav: xo,
  metadata: To,
  actor: Lo,
  detail: Ao,
  content: Io,
  toolsPanel: Mo,
  skip: Eo
};
function dn(...e) {
  const n = e.filter((a) => a !== void 0 && a !== "");
  return n.length === 0 ? void 0 : n.join(" ");
}
const Bo = "_scope_1an6i_2", Po = {
  scope: Bo
}, za = ke(null);
function iL({ reason: e, actions: n = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ i("fieldset", { disabled: !0, className: `${Po.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ t("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ t(za.Provider, { value: { reason: e, reasonId: r, actions: n }, children: a })
  ] });
}
function Be() {
  return Ne(za);
}
function Yn(e, n) {
  return !n || (e ?? "").split(" ").includes(n.reasonId) ? e : dn(e, n.reasonId);
}
const jo = "_btn_hrmlj_2", Do = "_primary_hrmlj_14", Ho = "_destructive_hrmlj_25", qo = "_secondary_hrmlj_35", Oo = "_ghost_hrmlj_40", Fo = "_overflow_hrmlj_49", zo = "_sm_hrmlj_56", Wo = "_disabled_hrmlj_60", Ko = "_withReason_hrmlj_68", Go = "_reason_hrmlj_74", an = {
  btn: jo,
  primary: Do,
  destructive: Ho,
  secondary: qo,
  ghost: Oo,
  overflow: Fo,
  sm: zo,
  disabled: Wo,
  withReason: Ko,
  reason: Go
};
function Uo(e, n, a, r) {
  const l = n === "sm" ? [an.sm, "ward-btn--sm"] : [], o = a ? [an.disabled] : [];
  return [an.btn, an[e], "ward-btn", `ward-btn--${e}`, ...l, ...o, r ?? ""].filter(Boolean).join(" ");
}
function Vo(e, n) {
  return e !== "overflow" ? {} : n ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Jo(e, n) {
  if (e.disabled && !n && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Yo(e, n) {
  return n ? n.reason : e.disabled ? e.disabledReason : void 0;
}
function Xo(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Qo(e, n, a) {
  return Xo(e.describedBy, n && a);
}
function Zo({ id: e, reason: n, shown: a }) {
  return n ? /* @__PURE__ */ t("span", { id: e, className: a ? `${an.reason} ward-btn-reason` : "ward-visually-hidden", children: n }) : null;
}
function ei(e) {
  return e.children ?? e.label;
}
function v(e) {
  var n;
  return ((n = Be()) == null ? void 0 : n.actions) === "hide" ? null : /* @__PURE__ */ t(ni, { ...e });
}
function ni(e) {
  const n = Be();
  Jo(e, n);
  const a = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || n), o = Yo(e, n), s = y(), c = ti(o, n);
  return /* @__PURE__ */ i(c, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: Uo(a, r, l, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: l,
        title: o,
        "aria-describedby": Qo(e, o, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Vo(a, e.controls),
        children: ei(e)
      }
    ),
    /* @__PURE__ */ t(Zo, { id: s, reason: o, shown: c === Wa })
  ] });
}
function ti(e, n) {
  return e && !n ? Wa : ja;
}
function Wa({ children: e }) {
  return /* @__PURE__ */ t("span", { className: `${an.withReason} ward-btn-withReason`, children: e });
}
let Lt = "none";
function ai(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (Lt = "key");
}
typeof document < "u" && (document.addEventListener("keydown", ai, !0), document.addEventListener("pointerdown", () => {
  Lt = "pointer";
}, !0));
function ri() {
  return Lt === "key";
}
function bn(e) {
  const [n, a] = b(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var o;
    const r = (o = window.matchMedia) == null ? void 0 : o.call(window, e);
    if (!r) return;
    const l = (s) => a(s.matches);
    return r.addEventListener("change", l), a(r.matches), () => r.removeEventListener("change", l);
  }, [e]), n;
}
const li = "_scrim_1cawq_2", oi = "_drawer_1cawq_10", ii = "_sheet_1cawq_14", si = "_modal_1cawq_18", ci = "_panel_1cawq_23", di = "_start_1cawq_44", ui = "_header_1cawq_67", hi = "_title_1cawq_75", mi = "_body_1cawq_79", wi = "_close_1cawq_106", Le = {
  scrim: li,
  drawer: oi,
  sheet: ii,
  modal: si,
  panel: ci,
  start: di,
  header: ui,
  title: hi,
  body: mi,
  close: wi
}, _i = ke(null), jn = [], Dn = /* @__PURE__ */ new Map();
function fi(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function vi(e, n) {
  let a = Dn.get(n);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: n.hasAttribute("inert") }, Dn.set(n, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(n), n.setAttribute("inert", ""));
}
function bi(e, n, a) {
  for (const r of Array.from(n.children))
    r !== a && !fi(r) && vi(e, r);
}
function pi(e, n) {
  let a = null, r = n;
  for (; r; ) {
    if (bi(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function gi(e) {
  for (const n of e.claims) {
    const a = Dn.get(n);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || n.removeAttribute("inert"), Dn.delete(n)));
  }
}
function yi(e, n) {
  const a = { root: e, claims: [] };
  return jn.push(a), pi(a, n), a;
}
function Ni(e) {
  const n = jn.indexOf(e);
  n >= 0 && jn.splice(n, 1), gi(e);
}
function Zt(e) {
  return e !== null && jn.at(-1) === e;
}
function ki(e, n, a) {
  const r = f(null), l = f(a);
  return l.current = a, S(() => {
    const o = e.current;
    if (!o) return;
    const s = document.activeElement, c = yi(o, n);
    return r.current = c, () => {
      var u, h;
      const d = Zt(c);
      Ni(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [n]), Z(() => Zt(r.current), []);
}
function $i(e, n) {
  return e === "modal" && !n ? "sheet" : e;
}
function Ci(e, n) {
  return e.title !== void 0 ? { labelledBy: n, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Si({ props: e, titleId: n }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Le.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t("header", { className: `${Le.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Le.title} ward-drawer-title ward-truncate`, id: n, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Le.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Ri(e) {
  return `${Le.scrim} ${Le[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function xi(e, n) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = n ? " ward-overlay-panel--wide" : "";
  return `${Le.panel} ${Le[e]} ward-overlay-panel${a}${r}`;
}
function Ti(e) {
  const n = Ne(_i);
  return e ?? n ?? document.body;
}
function un(e) {
  const n = f(null), a = f(null), r = y(), l = Ti(e.container), o = bn("(min-width: 768px)"), s = $i(e.kind, o), c = Ci(e, r), d = Dl(a), [u] = b(ri), h = ki(n, l, e.returnFocusTo), w = Z(() => {
    h() && e.onClose();
  }, [e.onClose, h]);
  return S(() => {
    var _;
    h() && ((_ = a.current) == null || _.focus());
  }, [h]), S(() => {
    const _ = (N) => {
      N.key === "Escape" && w();
    };
    return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, [w]), Cl(
    /* @__PURE__ */ t(
      "div",
      {
        ref: n,
        className: Ri(s),
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
            className: xi(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => h() && d.onKeyDown(_),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Le.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(Si, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Li = /^([a-z][a-z0-9+.-]*):/i, Ai = /* @__PURE__ */ new Set(["http", "https", "mailto"]), Ii = "#";
function Mi(e) {
  var r, l;
  const n = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < n.length && n.charCodeAt(a) <= 32; ) a += 1;
  return (l = (r = Li.exec(n.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function T(e) {
  const n = Mi(e);
  return n === void 0 || Ai.has(n) ? e : Ii;
}
function Ei(e) {
  const n = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: n > 1 };
}
function Ka(e) {
  const n = Ei(e);
  return e.toggleAttribute("data-fade-start", n.start), e.toggleAttribute("data-fade-end", n.end), n;
}
function Bi(e, n) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => Ka(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const o of [a, ...a.children]) l == null || l.observe(o);
    return r(), () => {
      a.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, n]);
}
function Pi(e, n) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = n.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + n.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : l > e.clientWidth - a ? e.scrollLeft + l - e.clientWidth + a : null;
}
function ji(e, n, a) {
  on(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(a)[n];
    if (!r || !l) return;
    const o = Pi(r, l);
    o !== null && (r.scrollLeft = Math.max(0, o)), Ka(r);
  }, [e, n, a]);
}
const Di = "_row_11g8i_2", Hi = {
  row: Di
};
function qi(e, n) {
  return e ? { role: n === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function At({ label: e, children: n, count: a, as: r = "div", focusable: l = !0, rowRef: o, className: s, ...c }) {
  const d = f(null), u = o ?? d;
  return Bi(u, a), /* @__PURE__ */ t(r, { ref: u, className: [Hi.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...qi(l, r), ...c, children: n });
}
const Oi = "_icon_1ylqy_2", Fi = {
  icon: Oi
};
function yn({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: Fi.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function sL() {
  return /* @__PURE__ */ t(yn, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function cL() {
  return /* @__PURE__ */ i(yn, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function dL() {
  return /* @__PURE__ */ i(yn, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function uL() {
  return /* @__PURE__ */ t(yn, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function zi() {
  return /* @__PURE__ */ i(yn, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const Ga = "ward:sidebar-collapsed", Wi = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Ki() {
  try {
    return window.localStorage.getItem(Ga) === "true";
  } catch {
    return !1;
  }
}
function Gi(e) {
  try {
    window.localStorage.setItem(Ga, String(e));
  } catch {
  }
}
function Ui(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Vi(e) {
  return e instanceof Element && e.closest(Wi) !== null;
}
function Ji(e) {
  return e.key === "[" && !Ui(e) && !Vi(e.target);
}
function Yi(e) {
  const [n, a] = b(Ki), r = () => {
    Gi(!n), a(!n);
  };
  return S(() => {
    if (!e) return;
    const l = (o) => {
      var c;
      if (!Ji(o)) return;
      const s = o.target instanceof Element ? o.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, n]), { collapsed: n, toggle: r };
}
function Xi() {
  const e = bn("(max-width: 767.98px)"), n = bn("(max-width: 1023.98px)");
  return e ? "phone" : n ? "medium" : "wide";
}
function Qi(e) {
  const n = e === "phone", a = y(), r = f(null), [l, o] = b(!1);
  return l && !n && o(!1), { narrow: n, open: l, drawerId: a, slotRef: r, toggle: () => o(!l), close: () => o(!1) };
}
function Zi({ header: e, action: n, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ i("div", { className: C.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ t(v, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ t("div", { className: C.headerSlot, children: e }),
    Ya(n) && /* @__PURE__ */ t("span", { className: C.headerAction, children: n })
  ] }) : e;
}
function es(e, n) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", n), window.addEventListener("popstate", n), () => {
        window.removeEventListener("hashchange", n), window.removeEventListener("popstate", n);
      };
  }, [e, n]);
}
function ns({ sidebar: e, label: n, drawer: a }) {
  var l;
  if (es(a.open, a.close), !a.open) return null;
  const r = (o) => {
    o.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ t(un, { kind: "start", id: a.drawerId, title: n, flush: !0, onClose: a.close, returnFocusTo: (l = a.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ t("div", { className: C.drawerSide, onClick: r, children: Ua(e, !1) }) });
}
function ts(e) {
  const [n, a] = b(!1);
  return n && e !== "medium" && a(!1), { open: n, toggle: () => a(!n) };
}
function as(e, n) {
  const a = Yi(e === "wide" && !n), r = ts(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function rs(e, n) {
  const a = as(n, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return os(e.collapsed, n);
  const r = a.collapsed, l = r && e.iconRail !== void 0;
  return { enabled: n !== "phone", collapsed: r, rail: l, drawsStrip: !l && typeof e.sidebar == "function", toggle: a.toggle };
}
const ls = (e) => e.collapsed && e.drawsStrip;
function os(e, n) {
  return { enabled: !1, collapsed: n === "medium" || e && n === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const ea = (e) => e ? "" : void 0;
function Ua(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function Va({ fold: e }) {
  return /* @__PURE__ */ i(v, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(zi, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function is({ fold: e, inSidebar: n }) {
  return !e.enabled || n ? null : /* @__PURE__ */ t("div", { className: C.sideTop, children: /* @__PURE__ */ t(Va, { fold: e }) });
}
const Ja = ke(null);
function hL() {
  const e = Ne(Ja);
  return e === null || !e.enabled ? null : /* @__PURE__ */ t(Va, { fold: e });
}
function ss({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": xt(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function cs({ items: e, label: n }) {
  return /* @__PURE__ */ t("nav", { className: C.iconRail, "aria-label": n, children: e.map((a) => /* @__PURE__ */ i("a", { className: C.railItem, href: T(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(ss, { item: a }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function ds({ sidebar: e, label: n, iconRail: a, fold: r, inSidebar: l }) {
  const o = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ i("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(is, { fold: r, inSidebar: l && !o }),
    /* @__PURE__ */ t("div", { className: C.sideBody, hidden: o, children: Ua(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ t(cs, { items: a ?? [], label: n })
  ] });
}
const Ya = (e) => e != null;
function us(e) {
  const { sidebar: n, header: a, action: r, children: l, rail: o, iconRail: s, pageFill: c } = e, d = Ya(o), u = Xi(), h = Qi(u), w = rs(e, u), _ = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ i("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": ea(ls(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ t(Ja.Provider, { value: w, children: /* @__PURE__ */ t(ds, { sidebar: n, label: _, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ i("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ t(Zi, { header: a, action: r, label: _, drawer: h }),
      /* @__PURE__ */ t("div", { className: C.page, "data-fill": ea(c === !0), children: l })
    ] }),
    d && /* @__PURE__ */ t("div", { className: C.rail, children: o }),
    /* @__PURE__ */ t(ns, { sidebar: n, label: _, drawer: h })
  ] });
}
function hs({ destinations: e, active: n }) {
  const a = f(null);
  return ji(a, e.findIndex((r) => r.id === n), "a"), /* @__PURE__ */ t(At, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ t("a", { href: T(r.href), "aria-current": r.id === n ? "page" : void 0, children: r.label }, r.id)) });
}
function ft({ value: e, className: n }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: n, children: e });
}
function ms({ actor: e, metadata: n }) {
  return e === void 0 && n === void 0 ? null : /* @__PURE__ */ i("span", { className: C.metadata, children: [
    /* @__PURE__ */ t(ft, { value: e, className: C.actor }),
    e !== void 0 && n !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(ft, { value: n, className: C.detail })
  ] });
}
function ws() {
  const e = bn("(max-width: 767.98px)"), n = y(), a = f(null), [r, l] = b(!1);
  return { narrow: e, open: r, panelId: n, slotRef: a, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function _s({ tools: e, toolsLabel: n, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ t("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ t(v, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: n ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: C.tools, children: e });
}
function fs({ tools: e, menu: n }) {
  if (e === void 0 || !n.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && n.close();
  };
  return /* @__PURE__ */ t("div", { id: n.panelId, className: C.toolsPanel, hidden: !n.open, onKeyDown: a, children: e });
}
function vs(e) {
  return /* @__PURE__ */ i("header", { className: C.topbar, children: [
    /* @__PURE__ */ t("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(ft, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ t(hs, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: C.identity, children: /* @__PURE__ */ t(ms, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(_s, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function bs(e) {
  const n = y(), a = ws();
  return /* @__PURE__ */ i("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: C.skip, href: `#${n}`, children: "Skip to content" }),
    /* @__PURE__ */ t(vs, { ...e, menu: a }),
    /* @__PURE__ */ t(fs, { tools: e.tools, menu: a }),
    /* @__PURE__ */ t("div", { id: n, className: C.content, children: e.children })
  ] });
}
function ps(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function mL(e) {
  return ps(e) ? /* @__PURE__ */ t(us, { ...e }) : /* @__PURE__ */ t(bs, { ...e });
}
const gs = "_root_itg9o_2", ys = "_row_itg9o_8", Ns = "_box_itg9o_14", ks = "_label_itg9o_21", $s = "_labelHidden_itg9o_26", Cs = "_consequence_itg9o_44", Ss = "_sample_itg9o_79", Je = {
  root: gs,
  row: ys,
  box: Ns,
  label: ks,
  labelHidden: $s,
  consequence: Cs,
  sample: Ss
};
function Rs(e, n) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || n) };
}
function xs({ id: e, text: n }) {
  return n ? /* @__PURE__ */ t("p", { id: e, className: `${Je.consequence} ward-check-consequence`, children: n }) : null;
}
function Ts(e, n, a) {
  return n && !a && e.disabledReason ? e.disabledReason : void 0;
}
function Ls(e, n, a, r) {
  const l = e.consequence ? `${n}-note` : void 0, o = Ts(e, a, r), s = o ? `${n}-reason` : void 0, c = Yn(dn(l, e.describedBy, s), r);
  return { noteId: l, reason: o, reasonId: `${n}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? o } };
}
function As({ id: e, reason: n }) {
  return n ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: n }) : null;
}
function Is({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Je.sample, "aria-hidden": "true", children: e }) : null;
}
function Xa(e) {
  const n = y(), a = Be(), r = Rs(e, a), l = Ls(e, n, r.disabled, a);
  return /* @__PURE__ */ i("div", { className: `${Je.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ i("span", { className: Je.row, children: [
      /* @__PURE__ */ t(
        "input",
        {
          id: n,
          type: "checkbox",
          className: `${Je.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (o) => {
            var s;
            return !r.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, o.target.checked));
          },
          ...l.input
        }
      ),
      /* @__PURE__ */ t("label", { htmlFor: n, className: e.labelHidden ? Je.labelHidden : Je.label, children: e.label }),
      /* @__PURE__ */ t(Is, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(As, { id: l.reasonId, reason: l.reason }),
    /* @__PURE__ */ t(xs, { id: l.noteId, text: e.consequence })
  ] });
}
const Ms = "_chip_pq6tb_2", Es = {
  chip: Ms
}, Bs = {
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
function Ps(e, n) {
  if (e === "stream") return js(n);
  if (n) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = Bs[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function js(e) {
  if (!e || !gn(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const n = xt(e);
  return { "--ward-chip-bg": n.chip, "--ward-chip-fg": n.chipText, "--ward-chip-line": n.chip };
}
function m({ role: e, label: n, streamStep: a, size: r }) {
  if (!n) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${Es.chip} ward-chip ward-chip--${e}`, style: Ps(e, a), "data-ward-chip": e, "data-size": r, children: n });
}
const Ds = "_clamp_zn74g_3", na = {
  clamp: Ds
};
function sn({ text: e, as: n = "span", className: a }) {
  return /* @__PURE__ */ t(n, { className: a === void 0 ? na.clamp : `${na.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const Hs = "_root_1btz3_2", qs = "_body_1btz3_10", Os = "_toggle_1btz3_24", rt = {
  root: Hs,
  body: qs,
  toggle: Os
};
function wL({ children: e, lines: n = 3, label: a }) {
  const [r, l] = b(!1), o = y();
  return /* @__PURE__ */ i("div", { className: rt.root, children: [
    /* @__PURE__ */ t("div", { id: o, className: rt.body, "data-lines": n, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ t("button", { type: "button", className: rt.toggle, "aria-expanded": r, "aria-controls": o, onClick: () => l(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const Fs = "_root_1a4s8_2", zs = "_words_1a4s8_16", Ws = "_title_1a4s8_23", Ks = "_actions_1a4s8_27", $n = {
  root: Fs,
  words: zs,
  title: Ws,
  actions: Ks
};
function _L({ title: e, sentence: n, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ i("section", { className: $n.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ i("div", { className: $n.words, children: [
      /* @__PURE__ */ t("strong", { className: $n.title, children: e }),
      /* @__PURE__ */ t("span", { children: n })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: $n.actions, children: a })
  ] });
}
const Gs = "_root_8zmpu_2", Us = "_step_8zmpu_12", Vs = "_dot_8zmpu_38", Js = "_label_8zmpu_51", wn = {
  root: Gs,
  step: Us,
  dot: Vs,
  label: Js
}, Ys = { done: ", done", now: ", current", next: "" };
function Xs({ step: e, running: n }) {
  const a = e.state === "now" && n;
  return /* @__PURE__ */ i("li", { className: wn.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: a ? `${wn.dot} ward-running` : wn.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: wn.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: Ys[e.state] })
  ] });
}
function fL({ steps: e, running: n = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ t("ol", { className: wn.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ t(Xs, { step: r, running: n }, r.label)) });
}
function Xn(e) {
  return typeof e == "number" && gn(e) ? e : null;
}
function ye(e, n) {
  const a = Xn(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${n})`;
}
function It(e, n) {
  const a = Xn(n);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const Qs = "_root_13eei_3", Zs = "_nav_13eei_8", ec = "_list_13eei_16", nc = "_item_13eei_24", tc = "_link_13eei_44", ac = "_sep_13eei_54", rc = "_current_13eei_58", lc = "_chips_13eei_62", De = {
  root: Qs,
  nav: Zs,
  list: ec,
  item: nc,
  link: tc,
  sep: ac,
  current: rc,
  chips: lc
};
function oc({ step: e, isCurrent: n }) {
  return n ? /* @__PURE__ */ t("span", { className: De.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ t("a", { className: `${De.link} ward-target`, href: T(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ t("span", { title: e.label, children: e.label });
}
function ic({ path: e, chips: n, current: a = !0 }) {
  return /* @__PURE__ */ t("div", { className: De.root, children: /* @__PURE__ */ i("nav", { "aria-label": "Breadcrumb", className: De.nav, children: [
    /* @__PURE__ */ t("ol", { className: De.list, children: e.map((r, l) => /* @__PURE__ */ i("li", { className: De.item, children: [
      l > 0 ? /* @__PURE__ */ t("span", { className: De.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ t(oc, { step: r, isCurrent: a && l === e.length - 1 })
    ] }, r.label)) }),
    n != null && n.length ? /* @__PURE__ */ t("span", { className: `${De.chips} ward-chiprow`, children: n.map((r) => /* @__PURE__ */ t(m, { ...r }, r.label)) }) : null
  ] }) });
}
function Qa(e, n, a) {
  const r = f(a);
  r.current = a, S(() => {
    if (!e) return;
    const l = (o) => {
      var s;
      (s = n.current) != null && s.contains(o.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, n]);
}
const sc = 500;
function Za(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function er() {
  const e = f(""), n = f(void 0);
  return S(() => () => clearTimeout(n.current), []), (a) => (clearTimeout(n.current), e.current += a.toLowerCase(), n.current = setTimeout(() => {
    e.current = "";
  }, sc), e.current);
}
const Cn = 4;
function cc(e, n, a) {
  const r = Math.max(0, a - e.bottom - Cn * 2), l = Math.max(0, e.top - Cn * 2);
  return n <= r || r >= l ? { top: e.bottom + Cn, maxHeight: r } : { top: e.top - Cn - Math.min(n, l), maxHeight: l };
}
function dc(e, n, a, r) {
  const l = { start: e.left, end: e.right - n }, o = { start: l.start + n <= a, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = o[r] || !o[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, a - n));
}
function uc(e, n, a, r) {
  return { ...cc(e, n.height, a.height), left: dc(e, n.width, a.width, r) };
}
function Mn(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function hc(e, n) {
  const a = e.getBoundingClientRect(), r = n ? n.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function mc(e, n, a) {
  const r = hc(n, a);
  e.style.setProperty("--ward-anchor-width", Mn(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const l = e.getBoundingClientRect(), o = document.documentElement;
  return { edges: r, box: l, view: { width: o.clientWidth, height: o.clientHeight } };
}
function wc(e) {
  const n = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = n.map((r) => r.scrollTop);
  return () => n.forEach((r, l) => r.scrollTop = a[l]);
}
function ta(e, n, a, r) {
  const l = wc(e), o = mc(e, n, r), s = uc(o.edges, o.box, o.view, a);
  Object.assign(e.style, { left: Mn(s.left - o.box.left), top: Mn(s.top - o.box.top), maxHeight: Mn(s.maxHeight) }), l();
}
function _c(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function nr(e, n, a = "start", r) {
  on(() => {
    const l = n.current, o = e.current;
    if (!l || !o) return;
    const s = _c(l), c = () => ta(l, o, a, r == null ? void 0 : r.current), d = (u) => {
      l.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, n, a, r]), on(() => {
    n.current && e.current && ta(n.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const fc = "_root_1lgbn_2", vc = "_trigger_1lgbn_7", bc = "_value_1lgbn_47", pc = "_menu_1lgbn_65", gc = "_find_1lgbn_87", yc = "_list_1lgbn_103", Nc = "_option_1lgbn_114", kc = "_check_1lgbn_133", $c = "_empty_1lgbn_144", ge = {
  root: fc,
  trigger: vc,
  value: bc,
  menu: pc,
  find: gc,
  list: yc,
  option: Nc,
  check: kc,
  empty: $c
}, Cc = 7;
function Sc(e, n) {
  const a = n.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function aa(e, n) {
  return Math.max(0, e.findIndex((a) => a.value === n));
}
function Rc(e, n) {
  const [a, r] = b(e.defaultOpen === !0), [l, o] = b(""), [s, c] = b(() => aa(e.options, e.value)), d = (u) => {
    var h;
    Ha(() => r(!1)), u && ((h = n.current) == null || h.focus());
  };
  return {
    open: a,
    query: l,
    active: s,
    entries: Sc(e.options, l),
    findable: e.options.length > Cc,
    show: () => {
      e.disabled || (o(""), c(aa(e.options, e.value)), r(!0));
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
function xc(e, n) {
  const a = f(!1);
  return S(() => {
    var r;
    e && a.current && ((r = n.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function Tc(e) {
  const n = er();
  return (a) => {
    const r = n(a), l = e.entries.findIndex((o) => o.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function tr(e) {
  const n = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, n)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Lc(e) {
  return { ...tr(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function ar(e, n, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = n[r.key];
    if (!l) return a(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const Ac = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Ic(e, n) {
  const a = () => {
    n(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      Ac.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function Mc({ entry: e, at: n, menu: a, ids: r, value: l }) {
  return /* @__PURE__ */ i(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
      "data-active": n === a.active || void 0,
      className: ge.option,
      onMouseDown: (o) => o.preventDefault(),
      onMouseMove: () => a.to(n),
      onClick: () => a.pick(e),
      children: [
        /* @__PURE__ */ t("span", { className: ge.check, "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: ge.label, children: e.option.label })
      ]
    }
  );
}
function Mt(e, n) {
  const a = e.entries[e.active];
  return a ? n.option(a.index) : void 0;
}
function Ec({ menu: e, ids: n, focusRef: a }) {
  return /* @__PURE__ */ t(
    "input",
    {
      ref: a,
      className: ge.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": n.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": Mt(e, n),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: ar(e, tr(e), () => {
      })
    }
  );
}
function Bc({ props: e, menu: n, ids: a, focusRef: r, trigger: l }) {
  const o = Tc(n), s = f(null);
  nr(l, s);
  const c = (d) => {
    Za(d) && o(d.key);
  };
  return /* @__PURE__ */ i("div", { ref: s, className: ge.menu, children: [
    n.findable && /* @__PURE__ */ t(Ec, { menu: n, ids: a, focusRef: r }),
    /* @__PURE__ */ t(
      "ul",
      {
        ref: n.findable ? void 0 : r,
        id: a.list,
        role: "listbox",
        tabIndex: -1,
        className: ge.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": n.findable ? void 0 : Mt(n, a),
        onKeyDown: ar(n, Lc(n), c),
        children: n.entries.map((d, u) => /* @__PURE__ */ t(Mc, { entry: d, at: u, menu: n, ids: a, value: e.value }, d.index))
      }
    ),
    n.entries.length === 0 && /* @__PURE__ */ t("p", { className: ge.empty, children: "No match" })
  ] });
}
function Pc(e, n) {
  const a = e.open ? Mt(e, n) : void 0;
  S(() => {
    var r, l;
    a && ((l = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [a]);
}
function rr(...e) {
  return e.filter(Boolean).join(" ");
}
function jc(e) {
  var n;
  return ((n = e.options.find((a) => a.value === e.value)) == null ? void 0 : n.label) ?? e.placeholder;
}
function Dc({ props: e, menu: n, ids: a, trigger: r, wantFocus: l }) {
  var c;
  const o = !e.options.some((d) => d.value === e.value), s = (c = Be()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ t(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: rr(ge.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": n.open,
      "aria-controls": n.open ? a.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": dn(e["aria-describedby"], a.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...Ic(n, l),
      children: /* @__PURE__ */ t("span", { id: a.value, className: ge.value, "data-placeholder": o || void 0, children: jc(e) })
    }
  );
}
function lr(e) {
  const n = Be(), a = n ? { ...e, disabled: !0, "aria-describedby": Yn(e["aria-describedby"], n) } : e, r = y(), l = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, o = f(null), s = f(null), c = f(null), d = Rc(a, s), u = xc(d.open, c);
  return Qa(d.open, o, () => d.close(!1)), Pc(d, l), /* @__PURE__ */ i("div", { ref: o, className: rr(ge.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(Dc, { props: a, menu: d, ids: l, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ t("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ t(Bc, { props: a, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const Hc = "_field_1ensj_2", qc = "_label_1ensj_8", Oc = "_labelHidden_1ensj_15", Fc = "_control_1ensj_25", zc = "_mono_1ensj_45", Wc = "_area_1ensj_50", Kc = "_invalid_1ensj_57", ze = {
  field: Hc,
  label: qc,
  labelHidden: Oc,
  control: Fc,
  mono: zc,
  area: Wc,
  invalid: Kc
}, Gc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, or = (e) => `${e}-label`;
function Uc({ props: e, controlProps: n, cls: a }) {
  const r = e.secret ? Gc : {};
  return /* @__PURE__ */ t("input", { className: a, ...r, ...n });
}
function Vc({ props: e, controlProps: n, cls: a }) {
  return /* @__PURE__ */ t(
    lr,
    {
      id: n.id,
      triggerClassName: a,
      "aria-labelledby": or(n.id),
      "aria-invalid": n["aria-invalid"],
      "aria-describedby": n["aria-describedby"],
      value: e.value,
      options: e.options ?? [],
      disabled: n.disabled,
      placeholder: e.placeholder,
      onChange: e.onChange,
      size: e.variant === "toolbar" ? "md" : void 0
    }
  );
}
function Jc({ props: e, controlProps: n, cls: a }) {
  return /* @__PURE__ */ t("textarea", { className: a, rows: e.rows ?? 3, ...n });
}
const Yc = { input: Uc, select: Vc, textarea: Jc };
function Xc(e, n, a) {
  const r = Yc[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: n, cls: a });
}
function Qc(e, n, a, r) {
  const l = e.invalid ? "true" : void 0;
  return {
    id: n,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": l,
    "aria-describedby": Yn(dn(l ? a : void 0, e.describedBy), r),
    onChange: (o) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, o.target.value);
    }
  };
}
function Zc(e) {
  const n = e.mono ? [ze.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [ze.area] : [];
  return [ze.control, "ward-field-input", ...n, ...a].filter(Boolean).join(" ");
}
function ed(e) {
  return e ? `${ze.label} ${ze.labelHidden} ward-field-label` : `${ze.label} ward-field-label`;
}
function j(e) {
  const n = y(), a = `${n}-msg`, r = Qc(e, n, a, Be()), l = Zc(e);
  return /* @__PURE__ */ i("div", { className: `${ze.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: or(n), className: ed(e.labelHidden), htmlFor: n, children: e.label }),
    Xc(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: a, className: `${ze.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const nd = "_root_sjvm0_2", td = "_trigger_sjvm0_9", ad = "_ghost_sjvm0_27", rd = "_panel_sjvm0_46", ld = "_edged_sjvm0_67", od = "_menu_sjvm0_73", id = "_group_sjvm0_78", sd = "_heading_sjvm0_83", cd = "_item_sjvm0_89", dd = "_description_sjvm0_105", ud = "_large_sjvm0_109", hd = "_touch_sjvm0_113", md = "_icon_sjvm0_117", wd = "_label_sjvm0_125", _d = "_text_sjvm0_130", fd = "_trailing_sjvm0_138", vd = "_check_sjvm0_144", bd = "_separator_sjvm0_183", pd = "_footer_sjvm0_189", gd = "_find_sjvm0_196", yd = "_findGlyph_sjvm0_208", Nd = "_findInput_sjvm0_214", kd = "_empty_sjvm0_230", L = {
  root: nd,
  trigger: td,
  ghost: ad,
  panel: rd,
  edged: ld,
  menu: od,
  group: id,
  heading: sd,
  item: cd,
  description: dd,
  large: ud,
  touch: hd,
  icon: md,
  label: wd,
  text: _d,
  trailing: fd,
  check: vd,
  separator: bd,
  footer: pd,
  find: gd,
  findGlyph: yd,
  findInput: Nd,
  empty: kd
}, ir = ke(null);
function $d(e, n) {
  const [a, r] = b({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (l) => r((o) => ({ open: !0, start: l, request: o.request + 1 })),
    close: (l) => {
      var o;
      Ha(() => r((s) => ({ ...s, open: !1 }))), l && ((o = n.current) == null || o.focus());
    }
  };
}
const Cd = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Sd(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (n) => {
      const a = Cd.get(n.key);
      a && (n.preventDefault(), e.show(a));
    },
    onKeyUp: (n) => {
      n.key === " " && n.preventDefault();
    }
  };
}
function Et(...e) {
  return e.filter(Boolean).join(" ");
}
function Rd(e, n = {}, a = "field") {
  const { ref: r, className: l, ...o } = n;
  return { ...o, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: Et(L.trigger, a === "ghost" ? L.ghost : void 0, l) };
}
function sr(e) {
  const n = y(), a = { menuId: `${n}-menu`, buttonId: `${n}-button` }, r = f(null), l = f(null), o = $d(e.defaultOpen === !0, l);
  return Qa(o.open, r, () => o.close(!1)), /* @__PURE__ */ i("div", { ref: r, className: Et(L.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ...Rd(l, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": o.open,
        "aria-controls": o.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Sd(o),
        children: e.label
      }
    ),
    o.open && /* @__PURE__ */ t(ir.Provider, { value: { ...a, popup: o, button: l }, children: e.children })
  ] });
}
function xd(e) {
  let n = 0;
  const a = (r) => ({ item: r, at: n++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function Td(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const Ld = (e) => e.flatMap((n) => n === "separator" ? [] : "items" in n ? n.items : [n]).length;
function Ad(e, n) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(n);
  return r.length ? { ...e, items: r } : null;
}
function Id(e, n) {
  return e === "separator" ? e : "items" in e ? Ad(e, n) : n(e) ? e : null;
}
function Md(e) {
  const n = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; n[0] === "separator"; ) n.shift();
  for (; n[n.length - 1] === "separator"; ) n.pop();
  return n;
}
function Ed(e, n) {
  const a = n.trim().toLowerCase();
  if (!a) return e;
  const r = (l) => l.label.toLowerCase().includes(a);
  return Md(e.map((l) => Id(l, r)).filter((l) => l !== null));
}
const cr = (e, n) => (e % n + n) % n;
function qe(e, n, a) {
  for (let r = 1; r <= e.length; r++) {
    const l = cr(n + a * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const Bd = (e) => e.split("").every((n) => n === e[0]);
function Pd(e, n, a) {
  const r = Bd(a), l = r ? a[0] : a, o = r ? n : n - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = cr(o + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function jd(e) {
  const n = f([]);
  return n.current.length = e.length, {
    items: e,
    refs: n,
    current: () => n.current.indexOf(document.activeElement),
    focus: (a) => {
      var r;
      return (r = n.current[a]) == null ? void 0 : r.focus();
    }
  };
}
function Dd(e, n) {
  const { items: a } = e, r = () => {
    var l;
    return (l = e.refs.current[e.current()]) == null ? void 0 : l.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(qe(a, e.current(), 1))],
    ["ArrowUp", () => e.focus(qe(a, e.current(), -1))],
    ["Home", () => e.focus(qe(a, -1, 1))],
    ["End", () => e.focus(qe(a, a.length, -1))],
    ["Escape", () => n.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function Hd(e, n, a) {
  const r = er(), l = Dd(e, n), o = (s) => {
    if (Za(s)) {
      if (!a) return e.focus(Pd(e.items, e.current(), r(s.key)));
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
function qd(e) {
  const n = f(!1);
  return {
    onKeyDown: (a) => {
      a.key === "Tab" && (n.current = !0);
    },
    onBlur: () => {
      n.current && e.close(!1);
    }
  };
}
function Od(e) {
  const n = e.findIndex((a) => a.current && !a.disabled);
  return n === -1 ? qe(e, -1, 1) : n;
}
function Fd(e, n) {
  const { start: a, request: r } = n, l = f(e);
  l.current = e, S(() => {
    const { items: o, focus: s } = l.current;
    a && s(a === "first" ? Od(o) : qe(o, o.length, -1));
  }, [a, r]);
}
function zd({ row: e, nav: n, popup: a }) {
  const { item: r, at: l } = e;
  return {
    onMouseDown: (o) => o.preventDefault(),
    onMouseMove: () => {
      !r.disabled && n.current() !== l && n.focus(l);
    },
    onClick: (o) => {
      var s;
      if (r.disabled) return o.preventDefault();
      (s = r.onSelect) == null || s.call(r), a.close(!0);
    }
  };
}
const Wd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function Kd(e, n) {
  return Wd(e) ? { "aria-labelledby": n + "-label", "aria-describedby": e.description ? n + "-description" : void 0 } : {};
}
function Gd(e, n) {
  const a = /* @__PURE__ */ t("span", { id: n + "-label", className: L.label, children: e.label });
  return e.description ? /* @__PURE__ */ i("span", { className: L.text, children: [
    a,
    /* @__PURE__ */ t("span", { id: n + "-description", className: L.description, children: e.description })
  ] }) : a;
}
function Ud() {
  return /* @__PURE__ */ t("svg", { className: L.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function ra(e, n) {
  return /* @__PURE__ */ i(x, { children: [
    e.icon ? /* @__PURE__ */ t("span", { className: L.icon, "aria-hidden": "true", children: e.icon }) : null,
    Gd(e, n),
    e.trailing ? /* @__PURE__ */ t("span", { className: L.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ t(Ud, {}) : null
  ] });
}
function dr(e) {
  const { item: n, at: a } = e.row, r = y(), l = {
    ref: (o) => {
      e.nav.refs.current[a] = o;
    },
    role: "menuitem",
    tabIndex: -1,
    className: L.item,
    "aria-current": n.current ? "true" : void 0,
    "aria-disabled": n.disabled ? "true" : void 0,
    ...Kd(n, r),
    ...zd(e)
  };
  return n.href && !n.disabled ? /* @__PURE__ */ t("a", { href: T(n.href), ...l, children: ra(n, r) }) : /* @__PURE__ */ t("button", { type: "button", ...l, children: ra(n, r) });
}
function Vd({ heading: e, rows: n, nav: a, popup: r }) {
  const l = y();
  return /* @__PURE__ */ i("div", { role: "group", "aria-labelledby": l, className: L.group, children: [
    /* @__PURE__ */ t("div", { id: l, className: L.heading, children: e }),
    n.map((o) => /* @__PURE__ */ t(dr, { row: o, nav: a, popup: r }, o.at))
  ] });
}
function Jd({ block: e, nav: n, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: L.separator }) : e.kind === "group" ? /* @__PURE__ */ t(Vd, { heading: e.heading, rows: e.rows, nav: n, popup: a }) : /* @__PURE__ */ t(dr, { row: e.row, nav: n, popup: a });
}
function Yd() {
  const e = Ne(ir);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Xd() {
  return /* @__PURE__ */ i("svg", { className: L.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ t("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ t("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function Qd(e, n) {
  const a = () => qe(e.items, -1, 1);
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(a())],
    ["ArrowUp", () => e.focus(qe(e.items, e.items.length, -1))],
    ["Enter", () => {
      var r;
      return (r = e.refs.current[a()]) == null ? void 0 : r.click();
    }],
    ["Escape", () => n.close(!0)]
  ]);
}
function Zd({ find: e, query: n, setQuery: a, input: r, nav: l, popup: o, menuId: s }) {
  const c = Qd(l, o), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ i("div", { className: L.find, children: [
    /* @__PURE__ */ t(Xd, {}),
    /* @__PURE__ */ t("input", { ref: r, type: "search", className: L.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: n, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function eu(e, n) {
  const [a, r] = b(""), l = f(null), o = n !== void 0 && Ld(e) >= (n.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = l.current) == null || d.focus();
  };
  return o ? { find: n, query: a, setQuery: r, input: l, toFind: s, entries: Ed(e, a) } : { query: a, setQuery: r, input: l, entries: e };
}
const nu = { regular: void 0, large: L.large, touch: L.touch }, tu = (e, n) => Et(L.panel, e ? L.edged : void 0, nu[n]);
function au({ find: e, count: n }) {
  return !e || n > 0 ? null : /* @__PURE__ */ t("p", { className: L.empty, children: e.empty ?? "No matches" });
}
function ur({ entries: e, footer: n, align: a = "start", find: r, edges: l, size: o = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = Yd(), h = f(null);
  nr(u, h, a, l);
  const w = eu(e, r), _ = xd(w.entries), N = jd(_.flatMap(Td).map((D) => D.item)), k = Hd(N, s, w.toFind), A = qd(s);
  return Fd(N, s), /* @__PURE__ */ i("div", { ref: h, className: tu(l, o), ...A, children: [
    w.find && /* @__PURE__ */ t(Zd, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ t("div", { role: "menu", id: c, "aria-labelledby": d, className: L.menu, ...k, children: _.map((D, we) => /* @__PURE__ */ t(Jd, { block: D, nav: N, popup: s }, we)) }),
    /* @__PURE__ */ t(au, { find: w.find, count: N.items.length }),
    n && /* @__PURE__ */ t("p", { className: L.footer, children: n })
  ] });
}
function ru(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function hr(e, n) {
  S(() => {
    const a = e.current;
    n === "page" && a && !ru(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, n]);
}
const lu = (e, n) => e.reduce((a, r) => a + r + n, -n);
function ou({ room: e, widths: n, more: a, gap: r }, l) {
  const o = n.map((d, u) => u);
  if (lu(n, r) <= e) return o;
  const s = /* @__PURE__ */ new Set([l]);
  let c = n[l] + r + a;
  for (const d of o)
    if (d !== l) {
      if (c += n[d] + r, c > e) break;
      s.add(d);
    }
  return o.filter((d) => s.has(d));
}
const lt = (e) => Number.parseFloat(e) || 0, la = (e) => e.getBoundingClientRect().width;
function iu(e, n) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - lt(a.paddingInlineStart) - lt(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(n), la),
    more: r ? la(r) : 0,
    gap: lt(a.columnGap)
  };
}
function su(e, n) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(n);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const cu = (e, n) => JSON.stringify(e) === JSON.stringify(n);
function mr(e, n, a, r = ':scope > [role="tab"]') {
  const [l, o] = b(null);
  return on(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = iu(s, r);
      o((u) => cu(u, d) ? u : d);
    };
    return c(), su(s, c);
  }, [e, a, r]), l && ou(l, n);
}
const du = "_strip_1eynz_2", uu = "_fits_1eynz_19", hu = "_probe_1eynz_27", mu = "_moreRoot_1eynz_36", wu = "_more_1eynz_36", _u = "_tab_1eynz_55", fu = "_count_1eynz_91", vu = "_badge_1eynz_97", U = {
  strip: du,
  fits: uu,
  probe: hu,
  moreRoot: mu,
  more: wu,
  tab: _u,
  count: fu,
  badge: vu
}, wr = "More";
function bu(e, n) {
  const a = e.findIndex((r) => r.id === n);
  return a < 0 ? 0 : a;
}
const oa = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Bt = (e) => e.badge === void 0 ? oa(e) : `${oa(e)}, ${e.badge}`;
function _r(e) {
  return `${U.strip} ward-tabs ward-tabs--${e}`;
}
const pu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function gu({ tab: e, active: n, place: a, onChange: r }) {
  return /* @__PURE__ */ i(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${U.tab} ward-tab`,
      "aria-selected": e.id === n,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : Bt(e),
      onClick: () => r(e.id),
      ...a,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
          " ",
          /* @__PURE__ */ t("span", { className: U.count, children: `· ${e.count}` })
        ] }),
        e.badge === void 0 ? null : /* @__PURE__ */ t("span", { className: U.badge, children: e.badge })
      ]
    }
  );
}
function yu(e, n) {
  return (a) => {
    n(a), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((o) => o.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Nu({ tabs: e, trigger: n, onPick: a }) {
  return /* @__PURE__ */ t(sr, { label: wr, className: U.moreRoot, trigger: { ...n, role: "tab", "aria-selected": !1, className: U.more }, children: /* @__PURE__ */ t(ur, { align: "end", entries: e.map((r) => ({ label: Bt(r), onSelect: () => a(r.id) })) }) });
}
function ku(e, n, a) {
  return !n || n.includes(a) ? e.itemProps(a) : pu;
}
function vL({ tabs: e, active: n, onChange: a, label: r = "Tabs", level: l }) {
  const o = Vn({ orientation: "horizontal" }), s = bu(e, n);
  S(() => o.setActive(s), [o.setActive, s]);
  const c = f(null);
  hr(c, l);
  const d = mr(c, s, e.map(Bt).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ i("div", { ref: c, className: `${_r(l)} ${U.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...o.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ t(gu, { tab: h, active: n, place: ku(o, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${U.more} ${U.probe}`, children: wr }),
    u.length > 0 && /* @__PURE__ */ t(Nu, { tabs: u, trigger: o.itemProps(e.length), onPick: yu(c, a) })
  ] });
}
const ia = 7, fr = "More", $u = ":scope > a", vr = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Cu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Su(e, n) {
  return !e || e.includes(n) ? {} : Cu;
}
function Ru({ link: e, current: n, place: a }) {
  return /* @__PURE__ */ i("a", { href: e.href, className: `${U.tab} ward-tab`, "aria-current": n ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: U.count, children: `· ${e.count}` })
    ] })
  ] });
}
function xu({ links: e }) {
  return /* @__PURE__ */ t(sr, { label: fr, className: U.moreRoot, trigger: { className: U.more }, children: /* @__PURE__ */ t(ur, { align: "end", entries: e.map((n) => ({ label: vr(n), href: n.href })) }) });
}
function bL({ links: e, active: n, label: a, level: r }) {
  if (e.length > ia) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ia} — the set is fixed`);
  const l = f(null);
  hr(l, r);
  const o = Math.max(0, e.findIndex((d) => d.id === n)), s = mr(l, o, e.map(vr).join(`
`), $u), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ i("nav", { ref: l, className: `${_r(r)} ${U.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ t(Ru, { link: d, current: d.id === n, place: Su(s, u) }, d.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${U.more} ${U.probe}`, children: fr }),
    c.length > 0 && /* @__PURE__ */ t(xu, { links: c })
  ] });
}
const Tu = "_root_v56ff_3", Lu = "_segment_v56ff_9", sa = {
  root: Tu,
  segment: Lu
};
function br({ options: e, value: n, onChange: a, label: r = "Options", disabled: l = !1, describedBy: o }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Vn({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === n));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ t("div", { className: `${sa.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "radio",
      className: sa.segment,
      "aria-checked": d.value === n,
      disabled: l,
      "aria-describedby": o,
      onClick: () => a(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const Au = "_sidebar_s9o1j_3", Iu = "_brand_s9o1j_9", Mu = "_mark_s9o1j_17", Eu = "_word_s9o1j_24", Bu = "_nav_s9o1j_30", Pu = "_navItem_s9o1j_39", ju = "_footLink_s9o1j_49", Du = "_group_s9o1j_58", Hu = "_groupName_s9o1j_65", qu = "_agents_s9o1j_81", Ou = "_agent_s9o1j_81", Fu = "_root_s9o1j_96", zu = "_agentTop_s9o1j_105", Wu = "_dot_s9o1j_112", Ku = "_agentName_s9o1j_124", Gu = "_agentMeta_s9o1j_138", Uu = "_foot_s9o1j_49", Vu = "_footName_s9o1j_150", Ju = "_footLinks_s9o1j_157", Yu = "_linkBrand_s9o1j_184", Xu = "_label_s9o1j_205", Qu = "_note_s9o1j_210", Zu = "_footer_s9o1j_226", I = {
  sidebar: Au,
  brand: Iu,
  mark: Mu,
  word: Eu,
  nav: Bu,
  navItem: Pu,
  new: "_new_s9o1j_48",
  footLink: ju,
  group: Du,
  groupName: Hu,
  agents: qu,
  agent: Ou,
  root: Fu,
  agentTop: zu,
  dot: Wu,
  agentName: Ku,
  agentMeta: Gu,
  foot: Uu,
  footName: Vu,
  footLinks: Ju,
  linkBrand: Yu,
  label: Xu,
  note: Qu,
  footer: Zu
};
function eh({ agent: e }) {
  const n = e.paused === !0;
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ i(
    "a",
    {
      className: I.agent,
      href: T(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": n ? "true" : void 0,
      children: [
        /* @__PURE__ */ i("span", { className: I.agentTop, children: [
          /* @__PURE__ */ t(
            "span",
            {
              className: I.dot,
              "data-paused": n ? "true" : void 0,
              style: { "--dot": xt(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ t("span", { className: I.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ t("span", { className: I.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function nh({ shared: e }) {
  return e ? /* @__PURE__ */ i("div", { className: I.foot, children: [
    /* @__PURE__ */ t("span", { className: I.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: I.footLinks, children: e.links.map((n) => /* @__PURE__ */ t("a", { className: `${I.footLink} ward-target`, href: T(n.href), children: n.label }, n.href)) })
  ] }) : null;
}
function th({ brand: e, nav: n, agentsHeading: a, agents: r, newAction: l, shared: o }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ i("nav", { className: I.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ i("div", { className: I.brand, children: [
      /* @__PURE__ */ t("span", { className: I.mark }),
      /* @__PURE__ */ t("span", { className: I.word, children: e })
    ] }),
    /* @__PURE__ */ t("div", { className: I.nav, children: n.map((s) => /* @__PURE__ */ t("a", { className: I.navItem, href: T(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ i("div", { className: I.group, children: [
      /* @__PURE__ */ i("span", { className: I.groupName, children: [
        a,
        " · ",
        te(r.length)
      ] }),
      l && /* @__PURE__ */ t("a", { className: I.new, href: T(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: I.agents, children: r.map((s) => /* @__PURE__ */ t(eh, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(nh, { shared: o })
  ] });
}
function ah(e) {
  return e.destinations ?? e.items ?? [];
}
function rh({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: I.linkBrand, children: e });
}
function lh({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: I.footer, children: e });
}
function oh({ link: e, active: n }) {
  return /* @__PURE__ */ i("a", { href: T(e.href), "aria-current": n ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: I.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: I.note, children: e.note })
  ] });
}
function ih(e) {
  return /* @__PURE__ */ i("aside", { className: `${I.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(rh, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: ah(e).map((n) => /* @__PURE__ */ t(oh, { link: n, active: n.id === e.active }, n.id)) }),
    /* @__PURE__ */ t(lh, { children: e.children })
  ] });
}
function sh(e) {
  return "agents" in e;
}
function pL(e) {
  return sh(e) ? /* @__PURE__ */ t(th, { ...e }) : /* @__PURE__ */ t(ih, { ...e });
}
const ch = "_mark_wlgi8_3", dh = {
  mark: ch
}, uh = { met: "✓", unmet: "", failed: "✕" };
function Pt({ state: e, label: n }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: dh.mark,
      "data-state": e,
      "data-testid": "mark",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0,
      children: uh[e]
    }
  );
}
const hh = "_avatar_1t33a_3", mh = {
  avatar: hh
};
function Hn(e) {
  const n = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (n.length > 1 ? (n[0] ?? "").charAt(0) + (n[1] ?? "").charAt(0) : (n[0] ?? "").slice(0, 2)).toUpperCase();
}
function wh(e) {
  const n = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = n.charAt(0);
  return [Hn(e), ...[...n.slice(1)].map((r) => a + r)];
}
function _h(e, n) {
  const a = wh(e).find((l) => !n.has(l));
  if (a !== void 0) return a;
  let r = 2;
  for (; n.has(Hn(e).charAt(0) + String(r)); ) r += 1;
  return Hn(e).charAt(0) + String(r);
}
function gL(e) {
  const n = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const l = _h(r, n);
    n.add(l), a.set(r, l);
  }
  return a;
}
function fh(e) {
  return e != null && gn(e) ? zl(e) : void 0;
}
function yL({ name: e, step: n, size: a = "md", initials: r }) {
  return /* @__PURE__ */ t("span", { className: mh.avatar, "data-size": a, "aria-hidden": "true", style: fh(n), children: r ?? Hn(e) });
}
const vh = "_marker_br9fi_2", bh = {
  marker: vh
}, ph = {
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
}, gh = { running: " ward-running" };
function Ke({ size: e, kind: n, label: a }) {
  const r = { "--marker": ph[n], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${bh.marker} ward-marker ward-marker--${n}${gh[n] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const yh = "_root_ti0pq_2", Nh = "_chip_ti0pq_11", ot = {
  root: yh,
  chip: Nh
};
function kh(e, n) {
  return e ?? n ?? (/* @__PURE__ */ new Date()).toISOString();
}
function jt({ connection: e, since: n, lastEventAt: a }) {
  const r = kh(n, a), l = Tt(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ i("span", { className: `${ot.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(Ke, { size: 6, kind: "green" }),
    "Live"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ t("span", { className: `${ot.chip} ward-connection`, role: "status", title: Rt(l), children: "Reconnecting" }) : /* @__PURE__ */ i("span", { className: `${ot.chip} ward-connection`, role: "status", children: [
    "As of ",
    me(r)
  ] });
}
const $h = "_root_yylks_2", Ch = "_context_yylks_13", Sh = "_row_yylks_1", Rh = "_heading_yylks_27", xh = "_headingWrap_yylks_35", Th = "_meta_yylks_41", Lh = "_chips_yylks_49", Ah = "_title_yylks_56", Ih = "_consequence_yylks_66", Mh = "_actionsWrap_yylks_73", Eh = "_actions_yylks_73", Bh = "_action_yylks_73", Ph = "_overflowPanel_yylks_102", jh = "_measureClip_yylks_113", Dh = "_measure_yylks_113", G = {
  root: $h,
  context: Ch,
  row: Sh,
  heading: Rh,
  headingWrap: xh,
  meta: Th,
  chips: Lh,
  title: Ah,
  consequence: Ih,
  actionsWrap: Mh,
  actions: Eh,
  action: Bh,
  overflowPanel: Ph,
  measureClip: jh,
  measure: Dh
};
function Hh({ title: e, density: n }) {
  return n === "record" ? /* @__PURE__ */ t(sn, { as: "h1", className: G.title, text: e }) : /* @__PURE__ */ t("h1", { className: G.title, children: e });
}
function qh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ t("div", { className: G.chips, children: e.map((n) => /* @__PURE__ */ t(m, { ...n }, n.label)) }) : null;
}
function Oh({ consequence: e, consequenceHint: n }) {
  return e ? /* @__PURE__ */ t("p", { className: G.consequence, title: n, children: e }) : null;
}
function Fh({ chips: e = [], consequence: n, consequenceHint: a }) {
  return e.length === 0 && !n ? null : /* @__PURE__ */ i("div", { className: G.meta, children: [
    /* @__PURE__ */ t(qh, { chips: e }),
    /* @__PURE__ */ t(Oh, { consequence: n, consequenceHint: a })
  ] });
}
function zh({ title: e, chips: n, consequence: a, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ i("div", { className: G.heading, children: [
    /* @__PURE__ */ t(Hh, { title: e, density: l }),
    /* @__PURE__ */ t(Fh, { chips: n, consequence: a, consequenceHint: r })
  ] });
}
function vt({ actions: e }) {
  return e.map((n, a) => /* @__PURE__ */ t("span", { className: G.action, "data-action": "", children: n }, a));
}
function ca({ disclosure: e }) {
  return /* @__PURE__ */ t(v, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Wh({ actions: e, hasMore: n, collapsed: a, onOverflow: r, disclosure: l }) {
  return a ? r ? /* @__PURE__ */ t(v, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(ca, { disclosure: l }) : n ? [/* @__PURE__ */ t(ca, { disclosure: l }, "more"), /* @__PURE__ */ t(vt, { actions: e }, "actions")] : /* @__PURE__ */ t(vt, { actions: e });
}
function Kh(e, n, a, r) {
  return a ? r ? null : [...e, ...n] : e.length > 0 ? e : null;
}
function Gh({ actions: e, disclosure: n, onEscape: a }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && a();
  };
  return /* @__PURE__ */ t("div", { id: n.panelId, className: G.overflowPanel, "data-ward-overflow-panel": "", hidden: !n.open, onKeyDown: r, children: /* @__PURE__ */ t(vt, { actions: e }) });
}
function Uh(e, n) {
  const a = y(), [r, l] = b(!1), o = r && e;
  return { disclosure: { open: o, panelId: a, toggle: () => l(!o) }, close: () => {
    var d, u;
    l(!1), (u = (d = n.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const Vh = (e, n) => e.trim().toLowerCase() === n.trim().toLowerCase();
function Jh(e = [], n, a) {
  const r = e.at(-1);
  return r !== void 0 && Vh(r.label, n) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function Yh({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ t("div", { className: G.context, children: /* @__PURE__ */ t(ic, { path: e.path, current: e.current }) });
}
function Xh(...e) {
  return e.some((n) => n === null);
}
function Qh(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Zh(e, n) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : n.offsetWidth + Qh(e);
}
function em(e, n, a, r, l) {
  if (l === 0 || Xh(n, a, r)) return !1;
  const [o, s, c] = [n, a, r], d = Math.max(0, e.clientWidth - Zh(e, o));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function nm(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function tm(e) {
  return $l(e) && (e.type === "a" || typeof e.props.href == "string");
}
function am(e, n) {
  return n.length === 0 && e.length === 1 && tm(e[0]);
}
function rm(e, n) {
  const a = f(null), r = f(null), l = f(null), o = f(null), [s, c] = b(!1);
  return S(() => {
    const d = a.current;
    if (!nm(d)) return;
    const u = () => c(em(d, r.current, l.current, o.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), o.current && h.observe(o.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: l, measureRef: o, collapsed: s && !n };
}
function lm({ actions: e, hasMore: n, measureRef: a }) {
  return /* @__PURE__ */ t("div", { className: G.measureClip, children: /* @__PURE__ */ i("div", { className: G.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    n ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(v, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function om({ connection: e }) {
  return e ? /* @__PURE__ */ t(jt, { connection: e.connection, since: e.since }) : null;
}
function NL({ crumb: e, crumbCurrent: n, chips: a, title: r, consequence: l, consequenceHint: o, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: _, actionsRef: N, measureRef: k, collapsed: A } = rm(s, am(s, c)), D = c.length > 0, { disclosure: we, close: ae } = Uh(A || D, N), Pe = Kh(c, s, A, u);
  return /* @__PURE__ */ i("header", { className: G.root, "data-density": h, children: [
    /* @__PURE__ */ t(Yh, { crumb: Jh(e, r, n) }),
    /* @__PURE__ */ i("div", { className: G.row, ref: w, children: [
      /* @__PURE__ */ t("div", { ref: _, className: G.headingWrap, children: /* @__PURE__ */ t(zh, { title: r, chips: a, consequence: l, consequenceHint: o, density: h }) }),
      /* @__PURE__ */ i("div", { className: G.actionsWrap, children: [
        /* @__PURE__ */ t(om, { connection: d }),
        /* @__PURE__ */ t("div", { className: G.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ t(Wh, { actions: s, hasMore: D, collapsed: A, onOverflow: u, disclosure: we }) })
      ] })
    ] }),
    /* @__PURE__ */ t(Gh, { actions: Pe, disclosure: we, onEscape: ae }),
    /* @__PURE__ */ t(lm, { actions: s, hasMore: D, measureRef: k })
  ] });
}
const im = "_root_td96x_2", sm = "_body_td96x_16", da = {
  root: im,
  body: sm
};
function kL({ variant: e = "info", ticket: n, children: a }) {
  if (!n) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${da.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": n, children: /* @__PURE__ */ t("div", { className: da.body, children: a }) });
}
const cm = "_root_bf1pc_2", dm = "_table_bf1pc_9", um = "_caption_bf1pc_14", hm = "_series_bf1pc_23", mm = "_category_bf1pc_31", wm = "_cell_bf1pc_39", _m = "_track_bf1pc_45", fm = "_lane_bf1pc_52", vm = "_bar_bf1pc_56", bm = "_value_bf1pc_63", pm = "_swatch_bf1pc_70", gm = "_empty_bf1pc_78", X = {
  root: cm,
  table: dm,
  caption: um,
  series: hm,
  category: mm,
  cell: wm,
  track: _m,
  lane: fm,
  bar: vm,
  value: bm,
  swatch: pm,
  empty: gm
}, ym = "—", ua = 6;
function Nm(e, n) {
  if (n.length < 1 || n.length > ua)
    throw new Error(`BarChart: ${n.length} series; the chart takes one to ${ua}`);
  const a = n.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function km(e) {
  return Math.max(0, ...e.flatMap((n) => n.values.map((a) => a ?? 0)));
}
function pr(e, n) {
  return n > 1 ? e + 1 : void 0;
}
function $m(e, n) {
  return e !== null && n > 0 ? e / n * 100 : 0;
}
function Cm({ value: e, top: n, step: a, format: r, missing: l }) {
  const o = $m(e, n), s = { "--share": `${o}%` };
  return /* @__PURE__ */ t("td", { className: X.cell, children: /* @__PURE__ */ i("span", { className: X.track, children: [
    /* @__PURE__ */ t("span", { className: X.lane, children: o > 0 ? /* @__PURE__ */ t("span", { className: `${X.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: X.value, children: e === null ? l : r(e) })
  ] }) });
}
function Sm({ series: e }) {
  return /* @__PURE__ */ t(x, { children: e.map((n, a) => /* @__PURE__ */ i("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: X.swatch, "data-step": pr(a, e.length), "aria-hidden": "true" }) : null,
    n.name
  ] }, n.name)) });
}
function Rm({ title: e, empty: n = "Nothing to chart yet." }) {
  return /* @__PURE__ */ i("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: X.caption, children: e }),
    /* @__PURE__ */ t("p", { className: X.empty, children: n })
  ] });
}
function xm({ title: e, categories: n, series: a, top: r, format: l = te, categoryHead: o = "Category", missing: s = ym }) {
  return /* @__PURE__ */ t("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ i("table", { className: X.table, children: [
    /* @__PURE__ */ t("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: X.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: o }) }),
      /* @__PURE__ */ t(Sm, { series: a })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((c, d) => /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: X.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ t(Cm, { value: u.values[d], top: r, step: pr(h, a.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function $L(e) {
  Nm(e.categories, e.series);
  const n = km(e.series);
  return n === 0 ? /* @__PURE__ */ t(Rm, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(xm, { ...e, top: n });
}
const Tm = "_root_1bfqw_2", Lm = "_figure_1bfqw_7", Am = "_of_1bfqw_13", Im = "_bar_1bfqw_18", Mm = "_rows_1bfqw_38", Em = "_row_1bfqw_38", Bm = "_label_1bfqw_49", Pm = "_amount_1bfqw_54", je = {
  root: Tm,
  figure: Lm,
  of: Am,
  bar: Im,
  rows: Mm,
  row: Em,
  label: Bm,
  amount: Pm
};
function jm({ spent: e, ceiling: n, breakdown: a }) {
  const r = n > 0 ? Math.min(e / n, 1) : 0;
  return /* @__PURE__ */ i("div", { className: `${je.root} ward-costmeter`, children: [
    /* @__PURE__ */ i("p", { className: `${je.figure} ward-stat-value`, children: [
      oe(e),
      " ",
      /* @__PURE__ */ i("span", { className: je.of, children: [
        "of ",
        oe(n)
      ] })
    ] }),
    /* @__PURE__ */ t(
      "meter",
      {
        className: `${je.bar} ward-costbar`,
        min: 0,
        max: n,
        value: e,
        "aria-valuetext": `${oe(e)} of ${oe(n)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    a && /* @__PURE__ */ t("ul", { className: je.rows, children: a.map((l) => /* @__PURE__ */ i("li", { className: `${je.row} ward-costrow`, children: [
      /* @__PURE__ */ t("span", { className: je.label, children: l.label }),
      /* @__PURE__ */ t("span", { className: je.amount, children: oe(l.amount) })
    ] }, l.label)) })
  ] });
}
const Dm = "_frame_f7bxz_2", Hm = "_table_f7bxz_6", qm = "_th_f7bxz_12", Om = "_td_f7bxz_13", Fm = "_sort_f7bxz_53", zm = "_row_f7bxz_65", Wm = "_empty_f7bxz_73", Oe = {
  frame: Dm,
  table: Hm,
  th: qm,
  td: Om,
  sort: Fm,
  row: zm,
  empty: Wm
}, Km = { asc: "ascending", desc: "descending" };
function Gm(e, n) {
  if (!(n === void 0 || n.key !== e.key))
    return Km[n.direction];
}
function Um(e, n) {
  return e.sortable && n ? /* @__PURE__ */ t("button", { type: "button", className: Oe.sort, onClick: () => n(e.key), children: e.header }) : e.header;
}
function Vm(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Jm({ column: e, sort: n, onSort: a }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Oe.th,
      style: Vm(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Gm(e, n),
      children: Um(e, a)
    }
  );
}
function Ym({ row: e, props: n }) {
  const a = n.rowId(e), r = (n.lockedIds ?? []).includes(a);
  return /* @__PURE__ */ t(
    "tr",
    {
      className: Oe.row,
      "data-selected": a === n.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: n.columns.map((l) => /* @__PURE__ */ t(
        "td",
        {
          className: Oe.td,
          "data-align": l.align,
          "data-mono": l.mono,
          "data-drop": l.dropPriority,
          "data-label": n.narrow ? l.header : void 0,
          children: n.renderCell(e, l.key)
        },
        l.key
      ))
    }
  );
}
function Xm({
  label: e,
  columns: n,
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
  return a.length === 0 ? /* @__PURE__ */ t("div", { className: Oe.empty, children: u }) : /* @__PURE__ */ t("div", { className: Oe.frame, "data-narrow": h, children: /* @__PURE__ */ i("table", { className: Oe.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Oe.head, children: n.map((w) => /* @__PURE__ */ t(Jm, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((w) => /* @__PURE__ */ t(Ym, { row: w, props: { label: e, columns: n, rows: a, rowId: r, renderCell: l, selectedId: o, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const Qm = "_list_v0s52_2", Zm = {
  list: Qm
};
function ew({ children: e, label: n }) {
  return /* @__PURE__ */ t("ul", { className: Zm.list, role: "list", "aria-label": n, "data-ward-plain-list": "", children: e });
}
const nw = "_label_1u62a_2", tw = {
  label: nw
};
function CL({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((n) => /* @__PURE__ */ t("th", { scope: "col", title: n.header, style: n.width === void 0 ? void 0 : { width: n.width }, children: /* @__PURE__ */ t("span", { className: tw.label, children: n.header }) }, n.key)) }) });
}
const aw = "_stack_bp6a0_2", rw = {
  stack: aw
};
function SL({ children: e }) {
  return /* @__PURE__ */ t("span", { className: rw.stack, "data-ward-action-stack": "", children: e });
}
const lw = "_set_1z0sq_2", ow = "_legend_1z0sq_7", iw = "_row_1z0sq_15", sw = "_control_1z0sq_20", cw = "_input_1z0sq_26", dw = "_label_1z0sq_31", uw = "_consequence_1z0sq_36", Ve = {
  set: lw,
  legend: ow,
  row: iw,
  control: sw,
  input: cw,
  label: dw,
  consequence: uw
};
function gr({ legend: e, options: n, value: a, onChange: r, disabled: l, name: o, describedBy: s, variant: c }) {
  const d = y(), u = o ?? d;
  return /* @__PURE__ */ i("fieldset", { className: Ve.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: Ve.legend, children: e }),
    n.map((h) => {
      const w = `${u}-${h.value}`, _ = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ i("div", { className: Ve.row, children: [
        /* @__PURE__ */ i("span", { className: Ve.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: Ve.input,
              value: h.value,
              checked: a === h.value,
              disabled: l,
              "aria-describedby": dn(_, s),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: w, className: Ve.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ t("p", { id: _, className: `${Ve.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const hw = "_root_11gpw_2", mw = "_head_11gpw_10", ww = "_note_11gpw_29", _w = "_index_11gpw_34", fw = "_dot_11gpw_38", vw = "_counter_11gpw_49", bw = "_trailing_11gpw_57", Ye = {
  root: hw,
  head: mw,
  note: ww,
  index: _w,
  dot: fw,
  counter: vw,
  trailing: bw
};
function pw({ index: e }) {
  return e ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t("span", { className: `${Ye.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: Ye.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function gw({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Ye.counter, "aria-hidden": "true", children: e }) : null;
}
function ha({ title: e, index: n, note: a, counter: r, kind: l = "micro", trailing: o }) {
  return /* @__PURE__ */ i("div", { className: `${Ye.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ i("h2", { className: Ye.head, children: [
      /* @__PURE__ */ t(pw, { index: n }),
      e,
      r && /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ t("span", { className: Ye.note, children: a }),
    /* @__PURE__ */ t(gw, { counter: r }),
    o === void 0 ? null : /* @__PURE__ */ t("span", { className: Ye.trailing, children: o })
  ] });
}
const yw = "_strip_c3x3u_2", Nw = "_cell_c3x3u_7", kw = "_value_c3x3u_12", $w = "_link_c3x3u_29", Cw = "_label_c3x3u_49", Sw = "_tiles_c3x3u_101", We = {
  strip: yw,
  cell: Nw,
  value: kw,
  link: $w,
  label: Cw,
  tiles: Sw
};
function yr(e, n, [a, r]) {
  if (n.length < a || n.length > r)
    throw new Error(`${e}: ${n.length} cells — it takes ${a} to ${r}`);
  if (n.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Nr = (e) => `${We.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Rw({ cell: e }) {
  return /* @__PURE__ */ i("div", { className: We.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Nr(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${We.label} ward-stat-label`, children: e.label })
  ] });
}
function xw({ cell: e, href: n }) {
  return /* @__PURE__ */ i("div", { className: We.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Nr(e), title: e.hint, children: /* @__PURE__ */ i("a", { className: `${We.link} ward-stat-link`, href: T(n), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${We.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const kr = (e) => e.href === void 0 ? /* @__PURE__ */ t(Rw, { cell: e }, e.label) : /* @__PURE__ */ t(xw, { cell: e, href: e.href }, e.label);
function Qn({ cells: e, divided: n = !1 }) {
  return yr("StatStrip", e, [2, 4]), /* @__PURE__ */ t("dl", { className: `${We.strip} ward-statstrip`, "data-divided": n || void 0, children: e.map(kr) });
}
const ma = 6;
function RL({ cells: e }) {
  yr("StatTiles", e, [1, 2 * ma]);
  const n = { "--ward-stat-tiles-columns": Math.min(e.length, ma) };
  return /* @__PURE__ */ t("dl", { className: `${We.tiles} ward-stattiles`, style: n, children: e.map(kr) });
}
const Tw = "_root_1eb1u_2", Lw = "_track_1eb1u_8", Aw = "_thumb_1eb1u_46", Iw = "_labelHidden_1eb1u_64", Mw = "_label_1eb1u_64", ln = {
  root: Tw,
  track: Lw,
  thumb: Aw,
  labelHidden: Iw,
  label: Mw
};
function Ew(e, n, a, r) {
  return { on: a ? !0 : e, off: !!(n || a || r) };
}
function Bw(e) {
  return e ? `${ln.label} ${ln.labelHidden}` : ln.label;
}
function Pw(e, n, a) {
  return e && !n && a ? a : void 0;
}
function jw(e, n, a, r) {
  return { "aria-describedby": Yn(dn(n, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function Dw({ id: e, reason: n }) {
  return n ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: n }) : null;
}
function Xe({ label: e, checked: n, onChange: a, disabled: r, locked: l, describedBy: o, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, w = Be(), { on: _, off: N } = Ew(n, r, l, w !== null), k = Pw(N, w !== null, c);
  return /* @__PURE__ */ i("span", { className: `${ln.root} ward-switchrow`, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": _,
        "aria-label": e,
        "aria-labelledby": d,
        ...jw(h, o, w, k),
        className: `${ln.track} ward-switch`,
        "data-on": _,
        "data-locked": l ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!_)),
        children: /* @__PURE__ */ t("span", { className: ln.thumb })
      }
    ),
    /* @__PURE__ */ t("label", { id: d, htmlFor: u, className: Bw(s), children: e }),
    /* @__PURE__ */ t(Dw, { id: h, reason: k })
  ] });
}
const Hw = "_bar_1vp69_2", qw = "_skip_1vp69_11", Ow = "_mark_1vp69_22", Fw = "_nav_1vp69_30", zw = "_list_1vp69_34", Ww = "_select_1vp69_41", Kw = "_selectTrigger_1vp69_45", Gw = "_dest_1vp69_52", Uw = "_actor_1vp69_71", Vw = "_actorMark_1vp69_84", Jw = "_actorLabel_1vp69_89", Yw = "_tagline_1vp69_108", de = {
  bar: Hw,
  skip: qw,
  mark: Ow,
  nav: Fw,
  list: zw,
  select: Ww,
  selectTrigger: Kw,
  dest: Gw,
  actor: Uw,
  actorMark: Vw,
  actorLabel: Jw,
  tagline: Yw
};
function Xw(e) {
  return e.split(/\s+/).slice(0, 2).map((n) => n[0] ?? "").join("").toUpperCase();
}
function Qw(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function xL({ wordmark: e = "Trellis", destinations: n, active: a, actor: r, tagline: l, onNavigate: o, skipTo: s = "main" }) {
  const c = Qw(r);
  return /* @__PURE__ */ i("header", { className: de.bar, children: [
    /* @__PURE__ */ t("a", { className: `${de.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ t("span", { className: de.mark, children: e }),
    l && /* @__PURE__ */ t("span", { className: de.tagline, children: l }),
    /* @__PURE__ */ i("nav", { className: de.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ t("ul", { className: de.list, children: n.map((d) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "a",
        {
          className: `${de.dest} ward-target`,
          href: T(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => o == null ? void 0 : o(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ t(
        lr,
        {
          className: de.select,
          triggerClassName: de.selectTrigger,
          "aria-label": "Destination",
          value: a,
          options: n.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => o == null ? void 0 : o(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ i("span", { className: de.actor, children: [
      /* @__PURE__ */ t("span", { className: de.actorLabel, children: c }),
      /* @__PURE__ */ t("span", { className: de.actorMark, "aria-hidden": "true", children: Xw(c) })
    ] })
  ] });
}
const Zw = "_tree_zzoob_2", e_ = "_item_zzoob_6", n_ = "_row_zzoob_10", t_ = "_button_zzoob_22", qn = {
  tree: Zw,
  item: e_,
  row: n_,
  button: t_
}, $r = ke(null);
function a_({ label: e, children: n }) {
  const { containerProps: a, itemProps: r } = Vn({ orientation: "vertical" });
  return /* @__PURE__ */ t($r.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: qn.tree, role: "tree", "aria-label": e, ...a, children: n }) });
}
const r_ = { ArrowRight: !0, ArrowLeft: !1 };
function wa(e) {
  return e ? !0 : void 0;
}
function l_(e, n) {
  const a = r_[e.key];
  !n.leaf && n.onToggle && a !== void 0 && !!n.expanded !== a && n.onToggle();
}
function o_(e) {
  var n, a;
  e.leaf || (n = e.onToggle) == null || n.call(e), (a = e.onSelect) == null || a.call(e);
}
function i_(e) {
  const n = [qn.row, "ward-treerow"];
  return e.unresolved && n.push("ward-treerow--unresolved"), e.inherited && n.push("ward-treerow--inherited"), n.join(" ");
}
function s_(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function c_(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function d_(e) {
  return typeof e == "string" ? e : void 0;
}
function u_({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function h_({ unresolved: e, inherited: n }) {
  const a = [e ? "unresolved" : "", n ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function Cr(e) {
  const n = Ne($r);
  if (!n) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = s_(e);
  return /* @__PURE__ */ i("li", { className: qn.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: i_(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": wa(e.unresolved),
        "data-inherited": wa(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: `${qn.button} ward-treeitem-btn`,
            onClick: () => o_(e),
            onKeyDown: (r) => l_(r, e),
            ...n(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: c_(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: d_(e.label), children: e.label }),
              /* @__PURE__ */ t(u_, { value: e.detail }),
              /* @__PURE__ */ t(h_, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const m_ = "_frame_gxspk_2", w_ = "_subjectRail_gxspk_22", __ = "_subject_gxspk_22", f_ = "_rail_gxspk_42", v_ = "_record_gxspk_57", b_ = "_recordBody_gxspk_102", p_ = "_stageGrid_gxspk_157", g_ = "_band_gxspk_171", y_ = "_bandBody_gxspk_179", N_ = "_bandActions_gxspk_184", k_ = "_scroller_gxspk_192", $_ = "_board_gxspk_219", C_ = "_lanes_gxspk_228", S_ = "_cardGrid_gxspk_262", Q = {
  frame: m_,
  subjectRail: w_,
  subject: __,
  rail: f_,
  record: v_,
  recordBody: b_,
  stageGrid: p_,
  band: g_,
  bandBody: y_,
  bandActions: N_,
  scroller: k_,
  board: $_,
  lanes: C_,
  cardGrid: S_
};
function TL({ children: e, as: n = "main", inset: a = "page" }) {
  return /* @__PURE__ */ t(n, { className: Q.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function _a(e) {
  return e ? "true" : void 0;
}
function LL({ children: e, rail: n, width: a = "preview", railLabel: r = "Supporting details", sticky: l, ruled: o }) {
  return /* @__PURE__ */ i("div", { className: Q.subjectRail, "data-ward-subject-rail": a, "data-ruled": _a(o), children: [
    /* @__PURE__ */ t("div", { className: Q.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Q.rail, "data-sticky": _a(l), "aria-label": r, children: n })
  ] });
}
function AL({ title: e, children: n, note: a, trailing: r, pad: l = "block", label: o, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: Q.record, "aria-label": o, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ t(ha, { kind: "key", title: e, note: n, trailing: r }) }) : /* @__PURE__ */ i("section", { className: Q.record, "aria-label": o, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ t(ha, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ t("div", { className: Q.recordBody, "data-pad": l, "data-measure": c, children: n })
  ] });
}
const R_ = "_form_1j8ub_2", x_ = "_fields_1j8ub_9", T_ = "_actions_1j8ub_19", it = {
  form: R_,
  fields: x_,
  actions: T_
};
function IL({ label: e, children: n, actions: a, onSubmit: r }) {
  const l = (o) => {
    o.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ i("form", { className: it.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: it.fields, children: n }),
    a == null ? null : /* @__PURE__ */ t("div", { className: it.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function ML({ children: e, actions: n, label: a }) {
  return /* @__PURE__ */ i("section", { className: Q.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Q.bandBody, children: e }),
    n === void 0 ? null : /* @__PURE__ */ t("div", { className: Q.bandActions, children: n })
  ] });
}
const L_ = "(max-width: 767.98px)";
function Dt({ label: e, children: n, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ t(At, { className: Q.scroller, label: e, count: a ?? Da.count(n), "data-ward-board-scroller": "", style: r, children: n });
}
function A_({ lanes: e, label: n, laneLabel: a }) {
  const [r, l] = b(null), o = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ i("div", { className: Q.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(j, { kind: "select", label: a, value: (o == null ? void 0 : o.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(Dt, { label: n, children: o == null ? void 0 : o.content })
  ] });
}
function I_({ lanes: e, label: n }) {
  return /* @__PURE__ */ t("div", { className: Q.board, "data-ward-board": "", children: /* @__PURE__ */ t(Dt, { label: n, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ t(ja, { children: a.content }, a.id)) }) });
}
function EL({ children: e, label: n = "Board", lanes: a, laneLabel: r = "Column" }) {
  const l = bn(L_);
  return a === void 0 ? /* @__PURE__ */ t(Dt, { label: n, children: e }) : l ? /* @__PURE__ */ t(A_, { lanes: a, label: n, laneLabel: r }) : /* @__PURE__ */ t(I_, { lanes: a, label: n });
}
function BL({ columns: e, children: n, label: a = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), o = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ t(At, { className: Q.stageGrid, label: a, count: l, "data-ward-stage-grid": "", "data-floor": r, style: o, children: n });
}
function PL({ children: e, label: n }) {
  return /* @__PURE__ */ t("div", { className: `${Q.cardGrid} ward-cardgrid`, role: n === void 0 ? void 0 : "region", "aria-label": n, "data-ward-card-grid": "", children: e });
}
const M_ = "_block_6tv5x_3", E_ = "_sentence_6tv5x_10", B_ = "_meta_6tv5x_19", P_ = "_ways_6tv5x_24", j_ = "_action_6tv5x_38", D_ = "_strip_6tv5x_42", H_ = "_loading_6tv5x_61", q_ = "_label_6tv5x_69", O_ = "_counter_6tv5x_76", ve = {
  block: M_,
  sentence: E_,
  meta: B_,
  ways: P_,
  action: j_,
  strip: D_,
  loading: H_,
  label: q_,
  counter: O_
};
function F_({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: ve.action, children: /* @__PURE__ */ t(v, { onClick: e.onClick, children: e.label }) });
}
function Zn({ sentence: e, action: n, children: a, role: r = "status", tone: l, kind: o, ask: s }) {
  return /* @__PURE__ */ i("div", { className: `${ve.block} ward-state${o === void 0 ? "" : ` ${o}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ i("p", { className: ve.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ i(x, { children: [
        " ",
        /* @__PURE__ */ t("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ t(F_, { action: n })
  ] });
}
function z_(e) {
  return /* @__PURE__ */ t(Zn, { ...e, kind: "ward-emptystate" });
}
function jL({ sentence: e, total: n, action: a }) {
  return /* @__PURE__ */ t(Zn, { sentence: e, action: a, children: /* @__PURE__ */ i("p", { className: ve.meta, children: [
    "0 of ",
    n,
    " match the filter"
  ] }) });
}
function W_({ ways: e }) {
  return /* @__PURE__ */ t("div", { className: `${ve.ways} ward-state-ways`, children: e.map((n) => /* @__PURE__ */ t(v, { variant: "secondary", onClick: n.onClick, children: n.label }, n.label)) });
}
function DL({ ways: e, ...n }) {
  return /* @__PURE__ */ t(Zn, { ...n, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(W_, { ways: e }) });
}
function HL({ sentence: e, at: n, onRetry: a }) {
  return /* @__PURE__ */ t(Zn, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ i("p", { className: ve.meta, children: [
    "failed at ",
    me(n)
  ] }) });
}
function qL({ lastReachableAt: e, snapshotAt: n }) {
  return /* @__PURE__ */ i("div", { className: ve.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    me(e),
    ". Showing snapshot from ",
    me(n)
  ] });
}
function OL({ queued: e, since: n }) {
  return /* @__PURE__ */ i("div", { className: ve.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    me(n)
  ] });
}
function FL({ label: e, startedAt: n }) {
  const a = f(n ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = b(!1);
  S(() => {
    const s = window.setTimeout(() => l(!0), pe.load);
    return () => window.clearTimeout(s);
  }, []);
  const o = Tt(a.current, r);
  return /* @__PURE__ */ i("div", { className: `${ve.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ t("span", { className: ve.label, children: e }),
    r ? /* @__PURE__ */ t("span", { className: ve.counter, children: Rt(o) }) : null
  ] });
}
const K_ = "_note_cigdt_2", G_ = {
  note: K_
};
function U_({ label: e, count: n, cap: a }) {
  return /* @__PURE__ */ i("p", { className: G_.note, role: "status", children: [
    e,
    " is over cap now: ",
    n,
    " items against ",
    a
  ] });
}
const V_ = "_card_k7btg_3", J_ = "_hit_k7btg_31", Y_ = "_head_k7btg_44", X_ = "_title_k7btg_51", Q_ = "_meta_k7btg_57", Z_ = "_since_k7btg_66", ef = "_sep_k7btg_76", nf = "_fields_k7btg_80", tf = "_field_k7btg_80", af = "_last_k7btg_98", rf = "_reason_k7btg_110", he = {
  card: V_,
  hit: J_,
  head: Y_,
  title: X_,
  meta: Q_,
  since: Z_,
  sep: ef,
  fields: nf,
  field: tf,
  last: af,
  reason: rf
}, lf = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function of(e, n, a) {
  const r = In(e, "blue"), l = In(e, "orange"), o = In(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: l, green: o };
    return a.subscribe(n, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = lf[d.type];
      u && c[u]();
    });
  }, [r, a, o, n, l]);
}
const sf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : oe(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function cf(e, n) {
  return sf[n](e);
}
function df({ item: e, connection: n }) {
  const a = /* @__PURE__ */ t("span", { className: he.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ i("p", { className: he.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    a,
    /* @__PURE__ */ t(Ee, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ i("p", { className: he.meta, "data-ward-card-meta": "", children: [
    e.waitsOn && /* @__PURE__ */ i(x, { children: [
      "waits on ",
      e.waitsOn,
      a
    ] }),
    /* @__PURE__ */ i("span", { className: he.since, children: [
      ce(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function uf({ item: e }) {
  const n = e.run ? { role: "running", label: "Running" } : e.state;
  return /* @__PURE__ */ i("div", { className: he.head, children: [
    e.flagged && /* @__PURE__ */ t(m, { role: "drift", label: "Off plan" }),
    n && /* @__PURE__ */ t(m, { role: n.role, label: n.label })
  ] });
}
function hf({ reason: e }) {
  return e ? /* @__PURE__ */ i("p", { className: he.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function mf({ item: e, fields: n }) {
  return n.length === 0 ? null : /* @__PURE__ */ t("p", { className: he.fields, children: n.map((a) => /* @__PURE__ */ t("span", { className: he.field, children: cf(e, a) }, a)) });
}
const bt = (e) => e ? !0 : void 0;
function wf(e) {
  return { "--stream": ye(e.streamStep, "id") };
}
function _f(e, n, a) {
  e == null || e(n, a);
}
function ff(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function vf({ item: e, stale: n }) {
  var r, l;
  const a = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return a ? /* @__PURE__ */ t("p", { className: he.last, "data-stale": bt(n), children: a }) : null;
}
function et(e) {
  const n = e.fields ?? [], a = e.item, r = f(null);
  of(r, a.key, e.feed);
  const l = ff(e.feed), o = wf(a);
  return /* @__PURE__ */ i(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: he.card,
      style: o,
      "data-selected": bt(e.selected),
      "data-flagged": bt(a.flagged),
      children: [
        /* @__PURE__ */ t("button", { type: "button", className: he.hit, onClick: (s) => _f(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ t(uf, { item: a }),
        /* @__PURE__ */ t(sn, { as: "p", className: he.title, text: a.title }),
        /* @__PURE__ */ t(df, { item: a, connection: l }),
        /* @__PURE__ */ t(hf, { reason: a.blockedReason }),
        /* @__PURE__ */ t(mf, { item: a, fields: n }),
        /* @__PURE__ */ t(vf, { item: a, stale: l === "stale" })
      ]
    }
  );
}
function Nn(e, n) {
  return e.trim().toLowerCase() === n.toLowerCase();
}
const bf = "_column_1j8bi_3", pf = "_head_1j8bi_21", gf = "_label_1j8bi_30", yf = "_count_1j8bi_39", Nf = "_list_1j8bi_53", fn = {
  column: bf,
  head: pf,
  label: gf,
  count: yf,
  list: Nf
};
function Sr(e, n) {
  return [...e].sort((a, r) => n === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function kf({ column: e, count: n, id: a }) {
  return /* @__PURE__ */ i("div", { className: fn.head, children: [
    /* @__PURE__ */ t("h2", { className: fn.label, id: a, title: e.label, children: e.label }),
    e.gate && !Nn(e.label, "Review") && /* @__PURE__ */ t(m, { role: "gate", label: "Review" }),
    /* @__PURE__ */ i("span", { className: fn.count, children: [
      n,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function $f(e) {
  return /* @__PURE__ */ t("div", { className: fn.list, role: "list", children: e.rows.map((n, a) => {
    var r;
    return /* @__PURE__ */ t(
      et,
      {
        item: n,
        fields: e.fields,
        onOpen: e.onOpen,
        selected: n.key === e.selectedKey,
        feed: e.feed,
        rovingProps: (r = e.roving) == null ? void 0 : r.itemProps(e.roving.base + a),
        inList: !0
      },
      n.key
    );
  }) });
}
function Cf({ column: e, items: n, fields: a, sort: r, onOpen: l, selectedKey: o, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && n.length > e.cap, w = Sr(n, r);
  return /* @__PURE__ */ i("section", { className: fn.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(kf, { column: e, count: n.length, id: u }),
    /* @__PURE__ */ t($f, { column: e, items: n, fields: a, sort: r, onOpen: l, selectedKey: o, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ t(U_, { label: e.label, count: n.length, cap: e.cap })
  ] });
}
const Sf = "_foot_cs4jr_2", Rf = "_link_cs4jr_19", fa = {
  foot: Sf,
  link: Rf
};
function zL({ configureHref: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("footer", { className: fa.foot, "data-ward-board-footnote": "", children: /* @__PURE__ */ t("a", { className: `${fa.link} ward-target`, href: T(e), children: "Configure board" }) });
}
const xf = "_head_1tfi5_3", Tf = "_identity_1tfi5_12", Lf = "_titleRow_1tfi5_18", Af = "_title_1tfi5_18", If = "_key_1tfi5_35", Mf = "_rollup_1tfi5_45", Ef = "_tools_1tfi5_53", Bf = "_swatch_1tfi5_101", Pf = "_mark_1tfi5_108", Re = {
  head: xf,
  identity: Tf,
  titleRow: Lf,
  title: Af,
  key: If,
  rollup: Mf,
  tools: Ef,
  swatch: Bf,
  mark: Pf
}, va = "initials:";
function jf(e) {
  return e === void 0 ? "done this week unknown" : `${te(e)} done this week`;
}
function Df(e) {
  const n = [jf(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && n.push(`${te(e.agentsWorking)} agents working`), e.p50 !== void 0 && n.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && n.push(`P90 ${ce(e.p90)}`), n.join(" · ");
}
function Hf(e) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ i("span", { title: e.inFlightHint, children: [
      te(e.inFlight),
      " open"
    ] }),
    " · ",
    Df(e)
  ] });
}
function qf(e) {
  return e.startsWith(va) ? e.slice(va.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function Of({ markRef: e, streamStep: n }) {
  const a = { "--stream": ye(n, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${Re.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: qf(e) }) : /* @__PURE__ */ t("span", { className: Re.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Ff({ owners: e, owner: n, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(j, { kind: "select", label: "Owner", value: n ?? e[0].value, onChange: a, options: e });
}
function WL({
  stream: e,
  rollups: n,
  connection: a,
  lastEventAt: r,
  owners: l,
  owner: o,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ i("div", { className: Re.head, children: [
    /* @__PURE__ */ i("div", { className: Re.identity, children: [
      /* @__PURE__ */ i("div", { className: Re.titleRow, children: [
        /* @__PURE__ */ t(Of, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: Re.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: Re.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: Re.rollup, "aria-live": "polite", children: Hf(n) })
    ] }),
    /* @__PURE__ */ i("div", { className: Re.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(Ff, { owners: l, owner: o, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(v, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(jt, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const zf = "_head_1sejb_14", Wf = "_line_1sejb_15", Kf = "_cHandle_1sejb_36", Gf = "_cName_1sejb_41", Uf = "_nameLine_1sejb_49", Vf = "_cLabel_1sejb_56", Jf = "_cCap_1sejb_61", Yf = "_cShown_1sejb_66", Xf = "_name_1sejb_49", Qf = "_noCap_1sejb_88", Zf = "_state_1sejb_102", ev = "_handle_1sejb_111", q = {
  head: zf,
  line: Wf,
  cHandle: Kf,
  cName: Gf,
  nameLine: Uf,
  cLabel: Vf,
  cCap: Jf,
  cShown: Yf,
  name: Xf,
  noCap: Qf,
  state: Zf,
  handle: ev
}, nv = "Review stages always show.", tv = "Done stages are counted, not shown.";
function KL() {
  return /* @__PURE__ */ i("div", { className: q.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: q.cHandle }),
    /* @__PURE__ */ t("span", { className: q.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: q.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: q.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: q.cShown, children: "Shown" })
  ] });
}
function av(e, n) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: n, state: n ? "on" : "off" };
}
function rv(e, n) {
  e.key === "ArrowUp" && (n == null || n(-1)), e.key === "ArrowDown" && (n == null || n(1));
}
function lv({ stage: e }) {
  return /* @__PURE__ */ t("span", { className: q.cName, children: /* @__PURE__ */ i("span", { className: q.nameLine, children: [
    /* @__PURE__ */ t("span", { className: q.name, children: e.name }),
    e.gate && !Nn(e.name, "Review") && /* @__PURE__ */ t(m, { role: "gate", label: "Review", size: "tag" })
  ] }) });
}
function ov(e) {
  return e === void 0 ? "" : String(e);
}
function iv(e) {
  return e === "" ? void 0 : Number(e);
}
function sv({ name: e, onReorder: n }) {
  const a = Be();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ t("span", { className: q.cHandle }) : /* @__PURE__ */ t("span", { className: q.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: q.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && rv(r, n),
      children: "⠿"
    }
  ) });
}
function cv({ stage: e, config: n, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${q.cCap} ${q.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: q.cCap, children: /* @__PURE__ */ t(j, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: ov(n.cap), onChange: (r) => a({ ...n, cap: iv(r) }) }) });
}
function dv(e) {
  return e.gate ? nv : e.terminal ? tv : void 0;
}
function uv({ stage: e, config: n, onChange: a }) {
  const r = Be() !== null, l = av(e, n.shown), o = e.gate || e.terminal || r, s = (c) => a({ ...n, shown: c });
  return /* @__PURE__ */ i("span", { className: q.cShown, children: [
    /* @__PURE__ */ t(Xe, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, disabledReason: dv(e), onChange: s }),
    /* @__PURE__ */ t("span", { className: q.state, "data-fixed": o || void 0, "aria-hidden": "true", onClick: () => !o && s(!l.shown), children: l.state })
  ] });
}
function hv(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function GL({ stage: e, config: n, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ i("div", { className: q.line, "data-kind": hv(e), children: [
    /* @__PURE__ */ t(sv, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(lv, { stage: e }),
    /* @__PURE__ */ t("span", { className: q.cLabel, children: /* @__PURE__ */ t(j, { kind: "input", label: "Column label", labelHidden: !0, value: n.label, onChange: (l) => a({ ...n, label: l }) }) }),
    /* @__PURE__ */ t(cv, { stage: e, config: n, onChange: a }),
    /* @__PURE__ */ t(uv, { stage: e, config: n, onChange: a })
  ] });
}
const mv = "_body_8qsv9_2", wv = "_head_8qsv9_9", _v = "_summary_8qsv9_19", fv = "_block_8qsv9_20", vv = "_actionsBlock_8qsv9_21", bv = "_title_8qsv9_41", pv = "_note_8qsv9_46", gv = "_k_8qsv9_51", yv = "_kv_8qsv9_58", Nv = "_row_8qsv9_64", kv = "_label_8qsv9_75", $v = "_value_8qsv9_84", Cv = "_quote_8qsv9_90", Sv = "_actions_8qsv9_21", Rv = "_resolve_8qsv9_111", z = {
  body: mv,
  head: wv,
  summary: _v,
  block: fv,
  actionsBlock: vv,
  title: bv,
  note: pv,
  k: gv,
  kv: yv,
  row: Nv,
  label: kv,
  value: $v,
  quote: Cv,
  actions: Sv,
  resolve: Rv
};
function xv(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Tv(e, n) {
  if (!e.run) return [];
  const a = (n == null ? void 0 : n.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(Ee, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Lv(e) {
  return (e ?? []).map((n, a) => [n.label, n.value, `fact-${a}`]);
}
function Av(e, n, a) {
  return [
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...xv(e),
    ...Lv(a),
    ...Tv(e, n)
  ];
}
function Iv({ resolve: e, label: n }) {
  return e == null ? null : /* @__PURE__ */ i("section", { className: z.resolve, "aria-label": n, children: [
    /* @__PURE__ */ t("h3", { className: z.k, children: n }),
    e
  ] });
}
function Mv(e) {
  return e.run ? { role: "running", label: "Running" } : e.state;
}
function Ev({ item: e, showKey: n }) {
  const a = Mv(e);
  return !n && !a ? null : /* @__PURE__ */ i("div", { className: z.head, children: [
    n && /* @__PURE__ */ t(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function Bv({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ i("div", { className: z.block, children: [
    /* @__PURE__ */ t("p", { className: z.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: z.note, children: e.agentMeta })
  ] }) : null;
}
function UL({ item: e, actions: n, onClose: a, returnFocusTo: r, feed: l, resolve: o, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), w = Av(e, l, d);
  return /* @__PURE__ */ t(un, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ i("div", { className: z.body, children: [
    /* @__PURE__ */ t(Ev, { item: e, showKey: u }),
    /* @__PURE__ */ i("div", { className: z.summary, children: [
      /* @__PURE__ */ t("h2", { className: z.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: z.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: z.kv, children: w.map(([_, N, k]) => /* @__PURE__ */ i("div", { className: z.row, children: [
      /* @__PURE__ */ t("dt", { className: z.label, children: _ }),
      /* @__PURE__ */ t("dd", { className: z.value, children: N })
    ] }, k ?? _)) }),
    /* @__PURE__ */ t(Bv, { item: e }),
    /* @__PURE__ */ i("div", { className: z.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: z.actions, children: n }),
      c && /* @__PURE__ */ t("p", { className: z.note, children: c })
    ] }),
    /* @__PURE__ */ t(Iv, { resolve: o, label: s ?? "Next steps" })
  ] }) });
}
const Pv = "_root_3azmy_2", jv = "_list_3azmy_7", Dv = "_item_3azmy_12", Hv = "_box_3azmy_18", qv = "_text_3azmy_23", Ov = "_note_3azmy_28", Qe = {
  root: Pv,
  list: jv,
  item: Dv,
  box: Hv,
  text: qv,
  note: Ov
};
function nt({ items: e, note: n, density: a }) {
  return /* @__PURE__ */ i("div", { className: Qe.root, "data-density": a, children: [
    /* @__PURE__ */ t("ul", { className: `${Qe.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ i("li", { className: `${Qe.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Qe.box, children: /* @__PURE__ */ t(Pt, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Qe.text, children: r.text })
    ] }, r.text)) }),
    n !== void 0 && /* @__PURE__ */ t("p", { className: `${Qe.note} ward-checklist-note`, children: n })
  ] });
}
const Fv = "_rail_znbbp_2", zv = "_k_znbbp_11", Wv = "_head_znbbp_19", Kv = "_section_znbbp_25", Gv = "_card_znbbp_39", Uv = "_strip_znbbp_46", Vv = "_skeleton_znbbp_60", Jv = "_skeletonLabel_znbbp_74", Yv = "_bar_znbbp_80", Xv = "_note_znbbp_89", re = {
  rail: Fv,
  k: zv,
  head: Wv,
  section: Kv,
  card: Gv,
  strip: Uv,
  skeleton: Vv,
  skeletonLabel: Jv,
  bar: Yv,
  note: Xv
};
function Qv(e) {
  return (n) => e == null ? void 0 : e(n);
}
function Zv({ title: e, children: n }) {
  return /* @__PURE__ */ i("section", { className: re.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: re.k, children: e }),
    n
  ] });
}
function eb({ effects: e }) {
  const n = e.filter((a) => !a.met);
  return n.length === 0 ? null : /* @__PURE__ */ t("section", { className: re.section, "aria-label": "Warnings", children: /* @__PURE__ */ t(nt, { items: n, density: "compact" }) });
}
function nb({ column: e, count: n }) {
  return /* @__PURE__ */ i("div", { className: re.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: re.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${n} ${n === 1 ? "item" : "items"}` }),
    Array.from({ length: n }, (a, r) => /* @__PURE__ */ t("span", { className: re.bar, "aria-hidden": "true" }, r))
  ] });
}
function tb({ draft: e, sample: n, open: a, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(Cf, { column: l, items: n.filter((o) => o.stage === l.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, l.id));
}
function ab(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(tb, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((n) => /* @__PURE__ */ t(nb, { column: n, count: e.sample.filter((a) => a.stage === n.id).length }, n.id));
}
function VL(e) {
  const n = Qv(e.onOpen), a = Sr(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ i("aside", { className: re.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${re.k} ${re.head}`, children: "Preview" }),
    /* @__PURE__ */ t("section", { className: re.section, "aria-label": "Card", children: /* @__PURE__ */ t("div", { className: re.card, children: a && /* @__PURE__ */ t(et, { item: a, fields: e.draft.fields, onOpen: n, feed: e.feed }) }) }),
    /* @__PURE__ */ i(Zv, { title: "Columns", children: [
      /* @__PURE__ */ t("div", { className: re.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(ab, { ...e, open: n }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: re.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(eb, { effects: e.effects })
  ] });
}
function rb(e, n) {
  return (a) => {
    e.current = a, n(a);
  };
}
function lb(e) {
  return Math.ceil(e.length / 2);
}
function ob(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Rr(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function ib(e, n, a, r) {
  if (n.current.has(e.id)) return;
  n.current.add(e.id);
  const l = Rr(e);
  l !== void 0 && a(l), r(ob(e.type));
}
function sb(e, n, a, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(n, (o) => ib(o, a, r, l));
  }, [e, n, a, r, l]);
}
function cb(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function db(e, n) {
  return n ? { role: "running", label: "Running" } : e.state ?? { role: "pending", label: e.key };
}
function ub(e, n) {
  return n !== void 0 ? ce(e.timeInStage) + " · waits on " + n.agent : e.waitsOn ? ce(e.timeInStage) + " · waits on " + e.waitsOn : ce(e.timeInStage);
}
function hb(e, n) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + B.height.card + " + " + B.height.cardRow + " * " + String(lb(n ?? [])) + ")"
  };
}
function mb(e, n) {
  return /* @__PURE__ */ t("span", { className: (n ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function wb(e, n) {
  return e.cost !== void 0 && (n ?? []).includes("cost") ? /* @__PURE__ */ t(m, { role: "meta", label: oe(e.cost) }) : null;
}
function _b(e, n) {
  return e.jiraKey !== void 0 && (n ?? []).includes("jiraLink") ? /* @__PURE__ */ t(m, { role: "meta", label: e.jiraKey }) : null;
}
function fb(e, n, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(Ee, { startedAt: e.startedAt, lastEvent: n === void 0 ? void 0 : { label: n, at: r }, connection: a ?? "live", turn: e.turn });
}
function vb(e, n, a) {
  return n === void 0 ? e.finding ?? "" : a ?? "";
}
function bb(e, n) {
  return n === void 0 ? e : rb(e, n.ref);
}
function pb(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function pn(e) {
  return e === !0 ? "true" : void 0;
}
function xr(e) {
  const n = e.item, a = n.run, r = a !== void 0, l = f(null), o = In(l), s = f(/* @__PURE__ */ new Set()), [c, d] = b(cb(n));
  sb(e.feed, n.key, s, d, o);
  const u = db(n, r), h = ub(n, a), w = hb(n, e.fields), _ = vb(n, a, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      ...pb(e),
      className: "ward-workcard",
      "data-flagged": pn(n.flagged),
      "data-selected": pn(e.selected),
      style: w,
      ref: bb(l, e.rovingItem),
      onClick: () => e.onOpen(n.key),
      children: [
        mb(n, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: n.title, children: n.title }),
        n.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(m, { role: u.role, label: u.label }),
          wb(n, e.fields),
          _b(n, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ i("span", { className: "ward-workcard-lastrow", children: [
          fb(a, c, e.connection, n.changedAt),
          _ !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: _, children: _ }) : null
        ] })
      ]
    }
  ) });
}
function gb({ count: e, cap: n }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(n) + ". Move " + String(e - n) + " out or raise the cap." });
}
function yb(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Nb(e, n, a) {
  return /* @__PURE__ */ i("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(m, { role: "gate", label: "Review" }) : null,
      /* @__PURE__ */ t(m, { role: "meta", label: String(n) })
    ] })
  ] });
}
function kb(e, n) {
  return !n || e.column.cap === void 0 ? null : /* @__PURE__ */ t(gb, { count: e.items.length, cap: e.column.cap });
}
function $b(e, n) {
  return e.roving ?? n;
}
function Cb(e, n) {
  return e.roving === void 0 ? n.containerProps : {};
}
function Sb(e, n) {
  return e.items.map((a, r) => /* @__PURE__ */ t(
    xr,
    {
      item: a,
      fields: e.fields,
      onOpen: e.onOpen,
      selected: a.key === e.selectedKey,
      feed: e.feed,
      connection: e.connection,
      rovingItem: n.itemProps(r)
    },
    a.key
  ));
}
function Rb(e) {
  const n = y(), a = Vn({ orientation: "vertical" }), r = $b(e, a), l = yb(e);
  return /* @__PURE__ */ i("section", { className: "ward-boardcol", "aria-labelledby": n, "data-overcap": pn(l), "data-gate": pn(e.column.gate), children: [
    Nb(e.column, e.items.length, n),
    kb(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...Cb(e, a), children: Sb(e, r) })
  ] });
}
function xb(e) {
  let n = String(e.inFlight) + " open · " + String(e.loadedThisWeek) + " done this week · " + String(e.agentsWorking) + " agents working";
  return e.p50 !== void 0 && (n += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (n += " · p90 " + ce(e.p90)), n;
}
function Tb(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(j, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((n) => ({ value: n, label: n })), onChange: e.onOwnerChange });
}
function Lb(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function JL(e) {
  return /* @__PURE__ */ i("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ i("div", { children: [
      /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: xb(e.rollups) })
    ] }),
    /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
      Tb(e),
      Lb(e.onConfigure),
      /* @__PURE__ */ t(jt, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Ab(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Ib(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Xe, { label: e.stage.name, checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Xe, { label: e.stage.name, checked: e.config.shown, onChange: (n) => e.onChange({ ...e.config, shown: n }) });
}
function Mb(e) {
  const n = e.agentsMounted ?? 0;
  return /* @__PURE__ */ i(x, { children: [
    n > 0 ? /* @__PURE__ */ t(m, { role: "running", label: String(n) + (n === 1 ? " agent" : " agents") }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(m, { role: "soft", label: "Done" }) : null
  ] });
}
function YL(e) {
  const n = e.stage;
  return /* @__PURE__ */ i("div", { className: "ward-configrow", "data-mandatory": pn(Ab(n)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: Ib(e) }),
    /* @__PURE__ */ t(j, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: n.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ t(Xa, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Mb(n),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + n.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + n.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function XL(e) {
  const n = e.sample[0];
  return /* @__PURE__ */ i("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    n !== void 0 ? /* @__PURE__ */ t(xr, { item: n, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ t(Rb, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ i("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function Eb(e, n) {
  const a = Rr(e);
  a !== void 0 && n(a);
}
function Bb(e, n, a) {
  S(() => {
    if (e != null)
      return e.subscribe(n, (r) => Eb(r, a));
  }, [e, n, a]);
}
function Pb(e) {
  const n = [["key", e.key]];
  return e.stream !== void 0 && n.push(["stream", e.stream.name]), e.workflow !== void 0 && n.push(["workflow", e.workflow]), e.state !== void 0 && n.push(["state", e.state.label]), n;
}
function jb(e) {
  const n = [];
  return e.timeInStage !== void 0 && n.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && n.push(["waits on", e.waitsOn]), e.cost !== void 0 && n.push(["cost", oe(e.cost)]), n;
}
function Db(e, n) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(Ee, { startedAt: e.startedAt, lastEvent: n === void 0 ? void 0 : { label: n, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Hb(e, n) {
  return /* @__PURE__ */ i(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    n !== void 0 && n.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: n }) : null
  ] });
}
function QL(e) {
  var s;
  const n = e.item, a = n.run, [r, l] = b((s = n.run) == null ? void 0 : s.lastStep);
  Bb(e.feed, n.key, l);
  const o = [...Pb(n), ...jb(n)];
  return /* @__PURE__ */ i(un, { kind: "drawer", title: n.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ i("dl", { className: "ward-kv", children: [
      o.map((c) => /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Db(a, r)
    ] }),
    Hb(n, e.actions)
  ] });
}
const qb = "_card_1nkkx_3", Ob = "_head_1nkkx_30", Fb = "_mark_1nkkx_38", zb = "_name_1nkkx_50", Wb = "_chips_1nkkx_71", Kb = "_description_1nkkx_77", Gb = "_run_1nkkx_82", Ub = "_sep_1nkkx_91", Vb = "_facts_1nkkx_97", Jb = "_fact_1nkkx_97", Yb = "_factLabel_1nkkx_111", Xb = "_factValue_1nkkx_115", se = {
  card: qb,
  head: Ob,
  mark: Fb,
  name: zb,
  chips: Wb,
  description: Kb,
  run: Gb,
  sep: Ub,
  facts: Vb,
  fact: Jb,
  factLabel: Yb,
  factValue: Xb
}, Qb = { live: "done", draft: "running", paused: "meta" };
function Zb(e) {
  return e === void 0 ? se.card : `${se.card} ${e}`;
}
function ep({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: se.chips, children: e.map((n) => /* @__PURE__ */ t(m, { role: Qb[n.status], size: "tag", label: n.label ?? `${n.v} ${n.status}` }, n.v)) });
}
function np({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: se.description, children: e });
}
function tp({ run: e, connection: n, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ i("p", { className: se.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: se.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(Ee, { startedAt: e.startedAt, connection: n ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function ap({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: se.facts, children: e.map((n) => /* @__PURE__ */ i("div", { className: se.fact, children: [
    /* @__PURE__ */ t("dt", { className: se.factLabel, children: n.label }),
    /* @__PURE__ */ t("dd", { className: se.factValue, children: n.value })
  ] }, n.label)) });
}
function rp(e) {
  return e.length > 0 && e.every((n) => n.status === "paused") ? !0 : void 0;
}
function lp({ agent: e, href: n, selected: a, connection: r = "live", lastEvent: l, facts: o, className: s }) {
  const c = { "--stream": ye(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ i(
    "article",
    {
      "aria-current": d,
      className: Zb(s),
      style: c,
      "data-selected": d,
      "data-paused": rp(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ i("h3", { className: se.head, children: [
          /* @__PURE__ */ t("span", { className: se.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${se.name} ward-rowlink ward-target`, href: T(n), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(np, { description: e.description }),
        /* @__PURE__ */ t(tp, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(ep, { versions: e.versions }),
        /* @__PURE__ */ t(ap, { facts: o })
      ]
    }
  );
}
const op = "_list_4dcyc_2", ip = "_row_4dcyc_11", sp = "_head_4dcyc_23", cp = "_id_4dcyc_30", dp = "_lock_4dcyc_35", up = "_reason_4dcyc_41", hp = "_remove_4dcyc_46", mp = "_clauses_4dcyc_50", wp = "_clause_4dcyc_50", _p = "_label_4dcyc_64", fp = "_cell_4dcyc_71", vp = "_value_4dcyc_76", ue = {
  list: op,
  row: ip,
  head: sp,
  id: cp,
  lock: dp,
  reason: up,
  remove: hp,
  clauses: mp,
  clause: wp,
  label: _p,
  cell: fp,
  value: vp
}, Tr = ke(!1);
function ZL({ children: e, label: n = "Rules" }) {
  return /* @__PURE__ */ t(Tr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ue.list, "aria-label": n, children: e }) });
}
function bp({ clause: e, ruleId: n, onChange: a }) {
  if (!a) return /* @__PURE__ */ t("span", { className: ue.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(j, { kind: r, labelHidden: !0, label: `${n} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => a(e.key, l) });
}
function pp({ reason: e }) {
  return /* @__PURE__ */ i("span", { className: ue.lock, children: [
    /* @__PURE__ */ t(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ue.reason, children: e })
  ] });
}
function gp({ rule: e, onRemove: n }) {
  return /* @__PURE__ */ i("span", { className: ue.head, children: [
    /* @__PURE__ */ t("span", { className: ue.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(pp, { reason: e.lockedReason }),
    n && /* @__PURE__ */ t("span", { className: ue.remove, children: /* @__PURE__ */ i(v, { variant: "ghost", size: "sm", onClick: n, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function ba(e, n) {
  return e.locked ? void 0 : n;
}
function e3({ rule: e, onChange: n, onRemove: a }) {
  if (!Ne(Tr)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = ba(e, n);
  return /* @__PURE__ */ i("li", { className: ue.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(gp, { rule: e, onRemove: ba(e, a) }),
    /* @__PURE__ */ t("dl", { className: ue.clauses, children: e.clauses.map((l) => /* @__PURE__ */ i("div", { className: ue.clause, children: [
      /* @__PURE__ */ t("dt", { className: ue.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ue.cell, children: /* @__PURE__ */ t(bp, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const yp = "_ladder_1xdeh_2", Np = "_cell_1xdeh_7", kp = "_empty_1xdeh_26", $p = "_name_1xdeh_34", Cp = "_holder_1xdeh_40", Sp = "_swatches_1xdeh_51", Rp = "_swatch_1xdeh_51", xp = "_tilesFrame_1xdeh_78", Tp = "_tiles_1xdeh_78", Lp = "_tile_1xdeh_78", Ap = "_bar_1xdeh_117", Ip = "_hex_1xdeh_128", Mp = "_note_1xdeh_138", ie = {
  ladder: yp,
  cell: Np,
  empty: kp,
  name: $p,
  holder: Cp,
  swatches: Sp,
  swatch: Rp,
  tilesFrame: xp,
  tiles: Tp,
  tile: Lp,
  bar: Ap,
  hex: Ip,
  note: Mp
}, n3 = "Not available yet";
function Ep(e) {
  return e.reserved ? "reserved" : gn(e.step) ? "validated" : "partial";
}
function Lr(e, n) {
  return n !== void 0 && e !== "reserved" ? `taken by ${n}` : e === "reserved" ? "reserved" : e === "partial" ? "Not available" : "free";
}
function Bp(e, n) {
  return n === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Pp({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(Ke, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${ie.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function jp(e, n) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), n());
}
function Dp(e, n, a) {
  return {
    "aria-checked": n,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": n ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const pa = (e) => String(e).padStart(2, "0");
function Hp(e, n, a) {
  return e === "reserved" ? "Reserved" : a ? "yours" : n ?? Lr(e, void 0);
}
function qp({ step: e, validation: n, note: a }) {
  const r = n === "reserved";
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t("span", { className: `${ie.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${ie.hex} ward-ladder-hex`, children: r ? `step ${pa(e)}` : Kl(e) }),
    /* @__PURE__ */ t("span", { className: `${ie.note} ward-ladder-note`, children: r ? a : `Step ${pa(e)} · ${a}` })
  ] });
}
function Op({ step: e, value: n, taken: a, onChange: r, presentation: l, disabled: o }) {
  const s = Ep(e), c = Lr(s, a), d = c !== "free", u = d || o, h = n === e.step, w = e.name ?? `Step ${e.step}`, _ = () => {
    u || r(e.step);
  }, N = `${w} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...Dp(d, h, u), "data-validation": s, style: Bp(e, s), onClick: _, onKeyDown: (A) => jp(A, _) }, label: N, name: w, holder: c, validation: s, note: Hp(s, a, h), step: e.step };
}
const Fp = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${ie.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${ie.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(qp, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ i("span", { ...e.shared, className: `${ie.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(Pp, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${ie.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${ie.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function zp(e) {
  return Fp[e.presentation](Op(e));
}
function Wp(e) {
  for (const n of e)
    if (!n.reserved && !Jn(n.step)) throw new Error("colour ladder renders token steps only");
}
function Kp(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Gp = { list: ie.ladder, swatches: ie.swatches, tiles: ie.tilesFrame };
function Up(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Ar(e) {
  const n = e.takenBy ?? {}, a = (o) => {
    var s;
    (s = e.onChange) == null || s.call(e, o);
  };
  Wp(e.steps);
  const r = Kp(e), l = e.steps.map((o) => /* @__PURE__ */ t(zp, { step: o, value: e.value, taken: n[o.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, o.step));
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour", ...Up(e.disabled === !0), className: `${Gp[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: ie.tiles, children: l }) : l });
}
const Vp = "_rail_s06lm_2", Jp = "_section_s06lm_12", Yp = "_sectionFlush_s06lm_22", Xp = "_head_s06lm_26", Qp = "_headLabel_s06lm_34", Zp = "_sample_s06lm_42", eg = "_sampleLabel_s06lm_47", ng = "_sampleTitle_s06lm_54", tg = "_sampleMeta_s06lm_59", ag = "_trace_s06lm_65", rg = "_traceHead_s06lm_70", lg = "_steps_s06lm_78", og = "_step_s06lm_78", ig = "_stepTitle_s06lm_97", sg = "_hollow_s06lm_107", cg = "_stepBody_s06lm_115", dg = "_stepDetail_s06lm_127", ug = "_publish_s06lm_132", hg = "_reason_s06lm_138", mg = "_note_s06lm_143", wg = "_reveal_s06lm_148", $ = {
  rail: Vp,
  section: Jp,
  sectionFlush: Yp,
  head: Xp,
  headLabel: Qp,
  sample: Zp,
  sampleLabel: eg,
  sampleTitle: ng,
  sampleMeta: tg,
  trace: ag,
  traceHead: rg,
  steps: lg,
  step: og,
  stepTitle: ig,
  hollow: sg,
  stepBody: cg,
  stepDetail: dg,
  publish: ug,
  reason: hg,
  note: mg,
  reveal: wg
}, ga = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, _g = { running: "Dry run running.", notRun: "Run a dry run first.", failed: "Dry run failed." }, fg = { ok: "greenFill", finding: "orangeFill", action: "blue" }, vg = { notSimulated: "not simulated", running: "running" };
function bg(e) {
  return e.presentation === "foundry";
}
function pg(e, n) {
  if (e.status === "running") return "Wait for the dry run to finish.";
  const a = n.find((r) => !r.met);
  return a ? `Not ready: ${a.text}` : e.status === "passed" ? null : "Pass a dry run first.";
}
function gg(e, n) {
  var r;
  const a = _g[e.status];
  return a !== void 0 ? a : ((r = n.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function yg(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Ng(e, n) {
  if (n.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function kg(e) {
  if (yg(e) && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function $g(e) {
  const [n, a] = b(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": n ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Cg(e) {
  const n = vg[e.kind];
  return n !== void 0 ? /* @__PURE__ */ t("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": n }) : /* @__PURE__ */ t(Ke, { size: 6, kind: fg[e.kind], label: e.kind });
}
function Sg(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ i("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Rg(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(Ee, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function xg(e) {
  const { step: n } = e;
  return /* @__PURE__ */ i($g, { kind: n.kind, children: [
    /* @__PURE__ */ t(Cg, { kind: n.kind }),
    /* @__PURE__ */ i("span", { className: $.stepBody, "data-current": n.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: $.stepTitle, children: n.title }),
      /* @__PURE__ */ t(Sg, { detail: n.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(Rg, { run: e.run, kind: n.kind, connection: e.connection })
  ] });
}
function Tg(e, n) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return n !== void 0 && a.push(ce(n)), a.join(" · ");
}
function Ir(e) {
  const n = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ i("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ t("p", { className: $.traceHead, id: n, children: Tg(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: $.steps, "aria-labelledby": n, children: e.steps.map((a, r) => /* @__PURE__ */ t(xg, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function Lg(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ i("div", { className: `${$.sample} ${$.section}`, children: [
    /* @__PURE__ */ t("p", { className: $.sampleLabel, children: "Sample item" }),
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
function Ag(e) {
  if (e.sample === void 0) return null;
  const n = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + me(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample: " + e.sample.key + " · " + e.sample.title + n + ". Nothing saved." });
}
function Ig(e) {
  const n = [{ value: e.run.cost === void 0 ? "—" : oe(e.run.cost), label: "Cost" }, { value: e.run.turns ? qa(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: $.sectionFlush, children: /* @__PURE__ */ t(Qn, { divided: !0, cells: n }) });
}
function Mg(e) {
  const n = [];
  return e.cost !== void 0 && n.push({ value: oe(e.cost), label: "Cost" }), e.turns !== void 0 && n.push({ value: qa(e.turns[0], e.turns[1]), label: "Turns used" }), n;
}
function Eg(e) {
  const n = Mg(e.run);
  return n.length === 0 ? null : n.length === 1 ? /* @__PURE__ */ i("p", { className: $.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: n[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: n[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: $.sectionFlush, children: /* @__PURE__ */ t(Qn, { divided: !0, cells: n }) });
}
function Mr(e) {
  const n = y();
  return e.reason !== null ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t("p", { className: `${$.reason} ward-checklist-note`, id: n, children: e.reason }),
    /* @__PURE__ */ t(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: n })
  ] }) : /* @__PURE__ */ t(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Bg(e) {
  return /* @__PURE__ */ i("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ t(Mr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: $.note, children: e.note })
  ] });
}
function Pg(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ t(Mr, { reason: e.reason, onPublish: e.onPublish }) });
}
function Er(e) {
  return /* @__PURE__ */ i("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(m, { role: ga[e.run.status].role, label: ga[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(Ee, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function jg(e, n) {
  const [a, r] = b(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((n == null ? void 0 : n.subscribe) === void 0 || e.status !== "running"))
      return n.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((o) => {
          var s, c;
          return [...o, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [n, e.status]), a;
}
function Dg(e) {
  var a;
  Ng(e.run, e.checklist);
  const n = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Er, { run: e.run, foundry: !1, connection: n }),
    /* @__PURE__ */ t(Lg, { sample: e.run.sample }),
    /* @__PURE__ */ t(Ir, { run: e.run, steps: e.run.steps, connection: n, foundry: !1 }),
    /* @__PURE__ */ t(Ig, { run: e.run }),
    /* @__PURE__ */ t("div", { className: $.section, children: /* @__PURE__ */ t(nt, { items: e.checklist }) }),
    /* @__PURE__ */ t(Bg, { reason: pg(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Hg(e) {
  var r;
  const n = jg(e.run, e.feed);
  kg(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Er, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ t(Ag, { sample: e.run.sample }),
    /* @__PURE__ */ t(Ir, { run: e.run, steps: n, connection: a, foundry: !0 }),
    /* @__PURE__ */ t(Eg, { run: e.run }),
    /* @__PURE__ */ t("div", { className: $.section, children: /* @__PURE__ */ t(nt, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(Pg, { reason: gg(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function t3(e) {
  return bg(e) ? /* @__PURE__ */ t(Hg, { ...e }) : /* @__PURE__ */ t(Dg, { ...e });
}
const qg = "_list_142ip_3", Og = "_row_142ip_9", Fg = "_condition_142ip_18", zg = "_action_142ip_24", En = {
  list: qg,
  row: Og,
  condition: Fg,
  action: zg
}, Br = ke(!1);
function a3({ children: e, label: n = "Handoff rules" }) {
  return /* @__PURE__ */ t(Br.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: En.list, "aria-label": n, children: e }) });
}
function r3({ rule: e }) {
  if (!Ne(Br)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ i("li", { className: En.row, children: [
    /* @__PURE__ */ t(m, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: En.condition, children: e.when }),
    /* @__PURE__ */ t(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: En.action, children: e.then })
  ] });
}
const Wg = "_move_tmppt_3", Kg = {
  move: Wg
};
function pt(e, n, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [l] = r.splice(n, 1);
  return r.splice(a, 0, l), r;
}
function Pr(e, n) {
  return n === "up" ? e - 1 : e + 1;
}
function jr(e, n, a) {
  return `${e} moved to position ${n + 1} of ${a}.`;
}
function ya(e, n, a) {
  return e.querySelector(`[data-move="${n}-${a}"]`);
}
function Gg(e) {
  return e === "up" ? "down" : "up";
}
function Ug(e, n) {
  const a = ya(e, n.id, n.direction) ?? ya(e, n.id, Gg(n.direction));
  a == null || a.focus();
}
function Dr() {
  const e = f(null), [n, a] = b(null), [r, l] = b("");
  return S(() => {
    e.current !== null && n !== null && Ug(e.current, n);
  }, [n]), { root: e, announcement: r, moved: (s, c) => {
    a(s), l(c);
  } };
}
function Hr({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function On({ id: e, name: n, direction: a, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${Kg.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${n} ${a}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const Vg = "_body_1jd1i_2", Jg = "_title_1jd1i_8", Yg = "_section_1jd1i_13", Xg = "_legend_1jd1i_18", Qg = "_stages_1jd1i_26", Zg = "_stage_1jd1i_26", ey = "_stageIndex_1jd1i_44", ny = "_stageName_1jd1i_50", ty = "_footer_1jd1i_59", ay = "_note_1jd1i_66", ry = "_reason_1jd1i_71", ly = "_actions_1jd1i_76", oy = "_webHead_1jd1i_83", iy = "_kicker_1jd1i_92", sy = "_webTitle_1jd1i_99", cy = "_webBody_1jd1i_105", dy = "_webSection_1jd1i_109", uy = "_sectionHead_1jd1i_121", hy = "_sectionNote_1jd1i_129", my = "_formLabel_1jd1i_134", wy = "_identityRow_1jd1i_139", _y = "_nameCell_1jd1i_145", fy = "_keyCell_1jd1i_150", vy = "_colourCell_1jd1i_154", by = "_colourStatus_1jd1i_161", py = "_webStages_1jd1i_166", gy = "_webStageList_1jd1i_172", yy = "_webStage_1jd1i_166", Ny = "_webIndex_1jd1i_191", ky = "_webStageName_1jd1i_196", $y = "_webMoves_1jd1i_201", Cy = "_addStage_1jd1i_215", Sy = "_addStageButton_1jd1i_223", Ry = "_webFooter_1jd1i_236", xy = "_webFooterNotes_1jd1i_244", Ty = "_webNote_1jd1i_251", p = {
  body: Vg,
  title: Jg,
  section: Yg,
  legend: Xg,
  stages: Qg,
  stage: Zg,
  stageIndex: ey,
  stageName: ny,
  footer: ty,
  note: ay,
  reason: ry,
  actions: ly,
  webHead: oy,
  kicker: iy,
  webTitle: sy,
  webBody: cy,
  webSection: dy,
  sectionHead: uy,
  sectionNote: hy,
  formLabel: my,
  identityRow: wy,
  nameCell: _y,
  keyCell: fy,
  colourCell: vy,
  colourStatus: by,
  webStages: py,
  webStageList: gy,
  webStage: yy,
  webIndex: Ny,
  webStageName: ky,
  webMoves: $y,
  addStage: Cy,
  addStageButton: Sy,
  webFooter: Ry,
  webFooterNotes: xy,
  webNote: Ty
}, Ly = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent" },
  { value: "gate", label: "review" },
  { value: "terminal", label: "done" }
], qr = "not a known stage";
function Ay(e, n) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(n) ? a : [{ value: n, label: `${n || "(unnamed)"} · ${qr}` }, ...a];
}
function Iy({ stage: e, index: n, catalogue: a, onName: r }) {
  const l = `Stage ${n + 1} name`;
  if (!a) return /* @__PURE__ */ t(j, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const o = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${qr}`;
  return /* @__PURE__ */ t(j, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Ay(a, e.name), invalid: o, onChange: r });
}
function Or(e, n) {
  return e.name || `stage ${n + 1}`;
}
function My(e) {
  const n = f([]), a = f(0);
  for (; n.current.length < e; ) n.current.push(`stage-row-${a.current++}`);
  return n.current.length > e && (n.current = n.current.slice(0, e)), n;
}
function Ey({ id: e, stage: n, index: a, total: r, catalogue: l, onReplace: o, onMove: s }) {
  const c = Or(n, a), d = n.kind === "gate";
  return /* @__PURE__ */ i("li", { className: `${p.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: p.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ t("div", { className: p.webStageName, children: /* @__PURE__ */ t(Iy, { stage: n, index: a, catalogue: l, onName: (u) => o({ ...n, name: u }) }) }),
    /* @__PURE__ */ t(j, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: n.kind, options: Ly, onChange: (u) => o({ ...n, kind: u }) }),
    /* @__PURE__ */ i("span", { className: p.webMoves, children: [
      a > 0 && /* @__PURE__ */ t(On, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ t(On, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function By({ stages: e, onChange: n, catalogue: a }) {
  const r = My(e.length), l = Dr(), o = (c, d) => {
    const u = Pr(c, d);
    r.current = pt(r.current, c, u), l.moved({ id: r.current[u], direction: d }, jr(Or(e[c], c), u, e.length)), n(pt(e, c, u));
  }, s = (c, d) => n(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ i("div", { className: p.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: p.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(Ey, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => o(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(Hr, { text: l.announcement }),
    /* @__PURE__ */ t("p", { className: p.addStage, children: /* @__PURE__ */ t("button", { type: "button", className: p.addStageButton, onClick: () => n([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }) })
  ] });
}
const Py = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
];
function jy({ stage: e }) {
  return e.gate && !Nn(e.name, "Review") ? /* @__PURE__ */ t(m, { role: "gate", label: "Review" }) : null;
}
const Dy = [
  { value: "advance", label: "Move on when all checks pass", consequence: "No one needs to approve." },
  { value: "review", label: "Hold every item for review", consequence: "Every item waits for a reviewer." },
  { value: "block", label: "Stop on any finding", consequence: "A finding holds the item until a person clears it." }
], Fr = "Nothing runs until you publish.", Hy = "Add a name and a key.", qy = "At least 2 stages";
function Ht(e, n) {
  return !e.reserved && gn(e.step) && n[e.step] === void 0;
}
function Oy(e, n) {
  const a = e.find((r) => Ht(r, n));
  return a ? a.step : 1;
}
function Fy({ stages: e, onMove: n }) {
  const a = Dr(), r = (l, o) => {
    const s = Pr(l, o);
    a.moved({ id: e[l].id, direction: o }, jr(e[l].name, s, e.length)), n(l, s);
  };
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t("ol", { ref: a.root, className: p.stages, "aria-label": "Stages in order", children: e.map((l, o) => /* @__PURE__ */ i("li", { className: p.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: p.stageIndex, children: String(o + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: p.stageName, children: l.name }),
      /* @__PURE__ */ t(jy, { stage: l }),
      o > 0 && /* @__PURE__ */ t(On, { id: l.id, name: l.name, direction: "up", onMove: () => r(o, "up") }),
      o < e.length - 1 && /* @__PURE__ */ t(On, { id: l.id, name: l.name, direction: "down", onMove: () => r(o, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(Hr, { text: a.announcement })
  ] });
}
function zy({ reason: e, onCreate: n, onDraft: a }) {
  const r = y();
  return /* @__PURE__ */ i("div", { className: p.footer, children: [
    /* @__PURE__ */ t("p", { className: p.note, children: Fr }),
    e && /* @__PURE__ */ t("p", { className: p.reason, id: r, children: e }),
    /* @__PURE__ */ i("div", { className: p.actions, children: [
      /* @__PURE__ */ t(v, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ t(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(v, { variant: "primary", onClick: n, children: "Create stream" })
    ] })
  ] });
}
function Wy(e, n) {
  return e !== "" && n !== "" ? null : Hy;
}
function Ky(e) {
  const { owners: n, ladder: a, takenBy: r = {}, policies: l = Dy, onCreate: o, onDraft: s, onClose: c, returnFocusTo: d } = e, u = y(), [h, w] = b(""), [_, N] = b(""), [k, A] = b(n[0].value), [D, we] = b(() => Oy(a, r)), [ae, Pe] = b(e.stages ?? Py), [Ge, E] = b(l[0].value), V = { name: h, key: _, streamStep: D, owner: k, stages: ae, policy: Ge }, $e = Wy(h, _);
  return /* @__PURE__ */ t(un, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ i("div", { className: p.body, children: [
    /* @__PURE__ */ t("h2", { className: p.title, id: u, children: "New stream" }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ t("legend", { className: p.legend, children: "Identity" }),
      /* @__PURE__ */ t(j, { kind: "input", label: "Name", value: h, onChange: w }),
      /* @__PURE__ */ t(j, { kind: "input", label: "Key", value: _, onChange: N, mono: !0 }),
      /* @__PURE__ */ t(j, { kind: "select", label: "Owner", value: k, onChange: A, options: n })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ t("legend", { className: p.legend, children: "Colour" }),
      /* @__PURE__ */ t(Ar, { label: "Colour", steps: a, value: D, onChange: we, takenBy: r })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ t("legend", { className: p.legend, children: "Stages" }),
      /* @__PURE__ */ t(Fy, { stages: ae, onMove: (Ue, kl) => Pe(pt(ae, Ue, kl)) })
    ] }),
    /* @__PURE__ */ t(gr, { legend: "When items move on", options: l, value: Ge, onChange: E }),
    /* @__PURE__ */ t(zy, { reason: $e, onCreate: () => o(V), onDraft: () => s(V) })
  ] }) });
}
const zr = [
  { value: "relay", label: "Through Trellis (safe default)", consequence: "Agents never write to Foundry or Jira directly." },
  { value: "direct", label: "Directly, each agent approved", consequence: "A second admin approves each agent." },
  { value: "readonly", label: "Read only", consequence: "Agents can read and report only." }
], Gy = "Add a name, key, owner and two stages.";
function Uy(e, n, a, r, l, o) {
  var c;
  const s = ((c = zr.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: n, owner: a, colourStep: r, writePolicyMode: s, stages: o };
}
function Vy(e, n) {
  return Jy(e) && Yy(e, n) && Xy(e);
}
function Jy(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Yy(e, n) {
  return e.colourStep === null || Ht({ step: e.colourStep }, n);
}
function Xy(e) {
  return e.stages.length >= 2 && e.stages.every((n) => n.name.trim() !== "");
}
function Na(e, n) {
  return e === null || Ht({ step: e }, n) ? "" : `Colour ${e} can't be used.`;
}
function Qy({ ready: e, draft: n, onCreate: a, onDraft: r, reasonId: l }) {
  return /* @__PURE__ */ i("div", { className: p.webFooter, children: [
    /* @__PURE__ */ i("div", { className: p.webFooterNotes, children: [
      /* @__PURE__ */ t("p", { className: p.webNote, children: Fr }),
      !e && /* @__PURE__ */ t("p", { id: l, className: p.reason, children: Gy })
    ] }),
    r && /* @__PURE__ */ t(v, { variant: "secondary", onClick: () => r(n), children: "Save draft" }),
    e ? /* @__PURE__ */ t(v, { variant: "primary", onClick: () => a(n), children: "Create stream" }) : /* @__PURE__ */ t(v, { variant: "primary", disabled: !0, describedBy: l, children: "Create stream" })
  ] });
}
function Zy({ titleId: e }) {
  return /* @__PURE__ */ t("header", { className: p.webHead, children: /* @__PURE__ */ t("h2", { id: e, className: p.webTitle, children: "New stream" }) });
}
function eN({ name: e, setName: n, streamKey: a, setKey: r, colour: l, owner: o }) {
  return /* @__PURE__ */ i("section", { className: p.webSection, children: [
    /* @__PURE__ */ t("h3", { className: p.kicker, children: "Identity" }),
    /* @__PURE__ */ i("div", { className: p.identityRow, children: [
      /* @__PURE__ */ t("div", { className: p.nameCell, children: /* @__PURE__ */ t(j, { variant: "form", label: "Name", value: e, onChange: n }) }),
      /* @__PURE__ */ t("div", { className: p.keyCell, children: /* @__PURE__ */ t(j, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      l
    ] }),
    o
  ] });
}
function nN(e) {
  const n = y(), a = y(), r = e.takenBy ?? {}, [l, o] = b(""), [s, c] = b(""), [d, u] = b(e.owners[0] ?? ""), [h, w] = b(null), [_, N] = b("relay"), [k, A] = b([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), D = Uy(l, s, d, h, _, k), we = Vy(D, r), ae = /* @__PURE__ */ i("div", { className: p.colourCell, children: [
    /* @__PURE__ */ t("span", { className: p.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(Ar, { presentation: "swatches", label: "Colour", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Pe = /* @__PURE__ */ i(x, { children: [
    Na(h, r) && /* @__PURE__ */ t("p", { className: p.colourStatus, "data-colour-status": "", children: Na(h, r) }),
    /* @__PURE__ */ t(j, { variant: "form", kind: "select", label: "Owner", value: d, options: e.owners.map((Ge) => ({ value: Ge, label: Ge })), onChange: u })
  ] });
  return /* @__PURE__ */ i(un, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(Zy, { titleId: a }),
    /* @__PURE__ */ i("div", { className: p.webBody, children: [
      /* @__PURE__ */ t(eN, { name: l, setName: o, streamKey: s, setKey: c, colour: ae, owner: Pe }),
      e.fields && /* @__PURE__ */ t("section", { className: p.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ i("section", { className: p.webSection, children: [
        /* @__PURE__ */ i("div", { className: p.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: p.kicker, children: "Stages" }),
          /* @__PURE__ */ t("span", { className: p.sectionNote, children: qy })
        ] }),
        /* @__PURE__ */ t(By, { stages: k, onChange: A })
      ] }),
      /* @__PURE__ */ t("section", { className: p.webSection, children: /* @__PURE__ */ t(gr, { variant: "cards", legend: "How agents write", value: _, options: zr, onChange: N }) }),
      /* @__PURE__ */ t(Qy, { ready: we, draft: D, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: n })
    ] })
  ] });
}
function l3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(nN, { ...e }) : /* @__PURE__ */ t(Ky, { ...e });
}
const tN = "_row_bs8hc_2", aN = "_cell_bs8hc_6", rN = "_condition_bs8hc_11", lN = "_action_bs8hc_18", oN = "_contract_bs8hc_24", iN = "_contractCondition_bs8hc_33", sN = "_contractAction_bs8hc_39", ee = {
  row: tN,
  cell: aN,
  condition: rN,
  action: lN,
  contract: oN,
  contractCondition: iN,
  contractAction: sN
}, Wr = ["advance", "block", "escalate", "requestReview"], ka = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Fn(e, n) {
  return (n == null ? void 0 : n.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function qt(e, n, a, r) {
  return a || !n ? /* @__PURE__ */ t("span", { className: ee.action, children: ka[e.then] }) : /* @__PURE__ */ t(
    j,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => n({ ...e, then: l }),
      options: Wr.map((l) => ({ value: l, label: ka[l] }))
    }
  );
}
function cN({ rule: e, onChange: n, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ee.row, children: [
    /* @__PURE__ */ t("td", { className: ee.cell, children: /* @__PURE__ */ t(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: ee.cell, children: /* @__PURE__ */ t("span", { className: ee.condition, title: Fn(e, r), children: Fn(e, r) }) }),
    /* @__PURE__ */ t("td", { className: ee.cell, children: /* @__PURE__ */ t(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: ee.cell, children: qt(e, n, a) })
  ] });
}
function dN({ rule: e, onChange: n, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ee.row, children: [
    /* @__PURE__ */ i("td", { className: ee.cell, children: [
      /* @__PURE__ */ t(m, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: ee.condition, children: Fn(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: ee.cell, children: qt(e, n, a) })
  ] });
}
function uN({ rule: e, onChange: n, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("li", { className: ee.contract, children: [
    /* @__PURE__ */ t(m, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: ee.contractCondition, children: Fn(e, r) }),
    /* @__PURE__ */ t(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: ee.contractAction, children: qt(e, n, a, !0) })
  ] });
}
const hN = { two: dN, four: cN, contract: uN };
function o3(e) {
  var a;
  if (!Wr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const n = hN[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(n, { ...e });
}
const mN = "_column_g1uat_2", wN = "_head_g1uat_17", _N = "_index_g1uat_23", fN = "_name_g1uat_29", vN = "_meta_g1uat_38", bN = "_mono_g1uat_43", pN = "_gate_g1uat_50", gN = "_reviewersLabel_g1uat_57", yN = "_reviewers_g1uat_57", NN = "_reviewer_g1uat_57", kN = "_agents_g1uat_74", $N = "_workflowColumn_g1uat_79", CN = "_workflowHead_g1uat_96", SN = "_stageRow_g1uat_102", RN = "_stageLabel_g1uat_109", xN = "_workflowTitle_g1uat_116", TN = "_workflowMeta_g1uat_122", LN = "_workflowGate_g1uat_127", AN = "_gateNote_g1uat_135", IN = "_cardNote_g1uat_140", MN = "_reviewerList_g1uat_145", EN = "_reviewerRow_g1uat_151", BN = "_reviewerMark_g1uat_157", PN = "_reviewerName_g1uat_167", jN = "_terminalCard_g1uat_173", DN = "_terminalCount_g1uat_182", HN = "_workflowAgents_g1uat_188", qN = "_mount_g1uat_194", R = {
  column: mN,
  head: wN,
  index: _N,
  name: fN,
  meta: vN,
  mono: bN,
  gate: pN,
  reviewersLabel: gN,
  reviewers: yN,
  reviewer: NN,
  agents: kN,
  workflowColumn: $N,
  workflowHead: CN,
  stageRow: SN,
  stageLabel: RN,
  workflowTitle: xN,
  workflowMeta: TN,
  workflowGate: LN,
  gateNote: AN,
  cardNote: IN,
  reviewerList: MN,
  reviewerRow: EN,
  reviewerMark: BN,
  reviewerName: PN,
  terminalCard: jN,
  terminalCount: DN,
  workflowAgents: HN,
  mount: qN
}, $a = { entry: "Entry", agent: "Agent", gate: "Review", terminal: "Done" };
function Ot(e, n = String) {
  return e === void 0 ? "—" : n(e);
}
function Kr(e) {
  return `${Math.round(e * 100)}%`;
}
function ON({ stage: e }) {
  const n = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: R.reviewers, children: n.map((a) => /* @__PURE__ */ t("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Qn, { cells: [
      { value: Kr(e.gateShare), label: "Held for review" },
      { value: te(e.count), label: "In stage" }
    ] })
  ] });
}
function FN({ stage: e }) {
  return /* @__PURE__ */ t(Qn, { cells: [
    { value: te(e.count), label: "In stage" },
    { value: Ot(e.closedThisWeek, te), label: "Closed this week" }
  ] });
}
function zN({ stage: e, titleId: n }) {
  return /* @__PURE__ */ i("header", { className: R.head, children: [
    /* @__PURE__ */ t("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: R.name, id: n, children: e.name }),
    Nn(e.name, $a[e.kind]) ? null : /* @__PURE__ */ t(m, { role: e.kind === "gate" ? "gate" : "soft", label: $a[e.kind] })
  ] });
}
function WN({ stage: e }) {
  return /* @__PURE__ */ i("p", { className: R.meta, children: [
    /* @__PURE__ */ i("span", { className: R.mono, children: [
      te(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ i("span", { className: R.mono, children: [
      ce(e.medianWait),
      " median wait"
    ] })
  ] });
}
function KN({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(ON, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(FN, { stage: e }) : null;
}
function GN({ onMount: e }) {
  return e ? /* @__PURE__ */ t(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Add an agent" }) : null;
}
function UN({ stage: e, agents: n = [], onMount: a, feed: r }) {
  const l = y(), o = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("section", { className: R.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(zN, { stage: e, titleId: l }),
    /* @__PURE__ */ t(WN, { stage: e }),
    /* @__PURE__ */ t(KN, { stage: e }),
    /* @__PURE__ */ t("div", { className: R.agents, children: n.map((s) => /* @__PURE__ */ t(lp, { ...s, connection: o }, s.agent.id)) }),
    /* @__PURE__ */ t(GN, { onMount: a })
  ] });
}
const VN = {
  gate: { role: "gate", label: "Review" },
  terminal: { role: "quiet", label: "Done" }
};
function JN({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: R.reviewerList, children: e.map((n, a) => /* @__PURE__ */ i("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: R.reviewerMark, "aria-hidden": "true", children: n.initials }),
    /* @__PURE__ */ t("span", { className: R.reviewerName, children: n.name })
  ] }, `${a}-${n.name}`)) });
}
function YN({ stage: e }) {
  const n = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: R.gateNote, children: n.length === 0 ? "A person moves items on." : "Needs approval from:" }),
    n.length === 0 ? null : /* @__PURE__ */ t(JN, { reviewers: n }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ i("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Kr(e.gateShare) }),
      " of time here"
    ] })
  ] });
}
function XN(e) {
  return e === void 0 ? "closed this week" : `closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function QN({ stage: e }) {
  return /* @__PURE__ */ i("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: R.terminalCount, children: Ot(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: R.cardNote, children: XN(e.rolledBackThisWeek) })
  ] });
}
function ZN(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function e1(e) {
  if (e.kind === "terminal") return `${Ot(e.closedThisWeek)} this week`;
  const n = ZN(e.count);
  return e.medianWait === void 0 ? n : `${n} · median wait ${e.medianWait}`;
}
function n1({ stage: e, titleId: n }) {
  const a = VN[e.kind];
  return /* @__PURE__ */ i("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ i("span", { className: R.stageRow, children: [
      /* @__PURE__ */ i("span", { className: R.stageLabel, id: `${n}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 || Nn(e.name, a.label) ? null : /* @__PURE__ */ t(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: n, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: R.workflowMeta, children: e1(e) })
  ] });
}
function t1(e) {
  return e === "entry" || e === "agent";
}
function a1({ stage: e, onMount: n }) {
  return n === void 0 || !t1(e.kind) ? null : /* @__PURE__ */ t(v, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => n(e.index, a.currentTarget), children: "+ Add agent" });
}
function r1({ stage: e, agentCards: n, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ i("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(n1, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(YN, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(QN, { stage: e }) : null,
    n === void 0 ? null : /* @__PURE__ */ t("div", { className: R.workflowAgents, children: n }),
    /* @__PURE__ */ t(a1, { stage: e, onMount: a })
  ] });
}
function l1(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function i3(e) {
  return l1(e) ? /* @__PURE__ */ t(r1, { ...e }) : /* @__PURE__ */ t(UN, { ...e });
}
const o1 = "_row_1tdra_6", i1 = "_name_1tdra_12", s1 = "_compactRow_1tdra_13", c1 = "_compactName_1tdra_13", d1 = "_cell_1tdra_30", u1 = "_chain_1tdra_45", h1 = "_owner_1tdra_51", m1 = "_mono_1tdra_57", w1 = "_compactCell_1tdra_79", _1 = "_stack_1tdra_96", f1 = "_stat_1tdra_103", v1 = "_identityLine_1tdra_110", b1 = "_identity_1tdra_110", p1 = "_ownerLine_1tdra_140", g1 = "_link_1tdra_160", y1 = "_gateMark_1tdra_166", N1 = "_emptyChain_1tdra_171", k1 = "_arrow_1tdra_177", $1 = "_muted_1tdra_182", C1 = "_define_1tdra_187", S1 = "_statValue_1tdra_194", R1 = "_policyId_1tdra_200", x1 = "_sub_1tdra_205", g = {
  row: o1,
  name: i1,
  compactRow: s1,
  compactName: c1,
  cell: d1,
  chain: u1,
  owner: h1,
  mono: m1,
  compactCell: w1,
  stack: _1,
  stat: f1,
  identityLine: v1,
  identity: b1,
  ownerLine: p1,
  link: g1,
  gateMark: y1,
  emptyChain: N1,
  arrow: k1,
  muted: $1,
  define: C1,
  statValue: S1,
  policyId: R1,
  sub: x1
};
function Gr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: n, metaKey: a, shiftKey: r, altKey: l, button: o } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: n, metaKey: a, shiftKey: r, altKey: l, button: o };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function T1(e) {
  const n = [`${e.live} live`];
  return e.draft > 0 && n.push(`${e.draft} draft`), e.paused > 0 && n.push(`${e.paused} paused`), n.join(" · ");
}
function L1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Ur(e) {
  return `${te(e)} ${e === 1 ? "member" : "members"}`;
}
function A1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Ur(e.members)}`;
}
function I1(e, n) {
  const a = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ i("span", { className: g.stack, children: [
    /* @__PURE__ */ i("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: T(n), "data-draft": a, children: e.name }),
      /* @__PURE__ */ t(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: A1(e) })
  ] }) });
}
function Vr({ name: e, gate: n, look: a, size: r }) {
  return /* @__PURE__ */ i(x, { children: [
    n ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(m, { ...a, size: r, label: e }),
    n ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (review)" }) : null
  ] });
}
function M1(e, n, a) {
  if (e !== n) return { role: "soft" };
  const r = Xn(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function E1({ stages: e, streamStep: n }) {
  const a = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, o) => /* @__PURE__ */ i("span", { className: g.link, children: [
    /* @__PURE__ */ t(Vr, { name: l.name, gate: l.gate === !0, look: M1(o, a, n), size: "tag" }),
    o === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${o}`)) });
}
function B1(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ i("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : E1(e) });
}
function Jr(e) {
  return e === void 0 ? void 0 : !0;
}
function Ca(e, n, a, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: a }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Jr(r), children: e }),
    n === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: n })
  ] }) });
}
function P1(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function j1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function D1({ stream: e, href: n, presentation: a }) {
  const r = L1(a.className);
  return /* @__PURE__ */ i("tr", { className: `${r} ward-streamrow`, onClick: Gr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ye(e.streamStep, "chip") }, children: [
    I1(e, n),
    B1(e),
    Ca(j1(e.agents), e.agents === void 0 ? void 0 : T1(e.agents), "—"),
    P1(e.policy),
    Ca(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function H1(e) {
  var n;
  return ((n = e.presentation) == null ? void 0 : n.columns) === 5;
}
function s3(e) {
  if (H1(e)) return D1(e);
  const { stream: n, href: a } = e;
  return /* @__PURE__ */ i("tr", { className: g.row, onClick: Gr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ i("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: T(a), children: n.name }),
      /* @__PURE__ */ t(m, { ...It(n.key, n.streamStep) }),
      n.draft && /* @__PURE__ */ t(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ t("span", { className: g.chain, children: n.stages.map((r) => /* @__PURE__ */ t("span", { className: g.link, children: /* @__PURE__ */ t(Vr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ i("span", { className: g.mono, children: [
      n.agents.live,
      " live · ",
      n.agents.draft,
      " draft · ",
      n.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ i("td", { className: g.cell, children: [
      /* @__PURE__ */ t("span", { className: g.owner, children: n.owner }),
      /* @__PURE__ */ t("span", { className: g.mono, children: Ur(n.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: n.inFlightHint, "data-raised": Jr(n.inFlightHint), children: te(n.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: n.p50 === void 0 ? "" : ce(n.p50) }) })
  ] });
}
const q1 = "_row_2u4ll_2", O1 = "_name_2u4ll_16", F1 = "_scope_2u4ll_24", zn = {
  row: q1,
  name: O1,
  scope: F1
};
function Ft(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function z1(e) {
  return e === void 0 ? `${zn.row} ward-toolrow` : `${zn.row} ward-toolrow ${e}`;
}
function W1(e, n) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (n == null ? void 0 : n.lockedReasonFallback) ?? "Locked by stream policy" };
}
function K1({ id: e, reasonId: n, tool: a, state: r, onChange: l }) {
  return /* @__PURE__ */ t(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: a.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? n : void 0,
      onChange: (o) => {
        r.locked || l(o.target.checked);
      }
    }
  );
}
function G1({ classification: e }) {
  return /* @__PURE__ */ t(m, { role: e === "write" ? "write" : "meta", label: Ft(e) });
}
function U1({ tool: e, state: n, reasonId: a }) {
  const r = n.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: n.locked ? a : void 0, className: `${zn.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function V1(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function c3({ tool: e, onChange: n, presentation: a }) {
  const r = y(), l = y(), o = W1(e, a), s = V1(a);
  return /* @__PURE__ */ i(s, { className: z1(a == null ? void 0 : a.className), "data-locked": o.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(K1, { id: r, reasonId: l, tool: e, state: o, onChange: n }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${zn.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(U1, { tool: e, state: o, reasonId: l }),
    /* @__PURE__ */ t(G1, { classification: e.classification }),
    o.locked ? /* @__PURE__ */ t(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const J1 = "_strip_4ppv9_2", Y1 = "_well_4ppv9_11", X1 = "_head_4ppv9_18", Q1 = "_name_4ppv9_24", Z1 = "_chart_4ppv9_32", ek = "_segment_4ppv9_38", nk = "_detailedChart_4ppv9_44", tk = "_rail_4ppv9_57", ak = "_section_4ppv9_63", rk = "_label_4ppv9_74", lk = "_note_4ppv9_91", ne = {
  strip: J1,
  well: Y1,
  head: X1,
  name: Q1,
  chart: Z1,
  segment: ek,
  detailedChart: nk,
  rail: tk,
  section: ak,
  label: rk,
  note: lk
}, ok = "Nothing to preview.", gt = [1, 2, 3, 4, 5, 6], Wn = 100;
function ik(e, n) {
  return n.has(e) ? ye(e, "id") : "var(--ward-color-line)";
}
function sk({ draft: e, streams: n }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...n.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: ne.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: gt.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: ne.segment,
      x: l * Wn,
      y: "0",
      width: Wn,
      height: "8",
      fill: ik(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function ck(e) {
  const n = e.slice(0, gt.length);
  for (; n.length < gt.length; ) n.push({ key: "—", name: "unclaimed", streamStep: null });
  return n;
}
function dk({ identities: e }) {
  return /* @__PURE__ */ i("figure", { className: `${ne.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ t("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((n, a) => /* @__PURE__ */ t(
      "rect",
      {
        x: String(a * Wn),
        y: "0",
        width: String(Wn),
        height: "40",
        style: { fill: ye(n.streamStep, "chip") }
      },
      n.key + String(a)
    )) }),
    /* @__PURE__ */ t("figcaption", { className: "ward-seglabels", children: e.map((n, a) => /* @__PURE__ */ t("span", { className: "ward-seglabel", title: n.name, children: n.key }, n.key + String(a))) })
  ] });
}
function Yr(e) {
  return (n) => e == null ? void 0 : e(n);
}
function st({ label: e, children: n }) {
  const a = y();
  return /* @__PURE__ */ i("section", { className: ne.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ t("h4", { id: a, className: ne.label, children: e }),
    n
  ] });
}
function uk({ sample: e, sampleEmpty: n, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: ne.note, children: n ?? ok }) : /* @__PURE__ */ t("div", { className: ne.well, children: /* @__PURE__ */ t(et, { item: { ...e, streamStep: Xn(a.streamStep) }, onOpen: Yr(r), feed: null }) });
}
function hk({ draft: e }) {
  const n = { "--stream": ye(e.streamStep, "id") };
  return /* @__PURE__ */ i("p", { className: ne.head, style: n, children: [
    /* @__PURE__ */ t(Ke, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: ne.name, children: e.name }),
    /* @__PURE__ */ t(m, { ...It(e.key, e.streamStep) })
  ] });
}
function mk(e) {
  const n = ck(e.identities ?? [e.draft, ...e.streams]), a = n[0];
  return /* @__PURE__ */ i("div", { className: ne.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(st, { label: "Board card", children: /* @__PURE__ */ t(uk, { ...e, draft: a }) }),
    /* @__PURE__ */ t(st, { label: "Streams index row", children: /* @__PURE__ */ t(hk, { draft: a }) }),
    /* @__PURE__ */ t(st, { label: "Overview chart segment", children: /* @__PURE__ */ t(dk, { identities: n }) })
  ] });
}
function wk({ draft: e, sample: n, streams: a, onOpen: r }) {
  const l = { "--stream": ye(e.streamStep, "id") };
  return /* @__PURE__ */ i("section", { className: ne.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ i("div", { className: ne.head, children: [
      /* @__PURE__ */ t(Ke, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: ne.name, children: e.name }),
      /* @__PURE__ */ t(m, { ...It(e.key, e.streamStep) })
    ] }),
    n === void 0 ? null : /* @__PURE__ */ t("div", { className: ne.well, children: /* @__PURE__ */ t(et, { item: { ...n, streamStep: e.streamStep }, onOpen: Yr(r) }) }),
    /* @__PURE__ */ t(sk, { draft: e, streams: a })
  ] });
}
function d3(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(mk, { ...e }) : /* @__PURE__ */ t(wk, { ...e });
}
const _k = "_row_ixlg5_6", fk = "_headCell_ixlg5_10", vk = "_cell_ixlg5_11", bk = "_name_ixlg5_23", pk = "_consequence_ixlg5_29", gk = "_governed_ixlg5_36", yk = "_control_ixlg5_42", Nk = "_byRole_ixlg5_48", kk = "_webControl_ixlg5_59", $k = "_webConsequence_ixlg5_65", Ck = "_webGoverned_ixlg5_71", F = {
  row: _k,
  headCell: fk,
  cell: vk,
  name: bk,
  consequence: pk,
  governed: gk,
  control: yk,
  byRole: Nk,
  webControl: kk,
  webConsequence: $k,
  webGoverned: Ck
};
function Sk({
  capability: e,
  cell: n,
  onChange: a
}) {
  return n.value === "byRole" ? /* @__PURE__ */ t("span", { className: F.byRole, children: "by role" }) : /* @__PURE__ */ i("span", { className: F.control, children: [
    /* @__PURE__ */ t(
      Xe,
      {
        label: `${e.name} · ${n.stream}`,
        checked: n.value !== "off",
        onChange: (r) => a(n.streamStep, r)
      }
    ),
    n.value === "pilot" && /* @__PURE__ */ t(m, { role: "running", label: "Pilot" })
  ] });
}
function Rk({ capability: e, cells: n, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: F.row, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: F.headCell, children: [
      /* @__PURE__ */ t("span", { className: F.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: F.consequence, children: e.consequence }),
      /* @__PURE__ */ i("span", { className: F.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    n.map((r) => /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(Sk, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function xk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Tk({ name: e, cell: n, onChange: a }) {
  if (n.value === "byRole") return /* @__PURE__ */ t("span", { className: `${F.webControl} ${F.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    Xe,
    {
      label: `${e} · step ${n.streamStep}`,
      checked: n.value === "on",
      disabled: a === void 0,
      onChange: (l) => a == null ? void 0 : a(n.streamStep, l ? "on" : "off")
    }
  );
  return n.value !== "pilot" ? r : /* @__PURE__ */ i("span", { className: `${F.webControl} ward-envrow`, children: [
    /* @__PURE__ */ t(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function Lk({ capability: e, cells: n, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: F.row, children: [
    /* @__PURE__ */ i("td", { className: F.cell, children: [
      /* @__PURE__ */ t("span", { className: F.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${F.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    n.map((r) => /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(Tk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webGoverned} ward-cellmeta`, children: xk(e) }) })
  ] });
}
function u3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Lk, { ...e }) : /* @__PURE__ */ t(Rk, { ...e });
}
const Ak = "_row_vv64h_2", Ik = "_cell_vv64h_6", Mk = "_name_vv64h_25", Ek = "_note_vv64h_30", Bk = "_webName_vv64h_41", Pk = "_webMeta_vv64h_47", Y = {
  row: Ak,
  cell: Ik,
  name: Mk,
  note: Ek,
  webName: Bk,
  webMeta: Pk
}, Xr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function jk(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Dk({ component: e, onRestart: n }) {
  const a = y(), r = Xr[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ i("tr", { className: Y.row, children: [
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: Y.name, children: e.name }) }),
    /* @__PURE__ */ i("td", { className: Y.cell, "data-mono": "true", children: [
      te(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { id: a, className: Y.note, children: e.note }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, "data-align": "end", children: l ? /* @__PURE__ */ t(v, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ t(v, { size: "sm", onClick: () => n(e.name), children: "Restart" }) })
  ] });
}
function Hk({ component: e, onRestart: n }) {
  return n === void 0 ? null : /* @__PURE__ */ t(v, { size: "sm", onClick: () => n(e.name), children: jk(e.state) });
}
function qk({ component: e, onRestart: n }) {
  return /* @__PURE__ */ i("tr", { className: Y.row, children: [
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: `${Y.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: `${Y.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(m, { ...Xr[e.state] }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(Hk, { component: e, onRestart: n }) })
  ] });
}
function h3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(qk, { ...e }) : /* @__PURE__ */ t(Dk, { ...e });
}
const Ok = "_row_jcm5k_7", Fk = "_cell_jcm5k_11", zk = "_next_jcm5k_28", Wk = "_headCell_jcm5k_38", Kk = "_webId_jcm5k_77", Gk = "_webPurpose_jcm5k_83", Uk = "_webMeta_jcm5k_91", Vk = "_webUrgent_jcm5k_97", W = {
  row: Ok,
  cell: Fk,
  next: zk,
  headCell: Wk,
  webId: Kk,
  webPurpose: Gk,
  webMeta: Uk,
  webUrgent: Vk
}, Jk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "Managed by sign-in provider" }
}, Yk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Qr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Xk = Object.fromEntries(Qr.map((e) => [e.key, e]));
function Ze({ column: e, children: n }) {
  const a = Xk[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: W.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: n
    }
  );
}
function m3() {
  return /* @__PURE__ */ t("tr", { children: Qr.map((e) => /* @__PURE__ */ t(
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
function Qk({ cred: e }) {
  const n = Jk[e.state];
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ t(Ze, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Ze, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Ze, { column: "state", children: /* @__PURE__ */ t(m, { role: n.role, label: n.label }) }),
    /* @__PURE__ */ t(Ze, { column: "cls", children: /* @__PURE__ */ t(m, { role: e.cls === "write" ? "write" : "meta", label: Ft(e.cls) }) }),
    /* @__PURE__ */ t(Ze, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Ze, { column: "next", children: /* @__PURE__ */ t("span", { className: W.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Zk({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${W.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${W.webMeta} ${W.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function e$({ cred: e }) {
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t("span", { className: `${W.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t("span", { className: `${W.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t("span", { className: `${W.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t(Zk, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t(m, { ...Yk[e.state] }) })
  ] });
}
function w3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(e$, { ...e }) : /* @__PURE__ */ t(Qk, { ...e });
}
const n$ = "_card_lpp45_2", t$ = "_head_lpp45_11", a$ = "_env_lpp45_18", r$ = "_version_lpp45_25", l$ = "_meta_lpp45_32", o$ = "_webCard_lpp45_37", i$ = "_webRow_lpp45_47", s$ = "_webTitle_lpp45_55", c$ = "_webLine_lpp45_65", d$ = "_webVersion_lpp45_72", u$ = "_webMeta_lpp45_77", J = {
  card: n$,
  head: t$,
  env: a$,
  version: r$,
  meta: l$,
  webCard: o$,
  webRow: i$,
  webTitle: s$,
  webLine: c$,
  webVersion: d$,
  webMeta: u$
}, Sa = { dev: "Dev", uat: "UAT", prod: "Prod" }, Zr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function h$({ env: e }) {
  const n = Zr[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ i("section", { className: J.card, "aria-label": Sa[e.env], children: [
    /* @__PURE__ */ i("div", { className: J.head, children: [
      /* @__PURE__ */ t("span", { className: J.env, children: Sa[e.env] }),
      /* @__PURE__ */ t(m, { role: n.role, label: n.label })
    ] }),
    /* @__PURE__ */ t("p", { className: J.version, children: e.version }),
    /* @__PURE__ */ i("p", { className: J.meta, children: [
      "deployed ",
      me(e.deployedAt)
    ] }),
    a && /* @__PURE__ */ t("p", { className: J.meta, children: a })
  ] });
}
function m$(e) {
  const n = e.by !== void 0 ? `by ${e.by}` : null;
  return [me(e.deployedAt), n, e.ticket].filter((a) => a !== null).join(" · ");
}
function w$(e) {
  return /* @__PURE__ */ i("article", { className: `${J.webCard} ward-envcard`, children: [
    /* @__PURE__ */ i("span", { className: `${J.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${J.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(m, { ...Zr[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${J.version} ${J.webVersion} ${J.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${J.meta} ${J.webMeta} ${J.webLine} ward-cellmeta`, children: m$(e) })
  ] });
}
function _3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(w$, { ...e }) : /* @__PURE__ */ t(h$, { ...e });
}
const _$ = "_panel_1hmja_2", f$ = "_line_1hmja_8", v$ = "_actions_1hmja_14", Sn = {
  panel: _$,
  line: f$,
  actions: v$
};
function f3(e) {
  return /* @__PURE__ */ i("div", { className: Sn.panel, children: [
    /* @__PURE__ */ t("p", { className: Sn.line, children: e.status }),
    /* @__PURE__ */ t(j, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: Sn.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: Sn.line, children: e.note ?? "" })
  ] });
}
const b$ = "_upload_13fcl_2", p$ = "_preview_13fcl_7", g$ = "_mark_13fcl_17", y$ = "_empty_13fcl_22", N$ = "_actions_13fcl_28", k$ = "_input_13fcl_33", $$ = "_reasons_13fcl_41", C$ = "_reason_13fcl_41", S$ = "_accepted_13fcl_57", le = {
  upload: b$,
  preview: p$,
  mark: g$,
  empty: y$,
  actions: N$,
  input: k$,
  reasons: $$,
  reason: C$,
  accepted: S$
}, el = 1.5, nl = 22, Kn = "script elements or event handlers", He = "links or external references", Ae = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${el}px at ${nl}px`], R$ = [Ae[1], Ae[2], Kn, He], x$ = /* @__PURE__ */ new Map([
  ["image", Ae[1]],
  ["text", Ae[2]],
  ["tspan", Ae[2]],
  ["textPath", Ae[2]],
  ["script", Kn],
  ["foreignObject", Kn],
  ["a", He],
  ["use", He],
  ["style", He],
  ["feImage", He],
  ["set", He]
]), T$ = "http://www.w3.org/2000/svg", L$ = "http://www.w3.org/2000/xmlns/", A$ = /* @__PURE__ */ new Set([
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
]), I$ = /* @__PURE__ */ new Set([
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
]), zt = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, M$ = /url\s*\(|['"\\]/i;
function E$() {
  return { ok: !1, reasons: [Ae[1]] };
}
function tl(e) {
  return e.namespaceURI === T$;
}
function B$(e) {
  try {
    const n = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return n.localName === "svg" && tl(n) ? n : null;
  } catch {
    return null;
  }
}
function P$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [Ae[0]] : [];
}
function j$(e) {
  return x$.get(e.localName) ?? (e.localName.startsWith("animate") ? He : void 0);
}
function D$(e) {
  return M$.test(e.replace(zt, ""));
}
function H$(e) {
  return /^on/i.test(e.localName) ? Kn : e.localName === "href" || D$(e.value) ? He : void 0;
}
function q$(e) {
  const n = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    n.add(j$(a));
    for (const r of Array.from(a.attributes)) n.add(H$(r));
  }
  return R$.filter((a) => n.has(a));
}
function O$(e) {
  const n = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...n.filter((l) => Number.isFinite(l) && l > 0), 0), r = a > 0 ? nl / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const o = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(o) && o * r < el;
  }) ? [Ae[3]] : [];
}
function F$(e) {
  if (e.namespaceURI === L$) return !0;
  const n = e.localName;
  return e.namespaceURI === null && (I$.has(n) || n.startsWith("stroke"));
}
function z$(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const n = e;
  return e.nodeType === Node.ELEMENT_NODE && tl(n) && A$.has(n.localName);
}
function W$(e, n) {
  z$(n) ? n.nodeType === Node.ELEMENT_NODE && al(n) : e.removeChild(n);
}
function al(e) {
  for (const n of Array.from(e.attributes)) F$(n) || e.removeAttributeNode(n);
  for (const n of Array.from(e.childNodes)) W$(e, n);
  return e;
}
function K$(e) {
  return Array.from(e.matchAll(zt), (n) => n[2]).filter((n) => n !== "");
}
function G$(e) {
  let n = 2166136261;
  for (let a = 0; a < e.length; a += 1) n = Math.imul(n ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(n >>> 0).toString(36)}`;
}
function U$(e, n) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const o of K$(l.value)) a.has(o) || a.set(o, `${n}-${a.size}`);
  return a;
}
function V$(e, n) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(zt, (r, l, o) => {
      const s = n.get(o);
      return s === void 0 ? r : r.replace(`#${o}`, `#${s}`);
    });
}
function J$(e, n) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = U$(a, n);
  for (const l of a) {
    const o = r.get(l.getAttribute("id") ?? "");
    o === void 0 ? l.removeAttribute("id") : l.setAttribute("id", o), V$(l, r);
  }
  return e;
}
function v3(e) {
  const n = B$(e);
  if (n === null) return E$();
  const a = [...P$(n), ...q$(n), ...O$(n)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(J$(al(n), G$(e))) };
}
const Y$ = "Mark accepted.", X$ = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Q$ = new Set(Fa.flatMap((e) => [ye(e, "id"), ye(e, "chip")]));
function Z$(e) {
  return e !== void 0 && (X$.test(e) || Q$.has(e)) ? e : void 0;
}
function e0({ current: e }) {
  const n = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: le.preview, style: { "--mark": Z$(e == null ? void 0 : e.colour) }, children: n ? /* @__PURE__ */ t("img", { className: le.mark, src: n, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: le.empty }) });
}
function n0(e, n) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return n.classNames[a];
}
function t0(e, n) {
  return e === null ? n.idle : e.ok ? n.accepted : n.rejected(e.reasons);
}
function a0({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: le.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: le.result, role: "status", children: /* @__PURE__ */ t("p", { className: le.accepted, children: Y$ }) }) : /* @__PURE__ */ t("div", { className: le.result, role: "status", children: /* @__PURE__ */ t("ul", { className: le.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((n) => /* @__PURE__ */ t("li", { className: le.reason, children: n }, n)) }) });
}
function r0({ result: e, presentation: n }) {
  const a = n == null ? void 0 : n.status;
  return a === void 0 ? /* @__PURE__ */ t(a0, { result: e }) : /* @__PURE__ */ t("p", { className: `${le.result} ${n0(e, a)}`, role: "status", children: t0(e, a) });
}
function Ra(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function b3({ current: e, onUpload: n, onUseInitials: a, presentation: r, disabledReason: l }) {
  const o = f(null), [s, c] = b(null), d = (u) => {
    if (u === void 0) return;
    const h = n(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ i("div", { className: le.upload, children: [
    /* @__PURE__ */ t(e0, { current: e }),
    /* @__PURE__ */ i("div", { className: le.actions, children: [
      /* @__PURE__ */ t(
        "input",
        {
          ref: o,
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
      /* @__PURE__ */ t(v, { ...Ra(l), onClick: () => {
        var u;
        return (u = o.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(v, { ...Ra(l), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(r0, { result: s, presentation: r })
  ] });
}
const l0 = "_row_o3t6y_7", o0 = "_cell_o3t6y_11", i0 = "_head_o3t6y_28", s0 = "_name_o3t6y_34", c0 = "_pinned_o3t6y_42", d0 = "_headCell_o3t6y_49", u0 = "_webName_o3t6y_88", h0 = "_webMeta_o3t6y_95", m0 = "_webWarn_o3t6y_103", H = {
  row: l0,
  cell: o0,
  head: i0,
  name: s0,
  pinned: c0,
  headCell: d0,
  webName: u0,
  webMeta: h0,
  webWarn: m0
}, Wt = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, rl = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], w0 = Object.fromEntries(rl.map((e) => [e.key, e]));
function _0(e, n) {
  return `mcp.${e}.${n}`;
}
function f0(e) {
  return Object.keys(Wt).includes(e);
}
function v0(e) {
  return Wt[e !== void 0 && f0(e) ? e : "unknown"];
}
function hn({ column: e, children: n }) {
  const a = w0[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: H.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: n
    }
  );
}
function p3() {
  return /* @__PURE__ */ t("tr", { children: rl.map((e) => /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: H.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function b0({ server: e }) {
  const n = Wt[e.connection];
  return /* @__PURE__ */ i("tr", { className: H.row, children: [
    /* @__PURE__ */ i(hn, { column: "name", children: [
      /* @__PURE__ */ i("span", { className: H.head, children: [
        /* @__PURE__ */ t("span", { className: H.name, children: e.name }),
        /* @__PURE__ */ t(m, { role: e.cls === "write" ? "write" : "meta", label: Ft(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ i("span", { className: H.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(hn, { column: "connection", children: /* @__PURE__ */ t(m, { role: n.role, label: n.label }) }),
    /* @__PURE__ */ t(hn, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(hn, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(hn, { column: "tools", children: e.tools.map((a) => _0(e.name, a)).join(" · ") })
  ] });
}
function p0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function g0(e) {
  var n;
  return (((n = e.write_tools) == null ? void 0 : n.length) ?? 0) > 0 ? { role: "write", label: "Can write" } : { role: "meta", label: "Read only" };
}
function y0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${H.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${H.webMeta} ward-cellmeta`, children: e });
}
function N0({ server: e, onRestart: n }) {
  var a;
  return n === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${H.webMeta} ward-cellmeta`, children: "Restart not set up" }) : /* @__PURE__ */ t(v, { size: "sm", onClick: () => n(e.name), children: "Restart server" });
}
function k0({ name: e, pinned: n, onPin: a }) {
  return n !== null || a === void 0 ? null : /* @__PURE__ */ t(v, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function $0({ server: e, onRestart: n, onPin: a }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ i("tr", { className: H.row, children: [
    /* @__PURE__ */ i("td", { className: H.cell, children: [
      /* @__PURE__ */ t("span", { className: `${H.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${H.webMeta} ward-cellmeta`, children: p0(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t("span", { className: `${H.webMeta} ward-cellmeta ward-truncate`, title: l.map((o) => o.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t(m, { ...g0(e) }) }),
    /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t(y0, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t(m, { ...v0(e.connection) }) }),
    /* @__PURE__ */ i("td", { className: H.cell, children: [
      /* @__PURE__ */ t(N0, { server: e, onRestart: n }),
      /* @__PURE__ */ t(k0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function g3(e) {
  return "presentation" in e ? /* @__PURE__ */ t($0, { ...e }) : /* @__PURE__ */ t(b0, { ...e });
}
const C0 = "_row_zgozg_2", S0 = "_headCell_zgozg_14", R0 = "_cell_zgozg_15", x0 = "_name_zgozg_26", T0 = "_consequence_zgozg_32", L0 = "_reason_zgozg_38", A0 = "_value_zgozg_44", I0 = "_webRow_zgozg_69", M0 = "_webSetting_zgozg_82", E0 = "_webName_zgozg_90", B0 = "_webConsequence_zgozg_98", P0 = "_webControl_zgozg_104", j0 = "_webState_zgozg_118", D0 = "_webChip_zgozg_123", P = {
  row: C0,
  headCell: S0,
  cell: R0,
  name: x0,
  consequence: T0,
  reason: L0,
  value: A0,
  webRow: I0,
  webSetting: M0,
  webName: E0,
  webConsequence: B0,
  webControl: P0,
  webState: j0,
  webChip: D0
}, ll = 104, ol = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function H0({ control: e, name: n, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Xe, { label: n, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(br, { label: n, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ t("span", { className: P.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function q0({ setting: e, control: n, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = y(), o = ol[a], s = a === "locked";
  return /* @__PURE__ */ i("tr", { className: P.row, "data-inheritance": a, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ t("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: P.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: P.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(H0, { control: n, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: P.cell, style: { width: ll }, children: /* @__PURE__ */ t(m, { role: o.role, label: o.label }) })
  ] });
}
function il(e, n) {
  return String(e ?? n);
}
function O0(e, n) {
  return e.kind === "segment" && !n ? e.options : void 0;
}
function F0(e) {
  var a;
  const n = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (n == null ? void 0 : n.label) ?? il(e.value, "—");
}
function z0({ control: e, name: n, locked: a, describedBy: r, onChange: l }) {
  const o = e.value === !0;
  return /* @__PURE__ */ i("span", { className: P.webControl, children: [
    /* @__PURE__ */ t(Xe, { label: n, labelHidden: !0, checked: o, locked: a, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: P.webState, "aria-hidden": "true", children: a || o ? "on" : "off" })
  ] });
}
function W0(e) {
  const { control: n, locked: a, onChange: r } = e;
  if (n.kind === "switch") return /* @__PURE__ */ t(z0, { ...e });
  const l = O0(n, a);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: P.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(br, { options: l, value: il(n.value, ""), onChange: (o) => r == null ? void 0 : r(o) }) }) : /* @__PURE__ */ t("span", { className: `${P.webControl} ${P.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: F0(n) });
}
function K0({ setting: e, control: n, inheritance: a, reason: r, onChange: l, renderControl: o }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ i("div", { className: `${P.row} ${P.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ i("span", { className: P.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${P.name} ${P.webName}`, children: e.name }),
      /* @__PURE__ */ i("p", { id: s, className: `${P.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    o ? /* @__PURE__ */ t("span", { className: P.webControl, children: o(s) }) : /* @__PURE__ */ t(W0, { control: n, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${P.webChip} ward-policy-chip`, style: { width: ll }, children: /* @__PURE__ */ t(m, { ...ol[a], size: "tag" }) })
  ] });
}
function y3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(K0, { ...e }) : /* @__PURE__ */ t(q0, { ...e });
}
const G0 = "_label_1fzq1_7", U0 = "_name_1fzq1_15", V0 = "_column_1fzq1_24", J0 = "_webFrame_1fzq1_57", Y0 = "_webHead_1fzq1_62", X0 = "_webHeadLabel_1fzq1_74", Q0 = "_webLabel_1fzq1_118", Z0 = "_webColumns_1fzq1_125", eC = "_webGroup_1fzq1_131", nC = "_webPeople_1fzq1_132", tC = "_webVia_1fzq1_133", aC = "_webMeta_1fzq1_162", K = {
  label: G0,
  name: U0,
  column: V0,
  webFrame: J0,
  webHead: Y0,
  webHeadLabel: X0,
  webLabel: Q0,
  webColumns: Z0,
  webGroup: eC,
  webPeople: nC,
  webVia: tC,
  webMeta: aC
}, rC = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, ct = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function dt({ column: e, children: n }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: K.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: n
    }
  );
}
function lC(e) {
  if (!e.matrixRole) return;
  const n = rC[e.matrixRole];
  if (!n) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return n;
}
function oC({ node: e }) {
  const n = lC(e);
  return /* @__PURE__ */ i("span", { className: K.label, children: [
    /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ t(iC, { role: n, node: e }),
    /* @__PURE__ */ t(dt, { column: ct[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(dt, { column: ct[1], children: e.people === void 0 ? "" : te(e.people) }),
    /* @__PURE__ */ t(dt, { column: ct[2], children: e.requestedVia ?? "" })
  ] });
}
function iC({ role: e, node: n }) {
  return /* @__PURE__ */ i(x, { children: [
    e && /* @__PURE__ */ t(m, { role: e.role, label: e.label }),
    n.floor && /* @__PURE__ */ t(m, { role: "soft", label: "Floor" }),
    n.unresolved && /* @__PURE__ */ t(m, { role: "warn", label: "Unresolved" })
  ] });
}
function sC({ index: e, depth: n, node: a, expanded: r, leaf: l, onToggle: o, children: s }) {
  return /* @__PURE__ */ t(
    Cr,
    {
      index: e,
      depth: n,
      leaf: l,
      expanded: r,
      onToggle: o,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ t(oC, { node: a }),
      children: s
    }
  );
}
function ut({ className: e, text: n }) {
  return /* @__PURE__ */ t("span", { className: e, title: n, children: n });
}
function cC({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${K.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(ut, { className: `${K.webMeta} ${K.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(ut, { className: `${K.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(ut, { className: `${K.webMeta} ${K.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function dC() {
  return /* @__PURE__ */ i("div", { className: K.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: K.webHeadLabel, children: "Who has which role" }),
    /* @__PURE__ */ i("span", { className: K.webColumns, children: [
      /* @__PURE__ */ t("span", { className: K.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: K.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: K.webVia, children: "Requested via" })
    ] })
  ] });
}
function uC({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${K.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(m, { role: "meta", label: "default" }) : null
  ] });
}
function hC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function mC({ rows: e, label: n }) {
  return /* @__PURE__ */ i("div", { className: K.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(dC, {}),
    /* @__PURE__ */ t(a_, { label: n ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ t(
      Cr,
      {
        depth: a.depth,
        label: /* @__PURE__ */ t(uC, { row: a }),
        detail: /* @__PURE__ */ t(cC, { row: a }),
        expanded: hC(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function N3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(mC, { ...e }) : /* @__PURE__ */ t(sC, { ...e });
}
const wC = "_runbook_b9agc_2", _C = "_list_b9agc_7", fC = "_step_b9agc_15", vC = "_numeral_b9agc_21", bC = "_body_b9agc_28", pC = "_head_b9agc_34", gC = "_title_b9agc_40", yC = "_detail_b9agc_45", NC = "_actions_b9agc_50", kC = "_webList_b9agc_56", $C = "_webStep_b9agc_60", CC = "_webBody_b9agc_66", SC = "_webTitle_b9agc_74", RC = "_webDetail_b9agc_78", M = {
  runbook: wC,
  list: _C,
  step: fC,
  numeral: vC,
  body: bC,
  head: pC,
  title: gC,
  detail: yC,
  actions: NC,
  webList: kC,
  webStep: $C,
  webBody: CC,
  webTitle: SC,
  webDetail: RC
}, sl = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function cl(e) {
  return String(e + 1).padStart(2, "0");
}
function xC({ step: e, index: n, connection: a }) {
  const r = sl[e.state], l = e.state === "running";
  return /* @__PURE__ */ i("li", { className: M.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: M.numeral, children: cl(n) }),
    /* @__PURE__ */ i("span", { className: M.body, children: [
      /* @__PURE__ */ i("span", { className: M.head, children: [
        /* @__PURE__ */ t("span", { className: M.title, children: e.title }),
        /* @__PURE__ */ t(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ t(Ee, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ t("span", { className: M.detail, children: e.detail })
    ] })
  ] });
}
function TC({ steps: e, actions: n, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: M.runbook, children: [
    /* @__PURE__ */ t("ol", { className: M.list, children: e.map((r, l) => /* @__PURE__ */ t(xC, { step: r, index: l, connection: a }, r.title)) }),
    n && /* @__PURE__ */ t("div", { className: M.actions, children: n })
  ] });
}
function LC({ step: e, index: n, connection: a }) {
  return /* @__PURE__ */ i("li", { className: `${M.step} ${M.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${M.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: cl(n) }),
    /* @__PURE__ */ i("span", { className: `${M.body} ${M.webBody}`, children: [
      /* @__PURE__ */ i("span", { className: `${M.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${M.title} ${M.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(m, { ...sl[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t(Ee, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${M.detail} ${M.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function AC({ steps: e, actions: n, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: M.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${M.list} ${M.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(LC, { step: r, index: l, connection: a }, r.title)) }),
    n !== void 0 ? /* @__PURE__ */ t("span", { className: `${M.actions} ward-clarity-actions`, children: n }) : null
  ] });
}
function k3(e) {
  return "presentation" in e ? /* @__PURE__ */ t(AC, { ...e }) : /* @__PURE__ */ t(TC, { ...e });
}
const IC = "_list_1gu6a_2", MC = "_check_1gu6a_10", EC = "_body_1gu6a_16", BC = "_text_1gu6a_23", PC = "_pending_1gu6a_32", jC = "_measured_1gu6a_37", tn = {
  list: IC,
  check: MC,
  body: EC,
  text: BC,
  pending: PC,
  measured: jC
};
function DC(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function HC({ check: e }) {
  const n = DC(e.passed);
  return /* @__PURE__ */ i("li", { className: `${tn.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ t(Pt, { state: n.state, label: n.label }),
    /* @__PURE__ */ i("span", { className: tn.body, children: [
      /* @__PURE__ */ t("span", { className: tn.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ i("span", { className: tn.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ t("span", { className: tn.measured, children: e.measured })
  ] });
}
function $3({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${tn.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(HC, { check: n }, n.text)) });
}
const qC = "_root_y6bbq_2", OC = "_list_y6bbq_10", FC = "_line_y6bbq_32", zC = "_at_y6bbq_59", WC = "_text_y6bbq_63", KC = "_foot_y6bbq_67", GC = "_idle_y6bbq_79", UC = "_caret_y6bbq_87", VC = "_jump_y6bbq_94", be = {
  root: qC,
  list: OC,
  line: FC,
  at: zC,
  text: WC,
  foot: KC,
  idle: GC,
  caret: UC,
  jump: VC
}, JC = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function yt(e) {
  return Number.isNaN(Date.parse(e)) ? "" : JC.format(new Date(e));
}
const YC = { warn: "warning", ok: "ok" };
function XC({ kind: e }) {
  const n = YC[e];
  return n === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function QC({ connection: e, idleSince: n, last: a }) {
  return e === "stale" ? /* @__PURE__ */ t("span", { className: be.idle, children: `Quiet since ${yt([n, a == null ? void 0 : a.at, ""].find(Boolean))}` }) : (a == null ? void 0 : a.at) === void 0 ? null : /* @__PURE__ */ t("span", { children: yt(a.at) });
}
function ZC({ connection: e, idleSince: n, last: a, children: r }) {
  return /* @__PURE__ */ i("p", { className: `${be.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${be.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t(QC, { connection: e, idleSince: n, last: a }),
    r
  ] });
}
const eS = 8;
function nS(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > eS;
}
function tS({ shown: e, onJump: n }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${be.jump} ward-consjump`, onClick: n, children: "Jump to latest" }) : null;
}
const dl = ke(null);
function C3({ announce: e, onAnnounceChange: n, children: a }) {
  const [r, l] = b(!1), o = Pa(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), n == null || n(s);
    }
  }), [e, r, n]);
  return /* @__PURE__ */ t(dl.Provider, { value: o, children: a });
}
function aS() {
  const e = Ne(dl), [n, a] = b(!1);
  return e ? [e.announce, e.setAnnounce] : [n, a];
}
const rS = (e, n) => ({ "data-empty": e === 0 || void 0, "data-fixed": n || void 0 });
function S3({ lines: e, connection: n, idleSince: a, label: r = "Activity", fixed: l }) {
  const o = f(null), [s, c] = b(0), [d, u] = aS(), [h, w] = b(!1), _ = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), on(() => {
    const k = o.current;
    k && !h && (k.scrollTop = k.scrollHeight);
  }, [e.length, h]);
  const N = () => {
    var D;
    const k = o.current;
    if (!k) return;
    const A = k.querySelectorAll("[data-consline-text]");
    (D = A.item(A.length - 1)) == null || D.focus(), w(!1);
  };
  return /* @__PURE__ */ i("div", { className: be.root, children: [
    /* @__PURE__ */ t("ol", { className: be.list, ref: o, "aria-live": d ? "polite" : "off", "aria-label": r, ...rS(e.length, l), onScroll: (k) => w(nS(k.currentTarget)), children: e.map((k, A) => /* @__PURE__ */ i("li", { className: `${be.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": A < s, children: [
      /* @__PURE__ */ t("span", { className: be.at, children: yt(k.at) }),
      /* @__PURE__ */ t(XC, { kind: k.kind }),
      /* @__PURE__ */ t("span", { className: be.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${A}`)) }),
    /* @__PURE__ */ i(ZC, { connection: n, idleSince: a, last: _, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${be.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ t(tS, { shown: h, onJump: N })
    ] })
  ] });
}
const lS = "_row_1k8wl_2", oS = "_head_1k8wl_14", iS = "_author_1k8wl_20", sS = "_eta_1k8wl_25", cS = "_edited_1k8wl_26", dS = "_body_1k8wl_32", uS = "_reason_1k8wl_37", hS = "_actions_1k8wl_42", Se = {
  row: lS,
  head: oS,
  author: iS,
  eta: sS,
  edited: cS,
  body: dS,
  reason: uS,
  actions: hS
}, mS = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function wS(e) {
  return {
    queued: "Not sent yet. Edits replace it.",
    delivered: `Sent. Edits show in ${e} as yours.`,
    retrying: "Sending. Cancel to edit.",
    failed: "Not sent. Resend or cancel."
  };
}
function _S({ comment: e, reasonId: n, onEdit: a, onWithdraw: r, onCancelDelivery: l, onViewOriginal: o }) {
  return e.delivery === "queued" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t(v, { variant: "primary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ t(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t(v, { variant: "ghost", size: "sm", onClick: a, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ t(v, { variant: "ghost", size: "sm", onClick: o, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t(v, { variant: "primary", size: "sm", disabled: !0, describedBy: n, children: "Edit" }),
    /* @__PURE__ */ t(v, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t(v, { variant: "secondary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ t(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function fS({ reason: e, reasonId: n }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ t(v, { variant: "primary", size: "sm", disabled: !0, describedBy: n, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: Se.reason, id: n, children: e })
  ] });
}
function vS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function bS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(_S, { ...e }) : /* @__PURE__ */ t(fS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function R3(e) {
  const { comment: n } = e;
  vS(e);
  const a = y(), r = `${a}-unavailable`, l = mS[n.delivery];
  return /* @__PURE__ */ i("div", { className: `${Se.row} ward-clarityrow`, "data-delivery": n.delivery, "data-queued": n.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ i("div", { className: Se.head, children: [
      /* @__PURE__ */ t("span", { className: Se.author, children: n.author }),
      /* @__PURE__ */ t(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: Se.eta, children: n.etaOrAttempt }),
      n.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: Se.edited, children: "edited " + n.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: Se.body, children: n.body }),
    /* @__PURE__ */ t("p", { className: Se.reason, id: a, children: wS(e.tracker ?? "Jira")[n.delivery] }),
    /* @__PURE__ */ t("div", { className: Se.actions, children: /* @__PURE__ */ t(bS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const pS = "_root_rvhdw_2", gS = "_attach_rvhdw_11", yS = "_actions_rvhdw_17", NS = "_reply_rvhdw_23", kS = "_replyField_rvhdw_28", $S = "_send_rvhdw_54", CS = "_sendIcon_rvhdw_65", SS = "_sendsAs_rvhdw_75", Fe = {
  root: pS,
  attach: gS,
  actions: yS,
  reply: NS,
  replyField: kS,
  send: $S,
  sendIcon: CS,
  sendsAs: SS
};
function ul({ value: e, onChange: n }) {
  const [a, r] = b("");
  return e === void 0 ? [a, r] : [e, n ?? (() => {
  })];
}
function RS() {
  return /* @__PURE__ */ t("svg", { className: Fe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function xS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function TS(e) {
  const { placeholder: n, asUser: a, onPost: r } = e, [l, o] = ul(e), s = y(), c = () => {
    l.trim() !== "" && r(a, l);
  }, d = (u) => {
    xS(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ i("div", { className: Fe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ i("div", { className: Fe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ t(j, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: n, label: n, value: l, onChange: o, describedBy: s }),
      /* @__PURE__ */ i(v, { variant: "primary", className: Fe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ t(RS, {}),
        /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: Fe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function x3(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(TS, { ...e }) : /* @__PURE__ */ t(LS, { ...e });
}
function LS(e) {
  const { placeholder: n, asUser: a, attachTo: r, requeueAfter: l, onPost: o, onDraft: s } = e, [c, d] = ul(e);
  return /* @__PURE__ */ i("div", { className: Fe.root, children: [
    /* @__PURE__ */ t(j, { kind: "textarea", label: n, value: c, onChange: d }),
    r && /* @__PURE__ */ i("div", { className: Fe.attach, children: [
      /* @__PURE__ */ t(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ t(v, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ t(
      Xa,
      {
        label: `Run ${l.agent} again after you post`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ i("div", { className: Fe.actions, children: [
      /* @__PURE__ */ t(v, { variant: "primary", onClick: () => o(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ t(v, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const AS = "_list_1yhks_2", IS = "_item_1yhks_6", MS = "_body_1yhks_22", ES = "_text_1yhks_28", BS = "_evidence_1yhks_37", PS = "_consequence_1yhks_49", rn = {
  list: AS,
  item: IS,
  body: MS,
  text: ES,
  evidence: BS,
  consequence: PS
};
function jS({ criterion: e }) {
  return /* @__PURE__ */ t(Ke, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function xa({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function DS({ criterion: e }) {
  return /* @__PURE__ */ i("span", { className: rn.body, children: [
    /* @__PURE__ */ t("span", { className: rn.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ t(xa, { text: " · " }),
      /* @__PURE__ */ t("code", { className: rn.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met || !e.why ? null : /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ t(xa, { text: " · " }),
      /* @__PURE__ */ t("span", { className: rn.consequence, children: e.why })
    ] })
  ] });
}
function HS({ criterion: e }) {
  return /* @__PURE__ */ i("li", { className: rn.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(jS, { criterion: e }),
    /* @__PURE__ */ t(DS, { criterion: e })
  ] });
}
function T3({ criteria: e }) {
  return /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t("ul", { className: `${rn.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(HS, { criterion: n }, n.text)) }) });
}
const qS = "_list_dwhoz_2", OS = "_rung_dwhoz_6", FS = "_name_dwhoz_18", zS = "_actor_dwhoz_32", Bn = {
  list: qS,
  rung: OS,
  name: FS,
  actor: zS
}, WS = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function KS({ rung: e }) {
  const n = WS[e.state];
  return /* @__PURE__ */ i("li", { className: Bn.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: Bn.name, children: e.name }),
    /* @__PURE__ */ t(m, { role: n.role, label: n.label }),
    /* @__PURE__ */ t("span", { className: `${Bn.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function L3({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${Bn.list} ward-gateladder`, children: e.map((n) => /* @__PURE__ */ t(KS, { rung: n }, n.name)) });
}
const GS = "_sheet_pw37w_2", US = "_title_pw37w_9", VS = "_stage_pw37w_15", JS = "_effects_pw37w_20", YS = "_effect_pw37w_20", XS = "_numeral_pw37w_31", QS = "_effectText_pw37w_38", ZS = "_refusals_pw37w_43", e2 = "_reasons_pw37w_52", n2 = "_reason_pw37w_52", t2 = "_actions_pw37w_62", _e = {
  sheet: GS,
  title: US,
  stage: VS,
  effects: JS,
  effect: YS,
  numeral: XS,
  effectText: QS,
  refusals: ZS,
  reasons: e2,
  reason: n2,
  actions: t2
};
function a2({ refused: e, reasonId: n, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(v, { variant: "primary", disabled: !0, describedBy: n, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(v, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function A3({ run: e, effects: n, refusals: a, cost: r, onRequeue: l, onClose: o, returnFocusTo: s }) {
  const c = y(), d = `${c}-refusal`, [u, h] = b(""), w = a.length > 0;
  return /* @__PURE__ */ t(un, { kind: "sheet", labelledBy: c, onClose: o, returnFocusTo: s, children: /* @__PURE__ */ i("div", { className: _e.sheet, children: [
    /* @__PURE__ */ i("h2", { className: _e.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ t("p", { className: _e.stage, children: e.stage }),
    /* @__PURE__ */ t("ol", { className: _e.effects, children: n.map((_, N) => /* @__PURE__ */ i("li", { className: _e.effect, children: [
      /* @__PURE__ */ t("span", { className: _e.numeral, children: String(N + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: _e.effectText, children: _ })
    ] }, _)) }),
    /* @__PURE__ */ t(
      jm,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This run adds", amount: r.more },
          { label: "Total", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ t(j, { kind: "textarea", label: "Note", value: u, onChange: h }),
    w && /* @__PURE__ */ i("div", { className: _e.refusals, children: [
      /* @__PURE__ */ t(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ t("ul", { className: _e.reasons, children: a.map((_, N) => /* @__PURE__ */ t("li", { className: _e.reason, id: N === 0 ? d : void 0, children: _.reason }, _.reason)) })
    ] }),
    /* @__PURE__ */ i("div", { className: _e.actions, children: [
      /* @__PURE__ */ t(a2, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ t(v, { onClick: o, children: "Cancel" })
    ] })
  ] }) });
}
const r2 = "_list_1laeg_2", l2 = "_path_1laeg_7", o2 = "_consequence_1laeg_35", Nt = {
  list: r2,
  path: l2,
  consequence: o2
}, Ta = {
  clarify: "Ask a question",
  requeue: "Run again",
  override: "Override and advance"
};
function i2(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function La(e) {
  return e ? "primary" : "secondary";
}
function s2({ path: e, primary: n, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ t(v, { variant: La(n), size: "sm", onClick: () => a(e.kind), children: Ta[e.kind] }) : /* @__PURE__ */ t(v, { variant: La(n), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: Ta[e.kind] });
}
function c2({ path: e, primary: n, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ i("li", { className: Nt.path, "data-allowed": e.allowed, "data-role": i2(e.requiredRole), children: [
    /* @__PURE__ */ t("span", { className: Nt.consequence, children: e.consequence }),
    /* @__PURE__ */ t(s2, { path: e, primary: n, onChoose: a })
  ] });
}
function I3({ paths: e, onChoose: n }) {
  return /* @__PURE__ */ t("ul", { className: Nt.list, children: e.map((a, r) => /* @__PURE__ */ t(c2, { path: a, primary: r === 0, onChoose: n }, a.kind)) });
}
const d2 = "_list_1m7i0_2", u2 = "_item_1m7i0_6", h2 = "_node_1m7i0_18", m2 = "_body_1m7i0_24", w2 = "_head_1m7i0_30", _2 = "_stage_1m7i0_36", f2 = "_version_1m7i0_41", v2 = "_sentence_1m7i0_49", b2 = "_meta_1m7i0_54", xe = {
  list: d2,
  item: u2,
  node: h2,
  body: m2,
  head: w2,
  stage: _2,
  version: f2,
  sentence: v2,
  meta: b2
}, p2 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function g2({ entry: e }) {
  return /* @__PURE__ */ i("span", { className: xe.head, children: [
    /* @__PURE__ */ t("span", { className: xe.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: xe.version, title: e.version, children: e.version }) : null
  ] });
}
function y2({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ i("li", { className: `${xe.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${xe.node} ward-history-node`, children: /* @__PURE__ */ t(Ke, { size: 9, kind: p2[e.state], label: e.state }) }),
    /* @__PURE__ */ i("span", { className: `${xe.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(g2, { entry: e }),
      /* @__PURE__ */ t("span", { className: xe.sentence, children: e.sentence }),
      /* @__PURE__ */ i("span", { className: `${xe.meta} ward-history-meta`, children: [
        `${me(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${oe(e.cost)}`
      ] })
    ] })
  ] });
}
function M3({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${xe.list} ward-history`, children: e.map((n, a) => /* @__PURE__ */ t(y2, { entry: n }, n.stage + String(a))) });
}
const N2 = "_thread_1e70p_3", k2 = "_turn_1e70p_8", $2 = "_who_1e70p_27", C2 = "_body_1e70p_32", Pn = {
  thread: N2,
  turn: k2,
  who: $2,
  body: C2
}, hl = ke(!1);
function E3({ children: e, density: n }) {
  return /* @__PURE__ */ t(hl.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${Pn.thread} ward-chat`, "aria-label": "Conversation", "data-density": n, children: e }) });
}
function B3({ turn: e }) {
  if (!Ne(hl)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ i("li", { className: `${Pn.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ i("span", { className: `${Pn.who} ward-chat-who`, children: [
      e.author,
      " · ",
      me(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${Pn.body} ward-chat-body`, children: e.body })
  ] });
}
const S2 = "_list_yiolt_3", R2 = "_row_yiolt_7", x2 = "_label_yiolt_20", T2 = "_n_yiolt_26", L2 = "_cause_yiolt_33", vn = {
  list: S2,
  row: R2,
  label: x2,
  n: T2,
  cause: L2
};
function A2(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const I2 = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function M2({ row: e, formatNumber: n }) {
  return A2(e), /* @__PURE__ */ i("li", { className: `${vn.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(Ke, { size: 8, ...I2[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: vn.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${vn.n} ward-stat-value`, children: n(e.n) }),
    /* @__PURE__ */ t(E2, { cause: e.cause })
  ] });
}
function E2({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${vn.cause} ward-healthrow-cause`, children: e }) : null;
}
function P3({ rows: e, formatNumber: n = te }) {
  return /* @__PURE__ */ t("ul", { className: `${vn.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(M2, { row: a, formatNumber: n }, a.label)) });
}
const B2 = "_root_1jxwp_2", P2 = {
  root: B2
};
function j3({ items: e, note: n, actionLabel: a = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ i("div", { className: P2.root, "data-density": l, children: [
    /* @__PURE__ */ t(nt, { items: e, note: n, density: l }),
    /* @__PURE__ */ t(v, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const j2 = "_row_dhbre_3", D2 = "_key_dhbre_13", H2 = "_stack_dhbre_24", q2 = "_value_dhbre_32", O2 = "_evidence_dhbre_39", F2 = "_mark_dhbre_47", en = {
  row: j2,
  key: D2,
  stack: H2,
  value: q2,
  evidence: O2,
  mark: F2
};
function z2({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(m, { role: "warn", label: "Check" }) : /* @__PURE__ */ t(Pt, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function D3({ field: e }) {
  return /* @__PURE__ */ i("li", { className: `${en.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${en.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ i("span", { className: `${en.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${en.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ i("span", { className: `${en.evidence} ward-resfield-evidence`, title: e.evidence, children: [
        "Source: ",
        e.evidence
      ] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${en.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(z2, { state: e.state }) })
  ] });
}
const W2 = "_cell_gh2sd_2", K2 = {
  cell: W2
}, G2 = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function U2(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function V2(e, n) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (n && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function J2(e, n) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: U2(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[n] ?? "—";
}
function Y2(e) {
  return e.map((n, a) => ({ ...n, id: n.id ?? String(a) }));
}
function H3({ rows: e, empty: n, requireNoRerunReason: a = !0 }) {
  V2(e, a);
  const r = Y2(e);
  return /* @__PURE__ */ t(
    Xm,
    {
      label: "Rejection rules",
      columns: G2,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, o) => /* @__PURE__ */ t("span", { className: K2.cell, "data-norerun": l.noRerun ? !0 : void 0, children: J2(l, o) }),
      empty: n ?? /* @__PURE__ */ t(z_, { sentence: "No rejection rules yet." })
    }
  );
}
const X2 = "_row_1f2re_2", Q2 = "_title_1f2re_12", Z2 = "_turns_1f2re_18", eR = "_waiting_1f2re_19", nR = "_resolved_1f2re_20", tR = "_activity_1f2re_21", aR = "_cost_1f2re_28", rR = "_link_1f2re_29", lR = "_tableLink_1f2re_47", oR = "_tableRecord_1f2re_48", iR = "_tableRow_1f2re_59", sR = "_tableTitle_1f2re_71", cR = "_tableResolved_1f2re_76", dR = "_tableMeta_1f2re_87", uR = "_tableCost_1f2re_94", hR = "_tableActivity_1f2re_95", mR = "_tableState_1f2re_105", O = {
  row: X2,
  title: Q2,
  turns: Z2,
  waiting: eR,
  resolved: nR,
  activity: tR,
  cost: aR,
  link: rR,
  tableLink: lR,
  tableRecord: oR,
  tableRow: iR,
  tableTitle: sR,
  tableResolved: cR,
  tableMeta: dR,
  tableCost: uR,
  tableActivity: hR,
  tableState: mR
}, ml = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function wR(e) {
  if (e === "") return "—";
  const n = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (n < 1) return "just now";
  if (n < 60) return `${n}m ago`;
  const a = Math.floor(n / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function _R(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function fR(e) {
  const n = e.join(", ");
  return n === "" ? "—" : n;
}
const vR = { duplicate: "Closed · duplicate" };
function bR({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(sn, { className: O.tableMeta, text: `waiting on ${e}` });
}
function pR({ value: e }) {
  return /* @__PURE__ */ t("td", { className: O.tableCost, children: e === void 0 ? null : oe(e) });
}
function gR({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${O.tableRecord} ward-target`, href: T(e.href), children: `→ ${e.key}` });
}
function yR({ session: e, href: n }) {
  const a = ml[e.state];
  return /* @__PURE__ */ i("tr", { className: O.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ i("td", { className: O.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${O.tableLink} ward-target`, href: T(n), children: /* @__PURE__ */ t(sn, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: O.tableMeta, children: _R(e) })
    ] }),
    /* @__PURE__ */ i("td", { className: O.tableResolved, children: [
      fR(e.resolved),
      /* @__PURE__ */ t(bR, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(pR, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: O.tableActivity, children: wR(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: O.tableState, children: /* @__PURE__ */ i("span", { children: [
      /* @__PURE__ */ t(m, { role: a.role, label: vR[e.state] ?? a.label }),
      /* @__PURE__ */ t(gR, { link: e.link })
    ] }) })
  ] });
}
function NR({ session: e }) {
  const n = ml[e.state];
  return /* @__PURE__ */ i("div", { className: O.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t(sn, { className: O.title, text: e.title }),
    /* @__PURE__ */ t("span", { className: O.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t(sn, { className: O.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: O.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: O.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : oe(e.cost) }),
    /* @__PURE__ */ t("span", { className: O.activity, children: me(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: O.link, href: T(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(m, { role: n.role, label: n.label })
  ] });
}
function q3(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(yR, { session: e.session, href: e.href }) : /* @__PURE__ */ t(NR, { session: e.session });
}
const kR = "_block_1yy2v_3", $R = "_list_1yy2v_9", CR = "_line_1yy2v_14", kt = {
  block: kR,
  list: $R,
  line: CR
}, SR = { warn: "warning", ok: "ok" };
function RR({ kind: e }) {
  const n = SR[e];
  return n === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function xR({ line: e }) {
  const n = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ i("li", { className: `${kt.line} ward-typed-line ward-typed-line--${n}`, "data-kind": n, children: [
    /* @__PURE__ */ t(RR, { kind: n }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function O3({ lines: e, label: n = "Agent input" }) {
  return /* @__PURE__ */ t("div", { className: `${kt.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: kt.list, "aria-label": n, children: e.map((a, r) => /* @__PURE__ */ t(xR, { line: a }, `${r}-${a.text}`)) }) });
}
const TR = "_band_tt7hp_1", LR = "_head_tt7hp_8", AR = "_cell_tt7hp_19", IR = "_index_tt7hp_35", MR = "_title_tt7hp_42", ER = "_note_tt7hp_48", BR = "_cellTitle_tt7hp_53", PR = "_cellBody_tt7hp_58", jR = "_tag_tt7hp_64", Ce = {
  band: TR,
  head: LR,
  cell: AR,
  index: IR,
  title: MR,
  note: ER,
  cellTitle: BR,
  cellBody: PR,
  tag: jR
}, Aa = 4;
function F3({ index: e, title: n, note: a, cells: r }) {
  if (r.length !== Aa)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Aa}-cell grid`);
  return /* @__PURE__ */ i("section", { className: Ce.band, "aria-label": `${e} ${n}`, children: [
    /* @__PURE__ */ i("div", { className: Ce.head, children: [
      /* @__PURE__ */ t("span", { className: Ce.index, children: e }),
      /* @__PURE__ */ t("span", { className: Ce.title, children: n }),
      /* @__PURE__ */ t("span", { className: Ce.note, children: a })
    ] }),
    r.map((l) => /* @__PURE__ */ i("div", { className: Ce.cell, children: [
      /* @__PURE__ */ t("span", { className: Ce.cellTitle, children: l.title }),
      /* @__PURE__ */ t("span", { className: Ce.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ t("span", { className: Ce.tag, children: l.tag })
    ] }, l.title))
  ] });
}
const DR = "_tag_1yuvz_2", HR = "_link_1yuvz_14", ht = {
  tag: DR,
  link: HR
};
function wl({ label: e, href: n }) {
  return n === void 0 ? /* @__PURE__ */ t("span", { className: ht.tag, children: e }) : /* @__PURE__ */ t("a", { className: `${ht.tag} ${ht.link}`, href: T(n), children: e });
}
const qR = "_eyebrow_m8swv_2", OR = "_link_m8swv_10", Ia = {
  eyebrow: qR,
  link: OR
};
function tt({ children: e, href: n }) {
  return /* @__PURE__ */ t("p", { className: Ia.eyebrow, children: n === void 0 ? e : /* @__PURE__ */ t("a", { className: `${Ia.link} ward-target`, href: T(n), children: e }) });
}
const FR = "_figure_qz9i7_2", zR = "_media_qz9i7_9", WR = "_caption_qz9i7_35", mt = {
  figure: FR,
  media: zR,
  caption: WR
};
function KR(e) {
  return e.src === void 0 ? /* @__PURE__ */ t(x, { children: e.children }) : /* @__PURE__ */ t("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function $t(e) {
  return /* @__PURE__ */ i("figure", { className: mt.figure, children: [
    /* @__PURE__ */ t("div", { className: mt.media, "data-ratio": e.ratio, children: /* @__PURE__ */ t(KR, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ t("figcaption", { className: mt.caption, children: e.caption })
  ] });
}
function kn(e) {
  return `h${e}`;
}
function GR(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const UR = "_prose_1fxb9_2", VR = "_anchor_1fxb9_79", _l = {
  prose: UR,
  anchor: VR
};
function Ct({ children: e }) {
  return /* @__PURE__ */ t("div", { className: _l.prose, children: e });
}
function z3({ level: e, children: n, id: a }) {
  const r = kn(e), l = a ?? GR(n);
  return /* @__PURE__ */ i(r, { id: l, children: [
    n,
    " ",
    /* @__PURE__ */ t("a", { className: `${_l.anchor} ward-target`, href: `#${l}`, "aria-label": `Link to section: ${n}`, children: "#" })
  ] });
}
const JR = "_list_176jq_2", YR = "_pair_176jq_8", XR = "_term_176jq_14", QR = "_value_176jq_19", Rn = {
  list: JR,
  pair: YR,
  term: XR,
  value: QR
};
function ZR({ facts: e }) {
  return /* @__PURE__ */ t("dl", { className: Rn.list, children: e.map((n) => /* @__PURE__ */ i("div", { className: Rn.pair, children: [
    /* @__PURE__ */ t("dt", { className: Rn.term, children: n.term }),
    /* @__PURE__ */ t("dd", { className: Rn.value, children: n.value })
  ] }, n.term)) });
}
const ex = "_nav_sgeyg_2", nx = "_item_sgeyg_6", tx = "_link_sgeyg_13", ax = "_note_sgeyg_30", xn = {
  nav: ex,
  item: nx,
  link: tx,
  note: ax
};
function rx({ label: e, links: n }) {
  return /* @__PURE__ */ t("nav", { "aria-label": e, className: xn.nav, children: /* @__PURE__ */ t(ew, { children: n.map((a) => /* @__PURE__ */ i("li", { className: xn.item, children: [
    /* @__PURE__ */ t("a", { className: `${xn.link} ward-target`, href: T(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ t("span", { className: xn.note, children: a.note })
  ] }, a.href)) }) });
}
const lx = "_header_kelio_2", ox = "_skip_kelio_14", ix = "_brand_kelio_39", sx = "_list_kelio_46", cx = "_link_kelio_56", nn = {
  header: lx,
  skip: ox,
  brand: ix,
  list: sx,
  link: cx
};
function W3({ brand: e, links: n, current: a, homeHref: r = "/", mainId: l = "main", skipLabel: o = "Skip to content" }) {
  return /* @__PURE__ */ i("header", { className: nn.header, children: [
    /* @__PURE__ */ t("a", { className: nn.skip, href: `#${l}`, children: o }),
    /* @__PURE__ */ t("a", { className: `${nn.brand} ward-target`, href: T(r), children: e }),
    /* @__PURE__ */ t("nav", { "aria-label": "Main", className: nn.nav, children: /* @__PURE__ */ t("ul", { className: nn.list, role: "list", children: n.map((s) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { className: `${nn.link} ward-target`, href: T(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const dx = "_footer_1jb5e_2", ux = "_note_1jb5e_12", hx = "_list_1jb5e_18", mx = "_link_1jb5e_27", Tn = {
  footer: dx,
  note: ux,
  list: hx,
  link: mx
};
function K3({ note: e, links: n = [], label: a = "Footer" }) {
  return /* @__PURE__ */ i("footer", { className: Tn.footer, children: [
    /* @__PURE__ */ t("p", { className: Tn.note, children: e }),
    n.length === 0 ? null : /* @__PURE__ */ t("nav", { "aria-label": a, children: /* @__PURE__ */ t("ul", { className: Tn.list, role: "list", children: n.map((r) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { className: `${Tn.link} ward-target`, href: T(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const wx = "_intro_13128_2", _x = "_title_13128_9", fx = "_lead_13128_17", wt = {
  intro: wx,
  title: _x,
  lead: fx
};
function Kt({ title: e, eyebrow: n, eyebrowHref: a, lead: r, headingLevel: l = 1, children: o }) {
  const s = kn(l);
  return /* @__PURE__ */ i("header", { className: wt.intro, children: [
    n === void 0 ? null : /* @__PURE__ */ t(tt, { href: a, children: n }),
    /* @__PURE__ */ t(s, { className: wt.title, children: e }),
    r === void 0 ? null : /* @__PURE__ */ t("p", { className: wt.lead, children: r }),
    o
  ] });
}
const vx = "_section_u0k7p_2", bx = "_head_u0k7p_13", px = "_titles_u0k7p_21", gx = "_title_u0k7p_21", yx = "_link_u0k7p_34", _n = {
  section: vx,
  head: bx,
  titles: px,
  title: gx,
  link: yx
};
function Nx({ title: e, headingId: n, eyebrow: a, link: r, headingLevel: l }) {
  const o = kn(l);
  return /* @__PURE__ */ i("div", { className: _n.head, children: [
    /* @__PURE__ */ i("div", { className: _n.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ t(tt, { children: a }),
      /* @__PURE__ */ t(o, { className: _n.title, id: n, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ t("a", { className: `${_n.link} ward-target`, href: T(r.href), children: r.label })
  ] });
}
function G3({ title: e, children: n, id: a, eyebrow: r, link: l, headingLevel: o = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ i("section", { className: _n.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ t(Nx, { title: e, headingId: d, eyebrow: r, link: l, headingLevel: o }),
    n
  ] });
}
const kx = "_split_1ycaa_2", $x = "_main_1ycaa_10", Cx = "_aside_1ycaa_15", _t = {
  split: kx,
  main: $x,
  aside: Cx
};
function Sx({ children: e, aside: n, asideLabel: a }) {
  return /* @__PURE__ */ i("div", { className: _t.split, children: [
    /* @__PURE__ */ t("div", { className: _t.main, children: e }),
    /* @__PURE__ */ t("aside", { className: _t.aside, "aria-label": a, children: n })
  ] });
}
const Rx = "_hero_ehbct_2", xx = "_text_ehbct_11", Tx = "_visual_ehbct_23", Lx = "_title_ehbct_28", Ax = "_lead_ehbct_36", Ix = "_actions_ehbct_42", Mx = "_action_ehbct_42", Ex = "_primary_ehbct_63", Bx = "_secondary_ehbct_72", Ie = {
  hero: Rx,
  text: xx,
  visual: Tx,
  title: Lx,
  lead: Ax,
  actions: Ix,
  action: Mx,
  primary: Ex,
  secondary: Bx
};
function Px({ actions: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ t("div", { className: Ie.actions, children: e.map((n, a) => /* @__PURE__ */ t("a", { className: `${Ie.action} ${a === 0 ? Ie.primary : Ie.secondary}`, href: T(n.href), children: n.label }, `${n.href}-${n.label}`)) });
}
function jx({ title: e, eyebrow: n, lead: a, actions: r = [] }) {
  return /* @__PURE__ */ i("div", { className: Ie.text, children: [
    n === void 0 ? null : /* @__PURE__ */ t(tt, { children: n }),
    /* @__PURE__ */ t("h1", { className: Ie.title, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("p", { className: Ie.lead, children: a }),
    /* @__PURE__ */ t(Px, { actions: r })
  ] });
}
function U3({ visual: e, ...n }) {
  return /* @__PURE__ */ i("div", { className: Ie.hero, "data-visual": e === void 0 ? "none" : "beside", children: [
    /* @__PURE__ */ t(jx, { ...n }),
    e === void 0 ? null : /* @__PURE__ */ t("div", { className: Ie.visual, children: e })
  ] });
}
const Dx = "_chain_w2k2l_2", Hx = "_step_w2k2l_12", qx = "_arrow_w2k2l_19", Ox = "_box_w2k2l_24", Ln = {
  chain: Dx,
  step: Hx,
  arrow: qx,
  box: Ox
};
function V3({ steps: e, label: n, animate: a }) {
  return /* @__PURE__ */ t("ol", { className: Ln.chain, "aria-label": n, "data-ward-animate": a ?? "", children: e.map((r, l) => /* @__PURE__ */ i("li", { className: Ln.step, style: { "--ward-step": l }, children: [
    l === 0 ? null : /* @__PURE__ */ t("span", { className: Ln.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ t("span", { className: Ln.box, children: r })
  ] }, l)) });
}
const Fx = "_card_1u2gr_2", zx = "_featured_1u2gr_20", Wx = "_media_1u2gr_28", Kx = "_body_1u2gr_32", Gx = "_title_1u2gr_48", Ux = "_link_1u2gr_60", Vx = "_summary_1u2gr_78", Jx = "_tags_1u2gr_84", Yx = "_cta_1u2gr_90", fe = {
  card: Fx,
  featured: zx,
  media: Wx,
  body: Kx,
  title: Gx,
  link: Ux,
  summary: Vx,
  tags: Jx,
  cta: Yx
};
function fl({ media: e, ratio: n = "16/9" }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: fe.media, children: /* @__PURE__ */ t($t, { ratio: n, children: e }) });
}
function Xx({ href: e, title: n, headingLevel: a = 3 }) {
  const r = kn(a);
  return /* @__PURE__ */ t(r, { className: fe.title, children: /* @__PURE__ */ t("a", { className: fe.link, href: T(e), children: n }) });
}
function vl({ eyebrow: e, ...n }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ t(tt, { children: e }),
    /* @__PURE__ */ t(Xx, { ...n })
  ] });
}
function bl({ summary: e, tags: n = [] }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ t("p", { className: fe.summary, children: e }),
    n.length === 0 ? null : /* @__PURE__ */ t("span", { className: fe.tags, children: n.map((a) => /* @__PURE__ */ t(wl, { label: a }, a)) })
  ] });
}
function J3({ media: e, ratio: n, eyebrow: a, summary: r, tags: l, ...o }) {
  return /* @__PURE__ */ i("article", { className: fe.card, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ t(fl, { media: e, ratio: n }),
    /* @__PURE__ */ i("div", { className: fe.body, children: [
      /* @__PURE__ */ t(vl, { eyebrow: a, ...o }),
      /* @__PURE__ */ t(bl, { summary: r, tags: l })
    ] })
  ] });
}
function Y3({ media: e, ratio: n, eyebrow: a, summary: r, tags: l, cta: o, ...s }) {
  return /* @__PURE__ */ i("article", { className: `${fe.card} ${fe.featured}`, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ t(fl, { media: e, ratio: n }),
    /* @__PURE__ */ i("div", { className: fe.body, children: [
      /* @__PURE__ */ t(vl, { eyebrow: a, ...s }),
      /* @__PURE__ */ t(bl, { summary: r, tags: l }),
      o === void 0 ? null : /* @__PURE__ */ i("span", { className: fe.cta, "aria-hidden": "true", children: [
        o,
        " →"
      ] })
    ] })
  ] });
}
const Qx = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function pl(e) {
  const n = new Date(e);
  return Number.isNaN(n.getTime()) ? e : `${n.getUTCDate()} ${Qx[n.getUTCMonth()]} ${n.getUTCFullYear()}`;
}
const Zx = "_row_1peme_2", eT = "_title_1peme_15", nT = "_link_1peme_23", tT = "_meta_1peme_40", aT = "_summary_1peme_46", mn = {
  row: Zx,
  title: eT,
  link: nT,
  meta: tT,
  summary: aT
};
function X3({ href: e, title: n, date: a, meta: r, summary: l, headingLevel: o = 3 }) {
  const s = kn(o);
  return /* @__PURE__ */ i("article", { className: mn.row, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ t(s, { className: mn.title, children: /* @__PURE__ */ t("a", { className: mn.link, href: T(e), children: n }) }),
    /* @__PURE__ */ i("p", { className: mn.meta, children: [
      /* @__PURE__ */ t("time", { dateTime: a, children: pl(a) }),
      r === void 0 ? null : ` · ${r}`
    ] }),
    l === void 0 ? null : /* @__PURE__ */ t("p", { className: mn.summary, children: l })
  ] });
}
const rT = "_list_dd8kj_2", lT = "_item_dd8kj_16", Ma = {
  list: rT,
  item: lT
};
function Q3({ children: e, rules: n = !1, label: a }) {
  return /* @__PURE__ */ t("ul", { className: Ma.list, role: "list", "aria-label": a, "data-rules": n, children: Da.toArray(e).map((r, l) => /* @__PURE__ */ t("li", { className: Ma.item, children: r }, l)) });
}
const oT = "_page_i3r2z_2", iT = "_aside_i3r2z_8", sT = "_tags_i3r2z_13", Gt = {
  page: oT,
  aside: iT,
  tags: sT
};
function cT({ labels: e }) {
  return /* @__PURE__ */ t("span", { className: Gt.tags, children: e.map((n) => /* @__PURE__ */ t(wl, { label: n }, n)) });
}
function dT(e) {
  return e[1] !== void 0 && e[1].length > 0;
}
function uT(e) {
  return e.filter(dT).map(([n, a]) => ({
    term: n,
    value: typeof a == "string" ? a : /* @__PURE__ */ t(cT, { labels: a })
  }));
}
function hT({ facts: e, links: n, linksLabel: a }) {
  return /* @__PURE__ */ i("div", { className: Gt.aside, children: [
    e.length === 0 ? null : /* @__PURE__ */ t(ZR, { facts: e }),
    n === void 0 || n.length === 0 ? null : /* @__PURE__ */ t(rx, { label: a, links: n })
  ] });
}
function gl({ facts: e, links: n = [], linksLabel: a, asideLabel: r, children: l }) {
  return e.length === 0 && n.length === 0 ? /* @__PURE__ */ t(Ct, { children: l }) : /* @__PURE__ */ t(Sx, { asideLabel: r, aside: /* @__PURE__ */ t(hT, { facts: e, links: n, linksLabel: a }), children: /* @__PURE__ */ t(Ct, { children: l }) });
}
function Z3({ title: e, summary: n, children: a, eyebrow: r, eyebrowHref: l, role: o, period: s, focus: c, stack: d, related: u }) {
  const h = uT([
    ["Role", o],
    ["Period", s],
    ["Focus", c],
    ["Stack", d]
  ]);
  return /* @__PURE__ */ i("article", { className: Gt.page, children: [
    /* @__PURE__ */ t(Kt, { title: e, lead: n, eyebrow: r, eyebrowHref: l }),
    /* @__PURE__ */ t(gl, { facts: h, links: u, linksLabel: "Related", asideLabel: "Case study facts", children: a })
  ] });
}
const mT = "_page_1junb_2", wT = "_source_1junb_8", _T = "_shots_1junb_30", St = {
  page: mT,
  source: wT,
  shots: _T
};
function fT({ shots: e, ratio: n }) {
  return e.length === 0 ? null : e.length === 1 ? /* @__PURE__ */ t($t, { ...e[0], ratio: n }) : /* @__PURE__ */ t("ul", { className: St.shots, role: "list", "aria-label": "Screenshots", children: e.map((a, r) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t($t, { ...a, ratio: n }) }, r)) });
}
function eA(e) {
  const { title: n, summary: a, children: r, source: l, facts: o = [], screenshots: s = [], ratio: c = "16/9" } = e;
  return /* @__PURE__ */ i("article", { className: St.page, children: [
    /* @__PURE__ */ t(Kt, { title: n, lead: a, eyebrow: e.eyebrow, eyebrowHref: e.eyebrowHref, children: /* @__PURE__ */ t("a", { className: St.source, href: T(l.href), children: l.label }) }),
    /* @__PURE__ */ t(fT, { shots: s, ratio: c }),
    /* @__PURE__ */ t(gl, { facts: o, linksLabel: "Links", asideLabel: "Project facts", children: r })
  ] });
}
function vT(e) {
  const n = [], a = [];
  for (const r of e) {
    const l = { ...r, children: [] };
    for (; a.length > 0 && a[a.length - 1].level >= r.level; ) a.pop();
    const o = a[a.length - 1];
    (o === void 0 ? n : o.children).push(l), a.push(l);
  }
  return n;
}
const bT = "_article_drsu4_2", pT = "_meta_drsu4_8", gT = "_tldr_drsu4_14", yT = "_tldrLabel_drsu4_21", NT = "_tldrText_drsu4_27", kT = "_toc_drsu4_40", $T = "_tocTitle_drsu4_44", CT = "_tocList_drsu4_50", ST = "_tocLink_drsu4_65", Me = {
  article: bT,
  meta: pT,
  tldr: gT,
  tldrLabel: yT,
  tldrText: NT,
  toc: kT,
  tocTitle: $T,
  tocList: CT,
  tocLink: ST
};
function RT({ date: e, minutes: n }) {
  return /* @__PURE__ */ i("p", { className: Me.meta, children: [
    /* @__PURE__ */ t("time", { dateTime: e, children: pl(e) }),
    n === void 0 ? null : ` · ${n} min read`
  ] });
}
function xT({ children: e }) {
  return /* @__PURE__ */ i("div", { className: Me.tldr, role: "note", "aria-label": "TL;DR", children: [
    /* @__PURE__ */ t("p", { className: Me.tldrLabel, children: "TL;DR" }),
    /* @__PURE__ */ t("div", { className: Me.tldrText, children: e })
  ] });
}
function yl({ nodes: e }) {
  return /* @__PURE__ */ t("ol", { className: Me.tocList, role: "list", children: e.map((n) => /* @__PURE__ */ i("li", { children: [
    /* @__PURE__ */ t("a", { className: `${Me.tocLink} ward-target`, href: `#${n.id}`, children: n.text }),
    n.children.length === 0 ? null : /* @__PURE__ */ t(yl, { nodes: n.children })
  ] }, n.id)) });
}
function TT({ headings: e }) {
  const n = y();
  return e.length === 0 ? null : /* @__PURE__ */ i("nav", { className: Me.toc, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h2", { className: Me.tocTitle, id: n, children: "On this page" }),
    /* @__PURE__ */ t(yl, { nodes: vT(e) })
  ] });
}
function nA({ title: e, date: n, children: a, minutes: r, tldr: l, headings: o = [], eyebrow: s, eyebrowHref: c }) {
  return /* @__PURE__ */ i("article", { className: Me.article, children: [
    /* @__PURE__ */ t(Kt, { title: e, eyebrow: s, eyebrowHref: c, children: /* @__PURE__ */ t(RT, { date: n, minutes: r }) }),
    l === void 0 ? null : /* @__PURE__ */ t(xT, { children: l }),
    /* @__PURE__ */ t(TT, { headings: o }),
    /* @__PURE__ */ t(Ct, { children: a })
  ] });
}
const LT = 220;
function AT(e) {
  return e.replace(/<[^>]*>/g, " ").split(/\s+/).filter((a) => /[\p{L}\p{N}]/u.test(a)).length;
}
function tA(e) {
  return Math.max(1, Math.ceil(AT(e) / LT));
}
const Gn = { w: 184, h: 96 }, cn = { w: 152, h: 48 }, Un = 16, An = (e) => Math.round(e * 10) / 10;
function Nl(e) {
  return { x: Un + e.col * Gn.w, y: Un + e.row * Gn.h, w: cn.w, h: cn.h };
}
function IT(e) {
  const n = Math.max(0, ...e.map((r) => r.col)), a = Math.max(0, ...e.map((r) => r.row));
  return { w: 2 * Un + n * Gn.w + cn.w, h: 2 * Un + a * Gn.h + cn.h };
}
function Ea(e, n, a) {
  return Math.min(e.w / 2 / Math.abs(n), e.h / 2 / Math.abs(a));
}
function MT(e, n) {
  const a = e.x + e.w / 2, r = e.y + e.h / 2, l = n.x + n.w / 2 - a, o = n.y + n.h / 2 - r, s = Ea(e, l, o), c = 1 - Ea(n, l, o);
  return { x1: An(a + l * s), y1: An(r + o * s), x2: An(a + l * c), y2: An(r + o * c) };
}
function ET() {
  const [e, n] = b(!1);
  return S(() => {
    var l;
    const a = (l = window.matchMedia) == null ? void 0 : l.call(window, "(prefers-reduced-motion: no-preference)");
    if (!a) return;
    const r = (o) => n(o.matches);
    return n(a.matches), a.addEventListener("change", r), () => a.removeEventListener("change", r);
  }, []), e;
}
const BT = "_diagram_76e4t_2", PT = "_label_76e4t_9", jT = "_svg_76e4t_14", DT = "_node_76e4t_20", HT = "_edge_76e4t_33", qT = "_arrow_76e4t_38", OT = "_controls_76e4t_63", FT = "_live_76e4t_70", zT = "_steps_76e4t_77", Te = {
  diagram: BT,
  label: PT,
  svg: jT,
  node: DT,
  edge: HT,
  arrow: qT,
  controls: OT,
  live: FT,
  steps: zT
};
function WT({ nodes: e, edges: n, lit: a, marker: r }) {
  const l = new Map(e.map((o) => [o.id, Nl(o)]));
  return n.map((o) => {
    const s = l.get(o.from), c = l.get(o.to);
    if (s === void 0 || c === void 0) return null;
    const d = a(o.from) && a(o.to);
    return /* @__PURE__ */ t("line", { className: Te.edge, "data-active": d, ...MT(s, c), markerEnd: `url(#${r})` }, `${o.from}>${o.to}`);
  });
}
function KT({ nodes: e, lit: n }) {
  return e.map((a) => {
    const r = Nl(a);
    return /* @__PURE__ */ i("g", { className: Te.node, "data-active": n(a.id), "data-node": a.id, children: [
      /* @__PURE__ */ t("rect", { x: r.x, y: r.y, width: r.w, height: r.h, rx: "8" }),
      /* @__PURE__ */ t("text", { x: r.x + cn.w / 2, y: r.y + cn.h / 2, children: a.label })
    ] }, a.id);
  });
}
function Ba({ label: e, to: n, count: a, go: r, status: l }) {
  return n < 0 || n >= a ? /* @__PURE__ */ t(v, { size: "sm", disabled: !0, describedBy: l, children: e }) : /* @__PURE__ */ t(v, { size: "sm", onClick: () => r(n), children: e });
}
function GT({ at: e, count: n, text: a, go: r }) {
  const l = y();
  return /* @__PURE__ */ i("div", { className: Te.controls, children: [
    /* @__PURE__ */ t(Ba, { label: "Back", to: e - 1, count: n, go: r, status: l }),
    /* @__PURE__ */ t(Ba, { label: "Next", to: e + 1, count: n, go: r, status: l }),
    /* @__PURE__ */ t("p", { className: Te.live, id: l, "aria-live": "polite", children: `Step ${e + 1} of ${n}: ${a}` })
  ] });
}
function aA({ label: e, nodes: n, edges: a, steps: r }) {
  const l = ET() && r.length > 0, [o, s] = b(0), c = y(), d = (h) => l && r[o].nodes.includes(h), u = IT(n);
  return /* @__PURE__ */ i("figure", { className: Te.diagram, "data-live": l, "aria-labelledby": c, children: [
    /* @__PURE__ */ t("figcaption", { className: Te.label, id: c, children: e }),
    /* @__PURE__ */ i("svg", { className: Te.svg, viewBox: `0 0 ${u.w} ${u.h}`, width: u.w, height: u.h, "aria-hidden": "true", children: [
      /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ t("marker", { id: `${c}-arrow`, viewBox: "0 0 8 8", refX: "7", refY: "4", markerWidth: "8", markerHeight: "8", markerUnits: "userSpaceOnUse", orient: "auto-start-reverse", children: /* @__PURE__ */ t("path", { className: Te.arrow, d: "M0 0 L8 4 L0 8 z" }) }) }),
      /* @__PURE__ */ t(WT, { nodes: n, edges: a, lit: d, marker: `${c}-arrow` }),
      /* @__PURE__ */ t(KT, { nodes: n, lit: d })
    ] }),
    l ? /* @__PURE__ */ t(GT, { at: o, count: r.length, text: r[o].text, go: s }) : null,
    /* @__PURE__ */ t("ol", { className: Te.steps, children: r.map((h, w) => /* @__PURE__ */ t("li", { "aria-current": l && w === o ? "step" : void 0, children: h.text }, w)) })
  ] });
}
export {
  aL as ACCENT_PRESETS,
  SL as ActionStack,
  S3 as ActivityConsole,
  uL as AdminIcon,
  lp as AgentCard,
  aA as AnimatedDiagram,
  mL as AppShell,
  d3 as AppearanceStrip,
  nA as Article,
  F3 as Band,
  $L as BarChart,
  Cf as BoardColumn,
  zL as BoardFootnote,
  WL as BoardHeader,
  cL as BoardIcon,
  EL as BoardScroller,
  v as Btn,
  tL as CHIP_ROLES,
  Qr as CREDENTIAL_COLUMNS,
  kL as Callout,
  u3 as CapabilityRow,
  PL as CardGrid,
  Z3 as CaseStudy,
  B3 as ChatMessage,
  Xa as Checkbox,
  m as Chip,
  sn as ClampText,
  R3 as ClarificationRow,
  e3 as ClauseRuleRow,
  ZL as ClauseRules,
  Ar as ColourLadder,
  h3 as ComponentRow,
  x3 as Composer,
  GL as ConfigRow,
  KL as ConfigRowHead,
  jt as ConnectionMark,
  C3 as ConsoleAnnounceProvider,
  E3 as Conversation,
  jm as CostMeter,
  w3 as CredentialRow,
  m3 as CredentialRowHead,
  T3 as CriteriaList,
  ic as Crumb,
  rL as DENSITIES,
  P3 as DeliveryHealth,
  DL as DeniedState,
  iL as DisabledScope,
  t3 as DryRunRail,
  z_ as EmptyState,
  _3 as EnvCard,
  tt as Eyebrow,
  ZR as FactList,
  Y3 as FeaturedCard,
  j as Field,
  $t as Figure,
  jL as FilteredEmpty,
  V3 as FlowChain,
  wL as FoldText,
  IL as FormStack,
  nt as GateChecklist,
  L3 as GateLadder,
  Xm as Grid,
  r3 as HandoffRuleRow,
  a3 as HandoffRules,
  U3 as Hero,
  sL as HomeIcon,
  UL as ItemDrawer,
  f3 as KeyPanel,
  Fl as LIVE_EVENT_TYPES,
  Rb as LegacyBoardColumn,
  JL as LegacyBoardHeader,
  YL as LegacyConfigRow,
  QL as LegacyItemDrawer,
  gb as LegacyOverCapNote,
  XL as LegacyPreviewRail,
  xr as LegacyWorkCard,
  rx as LinkList,
  Ee as LiveIndicator,
  HL as LoadFailed,
  FL as Loading,
  rl as MCP_SERVER_COLUMNS,
  Pt as Mark,
  b3 as MarkUpload,
  Ke as Marker,
  g3 as McpServerRow,
  p3 as McpServerRowHead,
  ur as Menu,
  sr as MenuButton,
  l3 as NewStreamModal,
  U_ as OverCapNote,
  At as OverflowRow,
  un as Overlay,
  _L as OwedCard,
  n3 as PARTIAL_STEP_REASON,
  ll as POLICY_CHIP_WIDTH,
  TL as PageFrame,
  NL as PageHeader,
  Kt as PageIntro,
  ew as PlainList,
  y3 as PolicyRow,
  X3 as PostRow,
  VL as PreviewRail,
  J3 as ProjectCard,
  eA as ProjectPage,
  Ct as Prose,
  z3 as ProseHeading,
  ct as ROLE_MATRIX_COLUMNS,
  Wr as RULE_ACTIONS,
  gr as Radio,
  j3 as ReadyChecklist,
  AL as RecordSection,
  A3 as RequeueSheet,
  I3 as ResolveBlock,
  D3 as ResolvedFieldRow,
  N3 as RoleMatrixRow,
  H3 as RoutingTable,
  o3 as RuleRow,
  k3 as RunbookSteps,
  Ol as STREAM_STEPS,
  G3 as Section,
  ML as SectionBand,
  ha as SectionHeader,
  br as SegmentedControl,
  lr as Select,
  q3 as SessionRow,
  pL as Sidebar,
  hL as SidebarFoldButton,
  K3 as SiteFooter,
  W3 as SiteHeader,
  Sx as SplitLayout,
  i3 as StageColumn,
  BL as StageGrid,
  M3 as StageHistory,
  By as StageListEditor,
  fL as StageSteps,
  qL as StaleStrip,
  Qn as StatStrip,
  RL as StatTiles,
  yL as StreamAvatar,
  s3 as StreamRow,
  dL as StudioIcon,
  LL as SubjectRail,
  Xe as Switch,
  bL as TabLinks,
  CL as TableHead,
  vL as Tabs,
  wl as Tag,
  Q3 as TextList,
  QT as ThemeProvider,
  c3 as ToolRow,
  xL as TopBar,
  a_ as Tree,
  Cr as TreeRow,
  O3 as TypedInputBlock,
  Ii as UNSAFE_HREF,
  $3 as ValidationList,
  YT as VisibilityProvider,
  XT as Visible,
  nL as WARD_VERSION,
  et as WorkCard,
  OL as WriteUnavailableStrip,
  wR as agoSince,
  xl as clock,
  Na as colourStatus,
  te as count,
  ce as duration,
  Rt as elapsed,
  eL as eventSourceTransport,
  pl as formatDate,
  kn as headingTag,
  Jn as isStreamStep,
  gn as isValidatedStreamStep,
  Ep as ladderValidation,
  v0 as mcpConnectionChip,
  _0 as mcpToolName,
  oe as money,
  pe as ms,
  Sr as ordered,
  qa as ratio,
  tA as readTime,
  jk as restartLabel,
  T as safeHref,
  GR as slug,
  me as stamp,
  xt as stream,
  lL as streamChip,
  It as streamChipProps,
  ye as streamColour,
  Kl as streamHex,
  Hn as streamInitials,
  zl as streamVars,
  gL as uniqueStreamInitials,
  nr as useAnchoredPanel,
  In as useBorderFlash,
  Be as useDisabledScope,
  Dl as useFocusTrap,
  oL as useLiveFeed,
  ZT as useReturnFocus,
  Vn as useRovingTabindex,
  Tt as useTicker,
  Tl as useVisible,
  B as v,
  v3 as validateMark,
  Xn as validatedStep,
  Fa as validatedStreamSteps,
  AT as wordCount
};
