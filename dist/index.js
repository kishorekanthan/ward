import { jsx as t, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as Ut, useContext as Me, createContext as Be, useState as p, useEffect as S, useCallback as X, useRef as w, useLayoutEffect as ea, useId as N, isValidElement as hr, Children as wr, Fragment as fr } from "react";
import { createPortal as _r, flushSync as Vt } from "react-dom";
function ce(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const n = Math.floor(e / 36e5);
  return n < 24 ? `${n}h ${a % 60}m` : `${Math.floor(n / 24)}d ${n % 24}h`;
}
const ht = (e) => String(e).padStart(2, "0");
function Za(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const n = Math.floor(a / 60);
  return n < 60 ? `${n}m ${ht(a % 60)}s` : `${Math.floor(n / 60)}h ${ht(n % 60)}m`;
}
const vr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = vr.formatToParts(new Date(e)), n = (r) => {
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
function Yt(e, a) {
  return `${e} / ${a}`;
}
const br = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function pr(e) {
  return br.format(new Date(e));
}
const Jt = Be(/* @__PURE__ */ new Set());
function tS({ hidden: e, children: a }) {
  const n = Ut(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Jt.Provider, { value: n, children: a });
}
function gr(e) {
  return !Me(Jt).has(e);
}
function nS({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(T, { children: gr(e) ? a : n });
}
const yr = "(prefers-color-scheme: dark)";
function wt() {
  return typeof window.matchMedia == "function" ? window.matchMedia(yr) : null;
}
function Nr(e) {
  const [a, n] = p(() => {
    var r;
    return ((r = wt()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? wt() : null;
    if (!r) return;
    const l = () => n(r.matches);
    return l(), r.addEventListener("change", l), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function Da(e, a) {
  S(() => {
    const n = document.documentElement;
    return n.setAttribute(e, a), () => n.removeAttribute(e);
  }, [e, a]);
}
function kr(e, a) {
  return e !== "system" ? e : a ? "dark" : "light";
}
function rS({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
  const l = Nr(e === "system");
  return Da("data-theme", kr(e, l)), Da("data-accent", a), Da("data-density", n), /* @__PURE__ */ t(T, { children: r });
}
const $r = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Cr(e, a, n, r) {
  return e.shiftKey ? document.activeElement === n ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? n : void 0;
}
function Sr(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Cr(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Rr(e) {
  return { onKeyDown: X(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll($r));
      Sr(n, e.current, r);
    },
    [e]
  ) };
}
function lS(e, a = !0) {
  S(() => {
    if (!a) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const ft = { ArrowUp: -1, ArrowDown: 1 }, _t = { ArrowLeft: -1, ArrowRight: 1 }, Tr = (e, a, n) => Math.min(n, Math.max(a, e));
function xr(e, a) {
  if (a !== "horizontal" && e in ft) return ft[e];
  if (a !== "vertical" && e in _t) return _t[e];
}
function Ra({ orientation: e = "both" } = {}) {
  const [a, n] = p(0), r = w(/* @__PURE__ */ new Map()), l = w(!1);
  ea(() => {
    var v;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(a)) return;
    const m = u[0], f = l.current;
    l.current = !1, n(m), f && ((v = r.current.get(m)) == null || v.focus());
  });
  const i = X((u) => n(u), []), s = X((u) => {
    var m;
    n(u), (m = r.current.get(u)) == null || m.focus();
  }, []), c = X(
    (u) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const f = Math.max(0, m.indexOf(a)), v = xr(u.key, e);
      v !== void 0 ? (u.preventDefault(), s(m[Tr(f + v, 0, m.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(m[0])) : u.key === "End" && (u.preventDefault(), s(m[m.length - 1]));
    },
    [a, s, e]
  ), d = X(
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
const oS = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, iS = "0.2.0", sS = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Lr = [1, 2, 3, 4, 5, 6], Xt = [1, 2, 3], Ar = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], cS = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], dS = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], W = {
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
    navIcon: "var(--ward-height-navIcon)"
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
    rowTextStrong: "var(--ward-type-rowTextStrong)"
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
function et(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Ta(e) {
  return Lr.includes(e);
}
function xa(e) {
  return Xt.includes(e);
}
function uS(e) {
  if (!Ta(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function mS(e) {
  if (!Ta(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Er = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Ir(e) {
  if (!Ta(e)) throw new Error("unvalidated stream step");
  return Er[e];
}
function vt(e) {
  return typeof e != "string" ? null : Ar.includes(e) ? e : null;
}
function Mr(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Br(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Pr(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function jr(e, a, n) {
  const r = Mr(e);
  if (r === null) return null;
  const l = vt(n) ?? vt(r.type);
  return l === null ? null : { ...r, type: l, id: Br(r, a), at: Pr(r) };
}
function Dr(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function Or(e, a, n) {
  return e >= we.heartbeat && !a && n !== null;
}
function hS(e, a) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = w(/* @__PURE__ */ new Map()), c = w(0), d = w(""), u = w(0), m = w(null), f = w(0), v = w(0), y = w(!1), L = w("reconnecting"), B = X((R) => {
    L.current = R, r(R);
  }, []), le = X(() => {
    c.current = Date.now();
  }, []), Te = X((R) => {
    for (const [G, ge] of s.current)
      (ge === "*" || R.itemKey === ge) && G(R);
  }, []), ae = X(() => {
    m.current = a(e, { lastEventId: d.current }, {
      onEvent: (R, G, ge) => {
        const je = jr(R, G, ge);
        je !== null && (je.id && (d.current = je.id), le(), y.current = !1, B("live"), i(je.at), Te(je));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, le(), B("live");
      },
      onError: () => {
        var G;
        (G = m.current) == null || G.close(), m.current = null, y.current = !0, L.current !== "stale" && B("reconnecting");
        const R = Math.min(we.reconnectBase * 2 ** u.current, we.reconnectMax);
        u.current += 1, f.current = window.setTimeout(ae, R);
      }
    });
  }, [Te, B, le, a, e]), Ke = X((R) => {
    y.current = !0, R.close(), m.current = null, f.current = window.setTimeout(ae, we.reconnectBase);
  }, [ae]), Ge = X((R, G) => (s.current.set(G, R), () => {
    s.current.delete(G);
  }), []);
  return S(() => (ae(), v.current = window.setInterval(() => {
    const R = Date.now() - c.current, G = Dr(R, L.current);
    G && B(G);
    const ge = m.current;
    Or(R, y.current, ge) && Ke(ge);
  }, we.tick), () => {
    var R;
    window.clearInterval(v.current), window.clearTimeout(f.current), y.current = !1, (R = m.current) == null || R.close(), m.current = null;
  }), [ae, Ke, B]), { connection: n, lastEventAt: l, subscribe: Ge };
}
function at(e, a) {
  const n = new Date(e).getTime(), [r, l] = p(() => Date.now());
  return S(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    i();
    const s = window.setInterval(i, we.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", i);
    };
  }, [a, n]), Math.max(0, r - n);
}
const bt = { blue: "running", orange: "waiting", green: "done" };
function Hr() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function pt(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function wa(e, a) {
  const n = w(0), r = X((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (Hr() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${bt[i]})`), s.style.setProperty("--flash", `var(--ward-color-${bt[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => pt(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => pt(s), we.flash)));
  }, [a, e]);
  return S(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Fr = "_root_1otpc_2", qr = {
  root: Fr
};
function zr(e, a, n, r, l) {
  const i = [Za(a)];
  return e || i.push(`as of ${pr(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Re({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = at(e, l), s = (a == null ? void 0 : a.at) ?? e, c = zr(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${qr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const Wr = "_app_1m4se_1", Kr = "_side_1m4se_30", Gr = "_sideTop_1m4se_42", Ur = "_sideBody_1m4se_56", Vr = "_iconRail_1m4se_67", Yr = "_railItem_1m4se_76", Jr = "_railIcon_1m4se_97", Xr = "_railDot_1m4se_102", Qr = "_railLetter_1m4se_108", Zr = "_main_1m4se_113", el = "_rail_1m4se_76", al = "_page_1m4se_131", tl = "_headerRow_1m4se_140", nl = "_sidebarToggle_1m4se_147", rl = "_headerSlot_1m4se_152", ll = "_drawerSide_1m4se_157", ol = "_root_1m4se_193", il = "_topbar_1m4se_200", sl = "_mark_1m4se_211", cl = "_brand_1m4se_218", dl = "_tagline_1m4se_224", ul = "_identity_1m4se_230", ml = "_tools_1m4se_231", hl = "_nav_1m4se_241", wl = "_metadata_1m4se_248", fl = "_actor_1m4se_263", _l = "_detail_1m4se_264", vl = "_content_1m4se_324", bl = "_toolsPanel_1m4se_340", pl = "_skip_1m4se_366", $ = {
  app: Wr,
  side: Kr,
  sideTop: Gr,
  sideBody: Ur,
  iconRail: Vr,
  railItem: Yr,
  railIcon: Jr,
  railDot: Xr,
  railLetter: Qr,
  main: Zr,
  rail: el,
  page: al,
  headerRow: tl,
  sidebarToggle: nl,
  headerSlot: rl,
  drawerSide: ll,
  root: ol,
  topbar: il,
  mark: sl,
  brand: cl,
  tagline: dl,
  identity: ul,
  tools: ml,
  nav: hl,
  metadata: wl,
  actor: fl,
  detail: _l,
  content: vl,
  toolsPanel: bl,
  skip: pl
}, gl = "_btn_tzr89_2", yl = "_primary_tzr89_14", Nl = "_destructive_tzr89_25", kl = "_secondary_tzr89_35", $l = "_ghost_tzr89_40", Cl = "_overflow_tzr89_49", Sl = "_sm_tzr89_56", Rl = "_disabled_tzr89_60", ca = {
  btn: gl,
  primary: yl,
  destructive: Nl,
  secondary: kl,
  ghost: $l,
  overflow: Cl,
  sm: Sl,
  disabled: Rl
};
function Tl(e, a, n, r) {
  const l = a === "sm" ? [ca.sm, "ward-btn--sm"] : [], i = n ? [ca.disabled] : [];
  return [ca.btn, ca[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function xl(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Ll(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Al(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function El(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Il(e, a, n) {
  return El(e.describedBy, a && n);
}
function Ml({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Bl(e) {
  return e.children ?? e.label;
}
function b(e) {
  Ll(e);
  const a = e.variant ?? "secondary", n = e.size ?? "md", r = e.disabled ?? !1, l = Al(e), i = N();
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: Tl(a, n, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": n,
        disabled: r,
        title: l,
        "aria-describedby": Il(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...xl(a, e.controls),
        children: Bl(e)
      }
    ),
    /* @__PURE__ */ t(Ml, { id: i, reason: l })
  ] });
}
function La(e) {
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
const Pl = "_scrim_18idy_2", jl = "_drawer_18idy_10", Dl = "_sheet_18idy_14", Ol = "_modal_18idy_18", Hl = "_panel_18idy_23", Fl = "_start_18idy_39", ql = "_header_18idy_62", zl = "_title_18idy_70", Wl = "_body_18idy_74", Kl = "_close_18idy_101", Ce = {
  scrim: Pl,
  drawer: jl,
  sheet: Dl,
  modal: Ol,
  panel: Hl,
  start: Fl,
  header: ql,
  title: zl,
  body: Wl,
  close: Kl
}, Gl = Be(null), pa = [], ga = /* @__PURE__ */ new Map();
function Ul(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Vl(e, a) {
  let n = ga.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ga.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Yl(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !Ul(r) && Vl(e, r);
}
function Jl(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (Yl(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function Xl(e) {
  for (const a of e.claims) {
    const n = ga.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), ga.delete(a)));
  }
}
function Ql(e, a) {
  const n = { root: e, claims: [] };
  return pa.push(n), Jl(n, a), n;
}
function Zl(e) {
  const a = pa.indexOf(e);
  a >= 0 && pa.splice(a, 1), Xl(e);
}
function gt(e) {
  return e !== null && pa.at(-1) === e;
}
function eo(e, a, n) {
  const r = w(null), l = w(n);
  return l.current = n, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = Ql(i, a);
    return r.current = c, () => {
      var u, m;
      const d = gt(c);
      Zl(c), r.current = null, d && ((m = (u = l.current ?? s) == null ? void 0 : u.focus) == null || m.call(u));
    };
  }, [a]), X(() => gt(r.current), []);
}
function ao(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function to(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function no({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("header", { className: `${Ce.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Ce.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function ro(e) {
  return `${Ce.scrim} ${Ce[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function lo(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ce.panel} ${Ce[e]} ward-overlay-panel${n}${r}`;
}
function oo(e) {
  const a = Me(Gl);
  return e ?? a ?? document.body;
}
function ta(e) {
  const a = w(null), n = w(null), r = N(), l = oo(e.container), i = La("(min-width: 768px)"), s = ao(e.kind, i), c = to(e, r), d = Rr(n), u = eo(a, l, e.returnFocusTo), m = X(() => {
    u() && e.onClose();
  }, [e.onClose, u]);
  return S(() => {
    var f, v;
    u() && ((v = (f = n.current) == null ? void 0 : f.querySelector("button")) == null || v.focus());
  }, [u]), S(() => {
    const f = (v) => {
      v.key === "Escape" && m();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [m]), _r(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: ro(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: m,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: n,
            id: e.id,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": c.labelledBy,
            "aria-label": c.label,
            className: lo(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => u() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Ce.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(no, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const io = /^([a-z][a-z0-9+.-]*):/i, so = /* @__PURE__ */ new Set(["http", "https"]), co = "#";
function uo(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = io.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function F(e) {
  const a = uo(e);
  return a === void 0 || so.has(a) ? e : co;
}
function mo(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Qt(e) {
  const a = mo(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function Aa(e, a) {
  S(() => {
    const n = e.current;
    if (!n) return;
    const r = () => Qt(n);
    n.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [n, ...n.children]) l == null || l.observe(i);
    return r(), () => {
      n.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, a]);
}
function ho(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function Zt(e, a, n) {
  ea(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = ho(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), Qt(r);
  }, [e, a, n]);
}
const wo = "_icon_1ylqy_2", fo = {
  icon: wo
};
function ia({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: fo.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function wS() {
  return /* @__PURE__ */ t(ia, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function fS() {
  return /* @__PURE__ */ o(ia, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function _S() {
  return /* @__PURE__ */ o(ia, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function vS() {
  return /* @__PURE__ */ t(ia, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function _o() {
  return /* @__PURE__ */ o(ia, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const en = "ward:sidebar-collapsed", vo = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function bo() {
  try {
    return window.localStorage.getItem(en) === "true";
  } catch {
    return !1;
  }
}
function po(e) {
  try {
    window.localStorage.setItem(en, String(e));
  } catch {
  }
}
function go(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function yo(e) {
  return e instanceof Element && e.closest(vo) !== null;
}
function No(e) {
  return e.key === "[" && !go(e) && !yo(e.target);
}
function ko(e) {
  const [a, n] = p(bo), r = () => {
    po(!a), n(!a);
  };
  return S(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!No(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, a]), { collapsed: a, toggle: r };
}
function $o() {
  const e = La("(max-width: 791.98px)"), a = N(), n = w(null), [r, l] = p(!1);
  return r && !e && l(!1), { narrow: e, open: r, drawerId: a, slotRef: n, toggle: () => l(!r), close: () => l(!1) };
}
function Co({ header: e, label: a, drawer: n }) {
  return n.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.drawerId, children: a }) }),
    /* @__PURE__ */ t("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function So({ sidebar: e, label: a, drawer: n }) {
  var l;
  if (!n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ t(ta, { kind: "start", id: n.drawerId, title: a, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ t("div", { className: $.drawerSide, onClick: r, children: e }) });
}
function Ro(e, a) {
  const n = e !== void 0 && !a, { collapsed: r, toggle: l } = ko(n);
  return { enabled: n, collapsed: n && r, toggle: l };
}
function To({ fold: e }) {
  return e.enabled ? /* @__PURE__ */ t("div", { className: $.sideTop, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(_o, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] }) }) : null;
}
function xo({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": et(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Lo({ items: e, label: a }) {
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: F(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(xo, { item: n }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function Ao({ sidebar: e, label: a, iconRail: n, fold: r }) {
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(To, { fold: r }),
    /* @__PURE__ */ t("div", { className: $.sideBody, hidden: r.collapsed, children: e }),
    r.collapsed && /* @__PURE__ */ t(Lo, { items: n ?? [], label: a })
  ] });
}
function Eo({ sidebar: e, header: a, children: n, rail: r, sidebarLabel: l, iconRail: i }) {
  const s = r != null, c = $o(), d = Ro(i, c.narrow), u = l ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(s), "data-collapsed": String(d.collapsed), children: [
    !c.narrow && /* @__PURE__ */ t(Ao, { sidebar: e, label: u, iconRail: i, fold: d }),
    /* @__PURE__ */ o("main", { className: $.main, children: [
      /* @__PURE__ */ t(Co, { header: a, label: u, drawer: c }),
      /* @__PURE__ */ t("div", { className: $.page, children: n })
    ] }),
    s && /* @__PURE__ */ t("div", { className: $.rail, children: r }),
    /* @__PURE__ */ t(So, { sidebar: e, label: u, drawer: c })
  ] });
}
function Io({ destinations: e, active: a }) {
  const n = w(null);
  return Aa(n, e.length), Zt(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t("nav", { ref: n, className: $.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ t("a", { href: F(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Ga({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function Mo({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ t(Ga, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Ga, { value: a, className: $.detail })
  ] });
}
function Bo() {
  const e = La("(max-width: 767.98px)"), a = N(), n = w(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Po({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: $.tools, children: e });
}
function jo({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function Do(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ t("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Ga, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ t(Io, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: $.identity, children: /* @__PURE__ */ t(Mo, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(Po, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Oo(e) {
  const a = N(), n = Bo();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(Do, { ...e, menu: n }),
    /* @__PURE__ */ t(jo, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: $.content, children: e.children })
  ] });
}
function Ho(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function bS(e) {
  return Ho(e) ? /* @__PURE__ */ t(Eo, { ...e }) : /* @__PURE__ */ t(Oo, { ...e });
}
function Ea(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Fo = "_root_197jc_2", qo = "_row_197jc_8", zo = "_box_197jc_14", Wo = "_label_197jc_21", Ko = "_lockedNote_197jc_26", Go = "_consequence_197jc_34", Uo = "_sample_197jc_69", Oe = {
  root: Fo,
  row: qo,
  box: zo,
  label: Wo,
  lockedNote: Ko,
  consequence: Go,
  sample: Uo
};
function Vo(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Yo({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${Oe.consequence} ward-check-consequence`, children: a }) : null;
}
function Jo({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${Oe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Xo({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Oe.sample, "aria-hidden": "true", children: e }) : null;
}
function an(e) {
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = Vo(e);
  return /* @__PURE__ */ o("div", { className: `${Oe.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: Oe.row, children: [
      /* @__PURE__ */ t(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${Oe.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (l) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, l.target.checked));
          },
          "aria-describedby": Ea(n, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: Oe.label, children: [
        e.label,
        /* @__PURE__ */ t(Jo, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(Xo, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(Yo, { id: n, text: e.consequence })
  ] });
}
const Qo = "_chip_pq6tb_2", Zo = {
  chip: Qo
}, ei = {
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
function ai(e, a) {
  if (e === "stream") return ti(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = ei[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function ti(e) {
  if (!e || !xa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = et(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${Zo.chip} ward-chip ward-chip--${e}`, style: ai(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const ni = "_clamp_zn74g_3", yt = {
  clamp: ni
};
function aa({ text: e, as: a = "span", className: n }) {
  return /* @__PURE__ */ t(a, { className: n === void 0 ? yt.clamp : `${yt.clamp} ${n}`, "data-ward-clamp": "", title: e, children: e });
}
function sa(e) {
  return typeof e == "number" && xa(e) ? e : null;
}
function pe(e, a) {
  const n = sa(e);
  return n === null ? "var(--ward-color-line2)" : `var(--ward-stream-${n}-${a})`;
}
function Ia(e, a) {
  const n = sa(a);
  return n === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: n };
}
const ri = "_root_zvypg_3", li = "_nav_zvypg_7", oi = "_list_zvypg_13", ii = "_item_zvypg_21", si = "_link_zvypg_41", ci = "_sep_zvypg_51", di = "_current_zvypg_55", ui = "_chips_zvypg_59", xe = {
  root: ri,
  nav: li,
  list: oi,
  item: ii,
  link: si,
  sep: ci,
  current: di,
  chips: ui
};
function mi({ path: e, chips: a }) {
  return /* @__PURE__ */ t("div", { className: xe.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: xe.nav, children: [
    /* @__PURE__ */ t("ol", { className: xe.list, children: e.map((n, r) => /* @__PURE__ */ o("li", { className: xe.item, children: [
      r > 0 ? /* @__PURE__ */ t("span", { className: xe.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${xe.link} ward-target`, href: F(n.href), title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { className: xe.current, "aria-current": "page", title: n.label, children: n.label })
    ] }, n.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${xe.chips} ward-chiprow`, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] }) });
}
function tn(e, a, n) {
  const r = w(n);
  r.current = n, S(() => {
    if (!e) return;
    const l = (i) => {
      var s;
      (s = a.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, a]);
}
const hi = 500;
function nn(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function rn() {
  const e = w(""), a = w(void 0);
  return S(() => () => clearTimeout(a.current), []), (n) => (clearTimeout(a.current), e.current += n.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, hi), e.current);
}
const da = 4;
function wi(e, a, n) {
  const r = Math.max(0, n - e.bottom - da * 2), l = Math.max(0, e.top - da * 2);
  return a <= r || r >= l ? { top: e.bottom + da, maxHeight: r } : { top: e.top - da - Math.min(a, l), maxHeight: l };
}
function fi(e, a, n, r) {
  const l = { start: e.left, end: e.right - a }, i = { start: l.start + a <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - a));
}
function _i(e, a, n, r) {
  return { ...wi(e, a.height, n.height), left: fi(e, a.width, n.width, r) };
}
function fa(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function vi(e, a) {
  const n = a.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", fa(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function bi(e) {
  const a = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = a.map((r) => r.scrollTop);
  return () => a.forEach((r, l) => r.scrollTop = n[l]);
}
function Nt(e, a, n) {
  const r = bi(e), l = vi(e, a), i = _i(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: fa(i.left - l.box.left), top: fa(i.top - l.box.top), maxHeight: fa(i.maxHeight) }), r();
}
function pi(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function ln(e, a, n = "start") {
  ea(() => {
    const r = a.current, l = e.current;
    if (!r || !l) return;
    const i = pi(r), s = () => Nt(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), ea(() => {
    a.current && e.current && Nt(a.current, e.current, n);
  });
}
const gi = "_root_axvxm_2", yi = "_trigger_axvxm_7", Ni = "_value_axvxm_32", ki = "_menu_axvxm_50", $i = "_find_axvxm_72", Ci = "_list_axvxm_88", Si = "_option_axvxm_99", Ri = "_check_axvxm_118", Ti = "_empty_axvxm_129", fe = {
  root: gi,
  trigger: yi,
  value: Ni,
  menu: ki,
  find: $i,
  list: Ci,
  option: Si,
  check: Ri,
  empty: Ti
}, xi = 7;
function Li(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function kt(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function Ai(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => kt(e.options, e.value)), d = (u) => {
    var m;
    Vt(() => r(!1)), u && ((m = a.current) == null || m.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: Li(e.options, l),
    findable: e.options.length > xi,
    show: () => {
      e.disabled || (i(""), c(kt(e.options, e.value)), r(!0));
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
function Ei(e, a) {
  const n = w(!1);
  return S(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function Ii(e) {
  const a = rn();
  return (n) => {
    const r = a(n), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function on(e) {
  const a = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, a)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Mi(e) {
  return { ...on(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function sn(e, a, n) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = a[r.key];
    if (!l) return n(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const Bi = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Pi(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      Bi.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function ji({ entry: e, at: a, menu: n, ids: r, value: l }) {
  return /* @__PURE__ */ o(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
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
function tt(e, a) {
  const n = e.entries[e.active];
  return n ? a.option(n.index) : void 0;
}
function Di({ menu: e, ids: a, focusRef: n }) {
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
      "aria-activedescendant": tt(e, a),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: sn(e, on(e), () => {
      })
    }
  );
}
function Oi({ props: e, menu: a, ids: n, focusRef: r, trigger: l }) {
  const i = Ii(a), s = w(null);
  ln(l, s);
  const c = (d) => {
    nn(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: fe.menu, children: [
    a.findable && /* @__PURE__ */ t(Di, { menu: a, ids: n, focusRef: r }),
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
        "aria-activedescendant": a.findable ? void 0 : tt(a, n),
        onKeyDown: sn(a, Mi(a), c),
        children: a.entries.map((d, u) => /* @__PURE__ */ t(ji, { entry: d, at: u, menu: a, ids: n, value: e.value }, d.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: fe.empty, children: "No match" })
  ] });
}
function Hi(e, a) {
  const n = e.open ? tt(e, a) : void 0;
  S(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function cn(...e) {
  return e.filter(Boolean).join(" ");
}
function Fi(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function qi({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
  const i = !e.options.some((s) => s.value === e.value);
  return /* @__PURE__ */ t(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: cn(fe.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": a.open,
      "aria-controls": a.open ? n.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": Ea(e["aria-describedby"], n.value),
      "aria-invalid": e["aria-invalid"],
      disabled: e.disabled,
      ...Pi(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: fe.value, "data-placeholder": i || void 0, children: Fi(e) })
    }
  );
}
function dn(e) {
  const a = N(), n = { list: `${a}-list`, value: `${a}-value`, option: (d) => `${a}-option-${d}` }, r = w(null), l = w(null), i = w(null), s = Ai(e, l), c = Ei(s.open, i);
  return tn(s.open, r, () => s.close(!1)), Hi(s, n), /* @__PURE__ */ o("div", { ref: r, className: cn(fe.root, e.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(qi, { props: e, menu: s, ids: n, trigger: l, wantFocus: c }),
    e.name && /* @__PURE__ */ t("input", { type: "hidden", name: e.name, value: e.value }),
    s.open && /* @__PURE__ */ t(Oi, { props: e, menu: s, ids: n, focusRef: i, trigger: l })
  ] });
}
const zi = "_field_djnju_2", Wi = "_label_djnju_8", Ki = "_labelHidden_djnju_15", Gi = "_control_djnju_25", Ui = "_mono_djnju_45", Vi = "_area_djnju_50", Yi = "_invalid_djnju_57", Ie = {
  field: zi,
  label: Wi,
  labelHidden: Ki,
  control: Gi,
  mono: Ui,
  area: Vi,
  invalid: Yi
}, Ji = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, un = (e) => `${e}-label`;
function Xi({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? Ji : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function Qi({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t(
    dn,
    {
      id: a.id,
      triggerClassName: n,
      "aria-labelledby": un(a.id),
      "aria-invalid": a["aria-invalid"],
      "aria-describedby": a["aria-describedby"],
      value: e.value,
      options: e.options ?? [],
      disabled: e.disabled,
      placeholder: e.placeholder,
      onChange: e.onChange
    }
  );
}
function Zi({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const es = { input: Xi, select: Qi, textarea: Zi };
function as(e, a, n) {
  const r = es[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function ts(e, a, n) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Ea(r ? n : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function ns(e) {
  const a = e.mono ? [Ie.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [Ie.area] : [];
  return [Ie.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function rs(e) {
  return e ? `${Ie.label} ${Ie.labelHidden} ward-field-label` : `${Ie.label} ward-field-label`;
}
function M(e) {
  const a = N(), n = `${a}-msg`, r = ts(e, a, n), l = ns(e);
  return /* @__PURE__ */ o("div", { className: `${Ie.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: un(a), className: rs(e.labelHidden), htmlFor: a, children: e.label }),
    as(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${Ie.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const ls = "_root_1gft5_2", os = "_trigger_1gft5_9", is = "_panel_1gft5_33", ss = "_menu_1gft5_52", cs = "_group_1gft5_57", ds = "_heading_1gft5_62", us = "_item_1gft5_68", ms = "_separator_1gft5_94", hs = "_footer_1gft5_100", _e = {
  root: ls,
  trigger: os,
  panel: is,
  menu: ss,
  group: cs,
  heading: ds,
  item: us,
  separator: ms,
  footer: hs
}, mn = Be(null);
function ws(e, a) {
  const [n, r] = p({ open: e, start: null, request: 0 });
  return {
    ...n,
    show: (l) => r((i) => ({ open: !0, start: l, request: i.request + 1 })),
    close: (l) => {
      var i;
      Vt(() => r((s) => ({ ...s, open: !1 }))), l && ((i = a.current) == null || i.focus());
    }
  };
}
const fs = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function _s(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const n = fs.get(a.key);
      n && (a.preventDefault(), e.show(n));
    },
    onKeyUp: (a) => {
      a.key === " " && a.preventDefault();
    }
  };
}
function hn(...e) {
  return e.filter(Boolean).join(" ");
}
function vs(e, a = {}) {
  const { ref: n, className: r, ...l } = a;
  return { ...l, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: hn(_e.trigger, r) };
}
function bs(e) {
  const a = N(), n = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = w(null), l = w(null), i = ws(e.defaultOpen === !0, l);
  return tn(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: hn(_e.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ...vs(l, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ..._s(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ t(mn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function ps(e) {
  let a = 0;
  const n = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function gs(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const wn = (e, a) => (e % a + a) % a;
function Xe(e, a, n) {
  for (let r = 1; r <= e.length; r++) {
    const l = wn(a + n * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const ys = (e) => e.split("").every((a) => a === e[0]);
function Ns(e, a, n) {
  const r = ys(n), l = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = wn(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function ks(e) {
  const a = w([]);
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
function $s(e, a) {
  const { items: n } = e, r = () => {
    var l;
    return (l = e.refs.current[e.current()]) == null ? void 0 : l.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(Xe(n, e.current(), 1))],
    ["ArrowUp", () => e.focus(Xe(n, e.current(), -1))],
    ["Home", () => e.focus(Xe(n, -1, 1))],
    ["End", () => e.focus(Xe(n, n.length, -1))],
    ["Escape", () => a.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function Cs(e, a) {
  const n = w(!1), r = rn(), l = $s(e, a), i = (s) => {
    nn(s) && e.focus(Ns(e.items, e.current(), r(s.key)));
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
function Ss(e, a) {
  const { start: n, request: r } = a, l = w(e);
  l.current = e, S(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? Xe(i, -1, 1) : Xe(i, i.length, -1));
  }, [n, r]);
}
function Rs({ row: e, nav: a, popup: n }) {
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
function fn(e) {
  const { item: a, at: n } = e.row, r = {
    ref: (l) => {
      e.nav.refs.current[n] = l;
    },
    role: "menuitem",
    tabIndex: -1,
    className: _e.item,
    "aria-disabled": a.disabled ? "true" : void 0,
    ...Rs(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: F(a.href), ...r, children: a.label }) : /* @__PURE__ */ t("button", { type: "button", ...r, children: a.label });
}
function Ts({ heading: e, rows: a, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: _e.group, children: [
    /* @__PURE__ */ t("div", { id: l, className: _e.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(fn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function xs({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: _e.separator }) : e.kind === "group" ? /* @__PURE__ */ t(Ts, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(fn, { row: e.row, nav: a, popup: n });
}
function Ls() {
  const e = Me(mn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function As({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = Ls(), c = w(null);
  ln(s, c, n);
  const d = ps(e), u = ks(d.flatMap(gs).map((f) => f.item)), m = Cs(u, r);
  return Ss(u, r), /* @__PURE__ */ o("div", { ref: c, className: _e.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: l, "aria-labelledby": i, className: _e.menu, ...m, children: d.map((f, v) => /* @__PURE__ */ t(xs, { block: f, nav: u, popup: r }, v)) }),
    a && /* @__PURE__ */ t("p", { className: _e.footer, children: a })
  ] });
}
const Es = (e, a) => e.reduce((n, r) => n + r + a, -a);
function Is({ room: e, widths: a, more: n, gap: r }, l) {
  const i = a.map((d, u) => u);
  if (Es(a, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([l]);
  let c = a[l] + r + n;
  for (const d of i)
    if (d !== l) {
      if (c += a[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Oa = (e) => Number.parseFloat(e) || 0, $t = (e) => e.getBoundingClientRect().width;
function Ms(e) {
  const a = getComputedStyle(e), n = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Oa(a.paddingInlineStart) - Oa(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(':scope > [role="tab"]'), $t),
    more: n ? $t(n) : 0,
    gap: Oa(a.columnGap)
  };
}
function Bs(e, a) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(a);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const Ps = (e, a) => JSON.stringify(e) === JSON.stringify(a);
function js(e, a, n) {
  const [r, l] = p(null);
  return ea(() => {
    const i = e.current;
    if (!i) return;
    const s = () => {
      const c = Ms(i);
      l((d) => Ps(d, c) ? d : c);
    };
    return s(), Bs(i, s);
  }, [e, n]), r && Is(r, a);
}
const Ds = "_strip_1x6px_2", Os = "_fits_1x6px_33", Hs = "_probe_1x6px_41", Fs = "_moreRoot_1x6px_50", qs = "_more_1x6px_50", zs = "_tab_1x6px_69", Ws = "_count_1x6px_105", ve = {
  strip: Ds,
  fits: Os,
  probe: Hs,
  moreRoot: Fs,
  more: qs,
  tab: zs,
  count: Ws
}, _n = "More";
function Ks(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
const vn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function bn(e) {
  return `${ve.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
const Gs = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Us({ tab: e, active: a, place: n, onChange: r }) {
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
function Vs(e, a) {
  return (n) => {
    a(n), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Ys({ tabs: e, trigger: a, onPick: n }) {
  return /* @__PURE__ */ t(bs, { label: _n, className: ve.moreRoot, trigger: { ...a, role: "tab", "aria-selected": !1, className: ve.more }, children: /* @__PURE__ */ t(As, { align: "end", entries: e.map((r) => ({ label: vn(r), onSelect: () => n(r.id) })) }) });
}
function Js(e, a, n) {
  return !a || a.includes(n) ? e.itemProps(n) : Gs;
}
function pS({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l = 1 }) {
  const i = Ra({ orientation: "horizontal" }), s = Ks(e, a);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = w(null), d = js(c, s, e.map(vn).join(`
`)), u = d ? e.filter((m, f) => !d.includes(f)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${bn(l)} ${ve.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((m, f) => /* @__PURE__ */ t(Us, { tab: m, active: a, place: Js(i, d, f), onChange: n }, m.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${_e.trigger} ${ve.more} ${ve.probe}`, children: _n }),
    u.length > 0 && /* @__PURE__ */ t(Ys, { tabs: u, trigger: i.itemProps(e.length), onPick: Vs(c, n) })
  ] });
}
const Ct = 7;
function gS({ links: e, active: a, label: n, level: r = 1 }) {
  if (e.length > Ct) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${Ct} — the set is fixed`);
  const l = w(null);
  return Aa(l, e.length), Zt(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t("nav", { ref: l, className: bn(r), "aria-label": n, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ve.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: ve.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const Xs = "_root_v56ff_3", Qs = "_segment_v56ff_9", St = {
  root: Xs,
  segment: Qs
};
function pn({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Ra({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === a));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ t("div", { className: `${St.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "radio",
      className: St.segment,
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
const Zs = "_sidebar_s9o1j_3", ec = "_brand_s9o1j_9", ac = "_mark_s9o1j_17", tc = "_word_s9o1j_24", nc = "_nav_s9o1j_30", rc = "_navItem_s9o1j_39", lc = "_footLink_s9o1j_49", oc = "_group_s9o1j_58", ic = "_groupName_s9o1j_65", sc = "_agents_s9o1j_81", cc = "_agent_s9o1j_81", dc = "_root_s9o1j_96", uc = "_agentTop_s9o1j_105", mc = "_dot_s9o1j_112", hc = "_agentName_s9o1j_124", wc = "_agentMeta_s9o1j_138", fc = "_foot_s9o1j_49", _c = "_footName_s9o1j_150", vc = "_footLinks_s9o1j_157", bc = "_linkBrand_s9o1j_184", pc = "_label_s9o1j_205", gc = "_note_s9o1j_210", yc = "_footer_s9o1j_226", x = {
  sidebar: Zs,
  brand: ec,
  mark: ac,
  word: tc,
  nav: nc,
  navItem: rc,
  new: "_new_s9o1j_48",
  footLink: lc,
  group: oc,
  groupName: ic,
  agents: sc,
  agent: cc,
  root: dc,
  agentTop: uc,
  dot: mc,
  agentName: hc,
  agentMeta: wc,
  foot: fc,
  footName: _c,
  footLinks: vc,
  linkBrand: bc,
  label: pc,
  note: gc,
  footer: yc
};
function Nc({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: x.agent,
      href: F(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: x.agentTop, children: [
          /* @__PURE__ */ t(
            "span",
            {
              className: x.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": et(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ t("span", { className: x.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ t("span", { className: x.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function kc({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ t("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${x.footLink} ward-target`, href: F(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function $c({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: x.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: x.brand, children: [
      /* @__PURE__ */ t("span", { className: x.mark }),
      /* @__PURE__ */ t("span", { className: x.word, children: e })
    ] }),
    /* @__PURE__ */ t("div", { className: x.nav, children: a.map((s) => /* @__PURE__ */ t("a", { className: x.navItem, href: F(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: x.group, children: [
      /* @__PURE__ */ o("span", { className: x.groupName, children: [
        n,
        " · ",
        ee(r.length)
      ] }),
      l && /* @__PURE__ */ t("a", { className: x.new, href: F(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ t(Nc, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(kc, { shared: i })
  ] });
}
function Cc(e) {
  return e.destinations ?? e.items ?? [];
}
function Sc({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.linkBrand, children: e });
}
function Rc({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.footer, children: e });
}
function Tc({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: F(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: x.note, children: e.note })
  ] });
}
function xc(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(Sc, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: Cc(e).map((a) => /* @__PURE__ */ t(Tc, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(Rc, { children: e.children })
  ] });
}
function Lc(e) {
  return "agents" in e;
}
function yS(e) {
  return Lc(e) ? /* @__PURE__ */ t($c, { ...e }) : /* @__PURE__ */ t(xc, { ...e });
}
const Ac = "_mark_wlgi8_3", Ec = {
  mark: Ac
}, Ic = { met: "✓", unmet: "", failed: "✕" };
function nt({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: Ec.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Ic[e]
    }
  );
}
const Mc = "_marker_br9fi_2", Bc = {
  marker: Mc
}, Pc = {
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
}, jc = { running: " ward-running" };
function Pe({ size: e, kind: a, label: n }) {
  const r = { "--marker": Pc[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${Bc.marker} ward-marker ward-marker--${a}${jc[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const Dc = "_root_ti0pq_2", Oc = "_chip_ti0pq_11", Hc = "_noCase_ti0pq_23", ua = {
  root: Dc,
  chip: Oc,
  noCase: Hc
};
function Fc(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function rt({ connection: e, since: a, lastEventAt: n }) {
  const r = Fc(a, n), l = at(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${ua.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(Pe, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${ua.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ t("span", { className: ua.noCase, children: Za(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${ua.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    de(r)
  ] });
}
const qc = "_root_1cvxf_2", zc = "_context_1cvxf_12", Wc = "_row_1cvxf_1", Kc = "_heading_1cvxf_25", Gc = "_headingWrap_1cvxf_33", Uc = "_chips_1cvxf_38", Vc = "_title_1cvxf_45", Yc = "_consequence_1cvxf_55", Jc = "_actionsWrap_1cvxf_62", Xc = "_actions_1cvxf_62", Qc = "_action_1cvxf_62", Zc = "_overflowPanel_1cvxf_91", ed = "_measureClip_1cvxf_102", ad = "_measure_1cvxf_102", Y = {
  root: qc,
  context: zc,
  row: Wc,
  heading: Kc,
  headingWrap: Gc,
  chips: Uc,
  title: Vc,
  consequence: Yc,
  actionsWrap: Jc,
  actions: Xc,
  action: Qc,
  overflowPanel: Zc,
  measureClip: ed,
  measure: ad
};
function td({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(aa, { as: "h1", className: Y.title, text: e }) : /* @__PURE__ */ t("h1", { className: Y.title, children: e });
}
function nd({ title: e, consequence: a, consequenceHint: n, density: r }) {
  return /* @__PURE__ */ o("div", { className: Y.heading, children: [
    /* @__PURE__ */ t(td, { title: e, density: r }),
    a && /* @__PURE__ */ t("p", { className: Y.consequence, title: n, children: a })
  ] });
}
function Ua({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: Y.action, "data-action": "", children: a }, n));
}
function Rt({ disclosure: e }) {
  return /* @__PURE__ */ t(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function rd({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(Rt, { disclosure: l }) : a ? [/* @__PURE__ */ t(Rt, { disclosure: l }, "more"), /* @__PURE__ */ t(Ua, { actions: e }, "actions")] : /* @__PURE__ */ t(Ua, { actions: e });
}
function ld(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function od({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: Y.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ua, { actions: e }) });
}
function id(e, a) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function sd({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Y.context, children: [
    /* @__PURE__ */ t(mi, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: Y.chips, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] });
}
function cd(...e) {
  return e.some((a) => a === null);
}
function dd(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function ud(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + dd(e);
}
function md(e, a, n, r, l) {
  if (l === 0 || cd(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], d = Math.max(0, e.clientWidth - ud(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function hd(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function wd(e) {
  return hr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function fd(e, a) {
  return a.length === 0 && e.length === 1 && wd(e[0]);
}
function _d(e, a) {
  const n = w(null), r = w(null), l = w(null), i = w(null), [s, c] = p(!1);
  return S(() => {
    const d = n.current;
    if (!hd(d)) return;
    const u = () => c(md(d, r.current, l.current, i.current, e.length)), m = new ResizeObserver(u);
    return m.observe(d), i.current && m.observe(i.current), u(), () => m.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function vd({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: Y.measureClip, children: /* @__PURE__ */ o("div", { className: Y.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function bd({ connection: e }) {
  return e ? /* @__PURE__ */ t(rt, { connection: e.connection, since: e.since }) : null;
}
function NS({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: m, headingRef: f, actionsRef: v, measureRef: y, collapsed: L } = _d(i, fd(i, s)), B = s.length > 0, { disclosure: le, close: Te } = id(L || B, v), ae = ld(s, i, L, d);
  return /* @__PURE__ */ o("header", { className: Y.root, "data-density": u, children: [
    /* @__PURE__ */ t(sd, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Y.row, ref: m, children: [
      /* @__PURE__ */ t("div", { ref: f, className: Y.headingWrap, children: /* @__PURE__ */ t(nd, { title: n, consequence: r, consequenceHint: l, density: u }) }),
      /* @__PURE__ */ o("div", { className: Y.actionsWrap, children: [
        /* @__PURE__ */ t(bd, { connection: c }),
        /* @__PURE__ */ t("div", { className: Y.actions, ref: v, "data-ward-actions": !0, children: /* @__PURE__ */ t(rd, { actions: i, hasMore: B, collapsed: L, onOverflow: d, disclosure: le }) })
      ] })
    ] }),
    /* @__PURE__ */ t(od, { actions: ae, disclosure: le, onEscape: Te }),
    /* @__PURE__ */ t(vd, { actions: i, hasMore: B, measureRef: y })
  ] });
}
const pd = "_root_td96x_2", gd = "_body_td96x_16", Tt = {
  root: pd,
  body: gd
};
function kS({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${Tt.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: Tt.body, children: n }) });
}
const yd = "_root_bf1pc_2", Nd = "_table_bf1pc_9", kd = "_caption_bf1pc_14", $d = "_series_bf1pc_23", Cd = "_category_bf1pc_31", Sd = "_cell_bf1pc_39", Rd = "_track_bf1pc_45", Td = "_lane_bf1pc_52", xd = "_bar_bf1pc_56", Ld = "_value_bf1pc_63", Ad = "_swatch_bf1pc_70", Ed = "_empty_bf1pc_78", J = {
  root: yd,
  table: Nd,
  caption: kd,
  series: $d,
  category: Cd,
  cell: Sd,
  track: Rd,
  lane: Td,
  bar: xd,
  value: Ld,
  swatch: Ad,
  empty: Ed
}, Id = "—", xt = 6;
function Md(e, a) {
  if (a.length < 1 || a.length > xt)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${xt}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function Bd(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function gn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Pd(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function jd({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = Pd(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: J.cell, children: /* @__PURE__ */ o("span", { className: J.track, children: [
    /* @__PURE__ */ t("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: J.value, children: e === null ? l : r(e) })
  ] }) });
}
function Dd({ series: e }) {
  return /* @__PURE__ */ t(T, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: J.swatch, "data-step": gn(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Od({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: J.caption, children: e }),
    /* @__PURE__ */ t("p", { className: J.empty, children: a })
  ] });
}
function Hd({ title: e, categories: a, series: n, top: r, format: l = ee, categoryHead: i = "Category", missing: s = Id }) {
  return /* @__PURE__ */ t("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: J.table, children: [
    /* @__PURE__ */ t("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: J.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(Dd, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: J.category, children: c }),
      n.map((u, m) => /* @__PURE__ */ t(jd, { value: u.values[d], top: r, step: gn(m, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function $S(e) {
  Md(e.categories, e.series);
  const a = Bd(e.series);
  return a === 0 ? /* @__PURE__ */ t(Od, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(Hd, { ...e, top: a });
}
const Fd = "_root_1bfqw_2", qd = "_figure_1bfqw_7", zd = "_of_1bfqw_13", Wd = "_bar_1bfqw_18", Kd = "_rows_1bfqw_38", Gd = "_row_1bfqw_38", Ud = "_label_1bfqw_49", Vd = "_amount_1bfqw_54", Le = {
  root: Fd,
  figure: qd,
  of: zd,
  bar: Wd,
  rows: Kd,
  row: Gd,
  label: Ud,
  amount: Vd
};
function Yd({ spent: e, ceiling: a, breakdown: n }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Le.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Le.figure} ward-stat-value`, children: [
      ne(e),
      " ",
      /* @__PURE__ */ o("span", { className: Le.of, children: [
        "of ",
        ne(a)
      ] })
    ] }),
    /* @__PURE__ */ t(
      "meter",
      {
        className: `${Le.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${ne(e)} of ${ne(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    n && /* @__PURE__ */ t("ul", { className: Le.rows, children: n.map((l) => /* @__PURE__ */ o("li", { className: `${Le.row} ward-costrow`, children: [
      /* @__PURE__ */ t("span", { className: Le.label, children: l.label }),
      /* @__PURE__ */ t("span", { className: Le.amount, children: ne(l.amount) })
    ] }, l.label)) })
  ] });
}
const Jd = "_frame_9xel2_2", Xd = "_table_9xel2_6", Qd = "_th_9xel2_12", Zd = "_td_9xel2_13", eu = "_sort_9xel2_48", au = "_row_9xel2_60", tu = "_empty_9xel2_68", Ee = {
  frame: Jd,
  table: Xd,
  th: Qd,
  td: Zd,
  sort: eu,
  row: au,
  empty: tu
}, nu = { asc: "ascending", desc: "descending" };
function ru(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return nu[a.direction];
}
function lu(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: Ee.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function ou(e) {
  return e === void 0 ? void 0 : { width: e };
}
function iu({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Ee.th,
      style: ou(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ru(e, a),
      children: lu(e, n)
    }
  );
}
function su({ row: e, props: a }) {
  const n = a.rowId(e), r = (a.lockedIds ?? []).includes(n);
  return /* @__PURE__ */ t(
    "tr",
    {
      className: Ee.row,
      "data-selected": n === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ t("td", { className: Ee.td, "data-align": l.align, "data-mono": l.mono, "data-drop": l.dropPriority, children: a.renderCell(e, l.key) }, l.key))
    }
  );
}
function cu({
  label: e,
  columns: a,
  rows: n,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u
}) {
  return n.length === 0 ? /* @__PURE__ */ t("div", { className: Ee.empty, children: u }) : /* @__PURE__ */ t("div", { className: Ee.frame, children: /* @__PURE__ */ o("table", { className: Ee.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Ee.head, children: a.map((m) => /* @__PURE__ */ t(iu, { column: m, sort: c, onSort: d }, m.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((m) => /* @__PURE__ */ t(su, { row: m, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(m))) })
  ] }) });
}
const du = "_list_v0s52_2", uu = {
  list: du
};
function CS({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: uu.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const mu = "_label_1u62a_2", hu = {
  label: mu
};
function SS({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: hu.label, children: a.header }) }, a.key)) }) });
}
const wu = "_stack_bp6a0_2", fu = {
  stack: wu
};
function RS({ children: e }) {
  return /* @__PURE__ */ t("span", { className: fu.stack, "data-ward-action-stack": "", children: e });
}
const _u = "_set_1z0sq_2", vu = "_legend_1z0sq_7", bu = "_row_1z0sq_15", pu = "_control_1z0sq_20", gu = "_input_1z0sq_26", yu = "_label_1z0sq_31", Nu = "_consequence_1z0sq_36", De = {
  set: _u,
  legend: vu,
  row: bu,
  control: pu,
  input: gu,
  label: yu,
  consequence: Nu
};
function yn({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = N(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: De.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: De.legend, children: e }),
    a.map((m) => {
      const f = `${u}-${m.value}`, v = m.consequence ? `${f}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: De.row, children: [
        /* @__PURE__ */ o("span", { className: De.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: f,
              type: "radio",
              name: u,
              className: De.input,
              value: m.value,
              checked: n === m.value,
              disabled: l,
              "aria-describedby": Ea(v, s),
              onChange: () => !l && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: f, className: De.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ t("p", { id: v, className: `${De.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const ku = "_root_s12pg_2", $u = "_head_s12pg_11", Cu = "_note_s12pg_30", Su = "_index_s12pg_35", Ru = "_dot_s12pg_39", Tu = "_counter_s12pg_50", xu = "_trailing_s12pg_58", He = {
  root: ku,
  head: $u,
  note: Cu,
  index: Su,
  dot: Ru,
  counter: Tu,
  trailing: xu
};
function Lu({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${He.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: He.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Au({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: He.counter, "aria-hidden": "true", children: e }) : null;
}
function Lt({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${He.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: He.head, children: [
      /* @__PURE__ */ t(Lu, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: He.note, children: n }),
    /* @__PURE__ */ t(Au, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: He.trailing, children: i })
  ] });
}
const Eu = "_strip_ww53x_2", Iu = "_cell_ww53x_7", Mu = "_value_ww53x_12", Bu = "_link_ww53x_29", Pu = "_label_ww53x_49", ze = {
  strip: Eu,
  cell: Iu,
  value: Mu,
  link: Bu,
  label: Pu
};
function ju(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const Nn = (e) => `${ze.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Du({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: ze.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Nn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${ze.label} ward-stat-label`, children: e.label })
  ] });
}
function Ou({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: ze.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Nn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${ze.link} ward-stat-link`, href: F(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${ze.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Ma({ cells: e, divided: a = !1 }) {
  return ju(e), /* @__PURE__ */ t("dl", { className: `${ze.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(Du, { cell: n }, n.label) : /* @__PURE__ */ t(Ou, { cell: n, href: n.href }, n.label)) });
}
const Hu = "_root_1eb1u_2", Fu = "_track_1eb1u_8", qu = "_thumb_1eb1u_46", zu = "_labelHidden_1eb1u_64", Wu = "_label_1eb1u_64", Ku = "_lockedNote_1eb1u_84", Fe = {
  root: Hu,
  track: Fu,
  thumb: qu,
  labelHidden: zu,
  label: Wu,
  lockedNote: Ku
};
function Gu(e) {
  return e ? `${Fe.label} ${Fe.labelHidden}` : Fe.label;
}
function We({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = l ? !0 : a, m = r || l;
  return /* @__PURE__ */ o("span", { className: `${Fe.root} ward-switchrow`, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        id: d,
        role: "switch",
        "aria-checked": u,
        "aria-label": e,
        "aria-labelledby": c,
        "aria-describedby": i,
        className: `${Fe.track} ward-switch`,
        "data-on": u,
        "data-locked": l ? !0 : void 0,
        disabled: m,
        onClick: () => !m && (n == null ? void 0 : n(!u)),
        children: /* @__PURE__ */ t("span", { className: Fe.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: Gu(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: Fe.lockedNote, children: "always on" })
    ] })
  ] });
}
const Uu = "_bar_1vp69_2", Vu = "_skip_1vp69_11", Yu = "_mark_1vp69_22", Ju = "_nav_1vp69_30", Xu = "_list_1vp69_34", Qu = "_select_1vp69_41", Zu = "_selectTrigger_1vp69_45", em = "_dest_1vp69_52", am = "_actor_1vp69_71", tm = "_actorMark_1vp69_84", nm = "_actorLabel_1vp69_89", rm = "_tagline_1vp69_108", oe = {
  bar: Uu,
  skip: Vu,
  mark: Yu,
  nav: Ju,
  list: Xu,
  select: Qu,
  selectTrigger: Zu,
  dest: em,
  actor: am,
  actorMark: tm,
  actorLabel: nm,
  tagline: rm
};
function lm(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function om(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function TS({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = om(r);
  return /* @__PURE__ */ o("header", { className: oe.bar, children: [
    /* @__PURE__ */ t("a", { className: `${oe.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ t("span", { className: oe.mark, children: e }),
    l && /* @__PURE__ */ t("span", { className: oe.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: oe.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ t("ul", { className: oe.list, children: a.map((d) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "a",
        {
          className: `${oe.dest} ward-target`,
          href: F(d.href),
          "aria-current": d.id === n ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ t(
        dn,
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
      /* @__PURE__ */ t("span", { className: oe.actorMark, "aria-hidden": "true", children: lm(c) })
    ] })
  ] });
}
const im = "_tree_zzoob_2", sm = "_item_zzoob_6", cm = "_row_zzoob_10", dm = "_button_zzoob_22", ya = {
  tree: im,
  item: sm,
  row: cm,
  button: dm
}, kn = Be(null);
function um({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = Ra({ orientation: "vertical" });
  return /* @__PURE__ */ t(kn.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: ya.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const mm = { ArrowRight: !0, ArrowLeft: !1 };
function At(e) {
  return e ? !0 : void 0;
}
function hm(e, a) {
  const n = mm[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function wm(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function fm(e) {
  const a = [ya.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
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
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function gm({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function $n(e) {
  const a = Me(kn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = _m(e);
  return /* @__PURE__ */ o("li", { className: ya.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: fm(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": n,
        "data-depth": e.depth,
        "data-unresolved": At(e.unresolved),
        "data-inherited": At(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${ya.button} ward-treeitem-btn`,
            onClick: () => wm(e),
            onKeyDown: (r) => hm(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: vm(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: bm(e.label), children: e.label }),
              /* @__PURE__ */ t(pm, { value: e.detail }),
              /* @__PURE__ */ t(gm, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const ym = "_frame_1sbky_2", Nm = "_subjectRail_1sbky_22", km = "_subject_1sbky_22", $m = "_rail_1sbky_42", Cm = "_record_1sbky_66", Sm = "_recordBody_1sbky_71", Rm = "_stageGrid_1sbky_120", Tm = "_band_1sbky_146", xm = "_bandBody_1sbky_155", Lm = "_bandActions_1sbky_160", Am = "_scroller_1sbky_168", Em = "_board_1sbky_204", Im = "_lanes_1sbky_213", Z = {
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
  lanes: Im
};
function xS({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: Z.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function Et(e) {
  return e ? "true" : void 0;
}
function LS({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Z.subjectRail, "data-ward-subject-rail": n, "data-ruled": Et(i), children: [
    /* @__PURE__ */ t("div", { className: Z.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Z.rail, "data-sticky": Et(l), "aria-label": r, children: a })
  ] });
}
function AS({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(Lt, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(Lt, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: Z.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Mm = "_form_1j8ub_2", Bm = "_fields_1j8ub_9", Pm = "_actions_1j8ub_19", Ha = {
  form: Mm,
  fields: Bm,
  actions: Pm
};
function ES({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ha.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Ha.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Ha.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function IS({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: Z.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Z.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Z.bandActions, children: a })
  ] });
}
const jm = "(max-width: 767.98px)";
function lt({ label: e, children: a, laneCount: n }) {
  const r = w(null);
  Aa(r, n ?? wr.count(a));
  const l = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t("div", { ref: r, className: Z.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: l, children: a });
}
function Dm({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Z.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(lt, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Om({ lanes: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: Z.board, "data-ward-board": "", children: /* @__PURE__ */ t(lt, { label: a, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ t(fr, { children: n.content }, n.id)) }) });
}
function MS({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = La(jm);
  return n === void 0 ? /* @__PURE__ */ t(lt, { label: a, children: e }) : l ? /* @__PURE__ */ t(Dm, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(Om, { lanes: n, label: a });
}
function BS({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = w(null), i = Math.max(e, 1);
  Aa(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ t("div", { ref: l, className: Z.stageGrid, role: "region", "aria-label": n, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const Hm = "_block_vmwmz_2", Fm = "_sentence_vmwmz_15", qm = "_meta_vmwmz_20", zm = "_action_vmwmz_25", Wm = "_strip_vmwmz_29", Km = "_loading_vmwmz_48", Gm = "_label_vmwmz_56", Um = "_counter_vmwmz_63", be = {
  block: Hm,
  sentence: Fm,
  meta: qm,
  action: zm,
  strip: Wm,
  loading: Km,
  label: Gm,
  counter: Um
};
function Vm({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: be.action, children: /* @__PURE__ */ t(b, { onClick: e.onClick, children: e.label }) });
}
function Ba({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${be.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: be.sentence, children: e }),
    n,
    /* @__PURE__ */ t(Vm, { action: a })
  ] });
}
function Ym(e) {
  return /* @__PURE__ */ t(Ba, { ...e, kind: "ward-emptystate" });
}
function PS({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(Ba, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function jS(e) {
  return /* @__PURE__ */ t(Ba, { ...e });
}
function DS({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(Ba, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function OS({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function HS({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function FS({ label: e, startedAt: a }) {
  const n = w(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  S(() => {
    const s = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = at(n.current, r);
  return /* @__PURE__ */ o("div", { className: `${be.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ t("span", { className: be.label, children: e }),
    r ? /* @__PURE__ */ t("span", { className: be.counter, children: Za(i) }) : null
  ] });
}
const Jm = "_note_cigdt_2", Xm = {
  note: Jm
};
function Qm({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: Xm.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const Zm = "_card_k7btg_3", eh = "_hit_k7btg_31", ah = "_head_k7btg_44", th = "_title_k7btg_51", nh = "_meta_k7btg_57", rh = "_since_k7btg_66", lh = "_sep_k7btg_76", oh = "_fields_k7btg_80", ih = "_field_k7btg_80", sh = "_last_k7btg_98", ch = "_reason_k7btg_110", se = {
  card: Zm,
  hit: eh,
  head: ah,
  title: th,
  meta: nh,
  since: rh,
  sep: lh,
  fields: oh,
  field: ih,
  last: sh,
  reason: ch
}, dh = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function uh(e, a, n) {
  const r = wa(e, "blue"), l = wa(e, "orange"), i = wa(e, "green"), s = w(/* @__PURE__ */ new Set());
  S(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = dh[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, l]);
}
const mh = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ne(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function hh(e, a) {
  return mh[a](e);
}
function wh({ item: e, connection: a }) {
  const n = /* @__PURE__ */ t("span", { className: se.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ o("p", { className: se.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    n,
    /* @__PURE__ */ t(Re, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
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
function fh({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: se.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function _h({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: se.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function vh({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: se.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: se.field, children: hh(e, n) }, n)) });
}
const Va = (e) => e ? !0 : void 0;
function bh(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function ph(e, a, n) {
  e == null || e(a, n);
}
function gh(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function yh({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: se.last, "data-stale": Va(a), children: n }) : null;
}
function Pa(e) {
  const a = e.fields ?? [], n = e.item, r = w(null);
  uh(r, n.key, e.feed);
  const l = gh(e.feed), i = bh(n);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": n.key,
      className: se.card,
      style: i,
      "data-selected": Va(e.selected),
      "data-flagged": Va(n.flagged),
      children: [
        /* @__PURE__ */ t("button", { type: "button", className: se.hit, onClick: (s) => ph(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(fh, { item: n }),
        /* @__PURE__ */ t(aa, { as: "p", className: se.title, text: n.title }),
        /* @__PURE__ */ t(wh, { item: n, connection: l }),
        /* @__PURE__ */ t(_h, { reason: n.blockedReason }),
        /* @__PURE__ */ t(vh, { item: n, fields: a }),
        /* @__PURE__ */ t(yh, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const Nh = "_column_1j8bi_3", kh = "_head_1j8bi_21", $h = "_label_1j8bi_30", Ch = "_count_1j8bi_39", Sh = "_list_1j8bi_53", ra = {
  column: Nh,
  head: kh,
  label: $h,
  count: Ch,
  list: Sh
};
function Cn(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function Rh({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: ra.head, children: [
    /* @__PURE__ */ t("h2", { className: ra.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: ra.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Th(e) {
  return /* @__PURE__ */ t("div", { className: ra.list, role: "list", children: e.rows.map((a, n) => {
    var r;
    return /* @__PURE__ */ t(
      Pa,
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
function xh({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), m = e.cap !== void 0 && a.length > e.cap, f = Cn(a, r);
  return /* @__PURE__ */ o("section", { className: ra.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(Rh, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(Th, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: f }),
    m && /* @__PURE__ */ t(Qm, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Lh = "_foot_cs4jr_2", Ah = "_note_cs4jr_13", Eh = "_link_cs4jr_19", Fa = {
  foot: Lh,
  note: Ah,
  link: Eh
};
function qS({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Fa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: Fa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${Fa.link} ward-target`, href: F(e), children: "Configure board" })
  ] });
}
const Ih = "_head_1tfi5_3", Mh = "_identity_1tfi5_12", Bh = "_titleRow_1tfi5_18", Ph = "_title_1tfi5_18", jh = "_key_1tfi5_35", Dh = "_rollup_1tfi5_45", Oh = "_tools_1tfi5_53", Hh = "_swatch_1tfi5_101", Fh = "_mark_1tfi5_108", ke = {
  head: Ih,
  identity: Mh,
  titleRow: Bh,
  title: Ph,
  key: jh,
  rollup: Dh,
  tools: Oh,
  swatch: Hh,
  mark: Fh
}, It = "initials:";
function qh(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ee(e)} loaded this week`;
}
function zh(e) {
  const a = [qh(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ee(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function Wh(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ee(e.inFlight),
      " in flight"
    ] }),
    " · ",
    zh(e)
  ] });
}
function Kh(e) {
  return e.startsWith(It) ? e.slice(It.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function Gh({ markRef: e, streamStep: a }) {
  const n = { "--stream": pe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ke.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: Kh(e) }) : /* @__PURE__ */ t("span", { className: ke.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Uh({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function zS({
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
        /* @__PURE__ */ t(Gh, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ke.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ke.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ke.rollup, "aria-live": "polite", children: Wh(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ke.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(Uh, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(rt, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const Vh = "_head_1sejb_14", Yh = "_line_1sejb_15", Jh = "_cHandle_1sejb_36", Xh = "_cName_1sejb_41", Qh = "_nameLine_1sejb_49", Zh = "_cLabel_1sejb_56", ew = "_cCap_1sejb_61", aw = "_cShown_1sejb_66", tw = "_name_1sejb_49", nw = "_noCap_1sejb_88", rw = "_state_1sejb_102", lw = "_handle_1sejb_111", ow = "_sub_1sejb_137", j = {
  head: Vh,
  line: Yh,
  cHandle: Jh,
  cName: Xh,
  nameLine: Qh,
  cLabel: Zh,
  cCap: ew,
  cShown: aw,
  name: tw,
  noCap: nw,
  state: rw,
  handle: lw,
  sub: ow
}, iw = "can't be hidden or collapsed", sw = "terminal · counted, not a column";
function WS() {
  return /* @__PURE__ */ o("div", { className: j.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: j.cHandle }),
    /* @__PURE__ */ t("span", { className: j.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: j.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: j.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: j.cShown, children: "Shown" })
  ] });
}
function cw(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function dw(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Mt(e) {
  return e.gate ? iw : e.terminal ? sw : dw(e.agentsMounted);
}
function uw(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function mw({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: j.cName, children: [
    /* @__PURE__ */ o("span", { className: j.nameLine, children: [
      /* @__PURE__ */ t("span", { className: j.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Mt(e) && /* @__PURE__ */ t("span", { className: j.sub, children: Mt(e) })
  ] });
}
function hw(e) {
  return e === void 0 ? "" : String(e);
}
function ww(e) {
  return e === "" ? void 0 : Number(e);
}
function fw({ name: e, onReorder: a }) {
  return /* @__PURE__ */ t("span", { className: j.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: j.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (n) => uw(n, a),
      children: "⠿"
    }
  ) });
}
function _w({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${j.cCap} ${j.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: j.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: hw(a.cap), onChange: (r) => n({ ...a, cap: ww(r) }) }) });
}
function vw({ stage: e, config: a, onChange: n }) {
  const r = cw(e, a.shown), l = e.gate || e.terminal, i = (s) => n({ ...a, shown: s });
  return /* @__PURE__ */ o("span", { className: j.cShown, children: [
    /* @__PURE__ */ t(We, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ t("span", { className: j.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function bw(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function KS({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: j.line, "data-kind": bw(e), children: [
    /* @__PURE__ */ t(fw, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(mw, { stage: e }),
    /* @__PURE__ */ t("span", { className: j.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(_w, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(vw, { stage: e, config: a, onChange: n })
  ] });
}
const pw = "_body_1a4f4_2", gw = "_head_1a4f4_9", yw = "_summary_1a4f4_19", Nw = "_block_1a4f4_20", kw = "_actionsBlock_1a4f4_21", $w = "_title_1a4f4_41", Cw = "_note_1a4f4_46", Sw = "_k_1a4f4_51", Rw = "_kv_1a4f4_58", Tw = "_row_1a4f4_64", xw = "_label_1a4f4_75", Lw = "_value_1a4f4_84", Aw = "_quote_1a4f4_90", Ew = "_actions_1a4f4_21", Iw = "_resolve_1a4f4_103", D = {
  body: pw,
  head: gw,
  summary: yw,
  block: Nw,
  actionsBlock: kw,
  title: $w,
  note: Cw,
  k: Sw,
  kv: Rw,
  row: Tw,
  label: xw,
  value: Lw,
  quote: Aw,
  actions: Ew,
  resolve: Iw
};
function Mw(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Bw(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(Re, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Pw(e) {
  const a = sa(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function jw(e) {
  return (e ?? []).map((a, n) => [a.label, a.value, `fact-${n}`]);
}
function Dw(e, a, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...Ia(Pw(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Mw(e),
    ...jw(n),
    ...Bw(e, a)
  ];
}
function Ow({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: D.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: D.k, children: a }),
    e
  ] });
}
function Hw(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function Fw({ item: e, showKey: a }) {
  const n = Hw(e);
  return !a && !n ? null : /* @__PURE__ */ o("div", { className: D.head, children: [
    a && /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ t(h, { role: n.role, label: n.label })
  ] });
}
function qw({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: D.block, children: [
    /* @__PURE__ */ t("p", { className: D.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: D.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: D.note, children: e.agentMeta })
  ] }) : null;
}
function GS({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const m = N(), f = Dw(e, l, d);
  return /* @__PURE__ */ t(ta, { kind: "drawer", labelledBy: m, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: D.body, children: [
    /* @__PURE__ */ t(Fw, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: D.summary, children: [
      /* @__PURE__ */ t("h2", { className: D.title, id: m, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: D.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: D.kv, children: f.map(([v, y, L]) => /* @__PURE__ */ o("div", { className: D.row, children: [
      /* @__PURE__ */ t("dt", { className: D.label, children: v }),
      /* @__PURE__ */ t("dd", { className: D.value, children: y })
    ] }, L ?? v)) }),
    /* @__PURE__ */ t(qw, { item: e }),
    /* @__PURE__ */ o("div", { className: D.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: D.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: D.note, children: c })
    ] }),
    /* @__PURE__ */ t(Ow, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const zw = "_root_3azmy_2", Ww = "_list_3azmy_7", Kw = "_item_3azmy_12", Gw = "_box_3azmy_18", Uw = "_text_3azmy_23", Vw = "_note_3azmy_28", Ue = {
  root: zw,
  list: Ww,
  item: Kw,
  box: Gw,
  text: Uw,
  note: Vw
};
function ja({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ue.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${Ue.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ue.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ue.box, children: /* @__PURE__ */ t(nt, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ue.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${Ue.note} ward-checklist-note`, children: a })
  ] });
}
const Yw = "_rail_znbbp_2", Jw = "_k_znbbp_11", Xw = "_head_znbbp_19", Qw = "_section_znbbp_25", Zw = "_card_znbbp_39", ef = "_strip_znbbp_46", af = "_skeleton_znbbp_60", tf = "_skeletonLabel_znbbp_74", nf = "_bar_znbbp_80", rf = "_note_znbbp_89", me = {
  rail: Yw,
  k: Jw,
  head: Xw,
  section: Qw,
  card: Zw,
  strip: ef,
  skeleton: af,
  skeletonLabel: tf,
  bar: nf,
  note: rf
};
function lf(e) {
  return (a) => e == null ? void 0 : e(a);
}
function qa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function of({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function sf({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(xh, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function cf(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(sf, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(of, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function US(e) {
  const a = lf(e.onOpen), n = Cn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(qa, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(Pa, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(qa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(cf, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(qa, { title: "Effect of this config", children: /* @__PURE__ */ t(ja, { items: e.effects, density: "compact" }) })
  ] });
}
function df(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function uf(e) {
  return Math.ceil(e.length / 2);
}
function mf(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Sn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function hf(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Sn(e);
  l !== void 0 && n(l), r(mf(e.type));
}
function wf(e, a, n, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => hf(i, n, r, l));
  }, [e, a, n, r, l]);
}
function ff(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function _f(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function vf(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function bf(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(uf(a ?? [])) + ")"
  };
}
function pf(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function gf(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: ne(e.cost) }) : null;
}
function yf(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function Nf(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(Re, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function kf(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function $f(e, a) {
  return a === void 0 ? e : df(e, a.ref);
}
function Cf(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function oa(e) {
  return e === !0 ? "true" : void 0;
}
function Rn(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = w(null), i = wa(l), s = w(/* @__PURE__ */ new Set()), [c, d] = p(ff(a));
  wf(e.feed, a.key, s, d, i);
  const u = _f(a, r), m = vf(a, n), f = bf(a, e.fields), v = kf(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Cf(e),
      className: "ward-workcard",
      "data-flagged": oa(a.flagged),
      "data-selected": oa(e.selected),
      style: f,
      ref: $f(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        pf(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: u.role, label: u.label }),
          gf(a, e.fields),
          yf(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Nf(n, c, e.connection, a.changedAt),
          v !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: v, children: v }) : null
        ] })
      ]
    }
  ) });
}
function Sf({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Rf(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Tf(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function xf(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(Sf, { count: e.items.length, cap: e.column.cap });
}
function Lf(e, a) {
  return e.roving ?? a;
}
function Af(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Ef(e, a) {
  return e.items.map((n, r) => /* @__PURE__ */ t(
    Rn,
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
function If(e) {
  const a = N(), n = Ra({ orientation: "vertical" }), r = Lf(e, n), l = Rf(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": oa(l), "data-gate": oa(e.column.gate), children: [
    Tf(e.column, e.items.length, a),
    xf(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...Af(e, n), children: Ef(e, r) })
  ] });
}
function Mf(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function Bf(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Pf(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function VS(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: Mf(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Bf(e),
      Pf(e.onConfigure),
      /* @__PURE__ */ t(rt, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function jf(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Df(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(We, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(We, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Of(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function YS(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": oa(jf(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: Df(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(an, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Of(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function JS(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(Rn, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(If, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function Hf(e, a) {
  const n = Sn(e);
  n !== void 0 && a(n);
}
function Ff(e, a, n) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => Hf(r, n));
  }, [e, a, n]);
}
function qf(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function zf(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ne(e.cost)]), a;
}
function Wf(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(Re, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Kf(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function XS(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  Ff(e.feed, a.key, l);
  const i = [...qf(a), ...zf(a)];
  return /* @__PURE__ */ o(ta, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Wf(n, r)
    ] }),
    Kf(a, e.actions)
  ] });
}
const Gf = "_card_54446_3", Uf = "_head_54446_30", Vf = "_mark_54446_38", Yf = "_name_54446_50", Jf = "_chips_54446_71", Xf = "_description_54446_77", Qf = "_run_54446_82", Zf = "_sep_54446_91", e_ = "_facts_54446_96", a_ = "_fact_54446_96", t_ = "_factLabel_54446_109", n_ = "_factValue_54446_113", re = {
  card: Gf,
  head: Uf,
  mark: Vf,
  name: Yf,
  chips: Jf,
  description: Xf,
  run: Qf,
  sep: Zf,
  facts: e_,
  fact: a_,
  factLabel: t_,
  factValue: n_
}, r_ = { live: "done", draft: "running", paused: "meta" };
function l_(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function o_({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: r_[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function i_({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: re.description, children: e });
}
function s_({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(Re, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function c_({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: re.fact, children: [
    /* @__PURE__ */ t("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function d_(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function u_({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: l_(s),
      style: c,
      "data-selected": d,
      "data-paused": d_(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: re.head, children: [
          /* @__PURE__ */ t("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${re.name} ward-rowlink ward-target`, href: F(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(i_, { description: e.description }),
        /* @__PURE__ */ t(s_, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(o_, { versions: e.versions }),
        /* @__PURE__ */ t(c_, { facts: i })
      ]
    }
  );
}
const m_ = "_list_4dcyc_2", h_ = "_row_4dcyc_11", w_ = "_head_4dcyc_23", f_ = "_id_4dcyc_30", __ = "_lock_4dcyc_35", v_ = "_reason_4dcyc_41", b_ = "_remove_4dcyc_46", p_ = "_clauses_4dcyc_50", g_ = "_clause_4dcyc_50", y_ = "_label_4dcyc_64", N_ = "_cell_4dcyc_71", k_ = "_value_4dcyc_76", ie = {
  list: m_,
  row: h_,
  head: w_,
  id: f_,
  lock: __,
  reason: v_,
  remove: b_,
  clauses: p_,
  clause: g_,
  label: y_,
  cell: N_,
  value: k_
}, Tn = Be(!1);
function QS({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(Tn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function $_({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function C_({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ie.reason, children: e })
  ] });
}
function S_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ t("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(C_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ie.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Bt(e, a) {
  return e.locked ? void 0 : a;
}
function ZS({ rule: e, onChange: a, onRemove: n }) {
  if (!Me(Tn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Bt(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(S_, { rule: e, onRemove: Bt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ t("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ie.cell, children: /* @__PURE__ */ t($_, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const R_ = "_ladder_n8eeo_2", T_ = "_cell_n8eeo_7", x_ = "_empty_n8eeo_26", L_ = "_name_n8eeo_34", A_ = "_holder_n8eeo_40", E_ = "_request_n8eeo_46", I_ = "_swatches_n8eeo_51", M_ = "_swatch_n8eeo_51", B_ = "_tilesFrame_n8eeo_78", P_ = "_tiles_n8eeo_78", j_ = "_tile_n8eeo_78", D_ = "_bar_n8eeo_117", O_ = "_hex_n8eeo_128", H_ = "_note_n8eeo_138", E = {
  ladder: R_,
  cell: T_,
  empty: x_,
  name: L_,
  holder: A_,
  request: E_,
  swatches: I_,
  swatch: M_,
  tilesFrame: B_,
  tiles: P_,
  tile: j_,
  bar: D_,
  hex: O_,
  note: H_
}, e2 = "not validated yet, pending a CVD matrix and dark stepping";
function F_(e) {
  return e.reserved ? "reserved" : xa(e.step) ? "validated" : "partial";
}
function xn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function q_(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function z_({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(Pe, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function W_(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function K_(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Pt = (e) => String(e).padStart(2, "0");
function G_(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? xn(e, void 0);
}
function U_({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${Pt(e)}` : Ir(e) }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: r ? n : `Step ${Pt(e)} · ${n}` })
  ] });
}
function V_({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = F_(e), c = xn(s, n), d = c !== "free", u = d || i, m = a === e.step, f = e.name ?? `Step ${e.step}`, v = () => {
    u || r(e.step);
  }, y = `${f} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...K_(d, m, u), "data-validation": s, style: q_(e, s), onClick: v, onKeyDown: (B) => W_(B, v) }, label: y, name: f, holder: c, validation: s, note: G_(s, n, m), step: e.step };
}
const Y_ = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(U_, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(z_, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function J_(e) {
  return Y_[e.presentation](V_(e));
}
function X_(e) {
  for (const a of e)
    if (!a.reserved && !Ta(a.step)) throw new Error("colour ladder renders token steps only");
}
function Q_() {
  return /* @__PURE__ */ o("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Z_(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const ev = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function av() {
  return /* @__PURE__ */ o("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const tv = { list: Q_, swatches: () => null, tiles: av };
function nv(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Ln(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  X_(e.steps);
  const r = Z_(e), l = tv[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(J_, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...nv(e.disabled === !0), className: `${ev[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: E.tiles, children: i }) : i });
}
const rv = "_rail_s06lm_2", lv = "_section_s06lm_12", ov = "_sectionFlush_s06lm_22", iv = "_head_s06lm_26", sv = "_headLabel_s06lm_34", cv = "_sample_s06lm_42", dv = "_sampleLabel_s06lm_47", uv = "_sampleTitle_s06lm_54", mv = "_sampleMeta_s06lm_59", hv = "_trace_s06lm_65", wv = "_traceHead_s06lm_70", fv = "_steps_s06lm_78", _v = "_step_s06lm_78", vv = "_stepTitle_s06lm_97", bv = "_hollow_s06lm_107", pv = "_stepBody_s06lm_115", gv = "_stepDetail_s06lm_127", yv = "_publish_s06lm_132", Nv = "_reason_s06lm_138", kv = "_note_s06lm_143", $v = "_reveal_s06lm_148", k = {
  rail: rv,
  section: lv,
  sectionFlush: ov,
  head: iv,
  headLabel: sv,
  sample: cv,
  sampleLabel: dv,
  sampleTitle: uv,
  sampleMeta: mv,
  trace: hv,
  traceHead: wv,
  steps: fv,
  step: _v,
  stepTitle: vv,
  hollow: bv,
  stepBody: pv,
  stepDetail: gv,
  publish: yv,
  reason: Nv,
  note: kv,
  reveal: $v
}, jt = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Cv = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Sv = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Rv = { notSimulated: "not simulated", running: "running" };
function Tv(e) {
  return e.presentation === "foundry";
}
function xv(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Lv(e, a) {
  var r;
  const n = Cv[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Av(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Ev(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Iv(e) {
  if (Av(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Mv(e) {
  const [a, n] = p(!1);
  S(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Bv(e) {
  const a = Rv[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(Pe, { size: 6, kind: Sv[e.kind], label: e.kind });
}
function Pv(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function jv(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(Re, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Dv(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Mv, { kind: a.kind, children: [
    /* @__PURE__ */ t(Bv, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(Pv, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(jv, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Ov(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function An(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: Ov(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(Dv, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function Hv(e) {
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
function Fv(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function qv(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ne(e.run.cost), label: "Cost" }, { value: e.run.turns ? Yt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Ma, { divided: !0, cells: a }) });
}
function zv(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ne(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Yt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Wv(e) {
  const a = zv(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Ma, { divided: !0, cells: a }) });
}
function En(e) {
  const a = N();
  return e.reason !== null ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: `${k.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Kv(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(En, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function Gv(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(En, { reason: e.reason, onPublish: e.onPublish }) });
}
function In(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: jt[e.run.status].role, label: jt[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(Re, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Uv(e, a) {
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
function Vv(e) {
  var n;
  Ev(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(In, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(Hv, { sample: e.run.sample }),
    /* @__PURE__ */ t(An, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(qv, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(ja, { items: e.checklist }) }),
    /* @__PURE__ */ t(Kv, { reason: xv(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Yv(e) {
  var r;
  const a = Uv(e.run, e.feed);
  Iv(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(In, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(Fv, { sample: e.run.sample }),
    /* @__PURE__ */ t(An, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(Wv, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(ja, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(Gv, { reason: Lv(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function a2(e) {
  return Tv(e) ? /* @__PURE__ */ t(Yv, { ...e }) : /* @__PURE__ */ t(Vv, { ...e });
}
const Jv = "_list_142ip_3", Xv = "_row_142ip_9", Qv = "_condition_142ip_18", Zv = "_action_142ip_24", _a = {
  list: Jv,
  row: Xv,
  condition: Qv,
  action: Zv
}, Mn = Be(!1);
function t2({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(Mn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: _a.list, "aria-label": a, children: e }) });
}
function n2({ rule: e }) {
  if (!Me(Mn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: _a.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: _a.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: _a.action, children: e.then })
  ] });
}
const eb = "_move_tmppt_3", ab = {
  move: eb
};
function Ya(e, a, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(n, 0, l), r;
}
function Bn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Pn(e, a, n) {
  return `${e} moved to position ${a + 1} of ${n}.`;
}
function Dt(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function tb(e) {
  return e === "up" ? "down" : "up";
}
function nb(e, a) {
  const n = Dt(e, a.id, a.direction) ?? Dt(e, a.id, tb(a.direction));
  n == null || n.focus();
}
function jn() {
  const e = w(null), [a, n] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && a !== null && nb(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function Dn({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Na({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${ab.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const rb = "_body_1jd1i_2", lb = "_title_1jd1i_8", ob = "_section_1jd1i_13", ib = "_legend_1jd1i_18", sb = "_stages_1jd1i_26", cb = "_stage_1jd1i_26", db = "_stageIndex_1jd1i_44", ub = "_stageName_1jd1i_50", mb = "_footer_1jd1i_59", hb = "_note_1jd1i_66", wb = "_reason_1jd1i_71", fb = "_actions_1jd1i_76", _b = "_webHead_1jd1i_83", vb = "_kicker_1jd1i_92", bb = "_webTitle_1jd1i_99", pb = "_webBody_1jd1i_105", gb = "_webSection_1jd1i_109", yb = "_sectionHead_1jd1i_121", Nb = "_sectionNote_1jd1i_129", kb = "_formLabel_1jd1i_134", $b = "_identityRow_1jd1i_139", Cb = "_nameCell_1jd1i_145", Sb = "_keyCell_1jd1i_150", Rb = "_colourCell_1jd1i_154", Tb = "_colourStatus_1jd1i_161", xb = "_webStages_1jd1i_166", Lb = "_webStageList_1jd1i_172", Ab = "_webStage_1jd1i_166", Eb = "_webIndex_1jd1i_191", Ib = "_webStageName_1jd1i_196", Mb = "_webMoves_1jd1i_201", Bb = "_addStage_1jd1i_215", Pb = "_addStageButton_1jd1i_223", jb = "_addStageNote_1jd1i_231", Db = "_webFooter_1jd1i_236", Ob = "_webFooterNotes_1jd1i_244", Hb = "_webNote_1jd1i_251", _ = {
  body: rb,
  title: lb,
  section: ob,
  legend: ib,
  stages: sb,
  stage: cb,
  stageIndex: db,
  stageName: ub,
  footer: mb,
  note: hb,
  reason: wb,
  actions: fb,
  webHead: _b,
  kicker: vb,
  webTitle: bb,
  webBody: pb,
  webSection: gb,
  sectionHead: yb,
  sectionNote: Nb,
  formLabel: kb,
  identityRow: $b,
  nameCell: Cb,
  keyCell: Sb,
  colourCell: Rb,
  colourStatus: Tb,
  webStages: xb,
  webStageList: Lb,
  webStage: Ab,
  webIndex: Eb,
  webStageName: Ib,
  webMoves: Mb,
  addStage: Bb,
  addStageButton: Pb,
  addStageNote: jb,
  webFooter: Db,
  webFooterNotes: Ob,
  webNote: Hb
}, Fb = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], On = "not in catalogue";
function qb(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${On}` }, ...n];
}
function zb({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${On}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: qb(n, e.name), invalid: i, onChange: r });
}
function Hn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Wb(e) {
  const a = w([]), n = w(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Kb({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Hn(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${_.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: _.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: _.webStageName, children: /* @__PURE__ */ t(zb, { stage: a, index: n, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: Fb, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: _.webMoves, children: [
      n > 0 && /* @__PURE__ */ t(Na, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t(Na, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Gb({ stages: e, onChange: a, catalogue: n }) {
  const r = Wb(e.length), l = jn(), i = (c, d) => {
    const u = Bn(c, d);
    r.current = Ya(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Pn(Hn(e[c], c), u, e.length)), a(Ya(e, c, u));
  }, s = (c, d) => a(e.map((u, m) => m === c ? d : u));
  return /* @__PURE__ */ o("div", { className: _.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: _.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(Kb, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(Dn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: _.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: _.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: _.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Ub = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Vb = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Yb = "A new stream starts as a draft. Nothing runs on it until you publish it.", Jb = "Create is disabled: name the stream and give it a key first.", Xb = "reorder with the ↑ ↓ buttons · min 2";
function ot(e, a) {
  return !e.reserved && xa(e.step) && a[e.step] === void 0;
}
function Qb(e, a) {
  const n = e.find((r) => ot(r, a));
  return n ? n.step : 1;
}
function Zb({ stages: e, onMove: a }) {
  const n = jn(), r = (l, i) => {
    const s = Bn(l, i);
    n.moved({ id: e[l].id, direction: i }, Pn(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: _.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: _.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: _.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: _.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ t(Na, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t(Na, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(Dn, { text: n.announcement })
  ] });
}
function ep({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: _.footer, children: [
    /* @__PURE__ */ t("p", { className: _.note, children: Yb }),
    e && /* @__PURE__ */ t("p", { className: _.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: _.actions, children: [
      /* @__PURE__ */ t(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function ap(e, a) {
  return e !== "" && a !== "" ? null : Jb;
}
function tp(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = Vb, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [m, f] = p(""), [v, y] = p(""), [L, B] = p(a[0].value), [le, Te] = p(() => Qb(n, r)), [ae, Ke] = p(e.stages ?? Ub), [Ge, R] = p(l[0].value), G = { name: m, key: v, streamStep: le, owner: L, stages: ae, policy: Ge }, ge = ap(m, v);
  return /* @__PURE__ */ t(ta, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: _.body, children: [
    /* @__PURE__ */ t("h2", { className: _.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ t("legend", { className: _.legend, children: "Identity" }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Stream name", value: m, onChange: f }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Key", value: v, onChange: y, mono: !0 }),
      /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: L, onChange: B, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ t("legend", { className: _.legend, children: "Colour" }),
      /* @__PURE__ */ t(Ln, { label: "Stream colour", steps: n, value: le, onChange: Te, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ t("legend", { className: _.legend, children: "Stages" }),
      /* @__PURE__ */ t(Zb, { stages: ae, onMove: (je, mr) => Ke(Ya(ae, je, mr)) })
    ] }),
    /* @__PURE__ */ t(yn, { legend: "Loop policy", options: l, value: Ge, onChange: R }),
    /* @__PURE__ */ t(ep, { reason: ge, onCreate: () => i(G), onDraft: () => s(G) })
  ] }) });
}
const Fn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], np = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function rp(e, a, n, r, l, i) {
  var c;
  const s = ((c = Fn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function lp(e, a) {
  return op(e) && ip(e, a) && sp(e);
}
function op(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function ip(e, a) {
  return e.colourStep === null || ot({ step: e.colourStep }, a);
}
function sp(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function cp(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : ot({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function dp({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: _.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: _.webNote, children: "Add a stage an agent can run on." });
}
function up({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: _.webFooter, children: [
    /* @__PURE__ */ o("div", { className: _.webFooterNotes, children: [
      /* @__PURE__ */ t(dp, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: _.reason, children: np })
    ] }),
    l && /* @__PURE__ */ t(b, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function mp({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: _.webHead, children: [
    /* @__PURE__ */ t("span", { className: _.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: _.webTitle, children: "New stream" })
  ] });
}
function hp({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: _.webSection, children: [
    /* @__PURE__ */ t("h3", { className: _.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: _.identityRow, children: [
      /* @__PURE__ */ t("div", { className: _.nameCell, children: /* @__PURE__ */ t(M, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ t("div", { className: _.keyCell, children: /* @__PURE__ */ t(M, { variant: "form", label: "Key", value: n, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function wp(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [m, f] = p(null), [v, y] = p("relay"), [L, B] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = rp(l, s, d, m, v, L), Te = lp(le, r), ae = L.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ke = /* @__PURE__ */ o("div", { className: _.colourCell, children: [
    /* @__PURE__ */ t("span", { className: _.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(Ln, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: f, takenBy: r })
  ] }), Ge = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: _.colourStatus, "data-colour-status": "", children: cp(m, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ o(ta, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(mp, { titleId: n }),
    /* @__PURE__ */ o("div", { className: _.webBody, children: [
      /* @__PURE__ */ t(hp, { name: l, setName: i, streamKey: s, setKey: c, colour: Ke, owner: Ge }),
      /* @__PURE__ */ o("section", { className: _.webSection, children: [
        /* @__PURE__ */ o("div", { className: _.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: _.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: _.sectionNote, children: Xb })
        ] }),
        /* @__PURE__ */ t(Gb, { stages: L, onChange: B })
      ] }),
      /* @__PURE__ */ t("section", { className: _.webSection, children: /* @__PURE__ */ t(yn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: v, options: Fn, onChange: y }) }),
      /* @__PURE__ */ t(up, { ready: Te, draft: le, agentStage: ae, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function r2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(wp, { ...e }) : /* @__PURE__ */ t(tp, { ...e });
}
const fp = "_row_bs8hc_2", _p = "_cell_bs8hc_6", vp = "_condition_bs8hc_11", bp = "_action_bs8hc_18", pp = "_contract_bs8hc_24", gp = "_contractCondition_bs8hc_33", yp = "_contractAction_bs8hc_39", Q = {
  row: fp,
  cell: _p,
  condition: vp,
  action: bp,
  contract: pp,
  contractCondition: gp,
  contractAction: yp
}, qn = ["advance", "block", "escalate", "requestReview"], Ot = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function ka(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function it(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: Q.action, children: Ot[e.then] }) : /* @__PURE__ */ t(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: qn.map((l) => ({ value: l, label: Ot[l] }))
    }
  );
}
function Np({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t("span", { className: Q.condition, title: ka(e, r), children: ka(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: it(e, a, n) })
  ] });
}
function kp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Q.condition, children: ka(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: it(e, a, n) })
  ] });
}
function $p({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Q.contractCondition, children: ka(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Q.contractAction, children: it(e, a, n, !0) })
  ] });
}
const Cp = { two: kp, four: Np, contract: $p };
function l2(e) {
  var n;
  if (!qn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Cp[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const Sp = "_column_11id3_2", Rp = "_head_11id3_17", Tp = "_index_11id3_23", xp = "_name_11id3_29", Lp = "_meta_11id3_38", Ap = "_mono_11id3_43", Ep = "_gate_11id3_50", Ip = "_reviewersLabel_11id3_57", Mp = "_reviewers_11id3_57", Bp = "_reviewer_11id3_57", Pp = "_agents_11id3_74", jp = "_workflowColumn_11id3_79", Dp = "_workflowHead_11id3_96", Op = "_stageRow_11id3_102", Hp = "_stageLabel_11id3_109", Fp = "_workflowTitle_11id3_116", qp = "_workflowMeta_11id3_122", zp = "_workflowGate_11id3_127", Wp = "_gateNote_11id3_135", Kp = "_cardNote_11id3_140", Gp = "_reviewerList_11id3_145", Up = "_reviewerRow_11id3_151", Vp = "_reviewerMark_11id3_157", Yp = "_reviewerName_11id3_167", Jp = "_terminalCard_11id3_173", Xp = "_terminalCount_11id3_182", Qp = "_workflowAgents_11id3_188", Zp = "_mount_11id3_194", C = {
  column: Sp,
  head: Rp,
  index: Tp,
  name: xp,
  meta: Lp,
  mono: Ap,
  gate: Ep,
  reviewersLabel: Ip,
  reviewers: Mp,
  reviewer: Bp,
  agents: Pp,
  workflowColumn: jp,
  workflowHead: Dp,
  stageRow: Op,
  stageLabel: Hp,
  workflowTitle: Fp,
  workflowMeta: qp,
  workflowGate: zp,
  gateNote: Wp,
  cardNote: Kp,
  reviewerList: Gp,
  reviewerRow: Up,
  reviewerMark: Vp,
  reviewerName: Yp,
  terminalCard: Jp,
  terminalCount: Xp,
  workflowAgents: Qp,
  mount: Zp
}, eg = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function st(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function zn(e) {
  return `${Math.round(e * 100)}%`;
}
function ag({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: C.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: C.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: C.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Ma, { cells: [
      { value: zn(e.gateShare), label: "Gate share" },
      { value: ee(e.count), label: "In stage" }
    ] })
  ] });
}
function tg({ stage: e }) {
  return /* @__PURE__ */ t(Ma, { cells: [
    { value: ee(e.count), label: "In stage" },
    { value: st(e.closedThisWeek, ee), label: "Closed this week" }
  ] });
}
function ng({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: C.head, children: [
    /* @__PURE__ */ t("span", { className: C.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: C.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: eg[e.kind] })
  ] });
}
function rg({ stage: e }) {
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
function lg({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(ag, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(tg, { stage: e }) : null;
}
function og({ onMount: e }) {
  return e ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function ig({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: C.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(ng, { stage: e, titleId: l }),
    /* @__PURE__ */ t(rg, { stage: e }),
    /* @__PURE__ */ t(lg, { stage: e }),
    /* @__PURE__ */ t("div", { className: C.agents, children: a.map((s) => /* @__PURE__ */ t(u_, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(og, { onMount: n })
  ] });
}
const sg = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function cg({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: C.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: C.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: C.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: C.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function dg({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: C.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(cg, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: C.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: zn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function ug(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function mg({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: C.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: C.terminalCount, children: st(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: C.cardNote, children: ug(e.rolledBackThisWeek) })
  ] });
}
function hg(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function wg(e) {
  if (e.kind === "terminal") return `${st(e.closedThisWeek)} this week`;
  const a = hg(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function fg({ stage: e, titleId: a }) {
  const n = sg[e.kind];
  return /* @__PURE__ */ o("header", { className: C.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: C.stageRow, children: [
      /* @__PURE__ */ o("span", { className: C.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: C.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: C.workflowMeta, children: wg(e) })
  ] });
}
function _g(e) {
  return e === "entry" || e === "agent";
}
function vg({ stage: e, onMount: a }) {
  return a === void 0 || !_g(e.kind) ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", className: C.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function bg({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: C.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(fg, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(dg, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(mg, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: C.workflowAgents, children: a }),
    /* @__PURE__ */ t(vg, { stage: e, onMount: n })
  ] });
}
function pg(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function o2(e) {
  return pg(e) ? /* @__PURE__ */ t(bg, { ...e }) : /* @__PURE__ */ t(ig, { ...e });
}
const gg = "_row_13dv2_6", yg = "_name_13dv2_12", Ng = "_compactRow_13dv2_13", kg = "_compactName_13dv2_13", $g = "_cell_13dv2_30", Cg = "_chain_13dv2_45", Sg = "_owner_13dv2_51", Rg = "_mono_13dv2_57", Tg = "_compactCell_13dv2_79", xg = "_stack_13dv2_96", Lg = "_stat_13dv2_103", Ag = "_identityLine_13dv2_110", Eg = "_identity_13dv2_110", Ig = "_ownerLine_13dv2_137", Mg = "_link_13dv2_155", Bg = "_gateMark_13dv2_161", Pg = "_emptyChain_13dv2_166", jg = "_arrow_13dv2_172", Dg = "_muted_13dv2_177", Og = "_define_13dv2_182", Hg = "_statValue_13dv2_189", Fg = "_policyId_13dv2_195", qg = "_sub_13dv2_200", g = {
  row: gg,
  name: yg,
  compactRow: Ng,
  compactName: kg,
  cell: $g,
  chain: Cg,
  owner: Sg,
  mono: Rg,
  compactCell: Tg,
  stack: xg,
  stat: Lg,
  identityLine: Ag,
  identity: Eg,
  ownerLine: Ig,
  link: Mg,
  gateMark: Bg,
  emptyChain: Pg,
  arrow: jg,
  muted: Dg,
  define: Og,
  statValue: Hg,
  policyId: Fg,
  sub: qg
};
function Wn(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function zg(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Wg(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Kn(e) {
  return `${ee(e)} ${e === 1 ? "member" : "members"}`;
}
function Kg(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Kn(e.members)}`;
}
function Gg(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: F(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: Kg(e) })
  ] }) });
}
function Gn({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Ug(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = sa(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function Vg({ stages: e, streamStep: a }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ t(Gn, { name: l.name, gate: l.gate === !0, look: Ug(i, n, a), size: "tag" }),
    i === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function Yg(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : Vg(e) });
}
function Un(e) {
  return e === void 0 ? void 0 : !0;
}
function Ht(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Un(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: a })
  ] }) });
}
function Jg(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function Xg(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Qg({ stream: e, href: a, presentation: n }) {
  const r = Wg(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Wn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    Gg(e, a),
    Yg(e),
    Ht(Xg(e.agents), e.agents === void 0 ? void 0 : zg(e.agents), "—"),
    Jg(e.policy),
    Ht(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function Zg(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function i2(e) {
  if (Zg(e)) return Qg(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: Wn, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: F(n), children: a.name }),
      /* @__PURE__ */ t(h, { ...Ia(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(h, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ t("span", { className: g.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: g.link, children: /* @__PURE__ */ t(Gn, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ t("span", { className: g.mono, children: Kn(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: a.inFlightHint, "data-raised": Un(a.inFlightHint), children: ee(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const ey = "_row_2u4ll_2", ay = "_name_2u4ll_16", ty = "_scope_2u4ll_24", $a = {
  row: ey,
  name: ay,
  scope: ty
};
function ct(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function ny(e) {
  return e === void 0 ? `${$a.row} ward-toolrow` : `${$a.row} ward-toolrow ${e}`;
}
function ry(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function ly({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function oy({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: ct(e) });
}
function iy({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${$a.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function sy(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function s2({ tool: e, onChange: a, presentation: n }) {
  const r = N(), l = N(), i = ry(e, n), s = sy(n);
  return /* @__PURE__ */ o(s, { className: ny(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(ly, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${$a.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(iy, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(oy, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const cy = "_strip_4ppv9_2", dy = "_well_4ppv9_11", uy = "_head_4ppv9_18", my = "_name_4ppv9_24", hy = "_chart_4ppv9_32", wy = "_segment_4ppv9_38", fy = "_detailedChart_4ppv9_44", _y = "_rail_4ppv9_57", vy = "_section_4ppv9_63", by = "_label_4ppv9_74", py = "_note_4ppv9_91", K = {
  strip: cy,
  well: dy,
  head: uy,
  name: my,
  chart: hy,
  segment: wy,
  detailedChart: fy,
  rail: _y,
  section: vy,
  label: by,
  note: py
}, gy = "No item in flight to preview.", yy = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Ny = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Ja = [1, 2, 3, 4, 5, 6], Ca = 100;
function ky(e, a) {
  return a.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function $y({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: K.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ja.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: K.segment,
      x: l * Ca,
      y: "0",
      width: Ca,
      height: "8",
      fill: ky(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Cy(e) {
  const a = e.slice(0, Ja.length);
  for (; a.length < Ja.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Sy({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${K.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ t("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, n) => /* @__PURE__ */ t(
      "rect",
      {
        x: String(n * Ca),
        y: "0",
        width: String(Ca),
        height: "40",
        style: { fill: pe(a.streamStep, "chip") }
      },
      a.key + String(n)
    )) }),
    /* @__PURE__ */ t("figcaption", { className: "ward-seglabels", children: e.map((a, n) => /* @__PURE__ */ t("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(n))) })
  ] });
}
function Vn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ma({ label: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("section", { className: K.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: K.label, children: e }),
    a
  ] });
}
function Ry({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: K.note, children: a ?? gy }) : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(Pa, { item: { ...e, streamStep: sa(n.streamStep) }, onOpen: Vn(r), feed: null }) });
}
function Ty({ draft: e }) {
  const a = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: K.head, style: a, children: [
    /* @__PURE__ */ t(Pe, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...Ia(e.key, e.streamStep) })
  ] });
}
function xy(e) {
  const a = Cy(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: K.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(ma, { label: "Board card", children: /* @__PURE__ */ t(Ry, { ...e, draft: n }) }),
    /* @__PURE__ */ t(ma, { label: "Streams index row", children: /* @__PURE__ */ t(Ty, { draft: n }) }),
    /* @__PURE__ */ o(ma, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(Sy, { identities: a }),
      /* @__PURE__ */ t("p", { className: K.note, children: yy })
    ] }),
    /* @__PURE__ */ t(ma, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: K.note, children: Ny }) })
  ] });
}
function Ly({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: K.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: K.head, children: [
      /* @__PURE__ */ t(Pe, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...Ia(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(Pa, { item: { ...a, streamStep: e.streamStep }, onOpen: Vn(r) }) }),
    /* @__PURE__ */ t($y, { draft: e, streams: n })
  ] });
}
function c2(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(xy, { ...e }) : /* @__PURE__ */ t(Ly, { ...e });
}
const Ay = "_row_ixlg5_6", Ey = "_headCell_ixlg5_10", Iy = "_cell_ixlg5_11", My = "_name_ixlg5_23", By = "_consequence_ixlg5_29", Py = "_governed_ixlg5_36", jy = "_control_ixlg5_42", Dy = "_byRole_ixlg5_48", Oy = "_webControl_ixlg5_59", Hy = "_webConsequence_ixlg5_65", Fy = "_webGoverned_ixlg5_71", H = {
  row: Ay,
  headCell: Ey,
  cell: Iy,
  name: My,
  consequence: By,
  governed: Py,
  control: jy,
  byRole: Dy,
  webControl: Oy,
  webConsequence: Hy,
  webGoverned: Fy
};
function qy({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: H.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: H.control, children: [
    /* @__PURE__ */ t(
      We,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => n(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ t(h, { role: "running", label: "Pilot" })
  ] });
}
function zy({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: H.headCell, children: [
      /* @__PURE__ */ t("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: H.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: H.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t(qy, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function Wy(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Ky({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${H.webControl} ${H.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    We,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: n === void 0,
      onChange: (l) => n == null ? void 0 : n(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${H.webControl} ward-envrow`, children: [
    /* @__PURE__ */ t(h, { role: "running", label: "Pilot" }),
    r
  ] });
}
function Gy({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ o("td", { className: H.cell, children: [
      /* @__PURE__ */ t("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${H.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t(Ky, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t("span", { className: `${H.webGoverned} ward-cellmeta`, children: Wy(e) }) })
  ] });
}
function d2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Gy, { ...e }) : /* @__PURE__ */ t(zy, { ...e });
}
const Uy = "_row_vv64h_2", Vy = "_cell_vv64h_6", Yy = "_name_vv64h_25", Jy = "_note_vv64h_30", Xy = "_webName_vv64h_41", Qy = "_webMeta_vv64h_47", V = {
  row: Uy,
  cell: Vy,
  name: Yy,
  note: Jy,
  webName: Xy,
  webMeta: Qy
}, Yn = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function Zy(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function eN({ component: e, onRestart: a }) {
  const n = N(), r = Yn[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: V.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: V.cell, "data-mono": "true", children: [
      ee(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { id: n, className: V.note, children: e.note }) }),
    /* @__PURE__ */ t("td", { className: V.cell, "data-align": "end", children: l ? /* @__PURE__ */ t(b, { size: "sm", disabled: !0, describedBy: n, children: "Restart" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function aN({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: Zy(e.state) });
}
function tN({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { ...Yn[e.state] }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(aN, { component: e, onRestart: a }) })
  ] });
}
function u2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(tN, { ...e }) : /* @__PURE__ */ t(eN, { ...e });
}
const nN = "_row_jcm5k_7", rN = "_cell_jcm5k_11", lN = "_next_jcm5k_28", oN = "_headCell_jcm5k_38", iN = "_webId_jcm5k_77", sN = "_webPurpose_jcm5k_83", cN = "_webMeta_jcm5k_91", dN = "_webUrgent_jcm5k_97", q = {
  row: nN,
  cell: rN,
  next: lN,
  headCell: oN,
  webId: iN,
  webPurpose: sN,
  webMeta: cN,
  webUrgent: dN
}, uN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, mN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Jn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], hN = Object.fromEntries(Jn.map((e) => [e.key, e]));
function Ve({ column: e, children: a }) {
  const n = hN[e];
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
function m2() {
  return /* @__PURE__ */ t("tr", { children: Jn.map((e) => /* @__PURE__ */ t(
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
function wN({ cred: e }) {
  const a = uN[e.state];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ t(Ve, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Ve, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Ve, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Ve, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: ct(e.cls) }) }),
    /* @__PURE__ */ t(Ve, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Ve, { column: "next", children: /* @__PURE__ */ t("span", { className: q.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function fN({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${q.webMeta} ${q.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function _N({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(fN, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(h, { ...mN[e.state] }) })
  ] });
}
function h2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(_N, { ...e }) : /* @__PURE__ */ t(wN, { ...e });
}
const vN = "_card_17zba_2", bN = "_head_17zba_11", pN = "_env_17zba_18", gN = "_version_17zba_25", yN = "_meta_17zba_32", NN = "_webCard_17zba_37", kN = "_webRow_17zba_47", $N = "_webTitle_17zba_55", CN = "_webLine_17zba_65", SN = "_webVersion_17zba_72", RN = "_webMeta_17zba_77", U = {
  card: vN,
  head: bN,
  env: pN,
  version: gN,
  meta: yN,
  webCard: NN,
  webRow: kN,
  webTitle: $N,
  webLine: CN,
  webVersion: SN,
  webMeta: RN
}, Ft = { dev: "Dev", uat: "UAT", prod: "Prod" }, Xn = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function TN({ env: e }) {
  const a = Xn[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: U.card, "aria-label": Ft[e.env], children: [
    /* @__PURE__ */ o("div", { className: U.head, children: [
      /* @__PURE__ */ t("span", { className: U.env, children: Ft[e.env] }),
      /* @__PURE__ */ t(h, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ t("p", { className: U.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: U.meta, children: [
      "deployed ",
      de(e.deployedAt)
    ] }),
    n && /* @__PURE__ */ t("p", { className: U.meta, children: n })
  ] });
}
function xN(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function LN(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...Xn[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: xN(e) })
  ] });
}
function w2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(LN, { ...e }) : /* @__PURE__ */ t(TN, { ...e });
}
const AN = "_panel_1hmja_2", EN = "_line_1hmja_8", IN = "_actions_1hmja_14", ha = {
  panel: AN,
  line: EN,
  actions: IN
};
function f2(e) {
  return /* @__PURE__ */ o("div", { className: ha.panel, children: [
    /* @__PURE__ */ t("p", { className: ha.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: ha.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: ha.line, children: e.note ?? "" })
  ] });
}
const MN = "_upload_13fcl_2", BN = "_preview_13fcl_7", PN = "_mark_13fcl_17", jN = "_empty_13fcl_22", DN = "_actions_13fcl_28", ON = "_input_13fcl_33", HN = "_reasons_13fcl_41", FN = "_reason_13fcl_41", qN = "_accepted_13fcl_57", te = {
  upload: MN,
  preview: BN,
  mark: PN,
  empty: jN,
  actions: DN,
  input: ON,
  reasons: HN,
  reason: FN,
  accepted: qN
}, Qn = 1.5, Zn = 22, Sa = "script elements or event handlers", Ae = "links or external references", Se = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Qn}px at ${Zn}px`], zN = [Se[1], Se[2], Sa, Ae], WN = /* @__PURE__ */ new Map([
  ["image", Se[1]],
  ["text", Se[2]],
  ["tspan", Se[2]],
  ["textPath", Se[2]],
  ["script", Sa],
  ["foreignObject", Sa],
  ["a", Ae],
  ["use", Ae],
  ["style", Ae],
  ["feImage", Ae],
  ["set", Ae]
]), KN = "http://www.w3.org/2000/svg", GN = "http://www.w3.org/2000/xmlns/", UN = /* @__PURE__ */ new Set([
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
]), VN = /* @__PURE__ */ new Set([
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
]), dt = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, YN = /url\s*\(|['"\\]/i;
function JN() {
  return { ok: !1, reasons: [Se[1]] };
}
function er(e) {
  return e.namespaceURI === KN;
}
function XN(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && er(a) ? a : null;
  } catch {
    return null;
  }
}
function QN(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [Se[0]] : [];
}
function ZN(e) {
  return WN.get(e.localName) ?? (e.localName.startsWith("animate") ? Ae : void 0);
}
function e1(e) {
  return YN.test(e.replace(dt, ""));
}
function a1(e) {
  return /^on/i.test(e.localName) ? Sa : e.localName === "href" || e1(e.value) ? Ae : void 0;
}
function t1(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(ZN(n));
    for (const r of Array.from(n.attributes)) a.add(a1(r));
  }
  return zN.filter((n) => a.has(n));
}
function n1(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? Zn / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Qn;
  }) ? [Se[3]] : [];
}
function r1(e) {
  if (e.namespaceURI === GN) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (VN.has(a) || a.startsWith("stroke"));
}
function l1(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && er(a) && UN.has(a.localName);
}
function o1(e, a) {
  l1(a) ? a.nodeType === Node.ELEMENT_NODE && ar(a) : e.removeChild(a);
}
function ar(e) {
  for (const a of Array.from(e.attributes)) r1(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) o1(e, a);
  return e;
}
function i1(e) {
  return Array.from(e.matchAll(dt), (a) => a[2]).filter((a) => a !== "");
}
function s1(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function c1(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of i1(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function d1(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(dt, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function u1(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = c1(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), d1(l, r);
  }
  return e;
}
function _2(e) {
  const a = XN(e);
  if (a === null) return JN();
  const n = [...QN(a), ...t1(a), ...n1(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(u1(ar(a), s1(e))) };
}
const m1 = "Mark accepted.", h1 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, w1 = new Set(Xt.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function f1(e) {
  return e !== void 0 && (h1.test(e) || w1.has(e)) ? e : void 0;
}
function _1({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: te.preview, style: { "--mark": f1(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: te.empty }) });
}
function v1(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function b1(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function p1({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("p", { className: te.accepted, children: m1 }) }) : /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: te.reason, children: a }, a)) }) });
}
function g1({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(p1, { result: e }) : /* @__PURE__ */ t("p", { className: `${te.result} ${v1(e, n)}`, role: "status", children: b1(e, n) });
}
function qt(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function v2({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = w(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const m = a(u);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ t(_1, { current: e }),
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
      /* @__PURE__ */ t(b, { ...qt(l), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(b, { ...qt(l), variant: "ghost", onClick: n, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(g1, { result: s, presentation: r })
  ] });
}
const y1 = "_row_o3t6y_7", N1 = "_cell_o3t6y_11", k1 = "_head_o3t6y_28", $1 = "_name_o3t6y_34", C1 = "_pinned_o3t6y_42", S1 = "_headCell_o3t6y_49", R1 = "_webName_o3t6y_88", T1 = "_webMeta_o3t6y_95", x1 = "_webWarn_o3t6y_103", P = {
  row: y1,
  cell: N1,
  head: k1,
  name: $1,
  pinned: C1,
  headCell: S1,
  webName: R1,
  webMeta: T1,
  webWarn: x1
}, ut = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, tr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], L1 = Object.fromEntries(tr.map((e) => [e.key, e]));
function A1(e, a) {
  return `mcp.${e}.${a}`;
}
function E1(e) {
  return Object.keys(ut).includes(e);
}
function I1(e) {
  return ut[e !== void 0 && E1(e) ? e : "unknown"];
}
function na({ column: e, children: a }) {
  const n = L1[e];
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
function b2() {
  return /* @__PURE__ */ t("tr", { children: tr.map((e) => /* @__PURE__ */ t(
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
function M1({ server: e }) {
  const a = ut[e.connection];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o(na, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: P.head, children: [
        /* @__PURE__ */ t("span", { className: P.name, children: e.name }),
        /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: ct(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: P.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(na, { column: "connection", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(na, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(na, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(na, { column: "tools", children: e.tools.map((n) => A1(e.name, n)).join(" · ") })
  ] });
}
function B1(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function P1(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function j1({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${P.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: e });
}
function D1({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function O1({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function H1({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t("span", { className: `${P.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: B1(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...P1(e) }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(j1, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...I1(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t(D1, { server: e, onRestart: a }),
      /* @__PURE__ */ t(O1, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function p2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(H1, { ...e }) : /* @__PURE__ */ t(M1, { ...e });
}
const F1 = "_row_1ibo7_2", q1 = "_headCell_1ibo7_14", z1 = "_cell_1ibo7_15", W1 = "_name_1ibo7_26", K1 = "_consequence_1ibo7_32", G1 = "_reason_1ibo7_38", U1 = "_value_1ibo7_44", V1 = "_webRow_1ibo7_60", Y1 = "_webSetting_1ibo7_73", J1 = "_webName_1ibo7_81", X1 = "_webConsequence_1ibo7_89", Q1 = "_webControl_1ibo7_95", Z1 = "_webState_1ibo7_109", ek = "_webChip_1ibo7_114", I = {
  row: F1,
  headCell: q1,
  cell: z1,
  name: W1,
  consequence: K1,
  reason: G1,
  value: U1,
  webRow: V1,
  webSetting: Y1,
  webName: J1,
  webConsequence: X1,
  webControl: Q1,
  webState: Z1,
  webChip: ek
}, nr = 104, rr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function ak({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(We, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(pn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function tk({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = rr[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(ak, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: nr }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function lr(e, a) {
  return String(e ?? a);
}
function nk(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function rk(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? lr(e.value, "—");
}
function lk({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(We, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function ok(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(lk, { ...e });
  const l = nk(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(pn, { options: l, value: lr(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: rk(a) });
}
function ik({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(ok, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: nr }, children: /* @__PURE__ */ t(h, { ...rr[n], size: "tag" }) })
  ] });
}
function g2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(ik, { ...e }) : /* @__PURE__ */ t(tk, { ...e });
}
const sk = "_label_1s7y3_7", ck = "_name_1s7y3_15", dk = "_column_1s7y3_24", uk = "_webFrame_1s7y3_57", mk = "_webHead_1s7y3_62", hk = "_webHeadLabel_1s7y3_74", wk = "_webLabel_1s7y3_117", fk = "_webColumns_1s7y3_124", _k = "_webGroup_1s7y3_130", vk = "_webPeople_1s7y3_131", bk = "_webVia_1s7y3_132", pk = "_webMeta_1s7y3_161", z = {
  label: sk,
  name: ck,
  column: dk,
  webFrame: uk,
  webHead: mk,
  webHeadLabel: hk,
  webLabel: wk,
  webColumns: fk,
  webGroup: _k,
  webPeople: vk,
  webVia: bk,
  webMeta: pk
}, gk = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, za = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Wa({ column: e, children: a }) {
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
function yk(e) {
  if (!e.matrixRole) return;
  const a = gk[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Nk({ node: e }) {
  const a = yk(e);
  return /* @__PURE__ */ o("span", { className: z.label, children: [
    /* @__PURE__ */ t("span", { className: z.name, children: e.name }),
    /* @__PURE__ */ t(kk, { role: a, node: e }),
    /* @__PURE__ */ t(Wa, { column: za[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Wa, { column: za[1], children: e.people === void 0 ? "" : ee(e.people) }),
    /* @__PURE__ */ t(Wa, { column: za[2], children: e.requestedVia ?? "" })
  ] });
}
function kk({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function $k({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ t(
    $n,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ t(Nk, { node: n }),
      children: s
    }
  );
}
function Ka({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function Ck({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ka, { className: `${z.webMeta} ${z.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ka, { className: `${z.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ka, { className: `${z.webMeta} ${z.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Sk() {
  return /* @__PURE__ */ o("div", { className: z.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: z.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: z.webColumns, children: [
      /* @__PURE__ */ t("span", { className: z.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: z.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: z.webVia, children: "Requested via" })
    ] })
  ] });
}
function Rk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Tk(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function xk({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: z.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(Sk, {}),
    /* @__PURE__ */ t(um, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      $n,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(Rk, { row: n }),
        detail: /* @__PURE__ */ t(Ck, { row: n }),
        expanded: Tk(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function y2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(xk, { ...e }) : /* @__PURE__ */ t($k, { ...e });
}
const Lk = "_runbook_b9agc_2", Ak = "_list_b9agc_7", Ek = "_step_b9agc_15", Ik = "_numeral_b9agc_21", Mk = "_body_b9agc_28", Bk = "_head_b9agc_34", Pk = "_title_b9agc_40", jk = "_detail_b9agc_45", Dk = "_actions_b9agc_50", Ok = "_webList_b9agc_56", Hk = "_webStep_b9agc_60", Fk = "_webBody_b9agc_66", qk = "_webTitle_b9agc_74", zk = "_webDetail_b9agc_78", A = {
  runbook: Lk,
  list: Ak,
  step: Ek,
  numeral: Ik,
  body: Mk,
  head: Bk,
  title: Pk,
  detail: jk,
  actions: Dk,
  webList: Ok,
  webStep: Hk,
  webBody: Fk,
  webTitle: qk,
  webDetail: zk
}, or = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function ir(e) {
  return String(e + 1).padStart(2, "0");
}
function Wk({ step: e, index: a, connection: n }) {
  const r = or[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: A.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: A.numeral, children: ir(a) }),
    /* @__PURE__ */ o("span", { className: A.body, children: [
      /* @__PURE__ */ o("span", { className: A.head, children: [
        /* @__PURE__ */ t("span", { className: A.title, children: e.title }),
        /* @__PURE__ */ t(h, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ t(Re, { startedAt: e.startedAt, connection: n })
      ] }),
      /* @__PURE__ */ t("span", { className: A.detail, children: e.detail })
    ] })
  ] });
}
function Kk({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: A.list, children: e.map((r, l) => /* @__PURE__ */ t(Wk, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: A.actions, children: a })
  ] });
}
function Gk({ step: e, index: a, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${A.step} ${A.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${A.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: ir(a) }),
    /* @__PURE__ */ o("span", { className: `${A.body} ${A.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${A.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${A.title} ${A.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(h, { ...or[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t(Re, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${A.detail} ${A.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function Uk({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${A.list} ${A.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(Gk, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${A.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function N2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Uk, { ...e }) : /* @__PURE__ */ t(Kk, { ...e });
}
const Vk = "_list_1gu6a_2", Yk = "_check_1gu6a_10", Jk = "_body_1gu6a_16", Xk = "_text_1gu6a_23", Qk = "_pending_1gu6a_32", Zk = "_measured_1gu6a_37", Je = {
  list: Vk,
  check: Yk,
  body: Jk,
  text: Xk,
  pending: Qk,
  measured: Zk
};
function e$(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function a$({ check: e }) {
  const a = e$(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Je.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ t(nt, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: Je.body, children: [
      /* @__PURE__ */ t("span", { className: Je.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Je.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ t("span", { className: Je.measured, children: e.measured })
  ] });
}
function k2({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Je.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(a$, { check: a }, a.text)) });
}
const t$ = "_root_a6xzy_2", n$ = "_list_a6xzy_10", r$ = "_line_a6xzy_21", l$ = "_at_a6xzy_48", o$ = "_text_a6xzy_52", i$ = "_foot_a6xzy_56", s$ = "_idle_a6xzy_68", c$ = "_caret_a6xzy_76", d$ = "_jump_a6xzy_83", he = {
  root: t$,
  list: n$,
  line: r$,
  at: l$,
  text: o$,
  foot: i$,
  idle: s$,
  caret: c$,
  jump: d$
}, u$ = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function mt(e) {
  return Number.isNaN(Date.parse(e)) ? "" : u$.format(new Date(e));
}
const m$ = { warn: "warning", ok: "ok" };
function h$({ kind: e }) {
  const a = m$[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function w$({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${mt(e)}` });
}
function f$({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${mt(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: he.idle, children: i }),
    /* @__PURE__ */ t(w$, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const _$ = 8;
function v$(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > _$;
}
function b$({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const sr = Be(null);
function $2({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Ut(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(sr.Provider, { value: i, children: n });
}
function p$() {
  const e = Me(sr), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function C2({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = w(null), [i, s] = p(0), [c, d] = p$(), [u, m] = p(!1), f = e.at(-1);
  S(() => {
    s(e.length);
  }, [e.length]), ea(() => {
    const y = l.current;
    y && !u && (y.scrollTop = y.scrollHeight);
  }, [e.length, u]);
  const v = () => {
    var B;
    const y = l.current;
    if (!y) return;
    const L = y.querySelectorAll("[data-consline-text]");
    (B = L.item(L.length - 1)) == null || B.focus(), m(!1);
  };
  return /* @__PURE__ */ o("div", { className: he.root, children: [
    /* @__PURE__ */ t("ol", { className: he.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (y) => m(v$(y.currentTarget)), children: e.map((y, L) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": L < i, children: [
      /* @__PURE__ */ t("span", { className: he.at, children: mt(y.at) }),
      /* @__PURE__ */ t(h$, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${L}`)) }),
    /* @__PURE__ */ o(f$, { connection: a, idleSince: n, last: f, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t(b$, { shown: u, onJump: v })
    ] })
  ] });
}
const g$ = "_row_1k8wl_2", y$ = "_head_1k8wl_14", N$ = "_author_1k8wl_20", k$ = "_eta_1k8wl_25", $$ = "_edited_1k8wl_26", C$ = "_body_1k8wl_32", S$ = "_reason_1k8wl_37", R$ = "_actions_1k8wl_42", Ne = {
  row: g$,
  head: y$,
  author: N$,
  eta: k$,
  edited: $$,
  body: C$,
  reason: S$,
  actions: R$
}, T$ = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function x$(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function L$({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function A$({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: Ne.reason, id: a, children: e })
  ] });
}
function E$(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function I$(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(L$, { ...e }) : /* @__PURE__ */ t(A$, { reason: e.unavailable, reasonId: e.unavailableId });
}
function S2(e) {
  const { comment: a } = e;
  E$(e);
  const n = N(), r = `${n}-unavailable`, l = T$[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${Ne.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Ne.head, children: [
      /* @__PURE__ */ t("span", { className: Ne.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: Ne.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: Ne.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: Ne.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: Ne.reason, id: n, children: x$(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: Ne.actions, children: /* @__PURE__ */ t(I$, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const M$ = "_root_c46wj_2", B$ = "_attach_c46wj_11", P$ = "_actions_c46wj_17", j$ = "_reply_c46wj_23", D$ = "_replyRow_c46wj_28", O$ = "_sendsAs_c46wj_42", Ze = {
  root: M$,
  attach: B$,
  actions: P$,
  reply: j$,
  replyRow: D$,
  sendsAs: O$
};
function cr({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function H$(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = cr(e), s = N();
  return /* @__PURE__ */ o("div", { className: Ze.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ze.replyRow, children: [
      /* @__PURE__ */ t(M, { variant: "reply", labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ t(b, { variant: "ghost", describedBy: s, onClick: () => r(n, l), children: "Send" })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: Ze.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function R2(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(H$, { ...e }) : /* @__PURE__ */ t(F$, { ...e });
}
function F$(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = cr(e);
  return /* @__PURE__ */ o("div", { className: Ze.root, children: [
    /* @__PURE__ */ t(M, { kind: "textarea", label: a, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: Ze.attach, children: [
      /* @__PURE__ */ t(h, { role: "soft", label: r.label }),
      /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ t(
      an,
      {
        label: `Requeue ${l.agent} after posting`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Ze.actions, children: [
      /* @__PURE__ */ t(b, { variant: "primary", onClick: () => i(n, c), children: `Post as ${n}` }),
      s && /* @__PURE__ */ t(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const q$ = "_list_1yhks_2", z$ = "_item_1yhks_6", W$ = "_body_1yhks_22", K$ = "_text_1yhks_28", G$ = "_evidence_1yhks_37", U$ = "_consequence_1yhks_49", V$ = "_note_1yhks_54", qe = {
  list: q$,
  item: z$,
  body: W$,
  text: K$,
  evidence: G$,
  consequence: U$,
  note: V$
};
function Y$({ criterion: e }) {
  return /* @__PURE__ */ t(Pe, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function zt({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function J$(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function X$({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: qe.body, children: [
    /* @__PURE__ */ t("span", { className: qe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(zt, { text: " · " }),
      /* @__PURE__ */ t("code", { className: qe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(zt, { text: " · " }),
      /* @__PURE__ */ t("span", { className: qe.consequence, children: J$(e.why) })
    ] })
  ] });
}
function Q$({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: qe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(Y$, { criterion: e }),
    /* @__PURE__ */ t(X$, { criterion: e })
  ] });
}
function T2({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(Q$, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: qe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const Z$ = "_list_dwhoz_2", e0 = "_rung_dwhoz_6", a0 = "_name_dwhoz_18", t0 = "_actor_dwhoz_32", va = {
  list: Z$,
  rung: e0,
  name: a0,
  actor: t0
}, n0 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function r0({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = n0[e.state];
  return /* @__PURE__ */ o("li", { className: va.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: va.name, children: e.name }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${va.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function x2({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${va.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(r0, { rung: a }, a.name)) });
}
const l0 = "_sheet_pw37w_2", o0 = "_title_pw37w_9", i0 = "_stage_pw37w_15", s0 = "_effects_pw37w_20", c0 = "_effect_pw37w_20", d0 = "_numeral_pw37w_31", u0 = "_effectText_pw37w_38", m0 = "_refusals_pw37w_43", h0 = "_reasons_pw37w_52", w0 = "_reason_pw37w_52", f0 = "_actions_pw37w_62", ue = {
  sheet: l0,
  title: o0,
  stage: i0,
  effects: s0,
  effect: c0,
  numeral: d0,
  effectText: u0,
  refusals: m0,
  reasons: h0,
  reason: w0,
  actions: f0
};
function _0({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function L2({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = N(), d = `${c}-refusal`, [u, m] = p(""), f = n.length > 0;
  return /* @__PURE__ */ t(ta, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ t("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ t("ol", { className: ue.effects, children: a.map((v, y) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ t("span", { className: ue.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: ue.effectText, children: v })
    ] }, v)) }),
    /* @__PURE__ */ t(
      Yd,
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
    f && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ t(h, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ t("ul", { className: ue.reasons, children: n.map((v, y) => /* @__PURE__ */ t("li", { className: ue.reason, id: y === 0 ? d : void 0, children: v.reason }, v.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ t(_0, { refused: f, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ t(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const v0 = "_list_1rowi_2", b0 = "_path_1rowi_7", p0 = "_head_1rowi_21", g0 = "_label_1rowi_28", y0 = "_consequence_1rowi_35", N0 = "_ask_1rowi_36", Qe = {
  list: v0,
  path: b0,
  head: p0,
  label: g0,
  consequence: y0,
  ask: N0
}, Xa = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Wt(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Kt(e) {
  return e ? "primary" : "secondary";
}
function k0({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(b, { variant: Kt(a), size: "sm", onClick: () => n(e.kind), children: Xa[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: Kt(a), size: "sm", disabled: !0, describedBy: r, children: Xa[e.kind] }),
    /* @__PURE__ */ t("span", { className: Qe.ask, id: r, children: e.askInstead })
  ] });
}
function $0({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Qe.path, "data-allowed": e.allowed, "data-role": Wt(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Qe.head, children: [
      /* @__PURE__ */ t("span", { className: Qe.label, children: e.title ?? Xa[e.kind] }),
      /* @__PURE__ */ t(h, { role: Wt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: Qe.consequence, children: e.consequence }),
    /* @__PURE__ */ t(k0, { path: e, primary: a, onChoose: n })
  ] });
}
function A2({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: Qe.list, children: e.map((n, r) => /* @__PURE__ */ t($0, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const C0 = "_list_1m7i0_2", S0 = "_item_1m7i0_6", R0 = "_node_1m7i0_18", T0 = "_body_1m7i0_24", x0 = "_head_1m7i0_30", L0 = "_stage_1m7i0_36", A0 = "_version_1m7i0_41", E0 = "_sentence_1m7i0_49", I0 = "_meta_1m7i0_54", $e = {
  list: C0,
  item: S0,
  node: R0,
  body: T0,
  head: x0,
  stage: L0,
  version: A0,
  sentence: E0,
  meta: I0
}, M0 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function B0({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: $e.head, children: [
    /* @__PURE__ */ t("span", { className: $e.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: $e.version, title: e.version, children: e.version }) : null
  ] });
}
function P0({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${$e.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${$e.node} ward-history-node`, children: /* @__PURE__ */ t(Pe, { size: 9, kind: M0[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${$e.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(B0, { entry: e }),
      /* @__PURE__ */ t("span", { className: $e.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${$e.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ne(e.cost)}`
      ] })
    ] })
  ] });
}
function E2({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${$e.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(P0, { entry: a }, a.stage + String(n))) });
}
const j0 = "_thread_1e70p_3", D0 = "_turn_1e70p_8", O0 = "_who_1e70p_27", H0 = "_body_1e70p_32", ba = {
  thread: j0,
  turn: D0,
  who: O0,
  body: H0
}, dr = Be(!1);
function I2({ children: e, density: a }) {
  return /* @__PURE__ */ t(dr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${ba.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function M2({ turn: e }) {
  if (!Me(dr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ba.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ba.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${ba.body} ward-chat-body`, children: e.body })
  ] });
}
const F0 = "_list_yiolt_3", q0 = "_row_yiolt_7", z0 = "_label_yiolt_20", W0 = "_n_yiolt_26", K0 = "_cause_yiolt_33", la = {
  list: F0,
  row: q0,
  label: z0,
  n: W0,
  cause: K0
};
function G0(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const U0 = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function V0({ row: e, formatNumber: a }) {
  return G0(e), /* @__PURE__ */ o("li", { className: `${la.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(Pe, { size: 8, ...U0[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: la.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${la.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(Y0, { cause: e.cause })
  ] });
}
function Y0({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${la.cause} ward-healthrow-cause`, children: e }) : null;
}
function B2({ rows: e, formatNumber: a = ee }) {
  return /* @__PURE__ */ t("ul", { className: `${la.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(V0, { row: n, formatNumber: a }, n.label)) });
}
const J0 = "_root_1jxwp_2", X0 = {
  root: J0
};
function P2({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: X0.root, "data-density": l, children: [
    /* @__PURE__ */ t(ja, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const Q0 = "_row_dhbre_3", Z0 = "_key_dhbre_13", eC = "_stack_dhbre_24", aC = "_value_dhbre_32", tC = "_evidence_dhbre_39", nC = "_mark_dhbre_47", Ye = {
  row: Q0,
  key: Z0,
  stack: eC,
  value: aC,
  evidence: tC,
  mark: nC
};
function rC({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(nt, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function j2({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ye.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Ye.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ye.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Ye.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Ye.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Ye.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(rC, { state: e.state }) })
  ] });
}
const lC = "_cell_gh2sd_2", oC = {
  cell: lC
}, iC = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function sC(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function cC(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function dC(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: sC(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function uC(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function D2({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  cC(e, n);
  const r = uC(e);
  return /* @__PURE__ */ t(
    cu,
    {
      label: "Rejection routing",
      columns: iC,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: oC.cell, "data-norerun": l.noRerun ? !0 : void 0, children: dC(l, i) }),
      empty: a ?? /* @__PURE__ */ t(Ym, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const mC = "_row_1f2re_2", hC = "_title_1f2re_12", wC = "_turns_1f2re_18", fC = "_waiting_1f2re_19", _C = "_resolved_1f2re_20", vC = "_activity_1f2re_21", bC = "_cost_1f2re_28", pC = "_link_1f2re_29", gC = "_tableLink_1f2re_47", yC = "_tableRecord_1f2re_48", NC = "_tableRow_1f2re_59", kC = "_tableTitle_1f2re_71", $C = "_tableResolved_1f2re_76", CC = "_tableMeta_1f2re_87", SC = "_tableCost_1f2re_94", RC = "_tableActivity_1f2re_95", TC = "_tableState_1f2re_105", O = {
  row: mC,
  title: hC,
  turns: wC,
  waiting: fC,
  resolved: _C,
  activity: vC,
  cost: bC,
  link: pC,
  tableLink: gC,
  tableRecord: yC,
  tableRow: NC,
  tableTitle: kC,
  tableResolved: $C,
  tableMeta: CC,
  tableCost: SC,
  tableActivity: RC,
  tableState: TC
}, ur = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function xC(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function LC(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function AC(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const EC = { duplicate: "Closed · duplicate" };
function IC({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(aa, { className: O.tableMeta, text: `waiting on ${e}` });
}
function MC({ value: e }) {
  return /* @__PURE__ */ t("td", { className: O.tableCost, children: e === void 0 ? null : ne(e) });
}
function BC({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${O.tableRecord} ward-target`, href: F(e.href), children: `→ ${e.key}` });
}
function PC({ session: e, href: a }) {
  const n = ur[e.state];
  return /* @__PURE__ */ o("tr", { className: O.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: O.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${O.tableLink} ward-target`, href: F(a), children: /* @__PURE__ */ t(aa, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: O.tableMeta, children: LC(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: O.tableResolved, children: [
      AC(e.resolved),
      /* @__PURE__ */ t(IC, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(MC, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: O.tableActivity, children: xC(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: O.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: EC[e.state] ?? n.label }),
      /* @__PURE__ */ t(BC, { link: e.link })
    ] }) })
  ] });
}
function jC({ session: e }) {
  const a = ur[e.state];
  return /* @__PURE__ */ o("div", { className: O.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t(aa, { className: O.title, text: e.title }),
    /* @__PURE__ */ t("span", { className: O.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t(aa, { className: O.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: O.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: O.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : ne(e.cost) }),
    /* @__PURE__ */ t("span", { className: O.activity, children: de(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: O.link, href: F(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function O2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(PC, { session: e.session, href: e.href }) : /* @__PURE__ */ t(jC, { session: e.session });
}
const DC = "_block_1yy2v_3", OC = "_list_1yy2v_9", HC = "_line_1yy2v_14", Qa = {
  block: DC,
  list: OC,
  line: HC
}, FC = { warn: "warning", ok: "ok" };
function qC({ kind: e }) {
  const a = FC[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function zC({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Qa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(qC, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function H2({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${Qa.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: Qa.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(zC, { line: n }, `${r}-${n.text}`)) }) });
}
const WC = "_band_tt7hp_1", KC = "_head_tt7hp_8", GC = "_cell_tt7hp_19", UC = "_index_tt7hp_35", VC = "_title_tt7hp_42", YC = "_note_tt7hp_48", JC = "_cellTitle_tt7hp_53", XC = "_cellBody_tt7hp_58", QC = "_tag_tt7hp_64", ye = {
  band: WC,
  head: KC,
  cell: GC,
  index: UC,
  title: VC,
  note: YC,
  cellTitle: JC,
  cellBody: XC,
  tag: QC
}, Gt = 4;
function F2({ index: e, title: a, note: n, cells: r }) {
  if (r.length !== Gt)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Gt}-cell grid`);
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
  cS as ACCENT_PRESETS,
  RS as ActionStack,
  C2 as ActivityConsole,
  vS as AdminIcon,
  u_ as AgentCard,
  bS as AppShell,
  c2 as AppearanceStrip,
  F2 as Band,
  $S as BarChart,
  xh as BoardColumn,
  qS as BoardFootnote,
  zS as BoardHeader,
  fS as BoardIcon,
  MS as BoardScroller,
  b as Btn,
  sS as CHIP_ROLES,
  Jn as CREDENTIAL_COLUMNS,
  kS as Callout,
  d2 as CapabilityRow,
  M2 as ChatMessage,
  an as Checkbox,
  h as Chip,
  aa as ClampText,
  S2 as ClarificationRow,
  ZS as ClauseRuleRow,
  QS as ClauseRules,
  Ln as ColourLadder,
  u2 as ComponentRow,
  R2 as Composer,
  KS as ConfigRow,
  WS as ConfigRowHead,
  rt as ConnectionMark,
  $2 as ConsoleAnnounceProvider,
  I2 as Conversation,
  Yd as CostMeter,
  h2 as CredentialRow,
  m2 as CredentialRowHead,
  T2 as CriteriaList,
  mi as Crumb,
  dS as DENSITIES,
  B2 as DeliveryHealth,
  jS as DeniedState,
  a2 as DryRunRail,
  Ym as EmptyState,
  w2 as EnvCard,
  M as Field,
  PS as FilteredEmpty,
  ES as FormStack,
  ja as GateChecklist,
  x2 as GateLadder,
  cu as Grid,
  n2 as HandoffRuleRow,
  t2 as HandoffRules,
  wS as HomeIcon,
  GS as ItemDrawer,
  f2 as KeyPanel,
  Ar as LIVE_EVENT_TYPES,
  If as LegacyBoardColumn,
  VS as LegacyBoardHeader,
  YS as LegacyConfigRow,
  XS as LegacyItemDrawer,
  Sf as LegacyOverCapNote,
  JS as LegacyPreviewRail,
  Rn as LegacyWorkCard,
  Re as LiveIndicator,
  DS as LoadFailed,
  FS as Loading,
  tr as MCP_SERVER_COLUMNS,
  nt as Mark,
  v2 as MarkUpload,
  Pe as Marker,
  p2 as McpServerRow,
  b2 as McpServerRowHead,
  As as Menu,
  bs as MenuButton,
  r2 as NewStreamModal,
  Qm as OverCapNote,
  ta as Overlay,
  e2 as PARTIAL_STEP_REASON,
  nr as POLICY_CHIP_WIDTH,
  xS as PageFrame,
  NS as PageHeader,
  CS as PlainList,
  g2 as PolicyRow,
  US as PreviewRail,
  za as ROLE_MATRIX_COLUMNS,
  qn as RULE_ACTIONS,
  yn as Radio,
  P2 as ReadyChecklist,
  AS as RecordSection,
  L2 as RequeueSheet,
  A2 as ResolveBlock,
  j2 as ResolvedFieldRow,
  y2 as RoleMatrixRow,
  D2 as RoutingTable,
  l2 as RuleRow,
  N2 as RunbookSteps,
  Lr as STREAM_STEPS,
  IS as SectionBand,
  Lt as SectionHeader,
  pn as SegmentedControl,
  dn as Select,
  O2 as SessionRow,
  yS as Sidebar,
  o2 as StageColumn,
  BS as StageGrid,
  E2 as StageHistory,
  Gb as StageListEditor,
  OS as StaleStrip,
  Ma as StatStrip,
  i2 as StreamRow,
  _S as StudioIcon,
  LS as SubjectRail,
  We as Switch,
  gS as TabLinks,
  SS as TableHead,
  pS as Tabs,
  rS as ThemeProvider,
  s2 as ToolRow,
  TS as TopBar,
  um as Tree,
  $n as TreeRow,
  H2 as TypedInputBlock,
  co as UNSAFE_HREF,
  k2 as ValidationList,
  tS as VisibilityProvider,
  nS as Visible,
  iS as WARD_VERSION,
  Pa as WorkCard,
  HS as WriteUnavailableStrip,
  xC as agoSince,
  pr as clock,
  cp as colourStatus,
  ee as count,
  ce as duration,
  Za as elapsed,
  oS as eventSourceTransport,
  Ta as isStreamStep,
  xa as isValidatedStreamStep,
  F_ as ladderValidation,
  I1 as mcpConnectionChip,
  A1 as mcpToolName,
  ne as money,
  we as ms,
  Cn as ordered,
  Yt as ratio,
  Zy as restartLabel,
  F as safeHref,
  de as stamp,
  et as stream,
  mS as streamChip,
  Ia as streamChipProps,
  pe as streamColour,
  Ir as streamHex,
  uS as streamVars,
  wa as useBorderFlash,
  Rr as useFocusTrap,
  hS as useLiveFeed,
  lS as useReturnFocus,
  Ra as useRovingTabindex,
  at as useTicker,
  gr as useVisible,
  W as v,
  _2 as validateMark,
  sa as validatedStep,
  Xt as validatedStreamSteps
};
