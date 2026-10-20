import { jsx as n, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as Ra, useContext as Ne, createContext as ke, useState as p, useEffect as S, useCallback as te, useRef as f, useLayoutEffect as rt, useId as y, Fragment as Ta, isValidElement as hl, Children as xa } from "react";
import { createPortal as ml, flushSync as La } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const On = (e) => String(e).padStart(2, "0");
function Nn(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${On(t % 60)}s` : `${Math.floor(a / 60)}h ${On(a % 60)}m`;
}
const wl = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const t = wl.formatToParts(new Date(e)), a = (r) => {
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
function Aa(e, t) {
  return `${e} / ${t}`;
}
const _l = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function fl(e) {
  return _l.format(new Date(e));
}
const Ea = ke(/* @__PURE__ */ new Set());
function Lx({ hidden: e, children: t }) {
  const a = Ra(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Ea.Provider, { value: a, children: t });
}
function vl(e) {
  return !Ne(Ea).has(e);
}
function Ax({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(T, { children: vl(e) ? t : a });
}
const bl = "(prefers-color-scheme: dark)";
function Dn() {
  return typeof window.matchMedia == "function" ? window.matchMedia(bl) : null;
}
function pl(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = Dn()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? Dn() : null;
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
function gl(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function Ex({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const l = pl(e === "system");
  return Zt("data-theme", gl(e, l)), Zt("data-accent", t), Zt("data-density", a), /* @__PURE__ */ n(T, { children: r });
}
const yl = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Nl(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function kl(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function $l(e, t, a, r) {
  return e.shiftKey ? Nl(t, a) ? r : void 0 : document.activeElement === r || kl(t) ? a : void 0;
}
function Cl(e, t, a) {
  const r = a[0], l = a[a.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = $l(e, t, r, l);
  i && (e.preventDefault(), i.focus());
}
function Sl(e) {
  return { onKeyDown: te(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(yl));
      Cl(a, e.current, r);
    },
    [e]
  ) };
}
function Ix(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [t, e]);
}
const zn = { ArrowUp: -1, ArrowDown: 1 }, Wn = { ArrowLeft: -1, ArrowRight: 1 }, Rl = (e, t, a) => Math.min(a, Math.max(t, e));
function Tl(e, t) {
  if (t !== "horizontal" && e in zn) return zn[e];
  if (t !== "vertical" && e in Wn) return Wn[e];
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
      const w = Math.max(0, h.indexOf(t)), _ = Tl(u.key, e);
      _ !== void 0 ? (u.preventDefault(), s(h[Rl(w + _, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
const Mx = (e, t, a) => {
  const r = new EventSource(e), l = (i) => a.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, jx = "0.2.0", Bx = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], xl = [1, 2, 3, 4, 5, 6], Ia = [1, 2, 3], Ll = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], Px = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], qx = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], B = {
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
function kn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Kt(e) {
  return xl.includes(e);
}
function vt(e) {
  return Ia.includes(e);
}
function Al(e) {
  if (!Kt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function Hx(e) {
  if (!Kt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const El = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Il(e) {
  if (!Kt(e)) throw new Error("unvalidated stream step");
  return El[e];
}
function Kn(e) {
  return typeof e != "string" ? null : Ll.includes(e) ? e : null;
}
function Ml(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function jl(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function Bl(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Pl(e, t, a) {
  const r = Ml(e);
  if (r === null) return null;
  const l = Kn(a) ?? Kn(r.type);
  return l === null ? null : { ...r, type: l, id: jl(r, t), at: Bl(r) };
}
function ql(e, t) {
  return e >= pe.staleAfter ? "stale" : e >= pe.heartbeat && t === "live" ? "reconnecting" : null;
}
function Hl(e, t, a) {
  return e >= pe.heartbeat && !t && a !== null;
}
function Fx(e, t) {
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
        const Ke = Pl(L, Y, $e);
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
    const L = Date.now() - c.current, Y = ql(L, k.current);
    Y && E(Y);
    const $e = h.current;
    Hl(L, N.current, $e) && Me($e);
  }, pe.tick), () => {
    var L;
    window.clearInterval(_.current), window.clearTimeout(w.current), N.current = !1, (L = h.current) == null || L.close(), h.current = null;
  }), [re, Me, E]), { connection: a, lastEventAt: l, subscribe: Qe };
}
function $n(e, t) {
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
const Fl = { blue: "running", orange: "waiting", green: "done" };
function Ol() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Gn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function Lt(e, t) {
  const a = f(0), r = te((l) => {
    const i = l ?? t, s = e.current;
    s !== null && i !== void 0 && (Ol() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${Fl[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => Gn(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => Gn(s), pe.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (l) => r(l) : () => r(t);
}
const Dl = "_root_1otpc_2", zl = {
  root: Dl
};
function Wl(e, t, a, r, l) {
  const i = [Nn(t)];
  return e || i.push(`as of ${fl(a)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Ee({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const l = a !== "stale", i = $n(e, l), s = (t == null ? void 0 : t.at) ?? e, c = Wl(l, i, s, r, t);
  return /* @__PURE__ */ o("span", { className: `${zl.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const Kl = "_app_1bnco_1", Gl = "_side_1bnco_35", Ul = "_sideTop_1bnco_46", Vl = "_sideBody_1bnco_60", Jl = "_iconRail_1bnco_99", Yl = "_railItem_1bnco_108", Ql = "_railIcon_1bnco_129", Xl = "_railDot_1bnco_134", Zl = "_railLetter_1bnco_140", eo = "_main_1bnco_146", to = "_rail_1bnco_108", no = "_page_1bnco_168", ao = "_headerRow_1bnco_191", ro = "_sidebarToggle_1bnco_198", lo = "_headerSlot_1bnco_203", oo = "_headerAction_1bnco_208", io = "_drawerSide_1bnco_213", so = "_root_1bnco_260", co = "_topbar_1bnco_267", uo = "_mark_1bnco_278", ho = "_brand_1bnco_285", mo = "_tagline_1bnco_291", wo = "_identity_1bnco_297", _o = "_tools_1bnco_298", fo = "_nav_1bnco_308", vo = "_metadata_1bnco_315", bo = "_actor_1bnco_330", po = "_detail_1bnco_331", go = "_content_1bnco_376", yo = "_toolsPanel_1bnco_392", No = "_skip_1bnco_418", C = {
  app: Kl,
  side: Gl,
  sideTop: Ul,
  sideBody: Vl,
  iconRail: Jl,
  railItem: Yl,
  railIcon: Ql,
  railDot: Xl,
  railLetter: Zl,
  main: eo,
  rail: to,
  page: no,
  headerRow: ao,
  sidebarToggle: ro,
  headerSlot: lo,
  headerAction: oo,
  drawerSide: io,
  root: so,
  topbar: co,
  mark: uo,
  brand: ho,
  tagline: mo,
  identity: wo,
  tools: _o,
  nav: fo,
  metadata: vo,
  actor: bo,
  detail: po,
  content: go,
  toolsPanel: yo,
  skip: No
};
function ot(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const ko = "_scope_1an6i_2", $o = {
  scope: ko
}, Ma = ke(null);
function Ox({ reason: e, actions: t = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${$o.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(Ma.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Ie() {
  return Ne(Ma);
}
function Gt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : ot(e, t.reasonId);
}
const Co = "_btn_hrmlj_2", So = "_primary_hrmlj_14", Ro = "_destructive_hrmlj_25", To = "_secondary_hrmlj_35", xo = "_ghost_hrmlj_40", Lo = "_overflow_hrmlj_49", Ao = "_sm_hrmlj_56", Eo = "_disabled_hrmlj_60", Io = "_withReason_hrmlj_68", Mo = "_reason_hrmlj_74", at = {
  btn: Co,
  primary: So,
  destructive: Ro,
  secondary: To,
  ghost: xo,
  overflow: Lo,
  sm: Ao,
  disabled: Eo,
  withReason: Io,
  reason: Mo
};
function jo(e, t, a, r) {
  const l = t === "sm" ? [at.sm, "ward-btn--sm"] : [], i = a ? [at.disabled] : [];
  return [at.btn, at[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Bo(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Po(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function qo(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function Ho(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Fo(e, t, a) {
  return Ho(e.describedBy, t && a);
}
function Oo({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${at.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function Do(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Ie()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(zo, { ...e });
}
function zo(e) {
  const t = Ie();
  Po(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || t), i = qo(e, t), s = y(), c = Wo(i, t);
  return /* @__PURE__ */ o(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: jo(a, r, l, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: l,
        title: i,
        "aria-describedby": Fo(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Bo(a, e.controls),
        children: Do(e)
      }
    ),
    /* @__PURE__ */ n(Oo, { id: s, reason: i, shown: c === ja })
  ] });
}
function Wo(e, t) {
  return e && !t ? ja : Ta;
}
function ja({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${at.withReason} ward-btn-withReason`, children: e });
}
let Cn = "none";
function Ko(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (Cn = "key");
}
typeof document < "u" && (document.addEventListener("keydown", Ko, !0), document.addEventListener("pointerdown", () => {
  Cn = "pointer";
}, !0));
function Go() {
  return Cn === "key";
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
const Uo = "_scrim_1cawq_2", Vo = "_drawer_1cawq_10", Jo = "_sheet_1cawq_14", Yo = "_modal_1cawq_18", Qo = "_panel_1cawq_23", Xo = "_start_1cawq_44", Zo = "_header_1cawq_67", ei = "_title_1cawq_75", ti = "_body_1cawq_79", ni = "_close_1cawq_106", xe = {
  scrim: Uo,
  drawer: Vo,
  sheet: Jo,
  modal: Yo,
  panel: Qo,
  start: Xo,
  header: Zo,
  title: ei,
  body: ti,
  close: ni
}, ai = ke(null), jt = [], Bt = /* @__PURE__ */ new Map();
function ri(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function li(e, t) {
  let a = Bt.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, Bt.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function oi(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !ri(r) && li(e, r);
}
function ii(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (oi(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function si(e) {
  for (const t of e.claims) {
    const a = Bt.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), Bt.delete(t)));
  }
}
function ci(e, t) {
  const a = { root: e, claims: [] };
  return jt.push(a), ii(a, t), a;
}
function di(e) {
  const t = jt.indexOf(e);
  t >= 0 && jt.splice(t, 1), si(e);
}
function Un(e) {
  return e !== null && jt.at(-1) === e;
}
function ui(e, t, a) {
  const r = f(null), l = f(a);
  return l.current = a, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = ci(i, t);
    return r.current = c, () => {
      var u, h;
      const d = Un(c);
      di(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), te(() => Un(r.current), []);
}
function hi(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function mi(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function wi({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${xe.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("header", { className: `${xe.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${xe.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${xe.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function _i(e) {
  return `${xe.scrim} ${xe[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function fi(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${xe.panel} ${xe[e]} ward-overlay-panel${a}${r}`;
}
function vi(e) {
  const t = Ne(ai);
  return e ?? t ?? document.body;
}
function it(e) {
  const t = f(null), a = f(null), r = y(), l = vi(e.container), i = _t("(min-width: 768px)"), s = hi(e.kind, i), c = mi(e, r), d = Sl(a), [u] = p(Go), h = ui(t, l, e.returnFocusTo), w = te(() => {
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
  }, [w]), ml(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: _i(s),
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
            className: fi(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => h() && d.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${xe.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(wi, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const bi = /^([a-z][a-z0-9+.-]*):/i, pi = /* @__PURE__ */ new Set(["http", "https"]), gi = "#";
function yi(e) {
  var r, l;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (l = (r = bi.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function x(e) {
  const t = yi(e);
  return t === void 0 || pi.has(t) ? e : gi;
}
function Ni(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function Ba(e) {
  const t = Ni(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function ki(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => Ba(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [a, ...a.children]) l == null || l.observe(i);
    return r(), () => {
      a.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, t]);
}
function $i(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : l > e.clientWidth - a ? e.scrollLeft + l - e.clientWidth + a : null;
}
function Ci(e, t, a) {
  rt(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !l) return;
    const i = $i(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), Ba(r);
  }, [e, t, a]);
}
const Si = "_row_11g8i_2", Ri = {
  row: Si
};
function Ti(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Sn({ label: e, children: t, count: a, as: r = "div", focusable: l = !0, rowRef: i, className: s, ...c }) {
  const d = f(null), u = i ?? d;
  return ki(u, a), /* @__PURE__ */ n(r, { ref: u, className: [Ri.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Ti(l, r), ...c, children: t });
}
const xi = "_icon_1ylqy_2", Li = {
  icon: xi
};
function bt({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: Li.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function Dx() {
  return /* @__PURE__ */ n(bt, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function zx() {
  return /* @__PURE__ */ o(bt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function Wx() {
  return /* @__PURE__ */ o(bt, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function Kx() {
  return /* @__PURE__ */ n(bt, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Ai() {
  return /* @__PURE__ */ o(bt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const Pa = "ward:sidebar-collapsed", Ei = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Ii() {
  try {
    return window.localStorage.getItem(Pa) === "true";
  } catch {
    return !1;
  }
}
function Mi(e) {
  try {
    window.localStorage.setItem(Pa, String(e));
  } catch {
  }
}
function ji(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Bi(e) {
  return e instanceof Element && e.closest(Ei) !== null;
}
function Pi(e) {
  return e.key === "[" && !ji(e) && !Bi(e.target);
}
function qi(e) {
  const [t, a] = p(Ii), r = () => {
    Mi(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!Pi(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, t]), { collapsed: t, toggle: r };
}
function Hi() {
  const e = _t("(max-width: 767.98px)"), t = _t("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function Fi(e) {
  const t = e === "phone", a = y(), r = f(null), [l, i] = p(!1);
  return l && !t && i(!1), { narrow: t, open: l, drawerId: a, slotRef: r, toggle: () => i(!l), close: () => i(!1) };
}
function Oi({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ o("div", { className: C.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: C.headerSlot, children: e }),
    Oa(t) && /* @__PURE__ */ n("span", { className: C.headerAction, children: t })
  ] }) : e;
}
function Di(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function zi({ sidebar: e, label: t, drawer: a }) {
  var l;
  if (Di(a.open, a.close), !a.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(it, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (l = a.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ n("div", { className: C.drawerSide, onClick: r, children: qa(e, !1) }) });
}
function Wi(e) {
  const [t, a] = p(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function Ki(e, t) {
  const a = qi(e === "wide" && !t), r = Wi(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function Gi(e, t) {
  const a = Ki(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return Vi(e.collapsed, t);
  const r = a.collapsed, l = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: l, drawsStrip: !l && typeof e.sidebar == "function", toggle: a.toggle };
}
const Ui = (e) => e.collapsed && e.drawsStrip;
function Vi(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const Vn = (e) => e ? "" : void 0;
function qa(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ha({ fold: e }) {
  return /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(Ai, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function Ji({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: C.sideTop, children: /* @__PURE__ */ n(Ha, { fold: e }) });
}
const Fa = ke(null);
function Gx() {
  const e = Ne(Fa);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(Ha, { fold: e });
}
function Yi({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": kn(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Qi({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: C.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ o("a", { className: C.railItem, href: x(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(Yi, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function Xi({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: l }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ o("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(Ji, { fold: r, inSidebar: l && !i }),
    /* @__PURE__ */ n("div", { className: C.sideBody, hidden: i, children: qa(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(Qi, { items: a ?? [], label: t })
  ] });
}
const Oa = (e) => e != null;
function Zi(e) {
  const { sidebar: t, header: a, action: r, children: l, rail: i, iconRail: s, pageFill: c } = e, d = Oa(i), u = Hi(), h = Fi(u), w = Gi(e, u), _ = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ o("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": Vn(Ui(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(Fa.Provider, { value: w, children: /* @__PURE__ */ n(Xi, { sidebar: t, label: _, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ o("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(Oi, { header: a, action: r, label: _, drawer: h }),
      /* @__PURE__ */ n("div", { className: C.page, "data-fill": Vn(c === !0), children: l })
    ] }),
    d && /* @__PURE__ */ n("div", { className: C.rail, children: i }),
    /* @__PURE__ */ n(zi, { sidebar: t, label: _, drawer: h })
  ] });
}
function es({ destinations: e, active: t }) {
  const a = f(null);
  return Ci(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(Sn, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: x(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function mn({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function ts({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ o("span", { className: C.metadata, children: [
    /* @__PURE__ */ n(mn, { value: e, className: C.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(mn, { value: t, className: C.detail })
  ] });
}
function ns() {
  const e = _t("(max-width: 767.98px)"), t = y(), a = f(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function as({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: C.tools, children: e });
}
function rs({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: C.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function ls(e) {
  return /* @__PURE__ */ o("header", { className: C.topbar, children: [
    /* @__PURE__ */ n("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(mn, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ n(es, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: C.identity, children: /* @__PURE__ */ n(ts, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(as, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function os(e) {
  const t = y(), a = ns();
  return /* @__PURE__ */ o("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: C.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(ls, { ...e, menu: a }),
    /* @__PURE__ */ n(rs, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: C.content, children: e.children })
  ] });
}
function is(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function Ux(e) {
  return is(e) ? /* @__PURE__ */ n(Zi, { ...e }) : /* @__PURE__ */ n(os, { ...e });
}
const ss = "_root_itg9o_2", cs = "_row_itg9o_8", ds = "_box_itg9o_14", us = "_label_itg9o_21", hs = "_labelHidden_itg9o_26", ms = "_lockedNote_itg9o_36", ws = "_consequence_itg9o_44", _s = "_sample_itg9o_79", Pe = {
  root: ss,
  row: cs,
  box: ds,
  label: us,
  labelHidden: hs,
  lockedNote: ms,
  consequence: ws,
  sample: _s
};
function fs(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function vs({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${Pe.consequence} ward-check-consequence`, children: t }) : null;
}
function bs({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Pe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function ps(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function gs(e, t, a, r) {
  const l = e.consequence ? `${t}-note` : void 0, i = ps(e, a, r), s = i ? `${t}-reason` : void 0, c = Gt(ot(l, e.describedBy, s), r);
  return { noteId: l, reason: i, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? i } };
}
function ys({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ns({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Pe.sample, "aria-hidden": "true", children: e }) : null;
}
function Da(e) {
  const t = y(), a = Ie(), r = fs(e, a), l = gs(e, t, r.disabled, a);
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
        /* @__PURE__ */ n(bs, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Ns, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(ys, { id: l.reasonId, reason: l.reason }),
    /* @__PURE__ */ n(vs, { id: l.noteId, text: e.consequence })
  ] });
}
const ks = "_chip_pq6tb_2", $s = {
  chip: ks
}, Cs = {
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
function Ss(e, t) {
  if (e === "stream") return Rs(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = Cs[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function Rs(e) {
  if (!e || !vt(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = kn(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${$s.chip} ward-chip ward-chip--${e}`, style: Ss(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const Ts = "_clamp_zn74g_3", Jn = {
  clamp: Ts
};
function lt({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? Jn.clamp : `${Jn.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const xs = "_root_1btz3_2", Ls = "_body_1btz3_10", As = "_toggle_1btz3_24", en = {
  root: xs,
  body: Ls,
  toggle: As
};
function Vx({ children: e, lines: t = 3, label: a }) {
  const [r, l] = p(!1), i = y();
  return /* @__PURE__ */ o("div", { className: en.root, children: [
    /* @__PURE__ */ n("div", { id: i, className: en.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: en.toggle, "aria-expanded": r, "aria-controls": i, onClick: () => l(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const Es = "_root_1a4s8_2", Is = "_words_1a4s8_16", Ms = "_title_1a4s8_23", js = "_actions_1a4s8_27", yt = {
  root: Es,
  words: Is,
  title: Ms,
  actions: js
};
function Jx({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ o("section", { className: yt.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ o("div", { className: yt.words, children: [
      /* @__PURE__ */ n("strong", { className: yt.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: yt.actions, children: a })
  ] });
}
const Bs = "_root_8zmpu_2", Ps = "_step_8zmpu_12", qs = "_dot_8zmpu_38", Hs = "_label_8zmpu_51", dt = {
  root: Bs,
  step: Ps,
  dot: qs,
  label: Hs
}, Fs = { done: ", done", now: ", current", next: "" };
function Os({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ o("li", { className: dt.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${dt.dot} ward-running` : dt.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: dt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: Fs[e.state] })
  ] });
}
function Yx({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: dt.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(Os, { step: r, running: t }, r.label)) });
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
const Ds = "_root_13eei_3", zs = "_nav_13eei_8", Ws = "_list_13eei_16", Ks = "_item_13eei_24", Gs = "_link_13eei_44", Us = "_sep_13eei_54", Vs = "_current_13eei_58", Js = "_chips_13eei_62", Be = {
  root: Ds,
  nav: zs,
  list: Ws,
  item: Ks,
  link: Gs,
  sep: Us,
  current: Vs,
  chips: Js
};
function Ys({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: Be.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${Be.link} ward-target`, href: x(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function Qs({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: Be.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Be.nav, children: [
    /* @__PURE__ */ n("ol", { className: Be.list, children: e.map((r, l) => /* @__PURE__ */ o("li", { className: Be.item, children: [
      l > 0 ? /* @__PURE__ */ n("span", { className: Be.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(Ys, { step: r, isCurrent: a && l === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${Be.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function za(e, t, a) {
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
const Xs = 500;
function Wa(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function Ka() {
  const e = f(""), t = f(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, Xs), e.current);
}
const Nt = 4;
function Zs(e, t, a) {
  const r = Math.max(0, a - e.bottom - Nt * 2), l = Math.max(0, e.top - Nt * 2);
  return t <= r || r >= l ? { top: e.bottom + Nt, maxHeight: r } : { top: e.top - Nt - Math.min(t, l), maxHeight: l };
}
function ec(e, t, a, r) {
  const l = { start: e.left, end: e.right - t }, i = { start: l.start + t <= a, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, a - t));
}
function tc(e, t, a, r) {
  return { ...Zs(e, t.height, a.height), left: ec(e, t.width, a.width, r) };
}
function At(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function nc(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function ac(e, t, a) {
  const r = nc(t, a);
  e.style.setProperty("--ward-anchor-width", At(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const l = e.getBoundingClientRect(), i = document.documentElement;
  return { edges: r, box: l, view: { width: i.clientWidth, height: i.clientHeight } };
}
function rc(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, l) => r.scrollTop = a[l]);
}
function Yn(e, t, a, r) {
  const l = rc(e), i = ac(e, t, r), s = tc(i.edges, i.box, i.view, a);
  Object.assign(e.style, { left: At(s.left - i.box.left), top: At(s.top - i.box.top), maxHeight: At(s.maxHeight) }), l();
}
function lc(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function Ga(e, t, a = "start", r) {
  rt(() => {
    const l = t.current, i = e.current;
    if (!l || !i) return;
    const s = lc(l), c = () => Yn(l, i, a, r == null ? void 0 : r.current), d = (u) => {
      l.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), rt(() => {
    t.current && e.current && Yn(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const oc = "_root_1lgbn_2", ic = "_trigger_1lgbn_7", sc = "_value_1lgbn_47", cc = "_menu_1lgbn_65", dc = "_find_1lgbn_87", uc = "_list_1lgbn_103", hc = "_option_1lgbn_114", mc = "_check_1lgbn_133", wc = "_empty_1lgbn_144", ge = {
  root: oc,
  trigger: ic,
  value: sc,
  menu: cc,
  find: dc,
  list: uc,
  option: hc,
  check: mc,
  empty: wc
}, _c = 7;
function fc(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function Qn(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function vc(e, t) {
  const [a, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => Qn(e.options, e.value)), d = (u) => {
    var h;
    La(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: l,
    active: s,
    entries: fc(e.options, l),
    findable: e.options.length > _c,
    show: () => {
      e.disabled || (i(""), c(Qn(e.options, e.value)), r(!0));
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
function bc(e, t) {
  const a = f(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function pc(e) {
  const t = Ka();
  return (a) => {
    const r = t(a), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function Ua(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function gc(e) {
  return { ...Ua(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function Va(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = t[r.key];
    if (!l) return a(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const yc = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Nc(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      yc.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function kc({ entry: e, at: t, menu: a, ids: r, value: l }) {
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
function Rn(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function $c({ menu: e, ids: t, focusRef: a }) {
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
      "aria-activedescendant": Rn(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: Va(e, Ua(e), () => {
      })
    }
  );
}
function Cc({ props: e, menu: t, ids: a, focusRef: r, trigger: l }) {
  const i = pc(t), s = f(null);
  Ga(l, s);
  const c = (d) => {
    Wa(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: ge.menu, children: [
    t.findable && /* @__PURE__ */ n($c, { menu: t, ids: a, focusRef: r }),
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
        "aria-activedescendant": t.findable ? void 0 : Rn(t, a),
        onKeyDown: Va(t, gc(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(kc, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: ge.empty, children: "No match" })
  ] });
}
function Sc(e, t) {
  const a = e.open ? Rn(e, t) : void 0;
  S(() => {
    var r, l;
    a && ((l = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [a]);
}
function Ja(...e) {
  return e.filter(Boolean).join(" ");
}
function Rc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function Tc({ props: e, menu: t, ids: a, trigger: r, wantFocus: l }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ie()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: Ja(ge.trigger, e.triggerClassName),
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
      ...Nc(t, l),
      children: /* @__PURE__ */ n("span", { id: a.value, className: ge.value, "data-placeholder": i || void 0, children: Rc(e) })
    }
  );
}
function Ya(e) {
  const t = Ie(), a = t ? { ...e, disabled: !0, "aria-describedby": Gt(e["aria-describedby"], t) } : e, r = y(), l = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = f(null), s = f(null), c = f(null), d = vc(a, s), u = bc(d.open, c);
  return za(d.open, i, () => d.close(!1)), Sc(d, l), /* @__PURE__ */ o("div", { ref: i, className: Ja(ge.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(Tc, { props: a, menu: d, ids: l, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(Cc, { props: a, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const xc = "_field_1ensj_2", Lc = "_label_1ensj_8", Ac = "_labelHidden_1ensj_15", Ec = "_control_1ensj_25", Ic = "_mono_1ensj_45", Mc = "_area_1ensj_50", jc = "_invalid_1ensj_57", De = {
  field: xc,
  label: Lc,
  labelHidden: Ac,
  control: Ec,
  mono: Ic,
  area: Mc,
  invalid: jc
}, Bc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, Qa = (e) => `${e}-label`;
function Pc({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? Bc : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function qc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    Ya,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": Qa(t.id),
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
function Hc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
const Fc = { input: Pc, select: qc, textarea: Hc };
function Oc(e, t, a) {
  const r = Fc[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function Dc(e, t, a, r) {
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
function zc(e) {
  const t = e.mono ? [De.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [De.area] : [];
  return [De.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function Wc(e) {
  return e ? `${De.label} ${De.labelHidden} ward-field-label` : `${De.label} ward-field-label`;
}
function q(e) {
  const t = y(), a = `${t}-msg`, r = Dc(e, t, a, Ie()), l = zc(e);
  return /* @__PURE__ */ o("div", { className: `${De.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: Qa(t), className: Wc(e.labelHidden), htmlFor: t, children: e.label }),
    Oc(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${De.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Kc = "_root_sjvm0_2", Gc = "_trigger_sjvm0_9", Uc = "_ghost_sjvm0_27", Vc = "_panel_sjvm0_46", Jc = "_edged_sjvm0_67", Yc = "_menu_sjvm0_73", Qc = "_group_sjvm0_78", Xc = "_heading_sjvm0_83", Zc = "_item_sjvm0_89", ed = "_description_sjvm0_105", td = "_large_sjvm0_109", nd = "_touch_sjvm0_113", ad = "_icon_sjvm0_117", rd = "_label_sjvm0_125", ld = "_text_sjvm0_130", od = "_trailing_sjvm0_138", id = "_check_sjvm0_144", sd = "_separator_sjvm0_183", cd = "_footer_sjvm0_189", dd = "_find_sjvm0_196", ud = "_findGlyph_sjvm0_208", hd = "_findInput_sjvm0_214", md = "_empty_sjvm0_230", A = {
  root: Kc,
  trigger: Gc,
  ghost: Uc,
  panel: Vc,
  edged: Jc,
  menu: Yc,
  group: Qc,
  heading: Xc,
  item: Zc,
  description: ed,
  large: td,
  touch: nd,
  icon: ad,
  label: rd,
  text: ld,
  trailing: od,
  check: id,
  separator: sd,
  footer: cd,
  find: dd,
  findGlyph: ud,
  findInput: hd,
  empty: md
}, Xa = ke(null);
function wd(e, t) {
  const [a, r] = p({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (l) => r((i) => ({ open: !0, start: l, request: i.request + 1 })),
    close: (l) => {
      var i;
      La(() => r((s) => ({ ...s, open: !1 }))), l && ((i = t.current) == null || i.focus());
    }
  };
}
const _d = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function fd(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = _d.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function Tn(...e) {
  return e.filter(Boolean).join(" ");
}
function vd(e, t = {}, a = "field") {
  const { ref: r, className: l, ...i } = t;
  return { ...i, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: Tn(A.trigger, a === "ghost" ? A.ghost : void 0, l) };
}
function Za(e) {
  const t = y(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = f(null), l = f(null), i = wd(e.defaultOpen === !0, l);
  return za(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: Tn(A.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...vd(l, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...fd(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(Xa.Provider, { value: { ...a, popup: i, button: l }, children: e.children })
  ] });
}
function bd(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function pd(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const gd = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function yd(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function Nd(e, t) {
  return e === "separator" ? e : "items" in e ? yd(e, t) : t(e) ? e : null;
}
function kd(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function $d(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (l) => l.label.toLowerCase().includes(a);
  return kd(e.map((l) => Nd(l, r)).filter((l) => l !== null));
}
const er = (e, t) => (e % t + t) % t;
function He(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const l = er(t + a * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const Cd = (e) => e.split("").every((t) => t === e[0]);
function Sd(e, t, a) {
  const r = Cd(a), l = r ? a[0] : a, i = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = er(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function Rd(e) {
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
function Td(e, t) {
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
function xd(e, t, a) {
  const r = Ka(), l = Td(e, t), i = (s) => {
    if (Wa(s)) {
      if (!a) return e.focus(Sd(e.items, e.current(), r(s.key)));
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
function Ld(e) {
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
function Ad(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? He(e, -1, 1) : t;
}
function Ed(e, t) {
  const { start: a, request: r } = t, l = f(e);
  l.current = e, S(() => {
    const { items: i, focus: s } = l.current;
    a && s(a === "first" ? Ad(i) : He(i, i.length, -1));
  }, [a, r]);
}
function Id({ row: e, nav: t, popup: a }) {
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
const Md = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function jd(e, t) {
  return Md(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function Bd(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: A.label, children: e.label });
  return e.description ? /* @__PURE__ */ o("span", { className: A.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: A.description, children: e.description })
  ] }) : a;
}
function Pd() {
  return /* @__PURE__ */ n("svg", { className: A.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Xn(e, t) {
  return /* @__PURE__ */ o(T, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: A.icon, "aria-hidden": "true", children: e.icon }) : null,
    Bd(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: A.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(Pd, {}) : null
  ] });
}
function tr(e) {
  const { item: t, at: a } = e.row, r = y(), l = {
    ref: (i) => {
      e.nav.refs.current[a] = i;
    },
    role: "menuitem",
    tabIndex: -1,
    className: A.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...jd(t, r),
    ...Id(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: x(t.href), ...l, children: Xn(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...l, children: Xn(t, r) });
}
function qd({ heading: e, rows: t, nav: a, popup: r }) {
  const l = y();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: A.group, children: [
    /* @__PURE__ */ n("div", { id: l, className: A.heading, children: e }),
    t.map((i) => /* @__PURE__ */ n(tr, { row: i, nav: a, popup: r }, i.at))
  ] });
}
function Hd({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: A.separator }) : e.kind === "group" ? /* @__PURE__ */ n(qd, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(tr, { row: e.row, nav: t, popup: a });
}
function Fd() {
  const e = Ne(Xa);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Od() {
  return /* @__PURE__ */ o("svg", { className: A.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function Dd(e, t) {
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
function zd({ find: e, query: t, setQuery: a, input: r, nav: l, popup: i, menuId: s }) {
  const c = Dd(l, i), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ o("div", { className: A.find, children: [
    /* @__PURE__ */ n(Od, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: A.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function Wd(e, t) {
  const [a, r] = p(""), l = f(null), i = t !== void 0 && gd(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = l.current) == null || d.focus();
  };
  return i ? { find: t, query: a, setQuery: r, input: l, toFind: s, entries: $d(e, a) } : { query: a, setQuery: r, input: l, entries: e };
}
const Kd = { regular: void 0, large: A.large, touch: A.touch }, Gd = (e, t) => Tn(A.panel, e ? A.edged : void 0, Kd[t]);
function Ud({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: A.empty, children: e.empty ?? "No matches" });
}
function nr({ entries: e, footer: t, align: a = "start", find: r, edges: l, size: i = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = Fd(), h = f(null);
  Ga(u, h, a, l);
  const w = Wd(e, r), _ = bd(w.entries), N = Rd(_.flatMap(pd).map((H) => H.item)), k = xd(N, s, w.toFind), E = Ld(s);
  return Ed(N, s), /* @__PURE__ */ o("div", { ref: h, className: Gd(l, i), ...E, children: [
    w.find && /* @__PURE__ */ n(zd, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: A.menu, ...k, children: _.map((H, me) => /* @__PURE__ */ n(Hd, { block: H, nav: N, popup: s }, me)) }),
    /* @__PURE__ */ n(Ud, { find: w.find, count: N.items.length }),
    t && /* @__PURE__ */ n("p", { className: A.footer, children: t })
  ] });
}
function Vd(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function ar(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !Vd(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const Jd = (e, t) => e.reduce((a, r) => a + r + t, -t);
function Yd({ room: e, widths: t, more: a, gap: r }, l) {
  const i = t.map((d, u) => u);
  if (Jd(t, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([l]);
  let c = t[l] + r + a;
  for (const d of i)
    if (d !== l) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const tn = (e) => Number.parseFloat(e) || 0, Zn = (e) => e.getBoundingClientRect().width;
function Qd(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - tn(a.paddingInlineStart) - tn(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), Zn),
    more: r ? Zn(r) : 0,
    gap: tn(a.columnGap)
  };
}
function Xd(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const Zd = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function rr(e, t, a, r = ':scope > [role="tab"]') {
  const [l, i] = p(null);
  return rt(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = Qd(s, r);
      i((u) => Zd(u, d) ? u : d);
    };
    return c(), Xd(s, c);
  }, [e, a, r]), l && Yd(l, t);
}
const eu = "_strip_1zvzj_2", tu = "_fits_1zvzj_19", nu = "_probe_1zvzj_27", au = "_moreRoot_1zvzj_36", ru = "_more_1zvzj_36", lu = "_tab_1zvzj_55", ou = "_count_1zvzj_91", iu = "_badge_1zvzj_97", J = {
  strip: eu,
  fits: tu,
  probe: nu,
  moreRoot: au,
  more: ru,
  tab: lu,
  count: ou,
  badge: iu
}, lr = "More";
function su(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const ea = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, xn = (e) => e.badge === void 0 ? ea(e) : `${ea(e)}, ${e.badge}`;
function or(e) {
  return `${J.strip} ward-tabs ward-tabs--${e}`;
}
const cu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function du({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ o(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${J.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : xn(e),
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
function uu(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function hu({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(Za, { label: lr, className: J.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: J.more }, children: /* @__PURE__ */ n(nr, { align: "end", entries: e.map((r) => ({ label: xn(r), onSelect: () => a(r.id) })) }) });
}
function mu(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : cu;
}
function Qx({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: l }) {
  const i = Wt({ orientation: "horizontal" }), s = su(e, t);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = f(null);
  ar(c, l);
  const d = rr(c, s, e.map(xn).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${or(l)} ${J.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(du, { tab: h, active: t, place: mu(i, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${A.trigger} ${J.more} ${J.probe}`, children: lr }),
    u.length > 0 && /* @__PURE__ */ n(hu, { tabs: u, trigger: i.itemProps(e.length), onPick: uu(c, a) })
  ] });
}
const ta = 7, ir = "More", wu = ":scope > a", sr = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, _u = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function fu(e, t) {
  return !e || e.includes(t) ? {} : _u;
}
function vu({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ o("a", { href: e.href, className: `${J.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: J.count, children: `· ${e.count}` })
    ] })
  ] });
}
function bu({ links: e }) {
  return /* @__PURE__ */ n(Za, { label: ir, className: J.moreRoot, trigger: { className: J.more }, children: /* @__PURE__ */ n(nr, { align: "end", entries: e.map((t) => ({ label: sr(t), href: t.href })) }) });
}
function Xx({ links: e, active: t, label: a, level: r }) {
  if (e.length > ta) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ta} — the set is fixed`);
  const l = f(null);
  ar(l, r);
  const i = Math.max(0, e.findIndex((d) => d.id === t)), s = rr(l, i, e.map(sr).join(`
`), wu), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ o("nav", { ref: l, className: `${or(r)} ${J.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(vu, { link: d, current: d.id === t, place: fu(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${A.trigger} ${J.more} ${J.probe}`, children: ir }),
    c.length > 0 && /* @__PURE__ */ n(bu, { links: c })
  ] });
}
const pu = "_root_v56ff_3", gu = "_segment_v56ff_9", na = {
  root: pu,
  segment: gu
};
function cr({ options: e, value: t, onChange: a, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Wt({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${na.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: na.segment,
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
const yu = "_sidebar_s9o1j_3", Nu = "_brand_s9o1j_9", ku = "_mark_s9o1j_17", $u = "_word_s9o1j_24", Cu = "_nav_s9o1j_30", Su = "_navItem_s9o1j_39", Ru = "_footLink_s9o1j_49", Tu = "_group_s9o1j_58", xu = "_groupName_s9o1j_65", Lu = "_agents_s9o1j_81", Au = "_agent_s9o1j_81", Eu = "_root_s9o1j_96", Iu = "_agentTop_s9o1j_105", Mu = "_dot_s9o1j_112", ju = "_agentName_s9o1j_124", Bu = "_agentMeta_s9o1j_138", Pu = "_foot_s9o1j_49", qu = "_footName_s9o1j_150", Hu = "_footLinks_s9o1j_157", Fu = "_linkBrand_s9o1j_184", Ou = "_label_s9o1j_205", Du = "_note_s9o1j_210", zu = "_footer_s9o1j_226", I = {
  sidebar: yu,
  brand: Nu,
  mark: ku,
  word: $u,
  nav: Cu,
  navItem: Su,
  new: "_new_s9o1j_48",
  footLink: Ru,
  group: Tu,
  groupName: xu,
  agents: Lu,
  agent: Au,
  root: Eu,
  agentTop: Iu,
  dot: Mu,
  agentName: ju,
  agentMeta: Bu,
  foot: Pu,
  footName: qu,
  footLinks: Hu,
  linkBrand: Fu,
  label: Ou,
  note: Du,
  footer: zu
};
function Wu({ agent: e }) {
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
              style: { "--dot": kn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: I.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: I.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Ku({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: I.foot, children: [
    /* @__PURE__ */ n("span", { className: I.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: I.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${I.footLink} ward-target`, href: x(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function Gu({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: l, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: I.agents, children: r.map((s) => /* @__PURE__ */ n(Wu, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(Ku, { shared: i })
  ] });
}
function Uu(e) {
  return e.destinations ?? e.items ?? [];
}
function Vu({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.linkBrand, children: e });
}
function Ju({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.footer, children: e });
}
function Yu({ link: e, active: t }) {
  return /* @__PURE__ */ o("a", { href: x(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: I.note, children: e.note })
  ] });
}
function Qu(e) {
  return /* @__PURE__ */ o("aside", { className: `${I.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Vu, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Uu(e).map((t) => /* @__PURE__ */ n(Yu, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(Ju, { children: e.children })
  ] });
}
function Xu(e) {
  return "agents" in e;
}
function Zx(e) {
  return Xu(e) ? /* @__PURE__ */ n(Gu, { ...e }) : /* @__PURE__ */ n(Qu, { ...e });
}
const Zu = "_mark_wlgi8_3", eh = {
  mark: Zu
}, th = { met: "✓", unmet: "", failed: "✕" };
function Ln({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: eh.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: th[e]
    }
  );
}
const nh = "_avatar_1t33a_3", ah = {
  avatar: nh
};
function Pt(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function rh(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [Pt(e), ...[...t.slice(1)].map((r) => a + r)];
}
function lh(e, t) {
  const a = rh(e).find((l) => !t.has(l));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(Pt(e).charAt(0) + String(r)); ) r += 1;
  return Pt(e).charAt(0) + String(r);
}
function eL(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const l = lh(r, t);
    t.add(l), a.set(r, l);
  }
  return a;
}
function oh(e) {
  return e != null && vt(e) ? Al(e) : void 0;
}
function tL({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: ah.avatar, "data-size": a, "aria-hidden": "true", style: oh(t), children: r ?? Pt(e) });
}
const ih = "_marker_br9fi_2", sh = {
  marker: ih
}, ch = {
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
}, dh = { running: " ward-running" };
function We({ size: e, kind: t, label: a }) {
  const r = { "--marker": ch[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${sh.marker} ward-marker ward-marker--${t}${dh[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const uh = "_root_ti0pq_2", hh = "_chip_ti0pq_11", mh = "_noCase_ti0pq_23", kt = {
  root: uh,
  chip: hh,
  noCase: mh
};
function wh(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function An({ connection: e, since: t, lastEventAt: a }) {
  const r = wh(t, a), l = $n(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${kt.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(We, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${kt.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: kt.noCase, children: Nn(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${kt.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    he(r)
  ] });
}
const _h = "_root_yylks_2", fh = "_context_yylks_13", vh = "_row_yylks_1", bh = "_heading_yylks_27", ph = "_headingWrap_yylks_35", gh = "_meta_yylks_41", yh = "_chips_yylks_49", Nh = "_title_yylks_56", kh = "_consequence_yylks_66", $h = "_actionsWrap_yylks_73", Ch = "_actions_yylks_73", Sh = "_action_yylks_73", Rh = "_overflowPanel_yylks_102", Th = "_measureClip_yylks_113", xh = "_measure_yylks_113", U = {
  root: _h,
  context: fh,
  row: vh,
  heading: bh,
  headingWrap: ph,
  meta: gh,
  chips: yh,
  title: Nh,
  consequence: kh,
  actionsWrap: $h,
  actions: Ch,
  action: Sh,
  overflowPanel: Rh,
  measureClip: Th,
  measure: xh
};
function Lh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(lt, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function Ah({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function Eh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function Ih({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ o("div", { className: U.meta, children: [
    /* @__PURE__ */ n(Ah, { chips: e }),
    /* @__PURE__ */ n(Eh, { consequence: t, consequenceHint: a })
  ] });
}
function Mh({ title: e, chips: t, consequence: a, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: U.heading, children: [
    /* @__PURE__ */ n(Lh, { title: e, density: l }),
    /* @__PURE__ */ n(Ih, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function wn({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function aa({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function jh({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: l }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(aa, { disclosure: l }) : t ? [/* @__PURE__ */ n(aa, { disclosure: l }, "more"), /* @__PURE__ */ n(wn, { actions: e }, "actions")] : /* @__PURE__ */ n(wn, { actions: e });
}
function Bh(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function Ph({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(wn, { actions: e }) });
}
function qh(e, t) {
  const a = y(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: a, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const Hh = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function Fh(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && Hh(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function Oh({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(Qs, { path: e.path, current: e.current }) });
}
function Dh(...e) {
  return e.some((t) => t === null);
}
function zh(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Wh(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + zh(e);
}
function Kh(e, t, a, r, l) {
  if (l === 0 || Dh(t, a, r)) return !1;
  const [i, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - Wh(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Gh(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Uh(e) {
  return hl(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Vh(e, t) {
  return t.length === 0 && e.length === 1 && Uh(e[0]);
}
function Jh(e, t) {
  const a = f(null), r = f(null), l = f(null), i = f(null), [s, c] = p(!1);
  return S(() => {
    const d = a.current;
    if (!Gh(d)) return;
    const u = () => c(Kh(d, r.current, l.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !t };
}
function Yh({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ o("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function Qh({ connection: e }) {
  return e ? /* @__PURE__ */ n(An, { connection: e.connection, since: e.since }) : null;
}
function nL({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: l, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: _, actionsRef: N, measureRef: k, collapsed: E } = Jh(s, Vh(s, c)), H = c.length > 0, { disclosure: me, close: re } = qh(E || H, N), Me = Bh(c, s, E, u);
  return /* @__PURE__ */ o("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(Oh, { crumb: Fh(e, r, t) }),
    /* @__PURE__ */ o("div", { className: U.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: _, className: U.headingWrap, children: /* @__PURE__ */ n(Mh, { title: r, chips: a, consequence: l, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ o("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(Qh, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ n(jh, { actions: s, hasMore: H, collapsed: E, onOverflow: u, disclosure: me }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Ph, { actions: Me, disclosure: me, onEscape: re }),
    /* @__PURE__ */ n(Yh, { actions: s, hasMore: H, measureRef: k })
  ] });
}
const Xh = "_root_td96x_2", Zh = "_body_td96x_16", ra = {
  root: Xh,
  body: Zh
};
function aL({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${ra.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: ra.body, children: a }) });
}
const em = "_root_bf1pc_2", tm = "_table_bf1pc_9", nm = "_caption_bf1pc_14", am = "_series_bf1pc_23", rm = "_category_bf1pc_31", lm = "_cell_bf1pc_39", om = "_track_bf1pc_45", im = "_lane_bf1pc_52", sm = "_bar_bf1pc_56", cm = "_value_bf1pc_63", dm = "_swatch_bf1pc_70", um = "_empty_bf1pc_78", Z = {
  root: em,
  table: tm,
  caption: nm,
  series: am,
  category: rm,
  cell: lm,
  track: om,
  lane: im,
  bar: sm,
  value: cm,
  swatch: dm,
  empty: um
}, hm = "—", la = 6;
function mm(e, t) {
  if (t.length < 1 || t.length > la)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${la}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function wm(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function dr(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function _m(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function fm({ value: e, top: t, step: a, format: r, missing: l }) {
  const i = _m(e, t), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ o("span", { className: Z.track, children: [
    /* @__PURE__ */ n("span", { className: Z.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${Z.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Z.value, children: e === null ? l : r(e) })
  ] }) });
}
function vm({ series: e }) {
  return /* @__PURE__ */ n(T, { children: e.map((t, a) => /* @__PURE__ */ o("th", { scope: "col", className: Z.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Z.swatch, "data-step": dr(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function bm({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${Z.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Z.empty, children: t })
  ] });
}
function pm({ title: e, categories: t, series: a, top: r, format: l = ae, categoryHead: i = "Category", missing: s = hm }) {
  return /* @__PURE__ */ n("div", { className: `${Z.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: Z.table, children: [
    /* @__PURE__ */ n("caption", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Z.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(vm, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Z.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(fm, { value: u.values[d], top: r, step: dr(h, a.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function rL(e) {
  mm(e.categories, e.series);
  const t = wm(e.series);
  return t === 0 ? /* @__PURE__ */ n(bm, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(pm, { ...e, top: t });
}
const gm = "_root_1bfqw_2", ym = "_figure_1bfqw_7", Nm = "_of_1bfqw_13", km = "_bar_1bfqw_18", $m = "_rows_1bfqw_38", Cm = "_row_1bfqw_38", Sm = "_label_1bfqw_49", Rm = "_amount_1bfqw_54", je = {
  root: gm,
  figure: ym,
  of: Nm,
  bar: km,
  rows: $m,
  row: Cm,
  label: Sm,
  amount: Rm
};
function Tm({ spent: e, ceiling: t, breakdown: a }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${je.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${je.figure} ward-stat-value`, children: [
      oe(e),
      " ",
      /* @__PURE__ */ o("span", { className: je.of, children: [
        "of ",
        oe(t)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${je.bar} ward-costbar`,
        min: 0,
        max: t,
        value: e,
        "aria-valuetext": `${oe(e)} of ${oe(t)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    a && /* @__PURE__ */ n("ul", { className: je.rows, children: a.map((l) => /* @__PURE__ */ o("li", { className: `${je.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: je.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: je.amount, children: oe(l.amount) })
    ] }, l.label)) })
  ] });
}
const xm = "_frame_f7bxz_2", Lm = "_table_f7bxz_6", Am = "_th_f7bxz_12", Em = "_td_f7bxz_13", Im = "_sort_f7bxz_53", Mm = "_row_f7bxz_65", jm = "_empty_f7bxz_73", Fe = {
  frame: xm,
  table: Lm,
  th: Am,
  td: Em,
  sort: Im,
  row: Mm,
  empty: jm
}, Bm = { asc: "ascending", desc: "descending" };
function Pm(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return Bm[t.direction];
}
function qm(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: Fe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function Hm(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Fm({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Fe.th,
      style: Hm(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Pm(e, t),
      children: qm(e, a)
    }
  );
}
function Om({ row: e, props: t }) {
  const a = t.rowId(e), r = (t.lockedIds ?? []).includes(a);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: Fe.row,
      "data-selected": a === t.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: t.columns.map((l) => /* @__PURE__ */ n(
        "td",
        {
          className: Fe.td,
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
function Dm({
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
  return a.length === 0 ? /* @__PURE__ */ n("div", { className: Fe.empty, children: u }) : /* @__PURE__ */ n("div", { className: Fe.frame, "data-narrow": h, children: /* @__PURE__ */ o("table", { className: Fe.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Fe.head, children: t.map((w) => /* @__PURE__ */ n(Fm, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(Om, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const zm = "_list_v0s52_2", Wm = {
  list: zm
};
function Km({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: Wm.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const Gm = "_label_1u62a_2", Um = {
  label: Gm
};
function lL({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: Um.label, children: t.header }) }, t.key)) }) });
}
const Vm = "_stack_bp6a0_2", Jm = {
  stack: Vm
};
function oL({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Jm.stack, "data-ward-action-stack": "", children: e });
}
const Ym = "_set_1z0sq_2", Qm = "_legend_1z0sq_7", Xm = "_row_1z0sq_15", Zm = "_control_1z0sq_20", ew = "_input_1z0sq_26", tw = "_label_1z0sq_31", nw = "_consequence_1z0sq_36", Ge = {
  set: Ym,
  legend: Qm,
  row: Xm,
  control: Zm,
  input: ew,
  label: tw,
  consequence: nw
};
function ur({ legend: e, options: t, value: a, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
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
const aw = "_root_11gpw_2", rw = "_head_11gpw_10", lw = "_note_11gpw_29", ow = "_index_11gpw_34", iw = "_dot_11gpw_38", sw = "_counter_11gpw_49", cw = "_trailing_11gpw_57", Ue = {
  root: aw,
  head: rw,
  note: lw,
  index: ow,
  dot: iw,
  counter: sw,
  trailing: cw
};
function dw({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("span", { className: `${Ue.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ue.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function uw({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ue.counter, "aria-hidden": "true", children: e }) : null;
}
function oa({ title: e, index: t, note: a, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Ue.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Ue.head, children: [
      /* @__PURE__ */ n(dw, { index: t }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ue.note, children: a }),
    /* @__PURE__ */ n(uw, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ue.trailing, children: i })
  ] });
}
const hw = "_strip_c3x3u_2", mw = "_cell_c3x3u_7", ww = "_value_c3x3u_12", _w = "_link_c3x3u_29", fw = "_label_c3x3u_49", vw = "_tiles_c3x3u_101", ze = {
  strip: hw,
  cell: mw,
  value: ww,
  link: _w,
  label: fw,
  tiles: vw
};
function hr(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const mr = (e) => `${ze.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function bw({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: ze.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: mr(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${ze.label} ward-stat-label`, children: e.label })
  ] });
}
function pw({ cell: e, href: t }) {
  return /* @__PURE__ */ o("div", { className: ze.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: mr(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${ze.link} ward-stat-link`, href: x(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${ze.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const wr = (e) => e.href === void 0 ? /* @__PURE__ */ n(bw, { cell: e }, e.label) : /* @__PURE__ */ n(pw, { cell: e, href: e.href }, e.label);
function Vt({ cells: e, divided: t = !1 }) {
  return hr("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${ze.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(wr) });
}
const ia = 6;
function iL({ cells: e }) {
  hr("StatTiles", e, [1, 2 * ia]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, ia) };
  return /* @__PURE__ */ n("dl", { className: `${ze.tiles} ward-stattiles`, style: t, children: e.map(wr) });
}
const gw = "_root_1eb1u_2", yw = "_track_1eb1u_8", Nw = "_thumb_1eb1u_46", kw = "_labelHidden_1eb1u_64", $w = "_label_1eb1u_64", Cw = "_lockedNote_1eb1u_84", Ve = {
  root: gw,
  track: yw,
  thumb: Nw,
  labelHidden: kw,
  label: $w,
  lockedNote: Cw
};
function Sw(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function Rw(e) {
  return e ? `${Ve.label} ${Ve.labelHidden}` : Ve.label;
}
function Tw(e, t, a) {
  return e && !t && a ? a : void 0;
}
function xw(e, t, a, r) {
  return { "aria-describedby": Gt(ot(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function Lw({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ye({ label: e, checked: t, onChange: a, disabled: r, locked: l, describedBy: i, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, w = Ie(), { on: _, off: N } = Sw(t, r, l, w !== null), k = Tw(N, w !== null, c);
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
        ...xw(h, i, w, k),
        className: `${Ve.track} ward-switch`,
        "data-on": _,
        "data-locked": l ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!_)),
        children: /* @__PURE__ */ n("span", { className: Ve.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: d, htmlFor: u, className: Rw(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Ve.lockedNote, children: "always on" })
    ] }),
    /* @__PURE__ */ n(Lw, { id: h, reason: k })
  ] });
}
const Aw = "_bar_1vp69_2", Ew = "_skip_1vp69_11", Iw = "_mark_1vp69_22", Mw = "_nav_1vp69_30", jw = "_list_1vp69_34", Bw = "_select_1vp69_41", Pw = "_selectTrigger_1vp69_45", qw = "_dest_1vp69_52", Hw = "_actor_1vp69_71", Fw = "_actorMark_1vp69_84", Ow = "_actorLabel_1vp69_89", Dw = "_tagline_1vp69_108", se = {
  bar: Aw,
  skip: Ew,
  mark: Iw,
  nav: Mw,
  list: jw,
  select: Bw,
  selectTrigger: Pw,
  dest: qw,
  actor: Hw,
  actorMark: Fw,
  actorLabel: Ow,
  tagline: Dw
};
function zw(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function Ww(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function sL({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = Ww(r);
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
        Ya,
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
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: zw(c) })
    ] })
  ] });
}
const Kw = "_tree_zzoob_2", Gw = "_item_zzoob_6", Uw = "_row_zzoob_10", Vw = "_button_zzoob_22", qt = {
  tree: Kw,
  item: Gw,
  row: Uw,
  button: Vw
}, _r = ke(null);
function Jw({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Wt({ orientation: "vertical" });
  return /* @__PURE__ */ n(_r.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: qt.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const Yw = { ArrowRight: !0, ArrowLeft: !1 };
function sa(e) {
  return e ? !0 : void 0;
}
function Qw(e, t) {
  const a = Yw[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function Xw(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function Zw(e) {
  const t = [qt.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function e_(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function t_(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function n_(e) {
  return typeof e == "string" ? e : void 0;
}
function a_({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function r_({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function fr(e) {
  const t = Ne(_r);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = e_(e);
  return /* @__PURE__ */ o("li", { className: qt.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Zw(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": sa(e.unresolved),
        "data-inherited": sa(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${qt.button} ward-treeitem-btn`,
            onClick: () => Xw(e),
            onKeyDown: (r) => Qw(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: t_(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: n_(e.label), children: e.label }),
              /* @__PURE__ */ n(a_, { value: e.detail }),
              /* @__PURE__ */ n(r_, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const l_ = "_frame_gxspk_2", o_ = "_subjectRail_gxspk_22", i_ = "_subject_gxspk_22", s_ = "_rail_gxspk_42", c_ = "_record_gxspk_57", d_ = "_recordBody_gxspk_102", u_ = "_stageGrid_gxspk_157", h_ = "_band_gxspk_171", m_ = "_bandBody_gxspk_179", w_ = "_bandActions_gxspk_184", __ = "_scroller_gxspk_192", f_ = "_board_gxspk_219", v_ = "_lanes_gxspk_228", b_ = "_cardGrid_gxspk_262", ee = {
  frame: l_,
  subjectRail: o_,
  subject: i_,
  rail: s_,
  record: c_,
  recordBody: d_,
  stageGrid: u_,
  band: h_,
  bandBody: m_,
  bandActions: w_,
  scroller: __,
  board: f_,
  lanes: v_,
  cardGrid: b_
};
function cL({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: ee.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function ca(e) {
  return e ? "true" : void 0;
}
function dL({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: ee.subjectRail, "data-ward-subject-rail": a, "data-ruled": ca(i), children: [
    /* @__PURE__ */ n("div", { className: ee.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ee.rail, "data-sticky": ca(l), "aria-label": r, children: t })
  ] });
}
function uL({ title: e, children: t, note: a, trailing: r, pad: l = "block", label: i, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(oa, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ o("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(oa, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: ee.recordBody, "data-pad": l, "data-measure": c, children: t })
  ] });
}
const p_ = "_form_1j8ub_2", g_ = "_fields_1j8ub_9", y_ = "_actions_1j8ub_19", nn = {
  form: p_,
  fields: g_,
  actions: y_
};
function hL({ label: e, children: t, actions: a, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: nn.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: nn.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: nn.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function mL({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ o("section", { className: ee.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ee.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: ee.bandActions, children: t })
  ] });
}
const N_ = "(max-width: 767.98px)";
function En({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(Sn, { className: ee.scroller, label: e, count: a ?? xa.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function k_({ lanes: e, label: t, laneLabel: a }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: ee.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(q, { kind: "select", label: a, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(En, { label: t, children: i == null ? void 0 : i.content })
  ] });
}
function $_({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: ee.board, "data-ward-board": "", children: /* @__PURE__ */ n(En, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(Ta, { children: a.content }, a.id)) }) });
}
function wL({ children: e, label: t = "Workflow board", lanes: a, laneLabel: r = "Column" }) {
  const l = _t(N_);
  return a === void 0 ? /* @__PURE__ */ n(En, { label: t, children: e }) : l ? /* @__PURE__ */ n(k_, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n($_, { lanes: a, label: t });
}
function _L({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), i = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ n(Sn, { className: ee.stageGrid, label: a, count: l, "data-ward-stage-grid": "", "data-floor": r, style: i, children: t });
}
function fL({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${ee.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const C_ = "_block_6tv5x_3", S_ = "_sentence_6tv5x_10", R_ = "_meta_6tv5x_19", T_ = "_ways_6tv5x_24", x_ = "_action_6tv5x_38", L_ = "_strip_6tv5x_42", A_ = "_loading_6tv5x_61", E_ = "_label_6tv5x_69", I_ = "_counter_6tv5x_76", ve = {
  block: C_,
  sentence: S_,
  meta: R_,
  ways: T_,
  action: x_,
  strip: L_,
  loading: A_,
  label: E_,
  counter: I_
};
function M_({ action: e }) {
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
    /* @__PURE__ */ n(M_, { action: t })
  ] });
}
function j_(e) {
  return /* @__PURE__ */ n(Jt, { ...e, kind: "ward-emptystate" });
}
function vL({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(Jt, { sentence: e, action: a, children: /* @__PURE__ */ o("p", { className: ve.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function B_({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${ve.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function bL({ ways: e, ...t }) {
  return /* @__PURE__ */ n(Jt, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(B_, { ways: e }) });
}
function pL({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(Jt, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ o("p", { className: ve.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function gL({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ o("div", { className: ve.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function yL({ queued: e, since: t }) {
  return /* @__PURE__ */ o("div", { className: ve.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function NL({ label: e, startedAt: t }) {
  const a = f(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  S(() => {
    const s = window.setTimeout(() => l(!0), pe.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = $n(a.current, r);
  return /* @__PURE__ */ o("div", { className: `${ve.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: ve.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: ve.counter, children: Nn(i) }) : null
  ] });
}
const P_ = "_note_cigdt_2", q_ = {
  note: P_
};
function H_({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ o("p", { className: q_.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const F_ = "_card_k7btg_3", O_ = "_hit_k7btg_31", D_ = "_head_k7btg_44", z_ = "_title_k7btg_51", W_ = "_meta_k7btg_57", K_ = "_since_k7btg_66", G_ = "_sep_k7btg_76", U_ = "_fields_k7btg_80", V_ = "_field_k7btg_80", J_ = "_last_k7btg_98", Y_ = "_reason_k7btg_110", de = {
  card: F_,
  hit: O_,
  head: D_,
  title: z_,
  meta: W_,
  since: K_,
  sep: G_,
  fields: U_,
  field: V_,
  last: J_,
  reason: Y_
}, Q_ = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function X_(e, t, a) {
  const r = Lt(e, "blue"), l = Lt(e, "orange"), i = Lt(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: l, green: i };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Q_[d.type];
      u && c[u]();
    });
  }, [r, a, i, t, l]);
}
const Z_ = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : oe(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function ef(e, t) {
  return Z_[t](e);
}
function tf({ item: e, connection: t }) {
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
function nf({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function af({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function rf({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: de.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: de.field, children: ef(e, a) }, a)) });
}
const _n = (e) => e ? !0 : void 0;
function lf(e) {
  return { "--stream": ye(e.streamStep, "id") };
}
function of(e, t, a) {
  e == null || e(t, a);
}
function sf(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function cf({ item: e, stale: t }) {
  var r, l;
  const a = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: de.last, "data-stale": _n(t), children: a }) : null;
}
function Yt(e) {
  const t = e.fields ?? [], a = e.item, r = f(null);
  X_(r, a.key, e.feed);
  const l = sf(e.feed), i = lf(a);
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
        /* @__PURE__ */ n("button", { type: "button", className: de.hit, onClick: (s) => of(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(nf, { item: a }),
        /* @__PURE__ */ n(lt, { as: "p", className: de.title, text: a.title }),
        /* @__PURE__ */ n(tf, { item: a, connection: l }),
        /* @__PURE__ */ n(af, { reason: a.blockedReason }),
        /* @__PURE__ */ n(rf, { item: a, fields: t }),
        /* @__PURE__ */ n(cf, { item: a, stale: l === "stale" })
      ]
    }
  );
}
const df = "_column_1j8bi_3", uf = "_head_1j8bi_21", hf = "_label_1j8bi_30", mf = "_count_1j8bi_39", wf = "_list_1j8bi_53", mt = {
  column: df,
  head: uf,
  label: hf,
  count: mf,
  list: wf
};
function vr(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function _f({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ o("div", { className: mt.head, children: [
    /* @__PURE__ */ n("h2", { className: mt.label, id: a, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: mt.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function ff(e) {
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
function vf({ column: e, items: t, fields: a, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && t.length > e.cap, w = vr(t, r);
  return /* @__PURE__ */ o("section", { className: mt.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(_f, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(ff, { column: e, items: t, fields: a, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n(H_, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const bf = "_foot_cs4jr_2", pf = "_note_cs4jr_13", gf = "_link_cs4jr_19", an = {
  foot: bf,
  note: pf,
  link: gf
};
function kL({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: an.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: an.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${an.link} ward-target`, href: x(e), children: "Configure board" })
  ] });
}
const yf = "_head_1tfi5_3", Nf = "_identity_1tfi5_12", kf = "_titleRow_1tfi5_18", $f = "_title_1tfi5_18", Cf = "_key_1tfi5_35", Sf = "_rollup_1tfi5_45", Rf = "_tools_1tfi5_53", Tf = "_swatch_1tfi5_101", xf = "_mark_1tfi5_108", Re = {
  head: yf,
  identity: Nf,
  titleRow: kf,
  title: $f,
  key: Cf,
  rollup: Sf,
  tools: Rf,
  swatch: Tf,
  mark: xf
}, da = "initials:";
function Lf(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Af(e) {
  const t = [Lf(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function Ef(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Af(e)
  ] });
}
function If(e) {
  return e.startsWith(da) ? e.slice(da.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function Mf({ markRef: e, streamStep: t }) {
  const a = { "--stream": ye(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Re.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: If(e) }) : /* @__PURE__ */ n("span", { className: Re.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function jf({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function $L({
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
        /* @__PURE__ */ n(Mf, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Re.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Re.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Re.rollup, "aria-live": "polite", children: Ef(t) })
    ] }),
    /* @__PURE__ */ o("div", { className: Re.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(jf, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(An, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const Bf = "_head_1sejb_14", Pf = "_line_1sejb_15", qf = "_cHandle_1sejb_36", Hf = "_cName_1sejb_41", Ff = "_nameLine_1sejb_49", Of = "_cLabel_1sejb_56", Df = "_cCap_1sejb_61", zf = "_cShown_1sejb_66", Wf = "_name_1sejb_49", Kf = "_noCap_1sejb_88", Gf = "_state_1sejb_102", Uf = "_handle_1sejb_111", Vf = "_sub_1sejb_137", F = {
  head: Bf,
  line: Pf,
  cHandle: qf,
  cName: Hf,
  nameLine: Ff,
  cLabel: Of,
  cCap: Df,
  cShown: zf,
  name: Wf,
  noCap: Kf,
  state: Gf,
  handle: Uf,
  sub: Vf
}, Jf = "can't be hidden or collapsed", Yf = "terminal · counted, not a column", Qf = "A human gate is always shown, so people see what waits for them.", Xf = "A terminal stage is counted, not shown as a column.";
function CL() {
  return /* @__PURE__ */ o("div", { className: F.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: F.cHandle }),
    /* @__PURE__ */ n("span", { className: F.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: F.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: F.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: F.cShown, children: "Shown" })
  ] });
}
function Zf(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function ev(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function ua(e) {
  return e.gate ? Jf : e.terminal ? Yf : ev(e.agentsMounted);
}
function tv(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function nv({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: F.cName, children: [
    /* @__PURE__ */ o("span", { className: F.nameLine, children: [
      /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    ua(e) && /* @__PURE__ */ n("span", { className: F.sub, children: ua(e) })
  ] });
}
function av(e) {
  return e === void 0 ? "" : String(e);
}
function rv(e) {
  return e === "" ? void 0 : Number(e);
}
function lv({ name: e, onReorder: t }) {
  const a = Ie();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ n("span", { className: F.cHandle }) : /* @__PURE__ */ n("span", { className: F.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: F.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && tv(r, t),
      children: "⠿"
    }
  ) });
}
function ov({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${F.cCap} ${F.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: F.cCap, children: /* @__PURE__ */ n(q, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: av(t.cap), onChange: (r) => a({ ...t, cap: rv(r) }) }) });
}
function iv(e) {
  return e.gate ? Qf : e.terminal ? Xf : void 0;
}
function sv({ stage: e, config: t, onChange: a }) {
  const r = Ie() !== null, l = Zf(e, t.shown), i = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ o("span", { className: F.cShown, children: [
    /* @__PURE__ */ n(Ye, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, disabledReason: iv(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: F.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function cv(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function SL({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: F.line, "data-kind": cv(e), children: [
    /* @__PURE__ */ n(lv, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(nv, { stage: e }),
    /* @__PURE__ */ n("span", { className: F.cLabel, children: /* @__PURE__ */ n(q, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (l) => a({ ...t, label: l }) }) }),
    /* @__PURE__ */ n(ov, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(sv, { stage: e, config: t, onChange: a })
  ] });
}
const dv = "_body_8qsv9_2", uv = "_head_8qsv9_9", hv = "_summary_8qsv9_19", mv = "_block_8qsv9_20", wv = "_actionsBlock_8qsv9_21", _v = "_title_8qsv9_41", fv = "_note_8qsv9_46", vv = "_k_8qsv9_51", bv = "_kv_8qsv9_58", pv = "_row_8qsv9_64", gv = "_label_8qsv9_75", yv = "_value_8qsv9_84", Nv = "_quote_8qsv9_90", kv = "_actions_8qsv9_21", $v = "_resolve_8qsv9_111", D = {
  body: dv,
  head: uv,
  summary: hv,
  block: mv,
  actionsBlock: wv,
  title: _v,
  note: fv,
  k: vv,
  kv: bv,
  row: pv,
  label: gv,
  value: yv,
  quote: Nv,
  actions: kv,
  resolve: $v
};
function Cv(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Sv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Ee, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Rv(e) {
  const t = pt(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function Tv(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function xv(e, t, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Ut(Rv(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Cv(e),
    ...Tv(a),
    ...Sv(e, t)
  ];
}
function Lv({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: D.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: D.k, children: t }),
    e
  ] });
}
function Av(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function Ev({ item: e, showKey: t }) {
  const a = Av(e);
  return !t && !a ? null : /* @__PURE__ */ o("div", { className: D.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Iv({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: D.block, children: [
    /* @__PURE__ */ n("p", { className: D.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: D.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: D.note, children: e.agentMeta })
  ] }) : null;
}
function RL({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), w = xv(e, l, d);
  return /* @__PURE__ */ n(it, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: D.body, children: [
    /* @__PURE__ */ n(Ev, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: D.summary, children: [
      /* @__PURE__ */ n("h2", { className: D.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: D.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: D.kv, children: w.map(([_, N, k]) => /* @__PURE__ */ o("div", { className: D.row, children: [
      /* @__PURE__ */ n("dt", { className: D.label, children: _ }),
      /* @__PURE__ */ n("dd", { className: D.value, children: N })
    ] }, k ?? _)) }),
    /* @__PURE__ */ n(Iv, { item: e }),
    /* @__PURE__ */ o("div", { className: D.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: D.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: D.note, children: c })
    ] }),
    /* @__PURE__ */ n(Lv, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Mv = "_root_3azmy_2", jv = "_list_3azmy_7", Bv = "_item_3azmy_12", Pv = "_box_3azmy_18", qv = "_text_3azmy_23", Hv = "_note_3azmy_28", Xe = {
  root: Mv,
  list: jv,
  item: Bv,
  box: Pv,
  text: qv,
  note: Hv
};
function Qt({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ o("div", { className: Xe.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${Xe.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Xe.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Xe.box, children: /* @__PURE__ */ n(Ln, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Xe.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${Xe.note} ward-checklist-note`, children: t })
  ] });
}
const Fv = "_rail_znbbp_2", Ov = "_k_znbbp_11", Dv = "_head_znbbp_19", zv = "_section_znbbp_25", Wv = "_card_znbbp_39", Kv = "_strip_znbbp_46", Gv = "_skeleton_znbbp_60", Uv = "_skeletonLabel_znbbp_74", Vv = "_bar_znbbp_80", Jv = "_note_znbbp_89", _e = {
  rail: Fv,
  k: Ov,
  head: Dv,
  section: zv,
  card: Wv,
  strip: Kv,
  skeleton: Gv,
  skeletonLabel: Uv,
  bar: Vv,
  note: Jv
};
function Yv(e) {
  return (t) => e == null ? void 0 : e(t);
}
function rn({ title: e, children: t }) {
  return /* @__PURE__ */ o("section", { className: _e.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: _e.k, children: e }),
    t
  ] });
}
function Qv({ column: e, count: t }) {
  return /* @__PURE__ */ o("div", { className: _e.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: _e.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: _e.bar, "aria-hidden": "true" }, r))
  ] });
}
function Xv({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(vf, { column: l, items: t.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, l.id));
}
function Zv(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Xv, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(Qv, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function TL(e) {
  const t = Yv(e.onOpen), a = vr(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: _e.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${_e.k} ${_e.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(rn, { title: "Card", children: /* @__PURE__ */ n("div", { className: _e.card, children: a && /* @__PURE__ */ n(Yt, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ o(rn, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: _e.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Zv, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: _e.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(rn, { title: "Effect of this config", children: /* @__PURE__ */ n(Qt, { items: e.effects, density: "compact" }) })
  ] });
}
function eb(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function tb(e) {
  return Math.ceil(e.length / 2);
}
function nb(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function br(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function ab(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const l = br(e);
  l !== void 0 && a(l), r(nb(e.type));
}
function rb(e, t, a, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (i) => ab(i, a, r, l));
  }, [e, t, a, r, l]);
}
function lb(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function ob(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function ib(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function sb(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + B.height.card + " + " + B.height.cardRow + " * " + String(tb(t ?? [])) + ")"
  };
}
function cb(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function db(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: oe(e.cost) }) : null;
}
function ub(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function hb(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Ee, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function mb(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function wb(e, t) {
  return t === void 0 ? e : eb(e, t.ref);
}
function _b(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ft(e) {
  return e === !0 ? "true" : void 0;
}
function pr(e) {
  const t = e.item, a = t.run, r = a !== void 0, l = f(null), i = Lt(l), s = f(/* @__PURE__ */ new Set()), [c, d] = p(lb(t));
  rb(e.feed, t.key, s, d, i);
  const u = ob(t, r), h = ib(t, a), w = sb(t, e.fields), _ = mb(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ..._b(e),
      className: "ward-workcard",
      "data-flagged": ft(t.flagged),
      "data-selected": ft(e.selected),
      style: w,
      ref: wb(l, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        cb(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          db(t, e.fields),
          ub(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          hb(a, c, e.connection, t.changedAt),
          _ !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: _, children: _ }) : null
        ] })
      ]
    }
  ) });
}
function fb({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function vb(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function bb(e, t, a) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function pb(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(fb, { count: e.items.length, cap: e.column.cap });
}
function gb(e, t) {
  return e.roving ?? t;
}
function yb(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function Nb(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    pr,
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
function kb(e) {
  const t = y(), a = Wt({ orientation: "vertical" }), r = gb(e, a), l = vb(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": ft(l), "data-gate": ft(e.column.gate), children: [
    bb(e.column, e.items.length, t),
    pb(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...yb(e, a), children: Nb(e, r) })
  ] });
}
function $b(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function Cb(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(q, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function Sb(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function xL(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: $b(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Cb(e),
      Sb(e.onConfigure),
      /* @__PURE__ */ n(An, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Rb(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Tb(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ye, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ye, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function xb(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function LL(e) {
  const t = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ft(Rb(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Tb(e) }),
    /* @__PURE__ */ n(q, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(Da, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    xb(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function AL(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(pr, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(kb, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function Lb(e, t) {
  const a = br(e);
  a !== void 0 && t(a);
}
function Ab(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => Lb(r, a));
  }, [e, t, a]);
}
function Eb(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function Ib(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", oe(e.cost)]), t;
}
function Mb(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Ee, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function jb(e, t) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function EL(e) {
  var s;
  const t = e.item, a = t.run, [r, l] = p((s = t.run) == null ? void 0 : s.lastStep);
  Ab(e.feed, t.key, l);
  const i = [...Eb(t), ...Ib(t)];
  return /* @__PURE__ */ o(it, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Mb(a, r)
    ] }),
    jb(t, e.actions)
  ] });
}
const Bb = "_card_1nkkx_3", Pb = "_head_1nkkx_30", qb = "_mark_1nkkx_38", Hb = "_name_1nkkx_50", Fb = "_chips_1nkkx_71", Ob = "_description_1nkkx_77", Db = "_run_1nkkx_82", zb = "_sep_1nkkx_91", Wb = "_facts_1nkkx_97", Kb = "_fact_1nkkx_97", Gb = "_factLabel_1nkkx_111", Ub = "_factValue_1nkkx_115", ie = {
  card: Bb,
  head: Pb,
  mark: qb,
  name: Hb,
  chips: Fb,
  description: Ob,
  run: Db,
  sep: zb,
  facts: Wb,
  fact: Kb,
  factLabel: Gb,
  factValue: Ub
}, Vb = { live: "done", draft: "running", paused: "meta" };
function Jb(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function Yb({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: Vb[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function Qb({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function Xb({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Ee, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function Zb({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ o("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function ep(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function tp({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": ye(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: Jb(s),
      style: c,
      "data-selected": d,
      "data-paused": ep(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: x(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(Qb, { description: e.description }),
        /* @__PURE__ */ n(Xb, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(Yb, { versions: e.versions }),
        /* @__PURE__ */ n(Zb, { facts: i })
      ]
    }
  );
}
const np = "_list_4dcyc_2", ap = "_row_4dcyc_11", rp = "_head_4dcyc_23", lp = "_id_4dcyc_30", op = "_lock_4dcyc_35", ip = "_reason_4dcyc_41", sp = "_remove_4dcyc_46", cp = "_clauses_4dcyc_50", dp = "_clause_4dcyc_50", up = "_label_4dcyc_64", hp = "_cell_4dcyc_71", mp = "_value_4dcyc_76", ce = {
  list: np,
  row: ap,
  head: rp,
  id: lp,
  lock: op,
  reason: ip,
  remove: sp,
  clauses: cp,
  clause: dp,
  label: up,
  cell: hp,
  value: mp
}, gr = ke(!1);
function IL({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(gr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function wp({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(q, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => a(e.key, l) });
}
function _p({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function fp({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ o("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(_p, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function ha(e, t) {
  return e.locked ? void 0 : t;
}
function ML({ rule: e, onChange: t, onRemove: a }) {
  if (!Ne(gr)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = ha(e, t);
  return /* @__PURE__ */ o("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(fp, { rule: e, onRemove: ha(e, a) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(wp, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const vp = "_ladder_1xdeh_2", bp = "_cell_1xdeh_7", pp = "_empty_1xdeh_26", gp = "_name_1xdeh_34", yp = "_holder_1xdeh_40", Np = "_request_1xdeh_46", kp = "_swatches_1xdeh_51", $p = "_swatch_1xdeh_51", Cp = "_tilesFrame_1xdeh_78", Sp = "_tiles_1xdeh_78", Rp = "_tile_1xdeh_78", Tp = "_bar_1xdeh_117", xp = "_hex_1xdeh_128", Lp = "_note_1xdeh_138", j = {
  ladder: vp,
  cell: bp,
  empty: pp,
  name: gp,
  holder: yp,
  request: Np,
  swatches: kp,
  swatch: $p,
  tilesFrame: Cp,
  tiles: Sp,
  tile: Rp,
  bar: Tp,
  hex: xp,
  note: Lp
}, jL = "not validated yet, pending a CVD matrix and dark stepping";
function Ap(e) {
  return e.reserved ? "reserved" : vt(e.step) ? "validated" : "partial";
}
function yr(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Ep(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Ip({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(We, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${j.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Mp(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function jp(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const ma = (e) => String(e).padStart(2, "0");
function Bp(e, t, a) {
  return e === "reserved" ? "Reserved until revalidated" : a ? "yours" : t ?? yr(e, void 0);
}
function Pp({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("span", { className: `${j.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${j.hex} ward-ladder-hex`, children: r ? `step ${ma(e)}` : Il(e) }),
    /* @__PURE__ */ n("span", { className: `${j.note} ward-ladder-note`, children: r ? a : `Step ${ma(e)} · ${a}` })
  ] });
}
function qp({ step: e, value: t, taken: a, onChange: r, presentation: l, disabled: i }) {
  const s = Ap(e), c = yr(s, a), d = c !== "free", u = d || i, h = t === e.step, w = e.name ?? `Step ${e.step}`, _ = () => {
    u || r(e.step);
  }, N = `${w} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...jp(d, h, u), "data-validation": s, style: Ep(e, s), onClick: _, onKeyDown: (E) => Mp(E, _) }, label: N, name: w, holder: c, validation: s, note: Bp(s, a, h), step: e.step };
}
const Hp = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${j.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${j.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Pp, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${j.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Ip, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${j.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${j.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Fp(e) {
  return Hp[e.presentation](qp(e));
}
function Op(e) {
  for (const t of e)
    if (!t.reserved && !Kt(t.step)) throw new Error("colour ladder renders token steps only");
}
function Dp() {
  return /* @__PURE__ */ o("div", { className: `${j.cell} ward-ladder-cell ${j.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${j.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${j.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${j.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function zp(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Wp = { list: j.ladder, swatches: j.swatches, tiles: j.tilesFrame };
function Kp() {
  return /* @__PURE__ */ o("div", { className: `${j.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${j.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${j.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${j.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Gp = { list: Dp, swatches: () => null, tiles: Kp };
function Up(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Nr(e) {
  const t = e.takenBy ?? {}, a = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Op(e.steps);
  const r = zp(e), l = Gp[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(Fp, { step: s, value: e.value, taken: t[s.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Up(e.disabled === !0), className: `${Wp[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: j.tiles, children: i }) : i });
}
const Vp = "_rail_s06lm_2", Jp = "_section_s06lm_12", Yp = "_sectionFlush_s06lm_22", Qp = "_head_s06lm_26", Xp = "_headLabel_s06lm_34", Zp = "_sample_s06lm_42", eg = "_sampleLabel_s06lm_47", tg = "_sampleTitle_s06lm_54", ng = "_sampleMeta_s06lm_59", ag = "_trace_s06lm_65", rg = "_traceHead_s06lm_70", lg = "_steps_s06lm_78", og = "_step_s06lm_78", ig = "_stepTitle_s06lm_97", sg = "_hollow_s06lm_107", cg = "_stepBody_s06lm_115", dg = "_stepDetail_s06lm_127", ug = "_publish_s06lm_132", hg = "_reason_s06lm_138", mg = "_note_s06lm_143", wg = "_reveal_s06lm_148", $ = {
  rail: Vp,
  section: Jp,
  sectionFlush: Yp,
  head: Qp,
  headLabel: Xp,
  sample: Zp,
  sampleLabel: eg,
  sampleTitle: tg,
  sampleMeta: ng,
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
}, wa = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, _g = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, fg = { ok: "greenFill", finding: "orangeFill", action: "blue" }, vg = { notSimulated: "not simulated", running: "running" };
function bg(e) {
  return e.presentation === "foundry";
}
function pg(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const a = t.filter((r) => !r.met);
  return a.length > 0 ? `Publish is disabled: ${a.length} of ${t.length} gate conditions unmet: ${a[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function gg(e, t) {
  var r;
  const a = _g[e.status];
  return a !== void 0 ? a : ((r = t.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function yg(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Ng(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function kg(e) {
  if (yg(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function $g(e) {
  const [t, a] = p(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Cg(e) {
  const t = vg[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(We, { size: 6, kind: fg[e.kind], label: e.kind });
}
function Sg(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Rg(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Ee, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Tg(e) {
  const { step: t } = e;
  return /* @__PURE__ */ o($g, { kind: t.kind, children: [
    /* @__PURE__ */ n(Cg, { kind: t.kind }),
    /* @__PURE__ */ o("span", { className: $.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: $.stepTitle, children: t.title }),
      /* @__PURE__ */ n(Sg, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Rg, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function xg(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(ue(t)), a.join(" · ");
}
function kr(e) {
  const t = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.traceHead, id: t, children: xg(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: $.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(Tg, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function Lg(e) {
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
function Ag(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function Eg(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : oe(e.run.cost), label: "Cost" }, { value: e.run.turns ? Aa(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Vt, { divided: !0, cells: t }) });
}
function Ig(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: oe(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: Aa(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function Mg(e) {
  const t = Ig(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ o("p", { className: $.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Vt, { divided: !0, cells: t }) });
}
function $r(e) {
  const t = y();
  return e.reason !== null ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("p", { className: `${$.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function jg(e) {
  return /* @__PURE__ */ o("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ n($r, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: $.note, children: e.note })
  ] });
}
function Bg(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ n($r, { reason: e.reason, onPublish: e.onPublish }) });
}
function Cr(e) {
  return /* @__PURE__ */ o("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: wa[e.run.status].role, label: wa[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Ee, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Pg(e, t) {
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
function qg(e) {
  var a;
  Ng(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Cr, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(Lg, { sample: e.run.sample }),
    /* @__PURE__ */ n(kr, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(Eg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Qt, { items: e.checklist }) }),
    /* @__PURE__ */ n(jg, { reason: pg(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Hg(e) {
  var r;
  const t = Pg(e.run, e.feed);
  kg(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Cr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(Ag, { sample: e.run.sample }),
    /* @__PURE__ */ n(kr, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(Mg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Qt, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Bg, { reason: gg(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function BL(e) {
  return bg(e) ? /* @__PURE__ */ n(Hg, { ...e }) : /* @__PURE__ */ n(qg, { ...e });
}
const Fg = "_list_142ip_3", Og = "_row_142ip_9", Dg = "_condition_142ip_18", zg = "_action_142ip_24", Et = {
  list: Fg,
  row: Og,
  condition: Dg,
  action: zg
}, Sr = ke(!1);
function PL({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(Sr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: Et.list, "aria-label": t, children: e }) });
}
function qL({ rule: e }) {
  if (!Ne(Sr)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: Et.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: Et.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: Et.action, children: e.then })
  ] });
}
const Wg = "_move_tmppt_3", Kg = {
  move: Wg
};
function fn(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [l] = r.splice(t, 1);
  return r.splice(a, 0, l), r;
}
function Rr(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function Tr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function _a(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function Gg(e) {
  return e === "up" ? "down" : "up";
}
function Ug(e, t) {
  const a = _a(e, t.id, t.direction) ?? _a(e, t.id, Gg(t.direction));
  a == null || a.focus();
}
function xr() {
  const e = f(null), [t, a] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && t !== null && Ug(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), l(c);
  } };
}
function Lr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Ht({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${Kg.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const Vg = "_body_1jd1i_2", Jg = "_title_1jd1i_8", Yg = "_section_1jd1i_13", Qg = "_legend_1jd1i_18", Xg = "_stages_1jd1i_26", Zg = "_stage_1jd1i_26", ey = "_stageIndex_1jd1i_44", ty = "_stageName_1jd1i_50", ny = "_footer_1jd1i_59", ay = "_note_1jd1i_66", ry = "_reason_1jd1i_71", ly = "_actions_1jd1i_76", oy = "_webHead_1jd1i_83", iy = "_kicker_1jd1i_92", sy = "_webTitle_1jd1i_99", cy = "_webBody_1jd1i_105", dy = "_webSection_1jd1i_109", uy = "_sectionHead_1jd1i_121", hy = "_sectionNote_1jd1i_129", my = "_formLabel_1jd1i_134", wy = "_identityRow_1jd1i_139", _y = "_nameCell_1jd1i_145", fy = "_keyCell_1jd1i_150", vy = "_colourCell_1jd1i_154", by = "_colourStatus_1jd1i_161", py = "_webStages_1jd1i_166", gy = "_webStageList_1jd1i_172", yy = "_webStage_1jd1i_166", Ny = "_webIndex_1jd1i_191", ky = "_webStageName_1jd1i_196", $y = "_webMoves_1jd1i_201", Cy = "_addStage_1jd1i_215", Sy = "_addStageButton_1jd1i_223", Ry = "_addStageNote_1jd1i_231", Ty = "_webFooter_1jd1i_236", xy = "_webFooterNotes_1jd1i_244", Ly = "_webNote_1jd1i_251", v = {
  body: Vg,
  title: Jg,
  section: Yg,
  legend: Qg,
  stages: Xg,
  stage: Zg,
  stageIndex: ey,
  stageName: ty,
  footer: ny,
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
  addStageNote: Ry,
  webFooter: Ty,
  webFooterNotes: xy,
  webNote: Ly
}, Ay = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Ar = "not in catalogue";
function Ey(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${Ar}` }, ...a];
}
function Iy({ stage: e, index: t, catalogue: a, onName: r }) {
  const l = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(q, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Ar}`;
  return /* @__PURE__ */ n(q, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Ey(a, e.name), invalid: i, onChange: r });
}
function Er(e, t) {
  return e.name || `stage ${t + 1}`;
}
function My(e) {
  const t = f([]), a = f(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function jy({ id: e, stage: t, index: a, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Er(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: v.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: v.webStageName, children: /* @__PURE__ */ n(Iy, { stage: t, index: a, catalogue: l, onName: (u) => i({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(q, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: Ay, onChange: (u) => i({ ...t, kind: u }) }),
    /* @__PURE__ */ o("span", { className: v.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(Ht, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(Ht, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function By({ stages: e, onChange: t, catalogue: a }) {
  const r = My(e.length), l = xr(), i = (c, d) => {
    const u = Rr(c, d);
    r.current = fn(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Tr(Er(e[c], c), u, e.length)), t(fn(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: v.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(jy, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(Lr, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: v.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Py = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], qy = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Hy = "A new stream starts as a draft. Nothing runs on it until you publish it.", Fy = "Create is disabled: name the stream and give it a key first.", Oy = "reorder with the ↑ ↓ buttons · min 2";
function In(e, t) {
  return !e.reserved && vt(e.step) && t[e.step] === void 0;
}
function Dy(e, t) {
  const a = e.find((r) => In(r, t));
  return a ? a.step : 1;
}
function zy({ stages: e, onMove: t }) {
  const a = xr(), r = (l, i) => {
    const s = Rr(l, i);
    a.moved({ id: e[l].id, direction: i }, Tr(e[l].name, s, e.length)), t(l, s);
  };
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: v.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: v.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: v.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(Ht, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(Ht, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(Lr, { text: a.announcement })
  ] });
}
function Wy({ reason: e, onCreate: t, onDraft: a }) {
  const r = y();
  return /* @__PURE__ */ o("div", { className: v.footer, children: [
    /* @__PURE__ */ n("p", { className: v.note, children: Hy }),
    e && /* @__PURE__ */ n("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: v.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function Ky(e, t) {
  return e !== "" && t !== "" ? null : Fy;
}
function Gy(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: l = qy, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = y(), [h, w] = p(""), [_, N] = p(""), [k, E] = p(t[0].value), [H, me] = p(() => Dy(a, r)), [re, Me] = p(e.stages ?? Py), [Qe, L] = p(l[0].value), Y = { name: h, key: _, streamStep: H, owner: k, stages: re, policy: Qe }, $e = Ky(h, _);
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
      /* @__PURE__ */ n(Nr, { label: "Stream colour", steps: a, value: H, onChange: me, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ n(zy, { stages: re, onMove: (Ke, ul) => Me(fn(re, Ke, ul)) })
    ] }),
    /* @__PURE__ */ n(ur, { legend: "Loop policy", options: l, value: Qe, onChange: L }),
    /* @__PURE__ */ n(Wy, { reason: $e, onCreate: () => i(Y), onDraft: () => s(Y) })
  ] }) });
}
const Ir = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Uy = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Vy(e, t, a, r, l, i) {
  var c;
  const s = ((c = Ir.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: i };
}
function Jy(e, t) {
  return Yy(e) && Qy(e, t) && Xy(e);
}
function Yy(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Qy(e, t) {
  return e.colourStep === null || In({ step: e.colourStep }, t);
}
function Xy(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function Zy(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : In({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function eN({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function tN({ ready: e, draft: t, agentStage: a, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: v.webFooter, children: [
    /* @__PURE__ */ o("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ n(eN, { stage: a }),
      !e && /* @__PURE__ */ n("p", { id: i, className: v.reason, children: Uy })
    ] }),
    l && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => l(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function nN({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: v.webHead, children: [
    /* @__PURE__ */ n("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function aN({ name: e, setName: t, streamKey: a, setKey: r, colour: l, owner: i }) {
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
function rN(e) {
  const t = y(), a = y(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [_, N] = p("relay"), [k, E] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), H = Vy(l, s, d, h, _, k), me = Jy(H, r), re = k.find((L) => L.kind === "agent" && L.name.trim() !== ""), Me = /* @__PURE__ */ o("div", { className: v.colourCell, children: [
    /* @__PURE__ */ n("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Nr, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Qe = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("p", { className: v.colourStatus, "data-colour-status": "", children: Zy(h, r) }),
    /* @__PURE__ */ n(q, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((L) => ({ value: L, label: L })), onChange: u })
  ] });
  return /* @__PURE__ */ o(it, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(nN, { titleId: a }),
    /* @__PURE__ */ o("div", { className: v.webBody, children: [
      /* @__PURE__ */ n(aN, { name: l, setName: i, streamKey: s, setKey: c, colour: Me, owner: Qe }),
      e.fields && /* @__PURE__ */ n("section", { className: v.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ o("section", { className: v.webSection, children: [
        /* @__PURE__ */ o("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: v.sectionNote, children: Oy })
        ] }),
        /* @__PURE__ */ n(By, { stages: k, onChange: E })
      ] }),
      /* @__PURE__ */ n("section", { className: v.webSection, children: /* @__PURE__ */ n(ur, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: _, options: Ir, onChange: N }) }),
      /* @__PURE__ */ n(tN, { ready: me, draft: H, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function HL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(rN, { ...e }) : /* @__PURE__ */ n(Gy, { ...e });
}
const lN = "_row_bs8hc_2", oN = "_cell_bs8hc_6", iN = "_condition_bs8hc_11", sN = "_action_bs8hc_18", cN = "_contract_bs8hc_24", dN = "_contractCondition_bs8hc_33", uN = "_contractAction_bs8hc_39", ne = {
  row: lN,
  cell: oN,
  condition: iN,
  action: sN,
  contract: cN,
  contractCondition: dN,
  contractAction: uN
}, Mr = ["advance", "block", "escalate", "requestReview"], fa = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Ft(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Mn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ne.action, children: fa[e.then] }) : /* @__PURE__ */ n(
    q,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => t({ ...e, then: l }),
      options: Mr.map((l) => ({ value: l, label: fa[l] }))
    }
  );
}
function hN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: ne.row, children: [
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n("span", { className: ne.condition, title: Ft(e, r), children: Ft(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: Mn(e, t, a) })
  ] });
}
function mN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: ne.row, children: [
    /* @__PURE__ */ o("td", { className: ne.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ne.condition, children: Ft(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: Mn(e, t, a) })
  ] });
}
function wN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: ne.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ne.contractCondition, children: Ft(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ne.contractAction, children: Mn(e, t, a, !0) })
  ] });
}
const _N = { two: mN, four: hN, contract: wN };
function FL(e) {
  var a;
  if (!Mr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = _N[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const fN = "_column_g1uat_2", vN = "_head_g1uat_17", bN = "_index_g1uat_23", pN = "_name_g1uat_29", gN = "_meta_g1uat_38", yN = "_mono_g1uat_43", NN = "_gate_g1uat_50", kN = "_reviewersLabel_g1uat_57", $N = "_reviewers_g1uat_57", CN = "_reviewer_g1uat_57", SN = "_agents_g1uat_74", RN = "_workflowColumn_g1uat_79", TN = "_workflowHead_g1uat_96", xN = "_stageRow_g1uat_102", LN = "_stageLabel_g1uat_109", AN = "_workflowTitle_g1uat_116", EN = "_workflowMeta_g1uat_122", IN = "_workflowGate_g1uat_127", MN = "_gateNote_g1uat_135", jN = "_cardNote_g1uat_140", BN = "_reviewerList_g1uat_145", PN = "_reviewerRow_g1uat_151", qN = "_reviewerMark_g1uat_157", HN = "_reviewerName_g1uat_167", FN = "_terminalCard_g1uat_173", ON = "_terminalCount_g1uat_182", DN = "_workflowAgents_g1uat_188", zN = "_mount_g1uat_194", R = {
  column: fN,
  head: vN,
  index: bN,
  name: pN,
  meta: gN,
  mono: yN,
  gate: NN,
  reviewersLabel: kN,
  reviewers: $N,
  reviewer: CN,
  agents: SN,
  workflowColumn: RN,
  workflowHead: TN,
  stageRow: xN,
  stageLabel: LN,
  workflowTitle: AN,
  workflowMeta: EN,
  workflowGate: IN,
  gateNote: MN,
  cardNote: jN,
  reviewerList: BN,
  reviewerRow: PN,
  reviewerMark: qN,
  reviewerName: HN,
  terminalCard: FN,
  terminalCount: ON,
  workflowAgents: DN,
  mount: zN
}, WN = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function jn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function jr(e) {
  return `${Math.round(e * 100)}%`;
}
function KN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Vt, { cells: [
      { value: jr(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function GN({ stage: e }) {
  return /* @__PURE__ */ n(Vt, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: jn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function UN({ stage: e, titleId: t }) {
  return /* @__PURE__ */ o("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: WN[e.kind] })
  ] });
}
function VN({ stage: e }) {
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
function JN({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(KN, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(GN, { stage: e }) : null;
}
function YN({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function QN({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const l = y(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: R.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(UN, { stage: e, titleId: l }),
    /* @__PURE__ */ n(VN, { stage: e }),
    /* @__PURE__ */ n(JN, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(tp, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(YN, { onMount: a })
  ] });
}
const XN = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function ZN({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ o("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function e1({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: R.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ n(ZN, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: jr(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function t1(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function n1({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: jn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: t1(e.rolledBackThisWeek) })
  ] });
}
function a1(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function r1(e) {
  if (e.kind === "terminal") return `${jn(e.closedThisWeek)} this week`;
  const t = a1(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function l1({ stage: e, titleId: t }) {
  const a = XN[e.kind];
  return /* @__PURE__ */ o("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: R.stageRow, children: [
      /* @__PURE__ */ o("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: r1(e) })
  ] });
}
function o1(e) {
  return e === "entry" || e === "agent";
}
function i1({ stage: e, onMount: t }) {
  return t === void 0 || !o1(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Mount agent" });
}
function s1({ stage: e, agentCards: t, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ o("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(l1, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(e1, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(n1, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(i1, { stage: e, onMount: a })
  ] });
}
function c1(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function OL(e) {
  return c1(e) ? /* @__PURE__ */ n(s1, { ...e }) : /* @__PURE__ */ n(QN, { ...e });
}
const d1 = "_row_1tdra_6", u1 = "_name_1tdra_12", h1 = "_compactRow_1tdra_13", m1 = "_compactName_1tdra_13", w1 = "_cell_1tdra_30", _1 = "_chain_1tdra_45", f1 = "_owner_1tdra_51", v1 = "_mono_1tdra_57", b1 = "_compactCell_1tdra_79", p1 = "_stack_1tdra_96", g1 = "_stat_1tdra_103", y1 = "_identityLine_1tdra_110", N1 = "_identity_1tdra_110", k1 = "_ownerLine_1tdra_140", $1 = "_link_1tdra_160", C1 = "_gateMark_1tdra_166", S1 = "_emptyChain_1tdra_171", R1 = "_arrow_1tdra_177", T1 = "_muted_1tdra_182", x1 = "_define_1tdra_187", L1 = "_statValue_1tdra_194", A1 = "_policyId_1tdra_200", E1 = "_sub_1tdra_205", g = {
  row: d1,
  name: u1,
  compactRow: h1,
  compactName: m1,
  cell: w1,
  chain: _1,
  owner: f1,
  mono: v1,
  compactCell: b1,
  stack: p1,
  stat: g1,
  identityLine: y1,
  identity: N1,
  ownerLine: k1,
  link: $1,
  gateMark: C1,
  emptyChain: S1,
  arrow: R1,
  muted: T1,
  define: x1,
  statValue: L1,
  policyId: A1,
  sub: E1
};
function Br(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function I1(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function M1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Pr(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function j1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Pr(e.members)}`;
}
function B1(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: x(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: j1(e) })
  ] }) });
}
function qr({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function P1(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = pt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function q1({ stages: e, streamStep: t }) {
  const a = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ n(qr, { name: l.name, gate: l.gate === !0, look: P1(i, a, t), size: "tag" }),
    i === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function H1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : q1(e) });
}
function Hr(e) {
  return e === void 0 ? void 0 : !0;
}
function va(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Hr(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function F1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function O1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function D1({ stream: e, href: t, presentation: a }) {
  const r = M1(a.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Br, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ye(e.streamStep, "chip") }, children: [
    B1(e, t),
    H1(e),
    va(O1(e.agents), e.agents === void 0 ? void 0 : I1(e.agents), "—"),
    F1(e.policy),
    va(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function z1(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function DL(e) {
  if (z1(e)) return D1(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: Br, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: x(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...Ut(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(qr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: g.mono, children: Pr(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": Hr(t.inFlightHint), children: ae(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : ue(t.p50) }) })
  ] });
}
const W1 = "_row_2u4ll_2", K1 = "_name_2u4ll_16", G1 = "_scope_2u4ll_24", Ot = {
  row: W1,
  name: K1,
  scope: G1
};
function Bn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function U1(e) {
  return e === void 0 ? `${Ot.row} ward-toolrow` : `${Ot.row} ward-toolrow ${e}`;
}
function V1(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function J1({ id: e, reasonId: t, tool: a, state: r, onChange: l }) {
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
function Y1({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: Bn(e) });
}
function Q1({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${Ot.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function X1(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function zL({ tool: e, onChange: t, presentation: a }) {
  const r = y(), l = y(), i = V1(e, a), s = X1(a);
  return /* @__PURE__ */ o(s, { className: U1(a == null ? void 0 : a.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(J1, { id: r, reasonId: l, tool: e, state: i, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${Ot.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Q1, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(Y1, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const Z1 = "_strip_4ppv9_2", ek = "_well_4ppv9_11", tk = "_head_4ppv9_18", nk = "_name_4ppv9_24", ak = "_chart_4ppv9_32", rk = "_segment_4ppv9_38", lk = "_detailedChart_4ppv9_44", ok = "_rail_4ppv9_57", ik = "_section_4ppv9_63", sk = "_label_4ppv9_74", ck = "_note_4ppv9_91", V = {
  strip: Z1,
  well: ek,
  head: tk,
  name: nk,
  chart: ak,
  segment: rk,
  detailedChart: lk,
  rail: ok,
  section: ik,
  label: sk,
  note: ck
}, dk = "No item in flight to preview.", uk = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", hk = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", vn = [1, 2, 3, 4, 5, 6], Dt = 100;
function mk(e, t) {
  return t.has(e) ? ye(e, "id") : "var(--ward-color-line)";
}
function wk({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: vn.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: l * Dt,
      y: "0",
      width: Dt,
      height: "8",
      fill: mk(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function _k(e) {
  const t = e.slice(0, vn.length);
  for (; t.length < vn.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function fk({ identities: e }) {
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
function Fr(e) {
  return (t) => e == null ? void 0 : e(t);
}
function $t({ label: e, children: t }) {
  const a = y();
  return /* @__PURE__ */ o("section", { className: V.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: V.label, children: e }),
    t
  ] });
}
function vk({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: t ?? dk }) : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Yt, { item: { ...e, streamStep: pt(a.streamStep) }, onOpen: Fr(r), feed: null }) });
}
function bk({ draft: e }) {
  const t = { "--stream": ye(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: V.head, style: t, children: [
    /* @__PURE__ */ n(We, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Ut(e.key, e.streamStep) })
  ] });
}
function pk(e) {
  const t = _k(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ o("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n($t, { label: "Board card", children: /* @__PURE__ */ n(vk, { ...e, draft: a }) }),
    /* @__PURE__ */ n($t, { label: "Streams index row", children: /* @__PURE__ */ n(bk, { draft: a }) }),
    /* @__PURE__ */ o($t, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(fk, { identities: t }),
      /* @__PURE__ */ n("p", { className: V.note, children: uk })
    ] }),
    /* @__PURE__ */ n($t, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: hk }) })
  ] });
}
function gk({ draft: e, sample: t, streams: a, onOpen: r }) {
  const l = { "--stream": ye(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: V.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: V.head, children: [
      /* @__PURE__ */ n(We, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Ut(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Yt, { item: { ...t, streamStep: e.streamStep }, onOpen: Fr(r) }) }),
    /* @__PURE__ */ n(wk, { draft: e, streams: a })
  ] });
}
function WL(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(pk, { ...e }) : /* @__PURE__ */ n(gk, { ...e });
}
const yk = "_row_ixlg5_6", Nk = "_headCell_ixlg5_10", kk = "_cell_ixlg5_11", $k = "_name_ixlg5_23", Ck = "_consequence_ixlg5_29", Sk = "_governed_ixlg5_36", Rk = "_control_ixlg5_42", Tk = "_byRole_ixlg5_48", xk = "_webControl_ixlg5_59", Lk = "_webConsequence_ixlg5_65", Ak = "_webGoverned_ixlg5_71", W = {
  row: yk,
  headCell: Nk,
  cell: kk,
  name: $k,
  consequence: Ck,
  governed: Sk,
  control: Rk,
  byRole: Tk,
  webControl: xk,
  webConsequence: Lk,
  webGoverned: Ak
};
function Ek({
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
function Ik({ capability: e, cells: t, onChange: a }) {
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
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(Ek, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function Mk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function jk({ name: e, cell: t, onChange: a }) {
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
function Bk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ o("tr", { className: W.row, children: [
    /* @__PURE__ */ o("td", { className: W.cell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${W.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(jk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webGoverned} ward-cellmeta`, children: Mk(e) }) })
  ] });
}
function KL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Bk, { ...e }) : /* @__PURE__ */ n(Ik, { ...e });
}
const Pk = "_row_vv64h_2", qk = "_cell_vv64h_6", Hk = "_name_vv64h_25", Fk = "_note_vv64h_30", Ok = "_webName_vv64h_41", Dk = "_webMeta_vv64h_47", X = {
  row: Pk,
  cell: qk,
  name: Hk,
  note: Fk,
  webName: Ok,
  webMeta: Dk
}, Or = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function zk(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Wk({ component: e, onRestart: t }) {
  const a = y(), r = Or[e.state], l = e.state === "drainFirst";
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
function Kk({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: zk(e.state) });
}
function Gk({ component: e, onRestart: t }) {
  return /* @__PURE__ */ o("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { ...Or[e.state] }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(Kk, { component: e, onRestart: t }) })
  ] });
}
function GL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Gk, { ...e }) : /* @__PURE__ */ n(Wk, { ...e });
}
const Uk = "_row_jcm5k_7", Vk = "_cell_jcm5k_11", Jk = "_next_jcm5k_28", Yk = "_headCell_jcm5k_38", Qk = "_webId_jcm5k_77", Xk = "_webPurpose_jcm5k_83", Zk = "_webMeta_jcm5k_91", e$ = "_webUrgent_jcm5k_97", K = {
  row: Uk,
  cell: Vk,
  next: Jk,
  headCell: Yk,
  webId: Qk,
  webPurpose: Xk,
  webMeta: Zk,
  webUrgent: e$
}, t$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, n$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Dr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], a$ = Object.fromEntries(Dr.map((e) => [e.key, e]));
function Ze({ column: e, children: t }) {
  const a = a$[e];
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
function UL() {
  return /* @__PURE__ */ n("tr", { children: Dr.map((e) => /* @__PURE__ */ n(
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
function r$({ cred: e }) {
  const t = t$[e.state];
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n(Ze, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Ze, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Ze, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(Ze, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Bn(e.cls) }) }),
    /* @__PURE__ */ n(Ze, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Ze, { column: "next", children: /* @__PURE__ */ n("span", { className: K.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function l$({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${K.webMeta} ${K.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function o$({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(l$, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...n$[e.state] }) })
  ] });
}
function VL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(o$, { ...e }) : /* @__PURE__ */ n(r$, { ...e });
}
const i$ = "_card_lpp45_2", s$ = "_head_lpp45_11", c$ = "_env_lpp45_18", d$ = "_version_lpp45_25", u$ = "_meta_lpp45_32", h$ = "_webCard_lpp45_37", m$ = "_webRow_lpp45_47", w$ = "_webTitle_lpp45_55", _$ = "_webLine_lpp45_65", f$ = "_webVersion_lpp45_72", v$ = "_webMeta_lpp45_77", Q = {
  card: i$,
  head: s$,
  env: c$,
  version: d$,
  meta: u$,
  webCard: h$,
  webRow: m$,
  webTitle: w$,
  webLine: _$,
  webVersion: f$,
  webMeta: v$
}, ba = { dev: "Dev", uat: "UAT", prod: "Prod" }, zr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function b$({ env: e }) {
  const t = zr[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: Q.card, "aria-label": ba[e.env], children: [
    /* @__PURE__ */ o("div", { className: Q.head, children: [
      /* @__PURE__ */ n("span", { className: Q.env, children: ba[e.env] }),
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
function p$(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function g$(e) {
  return /* @__PURE__ */ o("article", { className: `${Q.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${Q.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Q.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...zr[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Q.version} ${Q.webVersion} ${Q.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Q.meta} ${Q.webMeta} ${Q.webLine} ward-cellmeta`, children: p$(e) })
  ] });
}
function JL(e) {
  return "presentation" in e ? /* @__PURE__ */ n(g$, { ...e }) : /* @__PURE__ */ n(b$, { ...e });
}
const y$ = "_panel_1hmja_2", N$ = "_line_1hmja_8", k$ = "_actions_1hmja_14", Ct = {
  panel: y$,
  line: N$,
  actions: k$
};
function YL(e) {
  return /* @__PURE__ */ o("div", { className: Ct.panel, children: [
    /* @__PURE__ */ n("p", { className: Ct.line, children: e.status }),
    /* @__PURE__ */ n(q, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: Ct.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: Ct.line, children: e.note ?? "" })
  ] });
}
const $$ = "_upload_13fcl_2", C$ = "_preview_13fcl_7", S$ = "_mark_13fcl_17", R$ = "_empty_13fcl_22", T$ = "_actions_13fcl_28", x$ = "_input_13fcl_33", L$ = "_reasons_13fcl_41", A$ = "_reason_13fcl_41", E$ = "_accepted_13fcl_57", le = {
  upload: $$,
  preview: C$,
  mark: S$,
  empty: R$,
  actions: T$,
  input: x$,
  reasons: L$,
  reason: A$,
  accepted: E$
}, Wr = 1.5, Kr = 22, zt = "script elements or event handlers", qe = "links or external references", Le = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Wr}px at ${Kr}px`], I$ = [Le[1], Le[2], zt, qe], M$ = /* @__PURE__ */ new Map([
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
]), j$ = "http://www.w3.org/2000/svg", B$ = "http://www.w3.org/2000/xmlns/", P$ = /* @__PURE__ */ new Set([
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
]), q$ = /* @__PURE__ */ new Set([
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
]), Pn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, H$ = /url\s*\(|['"\\]/i;
function F$() {
  return { ok: !1, reasons: [Le[1]] };
}
function Gr(e) {
  return e.namespaceURI === j$;
}
function O$(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && Gr(t) ? t : null;
  } catch {
    return null;
  }
}
function D$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [Le[0]] : [];
}
function z$(e) {
  return M$.get(e.localName) ?? (e.localName.startsWith("animate") ? qe : void 0);
}
function W$(e) {
  return H$.test(e.replace(Pn, ""));
}
function K$(e) {
  return /^on/i.test(e.localName) ? zt : e.localName === "href" || W$(e.value) ? qe : void 0;
}
function G$(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(z$(a));
    for (const r of Array.from(a.attributes)) t.add(K$(r));
  }
  return I$.filter((a) => t.has(a));
}
function U$(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((l) => Number.isFinite(l) && l > 0), 0), r = a > 0 ? Kr / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Wr;
  }) ? [Le[3]] : [];
}
function V$(e) {
  if (e.namespaceURI === B$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (q$.has(t) || t.startsWith("stroke"));
}
function J$(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && Gr(t) && P$.has(t.localName);
}
function Y$(e, t) {
  J$(t) ? t.nodeType === Node.ELEMENT_NODE && Ur(t) : e.removeChild(t);
}
function Ur(e) {
  for (const t of Array.from(e.attributes)) V$(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) Y$(e, t);
  return e;
}
function Q$(e) {
  return Array.from(e.matchAll(Pn), (t) => t[2]).filter((t) => t !== "");
}
function X$(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function Z$(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of Q$(l.value)) a.has(i) || a.set(i, `${t}-${a.size}`);
  return a;
}
function e0(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(Pn, (r, l, i) => {
      const s = t.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function t0(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = Z$(a, t);
  for (const l of a) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), e0(l, r);
  }
  return e;
}
function QL(e) {
  const t = O$(e);
  if (t === null) return F$();
  const a = [...D$(t), ...G$(t), ...U$(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(t0(Ur(t), X$(e))) };
}
const n0 = "Mark accepted.", a0 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, r0 = new Set(Ia.flatMap((e) => [ye(e, "id"), ye(e, "chip")]));
function l0(e) {
  return e !== void 0 && (a0.test(e) || r0.has(e)) ? e : void 0;
}
function o0({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: le.preview, style: { "--mark": l0(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: le.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: le.empty }) });
}
function i0(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function s0(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function c0({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: le.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: le.result, role: "status", children: /* @__PURE__ */ n("p", { className: le.accepted, children: n0 }) }) : /* @__PURE__ */ n("div", { className: le.result, role: "status", children: /* @__PURE__ */ n("ul", { className: le.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: le.reason, children: t }, t)) }) });
}
function d0({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(c0, { result: e }) : /* @__PURE__ */ n("p", { className: `${le.result} ${i0(e, a)}`, role: "status", children: s0(e, a) });
}
function pa(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function XL({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: l }) {
  const i = f(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ o("div", { className: le.upload, children: [
    /* @__PURE__ */ n(o0, { current: e }),
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
      /* @__PURE__ */ n(b, { ...pa(l), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...pa(l), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(d0, { result: s, presentation: r })
  ] });
}
const u0 = "_row_o3t6y_7", h0 = "_cell_o3t6y_11", m0 = "_head_o3t6y_28", w0 = "_name_o3t6y_34", _0 = "_pinned_o3t6y_42", f0 = "_headCell_o3t6y_49", v0 = "_webName_o3t6y_88", b0 = "_webMeta_o3t6y_95", p0 = "_webWarn_o3t6y_103", O = {
  row: u0,
  cell: h0,
  head: m0,
  name: w0,
  pinned: _0,
  headCell: f0,
  webName: v0,
  webMeta: b0,
  webWarn: p0
}, qn = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Vr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], g0 = Object.fromEntries(Vr.map((e) => [e.key, e]));
function y0(e, t) {
  return `mcp.${e}.${t}`;
}
function N0(e) {
  return Object.keys(qn).includes(e);
}
function k0(e) {
  return qn[e !== void 0 && N0(e) ? e : "unknown"];
}
function st({ column: e, children: t }) {
  const a = g0[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: O.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: t
    }
  );
}
function ZL() {
  return /* @__PURE__ */ n("tr", { children: Vr.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: O.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function $0({ server: e }) {
  const t = qn[e.connection];
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o(st, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: O.head, children: [
        /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Bn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: O.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(st, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(st, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(st, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(st, { column: "tools", children: e.tools.map((a) => y0(e.name, a)).join(" · ") })
  ] });
}
function C0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function S0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function R0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${O.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e });
}
function T0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function x0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function L0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o("td", { className: O.cell, children: [
      /* @__PURE__ */ n("span", { className: `${O.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: C0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...S0(e) }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(R0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...k0(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: O.cell, children: [
      /* @__PURE__ */ n(T0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(x0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function eA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(L0, { ...e }) : /* @__PURE__ */ n($0, { ...e });
}
const A0 = "_row_1ibo7_2", E0 = "_headCell_1ibo7_14", I0 = "_cell_1ibo7_15", M0 = "_name_1ibo7_26", j0 = "_consequence_1ibo7_32", B0 = "_reason_1ibo7_38", P0 = "_value_1ibo7_44", q0 = "_webRow_1ibo7_60", H0 = "_webSetting_1ibo7_73", F0 = "_webName_1ibo7_81", O0 = "_webConsequence_1ibo7_89", D0 = "_webControl_1ibo7_95", z0 = "_webState_1ibo7_109", W0 = "_webChip_1ibo7_114", P = {
  row: A0,
  headCell: E0,
  cell: I0,
  name: M0,
  consequence: j0,
  reason: B0,
  value: P0,
  webRow: q0,
  webSetting: H0,
  webName: F0,
  webConsequence: O0,
  webControl: D0,
  webState: z0,
  webChip: W0
}, Jr = 104, Yr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function K0({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ye, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(cr, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: P.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function G0({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = y(), i = Yr[a], s = a === "locked";
  return /* @__PURE__ */ o("tr", { className: P.row, "data-inheritance": a, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: P.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(K0, { control: t, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: P.cell, style: { width: Jr }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function Qr(e, t) {
  return String(e ?? t);
}
function U0(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function V0(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? Qr(e.value, "—");
}
function J0({ control: e, name: t, locked: a, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: P.webControl, children: [
    /* @__PURE__ */ n(Ye, { label: t, labelHidden: !0, checked: i, locked: a, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: P.webState, "aria-hidden": "true", children: a || i ? "on" : "off" })
  ] });
}
function Y0(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(J0, { ...e });
  const l = U0(t, a);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: P.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(cr, { options: l, value: Qr(t.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: V0(t) });
}
function Q0({ setting: e, control: t, inheritance: a, reason: r, onChange: l, renderControl: i }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ o("div", { className: `${P.row} ${P.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ o("span", { className: P.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${P.name} ${P.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${P.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: P.webControl, children: i(s) }) : /* @__PURE__ */ n(Y0, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${P.webChip} ward-policy-chip`, style: { width: Jr }, children: /* @__PURE__ */ n(m, { ...Yr[a], size: "tag" }) })
  ] });
}
function tA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Q0, { ...e }) : /* @__PURE__ */ n(G0, { ...e });
}
const X0 = "_label_h9m4w_7", Z0 = "_name_h9m4w_15", eC = "_column_h9m4w_24", tC = "_webFrame_h9m4w_57", nC = "_webHead_h9m4w_62", aC = "_webHeadLabel_h9m4w_74", rC = "_webLabel_h9m4w_117", lC = "_webColumns_h9m4w_124", oC = "_webGroup_h9m4w_130", iC = "_webPeople_h9m4w_131", sC = "_webVia_h9m4w_132", cC = "_webMeta_h9m4w_161", G = {
  label: X0,
  name: Z0,
  column: eC,
  webFrame: tC,
  webHead: nC,
  webHeadLabel: aC,
  webLabel: rC,
  webColumns: lC,
  webGroup: oC,
  webPeople: iC,
  webVia: sC,
  webMeta: cC
}, dC = {
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
function uC(e) {
  if (!e.matrixRole) return;
  const t = dC[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function hC({ node: e }) {
  const t = uC(e);
  return /* @__PURE__ */ o("span", { className: G.label, children: [
    /* @__PURE__ */ n("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ n(mC, { role: t, node: e }),
    /* @__PURE__ */ n(on, { column: ln[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(on, { column: ln[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(on, { column: ln[2], children: e.requestedVia ?? "" })
  ] });
}
function mC({ role: e, node: t }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function wC({ index: e, depth: t, node: a, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    fr,
    {
      index: e,
      depth: t,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(hC, { node: a }),
      children: s
    }
  );
}
function sn({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function _C({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${G.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(sn, { className: `${G.webMeta} ${G.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(sn, { className: `${G.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(sn, { className: `${G.webMeta} ${G.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function fC() {
  return /* @__PURE__ */ o("div", { className: G.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: G.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: G.webColumns, children: [
      /* @__PURE__ */ n("span", { className: G.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: G.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: G.webVia, children: "Requested via" })
    ] })
  ] });
}
function vC({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${G.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function bC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function pC({ rows: e, label: t }) {
  return /* @__PURE__ */ o("div", { className: G.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(fC, {}),
    /* @__PURE__ */ n(Jw, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      fr,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(vC, { row: a }),
        detail: /* @__PURE__ */ n(_C, { row: a }),
        expanded: bC(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function nA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(pC, { ...e }) : /* @__PURE__ */ n(wC, { ...e });
}
const gC = "_runbook_b9agc_2", yC = "_list_b9agc_7", NC = "_step_b9agc_15", kC = "_numeral_b9agc_21", $C = "_body_b9agc_28", CC = "_head_b9agc_34", SC = "_title_b9agc_40", RC = "_detail_b9agc_45", TC = "_actions_b9agc_50", xC = "_webList_b9agc_56", LC = "_webStep_b9agc_60", AC = "_webBody_b9agc_66", EC = "_webTitle_b9agc_74", IC = "_webDetail_b9agc_78", M = {
  runbook: gC,
  list: yC,
  step: NC,
  numeral: kC,
  body: $C,
  head: CC,
  title: SC,
  detail: RC,
  actions: TC,
  webList: xC,
  webStep: LC,
  webBody: AC,
  webTitle: EC,
  webDetail: IC
}, Xr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Zr(e) {
  return String(e + 1).padStart(2, "0");
}
function MC({ step: e, index: t, connection: a }) {
  const r = Xr[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: M.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: M.numeral, children: Zr(t) }),
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
function jC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ o("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: M.list, children: e.map((r, l) => /* @__PURE__ */ n(MC, { step: r, index: l, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: M.actions, children: t })
  ] });
}
function BC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ o("li", { className: `${M.step} ${M.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${M.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Zr(t) }),
    /* @__PURE__ */ o("span", { className: `${M.body} ${M.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${M.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${M.title} ${M.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Xr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Ee, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${M.detail} ${M.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function PC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ o("div", { className: M.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${M.list} ${M.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(BC, { step: r, index: l, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${M.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function aA(e) {
  return "presentation" in e ? /* @__PURE__ */ n(PC, { ...e }) : /* @__PURE__ */ n(jC, { ...e });
}
const qC = "_list_1gu6a_2", HC = "_check_1gu6a_10", FC = "_body_1gu6a_16", OC = "_text_1gu6a_23", DC = "_pending_1gu6a_32", zC = "_measured_1gu6a_37", nt = {
  list: qC,
  check: HC,
  body: FC,
  text: OC,
  pending: DC,
  measured: zC
};
function WC(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function KC({ check: e }) {
  const t = WC(e.passed);
  return /* @__PURE__ */ o("li", { className: `${nt.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Ln, { state: t.state, label: t.label }),
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
function rA({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${nt.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(KC, { check: t }, t.text)) });
}
const GC = "_root_y6bbq_2", UC = "_list_y6bbq_10", VC = "_line_y6bbq_32", JC = "_at_y6bbq_59", YC = "_text_y6bbq_63", QC = "_foot_y6bbq_67", XC = "_idle_y6bbq_79", ZC = "_caret_y6bbq_87", eS = "_jump_y6bbq_94", be = {
  root: GC,
  list: UC,
  line: VC,
  at: JC,
  text: YC,
  foot: QC,
  idle: XC,
  caret: ZC,
  jump: eS
}, tS = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Hn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : tS.format(new Date(e));
}
const nS = { warn: "warning", ok: "ok" };
function aS({ kind: e }) {
  const t = nS[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function rS({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Hn(e)}` });
}
function lS({ connection: e, idleSince: t, last: a, children: r }) {
  const l = [t, a == null ? void 0 : a.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Hn(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${be.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${be.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: be.idle, children: i }),
    /* @__PURE__ */ n(rS, { at: a == null ? void 0 : a.at }),
    r
  ] });
}
const oS = 8;
function iS(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > oS;
}
function sS({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${be.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const el = ke(null);
function lA({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, l] = p(!1), i = Ra(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(el.Provider, { value: i, children: a });
}
function cS() {
  const e = Ne(el), [t, a] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const dS = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function oA({ lines: e, connection: t, idleSince: a, label: r = "Live activity", fixed: l }) {
  const i = f(null), [s, c] = p(0), [d, u] = cS(), [h, w] = p(!1), _ = e.at(-1);
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
    /* @__PURE__ */ n("ol", { className: be.list, ref: i, "aria-live": d ? "polite" : "off", "aria-label": r, ...dS(e.length, l), onScroll: (k) => w(iS(k.currentTarget)), children: e.map((k, E) => /* @__PURE__ */ o("li", { className: `${be.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": E < s, children: [
      /* @__PURE__ */ n("span", { className: be.at, children: Hn(k.at) }),
      /* @__PURE__ */ n(aS, { kind: k.kind }),
      /* @__PURE__ */ n("span", { className: be.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${E}`)) }),
    /* @__PURE__ */ o(lS, { connection: t, idleSince: a, last: _, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${be.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(sS, { shown: h, onJump: N })
    ] })
  ] });
}
const uS = "_row_1k8wl_2", hS = "_head_1k8wl_14", mS = "_author_1k8wl_20", wS = "_eta_1k8wl_25", _S = "_edited_1k8wl_26", fS = "_body_1k8wl_32", vS = "_reason_1k8wl_37", bS = "_actions_1k8wl_42", Se = {
  row: uS,
  head: hS,
  author: mS,
  eta: wS,
  edited: _S,
  body: fS,
  reason: vS,
  actions: bS
}, pS = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function gS(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function yS({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function NS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Se.reason, id: t, children: e })
  ] });
}
function kS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function $S(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(yS, { ...e }) : /* @__PURE__ */ n(NS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function iA(e) {
  const { comment: t } = e;
  kS(e);
  const a = y(), r = `${a}-unavailable`, l = pS[t.delivery];
  return /* @__PURE__ */ o("div", { className: `${Se.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Se.head, children: [
      /* @__PURE__ */ n("span", { className: Se.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: Se.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Se.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Se.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Se.reason, id: a, children: gS(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Se.actions, children: /* @__PURE__ */ n($S, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const CS = "_root_rvhdw_2", SS = "_attach_rvhdw_11", RS = "_actions_rvhdw_17", TS = "_reply_rvhdw_23", xS = "_replyField_rvhdw_28", LS = "_send_rvhdw_54", AS = "_sendIcon_rvhdw_65", ES = "_sendsAs_rvhdw_75", Oe = {
  root: CS,
  attach: SS,
  actions: RS,
  reply: TS,
  replyField: xS,
  send: LS,
  sendIcon: AS,
  sendsAs: ES
};
function tl({ value: e, onChange: t }) {
  const [a, r] = p("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function IS() {
  return /* @__PURE__ */ n("svg", { className: Oe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function MS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function jS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [l, i] = tl(e), s = y(), c = () => {
    l.trim() !== "" && r(a, l);
  }, d = (u) => {
    MS(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: Oe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Oe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ n(q, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: Oe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ n(IS, {}),
        /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Oe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function sA(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(jS, { ...e }) : /* @__PURE__ */ n(BS, { ...e });
}
function BS(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = tl(e);
  return /* @__PURE__ */ o("div", { className: Oe.root, children: [
    /* @__PURE__ */ n(q, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: Oe.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ n(
      Da,
      {
        label: `Requeue ${l.agent} after posting`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Oe.actions, children: [
      /* @__PURE__ */ n(b, { variant: "primary", onClick: () => i(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const PS = "_list_1yhks_2", qS = "_item_1yhks_6", HS = "_body_1yhks_22", FS = "_text_1yhks_28", OS = "_evidence_1yhks_37", DS = "_consequence_1yhks_49", zS = "_note_1yhks_54", Je = {
  list: PS,
  item: qS,
  body: HS,
  text: FS,
  evidence: OS,
  consequence: DS,
  note: zS
};
function WS({ criterion: e }) {
  return /* @__PURE__ */ n(We, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function ga({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function KS(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function GS({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Je.body, children: [
    /* @__PURE__ */ n("span", { className: Je.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ n(ga, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Je.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ n(ga, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Je.consequence, children: KS(e.why) })
    ] })
  ] });
}
function US({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Je.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(WS, { criterion: e }),
    /* @__PURE__ */ n(GS, { criterion: e })
  ] });
}
function cA({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Je.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(US, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ n("p", { className: Je.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const VS = "_list_dwhoz_2", JS = "_rung_dwhoz_6", YS = "_name_dwhoz_18", QS = "_actor_dwhoz_32", It = {
  list: VS,
  rung: JS,
  name: YS,
  actor: QS
}, XS = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function ZS({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = XS[e.state];
  return /* @__PURE__ */ o("li", { className: It.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: It.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${It.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function dA({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${It.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(ZS, { rung: t }, t.name)) });
}
const e2 = "_sheet_pw37w_2", t2 = "_title_pw37w_9", n2 = "_stage_pw37w_15", a2 = "_effects_pw37w_20", r2 = "_effect_pw37w_20", l2 = "_numeral_pw37w_31", o2 = "_effectText_pw37w_38", i2 = "_refusals_pw37w_43", s2 = "_reasons_pw37w_52", c2 = "_reason_pw37w_52", d2 = "_actions_pw37w_62", we = {
  sheet: e2,
  title: t2,
  stage: n2,
  effects: a2,
  effect: r2,
  numeral: l2,
  effectText: o2,
  refusals: i2,
  reasons: s2,
  reason: c2,
  actions: d2
};
function u2({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function uA({ run: e, effects: t, refusals: a, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
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
      Tm,
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
      /* @__PURE__ */ n(u2, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const h2 = "_list_1laeg_2", m2 = "_path_1laeg_7", w2 = "_head_1laeg_21", _2 = "_label_1laeg_28", f2 = "_consequence_1laeg_35", ut = {
  list: h2,
  path: m2,
  head: w2,
  label: _2,
  consequence: f2
}, bn = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function ya(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Na(e) {
  return e ? "primary" : "secondary";
}
function v2({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: Na(t), size: "sm", onClick: () => a(e.kind), children: bn[e.kind] }) : /* @__PURE__ */ n(b, { variant: Na(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: bn[e.kind] });
}
function b2({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: ut.path, "data-allowed": e.allowed, "data-role": ya(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: ut.head, children: [
      /* @__PURE__ */ n("span", { className: ut.label, children: e.title ?? bn[e.kind] }),
      /* @__PURE__ */ n(m, { role: ya(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: ut.consequence, children: e.consequence }),
    /* @__PURE__ */ n(v2, { path: e, primary: t, onChoose: a })
  ] });
}
function hA({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: ut.list, children: e.map((a, r) => /* @__PURE__ */ n(b2, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const p2 = "_list_1m7i0_2", g2 = "_item_1m7i0_6", y2 = "_node_1m7i0_18", N2 = "_body_1m7i0_24", k2 = "_head_1m7i0_30", $2 = "_stage_1m7i0_36", C2 = "_version_1m7i0_41", S2 = "_sentence_1m7i0_49", R2 = "_meta_1m7i0_54", Te = {
  list: p2,
  item: g2,
  node: y2,
  body: N2,
  head: k2,
  stage: $2,
  version: C2,
  sentence: S2,
  meta: R2
}, T2 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function x2({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Te.head, children: [
    /* @__PURE__ */ n("span", { className: Te.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Te.version, title: e.version, children: e.version }) : null
  ] });
}
function L2({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Te.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Te.node} ward-history-node`, children: /* @__PURE__ */ n(We, { size: 9, kind: T2[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Te.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(x2, { entry: e }),
      /* @__PURE__ */ n("span", { className: Te.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Te.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${oe(e.cost)}`
      ] })
    ] })
  ] });
}
function mA({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Te.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(L2, { entry: t }, t.stage + String(a))) });
}
const A2 = "_thread_1e70p_3", E2 = "_turn_1e70p_8", I2 = "_who_1e70p_27", M2 = "_body_1e70p_32", Mt = {
  thread: A2,
  turn: E2,
  who: I2,
  body: M2
}, nl = ke(!1);
function wA({ children: e, density: t }) {
  return /* @__PURE__ */ n(nl.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${Mt.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function _A({ turn: e }) {
  if (!Ne(nl)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${Mt.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${Mt.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${Mt.body} ward-chat-body`, children: e.body })
  ] });
}
const j2 = "_list_yiolt_3", B2 = "_row_yiolt_7", P2 = "_label_yiolt_20", q2 = "_n_yiolt_26", H2 = "_cause_yiolt_33", wt = {
  list: j2,
  row: B2,
  label: P2,
  n: q2,
  cause: H2
};
function F2(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const O2 = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function D2({ row: e, formatNumber: t }) {
  return F2(e), /* @__PURE__ */ o("li", { className: `${wt.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(We, { size: 8, ...O2[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: wt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${wt.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(z2, { cause: e.cause })
  ] });
}
function z2({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${wt.cause} ward-healthrow-cause`, children: e }) : null;
}
function fA({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${wt.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(D2, { row: a, formatNumber: t }, a.label)) });
}
const W2 = "_root_1jxwp_2", K2 = {
  root: W2
};
function vA({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: K2.root, "data-density": l, children: [
    /* @__PURE__ */ n(Qt, { items: e, note: t, density: l }),
    /* @__PURE__ */ n(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const G2 = "_row_dhbre_3", U2 = "_key_dhbre_13", V2 = "_stack_dhbre_24", J2 = "_value_dhbre_32", Y2 = "_evidence_dhbre_39", Q2 = "_mark_dhbre_47", et = {
  row: G2,
  key: U2,
  stack: V2,
  value: J2,
  evidence: Y2,
  mark: Q2
};
function X2({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(Ln, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function bA({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${et.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${et.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${et.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${et.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${et.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${et.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(X2, { state: e.state }) })
  ] });
}
const Z2 = "_cell_gh2sd_2", eR = {
  cell: Z2
}, tR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function nR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function aR(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function rR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: nR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function lR(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function pA({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  aR(e, a);
  const r = lR(e);
  return /* @__PURE__ */ n(
    Dm,
    {
      label: "Rejection routing",
      columns: tR,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: eR.cell, "data-norerun": l.noRerun ? !0 : void 0, children: rR(l, i) }),
      empty: t ?? /* @__PURE__ */ n(j_, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const oR = "_row_1f2re_2", iR = "_title_1f2re_12", sR = "_turns_1f2re_18", cR = "_waiting_1f2re_19", dR = "_resolved_1f2re_20", uR = "_activity_1f2re_21", hR = "_cost_1f2re_28", mR = "_link_1f2re_29", wR = "_tableLink_1f2re_47", _R = "_tableRecord_1f2re_48", fR = "_tableRow_1f2re_59", vR = "_tableTitle_1f2re_71", bR = "_tableResolved_1f2re_76", pR = "_tableMeta_1f2re_87", gR = "_tableCost_1f2re_94", yR = "_tableActivity_1f2re_95", NR = "_tableState_1f2re_105", z = {
  row: oR,
  title: iR,
  turns: sR,
  waiting: cR,
  resolved: dR,
  activity: uR,
  cost: hR,
  link: mR,
  tableLink: wR,
  tableRecord: _R,
  tableRow: fR,
  tableTitle: vR,
  tableResolved: bR,
  tableMeta: pR,
  tableCost: gR,
  tableActivity: yR,
  tableState: NR
}, al = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function kR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function $R(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function CR(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const SR = { duplicate: "Closed · duplicate" };
function RR({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(lt, { className: z.tableMeta, text: `waiting on ${e}` });
}
function TR({ value: e }) {
  return /* @__PURE__ */ n("td", { className: z.tableCost, children: e === void 0 ? null : oe(e) });
}
function xR({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${z.tableRecord} ward-target`, href: x(e.href), children: `→ ${e.key}` });
}
function LR({ session: e, href: t }) {
  const a = al[e.state];
  return /* @__PURE__ */ o("tr", { className: z.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: z.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${z.tableLink} ward-target`, href: x(t), children: /* @__PURE__ */ n(lt, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: z.tableMeta, children: $R(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: z.tableResolved, children: [
      CR(e.resolved),
      /* @__PURE__ */ n(RR, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(TR, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: z.tableActivity, children: kR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: z.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: SR[e.state] ?? a.label }),
      /* @__PURE__ */ n(xR, { link: e.link })
    ] }) })
  ] });
}
function AR({ session: e }) {
  const t = al[e.state];
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
function gA(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(LR, { session: e.session, href: e.href }) : /* @__PURE__ */ n(AR, { session: e.session });
}
const ER = "_block_1yy2v_3", IR = "_list_1yy2v_9", MR = "_line_1yy2v_14", pn = {
  block: ER,
  list: IR,
  line: MR
}, jR = { warn: "warning", ok: "ok" };
function BR({ kind: e }) {
  const t = jR[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function PR({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${pn.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(BR, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function yA({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${pn.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: pn.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(PR, { line: a }, `${r}-${a.text}`)) }) });
}
const qR = "_band_tt7hp_1", HR = "_head_tt7hp_8", FR = "_cell_tt7hp_19", OR = "_index_tt7hp_35", DR = "_title_tt7hp_42", zR = "_note_tt7hp_48", WR = "_cellTitle_tt7hp_53", KR = "_cellBody_tt7hp_58", GR = "_tag_tt7hp_64", Ce = {
  band: qR,
  head: HR,
  cell: FR,
  index: OR,
  title: DR,
  note: zR,
  cellTitle: WR,
  cellBody: KR,
  tag: GR
}, ka = 4;
function NA({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== ka)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${ka}-cell grid`);
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
const UR = "_tag_1yuvz_2", VR = "_link_1yuvz_14", cn = {
  tag: UR,
  link: VR
};
function rl({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: cn.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${cn.tag} ${cn.link}`, href: x(t), children: e });
}
const JR = "_eyebrow_m8swv_2", YR = "_link_m8swv_10", $a = {
  eyebrow: JR,
  link: YR
};
function Xt({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: $a.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${$a.link} ward-target`, href: x(t), children: e }) });
}
const QR = "_figure_qz9i7_2", XR = "_media_qz9i7_9", ZR = "_caption_qz9i7_35", dn = {
  figure: QR,
  media: XR,
  caption: ZR
};
function eT(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(T, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function gn(e) {
  return /* @__PURE__ */ o("figure", { className: dn.figure, children: [
    /* @__PURE__ */ n("div", { className: dn.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(eT, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: dn.caption, children: e.caption })
  ] });
}
function gt(e) {
  return `h${e}`;
}
function tT(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const nT = "_prose_1fxb9_2", aT = "_anchor_1fxb9_79", ll = {
  prose: nT,
  anchor: aT
};
function Ca({ children: e }) {
  return /* @__PURE__ */ n("div", { className: ll.prose, children: e });
}
function kA({ level: e, children: t, id: a }) {
  const r = gt(e), l = a ?? tT(t);
  return /* @__PURE__ */ o(r, { id: l, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${ll.anchor} ward-target`, href: `#${l}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const rT = "_list_176jq_2", lT = "_pair_176jq_8", oT = "_term_176jq_14", iT = "_value_176jq_19", St = {
  list: rT,
  pair: lT,
  term: oT,
  value: iT
};
function sT({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: St.list, children: e.map((t) => /* @__PURE__ */ o("div", { className: St.pair, children: [
    /* @__PURE__ */ n("dt", { className: St.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: St.value, children: t.value })
  ] }, t.term)) });
}
const cT = "_nav_sgeyg_2", dT = "_item_sgeyg_6", uT = "_link_sgeyg_13", hT = "_note_sgeyg_30", Rt = {
  nav: cT,
  item: dT,
  link: uT,
  note: hT
};
function mT({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: Rt.nav, children: /* @__PURE__ */ n(Km, { children: t.map((a) => /* @__PURE__ */ o("li", { className: Rt.item, children: [
    /* @__PURE__ */ n("a", { className: `${Rt.link} ward-target`, href: x(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: Rt.note, children: a.note })
  ] }, a.href)) }) });
}
const wT = "_header_kelio_2", _T = "_skip_kelio_14", fT = "_brand_kelio_39", vT = "_list_kelio_46", bT = "_link_kelio_56", tt = {
  header: wT,
  skip: _T,
  brand: fT,
  list: vT,
  link: bT
};
function $A({ brand: e, links: t, current: a, homeHref: r = "/", mainId: l = "main", skipLabel: i = "Skip to content" }) {
  return /* @__PURE__ */ o("header", { className: tt.header, children: [
    /* @__PURE__ */ n("a", { className: tt.skip, href: `#${l}`, children: i }),
    /* @__PURE__ */ n("a", { className: `${tt.brand} ward-target`, href: x(r), children: e }),
    /* @__PURE__ */ n("nav", { "aria-label": "Main", className: tt.nav, children: /* @__PURE__ */ n("ul", { className: tt.list, role: "list", children: t.map((s) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${tt.link} ward-target`, href: x(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const pT = "_footer_1jb5e_2", gT = "_note_1jb5e_12", yT = "_list_1jb5e_18", NT = "_link_1jb5e_27", Tt = {
  footer: pT,
  note: gT,
  list: yT,
  link: NT
};
function CA({ note: e, links: t = [], label: a = "Footer" }) {
  return /* @__PURE__ */ o("footer", { className: Tt.footer, children: [
    /* @__PURE__ */ n("p", { className: Tt.note, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("nav", { "aria-label": a, children: /* @__PURE__ */ n("ul", { className: Tt.list, role: "list", children: t.map((r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${Tt.link} ward-target`, href: x(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const kT = "_intro_13128_2", $T = "_title_13128_9", CT = "_lead_13128_17", un = {
  intro: kT,
  title: $T,
  lead: CT
};
function ol({ title: e, eyebrow: t, eyebrowHref: a, lead: r, headingLevel: l = 1, children: i }) {
  const s = gt(l);
  return /* @__PURE__ */ o("header", { className: un.intro, children: [
    t === void 0 ? null : /* @__PURE__ */ n(Xt, { href: a, children: t }),
    /* @__PURE__ */ n(s, { className: un.title, children: e }),
    r === void 0 ? null : /* @__PURE__ */ n("p", { className: un.lead, children: r }),
    i
  ] });
}
const ST = "_section_u0k7p_2", RT = "_head_u0k7p_13", TT = "_titles_u0k7p_21", xT = "_title_u0k7p_21", LT = "_link_u0k7p_34", ht = {
  section: ST,
  head: RT,
  titles: TT,
  title: xT,
  link: LT
};
function AT({ title: e, headingId: t, eyebrow: a, link: r, headingLevel: l }) {
  const i = gt(l);
  return /* @__PURE__ */ o("div", { className: ht.head, children: [
    /* @__PURE__ */ o("div", { className: ht.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ n(Xt, { children: a }),
      /* @__PURE__ */ n(i, { className: ht.title, id: t, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ n("a", { className: `${ht.link} ward-target`, href: x(r.href), children: r.label })
  ] });
}
function SA({ title: e, children: t, id: a, eyebrow: r, link: l, headingLevel: i = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ o("section", { className: ht.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ n(AT, { title: e, headingId: d, eyebrow: r, link: l, headingLevel: i }),
    t
  ] });
}
const ET = "_split_1ycaa_2", IT = "_main_1ycaa_10", MT = "_aside_1ycaa_15", hn = {
  split: ET,
  main: IT,
  aside: MT
};
function jT({ children: e, aside: t, asideLabel: a }) {
  return /* @__PURE__ */ o("div", { className: hn.split, children: [
    /* @__PURE__ */ n("div", { className: hn.main, children: e }),
    /* @__PURE__ */ n("aside", { className: hn.aside, "aria-label": a, children: t })
  ] });
}
const BT = "_hero_ehbct_2", PT = "_text_ehbct_11", qT = "_visual_ehbct_23", HT = "_title_ehbct_28", FT = "_lead_ehbct_36", OT = "_actions_ehbct_42", DT = "_action_ehbct_42", zT = "_primary_ehbct_63", WT = "_secondary_ehbct_72", Ae = {
  hero: BT,
  text: PT,
  visual: qT,
  title: HT,
  lead: FT,
  actions: OT,
  action: DT,
  primary: zT,
  secondary: WT
};
function KT({ actions: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ n("div", { className: Ae.actions, children: e.map((t, a) => /* @__PURE__ */ n("a", { className: `${Ae.action} ${a === 0 ? Ae.primary : Ae.secondary}`, href: x(t.href), children: t.label }, t.href)) });
}
function GT({ title: e, eyebrow: t, lead: a, actions: r = [] }) {
  return /* @__PURE__ */ o("div", { className: Ae.text, children: [
    t === void 0 ? null : /* @__PURE__ */ n(Xt, { children: t }),
    /* @__PURE__ */ n("h1", { className: Ae.title, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("p", { className: Ae.lead, children: a }),
    /* @__PURE__ */ n(KT, { actions: r })
  ] });
}
function RA({ visual: e, ...t }) {
  return /* @__PURE__ */ o("div", { className: Ae.hero, "data-visual": e === void 0 ? "none" : "beside", children: [
    /* @__PURE__ */ n(GT, { ...t }),
    e === void 0 ? null : /* @__PURE__ */ n("div", { className: Ae.visual, children: e })
  ] });
}
const UT = "_chain_w2k2l_2", VT = "_step_w2k2l_12", JT = "_arrow_w2k2l_19", YT = "_box_w2k2l_24", xt = {
  chain: UT,
  step: VT,
  arrow: JT,
  box: YT
};
function TA({ steps: e, label: t, animate: a }) {
  return /* @__PURE__ */ n("ol", { className: xt.chain, "aria-label": t, "data-ward-animate": a ?? "", children: e.map((r, l) => /* @__PURE__ */ o("li", { className: xt.step, style: { "--ward-step": l }, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: xt.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n("span", { className: xt.box, children: r })
  ] }, l)) });
}
const QT = "_card_1u2gr_2", XT = "_featured_1u2gr_20", ZT = "_media_1u2gr_28", ex = "_body_1u2gr_32", tx = "_title_1u2gr_48", nx = "_link_1u2gr_60", ax = "_summary_1u2gr_78", rx = "_tags_1u2gr_84", lx = "_cta_1u2gr_90", fe = {
  card: QT,
  featured: XT,
  media: ZT,
  body: ex,
  title: tx,
  link: nx,
  summary: ax,
  tags: rx,
  cta: lx
};
function il({ media: e, ratio: t = "16/9" }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: fe.media, children: /* @__PURE__ */ n(gn, { ratio: t, children: e }) });
}
function ox({ href: e, title: t, headingLevel: a = 3 }) {
  const r = gt(a);
  return /* @__PURE__ */ n(r, { className: fe.title, children: /* @__PURE__ */ n("a", { className: fe.link, href: x(e), children: t }) });
}
function sl({ eyebrow: e, ...t }) {
  return /* @__PURE__ */ o(T, { children: [
    e === void 0 ? null : /* @__PURE__ */ n(Xt, { children: e }),
    /* @__PURE__ */ n(ox, { ...t })
  ] });
}
function cl({ summary: e, tags: t = [] }) {
  return /* @__PURE__ */ o(T, { children: [
    e === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.summary, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("span", { className: fe.tags, children: t.map((a) => /* @__PURE__ */ n(rl, { label: a }, a)) })
  ] });
}
function xA({ media: e, ratio: t, eyebrow: a, summary: r, tags: l, ...i }) {
  return /* @__PURE__ */ o("article", { className: fe.card, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(il, { media: e, ratio: t }),
    /* @__PURE__ */ o("div", { className: fe.body, children: [
      /* @__PURE__ */ n(sl, { eyebrow: a, ...i }),
      /* @__PURE__ */ n(cl, { summary: r, tags: l })
    ] })
  ] });
}
function LA({ media: e, ratio: t, eyebrow: a, summary: r, tags: l, cta: i, ...s }) {
  return /* @__PURE__ */ o("article", { className: `${fe.card} ${fe.featured}`, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(il, { media: e, ratio: t }),
    /* @__PURE__ */ o("div", { className: fe.body, children: [
      /* @__PURE__ */ n(sl, { eyebrow: a, ...s }),
      /* @__PURE__ */ n(cl, { summary: r, tags: l }),
      i === void 0 ? null : /* @__PURE__ */ o("span", { className: fe.cta, "aria-hidden": "true", children: [
        i,
        " →"
      ] })
    ] })
  ] });
}
const ix = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function sx(e) {
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : `${t.getUTCDate()} ${ix[t.getUTCMonth()]} ${t.getUTCFullYear()}`;
}
const cx = "_row_1peme_2", dx = "_title_1peme_15", ux = "_link_1peme_23", hx = "_meta_1peme_40", mx = "_summary_1peme_46", ct = {
  row: cx,
  title: dx,
  link: ux,
  meta: hx,
  summary: mx
};
function AA({ href: e, title: t, date: a, meta: r, summary: l, headingLevel: i = 3 }) {
  const s = gt(i);
  return /* @__PURE__ */ o("article", { className: ct.row, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(s, { className: ct.title, children: /* @__PURE__ */ n("a", { className: ct.link, href: x(e), children: t }) }),
    /* @__PURE__ */ o("p", { className: ct.meta, children: [
      /* @__PURE__ */ n("time", { dateTime: a, children: sx(a) }),
      r === void 0 ? null : ` · ${r}`
    ] }),
    l === void 0 ? null : /* @__PURE__ */ n("p", { className: ct.summary, children: l })
  ] });
}
const wx = "_list_dd8kj_2", _x = "_item_dd8kj_16", Sa = {
  list: wx,
  item: _x
};
function EA({ children: e, rules: t = !1, label: a }) {
  return /* @__PURE__ */ n("ul", { className: Sa.list, role: "list", "aria-label": a, "data-rules": t, children: xa.toArray(e).map((r, l) => /* @__PURE__ */ n("li", { className: Sa.item, children: r }, l)) });
}
const fx = "_page_i3r2z_2", vx = "_aside_i3r2z_8", bx = "_tags_i3r2z_13", Fn = {
  page: fx,
  aside: vx,
  tags: bx
};
function px({ labels: e }) {
  return /* @__PURE__ */ n("span", { className: Fn.tags, children: e.map((t) => /* @__PURE__ */ n(rl, { label: t }, t)) });
}
function gx(e) {
  return e[1] !== void 0 && e[1].length > 0;
}
function yx(e) {
  return e.filter(gx).map(([t, a]) => ({
    term: t,
    value: typeof a == "string" ? a : /* @__PURE__ */ n(px, { labels: a })
  }));
}
function Nx({ facts: e, links: t, linksLabel: a }) {
  return /* @__PURE__ */ o("div", { className: Fn.aside, children: [
    e.length === 0 ? null : /* @__PURE__ */ n(sT, { facts: e }),
    t === void 0 || t.length === 0 ? null : /* @__PURE__ */ n(mT, { label: a, links: t })
  ] });
}
function dl({ facts: e, links: t = [], linksLabel: a, asideLabel: r, children: l }) {
  return e.length === 0 && t.length === 0 ? /* @__PURE__ */ n(Ca, { children: l }) : /* @__PURE__ */ n(jT, { asideLabel: r, aside: /* @__PURE__ */ n(Nx, { facts: e, links: t, linksLabel: a }), children: /* @__PURE__ */ n(Ca, { children: l }) });
}
function IA({ title: e, summary: t, children: a, eyebrow: r, eyebrowHref: l, role: i, period: s, focus: c, stack: d, related: u }) {
  const h = yx([
    ["Role", i],
    ["Period", s],
    ["Focus", c],
    ["Stack", d]
  ]);
  return /* @__PURE__ */ o("article", { className: Fn.page, children: [
    /* @__PURE__ */ n(ol, { title: e, lead: t, eyebrow: r, eyebrowHref: l }),
    /* @__PURE__ */ n(dl, { facts: h, links: u, linksLabel: "Related", asideLabel: "Case study facts", children: a })
  ] });
}
const kx = "_page_1junb_2", $x = "_source_1junb_8", Cx = "_shots_1junb_30", yn = {
  page: kx,
  source: $x,
  shots: Cx
};
function Sx({ shots: e, ratio: t }) {
  return e.length === 0 ? null : e.length === 1 ? /* @__PURE__ */ n(gn, { ...e[0], ratio: t }) : /* @__PURE__ */ n("ul", { className: yn.shots, role: "list", "aria-label": "Screenshots", children: e.map((a, r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(gn, { ...a, ratio: t }) }, r)) });
}
function MA(e) {
  const { title: t, summary: a, children: r, source: l, facts: i = [], screenshots: s = [], ratio: c = "16/9" } = e;
  return /* @__PURE__ */ o("article", { className: yn.page, children: [
    /* @__PURE__ */ n(ol, { title: t, lead: a, eyebrow: e.eyebrow, eyebrowHref: e.eyebrowHref, children: /* @__PURE__ */ n("a", { className: yn.source, href: x(l.href), children: l.label }) }),
    /* @__PURE__ */ n(Sx, { shots: s, ratio: c }),
    /* @__PURE__ */ n(dl, { facts: i, linksLabel: "Links", asideLabel: "Project facts", children: r })
  ] });
}
export {
  Px as ACCENT_PRESETS,
  oL as ActionStack,
  oA as ActivityConsole,
  Kx as AdminIcon,
  tp as AgentCard,
  Ux as AppShell,
  WL as AppearanceStrip,
  NA as Band,
  rL as BarChart,
  vf as BoardColumn,
  kL as BoardFootnote,
  $L as BoardHeader,
  zx as BoardIcon,
  wL as BoardScroller,
  b as Btn,
  Bx as CHIP_ROLES,
  Dr as CREDENTIAL_COLUMNS,
  aL as Callout,
  KL as CapabilityRow,
  fL as CardGrid,
  IA as CaseStudy,
  _A as ChatMessage,
  Da as Checkbox,
  m as Chip,
  lt as ClampText,
  iA as ClarificationRow,
  ML as ClauseRuleRow,
  IL as ClauseRules,
  Nr as ColourLadder,
  GL as ComponentRow,
  sA as Composer,
  SL as ConfigRow,
  CL as ConfigRowHead,
  An as ConnectionMark,
  lA as ConsoleAnnounceProvider,
  wA as Conversation,
  Tm as CostMeter,
  VL as CredentialRow,
  UL as CredentialRowHead,
  cA as CriteriaList,
  Qs as Crumb,
  qx as DENSITIES,
  fA as DeliveryHealth,
  bL as DeniedState,
  Ox as DisabledScope,
  BL as DryRunRail,
  j_ as EmptyState,
  JL as EnvCard,
  Xt as Eyebrow,
  sT as FactList,
  LA as FeaturedCard,
  q as Field,
  gn as Figure,
  vL as FilteredEmpty,
  TA as FlowChain,
  Vx as FoldText,
  hL as FormStack,
  Qt as GateChecklist,
  dA as GateLadder,
  Dm as Grid,
  qL as HandoffRuleRow,
  PL as HandoffRules,
  RA as Hero,
  Dx as HomeIcon,
  RL as ItemDrawer,
  YL as KeyPanel,
  Ll as LIVE_EVENT_TYPES,
  kb as LegacyBoardColumn,
  xL as LegacyBoardHeader,
  LL as LegacyConfigRow,
  EL as LegacyItemDrawer,
  fb as LegacyOverCapNote,
  AL as LegacyPreviewRail,
  pr as LegacyWorkCard,
  mT as LinkList,
  Ee as LiveIndicator,
  pL as LoadFailed,
  NL as Loading,
  Vr as MCP_SERVER_COLUMNS,
  Ln as Mark,
  XL as MarkUpload,
  We as Marker,
  eA as McpServerRow,
  ZL as McpServerRowHead,
  nr as Menu,
  Za as MenuButton,
  HL as NewStreamModal,
  H_ as OverCapNote,
  Sn as OverflowRow,
  it as Overlay,
  Jx as OwedCard,
  jL as PARTIAL_STEP_REASON,
  Jr as POLICY_CHIP_WIDTH,
  cL as PageFrame,
  nL as PageHeader,
  ol as PageIntro,
  Km as PlainList,
  tA as PolicyRow,
  AA as PostRow,
  TL as PreviewRail,
  xA as ProjectCard,
  MA as ProjectPage,
  Ca as Prose,
  kA as ProseHeading,
  ln as ROLE_MATRIX_COLUMNS,
  Mr as RULE_ACTIONS,
  ur as Radio,
  vA as ReadyChecklist,
  uL as RecordSection,
  uA as RequeueSheet,
  hA as ResolveBlock,
  bA as ResolvedFieldRow,
  nA as RoleMatrixRow,
  pA as RoutingTable,
  FL as RuleRow,
  aA as RunbookSteps,
  xl as STREAM_STEPS,
  SA as Section,
  mL as SectionBand,
  oa as SectionHeader,
  cr as SegmentedControl,
  Ya as Select,
  gA as SessionRow,
  Zx as Sidebar,
  Gx as SidebarFoldButton,
  CA as SiteFooter,
  $A as SiteHeader,
  jT as SplitLayout,
  OL as StageColumn,
  _L as StageGrid,
  mA as StageHistory,
  By as StageListEditor,
  Yx as StageSteps,
  gL as StaleStrip,
  Vt as StatStrip,
  iL as StatTiles,
  tL as StreamAvatar,
  DL as StreamRow,
  Wx as StudioIcon,
  dL as SubjectRail,
  Ye as Switch,
  Xx as TabLinks,
  lL as TableHead,
  Qx as Tabs,
  rl as Tag,
  EA as TextList,
  Ex as ThemeProvider,
  zL as ToolRow,
  sL as TopBar,
  Jw as Tree,
  fr as TreeRow,
  yA as TypedInputBlock,
  gi as UNSAFE_HREF,
  rA as ValidationList,
  Lx as VisibilityProvider,
  Ax as Visible,
  jx as WARD_VERSION,
  Yt as WorkCard,
  yL as WriteUnavailableStrip,
  kR as agoSince,
  fl as clock,
  Zy as colourStatus,
  ae as count,
  ue as duration,
  Nn as elapsed,
  Mx as eventSourceTransport,
  sx as formatDate,
  gt as headingTag,
  Kt as isStreamStep,
  vt as isValidatedStreamStep,
  Ap as ladderValidation,
  k0 as mcpConnectionChip,
  y0 as mcpToolName,
  oe as money,
  pe as ms,
  vr as ordered,
  Aa as ratio,
  zk as restartLabel,
  x as safeHref,
  tT as slug,
  he as stamp,
  kn as stream,
  Hx as streamChip,
  Ut as streamChipProps,
  ye as streamColour,
  Il as streamHex,
  Pt as streamInitials,
  Al as streamVars,
  eL as uniqueStreamInitials,
  Ga as useAnchoredPanel,
  Lt as useBorderFlash,
  Ie as useDisabledScope,
  Sl as useFocusTrap,
  Fx as useLiveFeed,
  Ix as useReturnFocus,
  Wt as useRovingTabindex,
  $n as useTicker,
  vl as useVisible,
  B as v,
  QL as validateMark,
  pt as validatedStep,
  Ia as validatedStreamSteps
};
