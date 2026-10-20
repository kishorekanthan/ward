import { jsx as n, Fragment as x, jsxs as l } from "react/jsx-runtime";
import { useMemo as ca, useContext as ye, createContext as Ne, useState as p, useEffect as S, useCallback as te, useRef as _, useLayoutEffect as tt, useId as k, Fragment as da, isValidElement as Dr, Children as Fr } from "react";
import { createPortal as zr, flushSync as ua } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const Cn = (e) => String(e).padStart(2, "0");
function ln(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${Cn(t % 60)}s` : `${Math.floor(a / 60)}h ${Cn(a % 60)}m`;
}
const Wr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const t = Wr.formatToParts(new Date(e)), a = (r) => {
    var o;
    return ((o = t.find((i) => i.type === r)) == null ? void 0 : o.value) ?? "";
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
function ha(e, t) {
  return `${e} / ${t}`;
}
const Kr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Gr(e) {
  return Kr.format(new Date(e));
}
const ma = Ne(/* @__PURE__ */ new Set());
function j2({ hidden: e, children: t }) {
  const a = ca(() => new Set(e), [e]);
  return /* @__PURE__ */ n(ma.Provider, { value: a, children: t });
}
function Ur(e) {
  return !ye(ma).has(e);
}
function q2({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: Ur(e) ? t : a });
}
const Vr = "(prefers-color-scheme: dark)";
function Sn() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Vr) : null;
}
function Yr(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = Sn()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? Sn() : null;
    if (!r) return;
    const o = () => a(r.matches);
    return o(), r.addEventListener("change", o), () => r.removeEventListener("change", o);
  }, [e]), t;
}
function Ft(e, t) {
  S(() => {
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function Jr(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function O2({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const o = Yr(e === "system");
  return Ft("data-theme", Jr(e, o)), Ft("data-accent", t), Ft("data-density", a), /* @__PURE__ */ n(x, { children: r });
}
const Qr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Xr(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function Zr(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function eo(e, t, a, r) {
  return e.shiftKey ? Xr(t, a) ? r : void 0 : document.activeElement === r || Zr(t) ? a : void 0;
}
function to(e, t, a) {
  const r = a[0], o = a[a.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = eo(e, t, r, o);
  i && (e.preventDefault(), i.focus());
}
function no(e) {
  return { onKeyDown: te(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Qr));
      to(a, e.current, r);
    },
    [e]
  ) };
}
function H2(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [t, e]);
}
const Rn = { ArrowUp: -1, ArrowDown: 1 }, Tn = { ArrowLeft: -1, ArrowRight: 1 }, ao = (e, t, a) => Math.min(a, Math.max(t, e));
function ro(e, t) {
  if (t !== "horizontal" && e in Rn) return Rn[e];
  if (t !== "vertical" && e in Tn) return Tn[e];
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
  const i = te((u) => a(u), []), s = te((u) => {
    var h;
    a(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = te(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(t)), f = ro(u.key, e);
      f !== void 0 ? (u.preventDefault(), s(h[ao(w + f, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: i };
}
const D2 = (e, t, a) => {
  const r = new EventSource(e), o = (i) => a.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, F2 = "0.2.0", z2 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], oo = [1, 2, 3, 4, 5, 6], wa = [1, 2, 3], lo = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], W2 = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], K2 = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], B = {
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
    menuIcon: "var(--ward-width-menuIcon)",
    measure: "var(--ward-width-measure)"
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
    codeText: "var(--ward-type-codeText)"
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
function sn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Bt(e) {
  return oo.includes(e);
}
function ht(e) {
  return wa.includes(e);
}
function io(e) {
  if (!Bt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function G2(e) {
  if (!Bt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const so = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function co(e) {
  if (!Bt(e)) throw new Error("unvalidated stream step");
  return so[e];
}
function xn(e) {
  return typeof e != "string" ? null : lo.includes(e) ? e : null;
}
function uo(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function ho(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function mo(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function wo(e, t, a) {
  const r = uo(e);
  if (r === null) return null;
  const o = xn(a) ?? xn(r.type);
  return o === null ? null : { ...r, type: o, id: ho(r, t), at: mo(r) };
}
function fo(e, t) {
  return e >= be.staleAfter ? "stale" : e >= be.heartbeat && t === "live" ? "reconnecting" : null;
}
function _o(e, t, a) {
  return e >= be.heartbeat && !t && a !== null;
}
function U2(e, t) {
  const [a, r] = p("reconnecting"), [o, i] = p(null), s = _(/* @__PURE__ */ new Map()), c = _(0), d = _(""), u = _(0), h = _(null), w = _(0), f = _(0), y = _(!1), N = _("reconnecting"), A = te((T) => {
    N.current = T, r(T);
  }, []), q = te(() => {
    c.current = Date.now();
  }, []), me = te((T) => {
    for (const [J, ke] of s.current)
      (ke === "*" || T.itemKey === ke) && J(T);
  }, []), re = te(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (T, J, ke) => {
        const ze = wo(T, J, ke);
        ze !== null && (ze.id && (d.current = ze.id), q(), y.current = !1, A("live"), i(ze.at), me(ze));
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
    const T = Date.now() - c.current, J = fo(T, N.current);
    J && A(J);
    const ke = h.current;
    _o(T, y.current, ke) && Ee(ke);
  }, be.tick), () => {
    var T;
    window.clearInterval(f.current), window.clearTimeout(w.current), y.current = !1, (T = h.current) == null || T.close(), h.current = null;
  }), [re, Ee, A]), { connection: a, lastEventAt: o, subscribe: Ye };
}
function cn(e, t) {
  const a = new Date(e).getTime(), [r, o] = p(() => Date.now());
  return S(() => {
    if (!t) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && o(Date.now());
    };
    i();
    const s = window.setInterval(i, be.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", i);
    };
  }, [t, a]), Math.max(0, r - a);
}
const vo = { blue: "running", orange: "waiting", green: "done" };
function bo() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Ln(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function gt(e, t) {
  const a = _(0), r = te((o) => {
    const i = o ?? t, s = e.current;
    s !== null && i !== void 0 && (bo() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${vo[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => Ln(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => Ln(s), be.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (o) => r(o) : () => r(t);
}
const po = "_root_1otpc_2", go = {
  root: po
};
function yo(e, t, a, r, o) {
  const i = [ln(t)];
  return e || i.push(`as of ${Gr(a)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function Le({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const o = a !== "stale", i = cn(e, o), s = (t == null ? void 0 : t.at) ?? e, c = yo(o, i, s, r, t);
  return /* @__PURE__ */ l("span", { className: `${go.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const No = "_app_1bnco_1", ko = "_side_1bnco_35", $o = "_sideTop_1bnco_46", Co = "_sideBody_1bnco_60", So = "_iconRail_1bnco_99", Ro = "_railItem_1bnco_108", To = "_railIcon_1bnco_129", xo = "_railDot_1bnco_134", Lo = "_railLetter_1bnco_140", Ao = "_main_1bnco_146", Eo = "_rail_1bnco_108", Io = "_page_1bnco_168", Mo = "_headerRow_1bnco_191", Bo = "_sidebarToggle_1bnco_198", Po = "_headerSlot_1bnco_203", jo = "_headerAction_1bnco_208", qo = "_drawerSide_1bnco_213", Oo = "_root_1bnco_260", Ho = "_topbar_1bnco_267", Do = "_mark_1bnco_278", Fo = "_brand_1bnco_285", zo = "_tagline_1bnco_291", Wo = "_identity_1bnco_297", Ko = "_tools_1bnco_298", Go = "_nav_1bnco_308", Uo = "_metadata_1bnco_315", Vo = "_actor_1bnco_330", Yo = "_detail_1bnco_331", Jo = "_content_1bnco_376", Qo = "_toolsPanel_1bnco_392", Xo = "_skip_1bnco_418", C = {
  app: No,
  side: ko,
  sideTop: $o,
  sideBody: Co,
  iconRail: So,
  railItem: Ro,
  railIcon: To,
  railDot: xo,
  railLetter: Lo,
  main: Ao,
  rail: Eo,
  page: Io,
  headerRow: Mo,
  sidebarToggle: Bo,
  headerSlot: Po,
  headerAction: jo,
  drawerSide: qo,
  root: Oo,
  topbar: Ho,
  mark: Do,
  brand: Fo,
  tagline: zo,
  identity: Wo,
  tools: Ko,
  nav: Go,
  metadata: Uo,
  actor: Vo,
  detail: Yo,
  content: Jo,
  toolsPanel: Qo,
  skip: Xo
};
function at(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const Zo = "_scope_1an6i_2", el = {
  scope: Zo
}, fa = Ne(null);
function V2({ reason: e, actions: t = "disable", children: a }) {
  const r = k();
  return /* @__PURE__ */ l("fieldset", { disabled: !0, className: `${el.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(fa.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Ae() {
  return ye(fa);
}
function Pt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : at(e, t.reasonId);
}
const tl = "_btn_hrmlj_2", nl = "_primary_hrmlj_14", al = "_destructive_hrmlj_25", rl = "_secondary_hrmlj_35", ol = "_ghost_hrmlj_40", ll = "_overflow_hrmlj_49", il = "_sm_hrmlj_56", sl = "_disabled_hrmlj_60", cl = "_withReason_hrmlj_68", dl = "_reason_hrmlj_74", et = {
  btn: tl,
  primary: nl,
  destructive: al,
  secondary: rl,
  ghost: ol,
  overflow: ll,
  sm: il,
  disabled: sl,
  withReason: cl,
  reason: dl
};
function ul(e, t, a, r) {
  const o = t === "sm" ? [et.sm, "ward-btn--sm"] : [], i = a ? [et.disabled] : [];
  return [et.btn, et[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function hl(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function ml(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function wl(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function fl(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function _l(e, t, a) {
  return fl(e.describedBy, t && a);
}
function vl({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${et.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function bl(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Ae()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(pl, { ...e });
}
function pl(e) {
  const t = Ae();
  ml(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", o = !!(e.disabled || t), i = wl(e, t), s = k(), c = gl(i, t);
  return /* @__PURE__ */ l(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: ul(a, r, o, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: o,
        title: i,
        "aria-describedby": _l(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...hl(a, e.controls),
        children: bl(e)
      }
    ),
    /* @__PURE__ */ n(vl, { id: s, reason: i, shown: c === _a })
  ] });
}
function gl(e, t) {
  return e && !t ? _a : da;
}
function _a({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${et.withReason} ward-btn-withReason`, children: e });
}
let dn = "none";
function yl(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (dn = "key");
}
typeof document < "u" && (document.addEventListener("keydown", yl, !0), document.addEventListener("pointerdown", () => {
  dn = "pointer";
}, !0));
function Nl() {
  return dn === "key";
}
function dt(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const o = (s) => a(s.matches);
    return r.addEventListener("change", o), a(r.matches), () => r.removeEventListener("change", o);
  }, [e]), t;
}
const kl = "_scrim_1cawq_2", $l = "_drawer_1cawq_10", Cl = "_sheet_1cawq_14", Sl = "_modal_1cawq_18", Rl = "_panel_1cawq_23", Tl = "_start_1cawq_44", xl = "_header_1cawq_67", Ll = "_title_1cawq_75", Al = "_body_1cawq_79", El = "_close_1cawq_106", Te = {
  scrim: kl,
  drawer: $l,
  sheet: Cl,
  modal: Sl,
  panel: Rl,
  start: Tl,
  header: xl,
  title: Ll,
  body: Al,
  close: El
}, Il = Ne(null), Ct = [], St = /* @__PURE__ */ new Map();
function Ml(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Bl(e, t) {
  let a = St.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, St.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function Pl(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !Ml(r) && Bl(e, r);
}
function jl(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (Pl(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function ql(e) {
  for (const t of e.claims) {
    const a = St.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), St.delete(t)));
  }
}
function Ol(e, t) {
  const a = { root: e, claims: [] };
  return Ct.push(a), jl(a, t), a;
}
function Hl(e) {
  const t = Ct.indexOf(e);
  t >= 0 && Ct.splice(t, 1), ql(e);
}
function An(e) {
  return e !== null && Ct.at(-1) === e;
}
function Dl(e, t, a) {
  const r = _(null), o = _(a);
  return o.current = a, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = Ol(i, t);
    return r.current = c, () => {
      var u, h;
      const d = An(c);
      Hl(c), r.current = null, d && ((h = (u = o.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), te(() => An(r.current), []);
}
function Fl(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function zl(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Wl({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("header", { className: `${Te.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Te.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Kl(e) {
  return `${Te.scrim} ${Te[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Gl(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Te.panel} ${Te[e]} ward-overlay-panel${a}${r}`;
}
function Ul(e) {
  const t = ye(Il);
  return e ?? t ?? document.body;
}
function rt(e) {
  const t = _(null), a = _(null), r = k(), o = Ul(e.container), i = dt("(min-width: 768px)"), s = Fl(e.kind, i), c = zl(e, r), d = no(a), [u] = p(Nl), h = Dl(t, o, e.returnFocusTo), w = te(() => {
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
  }, [w]), zr(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: Kl(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: w,
        children: /* @__PURE__ */ l(
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
            className: Gl(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => h() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Te.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Wl, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Vl = /^([a-z][a-z0-9+.-]*):/i, Yl = /* @__PURE__ */ new Set(["http", "https"]), Jl = "#";
function Ql(e) {
  var r, o;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (o = (r = Vl.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : o.toLowerCase();
}
function H(e) {
  const t = Ql(e);
  return t === void 0 || Yl.has(t) ? e : Jl;
}
function Xl(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function va(e) {
  const t = Xl(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function Zl(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => va(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const o = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [a, ...a.children]) o == null || o.observe(i);
    return r(), () => {
      a.removeEventListener("scroll", r), o == null || o.disconnect();
    };
  }, [e, t]);
}
function ei(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, o = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : o > e.clientWidth - a ? e.scrollLeft + o - e.clientWidth + a : null;
}
function ti(e, t, a) {
  tt(() => {
    const r = e.current, o = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !o) return;
    const i = ei(r, o);
    i !== null && (r.scrollLeft = Math.max(0, i)), va(r);
  }, [e, t, a]);
}
const ni = "_row_11g8i_2", ai = {
  row: ni
};
function ri(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function un({ label: e, children: t, count: a, as: r = "div", focusable: o = !0, rowRef: i, className: s, ...c }) {
  const d = _(null), u = i ?? d;
  return Zl(u, a), /* @__PURE__ */ n(r, { ref: u, className: [ai.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...ri(o, r), ...c, children: t });
}
const oi = "_icon_1ylqy_2", li = {
  icon: oi
};
function mt({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: li.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function Y2() {
  return /* @__PURE__ */ n(mt, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function J2() {
  return /* @__PURE__ */ l(mt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function Q2() {
  return /* @__PURE__ */ l(mt, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function X2() {
  return /* @__PURE__ */ n(mt, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function ii() {
  return /* @__PURE__ */ l(mt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const ba = "ward:sidebar-collapsed", si = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function ci() {
  try {
    return window.localStorage.getItem(ba) === "true";
  } catch {
    return !1;
  }
}
function di(e) {
  try {
    window.localStorage.setItem(ba, String(e));
  } catch {
  }
}
function ui(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function hi(e) {
  return e instanceof Element && e.closest(si) !== null;
}
function mi(e) {
  return e.key === "[" && !ui(e) && !hi(e.target);
}
function wi(e) {
  const [t, a] = p(ci), r = () => {
    di(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const o = (i) => {
      var c;
      if (!mi(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [e, t]), { collapsed: t, toggle: r };
}
function fi() {
  const e = dt("(max-width: 767.98px)"), t = dt("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function _i(e) {
  const t = e === "phone", a = k(), r = _(null), [o, i] = p(!1);
  return o && !t && i(!1), { narrow: t, open: o, drawerId: a, slotRef: r, toggle: () => i(!o), close: () => i(!1) };
}
function vi({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ l("div", { className: C.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: C.headerSlot, children: e }),
    Na(t) && /* @__PURE__ */ n("span", { className: C.headerAction, children: t })
  ] }) : e;
}
function bi(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function pi({ sidebar: e, label: t, drawer: a }) {
  var o;
  if (bi(a.open, a.close), !a.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(rt, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (o = a.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ n("div", { className: C.drawerSide, onClick: r, children: pa(e, !1) }) });
}
function gi(e) {
  const [t, a] = p(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function yi(e, t) {
  const a = wi(e === "wide" && !t), r = gi(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function Ni(e, t) {
  const a = yi(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return $i(e.collapsed, t);
  const r = a.collapsed, o = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: o, drawsStrip: !o && typeof e.sidebar == "function", toggle: a.toggle };
}
const ki = (e) => e.collapsed && e.drawsStrip;
function $i(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const En = (e) => e ? "" : void 0;
function pa(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ga({ fold: e }) {
  return /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(ii, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function Ci({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: C.sideTop, children: /* @__PURE__ */ n(ga, { fold: e }) });
}
const ya = Ne(null);
function Z2() {
  const e = ye(ya);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(ga, { fold: e });
}
function Si({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": sn(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Ri({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: C.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ l("a", { className: C.railItem, href: H(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(Si, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function Ti({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: o }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ l("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(Ci, { fold: r, inSidebar: o && !i }),
    /* @__PURE__ */ n("div", { className: C.sideBody, hidden: i, children: pa(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(Ri, { items: a ?? [], label: t })
  ] });
}
const Na = (e) => e != null;
function xi(e) {
  const { sidebar: t, header: a, action: r, children: o, rail: i, iconRail: s, pageFill: c } = e, d = Na(i), u = fi(), h = _i(u), w = Ni(e, u), f = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ l("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": En(ki(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(ya.Provider, { value: w, children: /* @__PURE__ */ n(Ti, { sidebar: t, label: f, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ l("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(vi, { header: a, action: r, label: f, drawer: h }),
      /* @__PURE__ */ n("div", { className: C.page, "data-fill": En(c === !0), children: o })
    ] }),
    d && /* @__PURE__ */ n("div", { className: C.rail, children: i }),
    /* @__PURE__ */ n(pi, { sidebar: t, label: f, drawer: h })
  ] });
}
function Li({ destinations: e, active: t }) {
  const a = _(null);
  return ti(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(un, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: H(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function Zt({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function Ai({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ l("span", { className: C.metadata, children: [
    /* @__PURE__ */ n(Zt, { value: e, className: C.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Zt, { value: t, className: C.detail })
  ] });
}
function Ei() {
  const e = dt("(max-width: 767.98px)"), t = k(), a = _(null), [r, o] = p(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Ii({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: C.tools, children: e });
}
function Mi({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: C.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function Bi(e) {
  return /* @__PURE__ */ l("header", { className: C.topbar, children: [
    /* @__PURE__ */ n("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Zt, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ n(Li, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: C.identity, children: /* @__PURE__ */ n(Ai, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Ii, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Pi(e) {
  const t = k(), a = Ei();
  return /* @__PURE__ */ l("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: C.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Bi, { ...e, menu: a }),
    /* @__PURE__ */ n(Mi, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: C.content, children: e.children })
  ] });
}
function ji(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function eT(e) {
  return ji(e) ? /* @__PURE__ */ n(xi, { ...e }) : /* @__PURE__ */ n(Pi, { ...e });
}
const qi = "_root_itg9o_2", Oi = "_row_itg9o_8", Hi = "_box_itg9o_14", Di = "_label_itg9o_21", Fi = "_labelHidden_itg9o_26", zi = "_lockedNote_itg9o_36", Wi = "_consequence_itg9o_44", Ki = "_sample_itg9o_79", Be = {
  root: qi,
  row: Oi,
  box: Hi,
  label: Di,
  labelHidden: Fi,
  lockedNote: zi,
  consequence: Wi,
  sample: Ki
};
function Gi(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function Ui({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: t }) : null;
}
function Vi({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Yi(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function Ji(e, t, a, r) {
  const o = e.consequence ? `${t}-note` : void 0, i = Yi(e, a, r), s = i ? `${t}-reason` : void 0, c = Pt(at(o, e.describedBy, s), r);
  return { noteId: o, reason: i, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? i } };
}
function Qi({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Xi({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function ka(e) {
  const t = k(), a = Ae(), r = Gi(e, a), o = Ji(e, t, r.disabled, a);
  return /* @__PURE__ */ l("div", { className: `${Be.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ l("span", { className: Be.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: t,
          type: "checkbox",
          className: `${Be.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (i) => {
            var s;
            return !r.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, i.target.checked));
          },
          ...o.input
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: t, className: e.labelHidden ? Be.labelHidden : Be.label, children: [
        e.label,
        /* @__PURE__ */ n(Vi, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Xi, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Qi, { id: o.reasonId, reason: o.reason }),
    /* @__PURE__ */ n(Ui, { id: o.noteId, text: e.consequence })
  ] });
}
const Zi = "_chip_pq6tb_2", es = {
  chip: Zi
}, ts = {
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
function ns(e, t) {
  if (e === "stream") return as(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = ts[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function as(e) {
  if (!e || !ht(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = sn(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${es.chip} ward-chip ward-chip--${e}`, style: ns(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const rs = "_clamp_zn74g_3", In = {
  clamp: rs
};
function nt({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? In.clamp : `${In.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const os = "_root_1btz3_2", ls = "_body_1btz3_10", is = "_toggle_1btz3_24", zt = {
  root: os,
  body: ls,
  toggle: is
};
function tT({ children: e, lines: t = 3, label: a }) {
  const [r, o] = p(!1), i = k();
  return /* @__PURE__ */ l("div", { className: zt.root, children: [
    /* @__PURE__ */ n("div", { id: i, className: zt.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: zt.toggle, "aria-expanded": r, "aria-controls": i, onClick: () => o(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const ss = "_root_1a4s8_2", cs = "_words_1a4s8_16", ds = "_title_1a4s8_23", us = "_actions_1a4s8_27", ft = {
  root: ss,
  words: cs,
  title: ds,
  actions: us
};
function nT({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ l("section", { className: ft.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ l("div", { className: ft.words, children: [
      /* @__PURE__ */ n("strong", { className: ft.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: ft.actions, children: a })
  ] });
}
const hs = "_root_8zmpu_2", ms = "_step_8zmpu_12", ws = "_dot_8zmpu_38", fs = "_label_8zmpu_51", lt = {
  root: hs,
  step: ms,
  dot: ws,
  label: fs
}, _s = { done: ", done", now: ", current", next: "" };
function vs({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ l("li", { className: lt.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${lt.dot} ward-running` : lt.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: lt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: _s[e.state] })
  ] });
}
function aT({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: lt.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(vs, { step: r, running: t }, r.label)) });
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
const bs = "_root_13eei_3", ps = "_nav_13eei_8", gs = "_list_13eei_16", ys = "_item_13eei_24", Ns = "_link_13eei_44", ks = "_sep_13eei_54", $s = "_current_13eei_58", Cs = "_chips_13eei_62", Me = {
  root: bs,
  nav: ps,
  list: gs,
  item: ys,
  link: Ns,
  sep: ks,
  current: $s,
  chips: Cs
};
function Ss({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: Me.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${Me.link} ward-target`, href: H(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function Rs({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: Me.root, children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ n("ol", { className: Me.list, children: e.map((r, o) => /* @__PURE__ */ l("li", { className: Me.item, children: [
      o > 0 ? /* @__PURE__ */ n("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(Ss, { step: r, isCurrent: a && o === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${Me.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function $a(e, t, a) {
  const r = _(a);
  r.current = a, S(() => {
    if (!e) return;
    const o = (i) => {
      var s;
      (s = t.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", o), () => document.removeEventListener("mousedown", o);
  }, [e, t]);
}
const Ts = 500;
function Ca(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function Sa() {
  const e = _(""), t = _(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, Ts), e.current);
}
const _t = 4;
function xs(e, t, a) {
  const r = Math.max(0, a - e.bottom - _t * 2), o = Math.max(0, e.top - _t * 2);
  return t <= r || r >= o ? { top: e.bottom + _t, maxHeight: r } : { top: e.top - _t - Math.min(t, o), maxHeight: o };
}
function Ls(e, t, a, r) {
  const o = { start: e.left, end: e.right - t }, i = { start: o.start + t <= a, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, a - t));
}
function As(e, t, a, r) {
  return { ...xs(e, t.height, a.height), left: Ls(e, t.width, a.width, r) };
}
function yt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Es(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function Is(e, t, a) {
  const r = Es(t, a);
  e.style.setProperty("--ward-anchor-width", yt(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const o = e.getBoundingClientRect(), i = document.documentElement;
  return { edges: r, box: o, view: { width: i.clientWidth, height: i.clientHeight } };
}
function Ms(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, o) => r.scrollTop = a[o]);
}
function Mn(e, t, a, r) {
  const o = Ms(e), i = Is(e, t, r), s = As(i.edges, i.box, i.view, a);
  Object.assign(e.style, { left: yt(s.left - i.box.left), top: yt(s.top - i.box.top), maxHeight: yt(s.maxHeight) }), o();
}
function Bs(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function Ra(e, t, a = "start", r) {
  tt(() => {
    const o = t.current, i = e.current;
    if (!o || !i) return;
    const s = Bs(o), c = () => Mn(o, i, a, r == null ? void 0 : r.current), d = (u) => {
      o.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), tt(() => {
    t.current && e.current && Mn(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const Ps = "_root_1lgbn_2", js = "_trigger_1lgbn_7", qs = "_value_1lgbn_47", Os = "_menu_1lgbn_65", Hs = "_find_1lgbn_87", Ds = "_list_1lgbn_103", Fs = "_option_1lgbn_114", zs = "_check_1lgbn_133", Ws = "_empty_1lgbn_144", pe = {
  root: Ps,
  trigger: js,
  value: qs,
  menu: Os,
  find: Hs,
  list: Ds,
  option: Fs,
  check: zs,
  empty: Ws
}, Ks = 7;
function Gs(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function Bn(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function Us(e, t) {
  const [a, r] = p(e.defaultOpen === !0), [o, i] = p(""), [s, c] = p(() => Bn(e.options, e.value)), d = (u) => {
    var h;
    ua(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: o,
    active: s,
    entries: Gs(e.options, o),
    findable: e.options.length > Ks,
    show: () => {
      e.disabled || (i(""), c(Bn(e.options, e.value)), r(!0));
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
function Vs(e, t) {
  const a = _(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function Ys(e) {
  const t = Sa();
  return (a) => {
    const r = t(a), o = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    o >= 0 && e.to(o);
  };
}
function Ta(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Js(e) {
  return { ...Ta(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function xa(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const o = t[r.key];
    if (!o) return a(r);
    r.preventDefault(), r.stopPropagation(), o();
  };
}
const Qs = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Xs(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      Qs.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function Zs({ entry: e, at: t, menu: a, ids: r, value: o }) {
  return /* @__PURE__ */ l(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === o,
      "data-active": t === a.active || void 0,
      className: pe.option,
      onMouseDown: (i) => i.preventDefault(),
      onMouseMove: () => a.to(t),
      onClick: () => a.pick(e),
      children: [
        /* @__PURE__ */ n("span", { className: pe.check, "aria-hidden": "true" }),
        /* @__PURE__ */ n("span", { className: pe.label, children: e.option.label })
      ]
    }
  );
}
function hn(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function ec({ menu: e, ids: t, focusRef: a }) {
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
      "aria-activedescendant": hn(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: xa(e, Ta(e), () => {
      })
    }
  );
}
function tc({ props: e, menu: t, ids: a, focusRef: r, trigger: o }) {
  const i = Ys(t), s = _(null);
  Ra(o, s);
  const c = (d) => {
    Ca(d) && i(d.key);
  };
  return /* @__PURE__ */ l("div", { ref: s, className: pe.menu, children: [
    t.findable && /* @__PURE__ */ n(ec, { menu: t, ids: a, focusRef: r }),
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
        "aria-activedescendant": t.findable ? void 0 : hn(t, a),
        onKeyDown: xa(t, Js(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(Zs, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: pe.empty, children: "No match" })
  ] });
}
function nc(e, t) {
  const a = e.open ? hn(e, t) : void 0;
  S(() => {
    var r, o;
    a && ((o = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [a]);
}
function La(...e) {
  return e.filter(Boolean).join(" ");
}
function ac(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function rc({ props: e, menu: t, ids: a, trigger: r, wantFocus: o }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ae()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: La(pe.trigger, e.triggerClassName),
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
      ...Xs(t, o),
      children: /* @__PURE__ */ n("span", { id: a.value, className: pe.value, "data-placeholder": i || void 0, children: ac(e) })
    }
  );
}
function Aa(e) {
  const t = Ae(), a = t ? { ...e, disabled: !0, "aria-describedby": Pt(e["aria-describedby"], t) } : e, r = k(), o = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = _(null), s = _(null), c = _(null), d = Us(a, s), u = Vs(d.open, c);
  return $a(d.open, i, () => d.close(!1)), nc(d, o), /* @__PURE__ */ l("div", { ref: i, className: La(pe.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(rc, { props: a, menu: d, ids: o, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(tc, { props: a, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const oc = "_field_1ensj_2", lc = "_label_1ensj_8", ic = "_labelHidden_1ensj_15", sc = "_control_1ensj_25", cc = "_mono_1ensj_45", dc = "_area_1ensj_50", uc = "_invalid_1ensj_57", He = {
  field: oc,
  label: lc,
  labelHidden: ic,
  control: sc,
  mono: cc,
  area: dc,
  invalid: uc
}, hc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, Ea = (e) => `${e}-label`;
function mc({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? hc : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function wc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    Aa,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": Ea(t.id),
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
function fc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
const _c = { input: mc, select: wc, textarea: fc };
function vc(e, t, a) {
  const r = _c[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function bc(e, t, a, r) {
  const o = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": o,
    "aria-describedby": Pt(at(o ? a : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function pc(e) {
  const t = e.mono ? [He.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [He.area] : [];
  return [He.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function gc(e) {
  return e ? `${He.label} ${He.labelHidden} ward-field-label` : `${He.label} ward-field-label`;
}
function j(e) {
  const t = k(), a = `${t}-msg`, r = bc(e, t, a, Ae()), o = pc(e);
  return /* @__PURE__ */ l("div", { className: `${He.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: Ea(t), className: gc(e.labelHidden), htmlFor: t, children: e.label }),
    vc(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${He.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const yc = "_root_sjvm0_2", Nc = "_trigger_sjvm0_9", kc = "_ghost_sjvm0_27", $c = "_panel_sjvm0_46", Cc = "_edged_sjvm0_67", Sc = "_menu_sjvm0_73", Rc = "_group_sjvm0_78", Tc = "_heading_sjvm0_83", xc = "_item_sjvm0_89", Lc = "_description_sjvm0_105", Ac = "_large_sjvm0_109", Ec = "_touch_sjvm0_113", Ic = "_icon_sjvm0_117", Mc = "_label_sjvm0_125", Bc = "_text_sjvm0_130", Pc = "_trailing_sjvm0_138", jc = "_check_sjvm0_144", qc = "_separator_sjvm0_183", Oc = "_footer_sjvm0_189", Hc = "_find_sjvm0_196", Dc = "_findGlyph_sjvm0_208", Fc = "_findInput_sjvm0_214", zc = "_empty_sjvm0_230", L = {
  root: yc,
  trigger: Nc,
  ghost: kc,
  panel: $c,
  edged: Cc,
  menu: Sc,
  group: Rc,
  heading: Tc,
  item: xc,
  description: Lc,
  large: Ac,
  touch: Ec,
  icon: Ic,
  label: Mc,
  text: Bc,
  trailing: Pc,
  check: jc,
  separator: qc,
  footer: Oc,
  find: Hc,
  findGlyph: Dc,
  findInput: Fc,
  empty: zc
}, Ia = Ne(null);
function Wc(e, t) {
  const [a, r] = p({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (o) => r((i) => ({ open: !0, start: o, request: i.request + 1 })),
    close: (o) => {
      var i;
      ua(() => r((s) => ({ ...s, open: !1 }))), o && ((i = t.current) == null || i.focus());
    }
  };
}
const Kc = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Gc(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = Kc.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function mn(...e) {
  return e.filter(Boolean).join(" ");
}
function Uc(e, t = {}, a = "field") {
  const { ref: r, className: o, ...i } = t;
  return { ...i, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: mn(L.trigger, a === "ghost" ? L.ghost : void 0, o) };
}
function Ma(e) {
  const t = k(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = _(null), o = _(null), i = Wc(e.defaultOpen === !0, o);
  return $a(i.open, r, () => i.close(!1)), /* @__PURE__ */ l("div", { ref: r, className: mn(L.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...Uc(o, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Gc(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(Ia.Provider, { value: { ...a, popup: i, button: o }, children: e.children })
  ] });
}
function Vc(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function Yc(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const Jc = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function Qc(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function Xc(e, t) {
  return e === "separator" ? e : "items" in e ? Qc(e, t) : t(e) ? e : null;
}
function Zc(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function ed(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (o) => o.label.toLowerCase().includes(a);
  return Zc(e.map((o) => Xc(o, r)).filter((o) => o !== null));
}
const Ba = (e, t) => (e % t + t) % t;
function je(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const o = Ba(t + a * r, e.length);
    if (!e[o].disabled) return o;
  }
  return -1;
}
const td = (e) => e.split("").every((t) => t === e[0]);
function nd(e, t, a) {
  const r = td(a), o = r ? a[0] : a, i = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = Ba(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function ad(e) {
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
function rd(e, t) {
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
function od(e, t, a) {
  const r = Sa(), o = rd(e, t), i = (s) => {
    if (Ca(s)) {
      if (!a) return e.focus(nd(e.items, e.current(), r(s.key)));
      s.preventDefault(), a(s.key);
    }
  };
  return {
    onKeyDown: (s) => {
      const c = o.get(s.key);
      if (!c) return i(s);
      s.preventDefault(), s.stopPropagation(), c();
    },
    onKeyUp: (s) => {
      s.key === " " && s.preventDefault();
    }
  };
}
function ld(e) {
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
function id(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? je(e, -1, 1) : t;
}
function sd(e, t) {
  const { start: a, request: r } = t, o = _(e);
  o.current = e, S(() => {
    const { items: i, focus: s } = o.current;
    a && s(a === "first" ? id(i) : je(i, i.length, -1));
  }, [a, r]);
}
function cd({ row: e, nav: t, popup: a }) {
  const { item: r, at: o } = e;
  return {
    onMouseDown: (i) => i.preventDefault(),
    onMouseMove: () => {
      !r.disabled && t.current() !== o && t.focus(o);
    },
    onClick: (i) => {
      var s;
      if (r.disabled) return i.preventDefault();
      (s = r.onSelect) == null || s.call(r), a.close(!0);
    }
  };
}
const dd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function ud(e, t) {
  return dd(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function hd(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: L.label, children: e.label });
  return e.description ? /* @__PURE__ */ l("span", { className: L.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: L.description, children: e.description })
  ] }) : a;
}
function md() {
  return /* @__PURE__ */ n("svg", { className: L.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Pn(e, t) {
  return /* @__PURE__ */ l(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: L.icon, "aria-hidden": "true", children: e.icon }) : null,
    hd(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: L.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(md, {}) : null
  ] });
}
function Pa(e) {
  const { item: t, at: a } = e.row, r = k(), o = {
    ref: (i) => {
      e.nav.refs.current[a] = i;
    },
    role: "menuitem",
    tabIndex: -1,
    className: L.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...ud(t, r),
    ...cd(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: H(t.href), ...o, children: Pn(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...o, children: Pn(t, r) });
}
function wd({ heading: e, rows: t, nav: a, popup: r }) {
  const o = k();
  return /* @__PURE__ */ l("div", { role: "group", "aria-labelledby": o, className: L.group, children: [
    /* @__PURE__ */ n("div", { id: o, className: L.heading, children: e }),
    t.map((i) => /* @__PURE__ */ n(Pa, { row: i, nav: a, popup: r }, i.at))
  ] });
}
function fd({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: L.separator }) : e.kind === "group" ? /* @__PURE__ */ n(wd, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(Pa, { row: e.row, nav: t, popup: a });
}
function _d() {
  const e = ye(Ia);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function vd() {
  return /* @__PURE__ */ l("svg", { className: L.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function bd(e, t) {
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
function pd({ find: e, query: t, setQuery: a, input: r, nav: o, popup: i, menuId: s }) {
  const c = bd(o, i), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ l("div", { className: L.find, children: [
    /* @__PURE__ */ n(vd, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: L.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function gd(e, t) {
  const [a, r] = p(""), o = _(null), i = t !== void 0 && Jc(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = o.current) == null || d.focus();
  };
  return i ? { find: t, query: a, setQuery: r, input: o, toFind: s, entries: ed(e, a) } : { query: a, setQuery: r, input: o, entries: e };
}
const yd = { regular: void 0, large: L.large, touch: L.touch }, Nd = (e, t) => mn(L.panel, e ? L.edged : void 0, yd[t]);
function kd({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: L.empty, children: e.empty ?? "No matches" });
}
function ja({ entries: e, footer: t, align: a = "start", find: r, edges: o, size: i = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = _d(), h = _(null);
  Ra(u, h, a, o);
  const w = gd(e, r), f = Vc(w.entries), y = ad(f.flatMap(Yc).map((q) => q.item)), N = od(y, s, w.toFind), A = ld(s);
  return sd(y, s), /* @__PURE__ */ l("div", { ref: h, className: Nd(o, i), ...A, children: [
    w.find && /* @__PURE__ */ n(pd, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: y, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: L.menu, ...N, children: f.map((q, me) => /* @__PURE__ */ n(fd, { block: q, nav: y, popup: s }, me)) }),
    /* @__PURE__ */ n(kd, { find: w.find, count: y.items.length }),
    t && /* @__PURE__ */ n("p", { className: L.footer, children: t })
  ] });
}
function $d(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function qa(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !$d(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const Cd = (e, t) => e.reduce((a, r) => a + r + t, -t);
function Sd({ room: e, widths: t, more: a, gap: r }, o) {
  const i = t.map((d, u) => u);
  if (Cd(t, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([o]);
  let c = t[o] + r + a;
  for (const d of i)
    if (d !== o) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Wt = (e) => Number.parseFloat(e) || 0, jn = (e) => e.getBoundingClientRect().width;
function Rd(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Wt(a.paddingInlineStart) - Wt(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), jn),
    more: r ? jn(r) : 0,
    gap: Wt(a.columnGap)
  };
}
function Td(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const xd = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function Oa(e, t, a, r = ':scope > [role="tab"]') {
  const [o, i] = p(null);
  return tt(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = Rd(s, r);
      i((u) => xd(u, d) ? u : d);
    };
    return c(), Td(s, c);
  }, [e, a, r]), o && Sd(o, t);
}
const Ld = "_strip_1zvzj_2", Ad = "_fits_1zvzj_19", Ed = "_probe_1zvzj_27", Id = "_moreRoot_1zvzj_36", Md = "_more_1zvzj_36", Bd = "_tab_1zvzj_55", Pd = "_count_1zvzj_91", jd = "_badge_1zvzj_97", Y = {
  strip: Ld,
  fits: Ad,
  probe: Ed,
  moreRoot: Id,
  more: Md,
  tab: Bd,
  count: Pd,
  badge: jd
}, Ha = "More";
function qd(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const qn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, wn = (e) => e.badge === void 0 ? qn(e) : `${qn(e)}, ${e.badge}`;
function Da(e) {
  return `${Y.strip} ward-tabs ward-tabs--${e}`;
}
const Od = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Hd({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ l(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${Y.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : wn(e),
      onClick: () => r(e.id),
      ...a,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ l(x, { children: [
          " ",
          /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
        ] }),
        e.badge === void 0 ? null : /* @__PURE__ */ n("span", { className: Y.badge, children: e.badge })
      ]
    }
  );
}
function Dd(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((i) => i.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Fd({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(Ma, { label: Ha, className: Y.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: Y.more }, children: /* @__PURE__ */ n(ja, { align: "end", entries: e.map((r) => ({ label: wn(r), onSelect: () => a(r.id) })) }) });
}
function zd(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : Od;
}
function rT({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: o }) {
  const i = Mt({ orientation: "horizontal" }), s = qd(e, t);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = _(null);
  qa(c, o);
  const d = Oa(c, s, e.map(wn).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ l("div", { ref: c, className: `${Da(o)} ${Y.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(Hd, { tab: h, active: t, place: zd(i, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${Y.more} ${Y.probe}`, children: Ha }),
    u.length > 0 && /* @__PURE__ */ n(Fd, { tabs: u, trigger: i.itemProps(e.length), onPick: Dd(c, a) })
  ] });
}
const On = 7, Fa = "More", Wd = ":scope > a", za = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Kd = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Gd(e, t) {
  return !e || e.includes(t) ? {} : Kd;
}
function Ud({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, className: `${Y.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ l(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
    ] })
  ] });
}
function Vd({ links: e }) {
  return /* @__PURE__ */ n(Ma, { label: Fa, className: Y.moreRoot, trigger: { className: Y.more }, children: /* @__PURE__ */ n(ja, { align: "end", entries: e.map((t) => ({ label: za(t), href: t.href })) }) });
}
function oT({ links: e, active: t, label: a, level: r }) {
  if (e.length > On) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${On} — the set is fixed`);
  const o = _(null);
  qa(o, r);
  const i = Math.max(0, e.findIndex((d) => d.id === t)), s = Oa(o, i, e.map(za).join(`
`), Wd), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ l("nav", { ref: o, className: `${Da(r)} ${Y.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(Ud, { link: d, current: d.id === t, place: Gd(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${Y.more} ${Y.probe}`, children: Fa }),
    c.length > 0 && /* @__PURE__ */ n(Vd, { links: c })
  ] });
}
const Yd = "_root_v56ff_3", Jd = "_segment_v56ff_9", Hn = {
  root: Yd,
  segment: Jd
};
function Wa({ options: e, value: t, onChange: a, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Mt({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${Hn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: Hn.segment,
      "aria-checked": d.value === t,
      disabled: o,
      "aria-describedby": i,
      onClick: () => a(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const Qd = "_sidebar_s9o1j_3", Xd = "_brand_s9o1j_9", Zd = "_mark_s9o1j_17", eu = "_word_s9o1j_24", tu = "_nav_s9o1j_30", nu = "_navItem_s9o1j_39", au = "_footLink_s9o1j_49", ru = "_group_s9o1j_58", ou = "_groupName_s9o1j_65", lu = "_agents_s9o1j_81", iu = "_agent_s9o1j_81", su = "_root_s9o1j_96", cu = "_agentTop_s9o1j_105", du = "_dot_s9o1j_112", uu = "_agentName_s9o1j_124", hu = "_agentMeta_s9o1j_138", mu = "_foot_s9o1j_49", wu = "_footName_s9o1j_150", fu = "_footLinks_s9o1j_157", _u = "_linkBrand_s9o1j_184", vu = "_label_s9o1j_205", bu = "_note_s9o1j_210", pu = "_footer_s9o1j_226", E = {
  sidebar: Qd,
  brand: Xd,
  mark: Zd,
  word: eu,
  nav: tu,
  navItem: nu,
  new: "_new_s9o1j_48",
  footLink: au,
  group: ru,
  groupName: ou,
  agents: lu,
  agent: iu,
  root: su,
  agentTop: cu,
  dot: du,
  agentName: uu,
  agentMeta: hu,
  foot: mu,
  footName: wu,
  footLinks: fu,
  linkBrand: _u,
  label: vu,
  note: bu,
  footer: pu
};
function gu({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ l(
    "a",
    {
      className: E.agent,
      href: H(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ l("span", { className: E.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: E.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": sn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: E.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: E.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function yu({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: E.foot, children: [
    /* @__PURE__ */ n("span", { className: E.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: E.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${E.footLink} ward-target`, href: H(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function Nu({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: o, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ l("nav", { className: E.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ l("div", { className: E.brand, children: [
      /* @__PURE__ */ n("span", { className: E.mark }),
      /* @__PURE__ */ n("span", { className: E.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: E.nav, children: t.map((s) => /* @__PURE__ */ n("a", { className: E.navItem, href: H(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ l("div", { className: E.group, children: [
      /* @__PURE__ */ l("span", { className: E.groupName, children: [
        a,
        " · ",
        ae(r.length)
      ] }),
      o && /* @__PURE__ */ n("a", { className: E.new, href: H(o.href), children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: E.agents, children: r.map((s) => /* @__PURE__ */ n(gu, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(yu, { shared: i })
  ] });
}
function ku(e) {
  return e.destinations ?? e.items ?? [];
}
function $u({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: E.linkBrand, children: e });
}
function Cu({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: E.footer, children: e });
}
function Su({ link: e, active: t }) {
  return /* @__PURE__ */ l("a", { href: H(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: E.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: E.note, children: e.note })
  ] });
}
function Ru(e) {
  return /* @__PURE__ */ l("aside", { className: `${E.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n($u, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: ku(e).map((t) => /* @__PURE__ */ n(Su, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(Cu, { children: e.children })
  ] });
}
function Tu(e) {
  return "agents" in e;
}
function lT(e) {
  return Tu(e) ? /* @__PURE__ */ n(Nu, { ...e }) : /* @__PURE__ */ n(Ru, { ...e });
}
const xu = "_mark_wlgi8_3", Lu = {
  mark: xu
}, Au = { met: "✓", unmet: "", failed: "✕" };
function fn({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Lu.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: Au[e]
    }
  );
}
const Eu = "_avatar_1t33a_3", Iu = {
  avatar: Eu
};
function Rt(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function Mu(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [Rt(e), ...[...t.slice(1)].map((r) => a + r)];
}
function Bu(e, t) {
  const a = Mu(e).find((o) => !t.has(o));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(Rt(e).charAt(0) + String(r)); ) r += 1;
  return Rt(e).charAt(0) + String(r);
}
function iT(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const o = Bu(r, t);
    t.add(o), a.set(r, o);
  }
  return a;
}
function Pu(e) {
  return e != null && ht(e) ? io(e) : void 0;
}
function sT({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: Iu.avatar, "data-size": a, "aria-hidden": "true", style: Pu(t), children: r ?? Rt(e) });
}
const ju = "_marker_br9fi_2", qu = {
  marker: ju
}, Ou = {
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
}, Hu = { running: " ward-running" };
function Fe({ size: e, kind: t, label: a }) {
  const r = { "--marker": Ou[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${qu.marker} ward-marker ward-marker--${t}${Hu[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const Du = "_root_ti0pq_2", Fu = "_chip_ti0pq_11", zu = "_noCase_ti0pq_23", vt = {
  root: Du,
  chip: Fu,
  noCase: zu
};
function Wu(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function _n({ connection: e, since: t, lastEventAt: a }) {
  const r = Wu(t, a), o = cn(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${vt.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Fe, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${vt.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: vt.noCase, children: ln(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${vt.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    he(r)
  ] });
}
const Ku = "_root_yylks_2", Gu = "_context_yylks_13", Uu = "_row_yylks_1", Vu = "_heading_yylks_27", Yu = "_headingWrap_yylks_35", Ju = "_meta_yylks_41", Qu = "_chips_yylks_49", Xu = "_title_yylks_56", Zu = "_consequence_yylks_66", eh = "_actionsWrap_yylks_73", th = "_actions_yylks_73", nh = "_action_yylks_73", ah = "_overflowPanel_yylks_102", rh = "_measureClip_yylks_113", oh = "_measure_yylks_113", U = {
  root: Ku,
  context: Gu,
  row: Uu,
  heading: Vu,
  headingWrap: Yu,
  meta: Ju,
  chips: Qu,
  title: Xu,
  consequence: Zu,
  actionsWrap: eh,
  actions: th,
  action: nh,
  overflowPanel: ah,
  measureClip: rh,
  measure: oh
};
function lh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(nt, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function ih({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function sh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function ch({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ l("div", { className: U.meta, children: [
    /* @__PURE__ */ n(ih, { chips: e }),
    /* @__PURE__ */ n(sh, { consequence: t, consequenceHint: a })
  ] });
}
function dh({ title: e, chips: t, consequence: a, consequenceHint: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: U.heading, children: [
    /* @__PURE__ */ n(lh, { title: e, density: o }),
    /* @__PURE__ */ n(ch, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function en({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function Dn({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function uh({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: o }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(Dn, { disclosure: o }) : t ? [/* @__PURE__ */ n(Dn, { disclosure: o }, "more"), /* @__PURE__ */ n(en, { actions: e }, "actions")] : /* @__PURE__ */ n(en, { actions: e });
}
function hh(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function mh({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(en, { actions: e }) });
}
function wh(e, t) {
  const a = k(), [r, o] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: a, toggle: () => o(!i) }, close: () => {
    var d, u;
    o(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const fh = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function _h(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && fh(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function vh({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(Rs, { path: e.path, current: e.current }) });
}
function bh(...e) {
  return e.some((t) => t === null);
}
function ph(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function gh(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + ph(e);
}
function yh(e, t, a, r, o) {
  if (o === 0 || bh(t, a, r)) return !1;
  const [i, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - gh(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Nh(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function kh(e) {
  return Dr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function $h(e, t) {
  return t.length === 0 && e.length === 1 && kh(e[0]);
}
function Ch(e, t) {
  const a = _(null), r = _(null), o = _(null), i = _(null), [s, c] = p(!1);
  return S(() => {
    const d = a.current;
    if (!Nh(d)) return;
    const u = () => c(yh(d, r.current, o.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: o, measureRef: i, collapsed: s && !t };
}
function Sh({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ l("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] }) });
}
function Rh({ connection: e }) {
  return e ? /* @__PURE__ */ n(_n, { connection: e.connection, since: e.since }) : null;
}
function cT({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: o, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: y, measureRef: N, collapsed: A } = Ch(s, $h(s, c)), q = c.length > 0, { disclosure: me, close: re } = wh(A || q, y), Ee = hh(c, s, A, u);
  return /* @__PURE__ */ l("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(vh, { crumb: _h(e, r, t) }),
    /* @__PURE__ */ l("div", { className: U.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: f, className: U.headingWrap, children: /* @__PURE__ */ n(dh, { title: r, chips: a, consequence: o, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ l("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(Rh, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: y, "data-ward-actions": !0, children: /* @__PURE__ */ n(uh, { actions: s, hasMore: q, collapsed: A, onOverflow: u, disclosure: me }) })
      ] })
    ] }),
    /* @__PURE__ */ n(mh, { actions: Ee, disclosure: me, onEscape: re }),
    /* @__PURE__ */ n(Sh, { actions: s, hasMore: q, measureRef: N })
  ] });
}
const Th = "_root_td96x_2", xh = "_body_td96x_16", Fn = {
  root: Th,
  body: xh
};
function dT({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${Fn.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: Fn.body, children: a }) });
}
const Lh = "_root_bf1pc_2", Ah = "_table_bf1pc_9", Eh = "_caption_bf1pc_14", Ih = "_series_bf1pc_23", Mh = "_category_bf1pc_31", Bh = "_cell_bf1pc_39", Ph = "_track_bf1pc_45", jh = "_lane_bf1pc_52", qh = "_bar_bf1pc_56", Oh = "_value_bf1pc_63", Hh = "_swatch_bf1pc_70", Dh = "_empty_bf1pc_78", Z = {
  root: Lh,
  table: Ah,
  caption: Eh,
  series: Ih,
  category: Mh,
  cell: Bh,
  track: Ph,
  lane: jh,
  bar: qh,
  value: Oh,
  swatch: Hh,
  empty: Dh
}, Fh = "—", zn = 6;
function zh(e, t) {
  if (t.length < 1 || t.length > zn)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${zn}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function Wh(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function Ka(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function Kh(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function Gh({ value: e, top: t, step: a, format: r, missing: o }) {
  const i = Kh(e, t), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ l("span", { className: Z.track, children: [
    /* @__PURE__ */ n("span", { className: Z.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${Z.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Z.value, children: e === null ? o : r(e) })
  ] }) });
}
function Uh({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ l("th", { scope: "col", className: Z.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Z.swatch, "data-step": Ka(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function Vh({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ l("section", { className: `${Z.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Z.empty, children: t })
  ] });
}
function Yh({ title: e, categories: t, series: a, top: r, format: o = ae, categoryHead: i = "Category", missing: s = Fh }) {
  return /* @__PURE__ */ n("div", { className: `${Z.root} ward-barchart`, children: /* @__PURE__ */ l("table", { className: Z.table, children: [
    /* @__PURE__ */ n("caption", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Z.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Uh, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Z.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(Gh, { value: u.values[d], top: r, step: Ka(h, a.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function uT(e) {
  zh(e.categories, e.series);
  const t = Wh(e.series);
  return t === 0 ? /* @__PURE__ */ n(Vh, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Yh, { ...e, top: t });
}
const Jh = "_root_1bfqw_2", Qh = "_figure_1bfqw_7", Xh = "_of_1bfqw_13", Zh = "_bar_1bfqw_18", em = "_rows_1bfqw_38", tm = "_row_1bfqw_38", nm = "_label_1bfqw_49", am = "_amount_1bfqw_54", Ie = {
  root: Jh,
  figure: Qh,
  of: Xh,
  bar: Zh,
  rows: em,
  row: tm,
  label: nm,
  amount: am
};
function rm({ spent: e, ceiling: t, breakdown: a }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ l("div", { className: `${Ie.root} ward-costmeter`, children: [
    /* @__PURE__ */ l("p", { className: `${Ie.figure} ward-stat-value`, children: [
      le(e),
      " ",
      /* @__PURE__ */ l("span", { className: Ie.of, children: [
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
    a && /* @__PURE__ */ n("ul", { className: Ie.rows, children: a.map((o) => /* @__PURE__ */ l("li", { className: `${Ie.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Ie.label, children: o.label }),
      /* @__PURE__ */ n("span", { className: Ie.amount, children: le(o.amount) })
    ] }, o.label)) })
  ] });
}
const om = "_frame_f7bxz_2", lm = "_table_f7bxz_6", im = "_th_f7bxz_12", sm = "_td_f7bxz_13", cm = "_sort_f7bxz_53", dm = "_row_f7bxz_65", um = "_empty_f7bxz_73", qe = {
  frame: om,
  table: lm,
  th: im,
  td: sm,
  sort: cm,
  row: dm,
  empty: um
}, hm = { asc: "ascending", desc: "descending" };
function mm(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return hm[t.direction];
}
function wm(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: qe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function fm(e) {
  return e === void 0 ? void 0 : { width: e };
}
function _m({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: qe.th,
      style: fm(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": mm(e, t),
      children: wm(e, a)
    }
  );
}
function vm({ row: e, props: t }) {
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
function bm({
  label: e,
  columns: t,
  rows: a,
  rowId: r,
  renderCell: o,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u,
  narrow: h
}) {
  return a.length === 0 ? /* @__PURE__ */ n("div", { className: qe.empty, children: u }) : /* @__PURE__ */ n("div", { className: qe.frame, "data-narrow": h, children: /* @__PURE__ */ l("table", { className: qe.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: qe.head, children: t.map((w) => /* @__PURE__ */ n(_m, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(vm, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: o, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const pm = "_list_v0s52_2", gm = {
  list: pm
};
function hT({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: gm.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const ym = "_label_1u62a_2", Nm = {
  label: ym
};
function mT({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: Nm.label, children: t.header }) }, t.key)) }) });
}
const km = "_stack_bp6a0_2", $m = {
  stack: km
};
function wT({ children: e }) {
  return /* @__PURE__ */ n("span", { className: $m.stack, "data-ward-action-stack": "", children: e });
}
const Cm = "_set_1z0sq_2", Sm = "_legend_1z0sq_7", Rm = "_row_1z0sq_15", Tm = "_control_1z0sq_20", xm = "_input_1z0sq_26", Lm = "_label_1z0sq_31", Am = "_consequence_1z0sq_36", We = {
  set: Cm,
  legend: Sm,
  row: Rm,
  control: Tm,
  input: xm,
  label: Lm,
  consequence: Am
};
function Ga({ legend: e, options: t, value: a, onChange: r, disabled: o, name: i, describedBy: s, variant: c }) {
  const d = k(), u = i ?? d;
  return /* @__PURE__ */ l("fieldset", { className: We.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: We.legend, children: e }),
    t.map((h) => {
      const w = `${u}-${h.value}`, f = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ l("div", { className: We.row, children: [
        /* @__PURE__ */ l("span", { className: We.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: We.input,
              value: h.value,
              checked: a === h.value,
              disabled: o,
              "aria-describedby": at(f, s),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: w, className: We.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: f, className: `${We.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Em = "_root_11gpw_2", Im = "_head_11gpw_10", Mm = "_note_11gpw_29", Bm = "_index_11gpw_34", Pm = "_dot_11gpw_38", jm = "_counter_11gpw_49", qm = "_trailing_11gpw_57", Ke = {
  root: Em,
  head: Im,
  note: Mm,
  index: Bm,
  dot: Pm,
  counter: jm,
  trailing: qm
};
function Om({ index: e }) {
  return e ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ke.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ke.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Hm({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ke.counter, "aria-hidden": "true", children: e }) : null;
}
function Wn({ title: e, index: t, note: a, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Ke.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Ke.head, children: [
      /* @__PURE__ */ n(Om, { index: t }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ke.note, children: a }),
    /* @__PURE__ */ n(Hm, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ke.trailing, children: i })
  ] });
}
const Dm = "_strip_c3x3u_2", Fm = "_cell_c3x3u_7", zm = "_value_c3x3u_12", Wm = "_link_c3x3u_29", Km = "_label_c3x3u_49", Gm = "_tiles_c3x3u_101", De = {
  strip: Dm,
  cell: Fm,
  value: zm,
  link: Wm,
  label: Km,
  tiles: Gm
};
function Ua(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((o) => o.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Va = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Um({ cell: e }) {
  return /* @__PURE__ */ l("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: Va(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function Vm({ cell: e, href: t }) {
  return /* @__PURE__ */ l("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: Va(e), title: e.hint, children: /* @__PURE__ */ l("a", { className: `${De.link} ward-stat-link`, href: H(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Ya = (e) => e.href === void 0 ? /* @__PURE__ */ n(Um, { cell: e }, e.label) : /* @__PURE__ */ n(Vm, { cell: e, href: e.href }, e.label);
function qt({ cells: e, divided: t = !1 }) {
  return Ua("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${De.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(Ya) });
}
const Kn = 6;
function fT({ cells: e }) {
  Ua("StatTiles", e, [1, 2 * Kn]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, Kn) };
  return /* @__PURE__ */ n("dl", { className: `${De.tiles} ward-stattiles`, style: t, children: e.map(Ya) });
}
const Ym = "_root_1eb1u_2", Jm = "_track_1eb1u_8", Qm = "_thumb_1eb1u_46", Xm = "_labelHidden_1eb1u_64", Zm = "_label_1eb1u_64", ew = "_lockedNote_1eb1u_84", Ge = {
  root: Ym,
  track: Jm,
  thumb: Qm,
  labelHidden: Xm,
  label: Zm,
  lockedNote: ew
};
function tw(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function nw(e) {
  return e ? `${Ge.label} ${Ge.labelHidden}` : Ge.label;
}
function aw(e, t, a) {
  return e && !t && a ? a : void 0;
}
function rw(e, t, a, r) {
  return { "aria-describedby": Pt(at(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function ow({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ve({ label: e, checked: t, onChange: a, disabled: r, locked: o, describedBy: i, labelHidden: s, disabledReason: c }) {
  const d = k(), u = `${d}switch`, h = `${d}reason`, w = Ae(), { on: f, off: y } = tw(t, r, o, w !== null), N = aw(y, w !== null, c);
  return /* @__PURE__ */ l("span", { className: `${Ge.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": f,
        "aria-label": e,
        "aria-labelledby": d,
        ...rw(h, i, w, N),
        className: `${Ge.track} ward-switch`,
        "data-on": f,
        "data-locked": o ? !0 : void 0,
        disabled: y,
        onClick: () => !y && (a == null ? void 0 : a(!f)),
        children: /* @__PURE__ */ n("span", { className: Ge.thumb })
      }
    ),
    /* @__PURE__ */ l("label", { id: d, htmlFor: u, className: nw(s), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ge.lockedNote, children: "always on" })
    ] }),
    /* @__PURE__ */ n(ow, { id: h, reason: N })
  ] });
}
const lw = "_bar_1vp69_2", iw = "_skip_1vp69_11", sw = "_mark_1vp69_22", cw = "_nav_1vp69_30", dw = "_list_1vp69_34", uw = "_select_1vp69_41", hw = "_selectTrigger_1vp69_45", mw = "_dest_1vp69_52", ww = "_actor_1vp69_71", fw = "_actorMark_1vp69_84", _w = "_actorLabel_1vp69_89", vw = "_tagline_1vp69_108", se = {
  bar: lw,
  skip: iw,
  mark: sw,
  nav: cw,
  list: dw,
  select: uw,
  selectTrigger: hw,
  dest: mw,
  actor: ww,
  actorMark: fw,
  actorLabel: _w,
  tagline: vw
};
function bw(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function pw(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function _T({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: o, onNavigate: i, skipTo: s = "main" }) {
  const c = pw(r);
  return /* @__PURE__ */ l("header", { className: se.bar, children: [
    /* @__PURE__ */ n("a", { className: `${se.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: se.mark, children: e }),
    o && /* @__PURE__ */ n("span", { className: se.tagline, children: o }),
    /* @__PURE__ */ l("nav", { className: se.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: se.list, children: t.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${se.dest} ward-target`,
          href: H(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        Aa,
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
    c && /* @__PURE__ */ l("span", { className: se.actor, children: [
      /* @__PURE__ */ n("span", { className: se.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: bw(c) })
    ] })
  ] });
}
const gw = "_tree_zzoob_2", yw = "_item_zzoob_6", Nw = "_row_zzoob_10", kw = "_button_zzoob_22", Tt = {
  tree: gw,
  item: yw,
  row: Nw,
  button: kw
}, Ja = Ne(null);
function $w({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Mt({ orientation: "vertical" });
  return /* @__PURE__ */ n(Ja.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: Tt.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const Cw = { ArrowRight: !0, ArrowLeft: !1 };
function Gn(e) {
  return e ? !0 : void 0;
}
function Sw(e, t) {
  const a = Cw[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function Rw(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function Tw(e) {
  const t = [Tt.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function xw(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Lw(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Aw(e) {
  return typeof e == "string" ? e : void 0;
}
function Ew({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Iw({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Qa(e) {
  const t = ye(Ja);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = xw(e);
  return /* @__PURE__ */ l("li", { className: Tt.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Tw(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": Gn(e.unresolved),
        "data-inherited": Gn(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${Tt.button} ward-treeitem-btn`,
            onClick: () => Rw(e),
            onKeyDown: (r) => Sw(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Lw(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Aw(e.label), children: e.label }),
              /* @__PURE__ */ n(Ew, { value: e.detail }),
              /* @__PURE__ */ n(Iw, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Mw = "_frame_gxspk_2", Bw = "_subjectRail_gxspk_22", Pw = "_subject_gxspk_22", jw = "_rail_gxspk_42", qw = "_record_gxspk_57", Ow = "_recordBody_gxspk_102", Hw = "_stageGrid_gxspk_157", Dw = "_band_gxspk_171", Fw = "_bandBody_gxspk_179", zw = "_bandActions_gxspk_184", Ww = "_scroller_gxspk_192", Kw = "_board_gxspk_219", Gw = "_lanes_gxspk_228", Uw = "_cardGrid_gxspk_262", ee = {
  frame: Mw,
  subjectRail: Bw,
  subject: Pw,
  rail: jw,
  record: qw,
  recordBody: Ow,
  stageGrid: Hw,
  band: Dw,
  bandBody: Fw,
  bandActions: zw,
  scroller: Ww,
  board: Kw,
  lanes: Gw,
  cardGrid: Uw
};
function vT({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: ee.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function Un(e) {
  return e ? "true" : void 0;
}
function bT({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: ee.subjectRail, "data-ward-subject-rail": a, "data-ruled": Un(i), children: [
    /* @__PURE__ */ n("div", { className: ee.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ee.rail, "data-sticky": Un(o), "aria-label": r, children: t })
  ] });
}
function pT({ title: e, children: t, note: a, trailing: r, pad: o = "block", label: i, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(Wn, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ l("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(Wn, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: ee.recordBody, "data-pad": o, "data-measure": c, children: t })
  ] });
}
const Vw = "_form_1j8ub_2", Yw = "_fields_1j8ub_9", Jw = "_actions_1j8ub_19", Kt = {
  form: Vw,
  fields: Yw,
  actions: Jw
};
function gT({ label: e, children: t, actions: a, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: Kt.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Kt.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: Kt.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function yT({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ l("section", { className: ee.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ee.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: ee.bandActions, children: t })
  ] });
}
const Qw = "(max-width: 767.98px)";
function vn({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(un, { className: ee.scroller, label: e, count: a ?? Fr.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function Xw({ lanes: e, label: t, laneLabel: a }) {
  const [r, o] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ l("div", { className: ee.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(j, { kind: "select", label: a, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ n(vn, { label: t, children: i == null ? void 0 : i.content })
  ] });
}
function Zw({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: ee.board, "data-ward-board": "", children: /* @__PURE__ */ n(vn, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(da, { children: a.content }, a.id)) }) });
}
function NT({ children: e, label: t = "Workflow board", lanes: a, laneLabel: r = "Column" }) {
  const o = dt(Qw);
  return a === void 0 ? /* @__PURE__ */ n(vn, { label: t, children: e }) : o ? /* @__PURE__ */ n(Xw, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(Zw, { lanes: a, label: t });
}
function kT({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), i = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ n(un, { className: ee.stageGrid, label: a, count: o, "data-ward-stage-grid": "", "data-floor": r, style: i, children: t });
}
function $T({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${ee.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const ef = "_block_6tv5x_3", tf = "_sentence_6tv5x_10", nf = "_meta_6tv5x_19", af = "_ways_6tv5x_24", rf = "_action_6tv5x_38", of = "_strip_6tv5x_42", lf = "_loading_6tv5x_61", sf = "_label_6tv5x_69", cf = "_counter_6tv5x_76", _e = {
  block: ef,
  sentence: tf,
  meta: nf,
  ways: af,
  action: rf,
  strip: of,
  loading: lf,
  label: sf,
  counter: cf
};
function df({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function Ot({ sentence: e, action: t, children: a, role: r = "status", tone: o, kind: i, ask: s }) {
  return /* @__PURE__ */ l("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ l("p", { className: _e.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ l(x, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(df, { action: t })
  ] });
}
function uf(e) {
  return /* @__PURE__ */ n(Ot, { ...e, kind: "ward-emptystate" });
}
function CT({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(Ot, { sentence: e, action: a, children: /* @__PURE__ */ l("p", { className: _e.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function hf({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${_e.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function ST({ ways: e, ...t }) {
  return /* @__PURE__ */ n(Ot, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(hf, { ways: e }) });
}
function RT({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(Ot, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ l("p", { className: _e.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function TT({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ l("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function xT({ queued: e, since: t }) {
  return /* @__PURE__ */ l("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function LT({ label: e, startedAt: t }) {
  const a = _(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = p(!1);
  S(() => {
    const s = window.setTimeout(() => o(!0), be.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = cn(a.current, r);
  return /* @__PURE__ */ l("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: _e.counter, children: ln(i) }) : null
  ] });
}
const mf = "_note_cigdt_2", wf = {
  note: mf
};
function ff({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ l("p", { className: wf.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const _f = "_card_k7btg_3", vf = "_hit_k7btg_31", bf = "_head_k7btg_44", pf = "_title_k7btg_51", gf = "_meta_k7btg_57", yf = "_since_k7btg_66", Nf = "_sep_k7btg_76", kf = "_fields_k7btg_80", $f = "_field_k7btg_80", Cf = "_last_k7btg_98", Sf = "_reason_k7btg_110", de = {
  card: _f,
  hit: vf,
  head: bf,
  title: pf,
  meta: gf,
  since: yf,
  sep: Nf,
  fields: kf,
  field: $f,
  last: Cf,
  reason: Sf
}, Rf = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Tf(e, t, a) {
  const r = gt(e, "blue"), o = gt(e, "orange"), i = gt(e, "green"), s = _(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: o, green: i };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Rf[d.type];
      u && c[u]();
    });
  }, [r, a, i, t, o]);
}
const xf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Lf(e, t) {
  return xf[t](e);
}
function Af({ item: e, connection: t }) {
  const a = /* @__PURE__ */ n("span", { className: de.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ l("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    a,
    /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ l("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.waitsOn,
    a,
    /* @__PURE__ */ l("span", { className: de.since, children: [
      ue(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Ef({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ l("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function If({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Mf({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: de.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: de.field, children: Lf(e, a) }, a)) });
}
const tn = (e) => e ? !0 : void 0;
function Bf(e) {
  return { "--stream": ge(e.streamStep, "id") };
}
function Pf(e, t, a) {
  e == null || e(t, a);
}
function jf(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function qf({ item: e, stale: t }) {
  var r, o;
  const a = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: de.last, "data-stale": tn(t), children: a }) : null;
}
function Ht(e) {
  const t = e.fields ?? [], a = e.item, r = _(null);
  Tf(r, a.key, e.feed);
  const o = jf(e.feed), i = Bf(a);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: de.card,
      style: i,
      "data-selected": tn(e.selected),
      "data-flagged": tn(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: de.hit, onClick: (s) => Pf(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(Ef, { item: a }),
        /* @__PURE__ */ n(nt, { as: "p", className: de.title, text: a.title }),
        /* @__PURE__ */ n(Af, { item: a, connection: o }),
        /* @__PURE__ */ n(If, { reason: a.blockedReason }),
        /* @__PURE__ */ n(Mf, { item: a, fields: t }),
        /* @__PURE__ */ n(qf, { item: a, stale: o === "stale" })
      ]
    }
  );
}
const Of = "_column_1j8bi_3", Hf = "_head_1j8bi_21", Df = "_label_1j8bi_30", Ff = "_count_1j8bi_39", zf = "_list_1j8bi_53", st = {
  column: Of,
  head: Hf,
  label: Df,
  count: Ff,
  list: zf
};
function Xa(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function Wf({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ l("div", { className: st.head, children: [
    /* @__PURE__ */ n("h2", { className: st.label, id: a, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ l("span", { className: st.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Kf(e) {
  return /* @__PURE__ */ n("div", { className: st.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      Ht,
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
function Gf({ column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = k(), h = e.cap !== void 0 && t.length > e.cap, w = Xa(t, r);
  return /* @__PURE__ */ l("section", { className: st.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Wf, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(Kf, { column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n(ff, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const Uf = "_foot_cs4jr_2", Vf = "_note_cs4jr_13", Yf = "_link_cs4jr_19", Gt = {
  foot: Uf,
  note: Vf,
  link: Yf
};
function AT({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: Gt.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Gt.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Gt.link} ward-target`, href: H(e), children: "Configure board" })
  ] });
}
const Jf = "_head_1tfi5_3", Qf = "_identity_1tfi5_12", Xf = "_titleRow_1tfi5_18", Zf = "_title_1tfi5_18", e_ = "_key_1tfi5_35", t_ = "_rollup_1tfi5_45", n_ = "_tools_1tfi5_53", a_ = "_swatch_1tfi5_101", r_ = "_mark_1tfi5_108", Se = {
  head: Jf,
  identity: Qf,
  titleRow: Xf,
  title: Zf,
  key: e_,
  rollup: t_,
  tools: n_,
  swatch: a_,
  mark: r_
}, Vn = "initials:";
function o_(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function l_(e) {
  const t = [o_(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function i_(e) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ l("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    l_(e)
  ] });
}
function s_(e) {
  return e.startsWith(Vn) ? e.slice(Vn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function c_({ markRef: e, streamStep: t }) {
  const a = { "--stream": ge(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Se.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: s_(e) }) : /* @__PURE__ */ n("span", { className: Se.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function d_({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(j, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function ET({
  stream: e,
  rollups: t,
  connection: a,
  lastEventAt: r,
  owners: o,
  owner: i,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ l("div", { className: Se.head, children: [
    /* @__PURE__ */ l("div", { className: Se.identity, children: [
      /* @__PURE__ */ l("div", { className: Se.titleRow, children: [
        /* @__PURE__ */ n(c_, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Se.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Se.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Se.rollup, "aria-live": "polite", children: i_(t) })
    ] }),
    /* @__PURE__ */ l("div", { className: Se.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(d_, { owners: o, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(_n, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const u_ = "_head_1sejb_14", h_ = "_line_1sejb_15", m_ = "_cHandle_1sejb_36", w_ = "_cName_1sejb_41", f_ = "_nameLine_1sejb_49", __ = "_cLabel_1sejb_56", v_ = "_cCap_1sejb_61", b_ = "_cShown_1sejb_66", p_ = "_name_1sejb_49", g_ = "_noCap_1sejb_88", y_ = "_state_1sejb_102", N_ = "_handle_1sejb_111", k_ = "_sub_1sejb_137", O = {
  head: u_,
  line: h_,
  cHandle: m_,
  cName: w_,
  nameLine: f_,
  cLabel: __,
  cCap: v_,
  cShown: b_,
  name: p_,
  noCap: g_,
  state: y_,
  handle: N_,
  sub: k_
}, $_ = "can't be hidden or collapsed", C_ = "terminal · counted, not a column", S_ = "A human gate is always shown, so people see what waits for them.", R_ = "A terminal stage is counted, not shown as a column.";
function IT() {
  return /* @__PURE__ */ l("div", { className: O.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: O.cHandle }),
    /* @__PURE__ */ n("span", { className: O.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: O.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: O.cShown, children: "Shown" })
  ] });
}
function T_(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function x_(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Yn(e) {
  return e.gate ? $_ : e.terminal ? C_ : x_(e.agentsMounted);
}
function L_(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function A_({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: O.cName, children: [
    /* @__PURE__ */ l("span", { className: O.nameLine, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Yn(e) && /* @__PURE__ */ n("span", { className: O.sub, children: Yn(e) })
  ] });
}
function E_(e) {
  return e === void 0 ? "" : String(e);
}
function I_(e) {
  return e === "" ? void 0 : Number(e);
}
function M_({ name: e, onReorder: t }) {
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
      onKeyDown: (r) => !a && L_(r, t),
      children: "⠿"
    }
  ) });
}
function B_({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${O.cCap} ${O.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: O.cCap, children: /* @__PURE__ */ n(j, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: E_(t.cap), onChange: (r) => a({ ...t, cap: I_(r) }) }) });
}
function P_(e) {
  return e.gate ? S_ : e.terminal ? R_ : void 0;
}
function j_({ stage: e, config: t, onChange: a }) {
  const r = Ae() !== null, o = T_(e, t.shown), i = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ l("span", { className: O.cShown, children: [
    /* @__PURE__ */ n(Ve, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, disabledReason: P_(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: O.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!o.shown), children: o.state })
  ] });
}
function q_(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function MT({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: O.line, "data-kind": q_(e), children: [
    /* @__PURE__ */ n(M_, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(A_, { stage: e }),
    /* @__PURE__ */ n("span", { className: O.cLabel, children: /* @__PURE__ */ n(j, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (o) => a({ ...t, label: o }) }) }),
    /* @__PURE__ */ n(B_, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(j_, { stage: e, config: t, onChange: a })
  ] });
}
const O_ = "_body_8qsv9_2", H_ = "_head_8qsv9_9", D_ = "_summary_8qsv9_19", F_ = "_block_8qsv9_20", z_ = "_actionsBlock_8qsv9_21", W_ = "_title_8qsv9_41", K_ = "_note_8qsv9_46", G_ = "_k_8qsv9_51", U_ = "_kv_8qsv9_58", V_ = "_row_8qsv9_64", Y_ = "_label_8qsv9_75", J_ = "_value_8qsv9_84", Q_ = "_quote_8qsv9_90", X_ = "_actions_8qsv9_21", Z_ = "_resolve_8qsv9_111", F = {
  body: O_,
  head: H_,
  summary: D_,
  block: F_,
  actionsBlock: z_,
  title: W_,
  note: K_,
  k: G_,
  kv: U_,
  row: V_,
  label: Y_,
  value: J_,
  quote: Q_,
  actions: X_,
  resolve: Z_
};
function ev(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function tv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function nv(e) {
  const t = wt(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function av(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function rv(e, t, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...jt(nv(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...ev(e),
    ...av(a),
    ...tv(e, t)
  ];
}
function ov({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: F.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: F.k, children: t }),
    e
  ] });
}
function lv(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function iv({ item: e, showKey: t }) {
  const a = lv(e);
  return !t && !a ? null : /* @__PURE__ */ l("div", { className: F.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function sv({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: F.block, children: [
    /* @__PURE__ */ n("p", { className: F.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: F.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: F.note, children: e.agentMeta })
  ] }) : null;
}
function BT({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: o, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = k(), w = rv(e, o, d);
  return /* @__PURE__ */ n(rt, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: F.body, children: [
    /* @__PURE__ */ n(iv, { item: e, showKey: u }),
    /* @__PURE__ */ l("div", { className: F.summary, children: [
      /* @__PURE__ */ n("h2", { className: F.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: F.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: F.kv, children: w.map(([f, y, N]) => /* @__PURE__ */ l("div", { className: F.row, children: [
      /* @__PURE__ */ n("dt", { className: F.label, children: f }),
      /* @__PURE__ */ n("dd", { className: F.value, children: y })
    ] }, N ?? f)) }),
    /* @__PURE__ */ n(sv, { item: e }),
    /* @__PURE__ */ l("div", { className: F.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: F.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: F.note, children: c })
    ] }),
    /* @__PURE__ */ n(ov, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const cv = "_root_3azmy_2", dv = "_list_3azmy_7", uv = "_item_3azmy_12", hv = "_box_3azmy_18", mv = "_text_3azmy_23", wv = "_note_3azmy_28", Je = {
  root: cv,
  list: dv,
  item: uv,
  box: hv,
  text: mv,
  note: wv
};
function Dt({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ l("div", { className: Je.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${Je.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${Je.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Je.box, children: /* @__PURE__ */ n(fn, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Je.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${Je.note} ward-checklist-note`, children: t })
  ] });
}
const fv = "_rail_znbbp_2", _v = "_k_znbbp_11", vv = "_head_znbbp_19", bv = "_section_znbbp_25", pv = "_card_znbbp_39", gv = "_strip_znbbp_46", yv = "_skeleton_znbbp_60", Nv = "_skeletonLabel_znbbp_74", kv = "_bar_znbbp_80", $v = "_note_znbbp_89", fe = {
  rail: fv,
  k: _v,
  head: vv,
  section: bv,
  card: pv,
  strip: gv,
  skeleton: yv,
  skeletonLabel: Nv,
  bar: kv,
  note: $v
};
function Cv(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Ut({ title: e, children: t }) {
  return /* @__PURE__ */ l("section", { className: fe.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: fe.k, children: e }),
    t
  ] });
}
function Sv({ column: e, count: t }) {
  return /* @__PURE__ */ l("div", { className: fe.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: fe.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: fe.bar, "aria-hidden": "true" }, r))
  ] });
}
function Rv({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(Gf, { column: o, items: t.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, o.id));
}
function Tv(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Rv, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(Sv, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function PT(e) {
  const t = Cv(e.onOpen), a = Xa(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: fe.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${fe.k} ${fe.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ut, { title: "Card", children: /* @__PURE__ */ n("div", { className: fe.card, children: a && /* @__PURE__ */ n(Ht, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ l(Ut, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: fe.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Tv, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ut, { title: "Effect of this config", children: /* @__PURE__ */ n(Dt, { items: e.effects, density: "compact" }) })
  ] });
}
function xv(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function Lv(e) {
  return Math.ceil(e.length / 2);
}
function Av(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Za(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Ev(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const o = Za(e);
  o !== void 0 && a(o), r(Av(e.type));
}
function Iv(e, t, a, r, o) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (i) => Ev(i, a, r, o));
  }, [e, t, a, r, o]);
}
function Mv(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Bv(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Pv(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function jv(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + B.height.card + " + " + B.height.cardRow + " * " + String(Lv(t ?? [])) + ")"
  };
}
function qv(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Ov(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: le(e.cost) }) : null;
}
function Hv(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Dv(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function Fv(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function zv(e, t) {
  return t === void 0 ? e : xv(e, t.ref);
}
function Wv(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ut(e) {
  return e === !0 ? "true" : void 0;
}
function er(e) {
  const t = e.item, a = t.run, r = a !== void 0, o = _(null), i = gt(o), s = _(/* @__PURE__ */ new Set()), [c, d] = p(Mv(t));
  Iv(e.feed, t.key, s, d, i);
  const u = Bv(t, r), h = Pv(t, a), w = jv(t, e.fields), f = Fv(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...Wv(e),
      className: "ward-workcard",
      "data-flagged": ut(t.flagged),
      "data-selected": ut(e.selected),
      style: w,
      ref: zv(o, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        qv(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          Ov(t, e.fields),
          Hv(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          Dv(a, c, e.connection, t.changedAt),
          f !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function Kv({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function Gv(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Uv(e, t, a) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function Vv(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Kv, { count: e.items.length, cap: e.column.cap });
}
function Yv(e, t) {
  return e.roving ?? t;
}
function Jv(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function Qv(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    er,
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
function Xv(e) {
  const t = k(), a = Mt({ orientation: "vertical" }), r = Yv(e, a), o = Gv(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": ut(o), "data-gate": ut(e.column.gate), children: [
    Uv(e.column, e.items.length, t),
    Vv(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Jv(e, a), children: Qv(e, r) })
  ] });
}
function Zv(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function eb(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(j, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function tb(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function jT(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Zv(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      eb(e),
      tb(e.onConfigure),
      /* @__PURE__ */ n(_n, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function nb(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function ab(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ve, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ve, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function rb(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(x, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function qT(e) {
  const t = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": ut(nb(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: ab(e) }),
    /* @__PURE__ */ n(j, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(ka, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    rb(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function OT(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(er, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Xv, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function ob(e, t) {
  const a = Za(e);
  a !== void 0 && t(a);
}
function lb(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => ob(r, a));
  }, [e, t, a]);
}
function ib(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function sb(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function cb(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function db(e, t) {
  return /* @__PURE__ */ l(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function HT(e) {
  var s;
  const t = e.item, a = t.run, [r, o] = p((s = t.run) == null ? void 0 : s.lastStep);
  lb(e.feed, t.key, o);
  const i = [...ib(t), ...sb(t)];
  return /* @__PURE__ */ l(rt, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      cb(a, r)
    ] }),
    db(t, e.actions)
  ] });
}
const ub = "_card_1nkkx_3", hb = "_head_1nkkx_30", mb = "_mark_1nkkx_38", wb = "_name_1nkkx_50", fb = "_chips_1nkkx_71", _b = "_description_1nkkx_77", vb = "_run_1nkkx_82", bb = "_sep_1nkkx_91", pb = "_facts_1nkkx_97", gb = "_fact_1nkkx_97", yb = "_factLabel_1nkkx_111", Nb = "_factValue_1nkkx_115", ie = {
  card: ub,
  head: hb,
  mark: mb,
  name: wb,
  chips: fb,
  description: _b,
  run: vb,
  sep: bb,
  facts: pb,
  fact: gb,
  factLabel: yb,
  factValue: Nb
}, kb = { live: "done", draft: "running", paused: "meta" };
function $b(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function Cb({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: kb[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function Sb({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function Rb({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function Tb({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ l("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function xb(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Lb({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: o, facts: i, className: s }) {
  const c = { "--stream": ge(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": d,
      className: $b(s),
      style: c,
      "data-selected": d,
      "data-paused": xb(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ l("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: H(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(Sb, { description: e.description }),
        /* @__PURE__ */ n(Rb, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Cb, { versions: e.versions }),
        /* @__PURE__ */ n(Tb, { facts: i })
      ]
    }
  );
}
const Ab = "_list_4dcyc_2", Eb = "_row_4dcyc_11", Ib = "_head_4dcyc_23", Mb = "_id_4dcyc_30", Bb = "_lock_4dcyc_35", Pb = "_reason_4dcyc_41", jb = "_remove_4dcyc_46", qb = "_clauses_4dcyc_50", Ob = "_clause_4dcyc_50", Hb = "_label_4dcyc_64", Db = "_cell_4dcyc_71", Fb = "_value_4dcyc_76", ce = {
  list: Ab,
  row: Eb,
  head: Ib,
  id: Mb,
  lock: Bb,
  reason: Pb,
  remove: jb,
  clauses: qb,
  clause: Ob,
  label: Hb,
  cell: Db,
  value: Fb
}, tr = Ne(!1);
function DT({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(tr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function zb({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(j, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => a(e.key, o) });
}
function Wb({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function Kb({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ l("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Wb, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Jn(e, t) {
  return e.locked ? void 0 : t;
}
function FT({ rule: e, onChange: t, onRemove: a }) {
  if (!ye(tr)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Jn(e, t);
  return /* @__PURE__ */ l("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Kb, { rule: e, onRemove: Jn(e, a) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(zb, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const Gb = "_ladder_1xdeh_2", Ub = "_cell_1xdeh_7", Vb = "_empty_1xdeh_26", Yb = "_name_1xdeh_34", Jb = "_holder_1xdeh_40", Qb = "_request_1xdeh_46", Xb = "_swatches_1xdeh_51", Zb = "_swatch_1xdeh_51", ep = "_tilesFrame_1xdeh_78", tp = "_tiles_1xdeh_78", np = "_tile_1xdeh_78", ap = "_bar_1xdeh_117", rp = "_hex_1xdeh_128", op = "_note_1xdeh_138", M = {
  ladder: Gb,
  cell: Ub,
  empty: Vb,
  name: Yb,
  holder: Jb,
  request: Qb,
  swatches: Xb,
  swatch: Zb,
  tilesFrame: ep,
  tiles: tp,
  tile: np,
  bar: ap,
  hex: rp,
  note: op
}, zT = "not validated yet, pending a CVD matrix and dark stepping";
function lp(e) {
  return e.reserved ? "reserved" : ht(e.step) ? "validated" : "partial";
}
function nr(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function ip(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function sp({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Fe, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${M.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function cp(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function dp(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Qn = (e) => String(e).padStart(2, "0");
function up(e, t, a) {
  return e === "reserved" ? "Reserved until revalidated" : a ? "yours" : t ?? nr(e, void 0);
}
function hp({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${M.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${M.hex} ward-ladder-hex`, children: r ? `step ${Qn(e)}` : co(e) }),
    /* @__PURE__ */ n("span", { className: `${M.note} ward-ladder-note`, children: r ? a : `Step ${Qn(e)} · ${a}` })
  ] });
}
function mp({ step: e, value: t, taken: a, onChange: r, presentation: o, disabled: i }) {
  const s = lp(e), c = nr(s, a), d = c !== "free", u = d || i, h = t === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, y = `${w} · ${o === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...dp(d, h, u), "data-validation": s, style: ip(e, s), onClick: f, onKeyDown: (A) => cp(A, f) }, label: y, name: w, holder: c, validation: s, note: up(s, a, h), step: e.step };
}
const wp = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${M.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${M.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(hp, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${M.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(sp, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${M.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${M.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function fp(e) {
  return wp[e.presentation](mp(e));
}
function _p(e) {
  for (const t of e)
    if (!t.reserved && !Bt(t.step)) throw new Error("colour ladder renders token steps only");
}
function vp() {
  return /* @__PURE__ */ l("div", { className: `${M.cell} ward-ladder-cell ${M.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${M.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${M.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${M.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function bp(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const pp = { list: M.ladder, swatches: M.swatches, tiles: M.tilesFrame };
function gp() {
  return /* @__PURE__ */ l("div", { className: `${M.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${M.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${M.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${M.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const yp = { list: vp, swatches: () => null, tiles: gp };
function Np(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function ar(e) {
  const t = e.takenBy ?? {}, a = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  _p(e.steps);
  const r = bp(e), o = yp[r], i = /* @__PURE__ */ l(x, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(fp, { step: s, value: e.value, taken: t[s.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Np(e.disabled === !0), className: `${pp[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: M.tiles, children: i }) : i });
}
const kp = "_rail_s06lm_2", $p = "_section_s06lm_12", Cp = "_sectionFlush_s06lm_22", Sp = "_head_s06lm_26", Rp = "_headLabel_s06lm_34", Tp = "_sample_s06lm_42", xp = "_sampleLabel_s06lm_47", Lp = "_sampleTitle_s06lm_54", Ap = "_sampleMeta_s06lm_59", Ep = "_trace_s06lm_65", Ip = "_traceHead_s06lm_70", Mp = "_steps_s06lm_78", Bp = "_step_s06lm_78", Pp = "_stepTitle_s06lm_97", jp = "_hollow_s06lm_107", qp = "_stepBody_s06lm_115", Op = "_stepDetail_s06lm_127", Hp = "_publish_s06lm_132", Dp = "_reason_s06lm_138", Fp = "_note_s06lm_143", zp = "_reveal_s06lm_148", $ = {
  rail: kp,
  section: $p,
  sectionFlush: Cp,
  head: Sp,
  headLabel: Rp,
  sample: Tp,
  sampleLabel: xp,
  sampleTitle: Lp,
  sampleMeta: Ap,
  trace: Ep,
  traceHead: Ip,
  steps: Mp,
  step: Bp,
  stepTitle: Pp,
  hollow: jp,
  stepBody: qp,
  stepDetail: Op,
  publish: Hp,
  reason: Dp,
  note: Fp,
  reveal: zp
}, Xn = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Wp = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Kp = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Gp = { notSimulated: "not simulated", running: "running" };
function Up(e) {
  return e.presentation === "foundry";
}
function Vp(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const a = t.filter((r) => !r.met);
  return a.length > 0 ? `Publish is disabled: ${a.length} of ${t.length} gate conditions unmet: ${a[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Yp(e, t) {
  var r;
  const a = Wp[e.status];
  return a !== void 0 ? a : ((r = t.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function Jp(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Qp(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Xp(e) {
  if (Jp(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Zp(e) {
  const [t, a] = p(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function eg(e) {
  const t = Gp[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(Fe, { size: 6, kind: Kp[e.kind], label: e.kind });
}
function tg(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function ng(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function ag(e) {
  const { step: t } = e;
  return /* @__PURE__ */ l(Zp, { kind: t.kind, children: [
    /* @__PURE__ */ n(eg, { kind: t.kind }),
    /* @__PURE__ */ l("span", { className: $.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: $.stepTitle, children: t.title }),
      /* @__PURE__ */ n(tg, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(ng, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function rg(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(ue(t)), a.join(" · ");
}
function rr(e) {
  const t = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.traceHead, id: t, children: rg(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: $.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(ag, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function og(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ l("div", { className: `${$.sample} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ l("p", { className: $.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ l("p", { className: $.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function lg(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function ig(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? ha(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(qt, { divided: !0, cells: t }) });
}
function sg(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: ha(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function cg(e) {
  const t = sg(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ l("p", { className: $.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(qt, { divided: !0, cells: t }) });
}
function or(e) {
  const t = k();
  return e.reason !== null ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: `${$.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function dg(e) {
  return /* @__PURE__ */ l("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ n(or, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: $.note, children: e.note })
  ] });
}
function ug(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ n(or, { reason: e.reason, onPublish: e.onPublish }) });
}
function lr(e) {
  return /* @__PURE__ */ l("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: Xn[e.run.status].role, label: Xn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function hg(e, t) {
  const [a, r] = p(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((t == null ? void 0 : t.subscribe) === void 0 || e.status !== "running"))
      return t.subscribe("*", (o) => {
        (o.type === "run.step" || o.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: o.type === "run.finding" ? "finding" : "action", title: ((s = o.step) == null ? void 0 : s.label) ?? "step", detail: (c = o.step) == null ? void 0 : c.tool }];
        });
      });
  }, [t, e.status]), a;
}
function mg(e) {
  var a;
  Qp(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(lr, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(og, { sample: e.run.sample }),
    /* @__PURE__ */ n(rr, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(ig, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Dt, { items: e.checklist }) }),
    /* @__PURE__ */ n(dg, { reason: Vp(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function wg(e) {
  var r;
  const t = hg(e.run, e.feed);
  Xp(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(lr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(lg, { sample: e.run.sample }),
    /* @__PURE__ */ n(rr, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(cg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(Dt, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(ug, { reason: Yp(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function WT(e) {
  return Up(e) ? /* @__PURE__ */ n(wg, { ...e }) : /* @__PURE__ */ n(mg, { ...e });
}
const fg = "_list_142ip_3", _g = "_row_142ip_9", vg = "_condition_142ip_18", bg = "_action_142ip_24", Nt = {
  list: fg,
  row: _g,
  condition: vg,
  action: bg
}, ir = Ne(!1);
function KT({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(ir.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: Nt.list, "aria-label": t, children: e }) });
}
function GT({ rule: e }) {
  if (!ye(ir)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: Nt.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: Nt.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: Nt.action, children: e.then })
  ] });
}
const pg = "_move_tmppt_3", gg = {
  move: pg
};
function nn(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [o] = r.splice(t, 1);
  return r.splice(a, 0, o), r;
}
function sr(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function cr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function Zn(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function yg(e) {
  return e === "up" ? "down" : "up";
}
function Ng(e, t) {
  const a = Zn(e, t.id, t.direction) ?? Zn(e, t.id, yg(t.direction));
  a == null || a.focus();
}
function dr() {
  const e = _(null), [t, a] = p(null), [r, o] = p("");
  return S(() => {
    e.current !== null && t !== null && Ng(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), o(c);
  } };
}
function ur({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function xt({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${gg.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const kg = "_body_1jd1i_2", $g = "_title_1jd1i_8", Cg = "_section_1jd1i_13", Sg = "_legend_1jd1i_18", Rg = "_stages_1jd1i_26", Tg = "_stage_1jd1i_26", xg = "_stageIndex_1jd1i_44", Lg = "_stageName_1jd1i_50", Ag = "_footer_1jd1i_59", Eg = "_note_1jd1i_66", Ig = "_reason_1jd1i_71", Mg = "_actions_1jd1i_76", Bg = "_webHead_1jd1i_83", Pg = "_kicker_1jd1i_92", jg = "_webTitle_1jd1i_99", qg = "_webBody_1jd1i_105", Og = "_webSection_1jd1i_109", Hg = "_sectionHead_1jd1i_121", Dg = "_sectionNote_1jd1i_129", Fg = "_formLabel_1jd1i_134", zg = "_identityRow_1jd1i_139", Wg = "_nameCell_1jd1i_145", Kg = "_keyCell_1jd1i_150", Gg = "_colourCell_1jd1i_154", Ug = "_colourStatus_1jd1i_161", Vg = "_webStages_1jd1i_166", Yg = "_webStageList_1jd1i_172", Jg = "_webStage_1jd1i_166", Qg = "_webIndex_1jd1i_191", Xg = "_webStageName_1jd1i_196", Zg = "_webMoves_1jd1i_201", ey = "_addStage_1jd1i_215", ty = "_addStageButton_1jd1i_223", ny = "_addStageNote_1jd1i_231", ay = "_webFooter_1jd1i_236", ry = "_webFooterNotes_1jd1i_244", oy = "_webNote_1jd1i_251", v = {
  body: kg,
  title: $g,
  section: Cg,
  legend: Sg,
  stages: Rg,
  stage: Tg,
  stageIndex: xg,
  stageName: Lg,
  footer: Ag,
  note: Eg,
  reason: Ig,
  actions: Mg,
  webHead: Bg,
  kicker: Pg,
  webTitle: jg,
  webBody: qg,
  webSection: Og,
  sectionHead: Hg,
  sectionNote: Dg,
  formLabel: Fg,
  identityRow: zg,
  nameCell: Wg,
  keyCell: Kg,
  colourCell: Gg,
  colourStatus: Ug,
  webStages: Vg,
  webStageList: Yg,
  webStage: Jg,
  webIndex: Qg,
  webStageName: Xg,
  webMoves: Zg,
  addStage: ey,
  addStageButton: ty,
  addStageNote: ny,
  webFooter: ay,
  webFooterNotes: ry,
  webNote: oy
}, ly = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], hr = "not in catalogue";
function iy(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${hr}` }, ...a];
}
function sy({ stage: e, index: t, catalogue: a, onName: r }) {
  const o = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(j, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${hr}`;
  return /* @__PURE__ */ n(j, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: iy(a, e.name), invalid: i, onChange: r });
}
function mr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function cy(e) {
  const t = _([]), a = _(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function dy({ id: e, stage: t, index: a, total: r, catalogue: o, onReplace: i, onMove: s }) {
  const c = mr(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: v.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: v.webStageName, children: /* @__PURE__ */ n(sy, { stage: t, index: a, catalogue: o, onName: (u) => i({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(j, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: ly, onChange: (u) => i({ ...t, kind: u }) }),
    /* @__PURE__ */ l("span", { className: v.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(xt, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(xt, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function uy({ stages: e, onChange: t, catalogue: a }) {
  const r = cy(e.length), o = dr(), i = (c, d) => {
    const u = sr(c, d);
    r.current = nn(r.current, c, u), o.moved({ id: r.current[u], direction: d }, cr(mr(e[c], c), u, e.length)), t(nn(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ l("div", { className: v.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(dy, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(ur, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: v.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const hy = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], my = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], wy = "A new stream starts as a draft. Nothing runs on it until you publish it.", fy = "Create is disabled: name the stream and give it a key first.", _y = "reorder with the ↑ ↓ buttons · min 2";
function bn(e, t) {
  return !e.reserved && ht(e.step) && t[e.step] === void 0;
}
function vy(e, t) {
  const a = e.find((r) => bn(r, t));
  return a ? a.step : 1;
}
function by({ stages: e, onMove: t }) {
  const a = dr(), r = (o, i) => {
    const s = sr(o, i);
    a.moved({ id: e[o].id, direction: i }, cr(e[o].name, s, e.length)), t(o, s);
  };
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: v.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: v.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: v.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(xt, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(xt, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(ur, { text: a.announcement })
  ] });
}
function py({ reason: e, onCreate: t, onDraft: a }) {
  const r = k();
  return /* @__PURE__ */ l("div", { className: v.footer, children: [
    /* @__PURE__ */ n("p", { className: v.note, children: wy }),
    e && /* @__PURE__ */ n("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: v.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function gy(e, t) {
  return e !== "" && t !== "" ? null : fy;
}
function yy(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: o = my, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = k(), [h, w] = p(""), [f, y] = p(""), [N, A] = p(t[0].value), [q, me] = p(() => vy(a, r)), [re, Ee] = p(e.stages ?? hy), [Ye, T] = p(o[0].value), J = { name: h, key: f, streamStep: q, owner: N, stages: re, policy: Ye }, ke = gy(h, f);
  return /* @__PURE__ */ n(rt, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ l("div", { className: v.body, children: [
    /* @__PURE__ */ n("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ n(j, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ n(j, { kind: "input", label: "Key", value: f, onChange: y, mono: !0 }),
      /* @__PURE__ */ n(j, { kind: "select", label: "Owner", value: N, onChange: A, options: t })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ n(ar, { label: "Stream colour", steps: a, value: q, onChange: me, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ n(by, { stages: re, onMove: (ze, Hr) => Ee(nn(re, ze, Hr)) })
    ] }),
    /* @__PURE__ */ n(Ga, { legend: "Loop policy", options: o, value: Ye, onChange: T }),
    /* @__PURE__ */ n(py, { reason: ke, onCreate: () => i(J), onDraft: () => s(J) })
  ] }) });
}
const wr = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Ny = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function ky(e, t, a, r, o, i) {
  var c;
  const s = ((c = wr.find((d) => d.value === o)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: i };
}
function $y(e, t) {
  return Cy(e) && Sy(e, t) && Ry(e);
}
function Cy(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Sy(e, t) {
  return e.colourStep === null || bn({ step: e.colourStep }, t);
}
function Ry(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function Ty(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : bn({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function xy({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function Ly({ ready: e, draft: t, agentStage: a, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: v.webFooter, children: [
    /* @__PURE__ */ l("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ n(xy, { stage: a }),
      !e && /* @__PURE__ */ n("p", { id: i, className: v.reason, children: Ny })
    ] }),
    o && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => o(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Ay({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: v.webHead, children: [
    /* @__PURE__ */ n("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function Ey({ name: e, setName: t, streamKey: a, setKey: r, colour: o, owner: i }) {
  return /* @__PURE__ */ l("section", { className: v.webSection, children: [
    /* @__PURE__ */ n("h3", { className: v.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ l("div", { className: v.identityRow, children: [
      /* @__PURE__ */ n("div", { className: v.nameCell, children: /* @__PURE__ */ n(j, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ n("div", { className: v.keyCell, children: /* @__PURE__ */ n(j, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      o
    ] }),
    i
  ] });
}
function Iy(e) {
  const t = k(), a = k(), r = e.takenBy ?? {}, [o, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [f, y] = p("relay"), [N, A] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), q = ky(o, s, d, h, f, N), me = $y(q, r), re = N.find((T) => T.kind === "agent" && T.name.trim() !== ""), Ee = /* @__PURE__ */ l("div", { className: v.colourCell, children: [
    /* @__PURE__ */ n("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(ar, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ye = /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: v.colourStatus, "data-colour-status": "", children: Ty(h, r) }),
    /* @__PURE__ */ n(j, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((T) => ({ value: T, label: T })), onChange: u })
  ] });
  return /* @__PURE__ */ l(rt, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Ay, { titleId: a }),
    /* @__PURE__ */ l("div", { className: v.webBody, children: [
      /* @__PURE__ */ n(Ey, { name: o, setName: i, streamKey: s, setKey: c, colour: Ee, owner: Ye }),
      e.fields && /* @__PURE__ */ n("section", { className: v.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ l("section", { className: v.webSection, children: [
        /* @__PURE__ */ l("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: v.sectionNote, children: _y })
        ] }),
        /* @__PURE__ */ n(uy, { stages: N, onChange: A })
      ] }),
      /* @__PURE__ */ n("section", { className: v.webSection, children: /* @__PURE__ */ n(Ga, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: wr, onChange: y }) }),
      /* @__PURE__ */ n(Ly, { ready: me, draft: q, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function UT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Iy, { ...e }) : /* @__PURE__ */ n(yy, { ...e });
}
const My = "_row_bs8hc_2", By = "_cell_bs8hc_6", Py = "_condition_bs8hc_11", jy = "_action_bs8hc_18", qy = "_contract_bs8hc_24", Oy = "_contractCondition_bs8hc_33", Hy = "_contractAction_bs8hc_39", ne = {
  row: My,
  cell: By,
  condition: Py,
  action: jy,
  contract: qy,
  contractCondition: Oy,
  contractAction: Hy
}, fr = ["advance", "block", "escalate", "requestReview"], ea = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Lt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function pn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ne.action, children: ea[e.then] }) : /* @__PURE__ */ n(
    j,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => t({ ...e, then: o }),
      options: fr.map((o) => ({ value: o, label: ea[o] }))
    }
  );
}
function Dy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n("span", { className: ne.condition, title: Lt(e, r), children: Lt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: pn(e, t, a) })
  ] });
}
function Fy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ l("td", { className: ne.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ne.condition, children: Lt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: pn(e, t, a) })
  ] });
}
function zy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: ne.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ne.contractCondition, children: Lt(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ne.contractAction, children: pn(e, t, a, !0) })
  ] });
}
const Wy = { two: Fy, four: Dy, contract: zy };
function VT(e) {
  var a;
  if (!fr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = Wy[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const Ky = "_column_g1uat_2", Gy = "_head_g1uat_17", Uy = "_index_g1uat_23", Vy = "_name_g1uat_29", Yy = "_meta_g1uat_38", Jy = "_mono_g1uat_43", Qy = "_gate_g1uat_50", Xy = "_reviewersLabel_g1uat_57", Zy = "_reviewers_g1uat_57", eN = "_reviewer_g1uat_57", tN = "_agents_g1uat_74", nN = "_workflowColumn_g1uat_79", aN = "_workflowHead_g1uat_96", rN = "_stageRow_g1uat_102", oN = "_stageLabel_g1uat_109", lN = "_workflowTitle_g1uat_116", iN = "_workflowMeta_g1uat_122", sN = "_workflowGate_g1uat_127", cN = "_gateNote_g1uat_135", dN = "_cardNote_g1uat_140", uN = "_reviewerList_g1uat_145", hN = "_reviewerRow_g1uat_151", mN = "_reviewerMark_g1uat_157", wN = "_reviewerName_g1uat_167", fN = "_terminalCard_g1uat_173", _N = "_terminalCount_g1uat_182", vN = "_workflowAgents_g1uat_188", bN = "_mount_g1uat_194", R = {
  column: Ky,
  head: Gy,
  index: Uy,
  name: Vy,
  meta: Yy,
  mono: Jy,
  gate: Qy,
  reviewersLabel: Xy,
  reviewers: Zy,
  reviewer: eN,
  agents: tN,
  workflowColumn: nN,
  workflowHead: aN,
  stageRow: rN,
  stageLabel: oN,
  workflowTitle: lN,
  workflowMeta: iN,
  workflowGate: sN,
  gateNote: cN,
  cardNote: dN,
  reviewerList: uN,
  reviewerRow: hN,
  reviewerMark: mN,
  reviewerName: wN,
  terminalCard: fN,
  terminalCount: _N,
  workflowAgents: vN,
  mount: bN
}, pN = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function gn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function _r(e) {
  return `${Math.round(e * 100)}%`;
}
function gN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(qt, { cells: [
      { value: _r(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function yN({ stage: e }) {
  return /* @__PURE__ */ n(qt, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: gn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function NN({ stage: e, titleId: t }) {
  return /* @__PURE__ */ l("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: pN[e.kind] })
  ] });
}
function kN({ stage: e }) {
  return /* @__PURE__ */ l("p", { className: R.meta, children: [
    /* @__PURE__ */ l("span", { className: R.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ l("span", { className: R.mono, children: [
      ue(e.medianWait),
      " median wait"
    ] })
  ] });
}
function $N({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(gN, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(yN, { stage: e }) : null;
}
function CN({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function SN({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const o = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: R.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(NN, { stage: e, titleId: o }),
    /* @__PURE__ */ n(kN, { stage: e }),
    /* @__PURE__ */ n($N, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(Lb, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(CN, { onMount: a })
  ] });
}
const RN = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function TN({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ l("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function xN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: R.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ n(TN, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: _r(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function LN(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function AN({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: gn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: LN(e.rolledBackThisWeek) })
  ] });
}
function EN(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function IN(e) {
  if (e.kind === "terminal") return `${gn(e.closedThisWeek)} this week`;
  const t = EN(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function MN({ stage: e, titleId: t }) {
  const a = RN[e.kind];
  return /* @__PURE__ */ l("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: R.stageRow, children: [
      /* @__PURE__ */ l("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: IN(e) })
  ] });
}
function BN(e) {
  return e === "entry" || e === "agent";
}
function PN({ stage: e, onMount: t }) {
  return t === void 0 || !BN(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Mount agent" });
}
function jN({ stage: e, agentCards: t, onMount: a }) {
  const r = k();
  return /* @__PURE__ */ l("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(MN, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(xN, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(AN, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(PN, { stage: e, onMount: a })
  ] });
}
function qN(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function YT(e) {
  return qN(e) ? /* @__PURE__ */ n(jN, { ...e }) : /* @__PURE__ */ n(SN, { ...e });
}
const ON = "_row_1tdra_6", HN = "_name_1tdra_12", DN = "_compactRow_1tdra_13", FN = "_compactName_1tdra_13", zN = "_cell_1tdra_30", WN = "_chain_1tdra_45", KN = "_owner_1tdra_51", GN = "_mono_1tdra_57", UN = "_compactCell_1tdra_79", VN = "_stack_1tdra_96", YN = "_stat_1tdra_103", JN = "_identityLine_1tdra_110", QN = "_identity_1tdra_110", XN = "_ownerLine_1tdra_140", ZN = "_link_1tdra_160", e1 = "_gateMark_1tdra_166", t1 = "_emptyChain_1tdra_171", n1 = "_arrow_1tdra_177", a1 = "_muted_1tdra_182", r1 = "_define_1tdra_187", o1 = "_statValue_1tdra_194", l1 = "_policyId_1tdra_200", i1 = "_sub_1tdra_205", g = {
  row: ON,
  name: HN,
  compactRow: DN,
  compactName: FN,
  cell: zN,
  chain: WN,
  owner: KN,
  mono: GN,
  compactCell: UN,
  stack: VN,
  stat: YN,
  identityLine: JN,
  identity: QN,
  ownerLine: XN,
  link: ZN,
  gateMark: e1,
  emptyChain: t1,
  arrow: n1,
  muted: a1,
  define: r1,
  statValue: o1,
  policyId: l1,
  sub: i1
};
function vr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function s1(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function c1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function br(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function d1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${br(e.members)}`;
}
function u1(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ l("span", { className: g.stack, children: [
    /* @__PURE__ */ l("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: H(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: d1(e) })
  ] }) });
}
function pr({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ l(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function h1(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = wt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function m1({ stages: e, streamStep: t }) {
  const a = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((o, i) => /* @__PURE__ */ l("span", { className: g.link, children: [
    /* @__PURE__ */ n(pr, { name: o.name, gate: o.gate === !0, look: h1(i, a, t), size: "tag" }),
    i === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${i}`)) });
}
function w1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ l("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : m1(e) });
}
function gr(e) {
  return e === void 0 ? void 0 : !0;
}
function ta(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": gr(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function f1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function _1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function v1({ stream: e, href: t, presentation: a }) {
  const r = c1(a.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, onClick: vr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ge(e.streamStep, "chip") }, children: [
    u1(e, t),
    w1(e),
    ta(_1(e.agents), e.agents === void 0 ? void 0 : s1(e.agents), "—"),
    f1(e.policy),
    ta(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function b1(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function JT(e) {
  if (b1(e)) return v1(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ l("tr", { className: g.row, onClick: vr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ l("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: H(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...jt(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(pr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ l("span", { className: g.mono, children: [
      t.agents.live,
      " live · ",
      t.agents.draft,
      " draft · ",
      t.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ l("td", { className: g.cell, children: [
      /* @__PURE__ */ n("span", { className: g.owner, children: t.owner }),
      /* @__PURE__ */ n("span", { className: g.mono, children: br(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": gr(t.inFlightHint), children: ae(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : ue(t.p50) }) })
  ] });
}
const p1 = "_row_2u4ll_2", g1 = "_name_2u4ll_16", y1 = "_scope_2u4ll_24", At = {
  row: p1,
  name: g1,
  scope: y1
};
function yn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function N1(e) {
  return e === void 0 ? `${At.row} ward-toolrow` : `${At.row} ward-toolrow ${e}`;
}
function k1(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function $1({ id: e, reasonId: t, tool: a, state: r, onChange: o }) {
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
        r.locked || o(i.target.checked);
      }
    }
  );
}
function C1({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: yn(e) });
}
function S1({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${At.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function R1(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function QT({ tool: e, onChange: t, presentation: a }) {
  const r = k(), o = k(), i = k1(e, a), s = R1(a);
  return /* @__PURE__ */ l(s, { className: N1(a == null ? void 0 : a.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n($1, { id: r, reasonId: o, tool: e, state: i, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${At.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(S1, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(C1, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const T1 = "_strip_4ppv9_2", x1 = "_well_4ppv9_11", L1 = "_head_4ppv9_18", A1 = "_name_4ppv9_24", E1 = "_chart_4ppv9_32", I1 = "_segment_4ppv9_38", M1 = "_detailedChart_4ppv9_44", B1 = "_rail_4ppv9_57", P1 = "_section_4ppv9_63", j1 = "_label_4ppv9_74", q1 = "_note_4ppv9_91", V = {
  strip: T1,
  well: x1,
  head: L1,
  name: A1,
  chart: E1,
  segment: I1,
  detailedChart: M1,
  rail: B1,
  section: P1,
  label: j1,
  note: q1
}, O1 = "No item in flight to preview.", H1 = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", D1 = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", an = [1, 2, 3, 4, 5, 6], Et = 100;
function F1(e, t) {
  return t.has(e) ? ge(e, "id") : "var(--ward-color-line)";
}
function z1({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: an.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: o * Et,
      y: "0",
      width: Et,
      height: "8",
      fill: F1(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function W1(e) {
  const t = e.slice(0, an.length);
  for (; t.length < an.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function K1({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${V.detailedChart} ward-appearance-chart`, children: [
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
function yr(e) {
  return (t) => e == null ? void 0 : e(t);
}
function bt({ label: e, children: t }) {
  const a = k();
  return /* @__PURE__ */ l("section", { className: V.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: V.label, children: e }),
    t
  ] });
}
function G1({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: t ?? O1 }) : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Ht, { item: { ...e, streamStep: wt(a.streamStep) }, onOpen: yr(r), feed: null }) });
}
function U1({ draft: e }) {
  const t = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: V.head, style: t, children: [
    /* @__PURE__ */ n(Fe, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...jt(e.key, e.streamStep) })
  ] });
}
function V1(e) {
  const t = W1(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ l("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(bt, { label: "Board card", children: /* @__PURE__ */ n(G1, { ...e, draft: a }) }),
    /* @__PURE__ */ n(bt, { label: "Streams index row", children: /* @__PURE__ */ n(U1, { draft: a }) }),
    /* @__PURE__ */ l(bt, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(K1, { identities: t }),
      /* @__PURE__ */ n("p", { className: V.note, children: H1 })
    ] }),
    /* @__PURE__ */ n(bt, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: D1 }) })
  ] });
}
function Y1({ draft: e, sample: t, streams: a, onOpen: r }) {
  const o = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: V.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: V.head, children: [
      /* @__PURE__ */ n(Fe, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...jt(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Ht, { item: { ...t, streamStep: e.streamStep }, onOpen: yr(r) }) }),
    /* @__PURE__ */ n(z1, { draft: e, streams: a })
  ] });
}
function XT(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(V1, { ...e }) : /* @__PURE__ */ n(Y1, { ...e });
}
const J1 = "_row_ixlg5_6", Q1 = "_headCell_ixlg5_10", X1 = "_cell_ixlg5_11", Z1 = "_name_ixlg5_23", ek = "_consequence_ixlg5_29", tk = "_governed_ixlg5_36", nk = "_control_ixlg5_42", ak = "_byRole_ixlg5_48", rk = "_webControl_ixlg5_59", ok = "_webConsequence_ixlg5_65", lk = "_webGoverned_ixlg5_71", W = {
  row: J1,
  headCell: Q1,
  cell: X1,
  name: Z1,
  consequence: ek,
  governed: tk,
  control: nk,
  byRole: ak,
  webControl: rk,
  webConsequence: ok,
  webGoverned: lk
};
function ik({
  capability: e,
  cell: t,
  onChange: a
}) {
  return t.value === "byRole" ? /* @__PURE__ */ n("span", { className: W.byRole, children: "by role" }) : /* @__PURE__ */ l("span", { className: W.control, children: [
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
function sk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ l("tr", { className: W.row, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: W.headCell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: W.consequence, children: e.consequence }),
      /* @__PURE__ */ l("span", { className: W.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(ik, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function ck(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function dk({ name: e, cell: t, onChange: a }) {
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
  return t.value !== "pilot" ? r : /* @__PURE__ */ l("span", { className: `${W.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function uk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ l("tr", { className: W.row, children: [
    /* @__PURE__ */ l("td", { className: W.cell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${W.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(dk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webGoverned} ward-cellmeta`, children: ck(e) }) })
  ] });
}
function ZT(e) {
  return "presentation" in e ? /* @__PURE__ */ n(uk, { ...e }) : /* @__PURE__ */ n(sk, { ...e });
}
const hk = "_row_vv64h_2", mk = "_cell_vv64h_6", wk = "_name_vv64h_25", fk = "_note_vv64h_30", _k = "_webName_vv64h_41", vk = "_webMeta_vv64h_47", X = {
  row: hk,
  cell: mk,
  name: wk,
  note: fk,
  webName: _k,
  webMeta: vk
}, Nr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function bk(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function pk({ component: e, onRestart: t }) {
  const a = k(), r = Nr[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ l("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: X.name, children: e.name }) }),
    /* @__PURE__ */ l("td", { className: X.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { id: a, className: X.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: X.cell, "data-align": "end", children: o ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function gk({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: bk(e.state) });
}
function yk({ component: e, onRestart: t }) {
  return /* @__PURE__ */ l("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { ...Nr[e.state] }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(gk, { component: e, onRestart: t }) })
  ] });
}
function ex(e) {
  return "presentation" in e ? /* @__PURE__ */ n(yk, { ...e }) : /* @__PURE__ */ n(pk, { ...e });
}
const Nk = "_row_jcm5k_7", kk = "_cell_jcm5k_11", $k = "_next_jcm5k_28", Ck = "_headCell_jcm5k_38", Sk = "_webId_jcm5k_77", Rk = "_webPurpose_jcm5k_83", Tk = "_webMeta_jcm5k_91", xk = "_webUrgent_jcm5k_97", K = {
  row: Nk,
  cell: kk,
  next: $k,
  headCell: Ck,
  webId: Sk,
  webPurpose: Rk,
  webMeta: Tk,
  webUrgent: xk
}, Lk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, Ak = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, kr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Ek = Object.fromEntries(kr.map((e) => [e.key, e]));
function Qe({ column: e, children: t }) {
  const a = Ek[e];
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
function tx() {
  return /* @__PURE__ */ n("tr", { children: kr.map((e) => /* @__PURE__ */ n(
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
function Ik({ cred: e }) {
  const t = Lk[e.state];
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n(Qe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Qe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Qe, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(Qe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: yn(e.cls) }) }),
    /* @__PURE__ */ n(Qe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Qe, { column: "next", children: /* @__PURE__ */ n("span", { className: K.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Mk({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${K.webMeta} ${K.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function Bk({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(Mk, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...Ak[e.state] }) })
  ] });
}
function nx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Bk, { ...e }) : /* @__PURE__ */ n(Ik, { ...e });
}
const Pk = "_card_lpp45_2", jk = "_head_lpp45_11", qk = "_env_lpp45_18", Ok = "_version_lpp45_25", Hk = "_meta_lpp45_32", Dk = "_webCard_lpp45_37", Fk = "_webRow_lpp45_47", zk = "_webTitle_lpp45_55", Wk = "_webLine_lpp45_65", Kk = "_webVersion_lpp45_72", Gk = "_webMeta_lpp45_77", Q = {
  card: Pk,
  head: jk,
  env: qk,
  version: Ok,
  meta: Hk,
  webCard: Dk,
  webRow: Fk,
  webTitle: zk,
  webLine: Wk,
  webVersion: Kk,
  webMeta: Gk
}, na = { dev: "Dev", uat: "UAT", prod: "Prod" }, $r = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function Uk({ env: e }) {
  const t = $r[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l("section", { className: Q.card, "aria-label": na[e.env], children: [
    /* @__PURE__ */ l("div", { className: Q.head, children: [
      /* @__PURE__ */ n("span", { className: Q.env, children: na[e.env] }),
      /* @__PURE__ */ n(m, { role: t.role, label: t.label })
    ] }),
    /* @__PURE__ */ n("p", { className: Q.version, children: e.version }),
    /* @__PURE__ */ l("p", { className: Q.meta, children: [
      "deployed ",
      he(e.deployedAt)
    ] }),
    a && /* @__PURE__ */ n("p", { className: Q.meta, children: a })
  ] });
}
function Vk(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function Yk(e) {
  return /* @__PURE__ */ l("article", { className: `${Q.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${Q.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Q.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...$r[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Q.version} ${Q.webVersion} ${Q.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Q.meta} ${Q.webMeta} ${Q.webLine} ward-cellmeta`, children: Vk(e) })
  ] });
}
function ax(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Yk, { ...e }) : /* @__PURE__ */ n(Uk, { ...e });
}
const Jk = "_panel_1hmja_2", Qk = "_line_1hmja_8", Xk = "_actions_1hmja_14", pt = {
  panel: Jk,
  line: Qk,
  actions: Xk
};
function rx(e) {
  return /* @__PURE__ */ l("div", { className: pt.panel, children: [
    /* @__PURE__ */ n("p", { className: pt.line, children: e.status }),
    /* @__PURE__ */ n(j, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: pt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: pt.line, children: e.note ?? "" })
  ] });
}
const Zk = "_upload_13fcl_2", e$ = "_preview_13fcl_7", t$ = "_mark_13fcl_17", n$ = "_empty_13fcl_22", a$ = "_actions_13fcl_28", r$ = "_input_13fcl_33", o$ = "_reasons_13fcl_41", l$ = "_reason_13fcl_41", i$ = "_accepted_13fcl_57", oe = {
  upload: Zk,
  preview: e$,
  mark: t$,
  empty: n$,
  actions: a$,
  input: r$,
  reasons: o$,
  reason: l$,
  accepted: i$
}, Cr = 1.5, Sr = 22, It = "script elements or event handlers", Pe = "links or external references", xe = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Cr}px at ${Sr}px`], s$ = [xe[1], xe[2], It, Pe], c$ = /* @__PURE__ */ new Map([
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
]), d$ = "http://www.w3.org/2000/svg", u$ = "http://www.w3.org/2000/xmlns/", h$ = /* @__PURE__ */ new Set([
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
]), m$ = /* @__PURE__ */ new Set([
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
]), Nn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, w$ = /url\s*\(|['"\\]/i;
function f$() {
  return { ok: !1, reasons: [xe[1]] };
}
function Rr(e) {
  return e.namespaceURI === d$;
}
function _$(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && Rr(t) ? t : null;
  } catch {
    return null;
  }
}
function v$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [xe[0]] : [];
}
function b$(e) {
  return c$.get(e.localName) ?? (e.localName.startsWith("animate") ? Pe : void 0);
}
function p$(e) {
  return w$.test(e.replace(Nn, ""));
}
function g$(e) {
  return /^on/i.test(e.localName) ? It : e.localName === "href" || p$(e.value) ? Pe : void 0;
}
function y$(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(b$(a));
    for (const r of Array.from(a.attributes)) t.add(g$(r));
  }
  return s$.filter((a) => t.has(a));
}
function N$(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((o) => Number.isFinite(o) && o > 0), 0), r = a > 0 ? Sr / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Cr;
  }) ? [xe[3]] : [];
}
function k$(e) {
  if (e.namespaceURI === u$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (m$.has(t) || t.startsWith("stroke"));
}
function $$(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && Rr(t) && h$.has(t.localName);
}
function C$(e, t) {
  $$(t) ? t.nodeType === Node.ELEMENT_NODE && Tr(t) : e.removeChild(t);
}
function Tr(e) {
  for (const t of Array.from(e.attributes)) k$(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) C$(e, t);
  return e;
}
function S$(e) {
  return Array.from(e.matchAll(Nn), (t) => t[2]).filter((t) => t !== "");
}
function R$(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function T$(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const i of S$(o.value)) a.has(i) || a.set(i, `${t}-${a.size}`);
  return a;
}
function x$(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(Nn, (r, o, i) => {
      const s = t.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function L$(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = T$(a, t);
  for (const o of a) {
    const i = r.get(o.getAttribute("id") ?? "");
    i === void 0 ? o.removeAttribute("id") : o.setAttribute("id", i), x$(o, r);
  }
  return e;
}
function ox(e) {
  const t = _$(e);
  if (t === null) return f$();
  const a = [...v$(t), ...y$(t), ...N$(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(L$(Tr(t), R$(e))) };
}
const A$ = "Mark accepted.", E$ = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, I$ = new Set(wa.flatMap((e) => [ge(e, "id"), ge(e, "chip")]));
function M$(e) {
  return e !== void 0 && (E$.test(e) || I$.has(e)) ? e : void 0;
}
function B$({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: oe.preview, style: { "--mark": M$(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: oe.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: oe.empty }) });
}
function P$(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function j$(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function q$({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: oe.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("p", { className: oe.accepted, children: A$ }) }) : /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("ul", { className: oe.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: oe.reason, children: t }, t)) }) });
}
function O$({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(q$, { result: e }) : /* @__PURE__ */ n("p", { className: `${oe.result} ${P$(e, a)}`, role: "status", children: j$(e, a) });
}
function aa(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function lx({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: o }) {
  const i = _(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ l("div", { className: oe.upload, children: [
    /* @__PURE__ */ n(B$, { current: e }),
    /* @__PURE__ */ l("div", { className: oe.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: i,
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
      /* @__PURE__ */ n(b, { ...aa(o), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...aa(o), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(O$, { result: s, presentation: r })
  ] });
}
const H$ = "_row_o3t6y_7", D$ = "_cell_o3t6y_11", F$ = "_head_o3t6y_28", z$ = "_name_o3t6y_34", W$ = "_pinned_o3t6y_42", K$ = "_headCell_o3t6y_49", G$ = "_webName_o3t6y_88", U$ = "_webMeta_o3t6y_95", V$ = "_webWarn_o3t6y_103", D = {
  row: H$,
  cell: D$,
  head: F$,
  name: z$,
  pinned: W$,
  headCell: K$,
  webName: G$,
  webMeta: U$,
  webWarn: V$
}, kn = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, xr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Y$ = Object.fromEntries(xr.map((e) => [e.key, e]));
function J$(e, t) {
  return `mcp.${e}.${t}`;
}
function Q$(e) {
  return Object.keys(kn).includes(e);
}
function X$(e) {
  return kn[e !== void 0 && Q$(e) ? e : "unknown"];
}
function ot({ column: e, children: t }) {
  const a = Y$[e];
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
function ix() {
  return /* @__PURE__ */ n("tr", { children: xr.map((e) => /* @__PURE__ */ n(
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
function Z$({ server: e }) {
  const t = kn[e.connection];
  return /* @__PURE__ */ l("tr", { className: D.row, children: [
    /* @__PURE__ */ l(ot, { column: "name", children: [
      /* @__PURE__ */ l("span", { className: D.head, children: [
        /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: yn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ l("span", { className: D.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(ot, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(ot, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(ot, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(ot, { column: "tools", children: e.tools.map((a) => J$(e.name, a)).join(" · ") })
  ] });
}
function e0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function t0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function n0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${D.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e });
}
function a0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function r0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function o0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: D.row, children: [
    /* @__PURE__ */ l("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: `${D.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...t0(e) }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(n0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...X$(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: D.cell, children: [
      /* @__PURE__ */ n(a0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(r0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function sx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(o0, { ...e }) : /* @__PURE__ */ n(Z$, { ...e });
}
const l0 = "_row_1ibo7_2", i0 = "_headCell_1ibo7_14", s0 = "_cell_1ibo7_15", c0 = "_name_1ibo7_26", d0 = "_consequence_1ibo7_32", u0 = "_reason_1ibo7_38", h0 = "_value_1ibo7_44", m0 = "_webRow_1ibo7_60", w0 = "_webSetting_1ibo7_73", f0 = "_webName_1ibo7_81", _0 = "_webConsequence_1ibo7_89", v0 = "_webControl_1ibo7_95", b0 = "_webState_1ibo7_109", p0 = "_webChip_1ibo7_114", P = {
  row: l0,
  headCell: i0,
  cell: s0,
  name: c0,
  consequence: d0,
  reason: u0,
  value: h0,
  webRow: m0,
  webSetting: w0,
  webName: f0,
  webConsequence: _0,
  webControl: v0,
  webState: b0,
  webChip: p0
}, Lr = 104, Ar = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function g0({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ve, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(Wa, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: P.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function y0({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = k(), i = Ar[a], s = a === "locked";
  return /* @__PURE__ */ l("tr", { className: P.row, "data-inheritance": a, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: P.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(g0, { control: t, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: P.cell, style: { width: Lr }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function Er(e, t) {
  return String(e ?? t);
}
function N0(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function k0(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? Er(e.value, "—");
}
function $0({ control: e, name: t, locked: a, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: P.webControl, children: [
    /* @__PURE__ */ n(Ve, { label: t, labelHidden: !0, checked: i, locked: a, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ n("span", { className: P.webState, "aria-hidden": "true", children: a || i ? "on" : "off" })
  ] });
}
function C0(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n($0, { ...e });
  const o = N0(t, a);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: P.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(Wa, { options: o, value: Er(t.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: k0(t) });
}
function S0({ setting: e, control: t, inheritance: a, reason: r, onChange: o, renderControl: i }) {
  const s = k(), c = a === "locked";
  return /* @__PURE__ */ l("div", { className: `${P.row} ${P.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ l("span", { className: P.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${P.name} ${P.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: s, className: `${P.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: P.webControl, children: i(s) }) : /* @__PURE__ */ n(C0, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${P.webChip} ward-policy-chip`, style: { width: Lr }, children: /* @__PURE__ */ n(m, { ...Ar[a], size: "tag" }) })
  ] });
}
function cx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(S0, { ...e }) : /* @__PURE__ */ n(y0, { ...e });
}
const R0 = "_label_h9m4w_7", T0 = "_name_h9m4w_15", x0 = "_column_h9m4w_24", L0 = "_webFrame_h9m4w_57", A0 = "_webHead_h9m4w_62", E0 = "_webHeadLabel_h9m4w_74", I0 = "_webLabel_h9m4w_117", M0 = "_webColumns_h9m4w_124", B0 = "_webGroup_h9m4w_130", P0 = "_webPeople_h9m4w_131", j0 = "_webVia_h9m4w_132", q0 = "_webMeta_h9m4w_161", G = {
  label: R0,
  name: T0,
  column: x0,
  webFrame: L0,
  webHead: A0,
  webHeadLabel: E0,
  webLabel: I0,
  webColumns: M0,
  webGroup: B0,
  webPeople: P0,
  webVia: j0,
  webMeta: q0
}, O0 = {
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
function H0(e) {
  if (!e.matrixRole) return;
  const t = O0[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function D0({ node: e }) {
  const t = H0(e);
  return /* @__PURE__ */ l("span", { className: G.label, children: [
    /* @__PURE__ */ n("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ n(F0, { role: t, node: e }),
    /* @__PURE__ */ n(Yt, { column: Vt[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Yt, { column: Vt[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Yt, { column: Vt[2], children: e.requestedVia ?? "" })
  ] });
}
function F0({ role: e, node: t }) {
  return /* @__PURE__ */ l(x, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function z0({ index: e, depth: t, node: a, expanded: r, leaf: o, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    Qa,
    {
      index: e,
      depth: t,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(D0, { node: a }),
      children: s
    }
  );
}
function Jt({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function W0({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Jt, { className: `${G.webMeta} ${G.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Jt, { className: `${G.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Jt, { className: `${G.webMeta} ${G.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function K0() {
  return /* @__PURE__ */ l("div", { className: G.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: G.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: G.webColumns, children: [
      /* @__PURE__ */ n("span", { className: G.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: G.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: G.webVia, children: "Requested via" })
    ] })
  ] });
}
function G0({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function U0(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function V0({ rows: e, label: t }) {
  return /* @__PURE__ */ l("div", { className: G.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(K0, {}),
    /* @__PURE__ */ n($w, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      Qa,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(G0, { row: a }),
        detail: /* @__PURE__ */ n(W0, { row: a }),
        expanded: U0(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function dx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(V0, { ...e }) : /* @__PURE__ */ n(z0, { ...e });
}
const Y0 = "_runbook_b9agc_2", J0 = "_list_b9agc_7", Q0 = "_step_b9agc_15", X0 = "_numeral_b9agc_21", Z0 = "_body_b9agc_28", eC = "_head_b9agc_34", tC = "_title_b9agc_40", nC = "_detail_b9agc_45", aC = "_actions_b9agc_50", rC = "_webList_b9agc_56", oC = "_webStep_b9agc_60", lC = "_webBody_b9agc_66", iC = "_webTitle_b9agc_74", sC = "_webDetail_b9agc_78", I = {
  runbook: Y0,
  list: J0,
  step: Q0,
  numeral: X0,
  body: Z0,
  head: eC,
  title: tC,
  detail: nC,
  actions: aC,
  webList: rC,
  webStep: oC,
  webBody: lC,
  webTitle: iC,
  webDetail: sC
}, Ir = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Mr(e) {
  return String(e + 1).padStart(2, "0");
}
function cC({ step: e, index: t, connection: a }) {
  const r = Ir[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: I.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.numeral, children: Mr(t) }),
    /* @__PURE__ */ l("span", { className: I.body, children: [
      /* @__PURE__ */ l("span", { className: I.head, children: [
        /* @__PURE__ */ n("span", { className: I.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        o && e.startedAt && /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ n("span", { className: I.detail, children: e.detail })
    ] })
  ] });
}
function dC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: I.runbook, children: [
    /* @__PURE__ */ n("ol", { className: I.list, children: e.map((r, o) => /* @__PURE__ */ n(cC, { step: r, index: o, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: I.actions, children: t })
  ] });
}
function uC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ l("li", { className: `${I.step} ${I.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${I.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Mr(t) }),
    /* @__PURE__ */ l("span", { className: `${I.body} ${I.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${I.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${I.title} ${I.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Ir[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${I.detail} ${I.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function hC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: I.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${I.list} ${I.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(uC, { step: r, index: o, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${I.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function ux(e) {
  return "presentation" in e ? /* @__PURE__ */ n(hC, { ...e }) : /* @__PURE__ */ n(dC, { ...e });
}
const mC = "_list_1gu6a_2", wC = "_check_1gu6a_10", fC = "_body_1gu6a_16", _C = "_text_1gu6a_23", vC = "_pending_1gu6a_32", bC = "_measured_1gu6a_37", Ze = {
  list: mC,
  check: wC,
  body: fC,
  text: _C,
  pending: vC,
  measured: bC
};
function pC(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function gC({ check: e }) {
  const t = pC(e.passed);
  return /* @__PURE__ */ l("li", { className: `${Ze.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(fn, { state: t.state, label: t.label }),
    /* @__PURE__ */ l("span", { className: Ze.body, children: [
      /* @__PURE__ */ n("span", { className: Ze.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ l("span", { className: Ze.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: Ze.measured, children: e.measured })
  ] });
}
function hx({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Ze.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(gC, { check: t }, t.text)) });
}
const yC = "_root_y6bbq_2", NC = "_list_y6bbq_10", kC = "_line_y6bbq_32", $C = "_at_y6bbq_59", CC = "_text_y6bbq_63", SC = "_foot_y6bbq_67", RC = "_idle_y6bbq_79", TC = "_caret_y6bbq_87", xC = "_jump_y6bbq_94", ve = {
  root: yC,
  list: NC,
  line: kC,
  at: $C,
  text: CC,
  foot: SC,
  idle: RC,
  caret: TC,
  jump: xC
}, LC = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function $n(e) {
  return Number.isNaN(Date.parse(e)) ? "" : LC.format(new Date(e));
}
const AC = { warn: "warning", ok: "ok" };
function EC({ kind: e }) {
  const t = AC[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function IC({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${$n(e)}` });
}
function MC({ connection: e, idleSince: t, last: a, children: r }) {
  const o = [t, a == null ? void 0 : a.at, ""].find(Boolean), i = {
    stale: `no new events as of ${$n(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${ve.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ve.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ve.idle, children: i }),
    /* @__PURE__ */ n(IC, { at: a == null ? void 0 : a.at }),
    r
  ] });
}
const BC = 8;
function PC(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > BC;
}
function jC({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const Br = Ne(null);
function mx({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, o] = p(!1), i = ca(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(Br.Provider, { value: i, children: a });
}
function qC() {
  const e = ye(Br), [t, a] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const OC = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function wx({ lines: e, connection: t, idleSince: a, label: r = "Live activity", fixed: o }) {
  const i = _(null), [s, c] = p(0), [d, u] = qC(), [h, w] = p(!1), f = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), tt(() => {
    const N = i.current;
    N && !h && (N.scrollTop = N.scrollHeight);
  }, [e.length, h]);
  const y = () => {
    var q;
    const N = i.current;
    if (!N) return;
    const A = N.querySelectorAll("[data-consline-text]");
    (q = A.item(A.length - 1)) == null || q.focus(), w(!1);
  };
  return /* @__PURE__ */ l("div", { className: ve.root, children: [
    /* @__PURE__ */ n("ol", { className: ve.list, ref: i, "aria-live": d ? "polite" : "off", "aria-label": r, ...OC(e.length, o), onScroll: (N) => w(PC(N.currentTarget)), children: e.map((N, A) => /* @__PURE__ */ l("li", { className: `${ve.line} ward-consline ward-reveal ward-consline--${N.kind}`, "data-kind": N.kind, "data-revealed": A < s, children: [
      /* @__PURE__ */ n("span", { className: ve.at, children: $n(N.at) }),
      /* @__PURE__ */ n(EC, { kind: N.kind }),
      /* @__PURE__ */ n("span", { className: ve.text, "data-consline-text": !0, tabIndex: -1, children: N.text })
    ] }, `${N.at}-${A}`)) }),
    /* @__PURE__ */ l(MC, { connection: t, idleSince: a, last: f, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(jC, { shown: h, onJump: y })
    ] })
  ] });
}
const HC = "_row_1k8wl_2", DC = "_head_1k8wl_14", FC = "_author_1k8wl_20", zC = "_eta_1k8wl_25", WC = "_edited_1k8wl_26", KC = "_body_1k8wl_32", GC = "_reason_1k8wl_37", UC = "_actions_1k8wl_42", Ce = {
  row: HC,
  head: DC,
  author: FC,
  eta: zC,
  edited: WC,
  body: KC,
  reason: GC,
  actions: UC
}, VC = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function YC(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function JC({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function QC({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Ce.reason, id: t, children: e })
  ] });
}
function XC(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function ZC(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(JC, { ...e }) : /* @__PURE__ */ n(QC, { reason: e.unavailable, reasonId: e.unavailableId });
}
function fx(e) {
  const { comment: t } = e;
  XC(e);
  const a = k(), r = `${a}-unavailable`, o = VC[t.delivery];
  return /* @__PURE__ */ l("div", { className: `${Ce.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: Ce.head, children: [
      /* @__PURE__ */ n("span", { className: Ce.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: Ce.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Ce.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Ce.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Ce.reason, id: a, children: YC(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Ce.actions, children: /* @__PURE__ */ n(ZC, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const eS = "_root_rvhdw_2", tS = "_attach_rvhdw_11", nS = "_actions_rvhdw_17", aS = "_reply_rvhdw_23", rS = "_replyField_rvhdw_28", oS = "_send_rvhdw_54", lS = "_sendIcon_rvhdw_65", iS = "_sendsAs_rvhdw_75", Oe = {
  root: eS,
  attach: tS,
  actions: nS,
  reply: aS,
  replyField: rS,
  send: oS,
  sendIcon: lS,
  sendsAs: iS
};
function Pr({ value: e, onChange: t }) {
  const [a, r] = p("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function sS() {
  return /* @__PURE__ */ n("svg", { className: Oe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function cS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function dS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [o, i] = Pr(e), s = k(), c = () => {
    o.trim() !== "" && r(a, o);
  }, d = (u) => {
    cS(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ l("div", { className: Oe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: Oe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ n(j, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: o, onChange: i, describedBy: s }),
      /* @__PURE__ */ l(b, { variant: "primary", className: Oe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ n(sS, {}),
        /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Oe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function _x(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(dS, { ...e }) : /* @__PURE__ */ n(uS, { ...e });
}
function uS(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: o, onPost: i, onDraft: s } = e, [c, d] = Pr(e);
  return /* @__PURE__ */ l("div", { className: Oe.root, children: [
    /* @__PURE__ */ n(j, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ l("div", { className: Oe.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    o && /* @__PURE__ */ n(
      ka,
      {
        label: `Requeue ${o.agent} after posting`,
        consequence: o.consequence,
        checked: o.checked,
        onChange: o.onChange
      }
    ),
    /* @__PURE__ */ l("div", { className: Oe.actions, children: [
      /* @__PURE__ */ n(b, { variant: "primary", onClick: () => i(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const hS = "_list_1yhks_2", mS = "_item_1yhks_6", wS = "_body_1yhks_22", fS = "_text_1yhks_28", _S = "_evidence_1yhks_37", vS = "_consequence_1yhks_49", bS = "_note_1yhks_54", Ue = {
  list: hS,
  item: mS,
  body: wS,
  text: fS,
  evidence: _S,
  consequence: vS,
  note: bS
};
function pS({ criterion: e }) {
  return /* @__PURE__ */ n(Fe, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function ra({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function gS(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function yS({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Ue.body, children: [
    /* @__PURE__ */ n("span", { className: Ue.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(ra, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Ue.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(ra, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Ue.consequence, children: gS(e.why) })
    ] })
  ] });
}
function NS({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Ue.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(pS, { criterion: e }),
    /* @__PURE__ */ n(yS, { criterion: e })
  ] });
}
function vx({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(NS, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ n("p", { className: Ue.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const kS = "_list_dwhoz_2", $S = "_rung_dwhoz_6", CS = "_name_dwhoz_18", SS = "_actor_dwhoz_32", kt = {
  list: kS,
  rung: $S,
  name: CS,
  actor: SS
}, RS = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function TS({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = RS[e.state];
  return /* @__PURE__ */ l("li", { className: kt.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: kt.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${kt.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function bx({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${kt.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(TS, { rung: t }, t.name)) });
}
const xS = "_sheet_pw37w_2", LS = "_title_pw37w_9", AS = "_stage_pw37w_15", ES = "_effects_pw37w_20", IS = "_effect_pw37w_20", MS = "_numeral_pw37w_31", BS = "_effectText_pw37w_38", PS = "_refusals_pw37w_43", jS = "_reasons_pw37w_52", qS = "_reason_pw37w_52", OS = "_actions_pw37w_62", we = {
  sheet: xS,
  title: LS,
  stage: AS,
  effects: ES,
  effect: IS,
  numeral: MS,
  effectText: BS,
  refusals: PS,
  reasons: jS,
  reason: qS,
  actions: OS
};
function HS({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function px({ run: e, effects: t, refusals: a, cost: r, onRequeue: o, onClose: i, returnFocusTo: s }) {
  const c = k(), d = `${c}-refusal`, [u, h] = p(""), w = a.length > 0;
  return /* @__PURE__ */ n(rt, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ l("div", { className: we.sheet, children: [
    /* @__PURE__ */ l("h2", { className: we.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: we.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: we.effects, children: t.map((f, y) => /* @__PURE__ */ l("li", { className: we.effect, children: [
      /* @__PURE__ */ n("span", { className: we.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: we.effectText, children: f })
    ] }, f)) }),
    /* @__PURE__ */ n(
      rm,
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
    w && /* @__PURE__ */ l("div", { className: we.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: we.reasons, children: a.map((f, y) => /* @__PURE__ */ n("li", { className: we.reason, id: y === 0 ? d : void 0, children: f.reason }, f.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: we.actions, children: [
      /* @__PURE__ */ n(HS, { refused: w, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ n(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const DS = "_list_1laeg_2", FS = "_path_1laeg_7", zS = "_head_1laeg_21", WS = "_label_1laeg_28", KS = "_consequence_1laeg_35", it = {
  list: DS,
  path: FS,
  head: zS,
  label: WS,
  consequence: KS
}, rn = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function oa(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function la(e) {
  return e ? "primary" : "secondary";
}
function GS({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: la(t), size: "sm", onClick: () => a(e.kind), children: rn[e.kind] }) : /* @__PURE__ */ n(b, { variant: la(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: rn[e.kind] });
}
function US({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: it.path, "data-allowed": e.allowed, "data-role": oa(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: it.head, children: [
      /* @__PURE__ */ n("span", { className: it.label, children: e.title ?? rn[e.kind] }),
      /* @__PURE__ */ n(m, { role: oa(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: it.consequence, children: e.consequence }),
    /* @__PURE__ */ n(GS, { path: e, primary: t, onChoose: a })
  ] });
}
function gx({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: it.list, children: e.map((a, r) => /* @__PURE__ */ n(US, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const VS = "_list_1m7i0_2", YS = "_item_1m7i0_6", JS = "_node_1m7i0_18", QS = "_body_1m7i0_24", XS = "_head_1m7i0_30", ZS = "_stage_1m7i0_36", eR = "_version_1m7i0_41", tR = "_sentence_1m7i0_49", nR = "_meta_1m7i0_54", Re = {
  list: VS,
  item: YS,
  node: JS,
  body: QS,
  head: XS,
  stage: ZS,
  version: eR,
  sentence: tR,
  meta: nR
}, aR = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function rR({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: Re.head, children: [
    /* @__PURE__ */ n("span", { className: Re.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Re.version, title: e.version, children: e.version }) : null
  ] });
}
function oR({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${Re.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Re.node} ward-history-node`, children: /* @__PURE__ */ n(Fe, { size: 9, kind: aR[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${Re.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(rR, { entry: e }),
      /* @__PURE__ */ n("span", { className: Re.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${Re.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function yx({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Re.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(oR, { entry: t }, t.stage + String(a))) });
}
const lR = "_thread_1e70p_3", iR = "_turn_1e70p_8", sR = "_who_1e70p_27", cR = "_body_1e70p_32", $t = {
  thread: lR,
  turn: iR,
  who: sR,
  body: cR
}, jr = Ne(!1);
function Nx({ children: e, density: t }) {
  return /* @__PURE__ */ n(jr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${$t.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function kx({ turn: e }) {
  if (!ye(jr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${$t.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${$t.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${$t.body} ward-chat-body`, children: e.body })
  ] });
}
const dR = "_list_yiolt_3", uR = "_row_yiolt_7", hR = "_label_yiolt_20", mR = "_n_yiolt_26", wR = "_cause_yiolt_33", ct = {
  list: dR,
  row: uR,
  label: hR,
  n: mR,
  cause: wR
};
function fR(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const _R = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function vR({ row: e, formatNumber: t }) {
  return fR(e), /* @__PURE__ */ l("li", { className: `${ct.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Fe, { size: 8, ..._R[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: ct.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${ct.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(bR, { cause: e.cause })
  ] });
}
function bR({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${ct.cause} ward-healthrow-cause`, children: e }) : null;
}
function $x({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${ct.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(vR, { row: a, formatNumber: t }, a.label)) });
}
const pR = "_root_1jxwp_2", gR = {
  root: pR
};
function Cx({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: gR.root, "data-density": o, children: [
    /* @__PURE__ */ n(Dt, { items: e, note: t, density: o }),
    /* @__PURE__ */ n(b, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const yR = "_row_dhbre_3", NR = "_key_dhbre_13", kR = "_stack_dhbre_24", $R = "_value_dhbre_32", CR = "_evidence_dhbre_39", SR = "_mark_dhbre_47", Xe = {
  row: yR,
  key: NR,
  stack: kR,
  value: $R,
  evidence: CR,
  mark: SR
};
function RR({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(fn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function Sx({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(RR, { state: e.state }) })
  ] });
}
const TR = "_cell_gh2sd_2", xR = {
  cell: TR
}, LR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function AR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function ER(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function IR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: AR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function MR(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function Rx({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  ER(e, a);
  const r = MR(e);
  return /* @__PURE__ */ n(
    bm,
    {
      label: "Rejection routing",
      columns: LR,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: xR.cell, "data-norerun": o.noRerun ? !0 : void 0, children: IR(o, i) }),
      empty: t ?? /* @__PURE__ */ n(uf, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const BR = "_row_1f2re_2", PR = "_title_1f2re_12", jR = "_turns_1f2re_18", qR = "_waiting_1f2re_19", OR = "_resolved_1f2re_20", HR = "_activity_1f2re_21", DR = "_cost_1f2re_28", FR = "_link_1f2re_29", zR = "_tableLink_1f2re_47", WR = "_tableRecord_1f2re_48", KR = "_tableRow_1f2re_59", GR = "_tableTitle_1f2re_71", UR = "_tableResolved_1f2re_76", VR = "_tableMeta_1f2re_87", YR = "_tableCost_1f2re_94", JR = "_tableActivity_1f2re_95", QR = "_tableState_1f2re_105", z = {
  row: BR,
  title: PR,
  turns: jR,
  waiting: qR,
  resolved: OR,
  activity: HR,
  cost: DR,
  link: FR,
  tableLink: zR,
  tableRecord: WR,
  tableRow: KR,
  tableTitle: GR,
  tableResolved: UR,
  tableMeta: VR,
  tableCost: YR,
  tableActivity: JR,
  tableState: QR
}, qr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function XR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function ZR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function e2(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const t2 = { duplicate: "Closed · duplicate" };
function n2({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(nt, { className: z.tableMeta, text: `waiting on ${e}` });
}
function a2({ value: e }) {
  return /* @__PURE__ */ n("td", { className: z.tableCost, children: e === void 0 ? null : le(e) });
}
function r2({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${z.tableRecord} ward-target`, href: H(e.href), children: `→ ${e.key}` });
}
function o2({ session: e, href: t }) {
  const a = qr[e.state];
  return /* @__PURE__ */ l("tr", { className: z.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: z.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${z.tableLink} ward-target`, href: H(t), children: /* @__PURE__ */ n(nt, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: z.tableMeta, children: ZR(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: z.tableResolved, children: [
      e2(e.resolved),
      /* @__PURE__ */ n(n2, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(a2, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: z.tableActivity, children: XR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: z.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: t2[e.state] ?? a.label }),
      /* @__PURE__ */ n(r2, { link: e.link })
    ] }) })
  ] });
}
function l2({ session: e }) {
  const t = qr[e.state];
  return /* @__PURE__ */ l("div", { className: z.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(nt, { className: z.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: z.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(nt, { className: z.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: z.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: z.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : le(e.cost) }),
    /* @__PURE__ */ n("span", { className: z.activity, children: he(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: z.link, href: H(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function Tx(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(o2, { session: e.session, href: e.href }) : /* @__PURE__ */ n(l2, { session: e.session });
}
const i2 = "_block_1yy2v_3", s2 = "_list_1yy2v_9", c2 = "_line_1yy2v_14", on = {
  block: i2,
  list: s2,
  line: c2
}, d2 = { warn: "warning", ok: "ok" };
function u2({ kind: e }) {
  const t = d2[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function h2({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${on.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(u2, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function xx({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${on.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: on.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(h2, { line: a }, `${r}-${a.text}`)) }) });
}
const m2 = "_band_tt7hp_1", w2 = "_head_tt7hp_8", f2 = "_cell_tt7hp_19", _2 = "_index_tt7hp_35", v2 = "_title_tt7hp_42", b2 = "_note_tt7hp_48", p2 = "_cellTitle_tt7hp_53", g2 = "_cellBody_tt7hp_58", y2 = "_tag_tt7hp_64", $e = {
  band: m2,
  head: w2,
  cell: f2,
  index: _2,
  title: v2,
  note: b2,
  cellTitle: p2,
  cellBody: g2,
  tag: y2
}, ia = 4;
function Lx({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== ia)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${ia}-cell grid`);
  return /* @__PURE__ */ l("section", { className: $e.band, "aria-label": `${e} ${t}`, children: [
    /* @__PURE__ */ l("div", { className: $e.head, children: [
      /* @__PURE__ */ n("span", { className: $e.index, children: e }),
      /* @__PURE__ */ n("span", { className: $e.title, children: t }),
      /* @__PURE__ */ n("span", { className: $e.note, children: a })
    ] }),
    r.map((o) => /* @__PURE__ */ l("div", { className: $e.cell, children: [
      /* @__PURE__ */ n("span", { className: $e.cellTitle, children: o.title }),
      /* @__PURE__ */ n("span", { className: $e.cellBody, children: o.body }),
      o.tag !== void 0 && /* @__PURE__ */ n("span", { className: $e.tag, children: o.tag })
    ] }, o.title))
  ] });
}
const N2 = "_tag_1yuvz_2", k2 = "_link_1yuvz_14", Qt = {
  tag: N2,
  link: k2
};
function Ax({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: Qt.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${Qt.tag} ${Qt.link}`, href: H(t), children: e });
}
const $2 = "_eyebrow_m8swv_2", C2 = "_link_m8swv_10", sa = {
  eyebrow: $2,
  link: C2
};
function Ex({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: sa.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${sa.link} ward-target`, href: H(t), children: e }) });
}
const S2 = "_figure_qz9i7_2", R2 = "_media_qz9i7_9", T2 = "_caption_qz9i7_35", Xt = {
  figure: S2,
  media: R2,
  caption: T2
};
function x2(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(x, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function Ix(e) {
  return /* @__PURE__ */ l("figure", { className: Xt.figure, children: [
    /* @__PURE__ */ n("div", { className: Xt.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(x2, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: Xt.caption, children: e.caption })
  ] });
}
function L2(e) {
  return `h${e}`;
}
function A2(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const E2 = "_prose_1fxb9_2", I2 = "_anchor_1fxb9_79", Or = {
  prose: E2,
  anchor: I2
};
function Mx({ children: e }) {
  return /* @__PURE__ */ n("div", { className: Or.prose, children: e });
}
function Bx({ level: e, children: t, id: a }) {
  const r = L2(e), o = a ?? A2(t);
  return /* @__PURE__ */ l(r, { id: o, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${Or.anchor} ward-target`, href: `#${o}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
export {
  W2 as ACCENT_PRESETS,
  wT as ActionStack,
  wx as ActivityConsole,
  X2 as AdminIcon,
  Lb as AgentCard,
  eT as AppShell,
  XT as AppearanceStrip,
  Lx as Band,
  uT as BarChart,
  Gf as BoardColumn,
  AT as BoardFootnote,
  ET as BoardHeader,
  J2 as BoardIcon,
  NT as BoardScroller,
  b as Btn,
  z2 as CHIP_ROLES,
  kr as CREDENTIAL_COLUMNS,
  dT as Callout,
  ZT as CapabilityRow,
  $T as CardGrid,
  kx as ChatMessage,
  ka as Checkbox,
  m as Chip,
  nt as ClampText,
  fx as ClarificationRow,
  FT as ClauseRuleRow,
  DT as ClauseRules,
  ar as ColourLadder,
  ex as ComponentRow,
  _x as Composer,
  MT as ConfigRow,
  IT as ConfigRowHead,
  _n as ConnectionMark,
  mx as ConsoleAnnounceProvider,
  Nx as Conversation,
  rm as CostMeter,
  nx as CredentialRow,
  tx as CredentialRowHead,
  vx as CriteriaList,
  Rs as Crumb,
  K2 as DENSITIES,
  $x as DeliveryHealth,
  ST as DeniedState,
  V2 as DisabledScope,
  WT as DryRunRail,
  uf as EmptyState,
  ax as EnvCard,
  Ex as Eyebrow,
  j as Field,
  Ix as Figure,
  CT as FilteredEmpty,
  tT as FoldText,
  gT as FormStack,
  Dt as GateChecklist,
  bx as GateLadder,
  bm as Grid,
  GT as HandoffRuleRow,
  KT as HandoffRules,
  Y2 as HomeIcon,
  BT as ItemDrawer,
  rx as KeyPanel,
  lo as LIVE_EVENT_TYPES,
  Xv as LegacyBoardColumn,
  jT as LegacyBoardHeader,
  qT as LegacyConfigRow,
  HT as LegacyItemDrawer,
  Kv as LegacyOverCapNote,
  OT as LegacyPreviewRail,
  er as LegacyWorkCard,
  Le as LiveIndicator,
  RT as LoadFailed,
  LT as Loading,
  xr as MCP_SERVER_COLUMNS,
  fn as Mark,
  lx as MarkUpload,
  Fe as Marker,
  sx as McpServerRow,
  ix as McpServerRowHead,
  ja as Menu,
  Ma as MenuButton,
  UT as NewStreamModal,
  ff as OverCapNote,
  un as OverflowRow,
  rt as Overlay,
  nT as OwedCard,
  zT as PARTIAL_STEP_REASON,
  Lr as POLICY_CHIP_WIDTH,
  vT as PageFrame,
  cT as PageHeader,
  hT as PlainList,
  cx as PolicyRow,
  PT as PreviewRail,
  Mx as Prose,
  Bx as ProseHeading,
  Vt as ROLE_MATRIX_COLUMNS,
  fr as RULE_ACTIONS,
  Ga as Radio,
  Cx as ReadyChecklist,
  pT as RecordSection,
  px as RequeueSheet,
  gx as ResolveBlock,
  Sx as ResolvedFieldRow,
  dx as RoleMatrixRow,
  Rx as RoutingTable,
  VT as RuleRow,
  ux as RunbookSteps,
  oo as STREAM_STEPS,
  yT as SectionBand,
  Wn as SectionHeader,
  Wa as SegmentedControl,
  Aa as Select,
  Tx as SessionRow,
  lT as Sidebar,
  Z2 as SidebarFoldButton,
  YT as StageColumn,
  kT as StageGrid,
  yx as StageHistory,
  uy as StageListEditor,
  aT as StageSteps,
  TT as StaleStrip,
  qt as StatStrip,
  fT as StatTiles,
  sT as StreamAvatar,
  JT as StreamRow,
  Q2 as StudioIcon,
  bT as SubjectRail,
  Ve as Switch,
  oT as TabLinks,
  mT as TableHead,
  rT as Tabs,
  Ax as Tag,
  O2 as ThemeProvider,
  QT as ToolRow,
  _T as TopBar,
  $w as Tree,
  Qa as TreeRow,
  xx as TypedInputBlock,
  Jl as UNSAFE_HREF,
  hx as ValidationList,
  j2 as VisibilityProvider,
  q2 as Visible,
  F2 as WARD_VERSION,
  Ht as WorkCard,
  xT as WriteUnavailableStrip,
  XR as agoSince,
  Gr as clock,
  Ty as colourStatus,
  ae as count,
  ue as duration,
  ln as elapsed,
  D2 as eventSourceTransport,
  L2 as headingTag,
  Bt as isStreamStep,
  ht as isValidatedStreamStep,
  lp as ladderValidation,
  X$ as mcpConnectionChip,
  J$ as mcpToolName,
  le as money,
  be as ms,
  Xa as ordered,
  ha as ratio,
  bk as restartLabel,
  H as safeHref,
  A2 as slug,
  he as stamp,
  sn as stream,
  G2 as streamChip,
  jt as streamChipProps,
  ge as streamColour,
  co as streamHex,
  Rt as streamInitials,
  io as streamVars,
  iT as uniqueStreamInitials,
  Ra as useAnchoredPanel,
  gt as useBorderFlash,
  Ae as useDisabledScope,
  no as useFocusTrap,
  U2 as useLiveFeed,
  H2 as useReturnFocus,
  Mt as useRovingTabindex,
  cn as useTicker,
  Ur as useVisible,
  B as v,
  ox as validateMark,
  wt as validatedStep,
  wa as validatedStreamSteps
};
