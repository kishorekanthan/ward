import { jsx as t, Fragment as T, jsxs as l } from "react/jsx-runtime";
import { useMemo as Yt, useContext as Re, createContext as Te, useState as p, useEffect as S, useCallback as X, useRef as f, useLayoutEffect as aa, useId as N, isValidElement as br, Children as pr, Fragment as gr } from "react";
import { createPortal as yr, flushSync as Jt } from "react-dom";
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
const Nr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = Nr.formatToParts(new Date(e)), n = (r) => {
    var o;
    return ((o = a.find((i) => i.type === r)) == null ? void 0 : o.value) ?? "";
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
function Xt(e, a) {
  return `${e} / ${a}`;
}
const kr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function $r(e) {
  return kr.format(new Date(e));
}
const Qt = Te(/* @__PURE__ */ new Set());
function IS({ hidden: e, children: a }) {
  const n = Yt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Qt.Provider, { value: n, children: a });
}
function Cr(e) {
  return !Re(Qt).has(e);
}
function MS({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(T, { children: Cr(e) ? a : n });
}
const Sr = "(prefers-color-scheme: dark)";
function vt() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Sr) : null;
}
function Rr(e) {
  const [a, n] = p(() => {
    var r;
    return ((r = vt()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? vt() : null;
    if (!r) return;
    const o = () => n(r.matches);
    return o(), r.addEventListener("change", o), () => r.removeEventListener("change", o);
  }, [e]), a;
}
function Oa(e, a) {
  S(() => {
    const n = document.documentElement;
    return n.setAttribute(e, a), () => n.removeAttribute(e);
  }, [e, a]);
}
function Tr(e, a) {
  return e !== "system" ? e : a ? "dark" : "light";
}
function qS({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
  const o = Rr(e === "system");
  return Oa("data-theme", Tr(e, o)), Oa("data-accent", a), Oa("data-density", n), /* @__PURE__ */ t(T, { children: r });
}
const xr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Lr(e, a) {
  return document.activeElement === a || document.activeElement === e;
}
function Ar(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function Er(e, a, n, r) {
  return e.shiftKey ? Lr(a, n) ? r : void 0 : document.activeElement === r || Ar(a) ? n : void 0;
}
function Ir(e, a, n) {
  const r = n[0], o = n[n.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = Er(e, a, r, o);
  i && (e.preventDefault(), i.focus());
}
function Mr(e) {
  return { onKeyDown: X(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(xr));
      Ir(n, e.current, r);
    },
    [e]
  ) };
}
function BS(e, a = !0) {
  S(() => {
    if (!a) return;
    const n = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [a, e]);
}
const bt = { ArrowUp: -1, ArrowDown: 1 }, pt = { ArrowLeft: -1, ArrowRight: 1 }, qr = (e, a, n) => Math.min(n, Math.max(a, e));
function Br(e, a) {
  if (a !== "horizontal" && e in bt) return bt[e];
  if (a !== "vertical" && e in pt) return pt[e];
}
function La({ orientation: e = "both" } = {}) {
  const [a, n] = p(0), r = f(/* @__PURE__ */ new Map()), o = f(!1);
  aa(() => {
    var w;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(a)) return;
    const m = u[0], _ = o.current;
    o.current = !1, n(m), _ && ((w = r.current.get(m)) == null || w.focus());
  });
  const i = X((u) => n(u), []), s = X((u) => {
    var m;
    n(u), (m = r.current.get(u)) == null || m.focus();
  }, []), c = X(
    (u) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const _ = Math.max(0, m.indexOf(a)), w = Br(u.key, e);
      w !== void 0 ? (u.preventDefault(), s(m[qr(_ + w, 0, m.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(m[0])) : u.key === "End" && (u.preventDefault(), s(m[m.length - 1]));
    },
    [a, s, e]
  ), d = X(
    (u) => ({
      tabIndex: u === a ? 0 : -1,
      ref: (m) => {
        m ? r.current.set(u, m) : (r.current.delete(u), u === a && (o.current = !0));
      },
      onFocus: () => n(u),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: i };
}
const PS = (e, a, n) => {
  const r = new EventSource(e), o = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, jS = "0.2.0", DS = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Pr = [1, 2, 3, 4, 5, 6], Zt = [1, 2, 3], jr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], OS = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], HS = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], z = {
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
}, we = {
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
  return Pr.includes(e);
}
function sa(e) {
  return Zt.includes(e);
}
function Dr(e) {
  if (!Aa(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function FS(e) {
  if (!Aa(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Or = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Hr(e) {
  if (!Aa(e)) throw new Error("unvalidated stream step");
  return Or[e];
}
function gt(e) {
  return typeof e != "string" ? null : jr.includes(e) ? e : null;
}
function Fr(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Wr(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function zr(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Kr(e, a, n) {
  const r = Fr(e);
  if (r === null) return null;
  const o = gt(n) ?? gt(r.type);
  return o === null ? null : { ...r, type: o, id: Wr(r, a), at: zr(r) };
}
function Gr(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function Ur(e, a, n) {
  return e >= we.heartbeat && !a && n !== null;
}
function WS(e, a) {
  const [n, r] = p("reconnecting"), [o, i] = p(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), m = f(null), _ = f(0), w = f(0), y = f(!1), L = f("reconnecting"), B = X((R) => {
    L.current = R, r(R);
  }, []), oe = X(() => {
    c.current = Date.now();
  }, []), Ae = X((R) => {
    for (const [G, ge] of s.current)
      (ge === "*" || R.itemKey === ge) && G(R);
  }, []), ae = X(() => {
    m.current = a(e, { lastEventId: d.current }, {
      onEvent: (R, G, ge) => {
        const De = Kr(R, G, ge);
        De !== null && (De.id && (d.current = De.id), oe(), y.current = !1, B("live"), i(De.at), Ae(De));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, oe(), B("live");
      },
      onError: () => {
        var G;
        (G = m.current) == null || G.close(), m.current = null, y.current = !0, L.current !== "stale" && B("reconnecting");
        const R = Math.min(we.reconnectBase * 2 ** u.current, we.reconnectMax);
        u.current += 1, _.current = window.setTimeout(ae, R);
      }
    });
  }, [Ae, B, oe, a, e]), Ue = X((R) => {
    y.current = !0, R.close(), m.current = null, _.current = window.setTimeout(ae, we.reconnectBase);
  }, [ae]), Ve = X((R, G) => (s.current.set(G, R), () => {
    s.current.delete(G);
  }), []);
  return S(() => (ae(), w.current = window.setInterval(() => {
    const R = Date.now() - c.current, G = Gr(R, L.current);
    G && B(G);
    const ge = m.current;
    Ur(R, y.current, ge) && Ue(ge);
  }, we.tick), () => {
    var R;
    window.clearInterval(w.current), window.clearTimeout(_.current), y.current = !1, (R = m.current) == null || R.close(), m.current = null;
  }), [ae, Ue, B]), { connection: n, lastEventAt: o, subscribe: Ve };
}
function nt(e, a) {
  const n = new Date(e).getTime(), [r, o] = p(() => Date.now());
  return S(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && o(Date.now());
    };
    i();
    const s = window.setInterval(i, we.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", i);
    };
  }, [a, n]), Math.max(0, r - n);
}
const Vr = { blue: "running", orange: "waiting", green: "done" };
function Yr() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function yt(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function va(e, a) {
  const n = f(0), r = X((o) => {
    const i = o ?? a, s = e.current;
    s !== null && i !== void 0 && (Yr() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${Vr[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => yt(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => yt(s), we.flash)));
  }, [a, e]);
  return S(() => () => window.clearTimeout(n.current), []), a === void 0 ? (o) => r(o) : () => r(a);
}
const Jr = "_root_1otpc_2", Xr = {
  root: Jr
};
function Qr(e, a, n, r, o) {
  const i = [at(a)];
  return e || i.push(`as of ${$r(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function xe({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const o = n !== "stale", i = nt(e, o), s = (a == null ? void 0 : a.at) ?? e, c = Qr(o, i, s, r, a);
  return /* @__PURE__ */ l("span", { className: `${Xr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const Zr = "_app_yqy5k_1", eo = "_side_yqy5k_30", ao = "_sideTop_yqy5k_42", to = "_sideBody_yqy5k_56", no = "_iconRail_yqy5k_94", ro = "_railItem_yqy5k_103", oo = "_railIcon_yqy5k_124", lo = "_railDot_yqy5k_129", io = "_railLetter_yqy5k_135", so = "_main_yqy5k_140", co = "_rail_yqy5k_103", uo = "_page_yqy5k_158", mo = "_headerRow_yqy5k_167", ho = "_sidebarToggle_yqy5k_174", wo = "_headerSlot_yqy5k_179", fo = "_drawerSide_yqy5k_184", _o = "_root_yqy5k_220", vo = "_topbar_yqy5k_227", bo = "_mark_yqy5k_238", po = "_brand_yqy5k_245", go = "_tagline_yqy5k_251", yo = "_identity_yqy5k_257", No = "_tools_yqy5k_258", ko = "_nav_yqy5k_268", $o = "_metadata_yqy5k_275", Co = "_actor_yqy5k_290", So = "_detail_yqy5k_291", Ro = "_content_yqy5k_336", To = "_toolsPanel_yqy5k_352", xo = "_skip_yqy5k_378", $ = {
  app: Zr,
  side: eo,
  sideTop: ao,
  sideBody: to,
  iconRail: no,
  railItem: ro,
  railIcon: oo,
  railDot: lo,
  railLetter: io,
  main: so,
  rail: co,
  page: uo,
  headerRow: mo,
  sidebarToggle: ho,
  headerSlot: wo,
  drawerSide: fo,
  root: _o,
  topbar: vo,
  mark: bo,
  brand: po,
  tagline: go,
  identity: yo,
  tools: No,
  nav: ko,
  metadata: $o,
  actor: Co,
  detail: So,
  content: Ro,
  toolsPanel: To,
  skip: xo
};
function ca(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Lo = "_scope_1an6i_2", Ao = {
  scope: Lo
}, en = Te(null);
function zS({ reason: e, actions: a = "disable", children: n }) {
  const r = N();
  return /* @__PURE__ */ l("fieldset", { disabled: !0, className: `${Ao.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ t("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ t(en.Provider, { value: { reason: e, reasonId: r, actions: a }, children: n })
  ] });
}
function Le() {
  return Re(en);
}
function Ea(e, a) {
  return !a || (e ?? "").split(" ").includes(a.reasonId) ? e : ca(e, a.reasonId);
}
const Eo = "_btn_tzr89_2", Io = "_primary_tzr89_14", Mo = "_destructive_tzr89_25", qo = "_secondary_tzr89_35", Bo = "_ghost_tzr89_40", Po = "_overflow_tzr89_49", jo = "_sm_tzr89_56", Do = "_disabled_tzr89_60", ma = {
  btn: Eo,
  primary: Io,
  destructive: Mo,
  secondary: qo,
  ghost: Bo,
  overflow: Po,
  sm: jo,
  disabled: Do
};
function Oo(e, a, n, r) {
  const o = a === "sm" ? [ma.sm, "ward-btn--sm"] : [], i = n ? [ma.disabled] : [];
  return [ma.btn, ma[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Ho(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Fo(e, a) {
  if (e.disabled && !a && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Wo(e, a) {
  return a ? a.reason : e.disabled ? e.disabledReason : void 0;
}
function zo(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Ko(e, a, n) {
  return zo(e.describedBy, a && n);
}
function Go({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Uo(e) {
  return e.children ?? e.label;
}
function b(e) {
  var a;
  return ((a = Le()) == null ? void 0 : a.actions) === "hide" ? null : /* @__PURE__ */ t(Vo, { ...e });
}
function Vo(e) {
  const a = Le();
  Fo(e, a);
  const n = e.variant ?? "secondary", r = e.size ?? "md", o = !!(e.disabled || a), i = Wo(e, a), s = N();
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: Oo(n, r, o, e.className),
        "data-ward-btn": n,
        "data-ward-size": r,
        disabled: o,
        title: i,
        "aria-describedby": Ko(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Ho(n, e.controls),
        children: Uo(e)
      }
    ),
    /* @__PURE__ */ t(Go, { id: s, reason: i })
  ] });
}
let rt = "none";
function Yo(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (rt = "key");
}
typeof document < "u" && (document.addEventListener("keydown", Yo, !0), document.addEventListener("pointerdown", () => {
  rt = "pointer";
}, !0));
function Jo() {
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
    const o = (s) => n(s.matches);
    return r.addEventListener("change", o), n(r.matches), () => r.removeEventListener("change", o);
  }, [e]), a;
}
const Xo = "_scrim_1cawq_2", Qo = "_drawer_1cawq_10", Zo = "_sheet_1cawq_14", el = "_modal_1cawq_18", al = "_panel_1cawq_23", tl = "_start_1cawq_44", nl = "_header_1cawq_67", rl = "_title_1cawq_75", ol = "_body_1cawq_79", ll = "_close_1cawq_106", Ce = {
  scrim: Xo,
  drawer: Qo,
  sheet: Zo,
  modal: el,
  panel: al,
  start: tl,
  header: nl,
  title: rl,
  body: ol,
  close: ll
}, il = Te(null), Na = [], ka = /* @__PURE__ */ new Map();
function sl(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function cl(e, a) {
  let n = ka.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ka.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function dl(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !sl(r) && cl(e, r);
}
function ul(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (dl(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function ml(e) {
  for (const a of e.claims) {
    const n = ka.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), ka.delete(a)));
  }
}
function hl(e, a) {
  const n = { root: e, claims: [] };
  return Na.push(n), ul(n, a), n;
}
function wl(e) {
  const a = Na.indexOf(e);
  a >= 0 && Na.splice(a, 1), ml(e);
}
function Nt(e) {
  return e !== null && Na.at(-1) === e;
}
function fl(e, a, n) {
  const r = f(null), o = f(n);
  return o.current = n, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = hl(i, a);
    return r.current = c, () => {
      var u, m;
      const d = Nt(c);
      wl(c), r.current = null, d && ((m = (u = o.current ?? s) == null ? void 0 : u.focus) == null || m.call(u));
    };
  }, [a]), X(() => Nt(r.current), []);
}
function _l(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function vl(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function bl({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t("header", { className: `${Ce.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Ce.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function pl(e) {
  return `${Ce.scrim} ${Ce[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function gl(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ce.panel} ${Ce[e]} ward-overlay-panel${n}${r}`;
}
function yl(e) {
  const a = Re(il);
  return e ?? a ?? document.body;
}
function na(e) {
  const a = f(null), n = f(null), r = N(), o = yl(e.container), i = Ia("(min-width: 768px)"), s = _l(e.kind, i), c = vl(e, r), d = Mr(n), [u] = p(Jo), m = fl(a, o, e.returnFocusTo), _ = X(() => {
    m() && e.onClose();
  }, [e.onClose, m]);
  return S(() => {
    var w;
    m() && ((w = n.current) == null || w.focus());
  }, [m]), S(() => {
    const w = (y) => {
      y.key === "Escape" && _();
    };
    return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
  }, [_]), yr(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: pl(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: _,
        children: /* @__PURE__ */ l(
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
            className: gl(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (w) => w.stopPropagation(),
            onKeyDown: (w) => m() && d.onKeyDown(w),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Ce.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: _, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(bl, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Nl = /^([a-z][a-z0-9+.-]*):/i, kl = /* @__PURE__ */ new Set(["http", "https"]), $l = "#";
function Cl(e) {
  var r, o;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (o = (r = Nl.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : o.toLowerCase();
}
function H(e) {
  const a = Cl(e);
  return a === void 0 || kl.has(a) ? e : $l;
}
function Sl(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function an(e) {
  const a = Sl(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function Rl(e, a) {
  S(() => {
    const n = e.current;
    if (!n) return;
    const r = () => an(n);
    n.addEventListener("scroll", r, { passive: !0 });
    const o = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [n, ...n.children]) o == null || o.observe(i);
    return r(), () => {
      n.removeEventListener("scroll", r), o == null || o.disconnect();
    };
  }, [e, a]);
}
function Tl(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, o = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : o > e.clientWidth - n ? e.scrollLeft + o - e.clientWidth + n : null;
}
function tn(e, a, n) {
  aa(() => {
    const r = e.current, o = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !o) return;
    const i = Tl(r, o);
    i !== null && (r.scrollLeft = Math.max(0, i)), an(r);
  }, [e, a, n]);
}
const xl = "_row_160e9_2", Ll = {
  row: xl
};
function Al(e, a) {
  return e ? { role: a === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Ma({ label: e, children: a, count: n, as: r = "div", focusable: o = !0, rowRef: i, className: s, ...c }) {
  const d = f(null), u = i ?? d;
  return Rl(u, n), /* @__PURE__ */ t(r, { ref: u, className: [Ll.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Al(o, r), ...c, children: a });
}
const El = "_icon_1ylqy_2", Il = {
  icon: El
};
function da({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: Il.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function KS() {
  return /* @__PURE__ */ t(da, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function GS() {
  return /* @__PURE__ */ l(da, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function US() {
  return /* @__PURE__ */ l(da, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function VS() {
  return /* @__PURE__ */ t(da, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Ml() {
  return /* @__PURE__ */ l(da, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const nn = "ward:sidebar-collapsed", ql = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Bl() {
  try {
    return window.localStorage.getItem(nn) === "true";
  } catch {
    return !1;
  }
}
function Pl(e) {
  try {
    window.localStorage.setItem(nn, String(e));
  } catch {
  }
}
function jl(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Dl(e) {
  return e instanceof Element && e.closest(ql) !== null;
}
function Ol(e) {
  return e.key === "[" && !jl(e) && !Dl(e.target);
}
function Hl(e) {
  const [a, n] = p(Bl), r = () => {
    Pl(!a), n(!a);
  };
  return S(() => {
    if (!e) return;
    const o = (i) => {
      var c;
      if (!Ol(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [e, a]), { collapsed: a, toggle: r };
}
function Fl() {
  const e = Ia("(max-width: 791.98px)"), a = N(), n = f(null), [r, o] = p(!1);
  return r && !e && o(!1), { narrow: e, open: r, drawerId: a, slotRef: n, toggle: () => o(!r), close: () => o(!1) };
}
function Wl({ header: e, label: a, drawer: n }) {
  return n.narrow ? /* @__PURE__ */ l("div", { className: $.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.drawerId, children: a }) }),
    /* @__PURE__ */ t("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function zl({ sidebar: e, label: a, drawer: n }) {
  var o;
  if (!n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ t(na, { kind: "start", id: n.drawerId, title: a, flush: !0, onClose: n.close, returnFocusTo: (o = n.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ t("div", { className: $.drawerSide, onClick: r, children: rn(e, !1) }) });
}
function Kl(e, a, n) {
  const r = n === void 0 && e !== void 0 && !a, { collapsed: o, toggle: i } = Hl(r);
  return n === void 0 ? Gl(r, o, i) : Ul(n, a, i);
}
function Gl(e, a, n) {
  return { enabled: e, collapsed: e && a, rail: e && a, owned: !1, toggle: n };
}
function Ul(e, a, n) {
  return { enabled: !1, collapsed: e && !a, rail: !1, owned: !0, toggle: n };
}
const Vl = (e) => e ? "" : void 0;
function rn(e, a) {
  return typeof e == "function" ? e(a) : e;
}
function Yl({ fold: e }) {
  return e.enabled ? /* @__PURE__ */ t("div", { className: $.sideTop, children: /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(Ml, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] }) }) : null;
}
function Jl({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": tt(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Xl({ items: e, label: a }) {
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ l("a", { className: $.railItem, href: H(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(Jl, { item: n }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function Ql({ sidebar: e, label: a, iconRail: n, fold: r }) {
  return /* @__PURE__ */ l("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(Yl, { fold: r }),
    /* @__PURE__ */ t("div", { className: $.sideBody, hidden: r.rail, children: rn(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ t(Xl, { items: n ?? [], label: a })
  ] });
}
function Zl({ sidebar: e, header: a, children: n, rail: r, sidebarLabel: o, iconRail: i, collapsed: s }) {
  const c = r != null, d = Fl(), u = Kl(i, d.narrow, s), m = o ?? "Menu";
  return /* @__PURE__ */ l("div", { className: $.app, "data-rail": String(c), "data-collapsed": String(u.collapsed), "data-consumer-fold": Vl(u.owned), children: [
    !d.narrow && /* @__PURE__ */ t(Ql, { sidebar: e, label: m, iconRail: i, fold: u }),
    /* @__PURE__ */ l("main", { className: $.main, children: [
      /* @__PURE__ */ t(Wl, { header: a, label: m, drawer: d }),
      /* @__PURE__ */ t("div", { className: $.page, children: n })
    ] }),
    c && /* @__PURE__ */ t("div", { className: $.rail, children: r }),
    /* @__PURE__ */ t(zl, { sidebar: e, label: m, drawer: d })
  ] });
}
function ei({ destinations: e, active: a }) {
  const n = f(null);
  return tn(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t(Ma, { as: "nav", rowRef: n, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ t("a", { href: H(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Va({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function ai({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ l("span", { className: $.metadata, children: [
    /* @__PURE__ */ t(Va, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Va, { value: a, className: $.detail })
  ] });
}
function ti() {
  const e = Ia("(max-width: 767.98px)"), a = N(), n = f(null), [r, o] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function ni({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: $.tools, children: e });
}
function ri({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function oi(e) {
  return /* @__PURE__ */ l("header", { className: $.topbar, children: [
    /* @__PURE__ */ t("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Va, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ t(ei, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: $.identity, children: /* @__PURE__ */ t(ai, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(ni, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function li(e) {
  const a = N(), n = ti();
  return /* @__PURE__ */ l("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(oi, { ...e, menu: n }),
    /* @__PURE__ */ t(ri, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: $.content, children: e.children })
  ] });
}
function ii(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function YS(e) {
  return ii(e) ? /* @__PURE__ */ t(Zl, { ...e }) : /* @__PURE__ */ t(li, { ...e });
}
const si = "_root_197jc_2", ci = "_row_197jc_8", di = "_box_197jc_14", ui = "_label_197jc_21", mi = "_lockedNote_197jc_26", hi = "_consequence_197jc_34", wi = "_sample_197jc_69", He = {
  root: si,
  row: ci,
  box: di,
  label: ui,
  lockedNote: mi,
  consequence: hi,
  sample: wi
};
function fi(e, a) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || a) };
}
function _i({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${He.consequence} ward-check-consequence`, children: a }) : null;
}
function vi({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${He.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function bi({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: He.sample, "aria-hidden": "true", children: e }) : null;
}
function on(e) {
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = Le(), o = fi(e, r);
  return /* @__PURE__ */ l("div", { className: `${He.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ l("span", { className: He.row, children: [
      /* @__PURE__ */ t(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${He.box} ward-field-option`,
          checked: o.checked,
          disabled: o.disabled,
          onChange: (i) => {
            var s;
            return !o.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, i.target.checked));
          },
          "aria-describedby": Ea(ca(n, e.describedBy), r),
          title: r == null ? void 0 : r.reason
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: a, className: He.label, children: [
        e.label,
        /* @__PURE__ */ t(vi, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(bi, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(_i, { id: n, text: e.consequence })
  ] });
}
const pi = "_chip_pq6tb_2", gi = {
  chip: pi
}, yi = {
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
function Ni(e, a) {
  if (e === "stream") return ki(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = yi[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function ki(e) {
  if (!e || !sa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = tt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${gi.chip} ward-chip ward-chip--${e}`, style: Ni(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const $i = "_clamp_zn74g_3", kt = {
  clamp: $i
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
const Ci = "_root_13eei_3", Si = "_nav_13eei_8", Ri = "_list_13eei_16", Ti = "_item_13eei_24", xi = "_link_13eei_44", Li = "_sep_13eei_54", Ai = "_current_13eei_58", Ei = "_chips_13eei_62", Ee = {
  root: Ci,
  nav: Si,
  list: Ri,
  item: Ti,
  link: xi,
  sep: Li,
  current: Ai,
  chips: Ei
};
function Ii({ path: e, chips: a }) {
  return /* @__PURE__ */ t("div", { className: Ee.root, children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Ee.nav, children: [
    /* @__PURE__ */ t("ol", { className: Ee.list, children: e.map((n, r) => /* @__PURE__ */ l("li", { className: Ee.item, children: [
      r > 0 ? /* @__PURE__ */ t("span", { className: Ee.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${Ee.link} ward-target`, href: H(n.href), title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { className: Ee.current, "aria-current": "page", title: n.label, children: n.label })
    ] }, n.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${Ee.chips} ward-chiprow`, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] }) });
}
function ln(e, a, n) {
  const r = f(n);
  r.current = n, S(() => {
    if (!e) return;
    const o = (i) => {
      var s;
      (s = a.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", o), () => document.removeEventListener("mousedown", o);
  }, [e, a]);
}
const Mi = 500;
function sn(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function cn() {
  const e = f(""), a = f(void 0);
  return S(() => () => clearTimeout(a.current), []), (n) => (clearTimeout(a.current), e.current += n.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, Mi), e.current);
}
const ha = 4;
function qi(e, a, n) {
  const r = Math.max(0, n - e.bottom - ha * 2), o = Math.max(0, e.top - ha * 2);
  return a <= r || r >= o ? { top: e.bottom + ha, maxHeight: r } : { top: e.top - ha - Math.min(a, o), maxHeight: o };
}
function Bi(e, a, n, r) {
  const o = { start: e.left, end: e.right - a }, i = { start: o.start + a <= n, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, n - a));
}
function Pi(e, a, n, r) {
  return { ...qi(e, a.height, n.height), left: Bi(e, a.width, n.width, r) };
}
function ba(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function ji(e, a) {
  const n = a.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", ba(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), o = document.documentElement;
  return { edges: n, box: r, view: { width: o.clientWidth, height: o.clientHeight } };
}
function Di(e) {
  const a = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = a.map((r) => r.scrollTop);
  return () => a.forEach((r, o) => r.scrollTop = n[o]);
}
function $t(e, a, n) {
  const r = Di(e), o = ji(e, a), i = Pi(o.edges, o.box, o.view, n);
  Object.assign(e.style, { left: ba(i.left - o.box.left), top: ba(i.top - o.box.top), maxHeight: ba(i.maxHeight) }), r();
}
function Oi(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function dn(e, a, n = "start") {
  aa(() => {
    const r = a.current, o = e.current;
    if (!r || !o) return;
    const i = Oi(r), s = () => $t(r, o, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), aa(() => {
    a.current && e.current && $t(a.current, e.current, n);
  });
}
const Hi = "_root_axvxm_2", Fi = "_trigger_axvxm_7", Wi = "_value_axvxm_32", zi = "_menu_axvxm_50", Ki = "_find_axvxm_72", Gi = "_list_axvxm_88", Ui = "_option_axvxm_99", Vi = "_check_axvxm_118", Yi = "_empty_axvxm_129", fe = {
  root: Hi,
  trigger: Fi,
  value: Wi,
  menu: zi,
  find: Ki,
  list: Gi,
  option: Ui,
  check: Vi,
  empty: Yi
}, Ji = 7;
function Xi(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function Ct(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function Qi(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [o, i] = p(""), [s, c] = p(() => Ct(e.options, e.value)), d = (u) => {
    var m;
    Jt(() => r(!1)), u && ((m = a.current) == null || m.focus());
  };
  return {
    open: n,
    query: o,
    active: s,
    entries: Xi(e.options, o),
    findable: e.options.length > Ji,
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
function Zi(e, a) {
  const n = f(!1);
  return S(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function es(e) {
  const a = cn();
  return (n) => {
    const r = a(n), o = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    o >= 0 && e.to(o);
  };
}
function un(e) {
  const a = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, a)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function as(e) {
  return { ...un(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function mn(e, a, n) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const o = a[r.key];
    if (!o) return n(r);
    r.preventDefault(), r.stopPropagation(), o();
  };
}
const ts = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function ns(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      ts.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function rs({ entry: e, at: a, menu: n, ids: r, value: o }) {
  return /* @__PURE__ */ l(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === o,
      "data-active": a === n.active || void 0,
      className: fe.option,
      onMouseDown: (i) => i.preventDefault(),
      onMouseMove: () => n.to(a),
      onClick: () => n.pick(e),
      children: [
        /* @__PURE__ */ t("span", { className: fe.check, "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: fe.label, children: e.option.label })
      ]
    }
  );
}
function ot(e, a) {
  const n = e.entries[e.active];
  return n ? a.option(n.index) : void 0;
}
function os({ menu: e, ids: a, focusRef: n }) {
  return /* @__PURE__ */ t(
    "input",
    {
      ref: n,
      className: fe.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": a.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": ot(e, a),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: mn(e, un(e), () => {
      })
    }
  );
}
function ls({ props: e, menu: a, ids: n, focusRef: r, trigger: o }) {
  const i = es(a), s = f(null);
  dn(o, s);
  const c = (d) => {
    sn(d) && i(d.key);
  };
  return /* @__PURE__ */ l("div", { ref: s, className: fe.menu, children: [
    a.findable && /* @__PURE__ */ t(os, { menu: a, ids: n, focusRef: r }),
    /* @__PURE__ */ t(
      "ul",
      {
        ref: a.findable ? void 0 : r,
        id: n.list,
        role: "listbox",
        tabIndex: -1,
        className: fe.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": a.findable ? void 0 : ot(a, n),
        onKeyDown: mn(a, as(a), c),
        children: a.entries.map((d, u) => /* @__PURE__ */ t(rs, { entry: d, at: u, menu: a, ids: n, value: e.value }, d.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: fe.empty, children: "No match" })
  ] });
}
function is(e, a) {
  const n = e.open ? ot(e, a) : void 0;
  S(() => {
    var r, o;
    n && ((o = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [n]);
}
function hn(...e) {
  return e.filter(Boolean).join(" ");
}
function ss(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function cs({ props: e, menu: a, ids: n, trigger: r, wantFocus: o }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Le()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ t(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: hn(fe.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": a.open,
      "aria-controls": a.open ? n.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": ca(e["aria-describedby"], n.value),
      "aria-invalid": e["aria-invalid"],
      disabled: e.disabled,
      title: s,
      ...ns(a, o),
      children: /* @__PURE__ */ t("span", { id: n.value, className: fe.value, "data-placeholder": i || void 0, children: ss(e) })
    }
  );
}
function wn(e) {
  const a = Le(), n = a ? { ...e, disabled: !0, "aria-describedby": Ea(e["aria-describedby"], a) } : e, r = N(), o = { list: `${r}-list`, value: `${r}-value`, option: (m) => `${r}-option-${m}` }, i = f(null), s = f(null), c = f(null), d = Qi(n, s), u = Zi(d.open, c);
  return ln(d.open, i, () => d.close(!1)), is(d, o), /* @__PURE__ */ l("div", { ref: i, className: hn(fe.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(cs, { props: n, menu: d, ids: o, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ t("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ t(ls, { props: n, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const ds = "_field_13oav_2", us = "_label_13oav_8", ms = "_labelHidden_13oav_15", hs = "_control_13oav_25", ws = "_mono_13oav_45", fs = "_area_13oav_50", _s = "_invalid_13oav_57", Pe = {
  field: ds,
  label: us,
  labelHidden: ms,
  control: hs,
  mono: ws,
  area: fs,
  invalid: _s
}, vs = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, fn = (e) => `${e}-label`;
function bs({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? vs : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function ps({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t(
    wn,
    {
      id: a.id,
      triggerClassName: n,
      "aria-labelledby": fn(a.id),
      "aria-invalid": a["aria-invalid"],
      "aria-describedby": a["aria-describedby"],
      value: e.value,
      options: e.options ?? [],
      disabled: a.disabled,
      placeholder: e.placeholder,
      onChange: e.onChange
    }
  );
}
function gs({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const ys = { input: bs, select: ps, textarea: gs };
function Ns(e, a, n) {
  const r = ys[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function ks(e, a, n, r) {
  const o = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": o,
    "aria-describedby": Ea(ca(o ? n : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function $s(e) {
  const a = e.mono ? [Pe.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [Pe.area] : [];
  return [Pe.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function Cs(e) {
  return e ? `${Pe.label} ${Pe.labelHidden} ward-field-label` : `${Pe.label} ward-field-label`;
}
function M(e) {
  const a = N(), n = `${a}-msg`, r = ks(e, a, n, Le()), o = $s(e);
  return /* @__PURE__ */ l("div", { className: `${Pe.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: fn(a), className: Cs(e.labelHidden), htmlFor: a, children: e.label }),
    Ns(e, r, o),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${Pe.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Ss = "_root_1gft5_2", Rs = "_trigger_1gft5_9", Ts = "_panel_1gft5_33", xs = "_menu_1gft5_52", Ls = "_group_1gft5_57", As = "_heading_1gft5_62", Es = "_item_1gft5_68", Is = "_separator_1gft5_94", Ms = "_footer_1gft5_100", _e = {
  root: Ss,
  trigger: Rs,
  panel: Ts,
  menu: xs,
  group: Ls,
  heading: As,
  item: Es,
  separator: Is,
  footer: Ms
}, _n = Te(null);
function qs(e, a) {
  const [n, r] = p({ open: e, start: null, request: 0 });
  return {
    ...n,
    show: (o) => r((i) => ({ open: !0, start: o, request: i.request + 1 })),
    close: (o) => {
      var i;
      Jt(() => r((s) => ({ ...s, open: !1 }))), o && ((i = a.current) == null || i.focus());
    }
  };
}
const Bs = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Ps(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const n = Bs.get(a.key);
      n && (a.preventDefault(), e.show(n));
    },
    onKeyUp: (a) => {
      a.key === " " && a.preventDefault();
    }
  };
}
function vn(...e) {
  return e.filter(Boolean).join(" ");
}
function js(e, a = {}) {
  const { ref: n, className: r, ...o } = a;
  return { ...o, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: vn(_e.trigger, r) };
}
function Ds(e) {
  const a = N(), n = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = f(null), o = f(null), i = qs(e.defaultOpen === !0, o);
  return ln(i.open, r, () => i.close(!1)), /* @__PURE__ */ l("div", { ref: r, className: vn(_e.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ...js(o, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Ps(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ t(_n.Provider, { value: { ...n, popup: i, button: o }, children: e.children })
  ] });
}
function Os(e) {
  let a = 0;
  const n = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function Hs(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const bn = (e, a) => (e % a + a) % a;
function Ze(e, a, n) {
  for (let r = 1; r <= e.length; r++) {
    const o = bn(a + n * r, e.length);
    if (!e[o].disabled) return o;
  }
  return -1;
}
const Fs = (e) => e.split("").every((a) => a === e[0]);
function Ws(e, a, n) {
  const r = Fs(n), o = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = bn(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function zs(e) {
  const a = f([]);
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
function Ks(e, a) {
  const { items: n } = e, r = () => {
    var o;
    return (o = e.refs.current[e.current()]) == null ? void 0 : o.click();
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
function Gs(e, a) {
  const n = f(!1), r = cn(), o = Ks(e, a), i = (s) => {
    sn(s) && e.focus(Ws(e.items, e.current(), r(s.key)));
  };
  return {
    onKeyDown: (s) => {
      s.key === "Tab" && (n.current = !0);
      const c = o.get(s.key);
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
function Us(e, a) {
  const { start: n, request: r } = a, o = f(e);
  o.current = e, S(() => {
    const { items: i, focus: s } = o.current;
    n && s(n === "first" ? Ze(i, -1, 1) : Ze(i, i.length, -1));
  }, [n, r]);
}
function Vs({ row: e, nav: a, popup: n }) {
  const { item: r, at: o } = e;
  return {
    onMouseDown: (i) => i.preventDefault(),
    onMouseMove: () => {
      !r.disabled && a.current() !== o && a.focus(o);
    },
    onClick: (i) => {
      var s;
      if (r.disabled) return i.preventDefault();
      (s = r.onSelect) == null || s.call(r), n.close(!0);
    }
  };
}
function pn(e) {
  const { item: a, at: n } = e.row, r = {
    ref: (o) => {
      e.nav.refs.current[n] = o;
    },
    role: "menuitem",
    tabIndex: -1,
    className: _e.item,
    "aria-disabled": a.disabled ? "true" : void 0,
    ...Vs(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: H(a.href), ...r, children: a.label }) : /* @__PURE__ */ t("button", { type: "button", ...r, children: a.label });
}
function Ys({ heading: e, rows: a, nav: n, popup: r }) {
  const o = N();
  return /* @__PURE__ */ l("div", { role: "group", "aria-labelledby": o, className: _e.group, children: [
    /* @__PURE__ */ t("div", { id: o, className: _e.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(pn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function Js({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: _e.separator }) : e.kind === "group" ? /* @__PURE__ */ t(Ys, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(pn, { row: e.row, nav: a, popup: n });
}
function Xs() {
  const e = Re(_n);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Qs({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: o, buttonId: i, button: s } = Xs(), c = f(null);
  dn(s, c, n);
  const d = Os(e), u = zs(d.flatMap(Hs).map((_) => _.item)), m = Gs(u, r);
  return Us(u, r), /* @__PURE__ */ l("div", { ref: c, className: _e.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: o, "aria-labelledby": i, className: _e.menu, ...m, children: d.map((_, w) => /* @__PURE__ */ t(Js, { block: _, nav: u, popup: r }, w)) }),
    a && /* @__PURE__ */ t("p", { className: _e.footer, children: a })
  ] });
}
function Zs(e) {
  var n;
  return (((n = e.parentElement) == null ? void 0 : n.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function gn(e, a) {
  S(() => {
    const n = e.current;
    a === "page" && n && !Zs(n) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, a]);
}
const ec = (e, a) => e.reduce((n, r) => n + r + a, -a);
function ac({ room: e, widths: a, more: n, gap: r }, o) {
  const i = a.map((d, u) => u);
  if (ec(a, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([o]);
  let c = a[o] + r + n;
  for (const d of i)
    if (d !== o) {
      if (c += a[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Ha = (e) => Number.parseFloat(e) || 0, St = (e) => e.getBoundingClientRect().width;
function tc(e) {
  const a = getComputedStyle(e), n = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Ha(a.paddingInlineStart) - Ha(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(':scope > [role="tab"]'), St),
    more: n ? St(n) : 0,
    gap: Ha(a.columnGap)
  };
}
function nc(e, a) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(a);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const rc = (e, a) => JSON.stringify(e) === JSON.stringify(a);
function oc(e, a, n) {
  const [r, o] = p(null);
  return aa(() => {
    const i = e.current;
    if (!i) return;
    const s = () => {
      const c = tc(i);
      o((d) => rc(d, c) ? d : c);
    };
    return s(), nc(i, s);
  }, [e, n]), r && ac(r, a);
}
const lc = "_strip_jqyo6_2", ic = "_fits_jqyo6_19", sc = "_probe_jqyo6_27", cc = "_moreRoot_jqyo6_36", dc = "_more_jqyo6_36", uc = "_tab_jqyo6_55", mc = "_count_jqyo6_91", ve = {
  strip: lc,
  fits: ic,
  probe: sc,
  moreRoot: cc,
  more: dc,
  tab: uc,
  count: mc
}, yn = "More";
function hc(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
const Nn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function kn(e) {
  return `${ve.strip} ward-tabs ward-tabs--${e}`;
}
const wc = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function fc({ tab: e, active: a, place: n, onChange: r }) {
  return /* @__PURE__ */ l(
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
        e.count === void 0 ? null : /* @__PURE__ */ l(T, { children: [
          " ",
          /* @__PURE__ */ t("span", { className: ve.count, children: `· ${e.count}` })
        ] })
      ]
    }
  );
}
function _c(e, a) {
  return (n) => {
    a(n), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function vc({ tabs: e, trigger: a, onPick: n }) {
  return /* @__PURE__ */ t(Ds, { label: yn, className: ve.moreRoot, trigger: { ...a, role: "tab", "aria-selected": !1, className: ve.more }, children: /* @__PURE__ */ t(Qs, { align: "end", entries: e.map((r) => ({ label: Nn(r), onSelect: () => n(r.id) })) }) });
}
function bc(e, a, n) {
  return !a || a.includes(n) ? e.itemProps(n) : wc;
}
function JS({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: o }) {
  const i = La({ orientation: "horizontal" }), s = hc(e, a);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = f(null);
  gn(c, o);
  const d = oc(c, s, e.map(Nn).join(`
`)), u = d ? e.filter((m, _) => !d.includes(_)) : [];
  return /* @__PURE__ */ l("div", { ref: c, className: `${kn(o)} ${ve.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...i.containerProps, children: [
    e.map((m, _) => /* @__PURE__ */ t(fc, { tab: m, active: a, place: bc(i, d, _), onChange: n }, m.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${_e.trigger} ${ve.more} ${ve.probe}`, children: yn }),
    u.length > 0 && /* @__PURE__ */ t(vc, { tabs: u, trigger: i.itemProps(e.length), onPick: _c(c, n) })
  ] });
}
const Rt = 7;
function XS({ links: e, active: a, label: n, level: r }) {
  if (e.length > Rt) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${Rt} — the set is fixed`);
  const o = f(null);
  return gn(o, r), tn(o, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t(Ma, { as: "nav", rowRef: o, className: kn(r), label: n, count: e.length, focusable: !1, "data-level": r, children: e.map((i) => /* @__PURE__ */ l("a", { href: i.href, className: `${ve.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ l(T, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: ve.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const pc = "_root_v56ff_3", gc = "_segment_v56ff_9", Tt = {
  root: pc,
  segment: gc
};
function $n({ options: e, value: a, onChange: n, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = La({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === a));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ t("div", { className: `${Tt.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "radio",
      className: Tt.segment,
      "aria-checked": d.value === a,
      disabled: o,
      "aria-describedby": i,
      onClick: () => n(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const yc = "_sidebar_s9o1j_3", Nc = "_brand_s9o1j_9", kc = "_mark_s9o1j_17", $c = "_word_s9o1j_24", Cc = "_nav_s9o1j_30", Sc = "_navItem_s9o1j_39", Rc = "_footLink_s9o1j_49", Tc = "_group_s9o1j_58", xc = "_groupName_s9o1j_65", Lc = "_agents_s9o1j_81", Ac = "_agent_s9o1j_81", Ec = "_root_s9o1j_96", Ic = "_agentTop_s9o1j_105", Mc = "_dot_s9o1j_112", qc = "_agentName_s9o1j_124", Bc = "_agentMeta_s9o1j_138", Pc = "_foot_s9o1j_49", jc = "_footName_s9o1j_150", Dc = "_footLinks_s9o1j_157", Oc = "_linkBrand_s9o1j_184", Hc = "_label_s9o1j_205", Fc = "_note_s9o1j_210", Wc = "_footer_s9o1j_226", x = {
  sidebar: yc,
  brand: Nc,
  mark: kc,
  word: $c,
  nav: Cc,
  navItem: Sc,
  new: "_new_s9o1j_48",
  footLink: Rc,
  group: Tc,
  groupName: xc,
  agents: Lc,
  agent: Ac,
  root: Ec,
  agentTop: Ic,
  dot: Mc,
  agentName: qc,
  agentMeta: Bc,
  foot: Pc,
  footName: jc,
  footLinks: Dc,
  linkBrand: Oc,
  label: Hc,
  note: Fc,
  footer: Wc
};
function zc({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ l(
    "a",
    {
      className: x.agent,
      href: H(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ l("span", { className: x.agentTop, children: [
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
function Kc({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: x.foot, children: [
    /* @__PURE__ */ t("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${x.footLink} ward-target`, href: H(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function Gc({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: o, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ l("nav", { className: x.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ l("div", { className: x.brand, children: [
      /* @__PURE__ */ t("span", { className: x.mark }),
      /* @__PURE__ */ t("span", { className: x.word, children: e })
    ] }),
    /* @__PURE__ */ t("div", { className: x.nav, children: a.map((s) => /* @__PURE__ */ t("a", { className: x.navItem, href: H(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ l("div", { className: x.group, children: [
      /* @__PURE__ */ l("span", { className: x.groupName, children: [
        n,
        " · ",
        ee(r.length)
      ] }),
      o && /* @__PURE__ */ t("a", { className: x.new, href: H(o.href), children: o.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ t(zc, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(Kc, { shared: i })
  ] });
}
function Uc(e) {
  return e.destinations ?? e.items ?? [];
}
function Vc({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.linkBrand, children: e });
}
function Yc({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.footer, children: e });
}
function Jc({ link: e, active: a }) {
  return /* @__PURE__ */ l("a", { href: H(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: x.note, children: e.note })
  ] });
}
function Xc(e) {
  return /* @__PURE__ */ l("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(Vc, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: Uc(e).map((a) => /* @__PURE__ */ t(Jc, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(Yc, { children: e.children })
  ] });
}
function Qc(e) {
  return "agents" in e;
}
function QS(e) {
  return Qc(e) ? /* @__PURE__ */ t(Gc, { ...e }) : /* @__PURE__ */ t(Xc, { ...e });
}
const Zc = "_mark_wlgi8_3", ed = {
  mark: Zc
}, ad = { met: "✓", unmet: "", failed: "✕" };
function lt({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: ed.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: ad[e]
    }
  );
}
const td = "_avatar_1t33a_3", nd = {
  avatar: td
};
function rd(e) {
  const a = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (a.length > 1 ? (a[0] ?? "").charAt(0) + (a[1] ?? "").charAt(0) : (a[0] ?? "").slice(0, 2)).toUpperCase();
}
function od(e) {
  return e != null && sa(e) ? Dr(e) : void 0;
}
function ZS({ name: e, step: a, size: n = "md" }) {
  return /* @__PURE__ */ t("span", { className: nd.avatar, "data-size": n, "aria-hidden": "true", style: od(a), children: rd(e) });
}
const ld = "_marker_br9fi_2", id = {
  marker: ld
}, sd = {
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
}, cd = { running: " ward-running" };
function je({ size: e, kind: a, label: n }) {
  const r = { "--marker": sd[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${id.marker} ward-marker ward-marker--${a}${cd[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const dd = "_root_ti0pq_2", ud = "_chip_ti0pq_11", md = "_noCase_ti0pq_23", wa = {
  root: dd,
  chip: ud,
  noCase: md
};
function hd(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function it({ connection: e, since: a, lastEventAt: n }) {
  const r = hd(a, n), o = nt(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${wa.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(je, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${wa.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ t("span", { className: wa.noCase, children: at(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${wa.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    de(r)
  ] });
}
const wd = "_root_u8ort_2", fd = "_context_u8ort_13", _d = "_row_u8ort_1", vd = "_heading_u8ort_27", bd = "_headingWrap_u8ort_35", pd = "_chips_u8ort_40", gd = "_title_u8ort_48", yd = "_consequence_u8ort_58", Nd = "_actionsWrap_u8ort_65", kd = "_actions_u8ort_65", $d = "_action_u8ort_65", Cd = "_overflowPanel_u8ort_94", Sd = "_measureClip_u8ort_105", Rd = "_measure_u8ort_105", Y = {
  root: wd,
  context: fd,
  row: _d,
  heading: vd,
  headingWrap: bd,
  chips: pd,
  title: gd,
  consequence: yd,
  actionsWrap: Nd,
  actions: kd,
  action: $d,
  overflowPanel: Cd,
  measureClip: Sd,
  measure: Rd
};
function Td({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(ta, { as: "h1", className: Y.title, text: e }) : /* @__PURE__ */ t("h1", { className: Y.title, children: e });
}
function xd({ title: e, consequence: a, consequenceHint: n, density: r }) {
  return /* @__PURE__ */ l("div", { className: Y.heading, children: [
    /* @__PURE__ */ t(Td, { title: e, density: r }),
    a && /* @__PURE__ */ t("p", { className: Y.consequence, title: n, children: a })
  ] });
}
function Ya({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: Y.action, "data-action": "", children: a }, n));
}
function xt({ disclosure: e }) {
  return /* @__PURE__ */ t(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Ld({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: o }) {
  return n ? r ? /* @__PURE__ */ t(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(xt, { disclosure: o }) : a ? [/* @__PURE__ */ t(xt, { disclosure: o }, "more"), /* @__PURE__ */ t(Ya, { actions: e }, "actions")] : /* @__PURE__ */ t(Ya, { actions: e });
}
function Ad(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Ed({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: Y.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ya, { actions: e }) });
}
function Id(e, a) {
  const n = N(), [r, o] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => o(!i) }, close: () => {
    var d, u;
    o(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function Md({ crumb: e, chips: a }) {
  return /* @__PURE__ */ l("div", { className: Y.context, children: [
    /* @__PURE__ */ t(Ii, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: Y.chips, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] });
}
function qd(...e) {
  return e.some((a) => a === null);
}
function Bd(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Pd(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + Bd(e);
}
function jd(e, a, n, r, o) {
  if (o === 0 || qd(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], d = Math.max(0, e.clientWidth - Pd(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Dd(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Od(e) {
  return br(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Hd(e, a) {
  return a.length === 0 && e.length === 1 && Od(e[0]);
}
function Fd(e, a) {
  const n = f(null), r = f(null), o = f(null), i = f(null), [s, c] = p(!1);
  return S(() => {
    const d = n.current;
    if (!Dd(d)) return;
    const u = () => c(jd(d, r.current, o.current, i.current, e.length)), m = new ResizeObserver(u);
    return m.observe(d), i.current && m.observe(i.current), u(), () => m.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: o, measureRef: i, collapsed: s && !a };
}
function Wd({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: Y.measureClip, children: /* @__PURE__ */ l("div", { className: Y.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ t("span", { children: r }, o))
  ] }) });
}
function zd({ connection: e }) {
  return e ? /* @__PURE__ */ t(it, { connection: e.connection, since: e.since }) : null;
}
function eR({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: o, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: m, headingRef: _, actionsRef: w, measureRef: y, collapsed: L } = Fd(i, Hd(i, s)), B = s.length > 0, { disclosure: oe, close: Ae } = Id(L || B, w), ae = Ad(s, i, L, d);
  return /* @__PURE__ */ l("header", { className: Y.root, "data-density": u, children: [
    /* @__PURE__ */ t(Md, { crumb: e, chips: a }),
    /* @__PURE__ */ l("div", { className: Y.row, ref: m, children: [
      /* @__PURE__ */ t("div", { ref: _, className: Y.headingWrap, children: /* @__PURE__ */ t(xd, { title: n, consequence: r, consequenceHint: o, density: u }) }),
      /* @__PURE__ */ l("div", { className: Y.actionsWrap, children: [
        /* @__PURE__ */ t(zd, { connection: c }),
        /* @__PURE__ */ t("div", { className: Y.actions, ref: w, "data-ward-actions": !0, children: /* @__PURE__ */ t(Ld, { actions: i, hasMore: B, collapsed: L, onOverflow: d, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ t(Ed, { actions: ae, disclosure: oe, onEscape: Ae }),
    /* @__PURE__ */ t(Wd, { actions: i, hasMore: B, measureRef: y })
  ] });
}
const Kd = "_root_td96x_2", Gd = "_body_td96x_16", Lt = {
  root: Kd,
  body: Gd
};
function aR({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${Lt.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: Lt.body, children: n }) });
}
const Ud = "_root_bf1pc_2", Vd = "_table_bf1pc_9", Yd = "_caption_bf1pc_14", Jd = "_series_bf1pc_23", Xd = "_category_bf1pc_31", Qd = "_cell_bf1pc_39", Zd = "_track_bf1pc_45", eu = "_lane_bf1pc_52", au = "_bar_bf1pc_56", tu = "_value_bf1pc_63", nu = "_swatch_bf1pc_70", ru = "_empty_bf1pc_78", J = {
  root: Ud,
  table: Vd,
  caption: Yd,
  series: Jd,
  category: Xd,
  cell: Qd,
  track: Zd,
  lane: eu,
  bar: au,
  value: tu,
  swatch: nu,
  empty: ru
}, ou = "—", At = 6;
function lu(e, a) {
  if (a.length < 1 || a.length > At)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${At}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function iu(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function Cn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function su(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function cu({ value: e, top: a, step: n, format: r, missing: o }) {
  const i = su(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: J.cell, children: /* @__PURE__ */ l("span", { className: J.track, children: [
    /* @__PURE__ */ t("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: J.value, children: e === null ? o : r(e) })
  ] }) });
}
function du({ series: e }) {
  return /* @__PURE__ */ t(T, { children: e.map((a, n) => /* @__PURE__ */ l("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: J.swatch, "data-step": Cn(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function uu({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ l("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: J.caption, children: e }),
    /* @__PURE__ */ t("p", { className: J.empty, children: a })
  ] });
}
function mu({ title: e, categories: a, series: n, top: r, format: o = ee, categoryHead: i = "Category", missing: s = ou }) {
  return /* @__PURE__ */ t("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ l("table", { className: J.table, children: [
    /* @__PURE__ */ t("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: J.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(du, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, d) => /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: J.category, children: c }),
      n.map((u, m) => /* @__PURE__ */ t(cu, { value: u.values[d], top: r, step: Cn(m, n.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function tR(e) {
  lu(e.categories, e.series);
  const a = iu(e.series);
  return a === 0 ? /* @__PURE__ */ t(uu, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(mu, { ...e, top: a });
}
const hu = "_root_1bfqw_2", wu = "_figure_1bfqw_7", fu = "_of_1bfqw_13", _u = "_bar_1bfqw_18", vu = "_rows_1bfqw_38", bu = "_row_1bfqw_38", pu = "_label_1bfqw_49", gu = "_amount_1bfqw_54", Ie = {
  root: hu,
  figure: wu,
  of: fu,
  bar: _u,
  rows: vu,
  row: bu,
  label: pu,
  amount: gu
};
function yu({ spent: e, ceiling: a, breakdown: n }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ l("div", { className: `${Ie.root} ward-costmeter`, children: [
    /* @__PURE__ */ l("p", { className: `${Ie.figure} ward-stat-value`, children: [
      ne(e),
      " ",
      /* @__PURE__ */ l("span", { className: Ie.of, children: [
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
    n && /* @__PURE__ */ t("ul", { className: Ie.rows, children: n.map((o) => /* @__PURE__ */ l("li", { className: `${Ie.row} ward-costrow`, children: [
      /* @__PURE__ */ t("span", { className: Ie.label, children: o.label }),
      /* @__PURE__ */ t("span", { className: Ie.amount, children: ne(o.amount) })
    ] }, o.label)) })
  ] });
}
const Nu = "_frame_9xel2_2", ku = "_table_9xel2_6", $u = "_th_9xel2_12", Cu = "_td_9xel2_13", Su = "_sort_9xel2_48", Ru = "_row_9xel2_60", Tu = "_empty_9xel2_68", qe = {
  frame: Nu,
  table: ku,
  th: $u,
  td: Cu,
  sort: Su,
  row: Ru,
  empty: Tu
}, xu = { asc: "ascending", desc: "descending" };
function Lu(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return xu[a.direction];
}
function Au(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: qe.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Eu(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Iu({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: qe.th,
      style: Eu(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Lu(e, a),
      children: Au(e, n)
    }
  );
}
function Mu({ row: e, props: a }) {
  const n = a.rowId(e), r = (a.lockedIds ?? []).includes(n);
  return /* @__PURE__ */ t(
    "tr",
    {
      className: qe.row,
      "data-selected": n === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((o) => /* @__PURE__ */ t("td", { className: qe.td, "data-align": o.align, "data-mono": o.mono, "data-drop": o.dropPriority, children: a.renderCell(e, o.key) }, o.key))
    }
  );
}
function qu({
  label: e,
  columns: a,
  rows: n,
  rowId: r,
  renderCell: o,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u
}) {
  return n.length === 0 ? /* @__PURE__ */ t("div", { className: qe.empty, children: u }) : /* @__PURE__ */ t("div", { className: qe.frame, children: /* @__PURE__ */ l("table", { className: qe.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: qe.head, children: a.map((m) => /* @__PURE__ */ t(Iu, { column: m, sort: c, onSort: d }, m.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((m) => /* @__PURE__ */ t(Mu, { row: m, props: { label: e, columns: a, rows: n, rowId: r, renderCell: o, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(m))) })
  ] }) });
}
const Bu = "_list_v0s52_2", Pu = {
  list: Bu
};
function nR({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: Pu.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const ju = "_label_1u62a_2", Du = {
  label: ju
};
function rR({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: Du.label, children: a.header }) }, a.key)) }) });
}
const Ou = "_stack_bp6a0_2", Hu = {
  stack: Ou
};
function oR({ children: e }) {
  return /* @__PURE__ */ t("span", { className: Hu.stack, "data-ward-action-stack": "", children: e });
}
const Fu = "_set_1z0sq_2", Wu = "_legend_1z0sq_7", zu = "_row_1z0sq_15", Ku = "_control_1z0sq_20", Gu = "_input_1z0sq_26", Uu = "_label_1z0sq_31", Vu = "_consequence_1z0sq_36", Oe = {
  set: Fu,
  legend: Wu,
  row: zu,
  control: Ku,
  input: Gu,
  label: Uu,
  consequence: Vu
};
function Sn({ legend: e, options: a, value: n, onChange: r, disabled: o, name: i, describedBy: s, variant: c }) {
  const d = N(), u = i ?? d;
  return /* @__PURE__ */ l("fieldset", { className: Oe.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: Oe.legend, children: e }),
    a.map((m) => {
      const _ = `${u}-${m.value}`, w = m.consequence ? `${_}-note` : void 0;
      return /* @__PURE__ */ l("div", { className: Oe.row, children: [
        /* @__PURE__ */ l("span", { className: Oe.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: _,
              type: "radio",
              name: u,
              className: Oe.input,
              value: m.value,
              checked: n === m.value,
              disabled: o,
              "aria-describedby": ca(w, s),
              onChange: () => !o && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: _, className: Oe.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ t("p", { id: w, className: `${Oe.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const Yu = "_root_11gpw_2", Ju = "_head_11gpw_10", Xu = "_note_11gpw_29", Qu = "_index_11gpw_34", Zu = "_dot_11gpw_38", em = "_counter_11gpw_49", am = "_trailing_11gpw_57", Fe = {
  root: Yu,
  head: Ju,
  note: Xu,
  index: Qu,
  dot: Zu,
  counter: em,
  trailing: am
};
function tm({ index: e }) {
  return e ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t("span", { className: `${Fe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: Fe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function nm({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Fe.counter, "aria-hidden": "true", children: e }) : null;
}
function Et({ title: e, index: a, note: n, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Fe.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Fe.head, children: [
      /* @__PURE__ */ t(tm, { index: a }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: Fe.note, children: n }),
    /* @__PURE__ */ t(nm, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: Fe.trailing, children: i })
  ] });
}
const rm = "_strip_ww53x_2", om = "_cell_ww53x_7", lm = "_value_ww53x_12", im = "_link_ww53x_29", sm = "_label_ww53x_49", Ke = {
  strip: rm,
  cell: om,
  value: lm,
  link: im,
  label: sm
};
function cm(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const Rn = (e) => `${Ke.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function dm({ cell: e }) {
  return /* @__PURE__ */ l("div", { className: Ke.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Rn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${Ke.label} ward-stat-label`, children: e.label })
  ] });
}
function um({ cell: e, href: a }) {
  return /* @__PURE__ */ l("div", { className: Ke.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Rn(e), title: e.hint, children: /* @__PURE__ */ l("a", { className: `${Ke.link} ward-stat-link`, href: H(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${Ke.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Ba({ cells: e, divided: a = !1 }) {
  return cm(e), /* @__PURE__ */ t("dl", { className: `${Ke.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(dm, { cell: n }, n.label) : /* @__PURE__ */ t(um, { cell: n, href: n.href }, n.label)) });
}
const mm = "_root_1eb1u_2", hm = "_track_1eb1u_8", wm = "_thumb_1eb1u_46", fm = "_labelHidden_1eb1u_64", _m = "_label_1eb1u_64", vm = "_lockedNote_1eb1u_84", We = {
  root: mm,
  track: hm,
  thumb: wm,
  labelHidden: fm,
  label: _m,
  lockedNote: vm
};
function bm(e, a, n, r) {
  return { on: n ? !0 : e, off: !!(a || n || r) };
}
function pm(e) {
  return e ? `${We.label} ${We.labelHidden}` : We.label;
}
function Ge({ label: e, checked: a, onChange: n, disabled: r, locked: o, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = Le(), { on: m, off: _ } = bm(a, r, o, u !== null);
  return /* @__PURE__ */ l("span", { className: `${We.root} ward-switchrow`, children: [
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
        "data-locked": o ? !0 : void 0,
        disabled: _,
        onClick: () => !_ && (n == null ? void 0 : n(!m)),
        children: /* @__PURE__ */ t("span", { className: We.thumb })
      }
    ),
    /* @__PURE__ */ l("label", { id: c, htmlFor: d, className: pm(s), children: [
      e,
      o && /* @__PURE__ */ t("span", { className: We.lockedNote, children: "always on" })
    ] })
  ] });
}
const gm = "_bar_1vp69_2", ym = "_skip_1vp69_11", Nm = "_mark_1vp69_22", km = "_nav_1vp69_30", $m = "_list_1vp69_34", Cm = "_select_1vp69_41", Sm = "_selectTrigger_1vp69_45", Rm = "_dest_1vp69_52", Tm = "_actor_1vp69_71", xm = "_actorMark_1vp69_84", Lm = "_actorLabel_1vp69_89", Am = "_tagline_1vp69_108", le = {
  bar: gm,
  skip: ym,
  mark: Nm,
  nav: km,
  list: $m,
  select: Cm,
  selectTrigger: Sm,
  dest: Rm,
  actor: Tm,
  actorMark: xm,
  actorLabel: Lm,
  tagline: Am
};
function Em(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Im(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function lR({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: o, onNavigate: i, skipTo: s = "main" }) {
  const c = Im(r);
  return /* @__PURE__ */ l("header", { className: le.bar, children: [
    /* @__PURE__ */ t("a", { className: `${le.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ t("span", { className: le.mark, children: e }),
    o && /* @__PURE__ */ t("span", { className: le.tagline, children: o }),
    /* @__PURE__ */ l("nav", { className: le.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ t("ul", { className: le.list, children: a.map((d) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "a",
        {
          className: `${le.dest} ward-target`,
          href: H(d.href),
          "aria-current": d.id === n ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ t(
        wn,
        {
          className: le.select,
          triggerClassName: le.selectTrigger,
          "aria-label": "Destination",
          value: n,
          options: a.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => i == null ? void 0 : i(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ l("span", { className: le.actor, children: [
      /* @__PURE__ */ t("span", { className: le.actorLabel, children: c }),
      /* @__PURE__ */ t("span", { className: le.actorMark, "aria-hidden": "true", children: Em(c) })
    ] })
  ] });
}
const Mm = "_tree_zzoob_2", qm = "_item_zzoob_6", Bm = "_row_zzoob_10", Pm = "_button_zzoob_22", $a = {
  tree: Mm,
  item: qm,
  row: Bm,
  button: Pm
}, Tn = Te(null);
function jm({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = La({ orientation: "vertical" });
  return /* @__PURE__ */ t(Tn.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: $a.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const Dm = { ArrowRight: !0, ArrowLeft: !1 };
function It(e) {
  return e ? !0 : void 0;
}
function Om(e, a) {
  const n = Dm[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function Hm(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function Fm(e) {
  const a = [$a.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Wm(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function zm(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Km(e) {
  return typeof e == "string" ? e : void 0;
}
function Gm({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Um({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function xn(e) {
  const a = Re(Tn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = Wm(e);
  return /* @__PURE__ */ l("li", { className: $a.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: Fm(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": n,
        "data-depth": e.depth,
        "data-unresolved": It(e.unresolved),
        "data-inherited": It(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${$a.button} ward-treeitem-btn`,
            onClick: () => Hm(e),
            onKeyDown: (r) => Om(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: zm(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: Km(e.label), children: e.label }),
              /* @__PURE__ */ t(Gm, { value: e.detail }),
              /* @__PURE__ */ t(Um, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const Vm = "_frame_gij4e_2", Ym = "_subjectRail_gij4e_22", Jm = "_subject_gij4e_22", Xm = "_rail_gij4e_42", Qm = "_record_gij4e_66", Zm = "_recordBody_gij4e_71", eh = "_stageGrid_gij4e_120", ah = "_band_gij4e_134", th = "_bandBody_gij4e_142", nh = "_bandActions_gij4e_147", rh = "_scroller_gij4e_155", oh = "_board_gij4e_182", lh = "_lanes_gij4e_191", Z = {
  frame: Vm,
  subjectRail: Ym,
  subject: Jm,
  rail: Xm,
  record: Qm,
  recordBody: Zm,
  stageGrid: eh,
  band: ah,
  bandBody: th,
  bandActions: nh,
  scroller: rh,
  board: oh,
  lanes: lh
};
function iR({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: Z.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function Mt(e) {
  return e ? "true" : void 0;
}
function sR({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: Z.subjectRail, "data-ward-subject-rail": n, "data-ruled": Mt(i), children: [
    /* @__PURE__ */ t("div", { className: Z.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Z.rail, "data-sticky": Mt(o), "aria-label": r, children: a })
  ] });
}
function cR({ title: e, children: a, note: n, trailing: r, pad: o = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(Et, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ l("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(Et, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: Z.recordBody, "data-pad": o, "data-measure": c, children: a })
  ] });
}
const ih = "_form_1j8ub_2", sh = "_fields_1j8ub_9", ch = "_actions_1j8ub_19", Fa = {
  form: ih,
  fields: sh,
  actions: ch
};
function dR({ label: e, children: a, actions: n, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: Fa.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Fa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Fa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function uR({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ l("section", { className: Z.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Z.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Z.bandActions, children: a })
  ] });
}
const dh = "(max-width: 767.98px)";
function st({ label: e, children: a, laneCount: n }) {
  const r = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t(Ma, { className: Z.scroller, label: e, count: n ?? pr.count(a), "data-ward-board-scroller": "", style: r, children: a });
}
function uh({ lanes: e, label: a, laneLabel: n }) {
  const [r, o] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ l("div", { className: Z.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ t(st, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function mh({ lanes: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: Z.board, "data-ward-board": "", children: /* @__PURE__ */ t(st, { label: a, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ t(gr, { children: n.content }, n.id)) }) });
}
function mR({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const o = Ia(dh);
  return n === void 0 ? /* @__PURE__ */ t(st, { label: a, children: e }) : o ? /* @__PURE__ */ t(uh, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(mh, { lanes: n, label: a });
}
function hR({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), i = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ t(Ma, { className: Z.stageGrid, label: n, count: o, "data-ward-stage-grid": "", "data-floor": r, style: i, children: a });
}
const hh = "_block_b38uc_3", wh = "_sentence_b38uc_10", fh = "_meta_b38uc_19", _h = "_action_b38uc_24", vh = "_strip_b38uc_28", bh = "_loading_b38uc_47", ph = "_label_b38uc_55", gh = "_counter_b38uc_62", be = {
  block: hh,
  sentence: wh,
  meta: fh,
  action: _h,
  strip: vh,
  loading: bh,
  label: ph,
  counter: gh
};
function yh({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: be.action, children: /* @__PURE__ */ t(b, { onClick: e.onClick, children: e.label }) });
}
function Pa({ sentence: e, action: a, children: n, role: r = "status", tone: o, kind: i }) {
  return /* @__PURE__ */ l("div", { className: `${be.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ t("p", { className: be.sentence, children: e }),
    n,
    /* @__PURE__ */ t(yh, { action: a })
  ] });
}
function Nh(e) {
  return /* @__PURE__ */ t(Pa, { ...e, kind: "ward-emptystate" });
}
function wR({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(Pa, { sentence: e, action: n, children: /* @__PURE__ */ l("p", { className: be.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function fR(e) {
  return /* @__PURE__ */ t(Pa, { ...e });
}
function _R({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(Pa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ l("p", { className: be.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function vR({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ l("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function bR({ queued: e, since: a }) {
  return /* @__PURE__ */ l("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function pR({ label: e, startedAt: a }) {
  const n = f(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = p(!1);
  S(() => {
    const s = window.setTimeout(() => o(!0), we.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = nt(n.current, r);
  return /* @__PURE__ */ l("div", { className: `${be.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ t("span", { className: be.label, children: e }),
    r ? /* @__PURE__ */ t("span", { className: be.counter, children: at(i) }) : null
  ] });
}
const kh = "_note_cigdt_2", $h = {
  note: kh
};
function Ch({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ l("p", { className: $h.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const Sh = "_card_k7btg_3", Rh = "_hit_k7btg_31", Th = "_head_k7btg_44", xh = "_title_k7btg_51", Lh = "_meta_k7btg_57", Ah = "_since_k7btg_66", Eh = "_sep_k7btg_76", Ih = "_fields_k7btg_80", Mh = "_field_k7btg_80", qh = "_last_k7btg_98", Bh = "_reason_k7btg_110", se = {
  card: Sh,
  hit: Rh,
  head: Th,
  title: xh,
  meta: Lh,
  since: Ah,
  sep: Eh,
  fields: Ih,
  field: Mh,
  last: qh,
  reason: Bh
}, Ph = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function jh(e, a, n) {
  const r = va(e, "blue"), o = va(e, "orange"), i = va(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!n) return;
    const c = { blue: r, orange: o, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Ph[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, o]);
}
const Dh = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ne(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Oh(e, a) {
  return Dh[a](e);
}
function Hh({ item: e, connection: a }) {
  const n = /* @__PURE__ */ t("span", { className: se.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ l("p", { className: se.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    n,
    /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ l("p", { className: se.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.waitsOn,
    n,
    /* @__PURE__ */ l("span", { className: se.since, children: [
      ce(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Fh({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ l("div", { className: se.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function Wh({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: se.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function zh({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: se.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: se.field, children: Oh(e, n) }, n)) });
}
const Ja = (e) => e ? !0 : void 0;
function Kh(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function Gh(e, a, n) {
  e == null || e(a, n);
}
function Uh(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Vh({ item: e, stale: a }) {
  var r, o;
  const n = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: se.last, "data-stale": Ja(a), children: n }) : null;
}
function ja(e) {
  const a = e.fields ?? [], n = e.item, r = f(null);
  jh(r, n.key, e.feed);
  const o = Uh(e.feed), i = Kh(n);
  return /* @__PURE__ */ l(
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
        /* @__PURE__ */ t("button", { type: "button", className: se.hit, onClick: (s) => Gh(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(Fh, { item: n }),
        /* @__PURE__ */ t(ta, { as: "p", className: se.title, text: n.title }),
        /* @__PURE__ */ t(Hh, { item: n, connection: o }),
        /* @__PURE__ */ t(Wh, { reason: n.blockedReason }),
        /* @__PURE__ */ t(zh, { item: n, fields: a }),
        /* @__PURE__ */ t(Vh, { item: n, stale: o === "stale" })
      ]
    }
  );
}
const Yh = "_column_1j8bi_3", Jh = "_head_1j8bi_21", Xh = "_label_1j8bi_30", Qh = "_count_1j8bi_39", Zh = "_list_1j8bi_53", oa = {
  column: Yh,
  head: Jh,
  label: Xh,
  count: Qh,
  list: Zh
};
function Ln(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function ew({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ l("div", { className: oa.head, children: [
    /* @__PURE__ */ t("h2", { className: oa.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ l("span", { className: oa.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function aw(e) {
  return /* @__PURE__ */ t("div", { className: oa.list, role: "list", children: e.rows.map((a, n) => {
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
function tw({ column: e, items: a, fields: n, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), m = e.cap !== void 0 && a.length > e.cap, _ = Ln(a, r);
  return /* @__PURE__ */ l("section", { className: oa.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(ew, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(aw, { column: e, items: a, fields: n, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, rows: _ }),
    m && /* @__PURE__ */ t(Ch, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const nw = "_foot_cs4jr_2", rw = "_note_cs4jr_13", ow = "_link_cs4jr_19", Wa = {
  foot: nw,
  note: rw,
  link: ow
};
function gR({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: Wa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: Wa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${Wa.link} ward-target`, href: H(e), children: "Configure board" })
  ] });
}
const lw = "_head_1tfi5_3", iw = "_identity_1tfi5_12", sw = "_titleRow_1tfi5_18", cw = "_title_1tfi5_18", dw = "_key_1tfi5_35", uw = "_rollup_1tfi5_45", mw = "_tools_1tfi5_53", hw = "_swatch_1tfi5_101", ww = "_mark_1tfi5_108", ke = {
  head: lw,
  identity: iw,
  titleRow: sw,
  title: cw,
  key: dw,
  rollup: uw,
  tools: mw,
  swatch: hw,
  mark: ww
}, qt = "initials:";
function fw(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ee(e)} loaded this week`;
}
function _w(e) {
  const a = [fw(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ee(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function vw(e) {
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ l("span", { title: e.inFlightHint, children: [
      ee(e.inFlight),
      " in flight"
    ] }),
    " · ",
    _w(e)
  ] });
}
function bw(e) {
  return e.startsWith(qt) ? e.slice(qt.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function pw({ markRef: e, streamStep: a }) {
  const n = { "--stream": pe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ke.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: bw(e) }) : /* @__PURE__ */ t("span", { className: ke.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function gw({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function yR({
  stream: e,
  rollups: a,
  connection: n,
  lastEventAt: r,
  owners: o,
  owner: i,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ l("div", { className: ke.head, children: [
    /* @__PURE__ */ l("div", { className: ke.identity, children: [
      /* @__PURE__ */ l("div", { className: ke.titleRow, children: [
        /* @__PURE__ */ t(pw, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ke.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ke.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ke.rollup, "aria-live": "polite", children: vw(a) })
    ] }),
    /* @__PURE__ */ l("div", { className: ke.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(gw, { owners: o, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(it, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const yw = "_head_1sejb_14", Nw = "_line_1sejb_15", kw = "_cHandle_1sejb_36", $w = "_cName_1sejb_41", Cw = "_nameLine_1sejb_49", Sw = "_cLabel_1sejb_56", Rw = "_cCap_1sejb_61", Tw = "_cShown_1sejb_66", xw = "_name_1sejb_49", Lw = "_noCap_1sejb_88", Aw = "_state_1sejb_102", Ew = "_handle_1sejb_111", Iw = "_sub_1sejb_137", q = {
  head: yw,
  line: Nw,
  cHandle: kw,
  cName: $w,
  nameLine: Cw,
  cLabel: Sw,
  cCap: Rw,
  cShown: Tw,
  name: xw,
  noCap: Lw,
  state: Aw,
  handle: Ew,
  sub: Iw
}, Mw = "can't be hidden or collapsed", qw = "terminal · counted, not a column";
function NR() {
  return /* @__PURE__ */ l("div", { className: q.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: q.cHandle }),
    /* @__PURE__ */ t("span", { className: q.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: q.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: q.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: q.cShown, children: "Shown" })
  ] });
}
function Bw(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Pw(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Bt(e) {
  return e.gate ? Mw : e.terminal ? qw : Pw(e.agentsMounted);
}
function jw(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Dw({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: q.cName, children: [
    /* @__PURE__ */ l("span", { className: q.nameLine, children: [
      /* @__PURE__ */ t("span", { className: q.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Bt(e) && /* @__PURE__ */ t("span", { className: q.sub, children: Bt(e) })
  ] });
}
function Ow(e) {
  return e === void 0 ? "" : String(e);
}
function Hw(e) {
  return e === "" ? void 0 : Number(e);
}
function Fw({ name: e, onReorder: a }) {
  const n = Le();
  return (n == null ? void 0 : n.actions) === "hide" ? /* @__PURE__ */ t("span", { className: q.cHandle }) : /* @__PURE__ */ t("span", { className: q.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: q.handle,
      "aria-label": `Reorder ${e}`,
      disabled: n !== null,
      title: n == null ? void 0 : n.reason,
      "aria-describedby": n == null ? void 0 : n.reasonId,
      onKeyDown: (r) => !n && jw(r, a),
      children: "⠿"
    }
  ) });
}
function Ww({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${q.cCap} ${q.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: q.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Ow(a.cap), onChange: (r) => n({ ...a, cap: Hw(r) }) }) });
}
function zw({ stage: e, config: a, onChange: n }) {
  const r = Le() !== null, o = Bw(e, a.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ l("span", { className: q.cShown, children: [
    /* @__PURE__ */ t(Ge, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ t("span", { className: q.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!o.shown), children: o.state })
  ] });
}
function Kw(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function kR({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: q.line, "data-kind": Kw(e), children: [
    /* @__PURE__ */ t(Fw, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(Dw, { stage: e }),
    /* @__PURE__ */ t("span", { className: q.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (o) => n({ ...a, label: o }) }) }),
    /* @__PURE__ */ t(Ww, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(zw, { stage: e, config: a, onChange: n })
  ] });
}
const Gw = "_body_8qsv9_2", Uw = "_head_8qsv9_9", Vw = "_summary_8qsv9_19", Yw = "_block_8qsv9_20", Jw = "_actionsBlock_8qsv9_21", Xw = "_title_8qsv9_41", Qw = "_note_8qsv9_46", Zw = "_k_8qsv9_51", ef = "_kv_8qsv9_58", af = "_row_8qsv9_64", tf = "_label_8qsv9_75", nf = "_value_8qsv9_84", rf = "_quote_8qsv9_90", of = "_actions_8qsv9_21", lf = "_resolve_8qsv9_111", j = {
  body: Gw,
  head: Uw,
  summary: Vw,
  block: Yw,
  actionsBlock: Jw,
  title: Xw,
  note: Qw,
  k: Zw,
  kv: ef,
  row: af,
  label: tf,
  value: nf,
  quote: rf,
  actions: of,
  resolve: lf
};
function sf(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function cf(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function df(e) {
  const a = ua(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function uf(e) {
  return (e ?? []).map((a, n) => [a.label, a.value, `fact-${n}`]);
}
function mf(e, a, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...qa(df(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...sf(e),
    ...uf(n),
    ...cf(e, a)
  ];
}
function hf({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: j.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: j.k, children: a }),
    e
  ] });
}
function wf(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function ff({ item: e, showKey: a }) {
  const n = wf(e);
  return !a && !n ? null : /* @__PURE__ */ l("div", { className: j.head, children: [
    a && /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ t(h, { role: n.role, label: n.label })
  ] });
}
function _f({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: j.block, children: [
    /* @__PURE__ */ t("p", { className: j.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: j.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: j.note, children: e.agentMeta })
  ] }) : null;
}
function $R({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: o, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const m = N(), _ = mf(e, o, d);
  return /* @__PURE__ */ t(na, { kind: "drawer", labelledBy: m, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: j.body, children: [
    /* @__PURE__ */ t(ff, { item: e, showKey: u }),
    /* @__PURE__ */ l("div", { className: j.summary, children: [
      /* @__PURE__ */ t("h2", { className: j.title, id: m, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: j.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: j.kv, children: _.map(([w, y, L]) => /* @__PURE__ */ l("div", { className: j.row, children: [
      /* @__PURE__ */ t("dt", { className: j.label, children: w }),
      /* @__PURE__ */ t("dd", { className: j.value, children: y })
    ] }, L ?? w)) }),
    /* @__PURE__ */ t(_f, { item: e }),
    /* @__PURE__ */ l("div", { className: j.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: j.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: j.note, children: c })
    ] }),
    /* @__PURE__ */ t(hf, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const vf = "_root_3azmy_2", bf = "_list_3azmy_7", pf = "_item_3azmy_12", gf = "_box_3azmy_18", yf = "_text_3azmy_23", Nf = "_note_3azmy_28", Ye = {
  root: vf,
  list: bf,
  item: pf,
  box: gf,
  text: yf,
  note: Nf
};
function Da({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ l("div", { className: Ye.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${Ye.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${Ye.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ye.box, children: /* @__PURE__ */ t(lt, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ye.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${Ye.note} ward-checklist-note`, children: a })
  ] });
}
const kf = "_rail_znbbp_2", $f = "_k_znbbp_11", Cf = "_head_znbbp_19", Sf = "_section_znbbp_25", Rf = "_card_znbbp_39", Tf = "_strip_znbbp_46", xf = "_skeleton_znbbp_60", Lf = "_skeletonLabel_znbbp_74", Af = "_bar_znbbp_80", Ef = "_note_znbbp_89", me = {
  rail: kf,
  k: $f,
  head: Cf,
  section: Sf,
  card: Rf,
  strip: Tf,
  skeleton: xf,
  skeletonLabel: Lf,
  bar: Af,
  note: Ef
};
function If(e) {
  return (a) => e == null ? void 0 : e(a);
}
function za({ title: e, children: a }) {
  return /* @__PURE__ */ l("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function Mf({ column: e, count: a }) {
  return /* @__PURE__ */ l("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function qf({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ t(tw, { column: o, items: a.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, o.id));
}
function Bf(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(qf, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(Mf, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function CR(e) {
  const a = If(e.onOpen), n = Ln(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(za, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(ja, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ l(za, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(Bf, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(za, { title: "Effect of this config", children: /* @__PURE__ */ t(Da, { items: e.effects, density: "compact" }) })
  ] });
}
function Pf(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function jf(e) {
  return Math.ceil(e.length / 2);
}
function Df(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function An(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Of(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const o = An(e);
  o !== void 0 && n(o), r(Df(e.type));
}
function Hf(e, a, n, r, o) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Of(i, n, r, o));
  }, [e, a, n, r, o]);
}
function Ff(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Wf(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function zf(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Kf(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + z.height.card + " + " + z.height.cardRow + " * " + String(jf(a ?? [])) + ")"
  };
}
function Gf(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Uf(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: ne(e.cost) }) : null;
}
function Vf(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function Yf(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function Jf(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function Xf(e, a) {
  return a === void 0 ? e : Pf(e, a.ref);
}
function Qf(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ia(e) {
  return e === !0 ? "true" : void 0;
}
function En(e) {
  const a = e.item, n = a.run, r = n !== void 0, o = f(null), i = va(o), s = f(/* @__PURE__ */ new Set()), [c, d] = p(Ff(a));
  Hf(e.feed, a.key, s, d, i);
  const u = Wf(a, r), m = zf(a, n), _ = Kf(a, e.fields), w = Jf(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...Qf(e),
      className: "ward-workcard",
      "data-flagged": ia(a.flagged),
      "data-selected": ia(e.selected),
      style: _,
      ref: Xf(o, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Gf(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: u.role, label: u.label }),
          Uf(a, e.fields),
          Vf(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          Yf(n, c, e.connection, a.changedAt),
          w !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: w, children: w }) : null
        ] })
      ]
    }
  ) });
}
function Zf({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function e_(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function a_(e, a, n) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function t_(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(Zf, { count: e.items.length, cap: e.column.cap });
}
function n_(e, a) {
  return e.roving ?? a;
}
function r_(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function o_(e, a) {
  return e.items.map((n, r) => /* @__PURE__ */ t(
    En,
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
function l_(e) {
  const a = N(), n = La({ orientation: "vertical" }), r = n_(e, n), o = e_(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ia(o), "data-gate": ia(e.column.gate), children: [
    a_(e.column, e.items.length, a),
    t_(e, o),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...r_(e, n), children: o_(e, r) })
  ] });
}
function i_(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function s_(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function c_(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function SR(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: i_(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      s_(e),
      c_(e.onConfigure),
      /* @__PURE__ */ t(it, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function d_(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function u_(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Ge, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Ge, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function m_(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(T, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function RR(e) {
  const a = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": ia(d_(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: u_(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(on, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    m_(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function TR(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(En, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(l_, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function h_(e, a) {
  const n = An(e);
  n !== void 0 && a(n);
}
function w_(e, a, n) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => h_(r, n));
  }, [e, a, n]);
}
function f_(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function __(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ne(e.cost)]), a;
}
function v_(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function b_(e, a) {
  return /* @__PURE__ */ l(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function xR(e) {
  var s;
  const a = e.item, n = a.run, [r, o] = p((s = a.run) == null ? void 0 : s.lastStep);
  w_(e.feed, a.key, o);
  const i = [...f_(a), ...__(a)];
  return /* @__PURE__ */ l(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      v_(n, r)
    ] }),
    b_(a, e.actions)
  ] });
}
const p_ = "_card_54446_3", g_ = "_head_54446_30", y_ = "_mark_54446_38", N_ = "_name_54446_50", k_ = "_chips_54446_71", $_ = "_description_54446_77", C_ = "_run_54446_82", S_ = "_sep_54446_91", R_ = "_facts_54446_96", T_ = "_fact_54446_96", x_ = "_factLabel_54446_109", L_ = "_factValue_54446_113", re = {
  card: p_,
  head: g_,
  mark: y_,
  name: N_,
  chips: k_,
  description: $_,
  run: C_,
  sep: S_,
  facts: R_,
  fact: T_,
  factLabel: x_,
  factValue: L_
}, A_ = { live: "done", draft: "running", paused: "meta" };
function E_(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function I_({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: A_[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function M_({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: re.description, children: e });
}
function q_({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(xe, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function B_({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ l("div", { className: re.fact, children: [
    /* @__PURE__ */ t("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function P_(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function j_({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: o, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": d,
      className: E_(s),
      style: c,
      "data-selected": d,
      "data-paused": P_(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ l("h3", { className: re.head, children: [
          /* @__PURE__ */ t("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${re.name} ward-rowlink ward-target`, href: H(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(M_, { description: e.description }),
        /* @__PURE__ */ t(q_, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ t(I_, { versions: e.versions }),
        /* @__PURE__ */ t(B_, { facts: i })
      ]
    }
  );
}
const D_ = "_list_4dcyc_2", O_ = "_row_4dcyc_11", H_ = "_head_4dcyc_23", F_ = "_id_4dcyc_30", W_ = "_lock_4dcyc_35", z_ = "_reason_4dcyc_41", K_ = "_remove_4dcyc_46", G_ = "_clauses_4dcyc_50", U_ = "_clause_4dcyc_50", V_ = "_label_4dcyc_64", Y_ = "_cell_4dcyc_71", J_ = "_value_4dcyc_76", ie = {
  list: D_,
  row: O_,
  head: H_,
  id: F_,
  lock: W_,
  reason: z_,
  remove: K_,
  clauses: G_,
  clause: U_,
  label: V_,
  cell: Y_,
  value: J_
}, In = Te(!1);
function LR({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(In.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function X_({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => n(e.key, o) });
}
function Q_({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ie.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ie.reason, children: e })
  ] });
}
function Z_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ l("span", { className: ie.head, children: [
    /* @__PURE__ */ t("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(Q_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ie.remove, children: /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Pt(e, a) {
  return e.locked ? void 0 : a;
}
function AR({ rule: e, onChange: a, onRemove: n }) {
  if (!Re(In)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Pt(e, a);
  return /* @__PURE__ */ l("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Z_, { rule: e, onRemove: Pt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ie.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ie.clause, children: [
      /* @__PURE__ */ t("dt", { className: ie.label, children: o.label }),
      /* @__PURE__ */ t("dd", { className: ie.cell, children: /* @__PURE__ */ t(X_, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const ev = "_ladder_n8eeo_2", av = "_cell_n8eeo_7", tv = "_empty_n8eeo_26", nv = "_name_n8eeo_34", rv = "_holder_n8eeo_40", ov = "_request_n8eeo_46", lv = "_swatches_n8eeo_51", iv = "_swatch_n8eeo_51", sv = "_tilesFrame_n8eeo_78", cv = "_tiles_n8eeo_78", dv = "_tile_n8eeo_78", uv = "_bar_n8eeo_117", mv = "_hex_n8eeo_128", hv = "_note_n8eeo_138", E = {
  ladder: ev,
  cell: av,
  empty: tv,
  name: nv,
  holder: rv,
  request: ov,
  swatches: lv,
  swatch: iv,
  tilesFrame: sv,
  tiles: cv,
  tile: dv,
  bar: uv,
  hex: mv,
  note: hv
}, ER = "not validated yet, pending a CVD matrix and dark stepping";
function wv(e) {
  return e.reserved ? "reserved" : sa(e.step) ? "validated" : "partial";
}
function Mn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function fv(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function _v({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(je, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function vv(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function bv(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const jt = (e) => String(e).padStart(2, "0");
function pv(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? Mn(e, void 0);
}
function gv({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${jt(e)}` : Hr(e) }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: r ? n : `Step ${jt(e)} · ${n}` })
  ] });
}
function yv({ step: e, value: a, taken: n, onChange: r, presentation: o, disabled: i }) {
  const s = wv(e), c = Mn(s, n), d = c !== "free", u = d || i, m = a === e.step, _ = e.name ?? `Step ${e.step}`, w = () => {
    u || r(e.step);
  }, y = `${_} · ${o === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...bv(d, m, u), "data-validation": s, style: fv(e, s), onClick: w, onKeyDown: (B) => vv(B, w) }, label: y, name: _, holder: c, validation: s, note: pv(s, n, m), step: e.step };
}
const Nv = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(gv, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(_v, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function kv(e) {
  return Nv[e.presentation](yv(e));
}
function $v(e) {
  for (const a of e)
    if (!a.reserved && !Aa(a.step)) throw new Error("colour ladder renders token steps only");
}
function Cv() {
  return /* @__PURE__ */ l("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Sv(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Rv = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function Tv() {
  return /* @__PURE__ */ l("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const xv = { list: Cv, swatches: () => null, tiles: Tv };
function Lv(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function qn(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  $v(e.steps);
  const r = Sv(e), o = xv[r], i = /* @__PURE__ */ l(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(kv, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(o, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Lv(e.disabled === !0), className: `${Rv[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: E.tiles, children: i }) : i });
}
const Av = "_rail_s06lm_2", Ev = "_section_s06lm_12", Iv = "_sectionFlush_s06lm_22", Mv = "_head_s06lm_26", qv = "_headLabel_s06lm_34", Bv = "_sample_s06lm_42", Pv = "_sampleLabel_s06lm_47", jv = "_sampleTitle_s06lm_54", Dv = "_sampleMeta_s06lm_59", Ov = "_trace_s06lm_65", Hv = "_traceHead_s06lm_70", Fv = "_steps_s06lm_78", Wv = "_step_s06lm_78", zv = "_stepTitle_s06lm_97", Kv = "_hollow_s06lm_107", Gv = "_stepBody_s06lm_115", Uv = "_stepDetail_s06lm_127", Vv = "_publish_s06lm_132", Yv = "_reason_s06lm_138", Jv = "_note_s06lm_143", Xv = "_reveal_s06lm_148", k = {
  rail: Av,
  section: Ev,
  sectionFlush: Iv,
  head: Mv,
  headLabel: qv,
  sample: Bv,
  sampleLabel: Pv,
  sampleTitle: jv,
  sampleMeta: Dv,
  trace: Ov,
  traceHead: Hv,
  steps: Fv,
  step: Wv,
  stepTitle: zv,
  hollow: Kv,
  stepBody: Gv,
  stepDetail: Uv,
  publish: Vv,
  reason: Yv,
  note: Jv,
  reveal: Xv
}, Dt = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Qv = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Zv = { ok: "greenFill", finding: "orangeFill", action: "blue" }, eb = { notSimulated: "not simulated", running: "running" };
function ab(e) {
  return e.presentation === "foundry";
}
function tb(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function nb(e, a) {
  var r;
  const n = Qv[e.status];
  return n !== void 0 ? n : ((r = a.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function rb(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function ob(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function lb(e) {
  if (rb(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function ib(e) {
  const [a, n] = p(!1);
  S(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function sb(e) {
  const a = eb[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(je, { size: 6, kind: Zv[e.kind], label: e.kind });
}
function cb(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function db(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function ub(e) {
  const { step: a } = e;
  return /* @__PURE__ */ l(ib, { kind: a.kind, children: [
    /* @__PURE__ */ t(sb, { kind: a.kind }),
    /* @__PURE__ */ l("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(cb, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(db, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function mb(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function Bn(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: mb(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(ub, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function hb(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ l("div", { className: `${k.sample} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.sampleLabel, children: "Sample item" }),
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
function wb(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function fb(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ne(e.run.cost), label: "Cost" }, { value: e.run.turns ? Xt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Ba, { divided: !0, cells: a }) });
}
function _b(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ne(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Xt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function vb(e) {
  const a = _b(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ l("p", { className: k.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Ba, { divided: !0, cells: a }) });
}
function Pn(e) {
  const a = N();
  return e.reason !== null ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t("p", { className: `${k.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function bb(e) {
  return /* @__PURE__ */ l("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(Pn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function pb(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(Pn, { reason: e.reason, onPublish: e.onPublish }) });
}
function jn(e) {
  return /* @__PURE__ */ l("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: Dt[e.run.status].role, label: Dt[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function gb(e, a) {
  const [n, r] = p(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (o) => {
        (o.type === "run.step" || o.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: o.type === "run.finding" ? "finding" : "action", title: ((s = o.step) == null ? void 0 : s.label) ?? "step", detail: (c = o.step) == null ? void 0 : c.tool }];
        });
      });
  }, [a, e.status]), n;
}
function yb(e) {
  var n;
  ob(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(jn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(hb, { sample: e.run.sample }),
    /* @__PURE__ */ t(Bn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(fb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist }) }),
    /* @__PURE__ */ t(bb, { reason: tb(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Nb(e) {
  var r;
  const a = gb(e.run, e.feed);
  lb(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(jn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(wb, { sample: e.run.sample }),
    /* @__PURE__ */ t(Bn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(vb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(pb, { reason: nb(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function IR(e) {
  return ab(e) ? /* @__PURE__ */ t(Nb, { ...e }) : /* @__PURE__ */ t(yb, { ...e });
}
const kb = "_list_142ip_3", $b = "_row_142ip_9", Cb = "_condition_142ip_18", Sb = "_action_142ip_24", pa = {
  list: kb,
  row: $b,
  condition: Cb,
  action: Sb
}, Dn = Te(!1);
function MR({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(Dn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: pa.list, "aria-label": a, children: e }) });
}
function qR({ rule: e }) {
  if (!Re(Dn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: pa.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: pa.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: pa.action, children: e.then })
  ] });
}
const Rb = "_move_tmppt_3", Tb = {
  move: Rb
};
function Xa(e, a, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [o] = r.splice(a, 1);
  return r.splice(n, 0, o), r;
}
function On(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Hn(e, a, n) {
  return `${e} moved to position ${a + 1} of ${n}.`;
}
function Ot(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function xb(e) {
  return e === "up" ? "down" : "up";
}
function Lb(e, a) {
  const n = Ot(e, a.id, a.direction) ?? Ot(e, a.id, xb(a.direction));
  n == null || n.focus();
}
function Fn() {
  const e = f(null), [a, n] = p(null), [r, o] = p("");
  return S(() => {
    e.current !== null && a !== null && Lb(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), o(c);
  } };
}
function Wn({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Ca({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${Tb.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const Ab = "_body_1jd1i_2", Eb = "_title_1jd1i_8", Ib = "_section_1jd1i_13", Mb = "_legend_1jd1i_18", qb = "_stages_1jd1i_26", Bb = "_stage_1jd1i_26", Pb = "_stageIndex_1jd1i_44", jb = "_stageName_1jd1i_50", Db = "_footer_1jd1i_59", Ob = "_note_1jd1i_66", Hb = "_reason_1jd1i_71", Fb = "_actions_1jd1i_76", Wb = "_webHead_1jd1i_83", zb = "_kicker_1jd1i_92", Kb = "_webTitle_1jd1i_99", Gb = "_webBody_1jd1i_105", Ub = "_webSection_1jd1i_109", Vb = "_sectionHead_1jd1i_121", Yb = "_sectionNote_1jd1i_129", Jb = "_formLabel_1jd1i_134", Xb = "_identityRow_1jd1i_139", Qb = "_nameCell_1jd1i_145", Zb = "_keyCell_1jd1i_150", ep = "_colourCell_1jd1i_154", ap = "_colourStatus_1jd1i_161", tp = "_webStages_1jd1i_166", np = "_webStageList_1jd1i_172", rp = "_webStage_1jd1i_166", op = "_webIndex_1jd1i_191", lp = "_webStageName_1jd1i_196", ip = "_webMoves_1jd1i_201", sp = "_addStage_1jd1i_215", cp = "_addStageButton_1jd1i_223", dp = "_addStageNote_1jd1i_231", up = "_webFooter_1jd1i_236", mp = "_webFooterNotes_1jd1i_244", hp = "_webNote_1jd1i_251", v = {
  body: Ab,
  title: Eb,
  section: Ib,
  legend: Mb,
  stages: qb,
  stage: Bb,
  stageIndex: Pb,
  stageName: jb,
  footer: Db,
  note: Ob,
  reason: Hb,
  actions: Fb,
  webHead: Wb,
  kicker: zb,
  webTitle: Kb,
  webBody: Gb,
  webSection: Ub,
  sectionHead: Vb,
  sectionNote: Yb,
  formLabel: Jb,
  identityRow: Xb,
  nameCell: Qb,
  keyCell: Zb,
  colourCell: ep,
  colourStatus: ap,
  webStages: tp,
  webStageList: np,
  webStage: rp,
  webIndex: op,
  webStageName: lp,
  webMoves: ip,
  addStage: sp,
  addStageButton: cp,
  addStageNote: dp,
  webFooter: up,
  webFooterNotes: mp,
  webNote: hp
}, wp = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], zn = "not in catalogue";
function fp(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${zn}` }, ...n];
}
function _p({ stage: e, index: a, catalogue: n, onName: r }) {
  const o = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${zn}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: fp(n, e.name), invalid: i, onChange: r });
}
function Kn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function vp(e) {
  const a = f([]), n = f(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function bp({ id: e, stage: a, index: n, total: r, catalogue: o, onReplace: i, onMove: s }) {
  const c = Kn(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: v.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: v.webStageName, children: /* @__PURE__ */ t(_p, { stage: a, index: n, catalogue: o, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: wp, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ l("span", { className: v.webMoves, children: [
      n > 0 && /* @__PURE__ */ t(Ca, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t(Ca, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function pp({ stages: e, onChange: a, catalogue: n }) {
  const r = vp(e.length), o = Fn(), i = (c, d) => {
    const u = On(c, d);
    r.current = Xa(r.current, c, u), o.moved({ id: r.current[u], direction: d }, Hn(Kn(e[c], c), u, e.length)), a(Xa(e, c, u));
  }, s = (c, d) => a(e.map((u, m) => m === c ? d : u));
  return /* @__PURE__ */ l("div", { className: v.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: o.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(bp, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(Wn, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: v.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: v.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const gp = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], yp = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Np = "A new stream starts as a draft. Nothing runs on it until you publish it.", kp = "Create is disabled: name the stream and give it a key first.", $p = "reorder with the ↑ ↓ buttons · min 2";
function ct(e, a) {
  return !e.reserved && sa(e.step) && a[e.step] === void 0;
}
function Cp(e, a) {
  const n = e.find((r) => ct(r, a));
  return n ? n.step : 1;
}
function Sp({ stages: e, onMove: a }) {
  const n = Fn(), r = (o, i) => {
    const s = On(o, i);
    n.moved({ id: e[o].id, direction: i }, Hn(e[o].name, s, e.length)), a(o, s);
  };
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: v.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: v.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: v.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ t(Ca, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t(Ca, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ t(Wn, { text: n.announcement })
  ] });
}
function Rp({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ l("div", { className: v.footer, children: [
    /* @__PURE__ */ t("p", { className: v.note, children: Np }),
    e && /* @__PURE__ */ t("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: v.actions, children: [
      /* @__PURE__ */ t(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Tp(e, a) {
  return e !== "" && a !== "" ? null : kp;
}
function xp(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: o = yp, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [m, _] = p(""), [w, y] = p(""), [L, B] = p(a[0].value), [oe, Ae] = p(() => Cp(n, r)), [ae, Ue] = p(e.stages ?? gp), [Ve, R] = p(o[0].value), G = { name: m, key: w, streamStep: oe, owner: L, stages: ae, policy: Ve }, ge = Tp(m, w);
  return /* @__PURE__ */ t(na, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ l("div", { className: v.body, children: [
    /* @__PURE__ */ t("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Stream name", value: m, onChange: _ }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Key", value: w, onChange: y, mono: !0 }),
      /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: L, onChange: B, options: a })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ t(qn, { label: "Stream colour", steps: n, value: oe, onChange: Ae, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ t(Sp, { stages: ae, onMove: (De, vr) => Ue(Xa(ae, De, vr)) })
    ] }),
    /* @__PURE__ */ t(Sn, { legend: "Loop policy", options: o, value: Ve, onChange: R }),
    /* @__PURE__ */ t(Rp, { reason: ge, onCreate: () => i(G), onDraft: () => s(G) })
  ] }) });
}
const Gn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Lp = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Ap(e, a, n, r, o, i) {
  var c;
  const s = ((c = Gn.find((d) => d.value === o)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function Ep(e, a) {
  return Ip(e) && Mp(e, a) && qp(e);
}
function Ip(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Mp(e, a) {
  return e.colourStep === null || ct({ step: e.colourStep }, a);
}
function qp(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Bp(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : ct({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Pp({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function jp({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: v.webFooter, children: [
    /* @__PURE__ */ l("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ t(Pp, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: v.reason, children: Lp })
    ] }),
    o && /* @__PURE__ */ t(b, { variant: "secondary", onClick: () => o(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Dp({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: v.webHead, children: [
    /* @__PURE__ */ t("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function Op({ name: e, setName: a, streamKey: n, setKey: r, colour: o, owner: i }) {
  return /* @__PURE__ */ l("section", { className: v.webSection, children: [
    /* @__PURE__ */ t("h3", { className: v.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ l("div", { className: v.identityRow, children: [
      /* @__PURE__ */ t("div", { className: v.nameCell, children: /* @__PURE__ */ t(M, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ t("div", { className: v.keyCell, children: /* @__PURE__ */ t(M, { variant: "form", label: "Key", value: n, onChange: r, mono: !0 }) }),
      o
    ] }),
    i
  ] });
}
function Hp(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [o, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [m, _] = p(null), [w, y] = p("relay"), [L, B] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = Ap(o, s, d, m, w, L), Ae = Ep(oe, r), ae = L.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ue = /* @__PURE__ */ l("div", { className: v.colourCell, children: [
    /* @__PURE__ */ t("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(qn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: _, takenBy: r })
  ] }), Ve = /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t("p", { className: v.colourStatus, "data-colour-status": "", children: Bp(m, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ l(na, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(Dp, { titleId: n }),
    /* @__PURE__ */ l("div", { className: v.webBody, children: [
      /* @__PURE__ */ t(Op, { name: o, setName: i, streamKey: s, setKey: c, colour: Ue, owner: Ve }),
      /* @__PURE__ */ l("section", { className: v.webSection, children: [
        /* @__PURE__ */ l("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: v.sectionNote, children: $p })
        ] }),
        /* @__PURE__ */ t(pp, { stages: L, onChange: B })
      ] }),
      /* @__PURE__ */ t("section", { className: v.webSection, children: /* @__PURE__ */ t(Sn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: w, options: Gn, onChange: y }) }),
      /* @__PURE__ */ t(jp, { ready: Ae, draft: oe, agentStage: ae, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function BR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Hp, { ...e }) : /* @__PURE__ */ t(xp, { ...e });
}
const Fp = "_row_bs8hc_2", Wp = "_cell_bs8hc_6", zp = "_condition_bs8hc_11", Kp = "_action_bs8hc_18", Gp = "_contract_bs8hc_24", Up = "_contractCondition_bs8hc_33", Vp = "_contractAction_bs8hc_39", Q = {
  row: Fp,
  cell: Wp,
  condition: zp,
  action: Kp,
  contract: Gp,
  contractCondition: Up,
  contractAction: Vp
}, Un = ["advance", "block", "escalate", "requestReview"], Ht = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Sa(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function dt(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: Q.action, children: Ht[e.then] }) : /* @__PURE__ */ t(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => a({ ...e, then: o }),
      options: Un.map((o) => ({ value: o, label: Ht[o] }))
    }
  );
}
function Yp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: Q.row, children: [
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t("span", { className: Q.condition, title: Sa(e, r), children: Sa(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: dt(e, a, n) })
  ] });
}
function Jp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: Q.row, children: [
    /* @__PURE__ */ l("td", { className: Q.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Q.condition, children: Sa(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: dt(e, a, n) })
  ] });
}
function Xp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: Q.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Q.contractCondition, children: Sa(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Q.contractAction, children: dt(e, a, n, !0) })
  ] });
}
const Qp = { two: Jp, four: Yp, contract: Xp };
function PR(e) {
  var n;
  if (!Un.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Qp[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const Zp = "_column_11id3_2", eg = "_head_11id3_17", ag = "_index_11id3_23", tg = "_name_11id3_29", ng = "_meta_11id3_38", rg = "_mono_11id3_43", og = "_gate_11id3_50", lg = "_reviewersLabel_11id3_57", ig = "_reviewers_11id3_57", sg = "_reviewer_11id3_57", cg = "_agents_11id3_74", dg = "_workflowColumn_11id3_79", ug = "_workflowHead_11id3_96", mg = "_stageRow_11id3_102", hg = "_stageLabel_11id3_109", wg = "_workflowTitle_11id3_116", fg = "_workflowMeta_11id3_122", _g = "_workflowGate_11id3_127", vg = "_gateNote_11id3_135", bg = "_cardNote_11id3_140", pg = "_reviewerList_11id3_145", gg = "_reviewerRow_11id3_151", yg = "_reviewerMark_11id3_157", Ng = "_reviewerName_11id3_167", kg = "_terminalCard_11id3_173", $g = "_terminalCount_11id3_182", Cg = "_workflowAgents_11id3_188", Sg = "_mount_11id3_194", C = {
  column: Zp,
  head: eg,
  index: ag,
  name: tg,
  meta: ng,
  mono: rg,
  gate: og,
  reviewersLabel: lg,
  reviewers: ig,
  reviewer: sg,
  agents: cg,
  workflowColumn: dg,
  workflowHead: ug,
  stageRow: mg,
  stageLabel: hg,
  workflowTitle: wg,
  workflowMeta: fg,
  workflowGate: _g,
  gateNote: vg,
  cardNote: bg,
  reviewerList: pg,
  reviewerRow: gg,
  reviewerMark: yg,
  reviewerName: Ng,
  terminalCard: kg,
  terminalCount: $g,
  workflowAgents: Cg,
  mount: Sg
}, Rg = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function ut(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Vn(e) {
  return `${Math.round(e * 100)}%`;
}
function Tg({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: C.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: C.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: C.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: C.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Ba, { cells: [
      { value: Vn(e.gateShare), label: "Gate share" },
      { value: ee(e.count), label: "In stage" }
    ] })
  ] });
}
function xg({ stage: e }) {
  return /* @__PURE__ */ t(Ba, { cells: [
    { value: ee(e.count), label: "In stage" },
    { value: ut(e.closedThisWeek, ee), label: "Closed this week" }
  ] });
}
function Lg({ stage: e, titleId: a }) {
  return /* @__PURE__ */ l("header", { className: C.head, children: [
    /* @__PURE__ */ t("span", { className: C.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: C.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: Rg[e.kind] })
  ] });
}
function Ag({ stage: e }) {
  return /* @__PURE__ */ l("p", { className: C.meta, children: [
    /* @__PURE__ */ l("span", { className: C.mono, children: [
      ee(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ l("span", { className: C.mono, children: [
      ce(e.medianWait),
      " median wait"
    ] })
  ] });
}
function Eg({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(Tg, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(xg, { stage: e }) : null;
}
function Ig({ onMount: e }) {
  return e ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Mg({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const o = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: C.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Lg, { stage: e, titleId: o }),
    /* @__PURE__ */ t(Ag, { stage: e }),
    /* @__PURE__ */ t(Eg, { stage: e }),
    /* @__PURE__ */ t("div", { className: C.agents, children: a.map((s) => /* @__PURE__ */ t(j_, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(Ig, { onMount: n })
  ] });
}
const qg = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function Bg({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: C.reviewerList, children: e.map((a, n) => /* @__PURE__ */ l("li", { className: C.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: C.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: C.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function Pg({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: C.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: C.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(Bg, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: C.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Vn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function jg(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Dg({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: C.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: C.terminalCount, children: ut(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: C.cardNote, children: jg(e.rolledBackThisWeek) })
  ] });
}
function Og(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Hg(e) {
  if (e.kind === "terminal") return `${ut(e.closedThisWeek)} this week`;
  const a = Og(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Fg({ stage: e, titleId: a }) {
  const n = qg[e.kind];
  return /* @__PURE__ */ l("header", { className: C.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: C.stageRow, children: [
      /* @__PURE__ */ l("span", { className: C.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: C.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: C.workflowMeta, children: Hg(e) })
  ] });
}
function Wg(e) {
  return e === "entry" || e === "agent";
}
function zg({ stage: e, onMount: a }) {
  return a === void 0 || !Wg(e.kind) ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", className: C.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Kg({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ l("section", { className: C.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Fg, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(Pg, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(Dg, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: C.workflowAgents, children: a }),
    /* @__PURE__ */ t(zg, { stage: e, onMount: n })
  ] });
}
function Gg(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function jR(e) {
  return Gg(e) ? /* @__PURE__ */ t(Kg, { ...e }) : /* @__PURE__ */ t(Mg, { ...e });
}
const Ug = "_row_1tdra_6", Vg = "_name_1tdra_12", Yg = "_compactRow_1tdra_13", Jg = "_compactName_1tdra_13", Xg = "_cell_1tdra_30", Qg = "_chain_1tdra_45", Zg = "_owner_1tdra_51", ey = "_mono_1tdra_57", ay = "_compactCell_1tdra_79", ty = "_stack_1tdra_96", ny = "_stat_1tdra_103", ry = "_identityLine_1tdra_110", oy = "_identity_1tdra_110", ly = "_ownerLine_1tdra_140", iy = "_link_1tdra_160", sy = "_gateMark_1tdra_166", cy = "_emptyChain_1tdra_171", dy = "_arrow_1tdra_177", uy = "_muted_1tdra_182", my = "_define_1tdra_187", hy = "_statValue_1tdra_194", wy = "_policyId_1tdra_200", fy = "_sub_1tdra_205", g = {
  row: Ug,
  name: Vg,
  compactRow: Yg,
  compactName: Jg,
  cell: Xg,
  chain: Qg,
  owner: Zg,
  mono: ey,
  compactCell: ay,
  stack: ty,
  stat: ny,
  identityLine: ry,
  identity: oy,
  ownerLine: ly,
  link: iy,
  gateMark: sy,
  emptyChain: cy,
  arrow: dy,
  muted: uy,
  define: my,
  statValue: hy,
  policyId: wy,
  sub: fy
};
function Yn(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: o, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: o, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function _y(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function vy(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Jn(e) {
  return `${ee(e)} ${e === 1 ? "member" : "members"}`;
}
function by(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Jn(e.members)}`;
}
function py(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ l("span", { className: g.stack, children: [
    /* @__PURE__ */ l("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: H(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: by(e) })
  ] }) });
}
function Xn({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ l(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function gy(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = ua(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function yy({ stages: e, streamStep: a }) {
  const n = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((o, i) => /* @__PURE__ */ l("span", { className: g.link, children: [
    /* @__PURE__ */ t(Xn, { name: o.name, gate: o.gate === !0, look: gy(i, n, a), size: "tag" }),
    i === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${i}`)) });
}
function Ny(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ l("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : yy(e) });
}
function Qn(e) {
  return e === void 0 ? void 0 : !0;
}
function Ft(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: n }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Qn(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: a })
  ] }) });
}
function ky(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function $y(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Cy({ stream: e, href: a, presentation: n }) {
  const r = vy(n.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, onClick: Yn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    py(e, a),
    Ny(e),
    Ft($y(e.agents), e.agents === void 0 ? void 0 : _y(e.agents), "—"),
    ky(e.policy),
    Ft(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function Sy(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function DR(e) {
  if (Sy(e)) return Cy(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ l("tr", { className: g.row, onClick: Yn, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ l("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: H(n), children: a.name }),
      /* @__PURE__ */ t(h, { ...qa(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(h, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ t("span", { className: g.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: g.link, children: /* @__PURE__ */ t(Xn, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ l("span", { className: g.mono, children: [
      a.agents.live,
      " live · ",
      a.agents.draft,
      " draft · ",
      a.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ l("td", { className: g.cell, children: [
      /* @__PURE__ */ t("span", { className: g.owner, children: a.owner }),
      /* @__PURE__ */ t("span", { className: g.mono, children: Jn(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: a.inFlightHint, "data-raised": Qn(a.inFlightHint), children: ee(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const Ry = "_row_2u4ll_2", Ty = "_name_2u4ll_16", xy = "_scope_2u4ll_24", Ra = {
  row: Ry,
  name: Ty,
  scope: xy
};
function mt(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Ly(e) {
  return e === void 0 ? `${Ra.row} ward-toolrow` : `${Ra.row} ward-toolrow ${e}`;
}
function Ay(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Ey({ id: e, reasonId: a, tool: n, state: r, onChange: o }) {
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
        r.locked || o(i.target.checked);
      }
    }
  );
}
function Iy({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: mt(e) });
}
function My({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${Ra.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function qy(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function OR({ tool: e, onChange: a, presentation: n }) {
  const r = N(), o = N(), i = Ay(e, n), s = qy(n);
  return /* @__PURE__ */ l(s, { className: Ly(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Ey, { id: r, reasonId: o, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${Ra.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(My, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ t(Iy, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const By = "_strip_4ppv9_2", Py = "_well_4ppv9_11", jy = "_head_4ppv9_18", Dy = "_name_4ppv9_24", Oy = "_chart_4ppv9_32", Hy = "_segment_4ppv9_38", Fy = "_detailedChart_4ppv9_44", Wy = "_rail_4ppv9_57", zy = "_section_4ppv9_63", Ky = "_label_4ppv9_74", Gy = "_note_4ppv9_91", K = {
  strip: By,
  well: Py,
  head: jy,
  name: Dy,
  chart: Oy,
  segment: Hy,
  detailedChart: Fy,
  rail: Wy,
  section: zy,
  label: Ky,
  note: Gy
}, Uy = "No item in flight to preview.", Vy = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Yy = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Qa = [1, 2, 3, 4, 5, 6], Ta = 100;
function Jy(e, a) {
  return a.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function Xy({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: K.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Qa.map((r, o) => /* @__PURE__ */ t(
    "rect",
    {
      className: K.segment,
      x: o * Ta,
      y: "0",
      width: Ta,
      height: "8",
      fill: Jy(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Qy(e) {
  const a = e.slice(0, Qa.length);
  for (; a.length < Qa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Zy({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${K.detailedChart} ward-appearance-chart`, children: [
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
function Zn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function fa({ label: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ l("section", { className: K.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: K.label, children: e }),
    a
  ] });
}
function eN({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: K.note, children: a ?? Uy }) : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(ja, { item: { ...e, streamStep: ua(n.streamStep) }, onOpen: Zn(r), feed: null }) });
}
function aN({ draft: e }) {
  const a = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: K.head, style: a, children: [
    /* @__PURE__ */ t(je, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...qa(e.key, e.streamStep) })
  ] });
}
function tN(e) {
  const a = Qy(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ l("div", { className: K.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(fa, { label: "Board card", children: /* @__PURE__ */ t(eN, { ...e, draft: n }) }),
    /* @__PURE__ */ t(fa, { label: "Streams index row", children: /* @__PURE__ */ t(aN, { draft: n }) }),
    /* @__PURE__ */ l(fa, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(Zy, { identities: a }),
      /* @__PURE__ */ t("p", { className: K.note, children: Vy })
    ] }),
    /* @__PURE__ */ t(fa, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: K.note, children: Yy }) })
  ] });
}
function nN({ draft: e, sample: a, streams: n, onOpen: r }) {
  const o = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: K.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: K.head, children: [
      /* @__PURE__ */ t(je, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...qa(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(ja, { item: { ...a, streamStep: e.streamStep }, onOpen: Zn(r) }) }),
    /* @__PURE__ */ t(Xy, { draft: e, streams: n })
  ] });
}
function HR(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(tN, { ...e }) : /* @__PURE__ */ t(nN, { ...e });
}
const rN = "_row_ixlg5_6", oN = "_headCell_ixlg5_10", lN = "_cell_ixlg5_11", iN = "_name_ixlg5_23", sN = "_consequence_ixlg5_29", cN = "_governed_ixlg5_36", dN = "_control_ixlg5_42", uN = "_byRole_ixlg5_48", mN = "_webControl_ixlg5_59", hN = "_webConsequence_ixlg5_65", wN = "_webGoverned_ixlg5_71", O = {
  row: rN,
  headCell: oN,
  cell: lN,
  name: iN,
  consequence: sN,
  governed: cN,
  control: dN,
  byRole: uN,
  webControl: mN,
  webConsequence: hN,
  webGoverned: wN
};
function fN({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: O.byRole, children: "by role" }) : /* @__PURE__ */ l("span", { className: O.control, children: [
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
function _N({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: O.headCell, children: [
      /* @__PURE__ */ t("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: O.consequence, children: e.consequence }),
      /* @__PURE__ */ l("span", { className: O.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(fN, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function vN(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function bN({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${O.webControl} ${O.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    Ge,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: n === void 0,
      onChange: (o) => n == null ? void 0 : n(a.streamStep, o ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ l("span", { className: `${O.webControl} ward-envrow`, children: [
    /* @__PURE__ */ t(h, { role: "running", label: "Pilot" }),
    r
  ] });
}
function pN({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ l("td", { className: O.cell, children: [
      /* @__PURE__ */ t("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${O.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(bN, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webGoverned} ward-cellmeta`, children: vN(e) }) })
  ] });
}
function FR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(pN, { ...e }) : /* @__PURE__ */ t(_N, { ...e });
}
const gN = "_row_vv64h_2", yN = "_cell_vv64h_6", NN = "_name_vv64h_25", kN = "_note_vv64h_30", $N = "_webName_vv64h_41", CN = "_webMeta_vv64h_47", V = {
  row: gN,
  cell: yN,
  name: NN,
  note: kN,
  webName: $N,
  webMeta: CN
}, er = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function SN(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function RN({ component: e, onRestart: a }) {
  const n = N(), r = er[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ l("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: V.name, children: e.name }) }),
    /* @__PURE__ */ l("td", { className: V.cell, "data-mono": "true", children: [
      ee(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { id: n, className: V.note, children: e.note }) }),
    /* @__PURE__ */ t("td", { className: V.cell, "data-align": "end", children: o ? /* @__PURE__ */ t(b, { size: "sm", disabled: !0, describedBy: n, children: "Restart" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function TN({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: SN(e.state) });
}
function xN({ component: e, onRestart: a }) {
  return /* @__PURE__ */ l("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { ...er[e.state] }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(TN, { component: e, onRestart: a }) })
  ] });
}
function WR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(xN, { ...e }) : /* @__PURE__ */ t(RN, { ...e });
}
const LN = "_row_jcm5k_7", AN = "_cell_jcm5k_11", EN = "_next_jcm5k_28", IN = "_headCell_jcm5k_38", MN = "_webId_jcm5k_77", qN = "_webPurpose_jcm5k_83", BN = "_webMeta_jcm5k_91", PN = "_webUrgent_jcm5k_97", F = {
  row: LN,
  cell: AN,
  next: EN,
  headCell: IN,
  webId: MN,
  webPurpose: qN,
  webMeta: BN,
  webUrgent: PN
}, jN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, DN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, ar = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], ON = Object.fromEntries(ar.map((e) => [e.key, e]));
function Je({ column: e, children: a }) {
  const n = ON[e];
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
function zR() {
  return /* @__PURE__ */ t("tr", { children: ar.map((e) => /* @__PURE__ */ t(
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
function HN({ cred: e }) {
  const a = jN[e.state];
  return /* @__PURE__ */ l("tr", { className: F.row, children: [
    /* @__PURE__ */ t(Je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Je, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Je, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Je, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: mt(e.cls) }) }),
    /* @__PURE__ */ t(Je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Je, { column: "next", children: /* @__PURE__ */ t("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function FN({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function WN({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: F.row, children: [
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(FN, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { ...DN[e.state] }) })
  ] });
}
function KR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(WN, { ...e }) : /* @__PURE__ */ t(HN, { ...e });
}
const zN = "_card_17zba_2", KN = "_head_17zba_11", GN = "_env_17zba_18", UN = "_version_17zba_25", VN = "_meta_17zba_32", YN = "_webCard_17zba_37", JN = "_webRow_17zba_47", XN = "_webTitle_17zba_55", QN = "_webLine_17zba_65", ZN = "_webVersion_17zba_72", ek = "_webMeta_17zba_77", U = {
  card: zN,
  head: KN,
  env: GN,
  version: UN,
  meta: VN,
  webCard: YN,
  webRow: JN,
  webTitle: XN,
  webLine: QN,
  webVersion: ZN,
  webMeta: ek
}, Wt = { dev: "Dev", uat: "UAT", prod: "Prod" }, tr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function ak({ env: e }) {
  const a = tr[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l("section", { className: U.card, "aria-label": Wt[e.env], children: [
    /* @__PURE__ */ l("div", { className: U.head, children: [
      /* @__PURE__ */ t("span", { className: U.env, children: Wt[e.env] }),
      /* @__PURE__ */ t(h, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ t("p", { className: U.version, children: e.version }),
    /* @__PURE__ */ l("p", { className: U.meta, children: [
      "deployed ",
      de(e.deployedAt)
    ] }),
    n && /* @__PURE__ */ t("p", { className: U.meta, children: n })
  ] });
}
function tk(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function nk(e) {
  return /* @__PURE__ */ l("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...tr[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: tk(e) })
  ] });
}
function GR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(nk, { ...e }) : /* @__PURE__ */ t(ak, { ...e });
}
const rk = "_panel_1hmja_2", ok = "_line_1hmja_8", lk = "_actions_1hmja_14", _a = {
  panel: rk,
  line: ok,
  actions: lk
};
function UR(e) {
  return /* @__PURE__ */ l("div", { className: _a.panel, children: [
    /* @__PURE__ */ t("p", { className: _a.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: _a.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: _a.line, children: e.note ?? "" })
  ] });
}
const ik = "_upload_13fcl_2", sk = "_preview_13fcl_7", ck = "_mark_13fcl_17", dk = "_empty_13fcl_22", uk = "_actions_13fcl_28", mk = "_input_13fcl_33", hk = "_reasons_13fcl_41", wk = "_reason_13fcl_41", fk = "_accepted_13fcl_57", te = {
  upload: ik,
  preview: sk,
  mark: ck,
  empty: dk,
  actions: uk,
  input: mk,
  reasons: hk,
  reason: wk,
  accepted: fk
}, nr = 1.5, rr = 22, xa = "script elements or event handlers", Me = "links or external references", Se = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${nr}px at ${rr}px`], _k = [Se[1], Se[2], xa, Me], vk = /* @__PURE__ */ new Map([
  ["image", Se[1]],
  ["text", Se[2]],
  ["tspan", Se[2]],
  ["textPath", Se[2]],
  ["script", xa],
  ["foreignObject", xa],
  ["a", Me],
  ["use", Me],
  ["style", Me],
  ["feImage", Me],
  ["set", Me]
]), bk = "http://www.w3.org/2000/svg", pk = "http://www.w3.org/2000/xmlns/", gk = /* @__PURE__ */ new Set([
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
]), yk = /* @__PURE__ */ new Set([
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
]), ht = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, Nk = /url\s*\(|['"\\]/i;
function kk() {
  return { ok: !1, reasons: [Se[1]] };
}
function or(e) {
  return e.namespaceURI === bk;
}
function $k(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && or(a) ? a : null;
  } catch {
    return null;
  }
}
function Ck(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [Se[0]] : [];
}
function Sk(e) {
  return vk.get(e.localName) ?? (e.localName.startsWith("animate") ? Me : void 0);
}
function Rk(e) {
  return Nk.test(e.replace(ht, ""));
}
function Tk(e) {
  return /^on/i.test(e.localName) ? xa : e.localName === "href" || Rk(e.value) ? Me : void 0;
}
function xk(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(Sk(n));
    for (const r of Array.from(n.attributes)) a.add(Tk(r));
  }
  return _k.filter((n) => a.has(n));
}
function Lk(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((o) => Number.isFinite(o) && o > 0), 0), r = n > 0 ? rr / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < nr;
  }) ? [Se[3]] : [];
}
function Ak(e) {
  if (e.namespaceURI === pk) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (yk.has(a) || a.startsWith("stroke"));
}
function Ek(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && or(a) && gk.has(a.localName);
}
function Ik(e, a) {
  Ek(a) ? a.nodeType === Node.ELEMENT_NODE && lr(a) : e.removeChild(a);
}
function lr(e) {
  for (const a of Array.from(e.attributes)) Ak(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) Ik(e, a);
  return e;
}
function Mk(e) {
  return Array.from(e.matchAll(ht), (a) => a[2]).filter((a) => a !== "");
}
function qk(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function Bk(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const i of Mk(o.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function Pk(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(ht, (r, o, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function jk(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = Bk(n, a);
  for (const o of n) {
    const i = r.get(o.getAttribute("id") ?? "");
    i === void 0 ? o.removeAttribute("id") : o.setAttribute("id", i), Pk(o, r);
  }
  return e;
}
function VR(e) {
  const a = $k(e);
  if (a === null) return kk();
  const n = [...Ck(a), ...xk(a), ...Lk(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(jk(lr(a), qk(e))) };
}
const Dk = "Mark accepted.", Ok = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Hk = new Set(Zt.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function Fk(e) {
  return e !== void 0 && (Ok.test(e) || Hk.has(e)) ? e : void 0;
}
function Wk({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: te.preview, style: { "--mark": Fk(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: te.empty }) });
}
function zk(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function Kk(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Gk({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("p", { className: te.accepted, children: Dk }) }) : /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: te.reason, children: a }, a)) }) });
}
function Uk({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(Gk, { result: e }) : /* @__PURE__ */ t("p", { className: `${te.result} ${zk(e, n)}`, role: "status", children: Kk(e, n) });
}
function zt(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function YR({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: o }) {
  const i = f(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const m = a(u);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ l("div", { className: te.upload, children: [
    /* @__PURE__ */ t(Wk, { current: e }),
    /* @__PURE__ */ l("div", { className: te.actions, children: [
      /* @__PURE__ */ t(
        "input",
        {
          ref: i,
          className: te.input,
          type: "file",
          accept: "image/svg+xml",
          "aria-label": "Mark file",
          disabled: o !== void 0,
          onChange: (u) => {
            var m;
            return d((m = u.target.files) == null ? void 0 : m[0]);
          }
        }
      ),
      /* @__PURE__ */ t(b, { ...zt(o), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(b, { ...zt(o), variant: "ghost", onClick: n, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(Uk, { result: s, presentation: r })
  ] });
}
const Vk = "_row_o3t6y_7", Yk = "_cell_o3t6y_11", Jk = "_head_o3t6y_28", Xk = "_name_o3t6y_34", Qk = "_pinned_o3t6y_42", Zk = "_headCell_o3t6y_49", e1 = "_webName_o3t6y_88", a1 = "_webMeta_o3t6y_95", t1 = "_webWarn_o3t6y_103", P = {
  row: Vk,
  cell: Yk,
  head: Jk,
  name: Xk,
  pinned: Qk,
  headCell: Zk,
  webName: e1,
  webMeta: a1,
  webWarn: t1
}, wt = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, ir = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], n1 = Object.fromEntries(ir.map((e) => [e.key, e]));
function r1(e, a) {
  return `mcp.${e}.${a}`;
}
function o1(e) {
  return Object.keys(wt).includes(e);
}
function l1(e) {
  return wt[e !== void 0 && o1(e) ? e : "unknown"];
}
function ra({ column: e, children: a }) {
  const n = n1[e];
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
function JR() {
  return /* @__PURE__ */ t("tr", { children: ir.map((e) => /* @__PURE__ */ t(
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
function i1({ server: e }) {
  const a = wt[e.connection];
  return /* @__PURE__ */ l("tr", { className: P.row, children: [
    /* @__PURE__ */ l(ra, { column: "name", children: [
      /* @__PURE__ */ l("span", { className: P.head, children: [
        /* @__PURE__ */ t("span", { className: P.name, children: e.name }),
        /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: mt(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ l("span", { className: P.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(ra, { column: "connection", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(ra, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(ra, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(ra, { column: "tools", children: e.tools.map((n) => r1(e.name, n)).join(" · ") })
  ] });
}
function s1(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function c1(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function d1({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${P.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: e });
}
function u1({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function m1({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function h1({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: P.row, children: [
    /* @__PURE__ */ l("td", { className: P.cell, children: [
      /* @__PURE__ */ t("span", { className: `${P.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: s1(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...c1(e) }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(d1, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...l1(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: P.cell, children: [
      /* @__PURE__ */ t(u1, { server: e, onRestart: a }),
      /* @__PURE__ */ t(m1, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function XR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(h1, { ...e }) : /* @__PURE__ */ t(i1, { ...e });
}
const w1 = "_row_1ibo7_2", f1 = "_headCell_1ibo7_14", _1 = "_cell_1ibo7_15", v1 = "_name_1ibo7_26", b1 = "_consequence_1ibo7_32", p1 = "_reason_1ibo7_38", g1 = "_value_1ibo7_44", y1 = "_webRow_1ibo7_60", N1 = "_webSetting_1ibo7_73", k1 = "_webName_1ibo7_81", $1 = "_webConsequence_1ibo7_89", C1 = "_webControl_1ibo7_95", S1 = "_webState_1ibo7_109", R1 = "_webChip_1ibo7_114", I = {
  row: w1,
  headCell: f1,
  cell: _1,
  name: v1,
  consequence: b1,
  reason: p1,
  value: g1,
  webRow: y1,
  webSetting: N1,
  webName: k1,
  webConsequence: $1,
  webControl: C1,
  webState: S1,
  webChip: R1
}, sr = 104, cr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function T1({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Ge, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t($n, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function x1({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = N(), i = cr[n], s = n === "locked";
  return /* @__PURE__ */ l("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: o, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(T1, { control: a, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: sr }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function dr(e, a) {
  return String(e ?? a);
}
function L1(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function A1(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? dr(e.value, "—");
}
function E1({ control: e, name: a, locked: n, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(Ge, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function I1(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(E1, { ...e });
  const o = L1(a, n);
  return o !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t($n, { options: o, value: dr(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: A1(a) });
}
function M1({ setting: e, control: a, inheritance: n, reason: r, onChange: o, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ l("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ l("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(I1, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: sr }, children: /* @__PURE__ */ t(h, { ...cr[n], size: "tag" }) })
  ] });
}
function QR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(M1, { ...e }) : /* @__PURE__ */ t(x1, { ...e });
}
const q1 = "_label_h9m4w_7", B1 = "_name_h9m4w_15", P1 = "_column_h9m4w_24", j1 = "_webFrame_h9m4w_57", D1 = "_webHead_h9m4w_62", O1 = "_webHeadLabel_h9m4w_74", H1 = "_webLabel_h9m4w_117", F1 = "_webColumns_h9m4w_124", W1 = "_webGroup_h9m4w_130", z1 = "_webPeople_h9m4w_131", K1 = "_webVia_h9m4w_132", G1 = "_webMeta_h9m4w_161", W = {
  label: q1,
  name: B1,
  column: P1,
  webFrame: j1,
  webHead: D1,
  webHeadLabel: O1,
  webLabel: H1,
  webColumns: F1,
  webGroup: W1,
  webPeople: z1,
  webVia: K1,
  webMeta: G1
}, U1 = {
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
      className: W.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function V1(e) {
  if (!e.matrixRole) return;
  const a = U1[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Y1({ node: e }) {
  const a = V1(e);
  return /* @__PURE__ */ l("span", { className: W.label, children: [
    /* @__PURE__ */ t("span", { className: W.name, children: e.name }),
    /* @__PURE__ */ t(J1, { role: a, node: e }),
    /* @__PURE__ */ t(Ga, { column: Ka[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Ga, { column: Ka[1], children: e.people === void 0 ? "" : ee(e.people) }),
    /* @__PURE__ */ t(Ga, { column: Ka[2], children: e.requestedVia ?? "" })
  ] });
}
function J1({ role: e, node: a }) {
  return /* @__PURE__ */ l(T, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function X1({ index: e, depth: a, node: n, expanded: r, leaf: o, onToggle: i, children: s }) {
  return /* @__PURE__ */ t(
    xn,
    {
      index: e,
      depth: a,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ t(Y1, { node: n }),
      children: s
    }
  );
}
function Ua({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function Q1({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${W.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ua, { className: `${W.webMeta} ${W.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ua, { className: `${W.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ua, { className: `${W.webMeta} ${W.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Z1() {
  return /* @__PURE__ */ l("div", { className: W.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: W.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: W.webColumns, children: [
      /* @__PURE__ */ t("span", { className: W.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: W.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: W.webVia, children: "Requested via" })
    ] })
  ] });
}
function e$({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${W.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function a$(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function t$({ rows: e, label: a }) {
  return /* @__PURE__ */ l("div", { className: W.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(Z1, {}),
    /* @__PURE__ */ t(jm, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      xn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(e$, { row: n }),
        detail: /* @__PURE__ */ t(Q1, { row: n }),
        expanded: a$(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function ZR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(t$, { ...e }) : /* @__PURE__ */ t(X1, { ...e });
}
const n$ = "_runbook_b9agc_2", r$ = "_list_b9agc_7", o$ = "_step_b9agc_15", l$ = "_numeral_b9agc_21", i$ = "_body_b9agc_28", s$ = "_head_b9agc_34", c$ = "_title_b9agc_40", d$ = "_detail_b9agc_45", u$ = "_actions_b9agc_50", m$ = "_webList_b9agc_56", h$ = "_webStep_b9agc_60", w$ = "_webBody_b9agc_66", f$ = "_webTitle_b9agc_74", _$ = "_webDetail_b9agc_78", A = {
  runbook: n$,
  list: r$,
  step: o$,
  numeral: l$,
  body: i$,
  head: s$,
  title: c$,
  detail: d$,
  actions: u$,
  webList: m$,
  webStep: h$,
  webBody: w$,
  webTitle: f$,
  webDetail: _$
}, ur = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function mr(e) {
  return String(e + 1).padStart(2, "0");
}
function v$({ step: e, index: a, connection: n }) {
  const r = ur[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: A.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: A.numeral, children: mr(a) }),
    /* @__PURE__ */ l("span", { className: A.body, children: [
      /* @__PURE__ */ l("span", { className: A.head, children: [
        /* @__PURE__ */ t("span", { className: A.title, children: e.title }),
        /* @__PURE__ */ t(h, { role: r.role, label: r.label }),
        o && e.startedAt && /* @__PURE__ */ t(xe, { startedAt: e.startedAt, connection: n })
      ] }),
      /* @__PURE__ */ t("span", { className: A.detail, children: e.detail })
    ] })
  ] });
}
function b$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ l("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: A.list, children: e.map((r, o) => /* @__PURE__ */ t(v$, { step: r, index: o, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: A.actions, children: a })
  ] });
}
function p$({ step: e, index: a, connection: n }) {
  return /* @__PURE__ */ l("li", { className: `${A.step} ${A.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${A.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: mr(a) }),
    /* @__PURE__ */ l("span", { className: `${A.body} ${A.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${A.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${A.title} ${A.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(h, { ...ur[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t(xe, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${A.detail} ${A.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function g$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ l("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${A.list} ${A.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ t(p$, { step: r, index: o, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${A.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function e2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(g$, { ...e }) : /* @__PURE__ */ t(b$, { ...e });
}
const y$ = "_list_1gu6a_2", N$ = "_check_1gu6a_10", k$ = "_body_1gu6a_16", $$ = "_text_1gu6a_23", C$ = "_pending_1gu6a_32", S$ = "_measured_1gu6a_37", Qe = {
  list: y$,
  check: N$,
  body: k$,
  text: $$,
  pending: C$,
  measured: S$
};
function R$(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function T$({ check: e }) {
  const a = R$(e.passed);
  return /* @__PURE__ */ l("li", { className: `${Qe.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ t(lt, { state: a.state, label: a.label }),
    /* @__PURE__ */ l("span", { className: Qe.body, children: [
      /* @__PURE__ */ t("span", { className: Qe.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ l("span", { className: Qe.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ t("span", { className: Qe.measured, children: e.measured })
  ] });
}
function a2({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(T$, { check: a }, a.text)) });
}
const x$ = "_root_4aacj_2", L$ = "_list_4aacj_10", A$ = "_line_4aacj_26", E$ = "_at_4aacj_53", I$ = "_text_4aacj_57", M$ = "_foot_4aacj_61", q$ = "_idle_4aacj_73", B$ = "_caret_4aacj_81", P$ = "_jump_4aacj_88", he = {
  root: x$,
  list: L$,
  line: A$,
  at: E$,
  text: I$,
  foot: M$,
  idle: q$,
  caret: B$,
  jump: P$
}, j$ = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function ft(e) {
  return Number.isNaN(Date.parse(e)) ? "" : j$.format(new Date(e));
}
const D$ = { warn: "warning", ok: "ok" };
function O$({ kind: e }) {
  const a = D$[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function H$({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${ft(e)}` });
}
function F$({ connection: e, idleSince: a, last: n, children: r }) {
  const o = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${ft(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: he.idle, children: i }),
    /* @__PURE__ */ t(H$, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const W$ = 8;
function z$(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > W$;
}
function K$({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const hr = Te(null);
function t2({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, o] = p(!1), i = Yt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(hr.Provider, { value: i, children: n });
}
function G$() {
  const e = Re(hr), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function n2({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const o = f(null), [i, s] = p(0), [c, d] = G$(), [u, m] = p(!1), _ = e.at(-1);
  S(() => {
    s(e.length);
  }, [e.length]), aa(() => {
    const y = o.current;
    y && !u && (y.scrollTop = y.scrollHeight);
  }, [e.length, u]);
  const w = () => {
    var B;
    const y = o.current;
    if (!y) return;
    const L = y.querySelectorAll("[data-consline-text]");
    (B = L.item(L.length - 1)) == null || B.focus(), m(!1);
  };
  return /* @__PURE__ */ l("div", { className: he.root, children: [
    /* @__PURE__ */ t("ol", { className: he.list, ref: o, "aria-live": c ? "polite" : "off", "aria-label": r, "data-empty": e.length === 0 || void 0, onScroll: (y) => m(z$(y.currentTarget)), children: e.map((y, L) => /* @__PURE__ */ l("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": L < i, children: [
      /* @__PURE__ */ t("span", { className: he.at, children: ft(y.at) }),
      /* @__PURE__ */ t(O$, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${L}`)) }),
    /* @__PURE__ */ l(F$, { connection: a, idleSince: n, last: _, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t(K$, { shown: u, onJump: w })
    ] })
  ] });
}
const U$ = "_row_1k8wl_2", V$ = "_head_1k8wl_14", Y$ = "_author_1k8wl_20", J$ = "_eta_1k8wl_25", X$ = "_edited_1k8wl_26", Q$ = "_body_1k8wl_32", Z$ = "_reason_1k8wl_37", e0 = "_actions_1k8wl_42", Ne = {
  row: U$,
  head: V$,
  author: Y$,
  eta: J$,
  edited: X$,
  body: Q$,
  reason: Z$,
  actions: e0
}, a0 = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function t0(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function n0({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", onClick: n, children: "Edit" }),
    /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", onClick: n, children: "Edit" }),
    /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function r0({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: Ne.reason, id: a, children: e })
  ] });
}
function o0(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function l0(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(n0, { ...e }) : /* @__PURE__ */ t(r0, { reason: e.unavailable, reasonId: e.unavailableId });
}
function r2(e) {
  const { comment: a } = e;
  o0(e);
  const n = N(), r = `${n}-unavailable`, o = a0[a.delivery];
  return /* @__PURE__ */ l("div", { className: `${Ne.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: Ne.head, children: [
      /* @__PURE__ */ t("span", { className: Ne.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: o.role, label: o.label }),
      /* @__PURE__ */ t("span", { className: Ne.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: Ne.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: Ne.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: Ne.reason, id: n, children: t0(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: Ne.actions, children: /* @__PURE__ */ t(l0, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const i0 = "_root_rvhdw_2", s0 = "_attach_rvhdw_11", c0 = "_actions_rvhdw_17", d0 = "_reply_rvhdw_23", u0 = "_replyField_rvhdw_28", m0 = "_send_rvhdw_54", h0 = "_sendIcon_rvhdw_65", w0 = "_sendsAs_rvhdw_75", Be = {
  root: i0,
  attach: s0,
  actions: c0,
  reply: d0,
  replyField: u0,
  send: m0,
  sendIcon: h0,
  sendsAs: w0
};
function wr({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function f0() {
  return /* @__PURE__ */ t("svg", { className: Be.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function _0(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function v0(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [o, i] = wr(e), s = N(), c = () => {
    o.trim() !== "" && r(n, o);
  }, d = (u) => {
    _0(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ l("div", { className: Be.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: Be.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ t(M, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: a, label: a, value: o, onChange: i, describedBy: s }),
      /* @__PURE__ */ l(b, { variant: "primary", className: Be.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ t(f0, {}),
        /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: Be.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function o2(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(v0, { ...e }) : /* @__PURE__ */ t(b0, { ...e });
}
function b0(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: o, onPost: i, onDraft: s } = e, [c, d] = wr(e);
  return /* @__PURE__ */ l("div", { className: Be.root, children: [
    /* @__PURE__ */ t(M, { kind: "textarea", label: a, value: c, onChange: d }),
    r && /* @__PURE__ */ l("div", { className: Be.attach, children: [
      /* @__PURE__ */ t(h, { role: "soft", label: r.label }),
      /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    o && /* @__PURE__ */ t(
      on,
      {
        label: `Requeue ${o.agent} after posting`,
        consequence: o.consequence,
        checked: o.checked,
        onChange: o.onChange
      }
    ),
    /* @__PURE__ */ l("div", { className: Be.actions, children: [
      /* @__PURE__ */ t(b, { variant: "primary", onClick: () => i(n, c), children: `Post as ${n}` }),
      s && /* @__PURE__ */ t(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const p0 = "_list_1yhks_2", g0 = "_item_1yhks_6", y0 = "_body_1yhks_22", N0 = "_text_1yhks_28", k0 = "_evidence_1yhks_37", $0 = "_consequence_1yhks_49", C0 = "_note_1yhks_54", ze = {
  list: p0,
  item: g0,
  body: y0,
  text: N0,
  evidence: k0,
  consequence: $0,
  note: C0
};
function S0({ criterion: e }) {
  return /* @__PURE__ */ t(je, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Kt({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function R0(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function T0({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: ze.body, children: [
    /* @__PURE__ */ t("span", { className: ze.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(T, { children: [
      /* @__PURE__ */ t(Kt, { text: " · " }),
      /* @__PURE__ */ t("code", { className: ze.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(T, { children: [
      /* @__PURE__ */ t(Kt, { text: " · " }),
      /* @__PURE__ */ t("span", { className: ze.consequence, children: R0(e.why) })
    ] })
  ] });
}
function x0({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: ze.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(S0, { criterion: e }),
    /* @__PURE__ */ t(T0, { criterion: e })
  ] });
}
function l2({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${ze.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(x0, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: ze.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const L0 = "_list_dwhoz_2", A0 = "_rung_dwhoz_6", E0 = "_name_dwhoz_18", I0 = "_actor_dwhoz_32", ga = {
  list: L0,
  rung: A0,
  name: E0,
  actor: I0
}, M0 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function q0({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = M0[e.state];
  return /* @__PURE__ */ l("li", { className: ga.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ga.name, children: e.name }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ga.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function i2({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ga.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(q0, { rung: a }, a.name)) });
}
const B0 = "_sheet_pw37w_2", P0 = "_title_pw37w_9", j0 = "_stage_pw37w_15", D0 = "_effects_pw37w_20", O0 = "_effect_pw37w_20", H0 = "_numeral_pw37w_31", F0 = "_effectText_pw37w_38", W0 = "_refusals_pw37w_43", z0 = "_reasons_pw37w_52", K0 = "_reason_pw37w_52", G0 = "_actions_pw37w_62", ue = {
  sheet: B0,
  title: P0,
  stage: j0,
  effects: D0,
  effect: O0,
  numeral: H0,
  effectText: F0,
  refusals: W0,
  reasons: z0,
  reason: K0,
  actions: G0
};
function U0({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function s2({ run: e, effects: a, refusals: n, cost: r, onRequeue: o, onClose: i, returnFocusTo: s }) {
  const c = N(), d = `${c}-refusal`, [u, m] = p(""), _ = n.length > 0;
  return /* @__PURE__ */ t(na, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ l("div", { className: ue.sheet, children: [
    /* @__PURE__ */ l("h2", { className: ue.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ t("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ t("ol", { className: ue.effects, children: a.map((w, y) => /* @__PURE__ */ l("li", { className: ue.effect, children: [
      /* @__PURE__ */ t("span", { className: ue.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: ue.effectText, children: w })
    ] }, w)) }),
    /* @__PURE__ */ t(
      yu,
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
    _ && /* @__PURE__ */ l("div", { className: ue.refusals, children: [
      /* @__PURE__ */ t(h, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ t("ul", { className: ue.reasons, children: n.map((w, y) => /* @__PURE__ */ t("li", { className: ue.reason, id: y === 0 ? d : void 0, children: w.reason }, w.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: ue.actions, children: [
      /* @__PURE__ */ t(U0, { refused: _, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ t(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const V0 = "_list_1rowi_2", Y0 = "_path_1rowi_7", J0 = "_head_1rowi_21", X0 = "_label_1rowi_28", Q0 = "_consequence_1rowi_35", Z0 = "_ask_1rowi_36", ea = {
  list: V0,
  path: Y0,
  head: J0,
  label: X0,
  consequence: Q0,
  ask: Z0
}, Za = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Gt(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Ut(e) {
  return e ? "primary" : "secondary";
}
function eC({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(b, { variant: Ut(a), size: "sm", onClick: () => n(e.kind), children: Za[e.kind] }) : /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t(b, { variant: Ut(a), size: "sm", disabled: !0, describedBy: r, children: Za[e.kind] }),
    /* @__PURE__ */ t("span", { className: ea.ask, id: r, children: e.askInstead })
  ] });
}
function aC({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: ea.path, "data-allowed": e.allowed, "data-role": Gt(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: ea.head, children: [
      /* @__PURE__ */ t("span", { className: ea.label, children: e.title ?? Za[e.kind] }),
      /* @__PURE__ */ t(h, { role: Gt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: ea.consequence, children: e.consequence }),
    /* @__PURE__ */ t(eC, { path: e, primary: a, onChoose: n })
  ] });
}
function c2({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: ea.list, children: e.map((n, r) => /* @__PURE__ */ t(aC, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const tC = "_list_1m7i0_2", nC = "_item_1m7i0_6", rC = "_node_1m7i0_18", oC = "_body_1m7i0_24", lC = "_head_1m7i0_30", iC = "_stage_1m7i0_36", sC = "_version_1m7i0_41", cC = "_sentence_1m7i0_49", dC = "_meta_1m7i0_54", $e = {
  list: tC,
  item: nC,
  node: rC,
  body: oC,
  head: lC,
  stage: iC,
  version: sC,
  sentence: cC,
  meta: dC
}, uC = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function mC({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: $e.head, children: [
    /* @__PURE__ */ t("span", { className: $e.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: $e.version, title: e.version, children: e.version }) : null
  ] });
}
function hC({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${$e.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${$e.node} ward-history-node`, children: /* @__PURE__ */ t(je, { size: 9, kind: uC[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${$e.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(mC, { entry: e }),
      /* @__PURE__ */ t("span", { className: $e.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${$e.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ne(e.cost)}`
      ] })
    ] })
  ] });
}
function d2({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${$e.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(hC, { entry: a }, a.stage + String(n))) });
}
const wC = "_thread_1e70p_3", fC = "_turn_1e70p_8", _C = "_who_1e70p_27", vC = "_body_1e70p_32", ya = {
  thread: wC,
  turn: fC,
  who: _C,
  body: vC
}, fr = Te(!1);
function u2({ children: e, density: a }) {
  return /* @__PURE__ */ t(fr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${ya.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function m2({ turn: e }) {
  if (!Re(fr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${ya.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${ya.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${ya.body} ward-chat-body`, children: e.body })
  ] });
}
const bC = "_list_yiolt_3", pC = "_row_yiolt_7", gC = "_label_yiolt_20", yC = "_n_yiolt_26", NC = "_cause_yiolt_33", la = {
  list: bC,
  row: pC,
  label: gC,
  n: yC,
  cause: NC
};
function kC(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const $C = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function CC({ row: e, formatNumber: a }) {
  return kC(e), /* @__PURE__ */ l("li", { className: `${la.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(je, { size: 8, ...$C[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: la.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${la.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(SC, { cause: e.cause })
  ] });
}
function SC({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${la.cause} ward-healthrow-cause`, children: e }) : null;
}
function h2({ rows: e, formatNumber: a = ee }) {
  return /* @__PURE__ */ t("ul", { className: `${la.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(CC, { row: n, formatNumber: a }, n.label)) });
}
const RC = "_root_1jxwp_2", TC = {
  root: RC
};
function w2({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: TC.root, "data-density": o, children: [
    /* @__PURE__ */ t(Da, { items: e, note: a, density: o }),
    /* @__PURE__ */ t(b, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const xC = "_row_dhbre_3", LC = "_key_dhbre_13", AC = "_stack_dhbre_24", EC = "_value_dhbre_32", IC = "_evidence_dhbre_39", MC = "_mark_dhbre_47", Xe = {
  row: xC,
  key: LC,
  stack: AC,
  value: EC,
  evidence: IC,
  mark: MC
};
function qC({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(lt, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function f2({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(qC, { state: e.state }) })
  ] });
}
const BC = "_cell_gh2sd_2", PC = {
  cell: BC
}, jC = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function DC(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function OC(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function HC(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: DC(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function FC(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function _2({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  OC(e, n);
  const r = FC(e);
  return /* @__PURE__ */ t(
    qu,
    {
      label: "Rejection routing",
      columns: jC,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ t("span", { className: PC.cell, "data-norerun": o.noRerun ? !0 : void 0, children: HC(o, i) }),
      empty: a ?? /* @__PURE__ */ t(Nh, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const WC = "_row_1f2re_2", zC = "_title_1f2re_12", KC = "_turns_1f2re_18", GC = "_waiting_1f2re_19", UC = "_resolved_1f2re_20", VC = "_activity_1f2re_21", YC = "_cost_1f2re_28", JC = "_link_1f2re_29", XC = "_tableLink_1f2re_47", QC = "_tableRecord_1f2re_48", ZC = "_tableRow_1f2re_59", eS = "_tableTitle_1f2re_71", aS = "_tableResolved_1f2re_76", tS = "_tableMeta_1f2re_87", nS = "_tableCost_1f2re_94", rS = "_tableActivity_1f2re_95", oS = "_tableState_1f2re_105", D = {
  row: WC,
  title: zC,
  turns: KC,
  waiting: GC,
  resolved: UC,
  activity: VC,
  cost: YC,
  link: JC,
  tableLink: XC,
  tableRecord: QC,
  tableRow: ZC,
  tableTitle: eS,
  tableResolved: aS,
  tableMeta: tS,
  tableCost: nS,
  tableActivity: rS,
  tableState: oS
}, _r = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function lS(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function iS(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function sS(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const cS = { duplicate: "Closed · duplicate" };
function dS({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(ta, { className: D.tableMeta, text: `waiting on ${e}` });
}
function uS({ value: e }) {
  return /* @__PURE__ */ t("td", { className: D.tableCost, children: e === void 0 ? null : ne(e) });
}
function mS({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${D.tableRecord} ward-target`, href: H(e.href), children: `→ ${e.key}` });
}
function hS({ session: e, href: a }) {
  const n = _r[e.state];
  return /* @__PURE__ */ l("tr", { className: D.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: D.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${D.tableLink} ward-target`, href: H(a), children: /* @__PURE__ */ t(ta, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: D.tableMeta, children: iS(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: D.tableResolved, children: [
      sS(e.resolved),
      /* @__PURE__ */ t(dS, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(uS, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: D.tableActivity, children: lS(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: D.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: cS[e.state] ?? n.label }),
      /* @__PURE__ */ t(mS, { link: e.link })
    ] }) })
  ] });
}
function wS({ session: e }) {
  const a = _r[e.state];
  return /* @__PURE__ */ l("div", { className: D.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
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
function v2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(hS, { session: e.session, href: e.href }) : /* @__PURE__ */ t(wS, { session: e.session });
}
const fS = "_block_1yy2v_3", _S = "_list_1yy2v_9", vS = "_line_1yy2v_14", et = {
  block: fS,
  list: _S,
  line: vS
}, bS = { warn: "warning", ok: "ok" };
function pS({ kind: e }) {
  const a = bS[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function gS({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${et.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(pS, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function b2({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${et.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: et.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(gS, { line: n }, `${r}-${n.text}`)) }) });
}
const yS = "_band_tt7hp_1", NS = "_head_tt7hp_8", kS = "_cell_tt7hp_19", $S = "_index_tt7hp_35", CS = "_title_tt7hp_42", SS = "_note_tt7hp_48", RS = "_cellTitle_tt7hp_53", TS = "_cellBody_tt7hp_58", xS = "_tag_tt7hp_64", ye = {
  band: yS,
  head: NS,
  cell: kS,
  index: $S,
  title: CS,
  note: SS,
  cellTitle: RS,
  cellBody: TS,
  tag: xS
}, Vt = 4;
function p2({ index: e, title: a, note: n, cells: r }) {
  if (r.length !== Vt)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Vt}-cell grid`);
  return /* @__PURE__ */ l("section", { className: ye.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ l("div", { className: ye.head, children: [
      /* @__PURE__ */ t("span", { className: ye.index, children: e }),
      /* @__PURE__ */ t("span", { className: ye.title, children: a }),
      /* @__PURE__ */ t("span", { className: ye.note, children: n })
    ] }),
    r.map((o) => /* @__PURE__ */ l("div", { className: ye.cell, children: [
      /* @__PURE__ */ t("span", { className: ye.cellTitle, children: o.title }),
      /* @__PURE__ */ t("span", { className: ye.cellBody, children: o.body }),
      o.tag !== void 0 && /* @__PURE__ */ t("span", { className: ye.tag, children: o.tag })
    ] }, o.title))
  ] });
}
export {
  OS as ACCENT_PRESETS,
  oR as ActionStack,
  n2 as ActivityConsole,
  VS as AdminIcon,
  j_ as AgentCard,
  YS as AppShell,
  HR as AppearanceStrip,
  p2 as Band,
  tR as BarChart,
  tw as BoardColumn,
  gR as BoardFootnote,
  yR as BoardHeader,
  GS as BoardIcon,
  mR as BoardScroller,
  b as Btn,
  DS as CHIP_ROLES,
  ar as CREDENTIAL_COLUMNS,
  aR as Callout,
  FR as CapabilityRow,
  m2 as ChatMessage,
  on as Checkbox,
  h as Chip,
  ta as ClampText,
  r2 as ClarificationRow,
  AR as ClauseRuleRow,
  LR as ClauseRules,
  qn as ColourLadder,
  WR as ComponentRow,
  o2 as Composer,
  kR as ConfigRow,
  NR as ConfigRowHead,
  it as ConnectionMark,
  t2 as ConsoleAnnounceProvider,
  u2 as Conversation,
  yu as CostMeter,
  KR as CredentialRow,
  zR as CredentialRowHead,
  l2 as CriteriaList,
  Ii as Crumb,
  HS as DENSITIES,
  h2 as DeliveryHealth,
  fR as DeniedState,
  zS as DisabledScope,
  IR as DryRunRail,
  Nh as EmptyState,
  GR as EnvCard,
  M as Field,
  wR as FilteredEmpty,
  dR as FormStack,
  Da as GateChecklist,
  i2 as GateLadder,
  qu as Grid,
  qR as HandoffRuleRow,
  MR as HandoffRules,
  KS as HomeIcon,
  $R as ItemDrawer,
  UR as KeyPanel,
  jr as LIVE_EVENT_TYPES,
  l_ as LegacyBoardColumn,
  SR as LegacyBoardHeader,
  RR as LegacyConfigRow,
  xR as LegacyItemDrawer,
  Zf as LegacyOverCapNote,
  TR as LegacyPreviewRail,
  En as LegacyWorkCard,
  xe as LiveIndicator,
  _R as LoadFailed,
  pR as Loading,
  ir as MCP_SERVER_COLUMNS,
  lt as Mark,
  YR as MarkUpload,
  je as Marker,
  XR as McpServerRow,
  JR as McpServerRowHead,
  Qs as Menu,
  Ds as MenuButton,
  BR as NewStreamModal,
  Ch as OverCapNote,
  Ma as OverflowRow,
  na as Overlay,
  ER as PARTIAL_STEP_REASON,
  sr as POLICY_CHIP_WIDTH,
  iR as PageFrame,
  eR as PageHeader,
  nR as PlainList,
  QR as PolicyRow,
  CR as PreviewRail,
  Ka as ROLE_MATRIX_COLUMNS,
  Un as RULE_ACTIONS,
  Sn as Radio,
  w2 as ReadyChecklist,
  cR as RecordSection,
  s2 as RequeueSheet,
  c2 as ResolveBlock,
  f2 as ResolvedFieldRow,
  ZR as RoleMatrixRow,
  _2 as RoutingTable,
  PR as RuleRow,
  e2 as RunbookSteps,
  Pr as STREAM_STEPS,
  uR as SectionBand,
  Et as SectionHeader,
  $n as SegmentedControl,
  wn as Select,
  v2 as SessionRow,
  QS as Sidebar,
  jR as StageColumn,
  hR as StageGrid,
  d2 as StageHistory,
  pp as StageListEditor,
  vR as StaleStrip,
  Ba as StatStrip,
  ZS as StreamAvatar,
  DR as StreamRow,
  US as StudioIcon,
  sR as SubjectRail,
  Ge as Switch,
  XS as TabLinks,
  rR as TableHead,
  JS as Tabs,
  qS as ThemeProvider,
  OR as ToolRow,
  lR as TopBar,
  jm as Tree,
  xn as TreeRow,
  b2 as TypedInputBlock,
  $l as UNSAFE_HREF,
  a2 as ValidationList,
  IS as VisibilityProvider,
  MS as Visible,
  jS as WARD_VERSION,
  ja as WorkCard,
  bR as WriteUnavailableStrip,
  lS as agoSince,
  $r as clock,
  Bp as colourStatus,
  ee as count,
  ce as duration,
  at as elapsed,
  PS as eventSourceTransport,
  Aa as isStreamStep,
  sa as isValidatedStreamStep,
  wv as ladderValidation,
  l1 as mcpConnectionChip,
  r1 as mcpToolName,
  ne as money,
  we as ms,
  Ln as ordered,
  Xt as ratio,
  SN as restartLabel,
  H as safeHref,
  de as stamp,
  tt as stream,
  FS as streamChip,
  qa as streamChipProps,
  pe as streamColour,
  Hr as streamHex,
  rd as streamInitials,
  Dr as streamVars,
  va as useBorderFlash,
  Le as useDisabledScope,
  Mr as useFocusTrap,
  WS as useLiveFeed,
  BS as useReturnFocus,
  La as useRovingTabindex,
  nt as useTicker,
  Cr as useVisible,
  z as v,
  VR as validateMark,
  ua as validatedStep,
  Zt as validatedStreamSteps
};
