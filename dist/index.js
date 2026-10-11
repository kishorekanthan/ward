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
function ES({ hidden: e, children: a }) {
  const n = Yt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Qt.Provider, { value: n, children: a });
}
function Cr(e) {
  return !Re(Qt).has(e);
}
function IS({ id: e, children: a, fallback: n = null }) {
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
function MS({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
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
function qS(e, a = !0) {
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
const BS = (e, a, n) => {
  const r = new EventSource(e), o = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, PS = "0.2.0", jS = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Pr = [1, 2, 3, 4, 5, 6], Zt = [1, 2, 3], jr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], DS = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], OS = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], z = {
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
function HS(e) {
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
function FS(e, a) {
  const [n, r] = p("reconnecting"), [o, i] = p(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), m = f(null), _ = f(0), w = f(0), y = f(!1), L = f("reconnecting"), q = X((R) => {
    L.current = R, r(R);
  }, []), oe = X(() => {
    c.current = Date.now();
  }, []), Le = X((R) => {
    for (const [G, ge] of s.current)
      (ge === "*" || R.itemKey === ge) && G(R);
  }, []), ae = X(() => {
    m.current = a(e, { lastEventId: d.current }, {
      onEvent: (R, G, ge) => {
        const De = Kr(R, G, ge);
        De !== null && (De.id && (d.current = De.id), oe(), y.current = !1, q("live"), i(De.at), Le(De));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, oe(), q("live");
      },
      onError: () => {
        var G;
        (G = m.current) == null || G.close(), m.current = null, y.current = !0, L.current !== "stale" && q("reconnecting");
        const R = Math.min(we.reconnectBase * 2 ** u.current, we.reconnectMax);
        u.current += 1, _.current = window.setTimeout(ae, R);
      }
    });
  }, [Le, q, oe, a, e]), Ue = X((R) => {
    y.current = !0, R.close(), m.current = null, _.current = window.setTimeout(ae, we.reconnectBase);
  }, [ae]), Ve = X((R, G) => (s.current.set(G, R), () => {
    s.current.delete(G);
  }), []);
  return S(() => (ae(), w.current = window.setInterval(() => {
    const R = Date.now() - c.current, G = Gr(R, L.current);
    G && q(G);
    const ge = m.current;
    Ur(R, y.current, ge) && Ue(ge);
  }, we.tick), () => {
    var R;
    window.clearInterval(w.current), window.clearTimeout(_.current), y.current = !1, (R = m.current) == null || R.close(), m.current = null;
  }), [ae, Ue, q]), { connection: n, lastEventAt: o, subscribe: Ve };
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
function WS({ reason: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ l("fieldset", { disabled: !0, className: `${Ao.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ t(en.Provider, { value: { reason: e, reasonId: n }, children: a })
  ] });
}
function Pe() {
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
  const a = Pe();
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
function Vo(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (rt = "key");
}
typeof document < "u" && (document.addEventListener("keydown", Vo, !0), document.addEventListener("pointerdown", () => {
  rt = "pointer";
}, !0));
function Yo() {
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
const Jo = "_scrim_1cawq_2", Xo = "_drawer_1cawq_10", Qo = "_sheet_1cawq_14", Zo = "_modal_1cawq_18", el = "_panel_1cawq_23", al = "_start_1cawq_44", tl = "_header_1cawq_67", nl = "_title_1cawq_75", rl = "_body_1cawq_79", ol = "_close_1cawq_106", Ce = {
  scrim: Jo,
  drawer: Xo,
  sheet: Qo,
  modal: Zo,
  panel: el,
  start: al,
  header: tl,
  title: nl,
  body: rl,
  close: ol
}, ll = Te(null), Na = [], ka = /* @__PURE__ */ new Map();
function il(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function sl(e, a) {
  let n = ka.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ka.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function cl(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !il(r) && sl(e, r);
}
function dl(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (cl(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function ul(e) {
  for (const a of e.claims) {
    const n = ka.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), ka.delete(a)));
  }
}
function ml(e, a) {
  const n = { root: e, claims: [] };
  return Na.push(n), dl(n, a), n;
}
function hl(e) {
  const a = Na.indexOf(e);
  a >= 0 && Na.splice(a, 1), ul(e);
}
function Nt(e) {
  return e !== null && Na.at(-1) === e;
}
function wl(e, a, n) {
  const r = f(null), o = f(n);
  return o.current = n, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = ml(i, a);
    return r.current = c, () => {
      var u, m;
      const d = Nt(c);
      hl(c), r.current = null, d && ((m = (u = o.current ?? s) == null ? void 0 : u.focus) == null || m.call(u));
    };
  }, [a]), X(() => Nt(r.current), []);
}
function fl(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function _l(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function vl({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t("header", { className: `${Ce.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Ce.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function bl(e) {
  return `${Ce.scrim} ${Ce[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function pl(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ce.panel} ${Ce[e]} ward-overlay-panel${n}${r}`;
}
function gl(e) {
  const a = Re(ll);
  return e ?? a ?? document.body;
}
function na(e) {
  const a = f(null), n = f(null), r = N(), o = gl(e.container), i = Ia("(min-width: 768px)"), s = fl(e.kind, i), c = _l(e, r), d = Mr(n), [u] = p(Yo), m = wl(a, o, e.returnFocusTo), _ = X(() => {
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
        className: bl(s),
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
            className: pl(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (w) => w.stopPropagation(),
            onKeyDown: (w) => m() && d.onKeyDown(w),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Ce.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: _, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(vl, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const yl = /^([a-z][a-z0-9+.-]*):/i, Nl = /* @__PURE__ */ new Set(["http", "https"]), kl = "#";
function $l(e) {
  var r, o;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (o = (r = yl.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : o.toLowerCase();
}
function H(e) {
  const a = $l(e);
  return a === void 0 || Nl.has(a) ? e : kl;
}
function Cl(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function an(e) {
  const a = Cl(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function Sl(e, a) {
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
function Rl(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, o = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : o > e.clientWidth - n ? e.scrollLeft + o - e.clientWidth + n : null;
}
function tn(e, a, n) {
  aa(() => {
    const r = e.current, o = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !o) return;
    const i = Rl(r, o);
    i !== null && (r.scrollLeft = Math.max(0, i)), an(r);
  }, [e, a, n]);
}
const Tl = "_row_160e9_2", xl = {
  row: Tl
};
function Ll(e, a) {
  return e ? { role: a === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Ma({ label: e, children: a, count: n, as: r = "div", focusable: o = !0, rowRef: i, className: s, ...c }) {
  const d = f(null), u = i ?? d;
  return Sl(u, n), /* @__PURE__ */ t(r, { ref: u, className: [xl.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Ll(o, r), ...c, children: a });
}
const Al = "_icon_1ylqy_2", El = {
  icon: Al
};
function da({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: El.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function zS() {
  return /* @__PURE__ */ t(da, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function KS() {
  return /* @__PURE__ */ l(da, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function GS() {
  return /* @__PURE__ */ l(da, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function US() {
  return /* @__PURE__ */ t(da, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Il() {
  return /* @__PURE__ */ l(da, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const nn = "ward:sidebar-collapsed", Ml = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function ql() {
  try {
    return window.localStorage.getItem(nn) === "true";
  } catch {
    return !1;
  }
}
function Bl(e) {
  try {
    window.localStorage.setItem(nn, String(e));
  } catch {
  }
}
function Pl(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function jl(e) {
  return e instanceof Element && e.closest(Ml) !== null;
}
function Dl(e) {
  return e.key === "[" && !Pl(e) && !jl(e.target);
}
function Ol(e) {
  const [a, n] = p(ql), r = () => {
    Bl(!a), n(!a);
  };
  return S(() => {
    if (!e) return;
    const o = (i) => {
      var c;
      if (!Dl(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [e, a]), { collapsed: a, toggle: r };
}
function Hl() {
  const e = Ia("(max-width: 791.98px)"), a = N(), n = f(null), [r, o] = p(!1);
  return r && !e && o(!1), { narrow: e, open: r, drawerId: a, slotRef: n, toggle: () => o(!r), close: () => o(!1) };
}
function Fl({ header: e, label: a, drawer: n }) {
  return n.narrow ? /* @__PURE__ */ l("div", { className: $.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.drawerId, children: a }) }),
    /* @__PURE__ */ t("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function Wl({ sidebar: e, label: a, drawer: n }) {
  var o;
  if (!n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ t(na, { kind: "start", id: n.drawerId, title: a, flush: !0, onClose: n.close, returnFocusTo: (o = n.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ t("div", { className: $.drawerSide, onClick: r, children: rn(e, !1) }) });
}
function zl(e, a, n) {
  const r = n === void 0 && e !== void 0 && !a, { collapsed: o, toggle: i } = Ol(r);
  return n === void 0 ? Kl(r, o, i) : Gl(n, a, i);
}
function Kl(e, a, n) {
  return { enabled: e, collapsed: e && a, rail: e && a, owned: !1, toggle: n };
}
function Gl(e, a, n) {
  return { enabled: !1, collapsed: e && !a, rail: !1, owned: !0, toggle: n };
}
const Ul = (e) => e ? "" : void 0;
function rn(e, a) {
  return typeof e == "function" ? e(a) : e;
}
function Vl({ fold: e }) {
  return e.enabled ? /* @__PURE__ */ t("div", { className: $.sideTop, children: /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(Il, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] }) }) : null;
}
function Yl({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": tt(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Jl({ items: e, label: a }) {
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ l("a", { className: $.railItem, href: H(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(Yl, { item: n }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function Xl({ sidebar: e, label: a, iconRail: n, fold: r }) {
  return /* @__PURE__ */ l("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(Vl, { fold: r }),
    /* @__PURE__ */ t("div", { className: $.sideBody, hidden: r.rail, children: rn(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ t(Jl, { items: n ?? [], label: a })
  ] });
}
function Ql({ sidebar: e, header: a, children: n, rail: r, sidebarLabel: o, iconRail: i, collapsed: s }) {
  const c = r != null, d = Hl(), u = zl(i, d.narrow, s), m = o ?? "Menu";
  return /* @__PURE__ */ l("div", { className: $.app, "data-rail": String(c), "data-collapsed": String(u.collapsed), "data-consumer-fold": Ul(u.owned), children: [
    !d.narrow && /* @__PURE__ */ t(Xl, { sidebar: e, label: m, iconRail: i, fold: u }),
    /* @__PURE__ */ l("main", { className: $.main, children: [
      /* @__PURE__ */ t(Fl, { header: a, label: m, drawer: d }),
      /* @__PURE__ */ t("div", { className: $.page, children: n })
    ] }),
    c && /* @__PURE__ */ t("div", { className: $.rail, children: r }),
    /* @__PURE__ */ t(Wl, { sidebar: e, label: m, drawer: d })
  ] });
}
function Zl({ destinations: e, active: a }) {
  const n = f(null);
  return tn(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t(Ma, { as: "nav", rowRef: n, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ t("a", { href: H(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Va({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function ei({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ l("span", { className: $.metadata, children: [
    /* @__PURE__ */ t(Va, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Va, { value: a, className: $.detail })
  ] });
}
function ai() {
  const e = Ia("(max-width: 767.98px)"), a = N(), n = f(null), [r, o] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function ti({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: $.tools, children: e });
}
function ni({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function ri(e) {
  return /* @__PURE__ */ l("header", { className: $.topbar, children: [
    /* @__PURE__ */ t("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Va, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ t(Zl, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: $.identity, children: /* @__PURE__ */ t(ei, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(ti, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function oi(e) {
  const a = N(), n = ai();
  return /* @__PURE__ */ l("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(ri, { ...e, menu: n }),
    /* @__PURE__ */ t(ni, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: $.content, children: e.children })
  ] });
}
function li(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function VS(e) {
  return li(e) ? /* @__PURE__ */ t(Ql, { ...e }) : /* @__PURE__ */ t(oi, { ...e });
}
const ii = "_root_197jc_2", si = "_row_197jc_8", ci = "_box_197jc_14", di = "_label_197jc_21", ui = "_lockedNote_197jc_26", mi = "_consequence_197jc_34", hi = "_sample_197jc_69", He = {
  root: ii,
  row: si,
  box: ci,
  label: di,
  lockedNote: ui,
  consequence: mi,
  sample: hi
};
function wi(e, a) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || a) };
}
function fi({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${He.consequence} ward-check-consequence`, children: a }) : null;
}
function _i({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${He.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function vi({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: He.sample, "aria-hidden": "true", children: e }) : null;
}
function on(e) {
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = Pe(), o = wi(e, r);
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
        /* @__PURE__ */ t(_i, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(vi, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(fi, { id: n, text: e.consequence })
  ] });
}
const bi = "_chip_pq6tb_2", pi = {
  chip: bi
}, gi = {
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
function yi(e, a) {
  if (e === "stream") return Ni(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = gi[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function Ni(e) {
  if (!e || !sa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = tt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${pi.chip} ward-chip ward-chip--${e}`, style: yi(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const ki = "_clamp_zn74g_3", kt = {
  clamp: ki
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
const $i = "_root_13eei_3", Ci = "_nav_13eei_8", Si = "_list_13eei_16", Ri = "_item_13eei_24", Ti = "_link_13eei_44", xi = "_sep_13eei_54", Li = "_current_13eei_58", Ai = "_chips_13eei_62", Ae = {
  root: $i,
  nav: Ci,
  list: Si,
  item: Ri,
  link: Ti,
  sep: xi,
  current: Li,
  chips: Ai
};
function Ei({ path: e, chips: a }) {
  return /* @__PURE__ */ t("div", { className: Ae.root, children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Ae.nav, children: [
    /* @__PURE__ */ t("ol", { className: Ae.list, children: e.map((n, r) => /* @__PURE__ */ l("li", { className: Ae.item, children: [
      r > 0 ? /* @__PURE__ */ t("span", { className: Ae.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${Ae.link} ward-target`, href: H(n.href), title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { className: Ae.current, "aria-current": "page", title: n.label, children: n.label })
    ] }, n.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${Ae.chips} ward-chiprow`, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
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
const Ii = 500;
function sn(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function cn() {
  const e = f(""), a = f(void 0);
  return S(() => () => clearTimeout(a.current), []), (n) => (clearTimeout(a.current), e.current += n.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, Ii), e.current);
}
const ha = 4;
function Mi(e, a, n) {
  const r = Math.max(0, n - e.bottom - ha * 2), o = Math.max(0, e.top - ha * 2);
  return a <= r || r >= o ? { top: e.bottom + ha, maxHeight: r } : { top: e.top - ha - Math.min(a, o), maxHeight: o };
}
function qi(e, a, n, r) {
  const o = { start: e.left, end: e.right - a }, i = { start: o.start + a <= n, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, n - a));
}
function Bi(e, a, n, r) {
  return { ...Mi(e, a.height, n.height), left: qi(e, a.width, n.width, r) };
}
function ba(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Pi(e, a) {
  const n = a.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", ba(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), o = document.documentElement;
  return { edges: n, box: r, view: { width: o.clientWidth, height: o.clientHeight } };
}
function ji(e) {
  const a = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = a.map((r) => r.scrollTop);
  return () => a.forEach((r, o) => r.scrollTop = n[o]);
}
function $t(e, a, n) {
  const r = ji(e), o = Pi(e, a), i = Bi(o.edges, o.box, o.view, n);
  Object.assign(e.style, { left: ba(i.left - o.box.left), top: ba(i.top - o.box.top), maxHeight: ba(i.maxHeight) }), r();
}
function Di(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function dn(e, a, n = "start") {
  aa(() => {
    const r = a.current, o = e.current;
    if (!r || !o) return;
    const i = Di(r), s = () => $t(r, o, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), aa(() => {
    a.current && e.current && $t(a.current, e.current, n);
  });
}
const Oi = "_root_axvxm_2", Hi = "_trigger_axvxm_7", Fi = "_value_axvxm_32", Wi = "_menu_axvxm_50", zi = "_find_axvxm_72", Ki = "_list_axvxm_88", Gi = "_option_axvxm_99", Ui = "_check_axvxm_118", Vi = "_empty_axvxm_129", fe = {
  root: Oi,
  trigger: Hi,
  value: Fi,
  menu: Wi,
  find: zi,
  list: Ki,
  option: Gi,
  check: Ui,
  empty: Vi
}, Yi = 7;
function Ji(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function Ct(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function Xi(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [o, i] = p(""), [s, c] = p(() => Ct(e.options, e.value)), d = (u) => {
    var m;
    Jt(() => r(!1)), u && ((m = a.current) == null || m.focus());
  };
  return {
    open: n,
    query: o,
    active: s,
    entries: Ji(e.options, o),
    findable: e.options.length > Yi,
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
function Qi(e, a) {
  const n = f(!1);
  return S(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function Zi(e) {
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
function es(e) {
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
const as = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function ts(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      as.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function ns({ entry: e, at: a, menu: n, ids: r, value: o }) {
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
function rs({ menu: e, ids: a, focusRef: n }) {
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
function os({ props: e, menu: a, ids: n, focusRef: r, trigger: o }) {
  const i = Zi(a), s = f(null);
  dn(o, s);
  const c = (d) => {
    sn(d) && i(d.key);
  };
  return /* @__PURE__ */ l("div", { ref: s, className: fe.menu, children: [
    a.findable && /* @__PURE__ */ t(rs, { menu: a, ids: n, focusRef: r }),
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
        onKeyDown: mn(a, es(a), c),
        children: a.entries.map((d, u) => /* @__PURE__ */ t(ns, { entry: d, at: u, menu: a, ids: n, value: e.value }, d.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: fe.empty, children: "No match" })
  ] });
}
function ls(e, a) {
  const n = e.open ? ot(e, a) : void 0;
  S(() => {
    var r, o;
    n && ((o = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [n]);
}
function hn(...e) {
  return e.filter(Boolean).join(" ");
}
function is(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function ss({ props: e, menu: a, ids: n, trigger: r, wantFocus: o }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Pe()) == null ? void 0 : c.reason;
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
      ...ts(a, o),
      children: /* @__PURE__ */ t("span", { id: n.value, className: fe.value, "data-placeholder": i || void 0, children: is(e) })
    }
  );
}
function wn(e) {
  const a = Pe(), n = a ? { ...e, disabled: !0, "aria-describedby": Ea(e["aria-describedby"], a) } : e, r = N(), o = { list: `${r}-list`, value: `${r}-value`, option: (m) => `${r}-option-${m}` }, i = f(null), s = f(null), c = f(null), d = Xi(n, s), u = Qi(d.open, c);
  return ln(d.open, i, () => d.close(!1)), ls(d, o), /* @__PURE__ */ l("div", { ref: i, className: hn(fe.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(ss, { props: n, menu: d, ids: o, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ t("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ t(os, { props: n, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const cs = "_field_13oav_2", ds = "_label_13oav_8", us = "_labelHidden_13oav_15", ms = "_control_13oav_25", hs = "_mono_13oav_45", ws = "_area_13oav_50", fs = "_invalid_13oav_57", Be = {
  field: cs,
  label: ds,
  labelHidden: us,
  control: ms,
  mono: hs,
  area: ws,
  invalid: fs
}, _s = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, fn = (e) => `${e}-label`;
function vs({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? _s : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function bs({ props: e, controlProps: a, cls: n }) {
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
function ps({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const gs = { input: vs, select: bs, textarea: ps };
function ys(e, a, n) {
  const r = gs[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function Ns(e, a, n, r) {
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
function ks(e) {
  const a = e.mono ? [Be.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [Be.area] : [];
  return [Be.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function $s(e) {
  return e ? `${Be.label} ${Be.labelHidden} ward-field-label` : `${Be.label} ward-field-label`;
}
function M(e) {
  const a = N(), n = `${a}-msg`, r = Ns(e, a, n, Pe()), o = ks(e);
  return /* @__PURE__ */ l("div", { className: `${Be.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: fn(a), className: $s(e.labelHidden), htmlFor: a, children: e.label }),
    ys(e, r, o),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${Be.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Cs = "_root_1gft5_2", Ss = "_trigger_1gft5_9", Rs = "_panel_1gft5_33", Ts = "_menu_1gft5_52", xs = "_group_1gft5_57", Ls = "_heading_1gft5_62", As = "_item_1gft5_68", Es = "_separator_1gft5_94", Is = "_footer_1gft5_100", _e = {
  root: Cs,
  trigger: Ss,
  panel: Rs,
  menu: Ts,
  group: xs,
  heading: Ls,
  item: As,
  separator: Es,
  footer: Is
}, _n = Te(null);
function Ms(e, a) {
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
const qs = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Bs(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const n = qs.get(a.key);
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
function Ps(e, a = {}) {
  const { ref: n, className: r, ...o } = a;
  return { ...o, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: vn(_e.trigger, r) };
}
function js(e) {
  const a = N(), n = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = f(null), o = f(null), i = Ms(e.defaultOpen === !0, o);
  return ln(i.open, r, () => i.close(!1)), /* @__PURE__ */ l("div", { ref: r, className: vn(_e.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ...Ps(o, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Bs(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ t(_n.Provider, { value: { ...n, popup: i, button: o }, children: e.children })
  ] });
}
function Ds(e) {
  let a = 0;
  const n = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function Os(e) {
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
const Hs = (e) => e.split("").every((a) => a === e[0]);
function Fs(e, a, n) {
  const r = Hs(n), o = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = bn(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function Ws(e) {
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
function zs(e, a) {
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
function Ks(e, a) {
  const n = f(!1), r = cn(), o = zs(e, a), i = (s) => {
    sn(s) && e.focus(Fs(e.items, e.current(), r(s.key)));
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
function Gs(e, a) {
  const { start: n, request: r } = a, o = f(e);
  o.current = e, S(() => {
    const { items: i, focus: s } = o.current;
    n && s(n === "first" ? Ze(i, -1, 1) : Ze(i, i.length, -1));
  }, [n, r]);
}
function Us({ row: e, nav: a, popup: n }) {
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
    ...Us(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: H(a.href), ...r, children: a.label }) : /* @__PURE__ */ t("button", { type: "button", ...r, children: a.label });
}
function Vs({ heading: e, rows: a, nav: n, popup: r }) {
  const o = N();
  return /* @__PURE__ */ l("div", { role: "group", "aria-labelledby": o, className: _e.group, children: [
    /* @__PURE__ */ t("div", { id: o, className: _e.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(pn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function Ys({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: _e.separator }) : e.kind === "group" ? /* @__PURE__ */ t(Vs, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(pn, { row: e.row, nav: a, popup: n });
}
function Js() {
  const e = Re(_n);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Xs({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: o, buttonId: i, button: s } = Js(), c = f(null);
  dn(s, c, n);
  const d = Ds(e), u = Ws(d.flatMap(Os).map((_) => _.item)), m = Ks(u, r);
  return Gs(u, r), /* @__PURE__ */ l("div", { ref: c, className: _e.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: o, "aria-labelledby": i, className: _e.menu, ...m, children: d.map((_, w) => /* @__PURE__ */ t(Ys, { block: _, nav: u, popup: r }, w)) }),
    a && /* @__PURE__ */ t("p", { className: _e.footer, children: a })
  ] });
}
function Qs(e) {
  var n;
  return (((n = e.parentElement) == null ? void 0 : n.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function gn(e, a) {
  S(() => {
    const n = e.current;
    a === "page" && n && !Qs(n) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, a]);
}
const Zs = (e, a) => e.reduce((n, r) => n + r + a, -a);
function ec({ room: e, widths: a, more: n, gap: r }, o) {
  const i = a.map((d, u) => u);
  if (Zs(a, r) <= e) return i;
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
function ac(e) {
  const a = getComputedStyle(e), n = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Ha(a.paddingInlineStart) - Ha(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(':scope > [role="tab"]'), St),
    more: n ? St(n) : 0,
    gap: Ha(a.columnGap)
  };
}
function tc(e, a) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(a);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const nc = (e, a) => JSON.stringify(e) === JSON.stringify(a);
function rc(e, a, n) {
  const [r, o] = p(null);
  return aa(() => {
    const i = e.current;
    if (!i) return;
    const s = () => {
      const c = ac(i);
      o((d) => nc(d, c) ? d : c);
    };
    return s(), tc(i, s);
  }, [e, n]), r && ec(r, a);
}
const oc = "_strip_jqyo6_2", lc = "_fits_jqyo6_19", ic = "_probe_jqyo6_27", sc = "_moreRoot_jqyo6_36", cc = "_more_jqyo6_36", dc = "_tab_jqyo6_55", uc = "_count_jqyo6_91", ve = {
  strip: oc,
  fits: lc,
  probe: ic,
  moreRoot: sc,
  more: cc,
  tab: dc,
  count: uc
}, yn = "More";
function mc(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
const Nn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function kn(e) {
  return `${ve.strip} ward-tabs ward-tabs--${e}`;
}
const hc = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function wc({ tab: e, active: a, place: n, onChange: r }) {
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
function fc(e, a) {
  return (n) => {
    a(n), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function _c({ tabs: e, trigger: a, onPick: n }) {
  return /* @__PURE__ */ t(js, { label: yn, className: ve.moreRoot, trigger: { ...a, role: "tab", "aria-selected": !1, className: ve.more }, children: /* @__PURE__ */ t(Xs, { align: "end", entries: e.map((r) => ({ label: Nn(r), onSelect: () => n(r.id) })) }) });
}
function vc(e, a, n) {
  return !a || a.includes(n) ? e.itemProps(n) : hc;
}
function YS({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: o }) {
  const i = La({ orientation: "horizontal" }), s = mc(e, a);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = f(null);
  gn(c, o);
  const d = rc(c, s, e.map(Nn).join(`
`)), u = d ? e.filter((m, _) => !d.includes(_)) : [];
  return /* @__PURE__ */ l("div", { ref: c, className: `${kn(o)} ${ve.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...i.containerProps, children: [
    e.map((m, _) => /* @__PURE__ */ t(wc, { tab: m, active: a, place: vc(i, d, _), onChange: n }, m.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${_e.trigger} ${ve.more} ${ve.probe}`, children: yn }),
    u.length > 0 && /* @__PURE__ */ t(_c, { tabs: u, trigger: i.itemProps(e.length), onPick: fc(c, n) })
  ] });
}
const Rt = 7;
function JS({ links: e, active: a, label: n, level: r }) {
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
const bc = "_root_v56ff_3", pc = "_segment_v56ff_9", Tt = {
  root: bc,
  segment: pc
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
const gc = "_sidebar_s9o1j_3", yc = "_brand_s9o1j_9", Nc = "_mark_s9o1j_17", kc = "_word_s9o1j_24", $c = "_nav_s9o1j_30", Cc = "_navItem_s9o1j_39", Sc = "_footLink_s9o1j_49", Rc = "_group_s9o1j_58", Tc = "_groupName_s9o1j_65", xc = "_agents_s9o1j_81", Lc = "_agent_s9o1j_81", Ac = "_root_s9o1j_96", Ec = "_agentTop_s9o1j_105", Ic = "_dot_s9o1j_112", Mc = "_agentName_s9o1j_124", qc = "_agentMeta_s9o1j_138", Bc = "_foot_s9o1j_49", Pc = "_footName_s9o1j_150", jc = "_footLinks_s9o1j_157", Dc = "_linkBrand_s9o1j_184", Oc = "_label_s9o1j_205", Hc = "_note_s9o1j_210", Fc = "_footer_s9o1j_226", x = {
  sidebar: gc,
  brand: yc,
  mark: Nc,
  word: kc,
  nav: $c,
  navItem: Cc,
  new: "_new_s9o1j_48",
  footLink: Sc,
  group: Rc,
  groupName: Tc,
  agents: xc,
  agent: Lc,
  root: Ac,
  agentTop: Ec,
  dot: Ic,
  agentName: Mc,
  agentMeta: qc,
  foot: Bc,
  footName: Pc,
  footLinks: jc,
  linkBrand: Dc,
  label: Oc,
  note: Hc,
  footer: Fc
};
function Wc({ agent: e }) {
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
function zc({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: x.foot, children: [
    /* @__PURE__ */ t("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${x.footLink} ward-target`, href: H(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function Kc({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: o, shared: i }) {
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
    /* @__PURE__ */ t("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ t(Wc, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(zc, { shared: i })
  ] });
}
function Gc(e) {
  return e.destinations ?? e.items ?? [];
}
function Uc({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.linkBrand, children: e });
}
function Vc({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.footer, children: e });
}
function Yc({ link: e, active: a }) {
  return /* @__PURE__ */ l("a", { href: H(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: x.note, children: e.note })
  ] });
}
function Jc(e) {
  return /* @__PURE__ */ l("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(Uc, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: Gc(e).map((a) => /* @__PURE__ */ t(Yc, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(Vc, { children: e.children })
  ] });
}
function Xc(e) {
  return "agents" in e;
}
function XS(e) {
  return Xc(e) ? /* @__PURE__ */ t(Kc, { ...e }) : /* @__PURE__ */ t(Jc, { ...e });
}
const Qc = "_mark_wlgi8_3", Zc = {
  mark: Qc
}, ed = { met: "✓", unmet: "", failed: "✕" };
function lt({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: Zc.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: ed[e]
    }
  );
}
const ad = "_avatar_1t33a_3", td = {
  avatar: ad
};
function nd(e) {
  const a = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (a.length > 1 ? (a[0] ?? "").charAt(0) + (a[1] ?? "").charAt(0) : (a[0] ?? "").slice(0, 2)).toUpperCase();
}
function rd(e) {
  return e != null && sa(e) ? Dr(e) : void 0;
}
function QS({ name: e, step: a, size: n = "md" }) {
  return /* @__PURE__ */ t("span", { className: td.avatar, "data-size": n, "aria-hidden": "true", style: rd(a), children: nd(e) });
}
const od = "_marker_br9fi_2", ld = {
  marker: od
}, id = {
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
}, sd = { running: " ward-running" };
function je({ size: e, kind: a, label: n }) {
  const r = { "--marker": id[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${ld.marker} ward-marker ward-marker--${a}${sd[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const cd = "_root_ti0pq_2", dd = "_chip_ti0pq_11", ud = "_noCase_ti0pq_23", wa = {
  root: cd,
  chip: dd,
  noCase: ud
};
function md(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function it({ connection: e, since: a, lastEventAt: n }) {
  const r = md(a, n), o = nt(r, e === "reconnecting");
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
const hd = "_root_u8ort_2", wd = "_context_u8ort_13", fd = "_row_u8ort_1", _d = "_heading_u8ort_27", vd = "_headingWrap_u8ort_35", bd = "_chips_u8ort_40", pd = "_title_u8ort_48", gd = "_consequence_u8ort_58", yd = "_actionsWrap_u8ort_65", Nd = "_actions_u8ort_65", kd = "_action_u8ort_65", $d = "_overflowPanel_u8ort_94", Cd = "_measureClip_u8ort_105", Sd = "_measure_u8ort_105", Y = {
  root: hd,
  context: wd,
  row: fd,
  heading: _d,
  headingWrap: vd,
  chips: bd,
  title: pd,
  consequence: gd,
  actionsWrap: yd,
  actions: Nd,
  action: kd,
  overflowPanel: $d,
  measureClip: Cd,
  measure: Sd
};
function Rd({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(ta, { as: "h1", className: Y.title, text: e }) : /* @__PURE__ */ t("h1", { className: Y.title, children: e });
}
function Td({ title: e, consequence: a, consequenceHint: n, density: r }) {
  return /* @__PURE__ */ l("div", { className: Y.heading, children: [
    /* @__PURE__ */ t(Rd, { title: e, density: r }),
    a && /* @__PURE__ */ t("p", { className: Y.consequence, title: n, children: a })
  ] });
}
function Ya({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: Y.action, "data-action": "", children: a }, n));
}
function xt({ disclosure: e }) {
  return /* @__PURE__ */ t(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function xd({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: o }) {
  return n ? r ? /* @__PURE__ */ t(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(xt, { disclosure: o }) : a ? [/* @__PURE__ */ t(xt, { disclosure: o }, "more"), /* @__PURE__ */ t(Ya, { actions: e }, "actions")] : /* @__PURE__ */ t(Ya, { actions: e });
}
function Ld(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Ad({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: Y.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ya, { actions: e }) });
}
function Ed(e, a) {
  const n = N(), [r, o] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => o(!i) }, close: () => {
    var d, u;
    o(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function Id({ crumb: e, chips: a }) {
  return /* @__PURE__ */ l("div", { className: Y.context, children: [
    /* @__PURE__ */ t(Ei, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: Y.chips, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] });
}
function Md(...e) {
  return e.some((a) => a === null);
}
function qd(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Bd(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + qd(e);
}
function Pd(e, a, n, r, o) {
  if (o === 0 || Md(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], d = Math.max(0, e.clientWidth - Bd(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function jd(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Dd(e) {
  return br(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Od(e, a) {
  return a.length === 0 && e.length === 1 && Dd(e[0]);
}
function Hd(e, a) {
  const n = f(null), r = f(null), o = f(null), i = f(null), [s, c] = p(!1);
  return S(() => {
    const d = n.current;
    if (!jd(d)) return;
    const u = () => c(Pd(d, r.current, o.current, i.current, e.length)), m = new ResizeObserver(u);
    return m.observe(d), i.current && m.observe(i.current), u(), () => m.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: o, measureRef: i, collapsed: s && !a };
}
function Fd({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: Y.measureClip, children: /* @__PURE__ */ l("div", { className: Y.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ t("span", { children: r }, o))
  ] }) });
}
function Wd({ connection: e }) {
  return e ? /* @__PURE__ */ t(it, { connection: e.connection, since: e.since }) : null;
}
function ZS({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: o, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: m, headingRef: _, actionsRef: w, measureRef: y, collapsed: L } = Hd(i, Od(i, s)), q = s.length > 0, { disclosure: oe, close: Le } = Ed(L || q, w), ae = Ld(s, i, L, d);
  return /* @__PURE__ */ l("header", { className: Y.root, "data-density": u, children: [
    /* @__PURE__ */ t(Id, { crumb: e, chips: a }),
    /* @__PURE__ */ l("div", { className: Y.row, ref: m, children: [
      /* @__PURE__ */ t("div", { ref: _, className: Y.headingWrap, children: /* @__PURE__ */ t(Td, { title: n, consequence: r, consequenceHint: o, density: u }) }),
      /* @__PURE__ */ l("div", { className: Y.actionsWrap, children: [
        /* @__PURE__ */ t(Wd, { connection: c }),
        /* @__PURE__ */ t("div", { className: Y.actions, ref: w, "data-ward-actions": !0, children: /* @__PURE__ */ t(xd, { actions: i, hasMore: q, collapsed: L, onOverflow: d, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ t(Ad, { actions: ae, disclosure: oe, onEscape: Le }),
    /* @__PURE__ */ t(Fd, { actions: i, hasMore: q, measureRef: y })
  ] });
}
const zd = "_root_td96x_2", Kd = "_body_td96x_16", Lt = {
  root: zd,
  body: Kd
};
function eR({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${Lt.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: Lt.body, children: n }) });
}
const Gd = "_root_bf1pc_2", Ud = "_table_bf1pc_9", Vd = "_caption_bf1pc_14", Yd = "_series_bf1pc_23", Jd = "_category_bf1pc_31", Xd = "_cell_bf1pc_39", Qd = "_track_bf1pc_45", Zd = "_lane_bf1pc_52", eu = "_bar_bf1pc_56", au = "_value_bf1pc_63", tu = "_swatch_bf1pc_70", nu = "_empty_bf1pc_78", J = {
  root: Gd,
  table: Ud,
  caption: Vd,
  series: Yd,
  category: Jd,
  cell: Xd,
  track: Qd,
  lane: Zd,
  bar: eu,
  value: au,
  swatch: tu,
  empty: nu
}, ru = "—", At = 6;
function ou(e, a) {
  if (a.length < 1 || a.length > At)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${At}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function lu(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function Cn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function iu(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function su({ value: e, top: a, step: n, format: r, missing: o }) {
  const i = iu(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: J.cell, children: /* @__PURE__ */ l("span", { className: J.track, children: [
    /* @__PURE__ */ t("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: J.value, children: e === null ? o : r(e) })
  ] }) });
}
function cu({ series: e }) {
  return /* @__PURE__ */ t(T, { children: e.map((a, n) => /* @__PURE__ */ l("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: J.swatch, "data-step": Cn(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function du({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ l("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: J.caption, children: e }),
    /* @__PURE__ */ t("p", { className: J.empty, children: a })
  ] });
}
function uu({ title: e, categories: a, series: n, top: r, format: o = ee, categoryHead: i = "Category", missing: s = ru }) {
  return /* @__PURE__ */ t("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ l("table", { className: J.table, children: [
    /* @__PURE__ */ t("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: J.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(cu, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, d) => /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: J.category, children: c }),
      n.map((u, m) => /* @__PURE__ */ t(su, { value: u.values[d], top: r, step: Cn(m, n.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function aR(e) {
  ou(e.categories, e.series);
  const a = lu(e.series);
  return a === 0 ? /* @__PURE__ */ t(du, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(uu, { ...e, top: a });
}
const mu = "_root_1bfqw_2", hu = "_figure_1bfqw_7", wu = "_of_1bfqw_13", fu = "_bar_1bfqw_18", _u = "_rows_1bfqw_38", vu = "_row_1bfqw_38", bu = "_label_1bfqw_49", pu = "_amount_1bfqw_54", Ee = {
  root: mu,
  figure: hu,
  of: wu,
  bar: fu,
  rows: _u,
  row: vu,
  label: bu,
  amount: pu
};
function gu({ spent: e, ceiling: a, breakdown: n }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ l("div", { className: `${Ee.root} ward-costmeter`, children: [
    /* @__PURE__ */ l("p", { className: `${Ee.figure} ward-stat-value`, children: [
      ne(e),
      " ",
      /* @__PURE__ */ l("span", { className: Ee.of, children: [
        "of ",
        ne(a)
      ] })
    ] }),
    /* @__PURE__ */ t(
      "meter",
      {
        className: `${Ee.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${ne(e)} of ${ne(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    n && /* @__PURE__ */ t("ul", { className: Ee.rows, children: n.map((o) => /* @__PURE__ */ l("li", { className: `${Ee.row} ward-costrow`, children: [
      /* @__PURE__ */ t("span", { className: Ee.label, children: o.label }),
      /* @__PURE__ */ t("span", { className: Ee.amount, children: ne(o.amount) })
    ] }, o.label)) })
  ] });
}
const yu = "_frame_9xel2_2", Nu = "_table_9xel2_6", ku = "_th_9xel2_12", $u = "_td_9xel2_13", Cu = "_sort_9xel2_48", Su = "_row_9xel2_60", Ru = "_empty_9xel2_68", Me = {
  frame: yu,
  table: Nu,
  th: ku,
  td: $u,
  sort: Cu,
  row: Su,
  empty: Ru
}, Tu = { asc: "ascending", desc: "descending" };
function xu(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return Tu[a.direction];
}
function Lu(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: Me.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Au(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Eu({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Me.th,
      style: Au(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": xu(e, a),
      children: Lu(e, n)
    }
  );
}
function Iu({ row: e, props: a }) {
  const n = a.rowId(e), r = (a.lockedIds ?? []).includes(n);
  return /* @__PURE__ */ t(
    "tr",
    {
      className: Me.row,
      "data-selected": n === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((o) => /* @__PURE__ */ t("td", { className: Me.td, "data-align": o.align, "data-mono": o.mono, "data-drop": o.dropPriority, children: a.renderCell(e, o.key) }, o.key))
    }
  );
}
function Mu({
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
  return n.length === 0 ? /* @__PURE__ */ t("div", { className: Me.empty, children: u }) : /* @__PURE__ */ t("div", { className: Me.frame, children: /* @__PURE__ */ l("table", { className: Me.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Me.head, children: a.map((m) => /* @__PURE__ */ t(Eu, { column: m, sort: c, onSort: d }, m.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((m) => /* @__PURE__ */ t(Iu, { row: m, props: { label: e, columns: a, rows: n, rowId: r, renderCell: o, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(m))) })
  ] }) });
}
const qu = "_list_v0s52_2", Bu = {
  list: qu
};
function tR({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: Bu.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Pu = "_label_1u62a_2", ju = {
  label: Pu
};
function nR({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: ju.label, children: a.header }) }, a.key)) }) });
}
const Du = "_stack_bp6a0_2", Ou = {
  stack: Du
};
function rR({ children: e }) {
  return /* @__PURE__ */ t("span", { className: Ou.stack, "data-ward-action-stack": "", children: e });
}
const Hu = "_set_1z0sq_2", Fu = "_legend_1z0sq_7", Wu = "_row_1z0sq_15", zu = "_control_1z0sq_20", Ku = "_input_1z0sq_26", Gu = "_label_1z0sq_31", Uu = "_consequence_1z0sq_36", Oe = {
  set: Hu,
  legend: Fu,
  row: Wu,
  control: zu,
  input: Ku,
  label: Gu,
  consequence: Uu
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
const Vu = "_root_11gpw_2", Yu = "_head_11gpw_10", Ju = "_note_11gpw_29", Xu = "_index_11gpw_34", Qu = "_dot_11gpw_38", Zu = "_counter_11gpw_49", em = "_trailing_11gpw_57", Fe = {
  root: Vu,
  head: Yu,
  note: Ju,
  index: Xu,
  dot: Qu,
  counter: Zu,
  trailing: em
};
function am({ index: e }) {
  return e ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t("span", { className: `${Fe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: Fe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function tm({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Fe.counter, "aria-hidden": "true", children: e }) : null;
}
function Et({ title: e, index: a, note: n, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Fe.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Fe.head, children: [
      /* @__PURE__ */ t(am, { index: a }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: Fe.note, children: n }),
    /* @__PURE__ */ t(tm, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: Fe.trailing, children: i })
  ] });
}
const nm = "_strip_ww53x_2", rm = "_cell_ww53x_7", om = "_value_ww53x_12", lm = "_link_ww53x_29", im = "_label_ww53x_49", Ke = {
  strip: nm,
  cell: rm,
  value: om,
  link: lm,
  label: im
};
function sm(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const Rn = (e) => `${Ke.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function cm({ cell: e }) {
  return /* @__PURE__ */ l("div", { className: Ke.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Rn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${Ke.label} ward-stat-label`, children: e.label })
  ] });
}
function dm({ cell: e, href: a }) {
  return /* @__PURE__ */ l("div", { className: Ke.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Rn(e), title: e.hint, children: /* @__PURE__ */ l("a", { className: `${Ke.link} ward-stat-link`, href: H(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${Ke.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Ba({ cells: e, divided: a = !1 }) {
  return sm(e), /* @__PURE__ */ t("dl", { className: `${Ke.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(cm, { cell: n }, n.label) : /* @__PURE__ */ t(dm, { cell: n, href: n.href }, n.label)) });
}
const um = "_root_1eb1u_2", mm = "_track_1eb1u_8", hm = "_thumb_1eb1u_46", wm = "_labelHidden_1eb1u_64", fm = "_label_1eb1u_64", _m = "_lockedNote_1eb1u_84", We = {
  root: um,
  track: mm,
  thumb: hm,
  labelHidden: wm,
  label: fm,
  lockedNote: _m
};
function vm(e, a, n, r) {
  return { on: n ? !0 : e, off: !!(a || n || r) };
}
function bm(e) {
  return e ? `${We.label} ${We.labelHidden}` : We.label;
}
function Ge({ label: e, checked: a, onChange: n, disabled: r, locked: o, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = Pe(), { on: m, off: _ } = vm(a, r, o, u !== null);
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
    /* @__PURE__ */ l("label", { id: c, htmlFor: d, className: bm(s), children: [
      e,
      o && /* @__PURE__ */ t("span", { className: We.lockedNote, children: "always on" })
    ] })
  ] });
}
const pm = "_bar_1vp69_2", gm = "_skip_1vp69_11", ym = "_mark_1vp69_22", Nm = "_nav_1vp69_30", km = "_list_1vp69_34", $m = "_select_1vp69_41", Cm = "_selectTrigger_1vp69_45", Sm = "_dest_1vp69_52", Rm = "_actor_1vp69_71", Tm = "_actorMark_1vp69_84", xm = "_actorLabel_1vp69_89", Lm = "_tagline_1vp69_108", le = {
  bar: pm,
  skip: gm,
  mark: ym,
  nav: Nm,
  list: km,
  select: $m,
  selectTrigger: Cm,
  dest: Sm,
  actor: Rm,
  actorMark: Tm,
  actorLabel: xm,
  tagline: Lm
};
function Am(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Em(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function oR({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: o, onNavigate: i, skipTo: s = "main" }) {
  const c = Em(r);
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
      /* @__PURE__ */ t("span", { className: le.actorMark, "aria-hidden": "true", children: Am(c) })
    ] })
  ] });
}
const Im = "_tree_zzoob_2", Mm = "_item_zzoob_6", qm = "_row_zzoob_10", Bm = "_button_zzoob_22", $a = {
  tree: Im,
  item: Mm,
  row: qm,
  button: Bm
}, Tn = Te(null);
function Pm({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = La({ orientation: "vertical" });
  return /* @__PURE__ */ t(Tn.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: $a.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const jm = { ArrowRight: !0, ArrowLeft: !1 };
function It(e) {
  return e ? !0 : void 0;
}
function Dm(e, a) {
  const n = jm[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function Om(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function Hm(e) {
  const a = [$a.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Fm(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Wm(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function zm(e) {
  return typeof e == "string" ? e : void 0;
}
function Km({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Gm({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function xn(e) {
  const a = Re(Tn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = Fm(e);
  return /* @__PURE__ */ l("li", { className: $a.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: Hm(e),
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
            onClick: () => Om(e),
            onKeyDown: (r) => Dm(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Wm(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: zm(e.label), children: e.label }),
              /* @__PURE__ */ t(Km, { value: e.detail }),
              /* @__PURE__ */ t(Gm, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const Um = "_frame_gij4e_2", Vm = "_subjectRail_gij4e_22", Ym = "_subject_gij4e_22", Jm = "_rail_gij4e_42", Xm = "_record_gij4e_66", Qm = "_recordBody_gij4e_71", Zm = "_stageGrid_gij4e_120", eh = "_band_gij4e_134", ah = "_bandBody_gij4e_142", th = "_bandActions_gij4e_147", nh = "_scroller_gij4e_155", rh = "_board_gij4e_182", oh = "_lanes_gij4e_191", Z = {
  frame: Um,
  subjectRail: Vm,
  subject: Ym,
  rail: Jm,
  record: Xm,
  recordBody: Qm,
  stageGrid: Zm,
  band: eh,
  bandBody: ah,
  bandActions: th,
  scroller: nh,
  board: rh,
  lanes: oh
};
function lR({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: Z.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function Mt(e) {
  return e ? "true" : void 0;
}
function iR({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: Z.subjectRail, "data-ward-subject-rail": n, "data-ruled": Mt(i), children: [
    /* @__PURE__ */ t("div", { className: Z.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Z.rail, "data-sticky": Mt(o), "aria-label": r, children: a })
  ] });
}
function sR({ title: e, children: a, note: n, trailing: r, pad: o = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(Et, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ l("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(Et, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: Z.recordBody, "data-pad": o, "data-measure": c, children: a })
  ] });
}
const lh = "_form_1j8ub_2", ih = "_fields_1j8ub_9", sh = "_actions_1j8ub_19", Fa = {
  form: lh,
  fields: ih,
  actions: sh
};
function cR({ label: e, children: a, actions: n, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: Fa.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Fa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Fa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function dR({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ l("section", { className: Z.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Z.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Z.bandActions, children: a })
  ] });
}
const ch = "(max-width: 767.98px)";
function st({ label: e, children: a, laneCount: n }) {
  const r = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t(Ma, { className: Z.scroller, label: e, count: n ?? pr.count(a), "data-ward-board-scroller": "", style: r, children: a });
}
function dh({ lanes: e, label: a, laneLabel: n }) {
  const [r, o] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ l("div", { className: Z.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ t(st, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function uh({ lanes: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: Z.board, "data-ward-board": "", children: /* @__PURE__ */ t(st, { label: a, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ t(gr, { children: n.content }, n.id)) }) });
}
function uR({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const o = Ia(ch);
  return n === void 0 ? /* @__PURE__ */ t(st, { label: a, children: e }) : o ? /* @__PURE__ */ t(dh, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(uh, { lanes: n, label: a });
}
function mR({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), i = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ t(Ma, { className: Z.stageGrid, label: n, count: o, "data-ward-stage-grid": "", "data-floor": r, style: i, children: a });
}
const mh = "_block_b38uc_3", hh = "_sentence_b38uc_10", wh = "_meta_b38uc_19", fh = "_action_b38uc_24", _h = "_strip_b38uc_28", vh = "_loading_b38uc_47", bh = "_label_b38uc_55", ph = "_counter_b38uc_62", be = {
  block: mh,
  sentence: hh,
  meta: wh,
  action: fh,
  strip: _h,
  loading: vh,
  label: bh,
  counter: ph
};
function gh({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: be.action, children: /* @__PURE__ */ t(b, { onClick: e.onClick, children: e.label }) });
}
function Pa({ sentence: e, action: a, children: n, role: r = "status", tone: o, kind: i }) {
  return /* @__PURE__ */ l("div", { className: `${be.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ t("p", { className: be.sentence, children: e }),
    n,
    /* @__PURE__ */ t(gh, { action: a })
  ] });
}
function yh(e) {
  return /* @__PURE__ */ t(Pa, { ...e, kind: "ward-emptystate" });
}
function hR({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(Pa, { sentence: e, action: n, children: /* @__PURE__ */ l("p", { className: be.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function wR(e) {
  return /* @__PURE__ */ t(Pa, { ...e });
}
function fR({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(Pa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ l("p", { className: be.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function _R({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ l("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function vR({ queued: e, since: a }) {
  return /* @__PURE__ */ l("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function bR({ label: e, startedAt: a }) {
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
const Nh = "_note_cigdt_2", kh = {
  note: Nh
};
function $h({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ l("p", { className: kh.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const Ch = "_card_k7btg_3", Sh = "_hit_k7btg_31", Rh = "_head_k7btg_44", Th = "_title_k7btg_51", xh = "_meta_k7btg_57", Lh = "_since_k7btg_66", Ah = "_sep_k7btg_76", Eh = "_fields_k7btg_80", Ih = "_field_k7btg_80", Mh = "_last_k7btg_98", qh = "_reason_k7btg_110", se = {
  card: Ch,
  hit: Sh,
  head: Rh,
  title: Th,
  meta: xh,
  since: Lh,
  sep: Ah,
  fields: Eh,
  field: Ih,
  last: Mh,
  reason: qh
}, Bh = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Ph(e, a, n) {
  const r = va(e, "blue"), o = va(e, "orange"), i = va(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!n) return;
    const c = { blue: r, orange: o, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Bh[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, o]);
}
const jh = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ne(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Dh(e, a) {
  return jh[a](e);
}
function Oh({ item: e, connection: a }) {
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
function Hh({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ l("div", { className: se.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function Fh({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: se.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Wh({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: se.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: se.field, children: Dh(e, n) }, n)) });
}
const Ja = (e) => e ? !0 : void 0;
function zh(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function Kh(e, a, n) {
  e == null || e(a, n);
}
function Gh(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Uh({ item: e, stale: a }) {
  var r, o;
  const n = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: se.last, "data-stale": Ja(a), children: n }) : null;
}
function ja(e) {
  const a = e.fields ?? [], n = e.item, r = f(null);
  Ph(r, n.key, e.feed);
  const o = Gh(e.feed), i = zh(n);
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
        /* @__PURE__ */ t("button", { type: "button", className: se.hit, onClick: (s) => Kh(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(Hh, { item: n }),
        /* @__PURE__ */ t(ta, { as: "p", className: se.title, text: n.title }),
        /* @__PURE__ */ t(Oh, { item: n, connection: o }),
        /* @__PURE__ */ t(Fh, { reason: n.blockedReason }),
        /* @__PURE__ */ t(Wh, { item: n, fields: a }),
        /* @__PURE__ */ t(Uh, { item: n, stale: o === "stale" })
      ]
    }
  );
}
const Vh = "_column_1j8bi_3", Yh = "_head_1j8bi_21", Jh = "_label_1j8bi_30", Xh = "_count_1j8bi_39", Qh = "_list_1j8bi_53", oa = {
  column: Vh,
  head: Yh,
  label: Jh,
  count: Xh,
  list: Qh
};
function Ln(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function Zh({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ l("div", { className: oa.head, children: [
    /* @__PURE__ */ t("h2", { className: oa.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ l("span", { className: oa.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function ew(e) {
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
function aw({ column: e, items: a, fields: n, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), m = e.cap !== void 0 && a.length > e.cap, _ = Ln(a, r);
  return /* @__PURE__ */ l("section", { className: oa.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(Zh, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(ew, { column: e, items: a, fields: n, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, rows: _ }),
    m && /* @__PURE__ */ t($h, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const tw = "_foot_cs4jr_2", nw = "_note_cs4jr_13", rw = "_link_cs4jr_19", Wa = {
  foot: tw,
  note: nw,
  link: rw
};
function pR({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: Wa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: Wa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${Wa.link} ward-target`, href: H(e), children: "Configure board" })
  ] });
}
const ow = "_head_1tfi5_3", lw = "_identity_1tfi5_12", iw = "_titleRow_1tfi5_18", sw = "_title_1tfi5_18", cw = "_key_1tfi5_35", dw = "_rollup_1tfi5_45", uw = "_tools_1tfi5_53", mw = "_swatch_1tfi5_101", hw = "_mark_1tfi5_108", ke = {
  head: ow,
  identity: lw,
  titleRow: iw,
  title: sw,
  key: cw,
  rollup: dw,
  tools: uw,
  swatch: mw,
  mark: hw
}, qt = "initials:";
function ww(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ee(e)} loaded this week`;
}
function fw(e) {
  const a = [ww(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ee(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function _w(e) {
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ l("span", { title: e.inFlightHint, children: [
      ee(e.inFlight),
      " in flight"
    ] }),
    " · ",
    fw(e)
  ] });
}
function vw(e) {
  return e.startsWith(qt) ? e.slice(qt.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function bw({ markRef: e, streamStep: a }) {
  const n = { "--stream": pe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ke.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: vw(e) }) : /* @__PURE__ */ t("span", { className: ke.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function pw({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function gR({
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
        /* @__PURE__ */ t(bw, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ke.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ke.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ke.rollup, "aria-live": "polite", children: _w(a) })
    ] }),
    /* @__PURE__ */ l("div", { className: ke.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(pw, { owners: o, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(it, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const gw = "_head_1sejb_14", yw = "_line_1sejb_15", Nw = "_cHandle_1sejb_36", kw = "_cName_1sejb_41", $w = "_nameLine_1sejb_49", Cw = "_cLabel_1sejb_56", Sw = "_cCap_1sejb_61", Rw = "_cShown_1sejb_66", Tw = "_name_1sejb_49", xw = "_noCap_1sejb_88", Lw = "_state_1sejb_102", Aw = "_handle_1sejb_111", Ew = "_sub_1sejb_137", P = {
  head: gw,
  line: yw,
  cHandle: Nw,
  cName: kw,
  nameLine: $w,
  cLabel: Cw,
  cCap: Sw,
  cShown: Rw,
  name: Tw,
  noCap: xw,
  state: Lw,
  handle: Aw,
  sub: Ew
}, Iw = "can't be hidden or collapsed", Mw = "terminal · counted, not a column";
function yR() {
  return /* @__PURE__ */ l("div", { className: P.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: P.cHandle }),
    /* @__PURE__ */ t("span", { className: P.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: P.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: P.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: P.cShown, children: "Shown" })
  ] });
}
function qw(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Bw(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Bt(e) {
  return e.gate ? Iw : e.terminal ? Mw : Bw(e.agentsMounted);
}
function Pw(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function jw({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: P.cName, children: [
    /* @__PURE__ */ l("span", { className: P.nameLine, children: [
      /* @__PURE__ */ t("span", { className: P.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Bt(e) && /* @__PURE__ */ t("span", { className: P.sub, children: Bt(e) })
  ] });
}
function Dw(e) {
  return e === void 0 ? "" : String(e);
}
function Ow(e) {
  return e === "" ? void 0 : Number(e);
}
function Hw({ name: e, onReorder: a }) {
  const n = Pe();
  return /* @__PURE__ */ t("span", { className: P.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: P.handle,
      "aria-label": `Reorder ${e}`,
      disabled: n !== null,
      title: n == null ? void 0 : n.reason,
      "aria-describedby": n == null ? void 0 : n.reasonId,
      onKeyDown: (r) => !n && Pw(r, a),
      children: "⠿"
    }
  ) });
}
function Fw({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${P.cCap} ${P.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: P.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Dw(a.cap), onChange: (r) => n({ ...a, cap: Ow(r) }) }) });
}
function Ww({ stage: e, config: a, onChange: n }) {
  const r = Pe() !== null, o = qw(e, a.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ l("span", { className: P.cShown, children: [
    /* @__PURE__ */ t(Ge, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ t("span", { className: P.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!o.shown), children: o.state })
  ] });
}
function zw(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function NR({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: P.line, "data-kind": zw(e), children: [
    /* @__PURE__ */ t(Hw, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(jw, { stage: e }),
    /* @__PURE__ */ t("span", { className: P.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (o) => n({ ...a, label: o }) }) }),
    /* @__PURE__ */ t(Fw, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(Ww, { stage: e, config: a, onChange: n })
  ] });
}
const Kw = "_body_8qsv9_2", Gw = "_head_8qsv9_9", Uw = "_summary_8qsv9_19", Vw = "_block_8qsv9_20", Yw = "_actionsBlock_8qsv9_21", Jw = "_title_8qsv9_41", Xw = "_note_8qsv9_46", Qw = "_k_8qsv9_51", Zw = "_kv_8qsv9_58", ef = "_row_8qsv9_64", af = "_label_8qsv9_75", tf = "_value_8qsv9_84", nf = "_quote_8qsv9_90", rf = "_actions_8qsv9_21", of = "_resolve_8qsv9_111", j = {
  body: Kw,
  head: Gw,
  summary: Uw,
  block: Vw,
  actionsBlock: Yw,
  title: Jw,
  note: Xw,
  k: Qw,
  kv: Zw,
  row: ef,
  label: af,
  value: tf,
  quote: nf,
  actions: rf,
  resolve: of
};
function lf(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function sf(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function cf(e) {
  const a = ua(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function df(e) {
  return (e ?? []).map((a, n) => [a.label, a.value, `fact-${n}`]);
}
function uf(e, a, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...qa(cf(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...lf(e),
    ...df(n),
    ...sf(e, a)
  ];
}
function mf({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: j.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: j.k, children: a }),
    e
  ] });
}
function hf(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function wf({ item: e, showKey: a }) {
  const n = hf(e);
  return !a && !n ? null : /* @__PURE__ */ l("div", { className: j.head, children: [
    a && /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ t(h, { role: n.role, label: n.label })
  ] });
}
function ff({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: j.block, children: [
    /* @__PURE__ */ t("p", { className: j.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: j.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: j.note, children: e.agentMeta })
  ] }) : null;
}
function kR({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: o, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const m = N(), _ = uf(e, o, d);
  return /* @__PURE__ */ t(na, { kind: "drawer", labelledBy: m, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: j.body, children: [
    /* @__PURE__ */ t(wf, { item: e, showKey: u }),
    /* @__PURE__ */ l("div", { className: j.summary, children: [
      /* @__PURE__ */ t("h2", { className: j.title, id: m, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: j.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: j.kv, children: _.map(([w, y, L]) => /* @__PURE__ */ l("div", { className: j.row, children: [
      /* @__PURE__ */ t("dt", { className: j.label, children: w }),
      /* @__PURE__ */ t("dd", { className: j.value, children: y })
    ] }, L ?? w)) }),
    /* @__PURE__ */ t(ff, { item: e }),
    /* @__PURE__ */ l("div", { className: j.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: j.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: j.note, children: c })
    ] }),
    /* @__PURE__ */ t(mf, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const _f = "_root_3azmy_2", vf = "_list_3azmy_7", bf = "_item_3azmy_12", pf = "_box_3azmy_18", gf = "_text_3azmy_23", yf = "_note_3azmy_28", Ye = {
  root: _f,
  list: vf,
  item: bf,
  box: pf,
  text: gf,
  note: yf
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
const Nf = "_rail_znbbp_2", kf = "_k_znbbp_11", $f = "_head_znbbp_19", Cf = "_section_znbbp_25", Sf = "_card_znbbp_39", Rf = "_strip_znbbp_46", Tf = "_skeleton_znbbp_60", xf = "_skeletonLabel_znbbp_74", Lf = "_bar_znbbp_80", Af = "_note_znbbp_89", me = {
  rail: Nf,
  k: kf,
  head: $f,
  section: Cf,
  card: Sf,
  strip: Rf,
  skeleton: Tf,
  skeletonLabel: xf,
  bar: Lf,
  note: Af
};
function Ef(e) {
  return (a) => e == null ? void 0 : e(a);
}
function za({ title: e, children: a }) {
  return /* @__PURE__ */ l("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function If({ column: e, count: a }) {
  return /* @__PURE__ */ l("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function Mf({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ t(aw, { column: o, items: a.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, o.id));
}
function qf(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(Mf, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(If, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function $R(e) {
  const a = Ef(e.onOpen), n = Ln(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(za, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(ja, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ l(za, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(qf, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(za, { title: "Effect of this config", children: /* @__PURE__ */ t(Da, { items: e.effects, density: "compact" }) })
  ] });
}
function Bf(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function Pf(e) {
  return Math.ceil(e.length / 2);
}
function jf(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function An(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Df(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const o = An(e);
  o !== void 0 && n(o), r(jf(e.type));
}
function Of(e, a, n, r, o) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Df(i, n, r, o));
  }, [e, a, n, r, o]);
}
function Hf(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Ff(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Wf(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function zf(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + z.height.card + " + " + z.height.cardRow + " * " + String(Pf(a ?? [])) + ")"
  };
}
function Kf(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Gf(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: ne(e.cost) }) : null;
}
function Uf(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function Vf(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function Yf(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function Jf(e, a) {
  return a === void 0 ? e : Bf(e, a.ref);
}
function Xf(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ia(e) {
  return e === !0 ? "true" : void 0;
}
function En(e) {
  const a = e.item, n = a.run, r = n !== void 0, o = f(null), i = va(o), s = f(/* @__PURE__ */ new Set()), [c, d] = p(Hf(a));
  Of(e.feed, a.key, s, d, i);
  const u = Ff(a, r), m = Wf(a, n), _ = zf(a, e.fields), w = Yf(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...Xf(e),
      className: "ward-workcard",
      "data-flagged": ia(a.flagged),
      "data-selected": ia(e.selected),
      style: _,
      ref: Jf(o, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Kf(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: u.role, label: u.label }),
          Gf(a, e.fields),
          Uf(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          Vf(n, c, e.connection, a.changedAt),
          w !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: w, children: w }) : null
        ] })
      ]
    }
  ) });
}
function Qf({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Zf(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function e_(e, a, n) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function a_(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(Qf, { count: e.items.length, cap: e.column.cap });
}
function t_(e, a) {
  return e.roving ?? a;
}
function n_(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function r_(e, a) {
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
function o_(e) {
  const a = N(), n = La({ orientation: "vertical" }), r = t_(e, n), o = Zf(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ia(o), "data-gate": ia(e.column.gate), children: [
    e_(e.column, e.items.length, a),
    a_(e, o),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...n_(e, n), children: r_(e, r) })
  ] });
}
function l_(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function i_(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function s_(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function CR(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: l_(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      i_(e),
      s_(e.onConfigure),
      /* @__PURE__ */ t(it, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function c_(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function d_(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Ge, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Ge, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function u_(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(T, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function SR(e) {
  const a = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": ia(c_(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: d_(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(on, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    u_(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function RR(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(En, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(o_, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function m_(e, a) {
  const n = An(e);
  n !== void 0 && a(n);
}
function h_(e, a, n) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => m_(r, n));
  }, [e, a, n]);
}
function w_(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function f_(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ne(e.cost)]), a;
}
function __(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function v_(e, a) {
  return /* @__PURE__ */ l(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function TR(e) {
  var s;
  const a = e.item, n = a.run, [r, o] = p((s = a.run) == null ? void 0 : s.lastStep);
  h_(e.feed, a.key, o);
  const i = [...w_(a), ...f_(a)];
  return /* @__PURE__ */ l(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      __(n, r)
    ] }),
    v_(a, e.actions)
  ] });
}
const b_ = "_card_54446_3", p_ = "_head_54446_30", g_ = "_mark_54446_38", y_ = "_name_54446_50", N_ = "_chips_54446_71", k_ = "_description_54446_77", $_ = "_run_54446_82", C_ = "_sep_54446_91", S_ = "_facts_54446_96", R_ = "_fact_54446_96", T_ = "_factLabel_54446_109", x_ = "_factValue_54446_113", re = {
  card: b_,
  head: p_,
  mark: g_,
  name: y_,
  chips: N_,
  description: k_,
  run: $_,
  sep: C_,
  facts: S_,
  fact: R_,
  factLabel: T_,
  factValue: x_
}, L_ = { live: "done", draft: "running", paused: "meta" };
function A_(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function E_({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: L_[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function I_({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: re.description, children: e });
}
function M_({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(xe, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function q_({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ l("div", { className: re.fact, children: [
    /* @__PURE__ */ t("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function B_(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function P_({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: o, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": d,
      className: A_(s),
      style: c,
      "data-selected": d,
      "data-paused": B_(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ l("h3", { className: re.head, children: [
          /* @__PURE__ */ t("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${re.name} ward-rowlink ward-target`, href: H(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(I_, { description: e.description }),
        /* @__PURE__ */ t(M_, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ t(E_, { versions: e.versions }),
        /* @__PURE__ */ t(q_, { facts: i })
      ]
    }
  );
}
const j_ = "_list_4dcyc_2", D_ = "_row_4dcyc_11", O_ = "_head_4dcyc_23", H_ = "_id_4dcyc_30", F_ = "_lock_4dcyc_35", W_ = "_reason_4dcyc_41", z_ = "_remove_4dcyc_46", K_ = "_clauses_4dcyc_50", G_ = "_clause_4dcyc_50", U_ = "_label_4dcyc_64", V_ = "_cell_4dcyc_71", Y_ = "_value_4dcyc_76", ie = {
  list: j_,
  row: D_,
  head: O_,
  id: H_,
  lock: F_,
  reason: W_,
  remove: z_,
  clauses: K_,
  clause: G_,
  label: U_,
  cell: V_,
  value: Y_
}, In = Te(!1);
function xR({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(In.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function J_({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => n(e.key, o) });
}
function X_({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ie.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ie.reason, children: e })
  ] });
}
function Q_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ l("span", { className: ie.head, children: [
    /* @__PURE__ */ t("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(X_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ie.remove, children: /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Pt(e, a) {
  return e.locked ? void 0 : a;
}
function LR({ rule: e, onChange: a, onRemove: n }) {
  if (!Re(In)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Pt(e, a);
  return /* @__PURE__ */ l("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Q_, { rule: e, onRemove: Pt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ie.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ie.clause, children: [
      /* @__PURE__ */ t("dt", { className: ie.label, children: o.label }),
      /* @__PURE__ */ t("dd", { className: ie.cell, children: /* @__PURE__ */ t(J_, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const Z_ = "_ladder_n8eeo_2", ev = "_cell_n8eeo_7", av = "_empty_n8eeo_26", tv = "_name_n8eeo_34", nv = "_holder_n8eeo_40", rv = "_request_n8eeo_46", ov = "_swatches_n8eeo_51", lv = "_swatch_n8eeo_51", iv = "_tilesFrame_n8eeo_78", sv = "_tiles_n8eeo_78", cv = "_tile_n8eeo_78", dv = "_bar_n8eeo_117", uv = "_hex_n8eeo_128", mv = "_note_n8eeo_138", E = {
  ladder: Z_,
  cell: ev,
  empty: av,
  name: tv,
  holder: nv,
  request: rv,
  swatches: ov,
  swatch: lv,
  tilesFrame: iv,
  tiles: sv,
  tile: cv,
  bar: dv,
  hex: uv,
  note: mv
}, AR = "not validated yet, pending a CVD matrix and dark stepping";
function hv(e) {
  return e.reserved ? "reserved" : sa(e.step) ? "validated" : "partial";
}
function Mn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function wv(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function fv({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(je, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function _v(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function vv(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const jt = (e) => String(e).padStart(2, "0");
function bv(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? Mn(e, void 0);
}
function pv({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${jt(e)}` : Hr(e) }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: r ? n : `Step ${jt(e)} · ${n}` })
  ] });
}
function gv({ step: e, value: a, taken: n, onChange: r, presentation: o, disabled: i }) {
  const s = hv(e), c = Mn(s, n), d = c !== "free", u = d || i, m = a === e.step, _ = e.name ?? `Step ${e.step}`, w = () => {
    u || r(e.step);
  }, y = `${_} · ${o === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...vv(d, m, u), "data-validation": s, style: wv(e, s), onClick: w, onKeyDown: (q) => _v(q, w) }, label: y, name: _, holder: c, validation: s, note: bv(s, n, m), step: e.step };
}
const yv = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(pv, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(fv, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Nv(e) {
  return yv[e.presentation](gv(e));
}
function kv(e) {
  for (const a of e)
    if (!a.reserved && !Aa(a.step)) throw new Error("colour ladder renders token steps only");
}
function $v() {
  return /* @__PURE__ */ l("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Cv(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Sv = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function Rv() {
  return /* @__PURE__ */ l("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Tv = { list: $v, swatches: () => null, tiles: Rv };
function xv(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function qn(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  kv(e.steps);
  const r = Cv(e), o = Tv[r], i = /* @__PURE__ */ l(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(Nv, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(o, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...xv(e.disabled === !0), className: `${Sv[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: E.tiles, children: i }) : i });
}
const Lv = "_rail_s06lm_2", Av = "_section_s06lm_12", Ev = "_sectionFlush_s06lm_22", Iv = "_head_s06lm_26", Mv = "_headLabel_s06lm_34", qv = "_sample_s06lm_42", Bv = "_sampleLabel_s06lm_47", Pv = "_sampleTitle_s06lm_54", jv = "_sampleMeta_s06lm_59", Dv = "_trace_s06lm_65", Ov = "_traceHead_s06lm_70", Hv = "_steps_s06lm_78", Fv = "_step_s06lm_78", Wv = "_stepTitle_s06lm_97", zv = "_hollow_s06lm_107", Kv = "_stepBody_s06lm_115", Gv = "_stepDetail_s06lm_127", Uv = "_publish_s06lm_132", Vv = "_reason_s06lm_138", Yv = "_note_s06lm_143", Jv = "_reveal_s06lm_148", k = {
  rail: Lv,
  section: Av,
  sectionFlush: Ev,
  head: Iv,
  headLabel: Mv,
  sample: qv,
  sampleLabel: Bv,
  sampleTitle: Pv,
  sampleMeta: jv,
  trace: Dv,
  traceHead: Ov,
  steps: Hv,
  step: Fv,
  stepTitle: Wv,
  hollow: zv,
  stepBody: Kv,
  stepDetail: Gv,
  publish: Uv,
  reason: Vv,
  note: Yv,
  reveal: Jv
}, Dt = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Xv = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Qv = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Zv = { notSimulated: "not simulated", running: "running" };
function eb(e) {
  return e.presentation === "foundry";
}
function ab(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function tb(e, a) {
  var r;
  const n = Xv[e.status];
  return n !== void 0 ? n : ((r = a.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function nb(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function rb(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function ob(e) {
  if (nb(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function lb(e) {
  const [a, n] = p(!1);
  S(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function ib(e) {
  const a = Zv[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(je, { size: 6, kind: Qv[e.kind], label: e.kind });
}
function sb(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function cb(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function db(e) {
  const { step: a } = e;
  return /* @__PURE__ */ l(lb, { kind: a.kind, children: [
    /* @__PURE__ */ t(ib, { kind: a.kind }),
    /* @__PURE__ */ l("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(sb, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(cb, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function ub(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function Bn(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: ub(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(db, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function mb(e) {
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
function hb(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function wb(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ne(e.run.cost), label: "Cost" }, { value: e.run.turns ? Xt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Ba, { divided: !0, cells: a }) });
}
function fb(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ne(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Xt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function _b(e) {
  const a = fb(e.run);
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
function vb(e) {
  return /* @__PURE__ */ l("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(Pn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function bb(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(Pn, { reason: e.reason, onPublish: e.onPublish }) });
}
function jn(e) {
  return /* @__PURE__ */ l("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: Dt[e.run.status].role, label: Dt[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function pb(e, a) {
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
function gb(e) {
  var n;
  rb(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(jn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(mb, { sample: e.run.sample }),
    /* @__PURE__ */ t(Bn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(wb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist }) }),
    /* @__PURE__ */ t(vb, { reason: ab(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function yb(e) {
  var r;
  const a = pb(e.run, e.feed);
  ob(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(jn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(hb, { sample: e.run.sample }),
    /* @__PURE__ */ t(Bn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(_b, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(bb, { reason: tb(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function ER(e) {
  return eb(e) ? /* @__PURE__ */ t(yb, { ...e }) : /* @__PURE__ */ t(gb, { ...e });
}
const Nb = "_list_142ip_3", kb = "_row_142ip_9", $b = "_condition_142ip_18", Cb = "_action_142ip_24", pa = {
  list: Nb,
  row: kb,
  condition: $b,
  action: Cb
}, Dn = Te(!1);
function IR({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(Dn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: pa.list, "aria-label": a, children: e }) });
}
function MR({ rule: e }) {
  if (!Re(Dn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: pa.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: pa.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: pa.action, children: e.then })
  ] });
}
const Sb = "_move_tmppt_3", Rb = {
  move: Sb
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
function Tb(e) {
  return e === "up" ? "down" : "up";
}
function xb(e, a) {
  const n = Ot(e, a.id, a.direction) ?? Ot(e, a.id, Tb(a.direction));
  n == null || n.focus();
}
function Fn() {
  const e = f(null), [a, n] = p(null), [r, o] = p("");
  return S(() => {
    e.current !== null && a !== null && xb(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), o(c);
  } };
}
function Wn({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Ca({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${Rb.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const Lb = "_body_1jd1i_2", Ab = "_title_1jd1i_8", Eb = "_section_1jd1i_13", Ib = "_legend_1jd1i_18", Mb = "_stages_1jd1i_26", qb = "_stage_1jd1i_26", Bb = "_stageIndex_1jd1i_44", Pb = "_stageName_1jd1i_50", jb = "_footer_1jd1i_59", Db = "_note_1jd1i_66", Ob = "_reason_1jd1i_71", Hb = "_actions_1jd1i_76", Fb = "_webHead_1jd1i_83", Wb = "_kicker_1jd1i_92", zb = "_webTitle_1jd1i_99", Kb = "_webBody_1jd1i_105", Gb = "_webSection_1jd1i_109", Ub = "_sectionHead_1jd1i_121", Vb = "_sectionNote_1jd1i_129", Yb = "_formLabel_1jd1i_134", Jb = "_identityRow_1jd1i_139", Xb = "_nameCell_1jd1i_145", Qb = "_keyCell_1jd1i_150", Zb = "_colourCell_1jd1i_154", ep = "_colourStatus_1jd1i_161", ap = "_webStages_1jd1i_166", tp = "_webStageList_1jd1i_172", np = "_webStage_1jd1i_166", rp = "_webIndex_1jd1i_191", op = "_webStageName_1jd1i_196", lp = "_webMoves_1jd1i_201", ip = "_addStage_1jd1i_215", sp = "_addStageButton_1jd1i_223", cp = "_addStageNote_1jd1i_231", dp = "_webFooter_1jd1i_236", up = "_webFooterNotes_1jd1i_244", mp = "_webNote_1jd1i_251", v = {
  body: Lb,
  title: Ab,
  section: Eb,
  legend: Ib,
  stages: Mb,
  stage: qb,
  stageIndex: Bb,
  stageName: Pb,
  footer: jb,
  note: Db,
  reason: Ob,
  actions: Hb,
  webHead: Fb,
  kicker: Wb,
  webTitle: zb,
  webBody: Kb,
  webSection: Gb,
  sectionHead: Ub,
  sectionNote: Vb,
  formLabel: Yb,
  identityRow: Jb,
  nameCell: Xb,
  keyCell: Qb,
  colourCell: Zb,
  colourStatus: ep,
  webStages: ap,
  webStageList: tp,
  webStage: np,
  webIndex: rp,
  webStageName: op,
  webMoves: lp,
  addStage: ip,
  addStageButton: sp,
  addStageNote: cp,
  webFooter: dp,
  webFooterNotes: up,
  webNote: mp
}, hp = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], zn = "not in catalogue";
function wp(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${zn}` }, ...n];
}
function fp({ stage: e, index: a, catalogue: n, onName: r }) {
  const o = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${zn}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: wp(n, e.name), invalid: i, onChange: r });
}
function Kn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function _p(e) {
  const a = f([]), n = f(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function vp({ id: e, stage: a, index: n, total: r, catalogue: o, onReplace: i, onMove: s }) {
  const c = Kn(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: v.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: v.webStageName, children: /* @__PURE__ */ t(fp, { stage: a, index: n, catalogue: o, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: hp, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ l("span", { className: v.webMoves, children: [
      n > 0 && /* @__PURE__ */ t(Ca, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t(Ca, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function bp({ stages: e, onChange: a, catalogue: n }) {
  const r = _p(e.length), o = Fn(), i = (c, d) => {
    const u = On(c, d);
    r.current = Xa(r.current, c, u), o.moved({ id: r.current[u], direction: d }, Hn(Kn(e[c], c), u, e.length)), a(Xa(e, c, u));
  }, s = (c, d) => a(e.map((u, m) => m === c ? d : u));
  return /* @__PURE__ */ l("div", { className: v.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: o.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(vp, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(Wn, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: v.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: v.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const pp = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], gp = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], yp = "A new stream starts as a draft. Nothing runs on it until you publish it.", Np = "Create is disabled: name the stream and give it a key first.", kp = "reorder with the ↑ ↓ buttons · min 2";
function ct(e, a) {
  return !e.reserved && sa(e.step) && a[e.step] === void 0;
}
function $p(e, a) {
  const n = e.find((r) => ct(r, a));
  return n ? n.step : 1;
}
function Cp({ stages: e, onMove: a }) {
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
function Sp({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ l("div", { className: v.footer, children: [
    /* @__PURE__ */ t("p", { className: v.note, children: yp }),
    e && /* @__PURE__ */ t("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: v.actions, children: [
      /* @__PURE__ */ t(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Rp(e, a) {
  return e !== "" && a !== "" ? null : Np;
}
function Tp(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: o = gp, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [m, _] = p(""), [w, y] = p(""), [L, q] = p(a[0].value), [oe, Le] = p(() => $p(n, r)), [ae, Ue] = p(e.stages ?? pp), [Ve, R] = p(o[0].value), G = { name: m, key: w, streamStep: oe, owner: L, stages: ae, policy: Ve }, ge = Rp(m, w);
  return /* @__PURE__ */ t(na, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ l("div", { className: v.body, children: [
    /* @__PURE__ */ t("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Stream name", value: m, onChange: _ }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Key", value: w, onChange: y, mono: !0 }),
      /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: L, onChange: q, options: a })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ t(qn, { label: "Stream colour", steps: n, value: oe, onChange: Le, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ t(Cp, { stages: ae, onMove: (De, vr) => Ue(Xa(ae, De, vr)) })
    ] }),
    /* @__PURE__ */ t(Sn, { legend: "Loop policy", options: o, value: Ve, onChange: R }),
    /* @__PURE__ */ t(Sp, { reason: ge, onCreate: () => i(G), onDraft: () => s(G) })
  ] }) });
}
const Gn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], xp = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Lp(e, a, n, r, o, i) {
  var c;
  const s = ((c = Gn.find((d) => d.value === o)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function Ap(e, a) {
  return Ep(e) && Ip(e, a) && Mp(e);
}
function Ep(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Ip(e, a) {
  return e.colourStep === null || ct({ step: e.colourStep }, a);
}
function Mp(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function qp(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : ct({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Bp({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function Pp({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: v.webFooter, children: [
    /* @__PURE__ */ l("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ t(Bp, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: v.reason, children: xp })
    ] }),
    o && /* @__PURE__ */ t(b, { variant: "secondary", onClick: () => o(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function jp({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: v.webHead, children: [
    /* @__PURE__ */ t("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function Dp({ name: e, setName: a, streamKey: n, setKey: r, colour: o, owner: i }) {
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
function Op(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [o, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [m, _] = p(null), [w, y] = p("relay"), [L, q] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = Lp(o, s, d, m, w, L), Le = Ap(oe, r), ae = L.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ue = /* @__PURE__ */ l("div", { className: v.colourCell, children: [
    /* @__PURE__ */ t("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(qn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: _, takenBy: r })
  ] }), Ve = /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t("p", { className: v.colourStatus, "data-colour-status": "", children: qp(m, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ l(na, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(jp, { titleId: n }),
    /* @__PURE__ */ l("div", { className: v.webBody, children: [
      /* @__PURE__ */ t(Dp, { name: o, setName: i, streamKey: s, setKey: c, colour: Ue, owner: Ve }),
      /* @__PURE__ */ l("section", { className: v.webSection, children: [
        /* @__PURE__ */ l("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: v.sectionNote, children: kp })
        ] }),
        /* @__PURE__ */ t(bp, { stages: L, onChange: q })
      ] }),
      /* @__PURE__ */ t("section", { className: v.webSection, children: /* @__PURE__ */ t(Sn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: w, options: Gn, onChange: y }) }),
      /* @__PURE__ */ t(Pp, { ready: Le, draft: oe, agentStage: ae, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function qR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Op, { ...e }) : /* @__PURE__ */ t(Tp, { ...e });
}
const Hp = "_row_bs8hc_2", Fp = "_cell_bs8hc_6", Wp = "_condition_bs8hc_11", zp = "_action_bs8hc_18", Kp = "_contract_bs8hc_24", Gp = "_contractCondition_bs8hc_33", Up = "_contractAction_bs8hc_39", Q = {
  row: Hp,
  cell: Fp,
  condition: Wp,
  action: zp,
  contract: Kp,
  contractCondition: Gp,
  contractAction: Up
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
function Vp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: Q.row, children: [
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t("span", { className: Q.condition, title: Sa(e, r), children: Sa(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: dt(e, a, n) })
  ] });
}
function Yp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: Q.row, children: [
    /* @__PURE__ */ l("td", { className: Q.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Q.condition, children: Sa(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: dt(e, a, n) })
  ] });
}
function Jp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: Q.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Q.contractCondition, children: Sa(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Q.contractAction, children: dt(e, a, n, !0) })
  ] });
}
const Xp = { two: Yp, four: Vp, contract: Jp };
function BR(e) {
  var n;
  if (!Un.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Xp[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const Qp = "_column_11id3_2", Zp = "_head_11id3_17", eg = "_index_11id3_23", ag = "_name_11id3_29", tg = "_meta_11id3_38", ng = "_mono_11id3_43", rg = "_gate_11id3_50", og = "_reviewersLabel_11id3_57", lg = "_reviewers_11id3_57", ig = "_reviewer_11id3_57", sg = "_agents_11id3_74", cg = "_workflowColumn_11id3_79", dg = "_workflowHead_11id3_96", ug = "_stageRow_11id3_102", mg = "_stageLabel_11id3_109", hg = "_workflowTitle_11id3_116", wg = "_workflowMeta_11id3_122", fg = "_workflowGate_11id3_127", _g = "_gateNote_11id3_135", vg = "_cardNote_11id3_140", bg = "_reviewerList_11id3_145", pg = "_reviewerRow_11id3_151", gg = "_reviewerMark_11id3_157", yg = "_reviewerName_11id3_167", Ng = "_terminalCard_11id3_173", kg = "_terminalCount_11id3_182", $g = "_workflowAgents_11id3_188", Cg = "_mount_11id3_194", C = {
  column: Qp,
  head: Zp,
  index: eg,
  name: ag,
  meta: tg,
  mono: ng,
  gate: rg,
  reviewersLabel: og,
  reviewers: lg,
  reviewer: ig,
  agents: sg,
  workflowColumn: cg,
  workflowHead: dg,
  stageRow: ug,
  stageLabel: mg,
  workflowTitle: hg,
  workflowMeta: wg,
  workflowGate: fg,
  gateNote: _g,
  cardNote: vg,
  reviewerList: bg,
  reviewerRow: pg,
  reviewerMark: gg,
  reviewerName: yg,
  terminalCard: Ng,
  terminalCount: kg,
  workflowAgents: $g,
  mount: Cg
}, Sg = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function ut(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Vn(e) {
  return `${Math.round(e * 100)}%`;
}
function Rg({ stage: e }) {
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
function Tg({ stage: e }) {
  return /* @__PURE__ */ t(Ba, { cells: [
    { value: ee(e.count), label: "In stage" },
    { value: ut(e.closedThisWeek, ee), label: "Closed this week" }
  ] });
}
function xg({ stage: e, titleId: a }) {
  return /* @__PURE__ */ l("header", { className: C.head, children: [
    /* @__PURE__ */ t("span", { className: C.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: C.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: Sg[e.kind] })
  ] });
}
function Lg({ stage: e }) {
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
function Ag({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(Rg, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(Tg, { stage: e }) : null;
}
function Eg({ onMount: e }) {
  return e ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Ig({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const o = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: C.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(xg, { stage: e, titleId: o }),
    /* @__PURE__ */ t(Lg, { stage: e }),
    /* @__PURE__ */ t(Ag, { stage: e }),
    /* @__PURE__ */ t("div", { className: C.agents, children: a.map((s) => /* @__PURE__ */ t(P_, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(Eg, { onMount: n })
  ] });
}
const Mg = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function qg({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: C.reviewerList, children: e.map((a, n) => /* @__PURE__ */ l("li", { className: C.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: C.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: C.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function Bg({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: C.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: C.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(qg, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: C.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Vn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Pg(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function jg({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: C.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: C.terminalCount, children: ut(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: C.cardNote, children: Pg(e.rolledBackThisWeek) })
  ] });
}
function Dg(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Og(e) {
  if (e.kind === "terminal") return `${ut(e.closedThisWeek)} this week`;
  const a = Dg(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Hg({ stage: e, titleId: a }) {
  const n = Mg[e.kind];
  return /* @__PURE__ */ l("header", { className: C.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: C.stageRow, children: [
      /* @__PURE__ */ l("span", { className: C.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: C.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: C.workflowMeta, children: Og(e) })
  ] });
}
function Fg(e) {
  return e === "entry" || e === "agent";
}
function Wg({ stage: e, onMount: a }) {
  return a === void 0 || !Fg(e.kind) ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", className: C.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function zg({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ l("section", { className: C.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Hg, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(Bg, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(jg, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: C.workflowAgents, children: a }),
    /* @__PURE__ */ t(Wg, { stage: e, onMount: n })
  ] });
}
function Kg(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function PR(e) {
  return Kg(e) ? /* @__PURE__ */ t(zg, { ...e }) : /* @__PURE__ */ t(Ig, { ...e });
}
const Gg = "_row_1tdra_6", Ug = "_name_1tdra_12", Vg = "_compactRow_1tdra_13", Yg = "_compactName_1tdra_13", Jg = "_cell_1tdra_30", Xg = "_chain_1tdra_45", Qg = "_owner_1tdra_51", Zg = "_mono_1tdra_57", ey = "_compactCell_1tdra_79", ay = "_stack_1tdra_96", ty = "_stat_1tdra_103", ny = "_identityLine_1tdra_110", ry = "_identity_1tdra_110", oy = "_ownerLine_1tdra_140", ly = "_link_1tdra_160", iy = "_gateMark_1tdra_166", sy = "_emptyChain_1tdra_171", cy = "_arrow_1tdra_177", dy = "_muted_1tdra_182", uy = "_define_1tdra_187", my = "_statValue_1tdra_194", hy = "_policyId_1tdra_200", wy = "_sub_1tdra_205", g = {
  row: Gg,
  name: Ug,
  compactRow: Vg,
  compactName: Yg,
  cell: Jg,
  chain: Xg,
  owner: Qg,
  mono: Zg,
  compactCell: ey,
  stack: ay,
  stat: ty,
  identityLine: ny,
  identity: ry,
  ownerLine: oy,
  link: ly,
  gateMark: iy,
  emptyChain: sy,
  arrow: cy,
  muted: dy,
  define: uy,
  statValue: my,
  policyId: hy,
  sub: wy
};
function Yn(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: o, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: o, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function fy(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function _y(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Jn(e) {
  return `${ee(e)} ${e === 1 ? "member" : "members"}`;
}
function vy(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Jn(e.members)}`;
}
function by(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ l("span", { className: g.stack, children: [
    /* @__PURE__ */ l("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: H(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: vy(e) })
  ] }) });
}
function Xn({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ l(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function py(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = ua(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function gy({ stages: e, streamStep: a }) {
  const n = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((o, i) => /* @__PURE__ */ l("span", { className: g.link, children: [
    /* @__PURE__ */ t(Xn, { name: o.name, gate: o.gate === !0, look: py(i, n, a), size: "tag" }),
    i === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${i}`)) });
}
function yy(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ l("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : gy(e) });
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
function Ny(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function ky(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function $y({ stream: e, href: a, presentation: n }) {
  const r = _y(n.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, onClick: Yn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    by(e, a),
    yy(e),
    Ft(ky(e.agents), e.agents === void 0 ? void 0 : fy(e.agents), "—"),
    Ny(e.policy),
    Ft(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function Cy(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function jR(e) {
  if (Cy(e)) return $y(e);
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
const Sy = "_row_2u4ll_2", Ry = "_name_2u4ll_16", Ty = "_scope_2u4ll_24", Ra = {
  row: Sy,
  name: Ry,
  scope: Ty
};
function mt(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function xy(e) {
  return e === void 0 ? `${Ra.row} ward-toolrow` : `${Ra.row} ward-toolrow ${e}`;
}
function Ly(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Ay({ id: e, reasonId: a, tool: n, state: r, onChange: o }) {
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
function Ey({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: mt(e) });
}
function Iy({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${Ra.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function My(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function DR({ tool: e, onChange: a, presentation: n }) {
  const r = N(), o = N(), i = Ly(e, n), s = My(n);
  return /* @__PURE__ */ l(s, { className: xy(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Ay, { id: r, reasonId: o, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${Ra.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(Iy, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ t(Ey, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const qy = "_strip_4ppv9_2", By = "_well_4ppv9_11", Py = "_head_4ppv9_18", jy = "_name_4ppv9_24", Dy = "_chart_4ppv9_32", Oy = "_segment_4ppv9_38", Hy = "_detailedChart_4ppv9_44", Fy = "_rail_4ppv9_57", Wy = "_section_4ppv9_63", zy = "_label_4ppv9_74", Ky = "_note_4ppv9_91", K = {
  strip: qy,
  well: By,
  head: Py,
  name: jy,
  chart: Dy,
  segment: Oy,
  detailedChart: Hy,
  rail: Fy,
  section: Wy,
  label: zy,
  note: Ky
}, Gy = "No item in flight to preview.", Uy = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Vy = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Qa = [1, 2, 3, 4, 5, 6], Ta = 100;
function Yy(e, a) {
  return a.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function Jy({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: K.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Qa.map((r, o) => /* @__PURE__ */ t(
    "rect",
    {
      className: K.segment,
      x: o * Ta,
      y: "0",
      width: Ta,
      height: "8",
      fill: Yy(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Xy(e) {
  const a = e.slice(0, Qa.length);
  for (; a.length < Qa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Qy({ identities: e }) {
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
function Zy({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: K.note, children: a ?? Gy }) : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(ja, { item: { ...e, streamStep: ua(n.streamStep) }, onOpen: Zn(r), feed: null }) });
}
function eN({ draft: e }) {
  const a = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: K.head, style: a, children: [
    /* @__PURE__ */ t(je, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...qa(e.key, e.streamStep) })
  ] });
}
function aN(e) {
  const a = Xy(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ l("div", { className: K.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(fa, { label: "Board card", children: /* @__PURE__ */ t(Zy, { ...e, draft: n }) }),
    /* @__PURE__ */ t(fa, { label: "Streams index row", children: /* @__PURE__ */ t(eN, { draft: n }) }),
    /* @__PURE__ */ l(fa, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(Qy, { identities: a }),
      /* @__PURE__ */ t("p", { className: K.note, children: Uy })
    ] }),
    /* @__PURE__ */ t(fa, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: K.note, children: Vy }) })
  ] });
}
function tN({ draft: e, sample: a, streams: n, onOpen: r }) {
  const o = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: K.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: K.head, children: [
      /* @__PURE__ */ t(je, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...qa(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(ja, { item: { ...a, streamStep: e.streamStep }, onOpen: Zn(r) }) }),
    /* @__PURE__ */ t(Jy, { draft: e, streams: n })
  ] });
}
function OR(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(aN, { ...e }) : /* @__PURE__ */ t(tN, { ...e });
}
const nN = "_row_ixlg5_6", rN = "_headCell_ixlg5_10", oN = "_cell_ixlg5_11", lN = "_name_ixlg5_23", iN = "_consequence_ixlg5_29", sN = "_governed_ixlg5_36", cN = "_control_ixlg5_42", dN = "_byRole_ixlg5_48", uN = "_webControl_ixlg5_59", mN = "_webConsequence_ixlg5_65", hN = "_webGoverned_ixlg5_71", O = {
  row: nN,
  headCell: rN,
  cell: oN,
  name: lN,
  consequence: iN,
  governed: sN,
  control: cN,
  byRole: dN,
  webControl: uN,
  webConsequence: mN,
  webGoverned: hN
};
function wN({
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
function fN({ capability: e, cells: a, onChange: n }) {
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
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(wN, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function _N(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function vN({ name: e, cell: a, onChange: n }) {
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
function bN({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ l("td", { className: O.cell, children: [
      /* @__PURE__ */ t("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${O.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(vN, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webGoverned} ward-cellmeta`, children: _N(e) }) })
  ] });
}
function HR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(bN, { ...e }) : /* @__PURE__ */ t(fN, { ...e });
}
const pN = "_row_vv64h_2", gN = "_cell_vv64h_6", yN = "_name_vv64h_25", NN = "_note_vv64h_30", kN = "_webName_vv64h_41", $N = "_webMeta_vv64h_47", V = {
  row: pN,
  cell: gN,
  name: yN,
  note: NN,
  webName: kN,
  webMeta: $N
}, er = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function CN(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function SN({ component: e, onRestart: a }) {
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
function RN({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: CN(e.state) });
}
function TN({ component: e, onRestart: a }) {
  return /* @__PURE__ */ l("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { ...er[e.state] }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(RN, { component: e, onRestart: a }) })
  ] });
}
function FR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(TN, { ...e }) : /* @__PURE__ */ t(SN, { ...e });
}
const xN = "_row_jcm5k_7", LN = "_cell_jcm5k_11", AN = "_next_jcm5k_28", EN = "_headCell_jcm5k_38", IN = "_webId_jcm5k_77", MN = "_webPurpose_jcm5k_83", qN = "_webMeta_jcm5k_91", BN = "_webUrgent_jcm5k_97", F = {
  row: xN,
  cell: LN,
  next: AN,
  headCell: EN,
  webId: IN,
  webPurpose: MN,
  webMeta: qN,
  webUrgent: BN
}, PN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, jN = {
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
], DN = Object.fromEntries(ar.map((e) => [e.key, e]));
function Je({ column: e, children: a }) {
  const n = DN[e];
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
function WR() {
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
function ON({ cred: e }) {
  const a = PN[e.state];
  return /* @__PURE__ */ l("tr", { className: F.row, children: [
    /* @__PURE__ */ t(Je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Je, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Je, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Je, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: mt(e.cls) }) }),
    /* @__PURE__ */ t(Je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Je, { column: "next", children: /* @__PURE__ */ t("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function HN({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function FN({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: F.row, children: [
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(HN, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { ...jN[e.state] }) })
  ] });
}
function zR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(FN, { ...e }) : /* @__PURE__ */ t(ON, { ...e });
}
const WN = "_card_17zba_2", zN = "_head_17zba_11", KN = "_env_17zba_18", GN = "_version_17zba_25", UN = "_meta_17zba_32", VN = "_webCard_17zba_37", YN = "_webRow_17zba_47", JN = "_webTitle_17zba_55", XN = "_webLine_17zba_65", QN = "_webVersion_17zba_72", ZN = "_webMeta_17zba_77", U = {
  card: WN,
  head: zN,
  env: KN,
  version: GN,
  meta: UN,
  webCard: VN,
  webRow: YN,
  webTitle: JN,
  webLine: XN,
  webVersion: QN,
  webMeta: ZN
}, Wt = { dev: "Dev", uat: "UAT", prod: "Prod" }, tr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function ek({ env: e }) {
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
function ak(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function tk(e) {
  return /* @__PURE__ */ l("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...tr[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: ak(e) })
  ] });
}
function KR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(tk, { ...e }) : /* @__PURE__ */ t(ek, { ...e });
}
const nk = "_panel_1hmja_2", rk = "_line_1hmja_8", ok = "_actions_1hmja_14", _a = {
  panel: nk,
  line: rk,
  actions: ok
};
function GR(e) {
  return /* @__PURE__ */ l("div", { className: _a.panel, children: [
    /* @__PURE__ */ t("p", { className: _a.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: _a.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: _a.line, children: e.note ?? "" })
  ] });
}
const lk = "_upload_13fcl_2", ik = "_preview_13fcl_7", sk = "_mark_13fcl_17", ck = "_empty_13fcl_22", dk = "_actions_13fcl_28", uk = "_input_13fcl_33", mk = "_reasons_13fcl_41", hk = "_reason_13fcl_41", wk = "_accepted_13fcl_57", te = {
  upload: lk,
  preview: ik,
  mark: sk,
  empty: ck,
  actions: dk,
  input: uk,
  reasons: mk,
  reason: hk,
  accepted: wk
}, nr = 1.5, rr = 22, xa = "script elements or event handlers", Ie = "links or external references", Se = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${nr}px at ${rr}px`], fk = [Se[1], Se[2], xa, Ie], _k = /* @__PURE__ */ new Map([
  ["image", Se[1]],
  ["text", Se[2]],
  ["tspan", Se[2]],
  ["textPath", Se[2]],
  ["script", xa],
  ["foreignObject", xa],
  ["a", Ie],
  ["use", Ie],
  ["style", Ie],
  ["feImage", Ie],
  ["set", Ie]
]), vk = "http://www.w3.org/2000/svg", bk = "http://www.w3.org/2000/xmlns/", pk = /* @__PURE__ */ new Set([
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
]), gk = /* @__PURE__ */ new Set([
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
]), ht = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, yk = /url\s*\(|['"\\]/i;
function Nk() {
  return { ok: !1, reasons: [Se[1]] };
}
function or(e) {
  return e.namespaceURI === vk;
}
function kk(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && or(a) ? a : null;
  } catch {
    return null;
  }
}
function $k(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [Se[0]] : [];
}
function Ck(e) {
  return _k.get(e.localName) ?? (e.localName.startsWith("animate") ? Ie : void 0);
}
function Sk(e) {
  return yk.test(e.replace(ht, ""));
}
function Rk(e) {
  return /^on/i.test(e.localName) ? xa : e.localName === "href" || Sk(e.value) ? Ie : void 0;
}
function Tk(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(Ck(n));
    for (const r of Array.from(n.attributes)) a.add(Rk(r));
  }
  return fk.filter((n) => a.has(n));
}
function xk(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((o) => Number.isFinite(o) && o > 0), 0), r = n > 0 ? rr / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < nr;
  }) ? [Se[3]] : [];
}
function Lk(e) {
  if (e.namespaceURI === bk) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (gk.has(a) || a.startsWith("stroke"));
}
function Ak(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && or(a) && pk.has(a.localName);
}
function Ek(e, a) {
  Ak(a) ? a.nodeType === Node.ELEMENT_NODE && lr(a) : e.removeChild(a);
}
function lr(e) {
  for (const a of Array.from(e.attributes)) Lk(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) Ek(e, a);
  return e;
}
function Ik(e) {
  return Array.from(e.matchAll(ht), (a) => a[2]).filter((a) => a !== "");
}
function Mk(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function qk(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const i of Ik(o.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function Bk(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(ht, (r, o, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function Pk(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = qk(n, a);
  for (const o of n) {
    const i = r.get(o.getAttribute("id") ?? "");
    i === void 0 ? o.removeAttribute("id") : o.setAttribute("id", i), Bk(o, r);
  }
  return e;
}
function UR(e) {
  const a = kk(e);
  if (a === null) return Nk();
  const n = [...$k(a), ...Tk(a), ...xk(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(Pk(lr(a), Mk(e))) };
}
const jk = "Mark accepted.", Dk = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Ok = new Set(Zt.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function Hk(e) {
  return e !== void 0 && (Dk.test(e) || Ok.has(e)) ? e : void 0;
}
function Fk({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: te.preview, style: { "--mark": Hk(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: te.empty }) });
}
function Wk(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function zk(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Kk({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("p", { className: te.accepted, children: jk }) }) : /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: te.reason, children: a }, a)) }) });
}
function Gk({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(Kk, { result: e }) : /* @__PURE__ */ t("p", { className: `${te.result} ${Wk(e, n)}`, role: "status", children: zk(e, n) });
}
function zt(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function VR({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: o }) {
  const i = f(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const m = a(u);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ l("div", { className: te.upload, children: [
    /* @__PURE__ */ t(Fk, { current: e }),
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
    /* @__PURE__ */ t(Gk, { result: s, presentation: r })
  ] });
}
const Uk = "_row_o3t6y_7", Vk = "_cell_o3t6y_11", Yk = "_head_o3t6y_28", Jk = "_name_o3t6y_34", Xk = "_pinned_o3t6y_42", Qk = "_headCell_o3t6y_49", Zk = "_webName_o3t6y_88", e1 = "_webMeta_o3t6y_95", a1 = "_webWarn_o3t6y_103", B = {
  row: Uk,
  cell: Vk,
  head: Yk,
  name: Jk,
  pinned: Xk,
  headCell: Qk,
  webName: Zk,
  webMeta: e1,
  webWarn: a1
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
], t1 = Object.fromEntries(ir.map((e) => [e.key, e]));
function n1(e, a) {
  return `mcp.${e}.${a}`;
}
function r1(e) {
  return Object.keys(wt).includes(e);
}
function o1(e) {
  return wt[e !== void 0 && r1(e) ? e : "unknown"];
}
function ra({ column: e, children: a }) {
  const n = t1[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: B.cell,
      style: n.width ? { width: n.width } : void 0,
      "data-drop": n.dropPriority,
      "data-mono": n.mono,
      children: a
    }
  );
}
function YR() {
  return /* @__PURE__ */ t("tr", { children: ir.map((e) => /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: B.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function l1({ server: e }) {
  const a = wt[e.connection];
  return /* @__PURE__ */ l("tr", { className: B.row, children: [
    /* @__PURE__ */ l(ra, { column: "name", children: [
      /* @__PURE__ */ l("span", { className: B.head, children: [
        /* @__PURE__ */ t("span", { className: B.name, children: e.name }),
        /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: mt(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ l("span", { className: B.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(ra, { column: "connection", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(ra, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(ra, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(ra, { column: "tools", children: e.tools.map((n) => n1(e.name, n)).join(" · ") })
  ] });
}
function i1(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function s1(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function c1({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${B.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${B.webMeta} ward-cellmeta`, children: e });
}
function d1({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${B.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function u1({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function m1({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: B.row, children: [
    /* @__PURE__ */ l("td", { className: B.cell, children: [
      /* @__PURE__ */ t("span", { className: `${B.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${B.webMeta} ward-cellmeta`, children: i1(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: B.cell, children: /* @__PURE__ */ t("span", { className: `${B.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: B.cell, children: /* @__PURE__ */ t(h, { ...s1(e) }) }),
    /* @__PURE__ */ t("td", { className: B.cell, children: /* @__PURE__ */ t(c1, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: B.cell, children: /* @__PURE__ */ t(h, { ...o1(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: B.cell, children: [
      /* @__PURE__ */ t(d1, { server: e, onRestart: a }),
      /* @__PURE__ */ t(u1, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function JR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(m1, { ...e }) : /* @__PURE__ */ t(l1, { ...e });
}
const h1 = "_row_1ibo7_2", w1 = "_headCell_1ibo7_14", f1 = "_cell_1ibo7_15", _1 = "_name_1ibo7_26", v1 = "_consequence_1ibo7_32", b1 = "_reason_1ibo7_38", p1 = "_value_1ibo7_44", g1 = "_webRow_1ibo7_60", y1 = "_webSetting_1ibo7_73", N1 = "_webName_1ibo7_81", k1 = "_webConsequence_1ibo7_89", $1 = "_webControl_1ibo7_95", C1 = "_webState_1ibo7_109", S1 = "_webChip_1ibo7_114", I = {
  row: h1,
  headCell: w1,
  cell: f1,
  name: _1,
  consequence: v1,
  reason: b1,
  value: p1,
  webRow: g1,
  webSetting: y1,
  webName: N1,
  webConsequence: k1,
  webControl: $1,
  webState: C1,
  webChip: S1
}, sr = 104, cr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function R1({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Ge, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t($n, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function T1({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = N(), i = cr[n], s = n === "locked";
  return /* @__PURE__ */ l("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: o, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(R1, { control: a, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: sr }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function dr(e, a) {
  return String(e ?? a);
}
function x1(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function L1(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? dr(e.value, "—");
}
function A1({ control: e, name: a, locked: n, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(Ge, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function E1(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(A1, { ...e });
  const o = x1(a, n);
  return o !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t($n, { options: o, value: dr(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: L1(a) });
}
function I1({ setting: e, control: a, inheritance: n, reason: r, onChange: o, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ l("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ l("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(E1, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: sr }, children: /* @__PURE__ */ t(h, { ...cr[n], size: "tag" }) })
  ] });
}
function XR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(I1, { ...e }) : /* @__PURE__ */ t(T1, { ...e });
}
const M1 = "_label_h9m4w_7", q1 = "_name_h9m4w_15", B1 = "_column_h9m4w_24", P1 = "_webFrame_h9m4w_57", j1 = "_webHead_h9m4w_62", D1 = "_webHeadLabel_h9m4w_74", O1 = "_webLabel_h9m4w_117", H1 = "_webColumns_h9m4w_124", F1 = "_webGroup_h9m4w_130", W1 = "_webPeople_h9m4w_131", z1 = "_webVia_h9m4w_132", K1 = "_webMeta_h9m4w_161", W = {
  label: M1,
  name: q1,
  column: B1,
  webFrame: P1,
  webHead: j1,
  webHeadLabel: D1,
  webLabel: O1,
  webColumns: H1,
  webGroup: F1,
  webPeople: W1,
  webVia: z1,
  webMeta: K1
}, G1 = {
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
function U1(e) {
  if (!e.matrixRole) return;
  const a = G1[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function V1({ node: e }) {
  const a = U1(e);
  return /* @__PURE__ */ l("span", { className: W.label, children: [
    /* @__PURE__ */ t("span", { className: W.name, children: e.name }),
    /* @__PURE__ */ t(Y1, { role: a, node: e }),
    /* @__PURE__ */ t(Ga, { column: Ka[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Ga, { column: Ka[1], children: e.people === void 0 ? "" : ee(e.people) }),
    /* @__PURE__ */ t(Ga, { column: Ka[2], children: e.requestedVia ?? "" })
  ] });
}
function Y1({ role: e, node: a }) {
  return /* @__PURE__ */ l(T, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function J1({ index: e, depth: a, node: n, expanded: r, leaf: o, onToggle: i, children: s }) {
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
      label: /* @__PURE__ */ t(V1, { node: n }),
      children: s
    }
  );
}
function Ua({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function X1({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${W.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ua, { className: `${W.webMeta} ${W.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ua, { className: `${W.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ua, { className: `${W.webMeta} ${W.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Q1() {
  return /* @__PURE__ */ l("div", { className: W.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: W.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: W.webColumns, children: [
      /* @__PURE__ */ t("span", { className: W.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: W.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: W.webVia, children: "Requested via" })
    ] })
  ] });
}
function Z1({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${W.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function e$(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function a$({ rows: e, label: a }) {
  return /* @__PURE__ */ l("div", { className: W.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(Q1, {}),
    /* @__PURE__ */ t(Pm, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      xn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(Z1, { row: n }),
        detail: /* @__PURE__ */ t(X1, { row: n }),
        expanded: e$(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function QR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(a$, { ...e }) : /* @__PURE__ */ t(J1, { ...e });
}
const t$ = "_runbook_b9agc_2", n$ = "_list_b9agc_7", r$ = "_step_b9agc_15", o$ = "_numeral_b9agc_21", l$ = "_body_b9agc_28", i$ = "_head_b9agc_34", s$ = "_title_b9agc_40", c$ = "_detail_b9agc_45", d$ = "_actions_b9agc_50", u$ = "_webList_b9agc_56", m$ = "_webStep_b9agc_60", h$ = "_webBody_b9agc_66", w$ = "_webTitle_b9agc_74", f$ = "_webDetail_b9agc_78", A = {
  runbook: t$,
  list: n$,
  step: r$,
  numeral: o$,
  body: l$,
  head: i$,
  title: s$,
  detail: c$,
  actions: d$,
  webList: u$,
  webStep: m$,
  webBody: h$,
  webTitle: w$,
  webDetail: f$
}, ur = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function mr(e) {
  return String(e + 1).padStart(2, "0");
}
function _$({ step: e, index: a, connection: n }) {
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
function v$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ l("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: A.list, children: e.map((r, o) => /* @__PURE__ */ t(_$, { step: r, index: o, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: A.actions, children: a })
  ] });
}
function b$({ step: e, index: a, connection: n }) {
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
function p$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ l("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${A.list} ${A.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ t(b$, { step: r, index: o, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${A.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function ZR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(p$, { ...e }) : /* @__PURE__ */ t(v$, { ...e });
}
const g$ = "_list_1gu6a_2", y$ = "_check_1gu6a_10", N$ = "_body_1gu6a_16", k$ = "_text_1gu6a_23", $$ = "_pending_1gu6a_32", C$ = "_measured_1gu6a_37", Qe = {
  list: g$,
  check: y$,
  body: N$,
  text: k$,
  pending: $$,
  measured: C$
};
function S$(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function R$({ check: e }) {
  const a = S$(e.passed);
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
function e2({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(R$, { check: a }, a.text)) });
}
const T$ = "_root_4aacj_2", x$ = "_list_4aacj_10", L$ = "_line_4aacj_26", A$ = "_at_4aacj_53", E$ = "_text_4aacj_57", I$ = "_foot_4aacj_61", M$ = "_idle_4aacj_73", q$ = "_caret_4aacj_81", B$ = "_jump_4aacj_88", he = {
  root: T$,
  list: x$,
  line: L$,
  at: A$,
  text: E$,
  foot: I$,
  idle: M$,
  caret: q$,
  jump: B$
}, P$ = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function ft(e) {
  return Number.isNaN(Date.parse(e)) ? "" : P$.format(new Date(e));
}
const j$ = { warn: "warning", ok: "ok" };
function D$({ kind: e }) {
  const a = j$[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function O$({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${ft(e)}` });
}
function H$({ connection: e, idleSince: a, last: n, children: r }) {
  const o = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${ft(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: he.idle, children: i }),
    /* @__PURE__ */ t(O$, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const F$ = 8;
function W$(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > F$;
}
function z$({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const hr = Te(null);
function a2({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, o] = p(!1), i = Yt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(hr.Provider, { value: i, children: n });
}
function K$() {
  const e = Re(hr), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function t2({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const o = f(null), [i, s] = p(0), [c, d] = K$(), [u, m] = p(!1), _ = e.at(-1);
  S(() => {
    s(e.length);
  }, [e.length]), aa(() => {
    const y = o.current;
    y && !u && (y.scrollTop = y.scrollHeight);
  }, [e.length, u]);
  const w = () => {
    var q;
    const y = o.current;
    if (!y) return;
    const L = y.querySelectorAll("[data-consline-text]");
    (q = L.item(L.length - 1)) == null || q.focus(), m(!1);
  };
  return /* @__PURE__ */ l("div", { className: he.root, children: [
    /* @__PURE__ */ t("ol", { className: he.list, ref: o, "aria-live": c ? "polite" : "off", "aria-label": r, "data-empty": e.length === 0 || void 0, onScroll: (y) => m(W$(y.currentTarget)), children: e.map((y, L) => /* @__PURE__ */ l("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": L < i, children: [
      /* @__PURE__ */ t("span", { className: he.at, children: ft(y.at) }),
      /* @__PURE__ */ t(D$, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${L}`)) }),
    /* @__PURE__ */ l(H$, { connection: a, idleSince: n, last: _, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t(z$, { shown: u, onJump: w })
    ] })
  ] });
}
const G$ = "_row_1k8wl_2", U$ = "_head_1k8wl_14", V$ = "_author_1k8wl_20", Y$ = "_eta_1k8wl_25", J$ = "_edited_1k8wl_26", X$ = "_body_1k8wl_32", Q$ = "_reason_1k8wl_37", Z$ = "_actions_1k8wl_42", Ne = {
  row: G$,
  head: U$,
  author: V$,
  eta: Y$,
  edited: J$,
  body: X$,
  reason: Q$,
  actions: Z$
}, e0 = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function a0(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function t0({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
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
function n0({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: Ne.reason, id: a, children: e })
  ] });
}
function r0(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function o0(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(t0, { ...e }) : /* @__PURE__ */ t(n0, { reason: e.unavailable, reasonId: e.unavailableId });
}
function n2(e) {
  const { comment: a } = e;
  r0(e);
  const n = N(), r = `${n}-unavailable`, o = e0[a.delivery];
  return /* @__PURE__ */ l("div", { className: `${Ne.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: Ne.head, children: [
      /* @__PURE__ */ t("span", { className: Ne.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: o.role, label: o.label }),
      /* @__PURE__ */ t("span", { className: Ne.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: Ne.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: Ne.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: Ne.reason, id: n, children: a0(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: Ne.actions, children: /* @__PURE__ */ t(o0, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const l0 = "_root_rvhdw_2", i0 = "_attach_rvhdw_11", s0 = "_actions_rvhdw_17", c0 = "_reply_rvhdw_23", d0 = "_replyField_rvhdw_28", u0 = "_send_rvhdw_54", m0 = "_sendIcon_rvhdw_65", h0 = "_sendsAs_rvhdw_75", qe = {
  root: l0,
  attach: i0,
  actions: s0,
  reply: c0,
  replyField: d0,
  send: u0,
  sendIcon: m0,
  sendsAs: h0
};
function wr({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function w0() {
  return /* @__PURE__ */ t("svg", { className: qe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function f0(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function _0(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [o, i] = wr(e), s = N(), c = () => {
    o.trim() !== "" && r(n, o);
  }, d = (u) => {
    f0(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ l("div", { className: qe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: qe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ t(M, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: a, label: a, value: o, onChange: i, describedBy: s }),
      /* @__PURE__ */ l(b, { variant: "primary", className: qe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ t(w0, {}),
        /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: qe.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function r2(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(_0, { ...e }) : /* @__PURE__ */ t(v0, { ...e });
}
function v0(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: o, onPost: i, onDraft: s } = e, [c, d] = wr(e);
  return /* @__PURE__ */ l("div", { className: qe.root, children: [
    /* @__PURE__ */ t(M, { kind: "textarea", label: a, value: c, onChange: d }),
    r && /* @__PURE__ */ l("div", { className: qe.attach, children: [
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
    /* @__PURE__ */ l("div", { className: qe.actions, children: [
      /* @__PURE__ */ t(b, { variant: "primary", onClick: () => i(n, c), children: `Post as ${n}` }),
      s && /* @__PURE__ */ t(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const b0 = "_list_1yhks_2", p0 = "_item_1yhks_6", g0 = "_body_1yhks_22", y0 = "_text_1yhks_28", N0 = "_evidence_1yhks_37", k0 = "_consequence_1yhks_49", $0 = "_note_1yhks_54", ze = {
  list: b0,
  item: p0,
  body: g0,
  text: y0,
  evidence: N0,
  consequence: k0,
  note: $0
};
function C0({ criterion: e }) {
  return /* @__PURE__ */ t(je, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Kt({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function S0(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function R0({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: ze.body, children: [
    /* @__PURE__ */ t("span", { className: ze.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(T, { children: [
      /* @__PURE__ */ t(Kt, { text: " · " }),
      /* @__PURE__ */ t("code", { className: ze.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(T, { children: [
      /* @__PURE__ */ t(Kt, { text: " · " }),
      /* @__PURE__ */ t("span", { className: ze.consequence, children: S0(e.why) })
    ] })
  ] });
}
function T0({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: ze.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(C0, { criterion: e }),
    /* @__PURE__ */ t(R0, { criterion: e })
  ] });
}
function o2({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${ze.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(T0, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: ze.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const x0 = "_list_dwhoz_2", L0 = "_rung_dwhoz_6", A0 = "_name_dwhoz_18", E0 = "_actor_dwhoz_32", ga = {
  list: x0,
  rung: L0,
  name: A0,
  actor: E0
}, I0 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function M0({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = I0[e.state];
  return /* @__PURE__ */ l("li", { className: ga.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ga.name, children: e.name }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ga.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function l2({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ga.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(M0, { rung: a }, a.name)) });
}
const q0 = "_sheet_pw37w_2", B0 = "_title_pw37w_9", P0 = "_stage_pw37w_15", j0 = "_effects_pw37w_20", D0 = "_effect_pw37w_20", O0 = "_numeral_pw37w_31", H0 = "_effectText_pw37w_38", F0 = "_refusals_pw37w_43", W0 = "_reasons_pw37w_52", z0 = "_reason_pw37w_52", K0 = "_actions_pw37w_62", ue = {
  sheet: q0,
  title: B0,
  stage: P0,
  effects: j0,
  effect: D0,
  numeral: O0,
  effectText: H0,
  refusals: F0,
  reasons: W0,
  reason: z0,
  actions: K0
};
function G0({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function i2({ run: e, effects: a, refusals: n, cost: r, onRequeue: o, onClose: i, returnFocusTo: s }) {
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
      gu,
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
      /* @__PURE__ */ t(G0, { refused: _, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ t(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const U0 = "_list_1rowi_2", V0 = "_path_1rowi_7", Y0 = "_head_1rowi_21", J0 = "_label_1rowi_28", X0 = "_consequence_1rowi_35", Q0 = "_ask_1rowi_36", ea = {
  list: U0,
  path: V0,
  head: Y0,
  label: J0,
  consequence: X0,
  ask: Q0
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
function Z0({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(b, { variant: Ut(a), size: "sm", onClick: () => n(e.kind), children: Za[e.kind] }) : /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ t(b, { variant: Ut(a), size: "sm", disabled: !0, describedBy: r, children: Za[e.kind] }),
    /* @__PURE__ */ t("span", { className: ea.ask, id: r, children: e.askInstead })
  ] });
}
function eC({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: ea.path, "data-allowed": e.allowed, "data-role": Gt(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: ea.head, children: [
      /* @__PURE__ */ t("span", { className: ea.label, children: e.title ?? Za[e.kind] }),
      /* @__PURE__ */ t(h, { role: Gt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: ea.consequence, children: e.consequence }),
    /* @__PURE__ */ t(Z0, { path: e, primary: a, onChoose: n })
  ] });
}
function s2({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: ea.list, children: e.map((n, r) => /* @__PURE__ */ t(eC, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const aC = "_list_1m7i0_2", tC = "_item_1m7i0_6", nC = "_node_1m7i0_18", rC = "_body_1m7i0_24", oC = "_head_1m7i0_30", lC = "_stage_1m7i0_36", iC = "_version_1m7i0_41", sC = "_sentence_1m7i0_49", cC = "_meta_1m7i0_54", $e = {
  list: aC,
  item: tC,
  node: nC,
  body: rC,
  head: oC,
  stage: lC,
  version: iC,
  sentence: sC,
  meta: cC
}, dC = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function uC({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: $e.head, children: [
    /* @__PURE__ */ t("span", { className: $e.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: $e.version, title: e.version, children: e.version }) : null
  ] });
}
function mC({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${$e.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${$e.node} ward-history-node`, children: /* @__PURE__ */ t(je, { size: 9, kind: dC[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${$e.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(uC, { entry: e }),
      /* @__PURE__ */ t("span", { className: $e.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${$e.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ne(e.cost)}`
      ] })
    ] })
  ] });
}
function c2({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${$e.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(mC, { entry: a }, a.stage + String(n))) });
}
const hC = "_thread_1e70p_3", wC = "_turn_1e70p_8", fC = "_who_1e70p_27", _C = "_body_1e70p_32", ya = {
  thread: hC,
  turn: wC,
  who: fC,
  body: _C
}, fr = Te(!1);
function d2({ children: e, density: a }) {
  return /* @__PURE__ */ t(fr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${ya.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function u2({ turn: e }) {
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
const vC = "_list_yiolt_3", bC = "_row_yiolt_7", pC = "_label_yiolt_20", gC = "_n_yiolt_26", yC = "_cause_yiolt_33", la = {
  list: vC,
  row: bC,
  label: pC,
  n: gC,
  cause: yC
};
function NC(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const kC = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function $C({ row: e, formatNumber: a }) {
  return NC(e), /* @__PURE__ */ l("li", { className: `${la.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(je, { size: 8, ...kC[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: la.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${la.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(CC, { cause: e.cause })
  ] });
}
function CC({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${la.cause} ward-healthrow-cause`, children: e }) : null;
}
function m2({ rows: e, formatNumber: a = ee }) {
  return /* @__PURE__ */ t("ul", { className: `${la.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t($C, { row: n, formatNumber: a }, n.label)) });
}
const SC = "_root_1jxwp_2", RC = {
  root: SC
};
function h2({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: RC.root, "data-density": o, children: [
    /* @__PURE__ */ t(Da, { items: e, note: a, density: o }),
    /* @__PURE__ */ t(b, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const TC = "_row_dhbre_3", xC = "_key_dhbre_13", LC = "_stack_dhbre_24", AC = "_value_dhbre_32", EC = "_evidence_dhbre_39", IC = "_mark_dhbre_47", Xe = {
  row: TC,
  key: xC,
  stack: LC,
  value: AC,
  evidence: EC,
  mark: IC
};
function MC({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(lt, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function w2({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(MC, { state: e.state }) })
  ] });
}
const qC = "_cell_gh2sd_2", BC = {
  cell: qC
}, PC = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function jC(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function DC(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function OC(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: jC(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function HC(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function f2({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  DC(e, n);
  const r = HC(e);
  return /* @__PURE__ */ t(
    Mu,
    {
      label: "Rejection routing",
      columns: PC,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ t("span", { className: BC.cell, "data-norerun": o.noRerun ? !0 : void 0, children: OC(o, i) }),
      empty: a ?? /* @__PURE__ */ t(yh, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const FC = "_row_1f2re_2", WC = "_title_1f2re_12", zC = "_turns_1f2re_18", KC = "_waiting_1f2re_19", GC = "_resolved_1f2re_20", UC = "_activity_1f2re_21", VC = "_cost_1f2re_28", YC = "_link_1f2re_29", JC = "_tableLink_1f2re_47", XC = "_tableRecord_1f2re_48", QC = "_tableRow_1f2re_59", ZC = "_tableTitle_1f2re_71", eS = "_tableResolved_1f2re_76", aS = "_tableMeta_1f2re_87", tS = "_tableCost_1f2re_94", nS = "_tableActivity_1f2re_95", rS = "_tableState_1f2re_105", D = {
  row: FC,
  title: WC,
  turns: zC,
  waiting: KC,
  resolved: GC,
  activity: UC,
  cost: VC,
  link: YC,
  tableLink: JC,
  tableRecord: XC,
  tableRow: QC,
  tableTitle: ZC,
  tableResolved: eS,
  tableMeta: aS,
  tableCost: tS,
  tableActivity: nS,
  tableState: rS
}, _r = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function oS(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function lS(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function iS(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const sS = { duplicate: "Closed · duplicate" };
function cS({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(ta, { className: D.tableMeta, text: `waiting on ${e}` });
}
function dS({ value: e }) {
  return /* @__PURE__ */ t("td", { className: D.tableCost, children: e === void 0 ? null : ne(e) });
}
function uS({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${D.tableRecord} ward-target`, href: H(e.href), children: `→ ${e.key}` });
}
function mS({ session: e, href: a }) {
  const n = _r[e.state];
  return /* @__PURE__ */ l("tr", { className: D.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: D.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${D.tableLink} ward-target`, href: H(a), children: /* @__PURE__ */ t(ta, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: D.tableMeta, children: lS(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: D.tableResolved, children: [
      iS(e.resolved),
      /* @__PURE__ */ t(cS, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(dS, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: D.tableActivity, children: oS(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: D.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: sS[e.state] ?? n.label }),
      /* @__PURE__ */ t(uS, { link: e.link })
    ] }) })
  ] });
}
function hS({ session: e }) {
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
function _2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(mS, { session: e.session, href: e.href }) : /* @__PURE__ */ t(hS, { session: e.session });
}
const wS = "_block_1yy2v_3", fS = "_list_1yy2v_9", _S = "_line_1yy2v_14", et = {
  block: wS,
  list: fS,
  line: _S
}, vS = { warn: "warning", ok: "ok" };
function bS({ kind: e }) {
  const a = vS[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function pS({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${et.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(bS, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function v2({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${et.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: et.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(pS, { line: n }, `${r}-${n.text}`)) }) });
}
const gS = "_band_tt7hp_1", yS = "_head_tt7hp_8", NS = "_cell_tt7hp_19", kS = "_index_tt7hp_35", $S = "_title_tt7hp_42", CS = "_note_tt7hp_48", SS = "_cellTitle_tt7hp_53", RS = "_cellBody_tt7hp_58", TS = "_tag_tt7hp_64", ye = {
  band: gS,
  head: yS,
  cell: NS,
  index: kS,
  title: $S,
  note: CS,
  cellTitle: SS,
  cellBody: RS,
  tag: TS
}, Vt = 4;
function b2({ index: e, title: a, note: n, cells: r }) {
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
  DS as ACCENT_PRESETS,
  rR as ActionStack,
  t2 as ActivityConsole,
  US as AdminIcon,
  P_ as AgentCard,
  VS as AppShell,
  OR as AppearanceStrip,
  b2 as Band,
  aR as BarChart,
  aw as BoardColumn,
  pR as BoardFootnote,
  gR as BoardHeader,
  KS as BoardIcon,
  uR as BoardScroller,
  b as Btn,
  jS as CHIP_ROLES,
  ar as CREDENTIAL_COLUMNS,
  eR as Callout,
  HR as CapabilityRow,
  u2 as ChatMessage,
  on as Checkbox,
  h as Chip,
  ta as ClampText,
  n2 as ClarificationRow,
  LR as ClauseRuleRow,
  xR as ClauseRules,
  qn as ColourLadder,
  FR as ComponentRow,
  r2 as Composer,
  NR as ConfigRow,
  yR as ConfigRowHead,
  it as ConnectionMark,
  a2 as ConsoleAnnounceProvider,
  d2 as Conversation,
  gu as CostMeter,
  zR as CredentialRow,
  WR as CredentialRowHead,
  o2 as CriteriaList,
  Ei as Crumb,
  OS as DENSITIES,
  m2 as DeliveryHealth,
  wR as DeniedState,
  WS as DisabledScope,
  ER as DryRunRail,
  yh as EmptyState,
  KR as EnvCard,
  M as Field,
  hR as FilteredEmpty,
  cR as FormStack,
  Da as GateChecklist,
  l2 as GateLadder,
  Mu as Grid,
  MR as HandoffRuleRow,
  IR as HandoffRules,
  zS as HomeIcon,
  kR as ItemDrawer,
  GR as KeyPanel,
  jr as LIVE_EVENT_TYPES,
  o_ as LegacyBoardColumn,
  CR as LegacyBoardHeader,
  SR as LegacyConfigRow,
  TR as LegacyItemDrawer,
  Qf as LegacyOverCapNote,
  RR as LegacyPreviewRail,
  En as LegacyWorkCard,
  xe as LiveIndicator,
  fR as LoadFailed,
  bR as Loading,
  ir as MCP_SERVER_COLUMNS,
  lt as Mark,
  VR as MarkUpload,
  je as Marker,
  JR as McpServerRow,
  YR as McpServerRowHead,
  Xs as Menu,
  js as MenuButton,
  qR as NewStreamModal,
  $h as OverCapNote,
  Ma as OverflowRow,
  na as Overlay,
  AR as PARTIAL_STEP_REASON,
  sr as POLICY_CHIP_WIDTH,
  lR as PageFrame,
  ZS as PageHeader,
  tR as PlainList,
  XR as PolicyRow,
  $R as PreviewRail,
  Ka as ROLE_MATRIX_COLUMNS,
  Un as RULE_ACTIONS,
  Sn as Radio,
  h2 as ReadyChecklist,
  sR as RecordSection,
  i2 as RequeueSheet,
  s2 as ResolveBlock,
  w2 as ResolvedFieldRow,
  QR as RoleMatrixRow,
  f2 as RoutingTable,
  BR as RuleRow,
  ZR as RunbookSteps,
  Pr as STREAM_STEPS,
  dR as SectionBand,
  Et as SectionHeader,
  $n as SegmentedControl,
  wn as Select,
  _2 as SessionRow,
  XS as Sidebar,
  PR as StageColumn,
  mR as StageGrid,
  c2 as StageHistory,
  bp as StageListEditor,
  _R as StaleStrip,
  Ba as StatStrip,
  QS as StreamAvatar,
  jR as StreamRow,
  GS as StudioIcon,
  iR as SubjectRail,
  Ge as Switch,
  JS as TabLinks,
  nR as TableHead,
  YS as Tabs,
  MS as ThemeProvider,
  DR as ToolRow,
  oR as TopBar,
  Pm as Tree,
  xn as TreeRow,
  v2 as TypedInputBlock,
  kl as UNSAFE_HREF,
  e2 as ValidationList,
  ES as VisibilityProvider,
  IS as Visible,
  PS as WARD_VERSION,
  ja as WorkCard,
  vR as WriteUnavailableStrip,
  oS as agoSince,
  $r as clock,
  qp as colourStatus,
  ee as count,
  ce as duration,
  at as elapsed,
  BS as eventSourceTransport,
  Aa as isStreamStep,
  sa as isValidatedStreamStep,
  hv as ladderValidation,
  o1 as mcpConnectionChip,
  n1 as mcpToolName,
  ne as money,
  we as ms,
  Ln as ordered,
  Xt as ratio,
  CN as restartLabel,
  H as safeHref,
  de as stamp,
  tt as stream,
  HS as streamChip,
  qa as streamChipProps,
  pe as streamColour,
  Hr as streamHex,
  nd as streamInitials,
  Dr as streamVars,
  va as useBorderFlash,
  Pe as useDisabledScope,
  Mr as useFocusTrap,
  FS as useLiveFeed,
  qS as useReturnFocus,
  La as useRovingTabindex,
  nt as useTicker,
  Cr as useVisible,
  z as v,
  UR as validateMark,
  ua as validatedStep,
  Zt as validatedStreamSteps
};
