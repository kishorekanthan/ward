import { jsx as t, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as Xt, useContext as Te, createContext as xe, useState as p, useEffect as C, useCallback as Q, useRef as _, useLayoutEffect as aa, useId as N, isValidElement as Nr, Children as kr, Fragment as $r } from "react";
import { createPortal as Cr, flushSync as Qt } from "react-dom";
function ce(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const n = Math.floor(e / 36e5);
  return n < 24 ? `${n}h ${a % 60}m` : `${Math.floor(n / 24)}d ${n % 24}h`;
}
const _t = (e) => String(e).padStart(2, "0");
function at(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const n = Math.floor(a / 60);
  return n < 60 ? `${n}m ${_t(a % 60)}s` : `${Math.floor(n / 60)}h ${_t(n % 60)}m`;
}
const Sr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = Sr.formatToParts(new Date(e)), n = (r) => {
    var l;
    return ((l = a.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${n("day")} ${n("month")} ${n("hour")}:${n("minute")}`;
}
function re(e) {
  return e > 0 && e < 5e-3 ? "<$0.01" : e < 10 ? e.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : `$${Math.round(e).toLocaleString("en-US")}`;
}
function ee(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function Zt(e, a) {
  return `${e} / ${a}`;
}
const Rr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Tr(e) {
  return Rr.format(new Date(e));
}
const en = xe(/* @__PURE__ */ new Set());
function QS({ hidden: e, children: a }) {
  const n = Xt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(en.Provider, { value: n, children: a });
}
function xr(e) {
  return !Te(en).has(e);
}
function ZS({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(T, { children: xr(e) ? a : n });
}
const Lr = "(prefers-color-scheme: dark)";
function vt() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Lr) : null;
}
function Ar(e) {
  const [a, n] = p(() => {
    var r;
    return ((r = vt()) == null ? void 0 : r.matches) === !0;
  });
  return C(() => {
    const r = e ? vt() : null;
    if (!r) return;
    const l = () => n(r.matches);
    return l(), r.addEventListener("change", l), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function Da(e, a) {
  C(() => {
    const n = document.documentElement;
    return n.setAttribute(e, a), () => n.removeAttribute(e);
  }, [e, a]);
}
function Er(e, a) {
  return e !== "system" ? e : a ? "dark" : "light";
}
function eR({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
  const l = Ar(e === "system");
  return Da("data-theme", Er(e, l)), Da("data-accent", a), Da("data-density", n), /* @__PURE__ */ t(T, { children: r });
}
const Ir = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Mr(e, a) {
  return document.activeElement === a || document.activeElement === e;
}
function Br(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function Pr(e, a, n, r) {
  return e.shiftKey ? Mr(a, n) ? r : void 0 : document.activeElement === r || Br(a) ? n : void 0;
}
function qr(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Pr(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Or(e) {
  return { onKeyDown: Q(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Ir));
      qr(n, e.current, r);
    },
    [e]
  ) };
}
function aR(e, a = !0) {
  C(() => {
    if (!a) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const bt = { ArrowUp: -1, ArrowDown: 1 }, pt = { ArrowLeft: -1, ArrowRight: 1 }, jr = (e, a, n) => Math.min(n, Math.max(a, e));
function Dr(e, a) {
  if (a !== "horizontal" && e in bt) return bt[e];
  if (a !== "vertical" && e in pt) return pt[e];
}
function Aa({ orientation: e = "both" } = {}) {
  const [a, n] = p(0), r = _(/* @__PURE__ */ new Map()), l = _(!1);
  aa(() => {
    var f;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(a)) return;
    const m = u[0], w = l.current;
    l.current = !1, n(m), w && ((f = r.current.get(m)) == null || f.focus());
  });
  const i = Q((u) => n(u), []), s = Q((u) => {
    var m;
    n(u), (m = r.current.get(u)) == null || m.focus();
  }, []), c = Q(
    (u) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const w = Math.max(0, m.indexOf(a)), f = Dr(u.key, e);
      f !== void 0 ? (u.preventDefault(), s(m[jr(w + f, 0, m.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(m[0])) : u.key === "End" && (u.preventDefault(), s(m[m.length - 1]));
    },
    [a, s, e]
  ), d = Q(
    (u) => ({
      tabIndex: u === a ? 0 : -1,
      ref: (m) => {
        m ? r.current.set(u, m) : (r.current.delete(u), u === a && (l.current = !0));
      },
      onFocus: () => n(u),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: i };
}
const tR = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, nR = "0.2.0", rR = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Hr = [1, 2, 3, 4, 5, 6], an = [1, 2, 3], Fr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], lR = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], oR = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], W = {
  color: {
    bg: "var(--ward-color-bg)",
    surface: "var(--ward-color-surface)",
    surface2: "var(--ward-color-surface2)",
    line: "var(--ward-color-line)",
    line2: "var(--ward-color-line2)",
    edge: "var(--ward-color-edge)",
    panelEdge: "var(--ward-color-panelEdge)",
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
}, fe = {
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
function tt(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Ea(e) {
  return Hr.includes(e);
}
function ca(e) {
  return an.includes(e);
}
function zr(e) {
  if (!Ea(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function iR(e) {
  if (!Ea(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Wr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Kr(e) {
  if (!Ea(e)) throw new Error("unvalidated stream step");
  return Wr[e];
}
function gt(e) {
  return typeof e != "string" ? null : Fr.includes(e) ? e : null;
}
function Gr(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Ur(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Vr(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Yr(e, a, n) {
  const r = Gr(e);
  if (r === null) return null;
  const l = gt(n) ?? gt(r.type);
  return l === null ? null : { ...r, type: l, id: Ur(r, a), at: Vr(r) };
}
function Jr(e, a) {
  return e >= fe.staleAfter ? "stale" : e >= fe.heartbeat && a === "live" ? "reconnecting" : null;
}
function Xr(e, a, n) {
  return e >= fe.heartbeat && !a && n !== null;
}
function sR(e, a) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = _(/* @__PURE__ */ new Map()), c = _(0), d = _(""), u = _(0), m = _(null), w = _(0), f = _(0), y = _(!1), E = _("reconnecting"), P = Q((R) => {
    E.current = R, r(R);
  }, []), ae = Q(() => {
    c.current = Date.now();
  }, []), ge = Q((R) => {
    for (const [U, ye] of s.current)
      (ye === "*" || R.itemKey === ye) && U(R);
  }, []), te = Q(() => {
    m.current = a(e, { lastEventId: d.current }, {
      onEvent: (R, U, ye) => {
        const Fe = Yr(R, U, ye);
        Fe !== null && (Fe.id && (d.current = Fe.id), ae(), y.current = !1, P("live"), i(Fe.at), ge(Fe));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, ae(), P("live");
      },
      onError: () => {
        var U;
        (U = m.current) == null || U.close(), m.current = null, y.current = !0, E.current !== "stale" && P("reconnecting");
        const R = Math.min(fe.reconnectBase * 2 ** u.current, fe.reconnectMax);
        u.current += 1, w.current = window.setTimeout(te, R);
      }
    });
  }, [ge, P, ae, a, e]), Ee = Q((R) => {
    y.current = !0, R.close(), m.current = null, w.current = window.setTimeout(te, fe.reconnectBase);
  }, [te]), Ve = Q((R, U) => (s.current.set(U, R), () => {
    s.current.delete(U);
  }), []);
  return C(() => (te(), f.current = window.setInterval(() => {
    const R = Date.now() - c.current, U = Jr(R, E.current);
    U && P(U);
    const ye = m.current;
    Xr(R, y.current, ye) && Ee(ye);
  }, fe.tick), () => {
    var R;
    window.clearInterval(f.current), window.clearTimeout(w.current), y.current = !1, (R = m.current) == null || R.close(), m.current = null;
  }), [te, Ee, P]), { connection: n, lastEventAt: l, subscribe: Ve };
}
function nt(e, a) {
  const n = new Date(e).getTime(), [r, l] = p(() => Date.now());
  return C(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    i();
    const s = window.setInterval(i, fe.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", i);
    };
  }, [a, n]), Math.max(0, r - n);
}
const Qr = { blue: "running", orange: "waiting", green: "done" };
function Zr() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function yt(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ba(e, a) {
  const n = _(0), r = Q((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (Zr() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${Qr[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => yt(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => yt(s), fe.flash)));
  }, [a, e]);
  return C(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const el = "_root_1otpc_2", al = {
  root: el
};
function tl(e, a, n, r, l) {
  const i = [at(a)];
  return e || i.push(`as of ${Tr(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Le({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = nt(e, l), s = (a == null ? void 0 : a.at) ?? e, c = tl(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${al.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const nl = "_app_xefdm_1", rl = "_side_xefdm_34", ll = "_sideTop_xefdm_45", ol = "_sideBody_xefdm_59", il = "_iconRail_xefdm_97", sl = "_railItem_xefdm_106", cl = "_railIcon_xefdm_127", dl = "_railDot_xefdm_132", ul = "_railLetter_xefdm_138", ml = "_main_xefdm_144", hl = "_rail_xefdm_106", wl = "_page_xefdm_166", fl = "_headerRow_xefdm_189", _l = "_sidebarToggle_xefdm_196", vl = "_headerSlot_xefdm_201", bl = "_drawerSide_xefdm_206", pl = "_root_xefdm_253", gl = "_topbar_xefdm_260", yl = "_mark_xefdm_271", Nl = "_brand_xefdm_278", kl = "_tagline_xefdm_284", $l = "_identity_xefdm_290", Cl = "_tools_xefdm_291", Sl = "_nav_xefdm_301", Rl = "_metadata_xefdm_308", Tl = "_actor_xefdm_323", xl = "_detail_xefdm_324", Ll = "_content_xefdm_369", Al = "_toolsPanel_xefdm_385", El = "_skip_xefdm_411", $ = {
  app: nl,
  side: rl,
  sideTop: ll,
  sideBody: ol,
  iconRail: il,
  railItem: sl,
  railIcon: cl,
  railDot: dl,
  railLetter: ul,
  main: ml,
  rail: hl,
  page: wl,
  headerRow: fl,
  sidebarToggle: _l,
  headerSlot: vl,
  drawerSide: bl,
  root: pl,
  topbar: gl,
  mark: yl,
  brand: Nl,
  tagline: kl,
  identity: $l,
  tools: Cl,
  nav: Sl,
  metadata: Rl,
  actor: Tl,
  detail: xl,
  content: Ll,
  toolsPanel: Al,
  skip: El
};
function da(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Il = "_scope_1an6i_2", Ml = {
  scope: Il
}, tn = xe(null);
function cR({ reason: e, actions: a = "disable", children: n }) {
  const r = N();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${Ml.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ t("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ t(tn.Provider, { value: { reason: e, reasonId: r, actions: a }, children: n })
  ] });
}
function Ae() {
  return Te(tn);
}
function Ia(e, a) {
  return !a || (e ?? "").split(" ").includes(a.reasonId) ? e : da(e, a.reasonId);
}
const Bl = "_btn_tzr89_2", Pl = "_primary_tzr89_14", ql = "_destructive_tzr89_25", Ol = "_secondary_tzr89_35", jl = "_ghost_tzr89_40", Dl = "_overflow_tzr89_49", Hl = "_sm_tzr89_56", Fl = "_disabled_tzr89_60", ha = {
  btn: Bl,
  primary: Pl,
  destructive: ql,
  secondary: Ol,
  ghost: jl,
  overflow: Dl,
  sm: Hl,
  disabled: Fl
};
function zl(e, a, n, r) {
  const l = a === "sm" ? [ha.sm, "ward-btn--sm"] : [], i = n ? [ha.disabled] : [];
  return [ha.btn, ha[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Wl(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Kl(e, a) {
  if (e.disabled && !a && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Gl(e, a) {
  return a ? a.reason : e.disabled ? e.disabledReason : void 0;
}
function Ul(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Vl(e, a, n) {
  return Ul(e.describedBy, a && n);
}
function Yl({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Jl(e) {
  return e.children ?? e.label;
}
function b(e) {
  var a;
  return ((a = Ae()) == null ? void 0 : a.actions) === "hide" ? null : /* @__PURE__ */ t(Xl, { ...e });
}
function Xl(e) {
  const a = Ae();
  Kl(e, a);
  const n = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || a), i = Gl(e, a), s = N();
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: zl(n, r, l, e.className),
        "data-ward-btn": n,
        "data-ward-size": r,
        disabled: l,
        title: i,
        "aria-describedby": Vl(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Wl(n, e.controls),
        children: Jl(e)
      }
    ),
    /* @__PURE__ */ t(Yl, { id: s, reason: i })
  ] });
}
let rt = "none";
function Ql(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (rt = "key");
}
typeof document < "u" && (document.addEventListener("keydown", Ql, !0), document.addEventListener("pointerdown", () => {
  rt = "pointer";
}, !0));
function Zl() {
  return rt === "key";
}
function ia(e) {
  const [a, n] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return C(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (s) => n(s.matches);
    return r.addEventListener("change", l), n(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
const eo = "_scrim_1cawq_2", ao = "_drawer_1cawq_10", to = "_sheet_1cawq_14", no = "_modal_1cawq_18", ro = "_panel_1cawq_23", lo = "_start_1cawq_44", oo = "_header_1cawq_67", io = "_title_1cawq_75", so = "_body_1cawq_79", co = "_close_1cawq_106", Se = {
  scrim: eo,
  drawer: ao,
  sheet: to,
  modal: no,
  panel: ro,
  start: lo,
  header: oo,
  title: io,
  body: so,
  close: co
}, uo = xe(null), ka = [], $a = /* @__PURE__ */ new Map();
function mo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function ho(e, a) {
  let n = $a.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, $a.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function wo(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !mo(r) && ho(e, r);
}
function fo(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (wo(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function _o(e) {
  for (const a of e.claims) {
    const n = $a.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), $a.delete(a)));
  }
}
function vo(e, a) {
  const n = { root: e, claims: [] };
  return ka.push(n), fo(n, a), n;
}
function bo(e) {
  const a = ka.indexOf(e);
  a >= 0 && ka.splice(a, 1), _o(e);
}
function Nt(e) {
  return e !== null && ka.at(-1) === e;
}
function po(e, a, n) {
  const r = _(null), l = _(n);
  return l.current = n, C(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = vo(i, a);
    return r.current = c, () => {
      var u, m;
      const d = Nt(c);
      bo(c), r.current = null, d && ((m = (u = l.current ?? s) == null ? void 0 : u.focus) == null || m.call(u));
    };
  }, [a]), Q(() => Nt(r.current), []);
}
function go(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function yo(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function No({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Se.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("header", { className: `${Se.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Se.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Se.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function ko(e) {
  return `${Se.scrim} ${Se[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function $o(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Se.panel} ${Se[e]} ward-overlay-panel${n}${r}`;
}
function Co(e) {
  const a = Te(uo);
  return e ?? a ?? document.body;
}
function na(e) {
  const a = _(null), n = _(null), r = N(), l = Co(e.container), i = ia("(min-width: 768px)"), s = go(e.kind, i), c = yo(e, r), d = Or(n), [u] = p(Zl), m = po(a, l, e.returnFocusTo), w = Q(() => {
    m() && e.onClose();
  }, [e.onClose, m]);
  return C(() => {
    var f;
    m() && ((f = n.current) == null || f.focus());
  }, [m]), C(() => {
    const f = (y) => {
      y.key === "Escape" && w();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [w]), Cr(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: ko(s),
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
            className: $o(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => m() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Se.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(No, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const So = /^([a-z][a-z0-9+.-]*):/i, Ro = /* @__PURE__ */ new Set(["http", "https"]), To = "#";
function xo(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = So.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function H(e) {
  const a = xo(e);
  return a === void 0 || Ro.has(a) ? e : To;
}
function Lo(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function nn(e) {
  const a = Lo(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function Ao(e, a) {
  C(() => {
    const n = e.current;
    if (!n) return;
    const r = () => nn(n);
    n.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [n, ...n.children]) l == null || l.observe(i);
    return r(), () => {
      n.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, a]);
}
function Eo(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function rn(e, a, n) {
  aa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = Eo(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), nn(r);
  }, [e, a, n]);
}
const Io = "_row_160e9_2", Mo = {
  row: Io
};
function Bo(e, a) {
  return e ? { role: a === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Ma({ label: e, children: a, count: n, as: r = "div", focusable: l = !0, rowRef: i, className: s, ...c }) {
  const d = _(null), u = i ?? d;
  return Ao(u, n), /* @__PURE__ */ t(r, { ref: u, className: [Mo.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Bo(l, r), ...c, children: a });
}
const Po = "_icon_1ylqy_2", qo = {
  icon: Po
};
function ua({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: qo.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function dR() {
  return /* @__PURE__ */ t(ua, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function uR() {
  return /* @__PURE__ */ o(ua, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function mR() {
  return /* @__PURE__ */ o(ua, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function hR() {
  return /* @__PURE__ */ t(ua, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Oo() {
  return /* @__PURE__ */ o(ua, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const ln = "ward:sidebar-collapsed", jo = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Do() {
  try {
    return window.localStorage.getItem(ln) === "true";
  } catch {
    return !1;
  }
}
function Ho(e) {
  try {
    window.localStorage.setItem(ln, String(e));
  } catch {
  }
}
function Fo(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function zo(e) {
  return e instanceof Element && e.closest(jo) !== null;
}
function Wo(e) {
  return e.key === "[" && !Fo(e) && !zo(e.target);
}
function Ko(e) {
  const [a, n] = p(Do), r = () => {
    Ho(!a), n(!a);
  };
  return C(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!Wo(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, a]), { collapsed: a, toggle: r };
}
function Go() {
  const e = ia("(max-width: 767.98px)"), a = ia("(max-width: 1023.98px)");
  return e ? "phone" : a ? "medium" : "wide";
}
function Uo(e) {
  const a = e === "phone", n = N(), r = _(null), [l, i] = p(!1);
  return l && !a && i(!1), { narrow: a, open: l, drawerId: n, slotRef: r, toggle: () => i(!l), close: () => i(!1) };
}
function Vo({ header: e, label: a, drawer: n }) {
  return n.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.drawerId, children: a }) }),
    /* @__PURE__ */ t("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function Yo(e, a) {
  C(() => {
    if (e)
      return window.addEventListener("hashchange", a), window.addEventListener("popstate", a), () => {
        window.removeEventListener("hashchange", a), window.removeEventListener("popstate", a);
      };
  }, [e, a]);
}
function Jo({ sidebar: e, label: a, drawer: n }) {
  var l;
  if (Yo(n.open, n.close), !n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ t(na, { kind: "start", id: n.drawerId, title: a, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ t("div", { className: $.drawerSide, onClick: r, children: on(e, !1) }) });
}
function Xo(e) {
  const [a, n] = p(!1);
  return a && e !== "medium" && n(!1), { open: a, toggle: () => n(!a) };
}
function Qo(e, a) {
  const n = Ko(e === "wide" && !a), r = Xo(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && n.collapsed, toggle: n.toggle };
}
function Zo(e, a) {
  const n = Qo(a, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return ai(e.collapsed, a);
  const r = n.collapsed, l = r && e.iconRail !== void 0;
  return { enabled: a !== "phone", collapsed: r, rail: l, drawsStrip: !l && typeof e.sidebar == "function", toggle: n.toggle };
}
const ei = (e) => e.collapsed && e.drawsStrip;
function ai(e, a) {
  return { enabled: !1, collapsed: a === "medium" || e && a === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const kt = (e) => e ? "" : void 0;
function on(e, a) {
  return typeof e == "function" ? e(a) : e;
}
function ti({ fold: e }) {
  return e.enabled ? /* @__PURE__ */ t("div", { className: $.sideTop, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(Oo, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] }) }) : null;
}
function ni({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": tt(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function ri({ items: e, label: a }) {
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: H(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(ni, { item: n }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function li({ sidebar: e, label: a, iconRail: n, fold: r }) {
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(ti, { fold: r }),
    /* @__PURE__ */ t("div", { className: $.sideBody, hidden: r.collapsed && !r.drawsStrip, children: on(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ t(ri, { items: n ?? [], label: a })
  ] });
}
const oi = (e) => e != null;
function ii(e) {
  const { sidebar: a, header: n, children: r, rail: l, iconRail: i, pageFill: s } = e, c = oi(l), d = Go(), u = Uo(d), m = Zo(e, d), w = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(c), "data-collapsed": String(m.collapsed), "data-consumer-fold": kt(ei(m)), "data-band": d, children: [
    !u.narrow && /* @__PURE__ */ t(li, { sidebar: a, label: w, iconRail: i, fold: m }),
    /* @__PURE__ */ o("main", { className: $.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ t(Vo, { header: n, label: w, drawer: u }),
      /* @__PURE__ */ t("div", { className: $.page, "data-fill": kt(s === !0), children: r })
    ] }),
    c && /* @__PURE__ */ t("div", { className: $.rail, children: l }),
    /* @__PURE__ */ t(Jo, { sidebar: a, label: w, drawer: u })
  ] });
}
function si({ destinations: e, active: a }) {
  const n = _(null);
  return rn(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t(Ma, { as: "nav", rowRef: n, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ t("a", { href: H(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Va({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function ci({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ t(Va, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Va, { value: a, className: $.detail })
  ] });
}
function di() {
  const e = ia("(max-width: 767.98px)"), a = N(), n = _(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function ui({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: $.tools, children: e });
}
function mi({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function hi(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ t("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Va, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ t(si, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: $.identity, children: /* @__PURE__ */ t(ci, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(ui, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function wi(e) {
  const a = N(), n = di();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(hi, { ...e, menu: n }),
    /* @__PURE__ */ t(mi, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: $.content, children: e.children })
  ] });
}
function fi(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function wR(e) {
  return fi(e) ? /* @__PURE__ */ t(ii, { ...e }) : /* @__PURE__ */ t(wi, { ...e });
}
const _i = "_root_itg9o_2", vi = "_row_itg9o_8", bi = "_box_itg9o_14", pi = "_label_itg9o_21", gi = "_labelHidden_itg9o_26", yi = "_lockedNote_itg9o_36", Ni = "_consequence_itg9o_44", ki = "_sample_itg9o_79", Be = {
  root: _i,
  row: vi,
  box: bi,
  label: pi,
  labelHidden: gi,
  lockedNote: yi,
  consequence: Ni,
  sample: ki
};
function $i(e, a) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || a) };
}
function Ci({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: a }) : null;
}
function Si({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Ri({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function sn(e) {
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = Ae(), l = $i(e, r);
  return /* @__PURE__ */ o("div", { className: `${Be.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: Be.row, children: [
      /* @__PURE__ */ t(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${Be.box} ward-field-option`,
          checked: l.checked,
          disabled: l.disabled,
          onChange: (i) => {
            var s;
            return !l.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, i.target.checked));
          },
          "aria-describedby": Ia(da(n, e.describedBy), r),
          title: r == null ? void 0 : r.reason
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: e.labelHidden ? Be.labelHidden : Be.label, children: [
        e.label,
        /* @__PURE__ */ t(Si, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(Ri, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(Ci, { id: n, text: e.consequence })
  ] });
}
const Ti = "_chip_pq6tb_2", xi = {
  chip: Ti
}, Li = {
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
function Ai(e, a) {
  if (e === "stream") return Ei(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = Li[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function Ei(e) {
  if (!e || !ca(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = tt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${xi.chip} ward-chip ward-chip--${e}`, style: Ai(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const Ii = "_clamp_zn74g_3", $t = {
  clamp: Ii
};
function ta({ text: e, as: a = "span", className: n }) {
  return /* @__PURE__ */ t(a, { className: n === void 0 ? $t.clamp : `${$t.clamp} ${n}`, "data-ward-clamp": "", title: e, children: e });
}
function ma(e) {
  return typeof e == "number" && ca(e) ? e : null;
}
function pe(e, a) {
  const n = ma(e);
  return n === null ? "var(--ward-color-line2)" : `var(--ward-stream-${n}-${a})`;
}
function Ba(e, a) {
  const n = ma(a);
  return n === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: n };
}
const Mi = "_root_13eei_3", Bi = "_nav_13eei_8", Pi = "_list_13eei_16", qi = "_item_13eei_24", Oi = "_link_13eei_44", ji = "_sep_13eei_54", Di = "_current_13eei_58", Hi = "_chips_13eei_62", Me = {
  root: Mi,
  nav: Bi,
  list: Pi,
  item: qi,
  link: Oi,
  sep: ji,
  current: Di,
  chips: Hi
};
function Fi({ step: e, isCurrent: a }) {
  return a ? /* @__PURE__ */ t("span", { className: Me.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ t("a", { className: `${Me.link} ward-target`, href: H(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ t("span", { title: e.label, children: e.label });
}
function zi({ path: e, chips: a, current: n = !0 }) {
  return /* @__PURE__ */ t("div", { className: Me.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ t("ol", { className: Me.list, children: e.map((r, l) => /* @__PURE__ */ o("li", { className: Me.item, children: [
      l > 0 ? /* @__PURE__ */ t("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ t(Fi, { step: r, isCurrent: n && l === e.length - 1 })
    ] }, r.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${Me.chips} ward-chiprow`, children: a.map((r) => /* @__PURE__ */ t(h, { ...r }, r.label)) }) : null
  ] }) });
}
function cn(e, a, n) {
  const r = _(n);
  r.current = n, C(() => {
    if (!e) return;
    const l = (i) => {
      var s;
      (s = a.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, a]);
}
const Wi = 500;
function dn(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function un() {
  const e = _(""), a = _(void 0);
  return C(() => () => clearTimeout(a.current), []), (n) => (clearTimeout(a.current), e.current += n.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, Wi), e.current);
}
const wa = 4;
function Ki(e, a, n) {
  const r = Math.max(0, n - e.bottom - wa * 2), l = Math.max(0, e.top - wa * 2);
  return a <= r || r >= l ? { top: e.bottom + wa, maxHeight: r } : { top: e.top - wa - Math.min(a, l), maxHeight: l };
}
function Gi(e, a, n, r) {
  const l = { start: e.left, end: e.right - a }, i = { start: l.start + a <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - a));
}
function Ui(e, a, n, r) {
  return { ...Ki(e, a.height, n.height), left: Gi(e, a.width, n.width, r) };
}
function pa(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Vi(e, a) {
  const n = a.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", pa(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function Yi(e) {
  const a = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = a.map((r) => r.scrollTop);
  return () => a.forEach((r, l) => r.scrollTop = n[l]);
}
function Ct(e, a, n) {
  const r = Yi(e), l = Vi(e, a), i = Ui(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: pa(i.left - l.box.left), top: pa(i.top - l.box.top), maxHeight: pa(i.maxHeight) }), r();
}
function Ji(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function mn(e, a, n = "start") {
  aa(() => {
    const r = a.current, l = e.current;
    if (!r || !l) return;
    const i = Ji(r), s = () => Ct(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), aa(() => {
    a.current && e.current && Ct(a.current, e.current, n);
  });
}
const Xi = "_root_1lgbn_2", Qi = "_trigger_1lgbn_7", Zi = "_value_1lgbn_47", es = "_menu_1lgbn_65", as = "_find_1lgbn_87", ts = "_list_1lgbn_103", ns = "_option_1lgbn_114", rs = "_check_1lgbn_133", ls = "_empty_1lgbn_144", _e = {
  root: Xi,
  trigger: Qi,
  value: Zi,
  menu: es,
  find: as,
  list: ts,
  option: ns,
  check: rs,
  empty: ls
}, os = 7;
function is(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function St(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function ss(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => St(e.options, e.value)), d = (u) => {
    var m;
    Qt(() => r(!1)), u && ((m = a.current) == null || m.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: is(e.options, l),
    findable: e.options.length > os,
    show: () => {
      e.disabled || (i(""), c(St(e.options, e.value)), r(!0));
    },
    close: d,
    to: c,
    pick: (u) => {
      var m;
      u && u.option.value !== e.value && ((m = e.onChange) == null || m.call(e, u.option.value)), d(!0);
    },
    find: (u) => {
      i(u), c(0);
    }
  };
}
function cs(e, a) {
  const n = _(!1);
  return C(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function ds(e) {
  const a = un();
  return (n) => {
    const r = a(n), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function hn(e) {
  const a = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, a)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function us(e) {
  return { ...hn(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function wn(e, a, n) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = a[r.key];
    if (!l) return n(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const ms = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function hs(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      ms.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function ws({ entry: e, at: a, menu: n, ids: r, value: l }) {
  return /* @__PURE__ */ o(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
      "data-active": a === n.active || void 0,
      className: _e.option,
      onMouseDown: (i) => i.preventDefault(),
      onMouseMove: () => n.to(a),
      onClick: () => n.pick(e),
      children: [
        /* @__PURE__ */ t("span", { className: _e.check, "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: _e.label, children: e.option.label })
      ]
    }
  );
}
function lt(e, a) {
  const n = e.entries[e.active];
  return n ? a.option(n.index) : void 0;
}
function fs({ menu: e, ids: a, focusRef: n }) {
  return /* @__PURE__ */ t(
    "input",
    {
      ref: n,
      className: _e.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": a.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": lt(e, a),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: wn(e, hn(e), () => {
      })
    }
  );
}
function _s({ props: e, menu: a, ids: n, focusRef: r, trigger: l }) {
  const i = ds(a), s = _(null);
  mn(l, s);
  const c = (d) => {
    dn(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: _e.menu, children: [
    a.findable && /* @__PURE__ */ t(fs, { menu: a, ids: n, focusRef: r }),
    /* @__PURE__ */ t(
      "ul",
      {
        ref: a.findable ? void 0 : r,
        id: n.list,
        role: "listbox",
        tabIndex: -1,
        className: _e.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": a.findable ? void 0 : lt(a, n),
        onKeyDown: wn(a, us(a), c),
        children: a.entries.map((d, u) => /* @__PURE__ */ t(ws, { entry: d, at: u, menu: a, ids: n, value: e.value }, d.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: _e.empty, children: "No match" })
  ] });
}
function vs(e, a) {
  const n = e.open ? lt(e, a) : void 0;
  C(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function fn(...e) {
  return e.filter(Boolean).join(" ");
}
function bs(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function ps({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ae()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ t(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: fn(_e.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": a.open,
      "aria-controls": a.open ? n.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": da(e["aria-describedby"], n.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...hs(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: _e.value, "data-placeholder": i || void 0, children: bs(e) })
    }
  );
}
function _n(e) {
  const a = Ae(), n = a ? { ...e, disabled: !0, "aria-describedby": Ia(e["aria-describedby"], a) } : e, r = N(), l = { list: `${r}-list`, value: `${r}-value`, option: (m) => `${r}-option-${m}` }, i = _(null), s = _(null), c = _(null), d = ss(n, s), u = cs(d.open, c);
  return cn(d.open, i, () => d.close(!1)), vs(d, l), /* @__PURE__ */ o("div", { ref: i, className: fn(_e.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(ps, { props: n, menu: d, ids: l, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ t("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ t(_s, { props: n, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const gs = "_field_1ensj_2", ys = "_label_1ensj_8", Ns = "_labelHidden_1ensj_15", ks = "_control_1ensj_25", $s = "_mono_1ensj_45", Cs = "_area_1ensj_50", Ss = "_invalid_1ensj_57", je = {
  field: gs,
  label: ys,
  labelHidden: Ns,
  control: ks,
  mono: $s,
  area: Cs,
  invalid: Ss
}, Rs = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, vn = (e) => `${e}-label`;
function Ts({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? Rs : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function xs({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t(
    _n,
    {
      id: a.id,
      triggerClassName: n,
      "aria-labelledby": vn(a.id),
      "aria-invalid": a["aria-invalid"],
      "aria-describedby": a["aria-describedby"],
      value: e.value,
      options: e.options ?? [],
      disabled: a.disabled,
      placeholder: e.placeholder,
      onChange: e.onChange,
      size: e.variant === "toolbar" ? "md" : void 0
    }
  );
}
function Ls({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const As = { input: Ts, select: xs, textarea: Ls };
function Es(e, a, n) {
  const r = As[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function Is(e, a, n, r) {
  const l = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": l,
    "aria-describedby": Ia(da(l ? n : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function Ms(e) {
  const a = e.mono ? [je.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [je.area] : [];
  return [je.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function Bs(e) {
  return e ? `${je.label} ${je.labelHidden} ward-field-label` : `${je.label} ward-field-label`;
}
function M(e) {
  const a = N(), n = `${a}-msg`, r = Is(e, a, n, Ae()), l = Ms(e);
  return /* @__PURE__ */ o("div", { className: `${je.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: vn(a), className: Bs(e.labelHidden), htmlFor: a, children: e.label }),
    Es(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${je.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Ps = "_root_16bw8_2", qs = "_trigger_16bw8_9", Os = "_panel_16bw8_33", js = "_menu_16bw8_53", Ds = "_group_16bw8_58", Hs = "_heading_16bw8_63", Fs = "_item_16bw8_69", zs = "_description_16bw8_84", Ws = "_separator_16bw8_108", Ks = "_footer_16bw8_114", he = {
  root: Ps,
  trigger: qs,
  panel: Os,
  menu: js,
  group: Ds,
  heading: Hs,
  item: Fs,
  description: zs,
  separator: Ws,
  footer: Ks
}, bn = xe(null);
function Gs(e, a) {
  const [n, r] = p({ open: e, start: null, request: 0 });
  return {
    ...n,
    show: (l) => r((i) => ({ open: !0, start: l, request: i.request + 1 })),
    close: (l) => {
      var i;
      Qt(() => r((s) => ({ ...s, open: !1 }))), l && ((i = a.current) == null || i.focus());
    }
  };
}
const Us = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Vs(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const n = Us.get(a.key);
      n && (a.preventDefault(), e.show(n));
    },
    onKeyUp: (a) => {
      a.key === " " && a.preventDefault();
    }
  };
}
function pn(...e) {
  return e.filter(Boolean).join(" ");
}
function Ys(e, a = {}) {
  const { ref: n, className: r, ...l } = a;
  return { ...l, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: pn(he.trigger, r) };
}
function Js(e) {
  const a = N(), n = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = _(null), l = _(null), i = Gs(e.defaultOpen === !0, l);
  return cn(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: pn(he.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ...Ys(l, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Vs(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ t(bn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function Xs(e) {
  let a = 0;
  const n = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function Qs(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const gn = (e, a) => (e % a + a) % a;
function Ze(e, a, n) {
  for (let r = 1; r <= e.length; r++) {
    const l = gn(a + n * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const Zs = (e) => e.split("").every((a) => a === e[0]);
function ec(e, a, n) {
  const r = Zs(n), l = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = gn(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function ac(e) {
  const a = _([]);
  return {
    items: e,
    refs: a,
    current: () => a.current.indexOf(document.activeElement),
    focus: (n) => {
      var r;
      return (r = a.current[n]) == null ? void 0 : r.focus();
    }
  };
}
function tc(e, a) {
  const { items: n } = e, r = () => {
    var l;
    return (l = e.refs.current[e.current()]) == null ? void 0 : l.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(Ze(n, e.current(), 1))],
    ["ArrowUp", () => e.focus(Ze(n, e.current(), -1))],
    ["Home", () => e.focus(Ze(n, -1, 1))],
    ["End", () => e.focus(Ze(n, n.length, -1))],
    ["Escape", () => a.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function nc(e, a) {
  const n = _(!1), r = un(), l = tc(e, a), i = (s) => {
    dn(s) && e.focus(ec(e.items, e.current(), r(s.key)));
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
      n.current && a.close(!1);
    }
  };
}
function rc(e, a) {
  const { start: n, request: r } = a, l = _(e);
  l.current = e, C(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? Ze(i, -1, 1) : Ze(i, i.length, -1));
  }, [n, r]);
}
function lc({ row: e, nav: a, popup: n }) {
  const { item: r, at: l } = e;
  return {
    onMouseDown: (i) => i.preventDefault(),
    onMouseMove: () => {
      !r.disabled && a.current() !== l && a.focus(l);
    },
    onClick: (i) => {
      var s;
      if (r.disabled) return i.preventDefault();
      (s = r.onSelect) == null || s.call(r), n.close(!0);
    }
  };
}
function oc(e, a) {
  if (!e.description) return { aria: {}, content: e.label };
  const n = { "aria-labelledby": a + "-label", "aria-describedby": a + "-description" }, r = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { id: a + "-label", children: e.label }),
    /* @__PURE__ */ t("span", { id: a + "-description", className: he.description, children: e.description })
  ] });
  return { aria: n, content: r };
}
function yn(e) {
  const { item: a, at: n } = e.row, r = oc(a, N()), l = {
    ref: (i) => {
      e.nav.refs.current[n] = i;
    },
    role: "menuitem",
    tabIndex: -1,
    className: he.item,
    "aria-disabled": a.disabled ? "true" : void 0,
    ...r.aria,
    ...lc(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: H(a.href), ...l, children: r.content }) : /* @__PURE__ */ t("button", { type: "button", ...l, children: r.content });
}
function ic({ heading: e, rows: a, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: he.group, children: [
    /* @__PURE__ */ t("div", { id: l, className: he.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(yn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function sc({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: he.separator }) : e.kind === "group" ? /* @__PURE__ */ t(ic, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(yn, { row: e.row, nav: a, popup: n });
}
function cc() {
  const e = Te(bn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function dc({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = cc(), c = _(null);
  mn(s, c, n);
  const d = Xs(e), u = ac(d.flatMap(Qs).map((w) => w.item)), m = nc(u, r);
  return rc(u, r), /* @__PURE__ */ o("div", { ref: c, className: he.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: l, "aria-labelledby": i, className: he.menu, ...m, children: d.map((w, f) => /* @__PURE__ */ t(sc, { block: w, nav: u, popup: r }, f)) }),
    a && /* @__PURE__ */ t("p", { className: he.footer, children: a })
  ] });
}
function uc(e) {
  var n;
  return (((n = e.parentElement) == null ? void 0 : n.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function Nn(e, a) {
  C(() => {
    const n = e.current;
    a === "page" && n && !uc(n) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, a]);
}
const mc = (e, a) => e.reduce((n, r) => n + r + a, -a);
function hc({ room: e, widths: a, more: n, gap: r }, l) {
  const i = a.map((d, u) => u);
  if (mc(a, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([l]);
  let c = a[l] + r + n;
  for (const d of i)
    if (d !== l) {
      if (c += a[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Ha = (e) => Number.parseFloat(e) || 0, Rt = (e) => e.getBoundingClientRect().width;
function wc(e) {
  const a = getComputedStyle(e), n = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Ha(a.paddingInlineStart) - Ha(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(':scope > [role="tab"]'), Rt),
    more: n ? Rt(n) : 0,
    gap: Ha(a.columnGap)
  };
}
function fc(e, a) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(a);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const _c = (e, a) => JSON.stringify(e) === JSON.stringify(a);
function vc(e, a, n) {
  const [r, l] = p(null);
  return aa(() => {
    const i = e.current;
    if (!i) return;
    const s = () => {
      const c = wc(i);
      l((d) => _c(d, c) ? d : c);
    };
    return s(), fc(i, s);
  }, [e, n]), r && hc(r, a);
}
const bc = "_strip_jqyo6_2", pc = "_fits_jqyo6_19", gc = "_probe_jqyo6_27", yc = "_moreRoot_jqyo6_36", Nc = "_more_jqyo6_36", kc = "_tab_jqyo6_55", $c = "_count_jqyo6_91", ve = {
  strip: bc,
  fits: pc,
  probe: gc,
  moreRoot: yc,
  more: Nc,
  tab: kc,
  count: $c
}, kn = "More";
function Cc(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
const $n = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function Cn(e) {
  return `${ve.strip} ward-tabs ward-tabs--${e}`;
}
const Sc = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Rc({ tab: e, active: a, place: n, onChange: r }) {
  return /* @__PURE__ */ o(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${ve.tab} ward-tab`,
      "aria-selected": e.id === a,
      "aria-controls": `panel-${e.id}`,
      onClick: () => r(e.id),
      ...n,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
          " ",
          /* @__PURE__ */ t("span", { className: ve.count, children: `· ${e.count}` })
        ] })
      ]
    }
  );
}
function Tc(e, a) {
  return (n) => {
    a(n), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function xc({ tabs: e, trigger: a, onPick: n }) {
  return /* @__PURE__ */ t(Js, { label: kn, className: ve.moreRoot, trigger: { ...a, role: "tab", "aria-selected": !1, className: ve.more }, children: /* @__PURE__ */ t(dc, { align: "end", entries: e.map((r) => ({ label: $n(r), onSelect: () => n(r.id) })) }) });
}
function Lc(e, a, n) {
  return !a || a.includes(n) ? e.itemProps(n) : Sc;
}
function fR({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l }) {
  const i = Aa({ orientation: "horizontal" }), s = Cc(e, a);
  C(() => i.setActive(s), [i.setActive, s]);
  const c = _(null);
  Nn(c, l);
  const d = vc(c, s, e.map($n).join(`
`)), u = d ? e.filter((m, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${Cn(l)} ${ve.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((m, w) => /* @__PURE__ */ t(Rc, { tab: m, active: a, place: Lc(i, d, w), onChange: n }, m.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${he.trigger} ${ve.more} ${ve.probe}`, children: kn }),
    u.length > 0 && /* @__PURE__ */ t(xc, { tabs: u, trigger: i.itemProps(e.length), onPick: Tc(c, n) })
  ] });
}
const Tt = 7;
function _R({ links: e, active: a, label: n, level: r }) {
  if (e.length > Tt) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${Tt} — the set is fixed`);
  const l = _(null);
  return Nn(l, r), rn(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t(Ma, { as: "nav", rowRef: l, className: Cn(r), label: n, count: e.length, focusable: !1, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ve.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: ve.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const Ac = "_root_v56ff_3", Ec = "_segment_v56ff_9", xt = {
  root: Ac,
  segment: Ec
};
function Sn({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Aa({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === a));
  return C(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ t("div", { className: `${xt.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "radio",
      className: xt.segment,
      "aria-checked": d.value === a,
      disabled: l,
      "aria-describedby": i,
      onClick: () => n(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const Ic = "_sidebar_s9o1j_3", Mc = "_brand_s9o1j_9", Bc = "_mark_s9o1j_17", Pc = "_word_s9o1j_24", qc = "_nav_s9o1j_30", Oc = "_navItem_s9o1j_39", jc = "_footLink_s9o1j_49", Dc = "_group_s9o1j_58", Hc = "_groupName_s9o1j_65", Fc = "_agents_s9o1j_81", zc = "_agent_s9o1j_81", Wc = "_root_s9o1j_96", Kc = "_agentTop_s9o1j_105", Gc = "_dot_s9o1j_112", Uc = "_agentName_s9o1j_124", Vc = "_agentMeta_s9o1j_138", Yc = "_foot_s9o1j_49", Jc = "_footName_s9o1j_150", Xc = "_footLinks_s9o1j_157", Qc = "_linkBrand_s9o1j_184", Zc = "_label_s9o1j_205", ed = "_note_s9o1j_210", ad = "_footer_s9o1j_226", x = {
  sidebar: Ic,
  brand: Mc,
  mark: Bc,
  word: Pc,
  nav: qc,
  navItem: Oc,
  new: "_new_s9o1j_48",
  footLink: jc,
  group: Dc,
  groupName: Hc,
  agents: Fc,
  agent: zc,
  root: Wc,
  agentTop: Kc,
  dot: Gc,
  agentName: Uc,
  agentMeta: Vc,
  foot: Yc,
  footName: Jc,
  footLinks: Xc,
  linkBrand: Qc,
  label: Zc,
  note: ed,
  footer: ad
};
function td({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: x.agent,
      href: H(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: x.agentTop, children: [
          /* @__PURE__ */ t(
            "span",
            {
              className: x.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": tt(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ t("span", { className: x.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ t("span", { className: x.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function nd({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ t("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${x.footLink} ward-target`, href: H(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function rd({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: x.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: x.brand, children: [
      /* @__PURE__ */ t("span", { className: x.mark }),
      /* @__PURE__ */ t("span", { className: x.word, children: e })
    ] }),
    /* @__PURE__ */ t("div", { className: x.nav, children: a.map((s) => /* @__PURE__ */ t("a", { className: x.navItem, href: H(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: x.group, children: [
      /* @__PURE__ */ o("span", { className: x.groupName, children: [
        n,
        " · ",
        ee(r.length)
      ] }),
      l && /* @__PURE__ */ t("a", { className: x.new, href: H(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ t(td, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(nd, { shared: i })
  ] });
}
function ld(e) {
  return e.destinations ?? e.items ?? [];
}
function od({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.linkBrand, children: e });
}
function id({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.footer, children: e });
}
function sd({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: H(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: x.note, children: e.note })
  ] });
}
function cd(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(od, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: ld(e).map((a) => /* @__PURE__ */ t(sd, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(id, { children: e.children })
  ] });
}
function dd(e) {
  return "agents" in e;
}
function vR(e) {
  return dd(e) ? /* @__PURE__ */ t(rd, { ...e }) : /* @__PURE__ */ t(cd, { ...e });
}
const ud = "_mark_wlgi8_3", md = {
  mark: ud
}, hd = { met: "✓", unmet: "", failed: "✕" };
function ot({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: md.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: hd[e]
    }
  );
}
const wd = "_avatar_1t33a_3", fd = {
  avatar: wd
};
function _d(e) {
  const a = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (a.length > 1 ? (a[0] ?? "").charAt(0) + (a[1] ?? "").charAt(0) : (a[0] ?? "").slice(0, 2)).toUpperCase();
}
function vd(e) {
  return e != null && ca(e) ? zr(e) : void 0;
}
function bR({ name: e, step: a, size: n = "md" }) {
  return /* @__PURE__ */ t("span", { className: fd.avatar, "data-size": n, "aria-hidden": "true", style: vd(a), children: _d(e) });
}
const bd = "_marker_br9fi_2", pd = {
  marker: bd
}, gd = {
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
}, yd = { running: " ward-running" };
function He({ size: e, kind: a, label: n }) {
  const r = { "--marker": gd[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${pd.marker} ward-marker ward-marker--${a}${yd[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const Nd = "_root_ti0pq_2", kd = "_chip_ti0pq_11", $d = "_noCase_ti0pq_23", fa = {
  root: Nd,
  chip: kd,
  noCase: $d
};
function Cd(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function it({ connection: e, since: a, lastEventAt: n }) {
  const r = Cd(a, n), l = nt(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${fa.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(He, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${fa.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ t("span", { className: fa.noCase, children: at(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${fa.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    de(r)
  ] });
}
const Sd = "_root_yylks_2", Rd = "_context_yylks_13", Td = "_row_yylks_1", xd = "_heading_yylks_27", Ld = "_headingWrap_yylks_35", Ad = "_meta_yylks_41", Ed = "_chips_yylks_49", Id = "_title_yylks_56", Md = "_consequence_yylks_66", Bd = "_actionsWrap_yylks_73", Pd = "_actions_yylks_73", qd = "_action_yylks_73", Od = "_overflowPanel_yylks_102", jd = "_measureClip_yylks_113", Dd = "_measure_yylks_113", K = {
  root: Sd,
  context: Rd,
  row: Td,
  heading: xd,
  headingWrap: Ld,
  meta: Ad,
  chips: Ed,
  title: Id,
  consequence: Md,
  actionsWrap: Bd,
  actions: Pd,
  action: qd,
  overflowPanel: Od,
  measureClip: jd,
  measure: Dd
};
function Hd({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(ta, { as: "h1", className: K.title, text: e }) : /* @__PURE__ */ t("h1", { className: K.title, children: e });
}
function Fd({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ t("div", { className: K.chips, children: e.map((a) => /* @__PURE__ */ t(h, { ...a }, a.label)) }) : null;
}
function zd({ consequence: e, consequenceHint: a }) {
  return e ? /* @__PURE__ */ t("p", { className: K.consequence, title: a, children: e }) : null;
}
function Wd({ chips: e = [], consequence: a, consequenceHint: n }) {
  return e.length === 0 && !a ? null : /* @__PURE__ */ o("div", { className: K.meta, children: [
    /* @__PURE__ */ t(Fd, { chips: e }),
    /* @__PURE__ */ t(zd, { consequence: a, consequenceHint: n })
  ] });
}
function Kd({ title: e, chips: a, consequence: n, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: K.heading, children: [
    /* @__PURE__ */ t(Hd, { title: e, density: l }),
    /* @__PURE__ */ t(Wd, { chips: a, consequence: n, consequenceHint: r })
  ] });
}
function Ya({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: K.action, "data-action": "", children: a }, n));
}
function Lt({ disclosure: e }) {
  return /* @__PURE__ */ t(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Gd({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(Lt, { disclosure: l }) : a ? [/* @__PURE__ */ t(Lt, { disclosure: l }, "more"), /* @__PURE__ */ t(Ya, { actions: e }, "actions")] : /* @__PURE__ */ t(Ya, { actions: e });
}
function Ud(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Vd({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: K.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ya, { actions: e }) });
}
function Yd(e, a) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const Jd = (e, a) => e.trim().toLowerCase() === a.trim().toLowerCase();
function Xd(e = [], a, n) {
  const r = e.at(-1);
  return r !== void 0 && Jd(r.label, a) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: n !== !1 };
}
function Qd({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ t("div", { className: K.context, children: /* @__PURE__ */ t(zi, { path: e.path, current: e.current }) });
}
function Zd(...e) {
  return e.some((a) => a === null);
}
function eu(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function au(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + eu(e);
}
function tu(e, a, n, r, l) {
  if (l === 0 || Zd(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], d = Math.max(0, e.clientWidth - au(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function nu(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function ru(e) {
  return Nr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function lu(e, a) {
  return a.length === 0 && e.length === 1 && ru(e[0]);
}
function ou(e, a) {
  const n = _(null), r = _(null), l = _(null), i = _(null), [s, c] = p(!1);
  return C(() => {
    const d = n.current;
    if (!nu(d)) return;
    const u = () => c(tu(d, r.current, l.current, i.current, e.length)), m = new ResizeObserver(u);
    return m.observe(d), i.current && m.observe(i.current), u(), () => m.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function iu({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: K.measureClip, children: /* @__PURE__ */ o("div", { className: K.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function su({ connection: e }) {
  return e ? /* @__PURE__ */ t(it, { connection: e.connection, since: e.since }) : null;
}
function pR({ crumb: e, crumbCurrent: a, chips: n, title: r, consequence: l, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: m = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: y, measureRef: E, collapsed: P } = ou(s, lu(s, c)), ae = c.length > 0, { disclosure: ge, close: te } = Yd(P || ae, y), Ee = Ud(c, s, P, u);
  return /* @__PURE__ */ o("header", { className: K.root, "data-density": m, children: [
    /* @__PURE__ */ t(Qd, { crumb: Xd(e, r, a) }),
    /* @__PURE__ */ o("div", { className: K.row, ref: w, children: [
      /* @__PURE__ */ t("div", { ref: f, className: K.headingWrap, children: /* @__PURE__ */ t(Kd, { title: r, chips: n, consequence: l, consequenceHint: i, density: m }) }),
      /* @__PURE__ */ o("div", { className: K.actionsWrap, children: [
        /* @__PURE__ */ t(su, { connection: d }),
        /* @__PURE__ */ t("div", { className: K.actions, ref: y, "data-ward-actions": !0, children: /* @__PURE__ */ t(Gd, { actions: s, hasMore: ae, collapsed: P, onOverflow: u, disclosure: ge }) })
      ] })
    ] }),
    /* @__PURE__ */ t(Vd, { actions: Ee, disclosure: ge, onEscape: te }),
    /* @__PURE__ */ t(iu, { actions: s, hasMore: ae, measureRef: E })
  ] });
}
const cu = "_root_td96x_2", du = "_body_td96x_16", At = {
  root: cu,
  body: du
};
function gR({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${At.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: At.body, children: n }) });
}
const uu = "_root_bf1pc_2", mu = "_table_bf1pc_9", hu = "_caption_bf1pc_14", wu = "_series_bf1pc_23", fu = "_category_bf1pc_31", _u = "_cell_bf1pc_39", vu = "_track_bf1pc_45", bu = "_lane_bf1pc_52", pu = "_bar_bf1pc_56", gu = "_value_bf1pc_63", yu = "_swatch_bf1pc_70", Nu = "_empty_bf1pc_78", J = {
  root: uu,
  table: mu,
  caption: hu,
  series: wu,
  category: fu,
  cell: _u,
  track: vu,
  lane: bu,
  bar: pu,
  value: gu,
  swatch: yu,
  empty: Nu
}, ku = "—", Et = 6;
function $u(e, a) {
  if (a.length < 1 || a.length > Et)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${Et}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function Cu(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function Rn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Su(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Ru({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = Su(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: J.cell, children: /* @__PURE__ */ o("span", { className: J.track, children: [
    /* @__PURE__ */ t("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: J.value, children: e === null ? l : r(e) })
  ] }) });
}
function Tu({ series: e }) {
  return /* @__PURE__ */ t(T, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: J.swatch, "data-step": Rn(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function xu({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: J.caption, children: e }),
    /* @__PURE__ */ t("p", { className: J.empty, children: a })
  ] });
}
function Lu({ title: e, categories: a, series: n, top: r, format: l = ee, categoryHead: i = "Category", missing: s = ku }) {
  return /* @__PURE__ */ t("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: J.table, children: [
    /* @__PURE__ */ t("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: J.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(Tu, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: J.category, children: c }),
      n.map((u, m) => /* @__PURE__ */ t(Ru, { value: u.values[d], top: r, step: Rn(m, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function yR(e) {
  $u(e.categories, e.series);
  const a = Cu(e.series);
  return a === 0 ? /* @__PURE__ */ t(xu, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(Lu, { ...e, top: a });
}
const Au = "_root_1bfqw_2", Eu = "_figure_1bfqw_7", Iu = "_of_1bfqw_13", Mu = "_bar_1bfqw_18", Bu = "_rows_1bfqw_38", Pu = "_row_1bfqw_38", qu = "_label_1bfqw_49", Ou = "_amount_1bfqw_54", Ie = {
  root: Au,
  figure: Eu,
  of: Iu,
  bar: Mu,
  rows: Bu,
  row: Pu,
  label: qu,
  amount: Ou
};
function ju({ spent: e, ceiling: a, breakdown: n }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Ie.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Ie.figure} ward-stat-value`, children: [
      re(e),
      " ",
      /* @__PURE__ */ o("span", { className: Ie.of, children: [
        "of ",
        re(a)
      ] })
    ] }),
    /* @__PURE__ */ t(
      "meter",
      {
        className: `${Ie.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${re(e)} of ${re(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    n && /* @__PURE__ */ t("ul", { className: Ie.rows, children: n.map((l) => /* @__PURE__ */ o("li", { className: `${Ie.row} ward-costrow`, children: [
      /* @__PURE__ */ t("span", { className: Ie.label, children: l.label }),
      /* @__PURE__ */ t("span", { className: Ie.amount, children: re(l.amount) })
    ] }, l.label)) })
  ] });
}
const Du = "_frame_lmfp9_2", Hu = "_table_lmfp9_6", Fu = "_th_lmfp9_12", zu = "_td_lmfp9_13", Wu = "_sort_lmfp9_48", Ku = "_row_lmfp9_60", Gu = "_empty_lmfp9_68", qe = {
  frame: Du,
  table: Hu,
  th: Fu,
  td: zu,
  sort: Wu,
  row: Ku,
  empty: Gu
}, Uu = { asc: "ascending", desc: "descending" };
function Vu(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return Uu[a.direction];
}
function Yu(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: qe.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Ju(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Xu({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: qe.th,
      style: Ju(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Vu(e, a),
      children: Yu(e, n)
    }
  );
}
function Qu({ row: e, props: a }) {
  const n = a.rowId(e), r = (a.lockedIds ?? []).includes(n);
  return /* @__PURE__ */ t(
    "tr",
    {
      className: qe.row,
      "data-selected": n === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ t(
        "td",
        {
          className: qe.td,
          "data-align": l.align,
          "data-mono": l.mono,
          "data-drop": l.dropPriority,
          "data-label": a.narrow ? l.header : void 0,
          children: a.renderCell(e, l.key)
        },
        l.key
      ))
    }
  );
}
function Zu({
  label: e,
  columns: a,
  rows: n,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u,
  narrow: m
}) {
  return n.length === 0 ? /* @__PURE__ */ t("div", { className: qe.empty, children: u }) : /* @__PURE__ */ t("div", { className: qe.frame, "data-narrow": m, children: /* @__PURE__ */ o("table", { className: qe.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: qe.head, children: a.map((w) => /* @__PURE__ */ t(Xu, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((w) => /* @__PURE__ */ t(Qu, { row: w, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: m } }, r(w))) })
  ] }) });
}
const em = "_list_v0s52_2", am = {
  list: em
};
function NR({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: am.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const tm = "_label_1u62a_2", nm = {
  label: tm
};
function kR({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: nm.label, children: a.header }) }, a.key)) }) });
}
const rm = "_stack_bp6a0_2", lm = {
  stack: rm
};
function $R({ children: e }) {
  return /* @__PURE__ */ t("span", { className: lm.stack, "data-ward-action-stack": "", children: e });
}
const om = "_set_1z0sq_2", im = "_legend_1z0sq_7", sm = "_row_1z0sq_15", cm = "_control_1z0sq_20", dm = "_input_1z0sq_26", um = "_label_1z0sq_31", mm = "_consequence_1z0sq_36", ze = {
  set: om,
  legend: im,
  row: sm,
  control: cm,
  input: dm,
  label: um,
  consequence: mm
};
function Tn({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = N(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: ze.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: ze.legend, children: e }),
    a.map((m) => {
      const w = `${u}-${m.value}`, f = m.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: ze.row, children: [
        /* @__PURE__ */ o("span", { className: ze.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: ze.input,
              value: m.value,
              checked: n === m.value,
              disabled: l,
              "aria-describedby": da(f, s),
              onChange: () => !l && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: w, className: ze.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ t("p", { id: f, className: `${ze.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const hm = "_root_11gpw_2", wm = "_head_11gpw_10", fm = "_note_11gpw_29", _m = "_index_11gpw_34", vm = "_dot_11gpw_38", bm = "_counter_11gpw_49", pm = "_trailing_11gpw_57", We = {
  root: hm,
  head: wm,
  note: fm,
  index: _m,
  dot: vm,
  counter: bm,
  trailing: pm
};
function gm({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${We.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: We.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function ym({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: We.counter, "aria-hidden": "true", children: e }) : null;
}
function It({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${We.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: We.head, children: [
      /* @__PURE__ */ t(gm, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: We.note, children: n }),
    /* @__PURE__ */ t(ym, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: We.trailing, children: i })
  ] });
}
const Nm = "_strip_4ygbn_2", km = "_cell_4ygbn_7", $m = "_value_4ygbn_12", Cm = "_link_4ygbn_29", Sm = "_label_4ygbn_49", Rm = "_tiles_4ygbn_101", De = {
  strip: Nm,
  cell: km,
  value: $m,
  link: Cm,
  label: Sm,
  tiles: Rm
};
function xn(e, a, [n, r]) {
  if (a.length < n || a.length > r)
    throw new Error(`${e}: ${a.length} cells — it takes ${n} to ${r}`);
  if (a.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Ln = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Tm({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Ln(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function xm({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Ln(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${De.link} ward-stat-link`, href: H(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const An = (e) => e.href === void 0 ? /* @__PURE__ */ t(Tm, { cell: e }, e.label) : /* @__PURE__ */ t(xm, { cell: e, href: e.href }, e.label);
function Pa({ cells: e, divided: a = !1 }) {
  return xn("StatStrip", e, [2, 4]), /* @__PURE__ */ t("dl", { className: `${De.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map(An) });
}
const Mt = 6;
function CR({ cells: e }) {
  xn("StatTiles", e, [1, 2 * Mt]);
  const a = { "--ward-stat-tiles-columns": Math.min(e.length, Mt) };
  return /* @__PURE__ */ t("dl", { className: `${De.tiles} ward-stattiles`, style: a, children: e.map(An) });
}
const Lm = "_root_1eb1u_2", Am = "_track_1eb1u_8", Em = "_thumb_1eb1u_46", Im = "_labelHidden_1eb1u_64", Mm = "_label_1eb1u_64", Bm = "_lockedNote_1eb1u_84", Ke = {
  root: Lm,
  track: Am,
  thumb: Em,
  labelHidden: Im,
  label: Mm,
  lockedNote: Bm
};
function Pm(e, a, n, r) {
  return { on: n ? !0 : e, off: !!(a || n || r) };
}
function qm(e) {
  return e ? `${Ke.label} ${Ke.labelHidden}` : Ke.label;
}
function Ue({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = Ae(), { on: m, off: w } = Pm(a, r, l, u !== null);
  return /* @__PURE__ */ o("span", { className: `${Ke.root} ward-switchrow`, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        id: d,
        role: "switch",
        "aria-checked": m,
        "aria-label": e,
        "aria-labelledby": c,
        "aria-describedby": Ia(i, u),
        title: u == null ? void 0 : u.reason,
        className: `${Ke.track} ward-switch`,
        "data-on": m,
        "data-locked": l ? !0 : void 0,
        disabled: w,
        onClick: () => !w && (n == null ? void 0 : n(!m)),
        children: /* @__PURE__ */ t("span", { className: Ke.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: qm(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: Ke.lockedNote, children: "always on" })
    ] })
  ] });
}
const Om = "_bar_1vp69_2", jm = "_skip_1vp69_11", Dm = "_mark_1vp69_22", Hm = "_nav_1vp69_30", Fm = "_list_1vp69_34", zm = "_select_1vp69_41", Wm = "_selectTrigger_1vp69_45", Km = "_dest_1vp69_52", Gm = "_actor_1vp69_71", Um = "_actorMark_1vp69_84", Vm = "_actorLabel_1vp69_89", Ym = "_tagline_1vp69_108", oe = {
  bar: Om,
  skip: jm,
  mark: Dm,
  nav: Hm,
  list: Fm,
  select: zm,
  selectTrigger: Wm,
  dest: Km,
  actor: Gm,
  actorMark: Um,
  actorLabel: Vm,
  tagline: Ym
};
function Jm(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Xm(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function SR({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = Xm(r);
  return /* @__PURE__ */ o("header", { className: oe.bar, children: [
    /* @__PURE__ */ t("a", { className: `${oe.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ t("span", { className: oe.mark, children: e }),
    l && /* @__PURE__ */ t("span", { className: oe.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: oe.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ t("ul", { className: oe.list, children: a.map((d) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "a",
        {
          className: `${oe.dest} ward-target`,
          href: H(d.href),
          "aria-current": d.id === n ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ t(
        _n,
        {
          className: oe.select,
          triggerClassName: oe.selectTrigger,
          "aria-label": "Destination",
          value: n,
          options: a.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => i == null ? void 0 : i(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ o("span", { className: oe.actor, children: [
      /* @__PURE__ */ t("span", { className: oe.actorLabel, children: c }),
      /* @__PURE__ */ t("span", { className: oe.actorMark, "aria-hidden": "true", children: Jm(c) })
    ] })
  ] });
}
const Qm = "_tree_zzoob_2", Zm = "_item_zzoob_6", eh = "_row_zzoob_10", ah = "_button_zzoob_22", Ca = {
  tree: Qm,
  item: Zm,
  row: eh,
  button: ah
}, En = xe(null);
function th({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = Aa({ orientation: "vertical" });
  return /* @__PURE__ */ t(En.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: Ca.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const nh = { ArrowRight: !0, ArrowLeft: !1 };
function Bt(e) {
  return e ? !0 : void 0;
}
function rh(e, a) {
  const n = nh[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function lh(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function oh(e) {
  const a = [Ca.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function ih(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function sh(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function ch(e) {
  return typeof e == "string" ? e : void 0;
}
function dh({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function uh({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function In(e) {
  const a = Te(En);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = ih(e);
  return /* @__PURE__ */ o("li", { className: Ca.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: oh(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": n,
        "data-depth": e.depth,
        "data-unresolved": Bt(e.unresolved),
        "data-inherited": Bt(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${Ca.button} ward-treeitem-btn`,
            onClick: () => lh(e),
            onKeyDown: (r) => rh(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: sh(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: ch(e.label), children: e.label }),
              /* @__PURE__ */ t(dh, { value: e.detail }),
              /* @__PURE__ */ t(uh, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const mh = "_frame_10gwd_2", hh = "_subjectRail_10gwd_22", wh = "_subject_10gwd_22", fh = "_rail_10gwd_42", _h = "_record_10gwd_66", vh = "_recordBody_10gwd_71", bh = "_stageGrid_10gwd_120", ph = "_band_10gwd_134", gh = "_bandBody_10gwd_142", yh = "_bandActions_10gwd_147", Nh = "_scroller_10gwd_155", kh = "_board_10gwd_182", $h = "_lanes_10gwd_191", Ch = "_cardGrid_10gwd_225", X = {
  frame: mh,
  subjectRail: hh,
  subject: wh,
  rail: fh,
  record: _h,
  recordBody: vh,
  stageGrid: bh,
  band: ph,
  bandBody: gh,
  bandActions: yh,
  scroller: Nh,
  board: kh,
  lanes: $h,
  cardGrid: Ch
};
function RR({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: X.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function Pt(e) {
  return e ? "true" : void 0;
}
function TR({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: X.subjectRail, "data-ward-subject-rail": n, "data-ruled": Pt(i), children: [
    /* @__PURE__ */ t("div", { className: X.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: X.rail, "data-sticky": Pt(l), "aria-label": r, children: a })
  ] });
}
function xR({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: X.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(It, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: X.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(It, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: X.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Sh = "_form_1j8ub_2", Rh = "_fields_1j8ub_9", Th = "_actions_1j8ub_19", Fa = {
  form: Sh,
  fields: Rh,
  actions: Th
};
function LR({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Fa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Fa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Fa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function AR({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: X.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: X.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: X.bandActions, children: a })
  ] });
}
const xh = "(max-width: 767.98px)";
function st({ label: e, children: a, laneCount: n }) {
  const r = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t(Ma, { className: X.scroller, label: e, count: n ?? kr.count(a), "data-ward-board-scroller": "", style: r, children: a });
}
function Lh({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: X.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(st, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Ah({ lanes: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: X.board, "data-ward-board": "", children: /* @__PURE__ */ t(st, { label: a, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ t($r, { children: n.content }, n.id)) }) });
}
function ER({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = ia(xh);
  return n === void 0 ? /* @__PURE__ */ t(st, { label: a, children: e }) : l ? /* @__PURE__ */ t(Lh, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(Ah, { lanes: n, label: a });
}
function IR({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), i = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ t(Ma, { className: X.stageGrid, label: n, count: l, "data-ward-stage-grid": "", "data-floor": r, style: i, children: a });
}
function MR({ children: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: `${X.cardGrid} ward-cardgrid`, role: a === void 0 ? void 0 : "region", "aria-label": a, "data-ward-card-grid": "", children: e });
}
const Eh = "_block_b38uc_3", Ih = "_sentence_b38uc_10", Mh = "_meta_b38uc_19", Bh = "_action_b38uc_24", Ph = "_strip_b38uc_28", qh = "_loading_b38uc_47", Oh = "_label_b38uc_55", jh = "_counter_b38uc_62", be = {
  block: Eh,
  sentence: Ih,
  meta: Mh,
  action: Bh,
  strip: Ph,
  loading: qh,
  label: Oh,
  counter: jh
};
function Dh({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: be.action, children: /* @__PURE__ */ t(b, { onClick: e.onClick, children: e.label }) });
}
function qa({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${be.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: be.sentence, children: e }),
    n,
    /* @__PURE__ */ t(Dh, { action: a })
  ] });
}
function Hh(e) {
  return /* @__PURE__ */ t(qa, { ...e, kind: "ward-emptystate" });
}
function BR({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(qa, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function PR(e) {
  return /* @__PURE__ */ t(qa, { ...e });
}
function qR({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(qa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function OR({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function jR({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function DR({ label: e, startedAt: a }) {
  const n = _(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  C(() => {
    const s = window.setTimeout(() => l(!0), fe.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = nt(n.current, r);
  return /* @__PURE__ */ o("div", { className: `${be.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ t("span", { className: be.label, children: e }),
    r ? /* @__PURE__ */ t("span", { className: be.counter, children: at(i) }) : null
  ] });
}
const Fh = "_note_cigdt_2", zh = {
  note: Fh
};
function Wh({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: zh.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const Kh = "_card_k7btg_3", Gh = "_hit_k7btg_31", Uh = "_head_k7btg_44", Vh = "_title_k7btg_51", Yh = "_meta_k7btg_57", Jh = "_since_k7btg_66", Xh = "_sep_k7btg_76", Qh = "_fields_k7btg_80", Zh = "_field_k7btg_80", ew = "_last_k7btg_98", aw = "_reason_k7btg_110", se = {
  card: Kh,
  hit: Gh,
  head: Uh,
  title: Vh,
  meta: Yh,
  since: Jh,
  sep: Xh,
  fields: Qh,
  field: Zh,
  last: ew,
  reason: aw
}, tw = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function nw(e, a, n) {
  const r = ba(e, "blue"), l = ba(e, "orange"), i = ba(e, "green"), s = _(/* @__PURE__ */ new Set());
  C(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = tw[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, l]);
}
const rw = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function lw(e, a) {
  return rw[a](e);
}
function ow({ item: e, connection: a }) {
  const n = /* @__PURE__ */ t("span", { className: se.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ o("p", { className: se.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    n,
    /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: se.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.waitsOn,
    n,
    /* @__PURE__ */ o("span", { className: se.since, children: [
      ce(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function iw({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: se.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function sw({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: se.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function cw({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: se.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: se.field, children: lw(e, n) }, n)) });
}
const Ja = (e) => e ? !0 : void 0;
function dw(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function uw(e, a, n) {
  e == null || e(a, n);
}
function mw(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function hw({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: se.last, "data-stale": Ja(a), children: n }) : null;
}
function Oa(e) {
  const a = e.fields ?? [], n = e.item, r = _(null);
  nw(r, n.key, e.feed);
  const l = mw(e.feed), i = dw(n);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": n.key,
      className: se.card,
      style: i,
      "data-selected": Ja(e.selected),
      "data-flagged": Ja(n.flagged),
      children: [
        /* @__PURE__ */ t("button", { type: "button", className: se.hit, onClick: (s) => uw(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(iw, { item: n }),
        /* @__PURE__ */ t(ta, { as: "p", className: se.title, text: n.title }),
        /* @__PURE__ */ t(ow, { item: n, connection: l }),
        /* @__PURE__ */ t(sw, { reason: n.blockedReason }),
        /* @__PURE__ */ t(cw, { item: n, fields: a }),
        /* @__PURE__ */ t(hw, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const ww = "_column_1j8bi_3", fw = "_head_1j8bi_21", _w = "_label_1j8bi_30", vw = "_count_1j8bi_39", bw = "_list_1j8bi_53", la = {
  column: ww,
  head: fw,
  label: _w,
  count: vw,
  list: bw
};
function Mn(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function pw({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: la.head, children: [
    /* @__PURE__ */ t("h2", { className: la.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: la.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function gw(e) {
  return /* @__PURE__ */ t("div", { className: la.list, role: "list", children: e.rows.map((a, n) => {
    var r;
    return /* @__PURE__ */ t(
      Oa,
      {
        item: a,
        fields: e.fields,
        onOpen: e.onOpen,
        selected: a.key === e.selectedKey,
        feed: e.feed,
        rovingProps: (r = e.roving) == null ? void 0 : r.itemProps(e.roving.base + n),
        inList: !0
      },
      a.key
    );
  }) });
}
function yw({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), m = e.cap !== void 0 && a.length > e.cap, w = Mn(a, r);
  return /* @__PURE__ */ o("section", { className: la.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(pw, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(gw, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    m && /* @__PURE__ */ t(Wh, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Nw = "_foot_cs4jr_2", kw = "_note_cs4jr_13", $w = "_link_cs4jr_19", za = {
  foot: Nw,
  note: kw,
  link: $w
};
function HR({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: za.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: za.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${za.link} ward-target`, href: H(e), children: "Configure board" })
  ] });
}
const Cw = "_head_1tfi5_3", Sw = "_identity_1tfi5_12", Rw = "_titleRow_1tfi5_18", Tw = "_title_1tfi5_18", xw = "_key_1tfi5_35", Lw = "_rollup_1tfi5_45", Aw = "_tools_1tfi5_53", Ew = "_swatch_1tfi5_101", Iw = "_mark_1tfi5_108", $e = {
  head: Cw,
  identity: Sw,
  titleRow: Rw,
  title: Tw,
  key: xw,
  rollup: Lw,
  tools: Aw,
  swatch: Ew,
  mark: Iw
}, qt = "initials:";
function Mw(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ee(e)} loaded this week`;
}
function Bw(e) {
  const a = [Mw(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ee(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function Pw(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ee(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Bw(e)
  ] });
}
function qw(e) {
  return e.startsWith(qt) ? e.slice(qt.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function Ow({ markRef: e, streamStep: a }) {
  const n = { "--stream": pe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${$e.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: qw(e) }) : /* @__PURE__ */ t("span", { className: $e.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function jw({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function FR({
  stream: e,
  rollups: a,
  connection: n,
  lastEventAt: r,
  owners: l,
  owner: i,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ o("div", { className: $e.head, children: [
    /* @__PURE__ */ o("div", { className: $e.identity, children: [
      /* @__PURE__ */ o("div", { className: $e.titleRow, children: [
        /* @__PURE__ */ t(Ow, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: $e.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: $e.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: $e.rollup, "aria-live": "polite", children: Pw(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: $e.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(jw, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(it, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const Dw = "_head_1sejb_14", Hw = "_line_1sejb_15", Fw = "_cHandle_1sejb_36", zw = "_cName_1sejb_41", Ww = "_nameLine_1sejb_49", Kw = "_cLabel_1sejb_56", Gw = "_cCap_1sejb_61", Uw = "_cShown_1sejb_66", Vw = "_name_1sejb_49", Yw = "_noCap_1sejb_88", Jw = "_state_1sejb_102", Xw = "_handle_1sejb_111", Qw = "_sub_1sejb_137", B = {
  head: Dw,
  line: Hw,
  cHandle: Fw,
  cName: zw,
  nameLine: Ww,
  cLabel: Kw,
  cCap: Gw,
  cShown: Uw,
  name: Vw,
  noCap: Yw,
  state: Jw,
  handle: Xw,
  sub: Qw
}, Zw = "can't be hidden or collapsed", ef = "terminal · counted, not a column";
function zR() {
  return /* @__PURE__ */ o("div", { className: B.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: B.cHandle }),
    /* @__PURE__ */ t("span", { className: B.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: B.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: B.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: B.cShown, children: "Shown" })
  ] });
}
function af(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function tf(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Ot(e) {
  return e.gate ? Zw : e.terminal ? ef : tf(e.agentsMounted);
}
function nf(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function rf({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: B.cName, children: [
    /* @__PURE__ */ o("span", { className: B.nameLine, children: [
      /* @__PURE__ */ t("span", { className: B.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Ot(e) && /* @__PURE__ */ t("span", { className: B.sub, children: Ot(e) })
  ] });
}
function lf(e) {
  return e === void 0 ? "" : String(e);
}
function of(e) {
  return e === "" ? void 0 : Number(e);
}
function sf({ name: e, onReorder: a }) {
  const n = Ae();
  return (n == null ? void 0 : n.actions) === "hide" ? /* @__PURE__ */ t("span", { className: B.cHandle }) : /* @__PURE__ */ t("span", { className: B.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: B.handle,
      "aria-label": `Reorder ${e}`,
      disabled: n !== null,
      title: n == null ? void 0 : n.reason,
      "aria-describedby": n == null ? void 0 : n.reasonId,
      onKeyDown: (r) => !n && nf(r, a),
      children: "⠿"
    }
  ) });
}
function cf({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${B.cCap} ${B.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: B.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: lf(a.cap), onChange: (r) => n({ ...a, cap: of(r) }) }) });
}
function df({ stage: e, config: a, onChange: n }) {
  const r = Ae() !== null, l = af(e, a.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: B.cShown, children: [
    /* @__PURE__ */ t(Ue, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ t("span", { className: B.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function uf(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function WR({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: B.line, "data-kind": uf(e), children: [
    /* @__PURE__ */ t(sf, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(rf, { stage: e }),
    /* @__PURE__ */ t("span", { className: B.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(cf, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(df, { stage: e, config: a, onChange: n })
  ] });
}
const mf = "_body_8qsv9_2", hf = "_head_8qsv9_9", wf = "_summary_8qsv9_19", ff = "_block_8qsv9_20", _f = "_actionsBlock_8qsv9_21", vf = "_title_8qsv9_41", bf = "_note_8qsv9_46", pf = "_k_8qsv9_51", gf = "_kv_8qsv9_58", yf = "_row_8qsv9_64", Nf = "_label_8qsv9_75", kf = "_value_8qsv9_84", $f = "_quote_8qsv9_90", Cf = "_actions_8qsv9_21", Sf = "_resolve_8qsv9_111", O = {
  body: mf,
  head: hf,
  summary: wf,
  block: ff,
  actionsBlock: _f,
  title: vf,
  note: bf,
  k: pf,
  kv: gf,
  row: yf,
  label: Nf,
  value: kf,
  quote: $f,
  actions: Cf,
  resolve: Sf
};
function Rf(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Tf(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function xf(e) {
  const a = ma(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function Lf(e) {
  return (e ?? []).map((a, n) => [a.label, a.value, `fact-${n}`]);
}
function Af(e, a, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...Ba(xf(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Rf(e),
    ...Lf(n),
    ...Tf(e, a)
  ];
}
function Ef({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: O.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: O.k, children: a }),
    e
  ] });
}
function If(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function Mf({ item: e, showKey: a }) {
  const n = If(e);
  return !a && !n ? null : /* @__PURE__ */ o("div", { className: O.head, children: [
    a && /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ t(h, { role: n.role, label: n.label })
  ] });
}
function Bf({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: O.block, children: [
    /* @__PURE__ */ t("p", { className: O.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: O.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: O.note, children: e.agentMeta })
  ] }) : null;
}
function KR({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const m = N(), w = Af(e, l, d);
  return /* @__PURE__ */ t(na, { kind: "drawer", labelledBy: m, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: O.body, children: [
    /* @__PURE__ */ t(Mf, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: O.summary, children: [
      /* @__PURE__ */ t("h2", { className: O.title, id: m, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: O.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: O.kv, children: w.map(([f, y, E]) => /* @__PURE__ */ o("div", { className: O.row, children: [
      /* @__PURE__ */ t("dt", { className: O.label, children: f }),
      /* @__PURE__ */ t("dd", { className: O.value, children: y })
    ] }, E ?? f)) }),
    /* @__PURE__ */ t(Bf, { item: e }),
    /* @__PURE__ */ o("div", { className: O.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: O.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: O.note, children: c })
    ] }),
    /* @__PURE__ */ t(Ef, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Pf = "_root_3azmy_2", qf = "_list_3azmy_7", Of = "_item_3azmy_12", jf = "_box_3azmy_18", Df = "_text_3azmy_23", Hf = "_note_3azmy_28", Ye = {
  root: Pf,
  list: qf,
  item: Of,
  box: jf,
  text: Df,
  note: Hf
};
function ja({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ye.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${Ye.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ye.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ye.box, children: /* @__PURE__ */ t(ot, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ye.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${Ye.note} ward-checklist-note`, children: a })
  ] });
}
const Ff = "_rail_znbbp_2", zf = "_k_znbbp_11", Wf = "_head_znbbp_19", Kf = "_section_znbbp_25", Gf = "_card_znbbp_39", Uf = "_strip_znbbp_46", Vf = "_skeleton_znbbp_60", Yf = "_skeletonLabel_znbbp_74", Jf = "_bar_znbbp_80", Xf = "_note_znbbp_89", me = {
  rail: Ff,
  k: zf,
  head: Wf,
  section: Kf,
  card: Gf,
  strip: Uf,
  skeleton: Vf,
  skeletonLabel: Yf,
  bar: Jf,
  note: Xf
};
function Qf(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Wa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function Zf({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function e_({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(yw, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function a_(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(e_, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(Zf, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function GR(e) {
  const a = Qf(e.onOpen), n = Mn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(Wa, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(Oa, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Wa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(a_, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(Wa, { title: "Effect of this config", children: /* @__PURE__ */ t(ja, { items: e.effects, density: "compact" }) })
  ] });
}
function t_(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function n_(e) {
  return Math.ceil(e.length / 2);
}
function r_(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Bn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function l_(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Bn(e);
  l !== void 0 && n(l), r(r_(e.type));
}
function o_(e, a, n, r, l) {
  C(() => {
    if (e !== null)
      return e.subscribe(a, (i) => l_(i, n, r, l));
  }, [e, a, n, r, l]);
}
function i_(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function s_(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function c_(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function d_(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(n_(a ?? [])) + ")"
  };
}
function u_(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function m_(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: re(e.cost) }) : null;
}
function h_(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function w_(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(Le, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function f_(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function __(e, a) {
  return a === void 0 ? e : t_(e, a.ref);
}
function v_(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function sa(e) {
  return e === !0 ? "true" : void 0;
}
function Pn(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = _(null), i = ba(l), s = _(/* @__PURE__ */ new Set()), [c, d] = p(i_(a));
  o_(e.feed, a.key, s, d, i);
  const u = s_(a, r), m = c_(a, n), w = d_(a, e.fields), f = f_(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...v_(e),
      className: "ward-workcard",
      "data-flagged": sa(a.flagged),
      "data-selected": sa(e.selected),
      style: w,
      ref: __(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        u_(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: u.role, label: u.label }),
          m_(a, e.fields),
          h_(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          w_(n, c, e.connection, a.changedAt),
          f !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function b_({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function p_(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function g_(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function y_(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(b_, { count: e.items.length, cap: e.column.cap });
}
function N_(e, a) {
  return e.roving ?? a;
}
function k_(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function $_(e, a) {
  return e.items.map((n, r) => /* @__PURE__ */ t(
    Pn,
    {
      item: n,
      fields: e.fields,
      onOpen: e.onOpen,
      selected: n.key === e.selectedKey,
      feed: e.feed,
      connection: e.connection,
      rovingItem: a.itemProps(r)
    },
    n.key
  ));
}
function C_(e) {
  const a = N(), n = Aa({ orientation: "vertical" }), r = N_(e, n), l = p_(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": sa(l), "data-gate": sa(e.column.gate), children: [
    g_(e.column, e.items.length, a),
    y_(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...k_(e, n), children: $_(e, r) })
  ] });
}
function S_(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function R_(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function T_(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function UR(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: S_(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      R_(e),
      T_(e.onConfigure),
      /* @__PURE__ */ t(it, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function x_(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function L_(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Ue, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Ue, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function A_(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function VR(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": sa(x_(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: L_(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(sn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    A_(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function YR(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(Pn, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(C_, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function E_(e, a) {
  const n = Bn(e);
  n !== void 0 && a(n);
}
function I_(e, a, n) {
  C(() => {
    if (e != null)
      return e.subscribe(a, (r) => E_(r, n));
  }, [e, a, n]);
}
function M_(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function B_(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function P_(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(Le, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function q_(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function JR(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  I_(e.feed, a.key, l);
  const i = [...M_(a), ...B_(a)];
  return /* @__PURE__ */ o(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      P_(n, r)
    ] }),
    q_(a, e.actions)
  ] });
}
const O_ = "_card_uzp8w_3", j_ = "_head_uzp8w_30", D_ = "_mark_uzp8w_38", H_ = "_name_uzp8w_50", F_ = "_chips_uzp8w_71", z_ = "_description_uzp8w_77", W_ = "_run_uzp8w_82", K_ = "_sep_uzp8w_91", G_ = "_facts_uzp8w_97", U_ = "_fact_uzp8w_97", V_ = "_factLabel_uzp8w_111", Y_ = "_factValue_uzp8w_115", le = {
  card: O_,
  head: j_,
  mark: D_,
  name: H_,
  chips: F_,
  description: z_,
  run: W_,
  sep: K_,
  facts: G_,
  fact: U_,
  factLabel: V_,
  factValue: Y_
}, J_ = { live: "done", draft: "running", paused: "meta" };
function X_(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function Q_({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: J_[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function Z_({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: le.description, children: e });
}
function ev({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(Le, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function av({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ t("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function tv(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function nv({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: X_(s),
      style: c,
      "data-selected": d,
      "data-paused": tv(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ t("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${le.name} ward-rowlink ward-target`, href: H(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(Z_, { description: e.description }),
        /* @__PURE__ */ t(ev, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(Q_, { versions: e.versions }),
        /* @__PURE__ */ t(av, { facts: i })
      ]
    }
  );
}
const rv = "_list_4dcyc_2", lv = "_row_4dcyc_11", ov = "_head_4dcyc_23", iv = "_id_4dcyc_30", sv = "_lock_4dcyc_35", cv = "_reason_4dcyc_41", dv = "_remove_4dcyc_46", uv = "_clauses_4dcyc_50", mv = "_clause_4dcyc_50", hv = "_label_4dcyc_64", wv = "_cell_4dcyc_71", fv = "_value_4dcyc_76", ie = {
  list: rv,
  row: lv,
  head: ov,
  id: iv,
  lock: sv,
  reason: cv,
  remove: dv,
  clauses: uv,
  clause: mv,
  label: hv,
  cell: wv,
  value: fv
}, qn = xe(!1);
function XR({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(qn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function _v({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function vv({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ie.reason, children: e })
  ] });
}
function bv({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ t("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(vv, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ie.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function jt(e, a) {
  return e.locked ? void 0 : a;
}
function QR({ rule: e, onChange: a, onRemove: n }) {
  if (!Te(qn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = jt(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(bv, { rule: e, onRemove: jt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ t("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ie.cell, children: /* @__PURE__ */ t(_v, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const pv = "_ladder_n8eeo_2", gv = "_cell_n8eeo_7", yv = "_empty_n8eeo_26", Nv = "_name_n8eeo_34", kv = "_holder_n8eeo_40", $v = "_request_n8eeo_46", Cv = "_swatches_n8eeo_51", Sv = "_swatch_n8eeo_51", Rv = "_tilesFrame_n8eeo_78", Tv = "_tiles_n8eeo_78", xv = "_tile_n8eeo_78", Lv = "_bar_n8eeo_117", Av = "_hex_n8eeo_128", Ev = "_note_n8eeo_138", A = {
  ladder: pv,
  cell: gv,
  empty: yv,
  name: Nv,
  holder: kv,
  request: $v,
  swatches: Cv,
  swatch: Sv,
  tilesFrame: Rv,
  tiles: Tv,
  tile: xv,
  bar: Lv,
  hex: Av,
  note: Ev
}, ZR = "not validated yet, pending a CVD matrix and dark stepping";
function Iv(e) {
  return e.reserved ? "reserved" : ca(e.step) ? "validated" : "partial";
}
function On(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Mv(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Bv({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(He, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Pv(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function qv(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Dt = (e) => String(e).padStart(2, "0");
function Ov(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? On(e, void 0);
}
function jv({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.hex} ward-ladder-hex`, children: r ? `step ${Dt(e)}` : Kr(e) }),
    /* @__PURE__ */ t("span", { className: `${A.note} ward-ladder-note`, children: r ? n : `Step ${Dt(e)} · ${n}` })
  ] });
}
function Dv({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = Iv(e), c = On(s, n), d = c !== "free", u = d || i, m = a === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, y = `${w} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...qv(d, m, u), "data-validation": s, style: Mv(e, s), onClick: f, onKeyDown: (P) => Pv(P, f) }, label: y, name: w, holder: c, validation: s, note: Ov(s, n, m), step: e.step };
}
const Hv = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${A.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${A.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(jv, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${A.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(Bv, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${A.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${A.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Fv(e) {
  return Hv[e.presentation](Dv(e));
}
function zv(e) {
  for (const a of e)
    if (!a.reserved && !Ea(a.step)) throw new Error("colour ladder renders token steps only");
}
function Wv() {
  return /* @__PURE__ */ o("div", { className: `${A.cell} ward-ladder-cell ${A.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${A.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Kv(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Gv = { list: A.ladder, swatches: A.swatches, tiles: A.tilesFrame };
function Uv() {
  return /* @__PURE__ */ o("div", { className: `${A.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${A.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Vv = { list: Wv, swatches: () => null, tiles: Uv };
function Yv(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function jn(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  zv(e.steps);
  const r = Kv(e), l = Vv[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(Fv, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Yv(e.disabled === !0), className: `${Gv[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: A.tiles, children: i }) : i });
}
const Jv = "_rail_s06lm_2", Xv = "_section_s06lm_12", Qv = "_sectionFlush_s06lm_22", Zv = "_head_s06lm_26", eb = "_headLabel_s06lm_34", ab = "_sample_s06lm_42", tb = "_sampleLabel_s06lm_47", nb = "_sampleTitle_s06lm_54", rb = "_sampleMeta_s06lm_59", lb = "_trace_s06lm_65", ob = "_traceHead_s06lm_70", ib = "_steps_s06lm_78", sb = "_step_s06lm_78", cb = "_stepTitle_s06lm_97", db = "_hollow_s06lm_107", ub = "_stepBody_s06lm_115", mb = "_stepDetail_s06lm_127", hb = "_publish_s06lm_132", wb = "_reason_s06lm_138", fb = "_note_s06lm_143", _b = "_reveal_s06lm_148", k = {
  rail: Jv,
  section: Xv,
  sectionFlush: Qv,
  head: Zv,
  headLabel: eb,
  sample: ab,
  sampleLabel: tb,
  sampleTitle: nb,
  sampleMeta: rb,
  trace: lb,
  traceHead: ob,
  steps: ib,
  step: sb,
  stepTitle: cb,
  hollow: db,
  stepBody: ub,
  stepDetail: mb,
  publish: hb,
  reason: wb,
  note: fb,
  reveal: _b
}, Ht = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, vb = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, bb = { ok: "greenFill", finding: "orangeFill", action: "blue" }, pb = { notSimulated: "not simulated", running: "running" };
function gb(e) {
  return e.presentation === "foundry";
}
function yb(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Nb(e, a) {
  var r;
  const n = vb[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function kb(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function $b(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Cb(e) {
  if (kb(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Sb(e) {
  const [a, n] = p(!1);
  C(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Rb(e) {
  const a = pb[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(He, { size: 6, kind: bb[e.kind], label: e.kind });
}
function Tb(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function xb(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Lb(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Sb, { kind: a.kind, children: [
    /* @__PURE__ */ t(Rb, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(Tb, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(xb, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Ab(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function Dn(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: Ab(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(Lb, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function Eb(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ o("div", { className: `${k.sample} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.sampleLabel, children: "Sample item" }),
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
function Ib(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Mb(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Zt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Pa, { divided: !0, cells: a }) });
}
function Bb(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Zt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Pb(e) {
  const a = Bb(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Pa, { divided: !0, cells: a }) });
}
function Hn(e) {
  const a = N();
  return e.reason !== null ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: `${k.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function qb(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(Hn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function Ob(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(Hn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Fn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: Ht[e.run.status].role, label: Ht[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function jb(e, a) {
  const [n, r] = p(e.steps);
  return C(() => r(e.steps), [e.steps]), C(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [a, e.status]), n;
}
function Db(e) {
  var n;
  $b(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Fn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(Eb, { sample: e.run.sample }),
    /* @__PURE__ */ t(Dn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(Mb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(ja, { items: e.checklist }) }),
    /* @__PURE__ */ t(qb, { reason: yb(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Hb(e) {
  var r;
  const a = jb(e.run, e.feed);
  Cb(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Fn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(Ib, { sample: e.run.sample }),
    /* @__PURE__ */ t(Dn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(Pb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(ja, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(Ob, { reason: Nb(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function eT(e) {
  return gb(e) ? /* @__PURE__ */ t(Hb, { ...e }) : /* @__PURE__ */ t(Db, { ...e });
}
const Fb = "_list_142ip_3", zb = "_row_142ip_9", Wb = "_condition_142ip_18", Kb = "_action_142ip_24", ga = {
  list: Fb,
  row: zb,
  condition: Wb,
  action: Kb
}, zn = xe(!1);
function aT({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(zn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ga.list, "aria-label": a, children: e }) });
}
function tT({ rule: e }) {
  if (!Te(zn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: ga.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: ga.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: ga.action, children: e.then })
  ] });
}
const Gb = "_move_tmppt_3", Ub = {
  move: Gb
};
function Xa(e, a, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(n, 0, l), r;
}
function Wn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Kn(e, a, n) {
  return `${e} moved to position ${a + 1} of ${n}.`;
}
function Ft(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function Vb(e) {
  return e === "up" ? "down" : "up";
}
function Yb(e, a) {
  const n = Ft(e, a.id, a.direction) ?? Ft(e, a.id, Vb(a.direction));
  n == null || n.focus();
}
function Gn() {
  const e = _(null), [a, n] = p(null), [r, l] = p("");
  return C(() => {
    e.current !== null && a !== null && Yb(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function Un({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Sa({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${Ub.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const Jb = "_body_1jd1i_2", Xb = "_title_1jd1i_8", Qb = "_section_1jd1i_13", Zb = "_legend_1jd1i_18", ep = "_stages_1jd1i_26", ap = "_stage_1jd1i_26", tp = "_stageIndex_1jd1i_44", np = "_stageName_1jd1i_50", rp = "_footer_1jd1i_59", lp = "_note_1jd1i_66", op = "_reason_1jd1i_71", ip = "_actions_1jd1i_76", sp = "_webHead_1jd1i_83", cp = "_kicker_1jd1i_92", dp = "_webTitle_1jd1i_99", up = "_webBody_1jd1i_105", mp = "_webSection_1jd1i_109", hp = "_sectionHead_1jd1i_121", wp = "_sectionNote_1jd1i_129", fp = "_formLabel_1jd1i_134", _p = "_identityRow_1jd1i_139", vp = "_nameCell_1jd1i_145", bp = "_keyCell_1jd1i_150", pp = "_colourCell_1jd1i_154", gp = "_colourStatus_1jd1i_161", yp = "_webStages_1jd1i_166", Np = "_webStageList_1jd1i_172", kp = "_webStage_1jd1i_166", $p = "_webIndex_1jd1i_191", Cp = "_webStageName_1jd1i_196", Sp = "_webMoves_1jd1i_201", Rp = "_addStage_1jd1i_215", Tp = "_addStageButton_1jd1i_223", xp = "_addStageNote_1jd1i_231", Lp = "_webFooter_1jd1i_236", Ap = "_webFooterNotes_1jd1i_244", Ep = "_webNote_1jd1i_251", v = {
  body: Jb,
  title: Xb,
  section: Qb,
  legend: Zb,
  stages: ep,
  stage: ap,
  stageIndex: tp,
  stageName: np,
  footer: rp,
  note: lp,
  reason: op,
  actions: ip,
  webHead: sp,
  kicker: cp,
  webTitle: dp,
  webBody: up,
  webSection: mp,
  sectionHead: hp,
  sectionNote: wp,
  formLabel: fp,
  identityRow: _p,
  nameCell: vp,
  keyCell: bp,
  colourCell: pp,
  colourStatus: gp,
  webStages: yp,
  webStageList: Np,
  webStage: kp,
  webIndex: $p,
  webStageName: Cp,
  webMoves: Sp,
  addStage: Rp,
  addStageButton: Tp,
  addStageNote: xp,
  webFooter: Lp,
  webFooterNotes: Ap,
  webNote: Ep
}, Ip = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Vn = "not in catalogue";
function Mp(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${Vn}` }, ...n];
}
function Bp({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Vn}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Mp(n, e.name), invalid: i, onChange: r });
}
function Yn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Pp(e) {
  const a = _([]), n = _(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function qp({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Yn(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: v.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: v.webStageName, children: /* @__PURE__ */ t(Bp, { stage: a, index: n, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: Ip, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: v.webMoves, children: [
      n > 0 && /* @__PURE__ */ t(Sa, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t(Sa, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Op({ stages: e, onChange: a, catalogue: n }) {
  const r = Pp(e.length), l = Gn(), i = (c, d) => {
    const u = Wn(c, d);
    r.current = Xa(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Kn(Yn(e[c], c), u, e.length)), a(Xa(e, c, u));
  }, s = (c, d) => a(e.map((u, m) => m === c ? d : u));
  return /* @__PURE__ */ o("div", { className: v.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(qp, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(Un, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: v.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: v.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const jp = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Dp = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Hp = "A new stream starts as a draft. Nothing runs on it until you publish it.", Fp = "Create is disabled: name the stream and give it a key first.", zp = "reorder with the ↑ ↓ buttons · min 2";
function ct(e, a) {
  return !e.reserved && ca(e.step) && a[e.step] === void 0;
}
function Wp(e, a) {
  const n = e.find((r) => ct(r, a));
  return n ? n.step : 1;
}
function Kp({ stages: e, onMove: a }) {
  const n = Gn(), r = (l, i) => {
    const s = Wn(l, i);
    n.moved({ id: e[l].id, direction: i }, Kn(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: v.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: v.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: v.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ t(Sa, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t(Sa, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(Un, { text: n.announcement })
  ] });
}
function Gp({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: v.footer, children: [
    /* @__PURE__ */ t("p", { className: v.note, children: Hp }),
    e && /* @__PURE__ */ t("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: v.actions, children: [
      /* @__PURE__ */ t(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Up(e, a) {
  return e !== "" && a !== "" ? null : Fp;
}
function Vp(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = Dp, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [m, w] = p(""), [f, y] = p(""), [E, P] = p(a[0].value), [ae, ge] = p(() => Wp(n, r)), [te, Ee] = p(e.stages ?? jp), [Ve, R] = p(l[0].value), U = { name: m, key: f, streamStep: ae, owner: E, stages: te, policy: Ve }, ye = Up(m, f);
  return /* @__PURE__ */ t(na, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: v.body, children: [
    /* @__PURE__ */ t("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Stream name", value: m, onChange: w }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Key", value: f, onChange: y, mono: !0 }),
      /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: E, onChange: P, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ t(jn, { label: "Stream colour", steps: n, value: ae, onChange: ge, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ t(Kp, { stages: te, onMove: (Fe, yr) => Ee(Xa(te, Fe, yr)) })
    ] }),
    /* @__PURE__ */ t(Tn, { legend: "Loop policy", options: l, value: Ve, onChange: R }),
    /* @__PURE__ */ t(Gp, { reason: ye, onCreate: () => i(U), onDraft: () => s(U) })
  ] }) });
}
const Jn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Yp = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Jp(e, a, n, r, l, i) {
  var c;
  const s = ((c = Jn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function Xp(e, a) {
  return Qp(e) && Zp(e, a) && eg(e);
}
function Qp(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Zp(e, a) {
  return e.colourStep === null || ct({ step: e.colourStep }, a);
}
function eg(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function ag(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : ct({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function tg({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function ng({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: v.webFooter, children: [
    /* @__PURE__ */ o("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ t(tg, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: v.reason, children: Yp })
    ] }),
    l && /* @__PURE__ */ t(b, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function rg({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: v.webHead, children: [
    /* @__PURE__ */ t("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function lg({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: v.webSection, children: [
    /* @__PURE__ */ t("h3", { className: v.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: v.identityRow, children: [
      /* @__PURE__ */ t("div", { className: v.nameCell, children: /* @__PURE__ */ t(M, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ t("div", { className: v.keyCell, children: /* @__PURE__ */ t(M, { variant: "form", label: "Key", value: n, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function og(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [m, w] = p(null), [f, y] = p("relay"), [E, P] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), ae = Jp(l, s, d, m, f, E), ge = Xp(ae, r), te = E.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ee = /* @__PURE__ */ o("div", { className: v.colourCell, children: [
    /* @__PURE__ */ t("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(jn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: w, takenBy: r })
  ] }), Ve = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: v.colourStatus, "data-colour-status": "", children: ag(m, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ o(na, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(rg, { titleId: n }),
    /* @__PURE__ */ o("div", { className: v.webBody, children: [
      /* @__PURE__ */ t(lg, { name: l, setName: i, streamKey: s, setKey: c, colour: Ee, owner: Ve }),
      /* @__PURE__ */ o("section", { className: v.webSection, children: [
        /* @__PURE__ */ o("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: v.sectionNote, children: zp })
        ] }),
        /* @__PURE__ */ t(Op, { stages: E, onChange: P })
      ] }),
      /* @__PURE__ */ t("section", { className: v.webSection, children: /* @__PURE__ */ t(Tn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: Jn, onChange: y }) }),
      /* @__PURE__ */ t(ng, { ready: ge, draft: ae, agentStage: te, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function nT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(og, { ...e }) : /* @__PURE__ */ t(Vp, { ...e });
}
const ig = "_row_bs8hc_2", sg = "_cell_bs8hc_6", cg = "_condition_bs8hc_11", dg = "_action_bs8hc_18", ug = "_contract_bs8hc_24", mg = "_contractCondition_bs8hc_33", hg = "_contractAction_bs8hc_39", Z = {
  row: ig,
  cell: sg,
  condition: cg,
  action: dg,
  contract: ug,
  contractCondition: mg,
  contractAction: hg
}, Xn = ["advance", "block", "escalate", "requestReview"], zt = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Ra(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function dt(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: Z.action, children: zt[e.then] }) : /* @__PURE__ */ t(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: Xn.map((l) => ({ value: l, label: zt[l] }))
    }
  );
}
function wg({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t("span", { className: Z.condition, title: Ra(e, r), children: Ra(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: dt(e, a, n) })
  ] });
}
function fg({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ o("td", { className: Z.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Z.condition, children: Ra(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: dt(e, a, n) })
  ] });
}
function _g({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Z.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Z.contractCondition, children: Ra(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Z.contractAction, children: dt(e, a, n, !0) })
  ] });
}
const vg = { two: fg, four: wg, contract: _g };
function rT(e) {
  var n;
  if (!Xn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = vg[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const bg = "_column_11id3_2", pg = "_head_11id3_17", gg = "_index_11id3_23", yg = "_name_11id3_29", Ng = "_meta_11id3_38", kg = "_mono_11id3_43", $g = "_gate_11id3_50", Cg = "_reviewersLabel_11id3_57", Sg = "_reviewers_11id3_57", Rg = "_reviewer_11id3_57", Tg = "_agents_11id3_74", xg = "_workflowColumn_11id3_79", Lg = "_workflowHead_11id3_96", Ag = "_stageRow_11id3_102", Eg = "_stageLabel_11id3_109", Ig = "_workflowTitle_11id3_116", Mg = "_workflowMeta_11id3_122", Bg = "_workflowGate_11id3_127", Pg = "_gateNote_11id3_135", qg = "_cardNote_11id3_140", Og = "_reviewerList_11id3_145", jg = "_reviewerRow_11id3_151", Dg = "_reviewerMark_11id3_157", Hg = "_reviewerName_11id3_167", Fg = "_terminalCard_11id3_173", zg = "_terminalCount_11id3_182", Wg = "_workflowAgents_11id3_188", Kg = "_mount_11id3_194", S = {
  column: bg,
  head: pg,
  index: gg,
  name: yg,
  meta: Ng,
  mono: kg,
  gate: $g,
  reviewersLabel: Cg,
  reviewers: Sg,
  reviewer: Rg,
  agents: Tg,
  workflowColumn: xg,
  workflowHead: Lg,
  stageRow: Ag,
  stageLabel: Eg,
  workflowTitle: Ig,
  workflowMeta: Mg,
  workflowGate: Bg,
  gateNote: Pg,
  cardNote: qg,
  reviewerList: Og,
  reviewerRow: jg,
  reviewerMark: Dg,
  reviewerName: Hg,
  terminalCard: Fg,
  terminalCount: zg,
  workflowAgents: Wg,
  mount: Kg
}, Gg = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function ut(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Qn(e) {
  return `${Math.round(e * 100)}%`;
}
function Ug({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: S.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: S.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: S.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: S.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Pa, { cells: [
      { value: Qn(e.gateShare), label: "Gate share" },
      { value: ee(e.count), label: "In stage" }
    ] })
  ] });
}
function Vg({ stage: e }) {
  return /* @__PURE__ */ t(Pa, { cells: [
    { value: ee(e.count), label: "In stage" },
    { value: ut(e.closedThisWeek, ee), label: "Closed this week" }
  ] });
}
function Yg({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: S.head, children: [
    /* @__PURE__ */ t("span", { className: S.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: S.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: Gg[e.kind] })
  ] });
}
function Jg({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: S.meta, children: [
    /* @__PURE__ */ o("span", { className: S.mono, children: [
      ee(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: S.mono, children: [
      ce(e.medianWait),
      " median wait"
    ] })
  ] });
}
function Xg({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(Ug, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(Vg, { stage: e }) : null;
}
function Qg({ onMount: e }) {
  return e ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Zg({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: S.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Yg, { stage: e, titleId: l }),
    /* @__PURE__ */ t(Jg, { stage: e }),
    /* @__PURE__ */ t(Xg, { stage: e }),
    /* @__PURE__ */ t("div", { className: S.agents, children: a.map((s) => /* @__PURE__ */ t(nv, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(Qg, { onMount: n })
  ] });
}
const ey = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function ay({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: S.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: S.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: S.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: S.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function ty({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: S.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: S.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(ay, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: S.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Qn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function ny(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function ry({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: S.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: S.terminalCount, children: ut(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: S.cardNote, children: ny(e.rolledBackThisWeek) })
  ] });
}
function ly(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function oy(e) {
  if (e.kind === "terminal") return `${ut(e.closedThisWeek)} this week`;
  const a = ly(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function iy({ stage: e, titleId: a }) {
  const n = ey[e.kind];
  return /* @__PURE__ */ o("header", { className: S.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: S.stageRow, children: [
      /* @__PURE__ */ o("span", { className: S.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: S.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: S.workflowMeta, children: oy(e) })
  ] });
}
function sy(e) {
  return e === "entry" || e === "agent";
}
function cy({ stage: e, onMount: a }) {
  return a === void 0 || !sy(e.kind) ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", className: S.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function dy({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: S.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(iy, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(ty, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(ry, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: S.workflowAgents, children: a }),
    /* @__PURE__ */ t(cy, { stage: e, onMount: n })
  ] });
}
function uy(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function lT(e) {
  return uy(e) ? /* @__PURE__ */ t(dy, { ...e }) : /* @__PURE__ */ t(Zg, { ...e });
}
const my = "_row_1tdra_6", hy = "_name_1tdra_12", wy = "_compactRow_1tdra_13", fy = "_compactName_1tdra_13", _y = "_cell_1tdra_30", vy = "_chain_1tdra_45", by = "_owner_1tdra_51", py = "_mono_1tdra_57", gy = "_compactCell_1tdra_79", yy = "_stack_1tdra_96", Ny = "_stat_1tdra_103", ky = "_identityLine_1tdra_110", $y = "_identity_1tdra_110", Cy = "_ownerLine_1tdra_140", Sy = "_link_1tdra_160", Ry = "_gateMark_1tdra_166", Ty = "_emptyChain_1tdra_171", xy = "_arrow_1tdra_177", Ly = "_muted_1tdra_182", Ay = "_define_1tdra_187", Ey = "_statValue_1tdra_194", Iy = "_policyId_1tdra_200", My = "_sub_1tdra_205", g = {
  row: my,
  name: hy,
  compactRow: wy,
  compactName: fy,
  cell: _y,
  chain: vy,
  owner: by,
  mono: py,
  compactCell: gy,
  stack: yy,
  stat: Ny,
  identityLine: ky,
  identity: $y,
  ownerLine: Cy,
  link: Sy,
  gateMark: Ry,
  emptyChain: Ty,
  arrow: xy,
  muted: Ly,
  define: Ay,
  statValue: Ey,
  policyId: Iy,
  sub: My
};
function Zn(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function By(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Py(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function er(e) {
  return `${ee(e)} ${e === 1 ? "member" : "members"}`;
}
function qy(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${er(e.members)}`;
}
function Oy(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: H(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: qy(e) })
  ] }) });
}
function ar({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function jy(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = ma(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function Dy({ stages: e, streamStep: a }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ t(ar, { name: l.name, gate: l.gate === !0, look: jy(i, n, a), size: "tag" }),
    i === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function Hy(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : Dy(e) });
}
function tr(e) {
  return e === void 0 ? void 0 : !0;
}
function Wt(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": tr(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: a })
  ] }) });
}
function Fy(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function zy(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Wy({ stream: e, href: a, presentation: n }) {
  const r = Py(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Zn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    Oy(e, a),
    Hy(e),
    Wt(zy(e.agents), e.agents === void 0 ? void 0 : By(e.agents), "—"),
    Fy(e.policy),
    Wt(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function Ky(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function oT(e) {
  if (Ky(e)) return Wy(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: Zn, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: H(n), children: a.name }),
      /* @__PURE__ */ t(h, { ...Ba(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(h, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ t("span", { className: g.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: g.link, children: /* @__PURE__ */ t(ar, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ o("span", { className: g.mono, children: [
      a.agents.live,
      " live · ",
      a.agents.draft,
      " draft · ",
      a.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("span", { className: g.owner, children: a.owner }),
      /* @__PURE__ */ t("span", { className: g.mono, children: er(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: a.inFlightHint, "data-raised": tr(a.inFlightHint), children: ee(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const Gy = "_row_2u4ll_2", Uy = "_name_2u4ll_16", Vy = "_scope_2u4ll_24", Ta = {
  row: Gy,
  name: Uy,
  scope: Vy
};
function mt(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Yy(e) {
  return e === void 0 ? `${Ta.row} ward-toolrow` : `${Ta.row} ward-toolrow ${e}`;
}
function Jy(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Xy({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
  return /* @__PURE__ */ t(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: n.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? a : void 0,
      onChange: (i) => {
        r.locked || l(i.target.checked);
      }
    }
  );
}
function Qy({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: mt(e) });
}
function Zy({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${Ta.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function eN(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function iT({ tool: e, onChange: a, presentation: n }) {
  const r = N(), l = N(), i = Jy(e, n), s = eN(n);
  return /* @__PURE__ */ o(s, { className: Yy(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Xy, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${Ta.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(Zy, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(Qy, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const aN = "_strip_4ppv9_2", tN = "_well_4ppv9_11", nN = "_head_4ppv9_18", rN = "_name_4ppv9_24", lN = "_chart_4ppv9_32", oN = "_segment_4ppv9_38", iN = "_detailedChart_4ppv9_44", sN = "_rail_4ppv9_57", cN = "_section_4ppv9_63", dN = "_label_4ppv9_74", uN = "_note_4ppv9_91", G = {
  strip: aN,
  well: tN,
  head: nN,
  name: rN,
  chart: lN,
  segment: oN,
  detailedChart: iN,
  rail: sN,
  section: cN,
  label: dN,
  note: uN
}, mN = "No item in flight to preview.", hN = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", wN = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Qa = [1, 2, 3, 4, 5, 6], xa = 100;
function fN(e, a) {
  return a.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function _N({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: G.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Qa.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: G.segment,
      x: l * xa,
      y: "0",
      width: xa,
      height: "8",
      fill: fN(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function vN(e) {
  const a = e.slice(0, Qa.length);
  for (; a.length < Qa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function bN({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${G.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ t("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, n) => /* @__PURE__ */ t(
      "rect",
      {
        x: String(n * xa),
        y: "0",
        width: String(xa),
        height: "40",
        style: { fill: pe(a.streamStep, "chip") }
      },
      a.key + String(n)
    )) }),
    /* @__PURE__ */ t("figcaption", { className: "ward-seglabels", children: e.map((a, n) => /* @__PURE__ */ t("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(n))) })
  ] });
}
function nr(e) {
  return (a) => e == null ? void 0 : e(a);
}
function _a({ label: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("section", { className: G.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: G.label, children: e }),
    a
  ] });
}
function pN({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: G.note, children: a ?? mN }) : /* @__PURE__ */ t("div", { className: G.well, children: /* @__PURE__ */ t(Oa, { item: { ...e, streamStep: ma(n.streamStep) }, onOpen: nr(r), feed: null }) });
}
function gN({ draft: e }) {
  const a = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: G.head, style: a, children: [
    /* @__PURE__ */ t(He, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...Ba(e.key, e.streamStep) })
  ] });
}
function yN(e) {
  const a = vN(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: G.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(_a, { label: "Board card", children: /* @__PURE__ */ t(pN, { ...e, draft: n }) }),
    /* @__PURE__ */ t(_a, { label: "Streams index row", children: /* @__PURE__ */ t(gN, { draft: n }) }),
    /* @__PURE__ */ o(_a, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(bN, { identities: a }),
      /* @__PURE__ */ t("p", { className: G.note, children: hN })
    ] }),
    /* @__PURE__ */ t(_a, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: G.note, children: wN }) })
  ] });
}
function NN({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: G.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: G.head, children: [
      /* @__PURE__ */ t(He, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: G.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...Ba(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: G.well, children: /* @__PURE__ */ t(Oa, { item: { ...a, streamStep: e.streamStep }, onOpen: nr(r) }) }),
    /* @__PURE__ */ t(_N, { draft: e, streams: n })
  ] });
}
function sT(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(yN, { ...e }) : /* @__PURE__ */ t(NN, { ...e });
}
const kN = "_row_ixlg5_6", $N = "_headCell_ixlg5_10", CN = "_cell_ixlg5_11", SN = "_name_ixlg5_23", RN = "_consequence_ixlg5_29", TN = "_governed_ixlg5_36", xN = "_control_ixlg5_42", LN = "_byRole_ixlg5_48", AN = "_webControl_ixlg5_59", EN = "_webConsequence_ixlg5_65", IN = "_webGoverned_ixlg5_71", D = {
  row: kN,
  headCell: $N,
  cell: CN,
  name: SN,
  consequence: RN,
  governed: TN,
  control: xN,
  byRole: LN,
  webControl: AN,
  webConsequence: EN,
  webGoverned: IN
};
function MN({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: D.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: D.control, children: [
    /* @__PURE__ */ t(
      Ue,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => n(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ t(h, { role: "running", label: "Pilot" })
  ] });
}
function BN({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: D.headCell, children: [
      /* @__PURE__ */ t("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: D.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: D.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: D.cell, children: /* @__PURE__ */ t(MN, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function PN(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function qN({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${D.webControl} ${D.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    Ue,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: n === void 0,
      onChange: (l) => n == null ? void 0 : n(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${D.webControl} ward-envrow`, children: [
    /* @__PURE__ */ t(h, { role: "running", label: "Pilot" }),
    r
  ] });
}
function ON({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ t("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${D.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: D.cell, children: /* @__PURE__ */ t(qN, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: D.cell, children: /* @__PURE__ */ t("span", { className: `${D.webGoverned} ward-cellmeta`, children: PN(e) }) })
  ] });
}
function cT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(ON, { ...e }) : /* @__PURE__ */ t(BN, { ...e });
}
const jN = "_row_vv64h_2", DN = "_cell_vv64h_6", HN = "_name_vv64h_25", FN = "_note_vv64h_30", zN = "_webName_vv64h_41", WN = "_webMeta_vv64h_47", Y = {
  row: jN,
  cell: DN,
  name: HN,
  note: FN,
  webName: zN,
  webMeta: WN
}, rr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function KN(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function GN({ component: e, onRestart: a }) {
  const n = N(), r = rr[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: Y.row, children: [
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: Y.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: Y.cell, "data-mono": "true", children: [
      ee(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(h, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { id: n, className: Y.note, children: e.note }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, "data-align": "end", children: l ? /* @__PURE__ */ t(b, { size: "sm", disabled: !0, describedBy: n, children: "Restart" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function UN({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: KN(e.state) });
}
function VN({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: Y.row, children: [
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: `${Y.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: `${Y.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(h, { ...rr[e.state] }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(UN, { component: e, onRestart: a }) })
  ] });
}
function dT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(VN, { ...e }) : /* @__PURE__ */ t(GN, { ...e });
}
const YN = "_row_jcm5k_7", JN = "_cell_jcm5k_11", XN = "_next_jcm5k_28", QN = "_headCell_jcm5k_38", ZN = "_webId_jcm5k_77", e1 = "_webPurpose_jcm5k_83", a1 = "_webMeta_jcm5k_91", t1 = "_webUrgent_jcm5k_97", F = {
  row: YN,
  cell: JN,
  next: XN,
  headCell: QN,
  webId: ZN,
  webPurpose: e1,
  webMeta: a1,
  webUrgent: t1
}, n1 = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, r1 = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, lr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], l1 = Object.fromEntries(lr.map((e) => [e.key, e]));
function Je({ column: e, children: a }) {
  const n = l1[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: F.cell,
      style: n.width ? { width: n.width } : void 0,
      "data-drop": n.dropPriority,
      "data-mono": n.mono,
      children: a
    }
  );
}
function uT() {
  return /* @__PURE__ */ t("tr", { children: lr.map((e) => /* @__PURE__ */ t(
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
function o1({ cred: e }) {
  const a = n1[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t(Je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Je, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Je, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Je, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: mt(e.cls) }) }),
    /* @__PURE__ */ t(Je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Je, { column: "next", children: /* @__PURE__ */ t("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function i1({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function s1({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(i1, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { ...r1[e.state] }) })
  ] });
}
function mT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(s1, { ...e }) : /* @__PURE__ */ t(o1, { ...e });
}
const c1 = "_card_17zba_2", d1 = "_head_17zba_11", u1 = "_env_17zba_18", m1 = "_version_17zba_25", h1 = "_meta_17zba_32", w1 = "_webCard_17zba_37", f1 = "_webRow_17zba_47", _1 = "_webTitle_17zba_55", v1 = "_webLine_17zba_65", b1 = "_webVersion_17zba_72", p1 = "_webMeta_17zba_77", V = {
  card: c1,
  head: d1,
  env: u1,
  version: m1,
  meta: h1,
  webCard: w1,
  webRow: f1,
  webTitle: _1,
  webLine: v1,
  webVersion: b1,
  webMeta: p1
}, Kt = { dev: "Dev", uat: "UAT", prod: "Prod" }, or = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function g1({ env: e }) {
  const a = or[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: V.card, "aria-label": Kt[e.env], children: [
    /* @__PURE__ */ o("div", { className: V.head, children: [
      /* @__PURE__ */ t("span", { className: V.env, children: Kt[e.env] }),
      /* @__PURE__ */ t(h, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ t("p", { className: V.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: V.meta, children: [
      "deployed ",
      de(e.deployedAt)
    ] }),
    n && /* @__PURE__ */ t("p", { className: V.meta, children: n })
  ] });
}
function y1(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function N1(e) {
  return /* @__PURE__ */ o("article", { className: `${V.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${V.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${V.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...or[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${V.version} ${V.webVersion} ${V.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${V.meta} ${V.webMeta} ${V.webLine} ward-cellmeta`, children: y1(e) })
  ] });
}
function hT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(N1, { ...e }) : /* @__PURE__ */ t(g1, { ...e });
}
const k1 = "_panel_1hmja_2", $1 = "_line_1hmja_8", C1 = "_actions_1hmja_14", va = {
  panel: k1,
  line: $1,
  actions: C1
};
function wT(e) {
  return /* @__PURE__ */ o("div", { className: va.panel, children: [
    /* @__PURE__ */ t("p", { className: va.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: va.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: va.line, children: e.note ?? "" })
  ] });
}
const S1 = "_upload_13fcl_2", R1 = "_preview_13fcl_7", T1 = "_mark_13fcl_17", x1 = "_empty_13fcl_22", L1 = "_actions_13fcl_28", A1 = "_input_13fcl_33", E1 = "_reasons_13fcl_41", I1 = "_reason_13fcl_41", M1 = "_accepted_13fcl_57", ne = {
  upload: S1,
  preview: R1,
  mark: T1,
  empty: x1,
  actions: L1,
  input: A1,
  reasons: E1,
  reason: I1,
  accepted: M1
}, ir = 1.5, sr = 22, La = "script elements or event handlers", Pe = "links or external references", Re = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${ir}px at ${sr}px`], B1 = [Re[1], Re[2], La, Pe], P1 = /* @__PURE__ */ new Map([
  ["image", Re[1]],
  ["text", Re[2]],
  ["tspan", Re[2]],
  ["textPath", Re[2]],
  ["script", La],
  ["foreignObject", La],
  ["a", Pe],
  ["use", Pe],
  ["style", Pe],
  ["feImage", Pe],
  ["set", Pe]
]), q1 = "http://www.w3.org/2000/svg", O1 = "http://www.w3.org/2000/xmlns/", j1 = /* @__PURE__ */ new Set([
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
]), D1 = /* @__PURE__ */ new Set([
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
]), ht = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, H1 = /url\s*\(|['"\\]/i;
function F1() {
  return { ok: !1, reasons: [Re[1]] };
}
function cr(e) {
  return e.namespaceURI === q1;
}
function z1(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && cr(a) ? a : null;
  } catch {
    return null;
  }
}
function W1(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [Re[0]] : [];
}
function K1(e) {
  return P1.get(e.localName) ?? (e.localName.startsWith("animate") ? Pe : void 0);
}
function G1(e) {
  return H1.test(e.replace(ht, ""));
}
function U1(e) {
  return /^on/i.test(e.localName) ? La : e.localName === "href" || G1(e.value) ? Pe : void 0;
}
function V1(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(K1(n));
    for (const r of Array.from(n.attributes)) a.add(U1(r));
  }
  return B1.filter((n) => a.has(n));
}
function Y1(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? sr / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < ir;
  }) ? [Re[3]] : [];
}
function J1(e) {
  if (e.namespaceURI === O1) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (D1.has(a) || a.startsWith("stroke"));
}
function X1(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && cr(a) && j1.has(a.localName);
}
function Q1(e, a) {
  X1(a) ? a.nodeType === Node.ELEMENT_NODE && dr(a) : e.removeChild(a);
}
function dr(e) {
  for (const a of Array.from(e.attributes)) J1(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) Q1(e, a);
  return e;
}
function Z1(e) {
  return Array.from(e.matchAll(ht), (a) => a[2]).filter((a) => a !== "");
}
function ek(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function ak(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of Z1(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function tk(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(ht, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function nk(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = ak(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), tk(l, r);
  }
  return e;
}
function fT(e) {
  const a = z1(e);
  if (a === null) return F1();
  const n = [...W1(a), ...V1(a), ...Y1(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(nk(dr(a), ek(e))) };
}
const rk = "Mark accepted.", lk = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, ok = new Set(an.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function ik(e) {
  return e !== void 0 && (lk.test(e) || ok.has(e)) ? e : void 0;
}
function sk({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: ne.preview, style: { "--mark": ik(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: ne.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: ne.empty }) });
}
function ck(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function dk(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function uk({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: ne.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("p", { className: ne.accepted, children: rk }) }) : /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("ul", { className: ne.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: ne.reason, children: a }, a)) }) });
}
function mk({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(uk, { result: e }) : /* @__PURE__ */ t("p", { className: `${ne.result} ${ck(e, n)}`, role: "status", children: dk(e, n) });
}
function Gt(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function _T({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = _(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const m = a(u);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: ne.upload, children: [
    /* @__PURE__ */ t(sk, { current: e }),
    /* @__PURE__ */ o("div", { className: ne.actions, children: [
      /* @__PURE__ */ t(
        "input",
        {
          ref: i,
          className: ne.input,
          type: "file",
          accept: "image/svg+xml",
          "aria-label": "Mark file",
          disabled: l !== void 0,
          onChange: (u) => {
            var m;
            return d((m = u.target.files) == null ? void 0 : m[0]);
          }
        }
      ),
      /* @__PURE__ */ t(b, { ...Gt(l), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(b, { ...Gt(l), variant: "ghost", onClick: n, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(mk, { result: s, presentation: r })
  ] });
}
const hk = "_row_o3t6y_7", wk = "_cell_o3t6y_11", fk = "_head_o3t6y_28", _k = "_name_o3t6y_34", vk = "_pinned_o3t6y_42", bk = "_headCell_o3t6y_49", pk = "_webName_o3t6y_88", gk = "_webMeta_o3t6y_95", yk = "_webWarn_o3t6y_103", q = {
  row: hk,
  cell: wk,
  head: fk,
  name: _k,
  pinned: vk,
  headCell: bk,
  webName: pk,
  webMeta: gk,
  webWarn: yk
}, wt = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, ur = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Nk = Object.fromEntries(ur.map((e) => [e.key, e]));
function kk(e, a) {
  return `mcp.${e}.${a}`;
}
function $k(e) {
  return Object.keys(wt).includes(e);
}
function Ck(e) {
  return wt[e !== void 0 && $k(e) ? e : "unknown"];
}
function ra({ column: e, children: a }) {
  const n = Nk[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: q.cell,
      style: n.width ? { width: n.width } : void 0,
      "data-drop": n.dropPriority,
      "data-mono": n.mono,
      children: a
    }
  );
}
function vT() {
  return /* @__PURE__ */ t("tr", { children: ur.map((e) => /* @__PURE__ */ t(
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
function Sk({ server: e }) {
  const a = wt[e.connection];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o(ra, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: q.head, children: [
        /* @__PURE__ */ t("span", { className: q.name, children: e.name }),
        /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: mt(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: q.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(ra, { column: "connection", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(ra, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(ra, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(ra, { column: "tools", children: e.tools.map((n) => kk(e.name, n)).join(" · ") })
  ] });
}
function Rk(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Tk(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function xk({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Lk({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Ak({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function Ek({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ t("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: Rk(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(h, { ...Tk(e) }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(xk, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(h, { ...Ck(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ t(Lk, { server: e, onRestart: a }),
      /* @__PURE__ */ t(Ak, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function bT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Ek, { ...e }) : /* @__PURE__ */ t(Sk, { ...e });
}
const Ik = "_row_1ibo7_2", Mk = "_headCell_1ibo7_14", Bk = "_cell_1ibo7_15", Pk = "_name_1ibo7_26", qk = "_consequence_1ibo7_32", Ok = "_reason_1ibo7_38", jk = "_value_1ibo7_44", Dk = "_webRow_1ibo7_60", Hk = "_webSetting_1ibo7_73", Fk = "_webName_1ibo7_81", zk = "_webConsequence_1ibo7_89", Wk = "_webControl_1ibo7_95", Kk = "_webState_1ibo7_109", Gk = "_webChip_1ibo7_114", I = {
  row: Ik,
  headCell: Mk,
  cell: Bk,
  name: Pk,
  consequence: qk,
  reason: Ok,
  value: jk,
  webRow: Dk,
  webSetting: Hk,
  webName: Fk,
  webConsequence: zk,
  webControl: Wk,
  webState: Kk,
  webChip: Gk
}, mr = 104, hr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function Uk({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Ue, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(Sn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function Vk({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = hr[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(Uk, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: mr }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function wr(e, a) {
  return String(e ?? a);
}
function Yk(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Jk(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? wr(e.value, "—");
}
function Xk({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(Ue, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function Qk(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(Xk, { ...e });
  const l = Yk(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(Sn, { options: l, value: wr(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: Jk(a) });
}
function Zk({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(Qk, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: mr }, children: /* @__PURE__ */ t(h, { ...hr[n], size: "tag" }) })
  ] });
}
function pT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Zk, { ...e }) : /* @__PURE__ */ t(Vk, { ...e });
}
const e$ = "_label_h9m4w_7", a$ = "_name_h9m4w_15", t$ = "_column_h9m4w_24", n$ = "_webFrame_h9m4w_57", r$ = "_webHead_h9m4w_62", l$ = "_webHeadLabel_h9m4w_74", o$ = "_webLabel_h9m4w_117", i$ = "_webColumns_h9m4w_124", s$ = "_webGroup_h9m4w_130", c$ = "_webPeople_h9m4w_131", d$ = "_webVia_h9m4w_132", u$ = "_webMeta_h9m4w_161", z = {
  label: e$,
  name: a$,
  column: t$,
  webFrame: n$,
  webHead: r$,
  webHeadLabel: l$,
  webLabel: o$,
  webColumns: i$,
  webGroup: s$,
  webPeople: c$,
  webVia: d$,
  webMeta: u$
}, m$ = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, Ka = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Ga({ column: e, children: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: z.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function h$(e) {
  if (!e.matrixRole) return;
  const a = m$[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function w$({ node: e }) {
  const a = h$(e);
  return /* @__PURE__ */ o("span", { className: z.label, children: [
    /* @__PURE__ */ t("span", { className: z.name, children: e.name }),
    /* @__PURE__ */ t(f$, { role: a, node: e }),
    /* @__PURE__ */ t(Ga, { column: Ka[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Ga, { column: Ka[1], children: e.people === void 0 ? "" : ee(e.people) }),
    /* @__PURE__ */ t(Ga, { column: Ka[2], children: e.requestedVia ?? "" })
  ] });
}
function f$({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function _$({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ t(
    In,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ t(w$, { node: n }),
      children: s
    }
  );
}
function Ua({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function v$({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ua, { className: `${z.webMeta} ${z.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ua, { className: `${z.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ua, { className: `${z.webMeta} ${z.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function b$() {
  return /* @__PURE__ */ o("div", { className: z.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: z.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: z.webColumns, children: [
      /* @__PURE__ */ t("span", { className: z.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: z.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: z.webVia, children: "Requested via" })
    ] })
  ] });
}
function p$({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function g$(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function y$({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: z.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(b$, {}),
    /* @__PURE__ */ t(th, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      In,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(p$, { row: n }),
        detail: /* @__PURE__ */ t(v$, { row: n }),
        expanded: g$(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function gT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(y$, { ...e }) : /* @__PURE__ */ t(_$, { ...e });
}
const N$ = "_runbook_b9agc_2", k$ = "_list_b9agc_7", $$ = "_step_b9agc_15", C$ = "_numeral_b9agc_21", S$ = "_body_b9agc_28", R$ = "_head_b9agc_34", T$ = "_title_b9agc_40", x$ = "_detail_b9agc_45", L$ = "_actions_b9agc_50", A$ = "_webList_b9agc_56", E$ = "_webStep_b9agc_60", I$ = "_webBody_b9agc_66", M$ = "_webTitle_b9agc_74", B$ = "_webDetail_b9agc_78", L = {
  runbook: N$,
  list: k$,
  step: $$,
  numeral: C$,
  body: S$,
  head: R$,
  title: T$,
  detail: x$,
  actions: L$,
  webList: A$,
  webStep: E$,
  webBody: I$,
  webTitle: M$,
  webDetail: B$
}, fr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function _r(e) {
  return String(e + 1).padStart(2, "0");
}
function P$({ step: e, index: a, connection: n }) {
  const r = fr[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: L.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: L.numeral, children: _r(a) }),
    /* @__PURE__ */ o("span", { className: L.body, children: [
      /* @__PURE__ */ o("span", { className: L.head, children: [
        /* @__PURE__ */ t("span", { className: L.title, children: e.title }),
        /* @__PURE__ */ t(h, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ t(Le, { startedAt: e.startedAt, connection: n })
      ] }),
      /* @__PURE__ */ t("span", { className: L.detail, children: e.detail })
    ] })
  ] });
}
function q$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ t("ol", { className: L.list, children: e.map((r, l) => /* @__PURE__ */ t(P$, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: L.actions, children: a })
  ] });
}
function O$({ step: e, index: a, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${L.step} ${L.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${L.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: _r(a) }),
    /* @__PURE__ */ o("span", { className: `${L.body} ${L.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${L.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${L.title} ${L.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(h, { ...fr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t(Le, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${L.detail} ${L.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function j$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${L.list} ${L.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(O$, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${L.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function yT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(j$, { ...e }) : /* @__PURE__ */ t(q$, { ...e });
}
const D$ = "_list_1gu6a_2", H$ = "_check_1gu6a_10", F$ = "_body_1gu6a_16", z$ = "_text_1gu6a_23", W$ = "_pending_1gu6a_32", K$ = "_measured_1gu6a_37", Qe = {
  list: D$,
  check: H$,
  body: F$,
  text: z$,
  pending: W$,
  measured: K$
};
function G$(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function U$({ check: e }) {
  const a = G$(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Qe.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ t(ot, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: Qe.body, children: [
      /* @__PURE__ */ t("span", { className: Qe.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Qe.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ t("span", { className: Qe.measured, children: e.measured })
  ] });
}
function NT({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(U$, { check: a }, a.text)) });
}
const V$ = "_root_4aacj_2", Y$ = "_list_4aacj_10", J$ = "_line_4aacj_26", X$ = "_at_4aacj_53", Q$ = "_text_4aacj_57", Z$ = "_foot_4aacj_61", e0 = "_idle_4aacj_73", a0 = "_caret_4aacj_81", t0 = "_jump_4aacj_88", we = {
  root: V$,
  list: Y$,
  line: J$,
  at: X$,
  text: Q$,
  foot: Z$,
  idle: e0,
  caret: a0,
  jump: t0
}, n0 = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function ft(e) {
  return Number.isNaN(Date.parse(e)) ? "" : n0.format(new Date(e));
}
const r0 = { warn: "warning", ok: "ok" };
function l0({ kind: e }) {
  const a = r0[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function o0({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${ft(e)}` });
}
function i0({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${ft(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${we.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${we.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: we.idle, children: i }),
    /* @__PURE__ */ t(o0, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const s0 = 8;
function c0(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > s0;
}
function d0({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${we.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const vr = xe(null);
function kT({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Xt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(vr.Provider, { value: i, children: n });
}
function u0() {
  const e = Te(vr), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function $T({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = _(null), [i, s] = p(0), [c, d] = u0(), [u, m] = p(!1), w = e.at(-1);
  C(() => {
    s(e.length);
  }, [e.length]), aa(() => {
    const y = l.current;
    y && !u && (y.scrollTop = y.scrollHeight);
  }, [e.length, u]);
  const f = () => {
    var P;
    const y = l.current;
    if (!y) return;
    const E = y.querySelectorAll("[data-consline-text]");
    (P = E.item(E.length - 1)) == null || P.focus(), m(!1);
  };
  return /* @__PURE__ */ o("div", { className: we.root, children: [
    /* @__PURE__ */ t("ol", { className: we.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, "data-empty": e.length === 0 || void 0, onScroll: (y) => m(c0(y.currentTarget)), children: e.map((y, E) => /* @__PURE__ */ o("li", { className: `${we.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": E < i, children: [
      /* @__PURE__ */ t("span", { className: we.at, children: ft(y.at) }),
      /* @__PURE__ */ t(l0, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: we.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${E}`)) }),
    /* @__PURE__ */ o(i0, { connection: a, idleSince: n, last: w, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${we.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t(d0, { shown: u, onJump: f })
    ] })
  ] });
}
const m0 = "_row_1k8wl_2", h0 = "_head_1k8wl_14", w0 = "_author_1k8wl_20", f0 = "_eta_1k8wl_25", _0 = "_edited_1k8wl_26", v0 = "_body_1k8wl_32", b0 = "_reason_1k8wl_37", p0 = "_actions_1k8wl_42", ke = {
  row: m0,
  head: h0,
  author: w0,
  eta: f0,
  edited: _0,
  body: v0,
  reason: b0,
  actions: p0
}, g0 = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function y0(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function N0({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", onClick: n, children: "Edit" }),
    /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", onClick: n, children: "Edit" }),
    /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function k0({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: ke.reason, id: a, children: e })
  ] });
}
function $0(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function C0(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(N0, { ...e }) : /* @__PURE__ */ t(k0, { reason: e.unavailable, reasonId: e.unavailableId });
}
function CT(e) {
  const { comment: a } = e;
  $0(e);
  const n = N(), r = `${n}-unavailable`, l = g0[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${ke.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: ke.head, children: [
      /* @__PURE__ */ t("span", { className: ke.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: ke.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: ke.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: ke.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: ke.reason, id: n, children: y0(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: ke.actions, children: /* @__PURE__ */ t(C0, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const S0 = "_root_rvhdw_2", R0 = "_attach_rvhdw_11", T0 = "_actions_rvhdw_17", x0 = "_reply_rvhdw_23", L0 = "_replyField_rvhdw_28", A0 = "_send_rvhdw_54", E0 = "_sendIcon_rvhdw_65", I0 = "_sendsAs_rvhdw_75", Oe = {
  root: S0,
  attach: R0,
  actions: T0,
  reply: x0,
  replyField: L0,
  send: A0,
  sendIcon: E0,
  sendsAs: I0
};
function br({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function M0() {
  return /* @__PURE__ */ t("svg", { className: Oe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function B0(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function P0(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = br(e), s = N(), c = () => {
    l.trim() !== "" && r(n, l);
  }, d = (u) => {
    B0(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: Oe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Oe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ t(M, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: Oe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ t(M0, {}),
        /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: Oe.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function ST(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(P0, { ...e }) : /* @__PURE__ */ t(q0, { ...e });
}
function q0(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = br(e);
  return /* @__PURE__ */ o("div", { className: Oe.root, children: [
    /* @__PURE__ */ t(M, { kind: "textarea", label: a, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: Oe.attach, children: [
      /* @__PURE__ */ t(h, { role: "soft", label: r.label }),
      /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ t(
      sn,
      {
        label: `Requeue ${l.agent} after posting`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Oe.actions, children: [
      /* @__PURE__ */ t(b, { variant: "primary", onClick: () => i(n, c), children: `Post as ${n}` }),
      s && /* @__PURE__ */ t(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const O0 = "_list_1yhks_2", j0 = "_item_1yhks_6", D0 = "_body_1yhks_22", H0 = "_text_1yhks_28", F0 = "_evidence_1yhks_37", z0 = "_consequence_1yhks_49", W0 = "_note_1yhks_54", Ge = {
  list: O0,
  item: j0,
  body: D0,
  text: H0,
  evidence: F0,
  consequence: z0,
  note: W0
};
function K0({ criterion: e }) {
  return /* @__PURE__ */ t(He, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Ut({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function G0(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function U0({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Ge.body, children: [
    /* @__PURE__ */ t("span", { className: Ge.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Ut, { text: " · " }),
      /* @__PURE__ */ t("code", { className: Ge.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Ut, { text: " · " }),
      /* @__PURE__ */ t("span", { className: Ge.consequence, children: G0(e.why) })
    ] })
  ] });
}
function V0({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Ge.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(K0, { criterion: e }),
    /* @__PURE__ */ t(U0, { criterion: e })
  ] });
}
function RT({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${Ge.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(V0, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: Ge.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const Y0 = "_list_dwhoz_2", J0 = "_rung_dwhoz_6", X0 = "_name_dwhoz_18", Q0 = "_actor_dwhoz_32", ya = {
  list: Y0,
  rung: J0,
  name: X0,
  actor: Q0
}, Z0 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function eC({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = Z0[e.state];
  return /* @__PURE__ */ o("li", { className: ya.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ya.name, children: e.name }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ya.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function TT({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ya.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(eC, { rung: a }, a.name)) });
}
const aC = "_sheet_pw37w_2", tC = "_title_pw37w_9", nC = "_stage_pw37w_15", rC = "_effects_pw37w_20", lC = "_effect_pw37w_20", oC = "_numeral_pw37w_31", iC = "_effectText_pw37w_38", sC = "_refusals_pw37w_43", cC = "_reasons_pw37w_52", dC = "_reason_pw37w_52", uC = "_actions_pw37w_62", ue = {
  sheet: aC,
  title: tC,
  stage: nC,
  effects: rC,
  effect: lC,
  numeral: oC,
  effectText: iC,
  refusals: sC,
  reasons: cC,
  reason: dC,
  actions: uC
};
function mC({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function xT({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = N(), d = `${c}-refusal`, [u, m] = p(""), w = n.length > 0;
  return /* @__PURE__ */ t(na, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ t("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ t("ol", { className: ue.effects, children: a.map((f, y) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ t("span", { className: ue.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: ue.effectText, children: f })
    ] }, f)) }),
    /* @__PURE__ */ t(
      ju,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ t(M, { kind: "textarea", label: "Note for the agent", value: u, onChange: m }),
    w && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ t(h, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ t("ul", { className: ue.reasons, children: n.map((f, y) => /* @__PURE__ */ t("li", { className: ue.reason, id: y === 0 ? d : void 0, children: f.reason }, f.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ t(mC, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ t(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const hC = "_list_1rowi_2", wC = "_path_1rowi_7", fC = "_head_1rowi_21", _C = "_label_1rowi_28", vC = "_consequence_1rowi_35", bC = "_ask_1rowi_36", ea = {
  list: hC,
  path: wC,
  head: fC,
  label: _C,
  consequence: vC,
  ask: bC
}, Za = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Vt(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Yt(e) {
  return e ? "primary" : "secondary";
}
function pC({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(b, { variant: Yt(a), size: "sm", onClick: () => n(e.kind), children: Za[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: Yt(a), size: "sm", disabled: !0, describedBy: r, children: Za[e.kind] }),
    /* @__PURE__ */ t("span", { className: ea.ask, id: r, children: e.askInstead })
  ] });
}
function gC({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: ea.path, "data-allowed": e.allowed, "data-role": Vt(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: ea.head, children: [
      /* @__PURE__ */ t("span", { className: ea.label, children: e.title ?? Za[e.kind] }),
      /* @__PURE__ */ t(h, { role: Vt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: ea.consequence, children: e.consequence }),
    /* @__PURE__ */ t(pC, { path: e, primary: a, onChoose: n })
  ] });
}
function LT({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: ea.list, children: e.map((n, r) => /* @__PURE__ */ t(gC, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const yC = "_list_1m7i0_2", NC = "_item_1m7i0_6", kC = "_node_1m7i0_18", $C = "_body_1m7i0_24", CC = "_head_1m7i0_30", SC = "_stage_1m7i0_36", RC = "_version_1m7i0_41", TC = "_sentence_1m7i0_49", xC = "_meta_1m7i0_54", Ce = {
  list: yC,
  item: NC,
  node: kC,
  body: $C,
  head: CC,
  stage: SC,
  version: RC,
  sentence: TC,
  meta: xC
}, LC = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function AC({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ce.head, children: [
    /* @__PURE__ */ t("span", { className: Ce.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: Ce.version, title: e.version, children: e.version }) : null
  ] });
}
function EC({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ce.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${Ce.node} ward-history-node`, children: /* @__PURE__ */ t(He, { size: 9, kind: LC[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ce.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(AC, { entry: e }),
      /* @__PURE__ */ t("span", { className: Ce.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ce.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function AT({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${Ce.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(EC, { entry: a }, a.stage + String(n))) });
}
const IC = "_thread_1e70p_3", MC = "_turn_1e70p_8", BC = "_who_1e70p_27", PC = "_body_1e70p_32", Na = {
  thread: IC,
  turn: MC,
  who: BC,
  body: PC
}, pr = xe(!1);
function ET({ children: e, density: a }) {
  return /* @__PURE__ */ t(pr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${Na.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function IT({ turn: e }) {
  if (!Te(pr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${Na.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${Na.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${Na.body} ward-chat-body`, children: e.body })
  ] });
}
const qC = "_list_yiolt_3", OC = "_row_yiolt_7", jC = "_label_yiolt_20", DC = "_n_yiolt_26", HC = "_cause_yiolt_33", oa = {
  list: qC,
  row: OC,
  label: jC,
  n: DC,
  cause: HC
};
function FC(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const zC = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function WC({ row: e, formatNumber: a }) {
  return FC(e), /* @__PURE__ */ o("li", { className: `${oa.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(He, { size: 8, ...zC[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: oa.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${oa.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(KC, { cause: e.cause })
  ] });
}
function KC({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${oa.cause} ward-healthrow-cause`, children: e }) : null;
}
function MT({ rows: e, formatNumber: a = ee }) {
  return /* @__PURE__ */ t("ul", { className: `${oa.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(WC, { row: n, formatNumber: a }, n.label)) });
}
const GC = "_root_1jxwp_2", UC = {
  root: GC
};
function BT({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: UC.root, "data-density": l, children: [
    /* @__PURE__ */ t(ja, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const VC = "_row_dhbre_3", YC = "_key_dhbre_13", JC = "_stack_dhbre_24", XC = "_value_dhbre_32", QC = "_evidence_dhbre_39", ZC = "_mark_dhbre_47", Xe = {
  row: VC,
  key: YC,
  stack: JC,
  value: XC,
  evidence: QC,
  mark: ZC
};
function eS({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(ot, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function PT({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(eS, { state: e.state }) })
  ] });
}
const aS = "_cell_gh2sd_2", tS = {
  cell: aS
}, nS = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function rS(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function lS(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function oS(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: rS(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function iS(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function qT({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  lS(e, n);
  const r = iS(e);
  return /* @__PURE__ */ t(
    Zu,
    {
      label: "Rejection routing",
      columns: nS,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: tS.cell, "data-norerun": l.noRerun ? !0 : void 0, children: oS(l, i) }),
      empty: a ?? /* @__PURE__ */ t(Hh, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const sS = "_row_1f2re_2", cS = "_title_1f2re_12", dS = "_turns_1f2re_18", uS = "_waiting_1f2re_19", mS = "_resolved_1f2re_20", hS = "_activity_1f2re_21", wS = "_cost_1f2re_28", fS = "_link_1f2re_29", _S = "_tableLink_1f2re_47", vS = "_tableRecord_1f2re_48", bS = "_tableRow_1f2re_59", pS = "_tableTitle_1f2re_71", gS = "_tableResolved_1f2re_76", yS = "_tableMeta_1f2re_87", NS = "_tableCost_1f2re_94", kS = "_tableActivity_1f2re_95", $S = "_tableState_1f2re_105", j = {
  row: sS,
  title: cS,
  turns: dS,
  waiting: uS,
  resolved: mS,
  activity: hS,
  cost: wS,
  link: fS,
  tableLink: _S,
  tableRecord: vS,
  tableRow: bS,
  tableTitle: pS,
  tableResolved: gS,
  tableMeta: yS,
  tableCost: NS,
  tableActivity: kS,
  tableState: $S
}, gr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function CS(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function SS(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function RS(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const TS = { duplicate: "Closed · duplicate" };
function xS({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(ta, { className: j.tableMeta, text: `waiting on ${e}` });
}
function LS({ value: e }) {
  return /* @__PURE__ */ t("td", { className: j.tableCost, children: e === void 0 ? null : re(e) });
}
function AS({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${j.tableRecord} ward-target`, href: H(e.href), children: `→ ${e.key}` });
}
function ES({ session: e, href: a }) {
  const n = gr[e.state];
  return /* @__PURE__ */ o("tr", { className: j.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: j.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${j.tableLink} ward-target`, href: H(a), children: /* @__PURE__ */ t(ta, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: j.tableMeta, children: SS(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: j.tableResolved, children: [
      RS(e.resolved),
      /* @__PURE__ */ t(xS, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(LS, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: j.tableActivity, children: CS(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: j.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: TS[e.state] ?? n.label }),
      /* @__PURE__ */ t(AS, { link: e.link })
    ] }) })
  ] });
}
function IS({ session: e }) {
  const a = gr[e.state];
  return /* @__PURE__ */ o("div", { className: j.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t(ta, { className: j.title, text: e.title }),
    /* @__PURE__ */ t("span", { className: j.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t(ta, { className: j.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: j.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: j.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : re(e.cost) }),
    /* @__PURE__ */ t("span", { className: j.activity, children: de(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: j.link, href: H(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function OT(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(ES, { session: e.session, href: e.href }) : /* @__PURE__ */ t(IS, { session: e.session });
}
const MS = "_block_1yy2v_3", BS = "_list_1yy2v_9", PS = "_line_1yy2v_14", et = {
  block: MS,
  list: BS,
  line: PS
}, qS = { warn: "warning", ok: "ok" };
function OS({ kind: e }) {
  const a = qS[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function jS({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${et.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(OS, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function jT({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${et.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: et.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(jS, { line: n }, `${r}-${n.text}`)) }) });
}
const DS = "_band_tt7hp_1", HS = "_head_tt7hp_8", FS = "_cell_tt7hp_19", zS = "_index_tt7hp_35", WS = "_title_tt7hp_42", KS = "_note_tt7hp_48", GS = "_cellTitle_tt7hp_53", US = "_cellBody_tt7hp_58", VS = "_tag_tt7hp_64", Ne = {
  band: DS,
  head: HS,
  cell: FS,
  index: zS,
  title: WS,
  note: KS,
  cellTitle: GS,
  cellBody: US,
  tag: VS
}, Jt = 4;
function DT({ index: e, title: a, note: n, cells: r }) {
  if (r.length !== Jt)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Jt}-cell grid`);
  return /* @__PURE__ */ o("section", { className: Ne.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: Ne.head, children: [
      /* @__PURE__ */ t("span", { className: Ne.index, children: e }),
      /* @__PURE__ */ t("span", { className: Ne.title, children: a }),
      /* @__PURE__ */ t("span", { className: Ne.note, children: n })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: Ne.cell, children: [
      /* @__PURE__ */ t("span", { className: Ne.cellTitle, children: l.title }),
      /* @__PURE__ */ t("span", { className: Ne.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ t("span", { className: Ne.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  lR as ACCENT_PRESETS,
  $R as ActionStack,
  $T as ActivityConsole,
  hR as AdminIcon,
  nv as AgentCard,
  wR as AppShell,
  sT as AppearanceStrip,
  DT as Band,
  yR as BarChart,
  yw as BoardColumn,
  HR as BoardFootnote,
  FR as BoardHeader,
  uR as BoardIcon,
  ER as BoardScroller,
  b as Btn,
  rR as CHIP_ROLES,
  lr as CREDENTIAL_COLUMNS,
  gR as Callout,
  cT as CapabilityRow,
  MR as CardGrid,
  IT as ChatMessage,
  sn as Checkbox,
  h as Chip,
  ta as ClampText,
  CT as ClarificationRow,
  QR as ClauseRuleRow,
  XR as ClauseRules,
  jn as ColourLadder,
  dT as ComponentRow,
  ST as Composer,
  WR as ConfigRow,
  zR as ConfigRowHead,
  it as ConnectionMark,
  kT as ConsoleAnnounceProvider,
  ET as Conversation,
  ju as CostMeter,
  mT as CredentialRow,
  uT as CredentialRowHead,
  RT as CriteriaList,
  zi as Crumb,
  oR as DENSITIES,
  MT as DeliveryHealth,
  PR as DeniedState,
  cR as DisabledScope,
  eT as DryRunRail,
  Hh as EmptyState,
  hT as EnvCard,
  M as Field,
  BR as FilteredEmpty,
  LR as FormStack,
  ja as GateChecklist,
  TT as GateLadder,
  Zu as Grid,
  tT as HandoffRuleRow,
  aT as HandoffRules,
  dR as HomeIcon,
  KR as ItemDrawer,
  wT as KeyPanel,
  Fr as LIVE_EVENT_TYPES,
  C_ as LegacyBoardColumn,
  UR as LegacyBoardHeader,
  VR as LegacyConfigRow,
  JR as LegacyItemDrawer,
  b_ as LegacyOverCapNote,
  YR as LegacyPreviewRail,
  Pn as LegacyWorkCard,
  Le as LiveIndicator,
  qR as LoadFailed,
  DR as Loading,
  ur as MCP_SERVER_COLUMNS,
  ot as Mark,
  _T as MarkUpload,
  He as Marker,
  bT as McpServerRow,
  vT as McpServerRowHead,
  dc as Menu,
  Js as MenuButton,
  nT as NewStreamModal,
  Wh as OverCapNote,
  Ma as OverflowRow,
  na as Overlay,
  ZR as PARTIAL_STEP_REASON,
  mr as POLICY_CHIP_WIDTH,
  RR as PageFrame,
  pR as PageHeader,
  NR as PlainList,
  pT as PolicyRow,
  GR as PreviewRail,
  Ka as ROLE_MATRIX_COLUMNS,
  Xn as RULE_ACTIONS,
  Tn as Radio,
  BT as ReadyChecklist,
  xR as RecordSection,
  xT as RequeueSheet,
  LT as ResolveBlock,
  PT as ResolvedFieldRow,
  gT as RoleMatrixRow,
  qT as RoutingTable,
  rT as RuleRow,
  yT as RunbookSteps,
  Hr as STREAM_STEPS,
  AR as SectionBand,
  It as SectionHeader,
  Sn as SegmentedControl,
  _n as Select,
  OT as SessionRow,
  vR as Sidebar,
  lT as StageColumn,
  IR as StageGrid,
  AT as StageHistory,
  Op as StageListEditor,
  OR as StaleStrip,
  Pa as StatStrip,
  CR as StatTiles,
  bR as StreamAvatar,
  oT as StreamRow,
  mR as StudioIcon,
  TR as SubjectRail,
  Ue as Switch,
  _R as TabLinks,
  kR as TableHead,
  fR as Tabs,
  eR as ThemeProvider,
  iT as ToolRow,
  SR as TopBar,
  th as Tree,
  In as TreeRow,
  jT as TypedInputBlock,
  To as UNSAFE_HREF,
  NT as ValidationList,
  QS as VisibilityProvider,
  ZS as Visible,
  nR as WARD_VERSION,
  Oa as WorkCard,
  jR as WriteUnavailableStrip,
  CS as agoSince,
  Tr as clock,
  ag as colourStatus,
  ee as count,
  ce as duration,
  at as elapsed,
  tR as eventSourceTransport,
  Ea as isStreamStep,
  ca as isValidatedStreamStep,
  Iv as ladderValidation,
  Ck as mcpConnectionChip,
  kk as mcpToolName,
  re as money,
  fe as ms,
  Mn as ordered,
  Zt as ratio,
  KN as restartLabel,
  H as safeHref,
  de as stamp,
  tt as stream,
  iR as streamChip,
  Ba as streamChipProps,
  pe as streamColour,
  Kr as streamHex,
  _d as streamInitials,
  zr as streamVars,
  ba as useBorderFlash,
  Ae as useDisabledScope,
  Or as useFocusTrap,
  sR as useLiveFeed,
  aR as useReturnFocus,
  Aa as useRovingTabindex,
  nt as useTicker,
  xr as useVisible,
  W as v,
  fT as validateMark,
  ma as validatedStep,
  an as validatedStreamSteps
};
