import { jsx as n, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as Wn, useContext as Ie, createContext as Me, useState as b, useEffect as S, useCallback as Q, useRef as w, useLayoutEffect as Xa, useId as N, isValidElement as rr, Children as lr, Fragment as or } from "react";
import { createPortal as ir, flushSync as Kn } from "react-dom";
function ce(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const hn = (e) => String(e).padStart(2, "0");
function Ja(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${hn(a % 60)}s` : `${Math.floor(t / 60)}h ${hn(t % 60)}m`;
}
const sr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = sr.formatToParts(new Date(e)), t = (r) => {
    var l;
    return ((l = a.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${t("day")} ${t("month")} ${t("hour")}:${t("minute")}`;
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
function Gn(e, a) {
  return `${e} / ${a}`;
}
const cr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function dr(e) {
  return cr.format(new Date(e));
}
const Un = Me(/* @__PURE__ */ new Set());
function $0({ hidden: e, children: a }) {
  const t = Wn(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Un.Provider, { value: t, children: a });
}
function ur(e) {
  return !Ie(Un).has(e);
}
function C0({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(T, { children: ur(e) ? a : t });
}
const mr = "(prefers-color-scheme: dark)";
function wn() {
  return typeof window.matchMedia == "function" ? window.matchMedia(mr) : null;
}
function hr(e) {
  const [a, t] = b(() => {
    var r;
    return ((r = wn()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? wn() : null;
    if (!r) return;
    const l = () => t(r.matches);
    return l(), r.addEventListener("change", l), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function ja(e, a) {
  S(() => {
    const t = document.documentElement;
    return t.setAttribute(e, a), () => t.removeAttribute(e);
  }, [e, a]);
}
function wr(e, a) {
  return e !== "system" ? e : a ? "dark" : "light";
}
function S0({ theme: e, accent: a = "green", density: t = "comfortable", children: r }) {
  const l = hr(e === "system");
  return ja("data-theme", wr(e, l)), ja("data-accent", a), ja("data-density", t), /* @__PURE__ */ n(T, { children: r });
}
const _r = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function fr(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function vr(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = fr(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function br(e) {
  return { onKeyDown: Q(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(_r));
      vr(t, e.current, r);
    },
    [e]
  ) };
}
function R0(e, a = !0) {
  S(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const _n = { ArrowUp: -1, ArrowDown: 1 }, fn = { ArrowLeft: -1, ArrowRight: 1 }, gr = (e, a, t) => Math.min(t, Math.max(a, e));
function pr(e, a) {
  if (a !== "horizontal" && e in _n) return _n[e];
  if (a !== "vertical" && e in fn) return fn[e];
}
function Sa({ orientation: e = "both" } = {}) {
  const [a, t] = b(0), r = w(/* @__PURE__ */ new Map()), l = w(!1);
  Xa(() => {
    var v;
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const m = d[0], g = l.current;
    l.current = !1, t(m), g && ((v = r.current.get(m)) == null || v.focus());
  });
  const i = Q((d) => t(d), []), s = Q((d) => {
    var m;
    t(d), (m = r.current.get(d)) == null || m.focus();
  }, []), c = Q(
    (d) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const g = Math.max(0, m.indexOf(a)), v = pr(d.key, e);
      v !== void 0 ? (d.preventDefault(), s(m[gr(g + v, 0, m.length - 1)])) : d.key === "Home" ? (d.preventDefault(), s(m[0])) : d.key === "End" && (d.preventDefault(), s(m[m.length - 1]));
    },
    [a, s, e]
  ), u = Q(
    (d) => ({
      tabIndex: d === a ? 0 : -1,
      ref: (m) => {
        m ? r.current.set(d, m) : (r.current.delete(d), d === a && (l.current = !0));
      },
      onFocus: () => t(d),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: c }, itemProps: u, setActive: i };
}
const T0 = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, x0 = "0.2.0", L0 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], yr = [1, 2, 3, 4, 5, 6], Vn = [1, 2, 3], Nr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], A0 = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], E0 = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], W = {
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
function Qa(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Ra(e) {
  return yr.includes(e);
}
function Ta(e) {
  return Vn.includes(e);
}
function I0(e) {
  if (!Ra(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function M0(e) {
  if (!Ra(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const kr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function $r(e) {
  if (!Ra(e)) throw new Error("unvalidated stream step");
  return kr[e];
}
function vn(e) {
  return typeof e != "string" ? null : Nr.includes(e) ? e : null;
}
function Cr(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Sr(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Rr(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Tr(e, a, t) {
  const r = Cr(e);
  if (r === null) return null;
  const l = vn(t) ?? vn(r.type);
  return l === null ? null : { ...r, type: l, id: Sr(r, a), at: Rr(r) };
}
function xr(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function Lr(e, a, t) {
  return e >= we.heartbeat && !a && t !== null;
}
function B0(e, a) {
  const [t, r] = b("reconnecting"), [l, i] = b(null), s = w(/* @__PURE__ */ new Map()), c = w(0), u = w(""), d = w(0), m = w(null), g = w(0), v = w(0), y = w(!1), E = w("reconnecting"), B = Q((R) => {
    E.current = R, r(R);
  }, []), oe = Q(() => {
    c.current = Date.now();
  }, []), Re = Q((R) => {
    for (const [G, be] of s.current)
      (be === "*" || R.itemKey === be) && G(R);
  }, []), ne = Q(() => {
    m.current = a(e, { lastEventId: u.current }, {
      onEvent: (R, G, be) => {
        const je = Tr(R, G, be);
        je !== null && (je.id && (u.current = je.id), oe(), y.current = !1, B("live"), i(je.at), Re(je));
      },
      onOpen: () => {
        d.current = 0, y.current = !1, oe(), B("live");
      },
      onError: () => {
        var G;
        (G = m.current) == null || G.close(), m.current = null, y.current = !0, E.current !== "stale" && B("reconnecting");
        const R = Math.min(we.reconnectBase * 2 ** d.current, we.reconnectMax);
        d.current += 1, g.current = window.setTimeout(ne, R);
      }
    });
  }, [Re, B, oe, a, e]), Ke = Q((R) => {
    y.current = !0, R.close(), m.current = null, g.current = window.setTimeout(ne, we.reconnectBase);
  }, [ne]), Ge = Q((R, G) => (s.current.set(G, R), () => {
    s.current.delete(G);
  }), []);
  return S(() => (ne(), v.current = window.setInterval(() => {
    const R = Date.now() - c.current, G = xr(R, E.current);
    G && B(G);
    const be = m.current;
    Lr(R, y.current, be) && Ke(be);
  }, we.tick), () => {
    var R;
    window.clearInterval(v.current), window.clearTimeout(g.current), y.current = !1, (R = m.current) == null || R.close(), m.current = null;
  }), [ne, Ke, B]), { connection: t, lastEventAt: l, subscribe: Ge };
}
function Za(e, a) {
  const t = new Date(e).getTime(), [r, l] = b(() => Date.now());
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
  }, [a, t]), Math.max(0, r - t);
}
const bn = { blue: "running", orange: "waiting", green: "done" };
function Ar() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function gn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ha(e, a) {
  const t = w(0), r = Q((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (Ar() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${bn[i]})`), s.style.setProperty("--flash", `var(--ward-color-${bn[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => gn(s), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => gn(s), we.flash)));
  }, [a, e]);
  return S(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Er = "_root_1otpc_2", Ir = {
  root: Er
};
function Mr(e, a, t, r, l) {
  const i = [Ja(a)];
  return e || i.push(`as of ${dr(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Se({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = Za(e, l), s = (a == null ? void 0 : a.at) ?? e, c = Mr(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${Ir.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const Br = "_app_1m4se_1", jr = "_side_1m4se_30", Pr = "_sideTop_1m4se_42", qr = "_sideBody_1m4se_56", Dr = "_iconRail_1m4se_67", Hr = "_railItem_1m4se_76", Or = "_railIcon_1m4se_97", Fr = "_railDot_1m4se_102", zr = "_railLetter_1m4se_108", Wr = "_main_1m4se_113", Kr = "_rail_1m4se_76", Gr = "_page_1m4se_131", Ur = "_headerRow_1m4se_140", Vr = "_sidebarToggle_1m4se_147", Yr = "_headerSlot_1m4se_152", Xr = "_drawerSide_1m4se_157", Jr = "_root_1m4se_193", Qr = "_topbar_1m4se_200", Zr = "_mark_1m4se_211", el = "_brand_1m4se_218", al = "_tagline_1m4se_224", nl = "_identity_1m4se_230", tl = "_tools_1m4se_231", rl = "_nav_1m4se_241", ll = "_metadata_1m4se_248", ol = "_actor_1m4se_263", il = "_detail_1m4se_264", sl = "_content_1m4se_324", cl = "_toolsPanel_1m4se_340", dl = "_skip_1m4se_366", $ = {
  app: Br,
  side: jr,
  sideTop: Pr,
  sideBody: qr,
  iconRail: Dr,
  railItem: Hr,
  railIcon: Or,
  railDot: Fr,
  railLetter: zr,
  main: Wr,
  rail: Kr,
  page: Gr,
  headerRow: Ur,
  sidebarToggle: Vr,
  headerSlot: Yr,
  drawerSide: Xr,
  root: Jr,
  topbar: Qr,
  mark: Zr,
  brand: el,
  tagline: al,
  identity: nl,
  tools: tl,
  nav: rl,
  metadata: ll,
  actor: ol,
  detail: il,
  content: sl,
  toolsPanel: cl,
  skip: dl
}, ul = "_btn_tzr89_2", ml = "_primary_tzr89_14", hl = "_destructive_tzr89_25", wl = "_secondary_tzr89_35", _l = "_ghost_tzr89_40", fl = "_overflow_tzr89_49", vl = "_sm_tzr89_56", bl = "_disabled_tzr89_60", ca = {
  btn: ul,
  primary: ml,
  destructive: hl,
  secondary: wl,
  ghost: _l,
  overflow: fl,
  sm: vl,
  disabled: bl
};
function gl(e, a, t, r) {
  const l = a === "sm" ? [ca.sm, "ward-btn--sm"] : [], i = t ? [ca.disabled] : [];
  return [ca.btn, ca[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function pl(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function yl(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Nl(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function kl(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function $l(e, a, t) {
  return kl(e.describedBy, a && t);
}
function Cl({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Sl(e) {
  return e.children ?? e.label;
}
function f(e) {
  yl(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = Nl(e), i = N();
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: gl(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": $l(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...pl(a, e.controls),
        children: Sl(e)
      }
    ),
    /* @__PURE__ */ n(Cl, { id: i, reason: l })
  ] });
}
function xa(e) {
  const [a, t] = b(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (s) => t(s.matches);
    return r.addEventListener("change", l), t(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
const Rl = "_scrim_18idy_2", Tl = "_drawer_18idy_10", xl = "_sheet_18idy_14", Ll = "_modal_18idy_18", Al = "_panel_18idy_23", El = "_start_18idy_39", Il = "_header_18idy_62", Ml = "_title_18idy_70", Bl = "_body_18idy_74", jl = "_close_18idy_101", ke = {
  scrim: Rl,
  drawer: Tl,
  sheet: xl,
  modal: Ll,
  panel: Al,
  start: El,
  header: Il,
  title: Ml,
  body: Bl,
  close: jl
}, Pl = Me(null), va = [], ba = /* @__PURE__ */ new Map();
function ql(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Dl(e, a) {
  let t = ba.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ba.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Hl(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !ql(r) && Dl(e, r);
}
function Ol(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (Hl(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function Fl(e) {
  for (const a of e.claims) {
    const t = ba.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), ba.delete(a)));
  }
}
function zl(e, a) {
  const t = { root: e, claims: [] };
  return va.push(t), Ol(t, a), t;
}
function Wl(e) {
  const a = va.indexOf(e);
  a >= 0 && va.splice(a, 1), Fl(e);
}
function pn(e) {
  return e !== null && va.at(-1) === e;
}
function Kl(e, a, t) {
  const r = w(null), l = w(t);
  return l.current = t, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = zl(i, a);
    return r.current = c, () => {
      var d, m;
      const u = pn(c);
      Wl(c), r.current = null, u && ((m = (d = l.current ?? s) == null ? void 0 : d.focus) == null || m.call(d));
    };
  }, [a]), Q(() => pn(r.current), []);
}
function Gl(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Ul(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Vl({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${ke.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("header", { className: `${ke.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${ke.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${ke.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Yl(e) {
  return `${ke.scrim} ${ke[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Xl(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ke.panel} ${ke[e]} ward-overlay-panel${t}${r}`;
}
function Jl(e) {
  const a = Ie(Pl);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = w(null), t = w(null), r = N(), l = Jl(e.container), i = xa("(min-width: 768px)"), s = Gl(e.kind, i), c = Ul(e, r), u = br(t), d = Kl(a, l, e.returnFocusTo), m = Q(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return S(() => {
    var g, v;
    d() && ((v = (g = t.current) == null ? void 0 : g.querySelector("button")) == null || v.focus());
  }, [d]), S(() => {
    const g = (v) => {
      v.key === "Escape" && m();
    };
    return document.addEventListener("keydown", g), () => document.removeEventListener("keydown", g);
  }, [m]), ir(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Yl(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: m,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: t,
            id: e.id,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": c.labelledBy,
            "aria-label": c.label,
            className: Xl(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (g) => g.stopPropagation(),
            onKeyDown: (g) => d() && u.onKeyDown(g),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${ke.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Vl, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Ql = /^([a-z][a-z0-9+.-]*):/i, Zl = /* @__PURE__ */ new Set(["http", "https"]), eo = "#";
function ao(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = Ql.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function O(e) {
  const a = ao(e);
  return a === void 0 || Zl.has(a) ? e : eo;
}
function no(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Yn(e) {
  const a = no(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function oa(e, a, t) {
  S(() => {
    const r = e.current;
    if (!r) return;
    const l = () => {
      const s = Yn(r);
      t == null || t(s.start || s.end);
    };
    r.addEventListener("scroll", l, { passive: !0 });
    const i = typeof ResizeObserver > "u" ? null : new ResizeObserver(l);
    for (const s of [r, ...r.children]) i == null || i.observe(s);
    return l(), () => {
      r.removeEventListener("scroll", l), i == null || i.disconnect();
    };
  }, [e, a, t]);
}
function to(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function en(e, a, t) {
  Xa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(t)[a];
    if (!r || !l) return;
    const i = to(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), Yn(r);
  }, [e, a, t]);
}
const ro = "_icon_1ylqy_2", lo = {
  icon: ro
};
function ia({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: lo.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function j0() {
  return /* @__PURE__ */ n(ia, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function P0() {
  return /* @__PURE__ */ o(ia, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function q0() {
  return /* @__PURE__ */ o(ia, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function D0() {
  return /* @__PURE__ */ n(ia, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function oo() {
  return /* @__PURE__ */ o(ia, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const Xn = "ward:sidebar-collapsed", io = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function so() {
  try {
    return window.localStorage.getItem(Xn) === "true";
  } catch {
    return !1;
  }
}
function co(e) {
  try {
    window.localStorage.setItem(Xn, String(e));
  } catch {
  }
}
function uo(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function mo(e) {
  return e instanceof Element && e.closest(io) !== null;
}
function ho(e) {
  return e.key === "[" && !uo(e) && !mo(e.target);
}
function wo(e) {
  const [a, t] = b(so), r = () => {
    co(!a), t(!a);
  };
  return S(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!ho(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, a]), { collapsed: a, toggle: r };
}
function _o() {
  const e = xa("(max-width: 791.98px)"), a = N(), t = w(null), [r, l] = b(!1);
  return r && !e && l(!1), { narrow: e, open: r, drawerId: a, slotRef: t, toggle: () => l(!r), close: () => l(!1) };
}
function fo({ header: e, label: a, drawer: t }) {
  return t.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: t.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function vo({ sidebar: e, label: a, drawer: t }) {
  var l;
  if (!t.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && t.close();
  };
  return /* @__PURE__ */ n(ea, { kind: "start", id: t.drawerId, title: a, flush: !0, onClose: t.close, returnFocusTo: (l = t.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ n("div", { className: $.drawerSide, onClick: r, children: e }) });
}
function bo(e, a) {
  const t = e !== void 0 && !a, { collapsed: r, toggle: l } = wo(t);
  return { enabled: t, collapsed: t && r, toggle: l };
}
function go({ fold: e }) {
  return e.enabled ? /* @__PURE__ */ n("div", { className: $.sideTop, children: /* @__PURE__ */ o(f, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(oo, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] }) }) : null;
}
function po({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": Qa(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function yo({ items: e, label: a }) {
  return /* @__PURE__ */ n("nav", { className: $.iconRail, "aria-label": a, children: e.map((t) => /* @__PURE__ */ o("a", { className: $.railItem, href: O(t.href), title: t.label, "aria-current": t.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(po, { item: t }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t.label })
  ] }, t.id)) });
}
function No({ sidebar: e, label: a, iconRail: t, fold: r }) {
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(go, { fold: r }),
    /* @__PURE__ */ n("div", { className: $.sideBody, hidden: r.collapsed, children: e }),
    r.collapsed && /* @__PURE__ */ n(yo, { items: t ?? [], label: a })
  ] });
}
function ko({ sidebar: e, header: a, children: t, rail: r, sidebarLabel: l, iconRail: i }) {
  const s = r != null, c = _o(), u = bo(i, c.narrow), d = l ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(s), "data-collapsed": String(u.collapsed), children: [
    !c.narrow && /* @__PURE__ */ n(No, { sidebar: e, label: d, iconRail: i, fold: u }),
    /* @__PURE__ */ o("main", { className: $.main, children: [
      /* @__PURE__ */ n(fo, { header: a, label: d, drawer: c }),
      /* @__PURE__ */ n("div", { className: $.page, children: t })
    ] }),
    s && /* @__PURE__ */ n("div", { className: $.rail, children: r }),
    /* @__PURE__ */ n(vo, { sidebar: e, label: d, drawer: c })
  ] });
}
function $o({ destinations: e, active: a }) {
  const t = w(null);
  return oa(t, e.length), en(t, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ n("nav", { ref: t, className: $.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ n("a", { href: O(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function za({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Co({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ n(za, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(za, { value: a, className: $.detail })
  ] });
}
function So() {
  const e = xa("(max-width: 767.98px)"), a = N(), t = w(null), [r, l] = b(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = t.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Ro({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: $.tools, children: /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: $.tools, children: e });
}
function To({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const t = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: t, children: e });
}
function xo(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ n("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(za, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ n($o, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: $.identity, children: /* @__PURE__ */ n(Co, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Ro, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Lo(e) {
  const a = N(), t = So();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(xo, { ...e, menu: t }),
    /* @__PURE__ */ n(To, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: $.content, children: e.children })
  ] });
}
function Ao(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function H0(e) {
  return Ao(e) ? /* @__PURE__ */ n(ko, { ...e }) : /* @__PURE__ */ n(Lo, { ...e });
}
function La(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Eo = "_root_197jc_2", Io = "_row_197jc_8", Mo = "_box_197jc_14", Bo = "_label_197jc_21", jo = "_lockedNote_197jc_26", Po = "_consequence_197jc_34", qo = "_sample_197jc_69", De = {
  root: Eo,
  row: Io,
  box: Mo,
  label: Bo,
  lockedNote: jo,
  consequence: Po,
  sample: qo
};
function Do(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Ho({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${De.consequence} ward-check-consequence`, children: a }) : null;
}
function Oo({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${De.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Fo({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: De.sample, "aria-hidden": "true", children: e }) : null;
}
function Jn(e) {
  const a = N(), t = e.consequence ? `${a}-note` : void 0, r = Do(e);
  return /* @__PURE__ */ o("div", { className: `${De.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: De.row, children: [
      /* @__PURE__ */ n(
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
          "aria-describedby": La(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: De.label, children: [
        e.label,
        /* @__PURE__ */ n(Oo, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Fo, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Ho, { id: t, text: e.consequence })
  ] });
}
const zo = "_chip_pq6tb_2", Wo = {
  chip: zo
}, Ko = {
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
function Go(e, a) {
  if (e === "stream") return Uo(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = Ko[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function Uo(e) {
  if (!e || !Ta(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Qa(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Wo.chip} ward-chip ward-chip--${e}`, style: Go(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
const Vo = "_clamp_zn74g_3", yn = {
  clamp: Vo
};
function Ee({ text: e, as: a = "span", className: t }) {
  return /* @__PURE__ */ n(a, { className: t === void 0 ? yn.clamp : `${yn.clamp} ${t}`, "data-ward-clamp": "", title: e, children: e });
}
function sa(e) {
  return typeof e == "number" && Ta(e) ? e : null;
}
function ve(e, a) {
  const t = sa(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function Aa(e, a) {
  const t = sa(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const Yo = "_nav_8lufj_2", Xo = "_list_8lufj_8", Jo = "_item_8lufj_15", Qo = "_link_8lufj_30", Zo = "_sep_8lufj_40", ei = "_current_8lufj_44", ai = "_chips_8lufj_48", Pe = {
  nav: Yo,
  list: Xo,
  item: Jo,
  link: Qo,
  sep: Zo,
  current: ei,
  chips: ai
};
function ni({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Pe.nav, children: [
    /* @__PURE__ */ n("ol", { className: Pe.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: Pe.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: Pe.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${Pe.link} ward-target`, href: O(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Pe.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Pe.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] }) });
}
function Qn(e, a, t) {
  const r = w(t);
  r.current = t, S(() => {
    if (!e) return;
    const l = (i) => {
      var s;
      (s = a.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, a]);
}
const ti = 500;
function Zn(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function et() {
  const e = w(""), a = w(void 0);
  return S(() => () => clearTimeout(a.current), []), (t) => (clearTimeout(a.current), e.current += t.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, ti), e.current);
}
const ri = "_root_glrsq_2", li = "_trigger_glrsq_7", oi = "_value_glrsq_32", ii = "_menu_glrsq_49", si = "_find_glrsq_71", ci = "_list_glrsq_85", di = "_option_glrsq_95", ui = "_check_glrsq_114", mi = "_empty_glrsq_125", _e = {
  root: ri,
  trigger: li,
  value: oi,
  menu: ii,
  find: si,
  list: ci,
  option: di,
  check: ui,
  empty: mi
}, hi = 7;
function wi(e, a) {
  const t = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(t));
}
function Nn(e, a) {
  return Math.max(0, e.findIndex((t) => t.value === a));
}
function _i(e, a) {
  const [t, r] = b(e.defaultOpen === !0), [l, i] = b(""), [s, c] = b(() => Nn(e.options, e.value)), u = (d) => {
    var m;
    Kn(() => r(!1)), d && ((m = a.current) == null || m.focus());
  };
  return {
    open: t,
    query: l,
    active: s,
    entries: wi(e.options, l),
    findable: e.options.length > hi,
    show: () => {
      e.disabled || (i(""), c(Nn(e.options, e.value)), r(!0));
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
function fi(e, a) {
  const t = w(!1);
  return S(() => {
    var r;
    e && t.current && ((r = a.current) == null || r.focus()), t.current = !1;
  }), () => {
    t.current = !0;
  };
}
function vi(e) {
  const a = et();
  return (t) => {
    const r = a(t), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function at(e) {
  const a = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, a)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function bi(e) {
  return { ...at(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function nt(e, a, t) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = a[r.key];
    if (!l) return t(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const gi = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function pi(e, a) {
  const t = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : t(),
    onKeyDown: (r) => {
      gi.has(r.key) && (r.preventDefault(), t());
    }
  };
}
function yi({ entry: e, at: a, menu: t, ids: r, value: l }) {
  return /* @__PURE__ */ o(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
      "data-active": a === t.active || void 0,
      className: _e.option,
      onMouseDown: (i) => i.preventDefault(),
      onMouseMove: () => t.to(a),
      onClick: () => t.pick(e),
      children: [
        /* @__PURE__ */ n("span", { className: _e.check, "aria-hidden": "true" }),
        /* @__PURE__ */ n("span", { className: _e.label, children: e.option.label })
      ]
    }
  );
}
function an(e, a) {
  const t = e.entries[e.active];
  return t ? a.option(t.index) : void 0;
}
function Ni({ menu: e, ids: a, focusRef: t }) {
  return /* @__PURE__ */ n(
    "input",
    {
      ref: t,
      className: _e.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": a.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": an(e, a),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: nt(e, at(e), () => {
      })
    }
  );
}
function ki({ props: e, menu: a, ids: t, focusRef: r }) {
  const l = vi(a), i = (s) => {
    Zn(s) && l(s.key);
  };
  return /* @__PURE__ */ o("div", { className: _e.menu, children: [
    a.findable && /* @__PURE__ */ n(Ni, { menu: a, ids: t, focusRef: r }),
    /* @__PURE__ */ n(
      "ul",
      {
        ref: a.findable ? void 0 : r,
        id: t.list,
        role: "listbox",
        tabIndex: -1,
        className: _e.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": a.findable ? void 0 : an(a, t),
        onKeyDown: nt(a, bi(a), i),
        children: a.entries.map((s, c) => /* @__PURE__ */ n(yi, { entry: s, at: c, menu: a, ids: t, value: e.value }, s.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ n("p", { className: _e.empty, children: "No match" })
  ] });
}
function $i(e, a) {
  const t = e.open ? an(e, a) : void 0;
  S(() => {
    var r, l;
    t && ((l = (r = document.getElementById(t)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [t]);
}
function tt(...e) {
  return e.filter(Boolean).join(" ");
}
function Ci(e) {
  var a;
  return ((a = e.options.find((t) => t.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function Si({ props: e, menu: a, ids: t, trigger: r, wantFocus: l }) {
  const i = !e.options.some((s) => s.value === e.value);
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: tt(_e.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": a.open,
      "aria-controls": a.open ? t.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": La(e["aria-describedby"], t.value),
      "aria-invalid": e["aria-invalid"],
      disabled: e.disabled,
      ...pi(a, l),
      children: /* @__PURE__ */ n("span", { id: t.value, className: _e.value, "data-placeholder": i || void 0, children: Ci(e) })
    }
  );
}
function rt(e) {
  const a = N(), t = { list: `${a}-list`, value: `${a}-value`, option: (u) => `${a}-option-${u}` }, r = w(null), l = w(null), i = w(null), s = _i(e, l), c = fi(s.open, i);
  return Qn(s.open, r, () => s.close(!1)), $i(s, t), /* @__PURE__ */ o("div", { ref: r, className: tt(_e.root, e.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(Si, { props: e, menu: s, ids: t, trigger: l, wantFocus: c }),
    e.name && /* @__PURE__ */ n("input", { type: "hidden", name: e.name, value: e.value }),
    s.open && /* @__PURE__ */ n(ki, { props: e, menu: s, ids: t, focusRef: i })
  ] });
}
const Ri = "_field_djnju_2", Ti = "_label_djnju_8", xi = "_labelHidden_djnju_15", Li = "_control_djnju_25", Ai = "_mono_djnju_45", Ei = "_area_djnju_50", Ii = "_invalid_djnju_57", Ae = {
  field: Ri,
  label: Ti,
  labelHidden: xi,
  control: Li,
  mono: Ai,
  area: Ei,
  invalid: Ii
}, Mi = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, lt = (e) => `${e}-label`;
function Bi({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? Mi : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function ji({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n(
    rt,
    {
      id: a.id,
      triggerClassName: t,
      "aria-labelledby": lt(a.id),
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
function Pi({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const qi = { input: Bi, select: ji, textarea: Pi };
function Di(e, a, t) {
  const r = qi[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Hi(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": La(r ? t : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function Oi(e) {
  const a = e.mono ? [Ae.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Ae.area] : [];
  return [Ae.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Fi(e) {
  return e ? `${Ae.label} ${Ae.labelHidden} ward-field-label` : `${Ae.label} ward-field-label`;
}
function M(e) {
  const a = N(), t = `${a}-msg`, r = Hi(e, a, t), l = Oi(e);
  return /* @__PURE__ */ o("div", { className: `${Ae.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: lt(a), className: Fi(e.labelHidden), htmlFor: a, children: e.label }),
    Di(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Ae.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const zi = "_root_u4xjq_2", Wi = "_trigger_u4xjq_9", Ki = "_panel_u4xjq_33", Gi = "_menu_u4xjq_56", Ui = "_group_u4xjq_61", Vi = "_heading_u4xjq_66", Yi = "_item_u4xjq_72", Xi = "_separator_u4xjq_98", Ji = "_footer_u4xjq_104", Ce = {
  root: zi,
  trigger: Wi,
  panel: Ki,
  menu: Gi,
  group: Ui,
  heading: Vi,
  item: Yi,
  separator: Xi,
  footer: Ji
}, ot = Me(null);
function Qi(e, a) {
  const [t, r] = b({ open: e, start: null, request: 0 });
  return {
    ...t,
    show: (l) => r((i) => ({ open: !0, start: l, request: i.request + 1 })),
    close: (l) => {
      var i;
      Kn(() => r((s) => ({ ...s, open: !1 }))), l && ((i = a.current) == null || i.focus());
    }
  };
}
const Zi = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function es(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const t = Zi.get(a.key);
      t && (a.preventDefault(), e.show(t));
    },
    onKeyUp: (a) => {
      a.key === " " && a.preventDefault();
    }
  };
}
function as(...e) {
  return e.filter(Boolean).join(" ");
}
function O0(e) {
  const a = N(), t = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = w(null), l = w(null), i = Qi(e.defaultOpen === !0, l);
  return Qn(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: as(Ce.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ref: l,
        id: t.buttonId,
        type: "button",
        className: Ce.trigger,
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? t.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...es(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(ot.Provider, { value: { ...t, popup: i }, children: e.children })
  ] });
}
function ns(e) {
  let a = 0;
  const t = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(t) } : { kind: "item", row: t(r) });
}
function ts(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const it = (e, a) => (e % a + a) % a;
function Je(e, a, t) {
  for (let r = 1; r <= e.length; r++) {
    const l = it(a + t * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const rs = (e) => e.split("").every((a) => a === e[0]);
function ls(e, a, t) {
  const r = rs(t), l = r ? t[0] : t, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const u = it(i + c, e.length);
    if (s(e[u])) return u;
  }
  return -1;
}
function os(e) {
  const a = w([]);
  return {
    items: e,
    refs: a,
    current: () => a.current.indexOf(document.activeElement),
    focus: (t) => {
      var r;
      return (r = a.current[t]) == null ? void 0 : r.focus();
    }
  };
}
function is(e, a) {
  const { items: t } = e, r = () => {
    var l;
    return (l = e.refs.current[e.current()]) == null ? void 0 : l.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(Je(t, e.current(), 1))],
    ["ArrowUp", () => e.focus(Je(t, e.current(), -1))],
    ["Home", () => e.focus(Je(t, -1, 1))],
    ["End", () => e.focus(Je(t, t.length, -1))],
    ["Escape", () => a.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function ss(e, a) {
  const t = w(!1), r = et(), l = is(e, a), i = (s) => {
    Zn(s) && e.focus(ls(e.items, e.current(), r(s.key)));
  };
  return {
    onKeyDown: (s) => {
      s.key === "Tab" && (t.current = !0);
      const c = l.get(s.key);
      if (!c) return i(s);
      s.preventDefault(), s.stopPropagation(), c();
    },
    onKeyUp: (s) => {
      s.key === " " && s.preventDefault();
    },
    onBlur: () => {
      t.current && a.close(!1);
    }
  };
}
function cs(e, a) {
  const { start: t, request: r } = a, l = w(e);
  l.current = e, S(() => {
    const { items: i, focus: s } = l.current;
    t && s(t === "first" ? Je(i, -1, 1) : Je(i, i.length, -1));
  }, [t, r]);
}
function ds({ row: e, nav: a, popup: t }) {
  const { item: r, at: l } = e;
  return {
    onMouseDown: (i) => i.preventDefault(),
    onMouseMove: () => {
      !r.disabled && a.current() !== l && a.focus(l);
    },
    onClick: (i) => {
      var s;
      if (r.disabled) return i.preventDefault();
      (s = r.onSelect) == null || s.call(r), t.close(!0);
    }
  };
}
function st(e) {
  const { item: a, at: t } = e.row, r = {
    ref: (l) => {
      e.nav.refs.current[t] = l;
    },
    role: "menuitem",
    tabIndex: -1,
    className: Ce.item,
    "aria-disabled": a.disabled ? "true" : void 0,
    ...ds(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ n("a", { href: O(a.href), ...r, children: a.label }) : /* @__PURE__ */ n("button", { type: "button", ...r, children: a.label });
}
function us({ heading: e, rows: a, nav: t, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: Ce.group, children: [
    /* @__PURE__ */ n("div", { id: l, className: Ce.heading, children: e }),
    a.map((i) => /* @__PURE__ */ n(st, { row: i, nav: t, popup: r }, i.at))
  ] });
}
function ms({ block: e, nav: a, popup: t }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: Ce.separator }) : e.kind === "group" ? /* @__PURE__ */ n(us, { heading: e.heading, rows: e.rows, nav: a, popup: t }) : /* @__PURE__ */ n(st, { row: e.row, nav: a, popup: t });
}
function hs() {
  const e = Ie(ot);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function F0({ entries: e, footer: a, align: t = "start" }) {
  const { popup: r, menuId: l, buttonId: i } = hs(), s = ns(e), c = os(s.flatMap(ts).map((d) => d.item)), u = ss(c, r);
  return cs(c, r), /* @__PURE__ */ o("div", { className: Ce.panel, "data-align": t, children: [
    /* @__PURE__ */ n("div", { role: "menu", id: l, "aria-labelledby": i, className: Ce.menu, ...u, children: s.map((d, m) => /* @__PURE__ */ n(ms, { block: d, nav: c, popup: r }, m)) }),
    a && /* @__PURE__ */ n("p", { className: Ce.footer, children: a })
  ] });
}
const ws = "_strip_1nfwi_2", _s = "_tab_1nfwi_32", fs = "_count_1nfwi_68", ra = {
  strip: ws,
  tab: _s,
  count: fs
}, ga = 7;
function vs(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function ct(e) {
  return `${ra.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function z0({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > ga) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${ga} — the set is fixed`);
  const i = Sa({ orientation: "horizontal" }), s = vs(e, a);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = w(null);
  return oa(c, e.length), en(c, s, '[role="tab"]'), /* @__PURE__ */ n(
    "div",
    {
      ref: c,
      className: ct(l),
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
          className: `${ra.tab} ward-tab`,
          "aria-selected": u.id === a,
          "aria-controls": `panel-${u.id}`,
          onClick: () => t(u.id),
          ...i.itemProps(d),
          children: [
            u.label,
            u.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: ra.count, children: `· ${u.count}` })
            ] })
          ]
        },
        u.id
      ))
    }
  );
}
function W0({ links: e, active: a, label: t, level: r = 1 }) {
  if (e.length > ga) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ga} — the set is fixed`);
  const l = w(null);
  return oa(l, e.length), en(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ n("nav", { ref: l, className: ct(r), "aria-label": t, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ra.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: ra.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const bs = "_root_v56ff_3", gs = "_segment_v56ff_9", kn = {
  root: bs,
  segment: gs
};
function dt({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Sa({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((u) => u.value === a));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${kn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: kn.segment,
      "aria-checked": u.value === a,
      disabled: l,
      "aria-describedby": i,
      onClick: () => t(u.value),
      ...s.itemProps(d),
      children: u.label
    },
    u.value
  )) });
}
const ps = "_sidebar_s9o1j_3", ys = "_brand_s9o1j_9", Ns = "_mark_s9o1j_17", ks = "_word_s9o1j_24", $s = "_nav_s9o1j_30", Cs = "_navItem_s9o1j_39", Ss = "_footLink_s9o1j_49", Rs = "_group_s9o1j_58", Ts = "_groupName_s9o1j_65", xs = "_agents_s9o1j_81", Ls = "_agent_s9o1j_81", As = "_root_s9o1j_96", Es = "_agentTop_s9o1j_105", Is = "_dot_s9o1j_112", Ms = "_agentName_s9o1j_124", Bs = "_agentMeta_s9o1j_138", js = "_foot_s9o1j_49", Ps = "_footName_s9o1j_150", qs = "_footLinks_s9o1j_157", Ds = "_linkBrand_s9o1j_184", Hs = "_label_s9o1j_205", Os = "_note_s9o1j_210", Fs = "_footer_s9o1j_226", x = {
  sidebar: ps,
  brand: ys,
  mark: Ns,
  word: ks,
  nav: $s,
  navItem: Cs,
  new: "_new_s9o1j_48",
  footLink: Ss,
  group: Rs,
  groupName: Ts,
  agents: xs,
  agent: Ls,
  root: As,
  agentTop: Es,
  dot: Is,
  agentName: Ms,
  agentMeta: Bs,
  foot: js,
  footName: Ps,
  footLinks: qs,
  linkBrand: Ds,
  label: Hs,
  note: Os,
  footer: Fs
};
function zs({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: x.agent,
      href: O(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: x.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: x.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": Qa(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: x.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: x.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Ws({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ n("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: `${x.footLink} ward-target`, href: O(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function Ks({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: x.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: x.brand, children: [
      /* @__PURE__ */ n("span", { className: x.mark }),
      /* @__PURE__ */ n("span", { className: x.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: x.nav, children: a.map((s) => /* @__PURE__ */ n("a", { className: x.navItem, href: O(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: x.group, children: [
      /* @__PURE__ */ o("span", { className: x.groupName, children: [
        t,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: x.new, href: O(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ n(zs, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(Ws, { shared: i })
  ] });
}
function Gs(e) {
  return e.destinations ?? e.items ?? [];
}
function Us({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: x.linkBrand, children: e });
}
function Vs({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: x.footer, children: e });
}
function Ys({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: O(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: x.note, children: e.note })
  ] });
}
function Xs(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Us, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Gs(e).map((a) => /* @__PURE__ */ n(Ys, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(Vs, { children: e.children })
  ] });
}
function Js(e) {
  return "agents" in e;
}
function K0(e) {
  return Js(e) ? /* @__PURE__ */ n(Ks, { ...e }) : /* @__PURE__ */ n(Xs, { ...e });
}
const Qs = "_mark_wlgi8_3", Zs = {
  mark: Qs
}, ec = { met: "✓", unmet: "", failed: "✕" };
function nn({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Zs.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: ec[e]
    }
  );
}
const ac = "_marker_br9fi_2", nc = {
  marker: ac
}, tc = {
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
}, rc = { running: " ward-running" };
function Be({ size: e, kind: a, label: t }) {
  const r = { "--marker": tc[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${nc.marker} ward-marker ward-marker--${a}${rc[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const lc = "_root_ti0pq_2", oc = "_chip_ti0pq_11", ic = "_noCase_ti0pq_23", da = {
  root: lc,
  chip: oc,
  noCase: ic
};
function sc(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function tn({ connection: e, since: a, lastEventAt: t }) {
  const r = sc(a, t), l = Za(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${da.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Be, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${da.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: da.noCase, children: Ja(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${da.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    de(r)
  ] });
}
const cc = "_root_1cvxf_2", dc = "_context_1cvxf_12", uc = "_row_1cvxf_1", mc = "_heading_1cvxf_25", hc = "_headingWrap_1cvxf_33", wc = "_chips_1cvxf_38", _c = "_title_1cvxf_45", fc = "_consequence_1cvxf_55", vc = "_actionsWrap_1cvxf_62", bc = "_actions_1cvxf_62", gc = "_action_1cvxf_62", pc = "_overflowPanel_1cvxf_91", yc = "_measureClip_1cvxf_102", Nc = "_measure_1cvxf_102", Y = {
  root: cc,
  context: dc,
  row: uc,
  heading: mc,
  headingWrap: hc,
  chips: wc,
  title: _c,
  consequence: fc,
  actionsWrap: vc,
  actions: bc,
  action: gc,
  overflowPanel: pc,
  measureClip: yc,
  measure: Nc
};
function kc({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ n(Ee, { as: "h1", className: Y.title, text: e }) : /* @__PURE__ */ n("h1", { className: Y.title, children: e });
}
function $c({ title: e, consequence: a, consequenceHint: t, density: r }) {
  return /* @__PURE__ */ o("div", { className: Y.heading, children: [
    /* @__PURE__ */ n(kc, { title: e, density: r }),
    a && /* @__PURE__ */ n("p", { className: Y.consequence, title: t, children: a })
  ] });
}
function Wa({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: Y.action, "data-action": "", children: a }, t));
}
function $n({ disclosure: e }) {
  return /* @__PURE__ */ n(f, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Cc({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(f, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n($n, { disclosure: l }) : a ? [/* @__PURE__ */ n($n, { disclosure: l }, "more"), /* @__PURE__ */ n(Wa, { actions: e }, "actions")] : /* @__PURE__ */ n(Wa, { actions: e });
}
function Sc(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Rc({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Y.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Wa, { actions: e }) });
}
function Tc(e, a) {
  const t = N(), [r, l] = b(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var u, d;
    l(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function xc({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Y.context, children: [
    /* @__PURE__ */ n(ni, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Y.chips, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] });
}
function Lc(...e) {
  return e.some((a) => a === null);
}
function Ac(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Ec(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + Ac(e);
}
function Ic(e, a, t, r, l) {
  if (l === 0 || Lc(a, t, r)) return !1;
  const [i, s, c] = [a, t, r], u = Math.max(0, e.clientWidth - Ec(e, i));
  return c.offsetWidth > u || s.scrollWidth > s.clientWidth + 1;
}
function Mc(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Bc(e) {
  return rr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function jc(e, a) {
  return a.length === 0 && e.length === 1 && Bc(e[0]);
}
function Pc(e, a) {
  const t = w(null), r = w(null), l = w(null), i = w(null), [s, c] = b(!1);
  return S(() => {
    const u = t.current;
    if (!Mc(u)) return;
    const d = () => c(Ic(u, r.current, l.current, i.current, e.length)), m = new ResizeObserver(d);
    return m.observe(u), i.current && m.observe(i.current), d(), () => m.disconnect();
  }, [e]), { rowRef: t, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function qc({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ n("div", { className: Y.measureClip, children: /* @__PURE__ */ o("div", { className: Y.measure, ref: t, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(f, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function Dc({ connection: e }) {
  return e ? /* @__PURE__ */ n(tn, { connection: e.connection, since: e.since }) : null;
}
function G0({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: u, density: d = "page" }) {
  const { rowRef: m, headingRef: g, actionsRef: v, measureRef: y, collapsed: E } = Pc(i, jc(i, s)), B = s.length > 0, { disclosure: oe, close: Re } = Tc(E || B, v), ne = Sc(s, i, E, u);
  return /* @__PURE__ */ o("header", { className: Y.root, "data-density": d, children: [
    /* @__PURE__ */ n(xc, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Y.row, ref: m, children: [
      /* @__PURE__ */ n("div", { ref: g, className: Y.headingWrap, children: /* @__PURE__ */ n($c, { title: t, consequence: r, consequenceHint: l, density: d }) }),
      /* @__PURE__ */ o("div", { className: Y.actionsWrap, children: [
        /* @__PURE__ */ n(Dc, { connection: c }),
        /* @__PURE__ */ n("div", { className: Y.actions, ref: v, "data-ward-actions": !0, children: /* @__PURE__ */ n(Cc, { actions: i, hasMore: B, collapsed: E, onOverflow: u, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Rc, { actions: ne, disclosure: oe, onEscape: Re }),
    /* @__PURE__ */ n(qc, { actions: i, hasMore: B, measureRef: y })
  ] });
}
const Hc = "_root_td96x_2", Oc = "_body_td96x_16", Cn = {
  root: Hc,
  body: Oc
};
function U0({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${Cn.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ n("div", { className: Cn.body, children: t }) });
}
const Fc = "_root_bf1pc_2", zc = "_table_bf1pc_9", Wc = "_caption_bf1pc_14", Kc = "_series_bf1pc_23", Gc = "_category_bf1pc_31", Uc = "_cell_bf1pc_39", Vc = "_track_bf1pc_45", Yc = "_lane_bf1pc_52", Xc = "_bar_bf1pc_56", Jc = "_value_bf1pc_63", Qc = "_swatch_bf1pc_70", Zc = "_empty_bf1pc_78", X = {
  root: Fc,
  table: zc,
  caption: Wc,
  series: Kc,
  category: Gc,
  cell: Uc,
  track: Vc,
  lane: Yc,
  bar: Xc,
  value: Jc,
  swatch: Qc,
  empty: Zc
}, ed = "—", Sn = 6;
function ad(e, a) {
  if (a.length < 1 || a.length > Sn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${Sn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function nd(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function ut(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function td(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function rd({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = td(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ o("span", { className: X.track, children: [
    /* @__PURE__ */ n("span", { className: X.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${X.bar} ward-barchart-bar`, "data-step": t, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: X.value, children: e === null ? l : r(e) })
  ] }) });
}
function ld({ series: e }) {
  return /* @__PURE__ */ n(T, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: X.swatch, "data-step": ut(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function od({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: X.caption, children: e }),
    /* @__PURE__ */ n("p", { className: X.empty, children: a })
  ] });
}
function id({ title: e, categories: a, series: t, top: r, format: l = ae, categoryHead: i = "Category", missing: s = ed }) {
  return /* @__PURE__ */ n("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: X.table, children: [
    /* @__PURE__ */ n("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: X.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(ld, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((c, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: X.category, children: c }),
      t.map((d, m) => /* @__PURE__ */ n(rd, { value: d.values[u], top: r, step: ut(m, t.length), format: l, missing: s }, d.name))
    ] }, c)) })
  ] }) });
}
function V0(e) {
  ad(e.categories, e.series);
  const a = nd(e.series);
  return a === 0 ? /* @__PURE__ */ n(od, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(id, { ...e, top: a });
}
const sd = "_root_1bfqw_2", cd = "_figure_1bfqw_7", dd = "_of_1bfqw_13", ud = "_bar_1bfqw_18", md = "_rows_1bfqw_38", hd = "_row_1bfqw_38", wd = "_label_1bfqw_49", _d = "_amount_1bfqw_54", Te = {
  root: sd,
  figure: cd,
  of: dd,
  bar: ud,
  rows: md,
  row: hd,
  label: wd,
  amount: _d
};
function fd({ spent: e, ceiling: a, breakdown: t }) {
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
    /* @__PURE__ */ n(
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
    t && /* @__PURE__ */ n("ul", { className: Te.rows, children: t.map((l) => /* @__PURE__ */ o("li", { className: `${Te.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Te.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: Te.amount, children: re(l.amount) })
    ] }, l.label)) })
  ] });
}
const vd = "_frame_9xel2_2", bd = "_table_9xel2_6", gd = "_th_9xel2_12", pd = "_td_9xel2_13", yd = "_sort_9xel2_48", Nd = "_row_9xel2_60", kd = "_empty_9xel2_68", Le = {
  frame: vd,
  table: bd,
  th: gd,
  td: pd,
  sort: yd,
  row: Nd,
  empty: kd
}, $d = { asc: "ascending", desc: "descending" };
function Cd(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return $d[a.direction];
}
function Sd(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Le.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Rd(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Td({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Le.th,
      style: Rd(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Cd(e, a),
      children: Sd(e, t)
    }
  );
}
function xd({ row: e, props: a }) {
  const t = a.rowId(e), r = (a.lockedIds ?? []).includes(t);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: Le.row,
      "data-selected": t === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ n("td", { className: Le.td, "data-align": l.align, "data-mono": l.mono, "data-drop": l.dropPriority, children: a.renderCell(e, l.key) }, l.key))
    }
  );
}
function Ld({
  label: e,
  columns: a,
  rows: t,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: u,
  empty: d
}) {
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: Le.empty, children: d }) : /* @__PURE__ */ n("div", { className: Le.frame, children: /* @__PURE__ */ o("table", { className: Le.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Le.head, children: a.map((m) => /* @__PURE__ */ n(Td, { column: m, sort: c, onSort: u }, m.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((m) => /* @__PURE__ */ n(xd, { row: m, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: u, empty: d } }, r(m))) })
  ] }) });
}
const Ad = "_list_v0s52_2", Ed = {
  list: Ad
};
function Y0({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: Ed.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Id = "_label_1u62a_2", Md = {
  label: Id
};
function X0({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((a) => /* @__PURE__ */ n("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ n("span", { className: Md.label, children: a.header }) }, a.key)) }) });
}
const Bd = "_stack_bp6a0_2", jd = {
  stack: Bd
};
function J0({ children: e }) {
  return /* @__PURE__ */ n("span", { className: jd.stack, "data-ward-action-stack": "", children: e });
}
const Pd = "_set_1z0sq_2", qd = "_legend_1z0sq_7", Dd = "_row_1z0sq_15", Hd = "_control_1z0sq_20", Od = "_input_1z0sq_26", Fd = "_label_1z0sq_31", zd = "_consequence_1z0sq_36", qe = {
  set: Pd,
  legend: qd,
  row: Dd,
  control: Hd,
  input: Od,
  label: Fd,
  consequence: zd
};
function mt({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const u = N(), d = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: qe.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: qe.legend, children: e }),
    a.map((m) => {
      const g = `${d}-${m.value}`, v = m.consequence ? `${g}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: qe.row, children: [
        /* @__PURE__ */ o("span", { className: qe.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: g,
              type: "radio",
              name: d,
              className: qe.input,
              value: m.value,
              checked: t === m.value,
              disabled: l,
              "aria-describedby": La(v, s),
              onChange: () => !l && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: g, className: qe.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ n("p", { id: v, className: `${qe.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const Wd = "_root_s12pg_2", Kd = "_head_s12pg_11", Gd = "_note_s12pg_30", Ud = "_index_s12pg_35", Vd = "_dot_s12pg_39", Yd = "_counter_s12pg_50", Xd = "_trailing_s12pg_58", He = {
  root: Wd,
  head: Kd,
  note: Gd,
  index: Ud,
  dot: Vd,
  counter: Yd,
  trailing: Xd
};
function Jd({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("span", { className: `${He.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: He.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Qd({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: He.counter, "aria-hidden": "true", children: e }) : null;
}
function Rn({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${He.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: He.head, children: [
      /* @__PURE__ */ n(Jd, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: He.note, children: t }),
    /* @__PURE__ */ n(Qd, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: He.trailing, children: i })
  ] });
}
const Zd = "_strip_ww53x_2", eu = "_cell_ww53x_7", au = "_value_ww53x_12", nu = "_link_ww53x_29", tu = "_label_ww53x_49", ze = {
  strip: Zd,
  cell: eu,
  value: au,
  link: nu,
  label: tu
};
function ru(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const ht = (e) => `${ze.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function lu({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: ze.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: ht(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${ze.label} ward-stat-label`, children: e.label })
  ] });
}
function ou({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: ze.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: ht(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${ze.link} ward-stat-link`, href: O(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${ze.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Ea({ cells: e, divided: a = !1 }) {
  return ru(e), /* @__PURE__ */ n("dl", { className: `${ze.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => t.href === void 0 ? /* @__PURE__ */ n(lu, { cell: t }, t.label) : /* @__PURE__ */ n(ou, { cell: t, href: t.href }, t.label)) });
}
const iu = "_root_1eb1u_2", su = "_track_1eb1u_8", cu = "_thumb_1eb1u_46", du = "_labelHidden_1eb1u_64", uu = "_label_1eb1u_64", mu = "_lockedNote_1eb1u_84", Oe = {
  root: iu,
  track: su,
  thumb: cu,
  labelHidden: du,
  label: uu,
  lockedNote: mu
};
function hu(e) {
  return e ? `${Oe.label} ${Oe.labelHidden}` : Oe.label;
}
function We({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), u = `${c}switch`, d = l ? !0 : a, m = r || l;
  return /* @__PURE__ */ o("span", { className: `${Oe.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": d,
        "aria-label": e,
        "aria-labelledby": c,
        "aria-describedby": i,
        className: `${Oe.track} ward-switch`,
        "data-on": d,
        "data-locked": l ? !0 : void 0,
        disabled: m,
        onClick: () => !m && (t == null ? void 0 : t(!d)),
        children: /* @__PURE__ */ n("span", { className: Oe.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: u, className: hu(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Oe.lockedNote, children: "always on" })
    ] })
  ] });
}
const wu = "_bar_1vp69_2", _u = "_skip_1vp69_11", fu = "_mark_1vp69_22", vu = "_nav_1vp69_30", bu = "_list_1vp69_34", gu = "_select_1vp69_41", pu = "_selectTrigger_1vp69_45", yu = "_dest_1vp69_52", Nu = "_actor_1vp69_71", ku = "_actorMark_1vp69_84", $u = "_actorLabel_1vp69_89", Cu = "_tagline_1vp69_108", ie = {
  bar: wu,
  skip: _u,
  mark: fu,
  nav: vu,
  list: bu,
  select: gu,
  selectTrigger: pu,
  dest: yu,
  actor: Nu,
  actorMark: ku,
  actorLabel: $u,
  tagline: Cu
};
function Su(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Ru(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function Q0({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = Ru(r);
  return /* @__PURE__ */ o("header", { className: ie.bar, children: [
    /* @__PURE__ */ n("a", { className: `${ie.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: ie.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: ie.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: ie.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: ie.list, children: a.map((u) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${ie.dest} ward-target`,
          href: O(u.href),
          "aria-current": u.id === t ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ n(
        rt,
        {
          className: ie.select,
          triggerClassName: ie.selectTrigger,
          "aria-label": "Destination",
          value: t,
          options: a.map((u) => ({ value: u.id, label: u.label })),
          onChange: (u) => i == null ? void 0 : i(u)
        }
      )
    ] }),
    c && /* @__PURE__ */ o("span", { className: ie.actor, children: [
      /* @__PURE__ */ n("span", { className: ie.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: ie.actorMark, "aria-hidden": "true", children: Su(c) })
    ] })
  ] });
}
const Tu = "_tree_zzoob_2", xu = "_item_zzoob_6", Lu = "_row_zzoob_10", Au = "_button_zzoob_22", pa = {
  tree: Tu,
  item: xu,
  row: Lu,
  button: Au
}, wt = Me(null);
function Eu({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = Sa({ orientation: "vertical" });
  return /* @__PURE__ */ n(wt.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: pa.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const Iu = { ArrowRight: !0, ArrowLeft: !1 };
function Tn(e) {
  return e ? !0 : void 0;
}
function Mu(e, a) {
  const t = Iu[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function Bu(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function ju(e) {
  const a = [pa.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Pu(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function qu(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Du(e) {
  return typeof e == "string" ? e : void 0;
}
function Hu({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Ou({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function _t(e) {
  const a = Ie(wt);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = Pu(e);
  return /* @__PURE__ */ o("li", { className: pa.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: ju(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": Tn(e.unresolved),
        "data-inherited": Tn(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${pa.button} ward-treeitem-btn`,
            onClick: () => Bu(e),
            onKeyDown: (r) => Mu(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: qu(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Du(e.label), children: e.label }),
              /* @__PURE__ */ n(Hu, { value: e.detail }),
              /* @__PURE__ */ n(Ou, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Fu = "_frame_dhc53_2", zu = "_subjectRail_dhc53_22", Wu = "_subject_dhc53_22", Ku = "_rail_dhc53_42", Gu = "_record_dhc53_66", Uu = "_recordBody_dhc53_71", Vu = "_stageGrid_dhc53_120", Yu = "_band_dhc53_146", Xu = "_bandBody_dhc53_155", Ju = "_bandActions_dhc53_160", Qu = "_scroller_dhc53_168", Zu = "_board_dhc53_194", em = "_laneCount_dhc53_202", am = "_lanes_dhc53_212", J = {
  frame: Fu,
  subjectRail: zu,
  subject: Wu,
  rail: Ku,
  record: Gu,
  recordBody: Uu,
  stageGrid: Vu,
  band: Yu,
  bandBody: Xu,
  bandActions: Ju,
  scroller: Qu,
  board: Zu,
  laneCount: em,
  lanes: am
};
function Z0({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: J.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function xn(e) {
  return e ? "true" : void 0;
}
function eS({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: J.subjectRail, "data-ward-subject-rail": t, "data-ruled": xn(i), children: [
    /* @__PURE__ */ n("div", { className: J.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: J.rail, "data-sticky": xn(l), "aria-label": r, children: a })
  ] });
}
function aS({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: J.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(Rn, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: J.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(Rn, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: J.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const nm = "_form_1j8ub_2", tm = "_fields_1j8ub_9", rm = "_actions_1j8ub_19", Pa = {
  form: nm,
  fields: tm,
  actions: rm
};
function nS({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Pa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Pa.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Pa.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function tS({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: J.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: J.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: J.bandActions, children: a })
  ] });
}
const lm = "(max-width: 767.98px)";
function rn({ label: e, children: a, laneCount: t, onOverflow: r }) {
  const l = w(null);
  oa(l, t ?? lr.count(a), r);
  const i = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { ref: l, className: J.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function om({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = b(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: J.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(M, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(rn, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function im({ lanes: e, label: a }) {
  const [t, r] = b(!1);
  return /* @__PURE__ */ o("div", { className: J.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: J.laneCount, "data-ward-board-lane-count": "", hidden: !t, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ n(rn, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ n(or, { children: l.content }, l.id)) })
  ] });
}
function rS({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = xa(lm);
  return t === void 0 ? /* @__PURE__ */ n(rn, { label: a, children: e }) : l ? /* @__PURE__ */ n(om, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(im, { lanes: t, label: a });
}
function lS({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = w(null), i = Math.max(e, 1);
  oa(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: J.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const sm = "_block_vmwmz_2", cm = "_sentence_vmwmz_15", dm = "_meta_vmwmz_20", um = "_action_vmwmz_25", mm = "_strip_vmwmz_29", hm = "_loading_vmwmz_48", wm = "_label_vmwmz_56", _m = "_counter_vmwmz_63", fe = {
  block: sm,
  sentence: cm,
  meta: dm,
  action: um,
  strip: mm,
  loading: hm,
  label: wm,
  counter: _m
};
function fm({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: fe.action, children: /* @__PURE__ */ n(f, { onClick: e.onClick, children: e.label }) });
}
function Ia({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${fe.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: fe.sentence, children: e }),
    t,
    /* @__PURE__ */ n(fm, { action: a })
  ] });
}
function vm(e) {
  return /* @__PURE__ */ n(Ia, { ...e, kind: "ward-emptystate" });
}
function oS({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(Ia, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function iS(e) {
  return /* @__PURE__ */ n(Ia, { ...e });
}
function sS({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(Ia, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function cS({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function dS({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function uS({ label: e, startedAt: a }) {
  const t = w(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = b(!1);
  S(() => {
    const s = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = Za(t.current, r);
  return /* @__PURE__ */ o("div", { className: `${fe.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: fe.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: fe.counter, children: Ja(i) }) : null
  ] });
}
const bm = "_note_cigdt_2", gm = {
  note: bm
};
function pm({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: gm.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const ym = "_card_11u1w_3", Nm = "_hit_11u1w_31", km = "_head_11u1w_44", $m = "_title_11u1w_51", Cm = "_meta_11u1w_56", Sm = "_fields_11u1w_57", Rm = "_who_11u1w_70", Tm = "_sep_11u1w_74", xm = "_mono_11u1w_78", Lm = "_field_11u1w_57", Am = "_last_11u1w_94", Em = "_reason_11u1w_106", Z = {
  card: ym,
  hit: Nm,
  head: km,
  title: $m,
  meta: Cm,
  fields: Sm,
  who: Rm,
  sep: Tm,
  mono: xm,
  field: Lm,
  last: Am,
  reason: Em
}, Im = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Mm(e, a, t) {
  const r = ha(e, "blue"), l = ha(e, "orange"), i = ha(e, "green"), s = w(/* @__PURE__ */ new Set());
  S(() => {
    if (!t) return;
    const c = { blue: r, orange: l, green: i };
    return t.subscribe(a, (u) => {
      if (s.current.has(u.id)) return;
      s.current.add(u.id);
      const d = Im[u.type];
      d && c[d]();
    });
  }, [r, t, i, a, l]);
}
const Bm = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function jm(e, a) {
  return Bm[a](e);
}
function Pm({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: Z.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: Z.meta, children: [
    /* @__PURE__ */ n(Ee, { className: Z.who, text: `waits on ${e.run.agent}` }),
    t,
    /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: Z.meta, children: [
    /* @__PURE__ */ n(Ee, { className: Z.who, text: `waits on ${e.waitsOn}` }),
    t,
    /* @__PURE__ */ o("span", { className: Z.mono, children: [
      ce(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function qm({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: Z.head, children: [
    e.flagged && /* @__PURE__ */ n(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function Dm({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: Z.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Hm({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: Z.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: Z.field, children: jm(e, t) }, t)) });
}
const Ka = (e) => e ? !0 : void 0;
function Om(e) {
  return { "--stream": ve(e.streamStep, "id") };
}
function Fm(e, a, t) {
  e == null || e(a, t);
}
function zm(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Wm({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: Z.last, "data-stale": Ka(a), children: t }) : null;
}
function Ma(e) {
  const a = e.fields ?? [], t = e.item, r = w(null);
  Mm(r, t.key, e.feed);
  const l = zm(e.feed), i = Om(t);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: Z.card,
      style: i,
      "data-selected": Ka(e.selected),
      "data-flagged": Ka(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: Z.hit, onClick: (s) => Fm(e.onOpen, t.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(qm, { item: t }),
        /* @__PURE__ */ n(Ee, { as: "p", className: Z.title, text: t.title }),
        /* @__PURE__ */ n(Pm, { item: t, connection: l }),
        /* @__PURE__ */ n(Dm, { reason: t.blockedReason }),
        /* @__PURE__ */ n(Hm, { item: t, fields: a }),
        /* @__PURE__ */ n(Wm, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const Km = "_column_1j8bi_3", Gm = "_head_1j8bi_21", Um = "_label_1j8bi_30", Vm = "_count_1j8bi_39", Ym = "_list_1j8bi_53", na = {
  column: Km,
  head: Gm,
  label: Um,
  count: Vm,
  list: Ym
};
function ft(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Xm({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: na.head, children: [
    /* @__PURE__ */ n("h2", { className: na.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: na.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Jm(e) {
  return /* @__PURE__ */ n("div", { className: na.list, role: "list", children: e.rows.map((a, t) => {
    var r;
    return /* @__PURE__ */ n(
      Ma,
      {
        item: a,
        fields: e.fields,
        onOpen: e.onOpen,
        selected: a.key === e.selectedKey,
        feed: e.feed,
        rovingProps: (r = e.roving) == null ? void 0 : r.itemProps(e.roving.base + t),
        inList: !0
      },
      a.key
    );
  }) });
}
function Qm({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: u }) {
  const d = N(), m = e.cap !== void 0 && a.length > e.cap, g = ft(a, r);
  return /* @__PURE__ */ o("section", { className: na.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(Xm, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(Jm, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: g }),
    m && /* @__PURE__ */ n(pm, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Zm = "_foot_cs4jr_2", eh = "_note_cs4jr_13", ah = "_link_cs4jr_19", qa = {
  foot: Zm,
  note: eh,
  link: ah
};
function mS({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: qa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: qa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${qa.link} ward-target`, href: O(e), children: "Configure board" })
  ] });
}
const nh = "_head_1tfi5_3", th = "_identity_1tfi5_12", rh = "_titleRow_1tfi5_18", lh = "_title_1tfi5_18", oh = "_key_1tfi5_35", ih = "_rollup_1tfi5_45", sh = "_tools_1tfi5_53", ch = "_swatch_1tfi5_101", dh = "_mark_1tfi5_108", ye = {
  head: nh,
  identity: th,
  titleRow: rh,
  title: lh,
  key: oh,
  rollup: ih,
  tools: sh,
  swatch: ch,
  mark: dh
}, Ln = "initials:";
function uh(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function mh(e) {
  const a = [uh(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function hh(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    mh(e)
  ] });
}
function wh(e) {
  return e.startsWith(Ln) ? e.slice(Ln.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function _h({ markRef: e, streamStep: a }) {
  const t = { "--stream": ve(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${ye.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: wh(e) }) : /* @__PURE__ */ n("span", { className: ye.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function fh({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function hS({
  stream: e,
  rollups: a,
  connection: t,
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
        /* @__PURE__ */ n(_h, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: ye.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: ye.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: ye.rollup, "aria-live": "polite", children: hh(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ye.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(fh, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(f, { onClick: c, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(tn, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const vh = "_head_1sejb_14", bh = "_line_1sejb_15", gh = "_cHandle_1sejb_36", ph = "_cName_1sejb_41", yh = "_nameLine_1sejb_49", Nh = "_cLabel_1sejb_56", kh = "_cCap_1sejb_61", $h = "_cShown_1sejb_66", Ch = "_name_1sejb_49", Sh = "_noCap_1sejb_88", Rh = "_state_1sejb_102", Th = "_handle_1sejb_111", xh = "_sub_1sejb_137", P = {
  head: vh,
  line: bh,
  cHandle: gh,
  cName: ph,
  nameLine: yh,
  cLabel: Nh,
  cCap: kh,
  cShown: $h,
  name: Ch,
  noCap: Sh,
  state: Rh,
  handle: Th,
  sub: xh
}, Lh = "can't be hidden or collapsed", Ah = "terminal · counted, not a column";
function wS() {
  return /* @__PURE__ */ o("div", { className: P.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: P.cHandle }),
    /* @__PURE__ */ n("span", { className: P.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: P.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: P.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: P.cShown, children: "Shown" })
  ] });
}
function Eh(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Ih(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function An(e) {
  return e.gate ? Lh : e.terminal ? Ah : Ih(e.agentsMounted);
}
function Mh(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Bh({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: P.cName, children: [
    /* @__PURE__ */ o("span", { className: P.nameLine, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    An(e) && /* @__PURE__ */ n("span", { className: P.sub, children: An(e) })
  ] });
}
function jh(e) {
  return e === void 0 ? "" : String(e);
}
function Ph(e) {
  return e === "" ? void 0 : Number(e);
}
function qh({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: P.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: P.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => Mh(t, a),
      children: "⠿"
    }
  ) });
}
function Dh({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${P.cCap} ${P.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: P.cCap, children: /* @__PURE__ */ n(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: jh(a.cap), onChange: (r) => t({ ...a, cap: Ph(r) }) }) });
}
function Hh({ stage: e, config: a, onChange: t }) {
  const r = Eh(e, a.shown), l = e.gate || e.terminal, i = (s) => t({ ...a, shown: s });
  return /* @__PURE__ */ o("span", { className: P.cShown, children: [
    /* @__PURE__ */ n(We, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ n("span", { className: P.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function Oh(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function _S({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: P.line, "data-kind": Oh(e), children: [
    /* @__PURE__ */ n(qh, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Bh, { stage: e }),
    /* @__PURE__ */ n("span", { className: P.cLabel, children: /* @__PURE__ */ n(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(Dh, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(Hh, { stage: e, config: a, onChange: t })
  ] });
}
const Fh = "_body_1a4f4_2", zh = "_head_1a4f4_9", Wh = "_summary_1a4f4_19", Kh = "_block_1a4f4_20", Gh = "_actionsBlock_1a4f4_21", Uh = "_title_1a4f4_41", Vh = "_note_1a4f4_46", Yh = "_k_1a4f4_51", Xh = "_kv_1a4f4_58", Jh = "_row_1a4f4_64", Qh = "_label_1a4f4_75", Zh = "_value_1a4f4_84", ew = "_quote_1a4f4_90", aw = "_actions_1a4f4_21", nw = "_resolve_1a4f4_103", q = {
  body: Fh,
  head: zh,
  summary: Wh,
  block: Kh,
  actionsBlock: Gh,
  title: Uh,
  note: Vh,
  k: Yh,
  kv: Xh,
  row: Jh,
  label: Qh,
  value: Zh,
  quote: ew,
  actions: aw,
  resolve: nw
};
function tw(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function rw(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function lw(e) {
  const a = sa(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function ow(e) {
  return (e ?? []).map((a, t) => [a.label, a.value, `fact-${t}`]);
}
function iw(e, a, t) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(h, { ...Aa(lw(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...tw(e),
    ...ow(t),
    ...rw(e, a)
  ];
}
function sw({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: q.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: q.k, children: a }),
    e
  ] });
}
function cw({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: q.head, children: [
    /* @__PURE__ */ n(h, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function dw({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: q.block, children: [
    /* @__PURE__ */ n("p", { className: q.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: q.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: q.note, children: e.agentMeta })
  ] }) : null;
}
function fS({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: u }) {
  const d = N(), m = iw(e, l, u);
  return /* @__PURE__ */ n(ea, { kind: "drawer", labelledBy: d, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: q.body, children: [
    /* @__PURE__ */ n(cw, { item: e }),
    /* @__PURE__ */ o("div", { className: q.summary, children: [
      /* @__PURE__ */ n("h2", { className: q.title, id: d, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: q.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: q.kv, children: m.map(([g, v, y]) => /* @__PURE__ */ o("div", { className: q.row, children: [
      /* @__PURE__ */ n("dt", { className: q.label, children: g }),
      /* @__PURE__ */ n("dd", { className: q.value, children: v })
    ] }, y ?? g)) }),
    /* @__PURE__ */ n(dw, { item: e }),
    /* @__PURE__ */ o("div", { className: q.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: q.actions, children: a }),
      c && /* @__PURE__ */ n("p", { className: q.note, children: c })
    ] }),
    /* @__PURE__ */ n(sw, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const uw = "_root_3azmy_2", mw = "_list_3azmy_7", hw = "_item_3azmy_12", ww = "_box_3azmy_18", _w = "_text_3azmy_23", fw = "_note_3azmy_28", Ue = {
  root: uw,
  list: mw,
  item: hw,
  box: ww,
  text: _w,
  note: fw
};
function Ba({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ o("div", { className: Ue.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ue.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ue.box, children: /* @__PURE__ */ n(nn, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Ue.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Ue.note} ward-checklist-note`, children: a })
  ] });
}
const vw = "_rail_znbbp_2", bw = "_k_znbbp_11", gw = "_head_znbbp_19", pw = "_section_znbbp_25", yw = "_card_znbbp_39", Nw = "_strip_znbbp_46", kw = "_skeleton_znbbp_60", $w = "_skeletonLabel_znbbp_74", Cw = "_bar_znbbp_80", Sw = "_note_znbbp_89", me = {
  rail: vw,
  k: bw,
  head: gw,
  section: pw,
  card: yw,
  strip: Nw,
  skeleton: kw,
  skeletonLabel: $w,
  bar: Cw,
  note: Sw
};
function Rw(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Da({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: me.k, children: e }),
    a
  ] });
}
function Tw({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function xw({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(Qm, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function Lw(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(xw, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Tw, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function vS(e) {
  const a = Rw(e.onOpen), t = ft(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Da, { title: "Card", children: /* @__PURE__ */ n("div", { className: me.card, children: t && /* @__PURE__ */ n(Ma, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Da, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Lw, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Da, { title: "Effect of this config", children: /* @__PURE__ */ n(Ba, { items: e.effects, density: "compact" }) })
  ] });
}
function Aw(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Ew(e) {
  return Math.ceil(e.length / 2);
}
function Iw(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function vt(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Mw(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = vt(e);
  l !== void 0 && t(l), r(Iw(e.type));
}
function Bw(e, a, t, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Mw(i, t, r, l));
  }, [e, a, t, r, l]);
}
function jw(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Pw(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function qw(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Dw(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(Ew(a ?? [])) + ")"
  };
}
function Hw(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Ow(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(h, { role: "meta", label: re(e.cost) }) : null;
}
function Fw(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(h, { role: "meta", label: e.jiraKey }) : null;
}
function zw(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Se, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function Ww(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function Kw(e, a) {
  return a === void 0 ? e : Aw(e, a.ref);
}
function Gw(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function la(e) {
  return e === !0 ? "true" : void 0;
}
function bt(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = w(null), i = ha(l), s = w(/* @__PURE__ */ new Set()), [c, u] = b(jw(a));
  Bw(e.feed, a.key, s, u, i);
  const d = Pw(a, r), m = qw(a, t), g = Dw(a, e.fields), v = Ww(a, t, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Gw(e),
      className: "ward-workcard",
      "data-flagged": la(a.flagged),
      "data-selected": la(e.selected),
      style: g,
      ref: Kw(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Hw(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(h, { role: d.role, label: d.label }),
          Ow(a, e.fields),
          Fw(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          zw(t, c, e.connection, a.changedAt),
          v !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: v, children: v }) : null
        ] })
      ]
    }
  ) });
}
function Uw({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Vw(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Yw(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Xw(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Uw, { count: e.items.length, cap: e.column.cap });
}
function Jw(e, a) {
  return e.roving ?? a;
}
function Qw(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Zw(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    bt,
    {
      item: t,
      fields: e.fields,
      onOpen: e.onOpen,
      selected: t.key === e.selectedKey,
      feed: e.feed,
      connection: e.connection,
      rovingItem: a.itemProps(r)
    },
    t.key
  ));
}
function e_(e) {
  const a = N(), t = Sa({ orientation: "vertical" }), r = Jw(e, t), l = Vw(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": la(l), "data-gate": la(e.column.gate), children: [
    Yw(e.column, e.items.length, a),
    Xw(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Qw(e, t), children: Zw(e, r) })
  ] });
}
function a_(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function n_(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function t_(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function bS(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: a_(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      n_(e),
      t_(e.onConfigure),
      /* @__PURE__ */ n(tn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function r_(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function l_(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(We, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(We, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function o_(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ n(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function gS(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": la(r_(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: l_(e) }),
    /* @__PURE__ */ n(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(Jn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    o_(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function pS(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(bt, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(e_, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function i_(e, a) {
  const t = vt(e);
  t !== void 0 && a(t);
}
function s_(e, a, t) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => i_(r, t));
  }, [e, a, t]);
}
function c_(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function d_(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function u_(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Se, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function m_(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function yS(e) {
  var s;
  const a = e.item, t = a.run, [r, l] = b((s = a.run) == null ? void 0 : s.lastStep);
  s_(e.feed, a.key, l);
  const i = [...c_(a), ...d_(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      u_(t, r)
    ] }),
    m_(a, e.actions)
  ] });
}
const h_ = "_card_54446_3", w_ = "_head_54446_30", __ = "_mark_54446_38", f_ = "_name_54446_50", v_ = "_chips_54446_71", b_ = "_description_54446_77", g_ = "_run_54446_82", p_ = "_sep_54446_91", y_ = "_facts_54446_96", N_ = "_fact_54446_96", k_ = "_factLabel_54446_109", $_ = "_factValue_54446_113", le = {
  card: h_,
  head: w_,
  mark: __,
  name: f_,
  chips: v_,
  description: b_,
  run: g_,
  sep: p_,
  facts: y_,
  fact: N_,
  factLabel: k_,
  factValue: $_
}, C_ = { live: "done", draft: "running", paused: "meta" };
function S_(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function R_({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ n(h, { role: C_[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function T_({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: le.description, children: e });
}
function x_({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Se, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function L_({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ n("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function A_(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function E_({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": ve(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: S_(s),
      style: c,
      "data-selected": u,
      "data-paused": A_(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ n("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${le.name} ward-rowlink ward-target`, href: O(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(T_, { description: e.description }),
        /* @__PURE__ */ n(x_, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(R_, { versions: e.versions }),
        /* @__PURE__ */ n(L_, { facts: i })
      ]
    }
  );
}
const I_ = "_list_4dcyc_2", M_ = "_row_4dcyc_11", B_ = "_head_4dcyc_23", j_ = "_id_4dcyc_30", P_ = "_lock_4dcyc_35", q_ = "_reason_4dcyc_41", D_ = "_remove_4dcyc_46", H_ = "_clauses_4dcyc_50", O_ = "_clause_4dcyc_50", F_ = "_label_4dcyc_64", z_ = "_cell_4dcyc_71", W_ = "_value_4dcyc_76", se = {
  list: I_,
  row: M_,
  head: B_,
  id: j_,
  lock: P_,
  reason: q_,
  remove: D_,
  clauses: H_,
  clause: O_,
  label: F_,
  cell: z_,
  value: W_
}, gt = Me(!1);
function NS({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(gt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: se.list, "aria-label": a, children: e }) });
}
function K_({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: se.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function G_({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: se.lock, children: [
    /* @__PURE__ */ n(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: se.reason, children: e })
  ] });
}
function U_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: se.head, children: [
    /* @__PURE__ */ n("span", { className: se.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(G_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: se.remove, children: /* @__PURE__ */ o(f, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function En(e, a) {
  return e.locked ? void 0 : a;
}
function kS({ rule: e, onChange: a, onRemove: t }) {
  if (!Ie(gt)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = En(e, a);
  return /* @__PURE__ */ o("li", { className: se.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(U_, { rule: e, onRemove: En(e, t) }),
    /* @__PURE__ */ n("dl", { className: se.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: se.clause, children: [
      /* @__PURE__ */ n("dt", { className: se.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: se.cell, children: /* @__PURE__ */ n(K_, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const V_ = "_ladder_n8eeo_2", Y_ = "_cell_n8eeo_7", X_ = "_empty_n8eeo_26", J_ = "_name_n8eeo_34", Q_ = "_holder_n8eeo_40", Z_ = "_request_n8eeo_46", ef = "_swatches_n8eeo_51", af = "_swatch_n8eeo_51", nf = "_tilesFrame_n8eeo_78", tf = "_tiles_n8eeo_78", rf = "_tile_n8eeo_78", lf = "_bar_n8eeo_117", of = "_hex_n8eeo_128", sf = "_note_n8eeo_138", A = {
  ladder: V_,
  cell: Y_,
  empty: X_,
  name: J_,
  holder: Q_,
  request: Z_,
  swatches: ef,
  swatch: af,
  tilesFrame: nf,
  tiles: tf,
  tile: rf,
  bar: lf,
  hex: of,
  note: sf
}, $S = "not validated yet, pending a CVD matrix and dark stepping";
function cf(e) {
  return e.reserved ? "reserved" : Ta(e.step) ? "validated" : "partial";
}
function pt(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function df(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function uf({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Be, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function mf(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function hf(e, a, t) {
  return {
    "aria-checked": a,
    "aria-disabled": t || void 0,
    tabIndex: t ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const In = (e) => String(e).padStart(2, "0");
function wf(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? pt(e, void 0);
}
function _f({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${A.hex} ward-ladder-hex`, children: r ? `step ${In(e)}` : $r(e) }),
    /* @__PURE__ */ n("span", { className: `${A.note} ward-ladder-note`, children: r ? t : `Step ${In(e)} · ${t}` })
  ] });
}
function ff({ step: e, value: a, taken: t, onChange: r, presentation: l, disabled: i }) {
  const s = cf(e), c = pt(s, t), u = c !== "free", d = u || i, m = a === e.step, g = e.name ?? `Step ${e.step}`, v = () => {
    d || r(e.step);
  }, y = `${g} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...hf(u, m, d), "data-validation": s, style: df(e, s), onClick: v, onKeyDown: (B) => mf(B, v) }, label: y, name: g, holder: c, validation: s, note: wf(s, t, m), step: e.step };
}
const vf = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${A.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${A.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(_f, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${A.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(uf, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${A.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${A.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function bf(e) {
  return vf[e.presentation](ff(e));
}
function gf(e) {
  for (const a of e)
    if (!a.reserved && !Ra(a.step)) throw new Error("colour ladder renders token steps only");
}
function pf() {
  return /* @__PURE__ */ o("div", { className: `${A.cell} ward-ladder-cell ${A.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${A.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${A.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function yf(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Nf = { list: A.ladder, swatches: A.swatches, tiles: A.tilesFrame };
function kf() {
  return /* @__PURE__ */ o("div", { className: `${A.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${A.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${A.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const $f = { list: pf, swatches: () => null, tiles: kf };
function Cf(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function yt(e) {
  const a = e.takenBy ?? {}, t = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  gf(e.steps);
  const r = yf(e), l = $f[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(bf, { step: s, value: e.value, taken: a[s.step], onChange: t, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Cf(e.disabled === !0), className: `${Nf[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: A.tiles, children: i }) : i });
}
const Sf = "_rail_s06lm_2", Rf = "_section_s06lm_12", Tf = "_sectionFlush_s06lm_22", xf = "_head_s06lm_26", Lf = "_headLabel_s06lm_34", Af = "_sample_s06lm_42", Ef = "_sampleLabel_s06lm_47", If = "_sampleTitle_s06lm_54", Mf = "_sampleMeta_s06lm_59", Bf = "_trace_s06lm_65", jf = "_traceHead_s06lm_70", Pf = "_steps_s06lm_78", qf = "_step_s06lm_78", Df = "_stepTitle_s06lm_97", Hf = "_hollow_s06lm_107", Of = "_stepBody_s06lm_115", Ff = "_stepDetail_s06lm_127", zf = "_publish_s06lm_132", Wf = "_reason_s06lm_138", Kf = "_note_s06lm_143", Gf = "_reveal_s06lm_148", k = {
  rail: Sf,
  section: Rf,
  sectionFlush: Tf,
  head: xf,
  headLabel: Lf,
  sample: Af,
  sampleLabel: Ef,
  sampleTitle: If,
  sampleMeta: Mf,
  trace: Bf,
  traceHead: jf,
  steps: Pf,
  step: qf,
  stepTitle: Df,
  hollow: Hf,
  stepBody: Of,
  stepDetail: Ff,
  publish: zf,
  reason: Wf,
  note: Kf,
  reveal: Gf
}, Mn = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Uf = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Vf = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Yf = { notSimulated: "not simulated", running: "running" };
function Xf(e) {
  return e.presentation === "foundry";
}
function Jf(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Qf(e, a) {
  var r;
  const t = Uf[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Zf(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function ev(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function av(e) {
  if (Zf(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function nv(e) {
  const [a, t] = b(!1);
  S(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function tv(e) {
  const a = Yf[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Be, { size: 6, kind: Vf[e.kind], label: e.kind });
}
function rv(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function lv(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function ov(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(nv, { kind: a.kind, children: [
    /* @__PURE__ */ n(tv, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ n(rv, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(lv, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function iv(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(ce(a)), t.join(" · ");
}
function Nt(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ n("p", { className: k.traceHead, id: a, children: iv(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(ov, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function sv(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ o("div", { className: `${k.sample} ${k.section}`, children: [
    /* @__PURE__ */ n("p", { className: k.sampleLabel, children: "Sample item" }),
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
function cv(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function dv(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Gn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: k.sectionFlush, children: /* @__PURE__ */ n(Ea, { divided: !0, cells: a }) });
}
function uv(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Gn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function mv(e) {
  const a = uv(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: k.sectionFlush, children: /* @__PURE__ */ n(Ea, { divided: !0, cells: a }) });
}
function kt(e) {
  const a = N();
  return e.reason !== null ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("p", { className: `${k.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(f, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(f, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function hv(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ n(kt, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: k.note, children: e.note })
  ] });
}
function wv(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ n(kt, { reason: e.reason, onPublish: e.onPublish }) });
}
function $t(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(h, { role: Mn[e.run.status].role, label: Mn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Se, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function _v(e, a) {
  const [t, r] = b(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [a, e.status]), t;
}
function fv(e) {
  var t;
  ev(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n($t, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(sv, { sample: e.run.sample }),
    /* @__PURE__ */ n(Nt, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(dv, { run: e.run }),
    /* @__PURE__ */ n("div", { className: k.section, children: /* @__PURE__ */ n(Ba, { items: e.checklist }) }),
    /* @__PURE__ */ n(hv, { reason: Jf(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function vv(e) {
  var r;
  const a = _v(e.run, e.feed);
  av(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n($t, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(cv, { sample: e.run.sample }),
    /* @__PURE__ */ n(Nt, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(mv, { run: e.run }),
    /* @__PURE__ */ n("div", { className: k.section, children: /* @__PURE__ */ n(Ba, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(wv, { reason: Qf(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function CS(e) {
  return Xf(e) ? /* @__PURE__ */ n(vv, { ...e }) : /* @__PURE__ */ n(fv, { ...e });
}
const bv = "_list_142ip_3", gv = "_row_142ip_9", pv = "_condition_142ip_18", yv = "_action_142ip_24", wa = {
  list: bv,
  row: gv,
  condition: pv,
  action: yv
}, Ct = Me(!1);
function SS({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Ct.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: wa.list, "aria-label": a, children: e }) });
}
function RS({ rule: e }) {
  if (!Ie(Ct)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: wa.row, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: wa.condition, children: e.when }),
    /* @__PURE__ */ n(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: wa.action, children: e.then })
  ] });
}
const Nv = "_move_tmppt_3", kv = {
  move: Nv
};
function Ga(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(t, 0, l), r;
}
function St(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Rt(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function Bn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function $v(e) {
  return e === "up" ? "down" : "up";
}
function Cv(e, a) {
  const t = Bn(e, a.id, a.direction) ?? Bn(e, a.id, $v(a.direction));
  t == null || t.focus();
}
function Tt() {
  const e = w(null), [a, t] = b(null), [r, l] = b("");
  return S(() => {
    e.current !== null && a !== null && Cv(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    t(s), l(c);
  } };
}
function xt({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ya({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${kv.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Sv = "_body_1jd1i_2", Rv = "_title_1jd1i_8", Tv = "_section_1jd1i_13", xv = "_legend_1jd1i_18", Lv = "_stages_1jd1i_26", Av = "_stage_1jd1i_26", Ev = "_stageIndex_1jd1i_44", Iv = "_stageName_1jd1i_50", Mv = "_footer_1jd1i_59", Bv = "_note_1jd1i_66", jv = "_reason_1jd1i_71", Pv = "_actions_1jd1i_76", qv = "_webHead_1jd1i_83", Dv = "_kicker_1jd1i_92", Hv = "_webTitle_1jd1i_99", Ov = "_webBody_1jd1i_105", Fv = "_webSection_1jd1i_109", zv = "_sectionHead_1jd1i_121", Wv = "_sectionNote_1jd1i_129", Kv = "_formLabel_1jd1i_134", Gv = "_identityRow_1jd1i_139", Uv = "_nameCell_1jd1i_145", Vv = "_keyCell_1jd1i_150", Yv = "_colourCell_1jd1i_154", Xv = "_colourStatus_1jd1i_161", Jv = "_webStages_1jd1i_166", Qv = "_webStageList_1jd1i_172", Zv = "_webStage_1jd1i_166", eb = "_webIndex_1jd1i_191", ab = "_webStageName_1jd1i_196", nb = "_webMoves_1jd1i_201", tb = "_addStage_1jd1i_215", rb = "_addStageButton_1jd1i_223", lb = "_addStageNote_1jd1i_231", ob = "_webFooter_1jd1i_236", ib = "_webFooterNotes_1jd1i_244", sb = "_webNote_1jd1i_251", _ = {
  body: Sv,
  title: Rv,
  section: Tv,
  legend: xv,
  stages: Lv,
  stage: Av,
  stageIndex: Ev,
  stageName: Iv,
  footer: Mv,
  note: Bv,
  reason: jv,
  actions: Pv,
  webHead: qv,
  kicker: Dv,
  webTitle: Hv,
  webBody: Ov,
  webSection: Fv,
  sectionHead: zv,
  sectionNote: Wv,
  formLabel: Kv,
  identityRow: Gv,
  nameCell: Uv,
  keyCell: Vv,
  colourCell: Yv,
  colourStatus: Xv,
  webStages: Jv,
  webStageList: Qv,
  webStage: Zv,
  webIndex: eb,
  webStageName: ab,
  webMoves: nb,
  addStage: tb,
  addStageButton: rb,
  addStageNote: lb,
  webFooter: ob,
  webFooterNotes: ib,
  webNote: sb
}, cb = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Lt = "not in catalogue";
function db(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${Lt}` }, ...t];
}
function ub({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Lt}`;
  return /* @__PURE__ */ n(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: db(t, e.name), invalid: i, onChange: r });
}
function At(e, a) {
  return e.name || `stage ${a + 1}`;
}
function mb(e) {
  const a = w([]), t = w(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function hb({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = At(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${_.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: _.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: _.webStageName, children: /* @__PURE__ */ n(ub, { stage: a, index: t, catalogue: l, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(M, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: cb, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ o("span", { className: _.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ya, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      t < r - 1 && /* @__PURE__ */ n(ya, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function wb({ stages: e, onChange: a, catalogue: t }) {
  const r = mb(e.length), l = Tt(), i = (c, u) => {
    const d = St(c, u);
    r.current = Ga(r.current, c, d), l.moved({ id: r.current[d], direction: u }, Rt(At(e[c], c), d, e.length)), a(Ga(e, c, d));
  }, s = (c, u) => a(e.map((d, m) => m === c ? u : d));
  return /* @__PURE__ */ o("div", { className: _.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: _.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, u) => /* @__PURE__ */ n(hb, { id: r.current[u], stage: c, index: u, total: e.length, catalogue: t, onReplace: (d) => s(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(xt, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: _.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: _.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: _.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const _b = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], fb = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], vb = "A new stream starts as a draft. Nothing runs on it until you publish it.", bb = "Create is disabled: name the stream and give it a key first.", gb = "reorder with the ↑ ↓ buttons · min 2";
function ln(e, a) {
  return !e.reserved && Ta(e.step) && a[e.step] === void 0;
}
function pb(e, a) {
  const t = e.find((r) => ln(r, a));
  return t ? t.step : 1;
}
function yb({ stages: e, onMove: a }) {
  const t = Tt(), r = (l, i) => {
    const s = St(l, i);
    t.moved({ id: e[l].id, direction: i }, Rt(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: _.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: _.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: _.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: _.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(h, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(ya, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ya, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(xt, { text: t.announcement })
  ] });
}
function Nb({ reason: e, onCreate: a, onDraft: t }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: _.footer, children: [
    /* @__PURE__ */ n("p", { className: _.note, children: vb }),
    e && /* @__PURE__ */ n("p", { className: _.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: _.actions, children: [
      /* @__PURE__ */ n(f, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(f, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function kb(e, a) {
  return e !== "" && a !== "" ? null : bb;
}
function $b(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = fb, onCreate: i, onDraft: s, onClose: c, returnFocusTo: u } = e, d = N(), [m, g] = b(""), [v, y] = b(""), [E, B] = b(a[0].value), [oe, Re] = b(() => pb(t, r)), [ne, Ke] = b(e.stages ?? _b), [Ge, R] = b(l[0].value), G = { name: m, key: v, streamStep: oe, owner: E, stages: ne, policy: Ge }, be = kb(m, v);
  return /* @__PURE__ */ n(ea, { kind: "modal", labelledBy: d, onClose: c, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: _.body, children: [
    /* @__PURE__ */ n("h2", { className: _.title, id: d, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Identity" }),
      /* @__PURE__ */ n(M, { kind: "input", label: "Stream name", value: m, onChange: g }),
      /* @__PURE__ */ n(M, { kind: "input", label: "Key", value: v, onChange: y, mono: !0 }),
      /* @__PURE__ */ n(M, { kind: "select", label: "Owner", value: E, onChange: B, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Colour" }),
      /* @__PURE__ */ n(yt, { label: "Stream colour", steps: t, value: oe, onChange: Re, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Stages" }),
      /* @__PURE__ */ n(yb, { stages: ne, onMove: (je, tr) => Ke(Ga(ne, je, tr)) })
    ] }),
    /* @__PURE__ */ n(mt, { legend: "Loop policy", options: l, value: Ge, onChange: R }),
    /* @__PURE__ */ n(Nb, { reason: be, onCreate: () => i(G), onDraft: () => s(G) })
  ] }) });
}
const Et = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Cb = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Sb(e, a, t, r, l, i) {
  var c;
  const s = ((c = Et.find((u) => u.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: s, stages: i };
}
function Rb(e, a) {
  return Tb(e) && xb(e, a) && Lb(e);
}
function Tb(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function xb(e, a) {
  return e.colourStep === null || ln({ step: e.colourStep }, a);
}
function Lb(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Ab(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : ln({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Eb({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: _.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: _.webNote, children: "Add a stage an agent can run on." });
}
function Ib({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: _.webFooter, children: [
    /* @__PURE__ */ o("div", { className: _.webFooterNotes, children: [
      /* @__PURE__ */ n(Eb, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: _.reason, children: Cb })
    ] }),
    l && /* @__PURE__ */ n(f, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(f, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Mb({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: _.webHead, children: [
    /* @__PURE__ */ n("span", { className: _.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: _.webTitle, children: "New stream" })
  ] });
}
function Bb({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: _.webSection, children: [
    /* @__PURE__ */ n("h3", { className: _.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: _.identityRow, children: [
      /* @__PURE__ */ n("div", { className: _.nameCell, children: /* @__PURE__ */ n(M, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: _.keyCell, children: /* @__PURE__ */ n(M, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function jb(e) {
  const a = N(), t = N(), r = e.takenBy ?? {}, [l, i] = b(""), [s, c] = b(""), [u, d] = b(e.owners[0] ?? ""), [m, g] = b(null), [v, y] = b("relay"), [E, B] = b([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = Sb(l, s, u, m, v, E), Re = Rb(oe, r), ne = E.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ke = /* @__PURE__ */ o("div", { className: _.colourCell, children: [
    /* @__PURE__ */ n("span", { className: _.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(yt, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: g, takenBy: r })
  ] }), Ge = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("p", { className: _.colourStatus, "data-colour-status": "", children: Ab(m, r) }),
    /* @__PURE__ */ n(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map((R) => ({ value: R, label: R })), onChange: d })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Mb, { titleId: t }),
    /* @__PURE__ */ o("div", { className: _.webBody, children: [
      /* @__PURE__ */ n(Bb, { name: l, setName: i, streamKey: s, setKey: c, colour: Ke, owner: Ge }),
      /* @__PURE__ */ o("section", { className: _.webSection, children: [
        /* @__PURE__ */ o("div", { className: _.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: _.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: _.sectionNote, children: gb })
        ] }),
        /* @__PURE__ */ n(wb, { stages: E, onChange: B })
      ] }),
      /* @__PURE__ */ n("section", { className: _.webSection, children: /* @__PURE__ */ n(mt, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: v, options: Et, onChange: y }) }),
      /* @__PURE__ */ n(Ib, { ready: Re, draft: oe, agentStage: ne, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function TS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(jb, { ...e }) : /* @__PURE__ */ n($b, { ...e });
}
const Pb = "_row_bs8hc_2", qb = "_cell_bs8hc_6", Db = "_condition_bs8hc_11", Hb = "_action_bs8hc_18", Ob = "_contract_bs8hc_24", Fb = "_contractCondition_bs8hc_33", zb = "_contractAction_bs8hc_39", ee = {
  row: Pb,
  cell: qb,
  condition: Db,
  action: Hb,
  contract: Ob,
  contractCondition: Fb,
  contractAction: zb
}, It = ["advance", "block", "escalate", "requestReview"], jn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Na(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function on(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: ee.action, children: jn[e.then] }) : /* @__PURE__ */ n(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: It.map((l) => ({ value: l, label: jn[l] }))
    }
  );
}
function Wb({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: ee.row, children: [
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n("span", { className: ee.condition, title: Na(e, r), children: Na(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: on(e, a, t) })
  ] });
}
function Kb({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: ee.row, children: [
    /* @__PURE__ */ o("td", { className: ee.cell, children: [
      /* @__PURE__ */ n(h, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ee.condition, children: Na(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: on(e, a, t) })
  ] });
}
function Gb({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: ee.contract, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ee.contractCondition, children: Na(e, r) }),
    /* @__PURE__ */ n(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ee.contractAction, children: on(e, a, t, !0) })
  ] });
}
const Ub = { two: Kb, four: Wb, contract: Gb };
function xS(e) {
  var t;
  if (!It.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Ub[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const Vb = "_column_11id3_2", Yb = "_head_11id3_17", Xb = "_index_11id3_23", Jb = "_name_11id3_29", Qb = "_meta_11id3_38", Zb = "_mono_11id3_43", eg = "_gate_11id3_50", ag = "_reviewersLabel_11id3_57", ng = "_reviewers_11id3_57", tg = "_reviewer_11id3_57", rg = "_agents_11id3_74", lg = "_workflowColumn_11id3_79", og = "_workflowHead_11id3_96", ig = "_stageRow_11id3_102", sg = "_stageLabel_11id3_109", cg = "_workflowTitle_11id3_116", dg = "_workflowMeta_11id3_122", ug = "_workflowGate_11id3_127", mg = "_gateNote_11id3_135", hg = "_cardNote_11id3_140", wg = "_reviewerList_11id3_145", _g = "_reviewerRow_11id3_151", fg = "_reviewerMark_11id3_157", vg = "_reviewerName_11id3_167", bg = "_terminalCard_11id3_173", gg = "_terminalCount_11id3_182", pg = "_workflowAgents_11id3_188", yg = "_mount_11id3_194", C = {
  column: Vb,
  head: Yb,
  index: Xb,
  name: Jb,
  meta: Qb,
  mono: Zb,
  gate: eg,
  reviewersLabel: ag,
  reviewers: ng,
  reviewer: tg,
  agents: rg,
  workflowColumn: lg,
  workflowHead: og,
  stageRow: ig,
  stageLabel: sg,
  workflowTitle: cg,
  workflowMeta: dg,
  workflowGate: ug,
  gateNote: mg,
  cardNote: hg,
  reviewerList: wg,
  reviewerRow: _g,
  reviewerMark: fg,
  reviewerName: vg,
  terminalCard: bg,
  terminalCount: gg,
  workflowAgents: pg,
  mount: yg
}, Ng = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function sn(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Mt(e) {
  return `${Math.round(e * 100)}%`;
}
function kg({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: C.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: C.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: C.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Ea, { cells: [
      { value: Mt(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function $g({ stage: e }) {
  return /* @__PURE__ */ n(Ea, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: sn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function Cg({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: C.head, children: [
    /* @__PURE__ */ n("span", { className: C.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: C.name, id: a, children: e.name }),
    /* @__PURE__ */ n(h, { role: e.kind === "gate" ? "gate" : "soft", label: Ng[e.kind] })
  ] });
}
function Sg({ stage: e }) {
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
function Rg({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(kg, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n($g, { stage: e }) : null;
}
function Tg({ onMount: e }) {
  return e ? /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function xg({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: C.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Cg, { stage: e, titleId: l }),
    /* @__PURE__ */ n(Sg, { stage: e }),
    /* @__PURE__ */ n(Rg, { stage: e }),
    /* @__PURE__ */ n("div", { className: C.agents, children: a.map((s) => /* @__PURE__ */ n(E_, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(Tg, { onMount: t })
  ] });
}
const Lg = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function Ag({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: C.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: C.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: C.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: C.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function Eg({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: C.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(Ag, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: C.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: Mt(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Ig(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Mg({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: C.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: C.terminalCount, children: sn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: C.cardNote, children: Ig(e.rolledBackThisWeek) })
  ] });
}
function Bg(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function jg(e) {
  if (e.kind === "terminal") return `${sn(e.closedThisWeek)} this week`;
  const a = Bg(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Pg({ stage: e, titleId: a }) {
  const t = Lg[e.kind];
  return /* @__PURE__ */ o("header", { className: C.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: C.stageRow, children: [
      /* @__PURE__ */ o("span", { className: C.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(h, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: C.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: C.workflowMeta, children: jg(e) })
  ] });
}
function qg(e) {
  return e === "entry" || e === "agent";
}
function Dg({ stage: e, onMount: a }) {
  return a === void 0 || !qg(e.kind) ? null : /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", className: C.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Hg({ stage: e, agentCards: a, onMount: t }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: C.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Pg, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(Eg, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(Mg, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: C.workflowAgents, children: a }),
    /* @__PURE__ */ n(Dg, { stage: e, onMount: t })
  ] });
}
function Og(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function LS(e) {
  return Og(e) ? /* @__PURE__ */ n(Hg, { ...e }) : /* @__PURE__ */ n(xg, { ...e });
}
const Fg = "_row_alabo_6", zg = "_name_alabo_12", Wg = "_compactRow_alabo_13", Kg = "_compactName_alabo_13", Gg = "_cell_alabo_30", Ug = "_chain_alabo_45", Vg = "_owner_alabo_51", Yg = "_mono_alabo_57", Xg = "_compactCell_alabo_79", Jg = "_stack_alabo_96", Qg = "_stat_alabo_103", Zg = "_identityLine_alabo_110", ep = "_identity_alabo_110", ap = "_ownerLine_alabo_137", np = "_link_alabo_150", tp = "_gateMark_alabo_156", rp = "_emptyChain_alabo_161", lp = "_arrow_alabo_167", op = "_muted_alabo_168", ip = "_define_alabo_173", sp = "_statValue_alabo_180", cp = "_policyId_alabo_186", dp = "_sub_alabo_191", p = {
  row: Fg,
  name: zg,
  compactRow: Wg,
  compactName: Kg,
  cell: Gg,
  chain: Ug,
  owner: Vg,
  mono: Yg,
  compactCell: Xg,
  stack: Jg,
  stat: Qg,
  identityLine: Zg,
  identity: ep,
  ownerLine: ap,
  link: np,
  gateMark: tp,
  emptyChain: rp,
  arrow: lp,
  muted: op,
  define: ip,
  statValue: sp,
  policyId: cp,
  sub: dp
};
function Bt(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function up(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function mp(e) {
  return e === void 0 ? p.compactRow : `${p.compactRow} ${e}`;
}
function jt(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function hp(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${jt(e.members)}`;
}
function wp(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: p.compactCell, children: /* @__PURE__ */ o("span", { className: p.stack, children: [
    /* @__PURE__ */ o("span", { className: p.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${p.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${p.compactName} ward-rowlink ward-target`, href: O(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(h, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: p.ownerLine, children: hp(e) })
  ] }) });
}
function Pt({ name: e, gate: a, look: t, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ n("span", { className: p.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(h, { ...t, size: r, label: e }),
    a ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function _p(e, a, t) {
  if (e !== a) return { role: "soft" };
  const r = sa(t);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function fp({ stages: e, streamStep: a }) {
  const t = e.findIndex((r) => r.gate === !0);
  return /* @__PURE__ */ n("span", { className: `${p.chain} ward-chiprow`, children: e.map((r, l) => /* @__PURE__ */ o("span", { className: p.link, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: p.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(Pt, { name: r.name, gate: r.gate === !0, look: _p(l, t, a), size: "tag" })
  ] }, `${r.name}${l}`)) });
}
function vp(e) {
  return /* @__PURE__ */ n("td", { className: p.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: p.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: p.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: p.define, children: "Define workflow" })
  ] }) : fp(e) });
}
function qt(e) {
  return e === void 0 ? void 0 : !0;
}
function Pn(e, a, t, r) {
  return /* @__PURE__ */ n("td", { className: p.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: p.muted, children: t }) : /* @__PURE__ */ o("span", { className: p.stat, children: [
    /* @__PURE__ */ n("span", { className: `${p.statValue} ward-stat-value`, title: r, "data-raised": qt(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: p.sub, children: a })
  ] }) });
}
function bp(e) {
  return /* @__PURE__ */ n("td", { className: p.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: p.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: p.stat, children: [
    /* @__PURE__ */ n("span", { className: p.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: p.sub, children: e.summary })
  ] }) });
}
function gp(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function pp({ stream: e, href: a, presentation: t }) {
  const r = mp(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Bt, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ve(e.streamStep, "chip") }, children: [
    wp(e, a),
    vp(e),
    Pn(gp(e.agents), e.agents === void 0 ? void 0 : up(e.agents), "—"),
    bp(e.policy),
    Pn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function yp(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function AS(e) {
  if (yp(e)) return pp(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: p.row, onClick: Bt, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: p.cell, children: [
      /* @__PURE__ */ n("a", { className: `${p.name} ward-target`, href: O(t), children: a.name }),
      /* @__PURE__ */ n(h, { ...Aa(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ n(h, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: p.cell, children: /* @__PURE__ */ n("span", { className: p.chain, children: a.stages.map((r) => /* @__PURE__ */ n("span", { className: p.link, children: /* @__PURE__ */ n(Pt, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: p.cell, children: /* @__PURE__ */ o("span", { className: p.mono, children: [
      a.agents.live,
      " live · ",
      a.agents.draft,
      " draft · ",
      a.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ o("td", { className: p.cell, children: [
      /* @__PURE__ */ n("span", { className: p.owner, children: a.owner }),
      /* @__PURE__ */ n("span", { className: p.mono, children: jt(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: p.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: p.mono, title: a.inFlightHint, "data-raised": qt(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: p.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: p.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const Np = "_row_2u4ll_2", kp = "_name_2u4ll_16", $p = "_scope_2u4ll_24", ka = {
  row: Np,
  name: kp,
  scope: $p
};
function cn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Cp(e) {
  return e === void 0 ? `${ka.row} ward-toolrow` : `${ka.row} ward-toolrow ${e}`;
}
function Sp(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Rp({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
  return /* @__PURE__ */ n(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: t.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? a : void 0,
      onChange: (i) => {
        r.locked || l(i.target.checked);
      }
    }
  );
}
function Tp({ classification: e }) {
  return /* @__PURE__ */ n(h, { role: e === "write" ? "write" : "meta", label: cn(e) });
}
function xp({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${ka.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Lp(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function ES({ tool: e, onChange: a, presentation: t }) {
  const r = N(), l = N(), i = Sp(e, t), s = Lp(t);
  return /* @__PURE__ */ o(s, { className: Cp(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Rp, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${ka.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(xp, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(Tp, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const Ap = "_strip_4ppv9_2", Ep = "_well_4ppv9_11", Ip = "_head_4ppv9_18", Mp = "_name_4ppv9_24", Bp = "_chart_4ppv9_32", jp = "_segment_4ppv9_38", Pp = "_detailedChart_4ppv9_44", qp = "_rail_4ppv9_57", Dp = "_section_4ppv9_63", Hp = "_label_4ppv9_74", Op = "_note_4ppv9_91", K = {
  strip: Ap,
  well: Ep,
  head: Ip,
  name: Mp,
  chart: Bp,
  segment: jp,
  detailedChart: Pp,
  rail: qp,
  section: Dp,
  label: Hp,
  note: Op
}, Fp = "No item in flight to preview.", zp = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Wp = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Ua = [1, 2, 3, 4, 5, 6], $a = 100;
function Kp(e, a) {
  return a.has(e) ? ve(e, "id") : "var(--ward-color-line)";
}
function Gp({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: K.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ua.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: K.segment,
      x: l * $a,
      y: "0",
      width: $a,
      height: "8",
      fill: Kp(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Up(e) {
  const a = e.slice(0, Ua.length);
  for (; a.length < Ua.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Vp({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${K.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * $a),
        y: "0",
        width: String($a),
        height: "40",
        style: { fill: ve(a.streamStep, "chip") }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function Dt(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ua({ label: e, children: a }) {
  const t = N();
  return /* @__PURE__ */ o("section", { className: K.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: K.label, children: e }),
    a
  ] });
}
function Yp({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: K.note, children: a ?? Fp }) : /* @__PURE__ */ n("div", { className: K.well, children: /* @__PURE__ */ n(Ma, { item: { ...e, streamStep: sa(t.streamStep) }, onOpen: Dt(r), feed: null }) });
}
function Xp({ draft: e }) {
  const a = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: K.head, style: a, children: [
    /* @__PURE__ */ n(Be, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ n(h, { ...Aa(e.key, e.streamStep) })
  ] });
}
function Jp(e) {
  const a = Up(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: K.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ua, { label: "Board card", children: /* @__PURE__ */ n(Yp, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ua, { label: "Streams index row", children: /* @__PURE__ */ n(Xp, { draft: t }) }),
    /* @__PURE__ */ o(ua, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(Vp, { identities: a }),
      /* @__PURE__ */ n("p", { className: K.note, children: zp })
    ] }),
    /* @__PURE__ */ n(ua, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: K.note, children: Wp }) })
  ] });
}
function Qp({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: K.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: K.head, children: [
      /* @__PURE__ */ n(Be, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: K.name, children: e.name }),
      /* @__PURE__ */ n(h, { ...Aa(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: K.well, children: /* @__PURE__ */ n(Ma, { item: { ...a, streamStep: e.streamStep }, onOpen: Dt(r) }) }),
    /* @__PURE__ */ n(Gp, { draft: e, streams: t })
  ] });
}
function IS(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Jp, { ...e }) : /* @__PURE__ */ n(Qp, { ...e });
}
const Zp = "_row_ixlg5_6", ey = "_headCell_ixlg5_10", ay = "_cell_ixlg5_11", ny = "_name_ixlg5_23", ty = "_consequence_ixlg5_29", ry = "_governed_ixlg5_36", ly = "_control_ixlg5_42", oy = "_byRole_ixlg5_48", iy = "_webControl_ixlg5_59", sy = "_webConsequence_ixlg5_65", cy = "_webGoverned_ixlg5_71", H = {
  row: Zp,
  headCell: ey,
  cell: ay,
  name: ny,
  consequence: ty,
  governed: ry,
  control: ly,
  byRole: oy,
  webControl: iy,
  webConsequence: sy,
  webGoverned: cy
};
function dy({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: H.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: H.control, children: [
    /* @__PURE__ */ n(
      We,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(h, { role: "running", label: "Pilot" })
  ] });
}
function uy({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: H.headCell, children: [
      /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: H.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: H.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(dy, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function my(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function hy({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${H.webControl} ${H.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    We,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: t === void 0,
      onChange: (l) => t == null ? void 0 : t(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${H.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(h, { role: "running", label: "Pilot" }),
    r
  ] });
}
function wy({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ o("td", { className: H.cell, children: [
      /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${H.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(hy, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webGoverned} ward-cellmeta`, children: my(e) }) })
  ] });
}
function MS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(wy, { ...e }) : /* @__PURE__ */ n(uy, { ...e });
}
const _y = "_row_vv64h_2", fy = "_cell_vv64h_6", vy = "_name_vv64h_25", by = "_note_vv64h_30", gy = "_webName_vv64h_41", py = "_webMeta_vv64h_47", V = {
  row: _y,
  cell: fy,
  name: vy,
  note: by,
  webName: gy,
  webMeta: py
}, Ht = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function yy(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Ny({ component: e, onRestart: a }) {
  const t = N(), r = Ht[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n("span", { className: V.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: V.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n(h, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n("span", { id: t, className: V.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: V.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(f, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function ky({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: yy(e.state) });
}
function $y({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n("span", { className: `${V.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n("span", { className: `${V.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n(h, { ...Ht[e.state] }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n(ky, { component: e, onRestart: a }) })
  ] });
}
function BS(e) {
  return "presentation" in e ? /* @__PURE__ */ n($y, { ...e }) : /* @__PURE__ */ n(Ny, { ...e });
}
const Cy = "_row_jcm5k_7", Sy = "_cell_jcm5k_11", Ry = "_next_jcm5k_28", Ty = "_headCell_jcm5k_38", xy = "_webId_jcm5k_77", Ly = "_webPurpose_jcm5k_83", Ay = "_webMeta_jcm5k_91", Ey = "_webUrgent_jcm5k_97", F = {
  row: Cy,
  cell: Sy,
  next: Ry,
  headCell: Ty,
  webId: xy,
  webPurpose: Ly,
  webMeta: Ay,
  webUrgent: Ey
}, Iy = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, My = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Ot = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], By = Object.fromEntries(Ot.map((e) => [e.key, e]));
function Ve({ column: e, children: a }) {
  const t = By[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: F.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function jS() {
  return /* @__PURE__ */ n("tr", { children: Ot.map((e) => /* @__PURE__ */ n(
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
function jy({ cred: e }) {
  const a = Iy[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ n(Ve, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Ve, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Ve, { column: "state", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ve, { column: "cls", children: /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: cn(e.cls) }) }),
    /* @__PURE__ */ n(Ve, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Ve, { column: "next", children: /* @__PURE__ */ n("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Py({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function qy({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(Py, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(h, { ...My[e.state] }) })
  ] });
}
function PS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(qy, { ...e }) : /* @__PURE__ */ n(jy, { ...e });
}
const Dy = "_card_17zba_2", Hy = "_head_17zba_11", Oy = "_env_17zba_18", Fy = "_version_17zba_25", zy = "_meta_17zba_32", Wy = "_webCard_17zba_37", Ky = "_webRow_17zba_47", Gy = "_webTitle_17zba_55", Uy = "_webLine_17zba_65", Vy = "_webVersion_17zba_72", Yy = "_webMeta_17zba_77", U = {
  card: Dy,
  head: Hy,
  env: Oy,
  version: Fy,
  meta: zy,
  webCard: Wy,
  webRow: Ky,
  webTitle: Gy,
  webLine: Uy,
  webVersion: Vy,
  webMeta: Yy
}, qn = { dev: "Dev", uat: "UAT", prod: "Prod" }, Ft = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function Xy({ env: e }) {
  const a = Ft[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: U.card, "aria-label": qn[e.env], children: [
    /* @__PURE__ */ o("div", { className: U.head, children: [
      /* @__PURE__ */ n("span", { className: U.env, children: qn[e.env] }),
      /* @__PURE__ */ n(h, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ n("p", { className: U.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: U.meta, children: [
      "deployed ",
      de(e.deployedAt)
    ] }),
    t && /* @__PURE__ */ n("p", { className: U.meta, children: t })
  ] });
}
function Jy(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function Qy(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(h, { ...Ft[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: Jy(e) })
  ] });
}
function qS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Qy, { ...e }) : /* @__PURE__ */ n(Xy, { ...e });
}
const Zy = "_panel_1hmja_2", eN = "_line_1hmja_8", aN = "_actions_1hmja_14", ma = {
  panel: Zy,
  line: eN,
  actions: aN
};
function DS(e) {
  return /* @__PURE__ */ o("div", { className: ma.panel, children: [
    /* @__PURE__ */ n("p", { className: ma.line, children: e.status }),
    /* @__PURE__ */ n(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ma.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ma.line, children: e.note ?? "" })
  ] });
}
const nN = "_upload_13fcl_2", tN = "_preview_13fcl_7", rN = "_mark_13fcl_17", lN = "_empty_13fcl_22", oN = "_actions_13fcl_28", iN = "_input_13fcl_33", sN = "_reasons_13fcl_41", cN = "_reason_13fcl_41", dN = "_accepted_13fcl_57", te = {
  upload: nN,
  preview: tN,
  mark: rN,
  empty: lN,
  actions: oN,
  input: iN,
  reasons: sN,
  reason: cN,
  accepted: dN
}, zt = 1.5, Wt = 22, Ca = "script elements or event handlers", xe = "links or external references", $e = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${zt}px at ${Wt}px`], uN = [$e[1], $e[2], Ca, xe], mN = /* @__PURE__ */ new Map([
  ["image", $e[1]],
  ["text", $e[2]],
  ["tspan", $e[2]],
  ["textPath", $e[2]],
  ["script", Ca],
  ["foreignObject", Ca],
  ["a", xe],
  ["use", xe],
  ["style", xe],
  ["feImage", xe],
  ["set", xe]
]), hN = "http://www.w3.org/2000/svg", wN = "http://www.w3.org/2000/xmlns/", _N = /* @__PURE__ */ new Set([
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
]), fN = /* @__PURE__ */ new Set([
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
]), dn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, vN = /url\s*\(|['"\\]/i;
function bN() {
  return { ok: !1, reasons: [$e[1]] };
}
function Kt(e) {
  return e.namespaceURI === hN;
}
function gN(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && Kt(a) ? a : null;
  } catch {
    return null;
  }
}
function pN(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [$e[0]] : [];
}
function yN(e) {
  return mN.get(e.localName) ?? (e.localName.startsWith("animate") ? xe : void 0);
}
function NN(e) {
  return vN.test(e.replace(dn, ""));
}
function kN(e) {
  return /^on/i.test(e.localName) ? Ca : e.localName === "href" || NN(e.value) ? xe : void 0;
}
function $N(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(yN(t));
    for (const r of Array.from(t.attributes)) a.add(kN(r));
  }
  return uN.filter((t) => a.has(t));
}
function CN(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? Wt / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < zt;
  }) ? [$e[3]] : [];
}
function SN(e) {
  if (e.namespaceURI === wN) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (fN.has(a) || a.startsWith("stroke"));
}
function RN(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && Kt(a) && _N.has(a.localName);
}
function TN(e, a) {
  RN(a) ? a.nodeType === Node.ELEMENT_NODE && Gt(a) : e.removeChild(a);
}
function Gt(e) {
  for (const a of Array.from(e.attributes)) SN(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) TN(e, a);
  return e;
}
function xN(e) {
  return Array.from(e.matchAll(dn), (a) => a[2]).filter((a) => a !== "");
}
function LN(e) {
  let a = 2166136261;
  for (let t = 0; t < e.length; t += 1) a = Math.imul(a ^ e.charCodeAt(t), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function AN(e, a) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of xN(l.value)) t.has(i) || t.set(i, `${a}-${t.size}`);
  return t;
}
function EN(e, a) {
  for (const t of Array.from(e.attributes))
    t.value = t.value.replace(dn, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function IN(e, a) {
  const t = [e, ...Array.from(e.querySelectorAll("*"))], r = AN(t, a);
  for (const l of t) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), EN(l, r);
  }
  return e;
}
function HS(e) {
  const a = gN(e);
  if (a === null) return bN();
  const t = [...pN(a), ...$N(a), ...CN(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(IN(Gt(a), LN(e))) };
}
const MN = "Mark accepted.", BN = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, jN = new Set(Vn.flatMap((e) => [ve(e, "id"), ve(e, "chip")]));
function PN(e) {
  return e !== void 0 && (BN.test(e) || jN.has(e)) ? e : void 0;
}
function qN({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: te.preview, style: { "--mark": PN(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ n("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: te.empty }) });
}
function DN(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function HN(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function ON({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("p", { className: te.accepted, children: MN }) }) : /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: te.reason, children: a }, a)) }) });
}
function FN({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(ON, { result: e }) : /* @__PURE__ */ n("p", { className: `${te.result} ${DN(e, t)}`, role: "status", children: HN(e, t) });
}
function Dn(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function OS({ current: e, onUpload: a, onUseInitials: t, presentation: r, disabledReason: l }) {
  const i = w(null), [s, c] = b(null), u = (d) => {
    if (d === void 0) return;
    const m = a(d);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ n(qN, { current: e }),
    /* @__PURE__ */ o("div", { className: te.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: i,
          className: te.input,
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
      /* @__PURE__ */ n(f, { ...Dn(l), onClick: () => {
        var d;
        return (d = i.current) == null ? void 0 : d.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(f, { ...Dn(l), variant: "ghost", onClick: t, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(FN, { result: s, presentation: r })
  ] });
}
const zN = "_row_o3t6y_7", WN = "_cell_o3t6y_11", KN = "_head_o3t6y_28", GN = "_name_o3t6y_34", UN = "_pinned_o3t6y_42", VN = "_headCell_o3t6y_49", YN = "_webName_o3t6y_88", XN = "_webMeta_o3t6y_95", JN = "_webWarn_o3t6y_103", j = {
  row: zN,
  cell: WN,
  head: KN,
  name: GN,
  pinned: UN,
  headCell: VN,
  webName: YN,
  webMeta: XN,
  webWarn: JN
}, un = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Ut = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], QN = Object.fromEntries(Ut.map((e) => [e.key, e]));
function ZN(e, a) {
  return `mcp.${e}.${a}`;
}
function e1(e) {
  return Object.keys(un).includes(e);
}
function a1(e) {
  return un[e !== void 0 && e1(e) ? e : "unknown"];
}
function aa({ column: e, children: a }) {
  const t = QN[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: j.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function FS() {
  return /* @__PURE__ */ n("tr", { children: Ut.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: j.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function n1({ server: e }) {
  const a = un[e.connection];
  return /* @__PURE__ */ o("tr", { className: j.row, children: [
    /* @__PURE__ */ o(aa, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: j.head, children: [
        /* @__PURE__ */ n("span", { className: j.name, children: e.name }),
        /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: cn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: j.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(aa, { column: "connection", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(aa, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(aa, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(aa, { column: "tools", children: e.tools.map((t) => ZN(e.name, t)).join(" · ") })
  ] });
}
function t1(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function r1(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function l1({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${j.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${j.webMeta} ward-cellmeta`, children: e });
}
function o1({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${j.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function i1({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(f, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function s1({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: j.row, children: [
    /* @__PURE__ */ o("td", { className: j.cell, children: [
      /* @__PURE__ */ n("span", { className: `${j.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${j.webMeta} ward-cellmeta`, children: t1(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n("span", { className: `${j.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n(h, { ...r1(e) }) }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n(l1, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n(h, { ...a1(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: j.cell, children: [
      /* @__PURE__ */ n(o1, { server: e, onRestart: a }),
      /* @__PURE__ */ n(i1, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function zS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(s1, { ...e }) : /* @__PURE__ */ n(n1, { ...e });
}
const c1 = "_row_1ibo7_2", d1 = "_headCell_1ibo7_14", u1 = "_cell_1ibo7_15", m1 = "_name_1ibo7_26", h1 = "_consequence_1ibo7_32", w1 = "_reason_1ibo7_38", _1 = "_value_1ibo7_44", f1 = "_webRow_1ibo7_60", v1 = "_webSetting_1ibo7_73", b1 = "_webName_1ibo7_81", g1 = "_webConsequence_1ibo7_89", p1 = "_webControl_1ibo7_95", y1 = "_webState_1ibo7_109", N1 = "_webChip_1ibo7_114", I = {
  row: c1,
  headCell: d1,
  cell: u1,
  name: m1,
  consequence: h1,
  reason: w1,
  value: _1,
  webRow: f1,
  webSetting: v1,
  webName: b1,
  webConsequence: g1,
  webControl: p1,
  webState: y1,
  webChip: N1
}, Vt = 104, Yt = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function k1({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(We, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(dt, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: I.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function $1({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = Yt[t], s = t === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: I.cell, children: /* @__PURE__ */ n(k1, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: I.cell, style: { width: Vt }, children: /* @__PURE__ */ n(h, { role: i.role, label: i.label }) })
  ] });
}
function Xt(e, a) {
  return String(e ?? a);
}
function C1(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function S1(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Xt(e.value, "—");
}
function R1({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ n(We, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: I.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function T1(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(R1, { ...e });
  const l = C1(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(dt, { options: l, value: Xt(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: S1(a) });
}
function x1({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ n(T1, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${I.webChip} ward-policy-chip`, style: { width: Vt }, children: /* @__PURE__ */ n(h, { ...Yt[t], size: "tag" }) })
  ] });
}
function WS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(x1, { ...e }) : /* @__PURE__ */ n($1, { ...e });
}
const L1 = "_label_vm9hq_7", A1 = "_name_vm9hq_15", E1 = "_column_vm9hq_24", I1 = "_webFrame_vm9hq_57", M1 = "_webHead_vm9hq_62", B1 = "_webHeadLabel_vm9hq_74", j1 = "_webLabel_vm9hq_112", P1 = "_webColumns_vm9hq_119", q1 = "_webGroup_vm9hq_125", D1 = "_webPeople_vm9hq_126", H1 = "_webVia_vm9hq_127", O1 = "_webMeta_vm9hq_156", z = {
  label: L1,
  name: A1,
  column: E1,
  webFrame: I1,
  webHead: M1,
  webHeadLabel: B1,
  webLabel: j1,
  webColumns: P1,
  webGroup: q1,
  webPeople: D1,
  webVia: H1,
  webMeta: O1
}, F1 = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, Ha = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Oa({ column: e, children: a }) {
  return /* @__PURE__ */ n(
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
function z1(e) {
  if (!e.matrixRole) return;
  const a = F1[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function W1({ node: e }) {
  const a = z1(e);
  return /* @__PURE__ */ o("span", { className: z.label, children: [
    /* @__PURE__ */ n("span", { className: z.name, children: e.name }),
    /* @__PURE__ */ n(K1, { role: a, node: e }),
    /* @__PURE__ */ n(Oa, { column: Ha[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Oa, { column: Ha[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Oa, { column: Ha[2], children: e.requestedVia ?? "" })
  ] });
}
function K1({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ n(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ n(h, { role: "warn", label: "Unresolved" })
  ] });
}
function G1({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    _t,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(W1, { node: t }),
      children: s
    }
  );
}
function Fa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function U1({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Fa, { className: `${z.webMeta} ${z.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Fa, { className: `${z.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Fa, { className: `${z.webMeta} ${z.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function V1() {
  return /* @__PURE__ */ o("div", { className: z.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: z.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: z.webColumns, children: [
      /* @__PURE__ */ n("span", { className: z.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: z.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: z.webVia, children: "Requested via" })
    ] })
  ] });
}
function Y1({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function X1(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function J1({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: z.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(V1, {}),
    /* @__PURE__ */ n(Eu, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      _t,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(Y1, { row: t }),
        detail: /* @__PURE__ */ n(U1, { row: t }),
        expanded: X1(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function KS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(J1, { ...e }) : /* @__PURE__ */ n(G1, { ...e });
}
const Q1 = "_runbook_b9agc_2", Z1 = "_list_b9agc_7", ek = "_step_b9agc_15", ak = "_numeral_b9agc_21", nk = "_body_b9agc_28", tk = "_head_b9agc_34", rk = "_title_b9agc_40", lk = "_detail_b9agc_45", ok = "_actions_b9agc_50", ik = "_webList_b9agc_56", sk = "_webStep_b9agc_60", ck = "_webBody_b9agc_66", dk = "_webTitle_b9agc_74", uk = "_webDetail_b9agc_78", L = {
  runbook: Q1,
  list: Z1,
  step: ek,
  numeral: ak,
  body: nk,
  head: tk,
  title: rk,
  detail: lk,
  actions: ok,
  webList: ik,
  webStep: sk,
  webBody: ck,
  webTitle: dk,
  webDetail: uk
}, Jt = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Qt(e) {
  return String(e + 1).padStart(2, "0");
}
function mk({ step: e, index: a, connection: t }) {
  const r = Jt[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: L.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: L.numeral, children: Qt(a) }),
    /* @__PURE__ */ o("span", { className: L.body, children: [
      /* @__PURE__ */ o("span", { className: L.head, children: [
        /* @__PURE__ */ n("span", { className: L.title, children: e.title }),
        /* @__PURE__ */ n(h, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n(Se, { startedAt: e.startedAt, connection: t })
      ] }),
      /* @__PURE__ */ n("span", { className: L.detail, children: e.detail })
    ] })
  ] });
}
function hk({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ n("ol", { className: L.list, children: e.map((r, l) => /* @__PURE__ */ n(mk, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: L.actions, children: a })
  ] });
}
function wk({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${L.step} ${L.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${L.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Qt(a) }),
    /* @__PURE__ */ o("span", { className: `${L.body} ${L.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${L.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${L.title} ${L.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(h, { ...Jt[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Se, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${L.detail} ${L.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function _k({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${L.list} ${L.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(wk, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${L.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function GS(e) {
  return "presentation" in e ? /* @__PURE__ */ n(_k, { ...e }) : /* @__PURE__ */ n(hk, { ...e });
}
const fk = "_list_1gu6a_2", vk = "_check_1gu6a_10", bk = "_body_1gu6a_16", gk = "_text_1gu6a_23", pk = "_pending_1gu6a_32", yk = "_measured_1gu6a_37", Xe = {
  list: fk,
  check: vk,
  body: bk,
  text: gk,
  pending: pk,
  measured: yk
};
function Nk(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function kk({ check: e }) {
  const a = Nk(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Xe.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(nn, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: Xe.body, children: [
      /* @__PURE__ */ n("span", { className: Xe.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Xe.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: Xe.measured, children: e.measured })
  ] });
}
function US({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Xe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(kk, { check: a }, a.text)) });
}
const $k = "_root_a6xzy_2", Ck = "_list_a6xzy_10", Sk = "_line_a6xzy_21", Rk = "_at_a6xzy_48", Tk = "_text_a6xzy_52", xk = "_foot_a6xzy_56", Lk = "_idle_a6xzy_68", Ak = "_caret_a6xzy_76", Ek = "_jump_a6xzy_83", he = {
  root: $k,
  list: Ck,
  line: Sk,
  at: Rk,
  text: Tk,
  foot: xk,
  idle: Lk,
  caret: Ak,
  jump: Ek
}, Ik = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function mn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : Ik.format(new Date(e));
}
const Mk = { warn: "warning", ok: "ok" };
function Bk({ kind: e }) {
  const a = Mk[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function jk({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${mn(e)}` });
}
function Pk({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${mn(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: he.idle, children: i }),
    /* @__PURE__ */ n(jk, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const qk = 8;
function Dk(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > qk;
}
function Hk({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const Zt = Me(null);
function VS({ announce: e, onAnnounceChange: a, children: t }) {
  const [r, l] = b(!1), i = Wn(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ n(Zt.Provider, { value: i, children: t });
}
function Ok() {
  const e = Ie(Zt), [a, t] = b(!1);
  return e ? [e.announce, e.setAnnounce] : [a, t];
}
function YS({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = w(null), [i, s] = b(0), [c, u] = Ok(), [d, m] = b(!1), g = e.at(-1);
  S(() => {
    s(e.length);
  }, [e.length]), Xa(() => {
    const y = l.current;
    y && !d && (y.scrollTop = y.scrollHeight);
  }, [e.length, d]);
  const v = () => {
    var B;
    const y = l.current;
    if (!y) return;
    const E = y.querySelectorAll("[data-consline-text]");
    (B = E.item(E.length - 1)) == null || B.focus(), m(!1);
  };
  return /* @__PURE__ */ o("div", { className: he.root, children: [
    /* @__PURE__ */ n("ol", { className: he.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (y) => m(Dk(y.currentTarget)), children: e.map((y, E) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": E < i, children: [
      /* @__PURE__ */ n("span", { className: he.at, children: mn(y.at) }),
      /* @__PURE__ */ n(Bk, { kind: y.kind }),
      /* @__PURE__ */ n("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${E}`)) }),
    /* @__PURE__ */ o(Pk, { connection: a, idleSince: t, last: g, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => u(!c), children: "Read new events" }),
      /* @__PURE__ */ n(Hk, { shown: d, onJump: v })
    ] })
  ] });
}
const Fk = "_row_1k8wl_2", zk = "_head_1k8wl_14", Wk = "_author_1k8wl_20", Kk = "_eta_1k8wl_25", Gk = "_edited_1k8wl_26", Uk = "_body_1k8wl_32", Vk = "_reason_1k8wl_37", Yk = "_actions_1k8wl_42", pe = {
  row: Fk,
  head: zk,
  author: Wk,
  eta: Kk,
  edited: Gk,
  body: Uk,
  reason: Vk,
  actions: Yk
}, Xk = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function Jk(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function Qk({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function Zk({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: pe.reason, id: a, children: e })
  ] });
}
function e$(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function a$(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(Qk, { ...e }) : /* @__PURE__ */ n(Zk, { reason: e.unavailable, reasonId: e.unavailableId });
}
function XS(e) {
  const { comment: a } = e;
  e$(e);
  const t = N(), r = `${t}-unavailable`, l = Xk[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${pe.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: pe.head, children: [
      /* @__PURE__ */ n("span", { className: pe.author, children: a.author }),
      /* @__PURE__ */ n(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: pe.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: pe.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: pe.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: pe.reason, id: t, children: Jk(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: pe.actions, children: /* @__PURE__ */ n(a$, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const n$ = "_root_c46wj_2", t$ = "_attach_c46wj_11", r$ = "_actions_c46wj_17", l$ = "_reply_c46wj_23", o$ = "_replyRow_c46wj_28", i$ = "_sendsAs_c46wj_42", Ze = {
  root: n$,
  attach: t$,
  actions: r$,
  reply: l$,
  replyRow: o$,
  sendsAs: i$
};
function er({ value: e, onChange: a }) {
  const [t, r] = b("");
  return e === void 0 ? [t, r] : [e, a ?? (() => {
  })];
}
function s$(e) {
  const { placeholder: a, asUser: t, onPost: r } = e, [l, i] = er(e), s = N();
  return /* @__PURE__ */ o("div", { className: Ze.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ze.replyRow, children: [
      /* @__PURE__ */ n(M, { variant: "reply", labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ n(f, { variant: "ghost", describedBy: s, onClick: () => r(t, l), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Ze.sendsAs, children: `Sends as ${t}.` })
  ] });
}
function JS(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(s$, { ...e }) : /* @__PURE__ */ n(c$, { ...e });
}
function c$(e) {
  const { placeholder: a, asUser: t, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, u] = er(e);
  return /* @__PURE__ */ o("div", { className: Ze.root, children: [
    /* @__PURE__ */ n(M, { kind: "textarea", label: a, value: c, onChange: u }),
    r && /* @__PURE__ */ o("div", { className: Ze.attach, children: [
      /* @__PURE__ */ n(h, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ n(
      Jn,
      {
        label: `Requeue ${l.agent} after posting`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Ze.actions, children: [
      /* @__PURE__ */ n(f, { variant: "primary", onClick: () => i(t, c), children: `Post as ${t}` }),
      s && /* @__PURE__ */ n(f, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const d$ = "_list_1yhks_2", u$ = "_item_1yhks_6", m$ = "_body_1yhks_22", h$ = "_text_1yhks_28", w$ = "_evidence_1yhks_37", _$ = "_consequence_1yhks_49", f$ = "_note_1yhks_54", Fe = {
  list: d$,
  item: u$,
  body: m$,
  text: h$,
  evidence: w$,
  consequence: _$,
  note: f$
};
function v$({ criterion: e }) {
  return /* @__PURE__ */ n(Be, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Hn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function b$(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function g$({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Fe.body, children: [
    /* @__PURE__ */ n("span", { className: Fe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ n(Hn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Fe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ n(Hn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Fe.consequence, children: b$(e.why) })
    ] })
  ] });
}
function p$({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Fe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(v$, { criterion: e }),
    /* @__PURE__ */ n(g$, { criterion: e })
  ] });
}
function QS({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Fe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(p$, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Fe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const y$ = "_list_dwhoz_2", N$ = "_rung_dwhoz_6", k$ = "_name_dwhoz_18", $$ = "_actor_dwhoz_32", _a = {
  list: y$,
  rung: N$,
  name: k$,
  actor: $$
}, C$ = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function S$({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = C$[e.state];
  return /* @__PURE__ */ o("li", { className: _a.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: _a.name, children: e.name }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${_a.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function ZS({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${_a.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(S$, { rung: a }, a.name)) });
}
const R$ = "_sheet_pw37w_2", T$ = "_title_pw37w_9", x$ = "_stage_pw37w_15", L$ = "_effects_pw37w_20", A$ = "_effect_pw37w_20", E$ = "_numeral_pw37w_31", I$ = "_effectText_pw37w_38", M$ = "_refusals_pw37w_43", B$ = "_reasons_pw37w_52", j$ = "_reason_pw37w_52", P$ = "_actions_pw37w_62", ue = {
  sheet: R$,
  title: T$,
  stage: x$,
  effects: L$,
  effect: A$,
  numeral: E$,
  effectText: I$,
  refusals: M$,
  reasons: B$,
  reason: j$,
  actions: P$
};
function q$({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(f, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function e2({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = N(), u = `${c}-refusal`, [d, m] = b(""), g = t.length > 0;
  return /* @__PURE__ */ n(ea, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: ue.effects, children: a.map((v, y) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ n("span", { className: ue.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: ue.effectText, children: v })
    ] }, v)) }),
    /* @__PURE__ */ n(
      fd,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(M, { kind: "textarea", label: "Note for the agent", value: d, onChange: m }),
    g && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ n(h, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: ue.reasons, children: t.map((v, y) => /* @__PURE__ */ n("li", { className: ue.reason, id: y === 0 ? u : void 0, children: v.reason }, v.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ n(q$, { refused: g, reasonId: u, note: d, onRequeue: l }),
      /* @__PURE__ */ n(f, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const D$ = "_list_1rowi_2", H$ = "_path_1rowi_7", O$ = "_head_1rowi_21", F$ = "_label_1rowi_28", z$ = "_consequence_1rowi_35", W$ = "_ask_1rowi_36", Qe = {
  list: D$,
  path: H$,
  head: O$,
  label: F$,
  consequence: z$,
  ask: W$
}, Va = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function On(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Fn(e) {
  return e ? "primary" : "secondary";
}
function K$({ path: e, primary: a, onChoose: t }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ n(f, { variant: Fn(a), size: "sm", onClick: () => t(e.kind), children: Va[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(f, { variant: Fn(a), size: "sm", disabled: !0, describedBy: r, children: Va[e.kind] }),
    /* @__PURE__ */ n("span", { className: Qe.ask, id: r, children: e.askInstead })
  ] });
}
function G$({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Qe.path, "data-allowed": e.allowed, "data-role": On(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Qe.head, children: [
      /* @__PURE__ */ n("span", { className: Qe.label, children: e.title ?? Va[e.kind] }),
      /* @__PURE__ */ n(h, { role: On(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Qe.consequence, children: e.consequence }),
    /* @__PURE__ */ n(K$, { path: e, primary: a, onChoose: t })
  ] });
}
function a2({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Qe.list, children: e.map((t, r) => /* @__PURE__ */ n(G$, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const U$ = "_list_1m7i0_2", V$ = "_item_1m7i0_6", Y$ = "_node_1m7i0_18", X$ = "_body_1m7i0_24", J$ = "_head_1m7i0_30", Q$ = "_stage_1m7i0_36", Z$ = "_version_1m7i0_41", eC = "_sentence_1m7i0_49", aC = "_meta_1m7i0_54", Ne = {
  list: U$,
  item: V$,
  node: Y$,
  body: X$,
  head: J$,
  stage: Q$,
  version: Z$,
  sentence: eC,
  meta: aC
}, nC = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function tC({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ne.head, children: [
    /* @__PURE__ */ n("span", { className: Ne.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Ne.version, title: e.version, children: e.version }) : null
  ] });
}
function rC({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ne.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Ne.node} ward-history-node`, children: /* @__PURE__ */ n(Be, { size: 9, kind: nC[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ne.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(tC, { entry: e }),
      /* @__PURE__ */ n("span", { className: Ne.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ne.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function n2({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Ne.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(rC, { entry: a }, a.stage + String(t))) });
}
const lC = "_thread_1e70p_3", oC = "_turn_1e70p_8", iC = "_who_1e70p_27", sC = "_body_1e70p_32", fa = {
  thread: lC,
  turn: oC,
  who: iC,
  body: sC
}, ar = Me(!1);
function t2({ children: e, density: a }) {
  return /* @__PURE__ */ n(ar.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${fa.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function r2({ turn: e }) {
  if (!Ie(ar)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${fa.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${fa.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${fa.body} ward-chat-body`, children: e.body })
  ] });
}
const cC = "_list_yiolt_3", dC = "_row_yiolt_7", uC = "_label_yiolt_20", mC = "_n_yiolt_26", hC = "_cause_yiolt_33", ta = {
  list: cC,
  row: dC,
  label: uC,
  n: mC,
  cause: hC
};
function wC(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const _C = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function fC({ row: e, formatNumber: a }) {
  return wC(e), /* @__PURE__ */ o("li", { className: `${ta.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Be, { size: 8, ..._C[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: ta.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${ta.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(vC, { cause: e.cause })
  ] });
}
function vC({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${ta.cause} ward-healthrow-cause`, children: e }) : null;
}
function l2({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${ta.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(fC, { row: t, formatNumber: a }, t.label)) });
}
const bC = "_root_1jxwp_2", gC = {
  root: bC
};
function o2({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: gC.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ba, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(f, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const pC = "_row_dhbre_3", yC = "_key_dhbre_13", NC = "_stack_dhbre_24", kC = "_value_dhbre_32", $C = "_evidence_dhbre_39", CC = "_mark_dhbre_47", Ye = {
  row: pC,
  key: yC,
  stack: NC,
  value: kC,
  evidence: $C,
  mark: CC
};
function SC({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(nn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function i2({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ye.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Ye.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ye.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Ye.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Ye.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Ye.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(SC, { state: e.state }) })
  ] });
}
const RC = "_cell_gh2sd_2", TC = {
  cell: RC
}, xC = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function LC(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function AC(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function EC(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: LC(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function IC(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function s2({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  AC(e, t);
  const r = IC(e);
  return /* @__PURE__ */ n(
    Ld,
    {
      label: "Rejection routing",
      columns: xC,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: TC.cell, "data-norerun": l.noRerun ? !0 : void 0, children: EC(l, i) }),
      empty: a ?? /* @__PURE__ */ n(vm, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const MC = "_row_1f2re_2", BC = "_title_1f2re_12", jC = "_turns_1f2re_18", PC = "_waiting_1f2re_19", qC = "_resolved_1f2re_20", DC = "_activity_1f2re_21", HC = "_cost_1f2re_28", OC = "_link_1f2re_29", FC = "_tableLink_1f2re_47", zC = "_tableRecord_1f2re_48", WC = "_tableRow_1f2re_59", KC = "_tableTitle_1f2re_71", GC = "_tableResolved_1f2re_76", UC = "_tableMeta_1f2re_87", VC = "_tableCost_1f2re_94", YC = "_tableActivity_1f2re_95", XC = "_tableState_1f2re_105", D = {
  row: MC,
  title: BC,
  turns: jC,
  waiting: PC,
  resolved: qC,
  activity: DC,
  cost: HC,
  link: OC,
  tableLink: FC,
  tableRecord: zC,
  tableRow: WC,
  tableTitle: KC,
  tableResolved: GC,
  tableMeta: UC,
  tableCost: VC,
  tableActivity: YC,
  tableState: XC
}, nr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function JC(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function QC(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function ZC(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const e0 = { duplicate: "Closed · duplicate" };
function a0({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(Ee, { className: D.tableMeta, text: `waiting on ${e}` });
}
function n0({ value: e }) {
  return /* @__PURE__ */ n("td", { className: D.tableCost, children: e === void 0 ? null : re(e) });
}
function t0({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${D.tableRecord} ward-target`, href: O(e.href), children: `→ ${e.key}` });
}
function r0({ session: e, href: a }) {
  const t = nr[e.state];
  return /* @__PURE__ */ o("tr", { className: D.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: D.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${D.tableLink} ward-target`, href: O(a), children: /* @__PURE__ */ n(Ee, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: D.tableMeta, children: QC(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: D.tableResolved, children: [
      ZC(e.resolved),
      /* @__PURE__ */ n(a0, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(n0, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: D.tableActivity, children: JC(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: D.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(h, { role: t.role, label: e0[e.state] ?? t.label }),
      /* @__PURE__ */ n(t0, { link: e.link })
    ] }) })
  ] });
}
function l0({ session: e }) {
  const a = nr[e.state];
  return /* @__PURE__ */ o("div", { className: D.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(Ee, { className: D.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: D.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(Ee, { className: D.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: D.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: D.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : re(e.cost) }),
    /* @__PURE__ */ n("span", { className: D.activity, children: de(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: D.link, href: O(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function c2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(r0, { session: e.session, href: e.href }) : /* @__PURE__ */ n(l0, { session: e.session });
}
const o0 = "_block_1yy2v_3", i0 = "_list_1yy2v_9", s0 = "_line_1yy2v_14", Ya = {
  block: o0,
  list: i0,
  line: s0
}, c0 = { warn: "warning", ok: "ok" };
function d0({ kind: e }) {
  const a = c0[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function u0({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Ya.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(d0, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function d2({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Ya.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Ya.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(u0, { line: t }, `${r}-${t.text}`)) }) });
}
const m0 = "_band_tt7hp_1", h0 = "_head_tt7hp_8", w0 = "_cell_tt7hp_19", _0 = "_index_tt7hp_35", f0 = "_title_tt7hp_42", v0 = "_note_tt7hp_48", b0 = "_cellTitle_tt7hp_53", g0 = "_cellBody_tt7hp_58", p0 = "_tag_tt7hp_64", ge = {
  band: m0,
  head: h0,
  cell: w0,
  index: _0,
  title: f0,
  note: v0,
  cellTitle: b0,
  cellBody: g0,
  tag: p0
}, zn = 4;
function u2({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== zn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${zn}-cell grid`);
  return /* @__PURE__ */ o("section", { className: ge.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: ge.head, children: [
      /* @__PURE__ */ n("span", { className: ge.index, children: e }),
      /* @__PURE__ */ n("span", { className: ge.title, children: a }),
      /* @__PURE__ */ n("span", { className: ge.note, children: t })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: ge.cell, children: [
      /* @__PURE__ */ n("span", { className: ge.cellTitle, children: l.title }),
      /* @__PURE__ */ n("span", { className: ge.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ n("span", { className: ge.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  A0 as ACCENT_PRESETS,
  J0 as ActionStack,
  YS as ActivityConsole,
  D0 as AdminIcon,
  E_ as AgentCard,
  H0 as AppShell,
  IS as AppearanceStrip,
  u2 as Band,
  V0 as BarChart,
  Qm as BoardColumn,
  mS as BoardFootnote,
  hS as BoardHeader,
  P0 as BoardIcon,
  rS as BoardScroller,
  f as Btn,
  L0 as CHIP_ROLES,
  Ot as CREDENTIAL_COLUMNS,
  U0 as Callout,
  MS as CapabilityRow,
  r2 as ChatMessage,
  Jn as Checkbox,
  h as Chip,
  Ee as ClampText,
  XS as ClarificationRow,
  kS as ClauseRuleRow,
  NS as ClauseRules,
  yt as ColourLadder,
  BS as ComponentRow,
  JS as Composer,
  _S as ConfigRow,
  wS as ConfigRowHead,
  tn as ConnectionMark,
  VS as ConsoleAnnounceProvider,
  t2 as Conversation,
  fd as CostMeter,
  PS as CredentialRow,
  jS as CredentialRowHead,
  QS as CriteriaList,
  ni as Crumb,
  E0 as DENSITIES,
  l2 as DeliveryHealth,
  iS as DeniedState,
  CS as DryRunRail,
  vm as EmptyState,
  qS as EnvCard,
  M as Field,
  oS as FilteredEmpty,
  nS as FormStack,
  Ba as GateChecklist,
  ZS as GateLadder,
  Ld as Grid,
  RS as HandoffRuleRow,
  SS as HandoffRules,
  j0 as HomeIcon,
  fS as ItemDrawer,
  DS as KeyPanel,
  Nr as LIVE_EVENT_TYPES,
  e_ as LegacyBoardColumn,
  bS as LegacyBoardHeader,
  gS as LegacyConfigRow,
  yS as LegacyItemDrawer,
  Uw as LegacyOverCapNote,
  pS as LegacyPreviewRail,
  bt as LegacyWorkCard,
  Se as LiveIndicator,
  sS as LoadFailed,
  uS as Loading,
  Ut as MCP_SERVER_COLUMNS,
  nn as Mark,
  OS as MarkUpload,
  Be as Marker,
  zS as McpServerRow,
  FS as McpServerRowHead,
  F0 as Menu,
  O0 as MenuButton,
  TS as NewStreamModal,
  pm as OverCapNote,
  ea as Overlay,
  $S as PARTIAL_STEP_REASON,
  Vt as POLICY_CHIP_WIDTH,
  Z0 as PageFrame,
  G0 as PageHeader,
  Y0 as PlainList,
  WS as PolicyRow,
  vS as PreviewRail,
  Ha as ROLE_MATRIX_COLUMNS,
  It as RULE_ACTIONS,
  mt as Radio,
  o2 as ReadyChecklist,
  aS as RecordSection,
  e2 as RequeueSheet,
  a2 as ResolveBlock,
  i2 as ResolvedFieldRow,
  KS as RoleMatrixRow,
  s2 as RoutingTable,
  xS as RuleRow,
  GS as RunbookSteps,
  yr as STREAM_STEPS,
  tS as SectionBand,
  Rn as SectionHeader,
  dt as SegmentedControl,
  rt as Select,
  c2 as SessionRow,
  K0 as Sidebar,
  LS as StageColumn,
  lS as StageGrid,
  n2 as StageHistory,
  wb as StageListEditor,
  cS as StaleStrip,
  Ea as StatStrip,
  AS as StreamRow,
  q0 as StudioIcon,
  eS as SubjectRail,
  We as Switch,
  W0 as TabLinks,
  X0 as TableHead,
  z0 as Tabs,
  S0 as ThemeProvider,
  ES as ToolRow,
  Q0 as TopBar,
  Eu as Tree,
  _t as TreeRow,
  d2 as TypedInputBlock,
  eo as UNSAFE_HREF,
  US as ValidationList,
  $0 as VisibilityProvider,
  C0 as Visible,
  x0 as WARD_VERSION,
  Ma as WorkCard,
  dS as WriteUnavailableStrip,
  JC as agoSince,
  dr as clock,
  Ab as colourStatus,
  ae as count,
  ce as duration,
  Ja as elapsed,
  T0 as eventSourceTransport,
  Ra as isStreamStep,
  Ta as isValidatedStreamStep,
  cf as ladderValidation,
  a1 as mcpConnectionChip,
  ZN as mcpToolName,
  re as money,
  we as ms,
  ft as ordered,
  Gn as ratio,
  yy as restartLabel,
  O as safeHref,
  de as stamp,
  Qa as stream,
  M0 as streamChip,
  Aa as streamChipProps,
  ve as streamColour,
  $r as streamHex,
  I0 as streamVars,
  ha as useBorderFlash,
  br as useFocusTrap,
  B0 as useLiveFeed,
  R0 as useReturnFocus,
  Sa as useRovingTabindex,
  Za as useTicker,
  ur as useVisible,
  W as v,
  HS as validateMark,
  sa as validatedStep,
  Vn as validatedStreamSteps
};
