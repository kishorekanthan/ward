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
function EC({ hidden: e, children: a }) {
  const n = Gt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Yt.Provider, { value: n, children: a });
}
function fr(e) {
  return !Ie(Yt).has(e);
}
function IC({ id: e, children: a, fallback: n = null }) {
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
function MC({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
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
function BC(e, a = !0) {
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
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const m = d[0], v = l.current;
    l.current = !1, n(m), v && ((b = r.current.get(m)) == null || b.focus());
  });
  const i = Q((d) => n(d), []), s = Q((d) => {
    var m;
    n(d), (m = r.current.get(d)) == null || m.focus();
  }, []), c = Q(
    (d) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const v = Math.max(0, m.indexOf(a)), b = $r(d.key, e);
      b !== void 0 ? (d.preventDefault(), s(m[kr(v + b, 0, m.length - 1)])) : d.key === "Home" ? (d.preventDefault(), s(m[0])) : d.key === "End" && (d.preventDefault(), s(m[m.length - 1]));
    },
    [a, s, e]
  ), u = Q(
    (d) => ({
      tabIndex: d === a ? 0 : -1,
      ref: (m) => {
        m ? r.current.set(d, m) : (r.current.delete(d), d === a && (l.current = !0));
      },
      onFocus: () => n(d),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: c }, itemProps: u, setActive: i };
}
const PC = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, jC = "0.2.0", DC = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Cr = [1, 2, 3, 4, 5, 6], Xt = [1, 2, 3], Sr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], HC = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], OC = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], W = {
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
function qC(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function FC(e) {
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
function zC(e, a) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = w(/* @__PURE__ */ new Map()), c = w(0), u = w(""), d = w(0), m = w(null), v = w(0), b = w(0), y = w(!1), E = w("reconnecting"), B = Q((R) => {
    E.current = R, r(R);
  }, []), oe = Q(() => {
    c.current = Date.now();
  }, []), Re = Q((R) => {
    for (const [G, be] of s.current)
      (be === "*" || R.itemKey === be) && G(R);
  }, []), te = Q(() => {
    m.current = a(e, { lastEventId: u.current }, {
      onEvent: (R, G, be) => {
        const Pe = Er(R, G, be);
        Pe !== null && (Pe.id && (u.current = Pe.id), oe(), y.current = !1, B("live"), i(Pe.at), Re(Pe));
      },
      onOpen: () => {
        d.current = 0, y.current = !1, oe(), B("live");
      },
      onError: () => {
        var G;
        (G = m.current) == null || G.close(), m.current = null, y.current = !0, E.current !== "stale" && B("reconnecting");
        const R = Math.min(we.reconnectBase * 2 ** d.current, we.reconnectMax);
        d.current += 1, v.current = window.setTimeout(te, R);
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
const Hr = "_app_1m4se_1", Or = "_side_1m4se_30", qr = "_sideTop_1m4se_42", Fr = "_sideBody_1m4se_56", zr = "_iconRail_1m4se_67", Wr = "_railItem_1m4se_76", Kr = "_railIcon_1m4se_97", Gr = "_railDot_1m4se_102", Ur = "_railLetter_1m4se_108", Vr = "_main_1m4se_113", Yr = "_rail_1m4se_76", Xr = "_page_1m4se_131", Jr = "_headerRow_1m4se_140", Qr = "_sidebarToggle_1m4se_147", Zr = "_headerSlot_1m4se_152", el = "_drawerSide_1m4se_157", al = "_root_1m4se_193", tl = "_topbar_1m4se_200", nl = "_mark_1m4se_211", rl = "_brand_1m4se_218", ll = "_tagline_1m4se_224", ol = "_identity_1m4se_230", il = "_tools_1m4se_231", sl = "_nav_1m4se_241", cl = "_metadata_1m4se_248", dl = "_actor_1m4se_263", ul = "_detail_1m4se_264", ml = "_content_1m4se_324", hl = "_toolsPanel_1m4se_340", wl = "_skip_1m4se_366", $ = {
  app: Hr,
  side: Or,
  sideTop: qr,
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
const Al = "_scrim_18idy_2", El = "_drawer_18idy_10", Il = "_sheet_18idy_14", Ml = "_modal_18idy_18", Bl = "_panel_18idy_23", Pl = "_start_18idy_39", jl = "_header_18idy_62", Dl = "_title_18idy_70", Hl = "_body_18idy_74", Ol = "_close_18idy_101", ke = {
  scrim: Al,
  drawer: El,
  sheet: Il,
  modal: Ml,
  panel: Bl,
  start: Pl,
  header: jl,
  title: Dl,
  body: Hl,
  close: Ol
}, ql = Me(null), ga = [], ya = /* @__PURE__ */ new Map();
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
      var d, m;
      const u = yt(c);
      Vl(c), r.current = null, u && ((m = (d = l.current ?? s) == null ? void 0 : d.focus) == null || m.call(d));
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
  const a = Ie(ql);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = w(null), n = w(null), r = N(), l = ao(e.container), i = Ea("(min-width: 768px)"), s = Xl(e.kind, i), c = Jl(e, r), u = Nr(n), d = Yl(a, l, e.returnFocusTo), m = Q(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return S(() => {
    var v, b;
    d() && ((b = (v = n.current) == null ? void 0 : v.querySelector("button")) == null || b.focus());
  }, [d]), S(() => {
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
            onKeyDown: (v) => d() && u.onKeyDown(v),
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
function q(e) {
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
function WC() {
  return /* @__PURE__ */ t(sa, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function KC() {
  return /* @__PURE__ */ o(sa, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function GC() {
  return /* @__PURE__ */ o(sa, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function UC() {
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
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: q(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
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
  const s = r != null, c = po(), u = No(i, c.narrow), d = l ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(s), "data-collapsed": String(u.collapsed), children: [
    !c.narrow && /* @__PURE__ */ t(So, { sidebar: e, label: d, iconRail: i, fold: u }),
    /* @__PURE__ */ o("main", { className: $.main, children: [
      /* @__PURE__ */ t(go, { header: a, label: d, drawer: c }),
      /* @__PURE__ */ t("div", { className: $.page, children: n })
    ] }),
    s && /* @__PURE__ */ t("div", { className: $.rail, children: r }),
    /* @__PURE__ */ t(yo, { sidebar: e, label: d, drawer: c })
  ] });
}
function To({ destinations: e, active: a }) {
  const n = w(null);
  return ia(n, e.length), tt(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t("nav", { ref: n, className: $.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ t("a", { href: q(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
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
function VC(e) {
  return Bo(e) ? /* @__PURE__ */ t(Ro, { ...e }) : /* @__PURE__ */ t(Mo, { ...e });
}
function Ia(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Po = "_root_197jc_2", jo = "_row_197jc_8", Do = "_box_197jc_14", Ho = "_label_197jc_21", Oo = "_lockedNote_197jc_26", qo = "_consequence_197jc_34", Fo = "_sample_197jc_69", He = {
  root: Po,
  row: jo,
  box: Do,
  label: Ho,
  lockedNote: Oo,
  consequence: qo,
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
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${je.link} ward-target`, href: q(n.href), children: n.label }) : n.label : /* @__PURE__ */ t("span", { className: je.current, "aria-current": "page", children: n.label })
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
function kt(e, a, n) {
  const r = ui(e, a), l = di(r.edges, r.box, r.view, n);
  Object.assign(e.style, { left: _a(l.left - r.box.left), top: _a(l.top - r.box.top), maxHeight: _a(l.maxHeight) });
}
function mi(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function nn(e, a, n = "start") {
  ra(() => {
    const r = a.current, l = e.current;
    if (!r || !l) return;
    const i = mi(r), s = () => kt(r, l, n);
    return window.addEventListener("scroll", s, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", s, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), ra(() => {
    a.current && e.current && kt(a.current, e.current, n);
  });
}
const hi = "_root_axvxm_2", wi = "_trigger_axvxm_7", fi = "_value_axvxm_32", _i = "_menu_axvxm_50", vi = "_find_axvxm_72", bi = "_list_axvxm_88", pi = "_option_axvxm_99", gi = "_check_axvxm_118", yi = "_empty_axvxm_129", fe = {
  root: hi,
  trigger: wi,
  value: fi,
  menu: _i,
  find: vi,
  list: bi,
  option: pi,
  check: gi,
  empty: yi
}, Ni = 7;
function ki(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function $t(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function $i(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => $t(e.options, e.value)), u = (d) => {
    var m;
    Ut(() => r(!1)), d && ((m = a.current) == null || m.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: ki(e.options, l),
    findable: e.options.length > Ni,
    show: () => {
      e.disabled || (i(""), c($t(e.options, e.value)), r(!0));
    },
    close: u,
    to: c,
    pick: (d) => {
      var m;
      d && d.option.value !== e.value && ((m = e.onChange) == null || m.call(e, d.option.value)), u(!0);
    },
    find: (d) => {
      i(d), c(0);
    }
  };
}
function Ci(e, a) {
  const n = w(!1);
  return S(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function Si(e) {
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
function Ri(e) {
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
const Ti = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function xi(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      Ti.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function Li({ entry: e, at: a, menu: n, ids: r, value: l }) {
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
function Ai({ menu: e, ids: a, focusRef: n }) {
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
function Ei({ props: e, menu: a, ids: n, focusRef: r, trigger: l }) {
  const i = Si(a), s = w(null);
  nn(l, s);
  const c = (u) => {
    an(u) && i(u.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: fe.menu, children: [
    a.findable && /* @__PURE__ */ t(Ai, { menu: a, ids: n, focusRef: r }),
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
        onKeyDown: ln(a, Ri(a), c),
        children: a.entries.map((u, d) => /* @__PURE__ */ t(Li, { entry: u, at: d, menu: a, ids: n, value: e.value }, u.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: fe.empty, children: "No match" })
  ] });
}
function Ii(e, a) {
  const n = e.open ? nt(e, a) : void 0;
  S(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function on(...e) {
  return e.filter(Boolean).join(" ");
}
function Mi(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function Bi({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
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
      ...xi(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: fe.value, "data-placeholder": i || void 0, children: Mi(e) })
    }
  );
}
function sn(e) {
  const a = N(), n = { list: `${a}-list`, value: `${a}-value`, option: (u) => `${a}-option-${u}` }, r = w(null), l = w(null), i = w(null), s = $i(e, l), c = Ci(s.open, i);
  return en(s.open, r, () => s.close(!1)), Ii(s, n), /* @__PURE__ */ o("div", { ref: r, className: on(fe.root, e.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(Bi, { props: e, menu: s, ids: n, trigger: l, wantFocus: c }),
    e.name && /* @__PURE__ */ t("input", { type: "hidden", name: e.name, value: e.value }),
    s.open && /* @__PURE__ */ t(Ei, { props: e, menu: s, ids: n, focusRef: i, trigger: l })
  ] });
}
const Pi = "_field_djnju_2", ji = "_label_djnju_8", Di = "_labelHidden_djnju_15", Hi = "_control_djnju_25", Oi = "_mono_djnju_45", qi = "_area_djnju_50", Fi = "_invalid_djnju_57", Ae = {
  field: Pi,
  label: ji,
  labelHidden: Di,
  control: Hi,
  mono: Oi,
  area: qi,
  invalid: Fi
}, zi = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, cn = (e) => `${e}-label`;
function Wi({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? zi : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function Ki({ props: e, controlProps: a, cls: n }) {
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
function Gi({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const Ui = { input: Wi, select: Ki, textarea: Gi };
function Vi(e, a, n) {
  const r = Ui[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function Yi(e, a, n) {
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
function Xi(e) {
  const a = e.mono ? [Ae.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [Ae.area] : [];
  return [Ae.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function Ji(e) {
  return e ? `${Ae.label} ${Ae.labelHidden} ward-field-label` : `${Ae.label} ward-field-label`;
}
function M(e) {
  const a = N(), n = `${a}-msg`, r = Yi(e, a, n), l = Xi(e);
  return /* @__PURE__ */ o("div", { className: `${Ae.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: cn(a), className: Ji(e.labelHidden), htmlFor: a, children: e.label }),
    Vi(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${Ae.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Qi = "_root_1gft5_2", Zi = "_trigger_1gft5_9", es = "_panel_1gft5_33", as = "_menu_1gft5_52", ts = "_group_1gft5_57", ns = "_heading_1gft5_62", rs = "_item_1gft5_68", ls = "_separator_1gft5_94", os = "_footer_1gft5_100", Ce = {
  root: Qi,
  trigger: Zi,
  panel: es,
  menu: as,
  group: ts,
  heading: ns,
  item: rs,
  separator: ls,
  footer: os
}, dn = Me(null);
function is(e, a) {
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
const ss = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function cs(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const n = ss.get(a.key);
      n && (a.preventDefault(), e.show(n));
    },
    onKeyUp: (a) => {
      a.key === " " && a.preventDefault();
    }
  };
}
function ds(...e) {
  return e.filter(Boolean).join(" ");
}
function YC(e) {
  const a = N(), n = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = w(null), l = w(null), i = is(e.defaultOpen === !0, l);
  return en(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: ds(Ce.root, e.className), "data-ward-menu": "", children: [
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
        ...cs(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ t(dn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function us(e) {
  let a = 0;
  const n = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function ms(e) {
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
const hs = (e) => e.split("").every((a) => a === e[0]);
function ws(e, a, n) {
  const r = hs(n), l = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const u = un(i + c, e.length);
    if (s(e[u])) return u;
  }
  return -1;
}
function fs(e) {
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
function _s(e, a) {
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
function vs(e, a) {
  const n = w(!1), r = tn(), l = _s(e, a), i = (s) => {
    an(s) && e.focus(ws(e.items, e.current(), r(s.key)));
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
function bs(e, a) {
  const { start: n, request: r } = a, l = w(e);
  l.current = e, S(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? Je(i, -1, 1) : Je(i, i.length, -1));
  }, [n, r]);
}
function ps({ row: e, nav: a, popup: n }) {
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
    ...ps(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: q(a.href), ...r, children: a.label }) : /* @__PURE__ */ t("button", { type: "button", ...r, children: a.label });
}
function gs({ heading: e, rows: a, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: Ce.group, children: [
    /* @__PURE__ */ t("div", { id: l, className: Ce.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(mn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function ys({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: Ce.separator }) : e.kind === "group" ? /* @__PURE__ */ t(gs, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(mn, { row: e.row, nav: a, popup: n });
}
function Ns() {
  const e = Ie(dn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function XC({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = Ns(), c = w(null);
  nn(s, c, n);
  const u = us(e), d = fs(u.flatMap(ms).map((v) => v.item)), m = vs(d, r);
  return bs(d, r), /* @__PURE__ */ o("div", { ref: c, className: Ce.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: l, "aria-labelledby": i, className: Ce.menu, ...m, children: u.map((v, b) => /* @__PURE__ */ t(ys, { block: v, nav: d, popup: r }, b)) }),
    a && /* @__PURE__ */ t("p", { className: Ce.footer, children: a })
  ] });
}
const ks = "_strip_1nfwi_2", $s = "_tab_1nfwi_32", Cs = "_count_1nfwi_68", la = {
  strip: ks,
  tab: $s,
  count: Cs
}, Na = 7;
function Ss(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
function hn(e) {
  return `${la.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function JC({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l = 1 }) {
  if (e.length > Na) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${Na} — the set is fixed`);
  const i = xa({ orientation: "horizontal" }), s = Ss(e, a);
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
      children: e.map((u, d) => /* @__PURE__ */ o(
        "button",
        {
          id: `tab-${u.id}`,
          type: "button",
          role: "tab",
          className: `${la.tab} ward-tab`,
          "aria-selected": u.id === a,
          "aria-controls": `panel-${u.id}`,
          onClick: () => n(u.id),
          ...i.itemProps(d),
          children: [
            u.label,
            u.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
              " ",
              /* @__PURE__ */ t("span", { className: la.count, children: `· ${u.count}` })
            ] })
          ]
        },
        u.id
      ))
    }
  );
}
function QC({ links: e, active: a, label: n, level: r = 1 }) {
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
const Rs = "_root_v56ff_3", Ts = "_segment_v56ff_9", Ct = {
  root: Rs,
  segment: Ts
};
function wn({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = xa({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((u) => u.value === a));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ t("div", { className: `${Ct.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((u, d) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "radio",
      className: Ct.segment,
      "aria-checked": u.value === a,
      disabled: l,
      "aria-describedby": i,
      onClick: () => n(u.value),
      ...s.itemProps(d),
      children: u.label
    },
    u.value
  )) });
}
const xs = "_sidebar_s9o1j_3", Ls = "_brand_s9o1j_9", As = "_mark_s9o1j_17", Es = "_word_s9o1j_24", Is = "_nav_s9o1j_30", Ms = "_navItem_s9o1j_39", Bs = "_footLink_s9o1j_49", Ps = "_group_s9o1j_58", js = "_groupName_s9o1j_65", Ds = "_agents_s9o1j_81", Hs = "_agent_s9o1j_81", Os = "_root_s9o1j_96", qs = "_agentTop_s9o1j_105", Fs = "_dot_s9o1j_112", zs = "_agentName_s9o1j_124", Ws = "_agentMeta_s9o1j_138", Ks = "_foot_s9o1j_49", Gs = "_footName_s9o1j_150", Us = "_footLinks_s9o1j_157", Vs = "_linkBrand_s9o1j_184", Ys = "_label_s9o1j_205", Xs = "_note_s9o1j_210", Js = "_footer_s9o1j_226", x = {
  sidebar: xs,
  brand: Ls,
  mark: As,
  word: Es,
  nav: Is,
  navItem: Ms,
  new: "_new_s9o1j_48",
  footLink: Bs,
  group: Ps,
  groupName: js,
  agents: Ds,
  agent: Hs,
  root: Os,
  agentTop: qs,
  dot: Fs,
  agentName: zs,
  agentMeta: Ws,
  foot: Ks,
  footName: Gs,
  footLinks: Us,
  linkBrand: Vs,
  label: Ys,
  note: Xs,
  footer: Js
};
function Qs({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: x.agent,
      href: q(e.href),
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
function Zs({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ t("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${x.footLink} ward-target`, href: q(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function ec({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: x.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: x.brand, children: [
      /* @__PURE__ */ t("span", { className: x.mark }),
      /* @__PURE__ */ t("span", { className: x.word, children: e })
    ] }),
    /* @__PURE__ */ t("div", { className: x.nav, children: a.map((s) => /* @__PURE__ */ t("a", { className: x.navItem, href: q(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: x.group, children: [
      /* @__PURE__ */ o("span", { className: x.groupName, children: [
        n,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ t("a", { className: x.new, href: q(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ t(Qs, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(Zs, { shared: i })
  ] });
}
function ac(e) {
  return e.destinations ?? e.items ?? [];
}
function tc({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.linkBrand, children: e });
}
function nc({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.footer, children: e });
}
function rc({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: q(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: x.note, children: e.note })
  ] });
}
function lc(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(tc, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: ac(e).map((a) => /* @__PURE__ */ t(rc, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(nc, { children: e.children })
  ] });
}
function oc(e) {
  return "agents" in e;
}
function ZC(e) {
  return oc(e) ? /* @__PURE__ */ t(ec, { ...e }) : /* @__PURE__ */ t(lc, { ...e });
}
const ic = "_mark_wlgi8_3", sc = {
  mark: ic
}, cc = { met: "✓", unmet: "", failed: "✕" };
function rt({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: sc.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: cc[e]
    }
  );
}
const dc = "_marker_br9fi_2", uc = {
  marker: dc
}, mc = {
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
}, hc = { running: " ward-running" };
function Be({ size: e, kind: a, label: n }) {
  const r = { "--marker": mc[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${uc.marker} ward-marker ward-marker--${a}${hc[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const wc = "_root_ti0pq_2", fc = "_chip_ti0pq_11", _c = "_noCase_ti0pq_23", ma = {
  root: wc,
  chip: fc,
  noCase: _c
};
function vc(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function lt({ connection: e, since: a, lastEventAt: n }) {
  const r = vc(a, n), l = at(r, e === "reconnecting");
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
const bc = "_root_1cvxf_2", pc = "_context_1cvxf_12", gc = "_row_1cvxf_1", yc = "_heading_1cvxf_25", Nc = "_headingWrap_1cvxf_33", kc = "_chips_1cvxf_38", $c = "_title_1cvxf_45", Cc = "_consequence_1cvxf_55", Sc = "_actionsWrap_1cvxf_62", Rc = "_actions_1cvxf_62", Tc = "_action_1cvxf_62", xc = "_overflowPanel_1cvxf_91", Lc = "_measureClip_1cvxf_102", Ac = "_measure_1cvxf_102", Y = {
  root: bc,
  context: pc,
  row: gc,
  heading: yc,
  headingWrap: Nc,
  chips: kc,
  title: $c,
  consequence: Cc,
  actionsWrap: Sc,
  actions: Rc,
  action: Tc,
  overflowPanel: xc,
  measureClip: Lc,
  measure: Ac
};
function Ec({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(Ee, { as: "h1", className: Y.title, text: e }) : /* @__PURE__ */ t("h1", { className: Y.title, children: e });
}
function Ic({ title: e, consequence: a, consequenceHint: n, density: r }) {
  return /* @__PURE__ */ o("div", { className: Y.heading, children: [
    /* @__PURE__ */ t(Ec, { title: e, density: r }),
    a && /* @__PURE__ */ t("p", { className: Y.consequence, title: n, children: a })
  ] });
}
function Ua({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: Y.action, "data-action": "", children: a }, n));
}
function St({ disclosure: e }) {
  return /* @__PURE__ */ t(_, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Mc({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(St, { disclosure: l }) : a ? [/* @__PURE__ */ t(St, { disclosure: l }, "more"), /* @__PURE__ */ t(Ua, { actions: e }, "actions")] : /* @__PURE__ */ t(Ua, { actions: e });
}
function Bc(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Pc({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: Y.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ua, { actions: e }) });
}
function jc(e, a) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var u, d;
    l(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function Dc({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Y.context, children: [
    /* @__PURE__ */ t(oi, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: Y.chips, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] });
}
function Hc(...e) {
  return e.some((a) => a === null);
}
function Oc(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function qc(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + Oc(e);
}
function Fc(e, a, n, r, l) {
  if (l === 0 || Hc(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], u = Math.max(0, e.clientWidth - qc(e, i));
  return c.offsetWidth > u || s.scrollWidth > s.clientWidth + 1;
}
function zc(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Wc(e) {
  return sr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Kc(e, a) {
  return a.length === 0 && e.length === 1 && Wc(e[0]);
}
function Gc(e, a) {
  const n = w(null), r = w(null), l = w(null), i = w(null), [s, c] = p(!1);
  return S(() => {
    const u = n.current;
    if (!zc(u)) return;
    const d = () => c(Fc(u, r.current, l.current, i.current, e.length)), m = new ResizeObserver(d);
    return m.observe(u), i.current && m.observe(i.current), d(), () => m.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function Uc({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: Y.measureClip, children: /* @__PURE__ */ o("div", { className: Y.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function Vc({ connection: e }) {
  return e ? /* @__PURE__ */ t(lt, { connection: e.connection, since: e.since }) : null;
}
function eS({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: u, density: d = "page" }) {
  const { rowRef: m, headingRef: v, actionsRef: b, measureRef: y, collapsed: E } = Gc(i, Kc(i, s)), B = s.length > 0, { disclosure: oe, close: Re } = jc(E || B, b), te = Bc(s, i, E, u);
  return /* @__PURE__ */ o("header", { className: Y.root, "data-density": d, children: [
    /* @__PURE__ */ t(Dc, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Y.row, ref: m, children: [
      /* @__PURE__ */ t("div", { ref: v, className: Y.headingWrap, children: /* @__PURE__ */ t(Ic, { title: n, consequence: r, consequenceHint: l, density: d }) }),
      /* @__PURE__ */ o("div", { className: Y.actionsWrap, children: [
        /* @__PURE__ */ t(Vc, { connection: c }),
        /* @__PURE__ */ t("div", { className: Y.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ t(Mc, { actions: i, hasMore: B, collapsed: E, onOverflow: u, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ t(Pc, { actions: te, disclosure: oe, onEscape: Re }),
    /* @__PURE__ */ t(Uc, { actions: i, hasMore: B, measureRef: y })
  ] });
}
const Yc = "_root_td96x_2", Xc = "_body_td96x_16", Rt = {
  root: Yc,
  body: Xc
};
function aS({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${Rt.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: Rt.body, children: n }) });
}
const Jc = "_root_bf1pc_2", Qc = "_table_bf1pc_9", Zc = "_caption_bf1pc_14", ed = "_series_bf1pc_23", ad = "_category_bf1pc_31", td = "_cell_bf1pc_39", nd = "_track_bf1pc_45", rd = "_lane_bf1pc_52", ld = "_bar_bf1pc_56", od = "_value_bf1pc_63", id = "_swatch_bf1pc_70", sd = "_empty_bf1pc_78", X = {
  root: Jc,
  table: Qc,
  caption: Zc,
  series: ed,
  category: ad,
  cell: td,
  track: nd,
  lane: rd,
  bar: ld,
  value: od,
  swatch: id,
  empty: sd
}, cd = "—", Tt = 6;
function dd(e, a) {
  if (a.length < 1 || a.length > Tt)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${Tt}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function ud(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function fn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function md(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function hd({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = md(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: X.cell, children: /* @__PURE__ */ o("span", { className: X.track, children: [
    /* @__PURE__ */ t("span", { className: X.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${X.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: X.value, children: e === null ? l : r(e) })
  ] }) });
}
function wd({ series: e }) {
  return /* @__PURE__ */ t(T, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: X.swatch, "data-step": fn(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function fd({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: X.caption, children: e }),
    /* @__PURE__ */ t("p", { className: X.empty, children: a })
  ] });
}
function _d({ title: e, categories: a, series: n, top: r, format: l = ae, categoryHead: i = "Category", missing: s = cd }) {
  return /* @__PURE__ */ t("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: X.table, children: [
    /* @__PURE__ */ t("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: X.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(wd, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: X.category, children: c }),
      n.map((d, m) => /* @__PURE__ */ t(hd, { value: d.values[u], top: r, step: fn(m, n.length), format: l, missing: s }, d.name))
    ] }, c)) })
  ] }) });
}
function tS(e) {
  dd(e.categories, e.series);
  const a = ud(e.series);
  return a === 0 ? /* @__PURE__ */ t(fd, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(_d, { ...e, top: a });
}
const vd = "_root_1bfqw_2", bd = "_figure_1bfqw_7", pd = "_of_1bfqw_13", gd = "_bar_1bfqw_18", yd = "_rows_1bfqw_38", Nd = "_row_1bfqw_38", kd = "_label_1bfqw_49", $d = "_amount_1bfqw_54", Te = {
  root: vd,
  figure: bd,
  of: pd,
  bar: gd,
  rows: yd,
  row: Nd,
  label: kd,
  amount: $d
};
function Cd({ spent: e, ceiling: a, breakdown: n }) {
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
const Sd = "_frame_9xel2_2", Rd = "_table_9xel2_6", Td = "_th_9xel2_12", xd = "_td_9xel2_13", Ld = "_sort_9xel2_48", Ad = "_row_9xel2_60", Ed = "_empty_9xel2_68", Le = {
  frame: Sd,
  table: Rd,
  th: Td,
  td: xd,
  sort: Ld,
  row: Ad,
  empty: Ed
}, Id = { asc: "ascending", desc: "descending" };
function Md(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return Id[a.direction];
}
function Bd(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: Le.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Pd(e) {
  return e === void 0 ? void 0 : { width: e };
}
function jd({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Le.th,
      style: Pd(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Md(e, a),
      children: Bd(e, n)
    }
  );
}
function Dd({ row: e, props: a }) {
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
function Hd({
  label: e,
  columns: a,
  rows: n,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: u,
  empty: d
}) {
  return n.length === 0 ? /* @__PURE__ */ t("div", { className: Le.empty, children: d }) : /* @__PURE__ */ t("div", { className: Le.frame, children: /* @__PURE__ */ o("table", { className: Le.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Le.head, children: a.map((m) => /* @__PURE__ */ t(jd, { column: m, sort: c, onSort: u }, m.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((m) => /* @__PURE__ */ t(Dd, { row: m, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: u, empty: d } }, r(m))) })
  ] }) });
}
const Od = "_list_v0s52_2", qd = {
  list: Od
};
function nS({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: qd.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Fd = "_label_1u62a_2", zd = {
  label: Fd
};
function rS({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: zd.label, children: a.header }) }, a.key)) }) });
}
const Wd = "_stack_bp6a0_2", Kd = {
  stack: Wd
};
function lS({ children: e }) {
  return /* @__PURE__ */ t("span", { className: Kd.stack, "data-ward-action-stack": "", children: e });
}
const Gd = "_set_1z0sq_2", Ud = "_legend_1z0sq_7", Vd = "_row_1z0sq_15", Yd = "_control_1z0sq_20", Xd = "_input_1z0sq_26", Jd = "_label_1z0sq_31", Qd = "_consequence_1z0sq_36", De = {
  set: Gd,
  legend: Ud,
  row: Vd,
  control: Yd,
  input: Xd,
  label: Jd,
  consequence: Qd
};
function _n({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const u = N(), d = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: De.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: De.legend, children: e }),
    a.map((m) => {
      const v = `${d}-${m.value}`, b = m.consequence ? `${v}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: De.row, children: [
        /* @__PURE__ */ o("span", { className: De.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: v,
              type: "radio",
              name: d,
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
const Zd = "_root_s12pg_2", eu = "_head_s12pg_11", au = "_note_s12pg_30", tu = "_index_s12pg_35", nu = "_dot_s12pg_39", ru = "_counter_s12pg_50", lu = "_trailing_s12pg_58", Oe = {
  root: Zd,
  head: eu,
  note: au,
  index: tu,
  dot: nu,
  counter: ru,
  trailing: lu
};
function ou({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${Oe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: Oe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function iu({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Oe.counter, "aria-hidden": "true", children: e }) : null;
}
function xt({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Oe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Oe.head, children: [
      /* @__PURE__ */ t(ou, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: Oe.note, children: n }),
    /* @__PURE__ */ t(iu, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: Oe.trailing, children: i })
  ] });
}
const su = "_strip_ww53x_2", cu = "_cell_ww53x_7", du = "_value_ww53x_12", uu = "_link_ww53x_29", mu = "_label_ww53x_49", ze = {
  strip: su,
  cell: cu,
  value: du,
  link: uu,
  label: mu
};
function hu(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const vn = (e) => `${ze.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function wu({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: ze.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: vn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${ze.label} ward-stat-label`, children: e.label })
  ] });
}
function fu({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: ze.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: vn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${ze.link} ward-stat-link`, href: q(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${ze.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Ba({ cells: e, divided: a = !1 }) {
  return hu(e), /* @__PURE__ */ t("dl", { className: `${ze.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(wu, { cell: n }, n.label) : /* @__PURE__ */ t(fu, { cell: n, href: n.href }, n.label)) });
}
const _u = "_root_1eb1u_2", vu = "_track_1eb1u_8", bu = "_thumb_1eb1u_46", pu = "_labelHidden_1eb1u_64", gu = "_label_1eb1u_64", yu = "_lockedNote_1eb1u_84", qe = {
  root: _u,
  track: vu,
  thumb: bu,
  labelHidden: pu,
  label: gu,
  lockedNote: yu
};
function Nu(e) {
  return e ? `${qe.label} ${qe.labelHidden}` : qe.label;
}
function We({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), u = `${c}switch`, d = l ? !0 : a, m = r || l;
  return /* @__PURE__ */ o("span", { className: `${qe.root} ward-switchrow`, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": d,
        "aria-label": e,
        "aria-labelledby": c,
        "aria-describedby": i,
        className: `${qe.track} ward-switch`,
        "data-on": d,
        "data-locked": l ? !0 : void 0,
        disabled: m,
        onClick: () => !m && (n == null ? void 0 : n(!d)),
        children: /* @__PURE__ */ t("span", { className: qe.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: u, className: Nu(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: qe.lockedNote, children: "always on" })
    ] })
  ] });
}
const ku = "_bar_1vp69_2", $u = "_skip_1vp69_11", Cu = "_mark_1vp69_22", Su = "_nav_1vp69_30", Ru = "_list_1vp69_34", Tu = "_select_1vp69_41", xu = "_selectTrigger_1vp69_45", Lu = "_dest_1vp69_52", Au = "_actor_1vp69_71", Eu = "_actorMark_1vp69_84", Iu = "_actorLabel_1vp69_89", Mu = "_tagline_1vp69_108", ie = {
  bar: ku,
  skip: $u,
  mark: Cu,
  nav: Su,
  list: Ru,
  select: Tu,
  selectTrigger: xu,
  dest: Lu,
  actor: Au,
  actorMark: Eu,
  actorLabel: Iu,
  tagline: Mu
};
function Bu(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Pu(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function oS({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = Pu(r);
  return /* @__PURE__ */ o("header", { className: ie.bar, children: [
    /* @__PURE__ */ t("a", { className: `${ie.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ t("span", { className: ie.mark, children: e }),
    l && /* @__PURE__ */ t("span", { className: ie.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: ie.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ t("ul", { className: ie.list, children: a.map((u) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "a",
        {
          className: `${ie.dest} ward-target`,
          href: q(u.href),
          "aria-current": u.id === n ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ t(
        sn,
        {
          className: ie.select,
          triggerClassName: ie.selectTrigger,
          "aria-label": "Destination",
          value: n,
          options: a.map((u) => ({ value: u.id, label: u.label })),
          onChange: (u) => i == null ? void 0 : i(u)
        }
      )
    ] }),
    c && /* @__PURE__ */ o("span", { className: ie.actor, children: [
      /* @__PURE__ */ t("span", { className: ie.actorLabel, children: c }),
      /* @__PURE__ */ t("span", { className: ie.actorMark, "aria-hidden": "true", children: Bu(c) })
    ] })
  ] });
}
const ju = "_tree_zzoob_2", Du = "_item_zzoob_6", Hu = "_row_zzoob_10", Ou = "_button_zzoob_22", ka = {
  tree: ju,
  item: Du,
  row: Hu,
  button: Ou
}, bn = Me(null);
function qu({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = xa({ orientation: "vertical" });
  return /* @__PURE__ */ t(bn.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: ka.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const Fu = { ArrowRight: !0, ArrowLeft: !1 };
function Lt(e) {
  return e ? !0 : void 0;
}
function zu(e, a) {
  const n = Fu[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function Wu(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function Ku(e) {
  const a = [ka.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Gu(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Uu(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Vu(e) {
  return typeof e == "string" ? e : void 0;
}
function Yu({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Xu({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function pn(e) {
  const a = Ie(bn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = Gu(e);
  return /* @__PURE__ */ o("li", { className: ka.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: Ku(e),
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
            onClick: () => Wu(e),
            onKeyDown: (r) => zu(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Uu(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: Vu(e.label), children: e.label }),
              /* @__PURE__ */ t(Yu, { value: e.detail }),
              /* @__PURE__ */ t(Xu, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const Ju = "_frame_dhc53_2", Qu = "_subjectRail_dhc53_22", Zu = "_subject_dhc53_22", em = "_rail_dhc53_42", am = "_record_dhc53_66", tm = "_recordBody_dhc53_71", nm = "_stageGrid_dhc53_120", rm = "_band_dhc53_146", lm = "_bandBody_dhc53_155", om = "_bandActions_dhc53_160", im = "_scroller_dhc53_168", sm = "_board_dhc53_194", cm = "_laneCount_dhc53_202", dm = "_lanes_dhc53_212", J = {
  frame: Ju,
  subjectRail: Qu,
  subject: Zu,
  rail: em,
  record: am,
  recordBody: tm,
  stageGrid: nm,
  band: rm,
  bandBody: lm,
  bandActions: om,
  scroller: im,
  board: sm,
  laneCount: cm,
  lanes: dm
};
function iS({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: J.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function At(e) {
  return e ? "true" : void 0;
}
function sS({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: J.subjectRail, "data-ward-subject-rail": n, "data-ruled": At(i), children: [
    /* @__PURE__ */ t("div", { className: J.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: J.rail, "data-sticky": At(l), "aria-label": r, children: a })
  ] });
}
function cS({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: J.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(xt, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: J.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(xt, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: J.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const um = "_form_1j8ub_2", mm = "_fields_1j8ub_9", hm = "_actions_1j8ub_19", Oa = {
  form: um,
  fields: mm,
  actions: hm
};
function dS({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Oa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Oa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Oa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function uS({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: J.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: J.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: J.bandActions, children: a })
  ] });
}
const wm = "(max-width: 767.98px)";
function ot({ label: e, children: a, laneCount: n, onOverflow: r }) {
  const l = w(null);
  ia(l, n ?? cr.count(a), r);
  const i = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t("div", { ref: l, className: J.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function fm({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: J.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(ot, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function _m({ lanes: e, label: a }) {
  const [n, r] = p(!1);
  return /* @__PURE__ */ o("div", { className: J.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: J.laneCount, "data-ward-board-lane-count": "", hidden: !n, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ t(ot, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ t(dr, { children: l.content }, l.id)) })
  ] });
}
function mS({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = Ea(wm);
  return n === void 0 ? /* @__PURE__ */ t(ot, { label: a, children: e }) : l ? /* @__PURE__ */ t(fm, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(_m, { lanes: n, label: a });
}
function hS({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = w(null), i = Math.max(e, 1);
  ia(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ t("div", { ref: l, className: J.stageGrid, role: "region", "aria-label": n, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const vm = "_block_vmwmz_2", bm = "_sentence_vmwmz_15", pm = "_meta_vmwmz_20", gm = "_action_vmwmz_25", ym = "_strip_vmwmz_29", Nm = "_loading_vmwmz_48", km = "_label_vmwmz_56", $m = "_counter_vmwmz_63", _e = {
  block: vm,
  sentence: bm,
  meta: pm,
  action: gm,
  strip: ym,
  loading: Nm,
  label: km,
  counter: $m
};
function Cm({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: _e.action, children: /* @__PURE__ */ t(_, { onClick: e.onClick, children: e.label }) });
}
function Pa({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: _e.sentence, children: e }),
    n,
    /* @__PURE__ */ t(Cm, { action: a })
  ] });
}
function Sm(e) {
  return /* @__PURE__ */ t(Pa, { ...e, kind: "ward-emptystate" });
}
function wS({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(Pa, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function fS(e) {
  return /* @__PURE__ */ t(Pa, { ...e });
}
function _S({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(Pa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function vS({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function bS({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function pS({ label: e, startedAt: a }) {
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
const Rm = "_note_cigdt_2", Tm = {
  note: Rm
};
function xm({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: Tm.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const Lm = "_card_11u1w_3", Am = "_hit_11u1w_31", Em = "_head_11u1w_44", Im = "_title_11u1w_51", Mm = "_meta_11u1w_56", Bm = "_fields_11u1w_57", Pm = "_who_11u1w_70", jm = "_sep_11u1w_74", Dm = "_mono_11u1w_78", Hm = "_field_11u1w_57", Om = "_last_11u1w_94", qm = "_reason_11u1w_106", Z = {
  card: Lm,
  hit: Am,
  head: Em,
  title: Im,
  meta: Mm,
  fields: Bm,
  who: Pm,
  sep: jm,
  mono: Dm,
  field: Hm,
  last: Om,
  reason: qm
}, Fm = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function zm(e, a, n) {
  const r = fa(e, "blue"), l = fa(e, "orange"), i = fa(e, "green"), s = w(/* @__PURE__ */ new Set());
  S(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (u) => {
      if (s.current.has(u.id)) return;
      s.current.add(u.id);
      const d = Fm[u.type];
      d && c[d]();
    });
  }, [r, n, i, a, l]);
}
const Wm = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Km(e, a) {
  return Wm[a](e);
}
function Gm({ item: e, connection: a }) {
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
function Um({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: Z.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function Vm({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: Z.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Ym({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: Z.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: Z.field, children: Km(e, n) }, n)) });
}
const Va = (e) => e ? !0 : void 0;
function Xm(e) {
  return { "--stream": ve(e.streamStep, "id") };
}
function Jm(e, a, n) {
  e == null || e(a, n);
}
function Qm(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Zm({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: Z.last, "data-stale": Va(a), children: n }) : null;
}
function ja(e) {
  const a = e.fields ?? [], n = e.item, r = w(null);
  zm(r, n.key, e.feed);
  const l = Qm(e.feed), i = Xm(n);
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
        /* @__PURE__ */ t("button", { type: "button", className: Z.hit, onClick: (s) => Jm(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(Um, { item: n }),
        /* @__PURE__ */ t(Ee, { as: "p", className: Z.title, text: n.title }),
        /* @__PURE__ */ t(Gm, { item: n, connection: l }),
        /* @__PURE__ */ t(Vm, { reason: n.blockedReason }),
        /* @__PURE__ */ t(Ym, { item: n, fields: a }),
        /* @__PURE__ */ t(Zm, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const eh = "_column_1j8bi_3", ah = "_head_1j8bi_21", th = "_label_1j8bi_30", nh = "_count_1j8bi_39", rh = "_list_1j8bi_53", ta = {
  column: eh,
  head: ah,
  label: th,
  count: nh,
  list: rh
};
function gn(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function lh({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: ta.head, children: [
    /* @__PURE__ */ t("h2", { className: ta.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: ta.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function oh(e) {
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
function ih({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: u }) {
  const d = N(), m = e.cap !== void 0 && a.length > e.cap, v = gn(a, r);
  return /* @__PURE__ */ o("section", { className: ta.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ t(lh, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ t(oh, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: v }),
    m && /* @__PURE__ */ t(xm, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const sh = "_foot_cs4jr_2", ch = "_note_cs4jr_13", dh = "_link_cs4jr_19", qa = {
  foot: sh,
  note: ch,
  link: dh
};
function gS({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: qa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: qa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${qa.link} ward-target`, href: q(e), children: "Configure board" })
  ] });
}
const uh = "_head_1tfi5_3", mh = "_identity_1tfi5_12", hh = "_titleRow_1tfi5_18", wh = "_title_1tfi5_18", fh = "_key_1tfi5_35", _h = "_rollup_1tfi5_45", vh = "_tools_1tfi5_53", bh = "_swatch_1tfi5_101", ph = "_mark_1tfi5_108", ye = {
  head: uh,
  identity: mh,
  titleRow: hh,
  title: wh,
  key: fh,
  rollup: _h,
  tools: vh,
  swatch: bh,
  mark: ph
}, Et = "initials:";
function gh(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function yh(e) {
  const a = [gh(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function Nh(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    yh(e)
  ] });
}
function kh(e) {
  return e.startsWith(Et) ? e.slice(Et.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function $h({ markRef: e, streamStep: a }) {
  const n = { "--stream": ve(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ye.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: kh(e) }) : /* @__PURE__ */ t("span", { className: ye.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Ch({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function yS({
  stream: e,
  rollups: a,
  connection: n,
  lastEventAt: r,
  owners: l,
  owner: i,
  onOwnerChange: s,
  onConfigure: c,
  actions: u
}) {
  return /* @__PURE__ */ o("div", { className: ye.head, children: [
    /* @__PURE__ */ o("div", { className: ye.identity, children: [
      /* @__PURE__ */ o("div", { className: ye.titleRow, children: [
        /* @__PURE__ */ t($h, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ye.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ye.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ye.rollup, "aria-live": "polite", children: Nh(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ye.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(Ch, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(_, { onClick: c, children: "Configure board" }),
      u,
      /* @__PURE__ */ t(lt, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const Sh = "_head_1sejb_14", Rh = "_line_1sejb_15", Th = "_cHandle_1sejb_36", xh = "_cName_1sejb_41", Lh = "_nameLine_1sejb_49", Ah = "_cLabel_1sejb_56", Eh = "_cCap_1sejb_61", Ih = "_cShown_1sejb_66", Mh = "_name_1sejb_49", Bh = "_noCap_1sejb_88", Ph = "_state_1sejb_102", jh = "_handle_1sejb_111", Dh = "_sub_1sejb_137", j = {
  head: Sh,
  line: Rh,
  cHandle: Th,
  cName: xh,
  nameLine: Lh,
  cLabel: Ah,
  cCap: Eh,
  cShown: Ih,
  name: Mh,
  noCap: Bh,
  state: Ph,
  handle: jh,
  sub: Dh
}, Hh = "can't be hidden or collapsed", Oh = "terminal · counted, not a column";
function NS() {
  return /* @__PURE__ */ o("div", { className: j.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: j.cHandle }),
    /* @__PURE__ */ t("span", { className: j.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: j.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: j.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: j.cShown, children: "Shown" })
  ] });
}
function qh(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Fh(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function It(e) {
  return e.gate ? Hh : e.terminal ? Oh : Fh(e.agentsMounted);
}
function zh(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Wh({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: j.cName, children: [
    /* @__PURE__ */ o("span", { className: j.nameLine, children: [
      /* @__PURE__ */ t("span", { className: j.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    It(e) && /* @__PURE__ */ t("span", { className: j.sub, children: It(e) })
  ] });
}
function Kh(e) {
  return e === void 0 ? "" : String(e);
}
function Gh(e) {
  return e === "" ? void 0 : Number(e);
}
function Uh({ name: e, onReorder: a }) {
  return /* @__PURE__ */ t("span", { className: j.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: j.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (n) => zh(n, a),
      children: "⠿"
    }
  ) });
}
function Vh({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${j.cCap} ${j.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: j.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Kh(a.cap), onChange: (r) => n({ ...a, cap: Gh(r) }) }) });
}
function Yh({ stage: e, config: a, onChange: n }) {
  const r = qh(e, a.shown), l = e.gate || e.terminal, i = (s) => n({ ...a, shown: s });
  return /* @__PURE__ */ o("span", { className: j.cShown, children: [
    /* @__PURE__ */ t(We, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ t("span", { className: j.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function Xh(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function kS({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: j.line, "data-kind": Xh(e), children: [
    /* @__PURE__ */ t(Uh, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(Wh, { stage: e }),
    /* @__PURE__ */ t("span", { className: j.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(Vh, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(Yh, { stage: e, config: a, onChange: n })
  ] });
}
const Jh = "_body_1a4f4_2", Qh = "_head_1a4f4_9", Zh = "_summary_1a4f4_19", ew = "_block_1a4f4_20", aw = "_actionsBlock_1a4f4_21", tw = "_title_1a4f4_41", nw = "_note_1a4f4_46", rw = "_k_1a4f4_51", lw = "_kv_1a4f4_58", ow = "_row_1a4f4_64", iw = "_label_1a4f4_75", sw = "_value_1a4f4_84", cw = "_quote_1a4f4_90", dw = "_actions_1a4f4_21", uw = "_resolve_1a4f4_103", D = {
  body: Jh,
  head: Qh,
  summary: Zh,
  block: ew,
  actionsBlock: aw,
  title: tw,
  note: nw,
  k: rw,
  kv: lw,
  row: ow,
  label: iw,
  value: sw,
  quote: cw,
  actions: dw,
  resolve: uw
};
function mw(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function hw(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(Se, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function ww(e) {
  const a = ca(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function fw(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...Ma(ww(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...mw(e),
    ...hw(e, a)
  ];
}
function _w({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: D.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: D.k, children: a }),
    e
  ] });
}
function vw({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: D.head, children: [
    /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function bw({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: D.block, children: [
    /* @__PURE__ */ t("p", { className: D.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: D.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: D.note, children: e.agentMeta })
  ] }) : null;
}
function $S({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const u = N(), d = fw(e, l);
  return /* @__PURE__ */ t(ea, { kind: "drawer", labelledBy: u, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: D.body, children: [
    /* @__PURE__ */ t(vw, { item: e }),
    /* @__PURE__ */ o("div", { className: D.summary, children: [
      /* @__PURE__ */ t("h2", { className: D.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: D.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: D.kv, children: d.map(([m, v]) => /* @__PURE__ */ o("div", { className: D.row, children: [
      /* @__PURE__ */ t("dt", { className: D.label, children: m }),
      /* @__PURE__ */ t("dd", { className: D.value, children: v })
    ] }, m)) }),
    /* @__PURE__ */ t(bw, { item: e }),
    /* @__PURE__ */ o("div", { className: D.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: D.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: D.note, children: c })
    ] }),
    /* @__PURE__ */ t(_w, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const pw = "_root_3azmy_2", gw = "_list_3azmy_7", yw = "_item_3azmy_12", Nw = "_box_3azmy_18", kw = "_text_3azmy_23", $w = "_note_3azmy_28", Ue = {
  root: pw,
  list: gw,
  item: yw,
  box: Nw,
  text: kw,
  note: $w
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
const Cw = "_rail_znbbp_2", Sw = "_k_znbbp_11", Rw = "_head_znbbp_19", Tw = "_section_znbbp_25", xw = "_card_znbbp_39", Lw = "_strip_znbbp_46", Aw = "_skeleton_znbbp_60", Ew = "_skeletonLabel_znbbp_74", Iw = "_bar_znbbp_80", Mw = "_note_znbbp_89", me = {
  rail: Cw,
  k: Sw,
  head: Rw,
  section: Tw,
  card: xw,
  strip: Lw,
  skeleton: Aw,
  skeletonLabel: Ew,
  bar: Iw,
  note: Mw
};
function Bw(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Fa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function Pw({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function jw({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(ih, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function Dw(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(jw, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(Pw, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function CS(e) {
  const a = Bw(e.onOpen), n = gn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(Fa, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(ja, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Fa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(Dw, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(Fa, { title: "Effect of this config", children: /* @__PURE__ */ t(Da, { items: e.effects, density: "compact" }) })
  ] });
}
function Hw(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function Ow(e) {
  return Math.ceil(e.length / 2);
}
function qw(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function yn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Fw(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = yn(e);
  l !== void 0 && n(l), r(qw(e.type));
}
function zw(e, a, n, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Fw(i, n, r, l));
  }, [e, a, n, r, l]);
}
function Ww(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Kw(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Gw(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Uw(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(Ow(a ?? [])) + ")"
  };
}
function Vw(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Yw(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: re(e.cost) }) : null;
}
function Xw(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function Jw(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(Se, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function Qw(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function Zw(e, a) {
  return a === void 0 ? e : Hw(e, a.ref);
}
function ef(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function oa(e) {
  return e === !0 ? "true" : void 0;
}
function Nn(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = w(null), i = fa(l), s = w(/* @__PURE__ */ new Set()), [c, u] = p(Ww(a));
  zw(e.feed, a.key, s, u, i);
  const d = Kw(a, r), m = Gw(a, n), v = Uw(a, e.fields), b = Qw(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...ef(e),
      className: "ward-workcard",
      "data-flagged": oa(a.flagged),
      "data-selected": oa(e.selected),
      style: v,
      ref: Zw(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Vw(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: d.role, label: d.label }),
          Yw(a, e.fields),
          Xw(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Jw(n, c, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function af({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function tf(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function nf(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function rf(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(af, { count: e.items.length, cap: e.column.cap });
}
function lf(e, a) {
  return e.roving ?? a;
}
function of(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function sf(e, a) {
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
function cf(e) {
  const a = N(), n = xa({ orientation: "vertical" }), r = lf(e, n), l = tf(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": oa(l), "data-gate": oa(e.column.gate), children: [
    nf(e.column, e.items.length, a),
    rf(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...of(e, n), children: sf(e, r) })
  ] });
}
function df(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function uf(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function mf(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function SS(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: df(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      uf(e),
      mf(e.onConfigure),
      /* @__PURE__ */ t(lt, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function hf(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function wf(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(We, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(We, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function ff(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function RS(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": oa(hf(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: wf(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(Zt, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    ff(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function TS(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(Nn, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(cf, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function _f(e, a) {
  const n = yn(e);
  n !== void 0 && a(n);
}
function vf(e, a, n) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => _f(r, n));
  }, [e, a, n]);
}
function bf(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function pf(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function gf(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(Se, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function yf(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function xS(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  vf(e.feed, a.key, l);
  const i = [...bf(a), ...pf(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      gf(n, r)
    ] }),
    yf(a, e.actions)
  ] });
}
const Nf = "_card_54446_3", kf = "_head_54446_30", $f = "_mark_54446_38", Cf = "_name_54446_50", Sf = "_chips_54446_71", Rf = "_description_54446_77", Tf = "_run_54446_82", xf = "_sep_54446_91", Lf = "_facts_54446_96", Af = "_fact_54446_96", Ef = "_factLabel_54446_109", If = "_factValue_54446_113", le = {
  card: Nf,
  head: kf,
  mark: $f,
  name: Cf,
  chips: Sf,
  description: Rf,
  run: Tf,
  sep: xf,
  facts: Lf,
  fact: Af,
  factLabel: Ef,
  factValue: If
}, Mf = { live: "done", draft: "running", paused: "meta" };
function Bf(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function Pf({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: Mf[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function jf({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: le.description, children: e });
}
function Df({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(Se, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function Hf({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ t("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function Of(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function qf({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": ve(e.streamStep, "id") }, u = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: Bf(s),
      style: c,
      "data-selected": u,
      "data-paused": Of(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ t("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${le.name} ward-rowlink ward-target`, href: q(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ t(jf, { description: e.description }),
        /* @__PURE__ */ t(Df, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(Pf, { versions: e.versions }),
        /* @__PURE__ */ t(Hf, { facts: i })
      ]
    }
  );
}
const Ff = "_list_4dcyc_2", zf = "_row_4dcyc_11", Wf = "_head_4dcyc_23", Kf = "_id_4dcyc_30", Gf = "_lock_4dcyc_35", Uf = "_reason_4dcyc_41", Vf = "_remove_4dcyc_46", Yf = "_clauses_4dcyc_50", Xf = "_clause_4dcyc_50", Jf = "_label_4dcyc_64", Qf = "_cell_4dcyc_71", Zf = "_value_4dcyc_76", se = {
  list: Ff,
  row: zf,
  head: Wf,
  id: Kf,
  lock: Gf,
  reason: Uf,
  remove: Vf,
  clauses: Yf,
  clause: Xf,
  label: Jf,
  cell: Qf,
  value: Zf
}, kn = Me(!1);
function LS({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(kn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: se.list, "aria-label": a, children: e }) });
}
function e_({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: se.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function a_({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: se.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: se.reason, children: e })
  ] });
}
function t_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: se.head, children: [
    /* @__PURE__ */ t("span", { className: se.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(a_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: se.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Mt(e, a) {
  return e.locked ? void 0 : a;
}
function AS({ rule: e, onChange: a, onRemove: n }) {
  if (!Ie(kn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Mt(e, a);
  return /* @__PURE__ */ o("li", { className: se.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(t_, { rule: e, onRemove: Mt(e, n) }),
    /* @__PURE__ */ t("dl", { className: se.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: se.clause, children: [
      /* @__PURE__ */ t("dt", { className: se.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: se.cell, children: /* @__PURE__ */ t(e_, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const n_ = "_ladder_n8eeo_2", r_ = "_cell_n8eeo_7", l_ = "_empty_n8eeo_26", o_ = "_name_n8eeo_34", i_ = "_holder_n8eeo_40", s_ = "_request_n8eeo_46", c_ = "_swatches_n8eeo_51", d_ = "_swatch_n8eeo_51", u_ = "_tilesFrame_n8eeo_78", m_ = "_tiles_n8eeo_78", h_ = "_tile_n8eeo_78", w_ = "_bar_n8eeo_117", f_ = "_hex_n8eeo_128", __ = "_note_n8eeo_138", A = {
  ladder: n_,
  cell: r_,
  empty: l_,
  name: o_,
  holder: i_,
  request: s_,
  swatches: c_,
  swatch: d_,
  tilesFrame: u_,
  tiles: m_,
  tile: h_,
  bar: w_,
  hex: f_,
  note: __
}, ES = "not validated yet, pending a CVD matrix and dark stepping";
function v_(e) {
  return e.reserved ? "reserved" : Aa(e.step) ? "validated" : "partial";
}
function $n(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function b_(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function p_({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(Be, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function g_(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function y_(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Bt = (e) => String(e).padStart(2, "0");
function N_(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? $n(e, void 0);
}
function k_({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.hex} ward-ladder-hex`, children: r ? `step ${Bt(e)}` : Tr(e) }),
    /* @__PURE__ */ t("span", { className: `${A.note} ward-ladder-note`, children: r ? n : `Step ${Bt(e)} · ${n}` })
  ] });
}
function $_({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = v_(e), c = $n(s, n), u = c !== "free", d = u || i, m = a === e.step, v = e.name ?? `Step ${e.step}`, b = () => {
    d || r(e.step);
  }, y = `${v} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...y_(u, m, d), "data-validation": s, style: b_(e, s), onClick: b, onKeyDown: (B) => g_(B, b) }, label: y, name: v, holder: c, validation: s, note: N_(s, n, m), step: e.step };
}
const C_ = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${A.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${A.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(k_, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${A.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(p_, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${A.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${A.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function S_(e) {
  return C_[e.presentation]($_(e));
}
function R_(e) {
  for (const a of e)
    if (!a.reserved && !La(a.step)) throw new Error("colour ladder renders token steps only");
}
function T_() {
  return /* @__PURE__ */ o("div", { className: `${A.cell} ward-ladder-cell ${A.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${A.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function x_(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const L_ = { list: A.ladder, swatches: A.swatches, tiles: A.tilesFrame };
function A_() {
  return /* @__PURE__ */ o("div", { className: `${A.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${A.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const E_ = { list: T_, swatches: () => null, tiles: A_ };
function I_(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Cn(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  R_(e.steps);
  const r = x_(e), l = E_[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(S_, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...I_(e.disabled === !0), className: `${L_[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: A.tiles, children: i }) : i });
}
const M_ = "_rail_s06lm_2", B_ = "_section_s06lm_12", P_ = "_sectionFlush_s06lm_22", j_ = "_head_s06lm_26", D_ = "_headLabel_s06lm_34", H_ = "_sample_s06lm_42", O_ = "_sampleLabel_s06lm_47", q_ = "_sampleTitle_s06lm_54", F_ = "_sampleMeta_s06lm_59", z_ = "_trace_s06lm_65", W_ = "_traceHead_s06lm_70", K_ = "_steps_s06lm_78", G_ = "_step_s06lm_78", U_ = "_stepTitle_s06lm_97", V_ = "_hollow_s06lm_107", Y_ = "_stepBody_s06lm_115", X_ = "_stepDetail_s06lm_127", J_ = "_publish_s06lm_132", Q_ = "_reason_s06lm_138", Z_ = "_note_s06lm_143", ev = "_reveal_s06lm_148", k = {
  rail: M_,
  section: B_,
  sectionFlush: P_,
  head: j_,
  headLabel: D_,
  sample: H_,
  sampleLabel: O_,
  sampleTitle: q_,
  sampleMeta: F_,
  trace: z_,
  traceHead: W_,
  steps: K_,
  step: G_,
  stepTitle: U_,
  hollow: V_,
  stepBody: Y_,
  stepDetail: X_,
  publish: J_,
  reason: Q_,
  note: Z_,
  reveal: ev
}, Pt = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, av = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, tv = { ok: "greenFill", finding: "orangeFill", action: "blue" }, nv = { notSimulated: "not simulated", running: "running" };
function rv(e) {
  return e.presentation === "foundry";
}
function lv(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function ov(e, a) {
  var r;
  const n = av[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function iv(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function sv(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function cv(e) {
  if (iv(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function dv(e) {
  const [a, n] = p(!1);
  S(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function uv(e) {
  const a = nv[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(Be, { size: 6, kind: tv[e.kind], label: e.kind });
}
function mv(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function hv(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(Se, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function wv(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(dv, { kind: a.kind, children: [
    /* @__PURE__ */ t(uv, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(mv, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(hv, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function fv(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function Sn(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: fv(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(wv, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function _v(e) {
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
function vv(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function bv(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Vt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Ba, { divided: !0, cells: a }) });
}
function pv(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Vt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function gv(e) {
  const a = pv(e.run);
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
function yv(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(Rn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function Nv(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(Rn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Tn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: Pt[e.run.status].role, label: Pt[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(Se, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function kv(e, a) {
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
function $v(e) {
  var n;
  sv(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Tn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(_v, { sample: e.run.sample }),
    /* @__PURE__ */ t(Sn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(bv, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist }) }),
    /* @__PURE__ */ t(yv, { reason: lv(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Cv(e) {
  var r;
  const a = kv(e.run, e.feed);
  cv(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Tn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(vv, { sample: e.run.sample }),
    /* @__PURE__ */ t(Sn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(gv, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(Nv, { reason: ov(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function IS(e) {
  return rv(e) ? /* @__PURE__ */ t(Cv, { ...e }) : /* @__PURE__ */ t($v, { ...e });
}
const Sv = "_list_142ip_3", Rv = "_row_142ip_9", Tv = "_condition_142ip_18", xv = "_action_142ip_24", va = {
  list: Sv,
  row: Rv,
  condition: Tv,
  action: xv
}, xn = Me(!1);
function MS({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(xn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: va.list, "aria-label": a, children: e }) });
}
function BS({ rule: e }) {
  if (!Ie(xn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: va.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: va.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: va.action, children: e.then })
  ] });
}
const Lv = "_move_tmppt_3", Av = {
  move: Lv
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
function Ev(e) {
  return e === "up" ? "down" : "up";
}
function Iv(e, a) {
  const n = jt(e, a.id, a.direction) ?? jt(e, a.id, Ev(a.direction));
  n == null || n.focus();
}
function En() {
  const e = w(null), [a, n] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && a !== null && Iv(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function In({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function $a({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${Av.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const Mv = "_body_1jd1i_2", Bv = "_title_1jd1i_8", Pv = "_section_1jd1i_13", jv = "_legend_1jd1i_18", Dv = "_stages_1jd1i_26", Hv = "_stage_1jd1i_26", Ov = "_stageIndex_1jd1i_44", qv = "_stageName_1jd1i_50", Fv = "_footer_1jd1i_59", zv = "_note_1jd1i_66", Wv = "_reason_1jd1i_71", Kv = "_actions_1jd1i_76", Gv = "_webHead_1jd1i_83", Uv = "_kicker_1jd1i_92", Vv = "_webTitle_1jd1i_99", Yv = "_webBody_1jd1i_105", Xv = "_webSection_1jd1i_109", Jv = "_sectionHead_1jd1i_121", Qv = "_sectionNote_1jd1i_129", Zv = "_formLabel_1jd1i_134", eb = "_identityRow_1jd1i_139", ab = "_nameCell_1jd1i_145", tb = "_keyCell_1jd1i_150", nb = "_colourCell_1jd1i_154", rb = "_colourStatus_1jd1i_161", lb = "_webStages_1jd1i_166", ob = "_webStageList_1jd1i_172", ib = "_webStage_1jd1i_166", sb = "_webIndex_1jd1i_191", cb = "_webStageName_1jd1i_196", db = "_webMoves_1jd1i_201", ub = "_addStage_1jd1i_215", mb = "_addStageButton_1jd1i_223", hb = "_addStageNote_1jd1i_231", wb = "_webFooter_1jd1i_236", fb = "_webFooterNotes_1jd1i_244", _b = "_webNote_1jd1i_251", f = {
  body: Mv,
  title: Bv,
  section: Pv,
  legend: jv,
  stages: Dv,
  stage: Hv,
  stageIndex: Ov,
  stageName: qv,
  footer: Fv,
  note: zv,
  reason: Wv,
  actions: Kv,
  webHead: Gv,
  kicker: Uv,
  webTitle: Vv,
  webBody: Yv,
  webSection: Xv,
  sectionHead: Jv,
  sectionNote: Qv,
  formLabel: Zv,
  identityRow: eb,
  nameCell: ab,
  keyCell: tb,
  colourCell: nb,
  colourStatus: rb,
  webStages: lb,
  webStageList: ob,
  webStage: ib,
  webIndex: sb,
  webStageName: cb,
  webMoves: db,
  addStage: ub,
  addStageButton: mb,
  addStageNote: hb,
  webFooter: wb,
  webFooterNotes: fb,
  webNote: _b
}, vb = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Mn = "not in catalogue";
function bb(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${Mn}` }, ...n];
}
function pb({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Mn}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: bb(n, e.name), invalid: i, onChange: r });
}
function Bn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function gb(e) {
  const a = w([]), n = w(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function yb({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Bn(a, n), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${f.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: f.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: f.webStageName, children: /* @__PURE__ */ t(pb, { stage: a, index: n, catalogue: l, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ t(M, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: vb, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ o("span", { className: f.webMoves, children: [
      n > 0 && /* @__PURE__ */ t($a, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t($a, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Nb({ stages: e, onChange: a, catalogue: n }) {
  const r = gb(e.length), l = En(), i = (c, u) => {
    const d = Ln(c, u);
    r.current = Ya(r.current, c, d), l.moved({ id: r.current[d], direction: u }, An(Bn(e[c], c), d, e.length)), a(Ya(e, c, d));
  }, s = (c, u) => a(e.map((d, m) => m === c ? u : d));
  return /* @__PURE__ */ o("div", { className: f.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: f.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, u) => /* @__PURE__ */ t(yb, { id: r.current[u], stage: c, index: u, total: e.length, catalogue: n, onReplace: (d) => s(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ t(In, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: f.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: f.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: f.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const kb = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], $b = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Cb = "A new stream starts as a draft. Nothing runs on it until you publish it.", Sb = "Create is disabled: name the stream and give it a key first.", Rb = "reorder with the ↑ ↓ buttons · min 2";
function it(e, a) {
  return !e.reserved && Aa(e.step) && a[e.step] === void 0;
}
function Tb(e, a) {
  const n = e.find((r) => it(r, a));
  return n ? n.step : 1;
}
function xb({ stages: e, onMove: a }) {
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
function Lb({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: f.footer, children: [
    /* @__PURE__ */ t("p", { className: f.note, children: Cb }),
    e && /* @__PURE__ */ t("p", { className: f.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: f.actions, children: [
      /* @__PURE__ */ t(_, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Ab(e, a) {
  return e !== "" && a !== "" ? null : Sb;
}
function Eb(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = $b, onCreate: i, onDraft: s, onClose: c, returnFocusTo: u } = e, d = N(), [m, v] = p(""), [b, y] = p(""), [E, B] = p(a[0].value), [oe, Re] = p(() => Tb(n, r)), [te, Ke] = p(e.stages ?? kb), [Ge, R] = p(l[0].value), G = { name: m, key: b, streamStep: oe, owner: E, stages: te, policy: Ge }, be = Ab(m, b);
  return /* @__PURE__ */ t(ea, { kind: "modal", labelledBy: d, onClose: c, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: f.body, children: [
    /* @__PURE__ */ t("h2", { className: f.title, id: d, children: "New stream" }),
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
      /* @__PURE__ */ t(xb, { stages: te, onMove: (Pe, ir) => Ke(Ya(te, Pe, ir)) })
    ] }),
    /* @__PURE__ */ t(_n, { legend: "Loop policy", options: l, value: Ge, onChange: R }),
    /* @__PURE__ */ t(Lb, { reason: be, onCreate: () => i(G), onDraft: () => s(G) })
  ] }) });
}
const Pn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Ib = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Mb(e, a, n, r, l, i) {
  var c;
  const s = ((c = Pn.find((u) => u.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function Bb(e, a) {
  return Pb(e) && jb(e, a) && Db(e);
}
function Pb(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function jb(e, a) {
  return e.colourStep === null || it({ step: e.colourStep }, a);
}
function Db(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Hb(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : it({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Ob({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: f.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: f.webNote, children: "Add a stage an agent can run on." });
}
function qb({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: f.webFooter, children: [
    /* @__PURE__ */ o("div", { className: f.webFooterNotes, children: [
      /* @__PURE__ */ t(Ob, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: f.reason, children: Ib })
    ] }),
    l && /* @__PURE__ */ t(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Fb({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: f.webHead, children: [
    /* @__PURE__ */ t("span", { className: f.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: f.webTitle, children: "New stream" })
  ] });
}
function zb({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
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
function Wb(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [u, d] = p(e.owners[0] ?? ""), [m, v] = p(null), [b, y] = p("relay"), [E, B] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = Mb(l, s, u, m, b, E), Re = Bb(oe, r), te = E.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ke = /* @__PURE__ */ o("div", { className: f.colourCell, children: [
    /* @__PURE__ */ t("span", { className: f.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(Cn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: v, takenBy: r })
  ] }), Ge = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: f.colourStatus, "data-colour-status": "", children: Hb(m, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map((R) => ({ value: R, label: R })), onChange: d })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(Fb, { titleId: n }),
    /* @__PURE__ */ o("div", { className: f.webBody, children: [
      /* @__PURE__ */ t(zb, { name: l, setName: i, streamKey: s, setKey: c, colour: Ke, owner: Ge }),
      /* @__PURE__ */ o("section", { className: f.webSection, children: [
        /* @__PURE__ */ o("div", { className: f.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: f.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: f.sectionNote, children: Rb })
        ] }),
        /* @__PURE__ */ t(Nb, { stages: E, onChange: B })
      ] }),
      /* @__PURE__ */ t("section", { className: f.webSection, children: /* @__PURE__ */ t(_n, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Pn, onChange: y }) }),
      /* @__PURE__ */ t(qb, { ready: Re, draft: oe, agentStage: te, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function PS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Wb, { ...e }) : /* @__PURE__ */ t(Eb, { ...e });
}
const Kb = "_row_bs8hc_2", Gb = "_cell_bs8hc_6", Ub = "_condition_bs8hc_11", Vb = "_action_bs8hc_18", Yb = "_contract_bs8hc_24", Xb = "_contractCondition_bs8hc_33", Jb = "_contractAction_bs8hc_39", ee = {
  row: Kb,
  cell: Gb,
  condition: Ub,
  action: Vb,
  contract: Yb,
  contractCondition: Xb,
  contractAction: Jb
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
function Qb({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: ee.row, children: [
    /* @__PURE__ */ t("td", { className: ee.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: ee.cell, children: /* @__PURE__ */ t("span", { className: ee.condition, title: Ca(e, r), children: Ca(e, r) }) }),
    /* @__PURE__ */ t("td", { className: ee.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: ee.cell, children: st(e, a, n) })
  ] });
}
function Zb({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: ee.row, children: [
    /* @__PURE__ */ o("td", { className: ee.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: ee.condition, children: Ca(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: ee.cell, children: st(e, a, n) })
  ] });
}
function ep({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: ee.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: ee.contractCondition, children: Ca(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: ee.contractAction, children: st(e, a, n, !0) })
  ] });
}
const ap = { two: Zb, four: Qb, contract: ep };
function jS(e) {
  var n;
  if (!jn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = ap[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const tp = "_column_11id3_2", np = "_head_11id3_17", rp = "_index_11id3_23", lp = "_name_11id3_29", op = "_meta_11id3_38", ip = "_mono_11id3_43", sp = "_gate_11id3_50", cp = "_reviewersLabel_11id3_57", dp = "_reviewers_11id3_57", up = "_reviewer_11id3_57", mp = "_agents_11id3_74", hp = "_workflowColumn_11id3_79", wp = "_workflowHead_11id3_96", fp = "_stageRow_11id3_102", _p = "_stageLabel_11id3_109", vp = "_workflowTitle_11id3_116", bp = "_workflowMeta_11id3_122", pp = "_workflowGate_11id3_127", gp = "_gateNote_11id3_135", yp = "_cardNote_11id3_140", Np = "_reviewerList_11id3_145", kp = "_reviewerRow_11id3_151", $p = "_reviewerMark_11id3_157", Cp = "_reviewerName_11id3_167", Sp = "_terminalCard_11id3_173", Rp = "_terminalCount_11id3_182", Tp = "_workflowAgents_11id3_188", xp = "_mount_11id3_194", C = {
  column: tp,
  head: np,
  index: rp,
  name: lp,
  meta: op,
  mono: ip,
  gate: sp,
  reviewersLabel: cp,
  reviewers: dp,
  reviewer: up,
  agents: mp,
  workflowColumn: hp,
  workflowHead: wp,
  stageRow: fp,
  stageLabel: _p,
  workflowTitle: vp,
  workflowMeta: bp,
  workflowGate: pp,
  gateNote: gp,
  cardNote: yp,
  reviewerList: Np,
  reviewerRow: kp,
  reviewerMark: $p,
  reviewerName: Cp,
  terminalCard: Sp,
  terminalCount: Rp,
  workflowAgents: Tp,
  mount: xp
}, Lp = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function ct(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Dn(e) {
  return `${Math.round(e * 100)}%`;
}
function Ap({ stage: e }) {
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
function Ep({ stage: e }) {
  return /* @__PURE__ */ t(Ba, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: ct(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function Ip({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: C.head, children: [
    /* @__PURE__ */ t("span", { className: C.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: C.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: Lp[e.kind] })
  ] });
}
function Mp({ stage: e }) {
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
function Bp({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(Ap, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(Ep, { stage: e }) : null;
}
function Pp({ onMount: e }) {
  return e ? /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function jp({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: C.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Ip, { stage: e, titleId: l }),
    /* @__PURE__ */ t(Mp, { stage: e }),
    /* @__PURE__ */ t(Bp, { stage: e }),
    /* @__PURE__ */ t("div", { className: C.agents, children: a.map((s) => /* @__PURE__ */ t(qf, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(Pp, { onMount: n })
  ] });
}
const Dp = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function Hp({ reviewers: e }) {
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
    a.length === 0 ? null : /* @__PURE__ */ t(Hp, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: C.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Dn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function qp(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Fp({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: C.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: C.terminalCount, children: ct(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: C.cardNote, children: qp(e.rolledBackThisWeek) })
  ] });
}
function zp(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Wp(e) {
  if (e.kind === "terminal") return `${ct(e.closedThisWeek)} this week`;
  const a = zp(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Kp({ stage: e, titleId: a }) {
  const n = Dp[e.kind];
  return /* @__PURE__ */ o("header", { className: C.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: C.stageRow, children: [
      /* @__PURE__ */ o("span", { className: C.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: C.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: C.workflowMeta, children: Wp(e) })
  ] });
}
function Gp(e) {
  return e === "entry" || e === "agent";
}
function Up({ stage: e, onMount: a }) {
  return a === void 0 || !Gp(e.kind) ? null : /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", className: C.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Vp({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: C.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Kp, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(Op, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(Fp, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: C.workflowAgents, children: a }),
    /* @__PURE__ */ t(Up, { stage: e, onMount: n })
  ] });
}
function Yp(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function DS(e) {
  return Yp(e) ? /* @__PURE__ */ t(Vp, { ...e }) : /* @__PURE__ */ t(jp, { ...e });
}
const Xp = "_row_alabo_6", Jp = "_name_alabo_12", Qp = "_compactRow_alabo_13", Zp = "_compactName_alabo_13", eg = "_cell_alabo_30", ag = "_chain_alabo_45", tg = "_owner_alabo_51", ng = "_mono_alabo_57", rg = "_compactCell_alabo_79", lg = "_stack_alabo_96", og = "_stat_alabo_103", ig = "_identityLine_alabo_110", sg = "_identity_alabo_110", cg = "_ownerLine_alabo_137", dg = "_link_alabo_150", ug = "_gateMark_alabo_156", mg = "_emptyChain_alabo_161", hg = "_arrow_alabo_167", wg = "_muted_alabo_168", fg = "_define_alabo_173", _g = "_statValue_alabo_180", vg = "_policyId_alabo_186", bg = "_sub_alabo_191", g = {
  row: Xp,
  name: Jp,
  compactRow: Qp,
  compactName: Zp,
  cell: eg,
  chain: ag,
  owner: tg,
  mono: ng,
  compactCell: rg,
  stack: lg,
  stat: og,
  identityLine: ig,
  identity: sg,
  ownerLine: cg,
  link: dg,
  gateMark: ug,
  emptyChain: mg,
  arrow: hg,
  muted: wg,
  define: fg,
  statValue: _g,
  policyId: vg,
  sub: bg
};
function Hn(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function pg(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function gg(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function On(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function yg(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${On(e.members)}`;
}
function Ng(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: q(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: yg(e) })
  ] }) });
}
function qn({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function kg(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = ca(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function $g({ stages: e, streamStep: a }) {
  const n = e.findIndex((r) => r.gate === !0);
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((r, l) => /* @__PURE__ */ o("span", { className: g.link, children: [
    l === 0 ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ t(qn, { name: r.name, gate: r.gate === !0, look: kg(l, n, a), size: "tag" })
  ] }, `${r.name}${l}`)) });
}
function Cg(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : $g(e) });
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
function Sg(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function Rg(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Tg({ stream: e, href: a, presentation: n }) {
  const r = gg(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Hn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ve(e.streamStep, "chip") }, children: [
    Ng(e, a),
    Cg(e),
    Ht(Rg(e.agents), e.agents === void 0 ? void 0 : pg(e.agents), "—"),
    Sg(e.policy),
    Ht(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function xg(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function HS(e) {
  if (xg(e)) return Tg(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: Hn, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: q(n), children: a.name }),
      /* @__PURE__ */ t(h, { ...Ma(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(h, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ t("span", { className: g.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: g.link, children: /* @__PURE__ */ t(qn, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ t("span", { className: g.mono, children: On(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: a.inFlightHint, "data-raised": Fn(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const Lg = "_row_2u4ll_2", Ag = "_name_2u4ll_16", Eg = "_scope_2u4ll_24", Sa = {
  row: Lg,
  name: Ag,
  scope: Eg
};
function dt(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Ig(e) {
  return e === void 0 ? `${Sa.row} ward-toolrow` : `${Sa.row} ward-toolrow ${e}`;
}
function Mg(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Bg({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function Pg({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: dt(e) });
}
function jg({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${Sa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Dg(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function OS({ tool: e, onChange: a, presentation: n }) {
  const r = N(), l = N(), i = Mg(e, n), s = Dg(n);
  return /* @__PURE__ */ o(s, { className: Ig(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Bg, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${Sa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(jg, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(Pg, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const Hg = "_strip_4ppv9_2", Og = "_well_4ppv9_11", qg = "_head_4ppv9_18", Fg = "_name_4ppv9_24", zg = "_chart_4ppv9_32", Wg = "_segment_4ppv9_38", Kg = "_detailedChart_4ppv9_44", Gg = "_rail_4ppv9_57", Ug = "_section_4ppv9_63", Vg = "_label_4ppv9_74", Yg = "_note_4ppv9_91", K = {
  strip: Hg,
  well: Og,
  head: qg,
  name: Fg,
  chart: zg,
  segment: Wg,
  detailedChart: Kg,
  rail: Gg,
  section: Ug,
  label: Vg,
  note: Yg
}, Xg = "No item in flight to preview.", Jg = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Qg = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Xa = [1, 2, 3, 4, 5, 6], Ra = 100;
function Zg(e, a) {
  return a.has(e) ? ve(e, "id") : "var(--ward-color-line)";
}
function ey({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: K.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Xa.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: K.segment,
      x: l * Ra,
      y: "0",
      width: Ra,
      height: "8",
      fill: Zg(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function ay(e) {
  const a = e.slice(0, Xa.length);
  for (; a.length < Xa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function ty({ identities: e }) {
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
function ny({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: K.note, children: a ?? Xg }) : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(ja, { item: { ...e, streamStep: ca(n.streamStep) }, onOpen: zn(r), feed: null }) });
}
function ry({ draft: e }) {
  const a = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: K.head, style: a, children: [
    /* @__PURE__ */ t(Be, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...Ma(e.key, e.streamStep) })
  ] });
}
function ly(e) {
  const a = ay(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: K.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(ha, { label: "Board card", children: /* @__PURE__ */ t(ny, { ...e, draft: n }) }),
    /* @__PURE__ */ t(ha, { label: "Streams index row", children: /* @__PURE__ */ t(ry, { draft: n }) }),
    /* @__PURE__ */ o(ha, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(ty, { identities: a }),
      /* @__PURE__ */ t("p", { className: K.note, children: Jg })
    ] }),
    /* @__PURE__ */ t(ha, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: K.note, children: Qg }) })
  ] });
}
function oy({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: K.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: K.head, children: [
      /* @__PURE__ */ t(Be, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...Ma(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(ja, { item: { ...a, streamStep: e.streamStep }, onOpen: zn(r) }) }),
    /* @__PURE__ */ t(ey, { draft: e, streams: n })
  ] });
}
function qS(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(ly, { ...e }) : /* @__PURE__ */ t(oy, { ...e });
}
const iy = "_row_ixlg5_6", sy = "_headCell_ixlg5_10", cy = "_cell_ixlg5_11", dy = "_name_ixlg5_23", uy = "_consequence_ixlg5_29", my = "_governed_ixlg5_36", hy = "_control_ixlg5_42", wy = "_byRole_ixlg5_48", fy = "_webControl_ixlg5_59", _y = "_webConsequence_ixlg5_65", vy = "_webGoverned_ixlg5_71", O = {
  row: iy,
  headCell: sy,
  cell: cy,
  name: dy,
  consequence: uy,
  governed: my,
  control: hy,
  byRole: wy,
  webControl: fy,
  webConsequence: _y,
  webGoverned: vy
};
function by({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: O.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: O.control, children: [
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
function py({ capability: e, cells: a, onChange: n }) {
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
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(by, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function gy(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function yy({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${O.webControl} ${O.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    We,
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
function Ny({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o("td", { className: O.cell, children: [
      /* @__PURE__ */ t("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${O.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(yy, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webGoverned} ward-cellmeta`, children: gy(e) }) })
  ] });
}
function FS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Ny, { ...e }) : /* @__PURE__ */ t(py, { ...e });
}
const ky = "_row_vv64h_2", $y = "_cell_vv64h_6", Cy = "_name_vv64h_25", Sy = "_note_vv64h_30", Ry = "_webName_vv64h_41", Ty = "_webMeta_vv64h_47", V = {
  row: ky,
  cell: $y,
  name: Cy,
  note: Sy,
  webName: Ry,
  webMeta: Ty
}, Wn = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function xy(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Ly({ component: e, onRestart: a }) {
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
function Ay({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: xy(e.state) });
}
function Ey({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { ...Wn[e.state] }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(Ay, { component: e, onRestart: a }) })
  ] });
}
function zS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Ey, { ...e }) : /* @__PURE__ */ t(Ly, { ...e });
}
const Iy = "_row_jcm5k_7", My = "_cell_jcm5k_11", By = "_next_jcm5k_28", Py = "_headCell_jcm5k_38", jy = "_webId_jcm5k_77", Dy = "_webPurpose_jcm5k_83", Hy = "_webMeta_jcm5k_91", Oy = "_webUrgent_jcm5k_97", F = {
  row: Iy,
  cell: My,
  next: By,
  headCell: Py,
  webId: jy,
  webPurpose: Dy,
  webMeta: Hy,
  webUrgent: Oy
}, qy = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, Fy = {
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
], zy = Object.fromEntries(Kn.map((e) => [e.key, e]));
function Ve({ column: e, children: a }) {
  const n = zy[e];
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
function WS() {
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
function Wy({ cred: e }) {
  const a = qy[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t(Ve, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Ve, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Ve, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Ve, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: dt(e.cls) }) }),
    /* @__PURE__ */ t(Ve, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Ve, { column: "next", children: /* @__PURE__ */ t("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Ky({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function Gy({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(Ky, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { ...Fy[e.state] }) })
  ] });
}
function KS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Gy, { ...e }) : /* @__PURE__ */ t(Wy, { ...e });
}
const Uy = "_card_17zba_2", Vy = "_head_17zba_11", Yy = "_env_17zba_18", Xy = "_version_17zba_25", Jy = "_meta_17zba_32", Qy = "_webCard_17zba_37", Zy = "_webRow_17zba_47", eN = "_webTitle_17zba_55", aN = "_webLine_17zba_65", tN = "_webVersion_17zba_72", nN = "_webMeta_17zba_77", U = {
  card: Uy,
  head: Vy,
  env: Yy,
  version: Xy,
  meta: Jy,
  webCard: Qy,
  webRow: Zy,
  webTitle: eN,
  webLine: aN,
  webVersion: tN,
  webMeta: nN
}, Ot = { dev: "Dev", uat: "UAT", prod: "Prod" }, Gn = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function rN({ env: e }) {
  const a = Gn[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: U.card, "aria-label": Ot[e.env], children: [
    /* @__PURE__ */ o("div", { className: U.head, children: [
      /* @__PURE__ */ t("span", { className: U.env, children: Ot[e.env] }),
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
function lN(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function oN(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...Gn[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: lN(e) })
  ] });
}
function GS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(oN, { ...e }) : /* @__PURE__ */ t(rN, { ...e });
}
const iN = "_panel_1hmja_2", sN = "_line_1hmja_8", cN = "_actions_1hmja_14", wa = {
  panel: iN,
  line: sN,
  actions: cN
};
function US(e) {
  return /* @__PURE__ */ o("div", { className: wa.panel, children: [
    /* @__PURE__ */ t("p", { className: wa.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: wa.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: wa.line, children: e.note ?? "" })
  ] });
}
const dN = "_upload_13fcl_2", uN = "_preview_13fcl_7", mN = "_mark_13fcl_17", hN = "_empty_13fcl_22", wN = "_actions_13fcl_28", fN = "_input_13fcl_33", _N = "_reasons_13fcl_41", vN = "_reason_13fcl_41", bN = "_accepted_13fcl_57", ne = {
  upload: dN,
  preview: uN,
  mark: mN,
  empty: hN,
  actions: wN,
  input: fN,
  reasons: _N,
  reason: vN,
  accepted: bN
}, Un = 1.5, Vn = 22, Ta = "script elements or event handlers", xe = "links or external references", $e = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Un}px at ${Vn}px`], pN = [$e[1], $e[2], Ta, xe], gN = /* @__PURE__ */ new Map([
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
]), yN = "http://www.w3.org/2000/svg", NN = "http://www.w3.org/2000/xmlns/", kN = /* @__PURE__ */ new Set([
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
]), $N = /* @__PURE__ */ new Set([
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
]), ut = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, CN = /url\s*\(|['"\\]/i;
function SN() {
  return { ok: !1, reasons: [$e[1]] };
}
function Yn(e) {
  return e.namespaceURI === yN;
}
function RN(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && Yn(a) ? a : null;
  } catch {
    return null;
  }
}
function TN(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [$e[0]] : [];
}
function xN(e) {
  return gN.get(e.localName) ?? (e.localName.startsWith("animate") ? xe : void 0);
}
function LN(e) {
  return CN.test(e.replace(ut, ""));
}
function AN(e) {
  return /^on/i.test(e.localName) ? Ta : e.localName === "href" || LN(e.value) ? xe : void 0;
}
function EN(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(xN(n));
    for (const r of Array.from(n.attributes)) a.add(AN(r));
  }
  return pN.filter((n) => a.has(n));
}
function IN(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? Vn / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Un;
  }) ? [$e[3]] : [];
}
function MN(e) {
  if (e.namespaceURI === NN) return !0;
  const a = e.localName;
  return e.namespaceURI === null && ($N.has(a) || a.startsWith("stroke"));
}
function BN(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && Yn(a) && kN.has(a.localName);
}
function PN(e, a) {
  BN(a) ? a.nodeType === Node.ELEMENT_NODE && Xn(a) : e.removeChild(a);
}
function Xn(e) {
  for (const a of Array.from(e.attributes)) MN(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) PN(e, a);
  return e;
}
function jN(e) {
  return Array.from(e.matchAll(ut), (a) => a[2]).filter((a) => a !== "");
}
function DN(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function HN(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of jN(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function ON(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(ut, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function qN(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = HN(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), ON(l, r);
  }
  return e;
}
function VS(e) {
  const a = RN(e);
  if (a === null) return SN();
  const n = [...TN(a), ...EN(a), ...IN(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(qN(Xn(a), DN(e))) };
}
const FN = "Mark accepted.", zN = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, WN = new Set(Xt.flatMap((e) => [ve(e, "id"), ve(e, "chip")]));
function KN(e) {
  return e !== void 0 && (zN.test(e) || WN.has(e)) ? e : void 0;
}
function GN({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: ne.preview, style: { "--mark": KN(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: ne.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: ne.empty }) });
}
function UN(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function VN(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function YN({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: ne.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("p", { className: ne.accepted, children: FN }) }) : /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("ul", { className: ne.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: ne.reason, children: a }, a)) }) });
}
function XN({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(YN, { result: e }) : /* @__PURE__ */ t("p", { className: `${ne.result} ${UN(e, n)}`, role: "status", children: VN(e, n) });
}
function qt(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function YS({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = w(null), [s, c] = p(null), u = (d) => {
    if (d === void 0) return;
    const m = a(d);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: ne.upload, children: [
    /* @__PURE__ */ t(GN, { current: e }),
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
          onChange: (d) => {
            var m;
            return u((m = d.target.files) == null ? void 0 : m[0]);
          }
        }
      ),
      /* @__PURE__ */ t(_, { ...qt(l), onClick: () => {
        var d;
        return (d = i.current) == null ? void 0 : d.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(_, { ...qt(l), variant: "ghost", onClick: n, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(XN, { result: s, presentation: r })
  ] });
}
const JN = "_row_o3t6y_7", QN = "_cell_o3t6y_11", ZN = "_head_o3t6y_28", e1 = "_name_o3t6y_34", a1 = "_pinned_o3t6y_42", t1 = "_headCell_o3t6y_49", n1 = "_webName_o3t6y_88", r1 = "_webMeta_o3t6y_95", l1 = "_webWarn_o3t6y_103", P = {
  row: JN,
  cell: QN,
  head: ZN,
  name: e1,
  pinned: a1,
  headCell: t1,
  webName: n1,
  webMeta: r1,
  webWarn: l1
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
], o1 = Object.fromEntries(Jn.map((e) => [e.key, e]));
function i1(e, a) {
  return `mcp.${e}.${a}`;
}
function s1(e) {
  return Object.keys(mt).includes(e);
}
function c1(e) {
  return mt[e !== void 0 && s1(e) ? e : "unknown"];
}
function aa({ column: e, children: a }) {
  const n = o1[e];
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
function XS() {
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
function d1({ server: e }) {
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
    /* @__PURE__ */ t(aa, { column: "tools", children: e.tools.map((n) => i1(e.name, n)).join(" · ") })
  ] });
}
function u1(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function m1(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function h1({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${P.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: e });
}
function w1({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function f1({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(_, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function _1({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t("span", { className: `${P.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: u1(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...m1(e) }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h1, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...c1(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t(w1, { server: e, onRestart: a }),
      /* @__PURE__ */ t(f1, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function JS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(_1, { ...e }) : /* @__PURE__ */ t(d1, { ...e });
}
const v1 = "_row_1ibo7_2", b1 = "_headCell_1ibo7_14", p1 = "_cell_1ibo7_15", g1 = "_name_1ibo7_26", y1 = "_consequence_1ibo7_32", N1 = "_reason_1ibo7_38", k1 = "_value_1ibo7_44", $1 = "_webRow_1ibo7_60", C1 = "_webSetting_1ibo7_73", S1 = "_webName_1ibo7_81", R1 = "_webConsequence_1ibo7_89", T1 = "_webControl_1ibo7_95", x1 = "_webState_1ibo7_109", L1 = "_webChip_1ibo7_114", I = {
  row: v1,
  headCell: b1,
  cell: p1,
  name: g1,
  consequence: y1,
  reason: N1,
  value: k1,
  webRow: $1,
  webSetting: C1,
  webName: S1,
  webConsequence: R1,
  webControl: T1,
  webState: x1,
  webChip: L1
}, Qn = 104, Zn = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function A1({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(We, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(wn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function E1({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = Zn[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(A1, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: Qn }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function er(e, a) {
  return String(e ?? a);
}
function I1(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function M1(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? er(e.value, "—");
}
function B1({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(We, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function P1(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(B1, { ...e });
  const l = I1(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(wn, { options: l, value: er(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: M1(a) });
}
function j1({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(P1, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: Qn }, children: /* @__PURE__ */ t(h, { ...Zn[n], size: "tag" }) })
  ] });
}
function QS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(j1, { ...e }) : /* @__PURE__ */ t(E1, { ...e });
}
const D1 = "_label_vm9hq_7", H1 = "_name_vm9hq_15", O1 = "_column_vm9hq_24", q1 = "_webFrame_vm9hq_57", F1 = "_webHead_vm9hq_62", z1 = "_webHeadLabel_vm9hq_74", W1 = "_webLabel_vm9hq_112", K1 = "_webColumns_vm9hq_119", G1 = "_webGroup_vm9hq_125", U1 = "_webPeople_vm9hq_126", V1 = "_webVia_vm9hq_127", Y1 = "_webMeta_vm9hq_156", z = {
  label: D1,
  name: H1,
  column: O1,
  webFrame: q1,
  webHead: F1,
  webHeadLabel: z1,
  webLabel: W1,
  webColumns: K1,
  webGroup: G1,
  webPeople: U1,
  webVia: V1,
  webMeta: Y1
}, X1 = {
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
function J1(e) {
  if (!e.matrixRole) return;
  const a = X1[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Q1({ node: e }) {
  const a = J1(e);
  return /* @__PURE__ */ o("span", { className: z.label, children: [
    /* @__PURE__ */ t("span", { className: z.name, children: e.name }),
    /* @__PURE__ */ t(Z1, { role: a, node: e }),
    /* @__PURE__ */ t(Wa, { column: za[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Wa, { column: za[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ t(Wa, { column: za[2], children: e.requestedVia ?? "" })
  ] });
}
function Z1({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function ek({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
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
      label: /* @__PURE__ */ t(Q1, { node: n }),
      children: s
    }
  );
}
function Ka({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function ak({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ka, { className: `${z.webMeta} ${z.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ka, { className: `${z.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ka, { className: `${z.webMeta} ${z.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function tk() {
  return /* @__PURE__ */ o("div", { className: z.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: z.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: z.webColumns, children: [
      /* @__PURE__ */ t("span", { className: z.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: z.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: z.webVia, children: "Requested via" })
    ] })
  ] });
}
function nk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function rk(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function lk({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: z.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(tk, {}),
    /* @__PURE__ */ t(qu, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      pn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(nk, { row: n }),
        detail: /* @__PURE__ */ t(ak, { row: n }),
        expanded: rk(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function ZS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(lk, { ...e }) : /* @__PURE__ */ t(ek, { ...e });
}
const ok = "_runbook_b9agc_2", ik = "_list_b9agc_7", sk = "_step_b9agc_15", ck = "_numeral_b9agc_21", dk = "_body_b9agc_28", uk = "_head_b9agc_34", mk = "_title_b9agc_40", hk = "_detail_b9agc_45", wk = "_actions_b9agc_50", fk = "_webList_b9agc_56", _k = "_webStep_b9agc_60", vk = "_webBody_b9agc_66", bk = "_webTitle_b9agc_74", pk = "_webDetail_b9agc_78", L = {
  runbook: ok,
  list: ik,
  step: sk,
  numeral: ck,
  body: dk,
  head: uk,
  title: mk,
  detail: hk,
  actions: wk,
  webList: fk,
  webStep: _k,
  webBody: vk,
  webTitle: bk,
  webDetail: pk
}, ar = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function tr(e) {
  return String(e + 1).padStart(2, "0");
}
function gk({ step: e, index: a, connection: n }) {
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
function yk({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ t("ol", { className: L.list, children: e.map((r, l) => /* @__PURE__ */ t(gk, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: L.actions, children: a })
  ] });
}
function Nk({ step: e, index: a, connection: n }) {
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
function kk({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${L.list} ${L.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(Nk, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${L.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function e2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(kk, { ...e }) : /* @__PURE__ */ t(yk, { ...e });
}
const $k = "_list_1gu6a_2", Ck = "_check_1gu6a_10", Sk = "_body_1gu6a_16", Rk = "_text_1gu6a_23", Tk = "_pending_1gu6a_32", xk = "_measured_1gu6a_37", Xe = {
  list: $k,
  check: Ck,
  body: Sk,
  text: Rk,
  pending: Tk,
  measured: xk
};
function Lk(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function Ak({ check: e }) {
  const a = Lk(e.passed);
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
function a2({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Xe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(Ak, { check: a }, a.text)) });
}
const Ek = "_root_a6xzy_2", Ik = "_list_a6xzy_10", Mk = "_line_a6xzy_21", Bk = "_at_a6xzy_48", Pk = "_text_a6xzy_52", jk = "_foot_a6xzy_56", Dk = "_idle_a6xzy_68", Hk = "_caret_a6xzy_76", Ok = "_jump_a6xzy_83", he = {
  root: Ek,
  list: Ik,
  line: Mk,
  at: Bk,
  text: Pk,
  foot: jk,
  idle: Dk,
  caret: Hk,
  jump: Ok
}, qk = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function ht(e) {
  return Number.isNaN(Date.parse(e)) ? "" : qk.format(new Date(e));
}
const Fk = { warn: "warning", ok: "ok" };
function zk({ kind: e }) {
  const a = Fk[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function Wk({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${ht(e)}` });
}
function Kk({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${ht(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: he.idle, children: i }),
    /* @__PURE__ */ t(Wk, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const Gk = 8;
function Uk(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > Gk;
}
function Vk({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const nr = Me(null);
function t2({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Gt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(nr.Provider, { value: i, children: n });
}
function Yk() {
  const e = Ie(nr), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function n2({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = w(null), [i, s] = p(0), [c, u] = Yk(), [d, m] = p(!1), v = e.at(-1);
  S(() => {
    s(e.length);
  }, [e.length]), ra(() => {
    const y = l.current;
    y && !d && (y.scrollTop = y.scrollHeight);
  }, [e.length, d]);
  const b = () => {
    var B;
    const y = l.current;
    if (!y) return;
    const E = y.querySelectorAll("[data-consline-text]");
    (B = E.item(E.length - 1)) == null || B.focus(), m(!1);
  };
  return /* @__PURE__ */ o("div", { className: he.root, children: [
    /* @__PURE__ */ t("ol", { className: he.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (y) => m(Uk(y.currentTarget)), children: e.map((y, E) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": E < i, children: [
      /* @__PURE__ */ t("span", { className: he.at, children: ht(y.at) }),
      /* @__PURE__ */ t(zk, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${E}`)) }),
    /* @__PURE__ */ o(Kk, { connection: a, idleSince: n, last: v, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => u(!c), children: "Read new events" }),
      /* @__PURE__ */ t(Vk, { shown: d, onJump: b })
    ] })
  ] });
}
const Xk = "_row_1k8wl_2", Jk = "_head_1k8wl_14", Qk = "_author_1k8wl_20", Zk = "_eta_1k8wl_25", e$ = "_edited_1k8wl_26", a$ = "_body_1k8wl_32", t$ = "_reason_1k8wl_37", n$ = "_actions_1k8wl_42", ge = {
  row: Xk,
  head: Jk,
  author: Qk,
  eta: Zk,
  edited: e$,
  body: a$,
  reason: t$,
  actions: n$
}, r$ = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function l$(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function o$({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function i$({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: ge.reason, id: a, children: e })
  ] });
}
function s$(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function c$(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(o$, { ...e }) : /* @__PURE__ */ t(i$, { reason: e.unavailable, reasonId: e.unavailableId });
}
function r2(e) {
  const { comment: a } = e;
  s$(e);
  const n = N(), r = `${n}-unavailable`, l = r$[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${ge.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: ge.head, children: [
      /* @__PURE__ */ t("span", { className: ge.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: ge.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: ge.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: ge.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: ge.reason, id: n, children: l$(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: ge.actions, children: /* @__PURE__ */ t(c$, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const d$ = "_root_c46wj_2", u$ = "_attach_c46wj_11", m$ = "_actions_c46wj_17", h$ = "_reply_c46wj_23", w$ = "_replyRow_c46wj_28", f$ = "_sendsAs_c46wj_42", Ze = {
  root: d$,
  attach: u$,
  actions: m$,
  reply: h$,
  replyRow: w$,
  sendsAs: f$
};
function rr({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function _$(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = rr(e), s = N();
  return /* @__PURE__ */ o("div", { className: Ze.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ze.replyRow, children: [
      /* @__PURE__ */ t(M, { variant: "reply", labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ t(_, { variant: "ghost", describedBy: s, onClick: () => r(n, l), children: "Send" })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: Ze.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function l2(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(_$, { ...e }) : /* @__PURE__ */ t(v$, { ...e });
}
function v$(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, u] = rr(e);
  return /* @__PURE__ */ o("div", { className: Ze.root, children: [
    /* @__PURE__ */ t(M, { kind: "textarea", label: a, value: c, onChange: u }),
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
const b$ = "_list_1yhks_2", p$ = "_item_1yhks_6", g$ = "_body_1yhks_22", y$ = "_text_1yhks_28", N$ = "_evidence_1yhks_37", k$ = "_consequence_1yhks_49", $$ = "_note_1yhks_54", Fe = {
  list: b$,
  item: p$,
  body: g$,
  text: y$,
  evidence: N$,
  consequence: k$,
  note: $$
};
function C$({ criterion: e }) {
  return /* @__PURE__ */ t(Be, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Ft({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function S$(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function R$({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Fe.body, children: [
    /* @__PURE__ */ t("span", { className: Fe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Ft, { text: " · " }),
      /* @__PURE__ */ t("code", { className: Fe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Ft, { text: " · " }),
      /* @__PURE__ */ t("span", { className: Fe.consequence, children: S$(e.why) })
    ] })
  ] });
}
function T$({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Fe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(C$, { criterion: e }),
    /* @__PURE__ */ t(R$, { criterion: e })
  ] });
}
function o2({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${Fe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(T$, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: Fe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const x$ = "_list_dwhoz_2", L$ = "_rung_dwhoz_6", A$ = "_name_dwhoz_18", E$ = "_actor_dwhoz_32", ba = {
  list: x$,
  rung: L$,
  name: A$,
  actor: E$
}, I$ = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function M$({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = I$[e.state];
  return /* @__PURE__ */ o("li", { className: ba.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ba.name, children: e.name }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ba.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function i2({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ba.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(M$, { rung: a }, a.name)) });
}
const B$ = "_sheet_pw37w_2", P$ = "_title_pw37w_9", j$ = "_stage_pw37w_15", D$ = "_effects_pw37w_20", H$ = "_effect_pw37w_20", O$ = "_numeral_pw37w_31", q$ = "_effectText_pw37w_38", F$ = "_refusals_pw37w_43", z$ = "_reasons_pw37w_52", W$ = "_reason_pw37w_52", K$ = "_actions_pw37w_62", ue = {
  sheet: B$,
  title: P$,
  stage: j$,
  effects: D$,
  effect: H$,
  numeral: O$,
  effectText: q$,
  refusals: F$,
  reasons: z$,
  reason: W$,
  actions: K$
};
function G$({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(_, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function s2({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = N(), u = `${c}-refusal`, [d, m] = p(""), v = n.length > 0;
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
      Cd,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ t(M, { kind: "textarea", label: "Note for the agent", value: d, onChange: m }),
    v && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ t(h, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ t("ul", { className: ue.reasons, children: n.map((b, y) => /* @__PURE__ */ t("li", { className: ue.reason, id: y === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ t(G$, { refused: v, reasonId: u, note: d, onRequeue: l }),
      /* @__PURE__ */ t(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const U$ = "_list_1rowi_2", V$ = "_path_1rowi_7", Y$ = "_head_1rowi_21", X$ = "_label_1rowi_28", J$ = "_consequence_1rowi_35", Q$ = "_ask_1rowi_36", Qe = {
  list: U$,
  path: V$,
  head: Y$,
  label: X$,
  consequence: J$,
  ask: Q$
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
function Z$({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(_, { variant: Wt(a), size: "sm", onClick: () => n(e.kind), children: Ja[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(_, { variant: Wt(a), size: "sm", disabled: !0, describedBy: r, children: Ja[e.kind] }),
    /* @__PURE__ */ t("span", { className: Qe.ask, id: r, children: e.askInstead })
  ] });
}
function e0({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Qe.path, "data-allowed": e.allowed, "data-role": zt(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Qe.head, children: [
      /* @__PURE__ */ t("span", { className: Qe.label, children: e.title ?? Ja[e.kind] }),
      /* @__PURE__ */ t(h, { role: zt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: Qe.consequence, children: e.consequence }),
    /* @__PURE__ */ t(Z$, { path: e, primary: a, onChoose: n })
  ] });
}
function c2({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: Qe.list, children: e.map((n, r) => /* @__PURE__ */ t(e0, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const a0 = "_list_1m7i0_2", t0 = "_item_1m7i0_6", n0 = "_node_1m7i0_18", r0 = "_body_1m7i0_24", l0 = "_head_1m7i0_30", o0 = "_stage_1m7i0_36", i0 = "_version_1m7i0_41", s0 = "_sentence_1m7i0_49", c0 = "_meta_1m7i0_54", Ne = {
  list: a0,
  item: t0,
  node: n0,
  body: r0,
  head: l0,
  stage: o0,
  version: i0,
  sentence: s0,
  meta: c0
}, d0 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function u0({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ne.head, children: [
    /* @__PURE__ */ t("span", { className: Ne.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: Ne.version, title: e.version, children: e.version }) : null
  ] });
}
function m0({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ne.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${Ne.node} ward-history-node`, children: /* @__PURE__ */ t(Be, { size: 9, kind: d0[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ne.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(u0, { entry: e }),
      /* @__PURE__ */ t("span", { className: Ne.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ne.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function d2({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${Ne.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(m0, { entry: a }, a.stage + String(n))) });
}
const h0 = "_thread_1e70p_3", w0 = "_turn_1e70p_8", f0 = "_who_1e70p_27", _0 = "_body_1e70p_32", pa = {
  thread: h0,
  turn: w0,
  who: f0,
  body: _0
}, lr = Me(!1);
function u2({ children: e, density: a }) {
  return /* @__PURE__ */ t(lr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${pa.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function m2({ turn: e }) {
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
const v0 = "_list_yiolt_3", b0 = "_row_yiolt_7", p0 = "_label_yiolt_20", g0 = "_n_yiolt_26", y0 = "_cause_yiolt_33", na = {
  list: v0,
  row: b0,
  label: p0,
  n: g0,
  cause: y0
};
function N0(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const k0 = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function $0({ row: e, formatNumber: a }) {
  return N0(e), /* @__PURE__ */ o("li", { className: `${na.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(Be, { size: 8, ...k0[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: na.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${na.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(C0, { cause: e.cause })
  ] });
}
function C0({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${na.cause} ward-healthrow-cause`, children: e }) : null;
}
function h2({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ t("ul", { className: `${na.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t($0, { row: n, formatNumber: a }, n.label)) });
}
const S0 = "_root_1jxwp_2", R0 = {
  root: S0
};
function w2({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: R0.root, "data-density": l, children: [
    /* @__PURE__ */ t(Da, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const T0 = "_row_dhbre_3", x0 = "_key_dhbre_13", L0 = "_stack_dhbre_24", A0 = "_value_dhbre_32", E0 = "_evidence_dhbre_39", I0 = "_mark_dhbre_47", Ye = {
  row: T0,
  key: x0,
  stack: L0,
  value: A0,
  evidence: E0,
  mark: I0
};
function M0({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(rt, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function f2({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ye.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Ye.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ye.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Ye.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Ye.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Ye.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(M0, { state: e.state }) })
  ] });
}
const B0 = "_cell_gh2sd_2", P0 = {
  cell: B0
}, j0 = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function D0(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function H0(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function O0(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: D0(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function q0(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function _2({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  H0(e, n);
  const r = q0(e);
  return /* @__PURE__ */ t(
    Hd,
    {
      label: "Rejection routing",
      columns: j0,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: P0.cell, "data-norerun": l.noRerun ? !0 : void 0, children: O0(l, i) }),
      empty: a ?? /* @__PURE__ */ t(Sm, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const F0 = "_row_1f2re_2", z0 = "_title_1f2re_12", W0 = "_turns_1f2re_18", K0 = "_waiting_1f2re_19", G0 = "_resolved_1f2re_20", U0 = "_activity_1f2re_21", V0 = "_cost_1f2re_28", Y0 = "_link_1f2re_29", X0 = "_tableLink_1f2re_47", J0 = "_tableRecord_1f2re_48", Q0 = "_tableRow_1f2re_59", Z0 = "_tableTitle_1f2re_71", eC = "_tableResolved_1f2re_76", aC = "_tableMeta_1f2re_87", tC = "_tableCost_1f2re_94", nC = "_tableActivity_1f2re_95", rC = "_tableState_1f2re_105", H = {
  row: F0,
  title: z0,
  turns: W0,
  waiting: K0,
  resolved: G0,
  activity: U0,
  cost: V0,
  link: Y0,
  tableLink: X0,
  tableRecord: J0,
  tableRow: Q0,
  tableTitle: Z0,
  tableResolved: eC,
  tableMeta: aC,
  tableCost: tC,
  tableActivity: nC,
  tableState: rC
}, or = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function lC(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function oC(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function iC(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const sC = { duplicate: "Closed · duplicate" };
function cC({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(Ee, { className: H.tableMeta, text: `waiting on ${e}` });
}
function dC({ value: e }) {
  return /* @__PURE__ */ t("td", { className: H.tableCost, children: e === void 0 ? null : re(e) });
}
function uC({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${H.tableRecord} ward-target`, href: q(e.href), children: `→ ${e.key}` });
}
function mC({ session: e, href: a }) {
  const n = or[e.state];
  return /* @__PURE__ */ o("tr", { className: H.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: H.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${H.tableLink} ward-target`, href: q(a), children: /* @__PURE__ */ t(Ee, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: H.tableMeta, children: oC(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: H.tableResolved, children: [
      iC(e.resolved),
      /* @__PURE__ */ t(cC, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(dC, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: H.tableActivity, children: lC(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: H.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: sC[e.state] ?? n.label }),
      /* @__PURE__ */ t(uC, { link: e.link })
    ] }) })
  ] });
}
function hC({ session: e }) {
  const a = or[e.state];
  return /* @__PURE__ */ o("div", { className: H.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t(Ee, { className: H.title, text: e.title }),
    /* @__PURE__ */ t("span", { className: H.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t(Ee, { className: H.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: H.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: H.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : re(e.cost) }),
    /* @__PURE__ */ t("span", { className: H.activity, children: de(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: H.link, href: q(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function v2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(mC, { session: e.session, href: e.href }) : /* @__PURE__ */ t(hC, { session: e.session });
}
const wC = "_block_1yy2v_3", fC = "_list_1yy2v_9", _C = "_line_1yy2v_14", Qa = {
  block: wC,
  list: fC,
  line: _C
}, vC = { warn: "warning", ok: "ok" };
function bC({ kind: e }) {
  const a = vC[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function pC({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Qa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(bC, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function b2({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${Qa.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: Qa.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(pC, { line: n }, `${r}-${n.text}`)) }) });
}
const gC = "_band_tt7hp_1", yC = "_head_tt7hp_8", NC = "_cell_tt7hp_19", kC = "_index_tt7hp_35", $C = "_title_tt7hp_42", CC = "_note_tt7hp_48", SC = "_cellTitle_tt7hp_53", RC = "_cellBody_tt7hp_58", TC = "_tag_tt7hp_64", pe = {
  band: gC,
  head: yC,
  cell: NC,
  index: kC,
  title: $C,
  note: CC,
  cellTitle: SC,
  cellBody: RC,
  tag: TC
}, Kt = 4;
function p2({ index: e, title: a, note: n, cells: r }) {
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
  HC as ACCENT_PRESETS,
  lS as ActionStack,
  n2 as ActivityConsole,
  UC as AdminIcon,
  qf as AgentCard,
  VC as AppShell,
  qS as AppearanceStrip,
  p2 as Band,
  tS as BarChart,
  ih as BoardColumn,
  gS as BoardFootnote,
  yS as BoardHeader,
  KC as BoardIcon,
  mS as BoardScroller,
  _ as Btn,
  DC as CHIP_ROLES,
  Kn as CREDENTIAL_COLUMNS,
  aS as Callout,
  FS as CapabilityRow,
  m2 as ChatMessage,
  Zt as Checkbox,
  h as Chip,
  Ee as ClampText,
  r2 as ClarificationRow,
  AS as ClauseRuleRow,
  LS as ClauseRules,
  Cn as ColourLadder,
  zS as ComponentRow,
  l2 as Composer,
  kS as ConfigRow,
  NS as ConfigRowHead,
  lt as ConnectionMark,
  t2 as ConsoleAnnounceProvider,
  u2 as Conversation,
  Cd as CostMeter,
  KS as CredentialRow,
  WS as CredentialRowHead,
  o2 as CriteriaList,
  oi as Crumb,
  OC as DENSITIES,
  h2 as DeliveryHealth,
  fS as DeniedState,
  IS as DryRunRail,
  Sm as EmptyState,
  GS as EnvCard,
  M as Field,
  wS as FilteredEmpty,
  dS as FormStack,
  Da as GateChecklist,
  i2 as GateLadder,
  Hd as Grid,
  BS as HandoffRuleRow,
  MS as HandoffRules,
  WC as HomeIcon,
  $S as ItemDrawer,
  US as KeyPanel,
  Sr as LIVE_EVENT_TYPES,
  cf as LegacyBoardColumn,
  SS as LegacyBoardHeader,
  RS as LegacyConfigRow,
  xS as LegacyItemDrawer,
  af as LegacyOverCapNote,
  TS as LegacyPreviewRail,
  Nn as LegacyWorkCard,
  Se as LiveIndicator,
  _S as LoadFailed,
  pS as Loading,
  Jn as MCP_SERVER_COLUMNS,
  rt as Mark,
  YS as MarkUpload,
  Be as Marker,
  JS as McpServerRow,
  XS as McpServerRowHead,
  XC as Menu,
  YC as MenuButton,
  PS as NewStreamModal,
  xm as OverCapNote,
  ea as Overlay,
  ES as PARTIAL_STEP_REASON,
  Qn as POLICY_CHIP_WIDTH,
  iS as PageFrame,
  eS as PageHeader,
  nS as PlainList,
  QS as PolicyRow,
  CS as PreviewRail,
  za as ROLE_MATRIX_COLUMNS,
  jn as RULE_ACTIONS,
  _n as Radio,
  w2 as ReadyChecklist,
  cS as RecordSection,
  s2 as RequeueSheet,
  c2 as ResolveBlock,
  f2 as ResolvedFieldRow,
  ZS as RoleMatrixRow,
  _2 as RoutingTable,
  jS as RuleRow,
  e2 as RunbookSteps,
  Cr as STREAM_STEPS,
  uS as SectionBand,
  xt as SectionHeader,
  wn as SegmentedControl,
  sn as Select,
  v2 as SessionRow,
  ZC as Sidebar,
  DS as StageColumn,
  hS as StageGrid,
  d2 as StageHistory,
  Nb as StageListEditor,
  vS as StaleStrip,
  Ba as StatStrip,
  HS as StreamRow,
  GC as StudioIcon,
  sS as SubjectRail,
  We as Switch,
  QC as TabLinks,
  rS as TableHead,
  JC as Tabs,
  MC as ThemeProvider,
  OS as ToolRow,
  oS as TopBar,
  qu as Tree,
  pn as TreeRow,
  b2 as TypedInputBlock,
  ro as UNSAFE_HREF,
  a2 as ValidationList,
  EC as VisibilityProvider,
  IC as Visible,
  jC as WARD_VERSION,
  ja as WorkCard,
  bS as WriteUnavailableStrip,
  lC as agoSince,
  wr as clock,
  Hb as colourStatus,
  ae as count,
  ce as duration,
  Za as elapsed,
  PC as eventSourceTransport,
  La as isStreamStep,
  Aa as isValidatedStreamStep,
  v_ as ladderValidation,
  c1 as mcpConnectionChip,
  i1 as mcpToolName,
  re as money,
  we as ms,
  gn as ordered,
  Vt as ratio,
  xy as restartLabel,
  q as safeHref,
  de as stamp,
  et as stream,
  FC as streamChip,
  Ma as streamChipProps,
  ve as streamColour,
  Tr as streamHex,
  qC as streamVars,
  fa as useBorderFlash,
  Nr as useFocusTrap,
  zC as useLiveFeed,
  BC as useReturnFocus,
  xa as useRovingTabindex,
  at as useTicker,
  fr as useVisible,
  W as v,
  VS as validateMark,
  ca as validatedStep,
  Xt as validatedStreamSteps
};
