import { jsx as t, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as Gt, useContext as Ie, createContext as Me, useState as p, useEffect as S, useCallback as Q, useRef as w, useLayoutEffect as ra, useId as N, isValidElement as sr, Children as cr, Fragment as dr } from "react";
import { createPortal as ur, flushSync as Ut } from "react-dom";
function ce(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const n = Math.floor(e / 36e5);
  return n < 24 ? `${n}h ${a % 60}m` : `${Math.floor(n / 24)}d ${n % 24}h`;
}
const wt = (e) => String(e).padStart(2, "0");
function Za(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const n = Math.floor(a / 60);
  return n < 60 ? `${n}m ${wt(a % 60)}s` : `${Math.floor(n / 60)}h ${wt(n % 60)}m`;
}
const mr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = mr.formatToParts(new Date(e)), n = (r) => {
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
function ae(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function Vt(e, a) {
  return `${e} / ${a}`;
}
const hr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function wr(e) {
  return hr.format(new Date(e));
}
const Yt = Me(/* @__PURE__ */ new Set());
function IC({ hidden: e, children: a }) {
  const n = Gt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Yt.Provider, { value: n, children: a });
}
function fr(e) {
  return !Ie(Yt).has(e);
}
function MC({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(T, { children: fr(e) ? a : n });
}
const _r = "(prefers-color-scheme: dark)";
function ft() {
  return typeof window.matchMedia == "function" ? window.matchMedia(_r) : null;
}
function vr(e) {
  const [a, n] = p(() => {
    var r;
    return ((r = ft()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? ft() : null;
    if (!r) return;
    const l = () => n(r.matches);
    return l(), r.addEventListener("change", l), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function Ha(e, a) {
  S(() => {
    const n = document.documentElement;
    return n.setAttribute(e, a), () => n.removeAttribute(e);
  }, [e, a]);
}
function br(e, a) {
  return e !== "system" ? e : a ? "dark" : "light";
}
function BC({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
  const l = vr(e === "system");
  return Ha("data-theme", br(e, l)), Ha("data-accent", a), Ha("data-density", n), /* @__PURE__ */ t(T, { children: r });
}
const pr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function gr(e, a, n, r) {
  return e.shiftKey ? document.activeElement === n ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? n : void 0;
}
function yr(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = gr(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Nr(e) {
  return { onKeyDown: Q(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(pr));
      yr(n, e.current, r);
    },
    [e]
  ) };
}
function PC(e, a = !0) {
  S(() => {
    if (!a) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const _t = { ArrowUp: -1, ArrowDown: 1 }, vt = { ArrowLeft: -1, ArrowRight: 1 }, kr = (e, a, n) => Math.min(n, Math.max(a, e));
function $r(e, a) {
  if (a !== "horizontal" && e in _t) return _t[e];
  if (a !== "vertical" && e in vt) return vt[e];
}
function xa({ orientation: e = "both" } = {}) {
  const [a, n] = p(0), r = w(/* @__PURE__ */ new Map()), l = w(!1);
  ra(() => {
    var b;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(a)) return;
    const m = u[0], v = l.current;
    l.current = !1, n(m), v && ((b = r.current.get(m)) == null || b.focus());
  });
  const i = Q((u) => n(u), []), s = Q((u) => {
    var m;
    n(u), (m = r.current.get(u)) == null || m.focus();
  }, []), c = Q(
    (u) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const v = Math.max(0, m.indexOf(a)), b = $r(u.key, e);
      b !== void 0 ? (u.preventDefault(), s(m[kr(v + b, 0, m.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(m[0])) : u.key === "End" && (u.preventDefault(), s(m[m.length - 1]));
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
const jC = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, DC = "0.2.0", HC = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Cr = [1, 2, 3, 4, 5, 6], Xt = [1, 2, 3], Sr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], qC = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], OC = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], W = {
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
    personName: "var(--ward-type-personName)"
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
function La(e) {
  return Cr.includes(e);
}
function Aa(e) {
  return Xt.includes(e);
}
function FC(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function zC(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Rr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Tr(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return Rr[e];
}
function bt(e) {
  return typeof e != "string" ? null : Sr.includes(e) ? e : null;
}
function xr(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Lr(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Ar(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Er(e, a, n) {
  const r = xr(e);
  if (r === null) return null;
  const l = bt(n) ?? bt(r.type);
  return l === null ? null : { ...r, type: l, id: Lr(r, a), at: Ar(r) };
}
function Ir(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function Mr(e, a, n) {
  return e >= we.heartbeat && !a && n !== null;
}
function WC(e, a) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = w(/* @__PURE__ */ new Map()), c = w(0), d = w(""), u = w(0), m = w(null), v = w(0), b = w(0), y = w(!1), E = w("reconnecting"), B = Q((R) => {
    E.current = R, r(R);
  }, []), oe = Q(() => {
    c.current = Date.now();
  }, []), Re = Q((R) => {
    for (const [G, be] of s.current)
      (be === "*" || R.itemKey === be) && G(R);
  }, []), te = Q(() => {
    m.current = a(e, { lastEventId: d.current }, {
      onEvent: (R, G, be) => {
        const Pe = Er(R, G, be);
        Pe !== null && (Pe.id && (d.current = Pe.id), oe(), y.current = !1, B("live"), i(Pe.at), Re(Pe));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, oe(), B("live");
      },
      onError: () => {
        var G;
        (G = m.current) == null || G.close(), m.current = null, y.current = !0, E.current !== "stale" && B("reconnecting");
        const R = Math.min(we.reconnectBase * 2 ** u.current, we.reconnectMax);
        u.current += 1, v.current = window.setTimeout(te, R);
      }
    });
  }, [Re, B, oe, a, e]), Ke = Q((R) => {
    y.current = !0, R.close(), m.current = null, v.current = window.setTimeout(te, we.reconnectBase);
  }, [te]), Ge = Q((R, G) => (s.current.set(G, R), () => {
    s.current.delete(G);
  }), []);
  return S(() => (te(), b.current = window.setInterval(() => {
    const R = Date.now() - c.current, G = Ir(R, E.current);
    G && B(G);
    const be = m.current;
    Mr(R, y.current, be) && Ke(be);
  }, we.tick), () => {
    var R;
    window.clearInterval(b.current), window.clearTimeout(v.current), y.current = !1, (R = m.current) == null || R.close(), m.current = null;
  }), [te, Ke, B]), { connection: n, lastEventAt: l, subscribe: Ge };
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
const pt = { blue: "running", orange: "waiting", green: "done" };
function Br() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function gt(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function fa(e, a) {
  const n = w(0), r = Q((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (Br() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${pt[i]})`), s.style.setProperty("--flash", `var(--ward-color-${pt[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => gt(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => gt(s), we.flash)));
  }, [a, e]);
  return S(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Pr = "_root_1otpc_2", jr = {
  root: Pr
};
function Dr(e, a, n, r, l) {
  const i = [Za(a)];
  return e || i.push(`as of ${wr(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Se({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = at(e, l), s = (a == null ? void 0 : a.at) ?? e, c = Dr(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${jr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const Hr = "_app_1m4se_1", qr = "_side_1m4se_30", Or = "_sideTop_1m4se_42", Fr = "_sideBody_1m4se_56", zr = "_iconRail_1m4se_67", Wr = "_railItem_1m4se_76", Kr = "_railIcon_1m4se_97", Gr = "_railDot_1m4se_102", Ur = "_railLetter_1m4se_108", Vr = "_main_1m4se_113", Yr = "_rail_1m4se_76", Xr = "_page_1m4se_131", Jr = "_headerRow_1m4se_140", Qr = "_sidebarToggle_1m4se_147", Zr = "_headerSlot_1m4se_152", el = "_drawerSide_1m4se_157", al = "_root_1m4se_193", tl = "_topbar_1m4se_200", nl = "_mark_1m4se_211", rl = "_brand_1m4se_218", ll = "_tagline_1m4se_224", ol = "_identity_1m4se_230", il = "_tools_1m4se_231", sl = "_nav_1m4se_241", cl = "_metadata_1m4se_248", dl = "_actor_1m4se_263", ul = "_detail_1m4se_264", ml = "_content_1m4se_324", hl = "_toolsPanel_1m4se_340", wl = "_skip_1m4se_366", $ = {
  app: Hr,
  side: qr,
  sideTop: Or,
  sideBody: Fr,
  iconRail: zr,
  railItem: Wr,
  railIcon: Kr,
  railDot: Gr,
  railLetter: Ur,
  main: Vr,
  rail: Yr,
  page: Xr,
  headerRow: Jr,
  sidebarToggle: Qr,
  headerSlot: Zr,
  drawerSide: el,
  root: al,
  topbar: tl,
  mark: nl,
  brand: rl,
  tagline: ll,
  identity: ol,
  tools: il,
  nav: sl,
  metadata: cl,
  actor: dl,
  detail: ul,
  content: ml,
  toolsPanel: hl,
  skip: wl
}, fl = "_btn_tzr89_2", _l = "_primary_tzr89_14", vl = "_destructive_tzr89_25", bl = "_secondary_tzr89_35", pl = "_ghost_tzr89_40", gl = "_overflow_tzr89_49", yl = "_sm_tzr89_56", Nl = "_disabled_tzr89_60", da = {
  btn: fl,
  primary: _l,
  destructive: vl,
  secondary: bl,
  ghost: pl,
  overflow: gl,
  sm: yl,
  disabled: Nl
};
function kl(e, a, n, r) {
  const l = a === "sm" ? [da.sm, "ward-btn--sm"] : [], i = n ? [da.disabled] : [];
  return [da.btn, da[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function $l(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Cl(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Sl(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function Rl(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Tl(e, a, n) {
  return Rl(e.describedBy, a && n);
}
function xl({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Ll(e) {
  return e.children ?? e.label;
}
function _(e) {
  Cl(e);
  const a = e.variant ?? "secondary", n = e.size ?? "md", r = e.disabled ?? !1, l = Sl(e), i = N();
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: kl(a, n, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": n,
        disabled: r,
        title: l,
        "aria-describedby": Tl(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...$l(a, e.controls),
        children: Ll(e)
      }
    ),
    /* @__PURE__ */ t(xl, { id: i, reason: l })
  ] });
}
function Ea(e) {
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
const Al = "_scrim_18idy_2", El = "_drawer_18idy_10", Il = "_sheet_18idy_14", Ml = "_modal_18idy_18", Bl = "_panel_18idy_23", Pl = "_start_18idy_39", jl = "_header_18idy_62", Dl = "_title_18idy_70", Hl = "_body_18idy_74", ql = "_close_18idy_101", ke = {
  scrim: Al,
  drawer: El,
  sheet: Il,
  modal: Ml,
  panel: Bl,
  start: Pl,
  header: jl,
  title: Dl,
  body: Hl,
  close: ql
}, Ol = Me(null), ga = [], ya = /* @__PURE__ */ new Map();
function Fl(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function zl(e, a) {
  let n = ya.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ya.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Wl(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !Fl(r) && zl(e, r);
}
function Kl(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (Wl(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function Gl(e) {
  for (const a of e.claims) {
    const n = ya.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), ya.delete(a)));
  }
}
function Ul(e, a) {
  const n = { root: e, claims: [] };
  return ga.push(n), Kl(n, a), n;
}
function Vl(e) {
  const a = ga.indexOf(e);
  a >= 0 && ga.splice(a, 1), Gl(e);
}
function yt(e) {
  return e !== null && ga.at(-1) === e;
}
function Yl(e, a, n) {
  const r = w(null), l = w(n);
  return l.current = n, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = Ul(i, a);
    return r.current = c, () => {
      var u, m;
      const d = yt(c);
      Vl(c), r.current = null, d && ((m = (u = l.current ?? s) == null ? void 0 : u.focus) == null || m.call(u));
    };
  }, [a]), Q(() => yt(r.current), []);
}
function Xl(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Jl(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ql({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${ke.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("header", { className: `${ke.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${ke.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${ke.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Zl(e) {
  return `${ke.scrim} ${ke[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function eo(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ke.panel} ${ke[e]} ward-overlay-panel${n}${r}`;
}
function ao(e) {
  const a = Ie(Ol);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = w(null), n = w(null), r = N(), l = ao(e.container), i = Ea("(min-width: 768px)"), s = Xl(e.kind, i), c = Jl(e, r), d = Nr(n), u = Yl(a, l, e.returnFocusTo), m = Q(() => {
    u() && e.onClose();
  }, [e.onClose, u]);
  return S(() => {
    var v, b;
    u() && ((b = (v = n.current) == null ? void 0 : v.querySelector("button")) == null || b.focus());
  }, [u]), S(() => {
    const v = (b) => {
      b.key === "Escape" && m();
    };
    return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
  }, [m]), ur(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: Zl(s),
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
            className: eo(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (v) => v.stopPropagation(),
            onKeyDown: (v) => u() && d.onKeyDown(v),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${ke.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(Ql, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const to = /^([a-z][a-z0-9+.-]*):/i, no = /* @__PURE__ */ new Set(["http", "https"]), ro = "#";
function lo(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = to.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function O(e) {
  const a = lo(e);
  return a === void 0 || no.has(a) ? e : ro;
}
function oo(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Jt(e) {
  const a = oo(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function ia(e, a, n) {
  S(() => {
    const r = e.current;
    if (!r) return;
    const l = () => {
      const s = Jt(r);
      n == null || n(s.start || s.end);
    };
    r.addEventListener("scroll", l, { passive: !0 });
    const i = typeof ResizeObserver > "u" ? null : new ResizeObserver(l);
    for (const s of [r, ...r.children]) i == null || i.observe(s);
    return l(), () => {
      r.removeEventListener("scroll", l), i == null || i.disconnect();
    };
  }, [e, a, n]);
}
function io(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function tt(e, a, n) {
  ra(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = io(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), Jt(r);
  }, [e, a, n]);
}
const so = "_icon_1ylqy_2", co = {
  icon: so
};
function sa({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: co.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function KC() {
  return /* @__PURE__ */ t(sa, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function GC() {
  return /* @__PURE__ */ o(sa, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function UC() {
  return /* @__PURE__ */ o(sa, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function VC() {
  return /* @__PURE__ */ t(sa, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function uo() {
  return /* @__PURE__ */ o(sa, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const Qt = "ward:sidebar-collapsed", mo = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function ho() {
  try {
    return window.localStorage.getItem(Qt) === "true";
  } catch {
    return !1;
  }
}
function wo(e) {
  try {
    window.localStorage.setItem(Qt, String(e));
  } catch {
  }
}
function fo(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function _o(e) {
  return e instanceof Element && e.closest(mo) !== null;
}
function vo(e) {
  return e.key === "[" && !fo(e) && !_o(e.target);
}
function bo(e) {
  const [a, n] = p(ho), r = () => {
    wo(!a), n(!a);
  };
  return S(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!vo(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, a]), { collapsed: a, toggle: r };
}
function po() {
  const e = Ea("(max-width: 791.98px)"), a = N(), n = w(null), [r, l] = p(!1);
  return r && !e && l(!1), { narrow: e, open: r, drawerId: a, slotRef: n, toggle: () => l(!r), close: () => l(!1) };
}
function go({ header: e, label: a, drawer: n }) {
  return n.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.drawerId, children: a }) }),
    /* @__PURE__ */ t("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function yo({ sidebar: e, label: a, drawer: n }) {
  var l;
  if (!n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ t(ea, { kind: "start", id: n.drawerId, title: a, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ t("div", { className: $.drawerSide, onClick: r, children: e }) });
}
function No(e, a) {
  const n = e !== void 0 && !a, { collapsed: r, toggle: l } = bo(n);
  return { enabled: n, collapsed: n && r, toggle: l };
}
function ko({ fold: e }) {
  return e.enabled ? /* @__PURE__ */ t("div", { className: $.sideTop, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(uo, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] }) }) : null;
}
function $o({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": et(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Co({ items: e, label: a }) {
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: O(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t($o, { item: n }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function So({ sidebar: e, label: a, iconRail: n, fold: r }) {
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(ko, { fold: r }),
    /* @__PURE__ */ t("div", { className: $.sideBody, hidden: r.collapsed, children: e }),
    r.collapsed && /* @__PURE__ */ t(Co, { items: n ?? [], label: a })
  ] });
}
function Ro({ sidebar: e, header: a, children: n, rail: r, sidebarLabel: l, iconRail: i }) {
  const s = r != null, c = po(), d = No(i, c.narrow), u = l ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(s), "data-collapsed": String(d.collapsed), children: [
    !c.narrow && /* @__PURE__ */ t(So, { sidebar: e, label: u, iconRail: i, fold: d }),
    /* @__PURE__ */ o("main", { className: $.main, children: [
      /* @__PURE__ */ t(go, { header: a, label: u, drawer: c }),
      /* @__PURE__ */ t("div", { className: $.page, children: n })
    ] }),
    s && /* @__PURE__ */ t("div", { className: $.rail, children: r }),
    /* @__PURE__ */ t(yo, { sidebar: e, label: u, drawer: c })
  ] });
}
function To({ destinations: e, active: a }) {
  const n = w(null);
  return ia(n, e.length), tt(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t("nav", { ref: n, className: $.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ t("a", { href: O(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Ga({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function xo({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ t(Ga, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Ga, { value: a, className: $.detail })
  ] });
}
function Lo() {
  const e = Ea("(max-width: 767.98px)"), a = N(), n = w(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Ao({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: $.tools, children: e });
}
function Eo({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function Io(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ t("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Ga, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ t(To, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: $.identity, children: /* @__PURE__ */ t(xo, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(Ao, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Mo(e) {
  const a = N(), n = Lo();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(Io, { ...e, menu: n }),
    /* @__PURE__ */ t(Eo, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: $.content, children: e.children })
  ] });
}
function Bo(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function YC(e) {
  return Bo(e) ? /* @__PURE__ */ t(Ro, { ...e }) : /* @__PURE__ */ t(Mo, { ...e });
}
function Ia(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Po = "_root_197jc_2", jo = "_row_197jc_8", Do = "_box_197jc_14", Ho = "_label_197jc_21", qo = "_lockedNote_197jc_26", Oo = "_consequence_197jc_34", Fo = "_sample_197jc_69", He = {
  root: Po,
  row: jo,
  box: Do,
  label: Ho,
  lockedNote: qo,
  consequence: Oo,
  sample: Fo
};
function zo(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Wo({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${He.consequence} ward-check-consequence`, children: a }) : null;
}
function Ko({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${He.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Go({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: He.sample, "aria-hidden": "true", children: e }) : null;
}
function Zt(e) {
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = zo(e);
  return /* @__PURE__ */ o("div", { className: `${He.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: He.row, children: [
      /* @__PURE__ */ t(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${He.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (l) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, l.target.checked));
          },
          "aria-describedby": Ia(n, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: He.label, children: [
        e.label,
        /* @__PURE__ */ t(Ko, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(Go, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(Wo, { id: n, text: e.consequence })
  ] });
}
const Uo = "_chip_pq6tb_2", Vo = {
  chip: Uo
}, Yo = {
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
function Xo(e, a) {
  if (e === "stream") return Jo(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = Yo[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function Jo(e) {
  if (!e || !Aa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = et(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${Vo.chip} ward-chip ward-chip--${e}`, style: Xo(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const Qo = "_clamp_zn74g_3", Nt = {
  clamp: Qo
};
function Ee({ text: e, as: a = "span", className: n }) {
  return /* @__PURE__ */ t(a, { className: n === void 0 ? Nt.clamp : `${Nt.clamp} ${n}`, "data-ward-clamp": "", title: e, children: e });
}
function ca(e) {
  return typeof e == "number" && Aa(e) ? e : null;
}
function ve(e, a) {
  const n = ca(e);
  return n === null ? "var(--ward-color-line2)" : `var(--ward-stream-${n}-${a})`;
}
function Ma(e, a) {
  const n = ca(a);
  return n === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: n };
}
const Zo = "_nav_8lufj_2", ei = "_list_8lufj_8", ai = "_item_8lufj_15", ti = "_link_8lufj_30", ni = "_sep_8lufj_40", ri = "_current_8lufj_44", li = "_chips_8lufj_48", je = {
  nav: Zo,
  list: ei,
  item: ai,
  link: ti,
  sep: ni,
  current: ri,
  chips: li
};
function oi({ path: e, chips: a }) {
  return /* @__PURE__ */ t("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: je.nav, children: [
    /* @__PURE__ */ t("ol", { className: je.list, children: e.map((n, r) => /* @__PURE__ */ o("li", { className: je.item, children: [
      r > 0 ? /* @__PURE__ */ t("span", { className: je.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${je.link} ward-target`, href: O(n.href), children: n.label }) : n.label : /* @__PURE__ */ t("span", { className: je.current, "aria-current": "page", children: n.label })
    ] }, n.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${je.chips} ward-chiprow`, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] }) });
}
function en(e, a, n) {
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
const ii = 500;
function an(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function tn() {
  const e = w(""), a = w(void 0);
  return S(() => () => clearTimeout(a.current), []), (n) => (clearTimeout(a.current), e.current += n.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, ii), e.current);
}
const ua = 4;
function si(e, a, n) {
  const r = Math.max(0, n - e.bottom - ua * 2), l = Math.max(0, e.top - ua * 2);
  return a <= r || r >= l ? { top: e.bottom + ua, maxHeight: r } : { top: e.top - ua - Math.min(a, l), maxHeight: l };
}
function ci(e, a, n, r) {
  const l = { start: e.left, end: e.right - a }, i = { start: l.start + a <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - a));
}
function di(e, a, n, r) {
  return { ...si(e, a.height, n.height), left: ci(e, a.width, n.width, r) };
}
function _a(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function ui(e, a) {
  const n = a.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", _a(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function mi(e) {
  const a = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = a.map((r) => r.scrollTop);
  return () => a.forEach((r, l) => r.scrollTop = n[l]);
}
function kt(e, a, n) {
  const r = mi(e), l = ui(e, a), i = di(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: _a(i.left - l.box.left), top: _a(i.top - l.box.top), maxHeight: _a(i.maxHeight) }), r();
}
function hi(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function nn(e, a, n = "start") {
  ra(() => {
    const r = a.current, l = e.current;
    if (!r || !l) return;
    const i = hi(r), s = () => kt(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), ra(() => {
    a.current && e.current && kt(a.current, e.current, n);
  });
}
const wi = "_root_axvxm_2", fi = "_trigger_axvxm_7", _i = "_value_axvxm_32", vi = "_menu_axvxm_50", bi = "_find_axvxm_72", pi = "_list_axvxm_88", gi = "_option_axvxm_99", yi = "_check_axvxm_118", Ni = "_empty_axvxm_129", fe = {
  root: wi,
  trigger: fi,
  value: _i,
  menu: vi,
  find: bi,
  list: pi,
  option: gi,
  check: yi,
  empty: Ni
}, ki = 7;
function $i(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function $t(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function Ci(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => $t(e.options, e.value)), d = (u) => {
    var m;
    Ut(() => r(!1)), u && ((m = a.current) == null || m.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: $i(e.options, l),
    findable: e.options.length > ki,
    show: () => {
      e.disabled || (i(""), c($t(e.options, e.value)), r(!0));
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
function Si(e, a) {
  const n = w(!1);
  return S(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function Ri(e) {
  const a = tn();
  return (n) => {
    const r = a(n), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function rn(e) {
  const a = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, a)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Ti(e) {
  return { ...rn(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function ln(e, a, n) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = a[r.key];
    if (!l) return n(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const xi = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Li(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      xi.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function Ai({ entry: e, at: a, menu: n, ids: r, value: l }) {
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
function nt(e, a) {
  const n = e.entries[e.active];
  return n ? a.option(n.index) : void 0;
}
function Ei({ menu: e, ids: a, focusRef: n }) {
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
      "aria-activedescendant": nt(e, a),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: ln(e, rn(e), () => {
      })
    }
  );
}
function Ii({ props: e, menu: a, ids: n, focusRef: r, trigger: l }) {
  const i = Ri(a), s = w(null);
  nn(l, s);
  const c = (d) => {
    an(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: fe.menu, children: [
    a.findable && /* @__PURE__ */ t(Ei, { menu: a, ids: n, focusRef: r }),
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
        "aria-activedescendant": a.findable ? void 0 : nt(a, n),
        onKeyDown: ln(a, Ti(a), c),
        children: a.entries.map((d, u) => /* @__PURE__ */ t(Ai, { entry: d, at: u, menu: a, ids: n, value: e.value }, d.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: fe.empty, children: "No match" })
  ] });
}
function Mi(e, a) {
  const n = e.open ? nt(e, a) : void 0;
  S(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function on(...e) {
  return e.filter(Boolean).join(" ");
}
function Bi(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function Pi({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
  const i = !e.options.some((s) => s.value === e.value);
  return /* @__PURE__ */ t(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: on(fe.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": a.open,
      "aria-controls": a.open ? n.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": Ia(e["aria-describedby"], n.value),
      "aria-invalid": e["aria-invalid"],
      disabled: e.disabled,
      ...Li(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: fe.value, "data-placeholder": i || void 0, children: Bi(e) })
    }
  );
}
function sn(e) {
  const a = N(), n = { list: `${a}-list`, value: `${a}-value`, option: (d) => `${a}-option-${d}` }, r = w(null), l = w(null), i = w(null), s = Ci(e, l), c = Si(s.open, i);
  return en(s.open, r, () => s.close(!1)), Mi(s, n), /* @__PURE__ */ o("div", { ref: r, className: on(fe.root, e.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(Pi, { props: e, menu: s, ids: n, trigger: l, wantFocus: c }),
    e.name && /* @__PURE__ */ t("input", { type: "hidden", name: e.name, value: e.value }),
    s.open && /* @__PURE__ */ t(Ii, { props: e, menu: s, ids: n, focusRef: i, trigger: l })
  ] });
}
const ji = "_field_djnju_2", Di = "_label_djnju_8", Hi = "_labelHidden_djnju_15", qi = "_control_djnju_25", Oi = "_mono_djnju_45", Fi = "_area_djnju_50", zi = "_invalid_djnju_57", Ae = {
  field: ji,
  label: Di,
  labelHidden: Hi,
  control: qi,
  mono: Oi,
  area: Fi,
  invalid: zi
}, Wi = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, cn = (e) => `${e}-label`;
function Ki({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? Wi : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function Gi({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t(
    sn,
    {
      id: a.id,
      triggerClassName: n,
      "aria-labelledby": cn(a.id),
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
function Ui({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const Vi = { input: Ki, select: Gi, textarea: Ui };
function Yi(e, a, n) {
  const r = Vi[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function Xi(e, a, n) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Ia(r ? n : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function Ji(e) {
  const a = e.mono ? [Ae.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [Ae.area] : [];
  return [Ae.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function Qi(e) {
  return e ? `${Ae.label} ${Ae.labelHidden} ward-field-label` : `${Ae.label} ward-field-label`;
}
function M(e) {
  const a = N(), n = `${a}-msg`, r = Xi(e, a, n), l = Ji(e);
  return /* @__PURE__ */ o("div", { className: `${Ae.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: cn(a), className: Qi(e.labelHidden), htmlFor: a, children: e.label }),
    Yi(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${Ae.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Zi = "_root_1gft5_2", es = "_trigger_1gft5_9", as = "_panel_1gft5_33", ts = "_menu_1gft5_52", ns = "_group_1gft5_57", rs = "_heading_1gft5_62", ls = "_item_1gft5_68", os = "_separator_1gft5_94", is = "_footer_1gft5_100", Ce = {
  root: Zi,
  trigger: es,
  panel: as,
  menu: ts,
  group: ns,
  heading: rs,
  item: ls,
  separator: os,
  footer: is
}, dn = Me(null);
function ss(e, a) {
  const [n, r] = p({ open: e, start: null, request: 0 });
  return {
    ...n,
    show: (l) => r((i) => ({ open: !0, start: l, request: i.request + 1 })),
    close: (l) => {
      var i;
      Ut(() => r((s) => ({ ...s, open: !1 }))), l && ((i = a.current) == null || i.focus());
    }
  };
}
const cs = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function ds(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const n = cs.get(a.key);
      n && (a.preventDefault(), e.show(n));
    },
    onKeyUp: (a) => {
      a.key === " " && a.preventDefault();
    }
  };
}
function us(...e) {
  return e.filter(Boolean).join(" ");
}
function XC(e) {
  const a = N(), n = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = w(null), l = w(null), i = ss(e.defaultOpen === !0, l);
  return en(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: us(Ce.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ref: l,
        id: n.buttonId,
        type: "button",
        className: Ce.trigger,
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...ds(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ t(dn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function ms(e) {
  let a = 0;
  const n = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function hs(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const un = (e, a) => (e % a + a) % a;
function Je(e, a, n) {
  for (let r = 1; r <= e.length; r++) {
    const l = un(a + n * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const ws = (e) => e.split("").every((a) => a === e[0]);
function fs(e, a, n) {
  const r = ws(n), l = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = un(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function _s(e) {
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
function vs(e, a) {
  const { items: n } = e, r = () => {
    var l;
    return (l = e.refs.current[e.current()]) == null ? void 0 : l.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(Je(n, e.current(), 1))],
    ["ArrowUp", () => e.focus(Je(n, e.current(), -1))],
    ["Home", () => e.focus(Je(n, -1, 1))],
    ["End", () => e.focus(Je(n, n.length, -1))],
    ["Escape", () => a.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function bs(e, a) {
  const n = w(!1), r = tn(), l = vs(e, a), i = (s) => {
    an(s) && e.focus(fs(e.items, e.current(), r(s.key)));
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
function ps(e, a) {
  const { start: n, request: r } = a, l = w(e);
  l.current = e, S(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? Je(i, -1, 1) : Je(i, i.length, -1));
  }, [n, r]);
}
function gs({ row: e, nav: a, popup: n }) {
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
function mn(e) {
  const { item: a, at: n } = e.row, r = {
    ref: (l) => {
      e.nav.refs.current[n] = l;
    },
    role: "menuitem",
    tabIndex: -1,
    className: Ce.item,
    "aria-disabled": a.disabled ? "true" : void 0,
    ...gs(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: O(a.href), ...r, children: a.label }) : /* @__PURE__ */ t("button", { type: "button", ...r, children: a.label });
}
function ys({ heading: e, rows: a, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: Ce.group, children: [
    /* @__PURE__ */ t("div", { id: l, className: Ce.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(mn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function Ns({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: Ce.separator }) : e.kind === "group" ? /* @__PURE__ */ t(ys, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(mn, { row: e.row, nav: a, popup: n });
}
function ks() {
  const e = Ie(dn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function JC({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = ks(), c = w(null);
  nn(s, c, n);
  const d = ms(e), u = _s(d.flatMap(hs).map((v) => v.item)), m = bs(u, r);
  return ps(u, r), /* @__PURE__ */ o("div", { ref: c, className: Ce.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: l, "aria-labelledby": i, className: Ce.menu, ...m, children: d.map((v, b) => /* @__PURE__ */ t(Ns, { block: v, nav: u, popup: r }, b)) }),
    a && /* @__PURE__ */ t("p", { className: Ce.footer, children: a })
  ] });
}
const $s = "_strip_1nfwi_2", Cs = "_tab_1nfwi_32", Ss = "_count_1nfwi_68", la = {
  strip: $s,
  tab: Cs,
  count: Ss
}, Na = 7;
function Rs(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
function hn(e) {
  return `${la.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function QC({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l = 1 }) {
  if (e.length > Na) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${Na} — the set is fixed`);
  const i = xa({ orientation: "horizontal" }), s = Rs(e, a);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = w(null);
  return ia(c, e.length), tt(c, s, '[role="tab"]'), /* @__PURE__ */ t(
    "div",
    {
      ref: c,
      className: hn(l),
      role: "tablist",
      "aria-label": r,
      "data-level": l,
      ...i.containerProps,
      children: e.map((d, u) => /* @__PURE__ */ o(
        "button",
        {
          id: `tab-${d.id}`,
          type: "button",
          role: "tab",
          className: `${la.tab} ward-tab`,
          "aria-selected": d.id === a,
          "aria-controls": `panel-${d.id}`,
          onClick: () => n(d.id),
          ...i.itemProps(u),
          children: [
            d.label,
            d.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
              " ",
              /* @__PURE__ */ t("span", { className: la.count, children: `· ${d.count}` })
            ] })
          ]
        },
        d.id
      ))
    }
  );
}
function ZC({ links: e, active: a, label: n, level: r = 1 }) {
  if (e.length > Na) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${Na} — the set is fixed`);
  const l = w(null);
  return ia(l, e.length), tt(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t("nav", { ref: l, className: hn(r), "aria-label": n, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${la.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: la.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const Ts = "_root_v56ff_3", xs = "_segment_v56ff_9", Ct = {
  root: Ts,
  segment: xs
};
function wn({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = xa({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === a));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ t("div", { className: `${Ct.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "radio",
      className: Ct.segment,
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
const Ls = "_sidebar_s9o1j_3", As = "_brand_s9o1j_9", Es = "_mark_s9o1j_17", Is = "_word_s9o1j_24", Ms = "_nav_s9o1j_30", Bs = "_navItem_s9o1j_39", Ps = "_footLink_s9o1j_49", js = "_group_s9o1j_58", Ds = "_groupName_s9o1j_65", Hs = "_agents_s9o1j_81", qs = "_agent_s9o1j_81", Os = "_root_s9o1j_96", Fs = "_agentTop_s9o1j_105", zs = "_dot_s9o1j_112", Ws = "_agentName_s9o1j_124", Ks = "_agentMeta_s9o1j_138", Gs = "_foot_s9o1j_49", Us = "_footName_s9o1j_150", Vs = "_footLinks_s9o1j_157", Ys = "_linkBrand_s9o1j_184", Xs = "_label_s9o1j_205", Js = "_note_s9o1j_210", Qs = "_footer_s9o1j_226", x = {
  sidebar: Ls,
  brand: As,
  mark: Es,
  word: Is,
  nav: Ms,
  navItem: Bs,
  new: "_new_s9o1j_48",
  footLink: Ps,
  group: js,
  groupName: Ds,
  agents: Hs,
  agent: qs,
  root: Os,
  agentTop: Fs,
  dot: zs,
  agentName: Ws,
  agentMeta: Ks,
  foot: Gs,
  footName: Us,
  footLinks: Vs,
  linkBrand: Ys,
  label: Xs,
  note: Js,
  footer: Qs
};
function Zs({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: x.agent,
      href: O(e.href),
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
function ec({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ t("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${x.footLink} ward-target`, href: O(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function ac({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: x.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: x.brand, children: [
      /* @__PURE__ */ t("span", { className: x.mark }),
      /* @__PURE__ */ t("span", { className: x.word, children: e })
    ] }),
    /* @__PURE__ */ t("div", { className: x.nav, children: a.map((s) => /* @__PURE__ */ t("a", { className: x.navItem, href: O(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: x.group, children: [
      /* @__PURE__ */ o("span", { className: x.groupName, children: [
        n,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ t("a", { className: x.new, href: O(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ t(Zs, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(ec, { shared: i })
  ] });
}
function tc(e) {
  return e.destinations ?? e.items ?? [];
}
function nc({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.linkBrand, children: e });
}
function rc({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.footer, children: e });
}
function lc({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: O(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: x.note, children: e.note })
  ] });
}
function oc(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(nc, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: tc(e).map((a) => /* @__PURE__ */ t(lc, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(rc, { children: e.children })
  ] });
}
function ic(e) {
  return "agents" in e;
}
function eS(e) {
  return ic(e) ? /* @__PURE__ */ t(ac, { ...e }) : /* @__PURE__ */ t(oc, { ...e });
}
const sc = "_mark_wlgi8_3", cc = {
  mark: sc
}, dc = { met: "✓", unmet: "", failed: "✕" };
function rt({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: cc.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: dc[e]
    }
  );
}
const uc = "_marker_br9fi_2", mc = {
  marker: uc
}, hc = {
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
}, wc = { running: " ward-running" };
function Be({ size: e, kind: a, label: n }) {
  const r = { "--marker": hc[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${mc.marker} ward-marker ward-marker--${a}${wc[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const fc = "_root_ti0pq_2", _c = "_chip_ti0pq_11", vc = "_noCase_ti0pq_23", ma = {
  root: fc,
  chip: _c,
  noCase: vc
};
function bc(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function lt({ connection: e, since: a, lastEventAt: n }) {
  const r = bc(a, n), l = at(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${ma.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(Be, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${ma.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ t("span", { className: ma.noCase, children: Za(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${ma.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    de(r)
  ] });
}
const pc = "_root_1cvxf_2", gc = "_context_1cvxf_12", yc = "_row_1cvxf_1", Nc = "_heading_1cvxf_25", kc = "_headingWrap_1cvxf_33", $c = "_chips_1cvxf_38", Cc = "_title_1cvxf_45", Sc = "_consequence_1cvxf_55", Rc = "_actionsWrap_1cvxf_62", Tc = "_actions_1cvxf_62", xc = "_action_1cvxf_62", Lc = "_overflowPanel_1cvxf_91", Ac = "_measureClip_1cvxf_102", Ec = "_measure_1cvxf_102", Y = {
  root: pc,
  context: gc,
  row: yc,
  heading: Nc,
  headingWrap: kc,
  chips: $c,
  title: Cc,
  consequence: Sc,
  actionsWrap: Rc,
  actions: Tc,
  action: xc,
  overflowPanel: Lc,
  measureClip: Ac,
  measure: Ec
};
function Ic({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(Ee, { as: "h1", className: Y.title, text: e }) : /* @__PURE__ */ t("h1", { className: Y.title, children: e });
}
function Mc({ title: e, consequence: a, consequenceHint: n, density: r }) {
  return /* @__PURE__ */ o("div", { className: Y.heading, children: [
    /* @__PURE__ */ t(Ic, { title: e, density: r }),
    a && /* @__PURE__ */ t("p", { className: Y.consequence, title: n, children: a })
  ] });
}
function Ua({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: Y.action, "data-action": "", children: a }, n));
}
function St({ disclosure: e }) {
  return /* @__PURE__ */ t(_, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Bc({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(St, { disclosure: l }) : a ? [/* @__PURE__ */ t(St, { disclosure: l }, "more"), /* @__PURE__ */ t(Ua, { actions: e }, "actions")] : /* @__PURE__ */ t(Ua, { actions: e });
}
function Pc(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function jc({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: Y.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ua, { actions: e }) });
}
function Dc(e, a) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function Hc({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Y.context, children: [
    /* @__PURE__ */ t(oi, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: Y.chips, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] });
}
function qc(...e) {
  return e.some((a) => a === null);
}
function Oc(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Fc(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + Oc(e);
}
function zc(e, a, n, r, l) {
  if (l === 0 || qc(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], d = Math.max(0, e.clientWidth - Fc(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Wc(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Kc(e) {
  return sr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Gc(e, a) {
  return a.length === 0 && e.length === 1 && Kc(e[0]);
}
function Uc(e, a) {
  const n = w(null), r = w(null), l = w(null), i = w(null), [s, c] = p(!1);
  return S(() => {
    const d = n.current;
    if (!Wc(d)) return;
    const u = () => c(zc(d, r.current, l.current, i.current, e.length)), m = new ResizeObserver(u);
    return m.observe(d), i.current && m.observe(i.current), u(), () => m.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function Vc({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: Y.measureClip, children: /* @__PURE__ */ o("div", { className: Y.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function Yc({ connection: e }) {
  return e ? /* @__PURE__ */ t(lt, { connection: e.connection, since: e.since }) : null;
}
function aS({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: m, headingRef: v, actionsRef: b, measureRef: y, collapsed: E } = Uc(i, Gc(i, s)), B = s.length > 0, { disclosure: oe, close: Re } = Dc(E || B, b), te = Pc(s, i, E, d);
  return /* @__PURE__ */ o("header", { className: Y.root, "data-density": u, children: [
    /* @__PURE__ */ t(Hc, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Y.row, ref: m, children: [
      /* @__PURE__ */ t("div", { ref: v, className: Y.headingWrap, children: /* @__PURE__ */ t(Mc, { title: n, consequence: r, consequenceHint: l, density: u }) }),
      /* @__PURE__ */ o("div", { className: Y.actionsWrap, children: [
        /* @__PURE__ */ t(Yc, { connection: c }),
        /* @__PURE__ */ t("div", { className: Y.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ t(Bc, { actions: i, hasMore: B, collapsed: E, onOverflow: d, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ t(jc, { actions: te, disclosure: oe, onEscape: Re }),
    /* @__PURE__ */ t(Vc, { actions: i, hasMore: B, measureRef: y })
  ] });
}
const Xc = "_root_td96x_2", Jc = "_body_td96x_16", Rt = {
  root: Xc,
  body: Jc
};
function tS({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${Rt.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: Rt.body, children: n }) });
}
const Qc = "_root_bf1pc_2", Zc = "_table_bf1pc_9", ed = "_caption_bf1pc_14", ad = "_series_bf1pc_23", td = "_category_bf1pc_31", nd = "_cell_bf1pc_39", rd = "_track_bf1pc_45", ld = "_lane_bf1pc_52", od = "_bar_bf1pc_56", id = "_value_bf1pc_63", sd = "_swatch_bf1pc_70", cd = "_empty_bf1pc_78", X = {
  root: Qc,
  table: Zc,
  caption: ed,
  series: ad,
  category: td,
  cell: nd,
  track: rd,
  lane: ld,
  bar: od,
  value: id,
  swatch: sd,
  empty: cd
}, dd = "—", Tt = 6;
function ud(e, a) {
  if (a.length < 1 || a.length > Tt)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${Tt}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function md(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function fn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function hd(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function wd({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = hd(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: X.cell, children: /* @__PURE__ */ o("span", { className: X.track, children: [
    /* @__PURE__ */ t("span", { className: X.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${X.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: X.value, children: e === null ? l : r(e) })
  ] }) });
}
function fd({ series: e }) {
  return /* @__PURE__ */ t(T, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: X.swatch, "data-step": fn(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function _d({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: X.caption, children: e }),
    /* @__PURE__ */ t("p", { className: X.empty, children: a })
  ] });
}
function vd({ title: e, categories: a, series: n, top: r, format: l = ae, categoryHead: i = "Category", missing: s = dd }) {
  return /* @__PURE__ */ t("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: X.table, children: [
    /* @__PURE__ */ t("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: X.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(fd, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: X.category, children: c }),
      n.map((u, m) => /* @__PURE__ */ t(wd, { value: u.values[d], top: r, step: fn(m, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function nS(e) {
  ud(e.categories, e.series);
  const a = md(e.series);
  return a === 0 ? /* @__PURE__ */ t(_d, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(vd, { ...e, top: a });
}
const bd = "_root_1bfqw_2", pd = "_figure_1bfqw_7", gd = "_of_1bfqw_13", yd = "_bar_1bfqw_18", Nd = "_rows_1bfqw_38", kd = "_row_1bfqw_38", $d = "_label_1bfqw_49", Cd = "_amount_1bfqw_54", Te = {
  root: bd,
  figure: pd,
  of: gd,
  bar: yd,
  rows: Nd,
  row: kd,
  label: $d,
  amount: Cd
};
function Sd({ spent: e, ceiling: a, breakdown: n }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Te.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Te.figure} ward-stat-value`, children: [
      re(e),
      " ",
      /* @__PURE__ */ o("span", { className: Te.of, children: [
        "of ",
        re(a)
      ] })
    ] }),
    /* @__PURE__ */ t(
      "meter",
      {
        className: `${Te.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${re(e)} of ${re(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    n && /* @__PURE__ */ t("ul", { className: Te.rows, children: n.map((l) => /* @__PURE__ */ o("li", { className: `${Te.row} ward-costrow`, children: [
      /* @__PURE__ */ t("span", { className: Te.label, children: l.label }),
      /* @__PURE__ */ t("span", { className: Te.amount, children: re(l.amount) })
    ] }, l.label)) })
  ] });
}
const Rd = "_frame_9xel2_2", Td = "_table_9xel2_6", xd = "_th_9xel2_12", Ld = "_td_9xel2_13", Ad = "_sort_9xel2_48", Ed = "_row_9xel2_60", Id = "_empty_9xel2_68", Le = {
  frame: Rd,
  table: Td,
  th: xd,
  td: Ld,
  sort: Ad,
  row: Ed,
  empty: Id
}, Md = { asc: "ascending", desc: "descending" };
function Bd(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return Md[a.direction];
}
function Pd(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: Le.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function jd(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Dd({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Le.th,
      style: jd(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Bd(e, a),
      children: Pd(e, n)
    }
  );
}
function Hd({ row: e, props: a }) {
  const n = a.rowId(e), r = (a.lockedIds ?? []).includes(n);
  return /* @__PURE__ */ t(
    "tr",
    {
      className: Le.row,
      "data-selected": n === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ t("td", { className: Le.td, "data-align": l.align, "data-mono": l.mono, "data-drop": l.dropPriority, children: a.renderCell(e, l.key) }, l.key))
    }
  );
}
function qd({
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
  return n.length === 0 ? /* @__PURE__ */ t("div", { className: Le.empty, children: u }) : /* @__PURE__ */ t("div", { className: Le.frame, children: /* @__PURE__ */ o("table", { className: Le.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Le.head, children: a.map((m) => /* @__PURE__ */ t(Dd, { column: m, sort: c, onSort: d }, m.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((m) => /* @__PURE__ */ t(Hd, { row: m, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(m))) })
  ] }) });
}
const Od = "_list_v0s52_2", Fd = {
  list: Od
};
function rS({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: Fd.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const zd = "_label_1u62a_2", Wd = {
  label: zd
};
function lS({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: Wd.label, children: a.header }) }, a.key)) }) });
}
const Kd = "_stack_bp6a0_2", Gd = {
  stack: Kd
};
function oS({ children: e }) {
  return /* @__PURE__ */ t("span", { className: Gd.stack, "data-ward-action-stack": "", children: e });
}
const Ud = "_set_1z0sq_2", Vd = "_legend_1z0sq_7", Yd = "_row_1z0sq_15", Xd = "_control_1z0sq_20", Jd = "_input_1z0sq_26", Qd = "_label_1z0sq_31", Zd = "_consequence_1z0sq_36", De = {
  set: Ud,
  legend: Vd,
  row: Yd,
  control: Xd,
  input: Jd,
  label: Qd,
  consequence: Zd
};
function _n({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = N(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: De.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: De.legend, children: e }),
    a.map((m) => {
      const v = `${u}-${m.value}`, b = m.consequence ? `${v}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: De.row, children: [
        /* @__PURE__ */ o("span", { className: De.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: v,
              type: "radio",
              name: u,
              className: De.input,
              value: m.value,
              checked: n === m.value,
              disabled: l,
              "aria-describedby": Ia(b, s),
              onChange: () => !l && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: v, className: De.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ t("p", { id: b, className: `${De.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const eu = "_root_s12pg_2", au = "_head_s12pg_11", tu = "_note_s12pg_30", nu = "_index_s12pg_35", ru = "_dot_s12pg_39", lu = "_counter_s12pg_50", ou = "_trailing_s12pg_58", qe = {
  root: eu,
  head: au,
  note: tu,
  index: nu,
  dot: ru,
  counter: lu,
  trailing: ou
};
function iu({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${qe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: qe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function su({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: qe.counter, "aria-hidden": "true", children: e }) : null;
}
function xt({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${qe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: qe.head, children: [
      /* @__PURE__ */ t(iu, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: qe.note, children: n }),
    /* @__PURE__ */ t(su, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: qe.trailing, children: i })
  ] });
}
const cu = "_strip_ww53x_2", du = "_cell_ww53x_7", uu = "_value_ww53x_12", mu = "_link_ww53x_29", hu = "_label_ww53x_49", ze = {
  strip: cu,
  cell: du,
  value: uu,
  link: mu,
  label: hu
};
function wu(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const vn = (e) => `${ze.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function fu({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: ze.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: vn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${ze.label} ward-stat-label`, children: e.label })
  ] });
}
function _u({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: ze.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: vn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${ze.link} ward-stat-link`, href: O(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${ze.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Ba({ cells: e, divided: a = !1 }) {
  return wu(e), /* @__PURE__ */ t("dl", { className: `${ze.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(fu, { cell: n }, n.label) : /* @__PURE__ */ t(_u, { cell: n, href: n.href }, n.label)) });
}
const vu = "_root_1eb1u_2", bu = "_track_1eb1u_8", pu = "_thumb_1eb1u_46", gu = "_labelHidden_1eb1u_64", yu = "_label_1eb1u_64", Nu = "_lockedNote_1eb1u_84", Oe = {
  root: vu,
  track: bu,
  thumb: pu,
  labelHidden: gu,
  label: yu,
  lockedNote: Nu
};
function ku(e) {
  return e ? `${Oe.label} ${Oe.labelHidden}` : Oe.label;
}
function We({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = l ? !0 : a, m = r || l;
  return /* @__PURE__ */ o("span", { className: `${Oe.root} ward-switchrow`, children: [
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
        className: `${Oe.track} ward-switch`,
        "data-on": u,
        "data-locked": l ? !0 : void 0,
        disabled: m,
        onClick: () => !m && (n == null ? void 0 : n(!u)),
        children: /* @__PURE__ */ t("span", { className: Oe.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: ku(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: Oe.lockedNote, children: "always on" })
    ] })
  ] });
}
const $u = "_bar_1vp69_2", Cu = "_skip_1vp69_11", Su = "_mark_1vp69_22", Ru = "_nav_1vp69_30", Tu = "_list_1vp69_34", xu = "_select_1vp69_41", Lu = "_selectTrigger_1vp69_45", Au = "_dest_1vp69_52", Eu = "_actor_1vp69_71", Iu = "_actorMark_1vp69_84", Mu = "_actorLabel_1vp69_89", Bu = "_tagline_1vp69_108", ie = {
  bar: $u,
  skip: Cu,
  mark: Su,
  nav: Ru,
  list: Tu,
  select: xu,
  selectTrigger: Lu,
  dest: Au,
  actor: Eu,
  actorMark: Iu,
  actorLabel: Mu,
  tagline: Bu
};
function Pu(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function ju(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function iS({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = ju(r);
  return /* @__PURE__ */ o("header", { className: ie.bar, children: [
    /* @__PURE__ */ t("a", { className: `${ie.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ t("span", { className: ie.mark, children: e }),
    l && /* @__PURE__ */ t("span", { className: ie.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: ie.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ t("ul", { className: ie.list, children: a.map((d) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "a",
        {
          className: `${ie.dest} ward-target`,
          href: O(d.href),
          "aria-current": d.id === n ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ t(
        sn,
        {
          className: ie.select,
          triggerClassName: ie.selectTrigger,
          "aria-label": "Destination",
          value: n,
          options: a.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => i == null ? void 0 : i(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ o("span", { className: ie.actor, children: [
      /* @__PURE__ */ t("span", { className: ie.actorLabel, children: c }),
      /* @__PURE__ */ t("span", { className: ie.actorMark, "aria-hidden": "true", children: Pu(c) })
    ] })
  ] });
}
const Du = "_tree_zzoob_2", Hu = "_item_zzoob_6", qu = "_row_zzoob_10", Ou = "_button_zzoob_22", ka = {
  tree: Du,
  item: Hu,
  row: qu,
  button: Ou
}, bn = Me(null);
function Fu({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = xa({ orientation: "vertical" });
  return /* @__PURE__ */ t(bn.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: ka.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const zu = { ArrowRight: !0, ArrowLeft: !1 };
function Lt(e) {
  return e ? !0 : void 0;
}
function Wu(e, a) {
  const n = zu[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function Ku(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function Gu(e) {
  const a = [ka.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Uu(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Vu(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Yu(e) {
  return typeof e == "string" ? e : void 0;
}
function Xu({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Ju({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function pn(e) {
  const a = Ie(bn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = Uu(e);
  return /* @__PURE__ */ o("li", { className: ka.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: Gu(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": n,
        "data-depth": e.depth,
        "data-unresolved": Lt(e.unresolved),
        "data-inherited": Lt(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${ka.button} ward-treeitem-btn`,
            onClick: () => Ku(e),
            onKeyDown: (r) => Wu(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Vu(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: Yu(e.label), children: e.label }),
              /* @__PURE__ */ t(Xu, { value: e.detail }),
              /* @__PURE__ */ t(Ju, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const Qu = "_frame_dhc53_2", Zu = "_subjectRail_dhc53_22", em = "_subject_dhc53_22", am = "_rail_dhc53_42", tm = "_record_dhc53_66", nm = "_recordBody_dhc53_71", rm = "_stageGrid_dhc53_120", lm = "_band_dhc53_146", om = "_bandBody_dhc53_155", im = "_bandActions_dhc53_160", sm = "_scroller_dhc53_168", cm = "_board_dhc53_194", dm = "_laneCount_dhc53_202", um = "_lanes_dhc53_212", J = {
  frame: Qu,
  subjectRail: Zu,
  subject: em,
  rail: am,
  record: tm,
  recordBody: nm,
  stageGrid: rm,
  band: lm,
  bandBody: om,
  bandActions: im,
  scroller: sm,
  board: cm,
  laneCount: dm,
  lanes: um
};
function sS({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: J.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function At(e) {
  return e ? "true" : void 0;
}
function cS({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: J.subjectRail, "data-ward-subject-rail": n, "data-ruled": At(i), children: [
    /* @__PURE__ */ t("div", { className: J.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: J.rail, "data-sticky": At(l), "aria-label": r, children: a })
  ] });
}
function dS({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: J.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(xt, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: J.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(xt, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: J.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const mm = "_form_1j8ub_2", hm = "_fields_1j8ub_9", wm = "_actions_1j8ub_19", qa = {
  form: mm,
  fields: hm,
  actions: wm
};
function uS({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: qa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: qa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: qa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function mS({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: J.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: J.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: J.bandActions, children: a })
  ] });
}
const fm = "(max-width: 767.98px)";
function ot({ label: e, children: a, laneCount: n, onOverflow: r }) {
  const l = w(null);
  ia(l, n ?? cr.count(a), r);
  const i = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t("div", { ref: l, className: J.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function _m({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: J.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(ot, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function vm({ lanes: e, label: a }) {
  const [n, r] = p(!1);
  return /* @__PURE__ */ o("div", { className: J.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: J.laneCount, "data-ward-board-lane-count": "", hidden: !n, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ t(ot, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ t(dr, { children: l.content }, l.id)) })
  ] });
}
function hS({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = Ea(fm);
  return n === void 0 ? /* @__PURE__ */ t(ot, { label: a, children: e }) : l ? /* @__PURE__ */ t(_m, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(vm, { lanes: n, label: a });
}
function wS({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = w(null), i = Math.max(e, 1);
  ia(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ t("div", { ref: l, className: J.stageGrid, role: "region", "aria-label": n, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const bm = "_block_vmwmz_2", pm = "_sentence_vmwmz_15", gm = "_meta_vmwmz_20", ym = "_action_vmwmz_25", Nm = "_strip_vmwmz_29", km = "_loading_vmwmz_48", $m = "_label_vmwmz_56", Cm = "_counter_vmwmz_63", _e = {
  block: bm,
  sentence: pm,
  meta: gm,
  action: ym,
  strip: Nm,
  loading: km,
  label: $m,
  counter: Cm
};
function Sm({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: _e.action, children: /* @__PURE__ */ t(_, { onClick: e.onClick, children: e.label }) });
}
function Pa({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: _e.sentence, children: e }),
    n,
    /* @__PURE__ */ t(Sm, { action: a })
  ] });
}
function Rm(e) {
  return /* @__PURE__ */ t(Pa, { ...e, kind: "ward-emptystate" });
}
function fS({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(Pa, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function _S(e) {
  return /* @__PURE__ */ t(Pa, { ...e });
}
function vS({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(Pa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function bS({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function pS({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function gS({ label: e, startedAt: a }) {
  const n = w(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  S(() => {
    const s = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = at(n.current, r);
  return /* @__PURE__ */ o("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ t("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ t("span", { className: _e.counter, children: Za(i) }) : null
  ] });
}
const Tm = "_note_cigdt_2", xm = {
  note: Tm
};
function Lm({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: xm.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const Am = "_card_11u1w_3", Em = "_hit_11u1w_31", Im = "_head_11u1w_44", Mm = "_title_11u1w_51", Bm = "_meta_11u1w_56", Pm = "_fields_11u1w_57", jm = "_who_11u1w_70", Dm = "_sep_11u1w_74", Hm = "_mono_11u1w_78", qm = "_field_11u1w_57", Om = "_last_11u1w_94", Fm = "_reason_11u1w_106", Z = {
  card: Am,
  hit: Em,
  head: Im,
  title: Mm,
  meta: Bm,
  fields: Pm,
  who: jm,
  sep: Dm,
  mono: Hm,
  field: qm,
  last: Om,
  reason: Fm
}, zm = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Wm(e, a, n) {
  const r = fa(e, "blue"), l = fa(e, "orange"), i = fa(e, "green"), s = w(/* @__PURE__ */ new Set());
  S(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = zm[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, l]);
}
const Km = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Gm(e, a) {
  return Km[a](e);
}
function Um({ item: e, connection: a }) {
  const n = /* @__PURE__ */ t("span", { className: Z.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: Z.meta, children: [
    /* @__PURE__ */ t(Ee, { className: Z.who, text: `waits on ${e.run.agent}` }),
    n,
    /* @__PURE__ */ t(Se, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: Z.meta, children: [
    /* @__PURE__ */ t(Ee, { className: Z.who, text: `waits on ${e.waitsOn}` }),
    n,
    /* @__PURE__ */ o("span", { className: Z.mono, children: [
      ce(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Vm({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: Z.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function Ym({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: Z.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Xm({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: Z.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: Z.field, children: Gm(e, n) }, n)) });
}
const Va = (e) => e ? !0 : void 0;
function Jm(e) {
  return { "--stream": ve(e.streamStep, "id") };
}
function Qm(e, a, n) {
  e == null || e(a, n);
}
function Zm(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function eh({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: Z.last, "data-stale": Va(a), children: n }) : null;
}
function ja(e) {
  const a = e.fields ?? [], n = e.item, r = w(null);
  Wm(r, n.key, e.feed);
  const l = Zm(e.feed), i = Jm(n);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": n.key,
      className: Z.card,
      style: i,
      "data-selected": Va(e.selected),
      "data-flagged": Va(n.flagged),
      children: [
        /* @__PURE__ */ t("button", { type: "button", className: Z.hit, onClick: (s) => Qm(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(Vm, { item: n }),
        /* @__PURE__ */ t(Ee, { as: "p", className: Z.title, text: n.title }),
        /* @__PURE__ */ t(Um, { item: n, connection: l }),
        /* @__PURE__ */ t(Ym, { reason: n.blockedReason }),
        /* @__PURE__ */ t(Xm, { item: n, fields: a }),
        /* @__PURE__ */ t(eh, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const ah = "_column_1j8bi_3", th = "_head_1j8bi_21", nh = "_label_1j8bi_30", rh = "_count_1j8bi_39", lh = "_list_1j8bi_53", ta = {
  column: ah,
  head: th,
  label: nh,
  count: rh,
  list: lh
};
function gn(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function oh({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: ta.head, children: [
    /* @__PURE__ */ t("h2", { className: ta.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: ta.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function ih(e) {
  return /* @__PURE__ */ t("div", { className: ta.list, role: "list", children: e.rows.map((a, n) => {
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
function sh({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), m = e.cap !== void 0 && a.length > e.cap, v = gn(a, r);
  return /* @__PURE__ */ o("section", { className: ta.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(oh, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(ih, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: v }),
    m && /* @__PURE__ */ t(Lm, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const ch = "_foot_cs4jr_2", dh = "_note_cs4jr_13", uh = "_link_cs4jr_19", Oa = {
  foot: ch,
  note: dh,
  link: uh
};
function yS({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Oa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: Oa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${Oa.link} ward-target`, href: O(e), children: "Configure board" })
  ] });
}
const mh = "_head_1tfi5_3", hh = "_identity_1tfi5_12", wh = "_titleRow_1tfi5_18", fh = "_title_1tfi5_18", _h = "_key_1tfi5_35", vh = "_rollup_1tfi5_45", bh = "_tools_1tfi5_53", ph = "_swatch_1tfi5_101", gh = "_mark_1tfi5_108", ye = {
  head: mh,
  identity: hh,
  titleRow: wh,
  title: fh,
  key: _h,
  rollup: vh,
  tools: bh,
  swatch: ph,
  mark: gh
}, Et = "initials:";
function yh(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Nh(e) {
  const a = [yh(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function kh(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Nh(e)
  ] });
}
function $h(e) {
  return e.startsWith(Et) ? e.slice(Et.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function Ch({ markRef: e, streamStep: a }) {
  const n = { "--stream": ve(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ye.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: $h(e) }) : /* @__PURE__ */ t("span", { className: ye.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Sh({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function NS({
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
  return /* @__PURE__ */ o("div", { className: ye.head, children: [
    /* @__PURE__ */ o("div", { className: ye.identity, children: [
      /* @__PURE__ */ o("div", { className: ye.titleRow, children: [
        /* @__PURE__ */ t(Ch, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ye.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ye.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ye.rollup, "aria-live": "polite", children: kh(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ye.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(Sh, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(_, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(lt, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const Rh = "_head_1sejb_14", Th = "_line_1sejb_15", xh = "_cHandle_1sejb_36", Lh = "_cName_1sejb_41", Ah = "_nameLine_1sejb_49", Eh = "_cLabel_1sejb_56", Ih = "_cCap_1sejb_61", Mh = "_cShown_1sejb_66", Bh = "_name_1sejb_49", Ph = "_noCap_1sejb_88", jh = "_state_1sejb_102", Dh = "_handle_1sejb_111", Hh = "_sub_1sejb_137", j = {
  head: Rh,
  line: Th,
  cHandle: xh,
  cName: Lh,
  nameLine: Ah,
  cLabel: Eh,
  cCap: Ih,
  cShown: Mh,
  name: Bh,
  noCap: Ph,
  state: jh,
  handle: Dh,
  sub: Hh
}, qh = "can't be hidden or collapsed", Oh = "terminal · counted, not a column";
function kS() {
  return /* @__PURE__ */ o("div", { className: j.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: j.cHandle }),
    /* @__PURE__ */ t("span", { className: j.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: j.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: j.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: j.cShown, children: "Shown" })
  ] });
}
function Fh(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function zh(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function It(e) {
  return e.gate ? qh : e.terminal ? Oh : zh(e.agentsMounted);
}
function Wh(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Kh({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: j.cName, children: [
    /* @__PURE__ */ o("span", { className: j.nameLine, children: [
      /* @__PURE__ */ t("span", { className: j.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    It(e) && /* @__PURE__ */ t("span", { className: j.sub, children: It(e) })
  ] });
}
function Gh(e) {
  return e === void 0 ? "" : String(e);
}
function Uh(e) {
  return e === "" ? void 0 : Number(e);
}
function Vh({ name: e, onReorder: a }) {
  return /* @__PURE__ */ t("span", { className: j.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: j.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (n) => Wh(n, a),
      children: "⠿"
    }
  ) });
}
function Yh({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${j.cCap} ${j.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: j.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Gh(a.cap), onChange: (r) => n({ ...a, cap: Uh(r) }) }) });
}
function Xh({ stage: e, config: a, onChange: n }) {
  const r = Fh(e, a.shown), l = e.gate || e.terminal, i = (s) => n({ ...a, shown: s });
  return /* @__PURE__ */ o("span", { className: j.cShown, children: [
    /* @__PURE__ */ t(We, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ t("span", { className: j.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function Jh(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function $S({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: j.line, "data-kind": Jh(e), children: [
    /* @__PURE__ */ t(Vh, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(Kh, { stage: e }),
    /* @__PURE__ */ t("span", { className: j.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(Yh, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(Xh, { stage: e, config: a, onChange: n })
  ] });
}
const Qh = "_body_1a4f4_2", Zh = "_head_1a4f4_9", ew = "_summary_1a4f4_19", aw = "_block_1a4f4_20", tw = "_actionsBlock_1a4f4_21", nw = "_title_1a4f4_41", rw = "_note_1a4f4_46", lw = "_k_1a4f4_51", ow = "_kv_1a4f4_58", iw = "_row_1a4f4_64", sw = "_label_1a4f4_75", cw = "_value_1a4f4_84", dw = "_quote_1a4f4_90", uw = "_actions_1a4f4_21", mw = "_resolve_1a4f4_103", D = {
  body: Qh,
  head: Zh,
  summary: ew,
  block: aw,
  actionsBlock: tw,
  title: nw,
  note: rw,
  k: lw,
  kv: ow,
  row: iw,
  label: sw,
  value: cw,
  quote: dw,
  actions: uw,
  resolve: mw
};
function hw(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function ww(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(Se, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function fw(e) {
  const a = ca(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function _w(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...Ma(fw(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...hw(e),
    ...ww(e, a)
  ];
}
function vw({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: D.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: D.k, children: a }),
    e
  ] });
}
function bw({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: D.head, children: [
    /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function pw({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: D.block, children: [
    /* @__PURE__ */ t("p", { className: D.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: D.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: D.note, children: e.agentMeta })
  ] }) : null;
}
function CS({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const d = N(), u = _w(e, l);
  return /* @__PURE__ */ t(ea, { kind: "drawer", labelledBy: d, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: D.body, children: [
    /* @__PURE__ */ t(bw, { item: e }),
    /* @__PURE__ */ o("div", { className: D.summary, children: [
      /* @__PURE__ */ t("h2", { className: D.title, id: d, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: D.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: D.kv, children: u.map(([m, v]) => /* @__PURE__ */ o("div", { className: D.row, children: [
      /* @__PURE__ */ t("dt", { className: D.label, children: m }),
      /* @__PURE__ */ t("dd", { className: D.value, children: v })
    ] }, m)) }),
    /* @__PURE__ */ t(pw, { item: e }),
    /* @__PURE__ */ o("div", { className: D.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: D.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: D.note, children: c })
    ] }),
    /* @__PURE__ */ t(vw, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const gw = "_root_3azmy_2", yw = "_list_3azmy_7", Nw = "_item_3azmy_12", kw = "_box_3azmy_18", $w = "_text_3azmy_23", Cw = "_note_3azmy_28", Ue = {
  root: gw,
  list: yw,
  item: Nw,
  box: kw,
  text: $w,
  note: Cw
};
function Da({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ue.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${Ue.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ue.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ue.box, children: /* @__PURE__ */ t(rt, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ue.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${Ue.note} ward-checklist-note`, children: a })
  ] });
}
const Sw = "_rail_znbbp_2", Rw = "_k_znbbp_11", Tw = "_head_znbbp_19", xw = "_section_znbbp_25", Lw = "_card_znbbp_39", Aw = "_strip_znbbp_46", Ew = "_skeleton_znbbp_60", Iw = "_skeletonLabel_znbbp_74", Mw = "_bar_znbbp_80", Bw = "_note_znbbp_89", me = {
  rail: Sw,
  k: Rw,
  head: Tw,
  section: xw,
  card: Lw,
  strip: Aw,
  skeleton: Ew,
  skeletonLabel: Iw,
  bar: Mw,
  note: Bw
};
function Pw(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Fa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function jw({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function Dw({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(sh, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function Hw(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(Dw, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(jw, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function SS(e) {
  const a = Pw(e.onOpen), n = gn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(Fa, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(ja, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Fa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(Hw, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(Fa, { title: "Effect of this config", children: /* @__PURE__ */ t(Da, { items: e.effects, density: "compact" }) })
  ] });
}
function qw(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function Ow(e) {
  return Math.ceil(e.length / 2);
}
function Fw(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function yn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function zw(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = yn(e);
  l !== void 0 && n(l), r(Fw(e.type));
}
function Ww(e, a, n, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => zw(i, n, r, l));
  }, [e, a, n, r, l]);
}
function Kw(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Gw(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Uw(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Vw(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(Ow(a ?? [])) + ")"
  };
}
function Yw(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Xw(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: re(e.cost) }) : null;
}
function Jw(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function Qw(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(Se, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function Zw(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function ef(e, a) {
  return a === void 0 ? e : qw(e, a.ref);
}
function af(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function oa(e) {
  return e === !0 ? "true" : void 0;
}
function Nn(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = w(null), i = fa(l), s = w(/* @__PURE__ */ new Set()), [c, d] = p(Kw(a));
  Ww(e.feed, a.key, s, d, i);
  const u = Gw(a, r), m = Uw(a, n), v = Vw(a, e.fields), b = Zw(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...af(e),
      className: "ward-workcard",
      "data-flagged": oa(a.flagged),
      "data-selected": oa(e.selected),
      style: v,
      ref: ef(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Yw(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: u.role, label: u.label }),
          Xw(a, e.fields),
          Jw(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Qw(n, c, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function tf({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function nf(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function rf(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function lf(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(tf, { count: e.items.length, cap: e.column.cap });
}
function of(e, a) {
  return e.roving ?? a;
}
function sf(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function cf(e, a) {
  return e.items.map((n, r) => /* @__PURE__ */ t(
    Nn,
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
function df(e) {
  const a = N(), n = xa({ orientation: "vertical" }), r = of(e, n), l = nf(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": oa(l), "data-gate": oa(e.column.gate), children: [
    rf(e.column, e.items.length, a),
    lf(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...sf(e, n), children: cf(e, r) })
  ] });
}
function uf(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function mf(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function hf(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function RS(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: uf(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      mf(e),
      hf(e.onConfigure),
      /* @__PURE__ */ t(lt, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function wf(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function ff(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(We, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(We, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function _f(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function TS(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": oa(wf(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: ff(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(Zt, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    _f(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function xS(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(Nn, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(df, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function vf(e, a) {
  const n = yn(e);
  n !== void 0 && a(n);
}
function bf(e, a, n) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => vf(r, n));
  }, [e, a, n]);
}
function pf(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function gf(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function yf(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(Se, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Nf(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function LS(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  bf(e.feed, a.key, l);
  const i = [...pf(a), ...gf(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      yf(n, r)
    ] }),
    Nf(a, e.actions)
  ] });
}
const kf = "_card_54446_3", $f = "_head_54446_30", Cf = "_mark_54446_38", Sf = "_name_54446_50", Rf = "_chips_54446_71", Tf = "_description_54446_77", xf = "_run_54446_82", Lf = "_sep_54446_91", Af = "_facts_54446_96", Ef = "_fact_54446_96", If = "_factLabel_54446_109", Mf = "_factValue_54446_113", le = {
  card: kf,
  head: $f,
  mark: Cf,
  name: Sf,
  chips: Rf,
  description: Tf,
  run: xf,
  sep: Lf,
  facts: Af,
  fact: Ef,
  factLabel: If,
  factValue: Mf
}, Bf = { live: "done", draft: "running", paused: "meta" };
function Pf(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function jf({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: Bf[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function Df({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: le.description, children: e });
}
function Hf({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(Se, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function qf({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ t("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function Of(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Ff({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": ve(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: Pf(s),
      style: c,
      "data-selected": d,
      "data-paused": Of(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ t("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${le.name} ward-rowlink ward-target`, href: O(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(Df, { description: e.description }),
        /* @__PURE__ */ t(Hf, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(jf, { versions: e.versions }),
        /* @__PURE__ */ t(qf, { facts: i })
      ]
    }
  );
}
const zf = "_list_4dcyc_2", Wf = "_row_4dcyc_11", Kf = "_head_4dcyc_23", Gf = "_id_4dcyc_30", Uf = "_lock_4dcyc_35", Vf = "_reason_4dcyc_41", Yf = "_remove_4dcyc_46", Xf = "_clauses_4dcyc_50", Jf = "_clause_4dcyc_50", Qf = "_label_4dcyc_64", Zf = "_cell_4dcyc_71", e_ = "_value_4dcyc_76", se = {
  list: zf,
  row: Wf,
  head: Kf,
  id: Gf,
  lock: Uf,
  reason: Vf,
  remove: Yf,
  clauses: Xf,
  clause: Jf,
  label: Qf,
  cell: Zf,
  value: e_
}, kn = Me(!1);
function AS({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(kn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: se.list, "aria-label": a, children: e }) });
}
function a_({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: se.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function t_({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: se.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: se.reason, children: e })
  ] });
}
function n_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: se.head, children: [
    /* @__PURE__ */ t("span", { className: se.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(t_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: se.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Mt(e, a) {
  return e.locked ? void 0 : a;
}
function ES({ rule: e, onChange: a, onRemove: n }) {
  if (!Ie(kn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Mt(e, a);
  return /* @__PURE__ */ o("li", { className: se.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(n_, { rule: e, onRemove: Mt(e, n) }),
    /* @__PURE__ */ t("dl", { className: se.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: se.clause, children: [
      /* @__PURE__ */ t("dt", { className: se.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: se.cell, children: /* @__PURE__ */ t(a_, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const r_ = "_ladder_n8eeo_2", l_ = "_cell_n8eeo_7", o_ = "_empty_n8eeo_26", i_ = "_name_n8eeo_34", s_ = "_holder_n8eeo_40", c_ = "_request_n8eeo_46", d_ = "_swatches_n8eeo_51", u_ = "_swatch_n8eeo_51", m_ = "_tilesFrame_n8eeo_78", h_ = "_tiles_n8eeo_78", w_ = "_tile_n8eeo_78", f_ = "_bar_n8eeo_117", __ = "_hex_n8eeo_128", v_ = "_note_n8eeo_138", A = {
  ladder: r_,
  cell: l_,
  empty: o_,
  name: i_,
  holder: s_,
  request: c_,
  swatches: d_,
  swatch: u_,
  tilesFrame: m_,
  tiles: h_,
  tile: w_,
  bar: f_,
  hex: __,
  note: v_
}, IS = "not validated yet, pending a CVD matrix and dark stepping";
function b_(e) {
  return e.reserved ? "reserved" : Aa(e.step) ? "validated" : "partial";
}
function $n(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function p_(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function g_({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(Be, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function y_(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function N_(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Bt = (e) => String(e).padStart(2, "0");
function k_(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? $n(e, void 0);
}
function $_({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.hex} ward-ladder-hex`, children: r ? `step ${Bt(e)}` : Tr(e) }),
    /* @__PURE__ */ t("span", { className: `${A.note} ward-ladder-note`, children: r ? n : `Step ${Bt(e)} · ${n}` })
  ] });
}
function C_({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = b_(e), c = $n(s, n), d = c !== "free", u = d || i, m = a === e.step, v = e.name ?? `Step ${e.step}`, b = () => {
    u || r(e.step);
  }, y = `${v} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...N_(d, m, u), "data-validation": s, style: p_(e, s), onClick: b, onKeyDown: (B) => y_(B, b) }, label: y, name: v, holder: c, validation: s, note: k_(s, n, m), step: e.step };
}
const S_ = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${A.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${A.tile} ward-ladder-cell`, children: /* @__PURE__ */ t($_, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${A.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(g_, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${A.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${A.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function R_(e) {
  return S_[e.presentation](C_(e));
}
function T_(e) {
  for (const a of e)
    if (!a.reserved && !La(a.step)) throw new Error("colour ladder renders token steps only");
}
function x_() {
  return /* @__PURE__ */ o("div", { className: `${A.cell} ward-ladder-cell ${A.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${A.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function L_(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const A_ = { list: A.ladder, swatches: A.swatches, tiles: A.tilesFrame };
function E_() {
  return /* @__PURE__ */ o("div", { className: `${A.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${A.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const I_ = { list: x_, swatches: () => null, tiles: E_ };
function M_(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Cn(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  T_(e.steps);
  const r = L_(e), l = I_[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(R_, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...M_(e.disabled === !0), className: `${A_[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: A.tiles, children: i }) : i });
}
const B_ = "_rail_s06lm_2", P_ = "_section_s06lm_12", j_ = "_sectionFlush_s06lm_22", D_ = "_head_s06lm_26", H_ = "_headLabel_s06lm_34", q_ = "_sample_s06lm_42", O_ = "_sampleLabel_s06lm_47", F_ = "_sampleTitle_s06lm_54", z_ = "_sampleMeta_s06lm_59", W_ = "_trace_s06lm_65", K_ = "_traceHead_s06lm_70", G_ = "_steps_s06lm_78", U_ = "_step_s06lm_78", V_ = "_stepTitle_s06lm_97", Y_ = "_hollow_s06lm_107", X_ = "_stepBody_s06lm_115", J_ = "_stepDetail_s06lm_127", Q_ = "_publish_s06lm_132", Z_ = "_reason_s06lm_138", ev = "_note_s06lm_143", av = "_reveal_s06lm_148", k = {
  rail: B_,
  section: P_,
  sectionFlush: j_,
  head: D_,
  headLabel: H_,
  sample: q_,
  sampleLabel: O_,
  sampleTitle: F_,
  sampleMeta: z_,
  trace: W_,
  traceHead: K_,
  steps: G_,
  step: U_,
  stepTitle: V_,
  hollow: Y_,
  stepBody: X_,
  stepDetail: J_,
  publish: Q_,
  reason: Z_,
  note: ev,
  reveal: av
}, Pt = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, tv = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, nv = { ok: "greenFill", finding: "orangeFill", action: "blue" }, rv = { notSimulated: "not simulated", running: "running" };
function lv(e) {
  return e.presentation === "foundry";
}
function ov(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function iv(e, a) {
  var r;
  const n = tv[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function sv(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function cv(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function dv(e) {
  if (sv(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function uv(e) {
  const [a, n] = p(!1);
  S(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function mv(e) {
  const a = rv[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(Be, { size: 6, kind: nv[e.kind], label: e.kind });
}
function hv(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function wv(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(Se, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function fv(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(uv, { kind: a.kind, children: [
    /* @__PURE__ */ t(mv, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(hv, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(wv, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function _v(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function Sn(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: _v(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(fv, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function vv(e) {
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
function bv(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function pv(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Vt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Ba, { divided: !0, cells: a }) });
}
function gv(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Vt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function yv(e) {
  const a = gv(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Ba, { divided: !0, cells: a }) });
}
function Rn(e) {
  const a = N();
  return e.reason !== null ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: `${k.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ t(_, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ t(_, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Nv(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(Rn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function kv(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(Rn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Tn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: Pt[e.run.status].role, label: Pt[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(Se, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function $v(e, a) {
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
function Cv(e) {
  var n;
  cv(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Tn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(vv, { sample: e.run.sample }),
    /* @__PURE__ */ t(Sn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(pv, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist }) }),
    /* @__PURE__ */ t(Nv, { reason: ov(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Sv(e) {
  var r;
  const a = $v(e.run, e.feed);
  dv(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Tn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(bv, { sample: e.run.sample }),
    /* @__PURE__ */ t(Sn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(yv, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(kv, { reason: iv(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function MS(e) {
  return lv(e) ? /* @__PURE__ */ t(Sv, { ...e }) : /* @__PURE__ */ t(Cv, { ...e });
}
const Rv = "_list_142ip_3", Tv = "_row_142ip_9", xv = "_condition_142ip_18", Lv = "_action_142ip_24", va = {
  list: Rv,
  row: Tv,
  condition: xv,
  action: Lv
}, xn = Me(!1);
function BS({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(xn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: va.list, "aria-label": a, children: e }) });
}
function PS({ rule: e }) {
  if (!Ie(xn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: va.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: va.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: va.action, children: e.then })
  ] });
}
const Av = "_move_tmppt_3", Ev = {
  move: Av
};
function Ya(e, a, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(n, 0, l), r;
}
function Ln(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function An(e, a, n) {
  return `${e} moved to position ${a + 1} of ${n}.`;
}
function jt(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function Iv(e) {
  return e === "up" ? "down" : "up";
}
function Mv(e, a) {
  const n = jt(e, a.id, a.direction) ?? jt(e, a.id, Iv(a.direction));
  n == null || n.focus();
}
function En() {
  const e = w(null), [a, n] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && a !== null && Mv(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function In({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function $a({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${Ev.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const Bv = "_body_1jd1i_2", Pv = "_title_1jd1i_8", jv = "_section_1jd1i_13", Dv = "_legend_1jd1i_18", Hv = "_stages_1jd1i_26", qv = "_stage_1jd1i_26", Ov = "_stageIndex_1jd1i_44", Fv = "_stageName_1jd1i_50", zv = "_footer_1jd1i_59", Wv = "_note_1jd1i_66", Kv = "_reason_1jd1i_71", Gv = "_actions_1jd1i_76", Uv = "_webHead_1jd1i_83", Vv = "_kicker_1jd1i_92", Yv = "_webTitle_1jd1i_99", Xv = "_webBody_1jd1i_105", Jv = "_webSection_1jd1i_109", Qv = "_sectionHead_1jd1i_121", Zv = "_sectionNote_1jd1i_129", eb = "_formLabel_1jd1i_134", ab = "_identityRow_1jd1i_139", tb = "_nameCell_1jd1i_145", nb = "_keyCell_1jd1i_150", rb = "_colourCell_1jd1i_154", lb = "_colourStatus_1jd1i_161", ob = "_webStages_1jd1i_166", ib = "_webStageList_1jd1i_172", sb = "_webStage_1jd1i_166", cb = "_webIndex_1jd1i_191", db = "_webStageName_1jd1i_196", ub = "_webMoves_1jd1i_201", mb = "_addStage_1jd1i_215", hb = "_addStageButton_1jd1i_223", wb = "_addStageNote_1jd1i_231", fb = "_webFooter_1jd1i_236", _b = "_webFooterNotes_1jd1i_244", vb = "_webNote_1jd1i_251", f = {
  body: Bv,
  title: Pv,
  section: jv,
  legend: Dv,
  stages: Hv,
  stage: qv,
  stageIndex: Ov,
  stageName: Fv,
  footer: zv,
  note: Wv,
  reason: Kv,
  actions: Gv,
  webHead: Uv,
  kicker: Vv,
  webTitle: Yv,
  webBody: Xv,
  webSection: Jv,
  sectionHead: Qv,
  sectionNote: Zv,
  formLabel: eb,
  identityRow: ab,
  nameCell: tb,
  keyCell: nb,
  colourCell: rb,
  colourStatus: lb,
  webStages: ob,
  webStageList: ib,
  webStage: sb,
  webIndex: cb,
  webStageName: db,
  webMoves: ub,
  addStage: mb,
  addStageButton: hb,
  addStageNote: wb,
  webFooter: fb,
  webFooterNotes: _b,
  webNote: vb
}, bb = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Mn = "not in catalogue";
function pb(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${Mn}` }, ...n];
}
function gb({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Mn}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: pb(n, e.name), invalid: i, onChange: r });
}
function Bn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function yb(e) {
  const a = w([]), n = w(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Nb({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Bn(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${f.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: f.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: f.webStageName, children: /* @__PURE__ */ t(gb, { stage: a, index: n, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: bb, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: f.webMoves, children: [
      n > 0 && /* @__PURE__ */ t($a, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t($a, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function kb({ stages: e, onChange: a, catalogue: n }) {
  const r = yb(e.length), l = En(), i = (c, d) => {
    const u = Ln(c, d);
    r.current = Ya(r.current, c, u), l.moved({ id: r.current[u], direction: d }, An(Bn(e[c], c), u, e.length)), a(Ya(e, c, u));
  }, s = (c, d) => a(e.map((u, m) => m === c ? d : u));
  return /* @__PURE__ */ o("div", { className: f.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: f.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(Nb, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(In, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: f.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: f.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: f.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const $b = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Cb = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Sb = "A new stream starts as a draft. Nothing runs on it until you publish it.", Rb = "Create is disabled: name the stream and give it a key first.", Tb = "reorder with the ↑ ↓ buttons · min 2";
function it(e, a) {
  return !e.reserved && Aa(e.step) && a[e.step] === void 0;
}
function xb(e, a) {
  const n = e.find((r) => it(r, a));
  return n ? n.step : 1;
}
function Lb({ stages: e, onMove: a }) {
  const n = En(), r = (l, i) => {
    const s = Ln(l, i);
    n.moved({ id: e[l].id, direction: i }, An(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: f.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: f.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: f.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: f.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ t($a, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t($a, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(In, { text: n.announcement })
  ] });
}
function Ab({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: f.footer, children: [
    /* @__PURE__ */ t("p", { className: f.note, children: Sb }),
    e && /* @__PURE__ */ t("p", { className: f.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: f.actions, children: [
      /* @__PURE__ */ t(_, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Eb(e, a) {
  return e !== "" && a !== "" ? null : Rb;
}
function Ib(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = Cb, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [m, v] = p(""), [b, y] = p(""), [E, B] = p(a[0].value), [oe, Re] = p(() => xb(n, r)), [te, Ke] = p(e.stages ?? $b), [Ge, R] = p(l[0].value), G = { name: m, key: b, streamStep: oe, owner: E, stages: te, policy: Ge }, be = Eb(m, b);
  return /* @__PURE__ */ t(ea, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: f.body, children: [
    /* @__PURE__ */ t("h2", { className: f.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: f.section, children: [
      /* @__PURE__ */ t("legend", { className: f.legend, children: "Identity" }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Stream name", value: m, onChange: v }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Key", value: b, onChange: y, mono: !0 }),
      /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: E, onChange: B, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: f.section, children: [
      /* @__PURE__ */ t("legend", { className: f.legend, children: "Colour" }),
      /* @__PURE__ */ t(Cn, { label: "Stream colour", steps: n, value: oe, onChange: Re, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: f.section, children: [
      /* @__PURE__ */ t("legend", { className: f.legend, children: "Stages" }),
      /* @__PURE__ */ t(Lb, { stages: te, onMove: (Pe, ir) => Ke(Ya(te, Pe, ir)) })
    ] }),
    /* @__PURE__ */ t(_n, { legend: "Loop policy", options: l, value: Ge, onChange: R }),
    /* @__PURE__ */ t(Ab, { reason: be, onCreate: () => i(G), onDraft: () => s(G) })
  ] }) });
}
const Pn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Mb = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Bb(e, a, n, r, l, i) {
  var c;
  const s = ((c = Pn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function Pb(e, a) {
  return jb(e) && Db(e, a) && Hb(e);
}
function jb(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Db(e, a) {
  return e.colourStep === null || it({ step: e.colourStep }, a);
}
function Hb(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function qb(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : it({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Ob({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: f.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: f.webNote, children: "Add a stage an agent can run on." });
}
function Fb({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: f.webFooter, children: [
    /* @__PURE__ */ o("div", { className: f.webFooterNotes, children: [
      /* @__PURE__ */ t(Ob, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: f.reason, children: Mb })
    ] }),
    l && /* @__PURE__ */ t(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function zb({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: f.webHead, children: [
    /* @__PURE__ */ t("span", { className: f.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: f.webTitle, children: "New stream" })
  ] });
}
function Wb({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: f.webSection, children: [
    /* @__PURE__ */ t("h3", { className: f.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: f.identityRow, children: [
      /* @__PURE__ */ t("div", { className: f.nameCell, children: /* @__PURE__ */ t(M, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ t("div", { className: f.keyCell, children: /* @__PURE__ */ t(M, { variant: "form", label: "Key", value: n, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function Kb(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [m, v] = p(null), [b, y] = p("relay"), [E, B] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = Bb(l, s, d, m, b, E), Re = Pb(oe, r), te = E.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ke = /* @__PURE__ */ o("div", { className: f.colourCell, children: [
    /* @__PURE__ */ t("span", { className: f.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(Cn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: v, takenBy: r })
  ] }), Ge = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: f.colourStatus, "data-colour-status": "", children: qb(m, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(zb, { titleId: n }),
    /* @__PURE__ */ o("div", { className: f.webBody, children: [
      /* @__PURE__ */ t(Wb, { name: l, setName: i, streamKey: s, setKey: c, colour: Ke, owner: Ge }),
      /* @__PURE__ */ o("section", { className: f.webSection, children: [
        /* @__PURE__ */ o("div", { className: f.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: f.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: f.sectionNote, children: Tb })
        ] }),
        /* @__PURE__ */ t(kb, { stages: E, onChange: B })
      ] }),
      /* @__PURE__ */ t("section", { className: f.webSection, children: /* @__PURE__ */ t(_n, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Pn, onChange: y }) }),
      /* @__PURE__ */ t(Fb, { ready: Re, draft: oe, agentStage: te, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function jS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Kb, { ...e }) : /* @__PURE__ */ t(Ib, { ...e });
}
const Gb = "_row_bs8hc_2", Ub = "_cell_bs8hc_6", Vb = "_condition_bs8hc_11", Yb = "_action_bs8hc_18", Xb = "_contract_bs8hc_24", Jb = "_contractCondition_bs8hc_33", Qb = "_contractAction_bs8hc_39", ee = {
  row: Gb,
  cell: Ub,
  condition: Vb,
  action: Yb,
  contract: Xb,
  contractCondition: Jb,
  contractAction: Qb
}, jn = ["advance", "block", "escalate", "requestReview"], Dt = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Ca(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function st(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: ee.action, children: Dt[e.then] }) : /* @__PURE__ */ t(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: jn.map((l) => ({ value: l, label: Dt[l] }))
    }
  );
}
function Zb({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: ee.row, children: [
    /* @__PURE__ */ t("td", { className: ee.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: ee.cell, children: /* @__PURE__ */ t("span", { className: ee.condition, title: Ca(e, r), children: Ca(e, r) }) }),
    /* @__PURE__ */ t("td", { className: ee.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: ee.cell, children: st(e, a, n) })
  ] });
}
function ep({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: ee.row, children: [
    /* @__PURE__ */ o("td", { className: ee.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: ee.condition, children: Ca(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: ee.cell, children: st(e, a, n) })
  ] });
}
function ap({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: ee.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: ee.contractCondition, children: Ca(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: ee.contractAction, children: st(e, a, n, !0) })
  ] });
}
const tp = { two: ep, four: Zb, contract: ap };
function DS(e) {
  var n;
  if (!jn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = tp[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const np = "_column_11id3_2", rp = "_head_11id3_17", lp = "_index_11id3_23", op = "_name_11id3_29", ip = "_meta_11id3_38", sp = "_mono_11id3_43", cp = "_gate_11id3_50", dp = "_reviewersLabel_11id3_57", up = "_reviewers_11id3_57", mp = "_reviewer_11id3_57", hp = "_agents_11id3_74", wp = "_workflowColumn_11id3_79", fp = "_workflowHead_11id3_96", _p = "_stageRow_11id3_102", vp = "_stageLabel_11id3_109", bp = "_workflowTitle_11id3_116", pp = "_workflowMeta_11id3_122", gp = "_workflowGate_11id3_127", yp = "_gateNote_11id3_135", Np = "_cardNote_11id3_140", kp = "_reviewerList_11id3_145", $p = "_reviewerRow_11id3_151", Cp = "_reviewerMark_11id3_157", Sp = "_reviewerName_11id3_167", Rp = "_terminalCard_11id3_173", Tp = "_terminalCount_11id3_182", xp = "_workflowAgents_11id3_188", Lp = "_mount_11id3_194", C = {
  column: np,
  head: rp,
  index: lp,
  name: op,
  meta: ip,
  mono: sp,
  gate: cp,
  reviewersLabel: dp,
  reviewers: up,
  reviewer: mp,
  agents: hp,
  workflowColumn: wp,
  workflowHead: fp,
  stageRow: _p,
  stageLabel: vp,
  workflowTitle: bp,
  workflowMeta: pp,
  workflowGate: gp,
  gateNote: yp,
  cardNote: Np,
  reviewerList: kp,
  reviewerRow: $p,
  reviewerMark: Cp,
  reviewerName: Sp,
  terminalCard: Rp,
  terminalCount: Tp,
  workflowAgents: xp,
  mount: Lp
}, Ap = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function ct(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Dn(e) {
  return `${Math.round(e * 100)}%`;
}
function Ep({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: C.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: C.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: C.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Ba, { cells: [
      { value: Dn(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function Ip({ stage: e }) {
  return /* @__PURE__ */ t(Ba, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: ct(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function Mp({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: C.head, children: [
    /* @__PURE__ */ t("span", { className: C.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: C.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: Ap[e.kind] })
  ] });
}
function Bp({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: C.meta, children: [
    /* @__PURE__ */ o("span", { className: C.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: C.mono, children: [
      ce(e.medianWait),
      " median wait"
    ] })
  ] });
}
function Pp({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(Ep, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(Ip, { stage: e }) : null;
}
function jp({ onMount: e }) {
  return e ? /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Dp({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: C.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Mp, { stage: e, titleId: l }),
    /* @__PURE__ */ t(Bp, { stage: e }),
    /* @__PURE__ */ t(Pp, { stage: e }),
    /* @__PURE__ */ t("div", { className: C.agents, children: a.map((s) => /* @__PURE__ */ t(Ff, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(jp, { onMount: n })
  ] });
}
const Hp = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function qp({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: C.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: C.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: C.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: C.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function Op({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: C.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(qp, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: C.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Dn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Fp(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function zp({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: C.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: C.terminalCount, children: ct(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: C.cardNote, children: Fp(e.rolledBackThisWeek) })
  ] });
}
function Wp(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Kp(e) {
  if (e.kind === "terminal") return `${ct(e.closedThisWeek)} this week`;
  const a = Wp(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Gp({ stage: e, titleId: a }) {
  const n = Hp[e.kind];
  return /* @__PURE__ */ o("header", { className: C.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: C.stageRow, children: [
      /* @__PURE__ */ o("span", { className: C.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: C.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: C.workflowMeta, children: Kp(e) })
  ] });
}
function Up(e) {
  return e === "entry" || e === "agent";
}
function Vp({ stage: e, onMount: a }) {
  return a === void 0 || !Up(e.kind) ? null : /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", className: C.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Yp({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: C.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Gp, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(Op, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(zp, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: C.workflowAgents, children: a }),
    /* @__PURE__ */ t(Vp, { stage: e, onMount: n })
  ] });
}
function Xp(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function HS(e) {
  return Xp(e) ? /* @__PURE__ */ t(Yp, { ...e }) : /* @__PURE__ */ t(Dp, { ...e });
}
const Jp = "_row_alabo_6", Qp = "_name_alabo_12", Zp = "_compactRow_alabo_13", eg = "_compactName_alabo_13", ag = "_cell_alabo_30", tg = "_chain_alabo_45", ng = "_owner_alabo_51", rg = "_mono_alabo_57", lg = "_compactCell_alabo_79", og = "_stack_alabo_96", ig = "_stat_alabo_103", sg = "_identityLine_alabo_110", cg = "_identity_alabo_110", dg = "_ownerLine_alabo_137", ug = "_link_alabo_150", mg = "_gateMark_alabo_156", hg = "_emptyChain_alabo_161", wg = "_arrow_alabo_167", fg = "_muted_alabo_168", _g = "_define_alabo_173", vg = "_statValue_alabo_180", bg = "_policyId_alabo_186", pg = "_sub_alabo_191", g = {
  row: Jp,
  name: Qp,
  compactRow: Zp,
  compactName: eg,
  cell: ag,
  chain: tg,
  owner: ng,
  mono: rg,
  compactCell: lg,
  stack: og,
  stat: ig,
  identityLine: sg,
  identity: cg,
  ownerLine: dg,
  link: ug,
  gateMark: mg,
  emptyChain: hg,
  arrow: wg,
  muted: fg,
  define: _g,
  statValue: vg,
  policyId: bg,
  sub: pg
};
function Hn(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function gg(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function yg(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function qn(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function Ng(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${qn(e.members)}`;
}
function kg(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: O(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: Ng(e) })
  ] }) });
}
function On({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function $g(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = ca(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function Cg({ stages: e, streamStep: a }) {
  const n = e.findIndex((r) => r.gate === !0);
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((r, l) => /* @__PURE__ */ o("span", { className: g.link, children: [
    l === 0 ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ t(On, { name: r.name, gate: r.gate === !0, look: $g(l, n, a), size: "tag" })
  ] }, `${r.name}${l}`)) });
}
function Sg(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : Cg(e) });
}
function Fn(e) {
  return e === void 0 ? void 0 : !0;
}
function Ht(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Fn(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: a })
  ] }) });
}
function Rg(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function Tg(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function xg({ stream: e, href: a, presentation: n }) {
  const r = yg(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Hn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ve(e.streamStep, "chip") }, children: [
    kg(e, a),
    Sg(e),
    Ht(Tg(e.agents), e.agents === void 0 ? void 0 : gg(e.agents), "—"),
    Rg(e.policy),
    Ht(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function Lg(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function qS(e) {
  if (Lg(e)) return xg(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: Hn, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: O(n), children: a.name }),
      /* @__PURE__ */ t(h, { ...Ma(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(h, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ t("span", { className: g.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: g.link, children: /* @__PURE__ */ t(On, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ t("span", { className: g.mono, children: qn(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: a.inFlightHint, "data-raised": Fn(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const Ag = "_row_2u4ll_2", Eg = "_name_2u4ll_16", Ig = "_scope_2u4ll_24", Sa = {
  row: Ag,
  name: Eg,
  scope: Ig
};
function dt(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Mg(e) {
  return e === void 0 ? `${Sa.row} ward-toolrow` : `${Sa.row} ward-toolrow ${e}`;
}
function Bg(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Pg({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function jg({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: dt(e) });
}
function Dg({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${Sa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Hg(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function OS({ tool: e, onChange: a, presentation: n }) {
  const r = N(), l = N(), i = Bg(e, n), s = Hg(n);
  return /* @__PURE__ */ o(s, { className: Mg(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Pg, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${Sa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(Dg, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(jg, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const qg = "_strip_4ppv9_2", Og = "_well_4ppv9_11", Fg = "_head_4ppv9_18", zg = "_name_4ppv9_24", Wg = "_chart_4ppv9_32", Kg = "_segment_4ppv9_38", Gg = "_detailedChart_4ppv9_44", Ug = "_rail_4ppv9_57", Vg = "_section_4ppv9_63", Yg = "_label_4ppv9_74", Xg = "_note_4ppv9_91", K = {
  strip: qg,
  well: Og,
  head: Fg,
  name: zg,
  chart: Wg,
  segment: Kg,
  detailedChart: Gg,
  rail: Ug,
  section: Vg,
  label: Yg,
  note: Xg
}, Jg = "No item in flight to preview.", Qg = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Zg = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Xa = [1, 2, 3, 4, 5, 6], Ra = 100;
function ey(e, a) {
  return a.has(e) ? ve(e, "id") : "var(--ward-color-line)";
}
function ay({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: K.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Xa.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: K.segment,
      x: l * Ra,
      y: "0",
      width: Ra,
      height: "8",
      fill: ey(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function ty(e) {
  const a = e.slice(0, Xa.length);
  for (; a.length < Xa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function ny({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${K.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ t("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, n) => /* @__PURE__ */ t(
      "rect",
      {
        x: String(n * Ra),
        y: "0",
        width: String(Ra),
        height: "40",
        style: { fill: ve(a.streamStep, "chip") }
      },
      a.key + String(n)
    )) }),
    /* @__PURE__ */ t("figcaption", { className: "ward-seglabels", children: e.map((a, n) => /* @__PURE__ */ t("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(n))) })
  ] });
}
function zn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ha({ label: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("section", { className: K.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: K.label, children: e }),
    a
  ] });
}
function ry({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: K.note, children: a ?? Jg }) : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(ja, { item: { ...e, streamStep: ca(n.streamStep) }, onOpen: zn(r), feed: null }) });
}
function ly({ draft: e }) {
  const a = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: K.head, style: a, children: [
    /* @__PURE__ */ t(Be, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...Ma(e.key, e.streamStep) })
  ] });
}
function oy(e) {
  const a = ty(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: K.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(ha, { label: "Board card", children: /* @__PURE__ */ t(ry, { ...e, draft: n }) }),
    /* @__PURE__ */ t(ha, { label: "Streams index row", children: /* @__PURE__ */ t(ly, { draft: n }) }),
    /* @__PURE__ */ o(ha, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(ny, { identities: a }),
      /* @__PURE__ */ t("p", { className: K.note, children: Qg })
    ] }),
    /* @__PURE__ */ t(ha, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: K.note, children: Zg }) })
  ] });
}
function iy({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: K.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: K.head, children: [
      /* @__PURE__ */ t(Be, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...Ma(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(ja, { item: { ...a, streamStep: e.streamStep }, onOpen: zn(r) }) }),
    /* @__PURE__ */ t(ay, { draft: e, streams: n })
  ] });
}
function FS(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(oy, { ...e }) : /* @__PURE__ */ t(iy, { ...e });
}
const sy = "_row_ixlg5_6", cy = "_headCell_ixlg5_10", dy = "_cell_ixlg5_11", uy = "_name_ixlg5_23", my = "_consequence_ixlg5_29", hy = "_governed_ixlg5_36", wy = "_control_ixlg5_42", fy = "_byRole_ixlg5_48", _y = "_webControl_ixlg5_59", vy = "_webConsequence_ixlg5_65", by = "_webGoverned_ixlg5_71", q = {
  row: sy,
  headCell: cy,
  cell: dy,
  name: uy,
  consequence: my,
  governed: hy,
  control: wy,
  byRole: fy,
  webControl: _y,
  webConsequence: vy,
  webGoverned: by
};
function py({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: q.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: q.control, children: [
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
function gy({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: q.headCell, children: [
      /* @__PURE__ */ t("span", { className: q.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: q.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: q.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(py, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function yy(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Ny({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${q.webControl} ${q.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    We,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: n === void 0,
      onChange: (l) => n == null ? void 0 : n(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${q.webControl} ward-envrow`, children: [
    /* @__PURE__ */ t(h, { role: "running", label: "Pilot" }),
    r
  ] });
}
function ky({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ t("span", { className: q.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${q.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(Ny, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webGoverned} ward-cellmeta`, children: yy(e) }) })
  ] });
}
function zS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(ky, { ...e }) : /* @__PURE__ */ t(gy, { ...e });
}
const $y = "_row_vv64h_2", Cy = "_cell_vv64h_6", Sy = "_name_vv64h_25", Ry = "_note_vv64h_30", Ty = "_webName_vv64h_41", xy = "_webMeta_vv64h_47", V = {
  row: $y,
  cell: Cy,
  name: Sy,
  note: Ry,
  webName: Ty,
  webMeta: xy
}, Wn = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function Ly(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Ay({ component: e, onRestart: a }) {
  const n = N(), r = Wn[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: V.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: V.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { id: n, className: V.note, children: e.note }) }),
    /* @__PURE__ */ t("td", { className: V.cell, "data-align": "end", children: l ? /* @__PURE__ */ t(_, { size: "sm", disabled: !0, describedBy: n, children: "Restart" }) : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function Ey({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: Ly(e.state) });
}
function Iy({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { ...Wn[e.state] }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(Ey, { component: e, onRestart: a }) })
  ] });
}
function WS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Iy, { ...e }) : /* @__PURE__ */ t(Ay, { ...e });
}
const My = "_row_jcm5k_7", By = "_cell_jcm5k_11", Py = "_next_jcm5k_28", jy = "_headCell_jcm5k_38", Dy = "_webId_jcm5k_77", Hy = "_webPurpose_jcm5k_83", qy = "_webMeta_jcm5k_91", Oy = "_webUrgent_jcm5k_97", F = {
  row: My,
  cell: By,
  next: Py,
  headCell: jy,
  webId: Dy,
  webPurpose: Hy,
  webMeta: qy,
  webUrgent: Oy
}, Fy = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, zy = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Kn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Wy = Object.fromEntries(Kn.map((e) => [e.key, e]));
function Ve({ column: e, children: a }) {
  const n = Wy[e];
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
function KS() {
  return /* @__PURE__ */ t("tr", { children: Kn.map((e) => /* @__PURE__ */ t(
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
function Ky({ cred: e }) {
  const a = Fy[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t(Ve, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Ve, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Ve, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Ve, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: dt(e.cls) }) }),
    /* @__PURE__ */ t(Ve, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Ve, { column: "next", children: /* @__PURE__ */ t("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Gy({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function Uy({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(Gy, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { ...zy[e.state] }) })
  ] });
}
function GS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Uy, { ...e }) : /* @__PURE__ */ t(Ky, { ...e });
}
const Vy = "_card_17zba_2", Yy = "_head_17zba_11", Xy = "_env_17zba_18", Jy = "_version_17zba_25", Qy = "_meta_17zba_32", Zy = "_webCard_17zba_37", eN = "_webRow_17zba_47", aN = "_webTitle_17zba_55", tN = "_webLine_17zba_65", nN = "_webVersion_17zba_72", rN = "_webMeta_17zba_77", U = {
  card: Vy,
  head: Yy,
  env: Xy,
  version: Jy,
  meta: Qy,
  webCard: Zy,
  webRow: eN,
  webTitle: aN,
  webLine: tN,
  webVersion: nN,
  webMeta: rN
}, qt = { dev: "Dev", uat: "UAT", prod: "Prod" }, Gn = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function lN({ env: e }) {
  const a = Gn[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: U.card, "aria-label": qt[e.env], children: [
    /* @__PURE__ */ o("div", { className: U.head, children: [
      /* @__PURE__ */ t("span", { className: U.env, children: qt[e.env] }),
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
function oN(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function iN(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...Gn[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: oN(e) })
  ] });
}
function US(e) {
  return "presentation" in e ? /* @__PURE__ */ t(iN, { ...e }) : /* @__PURE__ */ t(lN, { ...e });
}
const sN = "_panel_1hmja_2", cN = "_line_1hmja_8", dN = "_actions_1hmja_14", wa = {
  panel: sN,
  line: cN,
  actions: dN
};
function VS(e) {
  return /* @__PURE__ */ o("div", { className: wa.panel, children: [
    /* @__PURE__ */ t("p", { className: wa.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: wa.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: wa.line, children: e.note ?? "" })
  ] });
}
const uN = "_upload_13fcl_2", mN = "_preview_13fcl_7", hN = "_mark_13fcl_17", wN = "_empty_13fcl_22", fN = "_actions_13fcl_28", _N = "_input_13fcl_33", vN = "_reasons_13fcl_41", bN = "_reason_13fcl_41", pN = "_accepted_13fcl_57", ne = {
  upload: uN,
  preview: mN,
  mark: hN,
  empty: wN,
  actions: fN,
  input: _N,
  reasons: vN,
  reason: bN,
  accepted: pN
}, Un = 1.5, Vn = 22, Ta = "script elements or event handlers", xe = "links or external references", $e = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Un}px at ${Vn}px`], gN = [$e[1], $e[2], Ta, xe], yN = /* @__PURE__ */ new Map([
  ["image", $e[1]],
  ["text", $e[2]],
  ["tspan", $e[2]],
  ["textPath", $e[2]],
  ["script", Ta],
  ["foreignObject", Ta],
  ["a", xe],
  ["use", xe],
  ["style", xe],
  ["feImage", xe],
  ["set", xe]
]), NN = "http://www.w3.org/2000/svg", kN = "http://www.w3.org/2000/xmlns/", $N = /* @__PURE__ */ new Set([
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
]), CN = /* @__PURE__ */ new Set([
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
]), ut = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, SN = /url\s*\(|['"\\]/i;
function RN() {
  return { ok: !1, reasons: [$e[1]] };
}
function Yn(e) {
  return e.namespaceURI === NN;
}
function TN(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && Yn(a) ? a : null;
  } catch {
    return null;
  }
}
function xN(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [$e[0]] : [];
}
function LN(e) {
  return yN.get(e.localName) ?? (e.localName.startsWith("animate") ? xe : void 0);
}
function AN(e) {
  return SN.test(e.replace(ut, ""));
}
function EN(e) {
  return /^on/i.test(e.localName) ? Ta : e.localName === "href" || AN(e.value) ? xe : void 0;
}
function IN(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(LN(n));
    for (const r of Array.from(n.attributes)) a.add(EN(r));
  }
  return gN.filter((n) => a.has(n));
}
function MN(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? Vn / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Un;
  }) ? [$e[3]] : [];
}
function BN(e) {
  if (e.namespaceURI === kN) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (CN.has(a) || a.startsWith("stroke"));
}
function PN(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && Yn(a) && $N.has(a.localName);
}
function jN(e, a) {
  PN(a) ? a.nodeType === Node.ELEMENT_NODE && Xn(a) : e.removeChild(a);
}
function Xn(e) {
  for (const a of Array.from(e.attributes)) BN(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) jN(e, a);
  return e;
}
function DN(e) {
  return Array.from(e.matchAll(ut), (a) => a[2]).filter((a) => a !== "");
}
function HN(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function qN(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of DN(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function ON(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(ut, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function FN(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = qN(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), ON(l, r);
  }
  return e;
}
function YS(e) {
  const a = TN(e);
  if (a === null) return RN();
  const n = [...xN(a), ...IN(a), ...MN(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(FN(Xn(a), HN(e))) };
}
const zN = "Mark accepted.", WN = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, KN = new Set(Xt.flatMap((e) => [ve(e, "id"), ve(e, "chip")]));
function GN(e) {
  return e !== void 0 && (WN.test(e) || KN.has(e)) ? e : void 0;
}
function UN({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: ne.preview, style: { "--mark": GN(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: ne.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: ne.empty }) });
}
function VN(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function YN(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function XN({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: ne.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("p", { className: ne.accepted, children: zN }) }) : /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("ul", { className: ne.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: ne.reason, children: a }, a)) }) });
}
function JN({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(XN, { result: e }) : /* @__PURE__ */ t("p", { className: `${ne.result} ${VN(e, n)}`, role: "status", children: YN(e, n) });
}
function Ot(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function XS({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = w(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const m = a(u);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: ne.upload, children: [
    /* @__PURE__ */ t(UN, { current: e }),
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
      /* @__PURE__ */ t(_, { ...Ot(l), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(_, { ...Ot(l), variant: "ghost", onClick: n, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(JN, { result: s, presentation: r })
  ] });
}
const QN = "_row_o3t6y_7", ZN = "_cell_o3t6y_11", e1 = "_head_o3t6y_28", a1 = "_name_o3t6y_34", t1 = "_pinned_o3t6y_42", n1 = "_headCell_o3t6y_49", r1 = "_webName_o3t6y_88", l1 = "_webMeta_o3t6y_95", o1 = "_webWarn_o3t6y_103", P = {
  row: QN,
  cell: ZN,
  head: e1,
  name: a1,
  pinned: t1,
  headCell: n1,
  webName: r1,
  webMeta: l1,
  webWarn: o1
}, mt = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Jn = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], i1 = Object.fromEntries(Jn.map((e) => [e.key, e]));
function s1(e, a) {
  return `mcp.${e}.${a}`;
}
function c1(e) {
  return Object.keys(mt).includes(e);
}
function d1(e) {
  return mt[e !== void 0 && c1(e) ? e : "unknown"];
}
function aa({ column: e, children: a }) {
  const n = i1[e];
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
function JS() {
  return /* @__PURE__ */ t("tr", { children: Jn.map((e) => /* @__PURE__ */ t(
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
function u1({ server: e }) {
  const a = mt[e.connection];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o(aa, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: P.head, children: [
        /* @__PURE__ */ t("span", { className: P.name, children: e.name }),
        /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: dt(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: P.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(aa, { column: "connection", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(aa, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(aa, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(aa, { column: "tools", children: e.tools.map((n) => s1(e.name, n)).join(" · ") })
  ] });
}
function m1(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function h1(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function w1({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${P.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: e });
}
function f1({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function _1({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(_, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function v1({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t("span", { className: `${P.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: m1(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...h1(e) }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(w1, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...d1(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t(f1, { server: e, onRestart: a }),
      /* @__PURE__ */ t(_1, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function QS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(v1, { ...e }) : /* @__PURE__ */ t(u1, { ...e });
}
const b1 = "_row_1ibo7_2", p1 = "_headCell_1ibo7_14", g1 = "_cell_1ibo7_15", y1 = "_name_1ibo7_26", N1 = "_consequence_1ibo7_32", k1 = "_reason_1ibo7_38", $1 = "_value_1ibo7_44", C1 = "_webRow_1ibo7_60", S1 = "_webSetting_1ibo7_73", R1 = "_webName_1ibo7_81", T1 = "_webConsequence_1ibo7_89", x1 = "_webControl_1ibo7_95", L1 = "_webState_1ibo7_109", A1 = "_webChip_1ibo7_114", I = {
  row: b1,
  headCell: p1,
  cell: g1,
  name: y1,
  consequence: N1,
  reason: k1,
  value: $1,
  webRow: C1,
  webSetting: S1,
  webName: R1,
  webConsequence: T1,
  webControl: x1,
  webState: L1,
  webChip: A1
}, Qn = 104, Zn = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function E1({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(We, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(wn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function I1({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = Zn[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(E1, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: Qn }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function er(e, a) {
  return String(e ?? a);
}
function M1(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function B1(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? er(e.value, "—");
}
function P1({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(We, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function j1(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(P1, { ...e });
  const l = M1(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(wn, { options: l, value: er(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: B1(a) });
}
function D1({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(j1, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: Qn }, children: /* @__PURE__ */ t(h, { ...Zn[n], size: "tag" }) })
  ] });
}
function ZS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(D1, { ...e }) : /* @__PURE__ */ t(I1, { ...e });
}
const H1 = "_label_vm9hq_7", q1 = "_name_vm9hq_15", O1 = "_column_vm9hq_24", F1 = "_webFrame_vm9hq_57", z1 = "_webHead_vm9hq_62", W1 = "_webHeadLabel_vm9hq_74", K1 = "_webLabel_vm9hq_112", G1 = "_webColumns_vm9hq_119", U1 = "_webGroup_vm9hq_125", V1 = "_webPeople_vm9hq_126", Y1 = "_webVia_vm9hq_127", X1 = "_webMeta_vm9hq_156", z = {
  label: H1,
  name: q1,
  column: O1,
  webFrame: F1,
  webHead: z1,
  webHeadLabel: W1,
  webLabel: K1,
  webColumns: G1,
  webGroup: U1,
  webPeople: V1,
  webVia: Y1,
  webMeta: X1
}, J1 = {
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
function Q1(e) {
  if (!e.matrixRole) return;
  const a = J1[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Z1({ node: e }) {
  const a = Q1(e);
  return /* @__PURE__ */ o("span", { className: z.label, children: [
    /* @__PURE__ */ t("span", { className: z.name, children: e.name }),
    /* @__PURE__ */ t(ek, { role: a, node: e }),
    /* @__PURE__ */ t(Wa, { column: za[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Wa, { column: za[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ t(Wa, { column: za[2], children: e.requestedVia ?? "" })
  ] });
}
function ek({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function ak({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ t(
    pn,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ t(Z1, { node: n }),
      children: s
    }
  );
}
function Ka({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function tk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ka, { className: `${z.webMeta} ${z.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ka, { className: `${z.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ka, { className: `${z.webMeta} ${z.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function nk() {
  return /* @__PURE__ */ o("div", { className: z.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: z.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: z.webColumns, children: [
      /* @__PURE__ */ t("span", { className: z.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: z.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: z.webVia, children: "Requested via" })
    ] })
  ] });
}
function rk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function lk(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function ok({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: z.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(nk, {}),
    /* @__PURE__ */ t(Fu, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      pn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(rk, { row: n }),
        detail: /* @__PURE__ */ t(tk, { row: n }),
        expanded: lk(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function e2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(ok, { ...e }) : /* @__PURE__ */ t(ak, { ...e });
}
const ik = "_runbook_b9agc_2", sk = "_list_b9agc_7", ck = "_step_b9agc_15", dk = "_numeral_b9agc_21", uk = "_body_b9agc_28", mk = "_head_b9agc_34", hk = "_title_b9agc_40", wk = "_detail_b9agc_45", fk = "_actions_b9agc_50", _k = "_webList_b9agc_56", vk = "_webStep_b9agc_60", bk = "_webBody_b9agc_66", pk = "_webTitle_b9agc_74", gk = "_webDetail_b9agc_78", L = {
  runbook: ik,
  list: sk,
  step: ck,
  numeral: dk,
  body: uk,
  head: mk,
  title: hk,
  detail: wk,
  actions: fk,
  webList: _k,
  webStep: vk,
  webBody: bk,
  webTitle: pk,
  webDetail: gk
}, ar = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function tr(e) {
  return String(e + 1).padStart(2, "0");
}
function yk({ step: e, index: a, connection: n }) {
  const r = ar[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: L.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: L.numeral, children: tr(a) }),
    /* @__PURE__ */ o("span", { className: L.body, children: [
      /* @__PURE__ */ o("span", { className: L.head, children: [
        /* @__PURE__ */ t("span", { className: L.title, children: e.title }),
        /* @__PURE__ */ t(h, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ t(Se, { startedAt: e.startedAt, connection: n })
      ] }),
      /* @__PURE__ */ t("span", { className: L.detail, children: e.detail })
    ] })
  ] });
}
function Nk({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ t("ol", { className: L.list, children: e.map((r, l) => /* @__PURE__ */ t(yk, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: L.actions, children: a })
  ] });
}
function kk({ step: e, index: a, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${L.step} ${L.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${L.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: tr(a) }),
    /* @__PURE__ */ o("span", { className: `${L.body} ${L.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${L.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${L.title} ${L.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(h, { ...ar[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t(Se, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${L.detail} ${L.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function $k({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${L.list} ${L.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(kk, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${L.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function a2(e) {
  return "presentation" in e ? /* @__PURE__ */ t($k, { ...e }) : /* @__PURE__ */ t(Nk, { ...e });
}
const Ck = "_list_1gu6a_2", Sk = "_check_1gu6a_10", Rk = "_body_1gu6a_16", Tk = "_text_1gu6a_23", xk = "_pending_1gu6a_32", Lk = "_measured_1gu6a_37", Xe = {
  list: Ck,
  check: Sk,
  body: Rk,
  text: Tk,
  pending: xk,
  measured: Lk
};
function Ak(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function Ek({ check: e }) {
  const a = Ak(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Xe.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ t(rt, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: Xe.body, children: [
      /* @__PURE__ */ t("span", { className: Xe.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Xe.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ t("span", { className: Xe.measured, children: e.measured })
  ] });
}
function t2({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Xe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(Ek, { check: a }, a.text)) });
}
const Ik = "_root_a6xzy_2", Mk = "_list_a6xzy_10", Bk = "_line_a6xzy_21", Pk = "_at_a6xzy_48", jk = "_text_a6xzy_52", Dk = "_foot_a6xzy_56", Hk = "_idle_a6xzy_68", qk = "_caret_a6xzy_76", Ok = "_jump_a6xzy_83", he = {
  root: Ik,
  list: Mk,
  line: Bk,
  at: Pk,
  text: jk,
  foot: Dk,
  idle: Hk,
  caret: qk,
  jump: Ok
}, Fk = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function ht(e) {
  return Number.isNaN(Date.parse(e)) ? "" : Fk.format(new Date(e));
}
const zk = { warn: "warning", ok: "ok" };
function Wk({ kind: e }) {
  const a = zk[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function Kk({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${ht(e)}` });
}
function Gk({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${ht(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: he.idle, children: i }),
    /* @__PURE__ */ t(Kk, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const Uk = 8;
function Vk(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > Uk;
}
function Yk({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const nr = Me(null);
function n2({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Gt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(nr.Provider, { value: i, children: n });
}
function Xk() {
  const e = Ie(nr), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function r2({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = w(null), [i, s] = p(0), [c, d] = Xk(), [u, m] = p(!1), v = e.at(-1);
  S(() => {
    s(e.length);
  }, [e.length]), ra(() => {
    const y = l.current;
    y && !u && (y.scrollTop = y.scrollHeight);
  }, [e.length, u]);
  const b = () => {
    var B;
    const y = l.current;
    if (!y) return;
    const E = y.querySelectorAll("[data-consline-text]");
    (B = E.item(E.length - 1)) == null || B.focus(), m(!1);
  };
  return /* @__PURE__ */ o("div", { className: he.root, children: [
    /* @__PURE__ */ t("ol", { className: he.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (y) => m(Vk(y.currentTarget)), children: e.map((y, E) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": E < i, children: [
      /* @__PURE__ */ t("span", { className: he.at, children: ht(y.at) }),
      /* @__PURE__ */ t(Wk, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${E}`)) }),
    /* @__PURE__ */ o(Gk, { connection: a, idleSince: n, last: v, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t(Yk, { shown: u, onJump: b })
    ] })
  ] });
}
const Jk = "_row_1k8wl_2", Qk = "_head_1k8wl_14", Zk = "_author_1k8wl_20", e$ = "_eta_1k8wl_25", a$ = "_edited_1k8wl_26", t$ = "_body_1k8wl_32", n$ = "_reason_1k8wl_37", r$ = "_actions_1k8wl_42", ge = {
  row: Jk,
  head: Qk,
  author: Zk,
  eta: e$,
  edited: a$,
  body: t$,
  reason: n$,
  actions: r$
}, l$ = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function o$(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function i$({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(_, { variant: "primary", size: "sm", onClick: n, children: "Edit" }),
    /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: n, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", onClick: n, children: "Edit" }),
    /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function s$({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: ge.reason, id: a, children: e })
  ] });
}
function c$(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function d$(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(i$, { ...e }) : /* @__PURE__ */ t(s$, { reason: e.unavailable, reasonId: e.unavailableId });
}
function l2(e) {
  const { comment: a } = e;
  c$(e);
  const n = N(), r = `${n}-unavailable`, l = l$[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${ge.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: ge.head, children: [
      /* @__PURE__ */ t("span", { className: ge.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: ge.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: ge.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: ge.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: ge.reason, id: n, children: o$(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: ge.actions, children: /* @__PURE__ */ t(d$, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const u$ = "_root_c46wj_2", m$ = "_attach_c46wj_11", h$ = "_actions_c46wj_17", w$ = "_reply_c46wj_23", f$ = "_replyRow_c46wj_28", _$ = "_sendsAs_c46wj_42", Ze = {
  root: u$,
  attach: m$,
  actions: h$,
  reply: w$,
  replyRow: f$,
  sendsAs: _$
};
function rr({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function v$(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = rr(e), s = N();
  return /* @__PURE__ */ o("div", { className: Ze.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ze.replyRow, children: [
      /* @__PURE__ */ t(M, { variant: "reply", labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ t(_, { variant: "ghost", describedBy: s, onClick: () => r(n, l), children: "Send" })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: Ze.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function o2(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(v$, { ...e }) : /* @__PURE__ */ t(b$, { ...e });
}
function b$(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = rr(e);
  return /* @__PURE__ */ o("div", { className: Ze.root, children: [
    /* @__PURE__ */ t(M, { kind: "textarea", label: a, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: Ze.attach, children: [
      /* @__PURE__ */ t(h, { role: "soft", label: r.label }),
      /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ t(
      Zt,
      {
        label: `Requeue ${l.agent} after posting`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Ze.actions, children: [
      /* @__PURE__ */ t(_, { variant: "primary", onClick: () => i(n, c), children: `Post as ${n}` }),
      s && /* @__PURE__ */ t(_, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const p$ = "_list_1yhks_2", g$ = "_item_1yhks_6", y$ = "_body_1yhks_22", N$ = "_text_1yhks_28", k$ = "_evidence_1yhks_37", $$ = "_consequence_1yhks_49", C$ = "_note_1yhks_54", Fe = {
  list: p$,
  item: g$,
  body: y$,
  text: N$,
  evidence: k$,
  consequence: $$,
  note: C$
};
function S$({ criterion: e }) {
  return /* @__PURE__ */ t(Be, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Ft({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function R$(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function T$({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Fe.body, children: [
    /* @__PURE__ */ t("span", { className: Fe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Ft, { text: " · " }),
      /* @__PURE__ */ t("code", { className: Fe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Ft, { text: " · " }),
      /* @__PURE__ */ t("span", { className: Fe.consequence, children: R$(e.why) })
    ] })
  ] });
}
function x$({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Fe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(S$, { criterion: e }),
    /* @__PURE__ */ t(T$, { criterion: e })
  ] });
}
function i2({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${Fe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(x$, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: Fe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const L$ = "_list_dwhoz_2", A$ = "_rung_dwhoz_6", E$ = "_name_dwhoz_18", I$ = "_actor_dwhoz_32", ba = {
  list: L$,
  rung: A$,
  name: E$,
  actor: I$
}, M$ = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function B$({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = M$[e.state];
  return /* @__PURE__ */ o("li", { className: ba.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ba.name, children: e.name }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ba.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function s2({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ba.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(B$, { rung: a }, a.name)) });
}
const P$ = "_sheet_pw37w_2", j$ = "_title_pw37w_9", D$ = "_stage_pw37w_15", H$ = "_effects_pw37w_20", q$ = "_effect_pw37w_20", O$ = "_numeral_pw37w_31", F$ = "_effectText_pw37w_38", z$ = "_refusals_pw37w_43", W$ = "_reasons_pw37w_52", K$ = "_reason_pw37w_52", G$ = "_actions_pw37w_62", ue = {
  sheet: P$,
  title: j$,
  stage: D$,
  effects: H$,
  effect: q$,
  numeral: O$,
  effectText: F$,
  refusals: z$,
  reasons: W$,
  reason: K$,
  actions: G$
};
function U$({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(_, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function c2({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = N(), d = `${c}-refusal`, [u, m] = p(""), v = n.length > 0;
  return /* @__PURE__ */ t(ea, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ t("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ t("ol", { className: ue.effects, children: a.map((b, y) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ t("span", { className: ue.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: ue.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ t(
      Sd,
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
    v && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ t(h, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ t("ul", { className: ue.reasons, children: n.map((b, y) => /* @__PURE__ */ t("li", { className: ue.reason, id: y === 0 ? d : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ t(U$, { refused: v, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ t(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const V$ = "_list_1rowi_2", Y$ = "_path_1rowi_7", X$ = "_head_1rowi_21", J$ = "_label_1rowi_28", Q$ = "_consequence_1rowi_35", Z$ = "_ask_1rowi_36", Qe = {
  list: V$,
  path: Y$,
  head: X$,
  label: J$,
  consequence: Q$,
  ask: Z$
}, Ja = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function zt(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Wt(e) {
  return e ? "primary" : "secondary";
}
function e0({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(_, { variant: Wt(a), size: "sm", onClick: () => n(e.kind), children: Ja[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(_, { variant: Wt(a), size: "sm", disabled: !0, describedBy: r, children: Ja[e.kind] }),
    /* @__PURE__ */ t("span", { className: Qe.ask, id: r, children: e.askInstead })
  ] });
}
function a0({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Qe.path, "data-allowed": e.allowed, "data-role": zt(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Qe.head, children: [
      /* @__PURE__ */ t("span", { className: Qe.label, children: e.title ?? Ja[e.kind] }),
      /* @__PURE__ */ t(h, { role: zt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: Qe.consequence, children: e.consequence }),
    /* @__PURE__ */ t(e0, { path: e, primary: a, onChoose: n })
  ] });
}
function d2({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: Qe.list, children: e.map((n, r) => /* @__PURE__ */ t(a0, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const t0 = "_list_1m7i0_2", n0 = "_item_1m7i0_6", r0 = "_node_1m7i0_18", l0 = "_body_1m7i0_24", o0 = "_head_1m7i0_30", i0 = "_stage_1m7i0_36", s0 = "_version_1m7i0_41", c0 = "_sentence_1m7i0_49", d0 = "_meta_1m7i0_54", Ne = {
  list: t0,
  item: n0,
  node: r0,
  body: l0,
  head: o0,
  stage: i0,
  version: s0,
  sentence: c0,
  meta: d0
}, u0 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function m0({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ne.head, children: [
    /* @__PURE__ */ t("span", { className: Ne.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: Ne.version, title: e.version, children: e.version }) : null
  ] });
}
function h0({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ne.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${Ne.node} ward-history-node`, children: /* @__PURE__ */ t(Be, { size: 9, kind: u0[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ne.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(m0, { entry: e }),
      /* @__PURE__ */ t("span", { className: Ne.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ne.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function u2({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${Ne.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(h0, { entry: a }, a.stage + String(n))) });
}
const w0 = "_thread_1e70p_3", f0 = "_turn_1e70p_8", _0 = "_who_1e70p_27", v0 = "_body_1e70p_32", pa = {
  thread: w0,
  turn: f0,
  who: _0,
  body: v0
}, lr = Me(!1);
function m2({ children: e, density: a }) {
  return /* @__PURE__ */ t(lr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${pa.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function h2({ turn: e }) {
  if (!Ie(lr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${pa.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${pa.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${pa.body} ward-chat-body`, children: e.body })
  ] });
}
const b0 = "_list_yiolt_3", p0 = "_row_yiolt_7", g0 = "_label_yiolt_20", y0 = "_n_yiolt_26", N0 = "_cause_yiolt_33", na = {
  list: b0,
  row: p0,
  label: g0,
  n: y0,
  cause: N0
};
function k0(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const $0 = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function C0({ row: e, formatNumber: a }) {
  return k0(e), /* @__PURE__ */ o("li", { className: `${na.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(Be, { size: 8, ...$0[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: na.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${na.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(S0, { cause: e.cause })
  ] });
}
function S0({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${na.cause} ward-healthrow-cause`, children: e }) : null;
}
function w2({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ t("ul", { className: `${na.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(C0, { row: n, formatNumber: a }, n.label)) });
}
const R0 = "_root_1jxwp_2", T0 = {
  root: R0
};
function f2({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: T0.root, "data-density": l, children: [
    /* @__PURE__ */ t(Da, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const x0 = "_row_dhbre_3", L0 = "_key_dhbre_13", A0 = "_stack_dhbre_24", E0 = "_value_dhbre_32", I0 = "_evidence_dhbre_39", M0 = "_mark_dhbre_47", Ye = {
  row: x0,
  key: L0,
  stack: A0,
  value: E0,
  evidence: I0,
  mark: M0
};
function B0({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(rt, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function _2({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ye.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Ye.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ye.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Ye.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Ye.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Ye.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(B0, { state: e.state }) })
  ] });
}
const P0 = "_cell_gh2sd_2", j0 = {
  cell: P0
}, D0 = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function H0(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function q0(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function O0(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: H0(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function F0(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function v2({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  q0(e, n);
  const r = F0(e);
  return /* @__PURE__ */ t(
    qd,
    {
      label: "Rejection routing",
      columns: D0,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: j0.cell, "data-norerun": l.noRerun ? !0 : void 0, children: O0(l, i) }),
      empty: a ?? /* @__PURE__ */ t(Rm, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const z0 = "_row_1f2re_2", W0 = "_title_1f2re_12", K0 = "_turns_1f2re_18", G0 = "_waiting_1f2re_19", U0 = "_resolved_1f2re_20", V0 = "_activity_1f2re_21", Y0 = "_cost_1f2re_28", X0 = "_link_1f2re_29", J0 = "_tableLink_1f2re_47", Q0 = "_tableRecord_1f2re_48", Z0 = "_tableRow_1f2re_59", eC = "_tableTitle_1f2re_71", aC = "_tableResolved_1f2re_76", tC = "_tableMeta_1f2re_87", nC = "_tableCost_1f2re_94", rC = "_tableActivity_1f2re_95", lC = "_tableState_1f2re_105", H = {
  row: z0,
  title: W0,
  turns: K0,
  waiting: G0,
  resolved: U0,
  activity: V0,
  cost: Y0,
  link: X0,
  tableLink: J0,
  tableRecord: Q0,
  tableRow: Z0,
  tableTitle: eC,
  tableResolved: aC,
  tableMeta: tC,
  tableCost: nC,
  tableActivity: rC,
  tableState: lC
}, or = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function oC(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function iC(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function sC(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const cC = { duplicate: "Closed · duplicate" };
function dC({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(Ee, { className: H.tableMeta, text: `waiting on ${e}` });
}
function uC({ value: e }) {
  return /* @__PURE__ */ t("td", { className: H.tableCost, children: e === void 0 ? null : re(e) });
}
function mC({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${H.tableRecord} ward-target`, href: O(e.href), children: `→ ${e.key}` });
}
function hC({ session: e, href: a }) {
  const n = or[e.state];
  return /* @__PURE__ */ o("tr", { className: H.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: H.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${H.tableLink} ward-target`, href: O(a), children: /* @__PURE__ */ t(Ee, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: H.tableMeta, children: iC(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: H.tableResolved, children: [
      sC(e.resolved),
      /* @__PURE__ */ t(dC, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(uC, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: H.tableActivity, children: oC(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: H.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: cC[e.state] ?? n.label }),
      /* @__PURE__ */ t(mC, { link: e.link })
    ] }) })
  ] });
}
function wC({ session: e }) {
  const a = or[e.state];
  return /* @__PURE__ */ o("div", { className: H.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t(Ee, { className: H.title, text: e.title }),
    /* @__PURE__ */ t("span", { className: H.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t(Ee, { className: H.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: H.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: H.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : re(e.cost) }),
    /* @__PURE__ */ t("span", { className: H.activity, children: de(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: H.link, href: O(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function b2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(hC, { session: e.session, href: e.href }) : /* @__PURE__ */ t(wC, { session: e.session });
}
const fC = "_block_1yy2v_3", _C = "_list_1yy2v_9", vC = "_line_1yy2v_14", Qa = {
  block: fC,
  list: _C,
  line: vC
}, bC = { warn: "warning", ok: "ok" };
function pC({ kind: e }) {
  const a = bC[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function gC({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Qa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(pC, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function p2({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${Qa.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: Qa.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(gC, { line: n }, `${r}-${n.text}`)) }) });
}
const yC = "_band_tt7hp_1", NC = "_head_tt7hp_8", kC = "_cell_tt7hp_19", $C = "_index_tt7hp_35", CC = "_title_tt7hp_42", SC = "_note_tt7hp_48", RC = "_cellTitle_tt7hp_53", TC = "_cellBody_tt7hp_58", xC = "_tag_tt7hp_64", pe = {
  band: yC,
  head: NC,
  cell: kC,
  index: $C,
  title: CC,
  note: SC,
  cellTitle: RC,
  cellBody: TC,
  tag: xC
}, Kt = 4;
function g2({ index: e, title: a, note: n, cells: r }) {
  if (r.length !== Kt)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Kt}-cell grid`);
  return /* @__PURE__ */ o("section", { className: pe.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: pe.head, children: [
      /* @__PURE__ */ t("span", { className: pe.index, children: e }),
      /* @__PURE__ */ t("span", { className: pe.title, children: a }),
      /* @__PURE__ */ t("span", { className: pe.note, children: n })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: pe.cell, children: [
      /* @__PURE__ */ t("span", { className: pe.cellTitle, children: l.title }),
      /* @__PURE__ */ t("span", { className: pe.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ t("span", { className: pe.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  qC as ACCENT_PRESETS,
  oS as ActionStack,
  r2 as ActivityConsole,
  VC as AdminIcon,
  Ff as AgentCard,
  YC as AppShell,
  FS as AppearanceStrip,
  g2 as Band,
  nS as BarChart,
  sh as BoardColumn,
  yS as BoardFootnote,
  NS as BoardHeader,
  GC as BoardIcon,
  hS as BoardScroller,
  _ as Btn,
  HC as CHIP_ROLES,
  Kn as CREDENTIAL_COLUMNS,
  tS as Callout,
  zS as CapabilityRow,
  h2 as ChatMessage,
  Zt as Checkbox,
  h as Chip,
  Ee as ClampText,
  l2 as ClarificationRow,
  ES as ClauseRuleRow,
  AS as ClauseRules,
  Cn as ColourLadder,
  WS as ComponentRow,
  o2 as Composer,
  $S as ConfigRow,
  kS as ConfigRowHead,
  lt as ConnectionMark,
  n2 as ConsoleAnnounceProvider,
  m2 as Conversation,
  Sd as CostMeter,
  GS as CredentialRow,
  KS as CredentialRowHead,
  i2 as CriteriaList,
  oi as Crumb,
  OC as DENSITIES,
  w2 as DeliveryHealth,
  _S as DeniedState,
  MS as DryRunRail,
  Rm as EmptyState,
  US as EnvCard,
  M as Field,
  fS as FilteredEmpty,
  uS as FormStack,
  Da as GateChecklist,
  s2 as GateLadder,
  qd as Grid,
  PS as HandoffRuleRow,
  BS as HandoffRules,
  KC as HomeIcon,
  CS as ItemDrawer,
  VS as KeyPanel,
  Sr as LIVE_EVENT_TYPES,
  df as LegacyBoardColumn,
  RS as LegacyBoardHeader,
  TS as LegacyConfigRow,
  LS as LegacyItemDrawer,
  tf as LegacyOverCapNote,
  xS as LegacyPreviewRail,
  Nn as LegacyWorkCard,
  Se as LiveIndicator,
  vS as LoadFailed,
  gS as Loading,
  Jn as MCP_SERVER_COLUMNS,
  rt as Mark,
  XS as MarkUpload,
  Be as Marker,
  QS as McpServerRow,
  JS as McpServerRowHead,
  JC as Menu,
  XC as MenuButton,
  jS as NewStreamModal,
  Lm as OverCapNote,
  ea as Overlay,
  IS as PARTIAL_STEP_REASON,
  Qn as POLICY_CHIP_WIDTH,
  sS as PageFrame,
  aS as PageHeader,
  rS as PlainList,
  ZS as PolicyRow,
  SS as PreviewRail,
  za as ROLE_MATRIX_COLUMNS,
  jn as RULE_ACTIONS,
  _n as Radio,
  f2 as ReadyChecklist,
  dS as RecordSection,
  c2 as RequeueSheet,
  d2 as ResolveBlock,
  _2 as ResolvedFieldRow,
  e2 as RoleMatrixRow,
  v2 as RoutingTable,
  DS as RuleRow,
  a2 as RunbookSteps,
  Cr as STREAM_STEPS,
  mS as SectionBand,
  xt as SectionHeader,
  wn as SegmentedControl,
  sn as Select,
  b2 as SessionRow,
  eS as Sidebar,
  HS as StageColumn,
  wS as StageGrid,
  u2 as StageHistory,
  kb as StageListEditor,
  bS as StaleStrip,
  Ba as StatStrip,
  qS as StreamRow,
  UC as StudioIcon,
  cS as SubjectRail,
  We as Switch,
  ZC as TabLinks,
  lS as TableHead,
  QC as Tabs,
  BC as ThemeProvider,
  OS as ToolRow,
  iS as TopBar,
  Fu as Tree,
  pn as TreeRow,
  p2 as TypedInputBlock,
  ro as UNSAFE_HREF,
  t2 as ValidationList,
  IC as VisibilityProvider,
  MC as Visible,
  DC as WARD_VERSION,
  ja as WorkCard,
  pS as WriteUnavailableStrip,
  oC as agoSince,
  wr as clock,
  qb as colourStatus,
  ae as count,
  ce as duration,
  Za as elapsed,
  jC as eventSourceTransport,
  La as isStreamStep,
  Aa as isValidatedStreamStep,
  b_ as ladderValidation,
  d1 as mcpConnectionChip,
  s1 as mcpToolName,
  re as money,
  we as ms,
  gn as ordered,
  Vt as ratio,
  Ly as restartLabel,
  O as safeHref,
  de as stamp,
  et as stream,
  zC as streamChip,
  Ma as streamChipProps,
  ve as streamColour,
  Tr as streamHex,
  FC as streamVars,
  fa as useBorderFlash,
  Nr as useFocusTrap,
  WC as useLiveFeed,
  PC as useReturnFocus,
  xa as useRovingTabindex,
  at as useTicker,
  fr as useVisible,
  W as v,
  YS as validateMark,
  ca as validatedStep,
  Xt as validatedStreamSteps
};
