import { jsx as t, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as Jt, useContext as Re, createContext as Te, useState as p, useEffect as S, useCallback as Q, useRef as _, useLayoutEffect as aa, useId as N, isValidElement as yr, Children as Nr, Fragment as kr } from "react";
import { createPortal as $r, flushSync as Xt } from "react-dom";
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
const Cr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = Cr.formatToParts(new Date(e)), n = (r) => {
    var l;
    return ((l = a.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${n("day")} ${n("month")} ${n("hour")}:${n("minute")}`;
}
function ne(e) {
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
function Qt(e, a) {
  return `${e} / ${a}`;
}
const Sr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Rr(e) {
  return Sr.format(new Date(e));
}
const Zt = Te(/* @__PURE__ */ new Set());
function GS({ hidden: e, children: a }) {
  const n = Jt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Zt.Provider, { value: n, children: a });
}
function Tr(e) {
  return !Re(Zt).has(e);
}
function US({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(T, { children: Tr(e) ? a : n });
}
const Lr = "(prefers-color-scheme: dark)";
function vt() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Lr) : null;
}
function xr(e) {
  const [a, n] = p(() => {
    var r;
    return ((r = vt()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? vt() : null;
    if (!r) return;
    const l = () => n(r.matches);
    return l(), r.addEventListener("change", l), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function Oa(e, a) {
  S(() => {
    const n = document.documentElement;
    return n.setAttribute(e, a), () => n.removeAttribute(e);
  }, [e, a]);
}
function Ar(e, a) {
  return e !== "system" ? e : a ? "dark" : "light";
}
function VS({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
  const l = xr(e === "system");
  return Oa("data-theme", Ar(e, l)), Oa("data-accent", a), Oa("data-density", n), /* @__PURE__ */ t(T, { children: r });
}
const Er = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Ir(e, a) {
  return document.activeElement === a || document.activeElement === e;
}
function Mr(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function qr(e, a, n, r) {
  return e.shiftKey ? Ir(a, n) ? r : void 0 : document.activeElement === r || Mr(a) ? n : void 0;
}
function Br(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = qr(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Pr(e) {
  return { onKeyDown: Q(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Er));
      Br(n, e.current, r);
    },
    [e]
  ) };
}
function YS(e, a = !0) {
  S(() => {
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
function xa({ orientation: e = "both" } = {}) {
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
const JS = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, XS = "0.2.0", QS = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Or = [1, 2, 3, 4, 5, 6], en = [1, 2, 3], Hr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], ZS = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], eR = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], W = {
  color: {
    bg: "var(--ward-color-bg)",
    surface: "var(--ward-color-surface)",
    surface2: "var(--ward-color-surface2)",
    line: "var(--ward-color-line)",
    line2: "var(--ward-color-line2)",
    edge: "var(--ward-color-edge)",
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
function Aa(e) {
  return Or.includes(e);
}
function sa(e) {
  return en.includes(e);
}
function Fr(e) {
  if (!Aa(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function aR(e) {
  if (!Aa(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const zr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Wr(e) {
  if (!Aa(e)) throw new Error("unvalidated stream step");
  return zr[e];
}
function gt(e) {
  return typeof e != "string" ? null : Hr.includes(e) ? e : null;
}
function Kr(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Gr(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Ur(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Vr(e, a, n) {
  const r = Kr(e);
  if (r === null) return null;
  const l = gt(n) ?? gt(r.type);
  return l === null ? null : { ...r, type: l, id: Gr(r, a), at: Ur(r) };
}
function Yr(e, a) {
  return e >= fe.staleAfter ? "stale" : e >= fe.heartbeat && a === "live" ? "reconnecting" : null;
}
function Jr(e, a, n) {
  return e >= fe.heartbeat && !a && n !== null;
}
function tR(e, a) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = _(/* @__PURE__ */ new Map()), c = _(0), d = _(""), u = _(0), m = _(null), w = _(0), f = _(0), y = _(!1), x = _("reconnecting"), B = Q((R) => {
    x.current = R, r(R);
  }, []), le = Q(() => {
    c.current = Date.now();
  }, []), Ae = Q((R) => {
    for (const [U, ge] of s.current)
      (ge === "*" || R.itemKey === ge) && U(R);
  }, []), ae = Q(() => {
    m.current = a(e, { lastEventId: d.current }, {
      onEvent: (R, U, ge) => {
        const He = Vr(R, U, ge);
        He !== null && (He.id && (d.current = He.id), le(), y.current = !1, B("live"), i(He.at), Ae(He));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, le(), B("live");
      },
      onError: () => {
        var U;
        (U = m.current) == null || U.close(), m.current = null, y.current = !0, x.current !== "stale" && B("reconnecting");
        const R = Math.min(fe.reconnectBase * 2 ** u.current, fe.reconnectMax);
        u.current += 1, w.current = window.setTimeout(ae, R);
      }
    });
  }, [Ae, B, le, a, e]), Ue = Q((R) => {
    y.current = !0, R.close(), m.current = null, w.current = window.setTimeout(ae, fe.reconnectBase);
  }, [ae]), Ve = Q((R, U) => (s.current.set(U, R), () => {
    s.current.delete(U);
  }), []);
  return S(() => (ae(), f.current = window.setInterval(() => {
    const R = Date.now() - c.current, U = Yr(R, x.current);
    U && B(U);
    const ge = m.current;
    Jr(R, y.current, ge) && Ue(ge);
  }, fe.tick), () => {
    var R;
    window.clearInterval(f.current), window.clearTimeout(w.current), y.current = !1, (R = m.current) == null || R.close(), m.current = null;
  }), [ae, Ue, B]), { connection: n, lastEventAt: l, subscribe: Ve };
}
function nt(e, a) {
  const n = new Date(e).getTime(), [r, l] = p(() => Date.now());
  return S(() => {
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
const Xr = { blue: "running", orange: "waiting", green: "done" };
function Qr() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function yt(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function va(e, a) {
  const n = _(0), r = Q((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (Qr() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${Xr[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => yt(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => yt(s), fe.flash)));
  }, [a, e]);
  return S(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Zr = "_root_1otpc_2", el = {
  root: Zr
};
function al(e, a, n, r, l) {
  const i = [at(a)];
  return e || i.push(`as of ${Rr(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Le({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = nt(e, l), s = (a == null ? void 0 : a.at) ?? e, c = al(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${el.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const tl = "_app_yqy5k_1", nl = "_side_yqy5k_30", rl = "_sideTop_yqy5k_42", ll = "_sideBody_yqy5k_56", ol = "_iconRail_yqy5k_94", il = "_railItem_yqy5k_103", sl = "_railIcon_yqy5k_124", cl = "_railDot_yqy5k_129", dl = "_railLetter_yqy5k_135", ul = "_main_yqy5k_140", ml = "_rail_yqy5k_103", hl = "_page_yqy5k_158", wl = "_headerRow_yqy5k_167", fl = "_sidebarToggle_yqy5k_174", _l = "_headerSlot_yqy5k_179", vl = "_drawerSide_yqy5k_184", bl = "_root_yqy5k_220", pl = "_topbar_yqy5k_227", gl = "_mark_yqy5k_238", yl = "_brand_yqy5k_245", Nl = "_tagline_yqy5k_251", kl = "_identity_yqy5k_257", $l = "_tools_yqy5k_258", Cl = "_nav_yqy5k_268", Sl = "_metadata_yqy5k_275", Rl = "_actor_yqy5k_290", Tl = "_detail_yqy5k_291", Ll = "_content_yqy5k_336", xl = "_toolsPanel_yqy5k_352", Al = "_skip_yqy5k_378", $ = {
  app: tl,
  side: nl,
  sideTop: rl,
  sideBody: ll,
  iconRail: ol,
  railItem: il,
  railIcon: sl,
  railDot: cl,
  railLetter: dl,
  main: ul,
  rail: ml,
  page: hl,
  headerRow: wl,
  sidebarToggle: fl,
  headerSlot: _l,
  drawerSide: vl,
  root: bl,
  topbar: pl,
  mark: gl,
  brand: yl,
  tagline: Nl,
  identity: kl,
  tools: $l,
  nav: Cl,
  metadata: Sl,
  actor: Rl,
  detail: Tl,
  content: Ll,
  toolsPanel: xl,
  skip: Al
};
function ca(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const El = "_scope_1an6i_2", Il = {
  scope: El
}, an = Te(null);
function nR({ reason: e, actions: a = "disable", children: n }) {
  const r = N();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${Il.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ t("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ t(an.Provider, { value: { reason: e, reasonId: r, actions: a }, children: n })
  ] });
}
function xe() {
  return Re(an);
}
function Ea(e, a) {
  return !a || (e ?? "").split(" ").includes(a.reasonId) ? e : ca(e, a.reasonId);
}
const Ml = "_btn_tzr89_2", ql = "_primary_tzr89_14", Bl = "_destructive_tzr89_25", Pl = "_secondary_tzr89_35", jl = "_ghost_tzr89_40", Dl = "_overflow_tzr89_49", Ol = "_sm_tzr89_56", Hl = "_disabled_tzr89_60", ma = {
  btn: Ml,
  primary: ql,
  destructive: Bl,
  secondary: Pl,
  ghost: jl,
  overflow: Dl,
  sm: Ol,
  disabled: Hl
};
function Fl(e, a, n, r) {
  const l = a === "sm" ? [ma.sm, "ward-btn--sm"] : [], i = n ? [ma.disabled] : [];
  return [ma.btn, ma[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function zl(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Wl(e, a) {
  if (e.disabled && !a && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Kl(e, a) {
  return a ? a.reason : e.disabled ? e.disabledReason : void 0;
}
function Gl(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Ul(e, a, n) {
  return Gl(e.describedBy, a && n);
}
function Vl({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Yl(e) {
  return e.children ?? e.label;
}
function b(e) {
  var a;
  return ((a = xe()) == null ? void 0 : a.actions) === "hide" ? null : /* @__PURE__ */ t(Jl, { ...e });
}
function Jl(e) {
  const a = xe();
  Wl(e, a);
  const n = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || a), i = Kl(e, a), s = N();
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: Fl(n, r, l, e.className),
        "data-ward-btn": n,
        "data-ward-size": r,
        disabled: l,
        title: i,
        "aria-describedby": Ul(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...zl(n, e.controls),
        children: Yl(e)
      }
    ),
    /* @__PURE__ */ t(Vl, { id: s, reason: i })
  ] });
}
let rt = "none";
function Xl(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (rt = "key");
}
typeof document < "u" && (document.addEventListener("keydown", Xl, !0), document.addEventListener("pointerdown", () => {
  rt = "pointer";
}, !0));
function Ql() {
  return rt === "key";
}
function Ia(e) {
  const [a, n] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (s) => n(s.matches);
    return r.addEventListener("change", l), n(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
const Zl = "_scrim_1cawq_2", eo = "_drawer_1cawq_10", ao = "_sheet_1cawq_14", to = "_modal_1cawq_18", no = "_panel_1cawq_23", ro = "_start_1cawq_44", lo = "_header_1cawq_67", oo = "_title_1cawq_75", io = "_body_1cawq_79", so = "_close_1cawq_106", Ce = {
  scrim: Zl,
  drawer: eo,
  sheet: ao,
  modal: to,
  panel: no,
  start: ro,
  header: lo,
  title: oo,
  body: io,
  close: so
}, co = Te(null), Na = [], ka = /* @__PURE__ */ new Map();
function uo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function mo(e, a) {
  let n = ka.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ka.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function ho(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !uo(r) && mo(e, r);
}
function wo(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (ho(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function fo(e) {
  for (const a of e.claims) {
    const n = ka.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), ka.delete(a)));
  }
}
function _o(e, a) {
  const n = { root: e, claims: [] };
  return Na.push(n), wo(n, a), n;
}
function vo(e) {
  const a = Na.indexOf(e);
  a >= 0 && Na.splice(a, 1), fo(e);
}
function Nt(e) {
  return e !== null && Na.at(-1) === e;
}
function bo(e, a, n) {
  const r = _(null), l = _(n);
  return l.current = n, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = _o(i, a);
    return r.current = c, () => {
      var u, m;
      const d = Nt(c);
      vo(c), r.current = null, d && ((m = (u = l.current ?? s) == null ? void 0 : u.focus) == null || m.call(u));
    };
  }, [a]), Q(() => Nt(r.current), []);
}
function po(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function go(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function yo({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("header", { className: `${Ce.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Ce.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function No(e) {
  return `${Ce.scrim} ${Ce[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function ko(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ce.panel} ${Ce[e]} ward-overlay-panel${n}${r}`;
}
function $o(e) {
  const a = Re(co);
  return e ?? a ?? document.body;
}
function na(e) {
  const a = _(null), n = _(null), r = N(), l = $o(e.container), i = Ia("(min-width: 768px)"), s = po(e.kind, i), c = go(e, r), d = Pr(n), [u] = p(Ql), m = bo(a, l, e.returnFocusTo), w = Q(() => {
    m() && e.onClose();
  }, [e.onClose, m]);
  return S(() => {
    var f;
    m() && ((f = n.current) == null || f.focus());
  }, [m]), S(() => {
    const f = (y) => {
      y.key === "Escape" && w();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [w]), $r(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: No(s),
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
            className: ko(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => m() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Ce.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(yo, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Co = /^([a-z][a-z0-9+.-]*):/i, So = /* @__PURE__ */ new Set(["http", "https"]), Ro = "#";
function To(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = Co.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function H(e) {
  const a = To(e);
  return a === void 0 || So.has(a) ? e : Ro;
}
function Lo(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function tn(e) {
  const a = Lo(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function xo(e, a) {
  S(() => {
    const n = e.current;
    if (!n) return;
    const r = () => tn(n);
    n.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [n, ...n.children]) l == null || l.observe(i);
    return r(), () => {
      n.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, a]);
}
function Ao(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function nn(e, a, n) {
  aa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = Ao(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), tn(r);
  }, [e, a, n]);
}
const Eo = "_row_160e9_2", Io = {
  row: Eo
};
function Mo(e, a) {
  return e ? { role: a === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Ma({ label: e, children: a, count: n, as: r = "div", focusable: l = !0, rowRef: i, className: s, ...c }) {
  const d = _(null), u = i ?? d;
  return xo(u, n), /* @__PURE__ */ t(r, { ref: u, className: [Io.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Mo(l, r), ...c, children: a });
}
const qo = "_icon_1ylqy_2", Bo = {
  icon: qo
};
function da({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: Bo.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function rR() {
  return /* @__PURE__ */ t(da, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function lR() {
  return /* @__PURE__ */ o(da, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function oR() {
  return /* @__PURE__ */ o(da, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function iR() {
  return /* @__PURE__ */ t(da, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Po() {
  return /* @__PURE__ */ o(da, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const rn = "ward:sidebar-collapsed", jo = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Do() {
  try {
    return window.localStorage.getItem(rn) === "true";
  } catch {
    return !1;
  }
}
function Oo(e) {
  try {
    window.localStorage.setItem(rn, String(e));
  } catch {
  }
}
function Ho(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Fo(e) {
  return e instanceof Element && e.closest(jo) !== null;
}
function zo(e) {
  return e.key === "[" && !Ho(e) && !Fo(e.target);
}
function Wo(e) {
  const [a, n] = p(Do), r = () => {
    Oo(!a), n(!a);
  };
  return S(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!zo(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, a]), { collapsed: a, toggle: r };
}
function Ko() {
  const e = Ia("(max-width: 791.98px)"), a = N(), n = _(null), [r, l] = p(!1);
  return r && !e && l(!1), { narrow: e, open: r, drawerId: a, slotRef: n, toggle: () => l(!r), close: () => l(!1) };
}
function Go({ header: e, label: a, drawer: n }) {
  return n.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.drawerId, children: a }) }),
    /* @__PURE__ */ t("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function Uo({ sidebar: e, label: a, drawer: n }) {
  var l;
  if (!n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ t(na, { kind: "start", id: n.drawerId, title: a, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ t("div", { className: $.drawerSide, onClick: r, children: ln(e, !1) }) });
}
function Vo(e, a, n) {
  const r = n === void 0 && e !== void 0 && !a, { collapsed: l, toggle: i } = Wo(r);
  return n === void 0 ? Yo(r, l, i) : Jo(n, a, i);
}
function Yo(e, a, n) {
  return { enabled: e, collapsed: e && a, rail: e && a, owned: !1, toggle: n };
}
function Jo(e, a, n) {
  return { enabled: !1, collapsed: e && !a, rail: !1, owned: !0, toggle: n };
}
const Xo = (e) => e ? "" : void 0;
function ln(e, a) {
  return typeof e == "function" ? e(a) : e;
}
function Qo({ fold: e }) {
  return e.enabled ? /* @__PURE__ */ t("div", { className: $.sideTop, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(Po, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] }) }) : null;
}
function Zo({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": tt(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function ei({ items: e, label: a }) {
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: H(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(Zo, { item: n }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function ai({ sidebar: e, label: a, iconRail: n, fold: r }) {
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(Qo, { fold: r }),
    /* @__PURE__ */ t("div", { className: $.sideBody, hidden: r.rail, children: ln(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ t(ei, { items: n ?? [], label: a })
  ] });
}
function ti({ sidebar: e, header: a, children: n, rail: r, sidebarLabel: l, iconRail: i, collapsed: s }) {
  const c = r != null, d = Ko(), u = Vo(i, d.narrow, s), m = l ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(c), "data-collapsed": String(u.collapsed), "data-consumer-fold": Xo(u.owned), children: [
    !d.narrow && /* @__PURE__ */ t(ai, { sidebar: e, label: m, iconRail: i, fold: u }),
    /* @__PURE__ */ o("main", { className: $.main, children: [
      /* @__PURE__ */ t(Go, { header: a, label: m, drawer: d }),
      /* @__PURE__ */ t("div", { className: $.page, children: n })
    ] }),
    c && /* @__PURE__ */ t("div", { className: $.rail, children: r }),
    /* @__PURE__ */ t(Uo, { sidebar: e, label: m, drawer: d })
  ] });
}
function ni({ destinations: e, active: a }) {
  const n = _(null);
  return nn(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t(Ma, { as: "nav", rowRef: n, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ t("a", { href: H(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Va({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function ri({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ t(Va, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Va, { value: a, className: $.detail })
  ] });
}
function li() {
  const e = Ia("(max-width: 767.98px)"), a = N(), n = _(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function oi({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: $.tools, children: e });
}
function ii({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function si(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ t("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Va, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ t(ni, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: $.identity, children: /* @__PURE__ */ t(ri, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(oi, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function ci(e) {
  const a = N(), n = li();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(si, { ...e, menu: n }),
    /* @__PURE__ */ t(ii, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: $.content, children: e.children })
  ] });
}
function di(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function sR(e) {
  return di(e) ? /* @__PURE__ */ t(ti, { ...e }) : /* @__PURE__ */ t(ci, { ...e });
}
const ui = "_root_itg9o_2", mi = "_row_itg9o_8", hi = "_box_itg9o_14", wi = "_label_itg9o_21", fi = "_labelHidden_itg9o_26", _i = "_lockedNote_itg9o_36", vi = "_consequence_itg9o_44", bi = "_sample_itg9o_79", Me = {
  root: ui,
  row: mi,
  box: hi,
  label: wi,
  labelHidden: fi,
  lockedNote: _i,
  consequence: vi,
  sample: bi
};
function pi(e, a) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || a) };
}
function gi({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${Me.consequence} ward-check-consequence`, children: a }) : null;
}
function yi({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${Me.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Ni({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Me.sample, "aria-hidden": "true", children: e }) : null;
}
function on(e) {
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = xe(), l = pi(e, r);
  return /* @__PURE__ */ o("div", { className: `${Me.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: Me.row, children: [
      /* @__PURE__ */ t(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${Me.box} ward-field-option`,
          checked: l.checked,
          disabled: l.disabled,
          onChange: (i) => {
            var s;
            return !l.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, i.target.checked));
          },
          "aria-describedby": Ea(ca(n, e.describedBy), r),
          title: r == null ? void 0 : r.reason
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: e.labelHidden ? Me.labelHidden : Me.label, children: [
        e.label,
        /* @__PURE__ */ t(yi, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(Ni, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(gi, { id: n, text: e.consequence })
  ] });
}
const ki = "_chip_pq6tb_2", $i = {
  chip: ki
}, Ci = {
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
function Si(e, a) {
  if (e === "stream") return Ri(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = Ci[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function Ri(e) {
  if (!e || !sa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = tt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${$i.chip} ward-chip ward-chip--${e}`, style: Si(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const Ti = "_clamp_zn74g_3", kt = {
  clamp: Ti
};
function ta({ text: e, as: a = "span", className: n }) {
  return /* @__PURE__ */ t(a, { className: n === void 0 ? kt.clamp : `${kt.clamp} ${n}`, "data-ward-clamp": "", title: e, children: e });
}
function ua(e) {
  return typeof e == "number" && sa(e) ? e : null;
}
function pe(e, a) {
  const n = ua(e);
  return n === null ? "var(--ward-color-line2)" : `var(--ward-stream-${n}-${a})`;
}
function qa(e, a) {
  const n = ua(a);
  return n === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: n };
}
const Li = "_root_13eei_3", xi = "_nav_13eei_8", Ai = "_list_13eei_16", Ei = "_item_13eei_24", Ii = "_link_13eei_44", Mi = "_sep_13eei_54", qi = "_current_13eei_58", Bi = "_chips_13eei_62", Ee = {
  root: Li,
  nav: xi,
  list: Ai,
  item: Ei,
  link: Ii,
  sep: Mi,
  current: qi,
  chips: Bi
};
function Pi({ path: e, chips: a }) {
  return /* @__PURE__ */ t("div", { className: Ee.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Ee.nav, children: [
    /* @__PURE__ */ t("ol", { className: Ee.list, children: e.map((n, r) => /* @__PURE__ */ o("li", { className: Ee.item, children: [
      r > 0 ? /* @__PURE__ */ t("span", { className: Ee.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${Ee.link} ward-target`, href: H(n.href), title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { className: Ee.current, "aria-current": "page", title: n.label, children: n.label })
    ] }, n.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${Ee.chips} ward-chiprow`, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] }) });
}
function sn(e, a, n) {
  const r = _(n);
  r.current = n, S(() => {
    if (!e) return;
    const l = (i) => {
      var s;
      (s = a.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, a]);
}
const ji = 500;
function cn(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function dn() {
  const e = _(""), a = _(void 0);
  return S(() => () => clearTimeout(a.current), []), (n) => (clearTimeout(a.current), e.current += n.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, ji), e.current);
}
const ha = 4;
function Di(e, a, n) {
  const r = Math.max(0, n - e.bottom - ha * 2), l = Math.max(0, e.top - ha * 2);
  return a <= r || r >= l ? { top: e.bottom + ha, maxHeight: r } : { top: e.top - ha - Math.min(a, l), maxHeight: l };
}
function Oi(e, a, n, r) {
  const l = { start: e.left, end: e.right - a }, i = { start: l.start + a <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - a));
}
function Hi(e, a, n, r) {
  return { ...Di(e, a.height, n.height), left: Oi(e, a.width, n.width, r) };
}
function ba(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Fi(e, a) {
  const n = a.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", ba(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function zi(e) {
  const a = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = a.map((r) => r.scrollTop);
  return () => a.forEach((r, l) => r.scrollTop = n[l]);
}
function $t(e, a, n) {
  const r = zi(e), l = Fi(e, a), i = Hi(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: ba(i.left - l.box.left), top: ba(i.top - l.box.top), maxHeight: ba(i.maxHeight) }), r();
}
function Wi(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function un(e, a, n = "start") {
  aa(() => {
    const r = a.current, l = e.current;
    if (!r || !l) return;
    const i = Wi(r), s = () => $t(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), aa(() => {
    a.current && e.current && $t(a.current, e.current, n);
  });
}
const Ki = "_root_1lgbn_2", Gi = "_trigger_1lgbn_7", Ui = "_value_1lgbn_47", Vi = "_menu_1lgbn_65", Yi = "_find_1lgbn_87", Ji = "_list_1lgbn_103", Xi = "_option_1lgbn_114", Qi = "_check_1lgbn_133", Zi = "_empty_1lgbn_144", _e = {
  root: Ki,
  trigger: Gi,
  value: Ui,
  menu: Vi,
  find: Yi,
  list: Ji,
  option: Xi,
  check: Qi,
  empty: Zi
}, es = 7;
function as(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function Ct(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function ts(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => Ct(e.options, e.value)), d = (u) => {
    var m;
    Xt(() => r(!1)), u && ((m = a.current) == null || m.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: as(e.options, l),
    findable: e.options.length > es,
    show: () => {
      e.disabled || (i(""), c(Ct(e.options, e.value)), r(!0));
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
function ns(e, a) {
  const n = _(!1);
  return S(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function rs(e) {
  const a = dn();
  return (n) => {
    const r = a(n), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function mn(e) {
  const a = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, a)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function ls(e) {
  return { ...mn(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function hn(e, a, n) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = a[r.key];
    if (!l) return n(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const os = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function is(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      os.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function ss({ entry: e, at: a, menu: n, ids: r, value: l }) {
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
function cs({ menu: e, ids: a, focusRef: n }) {
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
      onKeyDown: hn(e, mn(e), () => {
      })
    }
  );
}
function ds({ props: e, menu: a, ids: n, focusRef: r, trigger: l }) {
  const i = rs(a), s = _(null);
  un(l, s);
  const c = (d) => {
    cn(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: _e.menu, children: [
    a.findable && /* @__PURE__ */ t(cs, { menu: a, ids: n, focusRef: r }),
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
        onKeyDown: hn(a, ls(a), c),
        children: a.entries.map((d, u) => /* @__PURE__ */ t(ss, { entry: d, at: u, menu: a, ids: n, value: e.value }, d.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: _e.empty, children: "No match" })
  ] });
}
function us(e, a) {
  const n = e.open ? lt(e, a) : void 0;
  S(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function wn(...e) {
  return e.filter(Boolean).join(" ");
}
function ms(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function hs({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = xe()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ t(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: wn(_e.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": a.open,
      "aria-controls": a.open ? n.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": ca(e["aria-describedby"], n.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...is(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: _e.value, "data-placeholder": i || void 0, children: ms(e) })
    }
  );
}
function fn(e) {
  const a = xe(), n = a ? { ...e, disabled: !0, "aria-describedby": Ea(e["aria-describedby"], a) } : e, r = N(), l = { list: `${r}-list`, value: `${r}-value`, option: (m) => `${r}-option-${m}` }, i = _(null), s = _(null), c = _(null), d = ts(n, s), u = ns(d.open, c);
  return sn(d.open, i, () => d.close(!1)), us(d, l), /* @__PURE__ */ o("div", { ref: i, className: wn(_e.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(hs, { props: n, menu: d, ids: l, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ t("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ t(ds, { props: n, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const ws = "_field_1ensj_2", fs = "_label_1ensj_8", _s = "_labelHidden_1ensj_15", vs = "_control_1ensj_25", bs = "_mono_1ensj_45", ps = "_area_1ensj_50", gs = "_invalid_1ensj_57", je = {
  field: ws,
  label: fs,
  labelHidden: _s,
  control: vs,
  mono: bs,
  area: ps,
  invalid: gs
}, ys = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, _n = (e) => `${e}-label`;
function Ns({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? ys : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function ks({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t(
    fn,
    {
      id: a.id,
      triggerClassName: n,
      "aria-labelledby": _n(a.id),
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
function $s({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const Cs = { input: Ns, select: ks, textarea: $s };
function Ss(e, a, n) {
  const r = Cs[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function Rs(e, a, n, r) {
  const l = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": l,
    "aria-describedby": Ea(ca(l ? n : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function Ts(e) {
  const a = e.mono ? [je.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [je.area] : [];
  return [je.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function Ls(e) {
  return e ? `${je.label} ${je.labelHidden} ward-field-label` : `${je.label} ward-field-label`;
}
function M(e) {
  const a = N(), n = `${a}-msg`, r = Rs(e, a, n, xe()), l = Ts(e);
  return /* @__PURE__ */ o("div", { className: `${je.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: _n(a), className: Ls(e.labelHidden), htmlFor: a, children: e.label }),
    Ss(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${je.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const xs = "_root_143uz_2", As = "_trigger_143uz_9", Es = "_panel_143uz_33", Is = "_menu_143uz_52", Ms = "_group_143uz_57", qs = "_heading_143uz_62", Bs = "_item_143uz_68", Ps = "_description_143uz_83", js = "_separator_143uz_107", Ds = "_footer_143uz_113", he = {
  root: xs,
  trigger: As,
  panel: Es,
  menu: Is,
  group: Ms,
  heading: qs,
  item: Bs,
  description: Ps,
  separator: js,
  footer: Ds
}, vn = Te(null);
function Os(e, a) {
  const [n, r] = p({ open: e, start: null, request: 0 });
  return {
    ...n,
    show: (l) => r((i) => ({ open: !0, start: l, request: i.request + 1 })),
    close: (l) => {
      var i;
      Xt(() => r((s) => ({ ...s, open: !1 }))), l && ((i = a.current) == null || i.focus());
    }
  };
}
const Hs = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Fs(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const n = Hs.get(a.key);
      n && (a.preventDefault(), e.show(n));
    },
    onKeyUp: (a) => {
      a.key === " " && a.preventDefault();
    }
  };
}
function bn(...e) {
  return e.filter(Boolean).join(" ");
}
function zs(e, a = {}) {
  const { ref: n, className: r, ...l } = a;
  return { ...l, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: bn(he.trigger, r) };
}
function Ws(e) {
  const a = N(), n = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = _(null), l = _(null), i = Os(e.defaultOpen === !0, l);
  return sn(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: bn(he.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ...zs(l, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Fs(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ t(vn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function Ks(e) {
  let a = 0;
  const n = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function Gs(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const pn = (e, a) => (e % a + a) % a;
function Ze(e, a, n) {
  for (let r = 1; r <= e.length; r++) {
    const l = pn(a + n * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const Us = (e) => e.split("").every((a) => a === e[0]);
function Vs(e, a, n) {
  const r = Us(n), l = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = pn(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function Ys(e) {
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
function Js(e, a) {
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
function Xs(e, a) {
  const n = _(!1), r = dn(), l = Js(e, a), i = (s) => {
    cn(s) && e.focus(Vs(e.items, e.current(), r(s.key)));
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
function Qs(e, a) {
  const { start: n, request: r } = a, l = _(e);
  l.current = e, S(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? Ze(i, -1, 1) : Ze(i, i.length, -1));
  }, [n, r]);
}
function Zs({ row: e, nav: a, popup: n }) {
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
function ec(e, a) {
  if (!e.description) return { aria: {}, content: e.label };
  const n = { "aria-labelledby": a + "-label", "aria-describedby": a + "-description" }, r = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { id: a + "-label", children: e.label }),
    /* @__PURE__ */ t("span", { id: a + "-description", className: he.description, children: e.description })
  ] });
  return { aria: n, content: r };
}
function gn(e) {
  const { item: a, at: n } = e.row, r = ec(a, N()), l = {
    ref: (i) => {
      e.nav.refs.current[n] = i;
    },
    role: "menuitem",
    tabIndex: -1,
    className: he.item,
    "aria-disabled": a.disabled ? "true" : void 0,
    ...r.aria,
    ...Zs(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: H(a.href), ...l, children: r.content }) : /* @__PURE__ */ t("button", { type: "button", ...l, children: r.content });
}
function ac({ heading: e, rows: a, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: he.group, children: [
    /* @__PURE__ */ t("div", { id: l, className: he.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(gn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function tc({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: he.separator }) : e.kind === "group" ? /* @__PURE__ */ t(ac, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(gn, { row: e.row, nav: a, popup: n });
}
function nc() {
  const e = Re(vn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function rc({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = nc(), c = _(null);
  un(s, c, n);
  const d = Ks(e), u = Ys(d.flatMap(Gs).map((w) => w.item)), m = Xs(u, r);
  return Qs(u, r), /* @__PURE__ */ o("div", { ref: c, className: he.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: l, "aria-labelledby": i, className: he.menu, ...m, children: d.map((w, f) => /* @__PURE__ */ t(tc, { block: w, nav: u, popup: r }, f)) }),
    a && /* @__PURE__ */ t("p", { className: he.footer, children: a })
  ] });
}
function lc(e) {
  var n;
  return (((n = e.parentElement) == null ? void 0 : n.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function yn(e, a) {
  S(() => {
    const n = e.current;
    a === "page" && n && !lc(n) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, a]);
}
const oc = (e, a) => e.reduce((n, r) => n + r + a, -a);
function ic({ room: e, widths: a, more: n, gap: r }, l) {
  const i = a.map((d, u) => u);
  if (oc(a, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([l]);
  let c = a[l] + r + n;
  for (const d of i)
    if (d !== l) {
      if (c += a[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Ha = (e) => Number.parseFloat(e) || 0, St = (e) => e.getBoundingClientRect().width;
function sc(e) {
  const a = getComputedStyle(e), n = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Ha(a.paddingInlineStart) - Ha(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(':scope > [role="tab"]'), St),
    more: n ? St(n) : 0,
    gap: Ha(a.columnGap)
  };
}
function cc(e, a) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(a);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const dc = (e, a) => JSON.stringify(e) === JSON.stringify(a);
function uc(e, a, n) {
  const [r, l] = p(null);
  return aa(() => {
    const i = e.current;
    if (!i) return;
    const s = () => {
      const c = sc(i);
      l((d) => dc(d, c) ? d : c);
    };
    return s(), cc(i, s);
  }, [e, n]), r && ic(r, a);
}
const mc = "_strip_jqyo6_2", hc = "_fits_jqyo6_19", wc = "_probe_jqyo6_27", fc = "_moreRoot_jqyo6_36", _c = "_more_jqyo6_36", vc = "_tab_jqyo6_55", bc = "_count_jqyo6_91", ve = {
  strip: mc,
  fits: hc,
  probe: wc,
  moreRoot: fc,
  more: _c,
  tab: vc,
  count: bc
}, Nn = "More";
function pc(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
const kn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function $n(e) {
  return `${ve.strip} ward-tabs ward-tabs--${e}`;
}
const gc = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function yc({ tab: e, active: a, place: n, onChange: r }) {
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
function Nc(e, a) {
  return (n) => {
    a(n), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function kc({ tabs: e, trigger: a, onPick: n }) {
  return /* @__PURE__ */ t(Ws, { label: Nn, className: ve.moreRoot, trigger: { ...a, role: "tab", "aria-selected": !1, className: ve.more }, children: /* @__PURE__ */ t(rc, { align: "end", entries: e.map((r) => ({ label: kn(r), onSelect: () => n(r.id) })) }) });
}
function $c(e, a, n) {
  return !a || a.includes(n) ? e.itemProps(n) : gc;
}
function cR({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l }) {
  const i = xa({ orientation: "horizontal" }), s = pc(e, a);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = _(null);
  yn(c, l);
  const d = uc(c, s, e.map(kn).join(`
`)), u = d ? e.filter((m, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${$n(l)} ${ve.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((m, w) => /* @__PURE__ */ t(yc, { tab: m, active: a, place: $c(i, d, w), onChange: n }, m.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${he.trigger} ${ve.more} ${ve.probe}`, children: Nn }),
    u.length > 0 && /* @__PURE__ */ t(kc, { tabs: u, trigger: i.itemProps(e.length), onPick: Nc(c, n) })
  ] });
}
const Rt = 7;
function dR({ links: e, active: a, label: n, level: r }) {
  if (e.length > Rt) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${Rt} — the set is fixed`);
  const l = _(null);
  return yn(l, r), nn(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t(Ma, { as: "nav", rowRef: l, className: $n(r), label: n, count: e.length, focusable: !1, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ve.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: ve.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const Cc = "_root_v56ff_3", Sc = "_segment_v56ff_9", Tt = {
  root: Cc,
  segment: Sc
};
function Cn({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = xa({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === a));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ t("div", { className: `${Tt.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "radio",
      className: Tt.segment,
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
const Rc = "_sidebar_s9o1j_3", Tc = "_brand_s9o1j_9", Lc = "_mark_s9o1j_17", xc = "_word_s9o1j_24", Ac = "_nav_s9o1j_30", Ec = "_navItem_s9o1j_39", Ic = "_footLink_s9o1j_49", Mc = "_group_s9o1j_58", qc = "_groupName_s9o1j_65", Bc = "_agents_s9o1j_81", Pc = "_agent_s9o1j_81", jc = "_root_s9o1j_96", Dc = "_agentTop_s9o1j_105", Oc = "_dot_s9o1j_112", Hc = "_agentName_s9o1j_124", Fc = "_agentMeta_s9o1j_138", zc = "_foot_s9o1j_49", Wc = "_footName_s9o1j_150", Kc = "_footLinks_s9o1j_157", Gc = "_linkBrand_s9o1j_184", Uc = "_label_s9o1j_205", Vc = "_note_s9o1j_210", Yc = "_footer_s9o1j_226", L = {
  sidebar: Rc,
  brand: Tc,
  mark: Lc,
  word: xc,
  nav: Ac,
  navItem: Ec,
  new: "_new_s9o1j_48",
  footLink: Ic,
  group: Mc,
  groupName: qc,
  agents: Bc,
  agent: Pc,
  root: jc,
  agentTop: Dc,
  dot: Oc,
  agentName: Hc,
  agentMeta: Fc,
  foot: zc,
  footName: Wc,
  footLinks: Kc,
  linkBrand: Gc,
  label: Uc,
  note: Vc,
  footer: Yc
};
function Jc({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: L.agent,
      href: H(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: L.agentTop, children: [
          /* @__PURE__ */ t(
            "span",
            {
              className: L.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": tt(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ t("span", { className: L.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ t("span", { className: L.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Xc({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: L.foot, children: [
    /* @__PURE__ */ t("span", { className: L.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: L.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${L.footLink} ward-target`, href: H(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function Qc({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: L.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: L.brand, children: [
      /* @__PURE__ */ t("span", { className: L.mark }),
      /* @__PURE__ */ t("span", { className: L.word, children: e })
    ] }),
    /* @__PURE__ */ t("div", { className: L.nav, children: a.map((s) => /* @__PURE__ */ t("a", { className: L.navItem, href: H(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: L.group, children: [
      /* @__PURE__ */ o("span", { className: L.groupName, children: [
        n,
        " · ",
        ee(r.length)
      ] }),
      l && /* @__PURE__ */ t("a", { className: L.new, href: H(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: L.agents, children: r.map((s) => /* @__PURE__ */ t(Jc, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(Xc, { shared: i })
  ] });
}
function Zc(e) {
  return e.destinations ?? e.items ?? [];
}
function ed({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: L.linkBrand, children: e });
}
function ad({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: L.footer, children: e });
}
function td({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: H(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: L.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: L.note, children: e.note })
  ] });
}
function nd(e) {
  return /* @__PURE__ */ o("aside", { className: `${L.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(ed, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: Zc(e).map((a) => /* @__PURE__ */ t(td, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(ad, { children: e.children })
  ] });
}
function rd(e) {
  return "agents" in e;
}
function uR(e) {
  return rd(e) ? /* @__PURE__ */ t(Qc, { ...e }) : /* @__PURE__ */ t(nd, { ...e });
}
const ld = "_mark_wlgi8_3", od = {
  mark: ld
}, id = { met: "✓", unmet: "", failed: "✕" };
function ot({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: od.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: id[e]
    }
  );
}
const sd = "_avatar_1t33a_3", cd = {
  avatar: sd
};
function dd(e) {
  const a = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (a.length > 1 ? (a[0] ?? "").charAt(0) + (a[1] ?? "").charAt(0) : (a[0] ?? "").slice(0, 2)).toUpperCase();
}
function ud(e) {
  return e != null && sa(e) ? Fr(e) : void 0;
}
function mR({ name: e, step: a, size: n = "md" }) {
  return /* @__PURE__ */ t("span", { className: cd.avatar, "data-size": n, "aria-hidden": "true", style: ud(a), children: dd(e) });
}
const md = "_marker_br9fi_2", hd = {
  marker: md
}, wd = {
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
}, fd = { running: " ward-running" };
function Oe({ size: e, kind: a, label: n }) {
  const r = { "--marker": wd[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${hd.marker} ward-marker ward-marker--${a}${fd[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const _d = "_root_ti0pq_2", vd = "_chip_ti0pq_11", bd = "_noCase_ti0pq_23", wa = {
  root: _d,
  chip: vd,
  noCase: bd
};
function pd(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function it({ connection: e, since: a, lastEventAt: n }) {
  const r = pd(a, n), l = nt(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${wa.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(Oe, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${wa.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ t("span", { className: wa.noCase, children: at(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${wa.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    de(r)
  ] });
}
const gd = "_root_yylks_2", yd = "_context_yylks_13", Nd = "_row_yylks_1", kd = "_heading_yylks_27", $d = "_headingWrap_yylks_35", Cd = "_meta_yylks_41", Sd = "_chips_yylks_49", Rd = "_title_yylks_56", Td = "_consequence_yylks_66", Ld = "_actionsWrap_yylks_73", xd = "_actions_yylks_73", Ad = "_action_yylks_73", Ed = "_overflowPanel_yylks_102", Id = "_measureClip_yylks_113", Md = "_measure_yylks_113", K = {
  root: gd,
  context: yd,
  row: Nd,
  heading: kd,
  headingWrap: $d,
  meta: Cd,
  chips: Sd,
  title: Rd,
  consequence: Td,
  actionsWrap: Ld,
  actions: xd,
  action: Ad,
  overflowPanel: Ed,
  measureClip: Id,
  measure: Md
};
function qd({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(ta, { as: "h1", className: K.title, text: e }) : /* @__PURE__ */ t("h1", { className: K.title, children: e });
}
function Bd({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ t("div", { className: K.chips, children: e.map((a) => /* @__PURE__ */ t(h, { ...a }, a.label)) }) : null;
}
function Pd({ consequence: e, consequenceHint: a }) {
  return e ? /* @__PURE__ */ t("p", { className: K.consequence, title: a, children: e }) : null;
}
function jd({ chips: e = [], consequence: a, consequenceHint: n }) {
  return e.length === 0 && !a ? null : /* @__PURE__ */ o("div", { className: K.meta, children: [
    /* @__PURE__ */ t(Bd, { chips: e }),
    /* @__PURE__ */ t(Pd, { consequence: a, consequenceHint: n })
  ] });
}
function Dd({ title: e, chips: a, consequence: n, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: K.heading, children: [
    /* @__PURE__ */ t(qd, { title: e, density: l }),
    /* @__PURE__ */ t(jd, { chips: a, consequence: n, consequenceHint: r })
  ] });
}
function Ya({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: K.action, "data-action": "", children: a }, n));
}
function Lt({ disclosure: e }) {
  return /* @__PURE__ */ t(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Od({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(Lt, { disclosure: l }) : a ? [/* @__PURE__ */ t(Lt, { disclosure: l }, "more"), /* @__PURE__ */ t(Ya, { actions: e }, "actions")] : /* @__PURE__ */ t(Ya, { actions: e });
}
function Hd(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Fd({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: K.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ya, { actions: e }) });
}
function zd(e, a) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const Wd = (e, a) => e.trim().toLowerCase() === a.trim().toLowerCase();
function Kd(e = [], a) {
  const n = e.at(-1);
  return n !== void 0 && Wd(n.label, a) ? e.slice(0, -1) : e;
}
function Gd({ crumb: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ t("div", { className: K.context, children: /* @__PURE__ */ t(Pi, { path: e }) });
}
function Ud(...e) {
  return e.some((a) => a === null);
}
function Vd(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Yd(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + Vd(e);
}
function Jd(e, a, n, r, l) {
  if (l === 0 || Ud(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], d = Math.max(0, e.clientWidth - Yd(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Xd(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Qd(e) {
  return yr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Zd(e, a) {
  return a.length === 0 && e.length === 1 && Qd(e[0]);
}
function eu(e, a) {
  const n = _(null), r = _(null), l = _(null), i = _(null), [s, c] = p(!1);
  return S(() => {
    const d = n.current;
    if (!Xd(d)) return;
    const u = () => c(Jd(d, r.current, l.current, i.current, e.length)), m = new ResizeObserver(u);
    return m.observe(d), i.current && m.observe(i.current), u(), () => m.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function au({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: K.measureClip, children: /* @__PURE__ */ o("div", { className: K.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function tu({ connection: e }) {
  return e ? /* @__PURE__ */ t(it, { connection: e.connection, since: e.since }) : null;
}
function hR({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: m, headingRef: w, actionsRef: f, measureRef: y, collapsed: x } = eu(i, Zd(i, s)), B = s.length > 0, { disclosure: le, close: Ae } = zd(x || B, f), ae = Hd(s, i, x, d);
  return /* @__PURE__ */ o("header", { className: K.root, "data-density": u, children: [
    /* @__PURE__ */ t(Gd, { crumb: Kd(e, n) }),
    /* @__PURE__ */ o("div", { className: K.row, ref: m, children: [
      /* @__PURE__ */ t("div", { ref: w, className: K.headingWrap, children: /* @__PURE__ */ t(Dd, { title: n, chips: a, consequence: r, consequenceHint: l, density: u }) }),
      /* @__PURE__ */ o("div", { className: K.actionsWrap, children: [
        /* @__PURE__ */ t(tu, { connection: c }),
        /* @__PURE__ */ t("div", { className: K.actions, ref: f, "data-ward-actions": !0, children: /* @__PURE__ */ t(Od, { actions: i, hasMore: B, collapsed: x, onOverflow: d, disclosure: le }) })
      ] })
    ] }),
    /* @__PURE__ */ t(Fd, { actions: ae, disclosure: le, onEscape: Ae }),
    /* @__PURE__ */ t(au, { actions: i, hasMore: B, measureRef: y })
  ] });
}
const nu = "_root_td96x_2", ru = "_body_td96x_16", xt = {
  root: nu,
  body: ru
};
function wR({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${xt.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: xt.body, children: n }) });
}
const lu = "_root_bf1pc_2", ou = "_table_bf1pc_9", iu = "_caption_bf1pc_14", su = "_series_bf1pc_23", cu = "_category_bf1pc_31", du = "_cell_bf1pc_39", uu = "_track_bf1pc_45", mu = "_lane_bf1pc_52", hu = "_bar_bf1pc_56", wu = "_value_bf1pc_63", fu = "_swatch_bf1pc_70", _u = "_empty_bf1pc_78", J = {
  root: lu,
  table: ou,
  caption: iu,
  series: su,
  category: cu,
  cell: du,
  track: uu,
  lane: mu,
  bar: hu,
  value: wu,
  swatch: fu,
  empty: _u
}, vu = "—", At = 6;
function bu(e, a) {
  if (a.length < 1 || a.length > At)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${At}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function pu(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function Sn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function gu(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function yu({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = gu(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: J.cell, children: /* @__PURE__ */ o("span", { className: J.track, children: [
    /* @__PURE__ */ t("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: J.value, children: e === null ? l : r(e) })
  ] }) });
}
function Nu({ series: e }) {
  return /* @__PURE__ */ t(T, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: J.swatch, "data-step": Sn(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function ku({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: J.caption, children: e }),
    /* @__PURE__ */ t("p", { className: J.empty, children: a })
  ] });
}
function $u({ title: e, categories: a, series: n, top: r, format: l = ee, categoryHead: i = "Category", missing: s = vu }) {
  return /* @__PURE__ */ t("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: J.table, children: [
    /* @__PURE__ */ t("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: J.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(Nu, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: J.category, children: c }),
      n.map((u, m) => /* @__PURE__ */ t(yu, { value: u.values[d], top: r, step: Sn(m, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function fR(e) {
  bu(e.categories, e.series);
  const a = pu(e.series);
  return a === 0 ? /* @__PURE__ */ t(ku, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t($u, { ...e, top: a });
}
const Cu = "_root_1bfqw_2", Su = "_figure_1bfqw_7", Ru = "_of_1bfqw_13", Tu = "_bar_1bfqw_18", Lu = "_rows_1bfqw_38", xu = "_row_1bfqw_38", Au = "_label_1bfqw_49", Eu = "_amount_1bfqw_54", Ie = {
  root: Cu,
  figure: Su,
  of: Ru,
  bar: Tu,
  rows: Lu,
  row: xu,
  label: Au,
  amount: Eu
};
function Iu({ spent: e, ceiling: a, breakdown: n }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Ie.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Ie.figure} ward-stat-value`, children: [
      ne(e),
      " ",
      /* @__PURE__ */ o("span", { className: Ie.of, children: [
        "of ",
        ne(a)
      ] })
    ] }),
    /* @__PURE__ */ t(
      "meter",
      {
        className: `${Ie.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${ne(e)} of ${ne(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    n && /* @__PURE__ */ t("ul", { className: Ie.rows, children: n.map((l) => /* @__PURE__ */ o("li", { className: `${Ie.row} ward-costrow`, children: [
      /* @__PURE__ */ t("span", { className: Ie.label, children: l.label }),
      /* @__PURE__ */ t("span", { className: Ie.amount, children: ne(l.amount) })
    ] }, l.label)) })
  ] });
}
const Mu = "_frame_lmfp9_2", qu = "_table_lmfp9_6", Bu = "_th_lmfp9_12", Pu = "_td_lmfp9_13", ju = "_sort_lmfp9_48", Du = "_row_lmfp9_60", Ou = "_empty_lmfp9_68", Be = {
  frame: Mu,
  table: qu,
  th: Bu,
  td: Pu,
  sort: ju,
  row: Du,
  empty: Ou
}, Hu = { asc: "ascending", desc: "descending" };
function Fu(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return Hu[a.direction];
}
function zu(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: Be.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Wu(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Ku({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Be.th,
      style: Wu(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Fu(e, a),
      children: zu(e, n)
    }
  );
}
function Gu({ row: e, props: a }) {
  const n = a.rowId(e), r = (a.lockedIds ?? []).includes(n);
  return /* @__PURE__ */ t(
    "tr",
    {
      className: Be.row,
      "data-selected": n === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ t(
        "td",
        {
          className: Be.td,
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
function Uu({
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
  return n.length === 0 ? /* @__PURE__ */ t("div", { className: Be.empty, children: u }) : /* @__PURE__ */ t("div", { className: Be.frame, "data-narrow": m, children: /* @__PURE__ */ o("table", { className: Be.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Be.head, children: a.map((w) => /* @__PURE__ */ t(Ku, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((w) => /* @__PURE__ */ t(Gu, { row: w, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: m } }, r(w))) })
  ] }) });
}
const Vu = "_list_v0s52_2", Yu = {
  list: Vu
};
function _R({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: Yu.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Ju = "_label_1u62a_2", Xu = {
  label: Ju
};
function vR({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: Xu.label, children: a.header }) }, a.key)) }) });
}
const Qu = "_stack_bp6a0_2", Zu = {
  stack: Qu
};
function bR({ children: e }) {
  return /* @__PURE__ */ t("span", { className: Zu.stack, "data-ward-action-stack": "", children: e });
}
const em = "_set_1z0sq_2", am = "_legend_1z0sq_7", tm = "_row_1z0sq_15", nm = "_control_1z0sq_20", rm = "_input_1z0sq_26", lm = "_label_1z0sq_31", om = "_consequence_1z0sq_36", Fe = {
  set: em,
  legend: am,
  row: tm,
  control: nm,
  input: rm,
  label: lm,
  consequence: om
};
function Rn({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = N(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: Fe.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: Fe.legend, children: e }),
    a.map((m) => {
      const w = `${u}-${m.value}`, f = m.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Fe.row, children: [
        /* @__PURE__ */ o("span", { className: Fe.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: Fe.input,
              value: m.value,
              checked: n === m.value,
              disabled: l,
              "aria-describedby": ca(f, s),
              onChange: () => !l && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: w, className: Fe.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ t("p", { id: f, className: `${Fe.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const im = "_root_11gpw_2", sm = "_head_11gpw_10", cm = "_note_11gpw_29", dm = "_index_11gpw_34", um = "_dot_11gpw_38", mm = "_counter_11gpw_49", hm = "_trailing_11gpw_57", ze = {
  root: im,
  head: sm,
  note: cm,
  index: dm,
  dot: um,
  counter: mm,
  trailing: hm
};
function wm({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${ze.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: ze.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function fm({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: ze.counter, "aria-hidden": "true", children: e }) : null;
}
function Et({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${ze.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: ze.head, children: [
      /* @__PURE__ */ t(wm, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: ze.note, children: n }),
    /* @__PURE__ */ t(fm, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: ze.trailing, children: i })
  ] });
}
const _m = "_strip_4ygbn_2", vm = "_cell_4ygbn_7", bm = "_value_4ygbn_12", pm = "_link_4ygbn_29", gm = "_label_4ygbn_49", ym = "_tiles_4ygbn_101", De = {
  strip: _m,
  cell: vm,
  value: bm,
  link: pm,
  label: gm,
  tiles: ym
};
function Tn(e, a, [n, r]) {
  if (a.length < n || a.length > r)
    throw new Error(`${e}: ${a.length} cells — it takes ${n} to ${r}`);
  if (a.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Ln = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Nm({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Ln(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function km({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Ln(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${De.link} ward-stat-link`, href: H(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const xn = (e) => e.href === void 0 ? /* @__PURE__ */ t(Nm, { cell: e }, e.label) : /* @__PURE__ */ t(km, { cell: e, href: e.href }, e.label);
function Ba({ cells: e, divided: a = !1 }) {
  return Tn("StatStrip", e, [2, 4]), /* @__PURE__ */ t("dl", { className: `${De.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map(xn) });
}
const It = 6;
function pR({ cells: e }) {
  Tn("StatTiles", e, [1, 2 * It]);
  const a = { "--ward-stat-tiles-columns": Math.min(e.length, It) };
  return /* @__PURE__ */ t("dl", { className: `${De.tiles} ward-stattiles`, style: a, children: e.map(xn) });
}
const $m = "_root_1eb1u_2", Cm = "_track_1eb1u_8", Sm = "_thumb_1eb1u_46", Rm = "_labelHidden_1eb1u_64", Tm = "_label_1eb1u_64", Lm = "_lockedNote_1eb1u_84", We = {
  root: $m,
  track: Cm,
  thumb: Sm,
  labelHidden: Rm,
  label: Tm,
  lockedNote: Lm
};
function xm(e, a, n, r) {
  return { on: n ? !0 : e, off: !!(a || n || r) };
}
function Am(e) {
  return e ? `${We.label} ${We.labelHidden}` : We.label;
}
function Ge({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = xe(), { on: m, off: w } = xm(a, r, l, u !== null);
  return /* @__PURE__ */ o("span", { className: `${We.root} ward-switchrow`, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        id: d,
        role: "switch",
        "aria-checked": m,
        "aria-label": e,
        "aria-labelledby": c,
        "aria-describedby": Ea(i, u),
        title: u == null ? void 0 : u.reason,
        className: `${We.track} ward-switch`,
        "data-on": m,
        "data-locked": l ? !0 : void 0,
        disabled: w,
        onClick: () => !w && (n == null ? void 0 : n(!m)),
        children: /* @__PURE__ */ t("span", { className: We.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: Am(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: We.lockedNote, children: "always on" })
    ] })
  ] });
}
const Em = "_bar_1vp69_2", Im = "_skip_1vp69_11", Mm = "_mark_1vp69_22", qm = "_nav_1vp69_30", Bm = "_list_1vp69_34", Pm = "_select_1vp69_41", jm = "_selectTrigger_1vp69_45", Dm = "_dest_1vp69_52", Om = "_actor_1vp69_71", Hm = "_actorMark_1vp69_84", Fm = "_actorLabel_1vp69_89", zm = "_tagline_1vp69_108", oe = {
  bar: Em,
  skip: Im,
  mark: Mm,
  nav: qm,
  list: Bm,
  select: Pm,
  selectTrigger: jm,
  dest: Dm,
  actor: Om,
  actorMark: Hm,
  actorLabel: Fm,
  tagline: zm
};
function Wm(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Km(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function gR({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = Km(r);
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
        fn,
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
      /* @__PURE__ */ t("span", { className: oe.actorMark, "aria-hidden": "true", children: Wm(c) })
    ] })
  ] });
}
const Gm = "_tree_zzoob_2", Um = "_item_zzoob_6", Vm = "_row_zzoob_10", Ym = "_button_zzoob_22", $a = {
  tree: Gm,
  item: Um,
  row: Vm,
  button: Ym
}, An = Te(null);
function Jm({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = xa({ orientation: "vertical" });
  return /* @__PURE__ */ t(An.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: $a.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const Xm = { ArrowRight: !0, ArrowLeft: !1 };
function Mt(e) {
  return e ? !0 : void 0;
}
function Qm(e, a) {
  const n = Xm[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function Zm(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function eh(e) {
  const a = [$a.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function ah(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function th(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function nh(e) {
  return typeof e == "string" ? e : void 0;
}
function rh({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function lh({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function En(e) {
  const a = Re(An);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = ah(e);
  return /* @__PURE__ */ o("li", { className: $a.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: eh(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": n,
        "data-depth": e.depth,
        "data-unresolved": Mt(e.unresolved),
        "data-inherited": Mt(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${$a.button} ward-treeitem-btn`,
            onClick: () => Zm(e),
            onKeyDown: (r) => Qm(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: th(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: nh(e.label), children: e.label }),
              /* @__PURE__ */ t(rh, { value: e.detail }),
              /* @__PURE__ */ t(lh, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const oh = "_frame_10gwd_2", ih = "_subjectRail_10gwd_22", sh = "_subject_10gwd_22", ch = "_rail_10gwd_42", dh = "_record_10gwd_66", uh = "_recordBody_10gwd_71", mh = "_stageGrid_10gwd_120", hh = "_band_10gwd_134", wh = "_bandBody_10gwd_142", fh = "_bandActions_10gwd_147", _h = "_scroller_10gwd_155", vh = "_board_10gwd_182", bh = "_lanes_10gwd_191", ph = "_cardGrid_10gwd_225", X = {
  frame: oh,
  subjectRail: ih,
  subject: sh,
  rail: ch,
  record: dh,
  recordBody: uh,
  stageGrid: mh,
  band: hh,
  bandBody: wh,
  bandActions: fh,
  scroller: _h,
  board: vh,
  lanes: bh,
  cardGrid: ph
};
function yR({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: X.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function qt(e) {
  return e ? "true" : void 0;
}
function NR({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: X.subjectRail, "data-ward-subject-rail": n, "data-ruled": qt(i), children: [
    /* @__PURE__ */ t("div", { className: X.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: X.rail, "data-sticky": qt(l), "aria-label": r, children: a })
  ] });
}
function kR({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: X.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(Et, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: X.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(Et, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: X.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const gh = "_form_1j8ub_2", yh = "_fields_1j8ub_9", Nh = "_actions_1j8ub_19", Fa = {
  form: gh,
  fields: yh,
  actions: Nh
};
function $R({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Fa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Fa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Fa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function CR({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: X.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: X.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: X.bandActions, children: a })
  ] });
}
const kh = "(max-width: 767.98px)";
function st({ label: e, children: a, laneCount: n }) {
  const r = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t(Ma, { className: X.scroller, label: e, count: n ?? Nr.count(a), "data-ward-board-scroller": "", style: r, children: a });
}
function $h({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: X.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(st, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Ch({ lanes: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: X.board, "data-ward-board": "", children: /* @__PURE__ */ t(st, { label: a, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ t(kr, { children: n.content }, n.id)) }) });
}
function SR({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = Ia(kh);
  return n === void 0 ? /* @__PURE__ */ t(st, { label: a, children: e }) : l ? /* @__PURE__ */ t($h, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(Ch, { lanes: n, label: a });
}
function RR({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), i = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ t(Ma, { className: X.stageGrid, label: n, count: l, "data-ward-stage-grid": "", "data-floor": r, style: i, children: a });
}
function TR({ children: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: `${X.cardGrid} ward-cardgrid`, role: a === void 0 ? void 0 : "region", "aria-label": a, "data-ward-card-grid": "", children: e });
}
const Sh = "_block_b38uc_3", Rh = "_sentence_b38uc_10", Th = "_meta_b38uc_19", Lh = "_action_b38uc_24", xh = "_strip_b38uc_28", Ah = "_loading_b38uc_47", Eh = "_label_b38uc_55", Ih = "_counter_b38uc_62", be = {
  block: Sh,
  sentence: Rh,
  meta: Th,
  action: Lh,
  strip: xh,
  loading: Ah,
  label: Eh,
  counter: Ih
};
function Mh({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: be.action, children: /* @__PURE__ */ t(b, { onClick: e.onClick, children: e.label }) });
}
function Pa({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${be.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: be.sentence, children: e }),
    n,
    /* @__PURE__ */ t(Mh, { action: a })
  ] });
}
function qh(e) {
  return /* @__PURE__ */ t(Pa, { ...e, kind: "ward-emptystate" });
}
function LR({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(Pa, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function xR(e) {
  return /* @__PURE__ */ t(Pa, { ...e });
}
function AR({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(Pa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function ER({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function IR({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function MR({ label: e, startedAt: a }) {
  const n = _(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  S(() => {
    const s = window.setTimeout(() => l(!0), fe.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = nt(n.current, r);
  return /* @__PURE__ */ o("div", { className: `${be.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ t("span", { className: be.label, children: e }),
    r ? /* @__PURE__ */ t("span", { className: be.counter, children: at(i) }) : null
  ] });
}
const Bh = "_note_cigdt_2", Ph = {
  note: Bh
};
function jh({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: Ph.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const Dh = "_card_k7btg_3", Oh = "_hit_k7btg_31", Hh = "_head_k7btg_44", Fh = "_title_k7btg_51", zh = "_meta_k7btg_57", Wh = "_since_k7btg_66", Kh = "_sep_k7btg_76", Gh = "_fields_k7btg_80", Uh = "_field_k7btg_80", Vh = "_last_k7btg_98", Yh = "_reason_k7btg_110", se = {
  card: Dh,
  hit: Oh,
  head: Hh,
  title: Fh,
  meta: zh,
  since: Wh,
  sep: Kh,
  fields: Gh,
  field: Uh,
  last: Vh,
  reason: Yh
}, Jh = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Xh(e, a, n) {
  const r = va(e, "blue"), l = va(e, "orange"), i = va(e, "green"), s = _(/* @__PURE__ */ new Set());
  S(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Jh[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, l]);
}
const Qh = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ne(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Zh(e, a) {
  return Qh[a](e);
}
function ew({ item: e, connection: a }) {
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
function aw({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: se.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function tw({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: se.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function nw({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: se.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: se.field, children: Zh(e, n) }, n)) });
}
const Ja = (e) => e ? !0 : void 0;
function rw(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function lw(e, a, n) {
  e == null || e(a, n);
}
function ow(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function iw({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: se.last, "data-stale": Ja(a), children: n }) : null;
}
function ja(e) {
  const a = e.fields ?? [], n = e.item, r = _(null);
  Xh(r, n.key, e.feed);
  const l = ow(e.feed), i = rw(n);
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
        /* @__PURE__ */ t("button", { type: "button", className: se.hit, onClick: (s) => lw(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(aw, { item: n }),
        /* @__PURE__ */ t(ta, { as: "p", className: se.title, text: n.title }),
        /* @__PURE__ */ t(ew, { item: n, connection: l }),
        /* @__PURE__ */ t(tw, { reason: n.blockedReason }),
        /* @__PURE__ */ t(nw, { item: n, fields: a }),
        /* @__PURE__ */ t(iw, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const sw = "_column_1j8bi_3", cw = "_head_1j8bi_21", dw = "_label_1j8bi_30", uw = "_count_1j8bi_39", mw = "_list_1j8bi_53", la = {
  column: sw,
  head: cw,
  label: dw,
  count: uw,
  list: mw
};
function In(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function hw({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: la.head, children: [
    /* @__PURE__ */ t("h2", { className: la.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: la.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function ww(e) {
  return /* @__PURE__ */ t("div", { className: la.list, role: "list", children: e.rows.map((a, n) => {
    var r;
    return /* @__PURE__ */ t(
      ja,
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
function fw({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), m = e.cap !== void 0 && a.length > e.cap, w = In(a, r);
  return /* @__PURE__ */ o("section", { className: la.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(hw, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(ww, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    m && /* @__PURE__ */ t(jh, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const _w = "_foot_cs4jr_2", vw = "_note_cs4jr_13", bw = "_link_cs4jr_19", za = {
  foot: _w,
  note: vw,
  link: bw
};
function qR({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: za.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: za.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${za.link} ward-target`, href: H(e), children: "Configure board" })
  ] });
}
const pw = "_head_1tfi5_3", gw = "_identity_1tfi5_12", yw = "_titleRow_1tfi5_18", Nw = "_title_1tfi5_18", kw = "_key_1tfi5_35", $w = "_rollup_1tfi5_45", Cw = "_tools_1tfi5_53", Sw = "_swatch_1tfi5_101", Rw = "_mark_1tfi5_108", ke = {
  head: pw,
  identity: gw,
  titleRow: yw,
  title: Nw,
  key: kw,
  rollup: $w,
  tools: Cw,
  swatch: Sw,
  mark: Rw
}, Bt = "initials:";
function Tw(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ee(e)} loaded this week`;
}
function Lw(e) {
  const a = [Tw(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ee(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function xw(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ee(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Lw(e)
  ] });
}
function Aw(e) {
  return e.startsWith(Bt) ? e.slice(Bt.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function Ew({ markRef: e, streamStep: a }) {
  const n = { "--stream": pe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ke.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: Aw(e) }) : /* @__PURE__ */ t("span", { className: ke.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Iw({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function BR({
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
  return /* @__PURE__ */ o("div", { className: ke.head, children: [
    /* @__PURE__ */ o("div", { className: ke.identity, children: [
      /* @__PURE__ */ o("div", { className: ke.titleRow, children: [
        /* @__PURE__ */ t(Ew, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ke.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ke.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ke.rollup, "aria-live": "polite", children: xw(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ke.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(Iw, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(it, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const Mw = "_head_1sejb_14", qw = "_line_1sejb_15", Bw = "_cHandle_1sejb_36", Pw = "_cName_1sejb_41", jw = "_nameLine_1sejb_49", Dw = "_cLabel_1sejb_56", Ow = "_cCap_1sejb_61", Hw = "_cShown_1sejb_66", Fw = "_name_1sejb_49", zw = "_noCap_1sejb_88", Ww = "_state_1sejb_102", Kw = "_handle_1sejb_111", Gw = "_sub_1sejb_137", q = {
  head: Mw,
  line: qw,
  cHandle: Bw,
  cName: Pw,
  nameLine: jw,
  cLabel: Dw,
  cCap: Ow,
  cShown: Hw,
  name: Fw,
  noCap: zw,
  state: Ww,
  handle: Kw,
  sub: Gw
}, Uw = "can't be hidden or collapsed", Vw = "terminal · counted, not a column";
function PR() {
  return /* @__PURE__ */ o("div", { className: q.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: q.cHandle }),
    /* @__PURE__ */ t("span", { className: q.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: q.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: q.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: q.cShown, children: "Shown" })
  ] });
}
function Yw(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Jw(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Pt(e) {
  return e.gate ? Uw : e.terminal ? Vw : Jw(e.agentsMounted);
}
function Xw(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Qw({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: q.cName, children: [
    /* @__PURE__ */ o("span", { className: q.nameLine, children: [
      /* @__PURE__ */ t("span", { className: q.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Pt(e) && /* @__PURE__ */ t("span", { className: q.sub, children: Pt(e) })
  ] });
}
function Zw(e) {
  return e === void 0 ? "" : String(e);
}
function ef(e) {
  return e === "" ? void 0 : Number(e);
}
function af({ name: e, onReorder: a }) {
  const n = xe();
  return (n == null ? void 0 : n.actions) === "hide" ? /* @__PURE__ */ t("span", { className: q.cHandle }) : /* @__PURE__ */ t("span", { className: q.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: q.handle,
      "aria-label": `Reorder ${e}`,
      disabled: n !== null,
      title: n == null ? void 0 : n.reason,
      "aria-describedby": n == null ? void 0 : n.reasonId,
      onKeyDown: (r) => !n && Xw(r, a),
      children: "⠿"
    }
  ) });
}
function tf({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${q.cCap} ${q.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: q.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Zw(a.cap), onChange: (r) => n({ ...a, cap: ef(r) }) }) });
}
function nf({ stage: e, config: a, onChange: n }) {
  const r = xe() !== null, l = Yw(e, a.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: q.cShown, children: [
    /* @__PURE__ */ t(Ge, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ t("span", { className: q.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function rf(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function jR({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: q.line, "data-kind": rf(e), children: [
    /* @__PURE__ */ t(af, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(Qw, { stage: e }),
    /* @__PURE__ */ t("span", { className: q.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(tf, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(nf, { stage: e, config: a, onChange: n })
  ] });
}
const lf = "_body_8qsv9_2", of = "_head_8qsv9_9", sf = "_summary_8qsv9_19", cf = "_block_8qsv9_20", df = "_actionsBlock_8qsv9_21", uf = "_title_8qsv9_41", mf = "_note_8qsv9_46", hf = "_k_8qsv9_51", wf = "_kv_8qsv9_58", ff = "_row_8qsv9_64", _f = "_label_8qsv9_75", vf = "_value_8qsv9_84", bf = "_quote_8qsv9_90", pf = "_actions_8qsv9_21", gf = "_resolve_8qsv9_111", j = {
  body: lf,
  head: of,
  summary: sf,
  block: cf,
  actionsBlock: df,
  title: uf,
  note: mf,
  k: hf,
  kv: wf,
  row: ff,
  label: _f,
  value: vf,
  quote: bf,
  actions: pf,
  resolve: gf
};
function yf(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Nf(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function kf(e) {
  const a = ua(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function $f(e) {
  return (e ?? []).map((a, n) => [a.label, a.value, `fact-${n}`]);
}
function Cf(e, a, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...qa(kf(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...yf(e),
    ...$f(n),
    ...Nf(e, a)
  ];
}
function Sf({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: j.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: j.k, children: a }),
    e
  ] });
}
function Rf(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function Tf({ item: e, showKey: a }) {
  const n = Rf(e);
  return !a && !n ? null : /* @__PURE__ */ o("div", { className: j.head, children: [
    a && /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ t(h, { role: n.role, label: n.label })
  ] });
}
function Lf({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: j.block, children: [
    /* @__PURE__ */ t("p", { className: j.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: j.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: j.note, children: e.agentMeta })
  ] }) : null;
}
function DR({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const m = N(), w = Cf(e, l, d);
  return /* @__PURE__ */ t(na, { kind: "drawer", labelledBy: m, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: j.body, children: [
    /* @__PURE__ */ t(Tf, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: j.summary, children: [
      /* @__PURE__ */ t("h2", { className: j.title, id: m, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: j.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: j.kv, children: w.map(([f, y, x]) => /* @__PURE__ */ o("div", { className: j.row, children: [
      /* @__PURE__ */ t("dt", { className: j.label, children: f }),
      /* @__PURE__ */ t("dd", { className: j.value, children: y })
    ] }, x ?? f)) }),
    /* @__PURE__ */ t(Lf, { item: e }),
    /* @__PURE__ */ o("div", { className: j.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: j.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: j.note, children: c })
    ] }),
    /* @__PURE__ */ t(Sf, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const xf = "_root_3azmy_2", Af = "_list_3azmy_7", Ef = "_item_3azmy_12", If = "_box_3azmy_18", Mf = "_text_3azmy_23", qf = "_note_3azmy_28", Ye = {
  root: xf,
  list: Af,
  item: Ef,
  box: If,
  text: Mf,
  note: qf
};
function Da({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ye.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${Ye.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ye.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ye.box, children: /* @__PURE__ */ t(ot, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ye.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${Ye.note} ward-checklist-note`, children: a })
  ] });
}
const Bf = "_rail_znbbp_2", Pf = "_k_znbbp_11", jf = "_head_znbbp_19", Df = "_section_znbbp_25", Of = "_card_znbbp_39", Hf = "_strip_znbbp_46", Ff = "_skeleton_znbbp_60", zf = "_skeletonLabel_znbbp_74", Wf = "_bar_znbbp_80", Kf = "_note_znbbp_89", me = {
  rail: Bf,
  k: Pf,
  head: jf,
  section: Df,
  card: Of,
  strip: Hf,
  skeleton: Ff,
  skeletonLabel: zf,
  bar: Wf,
  note: Kf
};
function Gf(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Wa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function Uf({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function Vf({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(fw, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function Yf(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(Vf, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(Uf, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function OR(e) {
  const a = Gf(e.onOpen), n = In(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(Wa, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(ja, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Wa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(Yf, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(Wa, { title: "Effect of this config", children: /* @__PURE__ */ t(Da, { items: e.effects, density: "compact" }) })
  ] });
}
function Jf(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function Xf(e) {
  return Math.ceil(e.length / 2);
}
function Qf(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Mn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Zf(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Mn(e);
  l !== void 0 && n(l), r(Qf(e.type));
}
function e_(e, a, n, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Zf(i, n, r, l));
  }, [e, a, n, r, l]);
}
function a_(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function t_(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function n_(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function r_(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(Xf(a ?? [])) + ")"
  };
}
function l_(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function o_(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: ne(e.cost) }) : null;
}
function i_(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function s_(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(Le, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function c_(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function d_(e, a) {
  return a === void 0 ? e : Jf(e, a.ref);
}
function u_(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ia(e) {
  return e === !0 ? "true" : void 0;
}
function qn(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = _(null), i = va(l), s = _(/* @__PURE__ */ new Set()), [c, d] = p(a_(a));
  e_(e.feed, a.key, s, d, i);
  const u = t_(a, r), m = n_(a, n), w = r_(a, e.fields), f = c_(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...u_(e),
      className: "ward-workcard",
      "data-flagged": ia(a.flagged),
      "data-selected": ia(e.selected),
      style: w,
      ref: d_(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        l_(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: u.role, label: u.label }),
          o_(a, e.fields),
          i_(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          s_(n, c, e.connection, a.changedAt),
          f !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function m_({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function h_(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function w_(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function f_(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(m_, { count: e.items.length, cap: e.column.cap });
}
function __(e, a) {
  return e.roving ?? a;
}
function v_(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function b_(e, a) {
  return e.items.map((n, r) => /* @__PURE__ */ t(
    qn,
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
function p_(e) {
  const a = N(), n = xa({ orientation: "vertical" }), r = __(e, n), l = h_(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ia(l), "data-gate": ia(e.column.gate), children: [
    w_(e.column, e.items.length, a),
    f_(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...v_(e, n), children: b_(e, r) })
  ] });
}
function g_(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function y_(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function N_(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function HR(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: g_(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      y_(e),
      N_(e.onConfigure),
      /* @__PURE__ */ t(it, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function k_(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function $_(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Ge, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Ge, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function C_(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function FR(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ia(k_(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: $_(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(on, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    C_(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function zR(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(qn, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(p_, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function S_(e, a) {
  const n = Mn(e);
  n !== void 0 && a(n);
}
function R_(e, a, n) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => S_(r, n));
  }, [e, a, n]);
}
function T_(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function L_(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ne(e.cost)]), a;
}
function x_(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(Le, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function A_(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function WR(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  R_(e.feed, a.key, l);
  const i = [...T_(a), ...L_(a)];
  return /* @__PURE__ */ o(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      x_(n, r)
    ] }),
    A_(a, e.actions)
  ] });
}
const E_ = "_card_uzp8w_3", I_ = "_head_uzp8w_30", M_ = "_mark_uzp8w_38", q_ = "_name_uzp8w_50", B_ = "_chips_uzp8w_71", P_ = "_description_uzp8w_77", j_ = "_run_uzp8w_82", D_ = "_sep_uzp8w_91", O_ = "_facts_uzp8w_97", H_ = "_fact_uzp8w_97", F_ = "_factLabel_uzp8w_111", z_ = "_factValue_uzp8w_115", re = {
  card: E_,
  head: I_,
  mark: M_,
  name: q_,
  chips: B_,
  description: P_,
  run: j_,
  sep: D_,
  facts: O_,
  fact: H_,
  factLabel: F_,
  factValue: z_
}, W_ = { live: "done", draft: "running", paused: "meta" };
function K_(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function G_({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: W_[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function U_({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: re.description, children: e });
}
function V_({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(Le, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function Y_({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: re.fact, children: [
    /* @__PURE__ */ t("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function J_(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function X_({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: K_(s),
      style: c,
      "data-selected": d,
      "data-paused": J_(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: re.head, children: [
          /* @__PURE__ */ t("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${re.name} ward-rowlink ward-target`, href: H(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(U_, { description: e.description }),
        /* @__PURE__ */ t(V_, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(G_, { versions: e.versions }),
        /* @__PURE__ */ t(Y_, { facts: i })
      ]
    }
  );
}
const Q_ = "_list_4dcyc_2", Z_ = "_row_4dcyc_11", ev = "_head_4dcyc_23", av = "_id_4dcyc_30", tv = "_lock_4dcyc_35", nv = "_reason_4dcyc_41", rv = "_remove_4dcyc_46", lv = "_clauses_4dcyc_50", ov = "_clause_4dcyc_50", iv = "_label_4dcyc_64", sv = "_cell_4dcyc_71", cv = "_value_4dcyc_76", ie = {
  list: Q_,
  row: Z_,
  head: ev,
  id: av,
  lock: tv,
  reason: nv,
  remove: rv,
  clauses: lv,
  clause: ov,
  label: iv,
  cell: sv,
  value: cv
}, Bn = Te(!1);
function KR({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(Bn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function dv({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function uv({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ie.reason, children: e })
  ] });
}
function mv({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ t("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(uv, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ie.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function jt(e, a) {
  return e.locked ? void 0 : a;
}
function GR({ rule: e, onChange: a, onRemove: n }) {
  if (!Re(Bn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = jt(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(mv, { rule: e, onRemove: jt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ t("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ie.cell, children: /* @__PURE__ */ t(dv, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const hv = "_ladder_n8eeo_2", wv = "_cell_n8eeo_7", fv = "_empty_n8eeo_26", _v = "_name_n8eeo_34", vv = "_holder_n8eeo_40", bv = "_request_n8eeo_46", pv = "_swatches_n8eeo_51", gv = "_swatch_n8eeo_51", yv = "_tilesFrame_n8eeo_78", Nv = "_tiles_n8eeo_78", kv = "_tile_n8eeo_78", $v = "_bar_n8eeo_117", Cv = "_hex_n8eeo_128", Sv = "_note_n8eeo_138", E = {
  ladder: hv,
  cell: wv,
  empty: fv,
  name: _v,
  holder: vv,
  request: bv,
  swatches: pv,
  swatch: gv,
  tilesFrame: yv,
  tiles: Nv,
  tile: kv,
  bar: $v,
  hex: Cv,
  note: Sv
}, UR = "not validated yet, pending a CVD matrix and dark stepping";
function Rv(e) {
  return e.reserved ? "reserved" : sa(e.step) ? "validated" : "partial";
}
function Pn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Tv(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Lv({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(Oe, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function xv(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Av(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Dt = (e) => String(e).padStart(2, "0");
function Ev(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? Pn(e, void 0);
}
function Iv({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${Dt(e)}` : Wr(e) }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: r ? n : `Step ${Dt(e)} · ${n}` })
  ] });
}
function Mv({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = Rv(e), c = Pn(s, n), d = c !== "free", u = d || i, m = a === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, y = `${w} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...Av(d, m, u), "data-validation": s, style: Tv(e, s), onClick: f, onKeyDown: (B) => xv(B, f) }, label: y, name: w, holder: c, validation: s, note: Ev(s, n, m), step: e.step };
}
const qv = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(Iv, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(Lv, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Bv(e) {
  return qv[e.presentation](Mv(e));
}
function Pv(e) {
  for (const a of e)
    if (!a.reserved && !Aa(a.step)) throw new Error("colour ladder renders token steps only");
}
function jv() {
  return /* @__PURE__ */ o("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Dv(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Ov = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function Hv() {
  return /* @__PURE__ */ o("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Fv = { list: jv, swatches: () => null, tiles: Hv };
function zv(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function jn(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Pv(e.steps);
  const r = Dv(e), l = Fv[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(Bv, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...zv(e.disabled === !0), className: `${Ov[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: E.tiles, children: i }) : i });
}
const Wv = "_rail_s06lm_2", Kv = "_section_s06lm_12", Gv = "_sectionFlush_s06lm_22", Uv = "_head_s06lm_26", Vv = "_headLabel_s06lm_34", Yv = "_sample_s06lm_42", Jv = "_sampleLabel_s06lm_47", Xv = "_sampleTitle_s06lm_54", Qv = "_sampleMeta_s06lm_59", Zv = "_trace_s06lm_65", eb = "_traceHead_s06lm_70", ab = "_steps_s06lm_78", tb = "_step_s06lm_78", nb = "_stepTitle_s06lm_97", rb = "_hollow_s06lm_107", lb = "_stepBody_s06lm_115", ob = "_stepDetail_s06lm_127", ib = "_publish_s06lm_132", sb = "_reason_s06lm_138", cb = "_note_s06lm_143", db = "_reveal_s06lm_148", k = {
  rail: Wv,
  section: Kv,
  sectionFlush: Gv,
  head: Uv,
  headLabel: Vv,
  sample: Yv,
  sampleLabel: Jv,
  sampleTitle: Xv,
  sampleMeta: Qv,
  trace: Zv,
  traceHead: eb,
  steps: ab,
  step: tb,
  stepTitle: nb,
  hollow: rb,
  stepBody: lb,
  stepDetail: ob,
  publish: ib,
  reason: sb,
  note: cb,
  reveal: db
}, Ot = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, ub = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, mb = { ok: "greenFill", finding: "orangeFill", action: "blue" }, hb = { notSimulated: "not simulated", running: "running" };
function wb(e) {
  return e.presentation === "foundry";
}
function fb(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function _b(e, a) {
  var r;
  const n = ub[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function vb(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function bb(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function pb(e) {
  if (vb(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function gb(e) {
  const [a, n] = p(!1);
  S(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function yb(e) {
  const a = hb[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(Oe, { size: 6, kind: mb[e.kind], label: e.kind });
}
function Nb(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function kb(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function $b(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(gb, { kind: a.kind, children: [
    /* @__PURE__ */ t(yb, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(Nb, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(kb, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Cb(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function Dn(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: Cb(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t($b, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function Sb(e) {
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
function Rb(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Tb(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ne(e.run.cost), label: "Cost" }, { value: e.run.turns ? Qt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Ba, { divided: !0, cells: a }) });
}
function Lb(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ne(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Qt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function xb(e) {
  const a = Lb(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Ba, { divided: !0, cells: a }) });
}
function On(e) {
  const a = N();
  return e.reason !== null ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: `${k.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Ab(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(On, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function Eb(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(On, { reason: e.reason, onPublish: e.onPublish }) });
}
function Hn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: Ot[e.run.status].role, label: Ot[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Ib(e, a) {
  const [n, r] = p(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [a, e.status]), n;
}
function Mb(e) {
  var n;
  bb(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Hn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(Sb, { sample: e.run.sample }),
    /* @__PURE__ */ t(Dn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(Tb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist }) }),
    /* @__PURE__ */ t(Ab, { reason: fb(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function qb(e) {
  var r;
  const a = Ib(e.run, e.feed);
  pb(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Hn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(Rb, { sample: e.run.sample }),
    /* @__PURE__ */ t(Dn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(xb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(Eb, { reason: _b(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function VR(e) {
  return wb(e) ? /* @__PURE__ */ t(qb, { ...e }) : /* @__PURE__ */ t(Mb, { ...e });
}
const Bb = "_list_142ip_3", Pb = "_row_142ip_9", jb = "_condition_142ip_18", Db = "_action_142ip_24", pa = {
  list: Bb,
  row: Pb,
  condition: jb,
  action: Db
}, Fn = Te(!1);
function YR({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(Fn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: pa.list, "aria-label": a, children: e }) });
}
function JR({ rule: e }) {
  if (!Re(Fn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: pa.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: pa.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: pa.action, children: e.then })
  ] });
}
const Ob = "_move_tmppt_3", Hb = {
  move: Ob
};
function Xa(e, a, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(n, 0, l), r;
}
function zn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Wn(e, a, n) {
  return `${e} moved to position ${a + 1} of ${n}.`;
}
function Ht(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function Fb(e) {
  return e === "up" ? "down" : "up";
}
function zb(e, a) {
  const n = Ht(e, a.id, a.direction) ?? Ht(e, a.id, Fb(a.direction));
  n == null || n.focus();
}
function Kn() {
  const e = _(null), [a, n] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && a !== null && zb(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function Gn({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Ca({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${Hb.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const Wb = "_body_1jd1i_2", Kb = "_title_1jd1i_8", Gb = "_section_1jd1i_13", Ub = "_legend_1jd1i_18", Vb = "_stages_1jd1i_26", Yb = "_stage_1jd1i_26", Jb = "_stageIndex_1jd1i_44", Xb = "_stageName_1jd1i_50", Qb = "_footer_1jd1i_59", Zb = "_note_1jd1i_66", ep = "_reason_1jd1i_71", ap = "_actions_1jd1i_76", tp = "_webHead_1jd1i_83", np = "_kicker_1jd1i_92", rp = "_webTitle_1jd1i_99", lp = "_webBody_1jd1i_105", op = "_webSection_1jd1i_109", ip = "_sectionHead_1jd1i_121", sp = "_sectionNote_1jd1i_129", cp = "_formLabel_1jd1i_134", dp = "_identityRow_1jd1i_139", up = "_nameCell_1jd1i_145", mp = "_keyCell_1jd1i_150", hp = "_colourCell_1jd1i_154", wp = "_colourStatus_1jd1i_161", fp = "_webStages_1jd1i_166", _p = "_webStageList_1jd1i_172", vp = "_webStage_1jd1i_166", bp = "_webIndex_1jd1i_191", pp = "_webStageName_1jd1i_196", gp = "_webMoves_1jd1i_201", yp = "_addStage_1jd1i_215", Np = "_addStageButton_1jd1i_223", kp = "_addStageNote_1jd1i_231", $p = "_webFooter_1jd1i_236", Cp = "_webFooterNotes_1jd1i_244", Sp = "_webNote_1jd1i_251", v = {
  body: Wb,
  title: Kb,
  section: Gb,
  legend: Ub,
  stages: Vb,
  stage: Yb,
  stageIndex: Jb,
  stageName: Xb,
  footer: Qb,
  note: Zb,
  reason: ep,
  actions: ap,
  webHead: tp,
  kicker: np,
  webTitle: rp,
  webBody: lp,
  webSection: op,
  sectionHead: ip,
  sectionNote: sp,
  formLabel: cp,
  identityRow: dp,
  nameCell: up,
  keyCell: mp,
  colourCell: hp,
  colourStatus: wp,
  webStages: fp,
  webStageList: _p,
  webStage: vp,
  webIndex: bp,
  webStageName: pp,
  webMoves: gp,
  addStage: yp,
  addStageButton: Np,
  addStageNote: kp,
  webFooter: $p,
  webFooterNotes: Cp,
  webNote: Sp
}, Rp = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Un = "not in catalogue";
function Tp(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${Un}` }, ...n];
}
function Lp({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Un}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Tp(n, e.name), invalid: i, onChange: r });
}
function Vn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function xp(e) {
  const a = _([]), n = _(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Ap({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Vn(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: v.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: v.webStageName, children: /* @__PURE__ */ t(Lp, { stage: a, index: n, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: Rp, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: v.webMoves, children: [
      n > 0 && /* @__PURE__ */ t(Ca, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t(Ca, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Ep({ stages: e, onChange: a, catalogue: n }) {
  const r = xp(e.length), l = Kn(), i = (c, d) => {
    const u = zn(c, d);
    r.current = Xa(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Wn(Vn(e[c], c), u, e.length)), a(Xa(e, c, u));
  }, s = (c, d) => a(e.map((u, m) => m === c ? d : u));
  return /* @__PURE__ */ o("div", { className: v.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(Ap, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(Gn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: v.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: v.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Ip = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Mp = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], qp = "A new stream starts as a draft. Nothing runs on it until you publish it.", Bp = "Create is disabled: name the stream and give it a key first.", Pp = "reorder with the ↑ ↓ buttons · min 2";
function ct(e, a) {
  return !e.reserved && sa(e.step) && a[e.step] === void 0;
}
function jp(e, a) {
  const n = e.find((r) => ct(r, a));
  return n ? n.step : 1;
}
function Dp({ stages: e, onMove: a }) {
  const n = Kn(), r = (l, i) => {
    const s = zn(l, i);
    n.moved({ id: e[l].id, direction: i }, Wn(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: v.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: v.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: v.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ t(Ca, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t(Ca, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(Gn, { text: n.announcement })
  ] });
}
function Op({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: v.footer, children: [
    /* @__PURE__ */ t("p", { className: v.note, children: qp }),
    e && /* @__PURE__ */ t("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: v.actions, children: [
      /* @__PURE__ */ t(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Hp(e, a) {
  return e !== "" && a !== "" ? null : Bp;
}
function Fp(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = Mp, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [m, w] = p(""), [f, y] = p(""), [x, B] = p(a[0].value), [le, Ae] = p(() => jp(n, r)), [ae, Ue] = p(e.stages ?? Ip), [Ve, R] = p(l[0].value), U = { name: m, key: f, streamStep: le, owner: x, stages: ae, policy: Ve }, ge = Hp(m, f);
  return /* @__PURE__ */ t(na, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: v.body, children: [
    /* @__PURE__ */ t("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Stream name", value: m, onChange: w }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Key", value: f, onChange: y, mono: !0 }),
      /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: x, onChange: B, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ t(jn, { label: "Stream colour", steps: n, value: le, onChange: Ae, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ t(Dp, { stages: ae, onMove: (He, gr) => Ue(Xa(ae, He, gr)) })
    ] }),
    /* @__PURE__ */ t(Rn, { legend: "Loop policy", options: l, value: Ve, onChange: R }),
    /* @__PURE__ */ t(Op, { reason: ge, onCreate: () => i(U), onDraft: () => s(U) })
  ] }) });
}
const Yn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], zp = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Wp(e, a, n, r, l, i) {
  var c;
  const s = ((c = Yn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function Kp(e, a) {
  return Gp(e) && Up(e, a) && Vp(e);
}
function Gp(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Up(e, a) {
  return e.colourStep === null || ct({ step: e.colourStep }, a);
}
function Vp(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Yp(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : ct({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Jp({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function Xp({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: v.webFooter, children: [
    /* @__PURE__ */ o("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ t(Jp, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: v.reason, children: zp })
    ] }),
    l && /* @__PURE__ */ t(b, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Qp({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: v.webHead, children: [
    /* @__PURE__ */ t("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function Zp({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
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
function eg(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [m, w] = p(null), [f, y] = p("relay"), [x, B] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = Wp(l, s, d, m, f, x), Ae = Kp(le, r), ae = x.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ue = /* @__PURE__ */ o("div", { className: v.colourCell, children: [
    /* @__PURE__ */ t("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(jn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: w, takenBy: r })
  ] }), Ve = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: v.colourStatus, "data-colour-status": "", children: Yp(m, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ o(na, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(Qp, { titleId: n }),
    /* @__PURE__ */ o("div", { className: v.webBody, children: [
      /* @__PURE__ */ t(Zp, { name: l, setName: i, streamKey: s, setKey: c, colour: Ue, owner: Ve }),
      /* @__PURE__ */ o("section", { className: v.webSection, children: [
        /* @__PURE__ */ o("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: v.sectionNote, children: Pp })
        ] }),
        /* @__PURE__ */ t(Ep, { stages: x, onChange: B })
      ] }),
      /* @__PURE__ */ t("section", { className: v.webSection, children: /* @__PURE__ */ t(Rn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: Yn, onChange: y }) }),
      /* @__PURE__ */ t(Xp, { ready: Ae, draft: le, agentStage: ae, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function XR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(eg, { ...e }) : /* @__PURE__ */ t(Fp, { ...e });
}
const ag = "_row_bs8hc_2", tg = "_cell_bs8hc_6", ng = "_condition_bs8hc_11", rg = "_action_bs8hc_18", lg = "_contract_bs8hc_24", og = "_contractCondition_bs8hc_33", ig = "_contractAction_bs8hc_39", Z = {
  row: ag,
  cell: tg,
  condition: ng,
  action: rg,
  contract: lg,
  contractCondition: og,
  contractAction: ig
}, Jn = ["advance", "block", "escalate", "requestReview"], Ft = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Sa(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function dt(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: Z.action, children: Ft[e.then] }) : /* @__PURE__ */ t(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: Jn.map((l) => ({ value: l, label: Ft[l] }))
    }
  );
}
function sg({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t("span", { className: Z.condition, title: Sa(e, r), children: Sa(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: dt(e, a, n) })
  ] });
}
function cg({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ o("td", { className: Z.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Z.condition, children: Sa(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: dt(e, a, n) })
  ] });
}
function dg({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Z.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Z.contractCondition, children: Sa(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Z.contractAction, children: dt(e, a, n, !0) })
  ] });
}
const ug = { two: cg, four: sg, contract: dg };
function QR(e) {
  var n;
  if (!Jn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = ug[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const mg = "_column_11id3_2", hg = "_head_11id3_17", wg = "_index_11id3_23", fg = "_name_11id3_29", _g = "_meta_11id3_38", vg = "_mono_11id3_43", bg = "_gate_11id3_50", pg = "_reviewersLabel_11id3_57", gg = "_reviewers_11id3_57", yg = "_reviewer_11id3_57", Ng = "_agents_11id3_74", kg = "_workflowColumn_11id3_79", $g = "_workflowHead_11id3_96", Cg = "_stageRow_11id3_102", Sg = "_stageLabel_11id3_109", Rg = "_workflowTitle_11id3_116", Tg = "_workflowMeta_11id3_122", Lg = "_workflowGate_11id3_127", xg = "_gateNote_11id3_135", Ag = "_cardNote_11id3_140", Eg = "_reviewerList_11id3_145", Ig = "_reviewerRow_11id3_151", Mg = "_reviewerMark_11id3_157", qg = "_reviewerName_11id3_167", Bg = "_terminalCard_11id3_173", Pg = "_terminalCount_11id3_182", jg = "_workflowAgents_11id3_188", Dg = "_mount_11id3_194", C = {
  column: mg,
  head: hg,
  index: wg,
  name: fg,
  meta: _g,
  mono: vg,
  gate: bg,
  reviewersLabel: pg,
  reviewers: gg,
  reviewer: yg,
  agents: Ng,
  workflowColumn: kg,
  workflowHead: $g,
  stageRow: Cg,
  stageLabel: Sg,
  workflowTitle: Rg,
  workflowMeta: Tg,
  workflowGate: Lg,
  gateNote: xg,
  cardNote: Ag,
  reviewerList: Eg,
  reviewerRow: Ig,
  reviewerMark: Mg,
  reviewerName: qg,
  terminalCard: Bg,
  terminalCount: Pg,
  workflowAgents: jg,
  mount: Dg
}, Og = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function ut(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Xn(e) {
  return `${Math.round(e * 100)}%`;
}
function Hg({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: C.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: C.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: C.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Ba, { cells: [
      { value: Xn(e.gateShare), label: "Gate share" },
      { value: ee(e.count), label: "In stage" }
    ] })
  ] });
}
function Fg({ stage: e }) {
  return /* @__PURE__ */ t(Ba, { cells: [
    { value: ee(e.count), label: "In stage" },
    { value: ut(e.closedThisWeek, ee), label: "Closed this week" }
  ] });
}
function zg({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: C.head, children: [
    /* @__PURE__ */ t("span", { className: C.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: C.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: Og[e.kind] })
  ] });
}
function Wg({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: C.meta, children: [
    /* @__PURE__ */ o("span", { className: C.mono, children: [
      ee(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: C.mono, children: [
      ce(e.medianWait),
      " median wait"
    ] })
  ] });
}
function Kg({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(Hg, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(Fg, { stage: e }) : null;
}
function Gg({ onMount: e }) {
  return e ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Ug({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: C.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(zg, { stage: e, titleId: l }),
    /* @__PURE__ */ t(Wg, { stage: e }),
    /* @__PURE__ */ t(Kg, { stage: e }),
    /* @__PURE__ */ t("div", { className: C.agents, children: a.map((s) => /* @__PURE__ */ t(X_, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(Gg, { onMount: n })
  ] });
}
const Vg = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function Yg({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: C.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: C.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: C.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: C.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function Jg({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: C.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(Yg, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: C.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Xn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Xg(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Qg({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: C.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: C.terminalCount, children: ut(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: C.cardNote, children: Xg(e.rolledBackThisWeek) })
  ] });
}
function Zg(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function ey(e) {
  if (e.kind === "terminal") return `${ut(e.closedThisWeek)} this week`;
  const a = Zg(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function ay({ stage: e, titleId: a }) {
  const n = Vg[e.kind];
  return /* @__PURE__ */ o("header", { className: C.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: C.stageRow, children: [
      /* @__PURE__ */ o("span", { className: C.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: C.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: C.workflowMeta, children: ey(e) })
  ] });
}
function ty(e) {
  return e === "entry" || e === "agent";
}
function ny({ stage: e, onMount: a }) {
  return a === void 0 || !ty(e.kind) ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", className: C.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function ry({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: C.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(ay, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(Jg, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(Qg, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: C.workflowAgents, children: a }),
    /* @__PURE__ */ t(ny, { stage: e, onMount: n })
  ] });
}
function ly(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function ZR(e) {
  return ly(e) ? /* @__PURE__ */ t(ry, { ...e }) : /* @__PURE__ */ t(Ug, { ...e });
}
const oy = "_row_1tdra_6", iy = "_name_1tdra_12", sy = "_compactRow_1tdra_13", cy = "_compactName_1tdra_13", dy = "_cell_1tdra_30", uy = "_chain_1tdra_45", my = "_owner_1tdra_51", hy = "_mono_1tdra_57", wy = "_compactCell_1tdra_79", fy = "_stack_1tdra_96", _y = "_stat_1tdra_103", vy = "_identityLine_1tdra_110", by = "_identity_1tdra_110", py = "_ownerLine_1tdra_140", gy = "_link_1tdra_160", yy = "_gateMark_1tdra_166", Ny = "_emptyChain_1tdra_171", ky = "_arrow_1tdra_177", $y = "_muted_1tdra_182", Cy = "_define_1tdra_187", Sy = "_statValue_1tdra_194", Ry = "_policyId_1tdra_200", Ty = "_sub_1tdra_205", g = {
  row: oy,
  name: iy,
  compactRow: sy,
  compactName: cy,
  cell: dy,
  chain: uy,
  owner: my,
  mono: hy,
  compactCell: wy,
  stack: fy,
  stat: _y,
  identityLine: vy,
  identity: by,
  ownerLine: py,
  link: gy,
  gateMark: yy,
  emptyChain: Ny,
  arrow: ky,
  muted: $y,
  define: Cy,
  statValue: Sy,
  policyId: Ry,
  sub: Ty
};
function Qn(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function Ly(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function xy(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Zn(e) {
  return `${ee(e)} ${e === 1 ? "member" : "members"}`;
}
function Ay(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Zn(e.members)}`;
}
function Ey(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: H(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: Ay(e) })
  ] }) });
}
function er({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Iy(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = ua(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function My({ stages: e, streamStep: a }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ t(er, { name: l.name, gate: l.gate === !0, look: Iy(i, n, a), size: "tag" }),
    i === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function qy(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : My(e) });
}
function ar(e) {
  return e === void 0 ? void 0 : !0;
}
function zt(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": ar(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: a })
  ] }) });
}
function By(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function Py(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function jy({ stream: e, href: a, presentation: n }) {
  const r = xy(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Qn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    Ey(e, a),
    qy(e),
    zt(Py(e.agents), e.agents === void 0 ? void 0 : Ly(e.agents), "—"),
    By(e.policy),
    zt(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function Dy(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function eT(e) {
  if (Dy(e)) return jy(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: Qn, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: H(n), children: a.name }),
      /* @__PURE__ */ t(h, { ...qa(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(h, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ t("span", { className: g.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: g.link, children: /* @__PURE__ */ t(er, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ t("span", { className: g.mono, children: Zn(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: a.inFlightHint, "data-raised": ar(a.inFlightHint), children: ee(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const Oy = "_row_2u4ll_2", Hy = "_name_2u4ll_16", Fy = "_scope_2u4ll_24", Ra = {
  row: Oy,
  name: Hy,
  scope: Fy
};
function mt(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function zy(e) {
  return e === void 0 ? `${Ra.row} ward-toolrow` : `${Ra.row} ward-toolrow ${e}`;
}
function Wy(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Ky({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function Gy({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: mt(e) });
}
function Uy({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${Ra.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Vy(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function aT({ tool: e, onChange: a, presentation: n }) {
  const r = N(), l = N(), i = Wy(e, n), s = Vy(n);
  return /* @__PURE__ */ o(s, { className: zy(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Ky, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${Ra.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(Uy, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(Gy, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const Yy = "_strip_4ppv9_2", Jy = "_well_4ppv9_11", Xy = "_head_4ppv9_18", Qy = "_name_4ppv9_24", Zy = "_chart_4ppv9_32", eN = "_segment_4ppv9_38", aN = "_detailedChart_4ppv9_44", tN = "_rail_4ppv9_57", nN = "_section_4ppv9_63", rN = "_label_4ppv9_74", lN = "_note_4ppv9_91", G = {
  strip: Yy,
  well: Jy,
  head: Xy,
  name: Qy,
  chart: Zy,
  segment: eN,
  detailedChart: aN,
  rail: tN,
  section: nN,
  label: rN,
  note: lN
}, oN = "No item in flight to preview.", iN = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", sN = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Qa = [1, 2, 3, 4, 5, 6], Ta = 100;
function cN(e, a) {
  return a.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function dN({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: G.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Qa.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: G.segment,
      x: l * Ta,
      y: "0",
      width: Ta,
      height: "8",
      fill: cN(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function uN(e) {
  const a = e.slice(0, Qa.length);
  for (; a.length < Qa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function mN({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${G.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ t("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, n) => /* @__PURE__ */ t(
      "rect",
      {
        x: String(n * Ta),
        y: "0",
        width: String(Ta),
        height: "40",
        style: { fill: pe(a.streamStep, "chip") }
      },
      a.key + String(n)
    )) }),
    /* @__PURE__ */ t("figcaption", { className: "ward-seglabels", children: e.map((a, n) => /* @__PURE__ */ t("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(n))) })
  ] });
}
function tr(e) {
  return (a) => e == null ? void 0 : e(a);
}
function fa({ label: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("section", { className: G.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: G.label, children: e }),
    a
  ] });
}
function hN({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: G.note, children: a ?? oN }) : /* @__PURE__ */ t("div", { className: G.well, children: /* @__PURE__ */ t(ja, { item: { ...e, streamStep: ua(n.streamStep) }, onOpen: tr(r), feed: null }) });
}
function wN({ draft: e }) {
  const a = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: G.head, style: a, children: [
    /* @__PURE__ */ t(Oe, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...qa(e.key, e.streamStep) })
  ] });
}
function fN(e) {
  const a = uN(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: G.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(fa, { label: "Board card", children: /* @__PURE__ */ t(hN, { ...e, draft: n }) }),
    /* @__PURE__ */ t(fa, { label: "Streams index row", children: /* @__PURE__ */ t(wN, { draft: n }) }),
    /* @__PURE__ */ o(fa, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(mN, { identities: a }),
      /* @__PURE__ */ t("p", { className: G.note, children: iN })
    ] }),
    /* @__PURE__ */ t(fa, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: G.note, children: sN }) })
  ] });
}
function _N({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: G.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: G.head, children: [
      /* @__PURE__ */ t(Oe, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: G.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...qa(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: G.well, children: /* @__PURE__ */ t(ja, { item: { ...a, streamStep: e.streamStep }, onOpen: tr(r) }) }),
    /* @__PURE__ */ t(dN, { draft: e, streams: n })
  ] });
}
function tT(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(fN, { ...e }) : /* @__PURE__ */ t(_N, { ...e });
}
const vN = "_row_ixlg5_6", bN = "_headCell_ixlg5_10", pN = "_cell_ixlg5_11", gN = "_name_ixlg5_23", yN = "_consequence_ixlg5_29", NN = "_governed_ixlg5_36", kN = "_control_ixlg5_42", $N = "_byRole_ixlg5_48", CN = "_webControl_ixlg5_59", SN = "_webConsequence_ixlg5_65", RN = "_webGoverned_ixlg5_71", O = {
  row: vN,
  headCell: bN,
  cell: pN,
  name: gN,
  consequence: yN,
  governed: NN,
  control: kN,
  byRole: $N,
  webControl: CN,
  webConsequence: SN,
  webGoverned: RN
};
function TN({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: O.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: O.control, children: [
    /* @__PURE__ */ t(
      Ge,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => n(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ t(h, { role: "running", label: "Pilot" })
  ] });
}
function LN({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: O.headCell, children: [
      /* @__PURE__ */ t("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: O.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: O.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(TN, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function xN(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function AN({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${O.webControl} ${O.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    Ge,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: n === void 0,
      onChange: (l) => n == null ? void 0 : n(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${O.webControl} ward-envrow`, children: [
    /* @__PURE__ */ t(h, { role: "running", label: "Pilot" }),
    r
  ] });
}
function EN({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o("td", { className: O.cell, children: [
      /* @__PURE__ */ t("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${O.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(AN, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webGoverned} ward-cellmeta`, children: xN(e) }) })
  ] });
}
function nT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(EN, { ...e }) : /* @__PURE__ */ t(LN, { ...e });
}
const IN = "_row_vv64h_2", MN = "_cell_vv64h_6", qN = "_name_vv64h_25", BN = "_note_vv64h_30", PN = "_webName_vv64h_41", jN = "_webMeta_vv64h_47", Y = {
  row: IN,
  cell: MN,
  name: qN,
  note: BN,
  webName: PN,
  webMeta: jN
}, nr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function DN(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function ON({ component: e, onRestart: a }) {
  const n = N(), r = nr[e.state], l = e.state === "drainFirst";
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
function HN({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: DN(e.state) });
}
function FN({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: Y.row, children: [
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: `${Y.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: `${Y.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(h, { ...nr[e.state] }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(HN, { component: e, onRestart: a }) })
  ] });
}
function rT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(FN, { ...e }) : /* @__PURE__ */ t(ON, { ...e });
}
const zN = "_row_jcm5k_7", WN = "_cell_jcm5k_11", KN = "_next_jcm5k_28", GN = "_headCell_jcm5k_38", UN = "_webId_jcm5k_77", VN = "_webPurpose_jcm5k_83", YN = "_webMeta_jcm5k_91", JN = "_webUrgent_jcm5k_97", F = {
  row: zN,
  cell: WN,
  next: KN,
  headCell: GN,
  webId: UN,
  webPurpose: VN,
  webMeta: YN,
  webUrgent: JN
}, XN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, QN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, rr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], ZN = Object.fromEntries(rr.map((e) => [e.key, e]));
function Je({ column: e, children: a }) {
  const n = ZN[e];
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
function lT() {
  return /* @__PURE__ */ t("tr", { children: rr.map((e) => /* @__PURE__ */ t(
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
function e1({ cred: e }) {
  const a = XN[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t(Je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Je, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Je, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Je, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: mt(e.cls) }) }),
    /* @__PURE__ */ t(Je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Je, { column: "next", children: /* @__PURE__ */ t("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function a1({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function t1({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(a1, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { ...QN[e.state] }) })
  ] });
}
function oT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(t1, { ...e }) : /* @__PURE__ */ t(e1, { ...e });
}
const n1 = "_card_17zba_2", r1 = "_head_17zba_11", l1 = "_env_17zba_18", o1 = "_version_17zba_25", i1 = "_meta_17zba_32", s1 = "_webCard_17zba_37", c1 = "_webRow_17zba_47", d1 = "_webTitle_17zba_55", u1 = "_webLine_17zba_65", m1 = "_webVersion_17zba_72", h1 = "_webMeta_17zba_77", V = {
  card: n1,
  head: r1,
  env: l1,
  version: o1,
  meta: i1,
  webCard: s1,
  webRow: c1,
  webTitle: d1,
  webLine: u1,
  webVersion: m1,
  webMeta: h1
}, Wt = { dev: "Dev", uat: "UAT", prod: "Prod" }, lr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function w1({ env: e }) {
  const a = lr[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: V.card, "aria-label": Wt[e.env], children: [
    /* @__PURE__ */ o("div", { className: V.head, children: [
      /* @__PURE__ */ t("span", { className: V.env, children: Wt[e.env] }),
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
function f1(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function _1(e) {
  return /* @__PURE__ */ o("article", { className: `${V.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${V.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${V.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...lr[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${V.version} ${V.webVersion} ${V.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${V.meta} ${V.webMeta} ${V.webLine} ward-cellmeta`, children: f1(e) })
  ] });
}
function iT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(_1, { ...e }) : /* @__PURE__ */ t(w1, { ...e });
}
const v1 = "_panel_1hmja_2", b1 = "_line_1hmja_8", p1 = "_actions_1hmja_14", _a = {
  panel: v1,
  line: b1,
  actions: p1
};
function sT(e) {
  return /* @__PURE__ */ o("div", { className: _a.panel, children: [
    /* @__PURE__ */ t("p", { className: _a.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: _a.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: _a.line, children: e.note ?? "" })
  ] });
}
const g1 = "_upload_13fcl_2", y1 = "_preview_13fcl_7", N1 = "_mark_13fcl_17", k1 = "_empty_13fcl_22", $1 = "_actions_13fcl_28", C1 = "_input_13fcl_33", S1 = "_reasons_13fcl_41", R1 = "_reason_13fcl_41", T1 = "_accepted_13fcl_57", te = {
  upload: g1,
  preview: y1,
  mark: N1,
  empty: k1,
  actions: $1,
  input: C1,
  reasons: S1,
  reason: R1,
  accepted: T1
}, or = 1.5, ir = 22, La = "script elements or event handlers", qe = "links or external references", Se = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${or}px at ${ir}px`], L1 = [Se[1], Se[2], La, qe], x1 = /* @__PURE__ */ new Map([
  ["image", Se[1]],
  ["text", Se[2]],
  ["tspan", Se[2]],
  ["textPath", Se[2]],
  ["script", La],
  ["foreignObject", La],
  ["a", qe],
  ["use", qe],
  ["style", qe],
  ["feImage", qe],
  ["set", qe]
]), A1 = "http://www.w3.org/2000/svg", E1 = "http://www.w3.org/2000/xmlns/", I1 = /* @__PURE__ */ new Set([
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
]), M1 = /* @__PURE__ */ new Set([
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
]), ht = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, q1 = /url\s*\(|['"\\]/i;
function B1() {
  return { ok: !1, reasons: [Se[1]] };
}
function sr(e) {
  return e.namespaceURI === A1;
}
function P1(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && sr(a) ? a : null;
  } catch {
    return null;
  }
}
function j1(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [Se[0]] : [];
}
function D1(e) {
  return x1.get(e.localName) ?? (e.localName.startsWith("animate") ? qe : void 0);
}
function O1(e) {
  return q1.test(e.replace(ht, ""));
}
function H1(e) {
  return /^on/i.test(e.localName) ? La : e.localName === "href" || O1(e.value) ? qe : void 0;
}
function F1(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(D1(n));
    for (const r of Array.from(n.attributes)) a.add(H1(r));
  }
  return L1.filter((n) => a.has(n));
}
function z1(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? ir / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < or;
  }) ? [Se[3]] : [];
}
function W1(e) {
  if (e.namespaceURI === E1) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (M1.has(a) || a.startsWith("stroke"));
}
function K1(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && sr(a) && I1.has(a.localName);
}
function G1(e, a) {
  K1(a) ? a.nodeType === Node.ELEMENT_NODE && cr(a) : e.removeChild(a);
}
function cr(e) {
  for (const a of Array.from(e.attributes)) W1(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) G1(e, a);
  return e;
}
function U1(e) {
  return Array.from(e.matchAll(ht), (a) => a[2]).filter((a) => a !== "");
}
function V1(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function Y1(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of U1(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function J1(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(ht, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function X1(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = Y1(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), J1(l, r);
  }
  return e;
}
function cT(e) {
  const a = P1(e);
  if (a === null) return B1();
  const n = [...j1(a), ...F1(a), ...z1(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(X1(cr(a), V1(e))) };
}
const Q1 = "Mark accepted.", Z1 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, ek = new Set(en.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function ak(e) {
  return e !== void 0 && (Z1.test(e) || ek.has(e)) ? e : void 0;
}
function tk({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: te.preview, style: { "--mark": ak(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: te.empty }) });
}
function nk(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function rk(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function lk({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("p", { className: te.accepted, children: Q1 }) }) : /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: te.reason, children: a }, a)) }) });
}
function ok({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(lk, { result: e }) : /* @__PURE__ */ t("p", { className: `${te.result} ${nk(e, n)}`, role: "status", children: rk(e, n) });
}
function Kt(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function dT({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = _(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const m = a(u);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ t(tk, { current: e }),
    /* @__PURE__ */ o("div", { className: te.actions, children: [
      /* @__PURE__ */ t(
        "input",
        {
          ref: i,
          className: te.input,
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
      /* @__PURE__ */ t(b, { ...Kt(l), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(b, { ...Kt(l), variant: "ghost", onClick: n, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(ok, { result: s, presentation: r })
  ] });
}
const ik = "_row_o3t6y_7", sk = "_cell_o3t6y_11", ck = "_head_o3t6y_28", dk = "_name_o3t6y_34", uk = "_pinned_o3t6y_42", mk = "_headCell_o3t6y_49", hk = "_webName_o3t6y_88", wk = "_webMeta_o3t6y_95", fk = "_webWarn_o3t6y_103", P = {
  row: ik,
  cell: sk,
  head: ck,
  name: dk,
  pinned: uk,
  headCell: mk,
  webName: hk,
  webMeta: wk,
  webWarn: fk
}, wt = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, dr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], _k = Object.fromEntries(dr.map((e) => [e.key, e]));
function vk(e, a) {
  return `mcp.${e}.${a}`;
}
function bk(e) {
  return Object.keys(wt).includes(e);
}
function pk(e) {
  return wt[e !== void 0 && bk(e) ? e : "unknown"];
}
function ra({ column: e, children: a }) {
  const n = _k[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: P.cell,
      style: n.width ? { width: n.width } : void 0,
      "data-drop": n.dropPriority,
      "data-mono": n.mono,
      children: a
    }
  );
}
function uT() {
  return /* @__PURE__ */ t("tr", { children: dr.map((e) => /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: P.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function gk({ server: e }) {
  const a = wt[e.connection];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o(ra, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: P.head, children: [
        /* @__PURE__ */ t("span", { className: P.name, children: e.name }),
        /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: mt(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: P.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(ra, { column: "connection", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(ra, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(ra, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(ra, { column: "tools", children: e.tools.map((n) => vk(e.name, n)).join(" · ") })
  ] });
}
function yk(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Nk(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function kk({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${P.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: e });
}
function $k({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Ck({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function Sk({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t("span", { className: `${P.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: yk(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...Nk(e) }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(kk, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...pk(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t($k, { server: e, onRestart: a }),
      /* @__PURE__ */ t(Ck, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function mT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Sk, { ...e }) : /* @__PURE__ */ t(gk, { ...e });
}
const Rk = "_row_1ibo7_2", Tk = "_headCell_1ibo7_14", Lk = "_cell_1ibo7_15", xk = "_name_1ibo7_26", Ak = "_consequence_1ibo7_32", Ek = "_reason_1ibo7_38", Ik = "_value_1ibo7_44", Mk = "_webRow_1ibo7_60", qk = "_webSetting_1ibo7_73", Bk = "_webName_1ibo7_81", Pk = "_webConsequence_1ibo7_89", jk = "_webControl_1ibo7_95", Dk = "_webState_1ibo7_109", Ok = "_webChip_1ibo7_114", I = {
  row: Rk,
  headCell: Tk,
  cell: Lk,
  name: xk,
  consequence: Ak,
  reason: Ek,
  value: Ik,
  webRow: Mk,
  webSetting: qk,
  webName: Bk,
  webConsequence: Pk,
  webControl: jk,
  webState: Dk,
  webChip: Ok
}, ur = 104, mr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function Hk({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Ge, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(Cn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function Fk({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = mr[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(Hk, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: ur }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function hr(e, a) {
  return String(e ?? a);
}
function zk(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Wk(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? hr(e.value, "—");
}
function Kk({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(Ge, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function Gk(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(Kk, { ...e });
  const l = zk(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(Cn, { options: l, value: hr(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: Wk(a) });
}
function Uk({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(Gk, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: ur }, children: /* @__PURE__ */ t(h, { ...mr[n], size: "tag" }) })
  ] });
}
function hT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Uk, { ...e }) : /* @__PURE__ */ t(Fk, { ...e });
}
const Vk = "_label_h9m4w_7", Yk = "_name_h9m4w_15", Jk = "_column_h9m4w_24", Xk = "_webFrame_h9m4w_57", Qk = "_webHead_h9m4w_62", Zk = "_webHeadLabel_h9m4w_74", e$ = "_webLabel_h9m4w_117", a$ = "_webColumns_h9m4w_124", t$ = "_webGroup_h9m4w_130", n$ = "_webPeople_h9m4w_131", r$ = "_webVia_h9m4w_132", l$ = "_webMeta_h9m4w_161", z = {
  label: Vk,
  name: Yk,
  column: Jk,
  webFrame: Xk,
  webHead: Qk,
  webHeadLabel: Zk,
  webLabel: e$,
  webColumns: a$,
  webGroup: t$,
  webPeople: n$,
  webVia: r$,
  webMeta: l$
}, o$ = {
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
function i$(e) {
  if (!e.matrixRole) return;
  const a = o$[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function s$({ node: e }) {
  const a = i$(e);
  return /* @__PURE__ */ o("span", { className: z.label, children: [
    /* @__PURE__ */ t("span", { className: z.name, children: e.name }),
    /* @__PURE__ */ t(c$, { role: a, node: e }),
    /* @__PURE__ */ t(Ga, { column: Ka[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Ga, { column: Ka[1], children: e.people === void 0 ? "" : ee(e.people) }),
    /* @__PURE__ */ t(Ga, { column: Ka[2], children: e.requestedVia ?? "" })
  ] });
}
function c$({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function d$({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ t(
    En,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ t(s$, { node: n }),
      children: s
    }
  );
}
function Ua({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function u$({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ua, { className: `${z.webMeta} ${z.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ua, { className: `${z.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ua, { className: `${z.webMeta} ${z.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function m$() {
  return /* @__PURE__ */ o("div", { className: z.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: z.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: z.webColumns, children: [
      /* @__PURE__ */ t("span", { className: z.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: z.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: z.webVia, children: "Requested via" })
    ] })
  ] });
}
function h$({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function w$(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function f$({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: z.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(m$, {}),
    /* @__PURE__ */ t(Jm, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      En,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(h$, { row: n }),
        detail: /* @__PURE__ */ t(u$, { row: n }),
        expanded: w$(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function wT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(f$, { ...e }) : /* @__PURE__ */ t(d$, { ...e });
}
const _$ = "_runbook_b9agc_2", v$ = "_list_b9agc_7", b$ = "_step_b9agc_15", p$ = "_numeral_b9agc_21", g$ = "_body_b9agc_28", y$ = "_head_b9agc_34", N$ = "_title_b9agc_40", k$ = "_detail_b9agc_45", $$ = "_actions_b9agc_50", C$ = "_webList_b9agc_56", S$ = "_webStep_b9agc_60", R$ = "_webBody_b9agc_66", T$ = "_webTitle_b9agc_74", L$ = "_webDetail_b9agc_78", A = {
  runbook: _$,
  list: v$,
  step: b$,
  numeral: p$,
  body: g$,
  head: y$,
  title: N$,
  detail: k$,
  actions: $$,
  webList: C$,
  webStep: S$,
  webBody: R$,
  webTitle: T$,
  webDetail: L$
}, wr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function fr(e) {
  return String(e + 1).padStart(2, "0");
}
function x$({ step: e, index: a, connection: n }) {
  const r = wr[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: A.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: A.numeral, children: fr(a) }),
    /* @__PURE__ */ o("span", { className: A.body, children: [
      /* @__PURE__ */ o("span", { className: A.head, children: [
        /* @__PURE__ */ t("span", { className: A.title, children: e.title }),
        /* @__PURE__ */ t(h, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ t(Le, { startedAt: e.startedAt, connection: n })
      ] }),
      /* @__PURE__ */ t("span", { className: A.detail, children: e.detail })
    ] })
  ] });
}
function A$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: A.list, children: e.map((r, l) => /* @__PURE__ */ t(x$, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: A.actions, children: a })
  ] });
}
function E$({ step: e, index: a, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${A.step} ${A.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${A.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: fr(a) }),
    /* @__PURE__ */ o("span", { className: `${A.body} ${A.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${A.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${A.title} ${A.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(h, { ...wr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t(Le, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${A.detail} ${A.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function I$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${A.list} ${A.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(E$, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${A.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function fT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(I$, { ...e }) : /* @__PURE__ */ t(A$, { ...e });
}
const M$ = "_list_1gu6a_2", q$ = "_check_1gu6a_10", B$ = "_body_1gu6a_16", P$ = "_text_1gu6a_23", j$ = "_pending_1gu6a_32", D$ = "_measured_1gu6a_37", Qe = {
  list: M$,
  check: q$,
  body: B$,
  text: P$,
  pending: j$,
  measured: D$
};
function O$(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function H$({ check: e }) {
  const a = O$(e.passed);
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
function _T({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(H$, { check: a }, a.text)) });
}
const F$ = "_root_4aacj_2", z$ = "_list_4aacj_10", W$ = "_line_4aacj_26", K$ = "_at_4aacj_53", G$ = "_text_4aacj_57", U$ = "_foot_4aacj_61", V$ = "_idle_4aacj_73", Y$ = "_caret_4aacj_81", J$ = "_jump_4aacj_88", we = {
  root: F$,
  list: z$,
  line: W$,
  at: K$,
  text: G$,
  foot: U$,
  idle: V$,
  caret: Y$,
  jump: J$
}, X$ = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function ft(e) {
  return Number.isNaN(Date.parse(e)) ? "" : X$.format(new Date(e));
}
const Q$ = { warn: "warning", ok: "ok" };
function Z$({ kind: e }) {
  const a = Q$[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function e0({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${ft(e)}` });
}
function a0({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${ft(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${we.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${we.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: we.idle, children: i }),
    /* @__PURE__ */ t(e0, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const t0 = 8;
function n0(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > t0;
}
function r0({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${we.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const _r = Te(null);
function vT({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Jt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(_r.Provider, { value: i, children: n });
}
function l0() {
  const e = Re(_r), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function bT({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = _(null), [i, s] = p(0), [c, d] = l0(), [u, m] = p(!1), w = e.at(-1);
  S(() => {
    s(e.length);
  }, [e.length]), aa(() => {
    const y = l.current;
    y && !u && (y.scrollTop = y.scrollHeight);
  }, [e.length, u]);
  const f = () => {
    var B;
    const y = l.current;
    if (!y) return;
    const x = y.querySelectorAll("[data-consline-text]");
    (B = x.item(x.length - 1)) == null || B.focus(), m(!1);
  };
  return /* @__PURE__ */ o("div", { className: we.root, children: [
    /* @__PURE__ */ t("ol", { className: we.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, "data-empty": e.length === 0 || void 0, onScroll: (y) => m(n0(y.currentTarget)), children: e.map((y, x) => /* @__PURE__ */ o("li", { className: `${we.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": x < i, children: [
      /* @__PURE__ */ t("span", { className: we.at, children: ft(y.at) }),
      /* @__PURE__ */ t(Z$, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: we.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${x}`)) }),
    /* @__PURE__ */ o(a0, { connection: a, idleSince: n, last: w, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${we.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t(r0, { shown: u, onJump: f })
    ] })
  ] });
}
const o0 = "_row_1k8wl_2", i0 = "_head_1k8wl_14", s0 = "_author_1k8wl_20", c0 = "_eta_1k8wl_25", d0 = "_edited_1k8wl_26", u0 = "_body_1k8wl_32", m0 = "_reason_1k8wl_37", h0 = "_actions_1k8wl_42", Ne = {
  row: o0,
  head: i0,
  author: s0,
  eta: c0,
  edited: d0,
  body: u0,
  reason: m0,
  actions: h0
}, w0 = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function f0(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function _0({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function v0({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: Ne.reason, id: a, children: e })
  ] });
}
function b0(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function p0(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(_0, { ...e }) : /* @__PURE__ */ t(v0, { reason: e.unavailable, reasonId: e.unavailableId });
}
function pT(e) {
  const { comment: a } = e;
  b0(e);
  const n = N(), r = `${n}-unavailable`, l = w0[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${Ne.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Ne.head, children: [
      /* @__PURE__ */ t("span", { className: Ne.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: Ne.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: Ne.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: Ne.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: Ne.reason, id: n, children: f0(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: Ne.actions, children: /* @__PURE__ */ t(p0, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const g0 = "_root_rvhdw_2", y0 = "_attach_rvhdw_11", N0 = "_actions_rvhdw_17", k0 = "_reply_rvhdw_23", $0 = "_replyField_rvhdw_28", C0 = "_send_rvhdw_54", S0 = "_sendIcon_rvhdw_65", R0 = "_sendsAs_rvhdw_75", Pe = {
  root: g0,
  attach: y0,
  actions: N0,
  reply: k0,
  replyField: $0,
  send: C0,
  sendIcon: S0,
  sendsAs: R0
};
function vr({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function T0() {
  return /* @__PURE__ */ t("svg", { className: Pe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function L0(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function x0(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = vr(e), s = N(), c = () => {
    l.trim() !== "" && r(n, l);
  }, d = (u) => {
    L0(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: Pe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Pe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ t(M, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: Pe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ t(T0, {}),
        /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: Pe.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function gT(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(x0, { ...e }) : /* @__PURE__ */ t(A0, { ...e });
}
function A0(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = vr(e);
  return /* @__PURE__ */ o("div", { className: Pe.root, children: [
    /* @__PURE__ */ t(M, { kind: "textarea", label: a, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: Pe.attach, children: [
      /* @__PURE__ */ t(h, { role: "soft", label: r.label }),
      /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ t(
      on,
      {
        label: `Requeue ${l.agent} after posting`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Pe.actions, children: [
      /* @__PURE__ */ t(b, { variant: "primary", onClick: () => i(n, c), children: `Post as ${n}` }),
      s && /* @__PURE__ */ t(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const E0 = "_list_1yhks_2", I0 = "_item_1yhks_6", M0 = "_body_1yhks_22", q0 = "_text_1yhks_28", B0 = "_evidence_1yhks_37", P0 = "_consequence_1yhks_49", j0 = "_note_1yhks_54", Ke = {
  list: E0,
  item: I0,
  body: M0,
  text: q0,
  evidence: B0,
  consequence: P0,
  note: j0
};
function D0({ criterion: e }) {
  return /* @__PURE__ */ t(Oe, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Gt({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function O0(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function H0({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Ke.body, children: [
    /* @__PURE__ */ t("span", { className: Ke.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Gt, { text: " · " }),
      /* @__PURE__ */ t("code", { className: Ke.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Gt, { text: " · " }),
      /* @__PURE__ */ t("span", { className: Ke.consequence, children: O0(e.why) })
    ] })
  ] });
}
function F0({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Ke.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(D0, { criterion: e }),
    /* @__PURE__ */ t(H0, { criterion: e })
  ] });
}
function yT({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${Ke.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(F0, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: Ke.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const z0 = "_list_dwhoz_2", W0 = "_rung_dwhoz_6", K0 = "_name_dwhoz_18", G0 = "_actor_dwhoz_32", ga = {
  list: z0,
  rung: W0,
  name: K0,
  actor: G0
}, U0 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function V0({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = U0[e.state];
  return /* @__PURE__ */ o("li", { className: ga.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ga.name, children: e.name }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ga.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function NT({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ga.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(V0, { rung: a }, a.name)) });
}
const Y0 = "_sheet_pw37w_2", J0 = "_title_pw37w_9", X0 = "_stage_pw37w_15", Q0 = "_effects_pw37w_20", Z0 = "_effect_pw37w_20", eC = "_numeral_pw37w_31", aC = "_effectText_pw37w_38", tC = "_refusals_pw37w_43", nC = "_reasons_pw37w_52", rC = "_reason_pw37w_52", lC = "_actions_pw37w_62", ue = {
  sheet: Y0,
  title: J0,
  stage: X0,
  effects: Q0,
  effect: Z0,
  numeral: eC,
  effectText: aC,
  refusals: tC,
  reasons: nC,
  reason: rC,
  actions: lC
};
function oC({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function kT({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
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
      Iu,
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
      /* @__PURE__ */ t(oC, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ t(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const iC = "_list_1rowi_2", sC = "_path_1rowi_7", cC = "_head_1rowi_21", dC = "_label_1rowi_28", uC = "_consequence_1rowi_35", mC = "_ask_1rowi_36", ea = {
  list: iC,
  path: sC,
  head: cC,
  label: dC,
  consequence: uC,
  ask: mC
}, Za = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Ut(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Vt(e) {
  return e ? "primary" : "secondary";
}
function hC({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(b, { variant: Vt(a), size: "sm", onClick: () => n(e.kind), children: Za[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: Vt(a), size: "sm", disabled: !0, describedBy: r, children: Za[e.kind] }),
    /* @__PURE__ */ t("span", { className: ea.ask, id: r, children: e.askInstead })
  ] });
}
function wC({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: ea.path, "data-allowed": e.allowed, "data-role": Ut(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: ea.head, children: [
      /* @__PURE__ */ t("span", { className: ea.label, children: e.title ?? Za[e.kind] }),
      /* @__PURE__ */ t(h, { role: Ut(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: ea.consequence, children: e.consequence }),
    /* @__PURE__ */ t(hC, { path: e, primary: a, onChoose: n })
  ] });
}
function $T({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: ea.list, children: e.map((n, r) => /* @__PURE__ */ t(wC, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const fC = "_list_1m7i0_2", _C = "_item_1m7i0_6", vC = "_node_1m7i0_18", bC = "_body_1m7i0_24", pC = "_head_1m7i0_30", gC = "_stage_1m7i0_36", yC = "_version_1m7i0_41", NC = "_sentence_1m7i0_49", kC = "_meta_1m7i0_54", $e = {
  list: fC,
  item: _C,
  node: vC,
  body: bC,
  head: pC,
  stage: gC,
  version: yC,
  sentence: NC,
  meta: kC
}, $C = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function CC({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: $e.head, children: [
    /* @__PURE__ */ t("span", { className: $e.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: $e.version, title: e.version, children: e.version }) : null
  ] });
}
function SC({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${$e.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${$e.node} ward-history-node`, children: /* @__PURE__ */ t(Oe, { size: 9, kind: $C[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${$e.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(CC, { entry: e }),
      /* @__PURE__ */ t("span", { className: $e.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${$e.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ne(e.cost)}`
      ] })
    ] })
  ] });
}
function CT({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${$e.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(SC, { entry: a }, a.stage + String(n))) });
}
const RC = "_thread_1e70p_3", TC = "_turn_1e70p_8", LC = "_who_1e70p_27", xC = "_body_1e70p_32", ya = {
  thread: RC,
  turn: TC,
  who: LC,
  body: xC
}, br = Te(!1);
function ST({ children: e, density: a }) {
  return /* @__PURE__ */ t(br.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${ya.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function RT({ turn: e }) {
  if (!Re(br)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ya.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ya.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${ya.body} ward-chat-body`, children: e.body })
  ] });
}
const AC = "_list_yiolt_3", EC = "_row_yiolt_7", IC = "_label_yiolt_20", MC = "_n_yiolt_26", qC = "_cause_yiolt_33", oa = {
  list: AC,
  row: EC,
  label: IC,
  n: MC,
  cause: qC
};
function BC(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const PC = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function jC({ row: e, formatNumber: a }) {
  return BC(e), /* @__PURE__ */ o("li", { className: `${oa.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(Oe, { size: 8, ...PC[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: oa.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${oa.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(DC, { cause: e.cause })
  ] });
}
function DC({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${oa.cause} ward-healthrow-cause`, children: e }) : null;
}
function TT({ rows: e, formatNumber: a = ee }) {
  return /* @__PURE__ */ t("ul", { className: `${oa.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(jC, { row: n, formatNumber: a }, n.label)) });
}
const OC = "_root_1jxwp_2", HC = {
  root: OC
};
function LT({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: HC.root, "data-density": l, children: [
    /* @__PURE__ */ t(Da, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const FC = "_row_dhbre_3", zC = "_key_dhbre_13", WC = "_stack_dhbre_24", KC = "_value_dhbre_32", GC = "_evidence_dhbre_39", UC = "_mark_dhbre_47", Xe = {
  row: FC,
  key: zC,
  stack: WC,
  value: KC,
  evidence: GC,
  mark: UC
};
function VC({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(ot, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function xT({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(VC, { state: e.state }) })
  ] });
}
const YC = "_cell_gh2sd_2", JC = {
  cell: YC
}, XC = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function QC(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function ZC(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function eS(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: QC(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function aS(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function AT({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  ZC(e, n);
  const r = aS(e);
  return /* @__PURE__ */ t(
    Uu,
    {
      label: "Rejection routing",
      columns: XC,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: JC.cell, "data-norerun": l.noRerun ? !0 : void 0, children: eS(l, i) }),
      empty: a ?? /* @__PURE__ */ t(qh, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const tS = "_row_1f2re_2", nS = "_title_1f2re_12", rS = "_turns_1f2re_18", lS = "_waiting_1f2re_19", oS = "_resolved_1f2re_20", iS = "_activity_1f2re_21", sS = "_cost_1f2re_28", cS = "_link_1f2re_29", dS = "_tableLink_1f2re_47", uS = "_tableRecord_1f2re_48", mS = "_tableRow_1f2re_59", hS = "_tableTitle_1f2re_71", wS = "_tableResolved_1f2re_76", fS = "_tableMeta_1f2re_87", _S = "_tableCost_1f2re_94", vS = "_tableActivity_1f2re_95", bS = "_tableState_1f2re_105", D = {
  row: tS,
  title: nS,
  turns: rS,
  waiting: lS,
  resolved: oS,
  activity: iS,
  cost: sS,
  link: cS,
  tableLink: dS,
  tableRecord: uS,
  tableRow: mS,
  tableTitle: hS,
  tableResolved: wS,
  tableMeta: fS,
  tableCost: _S,
  tableActivity: vS,
  tableState: bS
}, pr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function pS(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function gS(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function yS(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const NS = { duplicate: "Closed · duplicate" };
function kS({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(ta, { className: D.tableMeta, text: `waiting on ${e}` });
}
function $S({ value: e }) {
  return /* @__PURE__ */ t("td", { className: D.tableCost, children: e === void 0 ? null : ne(e) });
}
function CS({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${D.tableRecord} ward-target`, href: H(e.href), children: `→ ${e.key}` });
}
function SS({ session: e, href: a }) {
  const n = pr[e.state];
  return /* @__PURE__ */ o("tr", { className: D.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: D.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${D.tableLink} ward-target`, href: H(a), children: /* @__PURE__ */ t(ta, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: D.tableMeta, children: gS(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: D.tableResolved, children: [
      yS(e.resolved),
      /* @__PURE__ */ t(kS, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t($S, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: D.tableActivity, children: pS(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: D.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: NS[e.state] ?? n.label }),
      /* @__PURE__ */ t(CS, { link: e.link })
    ] }) })
  ] });
}
function RS({ session: e }) {
  const a = pr[e.state];
  return /* @__PURE__ */ o("div", { className: D.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t(ta, { className: D.title, text: e.title }),
    /* @__PURE__ */ t("span", { className: D.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t(ta, { className: D.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: D.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: D.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : ne(e.cost) }),
    /* @__PURE__ */ t("span", { className: D.activity, children: de(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: D.link, href: H(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function ET(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(SS, { session: e.session, href: e.href }) : /* @__PURE__ */ t(RS, { session: e.session });
}
const TS = "_block_1yy2v_3", LS = "_list_1yy2v_9", xS = "_line_1yy2v_14", et = {
  block: TS,
  list: LS,
  line: xS
}, AS = { warn: "warning", ok: "ok" };
function ES({ kind: e }) {
  const a = AS[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function IS({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${et.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(ES, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function IT({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${et.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: et.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(IS, { line: n }, `${r}-${n.text}`)) }) });
}
const MS = "_band_tt7hp_1", qS = "_head_tt7hp_8", BS = "_cell_tt7hp_19", PS = "_index_tt7hp_35", jS = "_title_tt7hp_42", DS = "_note_tt7hp_48", OS = "_cellTitle_tt7hp_53", HS = "_cellBody_tt7hp_58", FS = "_tag_tt7hp_64", ye = {
  band: MS,
  head: qS,
  cell: BS,
  index: PS,
  title: jS,
  note: DS,
  cellTitle: OS,
  cellBody: HS,
  tag: FS
}, Yt = 4;
function MT({ index: e, title: a, note: n, cells: r }) {
  if (r.length !== Yt)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Yt}-cell grid`);
  return /* @__PURE__ */ o("section", { className: ye.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: ye.head, children: [
      /* @__PURE__ */ t("span", { className: ye.index, children: e }),
      /* @__PURE__ */ t("span", { className: ye.title, children: a }),
      /* @__PURE__ */ t("span", { className: ye.note, children: n })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: ye.cell, children: [
      /* @__PURE__ */ t("span", { className: ye.cellTitle, children: l.title }),
      /* @__PURE__ */ t("span", { className: ye.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ t("span", { className: ye.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  ZS as ACCENT_PRESETS,
  bR as ActionStack,
  bT as ActivityConsole,
  iR as AdminIcon,
  X_ as AgentCard,
  sR as AppShell,
  tT as AppearanceStrip,
  MT as Band,
  fR as BarChart,
  fw as BoardColumn,
  qR as BoardFootnote,
  BR as BoardHeader,
  lR as BoardIcon,
  SR as BoardScroller,
  b as Btn,
  QS as CHIP_ROLES,
  rr as CREDENTIAL_COLUMNS,
  wR as Callout,
  nT as CapabilityRow,
  TR as CardGrid,
  RT as ChatMessage,
  on as Checkbox,
  h as Chip,
  ta as ClampText,
  pT as ClarificationRow,
  GR as ClauseRuleRow,
  KR as ClauseRules,
  jn as ColourLadder,
  rT as ComponentRow,
  gT as Composer,
  jR as ConfigRow,
  PR as ConfigRowHead,
  it as ConnectionMark,
  vT as ConsoleAnnounceProvider,
  ST as Conversation,
  Iu as CostMeter,
  oT as CredentialRow,
  lT as CredentialRowHead,
  yT as CriteriaList,
  Pi as Crumb,
  eR as DENSITIES,
  TT as DeliveryHealth,
  xR as DeniedState,
  nR as DisabledScope,
  VR as DryRunRail,
  qh as EmptyState,
  iT as EnvCard,
  M as Field,
  LR as FilteredEmpty,
  $R as FormStack,
  Da as GateChecklist,
  NT as GateLadder,
  Uu as Grid,
  JR as HandoffRuleRow,
  YR as HandoffRules,
  rR as HomeIcon,
  DR as ItemDrawer,
  sT as KeyPanel,
  Hr as LIVE_EVENT_TYPES,
  p_ as LegacyBoardColumn,
  HR as LegacyBoardHeader,
  FR as LegacyConfigRow,
  WR as LegacyItemDrawer,
  m_ as LegacyOverCapNote,
  zR as LegacyPreviewRail,
  qn as LegacyWorkCard,
  Le as LiveIndicator,
  AR as LoadFailed,
  MR as Loading,
  dr as MCP_SERVER_COLUMNS,
  ot as Mark,
  dT as MarkUpload,
  Oe as Marker,
  mT as McpServerRow,
  uT as McpServerRowHead,
  rc as Menu,
  Ws as MenuButton,
  XR as NewStreamModal,
  jh as OverCapNote,
  Ma as OverflowRow,
  na as Overlay,
  UR as PARTIAL_STEP_REASON,
  ur as POLICY_CHIP_WIDTH,
  yR as PageFrame,
  hR as PageHeader,
  _R as PlainList,
  hT as PolicyRow,
  OR as PreviewRail,
  Ka as ROLE_MATRIX_COLUMNS,
  Jn as RULE_ACTIONS,
  Rn as Radio,
  LT as ReadyChecklist,
  kR as RecordSection,
  kT as RequeueSheet,
  $T as ResolveBlock,
  xT as ResolvedFieldRow,
  wT as RoleMatrixRow,
  AT as RoutingTable,
  QR as RuleRow,
  fT as RunbookSteps,
  Or as STREAM_STEPS,
  CR as SectionBand,
  Et as SectionHeader,
  Cn as SegmentedControl,
  fn as Select,
  ET as SessionRow,
  uR as Sidebar,
  ZR as StageColumn,
  RR as StageGrid,
  CT as StageHistory,
  Ep as StageListEditor,
  ER as StaleStrip,
  Ba as StatStrip,
  pR as StatTiles,
  mR as StreamAvatar,
  eT as StreamRow,
  oR as StudioIcon,
  NR as SubjectRail,
  Ge as Switch,
  dR as TabLinks,
  vR as TableHead,
  cR as Tabs,
  VS as ThemeProvider,
  aT as ToolRow,
  gR as TopBar,
  Jm as Tree,
  En as TreeRow,
  IT as TypedInputBlock,
  Ro as UNSAFE_HREF,
  _T as ValidationList,
  GS as VisibilityProvider,
  US as Visible,
  XS as WARD_VERSION,
  ja as WorkCard,
  IR as WriteUnavailableStrip,
  pS as agoSince,
  Rr as clock,
  Yp as colourStatus,
  ee as count,
  ce as duration,
  at as elapsed,
  JS as eventSourceTransport,
  Aa as isStreamStep,
  sa as isValidatedStreamStep,
  Rv as ladderValidation,
  pk as mcpConnectionChip,
  vk as mcpToolName,
  ne as money,
  fe as ms,
  In as ordered,
  Qt as ratio,
  DN as restartLabel,
  H as safeHref,
  de as stamp,
  tt as stream,
  aR as streamChip,
  qa as streamChipProps,
  pe as streamColour,
  Wr as streamHex,
  dd as streamInitials,
  Fr as streamVars,
  va as useBorderFlash,
  xe as useDisabledScope,
  Pr as useFocusTrap,
  tR as useLiveFeed,
  YS as useReturnFocus,
  xa as useRovingTabindex,
  nt as useTicker,
  Tr as useVisible,
  W as v,
  cT as validateMark,
  ua as validatedStep,
  en as validatedStreamSteps
};
