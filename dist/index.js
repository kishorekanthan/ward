import { jsx as n, Fragment as x, jsxs as i } from "react/jsx-runtime";
import { useMemo as Da, useContext as Ne, createContext as ke, useState as v, useEffect as S, useCallback as Z, useRef as f, useLayoutEffect as lt, useId as y, Fragment as Oa, isValidElement as xo, Children as qa } from "react";
import { createPortal as To, flushSync as Ha } from "react-dom";
function se(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const Jn = (e) => String(e).padStart(2, "0");
function xn(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${Jn(t % 60)}s` : `${Math.floor(a / 60)}h ${Jn(a % 60)}m`;
}
const Lo = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function me(e) {
  const t = Lo.formatToParts(new Date(e)), a = (r) => {
    var o;
    return ((o = t.find((l) => l.type === r)) == null ? void 0 : o.value) ?? "";
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
function ne(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function Fa(e, t) {
  return `${e} / ${t}`;
}
const Ao = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Mo(e) {
  return Ao.format(new Date(e));
}
const za = ke(/* @__PURE__ */ new Set());
function dL({ hidden: e, children: t }) {
  const a = Da(() => new Set(e), [e]);
  return /* @__PURE__ */ n(za.Provider, { value: a, children: t });
}
function Io(e) {
  return !Ne(za).has(e);
}
function uL({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: Io(e) ? t : a });
}
const Eo = "(prefers-color-scheme: dark)";
function Yn() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Eo) : null;
}
function Bo(e) {
  const [t, a] = v(() => {
    var r;
    return ((r = Yn()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? Yn() : null;
    if (!r) return;
    const o = () => a(r.matches);
    return o(), r.addEventListener("change", o), () => r.removeEventListener("change", o);
  }, [e]), t;
}
function an(e, t) {
  S(() => {
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function Po(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function hL({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const o = Bo(e === "system");
  return an("data-theme", Po(e, o)), an("data-accent", t), an("data-density", a), /* @__PURE__ */ n(x, { children: r });
}
const jo = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Do(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function Oo(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function qo(e, t, a, r) {
  return e.shiftKey ? Do(t, a) ? r : void 0 : document.activeElement === r || Oo(t) ? a : void 0;
}
function Ho(e, t, a) {
  const r = a[0], o = a[a.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const l = qo(e, t, r, o);
  l && (e.preventDefault(), l.focus());
}
function Fo(e) {
  return { onKeyDown: Z(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(jo));
      Ho(a, e.current, r);
    },
    [e]
  ) };
}
function mL(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var o, l;
      (l = (o = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : o.focus) == null || l.call(o);
    };
  }, [t, e]);
}
const Xn = { ArrowUp: -1, ArrowDown: 1 }, Qn = { ArrowLeft: -1, ArrowRight: 1 }, zo = (e, t, a) => Math.min(a, Math.max(t, e));
function Wo(e, t) {
  if (t !== "horizontal" && e in Xn) return Xn[e];
  if (t !== "vertical" && e in Qn) return Qn[e];
}
function Vt({ orientation: e = "both" } = {}) {
  const [t, a] = v(0), r = f(/* @__PURE__ */ new Map()), o = f(!1);
  lt(() => {
    var w;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(t)) return;
    const h = u[0], _ = o.current;
    o.current = !1, a(h), _ && ((w = r.current.get(h)) == null || w.focus());
  });
  const l = Z((u) => a(u), []), s = Z((u) => {
    var h;
    a(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = Z(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const _ = Math.max(0, h.indexOf(t)), w = Wo(u.key, e);
      w !== void 0 ? (u.preventDefault(), s(h[zo(_ + w, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [t, s, e]
  ), d = Z(
    (u) => ({
      tabIndex: u === t ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(u, h) : (r.current.delete(u), u === t && (o.current = !0));
      },
      onFocus: () => a(u),
      "data-ward-roving": !0
    }),
    [t]
  );
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: l };
}
const _L = (e, t, a) => {
  const r = new EventSource(e), o = (l) => a.onEvent(l.data, l.lastEventId, l.type);
  r.onmessage = o;
  for (const l of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(l, o);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, wL = "0.2.0", fL = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Ko = [1, 2, 3, 4, 5, 6], Wa = [1, 2, 3], Go = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], vL = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], bL = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], P = {
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
function Tn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Jt(e) {
  return Ko.includes(e);
}
function pt(e) {
  return Wa.includes(e);
}
function Uo(e) {
  if (!Jt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function pL(e) {
  if (!Jt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Vo = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Jo(e) {
  if (!Jt(e)) throw new Error("unvalidated stream step");
  return Vo[e];
}
function Zn(e) {
  return typeof e != "string" ? null : Go.includes(e) ? e : null;
}
function Yo(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function Xo(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function Qo(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Zo(e, t, a) {
  const r = Yo(e);
  if (r === null) return null;
  const o = Zn(a) ?? Zn(r.type);
  return o === null ? null : { ...r, type: o, id: Xo(r, t), at: Qo(r) };
}
function el(e, t) {
  return e >= pe.staleAfter ? "stale" : e >= pe.heartbeat && t === "live" ? "reconnecting" : null;
}
function tl(e, t, a) {
  return e >= pe.heartbeat && !t && a !== null;
}
function gL(e, t) {
  const [a, r] = v("reconnecting"), [o, l] = v(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), h = f(null), _ = f(0), w = f(0), N = f(!1), k = f("reconnecting"), A = Z((M) => {
    k.current = M, r(M);
  }, []), D = Z(() => {
    c.current = Date.now();
  }, []), _e = Z((M) => {
    for (const [V, Ce] of s.current)
      (Ce === "*" || M.itemKey === Ce) && V(M);
  }, []), ae = Z(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (M, V, Ce) => {
        const Ke = Zo(M, V, Ce);
        Ke !== null && (Ke.id && (d.current = Ke.id), D(), N.current = !1, A("live"), l(Ke.at), _e(Ke));
      },
      onOpen: () => {
        u.current = 0, N.current = !1, D(), A("live");
      },
      onError: () => {
        var V;
        (V = h.current) == null || V.close(), h.current = null, N.current = !0, k.current !== "stale" && A("reconnecting");
        const M = Math.min(pe.reconnectBase * 2 ** u.current, pe.reconnectMax);
        u.current += 1, _.current = window.setTimeout(ae, M);
      }
    });
  }, [_e, A, D, t, e]), $e = Z((M) => {
    N.current = !0, M.close(), h.current = null, _.current = window.setTimeout(ae, pe.reconnectBase);
  }, [ae]), Xe = Z((M, V) => (s.current.set(V, M), () => {
    s.current.delete(V);
  }), []);
  return S(() => (ae(), w.current = window.setInterval(() => {
    const M = Date.now() - c.current, V = el(M, k.current);
    V && A(V);
    const Ce = h.current;
    tl(M, N.current, Ce) && $e(Ce);
  }, pe.tick), () => {
    var M;
    window.clearInterval(w.current), window.clearTimeout(_.current), N.current = !1, (M = h.current) == null || M.close(), h.current = null;
  }), [ae, $e, A]), { connection: a, lastEventAt: o, subscribe: Xe };
}
function Ln(e, t) {
  const a = new Date(e).getTime(), [r, o] = v(() => Date.now());
  return S(() => {
    if (!t) return;
    const l = () => {
      document.visibilityState !== "hidden" && !document.hidden && o(Date.now());
    };
    l();
    const s = window.setInterval(l, pe.tick);
    return document.addEventListener("visibilitychange", l), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", l);
    };
  }, [t, a]), Math.max(0, r - a);
}
const nl = { blue: "running", orange: "waiting", green: "done" };
function al() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ea(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function Mt(e, t) {
  const a = f(0), r = Z((o) => {
    const l = o ?? t, s = e.current;
    s !== null && l !== void 0 && (al() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${nl[l]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => ea(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => ea(s), pe.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (o) => r(o) : () => r(t);
}
const rl = "_root_1otpc_2", ol = {
  root: rl
};
function ll(e, t, a, r, o) {
  const l = [xn(t)];
  return e || l.push(`as of ${Mo(a)}`), r && l.push(`turn ${r[0]}/${r[1]}`), o && l.push(o.label), l;
}
function Be({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const o = a !== "stale", l = Ln(e, o), s = (t == null ? void 0 : t.at) ?? e, c = ll(o, l, s, r, t);
  return /* @__PURE__ */ i("span", { className: `${ol.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
      "started ",
      me(e)
    ] })
  ] });
}
const il = "_app_1bnco_1", sl = "_side_1bnco_35", cl = "_sideTop_1bnco_46", dl = "_sideBody_1bnco_60", ul = "_iconRail_1bnco_99", hl = "_railItem_1bnco_108", ml = "_railIcon_1bnco_129", _l = "_railDot_1bnco_134", wl = "_railLetter_1bnco_140", fl = "_main_1bnco_146", vl = "_rail_1bnco_108", bl = "_page_1bnco_168", pl = "_headerRow_1bnco_191", gl = "_sidebarToggle_1bnco_198", yl = "_headerSlot_1bnco_203", Nl = "_headerAction_1bnco_208", kl = "_drawerSide_1bnco_213", $l = "_root_1bnco_260", Cl = "_topbar_1bnco_267", Sl = "_mark_1bnco_278", Rl = "_brand_1bnco_285", xl = "_tagline_1bnco_291", Tl = "_identity_1bnco_297", Ll = "_tools_1bnco_298", Al = "_nav_1bnco_308", Ml = "_metadata_1bnco_315", Il = "_actor_1bnco_330", El = "_detail_1bnco_331", Bl = "_content_1bnco_376", Pl = "_toolsPanel_1bnco_392", jl = "_skip_1bnco_418", C = {
  app: il,
  side: sl,
  sideTop: cl,
  sideBody: dl,
  iconRail: ul,
  railItem: hl,
  railIcon: ml,
  railDot: _l,
  railLetter: wl,
  main: fl,
  rail: vl,
  page: bl,
  headerRow: pl,
  sidebarToggle: gl,
  headerSlot: yl,
  headerAction: Nl,
  drawerSide: kl,
  root: $l,
  topbar: Cl,
  mark: Sl,
  brand: Rl,
  tagline: xl,
  identity: Tl,
  tools: Ll,
  nav: Al,
  metadata: Ml,
  actor: Il,
  detail: El,
  content: Bl,
  toolsPanel: Pl,
  skip: jl
};
function ct(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const Dl = "_scope_1an6i_2", Ol = {
  scope: Dl
}, Ka = ke(null);
function yL({ reason: e, actions: t = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ i("fieldset", { disabled: !0, className: `${Ol.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(Ka.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Pe() {
  return Ne(Ka);
}
function Yt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : ct(e, t.reasonId);
}
const ql = "_btn_hrmlj_2", Hl = "_primary_hrmlj_14", Fl = "_destructive_hrmlj_25", zl = "_secondary_hrmlj_35", Wl = "_ghost_hrmlj_40", Kl = "_overflow_hrmlj_49", Gl = "_sm_hrmlj_56", Ul = "_disabled_hrmlj_60", Vl = "_withReason_hrmlj_68", Jl = "_reason_hrmlj_74", at = {
  btn: ql,
  primary: Hl,
  destructive: Fl,
  secondary: zl,
  ghost: Wl,
  overflow: Kl,
  sm: Gl,
  disabled: Ul,
  withReason: Vl,
  reason: Jl
};
function Yl(e, t, a, r) {
  const o = t === "sm" ? [at.sm, "ward-btn--sm"] : [], l = a ? [at.disabled] : [];
  return [at.btn, at[e], "ward-btn", `ward-btn--${e}`, ...o, ...l, r ?? ""].filter(Boolean).join(" ");
}
function Xl(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Ql(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Zl(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function ei(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function ti(e, t, a) {
  return ei(e.describedBy, t && a);
}
function ni({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${at.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function ai(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Pe()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(ri, { ...e });
}
function ri(e) {
  const t = Pe();
  Ql(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", o = !!(e.disabled || t), l = Zl(e, t), s = y(), c = oi(l, t);
  return /* @__PURE__ */ i(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: Yl(a, r, o, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: o,
        title: l,
        "aria-describedby": ti(e, l, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Xl(a, e.controls),
        children: ai(e)
      }
    ),
    /* @__PURE__ */ n(ni, { id: s, reason: l, shown: c === Ga })
  ] });
}
function oi(e, t) {
  return e && !t ? Ga : Oa;
}
function Ga({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${at.withReason} ward-btn-withReason`, children: e });
}
let An = "none";
function li(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (An = "key");
}
typeof document < "u" && (document.addEventListener("keydown", li, !0), document.addEventListener("pointerdown", () => {
  An = "pointer";
}, !0));
function ii() {
  return An === "key";
}
function vt(e) {
  const [t, a] = v(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var l;
    const r = (l = window.matchMedia) == null ? void 0 : l.call(window, e);
    if (!r) return;
    const o = (s) => a(s.matches);
    return r.addEventListener("change", o), a(r.matches), () => r.removeEventListener("change", o);
  }, [e]), t;
}
const si = "_scrim_1cawq_2", ci = "_drawer_1cawq_10", di = "_sheet_1cawq_14", ui = "_modal_1cawq_18", hi = "_panel_1cawq_23", mi = "_start_1cawq_44", _i = "_header_1cawq_67", wi = "_title_1cawq_75", fi = "_body_1cawq_79", vi = "_close_1cawq_106", Ae = {
  scrim: si,
  drawer: ci,
  sheet: di,
  modal: ui,
  panel: hi,
  start: mi,
  header: _i,
  title: wi,
  body: fi,
  close: vi
}, bi = ke(null), jt = [], Dt = /* @__PURE__ */ new Map();
function pi(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function gi(e, t) {
  let a = Dt.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, Dt.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function yi(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !pi(r) && gi(e, r);
}
function Ni(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (yi(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function ki(e) {
  for (const t of e.claims) {
    const a = Dt.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), Dt.delete(t)));
  }
}
function $i(e, t) {
  const a = { root: e, claims: [] };
  return jt.push(a), Ni(a, t), a;
}
function Ci(e) {
  const t = jt.indexOf(e);
  t >= 0 && jt.splice(t, 1), ki(e);
}
function ta(e) {
  return e !== null && jt.at(-1) === e;
}
function Si(e, t, a) {
  const r = f(null), o = f(a);
  return o.current = a, S(() => {
    const l = e.current;
    if (!l) return;
    const s = document.activeElement, c = $i(l, t);
    return r.current = c, () => {
      var u, h;
      const d = ta(c);
      Ci(c), r.current = null, d && ((h = (u = o.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), Z(() => ta(r.current), []);
}
function Ri(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function xi(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ti({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Ae.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("header", { className: `${Ae.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Ae.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Ae.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Li(e) {
  return `${Ae.scrim} ${Ae[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Ai(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Ae.panel} ${Ae[e]} ward-overlay-panel${a}${r}`;
}
function Mi(e) {
  const t = Ne(bi);
  return e ?? t ?? document.body;
}
function dt(e) {
  const t = f(null), a = f(null), r = y(), o = Mi(e.container), l = vt("(min-width: 768px)"), s = Ri(e.kind, l), c = xi(e, r), d = Fo(a), [u] = v(ii), h = Si(t, o, e.returnFocusTo), _ = Z(() => {
    h() && e.onClose();
  }, [e.onClose, h]);
  return S(() => {
    var w;
    h() && ((w = a.current) == null || w.focus());
  }, [h]), S(() => {
    const w = (N) => {
      N.key === "Escape" && _();
    };
    return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
  }, [_]), To(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: Li(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: _,
        children: /* @__PURE__ */ i(
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
            className: Ai(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (w) => w.stopPropagation(),
            onKeyDown: (w) => h() && d.onKeyDown(w),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Ae.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: _, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Ti, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Ii = /^([a-z][a-z0-9+.-]*):/i, Ei = /* @__PURE__ */ new Set(["http", "https", "mailto"]), Bi = "#";
function Pi(e) {
  var r, o;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (o = (r = Ii.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : o.toLowerCase();
}
function T(e) {
  const t = Pi(e);
  return t === void 0 || Ei.has(t) ? e : Bi;
}
function ji(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function Ua(e) {
  const t = ji(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function Di(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => Ua(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const o = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const l of [a, ...a.children]) o == null || o.observe(l);
    return r(), () => {
      a.removeEventListener("scroll", r), o == null || o.disconnect();
    };
  }, [e, t]);
}
function Oi(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, o = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : o > e.clientWidth - a ? e.scrollLeft + o - e.clientWidth + a : null;
}
function qi(e, t, a) {
  lt(() => {
    const r = e.current, o = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !o) return;
    const l = Oi(r, o);
    l !== null && (r.scrollLeft = Math.max(0, l)), Ua(r);
  }, [e, t, a]);
}
const Hi = "_row_11g8i_2", Fi = {
  row: Hi
};
function zi(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Mn({ label: e, children: t, count: a, as: r = "div", focusable: o = !0, rowRef: l, className: s, ...c }) {
  const d = f(null), u = l ?? d;
  return Di(u, a), /* @__PURE__ */ n(r, { ref: u, className: [Fi.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...zi(o, r), ...c, children: t });
}
const Wi = "_icon_1ylqy_2", Ki = {
  icon: Wi
};
function gt({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: Ki.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function NL() {
  return /* @__PURE__ */ n(gt, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function kL() {
  return /* @__PURE__ */ i(gt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function $L() {
  return /* @__PURE__ */ i(gt, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function CL() {
  return /* @__PURE__ */ n(gt, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Gi() {
  return /* @__PURE__ */ i(gt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const Va = "ward:sidebar-collapsed", Ui = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Vi() {
  try {
    return window.localStorage.getItem(Va) === "true";
  } catch {
    return !1;
  }
}
function Ji(e) {
  try {
    window.localStorage.setItem(Va, String(e));
  } catch {
  }
}
function Yi(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Xi(e) {
  return e instanceof Element && e.closest(Ui) !== null;
}
function Qi(e) {
  return e.key === "[" && !Yi(e) && !Xi(e.target);
}
function Zi(e) {
  const [t, a] = v(Vi), r = () => {
    Ji(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const o = (l) => {
      var c;
      if (!Qi(l)) return;
      const s = l.target instanceof Element ? l.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [e, t]), { collapsed: t, toggle: r };
}
function es() {
  const e = vt("(max-width: 767.98px)"), t = vt("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function ts(e) {
  const t = e === "phone", a = y(), r = f(null), [o, l] = v(!1);
  return o && !t && l(!1), { narrow: t, open: o, drawerId: a, slotRef: r, toggle: () => l(!o), close: () => l(!1) };
}
function ns({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ i("div", { className: C.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: C.headerSlot, children: e }),
    Qa(t) && /* @__PURE__ */ n("span", { className: C.headerAction, children: t })
  ] }) : e;
}
function as(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function rs({ sidebar: e, label: t, drawer: a }) {
  var o;
  if (as(a.open, a.close), !a.open) return null;
  const r = (l) => {
    l.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(dt, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (o = a.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ n("div", { className: C.drawerSide, onClick: r, children: Ja(e, !1) }) });
}
function os(e) {
  const [t, a] = v(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function ls(e, t) {
  const a = Zi(e === "wide" && !t), r = os(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function is(e, t) {
  const a = ls(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return cs(e.collapsed, t);
  const r = a.collapsed, o = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: o, drawsStrip: !o && typeof e.sidebar == "function", toggle: a.toggle };
}
const ss = (e) => e.collapsed && e.drawsStrip;
function cs(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const na = (e) => e ? "" : void 0;
function Ja(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ya({ fold: e }) {
  return /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(Gi, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function ds({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: C.sideTop, children: /* @__PURE__ */ n(Ya, { fold: e }) });
}
const Xa = ke(null);
function SL() {
  const e = Ne(Xa);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(Ya, { fold: e });
}
function us({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": Tn(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function hs({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: C.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ i("a", { className: C.railItem, href: T(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(us, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function ms({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: o }) {
  const l = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ i("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(ds, { fold: r, inSidebar: o && !l }),
    /* @__PURE__ */ n("div", { className: C.sideBody, hidden: l, children: Ja(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(hs, { items: a ?? [], label: t })
  ] });
}
const Qa = (e) => e != null;
function _s(e) {
  const { sidebar: t, header: a, action: r, children: o, rail: l, iconRail: s, pageFill: c } = e, d = Qa(l), u = es(), h = ts(u), _ = is(e, u), w = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ i("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(_.collapsed), "data-consumer-fold": na(ss(_)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(Xa.Provider, { value: _, children: /* @__PURE__ */ n(ms, { sidebar: t, label: w, iconRail: s, fold: _, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ i("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(ns, { header: a, action: r, label: w, drawer: h }),
      /* @__PURE__ */ n("div", { className: C.page, "data-fill": na(c === !0), children: o })
    ] }),
    d && /* @__PURE__ */ n("div", { className: C.rail, children: l }),
    /* @__PURE__ */ n(rs, { sidebar: t, label: w, drawer: h })
  ] });
}
function ws({ destinations: e, active: t }) {
  const a = f(null);
  return qi(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(Mn, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: T(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function vn({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function fs({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ i("span", { className: C.metadata, children: [
    /* @__PURE__ */ n(vn, { value: e, className: C.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(vn, { value: t, className: C.detail })
  ] });
}
function vs() {
  const e = vt("(max-width: 767.98px)"), t = y(), a = f(null), [r, o] = v(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function bs({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: C.tools, children: e });
}
function ps({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: C.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function gs(e) {
  return /* @__PURE__ */ i("header", { className: C.topbar, children: [
    /* @__PURE__ */ n("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(vn, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ n(ws, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: C.identity, children: /* @__PURE__ */ n(fs, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(bs, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function ys(e) {
  const t = y(), a = vs();
  return /* @__PURE__ */ i("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: C.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(gs, { ...e, menu: a }),
    /* @__PURE__ */ n(ps, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: C.content, children: e.children })
  ] });
}
function Ns(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function RL(e) {
  return Ns(e) ? /* @__PURE__ */ n(_s, { ...e }) : /* @__PURE__ */ n(ys, { ...e });
}
const ks = "_root_itg9o_2", $s = "_row_itg9o_8", Cs = "_box_itg9o_14", Ss = "_label_itg9o_21", Rs = "_labelHidden_itg9o_26", xs = "_consequence_itg9o_44", Ts = "_sample_itg9o_79", Ue = {
  root: ks,
  row: $s,
  box: Cs,
  label: Ss,
  labelHidden: Rs,
  consequence: xs,
  sample: Ts
};
function Ls(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function As({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${Ue.consequence} ward-check-consequence`, children: t }) : null;
}
function Ms(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function Is(e, t, a, r) {
  const o = e.consequence ? `${t}-note` : void 0, l = Ms(e, a, r), s = l ? `${t}-reason` : void 0, c = Yt(ct(o, e.describedBy, s), r);
  return { noteId: o, reason: l, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? l } };
}
function Es({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Bs({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ue.sample, "aria-hidden": "true", children: e }) : null;
}
function Za(e) {
  const t = y(), a = Pe(), r = Ls(e, a), o = Is(e, t, r.disabled, a);
  return /* @__PURE__ */ i("div", { className: `${Ue.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ i("span", { className: Ue.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: t,
          type: "checkbox",
          className: `${Ue.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (l) => {
            var s;
            return !r.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, l.target.checked));
          },
          ...o.input
        }
      ),
      /* @__PURE__ */ n("label", { htmlFor: t, className: e.labelHidden ? Ue.labelHidden : Ue.label, children: e.label }),
      /* @__PURE__ */ n(Bs, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Es, { id: o.reasonId, reason: o.reason }),
    /* @__PURE__ */ n(As, { id: o.noteId, text: e.consequence })
  ] });
}
const Ps = "_chip_pq6tb_2", js = {
  chip: Ps
}, Ds = {
  gate: P.chip.gate,
  system: P.chip.system,
  write: P.chip.write,
  drift: P.chip.drift,
  done: P.chip.done,
  attention: P.chip.attention,
  failed: P.chip.failed,
  pending: P.chip.pending,
  running: P.chip.running,
  warn: P.chip.warn,
  meta: P.chip.meta,
  soft: P.chip.soft,
  quiet: P.chip.quiet,
  owed: P.chip.owed,
  neutral: P.chip.quiet,
  info: P.chip.running,
  success: P.chip.done,
  warning: P.chip.attention,
  danger: P.chip.failed
};
function Os(e, t) {
  if (e === "stream") return qs(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = Ds[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function qs(e) {
  if (!e || !pt(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = Tn(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${js.chip} ward-chip ward-chip--${e}`, style: Os(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const Hs = "_clamp_zn74g_3", aa = {
  clamp: Hs
};
function it({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? aa.clamp : `${aa.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const Fs = "_root_1btz3_2", zs = "_body_1btz3_10", Ws = "_toggle_1btz3_24", rn = {
  root: Fs,
  body: zs,
  toggle: Ws
};
function xL({ children: e, lines: t = 3, label: a }) {
  const [r, o] = v(!1), l = y();
  return /* @__PURE__ */ i("div", { className: rn.root, children: [
    /* @__PURE__ */ n("div", { id: l, className: rn.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: rn.toggle, "aria-expanded": r, "aria-controls": l, onClick: () => o(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const Ks = "_root_1a4s8_2", Gs = "_words_1a4s8_16", Us = "_title_1a4s8_23", Vs = "_actions_1a4s8_27", kt = {
  root: Ks,
  words: Gs,
  title: Us,
  actions: Vs
};
function TL({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ i("section", { className: kt.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ i("div", { className: kt.words, children: [
      /* @__PURE__ */ n("strong", { className: kt.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: kt.actions, children: a })
  ] });
}
const Js = "_root_8zmpu_2", Ys = "_step_8zmpu_12", Xs = "_dot_8zmpu_38", Qs = "_label_8zmpu_51", mt = {
  root: Js,
  step: Ys,
  dot: Xs,
  label: Qs
}, Zs = { done: ", done", now: ", current", next: "" };
function ec({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ i("li", { className: mt.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${mt.dot} ward-running` : mt.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: mt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: Zs[e.state] })
  ] });
}
function LL({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: mt.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(ec, { step: r, running: t }, r.label)) });
}
function Xt(e) {
  return typeof e == "number" && pt(e) ? e : null;
}
function ye(e, t) {
  const a = Xt(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function In(e, t) {
  const a = Xt(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const tc = "_root_13eei_3", nc = "_nav_13eei_8", ac = "_list_13eei_16", rc = "_item_13eei_24", oc = "_link_13eei_44", lc = "_sep_13eei_54", ic = "_current_13eei_58", sc = "_chips_13eei_62", De = {
  root: tc,
  nav: nc,
  list: ac,
  item: rc,
  link: oc,
  sep: lc,
  current: ic,
  chips: sc
};
function cc({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: De.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${De.link} ward-target`, href: T(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function dc({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: De.root, children: /* @__PURE__ */ i("nav", { "aria-label": "Breadcrumb", className: De.nav, children: [
    /* @__PURE__ */ n("ol", { className: De.list, children: e.map((r, o) => /* @__PURE__ */ i("li", { className: De.item, children: [
      o > 0 ? /* @__PURE__ */ n("span", { className: De.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(cc, { step: r, isCurrent: a && o === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${De.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function er(e, t, a) {
  const r = f(a);
  r.current = a, S(() => {
    if (!e) return;
    const o = (l) => {
      var s;
      (s = t.current) != null && s.contains(l.target) || r.current();
    };
    return document.addEventListener("mousedown", o), () => document.removeEventListener("mousedown", o);
  }, [e, t]);
}
const uc = 500;
function tr(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function nr() {
  const e = f(""), t = f(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, uc), e.current);
}
const $t = 4;
function hc(e, t, a) {
  const r = Math.max(0, a - e.bottom - $t * 2), o = Math.max(0, e.top - $t * 2);
  return t <= r || r >= o ? { top: e.bottom + $t, maxHeight: r } : { top: e.top - $t - Math.min(t, o), maxHeight: o };
}
function mc(e, t, a, r) {
  const o = { start: e.left, end: e.right - t }, l = { start: o.start + t <= a, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = l[r] || !l[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, a - t));
}
function _c(e, t, a, r) {
  return { ...hc(e, t.height, a.height), left: mc(e, t.width, a.width, r) };
}
function It(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function wc(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function fc(e, t, a) {
  const r = wc(t, a);
  e.style.setProperty("--ward-anchor-width", It(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const o = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: r, box: o, view: { width: l.clientWidth, height: l.clientHeight } };
}
function vc(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, o) => r.scrollTop = a[o]);
}
function ra(e, t, a, r) {
  const o = vc(e), l = fc(e, t, r), s = _c(l.edges, l.box, l.view, a);
  Object.assign(e.style, { left: It(s.left - l.box.left), top: It(s.top - l.box.top), maxHeight: It(s.maxHeight) }), o();
}
function bc(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function ar(e, t, a = "start", r) {
  lt(() => {
    const o = t.current, l = e.current;
    if (!o || !l) return;
    const s = bc(o), c = () => ra(o, l, a, r == null ? void 0 : r.current), d = (u) => {
      o.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), lt(() => {
    t.current && e.current && ra(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const pc = "_root_1lgbn_2", gc = "_trigger_1lgbn_7", yc = "_value_1lgbn_47", Nc = "_menu_1lgbn_65", kc = "_find_1lgbn_87", $c = "_list_1lgbn_103", Cc = "_option_1lgbn_114", Sc = "_check_1lgbn_133", Rc = "_empty_1lgbn_144", ge = {
  root: pc,
  trigger: gc,
  value: yc,
  menu: Nc,
  find: kc,
  list: $c,
  option: Cc,
  check: Sc,
  empty: Rc
}, xc = 7;
function Tc(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function oa(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function Lc(e, t) {
  const [a, r] = v(e.defaultOpen === !0), [o, l] = v(""), [s, c] = v(() => oa(e.options, e.value)), d = (u) => {
    var h;
    Ha(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: o,
    active: s,
    entries: Tc(e.options, o),
    findable: e.options.length > xc,
    show: () => {
      e.disabled || (l(""), c(oa(e.options, e.value)), r(!0));
    },
    close: d,
    to: c,
    pick: (u) => {
      var h;
      u && u.option.value !== e.value && ((h = e.onChange) == null || h.call(e, u.option.value)), d(!0);
    },
    find: (u) => {
      l(u), c(0);
    }
  };
}
function Ac(e, t) {
  const a = f(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function Mc(e) {
  const t = nr();
  return (a) => {
    const r = t(a), o = e.entries.findIndex((l) => l.option.label.toLowerCase().startsWith(r));
    o >= 0 && e.to(o);
  };
}
function rr(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Ic(e) {
  return { ...rr(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function or(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const o = t[r.key];
    if (!o) return a(r);
    r.preventDefault(), r.stopPropagation(), o();
  };
}
const Ec = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Bc(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      Ec.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function Pc({ entry: e, at: t, menu: a, ids: r, value: o }) {
  return /* @__PURE__ */ i(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === o,
      "data-active": t === a.active || void 0,
      className: ge.option,
      onMouseDown: (l) => l.preventDefault(),
      onMouseMove: () => a.to(t),
      onClick: () => a.pick(e),
      children: [
        /* @__PURE__ */ n("span", { className: ge.check, "aria-hidden": "true" }),
        /* @__PURE__ */ n("span", { className: ge.label, children: e.option.label })
      ]
    }
  );
}
function En(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function jc({ menu: e, ids: t, focusRef: a }) {
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
      "aria-activedescendant": En(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: or(e, rr(e), () => {
      })
    }
  );
}
function Dc({ props: e, menu: t, ids: a, focusRef: r, trigger: o }) {
  const l = Mc(t), s = f(null);
  ar(o, s);
  const c = (d) => {
    tr(d) && l(d.key);
  };
  return /* @__PURE__ */ i("div", { ref: s, className: ge.menu, children: [
    t.findable && /* @__PURE__ */ n(jc, { menu: t, ids: a, focusRef: r }),
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
        "aria-activedescendant": t.findable ? void 0 : En(t, a),
        onKeyDown: or(t, Ic(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(Pc, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: ge.empty, children: "No match" })
  ] });
}
function Oc(e, t) {
  const a = e.open ? En(e, t) : void 0;
  S(() => {
    var r, o;
    a && ((o = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [a]);
}
function lr(...e) {
  return e.filter(Boolean).join(" ");
}
function qc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function Hc({ props: e, menu: t, ids: a, trigger: r, wantFocus: o }) {
  var c;
  const l = !e.options.some((d) => d.value === e.value), s = (c = Pe()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: lr(ge.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": t.open,
      "aria-controls": t.open ? a.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": ct(e["aria-describedby"], a.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...Bc(t, o),
      children: /* @__PURE__ */ n("span", { id: a.value, className: ge.value, "data-placeholder": l || void 0, children: qc(e) })
    }
  );
}
function ir(e) {
  const t = Pe(), a = t ? { ...e, disabled: !0, "aria-describedby": Yt(e["aria-describedby"], t) } : e, r = y(), o = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, l = f(null), s = f(null), c = f(null), d = Lc(a, s), u = Ac(d.open, c);
  return er(d.open, l, () => d.close(!1)), Oc(d, o), /* @__PURE__ */ i("div", { ref: l, className: lr(ge.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(Hc, { props: a, menu: d, ids: o, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(Dc, { props: a, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const Fc = "_field_1ensj_2", zc = "_label_1ensj_8", Wc = "_labelHidden_1ensj_15", Kc = "_control_1ensj_25", Gc = "_mono_1ensj_45", Uc = "_area_1ensj_50", Vc = "_invalid_1ensj_57", Fe = {
  field: Fc,
  label: zc,
  labelHidden: Wc,
  control: Kc,
  mono: Gc,
  area: Uc,
  invalid: Vc
}, Jc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, sr = (e) => `${e}-label`;
function Yc({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? Jc : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function Xc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    ir,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": sr(t.id),
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
function Qc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
function Zc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, type: "date", min: e.min, max: e.max, ...t });
}
const ed = { input: Yc, select: Xc, textarea: Qc, date: Zc };
function td(e, t, a) {
  const r = ed[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function nd(e, t, a, r) {
  const o = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": o,
    "aria-describedby": Yt(ct(o ? a : void 0, e.describedBy), r),
    onChange: (l) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, l.target.value);
    }
  };
}
function ad(e) {
  const t = e.mono ? [Fe.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [Fe.area] : [];
  return [Fe.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function rd(e) {
  return e ? `${Fe.label} ${Fe.labelHidden} ward-field-label` : `${Fe.label} ward-field-label`;
}
function E(e) {
  const t = y(), a = `${t}-msg`, r = nd(e, t, a, Pe()), o = ad(e);
  return /* @__PURE__ */ i("div", { className: `${Fe.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: sr(t), className: rd(e.labelHidden), htmlFor: t, children: e.label }),
    td(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${Fe.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const od = "_root_sjvm0_2", ld = "_trigger_sjvm0_9", id = "_ghost_sjvm0_27", sd = "_panel_sjvm0_46", cd = "_edged_sjvm0_67", dd = "_menu_sjvm0_73", ud = "_group_sjvm0_78", hd = "_heading_sjvm0_83", md = "_item_sjvm0_89", _d = "_description_sjvm0_105", wd = "_large_sjvm0_109", fd = "_touch_sjvm0_113", vd = "_icon_sjvm0_117", bd = "_label_sjvm0_125", pd = "_text_sjvm0_130", gd = "_trailing_sjvm0_138", yd = "_check_sjvm0_144", Nd = "_separator_sjvm0_183", kd = "_footer_sjvm0_189", $d = "_find_sjvm0_196", Cd = "_findGlyph_sjvm0_208", Sd = "_findInput_sjvm0_214", Rd = "_empty_sjvm0_230", L = {
  root: od,
  trigger: ld,
  ghost: id,
  panel: sd,
  edged: cd,
  menu: dd,
  group: ud,
  heading: hd,
  item: md,
  description: _d,
  large: wd,
  touch: fd,
  icon: vd,
  label: bd,
  text: pd,
  trailing: gd,
  check: yd,
  separator: Nd,
  footer: kd,
  find: $d,
  findGlyph: Cd,
  findInput: Sd,
  empty: Rd
}, cr = ke(null);
function xd(e, t) {
  const [a, r] = v({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (o) => r((l) => ({ open: !0, start: o, request: l.request + 1 })),
    close: (o) => {
      var l;
      Ha(() => r((s) => ({ ...s, open: !1 }))), o && ((l = t.current) == null || l.focus());
    }
  };
}
const Td = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Ld(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = Td.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function Bn(...e) {
  return e.filter(Boolean).join(" ");
}
function Ad(e, t = {}, a = "field") {
  const { ref: r, className: o, ...l } = t;
  return { ...l, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: Bn(L.trigger, a === "ghost" ? L.ghost : void 0, o) };
}
function dr(e) {
  const t = y(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = f(null), o = f(null), l = xd(e.defaultOpen === !0, o);
  return er(l.open, r, () => l.close(!1)), /* @__PURE__ */ i("div", { ref: r, className: Bn(L.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...Ad(o, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": l.open,
        "aria-controls": l.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Ld(l),
        children: e.label
      }
    ),
    l.open && /* @__PURE__ */ n(cr.Provider, { value: { ...a, popup: l, button: o }, children: e.children })
  ] });
}
function Md(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function Id(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const Ed = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function Bd(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function Pd(e, t) {
  return e === "separator" ? e : "items" in e ? Bd(e, t) : t(e) ? e : null;
}
function jd(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function Dd(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (o) => o.label.toLowerCase().includes(a);
  return jd(e.map((o) => Pd(o, r)).filter((o) => o !== null));
}
const ur = (e, t) => (e % t + t) % t;
function qe(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const o = ur(t + a * r, e.length);
    if (!e[o].disabled) return o;
  }
  return -1;
}
const Od = (e) => e.split("").every((t) => t === e[0]);
function qd(e, t, a) {
  const r = Od(a), o = r ? a[0] : a, l = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = ur(l + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function Hd(e) {
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
function Fd(e, t) {
  const { items: a } = e, r = () => {
    var o;
    return (o = e.refs.current[e.current()]) == null ? void 0 : o.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(qe(a, e.current(), 1))],
    ["ArrowUp", () => e.focus(qe(a, e.current(), -1))],
    ["Home", () => e.focus(qe(a, -1, 1))],
    ["End", () => e.focus(qe(a, a.length, -1))],
    ["Escape", () => t.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function zd(e, t, a) {
  const r = nr(), o = Fd(e, t), l = (s) => {
    if (tr(s)) {
      if (!a) return e.focus(qd(e.items, e.current(), r(s.key)));
      s.preventDefault(), a(s.key);
    }
  };
  return {
    onKeyDown: (s) => {
      const c = o.get(s.key);
      if (!c) return l(s);
      s.preventDefault(), s.stopPropagation(), c();
    },
    onKeyUp: (s) => {
      s.key === " " && s.preventDefault();
    }
  };
}
function Wd(e) {
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
function Kd(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? qe(e, -1, 1) : t;
}
function Gd(e, t) {
  const { start: a, request: r } = t, o = f(e);
  o.current = e, S(() => {
    const { items: l, focus: s } = o.current;
    a && s(a === "first" ? Kd(l) : qe(l, l.length, -1));
  }, [a, r]);
}
function Ud({ row: e, nav: t, popup: a }) {
  const { item: r, at: o } = e;
  return {
    onMouseDown: (l) => l.preventDefault(),
    onMouseMove: () => {
      !r.disabled && t.current() !== o && t.focus(o);
    },
    onClick: (l) => {
      var s;
      if (r.disabled) return l.preventDefault();
      (s = r.onSelect) == null || s.call(r), a.close(!0);
    }
  };
}
const Vd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function Jd(e, t) {
  return Vd(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function Yd(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: L.label, children: e.label });
  return e.description ? /* @__PURE__ */ i("span", { className: L.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: L.description, children: e.description })
  ] }) : a;
}
function Xd() {
  return /* @__PURE__ */ n("svg", { className: L.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function la(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: L.icon, "aria-hidden": "true", children: e.icon }) : null,
    Yd(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: L.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(Xd, {}) : null
  ] });
}
function hr(e) {
  const { item: t, at: a } = e.row, r = y(), o = {
    ref: (l) => {
      e.nav.refs.current[a] = l;
    },
    role: "menuitem",
    tabIndex: -1,
    className: L.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...Jd(t, r),
    ...Ud(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: T(t.href), ...o, children: la(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...o, children: la(t, r) });
}
function Qd({ heading: e, rows: t, nav: a, popup: r }) {
  const o = y();
  return /* @__PURE__ */ i("div", { role: "group", "aria-labelledby": o, className: L.group, children: [
    /* @__PURE__ */ n("div", { id: o, className: L.heading, children: e }),
    t.map((l) => /* @__PURE__ */ n(hr, { row: l, nav: a, popup: r }, l.at))
  ] });
}
function Zd({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: L.separator }) : e.kind === "group" ? /* @__PURE__ */ n(Qd, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(hr, { row: e.row, nav: t, popup: a });
}
function eu() {
  const e = Ne(cr);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function tu() {
  return /* @__PURE__ */ i("svg", { className: L.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function nu(e, t) {
  const a = () => qe(e.items, -1, 1);
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(a())],
    ["ArrowUp", () => e.focus(qe(e.items, e.items.length, -1))],
    ["Enter", () => {
      var r;
      return (r = e.refs.current[a()]) == null ? void 0 : r.click();
    }],
    ["Escape", () => t.close(!0)]
  ]);
}
function au({ find: e, query: t, setQuery: a, input: r, nav: o, popup: l, menuId: s }) {
  const c = nu(o, l), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ i("div", { className: L.find, children: [
    /* @__PURE__ */ n(tu, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: L.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function ru(e, t) {
  const [a, r] = v(""), o = f(null), l = t !== void 0 && Ed(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = o.current) == null || d.focus();
  };
  return l ? { find: t, query: a, setQuery: r, input: o, toFind: s, entries: Dd(e, a) } : { query: a, setQuery: r, input: o, entries: e };
}
const ou = { regular: void 0, large: L.large, touch: L.touch }, lu = (e, t) => Bn(L.panel, e ? L.edged : void 0, ou[t]);
function iu({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: L.empty, children: e.empty ?? "No matches" });
}
function mr({ entries: e, footer: t, align: a = "start", find: r, edges: o, size: l = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = eu(), h = f(null);
  ar(u, h, a, o);
  const _ = ru(e, r), w = Md(_.entries), N = Hd(w.flatMap(Id).map((D) => D.item)), k = zd(N, s, _.toFind), A = Wd(s);
  return Gd(N, s), /* @__PURE__ */ i("div", { ref: h, className: lu(o, l), ...A, children: [
    _.find && /* @__PURE__ */ n(au, { find: _.find, query: _.query, setQuery: _.setQuery, input: _.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: L.menu, ...k, children: w.map((D, _e) => /* @__PURE__ */ n(Zd, { block: D, nav: N, popup: s }, _e)) }),
    /* @__PURE__ */ n(iu, { find: _.find, count: N.items.length }),
    t && /* @__PURE__ */ n("p", { className: L.footer, children: t })
  ] });
}
function su(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function _r(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !su(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const cu = (e, t) => e.reduce((a, r) => a + r + t, -t);
function du({ room: e, widths: t, more: a, gap: r }, o) {
  const l = t.map((d, u) => u);
  if (cu(t, r) <= e) return l;
  const s = /* @__PURE__ */ new Set([o]);
  let c = t[o] + r + a;
  for (const d of l)
    if (d !== o) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return l.filter((d) => s.has(d));
}
const on = (e) => Number.parseFloat(e) || 0, ia = (e) => e.getBoundingClientRect().width;
function uu(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - on(a.paddingInlineStart) - on(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), ia),
    more: r ? ia(r) : 0,
    gap: on(a.columnGap)
  };
}
function hu(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const mu = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function wr(e, t, a, r = ':scope > [role="tab"]') {
  const [o, l] = v(null);
  return lt(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = uu(s, r);
      l((u) => mu(u, d) ? u : d);
    };
    return c(), hu(s, c);
  }, [e, a, r]), o && du(o, t);
}
const _u = "_strip_1eynz_2", wu = "_fits_1eynz_19", fu = "_probe_1eynz_27", vu = "_moreRoot_1eynz_36", bu = "_more_1eynz_36", pu = "_tab_1eynz_55", gu = "_count_1eynz_91", yu = "_badge_1eynz_97", U = {
  strip: _u,
  fits: wu,
  probe: fu,
  moreRoot: vu,
  more: bu,
  tab: pu,
  count: gu,
  badge: yu
}, fr = "More";
function Nu(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const sa = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Pn = (e) => e.badge === void 0 ? sa(e) : `${sa(e)}, ${e.badge}`;
function vr(e) {
  return `${U.strip} ward-tabs ward-tabs--${e}`;
}
const ku = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function $u({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ i(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${U.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : Pn(e),
      onClick: () => r(e.id),
      ...a,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
          " ",
          /* @__PURE__ */ n("span", { className: U.count, children: `· ${e.count}` })
        ] }),
        e.badge === void 0 ? null : /* @__PURE__ */ n("span", { className: U.badge, children: e.badge })
      ]
    }
  );
}
function Cu(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((l) => l.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Su({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(dr, { label: fr, className: U.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: U.more }, children: /* @__PURE__ */ n(mr, { align: "end", entries: e.map((r) => ({ label: Pn(r), onSelect: () => a(r.id) })) }) });
}
function Ru(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : ku;
}
function AL({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: o }) {
  const l = Vt({ orientation: "horizontal" }), s = Nu(e, t);
  S(() => l.setActive(s), [l.setActive, s]);
  const c = f(null);
  _r(c, o);
  const d = wr(c, s, e.map(Pn).join(`
`)), u = d ? e.filter((h, _) => !d.includes(_)) : [];
  return /* @__PURE__ */ i("div", { ref: c, className: `${vr(o)} ${U.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...l.containerProps, children: [
    e.map((h, _) => /* @__PURE__ */ n($u, { tab: h, active: t, place: Ru(l, d, _), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${U.more} ${U.probe}`, children: fr }),
    u.length > 0 && /* @__PURE__ */ n(Su, { tabs: u, trigger: l.itemProps(e.length), onPick: Cu(c, a) })
  ] });
}
const ca = 7, br = "More", xu = ":scope > a", pr = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Tu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Lu(e, t) {
  return !e || e.includes(t) ? {} : Tu;
}
function Au({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ i("a", { href: e.href, className: `${U.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: U.count, children: `· ${e.count}` })
    ] })
  ] });
}
function Mu({ links: e }) {
  return /* @__PURE__ */ n(dr, { label: br, className: U.moreRoot, trigger: { className: U.more }, children: /* @__PURE__ */ n(mr, { align: "end", entries: e.map((t) => ({ label: pr(t), href: t.href })) }) });
}
function ML({ links: e, active: t, label: a, level: r }) {
  if (e.length > ca) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ca} — the set is fixed`);
  const o = f(null);
  _r(o, r);
  const l = Math.max(0, e.findIndex((d) => d.id === t)), s = wr(o, l, e.map(pr).join(`
`), xu), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ i("nav", { ref: o, className: `${vr(r)} ${U.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(Au, { link: d, current: d.id === t, place: Lu(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${U.more} ${U.probe}`, children: br }),
    c.length > 0 && /* @__PURE__ */ n(Mu, { links: c })
  ] });
}
const Iu = "_root_v56ff_3", Eu = "_segment_v56ff_9", da = {
  root: Iu,
  segment: Eu
};
function gr({ options: e, value: t, onChange: a, label: r = "Options", disabled: o = !1, describedBy: l }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Vt({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${da.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: da.segment,
      "aria-checked": d.value === t,
      disabled: o,
      "aria-describedby": l,
      onClick: () => a(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const Bu = "_sidebar_s9o1j_3", Pu = "_brand_s9o1j_9", ju = "_mark_s9o1j_17", Du = "_word_s9o1j_24", Ou = "_nav_s9o1j_30", qu = "_navItem_s9o1j_39", Hu = "_footLink_s9o1j_49", Fu = "_group_s9o1j_58", zu = "_groupName_s9o1j_65", Wu = "_agents_s9o1j_81", Ku = "_agent_s9o1j_81", Gu = "_root_s9o1j_96", Uu = "_agentTop_s9o1j_105", Vu = "_dot_s9o1j_112", Ju = "_agentName_s9o1j_124", Yu = "_agentMeta_s9o1j_138", Xu = "_foot_s9o1j_49", Qu = "_footName_s9o1j_150", Zu = "_footLinks_s9o1j_157", eh = "_linkBrand_s9o1j_184", th = "_label_s9o1j_205", nh = "_note_s9o1j_210", ah = "_footer_s9o1j_226", I = {
  sidebar: Bu,
  brand: Pu,
  mark: ju,
  word: Du,
  nav: Ou,
  navItem: qu,
  new: "_new_s9o1j_48",
  footLink: Hu,
  group: Fu,
  groupName: zu,
  agents: Wu,
  agent: Ku,
  root: Gu,
  agentTop: Uu,
  dot: Vu,
  agentName: Ju,
  agentMeta: Yu,
  foot: Xu,
  footName: Qu,
  footLinks: Zu,
  linkBrand: eh,
  label: th,
  note: nh,
  footer: ah
};
function rh({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ i(
    "a",
    {
      className: I.agent,
      href: T(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ i("span", { className: I.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: I.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": Tn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: I.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: I.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function oh({ shared: e }) {
  return e ? /* @__PURE__ */ i("div", { className: I.foot, children: [
    /* @__PURE__ */ n("span", { className: I.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: I.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${I.footLink} ward-target`, href: T(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function lh({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: o, shared: l }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ i("nav", { className: I.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ i("div", { className: I.brand, children: [
      /* @__PURE__ */ n("span", { className: I.mark }),
      /* @__PURE__ */ n("span", { className: I.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: I.nav, children: t.map((s) => /* @__PURE__ */ n("a", { className: I.navItem, href: T(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ i("div", { className: I.group, children: [
      /* @__PURE__ */ i("span", { className: I.groupName, children: [
        a,
        " · ",
        ne(r.length)
      ] }),
      o && /* @__PURE__ */ n("a", { className: I.new, href: T(o.href), children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: I.agents, children: r.map((s) => /* @__PURE__ */ n(rh, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(oh, { shared: l })
  ] });
}
function ih(e) {
  return e.destinations ?? e.items ?? [];
}
function sh({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.linkBrand, children: e });
}
function ch({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.footer, children: e });
}
function dh({ link: e, active: t }) {
  return /* @__PURE__ */ i("a", { href: T(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: I.note, children: e.note })
  ] });
}
function uh(e) {
  return /* @__PURE__ */ i("aside", { className: `${I.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(sh, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: ih(e).map((t) => /* @__PURE__ */ n(dh, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(ch, { children: e.children })
  ] });
}
function hh(e) {
  return "agents" in e;
}
function IL(e) {
  return hh(e) ? /* @__PURE__ */ n(lh, { ...e }) : /* @__PURE__ */ n(uh, { ...e });
}
const mh = "_mark_wlgi8_3", _h = {
  mark: mh
}, wh = { met: "✓", unmet: "", failed: "✕" };
function jn({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: _h.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: wh[e]
    }
  );
}
const fh = "_avatar_1t33a_3", vh = {
  avatar: fh
};
function Ot(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function bh(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [Ot(e), ...[...t.slice(1)].map((r) => a + r)];
}
function ph(e, t) {
  const a = bh(e).find((o) => !t.has(o));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(Ot(e).charAt(0) + String(r)); ) r += 1;
  return Ot(e).charAt(0) + String(r);
}
function EL(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const o = ph(r, t);
    t.add(o), a.set(r, o);
  }
  return a;
}
function gh(e) {
  return e != null && pt(e) ? Uo(e) : void 0;
}
function BL({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: vh.avatar, "data-size": a, "aria-hidden": "true", style: gh(t), children: r ?? Ot(e) });
}
const yh = "_marker_br9fi_2", Nh = {
  marker: yh
}, kh = {
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
}, $h = { running: " ward-running" };
function We({ size: e, kind: t, label: a }) {
  const r = { "--marker": kh[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Nh.marker} ward-marker ward-marker--${t}${$h[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const Ch = "_root_ti0pq_2", Sh = "_chip_ti0pq_11", Rh = "_noCase_ti0pq_23", Ct = {
  root: Ch,
  chip: Sh,
  noCase: Rh
};
function xh(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Dn({ connection: e, since: t, lastEventAt: a }) {
  const r = xh(t, a), o = Ln(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ i("span", { className: `${Ct.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(We, { size: 6, kind: "green" }),
    "Live"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ i("span", { className: `${Ct.chip} ward-connection`, role: "status", children: [
    "Reconnecting ·",
    " ",
    /* @__PURE__ */ n("span", { className: Ct.noCase, children: xn(o) })
  ] }) : /* @__PURE__ */ i("span", { className: `${Ct.chip} ward-connection`, role: "status", children: [
    "Out of date · as of ",
    me(r)
  ] });
}
const Th = "_root_yylks_2", Lh = "_context_yylks_13", Ah = "_row_yylks_1", Mh = "_heading_yylks_27", Ih = "_headingWrap_yylks_35", Eh = "_meta_yylks_41", Bh = "_chips_yylks_49", Ph = "_title_yylks_56", jh = "_consequence_yylks_66", Dh = "_actionsWrap_yylks_73", Oh = "_actions_yylks_73", qh = "_action_yylks_73", Hh = "_overflowPanel_yylks_102", Fh = "_measureClip_yylks_113", zh = "_measure_yylks_113", G = {
  root: Th,
  context: Lh,
  row: Ah,
  heading: Mh,
  headingWrap: Ih,
  meta: Eh,
  chips: Bh,
  title: Ph,
  consequence: jh,
  actionsWrap: Dh,
  actions: Oh,
  action: qh,
  overflowPanel: Hh,
  measureClip: Fh,
  measure: zh
};
function Wh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(it, { as: "h1", className: G.title, text: e }) : /* @__PURE__ */ n("h1", { className: G.title, children: e });
}
function Kh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: G.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function Gh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: G.consequence, title: t, children: e }) : null;
}
function Uh({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ i("div", { className: G.meta, children: [
    /* @__PURE__ */ n(Kh, { chips: e }),
    /* @__PURE__ */ n(Gh, { consequence: t, consequenceHint: a })
  ] });
}
function Vh({ title: e, chips: t, consequence: a, consequenceHint: r, density: o }) {
  return /* @__PURE__ */ i("div", { className: G.heading, children: [
    /* @__PURE__ */ n(Wh, { title: e, density: o }),
    /* @__PURE__ */ n(Uh, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function bn({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: G.action, "data-action": "", children: t }, a));
}
function ua({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Jh({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: o }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(ua, { disclosure: o }) : t ? [/* @__PURE__ */ n(ua, { disclosure: o }, "more"), /* @__PURE__ */ n(bn, { actions: e }, "actions")] : /* @__PURE__ */ n(bn, { actions: e });
}
function Yh(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function Xh({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: G.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(bn, { actions: e }) });
}
function Qh(e, t) {
  const a = y(), [r, o] = v(!1), l = r && e;
  return { disclosure: { open: l, panelId: a, toggle: () => o(!l) }, close: () => {
    var d, u;
    o(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const Zh = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function em(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && Zh(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function tm({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: G.context, children: /* @__PURE__ */ n(dc, { path: e.path, current: e.current }) });
}
function nm(...e) {
  return e.some((t) => t === null);
}
function am(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function rm(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + am(e);
}
function om(e, t, a, r, o) {
  if (o === 0 || nm(t, a, r)) return !1;
  const [l, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - rm(e, l));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function lm(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function im(e) {
  return xo(e) && (e.type === "a" || typeof e.props.href == "string");
}
function sm(e, t) {
  return t.length === 0 && e.length === 1 && im(e[0]);
}
function cm(e, t) {
  const a = f(null), r = f(null), o = f(null), l = f(null), [s, c] = v(!1);
  return S(() => {
    const d = a.current;
    if (!lm(d)) return;
    const u = () => c(om(d, r.current, o.current, l.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), l.current && h.observe(l.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: o, measureRef: l, collapsed: s && !t };
}
function dm({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: G.measureClip, children: /* @__PURE__ */ i("div", { className: G.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] }) });
}
function um({ connection: e }) {
  return e ? /* @__PURE__ */ n(Dn, { connection: e.connection, since: e.since }) : null;
}
function PL({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: o, consequenceHint: l, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: _, headingRef: w, actionsRef: N, measureRef: k, collapsed: A } = cm(s, sm(s, c)), D = c.length > 0, { disclosure: _e, close: ae } = Qh(A || D, N), $e = Yh(c, s, A, u);
  return /* @__PURE__ */ i("header", { className: G.root, "data-density": h, children: [
    /* @__PURE__ */ n(tm, { crumb: em(e, r, t) }),
    /* @__PURE__ */ i("div", { className: G.row, ref: _, children: [
      /* @__PURE__ */ n("div", { ref: w, className: G.headingWrap, children: /* @__PURE__ */ n(Vh, { title: r, chips: a, consequence: o, consequenceHint: l, density: h }) }),
      /* @__PURE__ */ i("div", { className: G.actionsWrap, children: [
        /* @__PURE__ */ n(um, { connection: d }),
        /* @__PURE__ */ n("div", { className: G.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ n(Jh, { actions: s, hasMore: D, collapsed: A, onOverflow: u, disclosure: _e }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Xh, { actions: $e, disclosure: _e, onEscape: ae }),
    /* @__PURE__ */ n(dm, { actions: s, hasMore: D, measureRef: k })
  ] });
}
const hm = "_root_td96x_2", mm = "_body_td96x_16", ha = {
  root: hm,
  body: mm
};
function jL({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${ha.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: ha.body, children: a }) });
}
const _m = "_tip_1oaay_2", wm = "_bubble_1oaay_1", ma = {
  tip: _m,
  bubble: wm
};
function DL({ label: e, text: t, align: a = "center" }) {
  const r = y(), [o, l] = v(!1), s = (u) => {
    u.key !== "Escape" || !o || (u.stopPropagation(), l(!1));
  }, c = () => l(!0), d = () => l(!1);
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      className: `${ma.tip} ward-infotip`,
      "aria-label": `What ${e} counts`,
      "aria-describedby": r,
      "data-open": o ? "" : void 0,
      "data-align": a,
      onMouseEnter: c,
      onMouseLeave: d,
      onFocus: c,
      onBlur: d,
      onKeyDown: s,
      children: [
        /* @__PURE__ */ i("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": "true", children: [
          /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "9" }),
          /* @__PURE__ */ n("path", { d: "M12 11v5M12 8h.01" })
        ] }),
        /* @__PURE__ */ n("span", { className: ma.bubble, role: "tooltip", id: r, children: t })
      ]
    }
  );
}
const fm = "_row_1jlay_2", vm = {
  row: fm
}, On = "custom", bm = [
  { value: "7d", label: "Last 7 days" },
  { value: "4w", label: "Last 4 weeks" },
  { value: "8w", label: "Last 8 weeks" },
  { value: "q", label: "This quarter" },
  { value: On, label: "Custom range" }
], pm = (e) => e.from !== "" && e.to !== "" && e.from <= e.to, gm = (e) => e.from !== "" && e.to !== "" && e.from > e.to, _a = { from: "", to: "" }, ym = (e, t) => t === null && "preset" in e ? e.preset : On;
function Nm({ range: e, today: t, setEnd: a }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(E, { kind: "date", label: "From", value: e.from, max: e.to || t, onChange: a("from"), invalid: gm(e) ? "The start is after the end." : void 0 }),
    /* @__PURE__ */ n(E, { kind: "date", label: "To", value: e.to, min: e.from || void 0, max: t, onChange: a("to") })
  ] });
}
function OL({ value: e, onChange: t, today: a }) {
  const [r, o] = v("from" in e ? e : null), l = (c) => {
    if (c === On) return o(r ?? _a);
    o(null), t({ preset: c });
  }, s = (c) => (d) => {
    const u = { ...r ?? _a, [c]: d };
    o(u), pm(u) && t(u);
  };
  return /* @__PURE__ */ i("div", { className: `${vm.row} ward-period`, children: [
    /* @__PURE__ */ n(E, { kind: "select", label: "Period", value: ym(e, r), options: bm, onChange: l }),
    r === null ? null : /* @__PURE__ */ n(Nm, { range: r, today: a, setEnd: s })
  ] });
}
const km = "_root_bf1pc_2", $m = "_table_bf1pc_9", Cm = "_caption_bf1pc_14", Sm = "_series_bf1pc_23", Rm = "_category_bf1pc_31", xm = "_cell_bf1pc_39", Tm = "_track_bf1pc_45", Lm = "_lane_bf1pc_52", Am = "_bar_bf1pc_56", Mm = "_value_bf1pc_63", Im = "_swatch_bf1pc_70", Em = "_empty_bf1pc_78", X = {
  root: km,
  table: $m,
  caption: Cm,
  series: Sm,
  category: Rm,
  cell: xm,
  track: Tm,
  lane: Lm,
  bar: Am,
  value: Mm,
  swatch: Im,
  empty: Em
}, Bm = "—", wa = 6;
function Pm(e, t) {
  if (t.length < 1 || t.length > wa)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${wa}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function jm(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function yr(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function Dm(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function Om({ value: e, top: t, step: a, format: r, missing: o }) {
  const l = Dm(e, t), s = { "--share": `${l}%` };
  return /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ i("span", { className: X.track, children: [
    /* @__PURE__ */ n("span", { className: X.lane, children: l > 0 ? /* @__PURE__ */ n("span", { className: `${X.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: X.value, children: e === null ? o : r(e) })
  ] }) });
}
function qm({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ i("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: X.swatch, "data-step": yr(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function Hm({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ i("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: X.caption, children: e }),
    /* @__PURE__ */ n("p", { className: X.empty, children: t })
  ] });
}
function Fm({ title: e, categories: t, series: a, top: r, format: o = ne, categoryHead: l = "Category", missing: s = Bm }) {
  return /* @__PURE__ */ n("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ i("table", { className: X.table, children: [
    /* @__PURE__ */ n("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: X.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: l }) }),
      /* @__PURE__ */ n(qm, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: X.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(Om, { value: u.values[d], top: r, step: yr(h, a.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function qL(e) {
  Pm(e.categories, e.series);
  const t = jm(e.series);
  return t === 0 ? /* @__PURE__ */ n(Hm, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Fm, { ...e, top: t });
}
const zm = "_root_1bfqw_2", Wm = "_figure_1bfqw_7", Km = "_of_1bfqw_13", Gm = "_bar_1bfqw_18", Um = "_rows_1bfqw_38", Vm = "_row_1bfqw_38", Jm = "_label_1bfqw_49", Ym = "_amount_1bfqw_54", je = {
  root: zm,
  figure: Wm,
  of: Km,
  bar: Gm,
  rows: Um,
  row: Vm,
  label: Jm,
  amount: Ym
};
function Xm({ spent: e, ceiling: t, breakdown: a }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ i("div", { className: `${je.root} ward-costmeter`, children: [
    /* @__PURE__ */ i("p", { className: `${je.figure} ward-stat-value`, children: [
      oe(e),
      " ",
      /* @__PURE__ */ i("span", { className: je.of, children: [
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
    a && /* @__PURE__ */ n("ul", { className: je.rows, children: a.map((o) => /* @__PURE__ */ i("li", { className: `${je.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: je.label, children: o.label }),
      /* @__PURE__ */ n("span", { className: je.amount, children: oe(o.amount) })
    ] }, o.label)) })
  ] });
}
const Qm = "_frame_f7bxz_2", Zm = "_table_f7bxz_6", e_ = "_th_f7bxz_12", t_ = "_td_f7bxz_13", n_ = "_sort_f7bxz_53", a_ = "_row_f7bxz_65", r_ = "_empty_f7bxz_73", He = {
  frame: Qm,
  table: Zm,
  th: e_,
  td: t_,
  sort: n_,
  row: a_,
  empty: r_
}, o_ = { asc: "ascending", desc: "descending" };
function l_(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return o_[t.direction];
}
function i_(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: He.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function s_(e) {
  return e === void 0 ? void 0 : { width: e };
}
function c_({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: He.th,
      style: s_(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": l_(e, t),
      children: i_(e, a)
    }
  );
}
function d_({ row: e, props: t }) {
  const a = t.rowId(e), r = (t.lockedIds ?? []).includes(a);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: He.row,
      "data-selected": a === t.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: t.columns.map((o) => /* @__PURE__ */ n(
        "td",
        {
          className: He.td,
          "data-align": o.align,
          "data-mono": o.mono,
          "data-drop": o.dropPriority,
          "data-label": t.narrow ? o.header : void 0,
          children: t.renderCell(e, o.key)
        },
        o.key
      ))
    }
  );
}
function u_({
  label: e,
  columns: t,
  rows: a,
  rowId: r,
  renderCell: o,
  selectedId: l,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u,
  narrow: h
}) {
  return a.length === 0 ? /* @__PURE__ */ n("div", { className: He.empty, children: u }) : /* @__PURE__ */ n("div", { className: He.frame, "data-narrow": h, children: /* @__PURE__ */ i("table", { className: He.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: He.head, children: t.map((_) => /* @__PURE__ */ n(c_, { column: _, sort: c, onSort: d }, _.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((_) => /* @__PURE__ */ n(d_, { row: _, props: { label: e, columns: t, rows: a, rowId: r, renderCell: o, selectedId: l, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(_))) })
  ] }) });
}
const h_ = "_list_v0s52_2", m_ = {
  list: h_
};
function __({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: m_.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const w_ = "_label_1u62a_2", f_ = {
  label: w_
};
function HL({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: f_.label, children: t.header }) }, t.key)) }) });
}
const v_ = "_stack_bp6a0_2", b_ = {
  stack: v_
};
function FL({ children: e }) {
  return /* @__PURE__ */ n("span", { className: b_.stack, "data-ward-action-stack": "", children: e });
}
const p_ = "_set_1z0sq_2", g_ = "_legend_1z0sq_7", y_ = "_row_1z0sq_15", N_ = "_control_1z0sq_20", k_ = "_input_1z0sq_26", $_ = "_label_1z0sq_31", C_ = "_consequence_1z0sq_36", Ge = {
  set: p_,
  legend: g_,
  row: y_,
  control: N_,
  input: k_,
  label: $_,
  consequence: C_
};
function Nr({ legend: e, options: t, value: a, onChange: r, disabled: o, name: l, describedBy: s, variant: c }) {
  const d = y(), u = l ?? d;
  return /* @__PURE__ */ i("fieldset", { className: Ge.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: Ge.legend, children: e }),
    t.map((h) => {
      const _ = `${u}-${h.value}`, w = h.consequence ? `${_}-note` : void 0;
      return /* @__PURE__ */ i("div", { className: Ge.row, children: [
        /* @__PURE__ */ i("span", { className: Ge.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: _,
              type: "radio",
              name: u,
              className: Ge.input,
              value: h.value,
              checked: a === h.value,
              disabled: o,
              "aria-describedby": ct(w, s),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: _, className: Ge.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: w, className: `${Ge.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const S_ = "_root_11gpw_2", R_ = "_head_11gpw_10", x_ = "_note_11gpw_29", T_ = "_index_11gpw_34", L_ = "_dot_11gpw_38", A_ = "_counter_11gpw_49", M_ = "_trailing_11gpw_57", Ve = {
  root: S_,
  head: R_,
  note: x_,
  index: T_,
  dot: L_,
  counter: A_,
  trailing: M_
};
function I_({ index: e }) {
  return e ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ve.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ve.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function E_({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ve.counter, "aria-hidden": "true", children: e }) : null;
}
function fa({ title: e, index: t, note: a, counter: r, kind: o = "micro", trailing: l }) {
  return /* @__PURE__ */ i("div", { className: `${Ve.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ i("h2", { className: Ve.head, children: [
      /* @__PURE__ */ n(I_, { index: t }),
      e,
      r && /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ve.note, children: a }),
    /* @__PURE__ */ n(E_, { counter: r }),
    l === void 0 ? null : /* @__PURE__ */ n("span", { className: Ve.trailing, children: l })
  ] });
}
const B_ = "_strip_c3x3u_2", P_ = "_cell_c3x3u_7", j_ = "_value_c3x3u_12", D_ = "_link_c3x3u_29", O_ = "_label_c3x3u_49", q_ = "_tiles_c3x3u_101", ze = {
  strip: B_,
  cell: P_,
  value: j_,
  link: D_,
  label: O_,
  tiles: q_
};
function kr(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((o) => o.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const $r = (e) => `${ze.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function H_({ cell: e }) {
  return /* @__PURE__ */ i("div", { className: ze.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: $r(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${ze.label} ward-stat-label`, children: e.label })
  ] });
}
function F_({ cell: e, href: t }) {
  return /* @__PURE__ */ i("div", { className: ze.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: $r(e), title: e.hint, children: /* @__PURE__ */ i("a", { className: `${ze.link} ward-stat-link`, href: T(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${ze.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Cr = (e) => e.href === void 0 ? /* @__PURE__ */ n(H_, { cell: e }, e.label) : /* @__PURE__ */ n(F_, { cell: e, href: e.href }, e.label);
function Qt({ cells: e, divided: t = !1 }) {
  return kr("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${ze.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(Cr) });
}
const va = 6;
function zL({ cells: e }) {
  kr("StatTiles", e, [1, 2 * va]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, va) };
  return /* @__PURE__ */ n("dl", { className: `${ze.tiles} ward-stattiles`, style: t, children: e.map(Cr) });
}
const z_ = "_root_1eb1u_2", W_ = "_track_1eb1u_8", K_ = "_thumb_1eb1u_46", G_ = "_labelHidden_1eb1u_64", U_ = "_label_1eb1u_64", ot = {
  root: z_,
  track: W_,
  thumb: K_,
  labelHidden: G_,
  label: U_
};
function V_(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function J_(e) {
  return e ? `${ot.label} ${ot.labelHidden}` : ot.label;
}
function Y_(e, t, a) {
  return e && !t && a ? a : void 0;
}
function X_(e, t, a, r) {
  return { "aria-describedby": Yt(ct(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function Q_({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ye({ label: e, checked: t, onChange: a, disabled: r, locked: o, describedBy: l, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, _ = Pe(), { on: w, off: N } = V_(t, r, o, _ !== null), k = Y_(N, _ !== null, c);
  return /* @__PURE__ */ i("span", { className: `${ot.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": w,
        "aria-label": e,
        "aria-labelledby": d,
        ...X_(h, l, _, k),
        className: `${ot.track} ward-switch`,
        "data-on": w,
        "data-locked": o ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!w)),
        children: /* @__PURE__ */ n("span", { className: ot.thumb })
      }
    ),
    /* @__PURE__ */ n("label", { id: d, htmlFor: u, className: J_(s), children: e }),
    /* @__PURE__ */ n(Q_, { id: h, reason: k })
  ] });
}
const Z_ = "_bar_1vp69_2", ew = "_skip_1vp69_11", tw = "_mark_1vp69_22", nw = "_nav_1vp69_30", aw = "_list_1vp69_34", rw = "_select_1vp69_41", ow = "_selectTrigger_1vp69_45", lw = "_dest_1vp69_52", iw = "_actor_1vp69_71", sw = "_actorMark_1vp69_84", cw = "_actorLabel_1vp69_89", dw = "_tagline_1vp69_108", ce = {
  bar: Z_,
  skip: ew,
  mark: tw,
  nav: nw,
  list: aw,
  select: rw,
  selectTrigger: ow,
  dest: lw,
  actor: iw,
  actorMark: sw,
  actorLabel: cw,
  tagline: dw
};
function uw(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function hw(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function WL({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: o, onNavigate: l, skipTo: s = "main" }) {
  const c = hw(r);
  return /* @__PURE__ */ i("header", { className: ce.bar, children: [
    /* @__PURE__ */ n("a", { className: `${ce.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: ce.mark, children: e }),
    o && /* @__PURE__ */ n("span", { className: ce.tagline, children: o }),
    /* @__PURE__ */ i("nav", { className: ce.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: ce.list, children: t.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${ce.dest} ward-target`,
          href: T(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => l == null ? void 0 : l(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        ir,
        {
          className: ce.select,
          triggerClassName: ce.selectTrigger,
          "aria-label": "Destination",
          value: a,
          options: t.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => l == null ? void 0 : l(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ i("span", { className: ce.actor, children: [
      /* @__PURE__ */ n("span", { className: ce.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: ce.actorMark, "aria-hidden": "true", children: uw(c) })
    ] })
  ] });
}
const mw = "_tree_zzoob_2", _w = "_item_zzoob_6", ww = "_row_zzoob_10", fw = "_button_zzoob_22", qt = {
  tree: mw,
  item: _w,
  row: ww,
  button: fw
}, Sr = ke(null);
function vw({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Vt({ orientation: "vertical" });
  return /* @__PURE__ */ n(Sr.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: qt.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const bw = { ArrowRight: !0, ArrowLeft: !1 };
function ba(e) {
  return e ? !0 : void 0;
}
function pw(e, t) {
  const a = bw[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function gw(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function yw(e) {
  const t = [qt.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function Nw(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function kw(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function $w(e) {
  return typeof e == "string" ? e : void 0;
}
function Cw({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Sw({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Rr(e) {
  const t = Ne(Sr);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = Nw(e);
  return /* @__PURE__ */ i("li", { className: qt.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: yw(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": ba(e.unresolved),
        "data-inherited": ba(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: `${qt.button} ward-treeitem-btn`,
            onClick: () => gw(e),
            onKeyDown: (r) => pw(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: kw(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: $w(e.label), children: e.label }),
              /* @__PURE__ */ n(Cw, { value: e.detail }),
              /* @__PURE__ */ n(Sw, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Rw = "_frame_gxspk_2", xw = "_subjectRail_gxspk_22", Tw = "_subject_gxspk_22", Lw = "_rail_gxspk_42", Aw = "_record_gxspk_57", Mw = "_recordBody_gxspk_102", Iw = "_stageGrid_gxspk_157", Ew = "_band_gxspk_171", Bw = "_bandBody_gxspk_179", Pw = "_bandActions_gxspk_184", jw = "_scroller_gxspk_192", Dw = "_board_gxspk_219", Ow = "_lanes_gxspk_228", qw = "_cardGrid_gxspk_262", Q = {
  frame: Rw,
  subjectRail: xw,
  subject: Tw,
  rail: Lw,
  record: Aw,
  recordBody: Mw,
  stageGrid: Iw,
  band: Ew,
  bandBody: Bw,
  bandActions: Pw,
  scroller: jw,
  board: Dw,
  lanes: Ow,
  cardGrid: qw
};
function KL({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: Q.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function pa(e) {
  return e ? "true" : void 0;
}
function GL({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: o, ruled: l }) {
  return /* @__PURE__ */ i("div", { className: Q.subjectRail, "data-ward-subject-rail": a, "data-ruled": pa(l), children: [
    /* @__PURE__ */ n("div", { className: Q.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: Q.rail, "data-sticky": pa(o), "aria-label": r, children: t })
  ] });
}
function UL({ title: e, children: t, note: a, trailing: r, pad: o = "block", label: l, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: Q.record, "aria-label": l, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(fa, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ i("section", { className: Q.record, "aria-label": l, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(fa, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: Q.recordBody, "data-pad": o, "data-measure": c, children: t })
  ] });
}
const Hw = "_form_1j8ub_2", Fw = "_fields_1j8ub_9", zw = "_actions_1j8ub_19", ln = {
  form: Hw,
  fields: Fw,
  actions: zw
};
function VL({ label: e, children: t, actions: a, onSubmit: r }) {
  const o = (l) => {
    l.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ i("form", { className: ln.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: ln.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: ln.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function JL({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ i("section", { className: Q.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: Q.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: Q.bandActions, children: t })
  ] });
}
const Ww = "(max-width: 767.98px)";
function qn({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(Mn, { className: Q.scroller, label: e, count: a ?? qa.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function Kw({ lanes: e, label: t, laneLabel: a }) {
  const [r, o] = v(null), l = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ i("div", { className: Q.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(E, { kind: "select", label: a, value: (l == null ? void 0 : l.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ n(qn, { label: t, children: l == null ? void 0 : l.content })
  ] });
}
function Gw({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: Q.board, "data-ward-board": "", children: /* @__PURE__ */ n(qn, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(Oa, { children: a.content }, a.id)) }) });
}
function YL({ children: e, label: t = "Board", lanes: a, laneLabel: r = "Column" }) {
  const o = vt(Ww);
  return a === void 0 ? /* @__PURE__ */ n(qn, { label: t, children: e }) : o ? /* @__PURE__ */ n(Kw, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(Gw, { lanes: a, label: t });
}
function XL({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), l = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ n(Mn, { className: Q.stageGrid, label: a, count: o, "data-ward-stage-grid": "", "data-floor": r, style: l, children: t });
}
function QL({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${Q.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const Uw = "_block_6tv5x_3", Vw = "_sentence_6tv5x_10", Jw = "_meta_6tv5x_19", Yw = "_ways_6tv5x_24", Xw = "_action_6tv5x_38", Qw = "_strip_6tv5x_42", Zw = "_loading_6tv5x_61", ef = "_label_6tv5x_69", tf = "_counter_6tv5x_76", ve = {
  block: Uw,
  sentence: Vw,
  meta: Jw,
  ways: Yw,
  action: Xw,
  strip: Qw,
  loading: Zw,
  label: ef,
  counter: tf
};
function nf({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: ve.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function Zt({ sentence: e, action: t, children: a, role: r = "status", tone: o, kind: l, ask: s }) {
  return /* @__PURE__ */ i("div", { className: `${ve.block} ward-state${l === void 0 ? "" : ` ${l}`}`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ i("p", { className: ve.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ i(x, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(nf, { action: t })
  ] });
}
function af(e) {
  return /* @__PURE__ */ n(Zt, { ...e, kind: "ward-emptystate" });
}
function ZL({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(Zt, { sentence: e, action: a, children: /* @__PURE__ */ i("p", { className: ve.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function rf({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${ve.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function e3({ ways: e, ...t }) {
  return /* @__PURE__ */ n(Zt, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(rf, { ways: e }) });
}
function t3({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(Zt, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ i("p", { className: ve.meta, children: [
    "failed at ",
    me(t)
  ] }) });
}
function n3({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ i("div", { className: ve.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    me(e),
    ". Showing snapshot from ",
    me(t)
  ] });
}
function a3({ queued: e, since: t }) {
  return /* @__PURE__ */ i("div", { className: ve.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    me(t)
  ] });
}
function r3({ label: e, startedAt: t }) {
  const a = f(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = v(!1);
  S(() => {
    const s = window.setTimeout(() => o(!0), pe.load);
    return () => window.clearTimeout(s);
  }, []);
  const l = Ln(a.current, r);
  return /* @__PURE__ */ i("div", { className: `${ve.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: ve.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: ve.counter, children: xn(l) }) : null
  ] });
}
const of = "_note_cigdt_2", lf = {
  note: of
};
function sf({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ i("p", { className: lf.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const cf = "_card_k7btg_3", df = "_hit_k7btg_31", uf = "_head_k7btg_44", hf = "_title_k7btg_51", mf = "_meta_k7btg_57", _f = "_since_k7btg_66", wf = "_sep_k7btg_76", ff = "_fields_k7btg_80", vf = "_field_k7btg_80", bf = "_last_k7btg_98", pf = "_reason_k7btg_110", he = {
  card: cf,
  hit: df,
  head: uf,
  title: hf,
  meta: mf,
  since: _f,
  sep: wf,
  fields: ff,
  field: vf,
  last: bf,
  reason: pf
}, gf = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function yf(e, t, a) {
  const r = Mt(e, "blue"), o = Mt(e, "orange"), l = Mt(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: o, green: l };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = gf[d.type];
      u && c[u]();
    });
  }, [r, a, l, t, o]);
}
const Nf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : oe(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function kf(e, t) {
  return Nf[t](e);
}
function $f({ item: e, connection: t }) {
  const a = /* @__PURE__ */ n("span", { className: he.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ i("p", { className: he.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    a,
    /* @__PURE__ */ n(Be, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ i("p", { className: he.meta, "data-ward-card-meta": "", children: [
    e.waitsOn && /* @__PURE__ */ i(x, { children: [
      "waits on ",
      e.waitsOn,
      a
    ] }),
    /* @__PURE__ */ i("span", { className: he.since, children: [
      se(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Cf({ item: e }) {
  const t = e.run ? { role: "running", label: "Running" } : e.state;
  return /* @__PURE__ */ i("div", { className: he.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Off plan" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function Sf({ reason: e }) {
  return e ? /* @__PURE__ */ i("p", { className: he.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Rf({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: he.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: he.field, children: kf(e, a) }, a)) });
}
const pn = (e) => e ? !0 : void 0;
function xf(e) {
  return { "--stream": ye(e.streamStep, "id") };
}
function Tf(e, t, a) {
  e == null || e(t, a);
}
function Lf(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Af({ item: e, stale: t }) {
  var r, o;
  const a = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: he.last, "data-stale": pn(t), children: a }) : null;
}
function en(e) {
  const t = e.fields ?? [], a = e.item, r = f(null);
  yf(r, a.key, e.feed);
  const o = Lf(e.feed), l = xf(a);
  return /* @__PURE__ */ i(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: he.card,
      style: l,
      "data-selected": pn(e.selected),
      "data-flagged": pn(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: he.hit, onClick: (s) => Tf(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(Cf, { item: a }),
        /* @__PURE__ */ n(it, { as: "p", className: he.title, text: a.title }),
        /* @__PURE__ */ n($f, { item: a, connection: o }),
        /* @__PURE__ */ n(Sf, { reason: a.blockedReason }),
        /* @__PURE__ */ n(Rf, { item: a, fields: t }),
        /* @__PURE__ */ n(Af, { item: a, stale: o === "stale" })
      ]
    }
  );
}
function yt(e, t) {
  return e.trim().toLowerCase() === t.toLowerCase();
}
const Mf = "_column_1j8bi_3", If = "_head_1j8bi_21", Ef = "_label_1j8bi_30", Bf = "_count_1j8bi_39", Pf = "_list_1j8bi_53", wt = {
  column: Mf,
  head: If,
  label: Ef,
  count: Bf,
  list: Pf
};
function xr(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function jf({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ i("div", { className: wt.head, children: [
    /* @__PURE__ */ n("h2", { className: wt.label, id: a, title: e.label, children: e.label }),
    e.gate && !yt(e.label, "Review") && /* @__PURE__ */ n(m, { role: "gate", label: "Review" }),
    /* @__PURE__ */ i("span", { className: wt.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Df(e) {
  return /* @__PURE__ */ n("div", { className: wt.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      en,
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
function Of({ column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: l, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && t.length > e.cap, _ = xr(t, r);
  return /* @__PURE__ */ i("section", { className: wt.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(jf, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(Df, { column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: l, feed: s, roving: c, rows: _ }),
    h && /* @__PURE__ */ n(sf, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const qf = "_foot_cs4jr_2", Hf = "_note_cs4jr_13", Ff = "_link_cs4jr_19", sn = {
  foot: qf,
  note: Hf,
  link: Ff
};
function o3({ configureHref: e }) {
  return /* @__PURE__ */ i("footer", { className: sn.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: sn.note, children: "Filters you set are not saved." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${sn.link} ward-target`, href: T(e), children: "Configure board" })
  ] });
}
const zf = "_head_1tfi5_3", Wf = "_identity_1tfi5_12", Kf = "_titleRow_1tfi5_18", Gf = "_title_1tfi5_18", Uf = "_key_1tfi5_35", Vf = "_rollup_1tfi5_45", Jf = "_tools_1tfi5_53", Yf = "_swatch_1tfi5_101", Xf = "_mark_1tfi5_108", xe = {
  head: zf,
  identity: Wf,
  titleRow: Kf,
  title: Gf,
  key: Uf,
  rollup: Vf,
  tools: Jf,
  swatch: Yf,
  mark: Xf
}, ga = "initials:";
function Qf(e) {
  return e === void 0 ? "done this week unknown" : `${ne(e)} done this week`;
}
function Zf(e) {
  const t = [Qf(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ne(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${se(e.p90)}`), t.join(" · ");
}
function ev(e) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ i("span", { title: e.inFlightHint, children: [
      ne(e.inFlight),
      " open"
    ] }),
    " · ",
    Zf(e)
  ] });
}
function tv(e) {
  return e.startsWith(ga) ? e.slice(ga.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function nv({ markRef: e, streamStep: t }) {
  const a = { "--stream": ye(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${xe.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: tv(e) }) : /* @__PURE__ */ n("span", { className: xe.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function av({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(E, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function l3({
  stream: e,
  rollups: t,
  connection: a,
  lastEventAt: r,
  owners: o,
  owner: l,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ i("div", { className: xe.head, children: [
    /* @__PURE__ */ i("div", { className: xe.identity, children: [
      /* @__PURE__ */ i("div", { className: xe.titleRow, children: [
        /* @__PURE__ */ n(nv, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: xe.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: xe.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: xe.rollup, "aria-live": "polite", children: ev(t) })
    ] }),
    /* @__PURE__ */ i("div", { className: xe.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(av, { owners: o, owner: l, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Dn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const rv = "_head_1sejb_14", ov = "_line_1sejb_15", lv = "_cHandle_1sejb_36", iv = "_cName_1sejb_41", sv = "_nameLine_1sejb_49", cv = "_cLabel_1sejb_56", dv = "_cCap_1sejb_61", uv = "_cShown_1sejb_66", hv = "_name_1sejb_49", mv = "_noCap_1sejb_88", _v = "_state_1sejb_102", wv = "_handle_1sejb_111", q = {
  head: rv,
  line: ov,
  cHandle: lv,
  cName: iv,
  nameLine: sv,
  cLabel: cv,
  cCap: dv,
  cShown: uv,
  name: hv,
  noCap: mv,
  state: _v,
  handle: wv
}, fv = "Review stages always show.", vv = "Done stages are counted, not shown.";
function i3() {
  return /* @__PURE__ */ i("div", { className: q.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: q.cHandle }),
    /* @__PURE__ */ n("span", { className: q.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: q.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: q.cShown, children: "Shown" })
  ] });
}
function bv(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function pv(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function gv({ stage: e }) {
  return /* @__PURE__ */ n("span", { className: q.cName, children: /* @__PURE__ */ i("span", { className: q.nameLine, children: [
    /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
    e.gate && !yt(e.name, "Review") && /* @__PURE__ */ n(m, { role: "gate", label: "Review", size: "tag" })
  ] }) });
}
function yv(e) {
  return e === void 0 ? "" : String(e);
}
function Nv(e) {
  return e === "" ? void 0 : Number(e);
}
function kv({ name: e, onReorder: t }) {
  const a = Pe();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ n("span", { className: q.cHandle }) : /* @__PURE__ */ n("span", { className: q.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: q.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && pv(r, t),
      children: "⠿"
    }
  ) });
}
function $v({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${q.cCap} ${q.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: q.cCap, children: /* @__PURE__ */ n(E, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: yv(t.cap), onChange: (r) => a({ ...t, cap: Nv(r) }) }) });
}
function Cv(e) {
  return e.gate ? fv : e.terminal ? vv : void 0;
}
function Sv({ stage: e, config: t, onChange: a }) {
  const r = Pe() !== null, o = bv(e, t.shown), l = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ i("span", { className: q.cShown, children: [
    /* @__PURE__ */ n(Ye, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, disabledReason: Cv(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: q.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && s(!o.shown), children: o.state })
  ] });
}
function Rv(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function s3({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ i("div", { className: q.line, "data-kind": Rv(e), children: [
    /* @__PURE__ */ n(kv, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(gv, { stage: e }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: /* @__PURE__ */ n(E, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (o) => a({ ...t, label: o }) }) }),
    /* @__PURE__ */ n($v, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(Sv, { stage: e, config: t, onChange: a })
  ] });
}
const xv = "_body_8qsv9_2", Tv = "_head_8qsv9_9", Lv = "_summary_8qsv9_19", Av = "_block_8qsv9_20", Mv = "_actionsBlock_8qsv9_21", Iv = "_title_8qsv9_41", Ev = "_note_8qsv9_46", Bv = "_k_8qsv9_51", Pv = "_kv_8qsv9_58", jv = "_row_8qsv9_64", Dv = "_label_8qsv9_75", Ov = "_value_8qsv9_84", qv = "_quote_8qsv9_90", Hv = "_actions_8qsv9_21", Fv = "_resolve_8qsv9_111", z = {
  body: xv,
  head: Tv,
  summary: Lv,
  block: Av,
  actionsBlock: Mv,
  title: Iv,
  note: Ev,
  k: Bv,
  kv: Pv,
  row: jv,
  label: Dv,
  value: Ov,
  quote: qv,
  actions: Hv,
  resolve: Fv
};
function zv(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Wv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Be, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Kv(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function Gv(e, t, a) {
  return [
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...zv(e),
    ...Kv(a),
    ...Wv(e, t)
  ];
}
function Uv({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ i("section", { className: z.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: z.k, children: t }),
    e
  ] });
}
function Vv(e) {
  return e.run ? { role: "running", label: "Running" } : e.state;
}
function Jv({ item: e, showKey: t }) {
  const a = Vv(e);
  return !t && !a ? null : /* @__PURE__ */ i("div", { className: z.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Yv({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ i("div", { className: z.block, children: [
    /* @__PURE__ */ n("p", { className: z.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: z.note, children: e.agentMeta })
  ] }) : null;
}
function c3({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: o, resolve: l, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), _ = Gv(e, o, d);
  return /* @__PURE__ */ n(dt, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ i("div", { className: z.body, children: [
    /* @__PURE__ */ n(Jv, { item: e, showKey: u }),
    /* @__PURE__ */ i("div", { className: z.summary, children: [
      /* @__PURE__ */ n("h2", { className: z.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: z.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: z.kv, children: _.map(([w, N, k]) => /* @__PURE__ */ i("div", { className: z.row, children: [
      /* @__PURE__ */ n("dt", { className: z.label, children: w }),
      /* @__PURE__ */ n("dd", { className: z.value, children: N })
    ] }, k ?? w)) }),
    /* @__PURE__ */ n(Yv, { item: e }),
    /* @__PURE__ */ i("div", { className: z.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: z.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: z.note, children: c })
    ] }),
    /* @__PURE__ */ n(Uv, { resolve: l, label: s ?? "Next steps" })
  ] }) });
}
const Xv = "_root_3azmy_2", Qv = "_list_3azmy_7", Zv = "_item_3azmy_12", eb = "_box_3azmy_18", tb = "_text_3azmy_23", nb = "_note_3azmy_28", Qe = {
  root: Xv,
  list: Qv,
  item: Zv,
  box: eb,
  text: tb,
  note: nb
};
function tn({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ i("div", { className: Qe.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ i("li", { className: `${Qe.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Qe.box, children: /* @__PURE__ */ n(jn, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Qe.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${Qe.note} ward-checklist-note`, children: t })
  ] });
}
const ab = "_rail_znbbp_2", rb = "_k_znbbp_11", ob = "_head_znbbp_19", lb = "_section_znbbp_25", ib = "_card_znbbp_39", sb = "_strip_znbbp_46", cb = "_skeleton_znbbp_60", db = "_skeletonLabel_znbbp_74", ub = "_bar_znbbp_80", hb = "_note_znbbp_89", de = {
  rail: ab,
  k: rb,
  head: ob,
  section: lb,
  card: ib,
  strip: sb,
  skeleton: cb,
  skeletonLabel: db,
  bar: ub,
  note: hb
};
function mb(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Tr({ title: e, children: t }) {
  return /* @__PURE__ */ i("section", { className: de.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: de.k, children: e }),
    t
  ] });
}
function _b({ effects: e }) {
  const t = e.filter((a) => !a.met);
  return t.length === 0 ? null : /* @__PURE__ */ n(Tr, { title: "Warnings", children: /* @__PURE__ */ n(tn, { items: t, density: "compact" }) });
}
function wb({ column: e, count: t }) {
  return /* @__PURE__ */ i("div", { className: de.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: de.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: de.bar, "aria-hidden": "true" }, r))
  ] });
}
function fb({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(Of, { column: o, items: t.filter((l) => l.stage === o.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, o.id));
}
function vb(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(fb, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(wb, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function d3(e) {
  const t = mb(e.onOpen), a = xr(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ i("aside", { className: de.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${de.k} ${de.head}`, children: "Preview" }),
    /* @__PURE__ */ n("section", { className: de.section, "aria-label": "Card", children: /* @__PURE__ */ n("div", { className: de.card, children: a && /* @__PURE__ */ n(en, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ i(Tr, { title: "Columns", children: [
      /* @__PURE__ */ n("div", { className: de.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(vb, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: de.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(_b, { effects: e.effects })
  ] });
}
function bb(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function pb(e) {
  return Math.ceil(e.length / 2);
}
function gb(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Lr(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function yb(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const o = Lr(e);
  o !== void 0 && a(o), r(gb(e.type));
}
function Nb(e, t, a, r, o) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (l) => yb(l, a, r, o));
  }, [e, t, a, r, o]);
}
function kb(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function $b(e, t) {
  return t ? { role: "running", label: "Running" } : e.state ?? { role: "pending", label: e.key };
}
function Cb(e, t) {
  return t !== void 0 ? se(e.timeInStage) + " · waits on " + t.agent : e.waitsOn ? se(e.timeInStage) + " · waits on " + e.waitsOn : se(e.timeInStage) + " in stage";
}
function Sb(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + P.height.card + " + " + P.height.cardRow + " * " + String(pb(t ?? [])) + ")"
  };
}
function Rb(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function xb(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: oe(e.cost) }) : null;
}
function Tb(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Lb(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Be, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function Ab(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function Mb(e, t) {
  return t === void 0 ? e : bb(e, t.ref);
}
function Ib(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function bt(e) {
  return e === !0 ? "true" : void 0;
}
function Ar(e) {
  const t = e.item, a = t.run, r = a !== void 0, o = f(null), l = Mt(o), s = f(/* @__PURE__ */ new Set()), [c, d] = v(kb(t));
  Nb(e.feed, t.key, s, d, l);
  const u = $b(t, r), h = Cb(t, a), _ = Sb(t, e.fields), w = Ab(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      ...Ib(e),
      className: "ward-workcard",
      "data-flagged": bt(t.flagged),
      "data-selected": bt(e.selected),
      style: _,
      ref: Mb(o, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        Rb(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          xb(t, e.fields),
          Tb(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ i("span", { className: "ward-workcard-lastrow", children: [
          Lb(a, c, e.connection, t.changedAt),
          w !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: w, children: w }) : null
        ] })
      ]
    }
  ) });
}
function Eb({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function Bb(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Pb(e, t, a) {
  return /* @__PURE__ */ i("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Review" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function jb(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Eb, { count: e.items.length, cap: e.column.cap });
}
function Db(e, t) {
  return e.roving ?? t;
}
function Ob(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function qb(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    Ar,
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
function Hb(e) {
  const t = y(), a = Vt({ orientation: "vertical" }), r = Db(e, a), o = Bb(e);
  return /* @__PURE__ */ i("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": bt(o), "data-gate": bt(e.column.gate), children: [
    Pb(e.column, e.items.length, t),
    jb(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Ob(e, a), children: qb(e, r) })
  ] });
}
function Fb(e) {
  let t = String(e.inFlight) + " open · " + String(e.loadedThisWeek) + " done this week · " + String(e.agentsWorking) + (e.agentsWorking === 1 ? " agent working" : " agents working");
  return e.p50 !== void 0 && (t += " · p50 " + se(e.p50)), e.p90 !== void 0 && (t += " · p90 " + se(e.p90)), t;
}
function zb(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(E, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function Wb(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function u3(e) {
  return /* @__PURE__ */ i("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ i("div", { children: [
      /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Fb(e.rollups) })
    ] }),
    /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
      zb(e),
      Wb(e.onConfigure),
      /* @__PURE__ */ n(Dn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Kb(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Gb(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ye, { label: e.stage.name, checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ye, { label: e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function Ub(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ i(x, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + (t === 1 ? " agent" : " agents") }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Done" }) : null
  ] });
}
function h3(e) {
  const t = e.stage;
  return /* @__PURE__ */ i("div", { className: "ward-configrow", "data-mandatory": bt(Kb(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Gb(e) }),
    /* @__PURE__ */ n(E, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(Za, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Ub(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function m3(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ i("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(Ar, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Hb, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ i("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function Vb(e, t) {
  const a = Lr(e);
  a !== void 0 && t(a);
}
function Jb(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => Vb(r, a));
  }, [e, t, a]);
}
function Yb(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function Xb(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", oe(e.cost)]), t;
}
function Qb(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Be, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Zb(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function _3(e) {
  var s;
  const t = e.item, a = t.run, [r, o] = v((s = t.run) == null ? void 0 : s.lastStep);
  Jb(e.feed, t.key, o);
  const l = [...Yb(t), ...Xb(t)];
  return /* @__PURE__ */ i(dt, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ i("dl", { className: "ward-kv", children: [
      l.map((c) => /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Qb(a, r)
    ] }),
    Zb(t, e.actions)
  ] });
}
const ep = "_card_1nkkx_3", tp = "_head_1nkkx_30", np = "_mark_1nkkx_38", ap = "_name_1nkkx_50", rp = "_chips_1nkkx_71", op = "_description_1nkkx_77", lp = "_run_1nkkx_82", ip = "_sep_1nkkx_91", sp = "_facts_1nkkx_97", cp = "_fact_1nkkx_97", dp = "_factLabel_1nkkx_111", up = "_factValue_1nkkx_115", ie = {
  card: ep,
  head: tp,
  mark: np,
  name: ap,
  chips: rp,
  description: op,
  run: lp,
  sep: ip,
  facts: sp,
  fact: cp,
  factLabel: dp,
  factValue: up
}, hp = { live: "done", draft: "running", paused: "meta" };
function mp(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function _p({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: hp[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function wp({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function fp({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ i("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Be, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function vp({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ i("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function bp(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function pp({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: o, facts: l, className: s }) {
  const c = { "--stream": ye(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ i(
    "article",
    {
      "aria-current": d,
      className: mp(s),
      style: c,
      "data-selected": d,
      "data-paused": bp(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ i("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: T(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(wp, { description: e.description }),
        /* @__PURE__ */ n(fp, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(_p, { versions: e.versions }),
        /* @__PURE__ */ n(vp, { facts: l })
      ]
    }
  );
}
const gp = "_list_4dcyc_2", yp = "_row_4dcyc_11", Np = "_head_4dcyc_23", kp = "_id_4dcyc_30", $p = "_lock_4dcyc_35", Cp = "_reason_4dcyc_41", Sp = "_remove_4dcyc_46", Rp = "_clauses_4dcyc_50", xp = "_clause_4dcyc_50", Tp = "_label_4dcyc_64", Lp = "_cell_4dcyc_71", Ap = "_value_4dcyc_76", ue = {
  list: gp,
  row: yp,
  head: Np,
  id: kp,
  lock: $p,
  reason: Cp,
  remove: Sp,
  clauses: Rp,
  clause: xp,
  label: Tp,
  cell: Lp,
  value: Ap
}, Mr = ke(!1);
function w3({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(Mr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ue.list, "aria-label": t, children: e }) });
}
function Mp({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ue.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(E, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => a(e.key, o) });
}
function Ip({ reason: e }) {
  return /* @__PURE__ */ i("span", { className: ue.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ue.reason, children: e })
  ] });
}
function Ep({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ i("span", { className: ue.head, children: [
    /* @__PURE__ */ n("span", { className: ue.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Ip, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ue.remove, children: /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function ya(e, t) {
  return e.locked ? void 0 : t;
}
function f3({ rule: e, onChange: t, onRemove: a }) {
  if (!Ne(Mr)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = ya(e, t);
  return /* @__PURE__ */ i("li", { className: ue.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Ep, { rule: e, onRemove: ya(e, a) }),
    /* @__PURE__ */ n("dl", { className: ue.clauses, children: e.clauses.map((o) => /* @__PURE__ */ i("div", { className: ue.clause, children: [
      /* @__PURE__ */ n("dt", { className: ue.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ue.cell, children: /* @__PURE__ */ n(Mp, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const Bp = "_ladder_1xdeh_2", Pp = "_cell_1xdeh_7", jp = "_empty_1xdeh_26", Dp = "_name_1xdeh_34", Op = "_holder_1xdeh_40", qp = "_swatches_1xdeh_51", Hp = "_swatch_1xdeh_51", Fp = "_tilesFrame_1xdeh_78", zp = "_tiles_1xdeh_78", Wp = "_tile_1xdeh_78", Kp = "_bar_1xdeh_117", Gp = "_hex_1xdeh_128", Up = "_note_1xdeh_138", le = {
  ladder: Bp,
  cell: Pp,
  empty: jp,
  name: Dp,
  holder: Op,
  swatches: qp,
  swatch: Hp,
  tilesFrame: Fp,
  tiles: zp,
  tile: Wp,
  bar: Kp,
  hex: Gp,
  note: Up
}, v3 = "Not available yet";
function Vp(e) {
  return e.reserved ? "reserved" : pt(e.step) ? "validated" : "partial";
}
function Ir(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not available" : "free";
}
function Jp(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Yp({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(We, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${le.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Xp(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function Qp(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Na = (e) => String(e).padStart(2, "0");
function Zp(e, t, a) {
  return e === "reserved" ? "Reserved" : a ? "yours" : t ?? Ir(e, void 0);
}
function eg({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${le.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${le.hex} ward-ladder-hex`, children: r ? `step ${Na(e)}` : Jo(e) }),
    /* @__PURE__ */ n("span", { className: `${le.note} ward-ladder-note`, children: r ? a : `Step ${Na(e)} · ${a}` })
  ] });
}
function tg({ step: e, value: t, taken: a, onChange: r, presentation: o, disabled: l }) {
  const s = Vp(e), c = Ir(s, a), d = c !== "free", u = d || l, h = t === e.step, _ = e.name ?? `Step ${e.step}`, w = () => {
    u || r(e.step);
  }, N = `${_} · ${o === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...Qp(d, h, u), "data-validation": s, style: Jp(e, s), onClick: w, onKeyDown: (A) => Xp(A, w) }, label: N, name: _, holder: c, validation: s, note: Zp(s, a, h), step: e.step };
}
const ng = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${le.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${le.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(eg, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ i("span", { ...e.shared, className: `${le.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Yp, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${le.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${le.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function ag(e) {
  return ng[e.presentation](tg(e));
}
function rg(e) {
  for (const t of e)
    if (!t.reserved && !Jt(t.step)) throw new Error("colour ladder renders token steps only");
}
function og(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const lg = { list: le.ladder, swatches: le.swatches, tiles: le.tilesFrame };
function ig(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Er(e) {
  const t = e.takenBy ?? {}, a = (l) => {
    var s;
    (s = e.onChange) == null || s.call(e, l);
  };
  rg(e.steps);
  const r = og(e), o = e.steps.map((l) => /* @__PURE__ */ n(ag, { step: l, value: e.value, taken: t[l.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, l.step));
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour", ...ig(e.disabled === !0), className: `${lg[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: le.tiles, children: o }) : o });
}
const sg = "_rail_s06lm_2", cg = "_section_s06lm_12", dg = "_sectionFlush_s06lm_22", ug = "_head_s06lm_26", hg = "_headLabel_s06lm_34", mg = "_sample_s06lm_42", _g = "_sampleLabel_s06lm_47", wg = "_sampleTitle_s06lm_54", fg = "_sampleMeta_s06lm_59", vg = "_trace_s06lm_65", bg = "_traceHead_s06lm_70", pg = "_steps_s06lm_78", gg = "_step_s06lm_78", yg = "_stepTitle_s06lm_97", Ng = "_hollow_s06lm_107", kg = "_stepBody_s06lm_115", $g = "_stepDetail_s06lm_127", Cg = "_publish_s06lm_132", Sg = "_reason_s06lm_138", Rg = "_note_s06lm_143", xg = "_reveal_s06lm_148", $ = {
  rail: sg,
  section: cg,
  sectionFlush: dg,
  head: ug,
  headLabel: hg,
  sample: mg,
  sampleLabel: _g,
  sampleTitle: wg,
  sampleMeta: fg,
  trace: vg,
  traceHead: bg,
  steps: pg,
  step: gg,
  stepTitle: yg,
  hollow: Ng,
  stepBody: kg,
  stepDetail: $g,
  publish: Cg,
  reason: Sg,
  note: Rg,
  reveal: xg
}, ka = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Tg = { running: "Dry run running.", notRun: "Run a dry run first.", failed: "Dry run failed." }, Lg = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Ag = { notSimulated: "not simulated", running: "running" };
function Mg(e) {
  return e.presentation === "foundry";
}
function Ig(e, t) {
  if (e.status === "running") return "Wait for the dry run to finish.";
  const a = t.find((r) => !r.met);
  return a ? `Not ready: ${a.text}` : e.status === "passed" ? null : "Pass a dry run first.";
}
function Eg(e, t) {
  var r;
  const a = Tg[e.status];
  return a !== void 0 ? a : ((r = t.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function Bg(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Pg(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function jg(e) {
  if (Bg(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Dg(e) {
  const [t, a] = v(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Og(e) {
  const t = Ag[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(We, { size: 6, kind: Lg[e.kind], label: e.kind });
}
function qg(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ i("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Hg(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Be, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Fg(e) {
  const { step: t } = e;
  return /* @__PURE__ */ i(Dg, { kind: t.kind, children: [
    /* @__PURE__ */ n(Og, { kind: t.kind }),
    /* @__PURE__ */ i("span", { className: $.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: $.stepTitle, children: t.title }),
      /* @__PURE__ */ n(qg, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Hg, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function zg(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(se(t)), a.join(" · ");
}
function Br(e) {
  const t = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ i("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.traceHead, id: t, children: zg(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: $.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(Fg, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function Wg(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ i("div", { className: `${$.sample} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ i("p", { className: $.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ i("p", { className: $.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function Kg(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + me(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample: " + e.sample.key + " · " + e.sample.title + t + ". Nothing saved." });
}
function Gg(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : oe(e.run.cost), label: "Cost" }, { value: e.run.turns ? Fa(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Qt, { divided: !0, cells: t }) });
}
function Ug(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: oe(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: Fa(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function Vg(e) {
  const t = Ug(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ i("p", { className: $.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Qt, { divided: !0, cells: t }) });
}
function Pr(e) {
  const t = y();
  return e.reason !== null ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("p", { className: `${$.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Jg(e) {
  return /* @__PURE__ */ i("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ n(Pr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: $.note, children: e.note })
  ] });
}
function Yg(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ n(Pr, { reason: e.reason, onPublish: e.onPublish }) });
}
function jr(e) {
  return /* @__PURE__ */ i("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: ka[e.run.status].role, label: ka[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Be, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Xg(e, t) {
  const [a, r] = v(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((t == null ? void 0 : t.subscribe) === void 0 || e.status !== "running"))
      return t.subscribe("*", (o) => {
        (o.type === "run.step" || o.type === "run.finding") && r((l) => {
          var s, c;
          return [...l, { kind: o.type === "run.finding" ? "finding" : "action", title: ((s = o.step) == null ? void 0 : s.label) ?? "step", detail: (c = o.step) == null ? void 0 : c.tool }];
        });
      });
  }, [t, e.status]), a;
}
function Qg(e) {
  var a;
  Pg(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(jr, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(Wg, { sample: e.run.sample }),
    /* @__PURE__ */ n(Br, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(Gg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(tn, { items: e.checklist }) }),
    /* @__PURE__ */ n(Jg, { reason: Ig(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Zg(e) {
  var r;
  const t = Xg(e.run, e.feed);
  jg(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(jr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(Kg, { sample: e.run.sample }),
    /* @__PURE__ */ n(Br, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(Vg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(tn, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Yg, { reason: Eg(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function b3(e) {
  return Mg(e) ? /* @__PURE__ */ n(Zg, { ...e }) : /* @__PURE__ */ n(Qg, { ...e });
}
const ey = "_list_142ip_3", ty = "_row_142ip_9", ny = "_condition_142ip_18", ay = "_action_142ip_24", Et = {
  list: ey,
  row: ty,
  condition: ny,
  action: ay
}, Dr = ke(!1);
function p3({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(Dr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: Et.list, "aria-label": t, children: e }) });
}
function g3({ rule: e }) {
  if (!Ne(Dr)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ i("li", { className: Et.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: Et.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: Et.action, children: e.then })
  ] });
}
const ry = "_move_tmppt_3", oy = {
  move: ry
};
function gn(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [o] = r.splice(t, 1);
  return r.splice(a, 0, o), r;
}
function Or(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function qr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function $a(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function ly(e) {
  return e === "up" ? "down" : "up";
}
function iy(e, t) {
  const a = $a(e, t.id, t.direction) ?? $a(e, t.id, ly(t.direction));
  a == null || a.focus();
}
function Hr() {
  const e = f(null), [t, a] = v(null), [r, o] = v("");
  return S(() => {
    e.current !== null && t !== null && iy(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), o(c);
  } };
}
function Fr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Ht({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${oy.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const sy = "_body_1jd1i_2", cy = "_title_1jd1i_8", dy = "_section_1jd1i_13", uy = "_legend_1jd1i_18", hy = "_stages_1jd1i_26", my = "_stage_1jd1i_26", _y = "_stageIndex_1jd1i_44", wy = "_stageName_1jd1i_50", fy = "_footer_1jd1i_59", vy = "_note_1jd1i_66", by = "_reason_1jd1i_71", py = "_actions_1jd1i_76", gy = "_webHead_1jd1i_83", yy = "_kicker_1jd1i_92", Ny = "_webTitle_1jd1i_99", ky = "_webBody_1jd1i_105", $y = "_webSection_1jd1i_109", Cy = "_sectionHead_1jd1i_121", Sy = "_sectionNote_1jd1i_129", Ry = "_formLabel_1jd1i_134", xy = "_identityRow_1jd1i_139", Ty = "_nameCell_1jd1i_145", Ly = "_keyCell_1jd1i_150", Ay = "_colourCell_1jd1i_154", My = "_colourStatus_1jd1i_161", Iy = "_webStages_1jd1i_166", Ey = "_webStageList_1jd1i_172", By = "_webStage_1jd1i_166", Py = "_webIndex_1jd1i_191", jy = "_webStageName_1jd1i_196", Dy = "_webMoves_1jd1i_201", Oy = "_addStage_1jd1i_215", qy = "_addStageButton_1jd1i_223", Hy = "_webFooter_1jd1i_236", Fy = "_webFooterNotes_1jd1i_244", zy = "_webNote_1jd1i_251", p = {
  body: sy,
  title: cy,
  section: dy,
  legend: uy,
  stages: hy,
  stage: my,
  stageIndex: _y,
  stageName: wy,
  footer: fy,
  note: vy,
  reason: by,
  actions: py,
  webHead: gy,
  kicker: yy,
  webTitle: Ny,
  webBody: ky,
  webSection: $y,
  sectionHead: Cy,
  sectionNote: Sy,
  formLabel: Ry,
  identityRow: xy,
  nameCell: Ty,
  keyCell: Ly,
  colourCell: Ay,
  colourStatus: My,
  webStages: Iy,
  webStageList: Ey,
  webStage: By,
  webIndex: Py,
  webStageName: jy,
  webMoves: Dy,
  addStage: Oy,
  addStageButton: qy,
  webFooter: Hy,
  webFooterNotes: Fy,
  webNote: zy
}, Wy = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent" },
  { value: "gate", label: "review" },
  { value: "terminal", label: "done" }
], zr = "not a known stage";
function Ky(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${zr}` }, ...a];
}
function Gy({ stage: e, index: t, catalogue: a, onName: r }) {
  const o = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(E, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const l = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${zr}`;
  return /* @__PURE__ */ n(E, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: Ky(a, e.name), invalid: l, onChange: r });
}
function Wr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function Uy(e) {
  const t = f([]), a = f(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function Vy({ id: e, stage: t, index: a, total: r, catalogue: o, onReplace: l, onMove: s }) {
  const c = Wr(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ i("li", { className: `${p.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: p.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: p.webStageName, children: /* @__PURE__ */ n(Gy, { stage: t, index: a, catalogue: o, onName: (u) => l({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(E, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: Wy, onChange: (u) => l({ ...t, kind: u }) }),
    /* @__PURE__ */ i("span", { className: p.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(Ht, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(Ht, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Jy({ stages: e, onChange: t, catalogue: a }) {
  const r = Uy(e.length), o = Hr(), l = (c, d) => {
    const u = Or(c, d);
    r.current = gn(r.current, c, u), o.moved({ id: r.current[u], direction: d }, qr(Wr(e[c], c), u, e.length)), t(gn(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ i("div", { className: p.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: p.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(Vy, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => l(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(Fr, { text: o.announcement }),
    /* @__PURE__ */ n("p", { className: p.addStage, children: /* @__PURE__ */ n("button", { type: "button", className: p.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }) })
  ] });
}
const Yy = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
];
function Xy({ stage: e }) {
  return e.gate && !yt(e.name, "Review") ? /* @__PURE__ */ n(m, { role: "gate", label: "Review" }) : null;
}
const Qy = [
  { value: "advance", label: "Move on when all checks pass", consequence: "No one needs to approve." },
  { value: "review", label: "Hold every item for review", consequence: "Every item waits for a reviewer." },
  { value: "block", label: "Stop on any finding", consequence: "A finding holds the item until a person clears it." }
], Kr = "Nothing runs until you publish.", Zy = "Add a name and a key.", eN = "At least 2 stages";
function Hn(e, t) {
  return !e.reserved && pt(e.step) && t[e.step] === void 0;
}
function tN(e, t) {
  const a = e.find((r) => Hn(r, t));
  return a ? a.step : 1;
}
function nN({ stages: e, onMove: t }) {
  const a = Hr(), r = (o, l) => {
    const s = Or(o, l);
    a.moved({ id: e[o].id, direction: l }, qr(e[o].name, s, e.length)), t(o, s);
  };
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: p.stages, "aria-label": "Stages in order", children: e.map((o, l) => /* @__PURE__ */ i("li", { className: p.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stageIndex, children: String(l + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: p.stageName, children: o.name }),
      /* @__PURE__ */ n(Xy, { stage: o }),
      l > 0 && /* @__PURE__ */ n(Ht, { id: o.id, name: o.name, direction: "up", onMove: () => r(l, "up") }),
      l < e.length - 1 && /* @__PURE__ */ n(Ht, { id: o.id, name: o.name, direction: "down", onMove: () => r(l, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(Fr, { text: a.announcement })
  ] });
}
function aN({ reason: e, onCreate: t, onDraft: a }) {
  const r = y();
  return /* @__PURE__ */ i("div", { className: p.footer, children: [
    /* @__PURE__ */ n("p", { className: p.note, children: Kr }),
    e && /* @__PURE__ */ n("p", { className: p.reason, id: r, children: e }),
    /* @__PURE__ */ i("div", { className: p.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function rN(e, t) {
  return e !== "" && t !== "" ? null : Zy;
}
function oN(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: o = Qy, onCreate: l, onDraft: s, onClose: c, returnFocusTo: d } = e, u = y(), [h, _] = v(""), [w, N] = v(""), [k, A] = v(t[0].value), [D, _e] = v(() => tN(a, r)), [ae, $e] = v(e.stages ?? Yy), [Xe, M] = v(o[0].value), V = { name: h, key: w, streamStep: D, owner: k, stages: ae, policy: Xe }, Ce = rN(h, w);
  return /* @__PURE__ */ n(dt, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ i("div", { className: p.body, children: [
    /* @__PURE__ */ n("h2", { className: p.title, id: u, children: "New stream" }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ n("legend", { className: p.legend, children: "Identity" }),
      /* @__PURE__ */ n(E, { kind: "input", label: "Name", value: h, onChange: _ }),
      /* @__PURE__ */ n(E, { kind: "input", label: "Key", value: w, onChange: N, mono: !0 }),
      /* @__PURE__ */ n(E, { kind: "select", label: "Owner", value: k, onChange: A, options: t })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ n("legend", { className: p.legend, children: "Colour" }),
      /* @__PURE__ */ n(Er, { label: "Colour", steps: a, value: D, onChange: _e, takenBy: r })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ n("legend", { className: p.legend, children: "Stages" }),
      /* @__PURE__ */ n(nN, { stages: ae, onMove: (Ke, Ro) => $e(gn(ae, Ke, Ro)) })
    ] }),
    /* @__PURE__ */ n(Nr, { legend: "When items move on", options: o, value: Xe, onChange: M }),
    /* @__PURE__ */ n(aN, { reason: Ce, onCreate: () => l(V), onDraft: () => s(V) })
  ] }) });
}
const Gr = [
  { value: "relay", label: "Through Trellis (safe default)", consequence: "Agents never write to Foundry or Jira directly." },
  { value: "direct", label: "Directly, each agent approved", consequence: "A second admin approves each agent." },
  { value: "readonly", label: "Read only", consequence: "Agents can read and report only." }
], lN = "Add a name, key, owner and two stages.";
function iN(e, t, a, r, o, l) {
  var c;
  const s = ((c = Gr.find((d) => d.value === o)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: l };
}
function sN(e, t) {
  return cN(e) && dN(e, t) && uN(e);
}
function cN(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function dN(e, t) {
  return e.colourStep === null || Hn({ step: e.colourStep }, t);
}
function uN(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function hN(e, t) {
  if (e === null || Hn({ step: e }, t)) return "";
  const a = t[e];
  return a === void 0 ? `Colour ${e} is not available yet.` : `Colour ${e} is taken by ${a}.`;
}
function mN({ ready: e, draft: t, onCreate: a, onDraft: r, reasonId: o }) {
  return /* @__PURE__ */ i("div", { className: p.webFooter, children: [
    /* @__PURE__ */ i("div", { className: p.webFooterNotes, children: [
      /* @__PURE__ */ n("p", { className: p.webNote, children: Kr }),
      !e && /* @__PURE__ */ n("p", { id: o, className: p.reason, children: lN })
    ] }),
    r && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => r(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => a(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: o, children: "Create stream" })
  ] });
}
function _N({ titleId: e }) {
  return /* @__PURE__ */ n("header", { className: p.webHead, children: /* @__PURE__ */ n("h2", { id: e, className: p.webTitle, children: "New stream" }) });
}
function wN({ name: e, setName: t, streamKey: a, setKey: r, colour: o, owner: l }) {
  return /* @__PURE__ */ i("section", { className: p.webSection, children: [
    /* @__PURE__ */ n("h3", { className: p.kicker, children: "Identity" }),
    /* @__PURE__ */ i("div", { className: p.identityRow, children: [
      /* @__PURE__ */ n("div", { className: p.nameCell, children: /* @__PURE__ */ n(E, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ n("div", { className: p.keyCell, children: /* @__PURE__ */ n(E, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      o
    ] }),
    l
  ] });
}
function fN(e) {
  const t = y(), a = y(), r = e.takenBy ?? {}, [o, l] = v(""), [s, c] = v(""), [d, u] = v(e.owners[0] ?? ""), [h, _] = v(null), [w, N] = v("relay"), [k, A] = v([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), D = iN(o, s, d, h, w, k), _e = sN(D, r), ae = /* @__PURE__ */ i("div", { className: p.colourCell, children: [
    /* @__PURE__ */ n("span", { className: p.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Er, { presentation: "swatches", label: "Colour", steps: e.ladder, value: h, onChange: _, takenBy: r })
  ] }), $e = hN(h, r), Xe = /* @__PURE__ */ i(x, { children: [
    $e && /* @__PURE__ */ n("p", { className: p.colourStatus, "data-colour-status": "", children: $e }),
    /* @__PURE__ */ n(E, { variant: "form", kind: "select", label: "Owner", value: d, options: e.owners.map((M) => ({ value: M, label: M })), onChange: u })
  ] });
  return /* @__PURE__ */ i(dt, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(_N, { titleId: a }),
    /* @__PURE__ */ i("div", { className: p.webBody, children: [
      /* @__PURE__ */ n(wN, { name: o, setName: l, streamKey: s, setKey: c, colour: ae, owner: Xe }),
      e.fields && /* @__PURE__ */ n("section", { className: p.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ i("section", { className: p.webSection, children: [
        /* @__PURE__ */ i("div", { className: p.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: p.kicker, children: "Stages" }),
          /* @__PURE__ */ n("span", { className: p.sectionNote, children: eN })
        ] }),
        /* @__PURE__ */ n(Jy, { stages: k, onChange: A })
      ] }),
      /* @__PURE__ */ n("section", { className: p.webSection, children: /* @__PURE__ */ n(Nr, { variant: "cards", legend: "How agents write", value: w, options: Gr, onChange: N }) }),
      /* @__PURE__ */ n(mN, { ready: _e, draft: D, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function y3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(fN, { ...e }) : /* @__PURE__ */ n(oN, { ...e });
}
const vN = "_row_bs8hc_2", bN = "_cell_bs8hc_6", pN = "_condition_bs8hc_11", gN = "_action_bs8hc_18", yN = "_contract_bs8hc_24", NN = "_contractCondition_bs8hc_33", kN = "_contractAction_bs8hc_39", ee = {
  row: vN,
  cell: bN,
  condition: pN,
  action: gN,
  contract: yN,
  contractCondition: NN,
  contractAction: kN
}, Ur = ["advance", "block", "escalate", "requestReview"], Ca = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Ft(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Fn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ee.action, children: Ca[e.then] }) : /* @__PURE__ */ n(
    E,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => t({ ...e, then: o }),
      options: Ur.map((o) => ({ value: o, label: Ca[o] }))
    }
  );
}
function $N({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ee.row, children: [
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n("span", { className: ee.condition, title: Ft(e, r), children: Ft(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: Fn(e, t, a) })
  ] });
}
function CN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ee.row, children: [
    /* @__PURE__ */ i("td", { className: ee.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ee.condition, children: Ft(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: Fn(e, t, a) })
  ] });
}
function SN({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("li", { className: ee.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ee.contractCondition, children: Ft(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ee.contractAction, children: Fn(e, t, a, !0) })
  ] });
}
const RN = { two: CN, four: $N, contract: SN };
function N3(e) {
  var a;
  if (!Ur.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = RN[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const xN = "_column_g1uat_2", TN = "_head_g1uat_17", LN = "_index_g1uat_23", AN = "_name_g1uat_29", MN = "_meta_g1uat_38", IN = "_mono_g1uat_43", EN = "_gate_g1uat_50", BN = "_reviewersLabel_g1uat_57", PN = "_reviewers_g1uat_57", jN = "_reviewer_g1uat_57", DN = "_agents_g1uat_74", ON = "_workflowColumn_g1uat_79", qN = "_workflowHead_g1uat_96", HN = "_stageRow_g1uat_102", FN = "_stageLabel_g1uat_109", zN = "_workflowTitle_g1uat_116", WN = "_workflowMeta_g1uat_122", KN = "_workflowGate_g1uat_127", GN = "_gateNote_g1uat_135", UN = "_cardNote_g1uat_140", VN = "_reviewerList_g1uat_145", JN = "_reviewerRow_g1uat_151", YN = "_reviewerMark_g1uat_157", XN = "_reviewerName_g1uat_167", QN = "_terminalCard_g1uat_173", ZN = "_terminalCount_g1uat_182", e1 = "_workflowAgents_g1uat_188", t1 = "_mount_g1uat_194", R = {
  column: xN,
  head: TN,
  index: LN,
  name: AN,
  meta: MN,
  mono: IN,
  gate: EN,
  reviewersLabel: BN,
  reviewers: PN,
  reviewer: jN,
  agents: DN,
  workflowColumn: ON,
  workflowHead: qN,
  stageRow: HN,
  stageLabel: FN,
  workflowTitle: zN,
  workflowMeta: WN,
  workflowGate: KN,
  gateNote: GN,
  cardNote: UN,
  reviewerList: VN,
  reviewerRow: JN,
  reviewerMark: YN,
  reviewerName: XN,
  terminalCard: QN,
  terminalCount: ZN,
  workflowAgents: e1,
  mount: t1
}, Sa = { entry: "Entry", agent: "Agent", gate: "Review", terminal: "Done" };
function zn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function Vr(e) {
  return `${Math.round(e * 100)}%`;
}
function n1({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Qt, { cells: [
      { value: Vr(e.gateShare), label: "Held for review" },
      { value: ne(e.count), label: "In stage" }
    ] })
  ] });
}
function a1({ stage: e }) {
  return /* @__PURE__ */ n(Qt, { cells: [
    { value: ne(e.count), label: "In stage" },
    { value: zn(e.closedThisWeek, ne), label: "Closed this week" }
  ] });
}
function r1({ stage: e, titleId: t }) {
  return /* @__PURE__ */ i("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    yt(e.name, Sa[e.kind]) ? null : /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: Sa[e.kind] })
  ] });
}
function o1({ stage: e }) {
  return /* @__PURE__ */ i("p", { className: R.meta, children: [
    /* @__PURE__ */ i("span", { className: R.mono, children: [
      ne(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ i("span", { className: R.mono, children: [
      se(e.medianWait),
      " median wait"
    ] })
  ] });
}
function l1({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(n1, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(a1, { stage: e }) : null;
}
function i1({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Add an agent" }) : null;
}
function s1({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const o = y(), l = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("section", { className: R.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(r1, { stage: e, titleId: o }),
    /* @__PURE__ */ n(o1, { stage: e }),
    /* @__PURE__ */ n(l1, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(pp, { ...s, connection: l }, s.agent.id)) }),
    /* @__PURE__ */ n(i1, { onMount: a })
  ] });
}
const c1 = {
  gate: { role: "gate", label: "Review" },
  terminal: { role: "quiet", label: "Done" }
};
function d1({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ i("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function u1({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.gateNote, children: t.length === 0 ? "A person moves items on." : "Needs approval from:" }),
    t.length === 0 ? null : /* @__PURE__ */ n(d1, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ i("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: Vr(e.gateShare) }),
      " of time here"
    ] })
  ] });
}
function h1(e) {
  return e === void 0 ? "closed this week" : `closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function m1({ stage: e }) {
  return /* @__PURE__ */ i("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: zn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: h1(e.rolledBackThisWeek) })
  ] });
}
function _1(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function w1(e) {
  if (e.kind === "terminal") return `${zn(e.closedThisWeek)} this week`;
  const t = _1(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function f1({ stage: e, titleId: t }) {
  const a = c1[e.kind];
  return /* @__PURE__ */ i("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ i("span", { className: R.stageRow, children: [
      /* @__PURE__ */ i("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 || yt(e.name, a.label) ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: w1(e) })
  ] });
}
function v1(e) {
  return e === "entry" || e === "agent";
}
function b1({ stage: e, onMount: t }) {
  return t === void 0 || !v1(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Add agent" });
}
function p1({ stage: e, agentCards: t, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ i("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(f1, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(u1, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(m1, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(b1, { stage: e, onMount: a })
  ] });
}
function g1(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function k3(e) {
  return g1(e) ? /* @__PURE__ */ n(p1, { ...e }) : /* @__PURE__ */ n(s1, { ...e });
}
const y1 = "_row_1tdra_6", N1 = "_name_1tdra_12", k1 = "_compactRow_1tdra_13", $1 = "_compactName_1tdra_13", C1 = "_cell_1tdra_30", S1 = "_chain_1tdra_45", R1 = "_owner_1tdra_51", x1 = "_mono_1tdra_57", T1 = "_compactCell_1tdra_79", L1 = "_stack_1tdra_96", A1 = "_stat_1tdra_103", M1 = "_identityLine_1tdra_110", I1 = "_identity_1tdra_110", E1 = "_ownerLine_1tdra_140", B1 = "_link_1tdra_160", P1 = "_gateMark_1tdra_166", j1 = "_emptyChain_1tdra_171", D1 = "_arrow_1tdra_177", O1 = "_muted_1tdra_182", q1 = "_define_1tdra_187", H1 = "_statValue_1tdra_194", F1 = "_policyId_1tdra_200", z1 = "_sub_1tdra_205", g = {
  row: y1,
  name: N1,
  compactRow: k1,
  compactName: $1,
  cell: C1,
  chain: S1,
  owner: R1,
  mono: x1,
  compactCell: T1,
  stack: L1,
  stat: A1,
  identityLine: M1,
  identity: I1,
  ownerLine: E1,
  link: B1,
  gateMark: P1,
  emptyChain: j1,
  arrow: D1,
  muted: O1,
  define: q1,
  statValue: H1,
  policyId: F1,
  sub: z1
};
function Jr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: l } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: l };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function W1(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function K1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Yr(e) {
  return `${ne(e)} ${e === 1 ? "member" : "members"}`;
}
function G1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Yr(e.members)}`;
}
function U1(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ i("span", { className: g.stack, children: [
    /* @__PURE__ */ i("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: T(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: G1(e) })
  ] }) });
}
function Xr({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ i(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (review)" }) : null
  ] });
}
function V1(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = Xt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function J1({ stages: e, streamStep: t }) {
  const a = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((o, l) => /* @__PURE__ */ i("span", { className: g.link, children: [
    /* @__PURE__ */ n(Xr, { name: o.name, gate: o.gate === !0, look: V1(l, a, t), size: "tag" }),
    l === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${l}`)) });
}
function Y1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ i("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : J1(e) });
}
function Qr(e) {
  return e === void 0 ? void 0 : !0;
}
function Ra(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Qr(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function X1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function Q1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Z1({ stream: e, href: t, presentation: a }) {
  const r = K1(a.className);
  return /* @__PURE__ */ i("tr", { className: `${r} ward-streamrow`, onClick: Jr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ye(e.streamStep, "chip") }, children: [
    U1(e, t),
    Y1(e),
    Ra(Q1(e.agents), e.agents === void 0 ? void 0 : W1(e.agents), "—"),
    X1(e.policy),
    Ra(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function ek(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function $3(e) {
  if (ek(e)) return Z1(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ i("tr", { className: g.row, onClick: Jr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ i("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: T(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...In(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(Xr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ i("span", { className: g.mono, children: [
      t.agents.live,
      " live · ",
      t.agents.draft,
      " draft · ",
      t.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ i("td", { className: g.cell, children: [
      /* @__PURE__ */ n("span", { className: g.owner, children: t.owner }),
      /* @__PURE__ */ n("span", { className: g.mono, children: Yr(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": Qr(t.inFlightHint), children: ne(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : se(t.p50) }) })
  ] });
}
const tk = "_row_2u4ll_2", nk = "_name_2u4ll_16", ak = "_scope_2u4ll_24", zt = {
  row: tk,
  name: nk,
  scope: ak
};
function Wn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function rk(e) {
  return e === void 0 ? `${zt.row} ward-toolrow` : `${zt.row} ward-toolrow ${e}`;
}
function ok(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "Locked by stream policy" };
}
function lk({ id: e, reasonId: t, tool: a, state: r, onChange: o }) {
  return /* @__PURE__ */ n(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: a.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? t : void 0,
      onChange: (l) => {
        r.locked || o(l.target.checked);
      }
    }
  );
}
function ik({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: Wn(e) });
}
function sk({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${zt.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function ck(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function C3({ tool: e, onChange: t, presentation: a }) {
  const r = y(), o = y(), l = ok(e, a), s = ck(a);
  return /* @__PURE__ */ i(s, { className: rk(a == null ? void 0 : a.className), "data-locked": l.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(lk, { id: r, reasonId: o, tool: e, state: l, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${zt.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(sk, { tool: e, state: l, reasonId: o }),
    /* @__PURE__ */ n(ik, { classification: e.classification }),
    l.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const dk = "_strip_4ppv9_2", uk = "_well_4ppv9_11", hk = "_head_4ppv9_18", mk = "_name_4ppv9_24", _k = "_chart_4ppv9_32", wk = "_segment_4ppv9_38", fk = "_detailedChart_4ppv9_44", vk = "_rail_4ppv9_57", bk = "_section_4ppv9_63", pk = "_label_4ppv9_74", gk = "_note_4ppv9_91", te = {
  strip: dk,
  well: uk,
  head: hk,
  name: mk,
  chart: _k,
  segment: wk,
  detailedChart: fk,
  rail: vk,
  section: bk,
  label: pk,
  note: gk
}, yk = "Nothing to preview.", yn = [1, 2, 3, 4, 5, 6], Wt = 100;
function Nk(e, t) {
  return t.has(e) ? ye(e, "id") : "var(--ward-color-line)";
}
function kk({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: te.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: yn.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: te.segment,
      x: o * Wt,
      y: "0",
      width: Wt,
      height: "8",
      fill: Nk(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function $k(e) {
  const t = e.slice(0, yn.length);
  for (; t.length < yn.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function Ck({ identities: e }) {
  return /* @__PURE__ */ i("figure", { className: `${te.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, a) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(a * Wt),
        y: "0",
        width: String(Wt),
        height: "40",
        style: { fill: ye(t.streamStep, "chip") }
      },
      t.key + String(a)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((t, a) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(a))) })
  ] });
}
function Zr(e) {
  return (t) => e == null ? void 0 : e(t);
}
function cn({ label: e, children: t }) {
  const a = y();
  return /* @__PURE__ */ i("section", { className: te.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: te.label, children: e }),
    t
  ] });
}
function Sk({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: te.note, children: t ?? yk }) : /* @__PURE__ */ n("div", { className: te.well, children: /* @__PURE__ */ n(en, { item: { ...e, streamStep: Xt(a.streamStep) }, onOpen: Zr(r), feed: null }) });
}
function Rk({ draft: e }) {
  const t = { "--stream": ye(e.streamStep, "id") };
  return /* @__PURE__ */ i("p", { className: te.head, style: t, children: [
    /* @__PURE__ */ n(We, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: te.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...In(e.key, e.streamStep) })
  ] });
}
function xk(e) {
  const t = $k(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ i("div", { className: te.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(cn, { label: "Board card", children: /* @__PURE__ */ n(Sk, { ...e, draft: a }) }),
    /* @__PURE__ */ n(cn, { label: "Streams index row", children: /* @__PURE__ */ n(Rk, { draft: a }) }),
    /* @__PURE__ */ n(cn, { label: "Overview chart segment", children: /* @__PURE__ */ n(Ck, { identities: t }) })
  ] });
}
function Tk({ draft: e, sample: t, streams: a, onOpen: r }) {
  const o = { "--stream": ye(e.streamStep, "id") };
  return /* @__PURE__ */ i("section", { className: te.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ i("div", { className: te.head, children: [
      /* @__PURE__ */ n(We, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: te.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...In(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: te.well, children: /* @__PURE__ */ n(en, { item: { ...t, streamStep: e.streamStep }, onOpen: Zr(r) }) }),
    /* @__PURE__ */ n(kk, { draft: e, streams: a })
  ] });
}
function S3(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(xk, { ...e }) : /* @__PURE__ */ n(Tk, { ...e });
}
const Lk = "_row_ixlg5_6", Ak = "_headCell_ixlg5_10", Mk = "_cell_ixlg5_11", Ik = "_name_ixlg5_23", Ek = "_consequence_ixlg5_29", Bk = "_governed_ixlg5_36", Pk = "_control_ixlg5_42", jk = "_byRole_ixlg5_48", Dk = "_webControl_ixlg5_59", Ok = "_webConsequence_ixlg5_65", qk = "_webGoverned_ixlg5_71", F = {
  row: Lk,
  headCell: Ak,
  cell: Mk,
  name: Ik,
  consequence: Ek,
  governed: Bk,
  control: Pk,
  byRole: jk,
  webControl: Dk,
  webConsequence: Ok,
  webGoverned: qk
};
function Hk({
  capability: e,
  cell: t,
  onChange: a
}) {
  return t.value === "byRole" ? /* @__PURE__ */ n("span", { className: F.byRole, children: "by role" }) : /* @__PURE__ */ i("span", { className: F.control, children: [
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
function Fk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: F.row, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: F.headCell, children: [
      /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: F.consequence, children: e.consequence }),
      /* @__PURE__ */ i("span", { className: F.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(Hk, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function zk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Wk({ name: e, cell: t, onChange: a }) {
  if (t.value === "byRole") return /* @__PURE__ */ n("span", { className: `${F.webControl} ${F.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Ye,
    {
      label: `${e} · step ${t.streamStep}`,
      checked: t.value === "on",
      disabled: a === void 0,
      onChange: (o) => a == null ? void 0 : a(t.streamStep, o ? "on" : "off")
    }
  );
  return t.value !== "pilot" ? r : /* @__PURE__ */ i("span", { className: `${F.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function Kk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: F.row, children: [
    /* @__PURE__ */ i("td", { className: F.cell, children: [
      /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${F.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(Wk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webGoverned} ward-cellmeta`, children: zk(e) }) })
  ] });
}
function R3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Kk, { ...e }) : /* @__PURE__ */ n(Fk, { ...e });
}
const Gk = "_row_vv64h_2", Uk = "_cell_vv64h_6", Vk = "_name_vv64h_25", Jk = "_note_vv64h_30", Yk = "_webName_vv64h_41", Xk = "_webMeta_vv64h_47", Y = {
  row: Gk,
  cell: Uk,
  name: Vk,
  note: Jk,
  webName: Yk,
  webMeta: Xk
}, eo = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function Qk(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Zk({ component: e, onRestart: t }) {
  const a = y(), r = eo[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ i("tr", { className: Y.row, children: [
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n("span", { className: Y.name, children: e.name }) }),
    /* @__PURE__ */ i("td", { className: Y.cell, "data-mono": "true", children: [
      ne(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n("span", { id: a, className: Y.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: Y.cell, "data-align": "end", children: o ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function e$({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: Qk(e.state) });
}
function t$({ component: e, onRestart: t }) {
  return /* @__PURE__ */ i("tr", { className: Y.row, children: [
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n("span", { className: `${Y.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n("span", { className: `${Y.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n(m, { ...eo[e.state] }) }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n(e$, { component: e, onRestart: t }) })
  ] });
}
function x3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(t$, { ...e }) : /* @__PURE__ */ n(Zk, { ...e });
}
const n$ = "_row_jcm5k_7", a$ = "_cell_jcm5k_11", r$ = "_next_jcm5k_28", o$ = "_headCell_jcm5k_38", l$ = "_webId_jcm5k_77", i$ = "_webPurpose_jcm5k_83", s$ = "_webMeta_jcm5k_91", c$ = "_webUrgent_jcm5k_97", W = {
  row: n$,
  cell: a$,
  next: r$,
  headCell: o$,
  webId: l$,
  webPurpose: i$,
  webMeta: s$,
  webUrgent: c$
}, d$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "Managed by sign-in provider" }
}, u$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, to = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], h$ = Object.fromEntries(to.map((e) => [e.key, e]));
function Ze({ column: e, children: t }) {
  const a = h$[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: W.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: t
    }
  );
}
function T3() {
  return /* @__PURE__ */ n("tr", { children: to.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: W.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function m$({ cred: e }) {
  const t = d$[e.state];
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ n(Ze, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Ze, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Ze, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(Ze, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Wn(e.cls) }) }),
    /* @__PURE__ */ n(Ze, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Ze, { column: "next", children: /* @__PURE__ */ n("span", { className: W.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function _$({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${W.webMeta} ${W.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function w$({ cred: e }) {
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(_$, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(m, { ...u$[e.state] }) })
  ] });
}
function L3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(w$, { ...e }) : /* @__PURE__ */ n(m$, { ...e });
}
const f$ = "_card_lpp45_2", v$ = "_head_lpp45_11", b$ = "_env_lpp45_18", p$ = "_version_lpp45_25", g$ = "_meta_lpp45_32", y$ = "_webCard_lpp45_37", N$ = "_webRow_lpp45_47", k$ = "_webTitle_lpp45_55", $$ = "_webLine_lpp45_65", C$ = "_webVersion_lpp45_72", S$ = "_webMeta_lpp45_77", J = {
  card: f$,
  head: v$,
  env: b$,
  version: p$,
  meta: g$,
  webCard: y$,
  webRow: N$,
  webTitle: k$,
  webLine: $$,
  webVersion: C$,
  webMeta: S$
}, xa = { dev: "Dev", uat: "UAT", prod: "Prod" }, no = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function R$({ env: e }) {
  const t = no[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ i("section", { className: J.card, "aria-label": xa[e.env], children: [
    /* @__PURE__ */ i("div", { className: J.head, children: [
      /* @__PURE__ */ n("span", { className: J.env, children: xa[e.env] }),
      /* @__PURE__ */ n(m, { role: t.role, label: t.label })
    ] }),
    /* @__PURE__ */ n("p", { className: J.version, children: e.version }),
    /* @__PURE__ */ i("p", { className: J.meta, children: [
      "deployed ",
      me(e.deployedAt)
    ] }),
    a && /* @__PURE__ */ n("p", { className: J.meta, children: a })
  ] });
}
function x$(e) {
  const t = e.by !== void 0 ? `by ${e.by}` : null;
  return [me(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function T$(e) {
  return /* @__PURE__ */ i("article", { className: `${J.webCard} ward-envcard`, children: [
    /* @__PURE__ */ i("span", { className: `${J.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${J.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...no[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${J.version} ${J.webVersion} ${J.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${J.meta} ${J.webMeta} ${J.webLine} ward-cellmeta`, children: x$(e) })
  ] });
}
function A3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(T$, { ...e }) : /* @__PURE__ */ n(R$, { ...e });
}
const L$ = "_panel_1hmja_2", A$ = "_line_1hmja_8", M$ = "_actions_1hmja_14", St = {
  panel: L$,
  line: A$,
  actions: M$
};
function M3(e) {
  return /* @__PURE__ */ i("div", { className: St.panel, children: [
    /* @__PURE__ */ n("p", { className: St.line, children: e.status }),
    /* @__PURE__ */ n(E, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: St.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: St.line, children: e.note ?? "" })
  ] });
}
const I$ = "_upload_13fcl_2", E$ = "_preview_13fcl_7", B$ = "_mark_13fcl_17", P$ = "_empty_13fcl_22", j$ = "_actions_13fcl_28", D$ = "_input_13fcl_33", O$ = "_reasons_13fcl_41", q$ = "_reason_13fcl_41", H$ = "_accepted_13fcl_57", re = {
  upload: I$,
  preview: E$,
  mark: B$,
  empty: P$,
  actions: j$,
  input: D$,
  reasons: O$,
  reason: q$,
  accepted: H$
}, ao = 1.5, ro = 22, Kt = "script elements or event handlers", Oe = "links or external references", Me = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${ao}px at ${ro}px`], F$ = [Me[1], Me[2], Kt, Oe], z$ = /* @__PURE__ */ new Map([
  ["image", Me[1]],
  ["text", Me[2]],
  ["tspan", Me[2]],
  ["textPath", Me[2]],
  ["script", Kt],
  ["foreignObject", Kt],
  ["a", Oe],
  ["use", Oe],
  ["style", Oe],
  ["feImage", Oe],
  ["set", Oe]
]), W$ = "http://www.w3.org/2000/svg", K$ = "http://www.w3.org/2000/xmlns/", G$ = /* @__PURE__ */ new Set([
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
]), U$ = /* @__PURE__ */ new Set([
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
]), Kn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, V$ = /url\s*\(|['"\\]/i;
function J$() {
  return { ok: !1, reasons: [Me[1]] };
}
function oo(e) {
  return e.namespaceURI === W$;
}
function Y$(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && oo(t) ? t : null;
  } catch {
    return null;
  }
}
function X$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [Me[0]] : [];
}
function Q$(e) {
  return z$.get(e.localName) ?? (e.localName.startsWith("animate") ? Oe : void 0);
}
function Z$(e) {
  return V$.test(e.replace(Kn, ""));
}
function e0(e) {
  return /^on/i.test(e.localName) ? Kt : e.localName === "href" || Z$(e.value) ? Oe : void 0;
}
function t0(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(Q$(a));
    for (const r of Array.from(a.attributes)) t.add(e0(r));
  }
  return F$.filter((a) => t.has(a));
}
function n0(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((o) => Number.isFinite(o) && o > 0), 0), r = a > 0 ? ro / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const l = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(l) && l * r < ao;
  }) ? [Me[3]] : [];
}
function a0(e) {
  if (e.namespaceURI === K$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (U$.has(t) || t.startsWith("stroke"));
}
function r0(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && oo(t) && G$.has(t.localName);
}
function o0(e, t) {
  r0(t) ? t.nodeType === Node.ELEMENT_NODE && lo(t) : e.removeChild(t);
}
function lo(e) {
  for (const t of Array.from(e.attributes)) a0(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) o0(e, t);
  return e;
}
function l0(e) {
  return Array.from(e.matchAll(Kn), (t) => t[2]).filter((t) => t !== "");
}
function i0(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function s0(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const l of l0(o.value)) a.has(l) || a.set(l, `${t}-${a.size}`);
  return a;
}
function c0(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(Kn, (r, o, l) => {
      const s = t.get(l);
      return s === void 0 ? r : r.replace(`#${l}`, `#${s}`);
    });
}
function d0(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = s0(a, t);
  for (const o of a) {
    const l = r.get(o.getAttribute("id") ?? "");
    l === void 0 ? o.removeAttribute("id") : o.setAttribute("id", l), c0(o, r);
  }
  return e;
}
function I3(e) {
  const t = Y$(e);
  if (t === null) return J$();
  const a = [...X$(t), ...t0(t), ...n0(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(d0(lo(t), i0(e))) };
}
const u0 = "Mark accepted.", h0 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, m0 = new Set(Wa.flatMap((e) => [ye(e, "id"), ye(e, "chip")]));
function _0(e) {
  return e !== void 0 && (h0.test(e) || m0.has(e)) ? e : void 0;
}
function w0({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: re.preview, style: { "--mark": _0(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: re.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: re.empty }) });
}
function f0(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function v0(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function b0({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: re.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: re.result, role: "status", children: /* @__PURE__ */ n("p", { className: re.accepted, children: u0 }) }) : /* @__PURE__ */ n("div", { className: re.result, role: "status", children: /* @__PURE__ */ n("ul", { className: re.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: re.reason, children: t }, t)) }) });
}
function p0({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(b0, { result: e }) : /* @__PURE__ */ n("p", { className: `${re.result} ${f0(e, a)}`, role: "status", children: v0(e, a) });
}
function Ta(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function E3({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: o }) {
  const l = f(null), [s, c] = v(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ i("div", { className: re.upload, children: [
    /* @__PURE__ */ n(w0, { current: e }),
    /* @__PURE__ */ i("div", { className: re.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: l,
          className: re.input,
          type: "file",
          accept: "image/svg+xml",
          "aria-label": "Mark file",
          disabled: o !== void 0,
          onChange: (u) => {
            var h;
            return d((h = u.target.files) == null ? void 0 : h[0]);
          }
        }
      ),
      /* @__PURE__ */ n(b, { ...Ta(o), onClick: () => {
        var u;
        return (u = l.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...Ta(o), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(p0, { result: s, presentation: r })
  ] });
}
const g0 = "_row_o3t6y_7", y0 = "_cell_o3t6y_11", N0 = "_head_o3t6y_28", k0 = "_name_o3t6y_34", $0 = "_pinned_o3t6y_42", C0 = "_headCell_o3t6y_49", S0 = "_webName_o3t6y_88", R0 = "_webMeta_o3t6y_95", x0 = "_webWarn_o3t6y_103", O = {
  row: g0,
  cell: y0,
  head: N0,
  name: k0,
  pinned: $0,
  headCell: C0,
  webName: S0,
  webMeta: R0,
  webWarn: x0
}, Gn = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, io = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], T0 = Object.fromEntries(io.map((e) => [e.key, e]));
function L0(e, t) {
  return `mcp.${e}.${t}`;
}
function A0(e) {
  return Object.keys(Gn).includes(e);
}
function M0(e) {
  return Gn[e !== void 0 && A0(e) ? e : "unknown"];
}
function ut({ column: e, children: t }) {
  const a = T0[e];
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
function B3() {
  return /* @__PURE__ */ n("tr", { children: io.map((e) => /* @__PURE__ */ n(
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
function I0({ server: e }) {
  const t = Gn[e.connection];
  return /* @__PURE__ */ i("tr", { className: O.row, children: [
    /* @__PURE__ */ i(ut, { column: "name", children: [
      /* @__PURE__ */ i("span", { className: O.head, children: [
        /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Wn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ i("span", { className: O.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(ut, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(ut, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(ut, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(ut, { column: "tools", children: e.tools.map((a) => L0(e.name, a)).join(" · ") })
  ] });
}
function E0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function B0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Can write" } : { role: "meta", label: "Read only" };
}
function P0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${O.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e });
}
function j0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: "Restart not set up" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function D0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function O0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ i("tr", { className: O.row, children: [
    /* @__PURE__ */ i("td", { className: O.cell, children: [
      /* @__PURE__ */ n("span", { className: `${O.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: E0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta ward-truncate`, title: o.map((l) => l.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...B0(e) }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(P0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...M0(e.connection) }) }),
    /* @__PURE__ */ i("td", { className: O.cell, children: [
      /* @__PURE__ */ n(j0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(D0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function P3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(O0, { ...e }) : /* @__PURE__ */ n(I0, { ...e });
}
const q0 = "_row_zgozg_2", H0 = "_headCell_zgozg_14", F0 = "_cell_zgozg_15", z0 = "_name_zgozg_26", W0 = "_consequence_zgozg_32", K0 = "_reason_zgozg_38", G0 = "_value_zgozg_44", U0 = "_webRow_zgozg_69", V0 = "_webSetting_zgozg_82", J0 = "_webName_zgozg_90", Y0 = "_webConsequence_zgozg_98", X0 = "_webControl_zgozg_104", Q0 = "_webState_zgozg_118", Z0 = "_webChip_zgozg_123", j = {
  row: q0,
  headCell: H0,
  cell: F0,
  name: z0,
  consequence: W0,
  reason: K0,
  value: G0,
  webRow: U0,
  webSetting: V0,
  webName: J0,
  webConsequence: Y0,
  webControl: X0,
  webState: Q0,
  webChip: Z0
}, so = 104, co = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function eC({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ye, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(gr, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: j.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function tC({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = y(), l = co[a], s = a === "locked";
  return /* @__PURE__ */ i("tr", { className: j.row, "data-inheritance": a, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: j.headCell, children: [
      /* @__PURE__ */ n("span", { className: j.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: j.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: j.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n(eC, { control: t, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: j.cell, style: { width: so }, children: /* @__PURE__ */ n(m, { role: l.role, label: l.label }) })
  ] });
}
function uo(e, t) {
  return String(e ?? t);
}
function nC(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function aC(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? uo(e.value, "—");
}
function rC({ control: e, name: t, locked: a, describedBy: r, onChange: o }) {
  const l = e.value === !0;
  return /* @__PURE__ */ i("span", { className: j.webControl, children: [
    /* @__PURE__ */ n(Ye, { label: t, labelHidden: !0, checked: l, locked: a, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ n("span", { className: j.webState, "aria-hidden": "true", children: a || l ? "on" : "off" })
  ] });
}
function oC(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(rC, { ...e });
  const o = nC(t, a);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: j.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(gr, { options: o, value: uo(t.value, ""), onChange: (l) => r == null ? void 0 : r(l) }) }) : /* @__PURE__ */ n("span", { className: `${j.webControl} ${j.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: aC(t) });
}
function lC({ setting: e, control: t, inheritance: a, reason: r, onChange: o, renderControl: l }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ i("div", { className: `${j.row} ${j.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ i("span", { className: j.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${j.name} ${j.webName}`, children: e.name }),
      /* @__PURE__ */ i("p", { id: s, className: `${j.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    l ? /* @__PURE__ */ n("span", { className: j.webControl, children: l(s) }) : /* @__PURE__ */ n(oC, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${j.webChip} ward-policy-chip`, style: { width: so }, children: /* @__PURE__ */ n(m, { ...co[a], size: "tag" }) })
  ] });
}
function j3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(lC, { ...e }) : /* @__PURE__ */ n(tC, { ...e });
}
const iC = "_label_1fzq1_7", sC = "_name_1fzq1_15", cC = "_column_1fzq1_24", dC = "_webFrame_1fzq1_57", uC = "_webHead_1fzq1_62", hC = "_webHeadLabel_1fzq1_74", mC = "_webLabel_1fzq1_118", _C = "_webColumns_1fzq1_125", wC = "_webGroup_1fzq1_131", fC = "_webPeople_1fzq1_132", vC = "_webVia_1fzq1_133", bC = "_webMeta_1fzq1_162", K = {
  label: iC,
  name: sC,
  column: cC,
  webFrame: dC,
  webHead: uC,
  webHeadLabel: hC,
  webLabel: mC,
  webColumns: _C,
  webGroup: wC,
  webPeople: fC,
  webVia: vC,
  webMeta: bC
}, pC = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, dn = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function un({ column: e, children: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: K.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: t
    }
  );
}
function gC(e) {
  if (!e.matrixRole) return;
  const t = pC[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function yC({ node: e }) {
  const t = gC(e);
  return /* @__PURE__ */ i("span", { className: K.label, children: [
    /* @__PURE__ */ n("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ n(NC, { role: t, node: e }),
    /* @__PURE__ */ n(un, { column: dn[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(un, { column: dn[1], children: e.people === void 0 ? "" : ne(e.people) }),
    /* @__PURE__ */ n(un, { column: dn[2], children: e.requestedVia ?? "" })
  ] });
}
function NC({ role: e, node: t }) {
  return /* @__PURE__ */ i(x, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function kC({ index: e, depth: t, node: a, expanded: r, leaf: o, onToggle: l, children: s }) {
  return /* @__PURE__ */ n(
    Rr,
    {
      index: e,
      depth: t,
      leaf: o,
      expanded: r,
      onToggle: l,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(yC, { node: a }),
      children: s
    }
  );
}
function hn({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function $C({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${K.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(hn, { className: `${K.webMeta} ${K.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(hn, { className: `${K.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(hn, { className: `${K.webMeta} ${K.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function CC() {
  return /* @__PURE__ */ i("div", { className: K.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: K.webHeadLabel, children: "Who has which role" }),
    /* @__PURE__ */ i("span", { className: K.webColumns, children: [
      /* @__PURE__ */ n("span", { className: K.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: K.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: K.webVia, children: "Requested via" })
    ] })
  ] });
}
function SC({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${K.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "default" }) : null
  ] });
}
function RC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function xC({ rows: e, label: t }) {
  return /* @__PURE__ */ i("div", { className: K.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(CC, {}),
    /* @__PURE__ */ n(vw, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      Rr,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(SC, { row: a }),
        detail: /* @__PURE__ */ n($C, { row: a }),
        expanded: RC(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function D3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(xC, { ...e }) : /* @__PURE__ */ n(kC, { ...e });
}
const TC = "_runbook_b9agc_2", LC = "_list_b9agc_7", AC = "_step_b9agc_15", MC = "_numeral_b9agc_21", IC = "_body_b9agc_28", EC = "_head_b9agc_34", BC = "_title_b9agc_40", PC = "_detail_b9agc_45", jC = "_actions_b9agc_50", DC = "_webList_b9agc_56", OC = "_webStep_b9agc_60", qC = "_webBody_b9agc_66", HC = "_webTitle_b9agc_74", FC = "_webDetail_b9agc_78", B = {
  runbook: TC,
  list: LC,
  step: AC,
  numeral: MC,
  body: IC,
  head: EC,
  title: BC,
  detail: PC,
  actions: jC,
  webList: DC,
  webStep: OC,
  webBody: qC,
  webTitle: HC,
  webDetail: FC
}, ho = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function mo(e) {
  return String(e + 1).padStart(2, "0");
}
function zC({ step: e, index: t, connection: a }) {
  const r = ho[e.state], o = e.state === "running";
  return /* @__PURE__ */ i("li", { className: B.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: B.numeral, children: mo(t) }),
    /* @__PURE__ */ i("span", { className: B.body, children: [
      /* @__PURE__ */ i("span", { className: B.head, children: [
        /* @__PURE__ */ n("span", { className: B.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        o && e.startedAt && /* @__PURE__ */ n(Be, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ n("span", { className: B.detail, children: e.detail })
    ] })
  ] });
}
function WC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: B.runbook, children: [
    /* @__PURE__ */ n("ol", { className: B.list, children: e.map((r, o) => /* @__PURE__ */ n(zC, { step: r, index: o, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: B.actions, children: t })
  ] });
}
function KC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ i("li", { className: `${B.step} ${B.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${B.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: mo(t) }),
    /* @__PURE__ */ i("span", { className: `${B.body} ${B.webBody}`, children: [
      /* @__PURE__ */ i("span", { className: `${B.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${B.title} ${B.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...ho[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Be, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${B.detail} ${B.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function GC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: B.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${B.list} ${B.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(KC, { step: r, index: o, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${B.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function O3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(GC, { ...e }) : /* @__PURE__ */ n(WC, { ...e });
}
const UC = "_list_1gu6a_2", VC = "_check_1gu6a_10", JC = "_body_1gu6a_16", YC = "_text_1gu6a_23", XC = "_pending_1gu6a_32", QC = "_measured_1gu6a_37", nt = {
  list: UC,
  check: VC,
  body: JC,
  text: YC,
  pending: XC,
  measured: QC
};
function ZC(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function eS({ check: e }) {
  const t = ZC(e.passed);
  return /* @__PURE__ */ i("li", { className: `${nt.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(jn, { state: t.state, label: t.label }),
    /* @__PURE__ */ i("span", { className: nt.body, children: [
      /* @__PURE__ */ n("span", { className: nt.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ i("span", { className: nt.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: nt.measured, children: e.measured })
  ] });
}
function q3({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${nt.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(eS, { check: t }, t.text)) });
}
const tS = "_root_y6bbq_2", nS = "_list_y6bbq_10", aS = "_line_y6bbq_32", rS = "_at_y6bbq_59", oS = "_text_y6bbq_63", lS = "_foot_y6bbq_67", iS = "_idle_y6bbq_79", sS = "_caret_y6bbq_87", cS = "_jump_y6bbq_94", be = {
  root: tS,
  list: nS,
  line: aS,
  at: rS,
  text: oS,
  foot: lS,
  idle: iS,
  caret: sS,
  jump: cS
}, dS = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Nn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : dS.format(new Date(e));
}
const uS = { warn: "warning", ok: "ok" };
function hS({ kind: e }) {
  const t = uS[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function mS({ connection: e, idleSince: t, last: a }) {
  return e === "stale" ? /* @__PURE__ */ n("span", { className: be.idle, children: `Quiet since ${Nn([t, a == null ? void 0 : a.at, ""].find(Boolean))}` }) : (a == null ? void 0 : a.at) === void 0 ? null : /* @__PURE__ */ n("span", { children: `Last event ${Nn(a.at)}` });
}
function _S({ connection: e, idleSince: t, last: a, children: r }) {
  return /* @__PURE__ */ i("p", { className: `${be.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${be.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n(mS, { connection: e, idleSince: t, last: a }),
    r
  ] });
}
const wS = 8;
function fS(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > wS;
}
function vS({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${be.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const _o = ke(null);
function H3({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, o] = v(!1), l = Da(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(_o.Provider, { value: l, children: a });
}
function bS() {
  const e = Ne(_o), [t, a] = v(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const pS = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function F3({ lines: e, connection: t, idleSince: a, label: r = "Activity", fixed: o }) {
  const l = f(null), [s, c] = v(0), [d, u] = bS(), [h, _] = v(!1), w = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), lt(() => {
    const k = l.current;
    k && !h && (k.scrollTop = k.scrollHeight);
  }, [e.length, h]);
  const N = () => {
    var D;
    const k = l.current;
    if (!k) return;
    const A = k.querySelectorAll("[data-consline-text]");
    (D = A.item(A.length - 1)) == null || D.focus(), _(!1);
  };
  return /* @__PURE__ */ i("div", { className: be.root, children: [
    /* @__PURE__ */ n("ol", { className: be.list, ref: l, "aria-live": d ? "polite" : "off", "aria-label": r, ...pS(e.length, o), onScroll: (k) => _(fS(k.currentTarget)), children: e.map((k, A) => /* @__PURE__ */ i("li", { className: `${be.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": A < s, children: [
      /* @__PURE__ */ n("span", { className: be.at, children: Nn(k.at) }),
      /* @__PURE__ */ n(hS, { kind: k.kind }),
      /* @__PURE__ */ n("span", { className: be.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${A}`)) }),
    /* @__PURE__ */ i(_S, { connection: t, idleSince: a, last: w, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${be.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(vS, { shown: h, onJump: N })
    ] })
  ] });
}
const gS = "_row_1k8wl_2", yS = "_head_1k8wl_14", NS = "_author_1k8wl_20", kS = "_eta_1k8wl_25", $S = "_edited_1k8wl_26", CS = "_body_1k8wl_32", SS = "_reason_1k8wl_37", RS = "_actions_1k8wl_42", Re = {
  row: gS,
  head: yS,
  author: NS,
  eta: kS,
  edited: $S,
  body: CS,
  reason: SS,
  actions: RS
}, xS = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function TS(e) {
  return {
    queued: "Not sent yet. Edits replace it.",
    delivered: `Sent. Edits show in ${e} as yours.`,
    retrying: "Sending. Cancel to edit.",
    failed: "Not sent. Resend or cancel."
  };
}
function LS({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: o, onViewOriginal: l }) {
  return e.delivery === "queued" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: l, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function AS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Re.reason, id: t, children: e })
  ] });
}
function MS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function IS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(LS, { ...e }) : /* @__PURE__ */ n(AS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function z3(e) {
  const { comment: t } = e;
  MS(e);
  const a = y(), r = `${a}-unavailable`, o = xS[t.delivery];
  return /* @__PURE__ */ i("div", { className: `${Re.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ i("div", { className: Re.head, children: [
      /* @__PURE__ */ n("span", { className: Re.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: Re.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Re.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Re.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Re.reason, id: a, children: TS(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Re.actions, children: /* @__PURE__ */ n(IS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const ES = "_root_lxbd7_2", BS = "_attach_lxbd7_11", PS = "_actions_lxbd7_17", jS = "_reply_lxbd7_23", DS = "_replyField_lxbd7_28", OS = "_send_lxbd7_54", qS = "_sendIcon_lxbd7_65", Je = {
  root: ES,
  attach: BS,
  actions: PS,
  reply: jS,
  replyField: DS,
  send: OS,
  sendIcon: qS
};
function wo({ value: e, onChange: t }) {
  const [a, r] = v("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function HS() {
  return /* @__PURE__ */ n("svg", { className: Je.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function FS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function zS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [o, l] = wo(e), s = () => {
    o.trim() !== "" && r(a, o);
  }, c = (d) => {
    FS(d) && (d.preventDefault(), s());
  };
  return /* @__PURE__ */ n("div", { className: Je.reply, "data-ward-composer": "reply", children: /* @__PURE__ */ i("div", { className: Je.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: c, children: [
    /* @__PURE__ */ n(E, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: o, onChange: l }),
    /* @__PURE__ */ i(b, { variant: "primary", className: Je.send, onClick: s, children: [
      /* @__PURE__ */ n(HS, {}),
      /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
    ] })
  ] }) });
}
function W3(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(zS, { ...e }) : /* @__PURE__ */ n(WS, { ...e });
}
function WS(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: o, onPost: l, onDraft: s } = e, [c, d] = wo(e);
  return /* @__PURE__ */ i("div", { className: Je.root, children: [
    /* @__PURE__ */ n(E, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ i("div", { className: Je.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    o && /* @__PURE__ */ n(
      Za,
      {
        label: `Run ${o.agent} again after you post`,
        consequence: o.consequence,
        checked: o.checked,
        onChange: o.onChange
      }
    ),
    /* @__PURE__ */ i("div", { className: Je.actions, children: [
      /* @__PURE__ */ n(b, { variant: "primary", onClick: () => l(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const KS = "_list_1yhks_2", GS = "_item_1yhks_6", US = "_body_1yhks_22", VS = "_text_1yhks_28", JS = "_evidence_1yhks_37", YS = "_consequence_1yhks_49", rt = {
  list: KS,
  item: GS,
  body: US,
  text: VS,
  evidence: JS,
  consequence: YS
};
function XS({ criterion: e }) {
  return /* @__PURE__ */ n(We, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function La({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function QS({ criterion: e }) {
  return /* @__PURE__ */ i("span", { className: rt.body, children: [
    /* @__PURE__ */ n("span", { className: rt.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(La, { text: " · " }),
      /* @__PURE__ */ n("code", { className: rt.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met || !e.why ? null : /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(La, { text: " · " }),
      /* @__PURE__ */ n("span", { className: rt.consequence, children: e.why })
    ] })
  ] });
}
function ZS({ criterion: e }) {
  return /* @__PURE__ */ i("li", { className: rt.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(XS, { criterion: e }),
    /* @__PURE__ */ n(QS, { criterion: e })
  ] });
}
function K3({ criteria: e }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n("ul", { className: `${rt.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(ZS, { criterion: t }, t.text)) }) });
}
const e2 = "_list_dwhoz_2", t2 = "_rung_dwhoz_6", n2 = "_name_dwhoz_18", a2 = "_actor_dwhoz_32", Bt = {
  list: e2,
  rung: t2,
  name: n2,
  actor: a2
}, r2 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function o2({ rung: e }) {
  const t = r2[e.state];
  return /* @__PURE__ */ i("li", { className: Bt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: Bt.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${Bt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function G3({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Bt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(o2, { rung: t }, t.name)) });
}
const l2 = "_sheet_pw37w_2", i2 = "_title_pw37w_9", s2 = "_stage_pw37w_15", c2 = "_effects_pw37w_20", d2 = "_effect_pw37w_20", u2 = "_numeral_pw37w_31", h2 = "_effectText_pw37w_38", m2 = "_refusals_pw37w_43", _2 = "_reasons_pw37w_52", w2 = "_reason_pw37w_52", f2 = "_actions_pw37w_62", we = {
  sheet: l2,
  title: i2,
  stage: s2,
  effects: c2,
  effect: d2,
  numeral: u2,
  effectText: h2,
  refusals: m2,
  reasons: _2,
  reason: w2,
  actions: f2
};
function v2({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function U3({ run: e, effects: t, refusals: a, cost: r, onRequeue: o, onClose: l, returnFocusTo: s }) {
  const c = y(), d = `${c}-refusal`, [u, h] = v(""), _ = a.length > 0;
  return /* @__PURE__ */ n(dt, { kind: "sheet", labelledBy: c, onClose: l, returnFocusTo: s, children: /* @__PURE__ */ i("div", { className: we.sheet, children: [
    /* @__PURE__ */ i("h2", { className: we.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: we.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: we.effects, children: t.map((w, N) => /* @__PURE__ */ i("li", { className: we.effect, children: [
      /* @__PURE__ */ n("span", { className: we.numeral, children: String(N + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: we.effectText, children: w })
    ] }, w)) }),
    /* @__PURE__ */ n(
      Xm,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This run adds", amount: r.more },
          { label: "Total", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(E, { kind: "textarea", label: "Note", value: u, onChange: h }),
    _ && /* @__PURE__ */ i("div", { className: we.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: we.reasons, children: a.map((w, N) => /* @__PURE__ */ n("li", { className: we.reason, id: N === 0 ? d : void 0, children: w.reason }, w.reason)) })
    ] }),
    /* @__PURE__ */ i("div", { className: we.actions, children: [
      /* @__PURE__ */ n(v2, { refused: _, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ n(b, { onClick: l, children: "Cancel" })
    ] })
  ] }) });
}
const b2 = "_list_1laeg_2", p2 = "_path_1laeg_7", g2 = "_consequence_1laeg_35", kn = {
  list: b2,
  path: p2,
  consequence: g2
}, Aa = {
  clarify: "Ask a question",
  requeue: "Run again",
  override: "Override and advance"
};
function y2(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Ma(e) {
  return e ? "primary" : "secondary";
}
function N2({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: Ma(t), size: "sm", onClick: () => a(e.kind), children: Aa[e.kind] }) : /* @__PURE__ */ n(b, { variant: Ma(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: Aa[e.kind] });
}
function k2({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ i("li", { className: kn.path, "data-allowed": e.allowed, "data-role": y2(e.requiredRole), children: [
    /* @__PURE__ */ n("span", { className: kn.consequence, children: e.consequence }),
    /* @__PURE__ */ n(N2, { path: e, primary: t, onChoose: a })
  ] });
}
function V3({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: kn.list, children: e.map((a, r) => /* @__PURE__ */ n(k2, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const $2 = "_list_1m7i0_2", C2 = "_item_1m7i0_6", S2 = "_node_1m7i0_18", R2 = "_body_1m7i0_24", x2 = "_head_1m7i0_30", T2 = "_stage_1m7i0_36", L2 = "_version_1m7i0_41", A2 = "_sentence_1m7i0_49", M2 = "_meta_1m7i0_54", Te = {
  list: $2,
  item: C2,
  node: S2,
  body: R2,
  head: x2,
  stage: T2,
  version: L2,
  sentence: A2,
  meta: M2
}, I2 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function E2({ entry: e }) {
  return /* @__PURE__ */ i("span", { className: Te.head, children: [
    /* @__PURE__ */ n("span", { className: Te.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Te.version, title: e.version, children: e.version }) : null
  ] });
}
function B2({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ i("li", { className: `${Te.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Te.node} ward-history-node`, children: /* @__PURE__ */ n(We, { size: 9, kind: I2[e.state], label: e.state }) }),
    /* @__PURE__ */ i("span", { className: `${Te.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(E2, { entry: e }),
      /* @__PURE__ */ n("span", { className: Te.sentence, children: e.sentence }),
      /* @__PURE__ */ i("span", { className: `${Te.meta} ward-history-meta`, children: [
        `${me(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${oe(e.cost)}`
      ] })
    ] })
  ] });
}
function J3({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Te.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(B2, { entry: t }, t.stage + String(a))) });
}
const P2 = "_thread_1e70p_3", j2 = "_turn_1e70p_8", D2 = "_who_1e70p_27", O2 = "_body_1e70p_32", Pt = {
  thread: P2,
  turn: j2,
  who: D2,
  body: O2
}, fo = ke(!1);
function Y3({ children: e, density: t }) {
  return /* @__PURE__ */ n(fo.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${Pt.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function X3({ turn: e }) {
  if (!Ne(fo)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ i("li", { className: `${Pt.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ i("span", { className: `${Pt.who} ward-chat-who`, children: [
      e.author,
      " · ",
      me(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${Pt.body} ward-chat-body`, children: e.body })
  ] });
}
const q2 = "_list_yiolt_3", H2 = "_row_yiolt_7", F2 = "_label_yiolt_20", z2 = "_n_yiolt_26", W2 = "_cause_yiolt_33", ft = {
  list: q2,
  row: H2,
  label: F2,
  n: z2,
  cause: W2
};
function K2(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const G2 = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function U2({ row: e, formatNumber: t }) {
  return K2(e), /* @__PURE__ */ i("li", { className: `${ft.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(We, { size: 8, ...G2[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: ft.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${ft.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(V2, { cause: e.cause })
  ] });
}
function V2({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${ft.cause} ward-healthrow-cause`, children: e }) : null;
}
function Q3({ rows: e, formatNumber: t = ne }) {
  return /* @__PURE__ */ n("ul", { className: `${ft.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(U2, { row: a, formatNumber: t }, a.label)) });
}
const J2 = "_root_1jxwp_2", Y2 = {
  root: J2
};
function Z3({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ i("div", { className: Y2.root, "data-density": o, children: [
    /* @__PURE__ */ n(tn, { items: e, note: t, density: o }),
    /* @__PURE__ */ n(b, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const X2 = "_row_dhbre_3", Q2 = "_key_dhbre_13", Z2 = "_stack_dhbre_24", eR = "_value_dhbre_32", tR = "_evidence_dhbre_39", nR = "_mark_dhbre_47", et = {
  row: X2,
  key: Q2,
  stack: Z2,
  value: eR,
  evidence: tR,
  mark: nR
};
function aR({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Check" }) : /* @__PURE__ */ n(jn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function eA({ field: e }) {
  return /* @__PURE__ */ i("li", { className: `${et.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${et.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ i("span", { className: `${et.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${et.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ i("span", { className: `${et.evidence} ward-resfield-evidence`, title: e.evidence, children: [
        "Source: ",
        e.evidence
      ] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${et.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(aR, { state: e.state }) })
  ] });
}
const rR = "_cell_gh2sd_2", oR = {
  cell: rR
}, lR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function iR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function sR(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function cR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: iR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function dR(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function tA({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  sR(e, a);
  const r = dR(e);
  return /* @__PURE__ */ n(
    u_,
    {
      label: "Rejection rules",
      columns: lR,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, l) => /* @__PURE__ */ n("span", { className: oR.cell, "data-norerun": o.noRerun ? !0 : void 0, children: cR(o, l) }),
      empty: t ?? /* @__PURE__ */ n(af, { sentence: "No rejection rules yet." })
    }
  );
}
const uR = "_row_1f2re_2", hR = "_title_1f2re_12", mR = "_turns_1f2re_18", _R = "_waiting_1f2re_19", wR = "_resolved_1f2re_20", fR = "_activity_1f2re_21", vR = "_cost_1f2re_28", bR = "_link_1f2re_29", pR = "_tableLink_1f2re_47", gR = "_tableRecord_1f2re_48", yR = "_tableRow_1f2re_59", NR = "_tableTitle_1f2re_71", kR = "_tableResolved_1f2re_76", $R = "_tableMeta_1f2re_87", CR = "_tableCost_1f2re_94", SR = "_tableActivity_1f2re_95", RR = "_tableState_1f2re_105", H = {
  row: uR,
  title: hR,
  turns: mR,
  waiting: _R,
  resolved: wR,
  activity: fR,
  cost: vR,
  link: bR,
  tableLink: pR,
  tableRecord: gR,
  tableRow: yR,
  tableTitle: NR,
  tableResolved: kR,
  tableMeta: $R,
  tableCost: CR,
  tableActivity: SR,
  tableState: RR
}, vo = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function xR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function TR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function LR(e) {
  const t = e.join(", ");
  return t === "" ? "—" : t;
}
const AR = { duplicate: "Closed · duplicate" };
function MR({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(it, { className: H.tableMeta, text: `waiting on ${e}` });
}
function IR({ value: e }) {
  return /* @__PURE__ */ n("td", { className: H.tableCost, children: e === void 0 ? null : oe(e) });
}
function ER({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${H.tableRecord} ward-target`, href: T(e.href), children: `→ ${e.key}` });
}
function BR({ session: e, href: t }) {
  const a = vo[e.state];
  return /* @__PURE__ */ i("tr", { className: H.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ i("td", { className: H.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${H.tableLink} ward-target`, href: T(t), children: /* @__PURE__ */ n(it, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: H.tableMeta, children: TR(e) })
    ] }),
    /* @__PURE__ */ i("td", { className: H.tableResolved, children: [
      LR(e.resolved),
      /* @__PURE__ */ n(MR, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(IR, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: H.tableActivity, children: xR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: H.tableState, children: /* @__PURE__ */ i("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: AR[e.state] ?? a.label }),
      /* @__PURE__ */ n(ER, { link: e.link })
    ] }) })
  ] });
}
function PR({ session: e }) {
  const t = vo[e.state];
  return /* @__PURE__ */ i("div", { className: H.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(it, { className: H.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: H.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(it, { className: H.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: H.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: H.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : oe(e.cost) }),
    /* @__PURE__ */ n("span", { className: H.activity, children: me(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: H.link, href: T(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function nA(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(BR, { session: e.session, href: e.href }) : /* @__PURE__ */ n(PR, { session: e.session });
}
const jR = "_block_1yy2v_3", DR = "_list_1yy2v_9", OR = "_line_1yy2v_14", $n = {
  block: jR,
  list: DR,
  line: OR
}, qR = { warn: "warning", ok: "ok" };
function HR({ kind: e }) {
  const t = qR[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function FR({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ i("li", { className: `${$n.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(HR, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function aA({ lines: e, label: t = "Agent input" }) {
  return /* @__PURE__ */ n("div", { className: `${$n.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: $n.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(FR, { line: a }, `${r}-${a.text}`)) }) });
}
const zR = "_band_tt7hp_1", WR = "_head_tt7hp_8", KR = "_cell_tt7hp_19", GR = "_index_tt7hp_35", UR = "_title_tt7hp_42", VR = "_note_tt7hp_48", JR = "_cellTitle_tt7hp_53", YR = "_cellBody_tt7hp_58", XR = "_tag_tt7hp_64", Se = {
  band: zR,
  head: WR,
  cell: KR,
  index: GR,
  title: UR,
  note: VR,
  cellTitle: JR,
  cellBody: YR,
  tag: XR
}, Ia = 4;
function rA({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== Ia)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Ia}-cell grid`);
  return /* @__PURE__ */ i("section", { className: Se.band, "aria-label": `${e} ${t}`, children: [
    /* @__PURE__ */ i("div", { className: Se.head, children: [
      /* @__PURE__ */ n("span", { className: Se.index, children: e }),
      /* @__PURE__ */ n("span", { className: Se.title, children: t }),
      /* @__PURE__ */ n("span", { className: Se.note, children: a })
    ] }),
    r.map((o) => /* @__PURE__ */ i("div", { className: Se.cell, children: [
      /* @__PURE__ */ n("span", { className: Se.cellTitle, children: o.title }),
      /* @__PURE__ */ n("span", { className: Se.cellBody, children: o.body }),
      o.tag !== void 0 && /* @__PURE__ */ n("span", { className: Se.tag, children: o.tag })
    ] }, o.title))
  ] });
}
const QR = "_tag_1yuvz_2", ZR = "_link_1yuvz_14", mn = {
  tag: QR,
  link: ZR
};
function bo({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: mn.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${mn.tag} ${mn.link}`, href: T(t), children: e });
}
const ex = "_eyebrow_m8swv_2", tx = "_link_m8swv_10", Ea = {
  eyebrow: ex,
  link: tx
};
function nn({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: Ea.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${Ea.link} ward-target`, href: T(t), children: e }) });
}
const nx = "_figure_qz9i7_2", ax = "_media_qz9i7_9", rx = "_caption_qz9i7_35", _n = {
  figure: nx,
  media: ax,
  caption: rx
};
function ox(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(x, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function Cn(e) {
  return /* @__PURE__ */ i("figure", { className: _n.figure, children: [
    /* @__PURE__ */ n("div", { className: _n.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(ox, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: _n.caption, children: e.caption })
  ] });
}
function Nt(e) {
  return `h${e}`;
}
function lx(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const ix = "_prose_1fxb9_2", sx = "_anchor_1fxb9_79", po = {
  prose: ix,
  anchor: sx
};
function Sn({ children: e }) {
  return /* @__PURE__ */ n("div", { className: po.prose, children: e });
}
function oA({ level: e, children: t, id: a }) {
  const r = Nt(e), o = a ?? lx(t);
  return /* @__PURE__ */ i(r, { id: o, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${po.anchor} ward-target`, href: `#${o}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const cx = "_list_176jq_2", dx = "_pair_176jq_8", ux = "_term_176jq_14", hx = "_value_176jq_19", Rt = {
  list: cx,
  pair: dx,
  term: ux,
  value: hx
};
function mx({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: Rt.list, children: e.map((t) => /* @__PURE__ */ i("div", { className: Rt.pair, children: [
    /* @__PURE__ */ n("dt", { className: Rt.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: Rt.value, children: t.value })
  ] }, t.term)) });
}
const _x = "_nav_sgeyg_2", wx = "_item_sgeyg_6", fx = "_link_sgeyg_13", vx = "_note_sgeyg_30", xt = {
  nav: _x,
  item: wx,
  link: fx,
  note: vx
};
function bx({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: xt.nav, children: /* @__PURE__ */ n(__, { children: t.map((a) => /* @__PURE__ */ i("li", { className: xt.item, children: [
    /* @__PURE__ */ n("a", { className: `${xt.link} ward-target`, href: T(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: xt.note, children: a.note })
  ] }, a.href)) }) });
}
const px = "_header_kelio_2", gx = "_skip_kelio_14", yx = "_brand_kelio_39", Nx = "_list_kelio_46", kx = "_link_kelio_56", tt = {
  header: px,
  skip: gx,
  brand: yx,
  list: Nx,
  link: kx
};
function lA({ brand: e, links: t, current: a, homeHref: r = "/", mainId: o = "main", skipLabel: l = "Skip to content" }) {
  return /* @__PURE__ */ i("header", { className: tt.header, children: [
    /* @__PURE__ */ n("a", { className: tt.skip, href: `#${o}`, children: l }),
    /* @__PURE__ */ n("a", { className: `${tt.brand} ward-target`, href: T(r), children: e }),
    /* @__PURE__ */ n("nav", { "aria-label": "Main", className: tt.nav, children: /* @__PURE__ */ n("ul", { className: tt.list, role: "list", children: t.map((s) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${tt.link} ward-target`, href: T(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const $x = "_footer_1jb5e_2", Cx = "_note_1jb5e_12", Sx = "_list_1jb5e_18", Rx = "_link_1jb5e_27", Tt = {
  footer: $x,
  note: Cx,
  list: Sx,
  link: Rx
};
function iA({ note: e, links: t = [], label: a = "Footer" }) {
  return /* @__PURE__ */ i("footer", { className: Tt.footer, children: [
    /* @__PURE__ */ n("p", { className: Tt.note, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("nav", { "aria-label": a, children: /* @__PURE__ */ n("ul", { className: Tt.list, role: "list", children: t.map((r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${Tt.link} ward-target`, href: T(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const xx = "_intro_13128_2", Tx = "_title_13128_9", Lx = "_lead_13128_17", wn = {
  intro: xx,
  title: Tx,
  lead: Lx
};
function Un({ title: e, eyebrow: t, eyebrowHref: a, lead: r, headingLevel: o = 1, children: l }) {
  const s = Nt(o);
  return /* @__PURE__ */ i("header", { className: wn.intro, children: [
    t === void 0 ? null : /* @__PURE__ */ n(nn, { href: a, children: t }),
    /* @__PURE__ */ n(s, { className: wn.title, children: e }),
    r === void 0 ? null : /* @__PURE__ */ n("p", { className: wn.lead, children: r }),
    l
  ] });
}
const Ax = "_section_u0k7p_2", Mx = "_head_u0k7p_13", Ix = "_titles_u0k7p_21", Ex = "_title_u0k7p_21", Bx = "_link_u0k7p_34", _t = {
  section: Ax,
  head: Mx,
  titles: Ix,
  title: Ex,
  link: Bx
};
function Px({ title: e, headingId: t, eyebrow: a, link: r, headingLevel: o }) {
  const l = Nt(o);
  return /* @__PURE__ */ i("div", { className: _t.head, children: [
    /* @__PURE__ */ i("div", { className: _t.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ n(nn, { children: a }),
      /* @__PURE__ */ n(l, { className: _t.title, id: t, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ n("a", { className: `${_t.link} ward-target`, href: T(r.href), children: r.label })
  ] });
}
function sA({ title: e, children: t, id: a, eyebrow: r, link: o, headingLevel: l = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ i("section", { className: _t.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ n(Px, { title: e, headingId: d, eyebrow: r, link: o, headingLevel: l }),
    t
  ] });
}
const jx = "_split_1ycaa_2", Dx = "_main_1ycaa_10", Ox = "_aside_1ycaa_15", fn = {
  split: jx,
  main: Dx,
  aside: Ox
};
function qx({ children: e, aside: t, asideLabel: a }) {
  return /* @__PURE__ */ i("div", { className: fn.split, children: [
    /* @__PURE__ */ n("div", { className: fn.main, children: e }),
    /* @__PURE__ */ n("aside", { className: fn.aside, "aria-label": a, children: t })
  ] });
}
const Hx = "_hero_ehbct_2", Fx = "_text_ehbct_11", zx = "_visual_ehbct_23", Wx = "_title_ehbct_28", Kx = "_lead_ehbct_36", Gx = "_actions_ehbct_42", Ux = "_action_ehbct_42", Vx = "_primary_ehbct_63", Jx = "_secondary_ehbct_72", Ie = {
  hero: Hx,
  text: Fx,
  visual: zx,
  title: Wx,
  lead: Kx,
  actions: Gx,
  action: Ux,
  primary: Vx,
  secondary: Jx
};
function Yx({ actions: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ n("div", { className: Ie.actions, children: e.map((t, a) => /* @__PURE__ */ n("a", { className: `${Ie.action} ${a === 0 ? Ie.primary : Ie.secondary}`, href: T(t.href), children: t.label }, `${t.href}-${t.label}`)) });
}
function Xx({ title: e, eyebrow: t, lead: a, actions: r = [] }) {
  return /* @__PURE__ */ i("div", { className: Ie.text, children: [
    t === void 0 ? null : /* @__PURE__ */ n(nn, { children: t }),
    /* @__PURE__ */ n("h1", { className: Ie.title, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("p", { className: Ie.lead, children: a }),
    /* @__PURE__ */ n(Yx, { actions: r })
  ] });
}
function cA({ visual: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: Ie.hero, "data-visual": e === void 0 ? "none" : "beside", children: [
    /* @__PURE__ */ n(Xx, { ...t }),
    e === void 0 ? null : /* @__PURE__ */ n("div", { className: Ie.visual, children: e })
  ] });
}
const Qx = "_chain_w2k2l_2", Zx = "_step_w2k2l_12", eT = "_arrow_w2k2l_19", tT = "_box_w2k2l_24", Lt = {
  chain: Qx,
  step: Zx,
  arrow: eT,
  box: tT
};
function dA({ steps: e, label: t, animate: a }) {
  return /* @__PURE__ */ n("ol", { className: Lt.chain, "aria-label": t, "data-ward-animate": a ?? "", children: e.map((r, o) => /* @__PURE__ */ i("li", { className: Lt.step, style: { "--ward-step": o }, children: [
    o === 0 ? null : /* @__PURE__ */ n("span", { className: Lt.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n("span", { className: Lt.box, children: r })
  ] }, o)) });
}
const nT = "_card_1u2gr_2", aT = "_featured_1u2gr_20", rT = "_media_1u2gr_28", oT = "_body_1u2gr_32", lT = "_title_1u2gr_48", iT = "_link_1u2gr_60", sT = "_summary_1u2gr_78", cT = "_tags_1u2gr_84", dT = "_cta_1u2gr_90", fe = {
  card: nT,
  featured: aT,
  media: rT,
  body: oT,
  title: lT,
  link: iT,
  summary: sT,
  tags: cT,
  cta: dT
};
function go({ media: e, ratio: t = "16/9" }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: fe.media, children: /* @__PURE__ */ n(Cn, { ratio: t, children: e }) });
}
function uT({ href: e, title: t, headingLevel: a = 3 }) {
  const r = Nt(a);
  return /* @__PURE__ */ n(r, { className: fe.title, children: /* @__PURE__ */ n("a", { className: fe.link, href: T(e), children: t }) });
}
function yo({ eyebrow: e, ...t }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ n(nn, { children: e }),
    /* @__PURE__ */ n(uT, { ...t })
  ] });
}
function No({ summary: e, tags: t = [] }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.summary, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("span", { className: fe.tags, children: t.map((a) => /* @__PURE__ */ n(bo, { label: a }, a)) })
  ] });
}
function uA({ media: e, ratio: t, eyebrow: a, summary: r, tags: o, ...l }) {
  return /* @__PURE__ */ i("article", { className: fe.card, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(go, { media: e, ratio: t }),
    /* @__PURE__ */ i("div", { className: fe.body, children: [
      /* @__PURE__ */ n(yo, { eyebrow: a, ...l }),
      /* @__PURE__ */ n(No, { summary: r, tags: o })
    ] })
  ] });
}
function hA({ media: e, ratio: t, eyebrow: a, summary: r, tags: o, cta: l, ...s }) {
  return /* @__PURE__ */ i("article", { className: `${fe.card} ${fe.featured}`, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(go, { media: e, ratio: t }),
    /* @__PURE__ */ i("div", { className: fe.body, children: [
      /* @__PURE__ */ n(yo, { eyebrow: a, ...s }),
      /* @__PURE__ */ n(No, { summary: r, tags: o }),
      l === void 0 ? null : /* @__PURE__ */ i("span", { className: fe.cta, "aria-hidden": "true", children: [
        l,
        " →"
      ] })
    ] })
  ] });
}
const hT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function ko(e) {
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : `${t.getUTCDate()} ${hT[t.getUTCMonth()]} ${t.getUTCFullYear()}`;
}
const mT = "_row_1peme_2", _T = "_title_1peme_15", wT = "_link_1peme_23", fT = "_meta_1peme_40", vT = "_summary_1peme_46", ht = {
  row: mT,
  title: _T,
  link: wT,
  meta: fT,
  summary: vT
};
function mA({ href: e, title: t, date: a, meta: r, summary: o, headingLevel: l = 3 }) {
  const s = Nt(l);
  return /* @__PURE__ */ i("article", { className: ht.row, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(s, { className: ht.title, children: /* @__PURE__ */ n("a", { className: ht.link, href: T(e), children: t }) }),
    /* @__PURE__ */ i("p", { className: ht.meta, children: [
      /* @__PURE__ */ n("time", { dateTime: a, children: ko(a) }),
      r === void 0 ? null : ` · ${r}`
    ] }),
    o === void 0 ? null : /* @__PURE__ */ n("p", { className: ht.summary, children: o })
  ] });
}
const bT = "_list_dd8kj_2", pT = "_item_dd8kj_16", Ba = {
  list: bT,
  item: pT
};
function _A({ children: e, rules: t = !1, label: a }) {
  return /* @__PURE__ */ n("ul", { className: Ba.list, role: "list", "aria-label": a, "data-rules": t, children: qa.toArray(e).map((r, o) => /* @__PURE__ */ n("li", { className: Ba.item, children: r }, o)) });
}
const gT = "_page_i3r2z_2", yT = "_aside_i3r2z_8", NT = "_tags_i3r2z_13", Vn = {
  page: gT,
  aside: yT,
  tags: NT
};
function kT({ labels: e }) {
  return /* @__PURE__ */ n("span", { className: Vn.tags, children: e.map((t) => /* @__PURE__ */ n(bo, { label: t }, t)) });
}
function $T(e) {
  return e[1] !== void 0 && e[1].length > 0;
}
function CT(e) {
  return e.filter($T).map(([t, a]) => ({
    term: t,
    value: typeof a == "string" ? a : /* @__PURE__ */ n(kT, { labels: a })
  }));
}
function ST({ facts: e, links: t, linksLabel: a }) {
  return /* @__PURE__ */ i("div", { className: Vn.aside, children: [
    e.length === 0 ? null : /* @__PURE__ */ n(mx, { facts: e }),
    t === void 0 || t.length === 0 ? null : /* @__PURE__ */ n(bx, { label: a, links: t })
  ] });
}
function $o({ facts: e, links: t = [], linksLabel: a, asideLabel: r, children: o }) {
  return e.length === 0 && t.length === 0 ? /* @__PURE__ */ n(Sn, { children: o }) : /* @__PURE__ */ n(qx, { asideLabel: r, aside: /* @__PURE__ */ n(ST, { facts: e, links: t, linksLabel: a }), children: /* @__PURE__ */ n(Sn, { children: o }) });
}
function wA({ title: e, summary: t, children: a, eyebrow: r, eyebrowHref: o, role: l, period: s, focus: c, stack: d, related: u }) {
  const h = CT([
    ["Role", l],
    ["Period", s],
    ["Focus", c],
    ["Stack", d]
  ]);
  return /* @__PURE__ */ i("article", { className: Vn.page, children: [
    /* @__PURE__ */ n(Un, { title: e, lead: t, eyebrow: r, eyebrowHref: o }),
    /* @__PURE__ */ n($o, { facts: h, links: u, linksLabel: "Related", asideLabel: "Case study facts", children: a })
  ] });
}
const RT = "_page_1junb_2", xT = "_source_1junb_8", TT = "_shots_1junb_30", Rn = {
  page: RT,
  source: xT,
  shots: TT
};
function LT({ shots: e, ratio: t }) {
  return e.length === 0 ? null : e.length === 1 ? /* @__PURE__ */ n(Cn, { ...e[0], ratio: t }) : /* @__PURE__ */ n("ul", { className: Rn.shots, role: "list", "aria-label": "Screenshots", children: e.map((a, r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(Cn, { ...a, ratio: t }) }, r)) });
}
function fA(e) {
  const { title: t, summary: a, children: r, source: o, facts: l = [], screenshots: s = [], ratio: c = "16/9" } = e;
  return /* @__PURE__ */ i("article", { className: Rn.page, children: [
    /* @__PURE__ */ n(Un, { title: t, lead: a, eyebrow: e.eyebrow, eyebrowHref: e.eyebrowHref, children: /* @__PURE__ */ n("a", { className: Rn.source, href: T(o.href), children: o.label }) }),
    /* @__PURE__ */ n(LT, { shots: s, ratio: c }),
    /* @__PURE__ */ n($o, { facts: l, linksLabel: "Links", asideLabel: "Project facts", children: r })
  ] });
}
function AT(e) {
  const t = [], a = [];
  for (const r of e) {
    const o = { ...r, children: [] };
    for (; a.length > 0 && a[a.length - 1].level >= r.level; ) a.pop();
    const l = a[a.length - 1];
    (l === void 0 ? t : l.children).push(o), a.push(o);
  }
  return t;
}
const MT = "_article_drsu4_2", IT = "_meta_drsu4_8", ET = "_tldr_drsu4_14", BT = "_tldrLabel_drsu4_21", PT = "_tldrText_drsu4_27", jT = "_toc_drsu4_40", DT = "_tocTitle_drsu4_44", OT = "_tocList_drsu4_50", qT = "_tocLink_drsu4_65", Ee = {
  article: MT,
  meta: IT,
  tldr: ET,
  tldrLabel: BT,
  tldrText: PT,
  toc: jT,
  tocTitle: DT,
  tocList: OT,
  tocLink: qT
};
function HT({ date: e, minutes: t }) {
  return /* @__PURE__ */ i("p", { className: Ee.meta, children: [
    /* @__PURE__ */ n("time", { dateTime: e, children: ko(e) }),
    t === void 0 ? null : ` · ${t} min read`
  ] });
}
function FT({ children: e }) {
  return /* @__PURE__ */ i("div", { className: Ee.tldr, role: "note", "aria-label": "TL;DR", children: [
    /* @__PURE__ */ n("p", { className: Ee.tldrLabel, children: "TL;DR" }),
    /* @__PURE__ */ n("div", { className: Ee.tldrText, children: e })
  ] });
}
function Co({ nodes: e }) {
  return /* @__PURE__ */ n("ol", { className: Ee.tocList, role: "list", children: e.map((t) => /* @__PURE__ */ i("li", { children: [
    /* @__PURE__ */ n("a", { className: `${Ee.tocLink} ward-target`, href: `#${t.id}`, children: t.text }),
    t.children.length === 0 ? null : /* @__PURE__ */ n(Co, { nodes: t.children })
  ] }, t.id)) });
}
function zT({ headings: e }) {
  const t = y();
  return e.length === 0 ? null : /* @__PURE__ */ i("nav", { className: Ee.toc, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h2", { className: Ee.tocTitle, id: t, children: "On this page" }),
    /* @__PURE__ */ n(Co, { nodes: AT(e) })
  ] });
}
function vA({ title: e, date: t, children: a, minutes: r, tldr: o, headings: l = [], eyebrow: s, eyebrowHref: c }) {
  return /* @__PURE__ */ i("article", { className: Ee.article, children: [
    /* @__PURE__ */ n(Un, { title: e, eyebrow: s, eyebrowHref: c, children: /* @__PURE__ */ n(HT, { date: t, minutes: r }) }),
    o === void 0 ? null : /* @__PURE__ */ n(FT, { children: o }),
    /* @__PURE__ */ n(zT, { headings: l }),
    /* @__PURE__ */ n(Sn, { children: a })
  ] });
}
const WT = 220;
function KT(e) {
  return e.replace(/<[^>]*>/g, " ").split(/\s+/).filter((a) => /[\p{L}\p{N}]/u.test(a)).length;
}
function bA(e) {
  return Math.max(1, Math.ceil(KT(e) / WT));
}
const Gt = { w: 184, h: 96 }, st = { w: 152, h: 48 }, Ut = 16, At = (e) => Math.round(e * 10) / 10;
function So(e) {
  return { x: Ut + e.col * Gt.w, y: Ut + e.row * Gt.h, w: st.w, h: st.h };
}
function GT(e) {
  const t = Math.max(0, ...e.map((r) => r.col)), a = Math.max(0, ...e.map((r) => r.row));
  return { w: 2 * Ut + t * Gt.w + st.w, h: 2 * Ut + a * Gt.h + st.h };
}
function Pa(e, t, a) {
  return Math.min(e.w / 2 / Math.abs(t), e.h / 2 / Math.abs(a));
}
function UT(e, t) {
  const a = e.x + e.w / 2, r = e.y + e.h / 2, o = t.x + t.w / 2 - a, l = t.y + t.h / 2 - r, s = Pa(e, o, l), c = 1 - Pa(t, o, l);
  return { x1: At(a + o * s), y1: At(r + l * s), x2: At(a + o * c), y2: At(r + l * c) };
}
function VT() {
  const [e, t] = v(!1);
  return S(() => {
    var o;
    const a = (o = window.matchMedia) == null ? void 0 : o.call(window, "(prefers-reduced-motion: no-preference)");
    if (!a) return;
    const r = (l) => t(l.matches);
    return t(a.matches), a.addEventListener("change", r), () => a.removeEventListener("change", r);
  }, []), e;
}
const JT = "_diagram_76e4t_2", YT = "_label_76e4t_9", XT = "_svg_76e4t_14", QT = "_node_76e4t_20", ZT = "_edge_76e4t_33", eL = "_arrow_76e4t_38", tL = "_controls_76e4t_63", nL = "_live_76e4t_70", aL = "_steps_76e4t_77", Le = {
  diagram: JT,
  label: YT,
  svg: XT,
  node: QT,
  edge: ZT,
  arrow: eL,
  controls: tL,
  live: nL,
  steps: aL
};
function rL({ nodes: e, edges: t, lit: a, marker: r }) {
  const o = new Map(e.map((l) => [l.id, So(l)]));
  return t.map((l) => {
    const s = o.get(l.from), c = o.get(l.to);
    if (s === void 0 || c === void 0) return null;
    const d = a(l.from) && a(l.to);
    return /* @__PURE__ */ n("line", { className: Le.edge, "data-active": d, ...UT(s, c), markerEnd: `url(#${r})` }, `${l.from}>${l.to}`);
  });
}
function oL({ nodes: e, lit: t }) {
  return e.map((a) => {
    const r = So(a);
    return /* @__PURE__ */ i("g", { className: Le.node, "data-active": t(a.id), "data-node": a.id, children: [
      /* @__PURE__ */ n("rect", { x: r.x, y: r.y, width: r.w, height: r.h, rx: "8" }),
      /* @__PURE__ */ n("text", { x: r.x + st.w / 2, y: r.y + st.h / 2, children: a.label })
    ] }, a.id);
  });
}
function ja({ label: e, to: t, count: a, go: r, status: o }) {
  return t < 0 || t >= a ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: o, children: e }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => r(t), children: e });
}
function lL({ at: e, count: t, text: a, go: r }) {
  const o = y();
  return /* @__PURE__ */ i("div", { className: Le.controls, children: [
    /* @__PURE__ */ n(ja, { label: "Back", to: e - 1, count: t, go: r, status: o }),
    /* @__PURE__ */ n(ja, { label: "Next", to: e + 1, count: t, go: r, status: o }),
    /* @__PURE__ */ n("p", { className: Le.live, id: o, "aria-live": "polite", children: `Step ${e + 1} of ${t}: ${a}` })
  ] });
}
function pA({ label: e, nodes: t, edges: a, steps: r }) {
  const o = VT() && r.length > 0, [l, s] = v(0), c = y(), d = (h) => o && r[l].nodes.includes(h), u = GT(t);
  return /* @__PURE__ */ i("figure", { className: Le.diagram, "data-live": o, "aria-labelledby": c, children: [
    /* @__PURE__ */ n("figcaption", { className: Le.label, id: c, children: e }),
    /* @__PURE__ */ i("svg", { className: Le.svg, viewBox: `0 0 ${u.w} ${u.h}`, width: u.w, height: u.h, "aria-hidden": "true", children: [
      /* @__PURE__ */ n("defs", { children: /* @__PURE__ */ n("marker", { id: `${c}-arrow`, viewBox: "0 0 8 8", refX: "7", refY: "4", markerWidth: "8", markerHeight: "8", markerUnits: "userSpaceOnUse", orient: "auto-start-reverse", children: /* @__PURE__ */ n("path", { className: Le.arrow, d: "M0 0 L8 4 L0 8 z" }) }) }),
      /* @__PURE__ */ n(rL, { nodes: t, edges: a, lit: d, marker: `${c}-arrow` }),
      /* @__PURE__ */ n(oL, { nodes: t, lit: d })
    ] }),
    o ? /* @__PURE__ */ n(lL, { at: l, count: r.length, text: r[l].text, go: s }) : null,
    /* @__PURE__ */ n("ol", { className: Le.steps, children: r.map((h, _) => /* @__PURE__ */ n("li", { "aria-current": o && _ === l ? "step" : void 0, children: h.text }, _)) })
  ] });
}
export {
  vL as ACCENT_PRESETS,
  FL as ActionStack,
  F3 as ActivityConsole,
  CL as AdminIcon,
  pp as AgentCard,
  pA as AnimatedDiagram,
  RL as AppShell,
  S3 as AppearanceStrip,
  vA as Article,
  rA as Band,
  qL as BarChart,
  Of as BoardColumn,
  o3 as BoardFootnote,
  l3 as BoardHeader,
  kL as BoardIcon,
  YL as BoardScroller,
  b as Btn,
  fL as CHIP_ROLES,
  to as CREDENTIAL_COLUMNS,
  jL as Callout,
  R3 as CapabilityRow,
  QL as CardGrid,
  wA as CaseStudy,
  X3 as ChatMessage,
  Za as Checkbox,
  m as Chip,
  it as ClampText,
  z3 as ClarificationRow,
  f3 as ClauseRuleRow,
  w3 as ClauseRules,
  Er as ColourLadder,
  x3 as ComponentRow,
  W3 as Composer,
  s3 as ConfigRow,
  i3 as ConfigRowHead,
  Dn as ConnectionMark,
  H3 as ConsoleAnnounceProvider,
  Y3 as Conversation,
  Xm as CostMeter,
  L3 as CredentialRow,
  T3 as CredentialRowHead,
  K3 as CriteriaList,
  dc as Crumb,
  bL as DENSITIES,
  Q3 as DeliveryHealth,
  e3 as DeniedState,
  yL as DisabledScope,
  b3 as DryRunRail,
  af as EmptyState,
  A3 as EnvCard,
  nn as Eyebrow,
  mx as FactList,
  hA as FeaturedCard,
  E as Field,
  Cn as Figure,
  ZL as FilteredEmpty,
  dA as FlowChain,
  xL as FoldText,
  VL as FormStack,
  tn as GateChecklist,
  G3 as GateLadder,
  u_ as Grid,
  g3 as HandoffRuleRow,
  p3 as HandoffRules,
  cA as Hero,
  NL as HomeIcon,
  DL as InfoTip,
  c3 as ItemDrawer,
  M3 as KeyPanel,
  Go as LIVE_EVENT_TYPES,
  Hb as LegacyBoardColumn,
  u3 as LegacyBoardHeader,
  h3 as LegacyConfigRow,
  _3 as LegacyItemDrawer,
  Eb as LegacyOverCapNote,
  m3 as LegacyPreviewRail,
  Ar as LegacyWorkCard,
  bx as LinkList,
  Be as LiveIndicator,
  t3 as LoadFailed,
  r3 as Loading,
  io as MCP_SERVER_COLUMNS,
  jn as Mark,
  E3 as MarkUpload,
  We as Marker,
  P3 as McpServerRow,
  B3 as McpServerRowHead,
  mr as Menu,
  dr as MenuButton,
  y3 as NewStreamModal,
  sf as OverCapNote,
  Mn as OverflowRow,
  dt as Overlay,
  TL as OwedCard,
  v3 as PARTIAL_STEP_REASON,
  so as POLICY_CHIP_WIDTH,
  KL as PageFrame,
  PL as PageHeader,
  Un as PageIntro,
  OL as PeriodPicker,
  __ as PlainList,
  j3 as PolicyRow,
  mA as PostRow,
  d3 as PreviewRail,
  uA as ProjectCard,
  fA as ProjectPage,
  Sn as Prose,
  oA as ProseHeading,
  dn as ROLE_MATRIX_COLUMNS,
  Ur as RULE_ACTIONS,
  Nr as Radio,
  Z3 as ReadyChecklist,
  UL as RecordSection,
  U3 as RequeueSheet,
  V3 as ResolveBlock,
  eA as ResolvedFieldRow,
  D3 as RoleMatrixRow,
  tA as RoutingTable,
  N3 as RuleRow,
  O3 as RunbookSteps,
  Ko as STREAM_STEPS,
  sA as Section,
  JL as SectionBand,
  fa as SectionHeader,
  gr as SegmentedControl,
  ir as Select,
  nA as SessionRow,
  IL as Sidebar,
  SL as SidebarFoldButton,
  iA as SiteFooter,
  lA as SiteHeader,
  qx as SplitLayout,
  k3 as StageColumn,
  XL as StageGrid,
  J3 as StageHistory,
  Jy as StageListEditor,
  LL as StageSteps,
  n3 as StaleStrip,
  Qt as StatStrip,
  zL as StatTiles,
  BL as StreamAvatar,
  $3 as StreamRow,
  $L as StudioIcon,
  GL as SubjectRail,
  Ye as Switch,
  ML as TabLinks,
  HL as TableHead,
  AL as Tabs,
  bo as Tag,
  _A as TextList,
  hL as ThemeProvider,
  C3 as ToolRow,
  WL as TopBar,
  vw as Tree,
  Rr as TreeRow,
  aA as TypedInputBlock,
  Bi as UNSAFE_HREF,
  q3 as ValidationList,
  dL as VisibilityProvider,
  uL as Visible,
  wL as WARD_VERSION,
  en as WorkCard,
  a3 as WriteUnavailableStrip,
  xR as agoSince,
  Mo as clock,
  hN as colourStatus,
  ne as count,
  se as duration,
  xn as elapsed,
  _L as eventSourceTransport,
  ko as formatDate,
  Nt as headingTag,
  Jt as isStreamStep,
  pt as isValidatedStreamStep,
  Vp as ladderValidation,
  M0 as mcpConnectionChip,
  L0 as mcpToolName,
  oe as money,
  pe as ms,
  xr as ordered,
  Fa as ratio,
  bA as readTime,
  Qk as restartLabel,
  T as safeHref,
  lx as slug,
  me as stamp,
  Tn as stream,
  pL as streamChip,
  In as streamChipProps,
  ye as streamColour,
  Jo as streamHex,
  Ot as streamInitials,
  Uo as streamVars,
  EL as uniqueStreamInitials,
  ar as useAnchoredPanel,
  Mt as useBorderFlash,
  Pe as useDisabledScope,
  Fo as useFocusTrap,
  gL as useLiveFeed,
  mL as useReturnFocus,
  Vt as useRovingTabindex,
  Ln as useTicker,
  Io as useVisible,
  P as v,
  I3 as validateMark,
  Xt as validatedStep,
  Wa as validatedStreamSteps,
  KT as wordCount
};
