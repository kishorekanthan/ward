import { jsx as t, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as Gt, useContext as Ee, createContext as Ie, useState as p, useEffect as S, useCallback as J, useRef as w, useLayoutEffect as ra, useId as N, isValidElement as sr, Children as cr, Fragment as dr } from "react";
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
const Yt = Ie(/* @__PURE__ */ new Set());
function AC({ hidden: e, children: a }) {
  const n = Gt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Yt.Provider, { value: n, children: a });
}
function fr(e) {
  return !Ee(Yt).has(e);
}
function EC({ id: e, children: a, fallback: n = null }) {
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
function IC({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
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
  return { onKeyDown: J(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(pr));
      yr(n, e.current, r);
    },
    [e]
  ) };
}
function MC(e, a = !0) {
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
  const i = J((u) => n(u), []), s = J((u) => {
    var m;
    n(u), (m = r.current.get(u)) == null || m.focus();
  }, []), c = J(
    (u) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const v = Math.max(0, m.indexOf(a)), b = $r(u.key, e);
      b !== void 0 ? (u.preventDefault(), s(m[kr(v + b, 0, m.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(m[0])) : u.key === "End" && (u.preventDefault(), s(m[m.length - 1]));
    },
    [a, s, e]
  ), d = J(
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
const BC = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, PC = "0.2.0", jC = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Cr = [1, 2, 3, 4, 5, 6], Xt = [1, 2, 3], Sr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], DC = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], HC = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], W = {
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
function OC(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function qC(e) {
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
function FC(e, a) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = w(/* @__PURE__ */ new Map()), c = w(0), d = w(""), u = w(0), m = w(null), v = w(0), b = w(0), y = w(!1), E = w("reconnecting"), B = J((R) => {
    E.current = R, r(R);
  }, []), le = J(() => {
    c.current = Date.now();
  }, []), Re = J((R) => {
    for (const [G, be] of s.current)
      (be === "*" || R.itemKey === be) && G(R);
  }, []), ae = J(() => {
    m.current = a(e, { lastEventId: d.current }, {
      onEvent: (R, G, be) => {
        const Be = Er(R, G, be);
        Be !== null && (Be.id && (d.current = Be.id), le(), y.current = !1, B("live"), i(Be.at), Re(Be));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, le(), B("live");
      },
      onError: () => {
        var G;
        (G = m.current) == null || G.close(), m.current = null, y.current = !0, E.current !== "stale" && B("reconnecting");
        const R = Math.min(we.reconnectBase * 2 ** u.current, we.reconnectMax);
        u.current += 1, v.current = window.setTimeout(ae, R);
      }
    });
  }, [Re, B, le, a, e]), We = J((R) => {
    y.current = !0, R.close(), m.current = null, v.current = window.setTimeout(ae, we.reconnectBase);
  }, [ae]), Ke = J((R, G) => (s.current.set(G, R), () => {
    s.current.delete(G);
  }), []);
  return S(() => (ae(), b.current = window.setInterval(() => {
    const R = Date.now() - c.current, G = Ir(R, E.current);
    G && B(G);
    const be = m.current;
    Mr(R, y.current, be) && We(be);
  }, we.tick), () => {
    var R;
    window.clearInterval(b.current), window.clearTimeout(v.current), y.current = !1, (R = m.current) == null || R.close(), m.current = null;
  }), [ae, We, B]), { connection: n, lastEventAt: l, subscribe: Ke };
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
  const n = w(0), r = J((l) => {
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
}, ql = Ie(null), ga = [], ya = /* @__PURE__ */ new Map();
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
  }, [a]), J(() => yt(r.current), []);
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
  const a = Ee(ql);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = w(null), n = w(null), r = N(), l = ao(e.container), i = Ea("(min-width: 768px)"), s = Xl(e.kind, i), c = Jl(e, r), d = Nr(n), u = Yl(a, l, e.returnFocusTo), m = J(() => {
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
function ia(e, a) {
  S(() => {
    const n = e.current;
    if (!n) return;
    const r = () => Jt(n);
    n.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [n, ...n.children]) l == null || l.observe(i);
    return r(), () => {
      n.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, a]);
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
function zC() {
  return /* @__PURE__ */ t(sa, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function WC() {
  return /* @__PURE__ */ o(sa, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function KC() {
  return /* @__PURE__ */ o(sa, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function GC() {
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
function UC(e) {
  return Bo(e) ? /* @__PURE__ */ t(Ro, { ...e }) : /* @__PURE__ */ t(Mo, { ...e });
}
function Ia(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Po = "_root_197jc_2", jo = "_row_197jc_8", Do = "_box_197jc_14", Ho = "_label_197jc_21", Oo = "_lockedNote_197jc_26", qo = "_consequence_197jc_34", Fo = "_sample_197jc_69", De = {
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
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${De.consequence} ward-check-consequence`, children: a }) : null;
}
function Ko({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${De.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Go({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: De.sample, "aria-hidden": "true", children: e }) : null;
}
function Zt(e) {
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = zo(e);
  return /* @__PURE__ */ o("div", { className: `${De.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: De.row, children: [
      /* @__PURE__ */ t(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${De.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (l) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, l.target.checked));
          },
          "aria-describedby": Ia(n, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: De.label, children: [
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
function Ze({ text: e, as: a = "span", className: n }) {
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
const Zo = "_nav_8lufj_2", ei = "_list_8lufj_8", ai = "_item_8lufj_15", ti = "_link_8lufj_30", ni = "_sep_8lufj_40", ri = "_current_8lufj_44", li = "_chips_8lufj_48", Pe = {
  nav: Zo,
  list: ei,
  item: ai,
  link: ti,
  sep: ni,
  current: ri,
  chips: li
};
function oi({ path: e, chips: a }) {
  return /* @__PURE__ */ t("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Pe.nav, children: [
    /* @__PURE__ */ t("ol", { className: Pe.list, children: e.map((n, r) => /* @__PURE__ */ o("li", { className: Pe.item, children: [
      r > 0 ? /* @__PURE__ */ t("span", { className: Pe.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${Pe.link} ward-target`, href: q(n.href), children: n.label }) : n.label : /* @__PURE__ */ t("span", { className: Pe.current, "aria-current": "page", children: n.label })
    ] }, n.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${Pe.chips} ward-chiprow`, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
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
const ji = "_field_djnju_2", Di = "_label_djnju_8", Hi = "_labelHidden_djnju_15", Oi = "_control_djnju_25", qi = "_mono_djnju_45", Fi = "_area_djnju_50", zi = "_invalid_djnju_57", Ae = {
  field: ji,
  label: Di,
  labelHidden: Hi,
  control: Oi,
  mono: qi,
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
}, dn = Ie(null);
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
function VC(e) {
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
function Xe(e, a, n) {
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
    ["ArrowDown", () => e.focus(Xe(n, e.current(), 1))],
    ["ArrowUp", () => e.focus(Xe(n, e.current(), -1))],
    ["Home", () => e.focus(Xe(n, -1, 1))],
    ["End", () => e.focus(Xe(n, n.length, -1))],
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
    n && s(n === "first" ? Xe(i, -1, 1) : Xe(i, i.length, -1));
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
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: q(a.href), ...r, children: a.label }) : /* @__PURE__ */ t("button", { type: "button", ...r, children: a.label });
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
  const e = Ee(dn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function YC({ entries: e, footer: a, align: n = "start" }) {
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
function XC({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l = 1 }) {
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
function JC({ links: e, active: a, label: n, level: r = 1 }) {
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
const Ls = "_sidebar_s9o1j_3", As = "_brand_s9o1j_9", Es = "_mark_s9o1j_17", Is = "_word_s9o1j_24", Ms = "_nav_s9o1j_30", Bs = "_navItem_s9o1j_39", Ps = "_footLink_s9o1j_49", js = "_group_s9o1j_58", Ds = "_groupName_s9o1j_65", Hs = "_agents_s9o1j_81", Os = "_agent_s9o1j_81", qs = "_root_s9o1j_96", Fs = "_agentTop_s9o1j_105", zs = "_dot_s9o1j_112", Ws = "_agentName_s9o1j_124", Ks = "_agentMeta_s9o1j_138", Gs = "_foot_s9o1j_49", Us = "_footName_s9o1j_150", Vs = "_footLinks_s9o1j_157", Ys = "_linkBrand_s9o1j_184", Xs = "_label_s9o1j_205", Js = "_note_s9o1j_210", Qs = "_footer_s9o1j_226", x = {
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
  agent: Os,
  root: qs,
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
function ec({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ t("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${x.footLink} ward-target`, href: q(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function ac({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
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
        ee(r.length)
      ] }),
      l && /* @__PURE__ */ t("a", { className: x.new, href: q(l.href), children: l.label })
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
  return /* @__PURE__ */ o("a", { href: q(e.href), "aria-current": a ? "page" : void 0, children: [
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
function QC(e) {
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
function Me({ size: e, kind: a, label: n }) {
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
    /* @__PURE__ */ t(Me, { size: 6, kind: "green" }),
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
  return a === "record" ? /* @__PURE__ */ t(Ze, { as: "h1", className: Y.title, text: e }) : /* @__PURE__ */ t("h1", { className: Y.title, children: e });
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
function Oc(...e) {
  return e.some((a) => a === null);
}
function qc(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Fc(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + qc(e);
}
function zc(e, a, n, r, l) {
  if (l === 0 || Oc(a, n, r)) return !1;
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
function ZC({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: m, headingRef: v, actionsRef: b, measureRef: y, collapsed: E } = Uc(i, Gc(i, s)), B = s.length > 0, { disclosure: le, close: Re } = Dc(E || B, b), ae = Pc(s, i, E, d);
  return /* @__PURE__ */ o("header", { className: Y.root, "data-density": u, children: [
    /* @__PURE__ */ t(Hc, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Y.row, ref: m, children: [
      /* @__PURE__ */ t("div", { ref: v, className: Y.headingWrap, children: /* @__PURE__ */ t(Mc, { title: n, consequence: r, consequenceHint: l, density: u }) }),
      /* @__PURE__ */ o("div", { className: Y.actionsWrap, children: [
        /* @__PURE__ */ t(Yc, { connection: c }),
        /* @__PURE__ */ t("div", { className: Y.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ t(Bc, { actions: i, hasMore: B, collapsed: E, onOverflow: d, disclosure: le }) })
      ] })
    ] }),
    /* @__PURE__ */ t(jc, { actions: ae, disclosure: le, onEscape: Re }),
    /* @__PURE__ */ t(Vc, { actions: i, hasMore: B, measureRef: y })
  ] });
}
const Xc = "_root_td96x_2", Jc = "_body_td96x_16", Rt = {
  root: Xc,
  body: Jc
};
function eS({ variant: e = "info", ticket: a, children: n }) {
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
function vd({ title: e, categories: a, series: n, top: r, format: l = ee, categoryHead: i = "Category", missing: s = dd }) {
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
function aS(e) {
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
      ne(e),
      " ",
      /* @__PURE__ */ o("span", { className: Te.of, children: [
        "of ",
        ne(a)
      ] })
    ] }),
    /* @__PURE__ */ t(
      "meter",
      {
        className: `${Te.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${ne(e)} of ${ne(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    n && /* @__PURE__ */ t("ul", { className: Te.rows, children: n.map((l) => /* @__PURE__ */ o("li", { className: `${Te.row} ward-costrow`, children: [
      /* @__PURE__ */ t("span", { className: Te.label, children: l.label }),
      /* @__PURE__ */ t("span", { className: Te.amount, children: ne(l.amount) })
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
function Od({
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
const qd = "_list_v0s52_2", Fd = {
  list: qd
};
function tS({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: Fd.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const zd = "_label_1u62a_2", Wd = {
  label: zd
};
function nS({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: Wd.label, children: a.header }) }, a.key)) }) });
}
const Kd = "_stack_bp6a0_2", Gd = {
  stack: Kd
};
function rS({ children: e }) {
  return /* @__PURE__ */ t("span", { className: Gd.stack, "data-ward-action-stack": "", children: e });
}
const Ud = "_set_1z0sq_2", Vd = "_legend_1z0sq_7", Yd = "_row_1z0sq_15", Xd = "_control_1z0sq_20", Jd = "_input_1z0sq_26", Qd = "_label_1z0sq_31", Zd = "_consequence_1z0sq_36", je = {
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
  return /* @__PURE__ */ o("fieldset", { className: je.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: je.legend, children: e }),
    a.map((m) => {
      const v = `${u}-${m.value}`, b = m.consequence ? `${v}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: je.row, children: [
        /* @__PURE__ */ o("span", { className: je.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: v,
              type: "radio",
              name: u,
              className: je.input,
              value: m.value,
              checked: n === m.value,
              disabled: l,
              "aria-describedby": Ia(b, s),
              onChange: () => !l && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: v, className: je.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ t("p", { id: b, className: `${je.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const eu = "_root_s12pg_2", au = "_head_s12pg_11", tu = "_note_s12pg_30", nu = "_index_s12pg_35", ru = "_dot_s12pg_39", lu = "_counter_s12pg_50", ou = "_trailing_s12pg_58", He = {
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
    /* @__PURE__ */ t("span", { className: `${He.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: He.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function su({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: He.counter, "aria-hidden": "true", children: e }) : null;
}
function xt({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${He.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: He.head, children: [
      /* @__PURE__ */ t(iu, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: He.note, children: n }),
    /* @__PURE__ */ t(su, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: He.trailing, children: i })
  ] });
}
const cu = "_strip_ww53x_2", du = "_cell_ww53x_7", uu = "_value_ww53x_12", mu = "_link_ww53x_29", hu = "_label_ww53x_49", Fe = {
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
const vn = (e) => `${Fe.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function fu({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: Fe.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: vn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${Fe.label} ward-stat-label`, children: e.label })
  ] });
}
function _u({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: Fe.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: vn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${Fe.link} ward-stat-link`, href: q(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${Fe.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Ba({ cells: e, divided: a = !1 }) {
  return wu(e), /* @__PURE__ */ t("dl", { className: `${Fe.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(fu, { cell: n }, n.label) : /* @__PURE__ */ t(_u, { cell: n, href: n.href }, n.label)) });
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
function ze({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
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
const $u = "_bar_1vp69_2", Cu = "_skip_1vp69_11", Su = "_mark_1vp69_22", Ru = "_nav_1vp69_30", Tu = "_list_1vp69_34", xu = "_select_1vp69_41", Lu = "_selectTrigger_1vp69_45", Au = "_dest_1vp69_52", Eu = "_actor_1vp69_71", Iu = "_actorMark_1vp69_84", Mu = "_actorLabel_1vp69_89", Bu = "_tagline_1vp69_108", oe = {
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
function lS({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = ju(r);
  return /* @__PURE__ */ o("header", { className: oe.bar, children: [
    /* @__PURE__ */ t("a", { className: `${oe.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ t("span", { className: oe.mark, children: e }),
    l && /* @__PURE__ */ t("span", { className: oe.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: oe.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ t("ul", { className: oe.list, children: a.map((d) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "a",
        {
          className: `${oe.dest} ward-target`,
          href: q(d.href),
          "aria-current": d.id === n ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ t(
        sn,
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
      /* @__PURE__ */ t("span", { className: oe.actorMark, "aria-hidden": "true", children: Pu(c) })
    ] })
  ] });
}
const Du = "_tree_zzoob_2", Hu = "_item_zzoob_6", Ou = "_row_zzoob_10", qu = "_button_zzoob_22", ka = {
  tree: Du,
  item: Hu,
  row: Ou,
  button: qu
}, bn = Ie(null);
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
  const a = Ee(bn);
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
const Qu = "_frame_1sbky_2", Zu = "_subjectRail_1sbky_22", em = "_subject_1sbky_22", am = "_rail_1sbky_42", tm = "_record_1sbky_66", nm = "_recordBody_1sbky_71", rm = "_stageGrid_1sbky_120", lm = "_band_1sbky_146", om = "_bandBody_1sbky_155", im = "_bandActions_1sbky_160", sm = "_scroller_1sbky_168", cm = "_board_1sbky_204", dm = "_lanes_1sbky_213", Z = {
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
  lanes: dm
};
function oS({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: Z.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function At(e) {
  return e ? "true" : void 0;
}
function iS({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Z.subjectRail, "data-ward-subject-rail": n, "data-ruled": At(i), children: [
    /* @__PURE__ */ t("div", { className: Z.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Z.rail, "data-sticky": At(l), "aria-label": r, children: a })
  ] });
}
function sS({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(xt, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(xt, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: Z.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const um = "_form_1j8ub_2", mm = "_fields_1j8ub_9", hm = "_actions_1j8ub_19", Oa = {
  form: um,
  fields: mm,
  actions: hm
};
function cS({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Oa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Oa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Oa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function dS({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: Z.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Z.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Z.bandActions, children: a })
  ] });
}
const wm = "(max-width: 767.98px)";
function ot({ label: e, children: a, laneCount: n }) {
  const r = w(null);
  ia(r, n ?? cr.count(a));
  const l = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t("div", { ref: r, className: Z.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: l, children: a });
}
function fm({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Z.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(ot, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function _m({ lanes: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: Z.board, "data-ward-board": "", children: /* @__PURE__ */ t(ot, { label: a, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ t(dr, { children: n.content }, n.id)) }) });
}
function uS({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = Ea(wm);
  return n === void 0 ? /* @__PURE__ */ t(ot, { label: a, children: e }) : l ? /* @__PURE__ */ t(fm, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(_m, { lanes: n, label: a });
}
function mS({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = w(null), i = Math.max(e, 1);
  ia(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ t("div", { ref: l, className: Z.stageGrid, role: "region", "aria-label": n, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
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
function hS({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(Pa, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function wS(e) {
  return /* @__PURE__ */ t(Pa, { ...e });
}
function fS({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(Pa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function _S({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function vS({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function bS({ label: e, startedAt: a }) {
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
const Lm = "_card_k7btg_3", Am = "_hit_k7btg_31", Em = "_head_k7btg_44", Im = "_title_k7btg_51", Mm = "_meta_k7btg_57", Bm = "_since_k7btg_66", Pm = "_sep_k7btg_76", jm = "_fields_k7btg_80", Dm = "_field_k7btg_80", Hm = "_last_k7btg_98", Om = "_reason_k7btg_110", se = {
  card: Lm,
  hit: Am,
  head: Em,
  title: Im,
  meta: Mm,
  since: Bm,
  sep: Pm,
  fields: jm,
  field: Dm,
  last: Hm,
  reason: Om
}, qm = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Fm(e, a, n) {
  const r = fa(e, "blue"), l = fa(e, "orange"), i = fa(e, "green"), s = w(/* @__PURE__ */ new Set());
  S(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = qm[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, l]);
}
const zm = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ne(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Wm(e, a) {
  return zm[a](e);
}
function Km({ item: e, connection: a }) {
  const n = /* @__PURE__ */ t("span", { className: se.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ o("p", { className: se.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    n,
    /* @__PURE__ */ t(Se, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
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
function Gm({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: se.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function Um({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: se.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Vm({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: se.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: se.field, children: Wm(e, n) }, n)) });
}
const Va = (e) => e ? !0 : void 0;
function Ym(e) {
  return { "--stream": ve(e.streamStep, "id") };
}
function Xm(e, a, n) {
  e == null || e(a, n);
}
function Jm(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Qm({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: se.last, "data-stale": Va(a), children: n }) : null;
}
function ja(e) {
  const a = e.fields ?? [], n = e.item, r = w(null);
  Fm(r, n.key, e.feed);
  const l = Jm(e.feed), i = Ym(n);
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
        /* @__PURE__ */ t("button", { type: "button", className: se.hit, onClick: (s) => Xm(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(Gm, { item: n }),
        /* @__PURE__ */ t(Ze, { as: "p", className: se.title, text: n.title }),
        /* @__PURE__ */ t(Km, { item: n, connection: l }),
        /* @__PURE__ */ t(Um, { reason: n.blockedReason }),
        /* @__PURE__ */ t(Vm, { item: n, fields: a }),
        /* @__PURE__ */ t(Qm, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const Zm = "_column_1j8bi_3", eh = "_head_1j8bi_21", ah = "_label_1j8bi_30", th = "_count_1j8bi_39", nh = "_list_1j8bi_53", ta = {
  column: Zm,
  head: eh,
  label: ah,
  count: th,
  list: nh
};
function gn(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function rh({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: ta.head, children: [
    /* @__PURE__ */ t("h2", { className: ta.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: ta.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function lh(e) {
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
function oh({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), m = e.cap !== void 0 && a.length > e.cap, v = gn(a, r);
  return /* @__PURE__ */ o("section", { className: ta.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(rh, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(lh, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: v }),
    m && /* @__PURE__ */ t(xm, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const ih = "_foot_cs4jr_2", sh = "_note_cs4jr_13", ch = "_link_cs4jr_19", qa = {
  foot: ih,
  note: sh,
  link: ch
};
function pS({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: qa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: qa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${qa.link} ward-target`, href: q(e), children: "Configure board" })
  ] });
}
const dh = "_head_1tfi5_3", uh = "_identity_1tfi5_12", mh = "_titleRow_1tfi5_18", hh = "_title_1tfi5_18", wh = "_key_1tfi5_35", fh = "_rollup_1tfi5_45", _h = "_tools_1tfi5_53", vh = "_swatch_1tfi5_101", bh = "_mark_1tfi5_108", ye = {
  head: dh,
  identity: uh,
  titleRow: mh,
  title: hh,
  key: wh,
  rollup: fh,
  tools: _h,
  swatch: vh,
  mark: bh
}, Et = "initials:";
function ph(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ee(e)} loaded this week`;
}
function gh(e) {
  const a = [ph(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ee(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function yh(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ee(e.inFlight),
      " in flight"
    ] }),
    " · ",
    gh(e)
  ] });
}
function Nh(e) {
  return e.startsWith(Et) ? e.slice(Et.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function kh({ markRef: e, streamStep: a }) {
  const n = { "--stream": ve(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ye.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: Nh(e) }) : /* @__PURE__ */ t("span", { className: ye.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function $h({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function gS({
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
        /* @__PURE__ */ t(kh, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ye.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ye.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ye.rollup, "aria-live": "polite", children: yh(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ye.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t($h, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(_, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(lt, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const Ch = "_head_1sejb_14", Sh = "_line_1sejb_15", Rh = "_cHandle_1sejb_36", Th = "_cName_1sejb_41", xh = "_nameLine_1sejb_49", Lh = "_cLabel_1sejb_56", Ah = "_cCap_1sejb_61", Eh = "_cShown_1sejb_66", Ih = "_name_1sejb_49", Mh = "_noCap_1sejb_88", Bh = "_state_1sejb_102", Ph = "_handle_1sejb_111", jh = "_sub_1sejb_137", j = {
  head: Ch,
  line: Sh,
  cHandle: Rh,
  cName: Th,
  nameLine: xh,
  cLabel: Lh,
  cCap: Ah,
  cShown: Eh,
  name: Ih,
  noCap: Mh,
  state: Bh,
  handle: Ph,
  sub: jh
}, Dh = "can't be hidden or collapsed", Hh = "terminal · counted, not a column";
function yS() {
  return /* @__PURE__ */ o("div", { className: j.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: j.cHandle }),
    /* @__PURE__ */ t("span", { className: j.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: j.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: j.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: j.cShown, children: "Shown" })
  ] });
}
function Oh(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function qh(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function It(e) {
  return e.gate ? Dh : e.terminal ? Hh : qh(e.agentsMounted);
}
function Fh(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function zh({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: j.cName, children: [
    /* @__PURE__ */ o("span", { className: j.nameLine, children: [
      /* @__PURE__ */ t("span", { className: j.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    It(e) && /* @__PURE__ */ t("span", { className: j.sub, children: It(e) })
  ] });
}
function Wh(e) {
  return e === void 0 ? "" : String(e);
}
function Kh(e) {
  return e === "" ? void 0 : Number(e);
}
function Gh({ name: e, onReorder: a }) {
  return /* @__PURE__ */ t("span", { className: j.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: j.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (n) => Fh(n, a),
      children: "⠿"
    }
  ) });
}
function Uh({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${j.cCap} ${j.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: j.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Wh(a.cap), onChange: (r) => n({ ...a, cap: Kh(r) }) }) });
}
function Vh({ stage: e, config: a, onChange: n }) {
  const r = Oh(e, a.shown), l = e.gate || e.terminal, i = (s) => n({ ...a, shown: s });
  return /* @__PURE__ */ o("span", { className: j.cShown, children: [
    /* @__PURE__ */ t(ze, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ t("span", { className: j.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function Yh(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function NS({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: j.line, "data-kind": Yh(e), children: [
    /* @__PURE__ */ t(Gh, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(zh, { stage: e }),
    /* @__PURE__ */ t("span", { className: j.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(Uh, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(Vh, { stage: e, config: a, onChange: n })
  ] });
}
const Xh = "_body_1a4f4_2", Jh = "_head_1a4f4_9", Qh = "_summary_1a4f4_19", Zh = "_block_1a4f4_20", ew = "_actionsBlock_1a4f4_21", aw = "_title_1a4f4_41", tw = "_note_1a4f4_46", nw = "_k_1a4f4_51", rw = "_kv_1a4f4_58", lw = "_row_1a4f4_64", ow = "_label_1a4f4_75", iw = "_value_1a4f4_84", sw = "_quote_1a4f4_90", cw = "_actions_1a4f4_21", dw = "_resolve_1a4f4_103", D = {
  body: Xh,
  head: Jh,
  summary: Qh,
  block: Zh,
  actionsBlock: ew,
  title: aw,
  note: tw,
  k: nw,
  kv: rw,
  row: lw,
  label: ow,
  value: iw,
  quote: sw,
  actions: cw,
  resolve: dw
};
function uw(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function mw(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(Se, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function hw(e) {
  const a = ca(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function ww(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...Ma(hw(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...uw(e),
    ...mw(e, a)
  ];
}
function fw({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: D.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: D.k, children: a }),
    e
  ] });
}
function _w({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: D.head, children: [
    /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function vw({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: D.block, children: [
    /* @__PURE__ */ t("p", { className: D.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: D.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: D.note, children: e.agentMeta })
  ] }) : null;
}
function kS({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const d = N(), u = ww(e, l);
  return /* @__PURE__ */ t(ea, { kind: "drawer", labelledBy: d, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: D.body, children: [
    /* @__PURE__ */ t(_w, { item: e }),
    /* @__PURE__ */ o("div", { className: D.summary, children: [
      /* @__PURE__ */ t("h2", { className: D.title, id: d, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: D.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: D.kv, children: u.map(([m, v]) => /* @__PURE__ */ o("div", { className: D.row, children: [
      /* @__PURE__ */ t("dt", { className: D.label, children: m }),
      /* @__PURE__ */ t("dd", { className: D.value, children: v })
    ] }, m)) }),
    /* @__PURE__ */ t(vw, { item: e }),
    /* @__PURE__ */ o("div", { className: D.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: D.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: D.note, children: c })
    ] }),
    /* @__PURE__ */ t(fw, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const bw = "_root_3azmy_2", pw = "_list_3azmy_7", gw = "_item_3azmy_12", yw = "_box_3azmy_18", Nw = "_text_3azmy_23", kw = "_note_3azmy_28", Ge = {
  root: bw,
  list: pw,
  item: gw,
  box: yw,
  text: Nw,
  note: kw
};
function Da({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ge.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${Ge.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ge.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ge.box, children: /* @__PURE__ */ t(rt, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ge.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${Ge.note} ward-checklist-note`, children: a })
  ] });
}
const $w = "_rail_znbbp_2", Cw = "_k_znbbp_11", Sw = "_head_znbbp_19", Rw = "_section_znbbp_25", Tw = "_card_znbbp_39", xw = "_strip_znbbp_46", Lw = "_skeleton_znbbp_60", Aw = "_skeletonLabel_znbbp_74", Ew = "_bar_znbbp_80", Iw = "_note_znbbp_89", me = {
  rail: $w,
  k: Cw,
  head: Sw,
  section: Rw,
  card: Tw,
  strip: xw,
  skeleton: Lw,
  skeletonLabel: Aw,
  bar: Ew,
  note: Iw
};
function Mw(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Fa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function Bw({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function Pw({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(oh, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function jw(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(Pw, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(Bw, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function $S(e) {
  const a = Mw(e.onOpen), n = gn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(Fa, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(ja, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Fa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(jw, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(Fa, { title: "Effect of this config", children: /* @__PURE__ */ t(Da, { items: e.effects, density: "compact" }) })
  ] });
}
function Dw(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function Hw(e) {
  return Math.ceil(e.length / 2);
}
function Ow(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function yn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function qw(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = yn(e);
  l !== void 0 && n(l), r(Ow(e.type));
}
function Fw(e, a, n, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => qw(i, n, r, l));
  }, [e, a, n, r, l]);
}
function zw(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Ww(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Kw(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Gw(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(Hw(a ?? [])) + ")"
  };
}
function Uw(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Vw(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: ne(e.cost) }) : null;
}
function Yw(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function Xw(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(Se, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function Jw(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function Qw(e, a) {
  return a === void 0 ? e : Dw(e, a.ref);
}
function Zw(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function oa(e) {
  return e === !0 ? "true" : void 0;
}
function Nn(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = w(null), i = fa(l), s = w(/* @__PURE__ */ new Set()), [c, d] = p(zw(a));
  Fw(e.feed, a.key, s, d, i);
  const u = Ww(a, r), m = Kw(a, n), v = Gw(a, e.fields), b = Jw(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Zw(e),
      className: "ward-workcard",
      "data-flagged": oa(a.flagged),
      "data-selected": oa(e.selected),
      style: v,
      ref: Qw(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Uw(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: u.role, label: u.label }),
          Vw(a, e.fields),
          Yw(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Xw(n, c, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function ef({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function af(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function tf(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function nf(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(ef, { count: e.items.length, cap: e.column.cap });
}
function rf(e, a) {
  return e.roving ?? a;
}
function lf(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function of(e, a) {
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
function sf(e) {
  const a = N(), n = xa({ orientation: "vertical" }), r = rf(e, n), l = af(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": oa(l), "data-gate": oa(e.column.gate), children: [
    tf(e.column, e.items.length, a),
    nf(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...lf(e, n), children: of(e, r) })
  ] });
}
function cf(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function df(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function uf(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function CS(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: cf(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      df(e),
      uf(e.onConfigure),
      /* @__PURE__ */ t(lt, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function mf(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function hf(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(ze, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(ze, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function wf(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function SS(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": oa(mf(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: hf(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(Zt, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    wf(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function RS(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(Nn, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(sf, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function ff(e, a) {
  const n = yn(e);
  n !== void 0 && a(n);
}
function _f(e, a, n) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => ff(r, n));
  }, [e, a, n]);
}
function vf(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function bf(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ne(e.cost)]), a;
}
function pf(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(Se, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function gf(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function TS(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  _f(e.feed, a.key, l);
  const i = [...vf(a), ...bf(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      pf(n, r)
    ] }),
    gf(a, e.actions)
  ] });
}
const yf = "_card_54446_3", Nf = "_head_54446_30", kf = "_mark_54446_38", $f = "_name_54446_50", Cf = "_chips_54446_71", Sf = "_description_54446_77", Rf = "_run_54446_82", Tf = "_sep_54446_91", xf = "_facts_54446_96", Lf = "_fact_54446_96", Af = "_factLabel_54446_109", Ef = "_factValue_54446_113", re = {
  card: yf,
  head: Nf,
  mark: kf,
  name: $f,
  chips: Cf,
  description: Sf,
  run: Rf,
  sep: Tf,
  facts: xf,
  fact: Lf,
  factLabel: Af,
  factValue: Ef
}, If = { live: "done", draft: "running", paused: "meta" };
function Mf(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function Bf({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: If[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function Pf({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: re.description, children: e });
}
function jf({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(Se, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function Df({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: re.fact, children: [
    /* @__PURE__ */ t("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function Hf(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Of({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": ve(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: Mf(s),
      style: c,
      "data-selected": d,
      "data-paused": Hf(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: re.head, children: [
          /* @__PURE__ */ t("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${re.name} ward-rowlink ward-target`, href: q(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(Pf, { description: e.description }),
        /* @__PURE__ */ t(jf, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(Bf, { versions: e.versions }),
        /* @__PURE__ */ t(Df, { facts: i })
      ]
    }
  );
}
const qf = "_list_4dcyc_2", Ff = "_row_4dcyc_11", zf = "_head_4dcyc_23", Wf = "_id_4dcyc_30", Kf = "_lock_4dcyc_35", Gf = "_reason_4dcyc_41", Uf = "_remove_4dcyc_46", Vf = "_clauses_4dcyc_50", Yf = "_clause_4dcyc_50", Xf = "_label_4dcyc_64", Jf = "_cell_4dcyc_71", Qf = "_value_4dcyc_76", ie = {
  list: qf,
  row: Ff,
  head: zf,
  id: Wf,
  lock: Kf,
  reason: Gf,
  remove: Uf,
  clauses: Vf,
  clause: Yf,
  label: Xf,
  cell: Jf,
  value: Qf
}, kn = Ie(!1);
function xS({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(kn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function Zf({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function e_({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ie.reason, children: e })
  ] });
}
function a_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ t("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(e_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ie.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Mt(e, a) {
  return e.locked ? void 0 : a;
}
function LS({ rule: e, onChange: a, onRemove: n }) {
  if (!Ee(kn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Mt(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(a_, { rule: e, onRemove: Mt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ t("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ie.cell, children: /* @__PURE__ */ t(Zf, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const t_ = "_ladder_n8eeo_2", n_ = "_cell_n8eeo_7", r_ = "_empty_n8eeo_26", l_ = "_name_n8eeo_34", o_ = "_holder_n8eeo_40", i_ = "_request_n8eeo_46", s_ = "_swatches_n8eeo_51", c_ = "_swatch_n8eeo_51", d_ = "_tilesFrame_n8eeo_78", u_ = "_tiles_n8eeo_78", m_ = "_tile_n8eeo_78", h_ = "_bar_n8eeo_117", w_ = "_hex_n8eeo_128", f_ = "_note_n8eeo_138", A = {
  ladder: t_,
  cell: n_,
  empty: r_,
  name: l_,
  holder: o_,
  request: i_,
  swatches: s_,
  swatch: c_,
  tilesFrame: d_,
  tiles: u_,
  tile: m_,
  bar: h_,
  hex: w_,
  note: f_
}, AS = "not validated yet, pending a CVD matrix and dark stepping";
function __(e) {
  return e.reserved ? "reserved" : Aa(e.step) ? "validated" : "partial";
}
function $n(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function v_(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function b_({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(Me, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function p_(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function g_(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Bt = (e) => String(e).padStart(2, "0");
function y_(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? $n(e, void 0);
}
function N_({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.hex} ward-ladder-hex`, children: r ? `step ${Bt(e)}` : Tr(e) }),
    /* @__PURE__ */ t("span", { className: `${A.note} ward-ladder-note`, children: r ? n : `Step ${Bt(e)} · ${n}` })
  ] });
}
function k_({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = __(e), c = $n(s, n), d = c !== "free", u = d || i, m = a === e.step, v = e.name ?? `Step ${e.step}`, b = () => {
    u || r(e.step);
  }, y = `${v} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...g_(d, m, u), "data-validation": s, style: v_(e, s), onClick: b, onKeyDown: (B) => p_(B, b) }, label: y, name: v, holder: c, validation: s, note: y_(s, n, m), step: e.step };
}
const $_ = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${A.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${A.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(N_, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${A.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(b_, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${A.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${A.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function C_(e) {
  return $_[e.presentation](k_(e));
}
function S_(e) {
  for (const a of e)
    if (!a.reserved && !La(a.step)) throw new Error("colour ladder renders token steps only");
}
function R_() {
  return /* @__PURE__ */ o("div", { className: `${A.cell} ward-ladder-cell ${A.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${A.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function T_(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const x_ = { list: A.ladder, swatches: A.swatches, tiles: A.tilesFrame };
function L_() {
  return /* @__PURE__ */ o("div", { className: `${A.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${A.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const A_ = { list: R_, swatches: () => null, tiles: L_ };
function E_(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Cn(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  S_(e.steps);
  const r = T_(e), l = A_[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(C_, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...E_(e.disabled === !0), className: `${x_[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: A.tiles, children: i }) : i });
}
const I_ = "_rail_s06lm_2", M_ = "_section_s06lm_12", B_ = "_sectionFlush_s06lm_22", P_ = "_head_s06lm_26", j_ = "_headLabel_s06lm_34", D_ = "_sample_s06lm_42", H_ = "_sampleLabel_s06lm_47", O_ = "_sampleTitle_s06lm_54", q_ = "_sampleMeta_s06lm_59", F_ = "_trace_s06lm_65", z_ = "_traceHead_s06lm_70", W_ = "_steps_s06lm_78", K_ = "_step_s06lm_78", G_ = "_stepTitle_s06lm_97", U_ = "_hollow_s06lm_107", V_ = "_stepBody_s06lm_115", Y_ = "_stepDetail_s06lm_127", X_ = "_publish_s06lm_132", J_ = "_reason_s06lm_138", Q_ = "_note_s06lm_143", Z_ = "_reveal_s06lm_148", k = {
  rail: I_,
  section: M_,
  sectionFlush: B_,
  head: P_,
  headLabel: j_,
  sample: D_,
  sampleLabel: H_,
  sampleTitle: O_,
  sampleMeta: q_,
  trace: F_,
  traceHead: z_,
  steps: W_,
  step: K_,
  stepTitle: G_,
  hollow: U_,
  stepBody: V_,
  stepDetail: Y_,
  publish: X_,
  reason: J_,
  note: Q_,
  reveal: Z_
}, Pt = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, ev = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, av = { ok: "greenFill", finding: "orangeFill", action: "blue" }, tv = { notSimulated: "not simulated", running: "running" };
function nv(e) {
  return e.presentation === "foundry";
}
function rv(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function lv(e, a) {
  var r;
  const n = ev[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function ov(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function iv(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function sv(e) {
  if (ov(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function cv(e) {
  const [a, n] = p(!1);
  S(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function dv(e) {
  const a = tv[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(Me, { size: 6, kind: av[e.kind], label: e.kind });
}
function uv(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function mv(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(Se, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function hv(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(cv, { kind: a.kind, children: [
    /* @__PURE__ */ t(dv, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(uv, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(mv, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function wv(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function Sn(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: wv(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(hv, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function fv(e) {
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
function _v(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function vv(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ne(e.run.cost), label: "Cost" }, { value: e.run.turns ? Vt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Ba, { divided: !0, cells: a }) });
}
function bv(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ne(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Vt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function pv(e) {
  const a = bv(e.run);
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
function gv(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(Rn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function yv(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(Rn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Tn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: Pt[e.run.status].role, label: Pt[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(Se, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Nv(e, a) {
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
function kv(e) {
  var n;
  iv(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Tn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(fv, { sample: e.run.sample }),
    /* @__PURE__ */ t(Sn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(vv, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist }) }),
    /* @__PURE__ */ t(gv, { reason: rv(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function $v(e) {
  var r;
  const a = Nv(e.run, e.feed);
  sv(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Tn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(_v, { sample: e.run.sample }),
    /* @__PURE__ */ t(Sn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(pv, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(yv, { reason: lv(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function ES(e) {
  return nv(e) ? /* @__PURE__ */ t($v, { ...e }) : /* @__PURE__ */ t(kv, { ...e });
}
const Cv = "_list_142ip_3", Sv = "_row_142ip_9", Rv = "_condition_142ip_18", Tv = "_action_142ip_24", va = {
  list: Cv,
  row: Sv,
  condition: Rv,
  action: Tv
}, xn = Ie(!1);
function IS({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(xn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: va.list, "aria-label": a, children: e }) });
}
function MS({ rule: e }) {
  if (!Ee(xn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: va.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: va.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: va.action, children: e.then })
  ] });
}
const xv = "_move_tmppt_3", Lv = {
  move: xv
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
function Av(e) {
  return e === "up" ? "down" : "up";
}
function Ev(e, a) {
  const n = jt(e, a.id, a.direction) ?? jt(e, a.id, Av(a.direction));
  n == null || n.focus();
}
function En() {
  const e = w(null), [a, n] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && a !== null && Ev(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function In({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function $a({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${Lv.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const Iv = "_body_1jd1i_2", Mv = "_title_1jd1i_8", Bv = "_section_1jd1i_13", Pv = "_legend_1jd1i_18", jv = "_stages_1jd1i_26", Dv = "_stage_1jd1i_26", Hv = "_stageIndex_1jd1i_44", Ov = "_stageName_1jd1i_50", qv = "_footer_1jd1i_59", Fv = "_note_1jd1i_66", zv = "_reason_1jd1i_71", Wv = "_actions_1jd1i_76", Kv = "_webHead_1jd1i_83", Gv = "_kicker_1jd1i_92", Uv = "_webTitle_1jd1i_99", Vv = "_webBody_1jd1i_105", Yv = "_webSection_1jd1i_109", Xv = "_sectionHead_1jd1i_121", Jv = "_sectionNote_1jd1i_129", Qv = "_formLabel_1jd1i_134", Zv = "_identityRow_1jd1i_139", eb = "_nameCell_1jd1i_145", ab = "_keyCell_1jd1i_150", tb = "_colourCell_1jd1i_154", nb = "_colourStatus_1jd1i_161", rb = "_webStages_1jd1i_166", lb = "_webStageList_1jd1i_172", ob = "_webStage_1jd1i_166", ib = "_webIndex_1jd1i_191", sb = "_webStageName_1jd1i_196", cb = "_webMoves_1jd1i_201", db = "_addStage_1jd1i_215", ub = "_addStageButton_1jd1i_223", mb = "_addStageNote_1jd1i_231", hb = "_webFooter_1jd1i_236", wb = "_webFooterNotes_1jd1i_244", fb = "_webNote_1jd1i_251", f = {
  body: Iv,
  title: Mv,
  section: Bv,
  legend: Pv,
  stages: jv,
  stage: Dv,
  stageIndex: Hv,
  stageName: Ov,
  footer: qv,
  note: Fv,
  reason: zv,
  actions: Wv,
  webHead: Kv,
  kicker: Gv,
  webTitle: Uv,
  webBody: Vv,
  webSection: Yv,
  sectionHead: Xv,
  sectionNote: Jv,
  formLabel: Qv,
  identityRow: Zv,
  nameCell: eb,
  keyCell: ab,
  colourCell: tb,
  colourStatus: nb,
  webStages: rb,
  webStageList: lb,
  webStage: ob,
  webIndex: ib,
  webStageName: sb,
  webMoves: cb,
  addStage: db,
  addStageButton: ub,
  addStageNote: mb,
  webFooter: hb,
  webFooterNotes: wb,
  webNote: fb
}, _b = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Mn = "not in catalogue";
function vb(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${Mn}` }, ...n];
}
function bb({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Mn}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: vb(n, e.name), invalid: i, onChange: r });
}
function Bn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function pb(e) {
  const a = w([]), n = w(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function gb({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Bn(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${f.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: f.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: f.webStageName, children: /* @__PURE__ */ t(bb, { stage: a, index: n, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: _b, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: f.webMoves, children: [
      n > 0 && /* @__PURE__ */ t($a, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t($a, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function yb({ stages: e, onChange: a, catalogue: n }) {
  const r = pb(e.length), l = En(), i = (c, d) => {
    const u = Ln(c, d);
    r.current = Ya(r.current, c, u), l.moved({ id: r.current[u], direction: d }, An(Bn(e[c], c), u, e.length)), a(Ya(e, c, u));
  }, s = (c, d) => a(e.map((u, m) => m === c ? d : u));
  return /* @__PURE__ */ o("div", { className: f.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: f.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(gb, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(In, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: f.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: f.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: f.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Nb = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], kb = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], $b = "A new stream starts as a draft. Nothing runs on it until you publish it.", Cb = "Create is disabled: name the stream and give it a key first.", Sb = "reorder with the ↑ ↓ buttons · min 2";
function it(e, a) {
  return !e.reserved && Aa(e.step) && a[e.step] === void 0;
}
function Rb(e, a) {
  const n = e.find((r) => it(r, a));
  return n ? n.step : 1;
}
function Tb({ stages: e, onMove: a }) {
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
function xb({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: f.footer, children: [
    /* @__PURE__ */ t("p", { className: f.note, children: $b }),
    e && /* @__PURE__ */ t("p", { className: f.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: f.actions, children: [
      /* @__PURE__ */ t(_, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Lb(e, a) {
  return e !== "" && a !== "" ? null : Cb;
}
function Ab(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = kb, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [m, v] = p(""), [b, y] = p(""), [E, B] = p(a[0].value), [le, Re] = p(() => Rb(n, r)), [ae, We] = p(e.stages ?? Nb), [Ke, R] = p(l[0].value), G = { name: m, key: b, streamStep: le, owner: E, stages: ae, policy: Ke }, be = Lb(m, b);
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
      /* @__PURE__ */ t(Cn, { label: "Stream colour", steps: n, value: le, onChange: Re, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: f.section, children: [
      /* @__PURE__ */ t("legend", { className: f.legend, children: "Stages" }),
      /* @__PURE__ */ t(Tb, { stages: ae, onMove: (Be, ir) => We(Ya(ae, Be, ir)) })
    ] }),
    /* @__PURE__ */ t(_n, { legend: "Loop policy", options: l, value: Ke, onChange: R }),
    /* @__PURE__ */ t(xb, { reason: be, onCreate: () => i(G), onDraft: () => s(G) })
  ] }) });
}
const Pn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Eb = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Ib(e, a, n, r, l, i) {
  var c;
  const s = ((c = Pn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function Mb(e, a) {
  return Bb(e) && Pb(e, a) && jb(e);
}
function Bb(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Pb(e, a) {
  return e.colourStep === null || it({ step: e.colourStep }, a);
}
function jb(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Db(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : it({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Hb({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: f.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: f.webNote, children: "Add a stage an agent can run on." });
}
function Ob({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: f.webFooter, children: [
    /* @__PURE__ */ o("div", { className: f.webFooterNotes, children: [
      /* @__PURE__ */ t(Hb, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: f.reason, children: Eb })
    ] }),
    l && /* @__PURE__ */ t(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function qb({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: f.webHead, children: [
    /* @__PURE__ */ t("span", { className: f.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: f.webTitle, children: "New stream" })
  ] });
}
function Fb({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
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
function zb(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [m, v] = p(null), [b, y] = p("relay"), [E, B] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = Ib(l, s, d, m, b, E), Re = Mb(le, r), ae = E.find((R) => R.kind === "agent" && R.name.trim() !== ""), We = /* @__PURE__ */ o("div", { className: f.colourCell, children: [
    /* @__PURE__ */ t("span", { className: f.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(Cn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: v, takenBy: r })
  ] }), Ke = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: f.colourStatus, "data-colour-status": "", children: Db(m, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(qb, { titleId: n }),
    /* @__PURE__ */ o("div", { className: f.webBody, children: [
      /* @__PURE__ */ t(Fb, { name: l, setName: i, streamKey: s, setKey: c, colour: We, owner: Ke }),
      /* @__PURE__ */ o("section", { className: f.webSection, children: [
        /* @__PURE__ */ o("div", { className: f.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: f.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: f.sectionNote, children: Sb })
        ] }),
        /* @__PURE__ */ t(yb, { stages: E, onChange: B })
      ] }),
      /* @__PURE__ */ t("section", { className: f.webSection, children: /* @__PURE__ */ t(_n, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Pn, onChange: y }) }),
      /* @__PURE__ */ t(Ob, { ready: Re, draft: le, agentStage: ae, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function BS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(zb, { ...e }) : /* @__PURE__ */ t(Ab, { ...e });
}
const Wb = "_row_bs8hc_2", Kb = "_cell_bs8hc_6", Gb = "_condition_bs8hc_11", Ub = "_action_bs8hc_18", Vb = "_contract_bs8hc_24", Yb = "_contractCondition_bs8hc_33", Xb = "_contractAction_bs8hc_39", Q = {
  row: Wb,
  cell: Kb,
  condition: Gb,
  action: Ub,
  contract: Vb,
  contractCondition: Yb,
  contractAction: Xb
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
  return n || !a ? /* @__PURE__ */ t("span", { className: Q.action, children: Dt[e.then] }) : /* @__PURE__ */ t(
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
function Jb({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t("span", { className: Q.condition, title: Ca(e, r), children: Ca(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: st(e, a, n) })
  ] });
}
function Qb({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Q.condition, children: Ca(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: st(e, a, n) })
  ] });
}
function Zb({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Q.contractCondition, children: Ca(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Q.contractAction, children: st(e, a, n, !0) })
  ] });
}
const ep = { two: Qb, four: Jb, contract: Zb };
function PS(e) {
  var n;
  if (!jn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = ep[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const ap = "_column_11id3_2", tp = "_head_11id3_17", np = "_index_11id3_23", rp = "_name_11id3_29", lp = "_meta_11id3_38", op = "_mono_11id3_43", ip = "_gate_11id3_50", sp = "_reviewersLabel_11id3_57", cp = "_reviewers_11id3_57", dp = "_reviewer_11id3_57", up = "_agents_11id3_74", mp = "_workflowColumn_11id3_79", hp = "_workflowHead_11id3_96", wp = "_stageRow_11id3_102", fp = "_stageLabel_11id3_109", _p = "_workflowTitle_11id3_116", vp = "_workflowMeta_11id3_122", bp = "_workflowGate_11id3_127", pp = "_gateNote_11id3_135", gp = "_cardNote_11id3_140", yp = "_reviewerList_11id3_145", Np = "_reviewerRow_11id3_151", kp = "_reviewerMark_11id3_157", $p = "_reviewerName_11id3_167", Cp = "_terminalCard_11id3_173", Sp = "_terminalCount_11id3_182", Rp = "_workflowAgents_11id3_188", Tp = "_mount_11id3_194", C = {
  column: ap,
  head: tp,
  index: np,
  name: rp,
  meta: lp,
  mono: op,
  gate: ip,
  reviewersLabel: sp,
  reviewers: cp,
  reviewer: dp,
  agents: up,
  workflowColumn: mp,
  workflowHead: hp,
  stageRow: wp,
  stageLabel: fp,
  workflowTitle: _p,
  workflowMeta: vp,
  workflowGate: bp,
  gateNote: pp,
  cardNote: gp,
  reviewerList: yp,
  reviewerRow: Np,
  reviewerMark: kp,
  reviewerName: $p,
  terminalCard: Cp,
  terminalCount: Sp,
  workflowAgents: Rp,
  mount: Tp
}, xp = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function ct(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Dn(e) {
  return `${Math.round(e * 100)}%`;
}
function Lp({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: C.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: C.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: C.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Ba, { cells: [
      { value: Dn(e.gateShare), label: "Gate share" },
      { value: ee(e.count), label: "In stage" }
    ] })
  ] });
}
function Ap({ stage: e }) {
  return /* @__PURE__ */ t(Ba, { cells: [
    { value: ee(e.count), label: "In stage" },
    { value: ct(e.closedThisWeek, ee), label: "Closed this week" }
  ] });
}
function Ep({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: C.head, children: [
    /* @__PURE__ */ t("span", { className: C.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: C.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: xp[e.kind] })
  ] });
}
function Ip({ stage: e }) {
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
function Mp({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(Lp, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(Ap, { stage: e }) : null;
}
function Bp({ onMount: e }) {
  return e ? /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Pp({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: C.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Ep, { stage: e, titleId: l }),
    /* @__PURE__ */ t(Ip, { stage: e }),
    /* @__PURE__ */ t(Mp, { stage: e }),
    /* @__PURE__ */ t("div", { className: C.agents, children: a.map((s) => /* @__PURE__ */ t(Of, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(Bp, { onMount: n })
  ] });
}
const jp = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function Dp({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: C.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: C.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: C.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: C.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function Hp({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: C.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(Dp, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: C.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Dn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Op(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function qp({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: C.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: C.terminalCount, children: ct(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: C.cardNote, children: Op(e.rolledBackThisWeek) })
  ] });
}
function Fp(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function zp(e) {
  if (e.kind === "terminal") return `${ct(e.closedThisWeek)} this week`;
  const a = Fp(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Wp({ stage: e, titleId: a }) {
  const n = jp[e.kind];
  return /* @__PURE__ */ o("header", { className: C.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: C.stageRow, children: [
      /* @__PURE__ */ o("span", { className: C.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: C.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: C.workflowMeta, children: zp(e) })
  ] });
}
function Kp(e) {
  return e === "entry" || e === "agent";
}
function Gp({ stage: e, onMount: a }) {
  return a === void 0 || !Kp(e.kind) ? null : /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", className: C.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Up({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: C.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Wp, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(Hp, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(qp, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: C.workflowAgents, children: a }),
    /* @__PURE__ */ t(Gp, { stage: e, onMount: n })
  ] });
}
function Vp(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function jS(e) {
  return Vp(e) ? /* @__PURE__ */ t(Up, { ...e }) : /* @__PURE__ */ t(Pp, { ...e });
}
const Yp = "_row_alabo_6", Xp = "_name_alabo_12", Jp = "_compactRow_alabo_13", Qp = "_compactName_alabo_13", Zp = "_cell_alabo_30", eg = "_chain_alabo_45", ag = "_owner_alabo_51", tg = "_mono_alabo_57", ng = "_compactCell_alabo_79", rg = "_stack_alabo_96", lg = "_stat_alabo_103", og = "_identityLine_alabo_110", ig = "_identity_alabo_110", sg = "_ownerLine_alabo_137", cg = "_link_alabo_150", dg = "_gateMark_alabo_156", ug = "_emptyChain_alabo_161", mg = "_arrow_alabo_167", hg = "_muted_alabo_168", wg = "_define_alabo_173", fg = "_statValue_alabo_180", _g = "_policyId_alabo_186", vg = "_sub_alabo_191", g = {
  row: Yp,
  name: Xp,
  compactRow: Jp,
  compactName: Qp,
  cell: Zp,
  chain: eg,
  owner: ag,
  mono: tg,
  compactCell: ng,
  stack: rg,
  stat: lg,
  identityLine: og,
  identity: ig,
  ownerLine: sg,
  link: cg,
  gateMark: dg,
  emptyChain: ug,
  arrow: mg,
  muted: hg,
  define: wg,
  statValue: fg,
  policyId: _g,
  sub: vg
};
function Hn(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function bg(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function pg(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function On(e) {
  return `${ee(e)} ${e === 1 ? "member" : "members"}`;
}
function gg(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${On(e.members)}`;
}
function yg(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: q(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: gg(e) })
  ] }) });
}
function qn({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Ng(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = ca(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function kg({ stages: e, streamStep: a }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ t(qn, { name: l.name, gate: l.gate === !0, look: Ng(i, n, a), size: "tag" }),
    i === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function $g(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : kg(e) });
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
function Cg(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function Sg(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Rg({ stream: e, href: a, presentation: n }) {
  const r = pg(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Hn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ve(e.streamStep, "chip") }, children: [
    yg(e, a),
    $g(e),
    Ht(Sg(e.agents), e.agents === void 0 ? void 0 : bg(e.agents), "—"),
    Cg(e.policy),
    Ht(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function Tg(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function DS(e) {
  if (Tg(e)) return Rg(e);
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
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: a.inFlightHint, "data-raised": Fn(a.inFlightHint), children: ee(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const xg = "_row_2u4ll_2", Lg = "_name_2u4ll_16", Ag = "_scope_2u4ll_24", Sa = {
  row: xg,
  name: Lg,
  scope: Ag
};
function dt(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Eg(e) {
  return e === void 0 ? `${Sa.row} ward-toolrow` : `${Sa.row} ward-toolrow ${e}`;
}
function Ig(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Mg({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function Bg({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: dt(e) });
}
function Pg({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${Sa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function jg(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function HS({ tool: e, onChange: a, presentation: n }) {
  const r = N(), l = N(), i = Ig(e, n), s = jg(n);
  return /* @__PURE__ */ o(s, { className: Eg(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Mg, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${Sa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(Pg, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(Bg, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const Dg = "_strip_4ppv9_2", Hg = "_well_4ppv9_11", Og = "_head_4ppv9_18", qg = "_name_4ppv9_24", Fg = "_chart_4ppv9_32", zg = "_segment_4ppv9_38", Wg = "_detailedChart_4ppv9_44", Kg = "_rail_4ppv9_57", Gg = "_section_4ppv9_63", Ug = "_label_4ppv9_74", Vg = "_note_4ppv9_91", K = {
  strip: Dg,
  well: Hg,
  head: Og,
  name: qg,
  chart: Fg,
  segment: zg,
  detailedChart: Wg,
  rail: Kg,
  section: Gg,
  label: Ug,
  note: Vg
}, Yg = "No item in flight to preview.", Xg = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Jg = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Xa = [1, 2, 3, 4, 5, 6], Ra = 100;
function Qg(e, a) {
  return a.has(e) ? ve(e, "id") : "var(--ward-color-line)";
}
function Zg({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: K.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Xa.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: K.segment,
      x: l * Ra,
      y: "0",
      width: Ra,
      height: "8",
      fill: Qg(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function ey(e) {
  const a = e.slice(0, Xa.length);
  for (; a.length < Xa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function ay({ identities: e }) {
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
function ty({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: K.note, children: a ?? Yg }) : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(ja, { item: { ...e, streamStep: ca(n.streamStep) }, onOpen: zn(r), feed: null }) });
}
function ny({ draft: e }) {
  const a = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: K.head, style: a, children: [
    /* @__PURE__ */ t(Me, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...Ma(e.key, e.streamStep) })
  ] });
}
function ry(e) {
  const a = ey(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: K.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(ha, { label: "Board card", children: /* @__PURE__ */ t(ty, { ...e, draft: n }) }),
    /* @__PURE__ */ t(ha, { label: "Streams index row", children: /* @__PURE__ */ t(ny, { draft: n }) }),
    /* @__PURE__ */ o(ha, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(ay, { identities: a }),
      /* @__PURE__ */ t("p", { className: K.note, children: Xg })
    ] }),
    /* @__PURE__ */ t(ha, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: K.note, children: Jg }) })
  ] });
}
function ly({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: K.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: K.head, children: [
      /* @__PURE__ */ t(Me, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...Ma(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(ja, { item: { ...a, streamStep: e.streamStep }, onOpen: zn(r) }) }),
    /* @__PURE__ */ t(Zg, { draft: e, streams: n })
  ] });
}
function OS(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(ry, { ...e }) : /* @__PURE__ */ t(ly, { ...e });
}
const oy = "_row_ixlg5_6", iy = "_headCell_ixlg5_10", sy = "_cell_ixlg5_11", cy = "_name_ixlg5_23", dy = "_consequence_ixlg5_29", uy = "_governed_ixlg5_36", my = "_control_ixlg5_42", hy = "_byRole_ixlg5_48", wy = "_webControl_ixlg5_59", fy = "_webConsequence_ixlg5_65", _y = "_webGoverned_ixlg5_71", O = {
  row: oy,
  headCell: iy,
  cell: sy,
  name: cy,
  consequence: dy,
  governed: uy,
  control: my,
  byRole: hy,
  webControl: wy,
  webConsequence: fy,
  webGoverned: _y
};
function vy({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: O.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: O.control, children: [
    /* @__PURE__ */ t(
      ze,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => n(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ t(h, { role: "running", label: "Pilot" })
  ] });
}
function by({ capability: e, cells: a, onChange: n }) {
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
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(vy, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function py(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function gy({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${O.webControl} ${O.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    ze,
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
function yy({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o("td", { className: O.cell, children: [
      /* @__PURE__ */ t("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${O.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(gy, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webGoverned} ward-cellmeta`, children: py(e) }) })
  ] });
}
function qS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(yy, { ...e }) : /* @__PURE__ */ t(by, { ...e });
}
const Ny = "_row_vv64h_2", ky = "_cell_vv64h_6", $y = "_name_vv64h_25", Cy = "_note_vv64h_30", Sy = "_webName_vv64h_41", Ry = "_webMeta_vv64h_47", V = {
  row: Ny,
  cell: ky,
  name: $y,
  note: Cy,
  webName: Sy,
  webMeta: Ry
}, Wn = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function Ty(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function xy({ component: e, onRestart: a }) {
  const n = N(), r = Wn[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: V.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: V.cell, "data-mono": "true", children: [
      ee(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { id: n, className: V.note, children: e.note }) }),
    /* @__PURE__ */ t("td", { className: V.cell, "data-align": "end", children: l ? /* @__PURE__ */ t(_, { size: "sm", disabled: !0, describedBy: n, children: "Restart" }) : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function Ly({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: Ty(e.state) });
}
function Ay({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { ...Wn[e.state] }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(Ly, { component: e, onRestart: a }) })
  ] });
}
function FS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Ay, { ...e }) : /* @__PURE__ */ t(xy, { ...e });
}
const Ey = "_row_jcm5k_7", Iy = "_cell_jcm5k_11", My = "_next_jcm5k_28", By = "_headCell_jcm5k_38", Py = "_webId_jcm5k_77", jy = "_webPurpose_jcm5k_83", Dy = "_webMeta_jcm5k_91", Hy = "_webUrgent_jcm5k_97", F = {
  row: Ey,
  cell: Iy,
  next: My,
  headCell: By,
  webId: Py,
  webPurpose: jy,
  webMeta: Dy,
  webUrgent: Hy
}, Oy = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, qy = {
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
], Fy = Object.fromEntries(Kn.map((e) => [e.key, e]));
function Ue({ column: e, children: a }) {
  const n = Fy[e];
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
function zS() {
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
function zy({ cred: e }) {
  const a = Oy[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t(Ue, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Ue, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Ue, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Ue, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: dt(e.cls) }) }),
    /* @__PURE__ */ t(Ue, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Ue, { column: "next", children: /* @__PURE__ */ t("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Wy({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function Ky({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(Wy, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { ...qy[e.state] }) })
  ] });
}
function WS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Ky, { ...e }) : /* @__PURE__ */ t(zy, { ...e });
}
const Gy = "_card_17zba_2", Uy = "_head_17zba_11", Vy = "_env_17zba_18", Yy = "_version_17zba_25", Xy = "_meta_17zba_32", Jy = "_webCard_17zba_37", Qy = "_webRow_17zba_47", Zy = "_webTitle_17zba_55", eN = "_webLine_17zba_65", aN = "_webVersion_17zba_72", tN = "_webMeta_17zba_77", U = {
  card: Gy,
  head: Uy,
  env: Vy,
  version: Yy,
  meta: Xy,
  webCard: Jy,
  webRow: Qy,
  webTitle: Zy,
  webLine: eN,
  webVersion: aN,
  webMeta: tN
}, Ot = { dev: "Dev", uat: "UAT", prod: "Prod" }, Gn = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function nN({ env: e }) {
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
function rN(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function lN(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...Gn[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: rN(e) })
  ] });
}
function KS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(lN, { ...e }) : /* @__PURE__ */ t(nN, { ...e });
}
const oN = "_panel_1hmja_2", iN = "_line_1hmja_8", sN = "_actions_1hmja_14", wa = {
  panel: oN,
  line: iN,
  actions: sN
};
function GS(e) {
  return /* @__PURE__ */ o("div", { className: wa.panel, children: [
    /* @__PURE__ */ t("p", { className: wa.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: wa.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: wa.line, children: e.note ?? "" })
  ] });
}
const cN = "_upload_13fcl_2", dN = "_preview_13fcl_7", uN = "_mark_13fcl_17", mN = "_empty_13fcl_22", hN = "_actions_13fcl_28", wN = "_input_13fcl_33", fN = "_reasons_13fcl_41", _N = "_reason_13fcl_41", vN = "_accepted_13fcl_57", te = {
  upload: cN,
  preview: dN,
  mark: uN,
  empty: mN,
  actions: hN,
  input: wN,
  reasons: fN,
  reason: _N,
  accepted: vN
}, Un = 1.5, Vn = 22, Ta = "script elements or event handlers", xe = "links or external references", $e = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Un}px at ${Vn}px`], bN = [$e[1], $e[2], Ta, xe], pN = /* @__PURE__ */ new Map([
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
]), gN = "http://www.w3.org/2000/svg", yN = "http://www.w3.org/2000/xmlns/", NN = /* @__PURE__ */ new Set([
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
]), kN = /* @__PURE__ */ new Set([
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
]), ut = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, $N = /url\s*\(|['"\\]/i;
function CN() {
  return { ok: !1, reasons: [$e[1]] };
}
function Yn(e) {
  return e.namespaceURI === gN;
}
function SN(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && Yn(a) ? a : null;
  } catch {
    return null;
  }
}
function RN(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [$e[0]] : [];
}
function TN(e) {
  return pN.get(e.localName) ?? (e.localName.startsWith("animate") ? xe : void 0);
}
function xN(e) {
  return $N.test(e.replace(ut, ""));
}
function LN(e) {
  return /^on/i.test(e.localName) ? Ta : e.localName === "href" || xN(e.value) ? xe : void 0;
}
function AN(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(TN(n));
    for (const r of Array.from(n.attributes)) a.add(LN(r));
  }
  return bN.filter((n) => a.has(n));
}
function EN(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? Vn / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Un;
  }) ? [$e[3]] : [];
}
function IN(e) {
  if (e.namespaceURI === yN) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (kN.has(a) || a.startsWith("stroke"));
}
function MN(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && Yn(a) && NN.has(a.localName);
}
function BN(e, a) {
  MN(a) ? a.nodeType === Node.ELEMENT_NODE && Xn(a) : e.removeChild(a);
}
function Xn(e) {
  for (const a of Array.from(e.attributes)) IN(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) BN(e, a);
  return e;
}
function PN(e) {
  return Array.from(e.matchAll(ut), (a) => a[2]).filter((a) => a !== "");
}
function jN(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function DN(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of PN(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function HN(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(ut, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function ON(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = DN(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), HN(l, r);
  }
  return e;
}
function US(e) {
  const a = SN(e);
  if (a === null) return CN();
  const n = [...RN(a), ...AN(a), ...EN(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(ON(Xn(a), jN(e))) };
}
const qN = "Mark accepted.", FN = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, zN = new Set(Xt.flatMap((e) => [ve(e, "id"), ve(e, "chip")]));
function WN(e) {
  return e !== void 0 && (FN.test(e) || zN.has(e)) ? e : void 0;
}
function KN({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: te.preview, style: { "--mark": WN(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: te.empty }) });
}
function GN(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function UN(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function VN({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("p", { className: te.accepted, children: qN }) }) : /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: te.reason, children: a }, a)) }) });
}
function YN({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(VN, { result: e }) : /* @__PURE__ */ t("p", { className: `${te.result} ${GN(e, n)}`, role: "status", children: UN(e, n) });
}
function qt(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function VS({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = w(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const m = a(u);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ t(KN, { current: e }),
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
      /* @__PURE__ */ t(_, { ...qt(l), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(_, { ...qt(l), variant: "ghost", onClick: n, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(YN, { result: s, presentation: r })
  ] });
}
const XN = "_row_o3t6y_7", JN = "_cell_o3t6y_11", QN = "_head_o3t6y_28", ZN = "_name_o3t6y_34", e1 = "_pinned_o3t6y_42", a1 = "_headCell_o3t6y_49", t1 = "_webName_o3t6y_88", n1 = "_webMeta_o3t6y_95", r1 = "_webWarn_o3t6y_103", P = {
  row: XN,
  cell: JN,
  head: QN,
  name: ZN,
  pinned: e1,
  headCell: a1,
  webName: t1,
  webMeta: n1,
  webWarn: r1
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
], l1 = Object.fromEntries(Jn.map((e) => [e.key, e]));
function o1(e, a) {
  return `mcp.${e}.${a}`;
}
function i1(e) {
  return Object.keys(mt).includes(e);
}
function s1(e) {
  return mt[e !== void 0 && i1(e) ? e : "unknown"];
}
function aa({ column: e, children: a }) {
  const n = l1[e];
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
function YS() {
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
function c1({ server: e }) {
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
    /* @__PURE__ */ t(aa, { column: "tools", children: e.tools.map((n) => o1(e.name, n)).join(" · ") })
  ] });
}
function d1(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function u1(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function m1({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${P.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: e });
}
function h1({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function w1({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(_, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function f1({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t("span", { className: `${P.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: d1(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...u1(e) }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(m1, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...s1(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t(h1, { server: e, onRestart: a }),
      /* @__PURE__ */ t(w1, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function XS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(f1, { ...e }) : /* @__PURE__ */ t(c1, { ...e });
}
const _1 = "_row_1ibo7_2", v1 = "_headCell_1ibo7_14", b1 = "_cell_1ibo7_15", p1 = "_name_1ibo7_26", g1 = "_consequence_1ibo7_32", y1 = "_reason_1ibo7_38", N1 = "_value_1ibo7_44", k1 = "_webRow_1ibo7_60", $1 = "_webSetting_1ibo7_73", C1 = "_webName_1ibo7_81", S1 = "_webConsequence_1ibo7_89", R1 = "_webControl_1ibo7_95", T1 = "_webState_1ibo7_109", x1 = "_webChip_1ibo7_114", I = {
  row: _1,
  headCell: v1,
  cell: b1,
  name: p1,
  consequence: g1,
  reason: y1,
  value: N1,
  webRow: k1,
  webSetting: $1,
  webName: C1,
  webConsequence: S1,
  webControl: R1,
  webState: T1,
  webChip: x1
}, Qn = 104, Zn = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function L1({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(ze, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(wn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function A1({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = Zn[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(L1, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: Qn }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function er(e, a) {
  return String(e ?? a);
}
function E1(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function I1(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? er(e.value, "—");
}
function M1({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(ze, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function B1(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(M1, { ...e });
  const l = E1(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(wn, { options: l, value: er(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: I1(a) });
}
function P1({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(B1, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: Qn }, children: /* @__PURE__ */ t(h, { ...Zn[n], size: "tag" }) })
  ] });
}
function JS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(P1, { ...e }) : /* @__PURE__ */ t(A1, { ...e });
}
const j1 = "_label_vm9hq_7", D1 = "_name_vm9hq_15", H1 = "_column_vm9hq_24", O1 = "_webFrame_vm9hq_57", q1 = "_webHead_vm9hq_62", F1 = "_webHeadLabel_vm9hq_74", z1 = "_webLabel_vm9hq_112", W1 = "_webColumns_vm9hq_119", K1 = "_webGroup_vm9hq_125", G1 = "_webPeople_vm9hq_126", U1 = "_webVia_vm9hq_127", V1 = "_webMeta_vm9hq_156", z = {
  label: j1,
  name: D1,
  column: H1,
  webFrame: O1,
  webHead: q1,
  webHeadLabel: F1,
  webLabel: z1,
  webColumns: W1,
  webGroup: K1,
  webPeople: G1,
  webVia: U1,
  webMeta: V1
}, Y1 = {
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
function X1(e) {
  if (!e.matrixRole) return;
  const a = Y1[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function J1({ node: e }) {
  const a = X1(e);
  return /* @__PURE__ */ o("span", { className: z.label, children: [
    /* @__PURE__ */ t("span", { className: z.name, children: e.name }),
    /* @__PURE__ */ t(Q1, { role: a, node: e }),
    /* @__PURE__ */ t(Wa, { column: za[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Wa, { column: za[1], children: e.people === void 0 ? "" : ee(e.people) }),
    /* @__PURE__ */ t(Wa, { column: za[2], children: e.requestedVia ?? "" })
  ] });
}
function Q1({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function Z1({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
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
      label: /* @__PURE__ */ t(J1, { node: n }),
      children: s
    }
  );
}
function Ka({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function ek({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ka, { className: `${z.webMeta} ${z.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ka, { className: `${z.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ka, { className: `${z.webMeta} ${z.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function ak() {
  return /* @__PURE__ */ o("div", { className: z.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: z.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: z.webColumns, children: [
      /* @__PURE__ */ t("span", { className: z.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: z.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: z.webVia, children: "Requested via" })
    ] })
  ] });
}
function tk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function nk(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function rk({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: z.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(ak, {}),
    /* @__PURE__ */ t(Fu, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      pn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(tk, { row: n }),
        detail: /* @__PURE__ */ t(ek, { row: n }),
        expanded: nk(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function QS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(rk, { ...e }) : /* @__PURE__ */ t(Z1, { ...e });
}
const lk = "_runbook_b9agc_2", ok = "_list_b9agc_7", ik = "_step_b9agc_15", sk = "_numeral_b9agc_21", ck = "_body_b9agc_28", dk = "_head_b9agc_34", uk = "_title_b9agc_40", mk = "_detail_b9agc_45", hk = "_actions_b9agc_50", wk = "_webList_b9agc_56", fk = "_webStep_b9agc_60", _k = "_webBody_b9agc_66", vk = "_webTitle_b9agc_74", bk = "_webDetail_b9agc_78", L = {
  runbook: lk,
  list: ok,
  step: ik,
  numeral: sk,
  body: ck,
  head: dk,
  title: uk,
  detail: mk,
  actions: hk,
  webList: wk,
  webStep: fk,
  webBody: _k,
  webTitle: vk,
  webDetail: bk
}, ar = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function tr(e) {
  return String(e + 1).padStart(2, "0");
}
function pk({ step: e, index: a, connection: n }) {
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
function gk({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ t("ol", { className: L.list, children: e.map((r, l) => /* @__PURE__ */ t(pk, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: L.actions, children: a })
  ] });
}
function yk({ step: e, index: a, connection: n }) {
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
function Nk({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${L.list} ${L.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(yk, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${L.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function ZS(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Nk, { ...e }) : /* @__PURE__ */ t(gk, { ...e });
}
const kk = "_list_1gu6a_2", $k = "_check_1gu6a_10", Ck = "_body_1gu6a_16", Sk = "_text_1gu6a_23", Rk = "_pending_1gu6a_32", Tk = "_measured_1gu6a_37", Ye = {
  list: kk,
  check: $k,
  body: Ck,
  text: Sk,
  pending: Rk,
  measured: Tk
};
function xk(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function Lk({ check: e }) {
  const a = xk(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Ye.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ t(rt, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: Ye.body, children: [
      /* @__PURE__ */ t("span", { className: Ye.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Ye.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ t("span", { className: Ye.measured, children: e.measured })
  ] });
}
function e2({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Ye.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(Lk, { check: a }, a.text)) });
}
const Ak = "_root_a6xzy_2", Ek = "_list_a6xzy_10", Ik = "_line_a6xzy_21", Mk = "_at_a6xzy_48", Bk = "_text_a6xzy_52", Pk = "_foot_a6xzy_56", jk = "_idle_a6xzy_68", Dk = "_caret_a6xzy_76", Hk = "_jump_a6xzy_83", he = {
  root: Ak,
  list: Ek,
  line: Ik,
  at: Mk,
  text: Bk,
  foot: Pk,
  idle: jk,
  caret: Dk,
  jump: Hk
}, Ok = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function ht(e) {
  return Number.isNaN(Date.parse(e)) ? "" : Ok.format(new Date(e));
}
const qk = { warn: "warning", ok: "ok" };
function Fk({ kind: e }) {
  const a = qk[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function zk({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${ht(e)}` });
}
function Wk({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${ht(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: he.idle, children: i }),
    /* @__PURE__ */ t(zk, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const Kk = 8;
function Gk(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > Kk;
}
function Uk({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const nr = Ie(null);
function a2({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Gt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(nr.Provider, { value: i, children: n });
}
function Vk() {
  const e = Ee(nr), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function t2({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = w(null), [i, s] = p(0), [c, d] = Vk(), [u, m] = p(!1), v = e.at(-1);
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
    /* @__PURE__ */ t("ol", { className: he.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (y) => m(Gk(y.currentTarget)), children: e.map((y, E) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": E < i, children: [
      /* @__PURE__ */ t("span", { className: he.at, children: ht(y.at) }),
      /* @__PURE__ */ t(Fk, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${E}`)) }),
    /* @__PURE__ */ o(Wk, { connection: a, idleSince: n, last: v, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t(Uk, { shown: u, onJump: b })
    ] })
  ] });
}
const Yk = "_row_1k8wl_2", Xk = "_head_1k8wl_14", Jk = "_author_1k8wl_20", Qk = "_eta_1k8wl_25", Zk = "_edited_1k8wl_26", e$ = "_body_1k8wl_32", a$ = "_reason_1k8wl_37", t$ = "_actions_1k8wl_42", ge = {
  row: Yk,
  head: Xk,
  author: Jk,
  eta: Qk,
  edited: Zk,
  body: e$,
  reason: a$,
  actions: t$
}, n$ = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function r$(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function l$({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function o$({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: ge.reason, id: a, children: e })
  ] });
}
function i$(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function s$(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(l$, { ...e }) : /* @__PURE__ */ t(o$, { reason: e.unavailable, reasonId: e.unavailableId });
}
function n2(e) {
  const { comment: a } = e;
  i$(e);
  const n = N(), r = `${n}-unavailable`, l = n$[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${ge.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: ge.head, children: [
      /* @__PURE__ */ t("span", { className: ge.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: ge.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: ge.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: ge.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: ge.reason, id: n, children: r$(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: ge.actions, children: /* @__PURE__ */ t(s$, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const c$ = "_root_c46wj_2", d$ = "_attach_c46wj_11", u$ = "_actions_c46wj_17", m$ = "_reply_c46wj_23", h$ = "_replyRow_c46wj_28", w$ = "_sendsAs_c46wj_42", Qe = {
  root: c$,
  attach: d$,
  actions: u$,
  reply: m$,
  replyRow: h$,
  sendsAs: w$
};
function rr({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function f$(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = rr(e), s = N();
  return /* @__PURE__ */ o("div", { className: Qe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Qe.replyRow, children: [
      /* @__PURE__ */ t(M, { variant: "reply", labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ t(_, { variant: "ghost", describedBy: s, onClick: () => r(n, l), children: "Send" })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: Qe.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function r2(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(f$, { ...e }) : /* @__PURE__ */ t(_$, { ...e });
}
function _$(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = rr(e);
  return /* @__PURE__ */ o("div", { className: Qe.root, children: [
    /* @__PURE__ */ t(M, { kind: "textarea", label: a, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: Qe.attach, children: [
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
    /* @__PURE__ */ o("div", { className: Qe.actions, children: [
      /* @__PURE__ */ t(_, { variant: "primary", onClick: () => i(n, c), children: `Post as ${n}` }),
      s && /* @__PURE__ */ t(_, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const v$ = "_list_1yhks_2", b$ = "_item_1yhks_6", p$ = "_body_1yhks_22", g$ = "_text_1yhks_28", y$ = "_evidence_1yhks_37", N$ = "_consequence_1yhks_49", k$ = "_note_1yhks_54", qe = {
  list: v$,
  item: b$,
  body: p$,
  text: g$,
  evidence: y$,
  consequence: N$,
  note: k$
};
function $$({ criterion: e }) {
  return /* @__PURE__ */ t(Me, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Ft({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function C$(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function S$({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: qe.body, children: [
    /* @__PURE__ */ t("span", { className: qe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Ft, { text: " · " }),
      /* @__PURE__ */ t("code", { className: qe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Ft, { text: " · " }),
      /* @__PURE__ */ t("span", { className: qe.consequence, children: C$(e.why) })
    ] })
  ] });
}
function R$({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: qe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t($$, { criterion: e }),
    /* @__PURE__ */ t(S$, { criterion: e })
  ] });
}
function l2({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(R$, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: qe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const T$ = "_list_dwhoz_2", x$ = "_rung_dwhoz_6", L$ = "_name_dwhoz_18", A$ = "_actor_dwhoz_32", ba = {
  list: T$,
  rung: x$,
  name: L$,
  actor: A$
}, E$ = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function I$({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = E$[e.state];
  return /* @__PURE__ */ o("li", { className: ba.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ba.name, children: e.name }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ba.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function o2({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ba.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(I$, { rung: a }, a.name)) });
}
const M$ = "_sheet_pw37w_2", B$ = "_title_pw37w_9", P$ = "_stage_pw37w_15", j$ = "_effects_pw37w_20", D$ = "_effect_pw37w_20", H$ = "_numeral_pw37w_31", O$ = "_effectText_pw37w_38", q$ = "_refusals_pw37w_43", F$ = "_reasons_pw37w_52", z$ = "_reason_pw37w_52", W$ = "_actions_pw37w_62", ue = {
  sheet: M$,
  title: B$,
  stage: P$,
  effects: j$,
  effect: D$,
  numeral: H$,
  effectText: O$,
  refusals: q$,
  reasons: F$,
  reason: z$,
  actions: W$
};
function K$({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(_, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function i2({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
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
      /* @__PURE__ */ t(K$, { refused: v, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ t(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const G$ = "_list_1rowi_2", U$ = "_path_1rowi_7", V$ = "_head_1rowi_21", Y$ = "_label_1rowi_28", X$ = "_consequence_1rowi_35", J$ = "_ask_1rowi_36", Je = {
  list: G$,
  path: U$,
  head: V$,
  label: Y$,
  consequence: X$,
  ask: J$
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
function Q$({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(_, { variant: Wt(a), size: "sm", onClick: () => n(e.kind), children: Ja[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(_, { variant: Wt(a), size: "sm", disabled: !0, describedBy: r, children: Ja[e.kind] }),
    /* @__PURE__ */ t("span", { className: Je.ask, id: r, children: e.askInstead })
  ] });
}
function Z$({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Je.path, "data-allowed": e.allowed, "data-role": zt(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Je.head, children: [
      /* @__PURE__ */ t("span", { className: Je.label, children: e.title ?? Ja[e.kind] }),
      /* @__PURE__ */ t(h, { role: zt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: Je.consequence, children: e.consequence }),
    /* @__PURE__ */ t(Q$, { path: e, primary: a, onChoose: n })
  ] });
}
function s2({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: Je.list, children: e.map((n, r) => /* @__PURE__ */ t(Z$, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const e0 = "_list_1m7i0_2", a0 = "_item_1m7i0_6", t0 = "_node_1m7i0_18", n0 = "_body_1m7i0_24", r0 = "_head_1m7i0_30", l0 = "_stage_1m7i0_36", o0 = "_version_1m7i0_41", i0 = "_sentence_1m7i0_49", s0 = "_meta_1m7i0_54", Ne = {
  list: e0,
  item: a0,
  node: t0,
  body: n0,
  head: r0,
  stage: l0,
  version: o0,
  sentence: i0,
  meta: s0
}, c0 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function d0({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ne.head, children: [
    /* @__PURE__ */ t("span", { className: Ne.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: Ne.version, title: e.version, children: e.version }) : null
  ] });
}
function u0({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ne.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${Ne.node} ward-history-node`, children: /* @__PURE__ */ t(Me, { size: 9, kind: c0[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ne.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(d0, { entry: e }),
      /* @__PURE__ */ t("span", { className: Ne.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ne.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ne(e.cost)}`
      ] })
    ] })
  ] });
}
function c2({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${Ne.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(u0, { entry: a }, a.stage + String(n))) });
}
const m0 = "_thread_1e70p_3", h0 = "_turn_1e70p_8", w0 = "_who_1e70p_27", f0 = "_body_1e70p_32", pa = {
  thread: m0,
  turn: h0,
  who: w0,
  body: f0
}, lr = Ie(!1);
function d2({ children: e, density: a }) {
  return /* @__PURE__ */ t(lr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${pa.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function u2({ turn: e }) {
  if (!Ee(lr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${pa.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${pa.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${pa.body} ward-chat-body`, children: e.body })
  ] });
}
const _0 = "_list_yiolt_3", v0 = "_row_yiolt_7", b0 = "_label_yiolt_20", p0 = "_n_yiolt_26", g0 = "_cause_yiolt_33", na = {
  list: _0,
  row: v0,
  label: b0,
  n: p0,
  cause: g0
};
function y0(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const N0 = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function k0({ row: e, formatNumber: a }) {
  return y0(e), /* @__PURE__ */ o("li", { className: `${na.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(Me, { size: 8, ...N0[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: na.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${na.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t($0, { cause: e.cause })
  ] });
}
function $0({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${na.cause} ward-healthrow-cause`, children: e }) : null;
}
function m2({ rows: e, formatNumber: a = ee }) {
  return /* @__PURE__ */ t("ul", { className: `${na.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(k0, { row: n, formatNumber: a }, n.label)) });
}
const C0 = "_root_1jxwp_2", S0 = {
  root: C0
};
function h2({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: S0.root, "data-density": l, children: [
    /* @__PURE__ */ t(Da, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const R0 = "_row_dhbre_3", T0 = "_key_dhbre_13", x0 = "_stack_dhbre_24", L0 = "_value_dhbre_32", A0 = "_evidence_dhbre_39", E0 = "_mark_dhbre_47", Ve = {
  row: R0,
  key: T0,
  stack: x0,
  value: L0,
  evidence: A0,
  mark: E0
};
function I0({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(rt, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function w2({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ve.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Ve.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ve.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Ve.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Ve.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Ve.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(I0, { state: e.state }) })
  ] });
}
const M0 = "_cell_gh2sd_2", B0 = {
  cell: M0
}, P0 = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function j0(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function D0(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function H0(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: j0(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function O0(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function f2({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  D0(e, n);
  const r = O0(e);
  return /* @__PURE__ */ t(
    Od,
    {
      label: "Rejection routing",
      columns: P0,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: B0.cell, "data-norerun": l.noRerun ? !0 : void 0, children: H0(l, i) }),
      empty: a ?? /* @__PURE__ */ t(Sm, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const q0 = "_row_1f2re_2", F0 = "_title_1f2re_12", z0 = "_turns_1f2re_18", W0 = "_waiting_1f2re_19", K0 = "_resolved_1f2re_20", G0 = "_activity_1f2re_21", U0 = "_cost_1f2re_28", V0 = "_link_1f2re_29", Y0 = "_tableLink_1f2re_47", X0 = "_tableRecord_1f2re_48", J0 = "_tableRow_1f2re_59", Q0 = "_tableTitle_1f2re_71", Z0 = "_tableResolved_1f2re_76", eC = "_tableMeta_1f2re_87", aC = "_tableCost_1f2re_94", tC = "_tableActivity_1f2re_95", nC = "_tableState_1f2re_105", H = {
  row: q0,
  title: F0,
  turns: z0,
  waiting: W0,
  resolved: K0,
  activity: G0,
  cost: U0,
  link: V0,
  tableLink: Y0,
  tableRecord: X0,
  tableRow: J0,
  tableTitle: Q0,
  tableResolved: Z0,
  tableMeta: eC,
  tableCost: aC,
  tableActivity: tC,
  tableState: nC
}, or = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function rC(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function lC(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function oC(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const iC = { duplicate: "Closed · duplicate" };
function sC({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(Ze, { className: H.tableMeta, text: `waiting on ${e}` });
}
function cC({ value: e }) {
  return /* @__PURE__ */ t("td", { className: H.tableCost, children: e === void 0 ? null : ne(e) });
}
function dC({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${H.tableRecord} ward-target`, href: q(e.href), children: `→ ${e.key}` });
}
function uC({ session: e, href: a }) {
  const n = or[e.state];
  return /* @__PURE__ */ o("tr", { className: H.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: H.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${H.tableLink} ward-target`, href: q(a), children: /* @__PURE__ */ t(Ze, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: H.tableMeta, children: lC(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: H.tableResolved, children: [
      oC(e.resolved),
      /* @__PURE__ */ t(sC, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(cC, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: H.tableActivity, children: rC(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: H.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: iC[e.state] ?? n.label }),
      /* @__PURE__ */ t(dC, { link: e.link })
    ] }) })
  ] });
}
function mC({ session: e }) {
  const a = or[e.state];
  return /* @__PURE__ */ o("div", { className: H.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t(Ze, { className: H.title, text: e.title }),
    /* @__PURE__ */ t("span", { className: H.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t(Ze, { className: H.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: H.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: H.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : ne(e.cost) }),
    /* @__PURE__ */ t("span", { className: H.activity, children: de(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: H.link, href: q(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function _2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(uC, { session: e.session, href: e.href }) : /* @__PURE__ */ t(mC, { session: e.session });
}
const hC = "_block_1yy2v_3", wC = "_list_1yy2v_9", fC = "_line_1yy2v_14", Qa = {
  block: hC,
  list: wC,
  line: fC
}, _C = { warn: "warning", ok: "ok" };
function vC({ kind: e }) {
  const a = _C[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function bC({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Qa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(vC, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function v2({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${Qa.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: Qa.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(bC, { line: n }, `${r}-${n.text}`)) }) });
}
const pC = "_band_tt7hp_1", gC = "_head_tt7hp_8", yC = "_cell_tt7hp_19", NC = "_index_tt7hp_35", kC = "_title_tt7hp_42", $C = "_note_tt7hp_48", CC = "_cellTitle_tt7hp_53", SC = "_cellBody_tt7hp_58", RC = "_tag_tt7hp_64", pe = {
  band: pC,
  head: gC,
  cell: yC,
  index: NC,
  title: kC,
  note: $C,
  cellTitle: CC,
  cellBody: SC,
  tag: RC
}, Kt = 4;
function b2({ index: e, title: a, note: n, cells: r }) {
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
  DC as ACCENT_PRESETS,
  rS as ActionStack,
  t2 as ActivityConsole,
  GC as AdminIcon,
  Of as AgentCard,
  UC as AppShell,
  OS as AppearanceStrip,
  b2 as Band,
  aS as BarChart,
  oh as BoardColumn,
  pS as BoardFootnote,
  gS as BoardHeader,
  WC as BoardIcon,
  uS as BoardScroller,
  _ as Btn,
  jC as CHIP_ROLES,
  Kn as CREDENTIAL_COLUMNS,
  eS as Callout,
  qS as CapabilityRow,
  u2 as ChatMessage,
  Zt as Checkbox,
  h as Chip,
  Ze as ClampText,
  n2 as ClarificationRow,
  LS as ClauseRuleRow,
  xS as ClauseRules,
  Cn as ColourLadder,
  FS as ComponentRow,
  r2 as Composer,
  NS as ConfigRow,
  yS as ConfigRowHead,
  lt as ConnectionMark,
  a2 as ConsoleAnnounceProvider,
  d2 as Conversation,
  Sd as CostMeter,
  WS as CredentialRow,
  zS as CredentialRowHead,
  l2 as CriteriaList,
  oi as Crumb,
  HC as DENSITIES,
  m2 as DeliveryHealth,
  wS as DeniedState,
  ES as DryRunRail,
  Sm as EmptyState,
  KS as EnvCard,
  M as Field,
  hS as FilteredEmpty,
  cS as FormStack,
  Da as GateChecklist,
  o2 as GateLadder,
  Od as Grid,
  MS as HandoffRuleRow,
  IS as HandoffRules,
  zC as HomeIcon,
  kS as ItemDrawer,
  GS as KeyPanel,
  Sr as LIVE_EVENT_TYPES,
  sf as LegacyBoardColumn,
  CS as LegacyBoardHeader,
  SS as LegacyConfigRow,
  TS as LegacyItemDrawer,
  ef as LegacyOverCapNote,
  RS as LegacyPreviewRail,
  Nn as LegacyWorkCard,
  Se as LiveIndicator,
  fS as LoadFailed,
  bS as Loading,
  Jn as MCP_SERVER_COLUMNS,
  rt as Mark,
  VS as MarkUpload,
  Me as Marker,
  XS as McpServerRow,
  YS as McpServerRowHead,
  YC as Menu,
  VC as MenuButton,
  BS as NewStreamModal,
  xm as OverCapNote,
  ea as Overlay,
  AS as PARTIAL_STEP_REASON,
  Qn as POLICY_CHIP_WIDTH,
  oS as PageFrame,
  ZC as PageHeader,
  tS as PlainList,
  JS as PolicyRow,
  $S as PreviewRail,
  za as ROLE_MATRIX_COLUMNS,
  jn as RULE_ACTIONS,
  _n as Radio,
  h2 as ReadyChecklist,
  sS as RecordSection,
  i2 as RequeueSheet,
  s2 as ResolveBlock,
  w2 as ResolvedFieldRow,
  QS as RoleMatrixRow,
  f2 as RoutingTable,
  PS as RuleRow,
  ZS as RunbookSteps,
  Cr as STREAM_STEPS,
  dS as SectionBand,
  xt as SectionHeader,
  wn as SegmentedControl,
  sn as Select,
  _2 as SessionRow,
  QC as Sidebar,
  jS as StageColumn,
  mS as StageGrid,
  c2 as StageHistory,
  yb as StageListEditor,
  _S as StaleStrip,
  Ba as StatStrip,
  DS as StreamRow,
  KC as StudioIcon,
  iS as SubjectRail,
  ze as Switch,
  JC as TabLinks,
  nS as TableHead,
  XC as Tabs,
  IC as ThemeProvider,
  HS as ToolRow,
  lS as TopBar,
  Fu as Tree,
  pn as TreeRow,
  v2 as TypedInputBlock,
  ro as UNSAFE_HREF,
  e2 as ValidationList,
  AC as VisibilityProvider,
  EC as Visible,
  PC as WARD_VERSION,
  ja as WorkCard,
  vS as WriteUnavailableStrip,
  rC as agoSince,
  wr as clock,
  Db as colourStatus,
  ee as count,
  ce as duration,
  Za as elapsed,
  BC as eventSourceTransport,
  La as isStreamStep,
  Aa as isValidatedStreamStep,
  __ as ladderValidation,
  s1 as mcpConnectionChip,
  o1 as mcpToolName,
  ne as money,
  we as ms,
  gn as ordered,
  Vt as ratio,
  Ty as restartLabel,
  q as safeHref,
  de as stamp,
  et as stream,
  qC as streamChip,
  Ma as streamChipProps,
  ve as streamColour,
  Tr as streamHex,
  OC as streamVars,
  fa as useBorderFlash,
  Nr as useFocusTrap,
  FC as useLiveFeed,
  MC as useReturnFocus,
  xa as useRovingTabindex,
  at as useTicker,
  fr as useVisible,
  W as v,
  US as validateMark,
  ca as validatedStep,
  Xt as validatedStreamSteps
};
