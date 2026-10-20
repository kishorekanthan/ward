import { jsx as n, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as Ca, useContext as Ne, createContext as ke, useState as p, useEffect as S, useCallback as te, useRef as f, useLayoutEffect as rt, useId as y, Fragment as Sa, isValidElement as sl, Children as Ra } from "react";
import { createPortal as cl, flushSync as Ta } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const Hn = (e) => String(e).padStart(2, "0");
function gn(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${Hn(t % 60)}s` : `${Math.floor(a / 60)}h ${Hn(a % 60)}m`;
}
const dl = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const t = dl.formatToParts(new Date(e)), a = (r) => {
    var l;
    return ((l = t.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
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
function ae(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function xa(e, t) {
  return `${e} / ${t}`;
}
const ul = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function hl(e) {
  return ul.format(new Date(e));
}
const La = ke(/* @__PURE__ */ new Set());
function Cx({ hidden: e, children: t }) {
  const a = Ca(() => new Set(e), [e]);
  return /* @__PURE__ */ n(La.Provider, { value: a, children: t });
}
function ml(e) {
  return !Ne(La).has(e);
}
function Sx({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(T, { children: ml(e) ? t : a });
}
const wl = "(prefers-color-scheme: dark)";
function On() {
  return typeof window.matchMedia == "function" ? window.matchMedia(wl) : null;
}
function _l(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = On()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? On() : null;
    if (!r) return;
    const l = () => a(r.matches);
    return l(), r.addEventListener("change", l), () => r.removeEventListener("change", l);
  }, [e]), t;
}
function Zt(e, t) {
  S(() => {
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function fl(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function Rx({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const l = _l(e === "system");
  return Zt("data-theme", fl(e, l)), Zt("data-accent", t), Zt("data-density", a), /* @__PURE__ */ n(T, { children: r });
}
const vl = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function bl(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function pl(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function gl(e, t, a, r) {
  return e.shiftKey ? bl(t, a) ? r : void 0 : document.activeElement === r || pl(t) ? a : void 0;
}
function yl(e, t, a) {
  const r = a[0], l = a[a.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = gl(e, t, r, l);
  i && (e.preventDefault(), i.focus());
}
function Nl(e) {
  return { onKeyDown: te(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(vl));
      yl(a, e.current, r);
    },
    [e]
  ) };
}
function Tx(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [t, e]);
}
const Fn = { ArrowUp: -1, ArrowDown: 1 }, Dn = { ArrowLeft: -1, ArrowRight: 1 }, kl = (e, t, a) => Math.min(a, Math.max(t, e));
function $l(e, t) {
  if (t !== "horizontal" && e in Fn) return Fn[e];
  if (t !== "vertical" && e in Dn) return Dn[e];
}
function Wt({ orientation: e = "both" } = {}) {
  const [t, a] = p(0), r = f(/* @__PURE__ */ new Map()), l = f(!1);
  rt(() => {
    var _;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(t)) return;
    const h = u[0], w = l.current;
    l.current = !1, a(h), w && ((_ = r.current.get(h)) == null || _.focus());
  });
  const i = te((u) => a(u), []), s = te((u) => {
    var h;
    a(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = te(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(t)), _ = $l(u.key, e);
      _ !== void 0 ? (u.preventDefault(), s(h[kl(w + _, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [t, s, e]
  ), d = te(
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
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: i };
}
const xx = (e, t, a) => {
  const r = new EventSource(e), l = (i) => a.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, Lx = "0.2.0", Ax = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Cl = [1, 2, 3, 4, 5, 6], Aa = [1, 2, 3], Sl = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], Ex = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], Ix = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], j = {
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
function yn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Kt(e) {
  return Cl.includes(e);
}
function vt(e) {
  return Aa.includes(e);
}
function Rl(e) {
  if (!Kt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function Mx(e) {
  if (!Kt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Tl = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function xl(e) {
  if (!Kt(e)) throw new Error("unvalidated stream step");
  return Tl[e];
}
function zn(e) {
  return typeof e != "string" ? null : Sl.includes(e) ? e : null;
}
function Ll(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function Al(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function El(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Il(e, t, a) {
  const r = Ll(e);
  if (r === null) return null;
  const l = zn(a) ?? zn(r.type);
  return l === null ? null : { ...r, type: l, id: Al(r, t), at: El(r) };
}
function Ml(e, t) {
  return e >= pe.staleAfter ? "stale" : e >= pe.heartbeat && t === "live" ? "reconnecting" : null;
}
function Bl(e, t, a) {
  return e >= pe.heartbeat && !t && a !== null;
}
function Bx(e, t) {
  const [a, r] = p("reconnecting"), [l, i] = p(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), h = f(null), w = f(0), _ = f(0), N = f(!1), k = f("reconnecting"), E = te((L) => {
    k.current = L, r(L);
  }, []), H = te(() => {
    c.current = Date.now();
  }, []), me = te((L) => {
    for (const [Y, $e] of s.current)
      ($e === "*" || L.itemKey === $e) && Y(L);
  }, []), re = te(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (L, Y, $e) => {
        const Ke = Il(L, Y, $e);
        Ke !== null && (Ke.id && (d.current = Ke.id), H(), N.current = !1, E("live"), i(Ke.at), me(Ke));
      },
      onOpen: () => {
        u.current = 0, N.current = !1, H(), E("live");
      },
      onError: () => {
        var Y;
        (Y = h.current) == null || Y.close(), h.current = null, N.current = !0, k.current !== "stale" && E("reconnecting");
        const L = Math.min(pe.reconnectBase * 2 ** u.current, pe.reconnectMax);
        u.current += 1, w.current = window.setTimeout(re, L);
      }
    });
  }, [me, E, H, t, e]), Me = te((L) => {
    N.current = !0, L.close(), h.current = null, w.current = window.setTimeout(re, pe.reconnectBase);
  }, [re]), Qe = te((L, Y) => (s.current.set(Y, L), () => {
    s.current.delete(Y);
  }), []);
  return S(() => (re(), _.current = window.setInterval(() => {
    const L = Date.now() - c.current, Y = Ml(L, k.current);
    Y && E(Y);
    const $e = h.current;
    Bl(L, N.current, $e) && Me($e);
  }, pe.tick), () => {
    var L;
    window.clearInterval(_.current), window.clearTimeout(w.current), N.current = !1, (L = h.current) == null || L.close(), h.current = null;
  }), [re, Me, E]), { connection: a, lastEventAt: l, subscribe: Qe };
}
function Nn(e, t) {
  const a = new Date(e).getTime(), [r, l] = p(() => Date.now());
  return S(() => {
    if (!t) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    i();
    const s = window.setInterval(i, pe.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", i);
    };
  }, [t, a]), Math.max(0, r - a);
}
const jl = { blue: "running", orange: "waiting", green: "done" };
function Pl() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Wn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function Lt(e, t) {
  const a = f(0), r = te((l) => {
    const i = l ?? t, s = e.current;
    s !== null && i !== void 0 && (Pl() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${jl[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => Wn(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => Wn(s), pe.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (l) => r(l) : () => r(t);
}
const ql = "_root_1otpc_2", Hl = {
  root: ql
};
function Ol(e, t, a, r, l) {
  const i = [gn(t)];
  return e || i.push(`as of ${hl(a)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Ee({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const l = a !== "stale", i = Nn(e, l), s = (t == null ? void 0 : t.at) ?? e, c = Ol(l, i, s, r, t);
  return /* @__PURE__ */ o("span", { className: `${Hl.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const Fl = "_app_1bnco_1", Dl = "_side_1bnco_35", zl = "_sideTop_1bnco_46", Wl = "_sideBody_1bnco_60", Kl = "_iconRail_1bnco_99", Gl = "_railItem_1bnco_108", Ul = "_railIcon_1bnco_129", Vl = "_railDot_1bnco_134", Jl = "_railLetter_1bnco_140", Yl = "_main_1bnco_146", Ql = "_rail_1bnco_108", Xl = "_page_1bnco_168", Zl = "_headerRow_1bnco_191", eo = "_sidebarToggle_1bnco_198", to = "_headerSlot_1bnco_203", no = "_headerAction_1bnco_208", ao = "_drawerSide_1bnco_213", ro = "_root_1bnco_260", lo = "_topbar_1bnco_267", oo = "_mark_1bnco_278", io = "_brand_1bnco_285", so = "_tagline_1bnco_291", co = "_identity_1bnco_297", uo = "_tools_1bnco_298", ho = "_nav_1bnco_308", mo = "_metadata_1bnco_315", wo = "_actor_1bnco_330", _o = "_detail_1bnco_331", fo = "_content_1bnco_376", vo = "_toolsPanel_1bnco_392", bo = "_skip_1bnco_418", C = {
  app: Fl,
  side: Dl,
  sideTop: zl,
  sideBody: Wl,
  iconRail: Kl,
  railItem: Gl,
  railIcon: Ul,
  railDot: Vl,
  railLetter: Jl,
  main: Yl,
  rail: Ql,
  page: Xl,
  headerRow: Zl,
  sidebarToggle: eo,
  headerSlot: to,
  headerAction: no,
  drawerSide: ao,
  root: ro,
  topbar: lo,
  mark: oo,
  brand: io,
  tagline: so,
  identity: co,
  tools: uo,
  nav: ho,
  metadata: mo,
  actor: wo,
  detail: _o,
  content: fo,
  toolsPanel: vo,
  skip: bo
};
function ot(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const po = "_scope_1an6i_2", go = {
  scope: po
}, Ea = ke(null);
function jx({ reason: e, actions: t = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${go.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(Ea.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Ie() {
  return Ne(Ea);
}
function Gt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : ot(e, t.reasonId);
}
const yo = "_btn_hrmlj_2", No = "_primary_hrmlj_14", ko = "_destructive_hrmlj_25", $o = "_secondary_hrmlj_35", Co = "_ghost_hrmlj_40", So = "_overflow_hrmlj_49", Ro = "_sm_hrmlj_56", To = "_disabled_hrmlj_60", xo = "_withReason_hrmlj_68", Lo = "_reason_hrmlj_74", at = {
  btn: yo,
  primary: No,
  destructive: ko,
  secondary: $o,
  ghost: Co,
  overflow: So,
  sm: Ro,
  disabled: To,
  withReason: xo,
  reason: Lo
};
function Ao(e, t, a, r) {
  const l = t === "sm" ? [at.sm, "ward-btn--sm"] : [], i = a ? [at.disabled] : [];
  return [at.btn, at[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Eo(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Io(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Mo(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function Bo(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function jo(e, t, a) {
  return Bo(e.describedBy, t && a);
}
function Po({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${at.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function qo(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Ie()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(Ho, { ...e });
}
function Ho(e) {
  const t = Ie();
  Io(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || t), i = Mo(e, t), s = y(), c = Oo(i, t);
  return /* @__PURE__ */ o(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: Ao(a, r, l, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: l,
        title: i,
        "aria-describedby": jo(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Eo(a, e.controls),
        children: qo(e)
      }
    ),
    /* @__PURE__ */ n(Po, { id: s, reason: i, shown: c === Ia })
  ] });
}
function Oo(e, t) {
  return e && !t ? Ia : Sa;
}
function Ia({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${at.withReason} ward-btn-withReason`, children: e });
}
let kn = "none";
function Fo(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (kn = "key");
}
typeof document < "u" && (document.addEventListener("keydown", Fo, !0), document.addEventListener("pointerdown", () => {
  kn = "pointer";
}, !0));
function Do() {
  return kn === "key";
}
function _t(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (s) => a(s.matches);
    return r.addEventListener("change", l), a(r.matches), () => r.removeEventListener("change", l);
  }, [e]), t;
}
const zo = "_scrim_1cawq_2", Wo = "_drawer_1cawq_10", Ko = "_sheet_1cawq_14", Go = "_modal_1cawq_18", Uo = "_panel_1cawq_23", Vo = "_start_1cawq_44", Jo = "_header_1cawq_67", Yo = "_title_1cawq_75", Qo = "_body_1cawq_79", Xo = "_close_1cawq_106", xe = {
  scrim: zo,
  drawer: Wo,
  sheet: Ko,
  modal: Go,
  panel: Uo,
  start: Vo,
  header: Jo,
  title: Yo,
  body: Qo,
  close: Xo
}, Zo = ke(null), Bt = [], jt = /* @__PURE__ */ new Map();
function ei(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function ti(e, t) {
  let a = jt.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, jt.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function ni(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !ei(r) && ti(e, r);
}
function ai(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (ni(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function ri(e) {
  for (const t of e.claims) {
    const a = jt.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), jt.delete(t)));
  }
}
function li(e, t) {
  const a = { root: e, claims: [] };
  return Bt.push(a), ai(a, t), a;
}
function oi(e) {
  const t = Bt.indexOf(e);
  t >= 0 && Bt.splice(t, 1), ri(e);
}
function Kn(e) {
  return e !== null && Bt.at(-1) === e;
}
function ii(e, t, a) {
  const r = f(null), l = f(a);
  return l.current = a, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = li(i, t);
    return r.current = c, () => {
      var u, h;
      const d = Kn(c);
      oi(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), te(() => Kn(r.current), []);
}
function si(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function ci(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function di({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${xe.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("header", { className: `${xe.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${xe.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${xe.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function ui(e) {
  return `${xe.scrim} ${xe[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function hi(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${xe.panel} ${xe[e]} ward-overlay-panel${a}${r}`;
}
function mi(e) {
  const t = Ne(Zo);
  return e ?? t ?? document.body;
}
function it(e) {
  const t = f(null), a = f(null), r = y(), l = mi(e.container), i = _t("(min-width: 768px)"), s = si(e.kind, i), c = ci(e, r), d = Nl(a), [u] = p(Do), h = ii(t, l, e.returnFocusTo), w = te(() => {
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
  }, [w]), cl(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: ui(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: w,
        children: /* @__PURE__ */ o(
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
            className: hi(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => h() && d.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${xe.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(di, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const wi = /^([a-z][a-z0-9+.-]*):/i, _i = /* @__PURE__ */ new Set(["http", "https"]), fi = "#";
function vi(e) {
  var r, l;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (l = (r = wi.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function x(e) {
  const t = vi(e);
  return t === void 0 || _i.has(t) ? e : fi;
}
function bi(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function Ma(e) {
  const t = bi(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function pi(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => Ma(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [a, ...a.children]) l == null || l.observe(i);
    return r(), () => {
      a.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, t]);
}
function gi(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : l > e.clientWidth - a ? e.scrollLeft + l - e.clientWidth + a : null;
}
function yi(e, t, a) {
  rt(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !l) return;
    const i = gi(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), Ma(r);
  }, [e, t, a]);
}
const Ni = "_row_11g8i_2", ki = {
  row: Ni
};
function $i(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function $n({ label: e, children: t, count: a, as: r = "div", focusable: l = !0, rowRef: i, className: s, ...c }) {
  const d = f(null), u = i ?? d;
  return pi(u, a), /* @__PURE__ */ n(r, { ref: u, className: [ki.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...$i(l, r), ...c, children: t });
}
const Ci = "_icon_1ylqy_2", Si = {
  icon: Ci
};
function bt({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: Si.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function Px() {
  return /* @__PURE__ */ n(bt, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function qx() {
  return /* @__PURE__ */ o(bt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function Hx() {
  return /* @__PURE__ */ o(bt, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function Ox() {
  return /* @__PURE__ */ n(bt, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Ri() {
  return /* @__PURE__ */ o(bt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const Ba = "ward:sidebar-collapsed", Ti = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function xi() {
  try {
    return window.localStorage.getItem(Ba) === "true";
  } catch {
    return !1;
  }
}
function Li(e) {
  try {
    window.localStorage.setItem(Ba, String(e));
  } catch {
  }
}
function Ai(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Ei(e) {
  return e instanceof Element && e.closest(Ti) !== null;
}
function Ii(e) {
  return e.key === "[" && !Ai(e) && !Ei(e.target);
}
function Mi(e) {
  const [t, a] = p(xi), r = () => {
    Li(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!Ii(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, t]), { collapsed: t, toggle: r };
}
function Bi() {
  const e = _t("(max-width: 767.98px)"), t = _t("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function ji(e) {
  const t = e === "phone", a = y(), r = f(null), [l, i] = p(!1);
  return l && !t && i(!1), { narrow: t, open: l, drawerId: a, slotRef: r, toggle: () => i(!l), close: () => i(!1) };
}
function Pi({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ o("div", { className: C.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: C.headerSlot, children: e }),
    Ha(t) && /* @__PURE__ */ n("span", { className: C.headerAction, children: t })
  ] }) : e;
}
function qi(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function Hi({ sidebar: e, label: t, drawer: a }) {
  var l;
  if (qi(a.open, a.close), !a.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(it, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (l = a.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ n("div", { className: C.drawerSide, onClick: r, children: ja(e, !1) }) });
}
function Oi(e) {
  const [t, a] = p(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function Fi(e, t) {
  const a = Mi(e === "wide" && !t), r = Oi(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function Di(e, t) {
  const a = Fi(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return Wi(e.collapsed, t);
  const r = a.collapsed, l = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: l, drawsStrip: !l && typeof e.sidebar == "function", toggle: a.toggle };
}
const zi = (e) => e.collapsed && e.drawsStrip;
function Wi(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const Gn = (e) => e ? "" : void 0;
function ja(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Pa({ fold: e }) {
  return /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(Ri, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function Ki({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: C.sideTop, children: /* @__PURE__ */ n(Pa, { fold: e }) });
}
const qa = ke(null);
function Fx() {
  const e = Ne(qa);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(Pa, { fold: e });
}
function Gi({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": yn(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Ui({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: C.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ o("a", { className: C.railItem, href: x(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(Gi, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function Vi({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: l }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ o("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(Ki, { fold: r, inSidebar: l && !i }),
    /* @__PURE__ */ n("div", { className: C.sideBody, hidden: i, children: ja(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(Ui, { items: a ?? [], label: t })
  ] });
}
const Ha = (e) => e != null;
function Ji(e) {
  const { sidebar: t, header: a, action: r, children: l, rail: i, iconRail: s, pageFill: c } = e, d = Ha(i), u = Bi(), h = ji(u), w = Di(e, u), _ = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ o("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": Gn(zi(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(qa.Provider, { value: w, children: /* @__PURE__ */ n(Vi, { sidebar: t, label: _, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ o("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(Pi, { header: a, action: r, label: _, drawer: h }),
      /* @__PURE__ */ n("div", { className: C.page, "data-fill": Gn(c === !0), children: l })
    ] }),
    d && /* @__PURE__ */ n("div", { className: C.rail, children: i }),
    /* @__PURE__ */ n(Hi, { sidebar: t, label: _, drawer: h })
  ] });
}
function Yi({ destinations: e, active: t }) {
  const a = f(null);
  return yi(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n($n, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: x(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function mn({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function Qi({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ o("span", { className: C.metadata, children: [
    /* @__PURE__ */ n(mn, { value: e, className: C.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(mn, { value: t, className: C.detail })
  ] });
}
function Xi() {
  const e = _t("(max-width: 767.98px)"), t = y(), a = f(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Zi({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: C.tools, children: e });
}
function es({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: C.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function ts(e) {
  return /* @__PURE__ */ o("header", { className: C.topbar, children: [
    /* @__PURE__ */ n("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(mn, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ n(Yi, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: C.identity, children: /* @__PURE__ */ n(Qi, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Zi, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function ns(e) {
  const t = y(), a = Xi();
  return /* @__PURE__ */ o("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: C.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(ts, { ...e, menu: a }),
    /* @__PURE__ */ n(es, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: C.content, children: e.children })
  ] });
}
function as(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function Dx(e) {
  return as(e) ? /* @__PURE__ */ n(Ji, { ...e }) : /* @__PURE__ */ n(ns, { ...e });
}
const rs = "_root_itg9o_2", ls = "_row_itg9o_8", os = "_box_itg9o_14", is = "_label_itg9o_21", ss = "_labelHidden_itg9o_26", cs = "_lockedNote_itg9o_36", ds = "_consequence_itg9o_44", us = "_sample_itg9o_79", Pe = {
  root: rs,
  row: ls,
  box: os,
  label: is,
  labelHidden: ss,
  lockedNote: cs,
  consequence: ds,
  sample: us
};
function hs(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function ms({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${Pe.consequence} ward-check-consequence`, children: t }) : null;
}
function ws({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Pe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function _s(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function fs(e, t, a, r) {
  const l = e.consequence ? `${t}-note` : void 0, i = _s(e, a, r), s = i ? `${t}-reason` : void 0, c = Gt(ot(l, e.describedBy, s), r);
  return { noteId: l, reason: i, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? i } };
}
function vs({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function bs({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Pe.sample, "aria-hidden": "true", children: e }) : null;
}
function Oa(e) {
  const t = y(), a = Ie(), r = hs(e, a), l = fs(e, t, r.disabled, a);
  return /* @__PURE__ */ o("div", { className: `${Pe.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: Pe.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: t,
          type: "checkbox",
          className: `${Pe.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (i) => {
            var s;
            return !r.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, i.target.checked));
          },
          ...l.input
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: t, className: e.labelHidden ? Pe.labelHidden : Pe.label, children: [
        e.label,
        /* @__PURE__ */ n(ws, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(bs, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(vs, { id: l.reasonId, reason: l.reason }),
    /* @__PURE__ */ n(ms, { id: l.noteId, text: e.consequence })
  ] });
}
const ps = "_chip_pq6tb_2", gs = {
  chip: ps
}, ys = {
  gate: j.chip.gate,
  system: j.chip.system,
  write: j.chip.write,
  drift: j.chip.drift,
  done: j.chip.done,
  attention: j.chip.attention,
  failed: j.chip.failed,
  pending: j.chip.pending,
  running: j.chip.running,
  warn: j.chip.warn,
  meta: j.chip.meta,
  soft: j.chip.soft,
  quiet: j.chip.quiet,
  owed: j.chip.owed,
  neutral: j.chip.quiet,
  info: j.chip.running,
  success: j.chip.done,
  warning: j.chip.attention,
  danger: j.chip.failed
};
function Ns(e, t) {
  if (e === "stream") return ks(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = ys[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function ks(e) {
  if (!e || !vt(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = yn(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${gs.chip} ward-chip ward-chip--${e}`, style: Ns(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const $s = "_clamp_zn74g_3", Un = {
  clamp: $s
};
function lt({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? Un.clamp : `${Un.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const Cs = "_root_1btz3_2", Ss = "_body_1btz3_10", Rs = "_toggle_1btz3_24", en = {
  root: Cs,
  body: Ss,
  toggle: Rs
};
function zx({ children: e, lines: t = 3, label: a }) {
  const [r, l] = p(!1), i = y();
  return /* @__PURE__ */ o("div", { className: en.root, children: [
    /* @__PURE__ */ n("div", { id: i, className: en.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: en.toggle, "aria-expanded": r, "aria-controls": i, onClick: () => l(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const Ts = "_root_1a4s8_2", xs = "_words_1a4s8_16", Ls = "_title_1a4s8_23", As = "_actions_1a4s8_27", yt = {
  root: Ts,
  words: xs,
  title: Ls,
  actions: As
};
function Wx({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ o("section", { className: yt.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ o("div", { className: yt.words, children: [
      /* @__PURE__ */ n("strong", { className: yt.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: yt.actions, children: a })
  ] });
}
const Es = "_root_8zmpu_2", Is = "_step_8zmpu_12", Ms = "_dot_8zmpu_38", Bs = "_label_8zmpu_51", dt = {
  root: Es,
  step: Is,
  dot: Ms,
  label: Bs
}, js = { done: ", done", now: ", current", next: "" };
function Ps({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ o("li", { className: dt.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${dt.dot} ward-running` : dt.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: dt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: js[e.state] })
  ] });
}
function Kx({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: dt.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(Ps, { step: r, running: t }, r.label)) });
}
function pt(e) {
  return typeof e == "number" && vt(e) ? e : null;
}
function ye(e, t) {
  const a = pt(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function Ut(e, t) {
  const a = pt(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const qs = "_root_13eei_3", Hs = "_nav_13eei_8", Os = "_list_13eei_16", Fs = "_item_13eei_24", Ds = "_link_13eei_44", zs = "_sep_13eei_54", Ws = "_current_13eei_58", Ks = "_chips_13eei_62", je = {
  root: qs,
  nav: Hs,
  list: Os,
  item: Fs,
  link: Ds,
  sep: zs,
  current: Ws,
  chips: Ks
};
function Gs({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: je.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${je.link} ward-target`, href: x(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function Us({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: je.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: je.nav, children: [
    /* @__PURE__ */ n("ol", { className: je.list, children: e.map((r, l) => /* @__PURE__ */ o("li", { className: je.item, children: [
      l > 0 ? /* @__PURE__ */ n("span", { className: je.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(Gs, { step: r, isCurrent: a && l === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${je.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function Fa(e, t, a) {
  const r = f(a);
  r.current = a, S(() => {
    if (!e) return;
    const l = (i) => {
      var s;
      (s = t.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, t]);
}
const Vs = 500;
function Da(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function za() {
  const e = f(""), t = f(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, Vs), e.current);
}
const Nt = 4;
function Js(e, t, a) {
  const r = Math.max(0, a - e.bottom - Nt * 2), l = Math.max(0, e.top - Nt * 2);
  return t <= r || r >= l ? { top: e.bottom + Nt, maxHeight: r } : { top: e.top - Nt - Math.min(t, l), maxHeight: l };
}
function Ys(e, t, a, r) {
  const l = { start: e.left, end: e.right - t }, i = { start: l.start + t <= a, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, a - t));
}
function Qs(e, t, a, r) {
  return { ...Js(e, t.height, a.height), left: Ys(e, t.width, a.width, r) };
}
function At(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Xs(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function Zs(e, t, a) {
  const r = Xs(t, a);
  e.style.setProperty("--ward-anchor-width", At(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const l = e.getBoundingClientRect(), i = document.documentElement;
  return { edges: r, box: l, view: { width: i.clientWidth, height: i.clientHeight } };
}
function ec(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, l) => r.scrollTop = a[l]);
}
function Vn(e, t, a, r) {
  const l = ec(e), i = Zs(e, t, r), s = Qs(i.edges, i.box, i.view, a);
  Object.assign(e.style, { left: At(s.left - i.box.left), top: At(s.top - i.box.top), maxHeight: At(s.maxHeight) }), l();
}
function tc(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function Wa(e, t, a = "start", r) {
  rt(() => {
    const l = t.current, i = e.current;
    if (!l || !i) return;
    const s = tc(l), c = () => Vn(l, i, a, r == null ? void 0 : r.current), d = (u) => {
      l.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), rt(() => {
    t.current && e.current && Vn(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const nc = "_root_1lgbn_2", ac = "_trigger_1lgbn_7", rc = "_value_1lgbn_47", lc = "_menu_1lgbn_65", oc = "_find_1lgbn_87", ic = "_list_1lgbn_103", sc = "_option_1lgbn_114", cc = "_check_1lgbn_133", dc = "_empty_1lgbn_144", ge = {
  root: nc,
  trigger: ac,
  value: rc,
  menu: lc,
  find: oc,
  list: ic,
  option: sc,
  check: cc,
  empty: dc
}, uc = 7;
function hc(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function Jn(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function mc(e, t) {
  const [a, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => Jn(e.options, e.value)), d = (u) => {
    var h;
    Ta(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: l,
    active: s,
    entries: hc(e.options, l),
    findable: e.options.length > uc,
    show: () => {
      e.disabled || (i(""), c(Jn(e.options, e.value)), r(!0));
    },
    close: d,
    to: c,
    pick: (u) => {
      var h;
      u && u.option.value !== e.value && ((h = e.onChange) == null || h.call(e, u.option.value)), d(!0);
    },
    find: (u) => {
      i(u), c(0);
    }
  };
}
function wc(e, t) {
  const a = f(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function _c(e) {
  const t = za();
  return (a) => {
    const r = t(a), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function Ka(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function fc(e) {
  return { ...Ka(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function Ga(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = t[r.key];
    if (!l) return a(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const vc = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function bc(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      vc.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function pc({ entry: e, at: t, menu: a, ids: r, value: l }) {
  return /* @__PURE__ */ o(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
      "data-active": t === a.active || void 0,
      className: ge.option,
      onMouseDown: (i) => i.preventDefault(),
      onMouseMove: () => a.to(t),
      onClick: () => a.pick(e),
      children: [
        /* @__PURE__ */ n("span", { className: ge.check, "aria-hidden": "true" }),
        /* @__PURE__ */ n("span", { className: ge.label, children: e.option.label })
      ]
    }
  );
}
function Cn(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function gc({ menu: e, ids: t, focusRef: a }) {
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
      "aria-activedescendant": Cn(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: Ga(e, Ka(e), () => {
      })
    }
  );
}
function yc({ props: e, menu: t, ids: a, focusRef: r, trigger: l }) {
  const i = _c(t), s = f(null);
  Wa(l, s);
  const c = (d) => {
    Da(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: ge.menu, children: [
    t.findable && /* @__PURE__ */ n(gc, { menu: t, ids: a, focusRef: r }),
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
        "aria-activedescendant": t.findable ? void 0 : Cn(t, a),
        onKeyDown: Ga(t, fc(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(pc, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: ge.empty, children: "No match" })
  ] });
}
function Nc(e, t) {
  const a = e.open ? Cn(e, t) : void 0;
  S(() => {
    var r, l;
    a && ((l = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [a]);
}
function Ua(...e) {
  return e.filter(Boolean).join(" ");
}
function kc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function $c({ props: e, menu: t, ids: a, trigger: r, wantFocus: l }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ie()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: Ua(ge.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": t.open,
      "aria-controls": t.open ? a.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": ot(e["aria-describedby"], a.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...bc(t, l),
      children: /* @__PURE__ */ n("span", { id: a.value, className: ge.value, "data-placeholder": i || void 0, children: kc(e) })
    }
  );
}
function Va(e) {
  const t = Ie(), a = t ? { ...e, disabled: !0, "aria-describedby": Gt(e["aria-describedby"], t) } : e, r = y(), l = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = f(null), s = f(null), c = f(null), d = mc(a, s), u = wc(d.open, c);
  return Fa(d.open, i, () => d.close(!1)), Nc(d, l), /* @__PURE__ */ o("div", { ref: i, className: Ua(ge.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n($c, { props: a, menu: d, ids: l, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(yc, { props: a, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const Cc = "_field_1ensj_2", Sc = "_label_1ensj_8", Rc = "_labelHidden_1ensj_15", Tc = "_control_1ensj_25", xc = "_mono_1ensj_45", Lc = "_area_1ensj_50", Ac = "_invalid_1ensj_57", De = {
  field: Cc,
  label: Sc,
  labelHidden: Rc,
  control: Tc,
  mono: xc,
  area: Lc,
  invalid: Ac
}, Ec = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, Ja = (e) => `${e}-label`;
function Ic({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? Ec : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function Mc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    Va,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": Ja(t.id),
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
function Bc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
const jc = { input: Ic, select: Mc, textarea: Bc };
function Pc(e, t, a) {
  const r = jc[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function qc(e, t, a, r) {
  const l = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": l,
    "aria-describedby": Gt(ot(l ? a : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function Hc(e) {
  const t = e.mono ? [De.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [De.area] : [];
  return [De.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function Oc(e) {
  return e ? `${De.label} ${De.labelHidden} ward-field-label` : `${De.label} ward-field-label`;
}
function q(e) {
  const t = y(), a = `${t}-msg`, r = qc(e, t, a, Ie()), l = Hc(e);
  return /* @__PURE__ */ o("div", { className: `${De.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: Ja(t), className: Oc(e.labelHidden), htmlFor: t, children: e.label }),
    Pc(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${De.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Fc = "_root_sjvm0_2", Dc = "_trigger_sjvm0_9", zc = "_ghost_sjvm0_27", Wc = "_panel_sjvm0_46", Kc = "_edged_sjvm0_67", Gc = "_menu_sjvm0_73", Uc = "_group_sjvm0_78", Vc = "_heading_sjvm0_83", Jc = "_item_sjvm0_89", Yc = "_description_sjvm0_105", Qc = "_large_sjvm0_109", Xc = "_touch_sjvm0_113", Zc = "_icon_sjvm0_117", ed = "_label_sjvm0_125", td = "_text_sjvm0_130", nd = "_trailing_sjvm0_138", ad = "_check_sjvm0_144", rd = "_separator_sjvm0_183", ld = "_footer_sjvm0_189", od = "_find_sjvm0_196", id = "_findGlyph_sjvm0_208", sd = "_findInput_sjvm0_214", cd = "_empty_sjvm0_230", A = {
  root: Fc,
  trigger: Dc,
  ghost: zc,
  panel: Wc,
  edged: Kc,
  menu: Gc,
  group: Uc,
  heading: Vc,
  item: Jc,
  description: Yc,
  large: Qc,
  touch: Xc,
  icon: Zc,
  label: ed,
  text: td,
  trailing: nd,
  check: ad,
  separator: rd,
  footer: ld,
  find: od,
  findGlyph: id,
  findInput: sd,
  empty: cd
}, Ya = ke(null);
function dd(e, t) {
  const [a, r] = p({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (l) => r((i) => ({ open: !0, start: l, request: i.request + 1 })),
    close: (l) => {
      var i;
      Ta(() => r((s) => ({ ...s, open: !1 }))), l && ((i = t.current) == null || i.focus());
    }
  };
}
const ud = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function hd(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = ud.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function Sn(...e) {
  return e.filter(Boolean).join(" ");
}
function md(e, t = {}, a = "field") {
  const { ref: r, className: l, ...i } = t;
  return { ...i, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: Sn(A.trigger, a === "ghost" ? A.ghost : void 0, l) };
}
function Qa(e) {
  const t = y(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = f(null), l = f(null), i = dd(e.defaultOpen === !0, l);
  return Fa(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: Sn(A.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...md(l, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...hd(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(Ya.Provider, { value: { ...a, popup: i, button: l }, children: e.children })
  ] });
}
function wd(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function _d(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const fd = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function vd(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function bd(e, t) {
  return e === "separator" ? e : "items" in e ? vd(e, t) : t(e) ? e : null;
}
function pd(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function gd(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (l) => l.label.toLowerCase().includes(a);
  return pd(e.map((l) => bd(l, r)).filter((l) => l !== null));
}
const Xa = (e, t) => (e % t + t) % t;
function He(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const l = Xa(t + a * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const yd = (e) => e.split("").every((t) => t === e[0]);
function Nd(e, t, a) {
  const r = yd(a), l = r ? a[0] : a, i = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = Xa(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function kd(e) {
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
function $d(e, t) {
  const { items: a } = e, r = () => {
    var l;
    return (l = e.refs.current[e.current()]) == null ? void 0 : l.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(He(a, e.current(), 1))],
    ["ArrowUp", () => e.focus(He(a, e.current(), -1))],
    ["Home", () => e.focus(He(a, -1, 1))],
    ["End", () => e.focus(He(a, a.length, -1))],
    ["Escape", () => t.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function Cd(e, t, a) {
  const r = za(), l = $d(e, t), i = (s) => {
    if (Da(s)) {
      if (!a) return e.focus(Nd(e.items, e.current(), r(s.key)));
      s.preventDefault(), a(s.key);
    }
  };
  return {
    onKeyDown: (s) => {
      const c = l.get(s.key);
      if (!c) return i(s);
      s.preventDefault(), s.stopPropagation(), c();
    },
    onKeyUp: (s) => {
      s.key === " " && s.preventDefault();
    }
  };
}
function Sd(e) {
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
function Rd(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? He(e, -1, 1) : t;
}
function Td(e, t) {
  const { start: a, request: r } = t, l = f(e);
  l.current = e, S(() => {
    const { items: i, focus: s } = l.current;
    a && s(a === "first" ? Rd(i) : He(i, i.length, -1));
  }, [a, r]);
}
function xd({ row: e, nav: t, popup: a }) {
  const { item: r, at: l } = e;
  return {
    onMouseDown: (i) => i.preventDefault(),
    onMouseMove: () => {
      !r.disabled && t.current() !== l && t.focus(l);
    },
    onClick: (i) => {
      var s;
      if (r.disabled) return i.preventDefault();
      (s = r.onSelect) == null || s.call(r), a.close(!0);
    }
  };
}
const Ld = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function Ad(e, t) {
  return Ld(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function Ed(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: A.label, children: e.label });
  return e.description ? /* @__PURE__ */ o("span", { className: A.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: A.description, children: e.description })
  ] }) : a;
}
function Id() {
  return /* @__PURE__ */ n("svg", { className: A.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Yn(e, t) {
  return /* @__PURE__ */ o(T, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: A.icon, "aria-hidden": "true", children: e.icon }) : null,
    Ed(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: A.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(Id, {}) : null
  ] });
}
function Za(e) {
  const { item: t, at: a } = e.row, r = y(), l = {
    ref: (i) => {
      e.nav.refs.current[a] = i;
    },
    role: "menuitem",
    tabIndex: -1,
    className: A.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...Ad(t, r),
    ...xd(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: x(t.href), ...l, children: Yn(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...l, children: Yn(t, r) });
}
function Md({ heading: e, rows: t, nav: a, popup: r }) {
  const l = y();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: A.group, children: [
    /* @__PURE__ */ n("div", { id: l, className: A.heading, children: e }),
    t.map((i) => /* @__PURE__ */ n(Za, { row: i, nav: a, popup: r }, i.at))
  ] });
}
function Bd({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: A.separator }) : e.kind === "group" ? /* @__PURE__ */ n(Md, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(Za, { row: e.row, nav: t, popup: a });
}
function jd() {
  const e = Ne(Ya);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Pd() {
  return /* @__PURE__ */ o("svg", { className: A.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function qd(e, t) {
  const a = () => He(e.items, -1, 1);
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(a())],
    ["ArrowUp", () => e.focus(He(e.items, e.items.length, -1))],
    ["Enter", () => {
      var r;
      return (r = e.refs.current[a()]) == null ? void 0 : r.click();
    }],
    ["Escape", () => t.close(!0)]
  ]);
}
function Hd({ find: e, query: t, setQuery: a, input: r, nav: l, popup: i, menuId: s }) {
  const c = qd(l, i), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ o("div", { className: A.find, children: [
    /* @__PURE__ */ n(Pd, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: A.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function Od(e, t) {
  const [a, r] = p(""), l = f(null), i = t !== void 0 && fd(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = l.current) == null || d.focus();
  };
  return i ? { find: t, query: a, setQuery: r, input: l, toFind: s, entries: gd(e, a) } : { query: a, setQuery: r, input: l, entries: e };
}
const Fd = { regular: void 0, large: A.large, touch: A.touch }, Dd = (e, t) => Sn(A.panel, e ? A.edged : void 0, Fd[t]);
function zd({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: A.empty, children: e.empty ?? "No matches" });
}
function er({ entries: e, footer: t, align: a = "start", find: r, edges: l, size: i = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = jd(), h = f(null);
  Wa(u, h, a, l);
  const w = Od(e, r), _ = wd(w.entries), N = kd(_.flatMap(_d).map((H) => H.item)), k = Cd(N, s, w.toFind), E = Sd(s);
  return Td(N, s), /* @__PURE__ */ o("div", { ref: h, className: Dd(l, i), ...E, children: [
    w.find && /* @__PURE__ */ n(Hd, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: A.menu, ...k, children: _.map((H, me) => /* @__PURE__ */ n(Bd, { block: H, nav: N, popup: s }, me)) }),
    /* @__PURE__ */ n(zd, { find: w.find, count: N.items.length }),
    t && /* @__PURE__ */ n("p", { className: A.footer, children: t })
  ] });
}
function Wd(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function tr(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !Wd(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const Kd = (e, t) => e.reduce((a, r) => a + r + t, -t);
function Gd({ room: e, widths: t, more: a, gap: r }, l) {
  const i = t.map((d, u) => u);
  if (Kd(t, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([l]);
  let c = t[l] + r + a;
  for (const d of i)
    if (d !== l) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const tn = (e) => Number.parseFloat(e) || 0, Qn = (e) => e.getBoundingClientRect().width;
function Ud(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - tn(a.paddingInlineStart) - tn(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), Qn),
    more: r ? Qn(r) : 0,
    gap: tn(a.columnGap)
  };
}
function Vd(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const Jd = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function nr(e, t, a, r = ':scope > [role="tab"]') {
  const [l, i] = p(null);
  return rt(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = Ud(s, r);
      i((u) => Jd(u, d) ? u : d);
    };
    return c(), Vd(s, c);
  }, [e, a, r]), l && Gd(l, t);
}
const Yd = "_strip_1zvzj_2", Qd = "_fits_1zvzj_19", Xd = "_probe_1zvzj_27", Zd = "_moreRoot_1zvzj_36", eu = "_more_1zvzj_36", tu = "_tab_1zvzj_55", nu = "_count_1zvzj_91", au = "_badge_1zvzj_97", J = {
  strip: Yd,
  fits: Qd,
  probe: Xd,
  moreRoot: Zd,
  more: eu,
  tab: tu,
  count: nu,
  badge: au
}, ar = "More";
function ru(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const Xn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Rn = (e) => e.badge === void 0 ? Xn(e) : `${Xn(e)}, ${e.badge}`;
function rr(e) {
  return `${J.strip} ward-tabs ward-tabs--${e}`;
}
const lu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function ou({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ o(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${J.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : Rn(e),
      onClick: () => r(e.id),
      ...a,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
          " ",
          /* @__PURE__ */ n("span", { className: J.count, children: `· ${e.count}` })
        ] }),
        e.badge === void 0 ? null : /* @__PURE__ */ n("span", { className: J.badge, children: e.badge })
      ]
    }
  );
}
function iu(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function su({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(Qa, { label: ar, className: J.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: J.more }, children: /* @__PURE__ */ n(er, { align: "end", entries: e.map((r) => ({ label: Rn(r), onSelect: () => a(r.id) })) }) });
}
function cu(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : lu;
}
function Gx({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: l }) {
  const i = Wt({ orientation: "horizontal" }), s = ru(e, t);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = f(null);
  tr(c, l);
  const d = nr(c, s, e.map(Rn).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${rr(l)} ${J.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(ou, { tab: h, active: t, place: cu(i, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${A.trigger} ${J.more} ${J.probe}`, children: ar }),
    u.length > 0 && /* @__PURE__ */ n(su, { tabs: u, trigger: i.itemProps(e.length), onPick: iu(c, a) })
  ] });
}
const Zn = 7, lr = "More", du = ":scope > a", or = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, uu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function hu(e, t) {
  return !e || e.includes(t) ? {} : uu;
}
function mu({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ o("a", { href: e.href, className: `${J.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: J.count, children: `· ${e.count}` })
    ] })
  ] });
}
function wu({ links: e }) {
  return /* @__PURE__ */ n(Qa, { label: lr, className: J.moreRoot, trigger: { className: J.more }, children: /* @__PURE__ */ n(er, { align: "end", entries: e.map((t) => ({ label: or(t), href: t.href })) }) });
}
function Ux({ links: e, active: t, label: a, level: r }) {
  if (e.length > Zn) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${Zn} — the set is fixed`);
  const l = f(null);
  tr(l, r);
  const i = Math.max(0, e.findIndex((d) => d.id === t)), s = nr(l, i, e.map(or).join(`
`), du), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ o("nav", { ref: l, className: `${rr(r)} ${J.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(mu, { link: d, current: d.id === t, place: hu(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${A.trigger} ${J.more} ${J.probe}`, children: lr }),
    c.length > 0 && /* @__PURE__ */ n(wu, { links: c })
  ] });
}
const _u = "_root_v56ff_3", fu = "_segment_v56ff_9", ea = {
  root: _u,
  segment: fu
};
function ir({ options: e, value: t, onChange: a, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Wt({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${ea.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: ea.segment,
      "aria-checked": d.value === t,
      disabled: l,
      "aria-describedby": i,
      onClick: () => a(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const vu = "_sidebar_s9o1j_3", bu = "_brand_s9o1j_9", pu = "_mark_s9o1j_17", gu = "_word_s9o1j_24", yu = "_nav_s9o1j_30", Nu = "_navItem_s9o1j_39", ku = "_footLink_s9o1j_49", $u = "_group_s9o1j_58", Cu = "_groupName_s9o1j_65", Su = "_agents_s9o1j_81", Ru = "_agent_s9o1j_81", Tu = "_root_s9o1j_96", xu = "_agentTop_s9o1j_105", Lu = "_dot_s9o1j_112", Au = "_agentName_s9o1j_124", Eu = "_agentMeta_s9o1j_138", Iu = "_foot_s9o1j_49", Mu = "_footName_s9o1j_150", Bu = "_footLinks_s9o1j_157", ju = "_linkBrand_s9o1j_184", Pu = "_label_s9o1j_205", qu = "_note_s9o1j_210", Hu = "_footer_s9o1j_226", I = {
  sidebar: vu,
  brand: bu,
  mark: pu,
  word: gu,
  nav: yu,
  navItem: Nu,
  new: "_new_s9o1j_48",
  footLink: ku,
  group: $u,
  groupName: Cu,
  agents: Su,
  agent: Ru,
  root: Tu,
  agentTop: xu,
  dot: Lu,
  agentName: Au,
  agentMeta: Eu,
  foot: Iu,
  footName: Mu,
  footLinks: Bu,
  linkBrand: ju,
  label: Pu,
  note: qu,
  footer: Hu
};
function Ou({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: I.agent,
      href: x(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: I.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: I.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": yn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: I.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: I.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Fu({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: I.foot, children: [
    /* @__PURE__ */ n("span", { className: I.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: I.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${I.footLink} ward-target`, href: x(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function Du({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: I.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: I.brand, children: [
      /* @__PURE__ */ n("span", { className: I.mark }),
      /* @__PURE__ */ n("span", { className: I.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: I.nav, children: t.map((s) => /* @__PURE__ */ n("a", { className: I.navItem, href: x(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: I.group, children: [
      /* @__PURE__ */ o("span", { className: I.groupName, children: [
        a,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: I.new, href: x(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: I.agents, children: r.map((s) => /* @__PURE__ */ n(Ou, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(Fu, { shared: i })
  ] });
}
function zu(e) {
  return e.destinations ?? e.items ?? [];
}
function Wu({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.linkBrand, children: e });
}
function Ku({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.footer, children: e });
}
function Gu({ link: e, active: t }) {
  return /* @__PURE__ */ o("a", { href: x(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: I.note, children: e.note })
  ] });
}
function Uu(e) {
  return /* @__PURE__ */ o("aside", { className: `${I.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Wu, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: zu(e).map((t) => /* @__PURE__ */ n(Gu, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(Ku, { children: e.children })
  ] });
}
function Vu(e) {
  return "agents" in e;
}
function Vx(e) {
  return Vu(e) ? /* @__PURE__ */ n(Du, { ...e }) : /* @__PURE__ */ n(Uu, { ...e });
}
const Ju = "_mark_wlgi8_3", Yu = {
  mark: Ju
}, Qu = { met: "✓", unmet: "", failed: "✕" };
function Tn({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Yu.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: Qu[e]
    }
  );
}
const Xu = "_avatar_1t33a_3", Zu = {
  avatar: Xu
};
function Pt(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function eh(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [Pt(e), ...[...t.slice(1)].map((r) => a + r)];
}
function th(e, t) {
  const a = eh(e).find((l) => !t.has(l));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(Pt(e).charAt(0) + String(r)); ) r += 1;
  return Pt(e).charAt(0) + String(r);
}
function Jx(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const l = th(r, t);
    t.add(l), a.set(r, l);
  }
  return a;
}
function nh(e) {
  return e != null && vt(e) ? Rl(e) : void 0;
}
function Yx({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: Zu.avatar, "data-size": a, "aria-hidden": "true", style: nh(t), children: r ?? Pt(e) });
}
const ah = "_marker_br9fi_2", rh = {
  marker: ah
}, lh = {
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
}, oh = { running: " ward-running" };
function We({ size: e, kind: t, label: a }) {
  const r = { "--marker": lh[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${rh.marker} ward-marker ward-marker--${t}${oh[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const ih = "_root_ti0pq_2", sh = "_chip_ti0pq_11", ch = "_noCase_ti0pq_23", kt = {
  root: ih,
  chip: sh,
  noCase: ch
};
function dh(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function xn({ connection: e, since: t, lastEventAt: a }) {
  const r = dh(t, a), l = Nn(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${kt.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(We, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${kt.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: kt.noCase, children: gn(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${kt.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    he(r)
  ] });
}
const uh = "_root_yylks_2", hh = "_context_yylks_13", mh = "_row_yylks_1", wh = "_heading_yylks_27", _h = "_headingWrap_yylks_35", fh = "_meta_yylks_41", vh = "_chips_yylks_49", bh = "_title_yylks_56", ph = "_consequence_yylks_66", gh = "_actionsWrap_yylks_73", yh = "_actions_yylks_73", Nh = "_action_yylks_73", kh = "_overflowPanel_yylks_102", $h = "_measureClip_yylks_113", Ch = "_measure_yylks_113", U = {
  root: uh,
  context: hh,
  row: mh,
  heading: wh,
  headingWrap: _h,
  meta: fh,
  chips: vh,
  title: bh,
  consequence: ph,
  actionsWrap: gh,
  actions: yh,
  action: Nh,
  overflowPanel: kh,
  measureClip: $h,
  measure: Ch
};
function Sh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(lt, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function Rh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function Th({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function xh({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ o("div", { className: U.meta, children: [
    /* @__PURE__ */ n(Rh, { chips: e }),
    /* @__PURE__ */ n(Th, { consequence: t, consequenceHint: a })
  ] });
}
function Lh({ title: e, chips: t, consequence: a, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: U.heading, children: [
    /* @__PURE__ */ n(Sh, { title: e, density: l }),
    /* @__PURE__ */ n(xh, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function wn({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function ta({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Ah({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: l }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(ta, { disclosure: l }) : t ? [/* @__PURE__ */ n(ta, { disclosure: l }, "more"), /* @__PURE__ */ n(wn, { actions: e }, "actions")] : /* @__PURE__ */ n(wn, { actions: e });
}
function Eh(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function Ih({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(wn, { actions: e }) });
}
function Mh(e, t) {
  const a = y(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: a, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const Bh = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function jh(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && Bh(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function Ph({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(Us, { path: e.path, current: e.current }) });
}
function qh(...e) {
  return e.some((t) => t === null);
}
function Hh(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Oh(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + Hh(e);
}
function Fh(e, t, a, r, l) {
  if (l === 0 || qh(t, a, r)) return !1;
  const [i, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - Oh(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Dh(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function zh(e) {
  return sl(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Wh(e, t) {
  return t.length === 0 && e.length === 1 && zh(e[0]);
}
function Kh(e, t) {
  const a = f(null), r = f(null), l = f(null), i = f(null), [s, c] = p(!1);
  return S(() => {
    const d = a.current;
    if (!Dh(d)) return;
    const u = () => c(Fh(d, r.current, l.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !t };
}
function Gh({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ o("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function Uh({ connection: e }) {
  return e ? /* @__PURE__ */ n(xn, { connection: e.connection, since: e.since }) : null;
}
function Qx({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: l, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: _, actionsRef: N, measureRef: k, collapsed: E } = Kh(s, Wh(s, c)), H = c.length > 0, { disclosure: me, close: re } = Mh(E || H, N), Me = Eh(c, s, E, u);
  return /* @__PURE__ */ o("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(Ph, { crumb: jh(e, r, t) }),
    /* @__PURE__ */ o("div", { className: U.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: _, className: U.headingWrap, children: /* @__PURE__ */ n(Lh, { title: r, chips: a, consequence: l, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ o("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(Uh, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ n(Ah, { actions: s, hasMore: H, collapsed: E, onOverflow: u, disclosure: me }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Ih, { actions: Me, disclosure: me, onEscape: re }),
    /* @__PURE__ */ n(Gh, { actions: s, hasMore: H, measureRef: k })
  ] });
}
const Vh = "_root_td96x_2", Jh = "_body_td96x_16", na = {
  root: Vh,
  body: Jh
};
function Xx({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${na.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: na.body, children: a }) });
}
const Yh = "_root_bf1pc_2", Qh = "_table_bf1pc_9", Xh = "_caption_bf1pc_14", Zh = "_series_bf1pc_23", em = "_category_bf1pc_31", tm = "_cell_bf1pc_39", nm = "_track_bf1pc_45", am = "_lane_bf1pc_52", rm = "_bar_bf1pc_56", lm = "_value_bf1pc_63", om = "_swatch_bf1pc_70", im = "_empty_bf1pc_78", Z = {
  root: Yh,
  table: Qh,
  caption: Xh,
  series: Zh,
  category: em,
  cell: tm,
  track: nm,
  lane: am,
  bar: rm,
  value: lm,
  swatch: om,
  empty: im
}, sm = "—", aa = 6;
function cm(e, t) {
  if (t.length < 1 || t.length > aa)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${aa}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function dm(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function sr(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function um(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function hm({ value: e, top: t, step: a, format: r, missing: l }) {
  const i = um(e, t), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ o("span", { className: Z.track, children: [
    /* @__PURE__ */ n("span", { className: Z.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${Z.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Z.value, children: e === null ? l : r(e) })
  ] }) });
}
function mm({ series: e }) {
  return /* @__PURE__ */ n(T, { children: e.map((t, a) => /* @__PURE__ */ o("th", { scope: "col", className: Z.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Z.swatch, "data-step": sr(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function wm({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${Z.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Z.empty, children: t })
  ] });
}
function _m({ title: e, categories: t, series: a, top: r, format: l = ae, categoryHead: i = "Category", missing: s = sm }) {
  return /* @__PURE__ */ n("div", { className: `${Z.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: Z.table, children: [
    /* @__PURE__ */ n("caption", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Z.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(mm, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Z.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(hm, { value: u.values[d], top: r, step: sr(h, a.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function Zx(e) {
  cm(e.categories, e.series);
  const t = dm(e.series);
  return t === 0 ? /* @__PURE__ */ n(wm, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(_m, { ...e, top: t });
}
const fm = "_root_1bfqw_2", vm = "_figure_1bfqw_7", bm = "_of_1bfqw_13", pm = "_bar_1bfqw_18", gm = "_rows_1bfqw_38", ym = "_row_1bfqw_38", Nm = "_label_1bfqw_49", km = "_amount_1bfqw_54", Be = {
  root: fm,
  figure: vm,
  of: bm,
  bar: pm,
  rows: gm,
  row: ym,
  label: Nm,
  amount: km
};
function $m({ spent: e, ceiling: t, breakdown: a }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Be.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Be.figure} ward-stat-value`, children: [
      oe(e),
      " ",
      /* @__PURE__ */ o("span", { className: Be.of, children: [
        "of ",
        oe(t)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Be.bar} ward-costbar`,
        min: 0,
        max: t,
        value: e,
        "aria-valuetext": `${oe(e)} of ${oe(t)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    a && /* @__PURE__ */ n("ul", { className: Be.rows, children: a.map((l) => /* @__PURE__ */ o("li", { className: `${Be.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Be.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: Be.amount, children: oe(l.amount) })
    ] }, l.label)) })
  ] });
}
const Cm = "_frame_f7bxz_2", Sm = "_table_f7bxz_6", Rm = "_th_f7bxz_12", Tm = "_td_f7bxz_13", xm = "_sort_f7bxz_53", Lm = "_row_f7bxz_65", Am = "_empty_f7bxz_73", Oe = {
  frame: Cm,
  table: Sm,
  th: Rm,
  td: Tm,
  sort: xm,
  row: Lm,
  empty: Am
}, Em = { asc: "ascending", desc: "descending" };
function Im(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return Em[t.direction];
}
function Mm(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: Oe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function Bm(e) {
  return e === void 0 ? void 0 : { width: e };
}
function jm({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Oe.th,
      style: Bm(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Im(e, t),
      children: Mm(e, a)
    }
  );
}
function Pm({ row: e, props: t }) {
  const a = t.rowId(e), r = (t.lockedIds ?? []).includes(a);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: Oe.row,
      "data-selected": a === t.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: t.columns.map((l) => /* @__PURE__ */ n(
        "td",
        {
          className: Oe.td,
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
function qm({
  label: e,
  columns: t,
  rows: a,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u,
  narrow: h
}) {
  return a.length === 0 ? /* @__PURE__ */ n("div", { className: Oe.empty, children: u }) : /* @__PURE__ */ n("div", { className: Oe.frame, "data-narrow": h, children: /* @__PURE__ */ o("table", { className: Oe.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Oe.head, children: t.map((w) => /* @__PURE__ */ n(jm, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(Pm, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const Hm = "_list_v0s52_2", Om = {
  list: Hm
};
function Fm({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: Om.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const Dm = "_label_1u62a_2", zm = {
  label: Dm
};
function eL({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: zm.label, children: t.header }) }, t.key)) }) });
}
const Wm = "_stack_bp6a0_2", Km = {
  stack: Wm
};
function tL({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Km.stack, "data-ward-action-stack": "", children: e });
}
const Gm = "_set_1z0sq_2", Um = "_legend_1z0sq_7", Vm = "_row_1z0sq_15", Jm = "_control_1z0sq_20", Ym = "_input_1z0sq_26", Qm = "_label_1z0sq_31", Xm = "_consequence_1z0sq_36", Ge = {
  set: Gm,
  legend: Um,
  row: Vm,
  control: Jm,
  input: Ym,
  label: Qm,
  consequence: Xm
};
function cr({ legend: e, options: t, value: a, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = y(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: Ge.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: Ge.legend, children: e }),
    t.map((h) => {
      const w = `${u}-${h.value}`, _ = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Ge.row, children: [
        /* @__PURE__ */ o("span", { className: Ge.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: Ge.input,
              value: h.value,
              checked: a === h.value,
              disabled: l,
              "aria-describedby": ot(_, s),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: w, className: Ge.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: _, className: `${Ge.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Zm = "_root_11gpw_2", ew = "_head_11gpw_10", tw = "_note_11gpw_29", nw = "_index_11gpw_34", aw = "_dot_11gpw_38", rw = "_counter_11gpw_49", lw = "_trailing_11gpw_57", Ue = {
  root: Zm,
  head: ew,
  note: tw,
  index: nw,
  dot: aw,
  counter: rw,
  trailing: lw
};
function ow({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("span", { className: `${Ue.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ue.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function iw({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ue.counter, "aria-hidden": "true", children: e }) : null;
}
function ra({ title: e, index: t, note: a, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Ue.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Ue.head, children: [
      /* @__PURE__ */ n(ow, { index: t }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ue.note, children: a }),
    /* @__PURE__ */ n(iw, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ue.trailing, children: i })
  ] });
}
const sw = "_strip_c3x3u_2", cw = "_cell_c3x3u_7", dw = "_value_c3x3u_12", uw = "_link_c3x3u_29", hw = "_label_c3x3u_49", mw = "_tiles_c3x3u_101", ze = {
  strip: sw,
  cell: cw,
  value: dw,
  link: uw,
  label: hw,
  tiles: mw
};
function dr(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const ur = (e) => `${ze.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function ww({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: ze.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: ur(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${ze.label} ward-stat-label`, children: e.label })
  ] });
}
function _w({ cell: e, href: t }) {
  return /* @__PURE__ */ o("div", { className: ze.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: ur(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${ze.link} ward-stat-link`, href: x(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${ze.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const hr = (e) => e.href === void 0 ? /* @__PURE__ */ n(ww, { cell: e }, e.label) : /* @__PURE__ */ n(_w, { cell: e, href: e.href }, e.label);
function Vt({ cells: e, divided: t = !1 }) {
  return dr("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${ze.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(hr) });
}
const la = 6;
function nL({ cells: e }) {
  dr("StatTiles", e, [1, 2 * la]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, la) };
  return /* @__PURE__ */ n("dl", { className: `${ze.tiles} ward-stattiles`, style: t, children: e.map(hr) });
}
const fw = "_root_1eb1u_2", vw = "_track_1eb1u_8", bw = "_thumb_1eb1u_46", pw = "_labelHidden_1eb1u_64", gw = "_label_1eb1u_64", yw = "_lockedNote_1eb1u_84", Ve = {
  root: fw,
  track: vw,
  thumb: bw,
  labelHidden: pw,
  label: gw,
  lockedNote: yw
};
function Nw(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function kw(e) {
  return e ? `${Ve.label} ${Ve.labelHidden}` : Ve.label;
}
function $w(e, t, a) {
  return e && !t && a ? a : void 0;
}
function Cw(e, t, a, r) {
  return { "aria-describedby": Gt(ot(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function Sw({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ye({ label: e, checked: t, onChange: a, disabled: r, locked: l, describedBy: i, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, w = Ie(), { on: _, off: N } = Nw(t, r, l, w !== null), k = $w(N, w !== null, c);
  return /* @__PURE__ */ o("span", { className: `${Ve.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": _,
        "aria-label": e,
        "aria-labelledby": d,
        ...Cw(h, i, w, k),
        className: `${Ve.track} ward-switch`,
        "data-on": _,
        "data-locked": l ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!_)),
        children: /* @__PURE__ */ n("span", { className: Ve.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: d, htmlFor: u, className: kw(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Ve.lockedNote, children: "always on" })
    ] }),
    /* @__PURE__ */ n(Sw, { id: h, reason: k })
  ] });
}
const Rw = "_bar_1vp69_2", Tw = "_skip_1vp69_11", xw = "_mark_1vp69_22", Lw = "_nav_1vp69_30", Aw = "_list_1vp69_34", Ew = "_select_1vp69_41", Iw = "_selectTrigger_1vp69_45", Mw = "_dest_1vp69_52", Bw = "_actor_1vp69_71", jw = "_actorMark_1vp69_84", Pw = "_actorLabel_1vp69_89", qw = "_tagline_1vp69_108", se = {
  bar: Rw,
  skip: Tw,
  mark: xw,
  nav: Lw,
  list: Aw,
  select: Ew,
  selectTrigger: Iw,
  dest: Mw,
  actor: Bw,
  actorMark: jw,
  actorLabel: Pw,
  tagline: qw
};
function Hw(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function Ow(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function aL({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = Ow(r);
  return /* @__PURE__ */ o("header", { className: se.bar, children: [
    /* @__PURE__ */ n("a", { className: `${se.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: se.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: se.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: se.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: se.list, children: t.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${se.dest} ward-target`,
          href: x(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        Va,
        {
          className: se.select,
          triggerClassName: se.selectTrigger,
          "aria-label": "Destination",
          value: a,
          options: t.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => i == null ? void 0 : i(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ o("span", { className: se.actor, children: [
      /* @__PURE__ */ n("span", { className: se.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: Hw(c) })
    ] })
  ] });
}
const Fw = "_tree_zzoob_2", Dw = "_item_zzoob_6", zw = "_row_zzoob_10", Ww = "_button_zzoob_22", qt = {
  tree: Fw,
  item: Dw,
  row: zw,
  button: Ww
}, mr = ke(null);
function Kw({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Wt({ orientation: "vertical" });
  return /* @__PURE__ */ n(mr.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: qt.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const Gw = { ArrowRight: !0, ArrowLeft: !1 };
function oa(e) {
  return e ? !0 : void 0;
}
function Uw(e, t) {
  const a = Gw[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function Vw(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function Jw(e) {
  const t = [qt.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function Yw(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Qw(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Xw(e) {
  return typeof e == "string" ? e : void 0;
}
function Zw({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function e_({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function wr(e) {
  const t = Ne(mr);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = Yw(e);
  return /* @__PURE__ */ o("li", { className: qt.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Jw(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": oa(e.unresolved),
        "data-inherited": oa(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${qt.button} ward-treeitem-btn`,
            onClick: () => Vw(e),
            onKeyDown: (r) => Uw(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Qw(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Xw(e.label), children: e.label }),
              /* @__PURE__ */ n(Zw, { value: e.detail }),
              /* @__PURE__ */ n(e_, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const t_ = "_frame_gxspk_2", n_ = "_subjectRail_gxspk_22", a_ = "_subject_gxspk_22", r_ = "_rail_gxspk_42", l_ = "_record_gxspk_57", o_ = "_recordBody_gxspk_102", i_ = "_stageGrid_gxspk_157", s_ = "_band_gxspk_171", c_ = "_bandBody_gxspk_179", d_ = "_bandActions_gxspk_184", u_ = "_scroller_gxspk_192", h_ = "_board_gxspk_219", m_ = "_lanes_gxspk_228", w_ = "_cardGrid_gxspk_262", ee = {
  frame: t_,
  subjectRail: n_,
  subject: a_,
  rail: r_,
  record: l_,
  recordBody: o_,
  stageGrid: i_,
  band: s_,
  bandBody: c_,
  bandActions: d_,
  scroller: u_,
  board: h_,
  lanes: m_,
  cardGrid: w_
};
function rL({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: ee.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function ia(e) {
  return e ? "true" : void 0;
}
function lL({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: ee.subjectRail, "data-ward-subject-rail": a, "data-ruled": ia(i), children: [
    /* @__PURE__ */ n("div", { className: ee.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ee.rail, "data-sticky": ia(l), "aria-label": r, children: t })
  ] });
}
function oL({ title: e, children: t, note: a, trailing: r, pad: l = "block", label: i, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(ra, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ o("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(ra, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: ee.recordBody, "data-pad": l, "data-measure": c, children: t })
  ] });
}
const __ = "_form_1j8ub_2", f_ = "_fields_1j8ub_9", v_ = "_actions_1j8ub_19", nn = {
  form: __,
  fields: f_,
  actions: v_
};
function iL({ label: e, children: t, actions: a, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: nn.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: nn.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: nn.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function sL({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ o("section", { className: ee.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ee.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: ee.bandActions, children: t })
  ] });
}
const b_ = "(max-width: 767.98px)";
function Ln({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n($n, { className: ee.scroller, label: e, count: a ?? Ra.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function p_({ lanes: e, label: t, laneLabel: a }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: ee.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(q, { kind: "select", label: a, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Ln, { label: t, children: i == null ? void 0 : i.content })
  ] });
}
function g_({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: ee.board, "data-ward-board": "", children: /* @__PURE__ */ n(Ln, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(Sa, { children: a.content }, a.id)) }) });
}
function cL({ children: e, label: t = "Workflow board", lanes: a, laneLabel: r = "Column" }) {
  const l = _t(b_);
  return a === void 0 ? /* @__PURE__ */ n(Ln, { label: t, children: e }) : l ? /* @__PURE__ */ n(p_, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(g_, { lanes: a, label: t });
}
function dL({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), i = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ n($n, { className: ee.stageGrid, label: a, count: l, "data-ward-stage-grid": "", "data-floor": r, style: i, children: t });
}
function uL({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${ee.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const y_ = "_block_6tv5x_3", N_ = "_sentence_6tv5x_10", k_ = "_meta_6tv5x_19", $_ = "_ways_6tv5x_24", C_ = "_action_6tv5x_38", S_ = "_strip_6tv5x_42", R_ = "_loading_6tv5x_61", T_ = "_label_6tv5x_69", x_ = "_counter_6tv5x_76", ve = {
  block: y_,
  sentence: N_,
  meta: k_,
  ways: $_,
  action: C_,
  strip: S_,
  loading: R_,
  label: T_,
  counter: x_
};
function L_({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: ve.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function Jt({ sentence: e, action: t, children: a, role: r = "status", tone: l, kind: i, ask: s }) {
  return /* @__PURE__ */ o("div", { className: `${ve.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ o("p", { className: ve.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ o(T, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(L_, { action: t })
  ] });
}
function A_(e) {
  return /* @__PURE__ */ n(Jt, { ...e, kind: "ward-emptystate" });
}
function hL({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(Jt, { sentence: e, action: a, children: /* @__PURE__ */ o("p", { className: ve.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function E_({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${ve.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function mL({ ways: e, ...t }) {
  return /* @__PURE__ */ n(Jt, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(E_, { ways: e }) });
}
function wL({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(Jt, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ o("p", { className: ve.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function _L({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ o("div", { className: ve.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function fL({ queued: e, since: t }) {
  return /* @__PURE__ */ o("div", { className: ve.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function vL({ label: e, startedAt: t }) {
  const a = f(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  S(() => {
    const s = window.setTimeout(() => l(!0), pe.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = Nn(a.current, r);
  return /* @__PURE__ */ o("div", { className: `${ve.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: ve.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: ve.counter, children: gn(i) }) : null
  ] });
}
const I_ = "_note_cigdt_2", M_ = {
  note: I_
};
function B_({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ o("p", { className: M_.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const j_ = "_card_k7btg_3", P_ = "_hit_k7btg_31", q_ = "_head_k7btg_44", H_ = "_title_k7btg_51", O_ = "_meta_k7btg_57", F_ = "_since_k7btg_66", D_ = "_sep_k7btg_76", z_ = "_fields_k7btg_80", W_ = "_field_k7btg_80", K_ = "_last_k7btg_98", G_ = "_reason_k7btg_110", de = {
  card: j_,
  hit: P_,
  head: q_,
  title: H_,
  meta: O_,
  since: F_,
  sep: D_,
  fields: z_,
  field: W_,
  last: K_,
  reason: G_
}, U_ = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function V_(e, t, a) {
  const r = Lt(e, "blue"), l = Lt(e, "orange"), i = Lt(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: l, green: i };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = U_[d.type];
      u && c[u]();
    });
  }, [r, a, i, t, l]);
}
const J_ = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : oe(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Y_(e, t) {
  return J_[t](e);
}
function Q_({ item: e, connection: t }) {
  const a = /* @__PURE__ */ n("span", { className: de.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ o("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    a,
    /* @__PURE__ */ n(Ee, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.waitsOn,
    a,
    /* @__PURE__ */ o("span", { className: de.since, children: [
      ue(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function X_({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function Z_({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function ef({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: de.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: de.field, children: Y_(e, a) }, a)) });
}
const _n = (e) => e ? !0 : void 0;
function tf(e) {
  return { "--stream": ye(e.streamStep, "id") };
}
function nf(e, t, a) {
  e == null || e(t, a);
}
function af(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function rf({ item: e, stale: t }) {
  var r, l;
  const a = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: de.last, "data-stale": _n(t), children: a }) : null;
}
function Yt(e) {
  const t = e.fields ?? [], a = e.item, r = f(null);
  V_(r, a.key, e.feed);
  const l = af(e.feed), i = tf(a);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: de.card,
      style: i,
      "data-selected": _n(e.selected),
      "data-flagged": _n(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: de.hit, onClick: (s) => nf(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(X_, { item: a }),
        /* @__PURE__ */ n(lt, { as: "p", className: de.title, text: a.title }),
        /* @__PURE__ */ n(Q_, { item: a, connection: l }),
        /* @__PURE__ */ n(Z_, { reason: a.blockedReason }),
        /* @__PURE__ */ n(ef, { item: a, fields: t }),
        /* @__PURE__ */ n(rf, { item: a, stale: l === "stale" })
      ]
    }
  );
}
const lf = "_column_1j8bi_3", of = "_head_1j8bi_21", sf = "_label_1j8bi_30", cf = "_count_1j8bi_39", df = "_list_1j8bi_53", mt = {
  column: lf,
  head: of,
  label: sf,
  count: cf,
  list: df
};
function _r(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function uf({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ o("div", { className: mt.head, children: [
    /* @__PURE__ */ n("h2", { className: mt.label, id: a, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: mt.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function hf(e) {
  return /* @__PURE__ */ n("div", { className: mt.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      Yt,
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
function mf({ column: e, items: t, fields: a, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && t.length > e.cap, w = _r(t, r);
  return /* @__PURE__ */ o("section", { className: mt.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(uf, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(hf, { column: e, items: t, fields: a, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n(B_, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const wf = "_foot_cs4jr_2", _f = "_note_cs4jr_13", ff = "_link_cs4jr_19", an = {
  foot: wf,
  note: _f,
  link: ff
};
function bL({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: an.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: an.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${an.link} ward-target`, href: x(e), children: "Configure board" })
  ] });
}
const vf = "_head_1tfi5_3", bf = "_identity_1tfi5_12", pf = "_titleRow_1tfi5_18", gf = "_title_1tfi5_18", yf = "_key_1tfi5_35", Nf = "_rollup_1tfi5_45", kf = "_tools_1tfi5_53", $f = "_swatch_1tfi5_101", Cf = "_mark_1tfi5_108", Re = {
  head: vf,
  identity: bf,
  titleRow: pf,
  title: gf,
  key: yf,
  rollup: Nf,
  tools: kf,
  swatch: $f,
  mark: Cf
}, sa = "initials:";
function Sf(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Rf(e) {
  const t = [Sf(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function Tf(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Rf(e)
  ] });
}
function xf(e) {
  return e.startsWith(sa) ? e.slice(sa.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function Lf({ markRef: e, streamStep: t }) {
  const a = { "--stream": ye(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Re.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: xf(e) }) : /* @__PURE__ */ n("span", { className: Re.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Af({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function pL({
  stream: e,
  rollups: t,
  connection: a,
  lastEventAt: r,
  owners: l,
  owner: i,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ o("div", { className: Re.head, children: [
    /* @__PURE__ */ o("div", { className: Re.identity, children: [
      /* @__PURE__ */ o("div", { className: Re.titleRow, children: [
        /* @__PURE__ */ n(Lf, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Re.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Re.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Re.rollup, "aria-live": "polite", children: Tf(t) })
    ] }),
    /* @__PURE__ */ o("div", { className: Re.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Af, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(xn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const Ef = "_head_1sejb_14", If = "_line_1sejb_15", Mf = "_cHandle_1sejb_36", Bf = "_cName_1sejb_41", jf = "_nameLine_1sejb_49", Pf = "_cLabel_1sejb_56", qf = "_cCap_1sejb_61", Hf = "_cShown_1sejb_66", Of = "_name_1sejb_49", Ff = "_noCap_1sejb_88", Df = "_state_1sejb_102", zf = "_handle_1sejb_111", Wf = "_sub_1sejb_137", O = {
  head: Ef,
  line: If,
  cHandle: Mf,
  cName: Bf,
  nameLine: jf,
  cLabel: Pf,
  cCap: qf,
  cShown: Hf,
  name: Of,
  noCap: Ff,
  state: Df,
  handle: zf,
  sub: Wf
}, Kf = "can't be hidden or collapsed", Gf = "terminal · counted, not a column", Uf = "A human gate is always shown, so people see what waits for them.", Vf = "A terminal stage is counted, not shown as a column.";
function gL() {
  return /* @__PURE__ */ o("div", { className: O.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: O.cHandle }),
    /* @__PURE__ */ n("span", { className: O.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: O.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: O.cShown, children: "Shown" })
  ] });
}
function Jf(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function Yf(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function ca(e) {
  return e.gate ? Kf : e.terminal ? Gf : Yf(e.agentsMounted);
}
function Qf(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function Xf({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: O.cName, children: [
    /* @__PURE__ */ o("span", { className: O.nameLine, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    ca(e) && /* @__PURE__ */ n("span", { className: O.sub, children: ca(e) })
  ] });
}
function Zf(e) {
  return e === void 0 ? "" : String(e);
}
function ev(e) {
  return e === "" ? void 0 : Number(e);
}
function tv({ name: e, onReorder: t }) {
  const a = Ie();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ n("span", { className: O.cHandle }) : /* @__PURE__ */ n("span", { className: O.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: O.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && Qf(r, t),
      children: "⠿"
    }
  ) });
}
function nv({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${O.cCap} ${O.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: O.cCap, children: /* @__PURE__ */ n(q, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Zf(t.cap), onChange: (r) => a({ ...t, cap: ev(r) }) }) });
}
function av(e) {
  return e.gate ? Uf : e.terminal ? Vf : void 0;
}
function rv({ stage: e, config: t, onChange: a }) {
  const r = Ie() !== null, l = Jf(e, t.shown), i = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ o("span", { className: O.cShown, children: [
    /* @__PURE__ */ n(Ye, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, disabledReason: av(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: O.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function lv(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function yL({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: O.line, "data-kind": lv(e), children: [
    /* @__PURE__ */ n(tv, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Xf, { stage: e }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: /* @__PURE__ */ n(q, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (l) => a({ ...t, label: l }) }) }),
    /* @__PURE__ */ n(nv, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(rv, { stage: e, config: t, onChange: a })
  ] });
}
const ov = "_body_8qsv9_2", iv = "_head_8qsv9_9", sv = "_summary_8qsv9_19", cv = "_block_8qsv9_20", dv = "_actionsBlock_8qsv9_21", uv = "_title_8qsv9_41", hv = "_note_8qsv9_46", mv = "_k_8qsv9_51", wv = "_kv_8qsv9_58", _v = "_row_8qsv9_64", fv = "_label_8qsv9_75", vv = "_value_8qsv9_84", bv = "_quote_8qsv9_90", pv = "_actions_8qsv9_21", gv = "_resolve_8qsv9_111", D = {
  body: ov,
  head: iv,
  summary: sv,
  block: cv,
  actionsBlock: dv,
  title: uv,
  note: hv,
  k: mv,
  kv: wv,
  row: _v,
  label: fv,
  value: vv,
  quote: bv,
  actions: pv,
  resolve: gv
};
function yv(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Nv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Ee, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function kv(e) {
  const t = pt(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function $v(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function Cv(e, t, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Ut(kv(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...yv(e),
    ...$v(a),
    ...Nv(e, t)
  ];
}
function Sv({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: D.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: D.k, children: t }),
    e
  ] });
}
function Rv(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function Tv({ item: e, showKey: t }) {
  const a = Rv(e);
  return !t && !a ? null : /* @__PURE__ */ o("div", { className: D.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function xv({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: D.block, children: [
    /* @__PURE__ */ n("p", { className: D.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: D.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: D.note, children: e.agentMeta })
  ] }) : null;
}
function NL({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), w = Cv(e, l, d);
  return /* @__PURE__ */ n(it, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: D.body, children: [
    /* @__PURE__ */ n(Tv, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: D.summary, children: [
      /* @__PURE__ */ n("h2", { className: D.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: D.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: D.kv, children: w.map(([_, N, k]) => /* @__PURE__ */ o("div", { className: D.row, children: [
      /* @__PURE__ */ n("dt", { className: D.label, children: _ }),
      /* @__PURE__ */ n("dd", { className: D.value, children: N })
    ] }, k ?? _)) }),
    /* @__PURE__ */ n(xv, { item: e }),
    /* @__PURE__ */ o("div", { className: D.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: D.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: D.note, children: c })
    ] }),
    /* @__PURE__ */ n(Sv, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Lv = "_root_3azmy_2", Av = "_list_3azmy_7", Ev = "_item_3azmy_12", Iv = "_box_3azmy_18", Mv = "_text_3azmy_23", Bv = "_note_3azmy_28", Xe = {
  root: Lv,
  list: Av,
  item: Ev,
  box: Iv,
  text: Mv,
  note: Bv
};
function Qt({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ o("div", { className: Xe.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${Xe.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Xe.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Xe.box, children: /* @__PURE__ */ n(Tn, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Xe.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${Xe.note} ward-checklist-note`, children: t })
  ] });
}
const jv = "_rail_znbbp_2", Pv = "_k_znbbp_11", qv = "_head_znbbp_19", Hv = "_section_znbbp_25", Ov = "_card_znbbp_39", Fv = "_strip_znbbp_46", Dv = "_skeleton_znbbp_60", zv = "_skeletonLabel_znbbp_74", Wv = "_bar_znbbp_80", Kv = "_note_znbbp_89", _e = {
  rail: jv,
  k: Pv,
  head: qv,
  section: Hv,
  card: Ov,
  strip: Fv,
  skeleton: Dv,
  skeletonLabel: zv,
  bar: Wv,
  note: Kv
};
function Gv(e) {
  return (t) => e == null ? void 0 : e(t);
}
function rn({ title: e, children: t }) {
  return /* @__PURE__ */ o("section", { className: _e.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: _e.k, children: e }),
    t
  ] });
}
function Uv({ column: e, count: t }) {
  return /* @__PURE__ */ o("div", { className: _e.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: _e.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: _e.bar, "aria-hidden": "true" }, r))
  ] });
}
function Vv({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(mf, { column: l, items: t.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, l.id));
}
function Jv(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Vv, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(Uv, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function kL(e) {
  const t = Gv(e.onOpen), a = _r(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: _e.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${_e.k} ${_e.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(rn, { title: "Card", children: /* @__PURE__ */ n("div", { className: _e.card, children: a && /* @__PURE__ */ n(Yt, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ o(rn, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: _e.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Jv, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: _e.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(rn, { title: "Effect of this config", children: /* @__PURE__ */ n(Qt, { items: e.effects, density: "compact" }) })
  ] });
}
function Yv(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function Qv(e) {
  return Math.ceil(e.length / 2);
}
function Xv(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function fr(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Zv(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const l = fr(e);
  l !== void 0 && a(l), r(Xv(e.type));
}
function eb(e, t, a, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (i) => Zv(i, a, r, l));
  }, [e, t, a, r, l]);
}
function tb(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function nb(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function ab(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function rb(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(Qv(t ?? [])) + ")"
  };
}
function lb(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function ob(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: oe(e.cost) }) : null;
}
function ib(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function sb(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Ee, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function cb(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function db(e, t) {
  return t === void 0 ? e : Yv(e, t.ref);
}
function ub(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ft(e) {
  return e === !0 ? "true" : void 0;
}
function vr(e) {
  const t = e.item, a = t.run, r = a !== void 0, l = f(null), i = Lt(l), s = f(/* @__PURE__ */ new Set()), [c, d] = p(tb(t));
  eb(e.feed, t.key, s, d, i);
  const u = nb(t, r), h = ab(t, a), w = rb(t, e.fields), _ = cb(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...ub(e),
      className: "ward-workcard",
      "data-flagged": ft(t.flagged),
      "data-selected": ft(e.selected),
      style: w,
      ref: db(l, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        lb(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          ob(t, e.fields),
          ib(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          sb(a, c, e.connection, t.changedAt),
          _ !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: _, children: _ }) : null
        ] })
      ]
    }
  ) });
}
function hb({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function mb(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function wb(e, t, a) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function _b(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(hb, { count: e.items.length, cap: e.column.cap });
}
function fb(e, t) {
  return e.roving ?? t;
}
function vb(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function bb(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    vr,
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
function pb(e) {
  const t = y(), a = Wt({ orientation: "vertical" }), r = fb(e, a), l = mb(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": ft(l), "data-gate": ft(e.column.gate), children: [
    wb(e.column, e.items.length, t),
    _b(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...vb(e, a), children: bb(e, r) })
  ] });
}
function gb(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function yb(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function Nb(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function $L(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: gb(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      yb(e),
      Nb(e.onConfigure),
      /* @__PURE__ */ n(xn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function kb(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function $b(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ye, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ye, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function Cb(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function CL(e) {
  const t = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ft(kb(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: $b(e) }),
    /* @__PURE__ */ n(q, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(Oa, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Cb(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function SL(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(vr, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(pb, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function Sb(e, t) {
  const a = fr(e);
  a !== void 0 && t(a);
}
function Rb(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => Sb(r, a));
  }, [e, t, a]);
}
function Tb(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function xb(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", oe(e.cost)]), t;
}
function Lb(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Ee, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Ab(e, t) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function RL(e) {
  var s;
  const t = e.item, a = t.run, [r, l] = p((s = t.run) == null ? void 0 : s.lastStep);
  Rb(e.feed, t.key, l);
  const i = [...Tb(t), ...xb(t)];
  return /* @__PURE__ */ o(it, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Lb(a, r)
    ] }),
    Ab(t, e.actions)
  ] });
}
const Eb = "_card_1nkkx_3", Ib = "_head_1nkkx_30", Mb = "_mark_1nkkx_38", Bb = "_name_1nkkx_50", jb = "_chips_1nkkx_71", Pb = "_description_1nkkx_77", qb = "_run_1nkkx_82", Hb = "_sep_1nkkx_91", Ob = "_facts_1nkkx_97", Fb = "_fact_1nkkx_97", Db = "_factLabel_1nkkx_111", zb = "_factValue_1nkkx_115", ie = {
  card: Eb,
  head: Ib,
  mark: Mb,
  name: Bb,
  chips: jb,
  description: Pb,
  run: qb,
  sep: Hb,
  facts: Ob,
  fact: Fb,
  factLabel: Db,
  factValue: zb
}, Wb = { live: "done", draft: "running", paused: "meta" };
function Kb(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function Gb({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: Wb[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function Ub({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function Vb({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Ee, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function Jb({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ o("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function Yb(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Qb({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": ye(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: Kb(s),
      style: c,
      "data-selected": d,
      "data-paused": Yb(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: x(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(Ub, { description: e.description }),
        /* @__PURE__ */ n(Vb, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(Gb, { versions: e.versions }),
        /* @__PURE__ */ n(Jb, { facts: i })
      ]
    }
  );
}
const Xb = "_list_4dcyc_2", Zb = "_row_4dcyc_11", ep = "_head_4dcyc_23", tp = "_id_4dcyc_30", np = "_lock_4dcyc_35", ap = "_reason_4dcyc_41", rp = "_remove_4dcyc_46", lp = "_clauses_4dcyc_50", op = "_clause_4dcyc_50", ip = "_label_4dcyc_64", sp = "_cell_4dcyc_71", cp = "_value_4dcyc_76", ce = {
  list: Xb,
  row: Zb,
  head: ep,
  id: tp,
  lock: np,
  reason: ap,
  remove: rp,
  clauses: lp,
  clause: op,
  label: ip,
  cell: sp,
  value: cp
}, br = ke(!1);
function TL({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(br.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function dp({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(q, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => a(e.key, l) });
}
function up({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function hp({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ o("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(up, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function da(e, t) {
  return e.locked ? void 0 : t;
}
function xL({ rule: e, onChange: t, onRemove: a }) {
  if (!Ne(br)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = da(e, t);
  return /* @__PURE__ */ o("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(hp, { rule: e, onRemove: da(e, a) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(dp, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const mp = "_ladder_1xdeh_2", wp = "_cell_1xdeh_7", _p = "_empty_1xdeh_26", fp = "_name_1xdeh_34", vp = "_holder_1xdeh_40", bp = "_request_1xdeh_46", pp = "_swatches_1xdeh_51", gp = "_swatch_1xdeh_51", yp = "_tilesFrame_1xdeh_78", Np = "_tiles_1xdeh_78", kp = "_tile_1xdeh_78", $p = "_bar_1xdeh_117", Cp = "_hex_1xdeh_128", Sp = "_note_1xdeh_138", B = {
  ladder: mp,
  cell: wp,
  empty: _p,
  name: fp,
  holder: vp,
  request: bp,
  swatches: pp,
  swatch: gp,
  tilesFrame: yp,
  tiles: Np,
  tile: kp,
  bar: $p,
  hex: Cp,
  note: Sp
}, LL = "not validated yet, pending a CVD matrix and dark stepping";
function Rp(e) {
  return e.reserved ? "reserved" : vt(e.step) ? "validated" : "partial";
}
function pr(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Tp(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function xp({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(We, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${B.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Lp(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function Ap(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const ua = (e) => String(e).padStart(2, "0");
function Ep(e, t, a) {
  return e === "reserved" ? "Reserved until revalidated" : a ? "yours" : t ?? pr(e, void 0);
}
function Ip({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("span", { className: `${B.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.hex} ward-ladder-hex`, children: r ? `step ${ua(e)}` : xl(e) }),
    /* @__PURE__ */ n("span", { className: `${B.note} ward-ladder-note`, children: r ? a : `Step ${ua(e)} · ${a}` })
  ] });
}
function Mp({ step: e, value: t, taken: a, onChange: r, presentation: l, disabled: i }) {
  const s = Rp(e), c = pr(s, a), d = c !== "free", u = d || i, h = t === e.step, w = e.name ?? `Step ${e.step}`, _ = () => {
    u || r(e.step);
  }, N = `${w} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...Ap(d, h, u), "data-validation": s, style: Tp(e, s), onClick: _, onKeyDown: (E) => Lp(E, _) }, label: N, name: w, holder: c, validation: s, note: Ep(s, a, h), step: e.step };
}
const Bp = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${B.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${B.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Ip, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${B.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(xp, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${B.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${B.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function jp(e) {
  return Bp[e.presentation](Mp(e));
}
function Pp(e) {
  for (const t of e)
    if (!t.reserved && !Kt(t.step)) throw new Error("colour ladder renders token steps only");
}
function qp() {
  return /* @__PURE__ */ o("div", { className: `${B.cell} ward-ladder-cell ${B.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${B.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${B.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Hp(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Op = { list: B.ladder, swatches: B.swatches, tiles: B.tilesFrame };
function Fp() {
  return /* @__PURE__ */ o("div", { className: `${B.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${B.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${B.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${B.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Dp = { list: qp, swatches: () => null, tiles: Fp };
function zp(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function gr(e) {
  const t = e.takenBy ?? {}, a = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Pp(e.steps);
  const r = Hp(e), l = Dp[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(jp, { step: s, value: e.value, taken: t[s.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...zp(e.disabled === !0), className: `${Op[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: B.tiles, children: i }) : i });
}
const Wp = "_rail_s06lm_2", Kp = "_section_s06lm_12", Gp = "_sectionFlush_s06lm_22", Up = "_head_s06lm_26", Vp = "_headLabel_s06lm_34", Jp = "_sample_s06lm_42", Yp = "_sampleLabel_s06lm_47", Qp = "_sampleTitle_s06lm_54", Xp = "_sampleMeta_s06lm_59", Zp = "_trace_s06lm_65", eg = "_traceHead_s06lm_70", tg = "_steps_s06lm_78", ng = "_step_s06lm_78", ag = "_stepTitle_s06lm_97", rg = "_hollow_s06lm_107", lg = "_stepBody_s06lm_115", og = "_stepDetail_s06lm_127", ig = "_publish_s06lm_132", sg = "_reason_s06lm_138", cg = "_note_s06lm_143", dg = "_reveal_s06lm_148", $ = {
  rail: Wp,
  section: Kp,
  sectionFlush: Gp,
  head: Up,
  headLabel: Vp,
  sample: Jp,
  sampleLabel: Yp,
  sampleTitle: Qp,
  sampleMeta: Xp,
  trace: Zp,
  traceHead: eg,
  steps: tg,
  step: ng,
  stepTitle: ag,
  hollow: rg,
  stepBody: lg,
  stepDetail: og,
  publish: ig,
  reason: sg,
  note: cg,
  reveal: dg
}, ha = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, ug = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, hg = { ok: "greenFill", finding: "orangeFill", action: "blue" }, mg = { notSimulated: "not simulated", running: "running" };
function wg(e) {
  return e.presentation === "foundry";
}
function _g(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const a = t.filter((r) => !r.met);
  return a.length > 0 ? `Publish is disabled: ${a.length} of ${t.length} gate conditions unmet: ${a[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function fg(e, t) {
  var r;
  const a = ug[e.status];
  return a !== void 0 ? a : ((r = t.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function vg(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function bg(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function pg(e) {
  if (vg(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function gg(e) {
  const [t, a] = p(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function yg(e) {
  const t = mg[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(We, { size: 6, kind: hg[e.kind], label: e.kind });
}
function Ng(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function kg(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Ee, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function $g(e) {
  const { step: t } = e;
  return /* @__PURE__ */ o(gg, { kind: t.kind, children: [
    /* @__PURE__ */ n(yg, { kind: t.kind }),
    /* @__PURE__ */ o("span", { className: $.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: $.stepTitle, children: t.title }),
      /* @__PURE__ */ n(Ng, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(kg, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function Cg(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(ue(t)), a.join(" · ");
}
function yr(e) {
  const t = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.traceHead, id: t, children: Cg(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: $.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n($g, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function Sg(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ o("div", { className: `${$.sample} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ o("p", { className: $.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ o("p", { className: $.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function Rg(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function Tg(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : oe(e.run.cost), label: "Cost" }, { value: e.run.turns ? xa(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Vt, { divided: !0, cells: t }) });
}
function xg(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: oe(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: xa(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function Lg(e) {
  const t = xg(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ o("p", { className: $.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Vt, { divided: !0, cells: t }) });
}
function Nr(e) {
  const t = y();
  return e.reason !== null ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("p", { className: `${$.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Ag(e) {
  return /* @__PURE__ */ o("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ n(Nr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: $.note, children: e.note })
  ] });
}
function Eg(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ n(Nr, { reason: e.reason, onPublish: e.onPublish }) });
}
function kr(e) {
  return /* @__PURE__ */ o("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: ha[e.run.status].role, label: ha[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Ee, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Ig(e, t) {
  const [a, r] = p(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((t == null ? void 0 : t.subscribe) === void 0 || e.status !== "running"))
      return t.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [t, e.status]), a;
}
function Mg(e) {
  var a;
  bg(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(kr, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(Sg, { sample: e.run.sample }),
    /* @__PURE__ */ n(yr, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(Tg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Qt, { items: e.checklist }) }),
    /* @__PURE__ */ n(Ag, { reason: _g(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Bg(e) {
  var r;
  const t = Ig(e.run, e.feed);
  pg(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(kr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(Rg, { sample: e.run.sample }),
    /* @__PURE__ */ n(yr, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(Lg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Qt, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Eg, { reason: fg(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function AL(e) {
  return wg(e) ? /* @__PURE__ */ n(Bg, { ...e }) : /* @__PURE__ */ n(Mg, { ...e });
}
const jg = "_list_142ip_3", Pg = "_row_142ip_9", qg = "_condition_142ip_18", Hg = "_action_142ip_24", Et = {
  list: jg,
  row: Pg,
  condition: qg,
  action: Hg
}, $r = ke(!1);
function EL({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n($r.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: Et.list, "aria-label": t, children: e }) });
}
function IL({ rule: e }) {
  if (!Ne($r)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: Et.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: Et.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: Et.action, children: e.then })
  ] });
}
const Og = "_move_tmppt_3", Fg = {
  move: Og
};
function fn(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [l] = r.splice(t, 1);
  return r.splice(a, 0, l), r;
}
function Cr(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function Sr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function ma(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function Dg(e) {
  return e === "up" ? "down" : "up";
}
function zg(e, t) {
  const a = ma(e, t.id, t.direction) ?? ma(e, t.id, Dg(t.direction));
  a == null || a.focus();
}
function Rr() {
  const e = f(null), [t, a] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && t !== null && zg(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), l(c);
  } };
}
function Tr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Ht({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${Fg.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const Wg = "_body_1jd1i_2", Kg = "_title_1jd1i_8", Gg = "_section_1jd1i_13", Ug = "_legend_1jd1i_18", Vg = "_stages_1jd1i_26", Jg = "_stage_1jd1i_26", Yg = "_stageIndex_1jd1i_44", Qg = "_stageName_1jd1i_50", Xg = "_footer_1jd1i_59", Zg = "_note_1jd1i_66", ey = "_reason_1jd1i_71", ty = "_actions_1jd1i_76", ny = "_webHead_1jd1i_83", ay = "_kicker_1jd1i_92", ry = "_webTitle_1jd1i_99", ly = "_webBody_1jd1i_105", oy = "_webSection_1jd1i_109", iy = "_sectionHead_1jd1i_121", sy = "_sectionNote_1jd1i_129", cy = "_formLabel_1jd1i_134", dy = "_identityRow_1jd1i_139", uy = "_nameCell_1jd1i_145", hy = "_keyCell_1jd1i_150", my = "_colourCell_1jd1i_154", wy = "_colourStatus_1jd1i_161", _y = "_webStages_1jd1i_166", fy = "_webStageList_1jd1i_172", vy = "_webStage_1jd1i_166", by = "_webIndex_1jd1i_191", py = "_webStageName_1jd1i_196", gy = "_webMoves_1jd1i_201", yy = "_addStage_1jd1i_215", Ny = "_addStageButton_1jd1i_223", ky = "_addStageNote_1jd1i_231", $y = "_webFooter_1jd1i_236", Cy = "_webFooterNotes_1jd1i_244", Sy = "_webNote_1jd1i_251", v = {
  body: Wg,
  title: Kg,
  section: Gg,
  legend: Ug,
  stages: Vg,
  stage: Jg,
  stageIndex: Yg,
  stageName: Qg,
  footer: Xg,
  note: Zg,
  reason: ey,
  actions: ty,
  webHead: ny,
  kicker: ay,
  webTitle: ry,
  webBody: ly,
  webSection: oy,
  sectionHead: iy,
  sectionNote: sy,
  formLabel: cy,
  identityRow: dy,
  nameCell: uy,
  keyCell: hy,
  colourCell: my,
  colourStatus: wy,
  webStages: _y,
  webStageList: fy,
  webStage: vy,
  webIndex: by,
  webStageName: py,
  webMoves: gy,
  addStage: yy,
  addStageButton: Ny,
  addStageNote: ky,
  webFooter: $y,
  webFooterNotes: Cy,
  webNote: Sy
}, Ry = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], xr = "not in catalogue";
function Ty(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${xr}` }, ...a];
}
function xy({ stage: e, index: t, catalogue: a, onName: r }) {
  const l = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(q, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${xr}`;
  return /* @__PURE__ */ n(q, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Ty(a, e.name), invalid: i, onChange: r });
}
function Lr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function Ly(e) {
  const t = f([]), a = f(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function Ay({ id: e, stage: t, index: a, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Lr(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: v.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: v.webStageName, children: /* @__PURE__ */ n(xy, { stage: t, index: a, catalogue: l, onName: (u) => i({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(q, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: Ry, onChange: (u) => i({ ...t, kind: u }) }),
    /* @__PURE__ */ o("span", { className: v.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(Ht, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(Ht, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Ey({ stages: e, onChange: t, catalogue: a }) {
  const r = Ly(e.length), l = Rr(), i = (c, d) => {
    const u = Cr(c, d);
    r.current = fn(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Sr(Lr(e[c], c), u, e.length)), t(fn(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: v.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(Ay, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(Tr, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: v.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Iy = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], My = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], By = "A new stream starts as a draft. Nothing runs on it until you publish it.", jy = "Create is disabled: name the stream and give it a key first.", Py = "reorder with the ↑ ↓ buttons · min 2";
function An(e, t) {
  return !e.reserved && vt(e.step) && t[e.step] === void 0;
}
function qy(e, t) {
  const a = e.find((r) => An(r, t));
  return a ? a.step : 1;
}
function Hy({ stages: e, onMove: t }) {
  const a = Rr(), r = (l, i) => {
    const s = Cr(l, i);
    a.moved({ id: e[l].id, direction: i }, Sr(e[l].name, s, e.length)), t(l, s);
  };
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: v.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: v.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: v.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(Ht, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(Ht, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(Tr, { text: a.announcement })
  ] });
}
function Oy({ reason: e, onCreate: t, onDraft: a }) {
  const r = y();
  return /* @__PURE__ */ o("div", { className: v.footer, children: [
    /* @__PURE__ */ n("p", { className: v.note, children: By }),
    e && /* @__PURE__ */ n("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: v.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function Fy(e, t) {
  return e !== "" && t !== "" ? null : jy;
}
function Dy(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: l = My, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = y(), [h, w] = p(""), [_, N] = p(""), [k, E] = p(t[0].value), [H, me] = p(() => qy(a, r)), [re, Me] = p(e.stages ?? Iy), [Qe, L] = p(l[0].value), Y = { name: h, key: _, streamStep: H, owner: k, stages: re, policy: Qe }, $e = Fy(h, _);
  return /* @__PURE__ */ n(it, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: v.body, children: [
    /* @__PURE__ */ n("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ n(q, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ n(q, { kind: "input", label: "Key", value: _, onChange: N, mono: !0 }),
      /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: k, onChange: E, options: t })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ n(gr, { label: "Stream colour", steps: a, value: H, onChange: me, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ n(Hy, { stages: re, onMove: (Ke, il) => Me(fn(re, Ke, il)) })
    ] }),
    /* @__PURE__ */ n(cr, { legend: "Loop policy", options: l, value: Qe, onChange: L }),
    /* @__PURE__ */ n(Oy, { reason: $e, onCreate: () => i(Y), onDraft: () => s(Y) })
  ] }) });
}
const Ar = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], zy = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Wy(e, t, a, r, l, i) {
  var c;
  const s = ((c = Ar.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: i };
}
function Ky(e, t) {
  return Gy(e) && Uy(e, t) && Vy(e);
}
function Gy(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Uy(e, t) {
  return e.colourStep === null || An({ step: e.colourStep }, t);
}
function Vy(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function Jy(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : An({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Yy({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function Qy({ ready: e, draft: t, agentStage: a, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: v.webFooter, children: [
    /* @__PURE__ */ o("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ n(Yy, { stage: a }),
      !e && /* @__PURE__ */ n("p", { id: i, className: v.reason, children: zy })
    ] }),
    l && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => l(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Xy({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: v.webHead, children: [
    /* @__PURE__ */ n("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function Zy({ name: e, setName: t, streamKey: a, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: v.webSection, children: [
    /* @__PURE__ */ n("h3", { className: v.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: v.identityRow, children: [
      /* @__PURE__ */ n("div", { className: v.nameCell, children: /* @__PURE__ */ n(q, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ n("div", { className: v.keyCell, children: /* @__PURE__ */ n(q, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function eN(e) {
  const t = y(), a = y(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [_, N] = p("relay"), [k, E] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), H = Wy(l, s, d, h, _, k), me = Ky(H, r), re = k.find((L) => L.kind === "agent" && L.name.trim() !== ""), Me = /* @__PURE__ */ o("div", { className: v.colourCell, children: [
    /* @__PURE__ */ n("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(gr, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Qe = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("p", { className: v.colourStatus, "data-colour-status": "", children: Jy(h, r) }),
    /* @__PURE__ */ n(q, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((L) => ({ value: L, label: L })), onChange: u })
  ] });
  return /* @__PURE__ */ o(it, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Xy, { titleId: a }),
    /* @__PURE__ */ o("div", { className: v.webBody, children: [
      /* @__PURE__ */ n(Zy, { name: l, setName: i, streamKey: s, setKey: c, colour: Me, owner: Qe }),
      e.fields && /* @__PURE__ */ n("section", { className: v.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ o("section", { className: v.webSection, children: [
        /* @__PURE__ */ o("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: v.sectionNote, children: Py })
        ] }),
        /* @__PURE__ */ n(Ey, { stages: k, onChange: E })
      ] }),
      /* @__PURE__ */ n("section", { className: v.webSection, children: /* @__PURE__ */ n(cr, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: _, options: Ar, onChange: N }) }),
      /* @__PURE__ */ n(Qy, { ready: me, draft: H, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function ML(e) {
  return "presentation" in e ? /* @__PURE__ */ n(eN, { ...e }) : /* @__PURE__ */ n(Dy, { ...e });
}
const tN = "_row_bs8hc_2", nN = "_cell_bs8hc_6", aN = "_condition_bs8hc_11", rN = "_action_bs8hc_18", lN = "_contract_bs8hc_24", oN = "_contractCondition_bs8hc_33", iN = "_contractAction_bs8hc_39", ne = {
  row: tN,
  cell: nN,
  condition: aN,
  action: rN,
  contract: lN,
  contractCondition: oN,
  contractAction: iN
}, Er = ["advance", "block", "escalate", "requestReview"], wa = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Ot(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function En(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ne.action, children: wa[e.then] }) : /* @__PURE__ */ n(
    q,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => t({ ...e, then: l }),
      options: Er.map((l) => ({ value: l, label: wa[l] }))
    }
  );
}
function sN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: ne.row, children: [
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n("span", { className: ne.condition, title: Ot(e, r), children: Ot(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: En(e, t, a) })
  ] });
}
function cN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: ne.row, children: [
    /* @__PURE__ */ o("td", { className: ne.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ne.condition, children: Ot(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: En(e, t, a) })
  ] });
}
function dN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: ne.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ne.contractCondition, children: Ot(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ne.contractAction, children: En(e, t, a, !0) })
  ] });
}
const uN = { two: cN, four: sN, contract: dN };
function BL(e) {
  var a;
  if (!Er.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = uN[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const hN = "_column_g1uat_2", mN = "_head_g1uat_17", wN = "_index_g1uat_23", _N = "_name_g1uat_29", fN = "_meta_g1uat_38", vN = "_mono_g1uat_43", bN = "_gate_g1uat_50", pN = "_reviewersLabel_g1uat_57", gN = "_reviewers_g1uat_57", yN = "_reviewer_g1uat_57", NN = "_agents_g1uat_74", kN = "_workflowColumn_g1uat_79", $N = "_workflowHead_g1uat_96", CN = "_stageRow_g1uat_102", SN = "_stageLabel_g1uat_109", RN = "_workflowTitle_g1uat_116", TN = "_workflowMeta_g1uat_122", xN = "_workflowGate_g1uat_127", LN = "_gateNote_g1uat_135", AN = "_cardNote_g1uat_140", EN = "_reviewerList_g1uat_145", IN = "_reviewerRow_g1uat_151", MN = "_reviewerMark_g1uat_157", BN = "_reviewerName_g1uat_167", jN = "_terminalCard_g1uat_173", PN = "_terminalCount_g1uat_182", qN = "_workflowAgents_g1uat_188", HN = "_mount_g1uat_194", R = {
  column: hN,
  head: mN,
  index: wN,
  name: _N,
  meta: fN,
  mono: vN,
  gate: bN,
  reviewersLabel: pN,
  reviewers: gN,
  reviewer: yN,
  agents: NN,
  workflowColumn: kN,
  workflowHead: $N,
  stageRow: CN,
  stageLabel: SN,
  workflowTitle: RN,
  workflowMeta: TN,
  workflowGate: xN,
  gateNote: LN,
  cardNote: AN,
  reviewerList: EN,
  reviewerRow: IN,
  reviewerMark: MN,
  reviewerName: BN,
  terminalCard: jN,
  terminalCount: PN,
  workflowAgents: qN,
  mount: HN
}, ON = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function In(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function Ir(e) {
  return `${Math.round(e * 100)}%`;
}
function FN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Vt, { cells: [
      { value: Ir(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function DN({ stage: e }) {
  return /* @__PURE__ */ n(Vt, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: In(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function zN({ stage: e, titleId: t }) {
  return /* @__PURE__ */ o("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: ON[e.kind] })
  ] });
}
function WN({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: R.meta, children: [
    /* @__PURE__ */ o("span", { className: R.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: R.mono, children: [
      ue(e.medianWait),
      " median wait"
    ] })
  ] });
}
function KN({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(FN, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(DN, { stage: e }) : null;
}
function GN({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function UN({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const l = y(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: R.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(zN, { stage: e, titleId: l }),
    /* @__PURE__ */ n(WN, { stage: e }),
    /* @__PURE__ */ n(KN, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(Qb, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(GN, { onMount: a })
  ] });
}
const VN = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function JN({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ o("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function YN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: R.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ n(JN, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: Ir(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function QN(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function XN({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: In(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: QN(e.rolledBackThisWeek) })
  ] });
}
function ZN(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function e1(e) {
  if (e.kind === "terminal") return `${In(e.closedThisWeek)} this week`;
  const t = ZN(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function t1({ stage: e, titleId: t }) {
  const a = VN[e.kind];
  return /* @__PURE__ */ o("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: R.stageRow, children: [
      /* @__PURE__ */ o("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: e1(e) })
  ] });
}
function n1(e) {
  return e === "entry" || e === "agent";
}
function a1({ stage: e, onMount: t }) {
  return t === void 0 || !n1(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Mount agent" });
}
function r1({ stage: e, agentCards: t, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ o("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(t1, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(YN, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(XN, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(a1, { stage: e, onMount: a })
  ] });
}
function l1(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function jL(e) {
  return l1(e) ? /* @__PURE__ */ n(r1, { ...e }) : /* @__PURE__ */ n(UN, { ...e });
}
const o1 = "_row_1tdra_6", i1 = "_name_1tdra_12", s1 = "_compactRow_1tdra_13", c1 = "_compactName_1tdra_13", d1 = "_cell_1tdra_30", u1 = "_chain_1tdra_45", h1 = "_owner_1tdra_51", m1 = "_mono_1tdra_57", w1 = "_compactCell_1tdra_79", _1 = "_stack_1tdra_96", f1 = "_stat_1tdra_103", v1 = "_identityLine_1tdra_110", b1 = "_identity_1tdra_110", p1 = "_ownerLine_1tdra_140", g1 = "_link_1tdra_160", y1 = "_gateMark_1tdra_166", N1 = "_emptyChain_1tdra_171", k1 = "_arrow_1tdra_177", $1 = "_muted_1tdra_182", C1 = "_define_1tdra_187", S1 = "_statValue_1tdra_194", R1 = "_policyId_1tdra_200", T1 = "_sub_1tdra_205", g = {
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
  sub: T1
};
function Mr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function x1(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function L1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Br(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function A1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Br(e.members)}`;
}
function E1(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: x(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: A1(e) })
  ] }) });
}
function jr({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function I1(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = pt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function M1({ stages: e, streamStep: t }) {
  const a = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ n(jr, { name: l.name, gate: l.gate === !0, look: I1(i, a, t), size: "tag" }),
    i === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function B1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : M1(e) });
}
function Pr(e) {
  return e === void 0 ? void 0 : !0;
}
function _a(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Pr(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function j1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function P1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function q1({ stream: e, href: t, presentation: a }) {
  const r = L1(a.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Mr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ye(e.streamStep, "chip") }, children: [
    E1(e, t),
    B1(e),
    _a(P1(e.agents), e.agents === void 0 ? void 0 : x1(e.agents), "—"),
    j1(e.policy),
    _a(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function H1(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function PL(e) {
  if (H1(e)) return q1(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: Mr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: x(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...Ut(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(jr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ o("span", { className: g.mono, children: [
      t.agents.live,
      " live · ",
      t.agents.draft,
      " draft · ",
      t.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ n("span", { className: g.owner, children: t.owner }),
      /* @__PURE__ */ n("span", { className: g.mono, children: Br(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": Pr(t.inFlightHint), children: ae(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : ue(t.p50) }) })
  ] });
}
const O1 = "_row_2u4ll_2", F1 = "_name_2u4ll_16", D1 = "_scope_2u4ll_24", Ft = {
  row: O1,
  name: F1,
  scope: D1
};
function Mn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function z1(e) {
  return e === void 0 ? `${Ft.row} ward-toolrow` : `${Ft.row} ward-toolrow ${e}`;
}
function W1(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function K1({ id: e, reasonId: t, tool: a, state: r, onChange: l }) {
  return /* @__PURE__ */ n(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: a.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? t : void 0,
      onChange: (i) => {
        r.locked || l(i.target.checked);
      }
    }
  );
}
function G1({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: Mn(e) });
}
function U1({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${Ft.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function V1(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function qL({ tool: e, onChange: t, presentation: a }) {
  const r = y(), l = y(), i = W1(e, a), s = V1(a);
  return /* @__PURE__ */ o(s, { className: z1(a == null ? void 0 : a.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(K1, { id: r, reasonId: l, tool: e, state: i, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${Ft.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(U1, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(G1, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const J1 = "_strip_4ppv9_2", Y1 = "_well_4ppv9_11", Q1 = "_head_4ppv9_18", X1 = "_name_4ppv9_24", Z1 = "_chart_4ppv9_32", ek = "_segment_4ppv9_38", tk = "_detailedChart_4ppv9_44", nk = "_rail_4ppv9_57", ak = "_section_4ppv9_63", rk = "_label_4ppv9_74", lk = "_note_4ppv9_91", V = {
  strip: J1,
  well: Y1,
  head: Q1,
  name: X1,
  chart: Z1,
  segment: ek,
  detailedChart: tk,
  rail: nk,
  section: ak,
  label: rk,
  note: lk
}, ok = "No item in flight to preview.", ik = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", sk = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", vn = [1, 2, 3, 4, 5, 6], Dt = 100;
function ck(e, t) {
  return t.has(e) ? ye(e, "id") : "var(--ward-color-line)";
}
function dk({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: vn.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: l * Dt,
      y: "0",
      width: Dt,
      height: "8",
      fill: ck(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function uk(e) {
  const t = e.slice(0, vn.length);
  for (; t.length < vn.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function hk({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${V.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, a) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(a * Dt),
        y: "0",
        width: String(Dt),
        height: "40",
        style: { fill: ye(t.streamStep, "chip") }
      },
      t.key + String(a)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((t, a) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(a))) })
  ] });
}
function qr(e) {
  return (t) => e == null ? void 0 : e(t);
}
function $t({ label: e, children: t }) {
  const a = y();
  return /* @__PURE__ */ o("section", { className: V.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: V.label, children: e }),
    t
  ] });
}
function mk({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: t ?? ok }) : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Yt, { item: { ...e, streamStep: pt(a.streamStep) }, onOpen: qr(r), feed: null }) });
}
function wk({ draft: e }) {
  const t = { "--stream": ye(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: V.head, style: t, children: [
    /* @__PURE__ */ n(We, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Ut(e.key, e.streamStep) })
  ] });
}
function _k(e) {
  const t = uk(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ o("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n($t, { label: "Board card", children: /* @__PURE__ */ n(mk, { ...e, draft: a }) }),
    /* @__PURE__ */ n($t, { label: "Streams index row", children: /* @__PURE__ */ n(wk, { draft: a }) }),
    /* @__PURE__ */ o($t, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(hk, { identities: t }),
      /* @__PURE__ */ n("p", { className: V.note, children: ik })
    ] }),
    /* @__PURE__ */ n($t, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: sk }) })
  ] });
}
function fk({ draft: e, sample: t, streams: a, onOpen: r }) {
  const l = { "--stream": ye(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: V.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: V.head, children: [
      /* @__PURE__ */ n(We, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Ut(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Yt, { item: { ...t, streamStep: e.streamStep }, onOpen: qr(r) }) }),
    /* @__PURE__ */ n(dk, { draft: e, streams: a })
  ] });
}
function HL(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(_k, { ...e }) : /* @__PURE__ */ n(fk, { ...e });
}
const vk = "_row_ixlg5_6", bk = "_headCell_ixlg5_10", pk = "_cell_ixlg5_11", gk = "_name_ixlg5_23", yk = "_consequence_ixlg5_29", Nk = "_governed_ixlg5_36", kk = "_control_ixlg5_42", $k = "_byRole_ixlg5_48", Ck = "_webControl_ixlg5_59", Sk = "_webConsequence_ixlg5_65", Rk = "_webGoverned_ixlg5_71", W = {
  row: vk,
  headCell: bk,
  cell: pk,
  name: gk,
  consequence: yk,
  governed: Nk,
  control: kk,
  byRole: $k,
  webControl: Ck,
  webConsequence: Sk,
  webGoverned: Rk
};
function Tk({
  capability: e,
  cell: t,
  onChange: a
}) {
  return t.value === "byRole" ? /* @__PURE__ */ n("span", { className: W.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: W.control, children: [
    /* @__PURE__ */ n(
      Ye,
      {
        label: `${e.name} · ${t.stream}`,
        checked: t.value !== "off",
        onChange: (r) => a(t.streamStep, r)
      }
    ),
    t.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "Pilot" })
  ] });
}
function xk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ o("tr", { className: W.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: W.headCell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: W.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: W.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(Tk, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function Lk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Ak({ name: e, cell: t, onChange: a }) {
  if (t.value === "byRole") return /* @__PURE__ */ n("span", { className: `${W.webControl} ${W.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Ye,
    {
      label: `${e} · step ${t.streamStep}`,
      checked: t.value === "on",
      disabled: a === void 0,
      onChange: (l) => a == null ? void 0 : a(t.streamStep, l ? "on" : "off")
    }
  );
  return t.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${W.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function Ek({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ o("tr", { className: W.row, children: [
    /* @__PURE__ */ o("td", { className: W.cell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${W.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(Ak, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webGoverned} ward-cellmeta`, children: Lk(e) }) })
  ] });
}
function OL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ek, { ...e }) : /* @__PURE__ */ n(xk, { ...e });
}
const Ik = "_row_vv64h_2", Mk = "_cell_vv64h_6", Bk = "_name_vv64h_25", jk = "_note_vv64h_30", Pk = "_webName_vv64h_41", qk = "_webMeta_vv64h_47", X = {
  row: Ik,
  cell: Mk,
  name: Bk,
  note: jk,
  webName: Pk,
  webMeta: qk
}, Hr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function Hk(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Ok({ component: e, onRestart: t }) {
  const a = y(), r = Hr[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: X.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: X.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { id: a, className: X.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: X.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function Fk({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: Hk(e.state) });
}
function Dk({ component: e, onRestart: t }) {
  return /* @__PURE__ */ o("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { ...Hr[e.state] }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(Fk, { component: e, onRestart: t }) })
  ] });
}
function FL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Dk, { ...e }) : /* @__PURE__ */ n(Ok, { ...e });
}
const zk = "_row_jcm5k_7", Wk = "_cell_jcm5k_11", Kk = "_next_jcm5k_28", Gk = "_headCell_jcm5k_38", Uk = "_webId_jcm5k_77", Vk = "_webPurpose_jcm5k_83", Jk = "_webMeta_jcm5k_91", Yk = "_webUrgent_jcm5k_97", K = {
  row: zk,
  cell: Wk,
  next: Kk,
  headCell: Gk,
  webId: Uk,
  webPurpose: Vk,
  webMeta: Jk,
  webUrgent: Yk
}, Qk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, Xk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Or = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Zk = Object.fromEntries(Or.map((e) => [e.key, e]));
function Ze({ column: e, children: t }) {
  const a = Zk[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: K.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: t
    }
  );
}
function DL() {
  return /* @__PURE__ */ n("tr", { children: Or.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: K.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function e$({ cred: e }) {
  const t = Qk[e.state];
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n(Ze, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Ze, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Ze, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(Ze, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Mn(e.cls) }) }),
    /* @__PURE__ */ n(Ze, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Ze, { column: "next", children: /* @__PURE__ */ n("span", { className: K.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function t$({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${K.webMeta} ${K.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function n$({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(t$, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...Xk[e.state] }) })
  ] });
}
function zL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(n$, { ...e }) : /* @__PURE__ */ n(e$, { ...e });
}
const a$ = "_card_lpp45_2", r$ = "_head_lpp45_11", l$ = "_env_lpp45_18", o$ = "_version_lpp45_25", i$ = "_meta_lpp45_32", s$ = "_webCard_lpp45_37", c$ = "_webRow_lpp45_47", d$ = "_webTitle_lpp45_55", u$ = "_webLine_lpp45_65", h$ = "_webVersion_lpp45_72", m$ = "_webMeta_lpp45_77", Q = {
  card: a$,
  head: r$,
  env: l$,
  version: o$,
  meta: i$,
  webCard: s$,
  webRow: c$,
  webTitle: d$,
  webLine: u$,
  webVersion: h$,
  webMeta: m$
}, fa = { dev: "Dev", uat: "UAT", prod: "Prod" }, Fr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function w$({ env: e }) {
  const t = Fr[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: Q.card, "aria-label": fa[e.env], children: [
    /* @__PURE__ */ o("div", { className: Q.head, children: [
      /* @__PURE__ */ n("span", { className: Q.env, children: fa[e.env] }),
      /* @__PURE__ */ n(m, { role: t.role, label: t.label })
    ] }),
    /* @__PURE__ */ n("p", { className: Q.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: Q.meta, children: [
      "deployed ",
      he(e.deployedAt)
    ] }),
    a && /* @__PURE__ */ n("p", { className: Q.meta, children: a })
  ] });
}
function _$(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function f$(e) {
  return /* @__PURE__ */ o("article", { className: `${Q.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${Q.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Q.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Fr[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Q.version} ${Q.webVersion} ${Q.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Q.meta} ${Q.webMeta} ${Q.webLine} ward-cellmeta`, children: _$(e) })
  ] });
}
function WL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(f$, { ...e }) : /* @__PURE__ */ n(w$, { ...e });
}
const v$ = "_panel_1hmja_2", b$ = "_line_1hmja_8", p$ = "_actions_1hmja_14", Ct = {
  panel: v$,
  line: b$,
  actions: p$
};
function KL(e) {
  return /* @__PURE__ */ o("div", { className: Ct.panel, children: [
    /* @__PURE__ */ n("p", { className: Ct.line, children: e.status }),
    /* @__PURE__ */ n(q, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: Ct.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: Ct.line, children: e.note ?? "" })
  ] });
}
const g$ = "_upload_13fcl_2", y$ = "_preview_13fcl_7", N$ = "_mark_13fcl_17", k$ = "_empty_13fcl_22", $$ = "_actions_13fcl_28", C$ = "_input_13fcl_33", S$ = "_reasons_13fcl_41", R$ = "_reason_13fcl_41", T$ = "_accepted_13fcl_57", le = {
  upload: g$,
  preview: y$,
  mark: N$,
  empty: k$,
  actions: $$,
  input: C$,
  reasons: S$,
  reason: R$,
  accepted: T$
}, Dr = 1.5, zr = 22, zt = "script elements or event handlers", qe = "links or external references", Le = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Dr}px at ${zr}px`], x$ = [Le[1], Le[2], zt, qe], L$ = /* @__PURE__ */ new Map([
  ["image", Le[1]],
  ["text", Le[2]],
  ["tspan", Le[2]],
  ["textPath", Le[2]],
  ["script", zt],
  ["foreignObject", zt],
  ["a", qe],
  ["use", qe],
  ["style", qe],
  ["feImage", qe],
  ["set", qe]
]), A$ = "http://www.w3.org/2000/svg", E$ = "http://www.w3.org/2000/xmlns/", I$ = /* @__PURE__ */ new Set([
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
]), M$ = /* @__PURE__ */ new Set([
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
]), Bn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, B$ = /url\s*\(|['"\\]/i;
function j$() {
  return { ok: !1, reasons: [Le[1]] };
}
function Wr(e) {
  return e.namespaceURI === A$;
}
function P$(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && Wr(t) ? t : null;
  } catch {
    return null;
  }
}
function q$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [Le[0]] : [];
}
function H$(e) {
  return L$.get(e.localName) ?? (e.localName.startsWith("animate") ? qe : void 0);
}
function O$(e) {
  return B$.test(e.replace(Bn, ""));
}
function F$(e) {
  return /^on/i.test(e.localName) ? zt : e.localName === "href" || O$(e.value) ? qe : void 0;
}
function D$(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(H$(a));
    for (const r of Array.from(a.attributes)) t.add(F$(r));
  }
  return x$.filter((a) => t.has(a));
}
function z$(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((l) => Number.isFinite(l) && l > 0), 0), r = a > 0 ? zr / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Dr;
  }) ? [Le[3]] : [];
}
function W$(e) {
  if (e.namespaceURI === E$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (M$.has(t) || t.startsWith("stroke"));
}
function K$(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && Wr(t) && I$.has(t.localName);
}
function G$(e, t) {
  K$(t) ? t.nodeType === Node.ELEMENT_NODE && Kr(t) : e.removeChild(t);
}
function Kr(e) {
  for (const t of Array.from(e.attributes)) W$(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) G$(e, t);
  return e;
}
function U$(e) {
  return Array.from(e.matchAll(Bn), (t) => t[2]).filter((t) => t !== "");
}
function V$(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function J$(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of U$(l.value)) a.has(i) || a.set(i, `${t}-${a.size}`);
  return a;
}
function Y$(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(Bn, (r, l, i) => {
      const s = t.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function Q$(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = J$(a, t);
  for (const l of a) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), Y$(l, r);
  }
  return e;
}
function GL(e) {
  const t = P$(e);
  if (t === null) return j$();
  const a = [...q$(t), ...D$(t), ...z$(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(Q$(Kr(t), V$(e))) };
}
const X$ = "Mark accepted.", Z$ = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, e0 = new Set(Aa.flatMap((e) => [ye(e, "id"), ye(e, "chip")]));
function t0(e) {
  return e !== void 0 && (Z$.test(e) || e0.has(e)) ? e : void 0;
}
function n0({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: le.preview, style: { "--mark": t0(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: le.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: le.empty }) });
}
function a0(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function r0(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function l0({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: le.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: le.result, role: "status", children: /* @__PURE__ */ n("p", { className: le.accepted, children: X$ }) }) : /* @__PURE__ */ n("div", { className: le.result, role: "status", children: /* @__PURE__ */ n("ul", { className: le.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: le.reason, children: t }, t)) }) });
}
function o0({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(l0, { result: e }) : /* @__PURE__ */ n("p", { className: `${le.result} ${a0(e, a)}`, role: "status", children: r0(e, a) });
}
function va(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function UL({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: l }) {
  const i = f(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ o("div", { className: le.upload, children: [
    /* @__PURE__ */ n(n0, { current: e }),
    /* @__PURE__ */ o("div", { className: le.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: i,
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
      /* @__PURE__ */ n(b, { ...va(l), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...va(l), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(o0, { result: s, presentation: r })
  ] });
}
const i0 = "_row_o3t6y_7", s0 = "_cell_o3t6y_11", c0 = "_head_o3t6y_28", d0 = "_name_o3t6y_34", u0 = "_pinned_o3t6y_42", h0 = "_headCell_o3t6y_49", m0 = "_webName_o3t6y_88", w0 = "_webMeta_o3t6y_95", _0 = "_webWarn_o3t6y_103", F = {
  row: i0,
  cell: s0,
  head: c0,
  name: d0,
  pinned: u0,
  headCell: h0,
  webName: m0,
  webMeta: w0,
  webWarn: _0
}, jn = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Gr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], f0 = Object.fromEntries(Gr.map((e) => [e.key, e]));
function v0(e, t) {
  return `mcp.${e}.${t}`;
}
function b0(e) {
  return Object.keys(jn).includes(e);
}
function p0(e) {
  return jn[e !== void 0 && b0(e) ? e : "unknown"];
}
function st({ column: e, children: t }) {
  const a = f0[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: F.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: t
    }
  );
}
function VL() {
  return /* @__PURE__ */ n("tr", { children: Gr.map((e) => /* @__PURE__ */ n(
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
function g0({ server: e }) {
  const t = jn[e.connection];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ o(st, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: F.head, children: [
        /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Mn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: F.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(st, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(st, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(st, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(st, { column: "tools", children: e.tools.map((a) => v0(e.name, a)).join(" · ") })
  ] });
}
function y0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function N0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function k0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${F.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: e });
}
function $0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function C0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function S0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ o("td", { className: F.cell, children: [
      /* @__PURE__ */ n("span", { className: `${F.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: y0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(m, { ...N0(e) }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(k0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(m, { ...p0(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: F.cell, children: [
      /* @__PURE__ */ n($0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(C0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function JL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(S0, { ...e }) : /* @__PURE__ */ n(g0, { ...e });
}
const R0 = "_row_1ibo7_2", T0 = "_headCell_1ibo7_14", x0 = "_cell_1ibo7_15", L0 = "_name_1ibo7_26", A0 = "_consequence_1ibo7_32", E0 = "_reason_1ibo7_38", I0 = "_value_1ibo7_44", M0 = "_webRow_1ibo7_60", B0 = "_webSetting_1ibo7_73", j0 = "_webName_1ibo7_81", P0 = "_webConsequence_1ibo7_89", q0 = "_webControl_1ibo7_95", H0 = "_webState_1ibo7_109", O0 = "_webChip_1ibo7_114", P = {
  row: R0,
  headCell: T0,
  cell: x0,
  name: L0,
  consequence: A0,
  reason: E0,
  value: I0,
  webRow: M0,
  webSetting: B0,
  webName: j0,
  webConsequence: P0,
  webControl: q0,
  webState: H0,
  webChip: O0
}, Ur = 104, Vr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function F0({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ye, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(ir, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: P.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function D0({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = y(), i = Vr[a], s = a === "locked";
  return /* @__PURE__ */ o("tr", { className: P.row, "data-inheritance": a, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: P.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(F0, { control: t, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: P.cell, style: { width: Ur }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function Jr(e, t) {
  return String(e ?? t);
}
function z0(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function W0(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? Jr(e.value, "—");
}
function K0({ control: e, name: t, locked: a, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: P.webControl, children: [
    /* @__PURE__ */ n(Ye, { label: t, labelHidden: !0, checked: i, locked: a, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: P.webState, "aria-hidden": "true", children: a || i ? "on" : "off" })
  ] });
}
function G0(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(K0, { ...e });
  const l = z0(t, a);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: P.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(ir, { options: l, value: Jr(t.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: W0(t) });
}
function U0({ setting: e, control: t, inheritance: a, reason: r, onChange: l, renderControl: i }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ o("div", { className: `${P.row} ${P.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ o("span", { className: P.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${P.name} ${P.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${P.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: P.webControl, children: i(s) }) : /* @__PURE__ */ n(G0, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${P.webChip} ward-policy-chip`, style: { width: Ur }, children: /* @__PURE__ */ n(m, { ...Vr[a], size: "tag" }) })
  ] });
}
function YL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(U0, { ...e }) : /* @__PURE__ */ n(D0, { ...e });
}
const V0 = "_label_h9m4w_7", J0 = "_name_h9m4w_15", Y0 = "_column_h9m4w_24", Q0 = "_webFrame_h9m4w_57", X0 = "_webHead_h9m4w_62", Z0 = "_webHeadLabel_h9m4w_74", eC = "_webLabel_h9m4w_117", tC = "_webColumns_h9m4w_124", nC = "_webGroup_h9m4w_130", aC = "_webPeople_h9m4w_131", rC = "_webVia_h9m4w_132", lC = "_webMeta_h9m4w_161", G = {
  label: V0,
  name: J0,
  column: Y0,
  webFrame: Q0,
  webHead: X0,
  webHeadLabel: Z0,
  webLabel: eC,
  webColumns: tC,
  webGroup: nC,
  webPeople: aC,
  webVia: rC,
  webMeta: lC
}, oC = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, ln = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function on({ column: e, children: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: G.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: t
    }
  );
}
function iC(e) {
  if (!e.matrixRole) return;
  const t = oC[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function sC({ node: e }) {
  const t = iC(e);
  return /* @__PURE__ */ o("span", { className: G.label, children: [
    /* @__PURE__ */ n("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ n(cC, { role: t, node: e }),
    /* @__PURE__ */ n(on, { column: ln[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(on, { column: ln[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(on, { column: ln[2], children: e.requestedVia ?? "" })
  ] });
}
function cC({ role: e, node: t }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function dC({ index: e, depth: t, node: a, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    wr,
    {
      index: e,
      depth: t,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(sC, { node: a }),
      children: s
    }
  );
}
function sn({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function uC({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${G.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(sn, { className: `${G.webMeta} ${G.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(sn, { className: `${G.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(sn, { className: `${G.webMeta} ${G.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function hC() {
  return /* @__PURE__ */ o("div", { className: G.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: G.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: G.webColumns, children: [
      /* @__PURE__ */ n("span", { className: G.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: G.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: G.webVia, children: "Requested via" })
    ] })
  ] });
}
function mC({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${G.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function wC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function _C({ rows: e, label: t }) {
  return /* @__PURE__ */ o("div", { className: G.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(hC, {}),
    /* @__PURE__ */ n(Kw, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      wr,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(mC, { row: a }),
        detail: /* @__PURE__ */ n(uC, { row: a }),
        expanded: wC(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function QL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(_C, { ...e }) : /* @__PURE__ */ n(dC, { ...e });
}
const fC = "_runbook_b9agc_2", vC = "_list_b9agc_7", bC = "_step_b9agc_15", pC = "_numeral_b9agc_21", gC = "_body_b9agc_28", yC = "_head_b9agc_34", NC = "_title_b9agc_40", kC = "_detail_b9agc_45", $C = "_actions_b9agc_50", CC = "_webList_b9agc_56", SC = "_webStep_b9agc_60", RC = "_webBody_b9agc_66", TC = "_webTitle_b9agc_74", xC = "_webDetail_b9agc_78", M = {
  runbook: fC,
  list: vC,
  step: bC,
  numeral: pC,
  body: gC,
  head: yC,
  title: NC,
  detail: kC,
  actions: $C,
  webList: CC,
  webStep: SC,
  webBody: RC,
  webTitle: TC,
  webDetail: xC
}, Yr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Qr(e) {
  return String(e + 1).padStart(2, "0");
}
function LC({ step: e, index: t, connection: a }) {
  const r = Yr[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: M.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: M.numeral, children: Qr(t) }),
    /* @__PURE__ */ o("span", { className: M.body, children: [
      /* @__PURE__ */ o("span", { className: M.head, children: [
        /* @__PURE__ */ n("span", { className: M.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n(Ee, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ n("span", { className: M.detail, children: e.detail })
    ] })
  ] });
}
function AC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ o("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: M.list, children: e.map((r, l) => /* @__PURE__ */ n(LC, { step: r, index: l, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: M.actions, children: t })
  ] });
}
function EC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ o("li", { className: `${M.step} ${M.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${M.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Qr(t) }),
    /* @__PURE__ */ o("span", { className: `${M.body} ${M.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${M.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${M.title} ${M.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Yr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Ee, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${M.detail} ${M.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function IC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ o("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${M.list} ${M.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(EC, { step: r, index: l, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${M.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function XL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(IC, { ...e }) : /* @__PURE__ */ n(AC, { ...e });
}
const MC = "_list_1gu6a_2", BC = "_check_1gu6a_10", jC = "_body_1gu6a_16", PC = "_text_1gu6a_23", qC = "_pending_1gu6a_32", HC = "_measured_1gu6a_37", nt = {
  list: MC,
  check: BC,
  body: jC,
  text: PC,
  pending: qC,
  measured: HC
};
function OC(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function FC({ check: e }) {
  const t = OC(e.passed);
  return /* @__PURE__ */ o("li", { className: `${nt.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Tn, { state: t.state, label: t.label }),
    /* @__PURE__ */ o("span", { className: nt.body, children: [
      /* @__PURE__ */ n("span", { className: nt.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: nt.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: nt.measured, children: e.measured })
  ] });
}
function ZL({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${nt.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(FC, { check: t }, t.text)) });
}
const DC = "_root_y6bbq_2", zC = "_list_y6bbq_10", WC = "_line_y6bbq_32", KC = "_at_y6bbq_59", GC = "_text_y6bbq_63", UC = "_foot_y6bbq_67", VC = "_idle_y6bbq_79", JC = "_caret_y6bbq_87", YC = "_jump_y6bbq_94", be = {
  root: DC,
  list: zC,
  line: WC,
  at: KC,
  text: GC,
  foot: UC,
  idle: VC,
  caret: JC,
  jump: YC
}, QC = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Pn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : QC.format(new Date(e));
}
const XC = { warn: "warning", ok: "ok" };
function ZC({ kind: e }) {
  const t = XC[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function eS({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Pn(e)}` });
}
function tS({ connection: e, idleSince: t, last: a, children: r }) {
  const l = [t, a == null ? void 0 : a.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Pn(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${be.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${be.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: be.idle, children: i }),
    /* @__PURE__ */ n(eS, { at: a == null ? void 0 : a.at }),
    r
  ] });
}
const nS = 8;
function aS(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > nS;
}
function rS({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${be.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const Xr = ke(null);
function eA({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, l] = p(!1), i = Ca(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(Xr.Provider, { value: i, children: a });
}
function lS() {
  const e = Ne(Xr), [t, a] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const oS = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function tA({ lines: e, connection: t, idleSince: a, label: r = "Live activity", fixed: l }) {
  const i = f(null), [s, c] = p(0), [d, u] = lS(), [h, w] = p(!1), _ = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), rt(() => {
    const k = i.current;
    k && !h && (k.scrollTop = k.scrollHeight);
  }, [e.length, h]);
  const N = () => {
    var H;
    const k = i.current;
    if (!k) return;
    const E = k.querySelectorAll("[data-consline-text]");
    (H = E.item(E.length - 1)) == null || H.focus(), w(!1);
  };
  return /* @__PURE__ */ o("div", { className: be.root, children: [
    /* @__PURE__ */ n("ol", { className: be.list, ref: i, "aria-live": d ? "polite" : "off", "aria-label": r, ...oS(e.length, l), onScroll: (k) => w(aS(k.currentTarget)), children: e.map((k, E) => /* @__PURE__ */ o("li", { className: `${be.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": E < s, children: [
      /* @__PURE__ */ n("span", { className: be.at, children: Pn(k.at) }),
      /* @__PURE__ */ n(ZC, { kind: k.kind }),
      /* @__PURE__ */ n("span", { className: be.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${E}`)) }),
    /* @__PURE__ */ o(tS, { connection: t, idleSince: a, last: _, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${be.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(rS, { shown: h, onJump: N })
    ] })
  ] });
}
const iS = "_row_1k8wl_2", sS = "_head_1k8wl_14", cS = "_author_1k8wl_20", dS = "_eta_1k8wl_25", uS = "_edited_1k8wl_26", hS = "_body_1k8wl_32", mS = "_reason_1k8wl_37", wS = "_actions_1k8wl_42", Se = {
  row: iS,
  head: sS,
  author: cS,
  eta: dS,
  edited: uS,
  body: hS,
  reason: mS,
  actions: wS
}, _S = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function fS(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function vS({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function bS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Se.reason, id: t, children: e })
  ] });
}
function pS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function gS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(vS, { ...e }) : /* @__PURE__ */ n(bS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function nA(e) {
  const { comment: t } = e;
  pS(e);
  const a = y(), r = `${a}-unavailable`, l = _S[t.delivery];
  return /* @__PURE__ */ o("div", { className: `${Se.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Se.head, children: [
      /* @__PURE__ */ n("span", { className: Se.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: Se.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Se.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Se.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Se.reason, id: a, children: fS(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Se.actions, children: /* @__PURE__ */ n(gS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const yS = "_root_rvhdw_2", NS = "_attach_rvhdw_11", kS = "_actions_rvhdw_17", $S = "_reply_rvhdw_23", CS = "_replyField_rvhdw_28", SS = "_send_rvhdw_54", RS = "_sendIcon_rvhdw_65", TS = "_sendsAs_rvhdw_75", Fe = {
  root: yS,
  attach: NS,
  actions: kS,
  reply: $S,
  replyField: CS,
  send: SS,
  sendIcon: RS,
  sendsAs: TS
};
function Zr({ value: e, onChange: t }) {
  const [a, r] = p("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function xS() {
  return /* @__PURE__ */ n("svg", { className: Fe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function LS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function AS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [l, i] = Zr(e), s = y(), c = () => {
    l.trim() !== "" && r(a, l);
  }, d = (u) => {
    LS(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: Fe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Fe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ n(q, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: Fe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ n(xS, {}),
        /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Fe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function aA(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(AS, { ...e }) : /* @__PURE__ */ n(ES, { ...e });
}
function ES(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = Zr(e);
  return /* @__PURE__ */ o("div", { className: Fe.root, children: [
    /* @__PURE__ */ n(q, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: Fe.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ n(
      Oa,
      {
        label: `Requeue ${l.agent} after posting`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Fe.actions, children: [
      /* @__PURE__ */ n(b, { variant: "primary", onClick: () => i(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const IS = "_list_1yhks_2", MS = "_item_1yhks_6", BS = "_body_1yhks_22", jS = "_text_1yhks_28", PS = "_evidence_1yhks_37", qS = "_consequence_1yhks_49", HS = "_note_1yhks_54", Je = {
  list: IS,
  item: MS,
  body: BS,
  text: jS,
  evidence: PS,
  consequence: qS,
  note: HS
};
function OS({ criterion: e }) {
  return /* @__PURE__ */ n(We, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function ba({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function FS(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function DS({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Je.body, children: [
    /* @__PURE__ */ n("span", { className: Je.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ n(ba, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Je.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ n(ba, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Je.consequence, children: FS(e.why) })
    ] })
  ] });
}
function zS({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Je.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(OS, { criterion: e }),
    /* @__PURE__ */ n(DS, { criterion: e })
  ] });
}
function rA({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Je.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(zS, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ n("p", { className: Je.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const WS = "_list_dwhoz_2", KS = "_rung_dwhoz_6", GS = "_name_dwhoz_18", US = "_actor_dwhoz_32", It = {
  list: WS,
  rung: KS,
  name: GS,
  actor: US
}, VS = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function JS({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = VS[e.state];
  return /* @__PURE__ */ o("li", { className: It.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: It.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${It.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function lA({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${It.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(JS, { rung: t }, t.name)) });
}
const YS = "_sheet_pw37w_2", QS = "_title_pw37w_9", XS = "_stage_pw37w_15", ZS = "_effects_pw37w_20", e2 = "_effect_pw37w_20", t2 = "_numeral_pw37w_31", n2 = "_effectText_pw37w_38", a2 = "_refusals_pw37w_43", r2 = "_reasons_pw37w_52", l2 = "_reason_pw37w_52", o2 = "_actions_pw37w_62", we = {
  sheet: YS,
  title: QS,
  stage: XS,
  effects: ZS,
  effect: e2,
  numeral: t2,
  effectText: n2,
  refusals: a2,
  reasons: r2,
  reason: l2,
  actions: o2
};
function i2({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function oA({ run: e, effects: t, refusals: a, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = y(), d = `${c}-refusal`, [u, h] = p(""), w = a.length > 0;
  return /* @__PURE__ */ n(it, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: we.sheet, children: [
    /* @__PURE__ */ o("h2", { className: we.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: we.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: we.effects, children: t.map((_, N) => /* @__PURE__ */ o("li", { className: we.effect, children: [
      /* @__PURE__ */ n("span", { className: we.numeral, children: String(N + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: we.effectText, children: _ })
    ] }, _)) }),
    /* @__PURE__ */ n(
      $m,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(q, { kind: "textarea", label: "Note for the agent", value: u, onChange: h }),
    w && /* @__PURE__ */ o("div", { className: we.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: we.reasons, children: a.map((_, N) => /* @__PURE__ */ n("li", { className: we.reason, id: N === 0 ? d : void 0, children: _.reason }, _.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: we.actions, children: [
      /* @__PURE__ */ n(i2, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const s2 = "_list_1laeg_2", c2 = "_path_1laeg_7", d2 = "_head_1laeg_21", u2 = "_label_1laeg_28", h2 = "_consequence_1laeg_35", ut = {
  list: s2,
  path: c2,
  head: d2,
  label: u2,
  consequence: h2
}, bn = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function pa(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function ga(e) {
  return e ? "primary" : "secondary";
}
function m2({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: ga(t), size: "sm", onClick: () => a(e.kind), children: bn[e.kind] }) : /* @__PURE__ */ n(b, { variant: ga(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: bn[e.kind] });
}
function w2({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: ut.path, "data-allowed": e.allowed, "data-role": pa(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: ut.head, children: [
      /* @__PURE__ */ n("span", { className: ut.label, children: e.title ?? bn[e.kind] }),
      /* @__PURE__ */ n(m, { role: pa(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: ut.consequence, children: e.consequence }),
    /* @__PURE__ */ n(m2, { path: e, primary: t, onChoose: a })
  ] });
}
function iA({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: ut.list, children: e.map((a, r) => /* @__PURE__ */ n(w2, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const _2 = "_list_1m7i0_2", f2 = "_item_1m7i0_6", v2 = "_node_1m7i0_18", b2 = "_body_1m7i0_24", p2 = "_head_1m7i0_30", g2 = "_stage_1m7i0_36", y2 = "_version_1m7i0_41", N2 = "_sentence_1m7i0_49", k2 = "_meta_1m7i0_54", Te = {
  list: _2,
  item: f2,
  node: v2,
  body: b2,
  head: p2,
  stage: g2,
  version: y2,
  sentence: N2,
  meta: k2
}, $2 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function C2({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Te.head, children: [
    /* @__PURE__ */ n("span", { className: Te.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Te.version, title: e.version, children: e.version }) : null
  ] });
}
function S2({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Te.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Te.node} ward-history-node`, children: /* @__PURE__ */ n(We, { size: 9, kind: $2[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Te.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(C2, { entry: e }),
      /* @__PURE__ */ n("span", { className: Te.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Te.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${oe(e.cost)}`
      ] })
    ] })
  ] });
}
function sA({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Te.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(S2, { entry: t }, t.stage + String(a))) });
}
const R2 = "_thread_1e70p_3", T2 = "_turn_1e70p_8", x2 = "_who_1e70p_27", L2 = "_body_1e70p_32", Mt = {
  thread: R2,
  turn: T2,
  who: x2,
  body: L2
}, el = ke(!1);
function cA({ children: e, density: t }) {
  return /* @__PURE__ */ n(el.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${Mt.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function dA({ turn: e }) {
  if (!Ne(el)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${Mt.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${Mt.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${Mt.body} ward-chat-body`, children: e.body })
  ] });
}
const A2 = "_list_yiolt_3", E2 = "_row_yiolt_7", I2 = "_label_yiolt_20", M2 = "_n_yiolt_26", B2 = "_cause_yiolt_33", wt = {
  list: A2,
  row: E2,
  label: I2,
  n: M2,
  cause: B2
};
function j2(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const P2 = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function q2({ row: e, formatNumber: t }) {
  return j2(e), /* @__PURE__ */ o("li", { className: `${wt.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(We, { size: 8, ...P2[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: wt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${wt.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(H2, { cause: e.cause })
  ] });
}
function H2({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${wt.cause} ward-healthrow-cause`, children: e }) : null;
}
function uA({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${wt.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(q2, { row: a, formatNumber: t }, a.label)) });
}
const O2 = "_root_1jxwp_2", F2 = {
  root: O2
};
function hA({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: F2.root, "data-density": l, children: [
    /* @__PURE__ */ n(Qt, { items: e, note: t, density: l }),
    /* @__PURE__ */ n(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const D2 = "_row_dhbre_3", z2 = "_key_dhbre_13", W2 = "_stack_dhbre_24", K2 = "_value_dhbre_32", G2 = "_evidence_dhbre_39", U2 = "_mark_dhbre_47", et = {
  row: D2,
  key: z2,
  stack: W2,
  value: K2,
  evidence: G2,
  mark: U2
};
function V2({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(Tn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function mA({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${et.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${et.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${et.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${et.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${et.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${et.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(V2, { state: e.state }) })
  ] });
}
const J2 = "_cell_gh2sd_2", Y2 = {
  cell: J2
}, Q2 = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function X2(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function Z2(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function eR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: X2(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function tR(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function wA({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  Z2(e, a);
  const r = tR(e);
  return /* @__PURE__ */ n(
    qm,
    {
      label: "Rejection routing",
      columns: Q2,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: Y2.cell, "data-norerun": l.noRerun ? !0 : void 0, children: eR(l, i) }),
      empty: t ?? /* @__PURE__ */ n(A_, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const nR = "_row_1f2re_2", aR = "_title_1f2re_12", rR = "_turns_1f2re_18", lR = "_waiting_1f2re_19", oR = "_resolved_1f2re_20", iR = "_activity_1f2re_21", sR = "_cost_1f2re_28", cR = "_link_1f2re_29", dR = "_tableLink_1f2re_47", uR = "_tableRecord_1f2re_48", hR = "_tableRow_1f2re_59", mR = "_tableTitle_1f2re_71", wR = "_tableResolved_1f2re_76", _R = "_tableMeta_1f2re_87", fR = "_tableCost_1f2re_94", vR = "_tableActivity_1f2re_95", bR = "_tableState_1f2re_105", z = {
  row: nR,
  title: aR,
  turns: rR,
  waiting: lR,
  resolved: oR,
  activity: iR,
  cost: sR,
  link: cR,
  tableLink: dR,
  tableRecord: uR,
  tableRow: hR,
  tableTitle: mR,
  tableResolved: wR,
  tableMeta: _R,
  tableCost: fR,
  tableActivity: vR,
  tableState: bR
}, tl = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function pR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function gR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function yR(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const NR = { duplicate: "Closed · duplicate" };
function kR({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(lt, { className: z.tableMeta, text: `waiting on ${e}` });
}
function $R({ value: e }) {
  return /* @__PURE__ */ n("td", { className: z.tableCost, children: e === void 0 ? null : oe(e) });
}
function CR({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${z.tableRecord} ward-target`, href: x(e.href), children: `→ ${e.key}` });
}
function SR({ session: e, href: t }) {
  const a = tl[e.state];
  return /* @__PURE__ */ o("tr", { className: z.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: z.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${z.tableLink} ward-target`, href: x(t), children: /* @__PURE__ */ n(lt, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: z.tableMeta, children: gR(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: z.tableResolved, children: [
      yR(e.resolved),
      /* @__PURE__ */ n(kR, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n($R, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: z.tableActivity, children: pR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: z.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: NR[e.state] ?? a.label }),
      /* @__PURE__ */ n(CR, { link: e.link })
    ] }) })
  ] });
}
function RR({ session: e }) {
  const t = tl[e.state];
  return /* @__PURE__ */ o("div", { className: z.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(lt, { className: z.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: z.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(lt, { className: z.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: z.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: z.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : oe(e.cost) }),
    /* @__PURE__ */ n("span", { className: z.activity, children: he(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: z.link, href: x(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function _A(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(SR, { session: e.session, href: e.href }) : /* @__PURE__ */ n(RR, { session: e.session });
}
const TR = "_block_1yy2v_3", xR = "_list_1yy2v_9", LR = "_line_1yy2v_14", pn = {
  block: TR,
  list: xR,
  line: LR
}, AR = { warn: "warning", ok: "ok" };
function ER({ kind: e }) {
  const t = AR[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function IR({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${pn.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(ER, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function fA({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${pn.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: pn.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(IR, { line: a }, `${r}-${a.text}`)) }) });
}
const MR = "_band_tt7hp_1", BR = "_head_tt7hp_8", jR = "_cell_tt7hp_19", PR = "_index_tt7hp_35", qR = "_title_tt7hp_42", HR = "_note_tt7hp_48", OR = "_cellTitle_tt7hp_53", FR = "_cellBody_tt7hp_58", DR = "_tag_tt7hp_64", Ce = {
  band: MR,
  head: BR,
  cell: jR,
  index: PR,
  title: qR,
  note: HR,
  cellTitle: OR,
  cellBody: FR,
  tag: DR
}, ya = 4;
function vA({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== ya)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${ya}-cell grid`);
  return /* @__PURE__ */ o("section", { className: Ce.band, "aria-label": `${e} ${t}`, children: [
    /* @__PURE__ */ o("div", { className: Ce.head, children: [
      /* @__PURE__ */ n("span", { className: Ce.index, children: e }),
      /* @__PURE__ */ n("span", { className: Ce.title, children: t }),
      /* @__PURE__ */ n("span", { className: Ce.note, children: a })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: Ce.cell, children: [
      /* @__PURE__ */ n("span", { className: Ce.cellTitle, children: l.title }),
      /* @__PURE__ */ n("span", { className: Ce.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ n("span", { className: Ce.tag, children: l.tag })
    ] }, l.title))
  ] });
}
const zR = "_tag_1yuvz_2", WR = "_link_1yuvz_14", cn = {
  tag: zR,
  link: WR
};
function nl({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: cn.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${cn.tag} ${cn.link}`, href: x(t), children: e });
}
const KR = "_eyebrow_m8swv_2", GR = "_link_m8swv_10", Na = {
  eyebrow: KR,
  link: GR
};
function Xt({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: Na.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${Na.link} ward-target`, href: x(t), children: e }) });
}
const UR = "_figure_qz9i7_2", VR = "_media_qz9i7_9", JR = "_caption_qz9i7_35", dn = {
  figure: UR,
  media: VR,
  caption: JR
};
function YR(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(T, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function QR(e) {
  return /* @__PURE__ */ o("figure", { className: dn.figure, children: [
    /* @__PURE__ */ n("div", { className: dn.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(YR, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: dn.caption, children: e.caption })
  ] });
}
function gt(e) {
  return `h${e}`;
}
function XR(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const ZR = "_prose_1fxb9_2", eT = "_anchor_1fxb9_79", al = {
  prose: ZR,
  anchor: eT
};
function ka({ children: e }) {
  return /* @__PURE__ */ n("div", { className: al.prose, children: e });
}
function bA({ level: e, children: t, id: a }) {
  const r = gt(e), l = a ?? XR(t);
  return /* @__PURE__ */ o(r, { id: l, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${al.anchor} ward-target`, href: `#${l}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const tT = "_list_176jq_2", nT = "_pair_176jq_8", aT = "_term_176jq_14", rT = "_value_176jq_19", St = {
  list: tT,
  pair: nT,
  term: aT,
  value: rT
};
function lT({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: St.list, children: e.map((t) => /* @__PURE__ */ o("div", { className: St.pair, children: [
    /* @__PURE__ */ n("dt", { className: St.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: St.value, children: t.value })
  ] }, t.term)) });
}
const oT = "_nav_sgeyg_2", iT = "_item_sgeyg_6", sT = "_link_sgeyg_13", cT = "_note_sgeyg_30", Rt = {
  nav: oT,
  item: iT,
  link: sT,
  note: cT
};
function dT({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: Rt.nav, children: /* @__PURE__ */ n(Fm, { children: t.map((a) => /* @__PURE__ */ o("li", { className: Rt.item, children: [
    /* @__PURE__ */ n("a", { className: `${Rt.link} ward-target`, href: x(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: Rt.note, children: a.note })
  ] }, a.href)) }) });
}
const uT = "_header_kelio_2", hT = "_skip_kelio_14", mT = "_brand_kelio_39", wT = "_list_kelio_46", _T = "_link_kelio_56", tt = {
  header: uT,
  skip: hT,
  brand: mT,
  list: wT,
  link: _T
};
function pA({ brand: e, links: t, current: a, homeHref: r = "/", mainId: l = "main", skipLabel: i = "Skip to content" }) {
  return /* @__PURE__ */ o("header", { className: tt.header, children: [
    /* @__PURE__ */ n("a", { className: tt.skip, href: `#${l}`, children: i }),
    /* @__PURE__ */ n("a", { className: `${tt.brand} ward-target`, href: x(r), children: e }),
    /* @__PURE__ */ n("nav", { "aria-label": "Main", className: tt.nav, children: /* @__PURE__ */ n("ul", { className: tt.list, role: "list", children: t.map((s) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${tt.link} ward-target`, href: x(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const fT = "_footer_1jb5e_2", vT = "_note_1jb5e_12", bT = "_list_1jb5e_18", pT = "_link_1jb5e_27", Tt = {
  footer: fT,
  note: vT,
  list: bT,
  link: pT
};
function gA({ note: e, links: t = [], label: a = "Footer" }) {
  return /* @__PURE__ */ o("footer", { className: Tt.footer, children: [
    /* @__PURE__ */ n("p", { className: Tt.note, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("nav", { "aria-label": a, children: /* @__PURE__ */ n("ul", { className: Tt.list, role: "list", children: t.map((r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${Tt.link} ward-target`, href: x(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const gT = "_intro_13128_2", yT = "_title_13128_9", NT = "_lead_13128_17", un = {
  intro: gT,
  title: yT,
  lead: NT
};
function kT({ title: e, eyebrow: t, eyebrowHref: a, lead: r, headingLevel: l = 1, children: i }) {
  const s = gt(l);
  return /* @__PURE__ */ o("header", { className: un.intro, children: [
    t === void 0 ? null : /* @__PURE__ */ n(Xt, { href: a, children: t }),
    /* @__PURE__ */ n(s, { className: un.title, children: e }),
    r === void 0 ? null : /* @__PURE__ */ n("p", { className: un.lead, children: r }),
    i
  ] });
}
const $T = "_section_u0k7p_2", CT = "_head_u0k7p_13", ST = "_titles_u0k7p_21", RT = "_title_u0k7p_21", TT = "_link_u0k7p_34", ht = {
  section: $T,
  head: CT,
  titles: ST,
  title: RT,
  link: TT
};
function xT({ title: e, headingId: t, eyebrow: a, link: r, headingLevel: l }) {
  const i = gt(l);
  return /* @__PURE__ */ o("div", { className: ht.head, children: [
    /* @__PURE__ */ o("div", { className: ht.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ n(Xt, { children: a }),
      /* @__PURE__ */ n(i, { className: ht.title, id: t, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ n("a", { className: `${ht.link} ward-target`, href: x(r.href), children: r.label })
  ] });
}
function yA({ title: e, children: t, id: a, eyebrow: r, link: l, headingLevel: i = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ o("section", { className: ht.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ n(xT, { title: e, headingId: d, eyebrow: r, link: l, headingLevel: i }),
    t
  ] });
}
const LT = "_split_1ycaa_2", AT = "_main_1ycaa_10", ET = "_aside_1ycaa_15", hn = {
  split: LT,
  main: AT,
  aside: ET
};
function IT({ children: e, aside: t, asideLabel: a }) {
  return /* @__PURE__ */ o("div", { className: hn.split, children: [
    /* @__PURE__ */ n("div", { className: hn.main, children: e }),
    /* @__PURE__ */ n("aside", { className: hn.aside, "aria-label": a, children: t })
  ] });
}
const MT = "_hero_ehbct_2", BT = "_text_ehbct_11", jT = "_visual_ehbct_23", PT = "_title_ehbct_28", qT = "_lead_ehbct_36", HT = "_actions_ehbct_42", OT = "_action_ehbct_42", FT = "_primary_ehbct_63", DT = "_secondary_ehbct_72", Ae = {
  hero: MT,
  text: BT,
  visual: jT,
  title: PT,
  lead: qT,
  actions: HT,
  action: OT,
  primary: FT,
  secondary: DT
};
function zT({ actions: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ n("div", { className: Ae.actions, children: e.map((t, a) => /* @__PURE__ */ n("a", { className: `${Ae.action} ${a === 0 ? Ae.primary : Ae.secondary}`, href: x(t.href), children: t.label }, t.href)) });
}
function WT({ title: e, eyebrow: t, lead: a, actions: r = [] }) {
  return /* @__PURE__ */ o("div", { className: Ae.text, children: [
    t === void 0 ? null : /* @__PURE__ */ n(Xt, { children: t }),
    /* @__PURE__ */ n("h1", { className: Ae.title, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("p", { className: Ae.lead, children: a }),
    /* @__PURE__ */ n(zT, { actions: r })
  ] });
}
function NA({ visual: e, ...t }) {
  return /* @__PURE__ */ o("div", { className: Ae.hero, "data-visual": e === void 0 ? "none" : "beside", children: [
    /* @__PURE__ */ n(WT, { ...t }),
    e === void 0 ? null : /* @__PURE__ */ n("div", { className: Ae.visual, children: e })
  ] });
}
const KT = "_chain_w2k2l_2", GT = "_step_w2k2l_12", UT = "_arrow_w2k2l_19", VT = "_box_w2k2l_24", xt = {
  chain: KT,
  step: GT,
  arrow: UT,
  box: VT
};
function kA({ steps: e, label: t, animate: a }) {
  return /* @__PURE__ */ n("ol", { className: xt.chain, "aria-label": t, "data-ward-animate": a ?? "", children: e.map((r, l) => /* @__PURE__ */ o("li", { className: xt.step, style: { "--ward-step": l }, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: xt.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n("span", { className: xt.box, children: r })
  ] }, l)) });
}
const JT = "_card_1u2gr_2", YT = "_featured_1u2gr_20", QT = "_media_1u2gr_28", XT = "_body_1u2gr_32", ZT = "_title_1u2gr_48", ex = "_link_1u2gr_60", tx = "_summary_1u2gr_78", nx = "_tags_1u2gr_84", ax = "_cta_1u2gr_90", fe = {
  card: JT,
  featured: YT,
  media: QT,
  body: XT,
  title: ZT,
  link: ex,
  summary: tx,
  tags: nx,
  cta: ax
};
function rl({ media: e, ratio: t = "16/9" }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: fe.media, children: /* @__PURE__ */ n(QR, { ratio: t, children: e }) });
}
function rx({ href: e, title: t, headingLevel: a = 3 }) {
  const r = gt(a);
  return /* @__PURE__ */ n(r, { className: fe.title, children: /* @__PURE__ */ n("a", { className: fe.link, href: x(e), children: t }) });
}
function ll({ eyebrow: e, ...t }) {
  return /* @__PURE__ */ o(T, { children: [
    e === void 0 ? null : /* @__PURE__ */ n(Xt, { children: e }),
    /* @__PURE__ */ n(rx, { ...t })
  ] });
}
function ol({ summary: e, tags: t = [] }) {
  return /* @__PURE__ */ o(T, { children: [
    e === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.summary, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("span", { className: fe.tags, children: t.map((a) => /* @__PURE__ */ n(nl, { label: a }, a)) })
  ] });
}
function $A({ media: e, ratio: t, eyebrow: a, summary: r, tags: l, ...i }) {
  return /* @__PURE__ */ o("article", { className: fe.card, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(rl, { media: e, ratio: t }),
    /* @__PURE__ */ o("div", { className: fe.body, children: [
      /* @__PURE__ */ n(ll, { eyebrow: a, ...i }),
      /* @__PURE__ */ n(ol, { summary: r, tags: l })
    ] })
  ] });
}
function CA({ media: e, ratio: t, eyebrow: a, summary: r, tags: l, cta: i, ...s }) {
  return /* @__PURE__ */ o("article", { className: `${fe.card} ${fe.featured}`, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(rl, { media: e, ratio: t }),
    /* @__PURE__ */ o("div", { className: fe.body, children: [
      /* @__PURE__ */ n(ll, { eyebrow: a, ...s }),
      /* @__PURE__ */ n(ol, { summary: r, tags: l }),
      i === void 0 ? null : /* @__PURE__ */ o("span", { className: fe.cta, "aria-hidden": "true", children: [
        i,
        " →"
      ] })
    ] })
  ] });
}
const lx = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function ox(e) {
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : `${t.getUTCDate()} ${lx[t.getUTCMonth()]} ${t.getUTCFullYear()}`;
}
const ix = "_row_1peme_2", sx = "_title_1peme_15", cx = "_link_1peme_23", dx = "_meta_1peme_40", ux = "_summary_1peme_46", ct = {
  row: ix,
  title: sx,
  link: cx,
  meta: dx,
  summary: ux
};
function SA({ href: e, title: t, date: a, meta: r, summary: l, headingLevel: i = 3 }) {
  const s = gt(i);
  return /* @__PURE__ */ o("article", { className: ct.row, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(s, { className: ct.title, children: /* @__PURE__ */ n("a", { className: ct.link, href: x(e), children: t }) }),
    /* @__PURE__ */ o("p", { className: ct.meta, children: [
      /* @__PURE__ */ n("time", { dateTime: a, children: ox(a) }),
      r === void 0 ? null : ` · ${r}`
    ] }),
    l === void 0 ? null : /* @__PURE__ */ n("p", { className: ct.summary, children: l })
  ] });
}
const hx = "_list_dd8kj_2", mx = "_item_dd8kj_16", $a = {
  list: hx,
  item: mx
};
function RA({ children: e, rules: t = !1, label: a }) {
  return /* @__PURE__ */ n("ul", { className: $a.list, role: "list", "aria-label": a, "data-rules": t, children: Ra.toArray(e).map((r, l) => /* @__PURE__ */ n("li", { className: $a.item, children: r }, l)) });
}
const wx = "_page_i3r2z_2", _x = "_aside_i3r2z_8", fx = "_tags_i3r2z_13", qn = {
  page: wx,
  aside: _x,
  tags: fx
};
function vx({ labels: e }) {
  return /* @__PURE__ */ n("span", { className: qn.tags, children: e.map((t) => /* @__PURE__ */ n(nl, { label: t }, t)) });
}
function bx(e) {
  return e[1] !== void 0 && e[1].length > 0;
}
function px(e) {
  return e.filter(bx).map(([t, a]) => ({
    term: t,
    value: typeof a == "string" ? a : /* @__PURE__ */ n(vx, { labels: a })
  }));
}
function gx({ facts: e, links: t, linksLabel: a }) {
  return /* @__PURE__ */ o("div", { className: qn.aside, children: [
    e.length === 0 ? null : /* @__PURE__ */ n(lT, { facts: e }),
    t === void 0 || t.length === 0 ? null : /* @__PURE__ */ n(dT, { label: a, links: t })
  ] });
}
function yx({ facts: e, links: t = [], linksLabel: a, asideLabel: r, children: l }) {
  return e.length === 0 && t.length === 0 ? /* @__PURE__ */ n(ka, { children: l }) : /* @__PURE__ */ n(IT, { asideLabel: r, aside: /* @__PURE__ */ n(gx, { facts: e, links: t, linksLabel: a }), children: /* @__PURE__ */ n(ka, { children: l }) });
}
function TA({ title: e, summary: t, children: a, eyebrow: r, eyebrowHref: l, role: i, period: s, focus: c, stack: d, related: u }) {
  const h = px([
    ["Role", i],
    ["Period", s],
    ["Focus", c],
    ["Stack", d]
  ]);
  return /* @__PURE__ */ o("article", { className: qn.page, children: [
    /* @__PURE__ */ n(kT, { title: e, lead: t, eyebrow: r, eyebrowHref: l }),
    /* @__PURE__ */ n(yx, { facts: h, links: u, linksLabel: "Related", asideLabel: "Case study facts", children: a })
  ] });
}
export {
  Ex as ACCENT_PRESETS,
  tL as ActionStack,
  tA as ActivityConsole,
  Ox as AdminIcon,
  Qb as AgentCard,
  Dx as AppShell,
  HL as AppearanceStrip,
  vA as Band,
  Zx as BarChart,
  mf as BoardColumn,
  bL as BoardFootnote,
  pL as BoardHeader,
  qx as BoardIcon,
  cL as BoardScroller,
  b as Btn,
  Ax as CHIP_ROLES,
  Or as CREDENTIAL_COLUMNS,
  Xx as Callout,
  OL as CapabilityRow,
  uL as CardGrid,
  TA as CaseStudy,
  dA as ChatMessage,
  Oa as Checkbox,
  m as Chip,
  lt as ClampText,
  nA as ClarificationRow,
  xL as ClauseRuleRow,
  TL as ClauseRules,
  gr as ColourLadder,
  FL as ComponentRow,
  aA as Composer,
  yL as ConfigRow,
  gL as ConfigRowHead,
  xn as ConnectionMark,
  eA as ConsoleAnnounceProvider,
  cA as Conversation,
  $m as CostMeter,
  zL as CredentialRow,
  DL as CredentialRowHead,
  rA as CriteriaList,
  Us as Crumb,
  Ix as DENSITIES,
  uA as DeliveryHealth,
  mL as DeniedState,
  jx as DisabledScope,
  AL as DryRunRail,
  A_ as EmptyState,
  WL as EnvCard,
  Xt as Eyebrow,
  lT as FactList,
  CA as FeaturedCard,
  q as Field,
  QR as Figure,
  hL as FilteredEmpty,
  kA as FlowChain,
  zx as FoldText,
  iL as FormStack,
  Qt as GateChecklist,
  lA as GateLadder,
  qm as Grid,
  IL as HandoffRuleRow,
  EL as HandoffRules,
  NA as Hero,
  Px as HomeIcon,
  NL as ItemDrawer,
  KL as KeyPanel,
  Sl as LIVE_EVENT_TYPES,
  pb as LegacyBoardColumn,
  $L as LegacyBoardHeader,
  CL as LegacyConfigRow,
  RL as LegacyItemDrawer,
  hb as LegacyOverCapNote,
  SL as LegacyPreviewRail,
  vr as LegacyWorkCard,
  dT as LinkList,
  Ee as LiveIndicator,
  wL as LoadFailed,
  vL as Loading,
  Gr as MCP_SERVER_COLUMNS,
  Tn as Mark,
  UL as MarkUpload,
  We as Marker,
  JL as McpServerRow,
  VL as McpServerRowHead,
  er as Menu,
  Qa as MenuButton,
  ML as NewStreamModal,
  B_ as OverCapNote,
  $n as OverflowRow,
  it as Overlay,
  Wx as OwedCard,
  LL as PARTIAL_STEP_REASON,
  Ur as POLICY_CHIP_WIDTH,
  rL as PageFrame,
  Qx as PageHeader,
  kT as PageIntro,
  Fm as PlainList,
  YL as PolicyRow,
  SA as PostRow,
  kL as PreviewRail,
  $A as ProjectCard,
  ka as Prose,
  bA as ProseHeading,
  ln as ROLE_MATRIX_COLUMNS,
  Er as RULE_ACTIONS,
  cr as Radio,
  hA as ReadyChecklist,
  oL as RecordSection,
  oA as RequeueSheet,
  iA as ResolveBlock,
  mA as ResolvedFieldRow,
  QL as RoleMatrixRow,
  wA as RoutingTable,
  BL as RuleRow,
  XL as RunbookSteps,
  Cl as STREAM_STEPS,
  yA as Section,
  sL as SectionBand,
  ra as SectionHeader,
  ir as SegmentedControl,
  Va as Select,
  _A as SessionRow,
  Vx as Sidebar,
  Fx as SidebarFoldButton,
  gA as SiteFooter,
  pA as SiteHeader,
  IT as SplitLayout,
  jL as StageColumn,
  dL as StageGrid,
  sA as StageHistory,
  Ey as StageListEditor,
  Kx as StageSteps,
  _L as StaleStrip,
  Vt as StatStrip,
  nL as StatTiles,
  Yx as StreamAvatar,
  PL as StreamRow,
  Hx as StudioIcon,
  lL as SubjectRail,
  Ye as Switch,
  Ux as TabLinks,
  eL as TableHead,
  Gx as Tabs,
  nl as Tag,
  RA as TextList,
  Rx as ThemeProvider,
  qL as ToolRow,
  aL as TopBar,
  Kw as Tree,
  wr as TreeRow,
  fA as TypedInputBlock,
  fi as UNSAFE_HREF,
  ZL as ValidationList,
  Cx as VisibilityProvider,
  Sx as Visible,
  Lx as WARD_VERSION,
  Yt as WorkCard,
  fL as WriteUnavailableStrip,
  pR as agoSince,
  hl as clock,
  Jy as colourStatus,
  ae as count,
  ue as duration,
  gn as elapsed,
  xx as eventSourceTransport,
  ox as formatDate,
  gt as headingTag,
  Kt as isStreamStep,
  vt as isValidatedStreamStep,
  Rp as ladderValidation,
  p0 as mcpConnectionChip,
  v0 as mcpToolName,
  oe as money,
  pe as ms,
  _r as ordered,
  xa as ratio,
  Hk as restartLabel,
  x as safeHref,
  XR as slug,
  he as stamp,
  yn as stream,
  Mx as streamChip,
  Ut as streamChipProps,
  ye as streamColour,
  xl as streamHex,
  Pt as streamInitials,
  Rl as streamVars,
  Jx as uniqueStreamInitials,
  Wa as useAnchoredPanel,
  Lt as useBorderFlash,
  Ie as useDisabledScope,
  Nl as useFocusTrap,
  Bx as useLiveFeed,
  Tx as useReturnFocus,
  Wt as useRovingTabindex,
  Nn as useTicker,
  ml as useVisible,
  j as v,
  GL as validateMark,
  pt as validatedStep,
  Aa as validatedStreamSteps
};
