import { jsx as n, Fragment as x, jsxs as i } from "react/jsx-runtime";
import { useMemo as la, useContext as ye, createContext as Ne, useState as p, useEffect as S, useCallback as te, useRef as _, useLayoutEffect as tt, useId as k, Fragment as ia, isValidElement as jr, Children as qr } from "react";
import { createPortal as Or, flushSync as sa } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const kn = (e) => String(e).padStart(2, "0");
function rn(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${kn(t % 60)}s` : `${Math.floor(a / 60)}h ${kn(a % 60)}m`;
}
const Dr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const t = Dr.formatToParts(new Date(e)), a = (r) => {
    var o;
    return ((o = t.find((l) => l.type === r)) == null ? void 0 : o.value) ?? "";
  };
  return `${a("day")} ${a("month")} ${a("hour")}:${a("minute")}`;
}
function le(e) {
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
function ca(e, t) {
  return `${e} / ${t}`;
}
const Fr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Hr(e) {
  return Fr.format(new Date(e));
}
const da = Ne(/* @__PURE__ */ new Set());
function y2({ hidden: e, children: t }) {
  const a = la(() => new Set(e), [e]);
  return /* @__PURE__ */ n(da.Provider, { value: a, children: t });
}
function Wr(e) {
  return !ye(da).has(e);
}
function N2({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: Wr(e) ? t : a });
}
const zr = "(prefers-color-scheme: dark)";
function $n() {
  return typeof window.matchMedia == "function" ? window.matchMedia(zr) : null;
}
function Kr(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = $n()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? $n() : null;
    if (!r) return;
    const o = () => a(r.matches);
    return o(), r.addEventListener("change", o), () => r.removeEventListener("change", o);
  }, [e]), t;
}
function Ht(e, t) {
  S(() => {
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function Gr(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function k2({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const o = Kr(e === "system");
  return Ht("data-theme", Gr(e, o)), Ht("data-accent", t), Ht("data-density", a), /* @__PURE__ */ n(x, { children: r });
}
const Ur = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Vr(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function Yr(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function Jr(e, t, a, r) {
  return e.shiftKey ? Vr(t, a) ? r : void 0 : document.activeElement === r || Yr(t) ? a : void 0;
}
function Qr(e, t, a) {
  const r = a[0], o = a[a.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const l = Jr(e, t, r, o);
  l && (e.preventDefault(), l.focus());
}
function Xr(e) {
  return { onKeyDown: te(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Ur));
      Qr(a, e.current, r);
    },
    [e]
  ) };
}
function $2(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var o, l;
      (l = (o = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : o.focus) == null || l.call(o);
    };
  }, [t, e]);
}
const Cn = { ArrowUp: -1, ArrowDown: 1 }, Sn = { ArrowLeft: -1, ArrowRight: 1 }, Zr = (e, t, a) => Math.min(a, Math.max(t, e));
function eo(e, t) {
  if (t !== "horizontal" && e in Cn) return Cn[e];
  if (t !== "vertical" && e in Sn) return Sn[e];
}
function Mt({ orientation: e = "both" } = {}) {
  const [t, a] = p(0), r = _(/* @__PURE__ */ new Map()), o = _(!1);
  tt(() => {
    var f;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(t)) return;
    const h = u[0], w = o.current;
    o.current = !1, a(h), w && ((f = r.current.get(h)) == null || f.focus());
  });
  const l = te((u) => a(u), []), s = te((u) => {
    var h;
    a(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = te(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(t)), f = eo(u.key, e);
      f !== void 0 ? (u.preventDefault(), s(h[Zr(w + f, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [t, s, e]
  ), d = te(
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
const C2 = (e, t, a) => {
  const r = new EventSource(e), o = (l) => a.onEvent(l.data, l.lastEventId, l.type);
  r.onmessage = o;
  for (const l of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(l, o);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, S2 = "0.2.0", R2 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], to = [1, 2, 3, 4, 5, 6], ua = [1, 2, 3], no = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], T2 = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], x2 = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], B = {
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
    menuIcon: "var(--ward-width-menuIcon)"
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
}, be = {
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
function on(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Bt(e) {
  return to.includes(e);
}
function ht(e) {
  return ua.includes(e);
}
function ao(e) {
  if (!Bt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function L2(e) {
  if (!Bt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const ro = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function oo(e) {
  if (!Bt(e)) throw new Error("unvalidated stream step");
  return ro[e];
}
function Rn(e) {
  return typeof e != "string" ? null : no.includes(e) ? e : null;
}
function lo(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function io(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function so(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function co(e, t, a) {
  const r = lo(e);
  if (r === null) return null;
  const o = Rn(a) ?? Rn(r.type);
  return o === null ? null : { ...r, type: o, id: io(r, t), at: so(r) };
}
function uo(e, t) {
  return e >= be.staleAfter ? "stale" : e >= be.heartbeat && t === "live" ? "reconnecting" : null;
}
function ho(e, t, a) {
  return e >= be.heartbeat && !t && a !== null;
}
function A2(e, t) {
  const [a, r] = p("reconnecting"), [o, l] = p(null), s = _(/* @__PURE__ */ new Map()), c = _(0), d = _(""), u = _(0), h = _(null), w = _(0), f = _(0), y = _(!1), N = _("reconnecting"), A = te((T) => {
    N.current = T, r(T);
  }, []), q = te(() => {
    c.current = Date.now();
  }, []), me = te((T) => {
    for (const [J, ke] of s.current)
      (ke === "*" || T.itemKey === ke) && J(T);
  }, []), re = te(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (T, J, ke) => {
        const We = co(T, J, ke);
        We !== null && (We.id && (d.current = We.id), q(), y.current = !1, A("live"), l(We.at), me(We));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, q(), A("live");
      },
      onError: () => {
        var J;
        (J = h.current) == null || J.close(), h.current = null, y.current = !0, N.current !== "stale" && A("reconnecting");
        const T = Math.min(be.reconnectBase * 2 ** u.current, be.reconnectMax);
        u.current += 1, w.current = window.setTimeout(re, T);
      }
    });
  }, [me, A, q, t, e]), Ee = te((T) => {
    y.current = !0, T.close(), h.current = null, w.current = window.setTimeout(re, be.reconnectBase);
  }, [re]), Ye = te((T, J) => (s.current.set(J, T), () => {
    s.current.delete(J);
  }), []);
  return S(() => (re(), f.current = window.setInterval(() => {
    const T = Date.now() - c.current, J = uo(T, N.current);
    J && A(J);
    const ke = h.current;
    ho(T, y.current, ke) && Ee(ke);
  }, be.tick), () => {
    var T;
    window.clearInterval(f.current), window.clearTimeout(w.current), y.current = !1, (T = h.current) == null || T.close(), h.current = null;
  }), [re, Ee, A]), { connection: a, lastEventAt: o, subscribe: Ye };
}
function ln(e, t) {
  const a = new Date(e).getTime(), [r, o] = p(() => Date.now());
  return S(() => {
    if (!t) return;
    const l = () => {
      document.visibilityState !== "hidden" && !document.hidden && o(Date.now());
    };
    l();
    const s = window.setInterval(l, be.tick);
    return document.addEventListener("visibilitychange", l), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", l);
    };
  }, [t, a]), Math.max(0, r - a);
}
const mo = { blue: "running", orange: "waiting", green: "done" };
function wo() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Tn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function gt(e, t) {
  const a = _(0), r = te((o) => {
    const l = o ?? t, s = e.current;
    s !== null && l !== void 0 && (wo() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${mo[l]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => Tn(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => Tn(s), be.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (o) => r(o) : () => r(t);
}
const fo = "_root_1otpc_2", _o = {
  root: fo
};
function vo(e, t, a, r, o) {
  const l = [rn(t)];
  return e || l.push(`as of ${Hr(a)}`), r && l.push(`turn ${r[0]}/${r[1]}`), o && l.push(o.label), l;
}
function Le({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const o = a !== "stale", l = ln(e, o), s = (t == null ? void 0 : t.at) ?? e, c = vo(o, l, s, r, t);
  return /* @__PURE__ */ i("span", { className: `${_o.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const bo = "_app_1bnco_1", po = "_side_1bnco_35", go = "_sideTop_1bnco_46", yo = "_sideBody_1bnco_60", No = "_iconRail_1bnco_99", ko = "_railItem_1bnco_108", $o = "_railIcon_1bnco_129", Co = "_railDot_1bnco_134", So = "_railLetter_1bnco_140", Ro = "_main_1bnco_146", To = "_rail_1bnco_108", xo = "_page_1bnco_168", Lo = "_headerRow_1bnco_191", Ao = "_sidebarToggle_1bnco_198", Eo = "_headerSlot_1bnco_203", Io = "_headerAction_1bnco_208", Mo = "_drawerSide_1bnco_213", Bo = "_root_1bnco_260", Po = "_topbar_1bnco_267", jo = "_mark_1bnco_278", qo = "_brand_1bnco_285", Oo = "_tagline_1bnco_291", Do = "_identity_1bnco_297", Fo = "_tools_1bnco_298", Ho = "_nav_1bnco_308", Wo = "_metadata_1bnco_315", zo = "_actor_1bnco_330", Ko = "_detail_1bnco_331", Go = "_content_1bnco_376", Uo = "_toolsPanel_1bnco_392", Vo = "_skip_1bnco_418", C = {
  app: bo,
  side: po,
  sideTop: go,
  sideBody: yo,
  iconRail: No,
  railItem: ko,
  railIcon: $o,
  railDot: Co,
  railLetter: So,
  main: Ro,
  rail: To,
  page: xo,
  headerRow: Lo,
  sidebarToggle: Ao,
  headerSlot: Eo,
  headerAction: Io,
  drawerSide: Mo,
  root: Bo,
  topbar: Po,
  mark: jo,
  brand: qo,
  tagline: Oo,
  identity: Do,
  tools: Fo,
  nav: Ho,
  metadata: Wo,
  actor: zo,
  detail: Ko,
  content: Go,
  toolsPanel: Uo,
  skip: Vo
};
function at(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const Yo = "_scope_1an6i_2", Jo = {
  scope: Yo
}, ha = Ne(null);
function E2({ reason: e, actions: t = "disable", children: a }) {
  const r = k();
  return /* @__PURE__ */ i("fieldset", { disabled: !0, className: `${Jo.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(ha.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Ae() {
  return ye(ha);
}
function Pt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : at(e, t.reasonId);
}
const Qo = "_btn_hrmlj_2", Xo = "_primary_hrmlj_14", Zo = "_destructive_hrmlj_25", el = "_secondary_hrmlj_35", tl = "_ghost_hrmlj_40", nl = "_overflow_hrmlj_49", al = "_sm_hrmlj_56", rl = "_disabled_hrmlj_60", ol = "_withReason_hrmlj_68", ll = "_reason_hrmlj_74", et = {
  btn: Qo,
  primary: Xo,
  destructive: Zo,
  secondary: el,
  ghost: tl,
  overflow: nl,
  sm: al,
  disabled: rl,
  withReason: ol,
  reason: ll
};
function il(e, t, a, r) {
  const o = t === "sm" ? [et.sm, "ward-btn--sm"] : [], l = a ? [et.disabled] : [];
  return [et.btn, et[e], "ward-btn", `ward-btn--${e}`, ...o, ...l, r ?? ""].filter(Boolean).join(" ");
}
function sl(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function cl(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function dl(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function ul(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function hl(e, t, a) {
  return ul(e.describedBy, t && a);
}
function ml({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${et.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function wl(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Ae()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(fl, { ...e });
}
function fl(e) {
  const t = Ae();
  cl(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", o = !!(e.disabled || t), l = dl(e, t), s = k(), c = _l(l, t);
  return /* @__PURE__ */ i(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: il(a, r, o, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: o,
        title: l,
        "aria-describedby": hl(e, l, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...sl(a, e.controls),
        children: wl(e)
      }
    ),
    /* @__PURE__ */ n(ml, { id: s, reason: l, shown: c === ma })
  ] });
}
function _l(e, t) {
  return e && !t ? ma : ia;
}
function ma({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${et.withReason} ward-btn-withReason`, children: e });
}
let sn = "none";
function vl(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (sn = "key");
}
typeof document < "u" && (document.addEventListener("keydown", vl, !0), document.addEventListener("pointerdown", () => {
  sn = "pointer";
}, !0));
function bl() {
  return sn === "key";
}
function dt(e) {
  const [t, a] = p(() => {
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
const pl = "_scrim_1cawq_2", gl = "_drawer_1cawq_10", yl = "_sheet_1cawq_14", Nl = "_modal_1cawq_18", kl = "_panel_1cawq_23", $l = "_start_1cawq_44", Cl = "_header_1cawq_67", Sl = "_title_1cawq_75", Rl = "_body_1cawq_79", Tl = "_close_1cawq_106", Te = {
  scrim: pl,
  drawer: gl,
  sheet: yl,
  modal: Nl,
  panel: kl,
  start: $l,
  header: Cl,
  title: Sl,
  body: Rl,
  close: Tl
}, xl = Ne(null), Ct = [], St = /* @__PURE__ */ new Map();
function Ll(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Al(e, t) {
  let a = St.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, St.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function El(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !Ll(r) && Al(e, r);
}
function Il(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (El(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function Ml(e) {
  for (const t of e.claims) {
    const a = St.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), St.delete(t)));
  }
}
function Bl(e, t) {
  const a = { root: e, claims: [] };
  return Ct.push(a), Il(a, t), a;
}
function Pl(e) {
  const t = Ct.indexOf(e);
  t >= 0 && Ct.splice(t, 1), Ml(e);
}
function xn(e) {
  return e !== null && Ct.at(-1) === e;
}
function jl(e, t, a) {
  const r = _(null), o = _(a);
  return o.current = a, S(() => {
    const l = e.current;
    if (!l) return;
    const s = document.activeElement, c = Bl(l, t);
    return r.current = c, () => {
      var u, h;
      const d = xn(c);
      Pl(c), r.current = null, d && ((h = (u = o.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), te(() => xn(r.current), []);
}
function ql(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function Ol(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Dl({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("header", { className: `${Te.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Te.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Fl(e) {
  return `${Te.scrim} ${Te[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Hl(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Te.panel} ${Te[e]} ward-overlay-panel${a}${r}`;
}
function Wl(e) {
  const t = ye(xl);
  return e ?? t ?? document.body;
}
function rt(e) {
  const t = _(null), a = _(null), r = k(), o = Wl(e.container), l = dt("(min-width: 768px)"), s = ql(e.kind, l), c = Ol(e, r), d = Xr(a), [u] = p(bl), h = jl(t, o, e.returnFocusTo), w = te(() => {
    h() && e.onClose();
  }, [e.onClose, h]);
  return S(() => {
    var f;
    h() && ((f = a.current) == null || f.focus());
  }, [h]), S(() => {
    const f = (y) => {
      y.key === "Escape" && w();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [w]), Or(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: Fl(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: w,
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
            className: Hl(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => h() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Te.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Dl, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const zl = /^([a-z][a-z0-9+.-]*):/i, Kl = /* @__PURE__ */ new Set(["http", "https"]), Gl = "#";
function Ul(e) {
  var r, o;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (o = (r = zl.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : o.toLowerCase();
}
function z(e) {
  const t = Ul(e);
  return t === void 0 || Kl.has(t) ? e : Gl;
}
function Vl(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function wa(e) {
  const t = Vl(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function Yl(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => wa(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const o = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const l of [a, ...a.children]) o == null || o.observe(l);
    return r(), () => {
      a.removeEventListener("scroll", r), o == null || o.disconnect();
    };
  }, [e, t]);
}
function Jl(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, o = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : o > e.clientWidth - a ? e.scrollLeft + o - e.clientWidth + a : null;
}
function Ql(e, t, a) {
  tt(() => {
    const r = e.current, o = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !o) return;
    const l = Jl(r, o);
    l !== null && (r.scrollLeft = Math.max(0, l)), wa(r);
  }, [e, t, a]);
}
const Xl = "_row_11g8i_2", Zl = {
  row: Xl
};
function ei(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function cn({ label: e, children: t, count: a, as: r = "div", focusable: o = !0, rowRef: l, className: s, ...c }) {
  const d = _(null), u = l ?? d;
  return Yl(u, a), /* @__PURE__ */ n(r, { ref: u, className: [Zl.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...ei(o, r), ...c, children: t });
}
const ti = "_icon_1ylqy_2", ni = {
  icon: ti
};
function mt({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: ni.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function I2() {
  return /* @__PURE__ */ n(mt, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function M2() {
  return /* @__PURE__ */ i(mt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function B2() {
  return /* @__PURE__ */ i(mt, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function P2() {
  return /* @__PURE__ */ n(mt, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function ai() {
  return /* @__PURE__ */ i(mt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const fa = "ward:sidebar-collapsed", ri = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function oi() {
  try {
    return window.localStorage.getItem(fa) === "true";
  } catch {
    return !1;
  }
}
function li(e) {
  try {
    window.localStorage.setItem(fa, String(e));
  } catch {
  }
}
function ii(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function si(e) {
  return e instanceof Element && e.closest(ri) !== null;
}
function ci(e) {
  return e.key === "[" && !ii(e) && !si(e.target);
}
function di(e) {
  const [t, a] = p(oi), r = () => {
    li(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const o = (l) => {
      var c;
      if (!ci(l)) return;
      const s = l.target instanceof Element ? l.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [e, t]), { collapsed: t, toggle: r };
}
function ui() {
  const e = dt("(max-width: 767.98px)"), t = dt("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function hi(e) {
  const t = e === "phone", a = k(), r = _(null), [o, l] = p(!1);
  return o && !t && l(!1), { narrow: t, open: o, drawerId: a, slotRef: r, toggle: () => l(!o), close: () => l(!1) };
}
function mi({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ i("div", { className: C.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: C.headerSlot, children: e }),
    pa(t) && /* @__PURE__ */ n("span", { className: C.headerAction, children: t })
  ] }) : e;
}
function wi(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function fi({ sidebar: e, label: t, drawer: a }) {
  var o;
  if (wi(a.open, a.close), !a.open) return null;
  const r = (l) => {
    l.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(rt, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (o = a.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ n("div", { className: C.drawerSide, onClick: r, children: _a(e, !1) }) });
}
function _i(e) {
  const [t, a] = p(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function vi(e, t) {
  const a = di(e === "wide" && !t), r = _i(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function bi(e, t) {
  const a = vi(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return gi(e.collapsed, t);
  const r = a.collapsed, o = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: o, drawsStrip: !o && typeof e.sidebar == "function", toggle: a.toggle };
}
const pi = (e) => e.collapsed && e.drawsStrip;
function gi(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const Ln = (e) => e ? "" : void 0;
function _a(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function va({ fold: e }) {
  return /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(ai, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function yi({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: C.sideTop, children: /* @__PURE__ */ n(va, { fold: e }) });
}
const ba = Ne(null);
function j2() {
  const e = ye(ba);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(va, { fold: e });
}
function Ni({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": on(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function ki({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: C.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ i("a", { className: C.railItem, href: z(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(Ni, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function $i({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: o }) {
  const l = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ i("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(yi, { fold: r, inSidebar: o && !l }),
    /* @__PURE__ */ n("div", { className: C.sideBody, hidden: l, children: _a(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(ki, { items: a ?? [], label: t })
  ] });
}
const pa = (e) => e != null;
function Ci(e) {
  const { sidebar: t, header: a, action: r, children: o, rail: l, iconRail: s, pageFill: c } = e, d = pa(l), u = ui(), h = hi(u), w = bi(e, u), f = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ i("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": Ln(pi(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(ba.Provider, { value: w, children: /* @__PURE__ */ n($i, { sidebar: t, label: f, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ i("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(mi, { header: a, action: r, label: f, drawer: h }),
      /* @__PURE__ */ n("div", { className: C.page, "data-fill": Ln(c === !0), children: o })
    ] }),
    d && /* @__PURE__ */ n("div", { className: C.rail, children: l }),
    /* @__PURE__ */ n(fi, { sidebar: t, label: f, drawer: h })
  ] });
}
function Si({ destinations: e, active: t }) {
  const a = _(null);
  return Ql(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(cn, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: z(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function Qt({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function Ri({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ i("span", { className: C.metadata, children: [
    /* @__PURE__ */ n(Qt, { value: e, className: C.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Qt, { value: t, className: C.detail })
  ] });
}
function Ti() {
  const e = dt("(max-width: 767.98px)"), t = k(), a = _(null), [r, o] = p(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function xi({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: C.tools, children: e });
}
function Li({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: C.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function Ai(e) {
  return /* @__PURE__ */ i("header", { className: C.topbar, children: [
    /* @__PURE__ */ n("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Qt, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ n(Si, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: C.identity, children: /* @__PURE__ */ n(Ri, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(xi, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Ei(e) {
  const t = k(), a = Ti();
  return /* @__PURE__ */ i("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: C.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Ai, { ...e, menu: a }),
    /* @__PURE__ */ n(Li, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: C.content, children: e.children })
  ] });
}
function Ii(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function q2(e) {
  return Ii(e) ? /* @__PURE__ */ n(Ci, { ...e }) : /* @__PURE__ */ n(Ei, { ...e });
}
const Mi = "_root_itg9o_2", Bi = "_row_itg9o_8", Pi = "_box_itg9o_14", ji = "_label_itg9o_21", qi = "_labelHidden_itg9o_26", Oi = "_lockedNote_itg9o_36", Di = "_consequence_itg9o_44", Fi = "_sample_itg9o_79", Be = {
  root: Mi,
  row: Bi,
  box: Pi,
  label: ji,
  labelHidden: qi,
  lockedNote: Oi,
  consequence: Di,
  sample: Fi
};
function Hi(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function Wi({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: t }) : null;
}
function zi({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Ki(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function Gi(e, t, a, r) {
  const o = e.consequence ? `${t}-note` : void 0, l = Ki(e, a, r), s = l ? `${t}-reason` : void 0, c = Pt(at(o, e.describedBy, s), r);
  return { noteId: o, reason: l, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? l } };
}
function Ui({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Vi({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function ga(e) {
  const t = k(), a = Ae(), r = Hi(e, a), o = Gi(e, t, r.disabled, a);
  return /* @__PURE__ */ i("div", { className: `${Be.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ i("span", { className: Be.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: t,
          type: "checkbox",
          className: `${Be.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (l) => {
            var s;
            return !r.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, l.target.checked));
          },
          ...o.input
        }
      ),
      /* @__PURE__ */ i("label", { htmlFor: t, className: e.labelHidden ? Be.labelHidden : Be.label, children: [
        e.label,
        /* @__PURE__ */ n(zi, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Vi, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Ui, { id: o.reasonId, reason: o.reason }),
    /* @__PURE__ */ n(Wi, { id: o.noteId, text: e.consequence })
  ] });
}
const Yi = "_chip_pq6tb_2", Ji = {
  chip: Yi
}, Qi = {
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
function Xi(e, t) {
  if (e === "stream") return Zi(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = Qi[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function Zi(e) {
  if (!e || !ht(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = on(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Ji.chip} ward-chip ward-chip--${e}`, style: Xi(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const es = "_clamp_zn74g_3", An = {
  clamp: es
};
function nt({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? An.clamp : `${An.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const ts = "_root_1btz3_2", ns = "_body_1btz3_10", as = "_toggle_1btz3_24", Wt = {
  root: ts,
  body: ns,
  toggle: as
};
function O2({ children: e, lines: t = 3, label: a }) {
  const [r, o] = p(!1), l = k();
  return /* @__PURE__ */ i("div", { className: Wt.root, children: [
    /* @__PURE__ */ n("div", { id: l, className: Wt.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: Wt.toggle, "aria-expanded": r, "aria-controls": l, onClick: () => o(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const rs = "_root_1a4s8_2", os = "_words_1a4s8_16", ls = "_title_1a4s8_23", is = "_actions_1a4s8_27", ft = {
  root: rs,
  words: os,
  title: ls,
  actions: is
};
function D2({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ i("section", { className: ft.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ i("div", { className: ft.words, children: [
      /* @__PURE__ */ n("strong", { className: ft.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: ft.actions, children: a })
  ] });
}
const ss = "_root_8zmpu_2", cs = "_step_8zmpu_12", ds = "_dot_8zmpu_38", us = "_label_8zmpu_51", lt = {
  root: ss,
  step: cs,
  dot: ds,
  label: us
}, hs = { done: ", done", now: ", current", next: "" };
function ms({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ i("li", { className: lt.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${lt.dot} ward-running` : lt.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: lt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: hs[e.state] })
  ] });
}
function F2({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: lt.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(ms, { step: r, running: t }, r.label)) });
}
function wt(e) {
  return typeof e == "number" && ht(e) ? e : null;
}
function ge(e, t) {
  const a = wt(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function jt(e, t) {
  const a = wt(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const ws = "_root_13eei_3", fs = "_nav_13eei_8", _s = "_list_13eei_16", vs = "_item_13eei_24", bs = "_link_13eei_44", ps = "_sep_13eei_54", gs = "_current_13eei_58", ys = "_chips_13eei_62", Me = {
  root: ws,
  nav: fs,
  list: _s,
  item: vs,
  link: bs,
  sep: ps,
  current: gs,
  chips: ys
};
function Ns({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: Me.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${Me.link} ward-target`, href: z(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function ks({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: Me.root, children: /* @__PURE__ */ i("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ n("ol", { className: Me.list, children: e.map((r, o) => /* @__PURE__ */ i("li", { className: Me.item, children: [
      o > 0 ? /* @__PURE__ */ n("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(Ns, { step: r, isCurrent: a && o === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${Me.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function ya(e, t, a) {
  const r = _(a);
  r.current = a, S(() => {
    if (!e) return;
    const o = (l) => {
      var s;
      (s = t.current) != null && s.contains(l.target) || r.current();
    };
    return document.addEventListener("mousedown", o), () => document.removeEventListener("mousedown", o);
  }, [e, t]);
}
const $s = 500;
function Na(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function ka() {
  const e = _(""), t = _(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, $s), e.current);
}
const _t = 4;
function Cs(e, t, a) {
  const r = Math.max(0, a - e.bottom - _t * 2), o = Math.max(0, e.top - _t * 2);
  return t <= r || r >= o ? { top: e.bottom + _t, maxHeight: r } : { top: e.top - _t - Math.min(t, o), maxHeight: o };
}
function Ss(e, t, a, r) {
  const o = { start: e.left, end: e.right - t }, l = { start: o.start + t <= a, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = l[r] || !l[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, a - t));
}
function Rs(e, t, a, r) {
  return { ...Cs(e, t.height, a.height), left: Ss(e, t.width, a.width, r) };
}
function yt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Ts(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function xs(e, t, a) {
  const r = Ts(t, a);
  e.style.setProperty("--ward-anchor-width", yt(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const o = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: r, box: o, view: { width: l.clientWidth, height: l.clientHeight } };
}
function Ls(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, o) => r.scrollTop = a[o]);
}
function En(e, t, a, r) {
  const o = Ls(e), l = xs(e, t, r), s = Rs(l.edges, l.box, l.view, a);
  Object.assign(e.style, { left: yt(s.left - l.box.left), top: yt(s.top - l.box.top), maxHeight: yt(s.maxHeight) }), o();
}
function As(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function $a(e, t, a = "start", r) {
  tt(() => {
    const o = t.current, l = e.current;
    if (!o || !l) return;
    const s = As(o), c = () => En(o, l, a, r == null ? void 0 : r.current), d = (u) => {
      o.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), tt(() => {
    t.current && e.current && En(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const Es = "_root_1lgbn_2", Is = "_trigger_1lgbn_7", Ms = "_value_1lgbn_47", Bs = "_menu_1lgbn_65", Ps = "_find_1lgbn_87", js = "_list_1lgbn_103", qs = "_option_1lgbn_114", Os = "_check_1lgbn_133", Ds = "_empty_1lgbn_144", pe = {
  root: Es,
  trigger: Is,
  value: Ms,
  menu: Bs,
  find: Ps,
  list: js,
  option: qs,
  check: Os,
  empty: Ds
}, Fs = 7;
function Hs(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function In(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function Ws(e, t) {
  const [a, r] = p(e.defaultOpen === !0), [o, l] = p(""), [s, c] = p(() => In(e.options, e.value)), d = (u) => {
    var h;
    sa(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: o,
    active: s,
    entries: Hs(e.options, o),
    findable: e.options.length > Fs,
    show: () => {
      e.disabled || (l(""), c(In(e.options, e.value)), r(!0));
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
function zs(e, t) {
  const a = _(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function Ks(e) {
  const t = ka();
  return (a) => {
    const r = t(a), o = e.entries.findIndex((l) => l.option.label.toLowerCase().startsWith(r));
    o >= 0 && e.to(o);
  };
}
function Ca(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Gs(e) {
  return { ...Ca(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function Sa(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const o = t[r.key];
    if (!o) return a(r);
    r.preventDefault(), r.stopPropagation(), o();
  };
}
const Us = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Vs(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      Us.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function Ys({ entry: e, at: t, menu: a, ids: r, value: o }) {
  return /* @__PURE__ */ i(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === o,
      "data-active": t === a.active || void 0,
      className: pe.option,
      onMouseDown: (l) => l.preventDefault(),
      onMouseMove: () => a.to(t),
      onClick: () => a.pick(e),
      children: [
        /* @__PURE__ */ n("span", { className: pe.check, "aria-hidden": "true" }),
        /* @__PURE__ */ n("span", { className: pe.label, children: e.option.label })
      ]
    }
  );
}
function dn(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function Js({ menu: e, ids: t, focusRef: a }) {
  return /* @__PURE__ */ n(
    "input",
    {
      ref: a,
      className: pe.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": t.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": dn(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: Sa(e, Ca(e), () => {
      })
    }
  );
}
function Qs({ props: e, menu: t, ids: a, focusRef: r, trigger: o }) {
  const l = Ks(t), s = _(null);
  $a(o, s);
  const c = (d) => {
    Na(d) && l(d.key);
  };
  return /* @__PURE__ */ i("div", { ref: s, className: pe.menu, children: [
    t.findable && /* @__PURE__ */ n(Js, { menu: t, ids: a, focusRef: r }),
    /* @__PURE__ */ n(
      "ul",
      {
        ref: t.findable ? void 0 : r,
        id: a.list,
        role: "listbox",
        tabIndex: -1,
        className: pe.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": t.findable ? void 0 : dn(t, a),
        onKeyDown: Sa(t, Gs(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(Ys, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: pe.empty, children: "No match" })
  ] });
}
function Xs(e, t) {
  const a = e.open ? dn(e, t) : void 0;
  S(() => {
    var r, o;
    a && ((o = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [a]);
}
function Ra(...e) {
  return e.filter(Boolean).join(" ");
}
function Zs(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function ec({ props: e, menu: t, ids: a, trigger: r, wantFocus: o }) {
  var c;
  const l = !e.options.some((d) => d.value === e.value), s = (c = Ae()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: Ra(pe.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": t.open,
      "aria-controls": t.open ? a.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": at(e["aria-describedby"], a.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...Vs(t, o),
      children: /* @__PURE__ */ n("span", { id: a.value, className: pe.value, "data-placeholder": l || void 0, children: Zs(e) })
    }
  );
}
function Ta(e) {
  const t = Ae(), a = t ? { ...e, disabled: !0, "aria-describedby": Pt(e["aria-describedby"], t) } : e, r = k(), o = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, l = _(null), s = _(null), c = _(null), d = Ws(a, s), u = zs(d.open, c);
  return ya(d.open, l, () => d.close(!1)), Xs(d, o), /* @__PURE__ */ i("div", { ref: l, className: Ra(pe.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(ec, { props: a, menu: d, ids: o, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(Qs, { props: a, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const tc = "_field_1ensj_2", nc = "_label_1ensj_8", ac = "_labelHidden_1ensj_15", rc = "_control_1ensj_25", oc = "_mono_1ensj_45", lc = "_area_1ensj_50", ic = "_invalid_1ensj_57", De = {
  field: tc,
  label: nc,
  labelHidden: ac,
  control: rc,
  mono: oc,
  area: lc,
  invalid: ic
}, sc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, xa = (e) => `${e}-label`;
function cc({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? sc : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function dc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    Ta,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": xa(t.id),
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
function uc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
const hc = { input: cc, select: dc, textarea: uc };
function mc(e, t, a) {
  const r = hc[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function wc(e, t, a, r) {
  const o = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": o,
    "aria-describedby": Pt(at(o ? a : void 0, e.describedBy), r),
    onChange: (l) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, l.target.value);
    }
  };
}
function fc(e) {
  const t = e.mono ? [De.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [De.area] : [];
  return [De.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function _c(e) {
  return e ? `${De.label} ${De.labelHidden} ward-field-label` : `${De.label} ward-field-label`;
}
function j(e) {
  const t = k(), a = `${t}-msg`, r = wc(e, t, a, Ae()), o = fc(e);
  return /* @__PURE__ */ i("div", { className: `${De.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: xa(t), className: _c(e.labelHidden), htmlFor: t, children: e.label }),
    mc(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${De.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const vc = "_root_sjvm0_2", bc = "_trigger_sjvm0_9", pc = "_ghost_sjvm0_27", gc = "_panel_sjvm0_46", yc = "_edged_sjvm0_67", Nc = "_menu_sjvm0_73", kc = "_group_sjvm0_78", $c = "_heading_sjvm0_83", Cc = "_item_sjvm0_89", Sc = "_description_sjvm0_105", Rc = "_large_sjvm0_109", Tc = "_touch_sjvm0_113", xc = "_icon_sjvm0_117", Lc = "_label_sjvm0_125", Ac = "_text_sjvm0_130", Ec = "_trailing_sjvm0_138", Ic = "_check_sjvm0_144", Mc = "_separator_sjvm0_183", Bc = "_footer_sjvm0_189", Pc = "_find_sjvm0_196", jc = "_findGlyph_sjvm0_208", qc = "_findInput_sjvm0_214", Oc = "_empty_sjvm0_230", L = {
  root: vc,
  trigger: bc,
  ghost: pc,
  panel: gc,
  edged: yc,
  menu: Nc,
  group: kc,
  heading: $c,
  item: Cc,
  description: Sc,
  large: Rc,
  touch: Tc,
  icon: xc,
  label: Lc,
  text: Ac,
  trailing: Ec,
  check: Ic,
  separator: Mc,
  footer: Bc,
  find: Pc,
  findGlyph: jc,
  findInput: qc,
  empty: Oc
}, La = Ne(null);
function Dc(e, t) {
  const [a, r] = p({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (o) => r((l) => ({ open: !0, start: o, request: l.request + 1 })),
    close: (o) => {
      var l;
      sa(() => r((s) => ({ ...s, open: !1 }))), o && ((l = t.current) == null || l.focus());
    }
  };
}
const Fc = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Hc(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = Fc.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function un(...e) {
  return e.filter(Boolean).join(" ");
}
function Wc(e, t = {}, a = "field") {
  const { ref: r, className: o, ...l } = t;
  return { ...l, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: un(L.trigger, a === "ghost" ? L.ghost : void 0, o) };
}
function Aa(e) {
  const t = k(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = _(null), o = _(null), l = Dc(e.defaultOpen === !0, o);
  return ya(l.open, r, () => l.close(!1)), /* @__PURE__ */ i("div", { ref: r, className: un(L.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...Wc(o, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": l.open,
        "aria-controls": l.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Hc(l),
        children: e.label
      }
    ),
    l.open && /* @__PURE__ */ n(La.Provider, { value: { ...a, popup: l, button: o }, children: e.children })
  ] });
}
function zc(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function Kc(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const Gc = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function Uc(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function Vc(e, t) {
  return e === "separator" ? e : "items" in e ? Uc(e, t) : t(e) ? e : null;
}
function Yc(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function Jc(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (o) => o.label.toLowerCase().includes(a);
  return Yc(e.map((o) => Vc(o, r)).filter((o) => o !== null));
}
const Ea = (e, t) => (e % t + t) % t;
function je(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const o = Ea(t + a * r, e.length);
    if (!e[o].disabled) return o;
  }
  return -1;
}
const Qc = (e) => e.split("").every((t) => t === e[0]);
function Xc(e, t, a) {
  const r = Qc(a), o = r ? a[0] : a, l = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = Ea(l + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function Zc(e) {
  const t = _([]);
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
function ed(e, t) {
  const { items: a } = e, r = () => {
    var o;
    return (o = e.refs.current[e.current()]) == null ? void 0 : o.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(je(a, e.current(), 1))],
    ["ArrowUp", () => e.focus(je(a, e.current(), -1))],
    ["Home", () => e.focus(je(a, -1, 1))],
    ["End", () => e.focus(je(a, a.length, -1))],
    ["Escape", () => t.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function td(e, t, a) {
  const r = ka(), o = ed(e, t), l = (s) => {
    if (Na(s)) {
      if (!a) return e.focus(Xc(e.items, e.current(), r(s.key)));
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
function nd(e) {
  const t = _(!1);
  return {
    onKeyDown: (a) => {
      a.key === "Tab" && (t.current = !0);
    },
    onBlur: () => {
      t.current && e.close(!1);
    }
  };
}
function ad(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? je(e, -1, 1) : t;
}
function rd(e, t) {
  const { start: a, request: r } = t, o = _(e);
  o.current = e, S(() => {
    const { items: l, focus: s } = o.current;
    a && s(a === "first" ? ad(l) : je(l, l.length, -1));
  }, [a, r]);
}
function od({ row: e, nav: t, popup: a }) {
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
const ld = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function id(e, t) {
  return ld(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function sd(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: L.label, children: e.label });
  return e.description ? /* @__PURE__ */ i("span", { className: L.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: L.description, children: e.description })
  ] }) : a;
}
function cd() {
  return /* @__PURE__ */ n("svg", { className: L.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Mn(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: L.icon, "aria-hidden": "true", children: e.icon }) : null,
    sd(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: L.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(cd, {}) : null
  ] });
}
function Ia(e) {
  const { item: t, at: a } = e.row, r = k(), o = {
    ref: (l) => {
      e.nav.refs.current[a] = l;
    },
    role: "menuitem",
    tabIndex: -1,
    className: L.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...id(t, r),
    ...od(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: z(t.href), ...o, children: Mn(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...o, children: Mn(t, r) });
}
function dd({ heading: e, rows: t, nav: a, popup: r }) {
  const o = k();
  return /* @__PURE__ */ i("div", { role: "group", "aria-labelledby": o, className: L.group, children: [
    /* @__PURE__ */ n("div", { id: o, className: L.heading, children: e }),
    t.map((l) => /* @__PURE__ */ n(Ia, { row: l, nav: a, popup: r }, l.at))
  ] });
}
function ud({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: L.separator }) : e.kind === "group" ? /* @__PURE__ */ n(dd, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(Ia, { row: e.row, nav: t, popup: a });
}
function hd() {
  const e = ye(La);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function md() {
  return /* @__PURE__ */ i("svg", { className: L.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function wd(e, t) {
  const a = () => je(e.items, -1, 1);
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(a())],
    ["ArrowUp", () => e.focus(je(e.items, e.items.length, -1))],
    ["Enter", () => {
      var r;
      return (r = e.refs.current[a()]) == null ? void 0 : r.click();
    }],
    ["Escape", () => t.close(!0)]
  ]);
}
function fd({ find: e, query: t, setQuery: a, input: r, nav: o, popup: l, menuId: s }) {
  const c = wd(o, l), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ i("div", { className: L.find, children: [
    /* @__PURE__ */ n(md, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: L.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function _d(e, t) {
  const [a, r] = p(""), o = _(null), l = t !== void 0 && Gc(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = o.current) == null || d.focus();
  };
  return l ? { find: t, query: a, setQuery: r, input: o, toFind: s, entries: Jc(e, a) } : { query: a, setQuery: r, input: o, entries: e };
}
const vd = { regular: void 0, large: L.large, touch: L.touch }, bd = (e, t) => un(L.panel, e ? L.edged : void 0, vd[t]);
function pd({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: L.empty, children: e.empty ?? "No matches" });
}
function Ma({ entries: e, footer: t, align: a = "start", find: r, edges: o, size: l = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = hd(), h = _(null);
  $a(u, h, a, o);
  const w = _d(e, r), f = zc(w.entries), y = Zc(f.flatMap(Kc).map((q) => q.item)), N = td(y, s, w.toFind), A = nd(s);
  return rd(y, s), /* @__PURE__ */ i("div", { ref: h, className: bd(o, l), ...A, children: [
    w.find && /* @__PURE__ */ n(fd, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: y, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: L.menu, ...N, children: f.map((q, me) => /* @__PURE__ */ n(ud, { block: q, nav: y, popup: s }, me)) }),
    /* @__PURE__ */ n(pd, { find: w.find, count: y.items.length }),
    t && /* @__PURE__ */ n("p", { className: L.footer, children: t })
  ] });
}
function gd(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function Ba(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !gd(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const yd = (e, t) => e.reduce((a, r) => a + r + t, -t);
function Nd({ room: e, widths: t, more: a, gap: r }, o) {
  const l = t.map((d, u) => u);
  if (yd(t, r) <= e) return l;
  const s = /* @__PURE__ */ new Set([o]);
  let c = t[o] + r + a;
  for (const d of l)
    if (d !== o) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return l.filter((d) => s.has(d));
}
const zt = (e) => Number.parseFloat(e) || 0, Bn = (e) => e.getBoundingClientRect().width;
function kd(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - zt(a.paddingInlineStart) - zt(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), Bn),
    more: r ? Bn(r) : 0,
    gap: zt(a.columnGap)
  };
}
function $d(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const Cd = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function Pa(e, t, a, r = ':scope > [role="tab"]') {
  const [o, l] = p(null);
  return tt(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = kd(s, r);
      l((u) => Cd(u, d) ? u : d);
    };
    return c(), $d(s, c);
  }, [e, a, r]), o && Nd(o, t);
}
const Sd = "_strip_1zvzj_2", Rd = "_fits_1zvzj_19", Td = "_probe_1zvzj_27", xd = "_moreRoot_1zvzj_36", Ld = "_more_1zvzj_36", Ad = "_tab_1zvzj_55", Ed = "_count_1zvzj_91", Id = "_badge_1zvzj_97", Y = {
  strip: Sd,
  fits: Rd,
  probe: Td,
  moreRoot: xd,
  more: Ld,
  tab: Ad,
  count: Ed,
  badge: Id
}, ja = "More";
function Md(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const Pn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, hn = (e) => e.badge === void 0 ? Pn(e) : `${Pn(e)}, ${e.badge}`;
function qa(e) {
  return `${Y.strip} ward-tabs ward-tabs--${e}`;
}
const Bd = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Pd({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ i(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${Y.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : hn(e),
      onClick: () => r(e.id),
      ...a,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
          " ",
          /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
        ] }),
        e.badge === void 0 ? null : /* @__PURE__ */ n("span", { className: Y.badge, children: e.badge })
      ]
    }
  );
}
function jd(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((l) => l.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function qd({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(Aa, { label: ja, className: Y.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: Y.more }, children: /* @__PURE__ */ n(Ma, { align: "end", entries: e.map((r) => ({ label: hn(r), onSelect: () => a(r.id) })) }) });
}
function Od(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : Bd;
}
function H2({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: o }) {
  const l = Mt({ orientation: "horizontal" }), s = Md(e, t);
  S(() => l.setActive(s), [l.setActive, s]);
  const c = _(null);
  Ba(c, o);
  const d = Pa(c, s, e.map(hn).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ i("div", { ref: c, className: `${qa(o)} ${Y.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...l.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(Pd, { tab: h, active: t, place: Od(l, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${Y.more} ${Y.probe}`, children: ja }),
    u.length > 0 && /* @__PURE__ */ n(qd, { tabs: u, trigger: l.itemProps(e.length), onPick: jd(c, a) })
  ] });
}
const jn = 7, Oa = "More", Dd = ":scope > a", Da = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Fd = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Hd(e, t) {
  return !e || e.includes(t) ? {} : Fd;
}
function Wd({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ i("a", { href: e.href, className: `${Y.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
    ] })
  ] });
}
function zd({ links: e }) {
  return /* @__PURE__ */ n(Aa, { label: Oa, className: Y.moreRoot, trigger: { className: Y.more }, children: /* @__PURE__ */ n(Ma, { align: "end", entries: e.map((t) => ({ label: Da(t), href: t.href })) }) });
}
function W2({ links: e, active: t, label: a, level: r }) {
  if (e.length > jn) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${jn} — the set is fixed`);
  const o = _(null);
  Ba(o, r);
  const l = Math.max(0, e.findIndex((d) => d.id === t)), s = Pa(o, l, e.map(Da).join(`
`), Dd), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ i("nav", { ref: o, className: `${qa(r)} ${Y.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(Wd, { link: d, current: d.id === t, place: Hd(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${Y.more} ${Y.probe}`, children: Oa }),
    c.length > 0 && /* @__PURE__ */ n(zd, { links: c })
  ] });
}
const Kd = "_root_v56ff_3", Gd = "_segment_v56ff_9", qn = {
  root: Kd,
  segment: Gd
};
function Fa({ options: e, value: t, onChange: a, label: r = "Options", disabled: o = !1, describedBy: l }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Mt({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${qn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: qn.segment,
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
const Ud = "_sidebar_s9o1j_3", Vd = "_brand_s9o1j_9", Yd = "_mark_s9o1j_17", Jd = "_word_s9o1j_24", Qd = "_nav_s9o1j_30", Xd = "_navItem_s9o1j_39", Zd = "_footLink_s9o1j_49", eu = "_group_s9o1j_58", tu = "_groupName_s9o1j_65", nu = "_agents_s9o1j_81", au = "_agent_s9o1j_81", ru = "_root_s9o1j_96", ou = "_agentTop_s9o1j_105", lu = "_dot_s9o1j_112", iu = "_agentName_s9o1j_124", su = "_agentMeta_s9o1j_138", cu = "_foot_s9o1j_49", du = "_footName_s9o1j_150", uu = "_footLinks_s9o1j_157", hu = "_linkBrand_s9o1j_184", mu = "_label_s9o1j_205", wu = "_note_s9o1j_210", fu = "_footer_s9o1j_226", E = {
  sidebar: Ud,
  brand: Vd,
  mark: Yd,
  word: Jd,
  nav: Qd,
  navItem: Xd,
  new: "_new_s9o1j_48",
  footLink: Zd,
  group: eu,
  groupName: tu,
  agents: nu,
  agent: au,
  root: ru,
  agentTop: ou,
  dot: lu,
  agentName: iu,
  agentMeta: su,
  foot: cu,
  footName: du,
  footLinks: uu,
  linkBrand: hu,
  label: mu,
  note: wu,
  footer: fu
};
function _u({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ i(
    "a",
    {
      className: E.agent,
      href: z(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ i("span", { className: E.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: E.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": on(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: E.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: E.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function vu({ shared: e }) {
  return e ? /* @__PURE__ */ i("div", { className: E.foot, children: [
    /* @__PURE__ */ n("span", { className: E.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: E.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${E.footLink} ward-target`, href: z(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function bu({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: o, shared: l }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ i("nav", { className: E.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ i("div", { className: E.brand, children: [
      /* @__PURE__ */ n("span", { className: E.mark }),
      /* @__PURE__ */ n("span", { className: E.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: E.nav, children: t.map((s) => /* @__PURE__ */ n("a", { className: E.navItem, href: z(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ i("div", { className: E.group, children: [
      /* @__PURE__ */ i("span", { className: E.groupName, children: [
        a,
        " · ",
        ae(r.length)
      ] }),
      o && /* @__PURE__ */ n("a", { className: E.new, href: z(o.href), children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: E.agents, children: r.map((s) => /* @__PURE__ */ n(_u, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(vu, { shared: l })
  ] });
}
function pu(e) {
  return e.destinations ?? e.items ?? [];
}
function gu({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: E.linkBrand, children: e });
}
function yu({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: E.footer, children: e });
}
function Nu({ link: e, active: t }) {
  return /* @__PURE__ */ i("a", { href: z(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: E.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: E.note, children: e.note })
  ] });
}
function ku(e) {
  return /* @__PURE__ */ i("aside", { className: `${E.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(gu, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: pu(e).map((t) => /* @__PURE__ */ n(Nu, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(yu, { children: e.children })
  ] });
}
function $u(e) {
  return "agents" in e;
}
function z2(e) {
  return $u(e) ? /* @__PURE__ */ n(bu, { ...e }) : /* @__PURE__ */ n(ku, { ...e });
}
const Cu = "_mark_wlgi8_3", Su = {
  mark: Cu
}, Ru = { met: "✓", unmet: "", failed: "✕" };
function mn({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Su.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: Ru[e]
    }
  );
}
const Tu = "_avatar_1t33a_3", xu = {
  avatar: Tu
};
function Rt(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function Lu(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [Rt(e), ...[...t.slice(1)].map((r) => a + r)];
}
function Au(e, t) {
  const a = Lu(e).find((o) => !t.has(o));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(Rt(e).charAt(0) + String(r)); ) r += 1;
  return Rt(e).charAt(0) + String(r);
}
function K2(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const o = Au(r, t);
    t.add(o), a.set(r, o);
  }
  return a;
}
function Eu(e) {
  return e != null && ht(e) ? ao(e) : void 0;
}
function G2({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: xu.avatar, "data-size": a, "aria-hidden": "true", style: Eu(t), children: r ?? Rt(e) });
}
const Iu = "_marker_br9fi_2", Mu = {
  marker: Iu
}, Bu = {
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
}, Pu = { running: " ward-running" };
function He({ size: e, kind: t, label: a }) {
  const r = { "--marker": Bu[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Mu.marker} ward-marker ward-marker--${t}${Pu[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const ju = "_root_ti0pq_2", qu = "_chip_ti0pq_11", Ou = "_noCase_ti0pq_23", vt = {
  root: ju,
  chip: qu,
  noCase: Ou
};
function Du(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function wn({ connection: e, since: t, lastEventAt: a }) {
  const r = Du(t, a), o = ln(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ i("span", { className: `${vt.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(He, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ i("span", { className: `${vt.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: vt.noCase, children: rn(o) })
  ] }) : /* @__PURE__ */ i("span", { className: `${vt.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    he(r)
  ] });
}
const Fu = "_root_yylks_2", Hu = "_context_yylks_13", Wu = "_row_yylks_1", zu = "_heading_yylks_27", Ku = "_headingWrap_yylks_35", Gu = "_meta_yylks_41", Uu = "_chips_yylks_49", Vu = "_title_yylks_56", Yu = "_consequence_yylks_66", Ju = "_actionsWrap_yylks_73", Qu = "_actions_yylks_73", Xu = "_action_yylks_73", Zu = "_overflowPanel_yylks_102", eh = "_measureClip_yylks_113", th = "_measure_yylks_113", U = {
  root: Fu,
  context: Hu,
  row: Wu,
  heading: zu,
  headingWrap: Ku,
  meta: Gu,
  chips: Uu,
  title: Vu,
  consequence: Yu,
  actionsWrap: Ju,
  actions: Qu,
  action: Xu,
  overflowPanel: Zu,
  measureClip: eh,
  measure: th
};
function nh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(nt, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function ah({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function rh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function oh({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ i("div", { className: U.meta, children: [
    /* @__PURE__ */ n(ah, { chips: e }),
    /* @__PURE__ */ n(rh, { consequence: t, consequenceHint: a })
  ] });
}
function lh({ title: e, chips: t, consequence: a, consequenceHint: r, density: o }) {
  return /* @__PURE__ */ i("div", { className: U.heading, children: [
    /* @__PURE__ */ n(nh, { title: e, density: o }),
    /* @__PURE__ */ n(oh, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function Xt({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function On({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function ih({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: o }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(On, { disclosure: o }) : t ? [/* @__PURE__ */ n(On, { disclosure: o }, "more"), /* @__PURE__ */ n(Xt, { actions: e }, "actions")] : /* @__PURE__ */ n(Xt, { actions: e });
}
function sh(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function ch({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(Xt, { actions: e }) });
}
function dh(e, t) {
  const a = k(), [r, o] = p(!1), l = r && e;
  return { disclosure: { open: l, panelId: a, toggle: () => o(!l) }, close: () => {
    var d, u;
    o(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const uh = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function hh(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && uh(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function mh({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(ks, { path: e.path, current: e.current }) });
}
function wh(...e) {
  return e.some((t) => t === null);
}
function fh(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function _h(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + fh(e);
}
function vh(e, t, a, r, o) {
  if (o === 0 || wh(t, a, r)) return !1;
  const [l, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - _h(e, l));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function bh(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function ph(e) {
  return jr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function gh(e, t) {
  return t.length === 0 && e.length === 1 && ph(e[0]);
}
function yh(e, t) {
  const a = _(null), r = _(null), o = _(null), l = _(null), [s, c] = p(!1);
  return S(() => {
    const d = a.current;
    if (!bh(d)) return;
    const u = () => c(vh(d, r.current, o.current, l.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), l.current && h.observe(l.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: o, measureRef: l, collapsed: s && !t };
}
function Nh({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ i("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] }) });
}
function kh({ connection: e }) {
  return e ? /* @__PURE__ */ n(wn, { connection: e.connection, since: e.since }) : null;
}
function U2({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: o, consequenceHint: l, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: y, measureRef: N, collapsed: A } = yh(s, gh(s, c)), q = c.length > 0, { disclosure: me, close: re } = dh(A || q, y), Ee = sh(c, s, A, u);
  return /* @__PURE__ */ i("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(mh, { crumb: hh(e, r, t) }),
    /* @__PURE__ */ i("div", { className: U.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: f, className: U.headingWrap, children: /* @__PURE__ */ n(lh, { title: r, chips: a, consequence: o, consequenceHint: l, density: h }) }),
      /* @__PURE__ */ i("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(kh, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: y, "data-ward-actions": !0, children: /* @__PURE__ */ n(ih, { actions: s, hasMore: q, collapsed: A, onOverflow: u, disclosure: me }) })
      ] })
    ] }),
    /* @__PURE__ */ n(ch, { actions: Ee, disclosure: me, onEscape: re }),
    /* @__PURE__ */ n(Nh, { actions: s, hasMore: q, measureRef: N })
  ] });
}
const $h = "_root_td96x_2", Ch = "_body_td96x_16", Dn = {
  root: $h,
  body: Ch
};
function V2({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${Dn.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: Dn.body, children: a }) });
}
const Sh = "_root_bf1pc_2", Rh = "_table_bf1pc_9", Th = "_caption_bf1pc_14", xh = "_series_bf1pc_23", Lh = "_category_bf1pc_31", Ah = "_cell_bf1pc_39", Eh = "_track_bf1pc_45", Ih = "_lane_bf1pc_52", Mh = "_bar_bf1pc_56", Bh = "_value_bf1pc_63", Ph = "_swatch_bf1pc_70", jh = "_empty_bf1pc_78", Z = {
  root: Sh,
  table: Rh,
  caption: Th,
  series: xh,
  category: Lh,
  cell: Ah,
  track: Eh,
  lane: Ih,
  bar: Mh,
  value: Bh,
  swatch: Ph,
  empty: jh
}, qh = "—", Fn = 6;
function Oh(e, t) {
  if (t.length < 1 || t.length > Fn)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${Fn}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function Dh(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function Ha(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function Fh(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function Hh({ value: e, top: t, step: a, format: r, missing: o }) {
  const l = Fh(e, t), s = { "--share": `${l}%` };
  return /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ i("span", { className: Z.track, children: [
    /* @__PURE__ */ n("span", { className: Z.lane, children: l > 0 ? /* @__PURE__ */ n("span", { className: `${Z.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Z.value, children: e === null ? o : r(e) })
  ] }) });
}
function Wh({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ i("th", { scope: "col", className: Z.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Z.swatch, "data-step": Ha(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function zh({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ i("section", { className: `${Z.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Z.empty, children: t })
  ] });
}
function Kh({ title: e, categories: t, series: a, top: r, format: o = ae, categoryHead: l = "Category", missing: s = qh }) {
  return /* @__PURE__ */ n("div", { className: `${Z.root} ward-barchart`, children: /* @__PURE__ */ i("table", { className: Z.table, children: [
    /* @__PURE__ */ n("caption", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Z.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: l }) }),
      /* @__PURE__ */ n(Wh, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Z.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(Hh, { value: u.values[d], top: r, step: Ha(h, a.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function Y2(e) {
  Oh(e.categories, e.series);
  const t = Dh(e.series);
  return t === 0 ? /* @__PURE__ */ n(zh, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Kh, { ...e, top: t });
}
const Gh = "_root_1bfqw_2", Uh = "_figure_1bfqw_7", Vh = "_of_1bfqw_13", Yh = "_bar_1bfqw_18", Jh = "_rows_1bfqw_38", Qh = "_row_1bfqw_38", Xh = "_label_1bfqw_49", Zh = "_amount_1bfqw_54", Ie = {
  root: Gh,
  figure: Uh,
  of: Vh,
  bar: Yh,
  rows: Jh,
  row: Qh,
  label: Xh,
  amount: Zh
};
function em({ spent: e, ceiling: t, breakdown: a }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ i("div", { className: `${Ie.root} ward-costmeter`, children: [
    /* @__PURE__ */ i("p", { className: `${Ie.figure} ward-stat-value`, children: [
      le(e),
      " ",
      /* @__PURE__ */ i("span", { className: Ie.of, children: [
        "of ",
        le(t)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Ie.bar} ward-costbar`,
        min: 0,
        max: t,
        value: e,
        "aria-valuetext": `${le(e)} of ${le(t)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    a && /* @__PURE__ */ n("ul", { className: Ie.rows, children: a.map((o) => /* @__PURE__ */ i("li", { className: `${Ie.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Ie.label, children: o.label }),
      /* @__PURE__ */ n("span", { className: Ie.amount, children: le(o.amount) })
    ] }, o.label)) })
  ] });
}
const tm = "_frame_f7bxz_2", nm = "_table_f7bxz_6", am = "_th_f7bxz_12", rm = "_td_f7bxz_13", om = "_sort_f7bxz_53", lm = "_row_f7bxz_65", im = "_empty_f7bxz_73", qe = {
  frame: tm,
  table: nm,
  th: am,
  td: rm,
  sort: om,
  row: lm,
  empty: im
}, sm = { asc: "ascending", desc: "descending" };
function cm(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return sm[t.direction];
}
function dm(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: qe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function um(e) {
  return e === void 0 ? void 0 : { width: e };
}
function hm({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: qe.th,
      style: um(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": cm(e, t),
      children: dm(e, a)
    }
  );
}
function mm({ row: e, props: t }) {
  const a = t.rowId(e), r = (t.lockedIds ?? []).includes(a);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: qe.row,
      "data-selected": a === t.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: t.columns.map((o) => /* @__PURE__ */ n(
        "td",
        {
          className: qe.td,
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
function wm({
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
  return a.length === 0 ? /* @__PURE__ */ n("div", { className: qe.empty, children: u }) : /* @__PURE__ */ n("div", { className: qe.frame, "data-narrow": h, children: /* @__PURE__ */ i("table", { className: qe.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: qe.head, children: t.map((w) => /* @__PURE__ */ n(hm, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(mm, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: o, selectedId: l, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const fm = "_list_v0s52_2", _m = {
  list: fm
};
function J2({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: _m.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const vm = "_label_1u62a_2", bm = {
  label: vm
};
function Q2({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: bm.label, children: t.header }) }, t.key)) }) });
}
const pm = "_stack_bp6a0_2", gm = {
  stack: pm
};
function X2({ children: e }) {
  return /* @__PURE__ */ n("span", { className: gm.stack, "data-ward-action-stack": "", children: e });
}
const ym = "_set_1z0sq_2", Nm = "_legend_1z0sq_7", km = "_row_1z0sq_15", $m = "_control_1z0sq_20", Cm = "_input_1z0sq_26", Sm = "_label_1z0sq_31", Rm = "_consequence_1z0sq_36", ze = {
  set: ym,
  legend: Nm,
  row: km,
  control: $m,
  input: Cm,
  label: Sm,
  consequence: Rm
};
function Wa({ legend: e, options: t, value: a, onChange: r, disabled: o, name: l, describedBy: s, variant: c }) {
  const d = k(), u = l ?? d;
  return /* @__PURE__ */ i("fieldset", { className: ze.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: ze.legend, children: e }),
    t.map((h) => {
      const w = `${u}-${h.value}`, f = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ i("div", { className: ze.row, children: [
        /* @__PURE__ */ i("span", { className: ze.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: ze.input,
              value: h.value,
              checked: a === h.value,
              disabled: o,
              "aria-describedby": at(f, s),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: w, className: ze.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: f, className: `${ze.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Tm = "_root_11gpw_2", xm = "_head_11gpw_10", Lm = "_note_11gpw_29", Am = "_index_11gpw_34", Em = "_dot_11gpw_38", Im = "_counter_11gpw_49", Mm = "_trailing_11gpw_57", Ke = {
  root: Tm,
  head: xm,
  note: Lm,
  index: Am,
  dot: Em,
  counter: Im,
  trailing: Mm
};
function Bm({ index: e }) {
  return e ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ke.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ke.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Pm({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ke.counter, "aria-hidden": "true", children: e }) : null;
}
function Hn({ title: e, index: t, note: a, counter: r, kind: o = "micro", trailing: l }) {
  return /* @__PURE__ */ i("div", { className: `${Ke.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ i("h2", { className: Ke.head, children: [
      /* @__PURE__ */ n(Bm, { index: t }),
      e,
      r && /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ke.note, children: a }),
    /* @__PURE__ */ n(Pm, { counter: r }),
    l === void 0 ? null : /* @__PURE__ */ n("span", { className: Ke.trailing, children: l })
  ] });
}
const jm = "_strip_c3x3u_2", qm = "_cell_c3x3u_7", Om = "_value_c3x3u_12", Dm = "_link_c3x3u_29", Fm = "_label_c3x3u_49", Hm = "_tiles_c3x3u_101", Fe = {
  strip: jm,
  cell: qm,
  value: Om,
  link: Dm,
  label: Fm,
  tiles: Hm
};
function za(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((o) => o.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Ka = (e) => `${Fe.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Wm({ cell: e }) {
  return /* @__PURE__ */ i("div", { className: Fe.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: Ka(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${Fe.label} ward-stat-label`, children: e.label })
  ] });
}
function zm({ cell: e, href: t }) {
  return /* @__PURE__ */ i("div", { className: Fe.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: Ka(e), title: e.hint, children: /* @__PURE__ */ i("a", { className: `${Fe.link} ward-stat-link`, href: z(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${Fe.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Ga = (e) => e.href === void 0 ? /* @__PURE__ */ n(Wm, { cell: e }, e.label) : /* @__PURE__ */ n(zm, { cell: e, href: e.href }, e.label);
function qt({ cells: e, divided: t = !1 }) {
  return za("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${Fe.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(Ga) });
}
const Wn = 6;
function Z2({ cells: e }) {
  za("StatTiles", e, [1, 2 * Wn]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, Wn) };
  return /* @__PURE__ */ n("dl", { className: `${Fe.tiles} ward-stattiles`, style: t, children: e.map(Ga) });
}
const Km = "_root_1eb1u_2", Gm = "_track_1eb1u_8", Um = "_thumb_1eb1u_46", Vm = "_labelHidden_1eb1u_64", Ym = "_label_1eb1u_64", Jm = "_lockedNote_1eb1u_84", Ge = {
  root: Km,
  track: Gm,
  thumb: Um,
  labelHidden: Vm,
  label: Ym,
  lockedNote: Jm
};
function Qm(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function Xm(e) {
  return e ? `${Ge.label} ${Ge.labelHidden}` : Ge.label;
}
function Zm(e, t, a) {
  return e && !t && a ? a : void 0;
}
function ew(e, t, a, r) {
  return { "aria-describedby": Pt(at(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function tw({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ve({ label: e, checked: t, onChange: a, disabled: r, locked: o, describedBy: l, labelHidden: s, disabledReason: c }) {
  const d = k(), u = `${d}switch`, h = `${d}reason`, w = Ae(), { on: f, off: y } = Qm(t, r, o, w !== null), N = Zm(y, w !== null, c);
  return /* @__PURE__ */ i("span", { className: `${Ge.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": f,
        "aria-label": e,
        "aria-labelledby": d,
        ...ew(h, l, w, N),
        className: `${Ge.track} ward-switch`,
        "data-on": f,
        "data-locked": o ? !0 : void 0,
        disabled: y,
        onClick: () => !y && (a == null ? void 0 : a(!f)),
        children: /* @__PURE__ */ n("span", { className: Ge.thumb })
      }
    ),
    /* @__PURE__ */ i("label", { id: d, htmlFor: u, className: Xm(s), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ge.lockedNote, children: "always on" })
    ] }),
    /* @__PURE__ */ n(tw, { id: h, reason: N })
  ] });
}
const nw = "_bar_1vp69_2", aw = "_skip_1vp69_11", rw = "_mark_1vp69_22", ow = "_nav_1vp69_30", lw = "_list_1vp69_34", iw = "_select_1vp69_41", sw = "_selectTrigger_1vp69_45", cw = "_dest_1vp69_52", dw = "_actor_1vp69_71", uw = "_actorMark_1vp69_84", hw = "_actorLabel_1vp69_89", mw = "_tagline_1vp69_108", se = {
  bar: nw,
  skip: aw,
  mark: rw,
  nav: ow,
  list: lw,
  select: iw,
  selectTrigger: sw,
  dest: cw,
  actor: dw,
  actorMark: uw,
  actorLabel: hw,
  tagline: mw
};
function ww(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function fw(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function eT({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: o, onNavigate: l, skipTo: s = "main" }) {
  const c = fw(r);
  return /* @__PURE__ */ i("header", { className: se.bar, children: [
    /* @__PURE__ */ n("a", { className: `${se.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: se.mark, children: e }),
    o && /* @__PURE__ */ n("span", { className: se.tagline, children: o }),
    /* @__PURE__ */ i("nav", { className: se.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: se.list, children: t.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${se.dest} ward-target`,
          href: z(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => l == null ? void 0 : l(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        Ta,
        {
          className: se.select,
          triggerClassName: se.selectTrigger,
          "aria-label": "Destination",
          value: a,
          options: t.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => l == null ? void 0 : l(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ i("span", { className: se.actor, children: [
      /* @__PURE__ */ n("span", { className: se.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: ww(c) })
    ] })
  ] });
}
const _w = "_tree_zzoob_2", vw = "_item_zzoob_6", bw = "_row_zzoob_10", pw = "_button_zzoob_22", Tt = {
  tree: _w,
  item: vw,
  row: bw,
  button: pw
}, Ua = Ne(null);
function gw({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Mt({ orientation: "vertical" });
  return /* @__PURE__ */ n(Ua.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: Tt.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const yw = { ArrowRight: !0, ArrowLeft: !1 };
function zn(e) {
  return e ? !0 : void 0;
}
function Nw(e, t) {
  const a = yw[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function kw(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function $w(e) {
  const t = [Tt.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function Cw(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Sw(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Rw(e) {
  return typeof e == "string" ? e : void 0;
}
function Tw({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function xw({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Va(e) {
  const t = ye(Ua);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = Cw(e);
  return /* @__PURE__ */ i("li", { className: Tt.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: $w(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": zn(e.unresolved),
        "data-inherited": zn(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: `${Tt.button} ward-treeitem-btn`,
            onClick: () => kw(e),
            onKeyDown: (r) => Nw(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Sw(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Rw(e.label), children: e.label }),
              /* @__PURE__ */ n(Tw, { value: e.detail }),
              /* @__PURE__ */ n(xw, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Lw = "_frame_gxspk_2", Aw = "_subjectRail_gxspk_22", Ew = "_subject_gxspk_22", Iw = "_rail_gxspk_42", Mw = "_record_gxspk_57", Bw = "_recordBody_gxspk_102", Pw = "_stageGrid_gxspk_157", jw = "_band_gxspk_171", qw = "_bandBody_gxspk_179", Ow = "_bandActions_gxspk_184", Dw = "_scroller_gxspk_192", Fw = "_board_gxspk_219", Hw = "_lanes_gxspk_228", Ww = "_cardGrid_gxspk_262", ee = {
  frame: Lw,
  subjectRail: Aw,
  subject: Ew,
  rail: Iw,
  record: Mw,
  recordBody: Bw,
  stageGrid: Pw,
  band: jw,
  bandBody: qw,
  bandActions: Ow,
  scroller: Dw,
  board: Fw,
  lanes: Hw,
  cardGrid: Ww
};
function tT({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: ee.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function Kn(e) {
  return e ? "true" : void 0;
}
function nT({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: o, ruled: l }) {
  return /* @__PURE__ */ i("div", { className: ee.subjectRail, "data-ward-subject-rail": a, "data-ruled": Kn(l), children: [
    /* @__PURE__ */ n("div", { className: ee.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ee.rail, "data-sticky": Kn(o), "aria-label": r, children: t })
  ] });
}
function aT({ title: e, children: t, note: a, trailing: r, pad: o = "block", label: l, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: ee.record, "aria-label": l, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(Hn, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ i("section", { className: ee.record, "aria-label": l, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(Hn, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: ee.recordBody, "data-pad": o, "data-measure": c, children: t })
  ] });
}
const zw = "_form_1j8ub_2", Kw = "_fields_1j8ub_9", Gw = "_actions_1j8ub_19", Kt = {
  form: zw,
  fields: Kw,
  actions: Gw
};
function rT({ label: e, children: t, actions: a, onSubmit: r }) {
  const o = (l) => {
    l.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ i("form", { className: Kt.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Kt.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: Kt.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function oT({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ i("section", { className: ee.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ee.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: ee.bandActions, children: t })
  ] });
}
const Uw = "(max-width: 767.98px)";
function fn({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(cn, { className: ee.scroller, label: e, count: a ?? qr.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function Vw({ lanes: e, label: t, laneLabel: a }) {
  const [r, o] = p(null), l = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ i("div", { className: ee.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(j, { kind: "select", label: a, value: (l == null ? void 0 : l.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ n(fn, { label: t, children: l == null ? void 0 : l.content })
  ] });
}
function Yw({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: ee.board, "data-ward-board": "", children: /* @__PURE__ */ n(fn, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(ia, { children: a.content }, a.id)) }) });
}
function lT({ children: e, label: t = "Workflow board", lanes: a, laneLabel: r = "Column" }) {
  const o = dt(Uw);
  return a === void 0 ? /* @__PURE__ */ n(fn, { label: t, children: e }) : o ? /* @__PURE__ */ n(Vw, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(Yw, { lanes: a, label: t });
}
function iT({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), l = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ n(cn, { className: ee.stageGrid, label: a, count: o, "data-ward-stage-grid": "", "data-floor": r, style: l, children: t });
}
function sT({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${ee.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const Jw = "_block_6tv5x_3", Qw = "_sentence_6tv5x_10", Xw = "_meta_6tv5x_19", Zw = "_ways_6tv5x_24", ef = "_action_6tv5x_38", tf = "_strip_6tv5x_42", nf = "_loading_6tv5x_61", af = "_label_6tv5x_69", rf = "_counter_6tv5x_76", _e = {
  block: Jw,
  sentence: Qw,
  meta: Xw,
  ways: Zw,
  action: ef,
  strip: tf,
  loading: nf,
  label: af,
  counter: rf
};
function of({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function Ot({ sentence: e, action: t, children: a, role: r = "status", tone: o, kind: l, ask: s }) {
  return /* @__PURE__ */ i("div", { className: `${_e.block} ward-state${l === void 0 ? "" : ` ${l}`}`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ i("p", { className: _e.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ i(x, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(of, { action: t })
  ] });
}
function lf(e) {
  return /* @__PURE__ */ n(Ot, { ...e, kind: "ward-emptystate" });
}
function cT({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(Ot, { sentence: e, action: a, children: /* @__PURE__ */ i("p", { className: _e.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function sf({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${_e.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function dT({ ways: e, ...t }) {
  return /* @__PURE__ */ n(Ot, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(sf, { ways: e }) });
}
function uT({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(Ot, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ i("p", { className: _e.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function hT({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ i("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function mT({ queued: e, since: t }) {
  return /* @__PURE__ */ i("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function wT({ label: e, startedAt: t }) {
  const a = _(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = p(!1);
  S(() => {
    const s = window.setTimeout(() => o(!0), be.load);
    return () => window.clearTimeout(s);
  }, []);
  const l = ln(a.current, r);
  return /* @__PURE__ */ i("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: _e.counter, children: rn(l) }) : null
  ] });
}
const cf = "_note_cigdt_2", df = {
  note: cf
};
function uf({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ i("p", { className: df.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const hf = "_card_k7btg_3", mf = "_hit_k7btg_31", wf = "_head_k7btg_44", ff = "_title_k7btg_51", _f = "_meta_k7btg_57", vf = "_since_k7btg_66", bf = "_sep_k7btg_76", pf = "_fields_k7btg_80", gf = "_field_k7btg_80", yf = "_last_k7btg_98", Nf = "_reason_k7btg_110", de = {
  card: hf,
  hit: mf,
  head: wf,
  title: ff,
  meta: _f,
  since: vf,
  sep: bf,
  fields: pf,
  field: gf,
  last: yf,
  reason: Nf
}, kf = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function $f(e, t, a) {
  const r = gt(e, "blue"), o = gt(e, "orange"), l = gt(e, "green"), s = _(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: o, green: l };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = kf[d.type];
      u && c[u]();
    });
  }, [r, a, l, t, o]);
}
const Cf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Sf(e, t) {
  return Cf[t](e);
}
function Rf({ item: e, connection: t }) {
  const a = /* @__PURE__ */ n("span", { className: de.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ i("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    a,
    /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ i("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.waitsOn,
    a,
    /* @__PURE__ */ i("span", { className: de.since, children: [
      ue(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Tf({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ i("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function xf({ reason: e }) {
  return e ? /* @__PURE__ */ i("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Lf({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: de.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: de.field, children: Sf(e, a) }, a)) });
}
const Zt = (e) => e ? !0 : void 0;
function Af(e) {
  return { "--stream": ge(e.streamStep, "id") };
}
function Ef(e, t, a) {
  e == null || e(t, a);
}
function If(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Mf({ item: e, stale: t }) {
  var r, o;
  const a = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: de.last, "data-stale": Zt(t), children: a }) : null;
}
function Dt(e) {
  const t = e.fields ?? [], a = e.item, r = _(null);
  $f(r, a.key, e.feed);
  const o = If(e.feed), l = Af(a);
  return /* @__PURE__ */ i(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: de.card,
      style: l,
      "data-selected": Zt(e.selected),
      "data-flagged": Zt(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: de.hit, onClick: (s) => Ef(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(Tf, { item: a }),
        /* @__PURE__ */ n(nt, { as: "p", className: de.title, text: a.title }),
        /* @__PURE__ */ n(Rf, { item: a, connection: o }),
        /* @__PURE__ */ n(xf, { reason: a.blockedReason }),
        /* @__PURE__ */ n(Lf, { item: a, fields: t }),
        /* @__PURE__ */ n(Mf, { item: a, stale: o === "stale" })
      ]
    }
  );
}
const Bf = "_column_1j8bi_3", Pf = "_head_1j8bi_21", jf = "_label_1j8bi_30", qf = "_count_1j8bi_39", Of = "_list_1j8bi_53", st = {
  column: Bf,
  head: Pf,
  label: jf,
  count: qf,
  list: Of
};
function Ya(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function Df({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ i("div", { className: st.head, children: [
    /* @__PURE__ */ n("h2", { className: st.label, id: a, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ i("span", { className: st.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Ff(e) {
  return /* @__PURE__ */ n("div", { className: st.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      Dt,
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
function Hf({ column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: l, feed: s, roving: c, onKeyDown: d }) {
  const u = k(), h = e.cap !== void 0 && t.length > e.cap, w = Ya(t, r);
  return /* @__PURE__ */ i("section", { className: st.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Df, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(Ff, { column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: l, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n(uf, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const Wf = "_foot_cs4jr_2", zf = "_note_cs4jr_13", Kf = "_link_cs4jr_19", Gt = {
  foot: Wf,
  note: zf,
  link: Kf
};
function fT({ configureHref: e }) {
  return /* @__PURE__ */ i("footer", { className: Gt.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Gt.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Gt.link} ward-target`, href: z(e), children: "Configure board" })
  ] });
}
const Gf = "_head_1tfi5_3", Uf = "_identity_1tfi5_12", Vf = "_titleRow_1tfi5_18", Yf = "_title_1tfi5_18", Jf = "_key_1tfi5_35", Qf = "_rollup_1tfi5_45", Xf = "_tools_1tfi5_53", Zf = "_swatch_1tfi5_101", e_ = "_mark_1tfi5_108", Se = {
  head: Gf,
  identity: Uf,
  titleRow: Vf,
  title: Yf,
  key: Jf,
  rollup: Qf,
  tools: Xf,
  swatch: Zf,
  mark: e_
}, Gn = "initials:";
function t_(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function n_(e) {
  const t = [t_(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function a_(e) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ i("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    n_(e)
  ] });
}
function r_(e) {
  return e.startsWith(Gn) ? e.slice(Gn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function o_({ markRef: e, streamStep: t }) {
  const a = { "--stream": ge(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Se.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: r_(e) }) : /* @__PURE__ */ n("span", { className: Se.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function l_({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(j, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function _T({
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
  return /* @__PURE__ */ i("div", { className: Se.head, children: [
    /* @__PURE__ */ i("div", { className: Se.identity, children: [
      /* @__PURE__ */ i("div", { className: Se.titleRow, children: [
        /* @__PURE__ */ n(o_, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Se.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Se.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Se.rollup, "aria-live": "polite", children: a_(t) })
    ] }),
    /* @__PURE__ */ i("div", { className: Se.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(l_, { owners: o, owner: l, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(wn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const i_ = "_head_1sejb_14", s_ = "_line_1sejb_15", c_ = "_cHandle_1sejb_36", d_ = "_cName_1sejb_41", u_ = "_nameLine_1sejb_49", h_ = "_cLabel_1sejb_56", m_ = "_cCap_1sejb_61", w_ = "_cShown_1sejb_66", f_ = "_name_1sejb_49", __ = "_noCap_1sejb_88", v_ = "_state_1sejb_102", b_ = "_handle_1sejb_111", p_ = "_sub_1sejb_137", O = {
  head: i_,
  line: s_,
  cHandle: c_,
  cName: d_,
  nameLine: u_,
  cLabel: h_,
  cCap: m_,
  cShown: w_,
  name: f_,
  noCap: __,
  state: v_,
  handle: b_,
  sub: p_
}, g_ = "can't be hidden or collapsed", y_ = "terminal · counted, not a column", N_ = "A human gate is always shown, so people see what waits for them.", k_ = "A terminal stage is counted, not shown as a column.";
function vT() {
  return /* @__PURE__ */ i("div", { className: O.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: O.cHandle }),
    /* @__PURE__ */ n("span", { className: O.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: O.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: O.cShown, children: "Shown" })
  ] });
}
function $_(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function C_(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Un(e) {
  return e.gate ? g_ : e.terminal ? y_ : C_(e.agentsMounted);
}
function S_(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function R_({ stage: e }) {
  return /* @__PURE__ */ i("span", { className: O.cName, children: [
    /* @__PURE__ */ i("span", { className: O.nameLine, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Un(e) && /* @__PURE__ */ n("span", { className: O.sub, children: Un(e) })
  ] });
}
function T_(e) {
  return e === void 0 ? "" : String(e);
}
function x_(e) {
  return e === "" ? void 0 : Number(e);
}
function L_({ name: e, onReorder: t }) {
  const a = Ae();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ n("span", { className: O.cHandle }) : /* @__PURE__ */ n("span", { className: O.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: O.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && S_(r, t),
      children: "⠿"
    }
  ) });
}
function A_({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${O.cCap} ${O.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: O.cCap, children: /* @__PURE__ */ n(j, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: T_(t.cap), onChange: (r) => a({ ...t, cap: x_(r) }) }) });
}
function E_(e) {
  return e.gate ? N_ : e.terminal ? k_ : void 0;
}
function I_({ stage: e, config: t, onChange: a }) {
  const r = Ae() !== null, o = $_(e, t.shown), l = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ i("span", { className: O.cShown, children: [
    /* @__PURE__ */ n(Ve, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, disabledReason: E_(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: O.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && s(!o.shown), children: o.state })
  ] });
}
function M_(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function bT({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ i("div", { className: O.line, "data-kind": M_(e), children: [
    /* @__PURE__ */ n(L_, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(R_, { stage: e }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: /* @__PURE__ */ n(j, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (o) => a({ ...t, label: o }) }) }),
    /* @__PURE__ */ n(A_, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(I_, { stage: e, config: t, onChange: a })
  ] });
}
const B_ = "_body_8qsv9_2", P_ = "_head_8qsv9_9", j_ = "_summary_8qsv9_19", q_ = "_block_8qsv9_20", O_ = "_actionsBlock_8qsv9_21", D_ = "_title_8qsv9_41", F_ = "_note_8qsv9_46", H_ = "_k_8qsv9_51", W_ = "_kv_8qsv9_58", z_ = "_row_8qsv9_64", K_ = "_label_8qsv9_75", G_ = "_value_8qsv9_84", U_ = "_quote_8qsv9_90", V_ = "_actions_8qsv9_21", Y_ = "_resolve_8qsv9_111", F = {
  body: B_,
  head: P_,
  summary: j_,
  block: q_,
  actionsBlock: O_,
  title: D_,
  note: F_,
  k: H_,
  kv: W_,
  row: z_,
  label: K_,
  value: G_,
  quote: U_,
  actions: V_,
  resolve: Y_
};
function J_(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Q_(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function X_(e) {
  const t = wt(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function Z_(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function ev(e, t, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...jt(X_(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...J_(e),
    ...Z_(a),
    ...Q_(e, t)
  ];
}
function tv({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ i("section", { className: F.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: F.k, children: t }),
    e
  ] });
}
function nv(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function av({ item: e, showKey: t }) {
  const a = nv(e);
  return !t && !a ? null : /* @__PURE__ */ i("div", { className: F.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function rv({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ i("div", { className: F.block, children: [
    /* @__PURE__ */ n("p", { className: F.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: F.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: F.note, children: e.agentMeta })
  ] }) : null;
}
function pT({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: o, resolve: l, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = k(), w = ev(e, o, d);
  return /* @__PURE__ */ n(rt, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ i("div", { className: F.body, children: [
    /* @__PURE__ */ n(av, { item: e, showKey: u }),
    /* @__PURE__ */ i("div", { className: F.summary, children: [
      /* @__PURE__ */ n("h2", { className: F.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: F.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: F.kv, children: w.map(([f, y, N]) => /* @__PURE__ */ i("div", { className: F.row, children: [
      /* @__PURE__ */ n("dt", { className: F.label, children: f }),
      /* @__PURE__ */ n("dd", { className: F.value, children: y })
    ] }, N ?? f)) }),
    /* @__PURE__ */ n(rv, { item: e }),
    /* @__PURE__ */ i("div", { className: F.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: F.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: F.note, children: c })
    ] }),
    /* @__PURE__ */ n(tv, { resolve: l, label: s ?? "Ways out of this hold" })
  ] }) });
}
const ov = "_root_3azmy_2", lv = "_list_3azmy_7", iv = "_item_3azmy_12", sv = "_box_3azmy_18", cv = "_text_3azmy_23", dv = "_note_3azmy_28", Je = {
  root: ov,
  list: lv,
  item: iv,
  box: sv,
  text: cv,
  note: dv
};
function Ft({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ i("div", { className: Je.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${Je.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ i("li", { className: `${Je.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Je.box, children: /* @__PURE__ */ n(mn, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Je.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${Je.note} ward-checklist-note`, children: t })
  ] });
}
const uv = "_rail_znbbp_2", hv = "_k_znbbp_11", mv = "_head_znbbp_19", wv = "_section_znbbp_25", fv = "_card_znbbp_39", _v = "_strip_znbbp_46", vv = "_skeleton_znbbp_60", bv = "_skeletonLabel_znbbp_74", pv = "_bar_znbbp_80", gv = "_note_znbbp_89", fe = {
  rail: uv,
  k: hv,
  head: mv,
  section: wv,
  card: fv,
  strip: _v,
  skeleton: vv,
  skeletonLabel: bv,
  bar: pv,
  note: gv
};
function yv(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Ut({ title: e, children: t }) {
  return /* @__PURE__ */ i("section", { className: fe.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: fe.k, children: e }),
    t
  ] });
}
function Nv({ column: e, count: t }) {
  return /* @__PURE__ */ i("div", { className: fe.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: fe.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: fe.bar, "aria-hidden": "true" }, r))
  ] });
}
function kv({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(Hf, { column: o, items: t.filter((l) => l.stage === o.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, o.id));
}
function $v(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(kv, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(Nv, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function gT(e) {
  const t = yv(e.onOpen), a = Ya(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ i("aside", { className: fe.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${fe.k} ${fe.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ut, { title: "Card", children: /* @__PURE__ */ n("div", { className: fe.card, children: a && /* @__PURE__ */ n(Dt, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ i(Ut, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: fe.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n($v, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ut, { title: "Effect of this config", children: /* @__PURE__ */ n(Ft, { items: e.effects, density: "compact" }) })
  ] });
}
function Cv(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function Sv(e) {
  return Math.ceil(e.length / 2);
}
function Rv(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Ja(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Tv(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const o = Ja(e);
  o !== void 0 && a(o), r(Rv(e.type));
}
function xv(e, t, a, r, o) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (l) => Tv(l, a, r, o));
  }, [e, t, a, r, o]);
}
function Lv(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Av(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Ev(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Iv(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + B.height.card + " + " + B.height.cardRow + " * " + String(Sv(t ?? [])) + ")"
  };
}
function Mv(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Bv(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: le(e.cost) }) : null;
}
function Pv(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function jv(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function qv(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function Ov(e, t) {
  return t === void 0 ? e : Cv(e, t.ref);
}
function Dv(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ut(e) {
  return e === !0 ? "true" : void 0;
}
function Qa(e) {
  const t = e.item, a = t.run, r = a !== void 0, o = _(null), l = gt(o), s = _(/* @__PURE__ */ new Set()), [c, d] = p(Lv(t));
  xv(e.feed, t.key, s, d, l);
  const u = Av(t, r), h = Ev(t, a), w = Iv(t, e.fields), f = qv(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      ...Dv(e),
      className: "ward-workcard",
      "data-flagged": ut(t.flagged),
      "data-selected": ut(e.selected),
      style: w,
      ref: Ov(o, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        Mv(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          Bv(t, e.fields),
          Pv(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ i("span", { className: "ward-workcard-lastrow", children: [
          jv(a, c, e.connection, t.changedAt),
          f !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function Fv({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function Hv(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Wv(e, t, a) {
  return /* @__PURE__ */ i("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function zv(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Fv, { count: e.items.length, cap: e.column.cap });
}
function Kv(e, t) {
  return e.roving ?? t;
}
function Gv(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function Uv(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    Qa,
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
function Vv(e) {
  const t = k(), a = Mt({ orientation: "vertical" }), r = Kv(e, a), o = Hv(e);
  return /* @__PURE__ */ i("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": ut(o), "data-gate": ut(e.column.gate), children: [
    Wv(e.column, e.items.length, t),
    zv(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Gv(e, a), children: Uv(e, r) })
  ] });
}
function Yv(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function Jv(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(j, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function Qv(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function yT(e) {
  return /* @__PURE__ */ i("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ i("div", { children: [
      /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Yv(e.rollups) })
    ] }),
    /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
      Jv(e),
      Qv(e.onConfigure),
      /* @__PURE__ */ n(wn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Xv(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Zv(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ve, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ve, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function eb(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ i(x, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function NT(e) {
  const t = e.stage;
  return /* @__PURE__ */ i("div", { className: "ward-configrow", "data-mandatory": ut(Xv(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Zv(e) }),
    /* @__PURE__ */ n(j, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(ga, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    eb(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function kT(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ i("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(Qa, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Vv, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ i("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function tb(e, t) {
  const a = Ja(e);
  a !== void 0 && t(a);
}
function nb(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => tb(r, a));
  }, [e, t, a]);
}
function ab(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function rb(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function ob(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function lb(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function $T(e) {
  var s;
  const t = e.item, a = t.run, [r, o] = p((s = t.run) == null ? void 0 : s.lastStep);
  nb(e.feed, t.key, o);
  const l = [...ab(t), ...rb(t)];
  return /* @__PURE__ */ i(rt, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ i("dl", { className: "ward-kv", children: [
      l.map((c) => /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      ob(a, r)
    ] }),
    lb(t, e.actions)
  ] });
}
const ib = "_card_1nkkx_3", sb = "_head_1nkkx_30", cb = "_mark_1nkkx_38", db = "_name_1nkkx_50", ub = "_chips_1nkkx_71", hb = "_description_1nkkx_77", mb = "_run_1nkkx_82", wb = "_sep_1nkkx_91", fb = "_facts_1nkkx_97", _b = "_fact_1nkkx_97", vb = "_factLabel_1nkkx_111", bb = "_factValue_1nkkx_115", ie = {
  card: ib,
  head: sb,
  mark: cb,
  name: db,
  chips: ub,
  description: hb,
  run: mb,
  sep: wb,
  facts: fb,
  fact: _b,
  factLabel: vb,
  factValue: bb
}, pb = { live: "done", draft: "running", paused: "meta" };
function gb(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function yb({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: pb[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function Nb({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function kb({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ i("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function $b({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ i("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function Cb(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Sb({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: o, facts: l, className: s }) {
  const c = { "--stream": ge(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ i(
    "article",
    {
      "aria-current": d,
      className: gb(s),
      style: c,
      "data-selected": d,
      "data-paused": Cb(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ i("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: z(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(Nb, { description: e.description }),
        /* @__PURE__ */ n(kb, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(yb, { versions: e.versions }),
        /* @__PURE__ */ n($b, { facts: l })
      ]
    }
  );
}
const Rb = "_list_4dcyc_2", Tb = "_row_4dcyc_11", xb = "_head_4dcyc_23", Lb = "_id_4dcyc_30", Ab = "_lock_4dcyc_35", Eb = "_reason_4dcyc_41", Ib = "_remove_4dcyc_46", Mb = "_clauses_4dcyc_50", Bb = "_clause_4dcyc_50", Pb = "_label_4dcyc_64", jb = "_cell_4dcyc_71", qb = "_value_4dcyc_76", ce = {
  list: Rb,
  row: Tb,
  head: xb,
  id: Lb,
  lock: Ab,
  reason: Eb,
  remove: Ib,
  clauses: Mb,
  clause: Bb,
  label: Pb,
  cell: jb,
  value: qb
}, Xa = Ne(!1);
function CT({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(Xa.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function Ob({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(j, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => a(e.key, o) });
}
function Db({ reason: e }) {
  return /* @__PURE__ */ i("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function Fb({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ i("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Db, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Vn(e, t) {
  return e.locked ? void 0 : t;
}
function ST({ rule: e, onChange: t, onRemove: a }) {
  if (!ye(Xa)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Vn(e, t);
  return /* @__PURE__ */ i("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Fb, { rule: e, onRemove: Vn(e, a) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((o) => /* @__PURE__ */ i("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(Ob, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const Hb = "_ladder_1xdeh_2", Wb = "_cell_1xdeh_7", zb = "_empty_1xdeh_26", Kb = "_name_1xdeh_34", Gb = "_holder_1xdeh_40", Ub = "_request_1xdeh_46", Vb = "_swatches_1xdeh_51", Yb = "_swatch_1xdeh_51", Jb = "_tilesFrame_1xdeh_78", Qb = "_tiles_1xdeh_78", Xb = "_tile_1xdeh_78", Zb = "_bar_1xdeh_117", ep = "_hex_1xdeh_128", tp = "_note_1xdeh_138", M = {
  ladder: Hb,
  cell: Wb,
  empty: zb,
  name: Kb,
  holder: Gb,
  request: Ub,
  swatches: Vb,
  swatch: Yb,
  tilesFrame: Jb,
  tiles: Qb,
  tile: Xb,
  bar: Zb,
  hex: ep,
  note: tp
}, RT = "not validated yet, pending a CVD matrix and dark stepping";
function np(e) {
  return e.reserved ? "reserved" : ht(e.step) ? "validated" : "partial";
}
function Za(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function ap(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function rp({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(He, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${M.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function op(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function lp(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Yn = (e) => String(e).padStart(2, "0");
function ip(e, t, a) {
  return e === "reserved" ? "Reserved until revalidated" : a ? "yours" : t ?? Za(e, void 0);
}
function sp({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${M.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${M.hex} ward-ladder-hex`, children: r ? `step ${Yn(e)}` : oo(e) }),
    /* @__PURE__ */ n("span", { className: `${M.note} ward-ladder-note`, children: r ? a : `Step ${Yn(e)} · ${a}` })
  ] });
}
function cp({ step: e, value: t, taken: a, onChange: r, presentation: o, disabled: l }) {
  const s = np(e), c = Za(s, a), d = c !== "free", u = d || l, h = t === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, y = `${w} · ${o === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...lp(d, h, u), "data-validation": s, style: ap(e, s), onClick: f, onKeyDown: (A) => op(A, f) }, label: y, name: w, holder: c, validation: s, note: ip(s, a, h), step: e.step };
}
const dp = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${M.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${M.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(sp, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ i("span", { ...e.shared, className: `${M.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(rp, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${M.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${M.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function up(e) {
  return dp[e.presentation](cp(e));
}
function hp(e) {
  for (const t of e)
    if (!t.reserved && !Bt(t.step)) throw new Error("colour ladder renders token steps only");
}
function mp() {
  return /* @__PURE__ */ i("div", { className: `${M.cell} ward-ladder-cell ${M.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${M.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${M.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${M.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function wp(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const fp = { list: M.ladder, swatches: M.swatches, tiles: M.tilesFrame };
function _p() {
  return /* @__PURE__ */ i("div", { className: `${M.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${M.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${M.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${M.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const vp = { list: mp, swatches: () => null, tiles: _p };
function bp(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function er(e) {
  const t = e.takenBy ?? {}, a = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  hp(e.steps);
  const r = wp(e), o = vp[r], l = /* @__PURE__ */ i(x, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(up, { step: s, value: e.value, taken: t[s.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...bp(e.disabled === !0), className: `${fp[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: M.tiles, children: l }) : l });
}
const pp = "_rail_s06lm_2", gp = "_section_s06lm_12", yp = "_sectionFlush_s06lm_22", Np = "_head_s06lm_26", kp = "_headLabel_s06lm_34", $p = "_sample_s06lm_42", Cp = "_sampleLabel_s06lm_47", Sp = "_sampleTitle_s06lm_54", Rp = "_sampleMeta_s06lm_59", Tp = "_trace_s06lm_65", xp = "_traceHead_s06lm_70", Lp = "_steps_s06lm_78", Ap = "_step_s06lm_78", Ep = "_stepTitle_s06lm_97", Ip = "_hollow_s06lm_107", Mp = "_stepBody_s06lm_115", Bp = "_stepDetail_s06lm_127", Pp = "_publish_s06lm_132", jp = "_reason_s06lm_138", qp = "_note_s06lm_143", Op = "_reveal_s06lm_148", $ = {
  rail: pp,
  section: gp,
  sectionFlush: yp,
  head: Np,
  headLabel: kp,
  sample: $p,
  sampleLabel: Cp,
  sampleTitle: Sp,
  sampleMeta: Rp,
  trace: Tp,
  traceHead: xp,
  steps: Lp,
  step: Ap,
  stepTitle: Ep,
  hollow: Ip,
  stepBody: Mp,
  stepDetail: Bp,
  publish: Pp,
  reason: jp,
  note: qp,
  reveal: Op
}, Jn = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Dp = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Fp = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Hp = { notSimulated: "not simulated", running: "running" };
function Wp(e) {
  return e.presentation === "foundry";
}
function zp(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const a = t.filter((r) => !r.met);
  return a.length > 0 ? `Publish is disabled: ${a.length} of ${t.length} gate conditions unmet: ${a[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Kp(e, t) {
  var r;
  const a = Dp[e.status];
  return a !== void 0 ? a : ((r = t.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function Gp(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Up(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Vp(e) {
  if (Gp(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Yp(e) {
  const [t, a] = p(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Jp(e) {
  const t = Hp[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(He, { size: 6, kind: Fp[e.kind], label: e.kind });
}
function Qp(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ i("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Xp(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Zp(e) {
  const { step: t } = e;
  return /* @__PURE__ */ i(Yp, { kind: t.kind, children: [
    /* @__PURE__ */ n(Jp, { kind: t.kind }),
    /* @__PURE__ */ i("span", { className: $.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: $.stepTitle, children: t.title }),
      /* @__PURE__ */ n(Qp, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Xp, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function eg(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(ue(t)), a.join(" · ");
}
function tr(e) {
  const t = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ i("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.traceHead, id: t, children: eg(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: $.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(Zp, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function tg(e) {
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
function ng(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function ag(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? ca(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(qt, { divided: !0, cells: t }) });
}
function rg(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: ca(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function og(e) {
  const t = rg(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ i("p", { className: $.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(qt, { divided: !0, cells: t }) });
}
function nr(e) {
  const t = k();
  return e.reason !== null ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("p", { className: `${$.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function lg(e) {
  return /* @__PURE__ */ i("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ n(nr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: $.note, children: e.note })
  ] });
}
function ig(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ n(nr, { reason: e.reason, onPublish: e.onPublish }) });
}
function ar(e) {
  return /* @__PURE__ */ i("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: Jn[e.run.status].role, label: Jn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function sg(e, t) {
  const [a, r] = p(e.steps);
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
function cg(e) {
  var a;
  Up(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(ar, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(tg, { sample: e.run.sample }),
    /* @__PURE__ */ n(tr, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(ag, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Ft, { items: e.checklist }) }),
    /* @__PURE__ */ n(lg, { reason: zp(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function dg(e) {
  var r;
  const t = sg(e.run, e.feed);
  Vp(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(ar, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(ng, { sample: e.run.sample }),
    /* @__PURE__ */ n(tr, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(og, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Ft, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(ig, { reason: Kp(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function TT(e) {
  return Wp(e) ? /* @__PURE__ */ n(dg, { ...e }) : /* @__PURE__ */ n(cg, { ...e });
}
const ug = "_list_142ip_3", hg = "_row_142ip_9", mg = "_condition_142ip_18", wg = "_action_142ip_24", Nt = {
  list: ug,
  row: hg,
  condition: mg,
  action: wg
}, rr = Ne(!1);
function xT({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(rr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: Nt.list, "aria-label": t, children: e }) });
}
function LT({ rule: e }) {
  if (!ye(rr)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ i("li", { className: Nt.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: Nt.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: Nt.action, children: e.then })
  ] });
}
const fg = "_move_tmppt_3", _g = {
  move: fg
};
function en(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [o] = r.splice(t, 1);
  return r.splice(a, 0, o), r;
}
function or(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function lr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function Qn(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function vg(e) {
  return e === "up" ? "down" : "up";
}
function bg(e, t) {
  const a = Qn(e, t.id, t.direction) ?? Qn(e, t.id, vg(t.direction));
  a == null || a.focus();
}
function ir() {
  const e = _(null), [t, a] = p(null), [r, o] = p("");
  return S(() => {
    e.current !== null && t !== null && bg(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), o(c);
  } };
}
function sr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function xt({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${_g.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const pg = "_body_1jd1i_2", gg = "_title_1jd1i_8", yg = "_section_1jd1i_13", Ng = "_legend_1jd1i_18", kg = "_stages_1jd1i_26", $g = "_stage_1jd1i_26", Cg = "_stageIndex_1jd1i_44", Sg = "_stageName_1jd1i_50", Rg = "_footer_1jd1i_59", Tg = "_note_1jd1i_66", xg = "_reason_1jd1i_71", Lg = "_actions_1jd1i_76", Ag = "_webHead_1jd1i_83", Eg = "_kicker_1jd1i_92", Ig = "_webTitle_1jd1i_99", Mg = "_webBody_1jd1i_105", Bg = "_webSection_1jd1i_109", Pg = "_sectionHead_1jd1i_121", jg = "_sectionNote_1jd1i_129", qg = "_formLabel_1jd1i_134", Og = "_identityRow_1jd1i_139", Dg = "_nameCell_1jd1i_145", Fg = "_keyCell_1jd1i_150", Hg = "_colourCell_1jd1i_154", Wg = "_colourStatus_1jd1i_161", zg = "_webStages_1jd1i_166", Kg = "_webStageList_1jd1i_172", Gg = "_webStage_1jd1i_166", Ug = "_webIndex_1jd1i_191", Vg = "_webStageName_1jd1i_196", Yg = "_webMoves_1jd1i_201", Jg = "_addStage_1jd1i_215", Qg = "_addStageButton_1jd1i_223", Xg = "_addStageNote_1jd1i_231", Zg = "_webFooter_1jd1i_236", ey = "_webFooterNotes_1jd1i_244", ty = "_webNote_1jd1i_251", v = {
  body: pg,
  title: gg,
  section: yg,
  legend: Ng,
  stages: kg,
  stage: $g,
  stageIndex: Cg,
  stageName: Sg,
  footer: Rg,
  note: Tg,
  reason: xg,
  actions: Lg,
  webHead: Ag,
  kicker: Eg,
  webTitle: Ig,
  webBody: Mg,
  webSection: Bg,
  sectionHead: Pg,
  sectionNote: jg,
  formLabel: qg,
  identityRow: Og,
  nameCell: Dg,
  keyCell: Fg,
  colourCell: Hg,
  colourStatus: Wg,
  webStages: zg,
  webStageList: Kg,
  webStage: Gg,
  webIndex: Ug,
  webStageName: Vg,
  webMoves: Yg,
  addStage: Jg,
  addStageButton: Qg,
  addStageNote: Xg,
  webFooter: Zg,
  webFooterNotes: ey,
  webNote: ty
}, ny = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], cr = "not in catalogue";
function ay(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${cr}` }, ...a];
}
function ry({ stage: e, index: t, catalogue: a, onName: r }) {
  const o = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(j, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const l = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${cr}`;
  return /* @__PURE__ */ n(j, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: ay(a, e.name), invalid: l, onChange: r });
}
function dr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function oy(e) {
  const t = _([]), a = _(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function ly({ id: e, stage: t, index: a, total: r, catalogue: o, onReplace: l, onMove: s }) {
  const c = dr(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ i("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: v.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: v.webStageName, children: /* @__PURE__ */ n(ry, { stage: t, index: a, catalogue: o, onName: (u) => l({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(j, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: ny, onChange: (u) => l({ ...t, kind: u }) }),
    /* @__PURE__ */ i("span", { className: v.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(xt, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(xt, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function iy({ stages: e, onChange: t, catalogue: a }) {
  const r = oy(e.length), o = ir(), l = (c, d) => {
    const u = or(c, d);
    r.current = en(r.current, c, u), o.moved({ id: r.current[u], direction: d }, lr(dr(e[c], c), u, e.length)), t(en(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ i("div", { className: v.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(ly, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => l(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(sr, { text: o.announcement }),
    /* @__PURE__ */ i("p", { className: v.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const sy = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], cy = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], dy = "A new stream starts as a draft. Nothing runs on it until you publish it.", uy = "Create is disabled: name the stream and give it a key first.", hy = "reorder with the ↑ ↓ buttons · min 2";
function _n(e, t) {
  return !e.reserved && ht(e.step) && t[e.step] === void 0;
}
function my(e, t) {
  const a = e.find((r) => _n(r, t));
  return a ? a.step : 1;
}
function wy({ stages: e, onMove: t }) {
  const a = ir(), r = (o, l) => {
    const s = or(o, l);
    a.moved({ id: e[o].id, direction: l }, lr(e[o].name, s, e.length)), t(o, s);
  };
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: v.stages, "aria-label": "Stages in order", children: e.map((o, l) => /* @__PURE__ */ i("li", { className: v.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: v.stageIndex, children: String(l + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: v.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
      l > 0 && /* @__PURE__ */ n(xt, { id: o.id, name: o.name, direction: "up", onMove: () => r(l, "up") }),
      l < e.length - 1 && /* @__PURE__ */ n(xt, { id: o.id, name: o.name, direction: "down", onMove: () => r(l, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(sr, { text: a.announcement })
  ] });
}
function fy({ reason: e, onCreate: t, onDraft: a }) {
  const r = k();
  return /* @__PURE__ */ i("div", { className: v.footer, children: [
    /* @__PURE__ */ n("p", { className: v.note, children: dy }),
    e && /* @__PURE__ */ n("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ i("div", { className: v.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function _y(e, t) {
  return e !== "" && t !== "" ? null : uy;
}
function vy(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: o = cy, onCreate: l, onDraft: s, onClose: c, returnFocusTo: d } = e, u = k(), [h, w] = p(""), [f, y] = p(""), [N, A] = p(t[0].value), [q, me] = p(() => my(a, r)), [re, Ee] = p(e.stages ?? sy), [Ye, T] = p(o[0].value), J = { name: h, key: f, streamStep: q, owner: N, stages: re, policy: Ye }, ke = _y(h, f);
  return /* @__PURE__ */ n(rt, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ i("div", { className: v.body, children: [
    /* @__PURE__ */ n("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ i("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ n(j, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ n(j, { kind: "input", label: "Key", value: f, onChange: y, mono: !0 }),
      /* @__PURE__ */ n(j, { kind: "select", label: "Owner", value: N, onChange: A, options: t })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ n(er, { label: "Stream colour", steps: a, value: q, onChange: me, takenBy: r })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ n(wy, { stages: re, onMove: (We, Pr) => Ee(en(re, We, Pr)) })
    ] }),
    /* @__PURE__ */ n(Wa, { legend: "Loop policy", options: o, value: Ye, onChange: T }),
    /* @__PURE__ */ n(fy, { reason: ke, onCreate: () => l(J), onDraft: () => s(J) })
  ] }) });
}
const ur = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], by = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function py(e, t, a, r, o, l) {
  var c;
  const s = ((c = ur.find((d) => d.value === o)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: l };
}
function gy(e, t) {
  return yy(e) && Ny(e, t) && ky(e);
}
function yy(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Ny(e, t) {
  return e.colourStep === null || _n({ step: e.colourStep }, t);
}
function ky(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function $y(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : _n({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Cy({ stage: e }) {
  return e ? /* @__PURE__ */ i("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function Sy({ ready: e, draft: t, agentStage: a, onCreate: r, onDraft: o, reasonId: l }) {
  return /* @__PURE__ */ i("div", { className: v.webFooter, children: [
    /* @__PURE__ */ i("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ n(Cy, { stage: a }),
      !e && /* @__PURE__ */ n("p", { id: l, className: v.reason, children: by })
    ] }),
    o && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => o(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: l, children: "Create stream" })
  ] });
}
function Ry({ titleId: e }) {
  return /* @__PURE__ */ i("header", { className: v.webHead, children: [
    /* @__PURE__ */ n("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function Ty({ name: e, setName: t, streamKey: a, setKey: r, colour: o, owner: l }) {
  return /* @__PURE__ */ i("section", { className: v.webSection, children: [
    /* @__PURE__ */ n("h3", { className: v.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ i("div", { className: v.identityRow, children: [
      /* @__PURE__ */ n("div", { className: v.nameCell, children: /* @__PURE__ */ n(j, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ n("div", { className: v.keyCell, children: /* @__PURE__ */ n(j, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      o
    ] }),
    l
  ] });
}
function xy(e) {
  const t = k(), a = k(), r = e.takenBy ?? {}, [o, l] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [f, y] = p("relay"), [N, A] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), q = py(o, s, d, h, f, N), me = gy(q, r), re = N.find((T) => T.kind === "agent" && T.name.trim() !== ""), Ee = /* @__PURE__ */ i("div", { className: v.colourCell, children: [
    /* @__PURE__ */ n("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(er, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ye = /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("p", { className: v.colourStatus, "data-colour-status": "", children: $y(h, r) }),
    /* @__PURE__ */ n(j, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((T) => ({ value: T, label: T })), onChange: u })
  ] });
  return /* @__PURE__ */ i(rt, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Ry, { titleId: a }),
    /* @__PURE__ */ i("div", { className: v.webBody, children: [
      /* @__PURE__ */ n(Ty, { name: o, setName: l, streamKey: s, setKey: c, colour: Ee, owner: Ye }),
      e.fields && /* @__PURE__ */ n("section", { className: v.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ i("section", { className: v.webSection, children: [
        /* @__PURE__ */ i("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: v.sectionNote, children: hy })
        ] }),
        /* @__PURE__ */ n(iy, { stages: N, onChange: A })
      ] }),
      /* @__PURE__ */ n("section", { className: v.webSection, children: /* @__PURE__ */ n(Wa, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: ur, onChange: y }) }),
      /* @__PURE__ */ n(Sy, { ready: me, draft: q, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function AT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(xy, { ...e }) : /* @__PURE__ */ n(vy, { ...e });
}
const Ly = "_row_bs8hc_2", Ay = "_cell_bs8hc_6", Ey = "_condition_bs8hc_11", Iy = "_action_bs8hc_18", My = "_contract_bs8hc_24", By = "_contractCondition_bs8hc_33", Py = "_contractAction_bs8hc_39", ne = {
  row: Ly,
  cell: Ay,
  condition: Ey,
  action: Iy,
  contract: My,
  contractCondition: By,
  contractAction: Py
}, hr = ["advance", "block", "escalate", "requestReview"], Xn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Lt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function vn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ne.action, children: Xn[e.then] }) : /* @__PURE__ */ n(
    j,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => t({ ...e, then: o }),
      options: hr.map((o) => ({ value: o, label: Xn[o] }))
    }
  );
}
function jy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ne.row, children: [
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n("span", { className: ne.condition, title: Lt(e, r), children: Lt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: vn(e, t, a) })
  ] });
}
function qy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ne.row, children: [
    /* @__PURE__ */ i("td", { className: ne.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ne.condition, children: Lt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: vn(e, t, a) })
  ] });
}
function Oy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("li", { className: ne.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ne.contractCondition, children: Lt(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ne.contractAction, children: vn(e, t, a, !0) })
  ] });
}
const Dy = { two: qy, four: jy, contract: Oy };
function ET(e) {
  var a;
  if (!hr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = Dy[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const Fy = "_column_g1uat_2", Hy = "_head_g1uat_17", Wy = "_index_g1uat_23", zy = "_name_g1uat_29", Ky = "_meta_g1uat_38", Gy = "_mono_g1uat_43", Uy = "_gate_g1uat_50", Vy = "_reviewersLabel_g1uat_57", Yy = "_reviewers_g1uat_57", Jy = "_reviewer_g1uat_57", Qy = "_agents_g1uat_74", Xy = "_workflowColumn_g1uat_79", Zy = "_workflowHead_g1uat_96", eN = "_stageRow_g1uat_102", tN = "_stageLabel_g1uat_109", nN = "_workflowTitle_g1uat_116", aN = "_workflowMeta_g1uat_122", rN = "_workflowGate_g1uat_127", oN = "_gateNote_g1uat_135", lN = "_cardNote_g1uat_140", iN = "_reviewerList_g1uat_145", sN = "_reviewerRow_g1uat_151", cN = "_reviewerMark_g1uat_157", dN = "_reviewerName_g1uat_167", uN = "_terminalCard_g1uat_173", hN = "_terminalCount_g1uat_182", mN = "_workflowAgents_g1uat_188", wN = "_mount_g1uat_194", R = {
  column: Fy,
  head: Hy,
  index: Wy,
  name: zy,
  meta: Ky,
  mono: Gy,
  gate: Uy,
  reviewersLabel: Vy,
  reviewers: Yy,
  reviewer: Jy,
  agents: Qy,
  workflowColumn: Xy,
  workflowHead: Zy,
  stageRow: eN,
  stageLabel: tN,
  workflowTitle: nN,
  workflowMeta: aN,
  workflowGate: rN,
  gateNote: oN,
  cardNote: lN,
  reviewerList: iN,
  reviewerRow: sN,
  reviewerMark: cN,
  reviewerName: dN,
  terminalCard: uN,
  terminalCount: hN,
  workflowAgents: mN,
  mount: wN
}, fN = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function bn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function mr(e) {
  return `${Math.round(e * 100)}%`;
}
function _N({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(qt, { cells: [
      { value: mr(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function vN({ stage: e }) {
  return /* @__PURE__ */ n(qt, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: bn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function bN({ stage: e, titleId: t }) {
  return /* @__PURE__ */ i("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: fN[e.kind] })
  ] });
}
function pN({ stage: e }) {
  return /* @__PURE__ */ i("p", { className: R.meta, children: [
    /* @__PURE__ */ i("span", { className: R.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ i("span", { className: R.mono, children: [
      ue(e.medianWait),
      " median wait"
    ] })
  ] });
}
function gN({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(_N, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(vN, { stage: e }) : null;
}
function yN({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function NN({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const o = k(), l = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("section", { className: R.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(bN, { stage: e, titleId: o }),
    /* @__PURE__ */ n(pN, { stage: e }),
    /* @__PURE__ */ n(gN, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(Sb, { ...s, connection: l }, s.agent.id)) }),
    /* @__PURE__ */ n(yN, { onMount: a })
  ] });
}
const kN = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function $N({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ i("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function CN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ i("p", { className: R.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ n($N, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ i("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: mr(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function SN(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function RN({ stage: e }) {
  return /* @__PURE__ */ i("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: bn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: SN(e.rolledBackThisWeek) })
  ] });
}
function TN(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function xN(e) {
  if (e.kind === "terminal") return `${bn(e.closedThisWeek)} this week`;
  const t = TN(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function LN({ stage: e, titleId: t }) {
  const a = kN[e.kind];
  return /* @__PURE__ */ i("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ i("span", { className: R.stageRow, children: [
      /* @__PURE__ */ i("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: xN(e) })
  ] });
}
function AN(e) {
  return e === "entry" || e === "agent";
}
function EN({ stage: e, onMount: t }) {
  return t === void 0 || !AN(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Mount agent" });
}
function IN({ stage: e, agentCards: t, onMount: a }) {
  const r = k();
  return /* @__PURE__ */ i("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(LN, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(CN, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(RN, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(EN, { stage: e, onMount: a })
  ] });
}
function MN(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function IT(e) {
  return MN(e) ? /* @__PURE__ */ n(IN, { ...e }) : /* @__PURE__ */ n(NN, { ...e });
}
const BN = "_row_1tdra_6", PN = "_name_1tdra_12", jN = "_compactRow_1tdra_13", qN = "_compactName_1tdra_13", ON = "_cell_1tdra_30", DN = "_chain_1tdra_45", FN = "_owner_1tdra_51", HN = "_mono_1tdra_57", WN = "_compactCell_1tdra_79", zN = "_stack_1tdra_96", KN = "_stat_1tdra_103", GN = "_identityLine_1tdra_110", UN = "_identity_1tdra_110", VN = "_ownerLine_1tdra_140", YN = "_link_1tdra_160", JN = "_gateMark_1tdra_166", QN = "_emptyChain_1tdra_171", XN = "_arrow_1tdra_177", ZN = "_muted_1tdra_182", e1 = "_define_1tdra_187", t1 = "_statValue_1tdra_194", n1 = "_policyId_1tdra_200", a1 = "_sub_1tdra_205", g = {
  row: BN,
  name: PN,
  compactRow: jN,
  compactName: qN,
  cell: ON,
  chain: DN,
  owner: FN,
  mono: HN,
  compactCell: WN,
  stack: zN,
  stat: KN,
  identityLine: GN,
  identity: UN,
  ownerLine: VN,
  link: YN,
  gateMark: JN,
  emptyChain: QN,
  arrow: XN,
  muted: ZN,
  define: e1,
  statValue: t1,
  policyId: n1,
  sub: a1
};
function wr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: l } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: l };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function r1(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function o1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function fr(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function l1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${fr(e.members)}`;
}
function i1(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ i("span", { className: g.stack, children: [
    /* @__PURE__ */ i("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: z(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: l1(e) })
  ] }) });
}
function _r({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ i(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function s1(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = wt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function c1({ stages: e, streamStep: t }) {
  const a = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((o, l) => /* @__PURE__ */ i("span", { className: g.link, children: [
    /* @__PURE__ */ n(_r, { name: o.name, gate: o.gate === !0, look: s1(l, a, t), size: "tag" }),
    l === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${l}`)) });
}
function d1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ i("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : c1(e) });
}
function vr(e) {
  return e === void 0 ? void 0 : !0;
}
function Zn(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": vr(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function u1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function h1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function m1({ stream: e, href: t, presentation: a }) {
  const r = o1(a.className);
  return /* @__PURE__ */ i("tr", { className: `${r} ward-streamrow`, onClick: wr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ge(e.streamStep, "chip") }, children: [
    i1(e, t),
    d1(e),
    Zn(h1(e.agents), e.agents === void 0 ? void 0 : r1(e.agents), "—"),
    u1(e.policy),
    Zn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function w1(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function MT(e) {
  if (w1(e)) return m1(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ i("tr", { className: g.row, onClick: wr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ i("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: z(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...jt(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(_r, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: g.mono, children: fr(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": vr(t.inFlightHint), children: ae(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : ue(t.p50) }) })
  ] });
}
const f1 = "_row_2u4ll_2", _1 = "_name_2u4ll_16", v1 = "_scope_2u4ll_24", At = {
  row: f1,
  name: _1,
  scope: v1
};
function pn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function b1(e) {
  return e === void 0 ? `${At.row} ward-toolrow` : `${At.row} ward-toolrow ${e}`;
}
function p1(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function g1({ id: e, reasonId: t, tool: a, state: r, onChange: o }) {
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
function y1({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: pn(e) });
}
function N1({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${At.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function k1(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function BT({ tool: e, onChange: t, presentation: a }) {
  const r = k(), o = k(), l = p1(e, a), s = k1(a);
  return /* @__PURE__ */ i(s, { className: b1(a == null ? void 0 : a.className), "data-locked": l.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(g1, { id: r, reasonId: o, tool: e, state: l, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${At.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(N1, { tool: e, state: l, reasonId: o }),
    /* @__PURE__ */ n(y1, { classification: e.classification }),
    l.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const $1 = "_strip_4ppv9_2", C1 = "_well_4ppv9_11", S1 = "_head_4ppv9_18", R1 = "_name_4ppv9_24", T1 = "_chart_4ppv9_32", x1 = "_segment_4ppv9_38", L1 = "_detailedChart_4ppv9_44", A1 = "_rail_4ppv9_57", E1 = "_section_4ppv9_63", I1 = "_label_4ppv9_74", M1 = "_note_4ppv9_91", V = {
  strip: $1,
  well: C1,
  head: S1,
  name: R1,
  chart: T1,
  segment: x1,
  detailedChart: L1,
  rail: A1,
  section: E1,
  label: I1,
  note: M1
}, B1 = "No item in flight to preview.", P1 = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", j1 = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", tn = [1, 2, 3, 4, 5, 6], Et = 100;
function q1(e, t) {
  return t.has(e) ? ge(e, "id") : "var(--ward-color-line)";
}
function O1({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: tn.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: o * Et,
      y: "0",
      width: Et,
      height: "8",
      fill: q1(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function D1(e) {
  const t = e.slice(0, tn.length);
  for (; t.length < tn.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function F1({ identities: e }) {
  return /* @__PURE__ */ i("figure", { className: `${V.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, a) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(a * Et),
        y: "0",
        width: String(Et),
        height: "40",
        style: { fill: ge(t.streamStep, "chip") }
      },
      t.key + String(a)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((t, a) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(a))) })
  ] });
}
function br(e) {
  return (t) => e == null ? void 0 : e(t);
}
function bt({ label: e, children: t }) {
  const a = k();
  return /* @__PURE__ */ i("section", { className: V.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: V.label, children: e }),
    t
  ] });
}
function H1({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: t ?? B1 }) : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Dt, { item: { ...e, streamStep: wt(a.streamStep) }, onOpen: br(r), feed: null }) });
}
function W1({ draft: e }) {
  const t = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ i("p", { className: V.head, style: t, children: [
    /* @__PURE__ */ n(He, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...jt(e.key, e.streamStep) })
  ] });
}
function z1(e) {
  const t = D1(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ i("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(bt, { label: "Board card", children: /* @__PURE__ */ n(H1, { ...e, draft: a }) }),
    /* @__PURE__ */ n(bt, { label: "Streams index row", children: /* @__PURE__ */ n(W1, { draft: a }) }),
    /* @__PURE__ */ i(bt, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(F1, { identities: t }),
      /* @__PURE__ */ n("p", { className: V.note, children: P1 })
    ] }),
    /* @__PURE__ */ n(bt, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: j1 }) })
  ] });
}
function K1({ draft: e, sample: t, streams: a, onOpen: r }) {
  const o = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ i("section", { className: V.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ i("div", { className: V.head, children: [
      /* @__PURE__ */ n(He, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...jt(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Dt, { item: { ...t, streamStep: e.streamStep }, onOpen: br(r) }) }),
    /* @__PURE__ */ n(O1, { draft: e, streams: a })
  ] });
}
function PT(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(z1, { ...e }) : /* @__PURE__ */ n(K1, { ...e });
}
const G1 = "_row_ixlg5_6", U1 = "_headCell_ixlg5_10", V1 = "_cell_ixlg5_11", Y1 = "_name_ixlg5_23", J1 = "_consequence_ixlg5_29", Q1 = "_governed_ixlg5_36", X1 = "_control_ixlg5_42", Z1 = "_byRole_ixlg5_48", ek = "_webControl_ixlg5_59", tk = "_webConsequence_ixlg5_65", nk = "_webGoverned_ixlg5_71", W = {
  row: G1,
  headCell: U1,
  cell: V1,
  name: Y1,
  consequence: J1,
  governed: Q1,
  control: X1,
  byRole: Z1,
  webControl: ek,
  webConsequence: tk,
  webGoverned: nk
};
function ak({
  capability: e,
  cell: t,
  onChange: a
}) {
  return t.value === "byRole" ? /* @__PURE__ */ n("span", { className: W.byRole, children: "by role" }) : /* @__PURE__ */ i("span", { className: W.control, children: [
    /* @__PURE__ */ n(
      Ve,
      {
        label: `${e.name} · ${t.stream}`,
        checked: t.value !== "off",
        onChange: (r) => a(t.streamStep, r)
      }
    ),
    t.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "Pilot" })
  ] });
}
function rk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: W.headCell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: W.consequence, children: e.consequence }),
      /* @__PURE__ */ i("span", { className: W.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(ak, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function ok(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function lk({ name: e, cell: t, onChange: a }) {
  if (t.value === "byRole") return /* @__PURE__ */ n("span", { className: `${W.webControl} ${W.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Ve,
    {
      label: `${e} · step ${t.streamStep}`,
      checked: t.value === "on",
      disabled: a === void 0,
      onChange: (o) => a == null ? void 0 : a(t.streamStep, o ? "on" : "off")
    }
  );
  return t.value !== "pilot" ? r : /* @__PURE__ */ i("span", { className: `${W.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function ik({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ i("td", { className: W.cell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${W.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(lk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webGoverned} ward-cellmeta`, children: ok(e) }) })
  ] });
}
function jT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ik, { ...e }) : /* @__PURE__ */ n(rk, { ...e });
}
const sk = "_row_vv64h_2", ck = "_cell_vv64h_6", dk = "_name_vv64h_25", uk = "_note_vv64h_30", hk = "_webName_vv64h_41", mk = "_webMeta_vv64h_47", X = {
  row: sk,
  cell: ck,
  name: dk,
  note: uk,
  webName: hk,
  webMeta: mk
}, pr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function wk(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function fk({ component: e, onRestart: t }) {
  const a = k(), r = pr[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ i("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: X.name, children: e.name }) }),
    /* @__PURE__ */ i("td", { className: X.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { id: a, className: X.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: X.cell, "data-align": "end", children: o ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function _k({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: wk(e.state) });
}
function vk({ component: e, onRestart: t }) {
  return /* @__PURE__ */ i("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { ...pr[e.state] }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(_k, { component: e, onRestart: t }) })
  ] });
}
function qT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(vk, { ...e }) : /* @__PURE__ */ n(fk, { ...e });
}
const bk = "_row_jcm5k_7", pk = "_cell_jcm5k_11", gk = "_next_jcm5k_28", yk = "_headCell_jcm5k_38", Nk = "_webId_jcm5k_77", kk = "_webPurpose_jcm5k_83", $k = "_webMeta_jcm5k_91", Ck = "_webUrgent_jcm5k_97", K = {
  row: bk,
  cell: pk,
  next: gk,
  headCell: yk,
  webId: Nk,
  webPurpose: kk,
  webMeta: $k,
  webUrgent: Ck
}, Sk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, Rk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, gr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Tk = Object.fromEntries(gr.map((e) => [e.key, e]));
function Qe({ column: e, children: t }) {
  const a = Tk[e];
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
function OT() {
  return /* @__PURE__ */ n("tr", { children: gr.map((e) => /* @__PURE__ */ n(
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
function xk({ cred: e }) {
  const t = Sk[e.state];
  return /* @__PURE__ */ i("tr", { className: K.row, children: [
    /* @__PURE__ */ n(Qe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Qe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Qe, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(Qe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: pn(e.cls) }) }),
    /* @__PURE__ */ n(Qe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Qe, { column: "next", children: /* @__PURE__ */ n("span", { className: K.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Lk({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${K.webMeta} ${K.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function Ak({ cred: e }) {
  return /* @__PURE__ */ i("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(Lk, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...Rk[e.state] }) })
  ] });
}
function DT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ak, { ...e }) : /* @__PURE__ */ n(xk, { ...e });
}
const Ek = "_card_lpp45_2", Ik = "_head_lpp45_11", Mk = "_env_lpp45_18", Bk = "_version_lpp45_25", Pk = "_meta_lpp45_32", jk = "_webCard_lpp45_37", qk = "_webRow_lpp45_47", Ok = "_webTitle_lpp45_55", Dk = "_webLine_lpp45_65", Fk = "_webVersion_lpp45_72", Hk = "_webMeta_lpp45_77", Q = {
  card: Ek,
  head: Ik,
  env: Mk,
  version: Bk,
  meta: Pk,
  webCard: jk,
  webRow: qk,
  webTitle: Ok,
  webLine: Dk,
  webVersion: Fk,
  webMeta: Hk
}, ea = { dev: "Dev", uat: "UAT", prod: "Prod" }, yr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function Wk({ env: e }) {
  const t = yr[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ i("section", { className: Q.card, "aria-label": ea[e.env], children: [
    /* @__PURE__ */ i("div", { className: Q.head, children: [
      /* @__PURE__ */ n("span", { className: Q.env, children: ea[e.env] }),
      /* @__PURE__ */ n(m, { role: t.role, label: t.label })
    ] }),
    /* @__PURE__ */ n("p", { className: Q.version, children: e.version }),
    /* @__PURE__ */ i("p", { className: Q.meta, children: [
      "deployed ",
      he(e.deployedAt)
    ] }),
    a && /* @__PURE__ */ n("p", { className: Q.meta, children: a })
  ] });
}
function zk(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function Kk(e) {
  return /* @__PURE__ */ i("article", { className: `${Q.webCard} ward-envcard`, children: [
    /* @__PURE__ */ i("span", { className: `${Q.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Q.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...yr[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Q.version} ${Q.webVersion} ${Q.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Q.meta} ${Q.webMeta} ${Q.webLine} ward-cellmeta`, children: zk(e) })
  ] });
}
function FT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Kk, { ...e }) : /* @__PURE__ */ n(Wk, { ...e });
}
const Gk = "_panel_1hmja_2", Uk = "_line_1hmja_8", Vk = "_actions_1hmja_14", pt = {
  panel: Gk,
  line: Uk,
  actions: Vk
};
function HT(e) {
  return /* @__PURE__ */ i("div", { className: pt.panel, children: [
    /* @__PURE__ */ n("p", { className: pt.line, children: e.status }),
    /* @__PURE__ */ n(j, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: pt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: pt.line, children: e.note ?? "" })
  ] });
}
const Yk = "_upload_13fcl_2", Jk = "_preview_13fcl_7", Qk = "_mark_13fcl_17", Xk = "_empty_13fcl_22", Zk = "_actions_13fcl_28", e$ = "_input_13fcl_33", t$ = "_reasons_13fcl_41", n$ = "_reason_13fcl_41", a$ = "_accepted_13fcl_57", oe = {
  upload: Yk,
  preview: Jk,
  mark: Qk,
  empty: Xk,
  actions: Zk,
  input: e$,
  reasons: t$,
  reason: n$,
  accepted: a$
}, Nr = 1.5, kr = 22, It = "script elements or event handlers", Pe = "links or external references", xe = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Nr}px at ${kr}px`], r$ = [xe[1], xe[2], It, Pe], o$ = /* @__PURE__ */ new Map([
  ["image", xe[1]],
  ["text", xe[2]],
  ["tspan", xe[2]],
  ["textPath", xe[2]],
  ["script", It],
  ["foreignObject", It],
  ["a", Pe],
  ["use", Pe],
  ["style", Pe],
  ["feImage", Pe],
  ["set", Pe]
]), l$ = "http://www.w3.org/2000/svg", i$ = "http://www.w3.org/2000/xmlns/", s$ = /* @__PURE__ */ new Set([
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
]), c$ = /* @__PURE__ */ new Set([
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
]), gn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, d$ = /url\s*\(|['"\\]/i;
function u$() {
  return { ok: !1, reasons: [xe[1]] };
}
function $r(e) {
  return e.namespaceURI === l$;
}
function h$(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && $r(t) ? t : null;
  } catch {
    return null;
  }
}
function m$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [xe[0]] : [];
}
function w$(e) {
  return o$.get(e.localName) ?? (e.localName.startsWith("animate") ? Pe : void 0);
}
function f$(e) {
  return d$.test(e.replace(gn, ""));
}
function _$(e) {
  return /^on/i.test(e.localName) ? It : e.localName === "href" || f$(e.value) ? Pe : void 0;
}
function v$(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(w$(a));
    for (const r of Array.from(a.attributes)) t.add(_$(r));
  }
  return r$.filter((a) => t.has(a));
}
function b$(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((o) => Number.isFinite(o) && o > 0), 0), r = a > 0 ? kr / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const l = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(l) && l * r < Nr;
  }) ? [xe[3]] : [];
}
function p$(e) {
  if (e.namespaceURI === i$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (c$.has(t) || t.startsWith("stroke"));
}
function g$(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && $r(t) && s$.has(t.localName);
}
function y$(e, t) {
  g$(t) ? t.nodeType === Node.ELEMENT_NODE && Cr(t) : e.removeChild(t);
}
function Cr(e) {
  for (const t of Array.from(e.attributes)) p$(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) y$(e, t);
  return e;
}
function N$(e) {
  return Array.from(e.matchAll(gn), (t) => t[2]).filter((t) => t !== "");
}
function k$(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function $$(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const l of N$(o.value)) a.has(l) || a.set(l, `${t}-${a.size}`);
  return a;
}
function C$(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(gn, (r, o, l) => {
      const s = t.get(l);
      return s === void 0 ? r : r.replace(`#${l}`, `#${s}`);
    });
}
function S$(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = $$(a, t);
  for (const o of a) {
    const l = r.get(o.getAttribute("id") ?? "");
    l === void 0 ? o.removeAttribute("id") : o.setAttribute("id", l), C$(o, r);
  }
  return e;
}
function WT(e) {
  const t = h$(e);
  if (t === null) return u$();
  const a = [...m$(t), ...v$(t), ...b$(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(S$(Cr(t), k$(e))) };
}
const R$ = "Mark accepted.", T$ = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, x$ = new Set(ua.flatMap((e) => [ge(e, "id"), ge(e, "chip")]));
function L$(e) {
  return e !== void 0 && (T$.test(e) || x$.has(e)) ? e : void 0;
}
function A$({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: oe.preview, style: { "--mark": L$(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: oe.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: oe.empty }) });
}
function E$(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function I$(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function M$({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: oe.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("p", { className: oe.accepted, children: R$ }) }) : /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("ul", { className: oe.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: oe.reason, children: t }, t)) }) });
}
function B$({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(M$, { result: e }) : /* @__PURE__ */ n("p", { className: `${oe.result} ${E$(e, a)}`, role: "status", children: I$(e, a) });
}
function ta(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function zT({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: o }) {
  const l = _(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ i("div", { className: oe.upload, children: [
    /* @__PURE__ */ n(A$, { current: e }),
    /* @__PURE__ */ i("div", { className: oe.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: l,
          className: oe.input,
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
      /* @__PURE__ */ n(b, { ...ta(o), onClick: () => {
        var u;
        return (u = l.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...ta(o), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(B$, { result: s, presentation: r })
  ] });
}
const P$ = "_row_o3t6y_7", j$ = "_cell_o3t6y_11", q$ = "_head_o3t6y_28", O$ = "_name_o3t6y_34", D$ = "_pinned_o3t6y_42", F$ = "_headCell_o3t6y_49", H$ = "_webName_o3t6y_88", W$ = "_webMeta_o3t6y_95", z$ = "_webWarn_o3t6y_103", D = {
  row: P$,
  cell: j$,
  head: q$,
  name: O$,
  pinned: D$,
  headCell: F$,
  webName: H$,
  webMeta: W$,
  webWarn: z$
}, yn = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Sr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], K$ = Object.fromEntries(Sr.map((e) => [e.key, e]));
function G$(e, t) {
  return `mcp.${e}.${t}`;
}
function U$(e) {
  return Object.keys(yn).includes(e);
}
function V$(e) {
  return yn[e !== void 0 && U$(e) ? e : "unknown"];
}
function ot({ column: e, children: t }) {
  const a = K$[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: D.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: t
    }
  );
}
function KT() {
  return /* @__PURE__ */ n("tr", { children: Sr.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: D.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function Y$({ server: e }) {
  const t = yn[e.connection];
  return /* @__PURE__ */ i("tr", { className: D.row, children: [
    /* @__PURE__ */ i(ot, { column: "name", children: [
      /* @__PURE__ */ i("span", { className: D.head, children: [
        /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: pn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ i("span", { className: D.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(ot, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(ot, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(ot, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(ot, { column: "tools", children: e.tools.map((a) => G$(e.name, a)).join(" · ") })
  ] });
}
function J$(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Q$(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function X$({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${D.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e });
}
function Z$({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function e0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function t0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ i("tr", { className: D.row, children: [
    /* @__PURE__ */ i("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: `${D.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: J$(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta ward-truncate`, title: o.map((l) => l.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...Q$(e) }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(X$, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...V$(e.connection) }) }),
    /* @__PURE__ */ i("td", { className: D.cell, children: [
      /* @__PURE__ */ n(Z$, { server: e, onRestart: t }),
      /* @__PURE__ */ n(e0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function GT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(t0, { ...e }) : /* @__PURE__ */ n(Y$, { ...e });
}
const n0 = "_row_1ibo7_2", a0 = "_headCell_1ibo7_14", r0 = "_cell_1ibo7_15", o0 = "_name_1ibo7_26", l0 = "_consequence_1ibo7_32", i0 = "_reason_1ibo7_38", s0 = "_value_1ibo7_44", c0 = "_webRow_1ibo7_60", d0 = "_webSetting_1ibo7_73", u0 = "_webName_1ibo7_81", h0 = "_webConsequence_1ibo7_89", m0 = "_webControl_1ibo7_95", w0 = "_webState_1ibo7_109", f0 = "_webChip_1ibo7_114", P = {
  row: n0,
  headCell: a0,
  cell: r0,
  name: o0,
  consequence: l0,
  reason: i0,
  value: s0,
  webRow: c0,
  webSetting: d0,
  webName: u0,
  webConsequence: h0,
  webControl: m0,
  webState: w0,
  webChip: f0
}, Rr = 104, Tr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function _0({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ve, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(Fa, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: P.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function v0({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = k(), l = Tr[a], s = a === "locked";
  return /* @__PURE__ */ i("tr", { className: P.row, "data-inheritance": a, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: P.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(_0, { control: t, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: P.cell, style: { width: Rr }, children: /* @__PURE__ */ n(m, { role: l.role, label: l.label }) })
  ] });
}
function xr(e, t) {
  return String(e ?? t);
}
function b0(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function p0(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? xr(e.value, "—");
}
function g0({ control: e, name: t, locked: a, describedBy: r, onChange: o }) {
  const l = e.value === !0;
  return /* @__PURE__ */ i("span", { className: P.webControl, children: [
    /* @__PURE__ */ n(Ve, { label: t, labelHidden: !0, checked: l, locked: a, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ n("span", { className: P.webState, "aria-hidden": "true", children: a || l ? "on" : "off" })
  ] });
}
function y0(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(g0, { ...e });
  const o = b0(t, a);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: P.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(Fa, { options: o, value: xr(t.value, ""), onChange: (l) => r == null ? void 0 : r(l) }) }) : /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: p0(t) });
}
function N0({ setting: e, control: t, inheritance: a, reason: r, onChange: o, renderControl: l }) {
  const s = k(), c = a === "locked";
  return /* @__PURE__ */ i("div", { className: `${P.row} ${P.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ i("span", { className: P.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${P.name} ${P.webName}`, children: e.name }),
      /* @__PURE__ */ i("p", { id: s, className: `${P.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    l ? /* @__PURE__ */ n("span", { className: P.webControl, children: l(s) }) : /* @__PURE__ */ n(y0, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${P.webChip} ward-policy-chip`, style: { width: Rr }, children: /* @__PURE__ */ n(m, { ...Tr[a], size: "tag" }) })
  ] });
}
function UT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(N0, { ...e }) : /* @__PURE__ */ n(v0, { ...e });
}
const k0 = "_label_h9m4w_7", $0 = "_name_h9m4w_15", C0 = "_column_h9m4w_24", S0 = "_webFrame_h9m4w_57", R0 = "_webHead_h9m4w_62", T0 = "_webHeadLabel_h9m4w_74", x0 = "_webLabel_h9m4w_117", L0 = "_webColumns_h9m4w_124", A0 = "_webGroup_h9m4w_130", E0 = "_webPeople_h9m4w_131", I0 = "_webVia_h9m4w_132", M0 = "_webMeta_h9m4w_161", G = {
  label: k0,
  name: $0,
  column: C0,
  webFrame: S0,
  webHead: R0,
  webHeadLabel: T0,
  webLabel: x0,
  webColumns: L0,
  webGroup: A0,
  webPeople: E0,
  webVia: I0,
  webMeta: M0
}, B0 = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, Vt = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Yt({ column: e, children: t }) {
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
function P0(e) {
  if (!e.matrixRole) return;
  const t = B0[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function j0({ node: e }) {
  const t = P0(e);
  return /* @__PURE__ */ i("span", { className: G.label, children: [
    /* @__PURE__ */ n("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ n(q0, { role: t, node: e }),
    /* @__PURE__ */ n(Yt, { column: Vt[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Yt, { column: Vt[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Yt, { column: Vt[2], children: e.requestedVia ?? "" })
  ] });
}
function q0({ role: e, node: t }) {
  return /* @__PURE__ */ i(x, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function O0({ index: e, depth: t, node: a, expanded: r, leaf: o, onToggle: l, children: s }) {
  return /* @__PURE__ */ n(
    Va,
    {
      index: e,
      depth: t,
      leaf: o,
      expanded: r,
      onToggle: l,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(j0, { node: a }),
      children: s
    }
  );
}
function Jt({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function D0({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${G.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Jt, { className: `${G.webMeta} ${G.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Jt, { className: `${G.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Jt, { className: `${G.webMeta} ${G.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function F0() {
  return /* @__PURE__ */ i("div", { className: G.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: G.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ i("span", { className: G.webColumns, children: [
      /* @__PURE__ */ n("span", { className: G.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: G.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: G.webVia, children: "Requested via" })
    ] })
  ] });
}
function H0({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${G.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function W0(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function z0({ rows: e, label: t }) {
  return /* @__PURE__ */ i("div", { className: G.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(F0, {}),
    /* @__PURE__ */ n(gw, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      Va,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(H0, { row: a }),
        detail: /* @__PURE__ */ n(D0, { row: a }),
        expanded: W0(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function VT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(z0, { ...e }) : /* @__PURE__ */ n(O0, { ...e });
}
const K0 = "_runbook_b9agc_2", G0 = "_list_b9agc_7", U0 = "_step_b9agc_15", V0 = "_numeral_b9agc_21", Y0 = "_body_b9agc_28", J0 = "_head_b9agc_34", Q0 = "_title_b9agc_40", X0 = "_detail_b9agc_45", Z0 = "_actions_b9agc_50", eC = "_webList_b9agc_56", tC = "_webStep_b9agc_60", nC = "_webBody_b9agc_66", aC = "_webTitle_b9agc_74", rC = "_webDetail_b9agc_78", I = {
  runbook: K0,
  list: G0,
  step: U0,
  numeral: V0,
  body: Y0,
  head: J0,
  title: Q0,
  detail: X0,
  actions: Z0,
  webList: eC,
  webStep: tC,
  webBody: nC,
  webTitle: aC,
  webDetail: rC
}, Lr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Ar(e) {
  return String(e + 1).padStart(2, "0");
}
function oC({ step: e, index: t, connection: a }) {
  const r = Lr[e.state], o = e.state === "running";
  return /* @__PURE__ */ i("li", { className: I.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.numeral, children: Ar(t) }),
    /* @__PURE__ */ i("span", { className: I.body, children: [
      /* @__PURE__ */ i("span", { className: I.head, children: [
        /* @__PURE__ */ n("span", { className: I.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        o && e.startedAt && /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ n("span", { className: I.detail, children: e.detail })
    ] })
  ] });
}
function lC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: I.runbook, children: [
    /* @__PURE__ */ n("ol", { className: I.list, children: e.map((r, o) => /* @__PURE__ */ n(oC, { step: r, index: o, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: I.actions, children: t })
  ] });
}
function iC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ i("li", { className: `${I.step} ${I.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${I.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Ar(t) }),
    /* @__PURE__ */ i("span", { className: `${I.body} ${I.webBody}`, children: [
      /* @__PURE__ */ i("span", { className: `${I.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${I.title} ${I.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Lr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${I.detail} ${I.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function sC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: I.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${I.list} ${I.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(iC, { step: r, index: o, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${I.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function YT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(sC, { ...e }) : /* @__PURE__ */ n(lC, { ...e });
}
const cC = "_list_1gu6a_2", dC = "_check_1gu6a_10", uC = "_body_1gu6a_16", hC = "_text_1gu6a_23", mC = "_pending_1gu6a_32", wC = "_measured_1gu6a_37", Ze = {
  list: cC,
  check: dC,
  body: uC,
  text: hC,
  pending: mC,
  measured: wC
};
function fC(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function _C({ check: e }) {
  const t = fC(e.passed);
  return /* @__PURE__ */ i("li", { className: `${Ze.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(mn, { state: t.state, label: t.label }),
    /* @__PURE__ */ i("span", { className: Ze.body, children: [
      /* @__PURE__ */ n("span", { className: Ze.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ i("span", { className: Ze.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: Ze.measured, children: e.measured })
  ] });
}
function JT({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Ze.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(_C, { check: t }, t.text)) });
}
const vC = "_root_y6bbq_2", bC = "_list_y6bbq_10", pC = "_line_y6bbq_32", gC = "_at_y6bbq_59", yC = "_text_y6bbq_63", NC = "_foot_y6bbq_67", kC = "_idle_y6bbq_79", $C = "_caret_y6bbq_87", CC = "_jump_y6bbq_94", ve = {
  root: vC,
  list: bC,
  line: pC,
  at: gC,
  text: yC,
  foot: NC,
  idle: kC,
  caret: $C,
  jump: CC
}, SC = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Nn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : SC.format(new Date(e));
}
const RC = { warn: "warning", ok: "ok" };
function TC({ kind: e }) {
  const t = RC[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function xC({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Nn(e)}` });
}
function LC({ connection: e, idleSince: t, last: a, children: r }) {
  const o = [t, a == null ? void 0 : a.at, ""].find(Boolean), l = {
    stale: `no new events as of ${Nn(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ i("p", { className: `${ve.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ve.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ve.idle, children: l }),
    /* @__PURE__ */ n(xC, { at: a == null ? void 0 : a.at }),
    r
  ] });
}
const AC = 8;
function EC(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > AC;
}
function IC({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const Er = Ne(null);
function QT({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, o] = p(!1), l = la(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(Er.Provider, { value: l, children: a });
}
function MC() {
  const e = ye(Er), [t, a] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const BC = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function XT({ lines: e, connection: t, idleSince: a, label: r = "Live activity", fixed: o }) {
  const l = _(null), [s, c] = p(0), [d, u] = MC(), [h, w] = p(!1), f = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), tt(() => {
    const N = l.current;
    N && !h && (N.scrollTop = N.scrollHeight);
  }, [e.length, h]);
  const y = () => {
    var q;
    const N = l.current;
    if (!N) return;
    const A = N.querySelectorAll("[data-consline-text]");
    (q = A.item(A.length - 1)) == null || q.focus(), w(!1);
  };
  return /* @__PURE__ */ i("div", { className: ve.root, children: [
    /* @__PURE__ */ n("ol", { className: ve.list, ref: l, "aria-live": d ? "polite" : "off", "aria-label": r, ...BC(e.length, o), onScroll: (N) => w(EC(N.currentTarget)), children: e.map((N, A) => /* @__PURE__ */ i("li", { className: `${ve.line} ward-consline ward-reveal ward-consline--${N.kind}`, "data-kind": N.kind, "data-revealed": A < s, children: [
      /* @__PURE__ */ n("span", { className: ve.at, children: Nn(N.at) }),
      /* @__PURE__ */ n(TC, { kind: N.kind }),
      /* @__PURE__ */ n("span", { className: ve.text, "data-consline-text": !0, tabIndex: -1, children: N.text })
    ] }, `${N.at}-${A}`)) }),
    /* @__PURE__ */ i(LC, { connection: t, idleSince: a, last: f, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(IC, { shown: h, onJump: y })
    ] })
  ] });
}
const PC = "_row_1k8wl_2", jC = "_head_1k8wl_14", qC = "_author_1k8wl_20", OC = "_eta_1k8wl_25", DC = "_edited_1k8wl_26", FC = "_body_1k8wl_32", HC = "_reason_1k8wl_37", WC = "_actions_1k8wl_42", Ce = {
  row: PC,
  head: jC,
  author: qC,
  eta: OC,
  edited: DC,
  body: FC,
  reason: HC,
  actions: WC
}, zC = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function KC(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function GC({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: o, onViewOriginal: l }) {
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
function UC({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Ce.reason, id: t, children: e })
  ] });
}
function VC(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function YC(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(GC, { ...e }) : /* @__PURE__ */ n(UC, { reason: e.unavailable, reasonId: e.unavailableId });
}
function ZT(e) {
  const { comment: t } = e;
  VC(e);
  const a = k(), r = `${a}-unavailable`, o = zC[t.delivery];
  return /* @__PURE__ */ i("div", { className: `${Ce.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ i("div", { className: Ce.head, children: [
      /* @__PURE__ */ n("span", { className: Ce.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: Ce.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Ce.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Ce.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Ce.reason, id: a, children: KC(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Ce.actions, children: /* @__PURE__ */ n(YC, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const JC = "_root_rvhdw_2", QC = "_attach_rvhdw_11", XC = "_actions_rvhdw_17", ZC = "_reply_rvhdw_23", eS = "_replyField_rvhdw_28", tS = "_send_rvhdw_54", nS = "_sendIcon_rvhdw_65", aS = "_sendsAs_rvhdw_75", Oe = {
  root: JC,
  attach: QC,
  actions: XC,
  reply: ZC,
  replyField: eS,
  send: tS,
  sendIcon: nS,
  sendsAs: aS
};
function Ir({ value: e, onChange: t }) {
  const [a, r] = p("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function rS() {
  return /* @__PURE__ */ n("svg", { className: Oe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function oS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function lS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [o, l] = Ir(e), s = k(), c = () => {
    o.trim() !== "" && r(a, o);
  }, d = (u) => {
    oS(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ i("div", { className: Oe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ i("div", { className: Oe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ n(j, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: o, onChange: l, describedBy: s }),
      /* @__PURE__ */ i(b, { variant: "primary", className: Oe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ n(rS, {}),
        /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Oe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function ex(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(lS, { ...e }) : /* @__PURE__ */ n(iS, { ...e });
}
function iS(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: o, onPost: l, onDraft: s } = e, [c, d] = Ir(e);
  return /* @__PURE__ */ i("div", { className: Oe.root, children: [
    /* @__PURE__ */ n(j, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ i("div", { className: Oe.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    o && /* @__PURE__ */ n(
      ga,
      {
        label: `Requeue ${o.agent} after posting`,
        consequence: o.consequence,
        checked: o.checked,
        onChange: o.onChange
      }
    ),
    /* @__PURE__ */ i("div", { className: Oe.actions, children: [
      /* @__PURE__ */ n(b, { variant: "primary", onClick: () => l(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const sS = "_list_1yhks_2", cS = "_item_1yhks_6", dS = "_body_1yhks_22", uS = "_text_1yhks_28", hS = "_evidence_1yhks_37", mS = "_consequence_1yhks_49", wS = "_note_1yhks_54", Ue = {
  list: sS,
  item: cS,
  body: dS,
  text: uS,
  evidence: hS,
  consequence: mS,
  note: wS
};
function fS({ criterion: e }) {
  return /* @__PURE__ */ n(He, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function na({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function _S(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function vS({ criterion: e }) {
  return /* @__PURE__ */ i("span", { className: Ue.body, children: [
    /* @__PURE__ */ n("span", { className: Ue.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(na, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Ue.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(na, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Ue.consequence, children: _S(e.why) })
    ] })
  ] });
}
function bS({ criterion: e }) {
  return /* @__PURE__ */ i("li", { className: Ue.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(fS, { criterion: e }),
    /* @__PURE__ */ n(vS, { criterion: e })
  ] });
}
function tx({ criteria: e }) {
  return /* @__PURE__ */ i("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(bS, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ n("p", { className: Ue.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const pS = "_list_dwhoz_2", gS = "_rung_dwhoz_6", yS = "_name_dwhoz_18", NS = "_actor_dwhoz_32", kt = {
  list: pS,
  rung: gS,
  name: yS,
  actor: NS
}, kS = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function $S({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = kS[e.state];
  return /* @__PURE__ */ i("li", { className: kt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: kt.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${kt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function nx({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${kt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n($S, { rung: t }, t.name)) });
}
const CS = "_sheet_pw37w_2", SS = "_title_pw37w_9", RS = "_stage_pw37w_15", TS = "_effects_pw37w_20", xS = "_effect_pw37w_20", LS = "_numeral_pw37w_31", AS = "_effectText_pw37w_38", ES = "_refusals_pw37w_43", IS = "_reasons_pw37w_52", MS = "_reason_pw37w_52", BS = "_actions_pw37w_62", we = {
  sheet: CS,
  title: SS,
  stage: RS,
  effects: TS,
  effect: xS,
  numeral: LS,
  effectText: AS,
  refusals: ES,
  reasons: IS,
  reason: MS,
  actions: BS
};
function PS({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function ax({ run: e, effects: t, refusals: a, cost: r, onRequeue: o, onClose: l, returnFocusTo: s }) {
  const c = k(), d = `${c}-refusal`, [u, h] = p(""), w = a.length > 0;
  return /* @__PURE__ */ n(rt, { kind: "sheet", labelledBy: c, onClose: l, returnFocusTo: s, children: /* @__PURE__ */ i("div", { className: we.sheet, children: [
    /* @__PURE__ */ i("h2", { className: we.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: we.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: we.effects, children: t.map((f, y) => /* @__PURE__ */ i("li", { className: we.effect, children: [
      /* @__PURE__ */ n("span", { className: we.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: we.effectText, children: f })
    ] }, f)) }),
    /* @__PURE__ */ n(
      em,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(j, { kind: "textarea", label: "Note for the agent", value: u, onChange: h }),
    w && /* @__PURE__ */ i("div", { className: we.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: we.reasons, children: a.map((f, y) => /* @__PURE__ */ n("li", { className: we.reason, id: y === 0 ? d : void 0, children: f.reason }, f.reason)) })
    ] }),
    /* @__PURE__ */ i("div", { className: we.actions, children: [
      /* @__PURE__ */ n(PS, { refused: w, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ n(b, { onClick: l, children: "Cancel" })
    ] })
  ] }) });
}
const jS = "_list_1laeg_2", qS = "_path_1laeg_7", OS = "_head_1laeg_21", DS = "_label_1laeg_28", FS = "_consequence_1laeg_35", it = {
  list: jS,
  path: qS,
  head: OS,
  label: DS,
  consequence: FS
}, nn = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function aa(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function ra(e) {
  return e ? "primary" : "secondary";
}
function HS({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: ra(t), size: "sm", onClick: () => a(e.kind), children: nn[e.kind] }) : /* @__PURE__ */ n(b, { variant: ra(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: nn[e.kind] });
}
function WS({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ i("li", { className: it.path, "data-allowed": e.allowed, "data-role": aa(e.requiredRole), children: [
    /* @__PURE__ */ i("span", { className: it.head, children: [
      /* @__PURE__ */ n("span", { className: it.label, children: e.title ?? nn[e.kind] }),
      /* @__PURE__ */ n(m, { role: aa(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: it.consequence, children: e.consequence }),
    /* @__PURE__ */ n(HS, { path: e, primary: t, onChoose: a })
  ] });
}
function rx({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: it.list, children: e.map((a, r) => /* @__PURE__ */ n(WS, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const zS = "_list_1m7i0_2", KS = "_item_1m7i0_6", GS = "_node_1m7i0_18", US = "_body_1m7i0_24", VS = "_head_1m7i0_30", YS = "_stage_1m7i0_36", JS = "_version_1m7i0_41", QS = "_sentence_1m7i0_49", XS = "_meta_1m7i0_54", Re = {
  list: zS,
  item: KS,
  node: GS,
  body: US,
  head: VS,
  stage: YS,
  version: JS,
  sentence: QS,
  meta: XS
}, ZS = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function eR({ entry: e }) {
  return /* @__PURE__ */ i("span", { className: Re.head, children: [
    /* @__PURE__ */ n("span", { className: Re.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Re.version, title: e.version, children: e.version }) : null
  ] });
}
function tR({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ i("li", { className: `${Re.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Re.node} ward-history-node`, children: /* @__PURE__ */ n(He, { size: 9, kind: ZS[e.state], label: e.state }) }),
    /* @__PURE__ */ i("span", { className: `${Re.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(eR, { entry: e }),
      /* @__PURE__ */ n("span", { className: Re.sentence, children: e.sentence }),
      /* @__PURE__ */ i("span", { className: `${Re.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function ox({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Re.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(tR, { entry: t }, t.stage + String(a))) });
}
const nR = "_thread_1e70p_3", aR = "_turn_1e70p_8", rR = "_who_1e70p_27", oR = "_body_1e70p_32", $t = {
  thread: nR,
  turn: aR,
  who: rR,
  body: oR
}, Mr = Ne(!1);
function lx({ children: e, density: t }) {
  return /* @__PURE__ */ n(Mr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${$t.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function ix({ turn: e }) {
  if (!ye(Mr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ i("li", { className: `${$t.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ i("span", { className: `${$t.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${$t.body} ward-chat-body`, children: e.body })
  ] });
}
const lR = "_list_yiolt_3", iR = "_row_yiolt_7", sR = "_label_yiolt_20", cR = "_n_yiolt_26", dR = "_cause_yiolt_33", ct = {
  list: lR,
  row: iR,
  label: sR,
  n: cR,
  cause: dR
};
function uR(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const hR = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function mR({ row: e, formatNumber: t }) {
  return uR(e), /* @__PURE__ */ i("li", { className: `${ct.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(He, { size: 8, ...hR[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: ct.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${ct.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(wR, { cause: e.cause })
  ] });
}
function wR({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${ct.cause} ward-healthrow-cause`, children: e }) : null;
}
function sx({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${ct.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(mR, { row: a, formatNumber: t }, a.label)) });
}
const fR = "_root_1jxwp_2", _R = {
  root: fR
};
function cx({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ i("div", { className: _R.root, "data-density": o, children: [
    /* @__PURE__ */ n(Ft, { items: e, note: t, density: o }),
    /* @__PURE__ */ n(b, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const vR = "_row_dhbre_3", bR = "_key_dhbre_13", pR = "_stack_dhbre_24", gR = "_value_dhbre_32", yR = "_evidence_dhbre_39", NR = "_mark_dhbre_47", Xe = {
  row: vR,
  key: bR,
  stack: pR,
  value: gR,
  evidence: yR,
  mark: NR
};
function kR({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(mn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function dx({ field: e }) {
  return /* @__PURE__ */ i("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ i("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(kR, { state: e.state }) })
  ] });
}
const $R = "_cell_gh2sd_2", CR = {
  cell: $R
}, SR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function RR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function TR(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function xR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: RR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function LR(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function ux({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  TR(e, a);
  const r = LR(e);
  return /* @__PURE__ */ n(
    wm,
    {
      label: "Rejection routing",
      columns: SR,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, l) => /* @__PURE__ */ n("span", { className: CR.cell, "data-norerun": o.noRerun ? !0 : void 0, children: xR(o, l) }),
      empty: t ?? /* @__PURE__ */ n(lf, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const AR = "_row_1f2re_2", ER = "_title_1f2re_12", IR = "_turns_1f2re_18", MR = "_waiting_1f2re_19", BR = "_resolved_1f2re_20", PR = "_activity_1f2re_21", jR = "_cost_1f2re_28", qR = "_link_1f2re_29", OR = "_tableLink_1f2re_47", DR = "_tableRecord_1f2re_48", FR = "_tableRow_1f2re_59", HR = "_tableTitle_1f2re_71", WR = "_tableResolved_1f2re_76", zR = "_tableMeta_1f2re_87", KR = "_tableCost_1f2re_94", GR = "_tableActivity_1f2re_95", UR = "_tableState_1f2re_105", H = {
  row: AR,
  title: ER,
  turns: IR,
  waiting: MR,
  resolved: BR,
  activity: PR,
  cost: jR,
  link: qR,
  tableLink: OR,
  tableRecord: DR,
  tableRow: FR,
  tableTitle: HR,
  tableResolved: WR,
  tableMeta: zR,
  tableCost: KR,
  tableActivity: GR,
  tableState: UR
}, Br = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function VR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function YR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function JR(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const QR = { duplicate: "Closed · duplicate" };
function XR({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(nt, { className: H.tableMeta, text: `waiting on ${e}` });
}
function ZR({ value: e }) {
  return /* @__PURE__ */ n("td", { className: H.tableCost, children: e === void 0 ? null : le(e) });
}
function e2({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${H.tableRecord} ward-target`, href: z(e.href), children: `→ ${e.key}` });
}
function t2({ session: e, href: t }) {
  const a = Br[e.state];
  return /* @__PURE__ */ i("tr", { className: H.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ i("td", { className: H.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${H.tableLink} ward-target`, href: z(t), children: /* @__PURE__ */ n(nt, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: H.tableMeta, children: YR(e) })
    ] }),
    /* @__PURE__ */ i("td", { className: H.tableResolved, children: [
      JR(e.resolved),
      /* @__PURE__ */ n(XR, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(ZR, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: H.tableActivity, children: VR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: H.tableState, children: /* @__PURE__ */ i("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: QR[e.state] ?? a.label }),
      /* @__PURE__ */ n(e2, { link: e.link })
    ] }) })
  ] });
}
function n2({ session: e }) {
  const t = Br[e.state];
  return /* @__PURE__ */ i("div", { className: H.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(nt, { className: H.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: H.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(nt, { className: H.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: H.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: H.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : le(e.cost) }),
    /* @__PURE__ */ n("span", { className: H.activity, children: he(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: H.link, href: z(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function hx(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(t2, { session: e.session, href: e.href }) : /* @__PURE__ */ n(n2, { session: e.session });
}
const a2 = "_block_1yy2v_3", r2 = "_list_1yy2v_9", o2 = "_line_1yy2v_14", an = {
  block: a2,
  list: r2,
  line: o2
}, l2 = { warn: "warning", ok: "ok" };
function i2({ kind: e }) {
  const t = l2[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function s2({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ i("li", { className: `${an.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(i2, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function mx({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${an.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: an.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(s2, { line: a }, `${r}-${a.text}`)) }) });
}
const c2 = "_band_tt7hp_1", d2 = "_head_tt7hp_8", u2 = "_cell_tt7hp_19", h2 = "_index_tt7hp_35", m2 = "_title_tt7hp_42", w2 = "_note_tt7hp_48", f2 = "_cellTitle_tt7hp_53", _2 = "_cellBody_tt7hp_58", v2 = "_tag_tt7hp_64", $e = {
  band: c2,
  head: d2,
  cell: u2,
  index: h2,
  title: m2,
  note: w2,
  cellTitle: f2,
  cellBody: _2,
  tag: v2
}, oa = 4;
function wx({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== oa)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${oa}-cell grid`);
  return /* @__PURE__ */ i("section", { className: $e.band, "aria-label": `${e} ${t}`, children: [
    /* @__PURE__ */ i("div", { className: $e.head, children: [
      /* @__PURE__ */ n("span", { className: $e.index, children: e }),
      /* @__PURE__ */ n("span", { className: $e.title, children: t }),
      /* @__PURE__ */ n("span", { className: $e.note, children: a })
    ] }),
    r.map((o) => /* @__PURE__ */ i("div", { className: $e.cell, children: [
      /* @__PURE__ */ n("span", { className: $e.cellTitle, children: o.title }),
      /* @__PURE__ */ n("span", { className: $e.cellBody, children: o.body }),
      o.tag !== void 0 && /* @__PURE__ */ n("span", { className: $e.tag, children: o.tag })
    ] }, o.title))
  ] });
}
export {
  T2 as ACCENT_PRESETS,
  X2 as ActionStack,
  XT as ActivityConsole,
  P2 as AdminIcon,
  Sb as AgentCard,
  q2 as AppShell,
  PT as AppearanceStrip,
  wx as Band,
  Y2 as BarChart,
  Hf as BoardColumn,
  fT as BoardFootnote,
  _T as BoardHeader,
  M2 as BoardIcon,
  lT as BoardScroller,
  b as Btn,
  R2 as CHIP_ROLES,
  gr as CREDENTIAL_COLUMNS,
  V2 as Callout,
  jT as CapabilityRow,
  sT as CardGrid,
  ix as ChatMessage,
  ga as Checkbox,
  m as Chip,
  nt as ClampText,
  ZT as ClarificationRow,
  ST as ClauseRuleRow,
  CT as ClauseRules,
  er as ColourLadder,
  qT as ComponentRow,
  ex as Composer,
  bT as ConfigRow,
  vT as ConfigRowHead,
  wn as ConnectionMark,
  QT as ConsoleAnnounceProvider,
  lx as Conversation,
  em as CostMeter,
  DT as CredentialRow,
  OT as CredentialRowHead,
  tx as CriteriaList,
  ks as Crumb,
  x2 as DENSITIES,
  sx as DeliveryHealth,
  dT as DeniedState,
  E2 as DisabledScope,
  TT as DryRunRail,
  lf as EmptyState,
  FT as EnvCard,
  j as Field,
  cT as FilteredEmpty,
  O2 as FoldText,
  rT as FormStack,
  Ft as GateChecklist,
  nx as GateLadder,
  wm as Grid,
  LT as HandoffRuleRow,
  xT as HandoffRules,
  I2 as HomeIcon,
  pT as ItemDrawer,
  HT as KeyPanel,
  no as LIVE_EVENT_TYPES,
  Vv as LegacyBoardColumn,
  yT as LegacyBoardHeader,
  NT as LegacyConfigRow,
  $T as LegacyItemDrawer,
  Fv as LegacyOverCapNote,
  kT as LegacyPreviewRail,
  Qa as LegacyWorkCard,
  Le as LiveIndicator,
  uT as LoadFailed,
  wT as Loading,
  Sr as MCP_SERVER_COLUMNS,
  mn as Mark,
  zT as MarkUpload,
  He as Marker,
  GT as McpServerRow,
  KT as McpServerRowHead,
  Ma as Menu,
  Aa as MenuButton,
  AT as NewStreamModal,
  uf as OverCapNote,
  cn as OverflowRow,
  rt as Overlay,
  D2 as OwedCard,
  RT as PARTIAL_STEP_REASON,
  Rr as POLICY_CHIP_WIDTH,
  tT as PageFrame,
  U2 as PageHeader,
  J2 as PlainList,
  UT as PolicyRow,
  gT as PreviewRail,
  Vt as ROLE_MATRIX_COLUMNS,
  hr as RULE_ACTIONS,
  Wa as Radio,
  cx as ReadyChecklist,
  aT as RecordSection,
  ax as RequeueSheet,
  rx as ResolveBlock,
  dx as ResolvedFieldRow,
  VT as RoleMatrixRow,
  ux as RoutingTable,
  ET as RuleRow,
  YT as RunbookSteps,
  to as STREAM_STEPS,
  oT as SectionBand,
  Hn as SectionHeader,
  Fa as SegmentedControl,
  Ta as Select,
  hx as SessionRow,
  z2 as Sidebar,
  j2 as SidebarFoldButton,
  IT as StageColumn,
  iT as StageGrid,
  ox as StageHistory,
  iy as StageListEditor,
  F2 as StageSteps,
  hT as StaleStrip,
  qt as StatStrip,
  Z2 as StatTiles,
  G2 as StreamAvatar,
  MT as StreamRow,
  B2 as StudioIcon,
  nT as SubjectRail,
  Ve as Switch,
  W2 as TabLinks,
  Q2 as TableHead,
  H2 as Tabs,
  k2 as ThemeProvider,
  BT as ToolRow,
  eT as TopBar,
  gw as Tree,
  Va as TreeRow,
  mx as TypedInputBlock,
  Gl as UNSAFE_HREF,
  JT as ValidationList,
  y2 as VisibilityProvider,
  N2 as Visible,
  S2 as WARD_VERSION,
  Dt as WorkCard,
  mT as WriteUnavailableStrip,
  VR as agoSince,
  Hr as clock,
  $y as colourStatus,
  ae as count,
  ue as duration,
  rn as elapsed,
  C2 as eventSourceTransport,
  Bt as isStreamStep,
  ht as isValidatedStreamStep,
  np as ladderValidation,
  V$ as mcpConnectionChip,
  G$ as mcpToolName,
  le as money,
  be as ms,
  Ya as ordered,
  ca as ratio,
  wk as restartLabel,
  z as safeHref,
  he as stamp,
  on as stream,
  L2 as streamChip,
  jt as streamChipProps,
  ge as streamColour,
  oo as streamHex,
  Rt as streamInitials,
  ao as streamVars,
  K2 as uniqueStreamInitials,
  $a as useAnchoredPanel,
  gt as useBorderFlash,
  Ae as useDisabledScope,
  Xr as useFocusTrap,
  A2 as useLiveFeed,
  $2 as useReturnFocus,
  Mt as useRovingTabindex,
  ln as useTicker,
  Wr as useVisible,
  B as v,
  WT as validateMark,
  wt as validatedStep,
  ua as validatedStreamSteps
};
